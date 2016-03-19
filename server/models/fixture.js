'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _env = require('../lib/env');

var _env2 = _interopRequireDefault(_env);

var _configure = require('./configure');

var _configure2 = _interopRequireDefault(_configure);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _shop = require('./shop');

var _shop2 = _interopRequireDefault(_shop);

var _sample = require('./sample');

var _sample2 = _interopRequireDefault(_sample);

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:fixture'); /**
                                                          * Fixture
                                                          *
                                                          * initialize database.
                                                          */

var Fixture = function () {
  function Fixture(env) {
    (0, _classCallCheck3.default)(this, Fixture);

    this[env]();
  }

  (0, _createClass3.default)(Fixture, [{
    key: 'common',
    value: function common() {
      _promise2.default.all([this.version()]).catch(function () {});
    }
  }, {
    key: 'local',
    value: function local() {
      _promise2.default.all([this.sample()]).catch(function () {});
    }
  }, {
    key: 'version',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        var cfg;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _configure2.default.findOne({
                  key: 'version'
                });

              case 2:
                cfg = _context.sent;

                if (cfg) {
                  _context.next = 8;
                  break;
                }

                _context.next = 6;
                return _configure2.default.create({
                  key: 'version',
                  value: _package2.default.version
                });

              case 6:
                _context.next = 11;
                break;

              case 8:
                if (!(cfg.version != _package2.default.version)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 11;
                return cfg.update({
                  value: _package2.default.version
                });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      return function version() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'sample',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
        var sampleData, shop, samples, products;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sampleData = [{
                  sku: 'xjdmg',
                  name: '过足瘾小鸡炖蘑菇',
                  desc: '好吃到要报警的原始美味',
                  tags: ['和隆记能量饭'],
                  cover: '/img/products/11.jpg',
                  price: 18
                }, {
                  sku: 'glnr',
                  name: '私家小厨咖喱牛腩',
                  desc: '盖饭绝配的咖喱美味',
                  tags: ['和隆记力荐', '和隆记能量饭'],
                  cover: '/img/products/12.jpg',
                  price: 20
                }, {
                  sku: 'cgr',
                  name: '别和我抢拆骨肉',
                  desc: '剔骨, 拆肉......\n好吃不用自己动手',
                  tags: ['和隆记能量饭'],
                  cover: '/img/products/13.jpg',
                  price: 18
                }, {
                  sku: 'tslrf',
                  name: '阿嬷的台式卤肉饭',
                  desc: '一碗香喷喷的台湾味',
                  tags: ['和隆记力荐', '和隆记能量饭'],
                  cover: '/img/products/14.jpg',
                  price: 20
                }];
                _context2.next = 3;
                return _shop2.default.findOneAndUpdate({
                  name: '和隆记金川街店'
                }, {
                  name: '和隆记金川街店'
                }, {
                  new: true,
                  upsert: true
                });

              case 3:
                shop = _context2.sent;
                _context2.next = 6;
                return _promise2.default.all(sampleData.map(function (data) {
                  return _sample2.default.findOneAndUpdate({
                    sku: data.sku
                  }, data, {
                    new: true,
                    upsert: true
                  });
                }));

              case 6:
                samples = _context2.sent;
                _context2.next = 9;
                return _promise2.default.all(samples.map(function (sample) {
                  return _product2.default.findOneAndUpdate({
                    shop: shop, sample: sample
                  }, {
                    shop: shop, sample: sample, price: 20
                  }, {
                    new: true,
                    upsert: true
                  });
                }));

              case 9:
                products = _context2.sent;
                _context2.next = 12;
                return shop.update({
                  products: products.map(function (product) {
                    return product.id;
                  })
                });

              case 12:
                return _context2.abrupt('return', _context2.sent);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      return function sample() {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'development',
    value: function development() {
      this.common();
      this.local();
    }
  }, {
    key: 'staging',
    value: function staging() {
      this.common();
      this.local();
    }
  }, {
    key: 'production',
    value: function production() {
      this.common();
    }
  }]);
  return Fixture;
}();

try {
  new Fixture(_env2.default.env);
} catch (err) {
  log(err);
}