function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.array.flat.js";
import "core-js/modules/es.array.unscopables.flat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.assign.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import InputTimeHelper from "./InputTimeHelper";
import AmPmInputHelper from "./AmPmInputHelper";
import { doubleChar, isOnMobileDevice, getDatePartsByProps, getTimeString, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import UnitDropdown from "./UnitDropdown";
function TimeInput(props) {
  var hour12Format = props.hour12Format,
    value = props.value,
    onChange = props.onChange,
    onChangeEveryFormat = props.onChangeEveryFormat,
    disabled = props.disabled,
    allowDelete = props.allowDelete,
    eachInputDropdown = props.eachInputDropdown,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    fullTimeDropdown = props.fullTimeDropdown;
  var dateParts = getDatePartsByProps(value, hour12Format);
  var _useState = useState(dateParts.hour),
    _useState2 = _slicedToArray(_useState, 2),
    hour = _useState2[0],
    setHour = _useState2[1];
  var _useState3 = useState(dateParts.minute),
    _useState4 = _slicedToArray(_useState3, 2),
    minute = _useState4[0],
    setMinutes = _useState4[1];
  var _useState5 = useState(dateParts.amPm),
    _useState6 = _slicedToArray(_useState5, 2),
    amPm = _useState6[0],
    setAmPM = _useState6[1];
  var _useState7 = useState(isOnMobileDevice()),
    _useState8 = _slicedToArray(_useState7, 2),
    isMobile = _useState8[0],
    setIsMobile = _useState8[1];
  var hourRef = useRef(null);
  var minuteRef = useRef(null);
  var amPmRef = useRef(null);
  var hourRange = useMemo(() => hour12Format ? {
    start: 1,
    end: 12
  } : {
    start: 0,
    end: 23
  }, [hour12Format]);
  var focusOnMinute = useCallback(() => focusOn(minuteRef), []);
  var blurOnMinute = useCallback(() => blurOn(minuteRef), []);
  var focusOnHour = useCallback(() => focusOn(hourRef), []);
  var focusOnAmPm = useCallback(() => focusOn(amPmRef), []);
  var blurOnAmPm = useCallback(() => blurOn(amPmRef), []);
  var toggleAmPm = useCallback(() => setAmPM(prevAmPm => prevAmPm === "AM" ? "PM" : "AM"), [setAmPM]);
  var updateTouchDevice = () => setIsMobile(isOnMobileDevice());
  var setTimeHourString = useCallback(value => {
    var dateParts = getDatePartsByProps(value.replace(/ /g, ""), hour12Format);
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
    var dateString = getTimeString(hour, minute, amPm, hour12Format);
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
  var amPmInputProps = {
    disabled,
    eachInputDropdown: eachInputDropdown && !fullTimeDropdown,
    manuallyDisplayDropdown: manuallyDisplayDropdown && !fullTimeDropdown,
    fullTimeDropdown
  };
  var sameInputProps = _objectSpread(_objectSpread({}, amPmInputProps), {}, {
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
var focusOn = ref => {
  var _ref$current, _ref$current$focus;
  return ref === null || ref === void 0 || (_ref$current = ref.current) === null || _ref$current === void 0 || (_ref$current$focus = _ref$current.focus) === null || _ref$current$focus === void 0 ? void 0 : _ref$current$focus.call(_ref$current);
};
var blurOn = ref => {
  var _ref$current2, _ref$current2$blur;
  return ref === null || ref === void 0 || (_ref$current2 = ref.current) === null || _ref$current2 === void 0 || (_ref$current2$blur = _ref$current2.blur) === null || _ref$current2$blur === void 0 ? void 0 : _ref$current2$blur.call(_ref$current2);
};
var format24Data = new Array(24).fill("").map((h, index) => ["".concat(doubleChar(index), " : 00"), ["".concat(doubleChar(index), " : 30")]]).flat(2);
var format12Data = [...format24Data];
format12Data.forEach((hour, index) => {
  var hourInNumber = parseInt(hour.split(":")[0]);
  var doubleCharMinutes = hour.split(":")[1].replace(" ", "");
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
var Options = /*#__PURE__*/memo(props => {
  var hour12Format = props.hour12Format,
    fullTimeDropdown = props.fullTimeDropdown,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    setTimeHourString = props.setTimeHourString,
    timeString = props.timeString;
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    fullTimeDropdownVisibility = _useState10[0],
    setFullTimeDropdownVisibility = _useState10[1];
  useEffect(() => {
    var hideDropdown = e => setFullTimeDropdownVisibility(false);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);
  var onArrowDown = useCallback(e => {
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
var minuteRange = {
  start: 0,
  end: 59
};
var MobileInput = /*#__PURE__*/memo(props => {
  var value = props.value,
    _onChange = props.onChange;
  var _useState11 = useState(value),
    _useState12 = _slicedToArray(_useState11, 2),
    valueMobile = _useState12[0],
    setValueMobile = _useState12[1];
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