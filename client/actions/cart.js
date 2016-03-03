import {
  createAction
}
from 'redux-actions'
import * as api from '../lib/api'


export const addToCart = createAction('ADD_TO_CART')
export const removeFromCart = createAction('REMOVE_FROM_CART')
