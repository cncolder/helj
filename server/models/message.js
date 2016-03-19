'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _mongoose = require('./mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = require('../lib/debug')('app:models:message'); /**
                                                          * Message
                                                          *
                                                          * Messages received from wechat public account.
                                                          */

var Schema = _mongoose2.default.Schema;

var schema = new Schema({
  sp: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
  msgid: {
    type: Number
  },
  kind: {
    type: String,
    enum: ['text', 'image', 'voice', 'video', 'location', 'link', 'event', 'shortvideo'],
    required: true
  },
  text: {
    type: String
  },
  mediaid: {
    type: String
  },
  image: {
    url: String,
    size: Number,
    date: Date,
    format: String
  },
  location: {
    lat: Number,
    lng: Number,
    scale: Number,
    addr: String
  },
  link: {
    title: String,
    desc: String,
    url: String
  },
  event: {
    name: {
      type: String,
      enum: ['subscribe', 'unsubscribe', 'VIEW', 'CLICK', 'LOCATION', 'location_select', 'pic_sysphoto', 'pic_weixin', 'pic_photo_or_album', 'scancode_waitmsg', 'scancode_push']
    },
    key: String
  },
  voice: {
    format: String
  },
  video: {
    thumb: String
  },
  answer: {
    type: Schema.Types.Mixed
  }
}, {
  timestamps: true
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var _step$value = (0, _slicedToArray3.default)(_step.value, 2);

    var path = _step$value[0];
    var wxpath = _step$value[1];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop2 = function _loop2() {
        var w = _step2.value;

        schema.virtual(w).set(function (v) {
          if ('CreateTime' == w) v *= 1000; // add milliseconds

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = (0, _getIterator3.default)(Array.isArray(path) ? path : [path]), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var p = _step3.value;

              this.set(p, v);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        });
      };

      for (var _iterator2 = (0, _getIterator3.default)(Array.isArray(wxpath) ? wxpath : [wxpath]), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  };

  for (var _iterator = (0, _getIterator3.default)(new _map2.default([['sp', 'ToUserName'], ['uid', 'FromUserName'], ['msgid', 'MsgId'], ['kind', 'MsgType'], ['createdAt', 'CreateTime'], ['text', ['Content', 'Recognition']], ['mediaid', 'MediaId'], ['image.url', 'PicUrl'], ['location.lat', 'Latitude'], ['location.lng', 'Longitude'], ['location.scale', 'Precision'], ['location.addr', 'Label'], ['link.title', 'Title'], ['link.desc', 'Description'], ['link.url', 'Url'], ['event.name', 'Event'], ['event.key', 'EventKey'], ['voice.format', 'Format'], ['video.thumb', 'ThumbMediaId']])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

exports.default = _mongoose2.default.model('Message', schema);