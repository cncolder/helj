/**
 * Store singleton
 */

import {
  createStore, applyMiddleware, combineReducers
}
from 'redux'
import promiseMiddleware from 'redux-promise'
import {
  routerReducer
}
from 'react-router-redux'
import reducers from '../reducers'
import initialState from './initial-state'
const log = require('debug')('client:store')


let createStoreWithMiddleware

if ('production' == process.env.NODE_ENV) {
  createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)
} else {
  createStoreWithMiddleware = applyMiddleware(require('redux-logger')({
    collapsed: true,
    // Only output resolved promise result
    predicate: (state, action) => !action.payload.then
  }), promiseMiddleware)(createStore)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }
}

const store = createStoreWithMiddleware(combineReducers({
  ...reducers,
  routing: routerReducer,
}))


export default store
