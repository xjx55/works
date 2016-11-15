/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var greeter = __webpack_require__(1);

	var fill0 = __webpack_require__(2)
	document.getElementById('root').appendChild(greeter());
	document.getElementById('test').innerHTML = fill0(7);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function() {
	    var greet = document.createElement('div');
	    greet.innerHTML = "Hello webpack";
	    return greet;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(num) {
	    "use strict";
	    return num < 10 ? '0' + num : num;
	};

/***/ }
/******/ ]);