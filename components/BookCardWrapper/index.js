import React from "react";
import Link from "next/link";
import Image from "next/future/image";
import Masonry from "react-masonry-css";
import makeSlug from "./../../utils/makeSlug";
import { TagListToggle } from "./../Sidebar/elements";
import { BookCardDiv, SortNav, FilterNav, TopNav } from "./elements";

const BookCardWrapper = ({ books, tagList, title }) => {
  // console.log(books);
  const initialTags = {
    tags: tagList.tagList,
    lists: tagList.listList,
    audiences: tagList.audienceList,
    formats: tagList.formatList,
  };
  const [currentTags, setCurrentTags] = React.useState(initialTags);
  const [filteredBooks, setFilteredBooks] = React.useState(books);
  const [sortedBooks, setSortedBooks] = React.useState(filteredBooks);
  const [sortBy, setSortBy] = React.useState("titleAZ");
  const [sorting, setSorting] = React.useState(false);

  const TurnAllOn = ({ listName }) => {
    const newCurrentTags = { ...currentTags };
    newCurrentTags[listName] = initialTags[listName];
    return (
      <li>
        <Link href="/">
          <a
            className="special"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTags(newCurrentTags);
            }}
          >
            Show all {listName}
          </a>
        </Link>
      </li>
    );
  };

  const TurnAllOff = ({ listName }) => {
    const newCurrentTags = { ...currentTags };
    newCurrentTags[listName] = [];
    return (
      <li>
        <Link href="/">
          <a
            className="special"
            onClick={(e) => {
              e.preventDefault();
              setCurrentTags(newCurrentTags);
            }}
          >
            Hide all {listName}
          </a>
        </Link>
      </li>
    );
  };

  React.useEffect(() => {
    setFilteredBooks(
      books.filter((x) => {
        // if the booh has tags that are not in the current tag list, kill it
        // console.log(x.fields.Title, x.fields.Tags, currentTags.tags);
        // console.log(
        //   x.fields.Formats.some((y) => currentTags.formats.includes(y))
        // );
        const outbooks =
          x.fields.Tags.every((y) => currentTags.tags.includes(y)) &&
          x.fields.List.some((y) => currentTags.lists.includes(y)) &&
          x.fields.Audience.some((y) => currentTags.audiences.includes(y)) &&
          x.fields.Formats.some((y) => currentTags.formats.includes(y));
        // console.log(outbooks);
        return outbooks;
      })
    );
  }, [
    currentTags.tags,
    currentTags.lists,
    currentTags.audiences,
    currentTags.formats,
    books,
  ]);

  React.useEffect(() => {
    const newSortedBooks = filteredBooks;
    switch (sortBy) {
      case "titleAZ":
        // console.log("titleAZ");
        newSortedBooks.sort((a, b) => {
          if (
            (a.fields["Title - sort order"] || a.fields.Title).toLowerCase() >
            (b.fields["Title - sort order"] || b.fields.Title).toLowerCase()
          ) {
            return 1;
          }
          if (
            (a.fields["Title - sort order"] || a.fields.Title).toLowerCase() <
            (b.fields["Title - sort order"] || b.fields.Title).toLowerCase()
          ) {
            return -1;
          }
          return 0;
        });
        break;
      case "titleZA":
        // console.log("titleZA");
        newSortedBooks.sort((a, b) => {
          if (
            (a.fields["Title - sort order"] || a.fields.Title).toLowerCase() >
            (b.fields["Title - sort order"] || b.fields.Title).toLowerCase()
          ) {
            return -1;
          }
          if (
            (a.fields["Title - sort order"] || a.fields.Title).toLowerCase() <
            (b.fields["Title - sort order"] || b.fields.Title).toLowerCase()
          ) {
            return 1;
          }
          return 0;
        });
        break;
      case "authorAZ":
        // console.log("authorAZ");
        newSortedBooks.sort((a, b) => {
          if (
            (
              a.fields["Author - last, first"] ||
              a.fields["Author - first last"]
            ).toLowerCase() >
            (
              b.fields["Author - last, first"] ||
              b.fields["Author - first last"]
            ).toLowerCase()
          ) {
            return 1;
          }
          if (
            (
              a.fields["Author - last, first"] ||
              a.fields["Author - first last"]
            ).toLowerCase() <
            (
              b.fields["Author - last, first"] ||
              b.fields["Author - first last"]
            ).toLowerCase()
          ) {
            return -1;
          }
          return 0;
        });
        break;
      case "authorZA":
        // console.log("authorZA");
        newSortedBooks.sort((a, b) => {
          if (
            (
              a.fields["Author - last, first"] ||
              a.fields["Author - first last"]
            ).toLowerCase() >
            (
              b.fields["Author - last, first"] ||
              b.fields["Author - first last"]
            ).toLowerCase()
          ) {
            return -1;
          }
          if (
            (
              a.fields["Author - last, first"] ||
              a.fields["Author - first last"]
            ).toLowerCase() <
            (
              b.fields["Author - last, first"] ||
              b.fields["Author - first last"]
            ).toLowerCase()
          ) {
            return 1;
          }
          return 0;
        });
        break;
      default:
    }
    setSorting(false);
    setSortedBooks(newSortedBooks);
  }, [filteredBooks, sortBy]);
  return (
    <React.Fragment>
      <TopNav>
        <FilterNav>
          <h3>
            Currently showing <strong>{sortedBooks.length}</strong> of{" "}
            <strong>{books.length}</strong> books:
          </h3>
          <div>
            <h4>from these lists:</h4>{" "}
            <TagListToggle>
              {initialTags.lists.map((list, index) => (
                <li key={`bookcard_list_${index}`}>
                  <Link href={`/list/${makeSlug(list)}`}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentTags.lists.indexOf(list) > -1) {
                          const newTagList = {
                            ...currentTags,
                            lists: currentTags.lists.filter((x) => x !== list),
                          };
                          setCurrentTags(newTagList);
                        } else {
                          const newTagList = {
                            ...currentTags,
                            lists: [...currentTags.lists, list],
                          };
                          setCurrentTags(newTagList);
                        }
                      }}
                      className={
                        currentTags.lists.indexOf(list) > -1 ? "on" : ""
                      }
                    >
                      {list}
                    </a>
                  </Link>
                </li>
              ))}
              {currentTags.lists.length ? (
                <TurnAllOff listName={"lists"} />
              ) : null}
              {currentTags.lists.length < initialTags.lists.length ? (
                <TurnAllOn listName={"lists"} />
              ) : null}
            </TagListToggle>
          </div>
          {/*<div>
            <h4>with these tags:</h4>
            <TagListToggle>
              {currentTags.tags.length ? (
                initialTags.tags
                  .filter((x) => x !== title)
                  .map((tag, index) => (
                    <li key={`bookcard_tag_${index}`}>
                      <Link href={`/tag/${makeSlug(tag)}`}>
                        <a
                          onClick={(e) => {
                            e.preventDefault();
                            if (currentTags.tags.indexOf(tag) > -1) {
                              const newTagList = {
                                ...currentTags,
                                tags: currentTags.tags.filter((x) => x !== tag),
                              };
                              setCurrentTags(newTagList);
                            } else {
                              const newTagList = {
                                ...currentTags,
                                tags: [...currentTags.tags, tag],
                              };
                              setCurrentTags(newTagList);
                            }
                          }}
                          className={
                            currentTags.tags.indexOf(tag) > -1 ? "on" : ""
                          }
                        >
                          {tag}
                        </a>
                      </Link>
                    </li>
                  ))
              ) : (
                <li>
                  No tags selected!{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // dispatch({ type: "showAll", category: "tags" });
                    }}
                  >
                    Show everything?
                  </a>
                </li>
              )}
            </TagListToggle>
									</div>*/}
          <div>
            <h4>for these audiences:</h4>
            <TagListToggle>
              {initialTags.audiences.map((audience, index) => (
                <li key={`bookcard_audience_${index}`}>
                  <Link href={`/audience/${makeSlug(audience)}`}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentTags.audiences.indexOf(audience) > -1) {
                          const newTagList = {
                            ...currentTags,
                            audiences: currentTags.audiences.filter(
                              (x) => x !== audience
                            ),
                          };
                          setCurrentTags(newTagList);
                        } else {
                          const newTagList = {
                            ...currentTags,
                            audiences: [...currentTags.audiences, audience],
                          };
                          setCurrentTags(newTagList);
                        }
                      }}
                      className={
                        currentTags.audiences.indexOf(audience) > -1 ? "on" : ""
                      }
                    >
                      {audience}
                    </a>
                  </Link>
                </li>
              ))}
              {currentTags.audiences.length ? (
                <TurnAllOff listName={"audiences"} />
              ) : null}
              {currentTags.audiences.length < initialTags.audiences.length ? (
                <TurnAllOn listName={"audiences"} />
              ) : null}
            </TagListToggle>
          </div>
          <div>
            <h4>in these formats:</h4>
            <TagListToggle>
              {initialTags.formats.map((format, index) => (
                <li key={`bookcard_format_${index}`}>
                  <Link href={`/format/${makeSlug(format)}`}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentTags.formats.indexOf(format) > -1) {
                          const newTagList = {
                            ...currentTags,
                            formats: currentTags.formats.filter(
                              (x) => x !== format
                            ),
                          };
                          setCurrentTags(newTagList);
                        } else {
                          const newTagList = {
                            ...currentTags,
                            formats: [...currentTags.formats, format],
                          };
                          setCurrentTags(newTagList);
                        }
                      }}
                      className={
                        currentTags.formats.indexOf(format) > -1 ? "on" : ""
                      }
                    >
                      {format}
                    </a>
                  </Link>
                </li>
              ))}
              {currentTags.formats.length ? (
                <TurnAllOff listName={"formats"} />
              ) : null}
              {currentTags.formats.length < initialTags.formats.length ? (
                <TurnAllOn listName={"formats"} />
              ) : null}
            </TagListToggle>
          </div>
        </FilterNav>
        <SortNav>
          Sort by:
          <select
            onChange={(e) => {
              setSortBy(e.target.value);
              setSorting(true);
            }}
            onBlur={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="titleAZ">Title A–Z</option>
            <option value="titleZA">Title Z–A</option>
            <option value="authorAZ">Author A–Z</option>
            <option value="authorZA">Author Z–A</option>
          </select>
        </SortNav>
      </TopNav>
      <BookCardDiv key={`${sortedBooks.length}-${sortBy}`}>
        {sorting ? (
          <p>Sorting . . . </p>
        ) : sortedBooks.length ? (
          <Masonry
            breakpointCols={{
              default: 5,
              1680: 4,
              1400: 3,
              1120: 2,
              840: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {sortedBooks.map((book, index) => {
              const image = book.fields["Cover"] || [];
              return (
                <li key={`bookcard_book_${index}`}>
                  <Link href={`/book/${makeSlug(book.fields.Title)}`}>
                    <a>
                      <Image
                        src={book.imagePath}
                        placeholder="blur"
                        blurDataURL={book.blurPath || book.imagePath}
                        width={230}
                        height={(230 / image[0].width) * image[0].height}
                        key={book.fields.Title}
                        alt={book.fields.Title}
                        style={{ width: 230, height: "auto" }}
                      />
                    </a>
                  </Link>
                  <h4>
                    {book.fields["Author - first last"]}
                    <br />
                    <em>
                      <Link href={`/book/${makeSlug(book.fields.Title)}`}>
                        <a>{book.fields.Title}</a>
                      </Link>
                    </em>
                  </h4>
                  <p>{book.fields["Description - short"]}</p>
                </li>
              );
            })}
          </Masonry>
        ) : (
          <h2 className="nobookswarning">
            No books selected! Try clicking on something else.
          </h2>
        )}
      </BookCardDiv>
    </React.Fragment>
  );
};

export default BookCardWrapper;
