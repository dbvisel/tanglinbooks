import styled from "styled-components";

export const SidebarDiv = styled.nav`
  // border-right: 2px solid var(--accent);
  padding: var(--outsidePadding);
  width: var(--sidebarWidth);
  min-width: var(--sidebarWidth);
  max-width: var(--sidebarWidth);
  box-sizing: border-box;
  background-color: var(--highlight);
  color: var(--highlightText);
  & h2 {
    margin: var(--insidePadding) 0;
  }
  & h3 {
    // text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: normal;
    font-style: italic;
    margin: var(--outsidePadding) 0 calc(var(--insidePadding) * 2) 0;
  }
  @media (max-width: 1024px) {
    max-width: 256px;
  }
  @media (max-width: 767px) {
    min-width: initial;
    max-width: 100%;
    width: initial;
    padding: var(--insidePadding);
    border-right-color: transparent;
  }
`;

export const TagListToggle = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  & li {
    margin: 0;
    padding: 0;
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 13px;
    box-sizing: border-box;
    font-size: 12px;
  }
  & a {
    --tagColor: var(--accent);
    --textColor: var(--text);
    --circleColor: var(--white);
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    color: var(--textColor);
    padding: 4px;
    background-color: var(--tagColor);
    border-radius: 6px;
    user-select: none;
    &:hover {
      --tagColor: orange; // var(--highlight);
      --textColor: var(--highlightText);
      --circleColor: var(--accent);
    }

    &:before {
      content: "+";
      color: var(--highlight);
      background-color: var(--circleColor);
      display: inline-flex;
      border-radius: 100%;
      margin-right: 8px;
      width: 16px;
      height: 16px;
      align-items: center;
      justify-content: center;
    }
    &.on {
      --tagColor: var(--highlight);
      --textColor: var(--highlightText);
      --circleColor: var(--accent);
      // opacity: 0.5;
      &:before {
        content: "–";
      }
      &:hover {
        --tagColor: orange; // var(--accent);
        --textColor: var(--text);
        --circleColor: var(--white);
      }
    }
    &:hover {
      transform: scale(1.1);
      // font-weight: bold;
    }
    &.special {
      --tagColor: teal; // var(--highlight);
      --textColor: var(--highlightText);
      --circleColor: var(--accent);
      &:before {
        content: "§";
      }
      &:hover {
        --tagColor: orange; // var(--accent);
        --textColor: var(--text);
        --circleColor: var(--white);
      }
    }
  }
`;

export const TagList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  & li {
    margin: 0;
    padding: 0;
    display: inline-flex;
    margin-right: 6px;
    margin-bottom: 13px;
    box-sizing: border-box;
    user-select: none;
    transition: 0.5s;
  }
  & a {
    --tagColor: var(--accent);
    background-color: var(--background);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin: 0;
    box-sizing: border-box;
    text-decoration: none;
    color: var(--text);
    padding: 4px 6px;
    // border: 1px solid var(--tagColor);
    transition: 0.5s;
    border-radius: 6px;
    font-weight: medium;
    user-select: none;
    cursor: pointer;
    &:hover {
      --tagColor: var(--highlight);
      color: var(--white);
      background-color: var(--highlight);
    }
  }
`;
