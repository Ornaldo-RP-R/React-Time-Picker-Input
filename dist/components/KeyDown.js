"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let keydownInterruptedRef = false;

const KeyDown = props => {
  const {
    onKeyDown,
    children,
    reference
  } = props;
  let onKeyDownRef = (0, _react.useRef)(onKeyDown);
  (0, _react.useEffect)(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);
  (0, _react.useEffect)(() => {
    onKeyDownRef.current = onKeyDown;
    const element = reference === null || reference === void 0 ? void 0 : reference.current;

    const handleKeyDown = event => {
      var _onKeyDownRef$current;

      keydownInterruptedRef = true;
      onKeyDownRef === null || onKeyDownRef === void 0 ? void 0 : (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
    };

    const handleKeyUp = event => {
      var _onKeyDownRef$current2;

      if (!keydownInterruptedRef) onKeyDownRef === null || onKeyDownRef === void 0 ? void 0 : (_onKeyDownRef$current2 = onKeyDownRef.current) === null || _onKeyDownRef$current2 === void 0 ? void 0 : _onKeyDownRef$current2.call(onKeyDownRef, event);
      keydownInterruptedRef = false;
    };

    if (element) {
      element.addEventListener("keydown", handleKeyDown, {
        capture: true
      });
      element.addEventListener("keyup", handleKeyUp, {
        capture: true
      });
      return () => {
        element.removeEventListener("keydown", handleKeyDown, {
          capture: true
        });
        element.removeEventListener("keyup", handleKeyUp, {
          capture: true
        });
      };
    }
  }, []);
  return children;
};

var _default = KeyDown;
exports.default = _default;