import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.regexp.test.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.object.get-own-property-descriptors.js";
import "core-js/modules/es.object.assign.js";
var _excluded = ["amPm", "eachInputDropdown", "moveNext", "toggleAmPm", "manuallyDisplayDropdown", "setValue", "fullTimeDropdown", "inputRef", "movePrev"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useCallback, useState } from "react";
import UnitDropdown from "./UnitDropdown";
import KeyDown from "./KeyDown";
import ArrowDown from "./ArrowDown";
import { useOnSideArrowTap, getSameInputProps, timers } from "./actions";
var AmPmInputHelper = props => {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    inputFocused = _useState2[0],
    setInputFocused = _useState2[1];
  var amPm = props.amPm,
    eachInputDropdown = props.eachInputDropdown,
    moveNext = props.moveNext,
    toggleAmPm = props.toggleAmPm,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    setValue = props.setValue,
    fullTimeDropdown = props.fullTimeDropdown,
    inputRef = props.inputRef,
    movePrev = props.movePrev,
    otherProps = _objectWithoutProperties(props, _excluded);
  var onMoveNext = useCallback(() => {
    if (moveNext) {
      moveNext();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);
  var propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });
  var onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);
  var onKeyDown = useCallback(e => {
    var _key$toLocaleLowerCas, _key$toLocaleLowerCas2;
    var _ref = e || {},
      key = _ref.key;
    e.preventDefault();
    e.stopPropagation();
    onSideArrowTap(e);
    var aPressed = (key === null || key === void 0 || (_key$toLocaleLowerCas = key.toLocaleLowerCase) === null || _key$toLocaleLowerCas === void 0 ? void 0 : _key$toLocaleLowerCas.call(key)) === "a";
    if (key === "ArrowUp" || key === "ArrowDown") {
      toggleAmPm();
    } else if ((key === null || key === void 0 || (_key$toLocaleLowerCas2 = key.toLocaleLowerCase) === null || _key$toLocaleLowerCas2 === void 0 ? void 0 : _key$toLocaleLowerCas2.call(key)) === "p" || aPressed) {
      setValue(aPressed ? "AM" : "PM");
      onMoveNext();
    }
  }, [onMoveNext, setValue, toggleAmPm, onSideArrowTap]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(KeyDown, {
    onKeyDown: onKeyDown,
    reference: inputRef
  }, (onKeyDown, onKeyUp) => /*#__PURE__*/React.createElement("input", _extends({
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUp
  }, getSameInputProps(propsAndState), {
    value: amPm,
    type: "text"
  }, otherProps, {
    readOnly: true
  }))), eachInputDropdown && manuallyDisplayDropdown && /*#__PURE__*/React.createElement(ArrowDown, {
    onClick: () => {
      timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
    }
  }), /*#__PURE__*/React.createElement(UnitDropdown, {
    data: data,
    shouldDisplay: eachInputDropdown,
    manuallyDisplayDropdown: manuallyDisplayDropdown,
    type: "notRange",
    className: "amPm",
    moveNext: onMoveNext,
    setValue,
    value: amPm,
    dropdownVisibility: inputFocused,
    setDropdownVisibility: setInputFocused
  }));
};
var data = ["AM", "PM"];
export default AmPmInputHelper;