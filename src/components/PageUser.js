import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Loader from './Loader'
import PageUserFetched from './PageUserFetched'
import PageUserLoggedIn from './PageUserLoggedIn'

import Main from './styled/Main'

// /:username
const PageUser = () => {
  let { username } = useParams()

  let loggedInUsername = useSelector(state =>
    state.user.username)


  if (loggedInUsername === undefined) {
    return <Main>
      <Loader />
    </Main>
  }
  if (loggedInUsername === username) {
    return <PageUserLoggedIn />
  }

  return <PageUserFetched />
}

export default PageUser
