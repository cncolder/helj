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
import {
  addToCart,
  removeFromCart,
}
from '../actions/cart'
import {
  Button, ButtonArea,
  Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter,
  Icon,
  Toast,
}
from 'react-weui'
import EaseIn from '../components/ease-in'
import Cart from '../components/cart'
const log = require('debug')('client:containers:app')


export class App extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    cart: PropTypes.object.isRequired,
    cartItems: PropTypes.array.isRequired,
    getShop: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
  };

  static defaultProps = {
    shop: {},
    products: [],
    cart: {},
    cartItems: [],
  };

  constructor(props) {
    super(props)
    this.state = {}
    this.props.getShop()
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  onCartHeightChange = e => {
    if (e != this.state.cartHeight) this.setStateDefer({
      cartHeight: e,
    })
  }

  onPay = e => {
    e.preventDefault()
  }

  render() {
    const {
      shop, cart,
    } = this.props
    if (shop.name && document.title != shop.name) document.title = shop.name
    return (
      <EaseIn className="app" style={ {paddingBottom: this.state.cartHeight || 0} }>
        { ['和隆记力荐', '和隆记能量饭'].map(this.renderTag) }
        { this.renderCart(cart) }
      </EaseIn>
    )
  }

  renderTag = (tag, index) => {
    const products = this.props.products.filter(({
      sample: {
        tags,
      },
    }) => tags.includes(tag))
    return (
      <div key={ index }>
        <CellsTitle className="tag-name">{ tag }</CellsTitle>
        <Cells className="products">
          { products.map(this.renderProduct) }
        </Cells>
      </div>
    )
  }

  renderProduct = (product, index) => {
    let cartItem = this.props.cartItems.find(item => item.id == product.id)
    let minusButton = cartItem ? (
      <i className="icon-minus-circle" onClick={ () => this.props.removeFromCart(product) } />
    ) : (
      <span />
    )
    return (
      <Cell className="product" key={ index }>
        <CellBody className="weui_cell_bd weui_cell_primary image">
          <img className="cover"
            src={ product.sample.cover }
            alt={ product.sample.name } />
        </CellBody>
        <CellBody className="weui_cell_bd weui_cell_primary container">
          <div className="content">
            <span className="sn">{ index + 1 }</span>
            <h4 className="name">{ product.sample.name }</h4>
            <p className="desc">{ product.sample.desc }</p>
            <div className="price">
              { product.sample.price }
              <span className="rmb">rmb</span>
            </div>
            <div className="action">
              { minusButton }
              <span className="amount">{ cartItem ? cartItem.amount : '' }</span>
              <i className="icon-plus-circle" onClick={ () => this.props.addToCart(product) } />
            </div>
          </div>
        </CellBody>
        <CellFooter/>
      </Cell>
    )
  }

  renderCart = (cart) => {
    return (
      <Cart cart={ cart } items={ cart.products || [] }
        onHeightChange={ this.onCartHeightChange }
        onRemove={ this.props.removeFromCart }
        onPay={ this.onPay } />
    )
  }
}


export const selector = createSelector(
  state => state.me,
  state => state.shop,
  state => state.cart,

  (
    me = {},
    shop = {},
    cart = {},
  ) => ({
    me,
    shop,
    products: shop.products || [],
      cart,
      cartItems: cart.products || [],
  })
)

export default connect(selector, {
  getShop, addToCart, removeFromCart,
})(App)
