"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var phone = exports.phone = /^\d{11}$/;

// http://www.w3.org/TR/html-markup/input.email.html#input.email.attrs.value.single
var email = exports.email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

var chineseName = exports.chineseName = /^[\u4e00-\u9fa5]{2,5}$/;