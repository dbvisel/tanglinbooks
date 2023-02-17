import * as React from "react";
import Layout from "/components/Layout";
import BookPageComponent from "../../components/BookPageComponent";
import { getLists, possibleBookSlugs, getResourceById } from "/utils/airtable";

export const getStaticPaths = async () => {
  const bookSlugs = await possibleBookSlugs();
  return {
    paths: bookSlugs.map((x) => {
      return { params: { slug: x.slug } };
    }),
    fallback: false, // fallback is set to false because we already know the slugs ahead of time
  };
};

export const getStaticProps = async ({ params }) => {
  const lists = await getLists();
  const bookSlugs = await possibleBookSlugs();
  const thisBook = bookSlugs.filter((x) => x.slug === params.slug)[0];
  const book = await getResourceById(thisBook.id);

  return {
    props: {
      bookLists: lists,
      book,
    },
  };
};

const BookPage = ({ book, bookLists }) => {
  return (
    <Layout bookLists={bookLists} title={book.fields.Title}>
      <BookPageComponent book={book} />
    </Layout>
  );
};

export default BookPage;
