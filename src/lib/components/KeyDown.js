import React, { useEffect, useRef } from "react";

let keydownInterruptedRef = false
const KeyDown = (props) => {
  const { onKeyDown, children, reference } = props;
  let onKeyDownRef = useRef(onKeyDown);

  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
    const element = reference?.current;

    const handleKeyDown = (event) => {
      keydownInterruptedRef = true;
      onKeyDownRef?.current?.(event);
    };

    const handleKeyUp = (event) => {
      if (!keydownInterruptedRef) onKeyDownRef?.current?.(event);
      keydownInterruptedRef = false;
    };

    if (element) {
      if (isChrome51OrLower()) {
        element.addEventListener("keydown", handleKeyDown);
        element.addEventListener("keyup", handleKeyUp);
      } else {
        element.addEventListener("keydown", handleKeyDown, { capture: true });
        element.addEventListener("keyup", handleKeyUp, { capture: true });
      }

      return () => {
        if (isChrome51OrLower()) {
          element.removeEventListener("keydown", handleKeyDown);
          element.removeEventListener("keyup", handleKeyUp);
        } else {
          element.removeEventListener("keydown", handleKeyDown, { capture: true });
          element.removeEventListener("keyup", handleKeyUp, { capture: true });
        }
      };
    }
  }, []);

  const isChrome51OrLower = () => {
    const chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
    return chromeVersion <= 51;
  };

  return children;
};

export default KeyDown;
