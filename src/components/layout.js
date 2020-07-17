import React from "react"
import containerStyles from "./container.module.css"
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
    <div className={containerStyles.container}>
      <header className={containerStyles.header}>
        <Link to="/" className={containerStyles.titleLink}>
          <h3 className={containerStyles.title}>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul className={containerStyles.navList}>
          <li className={containerStyles.navItem}>
            <Link to="/about/" className={containerStyles.navLink}>About</Link>
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
