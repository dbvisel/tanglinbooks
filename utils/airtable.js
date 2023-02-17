const Airtable = require("airtable");

// Authenticate
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const airtableTableName = "Table 1"; // the table name in Airtable

// Initialize a base
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference a table
const resourcesBase = base(airtableTableName);

const slugify = (text) =>
  encodeURIComponent(
    text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[?|.,/#!$%^&*;¿:{}'"“”‘’––=\-_`~()æœ]/g, "")
      .replace(/\s+/g, "-")
  );

const makeList = (bookList, category) => {
  const outList = [];
  for (let i = 0; i < bookList.length; i++) {
    const thisCategory = bookList[i][category];
    if (thisCategory && thisCategory.length) {
      for (let j = 0; j < thisCategory.length; j++) {
        if (outList.indexOf(thisCategory[j]) < 0) {
          outList.push(thisCategory[j]);
        }
      }
    }
  }
  return outList;
};

// maps over the records, calling minifyRecord, giving us required data
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
  const outRecords = minifiedRecords.map((x) => {
    const theFilename = x.id
      .replaceAll(":", "-")
      .replaceAll(".", "-")
      .replaceAll(" ", "-");
    const theExtension = x.fields["Cover"][0].type.split("/").pop();
    x.imagePath = `/images/resources/${theFilename}.${theExtension}`;
    x.blurPath = x.fields["Cover"][0].url;
    return x;
  });

  return outRecords;
};

const getLists = async () => {
  const records = await getResources();
  const listData = records
    .map((x) => x.fields)
    .map((x) => {
      return {
        Tags: x.Tags,
        Audience: x.Audience,
        List: x.List,
        Formats: x.Formats,
      };
    });
  const listList = makeList(listData, "List");
  const tagList = makeList(listData, "Tags");
  const audienceList = makeList(listData, "Audience");
  const formatList = makeList(listData, "Formats");
  const tagSlugs = tagList.map((x) => slugify(x));
  const listSlugs = listList.map((x) => slugify(x));
  const audienceSlugs = audienceList.map((x) => slugify(x));
  const formatSlugs = formatList.map((x) => slugify(x));
  return {
    listList,
    tagList,
    audienceList,
    formatList,
    tagSlugs,
    audienceSlugs,
    formatSlugs,
    listSlugs,
  };
};

const getListsFromRecords = async (records) => {
  const listData = records
    .map((x) => x.fields)
    .map((x) => {
      return {
        Tags: x.Tags,
        Audience: x.Audience,
        List: x.List,
        Formats: x.Formats,
      };
    });
  const listList = makeList(listData, "List");
  const tagList = makeList(listData, "Tags");
  const audienceList = makeList(listData, "Audience");
  const formatList = makeList(listData, "Formats");
  return {
    listList,
    tagList,
    audienceList,
    formatList,
  };
};

const getBooksOfType = async (category, tag) => {
  const records = await getResources();
  const typedResources = records.filter(
    (x) => x.fields[category].indexOf(tag) > -1
  );
  return typedResources;
};

const getResourcesOfType = async (type) => {
  const records = await getResources();
  const typedResources = records
    .map((x) => x.fields)
    .filter((x) => x.Types && x.Types.length && x.Types.indexOf(type) > -1)
    .filter((x) => x.Status === "publish")
    .filter((x) => x["Hide?"] !== "yes")
    .filter((x) => x["Is this a subresource?"] !== true)
    .sort((a, b) => {
      const x1 = new Date(a["Date added"]);
      const x = x1.getTime() || 0;
      const y1 = new Date(b["Date added"]);
      const y = y1.getTime() || 0;
      if (x > y) return -1;
      if (y > x) return 1;
      return 0;
    });
  return typedResources;
};

const getResourceById = async (id) => {
  const thisRecord = await resourcesBase.find(id);
  const outRecord = minifyRecord(thisRecord);
  const theFilename = outRecord.id
    .replaceAll(":", "-")
    .replaceAll(".", "-")
    .replaceAll(" ", "-");
  const theExtension = outRecord.fields["Cover"][0].type.split("/").pop();
  outRecord.imagePath = `/images/resources/${theFilename}.${theExtension}`;
  return outRecord;
};

const possibleBookSlugs = async () => {
  const records = await getResources();
  const preSlugs = records.map((x) => {
    return {
      id: x.id,
      slug: slugify(x.fields.Title),
    };
  });
  return preSlugs;
};

const getAllBooks = async () => {
  const records = await getResources();
  return records.map((x) => {
    const theFilename = x.id
      .replaceAll(":", "-")
      .replaceAll(".", "-")
      .replaceAll(" ", "-");
    const theExtension = x.fields["Cover"][0].type.split("/").pop();
    const imagePath = `/images/resources/${theFilename}.${theExtension}`;

    return {
      id: x.id,
      imagePath: imagePath,
      blurPath: x.blurPath,
      slug: slugify(x.fields.Title),

      fields: x.fields,
    };
  });
};

export {
  possibleBookSlugs,
  getResourceById,
  getResourcesOfType,
  getBooksOfType,
  getAllBooks,
  getLists,
  getListsFromRecords,
};
