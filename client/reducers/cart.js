/**
 * Current phase reducer
 */
import {
  handleActions,
}
from 'redux-actions'


export default handleActions({
  ADD_TO_CART: (state, action) => {
    let nextState = {
      ...state,
    }
    if (!nextState.products) nextState.products = []

    let addedProduct = {
      ...action.payload,
    }
    let existedProduct = nextState.products.find(product => product.id == addedProduct.id)
    if (existedProduct) {
      existedProduct.amount += 1
    } else {
      addedProduct.amount = 1
      nextState.products.push(addedProduct)
    }

    return nextState
  },

  REMOVE_FROM_CART: (state, action) => {
    let nextState = {
      ...state,
    }
    if (!nextState.products) return state

    let removedProduct = {
      ...action.payload,
    }
    let existedProduct = nextState.products.find(product => product.id == removedProduct.id)
    if (existedProduct) {
      if (existedProduct.amount > 1) {
        existedProduct.amount -= 1
      } else {
        nextState.products = nextState.products.filter(product => product.id !=
          existedProduct.id)
      }
    } else {
      return state
    }

    return nextState
  },
}, {})
