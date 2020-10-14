import './fonts.css'

import React from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router,Route } from 'react-router-dom'

import App from './App'
import GlobalStyle from './globalStyle'
import store from './redux/store'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Route component={App} path="/" />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
