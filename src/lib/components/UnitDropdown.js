import React, { useEffect } from "react";
import ReactCSSTransitionReplace from "react-css-transition-replace";
import { doubleChar } from "./actions";

const UnitDropdown = (props) => {
  const { data, inputFocused, shouldDisplay, setInputFocused, type, range, moveNext, setValue, value, className } = props;

  const getStyleWithoutPx=(element,styleProp)=>{
     return parseInt((element.currentStyle || window.getComputedStyle(element))[styleProp].replace("px",""));
  }

  const scrollToActiveUnit=(currentUnit,index)=>{
    let activeUnit = document.querySelector(`[data-key="${currentUnit}"]`);
    let scrollContainer = document.querySelector(`.inputWrapper__dropdown`);

    if(scrollContainer && activeUnit){
      const additionalHeightProp=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom","marginBottom","marginTop"]
      const scrollerAdditionalHeight=additionalHeightProp.map((prop)=>getStyleWithoutPx(scrollContainer,prop)).reduce((a, b) => a + b, 0)
      const activeUnitAdditionalHeight=additionalHeightProp.map((prop)=>getStyleWithoutPx(activeUnit,prop)).reduce((a, b) => a + b, 0)
      const activeUnitHeight=activeUnit.getBoundingClientRect().height + activeUnitAdditionalHeight;
      const scrollContainerHeight=scrollContainer.getBoundingClientRect().height + scrollerAdditionalHeight;
      scrollContainer.scrollTo({
        top: (activeUnitHeight * index) - scrollContainerHeight / 2,
        behavior: 'smooth'
      });
    }
  }

  return (
    <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
      {inputFocused && shouldDisplay && (
        <div className={`inputWrapper__dropdown ${className || ""}`}>
          {data.map((unitType, index) => {
            const currentUnit = type !== "amPm" ? doubleChar(range.start + index) : unitType;
            if(currentUnit === value){
              scrollToActiveUnit(currentUnit,index+1);
              setTimeout(()=>{
                scrollToActiveUnit(currentUnit,index+1);
              },250)
            }
            return (
              <span
                data-key={currentUnit}
                key={currentUnit}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setValue(currentUnit);
                  moveNext && moveNext();
                  setInputFocused(false);
                }}
                className={currentUnit === value ? "is-active" : ""}
              >
                {currentUnit}
              </span>
            );
          })}
        </div>
      )}
    </ReactCSSTransitionReplace>
  );
};
export default UnitDropdown;