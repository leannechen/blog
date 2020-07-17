import React from "react"
import layoutStyles from "./layout.module.css"
import { Link, useStaticQuery, graphql } from "gatsby"

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div className={layoutStyles.container}>
      <header className={layoutStyles.header}>
        <Link to="/" className={layoutStyles.titleLink}>
          <h3 className={layoutStyles.title}>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul className={layoutStyles.navList}>
          <li className={layoutStyles.navItem}>
            <Link to="/about/" className={layoutStyles.navLink}>About</Link>
          </li>
        </ul>
      </header>
      {children}
      <footer>
        <a href="https://twitter.com">Twitter</a>
        •
        <a href="https://github.com">Github</a>
      </footer>
    </div>
  )
}
