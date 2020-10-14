import React from 'react'

import styled from 'styled-components'


import FormLogin from './FormLogin'
import Logo from './Logo'

import Main from './styled/Main'

const MainLoginPage = styled(Main)`
  z-index: 99;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
   margin-bottom: 12px;
  }
`

const LoginPage = () => {
  return (
    <MainLoginPage>
      <Logo />
      <FormLogin />
    </MainLoginPage>
  )
}

export default LoginPage
