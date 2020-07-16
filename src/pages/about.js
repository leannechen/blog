import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default function About() {
  return (
    <div>
      <Header />
      <h1>About</h1>
      <p>This is About page</p>
      <Link to="/">Go Home</Link>
    </div>
  )
}
