import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.regexp.to-string.js";
import "core-js/modules/es.string.trim.js";
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match.js";
import { useCallback } from "react";
export var timers = [];
export var doubleChar = value => ((value === null || value === void 0 ? void 0 : value.length) >= 2 ? value : "0" + value).slice(-2);
export var isOnMobileDevice = () => {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  var matchMediaQuery = function matchMediaQuery(query) {
    return window.matchMedia(query).matches;
  };
  if ("ontouchstart" in window || navigator.maxTouchPoints) return true;
  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return matchMediaQuery(query);
};
export var getDatePartsByProps = (stringTimeValue, hour12Format) => {
  var _toString, _ref, _toString$call$trim, _toString$call, _trimed$substring, _trimed$substring2;
  var trimed = (_toString = (_ref = stringTimeValue || "").toString) === null || _toString === void 0 || (_toString$call$trim = (_toString$call = _toString.call(_ref)).trim) === null || _toString$call$trim === void 0 ? void 0 : _toString$call$trim.call(_toString$call);
  var hourByProp = trimed === null || trimed === void 0 || (_trimed$substring = trimed.substring) === null || _trimed$substring === void 0 ? void 0 : _trimed$substring.call(trimed, 0, 2);
  var minuteByProp = trimed === null || trimed === void 0 || (_trimed$substring2 = trimed.substring) === null || _trimed$substring2 === void 0 ? void 0 : _trimed$substring2.call(trimed, 3, 5);
  var editHourByFormat = hour12Format ? hourByProp <= 12 ? hourByProp : hourByProp - 12 : hourByProp;
  var isZero = parseInt(editHourByFormat) === 0 && hour12Format;
  return {
    hour: isZero ? "12" : doubleChar(editHourByFormat),
    minute: doubleChar(minuteByProp),
    amPm: isZero ? "AM" : hourByProp < 12 ? "AM" : "PM"
  };
};
export var useOnSideArrowTap = (moveNext, movePrev) => {
  return useCallback(e => {
    var isRight = (e === null || e === void 0 ? void 0 : e.key) === "ArrowRight";
    var isLeft = (e === null || e === void 0 ? void 0 : e.key) === "ArrowLeft";
    if (isRight) moveNext === null || moveNext === void 0 ? void 0 : moveNext();
    if (isLeft) movePrev === null || movePrev === void 0 ? void 0 : movePrev();
  }, [moveNext, movePrev]);
};
export var getSameInputProps = props => {
  var setInputFocused = props.setInputFocused,
    disabled = props.disabled,
    inputRef = props.inputRef,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown;
  return {
    onFocusCapture: () => !manuallyDisplayDropdown && setInputFocused(true),
    disabled,
    onBlurCapture: () => {
      timers.push(setTimeout(() => setInputFocused(false), 30));
    },
    ref: inputRef
  };
};
export var getTimeString = (hour, minute, amPm, hour12Format) => {
  var hour24Format = !hour12Format && doubleChar(hour);
  var is12 = hour.toString() === "12";
  var hour12Am = amPm === "AM" && is12 && "00";
  var hour12Pm = amPm === "PM" && is12 && "12";
  var calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
  var dateString24 = doubleChar((hour24Format || hour12Am || hour12Pm || calculateHour).toString()) + ":" + minute;
  // let hour24 = dateString24.substring(0, 2);
  // let hour12 = doubleChar(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
  // let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";
  return dateString24;
};
export function isChrome51OrLower() {
  var userAgent = navigator.userAgent.toLowerCase();
  var chromeMatch = userAgent.match(/chrome\/(\d+)/);
  if (chromeMatch) {
    var chromeVersion = parseInt(chromeMatch[1], 10);
    return chromeVersion <= 51;
  }
  return false;
}