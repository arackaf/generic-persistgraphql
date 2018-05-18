/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

require = require("@std/esm")(module, { mode: "js", cjs: true });

//This is how Jest wants the path for some reason
module.exports = require("./test-src/endpoint1/run.js");


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./test-src/graphQL/queries/authors.graphql
/* harmony default export */ var authors_graphql = (1);
// CONCATENATED MODULE: ./test-src/graphQL/queries/authorsThenTitles.graphql
/* harmony default export */ var authorsThenTitles_graphql = (3);
// CONCATENATED MODULE: ./test-src/graphQL/queries/authorsOfBook.graphql
/* harmony default export */ var authorsOfBook_graphql = (2);
// CONCATENATED MODULE: ./test-src/graphQL/queries/authorsThenTitlesOfBook.graphql
/* harmony default export */ var authorsThenTitlesOfBook_graphql = (4);
// CONCATENATED MODULE: ./test-src/testUtil/queryAndVerify.js
const fetchAndMatch = async ({ query, variables, name, results }) =>
  fetch(
    `http://localhost:3000/graphql?query=${encodeURIComponent(query)}${
      variables ? `&variables=${encodeURIComponent(JSON.stringify(variables))}` : ""
    }`
  )
    .then(resp => resp.json())
    .then(resp => {
      expect(resp.data).toEqual(results);
    });

// EXTERNAL MODULE: ./node_modules/isomorphic-fetch/fetch-npm-browserify.js
var fetch_npm_browserify = __webpack_require__(2);

// EXTERNAL MODULE: ./test-src/endpoint1/index.js
var endpoint1 = __webpack_require__(0);
var endpoint1_default = /*#__PURE__*/__webpack_require__.n(endpoint1);

// CONCATENATED MODULE: ./test-src/testGetQueries.js









beforeAll(() => {
  endpoint1_default.a.create();
});

afterAll(() => {
  endpoint1_default.a.dispose();
});

test("Basic GET", async () => {
  await fetchAndMatch({
    query: authors_graphql,
    results: { getBooks: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }] }
  });
});

test("Basic GET - two queries", async () => {
  await fetchAndMatch({
    query: authorsThenTitles_graphql,
    results: {
      authors: [{ author: "Richard Dawkins" }, { author: "Richard Dawkins" }, { author: "Steven Pinker" }, { author: "Steven Pinker" }],
      titles: [{ title: "The Selfish Gene" }, { title: "The Blind Watchmaker" }, { title: "The Blank Slate" }, { title: "Word Rules" }]
    }
  });
});

test("GET with variables", async () => {
  await fetchAndMatch({
    query: authorsOfBook_graphql,
    variables: { titleVar: "The Selfish Gene" },
    results: { getBooks: [{ author: "Richard Dawkins" }] }
  });
});

test("GET with variables two queries", async () => {
  await fetchAndMatch({
    query: authorsThenTitlesOfBook_graphql,
    variables: { titleVar: "The Selfish Gene" },
    results: {
      authors: [{ author: "Richard Dawkins" }],
      titles: [{ title: "The Selfish Gene" }]
    }
  });
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);


/***/ })
/******/ ]);