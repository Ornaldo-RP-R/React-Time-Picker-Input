"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _reactCssTransitionReplace = _interopRequireDefault(require("react-css-transition-replace"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UnitDropdown = props => {
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
    fullTimeDropdownVisibility
  } = props;
  const dropdownRef = (0, _react.useRef)(null);

  const hideDropdown = () => {
    setDropdownVisibility(false);
  };

  (0, _react.useEffect)(() => {
    window.addEventListener("click", hideDropdown);
    document.querySelector("body").addEventListener("click", hideDropdown);
    return () => {
      window.removeEventListener("click", hideDropdown);
      document.querySelector("body").removeEventListener("click", hideDropdown);
    };
  }, []);

  const getStyleWithoutPx = (element, styleProp) => {
    return parseInt((element.currentStyle || window.getComputedStyle(element))[styleProp].replace("px", ""));
  };

  const scrollToActiveUnit = (currentUnit, index, ref) => {
    let activeUnit = document.querySelector("[data-key=\"".concat(currentUnit, "\"]"));
    let scrollContainer = ref.current;

    if (scrollContainer && activeUnit) {
      const additionalHeightProp = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom", "marginBottom", "marginTop"];
      const scrollerAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(scrollContainer, prop)).reduce((a, b) => a + b, 0);
      const activeUnitAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(activeUnit, prop)).reduce((a, b) => a + b, 0);
      const activeUnitHeight = activeUnit.getBoundingClientRect().height + activeUnitAdditionalHeight;
      const scrollContainerHeight = scrollContainer.getBoundingClientRect().height + scrollerAdditionalHeight;
      scrollContainer.scrollTo({
        top: activeUnitHeight * index - scrollContainerHeight / 2,
        behavior: "smooth"
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_reactCssTransitionReplace.default, {
    transitionName: "cross-fade",
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150
  }, dropdownVisibility && shouldDisplay && /*#__PURE__*/_react.default.createElement("div", {
    ref: dropdownRef,
    className: "inputWrapper__dropdown ".concat(className || "")
  }, data.map((unit, index) => {
    const unitLabel = type === "notRange" ? unit : (0, _actions.doubleChar)(range.start + index);
    let currentUnit = unitLabel;

    if (fullTimeDropdownVisibility) {
      currentUnit = unitLabel.replace(/ /g, "");
      const amPm = currentUnit.toLowerCase().includes("pm") ? "PM" : "AM";
      const hour = parseInt(currentUnit.split(":")[0]);
      const dateParts = {
        hour: amPm === "AM" && hour === 12 ? "00" : hour,
        minute: currentUnit.split(":")[1].replace("AM", "").replace("PM", ""),
        amPm
      };
      currentUnit = (0, _actions.getTimeString)(dateParts.hour, dateParts.minute, dateParts.amPm, hour12Format);
    }

    if (currentUnit === value) {
      scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
      setTimeout(() => {
        scrollToActiveUnit(currentUnit, index + 1, dropdownRef);
      }, 250);
    }

    return /*#__PURE__*/_react.default.createElement("span", {
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
    }, /*#__PURE__*/_react.default.createElement("div", null, unitLabel.replace("AM", "").replace("PM", "")), unitLabel.toLowerCase().includes("am") && /*#__PURE__*/_react.default.createElement("div", null, "AM"), unitLabel.toLowerCase().includes("pm") && /*#__PURE__*/_react.default.createElement("div", null, "PM"));
  })));
};

var _default = UnitDropdown;
exports.default = _default;