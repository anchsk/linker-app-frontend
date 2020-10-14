import React from 'react'

import styled, { css } from 'styled-components'

import AddedBy from './AddedBy'

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  align-items: center;

  > .pageName {
    margin-bottom: 6px;
    color: var(--color-text-secondary);
  }

  > h2 {
    font-weight: 600;
    margin-bottom: 6px;
  }

  ${(props) =>
    props.username &&
    css`
      p:last-of-type {
        margin-top: 8px;
      }
    `}
`

const PageCollectionHeader = ({ name, description, username }) => {
  return (
    <StyledHeader username>
      <p className="pageName">Collection</p>
      <h2>{name}</h2>

      <p className="collectionDescription">{description}</p>
      {username && <AddedBy username={username} />}
    </StyledHeader>
  )
}

export default PageCollectionHeader
