import { useEffect, useRef } from "react";
import { isChrome51OrLower } from "../../../dist/components/actions";

let keydownInterruptedRef = false
const KeyDown = (props) => {
  const { onKeyDown, children, reference } = props;
  let onKeyDownRef = useRef(onKeyDown);

  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  const handleKeyDown = (event) => {
    keydownInterruptedRef = true;
    onKeyDownRef?.current?.(event);
  };

  const handleKeyUp = (event) => {
    if (!keydownInterruptedRef) onKeyDownRef?.current?.(event);
    keydownInterruptedRef = false;
  };

  const isOldChrome = isChrome51OrLower();
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
    const element = reference?.current;
    if (element && !isOldChrome) {
      element.addEventListener("keydown", handleKeyDown, { capture: true });
      element.addEventListener("keyup", handleKeyUp, { capture: true });
      return () => {
        element.removeEventListener("keydown", handleKeyDown, { capture: true });
        element.removeEventListener("keyup", handleKeyUp, { capture: true });
      };
    }
  }, []);

  return children(isOldChrome ? handleKeyDown : undefined, isOldChrome ? handleKeyUp : undefined);
};

export default KeyDown;
