"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/builtin/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/builtin/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactEventListener = _interopRequireDefault(require("react-event-listener"));

var _debounce = _interopRequireDefault(require("debounce"));

var _normalizeScrollLeft = require("normalize-scroll-left");

var _scroll = _interopRequireDefault(require("scroll"));

var _ScrollbarSize = _interopRequireDefault(require("./ScrollbarSize"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _TabIndicator = _interopRequireDefault(require("./TabIndicator"));

var _TabScrollButton = _interopRequireDefault(require("./TabScrollButton"));

var styles = function styles(theme) {
  return {
    root: {
      overflow: 'hidden',
      minHeight: 48,
      WebkitOverflowScrolling: 'touch' // Add iOS momentum scrolling.

    },
    flexContainer: {
      display: 'flex'
    },
    scroller: {
      position: 'relative',
      display: 'inline-block',
      flex: '1 1 auto',
      whiteSpace: 'nowrap'
    },
    fixed: {
      overflowX: 'hidden',
      width: '100%'
    },
    scrollable: {
      overflowX: 'scroll'
    },
    centered: {
      justifyContent: 'center'
    },
    scrollButtons: {},
    scrollButtonsAuto: (0, _defineProperty2.default)({}, theme.breakpoints.down('xs'), {
      display: 'none'
    }),
    indicator: {}
  };
};

exports.styles = styles;

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Tabs, _React$Component);

  function Tabs() {
    var _ref;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, Tabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_ref = Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call.apply(_ref, [this].concat(args))), _this.state = {
      indicatorStyle: {},
      scrollerStyle: {
        marginBottom: 0
      },
      showLeftScroll: false,
      showRightScroll: false,
      mounted: false,
      tabsMeta: null,
      tabMeta: null
    }, _this.getConditionalElements = function () {
      var _this$props = _this.props,
          classes = _this$props.classes,
          scrollable = _this$props.scrollable,
          ScrollButtonComponent = _this$props.ScrollButtonComponent,
          scrollButtons = _this$props.scrollButtons,
          theme = _this$props.theme;
      var conditionalElements = {};
      conditionalElements.scrollbarSizeListener = scrollable ? _react.default.createElement(_ScrollbarSize.default, {
        onChange: _this.handleScrollbarSizeChange,
        onLoad: _this.handleScrollbarSizeChange
      }) : null;
      var showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');
      conditionalElements.scrollButtonLeft = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
        direction: theme && theme.direction === 'rtl' ? 'right' : 'left',
        onClick: _this.handleLeftScrollClick,
        visible: _this.state.showLeftScroll,
        className: (0, _classnames.default)(classes.scrollButtons, (0, _defineProperty2.default)({}, classes.scrollButtonsAuto, scrollButtons === 'auto'))
      }) : null;
      conditionalElements.scrollButtonRight = showScrollButtons ? _react.default.createElement(ScrollButtonComponent, {
        direction: theme && theme.direction === 'rtl' ? 'left' : 'right',
        onClick: _this.handleRightScrollClick,
        visible: _this.state.showRightScroll,
        className: (0, _classnames.default)(classes.scrollButtons, (0, _defineProperty2.default)({}, classes.scrollButtonsAuto, scrollButtons === 'auto'))
      }) : null;
      return conditionalElements;
    }, _this.getMeta = function (refreshTabMeta) {
      if (_this.props.staticLabel) return _this.getMetaStaticLabel(refreshTabMeta);
      return {
        tabMeta: _this.getTabMeta(),
        tabsMeta: _this.getTabsMeta()
      };
    }, _this.getMetaStaticLabel = function (refreshTabMeta) {
      /*
        Get meta static label only thrashes the DOM at two times:
          1. On mount, getting all tabs dimensions
          2. On mount and value change, getting the active tab dimensions
      */
      var state = _this.state;
      var value = _this.props.value;

      var tabsMeta = state.tabsMeta || _this.getTabsMeta();

      var takeTabMeta = refreshTabMeta || !state.tabMeta || state.tabMeta.value !== value;
      var tabMeta = takeTabMeta ? _this.getTabMeta() : state.tabMeta;
      var tabMetaUpdated = tabMeta && (tabMeta !== state.tabMeta || value !== tabMeta.value);

      if (tabsMeta !== state.tabsMeta || tabMetaUpdated) {
        _this.setState({
          tabMeta: tabMeta,
          tabsMeta: tabsMeta
        });
      }

      return state;
    }, _this.getTabMeta = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize.props,
          tabs = _assertThisInitialize.tabs;

      var value = props.value;

      if (tabs && value !== false) {
        var children = tabs.children[0].children;

        if (children.length > 0) {
          var tab = children[_this.valueToIndex[value]];
          process.env.NODE_ENV !== "production" ? (0, _warning.default)(tab, "Material-UI: the value provided `".concat(value, "` is invalid")) : void 0;

          if (tab) {
            var rect = tab.getBoundingClientRect();
            return {
              left: rect.left,
              right: rect.right,
              value: value,
              width: rect.width
            };
          }
        }
      }

      return undefined;
    }, _this.getTabsMeta = function () {
      var _assertThisInitialize2 = (0, _assertThisInitialized2.default)(_this),
          props = _assertThisInitialize2.props,
          tabs = _assertThisInitialize2.tabs;

      var theme = props.theme;

      if (tabs) {
        var rect = _this.tabs.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft


        return {
          clientWidth: tabs.clientWidth,
          scrollLeft: tabs.scrollLeft,
          scrollLeftNormalized: (0, _normalizeScrollLeft.getNormalizedScrollLeft)(tabs, theme.direction),
          scrollWidth: tabs.scrollWidth,
          left: rect.left,
          right: rect.right
        };
      }

      return undefined;
    }, _this.tabs = undefined, _this.valueToIndex = {}, _this.handleResize = (0, _debounce.default)(function () {
      _this.updateIndicatorState(_this.props);

      _this.updateScrollButtonState();
    }, 166), _this.handleLeftScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(-_this.tabs.clientWidth);
      }
    }, _this.handleRightScrollClick = function () {
      if (_this.tabs) {
        _this.moveTabsScroll(_this.tabs.clientWidth);
      }
    }, _this.handleScrollbarSizeChange = function (_ref2) {
      var scrollbarHeight = _ref2.scrollbarHeight;

      _this.setState({
        scrollerStyle: {
          marginBottom: -scrollbarHeight
        }
      });
    }, _this.handleTabsScroll = (0, _debounce.default)(function () {
      _this.updateScrollButtonState();
    }, 166), _this.moveTabsScroll = function (delta) {
      var theme = _this.props.theme;

      if (_this.tabs) {
        var multiplier = theme.direction === 'rtl' ? -1 : 1;
        var nextScrollLeft = _this.tabs.scrollLeft + delta * multiplier; // Fix for Edge

        var invert = theme.direction === 'rtl' && (0, _normalizeScrollLeft.detectScrollType)() === 'reverse' ? -1 : 1;

        _scroll.default.left(_this.tabs, invert * nextScrollLeft);
      }
    }, _this.scrollSelectedIntoView = function () {
      var _this$getMeta = _this.getMeta(true),
          tabsMeta = _this$getMeta.tabsMeta,
          tabMeta = _this$getMeta.tabMeta;

      if (!tabMeta || !tabsMeta) return;

      if (tabMeta.left < tabsMeta.left) {
        // left side of button is out of view
        var nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);

        _scroll.default.left(_this.tabs, nextScrollLeft);
      } else if (tabMeta.right > tabsMeta.right) {
        // right side of button is out of view
        var _nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);

        _scroll.default.left(_this.tabs, _nextScrollLeft);
      }
    }, _this.updateScrollButtonState = function () {
      var _this$props2 = _this.props,
          scrollable = _this$props2.scrollable,
          scrollButtons = _this$props2.scrollButtons,
          theme = _this$props2.theme;

      if (_this.tabs && scrollable && scrollButtons !== 'off') {
        var _this$tabs = _this.tabs,
            scrollWidth = _this$tabs.scrollWidth,
            clientWidth = _this$tabs.clientWidth;
        var scrollLeft = (0, _normalizeScrollLeft.getNormalizedScrollLeft)(_this.tabs, theme.direction);
        var showLeftScroll = theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;
        var showRightScroll = theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

        if (showLeftScroll !== _this.state.showLeftScroll || showRightScroll !== _this.state.showRightScroll) {
          _this.setState({
            showLeftScroll: showLeftScroll,
            showRightScroll: showRightScroll
          });
        }
      }
    }, _temp));
  }

  (0, _createClass2.default)(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({
        mounted: true
      });
      this.updateIndicatorState(this.props);
      this.updateScrollButtonState();

      if (this.props.action) {
        this.props.action({
          updateIndicator: this.handleResize
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      this.updateScrollButtonState(); // The index might have changed at the same time.
      // We need to check again the right indicator position.

      this.updateIndicatorState(this.props);

      if (this.state.indicatorStyle !== prevState.indicatorStyle) {
        this.scrollSelectedIntoView();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.handleResize.clear();
      this.handleTabsScroll.clear();
    }
  }, {
    key: "updateIndicatorState",
    value: function updateIndicatorState(_ref3) {
      var theme = _ref3.theme;

      var _getMeta = this.getMeta(false),
          tabsMeta = _getMeta.tabsMeta,
          tabMeta = _getMeta.tabMeta;

      var left = 0;

      if (tabMeta && tabsMeta) {
        var correction = theme.direction === 'rtl' ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        left = tabMeta.left - tabsMeta.left + correction;
      }

      var indicatorStyle = {
        left: left,
        // May be wrong until the font is loaded.
        width: tabMeta ? tabMeta.width : 0
      };

      if ((indicatorStyle.left !== this.state.indicatorStyle.left || indicatorStyle.width !== this.state.indicatorStyle.width) && !Number.isNaN(indicatorStyle.left) && !Number.isNaN(indicatorStyle.width)) {
        this.setState({
          indicatorStyle: indicatorStyle
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames3,
          _this2 = this;

      var _props = this.props,
          action = _props.action,
          centered = _props.centered,
          childrenProp = _props.children,
          classes = _props.classes,
          classNameProp = _props.className,
          fullWidth = _props.fullWidth,
          indicatorColor = _props.indicatorColor,
          onChange = _props.onChange,
          scrollable = _props.scrollable,
          ScrollButtonComponent = _props.ScrollButtonComponent,
          scrollButtons = _props.scrollButtons,
          staticLabel = _props.staticLabel,
          _props$TabIndicatorPr = _props.TabIndicatorProps,
          TabIndicatorProps = _props$TabIndicatorPr === void 0 ? {} : _props$TabIndicatorPr,
          textColor = _props.textColor,
          theme = _props.theme,
          value = _props.value,
          other = (0, _objectWithoutProperties2.default)(_props, ["action", "centered", "children", "classes", "className", "fullWidth", "indicatorColor", "onChange", "scrollable", "ScrollButtonComponent", "scrollButtons", "staticLabel", "TabIndicatorProps", "textColor", "theme", "value"]);
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!centered || !scrollable, 'Material-UI: you can not use the `centered={true}` and `scrollable={true}` properties ' + 'at the same time on a `Tabs` component.') : void 0;
      var className = (0, _classnames.default)(classes.root, classNameProp);
      var scrollerClassName = (0, _classnames.default)(classes.scroller, (_classNames3 = {}, (0, _defineProperty2.default)(_classNames3, classes.fixed, !scrollable), (0, _defineProperty2.default)(_classNames3, classes.scrollable, scrollable), _classNames3));
      var flexContainerClassName = (0, _classnames.default)(classes.flexContainer, (0, _defineProperty2.default)({}, classes.centered, centered && !scrollable));

      var indicator = _react.default.createElement(_TabIndicator.default, (0, _extends2.default)({
        className: classes.indicator,
        color: indicatorColor
      }, TabIndicatorProps, {
        style: (0, _objectSpread2.default)({}, this.state.indicatorStyle, TabIndicatorProps.style)
      }));

      this.valueToIndex = {};
      var childIndex = 0;

      var children = _react.default.Children.map(childrenProp, function (child) {
        if (!_react.default.isValidElement(child)) {
          return null;
        }

        var childValue = child.props.value === undefined ? childIndex : child.props.value;
        _this2.valueToIndex[childValue] = childIndex;
        var selected = childValue === value;
        childIndex += 1;
        return _react.default.cloneElement(child, {
          fullWidth: fullWidth,
          indicator: selected && !_this2.state.mounted && indicator,
          selected: selected,
          onChange: onChange,
          staticLabel: staticLabel,
          textColor: textColor,
          value: childValue
        });
      });

      var conditionalElements = this.getConditionalElements();
      return _react.default.createElement("div", (0, _extends2.default)({
        className: className
      }, other), _react.default.createElement(_reactEventListener.default, {
        target: "window",
        onResize: this.handleResize
      }), conditionalElements.scrollbarSizeListener, _react.default.createElement("div", {
        className: classes.flexContainer
      }, conditionalElements.scrollButtonLeft, _react.default.createElement("div", {
        className: scrollerClassName,
        style: this.state.scrollerStyle,
        ref: function ref(node) {
          _this2.tabs = node;
        },
        role: "tablist",
        onScroll: this.handleTabsScroll
      }, _react.default.createElement("div", {
        className: flexContainerClassName
      }, children), this.state.mounted && indicator), conditionalElements.scrollButtonRight));
    }
  }]);
  return Tabs;
}(_react.default.Component);

Tabs.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: _propTypes.default.func,

  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: _propTypes.default.bool,

  /**
   * The content of the component.
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
   * If `true`, the tabs will grow to use all the available space.
   * This property is intended for small views, like on mobile.
   */
  fullWidth: _propTypes.default.bool,

  /**
   * Determines the color of the indicator.
   */
  indicatorColor: _propTypes.default.oneOf(['secondary', 'primary']),

  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: _propTypes.default.func,

  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable: _propTypes.default.bool,

  /**
   * The component used to render the scroll buttons.
   */
  ScrollButtonComponent: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]),

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll
   * `auto` will only present them on medium and larger viewports
   * `on` will always present them
   * `off` will never present them
   */
  scrollButtons: _propTypes.default.oneOf(['auto', 'on', 'off']),

  /**
   * Prevents resizing on the labels after the first query.
   * This improves performance, but leads to broken UX on resize or label change.
   * As a result, it works best with mobile devices, where widths are fixed.
   */
  staticLabel: _propTypes.default.bool,

  /**
   * Properties applied to the `TabIndicator` element.
   */
  TabIndicatorProps: _propTypes.default.object,

  /**
   * Determines the color of the `Tab`.
   */
  textColor: _propTypes.default.oneOf(['secondary', 'primary', 'inherit']),

  /**
   * @ignore
   */
  theme: _propTypes.default.object.isRequired,

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this property to `false`.
   */
  value: _propTypes.default.any
} : {};
Tabs.defaultProps = {
  centered: false,
  fullWidth: false,
  indicatorColor: 'secondary',
  scrollable: false,
  ScrollButtonComponent: _TabScrollButton.default,
  scrollButtons: 'auto',
  textColor: 'inherit'
};

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiTabs',
  withTheme: true
})(Tabs);

exports.default = _default;