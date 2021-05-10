import React, { useState, useEffect } from "react";
import { doubleChar } from "./actions";

const InputTimeHelper = (props) => {
  const { range, value, setValue, moveNext, movePrev, inputRef, allowDelete, toggleAmPm, ...otherProps } = props;
  const [changedValue, setChangedValue] = useState(value);
  const [keyPressed, setKeyPressed] = useState("");
  const [firstFocus, setFirstFocus] = useState(true);
  const [changeCount, setChangeCount] = useState(0);

  const cleanNumber = (number) => (!isNaN(number) ? number : "").toString().replace("0", "");
  const setSafeValue = (value) => {
    if (parseInt(value) >= range.start && parseInt(value) <= range.end) {
      setValue(value);
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
          moveNext && moveNext();
        }
      } else {
        setFirstFocus(true);
        setChangeCount(0);
      }
    }
  }, [changedValue]);

  const onBackSpaceTap = (e) => e.key === "Backspace" && allowDelete && setValue("");
  const onSideArrowTap = (e) => {
    e.key === "ArrowRight" && moveNext && moveNext();
    e.key === "ArrowLeft" && movePrev && movePrev();
  };
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
      <div className="inputWrapper">
        <input
          onFocus={() => {
            setFirstFocus(true);
            setChangeCount(0);
          }}
          ref={inputRef}
          {...otherProps}
          value={value}
          onKeyDown={(e) => {
            alert(e.key)
            setKeyPressed(e.key);
            onBackSpaceTap(e);
            onSideArrowTap(e);
            onArrowDownTap(e);
            onArrowUpTap(e);
          }}
          onChange={(e) => setChangedValue(e.target.value)}
          type="number"
          min={range.start}
          max={range.end}
        />
      </div>
    </React.Fragment>
  );
};

InputTimeHelper.defaultProps = {
  allowDelete: false,
};
export default InputTimeHelper;