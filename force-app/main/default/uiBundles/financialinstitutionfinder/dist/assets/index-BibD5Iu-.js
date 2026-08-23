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
var vo = { exports: {} },
  Pi = {};
var a0;
function gg() {
  if (a0) return Pi;
  a0 = 1;
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
  return ((Pi.Fragment = l), (Pi.jsx = r), (Pi.jsxs = r), Pi);
}
var l0;
function bg() {
  return (l0 || ((l0 = 1), (vo.exports = gg())), vo.exports);
}
var Ne = bg(),
  go = { exports: {} },
  Ee = {};
var i0;
function Eg() {
  if (i0) return Ee;
  i0 = 1;
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
    D = Symbol.iterator;
  function N(T) {
    return T === null || typeof T != "object"
      ? null
      : ((T = (D && T[D]) || T["@@iterator"]),
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
    F = Object.assign,
    X = {};
  function P(T, B, Z) {
    ((this.props = T),
      (this.context = B),
      (this.refs = X),
      (this.updater = Z || U));
  }
  ((P.prototype.isReactComponent = {}),
    (P.prototype.setState = function (T, B) {
      if (typeof T != "object" && typeof T != "function" && T != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, T, B, "setState");
    }),
    (P.prototype.forceUpdate = function (T) {
      this.updater.enqueueForceUpdate(this, T, "forceUpdate");
    }));
  function ee() {}
  ee.prototype = P.prototype;
  function ae(T, B, Z) {
    ((this.props = T),
      (this.context = B),
      (this.refs = X),
      (this.updater = Z || U));
  }
  var de = (ae.prototype = new ee());
  ((de.constructor = ae), F(de, P.prototype), (de.isPureReactComponent = !0));
  var oe = Array.isArray;
  function Oe() {}
  var J = { H: null, A: null, T: null, S: null },
    L = Object.prototype.hasOwnProperty;
  function Se(T, B, Z) {
    var $ = Z.ref;
    return {
      $$typeof: a,
      type: T,
      key: B,
      ref: $ !== void 0 ? $ : null,
      props: Z
    };
  }
  function He(T, B) {
    return Se(T.type, B, T.props);
  }
  function Xe(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function De(T) {
    var B = { "=": "=0", ":": "=2" };
    return (
      "$" +
      T.replace(/[=:]/g, function (Z) {
        return B[Z];
      })
    );
  }
  var Be = /\/+/g;
  function rt(T, B) {
    return typeof T == "object" && T !== null && T.key != null
      ? De("" + T.key)
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
            ? T.then(Oe, Oe)
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
  function x(T, B, Z, $, se) {
    var me = typeof T;
    (me === "undefined" || me === "boolean") && (T = null);
    var _e = !1;
    if (T === null) _e = !0;
    else
      switch (me) {
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
              return ((_e = T._init), x(_e(T._payload), B, Z, $, se));
          }
      }
    if (_e)
      return (
        (se = se(T)),
        (_e = $ === "" ? "." + rt(T, 0) : $),
        oe(se)
          ? ((Z = ""),
            _e != null && (Z = _e.replace(Be, "$&/") + "/"),
            x(se, B, Z, "", function (Va) {
              return Va;
            }))
          : se != null &&
            (Xe(se) &&
              (se = He(
                se,
                Z +
                  (se.key == null || (T && T.key === se.key)
                    ? ""
                    : ("" + se.key).replace(Be, "$&/") + "/") +
                  _e
              )),
            B.push(se)),
        1
      );
    _e = 0;
    var dt = $ === "" ? "." : $ + ":";
    if (oe(T))
      for (var Pe = 0; Pe < T.length; Pe++)
        (($ = T[Pe]), (me = dt + rt($, Pe)), (_e += x($, B, Z, me, se)));
    else if (((Pe = N(T)), typeof Pe == "function"))
      for (T = Pe.call(T), Pe = 0; !($ = T.next()).done;)
        (($ = $.value), (me = dt + rt($, Pe++)), (_e += x($, B, Z, me, se)));
    else if (me === "object") {
      if (typeof T.then == "function") return x(Je(T), B, Z, $, se);
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
  function Q(T, B, Z) {
    if (T == null) return T;
    var $ = [],
      se = 0;
    return (
      x(T, $, "", "", function (me) {
        return B.call(Z, me, se++);
      }),
      $
    );
  }
  function ie(T) {
    if (T._status === -1) {
      var B = T._result;
      ((B = B()),
        B.then(
          function (Z) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 1), (T._result = Z));
          },
          function (Z) {
            (T._status === 0 || T._status === -1) &&
              ((T._status = 2), (T._result = Z));
          }
        ),
        T._status === -1 && ((T._status = 0), (T._result = B)));
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var ue =
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
    ge = {
      map: Q,
      forEach: function (T, B, Z) {
        Q(
          T,
          function () {
            B.apply(this, arguments);
          },
          Z
        );
      },
      count: function (T) {
        var B = 0;
        return (
          Q(T, function () {
            B++;
          }),
          B
        );
      },
      toArray: function (T) {
        return (
          Q(T, function (B) {
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
    (Ee.Activity = b),
    (Ee.Children = ge),
    (Ee.Component = P),
    (Ee.Fragment = r),
    (Ee.Profiler = o),
    (Ee.PureComponent = ae),
    (Ee.StrictMode = s),
    (Ee.Suspense = v),
    (Ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J),
    (Ee.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (T) {
        return J.H.useMemoCache(T);
      }
    }),
    (Ee.cache = function (T) {
      return function () {
        return T.apply(null, arguments);
      };
    }),
    (Ee.cacheSignal = function () {
      return null;
    }),
    (Ee.cloneElement = function (T, B, Z) {
      if (T == null)
        throw Error(
          "The argument must be a React element, but you passed " + T + "."
        );
      var $ = F({}, T.props),
        se = T.key;
      if (B != null)
        for (me in (B.key !== void 0 && (se = "" + B.key), B))
          !L.call(B, me) ||
            me === "key" ||
            me === "__self" ||
            me === "__source" ||
            (me === "ref" && B.ref === void 0) ||
            ($[me] = B[me]);
      var me = arguments.length - 2;
      if (me === 1) $.children = Z;
      else if (1 < me) {
        for (var _e = Array(me), dt = 0; dt < me; dt++)
          _e[dt] = arguments[dt + 2];
        $.children = _e;
      }
      return Se(T.type, se, $);
    }),
    (Ee.createContext = function (T) {
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
    (Ee.createElement = function (T, B, Z) {
      var $,
        se = {},
        me = null;
      if (B != null)
        for ($ in (B.key !== void 0 && (me = "" + B.key), B))
          L.call(B, $) &&
            $ !== "key" &&
            $ !== "__self" &&
            $ !== "__source" &&
            (se[$] = B[$]);
      var _e = arguments.length - 2;
      if (_e === 1) se.children = Z;
      else if (1 < _e) {
        for (var dt = Array(_e), Pe = 0; Pe < _e; Pe++)
          dt[Pe] = arguments[Pe + 2];
        se.children = dt;
      }
      if (T && T.defaultProps)
        for ($ in ((_e = T.defaultProps), _e))
          se[$] === void 0 && (se[$] = _e[$]);
      return Se(T, me, se);
    }),
    (Ee.createRef = function () {
      return { current: null };
    }),
    (Ee.forwardRef = function (T) {
      return { $$typeof: p, render: T };
    }),
    (Ee.isValidElement = Xe),
    (Ee.lazy = function (T) {
      return { $$typeof: g, _payload: { _status: -1, _result: T }, _init: ie };
    }),
    (Ee.memo = function (T, B) {
      return { $$typeof: y, type: T, compare: B === void 0 ? null : B };
    }),
    (Ee.startTransition = function (T) {
      var B = J.T,
        Z = {};
      J.T = Z;
      try {
        var $ = T(),
          se = J.S;
        (se !== null && se(Z, $),
          typeof $ == "object" &&
            $ !== null &&
            typeof $.then == "function" &&
            $.then(Oe, ue));
      } catch (me) {
        ue(me);
      } finally {
        (B !== null && Z.types !== null && (B.types = Z.types), (J.T = B));
      }
    }),
    (Ee.unstable_useCacheRefresh = function () {
      return J.H.useCacheRefresh();
    }),
    (Ee.use = function (T) {
      return J.H.use(T);
    }),
    (Ee.useActionState = function (T, B, Z) {
      return J.H.useActionState(T, B, Z);
    }),
    (Ee.useCallback = function (T, B) {
      return J.H.useCallback(T, B);
    }),
    (Ee.useContext = function (T) {
      return J.H.useContext(T);
    }),
    (Ee.useDebugValue = function () {}),
    (Ee.useDeferredValue = function (T, B) {
      return J.H.useDeferredValue(T, B);
    }),
    (Ee.useEffect = function (T, B) {
      return J.H.useEffect(T, B);
    }),
    (Ee.useEffectEvent = function (T) {
      return J.H.useEffectEvent(T);
    }),
    (Ee.useId = function () {
      return J.H.useId();
    }),
    (Ee.useImperativeHandle = function (T, B, Z) {
      return J.H.useImperativeHandle(T, B, Z);
    }),
    (Ee.useInsertionEffect = function (T, B) {
      return J.H.useInsertionEffect(T, B);
    }),
    (Ee.useLayoutEffect = function (T, B) {
      return J.H.useLayoutEffect(T, B);
    }),
    (Ee.useMemo = function (T, B) {
      return J.H.useMemo(T, B);
    }),
    (Ee.useOptimistic = function (T, B) {
      return J.H.useOptimistic(T, B);
    }),
    (Ee.useReducer = function (T, B, Z) {
      return J.H.useReducer(T, B, Z);
    }),
    (Ee.useRef = function (T) {
      return J.H.useRef(T);
    }),
    (Ee.useState = function (T) {
      return J.H.useState(T);
    }),
    (Ee.useSyncExternalStore = function (T, B, Z) {
      return J.H.useSyncExternalStore(T, B, Z);
    }),
    (Ee.useTransition = function () {
      return J.H.useTransition();
    }),
    (Ee.version = "19.2.8"),
    Ee
  );
}
var r0;
function Ko() {
  return (r0 || ((r0 = 1), (go.exports = Eg())), go.exports);
}
var z = Ko(),
  bo = { exports: {} },
  er = {},
  Eo = { exports: {} },
  So = {};
var u0;
function Sg() {
  return (
    u0 ||
      ((u0 = 1),
      (function (a) {
        function l(x, Q) {
          var ie = x.length;
          x.push(Q);
          e: for (; 0 < ie;) {
            var ue = (ie - 1) >>> 1,
              ge = x[ue];
            if (0 < o(ge, Q)) ((x[ue] = Q), (x[ie] = ge), (ie = ue));
            else break e;
          }
        }
        function r(x) {
          return x.length === 0 ? null : x[0];
        }
        function s(x) {
          if (x.length === 0) return null;
          var Q = x[0],
            ie = x.pop();
          if (ie !== Q) {
            x[0] = ie;
            e: for (var ue = 0, ge = x.length, T = ge >>> 1; ue < T;) {
              var B = 2 * (ue + 1) - 1,
                Z = x[B],
                $ = B + 1,
                se = x[$];
              if (0 > o(Z, ie))
                $ < ge && 0 > o(se, Z)
                  ? ((x[ue] = se), (x[$] = ie), (ue = $))
                  : ((x[ue] = Z), (x[B] = ie), (ue = B));
              else if ($ < ge && 0 > o(se, ie))
                ((x[ue] = se), (x[$] = ie), (ue = $));
              else break e;
            }
          }
          return Q;
        }
        function o(x, Q) {
          var ie = x.sortIndex - Q.sortIndex;
          return ie !== 0 ? ie : x.id - Q.id;
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
          D = 3,
          N = !1,
          U = !1,
          F = !1,
          X = !1,
          P = typeof setTimeout == "function" ? setTimeout : null,
          ee = typeof clearTimeout == "function" ? clearTimeout : null,
          ae = typeof setImmediate < "u" ? setImmediate : null;
        function de(x) {
          for (var Q = r(y); Q !== null;) {
            if (Q.callback === null) s(y);
            else if (Q.startTime <= x)
              (s(y), (Q.sortIndex = Q.expirationTime), l(v, Q));
            else break;
            Q = r(y);
          }
        }
        function oe(x) {
          if (((F = !1), de(x), !U))
            if (r(v) !== null) ((U = !0), Oe || ((Oe = !0), De()));
            else {
              var Q = r(y);
              Q !== null && Je(oe, Q.startTime - x);
            }
        }
        var Oe = !1,
          J = -1,
          L = 5,
          Se = -1;
        function He() {
          return X ? !0 : !(a.unstable_now() - Se < L);
        }
        function Xe() {
          if (((X = !1), Oe)) {
            var x = a.unstable_now();
            Se = x;
            var Q = !0;
            try {
              e: {
                ((U = !1), F && ((F = !1), ee(J), (J = -1)), (N = !0));
                var ie = D;
                try {
                  t: {
                    for (
                      de(x), b = r(v);
                      b !== null && !(b.expirationTime > x && He());
                    ) {
                      var ue = b.callback;
                      if (typeof ue == "function") {
                        ((b.callback = null), (D = b.priorityLevel));
                        var ge = ue(b.expirationTime <= x);
                        if (((x = a.unstable_now()), typeof ge == "function")) {
                          ((b.callback = ge), de(x), (Q = !0));
                          break t;
                        }
                        (b === r(v) && s(v), de(x));
                      } else s(v);
                      b = r(v);
                    }
                    if (b !== null) Q = !0;
                    else {
                      var T = r(y);
                      (T !== null && Je(oe, T.startTime - x), (Q = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (D = ie), (N = !1));
                }
                Q = void 0;
              }
            } finally {
              Q ? De() : (Oe = !1);
            }
          }
        }
        var De;
        if (typeof ae == "function")
          De = function () {
            ae(Xe);
          };
        else if (typeof MessageChannel < "u") {
          var Be = new MessageChannel(),
            rt = Be.port2;
          ((Be.port1.onmessage = Xe),
            (De = function () {
              rt.postMessage(null);
            }));
        } else
          De = function () {
            P(Xe, 0);
          };
        function Je(x, Q) {
          J = P(function () {
            x(a.unstable_now());
          }, Q);
        }
        ((a.unstable_IdlePriority = 5),
          (a.unstable_ImmediatePriority = 1),
          (a.unstable_LowPriority = 4),
          (a.unstable_NormalPriority = 3),
          (a.unstable_Profiling = null),
          (a.unstable_UserBlockingPriority = 2),
          (a.unstable_cancelCallback = function (x) {
            x.callback = null;
          }),
          (a.unstable_forceFrameRate = function (x) {
            0 > x || 125 < x
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (L = 0 < x ? Math.floor(1e3 / x) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return D;
          }),
          (a.unstable_next = function (x) {
            switch (D) {
              case 1:
              case 2:
              case 3:
                var Q = 3;
                break;
              default:
                Q = D;
            }
            var ie = D;
            D = Q;
            try {
              return x();
            } finally {
              D = ie;
            }
          }),
          (a.unstable_requestPaint = function () {
            X = !0;
          }),
          (a.unstable_runWithPriority = function (x, Q) {
            switch (x) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                x = 3;
            }
            var ie = D;
            D = x;
            try {
              return Q();
            } finally {
              D = ie;
            }
          }),
          (a.unstable_scheduleCallback = function (x, Q, ie) {
            var ue = a.unstable_now();
            switch (
              (typeof ie == "object" && ie !== null
                ? ((ie = ie.delay),
                  (ie = typeof ie == "number" && 0 < ie ? ue + ie : ue))
                : (ie = ue),
              x)
            ) {
              case 1:
                var ge = -1;
                break;
              case 2:
                ge = 250;
                break;
              case 5:
                ge = 1073741823;
                break;
              case 4:
                ge = 1e4;
                break;
              default:
                ge = 5e3;
            }
            return (
              (ge = ie + ge),
              (x = {
                id: g++,
                callback: Q,
                priorityLevel: x,
                startTime: ie,
                expirationTime: ge,
                sortIndex: -1
              }),
              ie > ue
                ? ((x.sortIndex = ie),
                  l(y, x),
                  r(v) === null &&
                    x === r(y) &&
                    (F ? (ee(J), (J = -1)) : (F = !0), Je(oe, ie - ue)))
                : ((x.sortIndex = ge),
                  l(v, x),
                  U || N || ((U = !0), Oe || ((Oe = !0), De()))),
              x
            );
          }),
          (a.unstable_shouldYield = He),
          (a.unstable_wrapCallback = function (x) {
            var Q = D;
            return function () {
              var ie = D;
              D = Q;
              try {
                return x.apply(this, arguments);
              } finally {
                D = ie;
              }
            };
          }));
      })(So)),
    So
  );
}
var s0;
function Tg() {
  return (s0 || ((s0 = 1), (Eo.exports = Sg())), Eo.exports);
}
var To = { exports: {} },
  Mt = {};
var c0;
function Rg() {
  if (c0) return Mt;
  c0 = 1;
  var a = Ko();
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
    (Mt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s),
    (Mt.createPortal = function (v, y) {
      var g =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(l(299));
      return f(v, y, null, g);
    }),
    (Mt.flushSync = function (v) {
      var y = h.T,
        g = s.p;
      try {
        if (((h.T = null), (s.p = 2), v)) return v();
      } finally {
        ((h.T = y), (s.p = g), s.d.f());
      }
    }),
    (Mt.preconnect = function (v, y) {
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
    (Mt.prefetchDNS = function (v) {
      typeof v == "string" && s.d.D(v);
    }),
    (Mt.preinit = function (v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var g = y.as,
          b = p(g, y.crossOrigin),
          D = typeof y.integrity == "string" ? y.integrity : void 0,
          N = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        g === "style"
          ? s.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: b,
              integrity: D,
              fetchPriority: N
            })
          : g === "script" &&
            s.d.X(v, {
              crossOrigin: b,
              integrity: D,
              fetchPriority: N,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0
            });
      }
    }),
    (Mt.preinitModule = function (v, y) {
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
    (Mt.preload = function (v, y) {
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
    (Mt.preloadModule = function (v, y) {
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
    (Mt.requestFormReset = function (v) {
      s.d.r(v);
    }),
    (Mt.unstable_batchedUpdates = function (v, y) {
      return v(y);
    }),
    (Mt.useFormState = function (v, y, g) {
      return h.H.useFormState(v, y, g);
    }),
    (Mt.useFormStatus = function () {
      return h.H.useHostTransitionStatus();
    }),
    (Mt.version = "19.2.8"),
    Mt
  );
}
var o0;
function Ag() {
  if (o0) return To.exports;
  o0 = 1;
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
  return (a(), (To.exports = Rg()), To.exports);
}
var f0;
function Og() {
  if (f0) return er;
  f0 = 1;
  var a = Tg(),
    l = Ko(),
    r = Ag();
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
    D = Symbol.for("react.element"),
    N = Symbol.for("react.transitional.element"),
    U = Symbol.for("react.portal"),
    F = Symbol.for("react.fragment"),
    X = Symbol.for("react.strict_mode"),
    P = Symbol.for("react.profiler"),
    ee = Symbol.for("react.consumer"),
    ae = Symbol.for("react.context"),
    de = Symbol.for("react.forward_ref"),
    oe = Symbol.for("react.suspense"),
    Oe = Symbol.for("react.suspense_list"),
    J = Symbol.for("react.memo"),
    L = Symbol.for("react.lazy"),
    Se = Symbol.for("react.activity"),
    He = Symbol.for("react.memo_cache_sentinel"),
    Xe = Symbol.iterator;
  function De(e) {
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
      case F:
        return "Fragment";
      case P:
        return "Profiler";
      case X:
        return "StrictMode";
      case oe:
        return "Suspense";
      case Oe:
        return "SuspenseList";
      case Se:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case U:
          return "Portal";
        case ae:
          return e.displayName || "Context";
        case ee:
          return (e._context.displayName || "Context") + ".Consumer";
        case de:
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
    x = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ie = { pending: !1, data: null, method: null, action: null },
    ue = [],
    ge = -1;
  function T(e) {
    return { current: e };
  }
  function B(e) {
    0 > ge || ((e.current = ue[ge]), (ue[ge] = null), ge--);
  }
  function Z(e, t) {
    (ge++, (ue[ge] = e.current), (e.current = t));
  }
  var $ = T(null),
    se = T(null),
    me = T(null),
    _e = T(null);
  function dt(e, t) {
    switch ((Z(me, t), Z(se, e), Z($, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Dm(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Dm(t)), (e = Nm(t, e)));
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
    (B($), Z($, e));
  }
  function Pe() {
    (B($), B(se), B(me));
  }
  function Va(e) {
    e.memoizedState !== null && Z(_e, e);
    var t = $.current,
      n = Nm(t, e.type);
    t !== n && (Z(se, e), Z($, n));
  }
  function hl(e) {
    (se.current === e && (B($), B(se)),
      _e.current === e && (B(_e), (Ji._currentValue = ie)));
  }
  var ri, gt;
  function Ht(e) {
    if (ri === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((ri = (t && t[1]) || ""),
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
      ri +
      e +
      gt
    );
  }
  var ml = !1;
  function ui(e, t) {
    if (!e || ml) return "";
    ml = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var Y = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Y.prototype, "props", {
                  set: function () {
                    throw Error();
                  }
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Y, []);
                } catch (j) {
                  var w = j;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (j) {
                  w = j;
                }
                e.call(Y.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (j) {
                w = j;
              }
              (Y = e()) &&
                typeof Y.catch == "function" &&
                Y.catch(function () {});
            }
          } catch (j) {
            if (j && w && typeof j.stack == "string") return [j.stack, w.stack];
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
          M = m.split(`
`);
        for (
          u = i = 0;
          i < E.length && !E[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; u < M.length && !M[u].includes("DetermineComponentFrameRoot");)
          u++;
        if (i === E.length || u === M.length)
          for (
            i = E.length - 1, u = M.length - 1;
            1 <= i && 0 <= u && E[i] !== M[u];
          )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (E[i] !== M[u]) {
            if (i !== 1 || u !== 1)
              do
                if ((i--, u--, 0 > u || E[i] !== M[u])) {
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
        return ui(e.type, !1);
      case 11:
        return ui(e.type.render, !1);
      case 1:
        return ui(e.type, !0);
      case 31:
        return Ht("Activity");
      default:
        return "";
    }
  }
  function Rr(e) {
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
  var si = Object.prototype.hasOwnProperty,
    yl = a.unstable_scheduleCallback,
    ci = a.unstable_cancelCallback,
    ls = a.unstable_shouldYield,
    is = a.unstable_requestPaint,
    wt = a.unstable_now,
    jn = a.unstable_getCurrentPriorityLevel,
    fa = a.unstable_ImmediatePriority,
    oi = a.unstable_UserBlockingPriority,
    da = a.unstable_NormalPriority,
    mn = a.unstable_LowPriority,
    Pt = a.unstable_IdlePriority,
    rs = a.log,
    us = a.unstable_setDisableYieldValue,
    Hn = null,
    zt = null;
  function St(e) {
    if (
      (typeof rs == "function" && us(e),
      zt && typeof zt.setStrictMode == "function")
    )
      try {
        zt.setStrictMode(Hn, e);
      } catch {}
  }
  var _t = Math.clz32 ? Math.clz32 : ss,
    Ar = Math.log,
    Or = Math.LN2;
  function ss(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ar(e) / Or) | 0)) | 0);
  }
  var ka = 256,
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
  function cs(e, t) {
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
  function fi() {
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
  function Dr(e, t, n, i, u, c) {
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
      M = e.hiddenUpdates;
    for (n = d & ~n; 0 < n;) {
      var H = 31 - _t(n),
        Y = 1 << H;
      ((m[H] = 0), (E[H] = -1));
      var w = M[H];
      if (w !== null)
        for (M[H] = null, H = 0; H < w.length; H++) {
          var j = w[H];
          j !== null && (j.lane &= -536870913);
        }
      n &= ~Y;
    }
    (i !== 0 && Nr(e, i, 0),
      c !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(d & ~t)));
  }
  function Nr(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var i = 31 - _t(t);
    ((e.entangledLanes |= t),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (n & 261930)));
  }
  function Cr(e, t) {
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
  function C(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function k() {
    var e = Q.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : $m(e.type));
  }
  function G(e, t) {
    var n = Q.p;
    try {
      return ((Q.p = e), t());
    } finally {
      Q.p = n;
    }
  }
  var te = Math.random().toString(36).slice(2),
    W = "__reactFiber$" + te,
    K = "__reactProps$" + te,
    I = "__reactContainer$" + te,
    pe = "__reactEvents$" + te,
    fe = "__reactListeners$" + te,
    he = "__reactHandles$" + te,
    Me = "__reactResources$" + te,
    Fe = "__reactMarker$" + te;
  function qe(e) {
    (delete e[W], delete e[K], delete e[pe], delete e[fe], delete e[he]);
  }
  function tt(e) {
    var t = e[W];
    if (t) return t;
    for (var n = e.parentNode; n;) {
      if ((t = n[I] || n[W])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = Um(e); e !== null;) {
            if ((n = e[W])) return n;
            e = Um(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function Te(e) {
    if ((e = e[W] || e[I])) {
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
    var t = e[Me];
    return (
      t ||
        (t = e[Me] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function ke(e) {
    e[Fe] = !0;
  }
  var pn = new Set(),
    qn = {};
  function en(e, t) {
    (bt(e, t), bt(e + "Capture", t));
  }
  function bt(e, t) {
    for (qn[e] = t, e = 0; e < t.length; e++) pn.add(t[e]);
  }
  var ya = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Yn = {},
    Vn = {};
  function vl(e) {
    return si.call(Vn, e)
      ? !0
      : si.call(Yn, e)
        ? !1
        : ya.test(e)
          ? (Vn[e] = !0)
          : ((Yn[e] = !0), !1);
  }
  function kn(e, t, n) {
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
  function be(e, t, n, i) {
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
  var _r = /[\n"\\]/g;
  function Bt(e) {
    return e.replace(_r, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function os(e, t, n, i, u, c, d, m) {
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
        ? fs(e, d, Ge(t))
        : n != null
          ? fs(e, d, Ge(n))
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
  function Ef(e, t, n, i, u, c, d, m) {
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
  function fs(e, t, n) {
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
  function Sf(e, t, n) {
    if (
      t != null &&
      ((t = "" + Ge(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ge(n) : "";
  }
  function Tf(e, t, n, i) {
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
  var hp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Rf(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : i
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || hp.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function Af(e, t, n) {
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
        ((i = t[u]), t.hasOwnProperty(u) && n[u] !== i && Rf(e, u, i));
    } else for (var c in t) t.hasOwnProperty(c) && Rf(e, c, t[c]);
  }
  function ds(e) {
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
  var mp = new Map([
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
    yp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Mr(e) {
    return yp.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Qn() {}
  var hs = null;
  function ms(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var El = null,
    Sl = null;
  function Of(e) {
    var t = Te(e);
    if (t && (e = t.stateNode)) {
      var n = e[K] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (os(
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
                var u = i[K] || null;
                if (!u) throw Error(s(90));
                os(
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
          Sf(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && gl(e, !!n.multiple, t, !1));
      }
    }
  }
  var ys = !1;
  function Df(e, t, n) {
    if (ys) return e(t, n);
    ys = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (
        ((ys = !1),
        (El !== null || Sl !== null) &&
          (vu(), El && ((t = El), (e = Sl), (Sl = El = null), Of(t), e)))
      )
        for (t = 0; t < e.length; t++) Of(e[t]);
    }
  }
  function di(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[K] || null;
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
    ps = !1;
  if (Xn)
    try {
      var hi = {};
      (Object.defineProperty(hi, "passive", {
        get: function () {
          ps = !0;
        }
      }),
        window.addEventListener("test", hi, hi),
        window.removeEventListener("test", hi, hi));
    } catch {
      ps = !1;
    }
  var va = null,
    vs = null,
    xr = null;
  function Nf() {
    if (xr) return xr;
    var e,
      t = vs,
      n = t.length,
      i,
      u = "value" in va ? va.value : va.textContent,
      c = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++);
    var d = n - e;
    for (i = 1; i <= d && t[n - i] === u[c - i]; i++);
    return (xr = u.slice(e, 1 < i ? 1 - i : void 0));
  }
  function wr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function zr() {
    return !0;
  }
  function Cf() {
    return !1;
  }
  function qt(e) {
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
          ? zr
          : Cf),
        (this.isPropagationStopped = Cf),
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
            (this.isDefaultPrevented = zr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = zr));
        },
        persist: function () {},
        isPersistent: zr
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
    Ur = qt(Xa),
    mi = b({}, Xa, { view: 0, detail: 0 }),
    pp = qt(mi),
    gs,
    bs,
    yi,
    Lr = b({}, mi, {
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
      getModifierState: Ss,
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
          : (e !== yi &&
              (yi && e.type === "mousemove"
                ? ((gs = e.screenX - yi.screenX), (bs = e.screenY - yi.screenY))
                : (bs = gs = 0),
              (yi = e)),
            gs);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : bs;
      }
    }),
    _f = qt(Lr),
    vp = b({}, Lr, { dataTransfer: 0 }),
    gp = qt(vp),
    bp = b({}, mi, { relatedTarget: 0 }),
    Es = qt(bp),
    Ep = b({}, Xa, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Sp = qt(Ep),
    Tp = b({}, Xa, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }),
    Rp = qt(Tp),
    Ap = b({}, Xa, { data: 0 }),
    Mf = qt(Ap),
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
    Np = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
  function Cp(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Np[e])
        ? !!t[e]
        : !1;
  }
  function Ss() {
    return Cp;
  }
  var _p = b({}, mi, {
      key: function (e) {
        if (e.key) {
          var t = Op[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = wr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
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
      getModifierState: Ss,
      charCode: function (e) {
        return e.type === "keypress" ? wr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? wr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      }
    }),
    Mp = qt(_p),
    xp = b({}, Lr, {
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
    xf = qt(xp),
    wp = b({}, mi, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Ss
    }),
    zp = qt(wp),
    Up = b({}, Xa, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Lp = qt(Up),
    jp = b({}, Lr, {
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
    Hp = qt(jp),
    Bp = b({}, Xa, { newState: 0, oldState: 0 }),
    qp = qt(Bp),
    Yp = [9, 13, 27, 32],
    Ts = Xn && "CompositionEvent" in window,
    pi = null;
  Xn && "documentMode" in document && (pi = document.documentMode);
  var Vp = Xn && "TextEvent" in window && !pi,
    wf = Xn && (!Ts || (pi && 8 < pi && 11 >= pi)),
    zf = " ",
    Uf = !1;
  function Lf(e, t) {
    switch (e) {
      case "keyup":
        return Yp.indexOf(t.keyCode) !== -1;
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
  function jf(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Tl = !1;
  function kp(e, t) {
    switch (e) {
      case "compositionend":
        return jf(t);
      case "keypress":
        return t.which !== 32 ? null : ((Uf = !0), zf);
      case "textInput":
        return ((e = t.data), e === zf && Uf ? null : e);
      default:
        return null;
    }
  }
  function Gp(e, t) {
    if (Tl)
      return e === "compositionend" || (!Ts && Lf(e, t))
        ? ((e = Nf()), (xr = vs = va = null), (Tl = !1), e)
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
        return wf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Qp = {
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
  function Hf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Qp[e.type] : t === "textarea";
  }
  function Bf(e, t, n, i) {
    (El ? (Sl ? Sl.push(i) : (Sl = [i])) : (El = i),
      (t = Au(t, "onChange")),
      0 < t.length &&
        ((n = new Ur("onChange", "change", null, n, i)),
        e.push({ event: n, listeners: t })));
  }
  var vi = null,
    gi = null;
  function Xp(e) {
    Em(e, 0);
  }
  function jr(e) {
    var t = Ut(e);
    if (nt(t)) return e;
  }
  function qf(e, t) {
    if (e === "change") return t;
  }
  var Yf = !1;
  if (Xn) {
    var Rs;
    if (Xn) {
      var As = "oninput" in document;
      if (!As) {
        var Vf = document.createElement("div");
        (Vf.setAttribute("oninput", "return;"),
          (As = typeof Vf.oninput == "function"));
      }
      Rs = As;
    } else Rs = !1;
    Yf = Rs && (!document.documentMode || 9 < document.documentMode);
  }
  function kf() {
    vi && (vi.detachEvent("onpropertychange", Gf), (gi = vi = null));
  }
  function Gf(e) {
    if (e.propertyName === "value" && jr(gi)) {
      var t = [];
      (Bf(t, gi, e, ms(e)), Df(Xp, t));
    }
  }
  function Fp(e, t, n) {
    e === "focusin"
      ? (kf(), (vi = t), (gi = n), vi.attachEvent("onpropertychange", Gf))
      : e === "focusout" && kf();
  }
  function Zp(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return jr(gi);
  }
  function Kp(e, t) {
    if (e === "click") return jr(t);
  }
  function Jp(e, t) {
    if (e === "input" || e === "change") return jr(t);
  }
  function $p(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Xt = typeof Object.is == "function" ? Object.is : $p;
  function bi(e, t) {
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
      if (!si.call(t, u) || !Xt(e[u], t[u])) return !1;
    }
    return !0;
  }
  function Qf(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function Xf(e, t) {
    var n = Qf(e);
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
      n = Qf(n);
    }
  }
  function Ff(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Ff(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Zf(e) {
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
  function Os(e) {
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
  var Ip = Xn && "documentMode" in document && 11 >= document.documentMode,
    Rl = null,
    Ds = null,
    Ei = null,
    Ns = !1;
  function Kf(e, t, n) {
    var i =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ns ||
      Rl == null ||
      Rl !== nn(i) ||
      ((i = Rl),
      "selectionStart" in i && Os(i)
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
      (Ei && bi(Ei, i)) ||
        ((Ei = i),
        (i = Au(Ds, "onSelect")),
        0 < i.length &&
          ((t = new Ur("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: i }),
          (t.target = Rl))));
  }
  function Fa(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var Al = {
      animationend: Fa("Animation", "AnimationEnd"),
      animationiteration: Fa("Animation", "AnimationIteration"),
      animationstart: Fa("Animation", "AnimationStart"),
      transitionrun: Fa("Transition", "TransitionRun"),
      transitionstart: Fa("Transition", "TransitionStart"),
      transitioncancel: Fa("Transition", "TransitionCancel"),
      transitionend: Fa("Transition", "TransitionEnd")
    },
    Cs = {},
    Jf = {};
  Xn &&
    ((Jf = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Al.animationend.animation,
      delete Al.animationiteration.animation,
      delete Al.animationstart.animation),
    "TransitionEvent" in window || delete Al.transitionend.transition);
  function Za(e) {
    if (Cs[e]) return Cs[e];
    if (!Al[e]) return e;
    var t = Al[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Jf) return (Cs[e] = t[n]);
    return e;
  }
  var $f = Za("animationend"),
    If = Za("animationiteration"),
    Wf = Za("animationstart"),
    Wp = Za("transitionrun"),
    Pp = Za("transitionstart"),
    ev = Za("transitioncancel"),
    Pf = Za("transitionend"),
    ed = new Map(),
    _s =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  _s.push("scrollEnd");
  function vn(e, t) {
    (ed.set(e, t), en(t, [e]));
  }
  var Hr =
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
    Ol = 0,
    Ms = 0;
  function Br() {
    for (var e = Ol, t = (Ms = Ol = 0); t < e;) {
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
      c !== 0 && td(n, u, c);
    }
  }
  function qr(e, t, n, i) {
    ((an[Ol++] = e),
      (an[Ol++] = t),
      (an[Ol++] = n),
      (an[Ol++] = i),
      (Ms |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function xs(e, t, n, i) {
    return (qr(e, t, n, i), Yr(e));
  }
  function Ka(e, t) {
    return (qr(e, null, null, t), Yr(e));
  }
  function td(e, t, n) {
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
    if (50 < ki) throw ((ki = 0), (Yc = null), Error(s(185)));
    for (var t = e.return; t !== null;) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Dl = {};
  function tv(e, t, n, i) {
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
  function Ft(e, t, n, i) {
    return new tv(e, t, n, i);
  }
  function ws(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Fn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Ft(e.tag, t, e.key, e.mode)),
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
  function nd(e, t) {
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
    if (((i = e), typeof e == "function")) ws(e) && (d = 1);
    else if (typeof e == "string")
      d = rg(e, n, $.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case Se:
          return (
            (e = Ft(31, n, t, u)),
            (e.elementType = Se),
            (e.lanes = c),
            e
          );
        case F:
          return Ja(n.children, u, c, t);
        case X:
          ((d = 8), (u |= 24));
          break;
        case P:
          return (
            (e = Ft(12, n, t, u | 2)),
            (e.elementType = P),
            (e.lanes = c),
            e
          );
        case oe:
          return (
            (e = Ft(13, n, t, u)),
            (e.elementType = oe),
            (e.lanes = c),
            e
          );
        case Oe:
          return (
            (e = Ft(19, n, t, u)),
            (e.elementType = Oe),
            (e.lanes = c),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ae:
                d = 10;
                break e;
              case ee:
                d = 9;
                break e;
              case de:
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
      (t = Ft(d, n, t, u)),
      (t.elementType = e),
      (t.type = i),
      (t.lanes = c),
      t
    );
  }
  function Ja(e, t, n, i) {
    return ((e = Ft(7, e, i, t)), (e.lanes = n), e);
  }
  function zs(e, t, n) {
    return ((e = Ft(6, e, null, t)), (e.lanes = n), e);
  }
  function ad(e) {
    var t = Ft(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Us(e, t, n) {
    return (
      (t = Ft(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }),
      t
    );
  }
  var ld = new WeakMap();
  function ln(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = ld.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Rr(t) }), ld.set(e, t), t);
    }
    return { value: e, source: t, stack: Rr(t) };
  }
  var Nl = [],
    Cl = 0,
    kr = null,
    Si = 0,
    rn = [],
    un = 0,
    ga = null,
    On = 1,
    Dn = "";
  function Zn(e, t) {
    ((Nl[Cl++] = Si), (Nl[Cl++] = kr), (kr = e), (Si = t));
  }
  function id(e, t, n) {
    ((rn[un++] = On), (rn[un++] = Dn), (rn[un++] = ga), (ga = e));
    var i = On;
    e = Dn;
    var u = 32 - _t(i) - 1;
    ((i &= ~(1 << u)), (n += 1));
    var c = 32 - _t(t) + u;
    if (30 < c) {
      var d = u - (u % 5);
      ((c = (i & ((1 << d) - 1)).toString(32)),
        (i >>= d),
        (u -= d),
        (On = (1 << (32 - _t(t) + u)) | (n << u) | i),
        (Dn = c + e));
    } else ((On = (1 << c) | (n << u) | i), (Dn = e));
  }
  function Ls(e) {
    e.return !== null && (Zn(e, 1), id(e, 1, 0));
  }
  function js(e) {
    for (; e === kr;)
      ((kr = Nl[--Cl]), (Nl[Cl] = null), (Si = Nl[--Cl]), (Nl[Cl] = null));
    for (; e === ga;)
      ((ga = rn[--un]),
        (rn[un] = null),
        (Dn = rn[--un]),
        (rn[un] = null),
        (On = rn[--un]),
        (rn[un] = null));
  }
  function rd(e, t) {
    ((rn[un++] = On),
      (rn[un++] = Dn),
      (rn[un++] = ga),
      (On = t.id),
      (Dn = t.overflow),
      (ga = e));
  }
  var Ot = null,
    at = null,
    je = !1,
    ba = null,
    sn = !1,
    Hs = Error(s(519));
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
    throw (Ti(ln(t, e)), Hs);
  }
  function ud(e) {
    var t = e.stateNode,
      n = e.type,
      i = e.memoizedProps;
    switch (((t[W] = e), (t[K] = i), n)) {
      case "dialog":
        (we("cancel", t), we("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        we("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Qi.length; n++) we(Qi[n], t);
        break;
      case "source":
        we("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (we("error", t), we("load", t));
        break;
      case "details":
        we("toggle", t);
        break;
      case "input":
        (we("invalid", t),
          Ef(
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
        we("invalid", t);
        break;
      case "textarea":
        (we("invalid", t), Tf(t, i.value, i.defaultValue, i.children));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      Am(t.textContent, n)
        ? (i.popover != null && (we("beforetoggle", t), we("toggle", t)),
          i.onScroll != null && we("scroll", t),
          i.onScrollEnd != null && we("scrollend", t),
          i.onClick != null && (t.onclick = Qn),
          (t = !0))
        : (t = !1),
      t || Ea(e, !0));
  }
  function sd(e) {
    for (Ot = e.return; Ot;)
      switch (Ot.tag) {
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
          Ot = Ot.return;
      }
  }
  function _l(e) {
    if (e !== Ot) return !1;
    if (!je) return (sd(e), (je = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || to(e.type, e.memoizedProps))),
        (n = !n)),
      n && at && Ea(e),
      sd(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      at = zm(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(s(317));
      at = zm(e);
    } else
      t === 27
        ? ((t = at), Ua(e.type) ? ((e = ro), (ro = null), (at = e)) : (at = t))
        : (at = Ot ? on(e.stateNode.nextSibling) : null);
    return !0;
  }
  function $a() {
    ((at = Ot = null), (je = !1));
  }
  function Bs() {
    var e = ba;
    return (
      e !== null &&
        (Gt === null ? (Gt = e) : Gt.push.apply(Gt, e), (ba = null)),
      e
    );
  }
  function Ti(e) {
    ba === null ? (ba = [e]) : ba.push(e);
  }
  var qs = T(null),
    Ia = null,
    Kn = null;
  function Sa(e, t, n) {
    (Z(qs, t._currentValue), (t._currentValue = n));
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
  function Ml(e, t, n, i) {
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
          (e !== null ? e.push(Ji) : (e = [Ji]));
      }
      u = u.return;
    }
    (e !== null && Vs(t, e, n, i), (t.flags |= 262144));
  }
  function Gr(e) {
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
  function Dt(e) {
    return cd(Ia, e);
  }
  function Qr(e, t) {
    return (Ia === null && Wa(e), cd(e, t));
  }
  function cd(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), Kn === null)) {
      if (e === null) throw Error(s(308));
      ((Kn = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else Kn = Kn.next = t;
    return n;
  }
  var nv =
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
    av = a.unstable_scheduleCallback,
    lv = a.unstable_NormalPriority,
    ht = {
      $$typeof: ae,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
  function ks() {
    return { controller: new nv(), data: new Map(), refCount: 0 };
  }
  function Ri(e) {
    (e.refCount--,
      e.refCount === 0 &&
        av(lv, function () {
          e.controller.abort();
        }));
  }
  var Ai = null,
    Gs = 0,
    xl = 0,
    wl = null;
  function iv(e, t) {
    if (Ai === null) {
      var n = (Ai = []);
      ((Gs = 0),
        (xl = Fc()),
        (wl = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          }
        }));
    }
    return (Gs++, t.then(od, od), t);
  }
  function od() {
    if (--Gs === 0 && Ai !== null) {
      wl !== null && (wl.status = "fulfilled");
      var e = Ai;
      ((Ai = null), (xl = 0), (wl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function rv(e, t) {
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
  var fd = x.S;
  x.S = function (e, t) {
    ((Kh = wt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        iv(e, t),
      fd !== null && fd(e, t));
  };
  var Pa = T(null);
  function Qs() {
    var e = Pa.current;
    return e !== null ? e : et.pooledCache;
  }
  function Xr(e, t) {
    t === null ? Z(Pa, Pa.current) : Z(Pa, t.pool);
  }
  function dd() {
    var e = Qs();
    return e === null ? null : { parent: ht._currentValue, pool: e };
  }
  var zl = Error(s(460)),
    Xs = Error(s(474)),
    Fr = Error(s(542)),
    Zr = { then: function () {} };
  function hd(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function md(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Qn, Qn), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), pd(e), e);
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
            throw ((e = t.reason), pd(e), e);
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
  function yd() {
    if (tl === null) throw Error(s(459));
    var e = tl;
    return ((tl = null), e);
  }
  function pd(e) {
    if (e === zl || e === Fr) throw Error(s(483));
  }
  var Ul = null,
    Oi = 0;
  function Kr(e) {
    var t = Oi;
    return ((Oi += 1), Ul === null && (Ul = []), md(Ul, e, t));
  }
  function Di(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function Jr(e, t) {
    throw t.$$typeof === D
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
  function vd(e) {
    function t(O, R) {
      if (e) {
        var _ = O.deletions;
        _ === null ? ((O.deletions = [R]), (O.flags |= 16)) : _.push(R);
      }
    }
    function n(O, R) {
      if (!e) return null;
      for (; R !== null;) (t(O, R), (R = R.sibling));
      return null;
    }
    function i(O) {
      for (var R = new Map(); O !== null;)
        (O.key !== null ? R.set(O.key, O) : R.set(O.index, O), (O = O.sibling));
      return R;
    }
    function u(O, R) {
      return ((O = Fn(O, R)), (O.index = 0), (O.sibling = null), O);
    }
    function c(O, R, _) {
      return (
        (O.index = _),
        e
          ? ((_ = O.alternate),
            _ !== null
              ? ((_ = _.index), _ < R ? ((O.flags |= 67108866), R) : _)
              : ((O.flags |= 67108866), R))
          : ((O.flags |= 1048576), R)
      );
    }
    function d(O) {
      return (e && O.alternate === null && (O.flags |= 67108866), O);
    }
    function m(O, R, _, q) {
      return R === null || R.tag !== 6
        ? ((R = zs(_, O.mode, q)), (R.return = O), R)
        : ((R = u(R, _)), (R.return = O), R);
    }
    function E(O, R, _, q) {
      var ce = _.type;
      return ce === F
        ? H(O, R, _.props.children, q, _.key)
        : R !== null &&
            (R.elementType === ce ||
              (typeof ce == "object" &&
                ce !== null &&
                ce.$$typeof === L &&
                el(ce) === R.type))
          ? ((R = u(R, _.props)), Di(R, _), (R.return = O), R)
          : ((R = Vr(_.type, _.key, _.props, null, O.mode, q)),
            Di(R, _),
            (R.return = O),
            R);
    }
    function M(O, R, _, q) {
      return R === null ||
        R.tag !== 4 ||
        R.stateNode.containerInfo !== _.containerInfo ||
        R.stateNode.implementation !== _.implementation
        ? ((R = Us(_, O.mode, q)), (R.return = O), R)
        : ((R = u(R, _.children || [])), (R.return = O), R);
    }
    function H(O, R, _, q, ce) {
      return R === null || R.tag !== 7
        ? ((R = Ja(_, O.mode, q, ce)), (R.return = O), R)
        : ((R = u(R, _)), (R.return = O), R);
    }
    function Y(O, R, _) {
      if (
        (typeof R == "string" && R !== "") ||
        typeof R == "number" ||
        typeof R == "bigint"
      )
        return ((R = zs("" + R, O.mode, _)), (R.return = O), R);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case N:
            return (
              (_ = Vr(R.type, R.key, R.props, null, O.mode, _)),
              Di(_, R),
              (_.return = O),
              _
            );
          case U:
            return ((R = Us(R, O.mode, _)), (R.return = O), R);
          case L:
            return ((R = el(R)), Y(O, R, _));
        }
        if (Je(R) || De(R))
          return ((R = Ja(R, O.mode, _, null)), (R.return = O), R);
        if (typeof R.then == "function") return Y(O, Kr(R), _);
        if (R.$$typeof === ae) return Y(O, Qr(O, R), _);
        Jr(O, R);
      }
      return null;
    }
    function w(O, R, _, q) {
      var ce = R !== null ? R.key : null;
      if (
        (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
      )
        return ce !== null ? null : m(O, R, "" + _, q);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case N:
            return _.key === ce ? E(O, R, _, q) : null;
          case U:
            return _.key === ce ? M(O, R, _, q) : null;
          case L:
            return ((_ = el(_)), w(O, R, _, q));
        }
        if (Je(_) || De(_)) return ce !== null ? null : H(O, R, _, q, null);
        if (typeof _.then == "function") return w(O, R, Kr(_), q);
        if (_.$$typeof === ae) return w(O, R, Qr(O, _), q);
        Jr(O, _);
      }
      return null;
    }
    function j(O, R, _, q, ce) {
      if (
        (typeof q == "string" && q !== "") ||
        typeof q == "number" ||
        typeof q == "bigint"
      )
        return ((O = O.get(_) || null), m(R, O, "" + q, ce));
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case N:
            return (
              (O = O.get(q.key === null ? _ : q.key) || null),
              E(R, O, q, ce)
            );
          case U:
            return (
              (O = O.get(q.key === null ? _ : q.key) || null),
              M(R, O, q, ce)
            );
          case L:
            return ((q = el(q)), j(O, R, _, q, ce));
        }
        if (Je(q) || De(q))
          return ((O = O.get(_) || null), H(R, O, q, ce, null));
        if (typeof q.then == "function") return j(O, R, _, Kr(q), ce);
        if (q.$$typeof === ae) return j(O, R, _, Qr(R, q), ce);
        Jr(R, q);
      }
      return null;
    }
    function ne(O, R, _, q) {
      for (
        var ce = null, Ye = null, re = R, Ae = (R = 0), Ue = null;
        re !== null && Ae < _.length;
        Ae++
      ) {
        re.index > Ae ? ((Ue = re), (re = null)) : (Ue = re.sibling);
        var Ve = w(O, re, _[Ae], q);
        if (Ve === null) {
          re === null && (re = Ue);
          break;
        }
        (e && re && Ve.alternate === null && t(O, re),
          (R = c(Ve, R, Ae)),
          Ye === null ? (ce = Ve) : (Ye.sibling = Ve),
          (Ye = Ve),
          (re = Ue));
      }
      if (Ae === _.length) return (n(O, re), je && Zn(O, Ae), ce);
      if (re === null) {
        for (; Ae < _.length; Ae++)
          ((re = Y(O, _[Ae], q)),
            re !== null &&
              ((R = c(re, R, Ae)),
              Ye === null ? (ce = re) : (Ye.sibling = re),
              (Ye = re)));
        return (je && Zn(O, Ae), ce);
      }
      for (re = i(re); Ae < _.length; Ae++)
        ((Ue = j(re, O, Ae, _[Ae], q)),
          Ue !== null &&
            (e &&
              Ue.alternate !== null &&
              re.delete(Ue.key === null ? Ae : Ue.key),
            (R = c(Ue, R, Ae)),
            Ye === null ? (ce = Ue) : (Ye.sibling = Ue),
            (Ye = Ue)));
      return (
        e &&
          re.forEach(function (qa) {
            return t(O, qa);
          }),
        je && Zn(O, Ae),
        ce
      );
    }
    function ye(O, R, _, q) {
      if (_ == null) throw Error(s(151));
      for (
        var ce = null,
          Ye = null,
          re = R,
          Ae = (R = 0),
          Ue = null,
          Ve = _.next();
        re !== null && !Ve.done;
        Ae++, Ve = _.next()
      ) {
        re.index > Ae ? ((Ue = re), (re = null)) : (Ue = re.sibling);
        var qa = w(O, re, Ve.value, q);
        if (qa === null) {
          re === null && (re = Ue);
          break;
        }
        (e && re && qa.alternate === null && t(O, re),
          (R = c(qa, R, Ae)),
          Ye === null ? (ce = qa) : (Ye.sibling = qa),
          (Ye = qa),
          (re = Ue));
      }
      if (Ve.done) return (n(O, re), je && Zn(O, Ae), ce);
      if (re === null) {
        for (; !Ve.done; Ae++, Ve = _.next())
          ((Ve = Y(O, Ve.value, q)),
            Ve !== null &&
              ((R = c(Ve, R, Ae)),
              Ye === null ? (ce = Ve) : (Ye.sibling = Ve),
              (Ye = Ve)));
        return (je && Zn(O, Ae), ce);
      }
      for (re = i(re); !Ve.done; Ae++, Ve = _.next())
        ((Ve = j(re, O, Ae, Ve.value, q)),
          Ve !== null &&
            (e &&
              Ve.alternate !== null &&
              re.delete(Ve.key === null ? Ae : Ve.key),
            (R = c(Ve, R, Ae)),
            Ye === null ? (ce = Ve) : (Ye.sibling = Ve),
            (Ye = Ve)));
      return (
        e &&
          re.forEach(function (vg) {
            return t(O, vg);
          }),
        je && Zn(O, Ae),
        ce
      );
    }
    function We(O, R, _, q) {
      if (
        (typeof _ == "object" &&
          _ !== null &&
          _.type === F &&
          _.key === null &&
          (_ = _.props.children),
        typeof _ == "object" && _ !== null)
      ) {
        switch (_.$$typeof) {
          case N:
            e: {
              for (var ce = _.key; R !== null;) {
                if (R.key === ce) {
                  if (((ce = _.type), ce === F)) {
                    if (R.tag === 7) {
                      (n(O, R.sibling),
                        (q = u(R, _.props.children)),
                        (q.return = O),
                        (O = q));
                      break e;
                    }
                  } else if (
                    R.elementType === ce ||
                    (typeof ce == "object" &&
                      ce !== null &&
                      ce.$$typeof === L &&
                      el(ce) === R.type)
                  ) {
                    (n(O, R.sibling),
                      (q = u(R, _.props)),
                      Di(q, _),
                      (q.return = O),
                      (O = q));
                    break e;
                  }
                  n(O, R);
                  break;
                } else t(O, R);
                R = R.sibling;
              }
              _.type === F
                ? ((q = Ja(_.props.children, O.mode, q, _.key)),
                  (q.return = O),
                  (O = q))
                : ((q = Vr(_.type, _.key, _.props, null, O.mode, q)),
                  Di(q, _),
                  (q.return = O),
                  (O = q));
            }
            return d(O);
          case U:
            e: {
              for (ce = _.key; R !== null;) {
                if (R.key === ce)
                  if (
                    R.tag === 4 &&
                    R.stateNode.containerInfo === _.containerInfo &&
                    R.stateNode.implementation === _.implementation
                  ) {
                    (n(O, R.sibling),
                      (q = u(R, _.children || [])),
                      (q.return = O),
                      (O = q));
                    break e;
                  } else {
                    n(O, R);
                    break;
                  }
                else t(O, R);
                R = R.sibling;
              }
              ((q = Us(_, O.mode, q)), (q.return = O), (O = q));
            }
            return d(O);
          case L:
            return ((_ = el(_)), We(O, R, _, q));
        }
        if (Je(_)) return ne(O, R, _, q);
        if (De(_)) {
          if (((ce = De(_)), typeof ce != "function")) throw Error(s(150));
          return ((_ = ce.call(_)), ye(O, R, _, q));
        }
        if (typeof _.then == "function") return We(O, R, Kr(_), q);
        if (_.$$typeof === ae) return We(O, R, Qr(O, _), q);
        Jr(O, _);
      }
      return (typeof _ == "string" && _ !== "") ||
        typeof _ == "number" ||
        typeof _ == "bigint"
        ? ((_ = "" + _),
          R !== null && R.tag === 6
            ? (n(O, R.sibling), (q = u(R, _)), (q.return = O), (O = q))
            : (n(O, R), (q = zs(_, O.mode, q)), (q.return = O), (O = q)),
          d(O))
        : n(O, R);
    }
    return function (O, R, _, q) {
      try {
        Oi = 0;
        var ce = We(O, R, _, q);
        return ((Ul = null), ce);
      } catch (re) {
        if (re === zl || re === Fr) throw re;
        var Ye = Ft(29, re, null, O.mode);
        return ((Ye.lanes = q), (Ye.return = O), Ye);
      }
    };
  }
  var nl = vd(!0),
    gd = vd(!1),
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
  function Zs(e, t) {
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
        td(e, null, n),
        t
      );
    }
    return (qr(e, i, t, n), Yr(e));
  }
  function Ni(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Cr(e, n));
    }
  }
  function Ks(e, t) {
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
  var Js = !1;
  function Ci() {
    if (Js) {
      var e = wl;
      if (e !== null) throw e;
    }
  }
  function _i(e, t, n, i) {
    Js = !1;
    var u = e.updateQueue;
    Ta = !1;
    var c = u.firstBaseUpdate,
      d = u.lastBaseUpdate,
      m = u.shared.pending;
    if (m !== null) {
      u.shared.pending = null;
      var E = m,
        M = E.next;
      ((E.next = null), d === null ? (c = M) : (d.next = M), (d = E));
      var H = e.alternate;
      H !== null &&
        ((H = H.updateQueue),
        (m = H.lastBaseUpdate),
        m !== d &&
          (m === null ? (H.firstBaseUpdate = M) : (m.next = M),
          (H.lastBaseUpdate = E)));
    }
    if (c !== null) {
      var Y = u.baseState;
      ((d = 0), (H = M = E = null), (m = c));
      do {
        var w = m.lane & -536870913,
          j = w !== m.lane;
        if (j ? (ze & w) === w : (i & w) === w) {
          (w !== 0 && w === xl && (Js = !0),
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
            var ne = e,
              ye = m;
            w = t;
            var We = n;
            switch (ye.tag) {
              case 1:
                if (((ne = ye.payload), typeof ne == "function")) {
                  Y = ne.call(We, Y, w);
                  break e;
                }
                Y = ne;
                break e;
              case 3:
                ne.flags = (ne.flags & -65537) | 128;
              case 0:
                if (
                  ((ne = ye.payload),
                  (w = typeof ne == "function" ? ne.call(We, Y, w) : ne),
                  w == null)
                )
                  break e;
                Y = b({}, Y, w);
                break e;
              case 2:
                Ta = !0;
            }
          }
          ((w = m.callback),
            w !== null &&
              ((e.flags |= 64),
              j && (e.flags |= 8192),
              (j = u.callbacks),
              j === null ? (u.callbacks = [w]) : j.push(w)));
        } else
          ((j = {
            lane: w,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }),
            H === null ? ((M = H = j), (E = Y)) : (H = H.next = j),
            (d |= w));
        if (((m = m.next), m === null)) {
          if (((m = u.shared.pending), m === null)) break;
          ((j = m),
            (m = j.next),
            (j.next = null),
            (u.lastBaseUpdate = j),
            (u.shared.pending = null));
        }
      } while (!0);
      (H === null && (E = Y),
        (u.baseState = E),
        (u.firstBaseUpdate = M),
        (u.lastBaseUpdate = H),
        c === null && (u.shared.lanes = 0),
        (_a |= d),
        (e.lanes = d),
        (e.memoizedState = Y));
    }
  }
  function bd(e, t) {
    if (typeof e != "function") throw Error(s(191, e));
    e.call(t);
  }
  function Ed(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) bd(n[e], t);
  }
  var Ll = T(null),
    $r = T(0);
  function Sd(e, t) {
    ((e = la), Z($r, e), Z(Ll, t), (la = e | t.baseLanes));
  }
  function $s() {
    (Z($r, la), Z(Ll, Ll.current));
  }
  function Is() {
    ((la = $r.current), B(Ll), B($r));
  }
  var Zt = T(null),
    cn = null;
  function Oa(e) {
    var t = e.alternate;
    (Z(ot, ot.current & 1),
      Z(Zt, e),
      cn === null &&
        (t === null || Ll.current !== null || t.memoizedState !== null) &&
        (cn = e));
  }
  function Ws(e) {
    (Z(ot, ot.current), Z(Zt, e), cn === null && (cn = e));
  }
  function Td(e) {
    e.tag === 22
      ? (Z(ot, ot.current), Z(Zt, e), cn === null && (cn = e))
      : Da();
  }
  function Da() {
    (Z(ot, ot.current), Z(Zt, Zt.current));
  }
  function Kt(e) {
    (B(Zt), cn === e && (cn = null), B(ot));
  }
  var ot = T(0);
  function Ir(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || lo(n) || io(n)))
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
    Re = null,
    $e = null,
    mt = null,
    Wr = !1,
    jl = !1,
    al = !1,
    Pr = 0,
    Mi = 0,
    Hl = null,
    uv = 0;
  function st() {
    throw Error(s(321));
  }
  function Ps(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Xt(e[n], t[n])) return !1;
    return !0;
  }
  function ec(e, t, n, i, u, c) {
    return (
      ($n = c),
      (Re = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (x.H = e === null || e.memoizedState === null ? ih : yc),
      (al = !1),
      (c = n(i, u)),
      (al = !1),
      jl && (c = Ad(t, n, i, u)),
      Rd(e),
      c
    );
  }
  function Rd(e) {
    x.H = zi;
    var t = $e !== null && $e.next !== null;
    if ((($n = 0), (mt = $e = Re = null), (Wr = !1), (Mi = 0), (Hl = null), t))
      throw Error(s(300));
    e === null ||
      yt ||
      ((e = e.dependencies), e !== null && Gr(e) && (yt = !0));
  }
  function Ad(e, t, n, i) {
    Re = e;
    var u = 0;
    do {
      if ((jl && (Hl = null), (Mi = 0), (jl = !1), 25 <= u))
        throw Error(s(301));
      if (((u += 1), (mt = $e = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((x.H = rh), (c = t(n, i)));
    } while (jl);
    return c;
  }
  function sv() {
    var e = x.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? xi(t) : t),
      (e = e.useState()[0]),
      ($e !== null ? $e.memoizedState : null) !== e && (Re.flags |= 1024),
      t
    );
  }
  function tc() {
    var e = Pr !== 0;
    return ((Pr = 0), e);
  }
  function nc(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function ac(e) {
    if (Wr) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      Wr = !1;
    }
    (($n = 0), (mt = $e = Re = null), (jl = !1), (Mi = Pr = 0), (Hl = null));
  }
  function Lt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return (mt === null ? (Re.memoizedState = mt = e) : (mt = mt.next = e), mt);
  }
  function ft() {
    if ($e === null) {
      var e = Re.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = $e.next;
    var t = mt === null ? Re.memoizedState : mt.next;
    if (t !== null) ((mt = t), ($e = e));
    else {
      if (e === null)
        throw Re.alternate === null ? Error(s(467)) : Error(s(310));
      (($e = e),
        (e = {
          memoizedState: $e.memoizedState,
          baseState: $e.baseState,
          baseQueue: $e.baseQueue,
          queue: $e.queue,
          next: null
        }),
        mt === null ? (Re.memoizedState = mt = e) : (mt = mt.next = e));
    }
    return mt;
  }
  function eu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function xi(e) {
    var t = Mi;
    return (
      (Mi += 1),
      Hl === null && (Hl = []),
      (e = md(Hl, e, t)),
      (t = Re),
      (mt === null ? t.memoizedState : mt.next) === null &&
        ((t = t.alternate),
        (x.H = t === null || t.memoizedState === null ? ih : yc)),
      e
    );
  }
  function tu(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return xi(e);
      if (e.$$typeof === ae) return Dt(e);
    }
    throw Error(s(438, String(e)));
  }
  function lc(e) {
    var t = null,
      n = Re.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var i = Re.alternate;
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
      n === null && ((n = eu()), (Re.updateQueue = n)),
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
  function nu(e) {
    var t = ft();
    return ic(t, $e, e);
  }
  function ic(e, t, n) {
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
        M = t,
        H = !1;
      do {
        var Y = M.lane & -536870913;
        if (Y !== M.lane ? (ze & Y) === Y : ($n & Y) === Y) {
          var w = M.revertLane;
          if (w === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: M.action,
                  hasEagerState: M.hasEagerState,
                  eagerState: M.eagerState,
                  next: null
                }),
              Y === xl && (H = !0));
          else if (($n & w) === w) {
            ((M = M.next), w === xl && (H = !0));
            continue;
          } else
            ((Y = {
              lane: 0,
              revertLane: M.revertLane,
              gesture: null,
              action: M.action,
              hasEagerState: M.hasEagerState,
              eagerState: M.eagerState,
              next: null
            }),
              E === null ? ((m = E = Y), (d = c)) : (E = E.next = Y),
              (Re.lanes |= w),
              (_a |= w));
          ((Y = M.action),
            al && n(c, Y),
            (c = M.hasEagerState ? M.eagerState : n(c, Y)));
        } else
          ((w = {
            lane: Y,
            revertLane: M.revertLane,
            gesture: M.gesture,
            action: M.action,
            hasEagerState: M.hasEagerState,
            eagerState: M.eagerState,
            next: null
          }),
            E === null ? ((m = E = w), (d = c)) : (E = E.next = w),
            (Re.lanes |= Y),
            (_a |= Y));
        M = M.next;
      } while (M !== null && M !== t);
      if (
        (E === null ? (d = c) : (E.next = m),
        !Xt(c, e.memoizedState) && ((yt = !0), H && ((n = wl), n !== null)))
      )
        throw n;
      ((e.memoizedState = c),
        (e.baseState = d),
        (e.baseQueue = E),
        (i.lastRenderedState = c));
    }
    return (u === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function rc(e) {
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
    var i = Re,
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
      cc(Cd.bind(null, i, u, e), [e]),
      u.getSnapshot !== t || d || (mt !== null && mt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Bl(9, { destroy: void 0 }, Nd.bind(null, i, u, n, t), null),
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
      (t = Re.updateQueue),
      t === null
        ? ((t = eu()), (Re.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function Nd(e, t, n, i) {
    ((t.value = n), (t.getSnapshot = i), _d(t) && Md(e));
  }
  function Cd(e, t, n) {
    return n(function () {
      _d(t) && Md(e);
    });
  }
  function _d(e) {
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
  function uc(e) {
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
  function xd(e, t, n, i) {
    return ((e.baseState = n), ic(e, $e, typeof i == "function" ? i : In));
  }
  function cv(e, t, n, i, u) {
    if (iu(e)) throw Error(s(485));
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
      (x.T !== null ? n(!0) : (c.isTransition = !1),
        i(c),
        (n = t.pending),
        n === null
          ? ((c.next = t.pending = c), wd(t, c))
          : ((c.next = n.next), (t.pending = n.next = c)));
    }
  }
  function wd(e, t) {
    var n = t.action,
      i = t.payload,
      u = e.state;
    if (t.isTransition) {
      var c = x.T,
        d = {};
      x.T = d;
      try {
        var m = n(u, i),
          E = x.S;
        (E !== null && E(d, m), zd(e, t, m));
      } catch (M) {
        sc(e, t, M);
      } finally {
        (c !== null && d.types !== null && (c.types = d.types), (x.T = c));
      }
    } else
      try {
        ((c = n(u, i)), zd(e, t, c));
      } catch (M) {
        sc(e, t, M);
      }
  }
  function zd(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            Ud(e, t, i);
          },
          function (i) {
            return sc(e, t, i);
          }
        )
      : Ud(e, t, n);
  }
  function Ud(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      Ld(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), wd(e, n))));
  }
  function sc(e, t, n) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((t.status = "rejected"), (t.reason = n), Ld(t), (t = t.next));
      while (t !== i);
    }
    e.action = null;
  }
  function Ld(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function jd(e, t) {
    return t;
  }
  function Hd(e, t) {
    if (je) {
      var n = et.formState;
      if (n !== null) {
        e: {
          var i = Re;
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
        lastRenderedReducer: jd,
        lastRenderedState: t
      }),
      (n.queue = i),
      (n = nh.bind(null, Re, i)),
      (i.dispatch = n),
      (i = uc(!1)),
      (c = mc.bind(null, Re, !1, i.queue)),
      (i = Lt()),
      (u = { state: t, dispatch: null, action: e, pending: null }),
      (i.queue = u),
      (n = cv.bind(null, Re, u, c, n)),
      (u.dispatch = n),
      (i.memoizedState = e),
      [t, n, !1]
    );
  }
  function Bd(e) {
    var t = ft();
    return qd(t, $e, e);
  }
  function qd(e, t, n) {
    if (
      ((t = ic(e, t, jd)[0]),
      (e = nu(In)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var i = xi(t);
      } catch (d) {
        throw d === zl ? Fr : d;
      }
    else i = t;
    t = ft();
    var u = t.queue,
      c = u.dispatch;
    return (
      n !== t.memoizedState &&
        ((Re.flags |= 2048),
        Bl(9, { destroy: void 0 }, ov.bind(null, u, n), null)),
      [i, c, e]
    );
  }
  function ov(e, t) {
    e.action = t;
  }
  function Yd(e) {
    var t = ft(),
      n = $e;
    if (n !== null) return qd(t, n, e);
    (ft(), (t = t.memoizedState), (n = ft()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = e), [t, i, !1]);
  }
  function Bl(e, t, n, i) {
    return (
      (e = { tag: e, create: n, deps: i, inst: t, next: null }),
      (t = Re.updateQueue),
      t === null && ((t = eu()), (Re.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e)),
      e
    );
  }
  function Vd() {
    return ft().memoizedState;
  }
  function au(e, t, n, i) {
    var u = Lt();
    ((Re.flags |= e),
      (u.memoizedState = Bl(
        1 | t,
        { destroy: void 0 },
        n,
        i === void 0 ? null : i
      )));
  }
  function lu(e, t, n, i) {
    var u = ft();
    i = i === void 0 ? null : i;
    var c = u.memoizedState.inst;
    $e !== null && i !== null && Ps(i, $e.memoizedState.deps)
      ? (u.memoizedState = Bl(t, c, n, i))
      : ((Re.flags |= e), (u.memoizedState = Bl(1 | t, c, n, i)));
  }
  function kd(e, t) {
    au(8390656, 8, e, t);
  }
  function cc(e, t) {
    lu(2048, 8, e, t);
  }
  function fv(e) {
    Re.flags |= 4;
    var t = Re.updateQueue;
    if (t === null) ((t = eu()), (Re.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Gd(e) {
    var t = ft().memoizedState;
    return (
      fv({ ref: t, nextImpl: e }),
      function () {
        if ((Qe & 2) !== 0) throw Error(s(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Qd(e, t) {
    return lu(4, 2, e, t);
  }
  function Xd(e, t) {
    return lu(4, 4, e, t);
  }
  function Fd(e, t) {
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
  function Zd(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), lu(4, 4, Fd.bind(null, t, e), n));
  }
  function oc() {}
  function Kd(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && Ps(t, i[1]) ? i[0] : ((n.memoizedState = [e, t]), e);
  }
  function Jd(e, t) {
    var n = ft();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && Ps(t, i[1])) return i[0];
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
  function fc(e, t, n) {
    return n === void 0 || (($n & 1073741824) !== 0 && (ze & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = $h()), (Re.lanes |= e), (_a |= e), n);
  }
  function $d(e, t, n, i) {
    return Xt(n, t)
      ? n
      : Ll.current !== null
        ? ((e = fc(e, n, i)), Xt(e, t) || (yt = !0), e)
        : ($n & 42) === 0 || (($n & 1073741824) !== 0 && (ze & 261930) === 0)
          ? ((yt = !0), (e.memoizedState = n))
          : ((e = $h()), (Re.lanes |= e), (_a |= e), t);
  }
  function Id(e, t, n, i, u) {
    var c = Q.p;
    Q.p = c !== 0 && 8 > c ? c : 8;
    var d = x.T,
      m = {};
    ((x.T = m), mc(e, !1, t, n));
    try {
      var E = u(),
        M = x.S;
      if (
        (M !== null && M(m, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var H = rv(E, i);
        wi(e, t, H, It(e));
      } else wi(e, t, i, It(e));
    } catch (Y) {
      wi(e, t, { then: function () {}, status: "rejected", reason: Y }, It());
    } finally {
      ((Q.p = c),
        d !== null && m.types !== null && (d.types = m.types),
        (x.T = d));
    }
  }
  function dv() {}
  function dc(e, t, n, i) {
    if (e.tag !== 5) throw Error(s(476));
    var u = Wd(e).queue;
    Id(
      e,
      u,
      t,
      ie,
      n === null
        ? dv
        : function () {
            return (Pd(e), n(i));
          }
    );
  }
  function Wd(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: ie,
      baseState: ie,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: In,
        lastRenderedState: ie
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
  function Pd(e) {
    var t = Wd(e);
    (t.next === null && (t = e.alternate.memoizedState),
      wi(e, t.next.queue, {}, It()));
  }
  function hc() {
    return Dt(Ji);
  }
  function eh() {
    return ft().memoizedState;
  }
  function th() {
    return ft().memoizedState;
  }
  function hv(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = It();
          e = Ra(n);
          var i = Aa(t, e, n);
          (i !== null && (Qt(i, t, n), Ni(i, t, n)),
            (t = { cache: ks() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function mv(e, t, n) {
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
      iu(e)
        ? ah(t, n)
        : ((n = xs(e, t, n, i)), n !== null && (Qt(n, e, i), lh(n, t, i))));
  }
  function nh(e, t, n) {
    var i = It();
    wi(e, t, n, i);
  }
  function wi(e, t, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (iu(e)) ah(t, u);
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
            return (qr(e, t, u, 0), et === null && Br(), !1);
        } catch {}
      if (((n = xs(e, t, u, i)), n !== null))
        return (Qt(n, e, i), lh(n, t, i), !0);
    }
    return !1;
  }
  function mc(e, t, n, i) {
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
      iu(e))
    ) {
      if (t) throw Error(s(479));
    } else ((t = xs(e, n, i, 2)), t !== null && Qt(t, e, 2));
  }
  function iu(e) {
    var t = e.alternate;
    return e === Re || (t !== null && t === Re);
  }
  function ah(e, t) {
    jl = Wr = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function lh(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Cr(e, n));
    }
  }
  var zi = {
    readContext: Dt,
    use: tu,
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
  zi.useEffectEvent = st;
  var ih = {
      readContext: Dt,
      use: tu,
      useCallback: function (e, t) {
        return ((Lt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: Dt,
      useEffect: kd,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          au(4194308, 4, Fd.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return au(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        au(4, 2, e, t);
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
          (e = e.dispatch = mv.bind(null, Re, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Lt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = uc(e);
        var t = e.queue,
          n = nh.bind(null, Re, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: oc,
      useDeferredValue: function (e, t) {
        var n = Lt();
        return fc(n, e, t);
      },
      useTransition: function () {
        var e = uc(!1);
        return (
          (e = Id.bind(null, Re, e.queue, !0, !1)),
          (Lt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var i = Re,
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
          kd(Cd.bind(null, i, c, e), [e]),
          (i.flags |= 2048),
          Bl(9, { destroy: void 0 }, Nd.bind(null, i, c, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Lt(),
          t = et.identifierPrefix;
        if (je) {
          var n = Dn,
            i = On;
          ((n = (i & ~(1 << (32 - _t(i) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = Pr++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_"));
        } else ((n = uv++), (t = "_" + t + "r_" + n.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: hc,
      useFormState: Hd,
      useActionState: Hd,
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
          (t = mc.bind(null, Re, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: lc,
      useCacheRefresh: function () {
        return (Lt().memoizedState = hv.bind(null, Re));
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
    yc = {
      readContext: Dt,
      use: tu,
      useCallback: Kd,
      useContext: Dt,
      useEffect: cc,
      useImperativeHandle: Zd,
      useInsertionEffect: Qd,
      useLayoutEffect: Xd,
      useMemo: Jd,
      useReducer: nu,
      useRef: Vd,
      useState: function () {
        return nu(In);
      },
      useDebugValue: oc,
      useDeferredValue: function (e, t) {
        var n = ft();
        return $d(n, $e.memoizedState, e, t);
      },
      useTransition: function () {
        var e = nu(In)[0],
          t = ft().memoizedState;
        return [typeof e == "boolean" ? e : xi(e), t];
      },
      useSyncExternalStore: Od,
      useId: eh,
      useHostTransitionStatus: hc,
      useFormState: Bd,
      useActionState: Bd,
      useOptimistic: function (e, t) {
        var n = ft();
        return xd(n, $e, e, t);
      },
      useMemoCache: lc,
      useCacheRefresh: th
    };
  yc.useEffectEvent = Gd;
  var rh = {
    readContext: Dt,
    use: tu,
    useCallback: Kd,
    useContext: Dt,
    useEffect: cc,
    useImperativeHandle: Zd,
    useInsertionEffect: Qd,
    useLayoutEffect: Xd,
    useMemo: Jd,
    useReducer: rc,
    useRef: Vd,
    useState: function () {
      return rc(In);
    },
    useDebugValue: oc,
    useDeferredValue: function (e, t) {
      var n = ft();
      return $e === null ? fc(n, e, t) : $d(n, $e.memoizedState, e, t);
    },
    useTransition: function () {
      var e = rc(In)[0],
        t = ft().memoizedState;
      return [typeof e == "boolean" ? e : xi(e), t];
    },
    useSyncExternalStore: Od,
    useId: eh,
    useHostTransitionStatus: hc,
    useFormState: Yd,
    useActionState: Yd,
    useOptimistic: function (e, t) {
      var n = ft();
      return $e !== null
        ? xd(n, $e, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: lc,
    useCacheRefresh: th
  };
  rh.useEffectEvent = Gd;
  function pc(e, t, n, i) {
    ((t = e.memoizedState),
      (n = n(i, t)),
      (n = n == null ? t : b({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var vc = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var i = It(),
        u = Ra(i);
      ((u.payload = t),
        n != null && (u.callback = n),
        (t = Aa(e, u, i)),
        t !== null && (Qt(t, e, i), Ni(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var i = It(),
        u = Ra(i);
      ((u.tag = 1),
        (u.payload = t),
        n != null && (u.callback = n),
        (t = Aa(e, u, i)),
        t !== null && (Qt(t, e, i), Ni(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = It(),
        i = Ra(n);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = Aa(e, i, n)),
        t !== null && (Qt(t, e, n), Ni(t, e, n)));
    }
  };
  function uh(e, t, n, i, u, c, d) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, c, d)
        : t.prototype && t.prototype.isPureReactComponent
          ? !bi(n, i) || !bi(u, c)
          : !0
    );
  }
  function sh(e, t, n, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, i),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, i),
      t.state !== e && vc.enqueueReplaceState(t, t.state, null));
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
  function ch(e) {
    Hr(e);
  }
  function oh(e) {
    console.error(e);
  }
  function fh(e) {
    Hr(e);
  }
  function ru(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function dh(e, t, n) {
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
  function gc(e, t, n) {
    return (
      (n = Ra(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        ru(e, t);
      }),
      n
    );
  }
  function hh(e) {
    return ((e = Ra(e)), (e.tag = 3), e);
  }
  function mh(e, t, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = i.value;
      ((e.payload = function () {
        return u(c);
      }),
        (e.callback = function () {
          dh(t, n, i);
        }));
    }
    var d = n.stateNode;
    d !== null &&
      typeof d.componentDidCatch == "function" &&
      (e.callback = function () {
        (dh(t, n, i),
          typeof u != "function" &&
            (Ma === null ? (Ma = new Set([this])) : Ma.add(this)));
        var m = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: m !== null ? m : ""
        });
      });
  }
  function yv(e, t, n, i, u) {
    if (
      ((n.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && Ml(t, n, u, !0),
        (n = Zt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              cn === null ? gu() : n.alternate === null && ct === 0 && (ct = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = u),
              i === Zr
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([i])) : t.add(i),
                  Gc(e, i, u)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === Zr
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
                  Gc(e, i, u)),
              !1
            );
        }
        throw Error(s(435, n.tag));
      }
      return (Gc(e, i, u), gu(), !1);
    }
    if (je)
      return (
        (t = Zt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = u),
            i !== Hs && ((e = Error(s(422), { cause: i })), Ti(ln(e, n))))
          : (i !== Hs && ((t = Error(s(423), { cause: i })), Ti(ln(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (u &= -u),
            (e.lanes |= u),
            (i = ln(i, n)),
            (u = gc(e.stateNode, i, u)),
            Ks(e, u),
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
            (e = gc(n.stateNode, i, e)),
            Ks(n, e),
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
                  (Ma === null || !Ma.has(c)))))
          )
            return (
              (n.flags |= 65536),
              (u &= -u),
              (n.lanes |= u),
              (u = hh(u)),
              mh(u, e, n, i),
              Ks(n, u),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var bc = Error(s(461)),
    yt = !1;
  function Nt(e, t, n, i) {
    t.child = e === null ? gd(t, null, n, i) : nl(t, e.child, n, i);
  }
  function yh(e, t, n, i, u) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var d = {};
      for (var m in i) m !== "ref" && (d[m] = i[m]);
    } else d = i;
    return (
      Wa(t),
      (i = ec(e, t, n, d, c, u)),
      (m = tc()),
      e !== null && !yt
        ? (nc(e, t, u), Wn(e, t, u))
        : (je && m && Ls(t), (t.flags |= 1), Nt(e, t, i, u), t.child)
    );
  }
  function ph(e, t, n, i, u) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" &&
        !ws(c) &&
        c.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = c), vh(e, t, c, i, u))
        : ((e = Vr(n.type, null, i, t, t.mode, u)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !Nc(e, u))) {
      var d = c.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : bi), n(d, i) && e.ref === t.ref)
      )
        return Wn(e, t, u);
    }
    return (
      (t.flags |= 1),
      (e = Fn(c, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function vh(e, t, n, i, u) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (bi(c, i) && e.ref === t.ref)
        if (((yt = !1), (t.pendingProps = i = c), Nc(e, u)))
          (e.flags & 131072) !== 0 && (yt = !0);
        else return ((t.lanes = e.lanes), Wn(e, t, u));
    }
    return Ec(e, t, n, i, u);
  }
  function gh(e, t, n, i) {
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
        return bh(e, t, c, n, i);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Xr(t, c !== null ? c.cachePool : null),
          c !== null ? Sd(t, c) : $s(),
          Td(t));
      else
        return (
          (i = t.lanes = 536870912),
          bh(e, t, c !== null ? c.baseLanes | n : n, n, i)
        );
    } else
      c !== null
        ? (Xr(t, c.cachePool), Sd(t, c), Da(), (t.memoizedState = null))
        : (e !== null && Xr(t, null), $s(), Da());
    return (Nt(e, t, u, n), t.child);
  }
  function Ui(e, t) {
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
  function bh(e, t, n, i, u) {
    var c = Qs();
    return (
      (c = c === null ? null : { parent: ht._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: n, cachePool: c }),
      e !== null && Xr(t, null),
      $s(),
      Td(t),
      e !== null && Ml(e, t, i, !0),
      (t.childLanes = u),
      null
    );
  }
  function uu(e, t) {
    return (
      (t = cu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Eh(e, t, n) {
    return (
      nl(t, e.child, null, n),
      (e = uu(t, t.pendingProps)),
      (e.flags |= 2),
      Kt(t),
      (t.memoizedState = null),
      e
    );
  }
  function pv(e, t, n) {
    var i = t.pendingProps,
      u = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (je) {
        if (i.mode === "hidden")
          return ((e = uu(t, i)), (t.lanes = 536870912), Ui(null, e));
        if (
          (Ws(t),
          (e = at)
            ? ((e = wm(e, sn)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ga !== null ? { id: On, overflow: Dn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = ad(e)),
                (n.return = t),
                (t.child = n),
                (Ot = t),
                (at = null)))
            : (e = null),
          e === null)
        )
          throw Ea(t);
        return ((t.lanes = 536870912), null);
      }
      return uu(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var d = c.dehydrated;
      if ((Ws(t), u))
        if (t.flags & 256) ((t.flags &= -257), (t = Eh(e, t, n)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(s(558));
      else if (
        (yt || Ml(e, t, n, !1), (u = (n & e.childLanes) !== 0), yt || u)
      ) {
        if (
          ((i = et),
          i !== null && ((d = S(i, n)), d !== 0 && d !== c.retryLane))
        )
          throw ((c.retryLane = d), Ka(e, d), Qt(i, e, d), bc);
        (gu(), (t = Eh(e, t, n)));
      } else
        ((e = c.treeContext),
          (at = on(d.nextSibling)),
          (Ot = t),
          (je = !0),
          (ba = null),
          (sn = !1),
          e !== null && rd(t, e),
          (t = uu(t, i)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Fn(e.child, { mode: i.mode, children: i.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function su(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Ec(e, t, n, i, u) {
    return (
      Wa(t),
      (n = ec(e, t, n, i, void 0, u)),
      (i = tc()),
      e !== null && !yt
        ? (nc(e, t, u), Wn(e, t, u))
        : (je && i && Ls(t), (t.flags |= 1), Nt(e, t, n, u), t.child)
    );
  }
  function Sh(e, t, n, i, u, c) {
    return (
      Wa(t),
      (t.updateQueue = null),
      (n = Ad(t, i, n, u)),
      Rd(e),
      (i = tc()),
      e !== null && !yt
        ? (nc(e, t, c), Wn(e, t, c))
        : (je && i && Ls(t), (t.flags |= 1), Nt(e, t, n, c), t.child)
    );
  }
  function Th(e, t, n, i, u) {
    if ((Wa(t), t.stateNode === null)) {
      var c = Dl,
        d = n.contextType;
      (typeof d == "object" && d !== null && (c = Dt(d)),
        (c = new n(i, c)),
        (t.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = vc),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = i),
        (c.state = t.memoizedState),
        (c.refs = {}),
        Fs(t),
        (d = n.contextType),
        (c.context = typeof d == "object" && d !== null ? Dt(d) : Dl),
        (c.state = t.memoizedState),
        (d = n.getDerivedStateFromProps),
        typeof d == "function" && (pc(t, n, d, i), (c.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((d = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          d !== c.state && vc.enqueueReplaceState(c, c.state, null),
          _i(t, i, c, u),
          Ci(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == "function" && (t.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      c = t.stateNode;
      var m = t.memoizedProps,
        E = ll(n, m);
      c.props = E;
      var M = c.context,
        H = n.contextType;
      ((d = Dl), typeof H == "object" && H !== null && (d = Dt(H)));
      var Y = n.getDerivedStateFromProps;
      ((H =
        typeof Y == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (m = t.pendingProps !== m),
        H ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((m || M !== d) && sh(t, c, i, d)),
        (Ta = !1));
      var w = t.memoizedState;
      ((c.state = w),
        _i(t, i, c, u),
        Ci(),
        (M = t.memoizedState),
        m || w !== M || Ta
          ? (typeof Y == "function" && (pc(t, n, Y, i), (M = t.memoizedState)),
            (E = Ta || uh(t, n, E, i, w, M, d))
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
                (t.memoizedState = M)),
            (c.props = i),
            (c.state = M),
            (c.context = d),
            (i = E))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (i = !1)));
    } else {
      ((c = t.stateNode),
        Zs(e, t),
        (d = t.memoizedProps),
        (H = ll(n, d)),
        (c.props = H),
        (Y = t.pendingProps),
        (w = c.context),
        (M = n.contextType),
        (E = Dl),
        typeof M == "object" && M !== null && (E = Dt(M)),
        (m = n.getDerivedStateFromProps),
        (M =
          typeof m == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((d !== Y || w !== E) && sh(t, c, i, E)),
        (Ta = !1),
        (w = t.memoizedState),
        (c.state = w),
        _i(t, i, c, u),
        Ci());
      var j = t.memoizedState;
      d !== Y ||
      w !== j ||
      Ta ||
      (e !== null && e.dependencies !== null && Gr(e.dependencies))
        ? (typeof m == "function" && (pc(t, n, m, i), (j = t.memoizedState)),
          (H =
            Ta ||
            uh(t, n, H, i, w, j, E) ||
            (e !== null && e.dependencies !== null && Gr(e.dependencies)))
            ? (M ||
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
                (d === e.memoizedProps && w === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (d === e.memoizedProps && w === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = j)),
          (c.props = i),
          (c.state = j),
          (c.context = E),
          (i = H))
        : (typeof c.componentDidUpdate != "function" ||
            (d === e.memoizedProps && w === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (d === e.memoizedProps && w === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return (
      (c = i),
      su(e, t),
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
            : Nt(e, t, n, u),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = Wn(e, t, u)),
      e
    );
  }
  function Rh(e, t, n, i) {
    return ($a(), (t.flags |= 256), Nt(e, t, n, i), t.child);
  }
  var Sc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Tc(e) {
    return { baseLanes: e, cachePool: dd() };
  }
  function Rc(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= $t), e);
  }
  function Ah(e, t, n) {
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
          (u ? Oa(t) : Da(),
          (e = at)
            ? ((e = wm(e, sn)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: ga !== null ? { id: On, overflow: Dn } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = ad(e)),
                (n.return = t),
                (t.child = n),
                (Ot = t),
                (at = null)))
            : (e = null),
          e === null)
        )
          throw Ea(t);
        return (io(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var m = i.children;
      return (
        (i = i.fallback),
        u
          ? (Da(),
            (u = t.mode),
            (m = cu({ mode: "hidden", children: m }, u)),
            (i = Ja(i, u, n, null)),
            (m.return = t),
            (i.return = t),
            (m.sibling = i),
            (t.child = m),
            (i = t.child),
            (i.memoizedState = Tc(n)),
            (i.childLanes = Rc(e, d, n)),
            (t.memoizedState = Sc),
            Ui(null, i))
          : (Oa(t), Ac(t, m))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((m = E.dehydrated), m !== null)) {
      if (c)
        t.flags & 256
          ? (Oa(t), (t.flags &= -257), (t = Oc(e, t, n)))
          : t.memoizedState !== null
            ? (Da(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (Da(),
              (m = i.fallback),
              (u = t.mode),
              (i = cu({ mode: "visible", children: i.children }, u)),
              (m = Ja(m, u, n, null)),
              (m.flags |= 2),
              (i.return = t),
              (m.return = t),
              (i.sibling = m),
              (t.child = i),
              nl(t, e.child, null, n),
              (i = t.child),
              (i.memoizedState = Tc(n)),
              (i.childLanes = Rc(e, d, n)),
              (t.memoizedState = Sc),
              (t = Ui(null, i)));
      else if ((Oa(t), io(m))) {
        if (((d = m.nextSibling && m.nextSibling.dataset), d)) var M = d.dgst;
        ((d = M),
          (i = Error(s(419))),
          (i.stack = ""),
          (i.digest = d),
          Ti({ value: i, source: null, stack: null }),
          (t = Oc(e, t, n)));
      } else if (
        (yt || Ml(e, t, n, !1), (d = (n & e.childLanes) !== 0), yt || d)
      ) {
        if (
          ((d = et),
          d !== null && ((i = S(d, n)), i !== 0 && i !== E.retryLane))
        )
          throw ((E.retryLane = i), Ka(e, i), Qt(d, e, i), bc);
        (lo(m) || gu(), (t = Oc(e, t, n)));
      } else
        lo(m)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (at = on(m.nextSibling)),
            (Ot = t),
            (je = !0),
            (ba = null),
            (sn = !1),
            e !== null && rd(t, e),
            (t = Ac(t, i.children)),
            (t.flags |= 4096));
      return t;
    }
    return u
      ? (Da(),
        (m = i.fallback),
        (u = t.mode),
        (E = e.child),
        (M = E.sibling),
        (i = Fn(E, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = E.subtreeFlags & 65011712),
        M !== null ? (m = Fn(M, m)) : ((m = Ja(m, u, n, null)), (m.flags |= 2)),
        (m.return = t),
        (i.return = t),
        (i.sibling = m),
        (t.child = i),
        Ui(null, i),
        (i = t.child),
        (m = e.child.memoizedState),
        m === null
          ? (m = Tc(n))
          : ((u = m.cachePool),
            u !== null
              ? ((E = ht._currentValue),
                (u = u.parent !== E ? { parent: E, pool: E } : u))
              : (u = dd()),
            (m = { baseLanes: m.baseLanes | n, cachePool: u })),
        (i.memoizedState = m),
        (i.childLanes = Rc(e, d, n)),
        (t.memoizedState = Sc),
        Ui(e.child, i))
      : (Oa(t),
        (n = e.child),
        (e = n.sibling),
        (n = Fn(n, { mode: "visible", children: i.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((d = t.deletions),
          d === null ? ((t.deletions = [e]), (t.flags |= 16)) : d.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Ac(e, t) {
    return (
      (t = cu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function cu(e, t) {
    return ((e = Ft(22, e, null, t)), (e.lanes = 0), e);
  }
  function Oc(e, t, n) {
    return (
      nl(t, e.child, null, n),
      (e = Ac(t, t.pendingProps.children)),
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
  function Dc(e, t, n, i, u, c) {
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
      Z(ot, d),
      Nt(e, t, i, n),
      (i = je ? Si : 0),
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
            e !== null && Ir(e) === null && (u = n),
            (n = n.sibling));
        ((n = u),
          n === null
            ? ((u = t.child), (t.child = null))
            : ((u = n.sibling), (n.sibling = null)),
          Dc(t, !1, u, n, c, i));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, u = t.child, t.child = null; u !== null;) {
          if (((e = u.alternate), e !== null && Ir(e) === null)) {
            t.child = u;
            break;
          }
          ((e = u.sibling), (u.sibling = n), (n = u), (u = e));
        }
        Dc(t, !0, n, null, c, i);
        break;
      case "together":
        Dc(t, !1, null, null, void 0, i);
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
        if ((Ml(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(s(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Fn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = Fn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Nc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Gr(e)));
  }
  function vv(e, t, n) {
    switch (t.tag) {
      case 3:
        (dt(t, t.stateNode.containerInfo),
          Sa(t, ht, e.memoizedState.cache),
          $a());
        break;
      case 27:
      case 5:
        Va(t);
        break;
      case 4:
        dt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Sa(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Ws(t), null);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Oa(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? Ah(e, t, n)
              : (Oa(t), (e = Wn(e, t, n)), e !== null ? e.sibling : null);
        Oa(t);
        break;
      case 19:
        var u = (e.flags & 128) !== 0;
        if (
          ((i = (n & t.childLanes) !== 0),
          i || (Ml(e, t, n, !1), (i = (n & t.childLanes) !== 0)),
          u)
        ) {
          if (i) return Dh(e, t, n);
          t.flags |= 128;
        }
        if (
          ((u = t.memoizedState),
          u !== null &&
            ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
          Z(ot, ot.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), gh(e, t, n, t.pendingProps));
      case 24:
        Sa(t, ht, e.memoizedState.cache);
    }
    return Wn(e, t, n);
  }
  function Nh(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) yt = !0;
      else {
        if (!Nc(e, n) && (t.flags & 128) === 0) return ((yt = !1), vv(e, t, n));
        yt = (e.flags & 131072) !== 0;
      }
    else ((yt = !1), je && (t.flags & 1048576) !== 0 && id(t, Si, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (((e = el(t.elementType)), (t.type = e), typeof e == "function"))
            ws(e)
              ? ((i = ll(e, i)), (t.tag = 1), (t = Th(null, t, e, i, n)))
              : ((t.tag = 0), (t = Ec(null, t, e, i, n)));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === de) {
                ((t.tag = 11), (t = yh(null, t, e, i, n)));
                break e;
              } else if (u === J) {
                ((t.tag = 14), (t = ph(null, t, e, i, n)));
                break e;
              }
            }
            throw ((t = rt(e) || e), Error(s(306, t, "")));
          }
        }
        return t;
      case 0:
        return Ec(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((i = t.type), (u = ll(i, t.pendingProps)), Th(e, t, i, u, n));
      case 3:
        e: {
          if ((dt(t, t.stateNode.containerInfo), e === null))
            throw Error(s(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          ((u = c.element), Zs(e, t), _i(t, i, null, n));
          var d = t.memoizedState;
          if (
            ((i = d.cache),
            Sa(t, ht, i),
            i !== c.cache && Vs(t, [ht], n, !0),
            Ci(),
            (i = d.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: i, isDehydrated: !1, cache: d.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = Rh(e, t, i, n);
              break e;
            } else if (i !== u) {
              ((u = ln(Error(s(424)), t)), Ti(u), (t = Rh(e, t, i, n)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  at = on(e.firstChild),
                  Ot = t,
                  je = !0,
                  ba = null,
                  sn = !0,
                  n = gd(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if (($a(), i === u)) {
              t = Wn(e, t, n);
              break e;
            }
            Nt(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          su(e, t),
          e === null
            ? (n = Bm(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : je ||
                ((n = t.type),
                (e = t.pendingProps),
                (i = Ou(me.current).createElement(n)),
                (i[W] = t),
                (i[K] = e),
                Ct(i, n, e),
                ke(i),
                (t.stateNode = i))
            : (t.memoizedState = Bm(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          Va(t),
          e === null &&
            je &&
            ((i = t.stateNode = Lm(t.type, t.pendingProps, me.current)),
            (Ot = t),
            (sn = !0),
            (u = at),
            Ua(t.type) ? ((ro = u), (at = on(i.firstChild))) : (at = u)),
          Nt(e, t, t.pendingProps.children, n),
          su(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            je &&
            ((u = i = at) &&
              ((i = Zv(i, t.type, t.pendingProps, sn)),
              i !== null
                ? ((t.stateNode = i),
                  (Ot = t),
                  (at = on(i.firstChild)),
                  (sn = !1),
                  (u = !0))
                : (u = !1)),
            u || Ea(t)),
          Va(t),
          (u = t.type),
          (c = t.pendingProps),
          (d = e !== null ? e.memoizedProps : null),
          (i = c.children),
          to(u, c) ? (i = null) : d !== null && to(u, d) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((u = ec(e, t, sv, null, null, n)), (Ji._currentValue = u)),
          su(e, t),
          Nt(e, t, i, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            je &&
            ((e = n = at) &&
              ((n = Kv(n, t.pendingProps, sn)),
              n !== null
                ? ((t.stateNode = n), (Ot = t), (at = null), (e = !0))
                : (e = !1)),
            e || Ea(t)),
          null
        );
      case 13:
        return Ah(e, t, n);
      case 4:
        return (
          dt(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = nl(t, null, i, n)) : Nt(e, t, i, n),
          t.child
        );
      case 11:
        return yh(e, t, t.type, t.pendingProps, n);
      case 7:
        return (Nt(e, t, t.pendingProps, n), t.child);
      case 8:
        return (Nt(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (Nt(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (i = t.pendingProps),
          Sa(t, t.type, i.value),
          Nt(e, t, i.children, n),
          t.child
        );
      case 9:
        return (
          (u = t.type._context),
          (i = t.pendingProps.children),
          Wa(t),
          (u = Dt(u)),
          (i = i(u)),
          (t.flags |= 1),
          Nt(e, t, i, n),
          t.child
        );
      case 14:
        return ph(e, t, t.type, t.pendingProps, n);
      case 15:
        return vh(e, t, t.type, t.pendingProps, n);
      case 19:
        return Dh(e, t, n);
      case 31:
        return pv(e, t, n);
      case 22:
        return gh(e, t, n, t.pendingProps);
      case 24:
        return (
          Wa(t),
          (i = Dt(ht)),
          e === null
            ? ((u = Qs()),
              u === null &&
                ((u = et),
                (c = ks()),
                (u.pooledCache = c),
                c.refCount++,
                c !== null && (u.pooledCacheLanes |= n),
                (u = c)),
              (t.memoizedState = { parent: i, cache: u }),
              Fs(t),
              Sa(t, ht, u))
            : ((e.lanes & n) !== 0 && (Zs(e, t), _i(t, null, null, n), Ci()),
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
          Nt(e, t, t.pendingProps.children, n),
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
  function Cc(e, t, n, i, u) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (u & 335544128) === u))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (em()) e.flags |= 8192;
        else throw ((tl = Zr), Xs);
    } else e.flags &= -16777217;
  }
  function Ch(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !Gm(t)))
      if (em()) e.flags |= 8192;
      else throw ((tl = Zr), Xs);
  }
  function ou(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? fi() : 536870912), (e.lanes |= t), (kl |= t)));
  }
  function Li(e, t) {
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
  function gv(e, t, n) {
    var i = t.pendingProps;
    switch ((js(t), t.tag)) {
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
                ((t.flags |= 1024), Bs())),
          lt(t),
          null
        );
      case 26:
        var u = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (Pn(t),
              c !== null ? (lt(t), Ch(t, c)) : (lt(t), Cc(t, u, null, i, n)))
            : c
              ? c !== e.memoizedState
                ? (Pn(t), lt(t), Ch(t, c))
                : (lt(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== i && Pn(t),
                lt(t),
                Cc(t, u, e, i, n)),
          null
        );
      case 27:
        if (
          (hl(t),
          (n = me.current),
          (u = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== i && Pn(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(s(166));
            return (lt(t), null);
          }
          ((e = $.current),
            _l(t) ? ud(t) : ((e = Lm(u, i, n)), (t.stateNode = e), Pn(t)));
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
          if (((c = $.current), _l(t))) ud(t);
          else {
            var d = Ou(me.current);
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
            ((c[W] = t), (c[K] = i));
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
            e: switch ((Ct(c, u, i), u)) {
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
          Cc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && Pn(t);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(s(166));
          if (((e = me.current), _l(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (i = null),
              (u = Ot),
              u !== null)
            )
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            ((e[W] = t),
              (e = !!(
                e.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                Am(e.nodeValue, n)
              )),
              e || Ea(t, !0));
          } else ((e = Ou(e).createTextNode(i)), (e[W] = t), (t.stateNode = e));
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
              e[W] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (lt(t), (e = !1));
          } else
            ((n = Bs()),
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
              u[W] = t;
            } else
              ($a(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (lt(t), (u = !1));
          } else
            ((u = Bs()),
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
              ou(t, t.updateQueue),
              lt(t),
              null)
        );
      case 4:
        return (Pe(), e === null && $c(t.stateNode.containerInfo), lt(t), null);
      case 10:
        return (Jn(t.type), lt(t), null);
      case 19:
        if ((B(ot), (i = t.memoizedState), i === null)) return (lt(t), null);
        if (((u = (t.flags & 128) !== 0), (c = i.rendering), c === null))
          if (u) Li(i, !1);
          else {
            if (ct !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null;) {
                if (((c = Ir(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Li(i, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      ou(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;
                  )
                    (nd(n, e), (n = n.sibling));
                  return (
                    Z(ot, (ot.current & 1) | 2),
                    je && Zn(t, i.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            i.tail !== null &&
              wt() > yu &&
              ((t.flags |= 128), (u = !0), Li(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!u)
            if (((e = Ir(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (u = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                ou(t, e),
                Li(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !c.alternate &&
                  !je)
              )
                return (lt(t), null);
            } else
              2 * wt() - i.renderingStartTime > yu &&
                n !== 536870912 &&
                ((t.flags |= 128), (u = !0), Li(i, !1), (t.lanes = 4194304));
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
            (i.renderingStartTime = wt()),
            (e.sibling = null),
            (n = ot.current),
            Z(ot, u ? (n & 1) | 2 : n & 1),
            je && Zn(t, i.treeForkCount),
            e)
          : (lt(t), null);
      case 22:
      case 23:
        return (
          Kt(t),
          Is(),
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
          n !== null && ou(t, n.retryQueue),
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
  function bv(e, t) {
    switch ((js(t), t.tag)) {
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
          Is(),
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
  function _h(e, t) {
    switch ((js(t), t.tag)) {
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
        (Kt(t), Is(), e !== null && B(Pa));
        break;
      case 24:
        Jn(ht);
    }
  }
  function ji(e, t) {
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
  function Na(e, t, n) {
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
                M = m;
              try {
                M();
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
        Ed(t, n);
      } catch (i) {
        Ke(e, e.return, i);
      }
    }
  }
  function xh(e, t, n) {
    ((n.props = ll(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      Ke(e, t, i);
    }
  }
  function Hi(e, t) {
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
  function Nn(e, t) {
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
  function wh(e) {
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
  function _c(e, t, n) {
    try {
      var i = e.stateNode;
      (Vv(i, e.type, n, t), (i[K] = t));
    } catch (u) {
      Ke(e, e.return, u);
    }
  }
  function zh(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ua(e.type)) ||
      e.tag === 4
    );
  }
  function Mc(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || zh(e.return)) return null;
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
  function xc(e, t, n) {
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
      for (xc(e, t, n), e = e.sibling; e !== null;)
        (xc(e, t, n), (e = e.sibling));
  }
  function fu(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      i !== 4 &&
      (i === 27 && Ua(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (fu(e, t, n), e = e.sibling; e !== null;)
        (fu(e, t, n), (e = e.sibling));
  }
  function Uh(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var i = e.type, u = t.attributes; u.length;)
        t.removeAttributeNode(u[0]);
      (Ct(t, i, n), (t[W] = e), (t[K] = n));
    } catch (c) {
      Ke(e, e.return, c);
    }
  }
  var ea = !1,
    pt = !1,
    wc = !1,
    Lh = typeof WeakSet == "function" ? WeakSet : Set,
    Tt = null;
  function Ev(e, t) {
    if (((e = e.containerInfo), (Pc = wu), (e = Zf(e)), Os(e))) {
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
              M = 0,
              H = 0,
              Y = e,
              w = null;
            t: for (;;) {
              for (
                var j;
                Y !== n || (u !== 0 && Y.nodeType !== 3) || (m = d + u),
                  Y !== c || (i !== 0 && Y.nodeType !== 3) || (E = d + i),
                  Y.nodeType === 3 && (d += Y.nodeValue.length),
                  (j = Y.firstChild) !== null;
              )
                ((w = Y), (Y = j));
              for (;;) {
                if (Y === e) break t;
                if (
                  (w === n && ++M === u && (m = d),
                  w === c && ++H === i && (E = d),
                  (j = Y.nextSibling) !== null)
                )
                  break;
                ((Y = w), (w = Y.parentNode));
              }
              Y = j;
            }
            n = m === -1 || E === -1 ? null : { start: m, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      eo = { focusedElem: e, selectionRange: n }, wu = !1, Tt = t;
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
                  var ne = ll(n.type, u);
                  ((e = i.getSnapshotBeforeUpdate(ne, c)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (ye) {
                  Ke(n, n.return, ye);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  ao(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ao(e);
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
  function jh(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (na(e, n), i & 4 && ji(5, n));
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
        (i & 64 && Mh(n), i & 512 && Hi(n, n.return));
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
            Ed(e, t);
          } catch (d) {
            Ke(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Uh(n);
      case 26:
      case 5:
        (na(e, n), t === null && i & 4 && wh(n), i & 512 && Hi(n, n.return));
        break;
      case 12:
        na(e, n);
        break;
      case 31:
        (na(e, n), i & 4 && qh(e, n));
        break;
      case 13:
        (na(e, n),
          i & 4 && Yh(e, n),
          i & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = _v.bind(null, n)), Jv(e, n)))));
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
  function Hh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), Hh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && qe(t)),
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
    Yt = !1;
  function ta(e, t, n) {
    for (n = n.child; n !== null;) (Bh(e, t, n), (n = n.sibling));
  }
  function Bh(e, t, n) {
    if (zt && typeof zt.onCommitFiberUnmount == "function")
      try {
        zt.onCommitFiberUnmount(Hn, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (pt || Nn(n, t),
          ta(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        pt || Nn(n, t);
        var i = it,
          u = Yt;
        (Ua(n.type) && ((it = n.stateNode), (Yt = !1)),
          ta(e, t, n),
          Fi(n.stateNode),
          (it = i),
          (Yt = u));
        break;
      case 5:
        pt || Nn(n, t);
      case 6:
        if (
          ((i = it),
          (u = Yt),
          (it = null),
          ta(e, t, n),
          (it = i),
          (Yt = u),
          it !== null)
        )
          if (Yt)
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
          (Yt
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
          (u = Yt),
          (it = n.stateNode.containerInfo),
          (Yt = !0),
          ta(e, t, n),
          (it = i),
          (Yt = u));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Na(2, n, t), pt || Na(4, n, t), ta(e, t, n));
        break;
      case 1:
        (pt ||
          (Nn(n, t),
          (i = n.stateNode),
          typeof i.componentWillUnmount == "function" && xh(n, t, i)),
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
  function qh(e, t) {
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
  function Yh(e, t) {
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
  function Sv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Lh()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Lh()),
          t
        );
      default:
        throw Error(s(435, e.tag));
    }
  }
  function du(e, t) {
    var n = Sv(e);
    t.forEach(function (i) {
      if (!n.has(i)) {
        n.add(i);
        var u = Mv.bind(null, e, i);
        i.then(u, u);
      }
    });
  }
  function Vt(e, t) {
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
                ((it = m.stateNode), (Yt = !1));
                break e;
              }
              break;
            case 5:
              ((it = m.stateNode), (Yt = !1));
              break e;
            case 3:
            case 4:
              ((it = m.stateNode.containerInfo), (Yt = !0));
              break e;
          }
          m = m.return;
        }
        if (it === null) throw Error(s(160));
        (Bh(c, d, u),
          (it = null),
          (Yt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null;) (Vh(t, e), (t = t.sibling));
  }
  var gn = null;
  function Vh(e, t) {
    var n = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Vt(t, e),
          kt(e),
          i & 4 && (Na(3, e, e.return), ji(3, e), Na(5, e, e.return)));
        break;
      case 1:
        (Vt(t, e),
          kt(e),
          i & 512 && (pt || n === null || Nn(n, n.return)),
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
          (Vt(t, e),
          kt(e),
          i & 512 && (pt || n === null || Nn(n, n.return)),
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
                          c[Fe] ||
                          c[W] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = u.createElement(i)),
                          u.head.insertBefore(
                            c,
                            u.querySelector("head > title")
                          )),
                        Ct(c, i, n),
                        (c[W] = e),
                        ke(c),
                        (i = c));
                      break e;
                    case "link":
                      var d = Vm("link", "href", u).get(i + (n.href || ""));
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
                        Ct(c, i, n),
                        u.head.appendChild(c));
                      break;
                    case "meta":
                      if (
                        (d = Vm("meta", "content", u).get(
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
                        Ct(c, i, n),
                        u.head.appendChild(c));
                      break;
                    default:
                      throw Error(s(468, i));
                  }
                  ((c[W] = e), ke(c), (i = c));
                }
                e.stateNode = i;
              } else km(u, e.type, e.stateNode);
            else e.stateNode = Ym(u, i, e.memoizedProps);
          else
            c !== i
              ? (c === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : c.count--,
                i === null
                  ? km(u, e.type, e.stateNode)
                  : Ym(u, i, e.memoizedProps))
              : i === null &&
                e.stateNode !== null &&
                _c(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Vt(t, e),
          kt(e),
          i & 512 && (pt || n === null || Nn(n, n.return)),
          n !== null && i & 4 && _c(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (Vt(t, e),
          kt(e),
          i & 512 && (pt || n === null || Nn(n, n.return)),
          e.flags & 32)
        ) {
          u = e.stateNode;
          try {
            bl(u, "");
          } catch (ne) {
            Ke(e, e.return, ne);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((u = e.memoizedProps), _c(e, u, n !== null ? n.memoizedProps : u)),
          i & 1024 && (wc = !0));
        break;
      case 6:
        if ((Vt(t, e), kt(e), i & 4)) {
          if (e.stateNode === null) throw Error(s(162));
          ((i = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = i;
          } catch (ne) {
            Ke(e, e.return, ne);
          }
        }
        break;
      case 3:
        if (
          ((Cu = null),
          (u = gn),
          (gn = Du(t.containerInfo)),
          Vt(t, e),
          (gn = u),
          kt(e),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            $l(t.containerInfo);
          } catch (ne) {
            Ke(e, e.return, ne);
          }
        wc && ((wc = !1), kh(e));
        break;
      case 4:
        ((i = gn),
          (gn = Du(e.stateNode.containerInfo)),
          Vt(t, e),
          kt(e),
          (gn = i));
        break;
      case 12:
        (Vt(t, e), kt(e));
        break;
      case 31:
        (Vt(t, e),
          kt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), du(e, i))));
        break;
      case 13:
        (Vt(t, e),
          kt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (mu = wt()),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), du(e, i))));
        break;
      case 22:
        u = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null,
          M = ea,
          H = pt;
        if (
          ((ea = M || u),
          (pt = H || E),
          Vt(t, e),
          (pt = H),
          (ea = M),
          kt(e),
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
                    var Y = E.memoizedProps.style,
                      w =
                        Y != null && Y.hasOwnProperty("display")
                          ? Y.display
                          : null;
                    m.style.display =
                      w == null || typeof w == "boolean" ? "" : ("" + w).trim();
                  }
                } catch (ne) {
                  Ke(E, E.return, ne);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = u ? "" : E.memoizedProps;
                } catch (ne) {
                  Ke(E, E.return, ne);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                E = t;
                try {
                  var j = E.stateNode;
                  u ? xm(j, !0) : xm(E.stateNode, !1);
                } catch (ne) {
                  Ke(E, E.return, ne);
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
            n !== null && ((i.retryQueue = null), du(e, n))));
        break;
      case 19:
        (Vt(t, e),
          kt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), du(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Vt(t, e), kt(e));
    }
  }
  function kt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null;) {
          if (zh(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var u = n.stateNode,
              c = Mc(e);
            fu(e, c, u);
            break;
          case 5:
            var d = n.stateNode;
            n.flags & 32 && (bl(d, ""), (n.flags &= -33));
            var m = Mc(e);
            fu(e, m, d);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo,
              M = Mc(e);
            xc(e, M, E);
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
  function kh(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var t = e;
        (kh(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function na(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null;) (jh(e, t.alternate, t), (t = t.sibling));
  }
  function il(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Na(4, t, t.return), il(t));
          break;
        case 1:
          Nn(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && xh(t, t.return, n),
            il(t));
          break;
        case 27:
          Fi(t.stateNode);
        case 26:
        case 5:
          (Nn(t, t.return), il(t));
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
          (aa(u, c, n), ji(4, c));
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
            } catch (M) {
              Ke(i, i.return, M);
            }
          if (((i = c), (u = i.updateQueue), u !== null)) {
            var m = i.stateNode;
            try {
              var E = u.shared.hiddenCallbacks;
              if (E !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < E.length; u++)
                  bd(E[u], m);
            } catch (M) {
              Ke(i, i.return, M);
            }
          }
          (n && d & 64 && Mh(c), Hi(c, c.return));
          break;
        case 27:
          Uh(c);
        case 26:
        case 5:
          (aa(u, c, n), n && i === null && d & 4 && wh(c), Hi(c, c.return));
          break;
        case 12:
          aa(u, c, n);
          break;
        case 31:
          (aa(u, c, n), n && d & 4 && qh(u, c));
          break;
        case 13:
          (aa(u, c, n), n && d & 4 && Yh(u, c));
          break;
        case 22:
          (c.memoizedState === null && aa(u, c, n), Hi(c, c.return));
          break;
        case 30:
          break;
        default:
          aa(u, c, n);
      }
      t = t.sibling;
    }
  }
  function zc(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && Ri(n)));
  }
  function Uc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ri(e)));
  }
  function bn(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) (Gh(e, t, n, i), (t = t.sibling));
  }
  function Gh(e, t, n, i) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (bn(e, t, n, i), u & 2048 && ji(9, t));
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
            t !== e && (t.refCount++, e != null && Ri(e))));
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
              : Bi(e, t)
            : c._visibility & 2
              ? bn(e, t, n, i)
              : ((c._visibility |= 2),
                ql(e, t, n, i, (t.subtreeFlags & 10256) !== 0 || !1)),
          u & 2048 && zc(d, t));
        break;
      case 24:
        (bn(e, t, n, i), u & 2048 && Uc(t.alternate, t));
        break;
      default:
        bn(e, t, n, i);
    }
  }
  function ql(e, t, n, i, u) {
    for (
      u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var c = e,
        d = t,
        m = n,
        E = i,
        M = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          (ql(c, d, m, E, u), ji(8, d));
          break;
        case 23:
          break;
        case 22:
          var H = d.stateNode;
          (d.memoizedState !== null
            ? H._visibility & 2
              ? ql(c, d, m, E, u)
              : Bi(c, d)
            : ((H._visibility |= 2), ql(c, d, m, E, u)),
            u && M & 2048 && zc(d.alternate, d));
          break;
        case 24:
          (ql(c, d, m, E, u), u && M & 2048 && Uc(d.alternate, d));
          break;
        default:
          ql(c, d, m, E, u);
      }
      t = t.sibling;
    }
  }
  function Bi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) {
        var n = e,
          i = t,
          u = i.flags;
        switch (i.tag) {
          case 22:
            (Bi(n, i), u & 2048 && zc(i.alternate, i));
            break;
          case 24:
            (Bi(n, i), u & 2048 && Uc(i.alternate, i));
            break;
          default:
            Bi(n, i);
        }
        t = t.sibling;
      }
  }
  var qi = 8192;
  function Yl(e, t, n) {
    if (e.subtreeFlags & qi)
      for (e = e.child; e !== null;) (Qh(e, t, n), (e = e.sibling));
  }
  function Qh(e, t, n) {
    switch (e.tag) {
      case 26:
        (Yl(e, t, n),
          e.flags & qi &&
            e.memoizedState !== null &&
            ug(n, gn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Yl(e, t, n);
        break;
      case 3:
      case 4:
        var i = gn;
        ((gn = Du(e.stateNode.containerInfo)), Yl(e, t, n), (gn = i));
        break;
      case 22:
        e.memoizedState === null &&
          ((i = e.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = qi), (qi = 16777216), Yl(e, t, n), (qi = i))
            : Yl(e, t, n));
        break;
      default:
        Yl(e, t, n);
    }
  }
  function Xh(e) {
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
          ((Tt = i), Zh(i, e));
        }
      Xh(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) (Fh(e), (e = e.sibling));
  }
  function Fh(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Yi(e), e.flags & 2048 && Na(9, e, e.return));
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
          ? ((t._visibility &= -3), hu(e))
          : Yi(e);
        break;
      default:
        Yi(e);
    }
  }
  function hu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Tt = i), Zh(i, e));
        }
      Xh(e);
    }
    for (e = e.child; e !== null;) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Na(8, t, t.return), hu(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), hu(t)));
          break;
        default:
          hu(t);
      }
      e = e.sibling;
    }
  }
  function Zh(e, t) {
    for (; Tt !== null;) {
      var n = Tt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Na(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Ri(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (Tt = i));
      else
        e: for (n = e; Tt !== null;) {
          i = Tt;
          var u = i.sibling,
            c = i.return;
          if ((Hh(i), i === n)) {
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
  var Tv = {
      getCacheForType: function (e) {
        var t = Dt(ht),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return Dt(ht).controller.signal;
      }
    },
    Rv = typeof WeakMap == "function" ? WeakMap : Map,
    Qe = 0,
    et = null,
    xe = null,
    ze = 0,
    Ze = 0,
    Jt = null,
    Ca = !1,
    Vl = !1,
    Lc = !1,
    la = 0,
    ct = 0,
    _a = 0,
    rl = 0,
    jc = 0,
    $t = 0,
    kl = 0,
    Vi = null,
    Gt = null,
    Hc = !1,
    mu = 0,
    Kh = 0,
    yu = 1 / 0,
    pu = null,
    Ma = null,
    Et = 0,
    xa = null,
    Gl = null,
    ia = 0,
    Bc = 0,
    qc = null,
    Jh = null,
    ki = 0,
    Yc = null;
  function It() {
    return (Qe & 2) !== 0 && ze !== 0 ? ze & -ze : x.T !== null ? Fc() : k();
  }
  function $h() {
    if ($t === 0)
      if ((ze & 536870912) === 0 || je) {
        var e = Bn;
        ((Bn <<= 1), (Bn & 3932160) === 0 && (Bn = 262144), ($t = e));
      } else $t = 536870912;
    return ((e = Zt.current), e !== null && (e.flags |= 32), $t);
  }
  function Qt(e, t, n) {
    (((e === et && (Ze === 2 || Ze === 9)) || e.cancelPendingCommit !== null) &&
      (Ql(e, 0), wa(e, ze, $t, !1)),
      An(e, n),
      ((Qe & 2) === 0 || e !== et) &&
        (e === et &&
          ((Qe & 2) === 0 && (rl |= n), ct === 4 && wa(e, ze, $t, !1)),
        Cn(e)));
  }
  function Ih(e, t, n) {
    if ((Qe & 6) !== 0) throw Error(s(327));
    var i = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || ha(e, t),
      u = i ? Dv(e, t) : kc(e, t, !0),
      c = i;
    do {
      if (u === 0) {
        Vl && !i && wa(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), c && !Av(n))) {
          ((u = kc(e, t, !1)), (c = !1));
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
              if ((E && (Ql(m, d).flags |= 256), (d = kc(m, d, !1)), d !== 2)) {
                if (Lc && !E) {
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
          (Ql(e, 0), wa(e, t, 0, !0));
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
              wa(i, t, $t, !Ca);
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
          if ((t & 62914560) === t && ((u = mu + 300 - wt()), 10 < u)) {
            if ((wa(i, t, $t, !Ca), pl(i, 0, !0) !== 0)) break e;
            ((ia = t),
              (i.timeoutHandle = Cm(
                Wh.bind(
                  null,
                  i,
                  n,
                  Gt,
                  pu,
                  Hc,
                  t,
                  $t,
                  rl,
                  kl,
                  Ca,
                  c,
                  "Throttled",
                  -0,
                  0
                ),
                u
              )));
            break e;
          }
          Wh(i, n, Gt, pu, Hc, t, $t, rl, kl, Ca, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    Cn(e);
  }
  function Wh(e, t, n, i, u, c, d, m, E, M, H, Y, w, j) {
    if (
      ((e.timeoutHandle = -1),
      (Y = t.subtreeFlags),
      Y & 8192 || (Y & 16785408) === 16785408)
    ) {
      ((Y = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Qn
      }),
        Qh(t, c, Y));
      var ne =
        (c & 62914560) === c ? mu - wt() : (c & 4194048) === c ? Kh - wt() : 0;
      if (((ne = sg(Y, ne)), ne !== null)) {
        ((ia = c),
          (e.cancelPendingCommit = ne(
            rm.bind(null, e, t, c, n, i, u, d, m, E, H, Y, null, w, j)
          )),
          wa(e, c, d, !M));
        return;
      }
    }
    rm(e, t, c, n, i, u, d, m, E);
  }
  function Av(e) {
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
  function wa(e, t, n, i) {
    ((t &= ~jc),
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
    n !== 0 && Nr(e, n, t);
  }
  function vu() {
    return (Qe & 6) === 0 ? (Gi(0), !1) : !0;
  }
  function Vc() {
    if (xe !== null) {
      if (Ze === 0) var e = xe.return;
      else ((e = xe), (Kn = Ia = null), ac(e), (Ul = null), (Oi = 0), (e = xe));
      for (; e !== null;) (_h(e.alternate, e), (e = e.return));
      xe = null;
    }
  }
  function Ql(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), Qv(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (ia = 0),
      Vc(),
      (et = e),
      (xe = n = Fn(e.current, null)),
      (ze = t),
      (Ze = 0),
      (Jt = null),
      (Ca = !1),
      (Vl = ha(e, t)),
      (Lc = !1),
      (kl = $t = jc = rl = _a = ct = 0),
      (Gt = Vi = null),
      (Hc = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i;) {
        var u = 31 - _t(i),
          c = 1 << u;
        ((t |= e[u]), (i &= ~c));
      }
    return ((la = t), Br(), n);
  }
  function Ph(e, t) {
    ((Re = null),
      (x.H = zi),
      t === zl || t === Fr
        ? ((t = yd()), (Ze = 3))
        : t === Xs
          ? ((t = yd()), (Ze = 4))
          : (Ze =
              t === bc
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Jt = t),
      xe === null && ((ct = 1), ru(e, ln(t, e.current))));
  }
  function em() {
    var e = Zt.current;
    return e === null
      ? !0
      : (ze & 4194048) === ze
        ? cn === null
        : (ze & 62914560) === ze || (ze & 536870912) !== 0
          ? e === cn
          : !1;
  }
  function tm() {
    var e = x.H;
    return ((x.H = zi), e === null ? zi : e);
  }
  function nm() {
    var e = x.A;
    return ((x.A = Tv), e);
  }
  function gu() {
    ((ct = 4),
      Ca || ((ze & 4194048) !== ze && Zt.current !== null) || (Vl = !0),
      ((_a & 134217727) === 0 && (rl & 134217727) === 0) ||
        et === null ||
        wa(et, ze, $t, !1));
  }
  function kc(e, t, n) {
    var i = Qe;
    Qe |= 2;
    var u = tm(),
      c = nm();
    ((et !== e || ze !== t) && ((pu = null), Ql(e, t)), (t = !1));
    var d = ct;
    e: do
      try {
        if (Ze !== 0 && xe !== null) {
          var m = xe,
            E = Jt;
          switch (Ze) {
            case 8:
              (Vc(), (d = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (t = !0);
              var M = Ze;
              if (((Ze = 0), (Jt = null), Xl(e, m, E, M), n && Vl)) {
                d = 0;
                break e;
              }
              break;
            default:
              ((M = Ze), (Ze = 0), (Jt = null), Xl(e, m, E, M));
          }
        }
        (Ov(), (d = ct));
        break;
      } catch (H) {
        Ph(e, H);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (Kn = Ia = null),
      (Qe = i),
      (x.H = u),
      (x.A = c),
      xe === null && ((et = null), (ze = 0), Br()),
      d
    );
  }
  function Ov() {
    for (; xe !== null;) am(xe);
  }
  function Dv(e, t) {
    var n = Qe;
    Qe |= 2;
    var i = tm(),
      u = nm();
    et !== e || ze !== t
      ? ((pu = null), (yu = wt() + 500), Ql(e, t))
      : (Vl = ha(e, t));
    e: do
      try {
        if (Ze !== 0 && xe !== null) {
          t = xe;
          var c = Jt;
          t: switch (Ze) {
            case 1:
              ((Ze = 0), (Jt = null), Xl(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (hd(c)) {
                ((Ze = 0), (Jt = null), lm(t));
                break;
              }
              ((t = function () {
                ((Ze !== 2 && Ze !== 9) || et !== e || (Ze = 7), Cn(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              Ze = 7;
              break e;
            case 4:
              Ze = 5;
              break e;
            case 7:
              hd(c)
                ? ((Ze = 0), (Jt = null), lm(t))
                : ((Ze = 0), (Jt = null), Xl(e, t, c, 7));
              break;
            case 5:
              var d = null;
              switch (xe.tag) {
                case 26:
                  d = xe.memoizedState;
                case 5:
                case 27:
                  var m = xe;
                  if (d ? Gm(d) : m.stateNode.complete) {
                    ((Ze = 0), (Jt = null));
                    var E = m.sibling;
                    if (E !== null) xe = E;
                    else {
                      var M = m.return;
                      M !== null ? ((xe = M), bu(M)) : (xe = null);
                    }
                    break t;
                  }
              }
              ((Ze = 0), (Jt = null), Xl(e, t, c, 5));
              break;
            case 6:
              ((Ze = 0), (Jt = null), Xl(e, t, c, 6));
              break;
            case 8:
              (Vc(), (ct = 6));
              break e;
            default:
              throw Error(s(462));
          }
        }
        Nv();
        break;
      } catch (H) {
        Ph(e, H);
      }
    while (!0);
    return (
      (Kn = Ia = null),
      (x.H = i),
      (x.A = u),
      (Qe = n),
      xe !== null ? 0 : ((et = null), (ze = 0), Br(), ct)
    );
  }
  function Nv() {
    for (; xe !== null && !ls();) am(xe);
  }
  function am(e) {
    var t = Nh(e.alternate, e, la);
    ((e.memoizedProps = e.pendingProps), t === null ? bu(e) : (xe = t));
  }
  function lm(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Sh(n, t, t.pendingProps, t.type, void 0, ze);
        break;
      case 11:
        t = Sh(n, t, t.pendingProps, t.type.render, t.ref, ze);
        break;
      case 5:
        ac(t);
      default:
        (_h(n, t), (t = xe = nd(t, la)), (t = Nh(n, t, la)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? bu(e) : (xe = t));
  }
  function Xl(e, t, n, i) {
    ((Kn = Ia = null), ac(t), (Ul = null), (Oi = 0));
    var u = t.return;
    try {
      if (yv(e, u, t, n, ze)) {
        ((ct = 1), ru(e, ln(n, e.current)), (xe = null));
        return;
      }
    } catch (c) {
      if (u !== null) throw ((xe = u), c);
      ((ct = 1), ru(e, ln(n, e.current)), (xe = null));
      return;
    }
    t.flags & 32768
      ? (je || i === 1
          ? (e = !0)
          : Vl || (ze & 536870912) !== 0
            ? (e = !1)
            : ((Ca = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Zt.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        im(t, e))
      : bu(t);
  }
  function bu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        im(t, Ca);
        return;
      }
      e = t.return;
      var n = gv(t.alternate, t, la);
      if (n !== null) {
        xe = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function im(e, t) {
    do {
      var n = bv(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (xe = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        xe = e;
        return;
      }
      xe = e = n;
    } while (e !== null);
    ((ct = 6), (xe = null));
  }
  function rm(e, t, n, i, u, c, d, m, E) {
    e.cancelPendingCommit = null;
    do Eu();
    while (Et !== 0);
    if ((Qe & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Ms),
        Dr(e, n, c, d, m, E),
        e === et && ((xe = et = null), (ze = 0)),
        (Gl = t),
        (xa = e),
        (ia = n),
        (Bc = c),
        (qc = u),
        (Jh = i),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            xv(da, function () {
              return (fm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = x.T), (x.T = null), (u = Q.p), (Q.p = 2), (d = Qe), (Qe |= 4));
        try {
          Ev(e, t, n);
        } finally {
          ((Qe = d), (Q.p = u), (x.T = i));
        }
      }
      ((Et = 1), um(), sm(), cm());
    }
  }
  function um() {
    if (Et === 1) {
      Et = 0;
      var e = xa,
        t = Gl,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = x.T), (x.T = null));
        var i = Q.p;
        Q.p = 2;
        var u = Qe;
        Qe |= 4;
        try {
          Vh(t, e);
          var c = eo,
            d = Zf(e.containerInfo),
            m = c.focusedElem,
            E = c.selectionRange;
          if (
            d !== m &&
            m &&
            m.ownerDocument &&
            Ff(m.ownerDocument.documentElement, m)
          ) {
            if (E !== null && Os(m)) {
              var M = E.start,
                H = E.end;
              if ((H === void 0 && (H = M), "selectionStart" in m))
                ((m.selectionStart = M),
                  (m.selectionEnd = Math.min(H, m.value.length)));
              else {
                var Y = m.ownerDocument || document,
                  w = (Y && Y.defaultView) || window;
                if (w.getSelection) {
                  var j = w.getSelection(),
                    ne = m.textContent.length,
                    ye = Math.min(E.start, ne),
                    We = E.end === void 0 ? ye : Math.min(E.end, ne);
                  !j.extend && ye > We && ((d = We), (We = ye), (ye = d));
                  var O = Xf(m, ye),
                    R = Xf(m, We);
                  if (
                    O &&
                    R &&
                    (j.rangeCount !== 1 ||
                      j.anchorNode !== O.node ||
                      j.anchorOffset !== O.offset ||
                      j.focusNode !== R.node ||
                      j.focusOffset !== R.offset)
                  ) {
                    var _ = Y.createRange();
                    (_.setStart(O.node, O.offset),
                      j.removeAllRanges(),
                      ye > We
                        ? (j.addRange(_), j.extend(R.node, R.offset))
                        : (_.setEnd(R.node, R.offset), j.addRange(_)));
                  }
                }
              }
            }
            for (Y = [], j = m; (j = j.parentNode);)
              j.nodeType === 1 &&
                Y.push({ element: j, left: j.scrollLeft, top: j.scrollTop });
            for (
              typeof m.focus == "function" && m.focus(), m = 0;
              m < Y.length;
              m++
            ) {
              var q = Y[m];
              ((q.element.scrollLeft = q.left), (q.element.scrollTop = q.top));
            }
          }
          ((wu = !!Pc), (eo = Pc = null));
        } finally {
          ((Qe = u), (Q.p = i), (x.T = n));
        }
      }
      ((e.current = t), (Et = 2));
    }
  }
  function sm() {
    if (Et === 2) {
      Et = 0;
      var e = xa,
        t = Gl,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = x.T), (x.T = null));
        var i = Q.p;
        Q.p = 2;
        var u = Qe;
        Qe |= 4;
        try {
          jh(e, t.alternate, t);
        } finally {
          ((Qe = u), (Q.p = i), (x.T = n));
        }
      }
      Et = 3;
    }
  }
  function cm() {
    if (Et === 4 || Et === 3) {
      ((Et = 0), is());
      var e = xa,
        t = Gl,
        n = ia,
        i = Jh;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Et = 5)
        : ((Et = 0), (Gl = xa = null), om(e, e.pendingLanes));
      var u = e.pendingLanes;
      if (
        (u === 0 && (Ma = null),
        C(n),
        (t = t.stateNode),
        zt && typeof zt.onCommitFiberRoot == "function")
      )
        try {
          zt.onCommitFiberRoot(Hn, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((t = x.T), (u = Q.p), (Q.p = 2), (x.T = null));
        try {
          for (var c = e.onRecoverableError, d = 0; d < i.length; d++) {
            var m = i[d];
            c(m.value, { componentStack: m.stack });
          }
        } finally {
          ((x.T = t), (Q.p = u));
        }
      }
      ((ia & 3) !== 0 && Eu(),
        Cn(e),
        (u = e.pendingLanes),
        (n & 261930) !== 0 && (u & 42) !== 0
          ? e === Yc
            ? ki++
            : ((ki = 0), (Yc = e))
          : (ki = 0),
        Gi(0));
    }
  }
  function om(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ri(t)));
  }
  function Eu() {
    return (um(), sm(), cm(), fm());
  }
  function fm() {
    if (Et !== 5) return !1;
    var e = xa,
      t = Bc;
    Bc = 0;
    var n = C(ia),
      i = x.T,
      u = Q.p;
    try {
      ((Q.p = 32 > n ? 32 : n), (x.T = null), (n = qc), (qc = null));
      var c = xa,
        d = ia;
      if (((Et = 0), (Gl = xa = null), (ia = 0), (Qe & 6) !== 0))
        throw Error(s(331));
      var m = Qe;
      if (
        ((Qe |= 4),
        Fh(c.current),
        Gh(c, c.current, d, n),
        (Qe = m),
        Gi(0, !1),
        zt && typeof zt.onPostCommitFiberRoot == "function")
      )
        try {
          zt.onPostCommitFiberRoot(Hn, c);
        } catch {}
      return !0;
    } finally {
      ((Q.p = u), (x.T = i), om(e, t));
    }
  }
  function dm(e, t, n) {
    ((t = ln(n, t)),
      (t = gc(e.stateNode, t, 2)),
      (e = Aa(e, t, 2)),
      e !== null && (An(e, 2), Cn(e)));
  }
  function Ke(e, t, n) {
    if (e.tag === 3) dm(e, e, n);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          dm(t, e, n);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (Ma === null || !Ma.has(i)))
          ) {
            ((e = ln(n, e)),
              (n = hh(2)),
              (i = Aa(t, n, 2)),
              i !== null && (mh(n, i, t, e), An(i, 2), Cn(i)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Gc(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Rv();
      var u = new Set();
      i.set(t, u);
    } else ((u = i.get(t)), u === void 0 && ((u = new Set()), i.set(t, u)));
    u.has(n) ||
      ((Lc = !0), u.add(n), (e = Cv.bind(null, e, t, n)), t.then(e, e));
  }
  function Cv(e, t, n) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      et === e &&
        (ze & n) === n &&
        (ct === 4 || (ct === 3 && (ze & 62914560) === ze && 300 > wt() - mu)
          ? (Qe & 2) === 0 && Ql(e, 0)
          : (jc |= n),
        kl === ze && (kl = 0)),
      Cn(e));
  }
  function hm(e, t) {
    (t === 0 && (t = fi()), (e = Ka(e, t)), e !== null && (An(e, t), Cn(e)));
  }
  function _v(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), hm(e, n));
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
    (i !== null && i.delete(t), hm(e, n));
  }
  function xv(e, t) {
    return yl(e, t);
  }
  var Su = null,
    Fl = null,
    Qc = !1,
    Tu = !1,
    Xc = !1,
    za = 0;
  function Cn(e) {
    (e !== Fl &&
      e.next === null &&
      (Fl === null ? (Su = Fl = e) : (Fl = Fl.next = e)),
      (Tu = !0),
      Qc || ((Qc = !0), zv()));
  }
  function Gi(e, t) {
    if (!Xc && Tu) {
      Xc = !0;
      do
        for (var n = !1, i = Su; i !== null;) {
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
            c !== 0 && ((n = !0), vm(i, c));
          } else
            ((c = ze),
              (c = pl(
                i,
                i === et ? c : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1
              )),
              (c & 3) === 0 || ha(i, c) || ((n = !0), vm(i, c)));
          i = i.next;
        }
      while (n);
      Xc = !1;
    }
  }
  function wv() {
    mm();
  }
  function mm() {
    Tu = Qc = !1;
    var e = 0;
    za !== 0 && Gv() && (e = za);
    for (var t = wt(), n = null, i = Su; i !== null;) {
      var u = i.next,
        c = ym(i, t);
      (c === 0
        ? ((i.next = null),
          n === null ? (Su = u) : (n.next = u),
          u === null && (Fl = n))
        : ((n = i), (e !== 0 || (c & 3) !== 0) && (Tu = !0)),
        (i = u));
    }
    ((Et !== 0 && Et !== 5) || Gi(e), za !== 0 && (za = 0));
  }
  function ym(e, t) {
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
        ? ((m & n) === 0 || (m & i) !== 0) && (u[d] = cs(m, t))
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
        (e === t && (Ze === 2 || Ze === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && ci(i),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || ha(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((i !== null && ci(i), C(n))) {
        case 2:
        case 8:
          n = oi;
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
        (i = pm.bind(null, e)),
        (n = yl(n, i)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      i !== null && i !== null && ci(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function pm(e, t) {
    if (Et !== 0 && Et !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Eu() && e.callbackNode !== n) return null;
    var i = ze;
    return (
      (i = pl(
        e,
        e === et ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      i === 0
        ? null
        : (Ih(e, i, t),
          ym(e, wt()),
          e.callbackNode != null && e.callbackNode === n
            ? pm.bind(null, e)
            : null)
    );
  }
  function vm(e, t) {
    if (Eu()) return null;
    Ih(e, t, !0);
  }
  function zv() {
    Xv(function () {
      (Qe & 6) !== 0 ? yl(fa, wv) : mm();
    });
  }
  function Fc() {
    if (za === 0) {
      var e = xl;
      (e === 0 && ((e = ka), (ka <<= 1), (ka & 261888) === 0 && (ka = 256)),
        (za = e));
    }
    return za;
  }
  function gm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Mr("" + e);
  }
  function bm(e, t) {
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
  function Uv(e, t, n, i, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var c = gm((u[K] || null).action),
        d = i.submitter;
      d &&
        ((t = (t = d[K] || null)
          ? gm(t.formAction)
          : d.getAttribute("formAction")),
        t !== null && ((c = t), (d = null)));
      var m = new Ur("action", "action", null, i, u);
      e.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (za !== 0) {
                  var E = d ? bm(u, d) : new FormData(u);
                  dc(
                    n,
                    { pending: !0, data: E, method: u.method, action: c },
                    null,
                    E
                  );
                }
              } else
                typeof c == "function" &&
                  (m.preventDefault(),
                  (E = d ? bm(u, d) : new FormData(u)),
                  dc(
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
  for (var Zc = 0; Zc < _s.length; Zc++) {
    var Kc = _s[Zc],
      Lv = Kc.toLowerCase(),
      jv = Kc[0].toUpperCase() + Kc.slice(1);
    vn(Lv, "on" + jv);
  }
  (vn($f, "onAnimationEnd"),
    vn(If, "onAnimationIteration"),
    vn(Wf, "onAnimationStart"),
    vn("dblclick", "onDoubleClick"),
    vn("focusin", "onFocus"),
    vn("focusout", "onBlur"),
    vn(Wp, "onTransitionRun"),
    vn(Pp, "onTransitionStart"),
    vn(ev, "onTransitionCancel"),
    vn(Pf, "onTransitionEnd"),
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
  var Qi =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Hv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Qi)
    );
  function Em(e, t) {
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
              M = m.currentTarget;
            if (((m = m.listener), E !== c && u.isPropagationStopped()))
              break e;
            ((c = m), (u.currentTarget = M));
            try {
              c(u);
            } catch (H) {
              Hr(H);
            }
            ((u.currentTarget = null), (c = E));
          }
        else
          for (d = 0; d < i.length; d++) {
            if (
              ((m = i[d]),
              (E = m.instance),
              (M = m.currentTarget),
              (m = m.listener),
              E !== c && u.isPropagationStopped())
            )
              break e;
            ((c = m), (u.currentTarget = M));
            try {
              c(u);
            } catch (H) {
              Hr(H);
            }
            ((u.currentTarget = null), (c = E));
          }
      }
    }
  }
  function we(e, t) {
    var n = t[pe];
    n === void 0 && (n = t[pe] = new Set());
    var i = e + "__bubble";
    n.has(i) || (Sm(t, e, 2, !1), n.add(i));
  }
  function Jc(e, t, n) {
    var i = 0;
    (t && (i |= 4), Sm(n, e, i, t));
  }
  var Ru = "_reactListening" + Math.random().toString(36).slice(2);
  function $c(e) {
    if (!e[Ru]) {
      ((e[Ru] = !0),
        pn.forEach(function (n) {
          n !== "selectionchange" && (Hv.has(n) || Jc(n, !1, e), Jc(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ru] || ((t[Ru] = !0), Jc("selectionchange", !1, t));
    }
  }
  function Sm(e, t, n, i) {
    switch ($m(t)) {
      case 2:
        var u = fg;
        break;
      case 8:
        u = dg;
        break;
      default:
        u = fo;
    }
    ((n = u.bind(null, t, n, e)),
      (u = void 0),
      !ps ||
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
  function Ic(e, t, n, i, u) {
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
      var M = c,
        H = ms(n),
        Y = [];
      e: {
        var w = ed.get(e);
        if (w !== void 0) {
          var j = Ur,
            ne = e;
          switch (e) {
            case "keypress":
              if (wr(n) === 0) break e;
            case "keydown":
            case "keyup":
              j = Mp;
              break;
            case "focusin":
              ((ne = "focus"), (j = Es));
              break;
            case "focusout":
              ((ne = "blur"), (j = Es));
              break;
            case "beforeblur":
            case "afterblur":
              j = Es;
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
              j = _f;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              j = gp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              j = zp;
              break;
            case $f:
            case If:
            case Wf:
              j = Sp;
              break;
            case Pf:
              j = Lp;
              break;
            case "scroll":
            case "scrollend":
              j = pp;
              break;
            case "wheel":
              j = Hp;
              break;
            case "copy":
            case "cut":
            case "paste":
              j = Rp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              j = xf;
              break;
            case "toggle":
            case "beforetoggle":
              j = qp;
          }
          var ye = (t & 4) !== 0,
            We = !ye && (e === "scroll" || e === "scrollend"),
            O = ye ? (w !== null ? w + "Capture" : null) : w;
          ye = [];
          for (var R = M, _; R !== null;) {
            var q = R;
            if (
              ((_ = q.stateNode),
              (q = q.tag),
              (q !== 5 && q !== 26 && q !== 27) ||
                _ === null ||
                O === null ||
                ((q = di(R, O)), q != null && ye.push(Xi(R, q, _))),
              We)
            )
              break;
            R = R.return;
          }
          0 < ye.length &&
            ((w = new j(w, ne, null, n, H)),
            Y.push({ event: w, listeners: ye }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((w = e === "mouseover" || e === "pointerover"),
            (j = e === "mouseout" || e === "pointerout"),
            w &&
              n !== hs &&
              (ne = n.relatedTarget || n.fromElement) &&
              (tt(ne) || ne[I]))
          )
            break e;
          if (
            (j || w) &&
            ((w =
              H.window === H
                ? H
                : (w = H.ownerDocument)
                  ? w.defaultView || w.parentWindow
                  : window),
            j
              ? ((ne = n.relatedTarget || n.toElement),
                (j = M),
                (ne = ne ? tt(ne) : null),
                ne !== null &&
                  ((We = f(ne)),
                  (ye = ne.tag),
                  ne !== We || (ye !== 5 && ye !== 27 && ye !== 6)) &&
                  (ne = null))
              : ((j = null), (ne = M)),
            j !== ne)
          ) {
            if (
              ((ye = _f),
              (q = "onMouseLeave"),
              (O = "onMouseEnter"),
              (R = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((ye = xf),
                (q = "onPointerLeave"),
                (O = "onPointerEnter"),
                (R = "pointer")),
              (We = j == null ? w : Ut(j)),
              (_ = ne == null ? w : Ut(ne)),
              (w = new ye(q, R + "leave", j, n, H)),
              (w.target = We),
              (w.relatedTarget = _),
              (q = null),
              tt(H) === M &&
                ((ye = new ye(O, R + "enter", ne, n, H)),
                (ye.target = _),
                (ye.relatedTarget = We),
                (q = ye)),
              (We = q),
              j && ne)
            )
              t: {
                for (ye = Bv, O = j, R = ne, _ = 0, q = O; q; q = ye(q)) _++;
                q = 0;
                for (var ce = R; ce; ce = ye(ce)) q++;
                for (; 0 < _ - q;) ((O = ye(O)), _--);
                for (; 0 < q - _;) ((R = ye(R)), q--);
                for (; _--;) {
                  if (O === R || (R !== null && O === R.alternate)) {
                    ye = O;
                    break t;
                  }
                  ((O = ye(O)), (R = ye(R)));
                }
                ye = null;
              }
            else ye = null;
            (j !== null && Tm(Y, w, j, ye, !1),
              ne !== null && We !== null && Tm(Y, We, ne, ye, !0));
          }
        }
        e: {
          if (
            ((w = M ? Ut(M) : window),
            (j = w.nodeName && w.nodeName.toLowerCase()),
            j === "select" || (j === "input" && w.type === "file"))
          )
            var Ye = qf;
          else if (Hf(w))
            if (Yf) Ye = Jp;
            else {
              Ye = Zp;
              var re = Fp;
            }
          else
            ((j = w.nodeName),
              !j ||
              j.toLowerCase() !== "input" ||
              (w.type !== "checkbox" && w.type !== "radio")
                ? M && ds(M.elementType) && (Ye = qf)
                : (Ye = Kp));
          if (Ye && (Ye = Ye(e, M))) {
            Bf(Y, Ye, n, H);
            break e;
          }
          (re && re(e, w, M),
            e === "focusout" &&
              M &&
              w.type === "number" &&
              M.memoizedProps.value != null &&
              fs(w, "number", w.value));
        }
        switch (((re = M ? Ut(M) : window), e)) {
          case "focusin":
            (Hf(re) || re.contentEditable === "true") &&
              ((Rl = re), (Ds = M), (Ei = null));
            break;
          case "focusout":
            Ei = Ds = Rl = null;
            break;
          case "mousedown":
            Ns = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Ns = !1), Kf(Y, n, H));
            break;
          case "selectionchange":
            if (Ip) break;
          case "keydown":
          case "keyup":
            Kf(Y, n, H);
        }
        var Ae;
        if (Ts)
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
            ? Lf(e, n) && (Ue = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (Ue = "onCompositionStart");
        (Ue &&
          (wf &&
            n.locale !== "ko" &&
            (Tl || Ue !== "onCompositionStart"
              ? Ue === "onCompositionEnd" && Tl && (Ae = Nf())
              : ((va = H),
                (vs = "value" in va ? va.value : va.textContent),
                (Tl = !0))),
          (re = Au(M, Ue)),
          0 < re.length &&
            ((Ue = new Mf(Ue, e, null, n, H)),
            Y.push({ event: Ue, listeners: re }),
            Ae
              ? (Ue.data = Ae)
              : ((Ae = jf(n)), Ae !== null && (Ue.data = Ae)))),
          (Ae = Vp ? kp(e, n) : Gp(e, n)) &&
            ((Ue = Au(M, "onBeforeInput")),
            0 < Ue.length &&
              ((re = new Mf("onBeforeInput", "beforeinput", null, n, H)),
              Y.push({ event: re, listeners: Ue }),
              (re.data = Ae))),
          Uv(Y, e, M, n, H));
      }
      Em(Y, t);
    });
  }
  function Xi(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Au(e, t) {
    for (var n = t + "Capture", i = []; e !== null;) {
      var u = e,
        c = u.stateNode;
      if (
        ((u = u.tag),
        (u !== 5 && u !== 26 && u !== 27) ||
          c === null ||
          ((u = di(e, n)),
          u != null && i.unshift(Xi(e, u, c)),
          (u = di(e, t)),
          u != null && i.push(Xi(e, u, c))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function Bv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Tm(e, t, n, i, u) {
    for (var c = t._reactName, d = []; n !== null && n !== i;) {
      var m = n,
        E = m.alternate,
        M = m.stateNode;
      if (((m = m.tag), E !== null && E === i)) break;
      ((m !== 5 && m !== 26 && m !== 27) ||
        M === null ||
        ((E = M),
        u
          ? ((M = di(n, c)), M != null && d.unshift(Xi(n, M, E)))
          : u || ((M = di(n, c)), M != null && d.push(Xi(n, M, E)))),
        (n = n.return));
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var qv = /\r\n?/g,
    Yv = /\u0000|\uFFFD/g;
  function Rm(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        qv,
        `
`
      )
      .replace(Yv, "");
  }
  function Am(e, t) {
    return ((t = Rm(t)), Rm(e) === t);
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
        Af(e, i, c);
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
        ((i = Mr("" + i)), e.setAttribute(n, i));
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
        ((i = Mr("" + i)), e.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (e.onclick = Qn);
        break;
      case "onScroll":
        i != null && we("scroll", e);
        break;
      case "onScrollEnd":
        i != null && we("scrollend", e);
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
        ((n = Mr("" + i)),
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
        (we("beforetoggle", e), we("toggle", e), kn(e, "popover", i));
        break;
      case "xlinkActuate":
        be(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        be(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        be(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        be(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        be(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        be(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        be(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        be(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        be(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        kn(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = mp.get(n) || n), kn(e, n, i));
    }
  }
  function Wc(e, t, n, i, u, c) {
    switch (n) {
      case "style":
        Af(e, i, c);
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
        i != null && we("scroll", e);
        break;
      case "onScrollEnd":
        i != null && we("scrollend", e);
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
        if (!qn.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((u = n.endsWith("Capture")),
              (t = n.slice(2, u ? n.length - 7 : void 0)),
              (c = e[K] || null),
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
                : kn(e, n, i);
          }
    }
  }
  function Ct(e, t, n) {
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
        (we("error", e), we("load", e));
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
        we("invalid", e);
        var m = (c = d = u = null),
          E = null,
          M = null;
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
                  M = H;
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
        Ef(e, c, m, E, M, d, u, !1);
        return;
      case "select":
        (we("invalid", e), (i = d = c = null));
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
        (we("invalid", e), (c = u = i = null));
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
        Tf(e, i, u, c);
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
        (we("beforetoggle", e),
          we("toggle", e),
          we("cancel", e),
          we("close", e));
        break;
      case "iframe":
      case "object":
        we("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Qi.length; i++) we(Qi[i], e);
        break;
      case "image":
        (we("error", e), we("load", e));
        break;
      case "details":
        we("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (we("error", e), we("load", e));
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
        for (M in n)
          if (n.hasOwnProperty(M) && ((i = n[M]), i != null))
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ie(e, t, M, i, n, null);
            }
        return;
      default:
        if (ds(t)) {
          for (H in n)
            n.hasOwnProperty(H) &&
              ((i = n[H]), i !== void 0 && Wc(e, t, H, i, n, void 0));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && ((i = n[m]), i != null && Ie(e, t, m, i, n, null));
  }
  function Vv(e, t, n, i) {
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
          M = null,
          H = null;
        for (j in n) {
          var Y = n[j];
          if (n.hasOwnProperty(j) && Y != null)
            switch (j) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = Y;
              default:
                i.hasOwnProperty(j) || Ie(e, t, j, null, i, Y);
            }
        }
        for (var w in i) {
          var j = i[w];
          if (((Y = n[w]), i.hasOwnProperty(w) && (j != null || Y != null)))
            switch (w) {
              case "type":
                c = j;
                break;
              case "name":
                u = j;
                break;
              case "checked":
                M = j;
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
                j !== Y && Ie(e, t, w, j, i, Y);
            }
        }
        os(e, d, m, E, M, H, c, u);
        return;
      case "select":
        j = d = m = w = null;
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
                w = c;
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
          w != null
            ? gl(e, !!n, w, !1)
            : !!i != !!n &&
              (t != null ? gl(e, !!n, t, !0) : gl(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        j = w = null;
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
                w = u;
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
        Sf(e, w, j);
        return;
      case "option":
        for (var ne in n)
          ((w = n[ne]),
            n.hasOwnProperty(ne) &&
              w != null &&
              !i.hasOwnProperty(ne) &&
              (ne === "selected"
                ? (e.selected = !1)
                : Ie(e, t, ne, null, i, w)));
        for (E in i)
          ((w = i[E]),
            (j = n[E]),
            i.hasOwnProperty(E) &&
              w !== j &&
              (w != null || j != null) &&
              (E === "selected"
                ? (e.selected =
                    w && typeof w != "function" && typeof w != "symbol")
                : Ie(e, t, E, w, i, j)));
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
        for (var ye in n)
          ((w = n[ye]),
            n.hasOwnProperty(ye) &&
              w != null &&
              !i.hasOwnProperty(ye) &&
              Ie(e, t, ye, null, i, w));
        for (M in i)
          if (
            ((w = i[M]),
            (j = n[M]),
            i.hasOwnProperty(M) && w !== j && (w != null || j != null))
          )
            switch (M) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null) throw Error(s(137, t));
                break;
              default:
                Ie(e, t, M, w, i, j);
            }
        return;
      default:
        if (ds(t)) {
          for (var We in n)
            ((w = n[We]),
              n.hasOwnProperty(We) &&
                w !== void 0 &&
                !i.hasOwnProperty(We) &&
                Wc(e, t, We, void 0, i, w));
          for (H in i)
            ((w = i[H]),
              (j = n[H]),
              !i.hasOwnProperty(H) ||
                w === j ||
                (w === void 0 && j === void 0) ||
                Wc(e, t, H, w, i, j));
          return;
        }
    }
    for (var O in n)
      ((w = n[O]),
        n.hasOwnProperty(O) &&
          w != null &&
          !i.hasOwnProperty(O) &&
          Ie(e, t, O, null, i, w));
    for (Y in i)
      ((w = i[Y]),
        (j = n[Y]),
        !i.hasOwnProperty(Y) ||
          w === j ||
          (w == null && j == null) ||
          Ie(e, t, Y, w, i, j));
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
  function kv() {
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
              M = E.startTime;
            if (M > m) break;
            var H = E.transferSize,
              Y = E.initiatorType;
            H &&
              Om(Y) &&
              ((E = E.responseEnd), (d += H * (E < m ? 1 : (m - M) / (E - M))));
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
  var Pc = null,
    eo = null;
  function Ou(e) {
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
  function Nm(e, t) {
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
  function to(e, t) {
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
  var no = null;
  function Gv() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === no
        ? !1
        : ((no = e), !0)
      : ((no = null), !1);
  }
  var Cm = typeof setTimeout == "function" ? setTimeout : void 0,
    Qv = typeof clearTimeout == "function" ? clearTimeout : void 0,
    _m = typeof Promise == "function" ? Promise : void 0,
    Xv =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof _m < "u"
          ? function (e) {
              return _m.resolve(null).then(e).catch(Fv);
            }
          : Cm;
  function Fv(e) {
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
            (c[Fe] ||
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
  function xm(e, t) {
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
  function ao(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (ao(n), qe(n));
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
  function Zv(e, t, n, i) {
    for (; e.nodeType === 1;) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[Fe])
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
  function Kv(e, t, n) {
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
  function wm(e, t) {
    for (; e.nodeType !== 8;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = on(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function lo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function io(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function Jv(e, t) {
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
  var ro = null;
  function zm(e) {
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
  function Um(e) {
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
  function Lm(e, t, n) {
    switch (((t = Ou(n)), e)) {
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
    qe(e);
  }
  var fn = new Map(),
    jm = new Set();
  function Du(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var ra = Q.d;
  Q.d = { f: $v, r: Iv, D: Wv, C: Pv, L: eg, m: tg, X: ag, S: ng, M: lg };
  function $v() {
    var e = ra.f(),
      t = vu();
    return e || t;
  }
  function Iv(e) {
    var t = Te(e);
    t !== null && t.tag === 5 && t.type === "form" ? Pd(t) : ra.r(e);
  }
  var Zl = typeof document > "u" ? null : document;
  function Hm(e, t, n) {
    var i = Zl;
    if (i && typeof t == "string" && t) {
      var u = Bt(t);
      ((u = 'link[rel="' + e + '"][href="' + u + '"]'),
        typeof n == "string" && (u += '[crossorigin="' + n + '"]'),
        jm.has(u) ||
          (jm.add(u),
          (e = { rel: e, crossOrigin: n, href: t }),
          i.querySelector(u) === null &&
            ((t = i.createElement("link")),
            Ct(t, "link", e),
            ke(t),
            i.head.appendChild(t))));
    }
  }
  function Wv(e) {
    (ra.D(e), Hm("dns-prefetch", e, null));
  }
  function Pv(e, t) {
    (ra.C(e, t), Hm("preconnect", e, t));
  }
  function eg(e, t, n) {
    ra.L(e, t, n);
    var i = Zl;
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
          (t === "style" && i.querySelector(Zi(c))) ||
          (t === "script" && i.querySelector(Ki(c))) ||
          ((t = i.createElement("link")),
          Ct(t, "link", e),
          ke(t),
          i.head.appendChild(t)));
    }
  }
  function tg(e, t) {
    ra.m(e, t);
    var n = Zl;
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
            if (n.querySelector(Ki(c))) return;
        }
        ((i = n.createElement("link")),
          Ct(i, "link", e),
          ke(i),
          n.head.appendChild(i));
      }
    }
  }
  function ng(e, t, n) {
    ra.S(e, t, n);
    var i = Zl;
    if (i && e) {
      var u = ut(i).hoistableStyles,
        c = Kl(e);
      t = t || "default";
      var d = u.get(c);
      if (!d) {
        var m = { loading: 0, preload: null };
        if ((d = i.querySelector(Zi(c)))) m.loading = 5;
        else {
          ((e = b({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = fn.get(c)) && uo(e, n));
          var E = (d = i.createElement("link"));
          (ke(E),
            Ct(E, "link", e),
            (E._p = new Promise(function (M, H) {
              ((E.onload = M), (E.onerror = H));
            })),
            E.addEventListener("load", function () {
              m.loading |= 1;
            }),
            E.addEventListener("error", function () {
              m.loading |= 2;
            }),
            (m.loading |= 4),
            Nu(d, t, i));
        }
        ((d = { type: "stylesheet", instance: d, count: 1, state: m }),
          u.set(c, d));
      }
    }
  }
  function ag(e, t) {
    ra.X(e, t);
    var n = Zl;
    if (n && e) {
      var i = ut(n).hoistableScripts,
        u = Jl(e),
        c = i.get(u);
      c ||
        ((c = n.querySelector(Ki(u))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = fn.get(u)) && so(e, t),
          (c = n.createElement("script")),
          ke(c),
          Ct(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(u, c));
    }
  }
  function lg(e, t) {
    ra.M(e, t);
    var n = Zl;
    if (n && e) {
      var i = ut(n).hoistableScripts,
        u = Jl(e),
        c = i.get(u);
      c ||
        ((c = n.querySelector(Ki(u))),
        c ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = fn.get(u)) && so(e, t),
          (c = n.createElement("script")),
          ke(c),
          Ct(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(u, c));
    }
  }
  function Bm(e, t, n, i) {
    var u = (u = me.current) ? Du(u) : null;
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
              (c = u.querySelector(Zi(e))) &&
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
                c || ig(u, e, n, d.state))),
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
  function Zi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function qm(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function ig(e, t, n, i) {
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
        Ct(t, "link", n),
        ke(t),
        e.head.appendChild(t));
  }
  function Jl(e) {
    return '[src="' + Bt(e) + '"]';
  }
  function Ki(e) {
    return "script[async]" + e;
  }
  function Ym(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var i = e.querySelector('style[data-href~="' + Bt(n.href) + '"]');
          if (i) return ((t.instance = i), ke(i), i);
          var u = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return (
            (i = (e.ownerDocument || e).createElement("style")),
            ke(i),
            Ct(i, "style", u),
            Nu(i, n.precedence, e),
            (t.instance = i)
          );
        case "stylesheet":
          u = Kl(n.href);
          var c = e.querySelector(Zi(u));
          if (c) return ((t.state.loading |= 4), (t.instance = c), ke(c), c);
          ((i = qm(n)),
            (u = fn.get(u)) && uo(i, u),
            (c = (e.ownerDocument || e).createElement("link")),
            ke(c));
          var d = c;
          return (
            (d._p = new Promise(function (m, E) {
              ((d.onload = m), (d.onerror = E));
            })),
            Ct(c, "link", i),
            (t.state.loading |= 4),
            Nu(c, n.precedence, e),
            (t.instance = c)
          );
        case "script":
          return (
            (c = Jl(n.src)),
            (u = e.querySelector(Ki(c)))
              ? ((t.instance = u), ke(u), u)
              : ((i = n),
                (u = fn.get(c)) && ((i = b({}, n)), so(i, u)),
                (e = e.ownerDocument || e),
                (u = e.createElement("script")),
                ke(u),
                Ct(u, "link", i),
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
        ((i = t.instance), (t.state.loading |= 4), Nu(i, n.precedence, e));
    return t.instance;
  }
  function Nu(e, t, n) {
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
  function uo(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function so(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Cu = null;
  function Vm(e, t, n) {
    if (Cu === null) {
      var i = new Map(),
        u = (Cu = new Map());
      u.set(n, i);
    } else ((u = Cu), (i = u.get(n)), i || ((i = new Map()), u.set(n, i)));
    if (i.has(e)) return i;
    for (
      i.set(e, null), n = n.getElementsByTagName(e), u = 0;
      u < n.length;
      u++
    ) {
      var c = n[u];
      if (
        !(
          c[Fe] ||
          c[W] ||
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
  function km(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      ));
  }
  function rg(e, t, n) {
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
  function Gm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function ug(e, t, n, i) {
    if (
      n.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var u = Kl(i.href),
          c = t.querySelector(Zi(u));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = _u.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = c),
            ke(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (i = qm(i)),
          (u = fn.get(u)) && uo(i, u),
          (c = c.createElement("link")),
          ke(c));
        var d = c;
        ((d._p = new Promise(function (m, E) {
          ((d.onload = m), (d.onerror = E));
        })),
          Ct(c, "link", i),
          (n.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = _u.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n)));
    }
  }
  var co = 0;
  function sg(e, t) {
    return (
      e.stylesheets && e.count === 0 && xu(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var i = setTimeout(function () {
              if ((e.stylesheets && xu(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && co === 0 && (co = 62500 * kv());
            var u = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && xu(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > co ? 50 : 800) + t
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
  function _u() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) xu(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Mu = null;
  function xu(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Mu = new Map()),
        t.forEach(cg, e),
        (Mu = null),
        _u.call(e)));
  }
  function cg(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Mu.get(e);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), Mu.set(e, n));
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
        (i = _u.bind(this)),
        u.addEventListener("load", i),
        u.addEventListener("error", i),
        c
          ? c.parentNode.insertBefore(u, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(u, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Ji = {
    $$typeof: ae,
    Provider: null,
    Consumer: null,
    _currentValue: ie,
    _currentValue2: ie,
    _threadCount: 0
  };
  function og(e, t, n, i, u, c, d, m, E) {
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
  function Qm(e, t, n, i, u, c, d, m, E, M, H, Y) {
    return (
      (e = new og(e, t, n, d, E, M, H, Y, m)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Ft(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = ks()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: i, isDehydrated: n, cache: t }),
      Fs(c),
      e
    );
  }
  function Xm(e) {
    return e ? ((e = Dl), e) : Dl;
  }
  function Fm(e, t, n, i, u, c) {
    ((u = Xm(u)),
      i.context === null ? (i.context = u) : (i.pendingContext = u),
      (i = Ra(t)),
      (i.payload = { element: n }),
      (c = c === void 0 ? null : c),
      c !== null && (i.callback = c),
      (n = Aa(e, i, t)),
      n !== null && (Qt(n, e, t), Ni(n, e, t)));
  }
  function Zm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function oo(e, t) {
    (Zm(e, t), (e = e.alternate) && Zm(e, t));
  }
  function Km(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ka(e, 67108864);
      (t !== null && Qt(t, e, 67108864), oo(e, 67108864));
    }
  }
  function Jm(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = It();
      t = A(t);
      var n = Ka(e, t);
      (n !== null && Qt(n, e, t), oo(e, t));
    }
  }
  var wu = !0;
  function fg(e, t, n, i) {
    var u = x.T;
    x.T = null;
    var c = Q.p;
    try {
      ((Q.p = 2), fo(e, t, n, i));
    } finally {
      ((Q.p = c), (x.T = u));
    }
  }
  function dg(e, t, n, i) {
    var u = x.T;
    x.T = null;
    var c = Q.p;
    try {
      ((Q.p = 8), fo(e, t, n, i));
    } finally {
      ((Q.p = c), (x.T = u));
    }
  }
  function fo(e, t, n, i) {
    if (wu) {
      var u = ho(i);
      if (u === null) (Ic(e, t, i, zu, n), Im(e, i));
      else if (mg(u, e, t, n, i)) i.stopPropagation();
      else if ((Im(e, i), t & 4 && -1 < hg.indexOf(e))) {
        for (; u !== null;) {
          var c = Te(u);
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
                    (Cn(c), (Qe & 6) === 0 && ((yu = wt() + 500), Gi(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((m = Ka(c, 2)), m !== null && Qt(m, c, 2), vu(), oo(c, 2));
            }
          if (((c = ho(i)), c === null && Ic(e, t, i, zu, n), c === u)) break;
          u = c;
        }
        u !== null && i.stopPropagation();
      } else Ic(e, t, i, null, n);
    }
  }
  function ho(e) {
    return ((e = ms(e)), mo(e));
  }
  var zu = null;
  function mo(e) {
    if (((zu = null), (e = tt(e)), e !== null)) {
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
    return ((zu = e), null);
  }
  function $m(e) {
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
          case oi:
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
  var yo = !1,
    La = null,
    ja = null,
    Ha = null,
    $i = new Map(),
    Ii = new Map(),
    Ba = [],
    hg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Im(e, t) {
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
        $i.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ii.delete(t.pointerId);
    }
  }
  function Wi(e, t, n, i, u, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: c,
          targetContainers: [u]
        }),
        t !== null && ((t = Te(t)), t !== null && Km(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        u !== null && t.indexOf(u) === -1 && t.push(u),
        e);
  }
  function mg(e, t, n, i, u) {
    switch (t) {
      case "focusin":
        return ((La = Wi(La, e, t, n, i, u)), !0);
      case "dragenter":
        return ((ja = Wi(ja, e, t, n, i, u)), !0);
      case "mouseover":
        return ((Ha = Wi(Ha, e, t, n, i, u)), !0);
      case "pointerover":
        var c = u.pointerId;
        return ($i.set(c, Wi($i.get(c) || null, e, t, n, i, u)), !0);
      case "gotpointercapture":
        return (
          (c = u.pointerId),
          Ii.set(c, Wi(Ii.get(c) || null, e, t, n, i, u)),
          !0
        );
    }
    return !1;
  }
  function Wm(e) {
    var t = tt(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = h(n)), t !== null)) {
            ((e.blockedOn = t),
              G(e.priority, function () {
                Jm(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = p(n)), t !== null)) {
            ((e.blockedOn = t),
              G(e.priority, function () {
                Jm(n);
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
  function Uu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var n = ho(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((hs = i), n.target.dispatchEvent(i), (hs = null));
      } else return ((t = Te(n)), t !== null && Km(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function Pm(e, t, n) {
    Uu(e) && n.delete(t);
  }
  function yg() {
    ((yo = !1),
      La !== null && Uu(La) && (La = null),
      ja !== null && Uu(ja) && (ja = null),
      Ha !== null && Uu(Ha) && (Ha = null),
      $i.forEach(Pm),
      Ii.forEach(Pm));
  }
  function Lu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      yo ||
        ((yo = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, yg)));
  }
  var ju = null;
  function e0(e) {
    ju !== e &&
      ((ju = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        ju === e && (ju = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            i = e[t + 1],
            u = e[t + 2];
          if (typeof i != "function") {
            if (mo(i || n) === null) continue;
            break;
          }
          var c = Te(n);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            dc(c, { pending: !0, data: u, method: n.method, action: i }, i, u));
        }
      }));
  }
  function $l(e) {
    function t(E) {
      return Lu(E, e);
    }
    (La !== null && Lu(La, e),
      ja !== null && Lu(ja, e),
      Ha !== null && Lu(Ha, e),
      $i.forEach(t),
      Ii.forEach(t));
    for (var n = 0; n < Ba.length; n++) {
      var i = Ba[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ba.length && ((n = Ba[0]), n.blockedOn === null);)
      (Wm(n), n.blockedOn === null && Ba.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var u = n[i],
          c = n[i + 1],
          d = u[K] || null;
        if (typeof c == "function") d || e0(n);
        else if (d) {
          var m = null;
          if (c && c.hasAttribute("formAction")) {
            if (((u = c), (d = c[K] || null))) m = d.formAction;
            else if (mo(u) !== null) continue;
          } else m = d.action;
          (typeof m == "function" ? (n[i + 1] = m) : (n.splice(i, 3), (i -= 3)),
            e0(n));
        }
      }
  }
  function t0() {
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
  function po(e) {
    this._internalRoot = e;
  }
  ((Hu.prototype.render = po.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(s(409));
      var n = t.current,
        i = It();
      Fm(n, i, e, t, null, null);
    }),
    (Hu.prototype.unmount = po.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Fm(e.current, 2, null, e, null, null), vu(), (t[I] = null));
        }
      }));
  function Hu(e) {
    this._internalRoot = e;
  }
  Hu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = k();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ba.length && t !== 0 && t < Ba[n].priority; n++);
      (Ba.splice(n, 0, e), n === 0 && Wm(e));
    }
  };
  var n0 = l.version;
  if (n0 !== "19.2.8") throw Error(s(527, n0, "19.2.8"));
  Q.findDOMNode = function (e) {
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
  var pg = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: x,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bu.isDisabled && Bu.supportsFiber)
      try {
        ((Hn = Bu.inject(pg)), (zt = Bu));
      } catch {}
  }
  return (
    (er.createRoot = function (e, t) {
      if (!o(e)) throw Error(s(299));
      var n = !1,
        i = "",
        u = ch,
        c = oh,
        d = fh;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (d = t.onRecoverableError)),
        (t = Qm(e, 1, !1, null, null, n, i, null, u, c, d, t0)),
        (e[I] = t.current),
        $c(e),
        new po(t)
      );
    }),
    (er.hydrateRoot = function (e, t, n) {
      if (!o(e)) throw Error(s(299));
      var i = !1,
        u = "",
        c = ch,
        d = oh,
        m = fh,
        E = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (u = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (d = n.onCaughtError),
          n.onRecoverableError !== void 0 && (m = n.onRecoverableError),
          n.formState !== void 0 && (E = n.formState)),
        (t = Qm(e, 1, !0, t, n ?? null, i, u, E, c, d, m, t0)),
        (t.context = Xm(null)),
        (n = t.current),
        (i = It()),
        (i = A(i)),
        (u = Ra(i)),
        (u.callback = null),
        Aa(n, u, i),
        (n = i),
        (t.current.lanes = n),
        An(t, n),
        Cn(t),
        (e[I] = t.current),
        $c(e),
        new Hu(t)
      );
    }),
    (er.version = "19.2.8"),
    er
  );
}
var d0;
function Dg() {
  if (d0) return bo.exports;
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
  return (a(), (bo.exports = Og()), bo.exports);
}
var Ng = Dg();
const Wu = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  Jo = /^[\\/]{2}/;
function ly(a, l) {
  return l + a.replace(/\\/g, "/");
}
const h0 = "popstate";
function m0(a) {
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
function Cg(a = {}) {
  function l(s, o) {
    let f = o.state?.masked,
      { pathname: h, search: p, hash: v } = f || s.location;
    return fr(
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
function Ce(a, l) {
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
function _g() {
  return Math.random().toString(36).substring(2, 10);
}
function y0(a, l) {
  return {
    usr: a.state,
    key: a.key,
    idx: l,
    masked: a.mask
      ? { pathname: a.pathname, search: a.search, hash: a.hash }
      : void 0
  };
}
function fr(a, l, r = null, s, o) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? Un(l) : l),
    state: r,
    key: (l && l.key) || s || _g(),
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
    let X = g(),
      P = X == null ? null : X - y;
    ((y = X), v && v({ action: p, location: F.location, delta: P }));
  }
  function D(X, P) {
    p = "PUSH";
    let ee = m0(X) ? X : fr(F.location, X, P);
    y = g() + 1;
    let ae = y0(ee, y),
      de = F.createHref(ee.mask || ee);
    try {
      h.pushState(ae, "", de);
    } catch (oe) {
      if (oe instanceof DOMException && oe.name === "DataCloneError") throw oe;
      o.location.assign(de);
    }
    f && v && v({ action: p, location: F.location, delta: 1 });
  }
  function N(X, P) {
    p = "REPLACE";
    let ee = m0(X) ? X : fr(F.location, X, P);
    y = g();
    let ae = y0(ee, y),
      de = F.createHref(ee.mask || ee);
    (h.replaceState(ae, "", de),
      f && v && v({ action: p, location: F.location, delta: 0 }));
  }
  function U(X) {
    return iy(o, X);
  }
  let F = {
    get action() {
      return p;
    },
    get location() {
      return a(o, h);
    },
    listen(X) {
      if (v) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(h0, b),
        (v = X),
        () => {
          (o.removeEventListener(h0, b), (v = null));
        }
      );
    },
    createHref(X) {
      return l(o, X);
    },
    createURL: U,
    encodeLocation(X) {
      let P = U(X);
      return { pathname: P.pathname, search: P.search, hash: P.hash };
    },
    push: D,
    replace: N,
    go(X) {
      return h.go(X);
    }
  };
  return F;
}
function iy(a, l, r = !1) {
  let s = "http://localhost";
  (a &&
    (s = a.location.origin !== "null" ? a.location.origin : a.location.href),
    Ce(s, "No window.location.(origin|href) available to create URL"));
  let o = typeof l == "string" ? l : zn(l);
  return (
    (o = o.replace(/ $/, "%20")),
    !r && Jo.test(o) && (o = s + o),
    new URL(o, s)
  );
}
var p0 = class {
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
const xg = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function wg(a) {
  return xg.has(a);
}
const zg = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function Ug(a) {
  return zg.has(a);
}
function Lg(a) {
  return a.index === !0;
}
function ry(a) {
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
function dr(a, l = ry, r = [], s = {}, o = !1) {
  return a.map((f, h) => {
    let p = [...r, String(h)],
      v = typeof f.id == "string" ? f.id : p.join("-");
    if (
      (Ce(
        f.index !== !0 || !f.children,
        "Cannot specify children on an index route"
      ),
      Ce(
        o || !s[v],
        `Found a route id collision on id "${v}".  Route id's must be globally unique within Data Router usages`
      ),
      Lg(f))
    ) {
      let y = { ...f, id: v };
      return ((s[v] = v0(y, l(y))), y);
    } else {
      let y = { ...f, id: v, children: void 0 };
      return (
        (s[v] = v0(y, l(y))),
        f.children && (y.children = dr(f.children, l, p, s, o)),
        y
      );
    }
  });
}
function v0(a, l) {
  return Object.assign(a, {
    ...l,
    ...(typeof l.lazy == "object" && l.lazy != null
      ? { lazy: { ...a.lazy, ...l.lazy } }
      : {})
  });
}
function uy(a, l, r = "/") {
  return Sn(a, l, r, !1);
}
function Sn(a, l, r, s, o) {
  let f = Tn((typeof l == "string" ? Un(l) : l).pathname || "/", r);
  if (f == null) return null;
  let h = o ?? Gu(a),
    p = null,
    v = Jg(f);
  for (let y = 0; p == null && y < h.length; ++y) p = Kg(h[y], v, s);
  return p;
}
function jg(a, l) {
  let { route: r, pathname: s, params: o } = a;
  return {
    id: r.id,
    pathname: s,
    params: o,
    loaderData: l[r.id],
    handle: r.handle
  };
}
function Gu(a) {
  let l = sy(a);
  return (Hg(l), l);
}
function sy(a, l = [], r = [], s = "", o = !1) {
  let f = (h, p, v = o, y) => {
    let g = {
      relativePath: y === void 0 ? h.path || "" : y,
      caseSensitive: h.caseSensitive === !0,
      childrenIndex: p,
      route: h
    };
    if (g.relativePath.startsWith("/")) {
      if (!g.relativePath.startsWith(s) && v) return;
      (Ce(
        g.relativePath.startsWith(s),
        `Absolute route path "${g.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (g.relativePath = g.relativePath.slice(s.length)));
    }
    let b = hn([s, g.relativePath]),
      D = r.concat(g);
    (h.children &&
      h.children.length > 0 &&
      (Ce(
        h.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      sy(h.children, l, D, b, v)),
      !(h.path == null && !h.index) &&
        l.push({
          path: b,
          score: Fg(b, h.index),
          routesMeta: D.map((N, U) => {
            let [F, X] = fy(
              N.relativePath,
              N.caseSensitive,
              U === D.length - 1
            );
            return { ...N, matcher: F, compiledParams: X };
          })
        }));
  };
  return (
    a.forEach((h, p) => {
      if (h.path === "" || !h.path?.includes("?")) f(h, p);
      else for (let v of cy(h.path)) f(h, p, !0, v);
    }),
    l
  );
}
function cy(a) {
  let l = a.split("/");
  if (l.length === 0) return [];
  let [r, ...s] = l,
    o = r.endsWith("?"),
    f = r.replace(/\?$/, "");
  if (s.length === 0) return o ? [f, ""] : [f];
  let h = cy(s.join("/")),
    p = [];
  return (
    p.push(...h.map((v) => (v === "" ? f : [f, v].join("/")))),
    o && p.push(...h),
    p.map((v) => (a.startsWith("/") && v === "" ? "/" : v))
  );
}
function Hg(a) {
  a.sort((l, r) =>
    l.score !== r.score
      ? r.score - l.score
      : Zg(
          l.routesMeta.map((s) => s.childrenIndex),
          r.routesMeta.map((s) => s.childrenIndex)
        )
  );
}
const Bg = /^:[\w-]+$/,
  qg = /^:[\w-]+/,
  Yg = 3.5,
  Vg = 3,
  kg = 2,
  Gg = 1,
  Qg = 10,
  Xg = -2,
  g0 = (a) => a === "*";
function Fg(a, l) {
  let r = a.split("/"),
    s = r.length;
  return (
    r.some(g0) && (s += Xg),
    l && (s += kg),
    r
      .filter((o) => !g0(o))
      .reduce(
        (o, f) => o + (Bg.test(f) ? Vg : qg.test(f) ? Yg : f === "" ? Gg : Qg),
        s
      )
  );
}
function Zg(a, l) {
  return a.length === l.length && a.slice(0, -1).every((r, s) => r === l[s])
    ? a[a.length - 1] - l[l.length - 1]
    : 0;
}
function Kg(a, l, r = !1) {
  let { routesMeta: s } = a,
    o = {},
    f = "/",
    h = [];
  for (let p = 0; p < s.length; ++p) {
    let v = s[p],
      y = p === s.length - 1,
      g = f === "/" ? l : l.slice(f.length) || "/",
      b = { path: v.relativePath, caseSensitive: v.caseSensitive, end: y },
      D =
        v.matcher && v.compiledParams
          ? oy(b, g, v.matcher, v.compiledParams)
          : Ju(b, g),
      N = v.route;
    if (
      (!D &&
        y &&
        r &&
        !s[s.length - 1].route.index &&
        (D = Ju(
          { path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 },
          g
        )),
      !D)
    )
      return null;
    (Object.assign(o, D.params),
      h.push({
        params: o,
        pathname: hn([f, D.pathname]),
        pathnameBase: Wg(hn([f, D.pathnameBase])),
        route: N
      }),
      D.pathnameBase !== "/" && (f = hn([f, D.pathnameBase])));
  }
  return h;
}
function Ju(a, l) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [r, s] = fy(a.path, a.caseSensitive, a.end);
  return oy(a, l, r, s);
}
function oy(a, l, r, s) {
  let o = l.match(r);
  if (!o) return null;
  let f = o[0],
    h = f.replace(/(.)\/+$/, "$1"),
    p = o.slice(1);
  return {
    params: s.reduce((v, { paramName: y, isOptional: g }, b) => {
      if (y === "*") {
        let N = p[b] || "";
        h = f.slice(0, f.length - N.length).replace(/(.)\/+$/, "$1");
      }
      const D = p[b];
      return (
        g && !D ? (v[y] = void 0) : (v[y] = (D || "").replace(/%2F/g, "/")),
        v
      );
    }, {}),
    pathname: f,
    pathnameBase: h,
    pattern: a
  };
}
function fy(a, l = !1, r = !0) {
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
function Jg(a) {
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
function $g({ basename: a, pathname: l }) {
  return l === "/" ? a : hn([a, l]);
}
const $o = (a) => Wu.test(a);
function Ig(a, l = "/") {
  let {
      pathname: r,
      search: s = "",
      hash: o = ""
    } = typeof a == "string" ? Un(a) : a,
    f;
  return (
    r
      ? ((r = Wo(r)),
        r.startsWith("/") ? (f = b0(r.substring(1), "/")) : (f = b0(r, l)))
      : (f = l),
    { pathname: f, search: Pg(s), hash: e1(o) }
  );
}
function b0(a, l) {
  let r = hy(l).split("/");
  return (
    a.split("/").forEach((s) => {
      s === ".." ? r.length > 1 && r.pop() : s !== "." && r.push(s);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Ro(a, l, r, s) {
  return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function dy(a) {
  return a.filter(
    (l, r) => r === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function Io(a) {
  let l = dy(a);
  return l.map((r, s) => (s === l.length - 1 ? r.pathname : r.pathnameBase));
}
function Pu(a, l, r, s = !1) {
  let o;
  typeof a == "string"
    ? (o = Un(a))
    : ((o = { ...a }),
      Ce(
        !o.pathname || !o.pathname.includes("?"),
        Ro("?", "pathname", "search", o)
      ),
      Ce(
        !o.pathname || !o.pathname.includes("#"),
        Ro("#", "pathname", "hash", o)
      ),
      Ce(!o.search || !o.search.includes("#"), Ro("#", "search", "hash", o)));
  let f = a === "" || o.pathname === "",
    h = f ? "/" : o.pathname,
    p;
  if (h == null) p = r;
  else {
    let b = l.length - 1;
    if (!s && h.startsWith("..")) {
      let D = h.split("/");
      for (; D[0] === "..";) (D.shift(), (b -= 1));
      o.pathname = D.join("/");
    }
    p = b >= 0 ? l[b] : "/";
  }
  let v = Ig(o, p),
    y = h && h !== "/" && h.endsWith("/"),
    g = (f || h === ".") && r.endsWith("/");
  return (!v.pathname.endsWith("/") && (y || g) && (v.pathname += "/"), v);
}
const Wo = (a) => a.replace(/[\\/]{2,}/g, "/"),
  hn = (a) => Wo(a.join("/")),
  hy = (a) => a.replace(/\/+$/, ""),
  Wg = (a) => hy(a).replace(/^\/*/, "/"),
  Pg = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  e1 = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a),
  t1 = [
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
var pr = class {
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
function hr(a) {
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
function Po(a, l) {
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
const my =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function yy(a, l) {
  let r = a;
  if (typeof r != "string" || !Wu.test(r))
    return { absoluteURL: void 0, isExternal: !1, to: r };
  let s = r,
    o = !1;
  if (my)
    try {
      let f = new URL(window.location.href),
        h = Jo.test(r) ? new URL(ly(r, f.protocol)) : new URL(r),
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
const py = Symbol("Uninstrumented");
let rr = new WeakMap();
function n1(a, l) {
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
    s.lazy = async (...f) => ua(await Mn(r.lazy, void 0, () => o(...f), sa));
  }
  if (typeof l.lazy == "object") {
    let o = l.lazy;
    if (typeof o.middleware == "function" && r["lazy.middleware"].length > 0) {
      let f = o.middleware;
      s.lazy = Object.assign(s.lazy || {}, {
        middleware: async (...h) =>
          ua(await Mn(r["lazy.middleware"], void 0, () => f(...h), sa))
      });
    }
    if (typeof o.loader == "function" && r["lazy.loader"].length > 0) {
      let f = o.loader;
      s.lazy = Object.assign(s.lazy || {}, {
        loader: async (...h) =>
          ua(await Mn(r["lazy.loader"], void 0, () => f(...h), sa))
      });
    }
    if (typeof o.action == "function" && r["lazy.action"].length > 0) {
      let f = o.action;
      s.lazy = Object.assign(s.lazy || {}, {
        action: async (...h) =>
          ua(await Mn(r["lazy.action"], void 0, () => f(...h), sa))
      });
    }
  }
  if (typeof l.loader == "function" && r.loader.length > 0) {
    let o = ur(l.loader),
      f = async (...h) => ua(await Mn(r.loader, Ao(h[0]), () => o(...h), sa));
    (o.hydrate === !0 && (f.hydrate = !0), sr(f, o), (s.loader = f));
  }
  if (typeof l.action == "function" && r.action.length > 0) {
    let o = ur(l.action),
      f = async (...h) => ua(await Mn(r.action, Ao(h[0]), () => o(...h), sa));
    (sr(f, o), (s.action = f));
  }
  return (
    l.middleware &&
      l.middleware.length > 0 &&
      r.middleware.length > 0 &&
      (s.middleware = l.middleware.map((o) => {
        let f = ur(o),
          h = async (...p) =>
            ua(await Mn(r.middleware, Ao(p[0]), () => f(...p), sa));
        return (sr(h, f), h);
      })),
    s
  );
}
function a1(a, l) {
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
    let s = ur(a.navigate),
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
            ...T0(a, p ?? {})
          };
        return ua(
          await Mn(
            r.navigate,
            y,
            async () => {
              if (typeof h == "number") return await s(...f);
              let g = E0(a, (b) => {
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
    (sr(o, s), (a.navigate = o));
  }
  if (r.fetch.length > 0) {
    let s = ur(a.fetch),
      o = async (...f) => {
        let [h, p, v, y] = f,
          g;
        return ua(
          await Mn(
            r.fetch,
            { href: v ?? ".", fetcherKey: h, ...T0(a, y ?? {}) },
            async () => {
              let b = E0(a, (D) => {
                g = D;
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
    (sr(o, s), (a.fetch = o));
  }
  return a;
}
function ur(a) {
  return a[py] ?? a;
}
function sr(a, l) {
  a[py] = l;
}
function E0(a, l) {
  return (
    rr.set(a, l),
    () => {
      rr.get(a) === l && rr.delete(a);
    }
  );
}
function S0(a) {
  let l = rr.get(a);
  return (rr.delete(a), l);
}
function ua(a) {
  if (a.type === "error") throw a.value;
  return a.value;
}
async function Mn(
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
          : (p = Mn(a, l, r, s, o, f - 1)),
        await p,
        Ce(o.innerResult, "Expected an inner result"),
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
function Ao(a) {
  let { request: l, context: r, params: s } = a;
  return { ...a, request: l1(l), params: { ...s }, context: i1(r) };
}
function T0(a, l) {
  return {
    currentUrl: zn(a.state.location),
    ...("formMethod" in l ? { formMethod: l.formMethod } : {}),
    ...("formEncType" in l ? { formEncType: l.formEncType } : {}),
    ...("formData" in l ? { formData: l.formData } : {}),
    ...("body" in l ? { body: l.body } : {})
  };
}
function l1(a) {
  return {
    method: a.method,
    url: a.url,
    headers: { get: (...l) => a.headers.get(...l) }
  };
}
function i1(a) {
  return { get: (l) => a.get(l) };
}
const vy = ["POST", "PUT", "PATCH", "DELETE"],
  r1 = new Set(vy),
  u1 = ["GET", ...vy],
  s1 = new Set(u1),
  gy = new Set([301, 302, 303, 307, 308]),
  c1 = new Set([307, 308]),
  Oo = {
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
  o1 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  },
  tr = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  by = "remix-router-transitions",
  Ey = Symbol("ResetLoaderData");
var f1 = class {
  #e;
  #n;
  #t;
  #a;
  constructor(l) {
    ((this.#e = l), (this.#n = Gu(l)));
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
    ((this.#e = l), (this.#n = Gu(l)));
  }
  setHmrRoutes(l) {
    ((this.#t = l), (this.#a = Gu(l)));
  }
  commitHmrRoutes() {
    this.#t &&
      ((this.#e = this.#t),
      (this.#n = this.#a),
      (this.#t = void 0),
      (this.#a = void 0));
  }
};
function d1(a) {
  const l = a.window ? a.window : typeof window < "u" ? window : void 0,
    r =
      typeof l < "u" &&
      typeof l.document < "u" &&
      typeof l.document.createElement < "u";
  Ce(
    a.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let s = a.hydrationRouteProperties || [],
    o = a.mapRouteProperties,
    f = o || (() => ({}));
  if (a.instrumentations) {
    let S = a.instrumentations;
    f = (A) => ({ ...o?.(A), ...n1(S.map((C) => C.route).filter(Boolean), A) });
  }
  let h = {},
    p = new f1(dr(a.routes, f, void 0, h)),
    v = a.basename || "/";
  v.startsWith("/") || (v = `/${v}`);
  let y = a.dataStrategy || v1,
    g = { ...a.future },
    b = null,
    D = new Set(),
    N = null,
    U = null,
    F = null,
    X = null,
    P = a.hydrationData != null,
    ee = Sn(p.activeRoutes, a.history.location, v, !1, p.branches),
    ae = !1,
    de = null,
    oe,
    Oe;
  if (ee == null && !a.patchRoutesOnNavigation) {
    let S = dn(404, { pathname: a.history.location.pathname }),
      { matches: A, route: C } = qu(p.activeRoutes);
    ((oe = !0), (Oe = !oe), (ee = A), (de = { [C.id]: S }));
  } else if (
    (ee &&
      !a.hydrationData &&
      ma(ee, p.activeRoutes, a.history.location.pathname).active &&
      (ee = null),
    ee)
  )
    if (ee.some((S) => S.route.lazy)) ((oe = !1), (Oe = !oe));
    else if (!ee.some((S) => ef(S.route))) ((oe = !0), (Oe = !oe));
    else {
      let S = a.hydrationData ? a.hydrationData.loaderData : null,
        A = a.hydrationData ? a.hydrationData.errors : null,
        C = ee;
      if (A) {
        let k = ee.findIndex((G) => A[G.route.id] !== void 0);
        C = C.slice(0, k + 1);
      }
      ((Oe = !1),
        (oe = !0),
        C.forEach((k) => {
          let G = Sy(k.route, S, A);
          ((Oe = Oe || G.renderFallback), (oe = oe && !G.shouldLoad));
        }));
    }
  else {
    ((oe = !1), (Oe = !oe), (ee = []));
    let S = ma(null, p.activeRoutes, a.history.location.pathname);
    S.active && S.matches && ((ae = !0), (ee = S.matches));
  }
  let J,
    L = {
      historyAction: a.history.action,
      location: a.history.location,
      matches: ee,
      initialized: oe,
      renderFallback: Oe,
      navigation: Oo,
      restoreScrollPosition: a.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (a.hydrationData && a.hydrationData.loaderData) || {},
      actionData: (a.hydrationData && a.hydrationData.actionData) || null,
      errors: (a.hydrationData && a.hydrationData.errors) || de,
      fetchers: new Map(),
      blockers: new Map()
    },
    Se = "POP",
    He = null,
    Xe = !1,
    De,
    Be = !1,
    rt = new Map(),
    Je = null,
    x = !1,
    Q = !1,
    ie = new Set(),
    ue = new Map(),
    ge = 0,
    T = -1,
    B = new Map(),
    Z = new Set(),
    $ = new Map(),
    se = new Map(),
    me = new Set(),
    _e = new Map(),
    dt,
    Pe = null;
  function Va() {
    if (
      ((b = a.history.listen(({ action: S, location: A, delta: C }) => {
        if (dt) {
          (dt(), (dt = void 0));
          return;
        }
        jt(
          _e.size === 0 || C != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let k = Ga({
          currentLocation: L.location,
          nextLocation: A,
          historyAction: S
        });
        if (k && C != null) {
          let G = new Promise((te) => {
            dt = te;
          });
          (a.history.go(C * -1),
            Bn(k, {
              state: "blocked",
              location: A,
              proceed() {
                (Bn(k, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: A
                }),
                  G.then(() => a.history.go(C)));
              },
              reset() {
                let te = new Map(L.blockers);
                (te.set(k, tr), gt({ blockers: te }));
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
      j1(l, rt);
      let S = () => H1(l, rt);
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
      D.clear(),
      De && De.abort(),
      L.fetchers.forEach((S, A) => Hn(L.fetchers, A)),
      L.blockers.forEach((S, A) => ka(A)));
  }
  function ri(S) {
    if ((D.add(S), N)) {
      let { newErrors: A } = N;
      ((N = null),
        S(L, {
          deletedFetchers: [],
          newErrors: A,
          viewTransitionOpts: void 0,
          flushSync: !1
        }));
    }
    return () => D.delete(S);
  }
  function gt(S, A = {}) {
    (S.matches &&
      (S.matches = S.matches.map((G) => {
        let te = h[G.route.id],
          W = G.route;
        return W.element !== te.element ||
          W.errorElement !== te.errorElement ||
          W.hydrateFallbackElement !== te.hydrateFallbackElement
          ? { ...G, route: te }
          : G;
      })),
      (L = { ...L, ...S }));
    let C = [],
      k = [];
    (L.fetchers.forEach((G, te) => {
      G.state === "idle" && (me.has(te) ? C.push(te) : k.push(te));
    }),
      me.forEach((G) => {
        !L.fetchers.has(G) && !ue.has(G) && C.push(G);
      }),
      D.size === 0 && (N = { newErrors: S.errors ?? null }),
      [...D].forEach((G) =>
        G(L, {
          deletedFetchers: C,
          newErrors: S.errors ?? null,
          viewTransitionOpts: A.viewTransitionOpts,
          flushSync: A.flushSync === !0
        })
      ),
      C.forEach((G) => Hn(L.fetchers, G)),
      k.forEach((G) => L.fetchers.delete(G)));
  }
  function Ht(S, A, { flushSync: C } = {}) {
    let k =
        L.actionData != null &&
        L.navigation.formMethod != null &&
        xt(L.navigation.formMethod) &&
        L.navigation.state === "loading" &&
        S.state?._isRedirect !== !0,
      G;
    A.actionData
      ? Object.keys(A.actionData).length > 0
        ? (G = A.actionData)
        : (G = null)
      : k
        ? (G = L.actionData)
        : (G = null);
    let te = A.loaderData
        ? w0(L.loaderData, A.loaderData, A.matches || [], A.errors)
        : L.loaderData,
      W = L.blockers;
    W.size > 0 &&
      !x &&
      ((W = new Map(W)), W.forEach((fe, he) => W.set(he, tr)));
    let K = x ? !1 : fi(S, A.matches || L.matches),
      I =
        Xe === !0 ||
        (L.navigation.formMethod != null &&
          xt(L.navigation.formMethod) &&
          S.state?._isRedirect !== !0);
    (p.commitHmrRoutes(),
      x ||
        Se === "POP" ||
        (Se === "PUSH"
          ? a.history.push(S, S.state)
          : Se === "REPLACE" && a.history.replace(S, S.state)));
    let pe;
    if (Se === "POP") {
      let fe = rt.get(L.location.pathname);
      fe && fe.has(S.pathname)
        ? (pe = { currentLocation: L.location, nextLocation: S })
        : rt.has(S.pathname) &&
          (pe = { currentLocation: S, nextLocation: L.location });
    } else if (Be) {
      let fe = rt.get(L.location.pathname);
      (fe
        ? fe.add(S.pathname)
        : ((fe = new Set([S.pathname])), rt.set(L.location.pathname, fe)),
        (pe = { currentLocation: L.location, nextLocation: S }));
    }
    (gt(
      {
        ...A,
        actionData: G,
        loaderData: te,
        historyAction: Se,
        location: S,
        initialized: !0,
        renderFallback: !1,
        navigation: Oo,
        revalidation: "idle",
        restoreScrollPosition: K,
        preventScrollReset: I,
        blockers: W
      },
      { viewTransitionOpts: pe, flushSync: C === !0 }
    ),
      (Se = "POP"),
      (Xe = !1),
      (Be = !1),
      (x = !1),
      (Q = !1),
      He?.resolve(),
      (He = null),
      Pe?.resolve(),
      (Pe = null));
  }
  async function ml(S, A) {
    if ((He?.resolve(), (He = null), typeof S == "number")) {
      He || (He = H0());
      let qe = He.promise;
      return (a.history.go(S), qe);
    }
    let C = S0(J),
      {
        path: k,
        submission: G,
        error: te
      } = R0(
        !1,
        Lo(L.location, L.matches, v, S, A?.fromRouteId, A?.relative),
        A
      ),
      W;
    A?.mask &&
      (W = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof A.mask == "string"
          ? Un(A.mask)
          : { ...L.location.mask, ...A.mask })
      });
    let K = L.location,
      I = fr(K, k, A && A.state, void 0, W);
    I = { ...I, ...a.history.encodeLocation(I) };
    let pe = A && A.replace != null ? A.replace : void 0,
      fe = "PUSH";
    pe === !0
      ? (fe = "REPLACE")
      : pe === !1 ||
        (G != null &&
          xt(G.formMethod) &&
          G.formAction === L.location.pathname + L.location.search &&
          (fe = "REPLACE"));
    let he =
        A && "preventScrollReset" in A ? A.preventScrollReset === !0 : void 0,
      Me = (A && A.flushSync) === !0,
      Fe = Ga({ currentLocation: K, nextLocation: I, historyAction: fe });
    if (Fe) {
      Bn(Fe, {
        state: "blocked",
        location: I,
        proceed() {
          (Bn(Fe, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: I
          }),
            ml(S, A));
        },
        reset() {
          let qe = new Map(L.blockers);
          (qe.set(Fe, tr), gt({ blockers: qe }));
        }
      });
      return;
    }
    await Ln(fe, I, {
      submission: G,
      pendingError: te,
      preventScrollReset: he,
      replace: A && A.replace,
      enableViewTransition: A && A.viewTransition,
      flushSync: Me,
      callSiteDefaultShouldRevalidate: A && A.defaultShouldRevalidate,
      instrumentationNavigateMetaReceiver: C
    });
  }
  function ui() {
    (Pe || (Pe = H0()), da(), gt({ revalidation: "loading" }));
    let S = Pe.promise;
    return L.navigation.state === "submitting"
      ? S
      : L.navigation.state === "idle"
        ? (Ln(L.historyAction, L.location, {
            startUninterruptedRevalidation: !0
          }),
          S)
        : (Ln(Se || L.historyAction, L.navigation.location, {
            overrideNavigation: L.navigation,
            enableViewTransition: Be === !0
          }),
          S);
  }
  async function Ln(S, A, C) {
    (De && De.abort(),
      (De = null),
      (Se = S),
      (x = (C && C.startUninterruptedRevalidation) === !0),
      cs(L.location, L.matches),
      (Xe = (C && C.preventScrollReset) === !0),
      (Be = (C && C.enableViewTransition) === !0));
    let k = p.activeRoutes,
      G =
        C?.initialHydration && L.matches && L.matches.length > 0 && !ae
          ? L.matches
          : Sn(k, A, v, !1, p.branches),
      te = (C && C.flushSync) === !0;
    if (
      G &&
      L.initialized &&
      !Q &&
      D1(L.location, A) &&
      !(C && C.submission && xt(C.submission.formMethod))
    ) {
      Ht(A, { matches: G }, { flushSync: te });
      return;
    }
    let W = ma(G, k, A.pathname);
    if (
      (W.active && W.matches && (G = W.matches),
      C?.instrumentationNavigateMetaReceiver)
    ) {
      let Te = L0(a.history, A, G);
      C.instrumentationNavigateMetaReceiver(Te);
    }
    if (!G) {
      let { error: Te, notFoundMatches: Ut, route: ut } = yn(A.pathname);
      Ht(
        A,
        { matches: Ut, loaderData: {}, errors: { [ut.id]: Te } },
        { flushSync: te }
      );
      return;
    }
    let K =
      C && C.overrideNavigation
        ? { ...C.overrideNavigation, matches: G, historyAction: S }
        : void 0;
    De = new AbortController();
    let I = Il(a.history, A, De.signal, C && C.submission),
      pe = a.getContext ? await a.getContext() : new p0(),
      fe;
    if (C && C.pendingError)
      fe = [Ya(G).route.id, { type: "error", error: C.pendingError }];
    else if (C && C.submission && xt(C.submission.formMethod)) {
      let Te = await Rr(
        I,
        A,
        C.submission,
        G,
        S,
        pe,
        W.active,
        C && C.initialHydration === !0,
        { replace: C.replace, flushSync: te }
      );
      if (Te.shortCircuited) return;
      if (Te.pendingActionResult) {
        let [Ut, ut] = Te.pendingActionResult;
        if (Wt(ut) && hr(ut.error) && ut.error.status === 404) {
          ((De = null),
            Ht(A, {
              matches: Te.matches,
              loaderData: {},
              errors: { [Ut]: ut.error }
            }));
          return;
        }
      }
      ((G = Te.matches || G),
        (fe = Te.pendingActionResult),
        (K = Do(A, G, S, C.submission)),
        (te = !1),
        (W.active = !1),
        (I = Il(a.history, I.url, I.signal)));
    }
    let {
      shortCircuited: he,
      matches: Me,
      loaderData: Fe,
      errors: qe,
      workingFetchers: tt
    } = await si(
      I,
      A,
      G,
      S,
      pe,
      W.active,
      K,
      C && C.submission,
      C && C.fetcherSubmission,
      C && C.replace,
      C && C.initialHydration === !0,
      te,
      fe,
      C && C.callSiteDefaultShouldRevalidate
    );
    he ||
      ((De = null),
      Ht(A, {
        matches: Me || G,
        ...z0(fe),
        loaderData: Fe,
        errors: qe,
        ...(tt ? { fetchers: tt } : {})
      }));
  }
  async function Rr(S, A, C, k, G, te, W, K, I = {}) {
    if (
      (da(),
      gt({ navigation: U1(A, k, G, C) }, { flushSync: I.flushSync === !0 }),
      W)
    ) {
      let he = await An(k, A.pathname, S.signal);
      if (he.type === "aborted") return { shortCircuited: !0 };
      if (he.type === "error") {
        if (he.partialMatches.length === 0) {
          let { matches: Fe, route: qe } = qu(p.activeRoutes);
          return {
            matches: Fe,
            pendingActionResult: [qe.id, { type: "error", error: he.error }]
          };
        }
        let Me = Ya(he.partialMatches).route.id;
        return {
          matches: he.partialMatches,
          pendingActionResult: [Me, { type: "error", error: he.error }]
        };
      } else if (he.matches) k = he.matches;
      else {
        let { notFoundMatches: Me, error: Fe, route: qe } = yn(A.pathname);
        return {
          matches: Me,
          pendingActionResult: [qe.id, { type: "error", error: Fe }]
        };
      }
    }
    let pe,
      fe = Qu(k, A);
    if (!fe.route.action && !fe.route.lazy)
      pe = {
        type: "error",
        error: dn(405, {
          method: S.method,
          pathname: A.pathname,
          routeId: fe.route.id
        })
      };
    else {
      let he = await fa(S, A, ti(f, h, S, A, k, fe, K ? [] : s, te), te, null);
      if (((pe = he[fe.route.id]), !pe)) {
        for (let Me of k)
          if (he[Me.route.id]) {
            pe = he[Me.route.id];
            break;
          }
      }
      if (S.signal.aborted) return { shortCircuited: !0 };
    }
    if (cl(pe)) {
      let he;
      return (
        I && I.replace != null
          ? (he = I.replace)
          : (he =
              _0(
                pe.response.headers.get("Location"),
                new URL(S.url),
                v,
                a.history
              ) ===
              L.location.pathname + L.location.search),
        await jn(S, pe, !0, { submission: C, replace: he }),
        { shortCircuited: !0 }
      );
    }
    if (Wt(pe)) {
      let he = Ya(k, fe.route.id);
      return (
        (I && I.replace) !== !0 && (Se = "PUSH"),
        { matches: k, pendingActionResult: [he.route.id, pe, fe.route.id] }
      );
    }
    return { matches: k, pendingActionResult: [fe.route.id, pe] };
  }
  async function si(S, A, C, k, G, te, W, K, I, pe, fe, he, Me, Fe) {
    let qe = W || Do(A, C, k, K),
      tt = K || I || j0(qe),
      Te = !x && !fe;
    if (te) {
      if (Te) {
        let Ge = yl(Me);
        gt(
          { navigation: qe, ...(Ge !== void 0 ? { actionData: Ge } : {}) },
          { flushSync: he }
        );
      }
      let be = await An(C, A.pathname, S.signal);
      if (be.type === "aborted") return { shortCircuited: !0 };
      if (be.type === "error") {
        if (be.partialMatches.length === 0) {
          let { matches: tn, route: pa } = qu(p.activeRoutes);
          return { matches: tn, loaderData: {}, errors: { [pa.id]: be.error } };
        }
        let Ge = Ya(be.partialMatches).route.id;
        return {
          matches: be.partialMatches,
          loaderData: {},
          errors: { [Ge]: be.error }
        };
      } else if (be.matches) C = be.matches;
      else {
        let { error: Ge, notFoundMatches: tn, route: pa } = yn(A.pathname);
        return { matches: tn, loaderData: {}, errors: { [pa.id]: Ge } };
      }
    }
    let Ut = p.activeRoutes,
      { dsMatches: ut, revalidatingFetchers: ke } = A0(
        S,
        G,
        f,
        h,
        a.history,
        L,
        C,
        tt,
        A,
        fe ? [] : s,
        fe === !0,
        Q,
        ie,
        me,
        $,
        Z,
        Ut,
        v,
        a.patchRoutesOnNavigation != null,
        p.branches,
        Me,
        Fe
      );
    if (
      ((T = ++ge),
      !a.dataStrategy &&
        !ut.some((be) => be.shouldLoad) &&
        !ut.some(
          (be) => be.route.middleware && be.route.middleware.length > 0
        ) &&
        ke.length === 0)
    ) {
      let be = new Map(L.fetchers),
        Ge = Ar(be);
      return (
        Ht(
          A,
          {
            matches: C,
            loaderData: {},
            errors: Me && Wt(Me[1]) ? { [Me[0]]: Me[1].error } : null,
            ...z0(Me),
            ...(Ge ? { fetchers: be } : {})
          },
          { flushSync: he }
        ),
        { shortCircuited: !0 }
      );
    }
    if (Te) {
      let be = {};
      if (!te) {
        be.navigation = qe;
        let Ge = yl(Me);
        Ge !== void 0 && (be.actionData = Ge);
      }
      (ke.length > 0 && (be.fetchers = ci(ke)), gt(be, { flushSync: he }));
    }
    ke.forEach((be) => {
      (St(be.key), be.controller && ue.set(be.key, be.controller));
    });
    let pn = () => ke.forEach((be) => St(be.key));
    De && De.signal.addEventListener("abort", pn);
    let { loaderResults: qn, fetcherResults: en } = await oi(ut, ke, S, A, G);
    if (S.signal.aborted) return { shortCircuited: !0 };
    (De && De.signal.removeEventListener("abort", pn),
      ke.forEach((be) => ue.delete(be.key)));
    let bt = Yu(qn);
    if (bt)
      return (
        await jn(S, bt.result, !0, { replace: pe }),
        { shortCircuited: !0 }
      );
    if (((bt = Yu(en)), bt))
      return (
        Z.add(bt.key),
        await jn(S, bt.result, !0, { replace: pe }),
        { shortCircuited: !0 }
      );
    let ya = new Map(L.fetchers),
      { loaderData: Yn, errors: Vn } = x0(L, C, qn, Me, ke, en, ya);
    fe && L.errors && (Vn = { ...L.errors, ...Vn });
    let vl = Ar(ya),
      kn = Or(T, ya),
      Gn = vl || kn || ke.length > 0;
    return {
      matches: C,
      loaderData: Yn,
      errors: Vn,
      ...(Gn ? { workingFetchers: ya } : {})
    };
  }
  function yl(S) {
    if (S && !Wt(S[1])) return { [S[0]]: S[1].data };
    if (L.actionData)
      return Object.keys(L.actionData).length === 0 ? null : L.actionData;
  }
  function ci(S) {
    let A = new Map(L.fetchers);
    return (
      S.forEach((C) => {
        let k = A.get(C.key),
          G = nr(void 0, k ? k.data : void 0);
        A.set(C.key, G);
      }),
      A
    );
  }
  async function ls(S, A, C, k) {
    St(S);
    let G = (k && k.flushSync) === !0,
      te = S0(J),
      W = p.activeRoutes,
      K = Lo(L.location, L.matches, v, C, A, k?.relative),
      I = Sn(W, K, v, !1, p.branches),
      pe = ma(I, W, K);
    if (
      (pe.active && pe.matches && (I = pe.matches),
      te && te(L0(a.history, K, I)),
      !I)
    ) {
      Pt(S, A, dn(404, { pathname: K }), { flushSync: G });
      return;
    }
    let { path: fe, submission: he, error: Me } = R0(!0, K, k);
    if (Me) {
      Pt(S, A, Me, { flushSync: G });
      return;
    }
    let Fe = a.getContext ? await a.getContext() : new p0(),
      qe = (k && k.preventScrollReset) === !0;
    if (he && xt(he.formMethod)) {
      await is(
        S,
        A,
        fe,
        I,
        Fe,
        pe.active,
        G,
        qe,
        he,
        k && k.defaultShouldRevalidate
      );
      return;
    }
    ($.set(S, { routeId: A, path: fe }),
      await wt(S, A, fe, I, Fe, pe.active, G, qe, he));
  }
  async function is(S, A, C, k, G, te, W, K, I, pe) {
    (da(), $.delete(S), mn(S, L1(I, L.fetchers.get(S)), { flushSync: W }));
    let fe = new AbortController(),
      he = Il(a.history, C, fe.signal, I);
    if (te) {
      let nt = await An(k, new URL(he.url).pathname, he.signal, S);
      if (nt.type === "aborted") return;
      if (nt.type === "error") {
        Pt(S, A, nt.error, { flushSync: W });
        return;
      } else if (nt.matches) k = nt.matches;
      else {
        Pt(S, A, dn(404, { pathname: C }), { flushSync: W });
        return;
      }
    }
    let Me = Qu(k, C);
    if (!Me.route.action && !Me.route.lazy) {
      Pt(S, A, dn(405, { method: I.formMethod, pathname: C, routeId: A }), {
        flushSync: W
      });
      return;
    }
    ue.set(S, fe);
    let Fe = ge,
      qe = ti(f, h, he, C, k, Me, s, G),
      tt = await fa(he, C, qe, G, S),
      Te = tt[Me.route.id];
    if (!Te) {
      for (let nt of qe)
        if (tt[nt.route.id]) {
          Te = tt[nt.route.id];
          break;
        }
    }
    if (he.signal.aborted) {
      ue.get(S) === fe && ue.delete(S);
      return;
    }
    if (me.has(S)) {
      if (cl(Te) || Wt(Te)) {
        mn(S, _n(void 0));
        return;
      }
    } else {
      if (cl(Te))
        if ((ue.delete(S), T > Fe)) {
          mn(S, _n(void 0));
          return;
        } else
          return (
            Z.add(S),
            mn(S, nr(I)),
            jn(he, Te, !1, { fetcherSubmission: I, preventScrollReset: K })
          );
      if (Wt(Te)) {
        Pt(S, A, Te.error);
        return;
      }
    }
    let Ut = L.navigation.location || L.location,
      ut = Il(a.history, Ut, fe.signal),
      ke = p.activeRoutes,
      pn =
        L.navigation.state !== "idle"
          ? Sn(ke, L.navigation.location, v, !1, p.branches)
          : L.matches;
    Ce(pn, "Didn't find any matches after fetcher action");
    let qn = ++ge;
    B.set(S, qn);
    let { dsMatches: en, revalidatingFetchers: bt } = A0(
        ut,
        G,
        f,
        h,
        a.history,
        L,
        pn,
        I,
        Ut,
        s,
        !1,
        Q,
        ie,
        me,
        $,
        Z,
        ke,
        v,
        a.patchRoutesOnNavigation != null,
        p.branches,
        [Me.route.id, Te],
        pe
      ),
      ya = nr(I, Te.data),
      Yn = new Map(L.fetchers);
    (Yn.set(S, ya),
      bt
        .filter((nt) => nt.key !== S)
        .forEach((nt) => {
          let nn = nt.key,
            _r = Yn.get(nn),
            Bt = nr(void 0, _r ? _r.data : void 0);
          (Yn.set(nn, Bt), St(nn), nt.controller && ue.set(nn, nt.controller));
        }),
      gt({ fetchers: Yn }));
    let Vn = () => bt.forEach((nt) => St(nt.key));
    fe.signal.addEventListener("abort", Vn);
    let { loaderResults: vl, fetcherResults: kn } = await oi(en, bt, ut, Ut, G);
    if (fe.signal.aborted) return;
    (fe.signal.removeEventListener("abort", Vn),
      B.delete(S),
      ue.delete(S),
      bt.forEach((nt) => ue.delete(nt.key)));
    let Gn = L.fetchers.has(S),
      be = (nt) => {
        if (!Gn) return nt;
        let nn = new Map(nt.fetchers);
        return (nn.set(S, _n(Te.data)), { ...nt, fetchers: nn });
      },
      Ge = Yu(vl);
    if (Ge)
      return ((L = be(L)), jn(ut, Ge.result, !1, { preventScrollReset: K }));
    if (((Ge = Yu(kn)), Ge))
      return (
        Z.add(Ge.key),
        (L = be(L)),
        jn(ut, Ge.result, !1, { preventScrollReset: K })
      );
    let tn = new Map(L.fetchers);
    Gn && tn.set(S, _n(Te.data));
    let { loaderData: pa, errors: Qa } = x0(L, pn, vl, void 0, bt, kn, tn);
    (Or(qn, tn),
      L.navigation.state === "loading" && qn > T
        ? (Ce(Se, "Expected pending action"),
          De && De.abort(),
          Ht(L.navigation.location, {
            matches: pn,
            loaderData: pa,
            errors: Qa,
            fetchers: tn
          }))
        : (gt({
            errors: Qa,
            loaderData: w0(L.loaderData, pa, pn, Qa),
            fetchers: tn
          }),
          (Q = !1)));
  }
  async function wt(S, A, C, k, G, te, W, K, I) {
    let pe = L.fetchers.get(S);
    mn(S, nr(I, pe ? pe.data : void 0), { flushSync: W });
    let fe = new AbortController(),
      he = Il(a.history, C, fe.signal);
    if (te) {
      let Te = await An(k, new URL(he.url).pathname, he.signal, S);
      if (Te.type === "aborted") return;
      if (Te.type === "error") {
        Pt(S, A, Te.error, { flushSync: W });
        return;
      } else if (Te.matches) k = Te.matches;
      else {
        Pt(S, A, dn(404, { pathname: C }), { flushSync: W });
        return;
      }
    }
    let Me = Qu(k, C);
    ue.set(S, fe);
    let Fe = ge,
      qe = await fa(he, C, ti(f, h, he, C, k, Me, s, G), G, S),
      tt = qe[Me.route.id];
    if (!tt) {
      for (let Te of k)
        if (qe[Te.route.id]) {
          tt = qe[Te.route.id];
          break;
        }
    }
    if ((ue.get(S) === fe && ue.delete(S), !he.signal.aborted)) {
      if (me.has(S)) {
        mn(S, _n(void 0));
        return;
      }
      if (cl(tt))
        if (T > Fe) {
          mn(S, _n(void 0));
          return;
        } else {
          (Z.add(S), await jn(he, tt, !1, { preventScrollReset: K }));
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
    C,
    {
      submission: k,
      fetcherSubmission: G,
      preventScrollReset: te,
      replace: W
    } = {}
  ) {
    (C || (He?.resolve(), (He = null)),
      A.response.headers.has("X-Remix-Revalidate") && (Q = !0));
    let K = A.response.headers.get("Location");
    (Ce(K, "Expected a Location header on the redirect Response"),
      (K = _0(K, new URL(S.url), v, a.history)));
    let I = fr(L.location, K, { _isRedirect: !0 });
    if (r) {
      let qe = !1;
      if (A.response.headers.has("X-Remix-Reload-Document")) qe = !0;
      else if ($o(K)) {
        const tt = iy(l, K, !0);
        qe = tt.origin !== l.location.origin || Tn(tt.pathname, v) == null;
      }
      if (qe) {
        W ? l.location.replace(K) : l.location.assign(K);
        return;
      }
    }
    De = null;
    let pe =
        W === !0 || A.response.headers.has("X-Remix-Replace")
          ? "REPLACE"
          : "PUSH",
      { formMethod: fe, formAction: he, formEncType: Me } = L.navigation;
    !k && !G && fe && he && Me && (k = j0(L.navigation));
    let Fe = k || G;
    c1.has(A.response.status) && Fe && xt(Fe.formMethod)
      ? await Ln(pe, I, {
          submission: { ...Fe, formAction: K },
          preventScrollReset: te || Xe,
          enableViewTransition: C ? Be : void 0
        })
      : await Ln(pe, I, {
          overrideNavigation: Do(I, [], pe, k),
          fetcherSubmission: G,
          preventScrollReset: te || Xe,
          enableViewTransition: C ? Be : void 0
        });
  }
  async function fa(S, A, C, k, G) {
    let te,
      W = {};
    try {
      te = await b1(y, S, A, C, G, k, !1);
    } catch (K) {
      return (
        C.filter((I) => I.shouldLoad).forEach((I) => {
          W[I.route.id] = { type: "error", error: K };
        }),
        W
      );
    }
    if (S.signal.aborted) return W;
    if (!xt(S.method))
      for (let K of C) {
        if (te[K.route.id]?.type === "error") break;
        !te.hasOwnProperty(K.route.id) &&
          !L.loaderData.hasOwnProperty(K.route.id) &&
          (!L.errors || !L.errors.hasOwnProperty(K.route.id)) &&
          K.shouldCallHandler() &&
          (te[K.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${K.route.id}`
            )
          });
      }
    for (let [K, I] of Object.entries(te))
      if (M1(I)) {
        let pe = I.result;
        W[K] = { type: "redirect", response: R1(pe, S, K, C, v) };
      } else W[K] = await T1(I);
    return W;
  }
  async function oi(S, A, C, k, G) {
    let te = fa(C, k, S, G, null),
      W = Promise.all(
        A.map(async (K) => {
          if (K.matches && K.match && K.request && K.controller) {
            let I = (await fa(K.request, K.path, K.matches, G, K.key))[
              K.match.route.id
            ];
            return { [K.key]: I };
          } else
            return Promise.resolve({
              [K.key]: { type: "error", error: dn(404, { pathname: K.path }) }
            });
        })
      );
    return {
      loaderResults: await te,
      fetcherResults: (await W).reduce((K, I) => Object.assign(K, I), {})
    };
  }
  function da() {
    ((Q = !0),
      $.forEach((S, A) => {
        (ue.has(A) && ie.add(A), St(A));
      }));
  }
  function mn(S, A, C = {}) {
    let k = new Map(L.fetchers);
    (k.set(S, A),
      gt({ fetchers: k }, { flushSync: (C && C.flushSync) === !0 }));
  }
  function Pt(S, A, C, k = {}) {
    let G = Ya(L.matches, A),
      te = new Map(L.fetchers);
    (Hn(te, S),
      gt(
        { errors: { [G.route.id]: C }, fetchers: te },
        { flushSync: (k && k.flushSync) === !0 }
      ));
  }
  function rs(S) {
    return (
      se.set(S, (se.get(S) || 0) + 1),
      me.has(S) && me.delete(S),
      L.fetchers.get(S) || o1
    );
  }
  function us(S, A) {
    (St(S, A?.reason), mn(S, _n(null)));
  }
  function Hn(S, A) {
    let C = L.fetchers.get(A);
    (ue.has(A) && !(C && C.state === "loading" && B.has(A)) && St(A),
      $.delete(A),
      B.delete(A),
      Z.delete(A),
      me.delete(A),
      ie.delete(A),
      S.delete(A));
  }
  function zt(S) {
    let A = (se.get(S) || 0) - 1;
    (A <= 0 ? (se.delete(S), me.add(S)) : se.set(S, A),
      gt({ fetchers: new Map(L.fetchers) }));
  }
  function St(S, A) {
    let C = ue.get(S);
    C && (C.abort(A), ue.delete(S));
  }
  function _t(S, A) {
    for (let C of S) {
      let k = A.get(C);
      Ce(k, `Expected fetcher: ${C}`);
      let G = _n(k.data);
      A.set(C, G);
    }
  }
  function Ar(S) {
    let A = [],
      C = !1;
    for (let k of Z) {
      let G = S.get(k);
      (Ce(G, `Expected fetcher: ${k}`),
        G.state === "loading" && (Z.delete(k), A.push(k), (C = !0)));
    }
    return (_t(A, S), C);
  }
  function Or(S, A) {
    let C = [];
    for (let [k, G] of B)
      if (G < S) {
        let te = A.get(k);
        (Ce(te, `Expected fetcher: ${k}`),
          te.state === "loading" && (St(k), B.delete(k), C.push(k)));
      }
    return (_t(C, A), C.length > 0);
  }
  function ss(S, A) {
    let C = L.blockers.get(S) || tr;
    return (_e.get(S) !== A && _e.set(S, A), C);
  }
  function ka(S) {
    (L.blockers.delete(S), _e.delete(S));
  }
  function Bn(S, A) {
    let C = L.blockers.get(S) || tr;
    Ce(
      (C.state === "unblocked" && A.state === "blocked") ||
        (C.state === "blocked" && A.state === "blocked") ||
        (C.state === "blocked" && A.state === "proceeding") ||
        (C.state === "blocked" && A.state === "unblocked") ||
        (C.state === "proceeding" && A.state === "unblocked"),
      `Invalid blocker state transition: ${C.state} -> ${A.state}`
    );
    let k = new Map(L.blockers);
    (k.set(S, A), gt({ blockers: k }));
  }
  function Ga({ currentLocation: S, nextLocation: A, historyAction: C }) {
    if (_e.size === 0) return;
    _e.size > 1 && jt(!1, "A router only supports one blocker at a time");
    let k = Array.from(_e.entries()),
      [G, te] = k[k.length - 1],
      W = L.blockers.get(G);
    if (
      !(W && W.state === "proceeding") &&
      te({ currentLocation: S, nextLocation: A, historyAction: C })
    )
      return G;
  }
  function yn(S) {
    let A = dn(404, { pathname: S }),
      C = p.activeRoutes,
      { matches: k, route: G } = qu(C);
    return { notFoundMatches: k, route: G, error: A };
  }
  function pl(S, A, C) {
    if (((U = S), (X = A), (F = C || null), !P && L.navigation === Oo)) {
      P = !0;
      let k = fi(L.location, L.matches);
      k != null && gt({ restoreScrollPosition: k });
    }
    return () => {
      ((U = null), (X = null), (F = null));
    };
  }
  function ha(S, A) {
    return (
      (F &&
        F(
          S,
          A.map((C) => jg(C, L.loaderData))
        )) ||
      S.key
    );
  }
  function cs(S, A) {
    if (U && X) {
      let C = ha(S, A);
      U[C] = X();
    }
  }
  function fi(S, A) {
    if (U) {
      let C = ha(S, A),
        k = U[C];
      if (typeof k == "number") return k;
    }
    return null;
  }
  function ma(S, A, C) {
    if (a.patchRoutesOnNavigation) {
      let k = p.branches;
      if (S) {
        if (Object.keys(S[0].params).length > 0)
          return { active: !0, matches: Sn(A, C, v, !0, k) };
      } else return { active: !0, matches: Sn(A, C, v, !0, k) || [] };
    }
    return { active: !1, matches: null };
  }
  async function An(S, A, C, k) {
    if (!a.patchRoutesOnNavigation) return { type: "success", matches: S };
    let G = S;
    for (;;) {
      let te = h;
      try {
        await a.patchRoutesOnNavigation({
          signal: C,
          path: A,
          matches: G,
          fetcherKey: k,
          patch: (pe, fe) => {
            C.aborted || O0(pe, fe, p, te, f, !1);
          }
        });
      } catch (pe) {
        return { type: "error", error: pe, partialMatches: G };
      }
      if (C.aborted) return { type: "aborted" };
      let W = p.branches,
        K = Sn(p.activeRoutes, A, v, !1, W),
        I = null;
      if (K) {
        if (Object.keys(K[0].params).length === 0)
          return { type: "success", matches: K };
        if (
          ((I = Sn(p.activeRoutes, A, v, !0, W)),
          !(I && G.length < I.length && Dr(G, I.slice(0, G.length))))
        )
          return { type: "success", matches: K };
      }
      if ((I || (I = Sn(p.activeRoutes, A, v, !0, W)), !I || Dr(G, I)))
        return { type: "success", matches: null };
      G = I;
    }
  }
  function Dr(S, A) {
    return (
      S.length === A.length && S.every((C, k) => C.route.id === A[k].route.id)
    );
  }
  function Nr(S) {
    ((h = {}), p.setHmrRoutes(dr(S, f, void 0, h)));
  }
  function Cr(S, A, C = !1) {
    (O0(S, A, p, h, f, C), p.hasHMRRoutes || gt({}));
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
      initialize: Va,
      subscribe: ri,
      enableScrollRestoration: pl,
      navigate: ml,
      fetch: ls,
      revalidate: ui,
      createHref: (S) => a.history.createHref(S),
      encodeLocation: (S) => a.history.encodeLocation(S),
      getFetcher: rs,
      resetFetcher: us,
      deleteFetcher: zt,
      dispose: hl,
      getBlocker: ss,
      deleteBlocker: ka,
      patchRoutes: Cr,
      _internalFetchControllers: ue,
      _internalSetRoutes: Nr,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(S) {
        gt(S);
      }
    }),
    a.instrumentations &&
      (J = a1(J, a.instrumentations.map((S) => S.router).filter(Boolean))),
    J
  );
}
function h1(a) {
  return (
    a != null &&
    (("formData" in a && a.formData != null) ||
      ("body" in a && a.body !== void 0))
  );
}
function Lo(a, l, r, s, o, f) {
  let h, p;
  if (o) {
    h = [];
    for (let y of l)
      if ((h.push(y), y.route.id === o)) {
        p = y;
        break;
      }
  } else ((h = l), (p = l[l.length - 1]));
  let v = Pu(s || ".", Io(h), Tn(a.pathname, r) || a.pathname, f === "path");
  if (
    (s == null && ((v.search = a.search), (v.hash = a.hash)),
    (s == null || s === "" || s === ".") && p)
  ) {
    let y = nf(v.search);
    if (p.route.index && !y)
      v.search = v.search ? v.search.replace(/^\?/, "?index&") : "?index";
    else if (!p.route.index && y) {
      let g = new URLSearchParams(v.search),
        b = g.getAll("index");
      (g.delete("index"),
        b.filter((N) => N).forEach((N) => g.append("index", N)));
      let D = g.toString();
      v.search = D ? `?${D}` : "";
    }
  }
  return (
    r !== "/" && (v.pathname = $g({ basename: r, pathname: v.pathname })),
    zn(v)
  );
}
function R0(a, l, r) {
  if (!r || !h1(r)) return { path: l };
  if (r.formMethod && !z1(r.formMethod))
    return { path: l, error: dn(405, { method: r.formMethod }) };
  let s = () => ({ path: l, error: dn(400, { type: "invalid-body" }) }),
    o = (r.formMethod || "get").toUpperCase(),
    f = Ny(l);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!xt(o)) return s();
      let g =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce(
                (b, [D, N]) => `${b}${D}=${N}
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
      if (!xt(o)) return s();
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
  Ce(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let h, p;
  if (r.formData) ((h = Bo(r.formData)), (p = r.formData));
  else if (r.body instanceof FormData) ((h = Bo(r.body)), (p = r.body));
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
  if (xt(v.formMethod)) return { path: l, submission: v };
  let y = Un(l);
  return (
    a && y.search && nf(y.search) && h.append("index", ""),
    (y.search = `?${h}`),
    { path: zn(y), submission: v }
  );
}
function A0(
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
  D,
  N,
  U,
  F,
  X,
  P,
  ee,
  ae,
  de,
  oe
) {
  let Oe = de ? (Wt(de[1]) ? de[1].error : de[1].data) : void 0,
    J = o.createURL(f.location),
    L = o.createURL(v),
    Se;
  if (g && f.errors) {
    let x = Object.keys(f.errors)[0];
    Se = h.findIndex((Q) => Q.route.id === x);
  } else if (de && Wt(de[1])) {
    let x = de[0];
    Se = h.findIndex((Q) => Q.route.id === x) - 1;
  }
  let He = de ? de[1].statusCode : void 0,
    Xe = He && He >= 400,
    De = {
      currentUrl: J,
      currentParams: f.matches[0]?.params || {},
      nextUrl: L,
      nextParams: h[0].params,
      ...p,
      actionResult: Oe,
      actionStatus: He
    },
    Be = li(h),
    rt = h.map((x, Q) => {
      let { route: ie } = x,
        ue = null;
      if (Se != null && Q > Se) ue = !1;
      else if (ie.lazy) ue = !0;
      else if (!ef(ie)) ue = !1;
      else if (g) {
        let { shouldLoad: B } = Sy(ie, f.loaderData, f.errors);
        ue = B;
      } else m1(f.loaderData, f.matches[Q], x) && (ue = !0);
      if (ue !== null) return jo(r, s, a, v, Be, x, y, l, ue);
      let ge = !1;
      typeof oe == "boolean"
        ? (ge = oe)
        : Xe
          ? (ge = !1)
          : (b ||
              J.pathname + J.search === L.pathname + L.search ||
              J.search !== L.search ||
              y1(f.matches[Q], x)) &&
            (ge = !0);
      let T = { ...De, defaultShouldRevalidate: ge };
      return jo(r, s, a, v, Be, x, y, l, cr(x, T), T, oe);
    }),
    Je = [];
  return (
    U.forEach((x, Q) => {
      if (g || !h.some((se) => se.route.id === x.routeId) || N.has(Q)) return;
      let ie = f.fetchers.get(Q),
        ue = ie && ie.state !== "idle" && ie.data === void 0,
        ge = Sn(X, x.path, P ?? "/", !1, ae);
      if (!ge) {
        if (ee && ue) return;
        Je.push({
          key: Q,
          routeId: x.routeId,
          path: x.path,
          matches: null,
          match: null,
          request: null,
          controller: null
        });
        return;
      }
      if (F.has(Q)) return;
      let T = Qu(ge, x.path),
        B = new AbortController(),
        Z = Il(o, x.path, B.signal),
        $ = null;
      if (D.has(Q)) (D.delete(Q), ($ = ti(r, s, Z, x.path, ge, T, y, l)));
      else if (ue) b && ($ = ti(r, s, Z, x.path, ge, T, y, l));
      else {
        let se;
        typeof oe == "boolean" ? (se = oe) : Xe ? (se = !1) : (se = b);
        let me = { ...De, defaultShouldRevalidate: se };
        cr(T, me) && ($ = ti(r, s, Z, x.path, ge, T, y, l, me));
      }
      $ &&
        Je.push({
          key: Q,
          routeId: x.routeId,
          path: x.path,
          matches: $,
          match: T,
          request: Z,
          controller: B
        });
    }),
    { dsMatches: rt, revalidatingFetchers: Je }
  );
}
function ef(a) {
  return a.loader != null || (a.middleware != null && a.middleware.length > 0);
}
function Sy(a, l, r) {
  if (a.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!ef(a)) return { shouldLoad: !1, renderFallback: !1 };
  let s = l != null && a.id in l,
    o = r != null && r[a.id] !== void 0;
  if (!s && o) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof a.loader == "function" && a.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !s };
  let f = !s && !o;
  return { shouldLoad: f, renderFallback: f };
}
function m1(a, l, r) {
  let s = !l || r.route.id !== l.route.id,
    o = !a.hasOwnProperty(r.route.id);
  return s || o;
}
function y1(a, l) {
  let r = a.route.path;
  return (
    a.pathname !== l.pathname ||
    (r != null && r.endsWith("*") && a.params["*"] !== l.params["*"])
  );
}
function cr(a, l) {
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
    (Ce(y, `No route found to patch children into: routeId = ${a}`),
      y.children || (y.children = []),
      (h = y.children));
  } else h = r.activeRoutes;
  let p = [],
    v = [];
  if (
    (l.forEach((y) => {
      let g = h.find((b) => Ty(y, b));
      g ? v.push({ existingRoute: g, newRoute: y }) : p.push(y);
    }),
    p.length > 0)
  ) {
    let y = dr(p, o, [a || "_", "patch", String(h?.length || "0")], s);
    h.push(...y);
  }
  if (f && v.length > 0)
    for (let y = 0; y < v.length; y++) {
      let { existingRoute: g, newRoute: b } = v[y],
        D = g,
        [N] = dr([b], o, [], {}, !0);
      Object.assign(D, {
        element: N.element ? N.element : D.element,
        errorElement: N.errorElement ? N.errorElement : D.errorElement,
        hydrateFallbackElement: N.hydrateFallbackElement
          ? N.hydrateFallbackElement
          : D.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Ty(a, l) {
  return "id" in a && "id" in l && a.id === l.id
    ? !0
    : a.index === l.index &&
        a.path === l.path &&
        a.caseSensitive === l.caseSensitive
      ? (!a.children || a.children.length === 0) &&
        (!l.children || l.children.length === 0)
        ? !0
        : (a.children?.every((r, s) => l.children?.some((o) => Ty(r, o))) ?? !1)
      : !1;
}
const D0 = new WeakMap(),
  Ry = ({ key: a, route: l, manifest: r, mapRouteProperties: s }) => {
    let o = r[l.id];
    if (
      (Ce(o, "No route found in manifest"),
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
      let y = wg(a),
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
  N0 = new WeakMap();
function p1(a, l, r, s, o) {
  let f = r[a.id];
  if ((Ce(f, "No route found in manifest"), !a.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof a.lazy == "function") {
    let g = N0.get(f);
    if (g) return { lazyRoutePromise: g, lazyHandlerPromise: g };
    let b = (async () => {
      Ce(typeof a.lazy == "function", "No lazy route function found");
      let D = await a.lazy(),
        N = {};
      for (let U in D) {
        let F = D[U];
        if (F === void 0) continue;
        let X = Ug(U),
          P = f[U] !== void 0;
        X
          ? jt(
              !X,
              "Route property " +
                U +
                " is not a supported property to be returned from a lazy route function. This property will be ignored."
            )
          : P
            ? jt(
                !P,
                `Route "${f.id}" has a static property "${U}" defined but its lazy function is also returning a value for this property. The lazy route property "${U}" will be ignored.`
              )
            : (N[U] = F);
      }
      (Object.assign(f, N), Object.assign(f, { ...s(f), lazy: void 0 }));
    })();
    return (
      N0.set(f, b),
      b.catch(() => {}),
      { lazyRoutePromise: b, lazyHandlerPromise: b }
    );
  }
  let h = Object.keys(a.lazy),
    p = [],
    v;
  for (let g of h) {
    if (o && o.includes(g)) continue;
    let b = Ry({ key: g, route: a, manifest: r, mapRouteProperties: s });
    b && (p.push(b), g === l && (v = b));
  }
  let y = p.length > 0 ? Promise.all(p).then(() => {}) : void 0;
  return (
    y?.catch(() => {}),
    v?.catch(() => {}),
    { lazyRoutePromise: y, lazyHandlerPromise: v }
  );
}
async function C0(a) {
  let l = a.matches.filter((s) => s.shouldLoad),
    r = {};
  return (
    (await Promise.all(l.map((s) => s.resolve()))).forEach((s, o) => {
      r[l[o].route.id] = s;
    }),
    r
  );
}
async function v1(a) {
  return a.matches.some((l) => l.route.middleware) ? Ay(a, () => C0(a)) : C0(a);
}
function Ay(a, l) {
  return g1(
    a,
    l,
    (s) => {
      if (w1(s)) throw s;
      return s;
    },
    C1,
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
      return { [Ya(h, v).route.id]: { type: "error", result: s } };
    }
  }
}
async function g1(a, l, r, s, o) {
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
    D = async () => {
      if (b) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((b = { value: await Oy(a, l, r, s, o, f, h + 1) }), b.value);
      } catch (N) {
        return ((b = { value: await f(N, y, b) }), b.value);
      }
    };
  try {
    let N = await g(a, D),
      U = N != null ? s(N) : void 0;
    return o(U)
      ? U
      : b
        ? (U ?? b.value)
        : ((b = { value: await D() }), b.value);
  } catch (N) {
    return await f(N, y, b);
  }
}
function Dy(a, l, r, s, o) {
  let f = Ry({
      key: "middleware",
      route: s.route,
      manifest: l,
      mapRouteProperties: a
    }),
    h = p1(s.route, xt(r.method) ? "action" : "loader", l, a, o);
  return {
    middleware: f,
    route: h.lazyRoutePromise,
    handler: h.lazyHandlerPromise
  };
}
function jo(a, l, r, s, o, f, h, p, v, y = null, g) {
  let b = !1,
    D = Dy(a, l, r, f, h);
  return {
    ...f,
    _lazyPromises: D,
    shouldLoad: v,
    shouldRevalidateArgs: y,
    shouldCallHandler(N) {
      return (
        (b = !0),
        y
          ? typeof g == "boolean"
            ? cr(f, { ...y, defaultShouldRevalidate: g })
            : typeof N == "boolean"
              ? cr(f, { ...y, defaultShouldRevalidate: N })
              : cr(f, y)
          : v
      );
    },
    resolve(N) {
      let { lazy: U, loader: F, middleware: X } = f.route,
        P = b || v || (N && !xt(r.method) && (U || F)),
        ee = X && X.length > 0 && !F && !U;
      return P && (xt(r.method) || !ee)
        ? E1({
            request: r,
            path: s,
            pattern: o,
            match: f,
            lazyHandlerPromise: D?.handler,
            lazyRoutePromise: D?.route,
            handlerOverride: N,
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
      : jo(a, l, r, s, li(o), y, h, p, !0, v)
  );
}
async function b1(a, l, r, s, o, f, h) {
  s.some((g) => g._lazyPromises?.middleware) &&
    (await Promise.all(s.map((g) => g._lazyPromises?.middleware)));
  let p = {
      request: l,
      url: Po(l, r),
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
        return Ay(b, () =>
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
async function E1({
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
    g = xt(a.method),
    b = g ? "action" : "loader",
    D = (N) => {
      let U,
        F = new Promise((ee, ae) => (U = ae));
      ((y = () => U()), a.signal.addEventListener("abort", y));
      let X = (ee) =>
          typeof N != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${s.route.id}]`
                )
              )
            : N(
                {
                  request: a,
                  url: Po(a, l),
                  pattern: r,
                  params: s.params,
                  context: p
                },
                ...(ee !== void 0 ? [ee] : [])
              ),
        P = (async () => {
          try {
            return { type: "data", result: await (h ? h((ee) => X(ee)) : X()) };
          } catch (ee) {
            return { type: "error", result: ee };
          }
        })();
      return Promise.race([P, F]);
    };
  try {
    let N = g ? s.route.action : s.route.loader;
    if (o || f)
      if (N) {
        let U,
          [F] = await Promise.all([
            D(N).catch((X) => {
              U = X;
            }),
            o,
            f
          ]);
        if (U !== void 0) throw U;
        v = F;
      } else {
        await o;
        let U = g ? s.route.action : s.route.loader;
        if (U) [v] = await Promise.all([D(U), f]);
        else if (b === "action") {
          let F = new URL(a.url),
            X = F.pathname + F.search;
          throw dn(405, { method: a.method, pathname: X, routeId: s.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (N) v = await D(N);
    else {
      let U = new URL(a.url);
      throw dn(404, { pathname: U.pathname + U.search });
    }
  } catch (N) {
    return { type: "error", result: N };
  } finally {
    y && a.signal.removeEventListener("abort", y);
  }
  return v;
}
async function S1(a) {
  let l = a.headers.get("Content-Type");
  return l && /\bapplication\/json\b/.test(l)
    ? a.body == null
      ? null
      : a.json()
    : a.text();
}
async function T1(a) {
  let { result: l, type: r } = a;
  if (tf(l)) {
    let s;
    try {
      s = await S1(l);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error"
      ? {
          type: "error",
          error: new pr(l.status, l.statusText, s),
          statusCode: l.status,
          headers: l.headers
        }
      : { type: "data", data: s, statusCode: l.status, headers: l.headers };
  }
  return r === "error"
    ? U0(l)
      ? l.data instanceof Error
        ? {
            type: "error",
            error: l.data,
            statusCode: l.init?.status,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
        : {
            type: "error",
            error: N1(l),
            statusCode: hr(l) ? l.status : void 0,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
      : { type: "error", error: l, statusCode: hr(l) ? l.status : void 0 }
    : U0(l)
      ? {
          type: "data",
          data: l.data,
          statusCode: l.init?.status,
          headers: l.init?.headers ? new Headers(l.init.headers) : void 0
        }
      : { type: "data", data: l };
}
function R1(a, l, r, s, o) {
  let f = a.headers.get("Location");
  if (
    (Ce(
      f,
      "Redirects returned/thrown from loaders/actions must have a Location header"
    ),
    !$o(f))
  ) {
    let h = s.slice(0, s.findIndex((p) => p.route.id === r) + 1);
    ((f = Lo(new URL(l.url), h, o, f)), a.headers.set("Location", f));
  }
  return a;
}
const A1 = [
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
function Ho(a) {
  try {
    return A1.includes(new URL(a).protocol);
  } catch {
    return !1;
  }
}
function _0(a, l, r, s) {
  if ($o(a)) {
    let o = a,
      f = Jo.test(o) ? new URL(ly(o, l.protocol)) : new URL(o);
    if (Ho(f.toString())) throw new Error("Invalid redirect location");
    let h = Tn(f.pathname, r) != null;
    if (f.origin === l.origin && h) return Wo(f.pathname) + f.search + f.hash;
  }
  try {
    if (Ho(s.createURL(a).toString()))
      throw new Error("Invalid redirect location");
  } catch {}
  return a;
}
function Il(a, l, r, s) {
  let o = a.createURL(Ny(l)).toString(),
    f = { signal: r };
  if (s && xt(s.formMethod)) {
    let { formMethod: h, formEncType: p } = s;
    ((f.method = h.toUpperCase()),
      p === "application/json"
        ? ((f.headers = new Headers({ "Content-Type": p })),
          (f.body = JSON.stringify(s.json)))
        : p === "text/plain"
          ? (f.body = s.text)
          : p === "application/x-www-form-urlencoded" && s.formData
            ? (f.body = Bo(s.formData))
            : (f.body = s.formData));
  }
  return new Request(o, f);
}
function Bo(a) {
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
      let D = b.route.id,
        N = l[D];
      if (
        (Ce(!cl(N), "Cannot handle redirect results in processLoaderData"),
        Wt(N))
      ) {
        let U = N.error;
        if ((g !== void 0 && ((U = g), (g = void 0)), (h = h || {}), o))
          h[D] = U;
        else {
          let F = Ya(a, D);
          h[F.route.id] == null && (h[F.route.id] = U);
        }
        (s || (f[D] = Ey),
          v || ((v = !0), (p = hr(N.error) ? N.error.status : 500)),
          N.headers && (y[D] = N.headers));
      } else
        ((f[D] = N.data),
          N.statusCode && N.statusCode !== 200 && !v && (p = N.statusCode),
          N.headers && (y[D] = N.headers));
    }),
    g !== void 0 && r && ((h = { [r[0]]: g }), r[2] && (f[r[2]] = void 0)),
    { loaderData: f, errors: h, statusCode: p || 200, loaderHeaders: y }
  );
}
function x0(a, l, r, s, o, f, h) {
  let { loaderData: p, errors: v } = O1(l, r, s);
  return (
    o
      .filter((y) => !y.matches || y.matches.some((g) => g.shouldLoad))
      .forEach((y) => {
        let { key: g, match: b, controller: D } = y;
        if (D && D.signal.aborted) return;
        let N = f[g];
        if ((Ce(N, "Did not find corresponding fetcher result"), Wt(N))) {
          let U = Ya(a.matches, b?.route.id);
          ((v && v[U.route.id]) || (v = { ...v, [U.route.id]: N.error }),
            h.delete(g));
        } else if (cl(N)) Ce(!1, "Unhandled fetcher revalidation redirect");
        else {
          let U = _n(N.data);
          h.set(g, U);
        }
      }),
    { loaderData: p, errors: v }
  );
}
function w0(a, l, r, s) {
  let o = Object.entries(l)
    .filter(([, f]) => f !== Ey)
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
function z0(a) {
  return a
    ? Wt(a[1])
      ? { actionData: {} }
      : { actionData: { [a[0]]: a[1].data } }
    : {};
}
function Ya(a, l) {
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
    new pr(a || 500, h, new Error(p), !0)
  );
}
function Yu(a) {
  let l = Object.entries(a);
  for (let r = l.length - 1; r >= 0; r--) {
    let [s, o] = l[r];
    if (cl(o)) return { key: s, result: o };
  }
}
function Ny(a) {
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
function N1(a) {
  return new pr(
    a.init?.status ?? 500,
    a.init?.statusText ?? "Internal Server Error",
    a.data
  );
}
function C1(a) {
  return (
    a != null &&
    typeof a == "object" &&
    Object.entries(a).every(([l, r]) => typeof l == "string" && _1(r))
  );
}
function _1(a) {
  return (
    a != null &&
    typeof a == "object" &&
    "type" in a &&
    "result" in a &&
    (a.type === "data" || a.type === "error")
  );
}
function M1(a) {
  return tf(a.result) && gy.has(a.result.status);
}
function Wt(a) {
  return a.type === "error";
}
function cl(a) {
  return (a && a.type) === "redirect";
}
function U0(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "type" in a &&
    "data" in a &&
    "init" in a &&
    a.type === "DataWithResponseInit"
  );
}
function tf(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.headers == "object" &&
    typeof a.body < "u"
  );
}
function x1(a) {
  return gy.has(a);
}
function w1(a) {
  return tf(a) && x1(a.status) && a.headers.has("Location");
}
function z1(a) {
  return s1.has(a.toUpperCase());
}
function xt(a) {
  return r1.has(a.toUpperCase());
}
function nf(a) {
  return new URLSearchParams(a).getAll("index").some((l) => l === "");
}
function Qu(a, l) {
  let r = typeof l == "string" ? Un(l).search : l.search;
  if (a[a.length - 1].route.index && nf(r || "")) return a[a.length - 1];
  let s = dy(a);
  return s[s.length - 1];
}
function L0(a, l, r) {
  return {
    url: Po(a.createURL(l), l),
    pattern: r ? li(r) : "",
    params: r?.[0]?.params ? { ...r[0].params } : {}
  };
}
function j0(a) {
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
function Do(a, l, r, s) {
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
function U1(a, l, r, s) {
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
function nr(a, l) {
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
function L1(a, l) {
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
function j1(a, l) {
  try {
    let r = a.sessionStorage.getItem(by);
    if (r) {
      let s = JSON.parse(r);
      for (let [o, f] of Object.entries(s || {}))
        f && Array.isArray(f) && l.set(o, new Set(f || []));
    }
  } catch {}
}
function H1(a, l) {
  if (l.size > 0) {
    let r = {};
    for (let [s, o] of l) r[s] = [...o];
    try {
      a.sessionStorage.setItem(by, JSON.stringify(r));
    } catch (s) {
      jt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${s}).`
      );
    }
  }
}
function H0() {
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
const vr = z.createContext(null);
vr.displayName = "DataRouterState";
const Cy = z.createContext(!1);
function _y() {
  return z.useContext(Cy);
}
const af = z.createContext({ isTransitioning: !1 });
af.displayName = "ViewTransition";
const My = z.createContext(new Map());
My.displayName = "Fetchers";
const B1 = z.createContext(null);
B1.displayName = "Await";
const Rn = z.createContext(null);
Rn.displayName = "Navigation";
const es = z.createContext(null);
es.displayName = "Location";
const ca = z.createContext({ outlet: null, matches: [], isDataRoute: !1 });
ca.displayName = "Route";
const lf = z.createContext(null);
lf.displayName = "RouteError";
const xy = "REACT_ROUTER_ERROR",
  q1 = "REDIRECT",
  Y1 = "ROUTE_ERROR_RESPONSE";
function V1(a) {
  if (a.startsWith(`${xy}:${q1}:{`))
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
function k1(a) {
  if (a.startsWith(`${xy}:${Y1}:{`))
    try {
      let l = JSON.parse(a.slice(40));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string"
      )
        return new pr(l.status, l.statusText, l.data);
    } catch {}
}
function G1(a, { relative: l } = {}) {
  Ce(
    gr(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: s } = z.useContext(Rn),
    { hash: o, pathname: f, search: h } = br(a, { relative: l }),
    p = f;
  return (
    r !== "/" && (p = f === "/" ? r : hn([r, f])),
    s.createHref({ pathname: p, search: h, hash: o })
  );
}
function gr() {
  return z.useContext(es) != null;
}
function oa() {
  return (
    Ce(
      gr(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    z.useContext(es).location
  );
}
const wy =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Q1() {
  let { isDataRoute: a } = z.useContext(ca);
  return a ? lb() : X1();
}
function X1() {
  Ce(
    gr(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let a = z.useContext(dl),
    { basename: l, navigator: r } = z.useContext(Rn),
    { matches: s } = z.useContext(ca),
    { pathname: o } = oa(),
    f = JSON.stringify(Io(s)),
    h = z.useRef(!1);
  return (
    z.useLayoutEffect(() => {
      h.current = !0;
    }),
    z.useCallback(
      (p, v = {}) => {
        if ((jt(h.current, wy), !h.current)) return;
        if (typeof p == "number") {
          r.go(p);
          return;
        }
        let y = Pu(p, JSON.parse(f), o, v.relative === "path");
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
function br(a, { relative: l } = {}) {
  let { matches: r } = z.useContext(ca),
    { pathname: s } = oa(),
    o = JSON.stringify(Io(r));
  return z.useMemo(() => Pu(a, JSON.parse(o), s, l === "path"), [a, o, s, l]);
}
function F1(a, l, r) {
  Ce(
    gr(),
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
  let D =
    r && r.state.matches.length
      ? r.state.matches.map((U) =>
          Object.assign(U, { route: r.manifest[U.route.id] || U.route })
        )
      : uy(a, { pathname: b });
  return W1(
    D &&
      D.map((U) =>
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
function Z1() {
  let a = ab(),
    l = hr(a)
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
const K1 = z.createElement(Z1, null);
var J1 = class extends z.Component {
  constructor(a) {
    (super(a),
      (this.state = {
        location: a.location,
        revalidation: a.revalidation,
        error: a.error
      }));
  }
  static contextType = Cy;
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
      const r = k1(a.digest);
      r && (a = r);
    }
    let l =
      a !== void 0
        ? z.createElement(
            ca.Provider,
            { value: this.props.routeContext },
            z.createElement(lf.Provider, {
              value: a,
              children: this.props.component
            })
          )
        : this.props.children;
    return this.context ? z.createElement($1, { error: a }, l) : l;
  }
};
const No = new WeakMap();
function $1({ children: a, error: l }) {
  let { basename: r } = z.useContext(Rn);
  if (
    typeof l == "object" &&
    l &&
    "digest" in l &&
    typeof l.digest == "string"
  ) {
    let s = V1(l.digest);
    if (s) {
      let o = No.get(l);
      if (o) throw o;
      let f = yy(s.location, r),
        h = f.absoluteURL || f.to;
      if (Ho(h)) throw new Error("Invalid redirect location");
      if (my && !No.get(l))
        if (f.isExternal || s.reloadDocument) window.location.href = h;
        else {
          const p = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, {
              replace: s.replace
            })
          );
          throw (No.set(l, p), p);
        }
      return z.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${h}`
      });
    }
  }
  return a;
}
function I1({ routeContext: a, match: l, children: r }) {
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
function W1(a, l = [], r) {
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
    (Ce(
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
        let { loaderData: D, errors: N } = s,
          U =
            b.route.loader &&
            !D.hasOwnProperty(b.route.id) &&
            (!N || N[b.route.id] === void 0);
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
  return o.reduceRight((g, b, D) => {
    let N,
      U = !1,
      F = null,
      X = null;
    s &&
      ((N = f && b.route.id ? f[b.route.id] : void 0),
      (F = b.route.errorElement || K1),
      h &&
        (p < 0 && D === 0
          ? (ib(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (U = !0),
            (X = null))
          : p === D &&
            ((U = !0), (X = b.route.hydrateFallbackElement || null))));
    let P = l.concat(o.slice(0, D + 1)),
      ee = () => {
        let ae;
        return (
          N
            ? (ae = F)
            : U
              ? (ae = X)
              : b.route.Component
                ? (ae = z.createElement(b.route.Component, null))
                : b.route.element
                  ? (ae = b.route.element)
                  : (ae = g),
          z.createElement(I1, {
            match: b,
            routeContext: { outlet: g, matches: P, isDataRoute: s != null },
            children: ae
          })
        );
      };
    return s && (b.route.ErrorBoundary || b.route.errorElement || D === 0)
      ? z.createElement(J1, {
          location: s.location,
          revalidation: s.revalidation,
          component: F,
          error: N,
          children: ee(),
          routeContext: { outlet: null, matches: P, isDataRoute: !0 },
          onError: y
        })
      : ee();
  }, null);
}
function rf(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function P1(a) {
  let l = z.useContext(dl);
  return (Ce(l, rf(a)), l);
}
function eb(a) {
  let l = z.useContext(vr);
  return (Ce(l, rf(a)), l);
}
function tb(a) {
  let l = z.useContext(ca);
  return (Ce(l, rf(a)), l);
}
function uf(a) {
  let l = tb(a),
    r = l.matches[l.matches.length - 1];
  return (
    Ce(
      r.route.id,
      `${a} can only be used on routes that contain a unique "id"`
    ),
    r.route.id
  );
}
function nb() {
  return uf("useRouteId");
}
function ab() {
  let a = z.useContext(lf),
    l = eb("useRouteError"),
    r = uf("useRouteError");
  return a !== void 0 ? a : l.errors?.[r];
}
function lb() {
  let { router: a } = P1("useNavigate"),
    l = uf("useNavigate"),
    r = z.useRef(!1);
  return (
    z.useLayoutEffect(() => {
      r.current = !0;
    }),
    z.useCallback(
      async (s, o = {}) => {
        (jt(r.current, wy),
          r.current &&
            (typeof s == "number"
              ? await a.navigate(s)
              : await a.navigate(s, { fromRouteId: l, ...o })));
      },
      [a, l]
    )
  );
}
const B0 = {};
function ib(a, l, r) {
  B0[a] || ((B0[a] = !0), jt(!1, r));
}
const q0 = {};
function Y0(a, l) {
  !a && !q0[l] && ((q0[l] = !0), console.warn(l));
}
const rb = ["HydrateFallback", "hydrateFallbackElement"];
var ub = class {
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
function sb({ router: a, flushSync: l, onError: r, useTransitions: s }) {
  s = _y() || s;
  let [o, f] = z.useState(a.state),
    [h, p] = z.useOptimistic(o),
    [v, y] = z.useState(),
    [g, b] = z.useState({ isTransitioning: !1 }),
    [D, N] = z.useState(),
    [U, F] = z.useState(),
    [X, P] = z.useState(),
    ee = z.useRef(new Map()),
    ae = z.useCallback(
      (
        J,
        {
          deletedFetchers: L,
          newErrors: Se,
          flushSync: He,
          viewTransitionOpts: Xe
        }
      ) => {
        (Se &&
          r &&
          Object.values(Se).forEach((Be) =>
            r(Be, {
              location: J.location,
              params: J.matches[0]?.params ?? {},
              pattern: li(J.matches)
            })
          ),
          J.fetchers.forEach((Be, rt) => {
            Be.data !== void 0 && ee.current.set(rt, Be.data);
          }),
          L.forEach((Be) => ee.current.delete(Be)),
          Y0(
            He === !1 || l != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let De =
          a.window != null &&
          a.window.document != null &&
          typeof a.window.document.startViewTransition == "function";
        if (
          (Y0(
            Xe == null || De,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
          ),
          !Xe || !De)
        ) {
          l && He
            ? l(() => f(J))
            : s === !1
              ? f(J)
              : z.startTransition(() => {
                  (s === !0 && p((Be) => V0(Be, J)), f(J));
                });
          return;
        }
        if (l && He) {
          l(() => {
            (U && (D?.resolve(), U.skipTransition()),
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
              (N(void 0), F(void 0), y(void 0), b({ isTransitioning: !1 }));
            });
          }),
            l(() => F(Be)));
          return;
        }
        U
          ? (D?.resolve(),
            U.skipTransition(),
            P({
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
      [a.window, l, U, D, s, p, r]
    );
  (z.useLayoutEffect(() => a.subscribe(ae), [a, ae]),
    z.useEffect(() => {
      g.isTransitioning && !g.flushSync && N(new ub());
    }, [g]),
    z.useEffect(() => {
      if (D && v && a.window) {
        let J = v,
          L = D.promise,
          Se = a.window.document.startViewTransition(async () => {
            (s === !1
              ? f(J)
              : z.startTransition(() => {
                  (s === !0 && p((He) => V0(He, J)), f(J));
                }),
              await L);
          });
        (Se.finished.finally(() => {
          (N(void 0), F(void 0), y(void 0), b({ isTransitioning: !1 }));
        }),
          F(Se));
      }
    }, [v, D, a.window, s, p]),
    z.useEffect(() => {
      D && v && h.location.key === v.location.key && D.resolve();
    }, [D, U, h.location, v]),
    z.useEffect(() => {
      !g.isTransitioning &&
        X &&
        (y(X.state),
        b({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: X.currentLocation,
          nextLocation: X.nextLocation
        }),
        P(void 0));
    }, [g.isTransitioning, X]));
  let de = z.useMemo(
      () => ({
        createHref: a.createHref,
        encodeLocation: a.encodeLocation,
        go: (J) => a.navigate(J),
        push: (J, L, Se) =>
          a.navigate(J, {
            state: L,
            preventScrollReset: Se?.preventScrollReset
          }),
        replace: (J, L, Se) =>
          a.navigate(J, {
            replace: !0,
            state: L,
            preventScrollReset: Se?.preventScrollReset
          })
      }),
      [a]
    ),
    oe = a.basename || "/",
    Oe = z.useMemo(
      () => ({
        router: a,
        navigator: de,
        static: !1,
        basename: oe,
        onError: r
      }),
      [a, de, oe, r]
    );
  return z.createElement(
    z.Fragment,
    null,
    z.createElement(
      dl.Provider,
      { value: Oe },
      z.createElement(
        vr.Provider,
        { value: h },
        z.createElement(
          My.Provider,
          { value: ee.current },
          z.createElement(
            af.Provider,
            { value: g },
            z.createElement(
              fb,
              {
                basename: oe,
                location: h.location,
                navigationType: h.historyAction,
                navigator: de,
                useTransitions: s
              },
              z.createElement(cb, {
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
function V0(a, l) {
  return {
    ...a,
    navigation: l.navigation.state !== "idle" ? l.navigation : a.navigation,
    revalidation: l.revalidation !== "idle" ? l.revalidation : a.revalidation,
    actionData:
      l.navigation.state !== "submitting" ? l.actionData : a.actionData,
    fetchers: l.fetchers
  };
}
const cb = z.memo(ob);
function ob({
  routes: a,
  manifest: l,
  future: r,
  state: s,
  isStatic: o,
  onError: f
}) {
  return F1(a, void 0, { manifest: l, state: s, isStatic: o, onError: f });
}
function fb({
  basename: a = "/",
  children: l = null,
  location: r,
  navigationType: s = "POP",
  navigator: o,
  static: f = !1,
  useTransitions: h
}) {
  Ce(
    !gr(),
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
      state: D = null,
      key: N = "default",
      mask: U
    } = r,
    F = z.useMemo(() => {
      let X = Tn(y, p);
      return X == null
        ? null
        : {
            location: {
              pathname: X,
              search: g,
              hash: b,
              state: D,
              key: N,
              mask: U
            },
            navigationType: s
          };
    }, [p, y, g, b, D, N, s, U]);
  return (
    jt(
      F != null,
      `<Router basename="${p}"> is not able to match the URL "${y}${g}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    F == null
      ? null
      : z.createElement(
          Rn.Provider,
          { value: v },
          z.createElement(es.Provider, { children: l, value: F })
        )
  );
}
const Xu = "application/x-www-form-urlencoded";
function ts(a) {
  return typeof HTMLElement < "u" && a instanceof HTMLElement;
}
function db(a) {
  return ts(a) && a.tagName.toLowerCase() === "button";
}
function hb(a) {
  return ts(a) && a.tagName.toLowerCase() === "form";
}
function mb(a) {
  return ts(a) && a.tagName.toLowerCase() === "input";
}
function yb(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function pb(a, l) {
  return a.button === 0 && (!l || l === "_self") && !yb(a);
}
let Vu = null;
function vb() {
  if (Vu === null)
    try {
      (new FormData(document.createElement("form"), 0), (Vu = !1));
    } catch {
      Vu = !0;
    }
  return Vu;
}
const gb = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Co(a) {
  return a != null && !gb.has(a)
    ? (jt(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Xu}"`
      ),
      null)
    : a;
}
function bb(a, l) {
  let r, s, o, f, h;
  if (hb(a)) {
    let p = a.getAttribute("action");
    ((s = p ? Tn(p, l) : null),
      (r = a.getAttribute("method") || "get"),
      (o = Co(a.getAttribute("enctype")) || Xu),
      (f = new FormData(a)));
  } else if (db(a) || (mb(a) && (a.type === "submit" || a.type === "image"))) {
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
        Co(a.getAttribute("formenctype")) ||
        Co(p.getAttribute("enctype")) ||
        Xu),
      (f = new FormData(p, a)),
      !vb())
    ) {
      let { name: y, type: g, value: b } = a;
      if (g === "image") {
        let D = y ? `${y}.` : "";
        (f.append(`${D}x`, "0"), f.append(`${D}y`, "0"));
      } else y && f.append(y, b);
    }
  } else {
    if (ts(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = "get"), (s = null), (o = Xu), (h = a));
  }
  return (
    f && o === "text/plain" && ((h = f), (f = void 0)),
    { action: s, method: r.toLowerCase(), encType: o, formData: f, body: h }
  );
}
function sf(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function zy(a, l) {
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
async function Eb(a, l) {
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
function Sb(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === "preload" &&
        typeof a.imageSrcSet == "string" &&
        typeof a.imageSizes == "string"
      : typeof a.rel == "string" && typeof a.href == "string";
}
async function Tb(a, l, r) {
  return Db(
    (
      await Promise.all(
        a.map(async (s) => {
          let o = l.routes[s.route.id];
          if (o) {
            let f = await Eb(o, r);
            return f.links ? f.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(Sb)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" }
      )
  );
}
function k0(a, l, r, s, o, f) {
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
function Rb(a, l, { includeHydrateFallback: r } = {}) {
  return Ab(
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
function Ab(a) {
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
function Nb() {
  let a = z.useContext(dl);
  return (
    sf(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    a
  );
}
function Cb() {
  let a = z.useContext(vr);
  return (
    sf(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    a
  );
}
const cf = z.createContext(void 0);
cf.displayName = "FrameworkContext";
function of() {
  let a = z.useContext(cf);
  return (
    sf(a, "You must render this element inside a <HydratedRouter> element"),
    a
  );
}
function _b(a, l) {
  let r = z.useContext(cf),
    [s, o] = z.useState(!1),
    [f, h] = z.useState(!1),
    {
      onFocus: p,
      onBlur: v,
      onMouseEnter: y,
      onMouseLeave: g,
      onTouchStart: b
    } = l,
    D = z.useRef(null);
  (z.useEffect(() => {
    if ((a === "render" && h(!0), a === "viewport")) {
      let F = (P) => {
          P.forEach((ee) => {
            h(ee.isIntersecting);
          });
        },
        X = new IntersectionObserver(F, { threshold: 0.5 });
      return (
        D.current && X.observe(D.current),
        () => {
          X.disconnect();
        }
      );
    }
  }, [a]),
    z.useEffect(() => {
      if (s) {
        let F = setTimeout(() => {
          h(!0);
        }, 100);
        return () => {
          clearTimeout(F);
        };
      }
    }, [s]));
  let N = () => {
      o(!0);
    },
    U = () => {
      (o(!1), h(!1));
    };
  return r
    ? a !== "intent"
      ? [f, D, {}]
      : [
          f,
          D,
          {
            onFocus: ar(p, N),
            onBlur: ar(v, U),
            onMouseEnter: ar(y, N),
            onMouseLeave: ar(g, U),
            onTouchStart: ar(b, N)
          }
        ]
    : [!1, D, {}];
}
function ar(a, l) {
  return (r) => {
    (a && a(r), r.defaultPrevented || l(r));
  };
}
function Mb({ page: a, ...l }) {
  let r = _y(),
    { nonce: s } = of(),
    { router: o } = Nb(),
    f = z.useMemo(() => uy(o.routes, a, o.basename), [o.routes, a, o.basename]);
  return f
    ? (l.nonce == null && s && (l = { ...l, nonce: s }),
      r
        ? z.createElement(wb, { page: a, matches: f, ...l })
        : z.createElement(zb, { page: a, matches: f, ...l }))
    : null;
}
function xb(a) {
  let { manifest: l, routeModules: r } = of(),
    [s, o] = z.useState([]);
  return (
    z.useEffect(() => {
      let f = !1;
      return (
        Tb(a, l, r).then((h) => {
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
function wb({ page: a, matches: l, ...r }) {
  let s = oa(),
    o = z.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let f = zy(a, "rsc"),
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
function zb({ page: a, matches: l, ...r }) {
  let s = oa(),
    { manifest: o, routeModules: f } = of(),
    { loaderData: h, matches: p } = Cb(),
    v = z.useMemo(() => k0(a, l, p, o, s, "data"), [a, l, p, o, s]),
    y = z.useMemo(() => k0(a, l, p, o, s, "assets"), [a, l, p, o, s]),
    g = z.useMemo(() => {
      if (a === s.pathname + s.search + s.hash) return [];
      let N = new Set(),
        U = !1;
      if (
        (l.forEach((X) => {
          let P = o.routes[X.route.id];
          !P ||
            !P.hasLoader ||
            ((!v.some((ee) => ee.route.id === X.route.id) &&
              X.route.id in h &&
              f[X.route.id]?.shouldRevalidate) ||
            P.hasClientLoader
              ? (U = !0)
              : N.add(X.route.id));
        }),
        N.size === 0)
      )
        return [];
      let F = zy(a, "data");
      return (
        U &&
          N.size > 0 &&
          F.searchParams.set(
            "_routes",
            l
              .filter((X) => N.has(X.route.id))
              .map((X) => X.route.id)
              .join(",")
          ),
        [F.pathname + F.search]
      );
    }, [h, s, o, v, l, a, f]),
    b = z.useMemo(() => Rb(y, o), [y, o]),
    D = xb(y);
  return z.createElement(
    z.Fragment,
    null,
    g.map((N) =>
      z.createElement("link", {
        key: N,
        rel: "prefetch",
        as: "fetch",
        href: N,
        ...r
      })
    ),
    b.map((N) =>
      z.createElement("link", { key: N, rel: "modulepreload", href: N, ...r })
    ),
    D.map(({ key: N, link: U }) =>
      z.createElement("link", {
        key: N,
        nonce: r.nonce,
        ...U,
        crossOrigin: U.crossOrigin ?? r.crossOrigin
      })
    )
  );
}
function Ub(...a) {
  return (l) => {
    a.forEach((r) => {
      typeof r == "function" ? r(l) : r != null && (r.current = l);
    });
  };
}
const Lb =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Lb && (window.__reactRouterVersion = "8.3.0");
} catch {}
function jb(a, l) {
  return d1({
    basename: l?.basename,
    getContext: l?.getContext,
    future: l?.future,
    history: Cg({ window: l?.window }),
    hydrationData: l?.hydrationData || Hb(),
    routes: a,
    mapRouteProperties: ry,
    hydrationRouteProperties: rb,
    dataStrategy: l?.dataStrategy,
    patchRoutesOnNavigation: l?.patchRoutesOnNavigation,
    window: l?.window,
    instrumentations: l?.instrumentations
  }).initialize();
}
function Hb() {
  let a = window?.__staticRouterHydrationData;
  return (a && a.errors && (a = { ...a, errors: Bb(a.errors) }), a);
}
function Bb(a) {
  if (!a) return null;
  let l = Object.entries(a),
    r = {};
  for (let [s, o] of l)
    if (o && o.__type === "RouteErrorResponse")
      r[s] = new pr(o.status, o.statusText, o.data, o.internal === !0);
    else if (o && o.__type === "Error") {
      if (typeof o.__subType == "string" && t1.includes(o.__subType)) {
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
const Uy = z.forwardRef(function (
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
    viewTransition: D,
    defaultShouldRevalidate: N,
    ...U
  },
  F
) {
  let { basename: X, navigator: P, useTransitions: ee } = z.useContext(Rn),
    ae = typeof g == "string" && Wu.test(g),
    de = yy(g, X);
  g = de.to;
  let oe = G1(g, { relative: o }),
    Oe = oa(),
    J = null;
  if (p) {
    let Je = Pu(p, [], Oe.mask ? Oe.mask.pathname : "/", !0);
    (X !== "/" &&
      (Je.pathname = Je.pathname === "/" ? X : hn([X, Je.pathname])),
      (J = P.createHref(Je)));
  }
  let [L, Se, He] = _b(s, U),
    Xe = kb(g, {
      replace: h,
      mask: p,
      state: v,
      target: y,
      preventScrollReset: b,
      relative: o,
      viewTransition: D,
      defaultShouldRevalidate: N,
      useTransitions: ee
    });
  function De(Je) {
    (l && l(Je), Je.defaultPrevented || Xe(Je));
  }
  let Be = !(de.isExternal || f),
    rt = z.createElement("a", {
      ...U,
      ...He,
      href: (Be ? J : void 0) || de.absoluteURL || oe,
      onClick: Be ? De : l,
      ref: Ub(F, Se),
      target: y,
      "data-discover": !ae && r === "render" ? "true" : void 0
    });
  return L && !ae
    ? z.createElement(z.Fragment, null, rt, z.createElement(Mb, { page: oe }))
    : rt;
});
Uy.displayName = "Link";
const qb = z.forwardRef(function (
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
  let b = br(h, { relative: y.relative }),
    D = oa(),
    N = z.useContext(vr),
    { navigator: U, basename: F } = z.useContext(Rn),
    X = N != null && Zb(b) && p === !0,
    P = U.encodeLocation ? U.encodeLocation(b).pathname : b.pathname,
    ee = D.pathname,
    ae =
      N && N.navigation && N.navigation.location
        ? N.navigation.location.pathname
        : null;
  (r ||
    ((ee = ee.toLowerCase()),
    (ae = ae ? ae.toLowerCase() : null),
    (P = P.toLowerCase())),
    ae && F && (ae = Tn(ae, F) || ae));
  const de = P !== "/" && P.endsWith("/") ? P.length - 1 : P.length;
  let oe = ee === P || (!o && ee.startsWith(P) && ee.charAt(de) === "/"),
    Oe =
      ae != null &&
      (ae === P || (!o && ae.startsWith(P) && ae.charAt(de) === "/")),
    J = { isActive: oe, isPending: Oe, isTransitioning: X },
    L = oe ? l : void 0,
    Se;
  typeof s == "function"
    ? (Se = s(J))
    : (Se = [
        s,
        oe ? "active" : null,
        Oe ? "pending" : null,
        X ? "transitioning" : null
      ]
        .filter(Boolean)
        .join(" "));
  let He = typeof f == "function" ? f(J) : f;
  return z.createElement(
    Uy,
    {
      ...y,
      "aria-current": L,
      className: Se,
      ref: g,
      style: He,
      to: h,
      viewTransition: p
    },
    typeof v == "function" ? v(J) : v
  );
});
qb.displayName = "NavLink";
const Yb = z.forwardRef(
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
      defaultShouldRevalidate: D,
      ...N
    },
    U
  ) => {
    let { useTransitions: F } = z.useContext(Rn),
      X = Xb(),
      P = Fb(p, { relative: y }),
      ee = h.toLowerCase() === "get" ? "get" : "post",
      ae = typeof p == "string" && Wu.test(p),
      de = (oe) => {
        if ((v && v(oe), oe.defaultPrevented)) return;
        oe.preventDefault();
        let Oe = oe.nativeEvent.submitter,
          J = Oe?.getAttribute("formmethod") || h,
          L = () =>
            X(Oe || oe.currentTarget, {
              fetcherKey: l,
              method: J,
              navigate: r,
              replace: o,
              state: f,
              relative: y,
              preventScrollReset: g,
              viewTransition: b,
              defaultShouldRevalidate: D
            });
        F && r !== !1 ? z.startTransition(() => L()) : L();
      };
    return z.createElement("form", {
      ref: U,
      method: ee,
      action: P,
      onSubmit: s ? v : de,
      ...N,
      "data-discover": !ae && a === "render" ? "true" : void 0
    });
  }
);
Yb.displayName = "Form";
function Vb(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Ly(a) {
  let l = z.useContext(dl);
  return (Ce(l, Vb(a)), l);
}
function kb(
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
  let g = Q1(),
    b = oa(),
    D = br(a, { relative: h });
  return z.useCallback(
    (N) => {
      if (pb(N, l)) {
        N.preventDefault();
        let U = r !== void 0 ? r : zn(b) === zn(D),
          F = () =>
            g(a, {
              replace: U,
              mask: s,
              state: o,
              preventScrollReset: f,
              relative: h,
              viewTransition: p,
              defaultShouldRevalidate: v
            });
        y ? z.startTransition(() => F()) : F();
      }
    },
    [b, g, D, r, s, o, l, a, f, h, p, v, y]
  );
}
let Gb = 0,
  Qb = () => `__${String(++Gb)}__`;
function Xb() {
  let { router: a } = Ly("useSubmit"),
    { basename: l } = z.useContext(Rn),
    r = nb(),
    s = a.fetch,
    o = a.navigate;
  return z.useCallback(
    async (f, h = {}) => {
      let { action: p, method: v, encType: y, formData: g, body: b } = bb(f, l);
      h.navigate === !1
        ? await s(h.fetcherKey || Qb(), r, h.action || p, {
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
function Fb(a, { relative: l } = {}) {
  let { basename: r } = z.useContext(Rn),
    s = z.useContext(ca);
  Ce(s, "useFormAction must be used inside a RouteContext");
  let [o] = s.matches.slice(-1),
    f = { ...br(a || ".", { relative: l }) },
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
function Zb(a, { relative: l } = {}) {
  let r = z.useContext(af);
  Ce(
    r != null,
    "`useViewTransitionState` must be used within `react-router/dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: s } = Ly("useViewTransitionState"),
    o = br(a, { relative: l });
  if (!r.isTransitioning) return !1;
  let f = Tn(r.currentLocation.pathname, s) || r.currentLocation.pathname,
    h = Tn(r.nextLocation.pathname, s) || r.nextLocation.pathname;
  return Ju(o.pathname, h) != null || Ju(o.pathname, f) != null;
}
const Kb = "hostMetaData";
function Jb(a) {
  let l;
  try {
    l = new URLSearchParams(a);
  } catch {
    return null;
  }
  const r = l.get(Kb);
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
function jy(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function Hy(a) {
  return typeof a.id == "number" && Number.isInteger(a.id) && a.id >= 0;
}
function ff(a) {
  return jy(a) && a.jsonrpc === "2.0";
}
function $b(a) {
  if (!ff(a)) return !1;
  const l = a;
  return !("id" in l) && typeof l.method == "string";
}
function Ib(a) {
  if (!ff(a)) return !1;
  const l = a;
  return Hy(l) && "result" in l && !("error" in l) && !("method" in l);
}
function By(a) {
  if (!ff(a)) return !1;
  const l = a;
  if (!Hy(l) || "result" in l || "method" in l) return !1;
  const r = l.error;
  return jy(r) && typeof r.code == "number";
}
function Wb(a) {
  return Ib(a) || By(a);
}
class Pb {
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
    if (Wb(l)) {
      const r = this.pending.get(l.id);
      if (!r) return;
      (this.pending.delete(l.id),
        this.onInboundMeta(l, l._meta),
        By(l)
          ? r.reject(new Error(l.error.message || "Request failed"))
          : r.resolve(l.result));
      return;
    }
    if ($b(l)) {
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
let e2 = class {
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
const t2 = 500,
  n2 = "2026-01-26";
class sl extends Pb {
  static initPromise = null;
  hostCtx = {};
  _handshakeSucceeded = !1;
  static async getInstance(l) {
    if (!sl.initPromise) {
      const r = l?.targetOrigin ?? "*";
      sl.initPromise = (async () => {
        const s = new sl(new e2(r));
        return (await s.handshake(l), s);
      })();
    }
    return sl.initPromise;
  }
  static resetInstance() {
    sl.initPromise = null;
  }
  async handshake(l) {
    const r = l?.handshakeTimeoutMs ?? t2,
      s = l?.appInfo ?? { name: "mcp-app", version: "1.0.0" };
    try {
      const o = Symbol("timeout"),
        f = await Promise.race([
          this.request("ui/initialize", {
            protocolVersion: n2,
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
let _o = null,
  qy;
async function a2() {
  return typeof window > "u"
    ? "Mosaic"
    : window.openai
      ? "OpenAI"
      : i2()
        ? r2()
          ? "Micro-Frontend"
          : (await sl.getInstance(qy)).handshakeSucceeded
            ? "MCP-Apps"
            : "WebApp"
        : "WebApp";
}
async function l2(a) {
  return (_o || ((qy = a?.mcpApps), (_o = a2())), _o);
}
function i2() {
  if (typeof window > "u") return !1;
  try {
    return window.parent !== window;
  } catch {
    return !0;
  }
}
function r2() {
  if (typeof window > "u") return !1;
  try {
    if (window.parent === window) return !1;
  } catch {
    return !1;
  }
  const a = window.location?.search;
  return typeof a != "string" ? !1 : Jb(a) !== null;
}
async function u2(a) {
  return await l2();
}
const s2 = new Set(["then", "catch", "finally"]);
function c2(a, l) {
  return new Proxy(a, {
    get(r, s, o) {
      if (typeof s == "symbol" || s2.has(s)) {
        const f = Reflect.get(r, s, o);
        return typeof f == "function" ? f.bind(r) : f;
      }
      throw new TypeError(`\`${l}()\` returns a Promise — did you forget to await it?
Use \`const sdk = await ${l}();\` before accessing SDK methods.`);
    }
  });
}
const { freeze: o2, keys: Yy } = Object,
  { isArray: Vy } = Array,
  { stringify: G0 } = JSON,
  f2 = WeakSet;
let d2 = class {
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
  h2 = class {
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
const wn = (a) => new d2(a),
  xn = (a) => new h2(a);
class m2 extends Error {
  constructor(l) {
    (super(l), (this.name = "DataNotFoundError"));
  }
}
function At(a) {
  return df(a)
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
  return df(a)
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
function df(a) {
  return typeof a?.then == "function";
}
function Yo(a) {
  if (
    (a && a.toJSON && typeof a.toJSON == "function" && (a = a.toJSON()),
    a === void 0)
  )
    return;
  if (typeof a == "number") return isFinite(a) ? "" + a : "null";
  if (typeof a != "object") return G0(a);
  let l, r;
  if (Vy(a)) {
    for (r = "[", l = 0; l < a.length; l++)
      (l && (r += ","), (r += Yo(a[l]) || "null"));
    return r + "]";
  }
  if (a === null) return "null";
  const s = Yy(a).sort();
  for (r = "", l = 0; l < s.length; l++) {
    const o = s[l],
      f = Yo(a[o]);
    f && (r && (r += ","), (r += G0(o) + ":" + f));
  }
  return "{" + r + "}";
}
function lr(a) {
  return a instanceof Error
    ? a
    : new Error(typeof a == "string" ? a : JSON.stringify(a));
}
var ky = ((a) => (
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
))(ky || {});
function y2(a) {
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
class p2 extends Error {
  constructor(l, r, s) {
    (super(),
      (this.status = l),
      (this.body = r),
      (this.headers = s || {}),
      (this.ok = l >= 200 && this.status <= 299),
      (this.statusText = y2(l)));
  }
}
const Q0 = new f2();
function ai(a) {
  if (!(typeof a != "object" || a === null || Q0.has(a))) {
    if ((Q0.add(a), Vy(a)))
      for (let l = 0, r = a.length; l < r; l += 1) ai(a[l]);
    else {
      const l = Yy(a);
      for (let r = 0, s = l.length; r < s; r += 1) ai(a[l[r]]);
    }
    o2(a);
  }
}
class Gy extends Error {
  constructor(l) {
    (super(), (this.data = l), (this.type = "user-visible"));
  }
}
function v2(a) {
  return a instanceof Error && "type" in a && a.type === "user-visible";
}
function Qy(a = { request: [], retry: void 0, response: [], finally: [] }, l) {
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
        y = f.reduce((g, b) => g.then((D) => b(D, o)), At(r));
      return Promise.resolve(y)
        .then((g) =>
          h ? h(g, l, o) : l ? l.applyRetry(() => fetch(...g)) : fetch(...g)
        )
        .then((g) => p.reduce((b, D) => b.then((N) => D(N, o)), At(g)))
        .finally(() => {
          if (v.length > 0)
            return v.reduce((g, b) => g.then(() => b(o)), Promise.resolve());
        });
    }
  };
}
function mr(
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
const g2 = 10,
  Xy = 2;
function hf(a) {
  return ns(a, []);
}
function ns(a, l) {
  switch (typeof a) {
    case "string":
      return JSON.stringify(a);
    case "function":
      return a.name ? `[function ${a.name}]` : "[function]";
    case "object":
      return b2(a, l);
    default:
      return String(a);
  }
}
function b2(a, l) {
  if (a === null) return "null";
  if (l.includes(a)) return "[Circular]";
  const r = [...l, a];
  if (E2(a)) {
    const s = a.toJSON();
    if (s !== a) return typeof s == "string" ? s : ns(s, r);
  } else if (Array.isArray(a)) return T2(a, r);
  return S2(a, r);
}
function E2(a) {
  return typeof a.toJSON == "function";
}
function S2(a, l) {
  const r = Object.entries(a);
  return r.length === 0
    ? "{}"
    : l.length > Xy
      ? "[" + R2(a) + "]"
      : "{ " + r.map(([o, f]) => o + ": " + ns(f, l)).join(", ") + " }";
}
function T2(a, l) {
  if (a.length === 0) return "[]";
  if (l.length > Xy) return "[Array]";
  const r = Math.min(g2, a.length),
    s = a.length - r,
    o = [];
  for (let f = 0; f < r; ++f) o.push(ns(a[f], l));
  return (
    s === 1
      ? o.push("... 1 more item")
      : s > 1 && o.push(`... ${s} more items`),
    "[" + o.join(", ") + "]"
  );
}
function R2(a) {
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
const A2 = globalThis.process && !0,
  O2 = A2
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
            const h = hf(l);
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
class Fy {
  constructor(l, r = "GraphQL request", s = { line: 1, column: 1 }) {
    (typeof l == "string" ||
      Fu(!1, `Body must be a string. Received: ${hf(l)}.`),
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
  return O2(a, Fy);
}
function N2(a, l) {
  if (!!!a) throw new Error("Unexpected invariant triggered.");
}
const C2 = /\r\n|[\n\r]/g;
function Vo(a, l) {
  let r = 0,
    s = 1;
  for (const o of a.body.matchAll(C2)) {
    if ((typeof o.index == "number" || N2(!1), o.index >= l)) break;
    ((r = o.index + o[0].length), (s += 1));
  }
  return { line: s, column: l + 1 - r };
}
function _2(a) {
  return Zy(a.source, Vo(a.source, a.start));
}
function Zy(a, l) {
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
    const D = Math.floor(v / 80),
      N = v % 80,
      U = [];
    for (let F = 0; F < b.length; F += 80) U.push(b.slice(F, F + 80));
    return (
      y +
      X0([
        [`${h} |`, U[0]],
        ...U.slice(1, D + 1).map((F) => ["|", F]),
        ["|", "^".padStart(N)],
        ["|", U[D + 1]]
      ])
    );
  }
  return (
    y +
    X0([
      [`${h - 1} |`, g[o - 1]],
      [`${h} |`, b],
      ["|", "^".padStart(v)],
      [`${h + 1} |`, g[o + 1]]
    ])
  );
}
function X0(a) {
  const l = a.filter(([s, o]) => o !== void 0),
    r = Math.max(...l.map(([s]) => s.length));
  return l.map(([s, o]) => s.padStart(r) + (o ? " " + o : "")).join(`
`);
}
var ve;
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
})(ve || (ve = {}));
var V;
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
})(V || (V = {}));
function M2(a) {
  return typeof a == "object" && a !== null;
}
function x2(a) {
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
class mf extends Error {
  constructor(l, ...r) {
    var s, o, f;
    const {
      nodes: h,
      source: p,
      positions: v,
      path: y,
      originalError: g,
      extensions: b
    } = x2(r);
    (super(l),
      (this.name = "GraphQLError"),
      (this.path = y ?? void 0),
      (this.originalError = g ?? void 0),
      (this.nodes = F0(Array.isArray(h) ? h : h ? [h] : void 0)));
    const D = F0(
      (s = this.nodes) === null || s === void 0
        ? void 0
        : s.map((U) => U.loc).filter((U) => U != null)
    );
    ((this.source =
      p ??
      (D == null || (o = D[0]) === null || o === void 0 ? void 0 : o.source)),
      (this.positions = v ?? D?.map((U) => U.start)),
      (this.locations =
        v && p
          ? v.map((U) => Vo(p, U))
          : D?.map((U) => Vo(U.source, U.start))));
    const N = M2(g?.extensions) ? g?.extensions : void 0;
    ((this.extensions =
      (f = b ?? N) !== null && f !== void 0 ? f : Object.create(null)),
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
          ? Error.captureStackTrace(this, mf)
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

` + _2(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        l +=
          `

` + Zy(this.source, r);
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
function F0(a) {
  return a === void 0 || a.length === 0 ? void 0 : a;
}
function Rt(a, l, r) {
  return new mf(`Syntax Error: ${r}`, { source: a, positions: [l] });
}
class w2 {
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
class Ky {
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
const Jy = {
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
  z2 = new Set(Object.keys(Jy));
function Z0(a) {
  const l = a?.kind;
  return typeof l == "string" && z2.has(l);
}
var Pl;
(function (a) {
  ((a.QUERY = "query"),
    (a.MUTATION = "mutation"),
    (a.SUBSCRIPTION = "subscription"));
})(Pl || (Pl = {}));
function ko(a) {
  return a === 9 || a === 32;
}
function yr(a) {
  return a >= 48 && a <= 57;
}
function $y(a) {
  return (a >= 97 && a <= 122) || (a >= 65 && a <= 90);
}
function Iy(a) {
  return $y(a) || a === 95;
}
function U2(a) {
  return $y(a) || yr(a) || a === 95;
}
function L2(a) {
  var l;
  let r = Number.MAX_SAFE_INTEGER,
    s = null,
    o = -1;
  for (let h = 0; h < a.length; ++h) {
    var f;
    const p = a[h],
      v = j2(p);
    v !== p.length &&
      ((s = (f = s) !== null && f !== void 0 ? f : h),
      (o = h),
      h !== 0 && v < r && (r = v));
  }
  return a
    .map((h, p) => (p === 0 ? h : h.slice(r)))
    .slice((l = s) !== null && l !== void 0 ? l : 0, o + 1);
}
function j2(a) {
  let l = 0;
  for (; l < a.length && ko(a.charCodeAt(l));) ++l;
  return l;
}
function H2(a, l) {
  const r = a.replace(/"""/g, '\\"""'),
    s = r.split(/\r\n|[\n\r]/g),
    o = s.length === 1,
    f =
      s.length > 1 &&
      s.slice(1).every((N) => N.length === 0 || ko(N.charCodeAt(0))),
    h = r.endsWith('\\"""'),
    p = a.endsWith('"') && !h,
    v = a.endsWith("\\"),
    y = p || v,
    g = !o || a.length > 70 || y || f || h;
  let b = "";
  const D = o && ko(a.charCodeAt(0));
  return (
    ((g && !D) || f) &&
      (b += `
`),
    (b += r),
    (g || y) &&
      (b += `
`),
    '"""' + b + '"""'
  );
}
class B2 {
  constructor(l) {
    const r = new Ky(V.SOF, 0, 0, 0, 0);
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
    if (l.kind !== V.EOF)
      do
        if (l.next) l = l.next;
        else {
          const r = Y2(this, l.end);
          ((l.next = r), (r.prev = l), (l = r));
        }
      while (l.kind === V.COMMENT);
    return l;
  }
}
function q2(a) {
  return (
    a === V.BANG ||
    a === V.DOLLAR ||
    a === V.AMP ||
    a === V.PAREN_L ||
    a === V.PAREN_R ||
    a === V.SPREAD ||
    a === V.COLON ||
    a === V.EQUALS ||
    a === V.AT ||
    a === V.BRACKET_L ||
    a === V.BRACKET_R ||
    a === V.BRACE_L ||
    a === V.PIPE ||
    a === V.BRACE_R
  );
}
function ii(a) {
  return (a >= 0 && a <= 55295) || (a >= 57344 && a <= 1114111);
}
function as(a, l) {
  return Wy(a.charCodeAt(l)) && Py(a.charCodeAt(l + 1));
}
function Wy(a) {
  return a >= 55296 && a <= 56319;
}
function Py(a) {
  return a >= 56320 && a <= 57343;
}
function ol(a, l) {
  const r = a.source.body.codePointAt(l);
  if (r === void 0) return V.EOF;
  if (r >= 32 && r <= 126) {
    const s = String.fromCodePoint(r);
    return s === '"' ? `'"'` : `"${s}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function vt(a, l, r, s, o) {
  const f = a.line,
    h = 1 + r - a.lineStart;
  return new Ky(l, r, s, f, h, o);
}
function Y2(a, l) {
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
        return V2(a, o);
      case 33:
        return vt(a, V.BANG, o, o + 1);
      case 36:
        return vt(a, V.DOLLAR, o, o + 1);
      case 38:
        return vt(a, V.AMP, o, o + 1);
      case 40:
        return vt(a, V.PAREN_L, o, o + 1);
      case 41:
        return vt(a, V.PAREN_R, o, o + 1);
      case 46:
        if (r.charCodeAt(o + 1) === 46 && r.charCodeAt(o + 2) === 46)
          return vt(a, V.SPREAD, o, o + 3);
        break;
      case 58:
        return vt(a, V.COLON, o, o + 1);
      case 61:
        return vt(a, V.EQUALS, o, o + 1);
      case 64:
        return vt(a, V.AT, o, o + 1);
      case 91:
        return vt(a, V.BRACKET_L, o, o + 1);
      case 93:
        return vt(a, V.BRACKET_R, o, o + 1);
      case 123:
        return vt(a, V.BRACE_L, o, o + 1);
      case 124:
        return vt(a, V.PIPE, o, o + 1);
      case 125:
        return vt(a, V.BRACE_R, o, o + 1);
      case 34:
        return r.charCodeAt(o + 1) === 34 && r.charCodeAt(o + 2) === 34
          ? Z2(a, o)
          : G2(a, o);
    }
    if (yr(f) || f === 45) return k2(a, o, f);
    if (Iy(f)) return K2(a, o);
    throw Rt(
      a.source,
      o,
      f === 39
        ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
        : ii(f) || as(r, o)
          ? `Unexpected character: ${ol(a, o)}.`
          : `Invalid character: ${ol(a, o)}.`
    );
  }
  return vt(a, V.EOF, s, s);
}
function V2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1;
  for (; o < s;) {
    const f = r.charCodeAt(o);
    if (f === 10 || f === 13) break;
    if (ii(f)) ++o;
    else if (as(r, o)) o += 2;
    else break;
  }
  return vt(a, V.COMMENT, l, o, r.slice(l + 1, o));
}
function k2(a, l, r) {
  const s = a.source.body;
  let o = l,
    f = r,
    h = !1;
  if ((f === 45 && (f = s.charCodeAt(++o)), f === 48)) {
    if (((f = s.charCodeAt(++o)), yr(f)))
      throw Rt(
        a.source,
        o,
        `Invalid number, unexpected digit after 0: ${ol(a, o)}.`
      );
  } else ((o = Mo(a, o, f)), (f = s.charCodeAt(o)));
  if (
    (f === 46 &&
      ((h = !0),
      (f = s.charCodeAt(++o)),
      (o = Mo(a, o, f)),
      (f = s.charCodeAt(o))),
    (f === 69 || f === 101) &&
      ((h = !0),
      (f = s.charCodeAt(++o)),
      (f === 43 || f === 45) && (f = s.charCodeAt(++o)),
      (o = Mo(a, o, f)),
      (f = s.charCodeAt(o))),
    f === 46 || Iy(f))
  )
    throw Rt(
      a.source,
      o,
      `Invalid number, expected digit but got: ${ol(a, o)}.`
    );
  return vt(a, h ? V.FLOAT : V.INT, l, o, s.slice(l, o));
}
function Mo(a, l, r) {
  if (!yr(r))
    throw Rt(
      a.source,
      l,
      `Invalid number, expected digit but got: ${ol(a, l)}.`
    );
  const s = a.source.body;
  let o = l + 1;
  for (; yr(s.charCodeAt(o));) ++o;
  return o;
}
function G2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1,
    f = o,
    h = "";
  for (; o < s;) {
    const p = r.charCodeAt(o);
    if (p === 34) return ((h += r.slice(f, o)), vt(a, V.STRING, l, o + 1, h));
    if (p === 92) {
      h += r.slice(f, o);
      const v =
        r.charCodeAt(o + 1) === 117
          ? r.charCodeAt(o + 2) === 123
            ? Q2(a, o)
            : X2(a, o)
          : F2(a, o);
      ((h += v.value), (o += v.size), (f = o));
      continue;
    }
    if (p === 10 || p === 13) break;
    if (ii(p)) ++o;
    else if (as(r, o)) o += 2;
    else throw Rt(a.source, o, `Invalid character within String: ${ol(a, o)}.`);
  }
  throw Rt(a.source, o, "Unterminated string.");
}
function Q2(a, l) {
  const r = a.source.body;
  let s = 0,
    o = 3;
  for (; o < 12;) {
    const f = r.charCodeAt(l + o++);
    if (f === 125) {
      if (o < 5 || !ii(s)) break;
      return { value: String.fromCodePoint(s), size: o };
    }
    if (((s = (s << 4) | ir(f)), s < 0)) break;
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + o)}".`
  );
}
function X2(a, l) {
  const r = a.source.body,
    s = K0(r, l + 2);
  if (ii(s)) return { value: String.fromCodePoint(s), size: 6 };
  if (Wy(s) && r.charCodeAt(l + 6) === 92 && r.charCodeAt(l + 7) === 117) {
    const o = K0(r, l + 8);
    if (Py(o)) return { value: String.fromCodePoint(s, o), size: 12 };
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + 6)}".`
  );
}
function K0(a, l) {
  return (
    (ir(a.charCodeAt(l)) << 12) |
    (ir(a.charCodeAt(l + 1)) << 8) |
    (ir(a.charCodeAt(l + 2)) << 4) |
    ir(a.charCodeAt(l + 3))
  );
}
function ir(a) {
  return a >= 48 && a <= 57
    ? a - 48
    : a >= 65 && a <= 70
      ? a - 55
      : a >= 97 && a <= 102
        ? a - 87
        : -1;
}
function F2(a, l) {
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
function Z2(a, l) {
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
        V.BLOCK_STRING,
        l,
        f + 3,
        L2(v).join(`
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
    else if (as(r, f)) f += 2;
    else throw Rt(a.source, f, `Invalid character within String: ${ol(a, f)}.`);
  }
  throw Rt(a.source, f, "Unterminated string.");
}
function K2(a, l) {
  const r = a.source.body,
    s = r.length;
  let o = l + 1;
  for (; o < s;) {
    const f = r.charCodeAt(o);
    if (U2(f)) ++o;
    else break;
  }
  return vt(a, V.NAME, l, o, r.slice(l, o));
}
var Go;
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
})(Go || (Go = {}));
function J2(a, l) {
  const r = new $2(a, l),
    s = r.parseDocument();
  return (
    Object.defineProperty(s, "tokenCount", {
      enumerable: !1,
      value: r.tokenCount
    }),
    s
  );
}
class $2 {
  constructor(l, r = {}) {
    const s = D2(l) ? l : new Fy(l);
    ((this._lexer = new B2(s)), (this._options = r), (this._tokenCounter = 0));
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  parseName() {
    const l = this.expectToken(V.NAME);
    return this.node(l, { kind: ve.NAME, value: l.value });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: ve.DOCUMENT,
      definitions: this.many(V.SOF, this.parseDefinition, V.EOF)
    });
  }
  parseDefinition() {
    if (this.peek(V.BRACE_L)) return this.parseOperationDefinition();
    const l = this.peekDescription(),
      r = l ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === V.NAME) {
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
    if (this.peek(V.BRACE_L))
      return this.node(l, {
        kind: ve.OPERATION_DEFINITION,
        operation: Pl.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let s;
    return (
      this.peek(V.NAME) && (s = this.parseName()),
      this.node(l, {
        kind: ve.OPERATION_DEFINITION,
        operation: r,
        name: s,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      })
    );
  }
  parseOperationType() {
    const l = this.expectToken(V.NAME);
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
      V.PAREN_L,
      this.parseVariableDefinition,
      V.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: ve.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(V.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(V.EQUALS)
        ? this.parseConstValueLiteral()
        : void 0,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const l = this._lexer.token;
    return (
      this.expectToken(V.DOLLAR),
      this.node(l, { kind: ve.VARIABLE, name: this.parseName() })
    );
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: ve.SELECTION_SET,
      selections: this.many(V.BRACE_L, this.parseSelection, V.BRACE_R)
    });
  }
  parseSelection() {
    return this.peek(V.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const l = this._lexer.token,
      r = this.parseName();
    let s, o;
    return (
      this.expectOptionalToken(V.COLON)
        ? ((s = r), (o = this.parseName()))
        : (o = r),
      this.node(l, {
        kind: ve.FIELD,
        alias: s,
        name: o,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(V.BRACE_L) ? this.parseSelectionSet() : void 0
      })
    );
  }
  parseArguments(l) {
    const r = l ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(V.PAREN_L, r, V.PAREN_R);
  }
  parseArgument(l = !1) {
    const r = this._lexer.token,
      s = this.parseName();
    return (
      this.expectToken(V.COLON),
      this.node(r, {
        kind: ve.ARGUMENT,
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
    this.expectToken(V.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(V.NAME)
      ? this.node(l, {
          kind: ve.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(!1)
        })
      : this.node(l, {
          kind: ve.INLINE_FRAGMENT,
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
            kind: ve.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet()
          })
        : this.node(l, {
            kind: ve.FRAGMENT_DEFINITION,
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
      case V.BRACKET_L:
        return this.parseList(l);
      case V.BRACE_L:
        return this.parseObject(l);
      case V.INT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: ve.INT, value: r.value })
        );
      case V.FLOAT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: ve.FLOAT, value: r.value })
        );
      case V.STRING:
      case V.BLOCK_STRING:
        return this.parseStringLiteral();
      case V.NAME:
        switch ((this.advanceLexer(), r.value)) {
          case "true":
            return this.node(r, { kind: ve.BOOLEAN, value: !0 });
          case "false":
            return this.node(r, { kind: ve.BOOLEAN, value: !1 });
          case "null":
            return this.node(r, { kind: ve.NULL });
          default:
            return this.node(r, { kind: ve.ENUM, value: r.value });
        }
      case V.DOLLAR:
        if (l)
          if ((this.expectToken(V.DOLLAR), this._lexer.token.kind === V.NAME)) {
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
        kind: ve.STRING,
        value: l.value,
        block: l.kind === V.BLOCK_STRING
      })
    );
  }
  parseList(l) {
    const r = () => this.parseValueLiteral(l);
    return this.node(this._lexer.token, {
      kind: ve.LIST,
      values: this.any(V.BRACKET_L, r, V.BRACKET_R)
    });
  }
  parseObject(l) {
    const r = () => this.parseObjectField(l);
    return this.node(this._lexer.token, {
      kind: ve.OBJECT,
      fields: this.any(V.BRACE_L, r, V.BRACE_R)
    });
  }
  parseObjectField(l) {
    const r = this._lexer.token,
      s = this.parseName();
    return (
      this.expectToken(V.COLON),
      this.node(r, {
        kind: ve.OBJECT_FIELD,
        name: s,
        value: this.parseValueLiteral(l)
      })
    );
  }
  parseDirectives(l) {
    const r = [];
    for (; this.peek(V.AT);) r.push(this.parseDirective(l));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(l) {
    const r = this._lexer.token;
    return (
      this.expectToken(V.AT),
      this.node(r, {
        kind: ve.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(l)
      })
    );
  }
  parseTypeReference() {
    const l = this._lexer.token;
    let r;
    if (this.expectOptionalToken(V.BRACKET_L)) {
      const s = this.parseTypeReference();
      (this.expectToken(V.BRACKET_R),
        (r = this.node(l, { kind: ve.LIST_TYPE, type: s })));
    } else r = this.parseNamedType();
    return this.expectOptionalToken(V.BANG)
      ? this.node(l, { kind: ve.NON_NULL_TYPE, type: r })
      : r;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: ve.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(V.STRING) || this.peek(V.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("schema");
    const s = this.parseConstDirectives(),
      o = this.many(V.BRACE_L, this.parseOperationTypeDefinition, V.BRACE_R);
    return this.node(l, {
      kind: ve.SCHEMA_DEFINITION,
      description: r,
      directives: s,
      operationTypes: o
    });
  }
  parseOperationTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseOperationType();
    this.expectToken(V.COLON);
    const s = this.parseNamedType();
    return this.node(l, {
      kind: ve.OPERATION_TYPE_DEFINITION,
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
      kind: ve.SCALAR_TYPE_DEFINITION,
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
      kind: ve.OBJECT_TYPE_DEFINITION,
      description: r,
      name: s,
      interfaces: o,
      directives: f,
      fields: h
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements")
      ? this.delimitedMany(V.AMP, this.parseNamedType)
      : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(V.BRACE_L, this.parseFieldDefinition, V.BRACE_R);
  }
  parseFieldDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseName(),
      o = this.parseArgumentDefs();
    this.expectToken(V.COLON);
    const f = this.parseTypeReference(),
      h = this.parseConstDirectives();
    return this.node(l, {
      kind: ve.FIELD_DEFINITION,
      description: r,
      name: s,
      arguments: o,
      type: f,
      directives: h
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(V.PAREN_L, this.parseInputValueDef, V.PAREN_R);
  }
  parseInputValueDef() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseName();
    this.expectToken(V.COLON);
    const o = this.parseTypeReference();
    let f;
    this.expectOptionalToken(V.EQUALS) && (f = this.parseConstValueLiteral());
    const h = this.parseConstDirectives();
    return this.node(l, {
      kind: ve.INPUT_VALUE_DEFINITION,
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
      kind: ve.INTERFACE_TYPE_DEFINITION,
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
      kind: ve.UNION_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      types: f
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(V.EQUALS)
      ? this.delimitedMany(V.PIPE, this.parseNamedType)
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
      kind: ve.ENUM_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      values: f
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      V.BRACE_L,
      this.parseEnumValueDefinition,
      V.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      s = this.parseEnumValueName(),
      o = this.parseConstDirectives();
    return this.node(l, {
      kind: ve.ENUM_VALUE_DEFINITION,
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
        `${ku(this._lexer.token)} is reserved and cannot be used for an enum value.`
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
      kind: ve.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: s,
      directives: o,
      fields: f
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(V.BRACE_L, this.parseInputValueDef, V.BRACE_R);
  }
  parseTypeSystemExtension() {
    const l = this._lexer.lookahead();
    if (l.kind === V.NAME)
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
        V.BRACE_L,
        this.parseOperationTypeDefinition,
        V.BRACE_R
      );
    if (r.length === 0 && s.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: ve.SCHEMA_EXTENSION,
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
      kind: ve.SCALAR_TYPE_EXTENSION,
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
      kind: ve.OBJECT_TYPE_EXTENSION,
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
      kind: ve.INTERFACE_TYPE_EXTENSION,
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
      kind: ve.UNION_TYPE_EXTENSION,
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
      kind: ve.ENUM_TYPE_EXTENSION,
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
      kind: ve.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: s,
      fields: o
    });
  }
  parseDirectiveDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    (this.expectKeyword("directive"), this.expectToken(V.AT));
    const s = this.parseName(),
      o = this.parseArgumentDefs(),
      f = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const h = this.parseDirectiveLocations();
    return this.node(l, {
      kind: ve.DIRECTIVE_DEFINITION,
      description: r,
      name: s,
      arguments: o,
      repeatable: f,
      locations: h
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(V.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const l = this._lexer.token,
      r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Go, r.value)) return r;
    throw this.unexpected(l);
  }
  node(l, r) {
    return (
      this._options.noLocation !== !0 &&
        (r.loc = new w2(l, this._lexer.lastToken, this._lexer.source)),
      r
    );
  }
  peek(l) {
    return this._lexer.token.kind === l;
  }
  expectToken(l) {
    const r = this._lexer.token;
    if (r.kind === l) return (this.advanceLexer(), r);
    throw Rt(this._lexer.source, r.start, `Expected ${ep(l)}, found ${ku(r)}.`);
  }
  expectOptionalToken(l) {
    return this._lexer.token.kind === l ? (this.advanceLexer(), !0) : !1;
  }
  expectKeyword(l) {
    const r = this._lexer.token;
    if (r.kind === V.NAME && r.value === l) this.advanceLexer();
    else
      throw Rt(this._lexer.source, r.start, `Expected "${l}", found ${ku(r)}.`);
  }
  expectOptionalKeyword(l) {
    const r = this._lexer.token;
    return r.kind === V.NAME && r.value === l ? (this.advanceLexer(), !0) : !1;
  }
  unexpected(l) {
    const r = l ?? this._lexer.token;
    return Rt(this._lexer.source, r.start, `Unexpected ${ku(r)}.`);
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
      r.kind !== V.EOF &&
      (++this._tokenCounter, l !== void 0 && this._tokenCounter > l)
    )
      throw Rt(
        this._lexer.source,
        r.start,
        `Document contains more that ${l} tokens. Parsing aborted.`
      );
  }
}
function ku(a) {
  const l = a.value;
  return ep(a.kind) + (l != null ? ` "${l}"` : "");
}
function ep(a) {
  return q2(a) ? `"${a}"` : a;
}
function I2(a) {
  return `"${a.replace(W2, P2)}"`;
}
const W2 = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function P2(a) {
  return eE[a.charCodeAt(0)];
}
const eE = [
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
  tE = Object.freeze({});
function nE(a, l, r = Jy) {
  const s = new Map();
  for (const P of Object.values(ve)) s.set(P, aE(l, P));
  let o,
    f = Array.isArray(a),
    h = [a],
    p = -1,
    v = [],
    y = a,
    g,
    b;
  const D = [],
    N = [];
  do {
    p++;
    const P = p === h.length,
      ee = P && v.length !== 0;
    if (P) {
      if (
        ((g = N.length === 0 ? void 0 : D[D.length - 1]),
        (y = b),
        (b = N.pop()),
        ee)
      )
        if (f) {
          y = y.slice();
          let de = 0;
          for (const [oe, Oe] of v) {
            const J = oe - de;
            Oe === null ? (y.splice(J, 1), de++) : (y[J] = Oe);
          }
        } else {
          y = { ...y };
          for (const [de, oe] of v) y[de] = oe;
        }
      ((p = o.index),
        (h = o.keys),
        (v = o.edits),
        (f = o.inArray),
        (o = o.prev));
    } else if (b) {
      if (((g = f ? p : h[p]), (y = b[g]), y == null)) continue;
      D.push(g);
    }
    let ae;
    if (!Array.isArray(y)) {
      var U, F;
      Z0(y) || Fu(!1, `Invalid AST Node: ${hf(y)}.`);
      const de = P
        ? (U = s.get(y.kind)) === null || U === void 0
          ? void 0
          : U.leave
        : (F = s.get(y.kind)) === null || F === void 0
          ? void 0
          : F.enter;
      if (((ae = de?.call(l, y, g, b, D, N)), ae === tE)) break;
      if (ae === !1) {
        if (!P) {
          D.pop();
          continue;
        }
      } else if (ae !== void 0 && (v.push([g, ae]), !P))
        if (Z0(ae)) y = ae;
        else {
          D.pop();
          continue;
        }
    }
    if ((ae === void 0 && ee && v.push([g, y]), P)) D.pop();
    else {
      var X;
      ((o = { inArray: f, index: p, keys: h, edits: v, prev: o }),
        (f = Array.isArray(y)),
        (h = f ? y : (X = r[y.kind]) !== null && X !== void 0 ? X : []),
        (p = -1),
        (v = []),
        b && N.push(b),
        (b = y));
    }
  } while (o !== void 0);
  return v.length !== 0 ? v[v.length - 1][1] : a;
}
function aE(a, l) {
  const r = a[l];
  return typeof r == "object"
    ? r
    : typeof r == "function"
      ? { enter: r, leave: void 0 }
      : { enter: a.enter, leave: a.leave };
}
function yf(a) {
  return nE(a, iE);
}
const lE = 80,
  iE = {
    Name: { leave: (a) => a.value },
    Variable: { leave: (a) => "$" + a.name },
    Document: {
      leave: (a) =>
        le(
          a.definitions,
          `

`
        )
    },
    OperationDefinition: {
      leave(a) {
        const l = Le("(", le(a.variableDefinitions, ", "), ")"),
          r = le([a.operation, le([a.name, l]), le(a.directives, " ")], " ");
        return (r === "query" ? "" : r + " ") + a.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable: a, type: l, defaultValue: r, directives: s }) =>
        a + ": " + l + Le(" = ", r) + Le(" ", le(s, " "))
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
        let h = f + Le("(", le(r, ", "), ")");
        return (
          h.length > lE &&
            (h =
              f +
              Le(
                `(
`,
                Zu(
                  le(
                    r,
                    `
`
                  )
                ),
                `
)`
              )),
          le([h, le(s, " "), o], " ")
        );
      }
    },
    Argument: { leave: ({ name: a, value: l }) => a + ": " + l },
    FragmentSpread: {
      leave: ({ name: a, directives: l }) => "..." + a + Le(" ", le(l, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition: a, directives: l, selectionSet: r }) =>
        le(["...", Le("on ", a), le(l, " "), r], " ")
    },
    FragmentDefinition: {
      leave: ({
        name: a,
        typeCondition: l,
        variableDefinitions: r,
        directives: s,
        selectionSet: o
      }) =>
        `fragment ${a}${Le("(", le(r, ", "), ")")} on ${l} ${Le("", le(s, " "), " ")}` +
        o
    },
    IntValue: { leave: ({ value: a }) => a },
    FloatValue: { leave: ({ value: a }) => a },
    StringValue: { leave: ({ value: a, block: l }) => (l ? H2(a) : I2(a)) },
    BooleanValue: { leave: ({ value: a }) => (a ? "true" : "false") },
    NullValue: { leave: () => "null" },
    EnumValue: { leave: ({ value: a }) => a },
    ListValue: { leave: ({ values: a }) => "[" + le(a, ", ") + "]" },
    ObjectValue: { leave: ({ fields: a }) => "{" + le(a, ", ") + "}" },
    ObjectField: { leave: ({ name: a, value: l }) => a + ": " + l },
    Directive: {
      leave: ({ name: a, arguments: l }) => "@" + a + Le("(", le(l, ", "), ")")
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
        ) + le(["schema", le(l, " "), En(r)], " ")
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
        ) + le(["scalar", l, le(r, " ")], " ")
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
        le(["type", l, Le("implements ", le(r, " & ")), le(s, " "), En(o)], " ")
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
        (J0(r)
          ? Le(
              `(
`,
              Zu(
                le(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : Le("(", le(r, ", "), ")")) +
        ": " +
        s +
        Le(" ", le(o, " "))
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
        ) + le([l + ": " + r, Le("= ", s), le(o, " ")], " ")
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
        le(
          ["interface", l, Le("implements ", le(r, " & ")), le(s, " "), En(o)],
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
        ) + le(["union", l, le(r, " "), Le("= ", le(s, " | "))], " ")
    },
    EnumTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, values: s }) =>
        Le(
          "",
          a,
          `
`
        ) + le(["enum", l, le(r, " "), En(s)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description: a, name: l, directives: r }) =>
        Le(
          "",
          a,
          `
`
        ) + le([l, le(r, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, fields: s }) =>
        Le(
          "",
          a,
          `
`
        ) + le(["input", l, le(r, " "), En(s)], " ")
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
        (J0(r)
          ? Le(
              `(
`,
              Zu(
                le(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : Le("(", le(r, ", "), ")")) +
        (s ? " repeatable" : "") +
        " on " +
        le(o, " | ")
    },
    SchemaExtension: {
      leave: ({ directives: a, operationTypes: l }) =>
        le(["extend schema", le(a, " "), En(l)], " ")
    },
    ScalarTypeExtension: {
      leave: ({ name: a, directives: l }) =>
        le(["extend scalar", a, le(l, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: s }) =>
        le(
          [
            "extend type",
            a,
            Le("implements ", le(l, " & ")),
            le(r, " "),
            En(s)
          ],
          " "
        )
    },
    InterfaceTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: s }) =>
        le(
          [
            "extend interface",
            a,
            Le("implements ", le(l, " & ")),
            le(r, " "),
            En(s)
          ],
          " "
        )
    },
    UnionTypeExtension: {
      leave: ({ name: a, directives: l, types: r }) =>
        le(["extend union", a, le(l, " "), Le("= ", le(r, " | "))], " ")
    },
    EnumTypeExtension: {
      leave: ({ name: a, directives: l, values: r }) =>
        le(["extend enum", a, le(l, " "), En(r)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name: a, directives: l, fields: r }) =>
        le(["extend input", a, le(l, " "), En(r)], " ")
    }
  };
function le(a, l = "") {
  var r;
  return (r = a?.filter((s) => s).join(l)) !== null && r !== void 0 ? r : "";
}
function En(a) {
  return Le(
    `{
`,
    Zu(
      le(
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
function Zu(a) {
  return Le(
    "  ",
    a.replace(
      /\n/g,
      `
  `
    )
  );
}
function J0(a) {
  var l;
  return (l = a?.some((r) =>
    r.includes(`
`)
  )) !== null && l !== void 0
    ? l
    : !1;
}
class rE {
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
class uE {}
function sE(a) {
  return { version: "1.0", service: new rE(a), type: "retry" };
}
const { stringify: cE, parse: oE } = JSON;
function pf(a) {
  const l = cE(a);
  return l ? oE(l) : void 0;
}
class Er {
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
    return (s === void 0 && this.missingKeysRead.add(l), r?.copy ? pf(s) : s);
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
    return new Er(this);
  }
  filter(l) {
    return new Sr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Tr(this, l);
  }
}
class Sr {
  constructor(l, r) {
    ((this.baseCache = l), (this.predicate = r));
  }
  delete(l) {
    this.baseCache.delete(l);
  }
  get(l, r) {
    const s = this.baseCache.get(l);
    if (s && this.predicate(l, s)) return r?.copy ? pf(s) : s;
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
    return new Er(this);
  }
  filter(l) {
    return new Sr(this, l);
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
    return new Tr(this, l);
  }
}
class Tr {
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
    return new Er(this);
  }
  filter(l) {
    return new Sr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Tr(this, l);
  }
}
class fE {
  constructor() {
    this.data = {};
  }
  get(l, r) {
    return r?.copy ? pf(this.data[l]) : this.data[l];
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
    return new Er(this);
  }
  filter(l) {
    return new Sr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new Tr(this, l);
  }
}
function dE() {
  return { type: "cache", version: "1.0", service: new fE() };
}
class vf {
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
class hE extends vf {
  execute() {
    const l = this.filteredCache;
    return new Promise(async (r, s) => {
      try {
        let o = wn(void 0);
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
class mE extends vf {
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
            wn(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = this.filteredCache;
        return new Promise(async (f, h) => {
          try {
            let p = wn(void 0);
            for await (const v of this.requestRunner.requestFromNetwork()) {
              if (v) {
                const y = await this.services.cacheInclusionPolicy.write({
                  l1: o,
                  writeToL1: (g) => this.requestRunner.writeToCache(g, v)
                });
                if (y.isErr()) return f(xn(y.error));
              }
              ((p = await this.services.cacheInclusionPolicy.read({
                l1: o,
                readFromL1: (y) => this.requestRunner.readFromCache(y)
              })),
                p.isOk() && f(wn(void 0)));
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
class yE extends vf {
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
            wn(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = new Gy(
          new p2(ky.GatewayTimeout, {
            error: "Cache miss for only-if-cached request"
          })
        );
        return xn(o);
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
class pE {
  constructor(l) {
    this.services = l;
  }
  execute(l, r, s) {
    return this.getCacheControlStrategy(l, r).execute(s);
  }
  getCacheControlStrategy(l, r) {
    if (l.type === "max-age") return new mE(this.services, l, r);
    if (l.type === "no-cache") return new hE(this.services, l, r);
    if (l.type === "only-if-cached") return new yE(this.services, l, r);
    throw new Error(`Unknown cache control strategy ${l.type}`);
  }
  async *find(l) {
    yield* this.services.cacheInclusionPolicy.find(l);
  }
  async *findAndModify(l, r) {
    yield* this.services.cacheInclusionPolicy.findAndModify(l, r);
  }
}
function vE(a, l, r) {
  return {
    type: "cacheController",
    version: "1.0",
    service: new pE({ cache: a, cacheInclusionPolicy: l, instrumentation: r })
  };
}
class gE {}
let bE = class {
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
const xo = (a) => new bE(a);
function ni(a) {
  return tp(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return ni(l(a));
          } catch (s) {
            return l === void 0 ? ni(a) : Qo(s);
          }
        }
      };
}
function Qo(a) {
  return tp(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return ni(r(a));
            } catch (s) {
              return Qo(s);
            }
          return Qo(a);
        }
      };
}
function tp(a) {
  return typeof a?.then == "function";
}
const EE = (a) => "$and" in a,
  SE = (a) => "$or" in a,
  TE = (a) => "$not" in a,
  RE = (a, l) => {
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
function Ku(a) {
  return (l, r) => {
    if (!a) return !1;
    if (EE(a)) return a.$and.every((s) => Ku(s)(l, r));
    if (SE(a)) return a.$or.some((s) => Ku(s)(l, r));
    if (TE(a)) return !Ku(a.$not)(l, r);
    if ("key" in a) return AE(a.key, l);
    if ("metadata" in a) return RE(a.metadata, r.metadata.cacheControl);
    if ("value" in a) return !1;
    throw new Error("Unknown Query Operation");
  };
}
function AE(a, l) {
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
class NE extends gE {
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
      s = Ku(l),
      o = r.filter(s).entries();
    for (const f of o) yield f;
  }
  async *findAndModify(l, r) {
    const s = this.services.cache;
    for await (const [o, f] of this.find(l)) {
      const h = OE(r, f);
      switch (h.type) {
        case "entry":
          (this.write({ l1: s, writeToL1: (p) => ni(xo(p.set(o, h.entry))) }),
            yield o);
          break;
        case "metadata":
          (this.write({
            l1: s,
            writeToL1: (p) => ni(xo(p.setMetadata(o, h.metadata)))
          }),
            yield o);
          break;
        case "delete":
          (this.write({ l1: s, writeToL1: (p) => ni(xo(p.delete(o))) }),
            yield o);
          break;
      }
    }
  }
}
function CE(a) {
  return {
    service: new NE({ cache: a }),
    type: "cacheInclusionPolicy",
    version: "1.0"
  };
}
const _E = Symbol("EventTypeWildcard");
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
        df(f) && r.push(f);
      }),
      r.length > 0 ? Promise.all(r).then(() => {}) : At(void 0)
    );
  }
  getSubscriptions(l) {
    const r = this.subscriptions.get(l.type),
      s = this.subscriptions.get(_E);
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
function xE() {
  return { type: "pubSub", version: "1.0", service: new ME() };
}
class wE {}
const { isArray: $0 } = Array;
class zE {
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
class UE {
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
const ei = (a) => new zE(a),
  or = (a) => new UE(a);
function ul(a, l, r) {
  return a.isOk()
    ? ei({ data: a.value, subscribe: l, refresh: r })
    : or({ failure: a.error, subscribe: l, refresh: r });
}
function $u(a) {
  return np(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return $u(l(a));
          } catch (s) {
            return l === void 0 ? $u(a) : Xo(s);
          }
        }
      };
}
function Xo(a) {
  return np(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return $u(r(a));
            } catch (s) {
              return Xo(s);
            }
          return Xo(a);
        }
      };
}
function np(a) {
  return typeof a?.then == "function";
}
function Fo(a, l) {
  if (a === void 0) return l === void 0;
  if (a === null) return l === null;
  if (l === null) return a === null;
  if ($0(a)) {
    if (!$0(l) || a.length !== l.length) return !1;
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
function wo(a, l) {
  if (a.size > l.size) {
    for (const r of l.keys()) if (a.has(r)) return !0;
  } else for (const r of a) if (l.has(r)) return !0;
  return !1;
}
class LE {
  constructor(l, r, s) {
    ((this.readFromCacheInternal = l),
      (this.requestFromNetworkInternal = r),
      (this.writeToCacheInternal = s));
  }
  readFromCache(l) {
    return this.readFromCacheInternal(l).then((s) =>
      s.isErr() ? or(s.error.failure) : ((this.returnData = s), ei(void 0))
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
class jE extends wE {
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
    const r = HE(this.cacheControlStrategyConfig, l),
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
                  or(new Error("Cache miss after fetching from network")),
                  this.buildSubscribe(),
                  () => this.refresh()
                )
            : (this.subscriptions.length > 0 && this.subscribe(), f)
    );
  }
  buildRequestRunner() {
    return new LE(
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
      : $u(void 0);
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
        predicate: (f) => wo(f.data, this.keysUsed),
        callback: () =>
          this.rerun({ now: this.instantiationTime }).then(() => {}),
        keys: this.keysUsed
      }),
      s = l.subscribe({
        type: "cacheInvalidation",
        predicate: (f) => wo(f.data, this.keysUsed),
        callback: () => this.rerun().then(() => {}),
        keys: this.keysUsed
      }),
      o = l.subscribe({
        type: "cacheEviction",
        predicate: (f) => wo(f.data, this.keysUsed),
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
      l.isErr() ? or(l.error.failure) : ei(void 0)
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
              this.invokeConsumerCallbacks(or(r.error.failure)),
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
function HE(a, l) {
  if (!l) return a;
  const r = l.now ?? a.now;
  return l.cacheControlConfig
    ? { ...l.cacheControlConfig, now: r }
    : { ...a, now: r };
}
class BE extends jE {
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
      return At(xn(lr(l)));
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
    return lr(l.statusText);
  }
  processFetchReturnValue(l) {
    return wn(l);
  }
  convertFetchResponseToData(l) {
    return l.then(
      (r) => {
        if (r.ok) {
          let s;
          return (
            this.isSemanticNullResponse(r)
              ? (s = Promise.resolve(wn(null)))
              : this.isUndeclaredNoBodyResponse(r)
                ? (s = Promise.resolve(
                    xn(
                      lr(
                        `Unexpected ${r.status} response: no-content status was not declared in the API specification. Declare this response in your OAS without a content property.`
                      )
                    )
                  ))
                : (s = r.json().then(
                    (o) => this.processFetchReturnValue(o),
                    (o) => xn(lr(o))
                  )),
            s.finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            })
          );
        } else
          return this.coerceError(r)
            .then((s) => xn(s))
            .finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            });
      },
      (r) => xn(lr(r))
    );
  }
}
function qE(a) {
  return (l) => {
    const [r, s] = l;
    if (typeof r == "string" && !r.startsWith("http")) {
      const o = r.startsWith("/") ? r : `/${r}`;
      return At([`${a}${o}`, s]);
    }
    return At(l);
  };
}
function YE(a) {
  return (l) => At(mr("Authorization", `Bearer ${a}`, l));
}
function VE(a, l) {
  const r = [];
  return (a && r.push(qE(a)), l && r.push(YE(l)), Qy({ request: r }).service);
}
const kE = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Chatter-Entity-Encoding": "false"
};
function GE(a) {
  if (a instanceof Headers) {
    const l = [];
    return (a.forEach((r, s) => l.push([s, r])), l);
  }
  return Array.isArray(a) ? a.map(([l, r]) => [l, r]) : Object.entries(a);
}
function ap(a, l) {
  if (l === void 0) return { ...a };
  const r = { ...a },
    s = new Map();
  for (const f of Object.keys(r)) s.set(f.toLowerCase(), f);
  const o = new Set();
  for (const [f, h] of GE(l)) {
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
function lp(a) {
  return ap(kE, a);
}
function QE(a) {
  if (a === void 0) return;
  const l = {};
  return (
    new Headers(a).forEach((r, s) => {
      l[s] = r;
    }),
    Object.keys(l).length > 0 ? l : void 0
  );
}
const XE = 512;
function FE(a) {
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
class I0 extends Error {
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
          : ` (starts with: ${JSON.stringify(FE(l.body.slice(0, XE)))})`;
    (super(
      `${l.surface} GraphQL request to ${l.url} returned HTTP ${l.status} with an ${r}${s}. Expected a JSON GraphQL response; the transport (proxy/gateway/auth) likely did not return one.`
    ),
      (this.name = "GraphQLTransportError"),
      (this.status = l.status),
      (this.url = l.url),
      (this.cause = l.cause));
  }
}
async function ip(a, l, r) {
  const s = await a.text();
  let o;
  try {
    o = JSON.parse(s);
  } catch (f) {
    throw new I0({ surface: l, url: r, status: a.status, body: s, cause: f });
  }
  if (o === null || typeof o != "object")
    throw new I0({
      surface: l,
      url: r,
      status: a.status,
      body: s,
      cause: new Error("Parsed GraphQL response body was not a JSON object")
    });
  return o;
}
const Iu = () => {},
  Zo = async () => {};
function gf(a) {
  try {
    return wn(J2(a));
  } catch (l) {
    return xn(fl(l));
  }
}
function bf(a, l) {
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
async function rp(
  a,
  { mutation: l, variables: r, operationName: s, headers: o }
) {
  const f = gf(l);
  if (f.isErr()) return { data: void 0, errors: f.error };
  const h = f.value,
    p = bf(h, s);
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
      query: yf(h),
      variables: r,
      operationName: s,
      headers: o
    });
    return { data: v.data ?? void 0, errors: v.errors };
  } catch (v) {
    return { data: void 0, errors: fl(v) };
  }
}
function up(a) {
  function l(s, o, f, h) {
    return a({ query: yf(s), variables: o, operationName: f, headers: h }).then(
      (p) => ({ data: p.data ?? void 0, errors: p.errors }),
      (p) => ({ data: void 0, errors: fl(p) })
    );
  }
  async function r({ query: s, variables: o, operationName: f, headers: h }) {
    const p = gf(s);
    if (p.isErr())
      return {
        data: void 0,
        errors: p.error,
        subscribe: () => Iu,
        refresh: Zo
      };
    const v = p.value,
      y = bf(v, f);
    if (y !== "query")
      return {
        data: void 0,
        errors: [
          {
            message: `DataSDK.graphql.query() requires a GraphQL query, received ${y}.`
          }
        ],
        subscribe: () => Iu,
        refresh: Zo
      };
    const g = new Set(),
      b = o,
      D = await l(v, b, f, h);
    return {
      data: D.data,
      errors: D.errors,
      subscribe(N) {
        return (
          g.add(N),
          () => {
            g.delete(N);
          }
        );
      },
      async refresh() {
        const N = await l(v, b, f, h);
        for (const U of g) U(N);
      }
    };
  }
  return { query: r, mutate: (s) => rp(a, s) };
}
const ZE = "67.0";
function sp(a = ZE) {
  return `/services/data/v${a}`;
}
const KE = { "Content-Type": "application/json", Accept: "application/json" };
class JE {
  clientFetch;
  pathData;
  graphql;
  constructor(l) {
    const r = $E(),
      s = IE(l?.instanceUrl ?? r.instanceUrl),
      o = l?.accessToken ?? r.accessToken;
    ((this.pathData = sp(l?.apiVersion ?? r.apiVersion)),
      (this.clientFetch = VE(s || void 0, o)),
      (this.graphql = up(this.executeRawGraphQL.bind(this))));
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
        headers: ap(KE, o)
      });
    return ip(h, "Mosaic", f);
  }
}
function $E() {
  const a = globalThis.MOSAIC_ENV;
  return {
    instanceUrl: a?.instanceUrl,
    accessToken: a?.accessToken,
    apiVersion: a?.apiVersion
  };
}
function IE(a) {
  if (!a || a === "/") return "";
  let l = a;
  return (
    !l.startsWith("/") && !l.startsWith("http") && (l = `/${l}`),
    l.endsWith("/") && (l = l.slice(0, -1)),
    l
  );
}
const WE = "graphqlQuery";
class PE {
  graphql;
  constructor() {
    this.graphql = up(this.executeRawGraphQL.bind(this));
  }
  async executeRawGraphQL({ query: l, variables: r, operationName: s }) {
    return (
      await window.openai.callTool(WE, {
        query: l,
        ...(r != null ? { variables: r } : {}),
        ...(s != null ? { operationName: s } : {})
      })
    ).structuredContent;
  }
}
const zo = "Accept-Language",
  eS = (a) => {
    const l = globalThis.SFDC_ENV?.language;
    if (!l) return At(a);
    const [r, s] = a;
    return (
      r instanceof Request && !s?.headers
        ? r.headers.has(zo)
        : new Headers(s?.headers).has(zo)
    )
      ? At(a)
      : At(mr(zo, l, a));
  },
  tS = "X-SFDC-Client-Name",
  nS = "X-SFDC-Client-Version",
  aS = "@salesforce/platform-sdk",
  lS = "11.68.0",
  iS = (a) => {
    let l = mr(tS, aS, a);
    return ((l = mr(nS, lS, l)), At(l));
  },
  rS = "X-CSRF-Token";
function uS(a, l = {}) {
  const { protectedUrls: r = [], alwaysProtectedUrls: s = [] } = l;
  return async (o) => {
    const [f, h] = o,
      p = f instanceof Request ? f.url : f instanceof URL ? f.href : f,
      v = h?.method ?? (f instanceof Request ? f.method : void 0) ?? "GET";
    if (W0(s, p) || (sS(v) && W0(r, p))) {
      const y = await a.getToken();
      o = mr(rS, y, o);
    }
    return At(o);
  };
}
function sS(a) {
  const l = a.toLowerCase();
  return l === "post" || l === "put" || l === "patch" || l === "delete";
}
function W0(a, l) {
  const r = new URL(l, globalThis.location?.href ?? "http://localhost");
  return a.some((s) => r.pathname.includes(s));
}
function cS(a, l = {}) {
  const r = uS(a, l);
  async function s(o) {
    const f = await r(o);
    return fetch(f[0], f[1]);
  }
  return (o, f) => (f ? f.applyRetry(async () => s(o)) : s(o));
}
const oS = [400, 401, 403];
class fS extends uE {
  constructor(l) {
    (super(l), (this.csrfTokenManager = l));
  }
  async shouldRetry(l, r) {
    return r.attempt >= 1 ? !1 : oS.includes(l.status);
  }
  async calculateDelay(l, r) {
    return 0;
  }
  async prepareRetry(l, r) {
    await this.csrfTokenManager.refreshToken();
  }
}
class dS {
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
const P0 = new Map();
function hS(a) {
  const { endpoint: l, cacheName: r, ...s } = a.csrf;
  let o = P0.get(l);
  return (
    o || ((o = new dS(l, r)), P0.set(l, o)),
    Qy({ retry: cS(o, s), request: [iS, eS] }, sE(new fS(o)).service).service
  );
}
const ey = new Map();
function mS(a) {
  let l = ey.get(a);
  if (!l) {
    const r = dE().service,
      s = CE(r).service,
      o = vE(r, s).service,
      f = xE().service;
    ((l = { cache: r, cacheController: o, pubSub: f }), ey.set(a, l));
  }
  return l;
}
function yS(a, l) {
  const r = mS(a);
  return {
    shared: r,
    services: { cacheController: r.cacheController, pubSub: r.pubSub, fetch: l }
  };
}
const ty = 300;
function pS(a, l) {
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
function vS(a) {
  if (typeof a == "object" && a.type === "max-age") {
    const l = a.maxAge;
    return Number.isFinite(l) && l >= 0 ? l : ty;
  }
  return ty;
}
class gS extends BE {
  constructor(l, r, s) {
    (super(r),
      (this.url = s),
      (this.query = l.query),
      (this.normalizedOperationName = l.operationName ?? ""),
      (this.normalizedVariables = pS(
        l.variables ?? {},
        this.normalizedOperationName
      )),
      (this.cacheControl = l.cacheControl),
      (this.resolvedMaxAge = vS(l.cacheControl)),
      (this.headers = l.headers),
      (this.headersKey = QE(l.headers)));
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
        headers: lp(this.headers),
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
    return At(s === void 0 ? xn(new m2()) : wn(s));
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
    return this.responseHasErrors(l) ? xn(new Gy(l)) : wn(l);
  }
}
function cp(a) {
  if (v2(a) && a.data && typeof a.data == "object") {
    const l = a.data;
    if (l.data != null) return l.data;
  }
}
function bS(a) {
  return (l) => {
    if (l.isOk()) {
      const r = l.value;
      (ai(r), a({ data: r, errors: void 0 }));
    } else {
      const r = cp(l.error);
      (r && ai(r), a({ data: r, errors: fl(l.error) }));
    }
  };
}
async function ES(a) {
  let l, r, s;
  try {
    const o = await a.execute();
    o.isOk()
      ? ((l = o.value.data), ai(l), (s = (f) => o.value.subscribe(f)))
      : ((l = cp(o.error.failure)),
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
      return s ? s(bS(o)) : Iu;
    },
    async refresh() {
      await a.refresh();
    }
  };
}
function Uo(a) {
  return { data: void 0, errors: a, subscribe: () => Iu, refresh: Zo };
}
function SS({ bundle: a, url: l, executeRaw: r }) {
  const { services: s } = a;
  async function o({
    query: f,
    variables: h,
    operationName: p,
    cacheControl: v,
    headers: y
  }) {
    const g = gf(f);
    if (g.isErr()) return Uo(g.error);
    const b = g.value,
      D = bf(b, p);
    if (D !== "query")
      return Uo([
        {
          message: `DataSDK.graphql.query() requires a GraphQL query, received ${D}.`
        }
      ]);
    let N;
    try {
      N = new gS(
        {
          query: yf(b),
          variables: h,
          operationName: p,
          cacheControl: v,
          headers: y
        },
        s,
        l
      );
    } catch (U) {
      return Uo(fl(U));
    }
    return ES(N);
  }
  return { query: o, mutate: (f) => rp(r, f) };
}
const TS = 1,
  RS = `@salesforce/platform-sdk-data_v${TS}`;
class AS {
  baseUrl;
  pathData;
  clientFetch;
  onStatus;
  graphql;
  constructor(l) {
    const r = OS();
    ((this.baseUrl = DS(l?.basePath ?? r.apiPath)),
      (this.pathData = sp(l?.apiVersion)));
    const s = `${this.pathData}/ui-api`,
      o = `${this.pathData}/graphql`;
    ((this.onStatus = l?.onStatus ?? {}),
      (this.clientFetch = hS({
        csrf: {
          endpoint: `${this.baseUrl}${s}/session/csrf`,
          cacheName: RS,
          protectedUrls: ["services/data/v", "services/apexrest"],
          alwaysProtectedUrls: ["services/apexrest"]
        }
      })));
    const f = (p, v) => this.fetch(p, v),
      h = yS(`${this.baseUrl}${this.pathData}`, f);
    this.graphql = SS({
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
        headers: lp(o)
      });
    return ip(h, "WebApp", f);
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
function NS(a) {
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
async function CS(a, l) {
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
    const { extension: f, mountName: h } = NS(o),
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
async function _S(a) {
  try {
    switch (await u2(a?.surface)) {
      case Wl.OpenAI:
        return new PE();
      case Wl.WebApp:
      case Wl.MicroFrontend:
        return new AS(a?.webapp);
      case Wl.Mosaic:
        return new JE(a?.mosaic);
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
  return c2(
    (async () => {
      const l = await _S(a);
      return CS(l, []);
    })(),
    "createDataSDK"
  );
}
const xS = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  wS = (a) =>
    a.replace(/^([A-Z])|[\s-_]+(\w)/g, (l, r, s) =>
      s ? s.toUpperCase() : r.toLowerCase()
    ),
  ny = (a) => {
    const l = wS(a);
    return l.charAt(0).toUpperCase() + l.slice(1);
  },
  op = (...a) =>
    a
      .filter((l, r, s) => !!l && l.trim() !== "" && s.indexOf(l) === r)
      .join(" ")
      .trim(),
  zS = (a) => {
    for (const l in a)
      if (l.startsWith("aria-") || l === "role" || l === "title") return !0;
  };
var US = {
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
const LS = z.forwardRef(
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
        ...US,
        width: l,
        height: l,
        stroke: a,
        strokeWidth: s ? (Number(r) * 24) / Number(l) : r,
        className: op("lucide", o),
        ...(!f && !zS(p) && { "aria-hidden": "true" }),
        ...p
      },
      [
        ...h.map(([y, g]) => z.createElement(y, g)),
        ...(Array.isArray(f) ? f : [f])
      ]
    )
);
const fp = (a, l) => {
  const r = z.forwardRef(({ className: s, ...o }, f) =>
    z.createElement(LS, {
      ref: f,
      iconNode: l,
      className: op(`lucide-${xS(ny(a))}`, `lucide-${a}`, s),
      ...o
    })
  );
  return ((r.displayName = ny(a)), r);
};
const jS = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ],
  HS = fp("search", jS);
const BS = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ],
  qS = fp("x", BS),
  YS =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='97'%20height='40'%20viewBox='0%200%2097%2040'%3e%3cg%20fill='%23FFFFFE'%20fill-rule='evenodd'%3e%3cpath%20d='M57.094%2033.402c-.583-1.024-.948-2.177-1.115-3.525a.681.681%200%200%200-.805-.586%203.914%203.914%200%200%201-.746.074c-.785%200-1.385-.132-1.385-1.796v-1.594h-.005V3.594a.621.621%200%200%200-.62-.623h-4.509a.622.622%200%200%200-.62.623v24.515c0%201.836.168%203.223%201.008%204.462%201.028%201.419%203.076%202.242%204.958%202.242l.292-.002h.002c1.144%200%202.259-.104%203.178-.425a.682.682%200%200%200%20.367-.983M69.33%2032.614c-.831-1.216-1.09-1.426-1.65-2.737-.075-.174-.123-.357-.276-.468a.673.673%200%200%200-.528-.118%203.926%203.926%200%200%201-.747.074c-.785%200-1.386-.132-1.386-1.796v-1.594h-.004V3.594a.622.622%200%200%200-.62-.623h-4.51a.621.621%200%200%200-.62.623v24.515c0%201.836.169%203.223%201.01%204.462%201.027%201.419%203.075%202.242%204.956%202.242l.292-.002h.004c1.142%200%202.257-.104%203.177-.425.191-.066.874-.415%201.015-.56.441-.455.001-1.044-.113-1.21M28.338%2020.117c.47-2.588%202.465-4.224%205.24-4.224%202.8%200%204.698%201.565%205.19%204.224h-10.43zm5.198-9.13c-3.421%200-6.328%201.208-8.405%203.494-1.958%202.153-3.036%205.18-3.036%208.521%200%203.392%201.068%206.301%203.088%208.416%202.122%202.22%205.167%203.394%208.804%203.394%203.928%200%207.223-1.38%209.795-4.102.235-.248.245-.703-.02-.878-.268-.174-1.607-1.087-2.952-2.838-.159-.11-.27-.173-.429-.173h-.018a.62.62%200%200%200-.437.199c-1.545%201.67-3.527%202.351-5.814%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.622.622%200%200%200%20.617-.554c.056-.507.085-1.071.085-1.631%200-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.829-3.297-8.143-3.297zM75.177%2020.117c.47-2.588%202.465-4.224%205.238-4.224%202.8%200%204.7%201.565%205.192%204.224h-10.43zm5.197-9.13c-3.42%200-6.328%201.208-8.404%203.494-1.959%202.153-3.037%205.18-3.037%208.521%200%203.392%201.068%206.301%203.088%208.416%202.123%202.22%205.167%203.394%208.804%203.394%203.929%200%207.224-1.38%209.796-4.102.235-.248.245-.703-.021-.878-.267-.174-1.607-1.087-2.951-2.838-.16-.11-.27-.173-.43-.173h-.018a.621.621%200%200%200-.436.199c-1.545%201.67-3.528%202.351-5.815%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.621.621%200%200%200%20.617-.554%2015.04%2015.04%200%200%200%20.086-1.631c0-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.83-3.297-8.144-3.297z'%20/%3e%3cpath%20d='M23.203%2033.259l-.067-.066c-.017-.017-.035-.033-.052-.052a13.04%2013.04%200%200%201-2.545-3.887.62.62%200%200%200-.57-.377H8.142l14.464-18.57a.626.626%200%200%200%20.13-.384V6.305a.622.622%200%200%200-.62-.624h-7.801V.491a.311.311%200%200%200-.31-.31H9.21a.31.31%200%200%200-.31.31v5.19H1.254a.622.622%200%200%200-.62.624V10.5c0%20.343.277.622.62.622H14.53L.152%2029.527a.625.625%200%200%200-.132.385v3.783c0%20.344.278.623.62.623h8.264v5.19a.31.31%200%200%200%20.31.311h4.796a.31.31%200%200%200%20.31-.311v-5.19h8.44a.624.624%200%200%200%20.442-1.06M93.501%208.179h.525c.104%200%20.205-.003.304-.01a.836.836%200%200%200%20.267-.061.415.415%200%200%200%20.184-.15.511.511%200%200%200%20.068-.284.472.472%200%200%200-.06-.253.388.388%200%200%200-.16-.146.654.654%200%200%200-.223-.064%202.15%202.15%200%200%200-.245-.014h-.66v.982zm-.425-1.366h1.12c.369%200%20.64.07.816.21.175.14.262.364.262.672%200%20.275-.078.477-.234.605a1.056%201.056%200%200%201-.574.228l.879%201.352h-.461l-.837-1.317h-.546V9.88h-.425V6.813zm-1.249%201.53a2.236%202.236%200%200%200%20.653%201.597c.203.202.44.361.709.477.27.116.56.174.873.174.311%200%20.602-.058.872-.174a2.236%202.236%200%200%200%201.188-1.203%202.32%202.32%200%200%200%20.173-.9c0-.318-.058-.614-.173-.89a2.21%202.21%200%200%200-1.188-1.188c-.27-.113-.56-.17-.872-.17-.313%200-.604.058-.873.174a2.28%202.28%200%200%200-.709.477%202.168%202.168%200%200%200-.479.718c-.116.278-.174.58-.174.908zm-.425%200c0-.38.07-.732.212-1.057a2.67%202.67%200%200%201%20.575-.844c.242-.237.523-.423.844-.558a2.628%202.628%200%200%201%201.029-.203%202.69%202.69%200%200%201%201.872.758c.241.235.433.512.574.833.142.32.213.668.213%201.042a2.645%202.645%200%200%201-.787%201.9%202.658%202.658%200%200%201-1.872.762c-.364%200-.708-.068-1.029-.203a2.645%202.645%200%200%201-1.419-1.388%202.54%202.54%200%200%201-.212-1.042z'%20/%3e%3c/g%3e%3c/svg%3e",
  VS = `
query FinancialInstitutions {
  uiapi {
    query {
      Account(
        first: 200
        where: {
          and: [
            { Publicly_Listed__c: { eq: true } }
            { Institution_Status__c: { eq: "Active" } }
          ]
        }
        orderBy: { Name: { order: ASC } }
      ) {
        edges {
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
      }
    }
  }
}
`,
  kS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"];
function GS(a) {
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
function dp(a) {
  const l = a.trim()[0]?.toUpperCase();
  return l && /[A-Z]/.test(l) ? l : "#";
}
function QS(a) {
  return a.reduce((l, r) => {
    const s = dp(r.name);
    return ((l[s] = l[s] || []), l[s].push(r), l);
  }, {});
}
function XS(a, l, r) {
  const s = l.trim().toLowerCase();
  return a.filter((o) => {
    const f = r === "All" || dp(o.name) === r,
      h =
        s.length === 0 ||
        [o.name, o.keywords, o.city].join(" ").toLowerCase().includes(s);
    return f && h;
  });
}
function FS({ institution: a }) {
  const l = a.enrollmentUrl || a.website;
  return l
    ? Ne.jsx("a", {
        className: "institution-name",
        href: l,
        target: "_blank",
        rel: "noreferrer",
        children: a.name
      })
    : Ne.jsx("span", { className: "institution-name", children: a.name });
}
function ZS({ institutions: a }) {
  const l = QS(a),
    r = Object.keys(l).sort();
  return Ne.jsx("div", {
    className: "results-list",
    children: r.map((s) =>
      Ne.jsxs(
        "section",
        {
          className: "letter-section",
          "aria-labelledby": `letter-${s}`,
          children: [
            Ne.jsx("h2", { id: `letter-${s}`, children: s }),
            Ne.jsx("div", {
              className: "letter-results",
              children: l[s].map((o) => Ne.jsx(FS, { institution: o }, o.id))
            })
          ]
        },
        s
      )
    )
  });
}
function KS() {
  const [a, l] = z.useState([]),
    [r, s] = z.useState(""),
    [o, f] = z.useState("All"),
    [h, p] = z.useState(!0),
    [v, y] = z.useState("");
  z.useEffect(() => {
    let b = !0;
    async function D() {
      (p(!0), y(""));
      try {
        const U = await (
          await MS()
        ).graphql?.query({ query: VS, variables: {} });
        if (U?.errors?.length)
          throw new Error(U.errors.map((X) => X.message).join("; "));
        const F =
          U?.data?.uiapi.query.Account.edges.map((X) => GS(X.node)) || [];
        b && l(F);
      } catch (N) {
        b && y(N instanceof Error ? N.message : "Unable to load institutions.");
      } finally {
        b && p(!1);
      }
    }
    return (
      D(),
      () => {
        b = !1;
      }
    );
  }, []);
  const g = z.useMemo(() => XS(a, r, o), [a, r, o]);
  return Ne.jsxs("main", {
    className: "app-shell",
    children: [
      Ne.jsx("header", {
        className: "brand-header",
        children: Ne.jsx("div", {
          className: "brand-inner",
          children: Ne.jsxs("div", {
            className: "zelle-lockup",
            "aria-label": "Zelle Find Your Bank",
            children: [
              Ne.jsx("img", {
                className: "zelle-wordmark",
                src: YS,
                alt: "Zelle"
              }),
              Ne.jsx("span", {
                className: "lockup-divider",
                "aria-hidden": "true"
              }),
              Ne.jsx("span", {
                className: "lockup-title",
                children: "Find Your Bank"
              })
            ]
          })
        })
      }),
      Ne.jsx("section", {
        className: "search-hero",
        "aria-label": "Institution search",
        children: Ne.jsx("div", {
          className: "search-inner",
          children: Ne.jsxs("label", {
            className: "search-box",
            children: [
              Ne.jsx(HS, { size: 42, strokeWidth: 1.5, "aria-hidden": "true" }),
              Ne.jsx("input", {
                value: r,
                onChange: (b) => {
                  (s(b.target.value), f("All"));
                },
                placeholder: "Search",
                "aria-label": "Search by institution name or city"
              }),
              r &&
                Ne.jsx("button", {
                  className: "clear-button",
                  type: "button",
                  onClick: () => s(""),
                  "aria-label": "Clear search",
                  children: Ne.jsx(qS, { size: 22 })
                })
            ]
          })
        })
      }),
      Ne.jsx("nav", {
        className: "alphabet-band",
        "aria-label": "Filter by first letter",
        children: Ne.jsx("div", {
          className: "alphabet-filter",
          children: kS.map((b) =>
            Ne.jsx(
              "button",
              {
                type: "button",
                className: o === b ? "active" : "",
                onClick: () => f(o === b ? "All" : b),
                children: b
              },
              b
            )
          )
        })
      }),
      Ne.jsxs("section", {
        className: "results-summary",
        "aria-live": "polite",
        children: [
          Ne.jsx("strong", { children: g.length }),
          Ne.jsx("span", {
            children: g.length === 1 ? " institution" : " institutions"
          })
        ]
      }),
      h &&
        Ne.jsx("div", {
          className: "state-panel",
          children: "Loading institutions..."
        }),
      !h &&
        v &&
        Ne.jsxs("div", {
          className: "state-panel error",
          children: [
            Ne.jsx("strong", { children: "Could not load institutions." }),
            Ne.jsx("p", { children: v })
          ]
        }),
      !h &&
        !v &&
        g.length === 0 &&
        Ne.jsx("div", {
          className: "state-panel",
          children: "No matching institutions found."
        }),
      !h && !v && g.length > 0 && Ne.jsx(ZS, { institutions: g })
    ]
  });
}
function JS() {
  return Ne.jsx("main", {
    className: "app-shell",
    children: Ne.jsx("h1", { children: "Page not found" })
  });
}
const ay = globalThis.SFDC_ENV?.basePath,
  $S = typeof ay == "string" ? ay.replace(/\/+$/, "") : void 0,
  IS = jb(
    [
      { path: "/", element: Ne.jsx(KS, {}) },
      { path: "*", element: Ne.jsx(JS, {}) }
    ],
    { basename: $S }
  );
Ng.createRoot(document.getElementById("root")).render(
  Ne.jsx(z.StrictMode, { children: Ne.jsx(sb, { router: IS }) })
);
