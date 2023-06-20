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

    if (element){
      element.addEventListener("keydown", handleKeyDown, { capture: true });
      element.addEventListener("keyup", handleKeyUp, { capture: true });

      return () => {
        element.removeEventListener("keydown", handleKeyDown, { capture: true });
        element.removeEventListener("keyup", handleKeyUp, { capture: true });
      };
    } 
  }, []);

  return children;
};

export default KeyDown;
