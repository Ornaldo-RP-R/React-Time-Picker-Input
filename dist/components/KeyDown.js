import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match.js";
import React, { useEffect, useRef } from "react";
var keydownInterruptedRef = false;
var KeyDown = props => {
  var onKeyDown = props.onKeyDown,
    children = props.children,
    reference = props.reference;
  var onKeyDownRef = useRef(onKeyDown);
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);
  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
    var element = reference === null || reference === void 0 ? void 0 : reference.current;
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
    if (element) {
      if (isChrome51OrLower()) {
        element.addEventListener("keydown", handleKeyDown);
        element.addEventListener("keyup", handleKeyUp);
      } else {
        element.addEventListener("keydown", handleKeyDown, {
          capture: true
        });
        element.addEventListener("keyup", handleKeyUp, {
          capture: true
        });
      }
      return () => {
        if (isChrome51OrLower()) {
          element.removeEventListener("keydown", handleKeyDown);
          element.removeEventListener("keyup", handleKeyUp);
        } else {
          element.removeEventListener("keydown", handleKeyDown, {
            capture: true
          });
          element.removeEventListener("keyup", handleKeyUp, {
            capture: true
          });
        }
      };
    }
  }, []);
  
  var isChrome51OrLower = () => {
    var chromeVersion = parseInt(navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)[2]);
    return chromeVersion <= 51;
  };
  return children;
};
export default KeyDown;