import React from "react";
const AmPmInputHelper = (props) => {
  const { amPm, focusMinuteInput, toggleAmPm, setAmPM,inputRef, ...otherProps } = props;
  return (
    <input
      id="react-time-input-picker__amPm"
      type="text"
      {...otherProps}
      value={amPm}
      ref={inputRef}
      readOnly
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          focusMinuteInput();
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          toggleAmPm();
        }
        if (e.key.toLocaleLowerCase() === "p") {
          setAmPM("PM");
        }
        if (e.key.toLocaleLowerCase() === "a") {
          setAmPM("AM");
        }
      }}
    />
  );
};

export default AmPmInputHelper;
