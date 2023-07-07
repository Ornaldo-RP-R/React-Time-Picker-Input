"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeString = exports.getSameInputProps = exports.useOnSideArrowTap = exports.getDatePartsByProps = exports.isOnMobileDevice = exports.doubleChar = exports.timers = void 0;

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.trim.js");

var _react = require("react");

let timers = [];
exports.timers = timers;

const doubleChar = value => ((value === null || value === void 0 ? void 0 : value.length) >= 2 ? value : "0" + value).slice(-2);

exports.doubleChar = doubleChar;

const isOnMobileDevice = () => {
  let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  let matchMediaQuery = function matchMediaQuery(query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || navigator.maxTouchPoints) return true;
  let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return matchMediaQuery(query);
};

exports.isOnMobileDevice = isOnMobileDevice;

const getDatePartsByProps = (stringTimeValue, hour12Format) => {
  var _toString, _ref, _toString$call$trim, _toString$call, _trimed$substring, _trimed$substring2;

  const trimed = (_toString = (_ref = stringTimeValue || "").toString) === null || _toString === void 0 ? void 0 : (_toString$call$trim = (_toString$call = _toString.call(_ref)).trim) === null || _toString$call$trim === void 0 ? void 0 : _toString$call$trim.call(_toString$call);
  const hourByProp = trimed === null || trimed === void 0 ? void 0 : (_trimed$substring = trimed.substring) === null || _trimed$substring === void 0 ? void 0 : _trimed$substring.call(trimed, 0, 2);
  const minuteByProp = trimed === null || trimed === void 0 ? void 0 : (_trimed$substring2 = trimed.substring) === null || _trimed$substring2 === void 0 ? void 0 : _trimed$substring2.call(trimed, 3, 5);
  const editHourByFormat = hour12Format ? hourByProp <= 12 ? hourByProp : hourByProp - 12 : hourByProp;
  const isZero = parseInt(editHourByFormat) === 0 && hour12Format;
  return {
    hour: isZero ? "12" : doubleChar(editHourByFormat),
    minute: doubleChar(minuteByProp),
    amPm: isZero ? "AM" : hourByProp < 12 ? "AM" : "PM"
  };
};

exports.getDatePartsByProps = getDatePartsByProps;

const useOnSideArrowTap = (moveNext, movePrev) => {
  return (0, _react.useCallback)(e => {
    const isRight = (e === null || e === void 0 ? void 0 : e.key) === "ArrowRight";
    const isLeft = (e === null || e === void 0 ? void 0 : e.key) === "ArrowLeft";
    if (isRight) moveNext === null || moveNext === void 0 ? void 0 : moveNext();
    if (isLeft) movePrev === null || movePrev === void 0 ? void 0 : movePrev();
  }, [moveNext, movePrev]);
};

exports.useOnSideArrowTap = useOnSideArrowTap;

const getSameInputProps = props => {
  const {
    setInputFocused,
    disabled,
    inputRef,
    manuallyDisplayDropdown
  } = props;
  return {
    onFocusCapture: () => !manuallyDisplayDropdown && setInputFocused(true),
    disabled,
    onBlurCapture: () => {
      timers.push(setTimeout(() => setInputFocused(false), 30));
    },
    ref: inputRef
  };
};

exports.getSameInputProps = getSameInputProps;

const getTimeString = (hour, minute, amPm, hour12Format) => {
  let hour24Format = !hour12Format && doubleChar(hour);
  const is12 = hour.toString() === "12";
  let hour12Am = amPm === "AM" && is12 && "00";
  let hour12Pm = amPm === "PM" && is12 && "12";
  const calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
  let dateString24 = doubleChar((hour24Format || hour12Am || hour12Pm || calculateHour).toString()) + ":" + minute; // let hour24 = dateString24.substring(0, 2);
  // let hour12 = doubleChar(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
  // let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";

  return dateString24;
};

exports.getTimeString = getTimeString;