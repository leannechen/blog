import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <main>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </main>
      <hr/>
      <footer>
      {/* todo: About author image */}
        <p>
          <img src="../images/hamster-with-wheat-dumbbells.jpg" alt=""/>
          Article by <Link to="/about/">Leanne</Link></p>
      </footer>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`
