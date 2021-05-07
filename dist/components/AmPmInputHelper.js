"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AmPmInputHelper = props => {
  const {
    amPm,
    focusElementById,
    toggleAmPm,
    setAmPM
  } = props;
  return /*#__PURE__*/_react.default.createElement("input", {
    id: "react-time-input-picker__amPm",
    type: "text",
    value: amPm,
    readOnly: true,
    onKeyDown: e => {
      if (e.key === "ArrowLeft") {
        focusElementById("minuteInput");
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        toggleAmPm();
      }

      if (e.key.toLocaleLowerCase() === "p") {
        setAmPM("PM");
      }

      if (e.key.toLocaleLowerCase() === "a") {
        setAmPM("AM");
      }
    }
  });
};

var _default = AmPmInputHelper;
exports.default = _default;