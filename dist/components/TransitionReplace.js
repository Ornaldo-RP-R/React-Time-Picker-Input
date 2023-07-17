import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.error.cause.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect } from "react";
function TransitionReplace(props) {
  var transitionName = props.transitionName,
    transitionEnterTimeout = props.transitionEnterTimeout,
    transitionLeaveTimeout = props.transitionLeaveTimeout,
    children = props.children;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    shouldRender = _useState2[0],
    setShouldRender = _useState2[1];
  useEffect(() => {
    setShouldRender(true);
  }, []);
  var handleTransitionEnd = () => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  };
  var handleExit = () => {
    setShouldRender(false);
  };
  var duration = shouldRender ? transitionEnterTimeout : transitionLeaveTimeout;
  var enterClass = shouldRender ? 'enter' : 'exit';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(transitionName, "-").concat(enterClass, " ").concat(transitionName, "-").concat(enterClass, "-active"),
    style: {
      transitionDuration: "".concat(duration, "ms")
    },
    onAnimationEnd: shouldRender ? handleTransitionEnd : handleExit
  }, children));
}
export default TransitionReplace;