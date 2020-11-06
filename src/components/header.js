import React from "react"

import { Box, Heading } from "grommet"
import styled from "styled-components"

import Image from "../components/image"

const StyledHeading = styled(Heading)`
  color: #1d6cd2;
  font-family: 'Grandstander';
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
          <StyledHeading margin={{ horizontal: "xsmall", vertical: "none" }}>
            {siteTitle}
          </StyledHeading>
        </Box>
        <Box width="50px" animation="fadeIn" elevation="large">
          <Image />
        </Box>
      </Box>
    </Box>
  )
}

export default Header
