export const doubleChar = (value) => (value.length >= 2 ? value : "0" + value).slice(-2);

export const isOnMobileDevice = () => {
  let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");

  let matchMediaQuery = function (query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    return true;
  }

  let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");

  return matchMediaQuery(query);
};

export const getDatePartsByProps = (stringTimeValue, hour12Format) => {
  const hourByProp = (stringTimeValue || "").toString().trim().substring(0, 2);
  const minuteByProp = (stringTimeValue || "").toString().trim().substring(3, 5);
  const editHourByFormat = hour12Format ? (hourByProp <= 12 ? hourByProp : hourByProp - 12) : hourByProp;
  return {
    hour: parseInt(editHourByFormat) === 0 && hour12Format ? "12" : doubleChar(editHourByFormat),
    minute: doubleChar(minuteByProp),
    amPm: parseInt(editHourByFormat) === 0 && hour12Format ? "AM" : hourByProp < 12 ? "AM" : "PM",
  };
};

export const onEscapeOrEnterTap = (e, props) => {
  const { inputFocused, eachInputDropdown, movePrev, setInputFocused, inputRef, moveNext } = props;
  if (e.key === "Escape" && inputFocused && eachInputDropdown) {
    setInputFocused(false);
    if (movePrev) {
      movePrev();
    } else {
      inputRef.current.blur();
    }
  }
  if (e.key === "Enter" && inputFocused && eachInputDropdown) {
    setInputFocused(false);
    if (moveNext) {
      moveNext();
    } else {
      inputRef.current.blur();
    }
  }
};

export const onSideArrowTap = (e, props) => {
  const { moveNext, movePrev } = props;
  e.key === "ArrowRight" && moveNext && moveNext();
  e.key === "ArrowLeft" && movePrev && movePrev();
};

export const getSameInputProps = (props) => {
  const { setInputFocused, inputFocused, disabled, inputRef, manuallyDisplayDropdown } = props;
  return {
    onFocusCapture: () => !manuallyDisplayDropdown && setInputFocused(true),
    disabled,
    onBlurCapture: (e) => {
      !inputFocused &&
        setTimeout(() => {
          setInputFocused(false);
        }, 10);
    },
    ref: inputRef,
  };
};

export const getTimeString = (hour, minute, amPm, hour12Format) => {
  let hour24Format = !hour12Format && doubleChar(hour);
  let hour12Am = amPm === "AM" && hour.toString() === "12" && "00";
  let hour12Pm = amPm === "PM" && hour.toString() === "12" && "12";
  const calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
  let dateString24 = doubleChar((hour24Format || hour12Am || hour12Pm || calculateHour).toString()) + ":" + minute;
  // let hour24 = dateString24.substring(0, 2);
  // let hour12 = doubleChar(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
  // let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";
  return dateString24;
};