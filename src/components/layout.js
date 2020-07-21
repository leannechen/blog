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
            description
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
        <p>{data.site.siteMetadata.description}</p>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
