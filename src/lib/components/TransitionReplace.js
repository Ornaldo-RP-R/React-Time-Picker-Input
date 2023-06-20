import React, { useState, useEffect } from "react";

function TransitionReplace(props) {
  const { transitionName, transitionEnterTimeout, transitionLeaveTimeout, children } = props;
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
  const enterClass = shouldRender ? 'enter' : 'exit'
  return (
    <div>
        <div
            className={`${transitionName}-${enterClass} ${transitionName}-${enterClass}-active`}
            style={{ transitionDuration: `${duration}ms` }}
            onAnimationEnd={shouldRender ? handleTransitionEnd : handleExit}
        >
            {children}
        </div>
    </div>
  );
}

export default TransitionReplace;
