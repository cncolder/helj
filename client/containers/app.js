/**
 * App
 *
 * The main playground.
 */

import React, {
  Component, PropTypes,
}
from 'react'
import {
  connect,
}
from 'react-redux'
import {
  createSelector
}
from 'reselect'
import EaseIn from '../components/ease-in'
import {
  Button, ButtonArea,
  Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter,
  Icon,
  Toast,
}
from 'react-weui'
const log = require('debug')('client:containers:app')

export class App extends Component {
  static propTypes = {
    phase: PropTypes.object,
    getCurrentPhase: PropTypes.func.isRequired,
    getWaitingPhase: PropTypes.func.isRequired,
    getLatestDiviPhase: PropTypes.func.isRequired,
  };

  static defaultProps = {
    phase: {},
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  render() {
    return (
      <EaseIn>
        <CellsTitle>App</CellsTitle>
      </EaseIn>
    )
  }
}

const empty = Array(10).fill(0)

export const selector = createSelector(
  state => state.me.user,

  (me) => ({
    me,
  })
)

export default connect(selector, {})(App)
