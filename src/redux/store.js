import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import app from './app/app.reducer'
import notification from './notifications/notifications.reducer'
import ui from './ui/ui.reducer'
import user from './user/user.reducer'

const rootReducer = combineReducers({
  app,
  notification,
  ui,
  user,
})

const middlewares = [thunk]

const logger = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
})

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

//const store = createStore(reducer, applyMiddleware(thunk))
const store = createStore(rootReducer, applyMiddleware(...middlewares))
//console.log(store.getState())
export default store
