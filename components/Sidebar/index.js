import React from "react";
import Link from "next/link";
import makeSlug from "./../../utils/makeSlug";
import { SidebarDiv, TagList } from "./elements";

const Sidebar = ({ bookLists = {} }) => {
  const { tagList, audienceList, listList, formatList } = bookLists;
  return (
    <SidebarDiv>
      <h2>Try a book list:</h2>
      <TagList>
        <li>
          <Link href="/">
            <a>Everything</a>
          </Link>
        </li>
      </TagList>
      {!(tagList && audienceList && listList && formatList) ? null : (
        <React.Fragment>
          <h3>by reading list:</h3>
          <TagList>
            {listList.sort().map((list, index) => (
              <li key={`sidebar_list_${index}`}>
                <Link href={`/list/${makeSlug(list)}`}>
                  <a>{list}</a>
                </Link>
              </li>
            ))}
          </TagList>
          <h3>by tag:</h3>
          <TagList>
            {tagList.sort().map((tag, index) => (
              <li key={`sidebar_tag_${index}`}>
                <Link href={`/tag/${makeSlug(tag)}`}>
                  <a>{tag}</a>
                </Link>
              </li>
            ))}
          </TagList>
          <h3>by audience:</h3>
          <TagList>
            {audienceList.sort().map((audience, index) => (
              <li key={`sidebar_audience_${index}`}>
                <Link href={`/audience/${makeSlug(audience)}`}>
                  <a>{audience}</a>
                </Link>
              </li>
            ))}
          </TagList>
          <h3>by format:</h3>
          <TagList>
            {formatList.map((format, index) => (
              <li key={`sidebar_format_${index}`}>
                <Link href={`/format/${makeSlug(format)}`}>
                  <a>{format}</a>
                </Link>
              </li>
            ))}
          </TagList>
        </React.Fragment>
      )}
    </SidebarDiv>
  );
};

export default Sidebar;
