import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import layoutStyles from "./layout.module.css"

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
        imgPeanut: file(relativePath: { eq: "img/icon.png" }) {
          childImageSharp {
            fixed(width: 16, height: 16) {
              ...GatsbyImageSharpFixed
            }
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
      <main className={layoutStyles.main}>
        {children}
      </main>
      <footer className={layoutStyles.footer}>
        <Link to="/about/" className={layoutStyles.authorLink}>
          <span className={layoutStyles.author}>Leanne</span>
          <Img fixed={data.imgPeanut.childImageSharp.fixed} className={layoutStyles.iconPeanut} />
        </Link>
        {/* todo: div cannot be inside p problem caused by gatsy-image */}
        <p>Copyright © 2020</p>
      </footer>
    </div>
  )
}
