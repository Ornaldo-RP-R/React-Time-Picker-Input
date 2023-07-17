import React, { useState, useEffect, useCallback } from "react";
import UnitDropdown from "./UnitDropdown";
import { doubleChar, useOnSideArrowTap, getSameInputProps, timers } from "./actions";
import ArrowDown from "./ArrowDown";
import KeyDown from "./KeyDown";

const InputTimeHelper = (props) => {
  const {
    range,
    value,
    eachInputDropdown,
    manuallyDisplayDropdown,
    setValue,
    moveNext,
  } = props;
  const [inputFocused, setInputFocused] = useState(false);
  const {start,end} = range || {};
  const setSafeValue = useCallback(
    (value) => {
      if (parseInt(value) >= start && parseInt(value) <= end) setValue(value);
    },
    [start, end, setValue]
  );

  const onMoveNext = useCallback(() => {
    if (moveNext) {
      moveNext?.();
      setInputFocused(false);
    }
  }, [moveNext, setInputFocused]);

  return (
    <React.Fragment>
      <div className={`inputWrapper ${manuallyDisplayDropdown ? "manuallyDisplayDropdown" : ""}`}>
        <Input
          {...{
            ...props,
            inputFocused,
            setSafeValue,
            onMoveNext,
            setInputFocused,
          }}
        />
        {eachInputDropdown && manuallyDisplayDropdown && (
          <ArrowDown
            onClick={() => {
              timers.push(setTimeout(() => setInputFocused(!inputFocused), 15));
            }}
          />
        )}
        <UnitDropdown
          shouldDisplay={eachInputDropdown}
          manuallyDisplayDropdown={manuallyDisplayDropdown}
          data={new Array(end + 1 - start).fill("")}
          {...{
            range,
            moveNext: onMoveNext,
            setValue: setSafeValue,
            dropdownVisibility: inputFocused,
            setDropdownVisibility: setInputFocused,
            value,
          }}
        />
      </div>
    </React.Fragment>
  );
};

const Input = (props) => {
  const {
    range,
    value,
    eachInputDropdown,
    manuallyDisplayDropdown,
    setValue,
    moveNext,
    allowDelete,
    toggleAmPm,
    className,
    fullTimeDropdown,
    inputRef,
    movePrev,
    inputFocused,
    setInputFocused,
    setSafeValue,
    onMoveNext,
    ...otherProps
  } = props; 
  const { start, end } = range || {};
  const [changedValue, setChangedValue] = useState(value);
  const [keyPressed, setKeyPressed] = useState("");
  const [firstFocus, setFirstFocus] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const propsAndState = { ...props, inputFocused, setInputFocused };

  const cleanNumber = (number) => (!isNaN(number) ? number : "").toString().replace("0", "");

  useEffect(() => {
    if (changedValue !== value) {
      setChangedValue(value);
    }
  }, [value]);

  const canNotWriteMoreTo = (value) => {
    const hasTwoValidChars = cleanNumber(value).length === 2;
    const lastCharachterOfEndRange = parseInt(end.toString().charAt(0));
    const cannotHaveSecondChar = parseInt(cleanNumber(value)) > parseInt(lastCharachterOfEndRange);
    const exceedRangeLimit = parseInt(cleanNumber(value) + keyPressed) > end;
    const isMultipleOf10 = value.length === 2 && value.charAt(1) === "0" && value.charAt(0) !== "0";
    return isMultipleOf10 || hasTwoValidChars || cannotHaveSecondChar || exceedRangeLimit;
  };

  useEffect(() => {
    if (changedValue !== value && changedValue !== "" && !isNaN(keyPressed)) {
      let newHour = doubleChar(cleanNumber(value) + keyPressed);
      if (firstFocus) {
        newHour = doubleChar(keyPressed);
        setFirstFocus(false);
        setChangeCount(changeCount + 1);
        setChangedValue("");
      }
      if (parseInt(newHour.toString()) >= start) {
        parseInt(newHour.toString()) <= end && setSafeValue(newHour);
        if (canNotWriteMoreTo(newHour) || changeCount >= 1) {
          onMoveNext();
        }
      } else {
        setFirstFocus(true);
        setChangeCount(0);
      }
    }
  }, [changedValue]);


  const onArrowTap = useCallback(
    (start, end, hourLimit, newHour, hourAcc) => {
      if (parseInt(value.toString()) === start) {
        setSafeValue(doubleChar(end));
      } else if (value.toString() === hourLimit && toggleAmPm) {
        toggleAmPm(undefined, {hour:newHour});
      } else {
        setSafeValue(doubleChar(parseInt(value) + hourAcc));
      }
    },
    [value, toggleAmPm, setSafeValue]
  );

  const onArrowDownTap = useCallback(
    (e) => {
      if (e?.key === "ArrowDown")  onArrowTap(start, end, "12", "11", -1);
    },
    [onArrowTap,start,end]
  );
  const onArrowUpTap = useCallback(
    (e) => {
      if (e?.key === "ArrowUp") onArrowTap(end, start, "11", "12", +1);
    },
    [onArrowTap,start,end]
  );

  const onSideArrowTap = useOnSideArrowTap(moveNext, movePrev);

  const onKeyDown = useCallback(
    (e) => {
      const onBackSpaceTap = (e) => e.key === "Backspace" && allowDelete && setValue("--");

      onSideArrowTap(e);
      setKeyPressed(e.key);
      onBackSpaceTap(e);
      onArrowDownTap(e);
      onArrowUpTap(e);
    },
    [onSideArrowTap, setKeyPressed, allowDelete, setValue, onArrowDownTap, onArrowUpTap]
  );

  return (
    <KeyDown onKeyDown={onKeyDown} reference={inputRef}>
      {(onKeyDown, onKeyUp) => (
        <input
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          {...getSameInputProps(propsAndState)}
          onFocus={() => {
            setFirstFocus(true);
            setChangeCount(0);
          }}
          {...otherProps}
          value={value}
          onChange={(e) => setChangedValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          type="number"
          min={start}
          max={end}
        />
      )}
    </KeyDown>
  );
};


InputTimeHelper.defaultProps = {
  allowDelete: false,
};
export default InputTimeHelper;