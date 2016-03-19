import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import reactTapEventPlugin from 'react-tap-event-plugin'
import {
  Provider,
}
from 'react-redux'
import {
  Router, Route, IndexRoute, browserHistory,
}
from 'react-router'
import {
  syncHistoryWithStore
}
from 'react-router-redux'
import store from './store'
import subscribeSocketIO from './store/subscribe-socket.io'
import {
  App, Layout, Me, NoMatch,
}
from './containers'
const log = require('debug')('client:admin')


/**
 * Setup client
 */

reactTapEventPlugin()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

subscribeSocketIO(store)

/**
 * Router.
 */

const provider = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={App}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(provider, document.getElementById('client'))
