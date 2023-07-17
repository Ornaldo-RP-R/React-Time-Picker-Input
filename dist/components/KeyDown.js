import { useEffect, useRef } from "react";
import { isChrome51OrLower } from "../components/actions";
var keydownInterruptedRef = false;
var KeyDown = props => {
  var onKeyDown = props.onKeyDown,
    children = props.children,
    reference = props.reference;
  var onKeyDownRef = useRef(onKeyDown);
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);
  var handleKeyDown = event => {
    var _onKeyDownRef$current;
    keydownInterruptedRef = true;
    onKeyDownRef === null || onKeyDownRef === void 0 || (_onKeyDownRef$current = onKeyDownRef.current) === null || _onKeyDownRef$current === void 0 ? void 0 : _onKeyDownRef$current.call(onKeyDownRef, event);
  };
  var handleKeyUp = event => {
    var _onKeyDownRef$current2;
    if (!keydownInterruptedRef) onKeyDownRef === null || onKeyDownRef === void 0 || (_onKeyDownRef$current2 = onKeyDownRef.current) === null || _onKeyDownRef$current2 === void 0 ? void 0 : _onKeyDownRef$current2.call(onKeyDownRef, event);
    keydownInterruptedRef = false;
  };
  var isOldChrome = isChrome51OrLower();
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
    var element = reference === null || reference === void 0 ? void 0 : reference.current;
    if (element && !isOldChrome) {
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
  return children(isOldChrome ? handleKeyDown : undefined, isOldChrome ? handleKeyUp : undefined);
};
export default KeyDown;