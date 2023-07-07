import React, { useEffect, useRef } from "react";
let keydownInterruptedRef = false;
const KeyDown = props => {
  const {
    onKeyDown,
    children,
    reference
  } = props;
  let onKeyDownRef = useRef(onKeyDown);
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
    const element = reference === null || reference === void 0 ? void 0 : reference.current;
    const handleKeyDown = event => {
      var _onKeyDownRef$current;
      keydownInterruptedRef = true;
      onKeyDownRef === null || onKeyDownRef === void 0 || (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
    };
    const handleKeyUp = event => {
      var _onKeyDownRef$current2;
      if (!keydownInterruptedRef) onKeyDownRef === null || onKeyDownRef === void 0 || (_onKeyDownRef$current2 = onKeyDownRef.current) === null || _onKeyDownRef$current2 === void 0 ? void 0 : _onKeyDownRef$current2.call(onKeyDownRef, event);
      keydownInterruptedRef = false;
    };
    if (element) {
      element.addEventListener("keydown", handleKeyDown, {
        capture: true
      });
      element.addEventListener("keyup", handleKeyUp, {
        capture: true
      });
      return () => {
        element.removeEventListener("keydown", handleKeyDown, {
          capture: true
        });
        element.removeEventListener("keyup", handleKeyUp, {
          capture: true
        });
      };
    }
  }, []);
  return children;
};
export default KeyDown;