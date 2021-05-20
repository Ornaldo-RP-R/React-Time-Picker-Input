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
        e.preventDefault();
        e.stopPropagation();
        if (e.key === "ArrowLeft") {
          movePrev();
        }else if(e.key.toLocaleLowerCase() === "p" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key.toLocaleLowerCase() === "a"){
          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            toggleAmPm();
          }else if (e.key.toLocaleLowerCase() === "p") {
            setAmPM("PM");
          }else if (e.key.toLocaleLowerCase() === "a") {
            setAmPM("AM");
          }
          moveNext();
        }
      }}
    />
  );
};

export default AmPmInputHelper;