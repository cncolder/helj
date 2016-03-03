import defer from 'lodash/defer'
import {
  Component as ReactComponent,
}
from 'react'


export default class Component extends ReactComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  setStateDefer(nextState) {
    defer(this.setState.bind(this), nextState)
  }
}
