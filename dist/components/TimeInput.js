"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.flat.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _InputTimeHelper = _interopRequireDefault(require("./InputTimeHelper"));

var _AmPmInputHelper = _interopRequireDefault(require("./AmPmInputHelper"));

var _actions = require("./actions");

var _ArrowDown = _interopRequireDefault(require("./ArrowDown"));

var _UnitDropdown = _interopRequireDefault(require("./UnitDropdown"));

require("./TimeInput.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TimeInput(props) {
  const {
    hour12Format,
    value,
    onChange: _onChange,
    onChangeEveryFormat,
    disabled,
    allowDelete,
    eachInputDropdown,
    manuallyDisplayDropdown,
    fullTimeDropdown
  } = props;
  const [isMobile, setIsMobile] = (0, _react.useState)((0, _actions.isOnMobileDevice)());
  const dateParts = (0, _actions.getDatePartsByProps)(value, hour12Format);
  const [hour, setHour] = (0, _react.useState)(dateParts.hour);
  const [minute, setMinutes] = (0, _react.useState)(dateParts.minute);
  const [amPm, setAmPM] = (0, _react.useState)(dateParts.amPm);
  const [valueMobile, setValueMobile] = (0, _react.useState)(value);
  const [fullTimeDropdownVisibility, setFullTimeDropdownVisibility] = (0, _react.useState)(false);
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

  const toggleAmPm = () => setAmPM(amPm === "AM" ? "PM" : "AM");

  const setTimeHourString = value => {
    const dateParts = (0, _actions.getDatePartsByProps)(value.replace(/ /g, ""), hour12Format);
    setHour(dateParts.hour);
    setMinutes(dateParts.minute);
    setAmPM(dateParts.amPm);

    if (value.toLowerCase().includes("am")) {
      setAmPM("AM");
    } else if (value.toLowerCase().includes("pm")) {
      setAmPM("PM");
    }
  };

  (0, _react.useEffect)(() => {
    const dateString = (0, _actions.getTimeString)(hour, minute, amPm, hour12Format);
    onChangeEveryFormat && onChangeEveryFormat(dateString);
    console.log(dateString);

    if (hour !== "" && minute !== "" && !isMobile) {
      _onChange && _onChange(dateString);
    }
  }, [hour, minute, amPm]);
  (0, _react.useEffect)(() => {
    if (!isMobile) {
      setTimeHourString(value);
    }
  }, [value]);

  const hideDropdown = e => {
    setFullTimeDropdownVisibility(false);
  };

  (0, _react.useEffect)(() => {
    window.addEventListener("resize", updateTouchDevice);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("resize", updateTouchDevice);
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);

  const fullTimeDropdownData = () => {
    const format24Data = new Array(24).fill("").map((h, index) => ["".concat((0, _actions.doubleChar)(index), " : 00"), ["".concat((0, _actions.doubleChar)(index), " : 30")]]).flat(2);
    let format12Data = [...format24Data];
    format12Data.forEach((hour, index) => {
      const hourInNumber = parseInt(hour.split(":")[0]);
      const doubleCharMinutes = hour.split(":")[1].replace(" ", "");

      if (hourInNumber === 0) {
        format12Data[index] = "12 : ".concat(doubleCharMinutes, "  AM");
      } else if (hourInNumber === 12) {
        format12Data[index] = "12 : ".concat(doubleCharMinutes, "  PM");
      } else if (hourInNumber < 12) {
        format12Data[index] = "".concat(hour, "  AM");
      } else {
        format12Data[index] = "".concat((0, _actions.doubleChar)(hourInNumber - 12), " : ").concat(doubleCharMinutes, "  PM");
      }
    });
    return hour12Format ? format12Data : format24Data;
  };

  const amPmInputProps = {
    disabled,
    eachInputDropdown: eachInputDropdown && !fullTimeDropdown,
    manuallyDisplayDropdown: manuallyDisplayDropdown && !fullTimeDropdown,
    fullTimeDropdown
  };

  const sameInputProps = _objectSpread(_objectSpread({}, amPmInputProps), {}, {
    allowDelete,
    placeholder: "- -"
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "react-time-input-picker-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "react-time-input-picker ".concat(disabled ? "is-disabled" : "")
  }, isMobile ? /*#__PURE__*/_react.default.createElement("div", {
    className: "input-time-mobile"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "time",
    value: valueMobile,
    onChange: e => {
      setValueMobile(e.target.value);
      _onChange && _onChange(e.target.value);
    }
  })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InputTimeHelper.default, _extends({
    inputRef: hourRef,
    value: hour,
    setValue: setHour
  }, sameInputProps, {
    moveNext: focusMinute,
    range: hourRange,
    toggleAmPm: toggleAmPm
  })), /*#__PURE__*/_react.default.createElement(_InputTimeHelper.default, _extends({
    inputRef: minuteRef,
    value: minute
  }, sameInputProps, {
    setValue: setMinutes,
    moveNext: hour12Format ? () => focusElementByRef(amPmRef) : () => blurElementByRef(minuteRef),
    movePrev: () => focusElementByRef(hourRef),
    range: {
      start: 0,
      end: 59
    }
  })), hour12Format && /*#__PURE__*/_react.default.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/_react.default.createElement(_AmPmInputHelper.default, _extends({}, amPmInputProps, {
    inputRef: amPmRef,
    amPm: amPm,
    movePrev: focusMinute,
    moveNext: () => blurElementByRef(amPmRef),
    toggleAmPm: toggleAmPm,
    setValue: setAmPM
  }))), fullTimeDropdown && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    onClick: e => {
      e.stopPropagation();
      setFullTimeDropdownVisibility(!fullTimeDropdownVisibility);
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "fullTime__wrapper"
  }, /*#__PURE__*/_react.default.createElement(_UnitDropdown.default, {
    fullTimeDropdownVisibility: true,
    data: fullTimeDropdownData(),
    shouldDisplay: fullTimeDropdown && fullTimeDropdownVisibility,
    manuallyDisplayDropdown: manuallyDisplayDropdown,
    type: "notRange",
    className: "fullTime",
    hour12Format: hour12Format,
    value: (0, _actions.getTimeString)(hour, minute, amPm, hour12Format),
    setValue: setTimeHourString,
    dropdownVisibility: fullTimeDropdownVisibility,
    setDropdownVisibility: setFullTimeDropdownVisibility
  })))));
}

TimeInput.defaultProps = {
  hour12Format: false,
  disabled: false,
  allowDelete: false,
  eachInputDropdown: false,
  manuallyDisplayDropdown: false,
  fullTimeDropdown: false
};

var _default = /*#__PURE__*/_react.default.memo(TimeInput);

exports.default = _default;