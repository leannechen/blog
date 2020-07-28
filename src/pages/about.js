import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function About({ data }) {
  return (
    <Layout>
      <SEO title="About me" description="嗨，我是熱愛前端技術的工程師 Leanne" />
      <h1>About me</h1>
      <p>嗨，我是熱愛前端工藝、飼養倉鼠的前端工程師 Leanne<br/>
        很高興認識你！
      </p>
      <Img fixed={data.file.childImageSharp.fixed} />
      <hr/>
      <p>
        <a href="mailto:leannechen.tw@gmail.com">Email</a>
        •
        <a href="https://github.com/leannechen" target="_blank" rel="noreferrer">Github</a>
        •
        <a href="https://www.linkedin.com/in/leannechentw/" target="_blank" rel="noreferrer">LinkedIn</a>
        •
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
      </p>
    </Layout>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "img/hamster-2.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
