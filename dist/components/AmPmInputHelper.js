"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const AmPmInputHelper = props => {
  const {
    amPm,
    movePrev,
    moveNext,
    toggleAmPm,
    setAmPM,
    inputRef
  } = props,
        otherProps = _objectWithoutProperties(props, ["amPm", "movePrev", "moveNext", "toggleAmPm", "setAmPM", "inputRef"]);

  return /*#__PURE__*/_react.default.createElement("input", _extends({
    id: "react-time-input-picker__amPm",
    type: "text"
  }, otherProps, {
    value: amPm,
    ref: inputRef,
    readOnly: true,
    onKeyDown: e => {
      if (e.key === "ArrowLeft") {
        movePrev();
      } else if (e.key.toLocaleLowerCase() === "p" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "a") {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          toggleAmPm();
        } else if (e.key.toLocaleLowerCase() === "p") {
          setAmPM("PM");
        } else if (e.key.toLocaleLowerCase() === "a") {
          setAmPM("AM");
        }

        moveNext();
      }
    }
  }));
};

var _default = AmPmInputHelper;
exports.default = _default;