import React from "react";
const AmPmInputHelper = (props) => {
  const { amPm, focusElementById, toggleAmPm, setAmPM } = props;
  return (
    <input
      id="react-time-input-picker__amPm"
      type="text"
      value={amPm}
      readOnly
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          focusElementById("minuteInput");
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
