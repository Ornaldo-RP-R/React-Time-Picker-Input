function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.assign.js";
import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import InputTimeHelper from "./InputTimeHelper";
import AmPmInputHelper from "./AmPmInputHelper";
import { doubleChar, isOnMobileDevice, getDatePartsByProps, getTimeString, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import UnitDropdown from "./UnitDropdown";
function TimeInput(props) {
  const {
    hour12Format,
    value,
    onChange,
    onChangeEveryFormat,
    disabled,
    allowDelete,
    eachInputDropdown,
    manuallyDisplayDropdown,
    fullTimeDropdown
  } = props;
  const dateParts = getDatePartsByProps(value, hour12Format);
  const [hour, setHour] = useState(dateParts.hour);
  const [minute, setMinutes] = useState(dateParts.minute);
  const [amPm, setAmPM] = useState(dateParts.amPm);
  const [isMobile, setIsMobile] = useState(isOnMobileDevice());
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const amPmRef = useRef(null);
  const hourRange = useMemo(() => hour12Format ? {
    start: 1,
    end: 12
  } : {
    start: 0,
    end: 23
  }, [hour12Format]);
  const focusOnMinute = useCallback(() => focusOn(minuteRef), []);
  const blurOnMinute = useCallback(() => blurOn(minuteRef), []);
  const focusOnHour = useCallback(() => focusOn(hourRef), []);
  const focusOnAmPm = useCallback(() => focusOn(amPmRef), []);
  const blurOnAmPm = useCallback(() => blurOn(amPmRef), []);
  const toggleAmPm = useCallback(() => setAmPM(prevAmPm => prevAmPm === "AM" ? "PM" : "AM"), [setAmPM]);
  const updateTouchDevice = () => setIsMobile(isOnMobileDevice());
  const setTimeHourString = useCallback(value => {
    const dateParts = getDatePartsByProps(value.replace(/ /g, ""), hour12Format);
    setHour(dateParts.hour);
    setMinutes(dateParts.minute);
    setAmPM(dateParts.amPm);
    if (value.toLowerCase().includes("am")) {
      setAmPM("AM");
    } else if (value.toLowerCase().includes("pm")) {
      setAmPM("PM");
    }
  }, [hour12Format]);
  useEffect(() => {
    const dateString = getTimeString(hour, minute, amPm, hour12Format);
    onChangeEveryFormat && onChangeEveryFormat(dateString);
    if (hour !== "" && minute !== "" && !isMobile) {
      onChange && onChange(dateString);
    }
  }, [hour, minute, amPm]);
  useEffect(() => {
    if (!isMobile) setTimeHourString(value);
  }, [value]);
  useEffect(() => {
    window.addEventListener("resize", updateTouchDevice);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", updateTouchDevice);
    };
  }, []);
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
  return /*#__PURE__*/React.createElement("div", {
    className: "react-time-input-picker-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "react-time-input-picker ".concat(disabled ? "is-disabled" : "")
  }, isMobile ? /*#__PURE__*/React.createElement(MobileInput, {
    value: value,
    onChange: onChange
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(InputTimeHelper, _extends({
    inputRef: hourRef,
    value: hour,
    setValue: setHour
  }, sameInputProps, {
    moveNext: focusOnMinute,
    range: hourRange,
    toggleAmPm: toggleAmPm
  })), /*#__PURE__*/React.createElement(InputTimeHelper, _extends({
    inputRef: minuteRef,
    value: minute
  }, sameInputProps, {
    setValue: setMinutes,
    moveNext: hour12Format ? focusOnAmPm : blurOnMinute,
    movePrev: focusOnHour,
    range: minuteRange
  })), hour12Format && /*#__PURE__*/React.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/React.createElement(AmPmInputHelper, _extends({}, amPmInputProps, {
    inputRef: amPmRef,
    amPm: amPm,
    movePrev: focusOnMinute,
    moveNext: blurOnAmPm,
    toggleAmPm: toggleAmPm,
    setValue: setAmPM
  }))), /*#__PURE__*/React.createElement(Options, {
    timeString: getTimeString(hour, minute, amPm, hour12Format),
    hour12Format,
    fullTimeDropdown,
    manuallyDisplayDropdown,
    setTimeHourString
  }))));
}
const focusOn = ref => {
  var _ref$current, _ref$current$focus;
  return ref === null || ref === void 0 || (_ref$current = ref.current) === null || _ref$current === void 0 || (_ref$current$focus = _ref$current.focus) === null || _ref$current$focus === void 0 ? void 0 : _ref$current$focus.call(_ref$current);
};
const blurOn = ref => {
  var _ref$current2, _ref$current2$blur;
  return ref === null || ref === void 0 || (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || (_ref$current2$blur = _ref$current2.blur) === null || _ref$current2$blur === void 0 ? void 0 : _ref$current2$blur.call(_ref$current2);
};
const format24Data = new Array(24).fill("").map((h, index) => ["".concat(doubleChar(index), " : 00"), ["".concat(doubleChar(index), " : 30")]]).flat(2);
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
    format12Data[index] = "".concat(doubleChar(hourInNumber - 12), " : ").concat(doubleCharMinutes, "  PM");
  }
});
const Options = /*#__PURE__*/memo(props => {
  const {
    hour12Format,
    fullTimeDropdown,
    manuallyDisplayDropdown,
    setTimeHourString,
    timeString
  } = props;
  const [fullTimeDropdownVisibility, setFullTimeDropdownVisibility] = useState(false);
  useEffect(() => {
    const hideDropdown = e => setFullTimeDropdownVisibility(false);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);
  const onArrowDown = useCallback(e => {
    e.stopPropagation();
    setFullTimeDropdownVisibility(prevVal => !prevVal);
  }, [setFullTimeDropdownVisibility]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, fullTimeDropdown && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: onArrowDown
  })), /*#__PURE__*/React.createElement("div", {
    className: "fullTime__wrapper"
  }, /*#__PURE__*/React.createElement(UnitDropdown, {
    fullTimeDropdownVisibility: true,
    data: hour12Format ? format12Data : format24Data,
    shouldDisplay: fullTimeDropdown && fullTimeDropdownVisibility,
    manuallyDisplayDropdown: manuallyDisplayDropdown,
    type: "notRange",
    className: "fullTime",
    hour12Format: hour12Format,
    value: timeString,
    setValue: setTimeHourString,
    dropdownVisibility: fullTimeDropdownVisibility,
    setDropdownVisibility: setFullTimeDropdownVisibility
  })));
});
const minuteRange = {
  start: 0,
  end: 59
};
const MobileInput = /*#__PURE__*/memo(props => {
  const {
    value,
    onChange: _onChange
  } = props;
  const [valueMobile, setValueMobile] = useState(value);
  return /*#__PURE__*/React.createElement("div", {
    className: "input-time-mobile"
  }, /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: valueMobile,
    onChange: e => {
      setValueMobile(e.target.value);
      _onChange && _onChange(e.target.value);
    }
  }));
});
TimeInput.defaultProps = {
  hour12Format: false,
  disabled: false,
  allowDelete: false,
  eachInputDropdown: false,
  manuallyDisplayDropdown: false,
  fullTimeDropdown: false
};
export default /*#__PURE__*/React.memo(TimeInput);