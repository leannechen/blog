import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import indexStyles from "./index.module.css"

export default function Home({ data }) {
  return (
    <Layout>
      <div>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        <ul className={indexStyles.list}>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <li key={node.id} className={indexStyles.item}>
              <Link to={node.fields.slug} className={indexStyles.itemLink}>
                <h3 className={indexStyles.itemTitle}>
                  {node.frontmatter.title}
                </h3>
                <span className={indexStyles.itemDate}>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
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
