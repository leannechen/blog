import React from "react"
import containerStyles from "./container.module.css"
import { Link } from "gatsby"

export default function Container({ children }) {
  return (
    <div className={containerStyles.container}>
      <header className={containerStyles.header}>
        <h3 className={containerStyles.title}>Leanne's Blog</h3>
        <ul className={containerStyles.navList}>
          <li className={containerStyles.navItem}>
            <Link to="/" className={containerStyles.navLink}>Home</Link>
          </li>
          <li className={containerStyles.navItem}>
            <Link to="/about/" className={containerStyles.navLink}>About</Link>
          </li>
          <li className={containerStyles.navItem}>
            <Link to="/about-css-modules/" className={containerStyles.navLink}>CSS Modules</Link>
          </li>
        </ul>
      </header>
      {children}
      <footer>
        <a href="https://twitter.com">Twitter</a>
        •
        <a href="https://github.com">Github</a>
      </footer>
    </div>
  )
}
