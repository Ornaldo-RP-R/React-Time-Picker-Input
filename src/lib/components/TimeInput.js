import React, { useEffect, useState, useRef } from "react";
import InputTimeHelper from "./InputTimeHelper";
import AmPmInputHelper from "./AmPmInputHelper";
import { doubleChar, isOnMobileDevice, getDatePartsByProps, getTimeString } from "./actions";
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
  const [isMobile, setIsMobile] = useState(isOnMobileDevice());

  const dateParts = getDatePartsByProps(value, hour12Format);
  const [hour, setHour] = useState(dateParts.hour);
  const [minute, setMinutes] = useState(dateParts.minute);
  const [amPm, setAmPM] = useState(dateParts.amPm);
  const [valueMobile, setValueMobile] = useState(value);
  const [fullTimeDropdownVisibility, setFullTimeDropdownVisibility] = useState(false);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const amPmRef = useRef(null);

  const hourRange = hour12Format ? { start: 1, end: 12 } : { start: 0, end: 23 };

  const focusElementByRef = (ref) => {
    ref.current && ref.current.focus();
  };

  const blurElementByRef = (ref) => {
    ref.current && ref.current.blur();
  };

  const focusMinute = () => focusElementByRef(minuteRef);

  const updateTouchDevice = () => setIsMobile(isOnMobileDevice());

  const toggleAmPm = () => setAmPM(amPm === "AM" ? "PM" : "AM");

  const setTimeHourString = (value) => {
    const dateParts = getDatePartsByProps(value.replace(/ /g, ""), hour12Format);
    setHour(dateParts.hour);
    setMinutes(dateParts.minute);
    setAmPM(dateParts.amPm);
    if (value.toLowerCase().includes("am")) {
      setAmPM("AM");
    } else if (value.toLowerCase().includes("pm")) {
      setAmPM("PM");
    }
  };

  useEffect(() => {
    const dateString=getTimeString(hour, minute, amPm, hour12Format);
    onChangeEveryFormat && onChangeEveryFormat(dateString);
    console.log(dateString)
    if (hour !== "" && minute !== "" && !isMobile) {
      onChange && onChange(dateString);
    }
  }, [hour, minute, amPm]);

  useEffect(() => {
    if (!isMobile) {
      setTimeHourString(value);
    }
  }, [value]);

  const hideDropdown = (e) => {
    setFullTimeDropdownVisibility(false);
  };

  useEffect(() => {
    window.addEventListener("resize", updateTouchDevice);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("resize", updateTouchDevice);
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);

  const fullTimeDropdownData = () => {
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
    return hour12Format ? format12Data : format24Data;
  };

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
        ) : (
          <React.Fragment>
            <InputTimeHelper
              inputRef={hourRef}
              value={hour}
              setValue={setHour}
              {...sameInputProps}
              moveNext={focusMinute}
              range={hourRange}
              toggleAmPm={toggleAmPm}
            />
            <InputTimeHelper
              inputRef={minuteRef}
              value={minute}
              {...sameInputProps}
              setValue={setMinutes}
              moveNext={hour12Format ? () => focusElementByRef(amPmRef) : () => blurElementByRef(minuteRef)}
              movePrev={() => focusElementByRef(hourRef)}
              range={{ start: 0, end: 59 }}
            />
            {hour12Format && (
              <div className="inputWrapper">
                <AmPmInputHelper
                  {...amPmInputProps}
                  inputRef={amPmRef}
                  amPm={amPm}
                  movePrev={focusMinute}
                  moveNext={() => blurElementByRef(amPmRef)}
                  toggleAmPm={toggleAmPm}
                  setValue={setAmPM}
                />
              </div>
            )}
            {fullTimeDropdown && (
              <div>
                <ArrowDown
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullTimeDropdownVisibility(!fullTimeDropdownVisibility);
                  }}
                />
              </div>
            )}
            <div className="fullTime__wrapper">
              <UnitDropdown
                fullTimeDropdownVisibility
                data={fullTimeDropdownData()}
                shouldDisplay={fullTimeDropdown && fullTimeDropdownVisibility}
                manuallyDisplayDropdown={manuallyDisplayDropdown}
                type="notRange"
                className="fullTime"
                hour12Format={hour12Format}
                {...{
                  value: getTimeString(hour, minute, amPm, hour12Format),
                  setValue: setTimeHourString,
                  dropdownVisibility: fullTimeDropdownVisibility,
                  setDropdownVisibility: setFullTimeDropdownVisibility,
                }}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

TimeInput.defaultProps = {
  hour12Format:false,
  disabled:false,
  allowDelete:false,
  eachInputDropdown:false,
  manuallyDisplayDropdown:false,
  fullTimeDropdown:false,
};

export default React.memo(TimeInput);