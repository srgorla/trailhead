(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
  new MutationObserver((o) => {
    for (const f of o)
      if (f.type === "childList")
        for (const h of f.addedNodes)
          h.tagName === "LINK" && h.rel === "modulepreload" && s(h);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const f = {};
    return (
      o.integrity && (f.integrity = o.integrity),
      o.referrerPolicy && (f.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (f.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (f.credentials = "omit")
          : (f.credentials = "same-origin"),
      f
    );
  }
  function s(o) {
    if (o.ep) return;
    o.ep = !0;
    const f = r(o);
    fetch(o.href, f);
  }
})();
var go = { exports: {} },
  er = {};
var i0;
function Eg() {
  if (i0) return er;
  i0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function r(s, o, f) {
    var h = null;
    if (
      (f !== void 0 && (h = "" + f),
      o.key !== void 0 && (h = "" + o.key),
      "key" in o)
    ) {
      f = {};
      for (var p in o) p !== "key" && (f[p] = o[p]);
    } else f = o;
    return (
      (o = f.ref),
      { $$typeof: a, type: s, key: h, ref: o !== void 0 ? o : null, props: f }
    );
  }
  return ((er.Fragment = l), (er.jsx = r), (er.jsxs = r), er);
}
var r0;
function Sg() {
  return (r0 || ((r0 = 1), (go.exports = Eg())), go.exports);
}
var F = Sg(),
  bo = { exports: {} },
  Se = {};
var u0;
function Tg() {
  if (u0) return Se;
  u0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    s = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    h = Symbol.for("react.context"),
    p = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    y = Symbol.for("react.memo"),
    g = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    C = Symbol.iterator;
  function O(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (C && T[C]) || T["@@iterator"]),
        typeof T == "function" ? T : null);
  }
  var U = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    V = Object.assign,
    Z = {};
  function I(T, B, K) {
    ((this.props = T),
      (this.context = B),
      (this.refs = Z),
      (this.updater = K || U));
  }
  ((I.prototype.isReactComponent = {}),
    (I.prototype.setState = function (T, B) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, T, B, "setState");
    }),
    (I.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    }));
  function te() {}
  te.prototype = I.prototype;
  function ne(T, B, K) {
    ((this.props = T),
      (this.context = B),
      (this.refs = Z),
      (this.updater = K || U));
  }
  var oe = (ne.prototype = new te());
  ((oe.constructor = ne), V(oe, I.prototype), (oe.isPureReactComponent = !0));
  var se = Array.isArray;
  function Te() {}
  var J = { H: null, A: null, T: null, S: null },
    L = Object.prototype.hasOwnProperty;
  function Re(T, B, K) {
    var W = K.ref;
    return {
      $$typeof: a,
      type: T,
      key: B,
      ref: W !== void 0 ? W : null,
      props: K
    };
  }
  function He(T, B) {
    return Re(T.type, B, T.props);
  }
  function Xe(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function Oe(T) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (K) {
        return B[K];
      })
    );
  }
  var Be = /\/+/g;
  function rt(T, B) {
    return typeof T == "object" && T !== null && T.key != null
      ? Oe("" + T.key)
      : B.toString(36);
  }
  function Je(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (
          (typeof T.status == "string"
            ? T.then(Te, Te)
            : ((T.status = "pending"),
              T.then(
                function (B) {
                  T.status === "pending" &&
                    ((T.status = "fulfilled"), (T.value = B));
                },
                function (B) {
                  T.status === "pending" &&
                    ((T.status = "rejected"), (T.reason = B));
                }
              )),
          T.status)
        ) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function w(T, B, K, W, fe) {
    var ye = typeof T;
    (ye === "undefined" || ye === "boolean") && (T = null);
    var _e = !1;
    if (T === null) _e = !0;
    else
      switch (ye) {
        case "bigint":
        case "string":
        case "number":
          _e = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case a:
            case l:
              _e = !0;
              break;
            case g:
              return ((_e = T._init), w(_e(T._payload), B, K, W, fe));
          }
      }
    if (_e)
      return (
        (fe = fe(T)),
        (_e = W === "" ? "." + rt(T, 0) : W),
        se(fe)
          ? ((K = ""),
            _e != null && (K = _e.replace(Be, "$&/") + "/"),
            w(fe, B, K, "", function (Ya) {
              return Ya;
            }))
          : fe != null &&
            (Xe(fe) &&
              (fe = He(
                fe,
                K +
                  (fe.key == null || (T && T.key === fe.key)
                    ? ""
                    : ("" + fe.key).replace(Be, "$&/") + "/") +
                  _e
              )),
            B.push(fe)),
        1
      );
    _e = 0;
    var dt = W === "" ? "." : W + ":";
    if (se(T))
      for (var Pe = 0; Pe < T.length; Pe++)
        ((W = T[Pe]), (ye = dt + rt(W, Pe)), (_e += w(W, B, K, ye, fe)));
    else if (((Pe = O(T)), typeof Pe == "function"))
      for (T = Pe.call(T), Pe = 0; !(W = T.next()).done;)
        ((W = W.value), (ye = dt + rt(W, Pe++)), (_e += w(W, B, K, ye, fe)));
    else if (ye === "object") {
      if (typeof T.then == "function") return w(Je(T), B, K, W, fe);
      throw (
        (B = String(T)),
        Error(
          "Objects are not valid as a React child (found: " +
            (B === "[object Object]"
              ? "object with keys {" + Object.keys(T).join(", ") + "}"
              : B) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    }
    return _e;
  }
  function X(T, B, K) {
    if (T == null) return T;
    var W = [],
      fe = 0;
    return (
      w(T, W, "", "", function (ye) {
        return B.call(K, ye, fe++);
      }),
      W
    );
  }
  function re(T) {
    if (T._status === -1) {
      var B = T._result;
      ((B = B()),
        B.then(
          function (K) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 1), (T._result = K));
          },
          function (K) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 2), (T._result = K));
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = B)));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var ce =
      typeof reportError == "function"
        ? reportError
        : function (T) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var B = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof T == "object" &&
                  T !== null &&
                  typeof T.message == "string"
                    ? String(T.message)
                    : String(T),
                error: T
              });
              if (!window.dispatchEvent(B)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", T);
              return;
            }
            console.error(T);
          },
    be = {
      map: X,
      forEach: function (T, B, K) {
        X(
          T,
          function () {
            B.apply(this, arguments);
          },
          K
        );
      },
      count: function (T) {
        var B = 0;
        return (
          X(T, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (T) {
        return (
          X(T, function (B) {
            return B;
          }) || []
        );
      },
      only: function (T) {
        if (!Xe(T))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return T;
      }
    };
  return (
    (Se.Activity = b),
    (Se.Children = be),
    (Se.Component = I),
    (Se.Fragment = r),
    (Se.Profiler = o),
    (Se.PureComponent = ne),
    (Se.StrictMode = s),
    (Se.Suspense = v),
    (Se.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (Se.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (T) {
        return J.H.useMemoCache(T);
      }
    }),
    (Se.cache = function (T) {
      return function () {
        return T.apply(null, arguments);
      };
    }),
    (Se.cacheSignal = function () {
      return null;
    }),
    (Se.cloneElement = function (T, B, K) {
      if (T == null)
        throw Error(
          "The argument must be a React element, but you passed " + T + "."
        );
      var W = V({}, T.props),
        fe = T.key;
      if (B != null)
        for (ye in (B.key !== void 0 && (fe = "" + B.key), B))
          !L.call(B, ye) ||
            ye === "key" ||
            ye === "__self" ||
            ye === "__source" ||
            (ye === "ref" && B.ref === void 0) ||
            (W[ye] = B[ye]);
      var ye = arguments.length - 2;
      if (ye === 1) W.children = K;
      else if (1 < ye) {
        for (var _e = Array(ye), dt = 0; dt < ye; dt++)
          _e[dt] = arguments[dt + 2];
        W.children = _e;
      }
      return Re(T.type, fe, W);
    }),
    (Se.createContext = function (T) {
      return (
        (T = {
          $$typeof: h,
          _currentValue: T,
          _currentValue2: T,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }),
        (T.Provider = T),
        (T.Consumer = { $$typeof: f, _context: T }),
        T
      );
    }),
    (Se.createElement = function (T, B, K) {
      var W,
        fe = {},
        ye = null;
      if (B != null)
        for (W in (B.key !== void 0 && (ye = "" + B.key), B))
          L.call(B, W) &&
            W !== "key" &&
            W !== "__self" &&
            W !== "__source" &&
            (fe[W] = B[W]);
      var _e = arguments.length - 2;
      if (_e === 1) fe.children = K;
      else if (1 < _e) {
        for (var dt = Array(_e), Pe = 0; Pe < _e; Pe++)
          dt[Pe] = arguments[Pe + 2];
        fe.children = dt;
      }
      if (T && T.defaultProps)
        for (W in ((_e = T.defaultProps), _e))
          fe[W] === void 0 && (fe[W] = _e[W]);
      return Re(T, ye, fe);
    }),
    (Se.createRef = function () {
      return { current: null };
    }),
    (Se.forwardRef = function (T) {
      return { $$typeof: p, render: T };
    }),
    (Se.isValidElement = Xe),
    (Se.lazy = function (T) {
      return { $$typeof: g, _payload: { _status: -1, _result: T }, _init: re };
    }),
    (Se.memo = function (T, B) {
      return { $$typeof: y, type: T, compare: B === void 0 ? null : B };
    }),
    (Se.startTransition = function (T) {
      var B = J.T,
        K = {};
      J.T = K;
      try {
        var W = T(),
          fe = J.S;
        (fe !== null && fe(K, W),
          typeof W == "object" &&
            W !== null &&
            typeof W.then == "function" &&
            W.then(Te, ce));
      } catch (ye) {
        ce(ye);
      } finally {
        (B !== null && K.types !== null && (B.types = K.types), (J.T = B));
      }
    }),
    (Se.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (Se.use = function (T) {
      return J.H.use(T);
    }),
    (Se.useActionState = function (T, B, K) {
      return J.H.useActionState(T, B, K);
    }),
    (Se.useCallback = function (T, B) {
      return J.H.useCallback(T, B);
    }),
    (Se.useContext = function (T) {
      return J.H.useContext(T);
    }),
    (Se.useDebugValue = function () {}),
    (Se.useDeferredValue = function (T, B) {
      return J.H.useDeferredValue(T, B);
    }),
    (Se.useEffect = function (T, B) {
      return J.H.useEffect(T, B);
    }),
    (Se.useEffectEvent = function (T) {
      return J.H.useEffectEvent(T);
    }),
    (Se.useId = function () {
      return J.H.useId();
    }),
    (Se.useImperativeHandle = function (T, B, K) {
      return J.H.useImperativeHandle(T, B, K);
    }),
    (Se.useInsertionEffect = function (T, B) {
      return J.H.useInsertionEffect(T, B);
    }),
    (Se.useLayoutEffect = function (T, B) {
      return J.H.useLayoutEffect(T, B);
    }),
    (Se.useMemo = function (T, B) {
      return J.H.useMemo(T, B);
    }),
    (Se.useOptimistic = function (T, B) {
      return J.H.useOptimistic(T, B);
    }),
    (Se.useReducer = function (T, B, K) {
      return J.H.useReducer(T, B, K);
    }),
    (Se.useRef = function (T) {
      return J.H.useRef(T);
    }),
    (Se.useState = function (T) {
      return J.H.useState(T);
    }),
    (Se.useSyncExternalStore = function (T, B, K) {
      return J.H.useSyncExternalStore(T, B, K);
    }),
    (Se.useTransition = function () {
      return J.H.useTransition();
    }),
    (Se.version = "19.2.8"),
    Se
  );
}
var s0;
function Jo() {
  return (s0 || ((s0 = 1), (bo.exports = Tg())), bo.exports);
}
var z = Jo(),
  Eo = { exports: {} },
  tr = {},
  So = { exports: {} },
  To = {};
var c0;
function Rg() {
  return (
    c0 ||
      ((c0 = 1),
      (function (a) {
        function l(w, X) {
          var re = w.length;
          w.push(X);
          e: for (; 0 < re;) {
            var ce = (re - 1) >>> 1,
              be = w[ce];
            if (0 < o(be, X)) ((w[ce] = X), (w[re] = be), (re = ce));
            else break e;
          }
        }
        function r(w) {
          return w.length === 0 ? null : w[0];
        }
        function s(w) {
          if (w.length === 0) return null;
          var X = w[0],
            re = w.pop();
          if (re !== X) {
            w[0] = re;
            e: for (var ce = 0, be = w.length, T = be >>> 1; ce < T;) {
              var B = 2 * (ce + 1) - 1,
                K = w[B],
                W = B + 1,
                fe = w[W];
              if (0 > o(K, re))
                W < be && 0 > o(fe, K)
                  ? ((w[ce] = fe), (w[W] = re), (ce = W))
                  : ((w[ce] = K), (w[B] = re), (ce = B));
              else if (W < be && 0 > o(fe, re))
                ((w[ce] = fe), (w[W] = re), (ce = W));
              else break e;
            }
          }
          return X;
        }
        function o(w, X) {
          var re = w.sortIndex - X.sortIndex;
          return re !== 0 ? re : w.id - X.id;
        }
        if (
          ((a.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var f = performance;
          a.unstable_now = function () {
            return f.now();
          };
        } else {
          var h = Date,
            p = h.now();
          a.unstable_now = function () {
            return h.now() - p;
          };
        }
        var v = [],
          y = [],
          g = 1,
          b = null,
          C = 3,
          O = !1,
          U = !1,
          V = !1,
          Z = !1,
          I = typeof setTimeout == "function" ? setTimeout : null,
          te = typeof clearTimeout == "function" ? clearTimeout : null,
          ne = typeof setImmediate < "u" ? setImmediate : null;
        function oe(w) {
          for (var X = r(y); X !== null;) {
            if (X.callback === null) s(y);
            else if (X.startTime <= w)
              (s(y), (X.sortIndex = X.expirationTime), l(v, X));
            else break;
            X = r(y);
          }
        }
        function se(w) {
          if (((V = !1), oe(w), !U))
            if (r(v) !== null) ((U = !0), Te || ((Te = !0), Oe()));
            else {
              var X = r(y);
              X !== null && Je(se, X.startTime - w);
            }
        }
        var Te = !1,
          J = -1,
          L = 5,
          Re = -1;
        function He() {
          return Z ? !0 : !(a.unstable_now() - Re < L);
        }
        function Xe() {
          if (((Z = !1), Te)) {
            var w = a.unstable_now();
            Re = w;
            var X = !0;
            try {
              e: {
                ((U = !1), V && ((V = !1), te(J), (J = -1)), (O = !0));
                var re = C;
                try {
                  t: {
                    for (
                      oe(w), b = r(v);
                      b !== null && !(b.expirationTime > w && He());
                    ) {
                      var ce = b.callback;
                      if (typeof ce == "function") {
                        ((b.callback = null), (C = b.priorityLevel));
                        var be = ce(b.expirationTime <= w);
                        if (((w = a.unstable_now()), typeof be == "function")) {
                          ((b.callback = be), oe(w), (X = !0));
                          break t;
                        }
                        (b === r(v) && s(v), oe(w));
                      } else s(v);
                      b = r(v);
                    }
                    if (b !== null) X = !0;
                    else {
                      var T = r(y);
                      (T !== null && Je(se, T.startTime - w), (X = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (C = re), (O = !1));
                }
                X = void 0;
              }
            } finally {
              X ? Oe() : (Te = !1);
            }
          }
        }
        var Oe;
        if (typeof ne == "function")
          Oe = function () {
            ne(Xe);
          };
        else if (typeof MessageChannel < "u") {
          var Be = new MessageChannel(),
            rt = Be.port2;
          ((Be.port1.onmessage = Xe),
            (Oe = function () {
              rt.postMessage(null);
            }));
        } else
          Oe = function () {
            I(Xe, 0);
          };
        function Je(w, X) {
          J = I(function () {
            w(a.unstable_now());
          }, X);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (w) {
            w.callback = null;
          }),
          (a.unstable_forceFrameRate = function (w) {
            0 > w || 125 < w
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (L = 0 < w ? Math.floor(1e3 / w) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return C;
          }),
          (a.unstable_next = function (w) {
            switch (C) {
              case 1:
              case 2:
              case 3:
                var X = 3;
                break;
              default:
                X = C;
            }
            var re = C;
            C = X;
            try {
              return w();
            } finally {
              C = re;
            }
          }),
          (a.unstable_requestPaint = function () {
            Z = !0;
          }),
          (a.unstable_runWithPriority = function (w, X) {
            switch (w) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                w = 3;
            }
            var re = C;
            C = w;
            try {
              return X();
            } finally {
              C = re;
            }
          }),
          (a.unstable_scheduleCallback = function (w, X, re) {
            var ce = a.unstable_now();
            switch (
              (typeof re == "object" && re !== null
                ? ((re = re.delay),
                  (re = typeof re == "number" && 0 < re ? ce + re : ce))
                : (re = ce),
              w)
            ) {
              case 1:
                var be = -1;
                break;
              case 2:
                be = 250;
                break;
              case 5:
                be = 1073741823;
                break;
              case 4:
                be = 1e4;
                break;
              default:
                be = 5e3;
            }
            return (
              (be = re + be),
              (w = {
                id: g++,
                callback: X,
                priorityLevel: w,
                startTime: re,
                expirationTime: be,
                sortIndex: -1
              }),
              re > ce
                ? ((w.sortIndex = re),
                  l(y, w),
                  r(v) === null &&
                    w === r(y) &&
                    (V ? (te(J), (J = -1)) : (V = !0), Je(se, re - ce)))
                : ((w.sortIndex = be),
                  l(v, w),
                  U || O || ((U = !0), Te || ((Te = !0), Oe()))),
              w
            );
          }),
          (a.unstable_shouldYield = He),
          (a.unstable_wrapCallback = function (w) {
            var X = C;
            return function () {
              var re = C;
              C = X;
              try {
                return w.apply(this, arguments);
              } finally {
                C = re;
              }
            };
          }));
      })(To)),
    To
  );
}
var o0;
function Ag() {
  return (o0 || ((o0 = 1), (So.exports = Rg())), So.exports);
}
var Ro = { exports: {} },
  xt = {};
var f0;
function Ng() {
  if (f0) return xt;
  f0 = 1;
  var a = Jo();
  function l(v) {
    var y = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        y += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var s = {
      d: {
        f: r,
        r: function () {
          throw Error(l(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r
      },
      p: 0,
      findDOMNode: null
    },
    o = Symbol.for("react.portal");
  function f(v, y, g) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : "" + b,
      children: v,
      containerInfo: y,
      implementation: g
    };
  }
  var h = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(v, y) {
    if (v === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return (
    (xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (xt.createPortal = function (v, y) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(l(299));
      return f(v, y, null, g);
    }),
    (xt.flushSync = function (v) {
      var y = h.T,
        g = s.p;
      try {
        if (((h.T = null), (s.p = 2), v)) return v();
      } finally {
        ((h.T = y), (s.p = g), s.d.f());
      }
    }),
    (xt.preconnect = function (v, y) {
      typeof v == "string" &&
        (y
          ? ((y = y.crossOrigin),
            (y =
              typeof y == "string"
                ? y === "use-credentials"
                  ? y
                  : ""
                : void 0))
          : (y = null),
        s.d.C(v, y));
    }),
    (xt.prefetchDNS = function (v) {
      typeof v == "string" && s.d.D(v);
    }),
    (xt.preinit = function (v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var g = y.as,
          b = p(g, y.crossOrigin),
          C = typeof y.integrity == "string" ? y.integrity : void 0,
          O = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        g === "style"
          ? s.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: C,
              fetchPriority: O
            })
          : g === "script" &&
            s.d.X(v, {
              crossOrigin: b,
              integrity: C,
              fetchPriority: O,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0
            });
      }
    }),
    (xt.preinitModule = function (v, y) {
      if (typeof v == "string")
        if (typeof y == "object" && y !== null) {
          if (y.as == null || y.as === "script") {
            var g = p(y.as, y.crossOrigin);
            s.d.M(v, {
              crossOrigin: g,
              integrity: typeof y.integrity == "string" ? y.integrity : void 0,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0
            });
          }
        } else y == null && s.d.M(v);
    }),
    (xt.preload = function (v, y) {
      if (
        typeof v == "string" &&
        typeof y == "object" &&
        y !== null &&
        typeof y.as == "string"
      ) {
        var g = y.as,
          b = p(g, y.crossOrigin);
        s.d.L(v, g, {
          crossOrigin: b,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority:
            typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy:
            typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet:
            typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0
        });
      }
    }),
    (xt.preloadModule = function (v, y) {
      if (typeof v == "string")
        if (y) {
          var g = p(y.as, y.crossOrigin);
          s.d.m(v, {
            as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
            crossOrigin: g,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0
          });
        } else s.d.m(v);
    }),
    (xt.requestFormReset = function (v) {
      s.d.r(v);
    }),
    (xt.unstable_batchedUpdates = function (v, y) {
      return v(y);
    }),
    (xt.useFormState = function (v, y, g) {
      return h.H.useFormState(v, y, g);
    }),
    (xt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (xt.version = "19.2.8"),
    xt
  );
}
var d0;
function Cg() {
  if (d0) return Ro.exports;
  d0 = 1;
  function a() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (Ro.exports = Ng()), Ro.exports);
}
var h0;
function Og() {
  if (h0) return tr;
  h0 = 1;
  var a = Ag(),
    l = Jo(),
    r = Cg();
  function s(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function o(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function f(e) {
    var t = e,
      n = e;
    if (e.alternate) for (; t.return;) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function h(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function v(e) {
    if (f(e) !== e) throw Error(s(188));
  }
  function y(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ;) {
      var u = n.return;
      if (u === null) break;
      var c = u.alternate;
      if (c === null) {
        if (((i = u.return), i !== null)) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === c.child) {
        for (c = u.child; c;) {
          if (c === n) return (v(u), e);
          if (c === i) return (v(u), t);
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== i.return) ((n = u), (i = c));
      else {
        for (var d = !1, m = u.child; m;) {
          if (m === n) {
            ((d = !0), (n = u), (i = c));
            break;
          }
          if (m === i) {
            ((d = !0), (i = u), (n = c));
            break;
          }
          m = m.sibling;
        }
        if (!d) {
          for (m = c.child; m;) {
            if (m === n) {
              ((d = !0), (n = c), (i = u));
              break;
            }
            if (m === i) {
              ((d = !0), (i = c), (n = u));
              break;
            }
            m = m.sibling;
          }
          if (!d) throw Error(s(189));
        }
      }
      if (n.alternate !== i) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
    return n.stateNode.current === n ? e : t;
  }
  function g(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null;) {
      if (((t = g(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    C = Symbol.for("react.element"),
    O = Symbol.for("react.transitional.element"),
    U = Symbol.for("react.portal"),
    V = Symbol.for("react.fragment"),
    Z = Symbol.for("react.strict_mode"),
    I = Symbol.for("react.profiler"),
    te = Symbol.for("react.consumer"),
    ne = Symbol.for("react.context"),
    oe = Symbol.for("react.forward_ref"),
    se = Symbol.for("react.suspense"),
    Te = Symbol.for("react.suspense_list"),
    J = Symbol.for("react.memo"),
    L = Symbol.for("react.lazy"),
    Re = Symbol.for("react.activity"),
    He = Symbol.for("react.memo_cache_sentinel"),
    Xe = Symbol.iterator;
  function Oe(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Xe && e[Xe]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Be = Symbol.for("react.client.reference");
  function rt(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Be ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case V:
        return "Fragment";
      case I:
        return "Profiler";
      case Z:
        return "StrictMode";
      case se:
        return "Suspense";
      case Te:
        return "SuspenseList";
      case Re:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case U:
          return "Portal";
        case ne:
          return e.displayName || "Context";
        case te:
          return (e._context.displayName || "Context") + ".Consumer";
        case oe:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case J:
          return (
            (t = e.displayName || null),
            t !== null ? t : rt(e.type) || "Memo"
          );
        case L:
          ((t = e._payload), (e = e._init));
          try {
            return rt(e(t));
          } catch {}
      }
    return null;
  }
  var Je = Array.isArray,
    w = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    re = { pending: !1, data: null, method: null, action: null },
    ce = [],
    be = -1;
  function T(e) {
    return { current: e };
  }
  function B(e) {
    0 > be || ((e.current = ce[be]), (ce[be] = null), be--);
  }
  function K(e, t) {
    (be++, (ce[be] = e.current), (e.current = t));
  }
  var W = T(null),
    fe = T(null),
    ye = T(null),
    _e = T(null);
  function dt(e, t) {
    switch ((K(ye, t), K(fe, e), K(W, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Dm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Dm(t)), (e = _m(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (B(W), K(W, e));
  }
  function Pe() {
    (B(W), B(fe), B(ye));
  }
  function Ya(e) {
    e.memoizedState !== null && K(_e, e);
    var t = W.current,
      n = _m(t, e.type);
    t !== n && (K(fe, e), K(W, n));
  }
  function hl(e) {
    (fe.current === e && (B(W), B(fe)),
      _e.current === e && (B(_e), ($i._currentValue = re)));
  }
  var ui, gt;
  function Ht(e) {
    if (ui === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((ui = (t && t[1]) || ""),
          (gt =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      ui +
      e +
      gt
    );
  }
  var ml = !1;
  function si(e, t) {
    if (!e || ml) return "";
    ml = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(q.prototype, "props", {
                  set: function () {
                    throw Error();
                  }
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(q, []);
                } catch (j) {
                  var M = j;
                }
                Reflect.construct(e, [], q);
              } else {
                try {
                  q.call();
                } catch (j) {
                  M = j;
                }
                e.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                M = j;
              }
              (q = e()) &&
                typeof q.catch == "function" &&
                q.catch(function () {});
            }
          } catch (j) {
            if (j && M && typeof j.stack == "string") return [j.stack, M.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      u &&
        u.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
      var c = i.DetermineComponentFrameRoot(),
        d = c[0],
        m = c[1];
      if (d && m) {
        var E = d.split(`
`),
          x = m.split(`
`);
        for (
          u = i = 0;
          i < E.length && !E[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; u < x.length && !x[u].includes("DetermineComponentFrameRoot");)
          u++;
        if (i === E.length || u === x.length)
          for (
            i = E.length - 1, u = x.length - 1;
            1 <= i && 0 <= u && E[i] !== x[u];
          )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (E[i] !== x[u]) {
            if (i !== 1 || u !== 1)
              do
                if ((i--, u--, 0 > u || E[i] !== x[u])) {
                  var H =
                    `
` + E[i].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      H.includes("<anonymous>") &&
                      (H = H.replace("<anonymous>", e.displayName)),
                    H
                  );
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      ((ml = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : "") ? Ht(n) : "";
  }
  function Ln(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Ht(e.type);
      case 16:
        return Ht("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Ht("Suspense Fallback")
          : Ht("Suspense");
      case 19:
        return Ht("SuspenseList");
      case 0:
      case 15:
        return si(e.type, !1);
      case 11:
        return si(e.type.render, !1);
      case 1:
        return si(e.type, !0);
      case 31:
        return Ht("Activity");
      default:
        return "";
    }
  }
  function Ar(e) {
    try {
      var t = "",
        n = null;
      do ((t += Ln(e, n)), (n = e), (e = e.return));
      while (e);
      return t;
    } catch (i) {
      return (
        `
Error generating stack: ` +
        i.message +
        `
` +
        i.stack
      );
    }
  }
  var ci = Object.prototype.hasOwnProperty,
    yl = a.unstable_scheduleCallback,
    oi = a.unstable_cancelCallback,
    is = a.unstable_shouldYield,
    rs = a.unstable_requestPaint,
    Mt = a.unstable_now,
    jn = a.unstable_getCurrentPriorityLevel,
    fa = a.unstable_ImmediatePriority,
    fi = a.unstable_UserBlockingPriority,
    da = a.unstable_NormalPriority,
    mn = a.unstable_LowPriority,
    Pt = a.unstable_IdlePriority,
    us = a.log,
    ss = a.unstable_setDisableYieldValue,
    Hn = null,
    zt = null;
  function St(e) {
    if (
      (typeof us == "function" && ss(e),
      zt && typeof zt.setStrictMode == "function")
    )
      try {
        zt.setStrictMode(Hn, e);
      } catch {}
  }
  var _t = Math.clz32 ? Math.clz32 : cs,
    Nr = Math.log,
    Cr = Math.LN2;
  function cs(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Nr(e) / Cr) | 0)) | 0);
  }
  var Va = 256,
    Bn = 262144,
    Ga = 4194304;
  function yn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function pl(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var u = 0,
      c = e.suspendedLanes,
      d = e.pingedLanes;
    e = e.warmLanes;
    var m = i & 134217727;
    return (
      m !== 0
        ? ((i = m & ~c),
          i !== 0
            ? (u = yn(i))
            : ((d &= m),
              d !== 0
                ? (u = yn(d))
                : n || ((n = m & ~e), n !== 0 && (u = yn(n)))))
        : ((m = i & ~c),
          m !== 0
            ? (u = yn(m))
            : d !== 0
              ? (u = yn(d))
              : n || ((n = i & ~e), n !== 0 && (u = yn(n)))),
      u === 0
        ? 0
        : t !== 0 &&
            t !== u &&
            (t & c) === 0 &&
            ((c = u & -u),
            (n = t & -t),
            c >= n || (c === 32 && (n & 4194048) !== 0))
          ? t
          : u
    );
  }
  function ha(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function os(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function di() {
    var e = Ga;
    return ((Ga <<= 1), (Ga & 62914560) === 0 && (Ga = 4194304), e);
  }
  function ma(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function An(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function Or(e, t, n, i, u, c) {
    var d = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var m = e.entanglements,
      E = e.expirationTimes,
      x = e.hiddenUpdates;
    for (n = d & ~n; 0 < n;) {
      var H = 31 - _t(n),
        q = 1 << H;
      ((m[H] = 0), (E[H] = -1));
      var M = x[H];
      if (M !== null)
        for (x[H] = null, H = 0; H < M.length; H++) {
          var j = M[H];
          j !== null && (j.lane &= -536870913);
        }
      n &= ~q;
    }
    (i !== 0 && Dr(e, i, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(d & ~t)));
  }
  function Dr(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var i = 31 - _t(t);
    ((e.entangledLanes |= t),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (n & 261930)));
  }
  function _r(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n;) {
      var i = 31 - _t(n),
        u = 1 << i;
      ((u & t) | (e[i] & t) && (e[i] |= t), (n &= ~u));
    }
  }
  function S(e, t) {
    var n = t & -t;
    return (
      (n = (n & 42) !== 0 ? 1 : A(n)),
      (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    );
  }
  function A(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function D(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function G() {
    var e = X.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : Wm(e.type));
  }
  function Q(e, t) {
    var n = X.p;
    try {
      return ((X.p = e), t());
    } finally {
      X.p = n;
    }
  }
  var ae = Math.random().toString(36).slice(2),
    ee = "__reactFiber$" + ae,
    $ = "__reactProps$" + ae,
    P = "__reactContainer$" + ae,
    ve = "__reactEvents$" + ae,
    he = "__reactListeners$" + ae,
    me = "__reactHandles$" + ae,
    xe = "__reactResources$" + ae,
    Ze = "__reactMarker$" + ae;
  function ke(e) {
    (delete e[ee], delete e[$], delete e[ve], delete e[he], delete e[me]);
  }
  function tt(e) {
    var t = e[ee];
    if (t) return t;
    for (var n = e.parentNode; n;) {
      if ((t = n[P] || n[ee])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = jm(e); e !== null;) {
            if ((n = e[ee])) return n;
            e = jm(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function Ae(e) {
    if ((e = e[ee] || e[P])) {
      var t = e.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return e;
    }
    return null;
  }
  function Ut(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function ut(e) {
    var t = e[xe];
    return (
      t ||
        (t = e[xe] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Ve(e) {
    e[Ze] = !0;
  }
  var pn = new Set(),
    kn = {};
  function en(e, t) {
    (bt(e, t), bt(e + "Capture", t));
  }
  function bt(e, t) {
    for (kn[e] = t, e = 0; e < t.length; e++) pn.add(t[e]);
  }
  var ya = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    qn = {},
    Yn = {};
  function vl(e) {
    return ci.call(Yn, e)
      ? !0
      : ci.call(qn, e)
        ? !1
        : ya.test(e)
          ? (Yn[e] = !0)
          : ((qn[e] = !0), !1);
  }
  function Vn(e, t, n) {
    if (vl(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Gn(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function Ee(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + i);
    }
  }
  function Ge(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function tn(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function pa(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var u = i.get,
        c = i.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return u.call(this);
          },
          set: function (d) {
            ((n = "" + d), c.call(this, d));
          }
        }),
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (d) {
            n = "" + d;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          }
        }
      );
    }
  }
  function Qa(e) {
    if (!e._valueTracker) {
      var t = tn(e) ? "checked" : "value";
      e._valueTracker = pa(e, t, "" + e[t]);
    }
  }
  function nt(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
      i = "";
    return (
      e && (i = tn(e) ? (e.checked ? "true" : "false") : e.value),
      (e = i),
      e !== n ? (t.setValue(e), !0) : !1
    );
  }
  function nn(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var xr = /[\n"\\]/g;
  function Bt(e) {
    return e.replace(xr, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function fs(e, t, n, i, u, c, d, m) {
    ((e.name = ""),
      d != null &&
      typeof d != "function" &&
      typeof d != "symbol" &&
      typeof d != "boolean"
        ? (e.type = d)
        : e.removeAttribute("type"),
      t != null
        ? d === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Ge(t))
          : e.value !== "" + Ge(t) && (e.value = "" + Ge(t))
        : (d !== "submit" && d !== "reset") || e.removeAttribute("value"),
      t != null
        ? ds(e, d, Ge(t))
        : n != null
          ? ds(e, d, Ge(n))
          : i != null && e.removeAttribute("value"),
      u == null && c != null && (e.defaultChecked = !!c),
      u != null &&
        (e.checked = u && typeof u != "function" && typeof u != "symbol"),
      m != null &&
      typeof m != "function" &&
      typeof m != "symbol" &&
      typeof m != "boolean"
        ? (e.name = "" + Ge(m))
        : e.removeAttribute("name"));
  }
  function Tf(e, t, n, i, u, c, d, m) {
    if (
      (c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.type = c),
      t != null || n != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || t != null)) {
        Qa(e);
        return;
      }
      ((n = n != null ? "" + Ge(n) : ""),
        (t = t != null ? "" + Ge(t) : n),
        m || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((i = i ?? u),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (e.checked = m ? e.checked : !!i),
      (e.defaultChecked = !!i),
      d != null &&
        typeof d != "function" &&
        typeof d != "symbol" &&
        typeof d != "boolean" &&
        (e.name = d),
      Qa(e));
  }
  function ds(e, t, n) {
    (t === "number" && nn(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function gl(e, t, n, i) {
    if (((e = e.options), t)) {
      t = {};
      for (var u = 0; u < n.length; u++) t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        ((u = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== u && (e[n].selected = u),
          u && i && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + Ge(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          ((e[u].selected = !0), i && (e[u].defaultSelected = !0));
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rf(e, t, n) {
    if (
      t != null &&
      ((t = "" + Ge(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ge(n) : "";
  }
  function Af(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(s(92));
        if (Je(i)) {
          if (1 < i.length) throw Error(s(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (t = n));
    }
    ((n = Ge(t)),
      (e.defaultValue = n),
      (i = e.textContent),
      i === n && i !== "" && i !== null && (e.value = i),
      Qa(e));
  }
  function bl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var yp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Nf(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : i
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || yp.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function Cf(e, t, n) {
    if (t != null && typeof t != "object") throw Error(s(62));
    if (((e = e.style), n != null)) {
      for (var i in n)
        !n.hasOwnProperty(i) ||
          (t != null && t.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? e.setProperty(i, "")
            : i === "float"
              ? (e.cssFloat = "")
              : (e[i] = ""));
      for (var u in t)
        ((i = t[u]), t.hasOwnProperty(u) && n[u] !== i && Nf(e, u, i));
    } else for (var c in t) t.hasOwnProperty(c) && Nf(e, c, t[c]);
  }
  function hs(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var pp = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]),
    vp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function wr(e) {
    return vp.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Qn() {}
  var ms = null;
  function ys(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var El = null,
    Sl = null;
  function Of(e) {
    var t = Ae(e);
    if (t && (e = t.stateNode)) {
      var n = e[$] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (fs(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (t = n.name),
            n.type === "radio" && t != null)
          ) {
            for (n = e; n.parentNode;) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + Bt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var u = i[$] || null;
                if (!u) throw Error(s(90));
                fs(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              ((i = n[t]), i.form === e.form && nt(i));
          }
          break e;
        case "textarea":
          Rf(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && gl(e, !!n.multiple, t, !1));
      }
    }
  }
  var ps = !1;
  function Df(e, t, n) {
    if (ps) return e(t, n);
    ps = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (
        ((ps = !1),
        (El !== null || Sl !== null) &&
          (gu(), El && ((t = El), (e = Sl), (Sl = El = null), Of(t), e)))
      )
        for (t = 0; t < e.length; t++) Of(e[t]);
    }
  }
  function hi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[$] || null;
    if (i === null) return null;
    n = i[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((i = !i.disabled) ||
          ((e = e.type),
          (i = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !i));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(s(231, t, typeof n));
    return n;
  }
  var Xn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    vs = !1;
  if (Xn)
    try {
      var mi = {};
      (Object.defineProperty(mi, "passive", {
        get: function () {
          vs = !0;
        }
      }),
        window.addEventListener("test", mi, mi),
        window.removeEventListener("test", mi, mi));
    } catch {
      vs = !1;
    }
  var va = null,
    gs = null,
    Mr = null;
  function _f() {
    if (Mr) return Mr;
    var e,
      t = gs,
      n = t.length,
      i,
      u = "value" in va ? va.value : va.textContent,
      c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++);
    var d = n - e;
    for (i = 1; i <= d && t[n - i] === u[c - i]; i++);
    return (Mr = u.slice(e, 1 < i ? 1 - i : void 0));
  }
  function zr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Ur() {
    return !0;
  }
  function xf() {
    return !1;
  }
  function kt(e) {
    function t(n, i, u, c, d) {
      ((this._reactName = n),
        (this._targetInst = u),
        (this.type = i),
        (this.nativeEvent = c),
        (this.target = d),
        (this.currentTarget = null));
      for (var m in e)
        e.hasOwnProperty(m) && ((n = e[m]), (this[m] = n ? n(c) : c[m]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? Ur
          : xf),
        (this.isPropagationStopped = xf),
        this
      );
    }
    return (
      b(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = Ur));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = Ur));
        },
        persist: function () {},
        isPersistent: Ur
      }),
      t
    );
  }
  var Xa = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    Lr = kt(Xa),
    yi = b({}, Xa, { view: 0, detail: 0 }),
    gp = kt(yi),
    bs,
    Es,
    pi,
    jr = b({}, yi, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Ts,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== pi &&
              (pi && e.type === "mousemove"
                ? ((bs = e.screenX - pi.screenX), (Es = e.screenY - pi.screenY))
                : (Es = bs = 0),
              (pi = e)),
            bs);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Es;
      }
    }),
    wf = kt(jr),
    bp = b({}, jr, { dataTransfer: 0 }),
    Ep = kt(bp),
    Sp = b({}, yi, { relatedTarget: 0 }),
    Ss = kt(Sp),
    Tp = b({}, Xa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Rp = kt(Tp),
    Ap = b({}, Xa, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }),
    Np = kt(Ap),
    Cp = b({}, Xa, { data: 0 }),
    Mf = kt(Cp),
    Op = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    },
    Dp = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    },
    _p = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
  function xp(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = _p[e])
        ? !!t[e]
        : !1;
  }
  function Ts() {
    return xp;
  }
  var wp = b({}, yi, {
      key: function (e) {
        if (e.key) {
          var t = Op[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = zr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Dp[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Ts,
      charCode: function (e) {
        return e.type === "keypress" ? zr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? zr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      }
    }),
    Mp = kt(wp),
    zp = b({}, jr, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }),
    zf = kt(zp),
    Up = b({}, yi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ts
    }),
    Lp = kt(Up),
    jp = b({}, Xa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Hp = kt(jp),
    Bp = b({}, jr, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }),
    kp = kt(Bp),
    qp = b({}, Xa, { newState: 0, oldState: 0 }),
    Yp = kt(qp),
    Vp = [9, 13, 27, 32],
    Rs = Xn && "CompositionEvent" in window,
    vi = null;
  Xn && "documentMode" in document && (vi = document.documentMode);
  var Gp = Xn && "TextEvent" in window && !vi,
    Uf = Xn && (!Rs || (vi && 8 < vi && 11 >= vi)),
    Lf = " ",
    jf = !1;
  function Hf(e, t) {
    switch (e) {
      case "keyup":
        return Vp.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Bf(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Tl = !1;
  function Qp(e, t) {
    switch (e) {
      case "compositionend":
        return Bf(t);
      case "keypress":
        return t.which !== 32 ? null : ((jf = !0), Lf);
      case "textInput":
        return ((e = t.data), e === Lf && jf ? null : e);
      default:
        return null;
    }
  }
  function Xp(e, t) {
    if (Tl)
      return e === "compositionend" || (!Rs && Hf(e, t))
        ? ((e = _f()), (Mr = gs = va = null), (Tl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Uf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Zp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function kf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Zp[e.type] : t === "textarea";
  }
  function qf(e, t, n, i) {
    (El ? (Sl ? Sl.push(i) : (Sl = [i])) : (El = i),
      (t = Nu(t, "onChange")),
      0 < t.length &&
        ((n = new Lr("onChange", "change", null, n, i)),
        e.push({ event: n, listeners: t })));
  }
  var gi = null,
    bi = null;
  function Fp(e) {
    Tm(e, 0);
  }
  function Hr(e) {
    var t = Ut(e);
    if (nt(t)) return e;
  }
  function Yf(e, t) {
    if (e === "change") return t;
  }
  var Vf = !1;
  if (Xn) {
    var As;
    if (Xn) {
      var Ns = "oninput" in document;
      if (!Ns) {
        var Gf = document.createElement("div");
        (Gf.setAttribute("oninput", "return;"),
          (Ns = typeof Gf.oninput == "function"));
      }
      As = Ns;
    } else As = !1;
    Vf = As && (!document.documentMode || 9 < document.documentMode);
  }
  function Qf() {
    gi && (gi.detachEvent("onpropertychange", Xf), (bi = gi = null));
  }
  function Xf(e) {
    if (e.propertyName === "value" && Hr(bi)) {
      var t = [];
      (qf(t, bi, e, ys(e)), Df(Fp, t));
    }
  }
  function Kp(e, t, n) {
    e === "focusin"
      ? (Qf(), (gi = t), (bi = n), gi.attachEvent("onpropertychange", Xf))
      : e === "focusout" && Qf();
  }
  function Jp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Hr(bi);
  }
  function $p(e, t) {
    if (e === "click") return Hr(t);
  }
  function Ip(e, t) {
    if (e === "input" || e === "change") return Hr(t);
  }
  function Wp(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Xt = typeof Object.is == "function" ? Object.is : Wp;
  function Ei(e, t) {
    if (Xt(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var n = Object.keys(e),
      i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!ci.call(t, u) || !Xt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Zf(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Ff(e, t) {
    var n = Zf(e);
    e = 0;
    for (var i; n;) {
      if (n.nodeType === 3) {
        if (((i = e + n.textContent.length), e <= t && i >= t))
          return { node: n, offset: t - e };
        e = i;
      }
      e: {
        for (; n;) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Zf(n);
    }
  }
  function Kf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Kf(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Jf(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = nn(e.document); t instanceof e.HTMLIFrameElement;) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = nn(e.document);
    }
    return t;
  }
  function Cs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Pp = Xn && "documentMode" in document && 11 >= document.documentMode,
    Rl = null,
    Os = null,
    Si = null,
    Ds = !1;
  function $f(e, t, n) {
    var i =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ds ||
      Rl == null ||
      Rl !== nn(i) ||
      ((i = Rl),
      "selectionStart" in i && Cs(i)
        ? (i = { start: i.selectionStart, end: i.selectionEnd })
        : ((i = (
            (i.ownerDocument && i.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (i = {
            anchorNode: i.anchorNode,
            anchorOffset: i.anchorOffset,
            focusNode: i.focusNode,
            focusOffset: i.focusOffset
          })),
      (Si && Ei(Si, i)) ||
        ((Si = i),
        (i = Nu(Os, "onSelect")),
        0 < i.length &&
          ((t = new Lr("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: i }),
          (t.target = Rl))));
  }
  function Za(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Al = {
      animationend: Za("Animation", "AnimationEnd"),
      animationiteration: Za("Animation", "AnimationIteration"),
      animationstart: Za("Animation", "AnimationStart"),
      transitionrun: Za("Transition", "TransitionRun"),
      transitionstart: Za("Transition", "TransitionStart"),
      transitioncancel: Za("Transition", "TransitionCancel"),
      transitionend: Za("Transition", "TransitionEnd")
    },
    _s = {},
    If = {};
  Xn &&
    ((If = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Al.animationend.animation,
      delete Al.animationiteration.animation,
      delete Al.animationstart.animation),
    "TransitionEvent" in window || delete Al.transitionend.transition);
  function Fa(e) {
    if (_s[e]) return _s[e];
    if (!Al[e]) return e;
    var t = Al[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in If) return (_s[e] = t[n]);
    return e;
  }
  var Wf = Fa("animationend"),
    Pf = Fa("animationiteration"),
    ed = Fa("animationstart"),
    ev = Fa("transitionrun"),
    tv = Fa("transitionstart"),
    nv = Fa("transitioncancel"),
    td = Fa("transitionend"),
    nd = new Map(),
    xs =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  xs.push("scrollEnd");
  function vn(e, t) {
    (nd.set(e, t), en(t, [e]));
  }
  var Br =
      typeof reportError == "function"
        ? reportError
        : function (e) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof e == "object" &&
                  e !== null &&
                  typeof e.message == "string"
                    ? String(e.message)
                    : String(e),
                error: e
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", e);
              return;
            }
            console.error(e);
          },
    an = [],
    Nl = 0,
    ws = 0;
  function kr() {
    for (var e = Nl, t = (ws = Nl = 0); t < e;) {
      var n = an[t];
      an[t++] = null;
      var i = an[t];
      an[t++] = null;
      var u = an[t];
      an[t++] = null;
      var c = an[t];
      if (((an[t++] = null), i !== null && u !== null)) {
        var d = i.pending;
        (d === null ? (u.next = u) : ((u.next = d.next), (d.next = u)),
          (i.pending = u));
      }
      c !== 0 && ad(n, u, c);
    }
  }
  function qr(e, t, n, i) {
    ((an[Nl++] = e),
      (an[Nl++] = t),
      (an[Nl++] = n),
      (an[Nl++] = i),
      (ws |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function Ms(e, t, n, i) {
    return (qr(e, t, n, i), Yr(e));
  }
  function Ka(e, t) {
    return (qr(e, null, null, t), Yr(e));
  }
  function ad(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var u = !1, c = e.return; c !== null;)
      ((c.childLanes |= n),
        (i = c.alternate),
        i !== null && (i.childLanes |= n),
        c.tag === 22 &&
          ((e = c.stateNode), e === null || e._visibility & 1 || (u = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        u &&
          t !== null &&
          ((u = 31 - _t(n)),
          (e = c.hiddenUpdates),
          (i = e[u]),
          i === null ? (e[u] = [t]) : i.push(t),
          (t.lane = n | 536870912)),
        c)
      : null;
  }
  function Yr(e) {
    if (50 < Gi) throw ((Gi = 0), (Yc = null), Error(s(185)));
    for (var t = e.return; t !== null;) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Cl = {};
  function av(e, t, n, i) {
    ((this.tag = e),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = i),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function Zt(e, t, n, i) {
    return new av(e, t, n, i);
  }
  function zs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Zn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Zt(e.tag, t, e.key, e.mode)),
          (n.elementType = e.elementType),
          (n.type = e.type),
          (n.stateNode = e.stateNode),
          (n.alternate = e),
          (e.alternate = n))
        : ((n.pendingProps = t),
          (n.type = e.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = e.flags & 65011712),
      (n.childLanes = e.childLanes),
      (n.lanes = e.lanes),
      (n.child = e.child),
      (n.memoizedProps = e.memoizedProps),
      (n.memoizedState = e.memoizedState),
      (n.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (n.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (n.sibling = e.sibling),
      (n.index = e.index),
      (n.ref = e.ref),
      (n.refCleanup = e.refCleanup),
      n
    );
  }
  function ld(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return (
      n === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = n.childLanes),
          (e.lanes = n.lanes),
          (e.child = n.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = n.memoizedProps),
          (e.memoizedState = n.memoizedState),
          (e.updateQueue = n.updateQueue),
          (e.type = n.type),
          (t = n.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function Vr(e, t, n, i, u, c) {
    var d = 0;
    if (((i = e), typeof e == "function")) zs(e) && (d = 1);
    else if (typeof e == "string")
      d = sg(e, n, W.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case Re:
          return (
            (e = Zt(31, n, t, u)),
            (e.elementType = Re),
            (e.lanes = c),
            e
          );
        case V:
          return Ja(n.children, u, c, t);
        case Z:
          ((d = 8), (u |= 24));
          break;
        case I:
          return (
            (e = Zt(12, n, t, u | 2)),
            (e.elementType = I),
            (e.lanes = c),
            e
          );
        case se:
          return (
            (e = Zt(13, n, t, u)),
            (e.elementType = se),
            (e.lanes = c),
            e
          );
        case Te:
          return (
            (e = Zt(19, n, t, u)),
            (e.elementType = Te),
            (e.lanes = c),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ne:
                d = 10;
                break e;
              case te:
                d = 9;
                break e;
              case oe:
                d = 11;
                break e;
              case J:
                d = 14;
                break e;
              case L:
                ((d = 16), (i = null));
                break e;
            }
          ((d = 29),
            (n = Error(s(130, e === null ? "null" : typeof e, ""))),
            (i = null));
      }
    return (
      (t = Zt(d, n, t, u)),
      (t.elementType = e),
      (t.type = i),
      (t.lanes = c),
      t
    );
  }
  function Ja(e, t, n, i) {
    return ((e = Zt(7, e, i, t)), (e.lanes = n), e);
  }
  function Us(e, t, n) {
    return ((e = Zt(6, e, null, t)), (e.lanes = n), e);
  }
  function id(e) {
    var t = Zt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Ls(e, t, n) {
    return (
      (t = Zt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }),
      t
    );
  }
  var rd = new WeakMap();
  function ln(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = rd.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Ar(t) }), rd.set(e, t), t);
    }
    return { value: e, source: t, stack: Ar(t) };
  }
  var Ol = [],
    Dl = 0,
    Gr = null,
    Ti = 0,
    rn = [],
    un = 0,
    ga = null,
    Nn = 1,
    Cn = "";
  function Fn(e, t) {
    ((Ol[Dl++] = Ti), (Ol[Dl++] = Gr), (Gr = e), (Ti = t));
  }
  function ud(e, t, n) {
    ((rn[un++] = Nn), (rn[un++] = Cn), (rn[un++] = ga), (ga = e));
    var i = Nn;
    e = Cn;
    var u = 32 - _t(i) - 1;
    ((i &= ~(1 << u)), (n += 1));
    var c = 32 - _t(t) + u;
    if (30 < c) {
      var d = u - (u % 5);
      ((c = (i & ((1 << d) - 1)).toString(32)),
        (i >>= d),
        (u -= d),
        (Nn = (1 << (32 - _t(t) + u)) | (n << u) | i),
        (Cn = c + e));
    } else ((Nn = (1 << c) | (n << u) | i), (Cn = e));
  }
  function js(e) {
    e.return !== null && (Fn(e, 1), ud(e, 1, 0));
  }
  function Hs(e) {
    for (; e === Gr;)
      ((Gr = Ol[--Dl]), (Ol[Dl] = null), (Ti = Ol[--Dl]), (Ol[Dl] = null));
    for (; e === ga;)
      ((ga = rn[--un]),
        (rn[un] = null),
        (Cn = rn[--un]),
        (rn[un] = null),
        (Nn = rn[--un]),
        (rn[un] = null));
  }
  function sd(e, t) {
    ((rn[un++] = Nn),
      (rn[un++] = Cn),
      (rn[un++] = ga),
      (Nn = t.id),
      (Cn = t.overflow),
      (ga = e));
  }
  var Nt = null,
    at = null,
    je = !1,
    ba = null,
    sn = !1,
    Bs = Error(s(519));
  function Ea(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Ri(ln(t, e)), Bs);
  }
  function cd(e) {
    var t = e.stateNode,
      n = e.type,
      i = e.memoizedProps;
    switch (((t[ee] = e), (t[$] = i), n)) {
      case "dialog":
        (Me("cancel", t), Me("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Me("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Xi.length; n++) Me(Xi[n], t);
        break;
      case "source":
        Me("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Me("error", t), Me("load", t));
        break;
      case "details":
        Me("toggle", t);
        break;
      case "input":
        (Me("invalid", t),
          Tf(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ));
        break;
      case "select":
        Me("invalid", t);
        break;
      case "textarea":
        (Me("invalid", t), Af(t, i.value, i.defaultValue, i.children));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      Cm(t.textContent, n)
        ? (i.popover != null && (Me("beforetoggle", t), Me("toggle", t)),
          i.onScroll != null && Me("scroll", t),
          i.onScrollEnd != null && Me("scrollend", t),
          i.onClick != null && (t.onclick = Qn),
          (t = !0))
        : (t = !1),
      t || Ea(e, !0));
  }
  function od(e) {
    for (Nt = e.return; Nt;)
      switch (Nt.tag) {
        case 5:
        case 31:
        case 13:
          sn = !1;
          return;
        case 27:
        case 3:
          sn = !0;
          return;
        default:
          Nt = Nt.return;
      }
  }
  function _l(e) {
    if (e !== Nt) return !1;
    if (!je) return (od(e), (je = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || no(e.type, e.memoizedProps))),
        (n = !n)),
      n && at && Ea(e),
      od(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      at = Lm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      at = Lm(e);
    } else
      t === 27
        ? ((t = at), Ua(e.type) ? ((e = uo), (uo = null), (at = e)) : (at = t))
        : (at = Nt ? on(e.stateNode.nextSibling) : null);
    return !0;
  }
  function $a() {
    ((at = Nt = null), (je = !1));
  }
  function ks() {
    var e = ba;
    return (
      e !== null &&
        (Gt === null ? (Gt = e) : Gt.push.apply(Gt, e), (ba = null)),
      e
    );
  }
  function Ri(e) {
    ba === null ? (ba = [e]) : ba.push(e);
  }
  var qs = T(null),
    Ia = null,
    Kn = null;
  function Sa(e, t, n) {
    (K(qs, t._currentValue), (t._currentValue = n));
  }
  function Jn(e) {
    ((e._currentValue = qs.current), B(qs));
  }
  function Ys(e, t, n) {
    for (; e !== null;) {
      var i = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), i !== null && (i.childLanes |= t))
          : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t),
        e === n)
      )
        break;
      e = e.return;
    }
  }
  function Vs(e, t, n, i) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null;) {
      var c = u.dependencies;
      if (c !== null) {
        var d = u.child;
        c = c.firstContext;
        e: for (; c !== null;) {
          var m = c;
          c = u;
          for (var E = 0; E < t.length; E++)
            if (m.context === t[E]) {
              ((c.lanes |= n),
                (m = c.alternate),
                m !== null && (m.lanes |= n),
                Ys(c.return, n, e),
                i || (d = null));
              break e;
            }
          c = m.next;
        }
      } else if (u.tag === 18) {
        if (((d = u.return), d === null)) throw Error(s(341));
        ((d.lanes |= n),
          (c = d.alternate),
          c !== null && (c.lanes |= n),
          Ys(d, n, e),
          (d = null));
      } else d = u.child;
      if (d !== null) d.return = u;
      else
        for (d = u; d !== null;) {
          if (d === e) {
            d = null;
            break;
          }
          if (((u = d.sibling), u !== null)) {
            ((u.return = d.return), (d = u));
            break;
          }
          d = d.return;
        }
      u = d;
    }
  }
  function xl(e, t, n, i) {
    e = null;
    for (var u = t, c = !1; u !== null;) {
      if (!c) {
        if ((u.flags & 524288) !== 0) c = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var d = u.alternate;
        if (d === null) throw Error(s(387));
        if (((d = d.memoizedProps), d !== null)) {
          var m = u.type;
          Xt(u.pendingProps.value, d.value) ||
            (e !== null ? e.push(m) : (e = [m]));
        }
      } else if (u === _e.current) {
        if (((d = u.alternate), d === null)) throw Error(s(387));
        d.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
          (e !== null ? e.push($i) : (e = [$i]));
      }
      u = u.return;
    }
    (e !== null && Vs(t, e, n, i), (t.flags |= 262144));
  }
  function Qr(e) {
    for (e = e.firstContext; e !== null;) {
      if (!Xt(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Wa(e) {
    ((Ia = e),
      (Kn = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function Ct(e) {
    return fd(Ia, e);
  }
  function Xr(e, t) {
    return (Ia === null && Wa(e), fd(e, t));
  }
  function fd(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Kn === null)) {
      if (e === null) throw Error(s(308));
      ((Kn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Kn = Kn.next = t;
    return n;
  }
  var lv =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (n, i) {
                  e.push(i);
                }
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (n) {
                  return n();
                }));
            };
          },
    iv = a.unstable_scheduleCallback,
    rv = a.unstable_NormalPriority,
    ht = {
      $$typeof: ne,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
  function Gs() {
    return { controller: new lv(), data: new Map(), refCount: 0 };
  }
  function Ai(e) {
    (e.refCount--,
      e.refCount === 0 &&
        iv(rv, function () {
          e.controller.abort();
        }));
  }
  var Ni = null,
    Qs = 0,
    wl = 0,
    Ml = null;
  function uv(e, t) {
    if (Ni === null) {
      var n = (Ni = []);
      ((Qs = 0),
        (wl = Fc()),
        (Ml = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          }
        }));
    }
    return (Qs++, t.then(dd, dd), t);
  }
  function dd() {
    if (--Qs === 0 && Ni !== null) {
      Ml !== null && (Ml.status = "fulfilled");
      var e = Ni;
      ((Ni = null), (wl = 0), (Ml = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function sv(e, t) {
    var n = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (u) {
          n.push(u);
        }
      };
    return (
      e.then(
        function () {
          ((i.status = "fulfilled"), (i.value = t));
          for (var u = 0; u < n.length; u++) (0, n[u])(t);
        },
        function (u) {
          for (i.status = "rejected", i.reason = u, u = 0; u < n.length; u++)
            (0, n[u])(void 0);
        }
      ),
      i
    );
  }
  var hd = w.S;
  w.S = function (e, t) {
    (($h = Mt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        uv(e, t),
      hd !== null && hd(e, t));
  };
  var Pa = T(null);
  function Xs() {
    var e = Pa.current;
    return e !== null ? e : et.pooledCache;
  }
  function Zr(e, t) {
    t === null ? K(Pa, Pa.current) : K(Pa, t.pool);
  }
  function md() {
    var e = Xs();
    return e === null ? null : { parent: ht._currentValue, pool: e };
  }
  var zl = Error(s(460)),
    Zs = Error(s(474)),
    Fr = Error(s(542)),
    Kr = { then: function () {} };
  function yd(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function pd(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Qn, Qn), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), gd(e), e);
      default:
        if (typeof t.status == "string") t.then(Qn, Qn);
        else {
          if (((e = et), e !== null && 100 < e.shellSuspendCounter))
            throw Error(s(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (i) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "fulfilled"), (u.value = i));
                }
              },
              function (i) {
                if (t.status === "pending") {
                  var u = t;
                  ((u.status = "rejected"), (u.reason = i));
                }
              }
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), gd(e), e);
        }
        throw ((tl = t), zl);
    }
  }
  function el(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((tl = n), zl)
        : n;
    }
  }
  var tl = null;
  function vd() {
    if (tl === null) throw Error(s(459));
    var e = tl;
    return ((tl = null), e);
  }
  function gd(e) {
    if (e === zl || e === Fr) throw Error(s(483));
  }
  var Ul = null,
    Ci = 0;
  function Jr(e) {
    var t = Ci;
    return ((Ci += 1), Ul === null && (Ul = []), pd(Ul, e, t));
  }
  function Oi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function $r(e, t) {
    throw t.$$typeof === C
      ? Error(s(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          s(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function bd(e) {
    function t(N, R) {
      if (e) {
        var _ = N.deletions;
        _ === null ? ((N.deletions = [R]), (N.flags |= 16)) : _.push(R);
      }
    }
    function n(N, R) {
      if (!e) return null;
      for (; R !== null;) (t(N, R), (R = R.sibling));
      return null;
    }
    function i(N) {
      for (var R = new Map(); N !== null;)
        (N.key !== null ? R.set(N.key, N) : R.set(N.index, N), (N = N.sibling));
      return R;
    }
    function u(N, R) {
      return ((N = Zn(N, R)), (N.index = 0), (N.sibling = null), N);
    }
    function c(N, R, _) {
      return (
        (N.index = _),
        e
          ? ((_ = N.alternate),
            _ !== null
              ? ((_ = _.index), _ < R ? ((N.flags |= 67108866), R) : _)
              : ((N.flags |= 67108866), R))
          : ((N.flags |= 1048576), R)
      );
    }
    function d(N) {
      return (e && N.alternate === null && (N.flags |= 67108866), N);
    }
    function m(N, R, _, k) {
      return R === null || R.tag !== 6
        ? ((R = Us(_, N.mode, k)), (R.return = N), R)
        : ((R = u(R, _)), (R.return = N), R);
    }
    function E(N, R, _, k) {
      var de = _.type;
      return de === V
        ? H(N, R, _.props.children, k, _.key)
        : R !== null &&
            (R.elementType === de ||
              (typeof de == "object" &&
                de !== null &&
                de.$$typeof === L &&
                el(de) === R.type))
          ? ((R = u(R, _.props)), Oi(R, _), (R.return = N), R)
          : ((R = Vr(_.type, _.key, _.props, null, N.mode, k)),
            Oi(R, _),
            (R.return = N),
            R);
    }
    function x(N, R, _, k) {
      return R === null ||
        R.tag !== 4 ||
        R.stateNode.containerInfo !== _.containerInfo ||
        R.stateNode.implementation !== _.implementation
        ? ((R = Ls(_, N.mode, k)), (R.return = N), R)
        : ((R = u(R, _.children || [])), (R.return = N), R);
    }
    function H(N, R, _, k, de) {
      return R === null || R.tag !== 7
        ? ((R = Ja(_, N.mode, k, de)), (R.return = N), R)
        : ((R = u(R, _)), (R.return = N), R);
    }
    function q(N, R, _) {
      if (
        (typeof R == "string" && R !== "") ||
        typeof R == "number" ||
        typeof R == "bigint"
      )
        return ((R = Us("" + R, N.mode, _)), (R.return = N), R);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case O:
            return (
              (_ = Vr(R.type, R.key, R.props, null, N.mode, _)),
              Oi(_, R),
              (_.return = N),
              _
            );
          case U:
            return ((R = Ls(R, N.mode, _)), (R.return = N), R);
          case L:
            return ((R = el(R)), q(N, R, _));
        }
        if (Je(R) || Oe(R))
          return ((R = Ja(R, N.mode, _, null)), (R.return = N), R);
        if (typeof R.then == "function") return q(N, Jr(R), _);
        if (R.$$typeof === ne) return q(N, Xr(N, R), _);
        $r(N, R);
      }
      return null;
    }
    function M(N, R, _, k) {
      var de = R !== null ? R.key : null;
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return de !== null ? null : m(N, R, "" + _, k);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case O:
            return _.key === de ? E(N, R, _, k) : null;
          case U:
            return _.key === de ? x(N, R, _, k) : null;
          case L:
            return ((_ = el(_)), M(N, R, _, k));
        }
        if (Je(_) || Oe(_)) return de !== null ? null : H(N, R, _, k, null);
        if (typeof _.then == "function") return M(N, R, Jr(_), k);
        if (_.$$typeof === ne) return M(N, R, Xr(N, _), k);
        $r(N, _);
      }
      return null;
    }
    function j(N, R, _, k, de) {
      if (
        (typeof k == "string" && k !== "") ||
        typeof k == "number" ||
        typeof k == "bigint"
      )
        return ((N = N.get(_) || null), m(R, N, "" + k, de));
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case O:
            return (
              (N = N.get(k.key === null ? _ : k.key) || null),
              E(R, N, k, de)
            );
          case U:
            return (
              (N = N.get(k.key === null ? _ : k.key) || null),
              x(R, N, k, de)
            );
          case L:
            return ((k = el(k)), j(N, R, _, k, de));
        }
        if (Je(k) || Oe(k))
          return ((N = N.get(_) || null), H(R, N, k, de, null));
        if (typeof k.then == "function") return j(N, R, _, Jr(k), de);
        if (k.$$typeof === ne) return j(N, R, _, Xr(R, k), de);
        $r(R, k);
      }
      return null;
    }
    function le(N, R, _, k) {
      for (
        var de = null, qe = null, ue = R, Ce = (R = 0), Ue = null;
        ue !== null && Ce < _.length;
        Ce++
      ) {
        ue.index > Ce ? ((Ue = ue), (ue = null)) : (Ue = ue.sibling);
        var Ye = M(N, ue, _[Ce], k);
        if (Ye === null) {
          ue === null && (ue = Ue);
          break;
        }
        (e && ue && Ye.alternate === null && t(N, ue),
          (R = c(Ye, R, Ce)),
          qe === null ? (de = Ye) : (qe.sibling = Ye),
          (qe = Ye),
          (ue = Ue));
      }
      if (Ce === _.length) return (n(N, ue), je && Fn(N, Ce), de);
      if (ue === null) {
        for (; Ce < _.length; Ce++)
          ((ue = q(N, _[Ce], k)),
            ue !== null &&
              ((R = c(ue, R, Ce)),
              qe === null ? (de = ue) : (qe.sibling = ue),
              (qe = ue)));
        return (je && Fn(N, Ce), de);
      }
      for (ue = i(ue); Ce < _.length; Ce++)
        ((Ue = j(ue, N, Ce, _[Ce], k)),
          Ue !== null &&
            (e &&
              Ue.alternate !== null &&
              ue.delete(Ue.key === null ? Ce : Ue.key),
            (R = c(Ue, R, Ce)),
            qe === null ? (de = Ue) : (qe.sibling = Ue),
            (qe = Ue)));
      return (
        e &&
          ue.forEach(function (ka) {
            return t(N, ka);
          }),
        je && Fn(N, Ce),
        de
      );
    }
    function pe(N, R, _, k) {
      if (_ == null) throw Error(s(151));
      for (
        var de = null,
          qe = null,
          ue = R,
          Ce = (R = 0),
          Ue = null,
          Ye = _.next();
        ue !== null && !Ye.done;
        Ce++, Ye = _.next()
      ) {
        ue.index > Ce ? ((Ue = ue), (ue = null)) : (Ue = ue.sibling);
        var ka = M(N, ue, Ye.value, k);
        if (ka === null) {
          ue === null && (ue = Ue);
          break;
        }
        (e && ue && ka.alternate === null && t(N, ue),
          (R = c(ka, R, Ce)),
          qe === null ? (de = ka) : (qe.sibling = ka),
          (qe = ka),
          (ue = Ue));
      }
      if (Ye.done) return (n(N, ue), je && Fn(N, Ce), de);
      if (ue === null) {
        for (; !Ye.done; Ce++, Ye = _.next())
          ((Ye = q(N, Ye.value, k)),
            Ye !== null &&
              ((R = c(Ye, R, Ce)),
              qe === null ? (de = Ye) : (qe.sibling = Ye),
              (qe = Ye)));
        return (je && Fn(N, Ce), de);
      }
      for (ue = i(ue); !Ye.done; Ce++, Ye = _.next())
        ((Ye = j(ue, N, Ce, Ye.value, k)),
          Ye !== null &&
            (e &&
              Ye.alternate !== null &&
              ue.delete(Ye.key === null ? Ce : Ye.key),
            (R = c(Ye, R, Ce)),
            qe === null ? (de = Ye) : (qe.sibling = Ye),
            (qe = Ye)));
      return (
        e &&
          ue.forEach(function (bg) {
            return t(N, bg);
          }),
        je && Fn(N, Ce),
        de
      );
    }
    function We(N, R, _, k) {
      if (
        (typeof _ == "object" &&
          _ !== null &&
          _.type === V &&
          _.key === null &&
          (_ = _.props.children),
        typeof _ == "object" && _ !== null)
      ) {
        switch (_.$$typeof) {
          case O:
            e: {
              for (var de = _.key; R !== null;) {
                if (R.key === de) {
                  if (((de = _.type), de === V)) {
                    if (R.tag === 7) {
                      (n(N, R.sibling),
                        (k = u(R, _.props.children)),
                        (k.return = N),
                        (N = k));
                      break e;
                    }
                  } else if (
                    R.elementType === de ||
                    (typeof de == "object" &&
                      de !== null &&
                      de.$$typeof === L &&
                      el(de) === R.type)
                  ) {
                    (n(N, R.sibling),
                      (k = u(R, _.props)),
                      Oi(k, _),
                      (k.return = N),
                      (N = k));
                    break e;
                  }
                  n(N, R);
                  break;
                } else t(N, R);
                R = R.sibling;
              }
              _.type === V
                ? ((k = Ja(_.props.children, N.mode, k, _.key)),
                  (k.return = N),
                  (N = k))
                : ((k = Vr(_.type, _.key, _.props, null, N.mode, k)),
                  Oi(k, _),
                  (k.return = N),
                  (N = k));
            }
            return d(N);
          case U:
            e: {
              for (de = _.key; R !== null;) {
                if (R.key === de)
                  if (
                    R.tag === 4 &&
                    R.stateNode.containerInfo === _.containerInfo &&
                    R.stateNode.implementation === _.implementation
                  ) {
                    (n(N, R.sibling),
                      (k = u(R, _.children || [])),
                      (k.return = N),
                      (N = k));
                    break e;
                  } else {
                    n(N, R);
                    break;
                  }
                else t(N, R);
                R = R.sibling;
              }
              ((k = Ls(_, N.mode, k)), (k.return = N), (N = k));
            }
            return d(N);
          case L:
            return ((_ = el(_)), We(N, R, _, k));
        }
        if (Je(_)) return le(N, R, _, k);
        if (Oe(_)) {
          if (((de = Oe(_)), typeof de != "function")) throw Error(s(150));
          return ((_ = de.call(_)), pe(N, R, _, k));
        }
        if (typeof _.then == "function") return We(N, R, Jr(_), k);
        if (_.$$typeof === ne) return We(N, R, Xr(N, _), k);
        $r(N, _);
      }
      return (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
        ? ((_ = "" + _),
          R !== null && R.tag === 6
            ? (n(N, R.sibling), (k = u(R, _)), (k.return = N), (N = k))
            : (n(N, R), (k = Us(_, N.mode, k)), (k.return = N), (N = k)),
          d(N))
        : n(N, R);
    }
    return function (N, R, _, k) {
      try {
        Ci = 0;
        var de = We(N, R, _, k);
        return ((Ul = null), de);
      } catch (ue) {
        if (ue === zl || ue === Fr) throw ue;
        var qe = Zt(29, ue, null, N.mode);
        return ((qe.lanes = k), (qe.return = N), qe);
      }
    };
  }
  var nl = bd(!0),
    Ed = bd(!1),
    Ta = !1;
  function Fs(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ks(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null
        }));
  }
  function Ra(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Aa(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (Qe & 2) !== 0)) {
      var u = i.pending;
      return (
        u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
        (i.pending = t),
        (t = Yr(e)),
        ad(e, null, n),
        t
      );
    }
    return (qr(e, i, t, n), Yr(e));
  }
  function Di(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), _r(e, n));
    }
  }
  function Js(e, t) {
    var n = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var u = null,
        c = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          (c === null ? (u = c = d) : (c = c.next = d), (n = n.next));
        } while (n !== null);
        c === null ? (u = c = t) : (c = c.next = t);
      } else u = c = t;
      ((n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }),
        (e.updateQueue = n));
      return;
    }
    ((e = n.lastBaseUpdate),
      e === null ? (n.firstBaseUpdate = t) : (e.next = t),
      (n.lastBaseUpdate = t));
  }
  var $s = !1;
  function _i() {
    if ($s) {
      var e = Ml;
      if (e !== null) throw e;
    }
  }
  function xi(e, t, n, i) {
    $s = !1;
    var u = e.updateQueue;
    Ta = !1;
    var c = u.firstBaseUpdate,
      d = u.lastBaseUpdate,
      m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var E = m,
        x = E.next;
      ((E.next = null), d === null ? (c = x) : (d.next = x), (d = E));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (m = H.lastBaseUpdate),
        m !== d &&
          (m === null ? (H.firstBaseUpdate = x) : (m.next = x),
          (H.lastBaseUpdate = E)));
    }
    if (c !== null) {
      var q = u.baseState;
      ((d = 0), (H = x = E = null), (m = c));
      do {
        var M = m.lane & -536870913,
          j = M !== m.lane;
        if (j ? (ze & M) === M : (i & M) === M) {
          (M !== 0 && M === wl && ($s = !0),
            H !== null &&
              (H = H.next =
                {
                  lane: 0,
                  tag: m.tag,
                  payload: m.payload,
                  callback: null,
                  next: null
                }));
          e: {
            var le = e,
              pe = m;
            M = t;
            var We = n;
            switch (pe.tag) {
              case 1:
                if (((le = pe.payload), typeof le == "function")) {
                  q = le.call(We, q, M);
                  break e;
                }
                q = le;
                break e;
              case 3:
                le.flags = (le.flags & -65537) | 128;
              case 0:
                if (
                  ((le = pe.payload),
                  (M = typeof le == "function" ? le.call(We, q, M) : le),
                  M == null)
                )
                  break e;
                q = b({}, q, M);
                break e;
              case 2:
                Ta = !0;
            }
          }
          ((M = m.callback),
            M !== null &&
              ((e.flags |= 64),
              j && (e.flags |= 8192),
              (j = u.callbacks),
              j === null ? (u.callbacks = [M]) : j.push(M)));
        } else
          ((j = {
            lane: M,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }),
            H === null ? ((x = H = j), (E = q)) : (H = H.next = j),
            (d |= M));
        if (((m = m.next), m === null)) {
          if (((m = u.shared.pending), m === null)) break;
          ((j = m),
            (m = j.next),
            (j.next = null),
            (u.lastBaseUpdate = j),
            (u.shared.pending = null));
        }
      } while (!0);
      (H === null && (E = q),
        (u.baseState = E),
        (u.firstBaseUpdate = x),
        (u.lastBaseUpdate = H),
        c === null && (u.shared.lanes = 0),
        (_a |= d),
        (e.lanes = d),
        (e.memoizedState = q));
    }
  }
  function Sd(e, t) {
    if (typeof e != "function") throw Error(s(191, e));
    e.call(t);
  }
  function Td(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) Sd(n[e], t);
  }
  var Ll = T(null),
    Ir = T(0);
  function Rd(e, t) {
    ((e = la), K(Ir, e), K(Ll, t), (la = e | t.baseLanes));
  }
  function Is() {
    (K(Ir, la), K(Ll, Ll.current));
  }
  function Ws() {
    ((la = Ir.current), B(Ll), B(Ir));
  }
  var Ft = T(null),
    cn = null;
  function Na(e) {
    var t = e.alternate;
    (K(ot, ot.current & 1),
      K(Ft, e),
      cn === null &&
        (t === null || Ll.current !== null || t.memoizedState !== null) &&
        (cn = e));
  }
  function Ps(e) {
    (K(ot, ot.current), K(Ft, e), cn === null && (cn = e));
  }
  function Ad(e) {
    e.tag === 22
      ? (K(ot, ot.current), K(Ft, e), cn === null && (cn = e))
      : Ca();
  }
  function Ca() {
    (K(ot, ot.current), K(Ft, Ft.current));
  }
  function Kt(e) {
    (B(Ft), cn === e && (cn = null), B(ot));
  }
  var ot = T(0);
  function Wr(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || io(n) || ro(n)))
          return t;
      } else if (
        t.tag === 19 &&
        (t.memoizedProps.revealOrder === "forwards" ||
          t.memoizedProps.revealOrder === "backwards" ||
          t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          t.memoizedProps.revealOrder === "together")
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var $n = 0,
    Ne = null,
    $e = null,
    mt = null,
    Pr = !1,
    jl = !1,
    al = !1,
    eu = 0,
    wi = 0,
    Hl = null,
    cv = 0;
  function st() {
    throw Error(s(321));
  }
  function ec(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xt(e[n], t[n])) return !1;
    return !0;
  }
  function tc(e, t, n, i, u, c) {
    return (
      ($n = c),
      (Ne = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (w.H = e === null || e.memoizedState === null ? uh : pc),
      (al = !1),
      (c = n(i, u)),
      (al = !1),
      jl && (c = Cd(t, n, i, u)),
      Nd(e),
      c
    );
  }
  function Nd(e) {
    w.H = Ui;
    var t = $e !== null && $e.next !== null;
    if ((($n = 0), (mt = $e = Ne = null), (Pr = !1), (wi = 0), (Hl = null), t))
      throw Error(s(300));
    e === null ||
      yt ||
      ((e = e.dependencies), e !== null && Qr(e) && (yt = !0));
  }
  function Cd(e, t, n, i) {
    Ne = e;
    var u = 0;
    do {
      if ((jl && (Hl = null), (wi = 0), (jl = !1), 25 <= u))
        throw Error(s(301));
      if (((u += 1), (mt = $e = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((w.H = sh), (c = t(n, i)));
    } while (jl);
    return c;
  }
  function ov() {
    var e = w.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Mi(t) : t),
      (e = e.useState()[0]),
      ($e !== null ? $e.memoizedState : null) !== e && (Ne.flags |= 1024),
      t
    );
  }
  function nc() {
    var e = eu !== 0;
    return ((eu = 0), e);
  }
  function ac(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function lc(e) {
    if (Pr) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Pr = !1;
    }
    (($n = 0), (mt = $e = Ne = null), (jl = !1), (wi = eu = 0), (Hl = null));
  }
  function Lt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return (mt === null ? (Ne.memoizedState = mt = e) : (mt = mt.next = e), mt);
  }
  function ft() {
    if ($e === null) {
      var e = Ne.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = $e.next;
    var t = mt === null ? Ne.memoizedState : mt.next;
    if (t !== null) ((mt = t), ($e = e));
    else {
      if (e === null)
        throw Ne.alternate === null ? Error(s(467)) : Error(s(310));
      (($e = e),
        (e = {
          memoizedState: $e.memoizedState,
          baseState: $e.baseState,
          baseQueue: $e.baseQueue,
          queue: $e.queue,
          next: null
        }),
        mt === null ? (Ne.memoizedState = mt = e) : (mt = mt.next = e));
    }
    return mt;
  }
  function tu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Mi(e) {
    var t = wi;
    return (
      (wi += 1),
      Hl === null && (Hl = []),
      (e = pd(Hl, e, t)),
      (t = Ne),
      (mt === null ? t.memoizedState : mt.next) === null &&
        ((t = t.alternate),
        (w.H = t === null || t.memoizedState === null ? uh : pc)),
      e
    );
  }
  function nu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Mi(e);
      if (e.$$typeof === ne) return Ct(e);
    }
    throw Error(s(438, String(e)));
  }
  function ic(e) {
    var t = null,
      n = Ne.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var i = Ne.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (t = {
              data: i.data.map(function (u) {
                return u.slice();
              }),
              index: 0
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = tu()), (Ne.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++) n[i] = He;
    return (t.index++, n);
  }
  function In(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function au(e) {
    var t = ft();
    return rc(t, $e, e);
  }
  function rc(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = n;
    var u = e.baseQueue,
      c = i.pending;
    if (c !== null) {
      if (u !== null) {
        var d = u.next;
        ((u.next = c.next), (c.next = d));
      }
      ((t.baseQueue = u = c), (i.pending = null));
    }
    if (((c = e.baseState), u === null)) e.memoizedState = c;
    else {
      t = u.next;
      var m = (d = null),
        E = null,
        x = t,
        H = !1;
      do {
        var q = x.lane & -536870913;
        if (q !== x.lane ? (ze & q) === q : ($n & q) === q) {
          var M = x.revertLane;
          if (M === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: x.action,
                  hasEagerState: x.hasEagerState,
                  eagerState: x.eagerState,
                  next: null
                }),
              q === wl && (H = !0));
          else if (($n & M) === M) {
            ((x = x.next), M === wl && (H = !0));
            continue;
          } else
            ((q = {
              lane: 0,
              revertLane: x.revertLane,
              gesture: null,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }),
              E === null ? ((m = E = q), (d = c)) : (E = E.next = q),
              (Ne.lanes |= M),
              (_a |= M));
          ((q = x.action),
            al && n(c, q),
            (c = x.hasEagerState ? x.eagerState : n(c, q)));
        } else
          ((M = {
            lane: q,
            revertLane: x.revertLane,
            gesture: x.gesture,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }),
            E === null ? ((m = E = M), (d = c)) : (E = E.next = M),
            (Ne.lanes |= q),
            (_a |= q));
        x = x.next;
      } while (x !== null && x !== t);
      if (
        (E === null ? (d = c) : (E.next = m),
        !Xt(c, e.memoizedState) && ((yt = !0), H && ((n = Ml), n !== null)))
      )
        throw n;
      ((e.memoizedState = c),
        (e.baseState = d),
        (e.baseQueue = E),
        (i.lastRenderedState = c));
    }
    return (u === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function uc(e) {
    var t = ft(),
      n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch,
      u = n.pending,
      c = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var d = (u = u.next);
      do ((c = e(c, d.action)), (d = d.next));
      while (d !== u);
      (Xt(c, t.memoizedState) || (yt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (n.lastRenderedState = c));
    }
    return [c, i];
  }
  function Od(e, t, n) {
    var i = Ne,
      u = ft(),
      c = je;
    if (c) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else n = t();
    var d = !Xt(($e || u).memoizedState, n);
    if (
      (d && ((u.memoizedState = n), (yt = !0)),
      (u = u.queue),
      oc(xd.bind(null, i, u, e), [e]),
      u.getSnapshot !== t || d || (mt !== null && mt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Bl(9, { destroy: void 0 }, _d.bind(null, i, u, n, t), null),
        et === null)
      )
        throw Error(s(349));
      c || ($n & 127) !== 0 || Dd(i, t, n);
    }
    return n;
  }
  function Dd(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Ne.updateQueue),
      t === null
        ? ((t = tu()), (Ne.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function _d(e, t, n, i) {
    ((t.value = n), (t.getSnapshot = i), wd(t) && Md(e));
  }
  function xd(e, t, n) {
    return n(function () {
      wd(t) && Md(e);
    });
  }
  function wd(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Xt(e, n);
    } catch {
      return !0;
    }
  }
  function Md(e) {
    var t = Ka(e, 2);
    t !== null && Qt(t, e, 2);
  }
  function sc(e) {
    var t = Lt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), al)) {
        St(!0);
        try {
          n();
        } finally {
          St(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: In,
        lastRenderedState: e
      }),
      t
    );
  }
  function zd(e, t, n, i) {
    return ((e.baseState = n), rc(e, $e, typeof i == "function" ? i : In));
  }
  function fv(e, t, n, i, u) {
    if (ru(e)) throw Error(s(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (d) {
          c.listeners.push(d);
        }
      };
      (w.T !== null ? n(!0) : (c.isTransition = !1),
        i(c),
        (n = t.pending),
        n === null
          ? ((c.next = t.pending = c), Ud(t, c))
          : ((c.next = n.next), (t.pending = n.next = c)));
    }
  }
  function Ud(e, t) {
    var n = t.action,
      i = t.payload,
      u = e.state;
    if (t.isTransition) {
      var c = w.T,
        d = {};
      w.T = d;
      try {
        var m = n(u, i),
          E = w.S;
        (E !== null && E(d, m), Ld(e, t, m));
      } catch (x) {
        cc(e, t, x);
      } finally {
        (c !== null && d.types !== null && (c.types = d.types), (w.T = c));
      }
    } else
      try {
        ((c = n(u, i)), Ld(e, t, c));
      } catch (x) {
        cc(e, t, x);
      }
  }
  function Ld(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            jd(e, t, i);
          },
          function (i) {
            return cc(e, t, i);
          }
        )
      : jd(e, t, n);
  }
  function jd(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      Hd(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), Ud(e, n))));
  }
  function cc(e, t, n) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((t.status = "rejected"), (t.reason = n), Hd(t), (t = t.next));
      while (t !== i);
    }
    e.action = null;
  }
  function Hd(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Bd(e, t) {
    return t;
  }
  function kd(e, t) {
    if (je) {
      var n = et.formState;
      if (n !== null) {
        e: {
          var i = Ne;
          if (je) {
            if (at) {
              t: {
                for (var u = at, c = sn; u.nodeType !== 8;) {
                  if (!c) {
                    u = null;
                    break t;
                  }
                  if (((u = on(u.nextSibling)), u === null)) {
                    u = null;
                    break t;
                  }
                }
                ((c = u.data), (u = c === "F!" || c === "F" ? u : null));
              }
              if (u) {
                ((at = on(u.nextSibling)), (i = u.data === "F!"));
                break e;
              }
            }
            Ea(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return (
      (n = Lt()),
      (n.memoizedState = n.baseState = t),
      (i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bd,
        lastRenderedState: t
      }),
      (n.queue = i),
      (n = lh.bind(null, Ne, i)),
      (i.dispatch = n),
      (i = sc(!1)),
      (c = yc.bind(null, Ne, !1, i.queue)),
      (i = Lt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (i.queue = u),
      (n = fv.bind(null, Ne, u, c, n)),
      (u.dispatch = n),
      (i.memoizedState = e),
      [t, n, !1]
    );
  }
  function qd(e) {
    var t = ft();
    return Yd(t, $e, e);
  }
  function Yd(e, t, n) {
    if (
      ((t = rc(e, t, Bd)[0]),
      (e = au(In)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var i = Mi(t);
      } catch (d) {
        throw d === zl ? Fr : d;
      }
    else i = t;
    t = ft();
    var u = t.queue,
      c = u.dispatch;
    return (
      n !== t.memoizedState &&
        ((Ne.flags |= 2048),
        Bl(9, { destroy: void 0 }, dv.bind(null, u, n), null)),
      [i, c, e]
    );
  }
  function dv(e, t) {
    e.action = t;
  }
  function Vd(e) {
    var t = ft(),
      n = $e;
    if (n !== null) return Yd(t, n, e);
    (ft(), (t = t.memoizedState), (n = ft()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = e), [t, i, !1]);
  }
  function Bl(e, t, n, i) {
    return (
      (e = { tag: e, create: n, deps: i, inst: t, next: null }),
      (t = Ne.updateQueue),
      t === null && ((t = tu()), (Ne.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e)),
      e
    );
  }
  function Gd() {
    return ft().memoizedState;
  }
  function lu(e, t, n, i) {
    var u = Lt();
    ((Ne.flags |= e),
      (u.memoizedState = Bl(
        1 | t,
        { destroy: void 0 },
        n,
        i === void 0 ? null : i
      )));
  }
  function iu(e, t, n, i) {
    var u = ft();
    i = i === void 0 ? null : i;
    var c = u.memoizedState.inst;
    $e !== null && i !== null && ec(i, $e.memoizedState.deps)
      ? (u.memoizedState = Bl(t, c, n, i))
      : ((Ne.flags |= e), (u.memoizedState = Bl(1 | t, c, n, i)));
  }
  function Qd(e, t) {
    lu(8390656, 8, e, t);
  }
  function oc(e, t) {
    iu(2048, 8, e, t);
  }
  function hv(e) {
    Ne.flags |= 4;
    var t = Ne.updateQueue;
    if (t === null) ((t = tu()), (Ne.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Xd(e) {
    var t = ft().memoizedState;
    return (
      hv({ ref: t, nextImpl: e }),
      function () {
        if ((Qe & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Zd(e, t) {
    return iu(4, 2, e, t);
  }
  function Fd(e, t) {
    return iu(4, 4, e, t);
  }
  function Kd(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function () {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Jd(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), iu(4, 4, Kd.bind(null, t, e), n));
  }
  function fc() {}
  function $d(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && ec(t, i[1]) ? i[0] : ((n.memoizedState = [e, t]), e);
  }
  function Id(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && ec(t, i[1])) return i[0];
    if (((i = e()), al)) {
      St(!0);
      try {
        e();
      } finally {
        St(!1);
      }
    }
    return ((n.memoizedState = [i, t]), i);
  }
  function dc(e, t, n) {
    return n === void 0 || (($n & 1073741824) !== 0 && (ze & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Wh()), (Ne.lanes |= e), (_a |= e), n);
  }
  function Wd(e, t, n, i) {
    return Xt(n, t)
      ? n
      : Ll.current !== null
        ? ((e = dc(e, n, i)), Xt(e, t) || (yt = !0), e)
        : ($n & 42) === 0 || (($n & 1073741824) !== 0 && (ze & 261930) === 0)
          ? ((yt = !0), (e.memoizedState = n))
          : ((e = Wh()), (Ne.lanes |= e), (_a |= e), t);
  }
  function Pd(e, t, n, i, u) {
    var c = X.p;
    X.p = c !== 0 && 8 > c ? c : 8;
    var d = w.T,
      m = {};
    ((w.T = m), yc(e, !1, t, n));
    try {
      var E = u(),
        x = w.S;
      if (
        (x !== null && x(m, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var H = sv(E, i);
        zi(e, t, H, It(e));
      } else zi(e, t, i, It(e));
    } catch (q) {
      zi(e, t, { then: function () {}, status: "rejected", reason: q }, It());
    } finally {
      ((X.p = c),
        d !== null && m.types !== null && (d.types = m.types),
        (w.T = d));
    }
  }
  function mv() {}
  function hc(e, t, n, i) {
    if (e.tag !== 5) throw Error(s(476));
    var u = eh(e).queue;
    Pd(
      e,
      u,
      t,
      re,
      n === null
        ? mv
        : function () {
            return (th(e), n(i));
          }
    );
  }
  function eh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: re,
      baseState: re,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: In,
        lastRenderedState: re
      },
      next: null
    };
    var n = {};
    return (
      (t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: In,
          lastRenderedState: n
        },
        next: null
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function th(e) {
    var t = eh(e);
    (t.next === null && (t = e.alternate.memoizedState),
      zi(e, t.next.queue, {}, It()));
  }
  function mc() {
    return Ct($i);
  }
  function nh() {
    return ft().memoizedState;
  }
  function ah() {
    return ft().memoizedState;
  }
  function yv(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = It();
          e = Ra(n);
          var i = Aa(t, e, n);
          (i !== null && (Qt(i, t, n), Di(i, t, n)),
            (t = { cache: Gs() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function pv(e, t, n) {
    var i = It();
    ((n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }),
      ru(e)
        ? ih(t, n)
        : ((n = Ms(e, t, n, i)), n !== null && (Qt(n, e, i), rh(n, t, i))));
  }
  function lh(e, t, n) {
    var i = It();
    zi(e, t, n, i);
  }
  function zi(e, t, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ru(e)) ih(t, u);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var d = t.lastRenderedState,
            m = c(d, n);
          if (((u.hasEagerState = !0), (u.eagerState = m), Xt(m, d)))
            return (qr(e, t, u, 0), et === null && kr(), !1);
        } catch {}
      if (((n = Ms(e, t, u, i)), n !== null))
        return (Qt(n, e, i), rh(n, t, i), !0);
    }
    return !1;
  }
  function yc(e, t, n, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: Fc(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }),
      ru(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = Ms(e, n, i, 2)), t !== null && Qt(t, e, 2));
  }
  function ru(e) {
    var t = e.alternate;
    return e === Ne || (t !== null && t === Ne);
  }
  function ih(e, t) {
    jl = Pr = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function rh(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), _r(e, n));
    }
  }
  var Ui = {
    readContext: Ct,
    use: nu,
    useCallback: st,
    useContext: st,
    useEffect: st,
    useImperativeHandle: st,
    useLayoutEffect: st,
    useInsertionEffect: st,
    useMemo: st,
    useReducer: st,
    useRef: st,
    useState: st,
    useDebugValue: st,
    useDeferredValue: st,
    useTransition: st,
    useSyncExternalStore: st,
    useId: st,
    useHostTransitionStatus: st,
    useFormState: st,
    useActionState: st,
    useOptimistic: st,
    useMemoCache: st,
    useCacheRefresh: st
  };
  Ui.useEffectEvent = st;
  var uh = {
      readContext: Ct,
      use: nu,
      useCallback: function (e, t) {
        return ((Lt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Ct,
      useEffect: Qd,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          lu(4194308, 4, Kd.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return lu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        lu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Lt();
        t = t === void 0 ? null : t;
        var i = e();
        if (al) {
          St(!0);
          try {
            e();
          } finally {
            St(!1);
          }
        }
        return ((n.memoizedState = [i, t]), i);
      },
      useReducer: function (e, t, n) {
        var i = Lt();
        if (n !== void 0) {
          var u = n(t);
          if (al) {
            St(!0);
            try {
              n(t);
            } finally {
              St(!1);
            }
          }
        } else u = t;
        return (
          (i.memoizedState = i.baseState = u),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: u
          }),
          (i.queue = e),
          (e = e.dispatch = pv.bind(null, Ne, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Lt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = sc(e);
        var t = e.queue,
          n = lh.bind(null, Ne, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: fc,
      useDeferredValue: function (e, t) {
        var n = Lt();
        return dc(n, e, t);
      },
      useTransition: function () {
        var e = sc(!1);
        return (
          (e = Pd.bind(null, Ne, e.queue, !0, !1)),
          (Lt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var i = Ne,
          u = Lt();
        if (je) {
          if (n === void 0) throw Error(s(407));
          n = n();
        } else {
          if (((n = t()), et === null)) throw Error(s(349));
          (ze & 127) !== 0 || Dd(i, t, n);
        }
        u.memoizedState = n;
        var c = { value: n, getSnapshot: t };
        return (
          (u.queue = c),
          Qd(xd.bind(null, i, c, e), [e]),
          (i.flags |= 2048),
          Bl(9, { destroy: void 0 }, _d.bind(null, i, c, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Lt(),
          t = et.identifierPrefix;
        if (je) {
          var n = Cn,
            i = Nn;
          ((n = (i & ~(1 << (32 - _t(i) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = eu++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_"));
        } else ((n = cv++), (t = "_" + t + "r_" + n.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: mc,
      useFormState: kd,
      useActionState: kd,
      useOptimistic: function (e) {
        var t = Lt();
        t.memoizedState = t.baseState = e;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        return (
          (t.queue = n),
          (t = yc.bind(null, Ne, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: ic,
      useCacheRefresh: function () {
        return (Lt().memoizedState = yv.bind(null, Ne));
      },
      useEffectEvent: function (e) {
        var t = Lt(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((Qe & 2) !== 0) throw Error(s(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      }
    },
    pc = {
      readContext: Ct,
      use: nu,
      useCallback: $d,
      useContext: Ct,
      useEffect: oc,
      useImperativeHandle: Jd,
      useInsertionEffect: Zd,
      useLayoutEffect: Fd,
      useMemo: Id,
      useReducer: au,
      useRef: Gd,
      useState: function () {
        return au(In);
      },
      useDebugValue: fc,
      useDeferredValue: function (e, t) {
        var n = ft();
        return Wd(n, $e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = au(In)[0],
          t = ft().memoizedState;
        return [typeof e == "boolean" ? e : Mi(e), t];
      },
      useSyncExternalStore: Od,
      useId: nh,
      useHostTransitionStatus: mc,
      useFormState: qd,
      useActionState: qd,
      useOptimistic: function (e, t) {
        var n = ft();
        return zd(n, $e, e, t);
      },
      useMemoCache: ic,
      useCacheRefresh: ah
    };
  pc.useEffectEvent = Xd;
  var sh = {
    readContext: Ct,
    use: nu,
    useCallback: $d,
    useContext: Ct,
    useEffect: oc,
    useImperativeHandle: Jd,
    useInsertionEffect: Zd,
    useLayoutEffect: Fd,
    useMemo: Id,
    useReducer: uc,
    useRef: Gd,
    useState: function () {
      return uc(In);
    },
    useDebugValue: fc,
    useDeferredValue: function (e, t) {
      var n = ft();
      return $e === null ? dc(n, e, t) : Wd(n, $e.memoizedState, e, t);
    },
    useTransition: function () {
      var e = uc(In)[0],
        t = ft().memoizedState;
      return [typeof e == "boolean" ? e : Mi(e), t];
    },
    useSyncExternalStore: Od,
    useId: nh,
    useHostTransitionStatus: mc,
    useFormState: Vd,
    useActionState: Vd,
    useOptimistic: function (e, t) {
      var n = ft();
      return $e !== null
        ? zd(n, $e, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: ic,
    useCacheRefresh: ah
  };
  sh.useEffectEvent = Xd;
  function vc(e, t, n, i) {
    ((t = e.memoizedState),
      (n = n(i, t)),
      (n = n == null ? t : b({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var gc = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var i = It(),
        u = Ra(i);
      ((u.payload = t),
        n != null && (u.callback = n),
        (t = Aa(e, u, i)),
        t !== null && (Qt(t, e, i), Di(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var i = It(),
        u = Ra(i);
      ((u.tag = 1),
        (u.payload = t),
        n != null && (u.callback = n),
        (t = Aa(e, u, i)),
        t !== null && (Qt(t, e, i), Di(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = It(),
        i = Ra(n);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = Aa(e, i, n)),
        t !== null && (Qt(t, e, n), Di(t, e, n)));
    }
  };
  function ch(e, t, n, i, u, c, d) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, c, d)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ei(n, i) || !Ei(u, c)
          : !0
    );
  }
  function oh(e, t, n, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, i),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, i),
      t.state !== e && gc.enqueueReplaceState(t, t.state, null));
  }
  function ll(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t) i !== "ref" && (n[i] = t[i]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = b({}, n));
      for (var u in e) n[u] === void 0 && (n[u] = e[u]);
    }
    return n;
  }
  function fh(e) {
    Br(e);
  }
  function dh(e) {
    console.error(e);
  }
  function hh(e) {
    Br(e);
  }
  function uu(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function mh(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function () {
        throw u;
      });
    }
  }
  function bc(e, t, n) {
    return (
      (n = Ra(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        uu(e, t);
      }),
      n
    );
  }
  function yh(e) {
    return ((e = Ra(e)), (e.tag = 3), e);
  }
  function ph(e, t, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = i.value;
      ((e.payload = function () {
        return u(c);
      }),
        (e.callback = function () {
          mh(t, n, i);
        }));
    }
    var d = n.stateNode;
    d !== null &&
      typeof d.componentDidCatch == "function" &&
      (e.callback = function () {
        (mh(t, n, i),
          typeof u != "function" &&
            (xa === null ? (xa = new Set([this])) : xa.add(this)));
        var m = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: m !== null ? m : ""
        });
      });
  }
  function vv(e, t, n, i, u) {
    if (
      ((n.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && xl(t, n, u, !0),
        (n = Ft.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              cn === null ? bu() : n.alternate === null && ct === 0 && (ct = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = u),
              i === Kr
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([i])) : t.add(i),
                  Qc(e, i, u)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === Kr
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([i])
                      }),
                      (n.updateQueue = t))
                    : ((n = t.retryQueue),
                      n === null ? (t.retryQueue = new Set([i])) : n.add(i)),
                  Qc(e, i, u)),
              !1
            );
        }
        throw Error(s(435, n.tag));
      }
      return (Qc(e, i, u), bu(), !1);
    }
    if (je)
      return (
        (t = Ft.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            i !== Bs && ((e = Error(s(422), { cause: i })), Ri(ln(e, n))))
          : (i !== Bs && ((t = Error(s(423), { cause: i })), Ri(ln(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (i = ln(i, n)),
            (u = bc(e.stateNode, i, u)),
            Js(e, u),
            ct !== 4 && (ct = 2)),
        !1
      );
    var c = Error(s(520), { cause: i });
    if (
      ((c = ln(c, n)),
      Vi === null ? (Vi = [c]) : Vi.push(c),
      ct !== 4 && (ct = 2),
      t === null)
    )
      return !0;
    ((i = ln(i, n)), (n = t));
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (e = u & -u),
            (n.lanes |= e),
            (e = bc(n.stateNode, i, e)),
            Js(n, e),
            !1
          );
        case 1:
          if (
            ((t = n.type),
            (c = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (c !== null &&
                  typeof c.componentDidCatch == "function" &&
                  (xa === null || !xa.has(c)))))
          )
            return (
              (n.flags |= 65536),
              (u &= -u),
              (n.lanes |= u),
              (u = yh(u)),
              ph(u, e, n, i),
              Js(n, u),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Ec = Error(s(461)),
    yt = !1;
  function Ot(e, t, n, i) {
    t.child = e === null ? Ed(t, null, n, i) : nl(t, e.child, n, i);
  }
  function vh(e, t, n, i, u) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var d = {};
      for (var m in i) m !== "ref" && (d[m] = i[m]);
    } else d = i;
    return (
      Wa(t),
      (i = tc(e, t, n, d, c, u)),
      (m = nc()),
      e !== null && !yt
        ? (ac(e, t, u), Wn(e, t, u))
        : (je && m && js(t), (t.flags |= 1), Ot(e, t, i, u), t.child)
    );
  }
  function gh(e, t, n, i, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" &&
        !zs(c) &&
        c.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = c), bh(e, t, c, i, u))
        : ((e = Vr(n.type, null, i, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !Dc(e, u))) {
      var d = c.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Ei), n(d, i) && e.ref === t.ref)
      )
        return Wn(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = Zn(c, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function bh(e, t, n, i, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ei(c, i) && e.ref === t.ref)
        if (((yt = !1), (t.pendingProps = i = c), Dc(e, u)))
          (e.flags & 131072) !== 0 && (yt = !0);
        else return ((t.lanes = e.lanes), Wn(e, t, u));
    }
    return Sc(e, t, n, i, u);
  }
  function Eh(e, t, n, i) {
    var u = i.children,
      c = e !== null ? e.memoizedState : null;
    if (
      (e === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }),
      i.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((c = c !== null ? c.baseLanes | n : n), e !== null)) {
          for (i = t.child = e.child, u = 0; i !== null;)
            ((u = u | i.lanes | i.childLanes), (i = i.sibling));
          i = u & ~c;
        } else ((i = 0), (t.child = null));
        return Sh(e, t, c, n, i);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Zr(t, c !== null ? c.cachePool : null),
          c !== null ? Rd(t, c) : Is(),
          Ad(t));
      else
        return (
          (i = t.lanes = 536870912),
          Sh(e, t, c !== null ? c.baseLanes | n : n, n, i)
        );
    } else
      c !== null
        ? (Zr(t, c.cachePool), Rd(t, c), Ca(), (t.memoizedState = null))
        : (e !== null && Zr(t, null), Is(), Ca());
    return (Ot(e, t, u, n), t.child);
  }
  function Li(e, t) {
    return (
      (e !== null && e.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }),
      t.sibling
    );
  }
  function Sh(e, t, n, i, u) {
    var c = Xs();
    return (
      (c = c === null ? null : { parent: ht._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: n, cachePool: c }),
      e !== null && Zr(t, null),
      Is(),
      Ad(t),
      e !== null && xl(e, t, i, !0),
      (t.childLanes = u),
      null
    );
  }
  function su(e, t) {
    return (
      (t = ou({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Th(e, t, n) {
    return (
      nl(t, e.child, null, n),
      (e = su(t, t.pendingProps)),
      (e.flags |= 2),
      Kt(t),
      (t.memoizedState = null),
      e
    );
  }
  function gv(e, t, n) {
    var i = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (je) {
        if (i.mode === "hidden")
          return ((e = su(t, i)), (t.lanes = 536870912), Li(null, e));
        if (
          (Ps(t),
          (e = at)
            ? ((e = Um(e, sn)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ga !== null ? { id: Nn, overflow: Cn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = id(e)),
                (n.return = t),
                (t.child = n),
                (Nt = t),
                (at = null)))
            : (e = null),
          e === null)
        )
          throw Ea(t);
        return ((t.lanes = 536870912), null);
      }
      return su(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var d = c.dehydrated;
      if ((Ps(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = Th(e, t, n)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if (
        (yt || xl(e, t, n, !1), (u = (n & e.childLanes) !== 0), yt || u)
      ) {
        if (
          ((i = et),
          i !== null && ((d = S(i, n)), d !== 0 && d !== c.retryLane))
        )
          throw ((c.retryLane = d), Ka(e, d), Qt(i, e, d), Ec);
        (bu(), (t = Th(e, t, n)));
      } else
        ((e = c.treeContext),
          (at = on(d.nextSibling)),
          (Nt = t),
          (je = !0),
          (ba = null),
          (sn = !1),
          e !== null && sd(t, e),
          (t = su(t, i)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Zn(e.child, { mode: i.mode, children: i.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function cu(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Sc(e, t, n, i, u) {
    return (
      Wa(t),
      (n = tc(e, t, n, i, void 0, u)),
      (i = nc()),
      e !== null && !yt
        ? (ac(e, t, u), Wn(e, t, u))
        : (je && i && js(t), (t.flags |= 1), Ot(e, t, n, u), t.child)
    );
  }
  function Rh(e, t, n, i, u, c) {
    return (
      Wa(t),
      (t.updateQueue = null),
      (n = Cd(t, i, n, u)),
      Nd(e),
      (i = nc()),
      e !== null && !yt
        ? (ac(e, t, c), Wn(e, t, c))
        : (je && i && js(t), (t.flags |= 1), Ot(e, t, n, c), t.child)
    );
  }
  function Ah(e, t, n, i, u) {
    if ((Wa(t), t.stateNode === null)) {
      var c = Cl,
        d = n.contextType;
      (typeof d == "object" && d !== null && (c = Ct(d)),
        (c = new n(i, c)),
        (t.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = gc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = i),
        (c.state = t.memoizedState),
        (c.refs = {}),
        Fs(t),
        (d = n.contextType),
        (c.context = typeof d == "object" && d !== null ? Ct(d) : Cl),
        (c.state = t.memoizedState),
        (d = n.getDerivedStateFromProps),
        typeof d == "function" && (vc(t, n, d, i), (c.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((d = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          d !== c.state && gc.enqueueReplaceState(c, c.state, null),
          xi(t, i, c, u),
          _i(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == "function" && (t.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      c = t.stateNode;
      var m = t.memoizedProps,
        E = ll(n, m);
      c.props = E;
      var x = c.context,
        H = n.contextType;
      ((d = Cl), typeof H == "object" && H !== null && (d = Ct(H)));
      var q = n.getDerivedStateFromProps;
      ((H =
        typeof q == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (m = t.pendingProps !== m),
        H ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((m || x !== d) && oh(t, c, i, d)),
        (Ta = !1));
      var M = t.memoizedState;
      ((c.state = M),
        xi(t, i, c, u),
        _i(),
        (x = t.memoizedState),
        m || M !== x || Ta
          ? (typeof q == "function" && (vc(t, n, q, i), (x = t.memoizedState)),
            (E = Ta || ch(t, n, E, i, M, x, d))
              ? (H ||
                  (typeof c.UNSAFE_componentWillMount != "function" &&
                    typeof c.componentWillMount != "function") ||
                  (typeof c.componentWillMount == "function" &&
                    c.componentWillMount(),
                  typeof c.UNSAFE_componentWillMount == "function" &&
                    c.UNSAFE_componentWillMount()),
                typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof c.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = i),
                (t.memoizedState = x)),
            (c.props = i),
            (c.state = x),
            (c.context = d),
            (i = E))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (i = !1)));
    } else {
      ((c = t.stateNode),
        Ks(e, t),
        (d = t.memoizedProps),
        (H = ll(n, d)),
        (c.props = H),
        (q = t.pendingProps),
        (M = c.context),
        (x = n.contextType),
        (E = Cl),
        typeof x == "object" && x !== null && (E = Ct(x)),
        (m = n.getDerivedStateFromProps),
        (x =
          typeof m == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((d !== q || M !== E) && oh(t, c, i, E)),
        (Ta = !1),
        (M = t.memoizedState),
        (c.state = M),
        xi(t, i, c, u),
        _i());
      var j = t.memoizedState;
      d !== q ||
      M !== j ||
      Ta ||
      (e !== null && e.dependencies !== null && Qr(e.dependencies))
        ? (typeof m == "function" && (vc(t, n, m, i), (j = t.memoizedState)),
          (H =
            Ta ||
            ch(t, n, H, i, M, j, E) ||
            (e !== null && e.dependencies !== null && Qr(e.dependencies)))
            ? (x ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(i, j, E),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(i, j, E)),
              typeof c.componentDidUpdate == "function" && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (d === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (d === e.memoizedProps && M === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = j)),
          (c.props = i),
          (c.state = j),
          (c.context = E),
          (i = H))
        : (typeof c.componentDidUpdate != "function" ||
            (d === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (d === e.memoizedProps && M === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return (
      (c = i),
      cu(e, t),
      (i = (t.flags & 128) !== 0),
      c || i
        ? ((c = t.stateNode),
          (n =
            i && typeof n.getDerivedStateFromError != "function"
              ? null
              : c.render()),
          (t.flags |= 1),
          e !== null && i
            ? ((t.child = nl(t, e.child, null, u)),
              (t.child = nl(t, null, n, u)))
            : Ot(e, t, n, u),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Wn(e, t, u)),
      e
    );
  }
  function Nh(e, t, n, i) {
    return ($a(), (t.flags |= 256), Ot(e, t, n, i), t.child);
  }
  var Tc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Rc(e) {
    return { baseLanes: e, cachePool: md() };
  }
  function Ac(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= $t), e);
  }
  function Ch(e, t, n) {
    var i = t.pendingProps,
      u = !1,
      c = (t.flags & 128) !== 0,
      d;
    if (
      ((d = c) ||
        (d =
          e !== null && e.memoizedState === null ? !1 : (ot.current & 2) !== 0),
      d && ((u = !0), (t.flags &= -129)),
      (d = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (je) {
        if (
          (u ? Na(t) : Ca(),
          (e = at)
            ? ((e = Um(e, sn)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ga !== null ? { id: Nn, overflow: Cn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = id(e)),
                (n.return = t),
                (t.child = n),
                (Nt = t),
                (at = null)))
            : (e = null),
          e === null)
        )
          throw Ea(t);
        return (ro(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var m = i.children;
      return (
        (i = i.fallback),
        u
          ? (Ca(),
            (u = t.mode),
            (m = ou({ mode: "hidden", children: m }, u)),
            (i = Ja(i, u, n, null)),
            (m.return = t),
            (i.return = t),
            (m.sibling = i),
            (t.child = m),
            (i = t.child),
            (i.memoizedState = Rc(n)),
            (i.childLanes = Ac(e, d, n)),
            (t.memoizedState = Tc),
            Li(null, i))
          : (Na(t), Nc(t, m))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((m = E.dehydrated), m !== null)) {
      if (c)
        t.flags & 256
          ? (Na(t), (t.flags &= -257), (t = Cc(e, t, n)))
          : t.memoizedState !== null
            ? (Ca(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Ca(),
              (m = i.fallback),
              (u = t.mode),
              (i = ou({ mode: "visible", children: i.children }, u)),
              (m = Ja(m, u, n, null)),
              (m.flags |= 2),
              (i.return = t),
              (m.return = t),
              (i.sibling = m),
              (t.child = i),
              nl(t, e.child, null, n),
              (i = t.child),
              (i.memoizedState = Rc(n)),
              (i.childLanes = Ac(e, d, n)),
              (t.memoizedState = Tc),
              (t = Li(null, i)));
      else if ((Na(t), ro(m))) {
        if (((d = m.nextSibling && m.nextSibling.dataset), d)) var x = d.dgst;
        ((d = x),
          (i = Error(s(419))),
          (i.stack = ""),
          (i.digest = d),
          Ri({ value: i, source: null, stack: null }),
          (t = Cc(e, t, n)));
      } else if (
        (yt || xl(e, t, n, !1), (d = (n & e.childLanes) !== 0), yt || d)
      ) {
        if (
          ((d = et),
          d !== null && ((i = S(d, n)), i !== 0 && i !== E.retryLane))
        )
          throw ((E.retryLane = i), Ka(e, i), Qt(d, e, i), Ec);
        (io(m) || bu(), (t = Cc(e, t, n)));
      } else
        io(m)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (at = on(m.nextSibling)),
            (Nt = t),
            (je = !0),
            (ba = null),
            (sn = !1),
            e !== null && sd(t, e),
            (t = Nc(t, i.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Ca(),
        (m = i.fallback),
        (u = t.mode),
        (E = e.child),
        (x = E.sibling),
        (i = Zn(E, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = E.subtreeFlags & 65011712),
        x !== null ? (m = Zn(x, m)) : ((m = Ja(m, u, n, null)), (m.flags |= 2)),
        (m.return = t),
        (i.return = t),
        (i.sibling = m),
        (t.child = i),
        Li(null, i),
        (i = t.child),
        (m = e.child.memoizedState),
        m === null
          ? (m = Rc(n))
          : ((u = m.cachePool),
            u !== null
              ? ((E = ht._currentValue),
                (u = u.parent !== E ? { parent: E, pool: E } : u))
              : (u = md()),
            (m = { baseLanes: m.baseLanes | n, cachePool: u })),
        (i.memoizedState = m),
        (i.childLanes = Ac(e, d, n)),
        (t.memoizedState = Tc),
        Li(e.child, i))
      : (Na(t),
        (n = e.child),
        (e = n.sibling),
        (n = Zn(n, { mode: "visible", children: i.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((d = t.deletions),
          d === null ? ((t.deletions = [e]), (t.flags |= 16)) : d.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Nc(e, t) {
    return (
      (t = ou({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ou(e, t) {
    return ((e = Zt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Cc(e, t, n) {
    return (
      nl(t, e.child, null, n),
      (e = Nc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Oh(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    (i !== null && (i.lanes |= t), Ys(e.return, t, n));
  }
  function Oc(e, t, n, i, u, c) {
    var d = e.memoizedState;
    d === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: u,
          treeForkCount: c
        })
      : ((d.isBackwards = t),
        (d.rendering = null),
        (d.renderingStartTime = 0),
        (d.last = i),
        (d.tail = n),
        (d.tailMode = u),
        (d.treeForkCount = c));
  }
  function Dh(e, t, n) {
    var i = t.pendingProps,
      u = i.revealOrder,
      c = i.tail;
    i = i.children;
    var d = ot.current,
      m = (d & 2) !== 0;
    if (
      (m ? ((d = (d & 1) | 2), (t.flags |= 128)) : (d &= 1),
      K(ot, d),
      Ot(e, t, i, n),
      (i = je ? Ti : 0),
      !m && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && Oh(e, n, t);
        else if (e.tag === 19) Oh(e, n, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    switch (u) {
      case "forwards":
        for (n = t.child, u = null; n !== null;)
          ((e = n.alternate),
            e !== null && Wr(e) === null && (u = n),
            (n = n.sibling));
        ((n = u),
          n === null
            ? ((u = t.child), (t.child = null))
            : ((u = n.sibling), (n.sibling = null)),
          Oc(t, !1, u, n, c, i));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, u = t.child, t.child = null; u !== null;) {
          if (((e = u.alternate), e !== null && Wr(e) === null)) {
            t.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = n), (n = u), (u = e));
        }
        Oc(t, !0, n, null, c, i);
        break;
      case "together":
        Oc(t, !1, null, null, void 0, i);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Wn(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (_a |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((xl(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Zn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = Zn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Dc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Qr(e)));
  }
  function bv(e, t, n) {
    switch (t.tag) {
      case 3:
        (dt(t, t.stateNode.containerInfo),
          Sa(t, ht, e.memoizedState.cache),
          $a());
        break;
      case 27:
      case 5:
        Ya(t);
        break;
      case 4:
        dt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Sa(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Ps(t), null);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Na(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Ch(e, t, n)
              : (Na(t), (e = Wn(e, t, n)), e !== null ? e.sibling : null);
        Na(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((i = (n & t.childLanes) !== 0),
          i || (xl(e, t, n, !1), (i = (n & t.childLanes) !== 0)),
          u)
        ) {
          if (i) return Dh(e, t, n);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          K(ot, ot.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Eh(e, t, n, t.pendingProps));
      case 24:
        Sa(t, ht, e.memoizedState.cache);
    }
    return Wn(e, t, n);
  }
  function _h(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) yt = !0;
      else {
        if (!Dc(e, n) && (t.flags & 128) === 0) return ((yt = !1), bv(e, t, n));
        yt = (e.flags & 131072) !== 0;
      }
    else ((yt = !1), je && (t.flags & 1048576) !== 0 && ud(t, Ti, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (((e = el(t.elementType)), (t.type = e), typeof e == "function"))
            zs(e)
              ? ((i = ll(e, i)), (t.tag = 1), (t = Ah(null, t, e, i, n)))
              : ((t.tag = 0), (t = Sc(null, t, e, i, n)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === oe) {
                ((t.tag = 11), (t = vh(null, t, e, i, n)));
                break e;
              } else if (u === J) {
                ((t.tag = 14), (t = gh(null, t, e, i, n)));
                break e;
              }
            }
            throw ((t = rt(e) || e), Error(s(306, t, "")));
          }
        }
        return t;
      case 0:
        return Sc(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((i = t.type), (u = ll(i, t.pendingProps)), Ah(e, t, i, u, n));
      case 3:
        e: {
          if ((dt(t, t.stateNode.containerInfo), e === null))
            throw Error(s(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), Ks(e, t), xi(t, i, null, n));
          var d = t.memoizedState;
          if (
            ((i = d.cache),
            Sa(t, ht, i),
            i !== c.cache && Vs(t, [ht], n, !0),
            _i(),
            (i = d.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: i, isDehydrated: !1, cache: d.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = Nh(e, t, i, n);
              break e;
            } else if (i !== u) {
              ((u = ln(Error(s(424)), t)), Ri(u), (t = Nh(e, t, i, n)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  at = on(e.firstChild),
                  Nt = t,
                  je = !0,
                  ba = null,
                  sn = !0,
                  n = Ed(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if (($a(), i === u)) {
              t = Wn(e, t, n);
              break e;
            }
            Ot(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          cu(e, t),
          e === null
            ? (n = qm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : je ||
                ((n = t.type),
                (e = t.pendingProps),
                (i = Cu(ye.current).createElement(n)),
                (i[ee] = t),
                (i[$] = e),
                Dt(i, n, e),
                Ve(i),
                (t.stateNode = i))
            : (t.memoizedState = qm(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ya(t),
          e === null &&
            je &&
            ((i = t.stateNode = Hm(t.type, t.pendingProps, ye.current)),
            (Nt = t),
            (sn = !0),
            (u = at),
            Ua(t.type) ? ((uo = u), (at = on(i.firstChild))) : (at = u)),
          Ot(e, t, t.pendingProps.children, n),
          cu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            je &&
            ((u = i = at) &&
              ((i = Jv(i, t.type, t.pendingProps, sn)),
              i !== null
                ? ((t.stateNode = i),
                  (Nt = t),
                  (at = on(i.firstChild)),
                  (sn = !1),
                  (u = !0))
                : (u = !1)),
            u || Ea(t)),
          Ya(t),
          (u = t.type),
          (c = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (i = c.children),
          no(u, c) ? (i = null) : d !== null && no(u, d) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = tc(e, t, ov, null, null, n)), ($i._currentValue = u)),
          cu(e, t),
          Ot(e, t, i, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            je &&
            ((e = n = at) &&
              ((n = $v(n, t.pendingProps, sn)),
              n !== null
                ? ((t.stateNode = n), (Nt = t), (at = null), (e = !0))
                : (e = !1)),
            e || Ea(t)),
          null
        );
      case 13:
        return Ch(e, t, n);
      case 4:
        return (
          dt(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = nl(t, null, i, n)) : Ot(e, t, i, n),
          t.child
        );
      case 11:
        return vh(e, t, t.type, t.pendingProps, n);
      case 7:
        return (Ot(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Ot(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Ot(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (i = t.pendingProps),
          Sa(t, t.type, i.value),
          Ot(e, t, i.children, n),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (i = t.pendingProps.children),
          Wa(t),
          (u = Ct(u)),
          (i = i(u)),
          (t.flags |= 1),
          Ot(e, t, i, n),
          t.child
        );
      case 14:
        return gh(e, t, t.type, t.pendingProps, n);
      case 15:
        return bh(e, t, t.type, t.pendingProps, n);
      case 19:
        return Dh(e, t, n);
      case 31:
        return gv(e, t, n);
      case 22:
        return Eh(e, t, n, t.pendingProps);
      case 24:
        return (
          Wa(t),
          (i = Ct(ht)),
          e === null
            ? ((u = Xs()),
              u === null &&
                ((u = et),
                (c = Gs()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= n),
                (u = c)),
              (t.memoizedState = { parent: i, cache: u }),
              Fs(t),
              Sa(t, ht, u))
            : ((e.lanes & n) !== 0 && (Ks(e, t), xi(t, null, null, n), _i()),
              (u = e.memoizedState),
              (c = t.memoizedState),
              u.parent !== i
                ? ((u = { parent: i, cache: i }),
                  (t.memoizedState = u),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = u),
                  Sa(t, ht, i))
                : ((i = c.cache),
                  Sa(t, ht, i),
                  i !== u.cache && Vs(t, [ht], n, !0))),
          Ot(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Pn(e) {
    e.flags |= 4;
  }
  function _c(e, t, n, i, u) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (nm()) e.flags |= 8192;
        else throw ((tl = Kr), Zs);
    } else e.flags &= -16777217;
  }
  function xh(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Xm(t)))
      if (nm()) e.flags |= 8192;
      else throw ((tl = Kr), Zs);
  }
  function fu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? di() : 536870912), (e.lanes |= t), (Vl |= t)));
  }
  function ji(e, t) {
    if (!je)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null;)
            (t.alternate !== null && (n = t), (t = t.sibling));
          n === null ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var i = null; n !== null;)
            (n.alternate !== null && (i = n), (n = n.sibling));
          i === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (i.sibling = null);
      }
  }
  function lt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      i = 0;
    if (t)
      for (var u = e.child; u !== null;)
        ((n |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags & 65011712),
          (i |= u.flags & 65011712),
          (u.return = e),
          (u = u.sibling));
    else
      for (u = e.child; u !== null;)
        ((n |= u.lanes | u.childLanes),
          (i |= u.subtreeFlags),
          (i |= u.flags),
          (u.return = e),
          (u = u.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = n), t);
  }
  function Ev(e, t, n) {
    var i = t.pendingProps;
    switch ((Hs(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (lt(t), null);
      case 1:
        return (lt(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          t.memoizedState.cache !== i && (t.flags |= 2048),
          Jn(ht),
          Pe(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (_l(t)
              ? Pn(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), ks())),
          lt(t),
          null
        );
      case 26:
        var u = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Pn(t),
              c !== null ? (lt(t), xh(t, c)) : (lt(t), _c(t, u, null, i, n)))
            : c
              ? c !== e.memoizedState
                ? (Pn(t), lt(t), xh(t, c))
                : (lt(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== i && Pn(t),
                lt(t),
                _c(t, u, e, i, n)),
          null
        );
      case 27:
        if (
          (hl(t),
          (n = ye.current),
          (u = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== i && Pn(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(s(166));
            return (lt(t), null);
          }
          ((e = W.current),
            _l(t) ? cd(t) : ((e = Hm(u, i, n)), (t.stateNode = e), Pn(t)));
        }
        return (lt(t), null);
      case 5:
        if ((hl(t), (u = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== i && Pn(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(s(166));
            return (lt(t), null);
          }
          if (((c = W.current), _l(t))) cd(t);
          else {
            var d = Cu(ye.current);
            switch (c) {
              case 1:
                c = d.createElementNS("http://www.w3.org/2000/svg", u);
                break;
              case 2:
                c = d.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                break;
              default:
                switch (u) {
                  case "svg":
                    c = d.createElementNS("http://www.w3.org/2000/svg", u);
                    break;
                  case "math":
                    c = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    ((c = d.createElement("div")),
                      (c.innerHTML = "<script><\/script>"),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case "select":
                    ((c =
                      typeof i.is == "string"
                        ? d.createElement("select", { is: i.is })
                        : d.createElement("select")),
                      i.multiple
                        ? (c.multiple = !0)
                        : i.size && (c.size = i.size));
                    break;
                  default:
                    c =
                      typeof i.is == "string"
                        ? d.createElement(u, { is: i.is })
                        : d.createElement(u);
                }
            }
            ((c[ee] = t), (c[$] = i));
            e: for (d = t.child; d !== null;) {
              if (d.tag === 5 || d.tag === 6) c.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                ((d.child.return = d), (d = d.child));
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null;) {
                if (d.return === null || d.return === t) break e;
                d = d.return;
              }
              ((d.sibling.return = d.return), (d = d.sibling));
            }
            t.stateNode = c;
            e: switch ((Dt(c, u, i), u)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && Pn(t);
          }
        }
        return (
          lt(t),
          _c(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && Pn(t);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(s(166));
          if (((e = ye.current), _l(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (i = null),
              (u = Nt),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            ((e[ee] = t),
              (e = !!(
                e.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                Cm(e.nodeValue, n)
              )),
              e || Ea(t, !0));
          } else
            ((e = Cu(e).createTextNode(i)), (e[ee] = t), (t.stateNode = e));
        }
        return (lt(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((i = _l(t)), n !== null)) {
            if (e === null) {
              if (!i) throw Error(s(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(s(557));
              e[ee] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (lt(t), (e = !1));
          } else
            ((n = ks()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (Kt(t), t) : (Kt(t), null);
          if ((t.flags & 128) !== 0) throw Error(s(558));
        }
        return (lt(t), null);
      case 13:
        if (
          ((i = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((u = _l(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!u) throw Error(s(318));
              if (
                ((u = t.memoizedState),
                (u = u !== null ? u.dehydrated : null),
                !u)
              )
                throw Error(s(317));
              u[ee] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (lt(t), (u = !1));
          } else
            ((u = ks()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = u),
              (u = !0));
          if (!u) return t.flags & 256 ? (Kt(t), t) : (Kt(t), null);
        }
        return (
          Kt(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = i !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((i = t.child),
                (u = null),
                i.alternate !== null &&
                  i.alternate.memoizedState !== null &&
                  i.alternate.memoizedState.cachePool !== null &&
                  (u = i.alternate.memoizedState.cachePool.pool),
                (c = null),
                i.memoizedState !== null &&
                  i.memoizedState.cachePool !== null &&
                  (c = i.memoizedState.cachePool.pool),
                c !== u && (i.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              fu(t, t.updateQueue),
              lt(t),
              null)
        );
      case 4:
        return (Pe(), e === null && Ic(t.stateNode.containerInfo), lt(t), null);
      case 10:
        return (Jn(t.type), lt(t), null);
      case 19:
        if ((B(ot), (i = t.memoizedState), i === null)) return (lt(t), null);
        if (((u = (t.flags & 128) !== 0), (c = i.rendering), c === null))
          if (u) ji(i, !1);
          else {
            if (ct !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null;) {
                if (((c = Wr(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      ji(i, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      fu(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;
                  )
                    (ld(n, e), (n = n.sibling));
                  return (
                    K(ot, (ot.current & 1) | 2),
                    je && Fn(t, i.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            i.tail !== null &&
              Mt() > pu &&
              ((t.flags |= 128), (u = !0), ji(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((e = Wr(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                fu(t, e),
                ji(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !c.alternate &&
                  !je)
              )
                return (lt(t), null);
            } else
              2 * Mt() - i.renderingStartTime > pu &&
                n !== 536870912 &&
                ((t.flags |= 128), (u = !0), ji(i, !1), (t.lanes = 4194304));
          i.isBackwards
            ? ((c.sibling = t.child), (t.child = c))
            : ((e = i.last),
              e !== null ? (e.sibling = c) : (t.child = c),
              (i.last = c));
        }
        return i.tail !== null
          ? ((e = i.tail),
            (i.rendering = e),
            (i.tail = e.sibling),
            (i.renderingStartTime = Mt()),
            (e.sibling = null),
            (n = ot.current),
            K(ot, u ? (n & 1) | 2 : n & 1),
            je && Fn(t, i.treeForkCount),
            e)
          : (lt(t), null);
      case 22:
      case 23:
        return (
          Kt(t),
          Ws(),
          (i = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== i && (t.flags |= 8192)
            : i && (t.flags |= 8192),
          i
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (lt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : lt(t),
          (n = t.updateQueue),
          n !== null && fu(t, n.retryQueue),
          (n = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (n = e.memoizedState.cachePool.pool),
          (i = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (i = t.memoizedState.cachePool.pool),
          i !== n && (t.flags |= 2048),
          e !== null && B(Pa),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Jn(ht),
          lt(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Sv(e, t) {
    switch ((Hs(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Jn(ht),
          Pe(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (hl(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Kt(t), t.alternate === null)) throw Error(s(340));
          $a();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (Kt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(s(340));
          $a();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (B(ot), null);
      case 4:
        return (Pe(), null);
      case 10:
        return (Jn(t.type), null);
      case 22:
      case 23:
        return (
          Kt(t),
          Ws(),
          e !== null && B(Pa),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Jn(ht), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wh(e, t) {
    switch ((Hs(t), t.tag)) {
      case 3:
        (Jn(ht), Pe());
        break;
      case 26:
      case 27:
      case 5:
        hl(t);
        break;
      case 4:
        Pe();
        break;
      case 31:
        t.memoizedState !== null && Kt(t);
        break;
      case 13:
        Kt(t);
        break;
      case 19:
        B(ot);
        break;
      case 10:
        Jn(t.type);
        break;
      case 22:
      case 23:
        (Kt(t), Ws(), e !== null && B(Pa));
        break;
      case 24:
        Jn(ht);
    }
  }
  function Hi(e, t) {
    try {
      var n = t.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var c = n.create,
              d = n.inst;
            ((i = c()), (d.destroy = i));
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (m) {
      Ke(t, t.return, m);
    }
  }
  function Oa(e, t, n) {
    try {
      var i = t.updateQueue,
        u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var c = u.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var d = i.inst,
              m = d.destroy;
            if (m !== void 0) {
              ((d.destroy = void 0), (u = t));
              var E = n,
                x = m;
              try {
                x();
              } catch (H) {
                Ke(u, E, H);
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (H) {
      Ke(t, t.return, H);
    }
  }
  function Mh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Td(t, n);
      } catch (i) {
        Ke(e, e.return, i);
      }
    }
  }
  function zh(e, t, n) {
    ((n.props = ll(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      Ke(e, t, i);
    }
  }
  function Bi(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? (e.refCleanup = n(i)) : (n.current = i);
      }
    } catch (u) {
      Ke(e, t, u);
    }
  }
  function On(e, t) {
    var n = e.ref,
      i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Ke(e, t, u);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Ke(e, t, u);
        }
      else n.current = null;
  }
  function Uh(e) {
    var t = e.type,
      n = e.memoizedProps,
      i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? (i.src = n.src) : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function xc(e, t, n) {
    try {
      var i = e.stateNode;
      (Gv(i, e.type, n, t), (i[$] = t));
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function Lh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ua(e.type)) ||
      e.tag === 4
    );
  }
  function wc(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || Lh(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Ua(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Mc(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode),
        t
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n
            ).insertBefore(e, t)
          : ((t =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                  ? n.ownerDocument.body
                  : n),
            t.appendChild(e),
            (n = n._reactRootContainer),
            n != null || t.onclick !== null || (t.onclick = Qn)));
    else if (
      i !== 4 &&
      (i === 27 && Ua(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Mc(e, t, n), e = e.sibling; e !== null;)
        (Mc(e, t, n), (e = e.sibling));
  }
  function du(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      i !== 4 &&
      (i === 27 && Ua(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (du(e, t, n), e = e.sibling; e !== null;)
        (du(e, t, n), (e = e.sibling));
  }
  function jh(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var i = e.type, u = t.attributes; u.length;)
        t.removeAttributeNode(u[0]);
      (Dt(t, i, n), (t[ee] = e), (t[$] = n));
    } catch (c) {
      Ke(e, e.return, c);
    }
  }
  var ea = !1,
    pt = !1,
    zc = !1,
    Hh = typeof WeakSet == "function" ? WeakSet : Set,
    Tt = null;
  function Tv(e, t) {
    if (((e = e.containerInfo), (eo = zu), (e = Jf(e)), Cs(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var u = i.anchorOffset,
              c = i.focusNode;
            i = i.focusOffset;
            try {
              (n.nodeType, c.nodeType);
            } catch {
              n = null;
              break e;
            }
            var d = 0,
              m = -1,
              E = -1,
              x = 0,
              H = 0,
              q = e,
              M = null;
            t: for (;;) {
              for (
                var j;
                q !== n || (u !== 0 && q.nodeType !== 3) || (m = d + u),
                  q !== c || (i !== 0 && q.nodeType !== 3) || (E = d + i),
                  q.nodeType === 3 && (d += q.nodeValue.length),
                  (j = q.firstChild) !== null;
              )
                ((M = q), (q = j));
              for (;;) {
                if (q === e) break t;
                if (
                  (M === n && ++x === u && (m = d),
                  M === c && ++H === i && (E = d),
                  (j = q.nextSibling) !== null)
                )
                  break;
                ((q = M), (M = q.parentNode));
              }
              q = j;
            }
            n = m === -1 || E === -1 ? null : { start: m, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      to = { focusedElem: e, selectionRange: n }, zu = !1, Tt = t;
      Tt !== null;
    )
      if (
        ((t = Tt), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)
      )
        ((e.return = t), (Tt = e));
      else
        for (; Tt !== null;) {
          switch (((t = Tt), (c = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              if (
                (e & 4) !== 0 &&
                ((e = t.updateQueue),
                (e = e !== null ? e.events : null),
                e !== null)
              )
                for (n = 0; n < e.length; n++)
                  ((u = e[n]), (u.ref.impl = u.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (n = t),
                  (u = c.memoizedProps),
                  (c = c.memoizedState),
                  (i = n.stateNode));
                try {
                  var le = ll(n.type, u);
                  ((e = i.getSnapshotBeforeUpdate(le, c)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (pe) {
                  Ke(n, n.return, pe);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  lo(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      lo(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Tt = e));
            break;
          }
          Tt = t.return;
        }
  }
  function Bh(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (na(e, n), i & 4 && Hi(5, n));
        break;
      case 1:
        if ((na(e, n), i & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (d) {
              Ke(n, n.return, d);
            }
          else {
            var u = ll(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(u, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (d) {
              Ke(n, n.return, d);
            }
          }
        (i & 64 && Mh(n), i & 512 && Bi(n, n.return));
        break;
      case 3:
        if ((na(e, n), i & 64 && ((e = n.updateQueue), e !== null))) {
          if (((t = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Td(e, t);
          } catch (d) {
            Ke(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && i & 4 && jh(n);
      case 26:
      case 5:
        (na(e, n), t === null && i & 4 && Uh(n), i & 512 && Bi(n, n.return));
        break;
      case 12:
        na(e, n);
        break;
      case 31:
        (na(e, n), i & 4 && Yh(e, n));
        break;
      case 13:
        (na(e, n),
          i & 4 && Vh(e, n),
          i & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = wv.bind(null, n)), Iv(e, n)))));
        break;
      case 22:
        if (((i = n.memoizedState !== null || ea), !i)) {
          ((t = (t !== null && t.memoizedState !== null) || pt), (u = ea));
          var c = pt;
          ((ea = i),
            (pt = t) && !c ? aa(e, n, (n.subtreeFlags & 8772) !== 0) : na(e, n),
            (ea = u),
            (pt = c));
        }
        break;
      case 30:
        break;
      default:
        na(e, n);
    }
  }
  function kh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), kh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && ke(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var it = null,
    qt = !1;
  function ta(e, t, n) {
    for (n = n.child; n !== null;) (qh(e, t, n), (n = n.sibling));
  }
  function qh(e, t, n) {
    if (zt && typeof zt.onCommitFiberUnmount == "function")
      try {
        zt.onCommitFiberUnmount(Hn, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (pt || On(n, t),
          ta(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        pt || On(n, t);
        var i = it,
          u = qt;
        (Ua(n.type) && ((it = n.stateNode), (qt = !1)),
          ta(e, t, n),
          Fi(n.stateNode),
          (it = i),
          (qt = u));
        break;
      case 5:
        pt || On(n, t);
      case 6:
        if (
          ((i = it),
          (u = qt),
          (it = null),
          ta(e, t, n),
          (it = i),
          (qt = u),
          it !== null)
        )
          if (qt)
            try {
              (it.nodeType === 9
                ? it.body
                : it.nodeName === "HTML"
                  ? it.ownerDocument.body
                  : it
              ).removeChild(n.stateNode);
            } catch (c) {
              Ke(n, t, c);
            }
          else
            try {
              it.removeChild(n.stateNode);
            } catch (c) {
              Ke(n, t, c);
            }
        break;
      case 18:
        it !== null &&
          (qt
            ? ((e = it),
              Mm(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                n.stateNode
              ),
              $l(e))
            : Mm(it, n.stateNode));
        break;
      case 4:
        ((i = it),
          (u = qt),
          (it = n.stateNode.containerInfo),
          (qt = !0),
          ta(e, t, n),
          (it = i),
          (qt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Oa(2, n, t), pt || Oa(4, n, t), ta(e, t, n));
        break;
      case 1:
        (pt ||
          (On(n, t),
          (i = n.stateNode),
          typeof i.componentWillUnmount == "function" && zh(n, t, i)),
          ta(e, t, n));
        break;
      case 21:
        ta(e, t, n);
        break;
      case 22:
        ((pt = (i = pt) || n.memoizedState !== null), ta(e, t, n), (pt = i));
        break;
      default:
        ta(e, t, n);
    }
  }
  function Yh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        $l(e);
      } catch (n) {
        Ke(t, t.return, n);
      }
    }
  }
  function Vh(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        $l(e);
      } catch (n) {
        Ke(t, t.return, n);
      }
  }
  function Rv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Hh()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Hh()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function hu(e, t) {
    var n = Rv(e);
    t.forEach(function (i) {
      if (!n.has(i)) {
        n.add(i);
        var u = Mv.bind(null, e, i);
        i.then(u, u);
      }
    });
  }
  function Yt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i],
          c = e,
          d = t,
          m = d;
        e: for (; m !== null;) {
          switch (m.tag) {
            case 27:
              if (Ua(m.type)) {
                ((it = m.stateNode), (qt = !1));
                break e;
              }
              break;
            case 5:
              ((it = m.stateNode), (qt = !1));
              break e;
            case 3:
            case 4:
              ((it = m.stateNode.containerInfo), (qt = !0));
              break e;
          }
          m = m.return;
        }
        if (it === null) throw Error(s(160));
        (qh(c, d, u),
          (it = null),
          (qt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null;) (Gh(t, e), (t = t.sibling));
  }
  var gn = null;
  function Gh(e, t) {
    var n = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Yt(t, e),
          Vt(e),
          i & 4 && (Oa(3, e, e.return), Hi(3, e), Oa(5, e, e.return)));
        break;
      case 1:
        (Yt(t, e),
          Vt(e),
          i & 512 && (pt || n === null || On(n, n.return)),
          i & 64 &&
            ea &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
        break;
      case 26:
        var u = gn;
        if (
          (Yt(t, e),
          Vt(e),
          i & 512 && (pt || n === null || On(n, n.return)),
          i & 4)
        ) {
          var c = n !== null ? n.memoizedState : null;
          if (((i = e.memoizedState), n === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ((i = e.type),
                    (n = e.memoizedProps),
                    (u = u.ownerDocument || u));
                  t: switch (i) {
                    case "title":
                      ((c = u.getElementsByTagName("title")[0]),
                        (!c ||
                          c[Ze] ||
                          c[ee] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = u.createElement(i)),
                          u.head.insertBefore(
                            c,
                            u.querySelector("head > title")
                          )),
                        Dt(c, i, n),
                        (c[ee] = e),
                        Ve(c),
                        (i = c));
                      break e;
                    case "link":
                      var d = Gm("link", "href", u).get(i + (n.href || ""));
                      if (d) {
                        for (var m = 0; m < d.length; m++)
                          if (
                            ((c = d[m]),
                            c.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              c.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              c.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              c.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      ((c = u.createElement(i)),
                        Dt(c, i, n),
                        u.head.appendChild(c));
                      break;
                    case "meta":
                      if (
                        (d = Gm("meta", "content", u).get(
                          i + (n.content || "")
                        ))
                      ) {
                        for (m = 0; m < d.length; m++)
                          if (
                            ((c = d[m]),
                            c.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              c.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              c.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              c.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              c.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            d.splice(m, 1);
                            break t;
                          }
                      }
                      ((c = u.createElement(i)),
                        Dt(c, i, n),
                        u.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, i));
                  }
                  ((c[ee] = e), Ve(c), (i = c));
                }
                e.stateNode = i;
              } else Qm(u, e.type, e.stateNode);
            else e.stateNode = Vm(u, i, e.memoizedProps);
          else
            c !== i
              ? (c === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : c.count--,
                i === null
                  ? Qm(u, e.type, e.stateNode)
                  : Vm(u, i, e.memoizedProps))
              : i === null &&
                e.stateNode !== null &&
                xc(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Yt(t, e),
          Vt(e),
          i & 512 && (pt || n === null || On(n, n.return)),
          n !== null && i & 4 && xc(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (Yt(t, e),
          Vt(e),
          i & 512 && (pt || n === null || On(n, n.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            bl(u, "");
          } catch (le) {
            Ke(e, e.return, le);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), xc(e, u, n !== null ? n.memoizedProps : u)),
          i & 1024 && (zc = !0));
        break;
      case 6:
        if ((Yt(t, e), Vt(e), i & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((i = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = i;
          } catch (le) {
            Ke(e, e.return, le);
          }
        }
        break;
      case 3:
        if (
          ((_u = null),
          (u = gn),
          (gn = Ou(t.containerInfo)),
          Yt(t, e),
          (gn = u),
          Vt(e),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            $l(t.containerInfo);
          } catch (le) {
            Ke(e, e.return, le);
          }
        zc && ((zc = !1), Qh(e));
        break;
      case 4:
        ((i = gn),
          (gn = Ou(e.stateNode.containerInfo)),
          Yt(t, e),
          Vt(e),
          (gn = i));
        break;
      case 12:
        (Yt(t, e), Vt(e));
        break;
      case 31:
        (Yt(t, e),
          Vt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), hu(e, i))));
        break;
      case 13:
        (Yt(t, e),
          Vt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (yu = Mt()),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), hu(e, i))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null,
          x = ea,
          H = pt;
        if (
          ((ea = x || u),
          (pt = H || E),
          Yt(t, e),
          (pt = H),
          (ea = x),
          Vt(e),
          i & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = u ? t._visibility & -2 : t._visibility | 1,
              u && (n === null || E || ea || pt || il(e)),
              n = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                E = n = t;
                try {
                  if (((c = E.stateNode), u))
                    ((d = c.style),
                      typeof d.setProperty == "function"
                        ? d.setProperty("display", "none", "important")
                        : (d.display = "none"));
                  else {
                    m = E.stateNode;
                    var q = E.memoizedProps.style,
                      M =
                        q != null && q.hasOwnProperty("display")
                          ? q.display
                          : null;
                    m.style.display =
                      M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (le) {
                  Ke(E, E.return, le);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = u ? "" : E.memoizedProps;
                } catch (le) {
                  Ke(E, E.return, le);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                E = t;
                try {
                  var j = E.stateNode;
                  u ? zm(j, !0) : zm(E.stateNode, !1);
                } catch (le) {
                  Ke(E, E.return, le);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null;) {
              if (t.return === null || t.return === e) break e;
              (n === t && (n = null), (t = t.return));
            }
            (n === t && (n = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        i & 4 &&
          ((i = e.updateQueue),
          i !== null &&
            ((n = i.retryQueue),
            n !== null && ((i.retryQueue = null), hu(e, n))));
        break;
      case 19:
        (Yt(t, e),
          Vt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), hu(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Yt(t, e), Vt(e));
    }
  }
  function Vt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null;) {
          if (Lh(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode,
              c = wc(e);
            du(e, c, u);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (bl(d, ""), (n.flags &= -33));
            var m = wc(e);
            du(e, m, d);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo,
              x = wc(e);
            Mc(e, x, E);
            break;
          default:
            throw Error(s(161));
        }
      } catch (H) {
        Ke(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Qh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var t = e;
        (Qh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function na(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null;) (Bh(e, t.alternate, t), (t = t.sibling));
  }
  function il(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Oa(4, t, t.return), il(t));
          break;
        case 1:
          On(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && zh(t, t.return, n),
            il(t));
          break;
        case 27:
          Fi(t.stateNode);
        case 26:
        case 5:
          (On(t, t.return), il(t));
          break;
        case 22:
          t.memoizedState === null && il(t);
          break;
        case 30:
          il(t);
          break;
        default:
          il(t);
      }
      e = e.sibling;
    }
  }
  function aa(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
      var i = t.alternate,
        u = e,
        c = t,
        d = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (aa(u, c, n), Hi(4, c));
          break;
        case 1:
          if (
            (aa(u, c, n),
            (i = c),
            (u = i.stateNode),
            typeof u.componentDidMount == "function")
          )
            try {
              u.componentDidMount();
            } catch (x) {
              Ke(i, i.return, x);
            }
          if (((i = c), (u = i.updateQueue), u !== null)) {
            var m = i.stateNode;
            try {
              var E = u.shared.hiddenCallbacks;
              if (E !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < E.length; u++)
                  Sd(E[u], m);
            } catch (x) {
              Ke(i, i.return, x);
            }
          }
          (n && d & 64 && Mh(c), Bi(c, c.return));
          break;
        case 27:
          jh(c);
        case 26:
        case 5:
          (aa(u, c, n), n && i === null && d & 4 && Uh(c), Bi(c, c.return));
          break;
        case 12:
          aa(u, c, n);
          break;
        case 31:
          (aa(u, c, n), n && d & 4 && Yh(u, c));
          break;
        case 13:
          (aa(u, c, n), n && d & 4 && Vh(u, c));
          break;
        case 22:
          (c.memoizedState === null && aa(u, c, n), Bi(c, c.return));
          break;
        case 30:
          break;
        default:
          aa(u, c, n);
      }
      t = t.sibling;
    }
  }
  function Uc(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && Ai(n)));
  }
  function Lc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ai(e)));
  }
  function bn(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) (Xh(e, t, n, i), (t = t.sibling));
  }
  function Xh(e, t, n, i) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (bn(e, t, n, i), u & 2048 && Hi(9, t));
        break;
      case 1:
        bn(e, t, n, i);
        break;
      case 3:
        (bn(e, t, n, i),
          u & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ai(e))));
        break;
      case 12:
        if (u & 2048) {
          (bn(e, t, n, i), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              d = c.id,
              m = c.onPostCommit;
            typeof m == "function" &&
              m(
                d,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (E) {
            Ke(t, t.return, E);
          }
        } else bn(e, t, n, i);
        break;
      case 31:
        bn(e, t, n, i);
        break;
      case 13:
        bn(e, t, n, i);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (d = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? bn(e, t, n, i)
              : ki(e, t)
            : c._visibility & 2
              ? bn(e, t, n, i)
              : ((c._visibility |= 2),
                kl(e, t, n, i, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && Uc(d, t));
        break;
      case 24:
        (bn(e, t, n, i), u & 2048 && Lc(t.alternate, t));
        break;
      default:
        bn(e, t, n, i);
    }
  }
  function kl(e, t, n, i, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var c = e,
        d = t,
        m = n,
        E = i,
        x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (kl(c, d, m, E, u), Hi(8, d));
          break;
        case 23:
          break;
        case 22:
          var H = d.stateNode;
          (d.memoizedState !== null
            ? H._visibility & 2
              ? kl(c, d, m, E, u)
              : ki(c, d)
            : ((H._visibility |= 2), kl(c, d, m, E, u)),
            u && x & 2048 && Uc(d.alternate, d));
          break;
        case 24:
          (kl(c, d, m, E, u), u && x & 2048 && Lc(d.alternate, d));
          break;
        default:
          kl(c, d, m, E, u);
      }
      t = t.sibling;
    }
  }
  function ki(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) {
        var n = e,
          i = t,
          u = i.flags;
        switch (i.tag) {
          case 22:
            (ki(n, i), u & 2048 && Uc(i.alternate, i));
            break;
          case 24:
            (ki(n, i), u & 2048 && Lc(i.alternate, i));
            break;
          default:
            ki(n, i);
        }
        t = t.sibling;
      }
  }
  var qi = 8192;
  function ql(e, t, n) {
    if (e.subtreeFlags & qi)
      for (e = e.child; e !== null;) (Zh(e, t, n), (e = e.sibling));
  }
  function Zh(e, t, n) {
    switch (e.tag) {
      case 26:
        (ql(e, t, n),
          e.flags & qi &&
            e.memoizedState !== null &&
            cg(n, gn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ql(e, t, n);
        break;
      case 3:
      case 4:
        var i = gn;
        ((gn = Ou(e.stateNode.containerInfo)), ql(e, t, n), (gn = i));
        break;
      case 22:
        e.memoizedState === null &&
          ((i = e.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = qi), (qi = 16777216), ql(e, t, n), (qi = i))
            : ql(e, t, n));
        break;
      default:
        ql(e, t, n);
    }
  }
  function Fh(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Yi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Tt = i), Jh(i, e));
        }
      Fh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) (Kh(e), (e = e.sibling));
  }
  function Kh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Yi(e), e.flags & 2048 && Oa(9, e, e.return));
        break;
      case 3:
        Yi(e);
        break;
      case 12:
        Yi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), mu(e))
          : Yi(e);
        break;
      default:
        Yi(e);
    }
  }
  function mu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Tt = i), Jh(i, e));
        }
      Fh(e);
    }
    for (e = e.child; e !== null;) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Oa(8, t, t.return), mu(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), mu(t)));
          break;
        default:
          mu(t);
      }
      e = e.sibling;
    }
  }
  function Jh(e, t) {
    for (; Tt !== null;) {
      var n = Tt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Oa(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Ai(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (Tt = i));
      else
        e: for (n = e; Tt !== null;) {
          i = Tt;
          var u = i.sibling,
            c = i.return;
          if ((kh(i), i === n)) {
            Tt = null;
            break e;
          }
          if (u !== null) {
            ((u.return = c), (Tt = u));
            break e;
          }
          Tt = c;
        }
    }
  }
  var Av = {
      getCacheForType: function (e) {
        var t = Ct(ht),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return Ct(ht).controller.signal;
      }
    },
    Nv = typeof WeakMap == "function" ? WeakMap : Map,
    Qe = 0,
    et = null,
    we = null,
    ze = 0,
    Fe = 0,
    Jt = null,
    Da = !1,
    Yl = !1,
    jc = !1,
    la = 0,
    ct = 0,
    _a = 0,
    rl = 0,
    Hc = 0,
    $t = 0,
    Vl = 0,
    Vi = null,
    Gt = null,
    Bc = !1,
    yu = 0,
    $h = 0,
    pu = 1 / 0,
    vu = null,
    xa = null,
    Et = 0,
    wa = null,
    Gl = null,
    ia = 0,
    kc = 0,
    qc = null,
    Ih = null,
    Gi = 0,
    Yc = null;
  function It() {
    return (Qe & 2) !== 0 && ze !== 0 ? ze & -ze : w.T !== null ? Fc() : G();
  }
  function Wh() {
    if ($t === 0)
      if ((ze & 536870912) === 0 || je) {
        var e = Bn;
        ((Bn <<= 1), (Bn & 3932160) === 0 && (Bn = 262144), ($t = e));
      } else $t = 536870912;
    return ((e = Ft.current), e !== null && (e.flags |= 32), $t);
  }
  function Qt(e, t, n) {
    (((e === et && (Fe === 2 || Fe === 9)) || e.cancelPendingCommit !== null) &&
      (Ql(e, 0), Ma(e, ze, $t, !1)),
      An(e, n),
      ((Qe & 2) === 0 || e !== et) &&
        (e === et &&
          ((Qe & 2) === 0 && (rl |= n), ct === 4 && Ma(e, ze, $t, !1)),
        Dn(e)));
  }
  function Ph(e, t, n) {
    if ((Qe & 6) !== 0) throw Error(s(327));
    var i = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ha(e, t),
      u = i ? Dv(e, t) : Gc(e, t, !0),
      c = i;
    do {
      if (u === 0) {
        Yl && !i && Ma(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), c && !Cv(n))) {
          ((u = Gc(e, t, !1)), (c = !1));
          continue;
        }
        if (u === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var d = 0;
          else
            ((d = e.pendingLanes & -536870913),
              (d = d !== 0 ? d : d & 536870912 ? 536870912 : 0));
          if (d !== 0) {
            t = d;
            e: {
              var m = e;
              u = Vi;
              var E = m.current.memoizedState.isDehydrated;
              if ((E && (Ql(m, d).flags |= 256), (d = Gc(m, d, !1)), d !== 2)) {
                if (jc && !E) {
                  ((m.errorRecoveryDisabledLanes |= c), (rl |= c), (u = 4));
                  break e;
                }
                ((c = Gt),
                  (Gt = u),
                  c !== null &&
                    (Gt === null ? (Gt = c) : Gt.push.apply(Gt, c)));
              }
              u = d;
            }
            if (((c = !1), u !== 2)) continue;
          }
        }
        if (u === 1) {
          (Ql(e, 0), Ma(e, t, 0, !0));
          break;
        }
        e: {
          switch (((i = e), (c = u), c)) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Ma(i, t, $t, !Da);
              break e;
            case 2:
              Gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && ((u = yu + 300 - Mt()), 10 < u)) {
            if ((Ma(i, t, $t, !Da), pl(i, 0, !0) !== 0)) break e;
            ((ia = t),
              (i.timeoutHandle = xm(
                em.bind(
                  null,
                  i,
                  n,
                  Gt,
                  vu,
                  Bc,
                  t,
                  $t,
                  rl,
                  Vl,
                  Da,
                  c,
                  "Throttled",
                  -0,
                  0
                ),
                u
              )));
            break e;
          }
          em(i, n, Gt, vu, Bc, t, $t, rl, Vl, Da, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Dn(e);
  }
  function em(e, t, n, i, u, c, d, m, E, x, H, q, M, j) {
    if (
      ((e.timeoutHandle = -1),
      (q = t.subtreeFlags),
      q & 8192 || (q & 16785408) === 16785408)
    ) {
      ((q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qn
      }),
        Zh(t, c, q));
      var le =
        (c & 62914560) === c ? yu - Mt() : (c & 4194048) === c ? $h - Mt() : 0;
      if (((le = og(q, le)), le !== null)) {
        ((ia = c),
          (e.cancelPendingCommit = le(
            sm.bind(null, e, t, c, n, i, u, d, m, E, H, q, null, M, j)
          )),
          Ma(e, c, d, !x));
        return;
      }
    }
    sm(e, t, c, n, i, u, d, m, E);
  }
  function Cv(e) {
    for (var t = e; ;) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var i = 0; i < n.length; i++) {
          var u = n[i],
            c = u.getSnapshot;
          u = u.value;
          try {
            if (!Xt(c(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
        ((n.return = t), (t = n));
      else {
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Ma(e, t, n, i) {
    ((t &= ~Hc),
      (t &= ~rl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      i && (e.warmLanes |= t),
      (i = e.expirationTimes));
    for (var u = t; 0 < u;) {
      var c = 31 - _t(u),
        d = 1 << c;
      ((i[c] = -1), (u &= ~d));
    }
    n !== 0 && Dr(e, n, t);
  }
  function gu() {
    return (Qe & 6) === 0 ? (Qi(0), !1) : !0;
  }
  function Vc() {
    if (we !== null) {
      if (Fe === 0) var e = we.return;
      else ((e = we), (Kn = Ia = null), lc(e), (Ul = null), (Ci = 0), (e = we));
      for (; e !== null;) (wh(e.alternate, e), (e = e.return));
      we = null;
    }
  }
  function Ql(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), Zv(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (ia = 0),
      Vc(),
      (et = e),
      (we = n = Zn(e.current, null)),
      (ze = t),
      (Fe = 0),
      (Jt = null),
      (Da = !1),
      (Yl = ha(e, t)),
      (jc = !1),
      (Vl = $t = Hc = rl = _a = ct = 0),
      (Gt = Vi = null),
      (Bc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i;) {
        var u = 31 - _t(i),
          c = 1 << u;
        ((t |= e[u]), (i &= ~c));
      }
    return ((la = t), kr(), n);
  }
  function tm(e, t) {
    ((Ne = null),
      (w.H = Ui),
      t === zl || t === Fr
        ? ((t = vd()), (Fe = 3))
        : t === Zs
          ? ((t = vd()), (Fe = 4))
          : (Fe =
              t === Ec
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Jt = t),
      we === null && ((ct = 1), uu(e, ln(t, e.current))));
  }
  function nm() {
    var e = Ft.current;
    return e === null
      ? !0
      : (ze & 4194048) === ze
        ? cn === null
        : (ze & 62914560) === ze || (ze & 536870912) !== 0
          ? e === cn
          : !1;
  }
  function am() {
    var e = w.H;
    return ((w.H = Ui), e === null ? Ui : e);
  }
  function lm() {
    var e = w.A;
    return ((w.A = Av), e);
  }
  function bu() {
    ((ct = 4),
      Da || ((ze & 4194048) !== ze && Ft.current !== null) || (Yl = !0),
      ((_a & 134217727) === 0 && (rl & 134217727) === 0) ||
        et === null ||
        Ma(et, ze, $t, !1));
  }
  function Gc(e, t, n) {
    var i = Qe;
    Qe |= 2;
    var u = am(),
      c = lm();
    ((et !== e || ze !== t) && ((vu = null), Ql(e, t)), (t = !1));
    var d = ct;
    e: do
      try {
        if (Fe !== 0 && we !== null) {
          var m = we,
            E = Jt;
          switch (Fe) {
            case 8:
              (Vc(), (d = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ft.current === null && (t = !0);
              var x = Fe;
              if (((Fe = 0), (Jt = null), Xl(e, m, E, x), n && Yl)) {
                d = 0;
                break e;
              }
              break;
            default:
              ((x = Fe), (Fe = 0), (Jt = null), Xl(e, m, E, x));
          }
        }
        (Ov(), (d = ct));
        break;
      } catch (H) {
        tm(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Kn = Ia = null),
      (Qe = i),
      (w.H = u),
      (w.A = c),
      we === null && ((et = null), (ze = 0), kr()),
      d
    );
  }
  function Ov() {
    for (; we !== null;) im(we);
  }
  function Dv(e, t) {
    var n = Qe;
    Qe |= 2;
    var i = am(),
      u = lm();
    et !== e || ze !== t
      ? ((vu = null), (pu = Mt() + 500), Ql(e, t))
      : (Yl = ha(e, t));
    e: do
      try {
        if (Fe !== 0 && we !== null) {
          t = we;
          var c = Jt;
          t: switch (Fe) {
            case 1:
              ((Fe = 0), (Jt = null), Xl(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (yd(c)) {
                ((Fe = 0), (Jt = null), rm(t));
                break;
              }
              ((t = function () {
                ((Fe !== 2 && Fe !== 9) || et !== e || (Fe = 7), Dn(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              Fe = 7;
              break e;
            case 4:
              Fe = 5;
              break e;
            case 7:
              yd(c)
                ? ((Fe = 0), (Jt = null), rm(t))
                : ((Fe = 0), (Jt = null), Xl(e, t, c, 7));
              break;
            case 5:
              var d = null;
              switch (we.tag) {
                case 26:
                  d = we.memoizedState;
                case 5:
                case 27:
                  var m = we;
                  if (d ? Xm(d) : m.stateNode.complete) {
                    ((Fe = 0), (Jt = null));
                    var E = m.sibling;
                    if (E !== null) we = E;
                    else {
                      var x = m.return;
                      x !== null ? ((we = x), Eu(x)) : (we = null);
                    }
                    break t;
                  }
              }
              ((Fe = 0), (Jt = null), Xl(e, t, c, 5));
              break;
            case 6:
              ((Fe = 0), (Jt = null), Xl(e, t, c, 6));
              break;
            case 8:
              (Vc(), (ct = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        _v();
        break;
      } catch (H) {
        tm(e, H);
      }
    while (!0);
    return (
      (Kn = Ia = null),
      (w.H = i),
      (w.A = u),
      (Qe = n),
      we !== null ? 0 : ((et = null), (ze = 0), kr(), ct)
    );
  }
  function _v() {
    for (; we !== null && !is();) im(we);
  }
  function im(e) {
    var t = _h(e.alternate, e, la);
    ((e.memoizedProps = e.pendingProps), t === null ? Eu(e) : (we = t));
  }
  function rm(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Rh(n, t, t.pendingProps, t.type, void 0, ze);
        break;
      case 11:
        t = Rh(n, t, t.pendingProps, t.type.render, t.ref, ze);
        break;
      case 5:
        lc(t);
      default:
        (wh(n, t), (t = we = ld(t, la)), (t = _h(n, t, la)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Eu(e) : (we = t));
  }
  function Xl(e, t, n, i) {
    ((Kn = Ia = null), lc(t), (Ul = null), (Ci = 0));
    var u = t.return;
    try {
      if (vv(e, u, t, n, ze)) {
        ((ct = 1), uu(e, ln(n, e.current)), (we = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((we = u), c);
      ((ct = 1), uu(e, ln(n, e.current)), (we = null));
      return;
    }
    t.flags & 32768
      ? (je || i === 1
          ? (e = !0)
          : Yl || (ze & 536870912) !== 0
            ? (e = !1)
            : ((Da = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Ft.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        um(t, e))
      : Eu(t);
  }
  function Eu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        um(t, Da);
        return;
      }
      e = t.return;
      var n = Ev(t.alternate, t, la);
      if (n !== null) {
        we = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        we = t;
        return;
      }
      we = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function um(e, t) {
    do {
      var n = Sv(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (we = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        we = e;
        return;
      }
      we = e = n;
    } while (e !== null);
    ((ct = 6), (we = null));
  }
  function sm(e, t, n, i, u, c, d, m, E) {
    e.cancelPendingCommit = null;
    do Su();
    while (Et !== 0);
    if ((Qe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= ws),
        Or(e, n, c, d, m, E),
        e === et && ((we = et = null), (ze = 0)),
        (Gl = t),
        (wa = e),
        (ia = n),
        (kc = c),
        (qc = u),
        (Ih = i),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            zv(da, function () {
              return (hm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = w.T), (w.T = null), (u = X.p), (X.p = 2), (d = Qe), (Qe |= 4));
        try {
          Tv(e, t, n);
        } finally {
          ((Qe = d), (X.p = u), (w.T = i));
        }
      }
      ((Et = 1), cm(), om(), fm());
    }
  }
  function cm() {
    if (Et === 1) {
      Et = 0;
      var e = wa,
        t = Gl,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = w.T), (w.T = null));
        var i = X.p;
        X.p = 2;
        var u = Qe;
        Qe |= 4;
        try {
          Gh(t, e);
          var c = to,
            d = Jf(e.containerInfo),
            m = c.focusedElem,
            E = c.selectionRange;
          if (
            d !== m &&
            m &&
            m.ownerDocument &&
            Kf(m.ownerDocument.documentElement, m)
          ) {
            if (E !== null && Cs(m)) {
              var x = E.start,
                H = E.end;
              if ((H === void 0 && (H = x), "selectionStart" in m))
                ((m.selectionStart = x),
                  (m.selectionEnd = Math.min(H, m.value.length)));
              else {
                var q = m.ownerDocument || document,
                  M = (q && q.defaultView) || window;
                if (M.getSelection) {
                  var j = M.getSelection(),
                    le = m.textContent.length,
                    pe = Math.min(E.start, le),
                    We = E.end === void 0 ? pe : Math.min(E.end, le);
                  !j.extend && pe > We && ((d = We), (We = pe), (pe = d));
                  var N = Ff(m, pe),
                    R = Ff(m, We);
                  if (
                    N &&
                    R &&
                    (j.rangeCount !== 1 ||
                      j.anchorNode !== N.node ||
                      j.anchorOffset !== N.offset ||
                      j.focusNode !== R.node ||
                      j.focusOffset !== R.offset)
                  ) {
                    var _ = q.createRange();
                    (_.setStart(N.node, N.offset),
                      j.removeAllRanges(),
                      pe > We
                        ? (j.addRange(_), j.extend(R.node, R.offset))
                        : (_.setEnd(R.node, R.offset), j.addRange(_)));
                  }
                }
              }
            }
            for (q = [], j = m; (j = j.parentNode);)
              j.nodeType === 1 &&
                q.push({ element: j, left: j.scrollLeft, top: j.scrollTop });
            for (
              typeof m.focus == "function" && m.focus(), m = 0;
              m < q.length;
              m++
            ) {
              var k = q[m];
              ((k.element.scrollLeft = k.left), (k.element.scrollTop = k.top));
            }
          }
          ((zu = !!eo), (to = eo = null));
        } finally {
          ((Qe = u), (X.p = i), (w.T = n));
        }
      }
      ((e.current = t), (Et = 2));
    }
  }
  function om() {
    if (Et === 2) {
      Et = 0;
      var e = wa,
        t = Gl,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = w.T), (w.T = null));
        var i = X.p;
        X.p = 2;
        var u = Qe;
        Qe |= 4;
        try {
          Bh(e, t.alternate, t);
        } finally {
          ((Qe = u), (X.p = i), (w.T = n));
        }
      }
      Et = 3;
    }
  }
  function fm() {
    if (Et === 4 || Et === 3) {
      ((Et = 0), rs());
      var e = wa,
        t = Gl,
        n = ia,
        i = Ih;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Et = 5)
        : ((Et = 0), (Gl = wa = null), dm(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (xa = null),
        D(n),
        (t = t.stateNode),
        zt && typeof zt.onCommitFiberRoot == "function")
      )
        try {
          zt.onCommitFiberRoot(Hn, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((t = w.T), (u = X.p), (X.p = 2), (w.T = null));
        try {
          for (var c = e.onRecoverableError, d = 0; d < i.length; d++) {
            var m = i[d];
            c(m.value, { componentStack: m.stack });
          }
        } finally {
          ((w.T = t), (X.p = u));
        }
      }
      ((ia & 3) !== 0 && Su(),
        Dn(e),
        (u = e.pendingLanes),
        (n & 261930) !== 0 && (u & 42) !== 0
          ? e === Yc
            ? Gi++
            : ((Gi = 0), (Yc = e))
          : (Gi = 0),
        Qi(0));
    }
  }
  function dm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ai(t)));
  }
  function Su() {
    return (cm(), om(), fm(), hm());
  }
  function hm() {
    if (Et !== 5) return !1;
    var e = wa,
      t = kc;
    kc = 0;
    var n = D(ia),
      i = w.T,
      u = X.p;
    try {
      ((X.p = 32 > n ? 32 : n), (w.T = null), (n = qc), (qc = null));
      var c = wa,
        d = ia;
      if (((Et = 0), (Gl = wa = null), (ia = 0), (Qe & 6) !== 0))
        throw Error(s(331));
      var m = Qe;
      if (
        ((Qe |= 4),
        Kh(c.current),
        Xh(c, c.current, d, n),
        (Qe = m),
        Qi(0, !1),
        zt && typeof zt.onPostCommitFiberRoot == "function")
      )
        try {
          zt.onPostCommitFiberRoot(Hn, c);
        } catch {}
      return !0;
    } finally {
      ((X.p = u), (w.T = i), dm(e, t));
    }
  }
  function mm(e, t, n) {
    ((t = ln(n, t)),
      (t = bc(e.stateNode, t, 2)),
      (e = Aa(e, t, 2)),
      e !== null && (An(e, 2), Dn(e)));
  }
  function Ke(e, t, n) {
    if (e.tag === 3) mm(e, e, n);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          mm(t, e, n);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (xa === null || !xa.has(i)))
          ) {
            ((e = ln(n, e)),
              (n = yh(2)),
              (i = Aa(t, n, 2)),
              i !== null && (ph(n, i, t, e), An(i, 2), Dn(i)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Qc(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Nv();
      var u = new Set();
      i.set(t, u);
    } else ((u = i.get(t)), u === void 0 && ((u = new Set()), i.set(t, u)));
    u.has(n) ||
      ((jc = !0), u.add(n), (e = xv.bind(null, e, t, n)), t.then(e, e));
  }
  function xv(e, t, n) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      et === e &&
        (ze & n) === n &&
        (ct === 4 || (ct === 3 && (ze & 62914560) === ze && 300 > Mt() - yu)
          ? (Qe & 2) === 0 && Ql(e, 0)
          : (Hc |= n),
        Vl === ze && (Vl = 0)),
      Dn(e));
  }
  function ym(e, t) {
    (t === 0 && (t = di()), (e = Ka(e, t)), e !== null && (An(e, t), Dn(e)));
  }
  function wv(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), ym(e, n));
  }
  function Mv(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode,
          u = e.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    (i !== null && i.delete(t), ym(e, n));
  }
  function zv(e, t) {
    return yl(e, t);
  }
  var Tu = null,
    Zl = null,
    Xc = !1,
    Ru = !1,
    Zc = !1,
    za = 0;
  function Dn(e) {
    (e !== Zl &&
      e.next === null &&
      (Zl === null ? (Tu = Zl = e) : (Zl = Zl.next = e)),
      (Ru = !0),
      Xc || ((Xc = !0), Lv()));
  }
  function Qi(e, t) {
    if (!Zc && Ru) {
      Zc = !0;
      do
        for (var n = !1, i = Tu; i !== null;) {
          if (e !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var c = 0;
            else {
              var d = i.suspendedLanes,
                m = i.pingedLanes;
              ((c = (1 << (31 - _t(42 | e) + 1)) - 1),
                (c &= u & ~(d & ~m)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((n = !0), bm(i, c));
          } else
            ((c = ze),
              (c = pl(
                i,
                i === et ? c : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1
              )),
              (c & 3) === 0 || ha(i, c) || ((n = !0), bm(i, c)));
          i = i.next;
        }
      while (n);
      Zc = !1;
    }
  }
  function Uv() {
    pm();
  }
  function pm() {
    Ru = Xc = !1;
    var e = 0;
    za !== 0 && Xv() && (e = za);
    for (var t = Mt(), n = null, i = Tu; i !== null;) {
      var u = i.next,
        c = vm(i, t);
      (c === 0
        ? ((i.next = null),
          n === null ? (Tu = u) : (n.next = u),
          u === null && (Zl = n))
        : ((n = i), (e !== 0 || (c & 3) !== 0) && (Ru = !0)),
        (i = u));
    }
    ((Et !== 0 && Et !== 5) || Qi(e), za !== 0 && (za = 0));
  }
  function vm(e, t) {
    for (
      var n = e.suspendedLanes,
        i = e.pingedLanes,
        u = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var d = 31 - _t(c),
        m = 1 << d,
        E = u[d];
      (E === -1
        ? ((m & n) === 0 || (m & i) !== 0) && (u[d] = os(m, t))
        : E <= t && (e.expiredLanes |= m),
        (c &= ~m));
    }
    if (
      ((t = et),
      (n = ze),
      (n = pl(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (i = e.callbackNode),
      n === 0 ||
        (e === t && (Fe === 2 || Fe === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && oi(i),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || ha(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((i !== null && oi(i), D(n))) {
        case 2:
        case 8:
          n = fi;
          break;
        case 32:
          n = da;
          break;
        case 268435456:
          n = Pt;
          break;
        default:
          n = da;
      }
      return (
        (i = gm.bind(null, e)),
        (n = yl(n, i)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      i !== null && i !== null && oi(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function gm(e, t) {
    if (Et !== 0 && Et !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Su() && e.callbackNode !== n) return null;
    var i = ze;
    return (
      (i = pl(
        e,
        e === et ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      i === 0
        ? null
        : (Ph(e, i, t),
          vm(e, Mt()),
          e.callbackNode != null && e.callbackNode === n
            ? gm.bind(null, e)
            : null)
    );
  }
  function bm(e, t) {
    if (Su()) return null;
    Ph(e, t, !0);
  }
  function Lv() {
    Fv(function () {
      (Qe & 6) !== 0 ? yl(fa, Uv) : pm();
    });
  }
  function Fc() {
    if (za === 0) {
      var e = wl;
      (e === 0 && ((e = Va), (Va <<= 1), (Va & 261888) === 0 && (Va = 256)),
        (za = e));
    }
    return za;
  }
  function Em(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : wr("" + e);
  }
  function Sm(e, t) {
    var n = t.ownerDocument.createElement("input");
    return (
      (n.name = t.name),
      (n.value = t.value),
      e.id && n.setAttribute("form", e.id),
      t.parentNode.insertBefore(n, t),
      (e = new FormData(e)),
      n.parentNode.removeChild(n),
      e
    );
  }
  function jv(e, t, n, i, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var c = Em((u[$] || null).action),
        d = i.submitter;
      d &&
        ((t = (t = d[$] || null)
          ? Em(t.formAction)
          : d.getAttribute("formAction")),
        t !== null && ((c = t), (d = null)));
      var m = new Lr("action", "action", null, i, u);
      e.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (za !== 0) {
                  var E = d ? Sm(u, d) : new FormData(u);
                  hc(
                    n,
                    { pending: !0, data: E, method: u.method, action: c },
                    null,
                    E
                  );
                }
              } else
                typeof c == "function" &&
                  (m.preventDefault(),
                  (E = d ? Sm(u, d) : new FormData(u)),
                  hc(
                    n,
                    { pending: !0, data: E, method: u.method, action: c },
                    c,
                    E
                  ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Kc = 0; Kc < xs.length; Kc++) {
    var Jc = xs[Kc],
      Hv = Jc.toLowerCase(),
      Bv = Jc[0].toUpperCase() + Jc.slice(1);
    vn(Hv, "on" + Bv);
  }
  (vn(Wf, "onAnimationEnd"),
    vn(Pf, "onAnimationIteration"),
    vn(ed, "onAnimationStart"),
    vn("dblclick", "onDoubleClick"),
    vn("focusin", "onFocus"),
    vn("focusout", "onBlur"),
    vn(ev, "onTransitionRun"),
    vn(tv, "onTransitionStart"),
    vn(nv, "onTransitionCancel"),
    vn(td, "onTransitionEnd"),
    bt("onMouseEnter", ["mouseout", "mouseover"]),
    bt("onMouseLeave", ["mouseout", "mouseover"]),
    bt("onPointerEnter", ["pointerout", "pointerover"]),
    bt("onPointerLeave", ["pointerout", "pointerover"]),
    en(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    en(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    en("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    en(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    en(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    en(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var Xi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    kv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Xi)
    );
  function Tm(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n],
        u = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var d = i.length - 1; 0 <= d; d--) {
            var m = i[d],
              E = m.instance,
              x = m.currentTarget;
            if (((m = m.listener), E !== c && u.isPropagationStopped()))
              break e;
            ((c = m), (u.currentTarget = x));
            try {
              c(u);
            } catch (H) {
              Br(H);
            }
            ((u.currentTarget = null), (c = E));
          }
        else
          for (d = 0; d < i.length; d++) {
            if (
              ((m = i[d]),
              (E = m.instance),
              (x = m.currentTarget),
              (m = m.listener),
              E !== c && u.isPropagationStopped())
            )
              break e;
            ((c = m), (u.currentTarget = x));
            try {
              c(u);
            } catch (H) {
              Br(H);
            }
            ((u.currentTarget = null), (c = E));
          }
      }
    }
  }
  function Me(e, t) {
    var n = t[ve];
    n === void 0 && (n = t[ve] = new Set());
    var i = e + "__bubble";
    n.has(i) || (Rm(t, e, 2, !1), n.add(i));
  }
  function $c(e, t, n) {
    var i = 0;
    (t && (i |= 4), Rm(n, e, i, t));
  }
  var Au = "_reactListening" + Math.random().toString(36).slice(2);
  function Ic(e) {
    if (!e[Au]) {
      ((e[Au] = !0),
        pn.forEach(function (n) {
          n !== "selectionchange" && (kv.has(n) || $c(n, !1, e), $c(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Au] || ((t[Au] = !0), $c("selectionchange", !1, t));
    }
  }
  function Rm(e, t, n, i) {
    switch (Wm(t)) {
      case 2:
        var u = hg;
        break;
      case 8:
        u = mg;
        break;
      default:
        u = ho;
    }
    ((n = u.bind(null, t, n, e)),
      (u = void 0),
      !vs ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (u = !0),
      i
        ? u !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: u })
          : e.addEventListener(t, n, !0)
        : u !== void 0
          ? e.addEventListener(t, n, { passive: u })
          : e.addEventListener(t, n, !1));
  }
  function Wc(e, t, n, i, u) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var d = i.tag;
        if (d === 3 || d === 4) {
          var m = i.stateNode.containerInfo;
          if (m === u) break;
          if (d === 4)
            for (d = i.return; d !== null;) {
              var E = d.tag;
              if ((E === 3 || E === 4) && d.stateNode.containerInfo === u)
                return;
              d = d.return;
            }
          for (; m !== null;) {
            if (((d = tt(m)), d === null)) return;
            if (((E = d.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              i = c = d;
              continue e;
            }
            m = m.parentNode;
          }
        }
        i = i.return;
      }
    Df(function () {
      var x = c,
        H = ys(n),
        q = [];
      e: {
        var M = nd.get(e);
        if (M !== void 0) {
          var j = Lr,
            le = e;
          switch (e) {
            case "keypress":
              if (zr(n) === 0) break e;
            case "keydown":
            case "keyup":
              j = Mp;
              break;
            case "focusin":
              ((le = "focus"), (j = Ss));
              break;
            case "focusout":
              ((le = "blur"), (j = Ss));
              break;
            case "beforeblur":
            case "afterblur":
              j = Ss;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              j = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = Ep;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = Lp;
              break;
            case Wf:
            case Pf:
            case ed:
              j = Rp;
              break;
            case td:
              j = Hp;
              break;
            case "scroll":
            case "scrollend":
              j = gp;
              break;
            case "wheel":
              j = kp;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = Np;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = zf;
              break;
            case "toggle":
            case "beforetoggle":
              j = Yp;
          }
          var pe = (t & 4) !== 0,
            We = !pe && (e === "scroll" || e === "scrollend"),
            N = pe ? (M !== null ? M + "Capture" : null) : M;
          pe = [];
          for (var R = x, _; R !== null;) {
            var k = R;
            if (
              ((_ = k.stateNode),
              (k = k.tag),
              (k !== 5 && k !== 26 && k !== 27) ||
                _ === null ||
                N === null ||
                ((k = hi(R, N)), k != null && pe.push(Zi(R, k, _))),
              We)
            )
              break;
            R = R.return;
          }
          0 < pe.length &&
            ((M = new j(M, le, null, n, H)),
            q.push({ event: M, listeners: pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((M = e === "mouseover" || e === "pointerover"),
            (j = e === "mouseout" || e === "pointerout"),
            M &&
              n !== ms &&
              (le = n.relatedTarget || n.fromElement) &&
              (tt(le) || le[P]))
          )
            break e;
          if (
            (j || M) &&
            ((M =
              H.window === H
                ? H
                : (M = H.ownerDocument)
                  ? M.defaultView || M.parentWindow
                  : window),
            j
              ? ((le = n.relatedTarget || n.toElement),
                (j = x),
                (le = le ? tt(le) : null),
                le !== null &&
                  ((We = f(le)),
                  (pe = le.tag),
                  le !== We || (pe !== 5 && pe !== 27 && pe !== 6)) &&
                  (le = null))
              : ((j = null), (le = x)),
            j !== le)
          ) {
            if (
              ((pe = wf),
              (k = "onMouseLeave"),
              (N = "onMouseEnter"),
              (R = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((pe = zf),
                (k = "onPointerLeave"),
                (N = "onPointerEnter"),
                (R = "pointer")),
              (We = j == null ? M : Ut(j)),
              (_ = le == null ? M : Ut(le)),
              (M = new pe(k, R + "leave", j, n, H)),
              (M.target = We),
              (M.relatedTarget = _),
              (k = null),
              tt(H) === x &&
                ((pe = new pe(N, R + "enter", le, n, H)),
                (pe.target = _),
                (pe.relatedTarget = We),
                (k = pe)),
              (We = k),
              j && le)
            )
              t: {
                for (pe = qv, N = j, R = le, _ = 0, k = N; k; k = pe(k)) _++;
                k = 0;
                for (var de = R; de; de = pe(de)) k++;
                for (; 0 < _ - k;) ((N = pe(N)), _--);
                for (; 0 < k - _;) ((R = pe(R)), k--);
                for (; _--;) {
                  if (N === R || (R !== null && N === R.alternate)) {
                    pe = N;
                    break t;
                  }
                  ((N = pe(N)), (R = pe(R)));
                }
                pe = null;
              }
            else pe = null;
            (j !== null && Am(q, M, j, pe, !1),
              le !== null && We !== null && Am(q, We, le, pe, !0));
          }
        }
        e: {
          if (
            ((M = x ? Ut(x) : window),
            (j = M.nodeName && M.nodeName.toLowerCase()),
            j === "select" || (j === "input" && M.type === "file"))
          )
            var qe = Yf;
          else if (kf(M))
            if (Vf) qe = Ip;
            else {
              qe = Jp;
              var ue = Kp;
            }
          else
            ((j = M.nodeName),
              !j ||
              j.toLowerCase() !== "input" ||
              (M.type !== "checkbox" && M.type !== "radio")
                ? x && hs(x.elementType) && (qe = Yf)
                : (qe = $p));
          if (qe && (qe = qe(e, x))) {
            qf(q, qe, n, H);
            break e;
          }
          (ue && ue(e, M, x),
            e === "focusout" &&
              x &&
              M.type === "number" &&
              x.memoizedProps.value != null &&
              ds(M, "number", M.value));
        }
        switch (((ue = x ? Ut(x) : window), e)) {
          case "focusin":
            (kf(ue) || ue.contentEditable === "true") &&
              ((Rl = ue), (Os = x), (Si = null));
            break;
          case "focusout":
            Si = Os = Rl = null;
            break;
          case "mousedown":
            Ds = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ds = !1), $f(q, n, H));
            break;
          case "selectionchange":
            if (Pp) break;
          case "keydown":
          case "keyup":
            $f(q, n, H);
        }
        var Ce;
        if (Rs)
          e: {
            switch (e) {
              case "compositionstart":
                var Ue = "onCompositionStart";
                break e;
              case "compositionend":
                Ue = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ue = "onCompositionUpdate";
                break e;
            }
            Ue = void 0;
          }
        else
          Tl
            ? Hf(e, n) && (Ue = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (Ue = "onCompositionStart");
        (Ue &&
          (Uf &&
            n.locale !== "ko" &&
            (Tl || Ue !== "onCompositionStart"
              ? Ue === "onCompositionEnd" && Tl && (Ce = _f())
              : ((va = H),
                (gs = "value" in va ? va.value : va.textContent),
                (Tl = !0))),
          (ue = Nu(x, Ue)),
          0 < ue.length &&
            ((Ue = new Mf(Ue, e, null, n, H)),
            q.push({ event: Ue, listeners: ue }),
            Ce
              ? (Ue.data = Ce)
              : ((Ce = Bf(n)), Ce !== null && (Ue.data = Ce)))),
          (Ce = Gp ? Qp(e, n) : Xp(e, n)) &&
            ((Ue = Nu(x, "onBeforeInput")),
            0 < Ue.length &&
              ((ue = new Mf("onBeforeInput", "beforeinput", null, n, H)),
              q.push({ event: ue, listeners: Ue }),
              (ue.data = Ce))),
          jv(q, e, x, n, H));
      }
      Tm(q, t);
    });
  }
  function Zi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Nu(e, t) {
    for (var n = t + "Capture", i = []; e !== null;) {
      var u = e,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = hi(e, n)),
          u != null && i.unshift(Zi(e, u, c)),
          (u = hi(e, t)),
          u != null && i.push(Zi(e, u, c))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function qv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Am(e, t, n, i, u) {
    for (var c = t._reactName, d = []; n !== null && n !== i;) {
      var m = n,
        E = m.alternate,
        x = m.stateNode;
      if (((m = m.tag), E !== null && E === i)) break;
      ((m !== 5 && m !== 26 && m !== 27) ||
        x === null ||
        ((E = x),
        u
          ? ((x = hi(n, c)), x != null && d.unshift(Zi(n, x, E)))
          : u || ((x = hi(n, c)), x != null && d.push(Zi(n, x, E)))),
        (n = n.return));
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var Yv = /\r\n?/g,
    Vv = /\u0000|\uFFFD/g;
  function Nm(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        Yv,
        `
`
      )
      .replace(Vv, "");
  }
  function Cm(e, t) {
    return ((t = Nm(t)), Nm(e) === t);
  }
  function Ie(e, t, n, i, u, c) {
    switch (n) {
      case "children":
        typeof i == "string"
          ? t === "body" || (t === "textarea" && i === "") || bl(e, i)
          : (typeof i == "number" || typeof i == "bigint") &&
            t !== "body" &&
            bl(e, "" + i);
        break;
      case "className":
        Gn(e, "class", i);
        break;
      case "tabIndex":
        Gn(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Gn(e, n, i);
        break;
      case "style":
        Cf(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          Gn(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "symbol" ||
          typeof i == "boolean"
        ) {
          e.removeAttribute(n);
          break;
        }
        ((i = wr("" + i)), e.setAttribute(n, i));
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" &&
            (n === "formAction"
              ? (t !== "input" && Ie(e, t, "name", u.name, u, null),
                Ie(e, t, "formEncType", u.formEncType, u, null),
                Ie(e, t, "formMethod", u.formMethod, u, null),
                Ie(e, t, "formTarget", u.formTarget, u, null))
              : (Ie(e, t, "encType", u.encType, u, null),
                Ie(e, t, "method", u.method, u, null),
                Ie(e, t, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        ((i = wr("" + i)), e.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (e.onclick = Qn);
        break;
      case "onScroll":
        i != null && Me("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Me("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(s(61));
          if (((n = i.__html), n != null)) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          i == null ||
          typeof i == "function" ||
          typeof i == "boolean" ||
          typeof i == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((n = wr("" + i)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(n, "" + i)
          : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol"
          ? e.setAttribute(n, "")
          : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0
          ? e.setAttribute(n, "")
          : i !== !1 &&
              i != null &&
              typeof i != "function" &&
              typeof i != "symbol"
            ? e.setAttribute(n, i)
            : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        !isNaN(i) &&
        1 <= i
          ? e.setAttribute(n, i)
          : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i)
          ? e.removeAttribute(n)
          : e.setAttribute(n, i);
        break;
      case "popover":
        (Me("beforetoggle", e), Me("toggle", e), Vn(e, "popover", i));
        break;
      case "xlinkActuate":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        Ee(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        Ee(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        Ee(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        Ee(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        Vn(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = pp.get(n) || n), Vn(e, n, i));
    }
  }
  function Pc(e, t, n, i, u, c) {
    switch (n) {
      case "style":
        Cf(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(s(61));
          if (((n = i.__html), n != null)) {
            if (u.children != null) throw Error(s(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? bl(e, i)
          : (typeof i == "number" || typeof i == "bigint") && bl(e, "" + i);
        break;
      case "onScroll":
        i != null && Me("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Me("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Qn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!kn.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((u = n.endsWith("Capture")),
              (t = n.slice(2, u ? n.length - 7 : void 0)),
              (c = e[$] || null),
              (c = c != null ? c[n] : null),
              typeof c == "function" && e.removeEventListener(t, c, u),
              typeof i == "function")
            ) {
              (typeof c != "function" &&
                c !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, i, u));
              break e;
            }
            n in e
              ? (e[n] = i)
              : i === !0
                ? e.setAttribute(n, "")
                : Vn(e, n, i);
          }
    }
  }
  function Dt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (Me("error", e), Me("load", e));
        var i = !1,
          u = !1,
          c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var d = n[c];
            if (d != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  Ie(e, t, c, d, n, null);
              }
          }
        (u && Ie(e, t, "srcSet", n.srcSet, n, null),
          i && Ie(e, t, "src", n.src, n, null));
        return;
      case "input":
        Me("invalid", e);
        var m = (c = d = u = null),
          E = null,
          x = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var H = n[i];
            if (H != null)
              switch (i) {
                case "name":
                  u = H;
                  break;
                case "type":
                  d = H;
                  break;
                case "checked":
                  E = H;
                  break;
                case "defaultChecked":
                  x = H;
                  break;
                case "value":
                  c = H;
                  break;
                case "defaultValue":
                  m = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null) throw Error(s(137, t));
                  break;
                default:
                  Ie(e, t, i, H, n, null);
              }
          }
        Tf(e, c, m, E, x, d, u, !1);
        return;
      case "select":
        (Me("invalid", e), (i = d = c = null));
        for (u in n)
          if (n.hasOwnProperty(u) && ((m = n[u]), m != null))
            switch (u) {
              case "value":
                c = m;
                break;
              case "defaultValue":
                d = m;
                break;
              case "multiple":
                i = m;
              default:
                Ie(e, t, u, m, n, null);
            }
        ((t = c),
          (n = d),
          (e.multiple = !!i),
          t != null ? gl(e, !!i, t, !1) : n != null && gl(e, !!i, n, !0));
        return;
      case "textarea":
        (Me("invalid", e), (c = u = i = null));
        for (d in n)
          if (n.hasOwnProperty(d) && ((m = n[d]), m != null))
            switch (d) {
              case "value":
                i = m;
                break;
              case "defaultValue":
                u = m;
                break;
              case "children":
                c = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(s(91));
                break;
              default:
                Ie(e, t, d, m, n, null);
            }
        Af(e, i, u, c);
        return;
      case "option":
        for (E in n)
          n.hasOwnProperty(E) &&
            ((i = n[E]), i != null) &&
            (E === "selected"
              ? (e.selected =
                  i && typeof i != "function" && typeof i != "symbol")
              : Ie(e, t, E, i, n, null));
        return;
      case "dialog":
        (Me("beforetoggle", e),
          Me("toggle", e),
          Me("cancel", e),
          Me("close", e));
        break;
      case "iframe":
      case "object":
        Me("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Xi.length; i++) Me(Xi[i], e);
        break;
      case "image":
        (Me("error", e), Me("load", e));
        break;
      case "details":
        Me("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Me("error", e), Me("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (x in n)
          if (n.hasOwnProperty(x) && ((i = n[x]), i != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ie(e, t, x, i, n, null);
            }
        return;
      default:
        if (hs(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((i = n[H]), i !== void 0 && Pc(e, t, H, i, n, void 0));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && ((i = n[m]), i != null && Ie(e, t, m, i, n, null));
  }
  function Gv(e, t, n, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null,
          c = null,
          d = null,
          m = null,
          E = null,
          x = null,
          H = null;
        for (j in n) {
          var q = n[j];
          if (n.hasOwnProperty(j) && q != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = q;
              default:
                i.hasOwnProperty(j) || Ie(e, t, j, null, i, q);
            }
        }
        for (var M in i) {
          var j = i[M];
          if (((q = n[M]), i.hasOwnProperty(M) && (j != null || q != null)))
            switch (M) {
              case "type":
                c = j;
                break;
              case "name":
                u = j;
                break;
              case "checked":
                x = j;
                break;
              case "defaultChecked":
                H = j;
                break;
              case "value":
                d = j;
                break;
              case "defaultValue":
                m = j;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (j != null) throw Error(s(137, t));
                break;
              default:
                j !== q && Ie(e, t, M, j, i, q);
            }
        }
        fs(e, d, m, E, x, H, c, u);
        return;
      case "select":
        j = d = m = M = null;
        for (c in n)
          if (((E = n[c]), n.hasOwnProperty(c) && E != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                j = E;
              default:
                i.hasOwnProperty(c) || Ie(e, t, c, null, i, E);
            }
        for (u in i)
          if (
            ((c = i[u]),
            (E = n[u]),
            i.hasOwnProperty(u) && (c != null || E != null))
          )
            switch (u) {
              case "value":
                M = c;
                break;
              case "defaultValue":
                m = c;
                break;
              case "multiple":
                d = c;
              default:
                c !== E && Ie(e, t, u, c, i, E);
            }
        ((t = m),
          (n = d),
          (i = j),
          M != null
            ? gl(e, !!n, M, !1)
            : !!i != !!n &&
              (t != null ? gl(e, !!n, t, !0) : gl(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        j = M = null;
        for (m in n)
          if (
            ((u = n[m]),
            n.hasOwnProperty(m) && u != null && !i.hasOwnProperty(m))
          )
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ie(e, t, m, null, i, u);
            }
        for (d in i)
          if (
            ((u = i[d]),
            (c = n[d]),
            i.hasOwnProperty(d) && (u != null || c != null))
          )
            switch (d) {
              case "value":
                M = u;
                break;
              case "defaultValue":
                j = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== c && Ie(e, t, d, u, i, c);
            }
        Rf(e, M, j);
        return;
      case "option":
        for (var le in n)
          ((M = n[le]),
            n.hasOwnProperty(le) &&
              M != null &&
              !i.hasOwnProperty(le) &&
              (le === "selected"
                ? (e.selected = !1)
                : Ie(e, t, le, null, i, M)));
        for (E in i)
          ((M = i[E]),
            (j = n[E]),
            i.hasOwnProperty(E) &&
              M !== j &&
              (M != null || j != null) &&
              (E === "selected"
                ? (e.selected =
                    M && typeof M != "function" && typeof M != "symbol")
                : Ie(e, t, E, M, i, j)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var pe in n)
          ((M = n[pe]),
            n.hasOwnProperty(pe) &&
              M != null &&
              !i.hasOwnProperty(pe) &&
              Ie(e, t, pe, null, i, M));
        for (x in i)
          if (
            ((M = i[x]),
            (j = n[x]),
            i.hasOwnProperty(x) && M !== j && (M != null || j != null))
          )
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(s(137, t));
                break;
              default:
                Ie(e, t, x, M, i, j);
            }
        return;
      default:
        if (hs(t)) {
          for (var We in n)
            ((M = n[We]),
              n.hasOwnProperty(We) &&
                M !== void 0 &&
                !i.hasOwnProperty(We) &&
                Pc(e, t, We, void 0, i, M));
          for (H in i)
            ((M = i[H]),
              (j = n[H]),
              !i.hasOwnProperty(H) ||
                M === j ||
                (M === void 0 && j === void 0) ||
                Pc(e, t, H, M, i, j));
          return;
        }
    }
    for (var N in n)
      ((M = n[N]),
        n.hasOwnProperty(N) &&
          M != null &&
          !i.hasOwnProperty(N) &&
          Ie(e, t, N, null, i, M));
    for (q in i)
      ((M = i[q]),
        (j = n[q]),
        !i.hasOwnProperty(q) ||
          M === j ||
          (M == null && j == null) ||
          Ie(e, t, q, M, i, j));
  }
  function Om(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Qv() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0;
        i < n.length;
        i++
      ) {
        var u = n[i],
          c = u.transferSize,
          d = u.initiatorType,
          m = u.duration;
        if (c && m && Om(d)) {
          for (d = 0, m = u.responseEnd, i += 1; i < n.length; i++) {
            var E = n[i],
              x = E.startTime;
            if (x > m) break;
            var H = E.transferSize,
              q = E.initiatorType;
            H &&
              Om(q) &&
              ((E = E.responseEnd), (d += H * (E < m ? 1 : (m - x) / (E - x))));
          }
          if ((--i, (t += (8 * (c + d)) / (u.duration / 1e3)), e++, 10 < e))
            break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection &&
      ((e = navigator.connection.downlink), typeof e == "number")
      ? e
      : 5;
  }
  var eo = null,
    to = null;
  function Cu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Dm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _m(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function no(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var ao = null;
  function Xv() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === ao
        ? !1
        : ((ao = e), !0)
      : ((ao = null), !1);
  }
  var xm = typeof setTimeout == "function" ? setTimeout : void 0,
    Zv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    wm = typeof Promise == "function" ? Promise : void 0,
    Fv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof wm < "u"
          ? function (e) {
              return wm.resolve(null).then(e).catch(Kv);
            }
          : xm;
  function Kv(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ua(e) {
    return e === "head";
  }
  function Mm(e, t) {
    var n = t,
      i = 0;
    do {
      var u = n.nextSibling;
      if ((e.removeChild(n), u && u.nodeType === 8))
        if (((n = u.data), n === "/$" || n === "/&")) {
          if (i === 0) {
            (e.removeChild(u), $l(t));
            return;
          }
          i--;
        } else if (
          n === "$" ||
          n === "$?" ||
          n === "$~" ||
          n === "$!" ||
          n === "&"
        )
          i++;
        else if (n === "html") Fi(e.ownerDocument.documentElement);
        else if (n === "head") {
          ((n = e.ownerDocument.head), Fi(n));
          for (var c = n.firstChild; c;) {
            var d = c.nextSibling,
              m = c.nodeName;
            (c[Ze] ||
              m === "SCRIPT" ||
              m === "STYLE" ||
              (m === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(c),
              (c = d));
          }
        } else n === "body" && Fi(e.ownerDocument.body);
      n = u;
    } while (n);
    $l(t);
  }
  function zm(e, t) {
    var n = e;
    e = 0;
    do {
      var i = n.nextSibling;
      if (
        (n.nodeType === 1
          ? t
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (t
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        i && i.nodeType === 8)
      )
        if (((n = i.data), n === "/$")) {
          if (e === 0) break;
          e--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || e++;
      n = i;
    } while (n);
  }
  function lo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (lo(n), ke(n));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function Jv(e, t, n, i) {
    for (; e.nodeType === 1;) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[Ze])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((c = e.getAttribute("rel")),
                c === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                c !== u.rel ||
                e.getAttribute("href") !==
                  (u.href == null || u.href === "" ? null : u.href) ||
                e.getAttribute("crossorigin") !==
                  (u.crossOrigin == null ? null : u.crossOrigin) ||
                e.getAttribute("title") !== (u.title == null ? null : u.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((c = e.getAttribute("src")),
                (c !== (u.src == null ? null : u.src) ||
                  e.getAttribute("type") !== (u.type == null ? null : u.type) ||
                  e.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin)) &&
                  c &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === c) return e;
      } else return e;
      if (((e = on(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function $v(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = on(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Um(e, t) {
    for (; e.nodeType !== 8;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = on(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function io(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ro(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function Iv(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading") t();
    else {
      var i = function () {
        (t(), n.removeEventListener("DOMContentLoaded", i));
      };
      (n.addEventListener("DOMContentLoaded", i), (e._reactRetry = i));
    }
  }
  function on(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var uo = null;
  function Lm(e) {
    e = e.nextSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return on(e.nextSibling);
          t--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function jm(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else (n !== "/$" && n !== "/&") || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Hm(e, t, n) {
    switch (((t = Cu(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(s(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(s(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Fi(e) {
    for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
    ke(e);
  }
  var fn = new Map(),
    Bm = new Set();
  function Ou(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ra = X.d;
  X.d = { f: Wv, r: Pv, D: eg, C: tg, L: ng, m: ag, X: ig, S: lg, M: rg };
  function Wv() {
    var e = ra.f(),
      t = gu();
    return e || t;
  }
  function Pv(e) {
    var t = Ae(e);
    t !== null && t.tag === 5 && t.type === "form" ? th(t) : ra.r(e);
  }
  var Fl = typeof document > "u" ? null : document;
  function km(e, t, n) {
    var i = Fl;
    if (i && typeof t == "string" && t) {
      var u = Bt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
        Bm.has(u) ||
          (Bm.add(u),
          (e = { rel: e, crossOrigin: n, href: t }),
          i.querySelector(u) === null &&
            ((t = i.createElement("link")),
            Dt(t, "link", e),
            Ve(t),
            i.head.appendChild(t))));
    }
  }
  function eg(e) {
    (ra.D(e), km("dns-prefetch", e, null));
  }
  function tg(e, t) {
    (ra.C(e, t), km("preconnect", e, t));
  }
  function ng(e, t, n) {
    ra.L(e, t, n);
    var i = Fl;
    if (i && e && t) {
      var u = 'link[rel="preload"][as="' + Bt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((u += '[imagesrcset="' + Bt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (u += '[imagesizes="' + Bt(n.imageSizes) + '"]'))
        : (u += '[href="' + Bt(e) + '"]');
      var c = u;
      switch (t) {
        case "style":
          c = Kl(e);
          break;
        case "script":
          c = Jl(e);
      }
      fn.has(c) ||
        ((e = b(
          {
            rel: "preload",
            href: t === "image" && n && n.imageSrcSet ? void 0 : e,
            as: t
          },
          n
        )),
        fn.set(c, e),
        i.querySelector(u) !== null ||
          (t === "style" && i.querySelector(Ki(c))) ||
          (t === "script" && i.querySelector(Ji(c))) ||
          ((t = i.createElement("link")),
          Dt(t, "link", e),
          Ve(t),
          i.head.appendChild(t)));
    }
  }
  function ag(e, t) {
    ra.m(e, t);
    var n = Fl;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script",
        u =
          'link[rel="modulepreload"][as="' + Bt(i) + '"][href="' + Bt(e) + '"]',
        c = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Jl(e);
      }
      if (
        !fn.has(c) &&
        ((e = b({ rel: "modulepreload", href: e }, t)),
        fn.set(c, e),
        n.querySelector(u) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ji(c))) return;
        }
        ((i = n.createElement("link")),
          Dt(i, "link", e),
          Ve(i),
          n.head.appendChild(i));
      }
    }
  }
  function lg(e, t, n) {
    ra.S(e, t, n);
    var i = Fl;
    if (i && e) {
      var u = ut(i).hoistableStyles,
        c = Kl(e);
      t = t || "default";
      var d = u.get(c);
      if (!d) {
        var m = { loading: 0, preload: null };
        if ((d = i.querySelector(Ki(c)))) m.loading = 5;
        else {
          ((e = b({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = fn.get(c)) && so(e, n));
          var E = (d = i.createElement("link"));
          (Ve(E),
            Dt(E, "link", e),
            (E._p = new Promise(function (x, H) {
              ((E.onload = x), (E.onerror = H));
            })),
            E.addEventListener("load", function () {
              m.loading |= 1;
            }),
            E.addEventListener("error", function () {
              m.loading |= 2;
            }),
            (m.loading |= 4),
            Du(d, t, i));
        }
        ((d = { type: "stylesheet", instance: d, count: 1, state: m }),
          u.set(c, d));
      }
    }
  }
  function ig(e, t) {
    ra.X(e, t);
    var n = Fl;
    if (n && e) {
      var i = ut(n).hoistableScripts,
        u = Jl(e),
        c = i.get(u);
      c ||
        ((c = n.querySelector(Ji(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = fn.get(u)) && co(e, t),
          (c = n.createElement("script")),
          Ve(c),
          Dt(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(u, c));
    }
  }
  function rg(e, t) {
    ra.M(e, t);
    var n = Fl;
    if (n && e) {
      var i = ut(n).hoistableScripts,
        u = Jl(e),
        c = i.get(u);
      c ||
        ((c = n.querySelector(Ji(u))),
        c ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = fn.get(u)) && co(e, t),
          (c = n.createElement("script")),
          Ve(c),
          Dt(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(u, c));
    }
  }
  function qm(e, t, n, i) {
    var u = (u = ye.current) ? Ou(u) : null;
    if (!u) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Kl(n.href)),
            (n = ut(u).hoistableStyles),
            (i = n.get(t)),
            i ||
              ((i = { type: "style", instance: null, count: 0, state: null }),
              n.set(t, i)),
            i)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          e = Kl(n.href);
          var c = ut(u).hoistableStyles,
            d = c.get(e);
          if (
            (d ||
              ((u = u.ownerDocument || u),
              (d = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }),
              c.set(e, d),
              (c = u.querySelector(Ki(e))) &&
                !c._p &&
                ((d.instance = c), (d.state.loading = 5)),
              fn.has(e) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy
                }),
                fn.set(e, n),
                c || ug(u, e, n, d.state))),
            t && i === null)
          )
            throw Error(s(528, ""));
          return d;
        }
        if (t && i !== null) throw Error(s(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Jl(n)),
              (n = ut(u).hoistableScripts),
              (i = n.get(t)),
              i ||
                ((i = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null
                }),
                n.set(t, i)),
              i)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(s(444, e));
    }
  }
  function Kl(e) {
    return 'href="' + Bt(e) + '"';
  }
  function Ki(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Ym(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function ug(e, t, n, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (i.loading = 1)
      : ((t = e.createElement("link")),
        (i.preload = t),
        t.addEventListener("load", function () {
          return (i.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (i.loading |= 2);
        }),
        Dt(t, "link", n),
        Ve(t),
        e.head.appendChild(t));
  }
  function Jl(e) {
    return '[src="' + Bt(e) + '"]';
  }
  function Ji(e) {
    return "script[async]" + e;
  }
  function Vm(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var i = e.querySelector('style[data-href~="' + Bt(n.href) + '"]');
          if (i) return ((t.instance = i), Ve(i), i);
          var u = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return (
            (i = (e.ownerDocument || e).createElement("style")),
            Ve(i),
            Dt(i, "style", u),
            Du(i, n.precedence, e),
            (t.instance = i)
          );
        case "stylesheet":
          u = Kl(n.href);
          var c = e.querySelector(Ki(u));
          if (c) return ((t.state.loading |= 4), (t.instance = c), Ve(c), c);
          ((i = Ym(n)),
            (u = fn.get(u)) && so(i, u),
            (c = (e.ownerDocument || e).createElement("link")),
            Ve(c));
          var d = c;
          return (
            (d._p = new Promise(function (m, E) {
              ((d.onload = m), (d.onerror = E));
            })),
            Dt(c, "link", i),
            (t.state.loading |= 4),
            Du(c, n.precedence, e),
            (t.instance = c)
          );
        case "script":
          return (
            (c = Jl(n.src)),
            (u = e.querySelector(Ji(c)))
              ? ((t.instance = u), Ve(u), u)
              : ((i = n),
                (u = fn.get(c)) && ((i = b({}, n)), co(i, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                Ve(u),
                Dt(u, "link", i),
                e.head.appendChild(u),
                (t.instance = u))
          );
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((i = t.instance), (t.state.loading |= 4), Du(i, n.precedence, e));
    return t.instance;
  }
  function Du(e, t, n) {
    for (
      var i = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        u = i.length ? i[i.length - 1] : null,
        c = u,
        d = 0;
      d < i.length;
      d++
    ) {
      var m = i[d];
      if (m.dataset.precedence === t) c = m;
      else if (c !== u) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function so(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function co(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var _u = null;
  function Gm(e, t, n) {
    if (_u === null) {
      var i = new Map(),
        u = (_u = new Map());
      u.set(n, i);
    } else ((u = _u), (i = u.get(n)), i || ((i = new Map()), u.set(n, i)));
    if (i.has(e)) return i;
    for (
      i.set(e, null), n = n.getElementsByTagName(e), u = 0;
      u < n.length;
      u++
    ) {
      var c = n[u];
      if (
        !(
          c[Ze] ||
          c[ee] ||
          (e === "link" && c.getAttribute("rel") === "stylesheet")
        ) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var d = c.getAttribute(t) || "";
        d = e + d;
        var m = i.get(d);
        m ? m.push(c) : i.set(d, [c]);
      }
    }
    return i;
  }
  function Qm(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      ));
  }
  function sg(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function Xm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function cg(e, t, n, i) {
    if (
      n.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var u = Kl(i.href),
          c = t.querySelector(Ki(u));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = xu.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = c),
            Ve(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (i = Ym(i)),
          (u = fn.get(u)) && so(i, u),
          (c = c.createElement("link")),
          Ve(c));
        var d = c;
        ((d._p = new Promise(function (m, E) {
          ((d.onload = m), (d.onerror = E));
        })),
          Dt(c, "link", i),
          (n.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = xu.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n)));
    }
  }
  var oo = 0;
  function og(e, t) {
    return (
      e.stylesheets && e.count === 0 && Mu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var i = setTimeout(function () {
              if ((e.stylesheets && Mu(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && oo === 0 && (oo = 62500 * Qv());
            var u = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && Mu(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > oo ? 50 : 800) + t
            );
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(i), clearTimeout(u));
              }
            );
          }
        : null
    );
  }
  function xu() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Mu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var wu = null;
  function Mu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (wu = new Map()),
        t.forEach(fg, e),
        (wu = null),
        xu.call(e)));
  }
  function fg(e, t) {
    if (!(t.state.loading & 4)) {
      var n = wu.get(e);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), wu.set(e, n));
        for (
          var u = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            c = 0;
          c < u.length;
          c++
        ) {
          var d = u[c];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") &&
            (n.set(d.dataset.precedence, d), (i = d));
        }
        i && n.set(null, i);
      }
      ((u = t.instance),
        (d = u.getAttribute("data-precedence")),
        (c = n.get(d) || i),
        c === i && n.set(null, u),
        n.set(d, u),
        this.count++,
        (i = xu.bind(this)),
        u.addEventListener("load", i),
        u.addEventListener("error", i),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var $i = {
    $$typeof: ne,
    Provider: null,
    Consumer: null,
    _currentValue: re,
    _currentValue2: re,
    _threadCount: 0
  };
  function dg(e, t, n, i, u, c, d, m, E) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = ma(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ma(0)),
      (this.hiddenUpdates = ma(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = u),
      (this.onCaughtError = c),
      (this.onRecoverableError = d),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()));
  }
  function Zm(e, t, n, i, u, c, d, m, E, x, H, q) {
    return (
      (e = new dg(e, t, n, d, E, x, H, q, m)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Zt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = Gs()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: i, isDehydrated: n, cache: t }),
      Fs(c),
      e
    );
  }
  function Fm(e) {
    return e ? ((e = Cl), e) : Cl;
  }
  function Km(e, t, n, i, u, c) {
    ((u = Fm(u)),
      i.context === null ? (i.context = u) : (i.pendingContext = u),
      (i = Ra(t)),
      (i.payload = { element: n }),
      (c = c === void 0 ? null : c),
      c !== null && (i.callback = c),
      (n = Aa(e, i, t)),
      n !== null && (Qt(n, e, t), Di(n, e, t)));
  }
  function Jm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function fo(e, t) {
    (Jm(e, t), (e = e.alternate) && Jm(e, t));
  }
  function $m(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ka(e, 67108864);
      (t !== null && Qt(t, e, 67108864), fo(e, 67108864));
    }
  }
  function Im(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = It();
      t = A(t);
      var n = Ka(e, t);
      (n !== null && Qt(n, e, t), fo(e, t));
    }
  }
  var zu = !0;
  function hg(e, t, n, i) {
    var u = w.T;
    w.T = null;
    var c = X.p;
    try {
      ((X.p = 2), ho(e, t, n, i));
    } finally {
      ((X.p = c), (w.T = u));
    }
  }
  function mg(e, t, n, i) {
    var u = w.T;
    w.T = null;
    var c = X.p;
    try {
      ((X.p = 8), ho(e, t, n, i));
    } finally {
      ((X.p = c), (w.T = u));
    }
  }
  function ho(e, t, n, i) {
    if (zu) {
      var u = mo(i);
      if (u === null) (Wc(e, t, i, Uu, n), Pm(e, i));
      else if (pg(u, e, t, n, i)) i.stopPropagation();
      else if ((Pm(e, i), t & 4 && -1 < yg.indexOf(e))) {
        for (; u !== null;) {
          var c = Ae(u);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var d = yn(c.pendingLanes);
                  if (d !== 0) {
                    var m = c;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; d;) {
                      var E = 1 << (31 - _t(d));
                      ((m.entanglements[1] |= E), (d &= ~E));
                    }
                    (Dn(c), (Qe & 6) === 0 && ((pu = Mt() + 500), Qi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((m = Ka(c, 2)), m !== null && Qt(m, c, 2), gu(), fo(c, 2));
            }
          if (((c = mo(i)), c === null && Wc(e, t, i, Uu, n), c === u)) break;
          u = c;
        }
        u !== null && i.stopPropagation();
      } else Wc(e, t, i, null, n);
    }
  }
  function mo(e) {
    return ((e = ys(e)), yo(e));
  }
  var Uu = null;
  function yo(e) {
    if (((Uu = null), (e = tt(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = h(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = p(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Uu = e), null);
  }
  function Wm(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (jn()) {
          case fa:
            return 2;
          case fi:
            return 8;
          case da:
          case mn:
            return 32;
          case Pt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var po = !1,
    La = null,
    ja = null,
    Ha = null,
    Ii = new Map(),
    Wi = new Map(),
    Ba = [],
    yg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Pm(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        La = null;
        break;
      case "dragenter":
      case "dragleave":
        ja = null;
        break;
      case "mouseover":
      case "mouseout":
        Ha = null;
        break;
      case "pointerover":
      case "pointerout":
        Ii.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wi.delete(t.pointerId);
    }
  }
  function Pi(e, t, n, i, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: c,
          targetContainers: [u]
        }),
        t !== null && ((t = Ae(t)), t !== null && $m(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function pg(e, t, n, i, u) {
    switch (t) {
      case "focusin":
        return ((La = Pi(La, e, t, n, i, u)), !0);
      case "dragenter":
        return ((ja = Pi(ja, e, t, n, i, u)), !0);
      case "mouseover":
        return ((Ha = Pi(Ha, e, t, n, i, u)), !0);
      case "pointerover":
        var c = u.pointerId;
        return (Ii.set(c, Pi(Ii.get(c) || null, e, t, n, i, u)), !0);
      case "gotpointercapture":
        return (
          (c = u.pointerId),
          Wi.set(c, Pi(Wi.get(c) || null, e, t, n, i, u)),
          !0
        );
    }
    return !1;
  }
  function e0(e) {
    var t = tt(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = h(n)), t !== null)) {
            ((e.blockedOn = t),
              Q(e.priority, function () {
                Im(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(n)), t !== null)) {
            ((e.blockedOn = t),
              Q(e.priority, function () {
                Im(n);
              }));
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Lu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var n = mo(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((ms = i), n.target.dispatchEvent(i), (ms = null));
      } else return ((t = Ae(n)), t !== null && $m(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function t0(e, t, n) {
    Lu(e) && n.delete(t);
  }
  function vg() {
    ((po = !1),
      La !== null && Lu(La) && (La = null),
      ja !== null && Lu(ja) && (ja = null),
      Ha !== null && Lu(Ha) && (Ha = null),
      Ii.forEach(t0),
      Wi.forEach(t0));
  }
  function ju(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      po ||
        ((po = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, vg)));
  }
  var Hu = null;
  function n0(e) {
    Hu !== e &&
      ((Hu = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Hu === e && (Hu = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            i = e[t + 1],
            u = e[t + 2];
          if (typeof i != "function") {
            if (yo(i || n) === null) continue;
            break;
          }
          var c = Ae(n);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            hc(c, { pending: !0, data: u, method: n.method, action: i }, i, u));
        }
      }));
  }
  function $l(e) {
    function t(E) {
      return ju(E, e);
    }
    (La !== null && ju(La, e),
      ja !== null && ju(ja, e),
      Ha !== null && ju(Ha, e),
      Ii.forEach(t),
      Wi.forEach(t));
    for (var n = 0; n < Ba.length; n++) {
      var i = Ba[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ba.length && ((n = Ba[0]), n.blockedOn === null);)
      (e0(n), n.blockedOn === null && Ba.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var u = n[i],
          c = n[i + 1],
          d = u[$] || null;
        if (typeof c == "function") d || n0(n);
        else if (d) {
          var m = null;
          if (c && c.hasAttribute("formAction")) {
            if (((u = c), (d = c[$] || null))) m = d.formAction;
            else if (yo(u) !== null) continue;
          } else m = d.action;
          (typeof m == "function" ? (n[i + 1] = m) : (n.splice(i, 3), (i -= 3)),
            n0(n));
        }
      }
  }
  function a0() {
    function e(c) {
      c.canIntercept &&
        c.info === "react-transition" &&
        c.intercept({
          handler: function () {
            return new Promise(function (d) {
              return (u = d);
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
    }
    function t() {
      (u !== null && (u(), (u = null)), i || setTimeout(n, 20));
    }
    function n() {
      if (!i && !navigation.transition) {
        var c = navigation.currentEntry;
        c &&
          c.url != null &&
          navigation.navigate(c.url, {
            state: c.getState(),
            info: "react-transition",
            history: "replace"
          });
      }
    }
    if (typeof navigation == "object") {
      var i = !1,
        u = null;
      return (
        navigation.addEventListener("navigate", e),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(n, 100),
        function () {
          ((i = !0),
            navigation.removeEventListener("navigate", e),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            u !== null && (u(), (u = null)));
        }
      );
    }
  }
  function vo(e) {
    this._internalRoot = e;
  }
  ((Bu.prototype.render = vo.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var n = t.current,
        i = It();
      Km(n, i, e, t, null, null);
    }),
    (Bu.prototype.unmount = vo.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Km(e.current, 2, null, e, null, null), gu(), (t[P] = null));
        }
      }));
  function Bu(e) {
    this._internalRoot = e;
  }
  Bu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = G();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ba.length && t !== 0 && t < Ba[n].priority; n++);
      (Ba.splice(n, 0, e), n === 0 && e0(e));
    }
  };
  var l0 = l.version;
  if (l0 !== "19.2.8") throw Error(s(527, l0, "19.2.8"));
  X.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(s(188))
        : ((e = Object.keys(e).join(",")), Error(s(268, e)));
    return (
      (e = y(t)),
      (e = e !== null ? g(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var gg = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: w,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ku = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ku.isDisabled && ku.supportsFiber)
      try {
        ((Hn = ku.inject(gg)), (zt = ku));
      } catch {}
  }
  return (
    (tr.createRoot = function (e, t) {
      if (!o(e)) throw Error(s(299));
      var n = !1,
        i = "",
        u = fh,
        c = dh,
        d = hh;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (d = t.onRecoverableError)),
        (t = Zm(e, 1, !1, null, null, n, i, null, u, c, d, a0)),
        (e[P] = t.current),
        Ic(e),
        new vo(t)
      );
    }),
    (tr.hydrateRoot = function (e, t, n) {
      if (!o(e)) throw Error(s(299));
      var i = !1,
        u = "",
        c = fh,
        d = dh,
        m = hh,
        E = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (m = n.onRecoverableError),
          n.formState !== void 0 && (E = n.formState)),
        (t = Zm(e, 1, !0, t, n ?? null, i, u, E, c, d, m, a0)),
        (t.context = Fm(null)),
        (n = t.current),
        (i = It()),
        (i = A(i)),
        (u = Ra(i)),
        (u.callback = null),
        Aa(n, u, i),
        (n = i),
        (t.current.lanes = n),
        An(t, n),
        Dn(t),
        (e[P] = t.current),
        Ic(e),
        new Bu(t)
      );
    }),
    (tr.version = "19.2.8"),
    tr
  );
}
var m0;
function Dg() {
  if (m0) return Eo.exports;
  m0 = 1;
  function a() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return (a(), (Eo.exports = Og()), Eo.exports);
}
var _g = Dg();
const Pu = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  $o = /^[\\/]{2}/;
function ry(a, l) {
  return l + a.replace(/\\/g, "/");
}
const y0 = "popstate";
function p0(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "pathname" in a &&
    "search" in a &&
    "hash" in a &&
    "state" in a &&
    "key" in a
  );
}
function xg(a = {}) {
  function l(s, o) {
    let f = o.state?.masked,
      { pathname: h, search: p, hash: v } = f || s.location;
    return dr(
      "",
      { pathname: h, search: p, hash: v },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
      f
        ? {
            pathname: s.location.pathname,
            search: s.location.search,
            hash: s.location.hash
          }
        : void 0
    );
  }
  function r(s, o) {
    return typeof o == "string" ? o : zn(o);
  }
  return Mg(l, r, null, a);
}
function De(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function jt(a, l) {
  if (!a) {
    typeof console < "u" && console.warn(l);
    try {
      throw new Error(l);
    } catch {}
  }
}
function wg() {
  return Math.random().toString(36).substring(2, 10);
}
function v0(a, l) {
  return {
    usr: a.state,
    key: a.key,
    idx: l,
    masked: a.mask
      ? { pathname: a.pathname, search: a.search, hash: a.hash }
      : void 0
  };
}
function dr(a, l, r = null, s, o) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? Un(l) : l),
    state: r,
    key: (l && l.key) || s || wg(),
    mask: o
  };
}
function zn({ pathname: a = "/", search: l = "", hash: r = "" }) {
  return (
    l && l !== "?" && (a += l.charAt(0) === "?" ? l : "?" + l),
    r && r !== "#" && (a += r.charAt(0) === "#" ? r : "#" + r),
    a
  );
}
function Un(a) {
  let l = {};
  if (a) {
    let r = a.indexOf("#");
    r >= 0 && ((l.hash = a.substring(r)), (a = a.substring(0, r)));
    let s = a.indexOf("?");
    (s >= 0 && ((l.search = a.substring(s)), (a = a.substring(0, s))),
      a && (l.pathname = a));
  }
  return l;
}
function Mg(a, l, r, s = {}) {
  let { window: o = document.defaultView, v5Compat: f = !1 } = s,
    h = o.history,
    p = "POP",
    v = null,
    y = g();
  y == null && ((y = 0), h.replaceState({ ...h.state, idx: y }, ""));
  function g() {
    return (h.state || { idx: null }).idx;
  }
  function b() {
    p = "POP";
    let Z = g(),
      I = Z == null ? null : Z - y;
    ((y = Z), v && v({ action: p, location: V.location, delta: I }));
  }
  function C(Z, I) {
    p = "PUSH";
    let te = p0(Z) ? Z : dr(V.location, Z, I);
    y = g() + 1;
    let ne = v0(te, y),
      oe = V.createHref(te.mask || te);
    try {
      h.pushState(ne, "", oe);
    } catch (se) {
      if (se instanceof DOMException && se.name === "DataCloneError") throw se;
      o.location.assign(oe);
    }
    f && v && v({ action: p, location: V.location, delta: 1 });
  }
  function O(Z, I) {
    p = "REPLACE";
    let te = p0(Z) ? Z : dr(V.location, Z, I);
    y = g();
    let ne = v0(te, y),
      oe = V.createHref(te.mask || te);
    (h.replaceState(ne, "", oe),
      f && v && v({ action: p, location: V.location, delta: 0 }));
  }
  function U(Z) {
    return uy(o, Z);
  }
  let V = {
    get action() {
      return p;
    },
    get location() {
      return a(o, h);
    },
    listen(Z) {
      if (v) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(y0, b),
        (v = Z),
        () => {
          (o.removeEventListener(y0, b), (v = null));
        }
      );
    },
    createHref(Z) {
      return l(o, Z);
    },
    createURL: U,
    encodeLocation(Z) {
      let I = U(Z);
      return { pathname: I.pathname, search: I.search, hash: I.hash };
    },
    push: C,
    replace: O,
    go(Z) {
      return h.go(Z);
    }
  };
  return V;
}
function uy(a, l, r = !1) {
  let s = "http://localhost";
  (a &&
    (s = a.location.origin !== "null" ? a.location.origin : a.location.href),
    De(s, "No window.location.(origin|href) available to create URL"));
  let o = typeof l == "string" ? l : zn(l);
  return (
    (o = o.replace(/ $/, "%20")),
    !r && $o.test(o) && (o = s + o),
    new URL(o, s)
  );
}
var g0 = class {
  #e = new Map();
  constructor(a) {
    if (a) for (let [l, r] of a) this.set(l, r);
  }
  get(a) {
    if (this.#e.has(a)) return this.#e.get(a);
    if (a.defaultValue !== void 0) return a.defaultValue;
    throw new Error("No value found for context");
  }
  set(a, l) {
    this.#e.set(a, l);
  }
};
const zg = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function Ug(a) {
  return zg.has(a);
}
const Lg = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function jg(a) {
  return Lg.has(a);
}
function Hg(a) {
  return a.index === !0;
}
function sy(a) {
  let l = {};
  return (
    a.Component &&
      Object.assign(l, {
        element: z.createElement(a.Component),
        Component: void 0
      }),
    a.HydrateFallback &&
      Object.assign(l, {
        hydrateFallbackElement: z.createElement(a.HydrateFallback),
        HydrateFallback: void 0
      }),
    a.ErrorBoundary &&
      Object.assign(l, {
        errorElement: z.createElement(a.ErrorBoundary),
        ErrorBoundary: void 0
      }),
    l
  );
}
function hr(a, l = sy, r = [], s = {}, o = !1) {
  return a.map((f, h) => {
    let p = [...r, String(h)],
      v = typeof f.id == "string" ? f.id : p.join("-");
    if (
      (De(
        f.index !== !0 || !f.children,
        "Cannot specify children on an index route"
      ),
      De(
        o || !s[v],
        `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
      ),
      Hg(f))
    ) {
      let y = { ...f, id: v };
      return ((s[v] = b0(y, l(y))), y);
    } else {
      let y = { ...f, id: v, children: void 0 };
      return (
        (s[v] = b0(y, l(y))),
        f.children && (y.children = hr(f.children, l, p, s, o)),
        y
      );
    }
  });
}
function b0(a, l) {
  return Object.assign(a, {
    ...l,
    ...(typeof l.lazy == "object" && l.lazy != null
      ? { lazy: { ...a.lazy, ...l.lazy } }
      : {})
  });
}
function cy(a, l, r = "/") {
  return Sn(a, l, r, !1);
}
function Sn(a, l, r, s, o) {
  let f = Tn((typeof l == "string" ? Un(l) : l).pathname || "/", r);
  if (f == null) return null;
  let h = o ?? Qu(a),
    p = null,
    v = Ig(f);
  for (let y = 0; p == null && y < h.length; ++y) p = $g(h[y], v, s);
  return p;
}
function Bg(a, l) {
  let { route: r, pathname: s, params: o } = a;
  return {
    id: r.id,
    pathname: s,
    params: o,
    loaderData: l[r.id],
    handle: r.handle
  };
}
function Qu(a) {
  let l = oy(a);
  return (kg(l), l);
}
function oy(a, l = [], r = [], s = "", o = !1) {
  let f = (h, p, v = o, y) => {
    let g = {
      relativePath: y === void 0 ? h.path || "" : y,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: p,
      route: h
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(s) && v) return;
      (De(
        g.relativePath.startsWith(s),
        `Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (g.relativePath = g.relativePath.slice(s.length)));
    }
    let b = hn([s, g.relativePath]),
      C = r.concat(g);
    (h.children &&
      h.children.length > 0 &&
      (De(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      oy(h.children, l, C, b, v)),
      !(h.path == null && !h.index) &&
        l.push({
          path: b,
          score: Kg(b, h.index),
          routesMeta: C.map((O, U) => {
            let [V, Z] = hy(
              O.relativePath,
              O.caseSensitive,
              U === C.length - 1
            );
            return { ...O, matcher: V, compiledParams: Z };
          })
        }));
  };
  return (
    a.forEach((h, p) => {
      if (h.path === "" || !h.path?.includes("?")) f(h, p);
      else for (let v of fy(h.path)) f(h, p, !0, v);
    }),
    l
  );
}
function fy(a) {
  let l = a.split("/");
  if (l.length === 0) return [];
  let [r, ...s] = l,
    o = r.endsWith("?"),
    f = r.replace(/\?$/, "");
  if (s.length === 0) return o ? [f, ""] : [f];
  let h = fy(s.join("/")),
    p = [];
  return (
    p.push(...h.map((v) => (v === "" ? f : [f, v].join("/")))),
    o && p.push(...h),
    p.map((v) => (a.startsWith("/") && v === "" ? "/" : v))
  );
}
function kg(a) {
  a.sort((l, r) =>
    l.score !== r.score
      ? r.score - l.score
      : Jg(
          l.routesMeta.map((s) => s.childrenIndex),
          r.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
const qg = /^:[\w-]+$/,
  Yg = /^:[\w-]+/,
  Vg = 3.5,
  Gg = 3,
  Qg = 2,
  Xg = 1,
  Zg = 10,
  Fg = -2,
  E0 = (a) => a === "*";
function Kg(a, l) {
  let r = a.split("/"),
    s = r.length;
  return (
    r.some(E0) && (s += Fg),
    l && (s += Qg),
    r
      .filter((o) => !E0(o))
      .reduce(
        (o, f) => o + (qg.test(f) ? Gg : Yg.test(f) ? Vg : f === "" ? Xg : Zg),
        s
      )
  );
}
function Jg(a, l) {
  return a.length === l.length && a.slice(0, -1).every((r, s) => r === l[s])
    ? a[a.length - 1] - l[l.length - 1]
    : 0;
}
function $g(a, l, r = !1) {
  let { routesMeta: s } = a,
    o = {},
    f = "/",
    h = [];
  for (let p = 0; p < s.length; ++p) {
    let v = s[p],
      y = p === s.length - 1,
      g = f === "/" ? l : l.slice(f.length) || "/",
      b = { path: v.relativePath, caseSensitive: v.caseSensitive, end: y },
      C =
        v.matcher && v.compiledParams
          ? dy(b, g, v.matcher, v.compiledParams)
          : $u(b, g),
      O = v.route;
    if (
      (!C &&
        y &&
        r &&
        !s[s.length - 1].route.index &&
        (C = $u(
          { path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 },
          g
        )),
      !C)
    )
      return null;
    (Object.assign(o, C.params),
      h.push({
        params: o,
        pathname: hn([f, C.pathname]),
        pathnameBase: e1(hn([f, C.pathnameBase])),
        route: O
      }),
      C.pathnameBase !== "/" && (f = hn([f, C.pathnameBase])));
  }
  return h;
}
function $u(a, l) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [r, s] = hy(a.path, a.caseSensitive, a.end);
  return dy(a, l, r, s);
}
function dy(a, l, r, s) {
  let o = l.match(r);
  if (!o) return null;
  let f = o[0],
    h = f.replace(/(.)\/+$/, "$1"),
    p = o.slice(1);
  return {
    params: s.reduce((v, { paramName: y, isOptional: g }, b) => {
      if (y === "*") {
        let O = p[b] || "";
        h = f.slice(0, f.length - O.length).replace(/(.)\/+$/, "$1");
      }
      const C = p[b];
      return (
        g && !C ? (v[y] = void 0) : (v[y] = (C || "").replace(/%2F/g, "/")),
        v
      );
    }, {}),
    pathname: f,
    pathnameBase: h,
    pattern: a
  };
}
function hy(a, l = !1, r = !0) {
  jt(
    a === "*" || !a.endsWith("*") || a.endsWith("/*"),
    `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, "/*")}".`
  );
  let s = [],
    o =
      "^" +
      a
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (f, h, p, v, y) => {
          if ((s.push({ paramName: h, isOptional: p != null }), p)) {
            let g = y.charAt(v + f.length);
            return g && g !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(?=\/|$|\()/g, "(?:/$1)?");
  return (
    a.endsWith("*")
      ? (s.push({ paramName: "*" }),
        (o += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (o += "\\/*$")
        : a !== "" && a !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, l ? void 0 : "i"), s]
  );
}
function Ig(a) {
  try {
    return a
      .split("/")
      .map((l) => decodeURIComponent(l).replace(/\//g, "%2F"))
      .join("/");
  } catch (l) {
    return (
      jt(
        !1,
        `The URL path "${a}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${l}).`
      ),
      a
    );
  }
}
function Tn(a, l) {
  if (l === "/") return a;
  if (!a.toLowerCase().startsWith(l.toLowerCase())) return null;
  let r = l.endsWith("/") ? l.length - 1 : l.length,
    s = a.charAt(r);
  return s && s !== "/" ? null : a.slice(r) || "/";
}
function Wg({ basename: a, pathname: l }) {
  return l === "/" ? a : hn([a, l]);
}
const Io = (a) => Pu.test(a);
function Pg(a, l = "/") {
  let {
      pathname: r,
      search: s = "",
      hash: o = ""
    } = typeof a == "string" ? Un(a) : a,
    f;
  return (
    r
      ? ((r = Po(r)),
        r.startsWith("/") ? (f = S0(r.substring(1), "/")) : (f = S0(r, l)))
      : (f = l),
    { pathname: f, search: t1(s), hash: n1(o) }
  );
}
function S0(a, l) {
  let r = yy(l).split("/");
  return (
    a.split("/").forEach((s) => {
      s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Ao(a, l, r, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function my(a) {
  return a.filter(
    (l, r) => r === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function Wo(a) {
  let l = my(a);
  return l.map((r, s) => (s === l.length - 1 ? r.pathname : r.pathnameBase));
}
function es(a, l, r, s = !1) {
  let o;
  typeof a == "string"
    ? (o = Un(a))
    : ((o = { ...a }),
      De(
        !o.pathname || !o.pathname.includes("?"),
        Ao("?", "pathname", "search", o)
      ),
      De(
        !o.pathname || !o.pathname.includes("#"),
        Ao("#", "pathname", "hash", o)
      ),
      De(!o.search || !o.search.includes("#"), Ao("#", "search", "hash", o)));
  let f = a === "" || o.pathname === "",
    h = f ? "/" : o.pathname,
    p;
  if (h == null) p = r;
  else {
    let b = l.length - 1;
    if (!s && h.startsWith("..")) {
      let C = h.split("/");
      for (; C[0] === "..";) (C.shift(), (b -= 1));
      o.pathname = C.join("/");
    }
    p = b >= 0 ? l[b] : "/";
  }
  let v = Pg(o, p),
    y = h && h !== "/" && h.endsWith("/"),
    g = (f || h === ".") && r.endsWith("/");
  return (!v.pathname.endsWith("/") && (y || g) && (v.pathname += "/"), v);
}
const Po = (a) => a.replace(/[\\/]{2,}/g, "/"),
  hn = (a) => Po(a.join("/")),
  yy = (a) => a.replace(/\/+$/, ""),
  e1 = (a) => yy(a).replace(/^\/*/, "/"),
  t1 = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  n1 = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a),
  a1 = [
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
var vr = class {
  status;
  statusText;
  data;
  error;
  internal;
  constructor(a, l, r, s = !1) {
    ((this.status = a),
      (this.statusText = l || ""),
      (this.internal = s),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r));
  }
};
function mr(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.internal == "boolean" &&
    "data" in a
  );
}
function li(a) {
  return hn(a.map((l) => l.route.path).filter(Boolean)) || "/";
}
function ef(a, l) {
  let r = new URL(typeof a == "string" || a instanceof URL ? a : a.url),
    s = typeof l == "string" ? Un(l) : l;
  if (((r.pathname = s.pathname || "/"), s.search)) {
    let o = new URLSearchParams(s.search),
      f = o.getAll("index");
    o.delete("index");
    for (let p of f.filter(Boolean)) o.append("index", p);
    let h = o.toString();
    r.search = h ? `?${h}` : "";
  } else r.search = "";
  return ((r.hash = s.hash || ""), r);
}
const py =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function vy(a, l) {
  let r = a;
  if (typeof r != "string" || !Pu.test(r))
    return { absoluteURL: void 0, isExternal: !1, to: r };
  let s = r,
    o = !1;
  if (py)
    try {
      let f = new URL(window.location.href),
        h = $o.test(r) ? new URL(ry(r, f.protocol)) : new URL(r),
        p = Tn(h.pathname, l);
      h.origin === f.origin && p != null
        ? (r = p + h.search + h.hash)
        : (o = !0);
    } catch {
      jt(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: s, isExternal: o, to: r };
}
const gy = Symbol("Uninstrumented");
let ur = new WeakMap();
function l1(a, l) {
  let r = {
    lazy: [],
    "lazy.loader": [],
    "lazy.action": [],
    "lazy.middleware": [],
    middleware: [],
    loader: [],
    action: []
  };
  a.forEach((o) =>
    o({
      id: l.id,
      index: l.index,
      path: l.path,
      instrument(f) {
        (f.lazy != null && r.lazy.push(f.lazy),
          f["lazy.loader"] != null && r["lazy.loader"].push(f["lazy.loader"]),
          f["lazy.action"] != null && r["lazy.action"].push(f["lazy.action"]),
          f["lazy.middleware"] != null &&
            r["lazy.middleware"].push(f["lazy.middleware"]),
          f.middleware != null && r.middleware.push(f.middleware),
          f.loader != null && r.loader.push(f.loader),
          f.action != null && r.action.push(f.action));
      }
    })
  );
  let s = {};
  if (typeof l.lazy == "function" && r.lazy.length > 0) {
    let o = l.lazy;
    s.lazy = async (...f) => ua(await xn(r.lazy, void 0, () => o(...f), sa));
  }
  if (typeof l.lazy == "object") {
    let o = l.lazy;
    if (typeof o.middleware == "function" && r["lazy.middleware"].length > 0) {
      let f = o.middleware;
      s.lazy = Object.assign(s.lazy || {}, {
        middleware: async (...h) =>
          ua(await xn(r["lazy.middleware"], void 0, () => f(...h), sa))
      });
    }
    if (typeof o.loader == "function" && r["lazy.loader"].length > 0) {
      let f = o.loader;
      s.lazy = Object.assign(s.lazy || {}, {
        loader: async (...h) =>
          ua(await xn(r["lazy.loader"], void 0, () => f(...h), sa))
      });
    }
    if (typeof o.action == "function" && r["lazy.action"].length > 0) {
      let f = o.action;
      s.lazy = Object.assign(s.lazy || {}, {
        action: async (...h) =>
          ua(await xn(r["lazy.action"], void 0, () => f(...h), sa))
      });
    }
  }
  if (typeof l.loader == "function" && r.loader.length > 0) {
    let o = sr(l.loader),
      f = async (...h) => ua(await xn(r.loader, No(h[0]), () => o(...h), sa));
    (o.hydrate === !0 && (f.hydrate = !0), cr(f, o), (s.loader = f));
  }
  if (typeof l.action == "function" && r.action.length > 0) {
    let o = sr(l.action),
      f = async (...h) => ua(await xn(r.action, No(h[0]), () => o(...h), sa));
    (cr(f, o), (s.action = f));
  }
  return (
    l.middleware &&
      l.middleware.length > 0 &&
      r.middleware.length > 0 &&
      (s.middleware = l.middleware.map((o) => {
        let f = sr(o),
          h = async (...p) =>
            ua(await xn(r.middleware, No(p[0]), () => f(...p), sa));
        return (cr(h, f), h);
      })),
    s
  );
}
function i1(a, l) {
  let r = { navigate: [], fetch: [] };
  if (
    (l.forEach((s) =>
      s({
        instrument(o) {
          (o.navigate != null && r.navigate.push(o.navigate),
            o.fetch != null && r.fetch.push(o.fetch));
        }
      })
    ),
    r.navigate.length > 0)
  ) {
    let s = sr(a.navigate),
      o = async (...f) => {
        let [h, p] = f,
          v,
          y = {
            to:
              typeof h == "number" || typeof h == "string"
                ? h
                : h
                  ? zn(h)
                  : ".",
            ...A0(a, p ?? {})
          };
        return ua(
          await xn(
            r.navigate,
            y,
            async () => {
              if (typeof h == "number") return await s(...f);
              let g = T0(a, (b) => {
                v = b;
              });
              try {
                return await s(...f);
              } finally {
                g();
              }
            },
            (g) => ({ ...sa(g), meta: v })
          )
        );
      };
    (cr(o, s), (a.navigate = o));
  }
  if (r.fetch.length > 0) {
    let s = sr(a.fetch),
      o = async (...f) => {
        let [h, p, v, y] = f,
          g;
        return ua(
          await xn(
            r.fetch,
            { href: v ?? ".", fetcherKey: h, ...A0(a, y ?? {}) },
            async () => {
              let b = T0(a, (C) => {
                g = C;
              });
              try {
                return await s(...f);
              } finally {
                b();
              }
            },
            (b) => ({ ...sa(b), meta: g })
          )
        );
      };
    (cr(o, s), (a.fetch = o));
  }
  return a;
}
function sr(a) {
  return a[gy] ?? a;
}
function cr(a, l) {
  a[gy] = l;
}
function T0(a, l) {
  return (
    ur.set(a, l),
    () => {
      ur.get(a) === l && ur.delete(a);
    }
  );
}
function R0(a) {
  let l = ur.get(a);
  return (ur.delete(a), l);
}
function ua(a) {
  if (a.type === "error") throw a.value;
  return a.value;
}
async function xn(
  a,
  l,
  r,
  s,
  o = { result: null, innerResult: null },
  f = a.length - 1
) {
  let h = a[f];
  if (h) {
    let p,
      v = async () => (
        p
          ? console.error(
              "You cannot call instrumented handlers more than once"
            )
          : (p = xn(a, l, r, s, o, f - 1)),
        await p,
        De(o.innerResult, "Expected an inner result"),
        o.innerResult
      );
    try {
      await h(v, l);
    } catch (y) {
      console.error("An instrumentation function threw an error:", y);
    }
    (p || (await v()), await p);
  } else {
    try {
      o.result = { type: "success", value: await r() };
    } catch (p) {
      o.result = { type: "error", value: p };
    }
    o.innerResult = s(o.result, l);
  }
  return (
    o.result ||
      ((o.result = {
        type: "error",
        value: new Error("No result assigned in instrumentation chain.")
      }),
      (o.innerResult = s(o.result, l))),
    o.result
  );
}
function sa(a) {
  return a.type === "error" && a.value instanceof Error
    ? { status: "error", error: a.value }
    : { status: "success", error: void 0 };
}
function No(a) {
  let { request: l, context: r, params: s } = a;
  return { ...a, request: r1(l), params: { ...s }, context: u1(r) };
}
function A0(a, l) {
  return {
    currentUrl: zn(a.state.location),
    ...("formMethod" in l ? { formMethod: l.formMethod } : {}),
    ...("formEncType" in l ? { formEncType: l.formEncType } : {}),
    ...("formData" in l ? { formData: l.formData } : {}),
    ...("body" in l ? { body: l.body } : {})
  };
}
function r1(a) {
  return {
    method: a.method,
    url: a.url,
    headers: { get: (...l) => a.headers.get(...l) }
  };
}
function u1(a) {
  return { get: (l) => a.get(l) };
}
const by = ["POST", "PUT", "PATCH", "DELETE"],
  s1 = new Set(by),
  c1 = ["GET", ...by],
  o1 = new Set(c1),
  Ey = new Set([301, 302, 303, 307, 308]),
  f1 = new Set([307, 308]),
  Co = {
    state: "idle",
    location: void 0,
    matches: void 0,
    historyAction: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  },
  d1 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  },
  nr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Sy = "remix-router-transitions",
  Ty = Symbol("ResetLoaderData");
var h1 = class {
  #e;
  #n;
  #t;
  #a;
  constructor(l) {
    ((this.#e = l), (this.#n = Qu(l)));
  }
  get stableRoutes() {
    return this.#e;
  }
  get activeRoutes() {
    return this.#t ?? this.#e;
  }
  get branches() {
    return this.#a ?? this.#n;
  }
  get hasHMRRoutes() {
    return this.#t != null;
  }
  setRoutes(l) {
    ((this.#e = l), (this.#n = Qu(l)));
  }
  setHmrRoutes(l) {
    ((this.#t = l), (this.#a = Qu(l)));
  }
  commitHmrRoutes() {
    this.#t &&
      ((this.#e = this.#t),
      (this.#n = this.#a),
      (this.#t = void 0),
      (this.#a = void 0));
  }
};
function m1(a) {
  const l = a.window ? a.window : typeof window < "u" ? window : void 0,
    r =
      typeof l < "u" &&
      typeof l.document < "u" &&
      typeof l.document.createElement < "u";
  De(
    a.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = a.hydrationRouteProperties || [],
    o = a.mapRouteProperties,
    f = o || (() => ({}));
  if (a.instrumentations) {
    let S = a.instrumentations;
    f = (A) => ({ ...o?.(A), ...l1(S.map((D) => D.route).filter(Boolean), A) });
  }
  let h = {},
    p = new h1(hr(a.routes, f, void 0, h)),
    v = a.basename || "/";
  v.startsWith("/") || (v = `/${v}`);
  let y = a.dataStrategy || b1,
    g = { ...a.future },
    b = null,
    C = new Set(),
    O = null,
    U = null,
    V = null,
    Z = null,
    I = a.hydrationData != null,
    te = Sn(p.activeRoutes, a.history.location, v, !1, p.branches),
    ne = !1,
    oe = null,
    se,
    Te;
  if (te == null && !a.patchRoutesOnNavigation) {
    let S = dn(404, { pathname: a.history.location.pathname }),
      { matches: A, route: D } = qu(p.activeRoutes);
    ((se = !0), (Te = !se), (te = A), (oe = { [D.id]: S }));
  } else if (
    (te &&
      !a.hydrationData &&
      ma(te, p.activeRoutes, a.history.location.pathname).active &&
      (te = null),
    te)
  )
    if (te.some((S) => S.route.lazy)) ((se = !1), (Te = !se));
    else if (!te.some((S) => tf(S.route))) ((se = !0), (Te = !se));
    else {
      let S = a.hydrationData ? a.hydrationData.loaderData : null,
        A = a.hydrationData ? a.hydrationData.errors : null,
        D = te;
      if (A) {
        let G = te.findIndex((Q) => A[Q.route.id] !== void 0);
        D = D.slice(0, G + 1);
      }
      ((Te = !1),
        (se = !0),
        D.forEach((G) => {
          let Q = Ry(G.route, S, A);
          ((Te = Te || Q.renderFallback), (se = se && !Q.shouldLoad));
        }));
    }
  else {
    ((se = !1), (Te = !se), (te = []));
    let S = ma(null, p.activeRoutes, a.history.location.pathname);
    S.active && S.matches && ((ne = !0), (te = S.matches));
  }
  let J,
    L = {
      historyAction: a.history.action,
      location: a.history.location,
      matches: te,
      initialized: se,
      renderFallback: Te,
      navigation: Co,
      restoreScrollPosition: a.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (a.hydrationData && a.hydrationData.loaderData) || {},
      actionData: (a.hydrationData && a.hydrationData.actionData) || null,
      errors: (a.hydrationData && a.hydrationData.errors) || oe,
      fetchers: new Map(),
      blockers: new Map()
    },
    Re = "POP",
    He = null,
    Xe = !1,
    Oe,
    Be = !1,
    rt = new Map(),
    Je = null,
    w = !1,
    X = !1,
    re = new Set(),
    ce = new Map(),
    be = 0,
    T = -1,
    B = new Map(),
    K = new Set(),
    W = new Map(),
    fe = new Map(),
    ye = new Set(),
    _e = new Map(),
    dt,
    Pe = null;
  function Ya() {
    if (
      ((b = a.history.listen(({ action: S, location: A, delta: D }) => {
        if (dt) {
          (dt(), (dt = void 0));
          return;
        }
        jt(
          _e.size === 0 || D != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let G = Ga({
          currentLocation: L.location,
          nextLocation: A,
          historyAction: S
        });
        if (G && D != null) {
          let Q = new Promise((ae) => {
            dt = ae;
          });
          (a.history.go(D * -1),
            Bn(G, {
              state: "blocked",
              location: A,
              proceed() {
                (Bn(G, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: A
                }),
                  Q.then(() => a.history.go(D)));
              },
              reset() {
                let ae = new Map(L.blockers);
                (ae.set(G, nr), gt({ blockers: ae }));
              }
            }),
            He?.resolve(),
            (He = null));
          return;
        }
        return Ln(S, A);
      })),
      r)
    ) {
      B1(l, rt);
      let S = () => k1(l, rt);
      (l.addEventListener("pagehide", S),
        (Je = () => l.removeEventListener("pagehide", S)));
    }
    return (
      L.initialized || Ln("POP", L.location, { initialHydration: !0 }),
      J
    );
  }
  function hl() {
    (b && b(),
      Je && Je(),
      C.clear(),
      Oe && Oe.abort(),
      L.fetchers.forEach((S, A) => Hn(L.fetchers, A)),
      L.blockers.forEach((S, A) => Va(A)));
  }
  function ui(S) {
    if ((C.add(S), O)) {
      let { newErrors: A } = O;
      ((O = null),
        S(L, {
          deletedFetchers: [],
          newErrors: A,
          viewTransitionOpts: void 0,
          flushSync: !1
        }));
    }
    return () => C.delete(S);
  }
  function gt(S, A = {}) {
    (S.matches &&
      (S.matches = S.matches.map((Q) => {
        let ae = h[Q.route.id],
          ee = Q.route;
        return ee.element !== ae.element ||
          ee.errorElement !== ae.errorElement ||
          ee.hydrateFallbackElement !== ae.hydrateFallbackElement
          ? { ...Q, route: ae }
          : Q;
      })),
      (L = { ...L, ...S }));
    let D = [],
      G = [];
    (L.fetchers.forEach((Q, ae) => {
      Q.state === "idle" && (ye.has(ae) ? D.push(ae) : G.push(ae));
    }),
      ye.forEach((Q) => {
        !L.fetchers.has(Q) && !ce.has(Q) && D.push(Q);
      }),
      C.size === 0 && (O = { newErrors: S.errors ?? null }),
      [...C].forEach((Q) =>
        Q(L, {
          deletedFetchers: D,
          newErrors: S.errors ?? null,
          viewTransitionOpts: A.viewTransitionOpts,
          flushSync: A.flushSync === !0
        })
      ),
      D.forEach((Q) => Hn(L.fetchers, Q)),
      G.forEach((Q) => L.fetchers.delete(Q)));
  }
  function Ht(S, A, { flushSync: D } = {}) {
    let G =
        L.actionData != null &&
        L.navigation.formMethod != null &&
        wt(L.navigation.formMethod) &&
        L.navigation.state === "loading" &&
        S.state?._isRedirect !== !0,
      Q;
    A.actionData
      ? Object.keys(A.actionData).length > 0
        ? (Q = A.actionData)
        : (Q = null)
      : G
        ? (Q = L.actionData)
        : (Q = null);
    let ae = A.loaderData
        ? U0(L.loaderData, A.loaderData, A.matches || [], A.errors)
        : L.loaderData,
      ee = L.blockers;
    ee.size > 0 &&
      !w &&
      ((ee = new Map(ee)), ee.forEach((he, me) => ee.set(me, nr)));
    let $ = w ? !1 : di(S, A.matches || L.matches),
      P =
        Xe === !0 ||
        (L.navigation.formMethod != null &&
          wt(L.navigation.formMethod) &&
          S.state?._isRedirect !== !0);
    (p.commitHmrRoutes(),
      w ||
        Re === "POP" ||
        (Re === "PUSH"
          ? a.history.push(S, S.state)
          : Re === "REPLACE" && a.history.replace(S, S.state)));
    let ve;
    if (Re === "POP") {
      let he = rt.get(L.location.pathname);
      he && he.has(S.pathname)
        ? (ve = { currentLocation: L.location, nextLocation: S })
        : rt.has(S.pathname) &&
          (ve = { currentLocation: S, nextLocation: L.location });
    } else if (Be) {
      let he = rt.get(L.location.pathname);
      (he
        ? he.add(S.pathname)
        : ((he = new Set([S.pathname])), rt.set(L.location.pathname, he)),
        (ve = { currentLocation: L.location, nextLocation: S }));
    }
    (gt(
      {
        ...A,
        actionData: Q,
        loaderData: ae,
        historyAction: Re,
        location: S,
        initialized: !0,
        renderFallback: !1,
        navigation: Co,
        revalidation: "idle",
        restoreScrollPosition: $,
        preventScrollReset: P,
        blockers: ee
      },
      { viewTransitionOpts: ve, flushSync: D === !0 }
    ),
      (Re = "POP"),
      (Xe = !1),
      (Be = !1),
      (w = !1),
      (X = !1),
      He?.resolve(),
      (He = null),
      Pe?.resolve(),
      (Pe = null));
  }
  async function ml(S, A) {
    if ((He?.resolve(), (He = null), typeof S == "number")) {
      He || (He = k0());
      let ke = He.promise;
      return (a.history.go(S), ke);
    }
    let D = R0(J),
      {
        path: G,
        submission: Q,
        error: ae
      } = N0(
        !1,
        jo(L.location, L.matches, v, S, A?.fromRouteId, A?.relative),
        A
      ),
      ee;
    A?.mask &&
      (ee = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof A.mask == "string"
          ? Un(A.mask)
          : { ...L.location.mask, ...A.mask })
      });
    let $ = L.location,
      P = dr($, G, A && A.state, void 0, ee);
    P = { ...P, ...a.history.encodeLocation(P) };
    let ve = A && A.replace != null ? A.replace : void 0,
      he = "PUSH";
    ve === !0
      ? (he = "REPLACE")
      : ve === !1 ||
        (Q != null &&
          wt(Q.formMethod) &&
          Q.formAction === L.location.pathname + L.location.search &&
          (he = "REPLACE"));
    let me =
        A && "preventScrollReset" in A ? A.preventScrollReset === !0 : void 0,
      xe = (A && A.flushSync) === !0,
      Ze = Ga({ currentLocation: $, nextLocation: P, historyAction: he });
    if (Ze) {
      Bn(Ze, {
        state: "blocked",
        location: P,
        proceed() {
          (Bn(Ze, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: P
          }),
            ml(S, A));
        },
        reset() {
          let ke = new Map(L.blockers);
          (ke.set(Ze, nr), gt({ blockers: ke }));
        }
      });
      return;
    }
    await Ln(he, P, {
      submission: Q,
      pendingError: ae,
      preventScrollReset: me,
      replace: A && A.replace,
      enableViewTransition: A && A.viewTransition,
      flushSync: xe,
      callSiteDefaultShouldRevalidate: A && A.defaultShouldRevalidate,
      instrumentationNavigateMetaReceiver: D
    });
  }
  function si() {
    (Pe || (Pe = k0()), da(), gt({ revalidation: "loading" }));
    let S = Pe.promise;
    return L.navigation.state === "submitting"
      ? S
      : L.navigation.state === "idle"
        ? (Ln(L.historyAction, L.location, {
            startUninterruptedRevalidation: !0
          }),
          S)
        : (Ln(Re || L.historyAction, L.navigation.location, {
            overrideNavigation: L.navigation,
            enableViewTransition: Be === !0
          }),
          S);
  }
  async function Ln(S, A, D) {
    (Oe && Oe.abort(),
      (Oe = null),
      (Re = S),
      (w = (D && D.startUninterruptedRevalidation) === !0),
      os(L.location, L.matches),
      (Xe = (D && D.preventScrollReset) === !0),
      (Be = (D && D.enableViewTransition) === !0));
    let G = p.activeRoutes,
      Q =
        D?.initialHydration && L.matches && L.matches.length > 0 && !ne
          ? L.matches
          : Sn(G, A, v, !1, p.branches),
      ae = (D && D.flushSync) === !0;
    if (
      Q &&
      L.initialized &&
      !X &&
      D1(L.location, A) &&
      !(D && D.submission && wt(D.submission.formMethod))
    ) {
      Ht(A, { matches: Q }, { flushSync: ae });
      return;
    }
    let ee = ma(Q, G, A.pathname);
    if (
      (ee.active && ee.matches && (Q = ee.matches),
      D?.instrumentationNavigateMetaReceiver)
    ) {
      let Ae = H0(a.history, A, Q);
      D.instrumentationNavigateMetaReceiver(Ae);
    }
    if (!Q) {
      let { error: Ae, notFoundMatches: Ut, route: ut } = yn(A.pathname);
      Ht(
        A,
        { matches: Ut, loaderData: {}, errors: { [ut.id]: Ae } },
        { flushSync: ae }
      );
      return;
    }
    let $ =
      D && D.overrideNavigation
        ? { ...D.overrideNavigation, matches: Q, historyAction: S }
        : void 0;
    Oe = new AbortController();
    let P = Il(a.history, A, Oe.signal, D && D.submission),
      ve = a.getContext ? await a.getContext() : new g0(),
      he;
    if (D && D.pendingError)
      he = [qa(Q).route.id, { type: "error", error: D.pendingError }];
    else if (D && D.submission && wt(D.submission.formMethod)) {
      let Ae = await Ar(
        P,
        A,
        D.submission,
        Q,
        S,
        ve,
        ee.active,
        D && D.initialHydration === !0,
        { replace: D.replace, flushSync: ae }
      );
      if (Ae.shortCircuited) return;
      if (Ae.pendingActionResult) {
        let [Ut, ut] = Ae.pendingActionResult;
        if (Wt(ut) && mr(ut.error) && ut.error.status === 404) {
          ((Oe = null),
            Ht(A, {
              matches: Ae.matches,
              loaderData: {},
              errors: { [Ut]: ut.error }
            }));
          return;
        }
      }
      ((Q = Ae.matches || Q),
        (he = Ae.pendingActionResult),
        ($ = Oo(A, Q, S, D.submission)),
        (ae = !1),
        (ee.active = !1),
        (P = Il(a.history, P.url, P.signal)));
    }
    let {
      shortCircuited: me,
      matches: xe,
      loaderData: Ze,
      errors: ke,
      workingFetchers: tt
    } = await ci(
      P,
      A,
      Q,
      S,
      ve,
      ee.active,
      $,
      D && D.submission,
      D && D.fetcherSubmission,
      D && D.replace,
      D && D.initialHydration === !0,
      ae,
      he,
      D && D.callSiteDefaultShouldRevalidate
    );
    me ||
      ((Oe = null),
      Ht(A, {
        matches: xe || Q,
        ...L0(he),
        loaderData: Ze,
        errors: ke,
        ...(tt ? { fetchers: tt } : {})
      }));
  }
  async function Ar(S, A, D, G, Q, ae, ee, $, P = {}) {
    if (
      (da(),
      gt({ navigation: j1(A, G, Q, D) }, { flushSync: P.flushSync === !0 }),
      ee)
    ) {
      let me = await An(G, A.pathname, S.signal);
      if (me.type === "aborted") return { shortCircuited: !0 };
      if (me.type === "error") {
        if (me.partialMatches.length === 0) {
          let { matches: Ze, route: ke } = qu(p.activeRoutes);
          return {
            matches: Ze,
            pendingActionResult: [ke.id, { type: "error", error: me.error }]
          };
        }
        let xe = qa(me.partialMatches).route.id;
        return {
          matches: me.partialMatches,
          pendingActionResult: [xe, { type: "error", error: me.error }]
        };
      } else if (me.matches) G = me.matches;
      else {
        let { notFoundMatches: xe, error: Ze, route: ke } = yn(A.pathname);
        return {
          matches: xe,
          pendingActionResult: [ke.id, { type: "error", error: Ze }]
        };
      }
    }
    let ve,
      he = Xu(G, A);
    if (!he.route.action && !he.route.lazy)
      ve = {
        type: "error",
        error: dn(405, {
          method: S.method,
          pathname: A.pathname,
          routeId: he.route.id
        })
      };
    else {
      let me = await fa(S, A, ti(f, h, S, A, G, he, $ ? [] : s, ae), ae, null);
      if (((ve = me[he.route.id]), !ve)) {
        for (let xe of G)
          if (me[xe.route.id]) {
            ve = me[xe.route.id];
            break;
          }
      }
      if (S.signal.aborted) return { shortCircuited: !0 };
    }
    if (cl(ve)) {
      let me;
      return (
        P && P.replace != null
          ? (me = P.replace)
          : (me =
              w0(
                ve.response.headers.get("Location"),
                new URL(S.url),
                v,
                a.history
              ) ===
              L.location.pathname + L.location.search),
        await jn(S, ve, !0, { submission: D, replace: me }),
        { shortCircuited: !0 }
      );
    }
    if (Wt(ve)) {
      let me = qa(G, he.route.id);
      return (
        (P && P.replace) !== !0 && (Re = "PUSH"),
        { matches: G, pendingActionResult: [me.route.id, ve, he.route.id] }
      );
    }
    return { matches: G, pendingActionResult: [he.route.id, ve] };
  }
  async function ci(S, A, D, G, Q, ae, ee, $, P, ve, he, me, xe, Ze) {
    let ke = ee || Oo(A, D, G, $),
      tt = $ || P || B0(ke),
      Ae = !w && !he;
    if (ae) {
      if (Ae) {
        let Ge = yl(xe);
        gt(
          { navigation: ke, ...(Ge !== void 0 ? { actionData: Ge } : {}) },
          { flushSync: me }
        );
      }
      let Ee = await An(D, A.pathname, S.signal);
      if (Ee.type === "aborted") return { shortCircuited: !0 };
      if (Ee.type === "error") {
        if (Ee.partialMatches.length === 0) {
          let { matches: tn, route: pa } = qu(p.activeRoutes);
          return { matches: tn, loaderData: {}, errors: { [pa.id]: Ee.error } };
        }
        let Ge = qa(Ee.partialMatches).route.id;
        return {
          matches: Ee.partialMatches,
          loaderData: {},
          errors: { [Ge]: Ee.error }
        };
      } else if (Ee.matches) D = Ee.matches;
      else {
        let { error: Ge, notFoundMatches: tn, route: pa } = yn(A.pathname);
        return { matches: tn, loaderData: {}, errors: { [pa.id]: Ge } };
      }
    }
    let Ut = p.activeRoutes,
      { dsMatches: ut, revalidatingFetchers: Ve } = C0(
        S,
        Q,
        f,
        h,
        a.history,
        L,
        D,
        tt,
        A,
        he ? [] : s,
        he === !0,
        X,
        re,
        ye,
        W,
        K,
        Ut,
        v,
        a.patchRoutesOnNavigation != null,
        p.branches,
        xe,
        Ze
      );
    if (
      ((T = ++be),
      !a.dataStrategy &&
        !ut.some((Ee) => Ee.shouldLoad) &&
        !ut.some(
          (Ee) => Ee.route.middleware && Ee.route.middleware.length > 0
        ) &&
        Ve.length === 0)
    ) {
      let Ee = new Map(L.fetchers),
        Ge = Nr(Ee);
      return (
        Ht(
          A,
          {
            matches: D,
            loaderData: {},
            errors: xe && Wt(xe[1]) ? { [xe[0]]: xe[1].error } : null,
            ...L0(xe),
            ...(Ge ? { fetchers: Ee } : {})
          },
          { flushSync: me }
        ),
        { shortCircuited: !0 }
      );
    }
    if (Ae) {
      let Ee = {};
      if (!ae) {
        Ee.navigation = ke;
        let Ge = yl(xe);
        Ge !== void 0 && (Ee.actionData = Ge);
      }
      (Ve.length > 0 && (Ee.fetchers = oi(Ve)), gt(Ee, { flushSync: me }));
    }
    Ve.forEach((Ee) => {
      (St(Ee.key), Ee.controller && ce.set(Ee.key, Ee.controller));
    });
    let pn = () => Ve.forEach((Ee) => St(Ee.key));
    Oe && Oe.signal.addEventListener("abort", pn);
    let { loaderResults: kn, fetcherResults: en } = await fi(ut, Ve, S, A, Q);
    if (S.signal.aborted) return { shortCircuited: !0 };
    (Oe && Oe.signal.removeEventListener("abort", pn),
      Ve.forEach((Ee) => ce.delete(Ee.key)));
    let bt = Yu(kn);
    if (bt)
      return (
        await jn(S, bt.result, !0, { replace: ve }),
        { shortCircuited: !0 }
      );
    if (((bt = Yu(en)), bt))
      return (
        K.add(bt.key),
        await jn(S, bt.result, !0, { replace: ve }),
        { shortCircuited: !0 }
      );
    let ya = new Map(L.fetchers),
      { loaderData: qn, errors: Yn } = z0(L, D, kn, xe, Ve, en, ya);
    he && L.errors && (Yn = { ...L.errors, ...Yn });
    let vl = Nr(ya),
      Vn = Cr(T, ya),
      Gn = vl || Vn || Ve.length > 0;
    return {
      matches: D,
      loaderData: qn,
      errors: Yn,
      ...(Gn ? { workingFetchers: ya } : {})
    };
  }
  function yl(S) {
    if (S && !Wt(S[1])) return { [S[0]]: S[1].data };
    if (L.actionData)
      return Object.keys(L.actionData).length === 0 ? null : L.actionData;
  }
  function oi(S) {
    let A = new Map(L.fetchers);
    return (
      S.forEach((D) => {
        let G = A.get(D.key),
          Q = ar(void 0, G ? G.data : void 0);
        A.set(D.key, Q);
      }),
      A
    );
  }
  async function is(S, A, D, G) {
    St(S);
    let Q = (G && G.flushSync) === !0,
      ae = R0(J),
      ee = p.activeRoutes,
      $ = jo(L.location, L.matches, v, D, A, G?.relative),
      P = Sn(ee, $, v, !1, p.branches),
      ve = ma(P, ee, $);
    if (
      (ve.active && ve.matches && (P = ve.matches),
      ae && ae(H0(a.history, $, P)),
      !P)
    ) {
      Pt(S, A, dn(404, { pathname: $ }), { flushSync: Q });
      return;
    }
    let { path: he, submission: me, error: xe } = N0(!0, $, G);
    if (xe) {
      Pt(S, A, xe, { flushSync: Q });
      return;
    }
    let Ze = a.getContext ? await a.getContext() : new g0(),
      ke = (G && G.preventScrollReset) === !0;
    if (me && wt(me.formMethod)) {
      await rs(
        S,
        A,
        he,
        P,
        Ze,
        ve.active,
        Q,
        ke,
        me,
        G && G.defaultShouldRevalidate
      );
      return;
    }
    (W.set(S, { routeId: A, path: he }),
      await Mt(S, A, he, P, Ze, ve.active, Q, ke, me));
  }
  async function rs(S, A, D, G, Q, ae, ee, $, P, ve) {
    (da(), W.delete(S), mn(S, H1(P, L.fetchers.get(S)), { flushSync: ee }));
    let he = new AbortController(),
      me = Il(a.history, D, he.signal, P);
    if (ae) {
      let nt = await An(G, new URL(me.url).pathname, me.signal, S);
      if (nt.type === "aborted") return;
      if (nt.type === "error") {
        Pt(S, A, nt.error, { flushSync: ee });
        return;
      } else if (nt.matches) G = nt.matches;
      else {
        Pt(S, A, dn(404, { pathname: D }), { flushSync: ee });
        return;
      }
    }
    let xe = Xu(G, D);
    if (!xe.route.action && !xe.route.lazy) {
      Pt(S, A, dn(405, { method: P.formMethod, pathname: D, routeId: A }), {
        flushSync: ee
      });
      return;
    }
    ce.set(S, he);
    let Ze = be,
      ke = ti(f, h, me, D, G, xe, s, Q),
      tt = await fa(me, D, ke, Q, S),
      Ae = tt[xe.route.id];
    if (!Ae) {
      for (let nt of ke)
        if (tt[nt.route.id]) {
          Ae = tt[nt.route.id];
          break;
        }
    }
    if (me.signal.aborted) {
      ce.get(S) === he && ce.delete(S);
      return;
    }
    if (ye.has(S)) {
      if (cl(Ae) || Wt(Ae)) {
        mn(S, _n(void 0));
        return;
      }
    } else {
      if (cl(Ae))
        if ((ce.delete(S), T > Ze)) {
          mn(S, _n(void 0));
          return;
        } else
          return (
            K.add(S),
            mn(S, ar(P)),
            jn(me, Ae, !1, { fetcherSubmission: P, preventScrollReset: $ })
          );
      if (Wt(Ae)) {
        Pt(S, A, Ae.error);
        return;
      }
    }
    let Ut = L.navigation.location || L.location,
      ut = Il(a.history, Ut, he.signal),
      Ve = p.activeRoutes,
      pn =
        L.navigation.state !== "idle"
          ? Sn(Ve, L.navigation.location, v, !1, p.branches)
          : L.matches;
    De(pn, "Didn't find any matches after fetcher action");
    let kn = ++be;
    B.set(S, kn);
    let { dsMatches: en, revalidatingFetchers: bt } = C0(
        ut,
        Q,
        f,
        h,
        a.history,
        L,
        pn,
        P,
        Ut,
        s,
        !1,
        X,
        re,
        ye,
        W,
        K,
        Ve,
        v,
        a.patchRoutesOnNavigation != null,
        p.branches,
        [xe.route.id, Ae],
        ve
      ),
      ya = ar(P, Ae.data),
      qn = new Map(L.fetchers);
    (qn.set(S, ya),
      bt
        .filter((nt) => nt.key !== S)
        .forEach((nt) => {
          let nn = nt.key,
            xr = qn.get(nn),
            Bt = ar(void 0, xr ? xr.data : void 0);
          (qn.set(nn, Bt), St(nn), nt.controller && ce.set(nn, nt.controller));
        }),
      gt({ fetchers: qn }));
    let Yn = () => bt.forEach((nt) => St(nt.key));
    he.signal.addEventListener("abort", Yn);
    let { loaderResults: vl, fetcherResults: Vn } = await fi(en, bt, ut, Ut, Q);
    if (he.signal.aborted) return;
    (he.signal.removeEventListener("abort", Yn),
      B.delete(S),
      ce.delete(S),
      bt.forEach((nt) => ce.delete(nt.key)));
    let Gn = L.fetchers.has(S),
      Ee = (nt) => {
        if (!Gn) return nt;
        let nn = new Map(nt.fetchers);
        return (nn.set(S, _n(Ae.data)), { ...nt, fetchers: nn });
      },
      Ge = Yu(vl);
    if (Ge)
      return ((L = Ee(L)), jn(ut, Ge.result, !1, { preventScrollReset: $ }));
    if (((Ge = Yu(Vn)), Ge))
      return (
        K.add(Ge.key),
        (L = Ee(L)),
        jn(ut, Ge.result, !1, { preventScrollReset: $ })
      );
    let tn = new Map(L.fetchers);
    Gn && tn.set(S, _n(Ae.data));
    let { loaderData: pa, errors: Qa } = z0(L, pn, vl, void 0, bt, Vn, tn);
    (Cr(kn, tn),
      L.navigation.state === "loading" && kn > T
        ? (De(Re, "Expected pending action"),
          Oe && Oe.abort(),
          Ht(L.navigation.location, {
            matches: pn,
            loaderData: pa,
            errors: Qa,
            fetchers: tn
          }))
        : (gt({
            errors: Qa,
            loaderData: U0(L.loaderData, pa, pn, Qa),
            fetchers: tn
          }),
          (X = !1)));
  }
  async function Mt(S, A, D, G, Q, ae, ee, $, P) {
    let ve = L.fetchers.get(S);
    mn(S, ar(P, ve ? ve.data : void 0), { flushSync: ee });
    let he = new AbortController(),
      me = Il(a.history, D, he.signal);
    if (ae) {
      let Ae = await An(G, new URL(me.url).pathname, me.signal, S);
      if (Ae.type === "aborted") return;
      if (Ae.type === "error") {
        Pt(S, A, Ae.error, { flushSync: ee });
        return;
      } else if (Ae.matches) G = Ae.matches;
      else {
        Pt(S, A, dn(404, { pathname: D }), { flushSync: ee });
        return;
      }
    }
    let xe = Xu(G, D);
    ce.set(S, he);
    let Ze = be,
      ke = await fa(me, D, ti(f, h, me, D, G, xe, s, Q), Q, S),
      tt = ke[xe.route.id];
    if (!tt) {
      for (let Ae of G)
        if (ke[Ae.route.id]) {
          tt = ke[Ae.route.id];
          break;
        }
    }
    if ((ce.get(S) === he && ce.delete(S), !me.signal.aborted)) {
      if (ye.has(S)) {
        mn(S, _n(void 0));
        return;
      }
      if (cl(tt))
        if (T > Ze) {
          mn(S, _n(void 0));
          return;
        } else {
          (K.add(S), await jn(me, tt, !1, { preventScrollReset: $ }));
          return;
        }
      if (Wt(tt)) {
        Pt(S, A, tt.error);
        return;
      }
      mn(S, _n(tt.data));
    }
  }
  async function jn(
    S,
    A,
    D,
    {
      submission: G,
      fetcherSubmission: Q,
      preventScrollReset: ae,
      replace: ee
    } = {}
  ) {
    (D || (He?.resolve(), (He = null)),
      A.response.headers.has("X-Remix-Revalidate") && (X = !0));
    let $ = A.response.headers.get("Location");
    (De($, "Expected a Location header on the redirect Response"),
      ($ = w0($, new URL(S.url), v, a.history)));
    let P = dr(L.location, $, { _isRedirect: !0 });
    if (r) {
      let ke = !1;
      if (A.response.headers.has("X-Remix-Reload-Document")) ke = !0;
      else if (Io($)) {
        const tt = uy(l, $, !0);
        ke = tt.origin !== l.location.origin || Tn(tt.pathname, v) == null;
      }
      if (ke) {
        ee ? l.location.replace($) : l.location.assign($);
        return;
      }
    }
    Oe = null;
    let ve =
        ee === !0 || A.response.headers.has("X-Remix-Replace")
          ? "REPLACE"
          : "PUSH",
      { formMethod: he, formAction: me, formEncType: xe } = L.navigation;
    !G && !Q && he && me && xe && (G = B0(L.navigation));
    let Ze = G || Q;
    f1.has(A.response.status) && Ze && wt(Ze.formMethod)
      ? await Ln(ve, P, {
          submission: { ...Ze, formAction: $ },
          preventScrollReset: ae || Xe,
          enableViewTransition: D ? Be : void 0
        })
      : await Ln(ve, P, {
          overrideNavigation: Oo(P, [], ve, G),
          fetcherSubmission: Q,
          preventScrollReset: ae || Xe,
          enableViewTransition: D ? Be : void 0
        });
  }
  async function fa(S, A, D, G, Q) {
    let ae,
      ee = {};
    try {
      ae = await S1(y, S, A, D, Q, G, !1);
    } catch ($) {
      return (
        D.filter((P) => P.shouldLoad).forEach((P) => {
          ee[P.route.id] = { type: "error", error: $ };
        }),
        ee
      );
    }
    if (S.signal.aborted) return ee;
    if (!wt(S.method))
      for (let $ of D) {
        if (ae[$.route.id]?.type === "error") break;
        !ae.hasOwnProperty($.route.id) &&
          !L.loaderData.hasOwnProperty($.route.id) &&
          (!L.errors || !L.errors.hasOwnProperty($.route.id)) &&
          $.shouldCallHandler() &&
          (ae[$.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${$.route.id}`
            )
          });
      }
    for (let [$, P] of Object.entries(ae))
      if (M1(P)) {
        let ve = P.result;
        ee[$] = { type: "redirect", response: N1(ve, S, $, D, v) };
      } else ee[$] = await A1(P);
    return ee;
  }
  async function fi(S, A, D, G, Q) {
    let ae = fa(D, G, S, Q, null),
      ee = Promise.all(
        A.map(async ($) => {
          if ($.matches && $.match && $.request && $.controller) {
            let P = (await fa($.request, $.path, $.matches, Q, $.key))[
              $.match.route.id
            ];
            return { [$.key]: P };
          } else
            return Promise.resolve({
              [$.key]: { type: "error", error: dn(404, { pathname: $.path }) }
            });
        })
      );
    return {
      loaderResults: await ae,
      fetcherResults: (await ee).reduce(($, P) => Object.assign($, P), {})
    };
  }
  function da() {
    ((X = !0),
      W.forEach((S, A) => {
        (ce.has(A) && re.add(A), St(A));
      }));
  }
  function mn(S, A, D = {}) {
    let G = new Map(L.fetchers);
    (G.set(S, A),
      gt({ fetchers: G }, { flushSync: (D && D.flushSync) === !0 }));
  }
  function Pt(S, A, D, G = {}) {
    let Q = qa(L.matches, A),
      ae = new Map(L.fetchers);
    (Hn(ae, S),
      gt(
        { errors: { [Q.route.id]: D }, fetchers: ae },
        { flushSync: (G && G.flushSync) === !0 }
      ));
  }
  function us(S) {
    return (
      fe.set(S, (fe.get(S) || 0) + 1),
      ye.has(S) && ye.delete(S),
      L.fetchers.get(S) || d1
    );
  }
  function ss(S, A) {
    (St(S, A?.reason), mn(S, _n(null)));
  }
  function Hn(S, A) {
    let D = L.fetchers.get(A);
    (ce.has(A) && !(D && D.state === "loading" && B.has(A)) && St(A),
      W.delete(A),
      B.delete(A),
      K.delete(A),
      ye.delete(A),
      re.delete(A),
      S.delete(A));
  }
  function zt(S) {
    let A = (fe.get(S) || 0) - 1;
    (A <= 0 ? (fe.delete(S), ye.add(S)) : fe.set(S, A),
      gt({ fetchers: new Map(L.fetchers) }));
  }
  function St(S, A) {
    let D = ce.get(S);
    D && (D.abort(A), ce.delete(S));
  }
  function _t(S, A) {
    for (let D of S) {
      let G = A.get(D);
      De(G, `Expected fetcher: ${D}`);
      let Q = _n(G.data);
      A.set(D, Q);
    }
  }
  function Nr(S) {
    let A = [],
      D = !1;
    for (let G of K) {
      let Q = S.get(G);
      (De(Q, `Expected fetcher: ${G}`),
        Q.state === "loading" && (K.delete(G), A.push(G), (D = !0)));
    }
    return (_t(A, S), D);
  }
  function Cr(S, A) {
    let D = [];
    for (let [G, Q] of B)
      if (Q < S) {
        let ae = A.get(G);
        (De(ae, `Expected fetcher: ${G}`),
          ae.state === "loading" && (St(G), B.delete(G), D.push(G)));
      }
    return (_t(D, A), D.length > 0);
  }
  function cs(S, A) {
    let D = L.blockers.get(S) || nr;
    return (_e.get(S) !== A && _e.set(S, A), D);
  }
  function Va(S) {
    (L.blockers.delete(S), _e.delete(S));
  }
  function Bn(S, A) {
    let D = L.blockers.get(S) || nr;
    De(
      (D.state === "unblocked" && A.state === "blocked") ||
        (D.state === "blocked" && A.state === "blocked") ||
        (D.state === "blocked" && A.state === "proceeding") ||
        (D.state === "blocked" && A.state === "unblocked") ||
        (D.state === "proceeding" && A.state === "unblocked"),
      `Invalid blocker state transition: ${D.state} -> ${A.state}`
    );
    let G = new Map(L.blockers);
    (G.set(S, A), gt({ blockers: G }));
  }
  function Ga({ currentLocation: S, nextLocation: A, historyAction: D }) {
    if (_e.size === 0) return;
    _e.size > 1 && jt(!1, "A router only supports one blocker at a time");
    let G = Array.from(_e.entries()),
      [Q, ae] = G[G.length - 1],
      ee = L.blockers.get(Q);
    if (
      !(ee && ee.state === "proceeding") &&
      ae({ currentLocation: S, nextLocation: A, historyAction: D })
    )
      return Q;
  }
  function yn(S) {
    let A = dn(404, { pathname: S }),
      D = p.activeRoutes,
      { matches: G, route: Q } = qu(D);
    return { notFoundMatches: G, route: Q, error: A };
  }
  function pl(S, A, D) {
    if (((U = S), (Z = A), (V = D || null), !I && L.navigation === Co)) {
      I = !0;
      let G = di(L.location, L.matches);
      G != null && gt({ restoreScrollPosition: G });
    }
    return () => {
      ((U = null), (Z = null), (V = null));
    };
  }
  function ha(S, A) {
    return (
      (V &&
        V(
          S,
          A.map((D) => Bg(D, L.loaderData))
        )) ||
      S.key
    );
  }
  function os(S, A) {
    if (U && Z) {
      let D = ha(S, A);
      U[D] = Z();
    }
  }
  function di(S, A) {
    if (U) {
      let D = ha(S, A),
        G = U[D];
      if (typeof G == "number") return G;
    }
    return null;
  }
  function ma(S, A, D) {
    if (a.patchRoutesOnNavigation) {
      let G = p.branches;
      if (S) {
        if (Object.keys(S[0].params).length > 0)
          return { active: !0, matches: Sn(A, D, v, !0, G) };
      } else return { active: !0, matches: Sn(A, D, v, !0, G) || [] };
    }
    return { active: !1, matches: null };
  }
  async function An(S, A, D, G) {
    if (!a.patchRoutesOnNavigation) return { type: "success", matches: S };
    let Q = S;
    for (;;) {
      let ae = h;
      try {
        await a.patchRoutesOnNavigation({
          signal: D,
          path: A,
          matches: Q,
          fetcherKey: G,
          patch: (ve, he) => {
            D.aborted || O0(ve, he, p, ae, f, !1);
          }
        });
      } catch (ve) {
        return { type: "error", error: ve, partialMatches: Q };
      }
      if (D.aborted) return { type: "aborted" };
      let ee = p.branches,
        $ = Sn(p.activeRoutes, A, v, !1, ee),
        P = null;
      if ($) {
        if (Object.keys($[0].params).length === 0)
          return { type: "success", matches: $ };
        if (
          ((P = Sn(p.activeRoutes, A, v, !0, ee)),
          !(P && Q.length < P.length && Or(Q, P.slice(0, Q.length))))
        )
          return { type: "success", matches: $ };
      }
      if ((P || (P = Sn(p.activeRoutes, A, v, !0, ee)), !P || Or(Q, P)))
        return { type: "success", matches: null };
      Q = P;
    }
  }
  function Or(S, A) {
    return (
      S.length === A.length && S.every((D, G) => D.route.id === A[G].route.id)
    );
  }
  function Dr(S) {
    ((h = {}), p.setHmrRoutes(hr(S, f, void 0, h)));
  }
  function _r(S, A, D = !1) {
    (O0(S, A, p, h, f, D), p.hasHMRRoutes || gt({}));
  }
  return (
    (J = {
      get basename() {
        return v;
      },
      get future() {
        return g;
      },
      get state() {
        return L;
      },
      get routes() {
        return p.stableRoutes;
      },
      get branches() {
        return p.branches;
      },
      get manifest() {
        return h;
      },
      get window() {
        return l;
      },
      initialize: Ya,
      subscribe: ui,
      enableScrollRestoration: pl,
      navigate: ml,
      fetch: is,
      revalidate: si,
      createHref: (S) => a.history.createHref(S),
      encodeLocation: (S) => a.history.encodeLocation(S),
      getFetcher: us,
      resetFetcher: ss,
      deleteFetcher: zt,
      dispose: hl,
      getBlocker: cs,
      deleteBlocker: Va,
      patchRoutes: _r,
      _internalFetchControllers: ce,
      _internalSetRoutes: Dr,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(S) {
        gt(S);
      }
    }),
    a.instrumentations &&
      (J = i1(J, a.instrumentations.map((S) => S.router).filter(Boolean))),
    J
  );
}
function y1(a) {
  return (
    a != null &&
    (("formData" in a && a.formData != null) ||
      ("body" in a && a.body !== void 0))
  );
}
function jo(a, l, r, s, o, f) {
  let h, p;
  if (o) {
    h = [];
    for (let y of l)
      if ((h.push(y), y.route.id === o)) {
        p = y;
        break;
      }
  } else ((h = l), (p = l[l.length - 1]));
  let v = es(s || ".", Wo(h), Tn(a.pathname, r) || a.pathname, f === "path");
  if (
    (s == null && ((v.search = a.search), (v.hash = a.hash)),
    (s == null || s === "" || s === ".") && p)
  ) {
    let y = af(v.search);
    if (p.route.index && !y)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && y) {
      let g = new URLSearchParams(v.search),
        b = g.getAll("index");
      (g.delete("index"),
        b.filter((O) => O).forEach((O) => g.append("index", O)));
      let C = g.toString();
      v.search = C ? `?${C}` : "";
    }
  }
  return (
    r !== "/" && (v.pathname = Wg({ basename: r, pathname: v.pathname })),
    zn(v)
  );
}
function N0(a, l, r) {
  if (!r || !y1(r)) return { path: l };
  if (r.formMethod && !L1(r.formMethod))
    return { path: l, error: dn(405, { method: r.formMethod }) };
  let s = () => ({ path: l, error: dn(400, { type: "invalid-body" }) }),
    o = (r.formMethod || "get").toUpperCase(),
    f = _y(l);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!wt(o)) return s();
      let g =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce(
                (b, [C, O]) => `${b}${C}=${O}
`,
                ""
              )
            : String(r.body);
      return {
        path: l,
        submission: {
          formMethod: o,
          formAction: f,
          formEncType: r.formEncType,
          formData: void 0,
          json: void 0,
          text: g
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!wt(o)) return s();
      try {
        let g = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: l,
          submission: {
            formMethod: o,
            formAction: f,
            formEncType: r.formEncType,
            formData: void 0,
            json: g,
            text: void 0
          }
        };
      } catch {
        return s();
      }
    }
  }
  De(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (r.formData) ((h = ko(r.formData)), (p = r.formData));
  else if (r.body instanceof FormData) ((h = ko(r.body)), (p = r.body));
  else if (r.body instanceof URLSearchParams) ((h = r.body), (p = M0(h)));
  else if (r.body == null) ((h = new URLSearchParams()), (p = new FormData()));
  else
    try {
      ((h = new URLSearchParams(r.body)), (p = M0(h)));
    } catch {
      return s();
    }
  let v = {
    formMethod: o,
    formAction: f,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: p,
    json: void 0,
    text: void 0
  };
  if (wt(v.formMethod)) return { path: l, submission: v };
  let y = Un(l);
  return (
    a && y.search && af(y.search) && h.append("index", ""),
    (y.search = `?${h}`),
    { path: zn(y), submission: v }
  );
}
function C0(
  a,
  l,
  r,
  s,
  o,
  f,
  h,
  p,
  v,
  y,
  g,
  b,
  C,
  O,
  U,
  V,
  Z,
  I,
  te,
  ne,
  oe,
  se
) {
  let Te = oe ? (Wt(oe[1]) ? oe[1].error : oe[1].data) : void 0,
    J = o.createURL(f.location),
    L = o.createURL(v),
    Re;
  if (g && f.errors) {
    let w = Object.keys(f.errors)[0];
    Re = h.findIndex((X) => X.route.id === w);
  } else if (oe && Wt(oe[1])) {
    let w = oe[0];
    Re = h.findIndex((X) => X.route.id === w) - 1;
  }
  let He = oe ? oe[1].statusCode : void 0,
    Xe = He && He >= 400,
    Oe = {
      currentUrl: J,
      currentParams: f.matches[0]?.params || {},
      nextUrl: L,
      nextParams: h[0].params,
      ...p,
      actionResult: Te,
      actionStatus: He
    },
    Be = li(h),
    rt = h.map((w, X) => {
      let { route: re } = w,
        ce = null;
      if (Re != null && X > Re) ce = !1;
      else if (re.lazy) ce = !0;
      else if (!tf(re)) ce = !1;
      else if (g) {
        let { shouldLoad: B } = Ry(re, f.loaderData, f.errors);
        ce = B;
      } else p1(f.loaderData, f.matches[X], w) && (ce = !0);
      if (ce !== null) return Ho(r, s, a, v, Be, w, y, l, ce);
      let be = !1;
      typeof se == "boolean"
        ? (be = se)
        : Xe
          ? (be = !1)
          : (b ||
              J.pathname + J.search === L.pathname + L.search ||
              J.search !== L.search ||
              v1(f.matches[X], w)) &&
            (be = !0);
      let T = { ...Oe, defaultShouldRevalidate: be };
      return Ho(r, s, a, v, Be, w, y, l, or(w, T), T, se);
    }),
    Je = [];
  return (
    U.forEach((w, X) => {
      if (g || !h.some((fe) => fe.route.id === w.routeId) || O.has(X)) return;
      let re = f.fetchers.get(X),
        ce = re && re.state !== "idle" && re.data === void 0,
        be = Sn(Z, w.path, I ?? "/", !1, ne);
      if (!be) {
        if (te && ce) return;
        Je.push({
          key: X,
          routeId: w.routeId,
          path: w.path,
          matches: null,
          match: null,
          request: null,
          controller: null
        });
        return;
      }
      if (V.has(X)) return;
      let T = Xu(be, w.path),
        B = new AbortController(),
        K = Il(o, w.path, B.signal),
        W = null;
      if (C.has(X)) (C.delete(X), (W = ti(r, s, K, w.path, be, T, y, l)));
      else if (ce) b && (W = ti(r, s, K, w.path, be, T, y, l));
      else {
        let fe;
        typeof se == "boolean" ? (fe = se) : Xe ? (fe = !1) : (fe = b);
        let ye = { ...Oe, defaultShouldRevalidate: fe };
        or(T, ye) && (W = ti(r, s, K, w.path, be, T, y, l, ye));
      }
      W &&
        Je.push({
          key: X,
          routeId: w.routeId,
          path: w.path,
          matches: W,
          match: T,
          request: K,
          controller: B
        });
    }),
    { dsMatches: rt, revalidatingFetchers: Je }
  );
}
function tf(a) {
  return a.loader != null || (a.middleware != null && a.middleware.length > 0);
}
function Ry(a, l, r) {
  if (a.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!tf(a)) return { shouldLoad: !1, renderFallback: !1 };
  let s = l != null && a.id in l,
    o = r != null && r[a.id] !== void 0;
  if (!s && o) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof a.loader == "function" && a.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let f = !s && !o;
  return { shouldLoad: f, renderFallback: f };
}
function p1(a, l, r) {
  let s = !l || r.route.id !== l.route.id,
    o = !a.hasOwnProperty(r.route.id);
  return s || o;
}
function v1(a, l) {
  let r = a.route.path;
  return (
    a.pathname !== l.pathname ||
    (r != null && r.endsWith("*") && a.params["*"] !== l.params["*"])
  );
}
function or(a, l) {
  if (a.route.shouldRevalidate) {
    let r = a.route.shouldRevalidate(l);
    if (typeof r == "boolean") return r;
  }
  return l.defaultShouldRevalidate;
}
function O0(a, l, r, s, o, f) {
  let h;
  if (a) {
    let y = s[a];
    (De(y, `No route found to patch children into: routeId = ${a}`),
      y.children || (y.children = []),
      (h = y.children));
  } else h = r.activeRoutes;
  let p = [],
    v = [];
  if (
    (l.forEach((y) => {
      let g = h.find((b) => Ay(y, b));
      g ? v.push({ existingRoute: g, newRoute: y }) : p.push(y);
    }),
    p.length > 0)
  ) {
    let y = hr(p, o, [a || "_", "patch", String(h?.length || "0")], s);
    h.push(...y);
  }
  if (f && v.length > 0)
    for (let y = 0; y < v.length; y++) {
      let { existingRoute: g, newRoute: b } = v[y],
        C = g,
        [O] = hr([b], o, [], {}, !0);
      Object.assign(C, {
        element: O.element ? O.element : C.element,
        errorElement: O.errorElement ? O.errorElement : C.errorElement,
        hydrateFallbackElement: O.hydrateFallbackElement
          ? O.hydrateFallbackElement
          : C.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Ay(a, l) {
  return "id" in a && "id" in l && a.id === l.id
    ? !0
    : a.index === l.index &&
        a.path === l.path &&
        a.caseSensitive === l.caseSensitive
      ? (!a.children || a.children.length === 0) &&
        (!l.children || l.children.length === 0)
        ? !0
        : (a.children?.every((r, s) => l.children?.some((o) => Ay(r, o))) ?? !1)
      : !1;
}
const D0 = new WeakMap(),
  Ny = ({ key: a, route: l, manifest: r, mapRouteProperties: s }) => {
    let o = r[l.id];
    if (
      (De(o, "No route found in manifest"),
      !o.lazy || typeof o.lazy != "object")
    )
      return;
    let f = o.lazy[a];
    if (!f) return;
    let h = D0.get(o);
    h || ((h = {}), D0.set(o, h));
    let p = h[a];
    if (p) return p;
    let v = (async () => {
      let y = Ug(a),
        g = o[a] !== void 0;
      if (y)
        (jt(
          !y,
          "Route property " +
            a +
            " is not a supported lazy route property. This property will be ignored."
        ),
          (h[a] = Promise.resolve()));
      else if (g)
        jt(
          !1,
          `Route "${o.id}" has a static property "${a}" defined. The lazy property will be ignored.`
        );
      else {
        let b = await f();
        b != null && (Object.assign(o, { [a]: b }), Object.assign(o, s(o)));
      }
      typeof o.lazy == "object" &&
        ((o.lazy[a] = void 0),
        Object.values(o.lazy).every((b) => b === void 0) && (o.lazy = void 0));
    })();
    return ((h[a] = v), v);
  },
  _0 = new WeakMap();
function g1(a, l, r, s, o) {
  let f = r[a.id];
  if ((De(f, "No route found in manifest"), !a.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof a.lazy == "function") {
    let g = _0.get(f);
    if (g) return { lazyRoutePromise: g, lazyHandlerPromise: g };
    let b = (async () => {
      De(typeof a.lazy == "function", "No lazy route function found");
      let C = await a.lazy(),
        O = {};
      for (let U in C) {
        let V = C[U];
        if (V === void 0) continue;
        let Z = jg(U),
          I = f[U] !== void 0;
        Z
          ? jt(
              !Z,
              "Route property " +
                U +
                " is not a supported property to be returned from a lazy route function. This property will be ignored."
            )
          : I
            ? jt(
                !I,
                `Route "${f.id}" has a static property "${U}" defined but its lazy function is also returning a value for this property. The lazy route property "${U}" will be ignored.`
              )
            : (O[U] = V);
      }
      (Object.assign(f, O), Object.assign(f, { ...s(f), lazy: void 0 }));
    })();
    return (
      _0.set(f, b),
      b.catch(() => {}),
      { lazyRoutePromise: b, lazyHandlerPromise: b }
    );
  }
  let h = Object.keys(a.lazy),
    p = [],
    v;
  for (let g of h) {
    if (o && o.includes(g)) continue;
    let b = Ny({ key: g, route: a, manifest: r, mapRouteProperties: s });
    b && (p.push(b), g === l && (v = b));
  }
  let y = p.length > 0 ? Promise.all(p).then(() => {}) : void 0;
  return (
    y?.catch(() => {}),
    v?.catch(() => {}),
    { lazyRoutePromise: y, lazyHandlerPromise: v }
  );
}
async function x0(a) {
  let l = a.matches.filter((s) => s.shouldLoad),
    r = {};
  return (
    (await Promise.all(l.map((s) => s.resolve()))).forEach((s, o) => {
      r[l[o].route.id] = s;
    }),
    r
  );
}
async function b1(a) {
  return a.matches.some((l) => l.route.middleware) ? Cy(a, () => x0(a)) : x0(a);
}
function Cy(a, l) {
  return E1(
    a,
    l,
    (s) => {
      if (U1(s)) throw s;
      return s;
    },
    x1,
    r
  );
  async function r(s, o, f) {
    if (f) return Object.assign(f.value, { [o]: { type: "error", result: s } });
    {
      let { matches: h } = a,
        p = Math.min(
          Math.max(
            h.findIndex((y) => y.route.id === o),
            0
          ),
          Math.max(
            h.findIndex((y) => y.shouldCallHandler()),
            0
          )
        ),
        v = h[p].route.id;
      for (let y of h.slice(0, p + 1))
        try {
          await y._lazyPromises?.route;
        } catch {
          v = y.route.id;
          break;
        }
      return { [qa(h, v).route.id]: { type: "error", result: s } };
    }
  }
}
async function E1(a, l, r, s, o) {
  let { matches: f, ...h } = a;
  return await Oy(
    h,
    f.flatMap((p) =>
      p.route.middleware ? p.route.middleware.map((v) => [p.route.id, v]) : []
    ),
    l,
    r,
    s,
    o
  );
}
async function Oy(a, l, r, s, o, f, h = 0) {
  let { request: p } = a;
  if (p.signal.aborted)
    throw p.signal.reason ?? new Error(`Request aborted: ${p.method} ${p.url}`);
  let v = l[h];
  if (!v) return await r();
  let [y, g] = v,
    b,
    C = async () => {
      if (b) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((b = { value: await Oy(a, l, r, s, o, f, h + 1) }), b.value);
      } catch (O) {
        return ((b = { value: await f(O, y, b) }), b.value);
      }
    };
  try {
    let O = await g(a, C),
      U = O != null ? s(O) : void 0;
    return o(U)
      ? U
      : b
        ? (U ?? b.value)
        : ((b = { value: await C() }), b.value);
  } catch (O) {
    return await f(O, y, b);
  }
}
function Dy(a, l, r, s, o) {
  let f = Ny({
      key: "middleware",
      route: s.route,
      manifest: l,
      mapRouteProperties: a
    }),
    h = g1(s.route, wt(r.method) ? "action" : "loader", l, a, o);
  return {
    middleware: f,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function Ho(a, l, r, s, o, f, h, p, v, y = null, g) {
  let b = !1,
    C = Dy(a, l, r, f, h);
  return {
    ...f,
    _lazyPromises: C,
    shouldLoad: v,
    shouldRevalidateArgs: y,
    shouldCallHandler(O) {
      return (
        (b = !0),
        y
          ? typeof g == "boolean"
            ? or(f, { ...y, defaultShouldRevalidate: g })
            : typeof O == "boolean"
              ? or(f, { ...y, defaultShouldRevalidate: O })
              : or(f, y)
          : v
      );
    },
    resolve(O) {
      let { lazy: U, loader: V, middleware: Z } = f.route,
        I = b || v || (O && !wt(r.method) && (U || V)),
        te = Z && Z.length > 0 && !V && !U;
      return I && (wt(r.method) || !te)
        ? T1({
            request: r,
            path: s,
            pattern: o,
            match: f,
            lazyHandlerPromise: C?.handler,
            lazyRoutePromise: C?.route,
            handlerOverride: O,
            scopedContext: p
          })
        : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function ti(a, l, r, s, o, f, h, p, v = null) {
  return o.map((y) =>
    y.route.id !== f.route.id
      ? {
          ...y,
          shouldLoad: !1,
          shouldRevalidateArgs: v,
          shouldCallHandler: () => !1,
          _lazyPromises: Dy(a, l, r, y, h),
          resolve: () => Promise.resolve({ type: "data", result: void 0 })
        }
      : Ho(a, l, r, s, li(o), y, h, p, !0, v)
  );
}
async function S1(a, l, r, s, o, f, h) {
  s.some((g) => g._lazyPromises?.middleware) &&
    (await Promise.all(s.map((g) => g._lazyPromises?.middleware)));
  let p = {
      request: l,
      url: ef(l, r),
      pattern: li(s),
      params: s[0].params,
      context: f,
      matches: s
    },
    y = await a({
      ...p,
      fetcherKey: o,
      runClientMiddleware: (g) => {
        let b = p;
        return Cy(b, () =>
          g({
            ...b,
            fetcherKey: o,
            runClientMiddleware: () => {
              throw new Error(
                "Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler"
              );
            }
          })
        );
      }
    });
  try {
    await Promise.all(
      s.flatMap((g) => [g._lazyPromises?.handler, g._lazyPromises?.route])
    );
  } catch {}
  return y;
}
async function T1({
  request: a,
  path: l,
  pattern: r,
  match: s,
  lazyHandlerPromise: o,
  lazyRoutePromise: f,
  handlerOverride: h,
  scopedContext: p
}) {
  let v,
    y,
    g = wt(a.method),
    b = g ? "action" : "loader",
    C = (O) => {
      let U,
        V = new Promise((te, ne) => (U = ne));
      ((y = () => U()), a.signal.addEventListener("abort", y));
      let Z = (te) =>
          typeof O != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
                )
              )
            : O(
                {
                  request: a,
                  url: ef(a, l),
                  pattern: r,
                  params: s.params,
                  context: p
                },
                ...(te !== void 0 ? [te] : [])
              ),
        I = (async () => {
          try {
            return { type: "data", result: await (h ? h((te) => Z(te)) : Z()) };
          } catch (te) {
            return { type: "error", result: te };
          }
        })();
      return Promise.race([I, V]);
    };
  try {
    let O = g ? s.route.action : s.route.loader;
    if (o || f)
      if (O) {
        let U,
          [V] = await Promise.all([
            C(O).catch((Z) => {
              U = Z;
            }),
            o,
            f
          ]);
        if (U !== void 0) throw U;
        v = V;
      } else {
        await o;
        let U = g ? s.route.action : s.route.loader;
        if (U) [v] = await Promise.all([C(U), f]);
        else if (b === "action") {
          let V = new URL(a.url),
            Z = V.pathname + V.search;
          throw dn(405, { method: a.method, pathname: Z, routeId: s.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (O) v = await C(O);
    else {
      let U = new URL(a.url);
      throw dn(404, { pathname: U.pathname + U.search });
    }
  } catch (O) {
    return { type: "error", result: O };
  } finally {
    y && a.signal.removeEventListener("abort", y);
  }
  return v;
}
async function R1(a) {
  let l = a.headers.get("Content-Type");
  return l && /\bapplication\/json\b/.test(l)
    ? a.body == null
      ? null
      : a.json()
    : a.text();
}
async function A1(a) {
  let { result: l, type: r } = a;
  if (nf(l)) {
    let s;
    try {
      s = await R1(l);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error"
      ? {
          type: "error",
          error: new vr(l.status, l.statusText, s),
          statusCode: l.status,
          headers: l.headers
        }
      : { type: "data", data: s, statusCode: l.status, headers: l.headers };
  }
  return r === "error"
    ? j0(l)
      ? l.data instanceof Error
        ? {
            type: "error",
            error: l.data,
            statusCode: l.init?.status,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
        : {
            type: "error",
            error: _1(l),
            statusCode: mr(l) ? l.status : void 0,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
      : { type: "error", error: l, statusCode: mr(l) ? l.status : void 0 }
    : j0(l)
      ? {
          type: "data",
          data: l.data,
          statusCode: l.init?.status,
          headers: l.init?.headers ? new Headers(l.init.headers) : void 0
        }
      : { type: "data", data: l };
}
function N1(a, l, r, s, o) {
  let f = a.headers.get("Location");
  if (
    (De(
      f,
      "Redirects returned/thrown from loaders/actions must have a Location header"
    ),
    !Io(f))
  ) {
    let h = s.slice(0, s.findIndex((p) => p.route.id === r) + 1);
    ((f = jo(new URL(l.url), h, o, f)), a.headers.set("Location", f));
  }
  return a;
}
const C1 = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  "javascript:"
];
function Bo(a) {
  try {
    return C1.includes(new URL(a).protocol);
  } catch {
    return !1;
  }
}
function w0(a, l, r, s) {
  if (Io(a)) {
    let o = a,
      f = $o.test(o) ? new URL(ry(o, l.protocol)) : new URL(o);
    if (Bo(f.toString())) throw new Error("Invalid redirect location");
    let h = Tn(f.pathname, r) != null;
    if (f.origin === l.origin && h) return Po(f.pathname) + f.search + f.hash;
  }
  try {
    if (Bo(s.createURL(a).toString()))
      throw new Error("Invalid redirect location");
  } catch {}
  return a;
}
function Il(a, l, r, s) {
  let o = a.createURL(_y(l)).toString(),
    f = { signal: r };
  if (s && wt(s.formMethod)) {
    let { formMethod: h, formEncType: p } = s;
    ((f.method = h.toUpperCase()),
      p === "application/json"
        ? ((f.headers = new Headers({ "Content-Type": p })),
          (f.body = JSON.stringify(s.json)))
        : p === "text/plain"
          ? (f.body = s.text)
          : p === "application/x-www-form-urlencoded" && s.formData
            ? (f.body = ko(s.formData))
            : (f.body = s.formData));
  }
  return new Request(o, f);
}
function ko(a) {
  let l = new URLSearchParams();
  for (let [r, s] of a.entries())
    l.append(r, typeof s == "string" ? s : s.name);
  return l;
}
function M0(a) {
  let l = new FormData();
  for (let [r, s] of a.entries()) l.append(r, s);
  return l;
}
function O1(a, l, r, s = !1, o = !1) {
  let f = {},
    h = null,
    p,
    v = !1,
    y = {},
    g = r && Wt(r[1]) ? r[1].error : void 0;
  return (
    a.forEach((b) => {
      if (!(b.route.id in l)) return;
      let C = b.route.id,
        O = l[C];
      if (
        (De(!cl(O), "Cannot handle redirect results in processLoaderData"),
        Wt(O))
      ) {
        let U = O.error;
        if ((g !== void 0 && ((U = g), (g = void 0)), (h = h || {}), o))
          h[C] = U;
        else {
          let V = qa(a, C);
          h[V.route.id] == null && (h[V.route.id] = U);
        }
        (s || (f[C] = Ty),
          v || ((v = !0), (p = mr(O.error) ? O.error.status : 500)),
          O.headers && (y[C] = O.headers));
      } else
        ((f[C] = O.data),
          O.statusCode && O.statusCode !== 200 && !v && (p = O.statusCode),
          O.headers && (y[C] = O.headers));
    }),
    g !== void 0 && r && ((h = { [r[0]]: g }), r[2] && (f[r[2]] = void 0)),
    { loaderData: f, errors: h, statusCode: p || 200, loaderHeaders: y }
  );
}
function z0(a, l, r, s, o, f, h) {
  let { loaderData: p, errors: v } = O1(l, r, s);
  return (
    o
      .filter((y) => !y.matches || y.matches.some((g) => g.shouldLoad))
      .forEach((y) => {
        let { key: g, match: b, controller: C } = y;
        if (C && C.signal.aborted) return;
        let O = f[g];
        if ((De(O, "Did not find corresponding fetcher result"), Wt(O))) {
          let U = qa(a.matches, b?.route.id);
          ((v && v[U.route.id]) || (v = { ...v, [U.route.id]: O.error }),
            h.delete(g));
        } else if (cl(O)) De(!1, "Unhandled fetcher revalidation redirect");
        else {
          let U = _n(O.data);
          h.set(g, U);
        }
      }),
    { loaderData: p, errors: v }
  );
}
function U0(a, l, r, s) {
  let o = Object.entries(l)
    .filter(([, f]) => f !== Ty)
    .reduce((f, [h, p]) => ((f[h] = p), f), {});
  for (let f of r) {
    let h = f.route.id;
    if (
      (!l.hasOwnProperty(h) &&
        a.hasOwnProperty(h) &&
        f.route.loader &&
        (o[h] = a[h]),
      s && s.hasOwnProperty(h))
    )
      break;
  }
  return o;
}
function L0(a) {
  return a
    ? Wt(a[1])
      ? { actionData: {} }
      : { actionData: { [a[0]]: a[1].data } }
    : {};
}
function qa(a, l) {
  return (
    (l ? a.slice(0, a.findIndex((r) => r.route.id === l) + 1) : [...a])
      .reverse()
      .find(
        (r) => r.route.ErrorBoundary != null || r.route.errorElement != null
      ) || a[0]
  );
}
function qu(a) {
  let l =
    a.length === 1
      ? a[0]
      : a.find((r) => r.index || !r.path || r.path === "/") || {
          id: "__shim-error-route__"
        };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: l }],
    route: l
  };
}
function dn(
  a,
  { pathname: l, routeId: r, method: s, type: o, message: f } = {}
) {
  let h = "Unknown Server Error",
    p = "Unknown @remix-run/router error";
  return (
    a === 400
      ? ((h = "Bad Request"),
        s && l && r
          ? (p = `You made a ${s} request to "${l}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.`)
          : o === "invalid-body" && (p = "Unable to encode submission body"))
      : a === 403
        ? ((h = "Forbidden"), (p = `Route "${r}" does not match URL "${l}"`))
        : a === 404
          ? ((h = "Not Found"), (p = `No route matches URL "${l}"`))
          : a === 405 &&
            ((h = "Method Not Allowed"),
            s && l && r
              ? (p = `You made a ${s.toUpperCase()} request to "${l}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.`)
              : s && (p = `Invalid request method "${s.toUpperCase()}"`)),
    new vr(a || 500, h, new Error(p), !0)
  );
}
function Yu(a) {
  let l = Object.entries(a);
  for (let r = l.length - 1; r >= 0; r--) {
    let [s, o] = l[r];
    if (cl(o)) return { key: s, result: o };
  }
}
function _y(a) {
  return zn({ ...(typeof a == "string" ? Un(a) : a), hash: "" });
}
function D1(a, l) {
  return a.pathname !== l.pathname || a.search !== l.search
    ? !1
    : a.hash === ""
      ? l.hash !== ""
      : a.hash === l.hash
        ? !0
        : l.hash !== "";
}
function _1(a) {
  return new vr(
    a.init?.status ?? 500,
    a.init?.statusText ?? "Internal Server Error",
    a.data
  );
}
function x1(a) {
  return (
    a != null &&
    typeof a == "object" &&
    Object.entries(a).every(([l, r]) => typeof l == "string" && w1(r))
  );
}
function w1(a) {
  return (
    a != null &&
    typeof a == "object" &&
    "type" in a &&
    "result" in a &&
    (a.type === "data" || a.type === "error")
  );
}
function M1(a) {
  return nf(a.result) && Ey.has(a.result.status);
}
function Wt(a) {
  return a.type === "error";
}
function cl(a) {
  return (a && a.type) === "redirect";
}
function j0(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "type" in a &&
    "data" in a &&
    "init" in a &&
    a.type === "DataWithResponseInit"
  );
}
function nf(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.headers == "object" &&
    typeof a.body < "u"
  );
}
function z1(a) {
  return Ey.has(a);
}
function U1(a) {
  return nf(a) && z1(a.status) && a.headers.has("Location");
}
function L1(a) {
  return o1.has(a.toUpperCase());
}
function wt(a) {
  return s1.has(a.toUpperCase());
}
function af(a) {
  return new URLSearchParams(a).getAll("index").some((l) => l === "");
}
function Xu(a, l) {
  let r = typeof l == "string" ? Un(l).search : l.search;
  if (a[a.length - 1].route.index && af(r || "")) return a[a.length - 1];
  let s = my(a);
  return s[s.length - 1];
}
function H0(a, l, r) {
  return {
    url: ef(a.createURL(l), l),
    pattern: r ? li(r) : "",
    params: r?.[0]?.params ? { ...r[0].params } : {}
  };
}
function B0(a) {
  let {
    formMethod: l,
    formAction: r,
    formEncType: s,
    text: o,
    formData: f,
    json: h
  } = a;
  if (!(!l || !r || !s)) {
    if (o != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (f != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: s,
        formData: f,
        json: void 0,
        text: void 0
      };
    if (h !== void 0)
      return {
        formMethod: l,
        formAction: r,
        formEncType: s,
        formData: void 0,
        json: h,
        text: void 0
      };
  }
}
function Oo(a, l, r, s) {
  return s
    ? {
        state: "loading",
        location: a,
        matches: l,
        historyAction: r,
        formMethod: s.formMethod,
        formAction: s.formAction,
        formEncType: s.formEncType,
        formData: s.formData,
        json: s.json,
        text: s.text
      }
    : {
        state: "loading",
        location: a,
        matches: l,
        historyAction: r,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
      };
}
function j1(a, l, r, s) {
  return {
    state: "submitting",
    location: a,
    matches: l,
    historyAction: r,
    formMethod: s.formMethod,
    formAction: s.formAction,
    formEncType: s.formEncType,
    formData: s.formData,
    json: s.json,
    text: s.text
  };
}
function ar(a, l) {
  return a
    ? {
        state: "loading",
        formMethod: a.formMethod,
        formAction: a.formAction,
        formEncType: a.formEncType,
        formData: a.formData,
        json: a.json,
        text: a.text,
        data: l
      }
    : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: l
      };
}
function H1(a, l) {
  return {
    state: "submitting",
    formMethod: a.formMethod,
    formAction: a.formAction,
    formEncType: a.formEncType,
    formData: a.formData,
    json: a.json,
    text: a.text,
    data: l ? l.data : void 0
  };
}
function _n(a) {
  return {
    state: "idle",
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: a
  };
}
function B1(a, l) {
  try {
    let r = a.sessionStorage.getItem(Sy);
    if (r) {
      let s = JSON.parse(r);
      for (let [o, f] of Object.entries(s || {}))
        f && Array.isArray(f) && l.set(o, new Set(f || []));
    }
  } catch {}
}
function k1(a, l) {
  if (l.size > 0) {
    let r = {};
    for (let [s, o] of l) r[s] = [...o];
    try {
      a.sessionStorage.setItem(Sy, JSON.stringify(r));
    } catch (s) {
      jt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function k0() {
  let a,
    l,
    r = new Promise((s, o) => {
      ((a = async (f) => {
        s(f);
        try {
          await r;
        } catch {}
      }),
        (l = async (f) => {
          o(f);
          try {
            await r;
          } catch {}
        }));
    });
  return { promise: r, resolve: a, reject: l };
}
const dl = z.createContext(null);
dl.displayName = "DataRouter";
const gr = z.createContext(null);
gr.displayName = "DataRouterState";
const xy = z.createContext(!1);
function wy() {
  return z.useContext(xy);
}
const lf = z.createContext({ isTransitioning: !1 });
lf.displayName = "ViewTransition";
const My = z.createContext(new Map());
My.displayName = "Fetchers";
const q1 = z.createContext(null);
q1.displayName = "Await";
const Rn = z.createContext(null);
Rn.displayName = "Navigation";
const ts = z.createContext(null);
ts.displayName = "Location";
const ca = z.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ca.displayName = "Route";
const rf = z.createContext(null);
rf.displayName = "RouteError";
const zy = "REACT_ROUTER_ERROR",
  Y1 = "REDIRECT",
  V1 = "ROUTE_ERROR_RESPONSE";
function G1(a) {
  if (a.startsWith(`${zy}:${Y1}:{`))
    try {
      let l = JSON.parse(a.slice(28));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string" &&
        typeof l.location == "string" &&
        typeof l.reloadDocument == "boolean" &&
        typeof l.replace == "boolean"
      )
        return l;
    } catch {}
}
function Q1(a) {
  if (a.startsWith(`${zy}:${V1}:{`))
    try {
      let l = JSON.parse(a.slice(40));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string"
      )
        return new vr(l.status, l.statusText, l.data);
    } catch {}
}
function X1(a, { relative: l } = {}) {
  De(
    br(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = z.useContext(Rn),
    { hash: o, pathname: f, search: h } = Er(a, { relative: l }),
    p = f;
  return (
    r !== "/" && (p = f === "/" ? r : hn([r, f])),
    s.createHref({ pathname: p, search: h, hash: o })
  );
}
function br() {
  return z.useContext(ts) != null;
}
function oa() {
  return (
    De(
      br(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    z.useContext(ts).location
  );
}
const Uy =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Z1() {
  let { isDataRoute: a } = z.useContext(ca);
  return a ? rb() : F1();
}
function F1() {
  De(
    br(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let a = z.useContext(dl),
    { basename: l, navigator: r } = z.useContext(Rn),
    { matches: s } = z.useContext(ca),
    { pathname: o } = oa(),
    f = JSON.stringify(Wo(s)),
    h = z.useRef(!1);
  return (
    z.useLayoutEffect(() => {
      h.current = !0;
    }),
    z.useCallback(
      (p, v = {}) => {
        if ((jt(h.current, Uy), !h.current)) return;
        if (typeof p == "number") {
          r.go(p);
          return;
        }
        let y = es(p, JSON.parse(f), o, v.relative === "path");
        (a == null &&
          l !== "/" &&
          (y.pathname = y.pathname === "/" ? l : hn([l, y.pathname])),
          (v.replace ? r.replace : r.push)(y, v.state, v));
      },
      [l, r, f, o, a]
    )
  );
}
z.createContext(null);
function Er(a, { relative: l } = {}) {
  let { matches: r } = z.useContext(ca),
    { pathname: s } = oa(),
    o = JSON.stringify(Wo(r));
  return z.useMemo(() => es(a, JSON.parse(o), s, l === "path"), [a, o, s, l]);
}
function K1(a, l, r) {
  De(
    br(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = z.useContext(Rn),
    { matches: o } = z.useContext(ca),
    f = o[o.length - 1],
    h = f ? f.params : {};
  f && f.pathname;
  let p = f ? f.pathnameBase : "/";
  f && f.route;
  let v = oa(),
    y;
  y = v;
  let g = y.pathname || "/",
    b = g;
  if (p !== "/") {
    let U = p.replace(/^\//, "").split("/");
    b = "/" + g.replace(/^\//, "").split("/").slice(U.length).join("/");
  }
  let C =
    r && r.state.matches.length
      ? r.state.matches.map((U) =>
          Object.assign(U, { route: r.manifest[U.route.id] || U.route })
        )
      : cy(a, { pathname: b });
  return eb(
    C &&
      C.map((U) =>
        Object.assign({}, U, {
          params: Object.assign({}, h, U.params),
          pathname: hn([
            p,
            s.encodeLocation
              ? s.encodeLocation(
                  U.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23")
                ).pathname
              : U.pathname
          ]),
          pathnameBase:
            U.pathnameBase === "/"
              ? p
              : hn([
                  p,
                  s.encodeLocation
                    ? s.encodeLocation(
                        U.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : U.pathnameBase
                ])
        })
      ),
    o,
    r
  );
}
function J1() {
  let a = ib(),
    l = mr(a)
      ? `${a.status} ${a.statusText}`
      : a instanceof Error
        ? a.message
        : JSON.stringify(a),
    r = a instanceof Error ? a.stack : null;
  return z.createElement(
    z.Fragment,
    null,
    z.createElement("h2", null, "Unexpected Application Error!"),
    z.createElement("h3", { style: { fontStyle: "italic" } }, l),
    r
      ? z.createElement(
          "pre",
          {
            style: {
              padding: "0.5rem",
              backgroundColor: "rgba(200,200,200, 0.5)"
            }
          },
          r
        )
      : null,
    null
  );
}
const $1 = z.createElement(J1, null);
var I1 = class extends z.Component {
  constructor(a) {
    (super(a),
      (this.state = {
        location: a.location,
        revalidation: a.revalidation,
        error: a.error
      }));
  }
  static contextType = xy;
  static getDerivedStateFromError(a) {
    return { error: a };
  }
  static getDerivedStateFromProps(a, l) {
    return l.location !== a.location ||
      (l.revalidation !== "idle" && a.revalidation === "idle")
      ? { error: a.error, location: a.location, revalidation: a.revalidation }
      : {
          error: a.error !== void 0 ? a.error : l.error,
          location: l.location,
          revalidation: a.revalidation || l.revalidation
        };
  }
  componentDidCatch(a, l) {
    this.props.onError
      ? this.props.onError(a, l)
      : console.error(
          "React Router caught the following error during render",
          a
        );
  }
  render() {
    let a = this.state.error;
    if (
      this.context &&
      typeof a == "object" &&
      a &&
      "digest" in a &&
      typeof a.digest == "string"
    ) {
      const r = Q1(a.digest);
      r && (a = r);
    }
    let l =
      a !== void 0
        ? z.createElement(
            ca.Provider,
            { value: this.props.routeContext },
            z.createElement(rf.Provider, {
              value: a,
              children: this.props.component
            })
          )
        : this.props.children;
    return this.context ? z.createElement(W1, { error: a }, l) : l;
  }
};
const Do = new WeakMap();
function W1({ children: a, error: l }) {
  let { basename: r } = z.useContext(Rn);
  if (
    typeof l == "object" &&
    l &&
    "digest" in l &&
    typeof l.digest == "string"
  ) {
    let s = G1(l.digest);
    if (s) {
      let o = Do.get(l);
      if (o) throw o;
      let f = vy(s.location, r),
        h = f.absoluteURL || f.to;
      if (Bo(h)) throw new Error("Invalid redirect location");
      if (py && !Do.get(l))
        if (f.isExternal || s.reloadDocument) window.location.href = h;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, {
              replace: s.replace
            })
          );
          throw (Do.set(l, p), p);
        }
      return z.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${h}`
      });
    }
  }
  return a;
}
function P1({ routeContext: a, match: l, children: r }) {
  let s = z.useContext(dl);
  return (
    s &&
      s.static &&
      s.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (s.staticContext._deepestRenderedBoundaryId = l.route.id),
    z.createElement(ca.Provider, { value: a }, r)
  );
}
function eb(a, l = [], r) {
  let s = r?.state;
  if (a == null) {
    if (!s) return null;
    if (s.errors) a = s.matches;
    else if (l.length === 0 && !s.initialized && s.matches.length > 0)
      a = s.matches;
    else return null;
  }
  let o = a,
    f = s?.errors;
  if (f != null) {
    let g = o.findIndex((b) => b.route.id && f?.[b.route.id] !== void 0);
    (De(
      g >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`
    ),
      (o = o.slice(0, Math.min(o.length, g + 1))));
  }
  let h = !1,
    p = -1;
  if (r && s) {
    h = s.renderFallback;
    for (let g = 0; g < o.length; g++) {
      let b = o[g];
      if (
        ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (p = g),
        b.route.id)
      ) {
        let { loaderData: C, errors: O } = s,
          U =
            b.route.loader &&
            !C.hasOwnProperty(b.route.id) &&
            (!O || O[b.route.id] === void 0);
        if (b.route.lazy || U) {
          (r.isStatic && (h = !0),
            p >= 0 ? (o = o.slice(0, p + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  }
  let v = r?.onError,
    y =
      s && v
        ? (g, b) => {
            v(g, {
              location: s.location,
              params: s.matches?.[0]?.params ?? {},
              pattern: li(s.matches),
              errorInfo: b
            });
          }
        : void 0;
  return o.reduceRight((g, b, C) => {
    let O,
      U = !1,
      V = null,
      Z = null;
    s &&
      ((O = f && b.route.id ? f[b.route.id] : void 0),
      (V = b.route.errorElement || $1),
      h &&
        (p < 0 && C === 0
          ? (ub(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (U = !0),
            (Z = null))
          : p === C &&
            ((U = !0), (Z = b.route.hydrateFallbackElement || null))));
    let I = l.concat(o.slice(0, C + 1)),
      te = () => {
        let ne;
        return (
          O
            ? (ne = V)
            : U
              ? (ne = Z)
              : b.route.Component
                ? (ne = z.createElement(b.route.Component, null))
                : b.route.element
                  ? (ne = b.route.element)
                  : (ne = g),
          z.createElement(P1, {
            match: b,
            routeContext: { outlet: g, matches: I, isDataRoute: s != null },
            children: ne
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || C === 0)
      ? z.createElement(I1, {
          location: s.location,
          revalidation: s.revalidation,
          component: V,
          error: O,
          children: te(),
          routeContext: { outlet: null, matches: I, isDataRoute: !0 },
          onError: y
        })
      : te();
  }, null);
}
function uf(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function tb(a) {
  let l = z.useContext(dl);
  return (De(l, uf(a)), l);
}
function nb(a) {
  let l = z.useContext(gr);
  return (De(l, uf(a)), l);
}
function ab(a) {
  let l = z.useContext(ca);
  return (De(l, uf(a)), l);
}
function sf(a) {
  let l = ab(a),
    r = l.matches[l.matches.length - 1];
  return (
    De(
      r.route.id,
      `${a} can only be used on routes that contain a unique "id"`
    ),
    r.route.id
  );
}
function lb() {
  return sf("useRouteId");
}
function ib() {
  let a = z.useContext(rf),
    l = nb("useRouteError"),
    r = sf("useRouteError");
  return a !== void 0 ? a : l.errors?.[r];
}
function rb() {
  let { router: a } = tb("useNavigate"),
    l = sf("useNavigate"),
    r = z.useRef(!1);
  return (
    z.useLayoutEffect(() => {
      r.current = !0;
    }),
    z.useCallback(
      async (s, o = {}) => {
        (jt(r.current, Uy),
          r.current &&
            (typeof s == "number"
              ? await a.navigate(s)
              : await a.navigate(s, { fromRouteId: l, ...o })));
      },
      [a, l]
    )
  );
}
const q0 = {};
function ub(a, l, r) {
  q0[a] || ((q0[a] = !0), jt(!1, r));
}
const Y0 = {};
function V0(a, l) {
  !a && !Y0[l] && ((Y0[l] = !0), console.warn(l));
}
const sb = ["HydrateFallback", "hydrateFallbackElement"];
var cb = class {
  status = "pending";
  promise;
  resolve;
  reject;
  constructor() {
    this.promise = new Promise((a, l) => {
      ((this.resolve = (r) => {
        this.status === "pending" && ((this.status = "resolved"), a(r));
      }),
        (this.reject = (r) => {
          this.status === "pending" && ((this.status = "rejected"), l(r));
        }));
    });
  }
};
function ob({ router: a, flushSync: l, onError: r, useTransitions: s }) {
  s = wy() || s;
  let [o, f] = z.useState(a.state),
    [h, p] = z.useOptimistic(o),
    [v, y] = z.useState(),
    [g, b] = z.useState({ isTransitioning: !1 }),
    [C, O] = z.useState(),
    [U, V] = z.useState(),
    [Z, I] = z.useState(),
    te = z.useRef(new Map()),
    ne = z.useCallback(
      (
        J,
        {
          deletedFetchers: L,
          newErrors: Re,
          flushSync: He,
          viewTransitionOpts: Xe
        }
      ) => {
        (Re &&
          r &&
          Object.values(Re).forEach((Be) =>
            r(Be, {
              location: J.location,
              params: J.matches[0]?.params ?? {},
              pattern: li(J.matches)
            })
          ),
          J.fetchers.forEach((Be, rt) => {
            Be.data !== void 0 && te.current.set(rt, Be.data);
          }),
          L.forEach((Be) => te.current.delete(Be)),
          V0(
            He === !1 || l != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let Oe =
          a.window != null &&
          a.window.document != null &&
          typeof a.window.document.startViewTransition == "function";
        if (
          (V0(
            Xe == null || Oe,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
          ),
          !Xe || !Oe)
        ) {
          l && He
            ? l(() => f(J))
            : s === !1
              ? f(J)
              : z.startTransition(() => {
                  (s === !0 && p((Be) => G0(Be, J)), f(J));
                });
          return;
        }
        if (l && He) {
          l(() => {
            (U && (C?.resolve(), U.skipTransition()),
              b({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: Xe.currentLocation,
                nextLocation: Xe.nextLocation
              }));
          });
          let Be = a.window.document.startViewTransition(() => {
            l(() => f(J));
          });
          (Be.finished.finally(() => {
            l(() => {
              (O(void 0), V(void 0), y(void 0), b({ isTransitioning: !1 }));
            });
          }),
            l(() => V(Be)));
          return;
        }
        U
          ? (C?.resolve(),
            U.skipTransition(),
            I({
              state: J,
              currentLocation: Xe.currentLocation,
              nextLocation: Xe.nextLocation
            }))
          : (y(J),
            b({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: Xe.currentLocation,
              nextLocation: Xe.nextLocation
            }));
      },
      [a.window, l, U, C, s, p, r]
    );
  (z.useLayoutEffect(() => a.subscribe(ne), [a, ne]),
    z.useEffect(() => {
      g.isTransitioning && !g.flushSync && O(new cb());
    }, [g]),
    z.useEffect(() => {
      if (C && v && a.window) {
        let J = v,
          L = C.promise,
          Re = a.window.document.startViewTransition(async () => {
            (s === !1
              ? f(J)
              : z.startTransition(() => {
                  (s === !0 && p((He) => G0(He, J)), f(J));
                }),
              await L);
          });
        (Re.finished.finally(() => {
          (O(void 0), V(void 0), y(void 0), b({ isTransitioning: !1 }));
        }),
          V(Re));
      }
    }, [v, C, a.window, s, p]),
    z.useEffect(() => {
      C && v && h.location.key === v.location.key && C.resolve();
    }, [C, U, h.location, v]),
    z.useEffect(() => {
      !g.isTransitioning &&
        Z &&
        (y(Z.state),
        b({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: Z.currentLocation,
          nextLocation: Z.nextLocation
        }),
        I(void 0));
    }, [g.isTransitioning, Z]));
  let oe = z.useMemo(
      () => ({
        createHref: a.createHref,
        encodeLocation: a.encodeLocation,
        go: (J) => a.navigate(J),
        push: (J, L, Re) =>
          a.navigate(J, {
            state: L,
            preventScrollReset: Re?.preventScrollReset
          }),
        replace: (J, L, Re) =>
          a.navigate(J, {
            replace: !0,
            state: L,
            preventScrollReset: Re?.preventScrollReset
          })
      }),
      [a]
    ),
    se = a.basename || "/",
    Te = z.useMemo(
      () => ({
        router: a,
        navigator: oe,
        static: !1,
        basename: se,
        onError: r
      }),
      [a, oe, se, r]
    );
  return z.createElement(
    z.Fragment,
    null,
    z.createElement(
      dl.Provider,
      { value: Te },
      z.createElement(
        gr.Provider,
        { value: h },
        z.createElement(
          My.Provider,
          { value: te.current },
          z.createElement(
            lf.Provider,
            { value: g },
            z.createElement(
              hb,
              {
                basename: se,
                location: h.location,
                navigationType: h.historyAction,
                navigator: oe,
                useTransitions: s
              },
              z.createElement(fb, {
                routes: a.routes,
                manifest: a.manifest,
                future: a.future,
                state: h,
                isStatic: !1,
                onError: r
              })
            )
          )
        )
      )
    ),
    null
  );
}
function G0(a, l) {
  return {
    ...a,
    navigation: l.navigation.state !== "idle" ? l.navigation : a.navigation,
    revalidation: l.revalidation !== "idle" ? l.revalidation : a.revalidation,
    actionData:
      l.navigation.state !== "submitting" ? l.actionData : a.actionData,
    fetchers: l.fetchers
  };
}
const fb = z.memo(db);
function db({
  routes: a,
  manifest: l,
  future: r,
  state: s,
  isStatic: o,
  onError: f
}) {
  return K1(a, void 0, { manifest: l, state: s, isStatic: o, onError: f });
}
function hb({
  basename: a = "/",
  children: l = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: f = !1,
  useTransitions: h
}) {
  De(
    !br(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let p = a.replace(/^\/*/, "/"),
    v = z.useMemo(
      () => ({
        basename: p,
        navigator: o,
        static: f,
        useTransitions: h,
        future: {}
      }),
      [p, o, f, h]
    );
  typeof r == "string" && (r = Un(r));
  let {
      pathname: y = "/",
      search: g = "",
      hash: b = "",
      state: C = null,
      key: O = "default",
      mask: U
    } = r,
    V = z.useMemo(() => {
      let Z = Tn(y, p);
      return Z == null
        ? null
        : {
            location: {
              pathname: Z,
              search: g,
              hash: b,
              state: C,
              key: O,
              mask: U
            },
            navigationType: s
          };
    }, [p, y, g, b, C, O, s, U]);
  return (
    jt(
      V != null,
      `<Router basename="${p}"> is not able to match the URL "${y}${g}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    V == null
      ? null
      : z.createElement(
          Rn.Provider,
          { value: v },
          z.createElement(ts.Provider, { children: l, value: V })
        )
  );
}
const Zu = "application/x-www-form-urlencoded";
function ns(a) {
  return typeof HTMLElement < "u" && a instanceof HTMLElement;
}
function mb(a) {
  return ns(a) && a.tagName.toLowerCase() === "button";
}
function yb(a) {
  return ns(a) && a.tagName.toLowerCase() === "form";
}
function pb(a) {
  return ns(a) && a.tagName.toLowerCase() === "input";
}
function vb(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function gb(a, l) {
  return a.button === 0 && (!l || l === "_self") && !vb(a);
}
let Vu = null;
function bb() {
  if (Vu === null)
    try {
      (new FormData(document.createElement("form"), 0), (Vu = !1));
    } catch {
      Vu = !0;
    }
  return Vu;
}
const Eb = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function _o(a) {
  return a != null && !Eb.has(a)
    ? (jt(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Zu}"`
      ),
      null)
    : a;
}
function Sb(a, l) {
  let r, s, o, f, h;
  if (yb(a)) {
    let p = a.getAttribute("action");
    ((s = p ? Tn(p, l) : null),
      (r = a.getAttribute("method") || "get"),
      (o = _o(a.getAttribute("enctype")) || Zu),
      (f = new FormData(a)));
  } else if (mb(a) || (pb(a) && (a.type === "submit" || a.type === "image"))) {
    let p = a.form;
    if (p == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = a.getAttribute("formaction") || p.getAttribute("action");
    if (
      ((s = v ? Tn(v, l) : null),
      (r = a.getAttribute("formmethod") || p.getAttribute("method") || "get"),
      (o =
        _o(a.getAttribute("formenctype")) ||
        _o(p.getAttribute("enctype")) ||
        Zu),
      (f = new FormData(p, a)),
      !bb())
    ) {
      let { name: y, type: g, value: b } = a;
      if (g === "image") {
        let C = y ? `${y}.` : "";
        (f.append(`${C}x`, "0"), f.append(`${C}y`, "0"));
      } else y && f.append(y, b);
    }
  } else {
    if (ns(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = "get"), (s = null), (o = Zu), (h = a));
  }
  return (
    f && o === "text/plain" && ((h = f), (f = void 0)),
    { action: s, method: r.toLowerCase(), encType: o, formData: f, body: h }
  );
}
function cf(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function Ly(a, l) {
  let r =
    typeof a == "string"
      ? new URL(
          a,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : a;
  return (
    r.pathname.endsWith("/")
      ? (r.pathname = `${r.pathname}_.${l}`)
      : (r.pathname = `${r.pathname}.${l}`),
    r
  );
}
async function Tb(a, l) {
  if (a.id in l) return l[a.id];
  try {
    let r = await import(a.module);
    return ((l[a.id] = r), r);
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${a.module}\`, reloading page...`
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Rb(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === "preload" &&
        typeof a.imageSrcSet == "string" &&
        typeof a.imageSizes == "string"
      : typeof a.rel == "string" && typeof a.href == "string";
}
async function Ab(a, l, r) {
  return Db(
    (
      await Promise.all(
        a.map(async (s) => {
          let o = l.routes[s.route.id];
          if (o) {
            let f = await Tb(o, r);
            return f.links ? f.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(Rb)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" }
      )
  );
}
function Q0(a, l, r, s, o, f) {
  let h = (v, y) => (r[y] ? v.route.id !== r[y].route.id : !0),
    p = (v, y) =>
      r[y].pathname !== v.pathname ||
      (r[y].route.path?.endsWith("*") && r[y].params["*"] !== v.params["*"]);
  return f === "assets"
    ? l.filter((v, y) => h(v, y) || p(v, y))
    : f === "data"
      ? l.filter((v, y) => {
          let g = s.routes[v.route.id];
          if (!g || !g.hasLoader) return !1;
          if (h(v, y) || p(v, y)) return !0;
          if (v.route.shouldRevalidate) {
            let b = v.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin
              ),
              currentParams: r[0]?.params || {},
              nextUrl: new URL(a, window.origin),
              nextParams: v.params,
              defaultShouldRevalidate: !0
            });
            if (typeof b == "boolean") return b;
          }
          return !0;
        })
      : [];
}
function Nb(a, l, { includeHydrateFallback: r } = {}) {
  return Cb(
    a
      .map((s) => {
        let o = l.routes[s.route.id];
        if (!o) return [];
        let f = [o.module];
        return (
          o.clientActionModule && (f = f.concat(o.clientActionModule)),
          o.clientLoaderModule && (f = f.concat(o.clientLoaderModule)),
          r &&
            o.hydrateFallbackModule &&
            (f = f.concat(o.hydrateFallbackModule)),
          o.imports && (f = f.concat(o.imports)),
          f
        );
      })
      .flat(1)
  );
}
function Cb(a) {
  return [...new Set(a)];
}
function Ob(a) {
  let l = {},
    r = Object.keys(a).sort();
  for (let s of r) l[s] = a[s];
  return l;
}
function Db(a, l) {
  let r = new Set();
  return (
    new Set(l),
    a.reduce((s, o) => {
      let f = JSON.stringify(Ob(o));
      return (r.has(f) || (r.add(f), s.push({ key: f, link: o })), s);
    }, [])
  );
}
function _b() {
  let a = z.useContext(dl);
  return (
    cf(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    a
  );
}
function xb() {
  let a = z.useContext(gr);
  return (
    cf(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    a
  );
}
const of = z.createContext(void 0);
of.displayName = "FrameworkContext";
function ff() {
  let a = z.useContext(of);
  return (
    cf(a, "You must render this element inside a <HydratedRouter> element"),
    a
  );
}
function wb(a, l) {
  let r = z.useContext(of),
    [s, o] = z.useState(!1),
    [f, h] = z.useState(!1),
    {
      onFocus: p,
      onBlur: v,
      onMouseEnter: y,
      onMouseLeave: g,
      onTouchStart: b
    } = l,
    C = z.useRef(null);
  (z.useEffect(() => {
    if ((a === "render" && h(!0), a === "viewport")) {
      let V = (I) => {
          I.forEach((te) => {
            h(te.isIntersecting);
          });
        },
        Z = new IntersectionObserver(V, { threshold: 0.5 });
      return (
        C.current && Z.observe(C.current),
        () => {
          Z.disconnect();
        }
      );
    }
  }, [a]),
    z.useEffect(() => {
      if (s) {
        let V = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(V);
        };
      }
    }, [s]));
  let O = () => {
      o(!0);
    },
    U = () => {
      (o(!1), h(!1));
    };
  return r
    ? a !== "intent"
      ? [f, C, {}]
      : [
          f,
          C,
          {
            onFocus: lr(p, O),
            onBlur: lr(v, U),
            onMouseEnter: lr(y, O),
            onMouseLeave: lr(g, U),
            onTouchStart: lr(b, O)
          }
        ]
    : [!1, C, {}];
}
function lr(a, l) {
  return (r) => {
    (a && a(r), r.defaultPrevented || l(r));
  };
}
function Mb({ page: a, ...l }) {
  let r = wy(),
    { nonce: s } = ff(),
    { router: o } = _b(),
    f = z.useMemo(() => cy(o.routes, a, o.basename), [o.routes, a, o.basename]);
  return f
    ? (l.nonce == null && s && (l = { ...l, nonce: s }),
      r
        ? z.createElement(Ub, { page: a, matches: f, ...l })
        : z.createElement(Lb, { page: a, matches: f, ...l }))
    : null;
}
function zb(a) {
  let { manifest: l, routeModules: r } = ff(),
    [s, o] = z.useState([]);
  return (
    z.useEffect(() => {
      let f = !1;
      return (
        Ab(a, l, r).then((h) => {
          f || o(h);
        }),
        () => {
          f = !0;
        }
      );
    }, [a, l, r]),
    s
  );
}
function Ub({ page: a, matches: l, ...r }) {
  let s = oa(),
    o = z.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let f = Ly(a, "rsc"),
        h = !1,
        p = [];
      for (let v of l)
        typeof v.route.shouldRevalidate == "function"
          ? (h = !0)
          : p.push(v.route.id);
      return (
        h && p.length > 0 && f.searchParams.set("_routes", p.join(",")),
        [f.pathname + f.search]
      );
    }, [a, s, l]);
  return z.createElement(
    z.Fragment,
    null,
    o.map((f) =>
      z.createElement("link", {
        key: f,
        rel: "prefetch",
        as: "fetch",
        href: f,
        ...r
      })
    )
  );
}
function Lb({ page: a, matches: l, ...r }) {
  let s = oa(),
    { manifest: o, routeModules: f } = ff(),
    { loaderData: h, matches: p } = xb(),
    v = z.useMemo(() => Q0(a, l, p, o, s, "data"), [a, l, p, o, s]),
    y = z.useMemo(() => Q0(a, l, p, o, s, "assets"), [a, l, p, o, s]),
    g = z.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let O = new Set(),
        U = !1;
      if (
        (l.forEach((Z) => {
          let I = o.routes[Z.route.id];
          !I ||
            !I.hasLoader ||
            ((!v.some((te) => te.route.id === Z.route.id) &&
              Z.route.id in h &&
              f[Z.route.id]?.shouldRevalidate) ||
            I.hasClientLoader
              ? (U = !0)
              : O.add(Z.route.id));
        }),
        O.size === 0)
      )
        return [];
      let V = Ly(a, "data");
      return (
        U &&
          O.size > 0 &&
          V.searchParams.set(
            "_routes",
            l
              .filter((Z) => O.has(Z.route.id))
              .map((Z) => Z.route.id)
              .join(",")
          ),
        [V.pathname + V.search]
      );
    }, [h, s, o, v, l, a, f]),
    b = z.useMemo(() => Nb(y, o), [y, o]),
    C = zb(y);
  return z.createElement(
    z.Fragment,
    null,
    g.map((O) =>
      z.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...r
      })
    ),
    b.map((O) =>
      z.createElement("link", { key: O, rel: "modulepreload", href: O, ...r })
    ),
    C.map(({ key: O, link: U }) =>
      z.createElement("link", {
        key: O,
        nonce: r.nonce,
        ...U,
        crossOrigin: U.crossOrigin ?? r.crossOrigin
      })
    )
  );
}
function jb(...a) {
  return (l) => {
    a.forEach((r) => {
      typeof r == "function" ? r(l) : r != null && (r.current = l);
    });
  };
}
const Hb =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Hb && (window.__reactRouterVersion = "8.3.0");
} catch {}
function Bb(a, l) {
  return m1({
    basename: l?.basename,
    getContext: l?.getContext,
    future: l?.future,
    history: xg({ window: l?.window }),
    hydrationData: l?.hydrationData || kb(),
    routes: a,
    mapRouteProperties: sy,
    hydrationRouteProperties: sb,
    dataStrategy: l?.dataStrategy,
    patchRoutesOnNavigation: l?.patchRoutesOnNavigation,
    window: l?.window,
    instrumentations: l?.instrumentations
  }).initialize();
}
function kb() {
  let a = window?.__staticRouterHydrationData;
  return (a && a.errors && (a = { ...a, errors: qb(a.errors) }), a);
}
function qb(a) {
  if (!a) return null;
  let l = Object.entries(a),
    r = {};
  for (let [s, o] of l)
    if (o && o.__type === "RouteErrorResponse")
      r[s] = new vr(o.status, o.statusText, o.data, o.internal === !0);
    else if (o && o.__type === "Error") {
      if (typeof o.__subType == "string" && a1.includes(o.__subType)) {
        let f = window[o.__subType];
        if (typeof f == "function")
          try {
            let h = new f(o.message);
            ((h.stack = ""), (r[s] = h));
          } catch {}
      }
      if (r[s] == null) {
        let f = new Error(o.message);
        ((f.stack = ""), (r[s] = f));
      }
    } else r[s] = o;
  return r;
}
const jy = z.forwardRef(function (
  {
    onClick: l,
    discover: r = "render",
    prefetch: s = "none",
    relative: o,
    reloadDocument: f,
    replace: h,
    mask: p,
    state: v,
    target: y,
    to: g,
    preventScrollReset: b,
    viewTransition: C,
    defaultShouldRevalidate: O,
    ...U
  },
  V
) {
  let { basename: Z, navigator: I, useTransitions: te } = z.useContext(Rn),
    ne = typeof g == "string" && Pu.test(g),
    oe = vy(g, Z);
  g = oe.to;
  let se = X1(g, { relative: o }),
    Te = oa(),
    J = null;
  if (p) {
    let Je = es(p, [], Te.mask ? Te.mask.pathname : "/", !0);
    (Z !== "/" &&
      (Je.pathname = Je.pathname === "/" ? Z : hn([Z, Je.pathname])),
      (J = I.createHref(Je)));
  }
  let [L, Re, He] = wb(s, U),
    Xe = Qb(g, {
      replace: h,
      mask: p,
      state: v,
      target: y,
      preventScrollReset: b,
      relative: o,
      viewTransition: C,
      defaultShouldRevalidate: O,
      useTransitions: te
    });
  function Oe(Je) {
    (l && l(Je), Je.defaultPrevented || Xe(Je));
  }
  let Be = !(oe.isExternal || f),
    rt = z.createElement("a", {
      ...U,
      ...He,
      href: (Be ? J : void 0) || oe.absoluteURL || se,
      onClick: Be ? Oe : l,
      ref: jb(V, Re),
      target: y,
      "data-discover": !ne && r === "render" ? "true" : void 0
    });
  return L && !ne
    ? z.createElement(z.Fragment, null, rt, z.createElement(Mb, { page: se }))
    : rt;
});
jy.displayName = "Link";
const Yb = z.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: r = !1,
    className: s = "",
    end: o = !1,
    style: f,
    to: h,
    viewTransition: p,
    children: v,
    ...y
  },
  g
) {
  let b = Er(h, { relative: y.relative }),
    C = oa(),
    O = z.useContext(gr),
    { navigator: U, basename: V } = z.useContext(Rn),
    Z = O != null && Jb(b) && p === !0,
    I = U.encodeLocation ? U.encodeLocation(b).pathname : b.pathname,
    te = C.pathname,
    ne =
      O && O.navigation && O.navigation.location
        ? O.navigation.location.pathname
        : null;
  (r ||
    ((te = te.toLowerCase()),
    (ne = ne ? ne.toLowerCase() : null),
    (I = I.toLowerCase())),
    ne && V && (ne = Tn(ne, V) || ne));
  const oe = I !== "/" && I.endsWith("/") ? I.length - 1 : I.length;
  let se = te === I || (!o && te.startsWith(I) && te.charAt(oe) === "/"),
    Te =
      ne != null &&
      (ne === I || (!o && ne.startsWith(I) && ne.charAt(oe) === "/")),
    J = { isActive: se, isPending: Te, isTransitioning: Z },
    L = se ? l : void 0,
    Re;
  typeof s == "function"
    ? (Re = s(J))
    : (Re = [
        s,
        se ? "active" : null,
        Te ? "pending" : null,
        Z ? "transitioning" : null
      ]
        .filter(Boolean)
        .join(" "));
  let He = typeof f == "function" ? f(J) : f;
  return z.createElement(
    jy,
    {
      ...y,
      "aria-current": L,
      className: Re,
      ref: g,
      style: He,
      to: h,
      viewTransition: p
    },
    typeof v == "function" ? v(J) : v
  );
});
Yb.displayName = "NavLink";
const Vb = z.forwardRef(
  (
    {
      discover: a = "render",
      fetcherKey: l,
      navigate: r,
      reloadDocument: s,
      replace: o,
      state: f,
      method: h = "get",
      action: p,
      onSubmit: v,
      relative: y,
      preventScrollReset: g,
      viewTransition: b,
      defaultShouldRevalidate: C,
      ...O
    },
    U
  ) => {
    let { useTransitions: V } = z.useContext(Rn),
      Z = Fb(),
      I = Kb(p, { relative: y }),
      te = h.toLowerCase() === "get" ? "get" : "post",
      ne = typeof p == "string" && Pu.test(p),
      oe = (se) => {
        if ((v && v(se), se.defaultPrevented)) return;
        se.preventDefault();
        let Te = se.nativeEvent.submitter,
          J = Te?.getAttribute("formmethod") || h,
          L = () =>
            Z(Te || se.currentTarget, {
              fetcherKey: l,
              method: J,
              navigate: r,
              replace: o,
              state: f,
              relative: y,
              preventScrollReset: g,
              viewTransition: b,
              defaultShouldRevalidate: C
            });
        V && r !== !1 ? z.startTransition(() => L()) : L();
      };
    return z.createElement("form", {
      ref: U,
      method: te,
      action: I,
      onSubmit: s ? v : oe,
      ...O,
      "data-discover": !ne && a === "render" ? "true" : void 0
    });
  }
);
Vb.displayName = "Form";
function Gb(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Hy(a) {
  let l = z.useContext(dl);
  return (De(l, Gb(a)), l);
}
function Qb(
  a,
  {
    target: l,
    replace: r,
    mask: s,
    state: o,
    preventScrollReset: f,
    relative: h,
    viewTransition: p,
    defaultShouldRevalidate: v,
    useTransitions: y
  } = {}
) {
  let g = Z1(),
    b = oa(),
    C = Er(a, { relative: h });
  return z.useCallback(
    (O) => {
      if (gb(O, l)) {
        O.preventDefault();
        let U = r !== void 0 ? r : zn(b) === zn(C),
          V = () =>
            g(a, {
              replace: U,
              mask: s,
              state: o,
              preventScrollReset: f,
              relative: h,
              viewTransition: p,
              defaultShouldRevalidate: v
            });
        y ? z.startTransition(() => V()) : V();
      }
    },
    [b, g, C, r, s, o, l, a, f, h, p, v, y]
  );
}
let Xb = 0,
  Zb = () => `__${String(++Xb)}__`;
function Fb() {
  let { router: a } = Hy("useSubmit"),
    { basename: l } = z.useContext(Rn),
    r = lb(),
    s = a.fetch,
    o = a.navigate;
  return z.useCallback(
    async (f, h = {}) => {
      let { action: p, method: v, encType: y, formData: g, body: b } = Sb(f, l);
      h.navigate === !1
        ? await s(h.fetcherKey || Zb(), r, h.action || p, {
            defaultShouldRevalidate: h.defaultShouldRevalidate,
            preventScrollReset: h.preventScrollReset,
            formData: g,
            body: b,
            formMethod: h.method || v,
            formEncType: h.encType || y,
            flushSync: h.flushSync
          })
        : await o(h.action || p, {
            defaultShouldRevalidate: h.defaultShouldRevalidate,
            preventScrollReset: h.preventScrollReset,
            formData: g,
            body: b,
            formMethod: h.method || v,
            formEncType: h.encType || y,
            replace: h.replace,
            state: h.state,
            fromRouteId: r,
            flushSync: h.flushSync,
            viewTransition: h.viewTransition
          });
    },
    [s, o, l, r]
  );
}
function Kb(a, { relative: l } = {}) {
  let { basename: r } = z.useContext(Rn),
    s = z.useContext(ca);
  De(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1),
    f = { ...Er(a || ".", { relative: l }) },
    h = oa();
  if (a == null) {
    f.search = h.search;
    let p = new URLSearchParams(f.search),
      v = p.getAll("index");
    if (v.some((y) => y === "")) {
      (p.delete("index"),
        v.filter((g) => g).forEach((g) => p.append("index", g)));
      let y = p.toString();
      f.search = y ? `?${y}` : "";
    }
  }
  return (
    (!a || a === ".") &&
      o.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (f.pathname = f.pathname === "/" ? r : hn([r, f.pathname])),
    zn(f)
  );
}
function Jb(a, { relative: l } = {}) {
  let r = z.useContext(lf);
  De(
    r != null,
    "`useViewTransitionState` must be used within `react-router/dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Hy("useViewTransitionState"),
    o = Er(a, { relative: l });
  if (!r.isTransitioning) return !1;
  let f = Tn(r.currentLocation.pathname, s) || r.currentLocation.pathname,
    h = Tn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return $u(o.pathname, h) != null || $u(o.pathname, f) != null;
}
const $b = "hostMetaData";
function Ib(a) {
  let l;
  try {
    l = new URLSearchParams(a);
  } catch {
    return null;
  }
  const r = l.get($b);
  if (!r) return null;
  let s;
  try {
    s = JSON.parse(r);
  } catch {
    return null;
  }
  if (typeof s != "object" || s === null) return null;
  const o = s,
    f = o.instanceId,
    h = o.hostAppOrigin;
  if (
    typeof f != "string" ||
    f.length === 0 ||
    typeof h != "string" ||
    h.length === 0
  )
    return null;
  try {
    if (new URL(h).origin !== h) return null;
  } catch {
    return null;
  }
  return { instanceId: f, hostAppOrigin: h };
}
function By(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function ky(a) {
  return typeof a.id == "number" && Number.isInteger(a.id) && a.id >= 0;
}
function df(a) {
  return By(a) && a.jsonrpc === "2.0";
}
function Wb(a) {
  if (!df(a)) return !1;
  const l = a;
  return !("id" in l) && typeof l.method == "string";
}
function Pb(a) {
  if (!df(a)) return !1;
  const l = a;
  return ky(l) && "result" in l && !("error" in l) && !("method" in l);
}
function qy(a) {
  if (!df(a)) return !1;
  const l = a;
  if (!ky(l) || "result" in l || "method" in l) return !1;
  const r = l.error;
  return By(r) && typeof r.code == "number";
}
function e2(a) {
  return Pb(a) || qy(a);
}
class t2 {
  nextRequestId = 1;
  pending = new Map();
  notificationHandlers = new Map();
  transport;
  constructor(l) {
    ((this.transport = l), this.transport.onMessage(this.onMessage));
  }
  registerNotificationHandler(l, r) {
    (this.notificationHandlers.has(l) ||
      this.notificationHandlers.set(l, new Set()),
      this.notificationHandlers.get(l).add(r));
  }
  onMessage = (l) => {
    if (e2(l)) {
      const r = this.pending.get(l.id);
      if (!r) return;
      (this.pending.delete(l.id),
        this.onInboundMeta(l, l._meta),
        qy(l)
          ? r.reject(new Error(l.error.message || "Request failed"))
          : r.resolve(l.result));
      return;
    }
    if (Wb(l)) {
      this.onInboundMeta(l, l._meta);
      const r = this.notificationHandlers.get(l.method);
      if (r) {
        const s = l._meta;
        r.forEach((o) => {
          o(l.params, s);
        });
      }
    }
  };
  request(l, r) {
    const s = this.nextRequestId++,
      o = { jsonrpc: "2.0", id: s, method: l, params: r };
    return (
      this.applyOutboundMeta(o, l),
      new Promise((f, h) => {
        (this.pending.set(s, { resolve: f, reject: h }),
          this.transport.post(o));
      })
    );
  }
  sendNotification(l, r) {
    const s = { jsonrpc: "2.0", method: l, params: r };
    (this.applyOutboundMeta(s, l), this.transport.post(s));
  }
  getOutboundMeta(l) {}
  onInboundMeta(l, r) {}
  applyOutboundMeta(l, r) {
    const s = this.getOutboundMeta(r);
    s !== void 0 && (l._meta = s);
  }
}
let n2 = class {
  targetOrigin;
  constructor(l) {
    this.targetOrigin = l;
  }
  post(l) {
    window.parent?.postMessage(l, this.targetOrigin);
  }
  onMessage(l) {
    const r = (s) => {
      l(s.data);
    };
    return (
      window.addEventListener("message", r),
      () => window.removeEventListener("message", r)
    );
  }
};
const a2 = 500,
  l2 = "2026-01-26";
class sl extends t2 {
  static initPromise = null;
  hostCtx = {};
  _handshakeSucceeded = !1;
  static async getInstance(l) {
    if (!sl.initPromise) {
      const r = l?.targetOrigin ?? "*";
      sl.initPromise = (async () => {
        const s = new sl(new n2(r));
        return (await s.handshake(l), s);
      })();
    }
    return sl.initPromise;
  }
  static resetInstance() {
    sl.initPromise = null;
  }
  async handshake(l) {
    const r = l?.handshakeTimeoutMs ?? a2,
      s = l?.appInfo ?? { name: "mcp-app", version: "1.0.0" };
    try {
      const o = Symbol("timeout"),
        f = await Promise.race([
          this.request("ui/initialize", {
            protocolVersion: l2,
            appInfo: s,
            appCapabilities: {}
          }),
          new Promise((h) => setTimeout(() => h(o), r))
        ]);
      f !== o &&
        ((this.hostCtx = f.hostContext ?? {}),
        (this._handshakeSucceeded = !0),
        this.registerNotificationHandler(
          "ui/notifications/host-context-changed",
          (h) => {
            this.hostCtx = { ...this.hostCtx, ...h };
          }
        ),
        this.sendNotification("ui/notifications/initialized"));
    } catch {}
  }
  getHostContext() {
    return this.hostCtx;
  }
  get handshakeSucceeded() {
    return this._handshakeSucceeded;
  }
  request(l, r) {
    return super.request(l, r);
  }
  sendNotification(l, r) {
    super.sendNotification(l, r);
  }
  registerNotificationHandler(l, r) {
    super.registerNotificationHandler(l, r);
  }
}
var Wl = ((a) => (
  (a.WebApp = "WebApp"),
  (a.MicroFrontend = "Micro-Frontend"),
  (a.OpenAI = "OpenAI"),
  (a.MCPApps = "MCP-Apps"),
  (a.Mosaic = "Mosaic"),
  a
))(Wl || {});
let xo = null,
  Yy;
async function i2() {
  return typeof window > "u"
    ? "Mosaic"
    : window.openai
      ? "OpenAI"
      : u2()
        ? s2()
          ? "Micro-Frontend"
          : (await sl.getInstance(Yy)).handshakeSucceeded
            ? "MCP-Apps"
            : "WebApp"
        : "WebApp";
}
async function r2(a) {
  return (xo || ((Yy = a?.mcpApps), (xo = i2())), xo);
}
function u2() {
  if (typeof window > "u") return !1;
  try {
    return window.parent !== window;
  } catch {
    return !0;
  }
}
function s2() {
  if (typeof window > "u") return !1;
  try {
    if (window.parent === window) return !1;
  } catch {
    return !1;
  }
  const a = window.location?.search;
  return typeof a != "string" ? !1 : Ib(a) !== null;
}
async function c2(a) {
  return await r2();
}
const o2 = new Set(["then", "catch", "finally"]);
function f2(a, l) {
  return new Proxy(a, {
    get(r, s, o) {
      if (typeof s == "symbol" || o2.has(s)) {
        const f = Reflect.get(r, s, o);
        return typeof f == "function" ? f.bind(r) : f;
      }
      throw new TypeError(`\`${l}()\` returns a Promise — did you forget to await it?
Use \`const sdk = await ${l}();\` before accessing SDK methods.`);
    }
  });
}
const { freeze: d2, keys: Vy } = Object,
  { isArray: Gy } = Array,
  { stringify: X0 } = JSON,
  h2 = WeakSet;
let m2 = class {
    constructor(l) {
      this.value = l;
    }
    isOk() {
      return !0;
    }
    isErr() {
      return !this.isOk();
    }
  },
  y2 = class {
    constructor(l) {
      this.error = l;
    }
    isOk() {
      return !1;
    }
    isErr() {
      return !this.isOk();
    }
  };
const Mn = (a) => new m2(a),
  wn = (a) => new y2(a);
class p2 extends Error {
  constructor(l) {
    (super(l), (this.name = "DataNotFoundError"));
  }
}
function At(a) {
  return hf(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return At(l(a));
          } catch (s) {
            return l === void 0 ? At(a) : qo(s);
          }
        }
      };
}
function qo(a) {
  return hf(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return At(r(a));
            } catch (s) {
              return qo(s);
            }
          return qo(a);
        }
      };
}
function hf(a) {
  return typeof a?.then == "function";
}
function Yo(a) {
  if (
    (a && a.toJSON && typeof a.toJSON == "function" && (a = a.toJSON()),
    a === void 0)
  )
    return;
  if (typeof a == "number") return isFinite(a) ? "" + a : "null";
  if (typeof a != "object") return X0(a);
  let l, r;
  if (Gy(a)) {
    for (r = "[", l = 0; l < a.length; l++)
      (l && (r += ","), (r += Yo(a[l]) || "null"));
    return r + "]";
  }
  if (a === null) return "null";
  const s = Vy(a).sort();
  for (r = "", l = 0; l < s.length; l++) {
    const o = s[l],
      f = Yo(a[o]);
    f && (r && (r += ","), (r += X0(o) + ":" + f));
  }
  return "{" + r + "}";
}
function ir(a) {
  return a instanceof Error
    ? a
    : new Error(typeof a == "string" ? a : JSON.stringify(a));
}
var Qy = ((a) => (
  (a[(a.Ok = 200)] = "Ok"),
  (a[(a.Created = 201)] = "Created"),
  (a[(a.NoContent = 204)] = "NoContent"),
  (a[(a.NotModified = 304)] = "NotModified"),
  (a[(a.BadRequest = 400)] = "BadRequest"),
  (a[(a.Unauthorized = 401)] = "Unauthorized"),
  (a[(a.Forbidden = 403)] = "Forbidden"),
  (a[(a.NotFound = 404)] = "NotFound"),
  (a[(a.ServerError = 500)] = "ServerError"),
  (a[(a.GatewayTimeout = 504)] = "GatewayTimeout"),
  a
))(Qy || {});
function v2(a) {
  switch (a) {
    case 200:
      return "OK";
    case 201:
      return "Created";
    case 304:
      return "Not Modified";
    case 400:
      return "Bad Request";
    case 404:
      return "Not Found";
    case 500:
      return "Server Error";
    default:
      return `Unexpected HTTP Status Code: ${a}`;
  }
}
class g2 extends Error {
  constructor(l, r, s) {
    (super(),
      (this.status = l),
      (this.body = r),
      (this.headers = s || {}),
      (this.ok = l >= 200 && this.status <= 299),
      (this.statusText = v2(l)));
  }
}
const Z0 = new h2();
function ai(a) {
  if (!(typeof a != "object" || a === null || Z0.has(a))) {
    if ((Z0.add(a), Gy(a)))
      for (let l = 0, r = a.length; l < r; l += 1) ai(a[l]);
    else {
      const l = Vy(a);
      for (let r = 0, s = l.length; r < s; r += 1) ai(a[l[r]]);
    }
    d2(a);
  }
}
class Xy extends Error {
  constructor(l) {
    (super(), (this.data = l), (this.type = "user-visible"));
  }
}
function b2(a) {
  return a instanceof Error && "type" in a && a.type === "user-visible";
}
function Zy(a = { request: [], retry: void 0, response: [], finally: [] }, l) {
  return {
    type: "fetch",
    version: "1.0",
    service: function (...r) {
      var s;
      const o = (s = a.createContext) == null ? void 0 : s.call(a),
        {
          request: f = [],
          retry: h = void 0,
          response: p = [],
          finally: v = []
        } = a,
        y = f.reduce((g, b) => g.then((C) => b(C, o)), At(r));
      return Promise.resolve(y)
        .then((g) =>
          h ? h(g, l, o) : l ? l.applyRetry(() => fetch(...g)) : fetch(...g)
        )
        .then((g) => p.reduce((b, C) => b.then((O) => C(O, o)), At(g)))
        .finally(() => {
          if (v.length > 0)
            return v.reduce((g, b) => g.then(() => b(o)), Promise.resolve());
        });
    }
  };
}
function yr(
  a,
  l,
  [r, s = {}],
  {
    throwOnExisting: o = !1,
    errorMessage: f = `Unexpected ${a} header encountered`
  } = {}
) {
  let h = !1;
  if (r instanceof Request && !s?.headers) {
    if (o && r.headers.has(a)) throw new Error(f);
    (r.headers.set(a, l), (h = !0));
  }
  if (s?.headers instanceof Headers) {
    if (o && s.headers.has(a)) throw new Error(f);
    s.headers.set(a, l);
  } else {
    if (o && s?.headers && Reflect.has(s.headers, a)) throw new Error(f);
    h || (s.headers = { ...s?.headers, [a]: l });
  }
  return [r, s];
}
function Fu(a, l) {
  if (!!!a) throw new Error(l);
}
const E2 = 10,
  Fy = 2;
function mf(a) {
  return as(a, []);
}
function as(a, l) {
  switch (typeof a) {
    case "string":
      return JSON.stringify(a);
    case "function":
      return a.name ? `[function ${a.name}]` : "[function]";
    case "object":
      return S2(a, l);
    default:
      return String(a);
  }
}
function S2(a, l) {
  if (a === null) return "null";
  if (l.includes(a)) return "[Circular]";
  const r = [...l, a];
  if (T2(a)) {
    const s = a.toJSON();
    if (s !== a) return typeof s == "string" ? s : as(s, r);
  } else if (Array.isArray(a)) return A2(a, r);
  return R2(a, r);
}
function T2(a) {
  return typeof a.toJSON == "function";
}
function R2(a, l) {
  const r = Object.entries(a);
  return r.length === 0
    ? "{}"
    : l.length > Fy
      ? "[" + N2(a) + "]"
      : "{ " + r.map(([o, f]) => o + ": " + as(f, l)).join(", ") + " }";
}
function A2(a, l) {
  if (a.length === 0) return "[]";
  if (l.length > Fy) return "[Array]";
  const r = Math.min(E2, a.length),
    s = a.length - r,
    o = [];
  for (let f = 0; f < r; ++f) o.push(as(a[f], l));
  return (
    s === 1
      ? o.push("... 1 more item")
      : s > 1 && o.push(`... ${s} more items`),
    "[" + o.join(", ") + "]"
  );
}
function N2(a) {
  const l = Object.prototype.toString
    .call(a)
    .replace(/^\[object /, "")
    .replace(/]$/, "");
  if (l === "Object" && typeof a.constructor == "function") {
    const r = a.constructor.name;
    if (typeof r == "string" && r !== "") return r;
  }
  return l;
}
const C2 = globalThis.process && !0,
  O2 = C2
    ? function (l, r) {
        return l instanceof r;
      }
    : function (l, r) {
        if (l instanceof r) return !0;
        if (typeof l == "object" && l !== null) {
          var s;
          const o = r.prototype[Symbol.toStringTag],
            f =
              Symbol.toStringTag in l
                ? l[Symbol.toStringTag]
                : (s = l.constructor) === null || s === void 0
                  ? void 0
                  : s.name;
          if (o === f) {
            const h = mf(l);
            throw new Error(`Cannot use ${o} "${h}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }
        return !1;
      };
class Ky {
  constructor(l, r = "GraphQL request", s = { line: 1, column: 1 }) {
    (typeof l == "string" ||
      Fu(!1, `Body must be a string. Received: ${mf(l)}.`),
      (this.body = l),
      (this.name = r),
      (this.locationOffset = s),
      this.locationOffset.line > 0 ||
        Fu(!1, "line in locationOffset is 1-indexed and must be positive."),
      this.locationOffset.column > 0 ||
        Fu(!1, "column in locationOffset is 1-indexed and must be positive."));
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function D2(a) {
  return O2(a, Ky);
}
function _2(a, l) {
  if (!!!a) throw new Error("Unexpected invariant triggered.");
}
const x2 = /\r\n|[\n\r]/g;
function Vo(a, l) {
  let r = 0,
    s = 1;
  for (const o of a.body.matchAll(x2)) {
    if ((typeof o.index == "number" || _2(!1), o.index >= l)) break;
    ((r = o.index + o[0].length), (s += 1));
  }
  return { line: s, column: l + 1 - r };
}
function w2(a) {
  return Jy(a.source, Vo(a.source, a.start));
}
function Jy(a, l) {
  const r = a.locationOffset.column - 1,
    s = "".padStart(r) + a.body,
    o = l.line - 1,
    f = a.locationOffset.line - 1,
    h = l.line + f,
    p = l.line === 1 ? r : 0,
    v = l.column + p,
    y = `${a.name}:${h}:${v}
`,
    g = s.split(/\r\n|[\n\r]/g),
    b = g[o];
  if (b.length > 120) {
    const C = Math.floor(v / 80),
      O = v % 80,
      U = [];
    for (let V = 0; V < b.length; V += 80) U.push(b.slice(V, V + 80));
    return (
      y +
      F0([
        [`${h} |`, U[0]],
        ...U.slice(1, C + 1).map((V) => ["|", V]),
        ["|", "^".padStart(O)],
        ["|", U[C + 1]]
      ])
    );
  }
  return (
    y +
    F0([
      [`${h - 1} |`, g[o - 1]],
      [`${h} |`, b],
      ["|", "^".padStart(v)],
      [`${h + 1} |`, g[o + 1]]
    ])
  );
}
function F0(a) {
  const l = a.filter(([s, o]) => o !== void 0),
    r = Math.max(...l.map(([s]) => s.length));
  return l.map(([s, o]) => s.padStart(r) + (o ? " " + o : "")).join(`
`);
}
var ge;
(function (a) {
  ((a.NAME = "Name"),
    (a.DOCUMENT = "Document"),
    (a.OPERATION_DEFINITION = "OperationDefinition"),
    (a.VARIABLE_DEFINITION = "VariableDefinition"),
    (a.SELECTION_SET = "SelectionSet"),
    (a.FIELD = "Field"),
    (a.ARGUMENT = "Argument"),
    (a.FRAGMENT_SPREAD = "FragmentSpread"),
    (a.INLINE_FRAGMENT = "InlineFragment"),
    (a.FRAGMENT_DEFINITION = "FragmentDefinition"),
    (a.VARIABLE = "Variable"),
    (a.INT = "IntValue"),
    (a.FLOAT = "FloatValue"),
    (a.STRING = "StringValue"),
    (a.BOOLEAN = "BooleanValue"),
    (a.NULL = "NullValue"),
    (a.ENUM = "EnumValue"),
    (a.LIST = "ListValue"),
    (a.OBJECT = "ObjectValue"),
    (a.OBJECT_FIELD = "ObjectField"),
    (a.DIRECTIVE = "Directive"),
    (a.NAMED_TYPE = "NamedType"),
    (a.LIST_TYPE = "ListType"),
    (a.NON_NULL_TYPE = "NonNullType"),
    (a.SCHEMA_DEFINITION = "SchemaDefinition"),
    (a.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition"),
    (a.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition"),
    (a.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition"),
    (a.FIELD_DEFINITION = "FieldDefinition"),
    (a.INPUT_VALUE_DEFINITION = "InputValueDefinition"),
    (a.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition"),
    (a.UNION_TYPE_DEFINITION = "UnionTypeDefinition"),
    (a.ENUM_TYPE_DEFINITION = "EnumTypeDefinition"),
    (a.ENUM_VALUE_DEFINITION = "EnumValueDefinition"),
    (a.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition"),
    (a.DIRECTIVE_DEFINITION = "DirectiveDefinition"),
    (a.SCHEMA_EXTENSION = "SchemaExtension"),
    (a.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension"),
    (a.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension"),
    (a.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension"),
    (a.UNION_TYPE_EXTENSION = "UnionTypeExtension"),
    (a.ENUM_TYPE_EXTENSION = "EnumTypeExtension"),
    (a.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension"));
})(ge || (ge = {}));
var Y;
(function (a) {
  ((a.SOF = "<SOF>"),
    (a.EOF = "<EOF>"),
    (a.BANG = "!"),
    (a.DOLLAR = "$"),
    (a.AMP = "&"),
    (a.PAREN_L = "("),
    (a.PAREN_R = ")"),
    (a.SPREAD = "..."),
    (a.COLON = ":"),
    (a.EQUALS = "="),
    (a.AT = "@"),
    (a.BRACKET_L = "["),
    (a.BRACKET_R = "]"),
    (a.BRACE_L = "{"),
    (a.PIPE = "|"),
    (a.BRACE_R = "}"),
    (a.NAME = "Name"),
    (a.INT = "Int"),
    (a.FLOAT = "Float"),
    (a.STRING = "String"),
    (a.BLOCK_STRING = "BlockString"),
    (a.COMMENT = "Comment"));
})(Y || (Y = {}));
function M2(a) {
  return typeof a == "object" && a !== null;
}
function z2(a) {
  const l = a[0];
  return l == null || "kind" in l || "length" in l
    ? {
        nodes: l,
        source: a[1],
        positions: a[2],
        path: a[3],
        originalError: a[4],
        extensions: a[5]
      }
    : l;
}
class yf extends Error {
  constructor(l, ...r) {
    var s, o, f;
    const {
      nodes: h,
      source: p,
      positions: v,
      path: y,
      originalError: g,
      extensions: b
    } = z2(r);
    (super(l),
      (this.name = "GraphQLError"),
      (this.path = y ?? void 0),
      (this.originalError = g ?? void 0),
      (this.nodes = K0(Array.isArray(h) ? h : h ? [h] : void 0)));
    const C = K0(
      (s = this.nodes) === null || s === void 0
        ? void 0
        : s.map((U) => U.loc).filter((U) => U != null)
    );
    ((this.source =
      p ??
      (C == null || (o = C[0]) === null || o === void 0 ? void 0 : o.source)),
      (this.positions = v ?? C?.map((U) => U.start)),
      (this.locations =
        v && p
          ? v.map((U) => Vo(p, U))
          : C?.map((U) => Vo(U.source, U.start))));
    const O = M2(g?.extensions) ? g?.extensions : void 0;
    ((this.extensions =
      (f = b ?? O) !== null && f !== void 0 ? f : Object.create(null)),
      Object.defineProperties(this, {
        message: { writable: !0, enumerable: !0 },
        name: { enumerable: !1 },
        nodes: { enumerable: !1 },
        source: { enumerable: !1 },
        positions: { enumerable: !1 },
        originalError: { enumerable: !1 }
      }),
      g != null && g.stack
        ? Object.defineProperty(this, "stack", {
            value: g.stack,
            writable: !0,
            configurable: !0
          })
        : Error.captureStackTrace
          ? Error.captureStackTrace(this, yf)
          : Object.defineProperty(this, "stack", {
              value: Error().stack,
              writable: !0,
              configurable: !0
            }));
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let l = this.message;
    if (this.nodes)
      for (const r of this.nodes)
        r.loc &&
          (l +=
            `

` + w2(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        l +=
          `

` + Jy(this.source, r);
    return l;
  }
  toJSON() {
    const l = { message: this.message };
    return (
      this.locations != null && (l.locations = this.locations),
      this.path != null && (l.path = this.path),
      this.extensions != null &&
        Object.keys(this.extensions).length > 0 &&
        (l.extensions = this.extensions),
      l
    );
  }
}
function K0(a) {
  return a === void 0 || a.length === 0 ? void 0 : a;
}
function Rt(a, l, r) {
  return new yf(`Syntax Error: ${r}`, { source: a, positions: [l] });
}
class U2 {
  constructor(l, r, s) {
    ((this.start = l.start),
      (this.end = r.end),
      (this.startToken = l),
      (this.endToken = r),
      (this.source = s));
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return { start: this.start, end: this.end };
  }
}
class $y {
  constructor(l, r, s, o, f, h) {
    ((this.kind = l),
      (this.start = r),
      (this.end = s),
      (this.line = o),
      (this.column = f),
      (this.value = h),
      (this.prev = null),
      (this.next = null));
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const Iy = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "name",
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"]
  },
  L2 = new Set(Object.keys(Iy));
function J0(a) {
  const l = a?.kind;
  return typeof l == "string" && L2.has(l);
}
var Pl;
(function (a) {
  ((a.QUERY = "query"),
    (a.MUTATION = "mutation"),
    (a.SUBSCRIPTION = "subscription"));
})(Pl || (Pl = {}));
function Go(a) {
  return a === 9 || a === 32;
}
function pr(a) {
  return a >= 48 && a <= 57;
}
function Wy(a) {
  return (a >= 97 && a <= 122) || (a >= 65 && a <= 90);
}
function Py(a) {
  return Wy(a) || a === 95;
}
function j2(a) {
  return Wy(a) || pr(a) || a === 95;
}
function H2(a) {
  var l;
  let r = Number.MAX_SAFE_INTEGER,
    s = null,
    o = -1;
  for (let h = 0; h < a.length; ++h) {
    var f;
    const p = a[h],
      v = B2(p);
    v !== p.length &&
      ((s = (f = s) !== null && f !== void 0 ? f : h),
      (o = h),
      h !== 0 && v < r && (r = v));
  }
  return a
    .map((h, p) => (p === 0 ? h : h.slice(r)))
    .slice((l = s) !== null && l !== void 0 ? l : 0, o + 1);
}
function B2(a) {
  let l = 0;
  for (; l < a.length && Go(a.charCodeAt(l));) ++l;
  return l;
}
function k2(a, l) {
  const r = a.replace(/"""/g, '\\"""'),
    s = r.split(/\r\n|[\n\r]/g),
    o = s.length === 1,
    f =
      s.length > 1 &&
      s.slice(1).every((O) => O.length === 0 || Go(O.charCodeAt(0))),
    h = r.endsWith('\\"""'),
    p = a.endsWith('"') && !h,
    v = a.endsWith("\\"),
    y = p || v,
    g = !o || a.length > 70 || y || f || h;
  let b = "";
  const C = o && Go(a.charCodeAt(0));
  return (
    ((g && !C) || f) &&
      (b += `
`),
    (b += r),
    (g || y) &&
      (b += `
`),
    '"""' + b + '"""'
  );
}
class q2 {
  constructor(l) {
    const r = new $y(Y.SOF, 0, 0, 0, 0);
    ((this.source = l),
      (this.lastToken = r),
      (this.token = r),
      (this.line = 1),
      (this.lineStart = 0));
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  advance() {
    return ((this.lastToken = this.token), (this.token = this.lookahead()));
  }
  lookahead() {
    let l = this.token;
    if (l.kind !== Y.EOF)
      do
        if (l.next) l = l.next;
        else {
          const r = V2(this, l.end);
          ((l.next = r), (r.prev = l), (l = r));
        }
      while (l.kind === Y.COMMENT);
    return l;
  }
}
function Y2(a) {
  return (
    a === Y.BANG ||
    a === Y.DOLLAR ||
    a === Y.AMP ||
    a === Y.PAREN_L ||
    a === Y.PAREN_R ||
    a === Y.SPREAD ||
    a === Y.COLON ||
    a === Y.EQUALS ||
    a === Y.AT ||
    a === Y.BRACKET_L ||
    a === Y.BRACKET_R ||
    a === Y.BRACE_L ||
    a === Y.PIPE ||
    a === Y.BRACE_R
  );
}
function ii(a) {
  return (a >= 0 && a <= 55295) || (a >= 57344 && a <= 1114111);
}
function ls(a, l) {
  return ep(a.charCodeAt(l)) && tp(a.charCodeAt(l + 1));
}
function ep(a) {
  return a >= 55296 && a <= 56319;
}
function tp(a) {
  return a >= 56320 && a <= 57343;
}
function ol(a, l) {
  const r = a.source.body.codePointAt(l);
  if (r === void 0) return Y.EOF;
  if (r >= 32 && r <= 126) {
    const s = String.fromCodePoint(r);
    return s === '"' ? `'"'` : `"${s}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function vt(a, l, r, s, o) {
  const f = a.line,
    h = 1 + r - a.lineStart;
  return new $y(l, r, s, f, h, o);
}
function V2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l;
  for (; o < s;) {
    const f = r.charCodeAt(o);
    switch (f) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++o;
        continue;
      case 10:
        (++o, ++a.line, (a.lineStart = o));
        continue;
      case 13:
        (r.charCodeAt(o + 1) === 10 ? (o += 2) : ++o,
          ++a.line,
          (a.lineStart = o));
        continue;
      case 35:
        return G2(a, o);
      case 33:
        return vt(a, Y.BANG, o, o + 1);
      case 36:
        return vt(a, Y.DOLLAR, o, o + 1);
      case 38:
        return vt(a, Y.AMP, o, o + 1);
      case 40:
        return vt(a, Y.PAREN_L, o, o + 1);
      case 41:
        return vt(a, Y.PAREN_R, o, o + 1);
      case 46:
        if (r.charCodeAt(o + 1) === 46 && r.charCodeAt(o + 2) === 46)
          return vt(a, Y.SPREAD, o, o + 3);
        break;
      case 58:
        return vt(a, Y.COLON, o, o + 1);
      case 61:
        return vt(a, Y.EQUALS, o, o + 1);
      case 64:
        return vt(a, Y.AT, o, o + 1);
      case 91:
        return vt(a, Y.BRACKET_L, o, o + 1);
      case 93:
        return vt(a, Y.BRACKET_R, o, o + 1);
      case 123:
        return vt(a, Y.BRACE_L, o, o + 1);
      case 124:
        return vt(a, Y.PIPE, o, o + 1);
      case 125:
        return vt(a, Y.BRACE_R, o, o + 1);
      case 34:
        return r.charCodeAt(o + 1) === 34 && r.charCodeAt(o + 2) === 34
          ? J2(a, o)
          : X2(a, o);
    }
    if (pr(f) || f === 45) return Q2(a, o, f);
    if (Py(f)) return $2(a, o);
    throw Rt(
      a.source,
      o,
      f === 39
        ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
        : ii(f) || ls(r, o)
          ? `Unexpected character: ${ol(a, o)}.`
          : `Invalid character: ${ol(a, o)}.`
    );
  }
  return vt(a, Y.EOF, s, s);
}
function G2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1;
  for (; o < s;) {
    const f = r.charCodeAt(o);
    if (f === 10 || f === 13) break;
    if (ii(f)) ++o;
    else if (ls(r, o)) o += 2;
    else break;
  }
  return vt(a, Y.COMMENT, l, o, r.slice(l + 1, o));
}
function Q2(a, l, r) {
  const s = a.source.body;
  let o = l,
    f = r,
    h = !1;
  if ((f === 45 && (f = s.charCodeAt(++o)), f === 48)) {
    if (((f = s.charCodeAt(++o)), pr(f)))
      throw Rt(
        a.source,
        o,
        `Invalid number, unexpected digit after 0: ${ol(a, o)}.`
      );
  } else ((o = wo(a, o, f)), (f = s.charCodeAt(o)));
  if (
    (f === 46 &&
      ((h = !0),
      (f = s.charCodeAt(++o)),
      (o = wo(a, o, f)),
      (f = s.charCodeAt(o))),
    (f === 69 || f === 101) &&
      ((h = !0),
      (f = s.charCodeAt(++o)),
      (f === 43 || f === 45) && (f = s.charCodeAt(++o)),
      (o = wo(a, o, f)),
      (f = s.charCodeAt(o))),
    f === 46 || Py(f))
  )
    throw Rt(
      a.source,
      o,
      `Invalid number, expected digit but got: ${ol(a, o)}.`
    );
  return vt(a, h ? Y.FLOAT : Y.INT, l, o, s.slice(l, o));
}
function wo(a, l, r) {
  if (!pr(r))
    throw Rt(
      a.source,
      l,
      `Invalid number, expected digit but got: ${ol(a, l)}.`
    );
  const s = a.source.body;
  let o = l + 1;
  for (; pr(s.charCodeAt(o));) ++o;
  return o;
}
function X2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1,
    f = o,
    h = "";
  for (; o < s;) {
    const p = r.charCodeAt(o);
    if (p === 34) return ((h += r.slice(f, o)), vt(a, Y.STRING, l, o + 1, h));
    if (p === 92) {
      h += r.slice(f, o);
      const v =
        r.charCodeAt(o + 1) === 117
          ? r.charCodeAt(o + 2) === 123
            ? Z2(a, o)
            : F2(a, o)
          : K2(a, o);
      ((h += v.value), (o += v.size), (f = o));
      continue;
    }
    if (p === 10 || p === 13) break;
    if (ii(p)) ++o;
    else if (ls(r, o)) o += 2;
    else throw Rt(a.source, o, `Invalid character within String: ${ol(a, o)}.`);
  }
  throw Rt(a.source, o, "Unterminated string.");
}
function Z2(a, l) {
  const r = a.source.body;
  let s = 0,
    o = 3;
  for (; o < 12;) {
    const f = r.charCodeAt(l + o++);
    if (f === 125) {
      if (o < 5 || !ii(s)) break;
      return { value: String.fromCodePoint(s), size: o };
    }
    if (((s = (s << 4) | rr(f)), s < 0)) break;
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + o)}".`
  );
}
function F2(a, l) {
  const r = a.source.body,
    s = $0(r, l + 2);
  if (ii(s)) return { value: String.fromCodePoint(s), size: 6 };
  if (ep(s) && r.charCodeAt(l + 6) === 92 && r.charCodeAt(l + 7) === 117) {
    const o = $0(r, l + 8);
    if (tp(o)) return { value: String.fromCodePoint(s, o), size: 12 };
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + 6)}".`
  );
}
function $0(a, l) {
  return (
    (rr(a.charCodeAt(l)) << 12) |
    (rr(a.charCodeAt(l + 1)) << 8) |
    (rr(a.charCodeAt(l + 2)) << 4) |
    rr(a.charCodeAt(l + 3))
  );
}
function rr(a) {
  return a >= 48 && a <= 57
    ? a - 48
    : a >= 65 && a <= 70
      ? a - 55
      : a >= 97 && a <= 102
        ? a - 87
        : -1;
}
function K2(a, l) {
  const r = a.source.body;
  switch (r.charCodeAt(l + 1)) {
    case 34:
      return { value: '"', size: 2 };
    case 92:
      return { value: "\\", size: 2 };
    case 47:
      return { value: "/", size: 2 };
    case 98:
      return { value: "\b", size: 2 };
    case 102:
      return { value: "\f", size: 2 };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return { value: "\r", size: 2 };
    case 116:
      return { value: "	", size: 2 };
  }
  throw Rt(
    a.source,
    l,
    `Invalid character escape sequence: "${r.slice(l, l + 2)}".`
  );
}
function J2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = a.lineStart,
    f = l + 3,
    h = f,
    p = "";
  const v = [];
  for (; f < s;) {
    const y = r.charCodeAt(f);
    if (y === 34 && r.charCodeAt(f + 1) === 34 && r.charCodeAt(f + 2) === 34) {
      ((p += r.slice(h, f)), v.push(p));
      const g = vt(
        a,
        Y.BLOCK_STRING,
        l,
        f + 3,
        H2(v).join(`
`)
      );
      return ((a.line += v.length - 1), (a.lineStart = o), g);
    }
    if (
      y === 92 &&
      r.charCodeAt(f + 1) === 34 &&
      r.charCodeAt(f + 2) === 34 &&
      r.charCodeAt(f + 3) === 34
    ) {
      ((p += r.slice(h, f)), (h = f + 1), (f += 4));
      continue;
    }
    if (y === 10 || y === 13) {
      ((p += r.slice(h, f)),
        v.push(p),
        y === 13 && r.charCodeAt(f + 1) === 10 ? (f += 2) : ++f,
        (p = ""),
        (h = f),
        (o = f));
      continue;
    }
    if (ii(y)) ++f;
    else if (ls(r, f)) f += 2;
    else throw Rt(a.source, f, `Invalid character within String: ${ol(a, f)}.`);
  }
  throw Rt(a.source, f, "Unterminated string.");
}
function $2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1;
  for (; o < s;) {
    const f = r.charCodeAt(o);
    if (j2(f)) ++o;
    else break;
  }
  return vt(a, Y.NAME, l, o, r.slice(l, o));
}
var Qo;
(function (a) {
  ((a.QUERY = "QUERY"),
    (a.MUTATION = "MUTATION"),
    (a.SUBSCRIPTION = "SUBSCRIPTION"),
    (a.FIELD = "FIELD"),
    (a.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION"),
    (a.FRAGMENT_SPREAD = "FRAGMENT_SPREAD"),
    (a.INLINE_FRAGMENT = "INLINE_FRAGMENT"),
    (a.VARIABLE_DEFINITION = "VARIABLE_DEFINITION"),
    (a.SCHEMA = "SCHEMA"),
    (a.SCALAR = "SCALAR"),
    (a.OBJECT = "OBJECT"),
    (a.FIELD_DEFINITION = "FIELD_DEFINITION"),
    (a.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION"),
    (a.INTERFACE = "INTERFACE"),
    (a.UNION = "UNION"),
    (a.ENUM = "ENUM"),
    (a.ENUM_VALUE = "ENUM_VALUE"),
    (a.INPUT_OBJECT = "INPUT_OBJECT"),
    (a.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION"));
})(Qo || (Qo = {}));
function I2(a, l) {
  const r = new W2(a, l),
    s = r.parseDocument();
  return (
    Object.defineProperty(s, "tokenCount", {
      enumerable: !1,
      value: r.tokenCount
    }),
    s
  );
}
class W2 {
  constructor(l, r = {}) {
    const s = D2(l) ? l : new Ky(l);
    ((this._lexer = new q2(s)), (this._options = r), (this._tokenCounter = 0));
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  parseName() {
    const l = this.expectToken(Y.NAME);
    return this.node(l, { kind: ge.NAME, value: l.value });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ge.DOCUMENT,
      definitions: this.many(Y.SOF, this.parseDefinition, Y.EOF)
    });
  }
  parseDefinition() {
    if (this.peek(Y.BRACE_L)) return this.parseOperationDefinition();
    const l = this.peekDescription(),
      r = l ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === Y.NAME) {
      switch (r.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (l)
        throw Rt(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (r.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(r);
  }
  parseOperationDefinition() {
    const l = this._lexer.token;
    if (this.peek(Y.BRACE_L))
      return this.node(l, {
        kind: ge.OPERATION_DEFINITION,
        operation: Pl.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let s;
    return (
      this.peek(Y.NAME) && (s = this.parseName()),
      this.node(l, {
        kind: ge.OPERATION_DEFINITION,
        operation: r,
        name: s,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      })
    );
  }
  parseOperationType() {
    const l = this.expectToken(Y.NAME);
    switch (l.value) {
      case "query":
        return Pl.QUERY;
      case "mutation":
        return Pl.MUTATION;
      case "subscription":
        return Pl.SUBSCRIPTION;
    }
    throw this.unexpected(l);
  }
  parseVariableDefinitions() {
    return this.optionalMany(
      Y.PAREN_L,
      this.parseVariableDefinition,
      Y.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ge.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(Y.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(Y.EQUALS)
        ? this.parseConstValueLiteral()
        : void 0,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const l = this._lexer.token;
    return (
      this.expectToken(Y.DOLLAR),
      this.node(l, { kind: ge.VARIABLE, name: this.parseName() })
    );
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ge.SELECTION_SET,
      selections: this.many(Y.BRACE_L, this.parseSelection, Y.BRACE_R)
    });
  }
  parseSelection() {
    return this.peek(Y.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const l = this._lexer.token,
      r = this.parseName();
    let s, o;
    return (
      this.expectOptionalToken(Y.COLON)
        ? ((s = r), (o = this.parseName()))
        : (o = r),
      this.node(l, {
        kind: ge.FIELD,
        alias: s,
        name: o,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(Y.BRACE_L) ? this.parseSelectionSet() : void 0
      })
    );
  }
  parseArguments(l) {
    const r = l ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(Y.PAREN_L, r, Y.PAREN_R);
  }
  parseArgument(l = !1) {
    const r = this._lexer.token,
      s = this.parseName();
    return (
      this.expectToken(Y.COLON),
      this.node(r, {
        kind: ge.ARGUMENT,
        name: s,
        value: this.parseValueLiteral(l)
      })
    );
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  parseFragment() {
    const l = this._lexer.token;
    this.expectToken(Y.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(Y.NAME)
      ? this.node(l, {
          kind: ge.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(!1)
        })
      : this.node(l, {
          kind: ge.INLINE_FRAGMENT,
          typeCondition: r ? this.parseNamedType() : void 0,
          directives: this.parseDirectives(!1),
          selectionSet: this.parseSelectionSet()
        });
  }
  parseFragmentDefinition() {
    const l = this._lexer.token;
    return (
      this.expectKeyword("fragment"),
      this._options.allowLegacyFragmentVariables === !0
        ? this.node(l, {
            kind: ge.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet()
          })
        : this.node(l, {
            kind: ge.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet()
          })
    );
  }
  parseFragmentName() {
    if (this._lexer.token.value === "on") throw this.unexpected();
    return this.parseName();
  }
  parseValueLiteral(l) {
    const r = this._lexer.token;
    switch (r.kind) {
      case Y.BRACKET_L:
        return this.parseList(l);
      case Y.BRACE_L:
        return this.parseObject(l);
      case Y.INT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: ge.INT, value: r.value })
        );
      case Y.FLOAT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: ge.FLOAT, value: r.value })
        );
      case Y.STRING:
      case Y.BLOCK_STRING:
        return this.parseStringLiteral();
      case Y.NAME:
        switch ((this.advanceLexer(), r.value)) {
          case "true":
            return this.node(r, { kind: ge.BOOLEAN, value: !0 });
          case "false":
            return this.node(r, { kind: ge.BOOLEAN, value: !1 });
          case "null":
            return this.node(r, { kind: ge.NULL });
          default:
            return this.node(r, { kind: ge.ENUM, value: r.value });
        }
      case Y.DOLLAR:
        if (l)
          if ((this.expectToken(Y.DOLLAR), this._lexer.token.kind === Y.NAME)) {
            const s = this._lexer.token.value;
            throw Rt(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${s}" in constant value.`
            );
          } else throw this.unexpected(r);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const l = this._lexer.token;
    return (
      this.advanceLexer(),
      this.node(l, {
        kind: ge.STRING,
        value: l.value,
        block: l.kind === Y.BLOCK_STRING
      })
    );
  }
  parseList(l) {
    const r = () => this.parseValueLiteral(l);
    return this.node(this._lexer.token, {
      kind: ge.LIST,
      values: this.any(Y.BRACKET_L, r, Y.BRACKET_R)
    });
  }
  parseObject(l) {
    const r = () => this.parseObjectField(l);
    return this.node(this._lexer.token, {
      kind: ge.OBJECT,
      fields: this.any(Y.BRACE_L, r, Y.BRACE_R)
    });
  }
  parseObjectField(l) {
    const r = this._lexer.token,
      s = this.parseName();
    return (
      this.expectToken(Y.COLON),
      this.node(r, {
        kind: ge.OBJECT_FIELD,
        name: s,
        value: this.parseValueLiteral(l)
      })
    );
  }
  parseDirectives(l) {
    const r = [];
    for (; this.peek(Y.AT);) r.push(this.parseDirective(l));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(l) {
    const r = this._lexer.token;
    return (
      this.expectToken(Y.AT),
      this.node(r, {
        kind: ge.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(l)
      })
    );
  }
  parseTypeReference() {
    const l = this._lexer.token;
    let r;
    if (this.expectOptionalToken(Y.BRACKET_L)) {
      const s = this.parseTypeReference();
      (this.expectToken(Y.BRACKET_R),
        (r = this.node(l, { kind: ge.LIST_TYPE, type: s })));
    } else r = this.parseNamedType();
    return this.expectOptionalToken(Y.BANG)
      ? this.node(l, { kind: ge.NON_NULL_TYPE, type: r })
      : r;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ge.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(Y.STRING) || this.peek(Y.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("schema");
    const s = this.parseConstDirectives(),
      o = this.many(Y.BRACE_L, this.parseOperationTypeDefinition, Y.BRACE_R);
    return this.node(l, {
      kind: ge.SCHEMA_DEFINITION,
      description: r,
      directives: s,
      operationTypes: o
    });
  }
  parseOperationTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseOperationType();
    this.expectToken(Y.COLON);
    const s = this.parseNamedType();
    return this.node(l, {
      kind: ge.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: s
    });
  }
  parseScalarTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("scalar");
    const s = this.parseName(),
      o = this.parseConstDirectives();
    return this.node(l, {
      kind: ge.SCALAR_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o
    });
  }
  parseObjectTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("type");
    const s = this.parseName(),
      o = this.parseImplementsInterfaces(),
      f = this.parseConstDirectives(),
      h = this.parseFieldsDefinition();
    return this.node(l, {
      kind: ge.OBJECT_TYPE_DEFINITION,
      description: r,
      name: s,
      interfaces: o,
      directives: f,
      fields: h
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements")
      ? this.delimitedMany(Y.AMP, this.parseNamedType)
      : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(Y.BRACE_L, this.parseFieldDefinition, Y.BRACE_R);
  }
  parseFieldDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseName(),
      o = this.parseArgumentDefs();
    this.expectToken(Y.COLON);
    const f = this.parseTypeReference(),
      h = this.parseConstDirectives();
    return this.node(l, {
      kind: ge.FIELD_DEFINITION,
      description: r,
      name: s,
      arguments: o,
      type: f,
      directives: h
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(Y.PAREN_L, this.parseInputValueDef, Y.PAREN_R);
  }
  parseInputValueDef() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseName();
    this.expectToken(Y.COLON);
    const o = this.parseTypeReference();
    let f;
    this.expectOptionalToken(Y.EQUALS) && (f = this.parseConstValueLiteral());
    const h = this.parseConstDirectives();
    return this.node(l, {
      kind: ge.INPUT_VALUE_DEFINITION,
      description: r,
      name: s,
      type: o,
      defaultValue: f,
      directives: h
    });
  }
  parseInterfaceTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("interface");
    const s = this.parseName(),
      o = this.parseImplementsInterfaces(),
      f = this.parseConstDirectives(),
      h = this.parseFieldsDefinition();
    return this.node(l, {
      kind: ge.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: s,
      interfaces: o,
      directives: f,
      fields: h
    });
  }
  parseUnionTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("union");
    const s = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseUnionMemberTypes();
    return this.node(l, {
      kind: ge.UNION_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      types: f
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(Y.EQUALS)
      ? this.delimitedMany(Y.PIPE, this.parseNamedType)
      : [];
  }
  parseEnumTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("enum");
    const s = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseEnumValuesDefinition();
    return this.node(l, {
      kind: ge.ENUM_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      values: f
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      Y.BRACE_L,
      this.parseEnumValueDefinition,
      Y.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseEnumValueName(),
      o = this.parseConstDirectives();
    return this.node(l, {
      kind: ge.ENUM_VALUE_DEFINITION,
      description: r,
      name: s,
      directives: o
    });
  }
  parseEnumValueName() {
    if (
      this._lexer.token.value === "true" ||
      this._lexer.token.value === "false" ||
      this._lexer.token.value === "null"
    )
      throw Rt(
        this._lexer.source,
        this._lexer.token.start,
        `${Gu(this._lexer.token)} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("input");
    const s = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseInputFieldsDefinition();
    return this.node(l, {
      kind: ge.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      fields: f
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(Y.BRACE_L, this.parseInputValueDef, Y.BRACE_R);
  }
  parseTypeSystemExtension() {
    const l = this._lexer.lookahead();
    if (l.kind === Y.NAME)
      switch (l.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(l);
  }
  parseSchemaExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("schema"));
    const r = this.parseConstDirectives(),
      s = this.optionalMany(
        Y.BRACE_L,
        this.parseOperationTypeDefinition,
        Y.BRACE_R
      );
    if (r.length === 0 && s.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ge.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: s
    });
  }
  parseScalarTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("scalar"));
    const r = this.parseName(),
      s = this.parseConstDirectives();
    if (s.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ge.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: s
    });
  }
  parseObjectTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("type"));
    const r = this.parseName(),
      s = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      f = this.parseFieldsDefinition();
    if (s.length === 0 && o.length === 0 && f.length === 0)
      throw this.unexpected();
    return this.node(l, {
      kind: ge.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: s,
      directives: o,
      fields: f
    });
  }
  parseInterfaceTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("interface"));
    const r = this.parseName(),
      s = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      f = this.parseFieldsDefinition();
    if (s.length === 0 && o.length === 0 && f.length === 0)
      throw this.unexpected();
    return this.node(l, {
      kind: ge.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: s,
      directives: o,
      fields: f
    });
  }
  parseUnionTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("union"));
    const r = this.parseName(),
      s = this.parseConstDirectives(),
      o = this.parseUnionMemberTypes();
    if (s.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ge.UNION_TYPE_EXTENSION,
      name: r,
      directives: s,
      types: o
    });
  }
  parseEnumTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("enum"));
    const r = this.parseName(),
      s = this.parseConstDirectives(),
      o = this.parseEnumValuesDefinition();
    if (s.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ge.ENUM_TYPE_EXTENSION,
      name: r,
      directives: s,
      values: o
    });
  }
  parseInputObjectTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("input"));
    const r = this.parseName(),
      s = this.parseConstDirectives(),
      o = this.parseInputFieldsDefinition();
    if (s.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ge.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: s,
      fields: o
    });
  }
  parseDirectiveDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    (this.expectKeyword("directive"), this.expectToken(Y.AT));
    const s = this.parseName(),
      o = this.parseArgumentDefs(),
      f = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const h = this.parseDirectiveLocations();
    return this.node(l, {
      kind: ge.DIRECTIVE_DEFINITION,
      description: r,
      name: s,
      arguments: o,
      repeatable: f,
      locations: h
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(Y.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const l = this._lexer.token,
      r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Qo, r.value)) return r;
    throw this.unexpected(l);
  }
  node(l, r) {
    return (
      this._options.noLocation !== !0 &&
        (r.loc = new U2(l, this._lexer.lastToken, this._lexer.source)),
      r
    );
  }
  peek(l) {
    return this._lexer.token.kind === l;
  }
  expectToken(l) {
    const r = this._lexer.token;
    if (r.kind === l) return (this.advanceLexer(), r);
    throw Rt(this._lexer.source, r.start, `Expected ${np(l)}, found ${Gu(r)}.`);
  }
  expectOptionalToken(l) {
    return this._lexer.token.kind === l ? (this.advanceLexer(), !0) : !1;
  }
  expectKeyword(l) {
    const r = this._lexer.token;
    if (r.kind === Y.NAME && r.value === l) this.advanceLexer();
    else
      throw Rt(this._lexer.source, r.start, `Expected "${l}", found ${Gu(r)}.`);
  }
  expectOptionalKeyword(l) {
    const r = this._lexer.token;
    return r.kind === Y.NAME && r.value === l ? (this.advanceLexer(), !0) : !1;
  }
  unexpected(l) {
    const r = l ?? this._lexer.token;
    return Rt(this._lexer.source, r.start, `Unexpected ${Gu(r)}.`);
  }
  any(l, r, s) {
    this.expectToken(l);
    const o = [];
    for (; !this.expectOptionalToken(s);) o.push(r.call(this));
    return o;
  }
  optionalMany(l, r, s) {
    if (this.expectOptionalToken(l)) {
      const o = [];
      do o.push(r.call(this));
      while (!this.expectOptionalToken(s));
      return o;
    }
    return [];
  }
  many(l, r, s) {
    this.expectToken(l);
    const o = [];
    do o.push(r.call(this));
    while (!this.expectOptionalToken(s));
    return o;
  }
  delimitedMany(l, r) {
    this.expectOptionalToken(l);
    const s = [];
    do s.push(r.call(this));
    while (this.expectOptionalToken(l));
    return s;
  }
  advanceLexer() {
    const { maxTokens: l } = this._options,
      r = this._lexer.advance();
    if (
      r.kind !== Y.EOF &&
      (++this._tokenCounter, l !== void 0 && this._tokenCounter > l)
    )
      throw Rt(
        this._lexer.source,
        r.start,
        `Document contains more that ${l} tokens. Parsing aborted.`
      );
  }
}
function Gu(a) {
  const l = a.value;
  return np(a.kind) + (l != null ? ` "${l}"` : "");
}
function np(a) {
  return Y2(a) ? `"${a}"` : a;
}
function P2(a) {
  return `"${a.replace(eE, tE)}"`;
}
const eE = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function tE(a) {
  return nE[a.charCodeAt(0)];
}
const nE = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000B",
    "\\f",
    "\\r",
    "\\u000E",
    "\\u000F",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001A",
    "\\u001B",
    "\\u001C",
    "\\u001D",
    "\\u001E",
    "\\u001F",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\u007F",
    "\\u0080",
    "\\u0081",
    "\\u0082",
    "\\u0083",
    "\\u0084",
    "\\u0085",
    "\\u0086",
    "\\u0087",
    "\\u0088",
    "\\u0089",
    "\\u008A",
    "\\u008B",
    "\\u008C",
    "\\u008D",
    "\\u008E",
    "\\u008F",
    "\\u0090",
    "\\u0091",
    "\\u0092",
    "\\u0093",
    "\\u0094",
    "\\u0095",
    "\\u0096",
    "\\u0097",
    "\\u0098",
    "\\u0099",
    "\\u009A",
    "\\u009B",
    "\\u009C",
    "\\u009D",
    "\\u009E",
    "\\u009F"
  ],
  aE = Object.freeze({});
function lE(a, l, r = Iy) {
  const s = new Map();
  for (const I of Object.values(ge)) s.set(I, iE(l, I));
  let o,
    f = Array.isArray(a),
    h = [a],
    p = -1,
    v = [],
    y = a,
    g,
    b;
  const C = [],
    O = [];
  do {
    p++;
    const I = p === h.length,
      te = I && v.length !== 0;
    if (I) {
      if (
        ((g = O.length === 0 ? void 0 : C[C.length - 1]),
        (y = b),
        (b = O.pop()),
        te)
      )
        if (f) {
          y = y.slice();
          let oe = 0;
          for (const [se, Te] of v) {
            const J = se - oe;
            Te === null ? (y.splice(J, 1), oe++) : (y[J] = Te);
          }
        } else {
          y = { ...y };
          for (const [oe, se] of v) y[oe] = se;
        }
      ((p = o.index),
        (h = o.keys),
        (v = o.edits),
        (f = o.inArray),
        (o = o.prev));
    } else if (b) {
      if (((g = f ? p : h[p]), (y = b[g]), y == null)) continue;
      C.push(g);
    }
    let ne;
    if (!Array.isArray(y)) {
      var U, V;
      J0(y) || Fu(!1, `Invalid AST Node: ${mf(y)}.`);
      const oe = I
        ? (U = s.get(y.kind)) === null || U === void 0
          ? void 0
          : U.leave
        : (V = s.get(y.kind)) === null || V === void 0
          ? void 0
          : V.enter;
      if (((ne = oe?.call(l, y, g, b, C, O)), ne === aE)) break;
      if (ne === !1) {
        if (!I) {
          C.pop();
          continue;
        }
      } else if (ne !== void 0 && (v.push([g, ne]), !I))
        if (J0(ne)) y = ne;
        else {
          C.pop();
          continue;
        }
    }
    if ((ne === void 0 && te && v.push([g, y]), I)) C.pop();
    else {
      var Z;
      ((o = { inArray: f, index: p, keys: h, edits: v, prev: o }),
        (f = Array.isArray(y)),
        (h = f ? y : (Z = r[y.kind]) !== null && Z !== void 0 ? Z : []),
        (p = -1),
        (v = []),
        b && O.push(b),
        (b = y));
    }
  } while (o !== void 0);
  return v.length !== 0 ? v[v.length - 1][1] : a;
}
function iE(a, l) {
  const r = a[l];
  return typeof r == "object"
    ? r
    : typeof r == "function"
      ? { enter: r, leave: void 0 }
      : { enter: a.enter, leave: a.leave };
}
function pf(a) {
  return lE(a, uE);
}
const rE = 80,
  uE = {
    Name: { leave: (a) => a.value },
    Variable: { leave: (a) => "$" + a.name },
    Document: {
      leave: (a) =>
        ie(
          a.definitions,
          `

`
        )
    },
    OperationDefinition: {
      leave(a) {
        const l = Le("(", ie(a.variableDefinitions, ", "), ")"),
          r = ie([a.operation, ie([a.name, l]), ie(a.directives, " ")], " ");
        return (r === "query" ? "" : r + " ") + a.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable: a, type: l, defaultValue: r, directives: s }) =>
        a + ": " + l + Le(" = ", r) + Le(" ", ie(s, " "))
    },
    SelectionSet: { leave: ({ selections: a }) => En(a) },
    Field: {
      leave({
        alias: a,
        name: l,
        arguments: r,
        directives: s,
        selectionSet: o
      }) {
        const f = Le("", a, ": ") + l;
        let h = f + Le("(", ie(r, ", "), ")");
        return (
          h.length > rE &&
            (h =
              f +
              Le(
                `(
`,
                Ku(
                  ie(
                    r,
                    `
`
                  )
                ),
                `
)`
              )),
          ie([h, ie(s, " "), o], " ")
        );
      }
    },
    Argument: { leave: ({ name: a, value: l }) => a + ": " + l },
    FragmentSpread: {
      leave: ({ name: a, directives: l }) => "..." + a + Le(" ", ie(l, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition: a, directives: l, selectionSet: r }) =>
        ie(["...", Le("on ", a), ie(l, " "), r], " ")
    },
    FragmentDefinition: {
      leave: ({
        name: a,
        typeCondition: l,
        variableDefinitions: r,
        directives: s,
        selectionSet: o
      }) =>
        `fragment ${a}${Le("(", ie(r, ", "), ")")} on ${l} ${Le("", ie(s, " "), " ")}` +
        o
    },
    IntValue: { leave: ({ value: a }) => a },
    FloatValue: { leave: ({ value: a }) => a },
    StringValue: { leave: ({ value: a, block: l }) => (l ? k2(a) : P2(a)) },
    BooleanValue: { leave: ({ value: a }) => (a ? "true" : "false") },
    NullValue: { leave: () => "null" },
    EnumValue: { leave: ({ value: a }) => a },
    ListValue: { leave: ({ values: a }) => "[" + ie(a, ", ") + "]" },
    ObjectValue: { leave: ({ fields: a }) => "{" + ie(a, ", ") + "}" },
    ObjectField: { leave: ({ name: a, value: l }) => a + ": " + l },
    Directive: {
      leave: ({ name: a, arguments: l }) => "@" + a + Le("(", ie(l, ", "), ")")
    },
    NamedType: { leave: ({ name: a }) => a },
    ListType: { leave: ({ type: a }) => "[" + a + "]" },
    NonNullType: { leave: ({ type: a }) => a + "!" },
    SchemaDefinition: {
      leave: ({ description: a, directives: l, operationTypes: r }) =>
        Le(
          "",
          a,
          `
`
        ) + ie(["schema", ie(l, " "), En(r)], " ")
    },
    OperationTypeDefinition: {
      leave: ({ operation: a, type: l }) => a + ": " + l
    },
    ScalarTypeDefinition: {
      leave: ({ description: a, name: l, directives: r }) =>
        Le(
          "",
          a,
          `
`
        ) + ie(["scalar", l, ie(r, " ")], " ")
    },
    ObjectTypeDefinition: {
      leave: ({
        description: a,
        name: l,
        interfaces: r,
        directives: s,
        fields: o
      }) =>
        Le(
          "",
          a,
          `
`
        ) +
        ie(["type", l, Le("implements ", ie(r, " & ")), ie(s, " "), En(o)], " ")
    },
    FieldDefinition: {
      leave: ({
        description: a,
        name: l,
        arguments: r,
        type: s,
        directives: o
      }) =>
        Le(
          "",
          a,
          `
`
        ) +
        l +
        (I0(r)
          ? Le(
              `(
`,
              Ku(
                ie(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : Le("(", ie(r, ", "), ")")) +
        ": " +
        s +
        Le(" ", ie(o, " "))
    },
    InputValueDefinition: {
      leave: ({
        description: a,
        name: l,
        type: r,
        defaultValue: s,
        directives: o
      }) =>
        Le(
          "",
          a,
          `
`
        ) + ie([l + ": " + r, Le("= ", s), ie(o, " ")], " ")
    },
    InterfaceTypeDefinition: {
      leave: ({
        description: a,
        name: l,
        interfaces: r,
        directives: s,
        fields: o
      }) =>
        Le(
          "",
          a,
          `
`
        ) +
        ie(
          ["interface", l, Le("implements ", ie(r, " & ")), ie(s, " "), En(o)],
          " "
        )
    },
    UnionTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, types: s }) =>
        Le(
          "",
          a,
          `
`
        ) + ie(["union", l, ie(r, " "), Le("= ", ie(s, " | "))], " ")
    },
    EnumTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, values: s }) =>
        Le(
          "",
          a,
          `
`
        ) + ie(["enum", l, ie(r, " "), En(s)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description: a, name: l, directives: r }) =>
        Le(
          "",
          a,
          `
`
        ) + ie([l, ie(r, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, fields: s }) =>
        Le(
          "",
          a,
          `
`
        ) + ie(["input", l, ie(r, " "), En(s)], " ")
    },
    DirectiveDefinition: {
      leave: ({
        description: a,
        name: l,
        arguments: r,
        repeatable: s,
        locations: o
      }) =>
        Le(
          "",
          a,
          `
`
        ) +
        "directive @" +
        l +
        (I0(r)
          ? Le(
              `(
`,
              Ku(
                ie(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : Le("(", ie(r, ", "), ")")) +
        (s ? " repeatable" : "") +
        " on " +
        ie(o, " | ")
    },
    SchemaExtension: {
      leave: ({ directives: a, operationTypes: l }) =>
        ie(["extend schema", ie(a, " "), En(l)], " ")
    },
    ScalarTypeExtension: {
      leave: ({ name: a, directives: l }) =>
        ie(["extend scalar", a, ie(l, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: s }) =>
        ie(
          [
            "extend type",
            a,
            Le("implements ", ie(l, " & ")),
            ie(r, " "),
            En(s)
          ],
          " "
        )
    },
    InterfaceTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: s }) =>
        ie(
          [
            "extend interface",
            a,
            Le("implements ", ie(l, " & ")),
            ie(r, " "),
            En(s)
          ],
          " "
        )
    },
    UnionTypeExtension: {
      leave: ({ name: a, directives: l, types: r }) =>
        ie(["extend union", a, ie(l, " "), Le("= ", ie(r, " | "))], " ")
    },
    EnumTypeExtension: {
      leave: ({ name: a, directives: l, values: r }) =>
        ie(["extend enum", a, ie(l, " "), En(r)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name: a, directives: l, fields: r }) =>
        ie(["extend input", a, ie(l, " "), En(r)], " ")
    }
  };
function ie(a, l = "") {
  var r;
  return (r = a?.filter((s) => s).join(l)) !== null && r !== void 0 ? r : "";
}
function En(a) {
  return Le(
    `{
`,
    Ku(
      ie(
        a,
        `
`
      )
    ),
    `
}`
  );
}
function Le(a, l, r = "") {
  return l != null && l !== "" ? a + l + r : "";
}
function Ku(a) {
  return Le(
    "  ",
    a.replace(
      /\n/g,
      `
  `
    )
  );
}
function I0(a) {
  var l;
  return (l = a?.some((r) =>
    r.includes(`
`)
  )) !== null && l !== void 0
    ? l
    : !1;
}
class sE {
  constructor(l) {
    this.defaultRetryPolicy = l;
  }
  applyRetry(l, r) {
    return this.retry(l, r || this.defaultRetryPolicy);
  }
  async retry(l, r) {
    const s = Date.now();
    let o = 0,
      f = await l(),
      h = { attempt: o, totalElapsedMs: Date.now() - s, lastResult: f };
    for (; await r.shouldRetry(f, h);) {
      const p = await r.calculateDelay(f, h);
      (await this.delay(p),
        r.prepareRetry && (await r.prepareRetry(f, h)),
        o++,
        (f = await l()),
        (h = { attempt: o, totalElapsedMs: Date.now() - s, lastResult: f }));
    }
    return f;
  }
  delay(l) {
    return new Promise((r) => {
      setTimeout(r, l);
    });
  }
}
class cE {}
function oE(a) {
  return { version: "1.0", service: new sE(a), type: "retry" };
}
const { stringify: fE, parse: dE } = JSON;
function vf(a) {
  const l = fE(a);
  return l ? dE(l) : void 0;
}
class Sr {
  constructor(l) {
    ((this.baseCache = l),
      (this.keysRead = new Set()),
      (this.missingKeysRead = new Set()),
      (this.keysUpdated = new Set()),
      (this.metadataKeysUpdated = new Set()));
  }
  delete(l) {
    (this.keysUpdated.add(l), this.baseCache.delete(l));
  }
  get(l, r) {
    this.keysRead.add(l);
    const s = this.baseCache.get(l);
    return (s === void 0 && this.missingKeysRead.add(l), r?.copy ? vf(s) : s);
  }
  set(l, r) {
    (this.keysUpdated.add(l),
      this.metadataKeysUpdated.add(l),
      this.baseCache.set(l, r));
  }
  setMetadata(l, r) {
    (this.metadataKeysUpdated.add(l), this.baseCache.setMetadata(l, r));
  }
  length() {
    return this.baseCache.length();
  }
  keys() {
    return this.baseCache.keys();
  }
  entries() {
    return this.baseCache.entries();
  }
  record() {
    return new Sr(this);
  }
  filter(l) {
    return new Tr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Rr(this, l);
  }
}
class Tr {
  constructor(l, r) {
    ((this.baseCache = l), (this.predicate = r));
  }
  delete(l) {
    this.baseCache.delete(l);
  }
  get(l, r) {
    const s = this.baseCache.get(l);
    if (s && this.predicate(l, s)) return r?.copy ? vf(s) : s;
  }
  set(l, r) {
    this.baseCache.set(l, r);
  }
  setMetadata(l, r) {
    this.baseCache.setMetadata(l, r);
  }
  length() {
    return this.getFilteredKeys().size;
  }
  keys() {
    return this.getFilteredKeys();
  }
  entries() {
    return this.getFilteredEntries();
  }
  record() {
    return new Sr(this);
  }
  filter(l) {
    return new Tr(this, l);
  }
  getFilteredEntries() {
    return this.baseCache.entries().filter(([l, r]) => this.get(l));
  }
  getFilteredKeys() {
    const l = new Set();
    return (
      this.baseCache.keys().forEach((r) => {
        this.get(r) && l.add(r);
      }),
      l
    );
  }
  buildFixedTimeWritableCache(l) {
    return new Rr(this, l);
  }
}
class Rr {
  constructor(l, r) {
    ((this.baseCache = l), (this.generatedTime = r));
  }
  delete(l) {
    this.baseCache.delete(l);
  }
  get(l, r) {
    return this.baseCache.get(l, r);
  }
  set(l, r) {
    this.baseCache.set(l, {
      ...r,
      metadata: {
        ...r.metadata,
        cacheControl: {
          ...r.metadata.cacheControl,
          generatedTime: this.generatedTime
        }
      }
    });
  }
  setMetadata(l, r) {
    this.baseCache.setMetadata(l, { ...r, generatedTime: this.generatedTime });
  }
  length() {
    return this.baseCache.length();
  }
  keys() {
    return this.baseCache.keys();
  }
  entries() {
    return this.baseCache.entries();
  }
  record() {
    return new Sr(this);
  }
  filter(l) {
    return new Tr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Rr(this, l);
  }
}
class hE {
  constructor() {
    this.data = {};
  }
  get(l, r) {
    return r?.copy ? vf(this.data[l]) : this.data[l];
  }
  set(l, r) {
    r.metadata.cacheControl.type !== "no-store" &&
      (this.data[l] = {
        ...r,
        metadata: {
          ...r.metadata,
          type: r.metadata.type || {
            namespace: "OneStore:Internal",
            name: "UnknownType"
          },
          cacheControl: {
            generatedTime: Date.now() / 1e3,
            ...r.metadata.cacheControl
          }
        }
      });
  }
  delete(l) {
    delete this.data[l];
  }
  setMetadata(l, r) {
    l in this.data &&
      (this.data[l].metadata.cacheControl = {
        generatedTime: Date.now() / 1e3,
        ...r
      });
  }
  length() {
    return this.keys().size;
  }
  keys() {
    return new Set(Object.keys(this.data));
  }
  entries() {
    return Object.entries(this.data);
  }
  record() {
    return new Sr(this);
  }
  filter(l) {
    return new Tr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Rr(this, l);
  }
}
function mE() {
  return { type: "cache", version: "1.0", service: new hE() };
}
class gf {
  constructor(l, r, s) {
    ((this.services = l),
      (this.config = r),
      (this.requestRunner = s),
      (this.filteredCache = this.services.cache.filter((o, f) => {
        const { cacheControl: h } = f.metadata;
        return !this.expiredChecks.some((p) => p(h));
      })));
  }
  get expiredChecks() {
    return [
      (l) =>
        l.type === "max-age" && this.config.now > l.generatedTime + l.maxAge,
      (l) => l.type === "max-age" && l.maxAge <= 0,
      (l) => l.type === "no-store",
      (l) => l.type === "no-cache" && l.generatedTime < this.config.now
    ];
  }
}
class yE extends gf {
  execute() {
    const l = this.filteredCache;
    return new Promise(async (r, s) => {
      try {
        let o = Mn(void 0);
        for await (const f of this.requestRunner.requestFromNetwork()) {
          if (f) {
            const h = await this.services.cacheInclusionPolicy.write({
              l1: l,
              writeToL1: (p) => this.requestRunner.writeToCache(p, f)
            });
            if (h.isErr()) return r(h);
          }
          ((o = await this.services.cacheInclusionPolicy.read({
            l1: l,
            readFromL1: (h) => this.requestRunner.readFromCache(h)
          })),
            o.isOk() && r(o));
        }
        return r(o);
      } catch (o) {
        return s(o);
      }
    });
  }
}
class pE extends gf {
  execute(l) {
    const r = this.services.instrumentation
      ? this.services.instrumentation.currentTimeMs()
      : 0;
    return this.services.cacheInclusionPolicy
      .read({
        l1: this.filteredCache,
        readFromL1: (s) => this.requestRunner.readFromCache(s)
      })
      .then((s) => {
        if (s.isOk())
          return (
            this.collectCacheHitInstrumentation(
              r,
              l?.instrumentationAttributes
            ),
            Mn(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = this.filteredCache;
        return new Promise(async (f, h) => {
          try {
            let p = Mn(void 0);
            for await (const v of this.requestRunner.requestFromNetwork()) {
              if (v) {
                const y = await this.services.cacheInclusionPolicy.write({
                  l1: o,
                  writeToL1: (g) => this.requestRunner.writeToCache(g, v)
                });
                if (y.isErr()) return f(wn(y.error));
              }
              ((p = await this.services.cacheInclusionPolicy.read({
                l1: o,
                readFromL1: (y) => this.requestRunner.readFromCache(y)
              })),
                p.isOk() && f(Mn(void 0)));
            }
            return f(p);
          } catch (p) {
            return h(p);
          }
        });
      });
  }
  collectCacheHitInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const s = this.services.instrumentation.metrics.getMeter("onestore");
      (s.createCounter("command.max-age.cache-hit.count").add(1, r),
        s
          .createHistogram("command.max-age.cache-hit.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
  collectCacheMissInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const s = this.services.instrumentation.metrics.getMeter("onestore");
      (s.createCounter("command.max-age.cache-miss.count").add(1, r),
        s
          .createHistogram("command.max-age.cache-miss.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
  get expiredChecks() {
    const l = this.config;
    return [
      ...super.expiredChecks,
      (r) => r.generatedTime + l.requestMaxAge < l.now
    ];
  }
}
class vE extends gf {
  execute(l) {
    const r = this.services.instrumentation
      ? this.services.instrumentation.currentTimeMs()
      : 0;
    return this.services.cacheInclusionPolicy
      .read({
        l1: this.filteredCache,
        readFromL1: (s) => this.requestRunner.readFromCache(s)
      })
      .then((s) => {
        if (s.isOk())
          return (
            this.collectCacheHitInstrumentation(
              r,
              l?.instrumentationAttributes
            ),
            Mn(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = new Xy(
          new g2(Qy.GatewayTimeout, {
            error: "Cache miss for only-if-cached request"
          })
        );
        return wn(o);
      });
  }
  get expiredChecks() {
    return [...super.expiredChecks, (l) => l.type === "no-cache"];
  }
  collectCacheHitInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const s = this.services.instrumentation.metrics.getMeter("onestore");
      (s.createCounter("command.only-if-cached.cache-hit.count").add(1, r),
        s
          .createHistogram("command.only-if-cached.cache-hit.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
  collectCacheMissInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const s = this.services.instrumentation.metrics.getMeter("onestore");
      (s.createCounter("command.only-if-cached.cache-miss.count").add(1, r),
        s
          .createHistogram("command.only-if-cached.cache-miss.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
}
class gE {
  constructor(l) {
    this.services = l;
  }
  execute(l, r, s) {
    return this.getCacheControlStrategy(l, r).execute(s);
  }
  getCacheControlStrategy(l, r) {
    if (l.type === "max-age") return new pE(this.services, l, r);
    if (l.type === "no-cache") return new yE(this.services, l, r);
    if (l.type === "only-if-cached") return new vE(this.services, l, r);
    throw new Error(`Unknown cache control strategy ${l.type}`);
  }
  async *find(l) {
    yield* this.services.cacheInclusionPolicy.find(l);
  }
  async *findAndModify(l, r) {
    yield* this.services.cacheInclusionPolicy.findAndModify(l, r);
  }
}
function bE(a, l, r) {
  return {
    type: "cacheController",
    version: "1.0",
    service: new gE({ cache: a, cacheInclusionPolicy: l, instrumentation: r })
  };
}
class EE {}
let SE = class {
  constructor(l) {
    this.value = l;
  }
  isOk() {
    return !0;
  }
  isErr() {
    return !this.isOk();
  }
};
const Mo = (a) => new SE(a);
function ni(a) {
  return ap(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return ni(l(a));
          } catch (s) {
            return l === void 0 ? ni(a) : Xo(s);
          }
        }
      };
}
function Xo(a) {
  return ap(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return ni(r(a));
            } catch (s) {
              return Xo(s);
            }
          return Xo(a);
        }
      };
}
function ap(a) {
  return typeof a?.then == "function";
}
const TE = (a) => "$and" in a,
  RE = (a) => "$or" in a,
  AE = (a) => "$not" in a,
  NE = (a, l) => {
    if ("cacheControlType" in a && l.type !== a.cacheControlType.$eq) return !1;
    if ("maxAge" in a && l.type === "max-age") {
      const r = l.maxAge ?? 0;
      if (
        (a.maxAge.$gte !== void 0 && r < a.maxAge.$gte) ||
        (a.maxAge.$lte !== void 0 && r > a.maxAge.$lte)
      )
        return !1;
    }
    return !0;
  };
function Ju(a) {
  return (l, r) => {
    if (!a) return !1;
    if (TE(a)) return a.$and.every((s) => Ju(s)(l, r));
    if (RE(a)) return a.$or.some((s) => Ju(s)(l, r));
    if (AE(a)) return !Ju(a.$not)(l, r);
    if ("key" in a) return CE(a.key, l);
    if ("metadata" in a) return NE(a.metadata, r.metadata.cacheControl);
    if ("value" in a) return !1;
    throw new Error("Unknown Query Operation");
  };
}
function CE(a, l) {
  return "$regex" in a ? a.$regex.test(l) : !1;
}
function OE(a, l) {
  switch (a.type) {
    case "invalidate": {
      const r = DE(l.metadata.cacheControl);
      return r !== void 0
        ? { type: "metadata", metadata: r }
        : { type: "no-op" };
    }
    case "evict":
      return { type: "delete" };
    default:
      throw new Error(`Invalid update operation: ${a.type}`);
  }
}
function DE(a) {
  switch (a.type) {
    case "max-age":
    case "stale-while-revalidate":
      if (a.maxAge !== 0) return { ...a, maxAge: 0 };
      break;
  }
}
class _E extends EE {
  constructor(l) {
    (super(), (this.services = l));
  }
  read(l) {
    const { l1: r, readFromL1: s } = l;
    return s(r);
  }
  write(l) {
    const { l1: r, writeToL1: s } = l;
    return s(r);
  }
  async *find(l) {
    const r = this.services.cache,
      s = Ju(l),
      o = r.filter(s).entries();
    for (const f of o) yield f;
  }
  async *findAndModify(l, r) {
    const s = this.services.cache;
    for await (const [o, f] of this.find(l)) {
      const h = OE(r, f);
      switch (h.type) {
        case "entry":
          (this.write({ l1: s, writeToL1: (p) => ni(Mo(p.set(o, h.entry))) }),
            yield o);
          break;
        case "metadata":
          (this.write({
            l1: s,
            writeToL1: (p) => ni(Mo(p.setMetadata(o, h.metadata)))
          }),
            yield o);
          break;
        case "delete":
          (this.write({ l1: s, writeToL1: (p) => ni(Mo(p.delete(o))) }),
            yield o);
          break;
      }
    }
  }
}
function xE(a) {
  return {
    service: new _E({ cache: a }),
    type: "cacheInclusionPolicy",
    version: "1.0"
  };
}
const wE = Symbol("EventTypeWildcard");
class ME {
  constructor() {
    this.subscriptions = new Map();
  }
  subscribe(l) {
    let r = this.subscriptions.get(l.type);
    return (
      r === void 0 && ((r = []), this.subscriptions.set(l.type, r)),
      r.push(l),
      () => {
        this.subscriptions.set(
          l.type,
          this.subscriptions.get(l.type).filter((s) => s !== l)
        );
      }
    );
  }
  publish(l) {
    const r = [];
    return (
      this.getSubscriptions(l).forEach((o) => {
        if (!this.getSubscriptions(l).includes(o)) return;
        const f = o.callback.call(o, l);
        hf(f) && r.push(f);
      }),
      r.length > 0 ? Promise.all(r).then(() => {}) : At(void 0)
    );
  }
  getSubscriptions(l) {
    const r = this.subscriptions.get(l.type),
      s = this.subscriptions.get(wE);
    if (r === void 0 && s === void 0) return [];
    let o = [];
    return (
      r !== void 0 &&
        (o = r.filter((f) => (f.predicate ? f.predicate(l) : !0))),
      (o = [...o, ...(s || [])]),
      o
    );
  }
}
function zE() {
  return { type: "pubSub", version: "1.0", service: new ME() };
}
class UE {}
const { isArray: W0 } = Array;
class LE {
  constructor(l) {
    this.value = l;
  }
  isOk() {
    return !0;
  }
  isErr() {
    return !this.isOk();
  }
}
class jE {
  constructor(l) {
    this.error = l;
  }
  isOk() {
    return !1;
  }
  isErr() {
    return !this.isOk();
  }
}
const ei = (a) => new LE(a),
  fr = (a) => new jE(a);
function ul(a, l, r) {
  return a.isOk()
    ? ei({ data: a.value, subscribe: l, refresh: r })
    : fr({ failure: a.error, subscribe: l, refresh: r });
}
function Iu(a) {
  return lp(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return Iu(l(a));
          } catch (s) {
            return l === void 0 ? Iu(a) : Zo(s);
          }
        }
      };
}
function Zo(a) {
  return lp(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return Iu(r(a));
            } catch (s) {
              return Zo(s);
            }
          return Zo(a);
        }
      };
}
function lp(a) {
  return typeof a?.then == "function";
}
function Fo(a, l) {
  if (a === void 0) return l === void 0;
  if (a === null) return l === null;
  if (l === null) return a === null;
  if (W0(a)) {
    if (!W0(l) || a.length !== l.length) return !1;
    for (let r = 0; r < a.length; ++r) if (!Fo(a[r], l[r])) return !1;
    return !0;
  } else if (typeof a == "object") {
    if (typeof l != "object") return !1;
    const r = Object.keys(a),
      s = Object.keys(l);
    if (r.length !== s.length) return !1;
    for (let o = 0; o < r.length; ++o) {
      const f = r[o];
      if (!Fo(a[f], l[f])) return !1;
    }
    return !0;
  }
  return a === l;
}
function zo(a, l) {
  if (a.size > l.size) {
    for (const r of l.keys()) if (a.has(r)) return !0;
  } else for (const r of a) if (l.has(r)) return !0;
  return !1;
}
class HE {
  constructor(l, r, s) {
    ((this.readFromCacheInternal = l),
      (this.requestFromNetworkInternal = r),
      (this.writeToCacheInternal = s));
  }
  readFromCache(l) {
    return this.readFromCacheInternal(l).then((s) =>
      s.isErr() ? fr(s.error.failure) : ((this.returnData = s), ei(void 0))
    );
  }
  requestFromNetwork() {
    const l = this;
    return (async function* () {
      const r = await l.requestFromNetworkInternal();
      (r.isErr() ? (l.networkError = r) : (l.networkData = r), yield r);
    })();
  }
  writeToCache(l, r) {
    return this.writeToCacheInternal(l, r);
  }
}
class BE extends UE {
  constructor(l) {
    (super(),
      (this.services = l),
      (this.keysUsed = new Set()),
      (this.keysUpdated = void 0),
      (this._isInternalExecution = !1),
      (this.lastResult = void 0),
      (this.unsubscribers = []),
      (this.subscriptions = []),
      (this.instantiationTime = Date.now() / 1e3));
  }
  get isInternalExecution() {
    return this._isInternalExecution;
  }
  execute(l) {
    ((this.keysUpdated = void 0), this.unsubscribe());
    const r = kE(this.cacheControlStrategyConfig, l),
      s = this.buildRequestRunner();
    return this.services.cacheController
      .execute(r, s, {
        instrumentationAttributes: this.instrumentationAttributes
      })
      .then((f) =>
        this.handleCacheControllerResult(f, s).then(
          (h) => (
            this.lastResult === void 0 &&
              (h.isErr()
                ? (this.lastResult = { type: "error", error: h.error.failure })
                : (this.lastResult = { type: "data", data: h.value.data })),
            h
          )
        )
      );
  }
  handleCacheControllerResult(l, r) {
    const { networkError: s, networkData: o, returnData: f } = r;
    return this.publishUpdatedKeys().then(() =>
      s
        ? ul(s, this.buildSubscribe(), () => this.refresh())
        : l.isErr()
          ? o
            ? ul(o, this.buildSubscribe(), () => this.refresh())
            : ul(l, this.buildSubscribe(), () => this.refresh())
          : f === void 0
            ? o
              ? ul(o, this.buildSubscribe(), () => this.refresh())
              : ul(
                  fr(new Error("Cache miss after fetching from network")),
                  this.buildSubscribe(),
                  () => this.refresh()
                )
            : (this.subscriptions.length > 0 && this.subscribe(), f)
    );
  }
  buildRequestRunner() {
    return new HE(
      (l) => this.buildResultWithSubscribe(l),
      () => this.requestFromNetwork(),
      (l, r) => this.writeToCacheAndRecordKeys(l, r)
    );
  }
  publishUpdatedKeys() {
    return this.services.pubSub &&
      this.keysUpdated !== void 0 &&
      this.keysUpdated.size > 0
      ? this.services.pubSub.publish({
          type: "cacheUpdate",
          data: this.keysUpdated
        })
      : Iu(void 0);
  }
  get operationType() {
    return "query";
  }
  subscribe() {
    this.unsubscribe();
    const { pubSub: l } = this.services;
    if (!l) return;
    const r = l.subscribe({
        type: "cacheUpdate",
        predicate: (f) => zo(f.data, this.keysUsed),
        callback: () =>
          this.rerun({ now: this.instantiationTime }).then(() => {}),
        keys: this.keysUsed
      }),
      s = l.subscribe({
        type: "cacheInvalidation",
        predicate: (f) => zo(f.data, this.keysUsed),
        callback: () => this.rerun().then(() => {}),
        keys: this.keysUsed
      }),
      o = l.subscribe({
        type: "cacheEviction",
        predicate: (f) => zo(f.data, this.keysUsed),
        callback: () => this.rerun().then(() => {}),
        keys: this.keysUsed
      });
    this.unsubscribers.push(r, s, o);
  }
  unsubscribe() {
    for (; this.unsubscribers.length > 0;) {
      const l = this.unsubscribers.pop();
      l?.();
    }
  }
  equals(l, r) {
    return Fo(l, r);
  }
  async afterRequestHooks(l) {}
  refresh() {
    return this.rerun({ cacheControlConfig: { type: "no-cache" } }).then((l) =>
      l.isErr() ? fr(l.error.failure) : ei(void 0)
    );
  }
  writeToCacheAndRecordKeys(l, r) {
    const s = l.record();
    return this.writeToCache(s, r).then(
      (o) => (
        (this.instantiationTime = Date.now() / 1e3),
        (this.keysUpdated = s.keysUpdated),
        ei(o)
      )
    );
  }
  buildResultWithSubscribe(l) {
    const r = l.record();
    return this.readFromCache(r).then((o) => {
      if (o.isErr()) return ul(o, this.buildSubscribe(), () => this.refresh());
      {
        const f = o.value;
        return (
          (this.keysUsed = r.keysRead),
          ul(ei(f), this.buildSubscribe(), () => this.refresh())
        );
      }
    });
  }
  buildSubscribe() {
    return (l) => (
      this.subscriptions.length === 0 &&
        this.operationType === "query" &&
        this.subscribe(),
      this.subscriptions.push(l),
      () => {
        ((this.subscriptions = this.subscriptions.filter((r) => r !== l)),
          this.subscriptions.length === 0 && this.unsubscribe());
      }
    );
  }
  rerun(l) {
    return (
      (this._isInternalExecution = !0),
      this.execute(l).then(
        (r) => (
          (this._isInternalExecution = !1),
          r.isErr()
            ? ((this.lastResult = { type: "error", error: r.error.failure }),
              this.invokeConsumerCallbacks(fr(r.error.failure)),
              r)
            : ((this.lastResult === void 0 ||
                this.lastResult.type === "error" ||
                !this.equals(this.lastResult.data, r.value.data)) &&
                ((this.lastResult = { type: "data", data: r.value.data }),
                this.invokeConsumerCallbacks(ei(r.value.data))),
              r)
        )
      )
    );
  }
  invokeConsumerCallbacks(l) {
    this.subscriptions.forEach((r) => {
      try {
        r(l);
      } catch {}
    });
  }
}
function kE(a, l) {
  if (!l) return a;
  const r = l.now ?? a.now;
  return l.cacheControlConfig
    ? { ...l.cacheControlConfig, now: r }
    : { ...a, now: r };
}
class qE extends BE {
  constructor(l) {
    (super(l), (this.services = l), (this.additionalNullResponses = []));
  }
  requestFromNetwork() {
    return this.fetch();
  }
  fetch() {
    try {
      return this.convertFetchResponseToData(
        this.services.fetch(...this.fetchParams)
      );
    } catch (l) {
      return At(wn(ir(l)));
    }
  }
  isSemanticNullResponse(l) {
    return this.additionalNullResponses.includes(l.status);
  }
  isProtocolNoBodyStatus(l) {
    return l === 204 || l === 205;
  }
  isUndeclaredNoBodyResponse(l) {
    return (
      this.isProtocolNoBodyStatus(l.status) && !this.isSemanticNullResponse(l)
    );
  }
  async coerceError(l) {
    return ir(l.statusText);
  }
  processFetchReturnValue(l) {
    return Mn(l);
  }
  convertFetchResponseToData(l) {
    return l.then(
      (r) => {
        if (r.ok) {
          let s;
          return (
            this.isSemanticNullResponse(r)
              ? (s = Promise.resolve(Mn(null)))
              : this.isUndeclaredNoBodyResponse(r)
                ? (s = Promise.resolve(
                    wn(
                      ir(
                        `Unexpected ${r.status} response: no-content status was not declared in the API specification. Declare this response in your OAS without a content property.`
                      )
                    )
                  ))
                : (s = r.json().then(
                    (o) => this.processFetchReturnValue(o),
                    (o) => wn(ir(o))
                  )),
            s.finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            })
          );
        } else
          return this.coerceError(r)
            .then((s) => wn(s))
            .finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            });
      },
      (r) => wn(ir(r))
    );
  }
}
function YE(a) {
  return (l) => {
    const [r, s] = l;
    if (typeof r == "string" && !r.startsWith("http")) {
      const o = r.startsWith("/") ? r : `/${r}`;
      return At([`${a}${o}`, s]);
    }
    return At(l);
  };
}
function VE(a) {
  return (l) => At(yr("Authorization", `Bearer ${a}`, l));
}
function GE(a, l) {
  const r = [];
  return (a && r.push(YE(a)), l && r.push(VE(l)), Zy({ request: r }).service);
}
const QE = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Chatter-Entity-Encoding": "false"
};
function XE(a) {
  if (a instanceof Headers) {
    const l = [];
    return (a.forEach((r, s) => l.push([s, r])), l);
  }
  return Array.isArray(a) ? a.map(([l, r]) => [l, r]) : Object.entries(a);
}
function ip(a, l) {
  if (l === void 0) return { ...a };
  const r = { ...a },
    s = new Map();
  for (const f of Object.keys(r)) s.set(f.toLowerCase(), f);
  const o = new Set();
  for (const [f, h] of XE(l)) {
    const p = f.toLowerCase(),
      v = s.get(p);
    v === void 0
      ? ((r[f] = h), s.set(p, f), o.add(p))
      : o.has(p)
        ? (r[v] = `${r[v]}, ${h}`)
        : ((r[v] = h), o.add(p));
  }
  return r;
}
function rp(a) {
  return ip(QE, a);
}
function ZE(a) {
  if (a === void 0) return;
  const l = {};
  return (
    new Headers(a).forEach((r, s) => {
      l[s] = r;
    }),
    Object.keys(l).length > 0 ? l : void 0
  );
}
const FE = 512;
function KE(a) {
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
class P0 extends Error {
  status;
  url;
  constructor(l) {
    const r =
        l.body.length === 0
          ? "empty response body"
          : "unparseable response body",
      s =
        l.body.length === 0
          ? ""
          : ` (starts with: ${JSON.stringify(KE(l.body.slice(0, FE)))})`;
    (super(
      `${l.surface} GraphQL request to ${l.url} returned HTTP ${l.status} with an ${r}${s}. Expected a JSON GraphQL response; the transport (proxy/gateway/auth) likely did not return one.`
    ),
      (this.name = "GraphQLTransportError"),
      (this.status = l.status),
      (this.url = l.url),
      (this.cause = l.cause));
  }
}
async function up(a, l, r) {
  const s = await a.text();
  let o;
  try {
    o = JSON.parse(s);
  } catch (f) {
    throw new P0({ surface: l, url: r, status: a.status, body: s, cause: f });
  }
  if (o === null || typeof o != "object")
    throw new P0({
      surface: l,
      url: r,
      status: a.status,
      body: s,
      cause: new Error("Parsed GraphQL response body was not a JSON object")
    });
  return o;
}
const Wu = () => {},
  Ko = async () => {};
function bf(a) {
  try {
    return Mn(I2(a));
  } catch (l) {
    return wn(fl(l));
  }
}
function Ef(a, l) {
  const r = a.definitions.filter((s) => s.kind === "OperationDefinition");
  return r.length === 0
    ? "unknown"
    : r.length === 1
      ? l === void 0 || r[0].name?.value === l
        ? r[0].operation
        : "unknown"
      : l === void 0
        ? "unknown"
        : (r.find((s) => s.name?.value === l)?.operation ?? "unknown");
}
function fl(a) {
  if (a && typeof a == "object" && "data" in a) {
    const l = a.data;
    if (l && typeof l == "object" && "errors" in l && Array.isArray(l.errors))
      return l.errors;
  }
  return a instanceof Error
    ? [{ message: a.message }]
    : typeof a == "string"
      ? [{ message: a }]
      : [{ message: "Unknown error" }];
}
async function sp(
  a,
  { mutation: l, variables: r, operationName: s, headers: o }
) {
  const f = bf(l);
  if (f.isErr()) return { data: void 0, errors: f.error };
  const h = f.value,
    p = Ef(h, s);
  if (p !== "mutation")
    return {
      data: void 0,
      errors: [
        {
          message: `DataSDK.graphql.mutate() requires a GraphQL mutation, received ${p}.`
        }
      ]
    };
  try {
    const v = await a({
      query: pf(h),
      variables: r,
      operationName: s,
      headers: o
    });
    return { data: v.data ?? void 0, errors: v.errors };
  } catch (v) {
    return { data: void 0, errors: fl(v) };
  }
}
function cp(a) {
  function l(s, o, f, h) {
    return a({ query: pf(s), variables: o, operationName: f, headers: h }).then(
      (p) => ({ data: p.data ?? void 0, errors: p.errors }),
      (p) => ({ data: void 0, errors: fl(p) })
    );
  }
  async function r({ query: s, variables: o, operationName: f, headers: h }) {
    const p = bf(s);
    if (p.isErr())
      return {
        data: void 0,
        errors: p.error,
        subscribe: () => Wu,
        refresh: Ko
      };
    const v = p.value,
      y = Ef(v, f);
    if (y !== "query")
      return {
        data: void 0,
        errors: [
          {
            message: `DataSDK.graphql.query() requires a GraphQL query, received ${y}.`
          }
        ],
        subscribe: () => Wu,
        refresh: Ko
      };
    const g = new Set(),
      b = o,
      C = await l(v, b, f, h);
    return {
      data: C.data,
      errors: C.errors,
      subscribe(O) {
        return (
          g.add(O),
          () => {
            g.delete(O);
          }
        );
      },
      async refresh() {
        const O = await l(v, b, f, h);
        for (const U of g) U(O);
      }
    };
  }
  return { query: r, mutate: (s) => sp(a, s) };
}
const JE = "67.0";
function op(a = JE) {
  return `/services/data/v${a}`;
}
const $E = { "Content-Type": "application/json", Accept: "application/json" };
class IE {
  clientFetch;
  pathData;
  graphql;
  constructor(l) {
    const r = WE(),
      s = PE(l?.instanceUrl ?? r.instanceUrl),
      o = l?.accessToken ?? r.accessToken;
    ((this.pathData = op(l?.apiVersion ?? r.apiVersion)),
      (this.clientFetch = GE(s || void 0, o)),
      (this.graphql = cp(this.executeRawGraphQL.bind(this))));
  }
  async executeRawGraphQL({
    query: l,
    variables: r,
    operationName: s,
    headers: o
  }) {
    const f = `${this.pathData}/graphql`,
      h = await this.clientFetch(f, {
        method: "POST",
        body: JSON.stringify({ query: l, variables: r, operationName: s }),
        headers: ip($E, o)
      });
    return up(h, "Mosaic", f);
  }
}
function WE() {
  const a = globalThis.MOSAIC_ENV;
  return {
    instanceUrl: a?.instanceUrl,
    accessToken: a?.accessToken,
    apiVersion: a?.apiVersion
  };
}
function PE(a) {
  if (!a || a === "/") return "";
  let l = a;
  return (
    !l.startsWith("/") && !l.startsWith("http") && (l = `/${l}`),
    l.endsWith("/") && (l = l.slice(0, -1)),
    l
  );
}
const eS = "graphqlQuery";
class tS {
  graphql;
  constructor() {
    this.graphql = cp(this.executeRawGraphQL.bind(this));
  }
  async executeRawGraphQL({ query: l, variables: r, operationName: s }) {
    return (
      await window.openai.callTool(eS, {
        query: l,
        ...(r != null ? { variables: r } : {}),
        ...(s != null ? { operationName: s } : {})
      })
    ).structuredContent;
  }
}
const Uo = "Accept-Language",
  nS = (a) => {
    const l = globalThis.SFDC_ENV?.language;
    if (!l) return At(a);
    const [r, s] = a;
    return (
      r instanceof Request && !s?.headers
        ? r.headers.has(Uo)
        : new Headers(s?.headers).has(Uo)
    )
      ? At(a)
      : At(yr(Uo, l, a));
  },
  aS = "X-SFDC-Client-Name",
  lS = "X-SFDC-Client-Version",
  iS = "@salesforce/platform-sdk",
  rS = "11.68.0",
  uS = (a) => {
    let l = yr(aS, iS, a);
    return ((l = yr(lS, rS, l)), At(l));
  },
  sS = "X-CSRF-Token";
function cS(a, l = {}) {
  const { protectedUrls: r = [], alwaysProtectedUrls: s = [] } = l;
  return async (o) => {
    const [f, h] = o,
      p = f instanceof Request ? f.url : f instanceof URL ? f.href : f,
      v = h?.method ?? (f instanceof Request ? f.method : void 0) ?? "GET";
    if (ey(s, p) || (oS(v) && ey(r, p))) {
      const y = await a.getToken();
      o = yr(sS, y, o);
    }
    return At(o);
  };
}
function oS(a) {
  const l = a.toLowerCase();
  return l === "post" || l === "put" || l === "patch" || l === "delete";
}
function ey(a, l) {
  const r = new URL(l, globalThis.location?.href ?? "http://localhost");
  return a.some((s) => r.pathname.includes(s));
}
function fS(a, l = {}) {
  const r = cS(a, l);
  async function s(o) {
    const f = await r(o);
    return fetch(f[0], f[1]);
  }
  return (o, f) => (f ? f.applyRetry(async () => s(o)) : s(o));
}
const dS = [400, 401, 403];
class hS extends cE {
  constructor(l) {
    (super(l), (this.csrfTokenManager = l));
  }
  async shouldRetry(l, r) {
    return r.attempt >= 1 ? !1 : dS.includes(l.status);
  }
  async calculateDelay(l, r) {
    return 0;
  }
  async prepareRetry(l, r) {
    await this.csrfTokenManager.refreshToken();
  }
}
class mS {
  constructor(l, r) {
    ((this.endpoint = l),
      (this.cacheName = r),
      (this.tokenPromise = this.obtainToken()));
  }
  tokenPromise;
  refreshPromise;
  async getToken() {
    return this.tokenPromise;
  }
  refreshToken() {
    return (
      this.refreshPromise ||
        (this.refreshPromise = this.withCache((l) => l.delete(this.endpoint))
          .then(
            () => ((this.tokenPromise = this.obtainToken()), this.tokenPromise)
          )
          .finally(() => {
            this.refreshPromise = void 0;
          })),
      this.refreshPromise
    );
  }
  async obtainToken() {
    let l = await this.withCache((o) => o.match(this.endpoint)),
      r = !1;
    l || ((l = await fetch(this.endpoint, { method: "get" })), (r = !0));
    const s = (await l.clone().json()).csrfToken;
    return (r && (await this.withCache((o) => o.put(this.endpoint, l))), s);
  }
  async withCache(l) {
    if (this.cacheName && caches) {
      const r = await caches.open(this.cacheName);
      return l(r);
    } else return;
  }
}
const ty = new Map();
function yS(a) {
  const { endpoint: l, cacheName: r, ...s } = a.csrf;
  let o = ty.get(l);
  return (
    o || ((o = new mS(l, r)), ty.set(l, o)),
    Zy({ retry: fS(o, s), request: [uS, nS] }, oE(new hS(o)).service).service
  );
}
const ny = new Map();
function pS(a) {
  let l = ny.get(a);
  if (!l) {
    const r = mE().service,
      s = xE(r).service,
      o = bE(r, s).service,
      f = zE().service;
    ((l = { cache: r, cacheController: o, pubSub: f }), ny.set(a, l));
  }
  return l;
}
function vS(a, l) {
  const r = pS(a);
  return {
    shared: r,
    services: { cacheController: r.cacheController, pubSub: r.pubSub, fetch: l }
  };
}
const ay = 300;
function gS(a, l) {
  try {
    return JSON.parse(JSON.stringify(a));
  } catch (r) {
    const s = l || "(anonymous)",
      o = new TypeError(
        `HttpGraphQLResourceCacheControlCommand: variables for operation "${s}" must be JSON-serializable. ${r.message}`
      );
    throw ((o.cause = r), o);
  }
}
function bS(a) {
  if (typeof a == "object" && a.type === "max-age") {
    const l = a.maxAge;
    return Number.isFinite(l) && l >= 0 ? l : ay;
  }
  return ay;
}
class ES extends qE {
  constructor(l, r, s) {
    (super(r),
      (this.url = s),
      (this.query = l.query),
      (this.normalizedOperationName = l.operationName ?? ""),
      (this.normalizedVariables = gS(
        l.variables ?? {},
        this.normalizedOperationName
      )),
      (this.cacheControl = l.cacheControl),
      (this.resolvedMaxAge = bS(l.cacheControl)),
      (this.headers = l.headers),
      (this.headersKey = ZE(l.headers)));
  }
  query;
  normalizedVariables;
  normalizedOperationName;
  cacheControl;
  resolvedMaxAge;
  headers;
  headersKey;
  get fetchParams() {
    return [
      this.url,
      {
        method: "POST",
        headers: rp(this.headers),
        body: JSON.stringify({
          query: this.query,
          variables: this.normalizedVariables,
          operationName: this.normalizedOperationName
        })
      }
    ];
  }
  buildKey() {
    const l = {
      query: this.query,
      variables: this.normalizedVariables,
      operationName: this.normalizedOperationName
    };
    return (this.headersKey !== void 0 && (l.headers = this.headersKey), Yo(l));
  }
  readFromCache(l) {
    const r = this.buildKey(),
      s = l.get(r)?.value;
    return At(s === void 0 ? wn(new p2()) : Mn(s));
  }
  writeToCache(l, r) {
    if (
      r.isOk() &&
      r.value.data != null &&
      Object.keys(r.value.data).length > 0
    ) {
      const s = Math.floor(Date.now() / 1e3);
      l.set(this.buildKey(), {
        value: r.value.data,
        metadata: {
          cacheControl: {
            type: "max-age",
            maxAge: this.resolvedMaxAge,
            generatedTime: s
          }
        }
      });
    }
    return At(void 0);
  }
  get cacheControlStrategyConfig() {
    const l = Math.floor(Date.now() / 1e3);
    return this.cacheControl === "no-cache"
      ? { type: "no-cache", now: l }
      : this.cacheControl === "only-if-cached"
        ? { type: "only-if-cached", now: l }
        : { type: "max-age", requestMaxAge: this.resolvedMaxAge, now: l };
  }
  responseHasErrors(l) {
    return l.errors && l.errors.length > 0;
  }
  processFetchReturnValue(l) {
    return this.responseHasErrors(l) ? wn(new Xy(l)) : Mn(l);
  }
}
function fp(a) {
  if (b2(a) && a.data && typeof a.data == "object") {
    const l = a.data;
    if (l.data != null) return l.data;
  }
}
function SS(a) {
  return (l) => {
    if (l.isOk()) {
      const r = l.value;
      (ai(r), a({ data: r, errors: void 0 }));
    } else {
      const r = fp(l.error);
      (r && ai(r), a({ data: r, errors: fl(l.error) }));
    }
  };
}
async function TS(a) {
  let l, r, s;
  try {
    const o = await a.execute();
    o.isOk()
      ? ((l = o.value.data), ai(l), (s = (f) => o.value.subscribe(f)))
      : ((l = fp(o.error.failure)),
        l && ai(l),
        (r = fl(o.error.failure)),
        (s = (f) => o.error.subscribe(f)));
  } catch (o) {
    r = fl(o);
  }
  return {
    data: l,
    errors: r,
    subscribe(o) {
      return s ? s(SS(o)) : Wu;
    },
    async refresh() {
      await a.refresh();
    }
  };
}
function Lo(a) {
  return { data: void 0, errors: a, subscribe: () => Wu, refresh: Ko };
}
function RS({ bundle: a, url: l, executeRaw: r }) {
  const { services: s } = a;
  async function o({
    query: f,
    variables: h,
    operationName: p,
    cacheControl: v,
    headers: y
  }) {
    const g = bf(f);
    if (g.isErr()) return Lo(g.error);
    const b = g.value,
      C = Ef(b, p);
    if (C !== "query")
      return Lo([
        {
          message: `DataSDK.graphql.query() requires a GraphQL query, received ${C}.`
        }
      ]);
    let O;
    try {
      O = new ES(
        {
          query: pf(b),
          variables: h,
          operationName: p,
          cacheControl: v,
          headers: y
        },
        s,
        l
      );
    } catch (U) {
      return Lo(fl(U));
    }
    return TS(O);
  }
  return { query: o, mutate: (f) => sp(r, f) };
}
const AS = 1,
  NS = `@salesforce/platform-sdk-data_v${AS}`;
class CS {
  baseUrl;
  pathData;
  clientFetch;
  onStatus;
  graphql;
  constructor(l) {
    const r = OS();
    ((this.baseUrl = DS(l?.basePath ?? r.apiPath)),
      (this.pathData = op(l?.apiVersion)));
    const s = `${this.pathData}/ui-api`,
      o = `${this.pathData}/graphql`;
    ((this.onStatus = l?.onStatus ?? {}),
      (this.clientFetch = yS({
        csrf: {
          endpoint: `${this.baseUrl}${s}/session/csrf`,
          cacheName: NS,
          protectedUrls: ["services/data/v", "services/apexrest"],
          alwaysProtectedUrls: ["services/apexrest"]
        }
      })));
    const f = (p, v) => this.fetch(p, v),
      h = vS(`${this.baseUrl}${this.pathData}`, f);
    this.graphql = RS({
      bundle: h,
      url: o,
      executeRaw: this.executeRawGraphQL.bind(this)
    });
  }
  async fetch(l, r) {
    const s = this.applySalesforceBase(l),
      o = await this.clientFetch(s, r);
    return (await this.onStatus[o.status]?.(), o);
  }
  async executeRawGraphQL({
    query: l,
    variables: r,
    operationName: s,
    headers: o
  }) {
    const f = `${this.pathData}/graphql`,
      h = await this.fetch(f, {
        method: "POST",
        body: JSON.stringify({ query: l, variables: r, operationName: s }),
        headers: rp(o)
      });
    return up(h, "WebApp", f);
  }
  applySalesforceBase(l) {
    if (typeof l == "string") {
      if (l.startsWith("http")) return l;
      const r = l.startsWith("/") ? l : `/${l}`;
      return `${this.baseUrl}${r}`;
    }
    return l;
  }
}
function OS() {
  return { apiPath: globalThis.SFDC_ENV?.apiPath };
}
function DS(a) {
  if (!a || a === "/") return "";
  let l = a;
  return (
    l.startsWith("/") || (l = `/${l}`),
    l.endsWith("/") && (l = l.slice(0, -1)),
    l
  );
}
function _S(a) {
  const l = typeof a == "object" && a !== null && "setup" in a,
    r = l ? a : a.extension,
    s = l ? r?.name : a.as;
  if (typeof r?.setup != "function")
    throw new Error(
      "Extension entry cannot attach: it is missing a setup function."
    );
  if (typeof s != "string" || s.length === 0)
    throw new Error(
      l
        ? 'Extension entry cannot attach: "name" must be a non-empty string.'
        : 'Extension entry cannot attach: alias "as" must be a non-empty string.'
    );
  return { extension: r, mountName: s };
}
async function xS(a, l) {
  if (l.length === 0) return a;
  if ("ext" in a)
    throw new Error(
      'Cannot attach extensions: the base SDK already declares an "ext" member, which the extension container reserves.'
    );
  const r = Object.create(a),
    s = {};
  Object.defineProperty(r, "ext", {
    value: s,
    enumerable: !0,
    writable: !1,
    configurable: !1
  });
  for (const o of l) {
    const { extension: f, mountName: h } = _S(o),
      p = h === f.name ? `"${f.name}"` : `"${f.name}" (aliased as "${h}")`;
    if (Object.hasOwn(s, h))
      throw new Error(
        `Extension ${p} cannot attach: "${h}" is already defined by another extension.`
      );
    let v;
    try {
      v = await f.setup(r);
    } catch (y) {
      throw new Error(`Extension ${p} failed during setup.`, { cause: y });
    }
    Object.defineProperty(s, h, {
      value: v,
      enumerable: !0,
      writable: !0,
      configurable: !0
    });
  }
  return r;
}
async function wS(a) {
  try {
    switch (await c2(a?.surface)) {
      case Wl.OpenAI:
        return new tS();
      case Wl.WebApp:
      case Wl.MicroFrontend:
        return new CS(a?.webapp);
      case Wl.Mosaic:
        return new IE(a?.mosaic);
      case Wl.MCPApps:
        return {};
      default:
        return {};
    }
  } catch {
    return {};
  }
}
function MS(a) {
  return f2(
    (async () => {
      const l = await wS(a);
      return xS(l, []);
    })(),
    "createDataSDK"
  );
}
const zS = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  US = (a) =>
    a.replace(/^([A-Z])|[\s-_]+(\w)/g, (l, r, s) =>
      s ? s.toUpperCase() : r.toLowerCase()
    ),
  ly = (a) => {
    const l = US(a);
    return l.charAt(0).toUpperCase() + l.slice(1);
  },
  dp = (...a) =>
    a
      .filter((l, r, s) => !!l && l.trim() !== "" && s.indexOf(l) === r)
      .join(" ")
      .trim(),
  LS = (a) => {
    for (const l in a)
      if (l.startsWith("aria-") || l === "role" || l === "title") return !0;
  };
var jS = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const HS = z.forwardRef(
  (
    {
      color: a = "currentColor",
      size: l = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: s,
      className: o = "",
      children: f,
      iconNode: h,
      ...p
    },
    v
  ) =>
    z.createElement(
      "svg",
      {
        ref: v,
        ...jS,
        width: l,
        height: l,
        stroke: a,
        strokeWidth: s ? (Number(r) * 24) / Number(l) : r,
        className: dp("lucide", o),
        ...(!f && !LS(p) && { "aria-hidden": "true" }),
        ...p
      },
      [
        ...h.map(([y, g]) => z.createElement(y, g)),
        ...(Array.isArray(f) ? f : [f])
      ]
    )
);
const ri = (a, l) => {
  const r = z.forwardRef(({ className: s, ...o }, f) =>
    z.createElement(HS, {
      ref: f,
      iconNode: l,
      className: dp(`lucide-${zS(ly(a))}`, `lucide-${a}`, s),
      ...o
    })
  );
  return ((r.displayName = ly(a)), r);
};
const BS = [
    [
      "path",
      {
        d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        key: "1jg4f8"
      }
    ]
  ],
  kS = ri("facebook", BS);
const qS = [
    [
      "rect",
      {
        width: "20",
        height: "20",
        x: "2",
        y: "2",
        rx: "5",
        ry: "5",
        key: "2e1cvw"
      }
    ],
    [
      "path",
      { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }
    ],
    ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
  ],
  YS = ri("instagram", qS);
const VS = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ],
  GS = ri("search", VS);
const QS = [
    [
      "path",
      {
        d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
        key: "pff0z6"
      }
    ]
  ],
  XS = ri("twitter", QS);
const ZS = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ],
  FS = ri("x", ZS);
const KS = [
    [
      "path",
      {
        d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
        key: "1q2vi4"
      }
    ],
    ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
  ],
  JS = ri("youtube", KS),
  hp =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='97'%20height='40'%20viewBox='0%200%2097%2040'%3e%3cg%20fill='%23FFFFFE'%20fill-rule='evenodd'%3e%3cpath%20d='M57.094%2033.402c-.583-1.024-.948-2.177-1.115-3.525a.681.681%200%200%200-.805-.586%203.914%203.914%200%200%201-.746.074c-.785%200-1.385-.132-1.385-1.796v-1.594h-.005V3.594a.621.621%200%200%200-.62-.623h-4.509a.622.622%200%200%200-.62.623v24.515c0%201.836.168%203.223%201.008%204.462%201.028%201.419%203.076%202.242%204.958%202.242l.292-.002h.002c1.144%200%202.259-.104%203.178-.425a.682.682%200%200%200%20.367-.983M69.33%2032.614c-.831-1.216-1.09-1.426-1.65-2.737-.075-.174-.123-.357-.276-.468a.673.673%200%200%200-.528-.118%203.926%203.926%200%200%201-.747.074c-.785%200-1.386-.132-1.386-1.796v-1.594h-.004V3.594a.622.622%200%200%200-.62-.623h-4.51a.621.621%200%200%200-.62.623v24.515c0%201.836.169%203.223%201.01%204.462%201.027%201.419%203.075%202.242%204.956%202.242l.292-.002h.004c1.142%200%202.257-.104%203.177-.425.191-.066.874-.415%201.015-.56.441-.455.001-1.044-.113-1.21M28.338%2020.117c.47-2.588%202.465-4.224%205.24-4.224%202.8%200%204.698%201.565%205.19%204.224h-10.43zm5.198-9.13c-3.421%200-6.328%201.208-8.405%203.494-1.958%202.153-3.036%205.18-3.036%208.521%200%203.392%201.068%206.301%203.088%208.416%202.122%202.22%205.167%203.394%208.804%203.394%203.928%200%207.223-1.38%209.795-4.102.235-.248.245-.703-.02-.878-.268-.174-1.607-1.087-2.952-2.838-.159-.11-.27-.173-.429-.173h-.018a.62.62%200%200%200-.437.199c-1.545%201.67-3.527%202.351-5.814%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.622.622%200%200%200%20.617-.554c.056-.507.085-1.071.085-1.631%200-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.829-3.297-8.143-3.297zM75.177%2020.117c.47-2.588%202.465-4.224%205.238-4.224%202.8%200%204.7%201.565%205.192%204.224h-10.43zm5.197-9.13c-3.42%200-6.328%201.208-8.404%203.494-1.959%202.153-3.037%205.18-3.037%208.521%200%203.392%201.068%206.301%203.088%208.416%202.123%202.22%205.167%203.394%208.804%203.394%203.929%200%207.224-1.38%209.796-4.102.235-.248.245-.703-.021-.878-.267-.174-1.607-1.087-2.951-2.838-.16-.11-.27-.173-.43-.173h-.018a.621.621%200%200%200-.436.199c-1.545%201.67-3.528%202.351-5.815%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.621.621%200%200%200%20.617-.554%2015.04%2015.04%200%200%200%20.086-1.631c0-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.83-3.297-8.144-3.297z'%20/%3e%3cpath%20d='M23.203%2033.259l-.067-.066c-.017-.017-.035-.033-.052-.052a13.04%2013.04%200%200%201-2.545-3.887.62.62%200%200%200-.57-.377H8.142l14.464-18.57a.626.626%200%200%200%20.13-.384V6.305a.622.622%200%200%200-.62-.624h-7.801V.491a.311.311%200%200%200-.31-.31H9.21a.31.31%200%200%200-.31.31v5.19H1.254a.622.622%200%200%200-.62.624V10.5c0%20.343.277.622.62.622H14.53L.152%2029.527a.625.625%200%200%200-.132.385v3.783c0%20.344.278.623.62.623h8.264v5.19a.31.31%200%200%200%20.31.311h4.796a.31.31%200%200%200%20.31-.311v-5.19h8.44a.624.624%200%200%200%20.442-1.06M93.501%208.179h.525c.104%200%20.205-.003.304-.01a.836.836%200%200%200%20.267-.061.415.415%200%200%200%20.184-.15.511.511%200%200%200%20.068-.284.472.472%200%200%200-.06-.253.388.388%200%200%200-.16-.146.654.654%200%200%200-.223-.064%202.15%202.15%200%200%200-.245-.014h-.66v.982zm-.425-1.366h1.12c.369%200%20.64.07.816.21.175.14.262.364.262.672%200%20.275-.078.477-.234.605a1.056%201.056%200%200%201-.574.228l.879%201.352h-.461l-.837-1.317h-.546V9.88h-.425V6.813zm-1.249%201.53a2.236%202.236%200%200%200%20.653%201.597c.203.202.44.361.709.477.27.116.56.174.873.174.311%200%20.602-.058.872-.174a2.236%202.236%200%200%200%201.188-1.203%202.32%202.32%200%200%200%20.173-.9c0-.318-.058-.614-.173-.89a2.21%202.21%200%200%200-1.188-1.188c-.27-.113-.56-.17-.872-.17-.313%200-.604.058-.873.174a2.28%202.28%200%200%200-.709.477%202.168%202.168%200%200%200-.479.718c-.116.278-.174.58-.174.908zm-.425%200c0-.38.07-.732.212-1.057a2.67%202.67%200%200%201%20.575-.844c.242-.237.523-.423.844-.558a2.628%202.628%200%200%201%201.029-.203%202.69%202.69%200%200%201%201.872.758c.241.235.433.512.574.833.142.32.213.668.213%201.042a2.645%202.645%200%200%201-.787%201.9%202.658%202.658%200%200%201-1.872.762c-.364%200-.708-.068-1.029-.203a2.645%202.645%200%200%201-1.419-1.388%202.54%202.54%200%200%201-.212-1.042z'%20/%3e%3c/g%3e%3c/svg%3e",
  $S = `
query FinancialInstitutions($after: String) {
  uiapi {
    query {
      Account(
        first: 200
        after: $after
        where: {
          and: [
            { Publicly_Listed__c: { eq: true } }
            { Institution_Status__c: { eq: "Active" } }
          ]
        }
        orderBy: { Name: { order: ASC } }
        ) {
        edges {
          cursor
          node {
            Id
            Name { value }
            Public_Display_Name__c { value }
            Public_Search_Keywords__c { value }
            Website { value }
            BillingCity { value }
            Logo_URL__c { value }
            Enrollment_URL__c { value }
            Supports_Enrollment__c { value }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
}
`,
  mp = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"];
function IS(a) {
  const l =
    a.Public_Display_Name__c.value || a.Name.value || "Unnamed institution";
  return {
    id: a.Id,
    name: l,
    keywords: a.Public_Search_Keywords__c.value || "",
    website: a.Website.value || "",
    city: a.BillingCity.value || "",
    logoUrl: a.Logo_URL__c.value || "",
    enrollmentUrl: a.Enrollment_URL__c.value || a.Website.value || "",
    supportsEnrollment: a.Supports_Enrollment__c.value === !0
  };
}
function Sf(a) {
  const l = a.trim()[0]?.toUpperCase();
  return l && /[A-Z]/.test(l) ? l : "#";
}
function WS(a) {
  return a.reduce((l, r) => {
    const s = Sf(r.name);
    return ((l[s] = l[s] || []), l[s].push(r), l);
  }, {});
}
function PS(a, l, r) {
  const s = l.trim().toLowerCase();
  return a.filter((o) => {
    const f = r === "All" || Sf(o.name) === r,
      h =
        s.length === 0 ||
        [o.name, o.keywords, o.city].join(" ").toLowerCase().includes(s);
    return f && h;
  });
}
function eT(a, l) {
  const r = l.trim().toLowerCase();
  return r.length === 0
    ? a
    : a.filter((s) =>
        [s.name, s.keywords, s.city].join(" ").toLowerCase().includes(r)
      );
}
function tT({ institution: a, onSelect: l }) {
  return a.enrollmentUrl || a.website
    ? F.jsx("button", {
        className: "institution-name institution-trigger",
        type: "button",
        onClick: () => l(a),
        children: a.name
      })
    : F.jsx("span", { className: "institution-name", children: a.name });
}
function nT({ institutions: a, onSelectInstitution: l }) {
  const r = WS(a),
    s = mp.filter((o) => r[o]?.length);
  return F.jsx("div", {
    className: "results-list",
    children: s.map((o) =>
      F.jsxs(
        "section",
        {
          className: "letter-section",
          "aria-labelledby": `letter-${o}`,
          children: [
            F.jsx("h2", { id: `letter-${o}`, children: o }),
            F.jsx("div", {
              className: "letter-results",
              children: r[o].map((f) =>
                F.jsx(tT, { institution: f, onSelect: l }, f.id)
              )
            })
          ]
        },
        o
      )
    )
  });
}
function aT({ institution: a, onCancel: l }) {
  const r = a.enrollmentUrl || a.website;
  return r
    ? F.jsx("div", {
        className: "modal-backdrop",
        role: "presentation",
        children: F.jsxs("section", {
          className: "bank-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "bank-modal-title",
          "aria-describedby": "bank-modal-description",
          children: [
            F.jsx("header", {
              className: "bank-modal-header",
              children: F.jsx("h2", {
                id: "bank-modal-title",
                children: "Great News!"
              })
            }),
            F.jsxs("div", {
              className: "bank-modal-body",
              children: [
                F.jsxs("p", {
                  className: "bank-modal-offer",
                  children: [
                    a.name,
                    " Offers Zelle",
                    F.jsx("sup", { children: "®" })
                  ]
                }),
                a.logoUrl
                  ? F.jsx("img", {
                      className: "bank-modal-logo",
                      src: a.logoUrl,
                      alt: `${a.name} logo`
                    })
                  : F.jsx("div", {
                      className: "bank-modal-logo-fallback",
                      "aria-hidden": "true",
                      children: a.name.slice(0, 2).toUpperCase()
                    }),
                F.jsxs("p", {
                  id: "bank-modal-description",
                  className: "bank-modal-primary",
                  children: [
                    "Your bank offers Zelle",
                    F.jsx("sup", { children: "®" }),
                    "! You can use your banking app to send and receive money with Zelle",
                    F.jsx("sup", { children: "®" }),
                    "."
                  ]
                }),
                F.jsxs("p", {
                  className: "bank-modal-disclaimer",
                  children: [
                    'By selecting "Continue to your bank", you will be taken to an external interface with different privacy and information security policy. Zelle',
                    F.jsx("sup", { children: "®" }),
                    " is not responsible for and does not endorse the products, services or content that is offered or expressed."
                  ]
                }),
                F.jsx("a", {
                  className: "continue-bank-link",
                  href: r,
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Continue to your bank"
                }),
                F.jsx("button", {
                  className: "cancel-modal-button",
                  type: "button",
                  onClick: l,
                  children: "Cancel"
                })
              ]
            })
          ]
        })
      })
    : null;
}
function lT() {
  return F.jsxs("footer", {
    className: "zelle-info",
    children: [
      F.jsxs("section", {
        className: "zelle-info-panel",
        "aria-labelledby": "zelle-info-heading",
        children: [
          F.jsxs("h2", {
            id: "zelle-info-heading",
            children: ["What is Zelle", F.jsx("sup", { children: "®" }), "?"]
          }),
          F.jsxs("p", {
            children: [
              "Zelle",
              F.jsx("sup", { children: "®" }),
              " is a fast, safe and easy way to send and receive money directly between almost any bank accounts in the U.S., typically within minutes.",
              F.jsx("sup", { children: "1" }),
              " With just an email address or U.S. mobile phone number, you can send money to and receive money from friends, family and others you trust."
            ]
          }),
          F.jsx("a", {
            className: "learn-more",
            href: "https://www.zellepay.com/how-it-works",
            target: "_blank",
            rel: "noreferrer",
            children: "Learn More"
          })
        ]
      }),
      F.jsxs("section", {
        className: "zelle-footer-nav",
        "aria-label": "Zelle footer links",
        children: [
          F.jsxs("div", {
            className: "footer-lockup",
            children: [
              F.jsx("img", { src: hp, alt: "Zelle" }),
              F.jsxs("nav", {
                children: [
                  F.jsx("a", {
                    href: "https://www.zellepay.com/contact-us",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Contact Us"
                  }),
                  F.jsx("a", {
                    href: "https://www.zellepay.com/financial-institutions",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Partners"
                  }),
                  F.jsx("a", {
                    href: "https://www.zellepay.com/press-releases",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Press"
                  }),
                  F.jsx("a", {
                    href: "https://www.zellepay.com/legal",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Legal"
                  }),
                  F.jsx("a", {
                    href: "https://www.zellepay.com/privacy",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Your Privacy Rights"
                  })
                ]
              }),
              F.jsxs("nav", {
                className: "social-links",
                "aria-label": "Zelle social media",
                children: [
                  F.jsx("a", {
                    href: "https://twitter.com/Zelle",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Twitter",
                    children: F.jsx(XS, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  F.jsx("a", {
                    href: "https://www.facebook.com/Zelle",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Facebook",
                    children: F.jsx(kS, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  F.jsx("a", {
                    href: "https://www.instagram.com/zellepay/",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Instagram",
                    children: F.jsx(YS, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  F.jsx("a", {
                    href: "https://www.youtube.com/user/ZellePay",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on YouTube",
                    children: F.jsx(JS, {
                      size: 24,
                      strokeWidth: 2.2,
                      "aria-hidden": "true"
                    })
                  })
                ]
              })
            ]
          }),
          F.jsx("div", { className: "footer-rule" }),
          F.jsxs("p", {
            className: "footnote",
            children: [
              F.jsx("sup", { children: "1" }),
              " Must have a bank account in the U.S. to use Zelle",
              F.jsx("sup", { children: "®" }),
              ". Transactions typically occur in minutes when the recipient's email address or U.S. mobile number is already enrolled with Zelle",
              F.jsx("sup", { children: "®" }),
              "."
            ]
          }),
          F.jsx("p", {
            className: "copyright",
            children:
              "©2026 Early Warning Services, LLC. All rights reserved. Zelle, the Zelle related marks, and the color purple are registered trademarks or trademarks of Early Warning Services, LLC."
          })
        ]
      })
    ]
  });
}
function iT() {
  const [a, l] = z.useState([]),
    [r, s] = z.useState(""),
    [o, f] = z.useState("All"),
    [h, p] = z.useState(null),
    [v, y] = z.useState(!0),
    [g, b] = z.useState("");
  z.useEffect(() => {
    let V = !0;
    async function Z() {
      (y(!0), b(""));
      try {
        const I = await MS(),
          te = [];
        let ne = null,
          oe = !0;
        for (; oe;) {
          const se = await I.graphql?.query({
            query: $S,
            variables: { after: ne }
          });
          if (se?.errors?.length)
            throw new Error(se.errors.map((J) => J.message).join("; "));
          const Te = se?.data?.uiapi.query.Account;
          (te.push(...(Te?.edges.map((J) => IS(J.node)) || [])),
            (oe = Te?.pageInfo.hasNextPage === !0),
            (ne = Te?.pageInfo.endCursor || null));
        }
        V && l(te);
      } catch (I) {
        V && b(I instanceof Error ? I.message : "Unable to load institutions.");
      } finally {
        V && y(!1);
      }
    }
    return (
      Z(),
      () => {
        V = !1;
      }
    );
  }, []);
  const C = z.useMemo(() => eT(a, r), [a, r]),
    O = z.useMemo(() => new Set(C.map((V) => Sf(V.name))), [C]),
    U = z.useMemo(() => PS(a, r, o), [a, r, o]);
  return (
    z.useEffect(() => {
      o !== "All" && !O.has(o) && f("All");
    }, [O, o]),
    F.jsxs("main", {
      className: "app-shell",
      children: [
        F.jsx("header", {
          className: "brand-header",
          children: F.jsx("div", {
            className: "brand-inner",
            children: F.jsxs("div", {
              className: "zelle-lockup",
              "aria-label": "Zelle Find Your Bank",
              children: [
                F.jsx("a", {
                  className: "zelle-home-link",
                  href: "https://www.zellepay.com/",
                  target: "_blank",
                  rel: "noreferrer",
                  children: F.jsx("img", {
                    className: "zelle-wordmark",
                    src: hp,
                    alt: "Zelle"
                  })
                }),
                F.jsx("span", {
                  className: "lockup-divider",
                  "aria-hidden": "true"
                }),
                F.jsx("span", {
                  className: "lockup-title",
                  children: "Find Your Bank"
                })
              ]
            })
          })
        }),
        F.jsx("section", {
          className: "search-hero",
          "aria-label": "Institution search",
          children: F.jsx("div", {
            className: "search-inner",
            children: F.jsxs("label", {
              className: "search-box",
              children: [
                F.jsx(GS, {
                  className: "search-icon",
                  size: 42,
                  strokeWidth: 1.5,
                  "aria-hidden": "true"
                }),
                F.jsx("input", {
                  value: r,
                  onChange: (V) => {
                    (s(V.target.value), f("All"));
                  },
                  placeholder: "Search",
                  "aria-label": "Search by institution name or city"
                }),
                r &&
                  F.jsx("button", {
                    className: "clear-button",
                    type: "button",
                    onClick: () => s(""),
                    "aria-label": "Clear search",
                    children: F.jsx(FS, { size: 22 })
                  })
              ]
            })
          })
        }),
        F.jsx("nav", {
          className: "alphabet-band",
          "aria-label": "Filter by first letter",
          children: F.jsx("div", {
            className: "alphabet-filter",
            children: mp.map((V) => {
              const Z = O.has(V);
              return F.jsx(
                "button",
                {
                  type: "button",
                  className: o === V ? "active" : "",
                  disabled: !Z,
                  onClick: () => f(o === V ? "All" : V),
                  children: V
                },
                V
              );
            })
          })
        }),
        F.jsxs("section", {
          className: "results-summary",
          "aria-live": "polite",
          children: [
            F.jsx("strong", { children: U.length }),
            F.jsx("span", {
              children: U.length === 1 ? " institution" : " institutions"
            })
          ]
        }),
        v &&
          F.jsx("div", {
            className: "state-panel",
            children: "Loading institutions..."
          }),
        !v &&
          g &&
          F.jsxs("div", {
            className: "state-panel error",
            children: [
              F.jsx("strong", { children: "Could not load institutions." }),
              F.jsx("p", { children: g })
            ]
          }),
        !v &&
          !g &&
          U.length === 0 &&
          F.jsx("div", {
            className: "state-panel",
            children: "No matching institutions found."
          }),
        !v &&
          !g &&
          U.length > 0 &&
          F.jsx(nT, { institutions: U, onSelectInstitution: p }),
        F.jsx(lT, {}),
        h && F.jsx(aT, { institution: h, onCancel: () => p(null) })
      ]
    })
  );
}
function rT() {
  return F.jsx("main", {
    className: "app-shell",
    children: F.jsx("h1", { children: "Page not found" })
  });
}
const iy = globalThis.SFDC_ENV?.basePath,
  uT = typeof iy == "string" ? iy.replace(/\/+$/, "") : void 0,
  sT = Bb(
    [
      { path: "/", element: F.jsx(iT, {}) },
      { path: "*", element: F.jsx(rT, {}) }
    ],
    { basename: uT }
  );
_g.createRoot(document.getElementById("root")).render(
  F.jsx(z.StrictMode, { children: F.jsx(ob, { router: sT }) })
);
