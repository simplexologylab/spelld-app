import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <Link to="/">Back</Link>
    <h1>About</h1>
    <p>A simple app for helping train for spelling words. Works best from a laptop.</p>
    <h2>Known Issues</h2>
    <p>When using on a mobile device or tablet there isn't a way to turn off the auto-suggest/correct</p>
  </Layout>
)

export default AboutPage