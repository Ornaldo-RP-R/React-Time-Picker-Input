import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from "react";
import InputTimeHelper from "./InputTimeHelper";
import AmPmInputHelper from "./AmPmInputHelper";
import { doubleChar, isOnMobileDevice, getDatePartsByProps, getTimeString, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import UnitDropdown from "./UnitDropdown";

function TimeInput(props) {
  const {
    hour12Format,
    value,
    onChange,
    onChangeEveryFormat,
    disabled,
    allowDelete,
    eachInputDropdown,
    manuallyDisplayDropdown,
    fullTimeDropdown,
  } = props;
  const dateParts = getDatePartsByProps(value, hour12Format);
  const [time, setTime] = useState(dateParts);
  const [isMobile, setIsMobile] = useState(isOnMobileDevice());
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const amPmRef = useRef(null);
  let timeToUpdate = useRef(null);

  const setHour = useCallback((newHour,other = {}) => setTime((t) => ({ ...t, hour: newHour , ...other })), [setTime]);
  const setMinutes = useCallback((newMinute, other = {}) => setTime((t) => ({ ...t, minute: newMinute , ...other })), [setTime]);
  const setAmPM = useCallback((newAmPm,other = {}) => setTime((t) => ({ ...t, amPm: newAmPm , ...other })), [setTime]);

  const hourRange = useMemo(()=>hour12Format ? { start: 1, end: 12 } : { start: 0, end: 23 },[hour12Format]);
  const focusOnMinute = useCallback(() => focusOn(minuteRef),[]);
  const blurOnMinute = useCallback(() => blurOn(minuteRef),[]);
  const focusOnHour = useCallback(() => focusOn(hourRef), []);
  const focusOnAmPm = useCallback(() => focusOn(amPmRef), []);
  const blurOnAmPm = useCallback(() => blurOn(amPmRef), []);

  const toggleAmPm = useCallback((other) => setAmPM((prevAmPm) => (prevAmPm === "AM" ? "PM" : "AM"), other), [setAmPM]);

  const updateTouchDevice = () => setIsMobile(isOnMobileDevice());

const setTimeHourString = useCallback(
  (value) => {
    if (new Date().getTime() - timeToUpdate?.current >= 20) {
      const dateParts = getDatePartsByProps(value.replace(/ /g, ""), hour12Format);
      setHour(dateParts.hour);
      setMinutes(dateParts.minute);
      setAmPM(dateParts.amPm);
      if (value.toLowerCase().includes("am")) {
        setAmPM("AM");
      } else if (value.toLowerCase().includes("pm")) {
        setAmPM("PM");
      }
      timeToUpdate.current = new Date().getTime();
    }
  },
  [hour12Format]
);

  useEffect(() => {
    const {hour, minute, amPm} = time || {};
    const dateString=getTimeString(hour, minute, amPm, hour12Format);
    onChangeEveryFormat && onChangeEveryFormat(dateString);
    if (hour !== "" && minute !== "" && !isMobile) {
      onChange && onChange(dateString);
    }
  }, [JSON.stringify(time)]);

  useEffect(() => {
    if (!isMobile) setTimeHourString(value);
  }, [value]);

  useEffect(() => {
    window.addEventListener("resize", updateTouchDevice);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", updateTouchDevice);
    };
  }, []);

  const amPmInputProps = {
    disabled,
    eachInputDropdown: eachInputDropdown && !fullTimeDropdown,
    manuallyDisplayDropdown: manuallyDisplayDropdown && !fullTimeDropdown,
    fullTimeDropdown,
  };
  const sameInputProps = { ...amPmInputProps, allowDelete, placeholder: "- -" };

  return (
    <div className="react-time-input-picker-wrapper">
      <div className={`react-time-input-picker ${disabled ? "is-disabled" : ""}`}>
        {isMobile ? (
          <MobileInput value={value} onChange={onChange} />
        ) : (
          <React.Fragment>
            <InputTimeHelper
              inputRef={hourRef}
              value={time?.hour}
              setValue={setHour}
              {...sameInputProps}
              moveNext={focusOnMinute}
              range={hourRange}
              toggleAmPm={toggleAmPm}
            />
            <InputTimeHelper
              inputRef={minuteRef}
              value={time?.minute}
              {...sameInputProps}
              setValue={setMinutes}
              moveNext={hour12Format ? focusOnAmPm : blurOnMinute}
              movePrev={focusOnHour}
              range={minuteRange}
            />
            {hour12Format && (
              <div className="inputWrapper">
                <AmPmInputHelper
                  {...amPmInputProps}
                  inputRef={amPmRef}
                  amPm={time?.amPm}
                  movePrev={focusOnMinute}
                  moveNext={blurOnAmPm}
                  toggleAmPm={toggleAmPm}
                  setValue={setAmPM}
                />
              </div>
            )}
            <Options
              timeString={getTimeString(time?.hour, time?.minute, time?.amPm, hour12Format)}
              {...{ hour12Format, fullTimeDropdown, manuallyDisplayDropdown, setTimeHourString }}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const focusOn = (ref) => ref?.current?.focus?.();
const blurOn = (ref) => ref?.current?.blur?.();

const format24Data = new Array(24)
  .fill("")
  .map((h, index) => [`${doubleChar(index)} : 00`, [`${doubleChar(index)} : 30`]])
  .flat(2);
let format12Data = [...format24Data];
format12Data.forEach((hour, index) => {
  const hourInNumber = parseInt(hour.split(":")[0]);
  const doubleCharMinutes = hour.split(":")[1].replace(" ", "");
  if (hourInNumber === 0) {
    format12Data[index] = `12 : ${doubleCharMinutes}  AM`;
  } else if (hourInNumber === 12) {
    format12Data[index] = `12 : ${doubleCharMinutes}  PM`;
  } else if (hourInNumber < 12) {
    format12Data[index] = `${hour}  AM`;
  } else {
    format12Data[index] = `${doubleChar(hourInNumber - 12)} : ${doubleCharMinutes}  PM`;
  }
});

const Options = memo(props => {
  const { hour12Format, fullTimeDropdown, manuallyDisplayDropdown, setTimeHourString,timeString } = props;
  const [fullTimeDropdownVisibility, setFullTimeDropdownVisibility] = useState(false);

  useEffect(() => {
    const hideDropdown = (e) => setFullTimeDropdownVisibility(false);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);

  const onArrowDown = useCallback(
    (e) => {
      e.stopPropagation();
      setFullTimeDropdownVisibility((prevVal) => !prevVal);
    },
    [setFullTimeDropdownVisibility]
  );

  return (
    <React.Fragment>
      {fullTimeDropdown && (
        <div>
          <ArrowDown onClick={onArrowDown} />
        </div>
      )}
      <div className="fullTime__wrapper">
        <UnitDropdown
          fullTimeDropdownVisibility
          data={hour12Format ? format12Data : format24Data}
          shouldDisplay={fullTimeDropdown && fullTimeDropdownVisibility}
          manuallyDisplayDropdown={manuallyDisplayDropdown}
          type="notRange"
          className="fullTime"
          hour12Format={hour12Format}
          {...{
            value: timeString,
            setValue: setTimeHourString,
            dropdownVisibility: fullTimeDropdownVisibility,
            setDropdownVisibility: setFullTimeDropdownVisibility,
          }}
        />
      </div>
    </React.Fragment>
  );
})

const minuteRange = { start: 0, end: 59 };

const MobileInput = memo(props => {
  const {value,onChange} = props
  const [valueMobile, setValueMobile] = useState(value);

  return (
    <div className="input-time-mobile">
      <input
        type="time"
        value={valueMobile}
        onChange={(e) => {
          setValueMobile(e.target.value);
          onChange && onChange(e.target.value);
        }}
      />
    </div>
  );
})

TimeInput.defaultProps = {
  hour12Format:false,
  disabled:false,
  allowDelete:false,
  eachInputDropdown:false,
  manuallyDisplayDropdown:false,
  fullTimeDropdown:false,
};

export default React.memo(TimeInput);