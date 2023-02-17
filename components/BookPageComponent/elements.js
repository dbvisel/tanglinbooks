import styled from "styled-components";

export const BookBlock = styled.div`
  display: flex;
  width: 100%;
  padding-left: var(--outsidePadding);
  box-sizing: border-box;
  & > div {
    width: 100%;
    max-width: 600px;
  }
  & > div + div {
    width: initial;
    margin-left: calc(2 * var(--outsidePadding)) !important;
    box-sizing: border-box;
    min-width: 300px;
    /* width: 400px; */
    /* height: auto; */
    /* max-height: 100vh; */
    box-sizing: border-box;
    & > img {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.55);
      transition: 0.5s;
      &:hover {
        transform: rotate(3deg);
      }
    }
  }
  & h2 {
    margin: 0;
    font-size: 28px;
    font-style: italic;
  }
  & h3 {
    margin: var(--insidePadding) 0 calc(2 * var(--outsidePadding)) 0;
    font-size: 24px;
    font-weight: normal;
  }
  & h4 {
    margin: var(--outsidePadding) 0 var(--insidePadding) 0;
    border-bottom: 2px solid var(--accent);
  }
  & p.cataloguelink {
    font-size: 150%;
    text-align: right;
    user-select: none;
    & a {
      color: var(--highlight);
      font-weight: normal;
      text-decoration: none;
      &:hover {
        font-style: italic;
      }
      &:before {
        content: "→ ";
      }
    }
  }
  @media (max-width: 1024px) {
    & > div + div {
      /* min-width: 180px; */
    }
    /* & > img {
      width: 250px;
    } */
  }
  @media (max-width: 767px) {
    padding-left: 0;
    flex-direction: column-reverse;
    & > div + div {
      margin: 0 auto var(--insidePadding) auto !important;
      min-width: initial;
      /* display: flex !important;
      justify-content: center;
      width: 100% !important; */

      /* width: 100%;
      height: auto; */
    }
  }
`;

export const TagBlock = styled.div`
  // border: 1px solid var(--accent);
  padding: var(--insidePadding);
  border-radius: 6px;
  margin-top: calc(2 * var(--outsidePadding));
  background-color: var(--highlight);
  color: var(--highlightText);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);

  & h4 {
    margin: 0 0 calc(var(--insidePadding) * 2) 0;
    border-bottom: none;
  }
  & ul li a {
    background-color: var(--white);
  }
`;
