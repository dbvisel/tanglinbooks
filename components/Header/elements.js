import styled from "styled-components";

export const HeaderDiv = styled.header`
  padding: var(--outsidePadding);
  background-color: var(--highlight);
  // border-bottom: 1px solid var(--outline);
  & h1 {
    margin: 0;
    color: var(--highlightText);
  }
  & a {
    /* color: var(--white); */
    color: var(--highlightText);
    text-decoration: none;
  }
  & h1 span {
    font-weight: normal;
    font-style: italic;
    margin-left: 0.5em;
    opacity: 0.5;
  }
  @media (max-width: 767px) {
    padding: var(--insidePadding);
    & h1 {
      font-size: 24px;
    }
  }
`;
