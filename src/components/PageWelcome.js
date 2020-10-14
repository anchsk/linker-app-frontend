import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Main from './styled/Main'

const MainWelcome = styled(Main)`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    margin-bottom: 10px;
  }

  .explore {
    margin: 16px 0;
    padding-bottom: 1px;
    display: block;
    border-bottom: 4px solid var(--color-accent);
    text-decoration: none;
    color: black;
    font-size: 1.4rem;
    font-weight: 600;
    &:hover {
      border-bottom: 4px solid var(--color-accent-hover);
      transition: border-bottom .5s;
    }
  }
`

const PageWelcome = () => (
  <MainWelcome>
    <h2>Welcome to the Linker</h2>
    <p>Save and organize your favorite links</p>
    <Link className="explore" to="/explore" >
      Explore
    </Link>
  </MainWelcome>
)

export default PageWelcome
