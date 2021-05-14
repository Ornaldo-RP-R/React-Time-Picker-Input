import React from "react";

const AmPmInputHelper = (props) => {
  const { amPm, movePrev,moveNext, toggleAmPm, setAmPM, inputRef, ...otherProps } = props;
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
          movePrev();
        }
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          toggleAmPm();
          moveNext();
        }
        if (e.key.toLocaleLowerCase() === "p") {
          setAmPM("PM");
          moveNext();
        }
        if (e.key.toLocaleLowerCase() === "a") {
          setAmPM("AM");
          moveNext();
        }
      }}
    />
  );
};

export default AmPmInputHelper;