import './style.less'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
const log = require('debug')('app:components:ease-in')

export default class EaseIn extends ReactCSSTransitionGroup {
  static defaultProps = {
    transitionName: 'ease-in',
    transitionAppear: true,
    transitionEnter: true,
    transitionLeave: true,
    transitionAppearTimeout: 100,
    transitionEnterTimeout: 300,
    transitionLeaveTimeout: 200,
  };
}
