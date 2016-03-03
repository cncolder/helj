/**
 * Redux promise pending status middleware
 */
import {
  isFSA
}
from 'flux-standard-action'
import isPromise from './is-promise'


export default function promisePendingMiddleware({
  dispatch
}) {
  return next => action => {
    if (isFSA(action) && isPromise(action.payload)) {
      dispatch({
        type: `${action.type}_PENDING`
      })
    }
    next(action)
  }
}
