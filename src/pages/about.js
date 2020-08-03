import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function About({ data }) {
  return (
    <Layout>
      <SEO title="About me" description="嗨，我是熱愛前端技術的工程師 Leanne" />
      <h1>About</h1>
      <h2>About me</h2>
      <p>嗨，我是飼養倉鼠、熱愛前端技術的軟體工程師 <a href="https://github.com/leannechen" target="_blank" rel="noreferrer">Leanne</a><br/>
        很高興認識你！
      </p>
      <ul>
        <li><a href="mailto:leannechen.tw@gmail.com">Email</a></li>
        <li><a href="https://github.com/leannechen" target="_blank" rel="noreferrer">Github</a></li>
        <li><a href="https://www.linkedin.com/in/leannechentw/" target="_blank" rel="noreferrer">LinkedIn</a></li>
      </ul>
      <h2>About this site</h2>
      <p>Using:</p>
      <ul>
        <li><a href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a></li>
        <li><a href="https://www.gatsbyjs.org/" target="_blank" rel="noreferrer">Gatsby</a></li>
      </ul>
      <p>素材感謝：<a href="https://icooon-mono.com/" target="_blank" rel="noreferrer">ICOOON MONO</a></p>
      <Img fixed={data.file.childImageSharp.fixed} />
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
