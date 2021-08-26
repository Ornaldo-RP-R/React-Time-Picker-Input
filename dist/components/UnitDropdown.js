"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.reduce.js");

var _react = _interopRequireWildcard(require("react"));

var _reactCssTransitionReplace = _interopRequireDefault(require("react-css-transition-replace"));

var _actions = require("./actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UnitDropdown = props => {
  const {
    data,
    inputFocused,
    shouldDisplay,
    setInputFocused,
    type,
    range,
    moveNext,
    setValue,
    value,
    className
  } = props;

  const getStyleWithoutPx = (element, styleProp) => {
    return parseInt((element.currentStyle || window.getComputedStyle(element))[styleProp].replace("px", ""));
  };

  const scrollToActiveUnit = (currentUnit, index) => {
    let activeUnit = document.querySelector("[data-key=\"".concat(currentUnit, "\"]"));
    let scrollContainer = document.querySelector(".inputWrapper__dropdown");

    if (scrollContainer && activeUnit) {
      const additionalHeightProp = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom", "marginBottom", "marginTop"];
      const scrollerAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(scrollContainer, prop)).reduce((a, b) => a + b, 0);
      const activeUnitAdditionalHeight = additionalHeightProp.map(prop => getStyleWithoutPx(activeUnit, prop)).reduce((a, b) => a + b, 0);
      const activeUnitHeight = activeUnit.getBoundingClientRect().height + activeUnitAdditionalHeight;
      const scrollContainerHeight = scrollContainer.getBoundingClientRect().height + scrollerAdditionalHeight;
      scrollContainer.scrollTo({
        top: activeUnitHeight * index - scrollContainerHeight / 2,
        behavior: 'smooth'
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_reactCssTransitionReplace.default, {
    transitionName: "cross-fade",
    transitionEnterTimeout: 150,
    transitionLeaveTimeout: 150
  }, inputFocused && shouldDisplay && /*#__PURE__*/_react.default.createElement("div", {
    className: "inputWrapper__dropdown ".concat(className || "")
  }, data.map((unitType, index) => {
    const currentUnit = type !== "amPm" ? (0, _actions.doubleChar)(range.start + index) : unitType;

    if (currentUnit === value) {
      scrollToActiveUnit(currentUnit, index + 1);
      setTimeout(() => {
        scrollToActiveUnit(currentUnit, index + 1);
      }, 250);
    }

    return /*#__PURE__*/_react.default.createElement("span", {
      "data-key": currentUnit,
      key: currentUnit,
      onClick: e => {
        e.stopPropagation();
        e.preventDefault();
        setValue(currentUnit);
        moveNext && moveNext();
        setInputFocused(false);
      },
      className: currentUnit === value ? "is-active" : ""
    }, currentUnit);
  })));
};

var _default = UnitDropdown;
exports.default = _default;