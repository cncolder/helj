import './style.less'
import React, {
  Component, PropTypes,
}
from 'react'
import {
  pushPath,
}
from 'redux-simple-router'
const log = require('debug')('client:components:nav-menu');

export default class NavMenu extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  constructor(props) {
    super(props)
  }

  render() {
    let items = this.props.items
    let width = `${100 / items.length}%`

    return (
      <div className="nav-menu">
        {
          items.map((item, i) => (
            <div className="nav-item" key={i} style={{width}}>
              <a
                className={item.link == location.hash && 'active' || ''}
                href={item.link}>
                <span>
                  {item.text}
                </span>
              </a>
            </div>
          ))
        }
      </div>
    )
  }
}
