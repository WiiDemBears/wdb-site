import React from "react";
import Header from "./MaterialHeader";
import PropTypes from "prop-types";

const Layout = props => (
  <div>
    <Header />
    {PropTypes.children}
    <style global jsx>{`
      body {
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
      }
    `}</style>
  </div>
);

export default Layout;
