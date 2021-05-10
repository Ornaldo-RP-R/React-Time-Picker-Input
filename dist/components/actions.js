"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOnMobileDevice = exports.doubleChar = void 0;

require("core-js/modules/es.string.match.js");

const doubleChar = value => (value.length >= 2 ? value : "0" + value).slice(-2);

exports.doubleChar = doubleChar;

const isOnMobileDevice = () => {
  console.log(navigator.userAgent);
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /IEMobile/i, /Opera Mini/i];
  return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem));
};

exports.isOnMobileDevice = isOnMobileDevice;