import React from "react"
import { Link } from "gatsby"
import Container from "../components/container"

export default function About() {
  return (
    <Container>
      <h1>About</h1>
      <p>This is About page</p>
      <Link to="/">Go Home</Link>
    </Container>
  )
}
