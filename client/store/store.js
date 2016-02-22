/**
 * Store singleton
 */

import {createStore, applyMiddleware, combineReducers} from 'redux'
import promiseMiddleware from 'redux-promise'
import reducers from '../reducers'
import initialState from './initial-state'
import subscribeSocketIO from './subscribe-socket.io'
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

const store = createStoreWithMiddleware(reducers, initialState)

subscribeSocketIO(store)

export default store
