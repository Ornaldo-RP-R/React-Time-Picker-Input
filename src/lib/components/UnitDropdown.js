import React, { useEffect , useRef } from "react";
import { doubleChar, getTimeString, timers } from "./actions";
import TransitionReplace from "./TransitionReplace";

const UnitDropdown = (props) => {
  const {
    data,
    dropdownVisibility,
    manuallyDisplayDropdown,
    shouldDisplay,
    hour12Format,
    setDropdownVisibility,
    type,
    range,
    moveNext,
    setValue,
    value,
    className,
    fullTimeDropdownVisibility,
  } = props;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const hideDropdown = () => setDropdownVisibility(false);
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);

  return (
    <TransitionReplace transitionName="cross-fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
      {dropdownVisibility && shouldDisplay && (
        <div ref={dropdownRef} className={`inputWrapper__dropdown ${className || ""}`}>
          {data.map((unit, index) => {
            const unitLabel = type === "notRange" ? unit : doubleChar(range.start + index);
            let currentUnit = unitLabel;
            if (fullTimeDropdownVisibility) {
              currentUnit = unitLabel.replace(/ /g, "");
              const amPm = currentUnit.toLowerCase().includes("pm") ? "PM" : "AM";
              const hour = parseInt(currentUnit.split(":")[0]);
              const dateParts = {
                hour: amPm === "AM" && hour === 12 ? "00" : hour,
                minute: currentUnit.split(":")[1].replace("AM", "").replace("PM", ""),
                amPm,
              };
              currentUnit = getTimeString(dateParts.hour, dateParts.minute, dateParts.amPm, hour12Format);
            }
            if (currentUnit === value) {
              scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
              timers.push(
                setTimeout(() => {
                  scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
                }, 250)
              );
            }
            return (
              <span
                data-key={currentUnit}
                key={currentUnit}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setValue(currentUnit);
                  !manuallyDisplayDropdown && moveNext && moveNext();
                  setDropdownVisibility(false);
                }}
                className={currentUnit === value ? "is-active" : ""}
              >
                <div>{unitLabel.replace("AM", "").replace("PM", "")}</div>
                {unitLabel.toLowerCase().includes("am") && <div>AM</div>}
                {unitLabel.toLowerCase().includes("pm") && <div>PM</div>}
              </span>
            );
          })}
        </div>
      )}
    </TransitionReplace>
  );
};

 const additionalHeightProp = [
   "borderTopWidth",
   "borderBottomWidth",
   "paddingTop",
   "paddingBottom",
   "marginBottom",
   "marginTop",
 ];

const getStyleWithoutPx = (element, styleProp) => {
  return parseInt((element.currentStyle || window.getComputedStyle(element))[styleProp].replace("px", ""));
};

  const scrollToActiveUnit = (currentUnit, index, ref) => {
    let activeUnit = document.querySelector(`[data-key="${currentUnit}"]`);
    let scrollContainer = ref.current;

    if (scrollContainer && activeUnit) {
      const scrollerAdditionalHeight = additionalHeightProp
        .map((prop) => getStyleWithoutPx(scrollContainer, prop))
        .reduce((a, b) => a + b, 0);
      const activeUnitAdditionalHeight = additionalHeightProp
        .map((prop) => getStyleWithoutPx(activeUnit, prop))
        .reduce((a, b) => a + b, 0);
      const activeUnitHeight = activeUnit.getBoundingClientRect().height + activeUnitAdditionalHeight;
      const scrollContainerHeight = scrollContainer.getBoundingClientRect().height + scrollerAdditionalHeight;
      scrollContainer.scrollTo({
        top: activeUnitHeight * index - scrollContainerHeight / 2,
        behavior: "smooth",
      });
    }
  };

export default UnitDropdown;