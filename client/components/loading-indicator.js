import debug from 'debug';
import React from 'react';
import Toast from './toast';
// import {
//   Toast,
// }
// from 'react-weui';


const log = debug('app:components:loading-indicator');


export default class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toast show={this.state.show}
        loading={this.state.loading}
        time={this.state.time}>
        {this.state.text}
      </Toast>
    );
  }
}
