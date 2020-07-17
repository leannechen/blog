import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import indexStyles from "./index.module.css"

export default function Home({ data }) {
  return (
    <Layout>
      <div>
        <h1>
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3 className={indexStyles.itemTitle}>
              <Link to={node.fields.slug} className={indexStyles.itemLink}>
                {node.frontmatter.title}
              </Link>
            </h3>
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        ))}
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
