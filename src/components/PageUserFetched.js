import React, { useEffect, useState } from 'react'

import { Link, Route, Switch, useParams, useRouteMatch } from 'react-router-dom'

import { setNotificationError } from '../redux/notifications/notifications.actions'
import users from '../services/users'

import Loader from './Loader'
import NotFound from './NotFound'

import Main from './styled/Main'

function PageUserFetched() {
  let { path, url } = useRouteMatch()
  let { username } = useParams()

  const [fetchedUser, setFetchedUser] = useState()

  useEffect(() => {
    async function fetchUser() {
      try {
        let userData = await users.findByUsername(username)
        setFetchedUser(userData)
      } catch (err) {
        setNotificationError(err.message)
      }
    }
    fetchUser(username)
  }, [username])

  if (fetchedUser === undefined) {
    return <Loader />
  }

  if (fetchedUser === null) {
    return <NotFound explanation={`User ${username} doesn't exist`} />
  }

  return (
    <Main>
      <h1>{fetchedUser.name}</h1>
      <p>@{fetchedUser.username}</p>
      <br />
      <Link to={`${url}/links`}>Links</Link>{' '}
      <Link to={`${url}/collections`}>Collections</Link>

      <Switch>
        <Route exact path={path}></Route>
        <Route exact path={`${path}/links`}>
          <>
            <p>Links of {fetchedUser.name}</p>
            <p>In progress</p>
          </>
        </Route>
        <Route exact path={`${path}/collections`}>
          <>
            <p>Collections of {fetchedUser.name}</p>
            <p>In progress</p>
          </>
        </Route>
        <Route>
          <NotFound explanation={'Nothing is here'} />
        </Route>
      </Switch>
    </Main>
  )
}

export default PageUserFetched
