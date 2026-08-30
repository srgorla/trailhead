(function () {
  const l = document.createElement("link").relList;
  if (l && l.supports && l.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) u(o);
  new MutationObserver((o) => {
    for (const f of o)
      if (f.type === "childList")
        for (const d of f.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && u(d);
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
  function u(o) {
    if (o.ep) return;
    o.ep = !0;
    const f = r(o);
    fetch(o.href, f);
  }
})();
function O1(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default")
    ? a.default
    : a;
}
var wc = { exports: {} },
  ir = {};
var k0;
function M1() {
  if (k0) return ir;
  k0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.fragment");
  function r(u, o, f) {
    var d = null;
    if (
      (f !== void 0 && (d = "" + f),
      o.key !== void 0 && (d = "" + o.key),
      "key" in o)
    ) {
      f = {};
      for (var m in o) m !== "key" && (f[m] = o[m]);
    } else f = o;
    return (
      (o = f.ref),
      { $$typeof: a, type: u, key: d, ref: o !== void 0 ? o : null, props: f }
    );
  }
  return ((ir.Fragment = l), (ir.jsx = r), (ir.jsxs = r), ir);
}
var H0;
function x1() {
  return (H0 || ((H0 = 1), (wc.exports = M1())), wc.exports);
}
var B = x1(),
  Ac = { exports: {} },
  _e = {};
var q0;
function z1() {
  if (q0) return _e;
  q0 = 1;
  var a = Symbol.for("react.transitional.element"),
    l = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    u = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    f = Symbol.for("react.consumer"),
    d = Symbol.for("react.context"),
    m = Symbol.for("react.forward_ref"),
    y = Symbol.for("react.suspense"),
    p = Symbol.for("react.memo"),
    v = Symbol.for("react.lazy"),
    b = Symbol.for("react.activity"),
    S = Symbol.iterator;
  function R(C) {
    return C === null || typeof C != "object"
      ? null
      : ((C = (S && C[S]) || C["@@iterator"]),
        typeof C == "function" ? C : null);
  }
  var N = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    j = Object.assign,
    Y = {};
  function G(C, q, te) {
    ((this.props = C),
      (this.context = q),
      (this.refs = Y),
      (this.updater = te || N));
  }
  ((G.prototype.isReactComponent = {}),
    (G.prototype.setState = function (C, q) {
      if (typeof C != "object" && typeof C != "function" && C != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, C, q, "setState");
    }),
    (G.prototype.forceUpdate = function (C) {
      this.updater.enqueueForceUpdate(this, C, "forceUpdate");
    }));
  function K() {}
  K.prototype = G.prototype;
  function Z(C, q, te) {
    ((this.props = C),
      (this.context = q),
      (this.refs = Y),
      (this.updater = te || N));
  }
  var $ = (Z.prototype = new K());
  (($.constructor = Z), j($, G.prototype), ($.isPureReactComponent = !0));
  var se = Array.isArray;
  function ee() {}
  var H = { H: null, A: null, T: null, S: null },
    A = Object.prototype.hasOwnProperty;
  function W(C, q, te) {
    var ue = te.ref;
    return {
      $$typeof: a,
      type: C,
      key: q,
      ref: ue !== void 0 ? ue : null,
      props: te
    };
  }
  function re(C, q) {
    return W(C.type, q, C.props);
  }
  function ie(C) {
    return typeof C == "object" && C !== null && C.$$typeof === a;
  }
  function ne(C) {
    var q = { "=": "=0", ":": "=2" };
    return (
      "$" +
      C.replace(/[=:]/g, function (te) {
        return q[te];
      })
    );
  }
  var le = /\/+/g;
  function he(C, q) {
    return typeof C == "object" && C !== null && C.key != null
      ? ne("" + C.key)
      : q.toString(36);
  }
  function Ue(C) {
    switch (C.status) {
      case "fulfilled":
        return C.value;
      case "rejected":
        throw C.reason;
      default:
        switch (
          (typeof C.status == "string"
            ? C.then(ee, ee)
            : ((C.status = "pending"),
              C.then(
                function (q) {
                  C.status === "pending" &&
                    ((C.status = "fulfilled"), (C.value = q));
                },
                function (q) {
                  C.status === "pending" &&
                    ((C.status = "rejected"), (C.reason = q));
                }
              )),
          C.status)
        ) {
          case "fulfilled":
            return C.value;
          case "rejected":
            throw C.reason;
        }
    }
    throw C;
  }
  function x(C, q, te, ue, ve) {
    var Ee = typeof C;
    (Ee === "undefined" || Ee === "boolean") && (C = null);
    var Ae = !1;
    if (C === null) Ae = !0;
    else
      switch (Ee) {
        case "bigint":
        case "string":
        case "number":
          Ae = !0;
          break;
        case "object":
          switch (C.$$typeof) {
            case a:
            case l:
              Ae = !0;
              break;
            case v:
              return ((Ae = C._init), x(Ae(C._payload), q, te, ue, ve));
          }
      }
    if (Ae)
      return (
        (ve = ve(C)),
        (Ae = ue === "" ? "." + he(C, 0) : ue),
        se(ve)
          ? ((te = ""),
            Ae != null && (te = Ae.replace(le, "$&/") + "/"),
            x(ve, q, te, "", function (mn) {
              return mn;
            }))
          : ve != null &&
            (ie(ve) &&
              (ve = re(
                ve,
                te +
                  (ve.key == null || (C && C.key === ve.key)
                    ? ""
                    : ("" + ve.key).replace(le, "$&/") + "/") +
                  Ae
              )),
            q.push(ve)),
        1
      );
    Ae = 0;
    var Ke = ue === "" ? "." : ue + ":";
    if (se(C))
      for (var Ye = 0; Ye < C.length; Ye++)
        ((ue = C[Ye]), (Ee = Ke + he(ue, Ye)), (Ae += x(ue, q, te, Ee, ve)));
    else if (((Ye = R(C)), typeof Ye == "function"))
      for (C = Ye.call(C), Ye = 0; !(ue = C.next()).done;)
        ((ue = ue.value),
          (Ee = Ke + he(ue, Ye++)),
          (Ae += x(ue, q, te, Ee, ve)));
    else if (Ee === "object") {
      if (typeof C.then == "function") return x(Ue(C), q, te, ue, ve);
      throw (
        (q = String(C)),
        Error(
          "Objects are not valid as a React child (found: " +
            (q === "[object Object]"
              ? "object with keys {" + Object.keys(C).join(", ") + "}"
              : q) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    }
    return Ae;
  }
  function P(C, q, te) {
    if (C == null) return C;
    var ue = [],
      ve = 0;
    return (
      x(C, ue, "", "", function (Ee) {
        return q.call(te, Ee, ve++);
      }),
      ue
    );
  }
  function me(C) {
    if (C._status === -1) {
      var q = C._result;
      ((q = q()),
        q.then(
          function (te) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 1), (C._result = te));
          },
          function (te) {
            (C._status === 0 || C._status === -1) &&
              ((C._status = 2), (C._result = te));
          }
        ),
        C._status === -1 && ((C._status = 0), (C._result = q)));
    }
    if (C._status === 1) return C._result.default;
    throw C._result;
  }
  var ge =
      typeof reportError == "function"
        ? reportError
        : function (C) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var q = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof C == "object" &&
                  C !== null &&
                  typeof C.message == "string"
                    ? String(C.message)
                    : String(C),
                error: C
              });
              if (!window.dispatchEvent(q)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", C);
              return;
            }
            console.error(C);
          },
    Ce = {
      map: P,
      forEach: function (C, q, te) {
        P(
          C,
          function () {
            q.apply(this, arguments);
          },
          te
        );
      },
      count: function (C) {
        var q = 0;
        return (
          P(C, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (C) {
        return (
          P(C, function (q) {
            return q;
          }) || []
        );
      },
      only: function (C) {
        if (!ie(C))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return C;
      }
    };
  return (
    (_e.Activity = b),
    (_e.Children = Ce),
    (_e.Component = G),
    (_e.Fragment = r),
    (_e.Profiler = o),
    (_e.PureComponent = Z),
    (_e.StrictMode = u),
    (_e.Suspense = y),
    (_e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = H),
    (_e.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (C) {
        return H.H.useMemoCache(C);
      }
    }),
    (_e.cache = function (C) {
      return function () {
        return C.apply(null, arguments);
      };
    }),
    (_e.cacheSignal = function () {
      return null;
    }),
    (_e.cloneElement = function (C, q, te) {
      if (C == null)
        throw Error(
          "The argument must be a React element, but you passed " + C + "."
        );
      var ue = j({}, C.props),
        ve = C.key;
      if (q != null)
        for (Ee in (q.key !== void 0 && (ve = "" + q.key), q))
          !A.call(q, Ee) ||
            Ee === "key" ||
            Ee === "__self" ||
            Ee === "__source" ||
            (Ee === "ref" && q.ref === void 0) ||
            (ue[Ee] = q[Ee]);
      var Ee = arguments.length - 2;
      if (Ee === 1) ue.children = te;
      else if (1 < Ee) {
        for (var Ae = Array(Ee), Ke = 0; Ke < Ee; Ke++)
          Ae[Ke] = arguments[Ke + 2];
        ue.children = Ae;
      }
      return W(C.type, ve, ue);
    }),
    (_e.createContext = function (C) {
      return (
        (C = {
          $$typeof: d,
          _currentValue: C,
          _currentValue2: C,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }),
        (C.Provider = C),
        (C.Consumer = { $$typeof: f, _context: C }),
        C
      );
    }),
    (_e.createElement = function (C, q, te) {
      var ue,
        ve = {},
        Ee = null;
      if (q != null)
        for (ue in (q.key !== void 0 && (Ee = "" + q.key), q))
          A.call(q, ue) &&
            ue !== "key" &&
            ue !== "__self" &&
            ue !== "__source" &&
            (ve[ue] = q[ue]);
      var Ae = arguments.length - 2;
      if (Ae === 1) ve.children = te;
      else if (1 < Ae) {
        for (var Ke = Array(Ae), Ye = 0; Ye < Ae; Ye++)
          Ke[Ye] = arguments[Ye + 2];
        ve.children = Ke;
      }
      if (C && C.defaultProps)
        for (ue in ((Ae = C.defaultProps), Ae))
          ve[ue] === void 0 && (ve[ue] = Ae[ue]);
      return W(C, Ee, ve);
    }),
    (_e.createRef = function () {
      return { current: null };
    }),
    (_e.forwardRef = function (C) {
      return { $$typeof: m, render: C };
    }),
    (_e.isValidElement = ie),
    (_e.lazy = function (C) {
      return { $$typeof: v, _payload: { _status: -1, _result: C }, _init: me };
    }),
    (_e.memo = function (C, q) {
      return { $$typeof: p, type: C, compare: q === void 0 ? null : q };
    }),
    (_e.startTransition = function (C) {
      var q = H.T,
        te = {};
      H.T = te;
      try {
        var ue = C(),
          ve = H.S;
        (ve !== null && ve(te, ue),
          typeof ue == "object" &&
            ue !== null &&
            typeof ue.then == "function" &&
            ue.then(ee, ge));
      } catch (Ee) {
        ge(Ee);
      } finally {
        (q !== null && te.types !== null && (q.types = te.types), (H.T = q));
      }
    }),
    (_e.unstable_useCacheRefresh = function () {
      return H.H.useCacheRefresh();
    }),
    (_e.use = function (C) {
      return H.H.use(C);
    }),
    (_e.useActionState = function (C, q, te) {
      return H.H.useActionState(C, q, te);
    }),
    (_e.useCallback = function (C, q) {
      return H.H.useCallback(C, q);
    }),
    (_e.useContext = function (C) {
      return H.H.useContext(C);
    }),
    (_e.useDebugValue = function () {}),
    (_e.useDeferredValue = function (C, q) {
      return H.H.useDeferredValue(C, q);
    }),
    (_e.useEffect = function (C, q) {
      return H.H.useEffect(C, q);
    }),
    (_e.useEffectEvent = function (C) {
      return H.H.useEffectEvent(C);
    }),
    (_e.useId = function () {
      return H.H.useId();
    }),
    (_e.useImperativeHandle = function (C, q, te) {
      return H.H.useImperativeHandle(C, q, te);
    }),
    (_e.useInsertionEffect = function (C, q) {
      return H.H.useInsertionEffect(C, q);
    }),
    (_e.useLayoutEffect = function (C, q) {
      return H.H.useLayoutEffect(C, q);
    }),
    (_e.useMemo = function (C, q) {
      return H.H.useMemo(C, q);
    }),
    (_e.useOptimistic = function (C, q) {
      return H.H.useOptimistic(C, q);
    }),
    (_e.useReducer = function (C, q, te) {
      return H.H.useReducer(C, q, te);
    }),
    (_e.useRef = function (C) {
      return H.H.useRef(C);
    }),
    (_e.useState = function (C) {
      return H.H.useState(C);
    }),
    (_e.useSyncExternalStore = function (C, q, te) {
      return H.H.useSyncExternalStore(C, q, te);
    }),
    (_e.useTransition = function () {
      return H.H.useTransition();
    }),
    (_e.version = "19.2.8"),
    _e
  );
}
var V0;
function Af() {
  return (V0 || ((V0 = 1), (Ac.exports = z1())), Ac.exports);
}
var U = Af(),
  Dc = { exports: {} },
  rr = {},
  _c = { exports: {} },
  Oc = {};
var Y0;
function U1() {
  return (
    Y0 ||
      ((Y0 = 1),
      (function (a) {
        function l(x, P) {
          var me = x.length;
          x.push(P);
          e: for (; 0 < me;) {
            var ge = (me - 1) >>> 1,
              Ce = x[ge];
            if (0 < o(Ce, P)) ((x[ge] = P), (x[me] = Ce), (me = ge));
            else break e;
          }
        }
        function r(x) {
          return x.length === 0 ? null : x[0];
        }
        function u(x) {
          if (x.length === 0) return null;
          var P = x[0],
            me = x.pop();
          if (me !== P) {
            x[0] = me;
            e: for (var ge = 0, Ce = x.length, C = Ce >>> 1; ge < C;) {
              var q = 2 * (ge + 1) - 1,
                te = x[q],
                ue = q + 1,
                ve = x[ue];
              if (0 > o(te, me))
                ue < Ce && 0 > o(ve, te)
                  ? ((x[ge] = ve), (x[ue] = me), (ge = ue))
                  : ((x[ge] = te), (x[q] = me), (ge = q));
              else if (ue < Ce && 0 > o(ve, me))
                ((x[ge] = ve), (x[ue] = me), (ge = ue));
              else break e;
            }
          }
          return P;
        }
        function o(x, P) {
          var me = x.sortIndex - P.sortIndex;
          return me !== 0 ? me : x.id - P.id;
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
          var d = Date,
            m = d.now();
          a.unstable_now = function () {
            return d.now() - m;
          };
        }
        var y = [],
          p = [],
          v = 1,
          b = null,
          S = 3,
          R = !1,
          N = !1,
          j = !1,
          Y = !1,
          G = typeof setTimeout == "function" ? setTimeout : null,
          K = typeof clearTimeout == "function" ? clearTimeout : null,
          Z = typeof setImmediate < "u" ? setImmediate : null;
        function $(x) {
          for (var P = r(p); P !== null;) {
            if (P.callback === null) u(p);
            else if (P.startTime <= x)
              (u(p), (P.sortIndex = P.expirationTime), l(y, P));
            else break;
            P = r(p);
          }
        }
        function se(x) {
          if (((j = !1), $(x), !N))
            if (r(y) !== null) ((N = !0), ee || ((ee = !0), ne()));
            else {
              var P = r(p);
              P !== null && Ue(se, P.startTime - x);
            }
        }
        var ee = !1,
          H = -1,
          A = 5,
          W = -1;
        function re() {
          return Y ? !0 : !(a.unstable_now() - W < A);
        }
        function ie() {
          if (((Y = !1), ee)) {
            var x = a.unstable_now();
            W = x;
            var P = !0;
            try {
              e: {
                ((N = !1), j && ((j = !1), K(H), (H = -1)), (R = !0));
                var me = S;
                try {
                  t: {
                    for (
                      $(x), b = r(y);
                      b !== null && !(b.expirationTime > x && re());
                    ) {
                      var ge = b.callback;
                      if (typeof ge == "function") {
                        ((b.callback = null), (S = b.priorityLevel));
                        var Ce = ge(b.expirationTime <= x);
                        if (((x = a.unstable_now()), typeof Ce == "function")) {
                          ((b.callback = Ce), $(x), (P = !0));
                          break t;
                        }
                        (b === r(y) && u(y), $(x));
                      } else u(y);
                      b = r(y);
                    }
                    if (b !== null) P = !0;
                    else {
                      var C = r(p);
                      (C !== null && Ue(se, C.startTime - x), (P = !1));
                    }
                  }
                  break e;
                } finally {
                  ((b = null), (S = me), (R = !1));
                }
                P = void 0;
              }
            } finally {
              P ? ne() : (ee = !1);
            }
          }
        }
        var ne;
        if (typeof Z == "function")
          ne = function () {
            Z(ie);
          };
        else if (typeof MessageChannel < "u") {
          var le = new MessageChannel(),
            he = le.port2;
          ((le.port1.onmessage = ie),
            (ne = function () {
              he.postMessage(null);
            }));
        } else
          ne = function () {
            G(ie, 0);
          };
        function Ue(x, P) {
          H = G(function () {
            x(a.unstable_now());
          }, P);
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
              : (A = 0 < x ? Math.floor(1e3 / x) : 5);
          }),
          (a.unstable_getCurrentPriorityLevel = function () {
            return S;
          }),
          (a.unstable_next = function (x) {
            switch (S) {
              case 1:
              case 2:
              case 3:
                var P = 3;
                break;
              default:
                P = S;
            }
            var me = S;
            S = P;
            try {
              return x();
            } finally {
              S = me;
            }
          }),
          (a.unstable_requestPaint = function () {
            Y = !0;
          }),
          (a.unstable_runWithPriority = function (x, P) {
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
            var me = S;
            S = x;
            try {
              return P();
            } finally {
              S = me;
            }
          }),
          (a.unstable_scheduleCallback = function (x, P, me) {
            var ge = a.unstable_now();
            switch (
              (typeof me == "object" && me !== null
                ? ((me = me.delay),
                  (me = typeof me == "number" && 0 < me ? ge + me : ge))
                : (me = ge),
              x)
            ) {
              case 1:
                var Ce = -1;
                break;
              case 2:
                Ce = 250;
                break;
              case 5:
                Ce = 1073741823;
                break;
              case 4:
                Ce = 1e4;
                break;
              default:
                Ce = 5e3;
            }
            return (
              (Ce = me + Ce),
              (x = {
                id: v++,
                callback: P,
                priorityLevel: x,
                startTime: me,
                expirationTime: Ce,
                sortIndex: -1
              }),
              me > ge
                ? ((x.sortIndex = me),
                  l(p, x),
                  r(y) === null &&
                    x === r(p) &&
                    (j ? (K(H), (H = -1)) : (j = !0), Ue(se, me - ge)))
                : ((x.sortIndex = Ce),
                  l(y, x),
                  N || R || ((N = !0), ee || ((ee = !0), ne()))),
              x
            );
          }),
          (a.unstable_shouldYield = re),
          (a.unstable_wrapCallback = function (x) {
            var P = S;
            return function () {
              var me = S;
              S = P;
              try {
                return x.apply(this, arguments);
              } finally {
                S = me;
              }
            };
          }));
      })(Oc)),
    Oc
  );
}
var G0;
function L1() {
  return (G0 || ((G0 = 1), (_c.exports = U1())), _c.exports);
}
var Mc = { exports: {} },
  Ot = {};
var Q0;
function j1() {
  if (Q0) return Ot;
  Q0 = 1;
  var a = Af();
  function l(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var v = 2; v < arguments.length; v++)
        p += "&args[]=" + encodeURIComponent(arguments[v]);
    }
    return (
      "Minified React error #" +
      y +
      "; visit " +
      p +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var u = {
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
  function f(y, p, v) {
    var b =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : "" + b,
      children: y,
      containerInfo: p,
      implementation: v
    };
  }
  var d = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function m(y, p) {
    if (y === "font") return "";
    if (typeof p == "string") return p === "use-credentials" ? p : "";
  }
  return (
    (Ot.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = u),
    (Ot.createPortal = function (y, p) {
      var v =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!p || (p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11))
        throw Error(l(299));
      return f(y, p, null, v);
    }),
    (Ot.flushSync = function (y) {
      var p = d.T,
        v = u.p;
      try {
        if (((d.T = null), (u.p = 2), y)) return y();
      } finally {
        ((d.T = p), (u.p = v), u.d.f());
      }
    }),
    (Ot.preconnect = function (y, p) {
      typeof y == "string" &&
        (p
          ? ((p = p.crossOrigin),
            (p =
              typeof p == "string"
                ? p === "use-credentials"
                  ? p
                  : ""
                : void 0))
          : (p = null),
        u.d.C(y, p));
    }),
    (Ot.prefetchDNS = function (y) {
      typeof y == "string" && u.d.D(y);
    }),
    (Ot.preinit = function (y, p) {
      if (typeof y == "string" && p && typeof p.as == "string") {
        var v = p.as,
          b = m(v, p.crossOrigin),
          S = typeof p.integrity == "string" ? p.integrity : void 0,
          R = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
        v === "style"
          ? u.d.S(y, typeof p.precedence == "string" ? p.precedence : void 0, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: R
            })
          : v === "script" &&
            u.d.X(y, {
              crossOrigin: b,
              integrity: S,
              fetchPriority: R,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0
            });
      }
    }),
    (Ot.preinitModule = function (y, p) {
      if (typeof y == "string")
        if (typeof p == "object" && p !== null) {
          if (p.as == null || p.as === "script") {
            var v = m(p.as, p.crossOrigin);
            u.d.M(y, {
              crossOrigin: v,
              integrity: typeof p.integrity == "string" ? p.integrity : void 0,
              nonce: typeof p.nonce == "string" ? p.nonce : void 0
            });
          }
        } else p == null && u.d.M(y);
    }),
    (Ot.preload = function (y, p) {
      if (
        typeof y == "string" &&
        typeof p == "object" &&
        p !== null &&
        typeof p.as == "string"
      ) {
        var v = p.as,
          b = m(v, p.crossOrigin);
        u.d.L(y, v, {
          crossOrigin: b,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0,
          nonce: typeof p.nonce == "string" ? p.nonce : void 0,
          type: typeof p.type == "string" ? p.type : void 0,
          fetchPriority:
            typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
          referrerPolicy:
            typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
          imageSrcSet:
            typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
          imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
          media: typeof p.media == "string" ? p.media : void 0
        });
      }
    }),
    (Ot.preloadModule = function (y, p) {
      if (typeof y == "string")
        if (p) {
          var v = m(p.as, p.crossOrigin);
          u.d.m(y, {
            as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
            crossOrigin: v,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0
          });
        } else u.d.m(y);
    }),
    (Ot.requestFormReset = function (y) {
      u.d.r(y);
    }),
    (Ot.unstable_batchedUpdates = function (y, p) {
      return y(p);
    }),
    (Ot.useFormState = function (y, p, v) {
      return d.H.useFormState(y, p, v);
    }),
    (Ot.useFormStatus = function () {
      return d.H.useHostTransitionStatus();
    }),
    (Ot.version = "19.2.8"),
    Ot
  );
}
var F0;
function B1() {
  if (F0) return Mc.exports;
  F0 = 1;
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
  return (a(), (Mc.exports = j1()), Mc.exports);
}
var X0;
function k1() {
  if (X0) return rr;
  X0 = 1;
  var a = L1(),
    l = Af(),
    r = B1();
  function u(e) {
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
  function d(e) {
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
  function m(e) {
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
  function y(e) {
    if (f(e) !== e) throw Error(u(188));
  }
  function p(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = f(e)), t === null)) throw Error(u(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ;) {
      var s = n.return;
      if (s === null) break;
      var c = s.alternate;
      if (c === null) {
        if (((i = s.return), i !== null)) {
          n = i;
          continue;
        }
        break;
      }
      if (s.child === c.child) {
        for (c = s.child; c;) {
          if (c === n) return (y(s), e);
          if (c === i) return (y(s), t);
          c = c.sibling;
        }
        throw Error(u(188));
      }
      if (n.return !== i.return) ((n = s), (i = c));
      else {
        for (var h = !1, g = s.child; g;) {
          if (g === n) {
            ((h = !0), (n = s), (i = c));
            break;
          }
          if (g === i) {
            ((h = !0), (i = s), (n = c));
            break;
          }
          g = g.sibling;
        }
        if (!h) {
          for (g = c.child; g;) {
            if (g === n) {
              ((h = !0), (n = c), (i = s));
              break;
            }
            if (g === i) {
              ((h = !0), (i = c), (n = s));
              break;
            }
            g = g.sibling;
          }
          if (!h) throw Error(u(189));
        }
      }
      if (n.alternate !== i) throw Error(u(190));
    }
    if (n.tag !== 3) throw Error(u(188));
    return n.stateNode.current === n ? e : t;
  }
  function v(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null;) {
      if (((t = v(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var b = Object.assign,
    S = Symbol.for("react.element"),
    R = Symbol.for("react.transitional.element"),
    N = Symbol.for("react.portal"),
    j = Symbol.for("react.fragment"),
    Y = Symbol.for("react.strict_mode"),
    G = Symbol.for("react.profiler"),
    K = Symbol.for("react.consumer"),
    Z = Symbol.for("react.context"),
    $ = Symbol.for("react.forward_ref"),
    se = Symbol.for("react.suspense"),
    ee = Symbol.for("react.suspense_list"),
    H = Symbol.for("react.memo"),
    A = Symbol.for("react.lazy"),
    W = Symbol.for("react.activity"),
    re = Symbol.for("react.memo_cache_sentinel"),
    ie = Symbol.iterator;
  function ne(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (ie && e[ie]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var le = Symbol.for("react.client.reference");
  function he(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === le ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case j:
        return "Fragment";
      case G:
        return "Profiler";
      case Y:
        return "StrictMode";
      case se:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case W:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case N:
          return "Portal";
        case Z:
          return e.displayName || "Context";
        case K:
          return (e._context.displayName || "Context") + ".Consumer";
        case $:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case H:
          return (
            (t = e.displayName || null),
            t !== null ? t : he(e.type) || "Memo"
          );
        case A:
          ((t = e._payload), (e = e._init));
          try {
            return he(e(t));
          } catch {}
      }
    return null;
  }
  var Ue = Array.isArray,
    x = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    P = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    me = { pending: !1, data: null, method: null, action: null },
    ge = [],
    Ce = -1;
  function C(e) {
    return { current: e };
  }
  function q(e) {
    0 > Ce || ((e.current = ge[Ce]), (ge[Ce] = null), Ce--);
  }
  function te(e, t) {
    (Ce++, (ge[Ce] = e.current), (e.current = t));
  }
  var ue = C(null),
    ve = C(null),
    Ee = C(null),
    Ae = C(null);
  function Ke(e, t) {
    switch ((te(Ee, t), te(ve, e), te(ue, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? u0(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = u0(t)), (e = s0(t, e)));
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
    (q(ue), te(ue, e));
  }
  function Ye() {
    (q(ue), q(ve), q(Ee));
  }
  function mn(e) {
    e.memoizedState !== null && te(Ae, e);
    var t = ue.current,
      n = s0(t, e.type);
    t !== n && (te(ve, e), te(ue, n));
  }
  function vl(e) {
    (ve.current === e && (q(ue), q(ve)),
      Ae.current === e && (q(Ae), (tr._currentValue = me)));
  }
  var di, vt;
  function Bt(e) {
    if (di === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ((di = (t && t[1]) || ""),
          (vt =
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
      di +
      e +
      vt
    );
  }
  var bl = !1;
  function hi(e, t) {
    if (!e || bl) return "";
    bl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var F = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(F.prototype, "props", {
                  set: function () {
                    throw Error();
                  }
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(F, []);
                } catch (k) {
                  var L = k;
                }
                Reflect.construct(e, [], F);
              } else {
                try {
                  F.call();
                } catch (k) {
                  L = k;
                }
                e.call(F.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (k) {
                L = k;
              }
              (F = e()) &&
                typeof F.catch == "function" &&
                F.catch(function () {});
            }
          } catch (k) {
            if (k && L && typeof k.stack == "string") return [k.stack, L.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s &&
        s.configurable &&
        Object.defineProperty(i.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
      var c = i.DetermineComponentFrameRoot(),
        h = c[0],
        g = c[1];
      if (h && g) {
        var E = h.split(`
`),
          z = g.split(`
`);
        for (
          s = i = 0;
          i < E.length && !E[i].includes("DetermineComponentFrameRoot");
        )
          i++;
        for (; s < z.length && !z[s].includes("DetermineComponentFrameRoot");)
          s++;
        if (i === E.length || s === z.length)
          for (
            i = E.length - 1, s = z.length - 1;
            1 <= i && 0 <= s && E[i] !== z[s];
          )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (E[i] !== z[s]) {
            if (i !== 1 || s !== 1)
              do
                if ((i--, s--, 0 > s || E[i] !== z[s])) {
                  var V =
                    `
` + E[i].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      V.includes("<anonymous>") &&
                      (V = V.replace("<anonymous>", e.displayName)),
                    V
                  );
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      ((bl = !1), (Error.prepareStackTrace = n));
    }
    return (n = e ? e.displayName || e.name : "") ? Bt(n) : "";
  }
  function kn(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Bt(e.type);
      case 16:
        return Bt("Lazy");
      case 13:
        return e.child !== t && t !== null
          ? Bt("Suspense Fallback")
          : Bt("Suspense");
      case 19:
        return Bt("SuspenseList");
      case 0:
      case 15:
        return hi(e.type, !1);
      case 11:
        return hi(e.type.render, !1);
      case 1:
        return hi(e.type, !0);
      case 31:
        return Bt("Activity");
      default:
        return "";
    }
  }
  function Or(e) {
    try {
      var t = "",
        n = null;
      do ((t += kn(e, n)), (n = e), (e = e.return));
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
  var mi = Object.prototype.hasOwnProperty,
    El = a.unstable_scheduleCallback,
    yi = a.unstable_cancelCallback,
    hs = a.unstable_shouldYield,
    ms = a.unstable_requestPaint,
    xt = a.unstable_now,
    Hn = a.unstable_getCurrentPriorityLevel,
    ma = a.unstable_ImmediatePriority,
    pi = a.unstable_UserBlockingPriority,
    ya = a.unstable_NormalPriority,
    yn = a.unstable_LowPriority,
    Wt = a.unstable_IdlePriority,
    ys = a.log,
    ps = a.unstable_setDisableYieldValue,
    qn = null,
    zt = null;
  function St(e) {
    if (
      (typeof ys == "function" && ps(e),
      zt && typeof zt.setStrictMode == "function")
    )
      try {
        zt.setStrictMode(qn, e);
      } catch {}
  }
  var _t = Math.clz32 ? Math.clz32 : gs,
    Mr = Math.log,
    xr = Math.LN2;
  function gs(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Mr(e) / xr) | 0)) | 0);
  }
  var Fa = 256,
    Vn = 262144,
    Xa = 4194304;
  function pn(e) {
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
  function Sl(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0,
      c = e.suspendedLanes,
      h = e.pingedLanes;
    e = e.warmLanes;
    var g = i & 134217727;
    return (
      g !== 0
        ? ((i = g & ~c),
          i !== 0
            ? (s = pn(i))
            : ((h &= g),
              h !== 0
                ? (s = pn(h))
                : n || ((n = g & ~e), n !== 0 && (s = pn(n)))))
        : ((g = i & ~c),
          g !== 0
            ? (s = pn(g))
            : h !== 0
              ? (s = pn(h))
              : n || ((n = i & ~e), n !== 0 && (s = pn(n)))),
      s === 0
        ? 0
        : t !== 0 &&
            t !== s &&
            (t & c) === 0 &&
            ((c = s & -s),
            (n = t & -t),
            c >= n || (c === 32 && (n & 4194048) !== 0))
          ? t
          : s
    );
  }
  function pa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function vs(e, t) {
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
  function gi() {
    var e = Xa;
    return ((Xa <<= 1), (Xa & 62914560) === 0 && (Xa = 4194304), e);
  }
  function ga(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Nn(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function zr(e, t, n, i, s, c) {
    var h = e.pendingLanes;
    ((e.pendingLanes = n),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= n),
      (e.entangledLanes &= n),
      (e.errorRecoveryDisabledLanes &= n),
      (e.shellSuspendCounter = 0));
    var g = e.entanglements,
      E = e.expirationTimes,
      z = e.hiddenUpdates;
    for (n = h & ~n; 0 < n;) {
      var V = 31 - _t(n),
        F = 1 << V;
      ((g[V] = 0), (E[V] = -1));
      var L = z[V];
      if (L !== null)
        for (z[V] = null, V = 0; V < L.length; V++) {
          var k = L[V];
          k !== null && (k.lane &= -536870913);
        }
      n &= ~F;
    }
    (i !== 0 && Ur(e, i, 0),
      c !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(h & ~t)));
  }
  function Ur(e, t, n) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var i = 31 - _t(t);
    ((e.entangledLanes |= t),
      (e.entanglements[i] = e.entanglements[i] | 1073741824 | (n & 261930)));
  }
  function Lr(e, t) {
    var n = (e.entangledLanes |= t);
    for (e = e.entanglements; n;) {
      var i = 31 - _t(n),
        s = 1 << i;
      ((s & t) | (e[i] & t) && (e[i] |= t), (n &= ~s));
    }
  }
  function T(e, t) {
    var n = t & -t;
    return (
      (n = (n & 42) !== 0 ? 1 : D(n)),
      (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    );
  }
  function D(e) {
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
  function O(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function I() {
    var e = P.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : M0(e.type));
  }
  function J(e, t) {
    var n = P.p;
    try {
      return ((P.p = e), t());
    } finally {
      P.p = n;
    }
  }
  var fe = Math.random().toString(36).slice(2),
    ce = "__reactFiber$" + fe,
    ae = "__reactProps$" + fe,
    oe = "__reactContainer$" + fe,
    Ne = "__reactEvents$" + fe,
    Se = "__reactListeners$" + fe,
    Te = "__reactHandles$" + fe,
    Le = "__reactResources$" + fe,
    Je = "__reactMarker$" + fe;
  function Ge(e) {
    (delete e[ce], delete e[ae], delete e[Ne], delete e[Se], delete e[Te]);
  }
  function at(e) {
    var t = e[ce];
    if (t) return t;
    for (var n = e.parentNode; n;) {
      if ((t = n[oe] || n[ce])) {
        if (
          ((n = t.alternate),
          t.child !== null || (n !== null && n.child !== null))
        )
          for (e = y0(e); e !== null;) {
            if ((n = e[ce])) return n;
            e = y0(e);
          }
        return t;
      }
      ((e = n), (n = e.parentNode));
    }
    return null;
  }
  function Oe(e) {
    if ((e = e[ce] || e[oe])) {
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
    throw Error(u(33));
  }
  function st(e) {
    var t = e[Le];
    return (
      t ||
        (t = e[Le] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Xe(e) {
    e[Je] = !0;
  }
  var gn = new Set(),
    Yn = {};
  function en(e, t) {
    (bt(e, t), bt(e + "Capture", t));
  }
  function bt(e, t) {
    for (Yn[e] = t, e = 0; e < t.length; e++) gn.add(t[e]);
  }
  var va = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Gn = {},
    Qn = {};
  function Tl(e) {
    return mi.call(Qn, e)
      ? !0
      : mi.call(Gn, e)
        ? !1
        : va.test(e)
          ? (Qn[e] = !0)
          : ((Gn[e] = !0), !1);
  }
  function Fn(e, t, n) {
    if (Tl(t))
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
  function Xn(e, t, n) {
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
  function De(e, t, n, i) {
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
  function Ze(e) {
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
  function ba(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    if (
      !e.hasOwnProperty(t) &&
      typeof i < "u" &&
      typeof i.get == "function" &&
      typeof i.set == "function"
    ) {
      var s = i.get,
        c = i.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (h) {
            ((n = "" + h), c.call(this, h));
          }
        }),
        Object.defineProperty(e, t, { enumerable: i.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (h) {
            n = "" + h;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          }
        }
      );
    }
  }
  function Za(e) {
    if (!e._valueTracker) {
      var t = tn(e) ? "checked" : "value";
      e._valueTracker = ba(e, t, "" + e[t]);
    }
  }
  function lt(e) {
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
  var jr = /[\n"\\]/g;
  function kt(e) {
    return e.replace(jr, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function bs(e, t, n, i, s, c, h, g) {
    ((e.name = ""),
      h != null &&
      typeof h != "function" &&
      typeof h != "symbol" &&
      typeof h != "boolean"
        ? (e.type = h)
        : e.removeAttribute("type"),
      t != null
        ? h === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + Ze(t))
          : e.value !== "" + Ze(t) && (e.value = "" + Ze(t))
        : (h !== "submit" && h !== "reset") || e.removeAttribute("value"),
      t != null
        ? Es(e, h, Ze(t))
        : n != null
          ? Es(e, h, Ze(n))
          : i != null && e.removeAttribute("value"),
      s == null && c != null && (e.defaultChecked = !!c),
      s != null &&
        (e.checked = s && typeof s != "function" && typeof s != "symbol"),
      g != null &&
      typeof g != "function" &&
      typeof g != "symbol" &&
      typeof g != "boolean"
        ? (e.name = "" + Ze(g))
        : e.removeAttribute("name"));
  }
  function td(e, t, n, i, s, c, h, g) {
    if (
      (c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.type = c),
      t != null || n != null)
    ) {
      if (!((c !== "submit" && c !== "reset") || t != null)) {
        Za(e);
        return;
      }
      ((n = n != null ? "" + Ze(n) : ""),
        (t = t != null ? "" + Ze(t) : n),
        g || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((i = i ?? s),
      (i = typeof i != "function" && typeof i != "symbol" && !!i),
      (e.checked = g ? e.checked : !!i),
      (e.defaultChecked = !!i),
      h != null &&
        typeof h != "function" &&
        typeof h != "symbol" &&
        typeof h != "boolean" &&
        (e.name = h),
      Za(e));
  }
  function Es(e, t, n) {
    (t === "number" && nn(e.ownerDocument) === e) ||
      e.defaultValue === "" + n ||
      (e.defaultValue = "" + n);
  }
  function Rl(e, t, n, i) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
      for (n = 0; n < e.length; n++)
        ((s = t.hasOwnProperty("$" + e[n].value)),
          e[n].selected !== s && (e[n].selected = s),
          s && i && (e[n].defaultSelected = !0));
    } else {
      for (n = "" + Ze(n), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === n) {
          ((e[s].selected = !0), i && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function nd(e, t, n) {
    if (
      t != null &&
      ((t = "" + Ze(t)), t !== e.value && (e.value = t), n == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Ze(n) : "";
  }
  function ad(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(u(92));
        if (Ue(i)) {
          if (1 < i.length) throw Error(u(93));
          i = i[0];
        }
        n = i;
      }
      (n == null && (n = ""), (t = n));
    }
    ((n = Ze(t)),
      (e.defaultValue = n),
      (i = e.textContent),
      i === n && i !== "" && i !== null && (e.value = i),
      Za(e));
  }
  function Cl(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ng = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ld(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? i
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : i
        ? e.setProperty(t, n)
        : typeof n != "number" || n === 0 || Ng.has(t)
          ? t === "float"
            ? (e.cssFloat = n)
            : (e[t] = ("" + n).trim())
          : (e[t] = n + "px");
  }
  function id(e, t, n) {
    if (t != null && typeof t != "object") throw Error(u(62));
    if (((e = e.style), n != null)) {
      for (var i in n)
        !n.hasOwnProperty(i) ||
          (t != null && t.hasOwnProperty(i)) ||
          (i.indexOf("--") === 0
            ? e.setProperty(i, "")
            : i === "float"
              ? (e.cssFloat = "")
              : (e[i] = ""));
      for (var s in t)
        ((i = t[s]), t.hasOwnProperty(s) && n[s] !== i && ld(e, s, i));
    } else for (var c in t) t.hasOwnProperty(c) && ld(e, c, t[c]);
  }
  function Ss(e) {
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
  var wg = new Map([
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
    Ag =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Br(e) {
    return Ag.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  function Zn() {}
  var Ts = null;
  function Rs(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Nl = null,
    wl = null;
  function rd(e) {
    var t = Oe(e);
    if (t && (e = t.stateNode)) {
      var n = e[ae] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (bs(
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
                'input[name="' + kt("" + t) + '"][type="radio"]'
              ),
                t = 0;
              t < n.length;
              t++
            ) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var s = i[ae] || null;
                if (!s) throw Error(u(90));
                bs(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              ((i = n[t]), i.form === e.form && lt(i));
          }
          break e;
        case "textarea":
          nd(e, n.value, n.defaultValue);
          break e;
        case "select":
          ((t = n.value), t != null && Rl(e, !!n.multiple, t, !1));
      }
    }
  }
  var Cs = !1;
  function ud(e, t, n) {
    if (Cs) return e(t, n);
    Cs = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (
        ((Cs = !1),
        (Nl !== null || wl !== null) &&
          (Cu(), Nl && ((t = Nl), (e = wl), (wl = Nl = null), rd(t), e)))
      )
        for (t = 0; t < e.length; t++) rd(e[t]);
    }
  }
  function vi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[ae] || null;
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
    if (n && typeof n != "function") throw Error(u(231, t, typeof n));
    return n;
  }
  var In = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Ns = !1;
  if (In)
    try {
      var bi = {};
      (Object.defineProperty(bi, "passive", {
        get: function () {
          Ns = !0;
        }
      }),
        window.addEventListener("test", bi, bi),
        window.removeEventListener("test", bi, bi));
    } catch {
      Ns = !1;
    }
  var Ea = null,
    ws = null,
    kr = null;
  function sd() {
    if (kr) return kr;
    var e,
      t = ws,
      n = t.length,
      i,
      s = "value" in Ea ? Ea.value : Ea.textContent,
      c = s.length;
    for (e = 0; e < n && t[e] === s[e]; e++);
    var h = n - e;
    for (i = 1; i <= h && t[n - i] === s[c - i]; i++);
    return (kr = s.slice(e, 1 < i ? 1 - i : void 0));
  }
  function Hr(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function qr() {
    return !0;
  }
  function od() {
    return !1;
  }
  function Ht(e) {
    function t(n, i, s, c, h) {
      ((this._reactName = n),
        (this._targetInst = s),
        (this.type = i),
        (this.nativeEvent = c),
        (this.target = h),
        (this.currentTarget = null));
      for (var g in e)
        e.hasOwnProperty(g) && ((n = e[g]), (this[g] = n ? n(c) : c[g]));
      return (
        (this.isDefaultPrevented = (
          c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1
        )
          ? qr
          : od),
        (this.isPropagationStopped = od),
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
            (this.isDefaultPrevented = qr));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = qr));
        },
        persist: function () {},
        isPersistent: qr
      }),
      t
    );
  }
  var Ia = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    },
    Vr = Ht(Ia),
    Ei = b({}, Ia, { view: 0, detail: 0 }),
    Dg = Ht(Ei),
    As,
    Ds,
    Si,
    Yr = b({}, Ei, {
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
      getModifierState: Os,
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
          : (e !== Si &&
              (Si && e.type === "mousemove"
                ? ((As = e.screenX - Si.screenX), (Ds = e.screenY - Si.screenY))
                : (Ds = As = 0),
              (Si = e)),
            As);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Ds;
      }
    }),
    cd = Ht(Yr),
    _g = b({}, Yr, { dataTransfer: 0 }),
    Og = Ht(_g),
    Mg = b({}, Ei, { relatedTarget: 0 }),
    _s = Ht(Mg),
    xg = b({}, Ia, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    zg = Ht(xg),
    Ug = b({}, Ia, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }),
    Lg = Ht(Ug),
    jg = b({}, Ia, { data: 0 }),
    fd = Ht(jg),
    Bg = {
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
    kg = {
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
    Hg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
  function qg(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Hg[e])
        ? !!t[e]
        : !1;
  }
  function Os() {
    return qg;
  }
  var Vg = b({}, Ei, {
      key: function (e) {
        if (e.key) {
          var t = Bg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Hr(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? kg[e.keyCode] || "Unidentified"
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
      getModifierState: Os,
      charCode: function (e) {
        return e.type === "keypress" ? Hr(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Hr(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      }
    }),
    Yg = Ht(Vg),
    Gg = b({}, Yr, {
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
    dd = Ht(Gg),
    Qg = b({}, Ei, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Os
    }),
    Fg = Ht(Qg),
    Xg = b({}, Ia, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Zg = Ht(Xg),
    Ig = b({}, Yr, {
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
    Kg = Ht(Ig),
    Jg = b({}, Ia, { newState: 0, oldState: 0 }),
    $g = Ht(Jg),
    Pg = [9, 13, 27, 32],
    Ms = In && "CompositionEvent" in window,
    Ti = null;
  In && "documentMode" in document && (Ti = document.documentMode);
  var Wg = In && "TextEvent" in window && !Ti,
    hd = In && (!Ms || (Ti && 8 < Ti && 11 >= Ti)),
    md = " ",
    yd = !1;
  function pd(e, t) {
    switch (e) {
      case "keyup":
        return Pg.indexOf(t.keyCode) !== -1;
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
  function gd(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Al = !1;
  function ev(e, t) {
    switch (e) {
      case "compositionend":
        return gd(t);
      case "keypress":
        return t.which !== 32 ? null : ((yd = !0), md);
      case "textInput":
        return ((e = t.data), e === md && yd ? null : e);
      default:
        return null;
    }
  }
  function tv(e, t) {
    if (Al)
      return e === "compositionend" || (!Ms && pd(e, t))
        ? ((e = sd()), (kr = ws = Ea = null), (Al = !1), e)
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
        return hd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var nv = {
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
  function vd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!nv[e.type] : t === "textarea";
  }
  function bd(e, t, n, i) {
    (Nl ? (wl ? wl.push(i) : (wl = [i])) : (Nl = i),
      (t = Mu(t, "onChange")),
      0 < t.length &&
        ((n = new Vr("onChange", "change", null, n, i)),
        e.push({ event: n, listeners: t })));
  }
  var Ri = null,
    Ci = null;
  function av(e) {
    t0(e, 0);
  }
  function Gr(e) {
    var t = Ut(e);
    if (lt(t)) return e;
  }
  function Ed(e, t) {
    if (e === "change") return t;
  }
  var Sd = !1;
  if (In) {
    var xs;
    if (In) {
      var zs = "oninput" in document;
      if (!zs) {
        var Td = document.createElement("div");
        (Td.setAttribute("oninput", "return;"),
          (zs = typeof Td.oninput == "function"));
      }
      xs = zs;
    } else xs = !1;
    Sd = xs && (!document.documentMode || 9 < document.documentMode);
  }
  function Rd() {
    Ri && (Ri.detachEvent("onpropertychange", Cd), (Ci = Ri = null));
  }
  function Cd(e) {
    if (e.propertyName === "value" && Gr(Ci)) {
      var t = [];
      (bd(t, Ci, e, Rs(e)), ud(av, t));
    }
  }
  function lv(e, t, n) {
    e === "focusin"
      ? (Rd(), (Ri = t), (Ci = n), Ri.attachEvent("onpropertychange", Cd))
      : e === "focusout" && Rd();
  }
  function iv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Gr(Ci);
  }
  function rv(e, t) {
    if (e === "click") return Gr(t);
  }
  function uv(e, t) {
    if (e === "input" || e === "change") return Gr(t);
  }
  function sv(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var Ft = typeof Object.is == "function" ? Object.is : sv;
  function Ni(e, t) {
    if (Ft(e, t)) return !0;
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
      var s = n[i];
      if (!mi.call(t, s) || !Ft(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Nd(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e;
  }
  function wd(e, t) {
    var n = Nd(e);
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
      n = Nd(n);
    }
  }
  function Ad(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Ad(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Dd(e) {
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
  function Us(e) {
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
  var ov = In && "documentMode" in document && 11 >= document.documentMode,
    Dl = null,
    Ls = null,
    wi = null,
    js = !1;
  function _d(e, t, n) {
    var i =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    js ||
      Dl == null ||
      Dl !== nn(i) ||
      ((i = Dl),
      "selectionStart" in i && Us(i)
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
      (wi && Ni(wi, i)) ||
        ((wi = i),
        (i = Mu(Ls, "onSelect")),
        0 < i.length &&
          ((t = new Vr("onSelect", "select", null, t, n)),
          e.push({ event: t, listeners: i }),
          (t.target = Dl))));
  }
  function Ka(e, t) {
    var n = {};
    return (
      (n[e.toLowerCase()] = t.toLowerCase()),
      (n["Webkit" + e] = "webkit" + t),
      (n["Moz" + e] = "moz" + t),
      n
    );
  }
  var _l = {
      animationend: Ka("Animation", "AnimationEnd"),
      animationiteration: Ka("Animation", "AnimationIteration"),
      animationstart: Ka("Animation", "AnimationStart"),
      transitionrun: Ka("Transition", "TransitionRun"),
      transitionstart: Ka("Transition", "TransitionStart"),
      transitioncancel: Ka("Transition", "TransitionCancel"),
      transitionend: Ka("Transition", "TransitionEnd")
    },
    Bs = {},
    Od = {};
  In &&
    ((Od = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete _l.animationend.animation,
      delete _l.animationiteration.animation,
      delete _l.animationstart.animation),
    "TransitionEvent" in window || delete _l.transitionend.transition);
  function Ja(e) {
    if (Bs[e]) return Bs[e];
    if (!_l[e]) return e;
    var t = _l[e],
      n;
    for (n in t) if (t.hasOwnProperty(n) && n in Od) return (Bs[e] = t[n]);
    return e;
  }
  var Md = Ja("animationend"),
    xd = Ja("animationiteration"),
    zd = Ja("animationstart"),
    cv = Ja("transitionrun"),
    fv = Ja("transitionstart"),
    dv = Ja("transitioncancel"),
    Ud = Ja("transitionend"),
    Ld = new Map(),
    ks =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  ks.push("scrollEnd");
  function vn(e, t) {
    (Ld.set(e, t), en(t, [e]));
  }
  var Qr =
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
    Hs = 0;
  function Fr() {
    for (var e = Ol, t = (Hs = Ol = 0); t < e;) {
      var n = an[t];
      an[t++] = null;
      var i = an[t];
      an[t++] = null;
      var s = an[t];
      an[t++] = null;
      var c = an[t];
      if (((an[t++] = null), i !== null && s !== null)) {
        var h = i.pending;
        (h === null ? (s.next = s) : ((s.next = h.next), (h.next = s)),
          (i.pending = s));
      }
      c !== 0 && jd(n, s, c);
    }
  }
  function Xr(e, t, n, i) {
    ((an[Ol++] = e),
      (an[Ol++] = t),
      (an[Ol++] = n),
      (an[Ol++] = i),
      (Hs |= i),
      (e.lanes |= i),
      (e = e.alternate),
      e !== null && (e.lanes |= i));
  }
  function qs(e, t, n, i) {
    return (Xr(e, t, n, i), Zr(e));
  }
  function $a(e, t) {
    return (Xr(e, null, null, t), Zr(e));
  }
  function jd(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var s = !1, c = e.return; c !== null;)
      ((c.childLanes |= n),
        (i = c.alternate),
        i !== null && (i.childLanes |= n),
        c.tag === 22 &&
          ((e = c.stateNode), e === null || e._visibility & 1 || (s = !0)),
        (e = c),
        (c = c.return));
    return e.tag === 3
      ? ((c = e.stateNode),
        s &&
          t !== null &&
          ((s = 31 - _t(n)),
          (e = c.hiddenUpdates),
          (i = e[s]),
          i === null ? (e[s] = [t]) : i.push(t),
          (t.lane = n | 536870912)),
        c)
      : null;
  }
  function Zr(e) {
    if (50 < Ii) throw ((Ii = 0), (Jo = null), Error(u(185)));
    for (var t = e.return; t !== null;) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var Ml = {};
  function hv(e, t, n, i) {
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
  function Xt(e, t, n, i) {
    return new hv(e, t, n, i);
  }
  function Vs(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Kn(e, t) {
    var n = e.alternate;
    return (
      n === null
        ? ((n = Xt(e.tag, t, e.key, e.mode)),
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
  function Bd(e, t) {
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
  function Ir(e, t, n, i, s, c) {
    var h = 0;
    if (((i = e), typeof e == "function")) Vs(e) && (h = 1);
    else if (typeof e == "string")
      h = v1(e, n, ue.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case W:
          return ((e = Xt(31, n, t, s)), (e.elementType = W), (e.lanes = c), e);
        case j:
          return Pa(n.children, s, c, t);
        case Y:
          ((h = 8), (s |= 24));
          break;
        case G:
          return (
            (e = Xt(12, n, t, s | 2)),
            (e.elementType = G),
            (e.lanes = c),
            e
          );
        case se:
          return (
            (e = Xt(13, n, t, s)),
            (e.elementType = se),
            (e.lanes = c),
            e
          );
        case ee:
          return (
            (e = Xt(19, n, t, s)),
            (e.elementType = ee),
            (e.lanes = c),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                h = 10;
                break e;
              case K:
                h = 9;
                break e;
              case $:
                h = 11;
                break e;
              case H:
                h = 14;
                break e;
              case A:
                ((h = 16), (i = null));
                break e;
            }
          ((h = 29),
            (n = Error(u(130, e === null ? "null" : typeof e, ""))),
            (i = null));
      }
    return (
      (t = Xt(h, n, t, s)),
      (t.elementType = e),
      (t.type = i),
      (t.lanes = c),
      t
    );
  }
  function Pa(e, t, n, i) {
    return ((e = Xt(7, e, i, t)), (e.lanes = n), e);
  }
  function Ys(e, t, n) {
    return ((e = Xt(6, e, null, t)), (e.lanes = n), e);
  }
  function kd(e) {
    var t = Xt(18, null, null, 0);
    return ((t.stateNode = e), t);
  }
  function Gs(e, t, n) {
    return (
      (t = Xt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = n),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }),
      t
    );
  }
  var Hd = new WeakMap();
  function ln(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Hd.get(e);
      return n !== void 0
        ? n
        : ((t = { value: e, source: t, stack: Or(t) }), Hd.set(e, t), t);
    }
    return { value: e, source: t, stack: Or(t) };
  }
  var xl = [],
    zl = 0,
    Kr = null,
    Ai = 0,
    rn = [],
    un = 0,
    Sa = null,
    wn = 1,
    An = "";
  function Jn(e, t) {
    ((xl[zl++] = Ai), (xl[zl++] = Kr), (Kr = e), (Ai = t));
  }
  function qd(e, t, n) {
    ((rn[un++] = wn), (rn[un++] = An), (rn[un++] = Sa), (Sa = e));
    var i = wn;
    e = An;
    var s = 32 - _t(i) - 1;
    ((i &= ~(1 << s)), (n += 1));
    var c = 32 - _t(t) + s;
    if (30 < c) {
      var h = s - (s % 5);
      ((c = (i & ((1 << h) - 1)).toString(32)),
        (i >>= h),
        (s -= h),
        (wn = (1 << (32 - _t(t) + s)) | (n << s) | i),
        (An = c + e));
    } else ((wn = (1 << c) | (n << s) | i), (An = e));
  }
  function Qs(e) {
    e.return !== null && (Jn(e, 1), qd(e, 1, 0));
  }
  function Fs(e) {
    for (; e === Kr;)
      ((Kr = xl[--zl]), (xl[zl] = null), (Ai = xl[--zl]), (xl[zl] = null));
    for (; e === Sa;)
      ((Sa = rn[--un]),
        (rn[un] = null),
        (An = rn[--un]),
        (rn[un] = null),
        (wn = rn[--un]),
        (rn[un] = null));
  }
  function Vd(e, t) {
    ((rn[un++] = wn),
      (rn[un++] = An),
      (rn[un++] = Sa),
      (wn = t.id),
      (An = t.overflow),
      (Sa = e));
  }
  var Nt = null,
    it = null,
    Ve = !1,
    Ta = null,
    sn = !1,
    Xs = Error(u(519));
  function Ra(e) {
    var t = Error(
      u(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Di(ln(t, e)), Xs);
  }
  function Yd(e) {
    var t = e.stateNode,
      n = e.type,
      i = e.memoizedProps;
    switch (((t[ce] = e), (t[ae] = i), n)) {
      case "dialog":
        (Be("cancel", t), Be("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        Be("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ji.length; n++) Be(Ji[n], t);
        break;
      case "source":
        Be("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (Be("error", t), Be("load", t));
        break;
      case "details":
        Be("toggle", t);
        break;
      case "input":
        (Be("invalid", t),
          td(
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
        Be("invalid", t);
        break;
      case "textarea":
        (Be("invalid", t), ad(t, i.value, i.defaultValue, i.children));
    }
    ((n = i.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      t.textContent === "" + n ||
      i.suppressHydrationWarning === !0 ||
      i0(t.textContent, n)
        ? (i.popover != null && (Be("beforetoggle", t), Be("toggle", t)),
          i.onScroll != null && Be("scroll", t),
          i.onScrollEnd != null && Be("scrollend", t),
          i.onClick != null && (t.onclick = Zn),
          (t = !0))
        : (t = !1),
      t || Ra(e, !0));
  }
  function Gd(e) {
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
  function Ul(e) {
    if (e !== Nt) return !1;
    if (!Ve) return (Gd(e), (Ve = !0), !1);
    var t = e.tag,
      n;
    if (
      ((n = t !== 3 && t !== 27) &&
        ((n = t === 5) &&
          ((n = e.type),
          (n =
            !(n !== "form" && n !== "button") || fc(e.type, e.memoizedProps))),
        (n = !n)),
      n && it && Ra(e),
      Gd(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      it = m0(e);
    } else if (t === 31) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(u(317));
      it = m0(e);
    } else
      t === 27
        ? ((t = it), Ba(e.type) ? ((e = pc), (pc = null), (it = e)) : (it = t))
        : (it = Nt ? cn(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Wa() {
    ((it = Nt = null), (Ve = !1));
  }
  function Zs() {
    var e = Ta;
    return (
      e !== null &&
        (Gt === null ? (Gt = e) : Gt.push.apply(Gt, e), (Ta = null)),
      e
    );
  }
  function Di(e) {
    Ta === null ? (Ta = [e]) : Ta.push(e);
  }
  var Is = C(null),
    el = null,
    $n = null;
  function Ca(e, t, n) {
    (te(Is, t._currentValue), (t._currentValue = n));
  }
  function Pn(e) {
    ((e._currentValue = Is.current), q(Is));
  }
  function Ks(e, t, n) {
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
  function Js(e, t, n, i) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null;) {
      var c = s.dependencies;
      if (c !== null) {
        var h = s.child;
        c = c.firstContext;
        e: for (; c !== null;) {
          var g = c;
          c = s;
          for (var E = 0; E < t.length; E++)
            if (g.context === t[E]) {
              ((c.lanes |= n),
                (g = c.alternate),
                g !== null && (g.lanes |= n),
                Ks(c.return, n, e),
                i || (h = null));
              break e;
            }
          c = g.next;
        }
      } else if (s.tag === 18) {
        if (((h = s.return), h === null)) throw Error(u(341));
        ((h.lanes |= n),
          (c = h.alternate),
          c !== null && (c.lanes |= n),
          Ks(h, n, e),
          (h = null));
      } else h = s.child;
      if (h !== null) h.return = s;
      else
        for (h = s; h !== null;) {
          if (h === e) {
            h = null;
            break;
          }
          if (((s = h.sibling), s !== null)) {
            ((s.return = h.return), (h = s));
            break;
          }
          h = h.return;
        }
      s = h;
    }
  }
  function Ll(e, t, n, i) {
    e = null;
    for (var s = t, c = !1; s !== null;) {
      if (!c) {
        if ((s.flags & 524288) !== 0) c = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var h = s.alternate;
        if (h === null) throw Error(u(387));
        if (((h = h.memoizedProps), h !== null)) {
          var g = s.type;
          Ft(s.pendingProps.value, h.value) ||
            (e !== null ? e.push(g) : (e = [g]));
        }
      } else if (s === Ae.current) {
        if (((h = s.alternate), h === null)) throw Error(u(387));
        h.memoizedState.memoizedState !== s.memoizedState.memoizedState &&
          (e !== null ? e.push(tr) : (e = [tr]));
      }
      s = s.return;
    }
    (e !== null && Js(t, e, n, i), (t.flags |= 262144));
  }
  function Jr(e) {
    for (e = e.firstContext; e !== null;) {
      if (!Ft(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function tl(e) {
    ((el = e),
      ($n = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function wt(e) {
    return Qd(el, e);
  }
  function $r(e, t) {
    return (el === null && tl(e), Qd(e, t));
  }
  function Qd(e, t) {
    var n = t._currentValue;
    if (((t = { context: t, memoizedValue: n, next: null }), $n === null)) {
      if (e === null) throw Error(u(308));
      (($n = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else $n = $n.next = t;
    return n;
  }
  var mv =
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
    yv = a.unstable_scheduleCallback,
    pv = a.unstable_NormalPriority,
    ht = {
      $$typeof: Z,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0
    };
  function $s() {
    return { controller: new mv(), data: new Map(), refCount: 0 };
  }
  function _i(e) {
    (e.refCount--,
      e.refCount === 0 &&
        yv(pv, function () {
          e.controller.abort();
        }));
  }
  var Oi = null,
    Ps = 0,
    jl = 0,
    Bl = null;
  function gv(e, t) {
    if (Oi === null) {
      var n = (Oi = []);
      ((Ps = 0),
        (jl = nc()),
        (Bl = {
          status: "pending",
          value: void 0,
          then: function (i) {
            n.push(i);
          }
        }));
    }
    return (Ps++, t.then(Fd, Fd), t);
  }
  function Fd() {
    if (--Ps === 0 && Oi !== null) {
      Bl !== null && (Bl.status = "fulfilled");
      var e = Oi;
      ((Oi = null), (jl = 0), (Bl = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function vv(e, t) {
    var n = [],
      i = {
        status: "pending",
        value: null,
        reason: null,
        then: function (s) {
          n.push(s);
        }
      };
    return (
      e.then(
        function () {
          ((i.status = "fulfilled"), (i.value = t));
          for (var s = 0; s < n.length; s++) (0, n[s])(t);
        },
        function (s) {
          for (i.status = "rejected", i.reason = s, s = 0; s < n.length; s++)
            (0, n[s])(void 0);
        }
      ),
      i
    );
  }
  var Xd = x.S;
  x.S = function (e, t) {
    ((_m = xt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        gv(e, t),
      Xd !== null && Xd(e, t));
  };
  var nl = C(null);
  function Ws() {
    var e = nl.current;
    return e !== null ? e : nt.pooledCache;
  }
  function Pr(e, t) {
    t === null ? te(nl, nl.current) : te(nl, t.pool);
  }
  function Zd() {
    var e = Ws();
    return e === null ? null : { parent: ht._currentValue, pool: e };
  }
  var kl = Error(u(460)),
    eo = Error(u(474)),
    Wr = Error(u(542)),
    eu = { then: function () {} };
  function Id(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function Kd(e, t, n) {
    switch (
      ((n = e[n]),
      n === void 0 ? e.push(t) : n !== t && (t.then(Zn, Zn), (t = n)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), $d(e), e);
      default:
        if (typeof t.status == "string") t.then(Zn, Zn);
        else {
          if (((e = nt), e !== null && 100 < e.shellSuspendCounter))
            throw Error(u(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (i) {
                if (t.status === "pending") {
                  var s = t;
                  ((s.status = "fulfilled"), (s.value = i));
                }
              },
              function (i) {
                if (t.status === "pending") {
                  var s = t;
                  ((s.status = "rejected"), (s.reason = i));
                }
              }
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), $d(e), e);
        }
        throw ((ll = t), kl);
    }
  }
  function al(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((ll = n), kl)
        : n;
    }
  }
  var ll = null;
  function Jd() {
    if (ll === null) throw Error(u(459));
    var e = ll;
    return ((ll = null), e);
  }
  function $d(e) {
    if (e === kl || e === Wr) throw Error(u(483));
  }
  var Hl = null,
    Mi = 0;
  function tu(e) {
    var t = Mi;
    return ((Mi += 1), Hl === null && (Hl = []), Kd(Hl, e, t));
  }
  function xi(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function nu(e, t) {
    throw t.$$typeof === S
      ? Error(u(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          u(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e
          )
        ));
  }
  function Pd(e) {
    function t(_, w) {
      if (e) {
        var M = _.deletions;
        M === null ? ((_.deletions = [w]), (_.flags |= 16)) : M.push(w);
      }
    }
    function n(_, w) {
      if (!e) return null;
      for (; w !== null;) (t(_, w), (w = w.sibling));
      return null;
    }
    function i(_) {
      for (var w = new Map(); _ !== null;)
        (_.key !== null ? w.set(_.key, _) : w.set(_.index, _), (_ = _.sibling));
      return w;
    }
    function s(_, w) {
      return ((_ = Kn(_, w)), (_.index = 0), (_.sibling = null), _);
    }
    function c(_, w, M) {
      return (
        (_.index = M),
        e
          ? ((M = _.alternate),
            M !== null
              ? ((M = M.index), M < w ? ((_.flags |= 67108866), w) : M)
              : ((_.flags |= 67108866), w))
          : ((_.flags |= 1048576), w)
      );
    }
    function h(_) {
      return (e && _.alternate === null && (_.flags |= 67108866), _);
    }
    function g(_, w, M, Q) {
      return w === null || w.tag !== 6
        ? ((w = Ys(M, _.mode, Q)), (w.return = _), w)
        : ((w = s(w, M)), (w.return = _), w);
    }
    function E(_, w, M, Q) {
      var be = M.type;
      return be === j
        ? V(_, w, M.props.children, Q, M.key)
        : w !== null &&
            (w.elementType === be ||
              (typeof be == "object" &&
                be !== null &&
                be.$$typeof === A &&
                al(be) === w.type))
          ? ((w = s(w, M.props)), xi(w, M), (w.return = _), w)
          : ((w = Ir(M.type, M.key, M.props, null, _.mode, Q)),
            xi(w, M),
            (w.return = _),
            w);
    }
    function z(_, w, M, Q) {
      return w === null ||
        w.tag !== 4 ||
        w.stateNode.containerInfo !== M.containerInfo ||
        w.stateNode.implementation !== M.implementation
        ? ((w = Gs(M, _.mode, Q)), (w.return = _), w)
        : ((w = s(w, M.children || [])), (w.return = _), w);
    }
    function V(_, w, M, Q, be) {
      return w === null || w.tag !== 7
        ? ((w = Pa(M, _.mode, Q, be)), (w.return = _), w)
        : ((w = s(w, M)), (w.return = _), w);
    }
    function F(_, w, M) {
      if (
        (typeof w == "string" && w !== "") ||
        typeof w == "number" ||
        typeof w == "bigint"
      )
        return ((w = Ys("" + w, _.mode, M)), (w.return = _), w);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case R:
            return (
              (M = Ir(w.type, w.key, w.props, null, _.mode, M)),
              xi(M, w),
              (M.return = _),
              M
            );
          case N:
            return ((w = Gs(w, _.mode, M)), (w.return = _), w);
          case A:
            return ((w = al(w)), F(_, w, M));
        }
        if (Ue(w) || ne(w))
          return ((w = Pa(w, _.mode, M, null)), (w.return = _), w);
        if (typeof w.then == "function") return F(_, tu(w), M);
        if (w.$$typeof === Z) return F(_, $r(_, w), M);
        nu(_, w);
      }
      return null;
    }
    function L(_, w, M, Q) {
      var be = w !== null ? w.key : null;
      if (
        (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
      )
        return be !== null ? null : g(_, w, "" + M, Q);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case R:
            return M.key === be ? E(_, w, M, Q) : null;
          case N:
            return M.key === be ? z(_, w, M, Q) : null;
          case A:
            return ((M = al(M)), L(_, w, M, Q));
        }
        if (Ue(M) || ne(M)) return be !== null ? null : V(_, w, M, Q, null);
        if (typeof M.then == "function") return L(_, w, tu(M), Q);
        if (M.$$typeof === Z) return L(_, w, $r(_, M), Q);
        nu(_, M);
      }
      return null;
    }
    function k(_, w, M, Q, be) {
      if (
        (typeof Q == "string" && Q !== "") ||
        typeof Q == "number" ||
        typeof Q == "bigint"
      )
        return ((_ = _.get(M) || null), g(w, _, "" + Q, be));
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case R:
            return (
              (_ = _.get(Q.key === null ? M : Q.key) || null),
              E(w, _, Q, be)
            );
          case N:
            return (
              (_ = _.get(Q.key === null ? M : Q.key) || null),
              z(w, _, Q, be)
            );
          case A:
            return ((Q = al(Q)), k(_, w, M, Q, be));
        }
        if (Ue(Q) || ne(Q))
          return ((_ = _.get(M) || null), V(w, _, Q, be, null));
        if (typeof Q.then == "function") return k(_, w, M, tu(Q), be);
        if (Q.$$typeof === Z) return k(_, w, M, $r(w, Q), be);
        nu(w, Q);
      }
      return null;
    }
    function de(_, w, M, Q) {
      for (
        var be = null, Qe = null, pe = w, xe = (w = 0), He = null;
        pe !== null && xe < M.length;
        xe++
      ) {
        pe.index > xe ? ((He = pe), (pe = null)) : (He = pe.sibling);
        var Fe = L(_, pe, M[xe], Q);
        if (Fe === null) {
          pe === null && (pe = He);
          break;
        }
        (e && pe && Fe.alternate === null && t(_, pe),
          (w = c(Fe, w, xe)),
          Qe === null ? (be = Fe) : (Qe.sibling = Fe),
          (Qe = Fe),
          (pe = He));
      }
      if (xe === M.length) return (n(_, pe), Ve && Jn(_, xe), be);
      if (pe === null) {
        for (; xe < M.length; xe++)
          ((pe = F(_, M[xe], Q)),
            pe !== null &&
              ((w = c(pe, w, xe)),
              Qe === null ? (be = pe) : (Qe.sibling = pe),
              (Qe = pe)));
        return (Ve && Jn(_, xe), be);
      }
      for (pe = i(pe); xe < M.length; xe++)
        ((He = k(pe, _, xe, M[xe], Q)),
          He !== null &&
            (e &&
              He.alternate !== null &&
              pe.delete(He.key === null ? xe : He.key),
            (w = c(He, w, xe)),
            Qe === null ? (be = He) : (Qe.sibling = He),
            (Qe = He)));
      return (
        e &&
          pe.forEach(function (Ya) {
            return t(_, Ya);
          }),
        Ve && Jn(_, xe),
        be
      );
    }
    function Re(_, w, M, Q) {
      if (M == null) throw Error(u(151));
      for (
        var be = null,
          Qe = null,
          pe = w,
          xe = (w = 0),
          He = null,
          Fe = M.next();
        pe !== null && !Fe.done;
        xe++, Fe = M.next()
      ) {
        pe.index > xe ? ((He = pe), (pe = null)) : (He = pe.sibling);
        var Ya = L(_, pe, Fe.value, Q);
        if (Ya === null) {
          pe === null && (pe = He);
          break;
        }
        (e && pe && Ya.alternate === null && t(_, pe),
          (w = c(Ya, w, xe)),
          Qe === null ? (be = Ya) : (Qe.sibling = Ya),
          (Qe = Ya),
          (pe = He));
      }
      if (Fe.done) return (n(_, pe), Ve && Jn(_, xe), be);
      if (pe === null) {
        for (; !Fe.done; xe++, Fe = M.next())
          ((Fe = F(_, Fe.value, Q)),
            Fe !== null &&
              ((w = c(Fe, w, xe)),
              Qe === null ? (be = Fe) : (Qe.sibling = Fe),
              (Qe = Fe)));
        return (Ve && Jn(_, xe), be);
      }
      for (pe = i(pe); !Fe.done; xe++, Fe = M.next())
        ((Fe = k(pe, _, xe, Fe.value, Q)),
          Fe !== null &&
            (e &&
              Fe.alternate !== null &&
              pe.delete(Fe.key === null ? xe : Fe.key),
            (w = c(Fe, w, xe)),
            Qe === null ? (be = Fe) : (Qe.sibling = Fe),
            (Qe = Fe)));
      return (
        e &&
          pe.forEach(function (_1) {
            return t(_, _1);
          }),
        Ve && Jn(_, xe),
        be
      );
    }
    function tt(_, w, M, Q) {
      if (
        (typeof M == "object" &&
          M !== null &&
          M.type === j &&
          M.key === null &&
          (M = M.props.children),
        typeof M == "object" && M !== null)
      ) {
        switch (M.$$typeof) {
          case R:
            e: {
              for (var be = M.key; w !== null;) {
                if (w.key === be) {
                  if (((be = M.type), be === j)) {
                    if (w.tag === 7) {
                      (n(_, w.sibling),
                        (Q = s(w, M.props.children)),
                        (Q.return = _),
                        (_ = Q));
                      break e;
                    }
                  } else if (
                    w.elementType === be ||
                    (typeof be == "object" &&
                      be !== null &&
                      be.$$typeof === A &&
                      al(be) === w.type)
                  ) {
                    (n(_, w.sibling),
                      (Q = s(w, M.props)),
                      xi(Q, M),
                      (Q.return = _),
                      (_ = Q));
                    break e;
                  }
                  n(_, w);
                  break;
                } else t(_, w);
                w = w.sibling;
              }
              M.type === j
                ? ((Q = Pa(M.props.children, _.mode, Q, M.key)),
                  (Q.return = _),
                  (_ = Q))
                : ((Q = Ir(M.type, M.key, M.props, null, _.mode, Q)),
                  xi(Q, M),
                  (Q.return = _),
                  (_ = Q));
            }
            return h(_);
          case N:
            e: {
              for (be = M.key; w !== null;) {
                if (w.key === be)
                  if (
                    w.tag === 4 &&
                    w.stateNode.containerInfo === M.containerInfo &&
                    w.stateNode.implementation === M.implementation
                  ) {
                    (n(_, w.sibling),
                      (Q = s(w, M.children || [])),
                      (Q.return = _),
                      (_ = Q));
                    break e;
                  } else {
                    n(_, w);
                    break;
                  }
                else t(_, w);
                w = w.sibling;
              }
              ((Q = Gs(M, _.mode, Q)), (Q.return = _), (_ = Q));
            }
            return h(_);
          case A:
            return ((M = al(M)), tt(_, w, M, Q));
        }
        if (Ue(M)) return de(_, w, M, Q);
        if (ne(M)) {
          if (((be = ne(M)), typeof be != "function")) throw Error(u(150));
          return ((M = be.call(M)), Re(_, w, M, Q));
        }
        if (typeof M.then == "function") return tt(_, w, tu(M), Q);
        if (M.$$typeof === Z) return tt(_, w, $r(_, M), Q);
        nu(_, M);
      }
      return (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
        ? ((M = "" + M),
          w !== null && w.tag === 6
            ? (n(_, w.sibling), (Q = s(w, M)), (Q.return = _), (_ = Q))
            : (n(_, w), (Q = Ys(M, _.mode, Q)), (Q.return = _), (_ = Q)),
          h(_))
        : n(_, w);
    }
    return function (_, w, M, Q) {
      try {
        Mi = 0;
        var be = tt(_, w, M, Q);
        return ((Hl = null), be);
      } catch (pe) {
        if (pe === kl || pe === Wr) throw pe;
        var Qe = Xt(29, pe, null, _.mode);
        return ((Qe.lanes = Q), (Qe.return = _), Qe);
      }
    };
  }
  var il = Pd(!0),
    Wd = Pd(!1),
    Na = !1;
  function to(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function no(e, t) {
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
  function wa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Aa(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (((i = i.shared), (Ie & 2) !== 0)) {
      var s = i.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (i.pending = t),
        (t = Zr(e)),
        jd(e, null, n),
        t
      );
    }
    return (Xr(e, i, t, n), Zr(e));
  }
  function zi(e, t, n) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194048) !== 0))
    ) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Lr(e, n));
    }
  }
  function ao(e, t) {
    var n = e.updateQueue,
      i = e.alternate;
    if (i !== null && ((i = i.updateQueue), n === i)) {
      var s = null,
        c = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var h = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          (c === null ? (s = c = h) : (c = c.next = h), (n = n.next));
        } while (n !== null);
        c === null ? (s = c = t) : (c = c.next = t);
      } else s = c = t;
      ((n = {
        baseState: i.baseState,
        firstBaseUpdate: s,
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
  var lo = !1;
  function Ui() {
    if (lo) {
      var e = Bl;
      if (e !== null) throw e;
    }
  }
  function Li(e, t, n, i) {
    lo = !1;
    var s = e.updateQueue;
    Na = !1;
    var c = s.firstBaseUpdate,
      h = s.lastBaseUpdate,
      g = s.shared.pending;
    if (g !== null) {
      s.shared.pending = null;
      var E = g,
        z = E.next;
      ((E.next = null), h === null ? (c = z) : (h.next = z), (h = E));
      var V = e.alternate;
      V !== null &&
        ((V = V.updateQueue),
        (g = V.lastBaseUpdate),
        g !== h &&
          (g === null ? (V.firstBaseUpdate = z) : (g.next = z),
          (V.lastBaseUpdate = E)));
    }
    if (c !== null) {
      var F = s.baseState;
      ((h = 0), (V = z = E = null), (g = c));
      do {
        var L = g.lane & -536870913,
          k = L !== g.lane;
        if (k ? (ke & L) === L : (i & L) === L) {
          (L !== 0 && L === jl && (lo = !0),
            V !== null &&
              (V = V.next =
                {
                  lane: 0,
                  tag: g.tag,
                  payload: g.payload,
                  callback: null,
                  next: null
                }));
          e: {
            var de = e,
              Re = g;
            L = t;
            var tt = n;
            switch (Re.tag) {
              case 1:
                if (((de = Re.payload), typeof de == "function")) {
                  F = de.call(tt, F, L);
                  break e;
                }
                F = de;
                break e;
              case 3:
                de.flags = (de.flags & -65537) | 128;
              case 0:
                if (
                  ((de = Re.payload),
                  (L = typeof de == "function" ? de.call(tt, F, L) : de),
                  L == null)
                )
                  break e;
                F = b({}, F, L);
                break e;
              case 2:
                Na = !0;
            }
          }
          ((L = g.callback),
            L !== null &&
              ((e.flags |= 64),
              k && (e.flags |= 8192),
              (k = s.callbacks),
              k === null ? (s.callbacks = [L]) : k.push(L)));
        } else
          ((k = {
            lane: L,
            tag: g.tag,
            payload: g.payload,
            callback: g.callback,
            next: null
          }),
            V === null ? ((z = V = k), (E = F)) : (V = V.next = k),
            (h |= L));
        if (((g = g.next), g === null)) {
          if (((g = s.shared.pending), g === null)) break;
          ((k = g),
            (g = k.next),
            (k.next = null),
            (s.lastBaseUpdate = k),
            (s.shared.pending = null));
        }
      } while (!0);
      (V === null && (E = F),
        (s.baseState = E),
        (s.firstBaseUpdate = z),
        (s.lastBaseUpdate = V),
        c === null && (s.shared.lanes = 0),
        (xa |= h),
        (e.lanes = h),
        (e.memoizedState = F));
    }
  }
  function eh(e, t) {
    if (typeof e != "function") throw Error(u(191, e));
    e.call(t);
  }
  function th(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++) eh(n[e], t);
  }
  var ql = C(null),
    au = C(0);
  function nh(e, t) {
    ((e = ua), te(au, e), te(ql, t), (ua = e | t.baseLanes));
  }
  function io() {
    (te(au, ua), te(ql, ql.current));
  }
  function ro() {
    ((ua = au.current), q(ql), q(au));
  }
  var Zt = C(null),
    on = null;
  function Da(e) {
    var t = e.alternate;
    (te(ft, ft.current & 1),
      te(Zt, e),
      on === null &&
        (t === null || ql.current !== null || t.memoizedState !== null) &&
        (on = e));
  }
  function uo(e) {
    (te(ft, ft.current), te(Zt, e), on === null && (on = e));
  }
  function ah(e) {
    e.tag === 22
      ? (te(ft, ft.current), te(Zt, e), on === null && (on = e))
      : _a();
  }
  function _a() {
    (te(ft, ft.current), te(Zt, Zt.current));
  }
  function It(e) {
    (q(Zt), on === e && (on = null), q(ft));
  }
  var ft = C(0);
  function lu(e) {
    for (var t = e; t !== null;) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || mc(n) || yc(n)))
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
  var Wn = 0,
    Me = null,
    We = null,
    mt = null,
    iu = !1,
    Vl = !1,
    rl = !1,
    ru = 0,
    ji = 0,
    Yl = null,
    bv = 0;
  function ot() {
    throw Error(u(321));
  }
  function so(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Ft(e[n], t[n])) return !1;
    return !0;
  }
  function oo(e, t, n, i, s, c) {
    return (
      (Wn = c),
      (Me = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (x.H = e === null || e.memoizedState === null ? qh : No),
      (rl = !1),
      (c = n(i, s)),
      (rl = !1),
      Vl && (c = ih(t, n, i, s)),
      lh(e),
      c
    );
  }
  function lh(e) {
    x.H = Hi;
    var t = We !== null && We.next !== null;
    if (((Wn = 0), (mt = We = Me = null), (iu = !1), (ji = 0), (Yl = null), t))
      throw Error(u(300));
    e === null ||
      yt ||
      ((e = e.dependencies), e !== null && Jr(e) && (yt = !0));
  }
  function ih(e, t, n, i) {
    Me = e;
    var s = 0;
    do {
      if ((Vl && (Yl = null), (ji = 0), (Vl = !1), 25 <= s))
        throw Error(u(301));
      if (((s += 1), (mt = We = null), e.updateQueue != null)) {
        var c = e.updateQueue;
        ((c.lastEffect = null),
          (c.events = null),
          (c.stores = null),
          c.memoCache != null && (c.memoCache.index = 0));
      }
      ((x.H = Vh), (c = t(n, i)));
    } while (Vl);
    return c;
  }
  function Ev() {
    var e = x.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? Bi(t) : t),
      (e = e.useState()[0]),
      (We !== null ? We.memoizedState : null) !== e && (Me.flags |= 1024),
      t
    );
  }
  function co() {
    var e = ru !== 0;
    return ((ru = 0), e);
  }
  function fo(e, t, n) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~n));
  }
  function ho(e) {
    if (iu) {
      for (e = e.memoizedState; e !== null;) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      iu = !1;
    }
    ((Wn = 0), (mt = We = Me = null), (Vl = !1), (ji = ru = 0), (Yl = null));
  }
  function Lt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return (mt === null ? (Me.memoizedState = mt = e) : (mt = mt.next = e), mt);
  }
  function dt() {
    if (We === null) {
      var e = Me.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = We.next;
    var t = mt === null ? Me.memoizedState : mt.next;
    if (t !== null) ((mt = t), (We = e));
    else {
      if (e === null)
        throw Me.alternate === null ? Error(u(467)) : Error(u(310));
      ((We = e),
        (e = {
          memoizedState: We.memoizedState,
          baseState: We.baseState,
          baseQueue: We.baseQueue,
          queue: We.queue,
          next: null
        }),
        mt === null ? (Me.memoizedState = mt = e) : (mt = mt.next = e));
    }
    return mt;
  }
  function uu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Bi(e) {
    var t = ji;
    return (
      (ji += 1),
      Yl === null && (Yl = []),
      (e = Kd(Yl, e, t)),
      (t = Me),
      (mt === null ? t.memoizedState : mt.next) === null &&
        ((t = t.alternate),
        (x.H = t === null || t.memoizedState === null ? qh : No)),
      e
    );
  }
  function su(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Bi(e);
      if (e.$$typeof === Z) return wt(e);
    }
    throw Error(u(438, String(e)));
  }
  function mo(e) {
    var t = null,
      n = Me.updateQueue;
    if ((n !== null && (t = n.memoCache), t == null)) {
      var i = Me.alternate;
      i !== null &&
        ((i = i.updateQueue),
        i !== null &&
          ((i = i.memoCache),
          i != null &&
            (t = {
              data: i.data.map(function (s) {
                return s.slice();
              }),
              index: 0
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      n === null && ((n = uu()), (Me.updateQueue = n)),
      (n.memoCache = t),
      (n = t.data[t.index]),
      n === void 0)
    )
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++) n[i] = re;
    return (t.index++, n);
  }
  function ea(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ou(e) {
    var t = dt();
    return yo(t, We, e);
  }
  function yo(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(u(311));
    i.lastRenderedReducer = n;
    var s = e.baseQueue,
      c = i.pending;
    if (c !== null) {
      if (s !== null) {
        var h = s.next;
        ((s.next = c.next), (c.next = h));
      }
      ((t.baseQueue = s = c), (i.pending = null));
    }
    if (((c = e.baseState), s === null)) e.memoizedState = c;
    else {
      t = s.next;
      var g = (h = null),
        E = null,
        z = t,
        V = !1;
      do {
        var F = z.lane & -536870913;
        if (F !== z.lane ? (ke & F) === F : (Wn & F) === F) {
          var L = z.revertLane;
          if (L === 0)
            (E !== null &&
              (E = E.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null
                }),
              F === jl && (V = !0));
          else if ((Wn & L) === L) {
            ((z = z.next), L === jl && (V = !0));
            continue;
          } else
            ((F = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }),
              E === null ? ((g = E = F), (h = c)) : (E = E.next = F),
              (Me.lanes |= L),
              (xa |= L));
          ((F = z.action),
            rl && n(c, F),
            (c = z.hasEagerState ? z.eagerState : n(c, F)));
        } else
          ((L = {
            lane: F,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }),
            E === null ? ((g = E = L), (h = c)) : (E = E.next = L),
            (Me.lanes |= F),
            (xa |= F));
        z = z.next;
      } while (z !== null && z !== t);
      if (
        (E === null ? (h = c) : (E.next = g),
        !Ft(c, e.memoizedState) && ((yt = !0), V && ((n = Bl), n !== null)))
      )
        throw n;
      ((e.memoizedState = c),
        (e.baseState = h),
        (e.baseQueue = E),
        (i.lastRenderedState = c));
    }
    return (s === null && (i.lanes = 0), [e.memoizedState, i.dispatch]);
  }
  function po(e) {
    var t = dt(),
      n = t.queue;
    if (n === null) throw Error(u(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch,
      s = n.pending,
      c = t.memoizedState;
    if (s !== null) {
      n.pending = null;
      var h = (s = s.next);
      do ((c = e(c, h.action)), (h = h.next));
      while (h !== s);
      (Ft(c, t.memoizedState) || (yt = !0),
        (t.memoizedState = c),
        t.baseQueue === null && (t.baseState = c),
        (n.lastRenderedState = c));
    }
    return [c, i];
  }
  function rh(e, t, n) {
    var i = Me,
      s = dt(),
      c = Ve;
    if (c) {
      if (n === void 0) throw Error(u(407));
      n = n();
    } else n = t();
    var h = !Ft((We || s).memoizedState, n);
    if (
      (h && ((s.memoizedState = n), (yt = !0)),
      (s = s.queue),
      bo(oh.bind(null, i, s, e), [e]),
      s.getSnapshot !== t || h || (mt !== null && mt.memoizedState.tag & 1))
    ) {
      if (
        ((i.flags |= 2048),
        Gl(9, { destroy: void 0 }, sh.bind(null, i, s, n, t), null),
        nt === null)
      )
        throw Error(u(349));
      c || (Wn & 127) !== 0 || uh(i, t, n);
    }
    return n;
  }
  function uh(e, t, n) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: n }),
      (t = Me.updateQueue),
      t === null
        ? ((t = uu()), (Me.updateQueue = t), (t.stores = [e]))
        : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
  }
  function sh(e, t, n, i) {
    ((t.value = n), (t.getSnapshot = i), ch(t) && fh(e));
  }
  function oh(e, t, n) {
    return n(function () {
      ch(t) && fh(e);
    });
  }
  function ch(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Ft(e, n);
    } catch {
      return !0;
    }
  }
  function fh(e) {
    var t = $a(e, 2);
    t !== null && Qt(t, e, 2);
  }
  function go(e) {
    var t = Lt();
    if (typeof e == "function") {
      var n = e;
      if (((e = n()), rl)) {
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
        lastRenderedReducer: ea,
        lastRenderedState: e
      }),
      t
    );
  }
  function dh(e, t, n, i) {
    return ((e.baseState = n), yo(e, We, typeof i == "function" ? i : ea));
  }
  function Sv(e, t, n, i, s) {
    if (du(e)) throw Error(u(485));
    if (((e = t.action), e !== null)) {
      var c = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (h) {
          c.listeners.push(h);
        }
      };
      (x.T !== null ? n(!0) : (c.isTransition = !1),
        i(c),
        (n = t.pending),
        n === null
          ? ((c.next = t.pending = c), hh(t, c))
          : ((c.next = n.next), (t.pending = n.next = c)));
    }
  }
  function hh(e, t) {
    var n = t.action,
      i = t.payload,
      s = e.state;
    if (t.isTransition) {
      var c = x.T,
        h = {};
      x.T = h;
      try {
        var g = n(s, i),
          E = x.S;
        (E !== null && E(h, g), mh(e, t, g));
      } catch (z) {
        vo(e, t, z);
      } finally {
        (c !== null && h.types !== null && (c.types = h.types), (x.T = c));
      }
    } else
      try {
        ((c = n(s, i)), mh(e, t, c));
      } catch (z) {
        vo(e, t, z);
      }
  }
  function mh(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (i) {
            yh(e, t, i);
          },
          function (i) {
            return vo(e, t, i);
          }
        )
      : yh(e, t, n);
  }
  function yh(e, t, n) {
    ((t.status = "fulfilled"),
      (t.value = n),
      ph(t),
      (e.state = n),
      (t = e.pending),
      t !== null &&
        ((n = t.next),
        n === t ? (e.pending = null) : ((n = n.next), (t.next = n), hh(e, n))));
  }
  function vo(e, t, n) {
    var i = e.pending;
    if (((e.pending = null), i !== null)) {
      i = i.next;
      do ((t.status = "rejected"), (t.reason = n), ph(t), (t = t.next));
      while (t !== i);
    }
    e.action = null;
  }
  function ph(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function gh(e, t) {
    return t;
  }
  function vh(e, t) {
    if (Ve) {
      var n = nt.formState;
      if (n !== null) {
        e: {
          var i = Me;
          if (Ve) {
            if (it) {
              t: {
                for (var s = it, c = sn; s.nodeType !== 8;) {
                  if (!c) {
                    s = null;
                    break t;
                  }
                  if (((s = cn(s.nextSibling)), s === null)) {
                    s = null;
                    break t;
                  }
                }
                ((c = s.data), (s = c === "F!" || c === "F" ? s : null));
              }
              if (s) {
                ((it = cn(s.nextSibling)), (i = s.data === "F!"));
                break e;
              }
            }
            Ra(i);
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
        lastRenderedReducer: gh,
        lastRenderedState: t
      }),
      (n.queue = i),
      (n = Bh.bind(null, Me, i)),
      (i.dispatch = n),
      (i = go(!1)),
      (c = Co.bind(null, Me, !1, i.queue)),
      (i = Lt()),
      (s = { state: t, dispatch: null, action: e, pending: null }),
      (i.queue = s),
      (n = Sv.bind(null, Me, s, c, n)),
      (s.dispatch = n),
      (i.memoizedState = e),
      [t, n, !1]
    );
  }
  function bh(e) {
    var t = dt();
    return Eh(t, We, e);
  }
  function Eh(e, t, n) {
    if (
      ((t = yo(e, t, gh)[0]),
      (e = ou(ea)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var i = Bi(t);
      } catch (h) {
        throw h === kl ? Wr : h;
      }
    else i = t;
    t = dt();
    var s = t.queue,
      c = s.dispatch;
    return (
      n !== t.memoizedState &&
        ((Me.flags |= 2048),
        Gl(9, { destroy: void 0 }, Tv.bind(null, s, n), null)),
      [i, c, e]
    );
  }
  function Tv(e, t) {
    e.action = t;
  }
  function Sh(e) {
    var t = dt(),
      n = We;
    if (n !== null) return Eh(t, n, e);
    (dt(), (t = t.memoizedState), (n = dt()));
    var i = n.queue.dispatch;
    return ((n.memoizedState = e), [t, i, !1]);
  }
  function Gl(e, t, n, i) {
    return (
      (e = { tag: e, create: n, deps: i, inst: t, next: null }),
      (t = Me.updateQueue),
      t === null && ((t = uu()), (Me.updateQueue = t)),
      (n = t.lastEffect),
      n === null
        ? (t.lastEffect = e.next = e)
        : ((i = n.next), (n.next = e), (e.next = i), (t.lastEffect = e)),
      e
    );
  }
  function Th() {
    return dt().memoizedState;
  }
  function cu(e, t, n, i) {
    var s = Lt();
    ((Me.flags |= e),
      (s.memoizedState = Gl(
        1 | t,
        { destroy: void 0 },
        n,
        i === void 0 ? null : i
      )));
  }
  function fu(e, t, n, i) {
    var s = dt();
    i = i === void 0 ? null : i;
    var c = s.memoizedState.inst;
    We !== null && i !== null && so(i, We.memoizedState.deps)
      ? (s.memoizedState = Gl(t, c, n, i))
      : ((Me.flags |= e), (s.memoizedState = Gl(1 | t, c, n, i)));
  }
  function Rh(e, t) {
    cu(8390656, 8, e, t);
  }
  function bo(e, t) {
    fu(2048, 8, e, t);
  }
  function Rv(e) {
    Me.flags |= 4;
    var t = Me.updateQueue;
    if (t === null) ((t = uu()), (Me.updateQueue = t), (t.events = [e]));
    else {
      var n = t.events;
      n === null ? (t.events = [e]) : n.push(e);
    }
  }
  function Ch(e) {
    var t = dt().memoizedState;
    return (
      Rv({ ref: t, nextImpl: e }),
      function () {
        if ((Ie & 2) !== 0) throw Error(u(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Nh(e, t) {
    return fu(4, 2, e, t);
  }
  function wh(e, t) {
    return fu(4, 4, e, t);
  }
  function Ah(e, t) {
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
  function Dh(e, t, n) {
    ((n = n != null ? n.concat([e]) : null), fu(4, 4, Ah.bind(null, t, e), n));
  }
  function Eo() {}
  function _h(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && so(t, i[1]) ? i[0] : ((n.memoizedState = [e, t]), e);
  }
  function Oh(e, t) {
    var n = dt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && so(t, i[1])) return i[0];
    if (((i = e()), rl)) {
      St(!0);
      try {
        e();
      } finally {
        St(!1);
      }
    }
    return ((n.memoizedState = [i, t]), i);
  }
  function So(e, t, n) {
    return n === void 0 || ((Wn & 1073741824) !== 0 && (ke & 261930) === 0)
      ? (e.memoizedState = t)
      : ((e.memoizedState = n), (e = Mm()), (Me.lanes |= e), (xa |= e), n);
  }
  function Mh(e, t, n, i) {
    return Ft(n, t)
      ? n
      : ql.current !== null
        ? ((e = So(e, n, i)), Ft(e, t) || (yt = !0), e)
        : (Wn & 42) === 0 || ((Wn & 1073741824) !== 0 && (ke & 261930) === 0)
          ? ((yt = !0), (e.memoizedState = n))
          : ((e = Mm()), (Me.lanes |= e), (xa |= e), t);
  }
  function xh(e, t, n, i, s) {
    var c = P.p;
    P.p = c !== 0 && 8 > c ? c : 8;
    var h = x.T,
      g = {};
    ((x.T = g), Co(e, !1, t, n));
    try {
      var E = s(),
        z = x.S;
      if (
        (z !== null && z(g, E),
        E !== null && typeof E == "object" && typeof E.then == "function")
      ) {
        var V = vv(E, i);
        ki(e, t, V, $t(e));
      } else ki(e, t, i, $t(e));
    } catch (F) {
      ki(e, t, { then: function () {}, status: "rejected", reason: F }, $t());
    } finally {
      ((P.p = c),
        h !== null && g.types !== null && (h.types = g.types),
        (x.T = h));
    }
  }
  function Cv() {}
  function To(e, t, n, i) {
    if (e.tag !== 5) throw Error(u(476));
    var s = zh(e).queue;
    xh(
      e,
      s,
      t,
      me,
      n === null
        ? Cv
        : function () {
            return (Uh(e), n(i));
          }
    );
  }
  function zh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: me,
      baseState: me,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ea,
        lastRenderedState: me
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
          lastRenderedReducer: ea,
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
  function Uh(e) {
    var t = zh(e);
    (t.next === null && (t = e.alternate.memoizedState),
      ki(e, t.next.queue, {}, $t()));
  }
  function Ro() {
    return wt(tr);
  }
  function Lh() {
    return dt().memoizedState;
  }
  function jh() {
    return dt().memoizedState;
  }
  function Nv(e) {
    for (var t = e.return; t !== null;) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = $t();
          e = wa(n);
          var i = Aa(t, e, n);
          (i !== null && (Qt(i, t, n), zi(i, t, n)),
            (t = { cache: $s() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function wv(e, t, n) {
    var i = $t();
    ((n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }),
      du(e)
        ? kh(t, n)
        : ((n = qs(e, t, n, i)), n !== null && (Qt(n, e, i), Hh(n, t, i))));
  }
  function Bh(e, t, n) {
    var i = $t();
    ki(e, t, n, i);
  }
  function ki(e, t, n, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (du(e)) kh(t, s);
    else {
      var c = e.alternate;
      if (
        e.lanes === 0 &&
        (c === null || c.lanes === 0) &&
        ((c = t.lastRenderedReducer), c !== null)
      )
        try {
          var h = t.lastRenderedState,
            g = c(h, n);
          if (((s.hasEagerState = !0), (s.eagerState = g), Ft(g, h)))
            return (Xr(e, t, s, 0), nt === null && Fr(), !1);
        } catch {}
      if (((n = qs(e, t, s, i)), n !== null))
        return (Qt(n, e, i), Hh(n, t, i), !0);
    }
    return !1;
  }
  function Co(e, t, n, i) {
    if (
      ((i = {
        lane: 2,
        revertLane: nc(),
        gesture: null,
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }),
      du(e))
    ) {
      if (t) throw Error(u(479));
    } else ((t = qs(e, n, i, 2)), t !== null && Qt(t, e, 2));
  }
  function du(e) {
    var t = e.alternate;
    return e === Me || (t !== null && t === Me);
  }
  function kh(e, t) {
    Vl = iu = !0;
    var n = e.pending;
    (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
      (e.pending = t));
  }
  function Hh(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      ((i &= e.pendingLanes), (n |= i), (t.lanes = n), Lr(e, n));
    }
  }
  var Hi = {
    readContext: wt,
    use: su,
    useCallback: ot,
    useContext: ot,
    useEffect: ot,
    useImperativeHandle: ot,
    useLayoutEffect: ot,
    useInsertionEffect: ot,
    useMemo: ot,
    useReducer: ot,
    useRef: ot,
    useState: ot,
    useDebugValue: ot,
    useDeferredValue: ot,
    useTransition: ot,
    useSyncExternalStore: ot,
    useId: ot,
    useHostTransitionStatus: ot,
    useFormState: ot,
    useActionState: ot,
    useOptimistic: ot,
    useMemoCache: ot,
    useCacheRefresh: ot
  };
  Hi.useEffectEvent = ot;
  var qh = {
      readContext: wt,
      use: su,
      useCallback: function (e, t) {
        return ((Lt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: wt,
      useEffect: Rh,
      useImperativeHandle: function (e, t, n) {
        ((n = n != null ? n.concat([e]) : null),
          cu(4194308, 4, Ah.bind(null, t, e), n));
      },
      useLayoutEffect: function (e, t) {
        return cu(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        cu(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var n = Lt();
        t = t === void 0 ? null : t;
        var i = e();
        if (rl) {
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
          var s = n(t);
          if (rl) {
            St(!0);
            try {
              n(t);
            } finally {
              St(!1);
            }
          }
        } else s = t;
        return (
          (i.memoizedState = i.baseState = s),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: s
          }),
          (i.queue = e),
          (e = e.dispatch = wv.bind(null, Me, e)),
          [i.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Lt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = go(e);
        var t = e.queue,
          n = Bh.bind(null, Me, t);
        return ((t.dispatch = n), [e.memoizedState, n]);
      },
      useDebugValue: Eo,
      useDeferredValue: function (e, t) {
        var n = Lt();
        return So(n, e, t);
      },
      useTransition: function () {
        var e = go(!1);
        return (
          (e = xh.bind(null, Me, e.queue, !0, !1)),
          (Lt().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, n) {
        var i = Me,
          s = Lt();
        if (Ve) {
          if (n === void 0) throw Error(u(407));
          n = n();
        } else {
          if (((n = t()), nt === null)) throw Error(u(349));
          (ke & 127) !== 0 || uh(i, t, n);
        }
        s.memoizedState = n;
        var c = { value: n, getSnapshot: t };
        return (
          (s.queue = c),
          Rh(oh.bind(null, i, c, e), [e]),
          (i.flags |= 2048),
          Gl(9, { destroy: void 0 }, sh.bind(null, i, c, n, t), null),
          n
        );
      },
      useId: function () {
        var e = Lt(),
          t = nt.identifierPrefix;
        if (Ve) {
          var n = An,
            i = wn;
          ((n = (i & ~(1 << (32 - _t(i) - 1))).toString(32) + n),
            (t = "_" + t + "R_" + n),
            (n = ru++),
            0 < n && (t += "H" + n.toString(32)),
            (t += "_"));
        } else ((n = bv++), (t = "_" + t + "r_" + n.toString(32) + "_"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: Ro,
      useFormState: vh,
      useActionState: vh,
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
          (t = Co.bind(null, Me, !0, n)),
          (n.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: mo,
      useCacheRefresh: function () {
        return (Lt().memoizedState = Nv.bind(null, Me));
      },
      useEffectEvent: function (e) {
        var t = Lt(),
          n = { impl: e };
        return (
          (t.memoizedState = n),
          function () {
            if ((Ie & 2) !== 0) throw Error(u(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      }
    },
    No = {
      readContext: wt,
      use: su,
      useCallback: _h,
      useContext: wt,
      useEffect: bo,
      useImperativeHandle: Dh,
      useInsertionEffect: Nh,
      useLayoutEffect: wh,
      useMemo: Oh,
      useReducer: ou,
      useRef: Th,
      useState: function () {
        return ou(ea);
      },
      useDebugValue: Eo,
      useDeferredValue: function (e, t) {
        var n = dt();
        return Mh(n, We.memoizedState, e, t);
      },
      useTransition: function () {
        var e = ou(ea)[0],
          t = dt().memoizedState;
        return [typeof e == "boolean" ? e : Bi(e), t];
      },
      useSyncExternalStore: rh,
      useId: Lh,
      useHostTransitionStatus: Ro,
      useFormState: bh,
      useActionState: bh,
      useOptimistic: function (e, t) {
        var n = dt();
        return dh(n, We, e, t);
      },
      useMemoCache: mo,
      useCacheRefresh: jh
    };
  No.useEffectEvent = Ch;
  var Vh = {
    readContext: wt,
    use: su,
    useCallback: _h,
    useContext: wt,
    useEffect: bo,
    useImperativeHandle: Dh,
    useInsertionEffect: Nh,
    useLayoutEffect: wh,
    useMemo: Oh,
    useReducer: po,
    useRef: Th,
    useState: function () {
      return po(ea);
    },
    useDebugValue: Eo,
    useDeferredValue: function (e, t) {
      var n = dt();
      return We === null ? So(n, e, t) : Mh(n, We.memoizedState, e, t);
    },
    useTransition: function () {
      var e = po(ea)[0],
        t = dt().memoizedState;
      return [typeof e == "boolean" ? e : Bi(e), t];
    },
    useSyncExternalStore: rh,
    useId: Lh,
    useHostTransitionStatus: Ro,
    useFormState: Sh,
    useActionState: Sh,
    useOptimistic: function (e, t) {
      var n = dt();
      return We !== null
        ? dh(n, We, e, t)
        : ((n.baseState = e), [e, n.queue.dispatch]);
    },
    useMemoCache: mo,
    useCacheRefresh: jh
  };
  Vh.useEffectEvent = Ch;
  function wo(e, t, n, i) {
    ((t = e.memoizedState),
      (n = n(i, t)),
      (n = n == null ? t : b({}, t, n)),
      (e.memoizedState = n),
      e.lanes === 0 && (e.updateQueue.baseState = n));
  }
  var Ao = {
    enqueueSetState: function (e, t, n) {
      e = e._reactInternals;
      var i = $t(),
        s = wa(i);
      ((s.payload = t),
        n != null && (s.callback = n),
        (t = Aa(e, s, i)),
        t !== null && (Qt(t, e, i), zi(t, e, i)));
    },
    enqueueReplaceState: function (e, t, n) {
      e = e._reactInternals;
      var i = $t(),
        s = wa(i);
      ((s.tag = 1),
        (s.payload = t),
        n != null && (s.callback = n),
        (t = Aa(e, s, i)),
        t !== null && (Qt(t, e, i), zi(t, e, i)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var n = $t(),
        i = wa(n);
      ((i.tag = 2),
        t != null && (i.callback = t),
        (t = Aa(e, i, n)),
        t !== null && (Qt(t, e, n), zi(t, e, n)));
    }
  };
  function Yh(e, t, n, i, s, c, h) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(i, c, h)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Ni(n, i) || !Ni(s, c)
          : !0
    );
  }
  function Gh(e, t, n, i) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(n, i),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(n, i),
      t.state !== e && Ao.enqueueReplaceState(t, t.state, null));
  }
  function ul(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t) i !== "ref" && (n[i] = t[i]);
    }
    if ((e = e.defaultProps)) {
      n === t && (n = b({}, n));
      for (var s in e) n[s] === void 0 && (n[s] = e[s]);
    }
    return n;
  }
  function Qh(e) {
    Qr(e);
  }
  function Fh(e) {
    console.error(e);
  }
  function Xh(e) {
    Qr(e);
  }
  function hu(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Zh(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function () {
        throw s;
      });
    }
  }
  function Do(e, t, n) {
    return (
      (n = wa(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        hu(e, t);
      }),
      n
    );
  }
  function Ih(e) {
    return ((e = wa(e)), (e.tag = 3), e);
  }
  function Kh(e, t, n, i) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var c = i.value;
      ((e.payload = function () {
        return s(c);
      }),
        (e.callback = function () {
          Zh(t, n, i);
        }));
    }
    var h = n.stateNode;
    h !== null &&
      typeof h.componentDidCatch == "function" &&
      (e.callback = function () {
        (Zh(t, n, i),
          typeof s != "function" &&
            (za === null ? (za = new Set([this])) : za.add(this)));
        var g = i.stack;
        this.componentDidCatch(i.value, {
          componentStack: g !== null ? g : ""
        });
      });
  }
  function Av(e, t, n, i, s) {
    if (
      ((n.flags |= 32768),
      i !== null && typeof i == "object" && typeof i.then == "function")
    ) {
      if (
        ((t = n.alternate),
        t !== null && Ll(t, n, s, !0),
        (n = Zt.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              on === null ? Nu() : n.alternate === null && ct === 0 && (ct = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = s),
              i === eu
                ? (n.flags |= 16384)
                : ((t = n.updateQueue),
                  t === null ? (n.updateQueue = new Set([i])) : t.add(i),
                  Wo(e, i, s)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              i === eu
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
                  Wo(e, i, s)),
              !1
            );
        }
        throw Error(u(435, n.tag));
      }
      return (Wo(e, i, s), Nu(), !1);
    }
    if (Ve)
      return (
        (t = Zt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = s),
            i !== Xs && ((e = Error(u(422), { cause: i })), Di(ln(e, n))))
          : (i !== Xs && ((t = Error(u(423), { cause: i })), Di(ln(t, n))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (s &= -s),
            (e.lanes |= s),
            (i = ln(i, n)),
            (s = Do(e.stateNode, i, s)),
            ao(e, s),
            ct !== 4 && (ct = 2)),
        !1
      );
    var c = Error(u(520), { cause: i });
    if (
      ((c = ln(c, n)),
      Zi === null ? (Zi = [c]) : Zi.push(c),
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
            (e = s & -s),
            (n.lanes |= e),
            (e = Do(n.stateNode, i, e)),
            ao(n, e),
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
                  (za === null || !za.has(c)))))
          )
            return (
              (n.flags |= 65536),
              (s &= -s),
              (n.lanes |= s),
              (s = Ih(s)),
              Kh(s, e, n, i),
              ao(n, s),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var _o = Error(u(461)),
    yt = !1;
  function At(e, t, n, i) {
    t.child = e === null ? Wd(t, null, n, i) : il(t, e.child, n, i);
  }
  function Jh(e, t, n, i, s) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var h = {};
      for (var g in i) g !== "ref" && (h[g] = i[g]);
    } else h = i;
    return (
      tl(t),
      (i = oo(e, t, n, h, c, s)),
      (g = co()),
      e !== null && !yt
        ? (fo(e, t, s), ta(e, t, s))
        : (Ve && g && Qs(t), (t.flags |= 1), At(e, t, i, s), t.child)
    );
  }
  function $h(e, t, n, i, s) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" &&
        !Vs(c) &&
        c.defaultProps === void 0 &&
        n.compare === null
        ? ((t.tag = 15), (t.type = c), Ph(e, t, c, i, s))
        : ((e = Ir(n.type, null, i, t, t.mode, s)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((c = e.child), !Bo(e, s))) {
      var h = c.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Ni), n(h, i) && e.ref === t.ref)
      )
        return ta(e, t, s);
    }
    return (
      (t.flags |= 1),
      (e = Kn(c, i)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Ph(e, t, n, i, s) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Ni(c, i) && e.ref === t.ref)
        if (((yt = !1), (t.pendingProps = i = c), Bo(e, s)))
          (e.flags & 131072) !== 0 && (yt = !0);
        else return ((t.lanes = e.lanes), ta(e, t, s));
    }
    return Oo(e, t, n, i, s);
  }
  function Wh(e, t, n, i) {
    var s = i.children,
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
          for (i = t.child = e.child, s = 0; i !== null;)
            ((s = s | i.lanes | i.childLanes), (i = i.sibling));
          i = s & ~c;
        } else ((i = 0), (t.child = null));
        return em(e, t, c, n, i);
      }
      if ((n & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && Pr(t, c !== null ? c.cachePool : null),
          c !== null ? nh(t, c) : io(),
          ah(t));
      else
        return (
          (i = t.lanes = 536870912),
          em(e, t, c !== null ? c.baseLanes | n : n, n, i)
        );
    } else
      c !== null
        ? (Pr(t, c.cachePool), nh(t, c), _a(), (t.memoizedState = null))
        : (e !== null && Pr(t, null), io(), _a());
    return (At(e, t, s, n), t.child);
  }
  function qi(e, t) {
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
  function em(e, t, n, i, s) {
    var c = Ws();
    return (
      (c = c === null ? null : { parent: ht._currentValue, pool: c }),
      (t.memoizedState = { baseLanes: n, cachePool: c }),
      e !== null && Pr(t, null),
      io(),
      ah(t),
      e !== null && Ll(e, t, i, !0),
      (t.childLanes = s),
      null
    );
  }
  function mu(e, t) {
    return (
      (t = pu({ mode: t.mode, children: t.children }, e.mode)),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function tm(e, t, n) {
    return (
      il(t, e.child, null, n),
      (e = mu(t, t.pendingProps)),
      (e.flags |= 2),
      It(t),
      (t.memoizedState = null),
      e
    );
  }
  function Dv(e, t, n) {
    var i = t.pendingProps,
      s = (t.flags & 128) !== 0;
    if (((t.flags &= -129), e === null)) {
      if (Ve) {
        if (i.mode === "hidden")
          return ((e = mu(t, i)), (t.lanes = 536870912), qi(null, e));
        if (
          (uo(t),
          (e = it)
            ? ((e = h0(e, sn)),
              (e = e !== null && e.data === "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Sa !== null ? { id: wn, overflow: An } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = kd(e)),
                (n.return = t),
                (t.child = n),
                (Nt = t),
                (it = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return ((t.lanes = 536870912), null);
      }
      return mu(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var h = c.dehydrated;
      if ((uo(t), s))
        if (t.flags & 256) ((t.flags &= -257), (t = tm(e, t, n)));
        else if (t.memoizedState !== null)
          ((t.child = e.child), (t.flags |= 128), (t = null));
        else throw Error(u(558));
      else if (
        (yt || Ll(e, t, n, !1), (s = (n & e.childLanes) !== 0), yt || s)
      ) {
        if (
          ((i = nt),
          i !== null && ((h = T(i, n)), h !== 0 && h !== c.retryLane))
        )
          throw ((c.retryLane = h), $a(e, h), Qt(i, e, h), _o);
        (Nu(), (t = tm(e, t, n)));
      } else
        ((e = c.treeContext),
          (it = cn(h.nextSibling)),
          (Nt = t),
          (Ve = !0),
          (Ta = null),
          (sn = !1),
          e !== null && Vd(t, e),
          (t = mu(t, i)),
          (t.flags |= 4096));
      return t;
    }
    return (
      (e = Kn(e.child, { mode: i.mode, children: i.children })),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function yu(e, t) {
    var n = t.ref;
    if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(u(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Oo(e, t, n, i, s) {
    return (
      tl(t),
      (n = oo(e, t, n, i, void 0, s)),
      (i = co()),
      e !== null && !yt
        ? (fo(e, t, s), ta(e, t, s))
        : (Ve && i && Qs(t), (t.flags |= 1), At(e, t, n, s), t.child)
    );
  }
  function nm(e, t, n, i, s, c) {
    return (
      tl(t),
      (t.updateQueue = null),
      (n = ih(t, i, n, s)),
      lh(e),
      (i = co()),
      e !== null && !yt
        ? (fo(e, t, c), ta(e, t, c))
        : (Ve && i && Qs(t), (t.flags |= 1), At(e, t, n, c), t.child)
    );
  }
  function am(e, t, n, i, s) {
    if ((tl(t), t.stateNode === null)) {
      var c = Ml,
        h = n.contextType;
      (typeof h == "object" && h !== null && (c = wt(h)),
        (c = new n(i, c)),
        (t.memoizedState =
          c.state !== null && c.state !== void 0 ? c.state : null),
        (c.updater = Ao),
        (t.stateNode = c),
        (c._reactInternals = t),
        (c = t.stateNode),
        (c.props = i),
        (c.state = t.memoizedState),
        (c.refs = {}),
        to(t),
        (h = n.contextType),
        (c.context = typeof h == "object" && h !== null ? wt(h) : Ml),
        (c.state = t.memoizedState),
        (h = n.getDerivedStateFromProps),
        typeof h == "function" && (wo(t, n, h, i), (c.state = t.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function" ||
          (typeof c.UNSAFE_componentWillMount != "function" &&
            typeof c.componentWillMount != "function") ||
          ((h = c.state),
          typeof c.componentWillMount == "function" && c.componentWillMount(),
          typeof c.UNSAFE_componentWillMount == "function" &&
            c.UNSAFE_componentWillMount(),
          h !== c.state && Ao.enqueueReplaceState(c, c.state, null),
          Li(t, i, c, s),
          Ui(),
          (c.state = t.memoizedState)),
        typeof c.componentDidMount == "function" && (t.flags |= 4194308),
        (i = !0));
    } else if (e === null) {
      c = t.stateNode;
      var g = t.memoizedProps,
        E = ul(n, g);
      c.props = E;
      var z = c.context,
        V = n.contextType;
      ((h = Ml), typeof V == "object" && V !== null && (h = wt(V)));
      var F = n.getDerivedStateFromProps;
      ((V =
        typeof F == "function" ||
        typeof c.getSnapshotBeforeUpdate == "function"),
        (g = t.pendingProps !== g),
        V ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((g || z !== h) && Gh(t, c, i, h)),
        (Na = !1));
      var L = t.memoizedState;
      ((c.state = L),
        Li(t, i, c, s),
        Ui(),
        (z = t.memoizedState),
        g || L !== z || Na
          ? (typeof F == "function" && (wo(t, n, F, i), (z = t.memoizedState)),
            (E = Na || Yh(t, n, E, i, L, z, h))
              ? (V ||
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
                (t.memoizedState = z)),
            (c.props = i),
            (c.state = z),
            (c.context = h),
            (i = E))
          : (typeof c.componentDidMount == "function" && (t.flags |= 4194308),
            (i = !1)));
    } else {
      ((c = t.stateNode),
        no(e, t),
        (h = t.memoizedProps),
        (V = ul(n, h)),
        (c.props = V),
        (F = t.pendingProps),
        (L = c.context),
        (z = n.contextType),
        (E = Ml),
        typeof z == "object" && z !== null && (E = wt(z)),
        (g = n.getDerivedStateFromProps),
        (z =
          typeof g == "function" ||
          typeof c.getSnapshotBeforeUpdate == "function") ||
          (typeof c.UNSAFE_componentWillReceiveProps != "function" &&
            typeof c.componentWillReceiveProps != "function") ||
          ((h !== F || L !== E) && Gh(t, c, i, E)),
        (Na = !1),
        (L = t.memoizedState),
        (c.state = L),
        Li(t, i, c, s),
        Ui());
      var k = t.memoizedState;
      h !== F ||
      L !== k ||
      Na ||
      (e !== null && e.dependencies !== null && Jr(e.dependencies))
        ? (typeof g == "function" && (wo(t, n, g, i), (k = t.memoizedState)),
          (V =
            Na ||
            Yh(t, n, V, i, L, k, E) ||
            (e !== null && e.dependencies !== null && Jr(e.dependencies)))
            ? (z ||
                (typeof c.UNSAFE_componentWillUpdate != "function" &&
                  typeof c.componentWillUpdate != "function") ||
                (typeof c.componentWillUpdate == "function" &&
                  c.componentWillUpdate(i, k, E),
                typeof c.UNSAFE_componentWillUpdate == "function" &&
                  c.UNSAFE_componentWillUpdate(i, k, E)),
              typeof c.componentDidUpdate == "function" && (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof c.componentDidUpdate != "function" ||
                (h === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 4),
              typeof c.getSnapshotBeforeUpdate != "function" ||
                (h === e.memoizedProps && L === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = i),
              (t.memoizedState = k)),
          (c.props = i),
          (c.state = k),
          (c.context = E),
          (i = V))
        : (typeof c.componentDidUpdate != "function" ||
            (h === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 4),
          typeof c.getSnapshotBeforeUpdate != "function" ||
            (h === e.memoizedProps && L === e.memoizedState) ||
            (t.flags |= 1024),
          (i = !1));
    }
    return (
      (c = i),
      yu(e, t),
      (i = (t.flags & 128) !== 0),
      c || i
        ? ((c = t.stateNode),
          (n =
            i && typeof n.getDerivedStateFromError != "function"
              ? null
              : c.render()),
          (t.flags |= 1),
          e !== null && i
            ? ((t.child = il(t, e.child, null, s)),
              (t.child = il(t, null, n, s)))
            : At(e, t, n, s),
          (t.memoizedState = c.state),
          (e = t.child))
        : (e = ta(e, t, s)),
      e
    );
  }
  function lm(e, t, n, i) {
    return (Wa(), (t.flags |= 256), At(e, t, n, i), t.child);
  }
  var Mo = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function xo(e) {
    return { baseLanes: e, cachePool: Zd() };
  }
  function zo(e, t, n) {
    return ((e = e !== null ? e.childLanes & ~n : 0), t && (e |= Jt), e);
  }
  function im(e, t, n) {
    var i = t.pendingProps,
      s = !1,
      c = (t.flags & 128) !== 0,
      h;
    if (
      ((h = c) ||
        (h =
          e !== null && e.memoizedState === null ? !1 : (ft.current & 2) !== 0),
      h && ((s = !0), (t.flags &= -129)),
      (h = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (Ve) {
        if (
          (s ? Da(t) : _a(),
          (e = it)
            ? ((e = h0(e, sn)),
              (e = e !== null && e.data !== "&" ? e : null),
              e !== null &&
                ((t.memoizedState = {
                  dehydrated: e,
                  treeContext: Sa !== null ? { id: wn, overflow: An } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }),
                (n = kd(e)),
                (n.return = t),
                (t.child = n),
                (Nt = t),
                (it = null)))
            : (e = null),
          e === null)
        )
          throw Ra(t);
        return (yc(e) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      var g = i.children;
      return (
        (i = i.fallback),
        s
          ? (_a(),
            (s = t.mode),
            (g = pu({ mode: "hidden", children: g }, s)),
            (i = Pa(i, s, n, null)),
            (g.return = t),
            (i.return = t),
            (g.sibling = i),
            (t.child = g),
            (i = t.child),
            (i.memoizedState = xo(n)),
            (i.childLanes = zo(e, h, n)),
            (t.memoizedState = Mo),
            qi(null, i))
          : (Da(t), Uo(t, g))
      );
    }
    var E = e.memoizedState;
    if (E !== null && ((g = E.dehydrated), g !== null)) {
      if (c)
        t.flags & 256
          ? (Da(t), (t.flags &= -257), (t = Lo(e, t, n)))
          : t.memoizedState !== null
            ? (_a(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (_a(),
              (g = i.fallback),
              (s = t.mode),
              (i = pu({ mode: "visible", children: i.children }, s)),
              (g = Pa(g, s, n, null)),
              (g.flags |= 2),
              (i.return = t),
              (g.return = t),
              (i.sibling = g),
              (t.child = i),
              il(t, e.child, null, n),
              (i = t.child),
              (i.memoizedState = xo(n)),
              (i.childLanes = zo(e, h, n)),
              (t.memoizedState = Mo),
              (t = qi(null, i)));
      else if ((Da(t), yc(g))) {
        if (((h = g.nextSibling && g.nextSibling.dataset), h)) var z = h.dgst;
        ((h = z),
          (i = Error(u(419))),
          (i.stack = ""),
          (i.digest = h),
          Di({ value: i, source: null, stack: null }),
          (t = Lo(e, t, n)));
      } else if (
        (yt || Ll(e, t, n, !1), (h = (n & e.childLanes) !== 0), yt || h)
      ) {
        if (
          ((h = nt),
          h !== null && ((i = T(h, n)), i !== 0 && i !== E.retryLane))
        )
          throw ((E.retryLane = i), $a(e, i), Qt(h, e, i), _o);
        (mc(g) || Nu(), (t = Lo(e, t, n)));
      } else
        mc(g)
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = E.treeContext),
            (it = cn(g.nextSibling)),
            (Nt = t),
            (Ve = !0),
            (Ta = null),
            (sn = !1),
            e !== null && Vd(t, e),
            (t = Uo(t, i.children)),
            (t.flags |= 4096));
      return t;
    }
    return s
      ? (_a(),
        (g = i.fallback),
        (s = t.mode),
        (E = e.child),
        (z = E.sibling),
        (i = Kn(E, { mode: "hidden", children: i.children })),
        (i.subtreeFlags = E.subtreeFlags & 65011712),
        z !== null ? (g = Kn(z, g)) : ((g = Pa(g, s, n, null)), (g.flags |= 2)),
        (g.return = t),
        (i.return = t),
        (i.sibling = g),
        (t.child = i),
        qi(null, i),
        (i = t.child),
        (g = e.child.memoizedState),
        g === null
          ? (g = xo(n))
          : ((s = g.cachePool),
            s !== null
              ? ((E = ht._currentValue),
                (s = s.parent !== E ? { parent: E, pool: E } : s))
              : (s = Zd()),
            (g = { baseLanes: g.baseLanes | n, cachePool: s })),
        (i.memoizedState = g),
        (i.childLanes = zo(e, h, n)),
        (t.memoizedState = Mo),
        qi(e.child, i))
      : (Da(t),
        (n = e.child),
        (e = n.sibling),
        (n = Kn(n, { mode: "visible", children: i.children })),
        (n.return = t),
        (n.sibling = null),
        e !== null &&
          ((h = t.deletions),
          h === null ? ((t.deletions = [e]), (t.flags |= 16)) : h.push(e)),
        (t.child = n),
        (t.memoizedState = null),
        n);
  }
  function Uo(e, t) {
    return (
      (t = pu({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function pu(e, t) {
    return ((e = Xt(22, e, null, t)), (e.lanes = 0), e);
  }
  function Lo(e, t, n) {
    return (
      il(t, e.child, null, n),
      (e = Uo(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function rm(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    (i !== null && (i.lanes |= t), Ks(e.return, t, n));
  }
  function jo(e, t, n, i, s, c) {
    var h = e.memoizedState;
    h === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: i,
          tail: n,
          tailMode: s,
          treeForkCount: c
        })
      : ((h.isBackwards = t),
        (h.rendering = null),
        (h.renderingStartTime = 0),
        (h.last = i),
        (h.tail = n),
        (h.tailMode = s),
        (h.treeForkCount = c));
  }
  function um(e, t, n) {
    var i = t.pendingProps,
      s = i.revealOrder,
      c = i.tail;
    i = i.children;
    var h = ft.current,
      g = (h & 2) !== 0;
    if (
      (g ? ((h = (h & 1) | 2), (t.flags |= 128)) : (h &= 1),
      te(ft, h),
      At(e, t, i, n),
      (i = Ve ? Ai : 0),
      !g && e !== null && (e.flags & 128) !== 0)
    )
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && rm(e, n, t);
        else if (e.tag === 19) rm(e, n, t);
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
    switch (s) {
      case "forwards":
        for (n = t.child, s = null; n !== null;)
          ((e = n.alternate),
            e !== null && lu(e) === null && (s = n),
            (n = n.sibling));
        ((n = s),
          n === null
            ? ((s = t.child), (t.child = null))
            : ((s = n.sibling), (n.sibling = null)),
          jo(t, !1, s, n, c, i));
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = t.child, t.child = null; s !== null;) {
          if (((e = s.alternate), e !== null && lu(e) === null)) {
            t.child = s;
            break;
          }
          ((e = s.sibling), (s.sibling = n), (n = s), (s = e));
        }
        jo(t, !0, n, null, c, i);
        break;
      case "together":
        jo(t, !1, null, null, void 0, i);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function ta(e, t, n) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (xa |= t.lanes),
      (n & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((Ll(e, t, n, !1), (n & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(u(153));
    if (t.child !== null) {
      for (
        e = t.child, n = Kn(e, e.pendingProps), t.child = n, n.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (n = n.sibling = Kn(e, e.pendingProps)),
          (n.return = t));
      n.sibling = null;
    }
    return t.child;
  }
  function Bo(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && Jr(e)));
  }
  function _v(e, t, n) {
    switch (t.tag) {
      case 3:
        (Ke(t, t.stateNode.containerInfo),
          Ca(t, ht, e.memoizedState.cache),
          Wa());
        break;
      case 27:
      case 5:
        mn(t);
        break;
      case 4:
        Ke(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ca(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), uo(t), null);
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null
            ? (Da(t), (t.flags |= 128), null)
            : (n & t.child.childLanes) !== 0
              ? im(e, t, n)
              : (Da(t), (e = ta(e, t, n)), e !== null ? e.sibling : null);
        Da(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (
          ((i = (n & t.childLanes) !== 0),
          i || (Ll(e, t, n, !1), (i = (n & t.childLanes) !== 0)),
          s)
        ) {
          if (i) return um(e, t, n);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null &&
            ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          te(ft, ft.current),
          i)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), Wh(e, t, n, t.pendingProps));
      case 24:
        Ca(t, ht, e.memoizedState.cache);
    }
    return ta(e, t, n);
  }
  function sm(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) yt = !0;
      else {
        if (!Bo(e, n) && (t.flags & 128) === 0) return ((yt = !1), _v(e, t, n));
        yt = (e.flags & 131072) !== 0;
      }
    else ((yt = !1), Ve && (t.flags & 1048576) !== 0 && qd(t, Ai, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (((e = al(t.elementType)), (t.type = e), typeof e == "function"))
            Vs(e)
              ? ((i = ul(e, i)), (t.tag = 1), (t = am(null, t, e, i, n)))
              : ((t.tag = 0), (t = Oo(null, t, e, i, n)));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === $) {
                ((t.tag = 11), (t = Jh(null, t, e, i, n)));
                break e;
              } else if (s === H) {
                ((t.tag = 14), (t = $h(null, t, e, i, n)));
                break e;
              }
            }
            throw ((t = he(e) || e), Error(u(306, t, "")));
          }
        }
        return t;
      case 0:
        return Oo(e, t, t.type, t.pendingProps, n);
      case 1:
        return ((i = t.type), (s = ul(i, t.pendingProps)), am(e, t, i, s, n));
      case 3:
        e: {
          if ((Ke(t, t.stateNode.containerInfo), e === null))
            throw Error(u(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          ((s = c.element), no(e, t), Li(t, i, null, n));
          var h = t.memoizedState;
          if (
            ((i = h.cache),
            Ca(t, ht, i),
            i !== c.cache && Js(t, [ht], n, !0),
            Ui(),
            (i = h.element),
            c.isDehydrated)
          )
            if (
              ((c = { element: i, isDehydrated: !1, cache: h.cache }),
              (t.updateQueue.baseState = c),
              (t.memoizedState = c),
              t.flags & 256)
            ) {
              t = lm(e, t, i, n);
              break e;
            } else if (i !== s) {
              ((s = ln(Error(u(424)), t)), Di(s), (t = lm(e, t, i, n)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  it = cn(e.firstChild),
                  Nt = t,
                  Ve = !0,
                  Ta = null,
                  sn = !0,
                  n = Wd(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
          else {
            if ((Wa(), i === s)) {
              t = ta(e, t, n);
              break e;
            }
            At(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          yu(e, t),
          e === null
            ? (n = b0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = n)
              : Ve ||
                ((n = t.type),
                (e = t.pendingProps),
                (i = xu(Ee.current).createElement(n)),
                (i[ce] = t),
                (i[ae] = e),
                Dt(i, n, e),
                Xe(i),
                (t.stateNode = i))
            : (t.memoizedState = b0(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState
              )),
          null
        );
      case 27:
        return (
          mn(t),
          e === null &&
            Ve &&
            ((i = t.stateNode = p0(t.type, t.pendingProps, Ee.current)),
            (Nt = t),
            (sn = !0),
            (s = it),
            Ba(t.type) ? ((pc = s), (it = cn(i.firstChild))) : (it = s)),
          At(e, t, t.pendingProps.children, n),
          yu(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            Ve &&
            ((s = i = it) &&
              ((i = i1(i, t.type, t.pendingProps, sn)),
              i !== null
                ? ((t.stateNode = i),
                  (Nt = t),
                  (it = cn(i.firstChild)),
                  (sn = !1),
                  (s = !0))
                : (s = !1)),
            s || Ra(t)),
          mn(t),
          (s = t.type),
          (c = t.pendingProps),
          (h = e !== null ? e.memoizedProps : null),
          (i = c.children),
          fc(s, c) ? (i = null) : h !== null && fc(s, h) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((s = oo(e, t, Ev, null, null, n)), (tr._currentValue = s)),
          yu(e, t),
          At(e, t, i, n),
          t.child
        );
      case 6:
        return (
          e === null &&
            Ve &&
            ((e = n = it) &&
              ((n = r1(n, t.pendingProps, sn)),
              n !== null
                ? ((t.stateNode = n), (Nt = t), (it = null), (e = !0))
                : (e = !1)),
            e || Ra(t)),
          null
        );
      case 13:
        return im(e, t, n);
      case 4:
        return (
          Ke(t, t.stateNode.containerInfo),
          (i = t.pendingProps),
          e === null ? (t.child = il(t, null, i, n)) : At(e, t, i, n),
          t.child
        );
      case 11:
        return Jh(e, t, t.type, t.pendingProps, n);
      case 7:
        return (At(e, t, t.pendingProps, n), t.child);
      case 8:
        return (At(e, t, t.pendingProps.children, n), t.child);
      case 12:
        return (At(e, t, t.pendingProps.children, n), t.child);
      case 10:
        return (
          (i = t.pendingProps),
          Ca(t, t.type, i.value),
          At(e, t, i.children, n),
          t.child
        );
      case 9:
        return (
          (s = t.type._context),
          (i = t.pendingProps.children),
          tl(t),
          (s = wt(s)),
          (i = i(s)),
          (t.flags |= 1),
          At(e, t, i, n),
          t.child
        );
      case 14:
        return $h(e, t, t.type, t.pendingProps, n);
      case 15:
        return Ph(e, t, t.type, t.pendingProps, n);
      case 19:
        return um(e, t, n);
      case 31:
        return Dv(e, t, n);
      case 22:
        return Wh(e, t, n, t.pendingProps);
      case 24:
        return (
          tl(t),
          (i = wt(ht)),
          e === null
            ? ((s = Ws()),
              s === null &&
                ((s = nt),
                (c = $s()),
                (s.pooledCache = c),
                c.refCount++,
                c !== null && (s.pooledCacheLanes |= n),
                (s = c)),
              (t.memoizedState = { parent: i, cache: s }),
              to(t),
              Ca(t, ht, s))
            : ((e.lanes & n) !== 0 && (no(e, t), Li(t, null, null, n), Ui()),
              (s = e.memoizedState),
              (c = t.memoizedState),
              s.parent !== i
                ? ((s = { parent: i, cache: i }),
                  (t.memoizedState = s),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = s),
                  Ca(t, ht, i))
                : ((i = c.cache),
                  Ca(t, ht, i),
                  i !== s.cache && Js(t, [ht], n, !0))),
          At(e, t, t.pendingProps.children, n),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(u(156, t.tag));
  }
  function na(e) {
    e.flags |= 4;
  }
  function ko(e, t, n, i, s) {
    if (((t = (e.mode & 32) !== 0) && (t = !1), t)) {
      if (((e.flags |= 16777216), (s & 335544128) === s))
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Lm()) e.flags |= 8192;
        else throw ((ll = eu), eo);
    } else e.flags &= -16777217;
  }
  function om(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !C0(t)))
      if (Lm()) e.flags |= 8192;
      else throw ((ll = eu), eo);
  }
  function gu(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? gi() : 536870912), (e.lanes |= t), (Zl |= t)));
  }
  function Vi(e, t) {
    if (!Ve)
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
  function rt(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      n = 0,
      i = 0;
    if (t)
      for (var s = e.child; s !== null;)
        ((n |= s.lanes | s.childLanes),
          (i |= s.subtreeFlags & 65011712),
          (i |= s.flags & 65011712),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null;)
        ((n |= s.lanes | s.childLanes),
          (i |= s.subtreeFlags),
          (i |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= i), (e.childLanes = n), t);
  }
  function Ov(e, t, n) {
    var i = t.pendingProps;
    switch ((Fs(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (rt(t), null);
      case 1:
        return (rt(t), null);
      case 3:
        return (
          (n = t.stateNode),
          (i = null),
          e !== null && (i = e.memoizedState.cache),
          t.memoizedState.cache !== i && (t.flags |= 2048),
          Pn(ht),
          Ye(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (Ul(t)
              ? na(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Zs())),
          rt(t),
          null
        );
      case 26:
        var s = t.type,
          c = t.memoizedState;
        return (
          e === null
            ? (na(t),
              c !== null ? (rt(t), om(t, c)) : (rt(t), ko(t, s, null, i, n)))
            : c
              ? c !== e.memoizedState
                ? (na(t), rt(t), om(t, c))
                : (rt(t), (t.flags &= -16777217))
              : ((e = e.memoizedProps),
                e !== i && na(t),
                rt(t),
                ko(t, s, e, i, n)),
          null
        );
      case 27:
        if (
          (vl(t),
          (n = Ee.current),
          (s = t.type),
          e !== null && t.stateNode != null)
        )
          e.memoizedProps !== i && na(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return (rt(t), null);
          }
          ((e = ue.current),
            Ul(t) ? Yd(t) : ((e = p0(s, i, n)), (t.stateNode = e), na(t)));
        }
        return (rt(t), null);
      case 5:
        if ((vl(t), (s = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== i && na(t);
        else {
          if (!i) {
            if (t.stateNode === null) throw Error(u(166));
            return (rt(t), null);
          }
          if (((c = ue.current), Ul(t))) Yd(t);
          else {
            var h = xu(Ee.current);
            switch (c) {
              case 1:
                c = h.createElementNS("http://www.w3.org/2000/svg", s);
                break;
              case 2:
                c = h.createElementNS("http://www.w3.org/1998/Math/MathML", s);
                break;
              default:
                switch (s) {
                  case "svg":
                    c = h.createElementNS("http://www.w3.org/2000/svg", s);
                    break;
                  case "math":
                    c = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    ((c = h.createElement("div")),
                      (c.innerHTML = "<script><\/script>"),
                      (c = c.removeChild(c.firstChild)));
                    break;
                  case "select":
                    ((c =
                      typeof i.is == "string"
                        ? h.createElement("select", { is: i.is })
                        : h.createElement("select")),
                      i.multiple
                        ? (c.multiple = !0)
                        : i.size && (c.size = i.size));
                    break;
                  default:
                    c =
                      typeof i.is == "string"
                        ? h.createElement(s, { is: i.is })
                        : h.createElement(s);
                }
            }
            ((c[ce] = t), (c[ae] = i));
            e: for (h = t.child; h !== null;) {
              if (h.tag === 5 || h.tag === 6) c.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                ((h.child.return = h), (h = h.child));
                continue;
              }
              if (h === t) break e;
              for (; h.sibling === null;) {
                if (h.return === null || h.return === t) break e;
                h = h.return;
              }
              ((h.sibling.return = h.return), (h = h.sibling));
            }
            t.stateNode = c;
            e: switch ((Dt(c, s, i), s)) {
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
            i && na(t);
          }
        }
        return (
          rt(t),
          ko(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
          null
        );
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== i && na(t);
        else {
          if (typeof i != "string" && t.stateNode === null) throw Error(u(166));
          if (((e = Ee.current), Ul(t))) {
            if (
              ((e = t.stateNode),
              (n = t.memoizedProps),
              (i = null),
              (s = Nt),
              s !== null)
            )
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            ((e[ce] = t),
              (e = !!(
                e.nodeValue === n ||
                (i !== null && i.suppressHydrationWarning === !0) ||
                i0(e.nodeValue, n)
              )),
              e || Ra(t, !0));
          } else
            ((e = xu(e).createTextNode(i)), (e[ce] = t), (t.stateNode = e));
        }
        return (rt(t), null);
      case 31:
        if (((n = t.memoizedState), e === null || e.memoizedState !== null)) {
          if (((i = Ul(t)), n !== null)) {
            if (e === null) {
              if (!i) throw Error(u(318));
              if (
                ((e = t.memoizedState),
                (e = e !== null ? e.dehydrated : null),
                !e)
              )
                throw Error(u(557));
              e[ce] = t;
            } else
              (Wa(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (rt(t), (e = !1));
          } else
            ((n = Zs()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (e = !0));
          if (!e) return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0) throw Error(u(558));
        }
        return (rt(t), null);
      case 13:
        if (
          ((i = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((s = Ul(t)), i !== null && i.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(u(318));
              if (
                ((s = t.memoizedState),
                (s = s !== null ? s.dehydrated : null),
                !s)
              )
                throw Error(u(317));
              s[ce] = t;
            } else
              (Wa(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (rt(t), (s = !1));
          } else
            ((s = Zs()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = s),
              (s = !0));
          if (!s) return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return (
          It(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = n), t)
            : ((n = i !== null),
              (e = e !== null && e.memoizedState !== null),
              n &&
                ((i = t.child),
                (s = null),
                i.alternate !== null &&
                  i.alternate.memoizedState !== null &&
                  i.alternate.memoizedState.cachePool !== null &&
                  (s = i.alternate.memoizedState.cachePool.pool),
                (c = null),
                i.memoizedState !== null &&
                  i.memoizedState.cachePool !== null &&
                  (c = i.memoizedState.cachePool.pool),
                c !== s && (i.flags |= 2048)),
              n !== e && n && (t.child.flags |= 8192),
              gu(t, t.updateQueue),
              rt(t),
              null)
        );
      case 4:
        return (Ye(), e === null && rc(t.stateNode.containerInfo), rt(t), null);
      case 10:
        return (Pn(t.type), rt(t), null);
      case 19:
        if ((q(ft), (i = t.memoizedState), i === null)) return (rt(t), null);
        if (((s = (t.flags & 128) !== 0), (c = i.rendering), c === null))
          if (s) Vi(i, !1);
          else {
            if (ct !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null;) {
                if (((c = lu(e)), c !== null)) {
                  for (
                    t.flags |= 128,
                      Vi(i, !1),
                      e = c.updateQueue,
                      t.updateQueue = e,
                      gu(t, e),
                      t.subtreeFlags = 0,
                      e = n,
                      n = t.child;
                    n !== null;
                  )
                    (Bd(n, e), (n = n.sibling));
                  return (
                    te(ft, (ft.current & 1) | 2),
                    Ve && Jn(t, i.treeForkCount),
                    t.child
                  );
                }
                e = e.sibling;
              }
            i.tail !== null &&
              xt() > Tu &&
              ((t.flags |= 128), (s = !0), Vi(i, !1), (t.lanes = 4194304));
          }
        else {
          if (!s)
            if (((e = lu(c)), e !== null)) {
              if (
                ((t.flags |= 128),
                (s = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                gu(t, e),
                Vi(i, !0),
                i.tail === null &&
                  i.tailMode === "hidden" &&
                  !c.alternate &&
                  !Ve)
              )
                return (rt(t), null);
            } else
              2 * xt() - i.renderingStartTime > Tu &&
                n !== 536870912 &&
                ((t.flags |= 128), (s = !0), Vi(i, !1), (t.lanes = 4194304));
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
            (i.renderingStartTime = xt()),
            (e.sibling = null),
            (n = ft.current),
            te(ft, s ? (n & 1) | 2 : n & 1),
            Ve && Jn(t, i.treeForkCount),
            e)
          : (rt(t), null);
      case 22:
      case 23:
        return (
          It(t),
          ro(),
          (i = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== i && (t.flags |= 8192)
            : i && (t.flags |= 8192),
          i
            ? (n & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (rt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : rt(t),
          (n = t.updateQueue),
          n !== null && gu(t, n.retryQueue),
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
          e !== null && q(nl),
          null
        );
      case 24:
        return (
          (n = null),
          e !== null && (n = e.memoizedState.cache),
          t.memoizedState.cache !== n && (t.flags |= 2048),
          Pn(ht),
          rt(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(u(156, t.tag));
  }
  function Mv(e, t) {
    switch ((Fs(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Pn(ht),
          Ye(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (vl(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((It(t), t.alternate === null)) throw Error(u(340));
          Wa();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 13:
        if (
          (It(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(u(340));
          Wa();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (q(ft), null);
      case 4:
        return (Ye(), null);
      case 10:
        return (Pn(t.type), null);
      case 22:
      case 23:
        return (
          It(t),
          ro(),
          e !== null && q(nl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Pn(ht), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cm(e, t) {
    switch ((Fs(t), t.tag)) {
      case 3:
        (Pn(ht), Ye());
        break;
      case 26:
      case 27:
      case 5:
        vl(t);
        break;
      case 4:
        Ye();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        q(ft);
        break;
      case 10:
        Pn(t.type);
        break;
      case 22:
      case 23:
        (It(t), ro(), e !== null && q(nl));
        break;
      case 24:
        Pn(ht);
    }
  }
  function Yi(e, t) {
    try {
      var n = t.updateQueue,
        i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        n = s;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var c = n.create,
              h = n.inst;
            ((i = c()), (h.destroy = i));
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (g) {
      Pe(t, t.return, g);
    }
  }
  function Oa(e, t, n) {
    try {
      var i = t.updateQueue,
        s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var h = i.inst,
              g = h.destroy;
            if (g !== void 0) {
              ((h.destroy = void 0), (s = t));
              var E = n,
                z = g;
              try {
                z();
              } catch (V) {
                Pe(s, E, V);
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (V) {
      Pe(t, t.return, V);
    }
  }
  function fm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        th(t, n);
      } catch (i) {
        Pe(e, e.return, i);
      }
    }
  }
  function dm(e, t, n) {
    ((n.props = ul(e.type, e.memoizedProps)), (n.state = e.memoizedState));
    try {
      n.componentWillUnmount();
    } catch (i) {
      Pe(e, t, i);
    }
  }
  function Gi(e, t) {
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
    } catch (s) {
      Pe(e, t, s);
    }
  }
  function Dn(e, t) {
    var n = e.ref,
      i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          Pe(e, t, s);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          Pe(e, t, s);
        }
      else n.current = null;
  }
  function hm(e) {
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
    } catch (s) {
      Pe(e, e.return, s);
    }
  }
  function Ho(e, t, n) {
    try {
      var i = e.stateNode;
      (Wv(i, e.type, n, t), (i[ae] = t));
    } catch (s) {
      Pe(e, e.return, s);
    }
  }
  function mm(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && Ba(e.type)) ||
      e.tag === 4
    );
  }
  function qo(e) {
    e: for (;;) {
      for (; e.sibling === null;) {
        if (e.return === null || mm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && Ba(e.type)) ||
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
  function Vo(e, t, n) {
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
            n != null || t.onclick !== null || (t.onclick = Zn)));
    else if (
      i !== 4 &&
      (i === 27 && Ba(e.type) && ((n = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (Vo(e, t, n), e = e.sibling; e !== null;)
        (Vo(e, t, n), (e = e.sibling));
  }
  function vu(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
    else if (
      i !== 4 &&
      (i === 27 && Ba(e.type) && (n = e.stateNode), (e = e.child), e !== null)
    )
      for (vu(e, t, n), e = e.sibling; e !== null;)
        (vu(e, t, n), (e = e.sibling));
  }
  function ym(e) {
    var t = e.stateNode,
      n = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length;)
        t.removeAttributeNode(s[0]);
      (Dt(t, i, n), (t[ce] = e), (t[ae] = n));
    } catch (c) {
      Pe(e, e.return, c);
    }
  }
  var aa = !1,
    pt = !1,
    Yo = !1,
    pm = typeof WeakSet == "function" ? WeakSet : Set,
    Tt = null;
  function xv(e, t) {
    if (((e = e.containerInfo), (oc = Hu), (e = Dd(e)), Us(e))) {
      if ("selectionStart" in e)
        var n = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          n = ((n = e.ownerDocument) && n.defaultView) || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var s = i.anchorOffset,
              c = i.focusNode;
            i = i.focusOffset;
            try {
              (n.nodeType, c.nodeType);
            } catch {
              n = null;
              break e;
            }
            var h = 0,
              g = -1,
              E = -1,
              z = 0,
              V = 0,
              F = e,
              L = null;
            t: for (;;) {
              for (
                var k;
                F !== n || (s !== 0 && F.nodeType !== 3) || (g = h + s),
                  F !== c || (i !== 0 && F.nodeType !== 3) || (E = h + i),
                  F.nodeType === 3 && (h += F.nodeValue.length),
                  (k = F.firstChild) !== null;
              )
                ((L = F), (F = k));
              for (;;) {
                if (F === e) break t;
                if (
                  (L === n && ++z === s && (g = h),
                  L === c && ++V === i && (E = h),
                  (k = F.nextSibling) !== null)
                )
                  break;
                ((F = L), (L = F.parentNode));
              }
              F = k;
            }
            n = g === -1 || E === -1 ? null : { start: g, end: E };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      cc = { focusedElem: e, selectionRange: n }, Hu = !1, Tt = t;
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
                  ((s = e[n]), (s.ref.impl = s.nextImpl));
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                ((e = void 0),
                  (n = t),
                  (s = c.memoizedProps),
                  (c = c.memoizedState),
                  (i = n.stateNode));
                try {
                  var de = ul(n.type, s);
                  ((e = i.getSnapshotBeforeUpdate(de, c)),
                    (i.__reactInternalSnapshotBeforeUpdate = e));
                } catch (Re) {
                  Pe(n, n.return, Re);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (n = e.nodeType), n === 9)
                )
                  hc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      hc(e);
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
              if ((e & 1024) !== 0) throw Error(u(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (Tt = e));
            break;
          }
          Tt = t.return;
        }
  }
  function gm(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        (ia(e, n), i & 4 && Yi(5, n));
        break;
      case 1:
        if ((ia(e, n), i & 4))
          if (((e = n.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (h) {
              Pe(n, n.return, h);
            }
          else {
            var s = ul(n.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(s, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (h) {
              Pe(n, n.return, h);
            }
          }
        (i & 64 && fm(n), i & 512 && Gi(n, n.return));
        break;
      case 3:
        if ((ia(e, n), i & 64 && ((e = n.updateQueue), e !== null))) {
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
            th(e, t);
          } catch (h) {
            Pe(n, n.return, h);
          }
        }
        break;
      case 27:
        t === null && i & 4 && ym(n);
      case 26:
      case 5:
        (ia(e, n), t === null && i & 4 && hm(n), i & 512 && Gi(n, n.return));
        break;
      case 12:
        ia(e, n);
        break;
      case 31:
        (ia(e, n), i & 4 && Em(e, n));
        break;
      case 13:
        (ia(e, n),
          i & 4 && Sm(e, n),
          i & 64 &&
            ((e = n.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((n = Vv.bind(null, n)), u1(e, n)))));
        break;
      case 22:
        if (((i = n.memoizedState !== null || aa), !i)) {
          ((t = (t !== null && t.memoizedState !== null) || pt), (s = aa));
          var c = pt;
          ((aa = i),
            (pt = t) && !c ? ra(e, n, (n.subtreeFlags & 8772) !== 0) : ia(e, n),
            (aa = s),
            (pt = c));
        }
        break;
      case 30:
        break;
      default:
        ia(e, n);
    }
  }
  function vm(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), vm(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ge(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var ut = null,
    qt = !1;
  function la(e, t, n) {
    for (n = n.child; n !== null;) (bm(e, t, n), (n = n.sibling));
  }
  function bm(e, t, n) {
    if (zt && typeof zt.onCommitFiberUnmount == "function")
      try {
        zt.onCommitFiberUnmount(qn, n);
      } catch {}
    switch (n.tag) {
      case 26:
        (pt || Dn(n, t),
          la(e, t, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n)));
        break;
      case 27:
        pt || Dn(n, t);
        var i = ut,
          s = qt;
        (Ba(n.type) && ((ut = n.stateNode), (qt = !1)),
          la(e, t, n),
          Pi(n.stateNode),
          (ut = i),
          (qt = s));
        break;
      case 5:
        pt || Dn(n, t);
      case 6:
        if (
          ((i = ut),
          (s = qt),
          (ut = null),
          la(e, t, n),
          (ut = i),
          (qt = s),
          ut !== null)
        )
          if (qt)
            try {
              (ut.nodeType === 9
                ? ut.body
                : ut.nodeName === "HTML"
                  ? ut.ownerDocument.body
                  : ut
              ).removeChild(n.stateNode);
            } catch (c) {
              Pe(n, t, c);
            }
          else
            try {
              ut.removeChild(n.stateNode);
            } catch (c) {
              Pe(n, t, c);
            }
        break;
      case 18:
        ut !== null &&
          (qt
            ? ((e = ut),
              f0(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                n.stateNode
              ),
              ti(e))
            : f0(ut, n.stateNode));
        break;
      case 4:
        ((i = ut),
          (s = qt),
          (ut = n.stateNode.containerInfo),
          (qt = !0),
          la(e, t, n),
          (ut = i),
          (qt = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (Oa(2, n, t), pt || Oa(4, n, t), la(e, t, n));
        break;
      case 1:
        (pt ||
          (Dn(n, t),
          (i = n.stateNode),
          typeof i.componentWillUnmount == "function" && dm(n, t, i)),
          la(e, t, n));
        break;
      case 21:
        la(e, t, n);
        break;
      case 22:
        ((pt = (i = pt) || n.memoizedState !== null), la(e, t, n), (pt = i));
        break;
      default:
        la(e, t, n);
    }
  }
  function Em(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate), e !== null && ((e = e.memoizedState), e !== null))
    ) {
      e = e.dehydrated;
      try {
        ti(e);
      } catch (n) {
        Pe(t, t.return, n);
      }
    }
  }
  function Sm(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        ti(e);
      } catch (n) {
        Pe(t, t.return, n);
      }
  }
  function zv(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new pm()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new pm()),
          t
        );
      default:
        throw Error(u(435, e.tag));
    }
  }
  function bu(e, t) {
    var n = zv(e);
    t.forEach(function (i) {
      if (!n.has(i)) {
        n.add(i);
        var s = Yv.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function Vt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = n[i],
          c = e,
          h = t,
          g = h;
        e: for (; g !== null;) {
          switch (g.tag) {
            case 27:
              if (Ba(g.type)) {
                ((ut = g.stateNode), (qt = !1));
                break e;
              }
              break;
            case 5:
              ((ut = g.stateNode), (qt = !1));
              break e;
            case 3:
            case 4:
              ((ut = g.stateNode.containerInfo), (qt = !0));
              break e;
          }
          g = g.return;
        }
        if (ut === null) throw Error(u(160));
        (bm(c, h, s),
          (ut = null),
          (qt = !1),
          (c = s.alternate),
          c !== null && (c.return = null),
          (s.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null;) (Tm(t, e), (t = t.sibling));
  }
  var bn = null;
  function Tm(e, t) {
    var n = e.alternate,
      i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (Vt(t, e),
          Yt(e),
          i & 4 && (Oa(3, e, e.return), Yi(3, e), Oa(5, e, e.return)));
        break;
      case 1:
        (Vt(t, e),
          Yt(e),
          i & 512 && (pt || n === null || Dn(n, n.return)),
          i & 64 &&
            aa &&
            ((e = e.updateQueue),
            e !== null &&
              ((i = e.callbacks),
              i !== null &&
                ((n = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = n === null ? i : n.concat(i))))));
        break;
      case 26:
        var s = bn;
        if (
          (Vt(t, e),
          Yt(e),
          i & 512 && (pt || n === null || Dn(n, n.return)),
          i & 4)
        ) {
          var c = n !== null ? n.memoizedState : null;
          if (((i = e.memoizedState), n === null))
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  ((i = e.type),
                    (n = e.memoizedProps),
                    (s = s.ownerDocument || s));
                  t: switch (i) {
                    case "title":
                      ((c = s.getElementsByTagName("title")[0]),
                        (!c ||
                          c[Je] ||
                          c[ce] ||
                          c.namespaceURI === "http://www.w3.org/2000/svg" ||
                          c.hasAttribute("itemprop")) &&
                          ((c = s.createElement(i)),
                          s.head.insertBefore(
                            c,
                            s.querySelector("head > title")
                          )),
                        Dt(c, i, n),
                        (c[ce] = e),
                        Xe(c),
                        (i = c));
                      break e;
                    case "link":
                      var h = T0("link", "href", s).get(i + (n.href || ""));
                      if (h) {
                        for (var g = 0; g < h.length; g++)
                          if (
                            ((c = h[g]),
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
                            h.splice(g, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(i)),
                        Dt(c, i, n),
                        s.head.appendChild(c));
                      break;
                    case "meta":
                      if (
                        (h = T0("meta", "content", s).get(
                          i + (n.content || "")
                        ))
                      ) {
                        for (g = 0; g < h.length; g++)
                          if (
                            ((c = h[g]),
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
                            h.splice(g, 1);
                            break t;
                          }
                      }
                      ((c = s.createElement(i)),
                        Dt(c, i, n),
                        s.head.appendChild(c));
                      break;
                    default:
                      throw Error(u(468, i));
                  }
                  ((c[ce] = e), Xe(c), (i = c));
                }
                e.stateNode = i;
              } else R0(s, e.type, e.stateNode);
            else e.stateNode = S0(s, i, e.memoizedProps);
          else
            c !== i
              ? (c === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : c.count--,
                i === null
                  ? R0(s, e.type, e.stateNode)
                  : S0(s, i, e.memoizedProps))
              : i === null &&
                e.stateNode !== null &&
                Ho(e, e.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        (Vt(t, e),
          Yt(e),
          i & 512 && (pt || n === null || Dn(n, n.return)),
          n !== null && i & 4 && Ho(e, e.memoizedProps, n.memoizedProps));
        break;
      case 5:
        if (
          (Vt(t, e),
          Yt(e),
          i & 512 && (pt || n === null || Dn(n, n.return)),
          e.flags & 32)
        ) {
          s = e.stateNode;
          try {
            Cl(s, "");
          } catch (de) {
            Pe(e, e.return, de);
          }
        }
        (i & 4 &&
          e.stateNode != null &&
          ((s = e.memoizedProps), Ho(e, s, n !== null ? n.memoizedProps : s)),
          i & 1024 && (Yo = !0));
        break;
      case 6:
        if ((Vt(t, e), Yt(e), i & 4)) {
          if (e.stateNode === null) throw Error(u(162));
          ((i = e.memoizedProps), (n = e.stateNode));
          try {
            n.nodeValue = i;
          } catch (de) {
            Pe(e, e.return, de);
          }
        }
        break;
      case 3:
        if (
          ((Lu = null),
          (s = bn),
          (bn = zu(t.containerInfo)),
          Vt(t, e),
          (bn = s),
          Yt(e),
          i & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            ti(t.containerInfo);
          } catch (de) {
            Pe(e, e.return, de);
          }
        Yo && ((Yo = !1), Rm(e));
        break;
      case 4:
        ((i = bn),
          (bn = zu(e.stateNode.containerInfo)),
          Vt(t, e),
          Yt(e),
          (bn = i));
        break;
      case 12:
        (Vt(t, e), Yt(e));
        break;
      case 31:
        (Vt(t, e),
          Yt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), bu(e, i))));
        break;
      case 13:
        (Vt(t, e),
          Yt(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Su = xt()),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), bu(e, i))));
        break;
      case 22:
        s = e.memoizedState !== null;
        var E = n !== null && n.memoizedState !== null,
          z = aa,
          V = pt;
        if (
          ((aa = z || s),
          (pt = V || E),
          Vt(t, e),
          (pt = V),
          (aa = z),
          Yt(e),
          i & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = s ? t._visibility & -2 : t._visibility | 1,
              s && (n === null || E || aa || pt || sl(e)),
              n = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                E = n = t;
                try {
                  if (((c = E.stateNode), s))
                    ((h = c.style),
                      typeof h.setProperty == "function"
                        ? h.setProperty("display", "none", "important")
                        : (h.display = "none"));
                  else {
                    g = E.stateNode;
                    var F = E.memoizedProps.style,
                      L =
                        F != null && F.hasOwnProperty("display")
                          ? F.display
                          : null;
                    g.style.display =
                      L == null || typeof L == "boolean" ? "" : ("" + L).trim();
                  }
                } catch (de) {
                  Pe(E, E.return, de);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                E = t;
                try {
                  E.stateNode.nodeValue = s ? "" : E.memoizedProps;
                } catch (de) {
                  Pe(E, E.return, de);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                E = t;
                try {
                  var k = E.stateNode;
                  s ? d0(k, !0) : d0(E.stateNode, !1);
                } catch (de) {
                  Pe(E, E.return, de);
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
            n !== null && ((i.retryQueue = null), bu(e, n))));
        break;
      case 19:
        (Vt(t, e),
          Yt(e),
          i & 4 &&
            ((i = e.updateQueue),
            i !== null && ((e.updateQueue = null), bu(e, i))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (Vt(t, e), Yt(e));
    }
  }
  function Yt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null;) {
          if (mm(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(u(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode,
              c = qo(e);
            vu(e, c, s);
            break;
          case 5:
            var h = n.stateNode;
            n.flags & 32 && (Cl(h, ""), (n.flags &= -33));
            var g = qo(e);
            vu(e, g, h);
            break;
          case 3:
          case 4:
            var E = n.stateNode.containerInfo,
              z = qo(e);
            Vo(e, z, E);
            break;
          default:
            throw Error(u(161));
        }
      } catch (V) {
        Pe(e, e.return, V);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Rm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null;) {
        var t = e;
        (Rm(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function ia(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null;) (gm(e, t.alternate, t), (t = t.sibling));
  }
  function sl(e) {
    for (e = e.child; e !== null;) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (Oa(4, t, t.return), sl(t));
          break;
        case 1:
          Dn(t, t.return);
          var n = t.stateNode;
          (typeof n.componentWillUnmount == "function" && dm(t, t.return, n),
            sl(t));
          break;
        case 27:
          Pi(t.stateNode);
        case 26:
        case 5:
          (Dn(t, t.return), sl(t));
          break;
        case 22:
          t.memoizedState === null && sl(t);
          break;
        case 30:
          sl(t);
          break;
        default:
          sl(t);
      }
      e = e.sibling;
    }
  }
  function ra(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
      var i = t.alternate,
        s = e,
        c = t,
        h = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (ra(s, c, n), Yi(4, c));
          break;
        case 1:
          if (
            (ra(s, c, n),
            (i = c),
            (s = i.stateNode),
            typeof s.componentDidMount == "function")
          )
            try {
              s.componentDidMount();
            } catch (z) {
              Pe(i, i.return, z);
            }
          if (((i = c), (s = i.updateQueue), s !== null)) {
            var g = i.stateNode;
            try {
              var E = s.shared.hiddenCallbacks;
              if (E !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < E.length; s++)
                  eh(E[s], g);
            } catch (z) {
              Pe(i, i.return, z);
            }
          }
          (n && h & 64 && fm(c), Gi(c, c.return));
          break;
        case 27:
          ym(c);
        case 26:
        case 5:
          (ra(s, c, n), n && i === null && h & 4 && hm(c), Gi(c, c.return));
          break;
        case 12:
          ra(s, c, n);
          break;
        case 31:
          (ra(s, c, n), n && h & 4 && Em(s, c));
          break;
        case 13:
          (ra(s, c, n), n && h & 4 && Sm(s, c));
          break;
        case 22:
          (c.memoizedState === null && ra(s, c, n), Gi(c, c.return));
          break;
        case 30:
          break;
        default:
          ra(s, c, n);
      }
      t = t.sibling;
    }
  }
  function Go(e, t) {
    var n = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (n = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== n && (e != null && e.refCount++, n != null && _i(n)));
  }
  function Qo(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && _i(e)));
  }
  function En(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) (Cm(e, t, n, i), (t = t.sibling));
  }
  function Cm(e, t, n, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (En(e, t, n, i), s & 2048 && Yi(9, t));
        break;
      case 1:
        En(e, t, n, i);
        break;
      case 3:
        (En(e, t, n, i),
          s & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && _i(e))));
        break;
      case 12:
        if (s & 2048) {
          (En(e, t, n, i), (e = t.stateNode));
          try {
            var c = t.memoizedProps,
              h = c.id,
              g = c.onPostCommit;
            typeof g == "function" &&
              g(
                h,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0
              );
          } catch (E) {
            Pe(t, t.return, E);
          }
        } else En(e, t, n, i);
        break;
      case 31:
        En(e, t, n, i);
        break;
      case 13:
        En(e, t, n, i);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (h = t.alternate),
          t.memoizedState !== null
            ? c._visibility & 2
              ? En(e, t, n, i)
              : Qi(e, t)
            : c._visibility & 2
              ? En(e, t, n, i)
              : ((c._visibility |= 2),
                Ql(e, t, n, i, (t.subtreeFlags & 10256) !== 0 || !1)),
          s & 2048 && Go(h, t));
        break;
      case 24:
        (En(e, t, n, i), s & 2048 && Qo(t.alternate, t));
        break;
      default:
        En(e, t, n, i);
    }
  }
  function Ql(e, t, n, i, s) {
    for (
      s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;
    ) {
      var c = e,
        h = t,
        g = n,
        E = i,
        z = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          (Ql(c, h, g, E, s), Yi(8, h));
          break;
        case 23:
          break;
        case 22:
          var V = h.stateNode;
          (h.memoizedState !== null
            ? V._visibility & 2
              ? Ql(c, h, g, E, s)
              : Qi(c, h)
            : ((V._visibility |= 2), Ql(c, h, g, E, s)),
            s && z & 2048 && Go(h.alternate, h));
          break;
        case 24:
          (Ql(c, h, g, E, s), s && z & 2048 && Qo(h.alternate, h));
          break;
        default:
          Ql(c, h, g, E, s);
      }
      t = t.sibling;
    }
  }
  function Qi(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null;) {
        var n = e,
          i = t,
          s = i.flags;
        switch (i.tag) {
          case 22:
            (Qi(n, i), s & 2048 && Go(i.alternate, i));
            break;
          case 24:
            (Qi(n, i), s & 2048 && Qo(i.alternate, i));
            break;
          default:
            Qi(n, i);
        }
        t = t.sibling;
      }
  }
  var Fi = 8192;
  function Fl(e, t, n) {
    if (e.subtreeFlags & Fi)
      for (e = e.child; e !== null;) (Nm(e, t, n), (e = e.sibling));
  }
  function Nm(e, t, n) {
    switch (e.tag) {
      case 26:
        (Fl(e, t, n),
          e.flags & Fi &&
            e.memoizedState !== null &&
            b1(n, bn, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        Fl(e, t, n);
        break;
      case 3:
      case 4:
        var i = bn;
        ((bn = zu(e.stateNode.containerInfo)), Fl(e, t, n), (bn = i));
        break;
      case 22:
        e.memoizedState === null &&
          ((i = e.alternate),
          i !== null && i.memoizedState !== null
            ? ((i = Fi), (Fi = 16777216), Fl(e, t, n), (Fi = i))
            : Fl(e, t, n));
        break;
      default:
        Fl(e, t, n);
    }
  }
  function wm(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function Xi(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Tt = i), Dm(i, e));
        }
      wm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null;) (Am(e), (e = e.sibling));
  }
  function Am(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (Xi(e), e.flags & 2048 && Oa(9, e, e.return));
        break;
      case 3:
        Xi(e);
        break;
      case 12:
        Xi(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), Eu(e))
          : Xi(e);
        break;
      default:
        Xi(e);
    }
  }
  function Eu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ((Tt = i), Dm(i, e));
        }
      wm(e);
    }
    for (e = e.child; e !== null;) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (Oa(8, t, t.return), Eu(t));
          break;
        case 22:
          ((n = t.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), Eu(t)));
          break;
        default:
          Eu(t);
      }
      e = e.sibling;
    }
  }
  function Dm(e, t) {
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
          _i(n.memoizedState.cache);
      }
      if (((i = n.child), i !== null)) ((i.return = n), (Tt = i));
      else
        e: for (n = e; Tt !== null;) {
          i = Tt;
          var s = i.sibling,
            c = i.return;
          if ((vm(i), i === n)) {
            Tt = null;
            break e;
          }
          if (s !== null) {
            ((s.return = c), (Tt = s));
            break e;
          }
          Tt = c;
        }
    }
  }
  var Uv = {
      getCacheForType: function (e) {
        var t = wt(ht),
          n = t.data.get(e);
        return (n === void 0 && ((n = e()), t.data.set(e, n)), n);
      },
      cacheSignal: function () {
        return wt(ht).controller.signal;
      }
    },
    Lv = typeof WeakMap == "function" ? WeakMap : Map,
    Ie = 0,
    nt = null,
    je = null,
    ke = 0,
    $e = 0,
    Kt = null,
    Ma = !1,
    Xl = !1,
    Fo = !1,
    ua = 0,
    ct = 0,
    xa = 0,
    ol = 0,
    Xo = 0,
    Jt = 0,
    Zl = 0,
    Zi = null,
    Gt = null,
    Zo = !1,
    Su = 0,
    _m = 0,
    Tu = 1 / 0,
    Ru = null,
    za = null,
    Et = 0,
    Ua = null,
    Il = null,
    sa = 0,
    Io = 0,
    Ko = null,
    Om = null,
    Ii = 0,
    Jo = null;
  function $t() {
    return (Ie & 2) !== 0 && ke !== 0 ? ke & -ke : x.T !== null ? nc() : I();
  }
  function Mm() {
    if (Jt === 0)
      if ((ke & 536870912) === 0 || Ve) {
        var e = Vn;
        ((Vn <<= 1), (Vn & 3932160) === 0 && (Vn = 262144), (Jt = e));
      } else Jt = 536870912;
    return ((e = Zt.current), e !== null && (e.flags |= 32), Jt);
  }
  function Qt(e, t, n) {
    (((e === nt && ($e === 2 || $e === 9)) || e.cancelPendingCommit !== null) &&
      (Kl(e, 0), La(e, ke, Jt, !1)),
      Nn(e, n),
      ((Ie & 2) === 0 || e !== nt) &&
        (e === nt &&
          ((Ie & 2) === 0 && (ol |= n), ct === 4 && La(e, ke, Jt, !1)),
        _n(e)));
  }
  function xm(e, t, n) {
    if ((Ie & 6) !== 0) throw Error(u(327));
    var i = (!n && (t & 127) === 0 && (t & e.expiredLanes) === 0) || pa(e, t),
      s = i ? kv(e, t) : Po(e, t, !0),
      c = i;
    do {
      if (s === 0) {
        Xl && !i && La(e, t, 0, !1);
        break;
      } else {
        if (((n = e.current.alternate), c && !jv(n))) {
          ((s = Po(e, t, !1)), (c = !1));
          continue;
        }
        if (s === 2) {
          if (((c = t), e.errorRecoveryDisabledLanes & c)) var h = 0;
          else
            ((h = e.pendingLanes & -536870913),
              (h = h !== 0 ? h : h & 536870912 ? 536870912 : 0));
          if (h !== 0) {
            t = h;
            e: {
              var g = e;
              s = Zi;
              var E = g.current.memoizedState.isDehydrated;
              if ((E && (Kl(g, h).flags |= 256), (h = Po(g, h, !1)), h !== 2)) {
                if (Fo && !E) {
                  ((g.errorRecoveryDisabledLanes |= c), (ol |= c), (s = 4));
                  break e;
                }
                ((c = Gt),
                  (Gt = s),
                  c !== null &&
                    (Gt === null ? (Gt = c) : Gt.push.apply(Gt, c)));
              }
              s = h;
            }
            if (((c = !1), s !== 2)) continue;
          }
        }
        if (s === 1) {
          (Kl(e, 0), La(e, t, 0, !0));
          break;
        }
        e: {
          switch (((i = e), (c = s), c)) {
            case 0:
            case 1:
              throw Error(u(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              La(i, t, Jt, !Ma);
              break e;
            case 2:
              Gt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(u(329));
          }
          if ((t & 62914560) === t && ((s = Su + 300 - xt()), 10 < s)) {
            if ((La(i, t, Jt, !Ma), Sl(i, 0, !0) !== 0)) break e;
            ((sa = t),
              (i.timeoutHandle = o0(
                zm.bind(
                  null,
                  i,
                  n,
                  Gt,
                  Ru,
                  Zo,
                  t,
                  Jt,
                  ol,
                  Zl,
                  Ma,
                  c,
                  "Throttled",
                  -0,
                  0
                ),
                s
              )));
            break e;
          }
          zm(i, n, Gt, Ru, Zo, t, Jt, ol, Zl, Ma, c, null, -0, 0);
        }
      }
      break;
    } while (!0);
    _n(e);
  }
  function zm(e, t, n, i, s, c, h, g, E, z, V, F, L, k) {
    if (
      ((e.timeoutHandle = -1),
      (F = t.subtreeFlags),
      F & 8192 || (F & 16785408) === 16785408)
    ) {
      ((F = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Zn
      }),
        Nm(t, c, F));
      var de =
        (c & 62914560) === c ? Su - xt() : (c & 4194048) === c ? _m - xt() : 0;
      if (((de = E1(F, de)), de !== null)) {
        ((sa = c),
          (e.cancelPendingCommit = de(
            Vm.bind(null, e, t, c, n, i, s, h, g, E, V, F, null, L, k)
          )),
          La(e, c, h, !z));
        return;
      }
    }
    Vm(e, t, c, n, i, s, h, g, E);
  }
  function jv(e) {
    for (var t = e; ;) {
      var n = t.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        t.flags & 16384 &&
        ((n = t.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var i = 0; i < n.length; i++) {
          var s = n[i],
            c = s.getSnapshot;
          s = s.value;
          try {
            if (!Ft(c(), s)) return !1;
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
  function La(e, t, n, i) {
    ((t &= ~Xo),
      (t &= ~ol),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      i && (e.warmLanes |= t),
      (i = e.expirationTimes));
    for (var s = t; 0 < s;) {
      var c = 31 - _t(s),
        h = 1 << c;
      ((i[c] = -1), (s &= ~h));
    }
    n !== 0 && Ur(e, n, t);
  }
  function Cu() {
    return (Ie & 6) === 0 ? (Ki(0), !1) : !0;
  }
  function $o() {
    if (je !== null) {
      if ($e === 0) var e = je.return;
      else ((e = je), ($n = el = null), ho(e), (Hl = null), (Mi = 0), (e = je));
      for (; e !== null;) (cm(e.alternate, e), (e = e.return));
      je = null;
    }
  }
  function Kl(e, t) {
    var n = e.timeoutHandle;
    (n !== -1 && ((e.timeoutHandle = -1), n1(n)),
      (n = e.cancelPendingCommit),
      n !== null && ((e.cancelPendingCommit = null), n()),
      (sa = 0),
      $o(),
      (nt = e),
      (je = n = Kn(e.current, null)),
      (ke = t),
      ($e = 0),
      (Kt = null),
      (Ma = !1),
      (Xl = pa(e, t)),
      (Fo = !1),
      (Zl = Jt = Xo = ol = xa = ct = 0),
      (Gt = Zi = null),
      (Zo = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i;) {
        var s = 31 - _t(i),
          c = 1 << s;
        ((t |= e[s]), (i &= ~c));
      }
    return ((ua = t), Fr(), n);
  }
  function Um(e, t) {
    ((Me = null),
      (x.H = Hi),
      t === kl || t === Wr
        ? ((t = Jd()), ($e = 3))
        : t === eo
          ? ((t = Jd()), ($e = 4))
          : ($e =
              t === _o
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Kt = t),
      je === null && ((ct = 1), hu(e, ln(t, e.current))));
  }
  function Lm() {
    var e = Zt.current;
    return e === null
      ? !0
      : (ke & 4194048) === ke
        ? on === null
        : (ke & 62914560) === ke || (ke & 536870912) !== 0
          ? e === on
          : !1;
  }
  function jm() {
    var e = x.H;
    return ((x.H = Hi), e === null ? Hi : e);
  }
  function Bm() {
    var e = x.A;
    return ((x.A = Uv), e);
  }
  function Nu() {
    ((ct = 4),
      Ma || ((ke & 4194048) !== ke && Zt.current !== null) || (Xl = !0),
      ((xa & 134217727) === 0 && (ol & 134217727) === 0) ||
        nt === null ||
        La(nt, ke, Jt, !1));
  }
  function Po(e, t, n) {
    var i = Ie;
    Ie |= 2;
    var s = jm(),
      c = Bm();
    ((nt !== e || ke !== t) && ((Ru = null), Kl(e, t)), (t = !1));
    var h = ct;
    e: do
      try {
        if ($e !== 0 && je !== null) {
          var g = je,
            E = Kt;
          switch ($e) {
            case 8:
              ($o(), (h = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Zt.current === null && (t = !0);
              var z = $e;
              if ((($e = 0), (Kt = null), Jl(e, g, E, z), n && Xl)) {
                h = 0;
                break e;
              }
              break;
            default:
              ((z = $e), ($e = 0), (Kt = null), Jl(e, g, E, z));
          }
        }
        (Bv(), (h = ct));
        break;
      } catch (V) {
        Um(e, V);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      ($n = el = null),
      (Ie = i),
      (x.H = s),
      (x.A = c),
      je === null && ((nt = null), (ke = 0), Fr()),
      h
    );
  }
  function Bv() {
    for (; je !== null;) km(je);
  }
  function kv(e, t) {
    var n = Ie;
    Ie |= 2;
    var i = jm(),
      s = Bm();
    nt !== e || ke !== t
      ? ((Ru = null), (Tu = xt() + 500), Kl(e, t))
      : (Xl = pa(e, t));
    e: do
      try {
        if ($e !== 0 && je !== null) {
          t = je;
          var c = Kt;
          t: switch ($e) {
            case 1:
              (($e = 0), (Kt = null), Jl(e, t, c, 1));
              break;
            case 2:
            case 9:
              if (Id(c)) {
                (($e = 0), (Kt = null), Hm(t));
                break;
              }
              ((t = function () {
                (($e !== 2 && $e !== 9) || nt !== e || ($e = 7), _n(e));
              }),
                c.then(t, t));
              break e;
            case 3:
              $e = 7;
              break e;
            case 4:
              $e = 5;
              break e;
            case 7:
              Id(c)
                ? (($e = 0), (Kt = null), Hm(t))
                : (($e = 0), (Kt = null), Jl(e, t, c, 7));
              break;
            case 5:
              var h = null;
              switch (je.tag) {
                case 26:
                  h = je.memoizedState;
                case 5:
                case 27:
                  var g = je;
                  if (h ? C0(h) : g.stateNode.complete) {
                    (($e = 0), (Kt = null));
                    var E = g.sibling;
                    if (E !== null) je = E;
                    else {
                      var z = g.return;
                      z !== null ? ((je = z), wu(z)) : (je = null);
                    }
                    break t;
                  }
              }
              (($e = 0), (Kt = null), Jl(e, t, c, 5));
              break;
            case 6:
              (($e = 0), (Kt = null), Jl(e, t, c, 6));
              break;
            case 8:
              ($o(), (ct = 6));
              break e;
            default:
              throw Error(u(462));
          }
        }
        Hv();
        break;
      } catch (V) {
        Um(e, V);
      }
    while (!0);
    return (
      ($n = el = null),
      (x.H = i),
      (x.A = s),
      (Ie = n),
      je !== null ? 0 : ((nt = null), (ke = 0), Fr(), ct)
    );
  }
  function Hv() {
    for (; je !== null && !hs();) km(je);
  }
  function km(e) {
    var t = sm(e.alternate, e, ua);
    ((e.memoizedProps = e.pendingProps), t === null ? wu(e) : (je = t));
  }
  function Hm(e) {
    var t = e,
      n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = nm(n, t, t.pendingProps, t.type, void 0, ke);
        break;
      case 11:
        t = nm(n, t, t.pendingProps, t.type.render, t.ref, ke);
        break;
      case 5:
        ho(t);
      default:
        (cm(n, t), (t = je = Bd(t, ua)), (t = sm(n, t, ua)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? wu(e) : (je = t));
  }
  function Jl(e, t, n, i) {
    (($n = el = null), ho(t), (Hl = null), (Mi = 0));
    var s = t.return;
    try {
      if (Av(e, s, t, n, ke)) {
        ((ct = 1), hu(e, ln(n, e.current)), (je = null));
        return;
      }
    } catch (c) {
      if (s !== null) throw ((je = s), c);
      ((ct = 1), hu(e, ln(n, e.current)), (je = null));
      return;
    }
    t.flags & 32768
      ? (Ve || i === 1
          ? (e = !0)
          : Xl || (ke & 536870912) !== 0
            ? (e = !1)
            : ((Ma = e = !0),
              (i === 2 || i === 9 || i === 3 || i === 6) &&
                ((i = Zt.current),
                i !== null && i.tag === 13 && (i.flags |= 16384))),
        qm(t, e))
      : wu(t);
  }
  function wu(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        qm(t, Ma);
        return;
      }
      e = t.return;
      var n = Ov(t.alternate, t, ua);
      if (n !== null) {
        je = n;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        je = t;
        return;
      }
      je = t = e;
    } while (t !== null);
    ct === 0 && (ct = 5);
  }
  function qm(e, t) {
    do {
      var n = Mv(e.alternate, e);
      if (n !== null) {
        ((n.flags &= 32767), (je = n));
        return;
      }
      if (
        ((n = e.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        je = e;
        return;
      }
      je = e = n;
    } while (e !== null);
    ((ct = 6), (je = null));
  }
  function Vm(e, t, n, i, s, c, h, g, E) {
    e.cancelPendingCommit = null;
    do Au();
    while (Et !== 0);
    if ((Ie & 6) !== 0) throw Error(u(327));
    if (t !== null) {
      if (t === e.current) throw Error(u(177));
      if (
        ((c = t.lanes | t.childLanes),
        (c |= Hs),
        zr(e, n, c, h, g, E),
        e === nt && ((je = nt = null), (ke = 0)),
        (Il = t),
        (Ua = e),
        (sa = n),
        (Io = c),
        (Ko = s),
        (Om = i),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            Gv(ya, function () {
              return (Xm(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (i = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || i)
      ) {
        ((i = x.T), (x.T = null), (s = P.p), (P.p = 2), (h = Ie), (Ie |= 4));
        try {
          xv(e, t, n);
        } finally {
          ((Ie = h), (P.p = s), (x.T = i));
        }
      }
      ((Et = 1), Ym(), Gm(), Qm());
    }
  }
  function Ym() {
    if (Et === 1) {
      Et = 0;
      var e = Ua,
        t = Il,
        n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        ((n = x.T), (x.T = null));
        var i = P.p;
        P.p = 2;
        var s = Ie;
        Ie |= 4;
        try {
          Tm(t, e);
          var c = cc,
            h = Dd(e.containerInfo),
            g = c.focusedElem,
            E = c.selectionRange;
          if (
            h !== g &&
            g &&
            g.ownerDocument &&
            Ad(g.ownerDocument.documentElement, g)
          ) {
            if (E !== null && Us(g)) {
              var z = E.start,
                V = E.end;
              if ((V === void 0 && (V = z), "selectionStart" in g))
                ((g.selectionStart = z),
                  (g.selectionEnd = Math.min(V, g.value.length)));
              else {
                var F = g.ownerDocument || document,
                  L = (F && F.defaultView) || window;
                if (L.getSelection) {
                  var k = L.getSelection(),
                    de = g.textContent.length,
                    Re = Math.min(E.start, de),
                    tt = E.end === void 0 ? Re : Math.min(E.end, de);
                  !k.extend && Re > tt && ((h = tt), (tt = Re), (Re = h));
                  var _ = wd(g, Re),
                    w = wd(g, tt);
                  if (
                    _ &&
                    w &&
                    (k.rangeCount !== 1 ||
                      k.anchorNode !== _.node ||
                      k.anchorOffset !== _.offset ||
                      k.focusNode !== w.node ||
                      k.focusOffset !== w.offset)
                  ) {
                    var M = F.createRange();
                    (M.setStart(_.node, _.offset),
                      k.removeAllRanges(),
                      Re > tt
                        ? (k.addRange(M), k.extend(w.node, w.offset))
                        : (M.setEnd(w.node, w.offset), k.addRange(M)));
                  }
                }
              }
            }
            for (F = [], k = g; (k = k.parentNode);)
              k.nodeType === 1 &&
                F.push({ element: k, left: k.scrollLeft, top: k.scrollTop });
            for (
              typeof g.focus == "function" && g.focus(), g = 0;
              g < F.length;
              g++
            ) {
              var Q = F[g];
              ((Q.element.scrollLeft = Q.left), (Q.element.scrollTop = Q.top));
            }
          }
          ((Hu = !!oc), (cc = oc = null));
        } finally {
          ((Ie = s), (P.p = i), (x.T = n));
        }
      }
      ((e.current = t), (Et = 2));
    }
  }
  function Gm() {
    if (Et === 2) {
      Et = 0;
      var e = Ua,
        t = Il,
        n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        ((n = x.T), (x.T = null));
        var i = P.p;
        P.p = 2;
        var s = Ie;
        Ie |= 4;
        try {
          gm(e, t.alternate, t);
        } finally {
          ((Ie = s), (P.p = i), (x.T = n));
        }
      }
      Et = 3;
    }
  }
  function Qm() {
    if (Et === 4 || Et === 3) {
      ((Et = 0), ms());
      var e = Ua,
        t = Il,
        n = sa,
        i = Om;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Et = 5)
        : ((Et = 0), (Il = Ua = null), Fm(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (
        (s === 0 && (za = null),
        O(n),
        (t = t.stateNode),
        zt && typeof zt.onCommitFiberRoot == "function")
      )
        try {
          zt.onCommitFiberRoot(qn, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (i !== null) {
        ((t = x.T), (s = P.p), (P.p = 2), (x.T = null));
        try {
          for (var c = e.onRecoverableError, h = 0; h < i.length; h++) {
            var g = i[h];
            c(g.value, { componentStack: g.stack });
          }
        } finally {
          ((x.T = t), (P.p = s));
        }
      }
      ((sa & 3) !== 0 && Au(),
        _n(e),
        (s = e.pendingLanes),
        (n & 261930) !== 0 && (s & 42) !== 0
          ? e === Jo
            ? Ii++
            : ((Ii = 0), (Jo = e))
          : (Ii = 0),
        Ki(0));
    }
  }
  function Fm(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), _i(t)));
  }
  function Au() {
    return (Ym(), Gm(), Qm(), Xm());
  }
  function Xm() {
    if (Et !== 5) return !1;
    var e = Ua,
      t = Io;
    Io = 0;
    var n = O(sa),
      i = x.T,
      s = P.p;
    try {
      ((P.p = 32 > n ? 32 : n), (x.T = null), (n = Ko), (Ko = null));
      var c = Ua,
        h = sa;
      if (((Et = 0), (Il = Ua = null), (sa = 0), (Ie & 6) !== 0))
        throw Error(u(331));
      var g = Ie;
      if (
        ((Ie |= 4),
        Am(c.current),
        Cm(c, c.current, h, n),
        (Ie = g),
        Ki(0, !1),
        zt && typeof zt.onPostCommitFiberRoot == "function")
      )
        try {
          zt.onPostCommitFiberRoot(qn, c);
        } catch {}
      return !0;
    } finally {
      ((P.p = s), (x.T = i), Fm(e, t));
    }
  }
  function Zm(e, t, n) {
    ((t = ln(n, t)),
      (t = Do(e.stateNode, t, 2)),
      (e = Aa(e, t, 2)),
      e !== null && (Nn(e, 2), _n(e)));
  }
  function Pe(e, t, n) {
    if (e.tag === 3) Zm(e, e, n);
    else
      for (; t !== null;) {
        if (t.tag === 3) {
          Zm(t, e, n);
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof i.componentDidCatch == "function" &&
              (za === null || !za.has(i)))
          ) {
            ((e = ln(n, e)),
              (n = Ih(2)),
              (i = Aa(t, n, 2)),
              i !== null && (Kh(n, i, t, e), Nn(i, 2), _n(i)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Wo(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new Lv();
      var s = new Set();
      i.set(t, s);
    } else ((s = i.get(t)), s === void 0 && ((s = new Set()), i.set(t, s)));
    s.has(n) ||
      ((Fo = !0), s.add(n), (e = qv.bind(null, e, t, n)), t.then(e, e));
  }
  function qv(e, t, n) {
    var i = e.pingCache;
    (i !== null && i.delete(t),
      (e.pingedLanes |= e.suspendedLanes & n),
      (e.warmLanes &= ~n),
      nt === e &&
        (ke & n) === n &&
        (ct === 4 || (ct === 3 && (ke & 62914560) === ke && 300 > xt() - Su)
          ? (Ie & 2) === 0 && Kl(e, 0)
          : (Xo |= n),
        Zl === ke && (Zl = 0)),
      _n(e));
  }
  function Im(e, t) {
    (t === 0 && (t = gi()), (e = $a(e, t)), e !== null && (Nn(e, t), _n(e)));
  }
  function Vv(e) {
    var t = e.memoizedState,
      n = 0;
    (t !== null && (n = t.retryLane), Im(e, n));
  }
  function Yv(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode,
          s = e.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(u(314));
    }
    (i !== null && i.delete(t), Im(e, n));
  }
  function Gv(e, t) {
    return El(e, t);
  }
  var Du = null,
    $l = null,
    ec = !1,
    _u = !1,
    tc = !1,
    ja = 0;
  function _n(e) {
    (e !== $l &&
      e.next === null &&
      ($l === null ? (Du = $l = e) : ($l = $l.next = e)),
      (_u = !0),
      ec || ((ec = !0), Fv()));
  }
  function Ki(e, t) {
    if (!tc && _u) {
      tc = !0;
      do
        for (var n = !1, i = Du; i !== null;) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var c = 0;
            else {
              var h = i.suspendedLanes,
                g = i.pingedLanes;
              ((c = (1 << (31 - _t(42 | e) + 1)) - 1),
                (c &= s & ~(h & ~g)),
                (c = c & 201326741 ? (c & 201326741) | 1 : c ? c | 2 : 0));
            }
            c !== 0 && ((n = !0), Pm(i, c));
          } else
            ((c = ke),
              (c = Sl(
                i,
                i === nt ? c : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== -1
              )),
              (c & 3) === 0 || pa(i, c) || ((n = !0), Pm(i, c)));
          i = i.next;
        }
      while (n);
      tc = !1;
    }
  }
  function Qv() {
    Km();
  }
  function Km() {
    _u = ec = !1;
    var e = 0;
    ja !== 0 && t1() && (e = ja);
    for (var t = xt(), n = null, i = Du; i !== null;) {
      var s = i.next,
        c = Jm(i, t);
      (c === 0
        ? ((i.next = null),
          n === null ? (Du = s) : (n.next = s),
          s === null && ($l = n))
        : ((n = i), (e !== 0 || (c & 3) !== 0) && (_u = !0)),
        (i = s));
    }
    ((Et !== 0 && Et !== 5) || Ki(e), ja !== 0 && (ja = 0));
  }
  function Jm(e, t) {
    for (
      var n = e.suspendedLanes,
        i = e.pingedLanes,
        s = e.expirationTimes,
        c = e.pendingLanes & -62914561;
      0 < c;
    ) {
      var h = 31 - _t(c),
        g = 1 << h,
        E = s[h];
      (E === -1
        ? ((g & n) === 0 || (g & i) !== 0) && (s[h] = vs(g, t))
        : E <= t && (e.expiredLanes |= g),
        (c &= ~g));
    }
    if (
      ((t = nt),
      (n = ke),
      (n = Sl(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      (i = e.callbackNode),
      n === 0 ||
        (e === t && ($e === 2 || $e === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        i !== null && i !== null && yi(i),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((n & 3) === 0 || pa(e, n)) {
      if (((t = n & -n), t === e.callbackPriority)) return t;
      switch ((i !== null && yi(i), O(n))) {
        case 2:
        case 8:
          n = pi;
          break;
        case 32:
          n = ya;
          break;
        case 268435456:
          n = Wt;
          break;
        default:
          n = ya;
      }
      return (
        (i = $m.bind(null, e)),
        (n = El(n, i)),
        (e.callbackPriority = t),
        (e.callbackNode = n),
        t
      );
    }
    return (
      i !== null && i !== null && yi(i),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function $m(e, t) {
    if (Et !== 0 && Et !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var n = e.callbackNode;
    if (Au() && e.callbackNode !== n) return null;
    var i = ke;
    return (
      (i = Sl(
        e,
        e === nt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1
      )),
      i === 0
        ? null
        : (xm(e, i, t),
          Jm(e, xt()),
          e.callbackNode != null && e.callbackNode === n
            ? $m.bind(null, e)
            : null)
    );
  }
  function Pm(e, t) {
    if (Au()) return null;
    xm(e, t, !0);
  }
  function Fv() {
    a1(function () {
      (Ie & 6) !== 0 ? El(ma, Qv) : Km();
    });
  }
  function nc() {
    if (ja === 0) {
      var e = jl;
      (e === 0 && ((e = Fa), (Fa <<= 1), (Fa & 261888) === 0 && (Fa = 256)),
        (ja = e));
    }
    return ja;
  }
  function Wm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Br("" + e);
  }
  function e0(e, t) {
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
  function Xv(e, t, n, i, s) {
    if (t === "submit" && n && n.stateNode === s) {
      var c = Wm((s[ae] || null).action),
        h = i.submitter;
      h &&
        ((t = (t = h[ae] || null)
          ? Wm(t.formAction)
          : h.getAttribute("formAction")),
        t !== null && ((c = t), (h = null)));
      var g = new Vr("action", "action", null, i, s);
      e.push({
        event: g,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (i.defaultPrevented) {
                if (ja !== 0) {
                  var E = h ? e0(s, h) : new FormData(s);
                  To(
                    n,
                    { pending: !0, data: E, method: s.method, action: c },
                    null,
                    E
                  );
                }
              } else
                typeof c == "function" &&
                  (g.preventDefault(),
                  (E = h ? e0(s, h) : new FormData(s)),
                  To(
                    n,
                    { pending: !0, data: E, method: s.method, action: c },
                    c,
                    E
                  ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var ac = 0; ac < ks.length; ac++) {
    var lc = ks[ac],
      Zv = lc.toLowerCase(),
      Iv = lc[0].toUpperCase() + lc.slice(1);
    vn(Zv, "on" + Iv);
  }
  (vn(Md, "onAnimationEnd"),
    vn(xd, "onAnimationIteration"),
    vn(zd, "onAnimationStart"),
    vn("dblclick", "onDoubleClick"),
    vn("focusin", "onFocus"),
    vn("focusout", "onBlur"),
    vn(cv, "onTransitionRun"),
    vn(fv, "onTransitionStart"),
    vn(dv, "onTransitionCancel"),
    vn(Ud, "onTransitionEnd"),
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
  var Ji =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    Kv = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(Ji)
    );
  function t0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n],
        s = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var h = i.length - 1; 0 <= h; h--) {
            var g = i[h],
              E = g.instance,
              z = g.currentTarget;
            if (((g = g.listener), E !== c && s.isPropagationStopped()))
              break e;
            ((c = g), (s.currentTarget = z));
            try {
              c(s);
            } catch (V) {
              Qr(V);
            }
            ((s.currentTarget = null), (c = E));
          }
        else
          for (h = 0; h < i.length; h++) {
            if (
              ((g = i[h]),
              (E = g.instance),
              (z = g.currentTarget),
              (g = g.listener),
              E !== c && s.isPropagationStopped())
            )
              break e;
            ((c = g), (s.currentTarget = z));
            try {
              c(s);
            } catch (V) {
              Qr(V);
            }
            ((s.currentTarget = null), (c = E));
          }
      }
    }
  }
  function Be(e, t) {
    var n = t[Ne];
    n === void 0 && (n = t[Ne] = new Set());
    var i = e + "__bubble";
    n.has(i) || (n0(t, e, 2, !1), n.add(i));
  }
  function ic(e, t, n) {
    var i = 0;
    (t && (i |= 4), n0(n, e, i, t));
  }
  var Ou = "_reactListening" + Math.random().toString(36).slice(2);
  function rc(e) {
    if (!e[Ou]) {
      ((e[Ou] = !0),
        gn.forEach(function (n) {
          n !== "selectionchange" && (Kv.has(n) || ic(n, !1, e), ic(n, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Ou] || ((t[Ou] = !0), ic("selectionchange", !1, t));
    }
  }
  function n0(e, t, n, i) {
    switch (M0(t)) {
      case 2:
        var s = R1;
        break;
      case 8:
        s = C1;
        break;
      default:
        s = Sc;
    }
    ((n = s.bind(null, t, n, e)),
      (s = void 0),
      !Ns ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (s = !0),
      i
        ? s !== void 0
          ? e.addEventListener(t, n, { capture: !0, passive: s })
          : e.addEventListener(t, n, !0)
        : s !== void 0
          ? e.addEventListener(t, n, { passive: s })
          : e.addEventListener(t, n, !1));
  }
  function uc(e, t, n, i, s) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (;;) {
        if (i === null) return;
        var h = i.tag;
        if (h === 3 || h === 4) {
          var g = i.stateNode.containerInfo;
          if (g === s) break;
          if (h === 4)
            for (h = i.return; h !== null;) {
              var E = h.tag;
              if ((E === 3 || E === 4) && h.stateNode.containerInfo === s)
                return;
              h = h.return;
            }
          for (; g !== null;) {
            if (((h = at(g)), h === null)) return;
            if (((E = h.tag), E === 5 || E === 6 || E === 26 || E === 27)) {
              i = c = h;
              continue e;
            }
            g = g.parentNode;
          }
        }
        i = i.return;
      }
    ud(function () {
      var z = c,
        V = Rs(n),
        F = [];
      e: {
        var L = Ld.get(e);
        if (L !== void 0) {
          var k = Vr,
            de = e;
          switch (e) {
            case "keypress":
              if (Hr(n) === 0) break e;
            case "keydown":
            case "keyup":
              k = Yg;
              break;
            case "focusin":
              ((de = "focus"), (k = _s));
              break;
            case "focusout":
              ((de = "blur"), (k = _s));
              break;
            case "beforeblur":
            case "afterblur":
              k = _s;
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
              k = cd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              k = Og;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              k = Fg;
              break;
            case Md:
            case xd:
            case zd:
              k = zg;
              break;
            case Ud:
              k = Zg;
              break;
            case "scroll":
            case "scrollend":
              k = Dg;
              break;
            case "wheel":
              k = Kg;
              break;
            case "copy":
            case "cut":
            case "paste":
              k = Lg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              k = dd;
              break;
            case "toggle":
            case "beforetoggle":
              k = $g;
          }
          var Re = (t & 4) !== 0,
            tt = !Re && (e === "scroll" || e === "scrollend"),
            _ = Re ? (L !== null ? L + "Capture" : null) : L;
          Re = [];
          for (var w = z, M; w !== null;) {
            var Q = w;
            if (
              ((M = Q.stateNode),
              (Q = Q.tag),
              (Q !== 5 && Q !== 26 && Q !== 27) ||
                M === null ||
                _ === null ||
                ((Q = vi(w, _)), Q != null && Re.push($i(w, Q, M))),
              tt)
            )
              break;
            w = w.return;
          }
          0 < Re.length &&
            ((L = new k(L, de, null, n, V)),
            F.push({ event: L, listeners: Re }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((L = e === "mouseover" || e === "pointerover"),
            (k = e === "mouseout" || e === "pointerout"),
            L &&
              n !== Ts &&
              (de = n.relatedTarget || n.fromElement) &&
              (at(de) || de[oe]))
          )
            break e;
          if (
            (k || L) &&
            ((L =
              V.window === V
                ? V
                : (L = V.ownerDocument)
                  ? L.defaultView || L.parentWindow
                  : window),
            k
              ? ((de = n.relatedTarget || n.toElement),
                (k = z),
                (de = de ? at(de) : null),
                de !== null &&
                  ((tt = f(de)),
                  (Re = de.tag),
                  de !== tt || (Re !== 5 && Re !== 27 && Re !== 6)) &&
                  (de = null))
              : ((k = null), (de = z)),
            k !== de)
          ) {
            if (
              ((Re = cd),
              (Q = "onMouseLeave"),
              (_ = "onMouseEnter"),
              (w = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((Re = dd),
                (Q = "onPointerLeave"),
                (_ = "onPointerEnter"),
                (w = "pointer")),
              (tt = k == null ? L : Ut(k)),
              (M = de == null ? L : Ut(de)),
              (L = new Re(Q, w + "leave", k, n, V)),
              (L.target = tt),
              (L.relatedTarget = M),
              (Q = null),
              at(V) === z &&
                ((Re = new Re(_, w + "enter", de, n, V)),
                (Re.target = M),
                (Re.relatedTarget = tt),
                (Q = Re)),
              (tt = Q),
              k && de)
            )
              t: {
                for (Re = Jv, _ = k, w = de, M = 0, Q = _; Q; Q = Re(Q)) M++;
                Q = 0;
                for (var be = w; be; be = Re(be)) Q++;
                for (; 0 < M - Q;) ((_ = Re(_)), M--);
                for (; 0 < Q - M;) ((w = Re(w)), Q--);
                for (; M--;) {
                  if (_ === w || (w !== null && _ === w.alternate)) {
                    Re = _;
                    break t;
                  }
                  ((_ = Re(_)), (w = Re(w)));
                }
                Re = null;
              }
            else Re = null;
            (k !== null && a0(F, L, k, Re, !1),
              de !== null && tt !== null && a0(F, tt, de, Re, !0));
          }
        }
        e: {
          if (
            ((L = z ? Ut(z) : window),
            (k = L.nodeName && L.nodeName.toLowerCase()),
            k === "select" || (k === "input" && L.type === "file"))
          )
            var Qe = Ed;
          else if (vd(L))
            if (Sd) Qe = uv;
            else {
              Qe = iv;
              var pe = lv;
            }
          else
            ((k = L.nodeName),
              !k ||
              k.toLowerCase() !== "input" ||
              (L.type !== "checkbox" && L.type !== "radio")
                ? z && Ss(z.elementType) && (Qe = Ed)
                : (Qe = rv));
          if (Qe && (Qe = Qe(e, z))) {
            bd(F, Qe, n, V);
            break e;
          }
          (pe && pe(e, L, z),
            e === "focusout" &&
              z &&
              L.type === "number" &&
              z.memoizedProps.value != null &&
              Es(L, "number", L.value));
        }
        switch (((pe = z ? Ut(z) : window), e)) {
          case "focusin":
            (vd(pe) || pe.contentEditable === "true") &&
              ((Dl = pe), (Ls = z), (wi = null));
            break;
          case "focusout":
            wi = Ls = Dl = null;
            break;
          case "mousedown":
            js = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((js = !1), _d(F, n, V));
            break;
          case "selectionchange":
            if (ov) break;
          case "keydown":
          case "keyup":
            _d(F, n, V);
        }
        var xe;
        if (Ms)
          e: {
            switch (e) {
              case "compositionstart":
                var He = "onCompositionStart";
                break e;
              case "compositionend":
                He = "onCompositionEnd";
                break e;
              case "compositionupdate":
                He = "onCompositionUpdate";
                break e;
            }
            He = void 0;
          }
        else
          Al
            ? pd(e, n) && (He = "onCompositionEnd")
            : e === "keydown" &&
              n.keyCode === 229 &&
              (He = "onCompositionStart");
        (He &&
          (hd &&
            n.locale !== "ko" &&
            (Al || He !== "onCompositionStart"
              ? He === "onCompositionEnd" && Al && (xe = sd())
              : ((Ea = V),
                (ws = "value" in Ea ? Ea.value : Ea.textContent),
                (Al = !0))),
          (pe = Mu(z, He)),
          0 < pe.length &&
            ((He = new fd(He, e, null, n, V)),
            F.push({ event: He, listeners: pe }),
            xe
              ? (He.data = xe)
              : ((xe = gd(n)), xe !== null && (He.data = xe)))),
          (xe = Wg ? ev(e, n) : tv(e, n)) &&
            ((He = Mu(z, "onBeforeInput")),
            0 < He.length &&
              ((pe = new fd("onBeforeInput", "beforeinput", null, n, V)),
              F.push({ event: pe, listeners: He }),
              (pe.data = xe))),
          Xv(F, e, z, n, V));
      }
      t0(F, t);
    });
  }
  function $i(e, t, n) {
    return { instance: e, listener: t, currentTarget: n };
  }
  function Mu(e, t) {
    for (var n = t + "Capture", i = []; e !== null;) {
      var s = e,
        c = s.stateNode;
      if (
        ((s = s.tag),
        (s !== 5 && s !== 26 && s !== 27) ||
          c === null ||
          ((s = vi(e, n)),
          s != null && i.unshift($i(e, s, c)),
          (s = vi(e, t)),
          s != null && i.push($i(e, s, c))),
        e.tag === 3)
      )
        return i;
      e = e.return;
    }
    return [];
  }
  function Jv(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function a0(e, t, n, i, s) {
    for (var c = t._reactName, h = []; n !== null && n !== i;) {
      var g = n,
        E = g.alternate,
        z = g.stateNode;
      if (((g = g.tag), E !== null && E === i)) break;
      ((g !== 5 && g !== 26 && g !== 27) ||
        z === null ||
        ((E = z),
        s
          ? ((z = vi(n, c)), z != null && h.unshift($i(n, z, E)))
          : s || ((z = vi(n, c)), z != null && h.push($i(n, z, E)))),
        (n = n.return));
    }
    h.length !== 0 && e.push({ event: t, listeners: h });
  }
  var $v = /\r\n?/g,
    Pv = /\u0000|\uFFFD/g;
  function l0(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        $v,
        `
`
      )
      .replace(Pv, "");
  }
  function i0(e, t) {
    return ((t = l0(t)), l0(e) === t);
  }
  function et(e, t, n, i, s, c) {
    switch (n) {
      case "children":
        typeof i == "string"
          ? t === "body" || (t === "textarea" && i === "") || Cl(e, i)
          : (typeof i == "number" || typeof i == "bigint") &&
            t !== "body" &&
            Cl(e, "" + i);
        break;
      case "className":
        Xn(e, "class", i);
        break;
      case "tabIndex":
        Xn(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xn(e, n, i);
        break;
      case "style":
        id(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          Xn(e, "data", i);
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
        ((i = Br("" + i)), e.setAttribute(n, i));
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
              ? (t !== "input" && et(e, t, "name", s.name, s, null),
                et(e, t, "formEncType", s.formEncType, s, null),
                et(e, t, "formMethod", s.formMethod, s, null),
                et(e, t, "formTarget", s.formTarget, s, null))
              : (et(e, t, "encType", s.encType, s, null),
                et(e, t, "method", s.method, s, null),
                et(e, t, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        ((i = Br("" + i)), e.setAttribute(n, i));
        break;
      case "onClick":
        i != null && (e.onclick = Zn);
        break;
      case "onScroll":
        i != null && Be("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Be("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (((n = i.__html), n != null)) {
            if (s.children != null) throw Error(u(60));
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
        ((n = Br("" + i)),
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
        (Be("beforetoggle", e), Be("toggle", e), Fn(e, "popover", i));
        break;
      case "xlinkActuate":
        De(e, "http://www.w3.org/1999/xlink", "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        De(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", i);
        break;
      case "xlinkRole":
        De(e, "http://www.w3.org/1999/xlink", "xlink:role", i);
        break;
      case "xlinkShow":
        De(e, "http://www.w3.org/1999/xlink", "xlink:show", i);
        break;
      case "xlinkTitle":
        De(e, "http://www.w3.org/1999/xlink", "xlink:title", i);
        break;
      case "xlinkType":
        De(e, "http://www.w3.org/1999/xlink", "xlink:type", i);
        break;
      case "xmlBase":
        De(e, "http://www.w3.org/XML/1998/namespace", "xml:base", i);
        break;
      case "xmlLang":
        De(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", i);
        break;
      case "xmlSpace":
        De(e, "http://www.w3.org/XML/1998/namespace", "xml:space", i);
        break;
      case "is":
        Fn(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = wg.get(n) || n), Fn(e, n, i));
    }
  }
  function sc(e, t, n, i, s, c) {
    switch (n) {
      case "style":
        id(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i)) throw Error(u(61));
          if (((n = i.__html), n != null)) {
            if (s.children != null) throw Error(u(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string"
          ? Cl(e, i)
          : (typeof i == "number" || typeof i == "bigint") && Cl(e, "" + i);
        break;
      case "onScroll":
        i != null && Be("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Be("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = Zn);
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
        if (!Yn.hasOwnProperty(n))
          e: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((s = n.endsWith("Capture")),
              (t = n.slice(2, s ? n.length - 7 : void 0)),
              (c = e[ae] || null),
              (c = c != null ? c[n] : null),
              typeof c == "function" && e.removeEventListener(t, c, s),
              typeof i == "function")
            ) {
              (typeof c != "function" &&
                c !== null &&
                (n in e
                  ? (e[n] = null)
                  : e.hasAttribute(n) && e.removeAttribute(n)),
                e.addEventListener(t, i, s));
              break e;
            }
            n in e
              ? (e[n] = i)
              : i === !0
                ? e.setAttribute(n, "")
                : Fn(e, n, i);
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
        (Be("error", e), Be("load", e));
        var i = !1,
          s = !1,
          c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var h = n[c];
            if (h != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(u(137, t));
                default:
                  et(e, t, c, h, n, null);
              }
          }
        (s && et(e, t, "srcSet", n.srcSet, n, null),
          i && et(e, t, "src", n.src, n, null));
        return;
      case "input":
        Be("invalid", e);
        var g = (c = h = s = null),
          E = null,
          z = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var V = n[i];
            if (V != null)
              switch (i) {
                case "name":
                  s = V;
                  break;
                case "type":
                  h = V;
                  break;
                case "checked":
                  E = V;
                  break;
                case "defaultChecked":
                  z = V;
                  break;
                case "value":
                  c = V;
                  break;
                case "defaultValue":
                  g = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null) throw Error(u(137, t));
                  break;
                default:
                  et(e, t, i, V, n, null);
              }
          }
        td(e, c, g, E, z, h, s, !1);
        return;
      case "select":
        (Be("invalid", e), (i = h = c = null));
        for (s in n)
          if (n.hasOwnProperty(s) && ((g = n[s]), g != null))
            switch (s) {
              case "value":
                c = g;
                break;
              case "defaultValue":
                h = g;
                break;
              case "multiple":
                i = g;
              default:
                et(e, t, s, g, n, null);
            }
        ((t = c),
          (n = h),
          (e.multiple = !!i),
          t != null ? Rl(e, !!i, t, !1) : n != null && Rl(e, !!i, n, !0));
        return;
      case "textarea":
        (Be("invalid", e), (c = s = i = null));
        for (h in n)
          if (n.hasOwnProperty(h) && ((g = n[h]), g != null))
            switch (h) {
              case "value":
                i = g;
                break;
              case "defaultValue":
                s = g;
                break;
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                if (g != null) throw Error(u(91));
                break;
              default:
                et(e, t, h, g, n, null);
            }
        ad(e, i, s, c);
        return;
      case "option":
        for (E in n)
          n.hasOwnProperty(E) &&
            ((i = n[E]), i != null) &&
            (E === "selected"
              ? (e.selected =
                  i && typeof i != "function" && typeof i != "symbol")
              : et(e, t, E, i, n, null));
        return;
      case "dialog":
        (Be("beforetoggle", e),
          Be("toggle", e),
          Be("cancel", e),
          Be("close", e));
        break;
      case "iframe":
      case "object":
        Be("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ji.length; i++) Be(Ji[i], e);
        break;
      case "image":
        (Be("error", e), Be("load", e));
        break;
      case "details":
        Be("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (Be("error", e), Be("load", e));
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
        for (z in n)
          if (n.hasOwnProperty(z) && ((i = n[z]), i != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(u(137, t));
              default:
                et(e, t, z, i, n, null);
            }
        return;
      default:
        if (Ss(t)) {
          for (V in n)
            n.hasOwnProperty(V) &&
              ((i = n[V]), i !== void 0 && sc(e, t, V, i, n, void 0));
          return;
        }
    }
    for (g in n)
      n.hasOwnProperty(g) && ((i = n[g]), i != null && et(e, t, g, i, n, null));
  }
  function Wv(e, t, n, i) {
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
        var s = null,
          c = null,
          h = null,
          g = null,
          E = null,
          z = null,
          V = null;
        for (k in n) {
          var F = n[k];
          if (n.hasOwnProperty(k) && F != null)
            switch (k) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = F;
              default:
                i.hasOwnProperty(k) || et(e, t, k, null, i, F);
            }
        }
        for (var L in i) {
          var k = i[L];
          if (((F = n[L]), i.hasOwnProperty(L) && (k != null || F != null)))
            switch (L) {
              case "type":
                c = k;
                break;
              case "name":
                s = k;
                break;
              case "checked":
                z = k;
                break;
              case "defaultChecked":
                V = k;
                break;
              case "value":
                h = k;
                break;
              case "defaultValue":
                g = k;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (k != null) throw Error(u(137, t));
                break;
              default:
                k !== F && et(e, t, L, k, i, F);
            }
        }
        bs(e, h, g, E, z, V, c, s);
        return;
      case "select":
        k = h = g = L = null;
        for (c in n)
          if (((E = n[c]), n.hasOwnProperty(c) && E != null))
            switch (c) {
              case "value":
                break;
              case "multiple":
                k = E;
              default:
                i.hasOwnProperty(c) || et(e, t, c, null, i, E);
            }
        for (s in i)
          if (
            ((c = i[s]),
            (E = n[s]),
            i.hasOwnProperty(s) && (c != null || E != null))
          )
            switch (s) {
              case "value":
                L = c;
                break;
              case "defaultValue":
                g = c;
                break;
              case "multiple":
                h = c;
              default:
                c !== E && et(e, t, s, c, i, E);
            }
        ((t = g),
          (n = h),
          (i = k),
          L != null
            ? Rl(e, !!n, L, !1)
            : !!i != !!n &&
              (t != null ? Rl(e, !!n, t, !0) : Rl(e, !!n, n ? [] : "", !1)));
        return;
      case "textarea":
        k = L = null;
        for (g in n)
          if (
            ((s = n[g]),
            n.hasOwnProperty(g) && s != null && !i.hasOwnProperty(g))
          )
            switch (g) {
              case "value":
                break;
              case "children":
                break;
              default:
                et(e, t, g, null, i, s);
            }
        for (h in i)
          if (
            ((s = i[h]),
            (c = n[h]),
            i.hasOwnProperty(h) && (s != null || c != null))
          )
            switch (h) {
              case "value":
                L = s;
                break;
              case "defaultValue":
                k = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(u(91));
                break;
              default:
                s !== c && et(e, t, h, s, i, c);
            }
        nd(e, L, k);
        return;
      case "option":
        for (var de in n)
          ((L = n[de]),
            n.hasOwnProperty(de) &&
              L != null &&
              !i.hasOwnProperty(de) &&
              (de === "selected"
                ? (e.selected = !1)
                : et(e, t, de, null, i, L)));
        for (E in i)
          ((L = i[E]),
            (k = n[E]),
            i.hasOwnProperty(E) &&
              L !== k &&
              (L != null || k != null) &&
              (E === "selected"
                ? (e.selected =
                    L && typeof L != "function" && typeof L != "symbol")
                : et(e, t, E, L, i, k)));
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
        for (var Re in n)
          ((L = n[Re]),
            n.hasOwnProperty(Re) &&
              L != null &&
              !i.hasOwnProperty(Re) &&
              et(e, t, Re, null, i, L));
        for (z in i)
          if (
            ((L = i[z]),
            (k = n[z]),
            i.hasOwnProperty(z) && L !== k && (L != null || k != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (L != null) throw Error(u(137, t));
                break;
              default:
                et(e, t, z, L, i, k);
            }
        return;
      default:
        if (Ss(t)) {
          for (var tt in n)
            ((L = n[tt]),
              n.hasOwnProperty(tt) &&
                L !== void 0 &&
                !i.hasOwnProperty(tt) &&
                sc(e, t, tt, void 0, i, L));
          for (V in i)
            ((L = i[V]),
              (k = n[V]),
              !i.hasOwnProperty(V) ||
                L === k ||
                (L === void 0 && k === void 0) ||
                sc(e, t, V, L, i, k));
          return;
        }
    }
    for (var _ in n)
      ((L = n[_]),
        n.hasOwnProperty(_) &&
          L != null &&
          !i.hasOwnProperty(_) &&
          et(e, t, _, null, i, L));
    for (F in i)
      ((L = i[F]),
        (k = n[F]),
        !i.hasOwnProperty(F) ||
          L === k ||
          (L == null && k == null) ||
          et(e, t, F, L, i, k));
  }
  function r0(e) {
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
  function e1() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0;
        i < n.length;
        i++
      ) {
        var s = n[i],
          c = s.transferSize,
          h = s.initiatorType,
          g = s.duration;
        if (c && g && r0(h)) {
          for (h = 0, g = s.responseEnd, i += 1; i < n.length; i++) {
            var E = n[i],
              z = E.startTime;
            if (z > g) break;
            var V = E.transferSize,
              F = E.initiatorType;
            V &&
              r0(F) &&
              ((E = E.responseEnd), (h += V * (E < g ? 1 : (g - z) / (E - z))));
          }
          if ((--i, (t += (8 * (c + h)) / (s.duration / 1e3)), e++, 10 < e))
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
  var oc = null,
    cc = null;
  function xu(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function u0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function s0(e, t) {
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
  function fc(e, t) {
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
  var dc = null;
  function t1() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === dc
        ? !1
        : ((dc = e), !0)
      : ((dc = null), !1);
  }
  var o0 = typeof setTimeout == "function" ? setTimeout : void 0,
    n1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    c0 = typeof Promise == "function" ? Promise : void 0,
    a1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof c0 < "u"
          ? function (e) {
              return c0.resolve(null).then(e).catch(l1);
            }
          : o0;
  function l1(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function Ba(e) {
    return e === "head";
  }
  function f0(e, t) {
    var n = t,
      i = 0;
    do {
      var s = n.nextSibling;
      if ((e.removeChild(n), s && s.nodeType === 8))
        if (((n = s.data), n === "/$" || n === "/&")) {
          if (i === 0) {
            (e.removeChild(s), ti(t));
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
        else if (n === "html") Pi(e.ownerDocument.documentElement);
        else if (n === "head") {
          ((n = e.ownerDocument.head), Pi(n));
          for (var c = n.firstChild; c;) {
            var h = c.nextSibling,
              g = c.nodeName;
            (c[Je] ||
              g === "SCRIPT" ||
              g === "STYLE" ||
              (g === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(c),
              (c = h));
          }
        } else n === "body" && Pi(e.ownerDocument.body);
      n = s;
    } while (n);
    ti(t);
  }
  function d0(e, t) {
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
  function hc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
      var n = t;
      switch (((t = t.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (hc(n), Ge(n));
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
  function i1(e, t, n, i) {
    for (; e.nodeType === 1;) {
      var s = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (i) {
        if (!e[Je])
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
                c !== s.rel ||
                e.getAttribute("href") !==
                  (s.href == null || s.href === "" ? null : s.href) ||
                e.getAttribute("crossorigin") !==
                  (s.crossOrigin == null ? null : s.crossOrigin) ||
                e.getAttribute("title") !== (s.title == null ? null : s.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((c = e.getAttribute("src")),
                (c !== (s.src == null ? null : s.src) ||
                  e.getAttribute("type") !== (s.type == null ? null : s.type) ||
                  e.getAttribute("crossorigin") !==
                    (s.crossOrigin == null ? null : s.crossOrigin)) &&
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
        var c = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === c) return e;
      } else return e;
      if (((e = cn(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function r1(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !n) ||
        ((e = cn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function h0(e, t) {
    for (; e.nodeType !== 8;)
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !t) ||
        ((e = cn(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function mc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function yc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState !== "loading")
    );
  }
  function u1(e, t) {
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
  function cn(e) {
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
  var pc = null;
  function m0(e) {
    e = e.nextSibling;
    for (var t = 0; e;) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0) return cn(e.nextSibling);
          t--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function y0(e) {
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
  function p0(e, t, n) {
    switch (((t = xu(n)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(u(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(u(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(u(454));
        return e;
      default:
        throw Error(u(451));
    }
  }
  function Pi(e) {
    for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
    Ge(e);
  }
  var fn = new Map(),
    g0 = new Set();
  function zu(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var oa = P.d;
  P.d = { f: s1, r: o1, D: c1, C: f1, L: d1, m: h1, X: y1, S: m1, M: p1 };
  function s1() {
    var e = oa.f(),
      t = Cu();
    return e || t;
  }
  function o1(e) {
    var t = Oe(e);
    t !== null && t.tag === 5 && t.type === "form" ? Uh(t) : oa.r(e);
  }
  var Pl = typeof document > "u" ? null : document;
  function v0(e, t, n) {
    var i = Pl;
    if (i && typeof t == "string" && t) {
      var s = kt(t);
      ((s = 'link[rel="' + e + '"][href="' + s + '"]'),
        typeof n == "string" && (s += '[crossorigin="' + n + '"]'),
        g0.has(s) ||
          (g0.add(s),
          (e = { rel: e, crossOrigin: n, href: t }),
          i.querySelector(s) === null &&
            ((t = i.createElement("link")),
            Dt(t, "link", e),
            Xe(t),
            i.head.appendChild(t))));
    }
  }
  function c1(e) {
    (oa.D(e), v0("dns-prefetch", e, null));
  }
  function f1(e, t) {
    (oa.C(e, t), v0("preconnect", e, t));
  }
  function d1(e, t, n) {
    oa.L(e, t, n);
    var i = Pl;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + kt(t) + '"]';
      t === "image" && n && n.imageSrcSet
        ? ((s += '[imagesrcset="' + kt(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (s += '[imagesizes="' + kt(n.imageSizes) + '"]'))
        : (s += '[href="' + kt(e) + '"]');
      var c = s;
      switch (t) {
        case "style":
          c = Wl(e);
          break;
        case "script":
          c = ei(e);
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
        i.querySelector(s) !== null ||
          (t === "style" && i.querySelector(Wi(c))) ||
          (t === "script" && i.querySelector(er(c))) ||
          ((t = i.createElement("link")),
          Dt(t, "link", e),
          Xe(t),
          i.head.appendChild(t)));
    }
  }
  function h1(e, t) {
    oa.m(e, t);
    var n = Pl;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script",
        s =
          'link[rel="modulepreload"][as="' + kt(i) + '"][href="' + kt(e) + '"]',
        c = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = ei(e);
      }
      if (
        !fn.has(c) &&
        ((e = b({ rel: "modulepreload", href: e }, t)),
        fn.set(c, e),
        n.querySelector(s) === null)
      ) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(er(c))) return;
        }
        ((i = n.createElement("link")),
          Dt(i, "link", e),
          Xe(i),
          n.head.appendChild(i));
      }
    }
  }
  function m1(e, t, n) {
    oa.S(e, t, n);
    var i = Pl;
    if (i && e) {
      var s = st(i).hoistableStyles,
        c = Wl(e);
      t = t || "default";
      var h = s.get(c);
      if (!h) {
        var g = { loading: 0, preload: null };
        if ((h = i.querySelector(Wi(c)))) g.loading = 5;
        else {
          ((e = b({ rel: "stylesheet", href: e, "data-precedence": t }, n)),
            (n = fn.get(c)) && gc(e, n));
          var E = (h = i.createElement("link"));
          (Xe(E),
            Dt(E, "link", e),
            (E._p = new Promise(function (z, V) {
              ((E.onload = z), (E.onerror = V));
            })),
            E.addEventListener("load", function () {
              g.loading |= 1;
            }),
            E.addEventListener("error", function () {
              g.loading |= 2;
            }),
            (g.loading |= 4),
            Uu(h, t, i));
        }
        ((h = { type: "stylesheet", instance: h, count: 1, state: g }),
          s.set(c, h));
      }
    }
  }
  function y1(e, t) {
    oa.X(e, t);
    var n = Pl;
    if (n && e) {
      var i = st(n).hoistableScripts,
        s = ei(e),
        c = i.get(s);
      c ||
        ((c = n.querySelector(er(s))),
        c ||
          ((e = b({ src: e, async: !0 }, t)),
          (t = fn.get(s)) && vc(e, t),
          (c = n.createElement("script")),
          Xe(c),
          Dt(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(s, c));
    }
  }
  function p1(e, t) {
    oa.M(e, t);
    var n = Pl;
    if (n && e) {
      var i = st(n).hoistableScripts,
        s = ei(e),
        c = i.get(s);
      c ||
        ((c = n.querySelector(er(s))),
        c ||
          ((e = b({ src: e, async: !0, type: "module" }, t)),
          (t = fn.get(s)) && vc(e, t),
          (c = n.createElement("script")),
          Xe(c),
          Dt(c, "link", e),
          n.head.appendChild(c)),
        (c = { type: "script", instance: c, count: 1, state: null }),
        i.set(s, c));
    }
  }
  function b0(e, t, n, i) {
    var s = (s = Ee.current) ? zu(s) : null;
    if (!s) throw Error(u(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((t = Wl(n.href)),
            (n = st(s).hoistableStyles),
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
          e = Wl(n.href);
          var c = st(s).hoistableStyles,
            h = c.get(e);
          if (
            (h ||
              ((s = s.ownerDocument || s),
              (h = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null }
              }),
              c.set(e, h),
              (c = s.querySelector(Wi(e))) &&
                !c._p &&
                ((h.instance = c), (h.state.loading = 5)),
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
                c || g1(s, e, n, h.state))),
            t && i === null)
          )
            throw Error(u(528, ""));
          return h;
        }
        if (t && i !== null) throw Error(u(529, ""));
        return null;
      case "script":
        return (
          (t = n.async),
          (n = n.src),
          typeof n == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = ei(n)),
              (n = st(s).hoistableScripts),
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
        throw Error(u(444, e));
    }
  }
  function Wl(e) {
    return 'href="' + kt(e) + '"';
  }
  function Wi(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function E0(e) {
    return b({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function g1(e, t, n, i) {
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
        Xe(t),
        e.head.appendChild(t));
  }
  function ei(e) {
    return '[src="' + kt(e) + '"]';
  }
  function er(e) {
    return "script[async]" + e;
  }
  function S0(e, t, n) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var i = e.querySelector('style[data-href~="' + kt(n.href) + '"]');
          if (i) return ((t.instance = i), Xe(i), i);
          var s = b({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return (
            (i = (e.ownerDocument || e).createElement("style")),
            Xe(i),
            Dt(i, "style", s),
            Uu(i, n.precedence, e),
            (t.instance = i)
          );
        case "stylesheet":
          s = Wl(n.href);
          var c = e.querySelector(Wi(s));
          if (c) return ((t.state.loading |= 4), (t.instance = c), Xe(c), c);
          ((i = E0(n)),
            (s = fn.get(s)) && gc(i, s),
            (c = (e.ownerDocument || e).createElement("link")),
            Xe(c));
          var h = c;
          return (
            (h._p = new Promise(function (g, E) {
              ((h.onload = g), (h.onerror = E));
            })),
            Dt(c, "link", i),
            (t.state.loading |= 4),
            Uu(c, n.precedence, e),
            (t.instance = c)
          );
        case "script":
          return (
            (c = ei(n.src)),
            (s = e.querySelector(er(c)))
              ? ((t.instance = s), Xe(s), s)
              : ((i = n),
                (s = fn.get(c)) && ((i = b({}, n)), vc(i, s)),
                (e = e.ownerDocument || e),
                (s = e.createElement("script")),
                Xe(s),
                Dt(s, "link", i),
                e.head.appendChild(s),
                (t.instance = s))
          );
        case "void":
          return null;
        default:
          throw Error(u(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((i = t.instance), (t.state.loading |= 4), Uu(i, n.precedence, e));
    return t.instance;
  }
  function Uu(e, t, n) {
    for (
      var i = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        s = i.length ? i[i.length - 1] : null,
        c = s,
        h = 0;
      h < i.length;
      h++
    ) {
      var g = i[h];
      if (g.dataset.precedence === t) c = g;
      else if (c !== s) break;
    }
    c
      ? c.parentNode.insertBefore(e, c.nextSibling)
      : ((t = n.nodeType === 9 ? n.head : n), t.insertBefore(e, t.firstChild));
  }
  function gc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function vc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Lu = null;
  function T0(e, t, n) {
    if (Lu === null) {
      var i = new Map(),
        s = (Lu = new Map());
      s.set(n, i);
    } else ((s = Lu), (i = s.get(n)), i || ((i = new Map()), s.set(n, i)));
    if (i.has(e)) return i;
    for (
      i.set(e, null), n = n.getElementsByTagName(e), s = 0;
      s < n.length;
      s++
    ) {
      var c = n[s];
      if (
        !(
          c[Je] ||
          c[ce] ||
          (e === "link" && c.getAttribute("rel") === "stylesheet")
        ) &&
        c.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var h = c.getAttribute(t) || "";
        h = e + h;
        var g = i.get(h);
        g ? g.push(c) : i.set(h, [c]);
      }
    }
    return i;
  }
  function R0(e, t, n) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      ));
  }
  function v1(e, t, n) {
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
  function C0(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function b1(e, t, n, i) {
    if (
      n.type === "stylesheet" &&
      (typeof i.media != "string" || matchMedia(i.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var s = Wl(i.href),
          c = t.querySelector(Wi(s));
        if (c) {
          ((t = c._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (e.count++, (e = ju.bind(e)), t.then(e, e)),
            (n.state.loading |= 4),
            (n.instance = c),
            Xe(c));
          return;
        }
        ((c = t.ownerDocument || t),
          (i = E0(i)),
          (s = fn.get(s)) && gc(i, s),
          (c = c.createElement("link")),
          Xe(c));
        var h = c;
        ((h._p = new Promise(function (g, E) {
          ((h.onload = g), (h.onerror = E));
        })),
          Dt(c, "link", i),
          (n.instance = c));
      }
      (e.stylesheets === null && (e.stylesheets = new Map()),
        e.stylesheets.set(n, t),
        (t = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (e.count++,
          (n = ju.bind(e)),
          t.addEventListener("load", n),
          t.addEventListener("error", n)));
    }
  }
  var bc = 0;
  function E1(e, t) {
    return (
      e.stylesheets && e.count === 0 && ku(e, e.stylesheets),
      0 < e.count || 0 < e.imgCount
        ? function (n) {
            var i = setTimeout(function () {
              if ((e.stylesheets && ku(e, e.stylesheets), e.unsuspend)) {
                var c = e.unsuspend;
                ((e.unsuspend = null), c());
              }
            }, 6e4 + t);
            0 < e.imgBytes && bc === 0 && (bc = 62500 * e1());
            var s = setTimeout(
              function () {
                if (
                  ((e.waitingForImages = !1),
                  e.count === 0 &&
                    (e.stylesheets && ku(e, e.stylesheets), e.unsuspend))
                ) {
                  var c = e.unsuspend;
                  ((e.unsuspend = null), c());
                }
              },
              (e.imgBytes > bc ? 50 : 800) + t
            );
            return (
              (e.unsuspend = n),
              function () {
                ((e.unsuspend = null), clearTimeout(i), clearTimeout(s));
              }
            );
          }
        : null
    );
  }
  function ju() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) ku(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var Bu = null;
  function ku(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (Bu = new Map()),
        t.forEach(S1, e),
        (Bu = null),
        ju.call(e)));
  }
  function S1(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Bu.get(e);
      if (n) var i = n.get(null);
      else {
        ((n = new Map()), Bu.set(e, n));
        for (
          var s = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            c = 0;
          c < s.length;
          c++
        ) {
          var h = s[c];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") &&
            (n.set(h.dataset.precedence, h), (i = h));
        }
        i && n.set(null, i);
      }
      ((s = t.instance),
        (h = s.getAttribute("data-precedence")),
        (c = n.get(h) || i),
        c === i && n.set(null, s),
        n.set(h, s),
        this.count++,
        (i = ju.bind(this)),
        s.addEventListener("load", i),
        s.addEventListener("error", i),
        c
          ? c.parentNode.insertBefore(s, c.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(s, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var tr = {
    $$typeof: Z,
    Provider: null,
    Consumer: null,
    _currentValue: me,
    _currentValue2: me,
    _threadCount: 0
  };
  function T1(e, t, n, i, s, c, h, g, E) {
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
      (this.expirationTimes = ga(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = ga(0)),
      (this.hiddenUpdates = ga(null)),
      (this.identifierPrefix = i),
      (this.onUncaughtError = s),
      (this.onCaughtError = c),
      (this.onRecoverableError = h),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = E),
      (this.incompleteTransitions = new Map()));
  }
  function N0(e, t, n, i, s, c, h, g, E, z, V, F) {
    return (
      (e = new T1(e, t, n, h, E, z, V, F, g)),
      (t = 1),
      c === !0 && (t |= 24),
      (c = Xt(3, null, null, t)),
      (e.current = c),
      (c.stateNode = e),
      (t = $s()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (c.memoizedState = { element: i, isDehydrated: n, cache: t }),
      to(c),
      e
    );
  }
  function w0(e) {
    return e ? ((e = Ml), e) : Ml;
  }
  function A0(e, t, n, i, s, c) {
    ((s = w0(s)),
      i.context === null ? (i.context = s) : (i.pendingContext = s),
      (i = wa(t)),
      (i.payload = { element: n }),
      (c = c === void 0 ? null : c),
      c !== null && (i.callback = c),
      (n = Aa(e, i, t)),
      n !== null && (Qt(n, e, t), zi(n, e, t)));
  }
  function D0(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ec(e, t) {
    (D0(e, t), (e = e.alternate) && D0(e, t));
  }
  function _0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $a(e, 67108864);
      (t !== null && Qt(t, e, 67108864), Ec(e, 67108864));
    }
  }
  function O0(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = $t();
      t = D(t);
      var n = $a(e, t);
      (n !== null && Qt(n, e, t), Ec(e, t));
    }
  }
  var Hu = !0;
  function R1(e, t, n, i) {
    var s = x.T;
    x.T = null;
    var c = P.p;
    try {
      ((P.p = 2), Sc(e, t, n, i));
    } finally {
      ((P.p = c), (x.T = s));
    }
  }
  function C1(e, t, n, i) {
    var s = x.T;
    x.T = null;
    var c = P.p;
    try {
      ((P.p = 8), Sc(e, t, n, i));
    } finally {
      ((P.p = c), (x.T = s));
    }
  }
  function Sc(e, t, n, i) {
    if (Hu) {
      var s = Tc(i);
      if (s === null) (uc(e, t, i, qu, n), x0(e, i));
      else if (w1(s, e, t, n, i)) i.stopPropagation();
      else if ((x0(e, i), t & 4 && -1 < N1.indexOf(e))) {
        for (; s !== null;) {
          var c = Oe(s);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (((c = c.stateNode), c.current.memoizedState.isDehydrated)) {
                  var h = pn(c.pendingLanes);
                  if (h !== 0) {
                    var g = c;
                    for (g.pendingLanes |= 2, g.entangledLanes |= 2; h;) {
                      var E = 1 << (31 - _t(h));
                      ((g.entanglements[1] |= E), (h &= ~E));
                    }
                    (_n(c), (Ie & 6) === 0 && ((Tu = xt() + 500), Ki(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((g = $a(c, 2)), g !== null && Qt(g, c, 2), Cu(), Ec(c, 2));
            }
          if (((c = Tc(i)), c === null && uc(e, t, i, qu, n), c === s)) break;
          s = c;
        }
        s !== null && i.stopPropagation();
      } else uc(e, t, i, null, n);
    }
  }
  function Tc(e) {
    return ((e = Rs(e)), Rc(e));
  }
  var qu = null;
  function Rc(e) {
    if (((qu = null), (e = at(e)), e !== null)) {
      var t = f(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (((e = d(t)), e !== null)) return e;
          e = null;
        } else if (n === 31) {
          if (((e = m(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((qu = e), null);
  }
  function M0(e) {
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
        switch (Hn()) {
          case ma:
            return 2;
          case pi:
            return 8;
          case ya:
          case yn:
            return 32;
          case Wt:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Cc = !1,
    ka = null,
    Ha = null,
    qa = null,
    nr = new Map(),
    ar = new Map(),
    Va = [],
    N1 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function x0(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ka = null;
        break;
      case "dragenter":
      case "dragleave":
        Ha = null;
        break;
      case "mouseover":
      case "mouseout":
        qa = null;
        break;
      case "pointerover":
      case "pointerout":
        nr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        ar.delete(t.pointerId);
    }
  }
  function lr(e, t, n, i, s, c) {
    return e === null || e.nativeEvent !== c
      ? ((e = {
          blockedOn: t,
          domEventName: n,
          eventSystemFlags: i,
          nativeEvent: c,
          targetContainers: [s]
        }),
        t !== null && ((t = Oe(t)), t !== null && _0(t)),
        e)
      : ((e.eventSystemFlags |= i),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function w1(e, t, n, i, s) {
    switch (t) {
      case "focusin":
        return ((ka = lr(ka, e, t, n, i, s)), !0);
      case "dragenter":
        return ((Ha = lr(Ha, e, t, n, i, s)), !0);
      case "mouseover":
        return ((qa = lr(qa, e, t, n, i, s)), !0);
      case "pointerover":
        var c = s.pointerId;
        return (nr.set(c, lr(nr.get(c) || null, e, t, n, i, s)), !0);
      case "gotpointercapture":
        return (
          (c = s.pointerId),
          ar.set(c, lr(ar.get(c) || null, e, t, n, i, s)),
          !0
        );
    }
    return !1;
  }
  function z0(e) {
    var t = at(e.target);
    if (t !== null) {
      var n = f(t);
      if (n !== null) {
        if (((t = n.tag), t === 13)) {
          if (((t = d(n)), t !== null)) {
            ((e.blockedOn = t),
              J(e.priority, function () {
                O0(n);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = m(n)), t !== null)) {
            ((e.blockedOn = t),
              J(e.priority, function () {
                O0(n);
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
  function Vu(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
      var n = Tc(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(n.type, n);
        ((Ts = i), n.target.dispatchEvent(i), (Ts = null));
      } else return ((t = Oe(n)), t !== null && _0(t), (e.blockedOn = n), !1);
      t.shift();
    }
    return !0;
  }
  function U0(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function A1() {
    ((Cc = !1),
      ka !== null && Vu(ka) && (ka = null),
      Ha !== null && Vu(Ha) && (Ha = null),
      qa !== null && Vu(qa) && (qa = null),
      nr.forEach(U0),
      ar.forEach(U0));
  }
  function Yu(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Cc ||
        ((Cc = !0),
        a.unstable_scheduleCallback(a.unstable_NormalPriority, A1)));
  }
  var Gu = null;
  function L0(e) {
    Gu !== e &&
      ((Gu = e),
      a.unstable_scheduleCallback(a.unstable_NormalPriority, function () {
        Gu === e && (Gu = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t],
            i = e[t + 1],
            s = e[t + 2];
          if (typeof i != "function") {
            if (Rc(i || n) === null) continue;
            break;
          }
          var c = Oe(n);
          c !== null &&
            (e.splice(t, 3),
            (t -= 3),
            To(c, { pending: !0, data: s, method: n.method, action: i }, i, s));
        }
      }));
  }
  function ti(e) {
    function t(E) {
      return Yu(E, e);
    }
    (ka !== null && Yu(ka, e),
      Ha !== null && Yu(Ha, e),
      qa !== null && Yu(qa, e),
      nr.forEach(t),
      ar.forEach(t));
    for (var n = 0; n < Va.length; n++) {
      var i = Va[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Va.length && ((n = Va[0]), n.blockedOn === null);)
      (z0(n), n.blockedOn === null && Va.shift());
    if (((n = (e.ownerDocument || e).$$reactFormReplay), n != null))
      for (i = 0; i < n.length; i += 3) {
        var s = n[i],
          c = n[i + 1],
          h = s[ae] || null;
        if (typeof c == "function") h || L0(n);
        else if (h) {
          var g = null;
          if (c && c.hasAttribute("formAction")) {
            if (((s = c), (h = c[ae] || null))) g = h.formAction;
            else if (Rc(s) !== null) continue;
          } else g = h.action;
          (typeof g == "function" ? (n[i + 1] = g) : (n.splice(i, 3), (i -= 3)),
            L0(n));
        }
      }
  }
  function j0() {
    function e(c) {
      c.canIntercept &&
        c.info === "react-transition" &&
        c.intercept({
          handler: function () {
            return new Promise(function (h) {
              return (s = h);
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
    }
    function t() {
      (s !== null && (s(), (s = null)), i || setTimeout(n, 20));
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
        s = null;
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
            s !== null && (s(), (s = null)));
        }
      );
    }
  }
  function Nc(e) {
    this._internalRoot = e;
  }
  ((Qu.prototype.render = Nc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(u(409));
      var n = t.current,
        i = $t();
      A0(n, i, e, t, null, null);
    }),
    (Qu.prototype.unmount = Nc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (A0(e.current, 2, null, e, null, null), Cu(), (t[oe] = null));
        }
      }));
  function Qu(e) {
    this._internalRoot = e;
  }
  Qu.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = I();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Va.length && t !== 0 && t < Va[n].priority; n++);
      (Va.splice(n, 0, e), n === 0 && z0(e));
    }
  };
  var B0 = l.version;
  if (B0 !== "19.2.8") throw Error(u(527, B0, "19.2.8"));
  P.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(u(188))
        : ((e = Object.keys(e).join(",")), Error(u(268, e)));
    return (
      (e = p(t)),
      (e = e !== null ? v(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var D1 = {
    bundleType: 0,
    version: "19.2.8",
    rendererPackageName: "react-dom",
    currentDispatcherRef: x,
    reconcilerVersion: "19.2.8"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Fu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fu.isDisabled && Fu.supportsFiber)
      try {
        ((qn = Fu.inject(D1)), (zt = Fu));
      } catch {}
  }
  return (
    (rr.createRoot = function (e, t) {
      if (!o(e)) throw Error(u(299));
      var n = !1,
        i = "",
        s = Qh,
        c = Fh,
        h = Xh;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (n = !0),
          t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (s = t.onUncaughtError),
          t.onCaughtError !== void 0 && (c = t.onCaughtError),
          t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        (t = N0(e, 1, !1, null, null, n, i, null, s, c, h, j0)),
        (e[oe] = t.current),
        rc(e),
        new Nc(t)
      );
    }),
    (rr.hydrateRoot = function (e, t, n) {
      if (!o(e)) throw Error(u(299));
      var i = !1,
        s = "",
        c = Qh,
        h = Fh,
        g = Xh,
        E = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (i = !0),
          n.identifierPrefix !== void 0 && (s = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (c = n.onUncaughtError),
          n.onCaughtError !== void 0 && (h = n.onCaughtError),
          n.onRecoverableError !== void 0 && (g = n.onRecoverableError),
          n.formState !== void 0 && (E = n.formState)),
        (t = N0(e, 1, !0, t, n ?? null, i, s, E, c, h, g, j0)),
        (t.context = w0(null)),
        (n = t.current),
        (i = $t()),
        (i = D(i)),
        (s = wa(i)),
        (s.callback = null),
        Aa(n, s, i),
        (n = i),
        (t.current.lanes = n),
        Nn(t, n),
        _n(t),
        (e[oe] = t.current),
        rc(e),
        new Qu(t)
      );
    }),
    (rr.version = "19.2.8"),
    rr
  );
}
var Z0;
function H1() {
  if (Z0) return Dc.exports;
  Z0 = 1;
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
  return (a(), (Dc.exports = k1()), Dc.exports);
}
var q1 = H1();
const rs = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  Df = /^[\\/]{2}/;
function hp(a, l) {
  return l + a.replace(/\\/g, "/");
}
const I0 = "popstate";
function K0(a) {
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
function V1(a = {}) {
  function l(u, o) {
    let f = o.state?.masked,
      { pathname: d, search: m, hash: y } = f || u.location;
    return vr(
      "",
      { pathname: d, search: m, hash: y },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
      f
        ? {
            pathname: u.location.pathname,
            search: u.location.search,
            hash: u.location.hash
          }
        : void 0
    );
  }
  function r(u, o) {
    return typeof o == "string" ? o : Ln(o);
  }
  return G1(l, r, null, a);
}
function ze(a, l) {
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
function Y1() {
  return Math.random().toString(36).substring(2, 10);
}
function J0(a, l) {
  return {
    usr: a.state,
    key: a.key,
    idx: l,
    masked: a.mask
      ? { pathname: a.pathname, search: a.search, hash: a.hash }
      : void 0
  };
}
function vr(a, l, r = null, u, o) {
  return {
    pathname: typeof a == "string" ? a : a.pathname,
    search: "",
    hash: "",
    ...(typeof l == "string" ? jn(l) : l),
    state: r,
    key: (l && l.key) || u || Y1(),
    mask: o
  };
}
function Ln({ pathname: a = "/", search: l = "", hash: r = "" }) {
  return (
    l && l !== "?" && (a += l.charAt(0) === "?" ? l : "?" + l),
    r && r !== "#" && (a += r.charAt(0) === "#" ? r : "#" + r),
    a
  );
}
function jn(a) {
  let l = {};
  if (a) {
    let r = a.indexOf("#");
    r >= 0 && ((l.hash = a.substring(r)), (a = a.substring(0, r)));
    let u = a.indexOf("?");
    (u >= 0 && ((l.search = a.substring(u)), (a = a.substring(0, u))),
      a && (l.pathname = a));
  }
  return l;
}
function G1(a, l, r, u = {}) {
  let { window: o = document.defaultView, v5Compat: f = !1 } = u,
    d = o.history,
    m = "POP",
    y = null,
    p = v();
  p == null && ((p = 0), d.replaceState({ ...d.state, idx: p }, ""));
  function v() {
    return (d.state || { idx: null }).idx;
  }
  function b() {
    m = "POP";
    let Y = v(),
      G = Y == null ? null : Y - p;
    ((p = Y), y && y({ action: m, location: j.location, delta: G }));
  }
  function S(Y, G) {
    m = "PUSH";
    let K = K0(Y) ? Y : vr(j.location, Y, G);
    p = v() + 1;
    let Z = J0(K, p),
      $ = j.createHref(K.mask || K);
    try {
      d.pushState(Z, "", $);
    } catch (se) {
      if (se instanceof DOMException && se.name === "DataCloneError") throw se;
      o.location.assign($);
    }
    f && y && y({ action: m, location: j.location, delta: 1 });
  }
  function R(Y, G) {
    m = "REPLACE";
    let K = K0(Y) ? Y : vr(j.location, Y, G);
    p = v();
    let Z = J0(K, p),
      $ = j.createHref(K.mask || K);
    (d.replaceState(Z, "", $),
      f && y && y({ action: m, location: j.location, delta: 0 }));
  }
  function N(Y) {
    return mp(o, Y);
  }
  let j = {
    get action() {
      return m;
    },
    get location() {
      return a(o, d);
    },
    listen(Y) {
      if (y) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(I0, b),
        (y = Y),
        () => {
          (o.removeEventListener(I0, b), (y = null));
        }
      );
    },
    createHref(Y) {
      return l(o, Y);
    },
    createURL: N,
    encodeLocation(Y) {
      let G = N(Y);
      return { pathname: G.pathname, search: G.search, hash: G.hash };
    },
    push: S,
    replace: R,
    go(Y) {
      return d.go(Y);
    }
  };
  return j;
}
function mp(a, l, r = !1) {
  let u = "http://localhost";
  (a &&
    (u = a.location.origin !== "null" ? a.location.origin : a.location.href),
    ze(u, "No window.location.(origin|href) available to create URL"));
  let o = typeof l == "string" ? l : Ln(l);
  return (
    (o = o.replace(/ $/, "%20")),
    !r && Df.test(o) && (o = u + o),
    new URL(o, u)
  );
}
var $0 = class {
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
const Q1 = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "children"
]);
function F1(a) {
  return Q1.has(a);
}
const X1 = new Set([
  "lazy",
  "caseSensitive",
  "path",
  "id",
  "index",
  "middleware",
  "children"
]);
function Z1(a) {
  return X1.has(a);
}
function I1(a) {
  return a.index === !0;
}
function yp(a) {
  let l = {};
  return (
    a.Component &&
      Object.assign(l, {
        element: U.createElement(a.Component),
        Component: void 0
      }),
    a.HydrateFallback &&
      Object.assign(l, {
        hydrateFallbackElement: U.createElement(a.HydrateFallback),
        HydrateFallback: void 0
      }),
    a.ErrorBoundary &&
      Object.assign(l, {
        errorElement: U.createElement(a.ErrorBoundary),
        ErrorBoundary: void 0
      }),
    l
  );
}
function br(a, l = yp, r = [], u = {}, o = !1) {
  return a.map((f, d) => {
    let m = [...r, String(d)],
      y = typeof f.id == "string" ? f.id : m.join("-");
    if (
      (ze(
        f.index !== !0 || !f.children,
        "Cannot specify children on an index route"
      ),
      ze(
        o || !u[y],
        `Found a route id collision on id "${y}".  Route id's must be globally unique within Data Router usages`
      ),
      I1(f))
    ) {
      let p = { ...f, id: y };
      return ((u[y] = P0(p, l(p))), p);
    } else {
      let p = { ...f, id: y, children: void 0 };
      return (
        (u[y] = P0(p, l(p))),
        f.children && (p.children = br(f.children, l, m, u, o)),
        p
      );
    }
  });
}
function P0(a, l) {
  return Object.assign(a, {
    ...l,
    ...(typeof l.lazy == "object" && l.lazy != null
      ? { lazy: { ...a.lazy, ...l.lazy } }
      : {})
  });
}
function pp(a, l, r = "/") {
  return Tn(a, l, r, !1);
}
function Tn(a, l, r, u, o) {
  let f = Rn((typeof l == "string" ? jn(l) : l).pathname || "/", r);
  if (f == null) return null;
  let d = o ?? $u(a),
    m = null,
    y = s2(f);
  for (let p = 0; m == null && p < d.length; ++p) m = u2(d[p], y, u);
  return m;
}
function K1(a, l) {
  let { route: r, pathname: u, params: o } = a;
  return {
    id: r.id,
    pathname: u,
    params: o,
    loaderData: l[r.id],
    handle: r.handle
  };
}
function $u(a) {
  let l = gp(a);
  return (J1(l), l);
}
function gp(a, l = [], r = [], u = "", o = !1) {
  let f = (d, m, y = o, p) => {
    let v = {
      relativePath: p === void 0 ? d.path || "" : p,
      caseSensitive: d.caseSensitive === !0,
      childrenIndex: m,
      route: d
    };
    if (v.relativePath.startsWith("/")) {
      if (!v.relativePath.startsWith(u) && y) return;
      (ze(
        v.relativePath.startsWith(u),
        `Absolute route path "${v.relativePath}" nested under path "${u}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (v.relativePath = v.relativePath.slice(u.length)));
    }
    let b = hn([u, v.relativePath]),
      S = r.concat(v);
    (d.children &&
      d.children.length > 0 &&
      (ze(
        d.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${b}".`
      ),
      gp(d.children, l, S, b, y)),
      !(d.path == null && !d.index) &&
        l.push({
          path: b,
          score: i2(b, d.index),
          routesMeta: S.map((R, N) => {
            let [j, Y] = Ep(
              R.relativePath,
              R.caseSensitive,
              N === S.length - 1
            );
            return { ...R, matcher: j, compiledParams: Y };
          })
        }));
  };
  return (
    a.forEach((d, m) => {
      if (d.path === "" || !d.path?.includes("?")) f(d, m);
      else for (let y of vp(d.path)) f(d, m, !0, y);
    }),
    l
  );
}
function vp(a) {
  let l = a.split("/");
  if (l.length === 0) return [];
  let [r, ...u] = l,
    o = r.endsWith("?"),
    f = r.replace(/\?$/, "");
  if (u.length === 0) return o ? [f, ""] : [f];
  let d = vp(u.join("/")),
    m = [];
  return (
    m.push(...d.map((y) => (y === "" ? f : [f, y].join("/")))),
    o && m.push(...d),
    m.map((y) => (a.startsWith("/") && y === "" ? "/" : y))
  );
}
function J1(a) {
  a.sort((l, r) =>
    l.score !== r.score
      ? r.score - l.score
      : r2(
          l.routesMeta.map((u) => u.childrenIndex),
          r.routesMeta.map((u) => u.childrenIndex)
        )
  );
}
const $1 = /^:[\w-]+$/,
  P1 = /^:[\w-]+/,
  W1 = 3.5,
  e2 = 3,
  t2 = 2,
  n2 = 1,
  a2 = 10,
  l2 = -2,
  W0 = (a) => a === "*";
function i2(a, l) {
  let r = a.split("/"),
    u = r.length;
  return (
    r.some(W0) && (u += l2),
    l && (u += t2),
    r
      .filter((o) => !W0(o))
      .reduce(
        (o, f) => o + ($1.test(f) ? e2 : P1.test(f) ? W1 : f === "" ? n2 : a2),
        u
      )
  );
}
function r2(a, l) {
  return a.length === l.length && a.slice(0, -1).every((r, u) => r === l[u])
    ? a[a.length - 1] - l[l.length - 1]
    : 0;
}
function u2(a, l, r = !1) {
  let { routesMeta: u } = a,
    o = {},
    f = "/",
    d = [];
  for (let m = 0; m < u.length; ++m) {
    let y = u[m],
      p = m === u.length - 1,
      v = f === "/" ? l : l.slice(f.length) || "/",
      b = { path: y.relativePath, caseSensitive: y.caseSensitive, end: p },
      S =
        y.matcher && y.compiledParams
          ? bp(b, v, y.matcher, y.compiledParams)
          : as(b, v),
      R = y.route;
    if (
      (!S &&
        p &&
        r &&
        !u[u.length - 1].route.index &&
        (S = as(
          { path: y.relativePath, caseSensitive: y.caseSensitive, end: !1 },
          v
        )),
      !S)
    )
      return null;
    (Object.assign(o, S.params),
      d.push({
        params: o,
        pathname: hn([f, S.pathname]),
        pathnameBase: f2(hn([f, S.pathnameBase])),
        route: R
      }),
      S.pathnameBase !== "/" && (f = hn([f, S.pathnameBase])));
  }
  return d;
}
function as(a, l) {
  typeof a == "string" && (a = { path: a, caseSensitive: !1, end: !0 });
  let [r, u] = Ep(a.path, a.caseSensitive, a.end);
  return bp(a, l, r, u);
}
function bp(a, l, r, u) {
  let o = l.match(r);
  if (!o) return null;
  let f = o[0],
    d = f.replace(/(.)\/+$/, "$1"),
    m = o.slice(1);
  return {
    params: u.reduce((y, { paramName: p, isOptional: v }, b) => {
      if (p === "*") {
        let R = m[b] || "";
        d = f.slice(0, f.length - R.length).replace(/(.)\/+$/, "$1");
      }
      const S = m[b];
      return (
        v && !S ? (y[p] = void 0) : (y[p] = (S || "").replace(/%2F/g, "/")),
        y
      );
    }, {}),
    pathname: f,
    pathnameBase: d,
    pattern: a
  };
}
function Ep(a, l = !1, r = !0) {
  jt(
    a === "*" || !a.endsWith("*") || a.endsWith("/*"),
    `Route path "${a}" will be treated as if it were "${a.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${a.replace(/\*$/, "/*")}".`
  );
  let u = [],
    o =
      "^" +
      a
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (f, d, m, y, p) => {
          if ((u.push({ paramName: d, isOptional: m != null }), m)) {
            let v = p.charAt(y + f.length);
            return v && v !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(?=\/|$|\()/g, "(?:/$1)?");
  return (
    a.endsWith("*")
      ? (u.push({ paramName: "*" }),
        (o += a === "*" || a === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (o += "\\/*$")
        : a !== "" && a !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, l ? void 0 : "i"), u]
  );
}
function s2(a) {
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
function Rn(a, l) {
  if (l === "/") return a;
  if (!a.toLowerCase().startsWith(l.toLowerCase())) return null;
  let r = l.endsWith("/") ? l.length - 1 : l.length,
    u = a.charAt(r);
  return u && u !== "/" ? null : a.slice(r) || "/";
}
function o2({ basename: a, pathname: l }) {
  return l === "/" ? a : hn([a, l]);
}
const _f = (a) => rs.test(a);
function c2(a, l = "/") {
  let {
      pathname: r,
      search: u = "",
      hash: o = ""
    } = typeof a == "string" ? jn(a) : a,
    f;
  return (
    r
      ? ((r = Mf(r)),
        r.startsWith("/") ? (f = ey(r.substring(1), "/")) : (f = ey(r, l)))
      : (f = l),
    { pathname: f, search: d2(u), hash: h2(o) }
  );
}
function ey(a, l) {
  let r = Tp(l).split("/");
  return (
    a.split("/").forEach((u) => {
      u === ".." ? r.length > 1 && r.pop() : u !== "." && r.push(u);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function xc(a, l, r, u) {
  return `Cannot include a '${a}' character in a manually specified \`to.${l}\` field [${JSON.stringify(u)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Sp(a) {
  return a.filter(
    (l, r) => r === 0 || (l.route.path && l.route.path.length > 0)
  );
}
function Of(a) {
  let l = Sp(a);
  return l.map((r, u) => (u === l.length - 1 ? r.pathname : r.pathnameBase));
}
function us(a, l, r, u = !1) {
  let o;
  typeof a == "string"
    ? (o = jn(a))
    : ((o = { ...a }),
      ze(
        !o.pathname || !o.pathname.includes("?"),
        xc("?", "pathname", "search", o)
      ),
      ze(
        !o.pathname || !o.pathname.includes("#"),
        xc("#", "pathname", "hash", o)
      ),
      ze(!o.search || !o.search.includes("#"), xc("#", "search", "hash", o)));
  let f = a === "" || o.pathname === "",
    d = f ? "/" : o.pathname,
    m;
  if (d == null) m = r;
  else {
    let b = l.length - 1;
    if (!u && d.startsWith("..")) {
      let S = d.split("/");
      for (; S[0] === "..";) (S.shift(), (b -= 1));
      o.pathname = S.join("/");
    }
    m = b >= 0 ? l[b] : "/";
  }
  let y = c2(o, m),
    p = d && d !== "/" && d.endsWith("/"),
    v = (f || d === ".") && r.endsWith("/");
  return (!y.pathname.endsWith("/") && (p || v) && (y.pathname += "/"), y);
}
const Mf = (a) => a.replace(/[\\/]{2,}/g, "/"),
  hn = (a) => Mf(a.join("/")),
  Tp = (a) => a.replace(/\/+$/, ""),
  f2 = (a) => Tp(a).replace(/^\/*/, "/"),
  d2 = (a) => (!a || a === "?" ? "" : a.startsWith("?") ? a : "?" + a),
  h2 = (a) => (!a || a === "#" ? "" : a.startsWith("#") ? a : "#" + a),
  m2 = [
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
var Rr = class {
  status;
  statusText;
  data;
  error;
  internal;
  constructor(a, l, r, u = !1) {
    ((this.status = a),
      (this.statusText = l || ""),
      (this.internal = u),
      r instanceof Error
        ? ((this.data = r.toString()), (this.error = r))
        : (this.data = r));
  }
};
function Er(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.internal == "boolean" &&
    "data" in a
  );
}
function ci(a) {
  return hn(a.map((l) => l.route.path).filter(Boolean)) || "/";
}
function xf(a, l) {
  let r = new URL(typeof a == "string" || a instanceof URL ? a : a.url),
    u = typeof l == "string" ? jn(l) : l;
  if (((r.pathname = u.pathname || "/"), u.search)) {
    let o = new URLSearchParams(u.search),
      f = o.getAll("index");
    o.delete("index");
    for (let m of f.filter(Boolean)) o.append("index", m);
    let d = o.toString();
    r.search = d ? `?${d}` : "";
  } else r.search = "";
  return ((r.hash = u.hash || ""), r);
}
const Rp =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Cp(a, l) {
  let r = a;
  if (typeof r != "string" || !rs.test(r))
    return { absoluteURL: void 0, isExternal: !1, to: r };
  let u = r,
    o = !1;
  if (Rp)
    try {
      let f = new URL(window.location.href),
        d = Df.test(r) ? new URL(hp(r, f.protocol)) : new URL(r),
        m = Rn(d.pathname, l);
      d.origin === f.origin && m != null
        ? (r = m + d.search + d.hash)
        : (o = !0);
    } catch {
      jt(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
      );
    }
  return { absoluteURL: u, isExternal: o, to: r };
}
const Np = Symbol("Uninstrumented");
let hr = new WeakMap();
function y2(a, l) {
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
  let u = {};
  if (typeof l.lazy == "function" && r.lazy.length > 0) {
    let o = l.lazy;
    u.lazy = async (...f) => ca(await xn(r.lazy, void 0, () => o(...f), fa));
  }
  if (typeof l.lazy == "object") {
    let o = l.lazy;
    if (typeof o.middleware == "function" && r["lazy.middleware"].length > 0) {
      let f = o.middleware;
      u.lazy = Object.assign(u.lazy || {}, {
        middleware: async (...d) =>
          ca(await xn(r["lazy.middleware"], void 0, () => f(...d), fa))
      });
    }
    if (typeof o.loader == "function" && r["lazy.loader"].length > 0) {
      let f = o.loader;
      u.lazy = Object.assign(u.lazy || {}, {
        loader: async (...d) =>
          ca(await xn(r["lazy.loader"], void 0, () => f(...d), fa))
      });
    }
    if (typeof o.action == "function" && r["lazy.action"].length > 0) {
      let f = o.action;
      u.lazy = Object.assign(u.lazy || {}, {
        action: async (...d) =>
          ca(await xn(r["lazy.action"], void 0, () => f(...d), fa))
      });
    }
  }
  if (typeof l.loader == "function" && r.loader.length > 0) {
    let o = mr(l.loader),
      f = async (...d) => ca(await xn(r.loader, zc(d[0]), () => o(...d), fa));
    (o.hydrate === !0 && (f.hydrate = !0), yr(f, o), (u.loader = f));
  }
  if (typeof l.action == "function" && r.action.length > 0) {
    let o = mr(l.action),
      f = async (...d) => ca(await xn(r.action, zc(d[0]), () => o(...d), fa));
    (yr(f, o), (u.action = f));
  }
  return (
    l.middleware &&
      l.middleware.length > 0 &&
      r.middleware.length > 0 &&
      (u.middleware = l.middleware.map((o) => {
        let f = mr(o),
          d = async (...m) =>
            ca(await xn(r.middleware, zc(m[0]), () => f(...m), fa));
        return (yr(d, f), d);
      })),
    u
  );
}
function p2(a, l) {
  let r = { navigate: [], fetch: [] };
  if (
    (l.forEach((u) =>
      u({
        instrument(o) {
          (o.navigate != null && r.navigate.push(o.navigate),
            o.fetch != null && r.fetch.push(o.fetch));
        }
      })
    ),
    r.navigate.length > 0)
  ) {
    let u = mr(a.navigate),
      o = async (...f) => {
        let [d, m] = f,
          y,
          p = {
            to:
              typeof d == "number" || typeof d == "string"
                ? d
                : d
                  ? Ln(d)
                  : ".",
            ...ay(a, m ?? {})
          };
        return ca(
          await xn(
            r.navigate,
            p,
            async () => {
              if (typeof d == "number") return await u(...f);
              let v = ty(a, (b) => {
                y = b;
              });
              try {
                return await u(...f);
              } finally {
                v();
              }
            },
            (v) => ({ ...fa(v), meta: y })
          )
        );
      };
    (yr(o, u), (a.navigate = o));
  }
  if (r.fetch.length > 0) {
    let u = mr(a.fetch),
      o = async (...f) => {
        let [d, m, y, p] = f,
          v;
        return ca(
          await xn(
            r.fetch,
            { href: y ?? ".", fetcherKey: d, ...ay(a, p ?? {}) },
            async () => {
              let b = ty(a, (S) => {
                v = S;
              });
              try {
                return await u(...f);
              } finally {
                b();
              }
            },
            (b) => ({ ...fa(b), meta: v })
          )
        );
      };
    (yr(o, u), (a.fetch = o));
  }
  return a;
}
function mr(a) {
  return a[Np] ?? a;
}
function yr(a, l) {
  a[Np] = l;
}
function ty(a, l) {
  return (
    hr.set(a, l),
    () => {
      hr.get(a) === l && hr.delete(a);
    }
  );
}
function ny(a) {
  let l = hr.get(a);
  return (hr.delete(a), l);
}
function ca(a) {
  if (a.type === "error") throw a.value;
  return a.value;
}
async function xn(
  a,
  l,
  r,
  u,
  o = { result: null, innerResult: null },
  f = a.length - 1
) {
  let d = a[f];
  if (d) {
    let m,
      y = async () => (
        m
          ? console.error(
              "You cannot call instrumented handlers more than once"
            )
          : (m = xn(a, l, r, u, o, f - 1)),
        await m,
        ze(o.innerResult, "Expected an inner result"),
        o.innerResult
      );
    try {
      await d(y, l);
    } catch (p) {
      console.error("An instrumentation function threw an error:", p);
    }
    (m || (await y()), await m);
  } else {
    try {
      o.result = { type: "success", value: await r() };
    } catch (m) {
      o.result = { type: "error", value: m };
    }
    o.innerResult = u(o.result, l);
  }
  return (
    o.result ||
      ((o.result = {
        type: "error",
        value: new Error("No result assigned in instrumentation chain.")
      }),
      (o.innerResult = u(o.result, l))),
    o.result
  );
}
function fa(a) {
  return a.type === "error" && a.value instanceof Error
    ? { status: "error", error: a.value }
    : { status: "success", error: void 0 };
}
function zc(a) {
  let { request: l, context: r, params: u } = a;
  return { ...a, request: g2(l), params: { ...u }, context: v2(r) };
}
function ay(a, l) {
  return {
    currentUrl: Ln(a.state.location),
    ...("formMethod" in l ? { formMethod: l.formMethod } : {}),
    ...("formEncType" in l ? { formEncType: l.formEncType } : {}),
    ...("formData" in l ? { formData: l.formData } : {}),
    ...("body" in l ? { body: l.body } : {})
  };
}
function g2(a) {
  return {
    method: a.method,
    url: a.url,
    headers: { get: (...l) => a.headers.get(...l) }
  };
}
function v2(a) {
  return { get: (l) => a.get(l) };
}
const wp = ["POST", "PUT", "PATCH", "DELETE"],
  b2 = new Set(wp),
  E2 = ["GET", ...wp],
  S2 = new Set(E2),
  Ap = new Set([301, 302, 303, 307, 308]),
  T2 = new Set([307, 308]),
  Uc = {
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
  R2 = {
    state: "idle",
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0
  },
  ur = { state: "unblocked", proceed: void 0, reset: void 0, location: void 0 },
  Dp = "remix-router-transitions",
  _p = Symbol("ResetLoaderData");
var C2 = class {
  #e;
  #n;
  #t;
  #a;
  constructor(l) {
    ((this.#e = l), (this.#n = $u(l)));
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
    ((this.#e = l), (this.#n = $u(l)));
  }
  setHmrRoutes(l) {
    ((this.#t = l), (this.#a = $u(l)));
  }
  commitHmrRoutes() {
    this.#t &&
      ((this.#e = this.#t),
      (this.#n = this.#a),
      (this.#t = void 0),
      (this.#a = void 0));
  }
};
function N2(a) {
  const l = a.window ? a.window : typeof window < "u" ? window : void 0,
    r =
      typeof l < "u" &&
      typeof l.document < "u" &&
      typeof l.document.createElement < "u";
  ze(
    a.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let u = a.hydrationRouteProperties || [],
    o = a.mapRouteProperties,
    f = o || (() => ({}));
  if (a.instrumentations) {
    let T = a.instrumentations;
    f = (D) => ({ ...o?.(D), ...y2(T.map((O) => O.route).filter(Boolean), D) });
  }
  let d = {},
    m = new C2(br(a.routes, f, void 0, d)),
    y = a.basename || "/";
  y.startsWith("/") || (y = `/${y}`);
  let p = a.dataStrategy || O2,
    v = { ...a.future },
    b = null,
    S = new Set(),
    R = null,
    N = null,
    j = null,
    Y = null,
    G = a.hydrationData != null,
    K = Tn(m.activeRoutes, a.history.location, y, !1, m.branches),
    Z = !1,
    $ = null,
    se,
    ee;
  if (K == null && !a.patchRoutesOnNavigation) {
    let T = dn(404, { pathname: a.history.location.pathname }),
      { matches: D, route: O } = Xu(m.activeRoutes);
    ((se = !0), (ee = !se), (K = D), ($ = { [O.id]: T }));
  } else if (
    (K &&
      !a.hydrationData &&
      ga(K, m.activeRoutes, a.history.location.pathname).active &&
      (K = null),
    K)
  )
    if (K.some((T) => T.route.lazy)) ((se = !1), (ee = !se));
    else if (!K.some((T) => zf(T.route))) ((se = !0), (ee = !se));
    else {
      let T = a.hydrationData ? a.hydrationData.loaderData : null,
        D = a.hydrationData ? a.hydrationData.errors : null,
        O = K;
      if (D) {
        let I = K.findIndex((J) => D[J.route.id] !== void 0);
        O = O.slice(0, I + 1);
      }
      ((ee = !1),
        (se = !0),
        O.forEach((I) => {
          let J = Op(I.route, T, D);
          ((ee = ee || J.renderFallback), (se = se && !J.shouldLoad));
        }));
    }
  else {
    ((se = !1), (ee = !se), (K = []));
    let T = ga(null, m.activeRoutes, a.history.location.pathname);
    T.active && T.matches && ((Z = !0), (K = T.matches));
  }
  let H,
    A = {
      historyAction: a.history.action,
      location: a.history.location,
      matches: K,
      initialized: se,
      renderFallback: ee,
      navigation: Uc,
      restoreScrollPosition: a.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (a.hydrationData && a.hydrationData.loaderData) || {},
      actionData: (a.hydrationData && a.hydrationData.actionData) || null,
      errors: (a.hydrationData && a.hydrationData.errors) || $,
      fetchers: new Map(),
      blockers: new Map()
    },
    W = "POP",
    re = null,
    ie = !1,
    ne,
    le = !1,
    he = new Map(),
    Ue = null,
    x = !1,
    P = !1,
    me = new Set(),
    ge = new Map(),
    Ce = 0,
    C = -1,
    q = new Map(),
    te = new Set(),
    ue = new Map(),
    ve = new Map(),
    Ee = new Set(),
    Ae = new Map(),
    Ke,
    Ye = null;
  function mn() {
    if (
      ((b = a.history.listen(({ action: T, location: D, delta: O }) => {
        if (Ke) {
          (Ke(), (Ke = void 0));
          return;
        }
        jt(
          Ae.size === 0 || O != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let I = Xa({
          currentLocation: A.location,
          nextLocation: D,
          historyAction: T
        });
        if (I && O != null) {
          let J = new Promise((fe) => {
            Ke = fe;
          });
          (a.history.go(O * -1),
            Vn(I, {
              state: "blocked",
              location: D,
              proceed() {
                (Vn(I, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: D
                }),
                  J.then(() => a.history.go(O)));
              },
              reset() {
                let fe = new Map(A.blockers);
                (fe.set(I, ur), vt({ blockers: fe }));
              }
            }),
            re?.resolve(),
            (re = null));
          return;
        }
        return kn(T, D);
      })),
      r)
    ) {
      K2(l, he);
      let T = () => J2(l, he);
      (l.addEventListener("pagehide", T),
        (Ue = () => l.removeEventListener("pagehide", T)));
    }
    return (
      A.initialized || kn("POP", A.location, { initialHydration: !0 }),
      H
    );
  }
  function vl() {
    (b && b(),
      Ue && Ue(),
      S.clear(),
      ne && ne.abort(),
      A.fetchers.forEach((T, D) => qn(A.fetchers, D)),
      A.blockers.forEach((T, D) => Fa(D)));
  }
  function di(T) {
    if ((S.add(T), R)) {
      let { newErrors: D } = R;
      ((R = null),
        T(A, {
          deletedFetchers: [],
          newErrors: D,
          viewTransitionOpts: void 0,
          flushSync: !1
        }));
    }
    return () => S.delete(T);
  }
  function vt(T, D = {}) {
    (T.matches &&
      (T.matches = T.matches.map((J) => {
        let fe = d[J.route.id],
          ce = J.route;
        return ce.element !== fe.element ||
          ce.errorElement !== fe.errorElement ||
          ce.hydrateFallbackElement !== fe.hydrateFallbackElement
          ? { ...J, route: fe }
          : J;
      })),
      (A = { ...A, ...T }));
    let O = [],
      I = [];
    (A.fetchers.forEach((J, fe) => {
      J.state === "idle" && (Ee.has(fe) ? O.push(fe) : I.push(fe));
    }),
      Ee.forEach((J) => {
        !A.fetchers.has(J) && !ge.has(J) && O.push(J);
      }),
      S.size === 0 && (R = { newErrors: T.errors ?? null }),
      [...S].forEach((J) =>
        J(A, {
          deletedFetchers: O,
          newErrors: T.errors ?? null,
          viewTransitionOpts: D.viewTransitionOpts,
          flushSync: D.flushSync === !0
        })
      ),
      O.forEach((J) => qn(A.fetchers, J)),
      I.forEach((J) => A.fetchers.delete(J)));
  }
  function Bt(T, D, { flushSync: O } = {}) {
    let I =
        A.actionData != null &&
        A.navigation.formMethod != null &&
        Mt(A.navigation.formMethod) &&
        A.navigation.state === "loading" &&
        T.state?._isRedirect !== !0,
      J;
    D.actionData
      ? Object.keys(D.actionData).length > 0
        ? (J = D.actionData)
        : (J = null)
      : I
        ? (J = A.actionData)
        : (J = null);
    let fe = D.loaderData
        ? hy(A.loaderData, D.loaderData, D.matches || [], D.errors)
        : A.loaderData,
      ce = A.blockers;
    ce.size > 0 &&
      !x &&
      ((ce = new Map(ce)), ce.forEach((Se, Te) => ce.set(Te, ur)));
    let ae = x ? !1 : gi(T, D.matches || A.matches),
      oe =
        ie === !0 ||
        (A.navigation.formMethod != null &&
          Mt(A.navigation.formMethod) &&
          T.state?._isRedirect !== !0);
    (m.commitHmrRoutes(),
      x ||
        W === "POP" ||
        (W === "PUSH"
          ? a.history.push(T, T.state)
          : W === "REPLACE" && a.history.replace(T, T.state)));
    let Ne;
    if (W === "POP") {
      let Se = he.get(A.location.pathname);
      Se && Se.has(T.pathname)
        ? (Ne = { currentLocation: A.location, nextLocation: T })
        : he.has(T.pathname) &&
          (Ne = { currentLocation: T, nextLocation: A.location });
    } else if (le) {
      let Se = he.get(A.location.pathname);
      (Se
        ? Se.add(T.pathname)
        : ((Se = new Set([T.pathname])), he.set(A.location.pathname, Se)),
        (Ne = { currentLocation: A.location, nextLocation: T }));
    }
    (vt(
      {
        ...D,
        actionData: J,
        loaderData: fe,
        historyAction: W,
        location: T,
        initialized: !0,
        renderFallback: !1,
        navigation: Uc,
        revalidation: "idle",
        restoreScrollPosition: ae,
        preventScrollReset: oe,
        blockers: ce
      },
      { viewTransitionOpts: Ne, flushSync: O === !0 }
    ),
      (W = "POP"),
      (ie = !1),
      (le = !1),
      (x = !1),
      (P = !1),
      re?.resolve(),
      (re = null),
      Ye?.resolve(),
      (Ye = null));
  }
  async function bl(T, D) {
    if ((re?.resolve(), (re = null), typeof T == "number")) {
      re || (re = vy());
      let Ge = re.promise;
      return (a.history.go(T), Ge);
    }
    let O = ny(H),
      {
        path: I,
        submission: J,
        error: fe
      } = ly(
        !1,
        mf(A.location, A.matches, y, T, D?.fromRouteId, D?.relative),
        D
      ),
      ce;
    D?.mask &&
      (ce = {
        pathname: "",
        search: "",
        hash: "",
        ...(typeof D.mask == "string"
          ? jn(D.mask)
          : { ...A.location.mask, ...D.mask })
      });
    let ae = A.location,
      oe = vr(ae, I, D && D.state, void 0, ce);
    oe = { ...oe, ...a.history.encodeLocation(oe) };
    let Ne = D && D.replace != null ? D.replace : void 0,
      Se = "PUSH";
    Ne === !0
      ? (Se = "REPLACE")
      : Ne === !1 ||
        (J != null &&
          Mt(J.formMethod) &&
          J.formAction === A.location.pathname + A.location.search &&
          (Se = "REPLACE"));
    let Te =
        D && "preventScrollReset" in D ? D.preventScrollReset === !0 : void 0,
      Le = (D && D.flushSync) === !0,
      Je = Xa({ currentLocation: ae, nextLocation: oe, historyAction: Se });
    if (Je) {
      Vn(Je, {
        state: "blocked",
        location: oe,
        proceed() {
          (Vn(Je, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: oe
          }),
            bl(T, D));
        },
        reset() {
          let Ge = new Map(A.blockers);
          (Ge.set(Je, ur), vt({ blockers: Ge }));
        }
      });
      return;
    }
    await kn(Se, oe, {
      submission: J,
      pendingError: fe,
      preventScrollReset: Te,
      replace: D && D.replace,
      enableViewTransition: D && D.viewTransition,
      flushSync: Le,
      callSiteDefaultShouldRevalidate: D && D.defaultShouldRevalidate,
      instrumentationNavigateMetaReceiver: O
    });
  }
  function hi() {
    (Ye || (Ye = vy()), ya(), vt({ revalidation: "loading" }));
    let T = Ye.promise;
    return A.navigation.state === "submitting"
      ? T
      : A.navigation.state === "idle"
        ? (kn(A.historyAction, A.location, {
            startUninterruptedRevalidation: !0
          }),
          T)
        : (kn(W || A.historyAction, A.navigation.location, {
            overrideNavigation: A.navigation,
            enableViewTransition: le === !0
          }),
          T);
  }
  async function kn(T, D, O) {
    (ne && ne.abort(),
      (ne = null),
      (W = T),
      (x = (O && O.startUninterruptedRevalidation) === !0),
      vs(A.location, A.matches),
      (ie = (O && O.preventScrollReset) === !0),
      (le = (O && O.enableViewTransition) === !0));
    let I = m.activeRoutes,
      J =
        O?.initialHydration && A.matches && A.matches.length > 0 && !Z
          ? A.matches
          : Tn(I, D, y, !1, m.branches),
      fe = (O && O.flushSync) === !0;
    if (
      J &&
      A.initialized &&
      !P &&
      H2(A.location, D) &&
      !(O && O.submission && Mt(O.submission.formMethod))
    ) {
      Bt(D, { matches: J }, { flushSync: fe });
      return;
    }
    let ce = ga(J, I, D.pathname);
    if (
      (ce.active && ce.matches && (J = ce.matches),
      O?.instrumentationNavigateMetaReceiver)
    ) {
      let Oe = py(a.history, D, J);
      O.instrumentationNavigateMetaReceiver(Oe);
    }
    if (!J) {
      let { error: Oe, notFoundMatches: Ut, route: st } = pn(D.pathname);
      Bt(
        D,
        { matches: Ut, loaderData: {}, errors: { [st.id]: Oe } },
        { flushSync: fe }
      );
      return;
    }
    let ae =
      O && O.overrideNavigation
        ? { ...O.overrideNavigation, matches: J, historyAction: T }
        : void 0;
    ne = new AbortController();
    let oe = ai(a.history, D, ne.signal, O && O.submission),
      Ne = a.getContext ? await a.getContext() : new $0(),
      Se;
    if (O && O.pendingError)
      Se = [Qa(J).route.id, { type: "error", error: O.pendingError }];
    else if (O && O.submission && Mt(O.submission.formMethod)) {
      let Oe = await Or(
        oe,
        D,
        O.submission,
        J,
        T,
        Ne,
        ce.active,
        O && O.initialHydration === !0,
        { replace: O.replace, flushSync: fe }
      );
      if (Oe.shortCircuited) return;
      if (Oe.pendingActionResult) {
        let [Ut, st] = Oe.pendingActionResult;
        if (Pt(st) && Er(st.error) && st.error.status === 404) {
          ((ne = null),
            Bt(D, {
              matches: Oe.matches,
              loaderData: {},
              errors: { [Ut]: st.error }
            }));
          return;
        }
      }
      ((J = Oe.matches || J),
        (Se = Oe.pendingActionResult),
        (ae = Lc(D, J, T, O.submission)),
        (fe = !1),
        (ce.active = !1),
        (oe = ai(a.history, oe.url, oe.signal)));
    }
    let {
      shortCircuited: Te,
      matches: Le,
      loaderData: Je,
      errors: Ge,
      workingFetchers: at
    } = await mi(
      oe,
      D,
      J,
      T,
      Ne,
      ce.active,
      ae,
      O && O.submission,
      O && O.fetcherSubmission,
      O && O.replace,
      O && O.initialHydration === !0,
      fe,
      Se,
      O && O.callSiteDefaultShouldRevalidate
    );
    Te ||
      ((ne = null),
      Bt(D, {
        matches: Le || J,
        ...my(Se),
        loaderData: Je,
        errors: Ge,
        ...(at ? { fetchers: at } : {})
      }));
  }
  async function Or(T, D, O, I, J, fe, ce, ae, oe = {}) {
    if (
      (ya(),
      vt({ navigation: Z2(D, I, J, O) }, { flushSync: oe.flushSync === !0 }),
      ce)
    ) {
      let Te = await Nn(I, D.pathname, T.signal);
      if (Te.type === "aborted") return { shortCircuited: !0 };
      if (Te.type === "error") {
        if (Te.partialMatches.length === 0) {
          let { matches: Je, route: Ge } = Xu(m.activeRoutes);
          return {
            matches: Je,
            pendingActionResult: [Ge.id, { type: "error", error: Te.error }]
          };
        }
        let Le = Qa(Te.partialMatches).route.id;
        return {
          matches: Te.partialMatches,
          pendingActionResult: [Le, { type: "error", error: Te.error }]
        };
      } else if (Te.matches) I = Te.matches;
      else {
        let { notFoundMatches: Le, error: Je, route: Ge } = pn(D.pathname);
        return {
          matches: Le,
          pendingActionResult: [Ge.id, { type: "error", error: Je }]
        };
      }
    }
    let Ne,
      Se = Pu(I, D);
    if (!Se.route.action && !Se.route.lazy)
      Ne = {
        type: "error",
        error: dn(405, {
          method: T.method,
          pathname: D.pathname,
          routeId: Se.route.id
        })
      };
    else {
      let Te = await ma(T, D, ui(f, d, T, D, I, Se, ae ? [] : u, fe), fe, null);
      if (((Ne = Te[Se.route.id]), !Ne)) {
        for (let Le of I)
          if (Te[Le.route.id]) {
            Ne = Te[Le.route.id];
            break;
          }
      }
      if (T.signal.aborted) return { shortCircuited: !0 };
    }
    if (dl(Ne)) {
      let Te;
      return (
        oe && oe.replace != null
          ? (Te = oe.replace)
          : (Te =
              cy(
                Ne.response.headers.get("Location"),
                new URL(T.url),
                y,
                a.history
              ) ===
              A.location.pathname + A.location.search),
        await Hn(T, Ne, !0, { submission: O, replace: Te }),
        { shortCircuited: !0 }
      );
    }
    if (Pt(Ne)) {
      let Te = Qa(I, Se.route.id);
      return (
        (oe && oe.replace) !== !0 && (W = "PUSH"),
        { matches: I, pendingActionResult: [Te.route.id, Ne, Se.route.id] }
      );
    }
    return { matches: I, pendingActionResult: [Se.route.id, Ne] };
  }
  async function mi(T, D, O, I, J, fe, ce, ae, oe, Ne, Se, Te, Le, Je) {
    let Ge = ce || Lc(D, O, I, ae),
      at = ae || oe || gy(Ge),
      Oe = !x && !Se;
    if (fe) {
      if (Oe) {
        let Ze = El(Le);
        vt(
          { navigation: Ge, ...(Ze !== void 0 ? { actionData: Ze } : {}) },
          { flushSync: Te }
        );
      }
      let De = await Nn(O, D.pathname, T.signal);
      if (De.type === "aborted") return { shortCircuited: !0 };
      if (De.type === "error") {
        if (De.partialMatches.length === 0) {
          let { matches: tn, route: ba } = Xu(m.activeRoutes);
          return { matches: tn, loaderData: {}, errors: { [ba.id]: De.error } };
        }
        let Ze = Qa(De.partialMatches).route.id;
        return {
          matches: De.partialMatches,
          loaderData: {},
          errors: { [Ze]: De.error }
        };
      } else if (De.matches) O = De.matches;
      else {
        let { error: Ze, notFoundMatches: tn, route: ba } = pn(D.pathname);
        return { matches: tn, loaderData: {}, errors: { [ba.id]: Ze } };
      }
    }
    let Ut = m.activeRoutes,
      { dsMatches: st, revalidatingFetchers: Xe } = iy(
        T,
        J,
        f,
        d,
        a.history,
        A,
        O,
        at,
        D,
        Se ? [] : u,
        Se === !0,
        P,
        me,
        Ee,
        ue,
        te,
        Ut,
        y,
        a.patchRoutesOnNavigation != null,
        m.branches,
        Le,
        Je
      );
    if (
      ((C = ++Ce),
      !a.dataStrategy &&
        !st.some((De) => De.shouldLoad) &&
        !st.some(
          (De) => De.route.middleware && De.route.middleware.length > 0
        ) &&
        Xe.length === 0)
    ) {
      let De = new Map(A.fetchers),
        Ze = Mr(De);
      return (
        Bt(
          D,
          {
            matches: O,
            loaderData: {},
            errors: Le && Pt(Le[1]) ? { [Le[0]]: Le[1].error } : null,
            ...my(Le),
            ...(Ze ? { fetchers: De } : {})
          },
          { flushSync: Te }
        ),
        { shortCircuited: !0 }
      );
    }
    if (Oe) {
      let De = {};
      if (!fe) {
        De.navigation = Ge;
        let Ze = El(Le);
        Ze !== void 0 && (De.actionData = Ze);
      }
      (Xe.length > 0 && (De.fetchers = yi(Xe)), vt(De, { flushSync: Te }));
    }
    Xe.forEach((De) => {
      (St(De.key), De.controller && ge.set(De.key, De.controller));
    });
    let gn = () => Xe.forEach((De) => St(De.key));
    ne && ne.signal.addEventListener("abort", gn);
    let { loaderResults: Yn, fetcherResults: en } = await pi(st, Xe, T, D, J);
    if (T.signal.aborted) return { shortCircuited: !0 };
    (ne && ne.signal.removeEventListener("abort", gn),
      Xe.forEach((De) => ge.delete(De.key)));
    let bt = Zu(Yn);
    if (bt)
      return (
        await Hn(T, bt.result, !0, { replace: Ne }),
        { shortCircuited: !0 }
      );
    if (((bt = Zu(en)), bt))
      return (
        te.add(bt.key),
        await Hn(T, bt.result, !0, { replace: Ne }),
        { shortCircuited: !0 }
      );
    let va = new Map(A.fetchers),
      { loaderData: Gn, errors: Qn } = dy(A, O, Yn, Le, Xe, en, va);
    Se && A.errors && (Qn = { ...A.errors, ...Qn });
    let Tl = Mr(va),
      Fn = xr(C, va),
      Xn = Tl || Fn || Xe.length > 0;
    return {
      matches: O,
      loaderData: Gn,
      errors: Qn,
      ...(Xn ? { workingFetchers: va } : {})
    };
  }
  function El(T) {
    if (T && !Pt(T[1])) return { [T[0]]: T[1].data };
    if (A.actionData)
      return Object.keys(A.actionData).length === 0 ? null : A.actionData;
  }
  function yi(T) {
    let D = new Map(A.fetchers);
    return (
      T.forEach((O) => {
        let I = D.get(O.key),
          J = sr(void 0, I ? I.data : void 0);
        D.set(O.key, J);
      }),
      D
    );
  }
  async function hs(T, D, O, I) {
    St(T);
    let J = (I && I.flushSync) === !0,
      fe = ny(H),
      ce = m.activeRoutes,
      ae = mf(A.location, A.matches, y, O, D, I?.relative),
      oe = Tn(ce, ae, y, !1, m.branches),
      Ne = ga(oe, ce, ae);
    if (
      (Ne.active && Ne.matches && (oe = Ne.matches),
      fe && fe(py(a.history, ae, oe)),
      !oe)
    ) {
      Wt(T, D, dn(404, { pathname: ae }), { flushSync: J });
      return;
    }
    let { path: Se, submission: Te, error: Le } = ly(!0, ae, I);
    if (Le) {
      Wt(T, D, Le, { flushSync: J });
      return;
    }
    let Je = a.getContext ? await a.getContext() : new $0(),
      Ge = (I && I.preventScrollReset) === !0;
    if (Te && Mt(Te.formMethod)) {
      await ms(
        T,
        D,
        Se,
        oe,
        Je,
        Ne.active,
        J,
        Ge,
        Te,
        I && I.defaultShouldRevalidate
      );
      return;
    }
    (ue.set(T, { routeId: D, path: Se }),
      await xt(T, D, Se, oe, Je, Ne.active, J, Ge, Te));
  }
  async function ms(T, D, O, I, J, fe, ce, ae, oe, Ne) {
    (ya(), ue.delete(T), yn(T, I2(oe, A.fetchers.get(T)), { flushSync: ce }));
    let Se = new AbortController(),
      Te = ai(a.history, O, Se.signal, oe);
    if (fe) {
      let lt = await Nn(I, new URL(Te.url).pathname, Te.signal, T);
      if (lt.type === "aborted") return;
      if (lt.type === "error") {
        Wt(T, D, lt.error, { flushSync: ce });
        return;
      } else if (lt.matches) I = lt.matches;
      else {
        Wt(T, D, dn(404, { pathname: O }), { flushSync: ce });
        return;
      }
    }
    let Le = Pu(I, O);
    if (!Le.route.action && !Le.route.lazy) {
      Wt(T, D, dn(405, { method: oe.formMethod, pathname: O, routeId: D }), {
        flushSync: ce
      });
      return;
    }
    ge.set(T, Se);
    let Je = Ce,
      Ge = ui(f, d, Te, O, I, Le, u, J),
      at = await ma(Te, O, Ge, J, T),
      Oe = at[Le.route.id];
    if (!Oe) {
      for (let lt of Ge)
        if (at[lt.route.id]) {
          Oe = at[lt.route.id];
          break;
        }
    }
    if (Te.signal.aborted) {
      ge.get(T) === Se && ge.delete(T);
      return;
    }
    if (Ee.has(T)) {
      if (dl(Oe) || Pt(Oe)) {
        yn(T, Mn(void 0));
        return;
      }
    } else {
      if (dl(Oe))
        if ((ge.delete(T), C > Je)) {
          yn(T, Mn(void 0));
          return;
        } else
          return (
            te.add(T),
            yn(T, sr(oe)),
            Hn(Te, Oe, !1, { fetcherSubmission: oe, preventScrollReset: ae })
          );
      if (Pt(Oe)) {
        Wt(T, D, Oe.error);
        return;
      }
    }
    let Ut = A.navigation.location || A.location,
      st = ai(a.history, Ut, Se.signal),
      Xe = m.activeRoutes,
      gn =
        A.navigation.state !== "idle"
          ? Tn(Xe, A.navigation.location, y, !1, m.branches)
          : A.matches;
    ze(gn, "Didn't find any matches after fetcher action");
    let Yn = ++Ce;
    q.set(T, Yn);
    let { dsMatches: en, revalidatingFetchers: bt } = iy(
        st,
        J,
        f,
        d,
        a.history,
        A,
        gn,
        oe,
        Ut,
        u,
        !1,
        P,
        me,
        Ee,
        ue,
        te,
        Xe,
        y,
        a.patchRoutesOnNavigation != null,
        m.branches,
        [Le.route.id, Oe],
        Ne
      ),
      va = sr(oe, Oe.data),
      Gn = new Map(A.fetchers);
    (Gn.set(T, va),
      bt
        .filter((lt) => lt.key !== T)
        .forEach((lt) => {
          let nn = lt.key,
            jr = Gn.get(nn),
            kt = sr(void 0, jr ? jr.data : void 0);
          (Gn.set(nn, kt), St(nn), lt.controller && ge.set(nn, lt.controller));
        }),
      vt({ fetchers: Gn }));
    let Qn = () => bt.forEach((lt) => St(lt.key));
    Se.signal.addEventListener("abort", Qn);
    let { loaderResults: Tl, fetcherResults: Fn } = await pi(en, bt, st, Ut, J);
    if (Se.signal.aborted) return;
    (Se.signal.removeEventListener("abort", Qn),
      q.delete(T),
      ge.delete(T),
      bt.forEach((lt) => ge.delete(lt.key)));
    let Xn = A.fetchers.has(T),
      De = (lt) => {
        if (!Xn) return lt;
        let nn = new Map(lt.fetchers);
        return (nn.set(T, Mn(Oe.data)), { ...lt, fetchers: nn });
      },
      Ze = Zu(Tl);
    if (Ze)
      return ((A = De(A)), Hn(st, Ze.result, !1, { preventScrollReset: ae }));
    if (((Ze = Zu(Fn)), Ze))
      return (
        te.add(Ze.key),
        (A = De(A)),
        Hn(st, Ze.result, !1, { preventScrollReset: ae })
      );
    let tn = new Map(A.fetchers);
    Xn && tn.set(T, Mn(Oe.data));
    let { loaderData: ba, errors: Za } = dy(A, gn, Tl, void 0, bt, Fn, tn);
    (xr(Yn, tn),
      A.navigation.state === "loading" && Yn > C
        ? (ze(W, "Expected pending action"),
          ne && ne.abort(),
          Bt(A.navigation.location, {
            matches: gn,
            loaderData: ba,
            errors: Za,
            fetchers: tn
          }))
        : (vt({
            errors: Za,
            loaderData: hy(A.loaderData, ba, gn, Za),
            fetchers: tn
          }),
          (P = !1)));
  }
  async function xt(T, D, O, I, J, fe, ce, ae, oe) {
    let Ne = A.fetchers.get(T);
    yn(T, sr(oe, Ne ? Ne.data : void 0), { flushSync: ce });
    let Se = new AbortController(),
      Te = ai(a.history, O, Se.signal);
    if (fe) {
      let Oe = await Nn(I, new URL(Te.url).pathname, Te.signal, T);
      if (Oe.type === "aborted") return;
      if (Oe.type === "error") {
        Wt(T, D, Oe.error, { flushSync: ce });
        return;
      } else if (Oe.matches) I = Oe.matches;
      else {
        Wt(T, D, dn(404, { pathname: O }), { flushSync: ce });
        return;
      }
    }
    let Le = Pu(I, O);
    ge.set(T, Se);
    let Je = Ce,
      Ge = await ma(Te, O, ui(f, d, Te, O, I, Le, u, J), J, T),
      at = Ge[Le.route.id];
    if (!at) {
      for (let Oe of I)
        if (Ge[Oe.route.id]) {
          at = Ge[Oe.route.id];
          break;
        }
    }
    if ((ge.get(T) === Se && ge.delete(T), !Te.signal.aborted)) {
      if (Ee.has(T)) {
        yn(T, Mn(void 0));
        return;
      }
      if (dl(at))
        if (C > Je) {
          yn(T, Mn(void 0));
          return;
        } else {
          (te.add(T), await Hn(Te, at, !1, { preventScrollReset: ae }));
          return;
        }
      if (Pt(at)) {
        Wt(T, D, at.error);
        return;
      }
      yn(T, Mn(at.data));
    }
  }
  async function Hn(
    T,
    D,
    O,
    {
      submission: I,
      fetcherSubmission: J,
      preventScrollReset: fe,
      replace: ce
    } = {}
  ) {
    (O || (re?.resolve(), (re = null)),
      D.response.headers.has("X-Remix-Revalidate") && (P = !0));
    let ae = D.response.headers.get("Location");
    (ze(ae, "Expected a Location header on the redirect Response"),
      (ae = cy(ae, new URL(T.url), y, a.history)));
    let oe = vr(A.location, ae, { _isRedirect: !0 });
    if (r) {
      let Ge = !1;
      if (D.response.headers.has("X-Remix-Reload-Document")) Ge = !0;
      else if (_f(ae)) {
        const at = mp(l, ae, !0);
        Ge = at.origin !== l.location.origin || Rn(at.pathname, y) == null;
      }
      if (Ge) {
        ce ? l.location.replace(ae) : l.location.assign(ae);
        return;
      }
    }
    ne = null;
    let Ne =
        ce === !0 || D.response.headers.has("X-Remix-Replace")
          ? "REPLACE"
          : "PUSH",
      { formMethod: Se, formAction: Te, formEncType: Le } = A.navigation;
    !I && !J && Se && Te && Le && (I = gy(A.navigation));
    let Je = I || J;
    T2.has(D.response.status) && Je && Mt(Je.formMethod)
      ? await kn(Ne, oe, {
          submission: { ...Je, formAction: ae },
          preventScrollReset: fe || ie,
          enableViewTransition: O ? le : void 0
        })
      : await kn(Ne, oe, {
          overrideNavigation: Lc(oe, [], Ne, I),
          fetcherSubmission: J,
          preventScrollReset: fe || ie,
          enableViewTransition: O ? le : void 0
        });
  }
  async function ma(T, D, O, I, J) {
    let fe,
      ce = {};
    try {
      fe = await x2(p, T, D, O, J, I, !1);
    } catch (ae) {
      return (
        O.filter((oe) => oe.shouldLoad).forEach((oe) => {
          ce[oe.route.id] = { type: "error", error: ae };
        }),
        ce
      );
    }
    if (T.signal.aborted) return ce;
    if (!Mt(T.method))
      for (let ae of O) {
        if (fe[ae.route.id]?.type === "error") break;
        !fe.hasOwnProperty(ae.route.id) &&
          !A.loaderData.hasOwnProperty(ae.route.id) &&
          (!A.errors || !A.errors.hasOwnProperty(ae.route.id)) &&
          ae.shouldCallHandler() &&
          (fe[ae.route.id] = {
            type: "error",
            result: new Error(
              `No result returned from dataStrategy for route ${ae.route.id}`
            )
          });
      }
    for (let [ae, oe] of Object.entries(fe))
      if (G2(oe)) {
        let Ne = oe.result;
        ce[ae] = { type: "redirect", response: j2(Ne, T, ae, O, y) };
      } else ce[ae] = await L2(oe);
    return ce;
  }
  async function pi(T, D, O, I, J) {
    let fe = ma(O, I, T, J, null),
      ce = Promise.all(
        D.map(async (ae) => {
          if (ae.matches && ae.match && ae.request && ae.controller) {
            let oe = (await ma(ae.request, ae.path, ae.matches, J, ae.key))[
              ae.match.route.id
            ];
            return { [ae.key]: oe };
          } else
            return Promise.resolve({
              [ae.key]: { type: "error", error: dn(404, { pathname: ae.path }) }
            });
        })
      );
    return {
      loaderResults: await fe,
      fetcherResults: (await ce).reduce((ae, oe) => Object.assign(ae, oe), {})
    };
  }
  function ya() {
    ((P = !0),
      ue.forEach((T, D) => {
        (ge.has(D) && me.add(D), St(D));
      }));
  }
  function yn(T, D, O = {}) {
    let I = new Map(A.fetchers);
    (I.set(T, D),
      vt({ fetchers: I }, { flushSync: (O && O.flushSync) === !0 }));
  }
  function Wt(T, D, O, I = {}) {
    let J = Qa(A.matches, D),
      fe = new Map(A.fetchers);
    (qn(fe, T),
      vt(
        { errors: { [J.route.id]: O }, fetchers: fe },
        { flushSync: (I && I.flushSync) === !0 }
      ));
  }
  function ys(T) {
    return (
      ve.set(T, (ve.get(T) || 0) + 1),
      Ee.has(T) && Ee.delete(T),
      A.fetchers.get(T) || R2
    );
  }
  function ps(T, D) {
    (St(T, D?.reason), yn(T, Mn(null)));
  }
  function qn(T, D) {
    let O = A.fetchers.get(D);
    (ge.has(D) && !(O && O.state === "loading" && q.has(D)) && St(D),
      ue.delete(D),
      q.delete(D),
      te.delete(D),
      Ee.delete(D),
      me.delete(D),
      T.delete(D));
  }
  function zt(T) {
    let D = (ve.get(T) || 0) - 1;
    (D <= 0 ? (ve.delete(T), Ee.add(T)) : ve.set(T, D),
      vt({ fetchers: new Map(A.fetchers) }));
  }
  function St(T, D) {
    let O = ge.get(T);
    O && (O.abort(D), ge.delete(T));
  }
  function _t(T, D) {
    for (let O of T) {
      let I = D.get(O);
      ze(I, `Expected fetcher: ${O}`);
      let J = Mn(I.data);
      D.set(O, J);
    }
  }
  function Mr(T) {
    let D = [],
      O = !1;
    for (let I of te) {
      let J = T.get(I);
      (ze(J, `Expected fetcher: ${I}`),
        J.state === "loading" && (te.delete(I), D.push(I), (O = !0)));
    }
    return (_t(D, T), O);
  }
  function xr(T, D) {
    let O = [];
    for (let [I, J] of q)
      if (J < T) {
        let fe = D.get(I);
        (ze(fe, `Expected fetcher: ${I}`),
          fe.state === "loading" && (St(I), q.delete(I), O.push(I)));
      }
    return (_t(O, D), O.length > 0);
  }
  function gs(T, D) {
    let O = A.blockers.get(T) || ur;
    return (Ae.get(T) !== D && Ae.set(T, D), O);
  }
  function Fa(T) {
    (A.blockers.delete(T), Ae.delete(T));
  }
  function Vn(T, D) {
    let O = A.blockers.get(T) || ur;
    ze(
      (O.state === "unblocked" && D.state === "blocked") ||
        (O.state === "blocked" && D.state === "blocked") ||
        (O.state === "blocked" && D.state === "proceeding") ||
        (O.state === "blocked" && D.state === "unblocked") ||
        (O.state === "proceeding" && D.state === "unblocked"),
      `Invalid blocker state transition: ${O.state} -> ${D.state}`
    );
    let I = new Map(A.blockers);
    (I.set(T, D), vt({ blockers: I }));
  }
  function Xa({ currentLocation: T, nextLocation: D, historyAction: O }) {
    if (Ae.size === 0) return;
    Ae.size > 1 && jt(!1, "A router only supports one blocker at a time");
    let I = Array.from(Ae.entries()),
      [J, fe] = I[I.length - 1],
      ce = A.blockers.get(J);
    if (
      !(ce && ce.state === "proceeding") &&
      fe({ currentLocation: T, nextLocation: D, historyAction: O })
    )
      return J;
  }
  function pn(T) {
    let D = dn(404, { pathname: T }),
      O = m.activeRoutes,
      { matches: I, route: J } = Xu(O);
    return { notFoundMatches: I, route: J, error: D };
  }
  function Sl(T, D, O) {
    if (((N = T), (Y = D), (j = O || null), !G && A.navigation === Uc)) {
      G = !0;
      let I = gi(A.location, A.matches);
      I != null && vt({ restoreScrollPosition: I });
    }
    return () => {
      ((N = null), (Y = null), (j = null));
    };
  }
  function pa(T, D) {
    return (
      (j &&
        j(
          T,
          D.map((O) => K1(O, A.loaderData))
        )) ||
      T.key
    );
  }
  function vs(T, D) {
    if (N && Y) {
      let O = pa(T, D);
      N[O] = Y();
    }
  }
  function gi(T, D) {
    if (N) {
      let O = pa(T, D),
        I = N[O];
      if (typeof I == "number") return I;
    }
    return null;
  }
  function ga(T, D, O) {
    if (a.patchRoutesOnNavigation) {
      let I = m.branches;
      if (T) {
        if (Object.keys(T[0].params).length > 0)
          return { active: !0, matches: Tn(D, O, y, !0, I) };
      } else return { active: !0, matches: Tn(D, O, y, !0, I) || [] };
    }
    return { active: !1, matches: null };
  }
  async function Nn(T, D, O, I) {
    if (!a.patchRoutesOnNavigation) return { type: "success", matches: T };
    let J = T;
    for (;;) {
      let fe = d;
      try {
        await a.patchRoutesOnNavigation({
          signal: O,
          path: D,
          matches: J,
          fetcherKey: I,
          patch: (Ne, Se) => {
            O.aborted || ry(Ne, Se, m, fe, f, !1);
          }
        });
      } catch (Ne) {
        return { type: "error", error: Ne, partialMatches: J };
      }
      if (O.aborted) return { type: "aborted" };
      let ce = m.branches,
        ae = Tn(m.activeRoutes, D, y, !1, ce),
        oe = null;
      if (ae) {
        if (Object.keys(ae[0].params).length === 0)
          return { type: "success", matches: ae };
        if (
          ((oe = Tn(m.activeRoutes, D, y, !0, ce)),
          !(oe && J.length < oe.length && zr(J, oe.slice(0, J.length))))
        )
          return { type: "success", matches: ae };
      }
      if ((oe || (oe = Tn(m.activeRoutes, D, y, !0, ce)), !oe || zr(J, oe)))
        return { type: "success", matches: null };
      J = oe;
    }
  }
  function zr(T, D) {
    return (
      T.length === D.length && T.every((O, I) => O.route.id === D[I].route.id)
    );
  }
  function Ur(T) {
    ((d = {}), m.setHmrRoutes(br(T, f, void 0, d)));
  }
  function Lr(T, D, O = !1) {
    (ry(T, D, m, d, f, O), m.hasHMRRoutes || vt({}));
  }
  return (
    (H = {
      get basename() {
        return y;
      },
      get future() {
        return v;
      },
      get state() {
        return A;
      },
      get routes() {
        return m.stableRoutes;
      },
      get branches() {
        return m.branches;
      },
      get manifest() {
        return d;
      },
      get window() {
        return l;
      },
      initialize: mn,
      subscribe: di,
      enableScrollRestoration: Sl,
      navigate: bl,
      fetch: hs,
      revalidate: hi,
      createHref: (T) => a.history.createHref(T),
      encodeLocation: (T) => a.history.encodeLocation(T),
      getFetcher: ys,
      resetFetcher: ps,
      deleteFetcher: zt,
      dispose: vl,
      getBlocker: gs,
      deleteBlocker: Fa,
      patchRoutes: Lr,
      _internalFetchControllers: ge,
      _internalSetRoutes: Ur,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(T) {
        vt(T);
      }
    }),
    a.instrumentations &&
      (H = p2(H, a.instrumentations.map((T) => T.router).filter(Boolean))),
    H
  );
}
function w2(a) {
  return (
    a != null &&
    (("formData" in a && a.formData != null) ||
      ("body" in a && a.body !== void 0))
  );
}
function mf(a, l, r, u, o, f) {
  let d, m;
  if (o) {
    d = [];
    for (let p of l)
      if ((d.push(p), p.route.id === o)) {
        m = p;
        break;
      }
  } else ((d = l), (m = l[l.length - 1]));
  let y = us(u || ".", Of(d), Rn(a.pathname, r) || a.pathname, f === "path");
  if (
    (u == null && ((y.search = a.search), (y.hash = a.hash)),
    (u == null || u === "" || u === ".") && m)
  ) {
    let p = Lf(y.search);
    if (m.route.index && !p)
      y.search = y.search ? y.search.replace(/^\?/, "?index&") : "?index";
    else if (!m.route.index && p) {
      let v = new URLSearchParams(y.search),
        b = v.getAll("index");
      (v.delete("index"),
        b.filter((R) => R).forEach((R) => v.append("index", R)));
      let S = v.toString();
      y.search = S ? `?${S}` : "";
    }
  }
  return (
    r !== "/" && (y.pathname = o2({ basename: r, pathname: y.pathname })),
    Ln(y)
  );
}
function ly(a, l, r) {
  if (!r || !w2(r)) return { path: l };
  if (r.formMethod && !X2(r.formMethod))
    return { path: l, error: dn(405, { method: r.formMethod }) };
  let u = () => ({ path: l, error: dn(400, { type: "invalid-body" }) }),
    o = (r.formMethod || "get").toUpperCase(),
    f = jp(l);
  if (r.body !== void 0) {
    if (r.formEncType === "text/plain") {
      if (!Mt(o)) return u();
      let v =
        typeof r.body == "string"
          ? r.body
          : r.body instanceof FormData || r.body instanceof URLSearchParams
            ? Array.from(r.body.entries()).reduce(
                (b, [S, R]) => `${b}${S}=${R}
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
          text: v
        }
      };
    } else if (r.formEncType === "application/json") {
      if (!Mt(o)) return u();
      try {
        let v = typeof r.body == "string" ? JSON.parse(r.body) : r.body;
        return {
          path: l,
          submission: {
            formMethod: o,
            formAction: f,
            formEncType: r.formEncType,
            formData: void 0,
            json: v,
            text: void 0
          }
        };
      } catch {
        return u();
      }
    }
  }
  ze(
    typeof FormData == "function",
    "FormData is not available in this environment"
  );
  let d, m;
  if (r.formData) ((d = gf(r.formData)), (m = r.formData));
  else if (r.body instanceof FormData) ((d = gf(r.body)), (m = r.body));
  else if (r.body instanceof URLSearchParams) ((d = r.body), (m = fy(d)));
  else if (r.body == null) ((d = new URLSearchParams()), (m = new FormData()));
  else
    try {
      ((d = new URLSearchParams(r.body)), (m = fy(d)));
    } catch {
      return u();
    }
  let y = {
    formMethod: o,
    formAction: f,
    formEncType: (r && r.formEncType) || "application/x-www-form-urlencoded",
    formData: m,
    json: void 0,
    text: void 0
  };
  if (Mt(y.formMethod)) return { path: l, submission: y };
  let p = jn(l);
  return (
    a && p.search && Lf(p.search) && d.append("index", ""),
    (p.search = `?${d}`),
    { path: Ln(p), submission: y }
  );
}
function iy(a, l, r, u, o, f, d, m, y, p, v, b, S, R, N, j, Y, G, K, Z, $, se) {
  let ee = $ ? (Pt($[1]) ? $[1].error : $[1].data) : void 0,
    H = o.createURL(f.location),
    A = o.createURL(y),
    W;
  if (v && f.errors) {
    let x = Object.keys(f.errors)[0];
    W = d.findIndex((P) => P.route.id === x);
  } else if ($ && Pt($[1])) {
    let x = $[0];
    W = d.findIndex((P) => P.route.id === x) - 1;
  }
  let re = $ ? $[1].statusCode : void 0,
    ie = re && re >= 400,
    ne = {
      currentUrl: H,
      currentParams: f.matches[0]?.params || {},
      nextUrl: A,
      nextParams: d[0].params,
      ...m,
      actionResult: ee,
      actionStatus: re
    },
    le = ci(d),
    he = d.map((x, P) => {
      let { route: me } = x,
        ge = null;
      if (W != null && P > W) ge = !1;
      else if (me.lazy) ge = !0;
      else if (!zf(me)) ge = !1;
      else if (v) {
        let { shouldLoad: q } = Op(me, f.loaderData, f.errors);
        ge = q;
      } else A2(f.loaderData, f.matches[P], x) && (ge = !0);
      if (ge !== null) return yf(r, u, a, y, le, x, p, l, ge);
      let Ce = !1;
      typeof se == "boolean"
        ? (Ce = se)
        : ie
          ? (Ce = !1)
          : (b ||
              H.pathname + H.search === A.pathname + A.search ||
              H.search !== A.search ||
              D2(f.matches[P], x)) &&
            (Ce = !0);
      let C = { ...ne, defaultShouldRevalidate: Ce };
      return yf(r, u, a, y, le, x, p, l, pr(x, C), C, se);
    }),
    Ue = [];
  return (
    N.forEach((x, P) => {
      if (v || !d.some((ve) => ve.route.id === x.routeId) || R.has(P)) return;
      let me = f.fetchers.get(P),
        ge = me && me.state !== "idle" && me.data === void 0,
        Ce = Tn(Y, x.path, G ?? "/", !1, Z);
      if (!Ce) {
        if (K && ge) return;
        Ue.push({
          key: P,
          routeId: x.routeId,
          path: x.path,
          matches: null,
          match: null,
          request: null,
          controller: null
        });
        return;
      }
      if (j.has(P)) return;
      let C = Pu(Ce, x.path),
        q = new AbortController(),
        te = ai(o, x.path, q.signal),
        ue = null;
      if (S.has(P)) (S.delete(P), (ue = ui(r, u, te, x.path, Ce, C, p, l)));
      else if (ge) b && (ue = ui(r, u, te, x.path, Ce, C, p, l));
      else {
        let ve;
        typeof se == "boolean" ? (ve = se) : ie ? (ve = !1) : (ve = b);
        let Ee = { ...ne, defaultShouldRevalidate: ve };
        pr(C, Ee) && (ue = ui(r, u, te, x.path, Ce, C, p, l, Ee));
      }
      ue &&
        Ue.push({
          key: P,
          routeId: x.routeId,
          path: x.path,
          matches: ue,
          match: C,
          request: te,
          controller: q
        });
    }),
    { dsMatches: he, revalidatingFetchers: Ue }
  );
}
function zf(a) {
  return a.loader != null || (a.middleware != null && a.middleware.length > 0);
}
function Op(a, l, r) {
  if (a.lazy) return { shouldLoad: !0, renderFallback: !0 };
  if (!zf(a)) return { shouldLoad: !1, renderFallback: !1 };
  let u = l != null && a.id in l,
    o = r != null && r[a.id] !== void 0;
  if (!u && o) return { shouldLoad: !1, renderFallback: !1 };
  if (typeof a.loader == "function" && a.loader.hydrate === !0)
    return { shouldLoad: !0, renderFallback: !u };
  let f = !u && !o;
  return { shouldLoad: f, renderFallback: f };
}
function A2(a, l, r) {
  let u = !l || r.route.id !== l.route.id,
    o = !a.hasOwnProperty(r.route.id);
  return u || o;
}
function D2(a, l) {
  let r = a.route.path;
  return (
    a.pathname !== l.pathname ||
    (r != null && r.endsWith("*") && a.params["*"] !== l.params["*"])
  );
}
function pr(a, l) {
  if (a.route.shouldRevalidate) {
    let r = a.route.shouldRevalidate(l);
    if (typeof r == "boolean") return r;
  }
  return l.defaultShouldRevalidate;
}
function ry(a, l, r, u, o, f) {
  let d;
  if (a) {
    let p = u[a];
    (ze(p, `No route found to patch children into: routeId = ${a}`),
      p.children || (p.children = []),
      (d = p.children));
  } else d = r.activeRoutes;
  let m = [],
    y = [];
  if (
    (l.forEach((p) => {
      let v = d.find((b) => Mp(p, b));
      v ? y.push({ existingRoute: v, newRoute: p }) : m.push(p);
    }),
    m.length > 0)
  ) {
    let p = br(m, o, [a || "_", "patch", String(d?.length || "0")], u);
    d.push(...p);
  }
  if (f && y.length > 0)
    for (let p = 0; p < y.length; p++) {
      let { existingRoute: v, newRoute: b } = y[p],
        S = v,
        [R] = br([b], o, [], {}, !0);
      Object.assign(S, {
        element: R.element ? R.element : S.element,
        errorElement: R.errorElement ? R.errorElement : S.errorElement,
        hydrateFallbackElement: R.hydrateFallbackElement
          ? R.hydrateFallbackElement
          : S.hydrateFallbackElement
      });
    }
  r.hasHMRRoutes || r.setRoutes([...r.activeRoutes]);
}
function Mp(a, l) {
  return "id" in a && "id" in l && a.id === l.id
    ? !0
    : a.index === l.index &&
        a.path === l.path &&
        a.caseSensitive === l.caseSensitive
      ? (!a.children || a.children.length === 0) &&
        (!l.children || l.children.length === 0)
        ? !0
        : (a.children?.every((r, u) => l.children?.some((o) => Mp(r, o))) ?? !1)
      : !1;
}
const uy = new WeakMap(),
  xp = ({ key: a, route: l, manifest: r, mapRouteProperties: u }) => {
    let o = r[l.id];
    if (
      (ze(o, "No route found in manifest"),
      !o.lazy || typeof o.lazy != "object")
    )
      return;
    let f = o.lazy[a];
    if (!f) return;
    let d = uy.get(o);
    d || ((d = {}), uy.set(o, d));
    let m = d[a];
    if (m) return m;
    let y = (async () => {
      let p = F1(a),
        v = o[a] !== void 0;
      if (p)
        (jt(
          !p,
          "Route property " +
            a +
            " is not a supported lazy route property. This property will be ignored."
        ),
          (d[a] = Promise.resolve()));
      else if (v)
        jt(
          !1,
          `Route "${o.id}" has a static property "${a}" defined. The lazy property will be ignored.`
        );
      else {
        let b = await f();
        b != null && (Object.assign(o, { [a]: b }), Object.assign(o, u(o)));
      }
      typeof o.lazy == "object" &&
        ((o.lazy[a] = void 0),
        Object.values(o.lazy).every((b) => b === void 0) && (o.lazy = void 0));
    })();
    return ((d[a] = y), y);
  },
  sy = new WeakMap();
function _2(a, l, r, u, o) {
  let f = r[a.id];
  if ((ze(f, "No route found in manifest"), !a.lazy))
    return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 };
  if (typeof a.lazy == "function") {
    let v = sy.get(f);
    if (v) return { lazyRoutePromise: v, lazyHandlerPromise: v };
    let b = (async () => {
      ze(typeof a.lazy == "function", "No lazy route function found");
      let S = await a.lazy(),
        R = {};
      for (let N in S) {
        let j = S[N];
        if (j === void 0) continue;
        let Y = Z1(N),
          G = f[N] !== void 0;
        Y
          ? jt(
              !Y,
              "Route property " +
                N +
                " is not a supported property to be returned from a lazy route function. This property will be ignored."
            )
          : G
            ? jt(
                !G,
                `Route "${f.id}" has a static property "${N}" defined but its lazy function is also returning a value for this property. The lazy route property "${N}" will be ignored.`
              )
            : (R[N] = j);
      }
      (Object.assign(f, R), Object.assign(f, { ...u(f), lazy: void 0 }));
    })();
    return (
      sy.set(f, b),
      b.catch(() => {}),
      { lazyRoutePromise: b, lazyHandlerPromise: b }
    );
  }
  let d = Object.keys(a.lazy),
    m = [],
    y;
  for (let v of d) {
    if (o && o.includes(v)) continue;
    let b = xp({ key: v, route: a, manifest: r, mapRouteProperties: u });
    b && (m.push(b), v === l && (y = b));
  }
  let p = m.length > 0 ? Promise.all(m).then(() => {}) : void 0;
  return (
    p?.catch(() => {}),
    y?.catch(() => {}),
    { lazyRoutePromise: p, lazyHandlerPromise: y }
  );
}
async function oy(a) {
  let l = a.matches.filter((u) => u.shouldLoad),
    r = {};
  return (
    (await Promise.all(l.map((u) => u.resolve()))).forEach((u, o) => {
      r[l[o].route.id] = u;
    }),
    r
  );
}
async function O2(a) {
  return a.matches.some((l) => l.route.middleware) ? zp(a, () => oy(a)) : oy(a);
}
function zp(a, l) {
  return M2(
    a,
    l,
    (u) => {
      if (F2(u)) throw u;
      return u;
    },
    V2,
    r
  );
  async function r(u, o, f) {
    if (f) return Object.assign(f.value, { [o]: { type: "error", result: u } });
    {
      let { matches: d } = a,
        m = Math.min(
          Math.max(
            d.findIndex((p) => p.route.id === o),
            0
          ),
          Math.max(
            d.findIndex((p) => p.shouldCallHandler()),
            0
          )
        ),
        y = d[m].route.id;
      for (let p of d.slice(0, m + 1))
        try {
          await p._lazyPromises?.route;
        } catch {
          y = p.route.id;
          break;
        }
      return { [Qa(d, y).route.id]: { type: "error", result: u } };
    }
  }
}
async function M2(a, l, r, u, o) {
  let { matches: f, ...d } = a;
  return await Up(
    d,
    f.flatMap((m) =>
      m.route.middleware ? m.route.middleware.map((y) => [m.route.id, y]) : []
    ),
    l,
    r,
    u,
    o
  );
}
async function Up(a, l, r, u, o, f, d = 0) {
  let { request: m } = a;
  if (m.signal.aborted)
    throw m.signal.reason ?? new Error(`Request aborted: ${m.method} ${m.url}`);
  let y = l[d];
  if (!y) return await r();
  let [p, v] = y,
    b,
    S = async () => {
      if (b) throw new Error("You may only call `next()` once per middleware");
      try {
        return ((b = { value: await Up(a, l, r, u, o, f, d + 1) }), b.value);
      } catch (R) {
        return ((b = { value: await f(R, p, b) }), b.value);
      }
    };
  try {
    let R = await v(a, S),
      N = R != null ? u(R) : void 0;
    return o(N)
      ? N
      : b
        ? (N ?? b.value)
        : ((b = { value: await S() }), b.value);
  } catch (R) {
    return await f(R, p, b);
  }
}
function Lp(a, l, r, u, o) {
  let f = xp({
      key: "middleware",
      route: u.route,
      manifest: l,
      mapRouteProperties: a
    }),
    d = _2(u.route, Mt(r.method) ? "action" : "loader", l, a, o);
  return {
    middleware: f,
    route: d.lazyRoutePromise,
    handler: d.lazyHandlerPromise
  };
}
function yf(a, l, r, u, o, f, d, m, y, p = null, v) {
  let b = !1,
    S = Lp(a, l, r, f, d);
  return {
    ...f,
    _lazyPromises: S,
    shouldLoad: y,
    shouldRevalidateArgs: p,
    shouldCallHandler(R) {
      return (
        (b = !0),
        p
          ? typeof v == "boolean"
            ? pr(f, { ...p, defaultShouldRevalidate: v })
            : typeof R == "boolean"
              ? pr(f, { ...p, defaultShouldRevalidate: R })
              : pr(f, p)
          : y
      );
    },
    resolve(R) {
      let { lazy: N, loader: j, middleware: Y } = f.route,
        G = b || y || (R && !Mt(r.method) && (N || j)),
        K = Y && Y.length > 0 && !j && !N;
      return G && (Mt(r.method) || !K)
        ? z2({
            request: r,
            path: u,
            pattern: o,
            match: f,
            lazyHandlerPromise: S?.handler,
            lazyRoutePromise: S?.route,
            handlerOverride: R,
            scopedContext: m
          })
        : Promise.resolve({ type: "data", result: void 0 });
    }
  };
}
function ui(a, l, r, u, o, f, d, m, y = null) {
  return o.map((p) =>
    p.route.id !== f.route.id
      ? {
          ...p,
          shouldLoad: !1,
          shouldRevalidateArgs: y,
          shouldCallHandler: () => !1,
          _lazyPromises: Lp(a, l, r, p, d),
          resolve: () => Promise.resolve({ type: "data", result: void 0 })
        }
      : yf(a, l, r, u, ci(o), p, d, m, !0, y)
  );
}
async function x2(a, l, r, u, o, f, d) {
  u.some((v) => v._lazyPromises?.middleware) &&
    (await Promise.all(u.map((v) => v._lazyPromises?.middleware)));
  let m = {
      request: l,
      url: xf(l, r),
      pattern: ci(u),
      params: u[0].params,
      context: f,
      matches: u
    },
    p = await a({
      ...m,
      fetcherKey: o,
      runClientMiddleware: (v) => {
        let b = m;
        return zp(b, () =>
          v({
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
      u.flatMap((v) => [v._lazyPromises?.handler, v._lazyPromises?.route])
    );
  } catch {}
  return p;
}
async function z2({
  request: a,
  path: l,
  pattern: r,
  match: u,
  lazyHandlerPromise: o,
  lazyRoutePromise: f,
  handlerOverride: d,
  scopedContext: m
}) {
  let y,
    p,
    v = Mt(a.method),
    b = v ? "action" : "loader",
    S = (R) => {
      let N,
        j = new Promise((K, Z) => (N = Z));
      ((p = () => N()), a.signal.addEventListener("abort", p));
      let Y = (K) =>
          typeof R != "function"
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${b}" [routeId: ${u.route.id}]`
                )
              )
            : R(
                {
                  request: a,
                  url: xf(a, l),
                  pattern: r,
                  params: u.params,
                  context: m
                },
                ...(K !== void 0 ? [K] : [])
              ),
        G = (async () => {
          try {
            return { type: "data", result: await (d ? d((K) => Y(K)) : Y()) };
          } catch (K) {
            return { type: "error", result: K };
          }
        })();
      return Promise.race([G, j]);
    };
  try {
    let R = v ? u.route.action : u.route.loader;
    if (o || f)
      if (R) {
        let N,
          [j] = await Promise.all([
            S(R).catch((Y) => {
              N = Y;
            }),
            o,
            f
          ]);
        if (N !== void 0) throw N;
        y = j;
      } else {
        await o;
        let N = v ? u.route.action : u.route.loader;
        if (N) [y] = await Promise.all([S(N), f]);
        else if (b === "action") {
          let j = new URL(a.url),
            Y = j.pathname + j.search;
          throw dn(405, { method: a.method, pathname: Y, routeId: u.route.id });
        } else return { type: "data", result: void 0 };
      }
    else if (R) y = await S(R);
    else {
      let N = new URL(a.url);
      throw dn(404, { pathname: N.pathname + N.search });
    }
  } catch (R) {
    return { type: "error", result: R };
  } finally {
    p && a.signal.removeEventListener("abort", p);
  }
  return y;
}
async function U2(a) {
  let l = a.headers.get("Content-Type");
  return l && /\bapplication\/json\b/.test(l)
    ? a.body == null
      ? null
      : a.json()
    : a.text();
}
async function L2(a) {
  let { result: l, type: r } = a;
  if (Uf(l)) {
    let u;
    try {
      u = await U2(l);
    } catch (o) {
      return { type: "error", error: o };
    }
    return r === "error"
      ? {
          type: "error",
          error: new Rr(l.status, l.statusText, u),
          statusCode: l.status,
          headers: l.headers
        }
      : { type: "data", data: u, statusCode: l.status, headers: l.headers };
  }
  return r === "error"
    ? yy(l)
      ? l.data instanceof Error
        ? {
            type: "error",
            error: l.data,
            statusCode: l.init?.status,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
        : {
            type: "error",
            error: q2(l),
            statusCode: Er(l) ? l.status : void 0,
            headers: l.init?.headers ? new Headers(l.init.headers) : void 0
          }
      : { type: "error", error: l, statusCode: Er(l) ? l.status : void 0 }
    : yy(l)
      ? {
          type: "data",
          data: l.data,
          statusCode: l.init?.status,
          headers: l.init?.headers ? new Headers(l.init.headers) : void 0
        }
      : { type: "data", data: l };
}
function j2(a, l, r, u, o) {
  let f = a.headers.get("Location");
  if (
    (ze(
      f,
      "Redirects returned/thrown from loaders/actions must have a Location header"
    ),
    !_f(f))
  ) {
    let d = u.slice(0, u.findIndex((m) => m.route.id === r) + 1);
    ((f = mf(new URL(l.url), d, o, f)), a.headers.set("Location", f));
  }
  return a;
}
const B2 = [
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
function pf(a) {
  try {
    return B2.includes(new URL(a).protocol);
  } catch {
    return !1;
  }
}
function cy(a, l, r, u) {
  if (_f(a)) {
    let o = a,
      f = Df.test(o) ? new URL(hp(o, l.protocol)) : new URL(o);
    if (pf(f.toString())) throw new Error("Invalid redirect location");
    let d = Rn(f.pathname, r) != null;
    if (f.origin === l.origin && d) return Mf(f.pathname) + f.search + f.hash;
  }
  try {
    if (pf(u.createURL(a).toString()))
      throw new Error("Invalid redirect location");
  } catch {}
  return a;
}
function ai(a, l, r, u) {
  let o = a.createURL(jp(l)).toString(),
    f = { signal: r };
  if (u && Mt(u.formMethod)) {
    let { formMethod: d, formEncType: m } = u;
    ((f.method = d.toUpperCase()),
      m === "application/json"
        ? ((f.headers = new Headers({ "Content-Type": m })),
          (f.body = JSON.stringify(u.json)))
        : m === "text/plain"
          ? (f.body = u.text)
          : m === "application/x-www-form-urlencoded" && u.formData
            ? (f.body = gf(u.formData))
            : (f.body = u.formData));
  }
  return new Request(o, f);
}
function gf(a) {
  let l = new URLSearchParams();
  for (let [r, u] of a.entries())
    l.append(r, typeof u == "string" ? u : u.name);
  return l;
}
function fy(a) {
  let l = new FormData();
  for (let [r, u] of a.entries()) l.append(r, u);
  return l;
}
function k2(a, l, r, u = !1, o = !1) {
  let f = {},
    d = null,
    m,
    y = !1,
    p = {},
    v = r && Pt(r[1]) ? r[1].error : void 0;
  return (
    a.forEach((b) => {
      if (!(b.route.id in l)) return;
      let S = b.route.id,
        R = l[S];
      if (
        (ze(!dl(R), "Cannot handle redirect results in processLoaderData"),
        Pt(R))
      ) {
        let N = R.error;
        if ((v !== void 0 && ((N = v), (v = void 0)), (d = d || {}), o))
          d[S] = N;
        else {
          let j = Qa(a, S);
          d[j.route.id] == null && (d[j.route.id] = N);
        }
        (u || (f[S] = _p),
          y || ((y = !0), (m = Er(R.error) ? R.error.status : 500)),
          R.headers && (p[S] = R.headers));
      } else
        ((f[S] = R.data),
          R.statusCode && R.statusCode !== 200 && !y && (m = R.statusCode),
          R.headers && (p[S] = R.headers));
    }),
    v !== void 0 && r && ((d = { [r[0]]: v }), r[2] && (f[r[2]] = void 0)),
    { loaderData: f, errors: d, statusCode: m || 200, loaderHeaders: p }
  );
}
function dy(a, l, r, u, o, f, d) {
  let { loaderData: m, errors: y } = k2(l, r, u);
  return (
    o
      .filter((p) => !p.matches || p.matches.some((v) => v.shouldLoad))
      .forEach((p) => {
        let { key: v, match: b, controller: S } = p;
        if (S && S.signal.aborted) return;
        let R = f[v];
        if ((ze(R, "Did not find corresponding fetcher result"), Pt(R))) {
          let N = Qa(a.matches, b?.route.id);
          ((y && y[N.route.id]) || (y = { ...y, [N.route.id]: R.error }),
            d.delete(v));
        } else if (dl(R)) ze(!1, "Unhandled fetcher revalidation redirect");
        else {
          let N = Mn(R.data);
          d.set(v, N);
        }
      }),
    { loaderData: m, errors: y }
  );
}
function hy(a, l, r, u) {
  let o = Object.entries(l)
    .filter(([, f]) => f !== _p)
    .reduce((f, [d, m]) => ((f[d] = m), f), {});
  for (let f of r) {
    let d = f.route.id;
    if (
      (!l.hasOwnProperty(d) &&
        a.hasOwnProperty(d) &&
        f.route.loader &&
        (o[d] = a[d]),
      u && u.hasOwnProperty(d))
    )
      break;
  }
  return o;
}
function my(a) {
  return a
    ? Pt(a[1])
      ? { actionData: {} }
      : { actionData: { [a[0]]: a[1].data } }
    : {};
}
function Qa(a, l) {
  return (
    (l ? a.slice(0, a.findIndex((r) => r.route.id === l) + 1) : [...a])
      .reverse()
      .find(
        (r) => r.route.ErrorBoundary != null || r.route.errorElement != null
      ) || a[0]
  );
}
function Xu(a) {
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
  { pathname: l, routeId: r, method: u, type: o, message: f } = {}
) {
  let d = "Unknown Server Error",
    m = "Unknown @remix-run/router error";
  return (
    a === 400
      ? ((d = "Bad Request"),
        u && l && r
          ? (m = `You made a ${u} request to "${l}" but did not provide a \`loader\` for route "${r}", so there is no way to handle the request.`)
          : o === "invalid-body" && (m = "Unable to encode submission body"))
      : a === 403
        ? ((d = "Forbidden"), (m = `Route "${r}" does not match URL "${l}"`))
        : a === 404
          ? ((d = "Not Found"), (m = `No route matches URL "${l}"`))
          : a === 405 &&
            ((d = "Method Not Allowed"),
            u && l && r
              ? (m = `You made a ${u.toUpperCase()} request to "${l}" but did not provide an \`action\` for route "${r}", so there is no way to handle the request.`)
              : u && (m = `Invalid request method "${u.toUpperCase()}"`)),
    new Rr(a || 500, d, new Error(m), !0)
  );
}
function Zu(a) {
  let l = Object.entries(a);
  for (let r = l.length - 1; r >= 0; r--) {
    let [u, o] = l[r];
    if (dl(o)) return { key: u, result: o };
  }
}
function jp(a) {
  return Ln({ ...(typeof a == "string" ? jn(a) : a), hash: "" });
}
function H2(a, l) {
  return a.pathname !== l.pathname || a.search !== l.search
    ? !1
    : a.hash === ""
      ? l.hash !== ""
      : a.hash === l.hash
        ? !0
        : l.hash !== "";
}
function q2(a) {
  return new Rr(
    a.init?.status ?? 500,
    a.init?.statusText ?? "Internal Server Error",
    a.data
  );
}
function V2(a) {
  return (
    a != null &&
    typeof a == "object" &&
    Object.entries(a).every(([l, r]) => typeof l == "string" && Y2(r))
  );
}
function Y2(a) {
  return (
    a != null &&
    typeof a == "object" &&
    "type" in a &&
    "result" in a &&
    (a.type === "data" || a.type === "error")
  );
}
function G2(a) {
  return Uf(a.result) && Ap.has(a.result.status);
}
function Pt(a) {
  return a.type === "error";
}
function dl(a) {
  return (a && a.type) === "redirect";
}
function yy(a) {
  return (
    typeof a == "object" &&
    a != null &&
    "type" in a &&
    "data" in a &&
    "init" in a &&
    a.type === "DataWithResponseInit"
  );
}
function Uf(a) {
  return (
    a != null &&
    typeof a.status == "number" &&
    typeof a.statusText == "string" &&
    typeof a.headers == "object" &&
    typeof a.body < "u"
  );
}
function Q2(a) {
  return Ap.has(a);
}
function F2(a) {
  return Uf(a) && Q2(a.status) && a.headers.has("Location");
}
function X2(a) {
  return S2.has(a.toUpperCase());
}
function Mt(a) {
  return b2.has(a.toUpperCase());
}
function Lf(a) {
  return new URLSearchParams(a).getAll("index").some((l) => l === "");
}
function Pu(a, l) {
  let r = typeof l == "string" ? jn(l).search : l.search;
  if (a[a.length - 1].route.index && Lf(r || "")) return a[a.length - 1];
  let u = Sp(a);
  return u[u.length - 1];
}
function py(a, l, r) {
  return {
    url: xf(a.createURL(l), l),
    pattern: r ? ci(r) : "",
    params: r?.[0]?.params ? { ...r[0].params } : {}
  };
}
function gy(a) {
  let {
    formMethod: l,
    formAction: r,
    formEncType: u,
    text: o,
    formData: f,
    json: d
  } = a;
  if (!(!l || !r || !u)) {
    if (o != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: void 0,
        json: void 0,
        text: o
      };
    if (f != null)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: f,
        json: void 0,
        text: void 0
      };
    if (d !== void 0)
      return {
        formMethod: l,
        formAction: r,
        formEncType: u,
        formData: void 0,
        json: d,
        text: void 0
      };
  }
}
function Lc(a, l, r, u) {
  return u
    ? {
        state: "loading",
        location: a,
        matches: l,
        historyAction: r,
        formMethod: u.formMethod,
        formAction: u.formAction,
        formEncType: u.formEncType,
        formData: u.formData,
        json: u.json,
        text: u.text
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
function Z2(a, l, r, u) {
  return {
    state: "submitting",
    location: a,
    matches: l,
    historyAction: r,
    formMethod: u.formMethod,
    formAction: u.formAction,
    formEncType: u.formEncType,
    formData: u.formData,
    json: u.json,
    text: u.text
  };
}
function sr(a, l) {
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
function I2(a, l) {
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
function Mn(a) {
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
function K2(a, l) {
  try {
    let r = a.sessionStorage.getItem(Dp);
    if (r) {
      let u = JSON.parse(r);
      for (let [o, f] of Object.entries(u || {}))
        f && Array.isArray(f) && l.set(o, new Set(f || []));
    }
  } catch {}
}
function J2(a, l) {
  if (l.size > 0) {
    let r = {};
    for (let [u, o] of l) r[u] = [...o];
    try {
      a.sessionStorage.setItem(Dp, JSON.stringify(r));
    } catch (u) {
      jt(
        !1,
        `Failed to save applied view transitions in sessionStorage (${u}).`
      );
    }
  }
}
function vy() {
  let a,
    l,
    r = new Promise((u, o) => {
      ((a = async (f) => {
        u(f);
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
const yl = U.createContext(null);
yl.displayName = "DataRouter";
const Cr = U.createContext(null);
Cr.displayName = "DataRouterState";
const Bp = U.createContext(!1);
function kp() {
  return U.useContext(Bp);
}
const jf = U.createContext({ isTransitioning: !1 });
jf.displayName = "ViewTransition";
const Hp = U.createContext(new Map());
Hp.displayName = "Fetchers";
const $2 = U.createContext(null);
$2.displayName = "Await";
const Cn = U.createContext(null);
Cn.displayName = "Navigation";
const ss = U.createContext(null);
ss.displayName = "Location";
const da = U.createContext({ outlet: null, matches: [], isDataRoute: !1 });
da.displayName = "Route";
const Bf = U.createContext(null);
Bf.displayName = "RouteError";
const qp = "REACT_ROUTER_ERROR",
  P2 = "REDIRECT",
  W2 = "ROUTE_ERROR_RESPONSE";
function eb(a) {
  if (a.startsWith(`${qp}:${P2}:{`))
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
function tb(a) {
  if (a.startsWith(`${qp}:${W2}:{`))
    try {
      let l = JSON.parse(a.slice(40));
      if (
        typeof l == "object" &&
        l &&
        typeof l.status == "number" &&
        typeof l.statusText == "string"
      )
        return new Rr(l.status, l.statusText, l.data);
    } catch {}
}
function nb(a, { relative: l } = {}) {
  ze(
    Nr(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: u } = U.useContext(Cn),
    { hash: o, pathname: f, search: d } = wr(a, { relative: l }),
    m = f;
  return (
    r !== "/" && (m = f === "/" ? r : hn([r, f])),
    u.createHref({ pathname: m, search: d, hash: o })
  );
}
function Nr() {
  return U.useContext(ss) != null;
}
function ha() {
  return (
    ze(
      Nr(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    U.useContext(ss).location
  );
}
const Vp =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function ab() {
  let { isDataRoute: a } = U.useContext(da);
  return a ? gb() : lb();
}
function lb() {
  ze(
    Nr(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let a = U.useContext(yl),
    { basename: l, navigator: r } = U.useContext(Cn),
    { matches: u } = U.useContext(da),
    { pathname: o } = ha(),
    f = JSON.stringify(Of(u)),
    d = U.useRef(!1);
  return (
    U.useLayoutEffect(() => {
      d.current = !0;
    }),
    U.useCallback(
      (m, y = {}) => {
        if ((jt(d.current, Vp), !d.current)) return;
        if (typeof m == "number") {
          r.go(m);
          return;
        }
        let p = us(m, JSON.parse(f), o, y.relative === "path");
        (a == null &&
          l !== "/" &&
          (p.pathname = p.pathname === "/" ? l : hn([l, p.pathname])),
          (y.replace ? r.replace : r.push)(p, y.state, y));
      },
      [l, r, f, o, a]
    )
  );
}
U.createContext(null);
function wr(a, { relative: l } = {}) {
  let { matches: r } = U.useContext(da),
    { pathname: u } = ha(),
    o = JSON.stringify(Of(r));
  return U.useMemo(() => us(a, JSON.parse(o), u, l === "path"), [a, o, u, l]);
}
function ib(a, l, r) {
  ze(
    Nr(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: u } = U.useContext(Cn),
    { matches: o } = U.useContext(da),
    f = o[o.length - 1],
    d = f ? f.params : {};
  f && f.pathname;
  let m = f ? f.pathnameBase : "/";
  f && f.route;
  let y = ha(),
    p;
  p = y;
  let v = p.pathname || "/",
    b = v;
  if (m !== "/") {
    let N = m.replace(/^\//, "").split("/");
    b = "/" + v.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let S =
    r && r.state.matches.length
      ? r.state.matches.map((N) =>
          Object.assign(N, { route: r.manifest[N.route.id] || N.route })
        )
      : pp(a, { pathname: b });
  return fb(
    S &&
      S.map((N) =>
        Object.assign({}, N, {
          params: Object.assign({}, d, N.params),
          pathname: hn([
            m,
            u.encodeLocation
              ? u.encodeLocation(
                  N.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23")
                ).pathname
              : N.pathname
          ]),
          pathnameBase:
            N.pathnameBase === "/"
              ? m
              : hn([
                  m,
                  u.encodeLocation
                    ? u.encodeLocation(
                        N.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : N.pathnameBase
                ])
        })
      ),
    o,
    r
  );
}
function rb() {
  let a = pb(),
    l = Er(a)
      ? `${a.status} ${a.statusText}`
      : a instanceof Error
        ? a.message
        : JSON.stringify(a),
    r = a instanceof Error ? a.stack : null;
  return U.createElement(
    U.Fragment,
    null,
    U.createElement("h2", null, "Unexpected Application Error!"),
    U.createElement("h3", { style: { fontStyle: "italic" } }, l),
    r
      ? U.createElement(
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
const ub = U.createElement(rb, null);
var sb = class extends U.Component {
  constructor(a) {
    (super(a),
      (this.state = {
        location: a.location,
        revalidation: a.revalidation,
        error: a.error
      }));
  }
  static contextType = Bp;
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
      const r = tb(a.digest);
      r && (a = r);
    }
    let l =
      a !== void 0
        ? U.createElement(
            da.Provider,
            { value: this.props.routeContext },
            U.createElement(Bf.Provider, {
              value: a,
              children: this.props.component
            })
          )
        : this.props.children;
    return this.context ? U.createElement(ob, { error: a }, l) : l;
  }
};
const jc = new WeakMap();
function ob({ children: a, error: l }) {
  let { basename: r } = U.useContext(Cn);
  if (
    typeof l == "object" &&
    l &&
    "digest" in l &&
    typeof l.digest == "string"
  ) {
    let u = eb(l.digest);
    if (u) {
      let o = jc.get(l);
      if (o) throw o;
      let f = Cp(u.location, r),
        d = f.absoluteURL || f.to;
      if (pf(d)) throw new Error("Invalid redirect location");
      if (Rp && !jc.get(l))
        if (f.isExternal || u.reloadDocument) window.location.href = d;
        else {
          const m = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(f.to, {
              replace: u.replace
            })
          );
          throw (jc.set(l, m), m);
        }
      return U.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${d}`
      });
    }
  }
  return a;
}
function cb({ routeContext: a, match: l, children: r }) {
  let u = U.useContext(yl);
  return (
    u &&
      u.static &&
      u.staticContext &&
      (l.route.errorElement || l.route.ErrorBoundary) &&
      (u.staticContext._deepestRenderedBoundaryId = l.route.id),
    U.createElement(da.Provider, { value: a }, r)
  );
}
function fb(a, l = [], r) {
  let u = r?.state;
  if (a == null) {
    if (!u) return null;
    if (u.errors) a = u.matches;
    else if (l.length === 0 && !u.initialized && u.matches.length > 0)
      a = u.matches;
    else return null;
  }
  let o = a,
    f = u?.errors;
  if (f != null) {
    let v = o.findIndex((b) => b.route.id && f?.[b.route.id] !== void 0);
    (ze(
      v >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(f).join(",")}`
    ),
      (o = o.slice(0, Math.min(o.length, v + 1))));
  }
  let d = !1,
    m = -1;
  if (r && u) {
    d = u.renderFallback;
    for (let v = 0; v < o.length; v++) {
      let b = o[v];
      if (
        ((b.route.HydrateFallback || b.route.hydrateFallbackElement) && (m = v),
        b.route.id)
      ) {
        let { loaderData: S, errors: R } = u,
          N =
            b.route.loader &&
            !S.hasOwnProperty(b.route.id) &&
            (!R || R[b.route.id] === void 0);
        if (b.route.lazy || N) {
          (r.isStatic && (d = !0),
            m >= 0 ? (o = o.slice(0, m + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  }
  let y = r?.onError,
    p =
      u && y
        ? (v, b) => {
            y(v, {
              location: u.location,
              params: u.matches?.[0]?.params ?? {},
              pattern: ci(u.matches),
              errorInfo: b
            });
          }
        : void 0;
  return o.reduceRight((v, b, S) => {
    let R,
      N = !1,
      j = null,
      Y = null;
    u &&
      ((R = f && b.route.id ? f[b.route.id] : void 0),
      (j = b.route.errorElement || ub),
      d &&
        (m < 0 && S === 0
          ? (vb(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (N = !0),
            (Y = null))
          : m === S &&
            ((N = !0), (Y = b.route.hydrateFallbackElement || null))));
    let G = l.concat(o.slice(0, S + 1)),
      K = () => {
        let Z;
        return (
          R
            ? (Z = j)
            : N
              ? (Z = Y)
              : b.route.Component
                ? (Z = U.createElement(b.route.Component, null))
                : b.route.element
                  ? (Z = b.route.element)
                  : (Z = v),
          U.createElement(cb, {
            match: b,
            routeContext: { outlet: v, matches: G, isDataRoute: u != null },
            children: Z
          })
        );
      };
    return u && (b.route.ErrorBoundary || b.route.errorElement || S === 0)
      ? U.createElement(sb, {
          location: u.location,
          revalidation: u.revalidation,
          component: j,
          error: R,
          children: K(),
          routeContext: { outlet: null, matches: G, isDataRoute: !0 },
          onError: p
        })
      : K();
  }, null);
}
function kf(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function db(a) {
  let l = U.useContext(yl);
  return (ze(l, kf(a)), l);
}
function hb(a) {
  let l = U.useContext(Cr);
  return (ze(l, kf(a)), l);
}
function mb(a) {
  let l = U.useContext(da);
  return (ze(l, kf(a)), l);
}
function Hf(a) {
  let l = mb(a),
    r = l.matches[l.matches.length - 1];
  return (
    ze(
      r.route.id,
      `${a} can only be used on routes that contain a unique "id"`
    ),
    r.route.id
  );
}
function yb() {
  return Hf("useRouteId");
}
function pb() {
  let a = U.useContext(Bf),
    l = hb("useRouteError"),
    r = Hf("useRouteError");
  return a !== void 0 ? a : l.errors?.[r];
}
function gb() {
  let { router: a } = db("useNavigate"),
    l = Hf("useNavigate"),
    r = U.useRef(!1);
  return (
    U.useLayoutEffect(() => {
      r.current = !0;
    }),
    U.useCallback(
      async (u, o = {}) => {
        (jt(r.current, Vp),
          r.current &&
            (typeof u == "number"
              ? await a.navigate(u)
              : await a.navigate(u, { fromRouteId: l, ...o })));
      },
      [a, l]
    )
  );
}
const by = {};
function vb(a, l, r) {
  by[a] || ((by[a] = !0), jt(!1, r));
}
const Ey = {};
function Sy(a, l) {
  !a && !Ey[l] && ((Ey[l] = !0), console.warn(l));
}
const bb = ["HydrateFallback", "hydrateFallbackElement"];
var Eb = class {
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
function Sb({ router: a, flushSync: l, onError: r, useTransitions: u }) {
  u = kp() || u;
  let [o, f] = U.useState(a.state),
    [d, m] = U.useOptimistic(o),
    [y, p] = U.useState(),
    [v, b] = U.useState({ isTransitioning: !1 }),
    [S, R] = U.useState(),
    [N, j] = U.useState(),
    [Y, G] = U.useState(),
    K = U.useRef(new Map()),
    Z = U.useCallback(
      (
        H,
        {
          deletedFetchers: A,
          newErrors: W,
          flushSync: re,
          viewTransitionOpts: ie
        }
      ) => {
        (W &&
          r &&
          Object.values(W).forEach((le) =>
            r(le, {
              location: H.location,
              params: H.matches[0]?.params ?? {},
              pattern: ci(H.matches)
            })
          ),
          H.fetchers.forEach((le, he) => {
            le.data !== void 0 && K.current.set(he, le.data);
          }),
          A.forEach((le) => K.current.delete(le)),
          Sy(
            re === !1 || l != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.'
          ));
        let ne =
          a.window != null &&
          a.window.document != null &&
          typeof a.window.document.startViewTransition == "function";
        if (
          (Sy(
            ie == null || ne,
            "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."
          ),
          !ie || !ne)
        ) {
          l && re
            ? l(() => f(H))
            : u === !1
              ? f(H)
              : U.startTransition(() => {
                  (u === !0 && m((le) => Ty(le, H)), f(H));
                });
          return;
        }
        if (l && re) {
          l(() => {
            (N && (S?.resolve(), N.skipTransition()),
              b({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: ie.currentLocation,
                nextLocation: ie.nextLocation
              }));
          });
          let le = a.window.document.startViewTransition(() => {
            l(() => f(H));
          });
          (le.finished.finally(() => {
            l(() => {
              (R(void 0), j(void 0), p(void 0), b({ isTransitioning: !1 }));
            });
          }),
            l(() => j(le)));
          return;
        }
        N
          ? (S?.resolve(),
            N.skipTransition(),
            G({
              state: H,
              currentLocation: ie.currentLocation,
              nextLocation: ie.nextLocation
            }))
          : (p(H),
            b({
              isTransitioning: !0,
              flushSync: !1,
              currentLocation: ie.currentLocation,
              nextLocation: ie.nextLocation
            }));
      },
      [a.window, l, N, S, u, m, r]
    );
  (U.useLayoutEffect(() => a.subscribe(Z), [a, Z]),
    U.useEffect(() => {
      v.isTransitioning && !v.flushSync && R(new Eb());
    }, [v]),
    U.useEffect(() => {
      if (S && y && a.window) {
        let H = y,
          A = S.promise,
          W = a.window.document.startViewTransition(async () => {
            (u === !1
              ? f(H)
              : U.startTransition(() => {
                  (u === !0 && m((re) => Ty(re, H)), f(H));
                }),
              await A);
          });
        (W.finished.finally(() => {
          (R(void 0), j(void 0), p(void 0), b({ isTransitioning: !1 }));
        }),
          j(W));
      }
    }, [y, S, a.window, u, m]),
    U.useEffect(() => {
      S && y && d.location.key === y.location.key && S.resolve();
    }, [S, N, d.location, y]),
    U.useEffect(() => {
      !v.isTransitioning &&
        Y &&
        (p(Y.state),
        b({
          isTransitioning: !0,
          flushSync: !1,
          currentLocation: Y.currentLocation,
          nextLocation: Y.nextLocation
        }),
        G(void 0));
    }, [v.isTransitioning, Y]));
  let $ = U.useMemo(
      () => ({
        createHref: a.createHref,
        encodeLocation: a.encodeLocation,
        go: (H) => a.navigate(H),
        push: (H, A, W) =>
          a.navigate(H, {
            state: A,
            preventScrollReset: W?.preventScrollReset
          }),
        replace: (H, A, W) =>
          a.navigate(H, {
            replace: !0,
            state: A,
            preventScrollReset: W?.preventScrollReset
          })
      }),
      [a]
    ),
    se = a.basename || "/",
    ee = U.useMemo(
      () => ({ router: a, navigator: $, static: !1, basename: se, onError: r }),
      [a, $, se, r]
    );
  return U.createElement(
    U.Fragment,
    null,
    U.createElement(
      yl.Provider,
      { value: ee },
      U.createElement(
        Cr.Provider,
        { value: d },
        U.createElement(
          Hp.Provider,
          { value: K.current },
          U.createElement(
            jf.Provider,
            { value: v },
            U.createElement(
              Cb,
              {
                basename: se,
                location: d.location,
                navigationType: d.historyAction,
                navigator: $,
                useTransitions: u
              },
              U.createElement(Tb, {
                routes: a.routes,
                manifest: a.manifest,
                future: a.future,
                state: d,
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
function Ty(a, l) {
  return {
    ...a,
    navigation: l.navigation.state !== "idle" ? l.navigation : a.navigation,
    revalidation: l.revalidation !== "idle" ? l.revalidation : a.revalidation,
    actionData:
      l.navigation.state !== "submitting" ? l.actionData : a.actionData,
    fetchers: l.fetchers
  };
}
const Tb = U.memo(Rb);
function Rb({
  routes: a,
  manifest: l,
  future: r,
  state: u,
  isStatic: o,
  onError: f
}) {
  return ib(a, void 0, { manifest: l, state: u, isStatic: o, onError: f });
}
function Cb({
  basename: a = "/",
  children: l = null,
  location: r,
  navigationType: u = "POP",
  navigator: o,
  static: f = !1,
  useTransitions: d
}) {
  ze(
    !Nr(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = a.replace(/^\/*/, "/"),
    y = U.useMemo(
      () => ({
        basename: m,
        navigator: o,
        static: f,
        useTransitions: d,
        future: {}
      }),
      [m, o, f, d]
    );
  typeof r == "string" && (r = jn(r));
  let {
      pathname: p = "/",
      search: v = "",
      hash: b = "",
      state: S = null,
      key: R = "default",
      mask: N
    } = r,
    j = U.useMemo(() => {
      let Y = Rn(p, m);
      return Y == null
        ? null
        : {
            location: {
              pathname: Y,
              search: v,
              hash: b,
              state: S,
              key: R,
              mask: N
            },
            navigationType: u
          };
    }, [m, p, v, b, S, R, u, N]);
  return (
    jt(
      j != null,
      `<Router basename="${m}"> is not able to match the URL "${p}${v}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    j == null
      ? null
      : U.createElement(
          Cn.Provider,
          { value: y },
          U.createElement(ss.Provider, { children: l, value: j })
        )
  );
}
const Wu = "application/x-www-form-urlencoded";
function os(a) {
  return typeof HTMLElement < "u" && a instanceof HTMLElement;
}
function Nb(a) {
  return os(a) && a.tagName.toLowerCase() === "button";
}
function wb(a) {
  return os(a) && a.tagName.toLowerCase() === "form";
}
function Ab(a) {
  return os(a) && a.tagName.toLowerCase() === "input";
}
function Db(a) {
  return !!(a.metaKey || a.altKey || a.ctrlKey || a.shiftKey);
}
function _b(a, l) {
  return a.button === 0 && (!l || l === "_self") && !Db(a);
}
let Iu = null;
function Ob() {
  if (Iu === null)
    try {
      (new FormData(document.createElement("form"), 0), (Iu = !1));
    } catch {
      Iu = !0;
    }
  return Iu;
}
const Mb = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function Bc(a) {
  return a != null && !Mb.has(a)
    ? (jt(
        !1,
        `"${a}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Wu}"`
      ),
      null)
    : a;
}
function xb(a, l) {
  let r, u, o, f, d;
  if (wb(a)) {
    let m = a.getAttribute("action");
    ((u = m ? Rn(m, l) : null),
      (r = a.getAttribute("method") || "get"),
      (o = Bc(a.getAttribute("enctype")) || Wu),
      (f = new FormData(a)));
  } else if (Nb(a) || (Ab(a) && (a.type === "submit" || a.type === "image"))) {
    let m = a.form;
    if (m == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let y = a.getAttribute("formaction") || m.getAttribute("action");
    if (
      ((u = y ? Rn(y, l) : null),
      (r = a.getAttribute("formmethod") || m.getAttribute("method") || "get"),
      (o =
        Bc(a.getAttribute("formenctype")) ||
        Bc(m.getAttribute("enctype")) ||
        Wu),
      (f = new FormData(m, a)),
      !Ob())
    ) {
      let { name: p, type: v, value: b } = a;
      if (v === "image") {
        let S = p ? `${p}.` : "";
        (f.append(`${S}x`, "0"), f.append(`${S}y`, "0"));
      } else p && f.append(p, b);
    }
  } else {
    if (os(a))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    ((r = "get"), (u = null), (o = Wu), (d = a));
  }
  return (
    f && o === "text/plain" && ((d = f), (f = void 0)),
    { action: u, method: r.toLowerCase(), encType: o, formData: f, body: d }
  );
}
function qf(a, l) {
  if (a === !1 || a === null || typeof a > "u") throw new Error(l);
}
function Yp(a, l) {
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
async function zb(a, l) {
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
function Ub(a) {
  return a == null
    ? !1
    : a.href == null
      ? a.rel === "preload" &&
        typeof a.imageSrcSet == "string" &&
        typeof a.imageSizes == "string"
      : typeof a.rel == "string" && typeof a.href == "string";
}
async function Lb(a, l, r) {
  return Hb(
    (
      await Promise.all(
        a.map(async (u) => {
          let o = l.routes[u.route.id];
          if (o) {
            let f = await zb(o, r);
            return f.links ? f.links() : [];
          }
          return [];
        })
      )
    )
      .flat(1)
      .filter(Ub)
      .filter((u) => u.rel === "stylesheet" || u.rel === "preload")
      .map((u) =>
        u.rel === "stylesheet"
          ? { ...u, rel: "prefetch", as: "style" }
          : { ...u, rel: "prefetch" }
      )
  );
}
function Ry(a, l, r, u, o, f) {
  let d = (y, p) => (r[p] ? y.route.id !== r[p].route.id : !0),
    m = (y, p) =>
      r[p].pathname !== y.pathname ||
      (r[p].route.path?.endsWith("*") && r[p].params["*"] !== y.params["*"]);
  return f === "assets"
    ? l.filter((y, p) => d(y, p) || m(y, p))
    : f === "data"
      ? l.filter((y, p) => {
          let v = u.routes[y.route.id];
          if (!v || !v.hasLoader) return !1;
          if (d(y, p) || m(y, p)) return !0;
          if (y.route.shouldRevalidate) {
            let b = y.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin
              ),
              currentParams: r[0]?.params || {},
              nextUrl: new URL(a, window.origin),
              nextParams: y.params,
              defaultShouldRevalidate: !0
            });
            if (typeof b == "boolean") return b;
          }
          return !0;
        })
      : [];
}
function jb(a, l, { includeHydrateFallback: r } = {}) {
  return Bb(
    a
      .map((u) => {
        let o = l.routes[u.route.id];
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
function Bb(a) {
  return [...new Set(a)];
}
function kb(a) {
  let l = {},
    r = Object.keys(a).sort();
  for (let u of r) l[u] = a[u];
  return l;
}
function Hb(a, l) {
  let r = new Set();
  return (
    new Set(l),
    a.reduce((u, o) => {
      let f = JSON.stringify(kb(o));
      return (r.has(f) || (r.add(f), u.push({ key: f, link: o })), u);
    }, [])
  );
}
function qb() {
  let a = U.useContext(yl);
  return (
    qf(
      a,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    a
  );
}
function Vb() {
  let a = U.useContext(Cr);
  return (
    qf(
      a,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    a
  );
}
const Vf = U.createContext(void 0);
Vf.displayName = "FrameworkContext";
function Yf() {
  let a = U.useContext(Vf);
  return (
    qf(a, "You must render this element inside a <HydratedRouter> element"),
    a
  );
}
function Yb(a, l) {
  let r = U.useContext(Vf),
    [u, o] = U.useState(!1),
    [f, d] = U.useState(!1),
    {
      onFocus: m,
      onBlur: y,
      onMouseEnter: p,
      onMouseLeave: v,
      onTouchStart: b
    } = l,
    S = U.useRef(null);
  (U.useEffect(() => {
    if ((a === "render" && d(!0), a === "viewport")) {
      let j = (G) => {
          G.forEach((K) => {
            d(K.isIntersecting);
          });
        },
        Y = new IntersectionObserver(j, { threshold: 0.5 });
      return (
        S.current && Y.observe(S.current),
        () => {
          Y.disconnect();
        }
      );
    }
  }, [a]),
    U.useEffect(() => {
      if (u) {
        let j = setTimeout(() => {
          d(!0);
        }, 100);
        return () => {
          clearTimeout(j);
        };
      }
    }, [u]));
  let R = () => {
      o(!0);
    },
    N = () => {
      (o(!1), d(!1));
    };
  return r
    ? a !== "intent"
      ? [f, S, {}]
      : [
          f,
          S,
          {
            onFocus: or(m, R),
            onBlur: or(y, N),
            onMouseEnter: or(p, R),
            onMouseLeave: or(v, N),
            onTouchStart: or(b, R)
          }
        ]
    : [!1, S, {}];
}
function or(a, l) {
  return (r) => {
    (a && a(r), r.defaultPrevented || l(r));
  };
}
function Gb({ page: a, ...l }) {
  let r = kp(),
    { nonce: u } = Yf(),
    { router: o } = qb(),
    f = U.useMemo(() => pp(o.routes, a, o.basename), [o.routes, a, o.basename]);
  return f
    ? (l.nonce == null && u && (l = { ...l, nonce: u }),
      r
        ? U.createElement(Fb, { page: a, matches: f, ...l })
        : U.createElement(Xb, { page: a, matches: f, ...l }))
    : null;
}
function Qb(a) {
  let { manifest: l, routeModules: r } = Yf(),
    [u, o] = U.useState([]);
  return (
    U.useEffect(() => {
      let f = !1;
      return (
        Lb(a, l, r).then((d) => {
          f || o(d);
        }),
        () => {
          f = !0;
        }
      );
    }, [a, l, r]),
    u
  );
}
function Fb({ page: a, matches: l, ...r }) {
  let u = ha(),
    o = U.useMemo(() => {
      if (a === u.pathname + u.search + u.hash) return [];
      let f = Yp(a, "rsc"),
        d = !1,
        m = [];
      for (let y of l)
        typeof y.route.shouldRevalidate == "function"
          ? (d = !0)
          : m.push(y.route.id);
      return (
        d && m.length > 0 && f.searchParams.set("_routes", m.join(",")),
        [f.pathname + f.search]
      );
    }, [a, u, l]);
  return U.createElement(
    U.Fragment,
    null,
    o.map((f) =>
      U.createElement("link", {
        key: f,
        rel: "prefetch",
        as: "fetch",
        href: f,
        ...r
      })
    )
  );
}
function Xb({ page: a, matches: l, ...r }) {
  let u = ha(),
    { manifest: o, routeModules: f } = Yf(),
    { loaderData: d, matches: m } = Vb(),
    y = U.useMemo(() => Ry(a, l, m, o, u, "data"), [a, l, m, o, u]),
    p = U.useMemo(() => Ry(a, l, m, o, u, "assets"), [a, l, m, o, u]),
    v = U.useMemo(() => {
      if (a === u.pathname + u.search + u.hash) return [];
      let R = new Set(),
        N = !1;
      if (
        (l.forEach((Y) => {
          let G = o.routes[Y.route.id];
          !G ||
            !G.hasLoader ||
            ((!y.some((K) => K.route.id === Y.route.id) &&
              Y.route.id in d &&
              f[Y.route.id]?.shouldRevalidate) ||
            G.hasClientLoader
              ? (N = !0)
              : R.add(Y.route.id));
        }),
        R.size === 0)
      )
        return [];
      let j = Yp(a, "data");
      return (
        N &&
          R.size > 0 &&
          j.searchParams.set(
            "_routes",
            l
              .filter((Y) => R.has(Y.route.id))
              .map((Y) => Y.route.id)
              .join(",")
          ),
        [j.pathname + j.search]
      );
    }, [d, u, o, y, l, a, f]),
    b = U.useMemo(() => jb(p, o), [p, o]),
    S = Qb(p);
  return U.createElement(
    U.Fragment,
    null,
    v.map((R) =>
      U.createElement("link", {
        key: R,
        rel: "prefetch",
        as: "fetch",
        href: R,
        ...r
      })
    ),
    b.map((R) =>
      U.createElement("link", { key: R, rel: "modulepreload", href: R, ...r })
    ),
    S.map(({ key: R, link: N }) =>
      U.createElement("link", {
        key: R,
        nonce: r.nonce,
        ...N,
        crossOrigin: N.crossOrigin ?? r.crossOrigin
      })
    )
  );
}
function Zb(...a) {
  return (l) => {
    a.forEach((r) => {
      typeof r == "function" ? r(l) : r != null && (r.current = l);
    });
  };
}
const Ib =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Ib && (window.__reactRouterVersion = "8.3.0");
} catch {}
function Kb(a, l) {
  return N2({
    basename: l?.basename,
    getContext: l?.getContext,
    future: l?.future,
    history: V1({ window: l?.window }),
    hydrationData: l?.hydrationData || Jb(),
    routes: a,
    mapRouteProperties: yp,
    hydrationRouteProperties: bb,
    dataStrategy: l?.dataStrategy,
    patchRoutesOnNavigation: l?.patchRoutesOnNavigation,
    window: l?.window,
    instrumentations: l?.instrumentations
  }).initialize();
}
function Jb() {
  let a = window?.__staticRouterHydrationData;
  return (a && a.errors && (a = { ...a, errors: $b(a.errors) }), a);
}
function $b(a) {
  if (!a) return null;
  let l = Object.entries(a),
    r = {};
  for (let [u, o] of l)
    if (o && o.__type === "RouteErrorResponse")
      r[u] = new Rr(o.status, o.statusText, o.data, o.internal === !0);
    else if (o && o.__type === "Error") {
      if (typeof o.__subType == "string" && m2.includes(o.__subType)) {
        let f = window[o.__subType];
        if (typeof f == "function")
          try {
            let d = new f(o.message);
            ((d.stack = ""), (r[u] = d));
          } catch {}
      }
      if (r[u] == null) {
        let f = new Error(o.message);
        ((f.stack = ""), (r[u] = f));
      }
    } else r[u] = o;
  return r;
}
const cs = U.forwardRef(function (
  {
    onClick: l,
    discover: r = "render",
    prefetch: u = "none",
    relative: o,
    reloadDocument: f,
    replace: d,
    mask: m,
    state: y,
    target: p,
    to: v,
    preventScrollReset: b,
    viewTransition: S,
    defaultShouldRevalidate: R,
    ...N
  },
  j
) {
  let { basename: Y, navigator: G, useTransitions: K } = U.useContext(Cn),
    Z = typeof v == "string" && rs.test(v),
    $ = Cp(v, Y);
  v = $.to;
  let se = nb(v, { relative: o }),
    ee = ha(),
    H = null;
  if (m) {
    let Ue = us(m, [], ee.mask ? ee.mask.pathname : "/", !0);
    (Y !== "/" &&
      (Ue.pathname = Ue.pathname === "/" ? Y : hn([Y, Ue.pathname])),
      (H = G.createHref(Ue)));
  }
  let [A, W, re] = Yb(u, N),
    ie = tE(v, {
      replace: d,
      mask: m,
      state: y,
      target: p,
      preventScrollReset: b,
      relative: o,
      viewTransition: S,
      defaultShouldRevalidate: R,
      useTransitions: K
    });
  function ne(Ue) {
    (l && l(Ue), Ue.defaultPrevented || ie(Ue));
  }
  let le = !($.isExternal || f),
    he = U.createElement("a", {
      ...N,
      ...re,
      href: (le ? H : void 0) || $.absoluteURL || se,
      onClick: le ? ne : l,
      ref: Zb(j, W),
      target: p,
      "data-discover": !Z && r === "render" ? "true" : void 0
    });
  return A && !Z
    ? U.createElement(U.Fragment, null, he, U.createElement(Gb, { page: se }))
    : he;
});
cs.displayName = "Link";
const Pb = U.forwardRef(function (
  {
    "aria-current": l = "page",
    caseSensitive: r = !1,
    className: u = "",
    end: o = !1,
    style: f,
    to: d,
    viewTransition: m,
    children: y,
    ...p
  },
  v
) {
  let b = wr(d, { relative: p.relative }),
    S = ha(),
    R = U.useContext(Cr),
    { navigator: N, basename: j } = U.useContext(Cn),
    Y = R != null && rE(b) && m === !0,
    G = N.encodeLocation ? N.encodeLocation(b).pathname : b.pathname,
    K = S.pathname,
    Z =
      R && R.navigation && R.navigation.location
        ? R.navigation.location.pathname
        : null;
  (r ||
    ((K = K.toLowerCase()),
    (Z = Z ? Z.toLowerCase() : null),
    (G = G.toLowerCase())),
    Z && j && (Z = Rn(Z, j) || Z));
  const $ = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let se = K === G || (!o && K.startsWith(G) && K.charAt($) === "/"),
    ee =
      Z != null && (Z === G || (!o && Z.startsWith(G) && Z.charAt($) === "/")),
    H = { isActive: se, isPending: ee, isTransitioning: Y },
    A = se ? l : void 0,
    W;
  typeof u == "function"
    ? (W = u(H))
    : (W = [
        u,
        se ? "active" : null,
        ee ? "pending" : null,
        Y ? "transitioning" : null
      ]
        .filter(Boolean)
        .join(" "));
  let re = typeof f == "function" ? f(H) : f;
  return U.createElement(
    cs,
    {
      ...p,
      "aria-current": A,
      className: W,
      ref: v,
      style: re,
      to: d,
      viewTransition: m
    },
    typeof y == "function" ? y(H) : y
  );
});
Pb.displayName = "NavLink";
const Wb = U.forwardRef(
  (
    {
      discover: a = "render",
      fetcherKey: l,
      navigate: r,
      reloadDocument: u,
      replace: o,
      state: f,
      method: d = "get",
      action: m,
      onSubmit: y,
      relative: p,
      preventScrollReset: v,
      viewTransition: b,
      defaultShouldRevalidate: S,
      ...R
    },
    N
  ) => {
    let { useTransitions: j } = U.useContext(Cn),
      Y = lE(),
      G = iE(m, { relative: p }),
      K = d.toLowerCase() === "get" ? "get" : "post",
      Z = typeof m == "string" && rs.test(m),
      $ = (se) => {
        if ((y && y(se), se.defaultPrevented)) return;
        se.preventDefault();
        let ee = se.nativeEvent.submitter,
          H = ee?.getAttribute("formmethod") || d,
          A = () =>
            Y(ee || se.currentTarget, {
              fetcherKey: l,
              method: H,
              navigate: r,
              replace: o,
              state: f,
              relative: p,
              preventScrollReset: v,
              viewTransition: b,
              defaultShouldRevalidate: S
            });
        j && r !== !1 ? U.startTransition(() => A()) : A();
      };
    return U.createElement("form", {
      ref: N,
      method: K,
      action: G,
      onSubmit: u ? y : $,
      ...R,
      "data-discover": !Z && a === "render" ? "true" : void 0
    });
  }
);
Wb.displayName = "Form";
function eE(a) {
  return `${a} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Gp(a) {
  let l = U.useContext(yl);
  return (ze(l, eE(a)), l);
}
function tE(
  a,
  {
    target: l,
    replace: r,
    mask: u,
    state: o,
    preventScrollReset: f,
    relative: d,
    viewTransition: m,
    defaultShouldRevalidate: y,
    useTransitions: p
  } = {}
) {
  let v = ab(),
    b = ha(),
    S = wr(a, { relative: d });
  return U.useCallback(
    (R) => {
      if (_b(R, l)) {
        R.preventDefault();
        let N = r !== void 0 ? r : Ln(b) === Ln(S),
          j = () =>
            v(a, {
              replace: N,
              mask: u,
              state: o,
              preventScrollReset: f,
              relative: d,
              viewTransition: m,
              defaultShouldRevalidate: y
            });
        p ? U.startTransition(() => j()) : j();
      }
    },
    [b, v, S, r, u, o, l, a, f, d, m, y, p]
  );
}
let nE = 0,
  aE = () => `__${String(++nE)}__`;
function lE() {
  let { router: a } = Gp("useSubmit"),
    { basename: l } = U.useContext(Cn),
    r = yb(),
    u = a.fetch,
    o = a.navigate;
  return U.useCallback(
    async (f, d = {}) => {
      let { action: m, method: y, encType: p, formData: v, body: b } = xb(f, l);
      d.navigate === !1
        ? await u(d.fetcherKey || aE(), r, d.action || m, {
            defaultShouldRevalidate: d.defaultShouldRevalidate,
            preventScrollReset: d.preventScrollReset,
            formData: v,
            body: b,
            formMethod: d.method || y,
            formEncType: d.encType || p,
            flushSync: d.flushSync
          })
        : await o(d.action || m, {
            defaultShouldRevalidate: d.defaultShouldRevalidate,
            preventScrollReset: d.preventScrollReset,
            formData: v,
            body: b,
            formMethod: d.method || y,
            formEncType: d.encType || p,
            replace: d.replace,
            state: d.state,
            fromRouteId: r,
            flushSync: d.flushSync,
            viewTransition: d.viewTransition
          });
    },
    [u, o, l, r]
  );
}
function iE(a, { relative: l } = {}) {
  let { basename: r } = U.useContext(Cn),
    u = U.useContext(da);
  ze(u, "useFormAction must be used inside a RouteContext");
  let [o] = u.matches.slice(-1),
    f = { ...wr(a || ".", { relative: l }) },
    d = ha();
  if (a == null) {
    f.search = d.search;
    let m = new URLSearchParams(f.search),
      y = m.getAll("index");
    if (y.some((p) => p === "")) {
      (m.delete("index"),
        y.filter((v) => v).forEach((v) => m.append("index", v)));
      let p = m.toString();
      f.search = p ? `?${p}` : "";
    }
  }
  return (
    (!a || a === ".") &&
      o.route.index &&
      (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (f.pathname = f.pathname === "/" ? r : hn([r, f.pathname])),
    Ln(f)
  );
}
function rE(a, { relative: l } = {}) {
  let r = U.useContext(jf);
  ze(
    r != null,
    "`useViewTransitionState` must be used within `react-router/dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: u } = Gp("useViewTransitionState"),
    o = wr(a, { relative: l });
  if (!r.isTransitioning) return !1;
  let f = Rn(r.currentLocation.pathname, u) || r.currentLocation.pathname,
    d = Rn(r.nextLocation.pathname, u) || r.nextLocation.pathname;
  return as(o.pathname, d) != null || as(o.pathname, f) != null;
}
const uE = "hostMetaData";
function sE(a) {
  let l;
  try {
    l = new URLSearchParams(a);
  } catch {
    return null;
  }
  const r = l.get(uE);
  if (!r) return null;
  let u;
  try {
    u = JSON.parse(r);
  } catch {
    return null;
  }
  if (typeof u != "object" || u === null) return null;
  const o = u,
    f = o.instanceId,
    d = o.hostAppOrigin;
  if (
    typeof f != "string" ||
    f.length === 0 ||
    typeof d != "string" ||
    d.length === 0
  )
    return null;
  try {
    if (new URL(d).origin !== d) return null;
  } catch {
    return null;
  }
  return { instanceId: f, hostAppOrigin: d };
}
function Qp(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function Fp(a) {
  return typeof a.id == "number" && Number.isInteger(a.id) && a.id >= 0;
}
function Gf(a) {
  return Qp(a) && a.jsonrpc === "2.0";
}
function oE(a) {
  if (!Gf(a)) return !1;
  const l = a;
  return !("id" in l) && typeof l.method == "string";
}
function cE(a) {
  if (!Gf(a)) return !1;
  const l = a;
  return Fp(l) && "result" in l && !("error" in l) && !("method" in l);
}
function Xp(a) {
  if (!Gf(a)) return !1;
  const l = a;
  if (!Fp(l) || "result" in l || "method" in l) return !1;
  const r = l.error;
  return Qp(r) && typeof r.code == "number";
}
function fE(a) {
  return cE(a) || Xp(a);
}
class dE {
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
    if (fE(l)) {
      const r = this.pending.get(l.id);
      if (!r) return;
      (this.pending.delete(l.id),
        this.onInboundMeta(l, l._meta),
        Xp(l)
          ? r.reject(new Error(l.error.message || "Request failed"))
          : r.resolve(l.result));
      return;
    }
    if (oE(l)) {
      this.onInboundMeta(l, l._meta);
      const r = this.notificationHandlers.get(l.method);
      if (r) {
        const u = l._meta;
        r.forEach((o) => {
          o(l.params, u);
        });
      }
    }
  };
  request(l, r) {
    const u = this.nextRequestId++,
      o = { jsonrpc: "2.0", id: u, method: l, params: r };
    return (
      this.applyOutboundMeta(o, l),
      new Promise((f, d) => {
        (this.pending.set(u, { resolve: f, reject: d }),
          this.transport.post(o));
      })
    );
  }
  sendNotification(l, r) {
    const u = { jsonrpc: "2.0", method: l, params: r };
    (this.applyOutboundMeta(u, l), this.transport.post(u));
  }
  getOutboundMeta(l) {}
  onInboundMeta(l, r) {}
  applyOutboundMeta(l, r) {
    const u = this.getOutboundMeta(r);
    u !== void 0 && (l._meta = u);
  }
}
let hE = class {
  targetOrigin;
  constructor(l) {
    this.targetOrigin = l;
  }
  post(l) {
    window.parent?.postMessage(l, this.targetOrigin);
  }
  onMessage(l) {
    const r = (u) => {
      l(u.data);
    };
    return (
      window.addEventListener("message", r),
      () => window.removeEventListener("message", r)
    );
  }
};
const mE = 500,
  yE = "2026-01-26";
class fl extends dE {
  static initPromise = null;
  hostCtx = {};
  _handshakeSucceeded = !1;
  static async getInstance(l) {
    if (!fl.initPromise) {
      const r = l?.targetOrigin ?? "*";
      fl.initPromise = (async () => {
        const u = new fl(new hE(r));
        return (await u.handshake(l), u);
      })();
    }
    return fl.initPromise;
  }
  static resetInstance() {
    fl.initPromise = null;
  }
  async handshake(l) {
    const r = l?.handshakeTimeoutMs ?? mE,
      u = l?.appInfo ?? { name: "mcp-app", version: "1.0.0" };
    try {
      const o = Symbol("timeout"),
        f = await Promise.race([
          this.request("ui/initialize", {
            protocolVersion: yE,
            appInfo: u,
            appCapabilities: {}
          }),
          new Promise((d) => setTimeout(() => d(o), r))
        ]);
      f !== o &&
        ((this.hostCtx = f.hostContext ?? {}),
        (this._handshakeSucceeded = !0),
        this.registerNotificationHandler(
          "ui/notifications/host-context-changed",
          (d) => {
            this.hostCtx = { ...this.hostCtx, ...d };
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
var li = ((a) => (
  (a.WebApp = "WebApp"),
  (a.MicroFrontend = "Micro-Frontend"),
  (a.OpenAI = "OpenAI"),
  (a.MCPApps = "MCP-Apps"),
  (a.Mosaic = "Mosaic"),
  a
))(li || {});
let kc = null,
  Zp;
async function pE() {
  return typeof window > "u"
    ? "Mosaic"
    : window.openai
      ? "OpenAI"
      : vE()
        ? bE()
          ? "Micro-Frontend"
          : (await fl.getInstance(Zp)).handshakeSucceeded
            ? "MCP-Apps"
            : "WebApp"
        : "WebApp";
}
async function gE(a) {
  return (kc || ((Zp = a?.mcpApps), (kc = pE())), kc);
}
function vE() {
  if (typeof window > "u") return !1;
  try {
    return window.parent !== window;
  } catch {
    return !0;
  }
}
function bE() {
  if (typeof window > "u") return !1;
  try {
    if (window.parent === window) return !1;
  } catch {
    return !1;
  }
  const a = window.location?.search;
  return typeof a != "string" ? !1 : sE(a) !== null;
}
async function EE(a) {
  return await gE();
}
const SE = new Set(["then", "catch", "finally"]);
function TE(a, l) {
  return new Proxy(a, {
    get(r, u, o) {
      if (typeof u == "symbol" || SE.has(u)) {
        const f = Reflect.get(r, u, o);
        return typeof f == "function" ? f.bind(r) : f;
      }
      throw new TypeError(`\`${l}()\` returns a Promise — did you forget to await it?
Use \`const sdk = await ${l}();\` before accessing SDK methods.`);
    }
  });
}
const { freeze: RE, keys: Ip } = Object,
  { isArray: Kp } = Array,
  { stringify: Cy } = JSON,
  CE = WeakSet;
let NE = class {
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
  wE = class {
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
const Un = (a) => new NE(a),
  zn = (a) => new wE(a);
class AE extends Error {
  constructor(l) {
    (super(l), (this.name = "DataNotFoundError"));
  }
}
function Ct(a) {
  return Qf(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return Ct(l(a));
          } catch (u) {
            return l === void 0 ? Ct(a) : vf(u);
          }
        }
      };
}
function vf(a) {
  return Qf(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return Ct(r(a));
            } catch (u) {
              return vf(u);
            }
          return vf(a);
        }
      };
}
function Qf(a) {
  return typeof a?.then == "function";
}
function bf(a) {
  if (
    (a && a.toJSON && typeof a.toJSON == "function" && (a = a.toJSON()),
    a === void 0)
  )
    return;
  if (typeof a == "number") return isFinite(a) ? "" + a : "null";
  if (typeof a != "object") return Cy(a);
  let l, r;
  if (Kp(a)) {
    for (r = "[", l = 0; l < a.length; l++)
      (l && (r += ","), (r += bf(a[l]) || "null"));
    return r + "]";
  }
  if (a === null) return "null";
  const u = Ip(a).sort();
  for (r = "", l = 0; l < u.length; l++) {
    const o = u[l],
      f = bf(a[o]);
    f && (r && (r += ","), (r += Cy(o) + ":" + f));
  }
  return "{" + r + "}";
}
function cr(a) {
  return a instanceof Error
    ? a
    : new Error(typeof a == "string" ? a : JSON.stringify(a));
}
var Jp = ((a) => (
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
))(Jp || {});
function DE(a) {
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
class _E extends Error {
  constructor(l, r, u) {
    (super(),
      (this.status = l),
      (this.body = r),
      (this.headers = u || {}),
      (this.ok = l >= 200 && this.status <= 299),
      (this.statusText = DE(l)));
  }
}
const Ny = new CE();
function oi(a) {
  if (!(typeof a != "object" || a === null || Ny.has(a))) {
    if ((Ny.add(a), Kp(a)))
      for (let l = 0, r = a.length; l < r; l += 1) oi(a[l]);
    else {
      const l = Ip(a);
      for (let r = 0, u = l.length; r < u; r += 1) oi(a[l[r]]);
    }
    RE(a);
  }
}
class $p extends Error {
  constructor(l) {
    (super(), (this.data = l), (this.type = "user-visible"));
  }
}
function OE(a) {
  return a instanceof Error && "type" in a && a.type === "user-visible";
}
function Pp(a = { request: [], retry: void 0, response: [], finally: [] }, l) {
  return {
    type: "fetch",
    version: "1.0",
    service: function (...r) {
      var u;
      const o = (u = a.createContext) == null ? void 0 : u.call(a),
        {
          request: f = [],
          retry: d = void 0,
          response: m = [],
          finally: y = []
        } = a,
        p = f.reduce((v, b) => v.then((S) => b(S, o)), Ct(r));
      return Promise.resolve(p)
        .then((v) =>
          d ? d(v, l, o) : l ? l.applyRetry(() => fetch(...v)) : fetch(...v)
        )
        .then((v) => m.reduce((b, S) => b.then((R) => S(R, o)), Ct(v)))
        .finally(() => {
          if (y.length > 0)
            return y.reduce((v, b) => v.then(() => b(o)), Promise.resolve());
        });
    }
  };
}
function Sr(
  a,
  l,
  [r, u = {}],
  {
    throwOnExisting: o = !1,
    errorMessage: f = `Unexpected ${a} header encountered`
  } = {}
) {
  let d = !1;
  if (r instanceof Request && !u?.headers) {
    if (o && r.headers.has(a)) throw new Error(f);
    (r.headers.set(a, l), (d = !0));
  }
  if (u?.headers instanceof Headers) {
    if (o && u.headers.has(a)) throw new Error(f);
    u.headers.set(a, l);
  } else {
    if (o && u?.headers && Reflect.has(u.headers, a)) throw new Error(f);
    d || (u.headers = { ...u?.headers, [a]: l });
  }
  return [r, u];
}
function es(a, l) {
  if (!!!a) throw new Error(l);
}
const ME = 10,
  Wp = 2;
function Ff(a) {
  return fs(a, []);
}
function fs(a, l) {
  switch (typeof a) {
    case "string":
      return JSON.stringify(a);
    case "function":
      return a.name ? `[function ${a.name}]` : "[function]";
    case "object":
      return xE(a, l);
    default:
      return String(a);
  }
}
function xE(a, l) {
  if (a === null) return "null";
  if (l.includes(a)) return "[Circular]";
  const r = [...l, a];
  if (zE(a)) {
    const u = a.toJSON();
    if (u !== a) return typeof u == "string" ? u : fs(u, r);
  } else if (Array.isArray(a)) return LE(a, r);
  return UE(a, r);
}
function zE(a) {
  return typeof a.toJSON == "function";
}
function UE(a, l) {
  const r = Object.entries(a);
  return r.length === 0
    ? "{}"
    : l.length > Wp
      ? "[" + jE(a) + "]"
      : "{ " + r.map(([o, f]) => o + ": " + fs(f, l)).join(", ") + " }";
}
function LE(a, l) {
  if (a.length === 0) return "[]";
  if (l.length > Wp) return "[Array]";
  const r = Math.min(ME, a.length),
    u = a.length - r,
    o = [];
  for (let f = 0; f < r; ++f) o.push(fs(a[f], l));
  return (
    u === 1
      ? o.push("... 1 more item")
      : u > 1 && o.push(`... ${u} more items`),
    "[" + o.join(", ") + "]"
  );
}
function jE(a) {
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
const BE = globalThis.process && !0,
  kE = BE
    ? function (l, r) {
        return l instanceof r;
      }
    : function (l, r) {
        if (l instanceof r) return !0;
        if (typeof l == "object" && l !== null) {
          var u;
          const o = r.prototype[Symbol.toStringTag],
            f =
              Symbol.toStringTag in l
                ? l[Symbol.toStringTag]
                : (u = l.constructor) === null || u === void 0
                  ? void 0
                  : u.name;
          if (o === f) {
            const d = Ff(l);
            throw new Error(`Cannot use ${o} "${d}" from another module or realm.

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
class eg {
  constructor(l, r = "GraphQL request", u = { line: 1, column: 1 }) {
    (typeof l == "string" ||
      es(!1, `Body must be a string. Received: ${Ff(l)}.`),
      (this.body = l),
      (this.name = r),
      (this.locationOffset = u),
      this.locationOffset.line > 0 ||
        es(!1, "line in locationOffset is 1-indexed and must be positive."),
      this.locationOffset.column > 0 ||
        es(!1, "column in locationOffset is 1-indexed and must be positive."));
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function HE(a) {
  return kE(a, eg);
}
function qE(a, l) {
  if (!!!a) throw new Error("Unexpected invariant triggered.");
}
const VE = /\r\n|[\n\r]/g;
function Ef(a, l) {
  let r = 0,
    u = 1;
  for (const o of a.body.matchAll(VE)) {
    if ((typeof o.index == "number" || qE(!1), o.index >= l)) break;
    ((r = o.index + o[0].length), (u += 1));
  }
  return { line: u, column: l + 1 - r };
}
function YE(a) {
  return tg(a.source, Ef(a.source, a.start));
}
function tg(a, l) {
  const r = a.locationOffset.column - 1,
    u = "".padStart(r) + a.body,
    o = l.line - 1,
    f = a.locationOffset.line - 1,
    d = l.line + f,
    m = l.line === 1 ? r : 0,
    y = l.column + m,
    p = `${a.name}:${d}:${y}
`,
    v = u.split(/\r\n|[\n\r]/g),
    b = v[o];
  if (b.length > 120) {
    const S = Math.floor(y / 80),
      R = y % 80,
      N = [];
    for (let j = 0; j < b.length; j += 80) N.push(b.slice(j, j + 80));
    return (
      p +
      wy([
        [`${d} |`, N[0]],
        ...N.slice(1, S + 1).map((j) => ["|", j]),
        ["|", "^".padStart(R)],
        ["|", N[S + 1]]
      ])
    );
  }
  return (
    p +
    wy([
      [`${d - 1} |`, v[o - 1]],
      [`${d} |`, b],
      ["|", "^".padStart(y)],
      [`${d + 1} |`, v[o + 1]]
    ])
  );
}
function wy(a) {
  const l = a.filter(([u, o]) => o !== void 0),
    r = Math.max(...l.map(([u]) => u.length));
  return l.map(([u, o]) => u.padStart(r) + (o ? " " + o : "")).join(`
`);
}
var we;
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
})(we || (we = {}));
var X;
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
})(X || (X = {}));
function GE(a) {
  return typeof a == "object" && a !== null;
}
function QE(a) {
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
class Xf extends Error {
  constructor(l, ...r) {
    var u, o, f;
    const {
      nodes: d,
      source: m,
      positions: y,
      path: p,
      originalError: v,
      extensions: b
    } = QE(r);
    (super(l),
      (this.name = "GraphQLError"),
      (this.path = p ?? void 0),
      (this.originalError = v ?? void 0),
      (this.nodes = Ay(Array.isArray(d) ? d : d ? [d] : void 0)));
    const S = Ay(
      (u = this.nodes) === null || u === void 0
        ? void 0
        : u.map((N) => N.loc).filter((N) => N != null)
    );
    ((this.source =
      m ??
      (S == null || (o = S[0]) === null || o === void 0 ? void 0 : o.source)),
      (this.positions = y ?? S?.map((N) => N.start)),
      (this.locations =
        y && m
          ? y.map((N) => Ef(m, N))
          : S?.map((N) => Ef(N.source, N.start))));
    const R = GE(v?.extensions) ? v?.extensions : void 0;
    ((this.extensions =
      (f = b ?? R) !== null && f !== void 0 ? f : Object.create(null)),
      Object.defineProperties(this, {
        message: { writable: !0, enumerable: !0 },
        name: { enumerable: !1 },
        nodes: { enumerable: !1 },
        source: { enumerable: !1 },
        positions: { enumerable: !1 },
        originalError: { enumerable: !1 }
      }),
      v != null && v.stack
        ? Object.defineProperty(this, "stack", {
            value: v.stack,
            writable: !0,
            configurable: !0
          })
        : Error.captureStackTrace
          ? Error.captureStackTrace(this, Xf)
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

` + YE(r.loc));
    else if (this.source && this.locations)
      for (const r of this.locations)
        l +=
          `

` + tg(this.source, r);
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
function Ay(a) {
  return a === void 0 || a.length === 0 ? void 0 : a;
}
function Rt(a, l, r) {
  return new Xf(`Syntax Error: ${r}`, { source: a, positions: [l] });
}
class FE {
  constructor(l, r, u) {
    ((this.start = l.start),
      (this.end = r.end),
      (this.startToken = l),
      (this.endToken = r),
      (this.source = u));
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return { start: this.start, end: this.end };
  }
}
class ng {
  constructor(l, r, u, o, f, d) {
    ((this.kind = l),
      (this.start = r),
      (this.end = u),
      (this.line = o),
      (this.column = f),
      (this.value = d),
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
const ag = {
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
  XE = new Set(Object.keys(ag));
function Dy(a) {
  const l = a?.kind;
  return typeof l == "string" && XE.has(l);
}
var ii;
(function (a) {
  ((a.QUERY = "query"),
    (a.MUTATION = "mutation"),
    (a.SUBSCRIPTION = "subscription"));
})(ii || (ii = {}));
function Sf(a) {
  return a === 9 || a === 32;
}
function Tr(a) {
  return a >= 48 && a <= 57;
}
function lg(a) {
  return (a >= 97 && a <= 122) || (a >= 65 && a <= 90);
}
function ig(a) {
  return lg(a) || a === 95;
}
function ZE(a) {
  return lg(a) || Tr(a) || a === 95;
}
function IE(a) {
  var l;
  let r = Number.MAX_SAFE_INTEGER,
    u = null,
    o = -1;
  for (let d = 0; d < a.length; ++d) {
    var f;
    const m = a[d],
      y = KE(m);
    y !== m.length &&
      ((u = (f = u) !== null && f !== void 0 ? f : d),
      (o = d),
      d !== 0 && y < r && (r = y));
  }
  return a
    .map((d, m) => (m === 0 ? d : d.slice(r)))
    .slice((l = u) !== null && l !== void 0 ? l : 0, o + 1);
}
function KE(a) {
  let l = 0;
  for (; l < a.length && Sf(a.charCodeAt(l));) ++l;
  return l;
}
function JE(a, l) {
  const r = a.replace(/"""/g, '\\"""'),
    u = r.split(/\r\n|[\n\r]/g),
    o = u.length === 1,
    f =
      u.length > 1 &&
      u.slice(1).every((R) => R.length === 0 || Sf(R.charCodeAt(0))),
    d = r.endsWith('\\"""'),
    m = a.endsWith('"') && !d,
    y = a.endsWith("\\"),
    p = m || y,
    v = !o || a.length > 70 || p || f || d;
  let b = "";
  const S = o && Sf(a.charCodeAt(0));
  return (
    ((v && !S) || f) &&
      (b += `
`),
    (b += r),
    (v || p) &&
      (b += `
`),
    '"""' + b + '"""'
  );
}
class $E {
  constructor(l) {
    const r = new ng(X.SOF, 0, 0, 0, 0);
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
    if (l.kind !== X.EOF)
      do
        if (l.next) l = l.next;
        else {
          const r = WE(this, l.end);
          ((l.next = r), (r.prev = l), (l = r));
        }
      while (l.kind === X.COMMENT);
    return l;
  }
}
function PE(a) {
  return (
    a === X.BANG ||
    a === X.DOLLAR ||
    a === X.AMP ||
    a === X.PAREN_L ||
    a === X.PAREN_R ||
    a === X.SPREAD ||
    a === X.COLON ||
    a === X.EQUALS ||
    a === X.AT ||
    a === X.BRACKET_L ||
    a === X.BRACKET_R ||
    a === X.BRACE_L ||
    a === X.PIPE ||
    a === X.BRACE_R
  );
}
function fi(a) {
  return (a >= 0 && a <= 55295) || (a >= 57344 && a <= 1114111);
}
function ds(a, l) {
  return rg(a.charCodeAt(l)) && ug(a.charCodeAt(l + 1));
}
function rg(a) {
  return a >= 55296 && a <= 56319;
}
function ug(a) {
  return a >= 56320 && a <= 57343;
}
function hl(a, l) {
  const r = a.source.body.codePointAt(l);
  if (r === void 0) return X.EOF;
  if (r >= 32 && r <= 126) {
    const u = String.fromCodePoint(r);
    return u === '"' ? `'"'` : `"${u}"`;
  }
  return "U+" + r.toString(16).toUpperCase().padStart(4, "0");
}
function gt(a, l, r, u, o) {
  const f = a.line,
    d = 1 + r - a.lineStart;
  return new ng(l, r, u, f, d, o);
}
function WE(a, l) {
  const r = a.source.body,
    u = r.length;
  let o = l;
  for (; o < u;) {
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
        return eS(a, o);
      case 33:
        return gt(a, X.BANG, o, o + 1);
      case 36:
        return gt(a, X.DOLLAR, o, o + 1);
      case 38:
        return gt(a, X.AMP, o, o + 1);
      case 40:
        return gt(a, X.PAREN_L, o, o + 1);
      case 41:
        return gt(a, X.PAREN_R, o, o + 1);
      case 46:
        if (r.charCodeAt(o + 1) === 46 && r.charCodeAt(o + 2) === 46)
          return gt(a, X.SPREAD, o, o + 3);
        break;
      case 58:
        return gt(a, X.COLON, o, o + 1);
      case 61:
        return gt(a, X.EQUALS, o, o + 1);
      case 64:
        return gt(a, X.AT, o, o + 1);
      case 91:
        return gt(a, X.BRACKET_L, o, o + 1);
      case 93:
        return gt(a, X.BRACKET_R, o, o + 1);
      case 123:
        return gt(a, X.BRACE_L, o, o + 1);
      case 124:
        return gt(a, X.PIPE, o, o + 1);
      case 125:
        return gt(a, X.BRACE_R, o, o + 1);
      case 34:
        return r.charCodeAt(o + 1) === 34 && r.charCodeAt(o + 2) === 34
          ? rS(a, o)
          : nS(a, o);
    }
    if (Tr(f) || f === 45) return tS(a, o, f);
    if (ig(f)) return uS(a, o);
    throw Rt(
      a.source,
      o,
      f === 39
        ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
        : fi(f) || ds(r, o)
          ? `Unexpected character: ${hl(a, o)}.`
          : `Invalid character: ${hl(a, o)}.`
    );
  }
  return gt(a, X.EOF, u, u);
}
function eS(a, l) {
  const r = a.source.body,
    u = r.length;
  let o = l + 1;
  for (; o < u;) {
    const f = r.charCodeAt(o);
    if (f === 10 || f === 13) break;
    if (fi(f)) ++o;
    else if (ds(r, o)) o += 2;
    else break;
  }
  return gt(a, X.COMMENT, l, o, r.slice(l + 1, o));
}
function tS(a, l, r) {
  const u = a.source.body;
  let o = l,
    f = r,
    d = !1;
  if ((f === 45 && (f = u.charCodeAt(++o)), f === 48)) {
    if (((f = u.charCodeAt(++o)), Tr(f)))
      throw Rt(
        a.source,
        o,
        `Invalid number, unexpected digit after 0: ${hl(a, o)}.`
      );
  } else ((o = Hc(a, o, f)), (f = u.charCodeAt(o)));
  if (
    (f === 46 &&
      ((d = !0),
      (f = u.charCodeAt(++o)),
      (o = Hc(a, o, f)),
      (f = u.charCodeAt(o))),
    (f === 69 || f === 101) &&
      ((d = !0),
      (f = u.charCodeAt(++o)),
      (f === 43 || f === 45) && (f = u.charCodeAt(++o)),
      (o = Hc(a, o, f)),
      (f = u.charCodeAt(o))),
    f === 46 || ig(f))
  )
    throw Rt(
      a.source,
      o,
      `Invalid number, expected digit but got: ${hl(a, o)}.`
    );
  return gt(a, d ? X.FLOAT : X.INT, l, o, u.slice(l, o));
}
function Hc(a, l, r) {
  if (!Tr(r))
    throw Rt(
      a.source,
      l,
      `Invalid number, expected digit but got: ${hl(a, l)}.`
    );
  const u = a.source.body;
  let o = l + 1;
  for (; Tr(u.charCodeAt(o));) ++o;
  return o;
}
function nS(a, l) {
  const r = a.source.body,
    u = r.length;
  let o = l + 1,
    f = o,
    d = "";
  for (; o < u;) {
    const m = r.charCodeAt(o);
    if (m === 34) return ((d += r.slice(f, o)), gt(a, X.STRING, l, o + 1, d));
    if (m === 92) {
      d += r.slice(f, o);
      const y =
        r.charCodeAt(o + 1) === 117
          ? r.charCodeAt(o + 2) === 123
            ? aS(a, o)
            : lS(a, o)
          : iS(a, o);
      ((d += y.value), (o += y.size), (f = o));
      continue;
    }
    if (m === 10 || m === 13) break;
    if (fi(m)) ++o;
    else if (ds(r, o)) o += 2;
    else throw Rt(a.source, o, `Invalid character within String: ${hl(a, o)}.`);
  }
  throw Rt(a.source, o, "Unterminated string.");
}
function aS(a, l) {
  const r = a.source.body;
  let u = 0,
    o = 3;
  for (; o < 12;) {
    const f = r.charCodeAt(l + o++);
    if (f === 125) {
      if (o < 5 || !fi(u)) break;
      return { value: String.fromCodePoint(u), size: o };
    }
    if (((u = (u << 4) | dr(f)), u < 0)) break;
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + o)}".`
  );
}
function lS(a, l) {
  const r = a.source.body,
    u = _y(r, l + 2);
  if (fi(u)) return { value: String.fromCodePoint(u), size: 6 };
  if (rg(u) && r.charCodeAt(l + 6) === 92 && r.charCodeAt(l + 7) === 117) {
    const o = _y(r, l + 8);
    if (ug(o)) return { value: String.fromCodePoint(u, o), size: 12 };
  }
  throw Rt(
    a.source,
    l,
    `Invalid Unicode escape sequence: "${r.slice(l, l + 6)}".`
  );
}
function _y(a, l) {
  return (
    (dr(a.charCodeAt(l)) << 12) |
    (dr(a.charCodeAt(l + 1)) << 8) |
    (dr(a.charCodeAt(l + 2)) << 4) |
    dr(a.charCodeAt(l + 3))
  );
}
function dr(a) {
  return a >= 48 && a <= 57
    ? a - 48
    : a >= 65 && a <= 70
      ? a - 55
      : a >= 97 && a <= 102
        ? a - 87
        : -1;
}
function iS(a, l) {
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
function rS(a, l) {
  const r = a.source.body,
    u = r.length;
  let o = a.lineStart,
    f = l + 3,
    d = f,
    m = "";
  const y = [];
  for (; f < u;) {
    const p = r.charCodeAt(f);
    if (p === 34 && r.charCodeAt(f + 1) === 34 && r.charCodeAt(f + 2) === 34) {
      ((m += r.slice(d, f)), y.push(m));
      const v = gt(
        a,
        X.BLOCK_STRING,
        l,
        f + 3,
        IE(y).join(`
`)
      );
      return ((a.line += y.length - 1), (a.lineStart = o), v);
    }
    if (
      p === 92 &&
      r.charCodeAt(f + 1) === 34 &&
      r.charCodeAt(f + 2) === 34 &&
      r.charCodeAt(f + 3) === 34
    ) {
      ((m += r.slice(d, f)), (d = f + 1), (f += 4));
      continue;
    }
    if (p === 10 || p === 13) {
      ((m += r.slice(d, f)),
        y.push(m),
        p === 13 && r.charCodeAt(f + 1) === 10 ? (f += 2) : ++f,
        (m = ""),
        (d = f),
        (o = f));
      continue;
    }
    if (fi(p)) ++f;
    else if (ds(r, f)) f += 2;
    else throw Rt(a.source, f, `Invalid character within String: ${hl(a, f)}.`);
  }
  throw Rt(a.source, f, "Unterminated string.");
}
function uS(a, l) {
  const r = a.source.body,
    u = r.length;
  let o = l + 1;
  for (; o < u;) {
    const f = r.charCodeAt(o);
    if (ZE(f)) ++o;
    else break;
  }
  return gt(a, X.NAME, l, o, r.slice(l, o));
}
var Tf;
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
})(Tf || (Tf = {}));
function sS(a, l) {
  const r = new oS(a, l),
    u = r.parseDocument();
  return (
    Object.defineProperty(u, "tokenCount", {
      enumerable: !1,
      value: r.tokenCount
    }),
    u
  );
}
class oS {
  constructor(l, r = {}) {
    const u = HE(l) ? l : new eg(l);
    ((this._lexer = new $E(u)), (this._options = r), (this._tokenCounter = 0));
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  parseName() {
    const l = this.expectToken(X.NAME);
    return this.node(l, { kind: we.NAME, value: l.value });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: we.DOCUMENT,
      definitions: this.many(X.SOF, this.parseDefinition, X.EOF)
    });
  }
  parseDefinition() {
    if (this.peek(X.BRACE_L)) return this.parseOperationDefinition();
    const l = this.peekDescription(),
      r = l ? this._lexer.lookahead() : this._lexer.token;
    if (r.kind === X.NAME) {
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
    if (this.peek(X.BRACE_L))
      return this.node(l, {
        kind: we.OPERATION_DEFINITION,
        operation: ii.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const r = this.parseOperationType();
    let u;
    return (
      this.peek(X.NAME) && (u = this.parseName()),
      this.node(l, {
        kind: we.OPERATION_DEFINITION,
        operation: r,
        name: u,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet()
      })
    );
  }
  parseOperationType() {
    const l = this.expectToken(X.NAME);
    switch (l.value) {
      case "query":
        return ii.QUERY;
      case "mutation":
        return ii.MUTATION;
      case "subscription":
        return ii.SUBSCRIPTION;
    }
    throw this.unexpected(l);
  }
  parseVariableDefinitions() {
    return this.optionalMany(
      X.PAREN_L,
      this.parseVariableDefinition,
      X.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: we.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(X.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(X.EQUALS)
        ? this.parseConstValueLiteral()
        : void 0,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const l = this._lexer.token;
    return (
      this.expectToken(X.DOLLAR),
      this.node(l, { kind: we.VARIABLE, name: this.parseName() })
    );
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: we.SELECTION_SET,
      selections: this.many(X.BRACE_L, this.parseSelection, X.BRACE_R)
    });
  }
  parseSelection() {
    return this.peek(X.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const l = this._lexer.token,
      r = this.parseName();
    let u, o;
    return (
      this.expectOptionalToken(X.COLON)
        ? ((u = r), (o = this.parseName()))
        : (o = r),
      this.node(l, {
        kind: we.FIELD,
        alias: u,
        name: o,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(X.BRACE_L) ? this.parseSelectionSet() : void 0
      })
    );
  }
  parseArguments(l) {
    const r = l ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(X.PAREN_L, r, X.PAREN_R);
  }
  parseArgument(l = !1) {
    const r = this._lexer.token,
      u = this.parseName();
    return (
      this.expectToken(X.COLON),
      this.node(r, {
        kind: we.ARGUMENT,
        name: u,
        value: this.parseValueLiteral(l)
      })
    );
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  parseFragment() {
    const l = this._lexer.token;
    this.expectToken(X.SPREAD);
    const r = this.expectOptionalKeyword("on");
    return !r && this.peek(X.NAME)
      ? this.node(l, {
          kind: we.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(!1)
        })
      : this.node(l, {
          kind: we.INLINE_FRAGMENT,
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
            kind: we.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet()
          })
        : this.node(l, {
            kind: we.FRAGMENT_DEFINITION,
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
      case X.BRACKET_L:
        return this.parseList(l);
      case X.BRACE_L:
        return this.parseObject(l);
      case X.INT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: we.INT, value: r.value })
        );
      case X.FLOAT:
        return (
          this.advanceLexer(),
          this.node(r, { kind: we.FLOAT, value: r.value })
        );
      case X.STRING:
      case X.BLOCK_STRING:
        return this.parseStringLiteral();
      case X.NAME:
        switch ((this.advanceLexer(), r.value)) {
          case "true":
            return this.node(r, { kind: we.BOOLEAN, value: !0 });
          case "false":
            return this.node(r, { kind: we.BOOLEAN, value: !1 });
          case "null":
            return this.node(r, { kind: we.NULL });
          default:
            return this.node(r, { kind: we.ENUM, value: r.value });
        }
      case X.DOLLAR:
        if (l)
          if ((this.expectToken(X.DOLLAR), this._lexer.token.kind === X.NAME)) {
            const u = this._lexer.token.value;
            throw Rt(
              this._lexer.source,
              r.start,
              `Unexpected variable "$${u}" in constant value.`
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
        kind: we.STRING,
        value: l.value,
        block: l.kind === X.BLOCK_STRING
      })
    );
  }
  parseList(l) {
    const r = () => this.parseValueLiteral(l);
    return this.node(this._lexer.token, {
      kind: we.LIST,
      values: this.any(X.BRACKET_L, r, X.BRACKET_R)
    });
  }
  parseObject(l) {
    const r = () => this.parseObjectField(l);
    return this.node(this._lexer.token, {
      kind: we.OBJECT,
      fields: this.any(X.BRACE_L, r, X.BRACE_R)
    });
  }
  parseObjectField(l) {
    const r = this._lexer.token,
      u = this.parseName();
    return (
      this.expectToken(X.COLON),
      this.node(r, {
        kind: we.OBJECT_FIELD,
        name: u,
        value: this.parseValueLiteral(l)
      })
    );
  }
  parseDirectives(l) {
    const r = [];
    for (; this.peek(X.AT);) r.push(this.parseDirective(l));
    return r;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(l) {
    const r = this._lexer.token;
    return (
      this.expectToken(X.AT),
      this.node(r, {
        kind: we.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(l)
      })
    );
  }
  parseTypeReference() {
    const l = this._lexer.token;
    let r;
    if (this.expectOptionalToken(X.BRACKET_L)) {
      const u = this.parseTypeReference();
      (this.expectToken(X.BRACKET_R),
        (r = this.node(l, { kind: we.LIST_TYPE, type: u })));
    } else r = this.parseNamedType();
    return this.expectOptionalToken(X.BANG)
      ? this.node(l, { kind: we.NON_NULL_TYPE, type: r })
      : r;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: we.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(X.STRING) || this.peek(X.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("schema");
    const u = this.parseConstDirectives(),
      o = this.many(X.BRACE_L, this.parseOperationTypeDefinition, X.BRACE_R);
    return this.node(l, {
      kind: we.SCHEMA_DEFINITION,
      description: r,
      directives: u,
      operationTypes: o
    });
  }
  parseOperationTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseOperationType();
    this.expectToken(X.COLON);
    const u = this.parseNamedType();
    return this.node(l, {
      kind: we.OPERATION_TYPE_DEFINITION,
      operation: r,
      type: u
    });
  }
  parseScalarTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("scalar");
    const u = this.parseName(),
      o = this.parseConstDirectives();
    return this.node(l, {
      kind: we.SCALAR_TYPE_DEFINITION,
      description: r,
      name: u,
      directives: o
    });
  }
  parseObjectTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("type");
    const u = this.parseName(),
      o = this.parseImplementsInterfaces(),
      f = this.parseConstDirectives(),
      d = this.parseFieldsDefinition();
    return this.node(l, {
      kind: we.OBJECT_TYPE_DEFINITION,
      description: r,
      name: u,
      interfaces: o,
      directives: f,
      fields: d
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements")
      ? this.delimitedMany(X.AMP, this.parseNamedType)
      : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(X.BRACE_L, this.parseFieldDefinition, X.BRACE_R);
  }
  parseFieldDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      u = this.parseName(),
      o = this.parseArgumentDefs();
    this.expectToken(X.COLON);
    const f = this.parseTypeReference(),
      d = this.parseConstDirectives();
    return this.node(l, {
      kind: we.FIELD_DEFINITION,
      description: r,
      name: u,
      arguments: o,
      type: f,
      directives: d
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(X.PAREN_L, this.parseInputValueDef, X.PAREN_R);
  }
  parseInputValueDef() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      u = this.parseName();
    this.expectToken(X.COLON);
    const o = this.parseTypeReference();
    let f;
    this.expectOptionalToken(X.EQUALS) && (f = this.parseConstValueLiteral());
    const d = this.parseConstDirectives();
    return this.node(l, {
      kind: we.INPUT_VALUE_DEFINITION,
      description: r,
      name: u,
      type: o,
      defaultValue: f,
      directives: d
    });
  }
  parseInterfaceTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("interface");
    const u = this.parseName(),
      o = this.parseImplementsInterfaces(),
      f = this.parseConstDirectives(),
      d = this.parseFieldsDefinition();
    return this.node(l, {
      kind: we.INTERFACE_TYPE_DEFINITION,
      description: r,
      name: u,
      interfaces: o,
      directives: f,
      fields: d
    });
  }
  parseUnionTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("union");
    const u = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseUnionMemberTypes();
    return this.node(l, {
      kind: we.UNION_TYPE_DEFINITION,
      description: r,
      name: u,
      directives: o,
      types: f
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(X.EQUALS)
      ? this.delimitedMany(X.PIPE, this.parseNamedType)
      : [];
  }
  parseEnumTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("enum");
    const u = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseEnumValuesDefinition();
    return this.node(l, {
      kind: we.ENUM_TYPE_DEFINITION,
      description: r,
      name: u,
      directives: o,
      values: f
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      X.BRACE_L,
      this.parseEnumValueDefinition,
      X.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription(),
      u = this.parseEnumValueName(),
      o = this.parseConstDirectives();
    return this.node(l, {
      kind: we.ENUM_VALUE_DEFINITION,
      description: r,
      name: u,
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
        `${Ku(this._lexer.token)} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    this.expectKeyword("input");
    const u = this.parseName(),
      o = this.parseConstDirectives(),
      f = this.parseInputFieldsDefinition();
    return this.node(l, {
      kind: we.INPUT_OBJECT_TYPE_DEFINITION,
      description: r,
      name: u,
      directives: o,
      fields: f
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(X.BRACE_L, this.parseInputValueDef, X.BRACE_R);
  }
  parseTypeSystemExtension() {
    const l = this._lexer.lookahead();
    if (l.kind === X.NAME)
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
      u = this.optionalMany(
        X.BRACE_L,
        this.parseOperationTypeDefinition,
        X.BRACE_R
      );
    if (r.length === 0 && u.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: we.SCHEMA_EXTENSION,
      directives: r,
      operationTypes: u
    });
  }
  parseScalarTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("scalar"));
    const r = this.parseName(),
      u = this.parseConstDirectives();
    if (u.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: we.SCALAR_TYPE_EXTENSION,
      name: r,
      directives: u
    });
  }
  parseObjectTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("type"));
    const r = this.parseName(),
      u = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      f = this.parseFieldsDefinition();
    if (u.length === 0 && o.length === 0 && f.length === 0)
      throw this.unexpected();
    return this.node(l, {
      kind: we.OBJECT_TYPE_EXTENSION,
      name: r,
      interfaces: u,
      directives: o,
      fields: f
    });
  }
  parseInterfaceTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("interface"));
    const r = this.parseName(),
      u = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      f = this.parseFieldsDefinition();
    if (u.length === 0 && o.length === 0 && f.length === 0)
      throw this.unexpected();
    return this.node(l, {
      kind: we.INTERFACE_TYPE_EXTENSION,
      name: r,
      interfaces: u,
      directives: o,
      fields: f
    });
  }
  parseUnionTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("union"));
    const r = this.parseName(),
      u = this.parseConstDirectives(),
      o = this.parseUnionMemberTypes();
    if (u.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: we.UNION_TYPE_EXTENSION,
      name: r,
      directives: u,
      types: o
    });
  }
  parseEnumTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("enum"));
    const r = this.parseName(),
      u = this.parseConstDirectives(),
      o = this.parseEnumValuesDefinition();
    if (u.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: we.ENUM_TYPE_EXTENSION,
      name: r,
      directives: u,
      values: o
    });
  }
  parseInputObjectTypeExtension() {
    const l = this._lexer.token;
    (this.expectKeyword("extend"), this.expectKeyword("input"));
    const r = this.parseName(),
      u = this.parseConstDirectives(),
      o = this.parseInputFieldsDefinition();
    if (u.length === 0 && o.length === 0) throw this.unexpected();
    return this.node(l, {
      kind: we.INPUT_OBJECT_TYPE_EXTENSION,
      name: r,
      directives: u,
      fields: o
    });
  }
  parseDirectiveDefinition() {
    const l = this._lexer.token,
      r = this.parseDescription();
    (this.expectKeyword("directive"), this.expectToken(X.AT));
    const u = this.parseName(),
      o = this.parseArgumentDefs(),
      f = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const d = this.parseDirectiveLocations();
    return this.node(l, {
      kind: we.DIRECTIVE_DEFINITION,
      description: r,
      name: u,
      arguments: o,
      repeatable: f,
      locations: d
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(X.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const l = this._lexer.token,
      r = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Tf, r.value)) return r;
    throw this.unexpected(l);
  }
  node(l, r) {
    return (
      this._options.noLocation !== !0 &&
        (r.loc = new FE(l, this._lexer.lastToken, this._lexer.source)),
      r
    );
  }
  peek(l) {
    return this._lexer.token.kind === l;
  }
  expectToken(l) {
    const r = this._lexer.token;
    if (r.kind === l) return (this.advanceLexer(), r);
    throw Rt(this._lexer.source, r.start, `Expected ${sg(l)}, found ${Ku(r)}.`);
  }
  expectOptionalToken(l) {
    return this._lexer.token.kind === l ? (this.advanceLexer(), !0) : !1;
  }
  expectKeyword(l) {
    const r = this._lexer.token;
    if (r.kind === X.NAME && r.value === l) this.advanceLexer();
    else
      throw Rt(this._lexer.source, r.start, `Expected "${l}", found ${Ku(r)}.`);
  }
  expectOptionalKeyword(l) {
    const r = this._lexer.token;
    return r.kind === X.NAME && r.value === l ? (this.advanceLexer(), !0) : !1;
  }
  unexpected(l) {
    const r = l ?? this._lexer.token;
    return Rt(this._lexer.source, r.start, `Unexpected ${Ku(r)}.`);
  }
  any(l, r, u) {
    this.expectToken(l);
    const o = [];
    for (; !this.expectOptionalToken(u);) o.push(r.call(this));
    return o;
  }
  optionalMany(l, r, u) {
    if (this.expectOptionalToken(l)) {
      const o = [];
      do o.push(r.call(this));
      while (!this.expectOptionalToken(u));
      return o;
    }
    return [];
  }
  many(l, r, u) {
    this.expectToken(l);
    const o = [];
    do o.push(r.call(this));
    while (!this.expectOptionalToken(u));
    return o;
  }
  delimitedMany(l, r) {
    this.expectOptionalToken(l);
    const u = [];
    do u.push(r.call(this));
    while (this.expectOptionalToken(l));
    return u;
  }
  advanceLexer() {
    const { maxTokens: l } = this._options,
      r = this._lexer.advance();
    if (
      r.kind !== X.EOF &&
      (++this._tokenCounter, l !== void 0 && this._tokenCounter > l)
    )
      throw Rt(
        this._lexer.source,
        r.start,
        `Document contains more that ${l} tokens. Parsing aborted.`
      );
  }
}
function Ku(a) {
  const l = a.value;
  return sg(a.kind) + (l != null ? ` "${l}"` : "");
}
function sg(a) {
  return PE(a) ? `"${a}"` : a;
}
function cS(a) {
  return `"${a.replace(fS, dS)}"`;
}
const fS = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function dS(a) {
  return hS[a.charCodeAt(0)];
}
const hS = [
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
  mS = Object.freeze({});
function yS(a, l, r = ag) {
  const u = new Map();
  for (const G of Object.values(we)) u.set(G, pS(l, G));
  let o,
    f = Array.isArray(a),
    d = [a],
    m = -1,
    y = [],
    p = a,
    v,
    b;
  const S = [],
    R = [];
  do {
    m++;
    const G = m === d.length,
      K = G && y.length !== 0;
    if (G) {
      if (
        ((v = R.length === 0 ? void 0 : S[S.length - 1]),
        (p = b),
        (b = R.pop()),
        K)
      )
        if (f) {
          p = p.slice();
          let $ = 0;
          for (const [se, ee] of y) {
            const H = se - $;
            ee === null ? (p.splice(H, 1), $++) : (p[H] = ee);
          }
        } else {
          p = { ...p };
          for (const [$, se] of y) p[$] = se;
        }
      ((m = o.index),
        (d = o.keys),
        (y = o.edits),
        (f = o.inArray),
        (o = o.prev));
    } else if (b) {
      if (((v = f ? m : d[m]), (p = b[v]), p == null)) continue;
      S.push(v);
    }
    let Z;
    if (!Array.isArray(p)) {
      var N, j;
      Dy(p) || es(!1, `Invalid AST Node: ${Ff(p)}.`);
      const $ = G
        ? (N = u.get(p.kind)) === null || N === void 0
          ? void 0
          : N.leave
        : (j = u.get(p.kind)) === null || j === void 0
          ? void 0
          : j.enter;
      if (((Z = $?.call(l, p, v, b, S, R)), Z === mS)) break;
      if (Z === !1) {
        if (!G) {
          S.pop();
          continue;
        }
      } else if (Z !== void 0 && (y.push([v, Z]), !G))
        if (Dy(Z)) p = Z;
        else {
          S.pop();
          continue;
        }
    }
    if ((Z === void 0 && K && y.push([v, p]), G)) S.pop();
    else {
      var Y;
      ((o = { inArray: f, index: m, keys: d, edits: y, prev: o }),
        (f = Array.isArray(p)),
        (d = f ? p : (Y = r[p.kind]) !== null && Y !== void 0 ? Y : []),
        (m = -1),
        (y = []),
        b && R.push(b),
        (b = p));
    }
  } while (o !== void 0);
  return y.length !== 0 ? y[y.length - 1][1] : a;
}
function pS(a, l) {
  const r = a[l];
  return typeof r == "object"
    ? r
    : typeof r == "function"
      ? { enter: r, leave: void 0 }
      : { enter: a.enter, leave: a.leave };
}
function Zf(a) {
  return yS(a, vS);
}
const gS = 80,
  vS = {
    Name: { leave: (a) => a.value },
    Variable: { leave: (a) => "$" + a.name },
    Document: {
      leave: (a) =>
        ye(
          a.definitions,
          `

`
        )
    },
    OperationDefinition: {
      leave(a) {
        const l = qe("(", ye(a.variableDefinitions, ", "), ")"),
          r = ye([a.operation, ye([a.name, l]), ye(a.directives, " ")], " ");
        return (r === "query" ? "" : r + " ") + a.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable: a, type: l, defaultValue: r, directives: u }) =>
        a + ": " + l + qe(" = ", r) + qe(" ", ye(u, " "))
    },
    SelectionSet: { leave: ({ selections: a }) => Sn(a) },
    Field: {
      leave({
        alias: a,
        name: l,
        arguments: r,
        directives: u,
        selectionSet: o
      }) {
        const f = qe("", a, ": ") + l;
        let d = f + qe("(", ye(r, ", "), ")");
        return (
          d.length > gS &&
            (d =
              f +
              qe(
                `(
`,
                ts(
                  ye(
                    r,
                    `
`
                  )
                ),
                `
)`
              )),
          ye([d, ye(u, " "), o], " ")
        );
      }
    },
    Argument: { leave: ({ name: a, value: l }) => a + ": " + l },
    FragmentSpread: {
      leave: ({ name: a, directives: l }) => "..." + a + qe(" ", ye(l, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition: a, directives: l, selectionSet: r }) =>
        ye(["...", qe("on ", a), ye(l, " "), r], " ")
    },
    FragmentDefinition: {
      leave: ({
        name: a,
        typeCondition: l,
        variableDefinitions: r,
        directives: u,
        selectionSet: o
      }) =>
        `fragment ${a}${qe("(", ye(r, ", "), ")")} on ${l} ${qe("", ye(u, " "), " ")}` +
        o
    },
    IntValue: { leave: ({ value: a }) => a },
    FloatValue: { leave: ({ value: a }) => a },
    StringValue: { leave: ({ value: a, block: l }) => (l ? JE(a) : cS(a)) },
    BooleanValue: { leave: ({ value: a }) => (a ? "true" : "false") },
    NullValue: { leave: () => "null" },
    EnumValue: { leave: ({ value: a }) => a },
    ListValue: { leave: ({ values: a }) => "[" + ye(a, ", ") + "]" },
    ObjectValue: { leave: ({ fields: a }) => "{" + ye(a, ", ") + "}" },
    ObjectField: { leave: ({ name: a, value: l }) => a + ": " + l },
    Directive: {
      leave: ({ name: a, arguments: l }) => "@" + a + qe("(", ye(l, ", "), ")")
    },
    NamedType: { leave: ({ name: a }) => a },
    ListType: { leave: ({ type: a }) => "[" + a + "]" },
    NonNullType: { leave: ({ type: a }) => a + "!" },
    SchemaDefinition: {
      leave: ({ description: a, directives: l, operationTypes: r }) =>
        qe(
          "",
          a,
          `
`
        ) + ye(["schema", ye(l, " "), Sn(r)], " ")
    },
    OperationTypeDefinition: {
      leave: ({ operation: a, type: l }) => a + ": " + l
    },
    ScalarTypeDefinition: {
      leave: ({ description: a, name: l, directives: r }) =>
        qe(
          "",
          a,
          `
`
        ) + ye(["scalar", l, ye(r, " ")], " ")
    },
    ObjectTypeDefinition: {
      leave: ({
        description: a,
        name: l,
        interfaces: r,
        directives: u,
        fields: o
      }) =>
        qe(
          "",
          a,
          `
`
        ) +
        ye(["type", l, qe("implements ", ye(r, " & ")), ye(u, " "), Sn(o)], " ")
    },
    FieldDefinition: {
      leave: ({
        description: a,
        name: l,
        arguments: r,
        type: u,
        directives: o
      }) =>
        qe(
          "",
          a,
          `
`
        ) +
        l +
        (Oy(r)
          ? qe(
              `(
`,
              ts(
                ye(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : qe("(", ye(r, ", "), ")")) +
        ": " +
        u +
        qe(" ", ye(o, " "))
    },
    InputValueDefinition: {
      leave: ({
        description: a,
        name: l,
        type: r,
        defaultValue: u,
        directives: o
      }) =>
        qe(
          "",
          a,
          `
`
        ) + ye([l + ": " + r, qe("= ", u), ye(o, " ")], " ")
    },
    InterfaceTypeDefinition: {
      leave: ({
        description: a,
        name: l,
        interfaces: r,
        directives: u,
        fields: o
      }) =>
        qe(
          "",
          a,
          `
`
        ) +
        ye(
          ["interface", l, qe("implements ", ye(r, " & ")), ye(u, " "), Sn(o)],
          " "
        )
    },
    UnionTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, types: u }) =>
        qe(
          "",
          a,
          `
`
        ) + ye(["union", l, ye(r, " "), qe("= ", ye(u, " | "))], " ")
    },
    EnumTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, values: u }) =>
        qe(
          "",
          a,
          `
`
        ) + ye(["enum", l, ye(r, " "), Sn(u)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description: a, name: l, directives: r }) =>
        qe(
          "",
          a,
          `
`
        ) + ye([l, ye(r, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description: a, name: l, directives: r, fields: u }) =>
        qe(
          "",
          a,
          `
`
        ) + ye(["input", l, ye(r, " "), Sn(u)], " ")
    },
    DirectiveDefinition: {
      leave: ({
        description: a,
        name: l,
        arguments: r,
        repeatable: u,
        locations: o
      }) =>
        qe(
          "",
          a,
          `
`
        ) +
        "directive @" +
        l +
        (Oy(r)
          ? qe(
              `(
`,
              ts(
                ye(
                  r,
                  `
`
                )
              ),
              `
)`
            )
          : qe("(", ye(r, ", "), ")")) +
        (u ? " repeatable" : "") +
        " on " +
        ye(o, " | ")
    },
    SchemaExtension: {
      leave: ({ directives: a, operationTypes: l }) =>
        ye(["extend schema", ye(a, " "), Sn(l)], " ")
    },
    ScalarTypeExtension: {
      leave: ({ name: a, directives: l }) =>
        ye(["extend scalar", a, ye(l, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: u }) =>
        ye(
          [
            "extend type",
            a,
            qe("implements ", ye(l, " & ")),
            ye(r, " "),
            Sn(u)
          ],
          " "
        )
    },
    InterfaceTypeExtension: {
      leave: ({ name: a, interfaces: l, directives: r, fields: u }) =>
        ye(
          [
            "extend interface",
            a,
            qe("implements ", ye(l, " & ")),
            ye(r, " "),
            Sn(u)
          ],
          " "
        )
    },
    UnionTypeExtension: {
      leave: ({ name: a, directives: l, types: r }) =>
        ye(["extend union", a, ye(l, " "), qe("= ", ye(r, " | "))], " ")
    },
    EnumTypeExtension: {
      leave: ({ name: a, directives: l, values: r }) =>
        ye(["extend enum", a, ye(l, " "), Sn(r)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name: a, directives: l, fields: r }) =>
        ye(["extend input", a, ye(l, " "), Sn(r)], " ")
    }
  };
function ye(a, l = "") {
  var r;
  return (r = a?.filter((u) => u).join(l)) !== null && r !== void 0 ? r : "";
}
function Sn(a) {
  return qe(
    `{
`,
    ts(
      ye(
        a,
        `
`
      )
    ),
    `
}`
  );
}
function qe(a, l, r = "") {
  return l != null && l !== "" ? a + l + r : "";
}
function ts(a) {
  return qe(
    "  ",
    a.replace(
      /\n/g,
      `
  `
    )
  );
}
function Oy(a) {
  var l;
  return (l = a?.some((r) =>
    r.includes(`
`)
  )) !== null && l !== void 0
    ? l
    : !1;
}
class bS {
  constructor(l) {
    this.defaultRetryPolicy = l;
  }
  applyRetry(l, r) {
    return this.retry(l, r || this.defaultRetryPolicy);
  }
  async retry(l, r) {
    const u = Date.now();
    let o = 0,
      f = await l(),
      d = { attempt: o, totalElapsedMs: Date.now() - u, lastResult: f };
    for (; await r.shouldRetry(f, d);) {
      const m = await r.calculateDelay(f, d);
      (await this.delay(m),
        r.prepareRetry && (await r.prepareRetry(f, d)),
        o++,
        (f = await l()),
        (d = { attempt: o, totalElapsedMs: Date.now() - u, lastResult: f }));
    }
    return f;
  }
  delay(l) {
    return new Promise((r) => {
      setTimeout(r, l);
    });
  }
}
class ES {}
function SS(a) {
  return { version: "1.0", service: new bS(a), type: "retry" };
}
const { stringify: TS, parse: RS } = JSON;
function If(a) {
  const l = TS(a);
  return l ? RS(l) : void 0;
}
class Ar {
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
    const u = this.baseCache.get(l);
    return (u === void 0 && this.missingKeysRead.add(l), r?.copy ? If(u) : u);
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
    return new Ar(this);
  }
  filter(l) {
    return new Dr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new _r(this, l);
  }
}
class Dr {
  constructor(l, r) {
    ((this.baseCache = l), (this.predicate = r));
  }
  delete(l) {
    this.baseCache.delete(l);
  }
  get(l, r) {
    const u = this.baseCache.get(l);
    if (u && this.predicate(l, u)) return r?.copy ? If(u) : u;
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
    return new Ar(this);
  }
  filter(l) {
    return new Dr(this, l);
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
    return new _r(this, l);
  }
}
class _r {
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
    return new Ar(this);
  }
  filter(l) {
    return new Dr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new _r(this, l);
  }
}
class CS {
  constructor() {
    this.data = {};
  }
  get(l, r) {
    return r?.copy ? If(this.data[l]) : this.data[l];
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
    return new Ar(this);
  }
  filter(l) {
    return new Dr(this, l);
  }
  buildFixedTimeWritableCache(l) {
    return new _r(this, l);
  }
}
function NS() {
  return { type: "cache", version: "1.0", service: new CS() };
}
class Kf {
  constructor(l, r, u) {
    ((this.services = l),
      (this.config = r),
      (this.requestRunner = u),
      (this.filteredCache = this.services.cache.filter((o, f) => {
        const { cacheControl: d } = f.metadata;
        return !this.expiredChecks.some((m) => m(d));
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
class wS extends Kf {
  execute() {
    const l = this.filteredCache;
    return new Promise(async (r, u) => {
      try {
        let o = Un(void 0);
        for await (const f of this.requestRunner.requestFromNetwork()) {
          if (f) {
            const d = await this.services.cacheInclusionPolicy.write({
              l1: l,
              writeToL1: (m) => this.requestRunner.writeToCache(m, f)
            });
            if (d.isErr()) return r(d);
          }
          ((o = await this.services.cacheInclusionPolicy.read({
            l1: l,
            readFromL1: (d) => this.requestRunner.readFromCache(d)
          })),
            o.isOk() && r(o));
        }
        return r(o);
      } catch (o) {
        return u(o);
      }
    });
  }
}
class AS extends Kf {
  execute(l) {
    const r = this.services.instrumentation
      ? this.services.instrumentation.currentTimeMs()
      : 0;
    return this.services.cacheInclusionPolicy
      .read({
        l1: this.filteredCache,
        readFromL1: (u) => this.requestRunner.readFromCache(u)
      })
      .then((u) => {
        if (u.isOk())
          return (
            this.collectCacheHitInstrumentation(
              r,
              l?.instrumentationAttributes
            ),
            Un(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = this.filteredCache;
        return new Promise(async (f, d) => {
          try {
            let m = Un(void 0);
            for await (const y of this.requestRunner.requestFromNetwork()) {
              if (y) {
                const p = await this.services.cacheInclusionPolicy.write({
                  l1: o,
                  writeToL1: (v) => this.requestRunner.writeToCache(v, y)
                });
                if (p.isErr()) return f(zn(p.error));
              }
              ((m = await this.services.cacheInclusionPolicy.read({
                l1: o,
                readFromL1: (p) => this.requestRunner.readFromCache(p)
              })),
                m.isOk() && f(Un(void 0)));
            }
            return f(m);
          } catch (m) {
            return d(m);
          }
        });
      });
  }
  collectCacheHitInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const u = this.services.instrumentation.metrics.getMeter("onestore");
      (u.createCounter("command.max-age.cache-hit.count").add(1, r),
        u
          .createHistogram("command.max-age.cache-hit.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
  collectCacheMissInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const u = this.services.instrumentation.metrics.getMeter("onestore");
      (u.createCounter("command.max-age.cache-miss.count").add(1, r),
        u
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
class DS extends Kf {
  execute(l) {
    const r = this.services.instrumentation
      ? this.services.instrumentation.currentTimeMs()
      : 0;
    return this.services.cacheInclusionPolicy
      .read({
        l1: this.filteredCache,
        readFromL1: (u) => this.requestRunner.readFromCache(u)
      })
      .then((u) => {
        if (u.isOk())
          return (
            this.collectCacheHitInstrumentation(
              r,
              l?.instrumentationAttributes
            ),
            Un(void 0)
          );
        this.collectCacheMissInstrumentation(r, l?.instrumentationAttributes);
        const o = new $p(
          new _E(Jp.GatewayTimeout, {
            error: "Cache miss for only-if-cached request"
          })
        );
        return zn(o);
      });
  }
  get expiredChecks() {
    return [...super.expiredChecks, (l) => l.type === "no-cache"];
  }
  collectCacheHitInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const u = this.services.instrumentation.metrics.getMeter("onestore");
      (u.createCounter("command.only-if-cached.cache-hit.count").add(1, r),
        u
          .createHistogram("command.only-if-cached.cache-hit.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
  collectCacheMissInstrumentation(l, r) {
    if (this.services.instrumentation) {
      const u = this.services.instrumentation.metrics.getMeter("onestore");
      (u.createCounter("command.only-if-cached.cache-miss.count").add(1, r),
        u
          .createHistogram("command.only-if-cached.cache-miss.duration")
          .record(this.services.instrumentation.currentTimeMs() - l, r));
    }
  }
}
class _S {
  constructor(l) {
    this.services = l;
  }
  execute(l, r, u) {
    return this.getCacheControlStrategy(l, r).execute(u);
  }
  getCacheControlStrategy(l, r) {
    if (l.type === "max-age") return new AS(this.services, l, r);
    if (l.type === "no-cache") return new wS(this.services, l, r);
    if (l.type === "only-if-cached") return new DS(this.services, l, r);
    throw new Error(`Unknown cache control strategy ${l.type}`);
  }
  async *find(l) {
    yield* this.services.cacheInclusionPolicy.find(l);
  }
  async *findAndModify(l, r) {
    yield* this.services.cacheInclusionPolicy.findAndModify(l, r);
  }
}
function OS(a, l, r) {
  return {
    type: "cacheController",
    version: "1.0",
    service: new _S({ cache: a, cacheInclusionPolicy: l, instrumentation: r })
  };
}
class MS {}
let xS = class {
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
const qc = (a) => new xS(a);
function si(a) {
  return og(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return si(l(a));
          } catch (u) {
            return l === void 0 ? si(a) : Rf(u);
          }
        }
      };
}
function Rf(a) {
  return og(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return si(r(a));
            } catch (u) {
              return Rf(u);
            }
          return Rf(a);
        }
      };
}
function og(a) {
  return typeof a?.then == "function";
}
const zS = (a) => "$and" in a,
  US = (a) => "$or" in a,
  LS = (a) => "$not" in a,
  jS = (a, l) => {
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
function ns(a) {
  return (l, r) => {
    if (!a) return !1;
    if (zS(a)) return a.$and.every((u) => ns(u)(l, r));
    if (US(a)) return a.$or.some((u) => ns(u)(l, r));
    if (LS(a)) return !ns(a.$not)(l, r);
    if ("key" in a) return BS(a.key, l);
    if ("metadata" in a) return jS(a.metadata, r.metadata.cacheControl);
    if ("value" in a) return !1;
    throw new Error("Unknown Query Operation");
  };
}
function BS(a, l) {
  return "$regex" in a ? a.$regex.test(l) : !1;
}
function kS(a, l) {
  switch (a.type) {
    case "invalidate": {
      const r = HS(l.metadata.cacheControl);
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
function HS(a) {
  switch (a.type) {
    case "max-age":
    case "stale-while-revalidate":
      if (a.maxAge !== 0) return { ...a, maxAge: 0 };
      break;
  }
}
class qS extends MS {
  constructor(l) {
    (super(), (this.services = l));
  }
  read(l) {
    const { l1: r, readFromL1: u } = l;
    return u(r);
  }
  write(l) {
    const { l1: r, writeToL1: u } = l;
    return u(r);
  }
  async *find(l) {
    const r = this.services.cache,
      u = ns(l),
      o = r.filter(u).entries();
    for (const f of o) yield f;
  }
  async *findAndModify(l, r) {
    const u = this.services.cache;
    for await (const [o, f] of this.find(l)) {
      const d = kS(r, f);
      switch (d.type) {
        case "entry":
          (this.write({ l1: u, writeToL1: (m) => si(qc(m.set(o, d.entry))) }),
            yield o);
          break;
        case "metadata":
          (this.write({
            l1: u,
            writeToL1: (m) => si(qc(m.setMetadata(o, d.metadata)))
          }),
            yield o);
          break;
        case "delete":
          (this.write({ l1: u, writeToL1: (m) => si(qc(m.delete(o))) }),
            yield o);
          break;
      }
    }
  }
}
function VS(a) {
  return {
    service: new qS({ cache: a }),
    type: "cacheInclusionPolicy",
    version: "1.0"
  };
}
const YS = Symbol("EventTypeWildcard");
class GS {
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
          this.subscriptions.get(l.type).filter((u) => u !== l)
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
        Qf(f) && r.push(f);
      }),
      r.length > 0 ? Promise.all(r).then(() => {}) : Ct(void 0)
    );
  }
  getSubscriptions(l) {
    const r = this.subscriptions.get(l.type),
      u = this.subscriptions.get(YS);
    if (r === void 0 && u === void 0) return [];
    let o = [];
    return (
      r !== void 0 &&
        (o = r.filter((f) => (f.predicate ? f.predicate(l) : !0))),
      (o = [...o, ...(u || [])]),
      o
    );
  }
}
function QS() {
  return { type: "pubSub", version: "1.0", service: new GS() };
}
class FS {}
const { isArray: My } = Array;
class XS {
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
class ZS {
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
const ri = (a) => new XS(a),
  gr = (a) => new ZS(a);
function cl(a, l, r) {
  return a.isOk()
    ? ri({ data: a.value, subscribe: l, refresh: r })
    : gr({ failure: a.error, subscribe: l, refresh: r });
}
function ls(a) {
  return cg(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          try {
            return ls(l(a));
          } catch (u) {
            return l === void 0 ? ls(a) : Cf(u);
          }
        }
      };
}
function Cf(a) {
  return cg(a)
    ? a.then((l) => l)
    : {
        then: (l, r) => {
          if (typeof r == "function")
            try {
              return ls(r(a));
            } catch (u) {
              return Cf(u);
            }
          return Cf(a);
        }
      };
}
function cg(a) {
  return typeof a?.then == "function";
}
function Nf(a, l) {
  if (a === void 0) return l === void 0;
  if (a === null) return l === null;
  if (l === null) return a === null;
  if (My(a)) {
    if (!My(l) || a.length !== l.length) return !1;
    for (let r = 0; r < a.length; ++r) if (!Nf(a[r], l[r])) return !1;
    return !0;
  } else if (typeof a == "object") {
    if (typeof l != "object") return !1;
    const r = Object.keys(a),
      u = Object.keys(l);
    if (r.length !== u.length) return !1;
    for (let o = 0; o < r.length; ++o) {
      const f = r[o];
      if (!Nf(a[f], l[f])) return !1;
    }
    return !0;
  }
  return a === l;
}
function Vc(a, l) {
  if (a.size > l.size) {
    for (const r of l.keys()) if (a.has(r)) return !0;
  } else for (const r of a) if (l.has(r)) return !0;
  return !1;
}
class IS {
  constructor(l, r, u) {
    ((this.readFromCacheInternal = l),
      (this.requestFromNetworkInternal = r),
      (this.writeToCacheInternal = u));
  }
  readFromCache(l) {
    return this.readFromCacheInternal(l).then((u) =>
      u.isErr() ? gr(u.error.failure) : ((this.returnData = u), ri(void 0))
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
class KS extends FS {
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
    const r = JS(this.cacheControlStrategyConfig, l),
      u = this.buildRequestRunner();
    return this.services.cacheController
      .execute(r, u, {
        instrumentationAttributes: this.instrumentationAttributes
      })
      .then((f) =>
        this.handleCacheControllerResult(f, u).then(
          (d) => (
            this.lastResult === void 0 &&
              (d.isErr()
                ? (this.lastResult = { type: "error", error: d.error.failure })
                : (this.lastResult = { type: "data", data: d.value.data })),
            d
          )
        )
      );
  }
  handleCacheControllerResult(l, r) {
    const { networkError: u, networkData: o, returnData: f } = r;
    return this.publishUpdatedKeys().then(() =>
      u
        ? cl(u, this.buildSubscribe(), () => this.refresh())
        : l.isErr()
          ? o
            ? cl(o, this.buildSubscribe(), () => this.refresh())
            : cl(l, this.buildSubscribe(), () => this.refresh())
          : f === void 0
            ? o
              ? cl(o, this.buildSubscribe(), () => this.refresh())
              : cl(
                  gr(new Error("Cache miss after fetching from network")),
                  this.buildSubscribe(),
                  () => this.refresh()
                )
            : (this.subscriptions.length > 0 && this.subscribe(), f)
    );
  }
  buildRequestRunner() {
    return new IS(
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
      : ls(void 0);
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
        predicate: (f) => Vc(f.data, this.keysUsed),
        callback: () =>
          this.rerun({ now: this.instantiationTime }).then(() => {}),
        keys: this.keysUsed
      }),
      u = l.subscribe({
        type: "cacheInvalidation",
        predicate: (f) => Vc(f.data, this.keysUsed),
        callback: () => this.rerun().then(() => {}),
        keys: this.keysUsed
      }),
      o = l.subscribe({
        type: "cacheEviction",
        predicate: (f) => Vc(f.data, this.keysUsed),
        callback: () => this.rerun().then(() => {}),
        keys: this.keysUsed
      });
    this.unsubscribers.push(r, u, o);
  }
  unsubscribe() {
    for (; this.unsubscribers.length > 0;) {
      const l = this.unsubscribers.pop();
      l?.();
    }
  }
  equals(l, r) {
    return Nf(l, r);
  }
  async afterRequestHooks(l) {}
  refresh() {
    return this.rerun({ cacheControlConfig: { type: "no-cache" } }).then((l) =>
      l.isErr() ? gr(l.error.failure) : ri(void 0)
    );
  }
  writeToCacheAndRecordKeys(l, r) {
    const u = l.record();
    return this.writeToCache(u, r).then(
      (o) => (
        (this.instantiationTime = Date.now() / 1e3),
        (this.keysUpdated = u.keysUpdated),
        ri(o)
      )
    );
  }
  buildResultWithSubscribe(l) {
    const r = l.record();
    return this.readFromCache(r).then((o) => {
      if (o.isErr()) return cl(o, this.buildSubscribe(), () => this.refresh());
      {
        const f = o.value;
        return (
          (this.keysUsed = r.keysRead),
          cl(ri(f), this.buildSubscribe(), () => this.refresh())
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
              this.invokeConsumerCallbacks(gr(r.error.failure)),
              r)
            : ((this.lastResult === void 0 ||
                this.lastResult.type === "error" ||
                !this.equals(this.lastResult.data, r.value.data)) &&
                ((this.lastResult = { type: "data", data: r.value.data }),
                this.invokeConsumerCallbacks(ri(r.value.data))),
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
function JS(a, l) {
  if (!l) return a;
  const r = l.now ?? a.now;
  return l.cacheControlConfig
    ? { ...l.cacheControlConfig, now: r }
    : { ...a, now: r };
}
class $S extends KS {
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
      return Ct(zn(cr(l)));
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
    return cr(l.statusText);
  }
  processFetchReturnValue(l) {
    return Un(l);
  }
  convertFetchResponseToData(l) {
    return l.then(
      (r) => {
        if (r.ok) {
          let u;
          return (
            this.isSemanticNullResponse(r)
              ? (u = Promise.resolve(Un(null)))
              : this.isUndeclaredNoBodyResponse(r)
                ? (u = Promise.resolve(
                    zn(
                      cr(
                        `Unexpected ${r.status} response: no-content status was not declared in the API specification. Declare this response in your OAS without a content property.`
                      )
                    )
                  ))
                : (u = r.json().then(
                    (o) => this.processFetchReturnValue(o),
                    (o) => zn(cr(o))
                  )),
            u.finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            })
          );
        } else
          return this.coerceError(r)
            .then((u) => zn(u))
            .finally(() => {
              try {
                this.afterRequestHooks({ statusCode: r.status });
              } catch {}
            });
      },
      (r) => zn(cr(r))
    );
  }
}
function PS(a) {
  return (l) => {
    const [r, u] = l;
    if (typeof r == "string" && !r.startsWith("http")) {
      const o = r.startsWith("/") ? r : `/${r}`;
      return Ct([`${a}${o}`, u]);
    }
    return Ct(l);
  };
}
function WS(a) {
  return (l) => Ct(Sr("Authorization", `Bearer ${a}`, l));
}
function eT(a, l) {
  const r = [];
  return (a && r.push(PS(a)), l && r.push(WS(l)), Pp({ request: r }).service);
}
const tT = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Chatter-Entity-Encoding": "false"
};
function nT(a) {
  if (a instanceof Headers) {
    const l = [];
    return (a.forEach((r, u) => l.push([u, r])), l);
  }
  return Array.isArray(a) ? a.map(([l, r]) => [l, r]) : Object.entries(a);
}
function fg(a, l) {
  if (l === void 0) return { ...a };
  const r = { ...a },
    u = new Map();
  for (const f of Object.keys(r)) u.set(f.toLowerCase(), f);
  const o = new Set();
  for (const [f, d] of nT(l)) {
    const m = f.toLowerCase(),
      y = u.get(m);
    y === void 0
      ? ((r[f] = d), u.set(m, f), o.add(m))
      : o.has(m)
        ? (r[y] = `${r[y]}, ${d}`)
        : ((r[y] = d), o.add(m));
  }
  return r;
}
function dg(a) {
  return fg(tT, a);
}
function aT(a) {
  if (a === void 0) return;
  const l = {};
  return (
    new Headers(a).forEach((r, u) => {
      l[u] = r;
    }),
    Object.keys(l).length > 0 ? l : void 0
  );
}
const lT = 512;
function iT(a) {
  return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
class xy extends Error {
  status;
  url;
  constructor(l) {
    const r =
        l.body.length === 0
          ? "empty response body"
          : "unparseable response body",
      u =
        l.body.length === 0
          ? ""
          : ` (starts with: ${JSON.stringify(iT(l.body.slice(0, lT)))})`;
    (super(
      `${l.surface} GraphQL request to ${l.url} returned HTTP ${l.status} with an ${r}${u}. Expected a JSON GraphQL response; the transport (proxy/gateway/auth) likely did not return one.`
    ),
      (this.name = "GraphQLTransportError"),
      (this.status = l.status),
      (this.url = l.url),
      (this.cause = l.cause));
  }
}
async function hg(a, l, r) {
  const u = await a.text();
  let o;
  try {
    o = JSON.parse(u);
  } catch (f) {
    throw new xy({ surface: l, url: r, status: a.status, body: u, cause: f });
  }
  if (o === null || typeof o != "object")
    throw new xy({
      surface: l,
      url: r,
      status: a.status,
      body: u,
      cause: new Error("Parsed GraphQL response body was not a JSON object")
    });
  return o;
}
const is = () => {},
  wf = async () => {};
function Jf(a) {
  try {
    return Un(sS(a));
  } catch (l) {
    return zn(ml(l));
  }
}
function $f(a, l) {
  const r = a.definitions.filter((u) => u.kind === "OperationDefinition");
  return r.length === 0
    ? "unknown"
    : r.length === 1
      ? l === void 0 || r[0].name?.value === l
        ? r[0].operation
        : "unknown"
      : l === void 0
        ? "unknown"
        : (r.find((u) => u.name?.value === l)?.operation ?? "unknown");
}
function ml(a) {
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
async function mg(
  a,
  { mutation: l, variables: r, operationName: u, headers: o }
) {
  const f = Jf(l);
  if (f.isErr()) return { data: void 0, errors: f.error };
  const d = f.value,
    m = $f(d, u);
  if (m !== "mutation")
    return {
      data: void 0,
      errors: [
        {
          message: `DataSDK.graphql.mutate() requires a GraphQL mutation, received ${m}.`
        }
      ]
    };
  try {
    const y = await a({
      query: Zf(d),
      variables: r,
      operationName: u,
      headers: o
    });
    return { data: y.data ?? void 0, errors: y.errors };
  } catch (y) {
    return { data: void 0, errors: ml(y) };
  }
}
function yg(a) {
  function l(u, o, f, d) {
    return a({ query: Zf(u), variables: o, operationName: f, headers: d }).then(
      (m) => ({ data: m.data ?? void 0, errors: m.errors }),
      (m) => ({ data: void 0, errors: ml(m) })
    );
  }
  async function r({ query: u, variables: o, operationName: f, headers: d }) {
    const m = Jf(u);
    if (m.isErr())
      return {
        data: void 0,
        errors: m.error,
        subscribe: () => is,
        refresh: wf
      };
    const y = m.value,
      p = $f(y, f);
    if (p !== "query")
      return {
        data: void 0,
        errors: [
          {
            message: `DataSDK.graphql.query() requires a GraphQL query, received ${p}.`
          }
        ],
        subscribe: () => is,
        refresh: wf
      };
    const v = new Set(),
      b = o,
      S = await l(y, b, f, d);
    return {
      data: S.data,
      errors: S.errors,
      subscribe(R) {
        return (
          v.add(R),
          () => {
            v.delete(R);
          }
        );
      },
      async refresh() {
        const R = await l(y, b, f, d);
        for (const N of v) N(R);
      }
    };
  }
  return { query: r, mutate: (u) => mg(a, u) };
}
const rT = "65.0";
function pg(a = rT) {
  return `/services/data/v${a}`;
}
const uT = { "Content-Type": "application/json", Accept: "application/json" };
class sT {
  clientFetch;
  pathData;
  graphql;
  constructor(l) {
    const r = oT(),
      u = cT(l?.instanceUrl ?? r.instanceUrl),
      o = l?.accessToken ?? r.accessToken;
    ((this.pathData = pg(l?.apiVersion ?? r.apiVersion)),
      (this.clientFetch = eT(u || void 0, o)),
      (this.graphql = yg(this.executeRawGraphQL.bind(this))));
  }
  async executeRawGraphQL({
    query: l,
    variables: r,
    operationName: u,
    headers: o
  }) {
    const f = `${this.pathData}/graphql`,
      d = await this.clientFetch(f, {
        method: "POST",
        body: JSON.stringify({ query: l, variables: r, operationName: u }),
        headers: fg(uT, o)
      });
    return hg(d, "Mosaic", f);
  }
}
function oT() {
  const a = globalThis.MOSAIC_ENV;
  return {
    instanceUrl: a?.instanceUrl,
    accessToken: a?.accessToken,
    apiVersion: a?.apiVersion
  };
}
function cT(a) {
  if (!a || a === "/") return "";
  let l = a;
  return (
    !l.startsWith("/") && !l.startsWith("http") && (l = `/${l}`),
    l.endsWith("/") && (l = l.slice(0, -1)),
    l
  );
}
const fT = "graphqlQuery";
class dT {
  graphql;
  constructor() {
    this.graphql = yg(this.executeRawGraphQL.bind(this));
  }
  async executeRawGraphQL({ query: l, variables: r, operationName: u }) {
    return (
      await window.openai.callTool(fT, {
        query: l,
        ...(r != null ? { variables: r } : {}),
        ...(u != null ? { operationName: u } : {})
      })
    ).structuredContent;
  }
}
const Yc = "Accept-Language",
  hT = (a) => {
    const l = globalThis.SFDC_ENV?.language;
    if (!l) return Ct(a);
    const [r, u] = a;
    return (
      r instanceof Request && !u?.headers
        ? r.headers.has(Yc)
        : new Headers(u?.headers).has(Yc)
    )
      ? Ct(a)
      : Ct(Sr(Yc, l, a));
  },
  mT = "X-SFDC-Client-Name",
  yT = "X-SFDC-Client-Version",
  pT = "@salesforce/platform-sdk",
  gT = "11.68.0",
  vT = (a) => {
    let l = Sr(mT, pT, a);
    return ((l = Sr(yT, gT, l)), Ct(l));
  },
  bT = "X-CSRF-Token";
function ET(a, l = {}) {
  const { protectedUrls: r = [], alwaysProtectedUrls: u = [] } = l;
  return async (o) => {
    const [f, d] = o,
      m = f instanceof Request ? f.url : f instanceof URL ? f.href : f,
      y = d?.method ?? (f instanceof Request ? f.method : void 0) ?? "GET";
    if (zy(u, m) || (ST(y) && zy(r, m))) {
      const p = await a.getToken();
      o = Sr(bT, p, o);
    }
    return Ct(o);
  };
}
function ST(a) {
  const l = a.toLowerCase();
  return l === "post" || l === "put" || l === "patch" || l === "delete";
}
function zy(a, l) {
  const r = new URL(l, globalThis.location?.href ?? "http://localhost");
  return a.some((u) => r.pathname.includes(u));
}
function TT(a, l = {}) {
  const r = ET(a, l);
  async function u(o) {
    const f = await r(o);
    return fetch(f[0], f[1]);
  }
  return (o, f) => (f ? f.applyRetry(async () => u(o)) : u(o));
}
const RT = [400, 401, 403];
class CT extends ES {
  constructor(l) {
    (super(l), (this.csrfTokenManager = l));
  }
  async shouldRetry(l, r) {
    return r.attempt >= 1 ? !1 : RT.includes(l.status);
  }
  async calculateDelay(l, r) {
    return 0;
  }
  async prepareRetry(l, r) {
    await this.csrfTokenManager.refreshToken();
  }
}
class NT {
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
    const u = (await l.clone().json()).csrfToken;
    return (r && (await this.withCache((o) => o.put(this.endpoint, l))), u);
  }
  async withCache(l) {
    if (this.cacheName && caches) {
      const r = await caches.open(this.cacheName);
      return l(r);
    } else return;
  }
}
const Uy = new Map();
function wT(a) {
  const { endpoint: l, cacheName: r, ...u } = a.csrf;
  let o = Uy.get(l);
  return (
    o || ((o = new NT(l, r)), Uy.set(l, o)),
    Pp({ retry: TT(o, u), request: [vT, hT] }, SS(new CT(o)).service).service
  );
}
const Ly = new Map();
function AT(a) {
  let l = Ly.get(a);
  if (!l) {
    const r = NS().service,
      u = VS(r).service,
      o = OS(r, u).service,
      f = QS().service;
    ((l = { cache: r, cacheController: o, pubSub: f }), Ly.set(a, l));
  }
  return l;
}
function DT(a, l) {
  const r = AT(a);
  return {
    shared: r,
    services: { cacheController: r.cacheController, pubSub: r.pubSub, fetch: l }
  };
}
const jy = 300;
function _T(a, l) {
  try {
    return JSON.parse(JSON.stringify(a));
  } catch (r) {
    const u = l || "(anonymous)",
      o = new TypeError(
        `HttpGraphQLResourceCacheControlCommand: variables for operation "${u}" must be JSON-serializable. ${r.message}`
      );
    throw ((o.cause = r), o);
  }
}
function OT(a) {
  if (typeof a == "object" && a.type === "max-age") {
    const l = a.maxAge;
    return Number.isFinite(l) && l >= 0 ? l : jy;
  }
  return jy;
}
class MT extends $S {
  constructor(l, r, u) {
    (super(r),
      (this.url = u),
      (this.query = l.query),
      (this.normalizedOperationName = l.operationName ?? ""),
      (this.normalizedVariables = _T(
        l.variables ?? {},
        this.normalizedOperationName
      )),
      (this.cacheControl = l.cacheControl),
      (this.resolvedMaxAge = OT(l.cacheControl)),
      (this.headers = l.headers),
      (this.headersKey = aT(l.headers)));
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
        headers: dg(this.headers),
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
    return (this.headersKey !== void 0 && (l.headers = this.headersKey), bf(l));
  }
  readFromCache(l) {
    const r = this.buildKey(),
      u = l.get(r)?.value;
    return Ct(u === void 0 ? zn(new AE()) : Un(u));
  }
  writeToCache(l, r) {
    if (
      r.isOk() &&
      r.value.data != null &&
      Object.keys(r.value.data).length > 0
    ) {
      const u = Math.floor(Date.now() / 1e3);
      l.set(this.buildKey(), {
        value: r.value.data,
        metadata: {
          cacheControl: {
            type: "max-age",
            maxAge: this.resolvedMaxAge,
            generatedTime: u
          }
        }
      });
    }
    return Ct(void 0);
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
    return this.responseHasErrors(l) ? zn(new $p(l)) : Un(l);
  }
}
function gg(a) {
  if (OE(a) && a.data && typeof a.data == "object") {
    const l = a.data;
    if (l.data != null) return l.data;
  }
}
function xT(a) {
  return (l) => {
    if (l.isOk()) {
      const r = l.value;
      (oi(r), a({ data: r, errors: void 0 }));
    } else {
      const r = gg(l.error);
      (r && oi(r), a({ data: r, errors: ml(l.error) }));
    }
  };
}
async function zT(a) {
  let l, r, u;
  try {
    const o = await a.execute();
    o.isOk()
      ? ((l = o.value.data), oi(l), (u = (f) => o.value.subscribe(f)))
      : ((l = gg(o.error.failure)),
        l && oi(l),
        (r = ml(o.error.failure)),
        (u = (f) => o.error.subscribe(f)));
  } catch (o) {
    r = ml(o);
  }
  return {
    data: l,
    errors: r,
    subscribe(o) {
      return u ? u(xT(o)) : is;
    },
    async refresh() {
      await a.refresh();
    }
  };
}
function Gc(a) {
  return { data: void 0, errors: a, subscribe: () => is, refresh: wf };
}
function UT({ bundle: a, url: l, executeRaw: r }) {
  const { services: u } = a;
  async function o({
    query: f,
    variables: d,
    operationName: m,
    cacheControl: y,
    headers: p
  }) {
    const v = Jf(f);
    if (v.isErr()) return Gc(v.error);
    const b = v.value,
      S = $f(b, m);
    if (S !== "query")
      return Gc([
        {
          message: `DataSDK.graphql.query() requires a GraphQL query, received ${S}.`
        }
      ]);
    let R;
    try {
      R = new MT(
        {
          query: Zf(b),
          variables: d,
          operationName: m,
          cacheControl: y,
          headers: p
        },
        u,
        l
      );
    } catch (N) {
      return Gc(ml(N));
    }
    return zT(R);
  }
  return { query: o, mutate: (f) => mg(r, f) };
}
const LT = 1,
  jT = `@salesforce/platform-sdk-data_v${LT}`;
class BT {
  baseUrl;
  pathData;
  clientFetch;
  onStatus;
  graphql;
  constructor(l) {
    const r = kT();
    ((this.baseUrl = HT(l?.basePath ?? r.apiPath)),
      (this.pathData = pg(l?.apiVersion)));
    const u = `${this.pathData}/ui-api`,
      o = `${this.pathData}/graphql`;
    ((this.onStatus = l?.onStatus ?? {}),
      (this.clientFetch = wT({
        csrf: {
          endpoint: `${this.baseUrl}${u}/session/csrf`,
          cacheName: jT,
          protectedUrls: ["services/data/v", "services/apexrest"],
          alwaysProtectedUrls: ["services/apexrest"]
        }
      })));
    const f = (m, y) => this.fetch(m, y),
      d = DT(`${this.baseUrl}${this.pathData}`, f);
    this.graphql = UT({
      bundle: d,
      url: o,
      executeRaw: this.executeRawGraphQL.bind(this)
    });
  }
  async fetch(l, r) {
    const u = this.applySalesforceBase(l),
      o = await this.clientFetch(u, r);
    return (await this.onStatus[o.status]?.(), o);
  }
  async executeRawGraphQL({
    query: l,
    variables: r,
    operationName: u,
    headers: o
  }) {
    const f = `${this.pathData}/graphql`,
      d = await this.fetch(f, {
        method: "POST",
        body: JSON.stringify({ query: l, variables: r, operationName: u }),
        headers: dg(o)
      });
    return hg(d, "WebApp", f);
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
function kT() {
  return { apiPath: globalThis.SFDC_ENV?.apiPath };
}
function HT(a) {
  if (!a || a === "/") return "";
  let l = a;
  return (
    l.startsWith("/") || (l = `/${l}`),
    l.endsWith("/") && (l = l.slice(0, -1)),
    l
  );
}
function qT(a) {
  const l = typeof a == "object" && a !== null && "setup" in a,
    r = l ? a : a.extension,
    u = l ? r?.name : a.as;
  if (typeof r?.setup != "function")
    throw new Error(
      "Extension entry cannot attach: it is missing a setup function."
    );
  if (typeof u != "string" || u.length === 0)
    throw new Error(
      l
        ? 'Extension entry cannot attach: "name" must be a non-empty string.'
        : 'Extension entry cannot attach: alias "as" must be a non-empty string.'
    );
  return { extension: r, mountName: u };
}
async function VT(a, l) {
  if (l.length === 0) return a;
  if ("ext" in a)
    throw new Error(
      'Cannot attach extensions: the base SDK already declares an "ext" member, which the extension container reserves.'
    );
  const r = Object.create(a),
    u = {};
  Object.defineProperty(r, "ext", {
    value: u,
    enumerable: !0,
    writable: !1,
    configurable: !1
  });
  for (const o of l) {
    const { extension: f, mountName: d } = qT(o),
      m = d === f.name ? `"${f.name}"` : `"${f.name}" (aliased as "${d}")`;
    if (Object.hasOwn(u, d))
      throw new Error(
        `Extension ${m} cannot attach: "${d}" is already defined by another extension.`
      );
    let y;
    try {
      y = await f.setup(r);
    } catch (p) {
      throw new Error(`Extension ${m} failed during setup.`, { cause: p });
    }
    Object.defineProperty(u, d, {
      value: y,
      enumerable: !0,
      writable: !0,
      configurable: !0
    });
  }
  return r;
}
async function YT(a) {
  try {
    switch (await EE(a?.surface)) {
      case li.OpenAI:
        return new dT();
      case li.WebApp:
      case li.MicroFrontend:
        return new BT(a?.webapp);
      case li.Mosaic:
        return new sT(a?.mosaic);
      case li.MCPApps:
        return {};
      default:
        return {};
    }
  } catch {
    return {};
  }
}
function GT(a) {
  return TE(
    (async () => {
      const l = await YT(a);
      return VT(l, []);
    })(),
    "createDataSDK"
  );
}
var ni = {},
  Qc,
  By;
function QT() {
  return (
    By ||
      ((By = 1),
      (Qc = function () {
        return (
          typeof Promise == "function" &&
          Promise.prototype &&
          Promise.prototype.then
        );
      })),
    Qc
  );
}
var Fc = {},
  Ga = {},
  ky;
function pl() {
  if (ky) return Ga;
  ky = 1;
  let a;
  const l = [
    0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
    733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
    2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
  ];
  return (
    (Ga.getSymbolSize = function (u) {
      if (!u) throw new Error('"version" cannot be null or undefined');
      if (u < 1 || u > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return u * 4 + 17;
    }),
    (Ga.getSymbolTotalCodewords = function (u) {
      return l[u];
    }),
    (Ga.getBCHDigit = function (r) {
      let u = 0;
      for (; r !== 0;) (u++, (r >>>= 1));
      return u;
    }),
    (Ga.setToSJISFunction = function (u) {
      if (typeof u != "function")
        throw new Error('"toSJISFunc" is not a valid function.');
      a = u;
    }),
    (Ga.isKanjiModeEnabled = function () {
      return typeof a < "u";
    }),
    (Ga.toSJIS = function (u) {
      return a(u);
    }),
    Ga
  );
}
var Xc = {},
  Hy;
function Pf() {
  return (
    Hy ||
      ((Hy = 1),
      (function (a) {
        ((a.L = { bit: 1 }),
          (a.M = { bit: 0 }),
          (a.Q = { bit: 3 }),
          (a.H = { bit: 2 }));
        function l(r) {
          if (typeof r != "string") throw new Error("Param is not a string");
          switch (r.toLowerCase()) {
            case "l":
            case "low":
              return a.L;
            case "m":
            case "medium":
              return a.M;
            case "q":
            case "quartile":
              return a.Q;
            case "h":
            case "high":
              return a.H;
            default:
              throw new Error("Unknown EC Level: " + r);
          }
        }
        ((a.isValid = function (u) {
          return u && typeof u.bit < "u" && u.bit >= 0 && u.bit < 4;
        }),
          (a.from = function (u, o) {
            if (a.isValid(u)) return u;
            try {
              return l(u);
            } catch {
              return o;
            }
          }));
      })(Xc)),
    Xc
  );
}
var Zc, qy;
function FT() {
  if (qy) return Zc;
  qy = 1;
  function a() {
    ((this.buffer = []), (this.length = 0));
  }
  return (
    (a.prototype = {
      get: function (l) {
        const r = Math.floor(l / 8);
        return ((this.buffer[r] >>> (7 - (l % 8))) & 1) === 1;
      },
      put: function (l, r) {
        for (let u = 0; u < r; u++)
          this.putBit(((l >>> (r - u - 1)) & 1) === 1);
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (l) {
        const r = Math.floor(this.length / 8);
        (this.buffer.length <= r && this.buffer.push(0),
          l && (this.buffer[r] |= 128 >>> (this.length % 8)),
          this.length++);
      }
    }),
    (Zc = a),
    Zc
  );
}
var Ic, Vy;
function XT() {
  if (Vy) return Ic;
  Vy = 1;
  function a(l) {
    if (!l || l < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    ((this.size = l),
      (this.data = new Uint8Array(l * l)),
      (this.reservedBit = new Uint8Array(l * l)));
  }
  return (
    (a.prototype.set = function (l, r, u, o) {
      const f = l * this.size + r;
      ((this.data[f] = u), o && (this.reservedBit[f] = !0));
    }),
    (a.prototype.get = function (l, r) {
      return this.data[l * this.size + r];
    }),
    (a.prototype.xor = function (l, r, u) {
      this.data[l * this.size + r] ^= u;
    }),
    (a.prototype.isReserved = function (l, r) {
      return this.reservedBit[l * this.size + r];
    }),
    (Ic = a),
    Ic
  );
}
var Kc = {},
  Yy;
function ZT() {
  return (
    Yy ||
      ((Yy = 1),
      (function (a) {
        const l = pl().getSymbolSize;
        ((a.getRowColCoords = function (u) {
          if (u === 1) return [];
          const o = Math.floor(u / 7) + 2,
            f = l(u),
            d = f === 145 ? 26 : Math.ceil((f - 13) / (2 * o - 2)) * 2,
            m = [f - 7];
          for (let y = 1; y < o - 1; y++) m[y] = m[y - 1] - d;
          return (m.push(6), m.reverse());
        }),
          (a.getPositions = function (u) {
            const o = [],
              f = a.getRowColCoords(u),
              d = f.length;
            for (let m = 0; m < d; m++)
              for (let y = 0; y < d; y++)
                (m === 0 && y === 0) ||
                  (m === 0 && y === d - 1) ||
                  (m === d - 1 && y === 0) ||
                  o.push([f[m], f[y]]);
            return o;
          }));
      })(Kc)),
    Kc
  );
}
var Jc = {},
  Gy;
function IT() {
  if (Gy) return Jc;
  Gy = 1;
  const a = pl().getSymbolSize,
    l = 7;
  return (
    (Jc.getPositions = function (u) {
      const o = a(u);
      return [
        [0, 0],
        [o - l, 0],
        [0, o - l]
      ];
    }),
    Jc
  );
}
var $c = {},
  Qy;
function KT() {
  return (
    Qy ||
      ((Qy = 1),
      (function (a) {
        a.Patterns = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
        };
        const l = { N1: 3, N2: 3, N3: 40, N4: 10 };
        ((a.isValid = function (o) {
          return o != null && o !== "" && !isNaN(o) && o >= 0 && o <= 7;
        }),
          (a.from = function (o) {
            return a.isValid(o) ? parseInt(o, 10) : void 0;
          }),
          (a.getPenaltyN1 = function (o) {
            const f = o.size;
            let d = 0,
              m = 0,
              y = 0,
              p = null,
              v = null;
            for (let b = 0; b < f; b++) {
              ((m = y = 0), (p = v = null));
              for (let S = 0; S < f; S++) {
                let R = o.get(b, S);
                (R === p
                  ? m++
                  : (m >= 5 && (d += l.N1 + (m - 5)), (p = R), (m = 1)),
                  (R = o.get(S, b)),
                  R === v
                    ? y++
                    : (y >= 5 && (d += l.N1 + (y - 5)), (v = R), (y = 1)));
              }
              (m >= 5 && (d += l.N1 + (m - 5)),
                y >= 5 && (d += l.N1 + (y - 5)));
            }
            return d;
          }),
          (a.getPenaltyN2 = function (o) {
            const f = o.size;
            let d = 0;
            for (let m = 0; m < f - 1; m++)
              for (let y = 0; y < f - 1; y++) {
                const p =
                  o.get(m, y) +
                  o.get(m, y + 1) +
                  o.get(m + 1, y) +
                  o.get(m + 1, y + 1);
                (p === 4 || p === 0) && d++;
              }
            return d * l.N2;
          }),
          (a.getPenaltyN3 = function (o) {
            const f = o.size;
            let d = 0,
              m = 0,
              y = 0;
            for (let p = 0; p < f; p++) {
              m = y = 0;
              for (let v = 0; v < f; v++)
                ((m = ((m << 1) & 2047) | o.get(p, v)),
                  v >= 10 && (m === 1488 || m === 93) && d++,
                  (y = ((y << 1) & 2047) | o.get(v, p)),
                  v >= 10 && (y === 1488 || y === 93) && d++);
            }
            return d * l.N3;
          }),
          (a.getPenaltyN4 = function (o) {
            let f = 0;
            const d = o.data.length;
            for (let y = 0; y < d; y++) f += o.data[y];
            return Math.abs(Math.ceil((f * 100) / d / 5) - 10) * l.N4;
          }));
        function r(u, o, f) {
          switch (u) {
            case a.Patterns.PATTERN000:
              return (o + f) % 2 === 0;
            case a.Patterns.PATTERN001:
              return o % 2 === 0;
            case a.Patterns.PATTERN010:
              return f % 3 === 0;
            case a.Patterns.PATTERN011:
              return (o + f) % 3 === 0;
            case a.Patterns.PATTERN100:
              return (Math.floor(o / 2) + Math.floor(f / 3)) % 2 === 0;
            case a.Patterns.PATTERN101:
              return ((o * f) % 2) + ((o * f) % 3) === 0;
            case a.Patterns.PATTERN110:
              return (((o * f) % 2) + ((o * f) % 3)) % 2 === 0;
            case a.Patterns.PATTERN111:
              return (((o * f) % 3) + ((o + f) % 2)) % 2 === 0;
            default:
              throw new Error("bad maskPattern:" + u);
          }
        }
        ((a.applyMask = function (o, f) {
          const d = f.size;
          for (let m = 0; m < d; m++)
            for (let y = 0; y < d; y++)
              f.isReserved(y, m) || f.xor(y, m, r(o, y, m));
        }),
          (a.getBestMask = function (o, f) {
            const d = Object.keys(a.Patterns).length;
            let m = 0,
              y = 1 / 0;
            for (let p = 0; p < d; p++) {
              (f(p), a.applyMask(p, o));
              const v =
                a.getPenaltyN1(o) +
                a.getPenaltyN2(o) +
                a.getPenaltyN3(o) +
                a.getPenaltyN4(o);
              (a.applyMask(p, o), v < y && ((y = v), (m = p)));
            }
            return m;
          }));
      })($c)),
    $c
  );
}
var Ju = {},
  Fy;
function vg() {
  if (Fy) return Ju;
  Fy = 1;
  const a = Pf(),
    l = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81
    ],
    r = [
      7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
      88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160,
      192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
      288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168,
      308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700,
      224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810,
      960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390,
      728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868,
      1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
      1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100,
      660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430
    ];
  return (
    (Ju.getBlocksCount = function (o, f) {
      switch (f) {
        case a.L:
          return l[(o - 1) * 4 + 0];
        case a.M:
          return l[(o - 1) * 4 + 1];
        case a.Q:
          return l[(o - 1) * 4 + 2];
        case a.H:
          return l[(o - 1) * 4 + 3];
        default:
          return;
      }
    }),
    (Ju.getTotalCodewordsCount = function (o, f) {
      switch (f) {
        case a.L:
          return r[(o - 1) * 4 + 0];
        case a.M:
          return r[(o - 1) * 4 + 1];
        case a.Q:
          return r[(o - 1) * 4 + 2];
        case a.H:
          return r[(o - 1) * 4 + 3];
        default:
          return;
      }
    }),
    Ju
  );
}
var Pc = {},
  fr = {},
  Xy;
function JT() {
  if (Xy) return fr;
  Xy = 1;
  const a = new Uint8Array(512),
    l = new Uint8Array(256);
  return (
    (function () {
      let u = 1;
      for (let o = 0; o < 255; o++)
        ((a[o] = u), (l[u] = o), (u <<= 1), u & 256 && (u ^= 285));
      for (let o = 255; o < 512; o++) a[o] = a[o - 255];
    })(),
    (fr.log = function (u) {
      if (u < 1) throw new Error("log(" + u + ")");
      return l[u];
    }),
    (fr.exp = function (u) {
      return a[u];
    }),
    (fr.mul = function (u, o) {
      return u === 0 || o === 0 ? 0 : a[l[u] + l[o]];
    }),
    fr
  );
}
var Zy;
function $T() {
  return (
    Zy ||
      ((Zy = 1),
      (function (a) {
        const l = JT();
        ((a.mul = function (u, o) {
          const f = new Uint8Array(u.length + o.length - 1);
          for (let d = 0; d < u.length; d++)
            for (let m = 0; m < o.length; m++) f[d + m] ^= l.mul(u[d], o[m]);
          return f;
        }),
          (a.mod = function (u, o) {
            let f = new Uint8Array(u);
            for (; f.length - o.length >= 0;) {
              const d = f[0];
              for (let y = 0; y < o.length; y++) f[y] ^= l.mul(o[y], d);
              let m = 0;
              for (; m < f.length && f[m] === 0;) m++;
              f = f.slice(m);
            }
            return f;
          }),
          (a.generateECPolynomial = function (u) {
            let o = new Uint8Array([1]);
            for (let f = 0; f < u; f++)
              o = a.mul(o, new Uint8Array([1, l.exp(f)]));
            return o;
          }));
      })(Pc)),
    Pc
  );
}
var Wc, Iy;
function PT() {
  if (Iy) return Wc;
  Iy = 1;
  const a = $T();
  function l(r) {
    ((this.genPoly = void 0),
      (this.degree = r),
      this.degree && this.initialize(this.degree));
  }
  return (
    (l.prototype.initialize = function (u) {
      ((this.degree = u), (this.genPoly = a.generateECPolynomial(this.degree)));
    }),
    (l.prototype.encode = function (u) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      const o = new Uint8Array(u.length + this.degree);
      o.set(u);
      const f = a.mod(o, this.genPoly),
        d = this.degree - f.length;
      if (d > 0) {
        const m = new Uint8Array(this.degree);
        return (m.set(f, d), m);
      }
      return f;
    }),
    (Wc = l),
    Wc
  );
}
var ef = {},
  tf = {},
  nf = {},
  Ky;
function bg() {
  return (
    Ky ||
      ((Ky = 1),
      (nf.isValid = function (l) {
        return !isNaN(l) && l >= 1 && l <= 40;
      })),
    nf
  );
}
var On = {},
  Jy;
function Eg() {
  if (Jy) return On;
  Jy = 1;
  const a = "[0-9]+",
    l = "[A-Z $%*+\\-./:]+";
  let r =
    "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  r = r.replace(/u/g, "\\u");
  const u =
    "(?:(?![A-Z0-9 $%*+\\-./:]|" +
    r +
    `)(?:.|[\r
]))+`;
  ((On.KANJI = new RegExp(r, "g")),
    (On.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
    (On.BYTE = new RegExp(u, "g")),
    (On.NUMERIC = new RegExp(a, "g")),
    (On.ALPHANUMERIC = new RegExp(l, "g")));
  const o = new RegExp("^" + r + "$"),
    f = new RegExp("^" + a + "$"),
    d = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return (
    (On.testKanji = function (y) {
      return o.test(y);
    }),
    (On.testNumeric = function (y) {
      return f.test(y);
    }),
    (On.testAlphanumeric = function (y) {
      return d.test(y);
    }),
    On
  );
}
var $y;
function gl() {
  return (
    $y ||
      (($y = 1),
      (function (a) {
        const l = bg(),
          r = Eg();
        ((a.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
          (a.ALPHANUMERIC = {
            id: "Alphanumeric",
            bit: 2,
            ccBits: [9, 11, 13]
          }),
          (a.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
          (a.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
          (a.MIXED = { bit: -1 }),
          (a.getCharCountIndicator = function (f, d) {
            if (!f.ccBits) throw new Error("Invalid mode: " + f);
            if (!l.isValid(d)) throw new Error("Invalid version: " + d);
            return d >= 1 && d < 10
              ? f.ccBits[0]
              : d < 27
                ? f.ccBits[1]
                : f.ccBits[2];
          }),
          (a.getBestModeForData = function (f) {
            return r.testNumeric(f)
              ? a.NUMERIC
              : r.testAlphanumeric(f)
                ? a.ALPHANUMERIC
                : r.testKanji(f)
                  ? a.KANJI
                  : a.BYTE;
          }),
          (a.toString = function (f) {
            if (f && f.id) return f.id;
            throw new Error("Invalid mode");
          }),
          (a.isValid = function (f) {
            return f && f.bit && f.ccBits;
          }));
        function u(o) {
          if (typeof o != "string") throw new Error("Param is not a string");
          switch (o.toLowerCase()) {
            case "numeric":
              return a.NUMERIC;
            case "alphanumeric":
              return a.ALPHANUMERIC;
            case "kanji":
              return a.KANJI;
            case "byte":
              return a.BYTE;
            default:
              throw new Error("Unknown mode: " + o);
          }
        }
        a.from = function (f, d) {
          if (a.isValid(f)) return f;
          try {
            return u(f);
          } catch {
            return d;
          }
        };
      })(tf)),
    tf
  );
}
var Py;
function WT() {
  return (
    Py ||
      ((Py = 1),
      (function (a) {
        const l = pl(),
          r = vg(),
          u = Pf(),
          o = gl(),
          f = bg(),
          d = 7973,
          m = l.getBCHDigit(d);
        function y(S, R, N) {
          for (let j = 1; j <= 40; j++)
            if (R <= a.getCapacity(j, N, S)) return j;
        }
        function p(S, R) {
          return o.getCharCountIndicator(S, R) + 4;
        }
        function v(S, R) {
          let N = 0;
          return (
            S.forEach(function (j) {
              const Y = p(j.mode, R);
              N += Y + j.getBitsLength();
            }),
            N
          );
        }
        function b(S, R) {
          for (let N = 1; N <= 40; N++)
            if (v(S, N) <= a.getCapacity(N, R, o.MIXED)) return N;
        }
        ((a.from = function (R, N) {
          return f.isValid(R) ? parseInt(R, 10) : N;
        }),
          (a.getCapacity = function (R, N, j) {
            if (!f.isValid(R)) throw new Error("Invalid QR Code version");
            typeof j > "u" && (j = o.BYTE);
            const Y = l.getSymbolTotalCodewords(R),
              G = r.getTotalCodewordsCount(R, N),
              K = (Y - G) * 8;
            if (j === o.MIXED) return K;
            const Z = K - p(j, R);
            switch (j) {
              case o.NUMERIC:
                return Math.floor((Z / 10) * 3);
              case o.ALPHANUMERIC:
                return Math.floor((Z / 11) * 2);
              case o.KANJI:
                return Math.floor(Z / 13);
              case o.BYTE:
              default:
                return Math.floor(Z / 8);
            }
          }),
          (a.getBestVersionForData = function (R, N) {
            let j;
            const Y = u.from(N, u.M);
            if (Array.isArray(R)) {
              if (R.length > 1) return b(R, Y);
              if (R.length === 0) return 1;
              j = R[0];
            } else j = R;
            return y(j.mode, j.getLength(), Y);
          }),
          (a.getEncodedBits = function (R) {
            if (!f.isValid(R) || R < 7)
              throw new Error("Invalid QR Code version");
            let N = R << 12;
            for (; l.getBCHDigit(N) - m >= 0;) N ^= d << (l.getBCHDigit(N) - m);
            return (R << 12) | N;
          }));
      })(ef)),
    ef
  );
}
var af = {},
  Wy;
function eR() {
  if (Wy) return af;
  Wy = 1;
  const a = pl(),
    l = 1335,
    r = 21522,
    u = a.getBCHDigit(l);
  return (
    (af.getEncodedBits = function (f, d) {
      const m = (f.bit << 3) | d;
      let y = m << 10;
      for (; a.getBCHDigit(y) - u >= 0;) y ^= l << (a.getBCHDigit(y) - u);
      return ((m << 10) | y) ^ r;
    }),
    af
  );
}
var lf = {},
  rf,
  ep;
function tR() {
  if (ep) return rf;
  ep = 1;
  const a = gl();
  function l(r) {
    ((this.mode = a.NUMERIC), (this.data = r.toString()));
  }
  return (
    (l.getBitsLength = function (u) {
      return 10 * Math.floor(u / 3) + (u % 3 ? (u % 3) * 3 + 1 : 0);
    }),
    (l.prototype.getLength = function () {
      return this.data.length;
    }),
    (l.prototype.getBitsLength = function () {
      return l.getBitsLength(this.data.length);
    }),
    (l.prototype.write = function (u) {
      let o, f, d;
      for (o = 0; o + 3 <= this.data.length; o += 3)
        ((f = this.data.substr(o, 3)), (d = parseInt(f, 10)), u.put(d, 10));
      const m = this.data.length - o;
      m > 0 &&
        ((f = this.data.substr(o)), (d = parseInt(f, 10)), u.put(d, m * 3 + 1));
    }),
    (rf = l),
    rf
  );
}
var uf, tp;
function nR() {
  if (tp) return uf;
  tp = 1;
  const a = gl(),
    l = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
  function r(u) {
    ((this.mode = a.ALPHANUMERIC), (this.data = u));
  }
  return (
    (r.getBitsLength = function (o) {
      return 11 * Math.floor(o / 2) + 6 * (o % 2);
    }),
    (r.prototype.getLength = function () {
      return this.data.length;
    }),
    (r.prototype.getBitsLength = function () {
      return r.getBitsLength(this.data.length);
    }),
    (r.prototype.write = function (o) {
      let f;
      for (f = 0; f + 2 <= this.data.length; f += 2) {
        let d = l.indexOf(this.data[f]) * 45;
        ((d += l.indexOf(this.data[f + 1])), o.put(d, 11));
      }
      this.data.length % 2 && o.put(l.indexOf(this.data[f]), 6);
    }),
    (uf = r),
    uf
  );
}
var sf, np;
function aR() {
  if (np) return sf;
  np = 1;
  const a = gl();
  function l(r) {
    ((this.mode = a.BYTE),
      typeof r == "string"
        ? (this.data = new TextEncoder().encode(r))
        : (this.data = new Uint8Array(r)));
  }
  return (
    (l.getBitsLength = function (u) {
      return u * 8;
    }),
    (l.prototype.getLength = function () {
      return this.data.length;
    }),
    (l.prototype.getBitsLength = function () {
      return l.getBitsLength(this.data.length);
    }),
    (l.prototype.write = function (r) {
      for (let u = 0, o = this.data.length; u < o; u++) r.put(this.data[u], 8);
    }),
    (sf = l),
    sf
  );
}
var of, ap;
function lR() {
  if (ap) return of;
  ap = 1;
  const a = gl(),
    l = pl();
  function r(u) {
    ((this.mode = a.KANJI), (this.data = u));
  }
  return (
    (r.getBitsLength = function (o) {
      return o * 13;
    }),
    (r.prototype.getLength = function () {
      return this.data.length;
    }),
    (r.prototype.getBitsLength = function () {
      return r.getBitsLength(this.data.length);
    }),
    (r.prototype.write = function (u) {
      let o;
      for (o = 0; o < this.data.length; o++) {
        let f = l.toSJIS(this.data[o]);
        if (f >= 33088 && f <= 40956) f -= 33088;
        else if (f >= 57408 && f <= 60351) f -= 49472;
        else
          throw new Error(
            "Invalid SJIS character: " +
              this.data[o] +
              `
Make sure your charset is UTF-8`
          );
        ((f = ((f >>> 8) & 255) * 192 + (f & 255)), u.put(f, 13));
      }
    }),
    (of = r),
    of
  );
}
var cf = { exports: {} },
  lp;
function iR() {
  return (
    lp ||
      ((lp = 1),
      (function (a) {
        var l = {
          single_source_shortest_paths: function (r, u, o) {
            var f = {},
              d = {};
            d[u] = 0;
            var m = l.PriorityQueue.make();
            m.push(u, 0);
            for (var y, p, v, b, S, R, N, j, Y; !m.empty();) {
              ((y = m.pop()), (p = y.value), (b = y.cost), (S = r[p] || {}));
              for (v in S)
                S.hasOwnProperty(v) &&
                  ((R = S[v]),
                  (N = b + R),
                  (j = d[v]),
                  (Y = typeof d[v] > "u"),
                  (Y || j > N) && ((d[v] = N), m.push(v, N), (f[v] = p)));
            }
            if (typeof o < "u" && typeof d[o] > "u") {
              var G = ["Could not find a path from ", u, " to ", o, "."].join(
                ""
              );
              throw new Error(G);
            }
            return f;
          },
          extract_shortest_path_from_predecessor_list: function (r, u) {
            for (var o = [], f = u; f;) (o.push(f), r[f], (f = r[f]));
            return (o.reverse(), o);
          },
          find_path: function (r, u, o) {
            var f = l.single_source_shortest_paths(r, u, o);
            return l.extract_shortest_path_from_predecessor_list(f, o);
          },
          PriorityQueue: {
            make: function (r) {
              var u = l.PriorityQueue,
                o = {},
                f;
              r = r || {};
              for (f in u) u.hasOwnProperty(f) && (o[f] = u[f]);
              return (
                (o.queue = []),
                (o.sorter = r.sorter || u.default_sorter),
                o
              );
            },
            default_sorter: function (r, u) {
              return r.cost - u.cost;
            },
            push: function (r, u) {
              var o = { value: r, cost: u };
              (this.queue.push(o), this.queue.sort(this.sorter));
            },
            pop: function () {
              return this.queue.shift();
            },
            empty: function () {
              return this.queue.length === 0;
            }
          }
        };
        a.exports = l;
      })(cf)),
    cf.exports
  );
}
var ip;
function rR() {
  return (
    ip ||
      ((ip = 1),
      (function (a) {
        const l = gl(),
          r = tR(),
          u = nR(),
          o = aR(),
          f = lR(),
          d = Eg(),
          m = pl(),
          y = iR();
        function p(G) {
          return unescape(encodeURIComponent(G)).length;
        }
        function v(G, K, Z) {
          const $ = [];
          let se;
          for (; (se = G.exec(Z)) !== null;)
            $.push({
              data: se[0],
              index: se.index,
              mode: K,
              length: se[0].length
            });
          return $;
        }
        function b(G) {
          const K = v(d.NUMERIC, l.NUMERIC, G),
            Z = v(d.ALPHANUMERIC, l.ALPHANUMERIC, G);
          let $, se;
          return (
            m.isKanjiModeEnabled()
              ? (($ = v(d.BYTE, l.BYTE, G)), (se = v(d.KANJI, l.KANJI, G)))
              : (($ = v(d.BYTE_KANJI, l.BYTE, G)), (se = [])),
            K.concat(Z, $, se)
              .sort(function (H, A) {
                return H.index - A.index;
              })
              .map(function (H) {
                return { data: H.data, mode: H.mode, length: H.length };
              })
          );
        }
        function S(G, K) {
          switch (K) {
            case l.NUMERIC:
              return r.getBitsLength(G);
            case l.ALPHANUMERIC:
              return u.getBitsLength(G);
            case l.KANJI:
              return f.getBitsLength(G);
            case l.BYTE:
              return o.getBitsLength(G);
          }
        }
        function R(G) {
          return G.reduce(function (K, Z) {
            const $ = K.length - 1 >= 0 ? K[K.length - 1] : null;
            return $ && $.mode === Z.mode
              ? ((K[K.length - 1].data += Z.data), K)
              : (K.push(Z), K);
          }, []);
        }
        function N(G) {
          const K = [];
          for (let Z = 0; Z < G.length; Z++) {
            const $ = G[Z];
            switch ($.mode) {
              case l.NUMERIC:
                K.push([
                  $,
                  { data: $.data, mode: l.ALPHANUMERIC, length: $.length },
                  { data: $.data, mode: l.BYTE, length: $.length }
                ]);
                break;
              case l.ALPHANUMERIC:
                K.push([$, { data: $.data, mode: l.BYTE, length: $.length }]);
                break;
              case l.KANJI:
                K.push([$, { data: $.data, mode: l.BYTE, length: p($.data) }]);
                break;
              case l.BYTE:
                K.push([{ data: $.data, mode: l.BYTE, length: p($.data) }]);
            }
          }
          return K;
        }
        function j(G, K) {
          const Z = {},
            $ = { start: {} };
          let se = ["start"];
          for (let ee = 0; ee < G.length; ee++) {
            const H = G[ee],
              A = [];
            for (let W = 0; W < H.length; W++) {
              const re = H[W],
                ie = "" + ee + W;
              (A.push(ie), (Z[ie] = { node: re, lastCount: 0 }), ($[ie] = {}));
              for (let ne = 0; ne < se.length; ne++) {
                const le = se[ne];
                Z[le] && Z[le].node.mode === re.mode
                  ? (($[le][ie] =
                      S(Z[le].lastCount + re.length, re.mode) -
                      S(Z[le].lastCount, re.mode)),
                    (Z[le].lastCount += re.length))
                  : (Z[le] && (Z[le].lastCount = re.length),
                    ($[le][ie] =
                      S(re.length, re.mode) +
                      4 +
                      l.getCharCountIndicator(re.mode, K)));
              }
            }
            se = A;
          }
          for (let ee = 0; ee < se.length; ee++) $[se[ee]].end = 0;
          return { map: $, table: Z };
        }
        function Y(G, K) {
          let Z;
          const $ = l.getBestModeForData(G);
          if (((Z = l.from(K, $)), Z !== l.BYTE && Z.bit < $.bit))
            throw new Error(
              '"' +
                G +
                '" cannot be encoded with mode ' +
                l.toString(Z) +
                `.
 Suggested mode is: ` +
                l.toString($)
            );
          switch (
            (Z === l.KANJI && !m.isKanjiModeEnabled() && (Z = l.BYTE), Z)
          ) {
            case l.NUMERIC:
              return new r(G);
            case l.ALPHANUMERIC:
              return new u(G);
            case l.KANJI:
              return new f(G);
            case l.BYTE:
              return new o(G);
          }
        }
        ((a.fromArray = function (K) {
          return K.reduce(function (Z, $) {
            return (
              typeof $ == "string"
                ? Z.push(Y($, null))
                : $.data && Z.push(Y($.data, $.mode)),
              Z
            );
          }, []);
        }),
          (a.fromString = function (K, Z) {
            const $ = b(K, m.isKanjiModeEnabled()),
              se = N($),
              ee = j(se, Z),
              H = y.find_path(ee.map, "start", "end"),
              A = [];
            for (let W = 1; W < H.length - 1; W++) A.push(ee.table[H[W]].node);
            return a.fromArray(R(A));
          }),
          (a.rawSplit = function (K) {
            return a.fromArray(b(K, m.isKanjiModeEnabled()));
          }));
      })(lf)),
    lf
  );
}
var rp;
function uR() {
  if (rp) return Fc;
  rp = 1;
  const a = pl(),
    l = Pf(),
    r = FT(),
    u = XT(),
    o = ZT(),
    f = IT(),
    d = KT(),
    m = vg(),
    y = PT(),
    p = WT(),
    v = eR(),
    b = gl(),
    S = rR();
  function R(ee, H) {
    const A = ee.size,
      W = f.getPositions(H);
    for (let re = 0; re < W.length; re++) {
      const ie = W[re][0],
        ne = W[re][1];
      for (let le = -1; le <= 7; le++)
        if (!(ie + le <= -1 || A <= ie + le))
          for (let he = -1; he <= 7; he++)
            ne + he <= -1 ||
              A <= ne + he ||
              ((le >= 0 && le <= 6 && (he === 0 || he === 6)) ||
              (he >= 0 && he <= 6 && (le === 0 || le === 6)) ||
              (le >= 2 && le <= 4 && he >= 2 && he <= 4)
                ? ee.set(ie + le, ne + he, !0, !0)
                : ee.set(ie + le, ne + he, !1, !0));
    }
  }
  function N(ee) {
    const H = ee.size;
    for (let A = 8; A < H - 8; A++) {
      const W = A % 2 === 0;
      (ee.set(A, 6, W, !0), ee.set(6, A, W, !0));
    }
  }
  function j(ee, H) {
    const A = o.getPositions(H);
    for (let W = 0; W < A.length; W++) {
      const re = A[W][0],
        ie = A[W][1];
      for (let ne = -2; ne <= 2; ne++)
        for (let le = -2; le <= 2; le++)
          ne === -2 ||
          ne === 2 ||
          le === -2 ||
          le === 2 ||
          (ne === 0 && le === 0)
            ? ee.set(re + ne, ie + le, !0, !0)
            : ee.set(re + ne, ie + le, !1, !0);
    }
  }
  function Y(ee, H) {
    const A = ee.size,
      W = p.getEncodedBits(H);
    let re, ie, ne;
    for (let le = 0; le < 18; le++)
      ((re = Math.floor(le / 3)),
        (ie = (le % 3) + A - 8 - 3),
        (ne = ((W >> le) & 1) === 1),
        ee.set(re, ie, ne, !0),
        ee.set(ie, re, ne, !0));
  }
  function G(ee, H, A) {
    const W = ee.size,
      re = v.getEncodedBits(H, A);
    let ie, ne;
    for (ie = 0; ie < 15; ie++)
      ((ne = ((re >> ie) & 1) === 1),
        ie < 6
          ? ee.set(ie, 8, ne, !0)
          : ie < 8
            ? ee.set(ie + 1, 8, ne, !0)
            : ee.set(W - 15 + ie, 8, ne, !0),
        ie < 8
          ? ee.set(8, W - ie - 1, ne, !0)
          : ie < 9
            ? ee.set(8, 15 - ie - 1 + 1, ne, !0)
            : ee.set(8, 15 - ie - 1, ne, !0));
    ee.set(W - 8, 8, 1, !0);
  }
  function K(ee, H) {
    const A = ee.size;
    let W = -1,
      re = A - 1,
      ie = 7,
      ne = 0;
    for (let le = A - 1; le > 0; le -= 2)
      for (le === 6 && le--; ;) {
        for (let he = 0; he < 2; he++)
          if (!ee.isReserved(re, le - he)) {
            let Ue = !1;
            (ne < H.length && (Ue = ((H[ne] >>> ie) & 1) === 1),
              ee.set(re, le - he, Ue),
              ie--,
              ie === -1 && (ne++, (ie = 7)));
          }
        if (((re += W), re < 0 || A <= re)) {
          ((re -= W), (W = -W));
          break;
        }
      }
  }
  function Z(ee, H, A) {
    const W = new r();
    A.forEach(function (he) {
      (W.put(he.mode.bit, 4),
        W.put(he.getLength(), b.getCharCountIndicator(he.mode, ee)),
        he.write(W));
    });
    const re = a.getSymbolTotalCodewords(ee),
      ie = m.getTotalCodewordsCount(ee, H),
      ne = (re - ie) * 8;
    for (
      W.getLengthInBits() + 4 <= ne && W.put(0, 4);
      W.getLengthInBits() % 8 !== 0;
    )
      W.putBit(0);
    const le = (ne - W.getLengthInBits()) / 8;
    for (let he = 0; he < le; he++) W.put(he % 2 ? 17 : 236, 8);
    return $(W, ee, H);
  }
  function $(ee, H, A) {
    const W = a.getSymbolTotalCodewords(H),
      re = m.getTotalCodewordsCount(H, A),
      ie = W - re,
      ne = m.getBlocksCount(H, A),
      le = W % ne,
      he = ne - le,
      Ue = Math.floor(W / ne),
      x = Math.floor(ie / ne),
      P = x + 1,
      me = Ue - x,
      ge = new y(me);
    let Ce = 0;
    const C = new Array(ne),
      q = new Array(ne);
    let te = 0;
    const ue = new Uint8Array(ee.buffer);
    for (let Ye = 0; Ye < ne; Ye++) {
      const mn = Ye < he ? x : P;
      ((C[Ye] = ue.slice(Ce, Ce + mn)),
        (q[Ye] = ge.encode(C[Ye])),
        (Ce += mn),
        (te = Math.max(te, mn)));
    }
    const ve = new Uint8Array(W);
    let Ee = 0,
      Ae,
      Ke;
    for (Ae = 0; Ae < te; Ae++)
      for (Ke = 0; Ke < ne; Ke++) Ae < C[Ke].length && (ve[Ee++] = C[Ke][Ae]);
    for (Ae = 0; Ae < me; Ae++)
      for (Ke = 0; Ke < ne; Ke++) ve[Ee++] = q[Ke][Ae];
    return ve;
  }
  function se(ee, H, A, W) {
    let re;
    if (Array.isArray(ee)) re = S.fromArray(ee);
    else if (typeof ee == "string") {
      let Ue = H;
      if (!Ue) {
        const x = S.rawSplit(ee);
        Ue = p.getBestVersionForData(x, A);
      }
      re = S.fromString(ee, Ue || 40);
    } else throw new Error("Invalid data");
    const ie = p.getBestVersionForData(re, A);
    if (!ie)
      throw new Error(
        "The amount of data is too big to be stored in a QR Code"
      );
    if (!H) H = ie;
    else if (H < ie)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
          ie +
          `.
`
      );
    const ne = Z(H, A, re),
      le = a.getSymbolSize(H),
      he = new u(le);
    return (
      R(he, H),
      N(he),
      j(he, H),
      G(he, A, 0),
      H >= 7 && Y(he, H),
      K(he, ne),
      isNaN(W) && (W = d.getBestMask(he, G.bind(null, he, A))),
      d.applyMask(W, he),
      G(he, A, W),
      {
        modules: he,
        version: H,
        errorCorrectionLevel: A,
        maskPattern: W,
        segments: re
      }
    );
  }
  return (
    (Fc.create = function (H, A) {
      if (typeof H > "u" || H === "") throw new Error("No input text");
      let W = l.M,
        re,
        ie;
      return (
        typeof A < "u" &&
          ((W = l.from(A.errorCorrectionLevel, l.M)),
          (re = p.from(A.version)),
          (ie = d.from(A.maskPattern)),
          A.toSJISFunc && a.setToSJISFunction(A.toSJISFunc)),
        se(H, re, W, ie)
      );
    }),
    Fc
  );
}
var ff = {},
  df = {},
  up;
function Sg() {
  return (
    up ||
      ((up = 1),
      (function (a) {
        function l(r) {
          if (
            (typeof r == "number" && (r = r.toString()), typeof r != "string")
          )
            throw new Error("Color should be defined as hex string");
          let u = r.slice().replace("#", "").split("");
          if (u.length < 3 || u.length === 5 || u.length > 8)
            throw new Error("Invalid hex color: " + r);
          ((u.length === 3 || u.length === 4) &&
            (u = Array.prototype.concat.apply(
              [],
              u.map(function (f) {
                return [f, f];
              })
            )),
            u.length === 6 && u.push("F", "F"));
          const o = parseInt(u.join(""), 16);
          return {
            r: (o >> 24) & 255,
            g: (o >> 16) & 255,
            b: (o >> 8) & 255,
            a: o & 255,
            hex: "#" + u.slice(0, 6).join("")
          };
        }
        ((a.getOptions = function (u) {
          (u || (u = {}), u.color || (u.color = {}));
          const o =
              typeof u.margin > "u" || u.margin === null || u.margin < 0
                ? 4
                : u.margin,
            f = u.width && u.width >= 21 ? u.width : void 0,
            d = u.scale || 4;
          return {
            width: f,
            scale: f ? 4 : d,
            margin: o,
            color: {
              dark: l(u.color.dark || "#000000ff"),
              light: l(u.color.light || "#ffffffff")
            },
            type: u.type,
            rendererOpts: u.rendererOpts || {}
          };
        }),
          (a.getScale = function (u, o) {
            return o.width && o.width >= u + o.margin * 2
              ? o.width / (u + o.margin * 2)
              : o.scale;
          }),
          (a.getImageWidth = function (u, o) {
            const f = a.getScale(u, o);
            return Math.floor((u + o.margin * 2) * f);
          }),
          (a.qrToImageData = function (u, o, f) {
            const d = o.modules.size,
              m = o.modules.data,
              y = a.getScale(d, f),
              p = Math.floor((d + f.margin * 2) * y),
              v = f.margin * y,
              b = [f.color.light, f.color.dark];
            for (let S = 0; S < p; S++)
              for (let R = 0; R < p; R++) {
                let N = (S * p + R) * 4,
                  j = f.color.light;
                if (S >= v && R >= v && S < p - v && R < p - v) {
                  const Y = Math.floor((S - v) / y),
                    G = Math.floor((R - v) / y);
                  j = b[m[Y * d + G] ? 1 : 0];
                }
                ((u[N++] = j.r), (u[N++] = j.g), (u[N++] = j.b), (u[N] = j.a));
              }
          }));
      })(df)),
    df
  );
}
var sp;
function sR() {
  return (
    sp ||
      ((sp = 1),
      (function (a) {
        const l = Sg();
        function r(o, f, d) {
          (o.clearRect(0, 0, f.width, f.height),
            f.style || (f.style = {}),
            (f.height = d),
            (f.width = d),
            (f.style.height = d + "px"),
            (f.style.width = d + "px"));
        }
        function u() {
          try {
            return document.createElement("canvas");
          } catch {
            throw new Error("You need to specify a canvas element");
          }
        }
        ((a.render = function (f, d, m) {
          let y = m,
            p = d;
          (typeof y > "u" && (!d || !d.getContext) && ((y = d), (d = void 0)),
            d || (p = u()),
            (y = l.getOptions(y)));
          const v = l.getImageWidth(f.modules.size, y),
            b = p.getContext("2d"),
            S = b.createImageData(v, v);
          return (
            l.qrToImageData(S.data, f, y),
            r(b, p, v),
            b.putImageData(S, 0, 0),
            p
          );
        }),
          (a.renderToDataURL = function (f, d, m) {
            let y = m;
            (typeof y > "u" && (!d || !d.getContext) && ((y = d), (d = void 0)),
              y || (y = {}));
            const p = a.render(f, d, y),
              v = y.type || "image/png",
              b = y.rendererOpts || {};
            return p.toDataURL(v, b.quality);
          }));
      })(ff)),
    ff
  );
}
var hf = {},
  op;
function oR() {
  if (op) return hf;
  op = 1;
  const a = Sg();
  function l(o, f) {
    const d = o.a / 255,
      m = f + '="' + o.hex + '"';
    return d < 1 ? m + " " + f + '-opacity="' + d.toFixed(2).slice(1) + '"' : m;
  }
  function r(o, f, d) {
    let m = o + f;
    return (typeof d < "u" && (m += " " + d), m);
  }
  function u(o, f, d) {
    let m = "",
      y = 0,
      p = !1,
      v = 0;
    for (let b = 0; b < o.length; b++) {
      const S = Math.floor(b % f),
        R = Math.floor(b / f);
      (!S && !p && (p = !0),
        o[b]
          ? (v++,
            (b > 0 && S > 0 && o[b - 1]) ||
              ((m += p ? r("M", S + d, 0.5 + R + d) : r("m", y, 0)),
              (y = 0),
              (p = !1)),
            (S + 1 < f && o[b + 1]) || ((m += r("h", v)), (v = 0)))
          : y++);
    }
    return m;
  }
  return (
    (hf.render = function (f, d, m) {
      const y = a.getOptions(d),
        p = f.modules.size,
        v = f.modules.data,
        b = p + y.margin * 2,
        S = y.color.light.a
          ? "<path " +
            l(y.color.light, "fill") +
            ' d="M0 0h' +
            b +
            "v" +
            b +
            'H0z"/>'
          : "",
        R =
          "<path " +
          l(y.color.dark, "stroke") +
          ' d="' +
          u(v, p, y.margin) +
          '"/>',
        N = 'viewBox="0 0 ' + b + " " + b + '"',
        Y =
          '<svg xmlns="http://www.w3.org/2000/svg" ' +
          (y.width ? 'width="' + y.width + '" height="' + y.width + '" ' : "") +
          N +
          ' shape-rendering="crispEdges">' +
          S +
          R +
          `</svg>
`;
      return (typeof m == "function" && m(null, Y), Y);
    }),
    hf
  );
}
var cp;
function cR() {
  if (cp) return ni;
  cp = 1;
  const a = QT(),
    l = uR(),
    r = sR(),
    u = oR();
  function o(f, d, m, y, p) {
    const v = [].slice.call(arguments, 1),
      b = v.length,
      S = typeof v[b - 1] == "function";
    if (!S && !a()) throw new Error("Callback required as last argument");
    if (S) {
      if (b < 2) throw new Error("Too few arguments provided");
      b === 2
        ? ((p = m), (m = d), (d = y = void 0))
        : b === 3 &&
          (d.getContext && typeof p > "u"
            ? ((p = y), (y = void 0))
            : ((p = y), (y = m), (m = d), (d = void 0)));
    } else {
      if (b < 1) throw new Error("Too few arguments provided");
      return (
        b === 1
          ? ((m = d), (d = y = void 0))
          : b === 2 && !d.getContext && ((y = m), (m = d), (d = void 0)),
        new Promise(function (R, N) {
          try {
            const j = l.create(m, y);
            R(f(j, d, y));
          } catch (j) {
            N(j);
          }
        })
      );
    }
    try {
      const R = l.create(m, y);
      p(null, f(R, d, y));
    } catch (R) {
      p(R);
    }
  }
  return (
    (ni.create = l.create),
    (ni.toCanvas = o.bind(null, r.render)),
    (ni.toDataURL = o.bind(null, r.renderToDataURL)),
    (ni.toString = o.bind(null, function (f, d, m) {
      return u.render(f, m);
    })),
    ni
  );
}
var fR = cR();
const dR = O1(fR);
const hR = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  mR = (a) =>
    a.replace(/^([A-Z])|[\s-_]+(\w)/g, (l, r, u) =>
      u ? u.toUpperCase() : r.toLowerCase()
    ),
  fp = (a) => {
    const l = mR(a);
    return l.charAt(0).toUpperCase() + l.slice(1);
  },
  Tg = (...a) =>
    a
      .filter((l, r, u) => !!l && l.trim() !== "" && u.indexOf(l) === r)
      .join(" ")
      .trim(),
  yR = (a) => {
    for (const l in a)
      if (l.startsWith("aria-") || l === "role" || l === "title") return !0;
  };
var pR = {
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
const gR = U.forwardRef(
  (
    {
      color: a = "currentColor",
      size: l = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: u,
      className: o = "",
      children: f,
      iconNode: d,
      ...m
    },
    y
  ) =>
    U.createElement(
      "svg",
      {
        ref: y,
        ...pR,
        width: l,
        height: l,
        stroke: a,
        strokeWidth: u ? (Number(r) * 24) / Number(l) : r,
        className: Tg("lucide", o),
        ...(!f && !yR(m) && { "aria-hidden": "true" }),
        ...m
      },
      [
        ...d.map(([p, v]) => U.createElement(p, v)),
        ...(Array.isArray(f) ? f : [f])
      ]
    )
);
const Bn = (a, l) => {
  const r = U.forwardRef(({ className: u, ...o }, f) =>
    U.createElement(gR, {
      ref: f,
      iconNode: l,
      className: Tg(`lucide-${hR(fp(a))}`, `lucide-${a}`, u),
      ...o
    })
  );
  return ((r.displayName = fp(a)), r);
};
const vR = [
    [
      "rect",
      {
        width: "14",
        height: "14",
        x: "8",
        y: "8",
        rx: "2",
        ry: "2",
        key: "17jyea"
      }
    ],
    [
      "path",
      {
        d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
        key: "zix9uf"
      }
    ]
  ],
  bR = Bn("copy", vR);
const ER = [
    ["path", { d: "M12 15V3", key: "m9g1x1" }],
    ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
    ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
  ],
  SR = Bn("download", ER);
const TR = [
    [
      "path",
      {
        d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        key: "1jg4f8"
      }
    ]
  ],
  RR = Bn("facebook", TR);
const CR = [
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
  NR = Bn("instagram", CR);
const wR = [
    [
      "path",
      {
        d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
        key: "143wyd"
      }
    ],
    ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
    [
      "rect",
      { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }
    ]
  ],
  AR = Bn("printer", wR);
const DR = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ],
  _R = Bn("search", DR);
const OR = [
    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
    [
      "line",
      { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }
    ],
    [
      "line",
      { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }
    ]
  ],
  MR = Bn("share-2", OR);
const xR = [
    [
      "path",
      {
        d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
        key: "pff0z6"
      }
    ]
  ],
  zR = Bn("twitter", xR);
const UR = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ],
  LR = Bn("x", UR);
const jR = [
    [
      "path",
      {
        d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
        key: "1q2vi4"
      }
    ],
    ["path", { d: "m10 15 5-3-5-3z", key: "1jp15x" }]
  ],
  BR = Bn("youtube", jR),
  Wf =
    "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='97'%20height='40'%20viewBox='0%200%2097%2040'%3e%3cg%20fill='%23FFFFFE'%20fill-rule='evenodd'%3e%3cpath%20d='M57.094%2033.402c-.583-1.024-.948-2.177-1.115-3.525a.681.681%200%200%200-.805-.586%203.914%203.914%200%200%201-.746.074c-.785%200-1.385-.132-1.385-1.796v-1.594h-.005V3.594a.621.621%200%200%200-.62-.623h-4.509a.622.622%200%200%200-.62.623v24.515c0%201.836.168%203.223%201.008%204.462%201.028%201.419%203.076%202.242%204.958%202.242l.292-.002h.002c1.144%200%202.259-.104%203.178-.425a.682.682%200%200%200%20.367-.983M69.33%2032.614c-.831-1.216-1.09-1.426-1.65-2.737-.075-.174-.123-.357-.276-.468a.673.673%200%200%200-.528-.118%203.926%203.926%200%200%201-.747.074c-.785%200-1.386-.132-1.386-1.796v-1.594h-.004V3.594a.622.622%200%200%200-.62-.623h-4.51a.621.621%200%200%200-.62.623v24.515c0%201.836.169%203.223%201.01%204.462%201.027%201.419%203.075%202.242%204.956%202.242l.292-.002h.004c1.142%200%202.257-.104%203.177-.425.191-.066.874-.415%201.015-.56.441-.455.001-1.044-.113-1.21M28.338%2020.117c.47-2.588%202.465-4.224%205.24-4.224%202.8%200%204.698%201.565%205.19%204.224h-10.43zm5.198-9.13c-3.421%200-6.328%201.208-8.405%203.494-1.958%202.153-3.036%205.18-3.036%208.521%200%203.392%201.068%206.301%203.088%208.416%202.122%202.22%205.167%203.394%208.804%203.394%203.928%200%207.223-1.38%209.795-4.102.235-.248.245-.703-.02-.878-.268-.174-1.607-1.087-2.952-2.838-.159-.11-.27-.173-.429-.173h-.018a.62.62%200%200%200-.437.199c-1.545%201.67-3.527%202.351-5.814%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.622.622%200%200%200%20.617-.554c.056-.507.085-1.071.085-1.631%200-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.829-3.297-8.143-3.297zM75.177%2020.117c.47-2.588%202.465-4.224%205.238-4.224%202.8%200%204.7%201.565%205.192%204.224h-10.43zm5.197-9.13c-3.42%200-6.328%201.208-8.404%203.494-1.959%202.153-3.037%205.18-3.037%208.521%200%203.392%201.068%206.301%203.088%208.416%202.123%202.22%205.167%203.394%208.804%203.394%203.929%200%207.224-1.38%209.796-4.102.235-.248.245-.703-.021-.878-.267-.174-1.607-1.087-2.951-2.838-.16-.11-.27-.173-.43-.173h-.018a.621.621%200%200%200-.436.199c-1.545%201.67-3.528%202.351-5.815%202.351-3.387%200-5.474-1.604-5.88-4.718h15.715a.621.621%200%200%200%20.617-.554%2015.04%2015.04%200%200%200%20.086-1.631c0-3.225-1.055-6.131-2.97-8.184-2.013-2.157-4.83-3.297-8.144-3.297z'%20/%3e%3cpath%20d='M23.203%2033.259l-.067-.066c-.017-.017-.035-.033-.052-.052a13.04%2013.04%200%200%201-2.545-3.887.62.62%200%200%200-.57-.377H8.142l14.464-18.57a.626.626%200%200%200%20.13-.384V6.305a.622.622%200%200%200-.62-.624h-7.801V.491a.311.311%200%200%200-.31-.31H9.21a.31.31%200%200%200-.31.31v5.19H1.254a.622.622%200%200%200-.62.624V10.5c0%20.343.277.622.62.622H14.53L.152%2029.527a.625.625%200%200%200-.132.385v3.783c0%20.344.278.623.62.623h8.264v5.19a.31.31%200%200%200%20.31.311h4.796a.31.31%200%200%200%20.31-.311v-5.19h8.44a.624.624%200%200%200%20.442-1.06M93.501%208.179h.525c.104%200%20.205-.003.304-.01a.836.836%200%200%200%20.267-.061.415.415%200%200%200%20.184-.15.511.511%200%200%200%20.068-.284.472.472%200%200%200-.06-.253.388.388%200%200%200-.16-.146.654.654%200%200%200-.223-.064%202.15%202.15%200%200%200-.245-.014h-.66v.982zm-.425-1.366h1.12c.369%200%20.64.07.816.21.175.14.262.364.262.672%200%20.275-.078.477-.234.605a1.056%201.056%200%200%201-.574.228l.879%201.352h-.461l-.837-1.317h-.546V9.88h-.425V6.813zm-1.249%201.53a2.236%202.236%200%200%200%20.653%201.597c.203.202.44.361.709.477.27.116.56.174.873.174.311%200%20.602-.058.872-.174a2.236%202.236%200%200%200%201.188-1.203%202.32%202.32%200%200%200%20.173-.9c0-.318-.058-.614-.173-.89a2.21%202.21%200%200%200-1.188-1.188c-.27-.113-.56-.17-.872-.17-.313%200-.604.058-.873.174a2.28%202.28%200%200%200-.709.477%202.168%202.168%200%200%200-.479.718c-.116.278-.174.58-.174.908zm-.425%200c0-.38.07-.732.212-1.057a2.67%202.67%200%200%201%20.575-.844c.242-.237.523-.423.844-.558a2.628%202.628%200%200%201%201.029-.203%202.69%202.69%200%200%201%201.872.758c.241.235.433.512.574.833.142.32.213.668.213%201.042a2.645%202.645%200%200%201-.787%201.9%202.658%202.658%200%200%201-1.872.762c-.364%200-.708-.068-1.029-.203a2.645%202.645%200%200%201-1.419-1.388%202.54%202.54%200%200%201-.212-1.042z'%20/%3e%3c/g%3e%3c/svg%3e",
  kR = `
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
  Rg = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"],
  HR = "https://enroll.zellepay.com/qr-codes",
  qR = {
    name: "",
    action: "payment",
    token: "",
    amount: "",
    currency: "USD",
    note: ""
  };
function VR(a) {
  const l = new TextEncoder().encode(a);
  let r = "";
  return (
    l.forEach((u) => {
      r += String.fromCharCode(u);
    }),
    btoa(r)
  );
}
function Cg(a) {
  const l = { name: a.name.trim(), action: a.action, token: a.token.trim() };
  if (a.amount.trim()) {
    const r = Number(a.amount);
    Number.isFinite(r) && r > 0 && (l.amount = r);
  }
  return (
    a.currency.trim() && (l.currency = a.currency.trim().toUpperCase()),
    a.note.trim() && (l.note = a.note.trim()),
    l
  );
}
function YR(a) {
  const l = Cg(a),
    r = VR(JSON.stringify(l)),
    u = new URL(HR);
  return (u.searchParams.set("data", r), u.toString());
}
function GR(a) {
  const l = a.amount.trim();
  return (
    a.name.trim().length > 0 &&
    a.action.trim().length > 0 &&
    a.token.trim().length > 0 &&
    (l.length === 0 || (Number.isFinite(Number(l)) && Number(l) > 0))
  );
}
function QR(a) {
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
function ed(a) {
  const l = a.trim()[0]?.toUpperCase();
  return l && /[A-Z]/.test(l) ? l : "#";
}
function FR(a) {
  return a.reduce((l, r) => {
    const u = ed(r.name);
    return ((l[u] = l[u] || []), l[u].push(r), l);
  }, {});
}
function XR(a, l, r) {
  const u = l.trim().toLowerCase();
  return a.filter((o) => {
    const f = r === "All" || ed(o.name) === r,
      d =
        u.length === 0 ||
        [o.name, o.keywords, o.city].join(" ").toLowerCase().includes(u);
    return f && d;
  });
}
function ZR(a, l) {
  const r = l.trim().toLowerCase();
  return r.length === 0
    ? a
    : a.filter((u) =>
        [u.name, u.keywords, u.city].join(" ").toLowerCase().includes(r)
      );
}
function IR({ institution: a, onSelect: l }) {
  return a.enrollmentUrl || a.website
    ? B.jsx("button", {
        className: "institution-name institution-trigger",
        type: "button",
        onClick: () => l(a),
        children: a.name
      })
    : B.jsx("span", { className: "institution-name", children: a.name });
}
function KR({ institutions: a, onSelectInstitution: l }) {
  const r = FR(a),
    u = Rg.filter((o) => r[o]?.length);
  return B.jsx("div", {
    className: "results-list",
    children: u.map((o) =>
      B.jsxs(
        "section",
        {
          className: "letter-section",
          "aria-labelledby": `letter-${o}`,
          children: [
            B.jsx("h2", { id: `letter-${o}`, children: o }),
            B.jsx("div", {
              className: "letter-results",
              children: r[o].map((f) =>
                B.jsx(IR, { institution: f, onSelect: l }, f.id)
              )
            })
          ]
        },
        o
      )
    )
  });
}
function JR({ institution: a, onCancel: l }) {
  const r = a.enrollmentUrl || a.website;
  return r
    ? B.jsx("div", {
        className: "modal-backdrop",
        role: "presentation",
        children: B.jsxs("section", {
          className: "bank-modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": "bank-modal-title",
          "aria-describedby": "bank-modal-description",
          children: [
            B.jsx("header", {
              className: "bank-modal-header",
              children: B.jsx("h2", {
                id: "bank-modal-title",
                children: "Great News!"
              })
            }),
            B.jsxs("div", {
              className: "bank-modal-body",
              children: [
                B.jsxs("p", {
                  className: "bank-modal-offer",
                  children: [
                    a.name,
                    " Offers Zelle",
                    B.jsx("sup", { children: "®" })
                  ]
                }),
                a.logoUrl
                  ? B.jsx("img", {
                      className: "bank-modal-logo",
                      src: a.logoUrl,
                      alt: `${a.name} logo`
                    })
                  : B.jsx("div", {
                      className: "bank-modal-logo-fallback",
                      "aria-hidden": "true",
                      children: a.name.slice(0, 2).toUpperCase()
                    }),
                B.jsxs("p", {
                  id: "bank-modal-description",
                  className: "bank-modal-primary",
                  children: [
                    "Your bank offers Zelle",
                    B.jsx("sup", { children: "®" }),
                    "! You can use your banking app to send and receive money with Zelle",
                    B.jsx("sup", { children: "®" }),
                    "."
                  ]
                }),
                B.jsxs("p", {
                  className: "bank-modal-disclaimer",
                  children: [
                    'By selecting "Continue to your bank", you will be taken to an external interface with different privacy and information security policy. Zelle',
                    B.jsx("sup", { children: "®" }),
                    " is not responsible for and does not endorse the products, services or content that is offered or expressed."
                  ]
                }),
                B.jsx("a", {
                  className: "continue-bank-link",
                  href: r,
                  target: "_blank",
                  rel: "noreferrer",
                  children: "Continue to your bank"
                }),
                B.jsx("button", {
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
function $R() {
  return B.jsxs("footer", {
    className: "zelle-info",
    children: [
      B.jsxs("section", {
        className: "zelle-info-panel",
        "aria-labelledby": "zelle-info-heading",
        children: [
          B.jsxs("h2", {
            id: "zelle-info-heading",
            children: ["What is Zelle", B.jsx("sup", { children: "®" }), "?"]
          }),
          B.jsxs("p", {
            children: [
              "Zelle",
              B.jsx("sup", { children: "®" }),
              " is a fast, safe and easy way to send and receive money directly between almost any bank accounts in the U.S., typically within minutes.",
              B.jsx("sup", { children: "1" }),
              " With just an email address or U.S. mobile phone number, you can send money to and receive money from friends, family and others you trust."
            ]
          }),
          B.jsx("a", {
            className: "learn-more",
            href: "https://www.zellepay.com/how-it-works",
            target: "_blank",
            rel: "noreferrer",
            children: "Learn More"
          })
        ]
      }),
      B.jsxs("section", {
        className: "zelle-footer-nav",
        "aria-label": "Zelle footer links",
        children: [
          B.jsxs("div", {
            className: "footer-lockup",
            children: [
              B.jsx("img", { src: Wf, alt: "Zelle" }),
              B.jsxs("nav", {
                children: [
                  B.jsx("a", {
                    href: "https://www.zellepay.com/contact-us",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Contact Us"
                  }),
                  B.jsx("a", {
                    href: "https://www.zellepay.com/financial-institutions",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Partners"
                  }),
                  B.jsx("a", {
                    href: "https://www.zellepay.com/press-releases",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Press"
                  }),
                  B.jsx("a", {
                    href: "https://www.zellepay.com/legal",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Legal"
                  }),
                  B.jsx("a", {
                    href: "https://www.zellepay.com/privacy",
                    target: "_blank",
                    rel: "noreferrer",
                    children: "Your Privacy Rights"
                  })
                ]
              }),
              B.jsxs("nav", {
                className: "social-links",
                "aria-label": "Zelle social media",
                children: [
                  B.jsx("a", {
                    href: "https://twitter.com/Zelle",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Twitter",
                    children: B.jsx(zR, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  B.jsx("a", {
                    href: "https://www.facebook.com/Zelle",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Facebook",
                    children: B.jsx(RR, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  B.jsx("a", {
                    href: "https://www.instagram.com/zellepay/",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on Instagram",
                    children: B.jsx(NR, {
                      size: 22,
                      strokeWidth: 2.4,
                      "aria-hidden": "true"
                    })
                  }),
                  B.jsx("a", {
                    href: "https://www.youtube.com/user/ZellePay",
                    target: "_blank",
                    rel: "noreferrer",
                    "aria-label": "Zelle on YouTube",
                    children: B.jsx(BR, {
                      size: 24,
                      strokeWidth: 2.2,
                      "aria-hidden": "true"
                    })
                  })
                ]
              })
            ]
          }),
          B.jsx("div", { className: "footer-rule" }),
          B.jsxs("p", {
            className: "footnote",
            children: [
              B.jsx("sup", { children: "1" }),
              " Must have a bank account in the U.S. to use Zelle",
              B.jsx("sup", { children: "®" }),
              ". Transactions typically occur in minutes when the recipient's email address or U.S. mobile number is already enrolled with Zelle",
              B.jsx("sup", { children: "®" }),
              "."
            ]
          }),
          B.jsx("p", {
            className: "copyright",
            children:
              "©2026 Early Warning Services, LLC. All rights reserved. Zelle, the Zelle related marks, and the color purple are registered trademarks or trademarks of Early Warning Services, LLC."
          })
        ]
      })
    ]
  });
}
function PR() {
  const [a, l] = U.useState(qR),
    [r, u] = U.useState(""),
    [o, f] = U.useState(""),
    d = GR(a),
    m = YR(a),
    y = Cg(a);
  U.useEffect(() => {
    let N = !0;
    async function j() {
      const Y = await dR.toDataURL(m, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 320,
        color: { dark: "#1f1b24", light: "#ffffff" }
      });
      N && u(Y);
    }
    return (
      j(),
      () => {
        N = !1;
      }
    );
  }, [m]);
  function p(N, j) {
    (l((Y) => ({ ...Y, [N]: j })), f(""));
  }
  async function v() {
    if (m)
      try {
        (await navigator.clipboard.writeText(m), f("Link copied"));
      } catch {
        f("Copy failed");
      }
  }
  function b() {
    window.print();
  }
  function S() {
    if (!r) return;
    const N = document.createElement("a");
    ((N.href = r),
      (N.download = `${a.name.trim() || "merchant"}-zelle-qr.png`),
      N.click());
  }
  async function R() {
    if (m) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${a.name.trim()} Zelle QR`,
            text: a.note.trim() || `${a.name.trim()} Zelle QR`,
            url: m
          });
        } catch {
          return;
        }
        return;
      }
      await v();
    }
  }
  return B.jsxs("main", {
    className: "app-shell merchant-page",
    children: [
      B.jsx("header", {
        className: "brand-header",
        children: B.jsxs("div", {
          className: "brand-inner merchant-brand-inner",
          children: [
            B.jsxs("div", {
              className: "zelle-lockup",
              "aria-label": "Zelle Merchant QR",
              children: [
                B.jsx("a", {
                  className: "zelle-home-link",
                  href: "https://www.zellepay.com/",
                  target: "_blank",
                  rel: "noreferrer",
                  children: B.jsx("img", {
                    className: "zelle-wordmark",
                    src: Wf,
                    alt: "Zelle"
                  })
                }),
                B.jsx("span", {
                  className: "lockup-divider",
                  "aria-hidden": "true"
                }),
                B.jsx("span", {
                  className: "lockup-title",
                  children: "Merchant QR"
                })
              ]
            }),
            B.jsx(cs, {
              className: "merchant-header-link",
              to: "/",
              children: "Find your bank"
            })
          ]
        })
      }),
      B.jsxs("section", {
        className: "merchant-workspace",
        children: [
          B.jsxs("form", {
            className: "merchant-form",
            onSubmit: (N) => N.preventDefault(),
            children: [
              B.jsxs("div", {
                className: "merchant-form-row",
                children: [
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "Name" }),
                      B.jsx("input", {
                        value: a.name,
                        onChange: (N) => p("name", N.target.value),
                        required: !0,
                        autoComplete: "organization"
                      })
                    ]
                  }),
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "Action" }),
                      B.jsxs("select", {
                        value: a.action,
                        onChange: (N) => p("action", N.target.value),
                        children: [
                          B.jsx("option", {
                            value: "payment",
                            children: "payment"
                          }),
                          B.jsx("option", {
                            value: "request",
                            children: "request"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              B.jsxs("label", {
                children: [
                  B.jsx("span", { children: "Token" }),
                  B.jsx("input", {
                    value: a.token,
                    onChange: (N) => p("token", N.target.value),
                    required: !0,
                    autoComplete: "email",
                    inputMode: "email"
                  })
                ]
              }),
              B.jsxs("div", {
                className: "merchant-form-row",
                children: [
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "Amount" }),
                      B.jsx("input", {
                        value: a.amount,
                        onChange: (N) => p("amount", N.target.value),
                        min: "0.01",
                        step: "0.01",
                        type: "number"
                      })
                    ]
                  }),
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "Currency" }),
                      B.jsx("input", {
                        value: a.currency,
                        onChange: (N) =>
                          p("currency", N.target.value.toUpperCase()),
                        maxLength: 3,
                        autoComplete: "off"
                      })
                    ]
                  })
                ]
              }),
              B.jsxs("label", {
                children: [
                  B.jsx("span", { children: "Note" }),
                  B.jsx("textarea", {
                    value: a.note,
                    onChange: (N) => p("note", N.target.value),
                    rows: 4
                  })
                ]
              })
            ]
          }),
          B.jsxs("section", {
            className: "merchant-preview",
            "aria-label": "Generated QR code",
            children: [
              B.jsxs("div", {
                className: "print-card",
                children: [
                  B.jsx("p", {
                    className: "print-card-title",
                    children: a.name.trim() || "Merchant QR draft"
                  }),
                  B.jsx("div", {
                    className: "qr-frame",
                    children: r
                      ? B.jsx("img", {
                          src: r,
                          alt: `${a.name.trim() || "Merchant"} Zelle QR code`
                        })
                      : B.jsx("span", { children: "QR preview" })
                  }),
                  B.jsx("p", {
                    className: "print-card-note",
                    children: a.note.trim() || "Scan to pay with Zelle"
                  })
                ]
              }),
              B.jsxs("div", {
                className: "merchant-actions",
                children: [
                  B.jsxs("button", {
                    type: "button",
                    onClick: v,
                    disabled: !d,
                    children: [
                      B.jsx(bR, { size: 18, "aria-hidden": "true" }),
                      "Copy link"
                    ]
                  }),
                  B.jsxs("button", {
                    type: "button",
                    onClick: R,
                    disabled: !d,
                    children: [
                      B.jsx(MR, { size: 18, "aria-hidden": "true" }),
                      "Share"
                    ]
                  }),
                  B.jsxs("button", {
                    type: "button",
                    onClick: b,
                    disabled: !d || !r,
                    children: [
                      B.jsx(AR, { size: 18, "aria-hidden": "true" }),
                      "Print"
                    ]
                  }),
                  B.jsxs("button", {
                    type: "button",
                    onClick: S,
                    disabled: !d || !r,
                    children: [
                      B.jsx(SR, { size: 18, "aria-hidden": "true" }),
                      "Download"
                    ]
                  })
                ]
              }),
              o &&
                B.jsx("p", { className: "merchant-copy-status", children: o }),
              B.jsxs("div", {
                className: "merchant-output",
                children: [
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "Payload" }),
                      B.jsx("textarea", {
                        readOnly: !0,
                        value: JSON.stringify(y, null, 2),
                        rows: 8
                      })
                    ]
                  }),
                  B.jsxs("label", {
                    children: [
                      B.jsx("span", { children: "QR link" }),
                      B.jsx("textarea", { readOnly: !0, value: m, rows: 4 })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}
function WR() {
  const [a, l] = U.useState([]),
    [r, u] = U.useState(""),
    [o, f] = U.useState("All"),
    [d, m] = U.useState(null),
    [y, p] = U.useState(!0),
    [v, b] = U.useState("");
  U.useEffect(() => {
    let j = !0;
    async function Y() {
      (p(!0), b(""));
      try {
        const G = await GT(),
          K = [];
        let Z = null,
          $ = !0,
          se = !1;
        for (; $;) {
          const ee = await G.graphql?.query({
            query: kR,
            variables: { after: Z }
          });
          if (ee?.errors?.length)
            throw new Error(ee.errors.map((A) => A.message).join("; "));
          const H = ee?.data?.uiapi.query.Account;
          (K.push(...(H?.edges.map((A) => QR(A.node)) || [])),
            ($ = H?.pageInfo.hasNextPage === !0),
            (Z = H?.pageInfo.endCursor || null),
            j && (l([...K]), se || (p(!1), (se = !0))));
        }
      } catch (G) {
        j && b(G instanceof Error ? G.message : "Unable to load institutions.");
      } finally {
        j && p(!1);
      }
    }
    return (
      Y(),
      () => {
        j = !1;
      }
    );
  }, []);
  const S = U.useMemo(() => ZR(a, r), [a, r]),
    R = U.useMemo(() => new Set(S.map((j) => ed(j.name))), [S]),
    N = U.useMemo(() => XR(a, r, o), [a, r, o]);
  return (
    U.useEffect(() => {
      o !== "All" && !R.has(o) && f("All");
    }, [R, o]),
    B.jsxs("main", {
      className: "app-shell",
      children: [
        B.jsx("header", {
          className: "brand-header",
          children: B.jsxs("div", {
            className: "brand-inner",
            children: [
              B.jsxs("div", {
                className: "zelle-lockup",
                "aria-label": "Zelle Find Your Bank",
                children: [
                  B.jsx("a", {
                    className: "zelle-home-link",
                    href: "https://www.zellepay.com/",
                    target: "_blank",
                    rel: "noreferrer",
                    children: B.jsx("img", {
                      className: "zelle-wordmark",
                      src: Wf,
                      alt: "Zelle"
                    })
                  }),
                  B.jsx("span", {
                    className: "lockup-divider",
                    "aria-hidden": "true"
                  }),
                  B.jsx("span", {
                    className: "lockup-title",
                    children: "Find Your Bank"
                  })
                ]
              }),
              B.jsx(cs, {
                className: "merchant-header-link",
                to: "/merchant-qr",
                children: "Merchant QR"
              })
            ]
          })
        }),
        B.jsx("section", {
          className: "search-hero",
          "aria-label": "Institution search",
          children: B.jsx("div", {
            className: "search-inner",
            children: B.jsxs("label", {
              className: "search-box",
              children: [
                B.jsx(_R, {
                  className: "search-icon",
                  size: 42,
                  strokeWidth: 1.5,
                  "aria-hidden": "true"
                }),
                B.jsx("input", {
                  value: r,
                  onChange: (j) => {
                    (u(j.target.value), f("All"));
                  },
                  placeholder: "Search",
                  "aria-label": "Search by institution name or city"
                }),
                r &&
                  B.jsx("button", {
                    className: "clear-button",
                    type: "button",
                    onClick: () => u(""),
                    "aria-label": "Clear search",
                    children: B.jsx(LR, { size: 22 })
                  })
              ]
            })
          })
        }),
        B.jsx("nav", {
          className: "alphabet-band",
          "aria-label": "Filter by first letter",
          children: B.jsx("div", {
            className: "alphabet-filter",
            children: Rg.map((j) => {
              const Y = R.has(j);
              return B.jsx(
                "button",
                {
                  type: "button",
                  className: o === j ? "active" : "",
                  disabled: !Y,
                  onClick: () => f(o === j ? "All" : j),
                  children: j
                },
                j
              );
            })
          })
        }),
        B.jsxs("section", {
          className: "results-summary",
          "aria-live": "polite",
          children: [
            B.jsx("strong", { children: N.length }),
            B.jsx("span", {
              children: N.length === 1 ? " institution" : " institutions"
            })
          ]
        }),
        y &&
          B.jsx("div", {
            className: "state-panel",
            children: "Loading institutions..."
          }),
        !y &&
          v &&
          B.jsxs("div", {
            className: "state-panel error",
            children: [
              B.jsx("strong", { children: "Could not load institutions." }),
              B.jsx("p", { children: v })
            ]
          }),
        !y &&
          !v &&
          N.length === 0 &&
          B.jsx("div", {
            className: "state-panel",
            children: "No matching institutions found."
          }),
        !y &&
          !v &&
          N.length > 0 &&
          B.jsx(KR, { institutions: N, onSelectInstitution: m }),
        B.jsx($R, {}),
        d && B.jsx(JR, { institution: d, onCancel: () => m(null) })
      ]
    })
  );
}
function e3() {
  return B.jsx("main", {
    className: "app-shell",
    children: B.jsx("h1", { children: "Page not found" })
  });
}
const dp = globalThis.SFDC_ENV?.basePath,
  t3 = typeof dp == "string" ? dp.replace(/\/+$/, "") : void 0,
  n3 = Kb(
    [
      { path: "/", element: B.jsx(WR, {}) },
      { path: "/merchant-qr", element: B.jsx(PR, {}) },
      { path: "*", element: B.jsx(e3, {}) }
    ],
    { basename: t3 }
  );
q1.createRoot(document.getElementById("root")).render(
  B.jsx(U.StrictMode, { children: B.jsx(Sb, { router: n3 }) })
);
