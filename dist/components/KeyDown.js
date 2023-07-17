import React, { useRef, useRef } from "react";

var keydownInterruptedRef = false;

class KeyDown extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDownRef = useRef(props.onKeyDown);
    this.reference = props.reference;
  }

  componentDidMount() {
    this.onKeyDownRef.current = this.props.onKeyDown;

    var element = this.reference && this.reference.current;
    var handleKeyDown = (event) => {
      var _onKeyDownRef$current;
      keydownInterruptedRef = true;
      if (this.onKeyDownRef && this.onKeyDownRef.current) {
        (_onKeyDownRef$current = this.onKeyDownRef.current).call(this.onKeyDownRef, event);
      }
    };
    var handleKeyUp = (event) => {
      var _onKeyDownRef$current2;
      if (!keydownInterruptedRef && this.onKeyDownRef && this.onKeyDownRef.current) {
        (_onKeyDownRef$current2 = this.onKeyDownRef.current).call(this.onKeyDownRef, event);
      }
      keydownInterruptedRef = false;
    };
    if (element) {
      element.addEventListener("keydown", handleKeyDown, {
        capture: true,
      });
      element.addEventListener("keyup", handleKeyUp, {
        capture: true,
      });
    }
  }

  componentWillUnmount() {
    var element = this.reference && this.reference.current;
    var handleKeyDown = (event) => {
      var _onKeyDownRef$current;
      keydownInterruptedRef = true;
      if (this.onKeyDownRef && this.onKeyDownRef.current) {
        (_onKeyDownRef$current = this.onKeyDownRef.current).call(this.onKeyDownRef, event);
      }
    };
    var handleKeyUp = (event) => {
      var _onKeyDownRef$current2;
      if (!keydownInterruptedRef && this.onKeyDownRef && this.onKeyDownRef.current) {
        (_onKeyDownRef$current2 = this.onKeyDownRef.current).call(this.onKeyDownRef, event);
      }
      keydownInterruptedRef = false;
    };
    if (element) {
      element.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
      element.removeEventListener("keyup", handleKeyUp, {
        capture: true,
      });
    }
  }

  render() {
    return this.props.children;
  }
}

export default KeyDown;
