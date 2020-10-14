import React from 'react'

import styled from 'styled-components'

const StyledFooter = styled.footer`
  flex-shrink: 0;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 36px;
  //border-top: 1px dotted black;

  > p {
    font-size: 12px;
    color: var(--color-text-secondary);
  }
  
`

const Footer = () => (
  <StyledFooter>
    <p>©2020 Linker App</p>
  </StyledFooter>
)

export default Footer
