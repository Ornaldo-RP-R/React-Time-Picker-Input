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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const InputTimeHelper = props => {
  const {
    range,
    value,
    disabled,
    shouldDisplayDropdown,
    setValue,
    moveNext,
    movePrev,
    inputRef,
    allowDelete,
    toggleAmPm,
    className
  } = props,
        otherProps = _objectWithoutProperties(props, ["range", "value", "disabled", "shouldDisplayDropdown", "setValue", "moveNext", "movePrev", "inputRef", "allowDelete", "toggleAmPm", "className"]);

  const [changedValue, setChangedValue] = (0, _react.useState)(value);
  const [keyPressed, setKeyPressed] = (0, _react.useState)("");
  const [firstFocus, setFirstFocus] = (0, _react.useState)(true);
  const [changeCount, setChangeCount] = (0, _react.useState)(0);
  const [inputFocused, setInputFocused] = (0, _react.useState)(false);

  const cleanNumber = number => (!isNaN(number) ? number : "").toString().replace("0", "");

  const setSafeValue = value => {
    if (parseInt(value) >= range.start && parseInt(value) <= range.end) {
      setValue(value);
    }
  };

  (0, _react.useEffect)(() => {
    if (changedValue !== value) {
      setChangedValue(value);
    }
  }, [value]);

  const canNotWriteMoreTo = value => {
    const hasTwoValidChars = cleanNumber(value).length === 2;
    const lastCharachterOfEndRange = parseInt(range.end.toString().charAt(0));
    const cannotHaveSecondChar = parseInt(cleanNumber(value)) > parseInt(lastCharachterOfEndRange);
    const exceedRangeLimit = parseInt(cleanNumber(value) + keyPressed) > range.end;
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

      if (parseInt(newHour.toString()) >= range.start) {
        parseInt(newHour.toString()) <= range.end && setSafeValue(newHour);

        if (canNotWriteMoreTo(newHour) || changeCount >= 1) {
          moveNext && moveNext();
        }
      } else {
        setFirstFocus(true);
        setChangeCount(0);
      }
    }
  }, [changedValue]);

  const onBackSpaceTap = e => e.key === "Backspace" && allowDelete && setValue("");

  const onSideArrowTap = e => {
    e.key === "ArrowRight" && moveNext && moveNext();
    e.key === "ArrowLeft" && movePrev && movePrev();
  };

  const onArrowDownTap = e => {
    if (e.key === "ArrowDown") {
      if (parseInt(value.toString()) === range.start) {
        setSafeValue((0, _actions.doubleChar)(range.end));
      } else if (value.toString() === "12" && toggleAmPm) {
        setSafeValue("11");
        toggleAmPm();
      } else {
        setSafeValue((0, _actions.doubleChar)(parseInt(value) - 1));
      }
    }
  };

  const onArrowUpTap = e => {
    if (e.key === "ArrowUp") {
      if (parseInt(value.toString()) === range.end) {
        setSafeValue((0, _actions.doubleChar)(range.start));
      } else if (value.toString() === "11" && toggleAmPm) {
        setSafeValue("12");
        toggleAmPm();
      } else {
        setSafeValue((0, _actions.doubleChar)(parseInt(value) + 1));
      }
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "inputWrapper"
  }, /*#__PURE__*/_react.default.createElement("input", _extends({
    disabled: disabled,
    onFocus: () => {
      setFirstFocus(true);
      setChangeCount(0);
    },
    ref: inputRef
  }, otherProps, {
    value: value,
    onFocusCapture: () => {
      setInputFocused(true);
    },
    onBlur: e => {
      setTimeout(() => {
        setInputFocused(false);
      }, 50);
    },
    onKeyDown: e => {
      if ((e.key === "Enter" || e.key === "Escape") && inputFocused && shouldDisplayDropdown) {
        setInputFocused(false);
      }

      setKeyPressed(e.key);
      onBackSpaceTap(e);
      onSideArrowTap(e);
      onArrowDownTap(e);
      onArrowUpTap(e);
    },
    onChange: e => setChangedValue(e.target.value),
    type: "number",
    min: range.start,
    max: range.end
  })), /*#__PURE__*/_react.default.createElement(_UnitDropdown.default, {
    shouldDisplay: shouldDisplayDropdown,
    data: new Array(range.end + 1 - range.start).fill(""),
    range,
    moveNext,
    setValue: setSafeValue,
    inputFocused,
    setInputFocused,
    value
  })));
};

InputTimeHelper.defaultProps = {
  allowDelete: false
};
var _default = InputTimeHelper;
exports.default = _default;