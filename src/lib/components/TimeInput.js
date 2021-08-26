import React, { useEffect, useState, useRef } from "react";
import InputTimeHelper from "./InputTimeHelper";
import AmPmInputHelper from "./AmPmInputHelper";
import { doubleChar, isOnMobileDevice, getDatePartsByProps } from "./actions";
import "./TimeInput.css";

function TimeInput(props) {
  const { hour12Format, value, onChange,disabled, allowDelete,shouldDisplayDropdown } = props;
  const [isMobile, setIsMobile] = useState(isOnMobileDevice());

  const dateParts = getDatePartsByProps(value, hour12Format);
  const [hour, setHour] = useState(dateParts.hour);
  const [minute, setMinutes] = useState(dateParts.minute);
  const [amPm, setAmPM] = useState(dateParts.amPm);
  const [valueMobile, setValueMobile] = useState(value);
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

  useEffect(() => {
    if (hour !== "" && minute !== "" && !isMobile) {
      let hour24Format = !hour12Format && doubleChar(hour);
      let hour12Am = amPm === "AM" && hour === "12" && "00";
      const calculateHour = parseInt(hour) + (amPm === "PM" && hour !== "12" ? 12 : 0);
      let dateString24 = doubleChar((hour24Format || hour12Am || calculateHour).toString()) + ":" + minute;
      let hour24 = dateString24.substring(0, 2);
      let hour12 = doubleChar(parseInt(hour24) < 12 ? hour24 : parseInt(hour24) - 12);
      let amPmString = parseInt(hour24) < 12 ? "AM" : "PM";
      console.log(dateString24)
      onChange && onChange(dateString24);
    }
  }, [hour, minute, amPm]);

  useEffect(() => {
    if (!isMobile) {
      const dateParts = getDatePartsByProps(value, hour12Format);
      setHour(dateParts.hour);
      setMinutes(dateParts.minute);
      setAmPM(dateParts.amPm);
    }
  }, [value]);

  useEffect(() => {
    window.addEventListener("resize", updateTouchDevice);
    return () => {
      window.removeEventListener("resize", updateTouchDevice);
    };
  }, []);
  return (
    <div className="react-time-input-picker-wrapper">
      <div className={`react-time-input-picker ${disabled? "is-disabled":""}`}>
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
              placeholder="- -"
              setValue={setHour}
              disabled={disabled}
              allowDelete={allowDelete}
              moveNext={focusMinute}
              range={hourRange}
              shouldDisplayDropdown={shouldDisplayDropdown}
              toggleAmPm={toggleAmPm}
            />
            <InputTimeHelper
              inputRef={minuteRef}
              disabled={disabled}
              value={minute}
              shouldDisplayDropdown={shouldDisplayDropdown}
              placeholder="- -"
              setValue={setMinutes}
              allowDelete={allowDelete}
              moveNext={hour12Format ? () => focusElementByRef(amPmRef) : () => blurElementByRef(minuteRef)}
              movePrev={() => focusElementByRef(hourRef)}
              range={{ start: 0, end: 59 }}
            />
            {hour12Format && (
              <div className="inputWrapper">
                <AmPmInputHelper
                  inputRef={amPmRef}
                  amPm={amPm}
                  disabled={disabled}
                  movePrev={focusMinute}
                  shouldDisplayDropdown={shouldDisplayDropdown}
                  moveNext={() => blurElementByRef(amPmRef)}
                  toggleAmPm={toggleAmPm}
                  setValue={setAmPM}
                />
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

TimeInput.defaultProps={
  shouldDisplayDropdown: false,
  disabled: false,
}

export default React.memo(TimeInput);
