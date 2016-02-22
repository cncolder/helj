/**
 * Toast
 *
 * Modified from react-ui/src/components/toast/toast.js
 */


import React from 'react';
import classNames from 'classnames';
import {
  Mask,
  Icon,
}
from 'react-weui';


class Toast extends React.Component {
  static propTypes = {};

  static defaultProps = {
    show: true,
    loading: true,
    icon: 'toast',
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
    };
  }

  componentDidMount() {
    if (this.props.time)
      this.timer = setTimeout(() => this.state.show = false);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let {
      id,
      className,
      loading,
      icon,
      children,
    } = this.props;
    let show = this.state.show;
    let display = show ? 'block' : 'none';
    let style = {
      display,
    };
    className = classNames('weui_toast', this.props.className);

    return (
      <div id={id} className={className} style={style}>
        <Mask show={show} transparent/>
        <div className="weui_toast">
          {loading && (
            <div className="weui_loading">
              <div className="weui_loading_leaf weui_loading_leaf_0"></div>
              <div className="weui_loading_leaf weui_loading_leaf_1"></div>
              <div className="weui_loading_leaf weui_loading_leaf_2"></div>
              <div className="weui_loading_leaf weui_loading_leaf_3"></div>
              <div className="weui_loading_leaf weui_loading_leaf_4"></div>
              <div className="weui_loading_leaf weui_loading_leaf_5"></div>
              <div className="weui_loading_leaf weui_loading_leaf_6"></div>
              <div className="weui_loading_leaf weui_loading_leaf_7"></div>
              <div className="weui_loading_leaf weui_loading_leaf_8"></div>
              <div className="weui_loading_leaf weui_loading_leaf_9"></div>
              <div className="weui_loading_leaf weui_loading_leaf_10"></div>
              <div className="weui_loading_leaf weui_loading_leaf_11"></div>
            </div>
          ) || <Icon value={icon}/>}
          <p className="weui_toast_content">{children}</p>
        </div>
      </div>
    );
  }
}


export default Toast;
