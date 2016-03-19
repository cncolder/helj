'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _expect = require('../lib/expect');

var _expect2 = _interopRequireDefault(_expect);

var _regex = require('../lib/regex');

var regex = _interopRequireWildcard(_regex);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passportLocalMongoose = require('passport-local-mongoose');

var _passportLocalMongoose2 = _interopRequireDefault(_passportLocalMongoose);

var _toJson = require('./plugins/to-json');

var _toJson2 = _interopRequireDefault(_toJson);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:user'); /**
                                                       * User
                                                       *
                                                       * User account for this system.
                                                       */

var Schema = _mongoose2.default.Schema;
var sexEnum = ['unknown', 'male', 'female'];
var schema = new Schema({
  wechat: {
    subscribe: Boolean,
    openid: {
      type: String,
      unique: true
    },
    nickname: String,
    sex: {
      type: String,
      enum: sexEnum,
      set: function set(v) {
        return (/^\d$/.test(v) ? sexEnum[parseInt(v, 10)] : v
        );
      }
    },
    language: String,
    city: String,
    province: String,
    country: String,
    headimgurl: String,
    subscribeAt: Date,
    unionid: String,
    remark: String,
    groupid: Number,
    token: Schema.Types.Mixed
  }
}, {
  timestamp: true
});

schema.plugin(_passportLocalMongoose2.default, {
  // https://github.com/saintedlama/passport-local-mongoose#options
  keylen: 32,
  iterations: 8
});

schema.plugin(_toJson2.default, {
  hide: 'hash salt'
});

schema.virtual('wechat.subscribe_time').get(function () {
  return ((this.wechat.subscribeAt || new Date()).getTime() / 1000).toFixed();
}).set(function (v) {
  this.wechat.subscribeAt = new Date(v * 1000);
});

schema.statics.findOneAndRegisterWechat = function (openid, wechat, callback) {
  var query = {
    'wechat.openid': openid
  };
  var update = {
    username: openid,
    role: 'wechat',
    wechat: wechat
  };
  var options = {
    new: true,
    upsert: true
  };
  if (callback) {
    this.findOneAndUpdate(query, update, options, callback);
  } else {
    return this.findOneAndUpdate(query, update, options);
  }
};

schema.statics.signup = function (user, password) {
  var _this = this;

  user.username = user.username.replace(/\s/g, '');
  password = password.replace(/\s/g, '');
  (0, _expect2.default)(password).to.be.a('string');
  (0, _expect2.default)(password.length).to.be.at.least(3);
  return new _promise2.default(function (resolve, reject) {
    _this.register(user, password, function (err, user) {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

schema.statics.auth = function (username, password) {
  return this.findByUsername(username).then(function (user) {
    (0, _expect2.default)(user).to.be.exist;
    return user.auth(password);
  });
};

schema.methods.auth = function (password) {
  var _this2 = this;

  password = password.replace(/\s/g, '');
  return new _promise2.default(function (resolve, reject) {
    _this2.authenticate(password, function (err, user, passwordErr) {
      if (err || passwordErr) return reject(err || passwordErr);
      resolve(user);
    });
  });
};

schema.methods.modifyPassword = function (old, password) {
  var _this3 = this;

  password = password.replace(/\s/g, '');
  (0, _expect2.default)(password).to.be.a('string', 'invalid password');
  (0, _expect2.default)(password.length).to.be.at.least(3, 'password too short');
  return this.auth(old).then(function (user) {
    return new _promise2.default(function (resolve, reject) {
      _this3.setPassword(password, function (err, user, passwordErr) {
        if (err || passwordErr) return reject(err || passwordErr);
        resolve(user);
      });
    });
  });
};

exports.default = _mongoose2.default.model('User', schema);