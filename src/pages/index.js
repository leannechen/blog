import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default function Home() {
  return (
    <Layout>
      <h1 style={{ color: `purple` }}>Hello Gatsby!</h1>
      <p>Hello world!</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
  )
}
