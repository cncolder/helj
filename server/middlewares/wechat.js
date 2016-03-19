'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _coWechat = require('co-wechat');

var _coWechat2 = _interopRequireDefault(_coWechat);

var _wechatApi = require('../lib/wechat-api');

var _wechatApi2 = _interopRequireDefault(_wechatApi);

var _message = require('../models/message');

var _message2 = _interopRequireDefault(_message);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:middlewares:wechat'); /**
                                                              * Wechat
                                                              */

var WECHAT_MENU = {
  button: [{
    type: 'view',
    name: '电话外卖',
    url: 'tel://85575556',
    sub_button: []
  }]
};

/*{
    type: 'view',
    name: '叫外卖',
    url: config.rootUrl,
    sub_button: [],
  }, {
    type: 'view',
    name: '退出',
    url: `${config.rootUrl}/auth/logout`,
    sub_button: [],
  },*/
_wechatApi2.default.getMenuAsync().then(function (result) {
  if ((0, _isEqual2.default)(result.menu, WECHAT_MENU)) {
    log('newest menu %o', result.menu);
  } else {
    log('update menu %o', WECHAT_MENU);
    return _wechatApi2.default.createMenuAsync(WECHAT_MENU);
  }
}).catch(function (err) {
  if ('WeChatAPIError' == err.name && err.message.startsWith('menu no exist')) {
    log('create menu %o', WECHAT_MENU);
    return _wechatApi2.default.createMenuAsync(WECHAT_MENU);
  } else {
    log('get menu error %o', err);
  }
}).catch(log);

var Router = function () {
  (0, _createClass3.default)(Router, null, [{
    key: 'textLink',
    value: function textLink(text, href) {
      return '<a href=\'' + href + '\'>' + text + '</a>';
    }
  }]);

  function Router(ctx) {
    (0, _classCallCheck3.default)(this, Router);

    log('receive %o', ctx.weixin);

    this.ctx = ctx;
  }

  (0, _createClass3.default)(Router, [{
    key: 'isNew',
    value: function isNew() {
      return !this.ctx.wxsession.uid;
    }
  }, {
    key: 'run',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var ctx, weixin, kind;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ctx = this.ctx;
                weixin = ctx.weixin;


                ctx.msg = new _message2.default(weixin);

                kind = ctx.msg.kind;

                if (!this[kind]) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return this[kind]();

              case 7:
                _context.next = 10;
                break;

              case 9:
                this.unknown();

              case 10:

                // ctx.wxsession.uid = ctx.msg.uid
                ctx.msg.answer = ctx.body;

                if (ctx.body) log('answer %o', ctx.body);

                _context.prev = 12;
                _context.next = 15;
                return ctx.msg.save();

              case 15:
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](12);

                log(_context.t0);

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 17]]);
      }));
      return function run() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'text',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var ctx;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ctx = this.ctx;

                ctx.body = _config2.default.rootUrl;

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      return function text() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'image',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      return function image() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'voice',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      return function voice() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'event',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var ctx, msg, _msg$event, name, key;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                ctx = this.ctx;
                msg = ctx.msg;
                _msg$event = msg.event;
                name = _msg$event.name;
                key = _msg$event.key;
                _context5.t0 = name;
                _context5.next = _context5.t0 === 'subscribe' ? 8 : _context5.t0 === 'CLICK' ? 9 : _context5.t0 === 'VIEW' ? 10 : _context5.t0 === 'pic_sysphoto' ? 10 : _context5.t0 === 'pic_weixin' ? 10 : _context5.t0 === 'LOCATION' ? 11 : 12;
                break;

              case 8:
                return _context5.abrupt('return', this.intro());

              case 9:
                return _context5.abrupt('return', this.click());

              case 10:
                return _context5.abrupt('return');

              case 11:
                return _context5.abrupt('break', 13);

              case 12:
                return _context5.abrupt('return', this.unknown());

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      return function event() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'click',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      return function click() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'unknown',
    value: function unknown() {
      var ctx = this.ctx;

      ctx.body = '没看懂... /::~';
    }
  }, {
    key: 'intro',
    value: function intro() {
      var ctx = this.ctx;
      var klass = this.constructor;

      ctx.body = '用心做好外卖\n    微信点餐即将开放, 如需订餐请拨打电话 ' + this.constructor.textLink(85575556, 'tel://85575557');
    }
  }, {
    key: 'help',
    value: function help() {
      var ctx = this.ctx;

      ctx.body = '';
    }
  }, {
    key: 'preview',
    value: function preview() {
      var ctx = this.ctx;
    }
  }, {
    key: 'save',
    value: function save() {
      var ctx = this.ctx;
    }
  }]);
  return Router;
}();

/**
 * Export
 */

exports.default = (0, _coWechat2.default)(_config2.default.wechat).middleware(_regenerator2.default.mark(function _callee7(next) {
  return _regenerator2.default.wrap(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return new Router(this).run();

        case 2:
        case 'end':
          return _context7.stop();
      }
    }
  }, _callee7, this);
}));