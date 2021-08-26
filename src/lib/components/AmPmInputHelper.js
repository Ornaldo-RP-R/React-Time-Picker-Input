import React, { useState } from "react";
import UnitDropdown from "./UnitDropdown";

const AmPmInputHelper = (props) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { amPm, movePrev,shouldDisplayDropdown,disabled, moveNext, toggleAmPm, setValue, inputRef, ...otherProps } = props;
  return (
    <React.Fragment>
      <input
        onFocusCapture={() => {
          setInputFocused(true);
        }}
        disabled={disabled}
        onBlurCapture={(e) => {
          setTimeout(() => {
            setInputFocused(false);
          }, 50);
        }}
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
          } else if (
            e.key.toLocaleLowerCase() === "p" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key.toLocaleLowerCase() === "a"
          ) {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              toggleAmPm();
            } else if (e.key.toLocaleLowerCase() === "p") {
              setValue("PM");
              moveNext();
            } else if (e.key.toLocaleLowerCase() === "a") {
              setValue("AM");
              moveNext();
            }
          }
        }}
      />
      <UnitDropdown
        data={["AM", "PM"]}
        shouldDisplay={shouldDisplayDropdown}
        type="amPm"
        className="amPm"
        {...{ moveNext, setValue, value: amPm, inputFocused, setInputFocused }}
      />
    </React.Fragment>
  );
};

export default AmPmInputHelper;