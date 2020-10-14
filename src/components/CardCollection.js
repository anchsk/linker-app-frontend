import React from 'react'

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import AddedBy from './AddedBy'

const StyledCardCollection = styled.div`
  background-color: none;
  padding: 3px 0;

  margin-bottom: 3px;
  > a:first-of-type {
    display: inline-block;
    width: fit-content;
    font-weight: 600;
    color: var(--color-text);
    text-decoration: none;
    border-bottom: 3px solid var(--color-accent);
    margin-bottom: 3px;

    &:hover {
      border-bottom: 3px solid var(--color-accent-hover);
      transition: border-bottom .3s;
    }
  }
  > span {
    display: inline-block;
    opacity: 0.5;
    font-size: 0.9rem;
  }
  > p {
    font-size: 0.9rem;
    margin-bottom: 3px;
  }

  a.username {
    color: var(--color-text-secondary);

    &:before {
      content: '★';
      display: inline-block;
      font-size: 8px;
      vertical-align: super;
      text-decoration: none;
      margin-right: 2px;
    }
  }
`

const propTypes = {
  created_at: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  links: PropTypes.array,
  name: PropTypes.string.isRequired,
  updated_at: PropTypes.string,
  user: PropTypes.oneOfType([
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.name,
      username: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  variant: PropTypes.oneOf(['withControls', 'full', '']),
}

const defaultProps = {
  description: '',
}

const CardCollection = ({
  id,
  name,
  description,
  links,
  user,
  variant,
}) => {
  return (
    <StyledCardCollection>
      <Link to={`/c/${id}`}>{name}</Link>
      <span>&#8201;(&#8202;{links.length}&#8202;)</span>
      <p>{description}</p>
      {variant === 'full' &&
      <AddedBy username={user.username}/>}
      {/* {variant === 'widthControls' ? null : (
        <Link to={`/${user.username}`} className="username">{user.username}</Link>
      )} */}
    </StyledCardCollection>
  )
}

CardCollection.propTypes = propTypes
CardCollection.defaultProps = defaultProps

export default CardCollection
