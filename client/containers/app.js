/**
 * App
 *
 * Main application.
 */

import {
  React, Component, PropTypes, createSelector, connect,
}
from '../lib'
import {
  getShop,
}
from '../actions/shop'
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
    shop: PropTypes.object,
    products: PropTypes.array,
    getShop: PropTypes.func.isRequired,
  };

  static defaultProps = {
    shop: {},
  };

  constructor(props) {
    super(props)
    this.props.getShop()
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUnmount() {}

  render() {
    return (
      <EaseIn className="app">
        <h1>{ this.props.shop.name }</h1>
        <CellsTitle>和隆记力荐</CellsTitle>
        <Cells className="products">{ this.props.products.filter(product => product.sample.tags.includes('和隆记力荐')).map((product, i) => (
          <Cell key={ i }>
            <CellHeader style={ {width: '55%'} }>
              <img className="cover"
                src={ product.sample.cover }
                alt={ product.sample.name } style={ {maxWidth: '96%'} } />
            </CellHeader>
            <CellBody>
              <h4 className="name">{ product.sample.name }</h4>
              <pre className="desc">{ product.sample.desc }</pre>
              <span className="price">{ product.sample.price }</span>
              <span className="rmb">RMB</span>
            </CellBody>
            <CellFooter/>
          </Cell>
        )) }</Cells>
        <CellsTitle>和隆记能量饭</CellsTitle>
        <Cells className="products">{ this.props.products.filter(product => product.sample.tags.includes('和隆记能量饭')).map((product, i) => (
          <Cell key={ i }>
            <CellHeader style={ {width: '55%'} }>
              <img className="cover"
                src={ product.sample.cover }
                alt={ product.sample.name } style={ {maxWidth: '96%'} } />
            </CellHeader>
            <CellBody>
              <h4 className="name">{ product.sample.name }</h4>
              <pre className="desc">{ product.sample.desc }</pre>
              <span className="price">{ product.sample.price }</span>
              <span className="rmb">RMB</span>
            </CellBody>
            <CellFooter/>
          </Cell>
        )) }</Cells>
      </EaseIn>
    )
  }
}


export const selector = createSelector(
  state => state.me,
  state => state.shop,

  (
    me = {},
    shop = {},
  ) => ({
    me,
    shop,
    products: shop.products || [],
  })
)

export default connect(selector, {
  getShop,
})(App)
