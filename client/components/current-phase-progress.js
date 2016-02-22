import debug from 'debug';

import React, {
  Component,
  PropTypes,
}
from 'react'

import {
  Progress,
}
from 'react-weui';


const log = debug('app:components:current-phase-progress');

export default class CurrentPhaseProgress extends Component {
  static propTypes = {
    progress: PropTypes.number.isRequired,
  }

  static defaultProps = {
    progress: 0,
  }

  render() {
    return (
      <Progress value={this.props.progress}></Progress>
    );
  }
}
