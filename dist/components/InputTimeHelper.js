import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.object.assign.js";
var _excluded = ["range", "value", "eachInputDropdown", "manuallyDisplayDropdown", "setValue", "moveNext", "allowDelete", "toggleAmPm", "className", "fullTimeDropdown", "inputRef", "movePrev", "inputFocused", "setInputFocused", "setSafeValue", "onMoveNext"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.to-string.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useState, useEffect, useCallback } from "react";
import UnitDropdown from "./UnitDropdown";
import { doubleChar, useOnSideArrowTap, getSameInputProps, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import KeyDown from "./KeyDown";
var InputTimeHelper = props => {
  var range = props.range,
    value = props.value,
    eachInputDropdown = props.eachInputDropdown,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    setValue = props.setValue,
    moveNext = props.moveNext;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    inputFocused = _useState2[0],
    setInputFocused = _useState2[1];
  var _ref = range || {},
    start = _ref.start,
    end = _ref.end;
  var setSafeValue = useCallback(value => {
    if (parseInt(value) >= start && parseInt(value) <= end) setValue(value);
  }, [start, end, setValue]);
  var onMoveNext = useCallback(() => {
    if (moveNext) {
      moveNext === null || moveNext === void 0 ? void 0 : moveNext();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "inputWrapper ".concat(manuallyDisplayDropdown ? "manuallyDisplayDropdown" : "")
  }, /*#__PURE__*/React.createElement(Input, _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setSafeValue,
    onMoveNext,
    setInputFocused
  })), eachInputDropdown && manuallyDisplayDropdown && /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: () => {
      timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
    }
  }), /*#__PURE__*/React.createElement(UnitDropdown, {
    shouldDisplay: eachInputDropdown,
    manuallyDisplayDropdown: manuallyDisplayDropdown,
    data: new Array(end + 1 - start).fill(""),
    range,
    moveNext: onMoveNext,
    setValue: setSafeValue,
    dropdownVisibility: inputFocused,
    setDropdownVisibility: setInputFocused,
    value
  })));
};
var Input = props => {
  var range = props.range,
    value = props.value,
    eachInputDropdown = props.eachInputDropdown,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    setValue = props.setValue,
    moveNext = props.moveNext,
    allowDelete = props.allowDelete,
    toggleAmPm = props.toggleAmPm,
    className = props.className,
    fullTimeDropdown = props.fullTimeDropdown,
    inputRef = props.inputRef,
    movePrev = props.movePrev,
    inputFocused = props.inputFocused,
    setInputFocused = props.setInputFocused,
    setSafeValue = props.setSafeValue,
    onMoveNext = props.onMoveNext,
    otherProps = _objectWithoutProperties(props, _excluded);
  var _ref2 = range || {},
    start = _ref2.start,
    end = _ref2.end;
  var _useState3 = useState(value),
    _useState4 = _slicedToArray(_useState3, 2),
    changedValue = _useState4[0],
    setChangedValue = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    keyPressed = _useState6[0],
    setKeyPressed = _useState6[1];
  var _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    firstFocus = _useState8[0],
    setFirstFocus = _useState8[1];
  var _useState9 = useState(0),
    _useState10 = _slicedToArray(_useState9, 2),
    changeCount = _useState10[0],
    setChangeCount = _useState10[1];
  var propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });
  var cleanNumber = number => (!isNaN(number) ? number : "").toString().replace("0", "");
  useEffect(() => {
    if (changedValue !== value) {
      setChangedValue(value);
    }
  }, [value]);
  var canNotWriteMoreTo = value => {
    var hasTwoValidChars = cleanNumber(value).length === 2;
    var lastCharachterOfEndRange = parseInt(end.toString().charAt(0));
    var cannotHaveSecondChar = parseInt(cleanNumber(value)) > parseInt(lastCharachterOfEndRange);
    var exceedRangeLimit = parseInt(cleanNumber(value) + keyPressed) > end;
    var isMultipleOf10 = value.length === 2 && value.charAt(1) === "0" && value.charAt(0) !== "0";
    return isMultipleOf10 || hasTwoValidChars || cannotHaveSecondChar || exceedRangeLimit;
  };
  useEffect(() => {
    if (changedValue !== value && changedValue !== "" && !isNaN(keyPressed)) {
      var newHour = doubleChar(cleanNumber(value) + keyPressed);
      if (firstFocus) {
        newHour = doubleChar(keyPressed);
        setFirstFocus(false);
        setChangeCount(changeCount + 1);
        setChangedValue("");
      }
      if (parseInt(newHour.toString()) >= start) {
        parseInt(newHour.toString()) <= end && setSafeValue(newHour);
        if (canNotWriteMoreTo(newHour) || changeCount >= 1) {
          onMoveNext();
        }
      } else {
        setFirstFocus(true);
        setChangeCount(0);
      }
    }
  }, [changedValue]);
  var onArrowTap = useCallback((start, end, hourLimit, newHour, hourAcc) => {
    if (parseInt(value.toString()) === start) {
      setSafeValue(doubleChar(end));
    } else if (value.toString() === hourLimit && toggleAmPm) {
      setSafeValue(newHour);
      toggleAmPm();
    } else {
      setSafeValue(doubleChar(parseInt(value) + hourAcc));
    }
  }, [value, toggleAmPm, setSafeValue]);
  var onArrowDownTap = useCallback(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowDown") onArrowTap(start, end, "12", "11", -1);
  }, [onArrowTap, start, end]);
  var onArrowUpTap = useCallback(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowUp") onArrowTap(end, start, "11", "12", +1);
  }, [onArrowTap, start, end]);
  var onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);
  var onKeyDown = useCallback(e => {
    var onBackSpaceTap = e => e.key === "Backspace" && allowDelete && setValue("--");
    onSideArrowTap(e);
    setKeyPressed(e.key);
    onBackSpaceTap(e);
    onArrowDownTap(e);
    onArrowUpTap(e);
  }, [onSideArrowTap, setKeyPressed, allowDelete, setValue, onArrowDownTap, onArrowUpTap]);
  return /*#__PURE__*/React.createElement(KeyDown, {
    onKeyDown: onKeyDown,
    reference: inputRef
  }, /*#__PURE__*/React.createElement("input", _extends({}, getSameInputProps(propsAndState), {
    onFocus: () => {
      setFirstFocus(true);
      setChangeCount(0);
    }
  }, otherProps, {
    value: value,
    onChange: e => setChangedValue(e.target.value),
    onClick: e => e.stopPropagation(),
    type: "number",
    min: start,
    max: end
  })));
};
InputTimeHelper.defaultProps = {
  allowDelete: false
};
export default InputTimeHelper;