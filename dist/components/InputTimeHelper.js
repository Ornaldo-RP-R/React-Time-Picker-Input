import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.error.cause.js";
import "core-js/modules/es.object.assign.js";
const _excluded = ["range", "value", "eachInputDropdown", "manuallyDisplayDropdown", "setValue", "moveNext", "allowDelete", "toggleAmPm", "className", "fullTimeDropdown", "inputRef", "movePrev", "inputFocused", "setInputFocused", "setSafeValue", "onMoveNext"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.regexp.to-string.js";
import React, { useState, useEffect, useCallback } from "react";
import UnitDropdown from "./UnitDropdown";
import { doubleChar, useOnSideArrowTap, getSameInputProps, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import KeyDown from "./KeyDown";
const InputTimeHelper = props => {
  const {
    range,
    value,
    eachInputDropdown,
    manuallyDisplayDropdown,
    setValue,
    moveNext
  } = props;
  const [inputFocused, setInputFocused] = useState(false);
  const {
    start,
    end
  } = range || {};
  const setSafeValue = useCallback(value => {
    if (parseInt(value) >= start && parseInt(value) <= end) setValue(value);
  }, [start, end, setValue]);
  const onMoveNext = useCallback(() => {
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
const Input = props => {
  const {
      range,
      value,
      eachInputDropdown,
      manuallyDisplayDropdown,
      setValue,
      moveNext,
      allowDelete,
      toggleAmPm,
      className,
      fullTimeDropdown,
      inputRef,
      movePrev,
      inputFocused,
      setInputFocused,
      setSafeValue,
      onMoveNext
    } = props,
    otherProps = _objectWithoutProperties(props, _excluded);
  const {
    start,
    end
  } = range || {};
  const [changedValue, setChangedValue] = useState(value);
  const [keyPressed, setKeyPressed] = useState("");
  const [firstFocus, setFirstFocus] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });
  const cleanNumber = number => (!isNaN(number) ? number : "").toString().replace("0", "");
  useEffect(() => {
    if (changedValue !== value) {
      setChangedValue(value);
    }
  }, [value]);
  const canNotWriteMoreTo = value => {
    const hasTwoValidChars = cleanNumber(value).length === 2;
    const lastCharachterOfEndRange = parseInt(end.toString().charAt(0));
    const cannotHaveSecondChar = parseInt(cleanNumber(value)) > parseInt(lastCharachterOfEndRange);
    const exceedRangeLimit = parseInt(cleanNumber(value) + keyPressed) > end;
    const isMultipleOf10 = value.length === 2 && value.charAt(1) === "0" && value.charAt(0) !== "0";
    return isMultipleOf10 || hasTwoValidChars || cannotHaveSecondChar || exceedRangeLimit;
  };
  useEffect(() => {
    if (changedValue !== value && changedValue !== "" && !isNaN(keyPressed)) {
      let newHour = doubleChar(cleanNumber(value) + keyPressed);
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
  const onArrowTap = useCallback((start, end, hourLimit, newHour, hourAcc) => {
    if (parseInt(value.toString()) === start) {
      setSafeValue(doubleChar(end));
    } else if (value.toString() === hourLimit && toggleAmPm) {
      setSafeValue(newHour);
      toggleAmPm();
    } else {
      setSafeValue(doubleChar(parseInt(value) + hourAcc));
    }
  }, [value, toggleAmPm, setSafeValue]);
  const onArrowDownTap = useCallback(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowDown") onArrowTap(start, end, "12", "11", -1);
  }, [onArrowTap, start, end]);
  const onArrowUpTap = useCallback(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowUp") onArrowTap(end, start, "11", "12", +1);
  }, [onArrowTap, start, end]);
  const onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);
  const onKeyDown = useCallback(e => {
    const onBackSpaceTap = e => e.key === "Backspace" && allowDelete && setValue("--");
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