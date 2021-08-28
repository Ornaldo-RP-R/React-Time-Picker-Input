"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ArrowDown;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ArrowDown(props) {
  return /*#__PURE__*/_react.default.createElement("span", _extends({
    className: "arrow-down "
  }, props), /*#__PURE__*/_react.default.createElement("svg", {
    id: "svg",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    width: "11",
    height: "11",
    viewBox: "0, 0, 400,234.28571428571428"
  }, /*#__PURE__*/_react.default.createElement("g", {
    id: "svgg"
  }, /*#__PURE__*/_react.default.createElement("path", {
    id: "path0",
    d: "M20.238 19.684 C 11.563 22.563,7.276 31.751,10.863 39.780 C 12.584 43.631,191.111 221.884,194.524 223.158 C 197.636 224.321,202.364 224.321,205.476 223.158 C 208.889 221.884,387.416 43.631,389.137 39.780 C 393.400 30.237,386.396 19.359,375.952 19.304 C 369.102 19.267,377.188 11.743,283.927 104.935 L 199.997 188.803 116.308 105.133 C 47.624 36.465,32.216 21.286,30.370 20.477 C 27.506 19.221,22.754 18.849,20.238 19.684 ",
    stroke: "none",
    fill: "#000000",
    fillRule: "evenodd"
  }))));
}