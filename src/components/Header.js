import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ReactComponent as FaceCircle } from '../assets/images/FaceCircle.svg'
import { logout } from '../redux/user/login.actions'

import Logo from './Logo'

const StyledHeader = styled.header`
  flex-shrink: 0;

  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 72px;

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 600px;
    a {
      color: black;
    }
  }

  #loginLink {
    //background-color: yellow;
    display: grid;
    place-items: center;
    width: fit-content;
    height: fit-content;
    padding-bottom: 1px;
    color: black;
    text-decoration: none;
    border-bottom: 1px solid black;
    opacity: 1;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
      transition: opacity 0.3s;
    }
  }

  #userMenu {
    position: absolute;
    //relative to header!
    top: 0;
    right: 0;
    border: none;
    display: flex;
    flex-direction: column;

    outline: none;
  }

  #userLogo {
    cursor: pointer;
    align-self: flex-end;
    height: 72px;
    width: fit-content;
    display: grid;
    place-items: center;
    background: transparent;

    svg {
      width: 30px;
      height: 30px;
      margin-top: 2px;
      transition: transform 0.5s;
      circle:first-of-type {
        fill: var(--color-accent);
      }
      &:hover {
        transform: scale(1.1);
        /* circle:first-of-type {
          fill: var(--color-accent-hover);
          transition: fill .3s;
        } */
      }
    }
  }

  #userMenuOpened {
    border-radius: none;
    border: 1px solid var(--color-accent);
    position: relative;
    background-color: var(--color-accent);
    display: flex;
    flex-direction: column;
    min-width: fit-content:
    width: fit-content;
    z-index: 10;
    overflow: hidden;


    > a {
      padding: 6px;
      padding-left: 12px;
      padding-right: 24px;
      color: black;
      text-decoration: none;
      border-bottom: 1px solid var(--color-bg);

      &:hover {
        background-color: var(--color-bg);
        border-bottom: 1px solid var(--color-accent);
      }
    }
  }
  @media (max-width: 370px) {
    max-width: 370px;
    /* nav {
      background-color: green;
    } */
  }

  #buttonLogout {
    align-self: flex-end;
    margin: 12px 0px;
    background: transparent;
    width: fit-content;
    border: none;
    border: 0;
    padding-right: 6px;
    cursor: pointer;
    &:hover {
      color: var(--color-invalid);
    }
  }
`

const Header = ({ logged, guest }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    history.push('/')
  }

  const toggleUserMenu = (e) => {
    e.preventDefault()
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <StyledHeader>
      <Logo />
      {guest && (
        <Link id="loginLink" to="/login">
          Login
        </Link>
      )}

      {logged && (
        <>
          <nav></nav>

          <div id="userMenu">
            <div id="userLogo" role="button" onClick={toggleUserMenu}>
              <FaceCircle />
            </div>
            {isUserMenuOpen && (
              <div id="userMenuOpened" onMouseLeave={toggleUserMenu}>
                <Link to={`/${user.username}/links`}>Links</Link>
                <Link to={`/${user.username}/collections`}>Collections</Link>
                <Link to={`/${user.username}`}>Profile</Link>
                <Link to={'/explore'}>Explore</Link>
                <button id="buttonLogout" type="button" onClick={handleLogout}>
                  Logout &rarr;
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </StyledHeader>
  )
}

export default Header
