import React, { useState } from "react";
import UnitDropdown from "./UnitDropdown";
import {onEscapeOrEnterTap,onSideArrowTap,getSameInputProps} from "./actions"

const AmPmInputHelper = (props) => {
  const [inputFocused, setInputFocused] = useState(false);
  const { amPm, movePrev,shouldDisplayDropdown,disabled, moveNext, toggleAmPm, setValue, inputRef, ...otherProps } = props;
  const propsAndState={...props,inputFocused,setInputFocused}
  return (
    <React.Fragment>
      <input
        {...getSameInputProps(propsAndState)}
        value={amPm}
        type="text"
        {...otherProps}
        readOnly
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEscapeOrEnterTap(e,propsAndState);
          onSideArrowTap(e,propsAndState);
          if (
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