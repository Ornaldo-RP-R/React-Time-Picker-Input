export const doubleChar = (value) => (value.length >= 2 ? value : "0" + value).slice(-2);

export const isOnMobileDevice=()=>{
  let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  
  let matchMediaQuery = function(query) {
    return window.matchMedia(query).matches;
  };

  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    return true;
  }

  let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");

  return matchMediaQuery(query);
}

export const getDatePartsByProps = (stringTimeValue,hour12Format) => {
    const hourByProp = (stringTimeValue || "").toString().trim().substring(0, 2);
    const minuteByProp = (stringTimeValue || "").toString().trim().substring(3, 5);
    const editHourByFormat = hour12Format ? (hourByProp <= 12 ? hourByProp : hourByProp - 12) : hourByProp;
    return {
        hour: parseInt(editHourByFormat) === 0 && hour12Format ? "12" : doubleChar(editHourByFormat),
        minute: doubleChar(minuteByProp),
        amPm: parseInt(editHourByFormat) === 0 && hour12Format ? "AM" : hourByProp < 12 ? "AM" : "PM",
    };
};

export const onEscapeOrEnterTap=(e,props)=>{
  const {inputFocused,shouldDisplayDropdown,movePrev,setInputFocused,inputRef,moveNext}=props;
  if(e.key==="Escape" && inputFocused && shouldDisplayDropdown){
    setInputFocused(false);
    if(movePrev){
      movePrev()
    }else{
      inputRef.current.blur();
    }
  }
  if(e.key==="Enter" && inputFocused && shouldDisplayDropdown){
    setInputFocused(false);
    if(moveNext){
      moveNext()
    }else{
      inputRef.current.blur();
    }
  }
}

export const onSideArrowTap = (e,props) => {
  const {moveNext,movePrev}=props;
  e.key === "ArrowRight" && moveNext && moveNext();
  e.key === "ArrowLeft" && movePrev && movePrev();
};

export const getSameInputProps=(props)=>{
  const {setInputFocused,disabled,inputRef}=props;
  return {
     onFocusCapture:() => setInputFocused(true),
        disabled,
        onBlurCapture:(e) => {
          setTimeout(() => {
            setInputFocused(false);
          }, 50);
        },
        ref:inputRef
  }
}