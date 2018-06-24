import Header from "./MaterialHeader";

const Layout = props => (
  <div>
    <Header />
    {props.children}
    <style global jsx>{`
      body {
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
      }
    `}</style>
  </div>
);

export default Layout;
