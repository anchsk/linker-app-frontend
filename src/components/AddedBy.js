import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledP = styled.p`
  color: rgb(110, 110, 110);
  display: inline-block;
  color: var(--color-text-secondary);

  a {
   color: var(--color-text-secondary);
 
  &:hover {
   opacity: 0.5;
  }
  }
`

const AddedBy = ({ username }) => {
  return (
    <StyledP>
      Added by <Link to={`/${username}`}>{username}</Link>
    </StyledP>
  )
}

export default AddedBy
