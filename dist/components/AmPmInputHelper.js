"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _UnitDropdown = _interopRequireDefault(require("./UnitDropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const AmPmInputHelper = props => {
  const [inputFocused, setInputFocused] = (0, _react.useState)(false);

  const {
    amPm,
    movePrev,
    shouldDisplayDropdown,
    disabled,
    moveNext,
    toggleAmPm,
    setValue,
    inputRef
  } = props,
        otherProps = _objectWithoutProperties(props, ["amPm", "movePrev", "shouldDisplayDropdown", "disabled", "moveNext", "toggleAmPm", "setValue", "inputRef"]);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("input", _extends({
    onFocusCapture: () => {
      setInputFocused(true);
    },
    disabled: disabled,
    onBlurCapture: e => {
      setTimeout(() => {
        setInputFocused(false);
      }, 50);
    },
    type: "text"
  }, otherProps, {
    value: amPm,
    ref: inputRef,
    readOnly: true,
    onKeyDown: e => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === "ArrowLeft") {
        movePrev();
      } else if (e.key.toLocaleLowerCase() === "p" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "a") {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          toggleAmPm();
        } else if (e.key.toLocaleLowerCase() === "p") {
          setValue("PM");
          moveNext();
        } else if (e.key.toLocaleLowerCase() === "a") {
          setValue("AM");
          moveNext();
        }
      }
    }
  })), /*#__PURE__*/_react.default.createElement(_UnitDropdown.default, {
    data: ["AM", "PM"],
    shouldDisplay: shouldDisplayDropdown,
    type: "amPm",
    className: "amPm",
    moveNext,
    setValue,
    value: amPm,
    inputFocused,
    setInputFocused
  }));
};

var _default = AmPmInputHelper;
exports.default = _default;