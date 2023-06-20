import { useCallback } from "react";

export  let timers = []

export const doubleChar = (value) => (value?.length >= 2 ? value : "0" + value).slice(-2);

export const isOnMobileDevice = () => {
  let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  let matchMediaQuery = function (query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || navigator.maxTouchPoints)  return true;

  let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");

  return matchMediaQuery(query);
};

export const getDatePartsByProps = (stringTimeValue, hour12Format) => {
  const trimed = (stringTimeValue || "").toString?.().trim?.();
  const hourByProp = trimed?.substring?.(0, 2);
  const minuteByProp = trimed?.substring?.(3, 5);
  const editHourByFormat = hour12Format ? (hourByProp <= 12 ? hourByProp : hourByProp - 12) : hourByProp;
  const isZero = parseInt(editHourByFormat) === 0 && hour12Format;
  return {
    hour: isZero ? "12" : doubleChar(editHourByFormat),
    minute: doubleChar(minuteByProp),
    amPm: isZero ? "AM" : hourByProp < 12 ? "AM" : "PM",
  };
};

export const useOnSideArrowTap = (moveNext, movePrev) => {
  return useCallback(
    (e) => {
      const isRight = e?.key === "ArrowRight";
      const isLeft = e?.key === "ArrowLeft";
      if (isRight) moveNext?.();
      if (isLeft) movePrev?.();
    },
    [moveNext, movePrev]
  );
};

export const getSameInputProps = (props) => {
  const { setInputFocused, disabled, inputRef, manuallyDisplayDropdown } = props;
  return {
    onFocusCapture: () => !manuallyDisplayDropdown && setInputFocused(true),
    disabled,
    onBlurCapture: () => {
      timers.push(setTimeout(() => setInputFocused(false), 30))
    },
    ref: inputRef,
  };
};

export const getTimeString = (hour, minute, amPm, hour12Format) => {
  let hour24Format = !hour12Format && doubleChar(hour);
  const is12 = hour.toString() === "12";
  let hour12Am = amPm === "AM" && is12 && "00";
  let hour12Pm = amPm === "PM" && is12 && "12";
  const calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
  let dateString24 = doubleChar((hour24Format || hour12Am || hour12Pm || calculateHour).toString()) + ":" + minute;
  // let hour24 = dateString24.substring(0, 2);
  // let hour12 = doubleChar(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
  // let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";
  return dateString24;
};
