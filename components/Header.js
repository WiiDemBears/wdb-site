import React from "react"
import Link from "next/link"

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <nav>
    <Link href="/">
      <a style={linkStyle}>Wii Dem Bears</a>
    </Link>
    <Link href="/down">
      <a style={linkStyle}>Down</a>
    </Link>
    <Link href="/quotes">
      <a style={linkStyle}>Quotes</a>
    </Link>
    <Link href="/memes">
      <a style={linkStyle}>Memes</a>
    </Link>
    <style jsx>{`
      h1,
      a {
        font-family: "Roboto";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </nav>
)

export default Header
