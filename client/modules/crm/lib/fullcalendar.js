/*!
FullCalendar Standard Bundle v6.1.8
Docs & License: https://fullcalendar.io/docs/initialize-globals
(c) 2023 Adam Shaw
*/
var FullCalendar = (function (t) {
  "use strict";
  var T,
    C,
    s,
    r,
    i,
    a,
    _ = {},
    b = [],
    l = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
  function k(e, t) {
    for (var n in t) e[n] = t[n];
    return e;
  }
  function M(e) {
    var t = e.parentNode;
    t && t.removeChild(e);
  }
  function E(e, t, n) {
    var r,
      i,
      s,
      o = {};
    for (s in t)
      "key" == s ? (r = t[s]) : "ref" == s ? (i = t[s]) : (o[s] = t[s]);
    if (
      (2 < arguments.length &&
        (o.children = 3 < arguments.length ? T.call(arguments, 2) : n),
      "function" == typeof e && null != e.defaultProps)
    )
      for (s in e.defaultProps) void 0 === o[s] && (o[s] = e.defaultProps[s]);
    return S(e, o, r, i, null);
  }
  function S(e, t, n, r, i) {
    e = {
      type: e,
      props: t,
      key: n,
      ref: r,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: null == i ? ++s : i,
    };
    return null == i && null != C.vnode && C.vnode(e), e;
  }
  function c() {
    return { current: null };
  }
  function R(e) {
    return e.children;
  }
  function d(e, t, n) {
    "-" === t[0]
      ? e.setProperty(t, null == n ? "" : n)
      : (e[t] =
          null == n ? "" : "number" != typeof n || l.test(t) ? n : n + "px");
  }
  function I(e, t, n, r, i) {
    var s;
    e: if ("style" === t)
      if ("string" == typeof n) e.style.cssText = n;
      else {
        if (("string" == typeof r && (e.style.cssText = r = ""), r))
          for (t in r) (n && t in n) || d(e.style, t, "");
        if (n) for (t in n) (r && n[t] === r[t]) || d(e.style, t, n[t]);
      }
    else if ("o" === t[0] && "n" === t[1])
      (s = t !== (t = t.replace(/Capture$/, ""))),
        (t = (t.toLowerCase() in e ? t.toLowerCase() : t).slice(2)),
        e.l || (e.l = {}),
        (e.l[t + s] = n),
        n
          ? r || e.addEventListener(t, s ? h : u, s)
          : e.removeEventListener(t, s ? h : u, s);
    else if ("dangerouslySetInnerHTML" !== t) {
      if (i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (
        "width" !== t &&
        "height" !== t &&
        "href" !== t &&
        "list" !== t &&
        "form" !== t &&
        "tabIndex" !== t &&
        "download" !== t &&
        t in e
      )
        try {
          e[t] = null == n ? "" : n;
          break e;
        } catch (e) {}
      "function" == typeof n ||
        (null == n || (!1 === n && -1 == t.indexOf("-"))
          ? e.removeAttribute(t)
          : e.setAttribute(t, n));
    }
  }
  function u(e) {
    i = !0;
    try {
      return this.l[e.type + !1](C.event ? C.event(e) : e);
    } finally {
      i = !1;
    }
  }
  function h(e) {
    i = !0;
    try {
      return this.l[e.type + !0](C.event ? C.event(e) : e);
    } finally {
      i = !1;
    }
  }
  function O(e, t) {
    (this.props = e), (this.context = t);
  }
  function N(e, t) {
    if (null == t) return e.__ ? N(e.__, e.__.__k.indexOf(e) + 1) : null;
    for (var n; t < e.__k.length; t++)
      if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
    return "function" == typeof e.type ? N(e) : null;
  }
  function f(e) {
    (i ? setTimeout : V)(e);
  }
  function m(e) {
    ((!e.__d && (e.__d = !0) && F.push(e) && !y.__r++) ||
      a !== C.debounceRendering) &&
      ((a = C.debounceRendering) || f)(y);
  }
  function y() {
    var e, t, n, r, i, s, o;
    for (
      F.sort(function (e, t) {
        return e.__v.__b - t.__v.__b;
      });
      (t = F.shift());

    )
      t.__d &&
        ((e = F.length),
        (r = void 0),
        (s = (i = (t = t).__v).__e),
        (o = t.__P) &&
          ((n = []),
          ((r = k({}, i)).__v = i.__v + 1),
          w(
            o,
            i,
            r,
            t.__n,
            void 0 !== o.ownerSVGElement,
            null != i.__h ? [s] : null,
            n,
            null == s ? N(i) : s,
            i.__h
          ),
          H(n, i),
          i.__e != s &&
            (function e(t) {
              var n, r;
              if (null != (t = t.__) && null != t.__c) {
                for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++)
                  if (null != (r = t.__k[n]) && null != r.__e) {
                    t.__e = t.__c.base = r.__e;
                    break;
                  }
                return e(t);
              }
            })(i)),
        F.length > e &&
          F.sort(function (e, t) {
            return e.__v.__b - t.__v.__b;
          }));
    y.__r = 0;
  }
  function P(e, d, t, u, h, f, g, p, n, v) {
    var r,
      i,
      s,
      o,
      a,
      m,
      l,
      c = (u && u.__k) || b,
      y = c.length;
    for (t.__k = [], r = 0; r < d.length; r++)
      if (
        null !=
        (o = t.__k[r] =
          null == (o = d[r]) || "boolean" == typeof o
            ? null
            : "string" == typeof o ||
              "number" == typeof o ||
              "bigint" == typeof o
            ? S(null, o, null, null, o)
            : Array.isArray(o)
            ? S(R, { children: o }, null, null, null)
            : 0 < o.__b
            ? S(o.type, o.props, o.key, o.ref || null, o.__v)
            : o)
      ) {
        if (
          ((o.__ = t),
          (o.__b = t.__b + 1),
          null === (s = c[r]) || (s && o.key == s.key && o.type === s.type))
        )
          c[r] = void 0;
        else
          for (i = 0; i < y; i++) {
            if ((s = c[i]) && o.key == s.key && o.type === s.type) {
              c[i] = void 0;
              break;
            }
            s = null;
          }
        w(e, o, (s = s || _), h, f, g, p, n, v),
          (a = o.__e),
          (i = o.ref) &&
            s.ref != i &&
            ((l = l || []),
            s.ref && l.push(s.ref, null, o),
            l.push(i, o.__c || a, o)),
          null != a
            ? (null == m && (m = a),
              "function" == typeof o.type && o.__k === s.__k
                ? (o.__d = n =
                    (function e(t, n, r) {
                      for (var i, s = t.__k, o = 0; s && o < s.length; o++)
                        (i = s[o]) &&
                          ((i.__ = t),
                          (n =
                            "function" == typeof i.type
                              ? e(i, n, r)
                              : D(r, i, i, s, i.__e, n)));
                      return n;
                    })(o, n, e))
                : (n = D(e, o, s, c, a, n)),
              "function" == typeof t.type && (t.__d = n))
            : n && s.__e == n && n.parentNode != e && (n = N(s));
      }
    for (t.__e = m, r = y; r--; )
      null != c[r] &&
        ("function" == typeof t.type &&
          null != c[r].__e &&
          c[r].__e == t.__d &&
          (t.__d = (function e(t) {
            var n, r, i;
            if (null == t.type || "string" == typeof t.type) return t.__e;
            if (t.__k)
              for (n = t.__k.length - 1; 0 <= n; n--)
                if ((r = t.__k[n]) && (i = e(r))) return i;
            return null;
          })(u).nextSibling),
        (function e(t, n, r) {
          var i, s;
          if (
            (C.unmount && C.unmount(t),
            (i = t.ref) &&
              ((i.current && i.current !== t.__e) || B(i, null, n)),
            null != (i = t.__c))
          ) {
            if (i.componentWillUnmount)
              try {
                i.componentWillUnmount();
              } catch (t) {
                C.__e(t, n);
              }
            (i.base = i.__P = null), (t.__c = void 0);
          }
          if ((i = t.__k))
            for (s = 0; s < i.length; s++)
              i[s] && e(i[s], n, r || "function" != typeof t.type);
          r || null == t.__e || M(t.__e), (t.__ = t.__e = t.__d = void 0);
        })(c[r], c[r]));
    if (l) for (r = 0; r < l.length; r++) B(l[r], l[++r], l[++r]);
  }
  function A(e, t) {
    return (
      (t = t || []),
      null == e ||
        "boolean" == typeof e ||
        (Array.isArray(e)
          ? e.some(function (e) {
              A(e, t);
            })
          : t.push(e)),
      t
    );
  }
  function D(e, t, n, r, i, s) {
    var o, a, l;
    if (void 0 !== t.__d) (o = t.__d), (t.__d = void 0);
    else if (null == n || i != s || null == i.parentNode)
      e: if (null == s || s.parentNode !== e) e.appendChild(i), (o = null);
      else {
        for (a = s, l = 0; (a = a.nextSibling) && l < r.length; l += 1)
          if (a == i) break e;
        e.insertBefore(i, s), (o = s);
      }
    return void 0 !== o ? o : i.nextSibling;
  }
  function w(d, t, e, n, u, r, h, i, f) {
    var s,
      o,
      g,
      p,
      v,
      m,
      y,
      a,
      b,
      l,
      E,
      S,
      A,
      D,
      w,
      c = t.type;
    if (void 0 === t.constructor) {
      null != e.__h &&
        ((f = e.__h), (i = t.__e = e.__e), (t.__h = null), (r = [i])),
        (s = C.__b) && s(t);
      try {
        e: if ("function" == typeof c) {
          if (
            ((a = t.props),
            (b = (s = c.contextType) && n[s.__c]),
            (l = s ? (b ? b.props.value : s.__) : n),
            e.__c
              ? (y = (o = t.__c = e.__c).__ = o.__E)
              : ("prototype" in c && c.prototype.render
                  ? (t.__c = o = new c(a, l))
                  : ((t.__c = o = new O(a, l)),
                    (o.constructor = c),
                    (o.render = j)),
                b && b.sub(o),
                (o.props = a),
                o.state || (o.state = {}),
                (o.context = l),
                (o.__n = n),
                (g = o.__d = !0),
                (o.__h = []),
                (o._sb = [])),
            null == o.__s && (o.__s = o.state),
            null != c.getDerivedStateFromProps &&
              (o.__s == o.state && (o.__s = k({}, o.__s)),
              k(o.__s, c.getDerivedStateFromProps(a, o.__s))),
            (p = o.props),
            (v = o.state),
            (o.__v = t),
            g)
          )
            null == c.getDerivedStateFromProps &&
              null != o.componentWillMount &&
              o.componentWillMount(),
              null != o.componentDidMount && o.__h.push(o.componentDidMount);
          else {
            if (
              (null == c.getDerivedStateFromProps &&
                a !== p &&
                null != o.componentWillReceiveProps &&
                o.componentWillReceiveProps(a, l),
              (!o.__e &&
                null != o.shouldComponentUpdate &&
                !1 === o.shouldComponentUpdate(a, o.__s, l)) ||
                t.__v === e.__v)
            ) {
              for (
                t.__v !== e.__v &&
                  ((o.props = a), (o.state = o.__s), (o.__d = !1)),
                  t.__e = e.__e,
                  t.__k = e.__k,
                  t.__k.forEach(function (e) {
                    e && (e.__ = t);
                  }),
                  E = 0;
                E < o._sb.length;
                E++
              )
                o.__h.push(o._sb[E]);
              (o._sb = []), o.__h.length && h.push(o);
              break e;
            }
            null != o.componentWillUpdate && o.componentWillUpdate(a, o.__s, l),
              null != o.componentDidUpdate &&
                o.__h.push(function () {
                  o.componentDidUpdate(p, v, m);
                });
          }
          if (
            ((o.context = l),
            (o.props = a),
            (o.__P = d),
            (S = C.__r),
            (A = 0),
            "prototype" in c && c.prototype.render)
          ) {
            for (
              o.state = o.__s,
                o.__d = !1,
                S && S(t),
                s = o.render(o.props, o.state, o.context),
                D = 0;
              D < o._sb.length;
              D++
            )
              o.__h.push(o._sb[D]);
            o._sb = [];
          } else
            for (
              ;
              (o.__d = !1),
                S && S(t),
                (s = o.render(o.props, o.state, o.context)),
                (o.state = o.__s),
                o.__d && ++A < 25;

            );
          (o.state = o.__s),
            null != o.getChildContext && (n = k(k({}, n), o.getChildContext())),
            g ||
              null == o.getSnapshotBeforeUpdate ||
              (m = o.getSnapshotBeforeUpdate(p, v)),
            (w =
              null != s && s.type === R && null == s.key
                ? s.props.children
                : s),
            P(d, Array.isArray(w) ? w : [w], t, e, n, u, r, h, i, f),
            (o.base = t.__e),
            (t.__h = null),
            o.__h.length && h.push(o),
            y && (o.__E = o.__ = null),
            (o.__e = !1);
        } else
          null == r && t.__v === e.__v
            ? ((t.__k = e.__k), (t.__e = e.__e))
            : (t.__e = (function (e, t, n, d, u, r, h, i) {
                var f,
                  g,
                  s,
                  o = n.props,
                  a = t.props,
                  l = t.type,
                  c = 0;
                if (("svg" === l && (u = !0), null != r))
                  for (; c < r.length; c++)
                    if (
                      (f = r[c]) &&
                      "setAttribute" in f == !!l &&
                      (l ? f.localName === l : 3 === f.nodeType)
                    ) {
                      (e = f), (r[c] = null);
                      break;
                    }
                if (null == e) {
                  if (null === l) return document.createTextNode(a);
                  (e = u
                    ? document.createElementNS("http://www.w3.org/2000/svg", l)
                    : document.createElement(l, a.is && a)),
                    (r = null),
                    (i = !1);
                }
                if (null === l) o === a || (i && e.data === a) || (e.data = a);
                else {
                  if (
                    ((r = r && T.call(e.childNodes)),
                    (g = (o = n.props || _).dangerouslySetInnerHTML),
                    (s = a.dangerouslySetInnerHTML),
                    !i)
                  ) {
                    if (null != r)
                      for (o = {}, c = 0; c < e.attributes.length; c++)
                        o[e.attributes[c].name] = e.attributes[c].value;
                    (s || g) &&
                      ((s &&
                        ((g && s.__html == g.__html) ||
                          s.__html === e.innerHTML)) ||
                        (e.innerHTML = (s && s.__html) || ""));
                  }
                  if (
                    ((function (e, t, n, r, i) {
                      for (var s in n)
                        "children" === s ||
                          "key" === s ||
                          s in t ||
                          I(e, s, null, n[s], r);
                      for (s in t)
                        (i && "function" != typeof t[s]) ||
                          "children" === s ||
                          "key" === s ||
                          "value" === s ||
                          "checked" === s ||
                          n[s] === t[s] ||
                          I(e, s, t[s], n[s], r);
                    })(e, a, o, u, i),
                    s)
                  )
                    t.__k = [];
                  else if (
                    ((c = t.props.children),
                    P(
                      e,
                      Array.isArray(c) ? c : [c],
                      t,
                      n,
                      d,
                      u && "foreignObject" !== l,
                      r,
                      h,
                      r ? r[0] : n.__k && N(n, 0),
                      i
                    ),
                    null != r)
                  )
                    for (c = r.length; c--; ) null != r[c] && M(r[c]);
                  i ||
                    ("value" in a &&
                      void 0 !== (c = a.value) &&
                      (c !== e.value ||
                        ("progress" === l && !c) ||
                        ("option" === l && c !== o.value)) &&
                      I(e, "value", c, o.value, !1),
                    "checked" in a &&
                      void 0 !== (c = a.checked) &&
                      c !== e.checked &&
                      I(e, "checked", c, o.checked, !1));
                }
                return e;
              })(e.__e, t, e, n, u, r, h, f));
        (s = C.diffed) && s(t);
      } catch (d) {
        (t.__v = null),
          (!f && null == r) ||
            ((t.__e = i), (t.__h = !!f), (r[r.indexOf(i)] = null)),
          C.__e(d, t, e);
      }
    }
  }
  function H(e, t) {
    C.__c && C.__c(t, e),
      e.some(function (t) {
        try {
          (e = t.__h),
            (t.__h = []),
            e.some(function (e) {
              e.call(t);
            });
        } catch (e) {
          C.__e(e, t.__v);
        }
      });
  }
  function B(e, t, n) {
    try {
      "function" == typeof e ? e(t) : (e.current = t);
    } catch (e) {
      C.__e(e, n);
    }
  }
  function j(e, t, n) {
    return this.constructor(e, n);
  }
  function z(e, t, n) {
    var r, i, s;
    C.__ && C.__(e, t),
      (i = (r = "function" == typeof n) ? null : (n && n.__k) || t.__k),
      (s = []),
      w(
        t,
        (e = ((!r && n) || t).__k = E(R, null, [e])),
        i || _,
        _,
        void 0 !== t.ownerSVGElement,
        !r && n ? [n] : !i && t.firstChild ? T.call(t.childNodes) : null,
        s,
        !r && n ? n : i ? i.__e : t.firstChild,
        r
      ),
      H(s, e);
  }
  (T = b.slice),
    (C = {
      __e: function (e, t, n, r) {
        for (var i, s, o; (t = t.__); )
          if ((i = t.__c) && !i.__)
            try {
              if (
                ((s = i.constructor) &&
                  null != s.getDerivedStateFromError &&
                  (i.setState(s.getDerivedStateFromError(e)), (o = i.__d)),
                null != i.componentDidCatch &&
                  (i.componentDidCatch(e, r || {}), (o = i.__d)),
                o)
              )
                return (i.__E = i);
            } catch (t) {
              e = t;
            }
        throw e;
      },
    }),
    (s = 0),
    (i = !(r = function (e) {
      return null != e && void 0 === e.constructor;
    })),
    (O.prototype.setState = function (e, t) {
      var n =
        null != this.__s && this.__s !== this.state
          ? this.__s
          : (this.__s = k({}, this.state));
      (e = "function" == typeof e ? e(k({}, n), this.props) : e) && k(n, e),
        null != e && this.__v && (t && this._sb.push(t), m(this));
    }),
    (O.prototype.forceUpdate = function (e) {
      this.__v && ((this.__e = !0), e && this.__h.push(e), m(this));
    }),
    (O.prototype.render = R);
  var U,
    W,
    L,
    F = [],
    V =
      "function" == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout,
    G = (y.__r = 0),
    Q = [],
    q = [],
    Y = C.__b,
    Z = C.__r,
    X = C.diffed,
    J = C.__c,
    $ = C.unmount;
  function K() {
    for (var t; (t = Q.shift()); )
      if (t.__P && t.__H)
        try {
          t.__H.__h.forEach(te), t.__H.__h.forEach(ne), (t.__H.__h = []);
        } catch (e) {
          (t.__H.__h = []), C.__e(e, t.__v);
        }
  }
  (C.__b = function (e) {
    (U = null), Y && Y(e);
  }),
    (C.__r = function (e) {
      Z && Z(e);
      e = (U = e.__c).__H;
      e &&
        (W === U
          ? ((e.__h = []),
            (U.__h = []),
            e.__.forEach(function (e) {
              e.__N && (e.__ = e.__N), (e.__V = q), (e.__N = e.i = void 0);
            }))
          : (e.__h.forEach(te), e.__h.forEach(ne), (e.__h = []))),
        (W = U);
    }),
    (C.diffed = function (e) {
      X && X(e);
      e = e.__c;
      e &&
        e.__H &&
        (e.__H.__h.length &&
          ((1 !== Q.push(e) && L === C.requestAnimationFrame) ||
            (
              (L = C.requestAnimationFrame) ||
              function (e) {
                function t() {
                  clearTimeout(r), ee && cancelAnimationFrame(n), setTimeout(e);
                }
                var n,
                  r = setTimeout(t, 100);
                ee && (n = requestAnimationFrame(t));
              }
            )(K)),
        e.__H.__.forEach(function (e) {
          e.i && (e.__H = e.i),
            e.__V !== q && (e.__ = e.__V),
            (e.i = void 0),
            (e.__V = q);
        })),
        (W = U = null);
    }),
    (C.__c = function (e, n) {
      n.some(function (t) {
        try {
          t.__h.forEach(te),
            (t.__h = t.__h.filter(function (e) {
              return !e.__ || ne(e);
            }));
        } catch (e) {
          n.some(function (e) {
            e.__h && (e.__h = []);
          }),
            (n = []),
            C.__e(e, t.__v);
        }
      }),
        J && J(e, n);
    }),
    (C.unmount = function (e) {
      $ && $(e);
      var t,
        e = e.__c;
      e &&
        e.__H &&
        (e.__H.__.forEach(function (e) {
          try {
            te(e);
          } catch (e) {
            t = e;
          }
        }),
        (e.__H = void 0),
        t && C.__e(t, e.__v));
    });
  var ee = "function" == typeof requestAnimationFrame;
  function te(e) {
    var t = U,
      n = e.__c;
    "function" == typeof n && ((e.__c = void 0), n()), (U = t);
  }
  function ne(e) {
    var t = U;
    (e.__c = e.__()), (U = t);
  }
  new O().isPureReactComponent = !0;
  var re = C.__b,
    ie =
      ((C.__b = function (e) {
        e.type &&
          e.type.__f &&
          e.ref &&
          ((e.props.ref = e.ref), (e.ref = null)),
          re && re(e);
      }),
      C.__e),
    se =
      ((C.__e = function (e, t, n, r) {
        if (e.then)
          for (var i, s = t; (s = s.__); )
            if ((i = s.__c) && i.__c)
              return (
                null == t.__e && ((t.__e = n.__e), (t.__k = n.__k)), i.__c(e, t)
              );
        ie(e, t, n, r);
      }),
      C.unmount);
  function oe(e) {
    var t = e.__.__c;
    return t && t.__a && t.__a(e);
  }
  (C.unmount = function (e) {
    var t = e.__c;
    t && t.__R && t.__R(), t && !0 === e.__h && (e.type = null), se && se(e);
  }),
    (new O().__c = function (e, t) {
      function n() {
        o || ((o = !0), (r.__R = null), s ? s(a) : a());
      }
      var r = t.__c,
        i = this,
        s = (null == i.t && (i.t = []), i.t.push(r), oe(i.__v)),
        o = !1,
        a =
          ((r.__R = n),
          function () {
            var e, t;
            if (!--i.__u)
              for (
                i.state.__a &&
                  ((e = i.state.__a),
                  (i.__v.__k[0] = (function t(e, n, r) {
                    return (
                      e &&
                        ((e.__v = null),
                        (e.__k =
                          e.__k &&
                          e.__k.map(function (e) {
                            return t(e, n, r);
                          })),
                        e.__c &&
                          e.__c.__P === n &&
                          (e.__e && r.insertBefore(e.__e, e.__d),
                          (e.__c.__e = !0),
                          (e.__c.__P = r))),
                      e
                    );
                  })(e, e.__c.__P, e.__c.__O))),
                  i.setState({ __a: (i.__b = null) });
                (t = i.t.pop());

              )
                t.forceUpdate();
          }),
        t = !0 === t.__h;
      i.__u++ || t || i.setState({ __a: (i.__b = i.__v.__k[0]) }), e.then(n, n);
    });
  function ae(e, t, n) {
    if (
      (++n[1] === n[0] && e.o.delete(t),
      e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size))
    )
      for (n = e.u; n; ) {
        for (; 3 < n.length; ) n.pop()();
        if (n[1] < n[0]) break;
        e.u = n = n[2];
      }
  }
  function le(e) {
    return (
      (this.getChildContext = function () {
        return e.context;
      }),
      e.children
    );
  }
  function ce(e) {
    var n = this,
      t = e.i;
    (n.componentWillUnmount = function () {
      z(null, n.l), (n.l = null), (n.i = null);
    }),
      n.i && n.i !== t && n.componentWillUnmount(),
      e.__v
        ? (n.l ||
            ((n.i = t),
            (n.l = {
              nodeType: 1,
              parentNode: t,
              childNodes: [],
              appendChild: function (e) {
                this.childNodes.push(e), n.i.appendChild(e);
              },
              insertBefore: function (e, t) {
                this.childNodes.push(e), n.i.appendChild(e);
              },
              removeChild: function (e) {
                this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1),
                  n.i.removeChild(e);
              },
            })),
          z(E(le, { context: n.context }, e.__v), n.l))
        : n.l && n.componentWillUnmount();
  }
  function de(e, t) {
    e = E(ce, { __v: e, i: t });
    return (e.containerInfo = t), e;
  }
  new O().__a = function (n) {
    var r = this,
      i = oe(r.__v),
      s = r.o.get(n);
    return (
      s[0]++,
      function (e) {
        function t() {
          r.props.revealOrder ? (s.push(e), ae(r, n, s)) : e();
        }
        i ? i(t) : t();
      }
    );
  };
  var ue =
      ("undefined" != typeof Symbol &&
        Symbol.for &&
        Symbol.for("react.element")) ||
      60103,
    he =
      /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
    fe = "undefined" != typeof document,
    ge =
      ((O.prototype.isReactComponent = {}),
      [
        "componentWillMount",
        "componentWillReceiveProps",
        "componentWillUpdate",
      ].forEach(function (t) {
        Object.defineProperty(O.prototype, t, {
          configurable: !0,
          get: function () {
            return this["UNSAFE_" + t];
          },
          set: function (e) {
            Object.defineProperty(this, t, {
              configurable: !0,
              writable: !0,
              value: e,
            });
          },
        });
      }),
      C.event);
  function pe() {}
  function ve() {
    return this.cancelBubble;
  }
  function me() {
    return this.defaultPrevented;
  }
  C.event = function (e) {
    return (
      ((e = ge ? ge(e) : e).persist = pe),
      (e.isPropagationStopped = ve),
      (e.isDefaultPrevented = me),
      (e.nativeEvent = e)
    );
  };
  var ye = {
      configurable: !0,
      get: function () {
        return this.class;
      },
    },
    be = C.vnode,
    Ee =
      ((C.vnode = function (e) {
        var t,
          n = e.type,
          r = e.props,
          i = r;
        if ("string" == typeof n) {
          var s,
            o = -1 === n.indexOf("-"),
            i = {};
          for (s in r) {
            var a = r[s];
            (fe && "children" === s && "noscript" === n) ||
              ("value" === s && "defaultValue" in r && null == a) ||
              ("defaultValue" === s && "value" in r && null == r.value
                ? (s = "value")
                : "download" === s && !0 === a
                ? (a = "")
                : /ondoubleclick/i.test(s)
                ? (s = "ondblclick")
                : /^onchange(textarea|input)/i.test(s + n) &&
                  ((t = r.type),
                  !(
                    "undefined" != typeof Symbol && "symbol" == typeof Symbol()
                      ? /fil|che|rad/i
                      : /fil|che|ra/i
                  ).test(t))
                ? (s = "oninput")
                : /^onfocus$/i.test(s)
                ? (s = "onfocusin")
                : /^onblur$/i.test(s)
                ? (s = "onfocusout")
                : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(s)
                ? (s = s.toLowerCase())
                : o && he.test(s)
                ? (s = s.replace(/[A-Z0-9]/g, "-$&").toLowerCase())
                : null === a && (a = void 0),
              /^oninput$/i.test(s) &&
                ((s = s.toLowerCase()), i[s] && (s = "oninputCapture")),
              (i[s] = a));
          }
          "select" == n &&
            i.multiple &&
            Array.isArray(i.value) &&
            (i.value = A(r.children).forEach(function (e) {
              e.props.selected = -1 != i.value.indexOf(e.props.value);
            })),
            "select" == n &&
              null != i.defaultValue &&
              (i.value = A(r.children).forEach(function (e) {
                e.props.selected = i.multiple
                  ? -1 != i.defaultValue.indexOf(e.props.value)
                  : i.defaultValue == e.props.value;
              })),
            (e.props = i),
            r.class != r.className &&
              ((ye.enumerable = "className" in r),
              null != r.className && (i.class = r.className),
              Object.defineProperty(i, "className", ye));
        }
        (e.$$typeof = ue), be && be(e);
      }),
      C.__r);
  C.__r = function (e) {
    Ee && Ee(e), e.__c;
  };
  const Se = [],
    Ae = new Map();
  function De(t) {
    Se.push(t),
      Ae.forEach((e) => {
        Ce(e, t);
      });
  }
  function we(e) {
    let t = Ae.get(e);
    if (!t || !t.isConnected) {
      if (!(t = e.querySelector("style[data-fullcalendar]"))) {
        (t = document.createElement("style")).setAttribute(
          "data-fullcalendar",
          ""
        );
        var n = (function () {
          void 0 === Re &&
            (Re = (function () {
              const e = document.querySelector('meta[name="csp-nonce"]');
              if (e && e.hasAttribute("content"))
                return e.getAttribute("content");
              var t = document.querySelector("script[nonce]");
              if (t) return t.nonce || "";
              return "";
            })());
          return Re;
        })();
        n && (t.nonce = n);
        const i = e === document ? document.head : e;
        n =
          e === document
            ? i.querySelector(
                "script,link[rel=stylesheet],link[as=style],style"
              )
            : i.firstChild;
        i.insertBefore(t, n);
      }
      Ae.set(e, t);
      var r = t;
      for (const s of Se) Ce(r, s);
    }
  }
  function Ce(e, t) {
    const n = e["sheet"],
      r = n.cssRules.length;
    t.split("}").forEach((e, t) => {
      (e = e.trim()) && n.insertRule(e + "}", r + t);
    });
  }
  let Re;
  "undefined" != typeof document && we(document);
  function xe(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }
  function Te(e, t) {
    if (e.closest) return e.closest(t);
    if (!document.documentElement.contains(e)) return null;
    do {
      if (_e(e, t)) return e;
    } while (
      null !== (e = e.parentElement || e.parentNode) &&
      1 === e.nodeType
    );
    return null;
  }
  function _e(e, t) {
    let n = e.matches || e.matchesSelector || e.msMatchesSelector;
    return n.call(e, t);
  }
  function ke(e, t) {
    let n = e instanceof HTMLElement ? [e] : e,
      r = [];
    for (let e = 0; e < n.length; e += 1) {
      var i = n[e].querySelectorAll(t);
      for (let e = 0; e < i.length; e += 1) r.push(i[e]);
    }
    return r;
  }
  De(
    ':root{--fc-small-font-size:.85em;--fc-page-bg-color:#fff;--fc-neutral-bg-color:hsla(0,0%,82%,.3);--fc-neutral-text-color:grey;--fc-border-color:#ddd;--fc-button-text-color:#fff;--fc-button-bg-color:#2c3e50;--fc-button-border-color:#2c3e50;--fc-button-hover-bg-color:#1e2b37;--fc-button-hover-border-color:#1a252f;--fc-button-active-bg-color:#1a252f;--fc-button-active-border-color:#151e27;--fc-event-bg-color:#3788d8;--fc-event-border-color:#3788d8;--fc-event-text-color:#fff;--fc-event-selected-overlay-color:rgba(0,0,0,.25);--fc-more-link-bg-color:#d0d0d0;--fc-more-link-text-color:inherit;--fc-event-resizer-thickness:8px;--fc-event-resizer-dot-total-width:8px;--fc-event-resizer-dot-border-width:1px;--fc-non-business-color:hsla(0,0%,84%,.3);--fc-bg-event-color:#8fdf82;--fc-bg-event-opacity:0.3;--fc-highlight-color:rgba(188,232,241,.3);--fc-today-bg-color:rgba(255,220,40,.15);--fc-now-indicator-color:red}.fc-not-allowed,.fc-not-allowed .fc-event{cursor:not-allowed}.fc{display:flex;flex-direction:column;font-size:1em}.fc,.fc *,.fc :after,.fc :before{box-sizing:border-box}.fc table{border-collapse:collapse;border-spacing:0;font-size:1em}.fc th{text-align:center}.fc td,.fc th{padding:0;vertical-align:top}.fc a[data-navlink]{cursor:pointer}.fc a[data-navlink]:hover{text-decoration:underline}.fc-direction-ltr{direction:ltr;text-align:left}.fc-direction-rtl{direction:rtl;text-align:right}.fc-theme-standard td,.fc-theme-standard th{border:1px solid var(--fc-border-color)}.fc-liquid-hack td,.fc-liquid-hack th{position:relative}@font-face{font-family:fcicons;font-style:normal;font-weight:400;src:url("data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBfAAAAC8AAAAYGNtYXAXVtKNAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZgYydxIAAAF4AAAFNGhlYWQUJ7cIAAAGrAAAADZoaGVhB20DzAAABuQAAAAkaG10eCIABhQAAAcIAAAALGxvY2ED4AU6AAAHNAAAABhtYXhwAA8AjAAAB0wAAAAgbmFtZXsr690AAAdsAAABhnBvc3QAAwAAAAAI9AAAACAAAwPAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpBgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6Qb//f//AAAAAAAg6QD//f//AAH/4xcEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAWIAjQKeAskAEwAAJSc3NjQnJiIHAQYUFwEWMjc2NCcCnuLiDQ0MJAz/AA0NAQAMJAwNDcni4gwjDQwM/wANIwz/AA0NDCMNAAAAAQFiAI0CngLJABMAACUBNjQnASYiBwYUHwEHBhQXFjI3AZ4BAA0N/wAMJAwNDeLiDQ0MJAyNAQAMIw0BAAwMDSMM4uINIwwNDQAAAAIA4gC3Ax4CngATACcAACUnNzY0JyYiDwEGFB8BFjI3NjQnISc3NjQnJiIPAQYUHwEWMjc2NCcB87e3DQ0MIw3VDQ3VDSMMDQ0BK7e3DQ0MJAzVDQ3VDCQMDQ3zuLcMJAwNDdUNIwzWDAwNIwy4twwkDA0N1Q0jDNYMDA0jDAAAAgDiALcDHgKeABMAJwAAJTc2NC8BJiIHBhQfAQcGFBcWMjchNzY0LwEmIgcGFB8BBwYUFxYyNwJJ1Q0N1Q0jDA0Nt7cNDQwjDf7V1Q0N1QwkDA0Nt7cNDQwkDLfWDCMN1Q0NDCQMt7gMIw0MDNYMIw3VDQ0MJAy3uAwjDQwMAAADAFUAAAOrA1UAMwBoAHcAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMhMjY1NCYjISIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAAVYRGRkR/qoRGRkRA1UFBAUOCQkVDAsZDf2rDRkLDBUJCA4FBQUFBQUOCQgVDAsZDQJVDRkLDBUJCQ4FBAVVAgECBQMCBwQECAX9qwQJAwQHAwMFAQICAgIBBQMDBwQDCQQCVQUIBAQHAgMFAgEC/oAZEhEZGRESGQAAAAADAFUAAAOrA1UAMwBoAIkAABMiBgcOAQcOAQcOARURFBYXHgEXHgEXHgEzITI2Nz4BNz4BNz4BNRE0JicuAScuAScuASMFITIWFx4BFx4BFx4BFREUBgcOAQcOAQcOASMhIiYnLgEnLgEnLgE1ETQ2Nz4BNz4BNz4BMxMzFRQWMzI2PQEzMjY1NCYrATU0JiMiBh0BIyIGFRQWM9UNGAwLFQkJDgUFBQUFBQ4JCRULDBgNAlYNGAwLFQkJDgUFBQUFBQ4JCRULDBgN/aoCVgQIBAQHAwMFAQIBAQIBBQMDBwQECAT9qgQIBAQHAwMFAQIBAQIBBQMDBwQECASAgBkSEhmAERkZEYAZEhIZgBEZGREDVQUEBQ4JCRUMCxkN/asNGQsMFQkIDgUFBQUFBQ4JCBUMCxkNAlUNGQsMFQkJDgUEBVUCAQIFAwIHBAQIBf2rBAkDBAcDAwUBAgICAgEFAwMHBAMJBAJVBQgEBAcCAwUCAQL+gIASGRkSgBkSERmAEhkZEoAZERIZAAABAOIAjQMeAskAIAAAExcHBhQXFjI/ARcWMjc2NC8BNzY0JyYiDwEnJiIHBhQX4uLiDQ0MJAzi4gwkDA0N4uINDQwkDOLiDCQMDQ0CjeLiDSMMDQ3h4Q0NDCMN4uIMIw0MDOLiDAwNIwwAAAABAAAAAQAAa5n0y18PPPUACwQAAAAAANivOVsAAAAA2K85WwAAAAADqwNVAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAOrAAEAAAAAAAAAAAAAAAAAAAALBAAAAAAAAAAAAAAAAgAAAAQAAWIEAAFiBAAA4gQAAOIEAABVBAAAVQQAAOIAAAAAAAoAFAAeAEQAagCqAOoBngJkApoAAQAAAAsAigADAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAA4ArgABAAAAAAABAAcAAAABAAAAAAACAAcAYAABAAAAAAADAAcANgABAAAAAAAEAAcAdQABAAAAAAAFAAsAFQABAAAAAAAGAAcASwABAAAAAAAKABoAigADAAEECQABAA4ABwADAAEECQACAA4AZwADAAEECQADAA4APQADAAEECQAEAA4AfAADAAEECQAFABYAIAADAAEECQAGAA4AUgADAAEECQAKADQApGZjaWNvbnMAZgBjAGkAYwBvAG4Ac1ZlcnNpb24gMS4wAFYAZQByAHMAaQBvAG4AIAAxAC4AMGZjaWNvbnMAZgBjAGkAYwBvAG4Ac2ZjaWNvbnMAZgBjAGkAYwBvAG4Ac1JlZ3VsYXIAUgBlAGcAdQBsAGEAcmZjaWNvbnMAZgBjAGkAYwBvAG4Ac0ZvbnQgZ2VuZXJhdGVkIGJ5IEljb01vb24uAEYAbwBuAHQAIABnAGUAbgBlAHIAYQB0AGUAZAAgAGIAeQAgAEkAYwBvAE0AbwBvAG4ALgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=") format("truetype")}.fc-icon{speak:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;font-family:fcicons!important;font-style:normal;font-variant:normal;font-weight:400;height:1em;line-height:1;text-align:center;text-transform:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:1em}.fc-icon-chevron-left:before{content:"\\e900"}.fc-icon-chevron-right:before{content:"\\e901"}.fc-icon-chevrons-left:before{content:"\\e902"}.fc-icon-chevrons-right:before{content:"\\e903"}.fc-icon-minus-square:before{content:"\\e904"}.fc-icon-plus-square:before{content:"\\e905"}.fc-icon-x:before{content:"\\e906"}.fc .fc-button{border-radius:0;font-family:inherit;font-size:inherit;line-height:inherit;margin:0;overflow:visible;text-transform:none}.fc .fc-button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}.fc .fc-button{-webkit-appearance:button}.fc .fc-button:not(:disabled){cursor:pointer}.fc .fc-button{background-color:transparent;border:1px solid transparent;border-radius:.25em;display:inline-block;font-size:1em;font-weight:400;line-height:1.5;padding:.4em .65em;text-align:center;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle}.fc .fc-button:hover{text-decoration:none}.fc .fc-button:focus{box-shadow:0 0 0 .2rem rgba(44,62,80,.25);outline:0}.fc .fc-button:disabled{opacity:.65}.fc .fc-button-primary{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:hover{background-color:var(--fc-button-hover-bg-color);border-color:var(--fc-button-hover-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:disabled{background-color:var(--fc-button-bg-color);border-color:var(--fc-button-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button-primary:not(:disabled).fc-button-active,.fc .fc-button-primary:not(:disabled):active{background-color:var(--fc-button-active-bg-color);border-color:var(--fc-button-active-border-color);color:var(--fc-button-text-color)}.fc .fc-button-primary:not(:disabled).fc-button-active:focus,.fc .fc-button-primary:not(:disabled):active:focus{box-shadow:0 0 0 .2rem rgba(76,91,106,.5)}.fc .fc-button .fc-icon{font-size:1.5em;vertical-align:middle}.fc .fc-button-group{display:inline-flex;position:relative;vertical-align:middle}.fc .fc-button-group>.fc-button{flex:1 1 auto;position:relative}.fc .fc-button-group>.fc-button.fc-button-active,.fc .fc-button-group>.fc-button:active,.fc .fc-button-group>.fc-button:focus,.fc .fc-button-group>.fc-button:hover{z-index:1}.fc-direction-ltr .fc-button-group>.fc-button:not(:first-child){border-bottom-left-radius:0;border-top-left-radius:0;margin-left:-1px}.fc-direction-ltr .fc-button-group>.fc-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.fc-direction-rtl .fc-button-group>.fc-button:not(:first-child){border-bottom-right-radius:0;border-top-right-radius:0;margin-right:-1px}.fc-direction-rtl .fc-button-group>.fc-button:not(:last-child){border-bottom-left-radius:0;border-top-left-radius:0}.fc .fc-toolbar{align-items:center;display:flex;justify-content:space-between}.fc .fc-toolbar.fc-header-toolbar{margin-bottom:1.5em}.fc .fc-toolbar.fc-footer-toolbar{margin-top:1.5em}.fc .fc-toolbar-title{font-size:1.75em;margin:0}.fc-direction-ltr .fc-toolbar>*>:not(:first-child){margin-left:.75em}.fc-direction-rtl .fc-toolbar>*>:not(:first-child){margin-right:.75em}.fc-direction-rtl .fc-toolbar-ltr{flex-direction:row-reverse}.fc .fc-scroller{-webkit-overflow-scrolling:touch;position:relative}.fc .fc-scroller-liquid{height:100%}.fc .fc-scroller-liquid-absolute{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-scroller-harness{direction:ltr;overflow:hidden;position:relative}.fc .fc-scroller-harness-liquid{height:100%}.fc-direction-rtl .fc-scroller-harness>.fc-scroller{direction:rtl}.fc-theme-standard .fc-scrollgrid{border:1px solid var(--fc-border-color)}.fc .fc-scrollgrid,.fc .fc-scrollgrid table{table-layout:fixed;width:100%}.fc .fc-scrollgrid table{border-left-style:hidden;border-right-style:hidden;border-top-style:hidden}.fc .fc-scrollgrid{border-bottom-width:0;border-collapse:separate;border-right-width:0}.fc .fc-scrollgrid-liquid{height:100%}.fc .fc-scrollgrid-section,.fc .fc-scrollgrid-section table,.fc .fc-scrollgrid-section>td{height:1px}.fc .fc-scrollgrid-section-liquid>td{height:100%}.fc .fc-scrollgrid-section>*{border-left-width:0;border-top-width:0}.fc .fc-scrollgrid-section-footer>*,.fc .fc-scrollgrid-section-header>*{border-bottom-width:0}.fc .fc-scrollgrid-section-body table,.fc .fc-scrollgrid-section-footer table{border-bottom-style:hidden}.fc .fc-scrollgrid-section-sticky>*{background:var(--fc-page-bg-color);position:sticky;z-index:3}.fc .fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>*{top:0}.fc .fc-scrollgrid-section-footer.fc-scrollgrid-section-sticky>*{bottom:0}.fc .fc-scrollgrid-sticky-shim{height:1px;margin-bottom:-1px}.fc-sticky{position:sticky}.fc .fc-view-harness{flex-grow:1;position:relative}.fc .fc-view-harness-active>.fc-view{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-col-header-cell-cushion{display:inline-block;padding:2px 4px}.fc .fc-bg-event,.fc .fc-highlight,.fc .fc-non-business{bottom:0;left:0;position:absolute;right:0;top:0}.fc .fc-non-business{background:var(--fc-non-business-color)}.fc .fc-bg-event{background:var(--fc-bg-event-color);opacity:var(--fc-bg-event-opacity)}.fc .fc-bg-event .fc-event-title{font-size:var(--fc-small-font-size);font-style:italic;margin:.5em}.fc .fc-highlight{background:var(--fc-highlight-color)}.fc .fc-cell-shaded,.fc .fc-day-disabled{background:var(--fc-neutral-bg-color)}a.fc-event,a.fc-event:hover{text-decoration:none}.fc-event.fc-event-draggable,.fc-event[href]{cursor:pointer}.fc-event .fc-event-main{position:relative;z-index:2}.fc-event-dragging:not(.fc-event-selected){opacity:.75}.fc-event-dragging.fc-event-selected{box-shadow:0 2px 7px rgba(0,0,0,.3)}.fc-event .fc-event-resizer{display:none;position:absolute;z-index:4}.fc-event-selected .fc-event-resizer,.fc-event:hover .fc-event-resizer{display:block}.fc-event-selected .fc-event-resizer{background:var(--fc-page-bg-color);border-color:inherit;border-radius:calc(var(--fc-event-resizer-dot-total-width)/2);border-style:solid;border-width:var(--fc-event-resizer-dot-border-width);height:var(--fc-event-resizer-dot-total-width);width:var(--fc-event-resizer-dot-total-width)}.fc-event-selected .fc-event-resizer:before{bottom:-20px;content:"";left:-20px;position:absolute;right:-20px;top:-20px}.fc-event-selected,.fc-event:focus{box-shadow:0 2px 5px rgba(0,0,0,.2)}.fc-event-selected:before,.fc-event:focus:before{bottom:0;content:"";left:0;position:absolute;right:0;top:0;z-index:3}.fc-event-selected:after,.fc-event:focus:after{background:var(--fc-event-selected-overlay-color);bottom:-1px;content:"";left:-1px;position:absolute;right:-1px;top:-1px;z-index:1}.fc-h-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-h-event .fc-event-main{color:var(--fc-event-text-color)}.fc-h-event .fc-event-main-frame{display:flex}.fc-h-event .fc-event-time{max-width:100%;overflow:hidden}.fc-h-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-width:0}.fc-h-event .fc-event-title{display:inline-block;left:0;max-width:100%;overflow:hidden;right:0;vertical-align:top}.fc-h-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-start),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-end){border-bottom-left-radius:0;border-left-width:0;border-top-left-radius:0}.fc-direction-ltr .fc-daygrid-block-event:not(.fc-event-end),.fc-direction-rtl .fc-daygrid-block-event:not(.fc-event-start){border-bottom-right-radius:0;border-right-width:0;border-top-right-radius:0}.fc-h-event:not(.fc-event-selected) .fc-event-resizer{bottom:0;top:0;width:var(--fc-event-resizer-thickness)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end{cursor:w-resize;left:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-direction-ltr .fc-h-event:not(.fc-event-selected) .fc-event-resizer-end,.fc-direction-rtl .fc-h-event:not(.fc-event-selected) .fc-event-resizer-start{cursor:e-resize;right:calc(var(--fc-event-resizer-thickness)*-.5)}.fc-h-event.fc-event-selected .fc-event-resizer{margin-top:calc(var(--fc-event-resizer-dot-total-width)*-.5);top:50%}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-start,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-end{left:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc-direction-ltr .fc-h-event.fc-event-selected .fc-event-resizer-end,.fc-direction-rtl .fc-h-event.fc-event-selected .fc-event-resizer-start{right:calc(var(--fc-event-resizer-dot-total-width)*-.5)}.fc .fc-popover{box-shadow:0 2px 6px rgba(0,0,0,.15);position:absolute;z-index:9999}.fc .fc-popover-header{align-items:center;display:flex;flex-direction:row;justify-content:space-between;padding:3px 4px}.fc .fc-popover-title{margin:0 2px}.fc .fc-popover-close{cursor:pointer;font-size:1.1em;opacity:.65}.fc-theme-standard .fc-popover{background:var(--fc-page-bg-color);border:1px solid var(--fc-border-color)}.fc-theme-standard .fc-popover-header{background:var(--fc-neutral-bg-color)}'
  );
  const Me = /(top|left|right|bottom|width|height)$/i;
  function Ie(e, t) {
    for (var n in t) Oe(e, n, t[n]);
  }
  function Oe(e, t, n) {
    null == n
      ? (e.style[t] = "")
      : "number" == typeof n && Me.test(t)
      ? (e.style[t] = n + "px")
      : (e.style[t] = n);
  }
  function Ne(e) {
    var t;
    return null !==
      (t =
        null === (t = e.composedPath) || void 0 === t
          ? void 0
          : t.call(e)[0]) && void 0 !== t
      ? t
      : e.target;
  }
  let Pe = 0;
  function He() {
    return "fc-dom-" + (Pe += 1);
  }
  function Be(e) {
    e.preventDefault();
  }
  function je(e, t, n, r) {
    (s = n), (o = r);
    let i = (e) => {
      var t = Te(e.target, s);
      t && o.call(t, e, t);
    };
    var s, o;
    return (
      e.addEventListener(t, i),
      () => {
        e.removeEventListener(t, i);
      }
    );
  }
  const ze = [
    "webkitTransitionEnd",
    "otransitionend",
    "oTransitionEnd",
    "msTransitionEnd",
    "transitionend",
  ];
  function Ue(t, n) {
    let r = (e) => {
      n(e),
        ze.forEach((e) => {
          t.removeEventListener(e, r);
        });
    };
    ze.forEach((e) => {
      t.addEventListener(e, r);
    });
  }
  function We(e) {
    return Object.assign({ onClick: e }, Le(e));
  }
  function Le(t) {
    return {
      tabIndex: 0,
      onKeyDown(e) {
        ("Enter" !== e.key && " " !== e.key) || (t(e), e.preventDefault());
      },
    };
  }
  let Fe = 0;
  function Ve() {
    return (Fe += 1), String(Fe);
  }
  function Ge() {
    document.body.classList.add("fc-not-allowed");
  }
  function Qe() {
    document.body.classList.remove("fc-not-allowed");
  }
  function qe(e) {
    (e.style.userSelect = "none"), e.addEventListener("selectstart", Be);
  }
  function Ye(e) {
    (e.style.userSelect = ""), e.removeEventListener("selectstart", Be);
  }
  function Ze(e) {
    e.addEventListener("contextmenu", Be);
  }
  function Xe(e) {
    e.removeEventListener("contextmenu", Be);
  }
  function Je(e) {
    let t = [],
      n = [],
      r,
      i;
    for (
      "string" == typeof e
        ? (n = e.split(/\s*,\s*/))
        : "function" == typeof e
        ? (n = [e])
        : Array.isArray(e) && (n = e),
        r = 0;
      r < n.length;
      r += 1
    )
      "string" == typeof (i = n[r])
        ? t.push(
            "-" === i.charAt(0)
              ? { field: i.substring(1), order: -1 }
              : { field: i, order: 1 }
          )
        : "function" == typeof i && t.push({ func: i });
    return t;
  }
  function $e(e, t, n) {
    let r;
    var i;
    for (r = 0; r < n.length; r += 1)
      if (
        (i = (function (e, t, n) {
          if (n.func) return n.func(e, t);
          return Ke(e[n.field], t[n.field]) * (n.order || 1);
        })(e, t, n[r]))
      )
        return i;
    return 0;
  }
  function Ke(e, t) {
    return e || t
      ? null == t
        ? -1
        : null == e
        ? 1
        : "string" == typeof e || "string" == typeof t
        ? String(e).localeCompare(String(t))
        : e - t
      : 0;
  }
  function et(e, t) {
    e = String(e);
    return "000".substr(0, t - e.length) + e;
  }
  function tt(e, t, n) {
    return "function" == typeof e
      ? e(...t)
      : "string" == typeof e
      ? t.reduce((e, t, n) => e.replace("$" + n, t || ""), e)
      : n;
  }
  function nt(e, t) {
    return e - t;
  }
  function rt(e) {
    return e % 1 == 0;
  }
  const it = ["years", "months", "days", "milliseconds"],
    st = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
  function p(e, t) {
    var n, r;
    return "string" == typeof e
      ? ((n = e),
        (n = st.exec(n))
          ? {
              years: 0,
              months: 0,
              days: (r = n[1] ? -1 : 1) * (n[2] ? parseInt(n[2], 10) : 0),
              milliseconds:
                r *
                (60 * (n[3] ? parseInt(n[3], 10) : 0) * 60 * 1e3 +
                  60 * (n[4] ? parseInt(n[4], 10) : 0) * 1e3 +
                  1e3 * (n[5] ? parseInt(n[5], 10) : 0) +
                  (n[6] ? parseInt(n[6], 10) : 0)),
            }
          : null)
      : "object" == typeof e && e
      ? ot(e)
      : "number" == typeof e
      ? ot({ [t || "milliseconds"]: e })
      : null;
  }
  function ot(e) {
    let t = {
      years: e.years || e.year || 0,
      months: e.months || e.month || 0,
      days: e.days || e.day || 0,
      milliseconds:
        60 * (e.hours || e.hour || 0) * 60 * 1e3 +
        60 * (e.minutes || e.minute || 0) * 1e3 +
        1e3 * (e.seconds || e.second || 0) +
        (e.milliseconds || e.millisecond || e.ms || 0),
    };
    e = e.weeks || e.week;
    return e && ((t.days += 7 * e), (t.specifiedWeeks = !0)), t;
  }
  function at(e, t) {
    return {
      years: e.years + t.years,
      months: e.months + t.months,
      days: e.days + t.days,
      milliseconds: e.milliseconds + t.milliseconds,
    };
  }
  function lt(e, t) {
    return {
      years: e.years * t,
      months: e.months * t,
      days: e.days * t,
      milliseconds: e.milliseconds * t,
    };
  }
  function ct(e) {
    return dt(e) / 864e5;
  }
  function dt(e) {
    return (
      31536e6 * e.years + 2592e6 * e.months + 864e5 * e.days + e.milliseconds
    );
  }
  function ut(t, n) {
    let r = null;
    for (let e = 0; e < it.length; e += 1) {
      var i = it[e];
      if (n[i]) {
        var s = t[i] / n[i];
        if (!rt(s) || (null !== r && r !== s)) return null;
        r = s;
      } else if (t[i]) return null;
    }
    return r;
  }
  function ht(e) {
    var t = e.milliseconds;
    if (t) {
      if (t % 1e3 != 0) return { unit: "millisecond", value: t };
      if (t % 6e4 != 0) return { unit: "second", value: t / 1e3 };
      if (t % 36e5 != 0) return { unit: "minute", value: t / 6e4 };
      if (t) return { unit: "hour", value: t / 36e5 };
    }
    return e.days
      ? e.specifiedWeeks && e.days % 7 == 0
        ? { unit: "week", value: e.days / 7 }
        : { unit: "day", value: e.days }
      : e.months
      ? { unit: "month", value: e.months }
      : e.years
      ? { unit: "year", value: e.years }
      : { unit: "millisecond", value: 0 };
  }
  const ft = Object.prototype["hasOwnProperty"];
  function gt(n, e) {
    let r = {};
    if (e)
      for (var i in e)
        if (e[i] === hn) {
          let t = [];
          for (let e = n.length - 1; 0 <= e; --e) {
            var s = n[e][i];
            if ("object" == typeof s && s) t.unshift(s);
            else if (void 0 !== s) {
              r[i] = s;
              break;
            }
          }
          t.length && (r[i] = gt(t));
        }
    for (let e = n.length - 1; 0 <= e; --e) {
      var t,
        o = n[e];
      for (t in o) t in r || (r[t] = o[t]);
    }
    return r;
  }
  function pt(e, t) {
    let n = {};
    for (var r in e) t(e[r], r) && (n[r] = e[r]);
    return n;
  }
  function vt(e, t) {
    let n = {};
    for (var r in e) n[r] = t(e[r], r);
    return n;
  }
  function mt(e) {
    let t = {};
    for (var n of e) t[n] = !0;
    return t;
  }
  function yt(e) {
    let t = [];
    for (var n in e) t.push(e[n]);
    return t;
  }
  function bt(e, t) {
    if (e === t) return !0;
    for (var n in e) if (ft.call(e, n) && !(n in t)) return !1;
    for (var r in t) if (ft.call(t, r) && e[r] !== t[r]) return !1;
    return !0;
  }
  const Et = /^on[A-Z]/;
  function St(e, t) {
    let n = [];
    for (var r in e) ft.call(e, r) && (r in t || n.push(r));
    for (var i in t) ft.call(t, i) && e[i] !== t[i] && n.push(i);
    return n;
  }
  function At(e, t, n = {}) {
    if (e === t) return !0;
    for (var r in t)
      if (
        !(
          r in e &&
          (function (e, t, n) {
            if (e === t || !0 === n) return !0;
            if (n) return n(e, t);
            return !1;
          })(e[r], t[r], n[r])
        )
      )
        return !1;
    for (var i in e) if (!(i in t)) return !1;
    return !0;
  }
  function Dt(t, n = 0, r, i = 1) {
    let s = [];
    null == r && (r = Object.keys(t).length);
    for (let e = n; e < r; e += i) {
      var o = t[e];
      void 0 !== o && s.push(o);
    }
    return s;
  }
  function wt(e, t, n) {
    if (e === t) return !0;
    var r = e.length;
    let i;
    if (r !== t.length) return !1;
    for (i = 0; i < r; i += 1)
      if (!(n ? n(e[i], t[i]) : e[i] === t[i])) return !1;
    return !0;
  }
  const Ct = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  function Rt(e, t) {
    let n = Bt(e);
    return (n[2] += 7 * t), jt(n);
  }
  function xt(e, t) {
    let n = Bt(e);
    return (n[2] += t), jt(n);
  }
  function Tt(e, t) {
    let n = Bt(e);
    return (n[6] += t), jt(n);
  }
  function _t(e, t) {
    return kt(e, t) / 7;
  }
  function kt(e, t) {
    return (t.valueOf() - e.valueOf()) / 864e5;
  }
  function Mt(e, t) {
    let n = v(e),
      r = v(t);
    return {
      years: 0,
      months: 0,
      days: Math.round(kt(n, r)),
      milliseconds: t.valueOf() - r.valueOf() - (e.valueOf() - n.valueOf()),
    };
  }
  function It(e, t) {
    e = Ot(e, t);
    return null !== e && e % 7 == 0 ? e / 7 : null;
  }
  function Ot(e, t) {
    return Ut(e) === Ut(t) ? Math.round(kt(e, t)) : null;
  }
  function v(e) {
    return jt([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]);
  }
  function Nt(e, t, n, r) {
    (t = jt([
      t,
      0,
      1 +
        (function (e, t, n) {
          (n = 7 + t - n), (e = (7 + jt([e, 0, n]).getUTCDay() - t) % 7);
          return n - e - 1;
        })(t, n, r),
    ])),
      (n = v(e)),
      (r = Math.round(kt(t, n)));
    return Math.floor(r / 7) + 1;
  }
  function Pt(e) {
    return [
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds(),
    ];
  }
  function Ht(e) {
    return new Date(
      e[0],
      e[1] || 0,
      null == e[2] ? 1 : e[2],
      e[3] || 0,
      e[4] || 0,
      e[5] || 0
    );
  }
  function Bt(e) {
    return [
      e.getUTCFullYear(),
      e.getUTCMonth(),
      e.getUTCDate(),
      e.getUTCHours(),
      e.getUTCMinutes(),
      e.getUTCSeconds(),
      e.getUTCMilliseconds(),
    ];
  }
  function jt(e) {
    return 1 === e.length && (e = e.concat([0])), new Date(Date.UTC(...e));
  }
  function zt(e) {
    return !isNaN(e.valueOf());
  }
  function Ut(e) {
    return (
      1e3 * e.getUTCHours() * 60 * 60 +
      1e3 * e.getUTCMinutes() * 60 +
      1e3 * e.getUTCSeconds() +
      e.getUTCMilliseconds()
    );
  }
  function Wt(e, t, n = !1) {
    let r = e.toISOString();
    return (
      (r = r.replace(".000", "")),
      10 < (r = n ? r.replace("T00:00:00Z", "") : r).length &&
        (null == t
          ? (r = r.replace("Z", ""))
          : 0 !== t && (r = r.replace("Z", Gt(t, !0)))),
      r
    );
  }
  function Lt(e) {
    return e.toISOString().replace(/T.*$/, "");
  }
  function Ft(e) {
    return e.toISOString().match(/^\d{4}-\d{2}/)[0];
  }
  function Vt(e) {
    return (
      et(e.getUTCHours(), 2) +
      ":" +
      et(e.getUTCMinutes(), 2) +
      ":" +
      et(e.getUTCSeconds(), 2)
    );
  }
  function Gt(e, t = !1) {
    var n = e < 0 ? "-" : "+",
      e = Math.abs(e),
      r = Math.floor(e / 60),
      e = Math.round(e % 60);
    return t
      ? n + et(r, 2) + ":" + et(e, 2)
      : "GMT" + n + r + (e ? ":" + et(e, 2) : "");
  }
  function g(n, r, i) {
    let s, o;
    return function (...e) {
      var t;
      return (
        s
          ? wt(s, e) ||
            (i && i(o), (t = n.apply(this, e)), (r && r(t, o)) || (o = t))
          : (o = n.apply(this, e)),
        (s = e),
        o
      );
    };
  }
  function Qt(n, r, i) {
    let s, o;
    return (e) => {
      var t;
      return (
        s
          ? bt(s, e) ||
            (i && i(o), (t = n.call(this, e)), (r && r(t, o)) || (o = t))
          : (o = n.call(this, e)),
        (s = e),
        o
      );
    };
  }
  const qt = {
      week: 3,
      separator: 0,
      omitZeroMinute: 0,
      meridiem: 0,
      omitCommas: 0,
    },
    Yt = {
      timeZoneName: 7,
      era: 6,
      year: 5,
      month: 4,
      day: 2,
      weekday: 2,
      hour: 1,
      minute: 1,
      second: 1,
    },
    Zt = /\s*([ap])\.?m\.?/i,
    Xt = /,/g,
    Jt = /\s+/g,
    $t = /\u200e/g,
    Kt = /UTC|GMT/;
  class en {
    constructor(e) {
      let t = {},
        n = {},
        r = 0;
      for (var i in e)
        i in qt
          ? ((n[i] = e[i]), (r = Math.max(qt[i], r)))
          : ((t[i] = e[i]), i in Yt && (r = Math.max(Yt[i], r)));
      (this.standardDateProps = t),
        (this.extendedSettings = n),
        (this.severity = r),
        (this.buildFormattingFunc = g(tn));
    }
    format(e, t) {
      return this.buildFormattingFunc(
        this.standardDateProps,
        this.extendedSettings,
        t
      )(e);
    }
    formatRange(e, t, n, d) {
      var { standardDateProps: r, extendedSettings: i } = this,
        s =
          ((a = e.marker),
          (l = t.marker),
          (s = n.calendarSystem).getMarkerYear(a) === s.getMarkerYear(l)
            ? s.getMarkerMonth(a) === s.getMarkerMonth(l)
              ? s.getMarkerDay(a) === s.getMarkerDay(l)
                ? Ut(a) === Ut(l)
                  ? 0
                  : 1
                : 2
              : 4
            : 5);
      if (!s) return this.format(e, n);
      let o = s;
      !(1 < o) ||
        ("numeric" !== r.year && "2-digit" !== r.year) ||
        ("numeric" !== r.month && "2-digit" !== r.month) ||
        ("numeric" !== r.day && "2-digit" !== r.day) ||
        (o = 1);
      var a = this.format(e, n),
        l = this.format(t, n);
      if (a === l) return a;
      let c = tn(
        (function (e, t) {
          let n = {};
          for (var r in e) (r in Yt && !(Yt[r] <= t)) || (n[r] = e[r]);
          return n;
        })(r, o),
        i,
        n
      );
      (s = c(e)),
        (r = c(t)),
        (e = (function (t, n, r, i) {
          let s = 0;
          for (; s < t.length; ) {
            var o = t.indexOf(n, s);
            if (-1 === o) break;
            var a = t.substr(0, o),
              l = ((s = o + n.length), t.substr(s));
            let e = 0;
            for (; e < r.length; ) {
              var c = r.indexOf(i, e);
              if (-1 === c) break;
              var d = r.substr(0, c),
                c = ((e = c + i.length), r.substr(e));
              if (a === d && l === c) return { before: a, after: l };
            }
          }
          return null;
        })(a, s, l, r)),
        (t = i.separator || d || n.defaultSeparator || "");
      return e ? e.before + s + t + r + e.after : a + t + l;
    }
    getLargestUnit() {
      switch (this.severity) {
        case 7:
        case 6:
        case 5:
          return "year";
        case 4:
          return "month";
        case 3:
          return "week";
        case 2:
          return "day";
        default:
          return "time";
      }
    }
  }
  function tn(e, o, c) {
    var t = Object.keys(e).length;
    {
      if (1 === t && "short" === e.timeZoneName)
        return (e) => Gt(e.timeZoneOffset);
      if (0 === t && o.week)
        return (t) => {
          {
            t = c.computeWeekNumber(t.marker);
            var n = c.weekText,
              r = c.weekTextLong,
              i = c.locale,
              s = o.week;
            let e = [];
            return (
              "long" === s
                ? e.push(r)
                : ("short" !== s && "narrow" !== s) || e.push(n),
              ("long" !== s && "short" !== s) || e.push(" "),
              e.push(i.simpleNumberFormat.format(t)),
              "rtl" === i.options.direction && e.reverse(),
              e.join("")
            );
          }
        };
      {
        var d = e,
          u = o,
          h = c,
          n = ((d = Object.assign({}, d)), (u = Object.assign({}, u)), d),
          r = u;
        n.timeZoneName &&
          (n.hour || (n.hour = "2-digit"), n.minute || (n.minute = "2-digit")),
          "long" === n.timeZoneName && (n.timeZoneName = "short"),
          r.omitZeroMinute &&
            (n.second || n.millisecond) &&
            delete r.omitZeroMinute,
          (d.timeZone = "UTC");
        let a = new Intl.DateTimeFormat(h.locale.codes, d),
          l;
        if (u.omitZeroMinute) {
          let e = Object.assign({}, d);
          delete e.minute, (l = new Intl.DateTimeFormat(h.locale.codes, e));
        }
        return (e) => {
          let t = e["marker"],
            n;
          var r = (n = l && !t.getUTCMinutes() ? l : a).format(t),
            i = d,
            s = u,
            o = h;
          return (
            (r = r.replace($t, "")),
            "short" === i.timeZoneName &&
              (r = (function (e, t) {
                let n = !1;
                (e = e.replace(Kt, () => ((n = !0), t))), n || (e += " " + t);
                return e;
              })(
                r,
                "UTC" === o.timeZone || null == e.timeZoneOffset
                  ? "UTC"
                  : Gt(e.timeZoneOffset)
              )),
            s.omitCommas && (r = r.replace(Xt, "").trim()),
            s.omitZeroMinute && (r = r.replace(":00", "")),
            !1 === s.meridiem
              ? (r = r.replace(Zt, "").trim())
              : "narrow" === s.meridiem
              ? (r = r.replace(Zt, (e, t) => t.toLocaleLowerCase()))
              : "short" === s.meridiem
              ? (r = r.replace(Zt, (e, t) => t.toLocaleLowerCase() + "m"))
              : "lowercase" === s.meridiem &&
                (r = r.replace(Zt, (e) => e.toLocaleLowerCase())),
            (r = (r = r.replace(Jt, " ")).trim())
          );
        };
      }
    }
  }
  function nn(e, t) {
    t = t.markerToArray(e.marker);
    return {
      marker: e.marker,
      timeZoneOffset: e.timeZoneOffset,
      array: t,
      year: t[0],
      month: t[1],
      day: t[2],
      hour: t[3],
      minute: t[4],
      second: t[5],
      millisecond: t[6],
    };
  }
  function rn(e, t, n, r) {
    e = nn(e, n.calendarSystem);
    return {
      date: e,
      start: e,
      end: t ? nn(t, n.calendarSystem) : null,
      timeZone: n.timeZone,
      localeCodes: n.locale.codes,
      defaultSeparator: r || n.defaultSeparator,
    };
  }
  class sn {
    constructor(e) {
      this.cmdStr = e;
    }
    format(e, t, n) {
      return t.cmdFormatter(this.cmdStr, rn(e, null, t, n));
    }
    formatRange(e, t, n, r) {
      return n.cmdFormatter(this.cmdStr, rn(e, t, n, r));
    }
  }
  class on {
    constructor(e) {
      this.func = e;
    }
    format(e, t, n) {
      return this.func(rn(e, null, t, n));
    }
    formatRange(e, t, n, r) {
      return this.func(rn(e, t, n, r));
    }
  }
  function o(e) {
    return "object" == typeof e && e
      ? new en(e)
      : "string" == typeof e
      ? new sn(e)
      : "function" == typeof e
      ? new on(e)
      : null;
  }
  const an = {
      navLinkDayClick: e,
      navLinkWeekClick: e,
      duration: p,
      bootstrapFontAwesome: e,
      buttonIcons: e,
      customButtons: e,
      defaultAllDayEventDuration: p,
      defaultTimedEventDuration: p,
      nextDayThreshold: p,
      scrollTime: p,
      scrollTimeReset: Boolean,
      slotMinTime: p,
      slotMaxTime: p,
      dayPopoverFormat: o,
      slotDuration: p,
      snapDuration: p,
      headerToolbar: e,
      footerToolbar: e,
      defaultRangeSeparator: String,
      titleRangeSeparator: String,
      forceEventDuration: Boolean,
      dayHeaders: Boolean,
      dayHeaderFormat: o,
      dayHeaderClassNames: e,
      dayHeaderContent: e,
      dayHeaderDidMount: e,
      dayHeaderWillUnmount: e,
      dayCellClassNames: e,
      dayCellContent: e,
      dayCellDidMount: e,
      dayCellWillUnmount: e,
      initialView: String,
      aspectRatio: Number,
      weekends: Boolean,
      weekNumberCalculation: e,
      weekNumbers: Boolean,
      weekNumberClassNames: e,
      weekNumberContent: e,
      weekNumberDidMount: e,
      weekNumberWillUnmount: e,
      editable: Boolean,
      viewClassNames: e,
      viewDidMount: e,
      viewWillUnmount: e,
      nowIndicator: Boolean,
      nowIndicatorClassNames: e,
      nowIndicatorContent: e,
      nowIndicatorDidMount: e,
      nowIndicatorWillUnmount: e,
      showNonCurrentDates: Boolean,
      lazyFetching: Boolean,
      startParam: String,
      endParam: String,
      timeZoneParam: String,
      timeZone: String,
      locales: e,
      locale: e,
      themeSystem: String,
      dragRevertDuration: Number,
      dragScroll: Boolean,
      allDayMaintainDuration: Boolean,
      unselectAuto: Boolean,
      dropAccept: e,
      eventOrder: Je,
      eventOrderStrict: Boolean,
      handleWindowResize: Boolean,
      windowResizeDelay: Number,
      longPressDelay: Number,
      eventDragMinDistance: Number,
      expandRows: Boolean,
      height: e,
      contentHeight: e,
      direction: String,
      weekNumberFormat: o,
      eventResizableFromStart: Boolean,
      displayEventTime: Boolean,
      displayEventEnd: Boolean,
      weekText: String,
      weekTextLong: String,
      progressiveEventRendering: Boolean,
      businessHours: e,
      initialDate: e,
      now: e,
      eventDataTransform: e,
      stickyHeaderDates: e,
      stickyFooterScrollbar: e,
      viewHeight: e,
      defaultAllDay: Boolean,
      eventSourceFailure: e,
      eventSourceSuccess: e,
      eventDisplay: String,
      eventStartEditable: Boolean,
      eventDurationEditable: Boolean,
      eventOverlap: e,
      eventConstraint: e,
      eventAllow: e,
      eventBackgroundColor: String,
      eventBorderColor: String,
      eventTextColor: String,
      eventColor: String,
      eventClassNames: e,
      eventContent: e,
      eventDidMount: e,
      eventWillUnmount: e,
      selectConstraint: e,
      selectOverlap: e,
      selectAllow: e,
      droppable: Boolean,
      unselectCancel: String,
      slotLabelFormat: e,
      slotLaneClassNames: e,
      slotLaneContent: e,
      slotLaneDidMount: e,
      slotLaneWillUnmount: e,
      slotLabelClassNames: e,
      slotLabelContent: e,
      slotLabelDidMount: e,
      slotLabelWillUnmount: e,
      dayMaxEvents: e,
      dayMaxEventRows: e,
      dayMinWidth: Number,
      slotLabelInterval: p,
      allDayText: String,
      allDayClassNames: e,
      allDayContent: e,
      allDayDidMount: e,
      allDayWillUnmount: e,
      slotMinWidth: Number,
      navLinks: Boolean,
      eventTimeFormat: o,
      rerenderDelay: Number,
      moreLinkText: e,
      moreLinkHint: e,
      selectMinDistance: Number,
      selectable: Boolean,
      selectLongPressDelay: Number,
      eventLongPressDelay: Number,
      selectMirror: Boolean,
      eventMaxStack: Number,
      eventMinHeight: Number,
      eventMinWidth: Number,
      eventShortHeight: Number,
      slotEventOverlap: Boolean,
      plugins: e,
      firstDay: Number,
      dayCount: Number,
      dateAlignment: String,
      dateIncrement: p,
      hiddenDays: e,
      fixedWeekCount: Boolean,
      validRange: e,
      visibleRange: e,
      titleFormat: e,
      eventInteractive: Boolean,
      noEventsText: String,
      viewHint: e,
      navLinkHint: e,
      closeHint: String,
      timeHint: String,
      eventHint: String,
      moreLinkClick: e,
      moreLinkClassNames: e,
      moreLinkContent: e,
      moreLinkDidMount: e,
      moreLinkWillUnmount: e,
      monthStartFormat: o,
      handleCustomRendering: e,
      customRenderingMetaMap: e,
      customRenderingReplacesEl: Boolean,
    },
    ln = {
      eventDisplay: "auto",
      defaultRangeSeparator: " - ",
      titleRangeSeparator: " – ",
      defaultTimedEventDuration: "01:00:00",
      defaultAllDayEventDuration: { day: 1 },
      forceEventDuration: !1,
      nextDayThreshold: "00:00:00",
      dayHeaders: !0,
      initialView: "",
      aspectRatio: 1.35,
      headerToolbar: { start: "title", center: "", end: "today prev,next" },
      weekends: !0,
      weekNumbers: !1,
      weekNumberCalculation: "local",
      editable: !1,
      nowIndicator: !1,
      scrollTime: "06:00:00",
      scrollTimeReset: !0,
      slotMinTime: "00:00:00",
      slotMaxTime: "24:00:00",
      showNonCurrentDates: !0,
      lazyFetching: !0,
      startParam: "start",
      endParam: "end",
      timeZoneParam: "timeZone",
      timeZone: "local",
      locales: [],
      locale: "",
      themeSystem: "standard",
      dragRevertDuration: 500,
      dragScroll: !0,
      allDayMaintainDuration: !1,
      unselectAuto: !0,
      dropAccept: "*",
      eventOrder: "start,-duration,allDay,title",
      dayPopoverFormat: { month: "long", day: "numeric", year: "numeric" },
      handleWindowResize: !0,
      windowResizeDelay: 100,
      longPressDelay: 1e3,
      eventDragMinDistance: 5,
      expandRows: !1,
      navLinks: !1,
      selectable: !1,
      eventMinHeight: 15,
      eventMinWidth: 30,
      eventShortHeight: 30,
      monthStartFormat: { month: "long", day: "numeric" },
    },
    cn = {
      datesSet: e,
      eventsSet: e,
      eventAdd: e,
      eventChange: e,
      eventRemove: e,
      windowResize: e,
      eventClick: e,
      eventMouseEnter: e,
      eventMouseLeave: e,
      select: e,
      unselect: e,
      loading: e,
      _unmount: e,
      _beforeprint: e,
      _afterprint: e,
      _noEventDrop: e,
      _noEventResize: e,
      _resize: e,
      _scrollRequest: e,
    },
    dn = {
      buttonText: e,
      buttonHints: e,
      views: e,
      plugins: e,
      initialEvents: e,
      events: e,
      eventSources: e,
    },
    un = {
      headerToolbar: hn,
      footerToolbar: hn,
      buttonText: hn,
      buttonHints: hn,
      buttonIcons: hn,
      dateIncrement: hn,
      plugins: fn,
      events: fn,
      eventSources: fn,
      resources: fn,
    };
  function hn(e, t) {
    return "object" == typeof e && "object" == typeof t && e && t
      ? bt(e, t)
      : e === t;
  }
  function fn(e, t) {
    return Array.isArray(e) && Array.isArray(t) ? wt(e, t) : e === t;
  }
  const gn = {
    type: String,
    component: e,
    buttonText: String,
    buttonTextKey: String,
    dateProfileGeneratorClass: e,
    usesMinMaxTime: Boolean,
    classNames: e,
    content: e,
    didMount: e,
    willUnmount: e,
  };
  function pn(e) {
    return gt(e, un);
  }
  function vn(e, t) {
    let n = {},
      r = {};
    for (var i in t) i in e && (n[i] = t[i](e[i]));
    for (var s in e) s in t || (r[s] = e[s]);
    return { refined: n, extra: r };
  }
  function e(e) {
    return e;
  }
  function mn(e, t, n, r) {
    return {
      instanceId: Ve(),
      defId: e,
      range: t,
      forcedStartTzo: null == n ? null : n,
      forcedEndTzo: null == r ? null : r,
    };
  }
  function yn(e, t, d) {
    let { dateEnv: n, pluginHooks: u, options: r } = d,
      { defs: i, instances: s } = e;
    for (var o in ((s = pt(s, (e) => !i[e.defId].recurringDef)), i)) {
      var a,
        l = i[o];
      if (l.recurringDef) {
        let e = l.recurringDef["duration"];
        for (a of (function (e, t, n, r, i) {
          let s = i[e.recurringDef.typeId],
            o = s.expand(
              e.recurringDef.typeData,
              { start: r.subtract(n.start, t), end: n.end },
              r
            );
          e.allDay && (o = o.map(v));
          return o;
        })(
          l,
          (e =
            e ||
            (l.allDay
              ? r.defaultAllDayEventDuration
              : r.defaultTimedEventDuration)),
          t,
          n,
          u.recurringTypes
        )) {
          var c = mn(o, { start: a, end: n.add(a, e) });
          s[c.instanceId] = c;
        }
      }
    }
    return { defs: i, instances: s };
  }
  function bn(e, t, n, r, i, s) {
    var o,
      a = An(),
      l = Hn(n);
    for (o of e) {
      var c = Nn(o, t, n, r, l, i, s);
      c && En(c, a);
    }
    return a;
  }
  function En(e, t = An()) {
    return (
      (t.defs[e.def.defId] = e.def),
      e.instance && (t.instances[e.instance.instanceId] = e.instance),
      t
    );
  }
  function Sn(t, r) {
    r = t.instances[r];
    if (r) {
      let n = t.defs[r.defId],
        e = wn(t, (e) => {
          var t = n;
          return Boolean(t.groupId && t.groupId === e.groupId);
        });
      return (e.defs[n.defId] = n), (e.instances[r.instanceId] = r), e;
    }
    return An();
  }
  function An() {
    return { defs: {}, instances: {} };
  }
  function Dn(e, t) {
    return {
      defs: Object.assign(Object.assign({}, e.defs), t.defs),
      instances: Object.assign(Object.assign({}, e.instances), t.instances),
    };
  }
  function wn(e, t) {
    let n = pt(e.defs, t);
    t = pt(e.instances, (e) => n[e.defId]);
    return { defs: n, instances: t };
  }
  function Cn(e) {
    return Array.isArray(e) ? e : "string" == typeof e ? e.split(/\s+/) : [];
  }
  const Rn = {
      display: String,
      editable: Boolean,
      startEditable: Boolean,
      durationEditable: Boolean,
      constraint: e,
      overlap: e,
      allow: e,
      className: Cn,
      classNames: Cn,
      color: String,
      backgroundColor: String,
      borderColor: String,
      textColor: String,
    },
    xn = {
      display: null,
      startEditable: null,
      durationEditable: null,
      constraints: [],
      overlap: null,
      allows: [],
      backgroundColor: "",
      borderColor: "",
      textColor: "",
      classNames: [],
    };
  function Tn(e, t) {
    (n = e.constraint), (t = t);
    var n,
      t = Array.isArray(n)
        ? bn(n, null, t, !0)
        : "object" == typeof n && n
        ? bn([n], null, t, !0)
        : null != n
        ? String(n)
        : null;
    return {
      display: e.display || null,
      startEditable: null != e.startEditable ? e.startEditable : e.editable,
      durationEditable:
        null != e.durationEditable ? e.durationEditable : e.editable,
      constraints: null != t ? [t] : [],
      overlap: null != e.overlap ? e.overlap : null,
      allows: null != e.allow ? [e.allow] : [],
      backgroundColor: e.backgroundColor || e.color || "",
      borderColor: e.borderColor || e.color || "",
      textColor: e.textColor || "",
      classNames: (e.className || []).concat(e.classNames || []),
    };
  }
  function _n(e) {
    return e.reduce(kn, xn);
  }
  function kn(e, t) {
    return {
      display: (null != t.display ? t : e).display,
      startEditable: (null != t.startEditable ? t : e).startEditable,
      durationEditable: (null != t.durationEditable ? t : e).durationEditable,
      constraints: e.constraints.concat(t.constraints),
      overlap: ("boolean" == typeof t.overlap ? t : e).overlap,
      allows: e.allows.concat(t.allows),
      backgroundColor: t.backgroundColor || e.backgroundColor,
      borderColor: t.borderColor || e.borderColor,
      textColor: t.textColor || e.textColor,
      classNames: e.classNames.concat(t.classNames),
    };
  }
  const Mn = {
      id: String,
      groupId: String,
      title: String,
      url: String,
      interactive: Boolean,
    },
    In = { start: e, end: e, date: e, allDay: Boolean },
    On = Object.assign(Object.assign(Object.assign({}, Mn), In), {
      extendedProps: e,
    });
  function Nn(t, n, r, e, i = Hn(r), s, o) {
    var { refined: t, extra: i } = Pn(t, r, i),
      a = (function (e, t) {
        let n = null;
        e && (n = e.defaultAllDay);
        null == n && (n = t.options.defaultAllDay);
        return n;
      })(n, r),
      l = (function (n, r, e, i) {
        for (let t = 0; t < i.length; t += 1) {
          var s = i[t].parse(n, e);
          if (s) {
            let e = n["allDay"];
            return {
              allDay: (e =
                null == e && null == (e = r) && null == (e = s.allDayGuess)
                  ? !1
                  : e),
              duration: s.duration,
              typeData: s.typeData,
              typeId: t,
            };
          }
        }
        return null;
      })(t, a, r.dateEnv, r.pluginHooks.recurringTypes);
    if (l) {
      let e = Bn(
        t,
        i,
        n ? n.sourceId : "",
        l.allDay,
        Boolean(l.duration),
        r,
        s
      );
      return (
        (e.recurringDef = {
          typeId: l.typeId,
          typeData: l.typeData,
          duration: l.duration,
        }),
        { def: e, instance: null }
      );
    }
    l = (function (e, t, n, r) {
      let i = e["allDay"],
        s,
        o = null,
        a = !1,
        l,
        c = null,
        d = null != e.start ? e.start : e.date;
      if ((s = n.dateEnv.createMarkerMeta(d))) o = s.marker;
      else if (!r) return null;
      null != e.end && (l = n.dateEnv.createMarkerMeta(e.end));
      null == i &&
        (i =
          null != t
            ? t
            : (!s || s.isTimeUnspecified) && (!l || l.isTimeUnspecified));
      i && o && (o = v(o));
      l && ((c = l.marker), i && (c = v(c)), o && c <= o && (c = null));
      c
        ? (a = !0)
        : r ||
          ((a = n.options.forceEventDuration || !1),
          (c = n.dateEnv.add(
            o,
            i
              ? n.options.defaultAllDayEventDuration
              : n.options.defaultTimedEventDuration
          )));
      return {
        allDay: i,
        hasEnd: a,
        range: { start: o, end: c },
        forcedStartTzo: s ? s.forcedTzo : null,
        forcedEndTzo: l ? l.forcedTzo : null,
      };
    })(t, a, r, e);
    if (l) {
      a = Bn(t, i, n ? n.sourceId : "", l.allDay, l.hasEnd, r, s);
      let e = mn(a.defId, l.range, l.forcedStartTzo, l.forcedEndTzo);
      return (
        o && a.publicId && o[a.publicId] && (e.instanceId = o[a.publicId]),
        { def: a, instance: e }
      );
    }
    return null;
  }
  function Pn(e, t, n = Hn(t)) {
    return vn(e, n);
  }
  function Hn(e) {
    return Object.assign(
      Object.assign(Object.assign({}, Rn), On),
      e.pluginHooks.eventRefiners
    );
  }
  function Bn(e, t, n, r, i, s, o) {
    var a,
      l = {
        title: e.title || "",
        groupId: e.groupId || "",
        publicId: e.id || "",
        url: e.url || "",
        recurringDef: null,
        defId: (o && e.id ? o[e.id] : "") || Ve(),
        sourceId: n,
        allDay: r,
        hasEnd: i,
        interactive: e.interactive,
        ui: Tn(e, s),
        extendedProps: Object.assign(
          Object.assign({}, e.extendedProps || {}),
          t
        ),
      };
    for (a of s.pluginHooks.eventDefMemberAdders) Object.assign(l, a(e));
    return Object.freeze(l.ui.classNames), Object.freeze(l.extendedProps), l;
  }
  const jn = {
    startTime: "09:00",
    endTime: "17:00",
    daysOfWeek: [1, 2, 3, 4, 5],
    display: "inverse-background",
    classNames: "fc-non-business",
    groupId: "_businessHours",
  };
  function zn(e, t) {
    return bn(
      (function (e) {
        let t;
        t =
          !0 === e
            ? [{}]
            : Array.isArray(e)
            ? e.filter((e) => e.daysOfWeek)
            : "object" == typeof e && e
            ? [e]
            : [];
        return (t = t.map((e) => Object.assign(Object.assign({}, jn), e)));
      })(e),
      null,
      t
    );
  }
  function Un(e) {
    var t = Math.floor(kt(e.start, e.end)) || 1,
      e = v(e.start);
    return { start: e, end: xt(e, t) };
  }
  function Wn(e, t = p(0)) {
    let n = null,
      r = null;
    var i;
    return (
      e.end &&
        ((r = v(e.end)),
        (i = e.end.valueOf() - r.valueOf()) && i >= dt(t) && (r = xt(r, 1))),
      e.start && ((n = v(e.start)), r && r <= n && (r = xt(n, 1))),
      { start: n, end: r }
    );
  }
  function Ln(e) {
    e = Wn(e);
    return 1 < kt(e.start, e.end);
  }
  function Fn(e, t, n, r) {
    return "year" === r
      ? p(n.diffWholeYears(e, t), "year")
      : "month" === r
      ? p(n.diffWholeMonths(e, t), "month")
      : Mt(e, t);
  }
  function Vn(e, t) {
    return (
      e.left >= t.left && e.left < t.right && e.top >= t.top && e.top < t.bottom
    );
  }
  function Gn(e, t) {
    e = {
      left: Math.max(e.left, t.left),
      right: Math.min(e.right, t.right),
      top: Math.max(e.top, t.top),
      bottom: Math.min(e.bottom, t.bottom),
    };
    return e.left < e.right && e.top < e.bottom && e;
  }
  function Qn(e, t) {
    return {
      left: Math.min(Math.max(e.left, t.left), t.right),
      top: Math.min(Math.max(e.top, t.top), t.bottom),
    };
  }
  function qn(e) {
    return { left: (e.left + e.right) / 2, top: (e.top + e.bottom) / 2 };
  }
  function Yn(e, t) {
    return { left: e.left - t.left, top: e.top - t.top };
  }
  let Zn;
  function Xn() {
    return (Zn =
      null == Zn
        ? (function () {
            if ("undefined" == typeof document) return !0;
            let e = document.createElement("div"),
              t =
                ((e.style.position = "absolute"),
                (e.style.top = "0px"),
                (e.style.left = "0px"),
                (e.innerHTML = "<table><tr><td><div></div></td></tr></table>"),
                (e.querySelector("table").style.height = "100px"),
                (e.querySelector("div").style.height = "100%"),
                document.body.appendChild(e),
                e.querySelector("div")),
              n = 0 < t.offsetHeight;
            return document.body.removeChild(e), n;
          })()
        : Zn);
  }
  const Jn = An();
  class $n {
    constructor() {
      (this.getKeysForEventDefs = g(this._getKeysForEventDefs)),
        (this.splitDateSelection = g(this._splitDateSpan)),
        (this.splitEventStore = g(this._splitEventStore)),
        (this.splitIndividualUi = g(this._splitIndividualUi)),
        (this.splitEventDrag = g(this._splitInteraction)),
        (this.splitEventResize = g(this._splitInteraction)),
        (this.eventUiBuilders = {});
    }
    splitProps(t) {
      var n,
        r = this.getKeyInfo(t),
        e = this.getKeysForEventDefs(t.eventStore),
        i = this.splitDateSelection(t.dateSelection),
        s = this.splitIndividualUi(t.eventUiBases, e),
        o = this.splitEventStore(t.eventStore, e),
        d = this.splitEventDrag(t.eventDrag),
        u = this.splitEventResize(t.eventResize);
      let a = {};
      for (n in ((this.eventUiBuilders = vt(
        r,
        (e, t) => this.eventUiBuilders[t] || g(Kn)
      )),
      r)) {
        var l = r[n],
          c = o[n] || Jn;
        let e = this.eventUiBuilders[n];
        a[n] = {
          businessHours: l.businessHours || t.businessHours,
          dateSelection: i[n] || null,
          eventStore: c,
          eventUiBases: e(t.eventUiBases[""], l.ui, s[n]),
          eventSelection: c.instances[t.eventSelection] ? t.eventSelection : "",
          eventDrag: d[n] || null,
          eventResize: u[n] || null,
        };
      }
      return a;
    }
    _splitDateSpan(e) {
      let t = {};
      var n;
      if (e) for (n of this.getKeysForDateSpan(e)) t[n] = e;
      return t;
    }
    _getKeysForEventDefs(e) {
      return vt(e.defs, (e) => this.getKeysForEventDef(e));
    }
    _splitEventStore(e, t) {
      var n,
        r,
        { defs: i, instances: s } = e;
      let o = {};
      for (n in i)
        for (var a of t[n]) o[a] || (o[a] = An()), (o[a].defs[n] = i[n]);
      for (r in s) {
        var l,
          c = s[r];
        for (l of t[c.defId]) o[l] && (o[l].instances[r] = c);
      }
      return o;
    }
    _splitIndividualUi(e, t) {
      let n = {};
      for (var r in e)
        if (r) for (var i of t[r]) n[i] || (n[i] = {}), (n[i][r] = e[r]);
      return n;
    }
    _splitInteraction(r) {
      let i = {};
      if (r) {
        let t = this._splitEventStore(
          r.affectedEvents,
          this._getKeysForEventDefs(r.affectedEvents)
        );
        var e = this._getKeysForEventDefs(r.mutatedEvents);
        let n = this._splitEventStore(r.mutatedEvents, e);
        var s,
          o,
          a = (e) => {
            i[e] ||
              (i[e] = {
                affectedEvents: t[e] || Jn,
                mutatedEvents: n[e] || Jn,
                isEvent: r.isEvent,
              });
          };
        for (s in t) a(s);
        for (o in n) a(o);
      }
      return i;
    }
  }
  function Kn(e, t, n) {
    let r = [];
    e && r.push(e), t && r.push(t);
    e = { "": _n(r) };
    return n && Object.assign(e, n), e;
  }
  function er(e, t) {
    let n = [],
      r = t["start"],
      i;
    var s;
    for (e.sort(tr), i = 0; i < e.length; i += 1)
      (s = e[i]).start > r && n.push({ start: r, end: s.start }),
        s.end > r && (r = s.end);
    return r < t.end && n.push({ start: r, end: t.end }), n;
  }
  function tr(e, t) {
    return e.start.valueOf() - t.start.valueOf();
  }
  function nr(e, t) {
    let { start: n, end: r } = e,
      i = null;
    return (
      null !== t.start &&
        (n =
          null === n
            ? t.start
            : new Date(Math.max(n.valueOf(), t.start.valueOf()))),
      null != t.end &&
        (r =
          null === r
            ? t.end
            : new Date(Math.min(r.valueOf(), t.end.valueOf()))),
      (i = null === n || null === r || n < r ? { start: n, end: r } : i)
    );
  }
  function rr(e, t) {
    return (
      (null === e.start ? null : e.start.valueOf()) ===
        (null === t.start ? null : t.start.valueOf()) &&
      (null === e.end ? null : e.end.valueOf()) ===
        (null === t.end ? null : t.end.valueOf())
    );
  }
  function ir(e, t) {
    return (
      (null === e.end || null === t.start || e.end > t.start) &&
      (null === e.start || null === t.end || e.start < t.end)
    );
  }
  function sr(e, t) {
    return (
      (null === e.start || (null !== t.start && t.start >= e.start)) &&
      (null === e.end || (null !== t.end && t.end <= e.end))
    );
  }
  function or(e, t) {
    return (null === e.start || t >= e.start) && (null === e.end || t < e.end);
  }
  function ar(e, t, n, r) {
    return {
      dow: e.getUTCDay(),
      isDisabled: Boolean(r && !or(r.activeRange, e)),
      isOther: Boolean(r && !or(r.currentRange, e)),
      isToday: Boolean(t && or(t, e)),
      isPast: Boolean(n ? e < n : !!t && e < t.start),
      isFuture: Boolean(n ? n < e : !!t && e >= t.end),
    };
  }
  function lr(e, t) {
    let n = ["fc-day", "fc-day-" + Ct[e.dow]];
    return (
      e.isDisabled
        ? n.push("fc-day-disabled")
        : (e.isToday && (n.push("fc-day-today"), n.push(t.getClass("today"))),
          e.isPast && n.push("fc-day-past"),
          e.isFuture && n.push("fc-day-future"),
          e.isOther && n.push("fc-day-other")),
      n
    );
  }
  const cr = o({ year: "numeric", month: "long", day: "numeric" }),
    dr = o({ week: "long" });
  function ur(e, n, r = "day", t = !0) {
    const { dateEnv: i, options: s, calendarApi: o } = e;
    var a,
      l,
      e = i.format(n, "week" === r ? dr : cr);
    return s.navLinks
      ? ((a = i.toDate(n)),
        (l = (e) => {
          let t =
            "day" === r
              ? s.navLinkDayClick
              : "week" === r
              ? s.navLinkWeekClick
              : null;
          "function" == typeof t
            ? t.call(o, i.toDate(n), e)
            : ("string" == typeof t && (r = t), o.zoomTo(n, r));
        }),
        Object.assign(
          { title: tt(s.navLinkHint, [e, a], e), "data-navlink": "" },
          t ? We(l) : { onClick: l }
        ))
      : { "aria-label": e };
  }
  let hr = null;
  function fr() {
    return (hr =
      null === hr
        ? (function () {
            let e = document.createElement("div"),
              t =
                (Ie(e, {
                  position: "absolute",
                  top: -1e3,
                  left: 0,
                  border: 0,
                  padding: 0,
                  overflow: "scroll",
                  direction: "rtl",
                }),
                (e.innerHTML = "<div></div>"),
                document.body.appendChild(e),
                e.firstChild),
              n =
                t.getBoundingClientRect().left > e.getBoundingClientRect().left;
            return xe(e), n;
          })()
        : hr);
  }
  let gr;
  function pr() {
    return (gr =
      gr ||
      (function () {
        let e = document.createElement("div"),
          t =
            ((e.style.overflow = "scroll"),
            (e.style.position = "absolute"),
            (e.style.top = "-9999px"),
            (e.style.left = "-9999px"),
            document.body.appendChild(e),
            vr(e));
        return document.body.removeChild(e), t;
      })());
  }
  function vr(e) {
    return {
      x: e.offsetHeight - e.clientHeight,
      y: e.offsetWidth - e.clientWidth,
    };
  }
  function mr(e, t = !1) {
    var n = window.getComputedStyle(e),
      r = parseInt(n.borderLeftWidth, 10) || 0,
      i = parseInt(n.borderRightWidth, 10) || 0,
      s = parseInt(n.borderTopWidth, 10) || 0,
      o = parseInt(n.borderBottomWidth, 10) || 0,
      e = vr(e),
      a = e.y - r - i;
    let l = {
      borderLeft: r,
      borderRight: i,
      borderTop: s,
      borderBottom: o,
      scrollbarBottom: e.x - s - o,
      scrollbarLeft: 0,
      scrollbarRight: 0,
    };
    return (
      fr() && "rtl" === n.direction
        ? (l.scrollbarLeft = a)
        : (l.scrollbarRight = a),
      t &&
        ((l.paddingLeft = parseInt(n.paddingLeft, 10) || 0),
        (l.paddingRight = parseInt(n.paddingRight, 10) || 0),
        (l.paddingTop = parseInt(n.paddingTop, 10) || 0),
        (l.paddingBottom = parseInt(n.paddingBottom, 10) || 0)),
      l
    );
  }
  function yr(e, t = !1, n) {
    (n = n ? e.getBoundingClientRect() : br(e)), (e = mr(e, t));
    let r = {
      left: n.left + e.borderLeft + e.scrollbarLeft,
      right: n.right - e.borderRight - e.scrollbarRight,
      top: n.top + e.borderTop,
      bottom: n.bottom - e.borderBottom - e.scrollbarBottom,
    };
    return (
      t &&
        ((r.left += e.paddingLeft),
        (r.right -= e.paddingRight),
        (r.top += e.paddingTop),
        (r.bottom -= e.paddingBottom)),
      r
    );
  }
  function br(e) {
    e = e.getBoundingClientRect();
    return {
      left: e.left + window.pageXOffset,
      top: e.top + window.pageYOffset,
      right: e.right + window.pageXOffset,
      bottom: e.bottom + window.pageYOffset,
    };
  }
  function Er(e) {
    let t = [];
    for (; e instanceof HTMLElement; ) {
      var n = window.getComputedStyle(e);
      if ("fixed" === n.position) break;
      /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && t.push(e),
        (e = e.parentNode);
    }
    return t;
  }
  function Sr(e, t, n) {
    let r = !1;
    function i(e) {
      r || ((r = !0), t(e));
    }
    function s(e) {
      r || ((r = !0), n(e));
    }
    let o = e(i, s);
    o && "function" == typeof o.then && o.then(i, s);
  }
  class Ar {
    constructor() {
      (this.handlers = {}), (this.thisContext = null);
    }
    setThisContext(e) {
      this.thisContext = e;
    }
    setOptions(e) {
      this.options = e;
    }
    on(e, t) {
      var n;
      (n = this.handlers), (t = t), (n[(e = e)] || (n[e] = [])).push(t);
    }
    off(e, t) {
      var n, r;
      (n = this.handlers),
        (e = e),
        (r = t) ? n[e] && (n[e] = n[e].filter((e) => e !== r)) : delete n[e];
    }
    trigger(e, ...t) {
      var n,
        r = this.handlers[e] || [],
        e = this.options && this.options[e];
      for (n of [].concat(e || [], r)) n.apply(this.thisContext, t);
    }
    hasHandlers(e) {
      return Boolean(
        (this.handlers[e] && this.handlers[e].length) ||
          (this.options && this.options[e])
      );
    }
  }
  class Dr {
    constructor(e, t, n, r) {
      this.els = t;
      t = this.originClientRect = e.getBoundingClientRect();
      n && this.buildElHorizontals(t.left), r && this.buildElVerticals(t.top);
    }
    buildElHorizontals(e) {
      let t = [],
        n = [];
      for (var r of this.els) {
        r = r.getBoundingClientRect();
        t.push(r.left - e), n.push(r.right - e);
      }
      (this.lefts = t), (this.rights = n);
    }
    buildElVerticals(e) {
      let t = [],
        n = [];
      for (var r of this.els) {
        r = r.getBoundingClientRect();
        t.push(r.top - e), n.push(r.bottom - e);
      }
      (this.tops = t), (this.bottoms = n);
    }
    leftToIndex(e) {
      var { lefts: t, rights: n } = this,
        r = t.length;
      let i;
      for (i = 0; i < r; i += 1) if (e >= t[i] && e < n[i]) return i;
    }
    topToIndex(e) {
      var { tops: t, bottoms: n } = this,
        r = t.length;
      let i;
      for (i = 0; i < r; i += 1) if (e >= t[i] && e < n[i]) return i;
    }
    getWidth(e) {
      return this.rights[e] - this.lefts[e];
    }
    getHeight(e) {
      return this.bottoms[e] - this.tops[e];
    }
    similarTo(e) {
      return (
        wr(this.tops || [], e.tops || []) &&
        wr(this.bottoms || [], e.bottoms || []) &&
        wr(this.lefts || [], e.lefts || []) &&
        wr(this.rights || [], e.rights || [])
      );
    }
  }
  function wr(t, n) {
    var r = t.length;
    if (r !== n.length) return !1;
    for (let e = 0; e < r; e++)
      if (Math.round(t[e]) !== Math.round(n[e])) return !1;
    return !0;
  }
  class Cr {
    getMaxScrollTop() {
      return this.getScrollHeight() - this.getClientHeight();
    }
    getMaxScrollLeft() {
      return this.getScrollWidth() - this.getClientWidth();
    }
    canScrollVertically() {
      return 0 < this.getMaxScrollTop();
    }
    canScrollHorizontally() {
      return 0 < this.getMaxScrollLeft();
    }
    canScrollUp() {
      return 0 < this.getScrollTop();
    }
    canScrollDown() {
      return this.getScrollTop() < this.getMaxScrollTop();
    }
    canScrollLeft() {
      return 0 < this.getScrollLeft();
    }
    canScrollRight() {
      return this.getScrollLeft() < this.getMaxScrollLeft();
    }
  }
  class Rr extends Cr {
    constructor(e) {
      super(), (this.el = e);
    }
    getScrollTop() {
      return this.el.scrollTop;
    }
    getScrollLeft() {
      return this.el.scrollLeft;
    }
    setScrollTop(e) {
      this.el.scrollTop = e;
    }
    setScrollLeft(e) {
      this.el.scrollLeft = e;
    }
    getScrollWidth() {
      return this.el.scrollWidth;
    }
    getScrollHeight() {
      return this.el.scrollHeight;
    }
    getClientHeight() {
      return this.el.clientHeight;
    }
    getClientWidth() {
      return this.el.clientWidth;
    }
  }
  class xr extends Cr {
    getScrollTop() {
      return window.pageYOffset;
    }
    getScrollLeft() {
      return window.pageXOffset;
    }
    setScrollTop(e) {
      window.scroll(window.pageXOffset, e);
    }
    setScrollLeft(e) {
      window.scroll(e, window.pageYOffset);
    }
    getScrollWidth() {
      return document.documentElement.scrollWidth;
    }
    getScrollHeight() {
      return document.documentElement.scrollHeight;
    }
    getClientHeight() {
      return document.documentElement.clientHeight;
    }
    getClientWidth() {
      return document.documentElement.clientWidth;
    }
  }
  class Tr {
    constructor(e) {
      this.iconOverrideOption &&
        this.setIconOverride(e[this.iconOverrideOption]);
    }
    setIconOverride(e) {
      let t, n;
      if ("object" == typeof e && e) {
        for (n in ((t = Object.assign({}, this.iconClasses)), e))
          t[n] = this.applyIconOverridePrefix(e[n]);
        this.iconClasses = t;
      } else !1 === e && (this.iconClasses = {});
    }
    applyIconOverridePrefix(e) {
      var t = this.iconOverridePrefix;
      return (e = t && 0 !== e.indexOf(t) ? t + e : e);
    }
    getClass(e) {
      return this.classes[e] || "";
    }
    getIconClass(e, t) {
      let n;
      return (n =
        (t && this.rtlIconClasses && this.rtlIconClasses[e]) ||
        this.iconClasses[e])
        ? this.baseIconClass + " " + n
        : "";
    }
    getCustomButtonIconClass(e) {
      var t;
      return this.iconOverrideCustomButtonOption &&
        (t = e[this.iconOverrideCustomButtonOption])
        ? this.baseIconClass + " " + this.applyIconOverridePrefix(t)
        : "";
    }
  }
  function _r(e) {
    e();
    e = C.debounceRendering;
    let t = [];
    for (
      C.debounceRendering = function (e) {
        t.push(e);
      },
        z(E(kr, {}), document.createElement("div"));
      t.length;

    )
      t.shift()();
    C.debounceRendering = e;
  }
  (Tr.prototype.classes = {}),
    (Tr.prototype.iconClasses = {}),
    (Tr.prototype.baseIconClass = ""),
    (Tr.prototype.iconOverridePrefix = "");
  class kr extends O {
    render() {
      return E("div", {});
    }
    componentDidMount() {
      this.setState({});
    }
  }
  function Mr(e) {
    let t =
      ((e = {
        __c: (r = "__cC" + G++),
        __: (e = e),
        Consumer: function (e, t) {
          return e.children(t);
        },
        Provider: function (e) {
          var n, t;
          return (
            this.getChildContext ||
              ((n = []),
              (((t = {})[r] = this).getChildContext = function () {
                return t;
              }),
              (this.shouldComponentUpdate = function (e) {
                this.props.value !== e.value &&
                  n.some(function (e) {
                    (e.__e = !0), m(e);
                  });
              }),
              (this.sub = function (e) {
                n.push(e);
                var t = e.componentWillUnmount;
                e.componentWillUnmount = function () {
                  n.splice(n.indexOf(e), 1), t && t.call(e);
                };
              })),
            e.children
          );
        },
      }).Provider.__ =
      e.Consumer.contextType =
        e);
    var r;
    let n = t.Provider;
    return (
      (t.Provider = function () {
        var e = !this.getChildContext,
          t = n.apply(this, arguments);
        if (e) {
          let n = [];
          (this.shouldComponentUpdate = (t) => {
            this.props.value !== t.value &&
              n.forEach((e) => {
                (e.context = t.value), e.forceUpdate();
              });
          }),
            (this.sub = (e) => {
              n.push(e);
              let t = e.componentWillUnmount;
              e.componentWillUnmount = () => {
                n.splice(n.indexOf(e), 1), t && t.call(e);
              };
            });
        }
        return t;
      }),
      t
    );
  }
  class Ir {
    constructor(e, t, n, r) {
      (this.execFunc = e),
        (this.emitter = t),
        (this.scrollTime = n),
        (this.scrollTimeReset = r),
        (this.handleScrollRequest = (e) => {
          (this.queuedRequest = Object.assign({}, this.queuedRequest || {}, e)),
            this.drain();
        }),
        t.on("_scrollRequest", this.handleScrollRequest),
        this.fireInitialScroll();
    }
    detach() {
      this.emitter.off("_scrollRequest", this.handleScrollRequest);
    }
    update(e) {
      e && this.scrollTimeReset ? this.fireInitialScroll() : this.drain();
    }
    fireInitialScroll() {
      this.handleScrollRequest({ time: this.scrollTime });
    }
    drain() {
      this.queuedRequest &&
        this.execFunc(this.queuedRequest) &&
        (this.queuedRequest = null);
    }
  }
  const Or = Mr({});
  function Nr(e, t, n, r, i, s, o, a, l, c, d, u, h) {
    return {
      dateEnv: i,
      options: n,
      pluginHooks: o,
      emitter: c,
      dispatch: a,
      getCurrentData: l,
      calendarApi: d,
      viewSpec: e,
      viewApi: t,
      dateProfileGenerator: r,
      theme: s,
      isRtl: "rtl" === n.direction,
      addResizeHandler(e) {
        c.on("_resize", e);
      },
      removeResizeHandler(e) {
        c.off("_resize", e);
      },
      createScrollResponder(e) {
        return new Ir(e, c, p(n.scrollTime), n.scrollTimeReset);
      },
      registerInteractiveComponent: u,
      unregisterInteractiveComponent: h,
    };
  }
  class Pr extends O {
    shouldComponentUpdate(e, t) {
      return (
        this.debug && console.log(St(e, this.props), St(t, this.state)),
        !At(this.props, e, this.propEquality) ||
          !At(this.state, t, this.stateEquality)
      );
    }
    safeSetState(e) {
      At(
        this.state,
        Object.assign(Object.assign({}, this.state), e),
        this.stateEquality
      ) || this.setState(e);
    }
  }
  (Pr.addPropsEquality = function (e) {
    var t = Object.create(this.prototype.propEquality);
    Object.assign(t, e), (this.prototype.propEquality = t);
  }),
    (Pr.addStateEquality = function (e) {
      var t = Object.create(this.prototype.stateEquality);
      Object.assign(t, e), (this.prototype.stateEquality = t);
    }),
    (Pr.contextType = Or),
    (Pr.prototype.propEquality = {}),
    (Pr.prototype.stateEquality = {});
  class n extends Pr {}
  function Hr(e, t) {
    "function" == typeof e ? e(t) : e && (e.current = t);
  }
  n.contextType = Or;
  class Br extends n {
    constructor() {
      super(...arguments), (this.uid = Ve());
    }
    prepareHits() {}
    queryHit(e, t, n, r) {
      return null;
    }
    isValidSegDownEl(e) {
      return (
        !this.props.eventDrag &&
        !this.props.eventResize &&
        !Te(e, ".fc-event-mirror")
      );
    }
    isValidDateDownEl(e) {
      return !(
        Te(e, ".fc-event:not(.fc-bg-event)") ||
        Te(e, ".fc-more-link") ||
        Te(e, "a[data-navlink]") ||
        Te(e, ".fc-popover")
      );
    }
  }
  function jr(e, t) {
    return null == (e = "function" == typeof e ? e() : e)
      ? t.createNowMarker()
      : t.createMarker(e);
  }
  class zr {
    constructor(e) {
      (this.props = e),
        (this.nowDate = jr(e.nowInput, e.dateEnv)),
        this.initHiddenDays();
    }
    buildPrev(e, t, n) {
      let r = this.props["dateEnv"];
      t = r.subtract(r.startOf(t, e.currentRangeUnit), e.dateIncrement);
      return this.build(t, -1, n);
    }
    buildNext(e, t, n) {
      let r = this.props["dateEnv"];
      t = r.add(r.startOf(t, e.currentRangeUnit), e.dateIncrement);
      return this.build(t, 1, n);
    }
    build(e, t, n = !0) {
      var r,
        i,
        s,
        o = this["props"];
      let a;
      return (
        (r = this.buildValidRange()),
        (r = this.trimHiddenDays(r)),
        n &&
          ((n = e),
          (e =
            null != (s = r).start && n < s.start
              ? s.start
              : null != s.end && n >= s.end
              ? new Date(s.end.valueOf() - 1)
              : n)),
        (s = this.buildCurrentRangeInfo(e, t)),
        (n = /^(year|month|week|day)$/.test(s.unit)),
        (t = this.buildRenderRange(this.trimHiddenDays(s.range), s.unit, n)),
        (t = this.trimHiddenDays(t)),
        (a = t),
        o.showNonCurrentDates || (a = nr(a, s.range)),
        (a = nr((a = this.adjustActiveRange(a)), r)),
        (i = ir(s.range, r)),
        {
          currentDate: (e = or(t, e) ? e : t.start),
          validRange: r,
          currentRange: s.range,
          currentRangeUnit: s.unit,
          isRangeAllDay: n,
          activeRange: a,
          renderRange: t,
          slotMinTime: o.slotMinTime,
          slotMaxTime: o.slotMaxTime,
          isValid: i,
          dateIncrement: this.buildDateIncrement(s.duration),
        }
      );
    }
    buildValidRange() {
      let e = this.props.validRangeInput;
      var t =
        "function" == typeof e
          ? e.call(this.props.calendarApi, this.nowDate)
          : e;
      return this.refineRange(t) || { start: null, end: null };
    }
    buildCurrentRangeInfo(e, t) {
      let n = this["props"],
        r = null,
        i = null,
        s = null;
      var o;
      return (
        n.duration
          ? ((r = n.duration),
            (i = n.durationUnit),
            (s = this.buildRangeFromDuration(e, t, r, i)))
          : (o = this.props.dayCount)
          ? ((i = "day"), (s = this.buildRangeFromDayCount(e, t, o)))
          : (s = this.buildCustomVisibleRange(e))
          ? (i = n.dateEnv.greatestWholeUnit(s.start, s.end).unit)
          : ((r = this.getFallbackDuration()),
            (i = ht(r).unit),
            (s = this.buildRangeFromDuration(e, t, r, i))),
        { duration: r, unit: i, range: s }
      );
    }
    getFallbackDuration() {
      return p({ day: 1 });
    }
    adjustActiveRange(e) {
      let {
          dateEnv: t,
          usesMinMaxTime: n,
          slotMinTime: r,
          slotMaxTime: i,
        } = this.props,
        { start: s, end: o } = e;
      return (
        n &&
          (ct(r) < 0 && ((s = v(s)), (s = t.add(s, r))),
          1 < ct(i) && ((o = xt((o = v(o)), -1)), (o = t.add(o, i)))),
        { start: s, end: o }
      );
    }
    buildRangeFromDuration(e, t, n, d) {
      let { dateEnv: r, dateAlignment: i } = this.props,
        s,
        o,
        a;
      var l;
      function c() {
        (s = r.startOf(e, i)), (o = r.add(s, n)), (a = { start: s, end: o });
      }
      return (
        i ||
          ((l = this.props["dateIncrement"]),
          (i = l && dt(l) < dt(n) ? ht(l).unit : d)),
        ct(n) <= 1 &&
          this.isHiddenDay(s) &&
          (s = v((s = this.skipHiddenDays(s, t)))),
        c(),
        this.trimHiddenDays(a) || ((e = this.skipHiddenDays(e, t)), c()),
        a
      );
    }
    buildRangeFromDayCount(e, t, n) {
      let { dateEnv: r, dateAlignment: i } = this.props,
        s = 0,
        o = e,
        a;
      for (
        o = v((o = i ? r.startOf(o, i) : o)),
          o = this.skipHiddenDays(o, t),
          a = o;
        (a = xt(a, 1)), this.isHiddenDay(a) || (s += 1), s < n;

      );
      return { start: o, end: a };
    }
    buildCustomVisibleRange(e) {
      let t = this["props"],
        n = t.visibleRangeInput;
      (e =
        "function" == typeof n
          ? n.call(t.calendarApi, t.dateEnv.toDate(e))
          : n),
        (e = this.refineRange(e));
      return !e || (null != e.start && null != e.end) ? e : null;
    }
    buildRenderRange(e, t, n) {
      return e;
    }
    buildDateIncrement(e) {
      var t = this.props["dateIncrement"];
      return (
        t || ((t = this.props.dateAlignment) ? p(1, t) : e || p({ days: 1 }))
      );
    }
    refineRange(t) {
      if (t) {
        let e = (function (e, t) {
          let n = null,
            r = null;
          return (
            e.start && (n = t.createMarker(e.start)),
            e.end && (r = t.createMarker(e.end)),
            (!n && !r) || (n && r && r < n) ? null : { start: n, end: r }
          );
        })(t, this.props.dateEnv);
        return (e = e && Wn(e));
      }
      return null;
    }
    initHiddenDays() {
      let e = this.props.hiddenDays || [],
        t = [],
        n = 0,
        r;
      for (!1 === this.props.weekends && e.push(0, 6), r = 0; r < 7; r += 1)
        (t[r] = -1 !== e.indexOf(r)) || (n += 1);
      if (!n) throw new Error("invalid hiddenDays");
      this.isHiddenDayHash = t;
    }
    trimHiddenDays(e) {
      let { start: t, end: n } = e;
      return (
        (t = t && this.skipHiddenDays(t)),
        (n = n && this.skipHiddenDays(n, -1, !0)),
        null == t || null == n || t < n ? { start: t, end: n } : null
      );
    }
    isHiddenDay(e) {
      return e instanceof Date && (e = e.getUTCDay()), this.isHiddenDayHash[e];
    }
    skipHiddenDays(e, t = 1, n = !1) {
      for (; this.isHiddenDayHash[(e.getUTCDay() + (n ? t : 0) + 7) % 7]; )
        e = xt(e, t);
      return e;
    }
  }
  function Ur(e, t, n) {
    n.emitter.trigger(
      "select",
      Object.assign(Object.assign({}, Wr(e, n)), {
        jsEvent: t ? t.origEvent : null,
        view: n.viewApi || n.calendarApi.view,
      })
    );
  }
  function Wr(e, t) {
    var n,
      r,
      i,
      s = {};
    for (n of t.pluginHooks.dateSpanTransforms) Object.assign(s, n(e, t));
    return (
      Object.assign(
        s,
        ((r = e),
        (i = t.dateEnv),
        Object.assign(Object.assign({}, ci(r.range, i, r.allDay)), {
          allDay: r.allDay,
        }))
      ),
      s
    );
  }
  function Lr(e, t, n) {
    let { dateEnv: r, options: i } = n,
      s = t;
    return (s = e
      ? ((s = v(s)), r.add(s, i.defaultAllDayEventDuration))
      : r.add(s, i.defaultTimedEventDuration));
  }
  function Fr(e, t, n, r) {
    var i,
      s,
      o = Jr(e.defs, t);
    let a = An();
    for (i in e.defs) {
      var l = e.defs[i];
      a.defs[i] = (function (e, t, n, r) {
        let i = n.standardProps || {};
        null == i.hasEnd &&
          t.durationEditable &&
          (n.startDelta || n.endDelta) &&
          (i.hasEnd = !0);
        let s = Object.assign(Object.assign(Object.assign({}, e), i), {
          ui: Object.assign(Object.assign({}, e.ui), i.ui),
        });
        n.extendedProps &&
          (s.extendedProps = Object.assign(
            Object.assign({}, s.extendedProps),
            n.extendedProps
          ));
        for (var o of r.pluginHooks.eventDefMutationAppliers) o(s, n, r);
        !s.hasEnd && r.options.forceEventDuration && (s.hasEnd = !0);
        return s;
      })(l, o[i], n, r);
    }
    for (s in e.instances) {
      var c = e.instances[s],
        d = a.defs[c.defId];
      a.instances[s] = (function (e, t, n, r, i) {
        let s = i["dateEnv"],
          o = r.standardProps && !0 === r.standardProps.allDay,
          a = r.standardProps && !1 === r.standardProps.hasEnd,
          l = Object.assign({}, e);
        o && (l.range = Un(l.range));
        r.datesDelta &&
          n.startEditable &&
          (l.range = {
            start: s.add(l.range.start, r.datesDelta),
            end: s.add(l.range.end, r.datesDelta),
          });
        r.startDelta &&
          n.durationEditable &&
          (l.range = {
            start: s.add(l.range.start, r.startDelta),
            end: l.range.end,
          });
        r.endDelta &&
          n.durationEditable &&
          (l.range = {
            start: l.range.start,
            end: s.add(l.range.end, r.endDelta),
          });
        a &&
          (l.range = {
            start: l.range.start,
            end: Lr(t.allDay, l.range.start, i),
          });
        t.allDay &&
          (l.range = { start: v(l.range.start), end: v(l.range.end) });
        l.range.end < l.range.start &&
          (l.range.end = Lr(t.allDay, l.range.start, i));
        return l;
      })(c, d, o[c.defId], n, r);
    }
    return a;
  }
  class Vr {
    constructor(e, t) {
      (this.context = e), (this.internalEventSource = t);
    }
    remove() {
      this.context.dispatch({
        type: "REMOVE_EVENT_SOURCE",
        sourceId: this.internalEventSource.sourceId,
      });
    }
    refetch() {
      this.context.dispatch({
        type: "FETCH_EVENT_SOURCES",
        sourceIds: [this.internalEventSource.sourceId],
        isRefetch: !0,
      });
    }
    get id() {
      return this.internalEventSource.publicId;
    }
    get url() {
      return this.internalEventSource.meta.url;
    }
    get format() {
      return this.internalEventSource.meta.format;
    }
  }
  class x {
    constructor(e, t, n) {
      (this._context = e), (this._def = t), (this._instance = n || null);
    }
    setProp(t, n) {
      if (t in In)
        console.warn(
          "Could not set date-related prop 'name'. Use one of the date-related methods instead."
        );
      else if ("id" === t)
        (n = Mn[t](n)), this.mutate({ standardProps: { publicId: n } });
      else if (t in Mn)
        (n = Mn[t](n)), this.mutate({ standardProps: { [t]: n } });
      else if (t in Rn) {
        let e = Rn[t](n);
        (e =
          "color" === t
            ? { backgroundColor: n, borderColor: n }
            : "editable" === t
            ? { startEditable: n, durationEditable: n }
            : { [t]: n }),
          this.mutate({ standardProps: { ui: e } });
      } else
        console.warn(`Could not set prop '${t}'. Use setExtendedProp instead.`);
    }
    setExtendedProp(e, t) {
      this.mutate({ extendedProps: { [e]: t } });
    }
    setStart(e, t = {}) {
      let n = this._context["dateEnv"];
      var e = n.createMarker(e);
      e &&
        this._instance &&
        ((e = Fn(this._instance.range.start, e, n, t.granularity)),
        t.maintainDuration
          ? this.mutate({ datesDelta: e })
          : this.mutate({ startDelta: e }));
    }
    setEnd(e, t = {}) {
      let n = this._context["dateEnv"],
        r;
      (null == e || (r = n.createMarker(e))) &&
        this._instance &&
        (r
          ? ((e = Fn(this._instance.range.end, r, n, t.granularity)),
            this.mutate({ endDelta: e }))
          : this.mutate({ standardProps: { hasEnd: !1 } }));
    }
    setDates(t, n, r = {}) {
      let i = this._context["dateEnv"],
        s = { allDay: r.allDay };
      var o,
        t = i.createMarker(t);
      let a;
      if (t && (null == n || (a = i.createMarker(n))) && this._instance) {
        let e = this._instance.range;
        n = Fn((e = !0 === r.allDay ? Un(e) : e).start, t, i, r.granularity);
        a
          ? ((t = Fn(e.end, a, i, r.granularity)),
            (r = t),
            (o = n).years === r.years &&
            o.months === r.months &&
            o.days === r.days &&
            o.milliseconds === r.milliseconds
              ? this.mutate({ datesDelta: n, standardProps: s })
              : this.mutate({ startDelta: n, endDelta: t, standardProps: s }))
          : ((s.hasEnd = !1), this.mutate({ datesDelta: n, standardProps: s }));
      }
    }
    moveStart(e) {
      e = p(e);
      e && this.mutate({ startDelta: e });
    }
    moveEnd(e) {
      e = p(e);
      e && this.mutate({ endDelta: e });
    }
    moveDates(e) {
      e = p(e);
      e && this.mutate({ datesDelta: e });
    }
    setAllDay(e, t = {}) {
      let n = { allDay: e },
        r = t["maintainDuration"];
      null == r && (r = this._context.options.allDayMaintainDuration),
        this._def.allDay !== e && (n.hasEnd = r),
        this.mutate({ standardProps: n });
    }
    formatRange(e) {
      let t = this._context["dateEnv"];
      var n = this._instance,
        e = o(e);
      return this._def.hasEnd
        ? t.formatRange(n.range.start, n.range.end, e, {
            forcedStartTzo: n.forcedStartTzo,
            forcedEndTzo: n.forcedEndTzo,
          })
        : t.format(n.range.start, e, { forcedTzo: n.forcedStartTzo });
    }
    mutate(n) {
      var r = this._instance;
      if (r) {
        var i = this._def;
        let e = this._context,
          t = e.getCurrentData()["eventStore"];
        var n = Fr(
            Sn(t, r.instanceId),
            {
              "": {
                display: "",
                startEditable: !0,
                durationEditable: !0,
                constraints: [],
                overlap: null,
                allows: [],
                backgroundColor: "",
                borderColor: "",
                textColor: "",
                classNames: [],
              },
            },
            n,
            e
          ),
          s = new x(e, i, r);
        (this._def = n.defs[i.defId]),
          (this._instance = n.instances[r.instanceId]),
          e.dispatch({ type: "MERGE_EVENTS", eventStore: n }),
          e.emitter.trigger("eventChange", {
            oldEvent: s,
            event: this,
            relatedEvents: Qr(n, e, r),
            revert() {
              e.dispatch({ type: "RESET_EVENTS", eventStore: t });
            },
          });
      }
    }
    remove() {
      let e = this._context,
        t = Gr(this);
      e.dispatch({ type: "REMOVE_EVENTS", eventStore: t }),
        e.emitter.trigger("eventRemove", {
          event: this,
          relatedEvents: [],
          revert() {
            e.dispatch({ type: "MERGE_EVENTS", eventStore: t });
          },
        });
    }
    get source() {
      var e = this._def["sourceId"];
      return e
        ? new Vr(this._context, this._context.getCurrentData().eventSources[e])
        : null;
    }
    get start() {
      return this._instance
        ? this._context.dateEnv.toDate(this._instance.range.start)
        : null;
    }
    get end() {
      return this._instance && this._def.hasEnd
        ? this._context.dateEnv.toDate(this._instance.range.end)
        : null;
    }
    get startStr() {
      var e = this._instance;
      return e
        ? this._context.dateEnv.formatIso(e.range.start, {
            omitTime: this._def.allDay,
            forcedTzo: e.forcedStartTzo,
          })
        : "";
    }
    get endStr() {
      var e = this._instance;
      return e && this._def.hasEnd
        ? this._context.dateEnv.formatIso(e.range.end, {
            omitTime: this._def.allDay,
            forcedTzo: e.forcedEndTzo,
          })
        : "";
    }
    get id() {
      return this._def.publicId;
    }
    get groupId() {
      return this._def.groupId;
    }
    get allDay() {
      return this._def.allDay;
    }
    get title() {
      return this._def.title;
    }
    get url() {
      return this._def.url;
    }
    get display() {
      return this._def.ui.display || "auto";
    }
    get startEditable() {
      return this._def.ui.startEditable;
    }
    get durationEditable() {
      return this._def.ui.durationEditable;
    }
    get constraint() {
      return this._def.ui.constraints[0] || null;
    }
    get overlap() {
      return this._def.ui.overlap;
    }
    get allow() {
      return this._def.ui.allows[0] || null;
    }
    get backgroundColor() {
      return this._def.ui.backgroundColor;
    }
    get borderColor() {
      return this._def.ui.borderColor;
    }
    get textColor() {
      return this._def.ui.textColor;
    }
    get classNames() {
      return this._def.ui.classNames;
    }
    get extendedProps() {
      return this._def.extendedProps;
    }
    toPlainObject(e = {}) {
      var t = this._def,
        n = t["ui"],
        { startStr: r, endStr: i } = this;
      let s = { allDay: t.allDay };
      return (
        t.title && (s.title = t.title),
        r && (s.start = r),
        i && (s.end = i),
        t.publicId && (s.id = t.publicId),
        t.groupId && (s.groupId = t.groupId),
        t.url && (s.url = t.url),
        n.display && "auto" !== n.display && (s.display = n.display),
        e.collapseColor &&
        n.backgroundColor &&
        n.backgroundColor === n.borderColor
          ? (s.color = n.backgroundColor)
          : (n.backgroundColor && (s.backgroundColor = n.backgroundColor),
            n.borderColor && (s.borderColor = n.borderColor)),
        n.textColor && (s.textColor = n.textColor),
        n.classNames.length && (s.classNames = n.classNames),
        Object.keys(t.extendedProps).length &&
          (e.collapseExtendedProps
            ? Object.assign(s, t.extendedProps)
            : (s.extendedProps = t.extendedProps)),
        s
      );
    }
    toJSON() {
      return this.toPlainObject();
    }
  }
  function Gr(e) {
    var t = e._def,
      e = e._instance;
    return {
      defs: { [t.defId]: t },
      instances: e ? { [e.instanceId]: e } : {},
    };
  }
  function Qr(e, t, n) {
    var { defs: r, instances: i } = e;
    let s = [];
    var o,
      a = n ? n.instanceId : "";
    for (o in i) {
      var l = i[o],
        c = r[l.defId];
      l.instanceId !== a && s.push(new x(t, c, l));
    }
    return s;
  }
  function qr(n, d, u, h) {
    let r = {},
      i = {},
      f = {},
      s = [],
      g = [];
    var p,
      v,
      m,
      y,
      e,
      b,
      o = Jr(n.defs, d);
    for (p in n.defs) {
      var t = n.defs[p];
      "inverse-background" === o[t.defId].display &&
        (t.groupId
          ? ((r[t.groupId] = []), f[t.groupId] || (f[t.groupId] = t))
          : (i[p] = []));
    }
    for (v in n.instances) {
      var a = n.instances[v],
        l = n.defs[a.defId],
        c = o[l.defId],
        E = a.range;
      let e = !l.allDay && h ? Wn(E, h) : E,
        t = nr(e, u);
      t &&
        ("inverse-background" === c.display
          ? (l.groupId ? r[l.groupId] : i[a.defId]).push(t)
          : "none" !== c.display &&
            ("background" === c.display ? s : g).push({
              def: l,
              ui: c,
              instance: a,
              range: t,
              isStart: e.start && e.start.valueOf() === t.start.valueOf(),
              isEnd: e.end && e.end.valueOf() === t.end.valueOf(),
            }));
    }
    for (m in r)
      for (y of er(r[m], u)) {
        var S = f[m],
          A = o[S.defId];
        s.push({
          def: S,
          ui: A,
          instance: null,
          range: y,
          isStart: !1,
          isEnd: !1,
        });
      }
    for (e in i)
      for (b of er(i[e], u))
        s.push({
          def: n.defs[e],
          ui: o[e],
          instance: null,
          range: b,
          isStart: !1,
          isEnd: !1,
        });
    return { bg: s, fg: g };
  }
  function Yr(e) {
    return (
      "background" === e.ui.display || "inverse-background" === e.ui.display
    );
  }
  function Zr(e, t) {
    e.fcSeg = t;
  }
  function Xr(e) {
    return e.fcSeg || e.parentNode.fcSeg || null;
  }
  function Jr(e, t) {
    return vt(e, (e) => $r(e, t));
  }
  function $r(e, t) {
    let n = [];
    return (
      t[""] && n.push(t[""]),
      t[e.defId] && n.push(t[e.defId]),
      n.push(e.ui),
      _n(n)
    );
  }
  function Kr(e, n) {
    let t = e.map(ei);
    return t.sort((e, t) => $e(e, t, n)), t.map((e) => e._seg);
  }
  function ei(e) {
    var t = e["eventRange"],
      n = t.def;
    let r = (t.instance || t).range;
    var t = r.start ? r.start.valueOf() : 0,
      i = r.end ? r.end.valueOf() : 0;
    return Object.assign(Object.assign(Object.assign({}, n.extendedProps), n), {
      id: n.publicId,
      start: t,
      end: i,
      duration: i - t,
      allDay: Number(n.allDay),
      _seg: e,
    });
  }
  function ti(e, d, t, n, r, i, u) {
    let { dateEnv: h, options: f } = t,
      { displayEventTime: s, displayEventEnd: o } = f;
    var t = e.eventRange.def,
      a = e.eventRange.instance,
      n =
        (null == s && (s = !1 !== n),
        null == o && (o = !1 !== r),
        a.range.start),
      r = a.range.end;
    let l = i || e.start || e.eventRange.range.start,
      c = u || e.end || e.eventRange.range.end;
    var e = v(n).valueOf() === v(l).valueOf(),
      g = v(Tt(r, -1)).valueOf() === v(Tt(c, -1)).valueOf();
    return s && !t.allDay && (e || g)
      ? ((l = e ? n : l),
        (c = g ? r : c),
        o && t.hasEnd
          ? h.formatRange(l, c, d, {
              forcedStartTzo: i ? null : a.forcedStartTzo,
              forcedEndTzo: u ? null : a.forcedEndTzo,
            })
          : h.format(l, d, { forcedTzo: i ? null : a.forcedStartTzo }))
      : "";
  }
  function ni(e, t, n) {
    e = e.eventRange.range;
    return {
      isPast: e.end < (n || t.start),
      isFuture: e.start >= (n || t.end),
      isToday: t && or(t, e.start),
    };
  }
  function ri(e) {
    return e.instance
      ? e.instance.instanceId
      : e.def.defId + ":" + e.range.start.toISOString();
  }
  function ii(e, t) {
    let { def: n, instance: r } = e.eventRange;
    e = n.url;
    if (e) return { href: e };
    let { emitter: i, options: s } = t,
      o = s["eventInteractive"];
    return (o =
      null == o && null == (o = n.interactive)
        ? Boolean(i.hasHandlers("eventClick"))
        : o)
      ? Le((e) => {
          i.trigger("eventClick", {
            el: e.target,
            event: new x(t, n, r),
            jsEvent: e,
            view: t.viewApi,
          });
        })
      : {};
  }
  const si = { start: e, end: e, allDay: Boolean };
  function oi(e, t, n) {
    e = (function (e, t) {
      let { refined: n, extra: r } = vn(e, si),
        i = n.start ? t.createMarkerMeta(n.start) : null,
        s = n.end ? t.createMarkerMeta(n.end) : null,
        o = n["allDay"];
      null == o &&
        (o = i && i.isTimeUnspecified && (!s || s.isTimeUnspecified));
      return Object.assign(
        {
          range: { start: i ? i.marker : null, end: s ? s.marker : null },
          allDay: o,
        },
        r
      );
    })(e, t);
    let r = e["range"];
    if (!r.start) return null;
    if (!r.end) {
      if (null == n) return null;
      r.end = t.add(r.start, n);
    }
    return e;
  }
  function ai(e, t) {
    return (
      rr(e.range, t.range) &&
      e.allDay === t.allDay &&
      (function (e, t) {
        for (var n in t)
          if ("range" !== n && "allDay" !== n && e[n] !== t[n]) return !1;
        for (var r in e) if (!(r in t)) return !1;
        return !0;
      })(e, t)
    );
  }
  function li(e, t, n) {
    return Object.assign(Object.assign({}, ci(e, t, n)), {
      timeZone: t.timeZone,
    });
  }
  function ci(e, t, n) {
    return {
      start: t.toDate(e.start),
      end: t.toDate(e.end),
      startStr: t.formatIso(e.start, { omitTime: n }),
      endStr: t.formatIso(e.end, { omitTime: n }),
    };
  }
  let di = {};
  di.gregory = class {
    getMarkerYear(e) {
      return e.getUTCFullYear();
    }
    getMarkerMonth(e) {
      return e.getUTCMonth();
    }
    getMarkerDay(e) {
      return e.getUTCDate();
    }
    arrayToMarker(e) {
      return jt(e);
    }
    markerToArray(e) {
      return Bt(e);
    }
  };
  const ui =
    /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
  function hi(t) {
    t = ui.exec(t);
    if (t) {
      var n = new Date(
        Date.UTC(
          Number(t[1]),
          t[3] ? Number(t[3]) - 1 : 0,
          Number(t[5] || 1),
          Number(t[7] || 0),
          Number(t[8] || 0),
          Number(t[10] || 0),
          t[12] ? 1e3 * Number("0." + t[12]) : 0
        )
      );
      if (zt(n)) {
        let e = null;
        return (
          t[13] &&
            (e =
              ("-" === t[15] ? -1 : 1) *
              (60 * Number(t[16] || 0) + Number(t[18] || 0))),
          { marker: n, isTimeUnspecified: !t[6], timeZoneOffset: e }
        );
      }
    }
    return null;
  }
  class fi {
    constructor(e) {
      var t = (this.timeZone = e.timeZone),
        n = "local" !== t && "UTC" !== t;
      e.namedTimeZoneImpl &&
        n &&
        (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(t)),
        (this.canComputeOffset = Boolean(!n || this.namedTimeZoneImpl)),
        (this.calendarSystem = ((t = e.calendarSystem), new di[t]())),
        (this.locale = e.locale),
        (this.weekDow = e.locale.week.dow),
        (this.weekDoy = e.locale.week.doy),
        "ISO" === e.weekNumberCalculation &&
          ((this.weekDow = 1), (this.weekDoy = 4)),
        "number" == typeof e.firstDay && (this.weekDow = e.firstDay),
        "function" == typeof e.weekNumberCalculation &&
          (this.weekNumberFunc = e.weekNumberCalculation),
        (this.weekText = (null != e.weekText ? e : e.locale.options).weekText),
        (this.weekTextLong =
          (null != e.weekTextLong ? e : e.locale.options).weekTextLong ||
          this.weekText),
        (this.cmdFormatter = e.cmdFormatter),
        (this.defaultSeparator = e.defaultSeparator);
    }
    createMarker(e) {
      e = this.createMarkerMeta(e);
      return null === e ? null : e.marker;
    }
    createNowMarker() {
      return this.canComputeOffset
        ? this.timestampToMarker(new Date().valueOf())
        : jt(Pt(new Date()));
    }
    createMarkerMeta(e) {
      if ("string" == typeof e) return this.parse(e);
      let t = null;
      return (
        "number" == typeof e
          ? (t = this.timestampToMarker(e))
          : e instanceof Date
          ? ((e = e.valueOf()), isNaN(e) || (t = this.timestampToMarker(e)))
          : Array.isArray(e) && (t = jt(e)),
        null !== t && zt(t)
          ? { marker: t, isTimeUnspecified: !1, forcedTzo: null }
          : null
      );
    }
    parse(e) {
      e = hi(e);
      if (null === e) return null;
      let t = e["marker"],
        n = null;
      return (
        null !== e.timeZoneOffset &&
          (this.canComputeOffset
            ? (t = this.timestampToMarker(
                t.valueOf() - 60 * e.timeZoneOffset * 1e3
              ))
            : (n = e.timeZoneOffset)),
        { marker: t, isTimeUnspecified: e.isTimeUnspecified, forcedTzo: n }
      );
    }
    getYear(e) {
      return this.calendarSystem.getMarkerYear(e);
    }
    getMonth(e) {
      return this.calendarSystem.getMarkerMonth(e);
    }
    getDay(e) {
      return this.calendarSystem.getMarkerDay(e);
    }
    add(e, t) {
      let n = this.calendarSystem.markerToArray(e);
      return (
        (n[0] += t.years),
        (n[1] += t.months),
        (n[2] += t.days),
        (n[6] += t.milliseconds),
        this.calendarSystem.arrayToMarker(n)
      );
    }
    subtract(e, t) {
      let n = this.calendarSystem.markerToArray(e);
      return (
        (n[0] -= t.years),
        (n[1] -= t.months),
        (n[2] -= t.days),
        (n[6] -= t.milliseconds),
        this.calendarSystem.arrayToMarker(n)
      );
    }
    addYears(e, t) {
      let n = this.calendarSystem.markerToArray(e);
      return (n[0] += t), this.calendarSystem.arrayToMarker(n);
    }
    addMonths(e, t) {
      let n = this.calendarSystem.markerToArray(e);
      return (n[1] += t), this.calendarSystem.arrayToMarker(n);
    }
    diffWholeYears(e, t) {
      let n = this["calendarSystem"];
      return Ut(e) === Ut(t) &&
        n.getMarkerDay(e) === n.getMarkerDay(t) &&
        n.getMarkerMonth(e) === n.getMarkerMonth(t)
        ? n.getMarkerYear(t) - n.getMarkerYear(e)
        : null;
    }
    diffWholeMonths(e, t) {
      let n = this["calendarSystem"];
      return Ut(e) === Ut(t) && n.getMarkerDay(e) === n.getMarkerDay(t)
        ? n.getMarkerMonth(t) -
            n.getMarkerMonth(e) +
            12 * (n.getMarkerYear(t) - n.getMarkerYear(e))
        : null;
    }
    greatestWholeUnit(e, t) {
      let n = this.diffWholeYears(e, t);
      return null !== n
        ? { unit: "year", value: n }
        : null !== (n = this.diffWholeMonths(e, t))
        ? { unit: "month", value: n }
        : null !== (n = It(e, t))
        ? { unit: "week", value: n }
        : null !== (n = Ot(e, t))
        ? { unit: "day", value: n }
        : ((r = e),
          rt((n = (t.valueOf() - r.valueOf()) / 36e5))
            ? { unit: "hour", value: n }
            : ((r = e),
              rt((n = (t.valueOf() - r.valueOf()) / 6e4))
                ? { unit: "minute", value: n }
                : ((r = e),
                  rt((n = (t.valueOf() - r.valueOf()) / 1e3))
                    ? { unit: "second", value: n }
                    : {
                        unit: "millisecond",
                        value: t.valueOf() - e.valueOf(),
                      })));
      var r;
    }
    countDurationsBetween(e, t, n) {
      let r;
      return n.years && null !== (r = this.diffWholeYears(e, t))
        ? r / (ct(n) / 365)
        : n.months && null !== (r = this.diffWholeMonths(e, t))
        ? r / (ct(n) / 30)
        : n.days && null !== (r = Ot(e, t))
        ? r / ct(n)
        : (t.valueOf() - e.valueOf()) / dt(n);
    }
    startOf(e, t) {
      return "year" === t
        ? this.startOfYear(e)
        : "month" === t
        ? this.startOfMonth(e)
        : "week" === t
        ? this.startOfWeek(e)
        : "day" === t
        ? v(e)
        : "hour" === t
        ? jt([
            (n = e).getUTCFullYear(),
            n.getUTCMonth(),
            n.getUTCDate(),
            n.getUTCHours(),
          ])
        : "minute" === t
        ? jt([
            (n = e).getUTCFullYear(),
            n.getUTCMonth(),
            n.getUTCDate(),
            n.getUTCHours(),
            n.getUTCMinutes(),
          ])
        : "second" === t
        ? jt([
            (t = e).getUTCFullYear(),
            t.getUTCMonth(),
            t.getUTCDate(),
            t.getUTCHours(),
            t.getUTCMinutes(),
            t.getUTCSeconds(),
          ])
        : null;
      var n;
    }
    startOfYear(e) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(e),
      ]);
    }
    startOfMonth(e) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(e),
        this.calendarSystem.getMarkerMonth(e),
      ]);
    }
    startOfWeek(e) {
      return this.calendarSystem.arrayToMarker([
        this.calendarSystem.getMarkerYear(e),
        this.calendarSystem.getMarkerMonth(e),
        e.getUTCDate() - ((e.getUTCDay() - this.weekDow + 7) % 7),
      ]);
    }
    computeWeekNumber(e) {
      return this.weekNumberFunc
        ? this.weekNumberFunc(this.toDate(e))
        : ((e = e),
          (t = this.weekDow),
          (n = this.weekDoy),
          (r = e.getUTCFullYear()),
          (i = Nt(e, r, t, n)) < 1
            ? Nt(e, r - 1, t, n)
            : 1 <= (e = Nt(e, r + 1, t, n))
            ? Math.min(i, e)
            : i);
      var t, n, r, i;
    }
    format(e, t, n = {}) {
      return t.format(
        {
          marker: e,
          timeZoneOffset:
            null != n.forcedTzo ? n.forcedTzo : this.offsetForMarker(e),
        },
        this
      );
    }
    formatRange(e, t, n, r = {}) {
      return (
        r.isEndExclusive && (t = Tt(t, -1)),
        n.formatRange(
          {
            marker: e,
            timeZoneOffset:
              null != r.forcedStartTzo
                ? r.forcedStartTzo
                : this.offsetForMarker(e),
          },
          {
            marker: t,
            timeZoneOffset:
              null != r.forcedEndTzo ? r.forcedEndTzo : this.offsetForMarker(t),
          },
          this,
          r.defaultSeparator
        )
      );
    }
    formatIso(e, t = {}) {
      let n = null;
      return Wt(
        e,
        (n = t.omitTimeZoneOffset
          ? n
          : null != t.forcedTzo
          ? t.forcedTzo
          : this.offsetForMarker(e)),
        t.omitTime
      );
    }
    timestampToMarker(e) {
      return "local" === this.timeZone
        ? jt(Pt(new Date(e)))
        : "UTC" !== this.timeZone && this.namedTimeZoneImpl
        ? jt(this.namedTimeZoneImpl.timestampToArray(e))
        : new Date(e);
    }
    offsetForMarker(e) {
      return "local" === this.timeZone
        ? -Ht(Bt(e)).getTimezoneOffset()
        : "UTC" === this.timeZone
        ? 0
        : this.namedTimeZoneImpl
        ? this.namedTimeZoneImpl.offsetForArray(Bt(e))
        : null;
    }
    toDate(e, t) {
      return "local" === this.timeZone
        ? Ht(Bt(e))
        : "UTC" === this.timeZone
        ? new Date(e.valueOf())
        : this.namedTimeZoneImpl
        ? new Date(
            e.valueOf() -
              1e3 * this.namedTimeZoneImpl.offsetForArray(Bt(e)) * 60
          )
        : new Date(e.valueOf() - (t || 0));
    }
  }
  class gi {
    constructor() {
      (this.strictOrder = !1),
        (this.allowReslicing = !1),
        (this.maxCoord = -1),
        (this.maxStackCnt = -1),
        (this.levelCoords = []),
        (this.entriesByLevel = []),
        (this.stackCnts = {});
    }
    addSegs(e) {
      var t,
        n = [];
      for (t of e) this.insertEntry(t, n);
      return n;
    }
    insertEntry(e, t) {
      var n = this.findInsertion(e);
      return this.isInsertionValid(n, e)
        ? (this.insertEntryAt(e, n), 1)
        : this.handleInvalidInsertion(n, e, t);
    }
    isInsertionValid(e, t) {
      return (
        (-1 === this.maxCoord || e.levelCoord + t.thickness <= this.maxCoord) &&
        (-1 === this.maxStackCnt || e.stackCnt < this.maxStackCnt)
      );
    }
    handleInvalidInsertion(e, t, n) {
      return this.allowReslicing && e.touchingEntry
        ? this.splitEntry(t, e.touchingEntry, n)
        : (n.push(t), 0);
    }
    splitEntry(e, t, n) {
      let r = 0;
      var i = [],
        s = e.span,
        t = t.span;
      return (
        s.start < t.start &&
          (r += this.insertEntry(
            {
              index: e.index,
              thickness: e.thickness,
              span: { start: s.start, end: t.start },
            },
            i
          )),
        s.end > t.end &&
          (r += this.insertEntry(
            {
              index: e.index,
              thickness: e.thickness,
              span: { start: t.end, end: s.end },
            },
            i
          )),
        r
          ? (n.push(
              { index: e.index, thickness: e.thickness, span: yi(t, s) },
              ...i
            ),
            r)
          : (n.push(e), 0)
      );
    }
    insertEntryAt(e, t) {
      var { entriesByLevel: n, levelCoords: r } = this;
      -1 === t.lateral
        ? (bi(r, t.level, t.levelCoord), bi(n, t.level, [e]))
        : bi(n[t.level], t.lateral, e),
        (this.stackCnts[vi(e)] = t.stackCnt);
    }
    findInsertion(n) {
      var {
          levelCoords: r,
          entriesByLevel: d,
          strictOrder: u,
          stackCnts: h,
        } = this,
        e = r.length;
      let i = 0,
        s = -1,
        f = -1,
        o = null,
        a = 0;
      for (let t = 0; t < e; t += 1) {
        var g = r[t];
        if (!u && g >= i + n.thickness) break;
        var l,
          p = d[t],
          v = Ei(p, n.span.start, pi);
        let e = v[0] + v[1];
        for (; (l = p[e]) && l.span.start < n.span.end; ) {
          var c = g + l.thickness;
          c > i && ((i = c), (o = l), (s = t), (f = e)),
            c === i && (a = Math.max(a, h[vi(l)] + 1)),
            (e += 1);
        }
      }
      let t = 0;
      if (o) for (t = s + 1; t < e && r[t] < i; ) t += 1;
      let m = -1;
      return (
        t < e && r[t] === i && (m = Ei(d[t], n.span.end, pi)[0]),
        {
          touchingLevel: s,
          touchingLateral: f,
          touchingEntry: o,
          stackCnt: a,
          levelCoord: i,
          level: t,
          lateral: m,
        }
      );
    }
    toRects() {
      var { entriesByLevel: t, levelCoords: n } = this,
        r = t.length;
      let i = [];
      for (let e = 0; e < r; e += 1) {
        var s,
          o = t[e],
          a = n[e];
        for (s of o)
          i.push(Object.assign(Object.assign({}, s), { levelCoord: a }));
      }
      return i;
    }
  }
  function pi(e) {
    return e.span.end;
  }
  function vi(e) {
    return e.index + ":" + e.span.start;
  }
  function mi(e) {
    let n = [];
    for (var r of e) {
      let e = [],
        t = { span: r.span, entries: [r] };
      for (var i of n)
        yi(i.span, t.span)
          ? (t = {
              entries: i.entries.concat(t.entries),
              span:
                ((s = i.span),
                (o = t.span),
                {
                  start: Math.min(s.start, o.start),
                  end: Math.max(s.end, o.end),
                }),
            })
          : e.push(i);
      e.push(t), (n = e);
    }
    var s, o;
    return n;
  }
  function yi(e, t) {
    var n = Math.max(e.start, t.start),
      e = Math.min(e.end, t.end);
    return n < e ? { start: n, end: e } : null;
  }
  function bi(e, t, n) {
    e.splice(t, 0, n);
  }
  function Ei(e, t, n) {
    let r = 0,
      i = e.length;
    if (!i || t < n(e[r])) return [0, 0];
    if (t > n(e[i - 1])) return [i, 0];
    for (; r < i; ) {
      var s = Math.floor(r + (i - r) / 2),
        o = n(e[s]);
      if (t < o) i = s;
      else {
        if (!(o < t)) return [s, 1];
        r = s + 1;
      }
    }
    return [r, 0];
  }
  class Si {
    constructor(e) {
      (this.component = e.component),
        (this.isHitComboAllowed = e.isHitComboAllowed || null);
    }
    destroy() {}
  }
  function Ai(e) {
    return { [e.component.uid]: e };
  }
  const Di = {};
  class wi {
    constructor(e, t) {
      this.emitter = new Ar();
    }
    destroy() {}
    setMirrorIsVisible(e) {}
    setMirrorNeedsRevert(e) {}
    setAutoScrollEnabled(e) {}
  }
  const Ci = {},
    Ri = { startTime: p, duration: p, create: Boolean, sourceId: String };
  function xi(e) {
    var { refined: e, extra: t } = vn(e, Ri);
    return {
      startTime: e.startTime || null,
      duration: e.duration || null,
      create: null == e.create || e.create,
      sourceId: e.sourceId,
      leftoverProps: t,
    };
  }
  class Ti extends n {
    constructor() {
      super(...arguments),
        (this.state = { forPrint: !1 }),
        (this.handleBeforePrint = () => {
          this.setState({ forPrint: !0 });
        }),
        (this.handleAfterPrint = () => {
          this.setState({ forPrint: !1 });
        });
    }
    render() {
      let e = this["props"];
      var t = e["options"],
        n = this.state["forPrint"],
        r = n || "auto" === t.height || "auto" === t.contentHeight,
        i = r || null == t.height ? "" : t.height;
      let s = [
        "fc",
        n ? "fc-media-print" : "fc-media-screen",
        "fc-direction-" + t.direction,
        e.theme.getClass("root"),
      ];
      return Xn() || s.push("fc-liquid-hack"), e.children(s, i, r, n);
    }
    componentDidMount() {
      let e = this.props["emitter"];
      e.on("_beforeprint", this.handleBeforePrint),
        e.on("_afterprint", this.handleAfterPrint);
    }
    componentWillUnmount() {
      let e = this.props["emitter"];
      e.off("_beforeprint", this.handleBeforePrint),
        e.off("_afterprint", this.handleAfterPrint);
    }
  }
  function _i(e, t) {
    return o(
      !e || 10 < t
        ? { weekday: "short" }
        : 1 < t
        ? { weekday: "short", month: "numeric", day: "numeric", omitCommas: !0 }
        : { weekday: "long" }
    );
  }
  const ki = "fc-col-header-cell";
  function Mi(e) {
    return e.text;
  }
  class Ii extends n {
    constructor() {
      super(...arguments),
        (this.id = Ve()),
        (this.queuedDomNodes = []),
        (this.currentDomNodes = []),
        (this.handleEl = (e) => {
          this.props.elRef && Hr(this.props.elRef, e);
        });
    }
    render() {
      var e,
        t,
        { props: n, context: r } = this,
        r = r["options"];
      const { customGenerator: i, defaultGenerator: s, renderProps: o } = n,
        a = Ni(n);
      let l = !1,
        c,
        d = [],
        u;
      return (
        null != i
          ? !0 === (e = "function" == typeof i ? i(o, E) : i)
            ? (l = !0)
            : (t = e && "object" == typeof e) && "html" in e
            ? (a.dangerouslySetInnerHTML = { __html: e.html })
            : t && "domNodes" in e
            ? (d = Array.prototype.slice.call(e.domNodes))
            : t || "function" == typeof e
            ? (u = e)
            : (c = e)
          : (l = !Oi(n.generatorName, r)),
        l && s && (c = s(o)),
        (this.queuedDomNodes = d),
        (this.currentGeneratorMeta = u),
        E(n.elTag, a, c)
      );
    }
    componentDidMount() {
      this.applyQueueudDomNodes(), this.triggerCustomRendering(!0);
    }
    componentDidUpdate() {
      this.applyQueueudDomNodes(), this.triggerCustomRendering(!0);
    }
    componentWillUnmount() {
      this.triggerCustomRendering(!1);
    }
    triggerCustomRendering(e) {
      var t;
      const { props: n, context: r } = this,
        { handleCustomRendering: i, customRenderingMetaMap: s } = r.options;
      !i ||
        ((t =
          null !== (t = this.currentGeneratorMeta) && void 0 !== t
            ? t
            : null == s
            ? void 0
            : s[n.generatorName]) &&
          i(
            Object.assign(
              Object.assign(
                {
                  id: this.id,
                  isActive: e,
                  containerEl: this.base,
                  reportNewContainerEl: this.handleEl,
                  generatorMeta: t,
                },
                n
              ),
              { elClasses: (n.elClasses || []).filter(Pi) }
            )
          ));
    }
    applyQueueudDomNodes() {
      const { queuedDomNodes: e, currentDomNodes: t } = this,
        n = this.base;
      if (!wt(e, t)) {
        t.forEach(xe);
        for (var r of e) n.appendChild(r);
        this.currentDomNodes = e;
      }
    }
  }
  function Oi(e, t) {
    return Boolean(
      t.handleCustomRendering &&
        e &&
        (null === (t = t.customRenderingMetaMap) || void 0 === t
          ? void 0
          : t[e])
    );
  }
  function Ni(e, t) {
    const n = Object.assign(Object.assign({}, e.elAttrs), { ref: e.elRef });
    return (
      (e.elClasses || t) &&
        (n.className = (e.elClasses || [])
          .concat(t || [])
          .concat(n.className || [])
          .filter(Boolean)
          .join(" ")),
      e.elStyle && (n.style = e.elStyle),
      n
    );
  }
  function Pi(e) {
    return Boolean(e);
  }
  Ii.addPropsEquality({
    elClasses: wt,
    elStyle: bt,
    elAttrs: function (e, t) {
      var n;
      for (n of St(e, t)) if (!Et.test(n)) return !1;
      return !0;
    },
    renderProps: bt,
  });
  const Hi = Mr(0);
  class Bi extends O {
    constructor() {
      super(...arguments),
        (this.InnerContent = function (e, t) {
          var n = e.props;
          return E(
            Ii,
            Object.assign(
              {
                renderProps: n.renderProps,
                generatorName: n.generatorName,
                customGenerator: n.customGenerator,
                defaultGenerator: n.defaultGenerator,
                renderId: e.context,
              },
              t
            )
          );
        }.bind(void 0, this)),
        (this.handleRootEl = (e) => {
          (this.rootEl = e), this.props.elRef && Hr(this.props.elRef, e);
        });
    }
    render() {
      const e = this["props"];
      var t,
        n,
        r = (function (e, t) {
          t = "function" == typeof e ? e(t) : e || [];
          return "string" == typeof t ? [t] : t;
        })(e.classNameGenerator, e.renderProps);
      return e.children
        ? ((t = Ni(e, r)),
          (n = e.children(this.InnerContent, e.renderProps, t)),
          e.elTag ? E(e.elTag, t, n) : n)
        : E(
            Ii,
            Object.assign(Object.assign({}, e), {
              elRef: this.handleRootEl,
              elTag: e.elTag || "div",
              elClasses: (e.elClasses || []).concat(r),
              renderId: this.context,
            })
          );
    }
    componentDidMount() {
      var e, t;
      null !== (t = (e = this.props).didMount) &&
        void 0 !== t &&
        t.call(
          e,
          Object.assign(Object.assign({}, this.props.renderProps), {
            el: this.rootEl || this.base,
          })
        );
    }
    componentWillUnmount() {
      var e, t;
      null !== (t = (e = this.props).willUnmount) &&
        void 0 !== t &&
        t.call(
          e,
          Object.assign(Object.assign({}, this.props.renderProps), {
            el: this.rootEl || this.base,
          })
        );
    }
  }
  Bi.contextType = Hi;
  class ji extends n {
    render() {
      let { dateEnv: e, options: t, theme: n, viewApi: r } = this.context,
        i = this["props"];
      var { date: s, dateProfile: o } = i;
      let a = ar(s, i.todayRange, null, o);
      var o = [ki].concat(lr(a, n)),
        l = e.format(s, i.dayHeaderFormat);
      let c = !a.isDisabled && 1 < i.colCnt ? ur(this.context, s) : {};
      l = Object.assign(
        Object.assign(
          Object.assign({ date: e.toDate(s), view: r }, i.extraRenderProps),
          { text: l }
        ),
        a
      );
      return E(
        Bi,
        {
          elTag: "th",
          elClasses: o,
          elAttrs: Object.assign(
            {
              role: "columnheader",
              colSpan: i.colSpan,
              "data-date": a.isDisabled ? void 0 : Lt(s),
            },
            i.extraDataAttrs
          ),
          renderProps: l,
          generatorName: "dayHeaderContent",
          customGenerator: t.dayHeaderContent,
          defaultGenerator: Mi,
          classNameGenerator: t.dayHeaderClassNames,
          didMount: t.dayHeaderDidMount,
          willUnmount: t.dayHeaderWillUnmount,
        },
        (e) =>
          E(
            "div",
            { className: "fc-scrollgrid-sync-inner" },
            !a.isDisabled &&
              E(e, {
                elTag: "a",
                elAttrs: c,
                elClasses: [
                  "fc-col-header-cell-cushion",
                  i.isSticky && "fc-sticky",
                ],
              })
          )
      );
    }
  }
  const zi = o({ weekday: "long" });
  class Ui extends n {
    render() {
      let t = this["props"],
        { dateEnv: n, theme: e, viewApi: r, options: i } = this.context,
        s = xt(new Date(2592e5), t.dow);
      var o = {
          dow: t.dow,
          isDisabled: !1,
          isFuture: !1,
          isPast: !1,
          isToday: !1,
          isOther: !1,
        },
        a = n.format(s, t.dayHeaderFormat),
        a = Object.assign(
          Object.assign(
            Object.assign(Object.assign({ date: s }, o), { view: r }),
            t.extraRenderProps
          ),
          { text: a }
        );
      return E(
        Bi,
        {
          elTag: "th",
          elClasses: [ki, ...lr(o, e), ...(t.extraClassNames || [])],
          elAttrs: Object.assign(
            { role: "columnheader", colSpan: t.colSpan },
            t.extraDataAttrs
          ),
          renderProps: a,
          generatorName: "dayHeaderContent",
          customGenerator: i.dayHeaderContent,
          defaultGenerator: Mi,
          classNameGenerator: i.dayHeaderClassNames,
          didMount: i.dayHeaderDidMount,
          willUnmount: i.dayHeaderWillUnmount,
        },
        (e) =>
          E(
            "div",
            { className: "fc-scrollgrid-sync-inner" },
            E(e, {
              elTag: "a",
              elClasses: [
                "fc-col-header-cell-cushion",
                t.isSticky && "fc-sticky",
              ],
              elAttrs: { "aria-label": n.format(s, zi) },
            })
          )
      );
    }
  }
  class Wi extends O {
    constructor(e, t) {
      super(e, t),
        (this.initialNowDate = jr(t.options.now, t.dateEnv)),
        (this.initialNowQueriedMs = new Date().valueOf()),
        (this.state = this.computeTiming().currentState);
    }
    render() {
      let { props: e, state: t } = this;
      return e.children(t.nowDate, t.todayRange);
    }
    componentDidMount() {
      this.setTimeout();
    }
    componentDidUpdate(e) {
      e.unit !== this.props.unit && (this.clearTimeout(), this.setTimeout());
    }
    componentWillUnmount() {
      this.clearTimeout();
    }
    computeTiming() {
      let { props: e, context: t } = this,
        n = Tt(
          this.initialNowDate,
          new Date().valueOf() - this.initialNowQueriedMs
        );
      var r = t.dateEnv.startOf(n, e.unit);
      let i = t.dateEnv.add(r, p(1, e.unit));
      var s = i.valueOf() - n.valueOf(),
        s = Math.min(864e5, s);
      return {
        currentState: { nowDate: r, todayRange: Li(r) },
        nextState: { nowDate: i, todayRange: Li(i) },
        waitMs: s,
      };
    }
    setTimeout() {
      let { nextState: e, waitMs: t } = this.computeTiming();
      this.timeoutId = setTimeout(() => {
        this.setState(e, () => {
          this.setTimeout();
        });
      }, t);
    }
    clearTimeout() {
      this.timeoutId && clearTimeout(this.timeoutId);
    }
  }
  function Li(e) {
    e = v(e);
    return { start: e, end: xt(e, 1) };
  }
  Wi.contextType = Or;
  class Fi extends n {
    constructor() {
      super(...arguments), (this.createDayHeaderFormatter = g(Vi));
    }
    render() {
      var e = this["context"];
      let {
          dates: n,
          dateProfile: r,
          datesRepDistinctDays: i,
          renderIntro: s,
        } = this.props,
        o = this.createDayHeaderFormatter(
          e.options.dayHeaderFormat,
          i,
          n.length
        );
      return E(Wi, { unit: "day" }, (e, t) =>
        E(
          "tr",
          { role: "row" },
          s && s("day"),
          n.map((e) =>
            i
              ? E(ji, {
                  key: e.toISOString(),
                  date: e,
                  dateProfile: r,
                  todayRange: t,
                  colCnt: n.length,
                  dayHeaderFormat: o,
                })
              : E(Ui, {
                  key: e.getUTCDay(),
                  dow: e.getUTCDay(),
                  dayHeaderFormat: o,
                })
          )
        )
      );
    }
  }
  function Vi(e, t, n) {
    return e || _i(t, n);
  }
  class Gi {
    constructor(e, t) {
      let n = e.start;
      var r = e["end"];
      let i = [],
        s = [],
        o = -1;
      for (; n < r; )
        t.isHiddenDay(n) ? i.push(o + 0.5) : ((o += 1), i.push(o), s.push(n)),
          (n = xt(n, 1));
      (this.dates = s), (this.indices = i), (this.cnt = s.length);
    }
    sliceRange(e) {
      var t = this.getDateDayIndex(e.start),
        e = this.getDateDayIndex(xt(e.end, -1)),
        n = Math.max(0, t),
        r = Math.min(this.cnt - 1, e);
      return (n = Math.ceil(n)) <= (r = Math.floor(r))
        ? { firstIndex: n, lastIndex: r, isStart: t === n, isEnd: e === r }
        : null;
    }
    getDateDayIndex(e) {
      var t = this["indices"],
        e = Math.floor(kt(this.dates[0], e));
      return e < 0 ? t[0] - 1 : e >= t.length ? t[t.length - 1] + 1 : t[e];
    }
  }
  class Qi {
    constructor(e, t) {
      let n = e["dates"],
        r;
      var i;
      let s;
      if (t) {
        for (
          i = n[0].getUTCDay(), r = 1;
          r < n.length && n[r].getUTCDay() !== i;
          r += 1
        );
        s = Math.ceil(n.length / r);
      } else (s = 1), (r = n.length);
      (this.rowCnt = s),
        (this.colCnt = r),
        (this.daySeries = e),
        (this.cells = this.buildCells()),
        (this.headerDates = this.buildHeaderDates());
    }
    buildCells() {
      let e = [];
      for (let n = 0; n < this.rowCnt; n += 1) {
        let t = [];
        for (let e = 0; e < this.colCnt; e += 1) t.push(this.buildCell(n, e));
        e.push(t);
      }
      return e;
    }
    buildCell(e, t) {
      let n = this.daySeries.dates[e * this.colCnt + t];
      return { key: n.toISOString(), date: n };
    }
    buildHeaderDates() {
      let t = [];
      for (let e = 0; e < this.colCnt; e += 1) t.push(this.cells[0][e].date);
      return t;
    }
    sliceRange(e) {
      var t = this["colCnt"],
        n = this.daySeries.sliceRange(e);
      let r = [];
      if (n) {
        var { firstIndex: i, lastIndex: s } = n;
        let e = i;
        for (; e <= s; ) {
          var o = Math.floor(e / t),
            a = Math.min((o + 1) * t, s + 1);
          r.push({
            row: o,
            firstCol: e % t,
            lastCol: (a - 1) % t,
            isStart: n.isStart && e === i,
            isEnd: n.isEnd && a - 1 === s,
          }),
            (e = a);
        }
      }
      return r;
    }
  }
  class qi {
    constructor() {
      (this.sliceBusinessHours = g(this._sliceBusinessHours)),
        (this.sliceDateSelection = g(this._sliceDateSpan)),
        (this.sliceEventStore = g(this._sliceEventStore)),
        (this.sliceEventDrag = g(this._sliceInteraction)),
        (this.sliceEventResize = g(this._sliceInteraction)),
        (this.forceDayIfListItem = !1);
    }
    sliceProps(e, t, n, r, ...i) {
      var s = e["eventUiBases"],
        o = this.sliceEventStore(e.eventStore, s, t, n, ...i);
      return {
        dateSelectionSegs: this.sliceDateSelection(
          e.dateSelection,
          t,
          n,
          s,
          r,
          ...i
        ),
        businessHourSegs: this.sliceBusinessHours(
          e.businessHours,
          t,
          n,
          r,
          ...i
        ),
        fgEventSegs: o.fg,
        bgEventSegs: o.bg,
        eventDrag: this.sliceEventDrag(e.eventDrag, s, t, n, ...i),
        eventResize: this.sliceEventResize(e.eventResize, s, t, n, ...i),
        eventSelection: e.eventSelection,
      };
    }
    sliceNowDate(e, t, n, r, ...i) {
      return this._sliceDateSpan(
        { range: { start: e, end: Tt(e, 1) }, allDay: !1 },
        t,
        n,
        {},
        r,
        ...i
      );
    }
    _sliceBusinessHours(e, t, n, r, ...i) {
      return e
        ? this._sliceEventStore(yn(e, Yi(t, Boolean(n)), r), {}, t, n, ...i).bg
        : [];
    }
    _sliceEventStore(e, t, n, r, ...i) {
      return e
        ? ((e = qr(e, t, Yi(n, Boolean(r)), r)),
          {
            bg: this.sliceEventRanges(e.bg, i),
            fg: this.sliceEventRanges(e.fg, i),
          })
        : { bg: [], fg: [] };
    }
    _sliceInteraction(e, t, n, r, ...i) {
      if (!e) return null;
      t = qr(e.mutatedEvents, t, Yi(n, Boolean(r)), r);
      return {
        segs: this.sliceEventRanges(t.fg, i),
        affectedInstances: e.affectedEvents.instances,
        isEvent: e.isEvent,
      };
    }
    _sliceDateSpan(e, t, n, r, i, ...s) {
      if (!e) return [];
      var t = Yi(t, Boolean(n)),
        n = nr(e.range, t);
      if (n) {
        e = Object.assign(Object.assign({}, e), { range: n });
        (t = e), (n = r);
        var o,
          a = {
            def: (i = Bn(
              (i = Pn({ editable: !1 }, (r = i))).refined,
              i.extra,
              "",
              t.allDay,
              !0,
              r
            )),
            ui: $r(i, n),
            instance: mn(i.defId, t.range),
            range: t.range,
            isStart: !0,
            isEnd: !0,
          },
          r = this.sliceRange(e.range, ...s);
        for (o of r) o.eventRange = a;
        return r;
      }
      return [];
    }
    sliceEventRanges(e, t) {
      let n = [];
      for (var r of e) n.push(...this.sliceEventRange(r, t));
      return n;
    }
    sliceEventRange(e, t) {
      let n = e.range;
      this.forceDayIfListItem &&
        "list-item" === e.ui.display &&
        (n = { start: n.start, end: xt(n.start, 1) });
      var r,
        t = this.sliceRange(n, ...t);
      for (r of t)
        (r.eventRange = e),
          (r.isStart = e.isStart && r.isStart),
          (r.isEnd = e.isEnd && r.isEnd);
      return t;
    }
  }
  function Yi(e, t) {
    var n = e.activeRange;
    return t
      ? n
      : {
          start: Tt(n.start, e.slotMinTime.milliseconds),
          end: Tt(n.end, e.slotMaxTime.milliseconds - 864e5),
        };
  }
  function Zi(n, r, d, e, t) {
    switch (r.type) {
      case "RECEIVE_EVENTS":
        var u = n,
          i = d[r.sourceId],
          h = r.fetchId,
          s = r.fetchRange,
          f = r.rawEvents,
          o = t;
        if (i && h === i.latestFetchId) {
          let e = bn(Xi(f, i, o), i, o);
          return s && (e = yn(e, s, o)), Dn(Ki(u, i.sourceId), e);
        }
        return u;
      case "RESET_RAW_EVENTS":
        var h = n,
          f = d[r.sourceId],
          s = r.rawEvents,
          o = e.activeRange,
          i = t,
          { defIdMap: h, instanceIdMap: u } = (function (e) {
            const { defs: t, instances: n } = e,
              r = {},
              i = {};
            for (var s in t) {
              var o = t[s]["publicId"];
              o && (r[o] = s);
            }
            for (var a in n) {
              var l = n[a],
                l = t[l.defId]["publicId"];
              l && (i[l] = a);
            }
            return { defIdMap: r, instanceIdMap: i };
          })(h);
        return yn((s = bn(Xi(s, f, i), f, i, !1, h, u)), o, i);
      case "ADD_EVENTS":
        var g = n,
          p = r.eventStore,
          a = e ? e.activeRange : null,
          v = t;
        return a && (p = yn(p, a, v)), Dn(g, p);
      case "RESET_EVENTS":
        return r.eventStore;
      case "MERGE_EVENTS":
        return Dn(n, r.eventStore);
      case "PREV":
      case "NEXT":
      case "CHANGE_DATE":
      case "CHANGE_VIEW_TYPE":
        return e ? yn(n, e.activeRange, t) : n;
      case "REMOVE_EVENTS": {
        a = n;
        var m = r.eventStore;
        var l,
          c,
          { defs: y, instances: b } = a;
        let e = {},
          t = {};
        for (l in y) m.defs[l] || (e[l] = y[l]);
        for (c in b) !m.instances[c] && e[b[c].defId] && (t[c] = b[c]);
        return { defs: e, instances: t };
        return;
      }
      case "REMOVE_EVENT_SOURCE":
        return Ki(n, r.sourceId);
      case "REMOVE_ALL_EVENT_SOURCES":
        return wn(n, (e) => !e.sourceId);
      case "REMOVE_ALL_EVENTS":
        return An();
      default:
        return n;
    }
  }
  function Xi(e, t, n) {
    (n = n.options.eventDataTransform), (t = t ? t.eventDataTransform : null);
    return t && (e = Ji(e, t)), (e = n ? Ji(e, n) : e);
  }
  function Ji(e, t) {
    let n;
    if (t) {
      n = [];
      for (var r of e) {
        var i = t(r);
        i ? n.push(i) : null == i && n.push(r);
      }
    } else n = e;
    return n;
  }
  function $i(e, t, n) {
    let r = e["defs"];
    e = vt(e.instances, (e) => {
      return r[e.defId].allDay
        ? e
        : Object.assign(Object.assign({}, e), {
            range: {
              start: n.createMarker(t.toDate(e.range.start, e.forcedStartTzo)),
              end: n.createMarker(t.toDate(e.range.end, e.forcedEndTzo)),
            },
            forcedStartTzo: n.canComputeOffset ? null : e.forcedStartTzo,
            forcedEndTzo: n.canComputeOffset ? null : e.forcedEndTzo,
          });
    });
    return { defs: r, instances: e };
  }
  function Ki(e, t) {
    return wn(e, (e) => e.sourceId !== t);
  }
  function es(e, t, n) {
    var r,
      i = e.mutatedEvents["instances"];
    for (r in i) if (!sr(t.validRange, i[r].range)) return !1;
    return ns({ eventDrag: e }, n);
  }
  function ts(e, t, n) {
    return !!sr(t.validRange, e.range) && ns({ dateSelection: e }, n);
  }
  function ns(e, t) {
    var n = t.getCurrentData(),
      n = Object.assign(
        {
          businessHours: n.businessHours,
          dateSelection: "",
          eventStore: n.eventStore,
          eventUiBases: n.eventUiBases,
          eventSelection: "",
          eventDrag: null,
          eventResize: null,
        },
        e
      );
    return (t.pluginHooks.isPropsValid || rs)(n, t);
  }
  function rs(e, t, n = {}, r) {
    return (
      !(
        e.eventDrag &&
        !(function (t, n, d, e) {
          let u = n.getCurrentData(),
            r = t.eventDrag,
            h = r.mutatedEvents,
            f = h.defs,
            g = h.instances,
            i = Jr(f, r.isEvent ? t.eventUiBases : { "": u.selectionConfig });
          e && (i = vt(i, e));
          var s = (function (e, t) {
              return {
                defs: e.defs,
                instances: pt(e.instances, (e) => !t[e.instanceId]),
              };
            })(t.eventStore, r.affectedEvents.instances),
            p = s.defs,
            v = s.instances,
            m = Jr(p, t.eventUiBases);
          for (var y in g) {
            var o = g[y],
              b = o.range,
              a = i[o.defId],
              l = f[o.defId];
            if (!is(a.constraints, b, s, t.businessHours, n)) return !1;
            var E,
              S = n.options["eventOverlap"];
            let e = "function" == typeof S ? S : null;
            for (E in v) {
              var c = v[E];
              if (ir(b, c.range)) {
                if (!1 === m[c.defId].overlap && r.isEvent) return !1;
                if (!1 === a.overlap) return !1;
                if (e && !e(new x(n, p[c.defId], c), new x(n, l, o))) return !1;
              }
            }
            var A,
              D = u.eventStore;
            for (A of a.allows) {
              var w = Object.assign(Object.assign({}, d), {
                  range: o.range,
                  allDay: l.allDay,
                }),
                C = D.defs[l.defId],
                R = D.instances[y];
              let e;
              if (((e = C ? new x(n, C, R) : new x(n, l)), !A(Wr(w, n), e)))
                return !1;
            }
          }
          return !0;
        })(e, t, n, r)
      ) &&
      !(
        e.dateSelection &&
        !(function (e, t, d, n) {
          let r = e.eventStore,
            u = r.defs,
            i = r.instances,
            s = e.dateSelection,
            o = s.range,
            a = t.getCurrentData()["selectionConfig"];
          n && (a = n(a));
          if (!is(a.constraints, o, r, e.businessHours, t)) return !1;
          let l = t.options["selectOverlap"],
            h = "function" == typeof l ? l : null;
          for (var c in i) {
            c = i[c];
            if (ir(o, c.range)) {
              if (!1 === a.overlap) return !1;
              if (h && !h(new x(t, u[c.defId], c), null)) return !1;
            }
          }
          for (var f of a.allows) {
            var g = Object.assign(Object.assign({}, d), s);
            if (!f(Wr(g, t), null)) return !1;
          }
          return !0;
        })(e, t, n, r)
      )
    );
  }
  function is(e, t, n, r, i) {
    for (var s of e)
      if (
        !(function (e, t) {
          for (var n of e) if (sr(n, t)) return !0;
          return !1;
        })(
          (function (t, e, n, r, i) {
            if ("businessHours" === t) return ss(yn(r, e, i));
            if ("string" == typeof t) return ss(wn(n, (e) => e.groupId === t));
            if ("object" == typeof t && t) return ss(yn(t, e, i));
            return [];
          })(s, t, n, r, i),
          t
        )
      )
        return;
    return 1;
  }
  function ss(e) {
    var t,
      n = e["instances"];
    let r = [];
    for (t in n) r.push(n[t].range);
    return r;
  }
  class os extends Error {
    constructor(e, t) {
      super(e), (this.response = t);
    }
  }
  function as(e, t, n) {
    const r = { method: (e = e.toUpperCase()) };
    return (
      "GET" === e
        ? (t += (-1 === t.indexOf("?") ? "?" : "&") + new URLSearchParams(n))
        : ((r.body = new URLSearchParams(n)),
          (r.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
          })),
      fetch(t, r).then((t) => {
        if (t.ok)
          return t.json().then(
            (e) => [e, t],
            () => {
              throw new os("Failure parsing JSON", t);
            }
          );
        throw new os("Request failed", t);
      })
    );
  }
  class ls {
    constructor(e) {
      (this.drainedOption = e),
        (this.isRunning = !1),
        (this.isDirty = !1),
        (this.pauseDepths = {}),
        (this.timeoutId = 0);
    }
    request(e) {
      (this.isDirty = !0),
        this.isPaused() ||
          (this.clearTimeout(),
          null == e
            ? this.tryDrain()
            : (this.timeoutId = setTimeout(this.tryDrain.bind(this), e)));
    }
    pause(e = "") {
      let t = this["pauseDepths"];
      (t[e] = (t[e] || 0) + 1), this.clearTimeout();
    }
    resume(e = "", t) {
      let n = this["pauseDepths"];
      e in n &&
        (t ? delete n[e] : (--n[e], n[e] <= 0 && delete n[e]), this.tryDrain());
    }
    isPaused() {
      return Object.keys(this.pauseDepths).length;
    }
    tryDrain() {
      if (!this.isRunning && !this.isPaused()) {
        for (this.isRunning = !0; this.isDirty; )
          (this.isDirty = !1), this.drained();
        this.isRunning = !1;
      }
    }
    clear() {
      this.clearTimeout(), (this.isDirty = !1), (this.pauseDepths = {});
    }
    clearTimeout() {
      this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = 0));
    }
    drained() {
      this.drainedOption && this.drainedOption();
    }
  }
  const cs = /^(visible|hidden)$/;
  class ds extends n {
    constructor() {
      super(...arguments),
        (this.handleEl = (e) => {
          (this.el = e), Hr(this.props.elRef, e);
        });
    }
    render() {
      var e = this["props"],
        { liquid: t, liquidIsAbsolute: n } = e,
        r = t && n;
      let i = ["fc-scroller"];
      return (
        t &&
          (n
            ? i.push("fc-scroller-liquid-absolute")
            : i.push("fc-scroller-liquid")),
        E(
          "div",
          {
            ref: this.handleEl,
            className: i.join(" "),
            style: {
              overflowX: e.overflowX,
              overflowY: e.overflowY,
              left: (r && -(e.overcomeLeft || 0)) || "",
              right: (r && -(e.overcomeRight || 0)) || "",
              bottom: (r && -(e.overcomeBottom || 0)) || "",
              marginLeft: (!r && -(e.overcomeLeft || 0)) || "",
              marginRight: (!r && -(e.overcomeRight || 0)) || "",
              marginBottom: (!r && -(e.overcomeBottom || 0)) || "",
              maxHeight: e.maxHeight || "",
            },
          },
          e.children
        )
      );
    }
    needsXScrolling() {
      if (cs.test(this.props.overflowX)) return !1;
      var e = this["el"],
        n = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(),
        r = e["children"];
      for (let t = 0; t < r.length; t += 1) {
        let e = r[t];
        if (e.getBoundingClientRect().width > n) return !0;
      }
      return !1;
    }
    needsYScrolling() {
      if (cs.test(this.props.overflowY)) return !1;
      var e = this["el"],
        n = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(),
        r = e["children"];
      for (let t = 0; t < r.length; t += 1) {
        let e = r[t];
        if (e.getBoundingClientRect().height > n) return !0;
      }
      return !1;
    }
    getXScrollbarWidth() {
      return cs.test(this.props.overflowX)
        ? 0
        : this.el.offsetHeight - this.el.clientHeight;
    }
    getYScrollbarWidth() {
      return cs.test(this.props.overflowY)
        ? 0
        : this.el.offsetWidth - this.el.clientWidth;
    }
  }
  class us {
    constructor(e) {
      (this.masterCallback = e),
        (this.currentMap = {}),
        (this.depths = {}),
        (this.callbackMap = {}),
        (this.handleValue = (e, t) => {
          let { depths: n, currentMap: r } = this,
            i = !1,
            s = !1;
          null !== e
            ? ((i = t in r), (r[t] = e), (n[t] = (n[t] || 0) + 1), (s = !0))
            : (--n[t],
              n[t] || (delete r[t], delete this.callbackMap[t], (i = !0))),
            this.masterCallback &&
              (i && this.masterCallback(null, String(t)),
              s && this.masterCallback(e, String(t)));
        });
    }
    createRef(t) {
      let e = this.callbackMap[t];
      return (e =
        e ||
        (this.callbackMap[t] = (e) => {
          this.handleValue(e, String(t));
        }));
    }
    collect(e, t, n) {
      return Dt(this.currentMap, e, t, n);
    }
    getAll() {
      return yt(this.currentMap);
    }
  }
  function hs(e) {
    var t;
    let n = 0;
    for (t of ke(e, ".fc-scrollgrid-shrink"))
      n = Math.max(
        n,
        (function (e) {
          let t = e.querySelector(".fc-scrollgrid-shrink-frame"),
            n = e.querySelector(".fc-scrollgrid-shrink-cushion");
          if (!t) throw new Error("needs fc-scrollgrid-shrink-frame className");
          if (!n)
            throw new Error("needs fc-scrollgrid-shrink-cushion className");
          return (
            e.getBoundingClientRect().width -
            t.getBoundingClientRect().width +
            n.getBoundingClientRect().width
          );
        })(t)
      );
    return Math.ceil(n);
  }
  function fs(e, t) {
    return e.liquid && t.liquid;
  }
  function gs(e, t) {
    return null != t.maxHeight || fs(e, t);
  }
  function ps(e, t, n, r) {
    var i = n["expandRows"];
    return "function" == typeof t.content
      ? t.content(n)
      : E(
          "table",
          {
            role: "presentation",
            className: [
              t.tableClassName,
              e.syncRowHeights ? "fc-scrollgrid-sync-table" : "",
            ].join(" "),
            style: {
              minWidth: n.tableMinWidth,
              width: n.clientWidth,
              height: i ? n.clientHeight : "",
            },
          },
          n.tableColGroupNode,
          E(
            r ? "thead" : "tbody",
            { role: "presentation" },
            "function" == typeof t.rowContent ? t.rowContent(n) : t.rowContent
          )
        );
  }
  function vs(e, t) {
    return wt(e, t, bt);
  }
  function ms(e, t) {
    let n = [];
    for (var r of e) {
      var i = r.span || 1;
      for (let e = 0; e < i; e += 1)
        n.push(
          E("col", {
            style: {
              width: "shrink" === r.width ? ys(t) : r.width || "",
              minWidth: r.minWidth || "",
            },
          })
        );
    }
    return E("colgroup", {}, ...n);
  }
  function ys(e) {
    return null == e ? 4 : e;
  }
  function bs(e) {
    for (var t of e) if ("shrink" === t.width) return !0;
    return !1;
  }
  function Es(e, t) {
    let n = ["fc-scrollgrid", t.theme.getClass("table")];
    return e && n.push("fc-scrollgrid-liquid"), n;
  }
  function Ss(e, t) {
    let n = [
      "fc-scrollgrid-section",
      "fc-scrollgrid-section-" + e.type,
      e.className,
    ];
    return (
      t &&
        e.liquid &&
        null == e.maxHeight &&
        n.push("fc-scrollgrid-section-liquid"),
      e.isSticky && n.push("fc-scrollgrid-section-sticky"),
      n
    );
  }
  function As(e) {
    return E("div", {
      className: "fc-scrollgrid-sticky-shim",
      style: { width: e.clientWidth, minWidth: e.tableMinWidth },
    });
  }
  function Ds(e) {
    let t = e["stickyHeaderDates"];
    return (t =
      null != t && "auto" !== t
        ? t
        : "auto" === e.height || "auto" === e.viewHeight);
  }
  function ws(e) {
    let t = e["stickyFooterScrollbar"];
    return (t =
      null != t && "auto" !== t
        ? t
        : "auto" === e.height || "auto" === e.viewHeight);
  }
  class Cs extends n {
    constructor() {
      super(...arguments),
        (this.processCols = g((e) => e, vs)),
        (this.renderMicroColGroup = g(ms)),
        (this.scrollerRefs = new us()),
        (this.scrollerElRefs = new us(this._handleScrollerEl.bind(this))),
        (this.state = {
          shrinkWidth: null,
          forceYScrollbars: !1,
          scrollerClientWidths: {},
          scrollerClientHeights: {},
        }),
        (this.handleSizing = () => {
          this.safeSetState(
            Object.assign(
              { shrinkWidth: this.computeShrinkWidth() },
              this.computeScrollerDims()
            )
          );
        });
    }
    render() {
      var { props: e, state: t, context: d } = this,
        n = e.sections || [],
        r = this.processCols(e.cols),
        i = this.renderMicroColGroup(r, t.shrinkWidth);
      let u = Es(e.liquid, d);
      e.collapsibleWidth && u.push("fc-scrollgrid-collapsible");
      var h = n.length;
      let s = 0,
        o,
        a = [],
        l = [],
        c = [];
      for (; s < h && "header" === (o = n[s]).type; )
        a.push(this.renderSection(o, i, !0)), (s += 1);
      for (; s < h && "body" === (o = n[s]).type; )
        l.push(this.renderSection(o, i, !1)), (s += 1);
      for (; s < h && "footer" === (o = n[s]).type; )
        c.push(this.renderSection(o, i, !0)), (s += 1);
      (r = !Xn()), (t = { role: "rowgroup" });
      return E(
        "table",
        { role: "grid", className: u.join(" "), style: { height: e.height } },
        Boolean(!r && a.length) && E("thead", t, ...a),
        Boolean(!r && l.length) && E("tbody", t, ...l),
        Boolean(!r && c.length) && E("tfoot", t, ...c),
        r && E("tbody", t, ...a, ...l, ...c)
      );
    }
    renderSection(e, t, n) {
      return "outerContent" in e
        ? E(R, { key: e.key }, e.outerContent)
        : E(
            "tr",
            {
              key: e.key,
              role: "presentation",
              className: Ss(e, this.props.liquid).join(" "),
            },
            this.renderChunkTd(e, t, e.chunk, n)
          );
    }
    renderChunkTd(e, t, n, r) {
      if ("outerContent" in n) return n.outerContent;
      var i = this["props"],
        {
          forceYScrollbars: s,
          scrollerClientWidths: o,
          scrollerClientHeights: a,
        } = this.state,
        l = gs(i, e),
        c = fs(i, e),
        s = i.liquid ? (s ? "scroll" : l ? "auto" : "hidden") : "visible",
        l = e.key,
        t = ps(
          e,
          n,
          {
            tableColGroupNode: t,
            tableMinWidth: "",
            clientWidth: i.collapsibleWidth || void 0 === o[l] ? null : o[l],
            clientHeight: void 0 !== a[l] ? a[l] : null,
            expandRows: e.expandRows,
            syncRowHeights: !1,
            rowSyncHeights: [],
            reportRowHeightChange: () => {},
          },
          r
        );
      return E(
        r ? "th" : "td",
        { ref: n.elRef, role: "presentation" },
        E(
          "div",
          {
            className:
              "fc-scroller-harness" + (c ? " fc-scroller-harness-liquid" : ""),
          },
          E(
            ds,
            {
              ref: this.scrollerRefs.createRef(l),
              elRef: this.scrollerElRefs.createRef(l),
              overflowY: s,
              overflowX: i.liquid ? "hidden" : "visible",
              maxHeight: e.maxHeight,
              liquid: c,
              liquidIsAbsolute: !0,
            },
            t
          )
        )
      );
    }
    _handleScrollerEl(e, t) {
      t = (function (e, t) {
        for (var n of e) if (n.key === t) return n;
        return null;
      })(this.props.sections, t);
      t && Hr(t.chunk.scrollerElRef, e);
    }
    componentDidMount() {
      this.handleSizing(), this.context.addResizeHandler(this.handleSizing);
    }
    componentDidUpdate() {
      this.handleSizing();
    }
    componentWillUnmount() {
      this.context.removeResizeHandler(this.handleSizing);
    }
    computeShrinkWidth() {
      return bs(this.props.cols) ? hs(this.scrollerElRefs.getAll()) : 0;
    }
    computeScrollerDims() {
      var t,
        e,
        n = pr(),
        { scrollerRefs: r, scrollerElRefs: i } = this;
      let s = !1,
        o = {},
        a = {};
      for (t in r.currentMap) {
        let e = r.currentMap[t];
        if (e && e.needsYScrolling()) {
          s = !0;
          break;
        }
      }
      for (e of this.props.sections) {
        var l = e.key,
          c = i.currentMap[l];
        if (c) {
          let e = c.parentNode;
          (o[l] = Math.floor(e.getBoundingClientRect().width - (s ? n.y : 0))),
            (a[l] = Math.floor(e.getBoundingClientRect().height));
        }
      }
      return {
        forceYScrollbars: s,
        scrollerClientWidths: o,
        scrollerClientHeights: a,
      };
    }
  }
  Cs.addStateEquality({ scrollerClientWidths: bt, scrollerClientHeights: bt });
  class Rs extends n {
    constructor() {
      super(...arguments),
        (this.handleEl = (e) => {
          (this.el = e) && Zr(e, this.props.seg);
        });
    }
    render() {
      var { props: e, context: t } = this,
        n = t["options"],
        r = e["seg"],
        i = r["eventRange"],
        s = i["ui"],
        s = {
          event: new x(t, i.def, i.instance),
          view: t.viewApi,
          timeText: e.timeText,
          textColor: s.textColor,
          backgroundColor: s.backgroundColor,
          borderColor: s.borderColor,
          isDraggable:
            !e.disableDragging &&
            (function (e, t) {
              var n,
                r = (r = t["pluginHooks"]).isDraggableTransformers,
                { def: i, ui: s } = e.eventRange;
              let o = s.startEditable;
              for (n of r) o = n(o, i, s, t);
              return o;
            })(r, t),
          isStartResizable:
            !e.disableResizing &&
            ((i = t),
            (s = r).isStart &&
              s.eventRange.ui.durationEditable &&
              i.options.eventResizableFromStart),
          isEndResizable:
            !e.disableResizing &&
            (t = r).isEnd &&
            t.eventRange.ui.durationEditable,
          isMirror: Boolean(e.isDragging || e.isResizing || e.isDateSelecting),
          isStart: Boolean(r.isStart),
          isEnd: Boolean(r.isEnd),
          isPast: Boolean(e.isPast),
          isFuture: Boolean(e.isFuture),
          isToday: Boolean(e.isToday),
          isSelected: Boolean(e.isSelected),
          isDragging: Boolean(e.isDragging),
          isResizing: Boolean(e.isResizing),
        };
      return E(
        Bi,
        Object.assign({}, e, {
          elRef: this.handleEl,
          elClasses: [
            ...(function (e) {
              let t = ["fc-event"];
              return (
                e.isMirror && t.push("fc-event-mirror"),
                e.isDraggable && t.push("fc-event-draggable"),
                (e.isStartResizable || e.isEndResizable) &&
                  t.push("fc-event-resizable"),
                e.isDragging && t.push("fc-event-dragging"),
                e.isResizing && t.push("fc-event-resizing"),
                e.isSelected && t.push("fc-event-selected"),
                e.isStart && t.push("fc-event-start"),
                e.isEnd && t.push("fc-event-end"),
                e.isPast && t.push("fc-event-past"),
                e.isToday && t.push("fc-event-today"),
                e.isFuture && t.push("fc-event-future"),
                t
              );
            })(s),
            ...r.eventRange.ui.classNames,
            ...(e.elClasses || []),
          ],
          renderProps: s,
          generatorName: "eventContent",
          customGenerator: n.eventContent,
          defaultGenerator: e.defaultGenerator,
          classNameGenerator: n.eventClassNames,
          didMount: n.eventDidMount,
          willUnmount: n.eventWillUnmount,
        })
      );
    }
    componentDidUpdate(e) {
      this.el && this.props.seg !== e.seg && Zr(this.el, this.props.seg);
    }
  }
  class xs extends n {
    render() {
      var { props: e, context: t } = this,
        n = t["options"],
        r = e["seg"],
        i = r.eventRange["ui"],
        n = ti(
          r,
          n.eventTimeFormat || e.defaultTimeFormat,
          t,
          e.defaultDisplayEventTime,
          e.defaultDisplayEventEnd
        );
      return E(
        Rs,
        Object.assign({}, e, {
          elTag: "a",
          elStyle: {
            borderColor: i.borderColor,
            backgroundColor: i.backgroundColor,
          },
          elAttrs: ii(r, t),
          defaultGenerator: Ts,
          timeText: n,
        }),
        (e, t) =>
          E(
            R,
            null,
            E(e, {
              elTag: "div",
              elClasses: ["fc-event-main"],
              elStyle: { color: t.textColor },
            }),
            Boolean(t.isStartResizable) &&
              E("div", {
                className: "fc-event-resizer fc-event-resizer-start",
              }),
            Boolean(t.isEndResizable) &&
              E("div", { className: "fc-event-resizer fc-event-resizer-end" })
          )
      );
    }
  }
  function Ts(e) {
    return E(
      "div",
      { className: "fc-event-main-frame" },
      e.timeText && E("div", { className: "fc-event-time" }, e.timeText),
      E(
        "div",
        { className: "fc-event-title-container" },
        E(
          "div",
          { className: "fc-event-title fc-sticky" },
          e.event.title || E(R, null, " ")
        )
      )
    );
  }
  const _s = (n) =>
      E(Or.Consumer, null, (e) => {
        var t = e["options"],
          e = {
            isAxis: n.isAxis,
            date: e.dateEnv.toDate(n.date),
            view: e.viewApi,
          };
        return E(
          Bi,
          Object.assign({}, n, {
            elTag: n.elTag || "div",
            renderProps: e,
            generatorName: "nowIndicatorContent",
            customGenerator: t.nowIndicatorContent,
            classNameGenerator: t.nowIndicatorClassNames,
            didMount: t.nowIndicatorDidMount,
            willUnmount: t.nowIndicatorWillUnmount,
          })
        );
      }),
    ks = o({ day: "numeric" });
  class Ms extends n {
    constructor() {
      super(...arguments), (this.refineRenderProps = Qt(Os));
    }
    render() {
      var { props: e, context: t } = this,
        n = t["options"],
        r = this.refineRenderProps({
          date: e.date,
          dateProfile: e.dateProfile,
          todayRange: e.todayRange,
          isMonthStart: e.isMonthStart || !1,
          showDayNumber: e.showDayNumber,
          extraRenderProps: e.extraRenderProps,
          viewApi: t.viewApi,
          dateEnv: t.dateEnv,
          monthStartFormat: n.monthStartFormat,
        });
      return E(
        Bi,
        Object.assign({}, e, {
          elClasses: [...lr(r, t.theme), ...(e.elClasses || [])],
          elAttrs: Object.assign(
            Object.assign({}, e.elAttrs),
            r.isDisabled ? {} : { "data-date": Lt(e.date) }
          ),
          renderProps: r,
          generatorName: "dayCellContent",
          customGenerator: n.dayCellContent,
          defaultGenerator: e.defaultGenerator,
          classNameGenerator: r.isDisabled ? void 0 : n.dayCellClassNames,
          didMount: n.dayCellDidMount,
          willUnmount: n.dayCellWillUnmount,
        })
      );
    }
  }
  function Is(e) {
    return Boolean(e.dayCellContent || Oi("dayCellContent", e));
  }
  function Os(e) {
    let { date: t, dateEnv: n, dateProfile: r, isMonthStart: i } = e;
    var s = ar(t, e.todayRange, null, r),
      o = e.showDayNumber ? n.format(t, i ? e.monthStartFormat : ks) : "";
    return Object.assign(
      Object.assign(Object.assign({ date: n.toDate(t), view: e.viewApi }, s), {
        isMonthStart: i,
        dayNumberText: o,
      }),
      e.extraRenderProps
    );
  }
  class Ns extends n {
    render() {
      var e = this["props"],
        t = e["seg"];
      return E(Rs, {
        elTag: "div",
        elClasses: ["fc-bg-event"],
        elStyle: { backgroundColor: t.eventRange.ui.backgroundColor },
        defaultGenerator: Ps,
        seg: t,
        timeText: "",
        isDragging: !1,
        isResizing: !1,
        isDateSelecting: !1,
        isSelected: !1,
        isPast: e.isPast,
        isFuture: e.isFuture,
        isToday: e.isToday,
        disableDragging: !0,
        disableResizing: !0,
      });
    }
  }
  function Ps(e) {
    var t = e.event["title"];
    return t && E("div", { className: "fc-event-title" }, e.event.title);
  }
  function Hs(e) {
    return E("div", { className: "fc-" + e });
  }
  const Bs = (i) =>
    E(Or.Consumer, null, (e) => {
      let { dateEnv: t, options: n } = e;
      var e = i["date"],
        r = n.weekNumberFormat || i.defaultFormat,
        r = { num: t.computeWeekNumber(e), text: t.format(e, r), date: e };
      return E(
        Bi,
        Object.assign({}, i, {
          renderProps: r,
          generatorName: "weekNumberContent",
          customGenerator: n.weekNumberContent,
          defaultGenerator: js,
          classNameGenerator: n.weekNumberClassNames,
          didMount: n.weekNumberDidMount,
          willUnmount: n.weekNumberWillUnmount,
        })
      );
    });
  function js(e) {
    return e.text;
  }
  class zs extends n {
    constructor() {
      super(...arguments),
        (this.state = { titleId: He() }),
        (this.handleRootEl = (e) => {
          (this.rootEl = e), this.props.elRef && Hr(this.props.elRef, e);
        }),
        (this.handleDocumentMouseDown = (e) => {
          e = Ne(e);
          this.rootEl.contains(e) || this.handleCloseClick();
        }),
        (this.handleDocumentKeyDown = (e) => {
          "Escape" === e.key && this.handleCloseClick();
        }),
        (this.handleCloseClick = () => {
          let e = this.props["onClose"];
          e && e();
        });
    }
    render() {
      let { theme: e, options: t } = this.context;
      var { props: n, state: r } = this;
      let i = ["fc-popover", e.getClass("popover")].concat(
        n.extraClassNames || []
      );
      return de(
        E(
          "div",
          Object.assign({}, n.extraAttrs, {
            id: n.id,
            className: i.join(" "),
            "aria-labelledby": r.titleId,
            ref: this.handleRootEl,
          }),
          E(
            "div",
            { className: "fc-popover-header " + e.getClass("popoverHeader") },
            E(
              "span",
              { className: "fc-popover-title", id: r.titleId },
              n.title
            ),
            E("span", {
              className: "fc-popover-close " + e.getIconClass("close"),
              title: t.closeHint,
              onClick: this.handleCloseClick,
            })
          ),
          E(
            "div",
            { className: "fc-popover-body " + e.getClass("popoverContent") },
            n.children
          )
        ),
        n.parentEl
      );
    }
    componentDidMount() {
      document.addEventListener("mousedown", this.handleDocumentMouseDown),
        document.addEventListener("keydown", this.handleDocumentKeyDown),
        this.updateSize();
    }
    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleDocumentMouseDown),
        document.removeEventListener("keydown", this.handleDocumentKeyDown);
    }
    updateSize() {
      var e = this.context["isRtl"],
        { alignmentEl: t, alignGridTop: n } = this.props;
      let r = this["rootEl"];
      var i,
        s = (function (e) {
          var t,
            n = Er(e);
          let r = e.getBoundingClientRect();
          for (t of n) {
            var i = Gn(r, t.getBoundingClientRect());
            if (!i) return null;
            r = i;
          }
          return r;
        })(t);
      s &&
        ((i = r.getBoundingClientRect()),
        (n = (n ? Te(t, ".fc-scrollgrid").getBoundingClientRect() : s).top),
        (t = e ? s.right - i.width : s.left),
        (n = Math.max(n, 10)),
        (t = Math.min(t, document.documentElement.clientWidth - 10 - i.width)),
        (t = Math.max(t, 10)),
        (e = r.offsetParent.getBoundingClientRect()),
        Ie(r, { top: n - e.top, left: t - e.left }));
    }
  }
  class Us extends Br {
    constructor() {
      super(...arguments),
        (this.handleRootEl = (e) => {
          (this.rootEl = e)
            ? this.context.registerInteractiveComponent(this, {
                el: e,
                useEventCenter: !1,
              })
            : this.context.unregisterInteractiveComponent(this);
        });
    }
    render() {
      let { options: r, dateEnv: e } = this.context,
        i = this["props"];
      var { startDate: t, todayRange: n, dateProfile: s } = i;
      let o = e.format(t, r.dayPopoverFormat);
      return E(
        Ms,
        { elRef: this.handleRootEl, date: t, dateProfile: s, todayRange: n },
        (e, t, n) =>
          E(
            zs,
            {
              elRef: n.ref,
              id: i.id,
              title: o,
              extraClassNames: ["fc-more-popover"].concat(n.className || []),
              extraAttrs: n,
              parentEl: i.parentEl,
              alignmentEl: i.alignmentEl,
              alignGridTop: i.alignGridTop,
              onClose: i.onClose,
            },
            Is(r) &&
              E(e, { elTag: "div", elClasses: ["fc-more-popover-misc"] }),
            i.children
          )
      );
    }
    queryHit(e, t, n, r) {
      var { rootEl: i, props: s } = this;
      return 0 <= e && e < n && 0 <= t && t < r
        ? {
            dateProfile: s.dateProfile,
            dateSpan: Object.assign(
              {
                allDay: !s.forceTimed,
                range: { start: s.startDate, end: s.endDate },
              },
              s.extraDateSpan
            ),
            dayEl: i,
            rect: { left: 0, top: 0, right: n, bottom: r },
            layer: 1,
          }
        : null;
    }
  }
  class Ws extends n {
    constructor() {
      super(...arguments),
        (this.state = { isPopoverOpen: !1, popoverId: He() }),
        (this.handleLinkEl = (e) => {
          (this.linkEl = e), this.props.elRef && Hr(this.props.elRef, e);
        }),
        (this.handleClick = (e) => {
          let { props: t, context: i } = this,
            n = i.options["moreLinkClick"];
          var r = Fs(t).start;
          function s(e) {
            var { def: t, instance: n, range: r } = e.eventRange;
            return {
              event: new x(i, t, n),
              start: i.dateEnv.toDate(r.start),
              end: i.dateEnv.toDate(r.end),
              isStart: e.isStart,
              isEnd: e.isEnd,
            };
          }
          (n =
            "function" == typeof n
              ? n({
                  date: r,
                  allDay: Boolean(t.allDayDate),
                  allSegs: t.allSegs.map(s),
                  hiddenSegs: t.hiddenSegs.map(s),
                  jsEvent: e,
                  view: i.viewApi,
                })
              : n) && "popover" !== n
            ? "string" == typeof n && i.calendarApi.zoomTo(r, n)
            : this.setState({ isPopoverOpen: !0 });
        }),
        (this.handlePopoverClose = () => {
          this.setState({ isPopoverOpen: !1 });
        });
    }
    render() {
      let { props: a, state: l } = this;
      return E(Or.Consumer, null, (e) => {
        var { viewApi: e, options: t, calendarApi: n } = e;
        let r = t["moreLinkText"];
        var i = a["moreCnt"],
          s = Fs(a),
          n = "function" == typeof r ? r.call(n, i) : `+${i} ` + r,
          o = tt(t.moreLinkHint, [i], n),
          i = { num: i, shortText: "+" + i, text: n, view: e };
        return E(
          R,
          null,
          Boolean(a.moreCnt) &&
            E(
              Bi,
              {
                elTag: a.elTag || "a",
                elRef: this.handleLinkEl,
                elClasses: [...(a.elClasses || []), "fc-more-link"],
                elStyle: a.elStyle,
                elAttrs: Object.assign(
                  Object.assign(
                    Object.assign({}, a.elAttrs),
                    We(this.handleClick)
                  ),
                  {
                    title: o,
                    "aria-expanded": l.isPopoverOpen,
                    "aria-controls": l.isPopoverOpen ? l.popoverId : "",
                  }
                ),
                renderProps: i,
                generatorName: "moreLinkContent",
                customGenerator: t.moreLinkContent,
                defaultGenerator: a.defaultGenerator || Ls,
                classNameGenerator: t.moreLinkClassNames,
                didMount: t.moreLinkDidMount,
                willUnmount: t.moreLinkWillUnmount,
              },
              a.children
            ),
          l.isPopoverOpen &&
            E(
              Us,
              {
                id: l.popoverId,
                startDate: s.start,
                endDate: s.end,
                dateProfile: a.dateProfile,
                todayRange: a.todayRange,
                extraDateSpan: a.extraDateSpan,
                parentEl: this.parentEl,
                alignmentEl: a.alignmentElRef
                  ? a.alignmentElRef.current
                  : this.linkEl,
                alignGridTop: a.alignGridTop,
                forceTimed: a.forceTimed,
                onClose: this.handlePopoverClose,
              },
              a.popoverContent()
            )
        );
      });
    }
    componentDidMount() {
      this.updateParentEl();
    }
    componentDidUpdate() {
      this.updateParentEl();
    }
    updateParentEl() {
      this.linkEl && (this.parentEl = Te(this.linkEl, ".fc-view-harness"));
    }
  }
  function Ls(e) {
    return e.text;
  }
  function Fs(e) {
    if (e.allDayDate) return { start: e.allDayDate, end: xt(e.allDayDate, 1) };
    e = e.hiddenSegs;
    return { start: Vs(e), end: e.reduce(Qs).eventRange.range.end };
  }
  function Vs(e) {
    return e.reduce(Gs).eventRange.range.start;
  }
  function Gs(e, t) {
    return e.eventRange.range.start < t.eventRange.range.start ? e : t;
  }
  function Qs(e, t) {
    return e.eventRange.range.end > t.eventRange.range.end ? e : t;
  }
  class qs extends n {
    render() {
      let { props: e, context: t } = this;
      var n = t["options"],
        r = { view: t.viewApi };
      return E(
        Bi,
        Object.assign({}, e, {
          elTag: e.elTag || "div",
          elClasses: [...Ys(e.viewSpec), ...(e.elClasses || [])],
          renderProps: r,
          classNameGenerator: n.viewClassNames,
          generatorName: void 0,
          didMount: n.viewDidMount,
          willUnmount: n.viewWillUnmount,
        }),
        () => e.children
      );
    }
  }
  function Ys(e) {
    return [`fc-${e.type}-view`, "fc-view"];
  }
  const Zs = {
    id: String,
    defaultAllDay: Boolean,
    url: String,
    format: String,
    events: e,
    eventDataTransform: e,
    success: e,
    failure: e,
  };
  function Xs(e, t, n = Js(t)) {
    let r;
    if (
      ("string" == typeof e
        ? (r = { url: e })
        : "function" == typeof e || Array.isArray(e)
        ? (r = { events: e })
        : "object" == typeof e && e && (r = e),
      r)
    ) {
      var { refined: n, extra: i } = vn(r, n),
        s = (function (n, e) {
          var r = e.pluginHooks.eventSourceDefs;
          for (let t = r.length - 1; 0 <= t; --t) {
            let e = r[t];
            var i = e.parseMeta(n);
            if (i) return { sourceDefId: t, meta: i };
          }
          return null;
        })(n, t);
      if (s)
        return {
          _raw: e,
          isFetching: !1,
          latestFetchId: "",
          fetchRange: null,
          defaultAllDay: n.defaultAllDay,
          eventDataTransform: n.eventDataTransform,
          success: n.success,
          failure: n.failure,
          publicId: n.id || "",
          sourceId: Ve(),
          sourceDefId: s.sourceDefId,
          meta: s.meta,
          ui: Tn(n, t),
          extendedProps: i,
        };
    }
    return null;
  }
  function Js(e) {
    return Object.assign(
      Object.assign(Object.assign({}, Rn), Zs),
      e.pluginHooks.eventSourceRefiners
    );
  }
  class $s {
    getCurrentData() {
      return this.currentDataManager.getCurrentData();
    }
    dispatch(e) {
      this.currentDataManager.dispatch(e);
    }
    get view() {
      return this.getCurrentData().viewApi;
    }
    batchRendering(e) {
      e();
    }
    updateSize() {
      this.trigger("_resize", !0);
    }
    setOption(e, t) {
      this.dispatch({ type: "SET_OPTION", optionName: e, rawOptionValue: t });
    }
    getOption(e) {
      return this.currentDataManager.currentCalendarOptionsInput[e];
    }
    getAvailableLocaleCodes() {
      return Object.keys(this.getCurrentData().availableRawLocales);
    }
    on(e, t) {
      let n = this["currentDataManager"];
      n.currentCalendarOptionsRefiners[e]
        ? n.emitter.on(e, t)
        : console.warn(`Unknown listener name '${e}'`);
    }
    off(e, t) {
      this.currentDataManager.emitter.off(e, t);
    }
    trigger(e, ...t) {
      this.currentDataManager.emitter.trigger(e, ...t);
    }
    changeView(t, n) {
      this.batchRendering(() => {
        if ((this.unselect(), n))
          if (n.start && n.end)
            this.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t }),
              this.dispatch({
                type: "SET_OPTION",
                optionName: "visibleRange",
                rawOptionValue: n,
              });
          else {
            let e = this.getCurrentData()["dateEnv"];
            this.dispatch({
              type: "CHANGE_VIEW_TYPE",
              viewType: t,
              dateMarker: e.createMarker(n),
            });
          }
        else this.dispatch({ type: "CHANGE_VIEW_TYPE", viewType: t });
      });
    }
    zoomTo(e, t) {
      t =
        this.getCurrentData().viewSpecs[(t = t || "day")] ||
        this.getUnitViewSpec(t);
      this.unselect(),
        t
          ? this.dispatch({
              type: "CHANGE_VIEW_TYPE",
              viewType: t.type,
              dateMarker: e,
            })
          : this.dispatch({ type: "CHANGE_DATE", dateMarker: e });
    }
    getUnitViewSpec(e) {
      var t,
        n,
        { viewSpecs: r, toolbarConfig: i } = this.getCurrentData();
      let s = [].concat(
          i.header ? i.header.viewsWithButtons : [],
          i.footer ? i.footer.viewsWithButtons : []
        ),
        o;
      for (n in r) s.push(n);
      for (o = 0; o < s.length; o += 1)
        if ((t = r[s[o]]) && t.singleUnit === e) return t;
      return null;
    }
    prev() {
      this.unselect(), this.dispatch({ type: "PREV" });
    }
    next() {
      this.unselect(), this.dispatch({ type: "NEXT" });
    }
    prevYear() {
      let e = this.getCurrentData();
      this.unselect(),
        this.dispatch({
          type: "CHANGE_DATE",
          dateMarker: e.dateEnv.addYears(e.currentDate, -1),
        });
    }
    nextYear() {
      let e = this.getCurrentData();
      this.unselect(),
        this.dispatch({
          type: "CHANGE_DATE",
          dateMarker: e.dateEnv.addYears(e.currentDate, 1),
        });
    }
    today() {
      var e = this.getCurrentData();
      this.unselect(),
        this.dispatch({
          type: "CHANGE_DATE",
          dateMarker: jr(e.calendarOptions.now, e.dateEnv),
        });
    }
    gotoDate(e) {
      let t = this.getCurrentData();
      this.unselect(),
        this.dispatch({
          type: "CHANGE_DATE",
          dateMarker: t.dateEnv.createMarker(e),
        });
    }
    incrementDate(e) {
      let t = this.getCurrentData();
      e = p(e);
      e &&
        (this.unselect(),
        this.dispatch({
          type: "CHANGE_DATE",
          dateMarker: t.dateEnv.add(t.currentDate, e),
        }));
    }
    getDate() {
      let e = this.getCurrentData();
      return e.dateEnv.toDate(e.currentDate);
    }
    formatDate(e, t) {
      let n = this.getCurrentData()["dateEnv"];
      return n.format(n.createMarker(e), o(t));
    }
    formatRange(e, t, n) {
      let r = this.getCurrentData()["dateEnv"];
      return r.formatRange(r.createMarker(e), r.createMarker(t), o(n), n);
    }
    formatIso(e, t) {
      let n = this.getCurrentData()["dateEnv"];
      return n.formatIso(n.createMarker(e), { omitTime: t });
    }
    select(e, t) {
      let n;
      n =
        null == t
          ? null != e.start
            ? e
            : { start: e, end: null }
          : { start: e, end: t };
      (e = this.getCurrentData()), (t = oi(n, e.dateEnv, p({ days: 1 })));
      t &&
        (this.dispatch({ type: "SELECT_DATES", selection: t }), Ur(t, null, e));
    }
    unselect(e) {
      var t = this.getCurrentData();
      t.dateSelection &&
        (this.dispatch({ type: "UNSELECT_DATES" }),
        (e = e),
        (t = t).emitter.trigger("unselect", {
          jsEvent: e ? e.origEvent : null,
          view: t.viewApi || t.calendarApi.view,
        }));
    }
    addEvent(e, t) {
      if (e instanceof x)
        return (
          (n = e._def),
          (i = e._instance),
          this.getCurrentData().eventStore.defs[n.defId] ||
            (this.dispatch({
              type: "ADD_EVENTS",
              eventStore: En({ def: n, instance: i }),
            }),
            this.triggerEventAdd(e)),
          e
        );
      var n = this.getCurrentData();
      let r;
      if (t instanceof Vr) r = t.internalEventSource;
      else if ("boolean" == typeof t) t && ([r] = yt(n.eventSources));
      else if (null != t) {
        var i = this.getEventSourceById(t);
        if (!i)
          return (
            console.warn(`Could not find an event source with ID "${t}"`), null
          );
        r = i.internalEventSource;
      }
      t = Nn(e, r, n, !1);
      return t
        ? ((i = new x(n, t.def, t.def.recurringDef ? null : t.instance)),
          this.dispatch({ type: "ADD_EVENTS", eventStore: En(t) }),
          this.triggerEventAdd(i),
          i)
        : null;
    }
    triggerEventAdd(e) {
      let t = this.getCurrentData()["emitter"];
      t.trigger("eventAdd", {
        event: e,
        relatedEvents: [],
        revert: () => {
          this.dispatch({ type: "REMOVE_EVENTS", eventStore: Gr(e) });
        },
      });
    }
    getEventById(e) {
      var t,
        n = this.getCurrentData(),
        { defs: r, instances: i } = n.eventStore;
      for (t in ((e = String(e)), r)) {
        var s = r[t];
        if (s.publicId === e) {
          if (s.recurringDef) return new x(n, s, null);
          for (var o in i) {
            o = i[o];
            if (o.defId === s.defId) return new x(n, s, o);
          }
        }
      }
      return null;
    }
    getEvents() {
      var e = this.getCurrentData();
      return Qr(e.eventStore, e);
    }
    removeAllEvents() {
      this.dispatch({ type: "REMOVE_ALL_EVENTS" });
    }
    getEventSources() {
      var e,
        t = this.getCurrentData(),
        n = t.eventSources;
      let r = [];
      for (e in n) r.push(new Vr(t, n[e]));
      return r;
    }
    getEventSourceById(e) {
      var t,
        n = this.getCurrentData(),
        r = n.eventSources;
      for (t in ((e = String(e)), r))
        if (r[t].publicId === e) return new Vr(n, r[t]);
      return null;
    }
    addEventSource(e) {
      var t = this.getCurrentData();
      if (e instanceof Vr)
        return (
          t.eventSources[e.internalEventSource.sourceId] ||
            this.dispatch({
              type: "ADD_EVENT_SOURCES",
              sources: [e.internalEventSource],
            }),
          e
        );
      e = Xs(e, t);
      return e
        ? (this.dispatch({ type: "ADD_EVENT_SOURCES", sources: [e] }),
          new Vr(t, e))
        : null;
    }
    removeAllEventSources() {
      this.dispatch({ type: "REMOVE_ALL_EVENT_SOURCES" });
    }
    refetchEvents() {
      this.dispatch({ type: "FETCH_EVENT_SOURCES", isRefetch: !0 });
    }
    scrollToTime(e) {
      e = p(e);
      e && this.trigger("_scrollRequest", { time: e });
    }
  }
  var Ks = {
      __proto__: null,
      BASE_OPTION_DEFAULTS: ln,
      BaseComponent: n,
      BgEvent: Ns,
      CalendarImpl: $s,
      CalendarRoot: Ti,
      ContentContainer: Bi,
      CustomRenderingStore: class extends class {
        constructor() {
          this.handlers = [];
        }
        set(e) {
          this.currentValue = e;
          for (var t of this.handlers) t(e);
        }
        subscribe(e) {
          this.handlers.push(e),
            void 0 !== this.currentValue && e(this.currentValue);
        }
      } {
        constructor() {
          super(...arguments), (this.map = new Map());
        }
        handle(e) {
          const t = this["map"];
          let n = !1;
          e.isActive
            ? (t.set(e.id, e), (n = !0))
            : t.has(e.id) && (t.delete(e.id), (n = !0)),
            n && this.set(t);
        }
      },
      DateComponent: Br,
      DateEnv: fi,
      DateProfileGenerator: zr,
      DayCellContainer: Ms,
      DayHeader: Fi,
      DaySeriesModel: Gi,
      DayTableModel: Qi,
      DelayedRunner: ls,
      ElementDragging: wi,
      ElementScrollController: Rr,
      Emitter: Ar,
      EventContainer: Rs,
      EventImpl: x,
      Interaction: Si,
      MoreLinkContainer: Ws,
      NamedTimeZoneImpl: class {
        constructor(e) {
          this.timeZoneName = e;
        }
      },
      NowIndicatorContainer: _s,
      NowTimer: Wi,
      PositionCache: Dr,
      RefMap: us,
      ScrollController: Cr,
      ScrollResponder: Ir,
      Scroller: ds,
      SegHierarchy: gi,
      SimpleScrollGrid: Cs,
      Slicer: qi,
      Splitter: $n,
      StandardEvent: xs,
      TableDateCell: ji,
      TableDowCell: Ui,
      Theme: Tr,
      ViewContainer: qs,
      ViewContextType: Or,
      WeekNumberContainer: Bs,
      WindowScrollController: xr,
      addDays: xt,
      addDurations: at,
      addMs: Tt,
      addWeeks: Rt,
      allowContextMenu: Xe,
      allowSelection: Ye,
      applyMutationToEventStore: Fr,
      applyStyle: Ie,
      asCleanDays: function (e) {
        return e.years || e.months || e.milliseconds ? 0 : e.days;
      },
      asRoughMinutes: function (e) {
        return dt(e) / 6e4;
      },
      asRoughMs: dt,
      asRoughSeconds: function (e) {
        return dt(e) / 1e3;
      },
      binarySearch: Ei,
      buildElAttrs: Ni,
      buildEntryKey: vi,
      buildEventApis: Qr,
      buildEventRangeKey: ri,
      buildIsoString: Wt,
      buildNavLinkAttrs: ur,
      buildSegTimeText: ti,
      collectFromHash: Dt,
      combineEventUis: _n,
      compareByFieldSpecs: $e,
      compareNumbers: nt,
      compareObjs: At,
      computeEarliestSegStart: Vs,
      computeEdges: mr,
      computeFallbackHeaderFormat: _i,
      computeInnerRect: yr,
      computeRect: br,
      computeShrinkWidth: hs,
      computeVisibleDayRange: Wn,
      config: Ci,
      constrainPoint: Qn,
      createDuration: p,
      createEmptyEventStore: An,
      createEventInstance: mn,
      createEventUi: Tn,
      createFormatter: o,
      diffDates: Fn,
      diffDayAndTime: Mt,
      diffDays: kt,
      diffPoints: Yn,
      diffWeeks: _t,
      diffWholeDays: Ot,
      diffWholeWeeks: It,
      disableCursor: Ge,
      elementClosest: Te,
      elementMatches: _e,
      enableCursor: Qe,
      eventTupleToStore: En,
      filterHash: pt,
      findDirectChildren: function (e, t) {
        var n = e instanceof HTMLElement ? [e] : e;
        let r = [];
        for (let e = 0; e < n.length; e += 1) {
          var i = n[e].children;
          for (let e = 0; e < i.length; e += 1) {
            var s = i[e];
            (t && !_e(s, t)) || r.push(s);
          }
        }
        return r;
      },
      findElements: ke,
      flexibleCompare: Ke,
      formatDayString: Lt,
      formatIsoMonthStr: Ft,
      formatIsoTimeString: Vt,
      getAllowYScrolling: gs,
      getCanVGrowWithinCell: Xn,
      getClippingParents: Er,
      getDateMeta: ar,
      getDayClassNames: lr,
      getDefaultEventEnd: Lr,
      getElSeg: Xr,
      getEntrySpanEnd: pi,
      getEventTargetViaRoot: Ne,
      getIsRtlScrollbarOnLeft: fr,
      getRectCenter: qn,
      getRelevantEvents: Sn,
      getScrollGridClassNames: Es,
      getScrollbarWidths: pr,
      getSectionClassNames: Ss,
      getSectionHasLiquidHeight: fs,
      getSegAnchorAttrs: ii,
      getSegMeta: ni,
      getSlotClassNames: function (e, t) {
        let n = ["fc-slot", "fc-slot-" + Ct[e.dow]];
        return (
          e.isDisabled
            ? n.push("fc-slot-disabled")
            : (e.isToday &&
                (n.push("fc-slot-today"), n.push(t.getClass("today"))),
              e.isPast && n.push("fc-slot-past"),
              e.isFuture && n.push("fc-slot-future")),
          n
        );
      },
      getStickyFooterScrollbar: ws,
      getStickyHeaderDates: Ds,
      getUniqueDomId: He,
      greatestDurationDenominator: ht,
      groupIntersectingEntries: mi,
      guid: Ve,
      hasBgRendering: Yr,
      hasCustomDayCellContent: Is,
      hasShrinkWidth: bs,
      identity: e,
      injectStyles: De,
      interactionSettingsStore: Di,
      interactionSettingsToStore: Ai,
      intersectRanges: nr,
      intersectRects: Gn,
      intersectSpans: yi,
      isArraysEqual: wt,
      isColPropsEqual: vs,
      isDateSelectionValid: ts,
      isDateSpansEqual: ai,
      isInt: rt,
      isInteractionValid: es,
      isMultiDayRange: Ln,
      isPropsEqual: bt,
      isPropsValid: rs,
      isValidDate: zt,
      mapHash: vt,
      memoize: g,
      memoizeArraylike: function (s, o, a) {
        let l = [],
          c = [];
        return (e) => {
          var t,
            n = l.length,
            r = e.length;
          let i = 0;
          for (; i < n; i += 1)
            e[i]
              ? wt(l[i], e[i]) ||
                (a && a(c[i]),
                (t = s.apply(this, e[i])),
                (o && o(t, c[i])) || (c[i] = t))
              : a && a(c[i]);
          for (; i < r; i += 1) c[i] = s.apply(this, e[i]);
          return (l = e), c.splice(r), c;
        };
      },
      memoizeHashlike: function (i, s, o) {
        let a = {},
          l = {};
        return (e) => {
          let t = {};
          for (var n in e) {
            var r;
            l[n]
              ? wt(a[n], e[n])
                ? (t[n] = l[n])
                : (o && o(l[n]),
                  (r = i.apply(this, e[n])),
                  (t[n] = s && s(r, l[n]) ? l[n] : r))
              : (t[n] = i.apply(this, e[n]));
          }
          return (a = e), (l = t);
        };
      },
      memoizeObjArg: Qt,
      mergeEventStores: Dn,
      multiplyDuration: lt,
      padStart: et,
      parseBusinessHours: zn,
      parseClassNames: Cn,
      parseDragMeta: xi,
      parseEventDef: Bn,
      parseFieldSpecs: Je,
      parseMarker: hi,
      pointInsideRect: Vn,
      preventContextMenu: Ze,
      preventDefault: Be,
      preventSelection: qe,
      rangeContainsMarker: or,
      rangeContainsRange: sr,
      rangesEqual: rr,
      rangesIntersect: ir,
      refineEventDef: Pn,
      refineProps: vn,
      removeElement: xe,
      removeExact: function (e, t) {
        let n = 0,
          r = 0;
        for (; r < e.length; )
          e[r] === t ? (e.splice(r, 1), (n += 1)) : (r += 1);
        return n;
      },
      renderChunkContent: ps,
      renderFill: Hs,
      renderMicroColGroup: ms,
      renderScrollShim: As,
      requestJson: as,
      sanitizeShrinkWidth: ys,
      setRef: Hr,
      sliceEventStore: qr,
      sortEventSegs: Kr,
      startOfDay: v,
      translateRect: function (e, t, n) {
        return {
          left: e.left + t,
          right: e.right + t,
          top: e.top + n,
          bottom: e.bottom + n,
        };
      },
      triggerDateSelect: Ur,
      unpromisify: Sr,
      whenTransitionDone: Ue,
      wholeDivideDurations: ut,
    },
    eo = {
      __proto__: null,
      createPortal: de,
      createContext: Mr,
      flushSync: _r,
      Component: O,
      Fragment: R,
      cloneElement: function (e, t, n) {
        var r,
          i,
          s,
          o = k({}, e.props);
        for (s in t)
          "key" == s ? (r = t[s]) : "ref" == s ? (i = t[s]) : (o[s] = t[s]);
        return (
          2 < arguments.length &&
            (o.children = 3 < arguments.length ? T.call(arguments, 2) : n),
          S(e.type, o, r || e.key, i || e.ref, null)
        );
      },
      createElement: E,
      createRef: c,
      h: E,
      hydrate: function e(t, n) {
        z(t, n, e);
      },
      get isValidElement() {
        return r;
      },
      get options() {
        return C;
      },
      render: z,
      toChildArray: A,
    };
  const to = [],
    no = {
      code: "en",
      week: { dow: 0, doy: 4 },
      direction: "ltr",
      buttonText: {
        prev: "prev",
        next: "next",
        prevYear: "prev year",
        nextYear: "next year",
        year: "year",
        today: "today",
        month: "month",
        week: "week",
        day: "day",
        list: "list",
      },
      weekText: "W",
      weekTextLong: "Week",
      closeHint: "Close",
      timeHint: "Time",
      eventHint: "Event",
      allDayText: "all-day",
      moreLinkText: "more",
      noEventsText: "No events to display",
    },
    ro = Object.assign(Object.assign({}, no), {
      buttonHints: {
        prev: "Previous $0",
        next: "Next $0",
        today(e, t) {
          return "day" === t ? "Today" : "This " + e;
        },
      },
      viewHint: "$0 view",
      navLinkHint: "Go to $0",
      moreLinkHint(e) {
        return `Show ${e} more event` + (1 === e ? "" : "s");
      },
    });
  function io(e) {
    var t,
      n = 0 < e.length ? e[0].code : "en",
      e = to.concat(e);
    let r = { en: ro };
    for (t of e) r[t.code] = t;
    return { map: r, defaultCode: n };
  }
  function so(e, t) {
    return "object" != typeof e || Array.isArray(e)
      ? ((t = t),
        (r = [].concat((n = e) || [])),
        (t =
          (function (n, r) {
            for (let e = 0; e < n.length; e += 1) {
              let t = n[e].toLocaleLowerCase().split("-");
              for (let e = t.length; 0 < e; --e) {
                var i = t.slice(0, e).join("-");
                if (r[i]) return r[i];
              }
            }
            return null;
          })(r, t) || ro),
        oo(n, r, t))
      : oo(e.code, [e.code], e);
    var n, r;
  }
  function oo(e, t, n) {
    let r = gt([no, n], ["buttonText"]);
    delete r.code;
    n = r.week;
    return (
      delete r.week,
      {
        codeArg: e,
        codes: t,
        week: n,
        simpleNumberFormat: new Intl.NumberFormat(e),
        options: r,
      }
    );
  }
  function ao(e) {
    return {
      id: Ve(),
      name: e.name,
      premiumReleaseDate: e.premiumReleaseDate
        ? new Date(e.premiumReleaseDate)
        : void 0,
      deps: e.deps || [],
      reducers: e.reducers || [],
      isLoadingFuncs: e.isLoadingFuncs || [],
      contextInit: [].concat(e.contextInit || []),
      eventRefiners: e.eventRefiners || {},
      eventDefMemberAdders: e.eventDefMemberAdders || [],
      eventSourceRefiners: e.eventSourceRefiners || {},
      isDraggableTransformers: e.isDraggableTransformers || [],
      eventDragMutationMassagers: e.eventDragMutationMassagers || [],
      eventDefMutationAppliers: e.eventDefMutationAppliers || [],
      dateSelectionTransformers: e.dateSelectionTransformers || [],
      datePointTransforms: e.datePointTransforms || [],
      dateSpanTransforms: e.dateSpanTransforms || [],
      views: e.views || {},
      viewPropsTransformers: e.viewPropsTransformers || [],
      isPropsValid: e.isPropsValid || null,
      externalDefTransforms: e.externalDefTransforms || [],
      viewContainerAppends: e.viewContainerAppends || [],
      eventDropTransformers: e.eventDropTransformers || [],
      componentInteractions: e.componentInteractions || [],
      calendarInteractions: e.calendarInteractions || [],
      themeClasses: e.themeClasses || {},
      eventSourceDefs: e.eventSourceDefs || [],
      cmdFormatter: e.cmdFormatter,
      recurringTypes: e.recurringTypes || [],
      namedTimeZonedImpl: e.namedTimeZonedImpl,
      initialView: e.initialView || "",
      elementDraggingImpl: e.elementDraggingImpl,
      optionChangeHandlers: e.optionChangeHandlers || {},
      scrollGridImpl: e.scrollGridImpl || null,
      listenerRefiners: e.listenerRefiners || {},
      optionRefiners: e.optionRefiners || {},
      propSetHandlers: e.propSetHandlers || {},
    };
  }
  function lo(e, t) {
    let o = {},
      a = {
        premiumReleaseDate: void 0,
        reducers: [],
        isLoadingFuncs: [],
        contextInit: [],
        eventRefiners: {},
        eventDefMemberAdders: [],
        eventSourceRefiners: {},
        isDraggableTransformers: [],
        eventDragMutationMassagers: [],
        eventDefMutationAppliers: [],
        dateSelectionTransformers: [],
        datePointTransforms: [],
        dateSpanTransforms: [],
        views: {},
        viewPropsTransformers: [],
        isPropsValid: null,
        externalDefTransforms: [],
        viewContainerAppends: [],
        eventDropTransformers: [],
        componentInteractions: [],
        calendarInteractions: [],
        themeClasses: {},
        eventSourceDefs: [],
        cmdFormatter: null,
        recurringTypes: [],
        namedTimeZonedImpl: null,
        initialView: "",
        elementDraggingImpl: null,
        optionChangeHandlers: {},
        scrollGridImpl: null,
        listenerRefiners: {},
        optionRefiners: {},
        propSetHandlers: {},
      };
    function l(e) {
      for (var t of e) {
        var n = t.name,
          r = o[n];
        void 0 === r
          ? ((o[n] = t.id),
            l(t.deps),
            (a =
              ((i = a),
              (s = t),
              {
                premiumReleaseDate: (function (e, t) {
                  return void 0 !== e
                    ? void 0 !== t
                      ? new Date(Math.max(e.valueOf(), t.valueOf()))
                      : e
                    : t;
                })(i.premiumReleaseDate, s.premiumReleaseDate),
                reducers: i.reducers.concat(s.reducers),
                isLoadingFuncs: i.isLoadingFuncs.concat(s.isLoadingFuncs),
                contextInit: i.contextInit.concat(s.contextInit),
                eventRefiners: Object.assign(
                  Object.assign({}, i.eventRefiners),
                  s.eventRefiners
                ),
                eventDefMemberAdders: i.eventDefMemberAdders.concat(
                  s.eventDefMemberAdders
                ),
                eventSourceRefiners: Object.assign(
                  Object.assign({}, i.eventSourceRefiners),
                  s.eventSourceRefiners
                ),
                isDraggableTransformers: i.isDraggableTransformers.concat(
                  s.isDraggableTransformers
                ),
                eventDragMutationMassagers: i.eventDragMutationMassagers.concat(
                  s.eventDragMutationMassagers
                ),
                eventDefMutationAppliers: i.eventDefMutationAppliers.concat(
                  s.eventDefMutationAppliers
                ),
                dateSelectionTransformers: i.dateSelectionTransformers.concat(
                  s.dateSelectionTransformers
                ),
                datePointTransforms: i.datePointTransforms.concat(
                  s.datePointTransforms
                ),
                dateSpanTransforms: i.dateSpanTransforms.concat(
                  s.dateSpanTransforms
                ),
                views: Object.assign(Object.assign({}, i.views), s.views),
                viewPropsTransformers: i.viewPropsTransformers.concat(
                  s.viewPropsTransformers
                ),
                isPropsValid: s.isPropsValid || i.isPropsValid,
                externalDefTransforms: i.externalDefTransforms.concat(
                  s.externalDefTransforms
                ),
                viewContainerAppends: i.viewContainerAppends.concat(
                  s.viewContainerAppends
                ),
                eventDropTransformers: i.eventDropTransformers.concat(
                  s.eventDropTransformers
                ),
                calendarInteractions: i.calendarInteractions.concat(
                  s.calendarInteractions
                ),
                componentInteractions: i.componentInteractions.concat(
                  s.componentInteractions
                ),
                themeClasses: Object.assign(
                  Object.assign({}, i.themeClasses),
                  s.themeClasses
                ),
                eventSourceDefs: i.eventSourceDefs.concat(s.eventSourceDefs),
                cmdFormatter: s.cmdFormatter || i.cmdFormatter,
                recurringTypes: i.recurringTypes.concat(s.recurringTypes),
                namedTimeZonedImpl:
                  s.namedTimeZonedImpl || i.namedTimeZonedImpl,
                initialView: i.initialView || s.initialView,
                elementDraggingImpl:
                  i.elementDraggingImpl || s.elementDraggingImpl,
                optionChangeHandlers: Object.assign(
                  Object.assign({}, i.optionChangeHandlers),
                  s.optionChangeHandlers
                ),
                scrollGridImpl: s.scrollGridImpl || i.scrollGridImpl,
                listenerRefiners: Object.assign(
                  Object.assign({}, i.listenerRefiners),
                  s.listenerRefiners
                ),
                optionRefiners: Object.assign(
                  Object.assign({}, i.optionRefiners),
                  s.optionRefiners
                ),
                propSetHandlers: Object.assign(
                  Object.assign({}, i.propSetHandlers),
                  s.propSetHandlers
                ),
              })))
          : r !== t.id && console.warn(`Duplicate plugin '${n}'`);
      }
      var i, s;
    }
    return e && l(e), l(t), a;
  }
  class co extends Tr {}
  function uo(e, t, n, r) {
    if (t[e]) return t[e];
    n = (function (e, t, n, r) {
      let i = n[e],
        s = r[e],
        o = (e) =>
          i && null !== i[e] ? i[e] : s && null !== s[e] ? s[e] : null,
        a = o("component"),
        l = o("superType"),
        c = null;
      if (l) {
        if (l === e)
          throw new Error(
            "Can't have a custom view type that references itself"
          );
        c = uo(l, t, n, r);
      }
      !a && c && (a = c.component);
      return a
        ? {
            type: e,
            component: a,
            defaults: Object.assign(
              Object.assign({}, c ? c.defaults : {}),
              i ? i.rawOptions : {}
            ),
            overrides: Object.assign(
              Object.assign({}, c ? c.overrides : {}),
              s ? s.rawOptions : {}
            ),
          }
        : null;
    })(e, t, n, r);
    return n && (t[e] = n), n;
  }
  function ho(e) {
    return vt(e, fo);
  }
  function fo(e) {
    e = "function" == typeof e ? { component: e } : e;
    let t = e["component"];
    return (
      e.content
        ? (t = go(e))
        : !t ||
          t.prototype instanceof n ||
          (t = go(Object.assign(Object.assign({}, e), { content: t }))),
      { superType: e.type, component: t, rawOptions: e }
    );
  }
  function go(n) {
    return (t) =>
      E(Or.Consumer, null, (e) =>
        E(Bi, {
          elTag: "div",
          elClasses: Ys(e.viewSpec),
          renderProps: Object.assign(Object.assign({}, t), {
            nextDayThreshold: e.options.nextDayThreshold,
          }),
          generatorName: void 0,
          customGenerator: n.content,
          classNameGenerator: n.classNames,
          didMount: n.didMount,
          willUnmount: n.willUnmount,
        })
      );
  }
  function po(e, u, h, f) {
    e = ho(e);
    let g = ho(u.views);
    return vt(
      (function (e, t) {
        var n = {};
        let r;
        for (r in e) uo(r, n, e, t);
        for (r in t) uo(r, n, e, t);
        return n;
      })(e, g),
      (s) => {
        {
          var o = s,
            a = ((s = g), u),
            l = h,
            c = f;
          let e =
              o.overrides.duration ||
              o.defaults.duration ||
              l.duration ||
              a.duration,
            t = null,
            n = "",
            r = "",
            i = {};
          e &&
            (t = (function (e) {
              let t = JSON.stringify(e),
                n = vo[t];
              void 0 === n && ((n = p(e)), (vo[t] = n));
              return n;
            })(e)) &&
            ((d = ht(t)),
            (n = d.unit),
            1 === d.value && ((r = n), (i = s[n] ? s[n].rawOptions : {})));
          var d = (e) => {
              var e = e.buttonText || {},
                t = o.defaults.buttonTextKey;
              return null != t && null != e[t]
                ? e[t]
                : null != e[o.type]
                ? e[o.type]
                : null != e[r]
                ? e[r]
                : null;
            },
            s = (e) => {
              var e = e.buttonHints || {},
                t = o.defaults.buttonTextKey;
              return null != t && null != e[t]
                ? e[t]
                : null != e[o.type]
                ? e[o.type]
                : null != e[r]
                ? e[r]
                : null;
            };
          return {
            type: o.type,
            component: o.component,
            duration: t,
            durationUnit: n,
            singleUnit: r,
            optionDefaults: o.defaults,
            optionOverrides: Object.assign(Object.assign({}, i), o.overrides),
            buttonTextOverride: d(l) || d(a) || o.overrides.buttonText,
            buttonTextDefault: d(c) || o.defaults.buttonText || d(ln) || o.type,
            buttonTitleOverride: s(l) || s(a) || o.overrides.buttonHint,
            buttonTitleDefault: s(c) || o.defaults.buttonHint || s(ln),
          };
        }
      }
    );
  }
  (co.prototype.classes = {
    root: "fc-theme-standard",
    tableCellShaded: "fc-cell-shaded",
    buttonGroup: "fc-button-group",
    button: "fc-button fc-button-primary",
    buttonActive: "fc-button-active",
  }),
    (co.prototype.baseIconClass = "fc-icon"),
    (co.prototype.iconClasses = {
      close: "fc-icon-x",
      prev: "fc-icon-chevron-left",
      next: "fc-icon-chevron-right",
      prevYear: "fc-icon-chevrons-left",
      nextYear: "fc-icon-chevrons-right",
    }),
    (co.prototype.rtlIconClasses = {
      prev: "fc-icon-chevron-right",
      next: "fc-icon-chevron-left",
      prevYear: "fc-icon-chevrons-right",
      nextYear: "fc-icon-chevrons-left",
    }),
    (co.prototype.iconOverrideOption = "buttonIcons"),
    (co.prototype.iconOverrideCustomButtonOption = "icon"),
    (co.prototype.iconOverridePrefix = "fc-icon-");
  let vo = {};
  function mo(e, t, n) {
    t = t ? t.activeRange : null;
    return Eo(
      {},
      (function (e, t) {
        let n = Js(t),
          r = [].concat(e.eventSources || []),
          i = [];
        e.initialEvents && r.unshift(e.initialEvents);
        e.events && r.unshift(e.events);
        for (var s of r) {
          s = Xs(s, t, n);
          s && i.push(s);
        }
        return i;
      })(e, n),
      t,
      n
    );
  }
  function yo(e, t, n, r) {
    var i,
      s = n ? n.activeRange : null;
    switch (t.type) {
      case "ADD_EVENT_SOURCES":
        return Eo(e, t.sources, s, r);
      case "REMOVE_EVENT_SOURCE":
        return (i = t.sourceId), pt(e, (e) => e.sourceId !== i);
      case "PREV":
      case "NEXT":
      case "CHANGE_DATE":
      case "CHANGE_VIEW_TYPE":
        return n ? So(e, s, r) : e;
      case "FETCH_EVENT_SOURCES":
        return Ao(
          e,
          t.sourceIds ? mt(t.sourceIds) : Do(e, r),
          s,
          t.isRefetch || !1,
          r
        );
      case "RECEIVE_EVENTS":
      case "RECEIVE_EVENT_ERROR":
        var o = e,
          a = t.sourceId,
          l = t.fetchId,
          d = t.fetchRange,
          c = o[a];
        return c && l === c.latestFetchId
          ? Object.assign(Object.assign({}, o), {
              [a]: Object.assign(Object.assign({}, c), {
                isFetching: !1,
                fetchRange: d,
              }),
            })
          : o;
      case "REMOVE_ALL_EVENT_SOURCES":
        return {};
      default:
        return e;
    }
  }
  function bo(e) {
    for (var t in e) if (e[t].isFetching) return !0;
    return !1;
  }
  function Eo(e, t, n, r) {
    let i = {};
    for (var s of t) i[s.sourceId] = s;
    return n && (i = So(i, n, r)), Object.assign(Object.assign({}, e), i);
  }
  function So(e, r, i) {
    return Ao(
      e,
      pt(e, (e) => {
        var t = r,
          n = i;
        return wo(e, n)
          ? !n.options.lazyFetching ||
              !e.fetchRange ||
              e.isFetching ||
              t.start < e.fetchRange.start ||
              t.end > e.fetchRange.end
          : !e.latestFetchId;
      }),
      r,
      !1,
      i
    );
  }
  function Ao(e, t, n, r, i) {
    let s = {};
    for (var o in e) {
      var a = e[o];
      t[o]
        ? (s[o] = (function (n, r, e, i) {
            let { options: s, calendarApi: o } = i,
              t = i.pluginHooks.eventSourceDefs[n.sourceDefId],
              a = Ve();
            return (
              t.fetch(
                { eventSource: n, range: r, isRefetch: e, context: i },
                (e) => {
                  let t = e["rawEvents"];
                  s.eventSourceSuccess &&
                    (t = s.eventSourceSuccess.call(o, t, e.response) || t),
                    n.success && (t = n.success.call(o, t, e.response) || t),
                    i.dispatch({
                      type: "RECEIVE_EVENTS",
                      sourceId: n.sourceId,
                      fetchId: a,
                      fetchRange: r,
                      rawEvents: t,
                    });
                },
                (e) => {
                  let t = !1;
                  s.eventSourceFailure &&
                    (s.eventSourceFailure.call(o, e), (t = !0)),
                    n.failure && (n.failure(e), (t = !0)),
                    t || console.warn(e.message, e),
                    i.dispatch({
                      type: "RECEIVE_EVENT_ERROR",
                      sourceId: n.sourceId,
                      fetchId: a,
                      fetchRange: r,
                      error: e,
                    });
                }
              ),
              Object.assign(Object.assign({}, n), {
                isFetching: !0,
                latestFetchId: a,
              })
            );
          })(a, n, r, i))
        : (s[o] = a);
    }
    return s;
  }
  function Do(e, t) {
    return pt(e, (e) => wo(e, t));
  }
  function wo(e, t) {
    return !t.pluginHooks.eventSourceDefs[e.sourceDefId].ignoreRange;
  }
  function Co(e, t, n, r, i) {
    return {
      header: e.headerToolbar ? Ro(e.headerToolbar, e, t, n, r, i) : null,
      footer: e.footerToolbar ? Ro(e.footerToolbar, e, t, n, r, i) : null,
    };
  }
  function Ro(e, t, n, r, i, d) {
    let s = {},
      o = [],
      a = !1;
    for (var l in e) {
      var c = (function (e, l, t, c, v, d) {
        let u = "rtl" === l.direction,
          m = l.customButtons || {},
          y = t.buttonText || {},
          h = l.buttonText || {},
          f = t.buttonHints || {},
          g = l.buttonHints || {},
          n = e ? e.split(" ") : [],
          p = [],
          b = !1,
          r = n.map((e) =>
            e.split(",").map((t) => {
              if ("title" === t) return (b = !0), { buttonName: t };
              let n;
              var e, r;
              let i, s, o, a;
              return (
                (n = m[t])
                  ? ((i = (e) => {
                      n.click && n.click.call(e.target, e, e.target);
                    }),
                    (s = c.getCustomButtonIconClass(n)) ||
                      (s = c.getIconClass(t, u)) ||
                      (o = n.text),
                    (a = n.hint || n.text))
                  : (r = v[t])
                  ? (p.push(t),
                    (i = () => {
                      d.changeView(t);
                    }),
                    (o = r.buttonTextOverride) ||
                      (s = c.getIconClass(t, u)) ||
                      (o = r.buttonTextDefault),
                    (e = r.buttonTextOverride || r.buttonTextDefault),
                    (a = tt(
                      r.buttonTitleOverride ||
                        r.buttonTitleDefault ||
                        l.viewHint,
                      [e, t],
                      e
                    )))
                  : d[t] &&
                    ((i = () => {
                      d[t]();
                    }),
                    (o = y[t]) || (s = c.getIconClass(t, u)) || (o = h[t]),
                    (a =
                      "prevYear" === t || "nextYear" === t
                        ? ((r = "prevYear" === t ? "prev" : "next"),
                          tt(f[r] || g[r], [h.year || "year", "year"], h[t]))
                        : (e) => tt(f[t] || g[t], [h[e] || e, e], h[t]))),
                {
                  buttonName: t,
                  buttonClick: i,
                  buttonIcon: s,
                  buttonText: o,
                  buttonHint: a,
                }
              );
            })
          );
        return { widgets: r, viewsWithButtons: p, hasTitle: b };
      })(e[l], t, n, r, i, d);
      (s[l] = c.widgets), o.push(...c.viewsWithButtons), (a = a || c.hasTitle);
    }
    return { sectionWidgets: s, viewsWithButtons: o, hasTitle: a };
  }
  class xo {
    constructor(e, t, n) {
      (this.type = e), (this.getCurrentData = t), (this.dateEnv = n);
    }
    get calendar() {
      return this.getCurrentData().calendarApi;
    }
    get title() {
      return this.getCurrentData().viewTitle;
    }
    get activeStart() {
      return this.dateEnv.toDate(
        this.getCurrentData().dateProfile.activeRange.start
      );
    }
    get activeEnd() {
      return this.dateEnv.toDate(
        this.getCurrentData().dateProfile.activeRange.end
      );
    }
    get currentStart() {
      return this.dateEnv.toDate(
        this.getCurrentData().dateProfile.currentRange.start
      );
    }
    get currentEnd() {
      return this.dateEnv.toDate(
        this.getCurrentData().dateProfile.currentRange.end
      );
    }
    getOption(e) {
      return this.getCurrentData().options[e];
    }
  }
  function To(t, n) {
    let r = yt(n.getCurrentData().eventSources);
    if (
      1 === r.length &&
      1 === t.length &&
      Array.isArray(r[0]._raw) &&
      Array.isArray(t[0])
    )
      n.dispatch({
        type: "RESET_RAW_EVENTS",
        sourceId: r[0].sourceId,
        rawEvents: t[0],
      });
    else {
      let e = [];
      for (var i of t) {
        let t = !1;
        for (let e = 0; e < r.length; e += 1)
          if (r[e]._raw === i) {
            r.splice(e, 1), (t = !0);
            break;
          }
        t || e.push(i);
      }
      for (var s of r)
        n.dispatch({ type: "REMOVE_EVENT_SOURCE", sourceId: s.sourceId });
      for (var o of e) n.calendarApi.addEventSource(o);
    }
  }
  const _o = [
    ao({
      name: "array-event-source",
      eventSourceDefs: [
        {
          ignoreRange: !0,
          parseMeta(e) {
            return Array.isArray(e.events) ? e.events : null;
          },
          fetch(e, t) {
            t({ rawEvents: e.eventSource.meta });
          },
        },
      ],
    }),
    ao({
      name: "func-event-source",
      eventSourceDefs: [
        {
          parseMeta(e) {
            return "function" == typeof e.events ? e.events : null;
          },
          fetch(e, t, n) {
            var r = e.context["dateEnv"];
            const i = e.eventSource.meta;
            Sr(i.bind(null, li(e.range, r)), (e) => t({ rawEvents: e }), n);
          },
        },
      ],
    }),
    ao({
      name: "json-event-source",
      eventSourceRefiners: {
        method: String,
        extraParams: e,
        startParam: String,
        endParam: String,
        timeZoneParam: String,
      },
      eventSourceDefs: [
        {
          parseMeta(e) {
            return !e.url || ("json" !== e.format && e.format)
              ? null
              : {
                  url: e.url,
                  format: "json",
                  method: (e.method || "GET").toUpperCase(),
                  extraParams: e.extraParams,
                  startParam: e.startParam,
                  endParam: e.endParam,
                  timeZoneParam: e.timeZoneParam,
                };
          },
          fetch(e, n, t) {
            var r = e.eventSource["meta"],
              e = (function (e, t, n) {
                let { dateEnv: r, options: i } = n,
                  s,
                  o,
                  a,
                  l,
                  c = {};
                null == (s = e.startParam) && (s = i.startParam);
                null == (o = e.endParam) && (o = i.endParam);
                null == (a = e.timeZoneParam) && (a = i.timeZoneParam);
                l =
                  "function" == typeof e.extraParams
                    ? e.extraParams()
                    : e.extraParams || {};
                Object.assign(c, l),
                  (c[s] = r.formatIso(t.start)),
                  (c[o] = r.formatIso(t.end)),
                  "local" !== r.timeZone && (c[a] = r.timeZone);
                return c;
              })(r, e.range, e.context);
            as(r.method, r.url, e).then(([e, t]) => {
              n({ rawEvents: e, response: t });
            }, t);
          },
        },
      ],
    }),
    ao({
      name: "simple-recurring-event",
      recurringTypes: [
        {
          parse(t, n) {
            if (
              t.daysOfWeek ||
              t.startTime ||
              t.endTime ||
              t.startRecur ||
              t.endRecur
            ) {
              n = {
                daysOfWeek: t.daysOfWeek || null,
                startTime: t.startTime || null,
                endTime: t.endTime || null,
                startRecur: t.startRecur ? n.createMarker(t.startRecur) : null,
                endRecur: t.endRecur ? n.createMarker(t.endRecur) : null,
              };
              let e;
              return (
                !(e = t.duration ? t.duration : e) &&
                  t.startTime &&
                  t.endTime &&
                  (e =
                    ((r = t.endTime),
                    (i = t.startTime),
                    {
                      years: r.years - i.years,
                      months: r.months - i.months,
                      days: r.days - i.days,
                      milliseconds: r.milliseconds - i.milliseconds,
                    })),
                {
                  allDayGuess: Boolean(!t.startTime && !t.endTime),
                  duration: e,
                  typeData: n,
                }
              );
            }
            var r, i;
            return null;
          },
          expand(i, s, o) {
            s = nr(s, { start: i.startRecur, end: i.endRecur });
            if (s) {
              var a = i.daysOfWeek;
              var l = i.startTime;
              i = s;
              var c = o;
              let t = a ? mt(a) : null,
                n = v(i.start),
                e = i.end,
                r = [];
              for (; n < e; ) {
                let e;
                (t && !t[n.getUTCDay()]) ||
                  ((e = l ? c.add(n, l) : n), r.push(e)),
                  (n = xt(n, 1));
              }
              return r;
            }
            return [];
          },
        },
      ],
      eventRefiners: {
        daysOfWeek: e,
        startTime: p,
        endTime: p,
        duration: p,
        startRecur: e,
        endRecur: e,
      },
    }),
    ao({
      name: "change-handler",
      optionChangeHandlers: {
        events(e, t) {
          To([e], t);
        },
        eventSources: To,
      },
    }),
    ao({
      name: "misc",
      isLoadingFuncs: [(e) => bo(e.eventSources)],
      propSetHandlers: {
        dateProfile: function (e, t) {
          t.emitter.trigger(
            "datesSet",
            Object.assign(Object.assign({}, li(e.activeRange, t.dateEnv)), {
              view: t.viewApi,
            })
          );
        },
        eventStore: function (e, t) {
          let n = t["emitter"];
          n.hasHandlers("eventsSet") && n.trigger("eventsSet", Qr(e, t));
        },
      },
    }),
  ];
  class ko {
    constructor(e, t) {
      (this.runTaskOption = e),
        (this.drainedOption = t),
        (this.queue = []),
        (this.delayedRunner = new ls(this.drain.bind(this)));
    }
    request(e, t) {
      this.queue.push(e), this.delayedRunner.request(t);
    }
    pause(e) {
      this.delayedRunner.pause(e);
    }
    resume(e, t) {
      this.delayedRunner.resume(e, t);
    }
    drain() {
      let t = this["queue"];
      for (; t.length; ) {
        let e = [];
        for (var n; (n = t.shift()); ) this.runTask(n), e.push(n);
        this.drained(e);
      }
    }
    runTask(e) {
      this.runTaskOption && this.runTaskOption(e);
    }
    drained(e) {
      this.drainedOption && this.drainedOption(e);
    }
  }
  function Mo(e, t, n) {
    let r;
    return (
      (r = /^(year|month)$/.test(e.currentRangeUnit)
        ? e.currentRange
        : e.activeRange),
      n.formatRange(
        r.start,
        r.end,
        o(
          t.titleFormat ||
            (function (e) {
              var t = e["currentRangeUnit"];
              if ("year" === t) return { year: "numeric" };
              if ("month" === t) return { year: "numeric", month: "long" };
              t = Ot(e.currentRange.start, e.currentRange.end);
              if (null !== t && 1 < t)
                return { year: "numeric", month: "short", day: "numeric" };
              return { year: "numeric", month: "long", day: "numeric" };
            })(e)
        ),
        {
          isEndExclusive: e.isRangeAllDay,
          defaultSeparator: t.titleRangeSeparator,
        }
      )
    );
  }
  class Io {
    constructor(e) {
      (this.computeCurrentViewData = g(this._computeCurrentViewData)),
        (this.organizeRawLocales = g(io)),
        (this.buildLocale = g(so)),
        (this.buildPluginHooks = (function () {
          let n = [],
            r = [],
            i;
          return (e, t) => (
            (i && wt(e, n) && wt(t, r)) || (i = lo(e, t)), (n = e), (r = t), i
          );
        })()),
        (this.buildDateEnv = g(Oo)),
        (this.buildTheme = g(No)),
        (this.parseToolbars = g(Co)),
        (this.buildViewSpecs = g(po)),
        (this.buildDateProfileGenerator = Qt(Po)),
        (this.buildViewApi = g(Ho)),
        (this.buildViewUiProps = Qt(zo)),
        (this.buildEventUiBySource = g(Bo, bt)),
        (this.buildEventUiBases = g(jo)),
        (this.parseContextBusinessHours = Qt(Wo)),
        (this.buildTitle = g(Mo)),
        (this.emitter = new Ar()),
        (this.actionRunner = new ko(
          this._handleAction.bind(this),
          this.updateData.bind(this)
        )),
        (this.currentCalendarOptionsInput = {}),
        (this.currentCalendarOptionsRefined = {}),
        (this.currentViewOptionsInput = {}),
        (this.currentViewOptionsRefined = {}),
        (this.currentCalendarOptionsRefiners = {}),
        (this.optionsForRefining = []),
        (this.optionsForHandling = []),
        (this.getCurrentData = () => this.data),
        (this.dispatch = (e) => {
          this.actionRunner.request(e);
        }),
        (this.props = e),
        this.actionRunner.pause();
      var t,
        n = {},
        r = this.computeOptionsData(e.optionOverrides, n, e.calendarApi),
        i = r.calendarOptions.initialView || r.pluginHooks.initialView;
      let d = this.computeCurrentViewData(i, r, e.optionOverrides, n),
        s =
          ((e.calendarApi.currentDataManager = this).emitter.setThisContext(
            e.calendarApi
          ),
          this.emitter.setOptions(d.options),
          (l = r.calendarOptions),
          (t = r.dateEnv),
          null != (o = l.initialDate) ? t.createMarker(o) : jr(l.now, t));
      var u,
        o = d.dateProfileGenerator.build(s),
        a =
          (or(o.activeRange, s) || (s = o.currentRange.start),
          {
            dateEnv: r.dateEnv,
            options: r.calendarOptions,
            pluginHooks: r.pluginHooks,
            calendarApi: e.calendarApi,
            dispatch: this.dispatch,
            emitter: this.emitter,
            getCurrentData: this.getCurrentData,
          });
      for (u of r.pluginHooks.contextInit) u(a);
      var h,
        l = mo(r.calendarOptions, o, a),
        c = {
          dynamicOptionOverrides: n,
          currentViewType: i,
          currentDate: s,
          dateProfile: o,
          businessHours: this.parseContextBusinessHours(a),
          eventSources: l,
          eventUiBases: {},
          eventStore: An(),
          renderableEventStore: An(),
          dateSelection: null,
          eventSelection: "",
          eventDrag: null,
          eventResize: null,
          selectionConfig: this.buildViewUiProps(a).selectionConfig,
        },
        f = Object.assign(Object.assign({}, a), c);
      for (h of r.pluginHooks.reducers) Object.assign(c, h(null, null, f));
      Uo(c, a) && this.emitter.trigger("loading", !0),
        (this.state = c),
        this.updateData(),
        this.actionRunner.resume();
    }
    resetOptions(e, t) {
      let n = this["props"];
      void 0 === t
        ? (n.optionOverrides = e)
        : ((n.optionOverrides = Object.assign(
            Object.assign({}, n.optionOverrides || {}),
            e
          )),
          this.optionsForRefining.push(...t)),
        (void 0 !== t && !t.length) ||
          this.actionRunner.request({ type: "NOTHING" });
    }
    _handleAction(e) {
      let { props: t, state: n, emitter: r } = this;
      i = n.dynamicOptionOverrides;
      var i =
          "SET_OPTION" !== (s = e).type
            ? i
            : Object.assign(Object.assign({}, i), {
                [s.optionName]: s.rawOptionValue,
              }),
        s = this.computeOptionsData(t.optionOverrides, i, t.calendarApi),
        d =
          ((o = n.currentViewType),
          (o = "CHANGE_VIEW_TYPE" === (d = e).type ? d.viewType : o));
      let u = this.computeCurrentViewData(d, s, t.optionOverrides, i);
      (t.calendarApi.currentDataManager = this),
        r.setThisContext(t.calendarApi),
        r.setOptions(u.options);
      var o = {
        dateEnv: s.dateEnv,
        options: s.calendarOptions,
        pluginHooks: s.pluginHooks,
        calendarApi: t.calendarApi,
        dispatch: this.dispatch,
        emitter: r,
        getCurrentData: this.getCurrentData,
      };
      let { currentDate: a, dateProfile: l } = n;
      this.data &&
        this.data.dateProfileGenerator !== u.dateProfileGenerator &&
        (l = u.dateProfileGenerator.build(a)),
        (a = ((c = a), "CHANGE_DATE" !== (f = e).type ? c : f.dateMarker)),
        (l = (function (e, t, n, r) {
          let i;
          switch (t.type) {
            case "CHANGE_VIEW_TYPE":
              return r.build(t.dateMarker || n);
            case "CHANGE_DATE":
              return r.build(t.dateMarker);
            case "PREV":
              if ((i = r.buildPrev(e, n)).isValid) return i;
              break;
            case "NEXT":
              if ((i = r.buildNext(e, n)).isValid) return i;
          }
          return e;
        })(l, e, a, u.dateProfileGenerator)),
        ("PREV" !== e.type && "NEXT" !== e.type && or(l.currentRange, a)) ||
          (a = l.currentRange.start);
      var h,
        c = yo(n.eventSources, e, l, o),
        f = Zi(n.eventStore, e, c, l, o),
        g =
          (bo(c) &&
            !u.options.progressiveEventRendering &&
            n.renderableEventStore) ||
          f,
        { eventUiSingleBase: p, selectionConfig: v } = this.buildViewUiProps(o),
        m = this.buildEventUiBySource(c),
        p = this.buildEventUiBases(g.defs, p, m),
        y = {
          dynamicOptionOverrides: i,
          currentViewType: d,
          currentDate: a,
          dateProfile: l,
          eventSources: c,
          eventStore: f,
          renderableEventStore: g,
          selectionConfig: v,
          eventUiBases: p,
          businessHours: this.parseContextBusinessHours(o),
          dateSelection: (function (e, t) {
            switch (t.type) {
              case "UNSELECT_DATES":
                return null;
              case "SELECT_DATES":
                return t.selection;
              default:
                return e;
            }
          })(n.dateSelection, e),
          eventSelection: (function (e, t) {
            switch (t.type) {
              case "UNSELECT_EVENT":
                return "";
              case "SELECT_EVENT":
                return t.eventInstanceId;
              default:
                return e;
            }
          })(n.eventSelection, e),
          eventDrag: (function (e, t) {
            var n;
            switch (t.type) {
              case "UNSET_EVENT_DRAG":
                return null;
              case "SET_EVENT_DRAG":
                return {
                  affectedEvents: (n = t.state).affectedEvents,
                  mutatedEvents: n.mutatedEvents,
                  isEvent: n.isEvent,
                };
              default:
                return e;
            }
          })(n.eventDrag, e),
          eventResize: (function (e, t) {
            var n;
            switch (t.type) {
              case "UNSET_EVENT_RESIZE":
                return null;
              case "SET_EVENT_RESIZE":
                return {
                  affectedEvents: (n = t.state).affectedEvents,
                  mutatedEvents: n.mutatedEvents,
                  isEvent: n.isEvent,
                };
              default:
                return e;
            }
          })(n.eventResize, e),
        },
        b = Object.assign(Object.assign({}, o), y);
      for (h of s.pluginHooks.reducers) Object.assign(y, h(n, e, b));
      (m = Uo(n, o)), (i = Uo(y, o));
      !m && i ? r.trigger("loading", !0) : m && !i && r.trigger("loading", !1),
        (this.state = y),
        t.onAction && t.onAction(e);
    }
    updateData() {
      let { props: e, state: t } = this;
      var n = this.data,
        r = this.computeOptionsData(
          e.optionOverrides,
          t.dynamicOptionOverrides,
          e.calendarApi
        ),
        i = this.computeCurrentViewData(
          t.currentViewType,
          r,
          e.optionOverrides,
          t.dynamicOptionOverrides
        );
      let s = (this.data = Object.assign(
          Object.assign(
            Object.assign(
              {
                viewTitle: this.buildTitle(t.dateProfile, i.options, r.dateEnv),
                calendarApi: e.calendarApi,
                dispatch: this.dispatch,
                emitter: this.emitter,
                getCurrentData: this.getCurrentData,
              },
              r
            ),
            i
          ),
          t
        )),
        d = r.pluginHooks.optionChangeHandlers;
      var o,
        a = n && n.calendarOptions,
        l = r.calendarOptions;
      if (a && a !== l)
        for (var c in (a.timeZone !== l.timeZone &&
          ((t.eventSources = s.eventSources =
            ((i = s.eventSources),
            (r = t.dateProfile),
            (o = s),
            (r = r ? r.activeRange : null),
            Ao(i, Do(i, o), r, !0, o))),
          (t.eventStore = s.eventStore =
            $i(s.eventStore, n.dateEnv, s.dateEnv)),
          (t.renderableEventStore = s.renderableEventStore =
            $i(s.renderableEventStore, n.dateEnv, s.dateEnv))),
        d))
          (-1 === this.optionsForHandling.indexOf(c) && a[c] === l[c]) ||
            d[c](l[c], s);
      (this.optionsForHandling = []), e.onData && e.onData(s);
    }
    computeOptionsData(e, t, n) {
      if (
        !this.optionsForRefining.length &&
        e === this.stableOptionOverrides &&
        t === this.stableDynamicOptionOverrides
      )
        return this.stableCalendarOptionsData;
      var {
          refinedOptions: e,
          pluginHooks: t,
          localeDefaults: r,
          availableLocaleData: i,
          extra: s,
        } = this.processRawCalendarOptions(e, t),
        s =
          (Lo(s),
          this.buildDateEnv(
            e.timeZone,
            e.locale,
            e.weekNumberCalculation,
            e.firstDay,
            e.weekText,
            t,
            i,
            e.defaultRangeSeparator
          )),
        o = this.buildViewSpecs(
          t.views,
          this.stableOptionOverrides,
          this.stableDynamicOptionOverrides,
          r
        ),
        a = this.buildTheme(e, t),
        n = this.parseToolbars(e, this.stableOptionOverrides, a, o, n);
      return (this.stableCalendarOptionsData = {
        calendarOptions: e,
        pluginHooks: t,
        dateEnv: s,
        viewSpecs: o,
        theme: a,
        toolbarConfig: n,
        localeDefaults: r,
        availableRawLocales: i.map,
      });
    }
    processRawCalendarOptions(e, t) {
      var { locales: n, locale: r } = pn([ln, e, t]),
        n = this.organizeRawLocales(n),
        i = n.map,
        r = this.buildLocale(r || n.defaultCode, i).options,
        i = this.buildPluginHooks(e.plugins || [], _o);
      let s = (this.currentCalendarOptionsRefiners = Object.assign(
          Object.assign(
            Object.assign(Object.assign(Object.assign({}, an), cn), dn),
            i.listenerRefiners
          ),
          i.optionRefiners
        )),
        d = {};
      var o = pn([ln, r, e, t]);
      let a = {};
      var l,
        c = this.currentCalendarOptionsInput,
        u = this.currentCalendarOptionsRefined;
      let h = !1;
      for (l in o)
        -1 === this.optionsForRefining.indexOf(l) &&
        (o[l] === c[l] || (un[l] && l in c && un[l](c[l], o[l])))
          ? (a[l] = u[l])
          : s[l]
          ? ((a[l] = s[l](o[l])), (h = !0))
          : (d[l] = c[l]);
      return (
        h &&
          ((this.currentCalendarOptionsInput = o),
          (this.currentCalendarOptionsRefined = a),
          (this.stableOptionOverrides = e),
          (this.stableDynamicOptionOverrides = t)),
        this.optionsForHandling.push(...this.optionsForRefining),
        (this.optionsForRefining = []),
        {
          rawOptions: this.currentCalendarOptionsInput,
          refinedOptions: this.currentCalendarOptionsRefined,
          pluginHooks: i,
          availableLocaleData: n,
          localeDefaults: r,
          extra: d,
        }
      );
    }
    _computeCurrentViewData(e, t, n, r) {
      var i = t.viewSpecs[e];
      if (!i)
        throw new Error(
          `viewType "${e}" is not available. Please make sure you've loaded all neccessary plugins`
        );
      var { refinedOptions: n, extra: r } = this.processRawViewOptions(
          i,
          t.pluginHooks,
          t.localeDefaults,
          n,
          r
        ),
        r =
          (Lo(r),
          this.buildDateProfileGenerator({
            dateProfileGeneratorClass:
              i.optionDefaults.dateProfileGeneratorClass,
            duration: i.duration,
            durationUnit: i.durationUnit,
            usesMinMaxTime: i.optionDefaults.usesMinMaxTime,
            dateEnv: t.dateEnv,
            calendarApi: this.props.calendarApi,
            slotMinTime: n.slotMinTime,
            slotMaxTime: n.slotMaxTime,
            showNonCurrentDates: n.showNonCurrentDates,
            dayCount: n.dayCount,
            dateAlignment: n.dateAlignment,
            dateIncrement: n.dateIncrement,
            hiddenDays: n.hiddenDays,
            weekends: n.weekends,
            nowInput: n.now,
            validRangeInput: n.validRange,
            visibleRangeInput: n.visibleRange,
            fixedWeekCount: n.fixedWeekCount,
          }));
      return {
        viewSpec: i,
        options: n,
        dateProfileGenerator: r,
        viewApi: this.buildViewApi(e, this.getCurrentData, t.dateEnv),
      };
    }
    processRawViewOptions(e, t, n, d, u) {
      var r = pn([ln, e.optionDefaults, n, d, e.optionOverrides, u]);
      let i = Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(Object.assign(Object.assign({}, an), cn), dn),
              gn
            ),
            t.listenerRefiners
          ),
          t.optionRefiners
        ),
        s = {};
      var o,
        a = this.currentViewOptionsInput,
        h = this.currentViewOptionsRefined;
      let l = !1,
        c = {};
      for (o in r)
        r[o] === a[o] || (un[o] && un[o](r[o], a[o]))
          ? (s[o] = h[o])
          : (r[o] === this.currentCalendarOptionsInput[o] ||
            (un[o] && un[o](r[o], this.currentCalendarOptionsInput[o]))
              ? o in this.currentCalendarOptionsRefined &&
                (s[o] = this.currentCalendarOptionsRefined[o])
              : i[o]
              ? (s[o] = i[o](r[o]))
              : (c[o] = r[o]),
            (l = !0));
      return (
        l &&
          ((this.currentViewOptionsInput = r),
          (this.currentViewOptionsRefined = s)),
        {
          rawOptions: this.currentViewOptionsInput,
          refinedOptions: this.currentViewOptionsRefined,
          extra: c,
        }
      );
    }
  }
  function Oo(e, t, n, r, i, s, o, a) {
    t = so(t || o.defaultCode, o.map);
    return new fi({
      calendarSystem: "gregory",
      timeZone: e,
      namedTimeZoneImpl: s.namedTimeZonedImpl,
      locale: t,
      weekNumberCalculation: n,
      firstDay: r,
      weekText: i,
      cmdFormatter: s.cmdFormatter,
      defaultSeparator: a,
    });
  }
  function No(e, t) {
    let n = t.themeClasses[e.themeSystem] || co;
    return new n(e);
  }
  function Po(e) {
    let t = e.dateProfileGeneratorClass || zr;
    return new t(e);
  }
  function Ho(e, t, n) {
    return new xo(e, t, n);
  }
  function Bo(e) {
    return vt(e, (e) => e.ui);
  }
  function jo(e, t, n) {
    let r = { "": t };
    for (var i in e) {
      var s = e[i];
      s.sourceId && n[s.sourceId] && (r[i] = n[s.sourceId]);
    }
    return r;
  }
  function zo(e) {
    var t = e["options"];
    return {
      eventUiSingleBase: Tn(
        {
          display: t.eventDisplay,
          editable: t.editable,
          startEditable: t.eventStartEditable,
          durationEditable: t.eventDurationEditable,
          constraint: t.eventConstraint,
          overlap: "boolean" == typeof t.eventOverlap ? t.eventOverlap : void 0,
          allow: t.eventAllow,
          backgroundColor: t.eventBackgroundColor,
          borderColor: t.eventBorderColor,
          textColor: t.eventTextColor,
          color: t.eventColor,
        },
        e
      ),
      selectionConfig: Tn(
        {
          constraint: t.selectConstraint,
          overlap:
            "boolean" == typeof t.selectOverlap ? t.selectOverlap : void 0,
          allow: t.selectAllow,
        },
        e
      ),
    };
  }
  function Uo(e, t) {
    for (var n of t.pluginHooks.isLoadingFuncs) if (n(e)) return !0;
    return !1;
  }
  function Wo(e) {
    return zn(e.options.businessHours, e);
  }
  function Lo(e, t) {
    for (var n in e)
      console.warn(`Unknown option '${n}'` + (t ? ` for view '${t}'` : ""));
  }
  class Fo extends n {
    render() {
      return E(
        "div",
        { className: "fc-toolbar-chunk" },
        ...this.props.widgetGroups.map((e) => this.renderWidgetGroup(e))
      );
    }
    renderWidgetGroup(e) {
      var o,
        a = this["props"];
      let l = this.context["theme"],
        c = [],
        d = !0;
      for (o of e) {
        let {
          buttonName: t,
          buttonClick: n,
          buttonText: r,
          buttonIcon: i,
          buttonHint: s,
        } = o;
        if ("title" === t)
          (d = !1),
            c.push(
              E("h2", { className: "fc-toolbar-title", id: a.titleId }, a.title)
            );
        else {
          var u = t === a.activeButton,
            h =
              (!a.isTodayEnabled && "today" === t) ||
              (!a.isPrevEnabled && "prev" === t) ||
              (!a.isNextEnabled && "next" === t);
          let e = [`fc-${t}-button`, l.getClass("button")];
          u && e.push(l.getClass("buttonActive")),
            c.push(
              E(
                "button",
                {
                  type: "button",
                  title: "function" == typeof s ? s(a.navUnit) : s,
                  disabled: h,
                  "aria-pressed": u,
                  className: e.join(" "),
                  onClick: n,
                },
                r || (i ? E("span", { className: i }) : "")
              )
            );
        }
      }
      return 1 < c.length
        ? E("div", { className: (d && l.getClass("buttonGroup")) || "" }, ...c)
        : c[0];
    }
  }
  class Vo extends n {
    render() {
      var { model: e, extraClassName: t } = this.props;
      let n = !1,
        r,
        i;
      var e = e.sectionWidgets,
        s = e.center;
      (r = e.left ? ((n = !0), e.left) : e.start),
        (i = e.right ? ((n = !0), e.right) : e.end);
      let o = [t || "", "fc-toolbar", n ? "fc-toolbar-ltr" : ""];
      return E(
        "div",
        { className: o.join(" ") },
        this.renderSection("start", r || []),
        this.renderSection("center", s || []),
        this.renderSection("end", i || [])
      );
    }
    renderSection(e, t) {
      var n = this["props"];
      return E(Fo, {
        key: e,
        widgetGroups: t,
        title: n.title,
        navUnit: n.navUnit,
        activeButton: n.activeButton,
        isTodayEnabled: n.isTodayEnabled,
        isPrevEnabled: n.isPrevEnabled,
        isNextEnabled: n.isNextEnabled,
        titleId: n.titleId,
      });
    }
  }
  class Go extends n {
    constructor() {
      super(...arguments),
        (this.state = { availableWidth: null }),
        (this.handleEl = (e) => {
          (this.el = e), Hr(this.props.elRef, e), this.updateAvailableWidth();
        }),
        (this.handleResize = () => {
          this.updateAvailableWidth();
        });
    }
    render() {
      var { props: e, state: t } = this,
        n = e["aspectRatio"];
      let r = [
          "fc-view-harness",
          n || e.liquid || e.height
            ? "fc-view-harness-active"
            : "fc-view-harness-passive",
        ],
        i = "",
        s = "";
      return (
        n
          ? null !== t.availableWidth
            ? (i = t.availableWidth / n)
            : (s = (1 / n) * 100 + "%")
          : (i = e.height || ""),
        E(
          "div",
          {
            "aria-labelledby": e.labeledById,
            ref: this.handleEl,
            className: r.join(" "),
            style: { height: i, paddingBottom: s },
          },
          e.children
        )
      );
    }
    componentDidMount() {
      this.context.addResizeHandler(this.handleResize);
    }
    componentWillUnmount() {
      this.context.removeResizeHandler(this.handleResize);
    }
    updateAvailableWidth() {
      this.el &&
        this.props.aspectRatio &&
        this.setState({ availableWidth: this.el.offsetWidth });
    }
  }
  class Qo extends Si {
    constructor(e) {
      super(e),
        (this.handleSegClick = (t, n) => {
          let r = this["component"],
            i = r["context"];
          var s = Xr(n);
          if (s && r.isValidSegDownEl(t.target)) {
            let e = Te(t.target, ".fc-event-forced-url");
            var o = e ? e.querySelector("a[href]").href : "";
            i.emitter.trigger("eventClick", {
              el: n,
              event: new x(r.context, s.eventRange.def, s.eventRange.instance),
              jsEvent: t,
              view: i.viewApi,
            }),
              o && !t.defaultPrevented && (window.location.href = o);
          }
        }),
        (this.destroy = je(e.el, "click", ".fc-event", this.handleSegClick));
    }
  }
  class qo extends Si {
    constructor(e) {
      super(e),
        (this.handleEventElRemove = (e) => {
          e === this.currentSegEl &&
            this.handleSegLeave(null, this.currentSegEl);
        }),
        (this.handleSegEnter = (e, t) => {
          Xr(t) &&
            ((this.currentSegEl = t),
            this.triggerEvent("eventMouseEnter", e, t));
        }),
        (this.handleSegLeave = (e, t) => {
          this.currentSegEl &&
            ((this.currentSegEl = null),
            this.triggerEvent("eventMouseLeave", e, t));
        }),
        (this.removeHoverListeners = (function (e, t, r, i) {
          let s;
          return je(e, "mouseover", t, (e, n) => {
            if (n !== s) {
              (s = n), r(e, n);
              let t = (e) => {
                (s = null), i(e, n), n.removeEventListener("mouseleave", t);
              };
              n.addEventListener("mouseleave", t);
            }
          });
        })(e.el, ".fc-event", this.handleSegEnter, this.handleSegLeave));
    }
    destroy() {
      this.removeHoverListeners();
    }
    triggerEvent(e, t, n) {
      let r = this["component"],
        i = r["context"];
      var s = Xr(n);
      (t && !r.isValidSegDownEl(t.target)) ||
        i.emitter.trigger(e, {
          el: n,
          event: new x(i, s.eventRange.def, s.eventRange.instance),
          jsEvent: t,
          view: i.viewApi,
        });
    }
  }
  class Yo extends Pr {
    constructor() {
      super(...arguments),
        (this.buildViewContext = g(Nr)),
        (this.buildViewPropTransformers = g(Xo)),
        (this.buildToolbarProps = g(Zo)),
        (this.headerRef = c()),
        (this.footerRef = c()),
        (this.interactionsStore = {}),
        (this.state = { viewLabelId: He() }),
        (this.registerInteractiveComponent = (e, t) => {
          let n = {
            component: e,
            el: (t = t).el,
            useEventCenter: null == t.useEventCenter || t.useEventCenter,
            isHitComboAllowed: t.isHitComboAllowed || null,
          };
          let r = [Qo, qo],
            i = r.concat(this.props.pluginHooks.componentInteractions);
          t = i.map((e) => new e(n));
          (this.interactionsStore[e.uid] = t), (Di[e.uid] = n);
        }),
        (this.unregisterInteractiveComponent = (e) => {
          var t = this.interactionsStore[e.uid];
          if (t) {
            for (var n of t) n.destroy();
            delete this.interactionsStore[e.uid];
          }
          delete Di[e.uid];
        }),
        (this.resizeRunner = new ls(() => {
          this.props.emitter.trigger("_resize", !0),
            this.props.emitter.trigger("windowResize", {
              view: this.props.viewApi,
            });
        })),
        (this.handleWindowResize = (e) => {
          var t = this.props["options"];
          t.handleWindowResize &&
            e.target === window &&
            this.resizeRunner.request(t.windowResizeDelay);
        });
    }
    render() {
      var e = this["props"],
        { toolbarConfig: t, options: n } = e,
        r = this.buildToolbarProps(
          e.viewSpec,
          e.dateProfile,
          e.dateProfileGenerator,
          e.currentDate,
          jr(e.options.now, e.dateEnv),
          e.viewTitle
        );
      let i = !1,
        s = "",
        o;
      e.isHeightAuto || e.forPrint
        ? (s = "")
        : null != n.height
        ? (i = !0)
        : null != n.contentHeight
        ? (s = n.contentHeight)
        : (o = Math.max(n.aspectRatio, 0.5));
      var n = this.buildViewContext(
          e.viewSpec,
          e.viewApi,
          e.options,
          e.dateProfileGenerator,
          e.dateEnv,
          e.theme,
          e.pluginHooks,
          e.dispatch,
          e.getCurrentData,
          e.emitter,
          e.calendarApi,
          this.registerInteractiveComponent,
          this.unregisterInteractiveComponent
        ),
        a = t.header && t.header.hasTitle ? this.state.viewLabelId : "";
      return E(
        Or.Provider,
        { value: n },
        t.header &&
          E(
            Vo,
            Object.assign(
              {
                ref: this.headerRef,
                extraClassName: "fc-header-toolbar",
                model: t.header,
                titleId: a,
              },
              r
            )
          ),
        E(
          Go,
          { liquid: i, height: s, aspectRatio: o, labeledById: a },
          this.renderView(e),
          this.buildAppendContent()
        ),
        t.footer &&
          E(
            Vo,
            Object.assign(
              {
                ref: this.footerRef,
                extraClassName: "fc-footer-toolbar",
                model: t.footer,
                titleId: "",
              },
              r
            )
          )
      );
    }
    componentDidMount() {
      let t = this["props"],
        e = ((this.calendarInteractions =
          t.pluginHooks.calendarInteractions.map((e) => new e(t))),
        window.addEventListener("resize", this.handleWindowResize),
        t.pluginHooks)["propSetHandlers"];
      for (var n in e) e[n](t[n], t);
    }
    componentDidUpdate(e) {
      var t,
        n = this["props"];
      let r = n.pluginHooks["propSetHandlers"];
      for (t in r) n[t] !== e[t] && r[t](n[t], n);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleWindowResize),
        this.resizeRunner.clear();
      for (var e of this.calendarInteractions) e.destroy();
      this.props.emitter.trigger("_unmount");
    }
    buildAppendContent() {
      let t = this["props"];
      return E(R, {}, ...t.pluginHooks.viewContainerAppends.map((e) => e(t)));
    }
    renderView(e) {
      var t,
        n = e["pluginHooks"],
        r = e["viewSpec"],
        i = {
          dateProfile: e.dateProfile,
          businessHours: e.businessHours,
          eventStore: e.renderableEventStore,
          eventUiBases: e.eventUiBases,
          dateSelection: e.dateSelection,
          eventSelection: e.eventSelection,
          eventDrag: e.eventDrag,
          eventResize: e.eventResize,
          isHeightAuto: e.isHeightAuto,
          forPrint: e.forPrint,
        };
      for (t of this.buildViewPropTransformers(n.viewPropsTransformers))
        Object.assign(i, t.transform(i, e));
      return E(r.component, Object.assign({}, i));
    }
  }
  function Zo(e, t, n, r, i, s) {
    var o = n.build(i, void 0, !1),
      a = n.buildPrev(t, r, !1),
      n = n.buildNext(t, r, !1);
    return {
      title: s,
      activeButton: e.type,
      navUnit: e.singleUnit,
      isTodayEnabled: o.isValid && !or(t.currentRange, i),
      isPrevEnabled: a.isValid,
      isNextEnabled: n.isValid,
    };
  }
  function Xo(e) {
    return e.map((e) => new e());
  }
  function Jo(e) {
    var t = so(e.locale || "en", io([]).map);
    return new fi(
      Object.assign(
        Object.assign({ timeZone: ln.timeZone, calendarSystem: "gregory" }, e),
        { locale: t }
      )
    );
  }
  Ci.touchMouseIgnoreWait = 500;
  let $o = 0,
    Ko = 0,
    ea = !1;
  class ta {
    constructor(e) {
      (this.subjectEl = null),
        (this.selector = ""),
        (this.handleSelector = ""),
        (this.shouldIgnoreMove = !1),
        (this.shouldWatchScroll = !0),
        (this.isDragging = !1),
        (this.isTouchDragging = !1),
        (this.wasTouchScroll = !1),
        (this.handleMouseDown = (e) => {
          var t;
          this.shouldIgnoreMouse() ||
            0 !== (t = e).button ||
            t.ctrlKey ||
            !this.tryStart(e) ||
            ((t = this.createEventFromMouse(e, !0)),
            this.emitter.trigger("pointerdown", t),
            this.initScrollWatch(t),
            this.shouldIgnoreMove ||
              document.addEventListener("mousemove", this.handleMouseMove),
            document.addEventListener("mouseup", this.handleMouseUp));
        }),
        (this.handleMouseMove = (e) => {
          e = this.createEventFromMouse(e);
          this.recordCoords(e), this.emitter.trigger("pointermove", e);
        }),
        (this.handleMouseUp = (e) => {
          document.removeEventListener("mousemove", this.handleMouseMove),
            document.removeEventListener("mouseup", this.handleMouseUp),
            this.emitter.trigger("pointerup", this.createEventFromMouse(e)),
            this.cleanup();
        }),
        (this.handleTouchStart = (t) => {
          if (this.tryStart(t)) {
            this.isTouchDragging = !0;
            var n = this.createEventFromTouch(t, !0);
            this.emitter.trigger("pointerdown", n), this.initScrollWatch(n);
            let e = t.target;
            this.shouldIgnoreMove ||
              e.addEventListener("touchmove", this.handleTouchMove),
              e.addEventListener("touchend", this.handleTouchEnd),
              e.addEventListener("touchcancel", this.handleTouchEnd),
              window.addEventListener("scroll", this.handleTouchScroll, !0);
          }
        }),
        (this.handleTouchMove = (e) => {
          e = this.createEventFromTouch(e);
          this.recordCoords(e), this.emitter.trigger("pointermove", e);
        }),
        (this.handleTouchEnd = (t) => {
          if (this.isDragging) {
            let e = t.target;
            e.removeEventListener("touchmove", this.handleTouchMove),
              e.removeEventListener("touchend", this.handleTouchEnd),
              e.removeEventListener("touchcancel", this.handleTouchEnd),
              window.removeEventListener("scroll", this.handleTouchScroll, !0),
              this.emitter.trigger("pointerup", this.createEventFromTouch(t)),
              this.cleanup(),
              (this.isTouchDragging = !1),
              ($o += 1),
              setTimeout(() => {
                --$o;
              }, Ci.touchMouseIgnoreWait);
          }
        }),
        (this.handleTouchScroll = () => {
          this.wasTouchScroll = !0;
        }),
        (this.handleScroll = (e) => {
          var t, n;
          this.shouldIgnoreMove ||
            ((t = window.pageXOffset - this.prevScrollX + this.prevPageX),
            (n = window.pageYOffset - this.prevScrollY + this.prevPageY),
            this.emitter.trigger("pointermove", {
              origEvent: e,
              isTouch: this.isTouchDragging,
              subjectEl: this.subjectEl,
              pageX: t,
              pageY: n,
              deltaX: t - this.origPageX,
              deltaY: n - this.origPageY,
            }));
        }),
        (this.containerEl = e),
        (this.emitter = new Ar()),
        e.addEventListener("mousedown", this.handleMouseDown),
        e.addEventListener("touchstart", this.handleTouchStart, {
          passive: !0,
        }),
        1 === (Ko += 1) &&
          window.addEventListener("touchmove", na, { passive: !1 });
    }
    destroy() {
      this.containerEl.removeEventListener("mousedown", this.handleMouseDown),
        this.containerEl.removeEventListener(
          "touchstart",
          this.handleTouchStart,
          { passive: !0 }
        ),
        --Ko || window.removeEventListener("touchmove", na, { passive: !1 });
    }
    tryStart(e) {
      var t = this.querySubjectEl(e),
        e = e.target;
      return (
        !(!t || (this.handleSelector && !Te(e, this.handleSelector))) &&
        ((this.subjectEl = t),
        (this.isDragging = !0),
        !(this.wasTouchScroll = !1))
      );
    }
    cleanup() {
      (ea = !1),
        (this.isDragging = !1),
        (this.subjectEl = null),
        this.destroyScrollWatch();
    }
    querySubjectEl(e) {
      return this.selector ? Te(e.target, this.selector) : this.containerEl;
    }
    shouldIgnoreMouse() {
      return $o || this.isTouchDragging;
    }
    cancelTouchScroll() {
      this.isDragging && (ea = !0);
    }
    initScrollWatch(e) {
      this.shouldWatchScroll &&
        (this.recordCoords(e),
        window.addEventListener("scroll", this.handleScroll, !0));
    }
    recordCoords(e) {
      this.shouldWatchScroll &&
        ((this.prevPageX = e.pageX),
        (this.prevPageY = e.pageY),
        (this.prevScrollX = window.pageXOffset),
        (this.prevScrollY = window.pageYOffset));
    }
    destroyScrollWatch() {
      this.shouldWatchScroll &&
        window.removeEventListener("scroll", this.handleScroll, !0);
    }
    createEventFromMouse(e, t) {
      let n = 0,
        r = 0;
      return (
        t
          ? ((this.origPageX = e.pageX), (this.origPageY = e.pageY))
          : ((n = e.pageX - this.origPageX), (r = e.pageY - this.origPageY)),
        {
          origEvent: e,
          isTouch: !1,
          subjectEl: this.subjectEl,
          pageX: e.pageX,
          pageY: e.pageY,
          deltaX: n,
          deltaY: r,
        }
      );
    }
    createEventFromTouch(e, t) {
      var n = e.touches;
      let r,
        i,
        s = 0,
        o = 0;
      return (
        (i =
          n && n.length
            ? ((r = n[0].pageX), n[0].pageY)
            : ((r = e.pageX), e.pageY)),
        t
          ? ((this.origPageX = r), (this.origPageY = i))
          : ((s = r - this.origPageX), (o = i - this.origPageY)),
        {
          origEvent: e,
          isTouch: !0,
          subjectEl: this.subjectEl,
          pageX: r,
          pageY: i,
          deltaX: s,
          deltaY: o,
        }
      );
    }
  }
  function na(e) {
    ea && e.preventDefault();
  }
  class ra {
    constructor() {
      (this.isVisible = !1),
        (this.sourceEl = null),
        (this.mirrorEl = null),
        (this.sourceElRect = null),
        (this.parentNode = document.body),
        (this.zIndex = 9999),
        (this.revertDuration = 0);
    }
    start(e, t, n) {
      (this.sourceEl = e),
        (this.sourceElRect = this.sourceEl.getBoundingClientRect()),
        (this.origScreenX = t - window.pageXOffset),
        (this.origScreenY = n - window.pageYOffset),
        (this.deltaX = 0),
        (this.deltaY = 0),
        this.updateElPosition();
    }
    handleMove(e, t) {
      (this.deltaX = e - window.pageXOffset - this.origScreenX),
        (this.deltaY = t - window.pageYOffset - this.origScreenY),
        this.updateElPosition();
    }
    setIsVisible(e) {
      e
        ? this.isVisible ||
          (this.mirrorEl && (this.mirrorEl.style.display = ""),
          (this.isVisible = e),
          this.updateElPosition())
        : this.isVisible &&
          (this.mirrorEl && (this.mirrorEl.style.display = "none"),
          (this.isVisible = e));
    }
    stop(e, t) {
      var n = () => {
        this.cleanup(), t();
      };
      e &&
      this.mirrorEl &&
      this.isVisible &&
      this.revertDuration &&
      (this.deltaX || this.deltaY)
        ? this.doRevertAnimation(n, this.revertDuration)
        : setTimeout(n, 0);
    }
    doRevertAnimation(e, t) {
      let n = this.mirrorEl;
      var r = this.sourceEl.getBoundingClientRect();
      (n.style.transition = "top " + t + "ms,left " + t + "ms"),
        Ie(n, { left: r.left, top: r.top }),
        Ue(n, () => {
          (n.style.transition = ""), e();
        });
    }
    cleanup() {
      this.mirrorEl && (xe(this.mirrorEl), (this.mirrorEl = null)),
        (this.sourceEl = null);
    }
    updateElPosition() {
      this.sourceEl &&
        this.isVisible &&
        Ie(this.getMirrorEl(), {
          left: this.sourceElRect.left + this.deltaX,
          top: this.sourceElRect.top + this.deltaY,
        });
    }
    getMirrorEl() {
      var e = this.sourceElRect;
      let t = this.mirrorEl;
      return (
        t ||
          (((t = this.mirrorEl = this.sourceEl.cloneNode(!0)).style.userSelect =
            "none"),
          t.classList.add("fc-event-dragging"),
          Ie(t, {
            position: "fixed",
            zIndex: this.zIndex,
            visibility: "",
            boxSizing: "border-box",
            width: e.right - e.left,
            height: e.bottom - e.top,
            right: "auto",
            bottom: "auto",
            margin: 0,
          }),
          this.parentNode.appendChild(t)),
        t
      );
    }
  }
  class ia extends Cr {
    constructor(e, t) {
      super(),
        (this.handleScroll = () => {
          (this.scrollTop = this.scrollController.getScrollTop()),
            (this.scrollLeft = this.scrollController.getScrollLeft()),
            this.handleScrollChange();
        }),
        (this.scrollController = e),
        (this.doesListening = t),
        (this.scrollTop = this.origScrollTop = e.getScrollTop()),
        (this.scrollLeft = this.origScrollLeft = e.getScrollLeft()),
        (this.scrollWidth = e.getScrollWidth()),
        (this.scrollHeight = e.getScrollHeight()),
        (this.clientWidth = e.getClientWidth()),
        (this.clientHeight = e.getClientHeight()),
        (this.clientRect = this.computeClientRect()),
        this.doesListening &&
          this.getEventTarget().addEventListener("scroll", this.handleScroll);
    }
    destroy() {
      this.doesListening &&
        this.getEventTarget().removeEventListener("scroll", this.handleScroll);
    }
    getScrollTop() {
      return this.scrollTop;
    }
    getScrollLeft() {
      return this.scrollLeft;
    }
    setScrollTop(e) {
      this.scrollController.setScrollTop(e),
        this.doesListening ||
          ((this.scrollTop = Math.max(Math.min(e, this.getMaxScrollTop()), 0)),
          this.handleScrollChange());
    }
    setScrollLeft(e) {
      this.scrollController.setScrollLeft(e),
        this.doesListening ||
          ((this.scrollLeft = Math.max(
            Math.min(e, this.getMaxScrollLeft()),
            0
          )),
          this.handleScrollChange());
    }
    getClientWidth() {
      return this.clientWidth;
    }
    getClientHeight() {
      return this.clientHeight;
    }
    getScrollWidth() {
      return this.scrollWidth;
    }
    getScrollHeight() {
      return this.scrollHeight;
    }
    handleScrollChange() {}
  }
  class sa extends ia {
    constructor(e, t) {
      super(new Rr(e), t);
    }
    getEventTarget() {
      return this.scrollController.el;
    }
    computeClientRect() {
      return yr(this.scrollController.el);
    }
  }
  class oa extends ia {
    constructor(e) {
      super(new xr(), e);
    }
    getEventTarget() {
      return window;
    }
    computeClientRect() {
      return {
        left: this.scrollLeft,
        right: this.scrollLeft + this.clientWidth,
        top: this.scrollTop,
        bottom: this.scrollTop + this.clientHeight,
      };
    }
    handleScrollChange() {
      this.clientRect = this.computeClientRect();
    }
  }
  const aa = ("function" == typeof performance ? performance : Date).now;
  class la {
    constructor() {
      (this.isEnabled = !0),
        (this.scrollQuery = [window, ".fc-scroller"]),
        (this.edgeThreshold = 50),
        (this.maxVelocity = 300),
        (this.pointerScreenX = null),
        (this.pointerScreenY = null),
        (this.isAnimating = !1),
        (this.scrollCaches = null),
        (this.everMovedUp = !1),
        (this.everMovedDown = !1),
        (this.everMovedLeft = !1),
        (this.everMovedRight = !1),
        (this.animate = () => {
          var e, t;
          this.isAnimating &&
            ((e = this.computeBestEdge(
              this.pointerScreenX + window.pageXOffset,
              this.pointerScreenY + window.pageYOffset
            ))
              ? ((t = aa()),
                this.handleSide(e, (t - this.msSinceRequest) / 1e3),
                this.requestAnimation(t))
              : (this.isAnimating = !1));
        });
    }
    start(e, t, n) {
      this.isEnabled &&
        ((this.scrollCaches = this.buildCaches(n)),
        (this.pointerScreenX = null),
        (this.pointerScreenY = null),
        (this.everMovedUp = !1),
        (this.everMovedDown = !1),
        (this.everMovedLeft = !1),
        (this.everMovedRight = !1),
        this.handleMove(e, t));
    }
    handleMove(e, t) {
      var n, r;
      this.isEnabled &&
        ((e = e - window.pageXOffset),
        (t = t - window.pageYOffset),
        (n = null === this.pointerScreenY ? 0 : t - this.pointerScreenY),
        (r = null === this.pointerScreenX ? 0 : e - this.pointerScreenX),
        n < 0 ? (this.everMovedUp = !0) : 0 < n && (this.everMovedDown = !0),
        r < 0 ? (this.everMovedLeft = !0) : 0 < r && (this.everMovedRight = !0),
        (this.pointerScreenX = e),
        (this.pointerScreenY = t),
        this.isAnimating ||
          ((this.isAnimating = !0), this.requestAnimation(aa())));
    }
    stop() {
      if (this.isEnabled) {
        this.isAnimating = !1;
        for (var e of this.scrollCaches) e.destroy();
        this.scrollCaches = null;
      }
    }
    requestAnimation(e) {
      (this.msSinceRequest = e), requestAnimationFrame(this.animate);
    }
    handleSide(e, t) {
      let n = e["scrollCache"];
      var r = this["edgeThreshold"],
        i = r - e.distance,
        s = ((i * i) / (r * r)) * this.maxVelocity * t;
      let o = 1;
      switch (e.name) {
        case "left":
          o = -1;
        case "right":
          n.setScrollLeft(n.getScrollLeft() + s * o);
          break;
        case "top":
          o = -1;
        case "bottom":
          n.setScrollTop(n.getScrollTop() + s * o);
      }
    }
    computeBestEdge(e, t) {
      var n,
        r = this["edgeThreshold"];
      let i = null;
      for (n of this.scrollCaches || []) {
        var s = n.clientRect,
          o = e - s.left,
          a = s.right - e,
          l = t - s.top,
          s = s.bottom - t;
        0 <= o &&
          0 <= a &&
          0 <= l &&
          0 <= s &&
          (l <= r &&
            this.everMovedUp &&
            n.canScrollUp() &&
            (!i || i.distance > l) &&
            (i = { scrollCache: n, name: "top", distance: l }),
          s <= r &&
            this.everMovedDown &&
            n.canScrollDown() &&
            (!i || i.distance > s) &&
            (i = { scrollCache: n, name: "bottom", distance: s }),
          o <= r &&
            this.everMovedLeft &&
            n.canScrollLeft() &&
            (!i || i.distance > o) &&
            (i = { scrollCache: n, name: "left", distance: o }),
          a <= r &&
            this.everMovedRight &&
            n.canScrollRight() &&
            (!i || i.distance > a) &&
            (i = { scrollCache: n, name: "right", distance: a }));
      }
      return i;
    }
    buildCaches(e) {
      return this.queryScrollEls(e).map((e) =>
        e === window ? new oa(!1) : new sa(e, !1)
      );
    }
    queryScrollEls(e) {
      let t = [];
      for (var n of this.scrollQuery)
        "object" == typeof n
          ? t.push(n)
          : t.push(
              ...Array.prototype.slice.call(e.getRootNode().querySelectorAll(n))
            );
      return t;
    }
  }
  class ca extends wi {
    constructor(e, t) {
      super(e),
        (this.containerEl = e),
        (this.delay = null),
        (this.minDistance = 0),
        (this.touchScrollAllowed = !0),
        (this.mirrorNeedsRevert = !1),
        (this.isInteracting = !1),
        (this.isDragging = !1),
        (this.isDelayEnded = !1),
        (this.isDistanceSurpassed = !1),
        (this.delayTimeoutId = null),
        (this.onPointerDown = (e) => {
          this.isDragging ||
            ((this.isInteracting = !0),
            (this.isDelayEnded = !1),
            (this.isDistanceSurpassed = !1),
            qe(document.body),
            Ze(document.body),
            e.isTouch || e.origEvent.preventDefault(),
            this.emitter.trigger("pointerdown", e),
            this.isInteracting &&
              !this.pointer.shouldIgnoreMove &&
              (this.mirror.setIsVisible(!1),
              this.mirror.start(e.subjectEl, e.pageX, e.pageY),
              this.startDelay(e),
              this.minDistance || this.handleDistanceSurpassed(e)));
        }),
        (this.onPointerMove = (e) => {
          var t, n, r;
          this.isInteracting &&
            (this.emitter.trigger("pointermove", e),
            this.isDistanceSurpassed ||
              (({ deltaX: n, deltaY: r } = e),
              (t = this.minDistance) * t <= n * n + r * r &&
                this.handleDistanceSurpassed(e)),
            this.isDragging &&
              ("scroll" !== e.origEvent.type &&
                (this.mirror.handleMove(e.pageX, e.pageY),
                this.autoScroller.handleMove(e.pageX, e.pageY)),
              this.emitter.trigger("dragmove", e)));
        }),
        (this.onPointerUp = (e) => {
          this.isInteracting &&
            ((this.isInteracting = !1),
            Ye(document.body),
            Xe(document.body),
            this.emitter.trigger("pointerup", e),
            this.isDragging && (this.autoScroller.stop(), this.tryStopDrag(e)),
            this.delayTimeoutId &&
              (clearTimeout(this.delayTimeoutId),
              (this.delayTimeoutId = null)));
        });
      let n = (this.pointer = new ta(e));
      n.emitter.on("pointerdown", this.onPointerDown),
        n.emitter.on("pointermove", this.onPointerMove),
        n.emitter.on("pointerup", this.onPointerUp),
        t && (n.selector = t),
        (this.mirror = new ra()),
        (this.autoScroller = new la());
    }
    destroy() {
      this.pointer.destroy(), this.onPointerUp({});
    }
    startDelay(e) {
      "number" == typeof this.delay
        ? (this.delayTimeoutId = setTimeout(() => {
            (this.delayTimeoutId = null), this.handleDelayEnd(e);
          }, this.delay))
        : this.handleDelayEnd(e);
    }
    handleDelayEnd(e) {
      (this.isDelayEnded = !0), this.tryStartDrag(e);
    }
    handleDistanceSurpassed(e) {
      (this.isDistanceSurpassed = !0), this.tryStartDrag(e);
    }
    tryStartDrag(e) {
      this.isDelayEnded &&
        this.isDistanceSurpassed &&
        ((this.pointer.wasTouchScroll && !this.touchScrollAllowed) ||
          ((this.isDragging = !0),
          (this.mirrorNeedsRevert = !1),
          this.autoScroller.start(e.pageX, e.pageY, this.containerEl),
          this.emitter.trigger("dragstart", e),
          !1 === this.touchScrollAllowed && this.pointer.cancelTouchScroll()));
    }
    tryStopDrag(e) {
      this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, e));
    }
    stopDrag(e) {
      (this.isDragging = !1), this.emitter.trigger("dragend", e);
    }
    setIgnoreMove(e) {
      this.pointer.shouldIgnoreMove = e;
    }
    setMirrorIsVisible(e) {
      this.mirror.setIsVisible(e);
    }
    setMirrorNeedsRevert(e) {
      this.mirrorNeedsRevert = e;
    }
    setAutoScrollEnabled(e) {
      this.autoScroller.isEnabled = e;
    }
  }
  class da {
    constructor(e) {
      (this.origRect = br(e)),
        (this.scrollCaches = Er(e).map((e) => new sa(e, !0)));
    }
    destroy() {
      for (var e of this.scrollCaches) e.destroy();
    }
    computeLeft() {
      let e = this.origRect.left;
      for (var t of this.scrollCaches)
        e += t.origScrollLeft - t.getScrollLeft();
      return e;
    }
    computeTop() {
      let e = this.origRect.top;
      for (var t of this.scrollCaches) e += t.origScrollTop - t.getScrollTop();
      return e;
    }
    isWithinClipping(e, t) {
      var n,
        r = { left: e, top: t };
      for (n of this.scrollCaches)
        if (
          !(function (e) {
            e = e.tagName;
            return "HTML" === e || "BODY" === e;
          })(n.getEventTarget()) &&
          !Vn(r, n.clientRect)
        )
          return !1;
      return !0;
    }
  }
  class ua {
    constructor(e, t) {
      (this.useSubjectCenter = !1),
        (this.requireInitial = !0),
        (this.initialHit = null),
        (this.movingHit = null),
        (this.finalHit = null),
        (this.handlePointerDown = (e) => {
          let t = this["dragging"];
          (this.initialHit = null),
            (this.movingHit = null),
            (this.finalHit = null),
            this.prepareHits(),
            this.processFirstCoord(e),
            this.initialHit || !this.requireInitial
              ? (t.setIgnoreMove(!1), this.emitter.trigger("pointerdown", e))
              : t.setIgnoreMove(!0);
        }),
        (this.handleDragStart = (e) => {
          this.emitter.trigger("dragstart", e), this.handleMove(e, !0);
        }),
        (this.handleDragMove = (e) => {
          this.emitter.trigger("dragmove", e), this.handleMove(e);
        }),
        (this.handlePointerUp = (e) => {
          this.releaseHits(), this.emitter.trigger("pointerup", e);
        }),
        (this.handleDragEnd = (e) => {
          this.movingHit && this.emitter.trigger("hitupdate", null, !0, e),
            (this.finalHit = this.movingHit),
            (this.movingHit = null),
            this.emitter.trigger("dragend", e);
        }),
        (this.droppableStore = t),
        e.emitter.on("pointerdown", this.handlePointerDown),
        e.emitter.on("dragstart", this.handleDragStart),
        e.emitter.on("dragmove", this.handleDragMove),
        e.emitter.on("pointerup", this.handlePointerUp),
        e.emitter.on("dragend", this.handleDragEnd),
        (this.dragging = e),
        (this.emitter = new Ar());
    }
    processFirstCoord(e) {
      var t = { left: e.pageX, top: e.pageY };
      let n = t;
      e = e.subjectEl;
      let r;
      e instanceof HTMLElement && ((r = br(e)), (n = Qn(n, r)));
      var e = (this.initialHit = this.queryHitForOffset(n.left, n.top));
      e
        ? (this.useSubjectCenter && r && (e = Gn(r, e.rect)) && (n = qn(e)),
          (this.coordAdjust = Yn(n, t)))
        : (this.coordAdjust = { left: 0, top: 0 });
    }
    handleMove(e, t) {
      var n = this.queryHitForOffset(
        e.pageX + this.coordAdjust.left,
        e.pageY + this.coordAdjust.top
      );
      (!t && ha(this.movingHit, n)) ||
        ((this.movingHit = n), this.emitter.trigger("hitupdate", n, !1, e));
    }
    prepareHits() {
      this.offsetTrackers = vt(
        this.droppableStore,
        (e) => (e.component.prepareHits(), new da(e.el))
      );
    }
    releaseHits() {
      let e = this["offsetTrackers"];
      for (var t in e) e[t].destroy();
      this.offsetTrackers = {};
    }
    queryHitForOffset(n, r) {
      var i,
        { droppableStore: s, offsetTrackers: h } = this;
      let o = null;
      for (i in s) {
        let t = s[i].component,
          e = h[i];
        if (e && e.isWithinClipping(n, r)) {
          var a = e.computeLeft(),
            l = e.computeTop(),
            c = n - a,
            d = r - l,
            u = e["origRect"],
            f = u.right - u.left,
            u = u.bottom - u.top;
          if (0 <= c && c < f && 0 <= d && d < u) {
            let e = t.queryHit(c, d, f, u);
            e &&
              sr(e.dateProfile.activeRange, e.dateSpan.range) &&
              (!o || e.layer > o.layer) &&
              ((e.componentId = i),
              (e.context = t.context),
              (e.rect.left += a),
              (e.rect.right += a),
              (e.rect.top += l),
              (e.rect.bottom += l),
              (o = e));
          }
        }
      }
      return o;
    }
  }
  function ha(e, t) {
    return (
      (!e && !t) || (Boolean(e) === Boolean(t) && ai(e.dateSpan, t.dateSpan))
    );
  }
  function fa(e, t) {
    var n,
      r,
      i,
      s = {};
    for (n of t.pluginHooks.datePointTransforms) Object.assign(s, n(e, t));
    return (
      Object.assign(
        s,
        ((r = e),
        {
          date: (i = t.dateEnv).toDate(r.range.start),
          dateStr: i.formatIso(r.range.start, { omitTime: r.allDay }),
          allDay: r.allDay,
        })
      ),
      s
    );
  }
  class ga extends Si {
    constructor(e) {
      super(e),
        (this.handlePointerDown = (e) => {
          let t = this["dragging"];
          e = e.origEvent.target;
          t.setIgnoreMove(!this.component.isValidDateDownEl(e));
        }),
        (this.handleDragEnd = (t) => {
          var n = this["component"],
            r = this.dragging["pointer"];
          if (!r.wasTouchScroll) {
            var { initialHit: r, finalHit: i } = this.hitDragging;
            if (r && i && ha(r, i)) {
              let e = n["context"];
              i = Object.assign(Object.assign({}, fa(r.dateSpan, e)), {
                dayEl: r.dayEl,
                jsEvent: t.origEvent,
                view: e.viewApi || e.calendarApi.view,
              });
              e.emitter.trigger("dateClick", i);
            }
          }
        }),
        (this.dragging = new ca(e.el)),
        (this.dragging.autoScroller.isEnabled = !1);
      let t = (this.hitDragging = new ua(this.dragging, Ai(e)));
      t.emitter.on("pointerdown", this.handlePointerDown),
        t.emitter.on("dragend", this.handleDragEnd);
    }
    destroy() {
      this.dragging.destroy();
    }
  }
  class pa extends Si {
    constructor(e) {
      super(e),
        (this.dragSelection = null),
        (this.handlePointerDown = (e) => {
          let { component: t, dragging: n } = this;
          var r = t.context["options"],
            r = r.selectable && t.isValidDateDownEl(e.origEvent.target);
          n.setIgnoreMove(!r),
            (n.delay = e.isTouch
              ? (function (e) {
                  let t = e.context["options"],
                    n = t.selectLongPressDelay;
                  null == n && (n = t.longPressDelay);
                  return n;
                })(t)
              : null);
        }),
        (this.handleDragStart = (e) => {
          this.component.context.calendarApi.unselect(e);
        }),
        (this.handleHitUpdate = (e, t) => {
          let n = this.component["context"],
            r = null,
            i = !1;
          var s, o;
          e &&
            ((s = this.hitDragging.initialHit),
            (o =
              e.componentId === s.componentId &&
              this.isHitComboAllowed &&
              !this.isHitComboAllowed(s, e)),
            ((r = o
              ? r
              : (function (e, t, n) {
                  let r = e.dateSpan,
                    i = t.dateSpan,
                    s = [
                      r.range.start,
                      r.range.end,
                      i.range.start,
                      i.range.end,
                    ],
                    o = (s.sort(nt), {});
                  for (var a of n) {
                    a = a(e, t);
                    if (!1 === a) return null;
                    a && Object.assign(o, a);
                  }
                  return (
                    (o.range = { start: s[0], end: s[3] }),
                    (o.allDay = r.allDay),
                    o
                  );
                })(s, e, n.pluginHooks.dateSelectionTransformers)) &&
              ts(r, e.dateProfile, n)) ||
              ((i = !0), (r = null))),
            r
              ? n.dispatch({ type: "SELECT_DATES", selection: r })
              : t || n.dispatch({ type: "UNSELECT_DATES" }),
            (i ? Ge : Qe)(),
            t || (this.dragSelection = r);
        }),
        (this.handlePointerUp = (e) => {
          this.dragSelection &&
            (Ur(this.dragSelection, e, this.component.context),
            (this.dragSelection = null));
        });
      var t = e["component"],
        t = t.context["options"];
      let n = (this.dragging = new ca(e.el)),
        r =
          ((n.touchScrollAllowed = !1),
          (n.minDistance = t.selectMinDistance || 0),
          (n.autoScroller.isEnabled = t.dragScroll),
          (this.hitDragging = new ua(this.dragging, Ai(e))));
      r.emitter.on("pointerdown", this.handlePointerDown),
        r.emitter.on("dragstart", this.handleDragStart),
        r.emitter.on("hitupdate", this.handleHitUpdate),
        r.emitter.on("pointerup", this.handlePointerUp);
    }
    destroy() {
      this.dragging.destroy();
    }
  }
  class va extends Si {
    constructor(e) {
      super(e),
        (this.subjectEl = null),
        (this.subjectSeg = null),
        (this.isDragging = !1),
        (this.eventRange = null),
        (this.relevantEvents = null),
        (this.receivingContext = null),
        (this.validMutation = null),
        (this.mutatedRelevantEvents = null),
        (this.handlePointerDown = (e) => {
          var t = e.origEvent.target;
          let { component: n, dragging: r } = this,
            i = r["mirror"];
          var s = n.context["options"];
          let o = n.context;
          this.subjectEl = e.subjectEl;
          var a = (this.subjectSeg = Xr(e.subjectEl)),
            a = (this.eventRange = a.eventRange).instance.instanceId,
            a =
              ((this.relevantEvents = Sn(o.getCurrentData().eventStore, a)),
              (r.minDistance = e.isTouch ? 0 : s.eventDragMinDistance),
              (r.delay =
                e.isTouch && a !== n.props.eventSelection
                  ? (function (e) {
                      let t = e.context["options"],
                        n = t.eventLongPressDelay;
                      null == n && (n = t.longPressDelay);
                      return n;
                    })(n)
                  : null),
              s.fixedMirrorParent
                ? (i.parentNode = s.fixedMirrorParent)
                : (i.parentNode = Te(t, ".fc")),
              (i.revertDuration = s.dragRevertDuration),
              n.isValidSegDownEl(t) && !Te(t, ".fc-event-resizer"));
          r.setIgnoreMove(!a),
            (this.isDragging =
              a && e.subjectEl.classList.contains("fc-event-draggable"));
        }),
        (this.handleDragStart = (e) => {
          let t = this.component.context;
          var n = this.eventRange,
            r = n.instance.instanceId;
          e.isTouch
            ? r !== this.component.props.eventSelection &&
              t.dispatch({ type: "SELECT_EVENT", eventInstanceId: r })
            : t.dispatch({ type: "UNSELECT_EVENT" }),
            this.isDragging &&
              (t.calendarApi.unselect(e),
              t.emitter.trigger("eventDragStart", {
                el: this.subjectEl,
                event: new x(t, n.def, n.instance),
                jsEvent: e.origEvent,
                view: t.viewApi,
              }));
        }),
        (this.handleHitUpdate = (s, o) => {
          if (this.isDragging) {
            var a,
              l = this.relevantEvents,
              c = this.hitDragging.initialHit,
              d = this.component.context;
            let e = null,
              t = null,
              n = null,
              r = !1,
              i = { affectedEvents: l, mutatedEvents: An(), isEvent: !0 };
            s &&
              ((a = (e = s.context).options),
              d === e || (a.editable && a.droppable)
                ? (t = (function (e, t, n) {
                    let r = e.dateSpan,
                      i = t.dateSpan,
                      s = r.range.start,
                      o = i.range.start,
                      a = {};
                    r.allDay !== i.allDay &&
                      ((a.allDay = i.allDay),
                      (a.hasEnd = t.context.options.allDayMaintainDuration),
                      i.allDay && (s = v(s)));
                    var l = Fn(
                      s,
                      o,
                      e.context.dateEnv,
                      e.componentId === t.componentId ? e.largeUnit : null
                    );
                    l.milliseconds && (a.allDay = !1);
                    var c = { datesDelta: l, standardProps: a };
                    for (var d of n) d(c, e, t);
                    return c;
                  })(
                    c,
                    s,
                    e.getCurrentData().pluginHooks.eventDragMutationMassagers
                  )) &&
                  ((n = Fr(l, e.getCurrentData().eventUiBases, t, e)),
                  (i.mutatedEvents = n),
                  es(i, s.dateProfile, e) ||
                    ((r = !0),
                    (t = null),
                    (n = null),
                    (i.mutatedEvents = An())))
                : (e = null)),
              this.displayDrag(e, i),
              (r ? Ge : Qe)(),
              o ||
                (d === e && ha(c, s) && (t = null),
                this.dragging.setMirrorNeedsRevert(!t),
                this.dragging.setMirrorIsVisible(
                  !s ||
                    !this.subjectEl
                      .getRootNode()
                      .querySelector(".fc-event-mirror")
                ),
                (this.receivingContext = e),
                (this.validMutation = t),
                (this.mutatedRelevantEvents = n));
          }
        }),
        (this.handlePointerUp = () => {
          this.isDragging || this.cleanup();
        }),
        (this.handleDragEnd = (s) => {
          if (this.isDragging) {
            let e = this.component.context;
            var o = e.viewApi;
            let { receivingContext: t, validMutation: n } = this;
            var a = this.eventRange.def,
              l = this.eventRange.instance,
              c = new x(e, a, l);
            let r = this.relevantEvents,
              i = this.mutatedRelevantEvents;
            var d = this.hitDragging["finalHit"];
            if (
              (this.clearDrag(),
              e.emitter.trigger("eventDragStop", {
                el: this.subjectEl,
                event: c,
                jsEvent: s.origEvent,
                view: o,
              }),
              n)
            )
              if (t === e) {
                var u,
                  h = new x(
                    e,
                    i.defs[a.defId],
                    l ? i.instances[l.instanceId] : null
                  ),
                  h =
                    (e.dispatch({ type: "MERGE_EVENTS", eventStore: i }),
                    {
                      oldEvent: c,
                      event: h,
                      relatedEvents: Qr(i, e, l),
                      revert() {
                        e.dispatch({ type: "MERGE_EVENTS", eventStore: r });
                      },
                    }),
                  f = {};
                for (u of e.getCurrentData().pluginHooks.eventDropTransformers)
                  Object.assign(f, u(n, e));
                e.emitter.trigger(
                  "eventDrop",
                  Object.assign(Object.assign(Object.assign({}, h), f), {
                    el: s.subjectEl,
                    delta: n.datesDelta,
                    jsEvent: s.origEvent,
                    view: o,
                  })
                ),
                  e.emitter.trigger("eventChange", h);
              } else
                t &&
                  ((h = {
                    event: c,
                    relatedEvents: Qr(r, e, l),
                    revert() {
                      e.dispatch({ type: "MERGE_EVENTS", eventStore: r });
                    },
                  }),
                  e.emitter.trigger(
                    "eventLeave",
                    Object.assign(Object.assign({}, h), {
                      draggedEl: s.subjectEl,
                      view: o,
                    })
                  ),
                  e.dispatch({ type: "REMOVE_EVENTS", eventStore: r }),
                  e.emitter.trigger("eventRemove", h),
                  (c = i.defs[a.defId]),
                  (o = i.instances[l.instanceId]),
                  (h = new x(t, c, o)),
                  t.dispatch({ type: "MERGE_EVENTS", eventStore: i }),
                  (a = {
                    event: h,
                    relatedEvents: Qr(i, t, o),
                    revert() {
                      t.dispatch({ type: "REMOVE_EVENTS", eventStore: i });
                    },
                  }),
                  t.emitter.trigger("eventAdd", a),
                  s.isTouch &&
                    t.dispatch({
                      type: "SELECT_EVENT",
                      eventInstanceId: l.instanceId,
                    }),
                  t.emitter.trigger(
                    "drop",
                    Object.assign(Object.assign({}, fa(d.dateSpan, t)), {
                      draggedEl: s.subjectEl,
                      jsEvent: s.origEvent,
                      view: d.context.viewApi,
                    })
                  ),
                  t.emitter.trigger(
                    "eventReceive",
                    Object.assign(Object.assign({}, a), {
                      draggedEl: s.subjectEl,
                      view: d.context.viewApi,
                    })
                  ));
            else e.emitter.trigger("_noEventDrop");
          }
          this.cleanup();
        });
      var t = this["component"],
        t = t.context["options"];
      let n = (this.dragging = new ca(e.el)),
        r =
          ((n.pointer.selector = va.SELECTOR),
          (n.touchScrollAllowed = !1),
          (n.autoScroller.isEnabled = t.dragScroll),
          (this.hitDragging = new ua(this.dragging, Di)));
      (r.useSubjectCenter = e.useEventCenter),
        r.emitter.on("pointerdown", this.handlePointerDown),
        r.emitter.on("dragstart", this.handleDragStart),
        r.emitter.on("hitupdate", this.handleHitUpdate),
        r.emitter.on("pointerup", this.handlePointerUp),
        r.emitter.on("dragend", this.handleDragEnd);
    }
    destroy() {
      this.dragging.destroy();
    }
    displayDrag(e, t) {
      var n = this.component.context;
      let r = this.receivingContext;
      r &&
        r !== e &&
        (r === n
          ? r.dispatch({
              type: "SET_EVENT_DRAG",
              state: {
                affectedEvents: t.affectedEvents,
                mutatedEvents: An(),
                isEvent: !0,
              },
            })
          : r.dispatch({ type: "UNSET_EVENT_DRAG" })),
        e && e.dispatch({ type: "SET_EVENT_DRAG", state: t });
    }
    clearDrag() {
      let e = this.component.context,
        t = this["receivingContext"];
      t && t.dispatch({ type: "UNSET_EVENT_DRAG" }),
        e !== t && e.dispatch({ type: "UNSET_EVENT_DRAG" });
    }
    cleanup() {
      (this.subjectSeg = null),
        (this.isDragging = !1),
        (this.eventRange = null),
        (this.relevantEvents = null),
        (this.receivingContext = null),
        (this.validMutation = null),
        (this.mutatedRelevantEvents = null);
    }
  }
  va.SELECTOR = ".fc-event-draggable, .fc-event-resizable";
  class ma extends Si {
    constructor(e) {
      super(e),
        (this.draggingSegEl = null),
        (this.draggingSeg = null),
        (this.eventRange = null),
        (this.relevantEvents = null),
        (this.validMutation = null),
        (this.mutatedRelevantEvents = null),
        (this.handlePointerDown = (e) => {
          var t = this["component"],
            n = Xr(this.querySegEl(e)),
            n = (this.eventRange = n.eventRange);
          (this.dragging.minDistance = t.context.options.eventDragMinDistance),
            this.dragging.setIgnoreMove(
              !this.component.isValidSegDownEl(e.origEvent.target) ||
                (e.isTouch &&
                  this.component.props.eventSelection !== n.instance.instanceId)
            );
        }),
        (this.handleDragStart = (e) => {
          let t = this.component["context"];
          var n = this.eventRange,
            r =
              ((this.relevantEvents = Sn(
                t.getCurrentData().eventStore,
                this.eventRange.instance.instanceId
              )),
              this.querySegEl(e));
          (this.draggingSegEl = r),
            (this.draggingSeg = Xr(r)),
            t.calendarApi.unselect(),
            t.emitter.trigger("eventResizeStart", {
              el: r,
              event: new x(t, n.def, n.instance),
              jsEvent: e.origEvent,
              view: t.viewApi,
            });
        }),
        (this.handleHitUpdate = (e, t, n) => {
          let r = this.component["context"];
          var i = this.relevantEvents,
            s = this.hitDragging.initialHit,
            d = this.eventRange.instance;
          let o = null,
            a = null,
            l = !1,
            c = { affectedEvents: i, mutatedEvents: An(), isEvent: !0 };
          e &&
            ((e.componentId === s.componentId &&
              this.isHitComboAllowed &&
              !this.isHitComboAllowed(s, e)) ||
              (o = (function (e, t, n, r) {
                let i = e.context.dateEnv,
                  s = e.dateSpan.range.start,
                  o = t.dateSpan.range.start,
                  a = Fn(s, o, i, e.largeUnit);
                if (n) {
                  if (i.add(r.start, a) < r.end) return { startDelta: a };
                } else if (i.add(r.end, a) > r.start) return { endDelta: a };
                return null;
              })(
                s,
                e,
                n.subjectEl.classList.contains("fc-event-resizer-start"),
                d.range
              ))),
            o &&
              ((a = Fr(i, r.getCurrentData().eventUiBases, o, r)),
              (c.mutatedEvents = a),
              es(c, e.dateProfile, r) ||
                ((l = !0), (o = null), (a = null), (c.mutatedEvents = null))),
            a
              ? r.dispatch({ type: "SET_EVENT_RESIZE", state: c })
              : r.dispatch({ type: "UNSET_EVENT_RESIZE" }),
            (l ? Ge : Qe)(),
            t ||
              (o && ha(s, e) && (o = null),
              (this.validMutation = o),
              (this.mutatedRelevantEvents = a));
        }),
        (this.handleDragEnd = (e) => {
          let t = this.component["context"];
          var n = this.eventRange.def,
            r = this.eventRange.instance,
            i = new x(t, n, r);
          let s = this.relevantEvents;
          var o = this.mutatedRelevantEvents;
          t.emitter.trigger("eventResizeStop", {
            el: this.draggingSegEl,
            event: i,
            jsEvent: e.origEvent,
            view: t.viewApi,
          }),
            this.validMutation
              ? ((n = new x(
                  t,
                  o.defs[n.defId],
                  r ? o.instances[r.instanceId] : null
                )),
                t.dispatch({ type: "MERGE_EVENTS", eventStore: o }),
                (i = {
                  oldEvent: i,
                  event: n,
                  relatedEvents: Qr(o, t, r),
                  revert() {
                    t.dispatch({ type: "MERGE_EVENTS", eventStore: s });
                  },
                }),
                t.emitter.trigger(
                  "eventResize",
                  Object.assign(Object.assign({}, i), {
                    el: this.draggingSegEl,
                    startDelta: this.validMutation.startDelta || p(0),
                    endDelta: this.validMutation.endDelta || p(0),
                    jsEvent: e.origEvent,
                    view: t.viewApi,
                  })
                ),
                t.emitter.trigger("eventChange", i))
              : t.emitter.trigger("_noEventResize"),
            (this.draggingSeg = null),
            (this.relevantEvents = null),
            (this.validMutation = null);
        });
      var t = e["component"];
      let n = (this.dragging = new ca(e.el)),
        r =
          ((n.pointer.selector = ".fc-event-resizer"),
          (n.touchScrollAllowed = !1),
          (n.autoScroller.isEnabled = t.context.options.dragScroll),
          (this.hitDragging = new ua(this.dragging, Ai(e))));
      r.emitter.on("pointerdown", this.handlePointerDown),
        r.emitter.on("dragstart", this.handleDragStart),
        r.emitter.on("hitupdate", this.handleHitUpdate),
        r.emitter.on("dragend", this.handleDragEnd);
    }
    destroy() {
      this.dragging.destroy();
    }
    querySegEl(e) {
      return Te(e.subjectEl, ".fc-event");
    }
  }
  var ya = { fixedMirrorParent: e },
    ba = {
      dateClick: e,
      eventDragStart: e,
      eventDragStop: e,
      eventDrop: e,
      eventResizeStart: e,
      eventResizeStop: e,
      eventResize: e,
      drop: e,
      eventReceive: e,
      eventLeave: e,
    };
  class Ea {
    constructor(e, t) {
      (this.receivingContext = null),
        (this.droppableEvent = null),
        (this.suppliedDragMeta = null),
        (this.dragMeta = null),
        (this.handleDragStart = (e) => {
          this.dragMeta = this.buildDragMeta(e.subjectEl);
        }),
        (this.handleHitUpdate = (e, t, n) => {
          let r = this.hitDragging["dragging"],
            i = null,
            s = null,
            o = !1,
            a = {
              affectedEvents: An(),
              mutatedEvents: An(),
              isEvent: this.dragMeta.create,
            };
          e &&
            ((i = e.context),
            this.canDropElOnCalendar(n.subjectEl, i) &&
              ((s = (function (e, t, n) {
                var r = Object.assign({}, t.leftoverProps);
                for (var i of n.pluginHooks.externalDefTransforms)
                  Object.assign(r, i(e, t));
                let { refined: s, extra: o } = Pn(r, n),
                  a = Bn(
                    s,
                    o,
                    t.sourceId,
                    e.allDay,
                    n.options.forceEventDuration || Boolean(t.duration),
                    n
                  ),
                  l = e.range.start;
                e.allDay && t.startTime && (l = n.dateEnv.add(l, t.startTime));
                (n = t.duration
                  ? n.dateEnv.add(l, t.duration)
                  : Lr(e.allDay, l, n)),
                  (n = mn(a.defId, { start: l, end: n }));
                return { def: a, instance: n };
              })(e.dateSpan, this.dragMeta, i)),
              (a.mutatedEvents = En(s)),
              (o = !es(a, e.dateProfile, i)) &&
                ((a.mutatedEvents = An()), (s = null)))),
            this.displayDrag(i, a),
            r.setMirrorIsVisible(
              t || !s || !document.querySelector(".fc-event-mirror")
            ),
            (o ? Ge : Qe)(),
            t ||
              (r.setMirrorNeedsRevert(!s),
              (this.receivingContext = i),
              (this.droppableEvent = s));
        }),
        (this.handleDragEnd = (t) => {
          let { receivingContext: n, droppableEvent: r } = this;
          if ((this.clearDrag(), n && r)) {
            var e = this.hitDragging.finalHit,
              i = e.context.viewApi,
              s = this.dragMeta;
            if (
              (n.emitter.trigger(
                "drop",
                Object.assign(Object.assign({}, fa(e.dateSpan, n)), {
                  draggedEl: t.subjectEl,
                  jsEvent: t.origEvent,
                  view: i,
                })
              ),
              s.create)
            ) {
              let e = En(r);
              n.dispatch({ type: "MERGE_EVENTS", eventStore: e }),
                t.isTouch &&
                  n.dispatch({
                    type: "SELECT_EVENT",
                    eventInstanceId: r.instance.instanceId,
                  }),
                n.emitter.trigger("eventReceive", {
                  event: new x(n, r.def, r.instance),
                  relatedEvents: [],
                  revert() {
                    n.dispatch({ type: "REMOVE_EVENTS", eventStore: e });
                  },
                  draggedEl: t.subjectEl,
                  view: i,
                });
            }
          }
          (this.receivingContext = null), (this.droppableEvent = null);
        });
      let n = (this.hitDragging = new ua(e, Di));
      (n.requireInitial = !1),
        n.emitter.on("dragstart", this.handleDragStart),
        n.emitter.on("hitupdate", this.handleHitUpdate),
        n.emitter.on("dragend", this.handleDragEnd),
        (this.suppliedDragMeta = t);
    }
    buildDragMeta(e) {
      return "object" == typeof this.suppliedDragMeta
        ? xi(this.suppliedDragMeta)
        : "function" == typeof this.suppliedDragMeta
        ? xi(this.suppliedDragMeta(e))
        : xi(
            (e = (e = (function (e, t) {
              var n = Ci.dataAttrPrefix,
                n = (n ? n + "-" : "") + t;
              return e.getAttribute("data-" + n) || "";
            })(e, "event"))
              ? JSON.parse(e)
              : { create: !1 })
          );
    }
    displayDrag(e, t) {
      let n = this.receivingContext;
      n && n !== e && n.dispatch({ type: "UNSET_EVENT_DRAG" }),
        e && e.dispatch({ type: "SET_EVENT_DRAG", state: t });
    }
    clearDrag() {
      this.receivingContext &&
        this.receivingContext.dispatch({ type: "UNSET_EVENT_DRAG" });
    }
    canDropElOnCalendar(e, t) {
      let n = t.options.dropAccept;
      return "function" == typeof n
        ? n.call(t.calendarApi, e)
        : "string" != typeof n || !n || Boolean(_e(e, n));
    }
  }
  Ci.dataAttrPrefix = "";
  class Sa extends wi {
    constructor(e) {
      super(e),
        (this.shouldIgnoreMove = !1),
        (this.mirrorSelector = ""),
        (this.currentMirrorEl = null),
        (this.handlePointerDown = (e) => {
          this.emitter.trigger("pointerdown", e),
            this.shouldIgnoreMove || this.emitter.trigger("dragstart", e);
        }),
        (this.handlePointerMove = (e) => {
          this.shouldIgnoreMove || this.emitter.trigger("dragmove", e);
        }),
        (this.handlePointerUp = (e) => {
          this.emitter.trigger("pointerup", e),
            this.shouldIgnoreMove || this.emitter.trigger("dragend", e);
        });
      let t = (this.pointer = new ta(e));
      t.emitter.on("pointerdown", this.handlePointerDown),
        t.emitter.on("pointermove", this.handlePointerMove),
        t.emitter.on("pointerup", this.handlePointerUp);
    }
    destroy() {
      this.pointer.destroy();
    }
    setIgnoreMove(e) {
      this.shouldIgnoreMove = e;
    }
    setMirrorIsVisible(e) {
      if (e)
        this.currentMirrorEl &&
          ((this.currentMirrorEl.style.visibility = ""),
          (this.currentMirrorEl = null));
      else {
        let e = this.mirrorSelector
          ? document.querySelector(this.mirrorSelector)
          : null;
        e && ((this.currentMirrorEl = e).style.visibility = "hidden");
      }
    }
  }
  ya = ao({
    name: "@fullcalendar/interaction",
    componentInteractions: [ga, pa, va, ma],
    calendarInteractions: [
      class {
        constructor(e) {
          (this.context = e),
            (this.isRecentPointerDateSelect = !1),
            (this.matchesCancel = !1),
            (this.matchesEvent = !1),
            (this.onSelect = (e) => {
              e.jsEvent && (this.isRecentPointerDateSelect = !0);
            }),
            (this.onDocumentPointerDown = (e) => {
              var t = this.context.options.unselectCancel,
                e = Ne(e.origEvent);
              (this.matchesCancel = !!Te(e, t)),
                (this.matchesEvent = !!Te(e, va.SELECTOR));
            }),
            (this.onDocumentPointerUp = (e) => {
              let t = this["context"];
              var n = this["documentPointer"],
                r = t.getCurrentData();
              n.wasTouchScroll ||
                (r.dateSelection &&
                  !this.isRecentPointerDateSelect &&
                  (!t.options.unselectAuto ||
                    this.matchesCancel ||
                    t.calendarApi.unselect(e)),
                r.eventSelection &&
                  !this.matchesEvent &&
                  t.dispatch({ type: "UNSELECT_EVENT" })),
                (this.isRecentPointerDateSelect = !1);
            });
          let t = (this.documentPointer = new ta(document));
          (t.shouldIgnoreMove = !0),
            (t.shouldWatchScroll = !1),
            t.emitter.on("pointerdown", this.onDocumentPointerDown),
            t.emitter.on("pointerup", this.onDocumentPointerUp),
            e.emitter.on("select", this.onSelect);
        }
        destroy() {
          this.context.emitter.off("select", this.onSelect),
            this.documentPointer.destroy();
        }
      },
    ],
    elementDraggingImpl: ca,
    optionRefiners: ya,
    listenerRefiners: ba,
  });
  function Aa(e, t) {
    let n = [];
    for (let e = 0; e < t; e += 1) n[e] = [];
    for (var r of e) n[r.row].push(r);
    return n;
  }
  function Da(e, t) {
    let n = [];
    for (let e = 0; e < t; e += 1) n[e] = [];
    for (var r of e) n[r.firstCol].push(r);
    return n;
  }
  function wa(t, n) {
    let r = [];
    if (t) {
      for (let e = 0; e < n; e += 1)
        r[e] = {
          affectedInstances: t.affectedInstances,
          isEvent: t.isEvent,
          segs: [],
        };
      for (var e of t.segs) r[e.row].segs.push(e);
    } else for (let e = 0; e < n; e += 1) r[e] = null;
    return r;
  }
  De(
    ':root{--fc-daygrid-event-dot-width:8px}.fc-daygrid-day-events:after,.fc-daygrid-day-events:before,.fc-daygrid-day-frame:after,.fc-daygrid-day-frame:before,.fc-daygrid-event-harness:after,.fc-daygrid-event-harness:before{clear:both;content:"";display:table}.fc .fc-daygrid-body{position:relative;z-index:1}.fc .fc-daygrid-day.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-daygrid-day-frame{min-height:100%;position:relative}.fc .fc-daygrid-day-top{display:flex;flex-direction:row-reverse}.fc .fc-day-other .fc-daygrid-day-top{opacity:.3}.fc .fc-daygrid-day-number{padding:4px;position:relative;z-index:4}.fc .fc-daygrid-month-start{font-size:1.1em;font-weight:700}.fc .fc-daygrid-day-events{margin-top:1px}.fc .fc-daygrid-body-balanced .fc-daygrid-day-events{left:0;position:absolute;right:0}.fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{min-height:2em;position:relative}.fc .fc-daygrid-body-natural .fc-daygrid-day-events{margin-bottom:1em}.fc .fc-daygrid-event-harness{position:relative}.fc .fc-daygrid-event-harness-abs{left:0;position:absolute;right:0;top:0}.fc .fc-daygrid-bg-harness{bottom:0;position:absolute;top:0}.fc .fc-daygrid-day-bg .fc-non-business{z-index:1}.fc .fc-daygrid-day-bg .fc-bg-event{z-index:2}.fc .fc-daygrid-day-bg .fc-highlight{z-index:3}.fc .fc-daygrid-event{margin-top:1px;z-index:6}.fc .fc-daygrid-event.fc-event-mirror{z-index:7}.fc .fc-daygrid-day-bottom{font-size:.85em;margin:0 2px}.fc .fc-daygrid-day-bottom:after,.fc .fc-daygrid-day-bottom:before{clear:both;content:"";display:table}.fc .fc-daygrid-more-link{border-radius:3px;cursor:pointer;line-height:1;margin-top:1px;max-width:100%;overflow:hidden;padding:2px;position:relative;white-space:nowrap;z-index:4}.fc .fc-daygrid-more-link:hover{background-color:rgba(0,0,0,.1)}.fc .fc-daygrid-week-number{background-color:var(--fc-neutral-bg-color);color:var(--fc-neutral-text-color);min-width:1.5em;padding:2px;position:absolute;text-align:center;top:0;z-index:5}.fc .fc-more-popover .fc-popover-body{min-width:220px;padding:10px}.fc-direction-ltr .fc-daygrid-event.fc-event-start,.fc-direction-rtl .fc-daygrid-event.fc-event-end{margin-left:2px}.fc-direction-ltr .fc-daygrid-event.fc-event-end,.fc-direction-rtl .fc-daygrid-event.fc-event-start{margin-right:2px}.fc-direction-ltr .fc-daygrid-more-link{float:left}.fc-direction-ltr .fc-daygrid-week-number{border-radius:0 0 3px 0;left:0}.fc-direction-rtl .fc-daygrid-more-link{float:right}.fc-direction-rtl .fc-daygrid-week-number{border-radius:0 0 0 3px;right:0}.fc-liquid-hack .fc-daygrid-day-frame{position:static}.fc-daygrid-event{border-radius:3px;font-size:var(--fc-small-font-size);position:relative;white-space:nowrap}.fc-daygrid-block-event .fc-event-time{font-weight:700}.fc-daygrid-block-event .fc-event-time,.fc-daygrid-block-event .fc-event-title{padding:1px}.fc-daygrid-dot-event{align-items:center;display:flex;padding:2px 0}.fc-daygrid-dot-event .fc-event-title{flex-grow:1;flex-shrink:1;font-weight:700;min-width:0;overflow:hidden}.fc-daygrid-dot-event.fc-event-mirror,.fc-daygrid-dot-event:hover{background:rgba(0,0,0,.1)}.fc-daygrid-dot-event.fc-event-selected:before{bottom:-10px;top:-10px}.fc-daygrid-event-dot{border:calc(var(--fc-daygrid-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-daygrid-event-dot-width)/2);box-sizing:content-box;height:0;margin:0 4px;width:0}.fc-direction-ltr .fc-daygrid-event .fc-event-time{margin-right:3px}.fc-direction-rtl .fc-daygrid-event .fc-event-time{margin-left:3px}'
  );
  const Ca = o({
    hour: "numeric",
    minute: "2-digit",
    omitZeroMinute: !0,
    meridiem: "narrow",
  });
  function Ra(e) {
    var t = e.eventRange.ui["display"];
    return (
      "list-item" === t ||
      ("auto" === t &&
        !e.eventRange.def.allDay &&
        e.firstCol === e.lastCol &&
        e.isStart &&
        e.isEnd)
    );
  }
  class xa extends n {
    render() {
      var e = this["props"];
      return E(
        xs,
        Object.assign({}, e, {
          elClasses: [
            "fc-daygrid-event",
            "fc-daygrid-block-event",
            "fc-h-event",
          ],
          defaultTimeFormat: Ca,
          defaultDisplayEventEnd: e.defaultDisplayEventEnd,
          disableResizing: !e.seg.eventRange.def.allDay,
        })
      );
    }
  }
  class Ta extends n {
    render() {
      var { props: e, context: t } = this,
        n = t["options"],
        r = e["seg"],
        r = ti(r, n.eventTimeFormat || Ca, t, !0, e.defaultDisplayEventEnd);
      return E(
        Rs,
        Object.assign({}, e, {
          elTag: "a",
          elClasses: ["fc-daygrid-event", "fc-daygrid-dot-event"],
          elAttrs: ii(e.seg, t),
          defaultGenerator: _a,
          timeText: r,
          isResizing: !1,
          isDateSelecting: !1,
        })
      );
    }
  }
  function _a(e) {
    return E(
      R,
      null,
      E("div", {
        className: "fc-daygrid-event-dot",
        style: { borderColor: e.borderColor || e.backgroundColor },
      }),
      e.timeText && E("div", { className: "fc-event-time" }, e.timeText),
      E(
        "div",
        { className: "fc-event-title" },
        e.event.title || E(R, null, " ")
      )
    );
  }
  class ka extends n {
    constructor() {
      super(...arguments), (this.compileSegs = g(Ma));
    }
    render() {
      let r = this["props"],
        { allSegs: e, invisibleSegs: t } = this.compileSegs(r.singlePlacements);
      return E(Ws, {
        elClasses: ["fc-daygrid-more-link"],
        dateProfile: r.dateProfile,
        todayRange: r.todayRange,
        allDayDate: r.allDayDate,
        moreCnt: r.moreCnt,
        allSegs: e,
        hiddenSegs: t,
        alignmentElRef: r.alignmentElRef,
        alignGridTop: r.alignGridTop,
        extraDateSpan: r.extraDateSpan,
        popoverContent: () => {
          let n =
            (r.eventDrag ? r.eventDrag.affectedInstances : null) ||
            (r.eventResize ? r.eventResize.affectedInstances : null) ||
            {};
          return E(
            R,
            null,
            e.map((e) => {
              var t = e.eventRange.instance.instanceId;
              return E(
                "div",
                {
                  className: "fc-daygrid-event-harness",
                  key: t,
                  style: { visibility: n[t] ? "hidden" : "" },
                },
                Ra(e)
                  ? E(
                      Ta,
                      Object.assign(
                        {
                          seg: e,
                          isDragging: !1,
                          isSelected: t === r.eventSelection,
                          defaultDisplayEventEnd: !1,
                        },
                        ni(e, r.todayRange)
                      )
                    )
                  : E(
                      xa,
                      Object.assign(
                        {
                          seg: e,
                          isDragging: !1,
                          isResizing: !1,
                          isDateSelecting: !1,
                          isSelected: t === r.eventSelection,
                          defaultDisplayEventEnd: !1,
                        },
                        ni(e, r.todayRange)
                      )
                    )
              );
            })
          );
        },
      });
    }
  }
  function Ma(e) {
    let t = [],
      n = [];
    for (var r of e) t.push(r.seg), r.isVisible || n.push(r.seg);
    return { allSegs: t, invisibleSegs: n };
  }
  const Ia = o({ week: "narrow" });
  class Oa extends Br {
    constructor() {
      super(...arguments),
        (this.rootElRef = c()),
        (this.state = { dayNumberId: He() }),
        (this.handleRootEl = (e) => {
          Hr(this.rootElRef, e), Hr(this.props.elRef, e);
        });
    }
    render() {
      let { context: n, props: r, state: i, rootElRef: s } = this,
        { options: o, dateEnv: e } = n,
        { date: a, dateProfile: t } = r;
      const l =
        r.showDayNumber &&
        (function (e, t, n) {
          const { start: r, end: i } = t,
            s = Tt(i, -1),
            o = n.getYear(r),
            a = n.getMonth(r),
            l = n.getYear(s),
            c = n.getMonth(s);
          return (
            !(o === l && a === c) &&
            Boolean(
              e.valueOf() === r.valueOf() ||
                (1 === n.getDay(e) && e.valueOf() < i.valueOf())
            )
          );
        })(a, t.currentRange, e);
      return E(
        Ms,
        {
          elTag: "td",
          elRef: this.handleRootEl,
          elClasses: ["fc-daygrid-day", ...(r.extraClassNames || [])],
          elAttrs: Object.assign(
            Object.assign(
              Object.assign({}, r.extraDataAttrs),
              r.showDayNumber ? { "aria-labelledby": i.dayNumberId } : {}
            ),
            { role: "gridcell" }
          ),
          defaultGenerator: Na,
          date: a,
          dateProfile: t,
          todayRange: r.todayRange,
          showDayNumber: r.showDayNumber,
          isMonthStart: l,
          extraRenderProps: r.extraRenderProps,
        },
        (e, t) =>
          E(
            "div",
            {
              ref: r.innerElRef,
              className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
              style: { minHeight: r.minHeight },
            },
            r.showWeekNumber &&
              E(Bs, {
                elTag: "a",
                elClasses: ["fc-daygrid-week-number"],
                elAttrs: ur(n, a, "week"),
                date: a,
                defaultFormat: Ia,
              }),
            !t.isDisabled && (r.showDayNumber || Is(o) || r.forceDayTop)
              ? E(
                  "div",
                  { className: "fc-daygrid-day-top" },
                  E(e, {
                    elTag: "a",
                    elClasses: [
                      "fc-daygrid-day-number",
                      l && "fc-daygrid-month-start",
                    ],
                    elAttrs: Object.assign(Object.assign({}, ur(n, a)), {
                      id: i.dayNumberId,
                    }),
                  })
                )
              : r.showDayNumber
              ? E(
                  "div",
                  {
                    className: "fc-daygrid-day-top",
                    style: { visibility: "hidden" },
                  },
                  E("a", { className: "fc-daygrid-day-number" }, " ")
                )
              : void 0,
            E(
              "div",
              { className: "fc-daygrid-day-events", ref: r.fgContentElRef },
              r.fgContent,
              E(
                "div",
                {
                  className: "fc-daygrid-day-bottom",
                  style: { marginTop: r.moreMarginTop },
                },
                E(ka, {
                  allDayDate: a,
                  singlePlacements: r.singlePlacements,
                  moreCnt: r.moreCnt,
                  alignmentElRef: s,
                  alignGridTop: !r.showDayNumber,
                  extraDateSpan: r.extraDateSpan,
                  dateProfile: r.dateProfile,
                  eventSelection: r.eventSelection,
                  eventDrag: r.eventDrag,
                  eventResize: r.eventResize,
                  todayRange: r.todayRange,
                })
              )
            ),
            E("div", { className: "fc-daygrid-day-bg" }, r.bgContent)
          )
      );
    }
  }
  function Na(e) {
    return e.dayNumberText || E(R, null, " ");
  }
  function Pa(t, e, n, d, u, h, r) {
    let i = new Ba(),
      f =
        ((i.allowReslicing = !0),
        (i.strictOrder = d),
        !0 === e || !0 === n
          ? ((i.maxCoord = h), (i.hiddenConsumes = !0))
          : "number" == typeof e
          ? (i.maxStackCnt = e)
          : "number" == typeof n &&
            ((i.maxStackCnt = n), (i.hiddenConsumes = !0)),
        []),
      g = [];
    for (let e = 0; e < t.length; e += 1) {
      var s = t[e],
        o = s.eventRange.instance["instanceId"],
        o = u[o];
      null != o
        ? f.push({
            index: e,
            thickness: o,
            span: { start: s.firstCol, end: s.lastCol + 1 },
          })
        : g.push(s);
    }
    var a,
      l,
      d = i.addSegs(f);
    let {
        singleColPlacements: p,
        multiColPlacements: v,
        leftoverMargins: m,
      } = (function (e, s, o) {
        let p = (function (e, t) {
            let n = [];
            for (let e = 0; e < t; e += 1) n.push([]);
            for (var r of e)
              for (let e = r.span.start; e < r.span.end; e += 1) n[e].push(r);
            return n;
          })(e, o.length),
          a = [],
          l = [],
          c = [];
        for (let i = 0; i < o.length; i += 1) {
          var d,
            u,
            h = p[i];
          let e = [],
            t = 0,
            n = 0;
          for (d of h) {
            var v = s[d.index];
            e.push({
              seg: Ha(v, i, i + 1, o),
              isVisible: !0,
              isAbsolute: !1,
              absoluteTop: d.levelCoord,
              marginTop: d.levelCoord - t,
            }),
              (t = d.levelCoord + d.thickness);
          }
          let r = [];
          (t = 0), (n = 0);
          for (u of h) {
            var f = s[u.index],
              m = 1 < u.span.end - u.span.start,
              g = u.span.start === i;
            (n += u.levelCoord - t),
              (t = u.levelCoord + u.thickness),
              m
                ? ((n += u.thickness),
                  g &&
                    r.push({
                      seg: Ha(f, u.span.start, u.span.end, o),
                      isVisible: !0,
                      isAbsolute: !0,
                      absoluteTop: u.levelCoord,
                      marginTop: 0,
                    }))
                : g &&
                  (r.push({
                    seg: Ha(f, u.span.start, u.span.end, o),
                    isVisible: !0,
                    isAbsolute: !1,
                    absoluteTop: u.levelCoord,
                    marginTop: n,
                  }),
                  (n = 0));
          }
          a.push(e), l.push(r), c.push(n);
        }
        return {
          singleColPlacements: a,
          multiColPlacements: l,
          leftoverMargins: c,
        };
      })(i.toRects(), t, r),
      y = [],
      b = [];
    for (a of g) {
      v[a.firstCol].push({
        seg: a,
        isVisible: !1,
        isAbsolute: !0,
        absoluteTop: 0,
        marginTop: 0,
      });
      for (let e = a.firstCol; e <= a.lastCol; e += 1)
        p[e].push({
          seg: Ha(a, e, e + 1, r),
          isVisible: !1,
          isAbsolute: !1,
          absoluteTop: 0,
          marginTop: 0,
        });
    }
    for (let e = 0; e < r.length; e += 1) y.push(0);
    for (l of d) {
      var E = t[l.index],
        c = l.span;
      v[c.start].push({
        seg: Ha(E, c.start, c.end, r),
        isVisible: !1,
        isAbsolute: !0,
        absoluteTop: 0,
        marginTop: 0,
      });
      for (let e = c.start; e < c.end; e += 1)
        (y[e] += 1),
          p[e].push({
            seg: Ha(E, e, e + 1, r),
            isVisible: !1,
            isAbsolute: !1,
            absoluteTop: 0,
            marginTop: 0,
          });
    }
    for (let e = 0; e < r.length; e += 1) b.push(m[e]);
    return {
      singleColPlacements: p,
      multiColPlacements: v,
      moreCnts: y,
      moreMarginTops: b,
    };
  }
  function Ha(e, t, n, r) {
    if (e.firstCol === t && e.lastCol === n - 1) return e;
    var i = e.eventRange;
    let s = i.range,
      o = nr(s, { start: r[t].date, end: xt(r[n - 1].date, 1) });
    return Object.assign(Object.assign({}, e), {
      firstCol: t,
      lastCol: n - 1,
      eventRange: {
        def: i.def,
        ui: Object.assign(Object.assign({}, i.ui), { durationEditable: !1 }),
        instance: i.instance,
        range: o,
      },
      isStart: e.isStart && o.start.valueOf() === s.start.valueOf(),
      isEnd: e.isEnd && o.end.valueOf() === s.end.valueOf(),
    });
  }
  class Ba extends gi {
    constructor() {
      super(...arguments), (this.hiddenConsumes = !1), (this.forceHidden = {});
    }
    addSegs(e) {
      e = super.addSegs(e);
      const t = this["entriesByLevel"];
      var n = (e) => !this.forceHidden[vi(e)];
      for (let e = 0; e < t.length; e += 1) t[e] = t[e].filter(n);
      return e;
    }
    handleInvalidInsertion(e, t, n) {
      const { entriesByLevel: r, forceHidden: i } = this;
      var s,
        o,
        a,
        { touchingEntry: l, touchingLevel: c, touchingLateral: d } = e;
      return (
        this.hiddenConsumes &&
          l &&
          ((s = vi(l)),
          i[s] ||
            (this.allowReslicing
              ? ((a = vi(
                  (o = Object.assign(Object.assign({}, l), {
                    span: yi(l.span, t.span),
                  }))
                )),
                (i[a] = !0),
                (r[c][d] = o),
                this.splitEntry(l, t, n))
              : ((i[s] = !0), n.push(l)))),
        super.handleInvalidInsertion(e, t, n)
      );
    }
  }
  class ja extends Br {
    constructor() {
      super(...arguments),
        (this.cellElRefs = new us()),
        (this.frameElRefs = new us()),
        (this.fgElRefs = new us()),
        (this.segHarnessRefs = new us()),
        (this.rootElRef = c()),
        (this.state = {
          framePositions: null,
          maxContentHeight: null,
          eventInstanceHeights: {},
        }),
        (this.handleResize = (e) => {
          e && this.updateSizing(!0);
        });
    }
    render() {
      let { props: i, state: e, context: t } = this;
      var n = t["options"],
        r = i.cells.length;
      let s = Da(i.businessHourSegs, r),
        o = Da(i.bgEventSegs, r),
        a = Da(this.getHighlightSegs(), r),
        d = Da(this.getMirrorSegs(), r),
        {
          singleColPlacements: l,
          multiColPlacements: c,
          moreCnts: u,
          moreMarginTops: h,
        } = Pa(
          Kr(i.fgEventSegs, n.eventOrder),
          i.dayMaxEvents,
          i.dayMaxEventRows,
          n.eventOrderStrict,
          e.eventInstanceHeights,
          e.maxContentHeight,
          i.cells
        ),
        f =
          (i.eventDrag && i.eventDrag.affectedInstances) ||
          (i.eventResize && i.eventResize.affectedInstances) ||
          {};
      return E(
        "tr",
        { ref: this.rootElRef, role: "row" },
        i.renderIntro && i.renderIntro(),
        i.cells.map((e, t) => {
          var n = this.renderFgSegs(
              t,
              (i.forPrint ? l : c)[t],
              i.todayRange,
              f
            ),
            r = this.renderFgSegs(
              t,
              (function (e, t) {
                if (!e.length) return [];
                let n = (function (e) {
                  let t = {};
                  for (var n of e)
                    for (var r of n)
                      t[r.seg.eventRange.instance.instanceId] = r.absoluteTop;
                  return t;
                })(t);
                return e.map((e) => ({
                  seg: e,
                  isVisible: !0,
                  isAbsolute: !0,
                  absoluteTop: n[e.eventRange.instance.instanceId],
                  marginTop: 0,
                }));
              })(d[t], c),
              i.todayRange,
              {},
              Boolean(i.eventDrag),
              Boolean(i.eventResize),
              !1
            );
          return E(Oa, {
            key: e.key,
            elRef: this.cellElRefs.createRef(e.key),
            innerElRef: this.frameElRefs.createRef(e.key),
            dateProfile: i.dateProfile,
            date: e.date,
            showDayNumber: i.showDayNumbers,
            showWeekNumber: i.showWeekNumbers && 0 === t,
            forceDayTop: i.showWeekNumbers,
            todayRange: i.todayRange,
            eventSelection: i.eventSelection,
            eventDrag: i.eventDrag,
            eventResize: i.eventResize,
            extraRenderProps: e.extraRenderProps,
            extraDataAttrs: e.extraDataAttrs,
            extraClassNames: e.extraClassNames,
            extraDateSpan: e.extraDateSpan,
            moreCnt: u[t],
            moreMarginTop: h[t],
            singlePlacements: l[t],
            fgContentElRef: this.fgElRefs.createRef(e.key),
            fgContent: E(R, null, E(R, null, n), E(R, null, r)),
            bgContent: E(
              R,
              null,
              this.renderFillSegs(a[t], "highlight"),
              this.renderFillSegs(s[t], "non-business"),
              this.renderFillSegs(o[t], "bg-event")
            ),
            minHeight: i.cellMinHeight,
          });
        })
      );
    }
    componentDidMount() {
      this.updateSizing(!0), this.context.addResizeHandler(this.handleResize);
    }
    componentDidUpdate(e, t) {
      var n = this.props;
      this.updateSizing(!bt(e, n));
    }
    componentWillUnmount() {
      this.context.removeResizeHandler(this.handleResize);
    }
    getHighlightSegs() {
      var e = this["props"];
      return e.eventDrag && e.eventDrag.segs.length
        ? e.eventDrag.segs
        : e.eventResize && e.eventResize.segs.length
        ? e.eventResize.segs
        : e.dateSelectionSegs;
    }
    getMirrorSegs() {
      var e = this["props"];
      return e.eventResize && e.eventResize.segs.length
        ? e.eventResize.segs
        : [];
    }
    renderFgSegs(h, e, n, f, r, i, s) {
      var g = this["context"],
        o = this.props["eventSelection"],
        a = this.state["framePositions"],
        p = 1 === this.props.cells.length,
        v = r || i || s;
      let m = [];
      if (a)
        for (var l of e) {
          var c = l["seg"],
            d = c.eventRange.instance["instanceId"],
            y = d + ":" + h,
            b = l.isVisible && !f[d],
            u = l.isAbsolute;
          let e = "",
            t = "";
          u &&
            (g.isRtl
              ? ((t = 0), (e = a.lefts[c.lastCol] - a.lefts[c.firstCol]))
              : ((e = 0), (t = a.rights[c.firstCol] - a.rights[c.lastCol]))),
            m.push(
              E(
                "div",
                {
                  className:
                    "fc-daygrid-event-harness" +
                    (u ? " fc-daygrid-event-harness-abs" : ""),
                  key: y,
                  ref: v ? null : this.segHarnessRefs.createRef(y),
                  style: {
                    visibility: b ? "" : "hidden",
                    marginTop: u ? "" : l.marginTop,
                    top: u ? l.absoluteTop : "",
                    left: e,
                    right: t,
                  },
                },
                Ra(c)
                  ? E(
                      Ta,
                      Object.assign(
                        {
                          seg: c,
                          isDragging: r,
                          isSelected: d === o,
                          defaultDisplayEventEnd: p,
                        },
                        ni(c, n)
                      )
                    )
                  : E(
                      xa,
                      Object.assign(
                        {
                          seg: c,
                          isDragging: r,
                          isResizing: i,
                          isDateSelecting: s,
                          isSelected: d === o,
                          defaultDisplayEventEnd: p,
                        },
                        ni(c, n)
                      )
                    )
              )
            );
        }
      return m;
    }
    renderFillSegs(e, t) {
      var n = this.context["isRtl"],
        r = this.props["todayRange"],
        i = this.state["framePositions"];
      let s = [];
      if (i)
        for (var o of e) {
          var a = n
            ? { right: 0, left: i.lefts[o.lastCol] - i.lefts[o.firstCol] }
            : { left: 0, right: i.rights[o.firstCol] - i.rights[o.lastCol] };
          s.push(
            E(
              "div",
              {
                key: ri(o.eventRange),
                className: "fc-daygrid-bg-harness",
                style: a,
              },
              "bg-event" === t
                ? E(Ns, Object.assign({ seg: o }, ni(o, r)))
                : Hs(t)
            )
          );
        }
      return E(R, {}, ...s);
    }
    updateSizing(e) {
      let { props: t, state: n, frameElRefs: r } = this;
      var i, s;
      t.forPrint ||
        null === t.clientWidth ||
        (!e ||
          ((e = t.cells.map((e) => r.currentMap[e.key])).length &&
            ((s = this.rootElRef.current),
            (i = new Dr(s, e, !0, !1)),
            (n.framePositions && n.framePositions.similarTo(i)) ||
              this.setState({ framePositions: new Dr(s, e, !0, !1) }))),
        (i = this.state.eventInstanceHeights),
        (s = this.queryEventInstanceHeights()),
        (e = !0 === t.dayMaxEvents || !0 === t.dayMaxEventRows),
        this.safeSetState({
          eventInstanceHeights: Object.assign(Object.assign({}, i), s),
          maxContentHeight: e ? this.computeMaxContentHeight() : null,
        }));
    }
    queryEventInstanceHeights() {
      let e = this.segHarnessRefs.currentMap,
        t = {};
      for (var n in e) {
        var r = Math.round(e[n].getBoundingClientRect().height),
          n = n.split(":")[0];
        t[n] = Math.max(t[n] || 0, r);
      }
      return t;
    }
    computeMaxContentHeight() {
      var e = this.props.cells[0].key;
      let t = this.cellElRefs.currentMap[e],
        n = this.fgElRefs.currentMap[e];
      return t.getBoundingClientRect().bottom - n.getBoundingClientRect().top;
    }
    getCellEls() {
      let t = this.cellElRefs.currentMap;
      return this.props.cells.map((e) => t[e.key]);
    }
  }
  ja.addStateEquality({ eventInstanceHeights: bt });
  class za extends Br {
    constructor() {
      super(...arguments),
        (this.splitBusinessHourSegs = g(Aa)),
        (this.splitBgEventSegs = g(Aa)),
        (this.splitFgEventSegs = g(Aa)),
        (this.splitDateSelectionSegs = g(Aa)),
        (this.splitEventDrag = g(wa)),
        (this.splitEventResize = g(wa)),
        (this.rowRefs = new us());
    }
    render() {
      let { props: r, context: e } = this,
        i = r.cells.length,
        s = this.splitBusinessHourSegs(r.businessHourSegs, i),
        o = this.splitBgEventSegs(r.bgEventSegs, i),
        a = this.splitFgEventSegs(r.fgEventSegs, i),
        l = this.splitDateSelectionSegs(r.dateSelectionSegs, i),
        c = this.splitEventDrag(r.eventDrag, i),
        d = this.splitEventResize(r.eventResize, i),
        u =
          7 <= i && r.clientWidth
            ? r.clientWidth / e.options.aspectRatio / 6
            : null;
      return E(Wi, { unit: "day" }, (e, n) =>
        E(
          R,
          null,
          r.cells.map((e, t) =>
            E(ja, {
              ref: this.rowRefs.createRef(t),
              key: e.length ? e[0].date.toISOString() : t,
              showDayNumbers: 1 < i,
              showWeekNumbers: r.showWeekNumbers,
              todayRange: n,
              dateProfile: r.dateProfile,
              cells: e,
              renderIntro: r.renderRowIntro,
              businessHourSegs: s[t],
              eventSelection: r.eventSelection,
              bgEventSegs: o[t].filter(Ua),
              fgEventSegs: a[t],
              dateSelectionSegs: l[t],
              eventDrag: c[t],
              eventResize: d[t],
              dayMaxEvents: r.dayMaxEvents,
              dayMaxEventRows: r.dayMaxEventRows,
              clientWidth: r.clientWidth,
              clientHeight: r.clientHeight,
              cellMinHeight: u,
              forPrint: r.forPrint,
            })
          )
        )
      );
    }
    componentDidMount() {
      const e = this.rowRefs.currentMap[0].getCellEls()[0];
      (this.rootEl = e ? e.closest(".fc-daygrid-body") : null),
        this.rootEl &&
          this.context.registerInteractiveComponent(this, {
            el: this.rootEl,
            isHitComboAllowed: this.props.isHitComboAllowed,
          });
    }
    componentWillUnmount() {
      this.rootEl &&
        (this.context.unregisterInteractiveComponent(this),
        (this.rootEl = null));
    }
    prepareHits() {
      (this.rowPositions = new Dr(
        this.rootEl,
        this.rowRefs.collect().map((e) => e.getCellEls()[0]),
        !1,
        !0
      )),
        (this.colPositions = new Dr(
          this.rootEl,
          this.rowRefs.currentMap[0].getCellEls(),
          !0,
          !1
        ));
    }
    queryHit(e, t) {
      let { colPositions: n, rowPositions: r } = this;
      var i,
        e = n.leftToIndex(e),
        t = r.topToIndex(t);
      return null != t && null != e
        ? ((i = this.props.cells[t][e]),
          {
            dateProfile: this.props.dateProfile,
            dateSpan: Object.assign(
              { range: this.getCellRange(t, e), allDay: !0 },
              i.extraDateSpan
            ),
            dayEl: this.getCellEl(t, e),
            rect: {
              left: n.lefts[e],
              right: n.rights[e],
              top: r.tops[t],
              bottom: r.bottoms[t],
            },
            layer: 0,
          })
        : null;
    }
    getCellEl(e, t) {
      return this.rowRefs.currentMap[e].getCellEls()[t];
    }
    getCellRange(e, t) {
      e = this.props.cells[e][t].date;
      return { start: e, end: xt(e, 1) };
    }
  }
  function Ua(e) {
    return e.eventRange.def.allDay;
  }
  class Wa extends Br {
    constructor() {
      super(...arguments), (this.elRef = c()), (this.needsScrollReset = !1);
    }
    render() {
      var e = this["props"];
      let { dayMaxEventRows: t, dayMaxEvents: n, expandRows: r } = e,
        i = !0 === n || !0 === t,
        s =
          (i && !r && ((i = !1), (t = null), (n = null)),
          [
            "fc-daygrid-body",
            i ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced",
            r ? "" : "fc-daygrid-body-natural",
          ]);
      return E(
        "div",
        {
          ref: this.elRef,
          className: s.join(" "),
          style: { width: e.clientWidth, minWidth: e.tableMinWidth },
        },
        E(
          "table",
          {
            role: "presentation",
            className: "fc-scrollgrid-sync-table",
            style: {
              width: e.clientWidth,
              minWidth: e.tableMinWidth,
              height: r ? e.clientHeight : "",
            },
          },
          e.colGroupNode,
          E(
            "tbody",
            { role: "presentation" },
            E(za, {
              dateProfile: e.dateProfile,
              cells: e.cells,
              renderRowIntro: e.renderRowIntro,
              showWeekNumbers: e.showWeekNumbers,
              clientWidth: e.clientWidth,
              clientHeight: e.clientHeight,
              businessHourSegs: e.businessHourSegs,
              bgEventSegs: e.bgEventSegs,
              fgEventSegs: e.fgEventSegs,
              dateSelectionSegs: e.dateSelectionSegs,
              eventSelection: e.eventSelection,
              eventDrag: e.eventDrag,
              eventResize: e.eventResize,
              dayMaxEvents: n,
              dayMaxEventRows: t,
              forPrint: e.forPrint,
              isHitComboAllowed: e.isHitComboAllowed,
            })
          )
        )
      );
    }
    componentDidMount() {
      this.requestScrollReset();
    }
    componentDidUpdate(e) {
      e.dateProfile !== this.props.dateProfile
        ? this.requestScrollReset()
        : this.flushScrollReset();
    }
    requestScrollReset() {
      (this.needsScrollReset = !0), this.flushScrollReset();
    }
    flushScrollReset() {
      if (this.needsScrollReset && this.props.clientWidth) {
        const t = (function (e, t) {
          let n;
          t.currentRangeUnit.match(/year|month/) &&
            (n = e.querySelector(`[data-date="${Ft(t.currentDate)}-01"]`));
          n = n || e.querySelector(`[data-date="${Lt(t.currentDate)}"]`);
          return n;
        })(this.elRef.current, this.props.dateProfile);
        if (t) {
          const n = t.closest(".fc-daygrid-body"),
            r = n.closest(".fc-scroller");
          var e = t.getBoundingClientRect().top - n.getBoundingClientRect().top;
          r.scrollTop = e ? 1 + e : 0;
        }
        this.needsScrollReset = !1;
      }
    }
  }
  class La extends qi {
    constructor() {
      super(...arguments), (this.forceDayIfListItem = !0);
    }
    sliceRange(e, t) {
      return t.sliceRange(e);
    }
  }
  class Fa extends Br {
    constructor() {
      super(...arguments), (this.slicer = new La()), (this.tableRef = c());
    }
    render() {
      var { props: e, context: t } = this;
      return E(
        Wa,
        Object.assign(
          { ref: this.tableRef },
          this.slicer.sliceProps(
            e,
            e.dateProfile,
            e.nextDayThreshold,
            t,
            e.dayTableModel
          ),
          {
            dateProfile: e.dateProfile,
            cells: e.dayTableModel.cells,
            colGroupNode: e.colGroupNode,
            tableMinWidth: e.tableMinWidth,
            renderRowIntro: e.renderRowIntro,
            dayMaxEvents: e.dayMaxEvents,
            dayMaxEventRows: e.dayMaxEventRows,
            showWeekNumbers: e.showWeekNumbers,
            expandRows: e.expandRows,
            headerAlignElRef: e.headerAlignElRef,
            clientWidth: e.clientWidth,
            clientHeight: e.clientHeight,
            forPrint: e.forPrint,
          }
        )
      );
    }
  }
  class Va extends zr {
    buildRenderRange(e, t, n) {
      var r = this["props"];
      return Ga({
        currentRange: super.buildRenderRange(e, t, n),
        snapToWeek: /^(year|month)$/.test(t),
        fixedWeekCount: r.fixedWeekCount,
        dateEnv: r.dateEnv,
      });
    }
  }
  function Ga(e) {
    let { dateEnv: t, currentRange: n } = e,
      { start: r, end: i } = n,
      s;
    return (
      e.snapToWeek &&
        ((r = t.startOfWeek(r)),
        (s = t.startOfWeek(i)).valueOf() !== i.valueOf() && (i = Rt(s, 1))),
      e.fixedWeekCount &&
        ((e = t.startOfWeek(t.startOfMonth(xt(n.end, -1)))),
        (e = Math.ceil(_t(e, i))),
        (i = Rt(i, 6 - e))),
      { start: r, end: i }
    );
  }
  class Qa extends Br {
    constructor() {
      super(...arguments), (this.headerElRef = c());
    }
    renderSimpleLayout(e, t) {
      var { props: n, context: r } = this;
      let i = [];
      var s = Ds(r.options);
      return (
        e &&
          i.push({
            type: "header",
            key: "header",
            isSticky: s,
            chunk: {
              elRef: this.headerElRef,
              tableClassName: "fc-col-header",
              rowContent: e,
            },
          }),
        i.push({
          type: "body",
          key: "body",
          liquid: !0,
          chunk: { content: t },
        }),
        E(
          qs,
          { elClasses: ["fc-daygrid"], viewSpec: r.viewSpec },
          E(Cs, {
            liquid: !n.isHeightAuto && !n.forPrint,
            collapsibleWidth: n.forPrint,
            cols: [],
            sections: i,
          })
        )
      );
    }
    renderHScrollLayout(e, t, n, r) {
      var i = this.context.pluginHooks.scrollGridImpl;
      if (!i) throw new Error("No ScrollGrid implementation");
      var { props: s, context: o } = this,
        a = !s.forPrint && Ds(o.options),
        l = !s.forPrint && ws(o.options);
      let c = [];
      return (
        e &&
          c.push({
            type: "header",
            key: "header",
            isSticky: a,
            chunks: [
              {
                key: "main",
                elRef: this.headerElRef,
                tableClassName: "fc-col-header",
                rowContent: e,
              },
            ],
          }),
        c.push({
          type: "body",
          key: "body",
          liquid: !0,
          chunks: [{ key: "main", content: t }],
        }),
        l &&
          c.push({
            type: "footer",
            key: "footer",
            isSticky: !0,
            chunks: [{ key: "main", content: As }],
          }),
        E(
          qs,
          { elClasses: ["fc-daygrid"], viewSpec: o.viewSpec },
          E(i, {
            liquid: !s.isHeightAuto && !s.forPrint,
            forPrint: s.forPrint,
            collapsibleWidth: s.forPrint,
            colGroups: [{ cols: [{ span: n, minWidth: r }] }],
            sections: c,
          })
        )
      );
    }
  }
  function qa(e, t) {
    t = new Gi(e.renderRange, t);
    return new Qi(t, /year|month|week/.test(e.currentRangeUnit));
  }
  ba = ao({
    name: "@fullcalendar/daygrid",
    initialView: "dayGridMonth",
    views: {
      dayGrid: {
        component: class extends Qa {
          constructor() {
            super(...arguments),
              (this.buildDayTableModel = g(qa)),
              (this.headerRef = c()),
              (this.tableRef = c());
          }
          render() {
            let { options: t, dateProfileGenerator: e } = this.context,
              n = this["props"],
              r = this.buildDayTableModel(n.dateProfile, e);
            var i =
                t.dayHeaders &&
                E(Fi, {
                  ref: this.headerRef,
                  dateProfile: n.dateProfile,
                  dates: r.headerDates,
                  datesRepDistinctDays: 1 === r.rowCnt,
                }),
              s = (e) =>
                E(Fa, {
                  ref: this.tableRef,
                  dateProfile: n.dateProfile,
                  dayTableModel: r,
                  businessHours: n.businessHours,
                  dateSelection: n.dateSelection,
                  eventStore: n.eventStore,
                  eventUiBases: n.eventUiBases,
                  eventSelection: n.eventSelection,
                  eventDrag: n.eventDrag,
                  eventResize: n.eventResize,
                  nextDayThreshold: t.nextDayThreshold,
                  colGroupNode: e.tableColGroupNode,
                  tableMinWidth: e.tableMinWidth,
                  dayMaxEvents: t.dayMaxEvents,
                  dayMaxEventRows: t.dayMaxEventRows,
                  showWeekNumbers: t.weekNumbers,
                  expandRows: !n.isHeightAuto,
                  headerAlignElRef: this.headerElRef,
                  clientWidth: e.clientWidth,
                  clientHeight: e.clientHeight,
                  forPrint: n.forPrint,
                });
            return t.dayMinWidth
              ? this.renderHScrollLayout(i, s, r.colCnt, t.dayMinWidth)
              : this.renderSimpleLayout(i, s);
          }
        },
        dateProfileGeneratorClass: Va,
      },
      dayGridDay: { type: "dayGrid", duration: { days: 1 } },
      dayGridWeek: { type: "dayGrid", duration: { weeks: 1 } },
      dayGridMonth: {
        type: "dayGrid",
        duration: { months: 1 },
        fixedWeekCount: !0,
      },
      dayGridYear: { type: "dayGrid", duration: { years: 1 } },
    },
  });
  De(
    '.fc-v-event{background-color:var(--fc-event-bg-color);border:1px solid var(--fc-event-border-color);display:block}.fc-v-event .fc-event-main{color:var(--fc-event-text-color);height:100%}.fc-v-event .fc-event-main-frame{display:flex;flex-direction:column;height:100%}.fc-v-event .fc-event-time{flex-grow:0;flex-shrink:0;max-height:100%;overflow:hidden}.fc-v-event .fc-event-title-container{flex-grow:1;flex-shrink:1;min-height:0}.fc-v-event .fc-event-title{bottom:0;max-height:100%;overflow:hidden;top:0}.fc-v-event:not(.fc-event-start){border-top-left-radius:0;border-top-right-radius:0;border-top-width:0}.fc-v-event:not(.fc-event-end){border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-width:0}.fc-v-event.fc-event-selected:before{left:-10px;right:-10px}.fc-v-event .fc-event-resizer-start{cursor:n-resize}.fc-v-event .fc-event-resizer-end{cursor:s-resize}.fc-v-event:not(.fc-event-selected) .fc-event-resizer{height:var(--fc-event-resizer-thickness);left:0;right:0}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-start{top:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event:not(.fc-event-selected) .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-thickness)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer{left:50%;margin-left:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-start{top:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc-v-event.fc-event-selected .fc-event-resizer-end{bottom:calc(var(--fc-event-resizer-dot-total-width)/-2)}.fc .fc-timegrid .fc-daygrid-body{z-index:2}.fc .fc-timegrid-divider{padding:0 0 2px}.fc .fc-timegrid-body{min-height:100%;position:relative;z-index:1}.fc .fc-timegrid-axis-chunk{position:relative}.fc .fc-timegrid-axis-chunk>table,.fc .fc-timegrid-slots{position:relative;z-index:1}.fc .fc-timegrid-slot{border-bottom:0;height:1.5em}.fc .fc-timegrid-slot:empty:before{content:"\\00a0"}.fc .fc-timegrid-slot-minor{border-top-style:dotted}.fc .fc-timegrid-slot-label-cushion{display:inline-block;white-space:nowrap}.fc .fc-timegrid-slot-label{vertical-align:middle}.fc .fc-timegrid-axis-cushion,.fc .fc-timegrid-slot-label-cushion{padding:0 4px}.fc .fc-timegrid-axis-frame-liquid{height:100%}.fc .fc-timegrid-axis-frame{align-items:center;display:flex;justify-content:flex-end;overflow:hidden}.fc .fc-timegrid-axis-cushion{flex-shrink:0;max-width:60px}.fc-direction-ltr .fc-timegrid-slot-label-frame{text-align:right}.fc-direction-rtl .fc-timegrid-slot-label-frame{text-align:left}.fc-liquid-hack .fc-timegrid-axis-frame-liquid{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col.fc-day-today{background-color:var(--fc-today-bg-color)}.fc .fc-timegrid-col-frame{min-height:100%;position:relative}.fc-media-screen.fc-liquid-hack .fc-timegrid-col-frame{bottom:0;height:auto;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols{bottom:0;left:0;position:absolute;right:0;top:0}.fc-media-screen .fc-timegrid-cols>table{height:100%}.fc-media-screen .fc-timegrid-col-bg,.fc-media-screen .fc-timegrid-col-events,.fc-media-screen .fc-timegrid-now-indicator-container{left:0;position:absolute;right:0;top:0}.fc .fc-timegrid-col-bg{z-index:2}.fc .fc-timegrid-col-bg .fc-non-business{z-index:1}.fc .fc-timegrid-col-bg .fc-bg-event{z-index:2}.fc .fc-timegrid-col-bg .fc-highlight{z-index:3}.fc .fc-timegrid-bg-harness{left:0;position:absolute;right:0}.fc .fc-timegrid-col-events{z-index:3}.fc .fc-timegrid-now-indicator-container{bottom:0;overflow:hidden}.fc-direction-ltr .fc-timegrid-col-events{margin:0 2.5% 0 2px}.fc-direction-rtl .fc-timegrid-col-events{margin:0 2px 0 2.5%}.fc-timegrid-event-harness{position:absolute}.fc-timegrid-event-harness>.fc-timegrid-event{bottom:0;left:0;position:absolute;right:0;top:0}.fc-timegrid-event-harness-inset .fc-timegrid-event,.fc-timegrid-event.fc-event-mirror,.fc-timegrid-more-link{box-shadow:0 0 0 1px var(--fc-page-bg-color)}.fc-timegrid-event,.fc-timegrid-more-link{border-radius:3px;font-size:var(--fc-small-font-size)}.fc-timegrid-event{margin-bottom:1px}.fc-timegrid-event .fc-event-main{padding:1px 1px 0}.fc-timegrid-event .fc-event-time{font-size:var(--fc-small-font-size);margin-bottom:1px;white-space:nowrap}.fc-timegrid-event-short .fc-event-main-frame{flex-direction:row;overflow:hidden}.fc-timegrid-event-short .fc-event-time:after{content:"\\00a0-\\00a0"}.fc-timegrid-event-short .fc-event-title{font-size:var(--fc-small-font-size)}.fc-timegrid-more-link{background:var(--fc-more-link-bg-color);color:var(--fc-more-link-text-color);cursor:pointer;margin-bottom:1px;position:absolute;z-index:9999}.fc-timegrid-more-link-inner{padding:3px 2px;top:0}.fc-direction-ltr .fc-timegrid-more-link{right:0}.fc-direction-rtl .fc-timegrid-more-link{left:0}.fc .fc-timegrid-now-indicator-line{border-color:var(--fc-now-indicator-color);border-style:solid;border-width:1px 0 0;left:0;position:absolute;right:0;z-index:4}.fc .fc-timegrid-now-indicator-arrow{border-color:var(--fc-now-indicator-color);border-style:solid;margin-top:-5px;position:absolute;z-index:4}.fc-direction-ltr .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 0 5px 6px;left:0}.fc-direction-rtl .fc-timegrid-now-indicator-arrow{border-bottom-color:transparent;border-top-color:transparent;border-width:5px 6px 5px 0;right:0}'
  );
  class Ya extends $n {
    getKeyInfo() {
      return { allDay: {}, timed: {} };
    }
    getKeysForDateSpan(e) {
      return e.allDay ? ["allDay"] : ["timed"];
    }
    getKeysForEventDef(e) {
      return e.allDay ? (Yr(e) ? ["timed", "allDay"] : ["allDay"]) : ["timed"];
    }
  }
  const Za = o({
    hour: "numeric",
    minute: "2-digit",
    omitZeroMinute: !0,
    meridiem: "short",
  });
  function Xa(i) {
    let s = [
      "fc-timegrid-slot",
      "fc-timegrid-slot-label",
      i.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor",
    ];
    return E(Or.Consumer, null, (e) => {
      if (!i.isLabeled)
        return E("td", { className: s.join(" "), "data-time": i.isoTimeStr });
      let { dateEnv: t, options: n, viewApi: r } = e;
      (e =
        null == n.slotLabelFormat
          ? Za
          : Array.isArray(n.slotLabelFormat)
          ? o(n.slotLabelFormat[0])
          : o(n.slotLabelFormat)),
        (e = {
          level: 0,
          time: i.time,
          date: t.toDate(i.date),
          view: r,
          text: t.format(i.date, e),
        });
      return E(
        Bi,
        {
          elTag: "td",
          elClasses: s,
          elAttrs: { "data-time": i.isoTimeStr },
          renderProps: e,
          generatorName: "slotLabelContent",
          customGenerator: n.slotLabelContent,
          defaultGenerator: Ja,
          classNameGenerator: n.slotLabelClassNames,
          didMount: n.slotLabelDidMount,
          willUnmount: n.slotLabelWillUnmount,
        },
        (e) =>
          E(
            "div",
            {
              className:
                "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame",
            },
            E(e, {
              elTag: "div",
              elClasses: [
                "fc-timegrid-slot-label-cushion",
                "fc-scrollgrid-shrink-cushion",
              ],
            })
          )
      );
    });
  }
  function Ja(e) {
    return e.text;
  }
  class $a extends n {
    render() {
      return this.props.slatMetas.map((e) =>
        E("tr", { key: e.key }, E(Xa, Object.assign({}, e)))
      );
    }
  }
  const Ka = o({ week: "short" });
  class el extends Br {
    constructor() {
      super(...arguments),
        (this.allDaySplitter = new Ya()),
        (this.headerElRef = c()),
        (this.rootElRef = c()),
        (this.scrollerElRef = c()),
        (this.state = { slatCoords: null }),
        (this.handleScrollTopRequest = (e) => {
          let t = this.scrollerElRef.current;
          t && (t.scrollTop = e);
        }),
        (this.renderHeadAxis = (e, t = "") => {
          var n = this.context["options"],
            r = this.props["dateProfile"],
            r = r.renderRange;
          let i =
            1 === kt(r.start, r.end) ? ur(this.context, r.start, "week") : {};
          return n.weekNumbers && "day" === e
            ? E(
                Bs,
                {
                  elTag: "th",
                  elClasses: ["fc-timegrid-axis", "fc-scrollgrid-shrink"],
                  elAttrs: { "aria-hidden": !0 },
                  date: r.start,
                  defaultFormat: Ka,
                },
                (e) =>
                  E(
                    "div",
                    {
                      className: [
                        "fc-timegrid-axis-frame",
                        "fc-scrollgrid-shrink-frame",
                        "fc-timegrid-axis-frame-liquid",
                      ].join(" "),
                      style: { height: t },
                    },
                    E(e, {
                      elTag: "a",
                      elClasses: [
                        "fc-timegrid-axis-cushion",
                        "fc-scrollgrid-shrink-cushion",
                        "fc-scrollgrid-sync-inner",
                      ],
                      elAttrs: i,
                    })
                  )
              )
            : E(
                "th",
                { "aria-hidden": !0, className: "fc-timegrid-axis" },
                E("div", {
                  className: "fc-timegrid-axis-frame",
                  style: { height: t },
                })
              );
        }),
        (this.renderTableRowAxis = (t) => {
          var { options: e, viewApi: n } = this.context,
            n = { text: e.allDayText, view: n };
          return E(
            Bi,
            {
              elTag: "td",
              elClasses: ["fc-timegrid-axis", "fc-scrollgrid-shrink"],
              elAttrs: { "aria-hidden": !0 },
              renderProps: n,
              generatorName: "allDayContent",
              customGenerator: e.allDayContent,
              defaultGenerator: tl,
              classNameGenerator: e.allDayClassNames,
              didMount: e.allDayDidMount,
              willUnmount: e.allDayWillUnmount,
            },
            (e) =>
              E(
                "div",
                {
                  className: [
                    "fc-timegrid-axis-frame",
                    "fc-scrollgrid-shrink-frame",
                    null == t ? " fc-timegrid-axis-frame-liquid" : "",
                  ].join(" "),
                  style: { height: t },
                },
                E(e, {
                  elTag: "span",
                  elClasses: [
                    "fc-timegrid-axis-cushion",
                    "fc-scrollgrid-shrink-cushion",
                    "fc-scrollgrid-sync-inner",
                  ],
                })
              )
          );
        }),
        (this.handleSlatCoords = (e) => {
          this.setState({ slatCoords: e });
        });
    }
    renderSimpleLayout(e, t, n) {
      let { context: r, props: i } = this,
        s = [];
      var o = Ds(r.options);
      return (
        e &&
          s.push({
            type: "header",
            key: "header",
            isSticky: o,
            chunk: {
              elRef: this.headerElRef,
              tableClassName: "fc-col-header",
              rowContent: e,
            },
          }),
        t &&
          (s.push({ type: "body", key: "all-day", chunk: { content: t } }),
          s.push({
            type: "body",
            key: "all-day-divider",
            outerContent: E(
              "tr",
              { role: "presentation", className: "fc-scrollgrid-section" },
              E("td", {
                className:
                  "fc-timegrid-divider " + r.theme.getClass("tableCellShaded"),
              })
            ),
          })),
        s.push({
          type: "body",
          key: "body",
          liquid: !0,
          expandRows: Boolean(r.options.expandRows),
          chunk: { scrollerElRef: this.scrollerElRef, content: n },
        }),
        E(
          qs,
          {
            elRef: this.rootElRef,
            elClasses: ["fc-timegrid"],
            viewSpec: r.viewSpec,
          },
          E(Cs, {
            liquid: !i.isHeightAuto && !i.forPrint,
            collapsibleWidth: i.forPrint,
            cols: [{ width: "shrink" }],
            sections: s,
          })
        )
      );
    }
    renderHScrollLayout(e, t, n, r, d, u, i) {
      var s = this.context.pluginHooks.scrollGridImpl;
      if (!s) throw new Error("No ScrollGrid implementation");
      let { context: o, props: a } = this;
      var h = !a.forPrint && Ds(o.options),
        f = !a.forPrint && ws(o.options);
      let l = [],
        c =
          (e &&
            l.push({
              type: "header",
              key: "header",
              isSticky: h,
              syncRowHeights: !0,
              chunks: [
                {
                  key: "axis",
                  rowContent: (e) =>
                    E(
                      "tr",
                      { role: "presentation" },
                      this.renderHeadAxis("day", e.rowSyncHeights[0])
                    ),
                },
                {
                  key: "cols",
                  elRef: this.headerElRef,
                  tableClassName: "fc-col-header",
                  rowContent: e,
                },
              ],
            }),
          t &&
            (l.push({
              type: "body",
              key: "all-day",
              syncRowHeights: !0,
              chunks: [
                {
                  key: "axis",
                  rowContent: (e) =>
                    E(
                      "tr",
                      { role: "presentation" },
                      this.renderTableRowAxis(e.rowSyncHeights[0])
                    ),
                },
                { key: "cols", content: t },
              ],
            }),
            l.push({
              key: "all-day-divider",
              type: "body",
              outerContent: E(
                "tr",
                { role: "presentation", className: "fc-scrollgrid-section" },
                E("td", {
                  colSpan: 2,
                  className:
                    "fc-timegrid-divider " +
                    o.theme.getClass("tableCellShaded"),
                })
              ),
            })),
          o.options.nowIndicator);
      return (
        l.push({
          type: "body",
          key: "body",
          liquid: !0,
          expandRows: Boolean(o.options.expandRows),
          chunks: [
            {
              key: "axis",
              content: (e) =>
                E(
                  "div",
                  { className: "fc-timegrid-axis-chunk" },
                  E(
                    "table",
                    {
                      "aria-hidden": !0,
                      style: { height: e.expandRows ? e.clientHeight : "" },
                    },
                    e.tableColGroupNode,
                    E("tbody", null, E($a, { slatMetas: u }))
                  ),
                  E(
                    "div",
                    { className: "fc-timegrid-now-indicator-container" },
                    E(Wi, { unit: c ? "minute" : "day" }, (e) => {
                      var t = c && i && i.safeComputeTop(e);
                      return "number" == typeof t
                        ? E(_s, {
                            elClasses: ["fc-timegrid-now-indicator-arrow"],
                            elStyle: { top: t },
                            isAxis: !0,
                            date: e,
                          })
                        : null;
                    })
                  )
                ),
            },
            { key: "cols", scrollerElRef: this.scrollerElRef, content: n },
          ],
        }),
        f &&
          l.push({
            key: "footer",
            type: "footer",
            isSticky: !0,
            chunks: [
              { key: "axis", content: As },
              { key: "cols", content: As },
            ],
          }),
        E(
          qs,
          {
            elRef: this.rootElRef,
            elClasses: ["fc-timegrid"],
            viewSpec: o.viewSpec,
          },
          E(s, {
            liquid: !a.isHeightAuto && !a.forPrint,
            forPrint: a.forPrint,
            collapsibleWidth: !1,
            colGroups: [
              { width: "shrink", cols: [{ width: "shrink" }] },
              { cols: [{ span: r, minWidth: d }] },
            ],
            sections: l,
          })
        )
      );
    }
    getAllDayMaxEventProps() {
      let { dayMaxEvents: e, dayMaxEventRows: t } = this.context.options;
      return (
        (!0 !== e && !0 !== t) || ((e = void 0), (t = 5)),
        { dayMaxEvents: e, dayMaxEventRows: t }
      );
    }
  }
  function tl(e) {
    return e.text;
  }
  class nl {
    constructor(e, t, n) {
      (this.positions = e), (this.dateProfile = t), (this.slotDuration = n);
    }
    safeComputeTop(t) {
      var n = this["dateProfile"];
      if (or(n.currentRange, t)) {
        let e = v(t);
        t = t.valueOf() - e.valueOf();
        if (t >= dt(n.slotMinTime) && t < dt(n.slotMaxTime))
          return this.computeTimeTop(p(t));
      }
      return null;
    }
    computeDateTop(e, t) {
      return (t = t || v(e)), this.computeTimeTop(p(e.valueOf() - t.valueOf()));
    }
    computeTimeTop(e) {
      let { positions: t, dateProfile: n } = this;
      var r,
        i = t.els.length,
        e = (e.milliseconds - dt(n.slotMinTime)) / dt(this.slotDuration),
        e = Math.max(0, e);
      return (
        (e = Math.min(i, e)),
        (r = Math.floor(e)),
        (e = e - (r = Math.min(r, i - 1))),
        t.tops[r] + t.getHeight(r) * e
      );
    }
  }
  class rl extends n {
    render() {
      let { props: r, context: i } = this,
        s = i["options"],
        o = r["slatElRefs"];
      return E(
        "tbody",
        null,
        r.slatMetas.map((e, t) => {
          var n = {
            time: e.time,
            date: i.dateEnv.toDate(e.date),
            view: i.viewApi,
          };
          return E(
            "tr",
            { key: e.key, ref: o.createRef(e.key) },
            r.axis && E(Xa, Object.assign({}, e)),
            E(Bi, {
              elTag: "td",
              elClasses: [
                "fc-timegrid-slot",
                "fc-timegrid-slot-lane",
                !e.isLabeled && "fc-timegrid-slot-minor",
              ],
              elAttrs: { "data-time": e.isoTimeStr },
              renderProps: n,
              generatorName: "slotLaneContent",
              customGenerator: s.slotLaneContent,
              classNameGenerator: s.slotLaneClassNames,
              didMount: s.slotLaneDidMount,
              willUnmount: s.slotLaneWillUnmount,
            })
          );
        })
      );
    }
  }
  class il extends n {
    constructor() {
      super(...arguments), (this.rootElRef = c()), (this.slatElRefs = new us());
    }
    render() {
      let { props: e, context: t } = this;
      return E(
        "div",
        { ref: this.rootElRef, className: "fc-timegrid-slots" },
        E(
          "table",
          {
            "aria-hidden": !0,
            className: t.theme.getClass("table"),
            style: {
              minWidth: e.tableMinWidth,
              width: e.clientWidth,
              height: e.minHeight,
            },
          },
          e.tableColGroupNode,
          E(rl, {
            slatElRefs: this.slatElRefs,
            axis: e.axis,
            slatMetas: e.slatMetas,
          })
        )
      );
    }
    componentDidMount() {
      this.updateSizing();
    }
    componentDidUpdate() {
      this.updateSizing();
    }
    componentWillUnmount() {
      this.props.onCoords && this.props.onCoords(null);
    }
    updateSizing() {
      let { context: e, props: t } = this;
      var n;
      t.onCoords &&
        null !== t.clientWidth &&
        this.rootElRef.current.offsetHeight &&
        t.onCoords(
          new nl(
            new Dr(
              this.rootElRef.current,
              ((n = this.slatElRefs.currentMap),
              t.slatMetas.map((e) => n[e.key])),
              !1,
              !0
            ),
            this.props.dateProfile,
            e.options.slotDuration
          )
        );
    }
  }
  function sl(e, t) {
    let n = [],
      r;
    for (r = 0; r < t; r += 1) n.push([]);
    if (e) for (r = 0; r < e.length; r += 1) n[e[r].col].push(e[r]);
    return n;
  }
  function ol(t, n) {
    let r = [];
    if (t) {
      for (let e = 0; e < n; e += 1)
        r[e] = {
          affectedInstances: t.affectedInstances,
          isEvent: t.isEvent,
          segs: [],
        };
      for (var e of t.segs) r[e.col].segs.push(e);
    } else for (let e = 0; e < n; e += 1) r[e] = null;
    return r;
  }
  class al extends n {
    render() {
      let e = this["props"];
      return E(
        Ws,
        {
          elClasses: ["fc-timegrid-more-link"],
          elStyle: { top: e.top, bottom: e.bottom },
          allDayDate: null,
          moreCnt: e.hiddenSegs.length,
          allSegs: e.hiddenSegs,
          hiddenSegs: e.hiddenSegs,
          extraDateSpan: e.extraDateSpan,
          dateProfile: e.dateProfile,
          todayRange: e.todayRange,
          popoverContent: () => yl(e.hiddenSegs, e),
          defaultGenerator: ll,
          forceTimed: !0,
        },
        (e) =>
          E(e, {
            elTag: "div",
            elClasses: ["fc-timegrid-more-link-inner", "fc-sticky"],
          })
      );
    }
  }
  function ll(e) {
    return e.shortText;
  }
  function cl(e, t, n) {
    let r = new gi();
    null != t && (r.strictOrder = t), null != n && (r.maxStackCnt = n);
    t = mi(r.addSegs(e));
    return {
      segRects: (function (e) {
        let i = [];
        const s = fl(
          (e, t, n) => vi(e),
          (e, t, n) => {
            let r = Object.assign(Object.assign({}, e), {
              levelCoord: t,
              stackDepth: n,
              stackForward: 0,
            });
            return (
              i.push(r),
              (r.stackForward = o(e.nextLevelNodes, t + e.thickness, n + 1) + 1)
            );
          }
        );
        function o(e, t, n) {
          let r = 0;
          for (var i of e) r = Math.max(s(i, t, n), r);
          return r;
        }
        return o(e, 0, 0), i;
      })(
        (function (e, d) {
          const u = fl(
            (e, t, n) => vi(e),
            (e, t, n) => {
              var r,
                { nextLevelNodes: i, thickness: s } = e,
                o = s + n,
                n = s / o;
              let a,
                l = [];
              if (i.length)
                for (var c of i)
                  void 0 === a
                    ? ((r = u(c, t, o)), (a = r[0]), l.push(r[1]))
                    : ((r = u(c, a, 0)), l.push(r[1]));
              else a = d;
              s = (a - t) * n;
              return [
                a - s,
                Object.assign(Object.assign({}, e), {
                  thickness: s,
                  nextLevelNodes: l,
                }),
              ];
            }
          );
          return e.map((e) => u(e, 0, 0)[1]);
        })(
          (function (r) {
            const i = r["entriesByLevel"],
              s = fl(
                (e, t) => e + ":" + t,
                (e, t) => {
                  var n = dl(
                      (function (e, t, d) {
                        let { levelCoords: n, entriesByLevel: r } = e,
                          i = r[t][d],
                          u = n[t] + i.thickness,
                          s = n.length,
                          o = t;
                        for (; o < s && n[o] < u; o += 1);
                        for (; o < s; o += 1) {
                          var a,
                            l = r[o],
                            c = Ei(l, i.span.start, pi),
                            c = c[0] + c[1];
                          let e = c;
                          for (; (a = l[e]) && a.span.start < i.span.end; )
                            e += 1;
                          if (c < e)
                            return { level: o, lateralStart: c, lateralEnd: e };
                        }
                        return null;
                      })(r, e, t),
                      s
                    ),
                    e = i[e][t];
                  return [
                    Object.assign(Object.assign({}, e), {
                      nextLevelNodes: n[0],
                    }),
                    e.thickness + n[1],
                  ];
                }
              );
            return dl(
              i.length
                ? { level: 0, lateralStart: 0, lateralEnd: i[0].length }
                : null,
              s
            )[0];
          })(r),
          1
        )
      ),
      hiddenGroups: t,
    };
  }
  function dl(e, t) {
    if (!e) return [[], 0];
    var { level: n, lateralStart: e, lateralEnd: r } = e;
    let i = e,
      s = [];
    for (; i < r; ) s.push(t(n, i)), (i += 1);
    return s.sort(ul), [s.map(hl), s[0][1]];
  }
  function ul(e, t) {
    return t[1] - e[1];
  }
  function hl(e) {
    return e[0];
  }
  function fl(n, r) {
    const i = {};
    return (...e) => {
      var t = n(...e);
      return t in i ? i[t] : (i[t] = r(...e));
    };
  }
  function gl(t, n, r = null, i = 0) {
    let s = [];
    if (r)
      for (let e = 0; e < t.length; e += 1) {
        var o = t[e],
          a = r.computeDateTop(o.start, n),
          o = Math.max(a + (i || 0), r.computeDateTop(o.end, n));
        s.push({ start: Math.round(a), end: Math.round(o) });
      }
    return s;
  }
  const pl = o({ hour: "numeric", minute: "2-digit", meridiem: !1 });
  class vl extends n {
    render() {
      return E(
        xs,
        Object.assign({}, this.props, {
          elClasses: [
            "fc-timegrid-event",
            "fc-v-event",
            this.props.isShort && "fc-timegrid-event-short",
          ],
          defaultTimeFormat: pl,
        })
      );
    }
  }
  class ml extends n {
    constructor() {
      super(...arguments), (this.sortEventSegs = g(Kr));
    }
    render() {
      let { props: t, context: e } = this,
        n = e["options"],
        r = n.selectMirror,
        i =
          (t.eventDrag && t.eventDrag.segs) ||
          (t.eventResize && t.eventResize.segs) ||
          (r && t.dateSelectionSegs) ||
          [],
        s =
          (t.eventDrag && t.eventDrag.affectedInstances) ||
          (t.eventResize && t.eventResize.affectedInstances) ||
          {},
        o = this.sortEventSegs(t.fgEventSegs, n.eventOrder);
      return E(
        Ms,
        {
          elTag: "td",
          elRef: t.elRef,
          elClasses: ["fc-timegrid-col", ...(t.extraClassNames || [])],
          elAttrs: Object.assign({ role: "gridcell" }, t.extraDataAttrs),
          date: t.date,
          dateProfile: t.dateProfile,
          todayRange: t.todayRange,
          extraRenderProps: t.extraRenderProps,
        },
        (e) =>
          E(
            "div",
            { className: "fc-timegrid-col-frame" },
            E(
              "div",
              { className: "fc-timegrid-col-bg" },
              this.renderFillSegs(t.businessHourSegs, "non-business"),
              this.renderFillSegs(t.bgEventSegs, "bg-event"),
              this.renderFillSegs(t.dateSelectionSegs, "highlight")
            ),
            E(
              "div",
              { className: "fc-timegrid-col-events" },
              this.renderFgSegs(o, s, !1, !1, !1)
            ),
            E(
              "div",
              { className: "fc-timegrid-col-events" },
              this.renderFgSegs(
                i,
                {},
                Boolean(t.eventDrag),
                Boolean(t.eventResize),
                Boolean(r),
                "mirror"
              )
            ),
            E(
              "div",
              { className: "fc-timegrid-now-indicator-container" },
              this.renderNowIndicator(t.nowIndicatorSegs)
            ),
            Is(n) && E(e, { elTag: "div", elClasses: ["fc-timegrid-col-misc"] })
          )
      );
    }
    renderFgSegs(e, t, n, r, i, s) {
      var o = this["props"];
      return o.forPrint
        ? yl(e, o)
        : this.renderPositionedFgSegs(e, t, n, r, i, s);
    }
    renderPositionedFgSegs(e, a, l, c, d, u) {
      let {
          eventMaxStack: t,
          eventShortHeight: h,
          eventOrderStrict: n,
          eventMinHeight: r,
        } = this.context.options,
        {
          date: i,
          slatCoords: s,
          eventSelection: g,
          todayRange: p,
          nowDate: v,
        } = this.props,
        f = l || c || d;
      let { segPlacements: o, hiddenGroups: m } = (function (t, n, e, r) {
        let i = [],
          s = [];
        for (let e = 0; e < t.length; e += 1) {
          var o = n[e];
          o ? i.push({ index: e, thickness: 1, span: o }) : s.push(t[e]);
        }
        var a,
          l,
          { segRects: e, hiddenGroups: r } = cl(i, e, r);
        let c = [];
        for (a of e) c.push({ seg: t[a.index], rect: a });
        for (l of s) c.push({ seg: l, rect: null });
        return { segPlacements: c, hiddenGroups: r };
      })(e, gl(e, i, s, r), n, t);
      return E(
        R,
        null,
        this.renderHiddenGroups(m, e),
        o.map((e) => {
          var { seg: e, rect: t } = e,
            n = e.eventRange.instance.instanceId,
            r = f || Boolean(!a[n] && t),
            i = bl(t && t.span),
            s = !f && t ? this.computeSegHStyle(t) : { left: 0, right: 0 },
            o = Boolean(t) && 0 < t.stackForward,
            t = Boolean(t) && t.span.end - t.span.start < h;
          return E(
            "div",
            {
              className:
                "fc-timegrid-event-harness" +
                (o ? " fc-timegrid-event-harness-inset" : ""),
              key: u || n,
              style: Object.assign(
                Object.assign({ visibility: r ? "" : "hidden" }, i),
                s
              ),
            },
            E(
              vl,
              Object.assign(
                {
                  seg: e,
                  isDragging: l,
                  isResizing: c,
                  isDateSelecting: d,
                  isSelected: n === g,
                  isShort: t,
                },
                ni(e, p, v)
              )
            )
          );
        })
      );
    }
    renderHiddenGroups(e, r) {
      let {
        extraDateSpan: i,
        dateProfile: s,
        todayRange: o,
        nowDate: a,
        eventSelection: l,
        eventDrag: c,
        eventResize: d,
      } = this.props;
      return E(
        R,
        null,
        e.map((e) => {
          var t,
            n = bl(e.span),
            e = ((e = e.entries), (t = r), e.map((e) => t[e.index]));
          return E(al, {
            key: Wt(Vs(e)),
            hiddenSegs: e,
            top: n.top,
            bottom: n.bottom,
            extraDateSpan: i,
            dateProfile: s,
            todayRange: o,
            nowDate: a,
            eventSelection: l,
            eventDrag: c,
            eventResize: d,
          });
        })
      );
    }
    renderFillSegs(n, r) {
      let { props: i, context: e } = this,
        t = gl(n, i.date, i.slatCoords, e.options.eventMinHeight);
      var s = t.map((e, t) => {
        t = n[t];
        return E(
          "div",
          {
            key: ri(t.eventRange),
            className: "fc-timegrid-bg-harness",
            style: bl(e),
          },
          "bg-event" === r
            ? E(Ns, Object.assign({ seg: t }, ni(t, i.todayRange, i.nowDate)))
            : Hs(r)
        );
      });
      return E(R, null, s);
    }
    renderNowIndicator(e) {
      let { slatCoords: n, date: r } = this.props;
      return n
        ? e.map((e, t) =>
            E(_s, {
              key: t,
              elClasses: ["fc-timegrid-now-indicator-line"],
              elStyle: { top: n.computeDateTop(e.start, r) },
              isAxis: !1,
              date: r,
            })
          )
        : null;
    }
    computeSegHStyle(e) {
      var { isRtl: t, options: n } = this.context,
        n = n.slotEventOverlap,
        r = e.levelCoord;
      let i = e.levelCoord + e.thickness,
        s,
        o,
        a =
          (n && (i = Math.min(1, r + 2 * (i - r))),
          (o = t ? ((s = 1 - i), r) : ((s = r), 1 - i)),
          {
            zIndex: e.stackDepth + 1,
            left: 100 * s + "%",
            right: 100 * o + "%",
          });
      return (
        n && !e.stackForward && (a[t ? "marginLeft" : "marginRight"] = 20), a
      );
    }
  }
  function yl(
    e,
    {
      todayRange: n,
      nowDate: r,
      eventSelection: i,
      eventDrag: t,
      eventResize: s,
    }
  ) {
    let o =
      (t ? t.affectedInstances : null) ||
      (s ? s.affectedInstances : null) ||
      {};
    return E(
      R,
      null,
      e.map((e) => {
        var t = e.eventRange.instance.instanceId;
        return E(
          "div",
          { key: t, style: { visibility: o[t] ? "hidden" : "" } },
          E(
            vl,
            Object.assign(
              {
                seg: e,
                isDragging: !1,
                isResizing: !1,
                isDateSelecting: !1,
                isSelected: t === i,
                isShort: !1,
              },
              ni(e, n, r)
            )
          )
        );
      })
    );
  }
  function bl(e) {
    return e ? { top: e.start, bottom: -e.end } : { top: "", bottom: "" };
  }
  class El extends n {
    constructor() {
      super(...arguments),
        (this.splitFgEventSegs = g(sl)),
        (this.splitBgEventSegs = g(sl)),
        (this.splitBusinessHourSegs = g(sl)),
        (this.splitNowIndicatorSegs = g(sl)),
        (this.splitDateSelectionSegs = g(sl)),
        (this.splitEventDrag = g(ol)),
        (this.splitEventResize = g(ol)),
        (this.rootElRef = c()),
        (this.cellElRefs = new us());
    }
    render() {
      let { props: n, context: e } = this;
      var t =
          e.options.nowIndicator &&
          n.slatCoords &&
          n.slatCoords.safeComputeTop(n.nowDate),
        r = n.cells.length;
      let i = this.splitFgEventSegs(n.fgEventSegs, r),
        s = this.splitBgEventSegs(n.bgEventSegs, r),
        o = this.splitBusinessHourSegs(n.businessHourSegs, r),
        a = this.splitNowIndicatorSegs(n.nowIndicatorSegs, r),
        l = this.splitDateSelectionSegs(n.dateSelectionSegs, r),
        c = this.splitEventDrag(n.eventDrag, r),
        d = this.splitEventResize(n.eventResize, r);
      return E(
        "div",
        { className: "fc-timegrid-cols", ref: this.rootElRef },
        E(
          "table",
          {
            role: "presentation",
            style: { minWidth: n.tableMinWidth, width: n.clientWidth },
          },
          n.tableColGroupNode,
          E(
            "tbody",
            { role: "presentation" },
            E(
              "tr",
              { role: "row" },
              n.axis &&
                E(
                  "td",
                  {
                    "aria-hidden": !0,
                    className: "fc-timegrid-col fc-timegrid-axis",
                  },
                  E(
                    "div",
                    { className: "fc-timegrid-col-frame" },
                    E(
                      "div",
                      { className: "fc-timegrid-now-indicator-container" },
                      "number" == typeof t &&
                        E(_s, {
                          elClasses: ["fc-timegrid-now-indicator-arrow"],
                          elStyle: { top: t },
                          isAxis: !0,
                          date: n.nowDate,
                        })
                    )
                  )
                ),
              n.cells.map((e, t) =>
                E(ml, {
                  key: e.key,
                  elRef: this.cellElRefs.createRef(e.key),
                  dateProfile: n.dateProfile,
                  date: e.date,
                  nowDate: n.nowDate,
                  todayRange: n.todayRange,
                  extraRenderProps: e.extraRenderProps,
                  extraDataAttrs: e.extraDataAttrs,
                  extraClassNames: e.extraClassNames,
                  extraDateSpan: e.extraDateSpan,
                  fgEventSegs: i[t],
                  bgEventSegs: s[t],
                  businessHourSegs: o[t],
                  nowIndicatorSegs: a[t],
                  dateSelectionSegs: l[t],
                  eventDrag: c[t],
                  eventResize: d[t],
                  slatCoords: n.slatCoords,
                  eventSelection: n.eventSelection,
                  forPrint: n.forPrint,
                })
              )
            )
          )
        )
      );
    }
    componentDidMount() {
      this.updateCoords();
    }
    componentDidUpdate() {
      this.updateCoords();
    }
    updateCoords() {
      let e = this["props"];
      var t;
      e.onColCoords &&
        null !== e.clientWidth &&
        e.onColCoords(
          new Dr(
            this.rootElRef.current,
            ((t = this.cellElRefs.currentMap), e.cells.map((e) => t[e.key])),
            !0,
            !1
          )
        );
    }
  }
  class Sl extends Br {
    constructor() {
      super(...arguments),
        (this.processSlotOptions = g(Al)),
        (this.state = { slatCoords: null }),
        (this.handleRootEl = (e) => {
          e
            ? this.context.registerInteractiveComponent(this, {
                el: e,
                isHitComboAllowed: this.props.isHitComboAllowed,
              })
            : this.context.unregisterInteractiveComponent(this);
        }),
        (this.handleScrollRequest = (t) => {
          let n = this.props["onScrollTopRequest"],
            r = this.state["slatCoords"];
          if (n && r) {
            if (t.time) {
              let e = r.computeTimeTop(t.time);
              (e = Math.ceil(e)) && (e += 1), n(e);
            }
            return !0;
          }
          return !1;
        }),
        (this.handleColCoords = (e) => {
          this.colCoords = e;
        }),
        (this.handleSlatCoords = (e) => {
          this.setState({ slatCoords: e }),
            this.props.onSlatCoords && this.props.onSlatCoords(e);
        });
    }
    render() {
      var { props: e, state: t } = this;
      return E(
        "div",
        {
          className: "fc-timegrid-body",
          ref: this.handleRootEl,
          style: { width: e.clientWidth, minWidth: e.tableMinWidth },
        },
        E(il, {
          axis: e.axis,
          dateProfile: e.dateProfile,
          slatMetas: e.slatMetas,
          clientWidth: e.clientWidth,
          minHeight: e.expandRows ? e.clientHeight : "",
          tableMinWidth: e.tableMinWidth,
          tableColGroupNode: e.axis ? e.tableColGroupNode : null,
          onCoords: this.handleSlatCoords,
        }),
        E(El, {
          cells: e.cells,
          axis: e.axis,
          dateProfile: e.dateProfile,
          businessHourSegs: e.businessHourSegs,
          bgEventSegs: e.bgEventSegs,
          fgEventSegs: e.fgEventSegs,
          dateSelectionSegs: e.dateSelectionSegs,
          eventSelection: e.eventSelection,
          eventDrag: e.eventDrag,
          eventResize: e.eventResize,
          todayRange: e.todayRange,
          nowDate: e.nowDate,
          nowIndicatorSegs: e.nowIndicatorSegs,
          clientWidth: e.clientWidth,
          tableMinWidth: e.tableMinWidth,
          tableColGroupNode: e.tableColGroupNode,
          slatCoords: t.slatCoords,
          onColCoords: this.handleColCoords,
          forPrint: e.forPrint,
        })
      );
    }
    componentDidMount() {
      this.scrollResponder = this.context.createScrollResponder(
        this.handleScrollRequest
      );
    }
    componentDidUpdate(e) {
      this.scrollResponder.update(e.dateProfile !== this.props.dateProfile);
    }
    componentWillUnmount() {
      this.scrollResponder.detach();
    }
    queryHit(e, t) {
      let { dateEnv: n, options: d } = this.context,
        r = this["colCoords"];
      var i = this.props["dateProfile"];
      let s = this.state["slatCoords"];
      var u,
        o,
        a,
        h,
        { snapDuration: f, snapsPerSlot: l } = this.processSlotOptions(
          this.props.slotDuration,
          d.snapDuration
        ),
        e = r.leftToIndex(e),
        c = s.positions.topToIndex(t);
      return null != e && null != c
        ? ((u = this.props.cells[e]),
          (o = s.positions.tops[c]),
          (a = s.positions.getHeight(c)),
          (t = Math.floor(((t - o) / a) * l)),
          (h = this.props.cells[e].date),
          (c = at(i.slotMinTime, lt(f, c * l + t))),
          (l = n.add(h, c)),
          (t = n.add(l, f)),
          {
            dateProfile: i,
            dateSpan: Object.assign(
              { range: { start: l, end: t }, allDay: !1 },
              u.extraDateSpan
            ),
            dayEl: r.els[e],
            rect: {
              left: r.lefts[e],
              right: r.rights[e],
              top: o,
              bottom: o + a,
            },
            layer: 0,
          })
        : null;
    }
  }
  function Al(e, t) {
    let n = t || e,
      r = ut(e, n);
    return (
      null === r && ((n = e), (r = 1)), { snapDuration: n, snapsPerSlot: r }
    );
  }
  class Dl extends qi {
    sliceRange(n, r) {
      let i = [];
      for (let t = 0; t < r.length; t += 1) {
        let e = nr(n, r[t]);
        e &&
          i.push({
            start: e.start,
            end: e.end,
            isStart: e.start.valueOf() === n.start.valueOf(),
            isEnd: e.end.valueOf() === n.end.valueOf(),
            col: t,
          });
      }
      return i;
    }
  }
  class wl extends Br {
    constructor() {
      super(...arguments),
        (this.buildDayRanges = g(Cl)),
        (this.slicer = new Dl()),
        (this.timeColsRef = c());
    }
    render() {
      let { props: n, context: r } = this,
        { dateProfile: i, dayTableModel: s } = n,
        { nowIndicator: o, nextDayThreshold: a } = r.options,
        l = this.buildDayRanges(s, i, r.dateEnv);
      return E(Wi, { unit: o ? "minute" : "day" }, (e, t) =>
        E(
          Sl,
          Object.assign(
            { ref: this.timeColsRef },
            this.slicer.sliceProps(n, i, null, r, l),
            {
              forPrint: n.forPrint,
              axis: n.axis,
              dateProfile: i,
              slatMetas: n.slatMetas,
              slotDuration: n.slotDuration,
              cells: s.cells[0],
              tableColGroupNode: n.tableColGroupNode,
              tableMinWidth: n.tableMinWidth,
              clientWidth: n.clientWidth,
              clientHeight: n.clientHeight,
              expandRows: n.expandRows,
              nowDate: e,
              nowIndicatorSegs: o && this.slicer.sliceNowDate(e, i, a, r, l),
              todayRange: t,
              onScrollTopRequest: n.onScrollTopRequest,
              onSlatCoords: n.onSlatCoords,
            }
          )
        )
      );
    }
  }
  function Cl(e, t, n) {
    let r = [];
    for (var i of e.headerDates)
      r.push({ start: n.add(i, t.slotMinTime), end: n.add(i, t.slotMaxTime) });
    return r;
  }
  const Rl = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 },
  ];
  function xl(e, t, n, r, i) {
    var s = new Date(0);
    let o = e,
      a = p(0);
    var l =
      n ||
      (function (e) {
        let t, n, r;
        for (t = Rl.length - 1; 0 <= t; --t)
          if (((n = p(Rl[t])), null !== (r = ut(n, e)) && 1 < r)) return n;
        return e;
      })(r);
    let c = [];
    for (; dt(o) < dt(t); ) {
      let e = i.add(s, o);
      var d = null !== ut(a, l);
      c.push({
        date: e,
        time: o,
        key: e.toISOString(),
        isoTimeStr: Vt(e),
        isLabeled: d,
      }),
        (o = at(o, r)),
        (a = at(a, r));
    }
    return c;
  }
  function Tl(e, t) {
    e = new Gi(e.renderRange, t);
    return new Qi(e, !1);
  }
  var _l = ao({
    name: "@fullcalendar/timegrid",
    initialView: "timeGridWeek",
    optionRefiners: { allDaySlot: Boolean },
    views: {
      timeGrid: {
        component: class extends el {
          constructor() {
            super(...arguments),
              (this.buildTimeColsModel = g(Tl)),
              (this.buildSlatMetas = g(xl));
          }
          render() {
            let {
                options: t,
                dateEnv: d,
                dateProfileGenerator: u,
              } = this.context,
              n = this["props"],
              r = n["dateProfile"],
              i = this.buildTimeColsModel(r, u),
              s = this.allDaySplitter.splitProps(n),
              o = this.buildSlatMetas(
                r.slotMinTime,
                r.slotMaxTime,
                t.slotLabelInterval,
                t.slotDuration,
                d
              );
            var e = t["dayMinWidth"];
            let a = !e;
            var h = e,
              l =
                t.dayHeaders &&
                E(Fi, {
                  dates: i.headerDates,
                  dateProfile: r,
                  datesRepDistinctDays: !0,
                  renderIntro: a ? this.renderHeadAxis : null,
                }),
              c =
                !1 !== t.allDaySlot &&
                ((e) =>
                  E(
                    Fa,
                    Object.assign(
                      {},
                      s.allDay,
                      {
                        dateProfile: r,
                        dayTableModel: i,
                        nextDayThreshold: t.nextDayThreshold,
                        tableMinWidth: e.tableMinWidth,
                        colGroupNode: e.tableColGroupNode,
                        renderRowIntro: a ? this.renderTableRowAxis : null,
                        showWeekNumbers: !1,
                        expandRows: !1,
                        headerAlignElRef: this.headerElRef,
                        clientWidth: e.clientWidth,
                        clientHeight: e.clientHeight,
                        forPrint: n.forPrint,
                      },
                      this.getAllDayMaxEventProps()
                    )
                  )),
              f = (e) =>
                E(
                  wl,
                  Object.assign({}, s.timed, {
                    dayTableModel: i,
                    dateProfile: r,
                    axis: a,
                    slotDuration: t.slotDuration,
                    slatMetas: o,
                    forPrint: n.forPrint,
                    tableColGroupNode: e.tableColGroupNode,
                    tableMinWidth: e.tableMinWidth,
                    clientWidth: e.clientWidth,
                    clientHeight: e.clientHeight,
                    onSlatCoords: this.handleSlatCoords,
                    expandRows: e.expandRows,
                    onScrollTopRequest: this.handleScrollTopRequest,
                  })
                );
            return h
              ? this.renderHScrollLayout(
                  l,
                  c,
                  f,
                  i.colCnt,
                  e,
                  o,
                  this.state.slatCoords
                )
              : this.renderSimpleLayout(l, c, f);
          }
        },
        usesMinMaxTime: !0,
        allDaySlot: !0,
        slotDuration: "00:30:00",
        slotEventOverlap: !0,
      },
      timeGridDay: { type: "timeGrid", duration: { days: 1 } },
      timeGridWeek: { type: "timeGrid", duration: { weeks: 1 } },
    },
  });
  De(
    ':root{--fc-list-event-dot-width:10px;--fc-list-event-hover-bg-color:#f5f5f5}.fc-theme-standard .fc-list{border:1px solid var(--fc-border-color)}.fc .fc-list-empty{align-items:center;background-color:var(--fc-neutral-bg-color);display:flex;height:100%;justify-content:center}.fc .fc-list-empty-cushion{margin:5em 0}.fc .fc-list-table{border-style:hidden;width:100%}.fc .fc-list-table tr>*{border-left:0;border-right:0}.fc .fc-list-sticky .fc-list-day>*{background:var(--fc-page-bg-color);position:sticky;top:0}.fc .fc-list-table thead{left:-10000px;position:absolute}.fc .fc-list-table tbody>tr:first-child th{border-top:0}.fc .fc-list-table th{padding:0}.fc .fc-list-day-cushion,.fc .fc-list-table td{padding:8px 14px}.fc .fc-list-day-cushion:after{clear:both;content:"";display:table}.fc-theme-standard .fc-list-day-cushion{background-color:var(--fc-neutral-bg-color)}.fc-direction-ltr .fc-list-day-text,.fc-direction-rtl .fc-list-day-side-text{float:left}.fc-direction-ltr .fc-list-day-side-text,.fc-direction-rtl .fc-list-day-text{float:right}.fc-direction-ltr .fc-list-table .fc-list-event-graphic{padding-right:0}.fc-direction-rtl .fc-list-table .fc-list-event-graphic{padding-left:0}.fc .fc-list-event.fc-event-forced-url{cursor:pointer}.fc .fc-list-event:hover td{background-color:var(--fc-list-event-hover-bg-color)}.fc .fc-list-event-graphic,.fc .fc-list-event-time{white-space:nowrap;width:1px}.fc .fc-list-event-dot{border:calc(var(--fc-list-event-dot-width)/2) solid var(--fc-event-border-color);border-radius:calc(var(--fc-list-event-dot-width)/2);box-sizing:content-box;display:inline-block;height:0;width:0}.fc .fc-list-event-title a{color:inherit;text-decoration:none}.fc .fc-list-event.fc-event-forced-url:hover a{text-decoration:underline}'
  );
  class kl extends n {
    constructor() {
      super(...arguments), (this.state = { textId: He() });
    }
    render() {
      let { theme: t, dateEnv: e, options: n, viewApi: r } = this.context,
        { cellId: i, dayDate: s, todayRange: o } = this.props,
        a = this.state["textId"];
      var l = ar(s, o),
        c = n.listDayFormat ? e.format(s, n.listDayFormat) : "",
        d = n.listDaySideFormat ? e.format(s, n.listDaySideFormat) : "",
        c = Object.assign(
          {
            date: e.toDate(s),
            view: r,
            textId: a,
            text: c,
            sideText: d,
            navLinkAttrs: ur(this.context, s),
            sideNavLinkAttrs: ur(this.context, s, "day", !1),
          },
          l
        );
      return E(
        Bi,
        {
          elTag: "tr",
          elClasses: ["fc-list-day", ...lr(l, t)],
          elAttrs: { "data-date": Lt(s) },
          renderProps: c,
          generatorName: "dayHeaderContent",
          customGenerator: n.dayHeaderContent,
          defaultGenerator: Ml,
          classNameGenerator: n.dayHeaderClassNames,
          didMount: n.dayHeaderDidMount,
          willUnmount: n.dayHeaderWillUnmount,
        },
        (e) =>
          E(
            "th",
            { scope: "colgroup", colSpan: 3, id: i, "aria-labelledby": a },
            E(e, {
              elTag: "div",
              elClasses: ["fc-list-day-cushion", t.getClass("tableCellShaded")],
            })
          )
      );
    }
  }
  function Ml(e) {
    return E(
      R,
      null,
      e.text &&
        E(
          "a",
          Object.assign(
            { id: e.textId, className: "fc-list-day-text" },
            e.navLinkAttrs
          ),
          e.text
        ),
      e.sideText &&
        E(
          "a",
          Object.assign(
            { "aria-hidden": !0, className: "fc-list-day-side-text" },
            e.sideNavLinkAttrs
          ),
          e.sideText
        )
    );
  }
  const Il = o({ hour: "numeric", minute: "2-digit", meridiem: "short" });
  class Ol extends n {
    render() {
      let { props: e, context: n } = this;
      var t = n["options"];
      let { seg: r, timeHeaderId: i, eventHeaderId: s, dateHeaderId: o } = e,
        a = t.eventTimeFormat || Il;
      return E(
        Rs,
        Object.assign({}, e, {
          elTag: "tr",
          elClasses: [
            "fc-list-event",
            r.eventRange.def.url && "fc-event-forced-url",
          ],
          defaultGenerator: () => {
            var e = r,
              t = n;
            return (
              (t = ii(e, t)),
              E("a", Object.assign({}, t), e.eventRange.def.title)
            );
          },
          seg: r,
          timeText: "",
          disableDragging: !0,
          disableResizing: !0,
        }),
        (e, t) =>
          E(
            R,
            null,
            (function (n, r, i, s, o) {
              var a = i["options"];
              if (!1 === a.displayEventTime) return null;
              {
                var l = n.eventRange.def,
                  c = n.eventRange.instance;
                let e = !1,
                  t;
                return (
                  l.allDay
                    ? (e = !0)
                    : Ln(n.eventRange.range)
                    ? n.isStart
                      ? (t = ti(n, r, i, null, null, c.range.start, n.end))
                      : n.isEnd
                      ? (t = ti(n, r, i, null, null, n.start, c.range.end))
                      : (e = !0)
                    : (t = ti(n, r, i)),
                  e
                    ? ((l = { text: i.options.allDayText, view: i.viewApi }),
                      E(Bi, {
                        elTag: "td",
                        elClasses: ["fc-list-event-time"],
                        elAttrs: { headers: s + " " + o },
                        renderProps: l,
                        generatorName: "allDayContent",
                        customGenerator: a.allDayContent,
                        defaultGenerator: Nl,
                        classNameGenerator: a.allDayClassNames,
                        didMount: a.allDayDidMount,
                        willUnmount: a.allDayWillUnmount,
                      }))
                    : E("td", { className: "fc-list-event-time" }, t)
                );
              }
            })(r, a, n, i, o),
            E(
              "td",
              { "aria-hidden": !0, className: "fc-list-event-graphic" },
              E("span", {
                className: "fc-list-event-dot",
                style: { borderColor: t.borderColor || t.backgroundColor },
              })
            ),
            E(e, {
              elTag: "td",
              elClasses: ["fc-list-event-title"],
              elAttrs: { headers: s + " " + o },
            })
          )
      );
    }
  }
  function Nl(e) {
    return e.text;
  }
  function Pl(e) {
    return e.text;
  }
  function Hl(e) {
    let t = v(e.renderRange.start);
    var n = e.renderRange.end;
    let r = [],
      i = [];
    for (; t < n; )
      r.push(t), i.push({ start: t, end: xt(t, 1) }), (t = xt(t, 1));
    return { dayDates: r, dayRanges: i };
  }
  function Bl(e) {
    return !1 === e ? null : o(e);
  }
  var jl = ao({
    name: "@fullcalendar/list",
    optionRefiners: {
      listDayFormat: Bl,
      listDaySideFormat: Bl,
      noEventsClassNames: e,
      noEventsContent: e,
      noEventsDidMount: e,
      noEventsWillUnmount: e,
    },
    views: {
      list: {
        component: class extends Br {
          constructor() {
            super(...arguments),
              (this.computeDateVars = g(Hl)),
              (this.eventStoreToSegs = g(this._eventStoreToSegs)),
              (this.state = {
                timeHeaderId: He(),
                eventHeaderId: He(),
                dateHeaderIdRoot: He(),
              }),
              (this.setRootEl = (e) => {
                e
                  ? this.context.registerInteractiveComponent(this, { el: e })
                  : this.context.unregisterInteractiveComponent(this);
              });
          }
          render() {
            let { props: e, context: t } = this;
            var { dayDates: n, dayRanges: r } = this.computeDateVars(
                e.dateProfile
              ),
              r = this.eventStoreToSegs(e.eventStore, e.eventUiBases, r);
            return E(
              qs,
              {
                elRef: this.setRootEl,
                elClasses: [
                  "fc-list",
                  t.theme.getClass("table"),
                  !1 !== t.options.stickyHeaderDates ? "fc-list-sticky" : "",
                ],
                viewSpec: t.viewSpec,
              },
              E(
                ds,
                {
                  liquid: !e.isHeightAuto,
                  overflowX: e.isHeightAuto ? "visible" : "hidden",
                  overflowY: e.isHeightAuto ? "visible" : "auto",
                },
                0 < r.length
                  ? this.renderSegList(r, n)
                  : this.renderEmptyMessage()
              )
            );
          }
          renderEmptyMessage() {
            var { options: e, viewApi: t } = this.context,
              t = { text: e.noEventsText, view: t };
            return E(
              Bi,
              {
                elTag: "div",
                elClasses: ["fc-list-empty"],
                renderProps: t,
                generatorName: "noEventsContent",
                customGenerator: e.noEventsContent,
                defaultGenerator: Pl,
                classNameGenerator: e.noEventsClassNames,
                didMount: e.noEventsDidMount,
                willUnmount: e.noEventsWillUnmount,
              },
              (e) =>
                E(e, { elTag: "div", elClasses: ["fc-list-empty-cushion"] })
            );
          }
          renderSegList(e, l) {
            let { theme: c, options: d } = this.context,
              {
                timeHeaderId: u,
                eventHeaderId: h,
                dateHeaderIdRoot: f,
              } = this.state,
              g = (function (e) {
                let t = [],
                  n,
                  r;
                for (n = 0; n < e.length; n += 1)
                  (r = e[n]), (t[r.dayIndex] || (t[r.dayIndex] = [])).push(r);
                return t;
              })(e);
            return E(Wi, { unit: "day" }, (t, n) => {
              let r = [];
              for (let e = 0; e < g.length; e += 1) {
                var i = g[e];
                if (i) {
                  var s,
                    o = Lt(l[e]),
                    a = f + "-" + o;
                  r.push(
                    E(kl, { key: o, cellId: a, dayDate: l[e], todayRange: n })
                  );
                  for (s of Kr(i, d.eventOrder))
                    r.push(
                      E(
                        Ol,
                        Object.assign(
                          {
                            key: o + ":" + s.eventRange.instance.instanceId,
                            seg: s,
                            isDragging: !1,
                            isResizing: !1,
                            isDateSelecting: !1,
                            isSelected: !1,
                            timeHeaderId: u,
                            eventHeaderId: h,
                            dateHeaderId: a,
                          },
                          ni(s, n, t)
                        )
                      )
                    );
                }
              }
              return E(
                "table",
                { className: "fc-list-table " + c.getClass("table") },
                E(
                  "thead",
                  null,
                  E(
                    "tr",
                    null,
                    E("th", { scope: "col", id: u }, d.timeHint),
                    E("th", { scope: "col", "aria-hidden": !0 }),
                    E("th", { scope: "col", id: h }, d.eventHint)
                  )
                ),
                E("tbody", null, r)
              );
            });
          }
          _eventStoreToSegs(e, t, n) {
            return this.eventRangesToSegs(
              qr(
                e,
                t,
                this.props.dateProfile.activeRange,
                this.context.options.nextDayThreshold
              ).fg,
              n
            );
          }
          eventRangesToSegs(e, t) {
            let n = [];
            for (var r of e) n.push(...this.eventRangeToSegs(r, t));
            return n;
          }
          eventRangeToSegs(e, t) {
            let n = this.context["dateEnv"];
            var r = this.context.options["nextDayThreshold"];
            let i = e.range;
            var s = e.def.allDay;
            let o,
              a,
              l,
              c = [];
            for (o = 0; o < t.length; o += 1)
              if (
                (a = nr(i, t[o])) &&
                ((l = {
                  component: this,
                  eventRange: e,
                  start: a.start,
                  end: a.end,
                  isStart: e.isStart && a.start.valueOf() === i.start.valueOf(),
                  isEnd: e.isEnd && a.end.valueOf() === i.end.valueOf(),
                  dayIndex: o,
                }),
                c.push(l),
                !l.isEnd &&
                  !s &&
                  o + 1 < t.length &&
                  i.end < n.add(t[o + 1].start, r))
              ) {
                (l.end = i.end), (l.isEnd = !0);
                break;
              }
            return c;
          }
        },
        buttonTextKey: "list",
        listDayFormat: { month: "long", day: "numeric", year: "numeric" },
      },
      listDay: {
        type: "list",
        duration: { days: 1 },
        listDayFormat: { weekday: "long" },
      },
      listWeek: {
        type: "list",
        duration: { weeks: 1 },
        listDayFormat: { weekday: "long" },
        listDaySideFormat: { month: "long", day: "numeric", year: "numeric" },
      },
      listMonth: {
        type: "list",
        duration: { month: 1 },
        listDaySideFormat: { weekday: "long" },
      },
      listYear: {
        type: "list",
        duration: { year: 1 },
        listDaySideFormat: { weekday: "long" },
      },
    },
  });
  class zl extends Br {
    constructor() {
      super(...arguments),
        (this.buildDayTableModel = g(qa)),
        (this.slicer = new La()),
        (this.state = { labelId: He() });
    }
    render() {
      const { props: e, state: t, context: n } = this,
        { dateProfile: r, forPrint: i } = e;
      var s = n["options"],
        o = this.buildDayTableModel(r, n.dateProfileGenerator),
        a = this.slicer.sliceProps(e, r, s.nextDayThreshold, n, o),
        l = null != e.tableWidth ? e.tableWidth / s.aspectRatio : null,
        c = o.cells.length,
        c = null != l ? l / c : null;
      return E(
        "div",
        {
          ref: e.elRef,
          "data-date": e.isoDateStr,
          className: "fc-multimonth-month",
          style: { width: e.width },
          role: "grid",
          "aria-labelledby": t.labelId,
        },
        E(
          "div",
          {
            className: "fc-multimonth-header",
            style: { marginBottom: c },
            role: "presentation",
          },
          E(
            "div",
            { className: "fc-multimonth-title", id: t.labelId },
            n.dateEnv.format(e.dateProfile.currentRange.start, e.titleFormat)
          ),
          E(
            "table",
            {
              className: [
                "fc-multimonth-header-table",
                n.theme.getClass("table"),
              ].join(" "),
              role: "presentation",
            },
            E(
              "thead",
              { role: "rowgroup" },
              E(Fi, {
                dateProfile: e.dateProfile,
                dates: o.headerDates,
                datesRepDistinctDays: !1,
              })
            )
          )
        ),
        E(
          "div",
          {
            className: [
              "fc-multimonth-daygrid",
              "fc-daygrid",
              "fc-daygrid-body",
              !i && "fc-daygrid-body-balanced",
              i && "fc-daygrid-body-unbalanced",
              i && "fc-daygrid-body-natural",
            ].join(" "),
            style: { marginTop: -c },
          },
          E(
            "table",
            {
              className: [
                "fc-multimonth-daygrid-table",
                n.theme.getClass("table"),
              ].join(" "),
              style: { height: i ? "" : l },
              role: "presentation",
            },
            E(
              "tbody",
              { role: "rowgroup" },
              E(
                za,
                Object.assign({}, a, {
                  dateProfile: r,
                  cells: o.cells,
                  eventSelection: e.eventSelection,
                  dayMaxEvents: !i,
                  dayMaxEventRows: !i,
                  showWeekNumbers: s.weekNumbers,
                  clientWidth: e.clientWidth,
                  clientHeight: e.clientHeight,
                  forPrint: i,
                })
              )
            )
          )
        )
      );
    }
  }
  const Ul = p(1, "month");
  function Wl(e, t, n, r, i) {
    const { start: d, end: u } = t.currentRange;
    let s = d;
    const o = [];
    for (; s.valueOf() < u.valueOf(); ) {
      var a = n.add(s, Ul),
        l = { start: e.skipHiddenDays(s), end: e.skipHiddenDays(a, -1, !0) },
        c = Ga({
          currentRange: l,
          snapToWeek: !0,
          fixedWeekCount: r,
          dateEnv: n,
        }),
        c = {
          start: e.skipHiddenDays(c.start),
          end: e.skipHiddenDays(c.end, -1, !0),
        },
        h = t.activeRange ? nr(t.activeRange, i ? c : l) : null;
      o.push({
        currentDate: t.currentDate,
        isValid: t.isValid,
        validRange: t.validRange,
        renderRange: c,
        activeRange: h,
        currentRange: l,
        currentRangeUnit: "month",
        isRangeAllDay: !0,
        dateIncrement: t.dateIncrement,
        slotMinTime: t.slotMaxTime,
        slotMaxTime: t.slotMinTime,
      }),
        (s = a);
    }
    return o;
  }
  const Ll = o({ year: "numeric", month: "long" }),
    Fl = o({ month: "long" });
  function Vl(e, t) {
    return (
      e ||
      (t[0].currentRange.start.getUTCFullYear() !==
      t[t.length - 1].currentRange.start.getUTCFullYear()
        ? Ll
        : Fl)
    );
  }
  var Gl = {
      multiMonthTitleFormat: o,
      multiMonthMaxColumns: Number,
      multiMonthMinWidth: Number,
    },
    Gl =
      (De(
        ".fc .fc-multimonth{border:1px solid var(--fc-border-color);display:flex;flex-wrap:wrap;overflow-x:hidden;overflow-y:auto}.fc .fc-multimonth-title{font-size:1.2em;font-weight:700;padding:1em 0;text-align:center}.fc .fc-multimonth-daygrid{background:var(--fc-page-bg-color)}.fc .fc-multimonth-daygrid-table,.fc .fc-multimonth-header-table{table-layout:fixed;width:100%}.fc .fc-multimonth-daygrid-table{border-top-style:hidden!important}.fc .fc-multimonth-singlecol .fc-multimonth{position:relative}.fc .fc-multimonth-singlecol .fc-multimonth-header{background:var(--fc-page-bg-color);position:relative;top:0;z-index:2}.fc .fc-multimonth-singlecol .fc-multimonth-daygrid{position:relative;z-index:1}.fc .fc-multimonth-singlecol .fc-multimonth-daygrid-table,.fc .fc-multimonth-singlecol .fc-multimonth-header-table{border-left-style:hidden;border-right-style:hidden}.fc .fc-multimonth-singlecol .fc-multimonth-month:last-child .fc-multimonth-daygrid-table{border-bottom-style:hidden}.fc .fc-multimonth-multicol{line-height:1}.fc .fc-multimonth-multicol .fc-multimonth-month{padding:0 1.2em 1.2em}.fc .fc-multimonth-multicol .fc-daygrid-more-link{border:1px solid var(--fc-event-border-color);display:block;float:none;padding:1px}.fc .fc-multimonth-compact{line-height:1}.fc .fc-multimonth-compact .fc-multimonth-daygrid-table,.fc .fc-multimonth-compact .fc-multimonth-header-table{font-size:.9em}.fc-media-screen .fc-multimonth-singlecol .fc-multimonth-header{position:sticky}.fc-media-print .fc-multimonth{overflow:visible}"
      ),
      ao({
        name: "@fullcalendar/multimonth",
        initialView: "multiMonthYear",
        optionRefiners: Gl,
        views: {
          multiMonth: {
            component: class extends Br {
              constructor() {
                super(...arguments),
                  (this.splitDateProfileByMonth = g(Wl)),
                  (this.buildMonthFormat = g(Vl)),
                  (this.scrollElRef = c()),
                  (this.firstMonthElRef = c()),
                  (this.needsScrollReset = !1),
                  (this.handleSizing = (e) => {
                    e && this.updateSize();
                  });
              }
              render() {
                const { context: e, props: r, state: t } = this;
                var n = e["options"];
                const { clientWidth: i, clientHeight: s } = t;
                var o = t.monthHPadding || 0,
                  a =
                    Math.min(
                      null != i
                        ? Math.floor(i / (n.multiMonthMinWidth + o))
                        : 1,
                      n.multiMonthMaxColumns
                    ) || 1;
                const d = 100 / a + "%",
                  l = null == i ? null : i / a - o;
                o = null != i && 1 === a;
                const c = this.splitDateProfileByMonth(
                    e.dateProfileGenerator,
                    r.dateProfile,
                    e.dateEnv,
                    !o && n.fixedWeekCount,
                    n.showNonCurrentDates
                  ),
                  u = this.buildMonthFormat(n.multiMonthTitleFormat, c);
                a = [
                  "fc-multimonth",
                  o ? "fc-multimonth-singlecol" : "fc-multimonth-multicol",
                  null != l && l < 400 ? "fc-multimonth-compact" : "",
                ];
                return E(
                  qs,
                  {
                    elRef: this.scrollElRef,
                    elClasses: a,
                    viewSpec: e.viewSpec,
                  },
                  c.map((e, t) => {
                    var n = Ft(e.currentRange.start);
                    return E(
                      zl,
                      Object.assign({}, r, {
                        key: n,
                        isoDateStr: n,
                        elRef: 0 === t ? this.firstMonthElRef : void 0,
                        titleFormat: u,
                        dateProfile: e,
                        width: d,
                        tableWidth: l,
                        clientWidth: i,
                        clientHeight: s,
                      })
                    );
                  })
                );
              }
              componentDidMount() {
                this.updateSize(),
                  this.context.addResizeHandler(this.handleSizing),
                  this.requestScrollReset();
              }
              componentDidUpdate(e) {
                bt(e, this.props) || this.handleSizing(!1),
                  e.dateProfile !== this.props.dateProfile
                    ? this.requestScrollReset()
                    : this.flushScrollReset();
              }
              componentWillUnmount() {
                this.context.removeResizeHandler(this.handleSizing);
              }
              updateSize() {
                var e = this.scrollElRef.current,
                  t = this.firstMonthElRef.current;
                e &&
                  this.setState({
                    clientWidth: e.clientWidth,
                    clientHeight: e.clientHeight,
                  }),
                  t &&
                    e &&
                    null == this.state.monthHPadding &&
                    this.setState({
                      monthHPadding: e.clientWidth - t.firstChild.offsetWidth,
                    });
              }
              requestScrollReset() {
                (this.needsScrollReset = !0), this.flushScrollReset();
              }
              flushScrollReset() {
                if (this.needsScrollReset && null != this.state.monthHPadding) {
                  var e = this.props.dateProfile["currentDate"];
                  const t = this.scrollElRef.current,
                    n = t.querySelector(`[data-date="${Ft(e)}"]`);
                  (t.scrollTop =
                    n.getBoundingClientRect().top -
                    this.firstMonthElRef.current.getBoundingClientRect().top),
                    (this.needsScrollReset = !1);
                }
              }
              shouldComponentUpdate() {
                return !0;
              }
            },
            dateProfileGeneratorClass: Va,
            multiMonthMinWidth: 350,
            multiMonthMaxColumns: 3,
          },
          multiMonthYear: {
            type: "multiMonth",
            duration: { years: 1 },
            fixedWeekCount: !0,
            showNonCurrentDates: !1,
          },
        },
      }));
  return (
    _o.push(ya, ba, _l, jl, Gl),
    (t.Calendar = class extends $s {
      constructor(e, t = {}) {
        var n;
        super(),
          (this.isRendering = !1),
          (this.isRendered = !1),
          (this.currentClassNames = []),
          (this.customContentRenderId = 0),
          (this.handleAction = (e) => {
            switch (e.type) {
              case "SET_EVENT_DRAG":
              case "SET_EVENT_RESIZE":
                this.renderRunner.tryDrain();
            }
          }),
          (this.handleData = (e) => {
            (this.currentData = e),
              this.renderRunner.request(e.calendarOptions.rerenderDelay);
          }),
          (this.handleRenderRequest = () => {
            if (this.isRendering) {
              this.isRendered = !0;
              let i = this["currentData"];
              _r(() => {
                z(
                  E(
                    Ti,
                    {
                      options: i.calendarOptions,
                      theme: i.theme,
                      emitter: i.emitter,
                    },
                    (e, t, n, r) => (
                      this.setClassNames(e),
                      this.setHeight(t),
                      E(
                        Hi.Provider,
                        { value: this.customContentRenderId },
                        E(
                          Yo,
                          Object.assign({ isHeightAuto: n, forPrint: r }, i)
                        )
                      )
                    )
                  ),
                  this.el
                );
              });
            } else
              this.isRendered &&
                ((this.isRendered = !1),
                z(null, this.el),
                this.setClassNames([]),
                this.setHeight(""));
          }),
          (n = e).isConnected && we(n.getRootNode()),
          (this.el = e),
          (this.renderRunner = new ls(this.handleRenderRequest)),
          new Io({
            optionOverrides: t,
            calendarApi: this,
            onAction: this.handleAction,
            onData: this.handleData,
          });
      }
      render() {
        var e = this.isRendering;
        e ? (this.customContentRenderId += 1) : (this.isRendering = !0),
          this.renderRunner.request(),
          e && this.updateSize();
      }
      destroy() {
        this.isRendering &&
          ((this.isRendering = !1), this.renderRunner.request());
      }
      updateSize() {
        _r(() => {
          super.updateSize();
        });
      }
      batchRendering(e) {
        this.renderRunner.pause("batchRendering"),
          e(),
          this.renderRunner.resume("batchRendering");
      }
      pauseRendering() {
        this.renderRunner.pause("pauseRendering");
      }
      resumeRendering() {
        this.renderRunner.resume("pauseRendering", !0);
      }
      resetOptions(e, t) {
        this.currentDataManager.resetOptions(e, t);
      }
      setClassNames(t) {
        if (!wt(t, this.currentClassNames)) {
          let e = this.el["classList"];
          for (var n of this.currentClassNames) e.remove(n);
          for (var r of t) e.add(r);
          this.currentClassNames = t;
        }
      }
      setHeight(e) {
        Oe(this.el, "height", e);
      }
    }),
    (t.Draggable = class {
      constructor(e, t = {}) {
        (this.handlePointerDown = (e) => {
          let t = this["dragging"];
          var { minDistance: n, longPressDelay: r } = this.settings;
          (t.minDistance =
            null != n ? n : e.isTouch ? 0 : ln.eventDragMinDistance),
            (t.delay = e.isTouch ? (null != r ? r : ln.longPressDelay) : 0);
        }),
          (this.handleDragStart = (e) => {
            e.isTouch &&
              this.dragging.delay &&
              e.subjectEl.classList.contains("fc-event") &&
              this.dragging.mirror
                .getMirrorEl()
                .classList.add("fc-event-selected");
          }),
          (this.settings = t);
        let n = (this.dragging = new ca(e));
        (n.touchScrollAllowed = !1),
          null != t.itemSelector && (n.pointer.selector = t.itemSelector),
          null != t.appendTo && (n.mirror.parentNode = t.appendTo),
          n.emitter.on("pointerdown", this.handlePointerDown),
          n.emitter.on("dragstart", this.handleDragStart),
          new Ea(n, t.eventData);
      }
      destroy() {
        this.dragging.destroy();
      }
    }),
    (t.Internal = Ks),
    (t.JsonRequestError = os),
    (t.Preact = eo),
    (t.ThirdPartyDraggable = class {
      constructor(e, t) {
        let n = document,
          r =
            ((t =
              e === document || e instanceof Element
                ? ((n = e), t || {})
                : e || {}),
            (this.dragging = new Sa(n)));
        "string" == typeof t.itemSelector
          ? (r.pointer.selector = t.itemSelector)
          : n === document && (r.pointer.selector = "[data-event]"),
          "string" == typeof t.mirrorSelector &&
            (r.mirrorSelector = t.mirrorSelector),
          new Ea(r, t.eventData);
      }
      destroy() {
        this.dragging.destroy();
      }
    }),
    (t.createPlugin = ao),
    (t.formatDate = function (e, t = {}) {
      let n = Jo(t);
      return (
        (t = o(t)),
        (e = n.createMarkerMeta(e))
          ? n.format(e.marker, t, { forcedTzo: e.forcedTzo })
          : ""
      );
    }),
    (t.formatRange = function (e, t, n) {
      let r = Jo("object" == typeof n && n ? n : {});
      var i = o(n),
        e = r.createMarkerMeta(e),
        t = r.createMarkerMeta(t);
      return e && t
        ? r.formatRange(e.marker, t.marker, i, {
            forcedStartTzo: e.forcedTzo,
            forcedEndTzo: t.forcedTzo,
            isEndExclusive: n.isEndExclusive,
            defaultSeparator: ln.defaultRangeSeparator,
          })
        : "";
    }),
    (t.globalLocales = to),
    (t.globalPlugins = _o),
    (t.sliceEvents = function (e, t) {
      return qr(
        e.eventStore,
        e.eventUiBases,
        e.dateProfile.activeRange,
        t ? e.nextDayThreshold : null
      ).fg;
    }),
    (t.version = "6.1.8"),
    Object.defineProperty(t, "__esModule", { value: !0 }),
    t
  );
})({});
//# sourceMappingURL=fullcalendar.js.map