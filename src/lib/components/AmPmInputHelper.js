import React, { useState } from "react";
import UnitDropdown from "./UnitDropdown";
import ArrowDown from "./ArrowDown";
import { onEscapeOrEnterTap, onSideArrowTap, getSameInputProps } from "./actions";

const AmPmInputHelper = (props) => {
  const [inputFocused, setInputFocused] = useState(false);
  const {
    amPm,
    eachInputDropdown,
    moveNext,
    toggleAmPm,
    manuallyDisplayDropdown,
    setValue,
    fullTimeDropdown,
    inputRef,
    movePrev,
    ...otherProps
  } = props;

  const onMoveNext = () => {
    if (moveNext) {
      moveNext();
      setInputFocused(false);
    }
  };

  const propsAndState = { ...props, inputFocused, setInputFocused };
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
          onEscapeOrEnterTap(e, propsAndState);
          onSideArrowTap(e, propsAndState);
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
              onMoveNext();
            } else if (e.key.toLocaleLowerCase() === "a") {
              setValue("AM");
              onMoveNext();
            }
          }
        }}
      />
      {eachInputDropdown && manuallyDisplayDropdown && (
        <ArrowDown
          onClick={() => {
            setTimeout(() => setInputFocused(!inputFocused), 15);
          }}
        />
      )}
      <UnitDropdown
        data={["AM", "PM"]}
        shouldDisplay={eachInputDropdown}
        manuallyDisplayDropdown={manuallyDisplayDropdown}
        type="notRange"
        className="amPm"
        {...{
          moveNext: onMoveNext,
          setValue,
          value: amPm,
          dropdownVisibility: inputFocused,
          setDropdownVisibility: setInputFocused,
        }}
      />
    </React.Fragment>
  );
};

export default AmPmInputHelper;