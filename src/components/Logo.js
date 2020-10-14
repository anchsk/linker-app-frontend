import React from 'react'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as LinkerText } from '../assets/images/LinkerText.svg'
import { ReactComponent as StarLogo } from '../assets/images/StarLogoRounded.svg'

const StyledLink = styled(Link)`
  //background-color: yellow;
  
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  cursor: pointer;
  color: var(--color-text-secondary);
  overflow: hidden;
  &:hover {
    > #starLogo {
    svg > path {
    fill: rgb(242,188,89);
    transition: fill .3s;}
    }
  }

  #starLogo,
  #linkerText {
    display: grid;
    place-items: center;
  }

  #starLogo {
    // h: 10, w: 8
    align-self: flex-start;
    height: 25px;
    width: 20px;
    margin-right: 4px;
    // background-color: red;
    svg > path {
      //fill: rgba(0, 0, 0, .7);
      fill: var(--color-accent);
    }
    
  }
  #linkerText {
    // h: 4, w: 10
    align-self: flex-end;
    height: 32px;
    width: 80px;
    //background-color: green;
  }
  * > path {
    fill: black;
  }
`

const Logo = () => {
  return (
    <StyledLink to="/">
      <div id="starLogo">
        <StarLogo />
      </div>
      <div id="linkerText">
        <LinkerText />
      </div>
    </StyledLink>
  )
}

export default Logo
