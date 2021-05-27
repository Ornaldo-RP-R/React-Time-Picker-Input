"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _InputTimeHelper = _interopRequireDefault(require("./InputTimeHelper"));

var _AmPmInputHelper = _interopRequireDefault(require("./AmPmInputHelper"));

var _actions = require("./actions");

require("./TimeInput.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TimeInput(props) {
  const {
    hour12Format,
    value,
    onChange,
    allowDelete
  } = props;
  const [isMobile, setIsMobile] = (0, _react.useState)((0, _actions.isOnMobileDevice)());
  const dateParts = (0, _actions.getDatePartsByProps)(value, hour12Format);
  const [hour, setHour] = (0, _react.useState)(dateParts.hour);
  const [minute, setMinutes] = (0, _react.useState)(dateParts.minute);
  const [amPm, _setAmPM] = (0, _react.useState)(dateParts.amPm);
  const [valueMobile, setValueMobile] = (0, _react.useState)(value);
  const hourRef = (0, _react.useRef)(null);
  const minuteRef = (0, _react.useRef)(null);
  const amPmRef = (0, _react.useRef)(null);
  const hourRange = hour12Format ? {
    start: 1,
    end: 12
  } : {
    start: 0,
    end: 23
  };

  const focusElementByRef = ref => {
    ref.current && ref.current.focus();
  };

  const blurElementByRef = ref => {
    ref.current && ref.current.blur();
  };

  const focusMinute = () => focusElementByRef(minuteRef);

  const updateTouchDevice = () => setIsMobile((0, _actions.isOnMobileDevice)());

  const toggleAmPm = () => _setAmPM(amPm === "AM" ? "PM" : "AM");

  (0, _react.useEffect)(() => {
    if (hour !== "" && minute !== "" && !isMobile) {
      let hour24Format = !hour12Format && (0, _actions.doubleChar)(hour);
      let hour12Am = amPm === "AM" && hour === "12" && "00";
      const calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
      let dateString24 = (0, _actions.doubleChar)((hour24Format || hour12Am || calculateHour).toString()) + ":" + minute;
      let hour24 = dateString24.substring(0, 2);
      let hour12 = (0, _actions.doubleChar)(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
      let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";
      onChange(dateString24);
    }
  }, [hour, minute, amPm]);
  (0, _react.useEffect)(() => {
    if (!isMobile) {
      const dateParts = (0, _actions.getDatePartsByProps)(value, hour12Format);
      setHour(dateParts.hour);
      setMinutes(dateParts.minute);

      _setAmPM(dateParts.amPm);
    }
  }, [value]);
  (0, _react.useEffect)(() => {
    window.addEventListener("resize", updateTouchDevice);
    return () => {
      window.removeEventListener("resize", updateTouchDevice);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-time-input-picker-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "react-time-input-picker"
  }, isMobile ? /*#__PURE__*/_react.default.createElement("div", {
    className: "input-time-mobile"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "time",
    value: valueMobile,
    onChange: e => setValueMobile(e.target.value)
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InputTimeHelper.default, {
    inputRef: hourRef,
    value: hour,
    placeholder: "- -",
    setValue: setHour,
    allowDelete: allowDelete,
    moveNext: focusMinute,
    range: hourRange,
    toggleAmPm: toggleAmPm
  }), /*#__PURE__*/_react.default.createElement(_InputTimeHelper.default, {
    inputRef: minuteRef,
    value: minute,
    placeholder: "- -",
    setValue: setMinutes,
    allowDelete: allowDelete,
    moveNext: hour12Format ? () => focusElementByRef(amPmRef) : () => blurElementByRef(minuteRef),
    movePrev: () => focusElementByRef(hourRef),
    range: {
      start: 0,
      end: 59
    }
  }), hour12Format && /*#__PURE__*/_react.default.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/_react.default.createElement(_AmPmInputHelper.default, {
    inputRef: amPmRef,
    amPm: amPm,
    movePrev: focusMinute,
    moveNext: () => blurElementByRef(amPmRef),
    toggleAmPm: toggleAmPm,
    setAmPM: amPm => _setAmPM(amPm)
  })))));
}

var _default = TimeInput;
exports.default = _default;