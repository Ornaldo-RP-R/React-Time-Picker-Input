"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDatePartsByProps = exports.isOnMobileDevice = exports.doubleChar = void 0;

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.regexp.to-string.js");

const doubleChar = value => (value.length >= 2 ? value : "0" + value).slice(-2);

exports.doubleChar = doubleChar;

const isOnMobileDevice = () => {
  let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  let matchMediaQuery = function matchMediaQuery(query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    return true;
  }

  let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return matchMediaQuery(query);
};

exports.isOnMobileDevice = isOnMobileDevice;

const getDatePartsByProps = (stringTimeValue, hour12Format) => {
  const hourByProp = (stringTimeValue || "").toString().trim().substring(0, 2);
  const minuteByProp = (stringTimeValue || "").toString().trim().substring(3, 5);
  const editHourByFormat = hour12Format ? hourByProp <= 12 ? hourByProp : hourByProp - 12 : hourByProp;
  return {
    hour: parseInt(editHourByFormat) === 0 && hour12Format ? "12" : doubleChar(editHourByFormat),
    minute: doubleChar(minuteByProp),
    amPm: parseInt(editHourByFormat) === 0 && hour12Format ? "AM" : hourByProp < 12 ? "AM" : "PM"
  };
};

exports.getDatePartsByProps = getDatePartsByProps;