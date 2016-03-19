'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promisePendingMiddleware;

var _fluxStandardAction = require('flux-standard-action');

var _isPromise = require('./is-promise');

var _isPromise2 = _interopRequireDefault(_isPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Redux promise pending status middleware
 */
function promisePendingMiddleware(_ref) {
  var dispatch = _ref.dispatch;

  return function (next) {
    return function (action) {
      if ((0, _fluxStandardAction.isFSA)(action) && (0, _isPromise2.default)(action.payload)) {
        dispatch({
          type: action.type + '_PENDING'
        });
      }
      next(action);
    };
  };
}