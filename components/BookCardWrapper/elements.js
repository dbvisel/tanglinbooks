import styled from "styled-components";

export const BookCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  margin-top: -10px;
  padding: 0;
  max-width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-top: var(--outsidePadding);
  padding-left: var(--outsidePadding);
  & .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    // margin-left: -7.5px; /* gutter size offset */
    width: auto;
    align-items: flex-start;
    max-width: 100%;
    box-sizing: border-box;
  }
  & .my-masonry-grid_column {
    padding-left: 7.5px; /* gutter size */
    background-clip: padding-box;
    width: 270px !important;
  }

  /* Style your items */
  & .my-masonry-grid_column > li {
    margin-bottom: 24px;
    /* min-width: 240px !important; */
  }

  & p {
    margin: 0 10px;
  }
  & li {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: var(--insidePadding);
    /* margin: var(--insidePadding); */
    // border: 1px solid var(--outline);
    max-width: 252px;
    transition: 0.5s;
    background-color: var(--highlight);
    color: var(--highlightText);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    &:hover {
      transform: scale(1.05);
    }
    & > a {
      box-shadow: 0 0 10px black;
      line-height: 0;
      & > span {
        width: 100%; // why do i need this?
      }
    }
    & h4 {
      margin: 0;
      font-weight: normal;
      margin: calc(var(--insidePadding) * 2) 0;
      line-height: 1.5;
    }
    & a {
      text-decoration: none;
      color: var(--highlightText);
    }
    & p {
      margin: 0;
      font-size: 14px;
    }
  }
  @media (max-width: 1024px) {
    & li {
      // max-width: 202px;
    }
  }
  @media (max-width: 840px) {
    margin-top: 0;
    padding: 0;
    margin: 0;
    & .my-masonry-grid {
      width: initial;
      & .my-masonry-grid_column {
        width: 100% !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: var(--outsidePadding);
      }
    }
    @media (max-width: 767px) {
      & .my-masonry-grid {
        & .my-masonry-grid_column {
          padding-left: 0;
        }
      }
    }
    & li {
      align-items: center;
      margin: 0;
      margin-bottom: var(--insidePadding);
      min-width: 100%;
      max-width: 100%;
    }
  }
`;

export const TopNav = styled.nav`
  padding-left: var(--outsidePadding);
  display: block;
  justify-content: space-between;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  @media (max-width: 767px) {
    padding: 0;
  }
`;

export const ShowNav = styled.nav`
  margin-bottom: var(--outsidePadding);
  & h3 {
    margin: 0;
  }
  & a {
    text-decoration: none;
    color: var(--highlight);
    &:hover {
      font-weight: bold;
    }
  }
  & ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    & > strong {
      margin-right: 4px;
    }
    & li {
      &:after {
        content: " · ";
        margin-right: 4px;
      }
      &:last-of-type {
        &:after {
          content: "";
        }
      }
    }
  }
`;

export const FilterNav = styled.div`
  padding-bottom: var(--outsidePadding);
  margin-bottomn: var(--outsidePadding);
  & h3 {
    margin: 0 0 var(--outsidePadding);
    font-weight: normal;
  }
  & div {
    display: flex;
    align-items: flex-start;
    & h4 {
      white-space: nowrap;
      min-width: 180px;
      margin: 0 var(--insidePadding) 0 0;
    }
  }
  & h4 {
    display: inline-block;
    font-weight: normal;
    font-style: italic;
  }
  @media (max-width: 767px) {
    & div {
      flex-direction: column;
      & h4 {
        margin: 0 0 var(--insidePadding) 0;
      }
    }
  }
`;

export const SortNav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: var(--outsidePadding);
  justify-content: flex-end;
  align-items: baseline;
  white-space: nowrap;
  margin-left: var(--insidePadding);
  & select {
    margin-left: var(--insidePadding);
    font-family: var(--baseFont);
    & option {
      font-family: var(--baseFont);
    }
  }
  @media (max-width: 767px) {
    position: relative;
  }
`;
