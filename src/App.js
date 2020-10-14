import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Footer from './components/Footer'
import Header from './components/Header'
import Notification from './components/Notification'
import PageCollection from './components/PageCollection'
import PageCollectionFetched from './components/PageCollectionFetched'
import PageDashboard from './components/PageDashboard'
import PageExplore from './components/PageExplore'
import PageLogin from './components/PageLogin'
import PageUser from './components/PageUser'
import PageWelcome from './components/PageWelcome'
import {
  getAllTags,
  getInitialCollections,
  getInitialLinks,
} from './redux/app/app.actions'
import { setNotificationError } from './redux/notifications/notifications.actions'
import { getUserData } from './redux/user/user.actions'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    if (user.isLoggedIn) {
      try {
      dispatch(getUserData(user.id))
      } catch (err) {
        dispatch(setNotificationError(`Couldn't get data. Error: ${err.message}`))
      }
    }
  }, [dispatch, user.isLoggedIn, user.id])

  useEffect(() => {
    try {
    dispatch(getInitialLinks())
    dispatch(getInitialCollections())
    dispatch(getAllTags())
    } catch (err) {
      setNotificationError(`Couldn't get data. Error: ${err.message}`)
    }
  }, [dispatch])

  return (
    <>
      {/* div#root */}
      <Notification />

      {user.isLoggedIn ? <Header logged /> : <Header guest />}

      <Switch>
        <Route path='/login'>
          <PageLogin />
        </Route>

        <Route path='/explore'>
          <PageExplore />
        </Route>

        <Route path='/c/:id'>
          {user.isLoggedIn ? <PageCollection /> : <PageCollectionFetched />}
        </Route>

        <Route path='/:username'>
          <PageUser />
        </Route>

        <Route path='/'>
          {user.isLoggedIn ? <PageDashboard user={user} /> : <PageWelcome />}
        </Route>

        <Route>
          <h1>404 (app.js)</h1>
        </Route>
      </Switch>

      <Footer />
    </>
  )
}

export default App
