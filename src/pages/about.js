import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

export default function About({ data }) {
  return (
    <Layout>
      <h1>About me</h1>
      <p>嗨，我是個熱愛前端工藝技術的工程師 Leanne<br/>
        高雄人，最近的興趣是做菜、觀察家裏黃金鼠（如圖）的生態跟爬山<br/>
        很高興認識你！
      </p>
      <p>
        Hi there, it's Leanne - an enthusiastic web engineer. <br/>
        I am from Taiwan, a small and beautiful country. <br/>
        My interests outside of work are cooking, hiking, and observing my hamster's way of life. <br/>
        Nice to meet you!
      </p>
      <p>
        <a href="mailto:leannechen.tw@gmail.com">Email</a>
         •
        <a href="https://github.com/leannechen" target="_blank" rel="noreferrer">Github</a>
         •
        <a href="https://www.linkedin.com/in/lianchentw/" target="_blank" rel="noreferrer">LinkedIn</a>
         •
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
      </p>
      {/* todo: Hamster's photo */}
      {/*<img src="../images/hamster-with-wheat-dumbbells.jpg" alt=""/>*/}
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
