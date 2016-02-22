import './style.less'
import React, {
  Component, PropTypes
}
from 'react'
import {
  connect
}
from 'react-redux'
import {
  createSelector
}
from 'reselect'
import * as meActions from '../actions/me'
import NavMenu from '../components/nav-menu'
import LoadingIndicator from '../components/loading-indicator'
import Login from './login'
const log = require('debug')('client:containers:layout')

class Layout extends Component {
  static propTypes = {
    role: PropTypes.string,
    getWhoami: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.props.getWhoami()
  }

  renderContent() {
    const itemsMap = {
      player: [{
        text: '玩家',
        link: '#/',
      }, {
        text: '庄家',
        link: '#/pot',
      }, {
        text: '流水',
        link: '#/trade',
      }, {
        text: '帐户',
        link: '#/me',
      }, ],
      manager: [{
        text: '列表',
        link: '#/phase',
      }, {
        text: '会员',
        link: '#/user',
      }, {
        text: '工单',
        link: '#/ticket',
      }, {
        text: '帐户',
        link: '#/me',
      }, ],
    }
    const items = itemsMap[this.props.role]

    if (this.props.role) {
      return (
        <div>
          {this.props.children}
          <NavMenu items = {items} />
        </div>
      )
    } else {
      return (
        <Login / >
      )
    }
  }

  render() {
    return (
      <div className = "main" >
        {this.renderContent()}
      </div>
    )
  }
}

export const selector = createSelector(
  state => state.me.user,

  user => ({
    role: user.role
  })
)

export default connect(selector, {
  ...meActions,
})(Layout)
