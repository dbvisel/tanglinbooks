import * as React from "react";
import { getPlaiceholder } from "plaiceholder";
import { getLists, getAllBooks } from "./../utils/airtable";
import Layout from "./../components/Layout";
import BookCardWrapper from "/components/BookCardWrapper";

export async function getStaticProps() {
  const theLists = await getLists();
  const books = await getAllBooks();

  const imageUrls = books.map((x) => ({
    imagePath: x.imagePath,
    airtableUrl: x.blurPath,
  }));

  const placeholderArray = await Promise.all(
    imageUrls.map(async (src) => {
      const { base64 } = await getPlaiceholder(src.airtableUrl);
      return {
        src: src.imagePath,
        base64: base64 || "",
      };
    })
  ).then((values) => values);

  const recordsWithPlaceholders = books.map((x) => {
    x.blurPath = placeholderArray.filter(
      (y) => y.src === x.imagePath
    )[0].base64;
    return x;
  });

  return {
    props: {
      bookLists: theLists,
      books: recordsWithPlaceholders,
    },
  };
}

const IndexPage = ({ bookLists, books }) => {
  return (
    <Layout bookLists={bookLists} isFront>
      <BookCardWrapper books={books} tagList={bookLists} />
    </Layout>
  );
};

export default IndexPage;
