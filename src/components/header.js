import React from "react"

import { Box, Heading } from "grommet"
import styled from "styled-components"

import Image from "../components/image"

const ColoredHeading = styled(Heading)`
  color: #1d6cd2;
`

const Header = ({ siteTitle }) => {
  return (
    <Box as="header">
      <Box
        direction="row"
        pad="medium"
        align="center"
        justify="center"
        gap="small"
      >
        <Box align="end">
          <Heading level={4} margin="none">
            Welcome to
          </Heading>
          <ColoredHeading margin={{ horizontal: "xsmall", vertical: "none" }}>
            {siteTitle}
          </ColoredHeading>
        </Box>
        <Box width="50px" animation="fadeIn" elevation="large">
          <Image />
        </Box>
      </Box>
    </Box>
  )
}

export default Header
