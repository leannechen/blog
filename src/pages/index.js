import React from "react"
import { Link } from "gatsby"
import Container from "../components/container"

export default function Home() {
  return (
    <Container>
      <h1 style={{ color: `purple` }}>Hello Gatsby!</h1>
      <p>Hello world!</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Container>
  )
}
