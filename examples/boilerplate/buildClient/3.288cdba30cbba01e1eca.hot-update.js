webpackHotUpdate(3, {
  /***/ 336: /***/ function(module, exports, __webpack_require__) {
    'use strict'
    eval(
      "\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _reduxFirstRouter = __webpack_require__(96);\n\nfunction _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step(\"next\", value); }, function (err) { step(\"throw\", err); }); } } return step(\"next\"); }); }; }\n\nvar _default = {\n  HOME: {\n    path: '/',\n    beforeEnter: function () {\n      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req) {\n        var res;\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.next = 2;\n                return new Promise(function (res) {\n                  return setTimeout(res, 4000);\n                });\n\n              case 2:\n                if (!(typeof window !== 'undefined' && window.foo)) {\n                  _context2.next = 6;\n                  break;\n                }\n\n                _context2.next = 5;\n                return req.dispatch({ type: 'LIST', params: { category: 'react' } });\n\n              case 5:\n                res = _context2.sent;\n\n              case 6:\n              case 'end':\n                return _context2.stop();\n            }\n          }\n        }, _callee2, undefined);\n      }));\n\n      return function beforeEnter(_x2) {\n        return _ref2.apply(this, arguments);\n      };\n    }()\n    // beforeLeave: () => false\n  },\n  LIST: {\n    path: '/list/:category',\n    thunk: function () {\n      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {\n        var params = _ref4.params;\n        var category, packages;\n        return regeneratorRuntime.wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                category = params.category;\n                _context3.next = 3;\n                return fetch('/api/category/' + category);\n\n              case 3:\n                packages = _context3.sent;\n\n                if (!(packages.length === 0)) {\n                  _context3.next = 6;\n                  break;\n                }\n\n                return _context3.abrupt('return', {\n                  type: 'LIST',\n                  params: { category: 'redux' }\n                });\n\n              case 6:\n                return _context3.abrupt('return', { category: category, packages: packages });\n\n              case 7:\n              case 'end':\n                return _context3.stop();\n            }\n          }\n        }, _callee3, undefined);\n      }));\n\n      return function thunk(_x3) {\n        return _ref3.apply(this, arguments);\n      };\n    }()\n  }\n\n  // this is essentially faking/mocking the fetch api\n  // pretend this actually requested data over the network\n\n};\nexports.default = _default;\nvar fetch = function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {\n    var category;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.next = 2;\n            return new Promise(function (res) {\n              return setTimeout(res, 500);\n            });\n\n          case 2:\n            category = path.replace('/api/category/', '');\n            _context.t0 = category;\n            _context.next = _context.t0 === 'redux' ? 6 : _context.t0 === 'react' ? 7 : 8;\n            break;\n\n          case 6:\n            return _context.abrupt('return', ['reselect', 'recompose', 'redux-first-router']);\n\n          case 7:\n            return _context.abrupt('return', ['react-router', 'react-transition-group', 'react-universal-component']);\n\n          case 8:\n            return _context.abrupt('return', []);\n\n          case 9:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function fetch(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n;\n\nvar _temp = function () {\n  if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n    return;\n  }\n\n  __REACT_HOT_LOADER__.register(fetch, 'fetch', '/Users/jamesgillmore/React/redux-first-router/examples/boilerplate/src/routes.js');\n\n  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jamesgillmore/React/redux-first-router/examples/boilerplate/src/routes.js');\n}();\n\n;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/routes.js\n// module id = 336\n// module chunks = 3\n\n//# sourceURL=webpack:///./src/routes.js?"
    )

    /***/
  }
})
