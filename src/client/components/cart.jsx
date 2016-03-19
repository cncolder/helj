import noop from 'lodash/noop'
import {
  React, Component, PropTypes,
}
from '../lib'
import {
  Button, ButtonArea,
  Cells, CellsTitle, CellsTips, Cell, CellHeader, CellBody, CellFooter,
  Icon,
  Toast, Mask,
}
from 'react-weui'
const log = require('debug')('client:components:cart')


export default class Cart extends Component {
  static propTypes = {
    items: PropTypes.array,
    onHeightChange: PropTypes.func,
    onRemove: PropTypes.func.isRequired,
    onPay: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
    onHeightChange: noop,
    onRemove: noop,
    onPay: noop,
  };

  constructor(props) {
    super(props)
    this.state = {}
  }

  onCartInfoClick = (e) => this.setState({
    open: !this.state.open,
  })

  render() {
    let items = this.props.items

    if (!items || !items.length) {
      this.props.onHeightChange(0)
      return (
        <div />
      )
    }

    let totalPrice = items.reduce(((acc, item) => acc + item.sample.price), 0)

    return (
      <div className="cart" ref={ div => div && this.props.onHeightChange(div.clientHeight) }> { this.state.open && this.renderList(items) }
        { this.renderInfo(this.props.cart) }
        {/* this.state.open && (<Mask/>) */}
      </div>
    )
  }

  renderList(items) {
    return (
      <Cells className="cart-list">{ items.map((item, i) => (
        <Cell className="cart-item" key={i}>
          <CellBody>{ item.sample.name } * { item.amount }</CellBody>
          <CellFooter>
            <i className="icon-minus-circle" onClick={ () => this.props.onRemove(item) } />
          </CellFooter>
        </Cell>
      )) }</Cells>
    )
  }

  renderInfo(cart) {
    let totalAmount = (cart.products || []).reduce(((acc, item) => acc + item.amount), 0)
    let totalPrice = (cart.products || []).reduce(((acc, item) => acc + item.sample.price * item.amount),
      0)
    return (
      <Cells className="cart-info">
        <Cell className="cart-bar">
          <CellHeader onClick={ this.onCartInfoClick }>
            <i className="icon-cart" />
          </CellHeader>
          <CellBody onClick={ this.onCartInfoClick }>
            <span className="cart-total-amount">{ totalAmount }</span>
            <span className="cart-total-price">¥{ totalPrice }</span>
          </CellBody>
          <CellBody>
            <Button className="cart-payment" type="primary" size="small" onClick={ this.props.onPay }>结算</Button>
          </CellBody>
        </Cell>
      </Cells>
    )
  }
}
