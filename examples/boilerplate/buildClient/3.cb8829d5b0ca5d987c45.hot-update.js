webpackHotUpdate(3, {
  /***/ 312: /***/ function(module, exports, __webpack_require__) {
    'use strict'
    eval(
      "\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Request = undefined;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _types = __webpack_require__(2);\n\nvar _actions = __webpack_require__(11);\n\nvar _utils = __webpack_require__(0);\n\nvar _utils2 = __webpack_require__(27);\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nexports.default = function (action, api, next) {\n  return new Request(action, api, next);\n};\n\nvar Request = exports.Request = function Request(action, api, next) {\n  _classCallCheck(this, Request);\n\n  _initialiseProps.call(this);\n\n  var store = api.store,\n      routes = api.routes,\n      options = api.options,\n      getLocation = api.getLocation,\n      ctx = api.ctx;\n\n  var fromHistory = action.type === _types.UPDATE_HISTORY;\n  var state = getLocation();\n  var route = routes[action.type] || {};\n  var prevRoute = state.kind === 'init' ? routes[state.prev.type] || {} : routes[state.type];\n\n  // cancel pending not committed requests if new ones quickly come in\n  if (route.path) {\n    var requestNotCommitted = ctx.pending;\n    var isNewPipeline = !action.tmp;\n    console.log('CHECK IF CANCELED', requestNotCommitted, !action.tmp);\n    if (requestNotCommitted && isNewPipeline) {\n      requestNotCommitted.cancelled = true; // `compose` will return early on pending requests, effectively cancelling them\n    }\n\n    ctx.pending = this;\n  }\n\n  // the `tmp` context is passed along by all route-changing actions in the same primary parent\n  // pipeline to keep track of things like `committed` status, but we don't want the\n  // resulting action that leaves Rudy to have this, so we delete it.\n  var tmp = action.tmp || {};\n  delete action.tmp;\n\n  tmp.load = tmp.load || fromHistory && action.nextHistory.kind === 'load';\n\n  // a `committed` status must be marked for redirects initiated outside of the pipeline\n  // so that `src/middleware/transformAction/reduxAction.js` knows to `replace` the\n  // history entry instead of `push`\n  if (!ctx.busy && (0, _utils.isRedirect)(action)) {\n    tmp.committed = true;\n  }\n\n  // maintain `busy` status throughout a primary parent route changing pipeline even if\n  // there are pathlessRoutes, anonymousThunks (which don't have paths) called by them\n  ctx.busy = ctx.busy || !!route.path || fromHistory;\n\n  Object.assign(this, options.extra);\n  Object.assign(this, api);\n\n  if (!fromHistory) {\n    Object.assign(this, this.action); // for convenience (less destructuring in callbacks) our action key/vals are destructured into `Request` instances\n    delete this.location; // redirect action creator has this, and even though it causes no problems, we don't want it to prevent confusion\n  }\n\n  this.action = action;\n  this.tmp = tmp;\n  this.ctx = ctx;\n  this.route = route;\n  this.prevRoute = prevRoute;\n  this.initialState = store.getState();\n  this.initialLocation = state;\n  this.error = null;\n\n  // commitHistory is supplied by history-generated actions, and by redux-generated actions\n  // it will be added by the `transformAction` middleware, overwriting `noOp` below\n  this.commitHistory = fromHistory ? action.commit : _utils.noOp;\n  this.commitDispatch = next; // standard redux next dispatch from our redux middleware\n\n  // available when browser back/next buttons used. It's used in 2 cases:\n  // 1) when you return `false` from a route triggered by the browser back/next buttons (See `core/compose.js`)\n  // 2) as a flag when you redirect from a route triggered by browser back/next buttons (see `middleware/transformAction/utils/reduxAction.js`)\n  this.tmp.revertPop = this.tmp.revertPop || action.revertPop;\n\n  this.getState = store.getState;\n};\n\nvar _initialiseProps = function _initialiseProps() {\n  var _this = this;\n\n  this.commit = function () {\n    console.log('COMMIT!');\n    _this.ctx.pending = false;\n    _this.tmp.committed = true;\n\n    return Promise.all([_this.commitDispatch(_this.action), _this.commitHistory()]).then(function (_ref) {\n      var _ref2 = _slicedToArray(_ref, 1),\n          res = _ref2[0];\n\n      return res;\n    });\n  };\n\n  this.dispatch = function (action) {\n    var dispatch = _this.store.dispatch;\n\n    var type = action && action.type;\n    var route = _this.routes[type];\n\n    if (route || typeof action === 'function') {\n      action.tmp = _this.tmp; // keep the same `tmp` object across all redirects (or potential redirects in anonymous thunks)\n\n      if (_this.ctx.busy) {\n        // keep track of previous action to properly replace instead of push during back/next redirects\n        // see `middleware/transformAction/utils/reduxAction.js`\n        action.tmp.prevAction = _this.tmp.prevAction || _this.action;\n      }\n    }\n\n    if (_this.ctx.busy && route && route.path) {\n      // convert actions to redirects only if \"busy\" in a route changing pipeline\n      var status = action.location && action.location.status;\n      action = (0, _actions.redirect)(action, status || 302);\n    }\n\n    if ((action === null || !action.type) && typeof action !== 'function') {\n      action = (0, _utils.createAction)(action, _this); // automatically turn payload-only actions into real actions with routeType_COMPLETE as type\n    }\n\n    var oldUrl = _this.getLocation().url;\n\n    return Promise.resolve(dispatch(action)) // dispatch transformed action\n    .then(function (res) {\n      if (oldUrl !== _this.getLocation().url || _this.ctx.serverRedirect) {\n        _this.redirect = res; // assign action to `this.redirect` so `compose` can properly short-circuit route redirected from and resolve to the new action (NOTE: will capture nested pathlessRoutes + anonymousThunks)\n      }\n\n      if (res && (typeof res === 'undefined' ? 'undefined' : _typeof(res)) === 'object') {\n        res._dispatched = true; // tell `middleware/call/index.js` to not automatically dispatch callback returns\n      }\n\n      return res;\n    });\n  };\n\n  this.confirm = function () {\n    var canLeave = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n\n    delete _this.ctx.confirm;\n\n    if (!canLeave) {\n      return _this.store.dispatch({ type: _types.UNBLOCK });\n    }\n\n    // When `false` is returned from a `call` middleware, you can use `req.confirm()`\n    // to run the action successfully through the pipeline again, as in a confirmation modal.\n    // All we do is temporarily delete the blocking callback and replace it after the action\n    // is successfully dispatched.\n    //\n    // See `middleware/call/index.js` for where the below assignments are made.\n    var _last = _this.last,\n        name = _last.name,\n        prev = _last.prev;\n\n    var route = prev ? _this.prevRoute : _this.route;\n    var callback = route[name];\n\n    delete route[name];\n\n    return _this.store.dispatch(_this.action).then(function (res) {\n      route[name] = callback; // put callback back\n      return res;\n    });\n  };\n\n  this.block = function () {\n    _this.ctx.confirm = _this.confirm;\n    var ref = (0, _utils2.createFrom)(_this.action);\n    return _this.store.dispatch({ type: _types.BLOCK, payload: { ref: ref } });\n  };\n\n  this.setFrom = function () {\n    var ref = (0, _utils2.createFrom)(_this.action);\n    return _this.store.dispatch({ type: _types.SET_FROM, payload: { ref: ref } });\n  };\n\n  this.getKind = function () {\n    return _this.action.location && _this.action.location.kind;\n  };\n\n  this.hasSSR = function () {\n    return _this.getLocation().hasSSR;\n  };\n\n  this.isFirstLoad = function () {\n    return _this.tmp.firstLoad;\n  };\n};\n\n//////////////////\n// WEBPACK FOOTER\n// /Users/jamesgillmore/React/redux-first-router/src/core/createRequest.js\n// module id = 312\n// module chunks = 3\n\n//# sourceURL=webpack:////Users/jamesgillmore/React/redux-first-router/src/core/createRequest.js?"
    )

    /***/
  }
})
