import React from "react";
import Sidebar from "./../Sidebar";
import Header from "./../Header";
import { Wrapper, FooterDiv } from "./elements";

const Layout = ({ children, bookLists, title }) => {
  return (
    <React.Fragment>
      <Header title={title} />
      <Wrapper>
        <Sidebar bookLists={bookLists} />
        <main>{children}</main>
      </Wrapper>
      <FooterDiv>footer goes here</FooterDiv>
    </React.Fragment>
  );
};

export default Layout;
