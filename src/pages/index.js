import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default function Home() {
  return (
    <div>
      <Header />
      <h1 style={{ color: `purple` }}>Hello Gatsby!</h1>
      <p>Hello world!</p>
      <Link to="/about/">About</Link>
      <img src="https://source.unsplash.com/random/400x200" alt="" />

    </div>
  )
}
