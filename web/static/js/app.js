import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store'
import App from 'containers/App'

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <App routerHistory={history} store={store} />,
  document.getElementById('main_container')
)