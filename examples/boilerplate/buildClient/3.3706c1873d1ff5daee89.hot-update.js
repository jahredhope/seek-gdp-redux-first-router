webpackHotUpdate(3, {
  /***/ 318: /***/ function(module, exports, __webpack_require__) {
    'use strict'
    eval(
      "\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _History2 = __webpack_require__(99);\n\nvar _History3 = _interopRequireDefault(_History2);\n\nvar _utils = __webpack_require__(1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// 1) HISTORY RESTORATION:\n// * FROM SESSION_STORAGE (WITH A FALLBACK TO OUR \"HISTORY_STORAGE\" SOLUTION)\n\n// The `id` below is very important, as it's used to identify unique `sessionStorage` sessions lol.\n\n// Essentially, you can have multiple tabs open, or even in the same tab multiple sessions if you\n// enter another URL at the same site manually. Each need their history entries independently tracked.\n\n// So we:\n// - create an `id` for each when first encountered\n// - store it in `this.state.id`\n// - and prefix their `sessionStorage` key with it to uniquely identify the different histories :)\n\n// - then we restore the history using the id\n// - and for all subsequent history saving, we save to the correct storage with that `id`\n\n// NOTE: As far as the \"HISTORY_STORAGE\" fallback goes, please `sessionStorage.js`.\n// Essentially we save the entire sessionStorage in every entry of `window.history` :)\n\n// 2) POP HANDLING -- THE MOST IMPORTANT THING HERE:\n\n// A) REVERT POP: `forceGo(currentIndex - index)`\n// The first executed `forceGo` automatically undos the pop event, putting the browser history\n// back to where it was. Since the `jump` function takes relative numbers, we must calculate\n// that number by subtracting the current index from the next index\n\n// B) COMMIT POP: `forceGo(index - currentIndex)`\n// similarly the `commit` function performed in client code performs the reverse operation\n\n// EXAMPLE:\n// User presses back from index 5 to 4\n// revert: 5 - 4 === jump(1)\n// commit: 4 - 5 === jump(-1)\n// :)\n\n// WHY?\n// so client code can control when the URL actually changes, and possibly deny it\n\nvar BrowserHistory = function (_History) {\n  _inherits(BrowserHistory, _History);\n\n  function BrowserHistory() {\n    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, BrowserHistory);\n\n    var _opts$basenames = opts.basenames,\n        bns = _opts$basenames === undefined ? [] : _opts$basenames;\n\n    var basenames = bns.map(function (bn) {\n      return (0, _utils.formatSlashes)(bn);\n    });\n\n    var _getInitialHistorySta = (0, _utils.getInitialHistoryState)(),\n        id = _getInitialHistorySta.id,\n        initialHistoryState = _objectWithoutProperties(_getInitialHistorySta, ['id']);\n\n    var defaultLocation = (0, _utils.getWindowLocation)(initialHistoryState, basenames);\n\n    var _restoreHistory = (0, _utils.restoreHistory)(defaultLocation),\n        index = _restoreHistory.index,\n        entries = _restoreHistory.entries;\n\n    var _this = _possibleConstructorReturn(this, (BrowserHistory.__proto__ || Object.getPrototypeOf(BrowserHistory)).call(this, { index: index, entries: entries, basenames: basenames, saveHistory: _utils.saveHistory }));\n\n    _this._id = id;\n    _this._setupPopHandling();\n    return _this;\n  }\n\n  _createClass(BrowserHistory, [{\n    key: 'listen',\n    value: function listen(fn) {\n      var _this2 = this;\n\n      var unlisten = _get(BrowserHistory.prototype.__proto__ || Object.getPrototypeOf(BrowserHistory.prototype), 'listen', this).call(this, fn);\n      this._addPopListener();\n\n      return function () {\n        _this2._removePopListener();\n        unlisten();\n      };\n    }\n  }, {\n    key: '_setupPopHandling',\n    value: function _setupPopHandling() {\n      var _this3 = this;\n\n      var handlePop = function handlePop(loc) {\n        if (_this3._popForced) return _this3._popForced = false;\n\n        var n = _this3._isAfter(loc) ? 1 : -1;\n        var kind = n === -1 ? 'back' : 'next';\n        var revertPop = _this3._once(function () {\n          var shouldAwait = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n          console.log('POP', loc.url);\n          if (!shouldAwait) return _this3._forceGo(n * -1);\n\n          return _this3._awaitLocation(loc, 'revert').then(function () {\n            return _this3._forceGo(n * -1);\n          });\n        });\n\n        // revertPop will be called if route change blocked by `core/compose.js` or used as\n        // a flag by `this._jump` below to do nothing in the browser, since the user already\n        // did it via browser back/next buttons\n        _this3.jump(n, undefined, false, kind, true, revertPop);\n      };\n\n      // you don't really need to worry about the below utility work:\n\n      var onPopState = function onPopState(event) {\n        if ((0, _utils.isExtraneousPopstateEvent)(event)) return; // Ignore extraneous popstate events in WebKit.\n        handlePop((0, _utils.getWindowLocation)(event.state, _this3.basenames));\n      };\n\n      var onHashChange = function onHashChange() {\n        handlePop((0, _utils.getWindowLocation)((0, _utils.getHistoryState)(), _this3.basenames));\n      };\n\n      var funcs = (0, _utils.createPopListenerFuncs)(onPopState, onHashChange);\n      Object.assign(this, funcs); // merge: `_addPopListener`, `_removePopListener`\n    }\n  }, {\n    key: '_forceGo',\n    value: function _forceGo(n) {\n      this._popForced = true;\n      window.history.go(n); // revert\n    }\n  }, {\n    key: '_push',\n    value: function _push(nextState, awaitLoc) {\n      var _this4 = this;\n\n      var location = nextState.location;\n      var key = location.key,\n          state = location.state;\n\n      var href = this._createHref(location);\n      console.log('PUSH', href);\n\n      return this._awaitLocation(awaitLoc || this.location, '_push').then(function () {\n        return window.history.pushState({ id: _this4._id, key: key, state: state }, null, href);\n      }).then(function () {\n        return _this4._updateHistory(nextState);\n      });\n\n      return Promise.resolve();\n    }\n  }, {\n    key: '_replace',\n    value: function _replace(nextState, awaitLoc, n) {\n      var _this5 = this;\n\n      var location = nextState.location;\n      var key = location.key,\n          state = location.state;\n\n      var href = this._createHref(location);\n      console.log('REPLACE', href);\n\n      if (n) {\n        this._forceGo(n);\n\n        console.log('AWAIT LOCATION', n, awaitLoc);\n        return this._awaitLocation(awaitLoc || this.location, '_replaceBackNext').then(function () {\n          return window.history.replaceState({ id: _this5._id, key: key, state: state }, null, href);\n        }).then(function () {\n          return _this5._updateHistory(nextState);\n        });\n      }\n\n      return this._awaitLocation(awaitLoc || this.location, '_replace').then(function () {\n        return window.history.replaceState({ id: _this5._id, key: key, state: state }, null, href);\n      }).then(function () {\n        return _this5._updateHistory(nextState);\n      });\n\n      window.history.replaceState({ id: this._id, key: key, state: state }, null, href);\n\n      return Promise.resolve();\n    }\n  }, {\n    key: '_jump',\n    value: function _jump(nextState, n, isPop) {\n      var _this6 = this;\n\n      var prev = this.location;\n      var loc = nextState.location;\n\n\n      if (!n) {\n        // possibly the user mathematically calculated a jump of `0`\n        return this._replace(loc).then(function () {\n          return _this6._updateHistory(nextState);\n        });\n      }\n\n      if (isPop) {\n        // pop already handled by browser back/next buttons and real history state is already up to date\n        console.log('JUMP isPop');\n        return this._updateHistory(nextState);\n      }\n      console.log('JUMP!');\n      return this._awaitLocation(prev, 'jump prev').then(function () {\n        return _this6._forceGo(n);\n      }).then(function () {\n        return _this6._awaitLocation(loc, 'jump loc');\n      }).then(function () {\n        return _this6._replace(nextState, nextState.location);\n      }).then(function () {\n        return _this6._updateHistory(nextState);\n      });\n    }\n  }, {\n    key: '_setState',\n    value: function _setState(nextState, n) {\n      var _this7 = this;\n\n      var prev = this.location;\n      var loc = nextState.entries[this.index + n];\n\n      if (!n) {\n        return this._replace(loc).then(function () {\n          return _this7._updateHistory(nextState);\n        });\n      }\n      console.log('SET STATE');\n      return this._awaitLocation(prev).then(function () {\n        return _this7._forceGo(n);\n      }).then(function () {\n        return _this7._awaitLocation(loc);\n      }).then(function () {\n        return _this7._replace(loc);\n      }).then(function () {\n        return _this7._forceGo(-n);\n      }).then(function () {\n        return _this7._awaitLocation(prev);\n      }).then(function () {\n        return _this7._updateHistory(nextState);\n      });\n    }\n  }, {\n    key: '_reset',\n    value: function _reset(nextState) {\n      var _this8 = this;\n\n      var index = nextState.index,\n          entries = nextState.entries;\n\n      var lastIndex = entries.length - 1;\n      var stayAtEnd = index === lastIndex;\n      var prev = this.location;\n      var loc = this.entries[0];\n      var n = -this.index; // jump to beginning of entries stack\n\n      return this._awaitLocation(prev).then(function () {\n        return _this8._forceGo(n);\n      }).then(function () {\n        return _this8._awaitLocation(loc);\n      }).then(function () {\n        _this8._replace(entries[0]);\n        entries.slice(1).forEach(function (e) {\n          return _this8._push(e);\n        });\n\n        if (!stayAtEnd) {\n          _this8._forceGo(index - lastIndex);\n        }\n\n        _this8._updateHistory(nextState);\n      });\n    }\n  }, {\n    key: '_awaitLocation',\n    value: function _awaitLocation(loc, name) {\n      return new Promise(function (resolve) {\n        var url = loc.basename + loc.url;\n        var ready = function ready() {\n          console.log('CREATE PATH', url, (0, _utils.createPath)(window.location));\n          return url === (0, _utils.createPath)(window.location);\n        };\n\n        return tryChange(ready, resolve, name);\n      });\n    }\n  }]);\n\n  return BrowserHistory;\n}(_History3.default);\n\n// CHROME WORKAROUND:\n// chrome doesn't like rapid back to back history changes, so we test the first\n// change happened first, before executing the next\n\nexports.default = BrowserHistory;\nvar tries = 0;\nvar maxTries = 10;\nvar queue = [];\n\nvar tryChange = function tryChange(ready, complete, name) {\n  if (tries === 0) rapidChangeWorkaround(ready, complete, name);else queue.push([ready, complete, name]);\n};\n\nvar rapidChangeWorkaround = function rapidChangeWorkaround(ready, complete, name) {\n  tries++;\n\n  if (!ready() && tries < maxTries) {\n    console.log('tries', tries + 1, name);\n    setTimeout(function () {\n      return rapidChangeWorkaround(ready, complete, name);\n    }, 9);\n  } else {\n    complete();\n    tries = 0;\n\n    var _ref = queue.shift() || [],\n        _ref2 = _slicedToArray(_ref, 3),\n        again = _ref2[0],\n        com = _ref2[1],\n        _name = _ref2[2]; // try another if queue is full\n\n    if (again) {\n      rapidChangeWorkaround(again, com, _name);\n    }\n  }\n};\n\n// _performJump(location, n, prevLocation) {\n//   if (!n) return this._replace(location)\n\n//   const ready = () => {\n//     console.log('REVERT', prevLocation.basename + prevLocation.url === createPath(window.location), prevLocation.basename + prevLocation.url, createPath(window.location))\n//     return prevLocation.basename + prevLocation.url === createPath(window.location)\n//   }\n\n//   const complete = () => this._forceGo(n)\n//   tryChange(ready, complete)\n\n//   const ready2 = () => {\n//     console.log('JUMP', location.basename + location.url === createPath(window.location), location.basename + location.url, createPath(window.location))\n//     return location.basename + location.url === createPath(window.location)\n//   }\n\n//   return new Promise(res => tryChange(ready2, res)).then(() => {\n//     console.log('REPLACE', location.basename + location.url)\n//     this._replace(location)\n//   })\n// }\n\n//////////////////\n// WEBPACK FOOTER\n// /Users/jamesgillmore/React/redux-first-router/src/history/BrowserHistory.js\n// module id = 318\n// module chunks = 3\n\n//# sourceURL=webpack:////Users/jamesgillmore/React/redux-first-router/src/history/BrowserHistory.js?"
    )

    /***/
  }
})
