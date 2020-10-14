import React from 'react'

import { useSelector } from 'react-redux'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'

import Main from './styled/Main'

function PageUserLoggedIn() {
  let { path, url } = useRouteMatch()

  const user = useSelector((state) => state.user)

  return (
    <Main>
      <h1>{user.name}</h1>
      <Link to={`${url}/links`}>Links</Link>{' '}
      <Link to={`${url}/collections`}>Collections</Link>

      <Switch>
        <Route exact path={path}></Route>
        <Route path={`${path}/links`}></Route>
        <Route path={`${path}/collections`}></Route>
      </Switch>
    </Main>
  )
}

export default PageUserLoggedIn
