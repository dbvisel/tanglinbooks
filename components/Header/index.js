import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { HeaderDiv } from "./elements";

const Header = ({ title = "" }) => (
  <HeaderDiv>
    <div>
      <h1>
        <Link href="/">
          <a>Tanglin Book Concierge</a>
        </Link>
        {title ? <span>{title}</span> : null}
      </h1>
    </div>
  </HeaderDiv>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: ``,
};

export default Header;
