import React, { useState, useEffect } from "react";
import UnitDropdown from "./UnitDropdown";
import { doubleChar, onEscapeOrEnterTap, onSideArrowTap, getSameInputProps } from "./actions";
import ArrowDown from "./ArrowDown";

const InputTimeHelper = (props) => {
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
    ...otherProps
  } = props;
  const [changedValue, setChangedValue] = useState(value);
  const [keyPressed, setKeyPressed] = useState("");
  const [firstFocus, setFirstFocus] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const [inputFocused, setInputFocused] = useState(false);
  const propsAndState = { ...props, inputFocused, setInputFocused };

  const cleanNumber = (number) => (!isNaN(number) ? number : "").toString().replace("0", "");
  const setSafeValue = (value) => {
    if (parseInt(value) >= range.start && parseInt(value) <= range.end) {
      setValue(value);
    }
  };

  const onMoveNext = () => {
    if (moveNext) {
      moveNext();
      setInputFocused(false);
    }
  };

  useEffect(() => {
    if (changedValue !== value) {
      setChangedValue(value);
    }
  }, [value]);

  const canNotWriteMoreTo = (value) => {
    const hasTwoValidChars = cleanNumber(value).length === 2;
    const lastCharachterOfEndRange = parseInt(range.end.toString().charAt(0));
    const cannotHaveSecondChar = parseInt(cleanNumber(value)) > parseInt(lastCharachterOfEndRange);
    const exceedRangeLimit = parseInt(cleanNumber(value) + keyPressed) > range.end;
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
      if (parseInt(newHour.toString()) >= range.start) {
        parseInt(newHour.toString()) <= range.end && setSafeValue(newHour);
        if (canNotWriteMoreTo(newHour) || changeCount >= 1) {
          onMoveNext();
        }
      } else {
        setFirstFocus(true);
        setChangeCount(0);
      }
    }
  }, [changedValue]);

  const onBackSpaceTap = (e) => e.key === "Backspace" && allowDelete && setValue("--");

  const onArrowDownTap = (e) => {
    if (e.key === "ArrowDown") {
      if (parseInt(value.toString()) === range.start) {
        setSafeValue(doubleChar(range.end));
      } else if (value.toString() === "12" && toggleAmPm) {
        setSafeValue("11");
        toggleAmPm();
      } else {
        setSafeValue(doubleChar(parseInt(value) - 1));
      }
    }
  };
  const onArrowUpTap = (e) => {
    if (e.key === "ArrowUp") {
      if (parseInt(value.toString()) === range.end) {
        setSafeValue(doubleChar(range.start));
      } else if (value.toString() === "11" && toggleAmPm) {
        setSafeValue("12");
        toggleAmPm();
      } else {
        setSafeValue(doubleChar(parseInt(value) + 1));
      }
    }
  };

  return (
    <React.Fragment>
      <div className={`inputWrapper ${manuallyDisplayDropdown ? "manuallyDisplayDropdown" : ""}`}>
        <input
          {...getSameInputProps(propsAndState)}
          onFocus={() => {
            setFirstFocus(true);
            setChangeCount(0);
          }}
          {...otherProps}
          value={value}
          onKeyDown={(e) => {
            onEscapeOrEnterTap(e, propsAndState);
            onSideArrowTap(e, propsAndState);
            setKeyPressed(e.key);
            onBackSpaceTap(e);
            onArrowDownTap(e);
            onArrowUpTap(e);
          }}
          onChange={(e) => setChangedValue(e.target.value)}
          onClick={(e)=>e.stopPropagation()}
          type="number"
          min={range.start}
          max={range.end}
        />
        {eachInputDropdown && manuallyDisplayDropdown && (
          <ArrowDown
            onClick={() => {
              setTimeout(() => setInputFocused(!inputFocused), 15);
            }}
          />
        )}
        <UnitDropdown
          shouldDisplay={eachInputDropdown}
          manuallyDisplayDropdown={manuallyDisplayDropdown}
          data={new Array(range.end + 1 - range.start).fill("")}
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

InputTimeHelper.defaultProps = {
  allowDelete: false,
};
export default InputTimeHelper;