import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import { loginWithCredentials } from '../redux/user/login.actions'

import Button from './styled/Button'

const StyledFormLogin = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  padding: 12px;

  label {
    margin-bottom: 6px;
  }

  input {
    margin-bottom: 12px;
    min-height: 36px;
    padding: 6px 4px 4px 4px;
    overflow: hidden;
  }

  #loginButtonGroup {
    margin-top: 6px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const FormLogin = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    let thisForm = document.getElementById('loginForm')

    if (username && password) {
      return setIsFormValid(thisForm.checkValidity())
    } else {
      return setIsFormValid(false)
    }

    /* if (!username || !password) {
      return setIsFormValid(false)
    } */
  }, [username, password])

  const handleInputChange = (e) => {
    e.preventDefault()
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isFormValid) {
      dispatch(
        loginWithCredentials({
          password,
          username,
        })
      )
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <StyledFormLogin id="loginForm" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        required
        minLength="3"
        name="username"
        placeholder="Enter username..."
        type="text"
        value={username}
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        required
        minLength="3"
        name="password"
        placeholder="Enter password..."
        type="password"
        value={password}
        onChange={handleInputChange}
      />
      <div id="loginButtonGroup">
        <Button primary disabled={!isFormValid} type="submit">
          Login
        </Button>
        <Link to="/">Cancel</Link>
      </div>
    </StyledFormLogin>
  )
}

export default FormLogin
