import React, { useCallback, useState } from "react";
import UnitDropdown from "./UnitDropdown";
import KeyDown from "./KeyDown"
import ArrowDown from "./ArrowDown";
import { useOnSideArrowTap, getSameInputProps, timers } from "./actions";

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

 const onMoveNext = useCallback(() => {
   if (moveNext) {
     moveNext();
     setInputFocused(false);
   }
 }, [moveNext, setInputFocused]);

  const propsAndState = { ...props, inputFocused, setInputFocused };

  const onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);

  const onKeyDown = useCallback(
    (e) => {
      const { key } = e || {};
      e.preventDefault();
      e.stopPropagation();
      onSideArrowTap(e);
      const aPressed = key?.toLocaleLowerCase?.() === "a";
      if (key === "ArrowUp" || key === "ArrowDown") {
        toggleAmPm();
      } else if (key?.toLocaleLowerCase?.() === "p" || aPressed) {
        setValue(aPressed ? "AM" : "PM");
        onMoveNext();
      }
    },
    [onMoveNext, setValue, toggleAmPm, onSideArrowTap]
  );
    

  return (
    <React.Fragment>
      <KeyDown onKeyDown={onKeyDown} reference={inputRef}>
       <input {...getSameInputProps(propsAndState)} value={amPm} type="text" {...otherProps} readOnly />
      </KeyDown>
      {eachInputDropdown && manuallyDisplayDropdown && (
        <ArrowDown
          onClick={() => {
            timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
          }}
        />
      )}
      <UnitDropdown
        data={data}
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

const data = ["AM", "PM"];

export default AmPmInputHelper;