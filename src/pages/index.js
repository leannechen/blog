import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import indexStyles from "./index.module.css"
import Img from "gatsby-image"

export default function Home({ data }) {
  return (
    <Layout>
      <SEO title="首頁" description={data.site.siteMetadata.description} />
      <div>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        <ul className={indexStyles.list}>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <li key={node.id} className={indexStyles.item}>
              <Link to={node.fields.slug} className={indexStyles.itemLink}>
                <div className={indexStyles.itemLeft}>
                  <h3 className={indexStyles.itemTitle}>
                    {node.frontmatter.title}
                  </h3>
                  <p className={indexStyles.itemDate}>{node.frontmatter.date}</p>
                  <p>{node.excerpt}</p>
                </div>
                <div className={indexStyles.itemRight}>
                  { node.frontmatter.featuredImage &&
                    <Img fixed={node.frontmatter.featuredImage.childImageSharp.fixed} />
                  }
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            featuredImage {
              childImageSharp {
                fixed(width: 120, height: 120) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
