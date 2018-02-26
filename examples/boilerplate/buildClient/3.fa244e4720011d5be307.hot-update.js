webpackHotUpdate(3, {
  /***/ 324: /***/ function(module, exports, __webpack_require__) {
    'use strict'
    eval(
      '\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();\n\nvar _utils = __webpack_require__(51);\n\nvar _utils2 = __webpack_require__(0);\n\nexports.default = function (name) {\n  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return function (api) {\n    var _config$cache = config.cache,\n        cache = _config$cache === undefined ? false : _config$cache,\n        _config$prev = config.prev,\n        prev = _config$prev === undefined ? false : _config$prev,\n        _config$skipOpts = config.skipOpts,\n        skipOpts = _config$skipOpts === undefined ? false : _config$skipOpts;\n\n\n    (0, _utils.enhanceRoutes)(name, api.routes, api.options);\n\n    api.options.callbacks = api.options.callbacks || [];\n    api.options.callbacks.push(name);\n    api.options.shouldCall = api.options.shouldCall || _utils.shouldCall;\n\n    if (cache) {\n      api.cache = (0, _utils.createCache)(api, name, config);\n    }\n\n    return function (req) {\n      var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils2.noOp;\n\n      var rt = prev ? req.prevRoute : req.route;\n\n      var isCached = cache && api.cache.isCached(name, rt, req);\n      if (isCached) return next();\n\n      var calls = req.options.shouldCall(name, rt, req, config);\n      if (!calls) return next();\n\n      var r = calls.route && rt[name] || _utils2.noOp;\n      var o = calls.options && !skipOpts && req.options[name] || _utils2.noOp;\n\n      return Promise.all([Promise.resolve(r(req)).then(function (r) {\n        return autoDis(req, r, rt, name, next);\n      }), Promise.resolve(o(req)).then(function (o) {\n        return autoDis(req, o, rt, name, next, true);\n      })]).then(function (_ref) {\n        var _ref2 = _slicedToArray(_ref, 2),\n            r = _ref2[0],\n            o = _ref2[1];\n\n        if (isFalse(r, o)) {\n          // set the current callback name and whether its on the previous route (beforeLeave) or current\n          // so that `req.confirm()` can temporarily delete it and pass through the pipeline successfully\n          // in a confirmation modal or similar\n          req.last = { name: name, prev: prev };\n\n          if (!req.tmp.committed) {\n            req.block(); // update state.blocked === actionBlockedFrom\n          }\n\n          return false;\n        }\n\n        if (req.ctx.doubleDispatchRedirect) {\n          // dispatches to current location during redirects blocked, see `transformAction/index.js`\n          var attemptedAction = req.ctx.doubleDispatchRedirect;\n          delete req.ctx.doubleDispatchRedirect;\n          req.cancelled = true;\n          req.setFrom();\n          var _res = r !== undefined ? r : o;\n          return _res !== undefined ? _res : attemptedAction;\n        }\n\n        // `_dispatched` is a flag used to find whether actions were already dispatched in order\n        // to determine whether to automatically dispatch it. The goal is not to dispatch twice.\n        //\n        // We delete these keys so they don\'t show up in responses returned from `store.dispatch`\n        // NOTE: they are only applied to responses, which often are actions, but only AFTER they\n        // are dispatched. This way reducers never see this key. See `core/createRequest.js`\n        if (r) delete r._dispatched;\n        if (o) delete o._dispatched;\n\n        if (cache) req.cache.cacheAction(name, req.action);\n\n        var res = r !== undefined ? r : o;\n        return complete(next)(res);\n      });\n    };\n  };\n};\n\nvar isFalse = function isFalse(r, o) {\n  return r === false || o === false;\n};\n\nvar complete = function complete(next) {\n  return function (res) {\n    return next().then(function () {\n      return res;\n    });\n  };\n};\n\nvar autoDis = function autoDis(req, res, route, name, next, isOptCb) {\n  if (res === false) return false;\n  var hasReturn = res === null || res && !res._dispatched;\n\n  if (hasReturn && isAutoDispatch(route, req.options, isOptCb)) {\n    // if no dispatch was detected, and a result was returned, dispatch it automatically\n    var action = (0, _utils2.createAction)(res, req); // automatically create actions out of `res` which is just a payload, etc\n    return Promise.resolve(req.dispatch(action));\n  }\n\n  return res;\n};\n\nvar isAutoDispatch = function isAutoDispatch(route, options, isOptCb) {\n  return isOptCb ? options.autoDispatch === undefined ? true : options.autoDispatch : route.autoDispatch !== undefined ? route.autoDispatch : options.autoDispatch === undefined ? true : options.autoDispatch;\n};\n\n//////////////////\n// WEBPACK FOOTER\n// /Users/jamesgillmore/React/redux-first-router/src/middleware/call/index.js\n// module id = 324\n// module chunks = 3\n\n//# sourceURL=webpack:////Users/jamesgillmore/React/redux-first-router/src/middleware/call/index.js?'
    )

    /***/
  }
})
