import "core-js/modules/web.dom-collections.iterator.js";
import React, { useState, useEffect } from "react";
function TransitionReplace(props) {
  const {
    transitionName,
    transitionEnterTimeout,
    transitionLeaveTimeout,
    children
  } = props;
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    setShouldRender(true);
  }, []);
  const handleTransitionEnd = () => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  };
  const handleExit = () => {
    setShouldRender(false);
  };
  const duration = shouldRender ? transitionEnterTimeout : transitionLeaveTimeout;
  const enterClass = shouldRender ? 'enter' : 'exit';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(transitionName, "-").concat(enterClass, " ").concat(transitionName, "-").concat(enterClass, "-active"),
    style: {
      transitionDuration: "".concat(duration, "ms")
    },
    onAnimationEnd: shouldRender ? handleTransitionEnd : handleExit
  }, children));
}
export default TransitionReplace;