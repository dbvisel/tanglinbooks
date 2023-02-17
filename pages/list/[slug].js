import * as React from "react";
import { getPlaiceholder } from "plaiceholder";
import makeSlug from "../../utils/makeSlug";
import Layout from "/components/Layout";
import BookCardWrapper from "../../components/BookCardWrapper";
import { getLists, getBooksOfType, getListsFromRecords } from "/utils/airtable";

export const getStaticPaths = async () => {
  const lists = await getLists();
  const { listSlugs } = lists;
  return {
    paths: listSlugs.map((x) => {
      return { params: { slug: x } };
    }),
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export async function getStaticProps({ params }) {
  const lists = await getLists();
  const { listList } = lists;
  const thisList = listList.filter((x) => makeSlug(x) === params.slug)[0];
  // console.log("This list: ", thisList);
  const theBooks = await getBooksOfType("List", thisList);
  const myLists = await getListsFromRecords(theBooks);

  const imageUrls = theBooks.map((x) => ({
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

  const recordsWithPlaceholders = theBooks.map((x) => {
    x.blurPath = placeholderArray.filter(
      (y) => y.src === x.imagePath
    )[0].base64;
    return x;
  });

  return {
    props: {
      title: thisList,
      bookLists: lists,
      books: recordsWithPlaceholders,
      thisList: myLists,
    },
  };
}

const ListPage = ({ bookLists, books, title, thisList }) => {
  return (
    <Layout bookLists={bookLists} title={`Reading list: ${title}`}>
      <BookCardWrapper books={books} tagList={thisList} />
    </Layout>
  );
};

export default ListPage;
