import React from "react";
import Link from "next/link";
// import Image from "next/image";
import Image from "next/future/image";
import makeSlug from "./../../utils/makeSlug";
import { TagList } from "./../../components/Sidebar/elements";
import { BookBlock, TagBlock } from "./elements";

const BookPageComponent = ({ book }) => {
  const image = book.fields["Cover"] || [];
  const imageHeight =
    image[0] && image[0].width ? (300 / image[0].width) * image[0].height : 0;
  return (
    <BookBlock>
      <div>
        <h2>{book.fields.Title}</h2>
        {book.fields.Subtitle ? (
          <h2>
            <em>{book.fields.Subtitle}</em>
          </h2>
        ) : null}
        <h3>{book.fields["Author - first last"]}</h3>
        <p>
          {book.fields["Description - long"] ||
            book.fields["Description - short"]}
        </p>
        {book.fields.Series ? (
          <div>
            <p>
              <strong>Series: </strong> {book.fields.Series}
            </p>
          </div>
        ) : null}
        {book.fields["Infiniti link"] ? (
          <div>
            <p className="cataloguelink">
              <a
                href={book.fields["Infiniti link"]}
                target="_blank"
                rel="noreferrer"
              >
                Check the catalogue
              </a>
            </p>
          </div>
        ) : null}
        {book.fields.List ? (
          <TagBlock>
            <h4>Lists:</h4>
            <TagList>
              {book.fields.List.map((list, index) => (
                <li key={`booktemplate_list_${index}`}>
                  <Link href={`/list/${makeSlug(list)}`}>
                    <a>{list}</a>
                  </Link>
                </li>
              ))}
            </TagList>
          </TagBlock>
        ) : null}
        {book.fields.Tags ? (
          <TagBlock>
            <h4>Tags:</h4>
            <TagList>
              {book.fields.Tags.map((tag, index) => (
                <li key={`booktemplate_tag_${index}`}>
                  <Link href={`/tag/${makeSlug(tag)}`}>
                    <a>{tag}</a>
                  </Link>
                </li>
              ))}
            </TagList>
          </TagBlock>
        ) : null}
        {book.fields.Audience ? (
          <TagBlock>
            <h4>Audience:</h4>
            <TagList>
              {book.fields.Audience.map((audience, index) => (
                <li key={`booktemplate_audience_${index}`}>
                  <Link href={`/audience/${makeSlug(audience)}`}>
                    <a>{audience}</a>
                  </Link>
                </li>
              ))}
            </TagList>
          </TagBlock>
        ) : null}
        {book.fields.Formats ? (
          <TagBlock>
            <h4>Formats:</h4>
            <TagList>
              {book.fields.Formats.map((format, index) => (
                <li key={`booktemplate_format_${index}`}>
                  <Link href={`/format/${makeSlug(format)}`}>
                    <a>{format}</a>
                  </Link>
                </li>
              ))}
            </TagList>
          </TagBlock>
        ) : null}
      </div>
      <div className="bookcover">
        <Image
          src={book.imagePath || image[0].url}
          placeholder="blur"
          blurDataURL={book.blurPath || book.imagePath}
          width={300}
          height={imageHeight}
          key={book.fields.Title}
          alt={book.fields.Title}
          style={{ height: "auto", width: 300 }}
          priority
        />
      </div>
    </BookBlock>
  );
};

export default BookPageComponent;
