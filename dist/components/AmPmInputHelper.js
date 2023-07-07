"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _UnitDropdown = _interopRequireDefault(require("./UnitDropdown"));

var _KeyDown = _interopRequireDefault(require("./KeyDown"));

var _ArrowDown = _interopRequireDefault(require("./ArrowDown"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const AmPmInputHelper = props => {
  const [inputFocused, setInputFocused] = (0, _react.useState)(false);

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
        otherProps = _objectWithoutProperties(props, ["amPm", "eachInputDropdown", "moveNext", "toggleAmPm", "manuallyDisplayDropdown", "setValue", "fullTimeDropdown", "inputRef", "movePrev"]);

  const onMoveNext = (0, _react.useCallback)(() => {
    if (moveNext) {
      moveNext();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);

  const propsAndState = _objectSpread(_objectSpread({}, props), {}, {
    inputFocused,
    setInputFocused
  });

  const onSideArrowTap = (0, _actions.useOnSideArrowTap)(moveNext, movePrev);
  const onKeyDown = (0, _react.useCallback)(e => {
    var _key$toLocaleLowerCas, _key$toLocaleLowerCas2;

    const {
      key
    } = e || {};
    e.preventDefault();
    e.stopPropagation();
    onSideArrowTap(e);
    const aPressed = (key === null || key === void 0 ? void 0 : (_key$toLocaleLowerCas = key.toLocaleLowerCase) === null || _key$toLocaleLowerCas === void 0 ? void 0 : _key$toLocaleLowerCas.call(key)) === "a";

    if (key === "ArrowUp" || key === "ArrowDown") {
      toggleAmPm();
    } else if ((key === null || key === void 0 ? void 0 : (_key$toLocaleLowerCas2 = key.toLocaleLowerCase) === null || _key$toLocaleLowerCas2 === void 0 ? void 0 : _key$toLocaleLowerCas2.call(key)) === "p" || aPressed) {
      setValue(aPressed ? "AM" : "PM");
      onMoveNext();
    }
  }, [onMoveNext, setValue, toggleAmPm, onSideArrowTap]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_KeyDown.default, {
    onKeyDown: onKeyDown,
    reference: inputRef
  }, /*#__PURE__*/_react.default.createElement("input", _extends({}, (0, _actions.getSameInputProps)(propsAndState), {
    value: amPm,
    type: "text"
  }, otherProps, {
    readOnly: true
  }))), eachInputDropdown && manuallyDisplayDropdown && /*#__PURE__*/_react.default.createElement(_ArrowDown.default, {
    onClick: () => {
      _actions.timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
    }
  }), /*#__PURE__*/_react.default.createElement(_UnitDropdown.default, {
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
var _default = AmPmInputHelper;
exports.default = _default;