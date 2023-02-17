import * as React from "react";
import makeSlug from "../../utils/makeSlug";
import Layout from "/components/Layout";
import BookCardWrapper from "/components/BookCardWrapper";
import { getLists, getBooksOfType, getListsFromRecords } from "/utils/airtable";
import { getPlaiceholder } from "plaiceholder";

export const getStaticPaths = async () => {
  const lists = await getLists();
  const { tagSlugs } = lists;

  return {
    paths: tagSlugs.map((x) => {
      return { params: { slug: x } };
    }),
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export async function getStaticProps({ params }) {
  const lists = await getLists();
  const { tagList } = lists;
  const thisTag = tagList.filter((x) => makeSlug(x) === params.slug)[0];
  // console.log("This tag: ", thisTag);
  const theBooks = await getBooksOfType("Tags", thisTag);
  const thisList = await getListsFromRecords(theBooks);

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
      bookLists: lists,
      thisList: thisList,
      books: recordsWithPlaceholders,
      title: thisTag,
    },
  };
}

const TagPage = ({ bookLists, books, title, thisList }) => {
  return (
    <Layout title={`Tag: ${title}`} bookLists={bookLists}>
      <BookCardWrapper books={books} tagList={thisList} title={title} />
    </Layout>
  );
};

export default TagPage;
