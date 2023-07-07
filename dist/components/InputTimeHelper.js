"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _UnitDropdown = _interopRequireDefault(require("./UnitDropdown"));

var _actions = require("./actions");

var _ArrowDown = _interopRequireDefault(require("./ArrowDown"));

var _KeyDown = _interopRequireDefault(require("./KeyDown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const InputTimeHelper = props => {
  const {
    range,
    value,
    eachInputDropdown,
    manuallyDisplayDropdown,
    setValue,
    moveNext
  } = props;
  const [inputFocused, setInputFocused] = (0, _react.useState)(false);
  const {
    start,
    end
  } = range || {};
  const setSafeValue = (0, _react.useCallback)(value => {
    if (parseInt(value) >= start && parseInt(value) <= end) setValue(value);
  }, [start, end, setValue]);
  const onMoveNext = (0, _react.useCallback)(() => {
    if (moveNext) {
      moveNext === null || moveNext === void 0 ? void 0 : moveNext();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "inputWrapper ".concat(manuallyDisplayDropdown ? "manuallyDisplayDropdown" : "")
  }, /*#__PURE__*/_react.default.createElement(Input, _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setSafeValue,
    onMoveNext,
    setInputFocused
  })), eachInputDropdown && manuallyDisplayDropdown && /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    onClick: () => {
      _actions.timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
    }
  }), /*#__PURE__*/_react.default.createElement(_UnitDropdown.default, {
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
        otherProps = _objectWithoutProperties(props, ["range", "value", "eachInputDropdown", "manuallyDisplayDropdown", "setValue", "moveNext", "allowDelete", "toggleAmPm", "className", "fullTimeDropdown", "inputRef", "movePrev", "inputFocused", "setInputFocused", "setSafeValue", "onMoveNext"]);

  const {
    start,
    end
  } = range || {};
  const [changedValue, setChangedValue] = (0, _react.useState)(value);
  const [keyPressed, setKeyPressed] = (0, _react.useState)("");
  const [firstFocus, setFirstFocus] = (0, _react.useState)(true);
  const [changeCount, setChangeCount] = (0, _react.useState)(0);

  const propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });

  const cleanNumber = number => (!isNaN(number) ? number : "").toString().replace("0", "");

  (0, _react.useEffect)(() => {
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

  (0, _react.useEffect)(() => {
    if (changedValue !== value && changedValue !== "" && !isNaN(keyPressed)) {
      let newHour = (0, _actions.doubleChar)(cleanNumber(value) + keyPressed);

      if (firstFocus) {
        newHour = (0, _actions.doubleChar)(keyPressed);
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
  const onArrowTap = (0, _react.useCallback)((start, end, hourLimit, newHour, hourAcc) => {
    if (parseInt(value.toString()) === start) {
      setSafeValue((0, _actions.doubleChar)(end));
    } else if (value.toString() === hourLimit && toggleAmPm) {
      setSafeValue(newHour);
      toggleAmPm();
    } else {
      setSafeValue((0, _actions.doubleChar)(parseInt(value) + hourAcc));
    }
  }, [value, toggleAmPm, setSafeValue]);
  const onArrowDownTap = (0, _react.useCallback)(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowDown") onArrowTap(start, end, "12", "11", -1);
  }, [onArrowTap, start, end]);
  const onArrowUpTap = (0, _react.useCallback)(e => {
    if ((e === null || e === void 0 ? void 0 : e.key) === "ArrowUp") onArrowTap(end, start, "11", "12", +1);
  }, [onArrowTap, start, end]);
  const onSideArrowTap = (0, _actions.useOnSideArrowTap)(moveNext, movePrev);
  const onKeyDown = (0, _react.useCallback)(e => {
    const onBackSpaceTap = e => e.key === "Backspace" && allowDelete && setValue("--");

    onSideArrowTap(e);
    setKeyPressed(e.key);
    onBackSpaceTap(e);
    onArrowDownTap(e);
    onArrowUpTap(e);
  }, [onSideArrowTap, setKeyPressed, allowDelete, setValue, onArrowDownTap, onArrowUpTap]);
  return /*#__PURE__*/_react.default.createElement(_KeyDown.default, {
    onKeyDown: onKeyDown,
    reference: inputRef
  }, /*#__PURE__*/_react.default.createElement("input", _extends({}, (0, _actions.getSameInputProps)(propsAndState), {
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
var _default = InputTimeHelper;
exports.default = _default;