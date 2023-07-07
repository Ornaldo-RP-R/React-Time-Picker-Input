"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TransitionReplace(props) {
  const {
    transitionName,
    transitionEnterTimeout,
    transitionLeaveTimeout,
    children
  } = props;
  const [shouldRender, setShouldRender] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    setShouldRender(true);
  }, []);

  const handleTransitionEnd = () => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  };

  const handleExit = () => {
    setShouldRender(false);
  };

  const duration = shouldRender ? transitionEnterTimeout : transitionLeaveTimeout;
  const enterClass = shouldRender ? 'enter' : 'exit';
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(transitionName, "-").concat(enterClass, " ").concat(transitionName, "-").concat(enterClass, "-active"),
    style: {
      transitionDuration: "".concat(duration, "ms")
    },
    onAnimationEnd: shouldRender ? handleTransitionEnd : handleExit
  }, children));
}

var _default = TransitionReplace;
exports.default = _default;