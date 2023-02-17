const fs = require("fs").promises;
const fetch = require("node-fetch");
const Airtable = require("airtable");

const coverField = "Cover"; // This is the column in Airtable that contains the cover image
const airtableTableName = "Table 1"; // This is the table in Airtable that contains the resources

require("dotenv").config({
  path: `.env.local`,
});

// This prebuild downloads all the images from Airtable and saves them to the public folder
// TODO: maybe get thumbnails rather than full-size versions? We're never using the biggest one.

// Authenticate
Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference a table
const resourcesBase = base(airtableTableName); // This is the column in Ar

const getMinifiedRecords = async (records) => {
  return records.map((record) => minifyRecord(record));
};

// gets the data we want and puts it into variables
const minifyRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const getResources = async () => {
  const records = await resourcesBase.select({}).all();
  const minifiedRecords = await getMinifiedRecords(records);
  return minifiedRecords;
};

// 1. Go through all resources. Download

const downloadFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(filename, buffer);
  return `Downloaded ${url} to ${filename}.`;
};

const content = async (path) => {
  return await fs.readFile(path, "utf8");
};

const prebuild = async () => {
  console.log("Started prebuild script.");

  console.log("\nLooking for resource cache...");
  const preResources = await getResources();
  const resources = preResources;
  // .filter((x) => x.fields.Types && x.fields.Types.length)
  // .filter((x) => x.fields.Status === "publish");

  let resourcesCache;
  try {
    resourcesCache = await content("./public/images/resources/cache.json");
  } catch (e) {
    console.log("Resources cache not found.");
    resourcesCache = "";
  }

  const resourcesCurrent = JSON.stringify(resources.map((x) => x.id));

  if (resourcesCache === resourcesCurrent) {
    console.log(
      "Resource image cache is up to date. Skipping resource image download."
    );
  } else {
    console.log(
      "Resource image cache not found or out of date. Downloading resource images."
    );
    // Note that if it's not finding a cache, it does not erase what's been downloaded.
    // Manually deleting might make sense?
    for (let i = 0; i < resources.length; i++) {
      if (
        resources[i].fields[coverField] &&
        resources[i].fields[coverField].length
      ) {
        const thisResource = resources[i].fields[coverField][0];
        // console.log(thisResource.type.split("/").pop());
        const theUrl = thisResource.url;
        const theFilename = resources[i].id
          .replaceAll(":", "-")
          .replaceAll(".", "-")
          .replaceAll(" ", "-");
        const theExtension = thisResource.type.split("/").pop();
        const done = await downloadFile(
          theUrl,
          `./public/images/resources/${theFilename}.${theExtension}`
        );
        // console.log(done);
      } else {
        console.error("No resource image: ", resources[i]);
      }
    }
    fs.writeFile("./public/images/resources/cache.json", resourcesCurrent);
  }
  console.log("Prebuild done!");
};

prebuild();
