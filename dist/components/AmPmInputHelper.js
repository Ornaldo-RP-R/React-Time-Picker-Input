import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.assign.js";
const _excluded = ["amPm", "eachInputDropdown", "moveNext", "toggleAmPm", "manuallyDisplayDropdown", "setValue", "fullTimeDropdown", "inputRef", "movePrev"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import "core-js/modules/web.dom-collections.iterator.js";
import React, { useCallback, useState } from "react";
import UnitDropdown from "./UnitDropdown";
import KeyDown from "./KeyDown";
import ArrowDown from "./ArrowDown";
import { useOnSideArrowTap, getSameInputProps, timers } from "./actions";
const AmPmInputHelper = props => {
  const [inputFocused, setInputFocused] = useState(false);
  const {
      amPm,
      eachInputDropdown,
      moveNext,
      toggleAmPm,
      manuallyDisplayDropdown,
      setValue,
      fullTimeDropdown,
      inputRef,
      movePrev
    } = props,
    otherProps = _objectWithoutProperties(props, _excluded);
  const onMoveNext = useCallback(() => {
    if (moveNext) {
      moveNext();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);
  const propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });
  const onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);
  const onKeyDown = useCallback(e => {
    var _key$toLocaleLowerCas, _key$toLocaleLowerCas2;
    const {
      key
    } = e || {};
    e.preventDefault();
    e.stopPropagation();
    onSideArrowTap(e);
    const aPressed = (key === null || key === void 0 || (_key$toLocaleLowerCas = key.toLocaleLowerCase) === null || _key$toLocaleLowerCas === void 0 ? void 0 : _key$toLocaleLowerCas.call(key)) === "a";
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
  }, /*#__PURE__*/React.createElement("input", _extends({}, getSameInputProps(propsAndState), {
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
const data = ["AM", "PM"];
export default AmPmInputHelper;