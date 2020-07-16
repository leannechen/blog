import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default function About() {
  return (
    <Layout>
      <h1>About</h1>
      <p>This is About page</p>
      <Link to="/">Go Home</Link>
    </Layout>
  )
}
