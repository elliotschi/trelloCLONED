import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { createEpicMiddleware } from 'redux-observable'
import reducers from 'reducers'
import epics from 'epics'

const DEV = process.env.NODE_ENV !== 'production'

export default browserHistory => {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const epicMiddleware = createEpicMiddleware(epics)

  let middleware = [
    reduxRouterMiddleware,
    epicMiddleware
  ]

  const store = createStore(
    reducers,
    compose(
      applyMiddleware(...middleware),
      typeof window.devToolsExtension !== 'undefined' &&
      DEV
        ? window.devToolsExtension()
        : f => f
    )
  )

  // sagaMiddleware.run(sagas)

  return store
}