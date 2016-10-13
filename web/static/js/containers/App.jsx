import React from 'react'
import { Provider } from 'react-redux'
import { Router, RoutingContext } from 'react-router'
import invariant from 'invariant'
import configRoutes from 'routes/index.jsx'

const App = ({ routerHistory, store }) => {
  invariant(
    routerHistory,
    '<App /> needs either a routingContext or routerHistory to render'
  )

  return (
    <Provider store={store}>
      <Router history={routerHistory}>
        {configRoutes(store)}
      </Router>
    </Provider>
  )
}

export default App;