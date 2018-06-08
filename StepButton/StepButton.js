"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _StepLabel = _interopRequireDefault(require("../StepLabel"));

var _reactHelpers = require("../utils/reactHelpers");

// @inheritedComponent ButtonBase
var styles = function styles(theme) {
  return {
    root: {
      width: '100%',
      padding: "".concat(theme.spacing.unit * 3, "px ").concat(theme.spacing.unit * 2, "px"),
      margin: "".concat(-theme.spacing.unit * 3, "px ").concat(-theme.spacing.unit * 2, "px"),
      boxSizing: 'content-box'
    },
    vertical: {
      justifyContent: 'left'
    },
    touchRipple: {
      color: 'rgba(0, 0, 0, 0.3)'
    }
  };
};

exports.styles = styles;

function StepButton(props) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      classNameProp = props.className,
      completed = props.completed,
      disabled = props.disabled,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties2.default)(props, ["active", "alternativeLabel", "children", "classes", "className", "completed", "disabled", "icon", "last", "optional", "orientation"]);
  var childProps = {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    icon: icon,
    optional: optional,
    orientation: orientation
  };
  var child = (0, _reactHelpers.isMuiElement)(children, ['StepLabel']) ? _react.default.cloneElement(children, childProps) : _react.default.createElement(_StepLabel.default, childProps, children);
  return _react.default.createElement(_ButtonBase.default, (0, _extends2.default)({
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: (0, _classnames.default)(classes.root, (0, _defineProperty2.default)({}, classes.vertical, orientation === 'vertical'), classNameProp)
  }, other), child);
}

StepButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active: _propTypes.default.bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: _propTypes.default.bool,

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: _propTypes.default.bool,

  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: _propTypes.default.bool,

  /**
   * The icon displayed by the step label.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   */
  last: _propTypes.default.bool,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,

  /**
   * @ignore
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical'])
} : {};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepButton'
})(StepButton);

exports.default = _default;