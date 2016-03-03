import './style.less'
import {
  React, Component, PropTypes, createSelector, connect,
}
from '../lib'
import * as meActions from '../actions/me'
const log = require('debug')('client:containers:layout')


class Layout extends Component {
  static propTypes = {
    getWhoami: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.props.getWhoami()
  }

  render() {
    return (
      <div className="layout" >
        { this.props.children }
      </div>
    )
  }
}

export const selector = createSelector(
  state => state.me,

  (
    me = {},
  ) => ({
    role: me.role
  })
)

export default connect(selector, {
  ...meActions,
})(Layout)
