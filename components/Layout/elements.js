import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  background-color: var(--white);
  & > main {
    box-sizing: border-box;
    padding: var(--outsidePadding);
    padding-left: 0;
    width: 100%;
    background-color: rgb(220, 220, 220);
  }
  & h2 {
    margin: 0 0 var(--outsidePadding) 0;
  }
  @media (max-width: 767px) {
    flex-direction: column-reverse;
    & > main {
      padding: var(--insidePadding);
    }
  }
`;

export const FooterDiv = styled.footer`
  background-color: var(--highlight);
  color: var(--highlightText);
  // border-top: 1px solid var(--outline);
  box-sizing: border-box;
  width: 100%;
  padding: var(--outsidePadding);
  display: flex;
  justify-content: center;
`;
