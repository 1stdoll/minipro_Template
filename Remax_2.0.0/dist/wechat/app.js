require('./runtime.js');
require('./remax-vendors.js');
(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([[2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = require('/__remax_runtime_options__');

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* istanbul ignore next */
var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function get(){return m[k];}});}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}:function(o,v){o["default"]=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod){if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);}__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,"__esModule",{value:true});var React=__importStar(__webpack_require__(2));var one_1=__webpack_require__(3);var styles={screen:{height:'100vh',backgroundColor:'#fff',lineHeight:1.4,textAlign:'center'},text:{color:'#999',fontSize:'16PX'}};var ErrorScreen=function ErrorScreen(){return React.createElement(one_1.View,{style:styles.screen},React.createElement(one_1.View,{style:styles.text},"\u9875\u9762\u9047\u5230\u4E00\u4E9B\u95EE\u9898"));};exports.default=ErrorScreen;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* istanbul ignore next */
function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj;};}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof(obj);}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function");}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass);}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o;};return _setPrototypeOf(o,p);}function _createSuper(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else{result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o);};return _getPrototypeOf(o);}var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;Object.defineProperty(o,k2,{enumerable:true,get:function get(){return m[k];}});}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];});var __setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}:function(o,v){o["default"]=v;});var __importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k in mod){if(k!=="default"&&Object.prototype.hasOwnProperty.call(mod,k))__createBinding(result,mod,k);}__setModuleDefault(result,mod);return result;};Object.defineProperty(exports,"__esModule",{value:true});var React=__importStar(__webpack_require__(2));var ErrorScreen=/*#__PURE__*/function(_React$Component){_inherits(ErrorScreen,_React$Component);var _super=_createSuper(ErrorScreen);function ErrorScreen(){var _this;_classCallCheck(this,ErrorScreen);_this=_super.apply(this,arguments);_this.state={error:null};return _this;}_createClass(ErrorScreen,[{key:"componentDidCatch",value:function componentDidCatch(error){console.error(error);}},{key:"render",value:function render(){var error=this.state.error;var errorScreen=this.props.errorScreen;if(error){return React.createElement(errorScreen,{error:error});}return this.props.children;}}],[{key:"getDerivedStateFromError",value:function getDerivedStateFromError(error){return{error:error};}}]);return ErrorScreen;}(React.Component);exports.default=ErrorScreen;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
module.exports = __webpack_require__(24);


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* istanbul ignore next */
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var remax_one__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorScreen_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorScreen_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorScreen_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorBoundary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorBoundary_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorBoundary_js__WEBPACK_IMPORTED_MODULE_3__);
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly){symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});}keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}/* harmony default export */ __webpack_exports__["default"] = ({onPageComponent:function onPageComponent(_ref){var component=_ref.component;function ErrorBoundaryWrap(props,ref){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorBoundary_js__WEBPACK_IMPORTED_MODULE_3___default.a,{errorScreen:D_work_minipro_Template_Remax_2_0_0_node_modules_remax_plugin_error_screen_2_13_1_remax_plugin_error_screen_lib_ErrorScreen_js__WEBPACK_IMPORTED_MODULE_2___default.a},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(component,_objectSpread(_objectSpread({},props),{},{ref:ref})));}ErrorBoundaryWrap.displayName='ErrorBoundary';return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(ErrorBoundaryWrap);}});

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/_@remax_runtime@2.13.1@@remax/runtime/esm/index.js + 25 modules
var esm = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/_remax@2.13.1@remax/runtime.js

// EXTERNAL MODULE: external "require('/__remax_runtime_options__')"
var _remax_runtime_options_ = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/@remax/apply-runtime-options.js
var pluginDriver=new esm["a" /* PluginDriver */]([__webpack_require__(20)].map(function(p){return p.default||p;}));esm["b" /* RuntimeOptions */].apply({platform:"wechat",debug:false,pxToRpx:true,pluginDriver:pluginDriver,hostComponents:_remax_runtime_options_["hostComponents"],pageEvents:_remax_runtime_options_["pageEvents"],appEvents:_remax_runtime_options_["appEvents"]});

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/_@remax_runtime@2.13.1@@remax/runtime/esm/index.js + 25 modules
var esm = __webpack_require__(1);

// EXTERNAL MODULE: ./src/app.css
var app = __webpack_require__(9);

// CONCATENATED MODULE: ./src/app.js
var app_App=function App(props){return props.children;};/* harmony default export */ var src_app = (app_App);
// CONCATENATED MODULE: ./src/app.entry.js
__webpack_require__(9);App(Object(esm["c" /* createAppConfig */])(src_app));

/***/ })
],[[13,1,0]]]);