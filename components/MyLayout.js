import React from "react";
import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {this.props.children}
    <style global jsx>{`
      body {
        background: black;
      }
    `}</style>
  </div>
);

export default Layout;
