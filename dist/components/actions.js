"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doubleChar = void 0;

const doubleChar = value => (value.length >= 2 ? value : "0" + value).slice(-2);

exports.doubleChar = doubleChar;