import "core-js/modules/es.array.map.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.parse-int.js";
import "core-js/modules/es.array.reduce.js";
import "core-js/modules/es.object.to-string.js";
import React, { useEffect, useRef } from "react";
import { doubleChar, getTimeString, timers } from "./actions";
import TransitionReplace from "./TransitionReplace";
var UnitDropdown = props => {
  var data = props.data,
    dropdownVisibility = props.dropdownVisibility,
    manuallyDisplayDropdown = props.manuallyDisplayDropdown,
    shouldDisplay = props.shouldDisplay,
    hour12Format = props.hour12Format,
    setDropdownVisibility = props.setDropdownVisibility,
    type = props.type,
    range = props.range,
    moveNext = props.moveNext,
    setValue = props.setValue,
    value = props.value,
    className = props.className,
    fullTimeDropdownVisibility = props.fullTimeDropdownVisibility;
  var dropdownRef = useRef(null);
  useEffect(() => {
    var hideDropdown = () => setDropdownVisibility(false);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);
  return /*#__PURE__*/React.createElement(TransitionReplace, {
    transitionName: "cross-fade",
    transitionEnterTimeout: 250,
    transitionLeaveTimeout: 250
  }, dropdownVisibility && shouldDisplay && /*#__PURE__*/React.createElement("div", {
    ref: dropdownRef,
    className: "inputWrapper__dropdown ".concat(className || "")
  }, data.map((unit, index) => {
    var unitLabel = type === "notRange" ? unit : doubleChar(range.start + index);
    var currentUnit = unitLabel;
    if (fullTimeDropdownVisibility) {
      currentUnit = unitLabel.replace(/ /g, "");
      var amPm = currentUnit.toLowerCase().includes("pm") ? "PM" : "AM";
      var hour = parseInt(currentUnit.split(":")[0]);
      var dateParts = {
        hour: amPm === "AM" && hour === 12 ? "00" : hour,
        minute: currentUnit.split(":")[1].replace("AM", "").replace("PM", ""),
        amPm
      };
      currentUnit = getTimeString(dateParts.hour, dateParts.minute, dateParts.amPm, hour12Format);
    }
    if (currentUnit === value) {
      scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
      timers.push(setTimeout(() => {
        scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
      }, 250));
    }
    return /*#__PURE__*/React.createElement("span", {
      "data-key": currentUnit,
      key: currentUnit,
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        setValue(currentUnit);
        !manuallyDisplayDropdown && moveNext && moveNext();
        setDropdownVisibility(false);
      },
      className: currentUnit === value ? "is-active" : ""
    }, /*#__PURE__*/React.createElement("div", null, unitLabel.replace("AM", "").replace("PM", "")), unitLabel.toLowerCase().includes("am") && /*#__PURE__*/React.createElement("div", null, "AM"), unitLabel.toLowerCase().includes("pm") && /*#__PURE__*/React.createElement("div", null, "PM"));
  })));
};
var additionalHeightProp = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom", "marginBottom", "marginTop"];
var getStyleWithoutPx = (element, styleProp) => {
  return parseInt((element.currentStyle || window.getComputedStyle(element))[styleProp].replace("px", ""));
};
var scrollToActiveUnit = (currentUnit, index, ref) => {
  var activeUnit = document.querySelector("[data-key=\"".concat(currentUnit, "\"]"));
  var scrollContainer = ref.current;
  if (scrollContainer && activeUnit) {
    var scrollerAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(scrollContainer, prop)).reduce((a, b) => a + b, 0);
    var activeUnitAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(activeUnit, prop)).reduce((a, b) => a + b, 0);
    var activeUnitHeight = activeUnit.getBoundingClientRect().height + activeUnitAdditionalHeight;
    var scrollContainerHeight = scrollContainer.getBoundingClientRect().height + scrollerAdditionalHeight;
    scrollContainer.scrollTo({
      top: activeUnitHeight * index - scrollContainerHeight / 2,
      behavior: "smooth"
    });
  }
};
export default UnitDropdown;