import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import Container from "../components/container"

export default function Home() {
  return (
    <Container>
      <Header />
      <h1 style={{ color: `purple` }}>Hello Gatsby!</h1>
      <p>Hello world!</p>
      <Link to="/about/">About</Link>
      <img src="https://source.unsplash.com/random/400x200" alt="" />

    </Container>
  )
}
