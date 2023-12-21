function La(e, t) {
  const a = /* @__PURE__ */ Object.create(null), n = e.split(",");
  for (let i = 0; i < n.length; i++)
    a[n[i]] = !0;
  return t ? (i) => !!a[i.toLowerCase()] : (i) => !!a[i];
}
const L = {}, st = [], we = () => {
}, dr = () => !1, br = /^on[^a-z]/, Dt = (e) => br.test(e), Za = (e) => e.startsWith("onUpdate:"), q = Object.assign, Ua = (e, t) => {
  const a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}, fr = Object.prototype.hasOwnProperty, T = (e, t) => fr.call(e, t), _ = Array.isArray, ot = (e) => qt(e) === "[object Map]", qn = (e) => qt(e) === "[object Set]", J = (e) => typeof e == "function", P = (e) => typeof e == "string", Qt = (e) => typeof e == "symbol", K = (e) => e !== null && typeof e == "object", $n = (e) => (K(e) || J(e)) && J(e.then) && J(e.catch), ei = Object.prototype.toString, qt = (e) => ei.call(e), ur = (e) => qt(e).slice(8, -1), ti = (e) => qt(e) === "[object Object]", Ka = (e) => P(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Lt = /* @__PURE__ */ La(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), $t = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (a) => t[a] || (t[a] = e(a));
}, gr = /-(\w)/g, ge = $t((e) => e.replace(gr, (t, a) => a ? a.toUpperCase() : "")), hr = /\B([A-Z])/g, Ee = $t(
  (e) => e.replace(hr, "-$1").toLowerCase()
), ea = $t((e) => e.charAt(0).toUpperCase() + e.slice(1)), ga = $t((e) => e ? `on${ea(e)}` : ""), dt = (e, t) => !Object.is(e, t), ha = (e, t) => {
  for (let a = 0; a < e.length; a++)
    e[a](t);
}, Kt = (e, t, a) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: a
  });
}, pr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, xn = (e) => {
  const t = P(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let En;
const Ia = () => En || (En = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Xa(e) {
  if (_(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) {
      const n = e[a], i = P(n) ? Er(n) : Xa(n);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (P(e) || K(e))
    return e;
}
const mr = /;(?![^(]*\))/g, vr = /:([^]+)/, xr = /\/\*[^]*?\*\//g;
function Er(e) {
  const t = {};
  return e.replace(xr, "").split(mr).forEach((a) => {
    if (a) {
      const n = a.split(vr);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function H(e) {
  let t = "";
  if (P(e))
    t = e;
  else if (_(e))
    for (let a = 0; a < e.length; a++) {
      const n = H(e[a]);
      n && (t += n + " ");
    }
  else if (K(e))
    for (const a in e)
      e[a] && (t += a + " ");
  return t.trim();
}
const yr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Ir = /* @__PURE__ */ La(yr);
function ai(e) {
  return !!e || e === "";
}
const bt = (e) => P(e) ? e : e == null ? "" : _(e) || K(e) && (e.toString === ei || !J(e.toString)) ? JSON.stringify(e, ni, 2) : String(e), ni = (e, t) => t && t.__v_isRef ? ni(e, t.value) : ot(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((a, [n, i]) => (a[`${n} =>`] = i, a), {})
} : qn(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : K(t) && !_(t) && !ti(t) ? String(t) : t;
let ve;
class wr {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ve, !t && ve && (this.index = (ve.scopes || (ve.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const a = ve;
      try {
        return ve = this, t();
      } finally {
        ve = a;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ve = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ve = this.parent;
  }
  stop(t) {
    if (this._active) {
      let a, n;
      for (a = 0, n = this.effects.length; a < n; a++)
        this.effects[a].stop();
      for (a = 0, n = this.cleanups.length; a < n; a++)
        this.cleanups[a]();
      if (this.scopes)
        for (a = 0, n = this.scopes.length; a < n; a++)
          this.scopes[a].stop(!0);
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function Rr(e, t = ve) {
  t && t.active && t.effects.push(e);
}
function kr() {
  return ve;
}
const Wa = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, ii = (e) => (e.w & Ze) > 0, ri = (e) => (e.n & Ze) > 0, _r = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Ze;
}, Sr = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let a = 0;
    for (let n = 0; n < t.length; n++) {
      const i = t[n];
      ii(i) && !ri(i) ? i.delete(e) : t[a++] = i, i.w &= ~Ze, i.n &= ~Ze;
    }
    t.length = a;
  }
}, wa = /* @__PURE__ */ new WeakMap();
let Et = 0, Ze = 1;
const Ra = 30;
let ye;
const qe = Symbol(""), ka = Symbol("");
class Va {
  constructor(t, a = null, n) {
    this.fn = t, this.scheduler = a, this.active = !0, this.deps = [], this.parent = void 0, Rr(this, n);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = ye, a = Ne;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = ye, ye = this, Ne = !0, Ze = 1 << ++Et, Et <= Ra ? _r(this) : yn(this), this.fn();
    } finally {
      Et <= Ra && Sr(this), Ze = 1 << --Et, ye = this.parent, Ne = a, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    ye === this ? this.deferStop = !0 : this.active && (yn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function yn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let a = 0; a < t.length; a++)
      t[a].delete(e);
    t.length = 0;
  }
}
let Ne = !0;
const si = [];
function gt() {
  si.push(Ne), Ne = !1;
}
function ht() {
  const e = si.pop();
  Ne = e === void 0 ? !0 : e;
}
function fe(e, t, a) {
  if (Ne && ye) {
    let n = wa.get(e);
    n || wa.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(a);
    i || n.set(a, i = Wa()), oi(i);
  }
}
function oi(e, t) {
  let a = !1;
  Et <= Ra ? ri(e) || (e.n |= Ze, a = !ii(e)) : a = !e.has(ye), a && (e.add(ye), ye.deps.push(e));
}
function Te(e, t, a, n, i, r) {
  const s = wa.get(e);
  if (!s)
    return;
  let l = [];
  if (t === "clear")
    l = [...s.values()];
  else if (a === "length" && _(e)) {
    const d = Number(n);
    s.forEach((b, h) => {
      (h === "length" || !Qt(h) && h >= d) && l.push(b);
    });
  } else
    switch (a !== void 0 && l.push(s.get(a)), t) {
      case "add":
        _(e) ? Ka(a) && l.push(s.get("length")) : (l.push(s.get(qe)), ot(e) && l.push(s.get(ka)));
        break;
      case "delete":
        _(e) || (l.push(s.get(qe)), ot(e) && l.push(s.get(ka)));
        break;
      case "set":
        ot(e) && l.push(s.get(qe));
        break;
    }
  if (l.length === 1)
    l[0] && _a(l[0]);
  else {
    const d = [];
    for (const b of l)
      b && d.push(...b);
    _a(Wa(d));
  }
}
function _a(e, t) {
  const a = _(e) ? e : [...e];
  for (const n of a)
    n.computed && In(n);
  for (const n of a)
    n.computed || In(n);
}
function In(e, t) {
  (e !== ye || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Jr = /* @__PURE__ */ La("__proto__,__v_isRef,__isVue"), li = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qt)
), wn = /* @__PURE__ */ Mr();
function Mr() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...a) {
      const n = z(this);
      for (let r = 0, s = this.length; r < s; r++)
        fe(n, "get", r + "");
      const i = n[t](...a);
      return i === -1 || i === !1 ? n[t](...a.map(z)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...a) {
      gt();
      const n = z(this)[t].apply(this, a);
      return ht(), n;
    };
  }), e;
}
function jr(e) {
  const t = z(this);
  return fe(t, "has", e), t.hasOwnProperty(e);
}
class ci {
  constructor(t = !1, a = !1) {
    this._isReadonly = t, this._shallow = a;
  }
  get(t, a, n) {
    const i = this._isReadonly, r = this._shallow;
    if (a === "__v_isReactive")
      return !i;
    if (a === "__v_isReadonly")
      return i;
    if (a === "__v_isShallow")
      return r;
    if (a === "__v_raw" && n === (i ? r ? Ur : ui : r ? fi : bi).get(t))
      return t;
    const s = _(t);
    if (!i) {
      if (s && T(wn, a))
        return Reflect.get(wn, a, n);
      if (a === "hasOwnProperty")
        return jr;
    }
    const l = Reflect.get(t, a, n);
    return (Qt(a) ? li.has(a) : Jr(a)) || (i || fe(t, "get", a), r) ? l : oe(l) ? s && Ka(a) ? l : l.value : K(l) ? i ? gi(l) : Da(l) : l;
  }
}
class di extends ci {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, a, n, i) {
    let r = t[a];
    if (kt(r) && oe(r) && !oe(n))
      return !1;
    if (!this._shallow && (!Sa(n) && !kt(n) && (r = z(r), n = z(n)), !_(t) && oe(r) && !oe(n)))
      return r.value = n, !0;
    const s = _(t) && Ka(a) ? Number(a) < t.length : T(t, a), l = Reflect.set(t, a, n, i);
    return t === z(i) && (s ? dt(n, r) && Te(t, "set", a, n) : Te(t, "add", a, n)), l;
  }
  deleteProperty(t, a) {
    const n = T(t, a);
    t[a];
    const i = Reflect.deleteProperty(t, a);
    return i && n && Te(t, "delete", a, void 0), i;
  }
  has(t, a) {
    const n = Reflect.has(t, a);
    return (!Qt(a) || !li.has(a)) && fe(t, "has", a), n;
  }
  ownKeys(t) {
    return fe(
      t,
      "iterate",
      _(t) ? "length" : qe
    ), Reflect.ownKeys(t);
  }
}
class Fr extends ci {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, a) {
    return !0;
  }
  deleteProperty(t, a) {
    return !0;
  }
}
const Br = /* @__PURE__ */ new di(), Yr = /* @__PURE__ */ new Fr(), Tr = /* @__PURE__ */ new di(
  !0
), Ha = (e) => e, ta = (e) => Reflect.getPrototypeOf(e);
function Ct(e, t, a = !1, n = !1) {
  e = e.__v_raw;
  const i = z(e), r = z(t);
  a || (dt(t, r) && fe(i, "get", t), fe(i, "get", r));
  const { has: s } = ta(i), l = n ? Ha : a ? $a : qa;
  if (s.call(i, t))
    return l(e.get(t));
  if (s.call(i, r))
    return l(e.get(r));
  e !== i && e.get(t);
}
function zt(e, t = !1) {
  const a = this.__v_raw, n = z(a), i = z(e);
  return t || (dt(e, i) && fe(n, "has", e), fe(n, "has", i)), e === i ? a.has(e) : a.has(e) || a.has(i);
}
function Ot(e, t = !1) {
  return e = e.__v_raw, !t && fe(z(e), "iterate", qe), Reflect.get(e, "size", e);
}
function Rn(e) {
  e = z(e);
  const t = z(this);
  return ta(t).has.call(t, e) || (t.add(e), Te(t, "add", e, e)), this;
}
function kn(e, t) {
  t = z(t);
  const a = z(this), { has: n, get: i } = ta(a);
  let r = n.call(a, e);
  r || (e = z(e), r = n.call(a, e));
  const s = i.call(a, e);
  return a.set(e, t), r ? dt(t, s) && Te(a, "set", e, t) : Te(a, "add", e, t), this;
}
function _n(e) {
  const t = z(this), { has: a, get: n } = ta(t);
  let i = a.call(t, e);
  i || (e = z(e), i = a.call(t, e)), n && n.call(t, e);
  const r = t.delete(e);
  return i && Te(t, "delete", e, void 0), r;
}
function Sn() {
  const e = z(this), t = e.size !== 0, a = e.clear();
  return t && Te(e, "clear", void 0, void 0), a;
}
function At(e, t) {
  return function(n, i) {
    const r = this, s = r.__v_raw, l = z(s), d = t ? Ha : e ? $a : qa;
    return !e && fe(l, "iterate", qe), s.forEach((b, h) => n.call(i, d(b), d(h), r));
  };
}
function Gt(e, t, a) {
  return function(...n) {
    const i = this.__v_raw, r = z(i), s = ot(r), l = e === "entries" || e === Symbol.iterator && s, d = e === "keys" && s, b = i[e](...n), h = a ? Ha : t ? $a : qa;
    return !t && fe(
      r,
      "iterate",
      d ? ka : qe
    ), {
      // iterator protocol
      next() {
        const { value: y, done: w } = b.next();
        return w ? { value: y, done: w } : {
          value: l ? [h(y[0]), h(y[1])] : h(y),
          done: w
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ae(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Cr() {
  const e = {
    get(r) {
      return Ct(this, r);
    },
    get size() {
      return Ot(this);
    },
    has: zt,
    add: Rn,
    set: kn,
    delete: _n,
    clear: Sn,
    forEach: At(!1, !1)
  }, t = {
    get(r) {
      return Ct(this, r, !1, !0);
    },
    get size() {
      return Ot(this);
    },
    has: zt,
    add: Rn,
    set: kn,
    delete: _n,
    clear: Sn,
    forEach: At(!1, !0)
  }, a = {
    get(r) {
      return Ct(this, r, !0);
    },
    get size() {
      return Ot(this, !0);
    },
    has(r) {
      return zt.call(this, r, !0);
    },
    add: Ae("add"),
    set: Ae("set"),
    delete: Ae("delete"),
    clear: Ae("clear"),
    forEach: At(!0, !1)
  }, n = {
    get(r) {
      return Ct(this, r, !0, !0);
    },
    get size() {
      return Ot(this, !0);
    },
    has(r) {
      return zt.call(this, r, !0);
    },
    add: Ae("add"),
    set: Ae("set"),
    delete: Ae("delete"),
    clear: Ae("clear"),
    forEach: At(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = Gt(
      r,
      !1,
      !1
    ), a[r] = Gt(
      r,
      !0,
      !1
    ), t[r] = Gt(
      r,
      !1,
      !0
    ), n[r] = Gt(
      r,
      !0,
      !0
    );
  }), [
    e,
    a,
    t,
    n
  ];
}
const [
  zr,
  Or,
  Ar,
  Gr
] = /* @__PURE__ */ Cr();
function Pa(e, t) {
  const a = t ? e ? Gr : Ar : e ? Or : zr;
  return (n, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    T(a, i) && i in n ? a : n,
    i,
    r
  );
}
const Nr = {
  get: /* @__PURE__ */ Pa(!1, !1)
}, Lr = {
  get: /* @__PURE__ */ Pa(!1, !0)
}, Zr = {
  get: /* @__PURE__ */ Pa(!0, !1)
}, bi = /* @__PURE__ */ new WeakMap(), fi = /* @__PURE__ */ new WeakMap(), ui = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap();
function Kr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Xr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kr(ur(e));
}
function Da(e) {
  return kt(e) ? e : Qa(
    e,
    !1,
    Br,
    Nr,
    bi
  );
}
function Wr(e) {
  return Qa(
    e,
    !1,
    Tr,
    Lr,
    fi
  );
}
function gi(e) {
  return Qa(
    e,
    !0,
    Yr,
    Zr,
    ui
  );
}
function Qa(e, t, a, n, i) {
  if (!K(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const s = Xr(e);
  if (s === 0)
    return e;
  const l = new Proxy(
    e,
    s === 2 ? n : a
  );
  return i.set(e, l), l;
}
function lt(e) {
  return kt(e) ? lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function kt(e) {
  return !!(e && e.__v_isReadonly);
}
function Sa(e) {
  return !!(e && e.__v_isShallow);
}
function hi(e) {
  return lt(e) || kt(e);
}
function z(e) {
  const t = e && e.__v_raw;
  return t ? z(t) : e;
}
function pi(e) {
  return Kt(e, "__v_skip", !0), e;
}
const qa = (e) => K(e) ? Da(e) : e, $a = (e) => K(e) ? gi(e) : e;
function Vr(e) {
  Ne && ye && (e = z(e), oi(e.dep || (e.dep = Wa())));
}
function Hr(e, t) {
  e = z(e);
  const a = e.dep;
  a && _a(a);
}
function oe(e) {
  return !!(e && e.__v_isRef === !0);
}
function mi(e) {
  return oe(e) ? e.value : e;
}
const Pr = {
  get: (e, t, a) => mi(Reflect.get(e, t, a)),
  set: (e, t, a, n) => {
    const i = e[t];
    return oe(i) && !oe(a) ? (i.value = a, !0) : Reflect.set(e, t, a, n);
  }
};
function vi(e) {
  return lt(e) ? e : new Proxy(e, Pr);
}
class Dr {
  constructor(t, a, n, i) {
    this._setter = a, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this._dirty = !0, this.effect = new Va(t, () => {
      this._dirty || (this._dirty = !0, Hr(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !i, this.__v_isReadonly = n;
  }
  get value() {
    const t = z(this);
    return Vr(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function Qr(e, t, a = !1) {
  let n, i;
  const r = J(e);
  return r ? (n = e, i = we) : (n = e.get, i = e.set), new Dr(n, i, r || !i, a);
}
function Le(e, t, a, n) {
  let i;
  try {
    i = n ? e(...n) : e();
  } catch (r) {
    aa(r, t, a);
  }
  return i;
}
function Re(e, t, a, n) {
  if (J(e)) {
    const r = Le(e, t, a, n);
    return r && $n(r) && r.catch((s) => {
      aa(s, t, a);
    }), r;
  }
  const i = [];
  for (let r = 0; r < e.length; r++)
    i.push(Re(e[r], t, a, n));
  return i;
}
function aa(e, t, a, n = !0) {
  const i = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const s = t.proxy, l = a;
    for (; r; ) {
      const b = r.ec;
      if (b) {
        for (let h = 0; h < b.length; h++)
          if (b[h](e, s, l) === !1)
            return;
      }
      r = r.parent;
    }
    const d = t.appContext.config.errorHandler;
    if (d) {
      Le(
        d,
        null,
        10,
        [e, s, l]
      );
      return;
    }
  }
  qr(e, a, i, n);
}
function qr(e, t, a, n = !0) {
  console.error(e);
}
let _t = !1, Ja = !1;
const ne = [];
let Fe = 0;
const ct = [];
let Ye = null, De = 0;
const xi = /* @__PURE__ */ Promise.resolve();
let en = null;
function Ei(e) {
  const t = en || xi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $r(e) {
  let t = Fe + 1, a = ne.length;
  for (; t < a; ) {
    const n = t + a >>> 1, i = ne[n], r = St(i);
    r < e || r === e && i.pre ? t = n + 1 : a = n;
  }
  return t;
}
function tn(e) {
  (!ne.length || !ne.includes(
    e,
    _t && e.allowRecurse ? Fe + 1 : Fe
  )) && (e.id == null ? ne.push(e) : ne.splice($r(e.id), 0, e), yi());
}
function yi() {
  !_t && !Ja && (Ja = !0, en = xi.then(wi));
}
function es(e) {
  const t = ne.indexOf(e);
  t > Fe && ne.splice(t, 1);
}
function ts(e) {
  _(e) ? ct.push(...e) : (!Ye || !Ye.includes(
    e,
    e.allowRecurse ? De + 1 : De
  )) && ct.push(e), yi();
}
function Jn(e, t = _t ? Fe + 1 : 0) {
  for (; t < ne.length; t++) {
    const a = ne[t];
    a && a.pre && (ne.splice(t, 1), t--, a());
  }
}
function Ii(e) {
  if (ct.length) {
    const t = [...new Set(ct)];
    if (ct.length = 0, Ye) {
      Ye.push(...t);
      return;
    }
    for (Ye = t, Ye.sort((a, n) => St(a) - St(n)), De = 0; De < Ye.length; De++)
      Ye[De]();
    Ye = null, De = 0;
  }
}
const St = (e) => e.id == null ? 1 / 0 : e.id, as = (e, t) => {
  const a = St(e) - St(t);
  if (a === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return a;
};
function wi(e) {
  Ja = !1, _t = !0, ne.sort(as);
  const t = we;
  try {
    for (Fe = 0; Fe < ne.length; Fe++) {
      const a = ne[Fe];
      a && a.active !== !1 && Le(a, null, 14);
    }
  } finally {
    Fe = 0, ne.length = 0, Ii(), _t = !1, en = null, (ne.length || ct.length) && wi();
  }
}
function ns(e, t, ...a) {
  if (e.isUnmounted)
    return;
  const n = e.vnode.props || L;
  let i = a;
  const r = t.startsWith("update:"), s = r && t.slice(7);
  if (s && s in n) {
    const h = `${s === "modelValue" ? "model" : s}Modifiers`, { number: y, trim: w } = n[h] || L;
    w && (i = a.map((M) => P(M) ? M.trim() : M)), y && (i = a.map(pr));
  }
  let l, d = n[l = ga(t)] || // also try camelCase event handler (#2249)
  n[l = ga(ge(t))];
  !d && r && (d = n[l = ga(Ee(t))]), d && Re(
    d,
    e,
    6,
    i
  );
  const b = n[l + "Once"];
  if (b) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Re(
      b,
      e,
      6,
      i
    );
  }
}
function Ri(e, t, a = !1) {
  const n = t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let s = {}, l = !1;
  if (!J(e)) {
    const d = (b) => {
      const h = Ri(b, t, !0);
      h && (l = !0, q(s, h));
    };
    !a && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !r && !l ? (K(e) && n.set(e, null), null) : (_(r) ? r.forEach((d) => s[d] = null) : q(s, r), K(e) && n.set(e, s), s);
}
function na(e, t) {
  return !e || !Dt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), T(e, t[0].toLowerCase() + t.slice(1)) || T(e, Ee(t)) || T(e, t));
}
let ie = null, ia = null;
function Xt(e) {
  const t = ie;
  return ie = e, ia = e && e.type.__scopeId || null, t;
}
function an(e) {
  ia = e;
}
function nn() {
  ia = null;
}
function Ce(e, t = ie, a) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && Gn(-1);
    const r = Xt(t);
    let s;
    try {
      s = e(...i);
    } finally {
      Xt(r), n._d && Gn(1);
    }
    return s;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function pa(e) {
  const {
    type: t,
    vnode: a,
    proxy: n,
    withProxy: i,
    props: r,
    propsOptions: [s],
    slots: l,
    attrs: d,
    emit: b,
    render: h,
    renderCache: y,
    data: w,
    setupState: M,
    ctx: W,
    inheritAttrs: Y
  } = e;
  let D, te;
  const $ = Xt(e);
  try {
    if (a.shapeFlag & 4) {
      const F = i || n, _e = F;
      D = je(
        h.call(
          _e,
          F,
          y,
          r,
          M,
          w,
          W
        )
      ), te = d;
    } else {
      const F = t;
      D = je(
        F.length > 1 ? F(
          r,
          { attrs: d, slots: l, emit: b }
        ) : F(
          r,
          null
          /* we know it doesn't need it */
        )
      ), te = t.props ? d : is(d);
    }
  } catch (F) {
    Rt.length = 0, aa(F, e, 1), D = le(Ue);
  }
  let ae = D;
  if (te && Y !== !1) {
    const F = Object.keys(te), { shapeFlag: _e } = ae;
    F.length && _e & 7 && (s && F.some(Za) && (te = rs(
      te,
      s
    )), ae = ft(ae, te));
  }
  return a.dirs && (ae = ft(ae), ae.dirs = ae.dirs ? ae.dirs.concat(a.dirs) : a.dirs), a.transition && (ae.transition = a.transition), D = ae, Xt($), D;
}
const is = (e) => {
  let t;
  for (const a in e)
    (a === "class" || a === "style" || Dt(a)) && ((t || (t = {}))[a] = e[a]);
  return t;
}, rs = (e, t) => {
  const a = {};
  for (const n in e)
    (!Za(n) || !(n.slice(9) in t)) && (a[n] = e[n]);
  return a;
};
function ss(e, t, a) {
  const { props: n, children: i, component: r } = e, { props: s, children: l, patchFlag: d } = t, b = r.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (a && d >= 0) {
    if (d & 1024)
      return !0;
    if (d & 16)
      return n ? Mn(n, s, b) : !!s;
    if (d & 8) {
      const h = t.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        const w = h[y];
        if (s[w] !== n[w] && !na(b, w))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : n === s ? !1 : n ? s ? Mn(n, s, b) : !0 : !!s;
  return !1;
}
function Mn(e, t, a) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const r = n[i];
    if (t[r] !== e[r] && !na(a, r))
      return !0;
  }
  return !1;
}
function os({ vnode: e, parent: t }, a) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = a, t = t.parent;
}
const rn = "components";
function ls(e, t) {
  return _i(rn, e, !0, t) || e;
}
const ki = Symbol.for("v-ndc");
function cs(e) {
  return P(e) ? _i(rn, e, !1) || e : e || ki;
}
function _i(e, t, a = !0, n = !1) {
  const i = ie || Q;
  if (i) {
    const r = i.type;
    if (e === rn) {
      const l = to(
        r,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (l && (l === t || l === ge(t) || l === ea(ge(t))))
        return r;
    }
    const s = (
      // local registration
      // check instance[type] first which is resolved for options API
      jn(i[e] || r[e], t) || // global registration
      jn(i.appContext[e], t)
    );
    return !s && n ? r : s;
  }
}
function jn(e, t) {
  return e && (e[t] || e[ge(t)] || e[ea(ge(t))]);
}
const ds = (e) => e.__isSuspense;
function bs(e, t) {
  t && t.pendingBranch ? _(e) ? t.effects.push(...e) : t.effects.push(e) : ts(e);
}
const Nt = {};
function ma(e, t, a) {
  return Si(e, t, a);
}
function Si(e, t, { immediate: a, deep: n, flush: i, onTrack: r, onTrigger: s } = L) {
  var l;
  const d = kr() === ((l = Q) == null ? void 0 : l.scope) ? Q : null;
  let b, h = !1, y = !1;
  if (oe(e) ? (b = () => e.value, h = Sa(e)) : lt(e) ? (b = () => e, n = !0) : _(e) ? (y = !0, h = e.some((F) => lt(F) || Sa(F)), b = () => e.map((F) => {
    if (oe(F))
      return F.value;
    if (lt(F))
      return rt(F);
    if (J(F))
      return Le(F, d, 2);
  })) : J(e) ? t ? b = () => Le(e, d, 2) : b = () => {
    if (!(d && d.isUnmounted))
      return w && w(), Re(
        e,
        d,
        3,
        [M]
      );
  } : b = we, t && n) {
    const F = b;
    b = () => rt(F());
  }
  let w, M = (F) => {
    w = $.onStop = () => {
      Le(F, d, 4), w = $.onStop = void 0;
    };
  }, W;
  if (Mt)
    if (M = we, t ? a && Re(t, d, 3, [
      b(),
      y ? [] : void 0,
      M
    ]) : b(), i === "sync") {
      const F = io();
      W = F.__watcherHandles || (F.__watcherHandles = []);
    } else
      return we;
  let Y = y ? new Array(e.length).fill(Nt) : Nt;
  const D = () => {
    if ($.active)
      if (t) {
        const F = $.run();
        (n || h || (y ? F.some((_e, tt) => dt(_e, Y[tt])) : dt(F, Y))) && (w && w(), Re(t, d, 3, [
          F,
          // pass undefined as the old value when it's changed for the first time
          Y === Nt ? void 0 : y && Y[0] === Nt ? [] : Y,
          M
        ]), Y = F);
      } else
        $.run();
  };
  D.allowRecurse = !!t;
  let te;
  i === "sync" ? te = D : i === "post" ? te = () => de(D, d && d.suspense) : (D.pre = !0, d && (D.id = d.uid), te = () => tn(D));
  const $ = new Va(b, te);
  t ? a ? D() : Y = $.run() : i === "post" ? de(
    $.run.bind($),
    d && d.suspense
  ) : $.run();
  const ae = () => {
    $.stop(), d && d.scope && Ua(d.scope.effects, $);
  };
  return W && W.push(ae), ae;
}
function fs(e, t, a) {
  const n = this.proxy, i = P(e) ? e.includes(".") ? Ji(n, e) : () => n[e] : e.bind(n, n);
  let r;
  J(t) ? r = t : (r = t.handler, a = t);
  const s = Q;
  ut(this);
  const l = Si(i, r.bind(n), a);
  return s ? ut(s) : $e(), l;
}
function Ji(e, t) {
  const a = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < a.length && n; i++)
      n = n[a[i]];
    return n;
  };
}
function rt(e, t) {
  if (!K(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), oe(e))
    rt(e.value, t);
  else if (_(e))
    for (let a = 0; a < e.length; a++)
      rt(e[a], t);
  else if (qn(e) || ot(e))
    e.forEach((a) => {
      rt(a, t);
    });
  else if (ti(e))
    for (const a in e)
      rt(e[a], t);
  return e;
}
function He(e, t, a, n) {
  const i = e.dirs, r = t && t.dirs;
  for (let s = 0; s < i.length; s++) {
    const l = i[s];
    r && (l.oldValue = r[s].value);
    let d = l.dir[n];
    d && (gt(), Re(d, a, 8, [
      e.el,
      l,
      e,
      t
    ]), ht());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function he(e, t) {
  return J(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => q({ name: e.name }, t, { setup: e }))()
  ) : e;
}
const It = (e) => !!e.type.__asyncLoader, Mi = (e) => e.type.__isKeepAlive;
function us(e, t) {
  ji(e, "a", t);
}
function gs(e, t) {
  ji(e, "da", t);
}
function ji(e, t, a = Q) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = a;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (ra(t, n, a), a) {
    let i = a.parent;
    for (; i && i.parent; )
      Mi(i.parent.vnode) && hs(n, t, a, i), i = i.parent;
  }
}
function hs(e, t, a, n) {
  const i = ra(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Bi(() => {
    Ua(n[t], i);
  }, a);
}
function ra(e, t, a = Q, n = !1) {
  if (a) {
    const i = a[e] || (a[e] = []), r = t.__weh || (t.__weh = (...s) => {
      if (a.isUnmounted)
        return;
      gt(), ut(a);
      const l = Re(t, a, e, s);
      return $e(), ht(), l;
    });
    return n ? i.unshift(r) : i.push(r), r;
  }
}
const ze = (e) => (t, a = Q) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!Mt || e === "sp") && ra(e, (...n) => t(...n), a)
), ps = ze("bm"), Fi = ze("m"), ms = ze("bu"), vs = ze("u"), xs = ze("bum"), Bi = ze("um"), Es = ze("sp"), ys = ze(
  "rtg"
), Is = ze(
  "rtc"
);
function ws(e, t = Q) {
  ra("ec", e, t);
}
function U(e, t, a = {}, n, i) {
  if (ie.isCE || ie.parent && It(ie.parent) && ie.parent.isCE)
    return t !== "default" && (a.name = t), le("slot", a, n && n());
  let r = e[t];
  r && r._c && (r._d = !1), j();
  const s = r && Yi(r(a)), l = et(
    xe,
    {
      key: a.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      s && s.key || `_${t}`
    },
    s || (n ? n() : []),
    s && e._ === 1 ? 64 : -2
  );
  return !i && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), r && r._c && (r._d = !0), l;
}
function Yi(e) {
  return e.some((t) => Ki(t) ? !(t.type === Ue || t.type === xe && !Yi(t.children)) : !0) ? e : null;
}
const Ma = (e) => e ? Wi(e) ? dn(e) || e.proxy : Ma(e.parent) : null, wt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ q(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Ma(e.parent),
    $root: (e) => Ma(e.root),
    $emit: (e) => e.emit,
    $options: (e) => sn(e),
    $forceUpdate: (e) => e.f || (e.f = () => tn(e.update)),
    $nextTick: (e) => e.n || (e.n = Ei.bind(e.proxy)),
    $watch: (e) => fs.bind(e)
  })
), va = (e, t) => e !== L && !e.__isScriptSetup && T(e, t), Rs = {
  get({ _: e }, t) {
    const { ctx: a, setupState: n, data: i, props: r, accessCache: s, type: l, appContext: d } = e;
    let b;
    if (t[0] !== "$") {
      const M = s[t];
      if (M !== void 0)
        switch (M) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return a[t];
          case 3:
            return r[t];
        }
      else {
        if (va(n, t))
          return s[t] = 1, n[t];
        if (i !== L && T(i, t))
          return s[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (b = e.propsOptions[0]) && T(b, t)
        )
          return s[t] = 3, r[t];
        if (a !== L && T(a, t))
          return s[t] = 4, a[t];
        ja && (s[t] = 0);
      }
    }
    const h = wt[t];
    let y, w;
    if (h)
      return t === "$attrs" && fe(e, "get", t), h(e);
    if (
      // css module (injected by vue-loader)
      (y = l.__cssModules) && (y = y[t])
    )
      return y;
    if (a !== L && T(a, t))
      return s[t] = 4, a[t];
    if (
      // global properties
      w = d.config.globalProperties, T(w, t)
    )
      return w[t];
  },
  set({ _: e }, t, a) {
    const { data: n, setupState: i, ctx: r } = e;
    return va(i, t) ? (i[t] = a, !0) : n !== L && T(n, t) ? (n[t] = a, !0) : T(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (r[t] = a, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: a, ctx: n, appContext: i, propsOptions: r }
  }, s) {
    let l;
    return !!a[s] || e !== L && T(e, s) || va(t, s) || (l = r[0]) && T(l, s) || T(n, s) || T(wt, s) || T(i.config.globalProperties, s);
  },
  defineProperty(e, t, a) {
    return a.get != null ? e._.accessCache[t] = 0 : T(a, "value") && this.set(e, t, a.value, null), Reflect.defineProperty(e, t, a);
  }
};
function Ti() {
  return ks().slots;
}
function ks() {
  const e = Qs();
  return e.setupContext || (e.setupContext = Hi(e));
}
function Fn(e) {
  return _(e) ? e.reduce(
    (t, a) => (t[a] = null, t),
    {}
  ) : e;
}
let ja = !0;
function _s(e) {
  const t = sn(e), a = e.proxy, n = e.ctx;
  ja = !1, t.beforeCreate && Bn(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: s,
    watch: l,
    provide: d,
    inject: b,
    // lifecycle
    created: h,
    beforeMount: y,
    mounted: w,
    beforeUpdate: M,
    updated: W,
    activated: Y,
    deactivated: D,
    beforeDestroy: te,
    beforeUnmount: $,
    destroyed: ae,
    unmounted: F,
    render: _e,
    renderTracked: tt,
    renderTriggered: pt,
    errorCaptured: Oe,
    serverPrefetch: da,
    // public API
    expose: Xe,
    inheritAttrs: mt,
    // assets
    components: Ft,
    directives: Bt,
    filters: ba
  } = t;
  if (b && Ss(b, n, null), s)
    for (const Z in s) {
      const A = s[Z];
      J(A) && (n[Z] = A.bind(a));
    }
  if (i) {
    const Z = i.call(a, a);
    K(Z) && (e.data = Da(Z));
  }
  if (ja = !0, r)
    for (const Z in r) {
      const A = r[Z], We = J(A) ? A.bind(a, a) : J(A.get) ? A.get.bind(a, a) : we, Yt = !J(A) && J(A.set) ? A.set.bind(a) : we, Ve = X({
        get: We,
        set: Yt
      });
      Object.defineProperty(n, Z, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (Se) => Ve.value = Se
      });
    }
  if (l)
    for (const Z in l)
      Ci(l[Z], n, a, Z);
  if (d) {
    const Z = J(d) ? d.call(a) : d;
    Reflect.ownKeys(Z).forEach((A) => {
      Ys(A, Z[A]);
    });
  }
  h && Bn(h, e, "c");
  function re(Z, A) {
    _(A) ? A.forEach((We) => Z(We.bind(a))) : A && Z(A.bind(a));
  }
  if (re(ps, y), re(Fi, w), re(ms, M), re(vs, W), re(us, Y), re(gs, D), re(ws, Oe), re(Is, tt), re(ys, pt), re(xs, $), re(Bi, F), re(Es, da), _(Xe))
    if (Xe.length) {
      const Z = e.exposed || (e.exposed = {});
      Xe.forEach((A) => {
        Object.defineProperty(Z, A, {
          get: () => a[A],
          set: (We) => a[A] = We
        });
      });
    } else
      e.exposed || (e.exposed = {});
  _e && e.render === we && (e.render = _e), mt != null && (e.inheritAttrs = mt), Ft && (e.components = Ft), Bt && (e.directives = Bt);
}
function Ss(e, t, a = we) {
  _(e) && (e = Fa(e));
  for (const n in e) {
    const i = e[n];
    let r;
    K(i) ? "default" in i ? r = Zt(
      i.from || n,
      i.default,
      !0
      /* treat default function as factory */
    ) : r = Zt(i.from || n) : r = Zt(i), oe(r) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (s) => r.value = s
    }) : t[n] = r;
  }
}
function Bn(e, t, a) {
  Re(
    _(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    a
  );
}
function Ci(e, t, a, n) {
  const i = n.includes(".") ? Ji(a, n) : () => a[n];
  if (P(e)) {
    const r = t[e];
    J(r) && ma(i, r);
  } else if (J(e))
    ma(i, e.bind(a));
  else if (K(e))
    if (_(e))
      e.forEach((r) => Ci(r, t, a, n));
    else {
      const r = J(e.handler) ? e.handler.bind(a) : t[e.handler];
      J(r) && ma(i, r, e);
    }
}
function sn(e) {
  const t = e.type, { mixins: a, extends: n } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: s }
  } = e.appContext, l = r.get(t);
  let d;
  return l ? d = l : !i.length && !a && !n ? d = t : (d = {}, i.length && i.forEach(
    (b) => Wt(d, b, s, !0)
  ), Wt(d, t, s)), K(t) && r.set(t, d), d;
}
function Wt(e, t, a, n = !1) {
  const { mixins: i, extends: r } = t;
  r && Wt(e, r, a, !0), i && i.forEach(
    (s) => Wt(e, s, a, !0)
  );
  for (const s in t)
    if (!(n && s === "expose")) {
      const l = Js[s] || a && a[s];
      e[s] = l ? l(e[s], t[s]) : t[s];
    }
  return e;
}
const Js = {
  data: Yn,
  props: Tn,
  emits: Tn,
  // objects
  methods: yt,
  computed: yt,
  // lifecycle
  beforeCreate: se,
  created: se,
  beforeMount: se,
  mounted: se,
  beforeUpdate: se,
  updated: se,
  beforeDestroy: se,
  beforeUnmount: se,
  destroyed: se,
  unmounted: se,
  activated: se,
  deactivated: se,
  errorCaptured: se,
  serverPrefetch: se,
  // assets
  components: yt,
  directives: yt,
  // watch
  watch: js,
  // provide / inject
  provide: Yn,
  inject: Ms
};
function Yn(e, t) {
  return t ? e ? function() {
    return q(
      J(e) ? e.call(this, this) : e,
      J(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Ms(e, t) {
  return yt(Fa(e), Fa(t));
}
function Fa(e) {
  if (_(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++)
      t[e[a]] = e[a];
    return t;
  }
  return e;
}
function se(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function yt(e, t) {
  return e ? q(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Tn(e, t) {
  return e ? _(e) && _(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : q(
    /* @__PURE__ */ Object.create(null),
    Fn(e),
    Fn(t ?? {})
  ) : t;
}
function js(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const a = q(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    a[n] = se(e[n], t[n]);
  return a;
}
function zi() {
  return {
    app: null,
    config: {
      isNativeTag: dr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Fs = 0;
function Bs(e, t) {
  return function(n, i = null) {
    J(n) || (n = q({}, n)), i != null && !K(i) && (i = null);
    const r = zi(), s = /* @__PURE__ */ new WeakSet();
    let l = !1;
    const d = r.app = {
      _uid: Fs++,
      _component: n,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ro,
      get config() {
        return r.config;
      },
      set config(b) {
      },
      use(b, ...h) {
        return s.has(b) || (b && J(b.install) ? (s.add(b), b.install(d, ...h)) : J(b) && (s.add(b), b(d, ...h))), d;
      },
      mixin(b) {
        return r.mixins.includes(b) || r.mixins.push(b), d;
      },
      component(b, h) {
        return h ? (r.components[b] = h, d) : r.components[b];
      },
      directive(b, h) {
        return h ? (r.directives[b] = h, d) : r.directives[b];
      },
      mount(b, h, y) {
        if (!l) {
          const w = le(n, i);
          return w.appContext = r, h && t ? t(w, b) : e(w, b, y), l = !0, d._container = b, b.__vue_app__ = d, dn(w.component) || w.component.proxy;
        }
      },
      unmount() {
        l && (e(null, d._container), delete d._container.__vue_app__);
      },
      provide(b, h) {
        return r.provides[b] = h, d;
      },
      runWithContext(b) {
        Vt = d;
        try {
          return b();
        } finally {
          Vt = null;
        }
      }
    };
    return d;
  };
}
let Vt = null;
function Ys(e, t) {
  if (Q) {
    let a = Q.provides;
    const n = Q.parent && Q.parent.provides;
    n === a && (a = Q.provides = Object.create(n)), a[e] = t;
  }
}
function Zt(e, t, a = !1) {
  const n = Q || ie;
  if (n || Vt) {
    const i = n ? n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : Vt._context.provides;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return a && J(t) ? t.call(n && n.proxy) : t;
  }
}
function Ts(e, t, a, n = !1) {
  const i = {}, r = {};
  Kt(r, oa, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Oi(e, t, i, r);
  for (const s in e.propsOptions[0])
    s in i || (i[s] = void 0);
  a ? e.props = n ? i : Wr(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function Cs(e, t, a, n) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: s }
  } = e, l = z(i), [d] = e.propsOptions;
  let b = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || s > 0) && !(s & 16)
  ) {
    if (s & 8) {
      const h = e.vnode.dynamicProps;
      for (let y = 0; y < h.length; y++) {
        let w = h[y];
        if (na(e.emitsOptions, w))
          continue;
        const M = t[w];
        if (d)
          if (T(r, w))
            M !== r[w] && (r[w] = M, b = !0);
          else {
            const W = ge(w);
            i[W] = Ba(
              d,
              l,
              W,
              M,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          M !== r[w] && (r[w] = M, b = !0);
      }
    }
  } else {
    Oi(e, t, i, r) && (b = !0);
    let h;
    for (const y in l)
      (!t || // for camelCase
      !T(t, y) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((h = Ee(y)) === y || !T(t, h))) && (d ? a && // for camelCase
      (a[y] !== void 0 || // for kebab-case
      a[h] !== void 0) && (i[y] = Ba(
        d,
        l,
        y,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete i[y]);
    if (r !== l)
      for (const y in r)
        (!t || !T(t, y)) && (delete r[y], b = !0);
  }
  b && Te(e, "set", "$attrs");
}
function Oi(e, t, a, n) {
  const [i, r] = e.propsOptions;
  let s = !1, l;
  if (t)
    for (let d in t) {
      if (Lt(d))
        continue;
      const b = t[d];
      let h;
      i && T(i, h = ge(d)) ? !r || !r.includes(h) ? a[h] = b : (l || (l = {}))[h] = b : na(e.emitsOptions, d) || (!(d in n) || b !== n[d]) && (n[d] = b, s = !0);
    }
  if (r) {
    const d = z(a), b = l || L;
    for (let h = 0; h < r.length; h++) {
      const y = r[h];
      a[y] = Ba(
        i,
        d,
        y,
        b[y],
        e,
        !T(b, y)
      );
    }
  }
  return s;
}
function Ba(e, t, a, n, i, r) {
  const s = e[a];
  if (s != null) {
    const l = T(s, "default");
    if (l && n === void 0) {
      const d = s.default;
      if (s.type !== Function && !s.skipFactory && J(d)) {
        const { propsDefaults: b } = i;
        a in b ? n = b[a] : (ut(i), n = b[a] = d.call(
          null,
          t
        ), $e());
      } else
        n = d;
    }
    s[
      0
      /* shouldCast */
    ] && (r && !l ? n = !1 : s[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ee(a)) && (n = !0));
  }
  return n;
}
function Ai(e, t, a = !1) {
  const n = t.propsCache, i = n.get(e);
  if (i)
    return i;
  const r = e.props, s = {}, l = [];
  let d = !1;
  if (!J(e)) {
    const h = (y) => {
      d = !0;
      const [w, M] = Ai(y, t, !0);
      q(s, w), M && l.push(...M);
    };
    !a && t.mixins.length && t.mixins.forEach(h), e.extends && h(e.extends), e.mixins && e.mixins.forEach(h);
  }
  if (!r && !d)
    return K(e) && n.set(e, st), st;
  if (_(r))
    for (let h = 0; h < r.length; h++) {
      const y = ge(r[h]);
      Cn(y) && (s[y] = L);
    }
  else if (r)
    for (const h in r) {
      const y = ge(h);
      if (Cn(y)) {
        const w = r[h], M = s[y] = _(w) || J(w) ? { type: w } : q({}, w);
        if (M) {
          const W = An(Boolean, M.type), Y = An(String, M.type);
          M[
            0
            /* shouldCast */
          ] = W > -1, M[
            1
            /* shouldCastTrue */
          ] = Y < 0 || W < Y, (W > -1 || T(M, "default")) && l.push(y);
        }
      }
    }
  const b = [s, l];
  return K(e) && n.set(e, b), b;
}
function Cn(e) {
  return e[0] !== "$";
}
function zn(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function On(e, t) {
  return zn(e) === zn(t);
}
function An(e, t) {
  return _(t) ? t.findIndex((a) => On(a, e)) : J(t) && On(t, e) ? 0 : -1;
}
const Gi = (e) => e[0] === "_" || e === "$stable", on = (e) => _(e) ? e.map(je) : [je(e)], zs = (e, t, a) => {
  if (t._n)
    return t;
  const n = Ce((...i) => on(t(...i)), a);
  return n._c = !1, n;
}, Ni = (e, t, a) => {
  const n = e._ctx;
  for (const i in e) {
    if (Gi(i))
      continue;
    const r = e[i];
    if (J(r))
      t[i] = zs(i, r, n);
    else if (r != null) {
      const s = on(r);
      t[i] = () => s;
    }
  }
}, Li = (e, t) => {
  const a = on(t);
  e.slots.default = () => a;
}, Os = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const a = t._;
    a ? (e.slots = z(t), Kt(t, "_", a)) : Ni(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && Li(e, t);
  Kt(e.slots, oa, 1);
}, As = (e, t, a) => {
  const { vnode: n, slots: i } = e;
  let r = !0, s = L;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? a && l === 1 ? r = !1 : (q(i, t), !a && l === 1 && delete i._) : (r = !t.$stable, Ni(t, i)), s = t;
  } else
    t && (Li(e, t), s = { default: 1 });
  if (r)
    for (const l in i)
      !Gi(l) && s[l] == null && delete i[l];
};
function Ya(e, t, a, n, i = !1) {
  if (_(e)) {
    e.forEach(
      (w, M) => Ya(
        w,
        t && (_(t) ? t[M] : t),
        a,
        n,
        i
      )
    );
    return;
  }
  if (It(n) && !i)
    return;
  const r = n.shapeFlag & 4 ? dn(n.component) || n.component.proxy : n.el, s = i ? null : r, { i: l, r: d } = e, b = t && t.r, h = l.refs === L ? l.refs = {} : l.refs, y = l.setupState;
  if (b != null && b !== d && (P(b) ? (h[b] = null, T(y, b) && (y[b] = null)) : oe(b) && (b.value = null)), J(d))
    Le(d, l, 12, [s, h]);
  else {
    const w = P(d), M = oe(d);
    if (w || M) {
      const W = () => {
        if (e.f) {
          const Y = w ? T(y, d) ? y[d] : h[d] : d.value;
          i ? _(Y) && Ua(Y, r) : _(Y) ? Y.includes(r) || Y.push(r) : w ? (h[d] = [r], T(y, d) && (y[d] = h[d])) : (d.value = [r], e.k && (h[e.k] = d.value));
        } else
          w ? (h[d] = s, T(y, d) && (y[d] = s)) : M && (d.value = s, e.k && (h[e.k] = s));
      };
      s ? (W.id = -1, de(W, a)) : W();
    }
  }
}
const de = bs;
function Gs(e) {
  return Ns(e);
}
function Ns(e, t) {
  const a = Ia();
  a.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: r,
    createElement: s,
    createText: l,
    createComment: d,
    setText: b,
    setElementText: h,
    parentNode: y,
    nextSibling: w,
    setScopeId: M = we,
    insertStaticContent: W
  } = e, Y = (o, c, f, u = null, g = null, v = null, E = !1, m = null, x = !!c.dynamicChildren) => {
    if (o === c)
      return;
    o && !xt(o, c) && (u = Tt(o), Se(o, g, v, !0), o = null), c.patchFlag === -2 && (x = !1, c.dynamicChildren = null);
    const { type: p, ref: R, shapeFlag: I } = c;
    switch (p) {
      case sa:
        D(o, c, f, u);
        break;
      case Ue:
        te(o, c, f, u);
        break;
      case xa:
        o == null && $(c, f, u, E);
        break;
      case xe:
        Ft(
          o,
          c,
          f,
          u,
          g,
          v,
          E,
          m,
          x
        );
        break;
      default:
        I & 1 ? _e(
          o,
          c,
          f,
          u,
          g,
          v,
          E,
          m,
          x
        ) : I & 6 ? Bt(
          o,
          c,
          f,
          u,
          g,
          v,
          E,
          m,
          x
        ) : (I & 64 || I & 128) && p.process(
          o,
          c,
          f,
          u,
          g,
          v,
          E,
          m,
          x,
          at
        );
    }
    R != null && g && Ya(R, o && o.ref, v, c || o, !c);
  }, D = (o, c, f, u) => {
    if (o == null)
      n(
        c.el = l(c.children),
        f,
        u
      );
    else {
      const g = c.el = o.el;
      c.children !== o.children && b(g, c.children);
    }
  }, te = (o, c, f, u) => {
    o == null ? n(
      c.el = d(c.children || ""),
      f,
      u
    ) : c.el = o.el;
  }, $ = (o, c, f, u) => {
    [o.el, o.anchor] = W(
      o.children,
      c,
      f,
      u,
      o.el,
      o.anchor
    );
  }, ae = ({ el: o, anchor: c }, f, u) => {
    let g;
    for (; o && o !== c; )
      g = w(o), n(o, f, u), o = g;
    n(c, f, u);
  }, F = ({ el: o, anchor: c }) => {
    let f;
    for (; o && o !== c; )
      f = w(o), i(o), o = f;
    i(c);
  }, _e = (o, c, f, u, g, v, E, m, x) => {
    E = E || c.type === "svg", o == null ? tt(
      c,
      f,
      u,
      g,
      v,
      E,
      m,
      x
    ) : da(
      o,
      c,
      g,
      v,
      E,
      m,
      x
    );
  }, tt = (o, c, f, u, g, v, E, m) => {
    let x, p;
    const { type: R, props: I, shapeFlag: k, transition: S, dirs: B } = o;
    if (x = o.el = s(
      o.type,
      v,
      I && I.is,
      I
    ), k & 8 ? h(x, o.children) : k & 16 && Oe(
      o.children,
      x,
      null,
      u,
      g,
      v && R !== "foreignObject",
      E,
      m
    ), B && He(o, null, u, "created"), pt(x, o, o.scopeId, E, u), I) {
      for (const O in I)
        O !== "value" && !Lt(O) && r(
          x,
          O,
          null,
          I[O],
          v,
          o.children,
          u,
          g,
          Be
        );
      "value" in I && r(x, "value", null, I.value), (p = I.onVnodeBeforeMount) && Me(p, u, o);
    }
    B && He(o, null, u, "beforeMount");
    const G = Ls(g, S);
    G && S.beforeEnter(x), n(x, c, f), ((p = I && I.onVnodeMounted) || G || B) && de(() => {
      p && Me(p, u, o), G && S.enter(x), B && He(o, null, u, "mounted");
    }, g);
  }, pt = (o, c, f, u, g) => {
    if (f && M(o, f), u)
      for (let v = 0; v < u.length; v++)
        M(o, u[v]);
    if (g) {
      let v = g.subTree;
      if (c === v) {
        const E = g.vnode;
        pt(
          o,
          E,
          E.scopeId,
          E.slotScopeIds,
          g.parent
        );
      }
    }
  }, Oe = (o, c, f, u, g, v, E, m, x = 0) => {
    for (let p = x; p < o.length; p++) {
      const R = o[p] = m ? Ge(o[p]) : je(o[p]);
      Y(
        null,
        R,
        c,
        f,
        u,
        g,
        v,
        E,
        m
      );
    }
  }, da = (o, c, f, u, g, v, E) => {
    const m = c.el = o.el;
    let { patchFlag: x, dynamicChildren: p, dirs: R } = c;
    x |= o.patchFlag & 16;
    const I = o.props || L, k = c.props || L;
    let S;
    f && Pe(f, !1), (S = k.onVnodeBeforeUpdate) && Me(S, f, c, o), R && He(c, o, f, "beforeUpdate"), f && Pe(f, !0);
    const B = g && c.type !== "foreignObject";
    if (p ? Xe(
      o.dynamicChildren,
      p,
      m,
      f,
      u,
      B,
      v
    ) : E || A(
      o,
      c,
      m,
      null,
      f,
      u,
      B,
      v,
      !1
    ), x > 0) {
      if (x & 16)
        mt(
          m,
          c,
          I,
          k,
          f,
          u,
          g
        );
      else if (x & 2 && I.class !== k.class && r(m, "class", null, k.class, g), x & 4 && r(m, "style", I.style, k.style, g), x & 8) {
        const G = c.dynamicProps;
        for (let O = 0; O < G.length; O++) {
          const V = G[O], me = I[V], nt = k[V];
          (nt !== me || V === "value") && r(
            m,
            V,
            me,
            nt,
            g,
            o.children,
            f,
            u,
            Be
          );
        }
      }
      x & 1 && o.children !== c.children && h(m, c.children);
    } else
      !E && p == null && mt(
        m,
        c,
        I,
        k,
        f,
        u,
        g
      );
    ((S = k.onVnodeUpdated) || R) && de(() => {
      S && Me(S, f, c, o), R && He(c, o, f, "updated");
    }, u);
  }, Xe = (o, c, f, u, g, v, E) => {
    for (let m = 0; m < c.length; m++) {
      const x = o[m], p = c[m], R = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        x.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (x.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !xt(x, p) || // - In the case of a component, it could contain anything.
        x.shapeFlag & 70) ? y(x.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          f
        )
      );
      Y(
        x,
        p,
        R,
        null,
        u,
        g,
        v,
        E,
        !0
      );
    }
  }, mt = (o, c, f, u, g, v, E) => {
    if (f !== u) {
      if (f !== L)
        for (const m in f)
          !Lt(m) && !(m in u) && r(
            o,
            m,
            f[m],
            null,
            E,
            c.children,
            g,
            v,
            Be
          );
      for (const m in u) {
        if (Lt(m))
          continue;
        const x = u[m], p = f[m];
        x !== p && m !== "value" && r(
          o,
          m,
          p,
          x,
          E,
          c.children,
          g,
          v,
          Be
        );
      }
      "value" in u && r(o, "value", f.value, u.value);
    }
  }, Ft = (o, c, f, u, g, v, E, m, x) => {
    const p = c.el = o ? o.el : l(""), R = c.anchor = o ? o.anchor : l("");
    let { patchFlag: I, dynamicChildren: k, slotScopeIds: S } = c;
    S && (m = m ? m.concat(S) : S), o == null ? (n(p, f, u), n(R, f, u), Oe(
      c.children,
      f,
      R,
      g,
      v,
      E,
      m,
      x
    )) : I > 0 && I & 64 && k && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    o.dynamicChildren ? (Xe(
      o.dynamicChildren,
      k,
      f,
      g,
      v,
      E,
      m
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (c.key != null || g && c === g.subTree) && Zi(
      o,
      c,
      !0
      /* shallow */
    )) : A(
      o,
      c,
      f,
      R,
      g,
      v,
      E,
      m,
      x
    );
  }, Bt = (o, c, f, u, g, v, E, m, x) => {
    c.slotScopeIds = m, o == null ? c.shapeFlag & 512 ? g.ctx.activate(
      c,
      f,
      u,
      E,
      x
    ) : ba(
      c,
      f,
      u,
      g,
      v,
      E,
      x
    ) : un(o, c, x);
  }, ba = (o, c, f, u, g, v, E) => {
    const m = o.component = Ds(
      o,
      u,
      g
    );
    if (Mi(o) && (m.ctx.renderer = at), qs(m), m.asyncDep) {
      if (g && g.registerDep(m, re), !o.el) {
        const x = m.subTree = le(Ue);
        te(null, x, c, f);
      }
      return;
    }
    re(
      m,
      o,
      c,
      f,
      g,
      v,
      E
    );
  }, un = (o, c, f) => {
    const u = c.component = o.component;
    if (ss(o, c, f))
      if (u.asyncDep && !u.asyncResolved) {
        Z(u, c, f);
        return;
      } else
        u.next = c, es(u.update), u.update();
    else
      c.el = o.el, u.vnode = c;
  }, re = (o, c, f, u, g, v, E) => {
    const m = () => {
      if (o.isMounted) {
        let { next: R, bu: I, u: k, parent: S, vnode: B } = o, G = R, O;
        Pe(o, !1), R ? (R.el = B.el, Z(o, R, E)) : R = B, I && ha(I), (O = R.props && R.props.onVnodeBeforeUpdate) && Me(O, S, R, B), Pe(o, !0);
        const V = pa(o), me = o.subTree;
        o.subTree = V, Y(
          me,
          V,
          // parent may have changed if it's in a teleport
          y(me.el),
          // anchor may have changed if it's in a fragment
          Tt(me),
          o,
          g,
          v
        ), R.el = V.el, G === null && os(o, V.el), k && de(k, g), (O = R.props && R.props.onVnodeUpdated) && de(
          () => Me(O, S, R, B),
          g
        );
      } else {
        let R;
        const { el: I, props: k } = c, { bm: S, m: B, parent: G } = o, O = It(c);
        if (Pe(o, !1), S && ha(S), !O && (R = k && k.onVnodeBeforeMount) && Me(R, G, c), Pe(o, !0), I && ua) {
          const V = () => {
            o.subTree = pa(o), ua(
              I,
              o.subTree,
              o,
              g,
              null
            );
          };
          O ? c.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !o.isUnmounted && V()
          ) : V();
        } else {
          const V = o.subTree = pa(o);
          Y(
            null,
            V,
            f,
            u,
            o,
            g,
            v
          ), c.el = V.el;
        }
        if (B && de(B, g), !O && (R = k && k.onVnodeMounted)) {
          const V = c;
          de(
            () => Me(R, G, V),
            g
          );
        }
        (c.shapeFlag & 256 || G && It(G.vnode) && G.vnode.shapeFlag & 256) && o.a && de(o.a, g), o.isMounted = !0, c = f = u = null;
      }
    }, x = o.effect = new Va(
      m,
      () => tn(p),
      o.scope
      // track it in component's effect scope
    ), p = o.update = () => x.run();
    p.id = o.uid, Pe(o, !0), p();
  }, Z = (o, c, f) => {
    c.component = o;
    const u = o.vnode.props;
    o.vnode = c, o.next = null, Cs(o, c.props, u, f), As(o, c.children, f), gt(), Jn(), ht();
  }, A = (o, c, f, u, g, v, E, m, x = !1) => {
    const p = o && o.children, R = o ? o.shapeFlag : 0, I = c.children, { patchFlag: k, shapeFlag: S } = c;
    if (k > 0) {
      if (k & 128) {
        Yt(
          p,
          I,
          f,
          u,
          g,
          v,
          E,
          m,
          x
        );
        return;
      } else if (k & 256) {
        We(
          p,
          I,
          f,
          u,
          g,
          v,
          E,
          m,
          x
        );
        return;
      }
    }
    S & 8 ? (R & 16 && Be(p, g, v), I !== p && h(f, I)) : R & 16 ? S & 16 ? Yt(
      p,
      I,
      f,
      u,
      g,
      v,
      E,
      m,
      x
    ) : Be(p, g, v, !0) : (R & 8 && h(f, ""), S & 16 && Oe(
      I,
      f,
      u,
      g,
      v,
      E,
      m,
      x
    ));
  }, We = (o, c, f, u, g, v, E, m, x) => {
    o = o || st, c = c || st;
    const p = o.length, R = c.length, I = Math.min(p, R);
    let k;
    for (k = 0; k < I; k++) {
      const S = c[k] = x ? Ge(c[k]) : je(c[k]);
      Y(
        o[k],
        S,
        f,
        null,
        g,
        v,
        E,
        m,
        x
      );
    }
    p > R ? Be(
      o,
      g,
      v,
      !0,
      !1,
      I
    ) : Oe(
      c,
      f,
      u,
      g,
      v,
      E,
      m,
      x,
      I
    );
  }, Yt = (o, c, f, u, g, v, E, m, x) => {
    let p = 0;
    const R = c.length;
    let I = o.length - 1, k = R - 1;
    for (; p <= I && p <= k; ) {
      const S = o[p], B = c[p] = x ? Ge(c[p]) : je(c[p]);
      if (xt(S, B))
        Y(
          S,
          B,
          f,
          null,
          g,
          v,
          E,
          m,
          x
        );
      else
        break;
      p++;
    }
    for (; p <= I && p <= k; ) {
      const S = o[I], B = c[k] = x ? Ge(c[k]) : je(c[k]);
      if (xt(S, B))
        Y(
          S,
          B,
          f,
          null,
          g,
          v,
          E,
          m,
          x
        );
      else
        break;
      I--, k--;
    }
    if (p > I) {
      if (p <= k) {
        const S = k + 1, B = S < R ? c[S].el : u;
        for (; p <= k; )
          Y(
            null,
            c[p] = x ? Ge(c[p]) : je(c[p]),
            f,
            B,
            g,
            v,
            E,
            m,
            x
          ), p++;
      }
    } else if (p > k)
      for (; p <= I; )
        Se(o[p], g, v, !0), p++;
    else {
      const S = p, B = p, G = /* @__PURE__ */ new Map();
      for (p = B; p <= k; p++) {
        const ue = c[p] = x ? Ge(c[p]) : je(c[p]);
        ue.key != null && G.set(ue.key, p);
      }
      let O, V = 0;
      const me = k - B + 1;
      let nt = !1, pn = 0;
      const vt = new Array(me);
      for (p = 0; p < me; p++)
        vt[p] = 0;
      for (p = S; p <= I; p++) {
        const ue = o[p];
        if (V >= me) {
          Se(ue, g, v, !0);
          continue;
        }
        let Je;
        if (ue.key != null)
          Je = G.get(ue.key);
        else
          for (O = B; O <= k; O++)
            if (vt[O - B] === 0 && xt(ue, c[O])) {
              Je = O;
              break;
            }
        Je === void 0 ? Se(ue, g, v, !0) : (vt[Je - B] = p + 1, Je >= pn ? pn = Je : nt = !0, Y(
          ue,
          c[Je],
          f,
          null,
          g,
          v,
          E,
          m,
          x
        ), V++);
      }
      const mn = nt ? Zs(vt) : st;
      for (O = mn.length - 1, p = me - 1; p >= 0; p--) {
        const ue = B + p, Je = c[ue], vn = ue + 1 < R ? c[ue + 1].el : u;
        vt[p] === 0 ? Y(
          null,
          Je,
          f,
          vn,
          g,
          v,
          E,
          m,
          x
        ) : nt && (O < 0 || p !== mn[O] ? Ve(Je, f, vn, 2) : O--);
      }
    }
  }, Ve = (o, c, f, u, g = null) => {
    const { el: v, type: E, transition: m, children: x, shapeFlag: p } = o;
    if (p & 6) {
      Ve(o.component.subTree, c, f, u);
      return;
    }
    if (p & 128) {
      o.suspense.move(c, f, u);
      return;
    }
    if (p & 64) {
      E.move(o, c, f, at);
      return;
    }
    if (E === xe) {
      n(v, c, f);
      for (let I = 0; I < x.length; I++)
        Ve(x[I], c, f, u);
      n(o.anchor, c, f);
      return;
    }
    if (E === xa) {
      ae(o, c, f);
      return;
    }
    if (u !== 2 && p & 1 && m)
      if (u === 0)
        m.beforeEnter(v), n(v, c, f), de(() => m.enter(v), g);
      else {
        const { leave: I, delayLeave: k, afterLeave: S } = m, B = () => n(v, c, f), G = () => {
          I(v, () => {
            B(), S && S();
          });
        };
        k ? k(v, B, G) : G();
      }
    else
      n(v, c, f);
  }, Se = (o, c, f, u = !1, g = !1) => {
    const {
      type: v,
      props: E,
      ref: m,
      children: x,
      dynamicChildren: p,
      shapeFlag: R,
      patchFlag: I,
      dirs: k
    } = o;
    if (m != null && Ya(m, null, f, o, !0), R & 256) {
      c.ctx.deactivate(o);
      return;
    }
    const S = R & 1 && k, B = !It(o);
    let G;
    if (B && (G = E && E.onVnodeBeforeUnmount) && Me(G, c, o), R & 6)
      cr(o.component, f, u);
    else {
      if (R & 128) {
        o.suspense.unmount(f, u);
        return;
      }
      S && He(o, null, c, "beforeUnmount"), R & 64 ? o.type.remove(
        o,
        c,
        f,
        g,
        at,
        u
      ) : p && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (v !== xe || I > 0 && I & 64) ? Be(
        p,
        c,
        f,
        !1,
        !0
      ) : (v === xe && I & 384 || !g && R & 16) && Be(x, c, f), u && gn(o);
    }
    (B && (G = E && E.onVnodeUnmounted) || S) && de(() => {
      G && Me(G, c, o), S && He(o, null, c, "unmounted");
    }, f);
  }, gn = (o) => {
    const { type: c, el: f, anchor: u, transition: g } = o;
    if (c === xe) {
      lr(f, u);
      return;
    }
    if (c === xa) {
      F(o);
      return;
    }
    const v = () => {
      i(f), g && !g.persisted && g.afterLeave && g.afterLeave();
    };
    if (o.shapeFlag & 1 && g && !g.persisted) {
      const { leave: E, delayLeave: m } = g, x = () => E(f, v);
      m ? m(o.el, v, x) : x();
    } else
      v();
  }, lr = (o, c) => {
    let f;
    for (; o !== c; )
      f = w(o), i(o), o = f;
    i(c);
  }, cr = (o, c, f) => {
    const { bum: u, scope: g, update: v, subTree: E, um: m } = o;
    u && ha(u), g.stop(), v && (v.active = !1, Se(E, o, c, f)), m && de(m, c), de(() => {
      o.isUnmounted = !0;
    }, c), c && c.pendingBranch && !c.isUnmounted && o.asyncDep && !o.asyncResolved && o.suspenseId === c.pendingId && (c.deps--, c.deps === 0 && c.resolve());
  }, Be = (o, c, f, u = !1, g = !1, v = 0) => {
    for (let E = v; E < o.length; E++)
      Se(o[E], c, f, u, g);
  }, Tt = (o) => o.shapeFlag & 6 ? Tt(o.component.subTree) : o.shapeFlag & 128 ? o.suspense.next() : w(o.anchor || o.el), hn = (o, c, f) => {
    o == null ? c._vnode && Se(c._vnode, null, null, !0) : Y(c._vnode || null, o, c, null, null, null, f), Jn(), Ii(), c._vnode = o;
  }, at = {
    p: Y,
    um: Se,
    m: Ve,
    r: gn,
    mt: ba,
    mc: Oe,
    pc: A,
    pbc: Xe,
    n: Tt,
    o: e
  };
  let fa, ua;
  return t && ([fa, ua] = t(
    at
  )), {
    render: hn,
    hydrate: fa,
    createApp: Bs(hn, fa)
  };
}
function Pe({ effect: e, update: t }, a) {
  e.allowRecurse = t.allowRecurse = a;
}
function Ls(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zi(e, t, a = !1) {
  const n = e.children, i = t.children;
  if (_(n) && _(i))
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Ge(i[r]), l.el = s.el), a || Zi(s, l)), l.type === sa && (l.el = s.el);
    }
}
function Zs(e) {
  const t = e.slice(), a = [0];
  let n, i, r, s, l;
  const d = e.length;
  for (n = 0; n < d; n++) {
    const b = e[n];
    if (b !== 0) {
      if (i = a[a.length - 1], e[i] < b) {
        t[n] = i, a.push(n);
        continue;
      }
      for (r = 0, s = a.length - 1; r < s; )
        l = r + s >> 1, e[a[l]] < b ? r = l + 1 : s = l;
      b < e[a[r]] && (r > 0 && (t[n] = a[r - 1]), a[r] = n);
    }
  }
  for (r = a.length, s = a[r - 1]; r-- > 0; )
    a[r] = s, s = t[s];
  return a;
}
const Us = (e) => e.__isTeleport, xe = Symbol.for("v-fgt"), sa = Symbol.for("v-txt"), Ue = Symbol.for("v-cmt"), xa = Symbol.for("v-stc"), Rt = [];
let Ie = null;
function j(e = !1) {
  Rt.push(Ie = e ? null : []);
}
function Ks() {
  Rt.pop(), Ie = Rt[Rt.length - 1] || null;
}
let Jt = 1;
function Gn(e) {
  Jt += e;
}
function Ui(e) {
  return e.dynamicChildren = Jt > 0 ? Ie || st : null, Ks(), Jt > 0 && Ie && Ie.push(e), e;
}
function C(e, t, a, n, i, r) {
  return Ui(
    N(
      e,
      t,
      a,
      n,
      i,
      r,
      !0
      /* isBlock */
    )
  );
}
function et(e, t, a, n, i) {
  return Ui(
    le(
      e,
      t,
      a,
      n,
      i,
      !0
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function Ki(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function xt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const oa = "__vInternal", Xi = ({ key: e }) => e ?? null, Ut = ({
  ref: e,
  ref_key: t,
  ref_for: a
}) => (typeof e == "number" && (e = "" + e), e != null ? P(e) || oe(e) || J(e) ? { i: ie, r: e, k: t, f: !!a } : e : null);
function N(e, t = null, a = null, n = 0, i = null, r = e === xe ? 0 : 1, s = !1, l = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xi(t),
    ref: t && Ut(t),
    scopeId: ia,
    slotScopeIds: null,
    children: a,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: ie
  };
  return l ? (ln(d, a), r & 128 && e.normalize(d)) : a && (d.shapeFlag |= P(a) ? 8 : 16), Jt > 0 && // avoid a block node from tracking itself
  !s && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (d.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  d.patchFlag !== 32 && Ie.push(d), d;
}
const le = Xs;
function Xs(e, t = null, a = null, n = 0, i = null, r = !1) {
  if ((!e || e === ki) && (e = Ue), Ki(e)) {
    const l = ft(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return a && ln(l, a), Jt > 0 && !r && Ie && (l.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = l : Ie.push(l)), l.patchFlag |= -2, l;
  }
  if (ao(e) && (e = e.__vccOpts), t) {
    t = Ws(t);
    let { class: l, style: d } = t;
    l && !P(l) && (t.class = H(l)), K(d) && (hi(d) && !_(d) && (d = q({}, d)), t.style = Xa(d));
  }
  const s = P(e) ? 1 : ds(e) ? 128 : Us(e) ? 64 : K(e) ? 4 : J(e) ? 2 : 0;
  return N(
    e,
    t,
    a,
    n,
    i,
    s,
    r,
    !0
  );
}
function Ws(e) {
  return e ? hi(e) || oa in e ? q({}, e) : e : null;
}
function ft(e, t, a = !1) {
  const { props: n, ref: i, patchFlag: r, children: s } = e, l = t ? Vs(n || {}, t) : n;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Xi(l),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      a && i ? _(i) ? i.concat(Ut(t)) : [i, Ut(t)] : Ut(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: s,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== xe ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ft(e.ssContent),
    ssFallback: e.ssFallback && ft(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function be(e = " ", t = 0) {
  return le(sa, null, e, t);
}
function ee(e = "", t = !1) {
  return t ? (j(), et(Ue, null, e)) : le(Ue, null, e);
}
function je(e) {
  return e == null || typeof e == "boolean" ? le(Ue) : _(e) ? le(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? Ge(e) : le(sa, null, String(e));
}
function Ge(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ft(e);
}
function ln(e, t) {
  let a = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (_(t))
    a = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), ln(e, i()), i._c && (i._d = !0));
      return;
    } else {
      a = 32;
      const i = t._;
      !i && !(oa in t) ? t._ctx = ie : i === 3 && ie && (ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    J(t) ? (t = { default: t, _ctx: ie }, a = 32) : (t = String(t), n & 64 ? (a = 16, t = [be(t)]) : a = 8);
  e.children = t, e.shapeFlag |= a;
}
function Vs(...e) {
  const t = {};
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = H([t.class, n.class]));
      else if (i === "style")
        t.style = Xa([t.style, n.style]);
      else if (Dt(i)) {
        const r = t[i], s = n[i];
        s && r !== s && !(_(r) && r.includes(s)) && (t[i] = r ? [].concat(r, s) : s);
      } else
        i !== "" && (t[i] = n[i]);
  }
  return t;
}
function Me(e, t, a, n = null) {
  Re(e, t, 7, [
    a,
    n
  ]);
}
const Hs = zi();
let Ps = 0;
function Ds(e, t, a) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Hs, r = {
    uid: Ps++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new wr(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Ai(n, i),
    emitsOptions: Ri(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: L,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: L,
    data: L,
    props: L,
    attrs: L,
    slots: L,
    refs: L,
    setupState: L,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: a,
    suspenseId: a ? a.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = ns.bind(null, r), e.ce && e.ce(r), r;
}
let Q = null;
const Qs = () => Q || ie;
let cn, it, Nn = "__VUE_INSTANCE_SETTERS__";
(it = Ia()[Nn]) || (it = Ia()[Nn] = []), it.push((e) => Q = e), cn = (e) => {
  it.length > 1 ? it.forEach((t) => t(e)) : it[0](e);
};
const ut = (e) => {
  cn(e), e.scope.on();
}, $e = () => {
  Q && Q.scope.off(), cn(null);
};
function Wi(e) {
  return e.vnode.shapeFlag & 4;
}
let Mt = !1;
function qs(e, t = !1) {
  Mt = t;
  const { props: a, children: n } = e.vnode, i = Wi(e);
  Ts(e, a, i, t), Os(e, n);
  const r = i ? $s(e, t) : void 0;
  return Mt = !1, r;
}
function $s(e, t) {
  const a = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = pi(new Proxy(e.ctx, Rs));
  const { setup: n } = a;
  if (n) {
    const i = e.setupContext = n.length > 1 ? Hi(e) : null;
    ut(e), gt();
    const r = Le(
      n,
      e,
      0,
      [e.props, i]
    );
    if (ht(), $e(), $n(r)) {
      if (r.then($e, $e), t)
        return r.then((s) => {
          Ln(e, s, t);
        }).catch((s) => {
          aa(s, e, 0);
        });
      e.asyncDep = r;
    } else
      Ln(e, r, t);
  } else
    Vi(e, t);
}
function Ln(e, t, a) {
  J(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : K(t) && (e.setupState = vi(t)), Vi(e, a);
}
let Zn;
function Vi(e, t, a) {
  const n = e.type;
  if (!e.render) {
    if (!t && Zn && !n.render) {
      const i = n.template || sn(e).template;
      if (i) {
        const { isCustomElement: r, compilerOptions: s } = e.appContext.config, { delimiters: l, compilerOptions: d } = n, b = q(
          q(
            {
              isCustomElement: r,
              delimiters: l
            },
            s
          ),
          d
        );
        n.render = Zn(i, b);
      }
    }
    e.render = n.render || we;
  }
  {
    ut(e), gt();
    try {
      _s(e);
    } finally {
      ht(), $e();
    }
  }
}
function eo(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, a) {
        return fe(e, "get", "$attrs"), t[a];
      }
    }
  ));
}
function Hi(e) {
  const t = (a) => {
    e.exposed = a || {};
  };
  return {
    get attrs() {
      return eo(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function dn(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(vi(pi(e.exposed)), {
      get(t, a) {
        if (a in t)
          return t[a];
        if (a in wt)
          return wt[a](e);
      },
      has(t, a) {
        return a in t || a in wt;
      }
    }));
}
function to(e, t = !0) {
  return J(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function ao(e) {
  return J(e) && "__vccOpts" in e;
}
const X = (e, t) => Qr(e, t, Mt), no = Symbol.for("v-scx"), io = () => Zt(no), ro = "3.3.9", so = "http://www.w3.org/2000/svg", Qe = typeof document < "u" ? document : null, Un = Qe && /* @__PURE__ */ Qe.createElement("template"), oo = {
  insert: (e, t, a) => {
    t.insertBefore(e, a || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, a, n) => {
    const i = t ? Qe.createElementNS(so, e) : Qe.createElement(e, a ? { is: a } : void 0);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Qe.createTextNode(e),
  createComment: (e) => Qe.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Qe.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, a, n, i, r) {
    const s = a ? a.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), a), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      Un.innerHTML = n ? `<svg>${e}</svg>` : e;
      const l = Un.content;
      if (n) {
        const d = l.firstChild;
        for (; d.firstChild; )
          l.appendChild(d.firstChild);
        l.removeChild(d);
      }
      t.insertBefore(l, a);
    }
    return [
      // first
      s ? s.nextSibling : t.firstChild,
      // last
      a ? a.previousSibling : t.lastChild
    ];
  }
}, lo = Symbol("_vtc");
function co(e, t, a) {
  const n = e[lo];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : a ? e.setAttribute("class", t) : e.className = t;
}
const bo = Symbol("_vod");
function fo(e, t, a) {
  const n = e.style, i = P(a);
  if (a && !i) {
    if (t && !P(t))
      for (const r in t)
        a[r] == null && Ta(n, r, "");
    for (const r in a)
      Ta(n, r, a[r]);
  } else {
    const r = n.display;
    i ? t !== a && (n.cssText = a) : t && e.removeAttribute("style"), bo in e && (n.display = r);
  }
}
const Kn = /\s*!important$/;
function Ta(e, t, a) {
  if (_(a))
    a.forEach((n) => Ta(e, t, n));
  else if (a == null && (a = ""), t.startsWith("--"))
    e.setProperty(t, a);
  else {
    const n = uo(e, t);
    Kn.test(a) ? e.setProperty(
      Ee(n),
      a.replace(Kn, ""),
      "important"
    ) : e[n] = a;
  }
}
const Xn = ["Webkit", "Moz", "ms"], Ea = {};
function uo(e, t) {
  const a = Ea[t];
  if (a)
    return a;
  let n = ge(t);
  if (n !== "filter" && n in e)
    return Ea[t] = n;
  n = ea(n);
  for (let i = 0; i < Xn.length; i++) {
    const r = Xn[i] + n;
    if (r in e)
      return Ea[t] = r;
  }
  return t;
}
const Wn = "http://www.w3.org/1999/xlink";
function go(e, t, a, n, i) {
  if (n && t.startsWith("xlink:"))
    a == null ? e.removeAttributeNS(Wn, t.slice(6, t.length)) : e.setAttributeNS(Wn, t, a);
  else {
    const r = Ir(t);
    a == null || r && !ai(a) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : a);
  }
}
function ho(e, t, a, n, i, r, s) {
  if (t === "innerHTML" || t === "textContent") {
    n && s(n, i, r), e[t] = a ?? "";
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && // custom elements may use _value internally
  !l.includes("-")) {
    e._value = a;
    const b = l === "OPTION" ? e.getAttribute("value") : e.value, h = a ?? "";
    b !== h && (e.value = h), a == null && e.removeAttribute(t);
    return;
  }
  let d = !1;
  if (a === "" || a == null) {
    const b = typeof e[t];
    b === "boolean" ? a = ai(a) : a == null && b === "string" ? (a = "", d = !0) : b === "number" && (a = 0, d = !0);
  }
  try {
    e[t] = a;
  } catch {
  }
  d && e.removeAttribute(t);
}
function po(e, t, a, n) {
  e.addEventListener(t, a, n);
}
function mo(e, t, a, n) {
  e.removeEventListener(t, a, n);
}
const Vn = Symbol("_vei");
function vo(e, t, a, n, i = null) {
  const r = e[Vn] || (e[Vn] = {}), s = r[t];
  if (n && s)
    s.value = n;
  else {
    const [l, d] = xo(t);
    if (n) {
      const b = r[t] = Io(n, i);
      po(e, l, b, d);
    } else
      s && (mo(e, l, s, d), r[t] = void 0);
  }
}
const Hn = /(?:Once|Passive|Capture)$/;
function xo(e) {
  let t;
  if (Hn.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Hn); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ee(e.slice(2)), t];
}
let ya = 0;
const Eo = /* @__PURE__ */ Promise.resolve(), yo = () => ya || (Eo.then(() => ya = 0), ya = Date.now());
function Io(e, t) {
  const a = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= a.attached)
      return;
    Re(
      wo(n, a.value),
      t,
      5,
      [n]
    );
  };
  return a.value = e, a.attached = yo(), a;
}
function wo(e, t) {
  if (_(t)) {
    const a = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      a.call(e), e._stopped = !0;
    }, t.map((n) => (i) => !i._stopped && n && n(i));
  } else
    return t;
}
const Pn = /^on[a-z]/, Ro = (e, t, a, n, i = !1, r, s, l, d) => {
  t === "class" ? co(e, n, i) : t === "style" ? fo(e, a, n) : Dt(t) ? Za(t) || vo(e, t, a, n, s) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ko(e, t, n, i)) ? ho(
    e,
    t,
    n,
    r,
    s,
    l,
    d
  ) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), go(e, t, n, i));
};
function ko(e, t, a, n) {
  return n ? !!(t === "innerHTML" || t === "textContent" || t in e && Pn.test(t) && J(a)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || Pn.test(t) && P(a) ? !1 : t in e;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ke(e, t) {
  const a = /* @__PURE__ */ he(e);
  class n extends bn {
    constructor(r) {
      super(a, r, t);
    }
  }
  return n.def = a, n;
}
const _o = typeof HTMLElement < "u" ? HTMLElement : class {
};
class bn extends _o {
  constructor(t, a = {}, n) {
    super(), this._def = t, this._props = a, this._instance = null, this._connected = !1, this._resolved = !1, this._numberProps = null, this._ob = null, this.shadowRoot && n ? n(this._createVNode(), this.shadowRoot) : (this.attachShadow({ mode: "open" }), this._def.__asyncLoader || this._resolveProps(this._def));
  }
  connectedCallback() {
    this._connected = !0, this._instance || (this._resolved ? this._update() : this._resolveDef());
  }
  disconnectedCallback() {
    this._connected = !1, this._ob && (this._ob.disconnect(), this._ob = null), Ei(() => {
      this._connected || (Qn(null, this.shadowRoot), this._instance = null);
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = !0;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver((n) => {
      for (const i of n)
        this._setAttr(i.attributeName);
    }), this._ob.observe(this, { attributes: !0 });
    const t = (n, i = !1) => {
      const { props: r, styles: s } = n;
      let l;
      if (r && !_(r))
        for (const d in r) {
          const b = r[d];
          (b === Number || b && b.type === Number) && (d in this._props && (this._props[d] = xn(this._props[d])), (l || (l = /* @__PURE__ */ Object.create(null)))[ge(d)] = !0);
        }
      this._numberProps = l, i && this._resolveProps(n), this._applyStyles(s), this._update();
    }, a = this._def.__asyncLoader;
    a ? a().then((n) => t(n, !0)) : t(this._def);
  }
  _resolveProps(t) {
    const { props: a } = t, n = _(a) ? a : Object.keys(a || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i], !0, !1);
    for (const i of n.map(ge))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r);
        }
      });
  }
  _setAttr(t) {
    let a = this.getAttribute(t);
    const n = ge(t);
    this._numberProps && this._numberProps[n] && (a = xn(a)), this._setProp(n, a, !1);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, a, n = !0, i = !0) {
    a !== this._props[t] && (this._props[t] = a, i && this._instance && this._update(), n && (a === !0 ? this.setAttribute(Ee(t), "") : typeof a == "string" || typeof a == "number" ? this.setAttribute(Ee(t), a + "") : a || this.removeAttribute(Ee(t))));
  }
  _update() {
    Qn(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const t = le(this._def, q({}, this._props));
    return this._instance || (t.ce = (a) => {
      this._instance = a, a.isCE = !0;
      const n = (r, s) => {
        this.dispatchEvent(
          new CustomEvent(r, {
            detail: s
          })
        );
      };
      a.emit = (r, ...s) => {
        n(r, s), Ee(r) !== r && n(Ee(r), s);
      };
      let i = this;
      for (; i = i && (i.parentNode || i.host); )
        if (i instanceof bn) {
          a.parent = i._instance, a.provides = i._instance.provides;
          break;
        }
    }), t;
  }
  _applyStyles(t) {
    t && t.forEach((a) => {
      const n = document.createElement("style");
      n.textContent = a, this.shadowRoot.appendChild(n);
    });
  }
}
const So = /* @__PURE__ */ q({ patchProp: Ro }, oo);
let Dn;
function Jo() {
  return Dn || (Dn = Gs(So));
}
const Qn = (...e) => {
  Jo().render(...e);
};
function ce(e) {
  return e.replace(/_/g, "-");
}
const Mo = `.border[data-v-264c8e1e]{border:1px solid;border-color:#00000020}[class*=bg--black] .border[data-v-264c8e1e]{border-color:#ffffff53}.borderless[data-v-264c8e1e]{border:none!important}.alert[data-v-264c8e1e]{--h2-font-size: 1.6rem;border:1px solid;border-color:#00000020;border-radius:2px;padding:1.5rem;line-height:1.3;font-size:1.2rem}[class*=bg--black] .alert[data-v-264c8e1e]{border-color:#ffffff53}.alert h2[data-v-264c8e1e]{font-size:var(--h2-font-size)}.alert h3[data-v-264c8e1e]{font-size:calc(.9 * var(--h2-font-size))}.alert h4[data-v-264c8e1e]{font-size:calc(.8 * var(--h2-font-size))}.alert h5[data-v-264c8e1e]{font-size:calc(.7 * var(--h2-font-size))}.alert h6[data-v-264c8e1e]{font-size:calc(.6 * var(--h2-font-size))}.alert *[data-v-264c8e1e]{margin-bottom:0}.alert *+*[data-v-264c8e1e]:not(span):not(div):not(svg){margin-top:.2rem;line-height:1.6}.alert__icon[data-v-264c8e1e]{padding:0 1.5rem 0 0}.alert__icon .fa-stack[data-v-264c8e1e]{width:2em}.alert__icon .svg-inline--fa.fa-stack-2x[data-v-264c8e1e],.alert__icon .svg-inline--fa.fa-stack-1x[data-v-264c8e1e]{width:100%}.alert__icon .fa-1x[data-v-264c8e1e]{font-size:1.2rem}.alert--danger[data-v-264c8e1e]{background:#fbeeeb}.alert--danger .fa-circle[data-v-264c8e1e]{color:#bd472a}.alert--success[data-v-264c8e1e]{background:#ebfffa}.alert--success .fa-circle[data-v-264c8e1e]{color:#00664f}.alert--warning[data-v-264c8e1e]{background:#fffae6}.alert--warning .fa-circle[data-v-264c8e1e]{color:#bd472a}.alert--warning .fa-exclamation-triangle[data-v-264c8e1e]{margin-top:-2px}.alert--info[data-v-264c8e1e]{background:#f2faff}.alert--info .fa-circle[data-v-264c8e1e]{color:#00558c}.alert--centered[data-v-264c8e1e]{display:flex;justify-content:center}.alert--vertically-centered[data-v-264c8e1e]{display:flex;align-items:center}.alert--dismissible[data-v-264c8e1e]{position:relative}.alert--dismissible button[data-v-264c8e1e]{position:absolute;right:0;top:0;background:transparent;border:none;height:42px;width:42px}.alert--dismissible button i[data-v-264c8e1e]{font-size:1.5rem}.alert--icon[data-v-264c8e1e]{display:flex}
`, pe = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [n, i] of t)
    a[n] = i;
  return a;
}, Pi = (e) => (an("data-v-264c8e1e"), e = e(), nn(), e), jo = {
  key: 0,
  class: "alert__icon"
}, Fo = { class: "fa-stack fa-1x" }, Bo = /* @__PURE__ */ Pi(() => /* @__PURE__ */ N("span", {
  role: "presentation",
  class: "fas fa-circle fa-stack-2x"
}, null, -1)), Yo = {
  key: 1,
  "data-dismiss": "alert"
}, To = /* @__PURE__ */ Pi(() => /* @__PURE__ */ N("i", { class: "fas fa-times" }, null, -1)), Co = [
  To
], zo = /* @__PURE__ */ he({
  __name: "Alert",
  props: {
    /**
     * Type of alert.
     */
    type: {
      type: String,
      default: "info",
      validator: (e) => ["info", "success", "warning", "danger"].indexOf(e) !== -1
    },
    /**
     * Content alignment.
     */
    centered: {
      type: Boolean
    },
    /**
     * Icon visible.
     */
    iconVisible: {
      type: Boolean
    },
    /**
     * Alert is removable.
     */
    dismissible: {
      type: Boolean
    },
    /**
     * Vertically center alert.
     */
    verticallyCentered: {
      type: Boolean
    }
  },
  setup(e) {
    const t = e, a = X(() => {
      switch (t.type) {
        case "success":
          return "check";
        case "warning":
          return "exclamation-triangle";
        case "danger":
          return "exclamation";
        default:
          return "info";
      }
    }), n = X(() => {
      let i = ["alert"];
      return t.type && i.push(`alert--${ce(t.type)}`), t.verticallyCentered && i.push("alert--vertically-centered"), t.iconVisible && i.push("alert--icon"), ["centered", "dismissible"].forEach((r) => {
        t[r] === !0 && i.push(`alert--${ce(r)}`);
      }), i;
    });
    return (i, r) => (j(), C("div", {
      class: H(n.value)
    }, [
      t.iconVisible ? (j(), C("div", jo, [
        N("span", Fo, [
          Bo,
          N("span", {
            role: "presentation",
            class: H("fas fa-stack-1x fa-inverse fa-" + a.value)
          }, null, 2)
        ])
      ])) : ee("", !0),
      U(i.$slots, "default", { class: "alert__content" }, () => [
        be("Body")
      ], !0),
      t.dismissible ? (j(), C("button", Yo, Co)) : ee("", !0)
    ], 2));
  }
}), Oo = /* @__PURE__ */ pe(zo, [["styles", [Mo]], ["__scopeId", "data-v-264c8e1e"]]);
const Ao = `.bold-headline[data-v-49d33c06],.headline[data-v-49d33c06]{padding:0;line-height:1}.bold-headline a[data-v-49d33c06],.headline a[data-v-49d33c06]{color:var(--brand-secondary);text-decoration:none}.bold-headline a[data-v-49d33c06]:hover,.bold-headline a[data-v-49d33c06]:focus,.headline a[data-v-49d33c06]:hover,.headline a[data-v-49d33c06]:focus{text-decoration:underline}[class*=bg-] .bold-headline a[data-v-49d33c06],[class*=bg-] .headline a[data-v-49d33c06]{color:inherit}.bold-headline.bold-headline--negative[data-v-49d33c06],.bold-headline.headline--negative[data-v-49d33c06],.headline.bold-headline--negative[data-v-49d33c06],.headline.headline--negative[data-v-49d33c06],.bold-headline.bold-headline--negative a[data-v-49d33c06],.bold-headline.headline--negative a[data-v-49d33c06],.headline.bold-headline--negative a[data-v-49d33c06],.headline.headline--negative a[data-v-49d33c06]{color:#fff}.headline--center[data-v-49d33c06]{text-align:center}.bold-headline--caps[data-v-49d33c06],.headline--uppercase[data-v-49d33c06]{text-transform:uppercase;font-family:Antonio,Antonio-fallback,sans-serif;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;font-weight:700;font-style:normal;font-display:swap}.bold-headline--serif[data-v-49d33c06],.headline--serif[data-v-49d33c06]{font-family:Zilla Slab,Zilla-fallback,serif;font-weight:700}.bold-headline--highlight[data-v-49d33c06],.headline--highlight[data-v-49d33c06]{align-items:center;justify-content:center;margin-bottom:8px;padding:2px 0;line-height:1.7}.headline--highlight.headline--serif span[data-v-49d33c06]{padding:.2rem 1rem .5rem}.bold-headline--caps .headline__headline span[data-v-49d33c06],.bold-headline--highlight span[data-v-49d33c06],.headline--highlight span[data-v-49d33c06]{background:var(--brand-primary);display:inline;padding:.85rem 1rem;box-decoration-break:clone;-webkit-box-decoration-break:clone;color:var(--brand-secondary);text-shadow:none}[class*=bg--gold] .bold-headline--caps .headline__headline span[data-v-49d33c06],[class*=bg--gold] .bold-headline--highlight span[data-v-49d33c06],[class*=bg--gold] .headline--highlight span[data-v-49d33c06]{background:var(--brand-secondary);color:#fff}[class*=bg--gold] .bold-headline--caps .headline__heading[data-v-49d33c06],[class*=bg--gold] .headline--uppercase .headline__heading[data-v-49d33c06],[class*=bg--gold] .headline--uppercase .headline__text[data-v-49d33c06]{font-weight:400}.bold-headline--caps .headline__heading span[data-v-49d33c06],.headline--uppercase .headline__heading span[data-v-49d33c06],.headline--uppercase .headline__text span[data-v-49d33c06]{background:var(--brand-primary);display:inline-block;margin-bottom:.8rem;margin-top:.8rem;padding:.6rem 1rem;color:var(--brand-secondary)}[class*=bg--gold] .bold-headline--caps .headline__heading span[data-v-49d33c06],[class*=bg--gold] .headline--uppercase .headline__heading span[data-v-49d33c06],[class*=bg--gold] .headline--uppercase .headline__text span[data-v-49d33c06]{background:var(--brand-secondary);color:#fff;font-weight:400}[class*=bg--gold] [class*=bg--black] .bold-headline--caps .headline__heading span[data-v-49d33c06],[class*=bg--gold] [class*=bg--black] .headline--uppercase .headline__heading span[data-v-49d33c06],[class*=bg--gold] [class*=bg--black] .headline--uppercase .headline__text span[data-v-49d33c06]{background:var(--brand-primary);color:var(--brand-secondary)}.bold-headline--underline[data-v-49d33c06],.headline--underline[data-v-49d33c06]{padding-bottom:.625rem}.bold-headline--underline[data-v-49d33c06]:after,.headline--underline[data-v-49d33c06]:after{content:"";display:block;width:75px;height:6px;margin-top:15px;background:var(--brand-primary)}.bold-headline--underline.headline--center[data-v-49d33c06]:after,.headline--underline.headline--center[data-v-49d33c06]:after{margin-right:auto;margin-left:auto}.bg-pattern--brain-reversed .bold-headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .bold-headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed .headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .headline--underline[data-v-49d33c06]:after{background:#f3f3f3}h5.bold-headline--underline[data-v-49d33c06],h5.headline--underline[data-v-49d33c06],.h5.bold-headline--underline[data-v-49d33c06],.h5.headline--underline[data-v-49d33c06]{padding-bottom:.625rem}h5.bold-headline--underline[data-v-49d33c06]:after,h5.headline--underline[data-v-49d33c06]:after,.h5.bold-headline--underline[data-v-49d33c06]:after,.h5.headline--underline[data-v-49d33c06]:after{content:"";display:block;width:75px;height:6px;margin-top:15px;background:var(--brand-primary)}h5.bold-headline--underline.headline--center[data-v-49d33c06]:after,h5.headline--underline.headline--center[data-v-49d33c06]:after,.h5.bold-headline--underline.headline--center[data-v-49d33c06]:after,.h5.headline--underline.headline--center[data-v-49d33c06]:after{margin-right:auto;margin-left:auto}.bg-pattern--brain-reversed h5.bold-headline--underline[data-v-49d33c06]:after,[class*=bg--gold] h5.bold-headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed h5.headline--underline[data-v-49d33c06]:after,[class*=bg--gold] h5.headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed .h5.bold-headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .h5.bold-headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed .h5.headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .h5.headline--underline[data-v-49d33c06]:after{background:#f3f3f3}h5.bold-headline--underline[data-v-49d33c06]:after,h5.headline--underline[data-v-49d33c06]:after,.h5.bold-headline--underline[data-v-49d33c06]:after,.h5.headline--underline[data-v-49d33c06]:after{height:5px}h6.bold-headline--underline[data-v-49d33c06],h6.headline--underline[data-v-49d33c06],.h6.bold-headline--underline[data-v-49d33c06],.h6.headline--underline[data-v-49d33c06]{padding-bottom:.625rem}h6.bold-headline--underline[data-v-49d33c06]:after,h6.headline--underline[data-v-49d33c06]:after,.h6.bold-headline--underline[data-v-49d33c06]:after,.h6.headline--underline[data-v-49d33c06]:after{content:"";display:block;width:75px;height:6px;margin-top:15px;background:var(--brand-primary)}h6.bold-headline--underline.headline--center[data-v-49d33c06]:after,h6.headline--underline.headline--center[data-v-49d33c06]:after,.h6.bold-headline--underline.headline--center[data-v-49d33c06]:after,.h6.headline--underline.headline--center[data-v-49d33c06]:after{margin-right:auto;margin-left:auto}.bg-pattern--brain-reversed h6.bold-headline--underline[data-v-49d33c06]:after,[class*=bg--gold] h6.bold-headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed h6.headline--underline[data-v-49d33c06]:after,[class*=bg--gold] h6.headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed .h6.bold-headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .h6.bold-headline--underline[data-v-49d33c06]:after,.bg-pattern--brain-reversed .h6.headline--underline[data-v-49d33c06]:after,[class*=bg--gold] .h6.headline--underline[data-v-49d33c06]:after{background:#f3f3f3}h6.bold-headline--underline[data-v-49d33c06]:after,h6.headline--underline[data-v-49d33c06]:after,.h6.bold-headline--underline[data-v-49d33c06]:after,.h6.headline--underline[data-v-49d33c06]:after{height:4px}.bold-headline--highlight.bold-headline--serif[data-v-49d33c06],.headline--highlight.headline--serif[data-v-49d33c06]{font-weight:600}.bold-headline--highlight.bold-headline--caps span[data-v-49d33c06],.headline--highlight.headline--uppercase span[data-v-49d33c06]{padding:.1rem 1rem 0}
`, Go = /* @__PURE__ */ he({
  __name: "Headline",
  props: {
    level: {
      type: String,
      default: "h2",
      validator: function(e) {
        return ["h1", "h2", "h3", "h4", "h5", "h6"].indexOf(e) !== -1;
      }
    },
    highlight: {
      type: Boolean,
      default: !1
    },
    text_style: {
      type: String,
      default: ""
    },
    underline: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, a = X(() => ({
      headline: !0,
      "headline--uppercase": t.text_style === "uppercase",
      "headline--serif": t.text_style === "serif",
      "headline--underline": t.underline,
      "headline--highlight": t.highlight
    }));
    return (n, i) => (j(), et(cs(e.level), {
      class: H(a.value)
    }, {
      default: Ce(() => [
        U(n.$slots, "default", {}, void 0, !0)
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), la = /* @__PURE__ */ pe(Go, [["styles", [Ao]], ["__scopeId", "data-v-49d33c06"]]);
const No = {
  /**
   * Set an outline on any element.
   */
  borderless: {
    type: Boolean,
    default: !1
  }
}, Lo = {
  borderless: {
    name: "No border",
    table: {
      defaultValue: { summary: !1 },
      category: "Display options"
    },
    control: { type: "boolean" }
  }
}, Zo = (e, t) => {
  t.borderless && e.push("borderless");
}, Ht = {
  props: No,
  argTypes: Lo,
  addBorderlessClass: Zo
}, Uo = `.border[data-v-b6f09b2a]{border:1px solid;border-color:#00000020}[class*=bg--black] .border[data-v-b6f09b2a]{border-color:#ffffff53}.borderless[data-v-b6f09b2a]{border:none!important}.bttn[data-v-b6f09b2a]{border:none;display:inline-block;align-items:center;justify-content:center;position:relative;cursor:pointer;text-align:center;text-decoration:none;text-transform:uppercase;line-height:1.4;font-family:Antonio,Antonio-fallback,sans-serif;font-size:1.25rem;padding:1rem 2rem;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;border:1px solid;border-color:#00000020}.bttn i[data-v-b6f09b2a],.bttn svg[data-v-b6f09b2a]{margin-left:.625rem}[class*=bg--black] .bttn[data-v-b6f09b2a]{border-color:#ffffff53}[class*=bg--] .bttn[data-v-b6f09b2a],[class*=bg--] [class*=bg--] .bttn[data-v-b6f09b2a]{border-color:#0000006c;color:var(--brand-secondary)}[class*=bg--black] .bttn[data-v-b6f09b2a]{border-color:#ffffff6c}.bttn--primary[data-v-b6f09b2a]{background:var(--brand-primary);border-color:var(--brand-primary);color:var(--brand-secondary)}.bttn--primary i[data-v-b6f09b2a],.bttn--primary svg[data-v-b6f09b2a],.bttn--primary span[data-v-b6f09b2a]{color:#fff}.bttn--primary[data-v-b6f09b2a]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--primary[data-v-b6f09b2a]:focus{text-decoration:underline}.bttn--primary[data-v-b6f09b2a]:hover:after,.bttn--primary[data-v-b6f09b2a]:focus:after{transform:translate(-50%) scaleX(1)}[class*=bg--] [class*=bg--gray] .bttn--primary[data-v-b6f09b2a],[class*=bg--gray] .bttn--primary[data-v-b6f09b2a],[class*=bg--] [class*=bg--white] .bttn--primary[data-v-b6f09b2a],[class*=bg--white] .bttn--primary[data-v-b6f09b2a]{border-color:var(--brand-primary)}.bttn--primary[data-v-b6f09b2a]:after{background-color:var(--brand-secondary)}.bttn--secondary[data-v-b6f09b2a]{color:#fff;background:var(--brand-secondary)}.bttn--secondary i[data-v-b6f09b2a],.bttn--secondary svg[data-v-b6f09b2a],.bttn--secondary span[data-v-b6f09b2a]{color:var(--brand-primary)}.bttn--secondary[data-v-b6f09b2a]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--secondary[data-v-b6f09b2a]:focus{text-decoration:underline}.bttn--secondary[data-v-b6f09b2a]:hover:after,.bttn--secondary[data-v-b6f09b2a]:focus:after{transform:translate(-50%) scaleX(1)}.bttn--secondary__light[data-v-b6f09b2a]{color:#fff}[class*=bg--] .bttn--secondary[data-v-b6f09b2a],[class*=bg--] [class*=bg--] .bttn--secondary[data-v-b6f09b2a]{border-color:#ffffff6c;color:#fff}.bttn--tertiary[data-v-b6f09b2a]{color:var(--brand-secondary);background:#fff}.bttn--tertiary i[data-v-b6f09b2a],.bttn--tertiary svg[data-v-b6f09b2a],.bttn--tertiary span[data-v-b6f09b2a]{color:var(--brand-primary)}.bttn--tertiary[data-v-b6f09b2a]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--tertiary[data-v-b6f09b2a]:focus{text-decoration:underline}.bttn--tertiary[data-v-b6f09b2a]:hover:after,.bttn--tertiary[data-v-b6f09b2a]:focus:after{transform:translate(-50%) scaleX(1)}.bttn--transparent[data-v-b6f09b2a]{background:transparent;color:var(--brand-secondary)}.bttn--transparent i[data-v-b6f09b2a],.bttn--transparent svg[data-v-b6f09b2a],.bttn--transparent span[data-v-b6f09b2a]{color:var(--brand-primary)}.bttn--transparent[data-v-b6f09b2a]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--transparent[data-v-b6f09b2a]:focus{text-decoration:underline}.bttn--transparent[data-v-b6f09b2a]:hover:after,.bttn--transparent[data-v-b6f09b2a]:focus:after{transform:translate(-50%) scaleX(1)}[class*=bg--black] .bttn--transparent[data-v-b6f09b2a],[class*=bg--] [class*=bg--black] .bttn--transparent[data-v-b6f09b2a]{color:#fff;border-color:#ffffff6c}[class*=bg--gold] .bttn--transparent i[data-v-b6f09b2a],[class*=bg--white] [class*=bg--gold] .bttn--transparent i[data-v-b6f09b2a],[class*=bg--gold] .bttn--transparent span[data-v-b6f09b2a],[class*=bg--white] [class*=bg--gold] .bttn--transparent span[data-v-b6f09b2a],[class*=bg--gold] .bttn--transparent svg[data-v-b6f09b2a],[class*=bg--white] [class*=bg--gold] .bttn--transparent svg[data-v-b6f09b2a]{color:#fff}[class*=bg--white] .bttn--transparent i[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--white] .bttn--transparent i[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--gray] .bttn--transparent i[data-v-b6f09b2a],[class*=bg--white] .bttn--transparent span[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--white] .bttn--transparent span[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--gray] .bttn--transparent span[data-v-b6f09b2a],[class*=bg--white] .bttn--transparent svg[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--white] .bttn--transparent svg[data-v-b6f09b2a],[class*=bg--gold] [class*=bg--gray] .bttn--transparent svg[data-v-b6f09b2a]{color:var(--brand-primary)}[class*=bg--black] [class*=bg--white] .bttn--transparent[data-v-b6f09b2a],[class*=bg--black] [class*=bg--gray] .bttn--transparent[data-v-b6f09b2a],[class*=bg--black] [class*=bg--gold] .bttn--transparent[data-v-b6f09b2a]{color:var(--brand-secondary)}.bttn.borderless.bttn--transparent[data-v-b6f09b2a]:focus,.bttn.borderless.bttn--transparent[data-v-b6f09b2a]:hover{text-decoration:underline}.bttn.borderless.bttn--transparent[data-v-b6f09b2a]:after{display:none}.bttn--no-text i[data-v-b6f09b2a],.bttn--no-text span[data-v-b6f09b2a],.bttn--no-text svg[data-v-b6f09b2a]{margin-left:0}.bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],.bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],.bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a]{color:var(--brand-secondary)}[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a]{color:#fff}[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-b6f09b2a],[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-b6f09b2a],[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-b6f09b2a]{color:var(--brand-secondary)}.bttn--no-text.bttn--transparent.bttn--secondary i[data-v-b6f09b2a],.bttn--no-text.bttn--transparent.bttn--secondary span[data-v-b6f09b2a],.bttn--no-text.bttn--transparent.bttn--secondary svg[data-v-b6f09b2a]{color:var(--brand-secondary)}.bttn--circle[data-v-b6f09b2a]{padding:.55rem .7em;border-radius:50%;transform:none;line-height:1}.bttn--circle[data-v-b6f09b2a]:after{left:0;top:0;height:100%;width:100%;border-radius:50%;background-color:transparent;transition:border-color .3s ease-in-out;transform:none;position:absolute}.bttn--circle[data-v-b6f09b2a]:hover:after,.bttn--circle[data-v-b6f09b2a]:focus:after{transform:none;transition:none;border:3px solid;border-color:inherit;background-color:transparent}.bttn--large[data-v-b6f09b2a]{padding:1.5rem 2.5rem;font-size:1.45rem}.bttn--small[data-v-b6f09b2a]{padding:.6rem 1rem;font-size:1.05rem}.bttn--full[data-v-b6f09b2a]{display:flex}.bttn--caps[data-v-b6f09b2a]{text-transform:uppercase;font-family:Antonio,Antonio-fallback,sans-serif}.bttn--lowercase[data-v-b6f09b2a]{text-transform:none;letter-spacing:0;font-size:1rem}.bttn--light-font[data-v-b6f09b2a]{font-family:Roboto,sans-serif;font-weight:400;font-size:.9rem;letter-spacing:.04rem;display:inline-block}.bttn--light-font[data-v-b6f09b2a]:focus{text-decoration:underline}.bttn--light-font i[data-v-b6f09b2a],.bttn--light-font span[data-v-b6f09b2a]{font-size:.9rem}.bttn--light-font.bttn--full[data-v-b6f09b2a]{display:flex;height:100%}
`, Ko = ["href"], Xo = /* @__PURE__ */ he({
  __name: "Button",
  props: {
    url: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "primary",
      validator: function(e) {
        return ["primary", "secondary", "tertiary"].indexOf(e) !== -1;
      }
    },
    size: {
      type: String,
      default: "medium",
      validator: function(e) {
        return ["small", "medium", "large"].indexOf(e) !== -1;
      }
    },
    ...Ht.props,
    full: {
      type: Boolean,
      default: !1
    },
    transparent: {
      type: Boolean,
      default: !1
    },
    light_font: {
      type: Boolean,
      default: !1
    },
    icon: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, a = Ti(), n = X(() => {
      let i = ["bttn"];
      return ["full", "transparent", "light_font"].forEach((r) => {
        t[r] === !0 && i.push(`bttn--${ce(r)}`);
      }), t.color && i.push(`bttn--${ce(t.color)}`), t.size && i.push(`bttn--${ce(t.size)}`), a.default || i.push("bttn--no-text"), Ht.addBorderlessClass(i, t), i;
    });
    return (i, r) => (j(), C("a", {
      class: H(n.value),
      href: e.url
    }, [
      U(i.$slots, "default", {}, void 0, !0),
      U(i.$slots, "icon", {}, void 0, !0)
    ], 10, Ko));
  }
}), ca = /* @__PURE__ */ pe(Xo, [["styles", [Uo]], ["__scopeId", "data-v-b6f09b2a"]]), Ca = [
  "",
  "black",
  "gold",
  "gray",
  "white"
], Wo = {
  /**
   * Set the background color of the element.
   */
  background: {
    type: String,
    default: "",
    validator: function(e) {
      return Ca.indexOf(e) !== -1;
    }
  }
}, Vo = {
  background: {
    name: "Background",
    table: {
      defaultValue: { summary: Ca[0] },
      category: "Display options"
    },
    options: Ca,
    control: {
      type: "select",
      labels: {
        "": "none"
      }
    }
  }
}, Ho = (e, t) => {
  t.background !== "" && e.push(`bg--${ce(t.background)}`);
}, Ke = {
  props: Wo,
  argTypes: Vo,
  addBackgroundClass: Ho
};
const Po = `.banner[data-v-0c6fc990]{flex-basis:100%;display:flex;align-items:center;justify-content:center;min-height:15rem}.banner--large[data-v-0c6fc990]:before{float:left;padding-top:45.25%;content:""}.banner--medium[data-v-0c6fc990]:before{float:left;padding-top:32.25%;content:""}@media (min-width: 84.375em){.banner--full.banner--large[data-v-0c6fc990]{height:100vh}}.banner[data-v-0c6fc990]:after{display:block;content:"";clear:both}@media (min-width: 84.375em){.banner[data-v-0c6fc990]:after{display:block;content:"";clear:both}}.banner[data-v-0c6fc990]{position:relative;overflow:hidden}@media (min-width: 768px){.banner[data-v-0c6fc990]{flex-basis:100%;display:flex;align-items:center;justify-content:center}}.banner.banner--vertical-bottom[data-v-0c6fc990]{align-items:flex-end}.banner.banner--horizontal-center[data-v-0c6fc990]{text-align:center}.banner.banner--horizontal-center blockquote[data-v-0c6fc990]{border-left:none}.banner.banner--horizontal-center .banner__content>*[data-v-0c6fc990]{margin-right:auto;margin-left:auto}.banner:focus-within .headline a[data-v-0c6fc990]:focus{text-decoration:underline}.banner__container[data-v-0c6fc990]{margin:0 auto;width:100%;z-index:1}@media (min-width: 768px){.banner__container[data-v-0c6fc990]{z-index:1;max-width:81.875em;top:0}}.banner .headline+.banner__action[data-v-0c6fc990]{margin-top:1.5rem}.banner .banner__action .bttn[data-v-0c6fc990]{margin:0 1rem 1rem 0}@media (min-width: 768px){.banner .banner__action .bttn+.bttn[data-v-0c6fc990]{margin:0 1rem 1rem 0}}.banner[data-v-0c6fc990]:last-child{margin-right:0}@media (min-width: 768px){.banner.banner--gradient-dark:not([class*=bg-]).banner--stacked .banner__action .bttn--transparent[data-v-0c6fc990]{border-color:#ffffff86;color:#fff}}.banner.banner--gradient-dark:not([class*=banner--stacked]):not([class*=bg--white]):not([class*=bg--gold]) .banner__action .bttn--transparent[data-v-0c6fc990]{border:1px solid #fff;color:#fff}.banner__pre-title[data-v-0c6fc990]{background:none;line-height:1.1}.banner__pre-title.headline.headline--serif[data-v-0c6fc990]{margin-bottom:0}.banner__pre-title.headline.headline--uppercase[data-v-0c6fc990]{margin-bottom:.7rem}.banner__pre-title.headline.headline--highlight[data-v-0c6fc990]{margin-bottom:-.1rem}.banner__pre-title.headline.headline--highlight.headline--serif[data-v-0c6fc990]{margin-bottom:-.4rem}.banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{background:none}@media (min-width: 768px){[class*=bg--black] .banner--gradient-light:not([class*=bg-]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:var(--brand-secondary)}}[class*=bg--black] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--] [class*=bg--black] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--black] [class*=banner--gradient-dark]:not([class*=bg--]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--gold] [class*=banner--gradient-dark][class*=bg--black] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=banner--gradient-dark]:not([class*=bg--]):not([class*=banner--stacked]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--black] [class*=banner--gradient-light][class*=bg--black]:not([class*=banner--stacked]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=banner--gradient-dark]:not([class*=bg--]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:#fff}}[class*=bg--gold] [class*=banner--gradient-dark] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:var(--brand-secondary)}@media (min-width: 768px){[class*=bg--gold] [class*=banner--gradient-dark] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:#fff}}[class*=bg--gold] [class*=banner--gradient-dark][class*=bg--gold] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--gold] [class*=banner--gradient-dark][class*=bg--gray] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--gold] [class*=banner--gradient-dark][class*=bg--white] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--black] [class*=banner--gradient-light]:not([class*=banner--stacked]) .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--white] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--gold] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990],[class*=bg--gray] .banner__pre-title.headline.headline--highlight span[data-v-0c6fc990]{color:var(--brand-secondary)}.banner__pre-title.headline--large[data-v-0c6fc990]{font-size:1.6rem;font-size:clamp(1.2rem,.9014vw + .862rem,1.6rem)}.banner__pre-title.headline--medium[data-v-0c6fc990]{font-size:1.4rem;font-size:clamp(1.2rem,.4507vw + 1.031rem,1.4rem)}.banner__pre-title.headline--small[data-v-0c6fc990]{font-size:1.4rem}.banner__stacked[class*=banner--gradient-dark] .banner__pre-title.headline--highlight span[data-v-0c6fc990]{color:var(--brand-secondary)}[class*=bg--black] .banner__stacked[class*=banner--gradient-dark] .banner__pre-title.headline--highlight span[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){.banner__stacked[class*=banner--gradient-dark] .banner__pre-title.headline--highlight span[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}}.banner__content[data-v-0c6fc990]{padding:1.25rem}@media (min-width: 768px){.banner__content[data-v-0c6fc990]{padding:2rem 0}}.banner__content>*[data-v-0c6fc990]{flex-basis:100%}@media (min-width: 84.375em){.banner__content[data-v-0c6fc990]{padding:2rem 0 1.25rem}}.banner__text[data-v-0c6fc990]{z-index:1;color:#fff}.banner__text blockquote[data-v-0c6fc990]{margin-left:0}.banner__text a[data-v-0c6fc990]{color:#fff}.banner__text p[data-v-0c6fc990]{line-height:1.5;margin-top:0;color:#fff;text-shadow:0 1px 1px #000}@media (min-width: 768px){.banner__text p[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}}.banner__text p a[data-v-0c6fc990]{position:relative;z-index:1;color:#fff}[class*=bg--gray] .banner[class*=banner--gradient-dark]:not([class*=bg-]):not([class*=banner--stacked]) .banner__text a[data-v-0c6fc990],[class*=bg--gold] .banner[class*=banner--gradient-dark]:not([class*=bg-]):not([class*=banner--stacked]) .banner__text a[data-v-0c6fc990],[class*=bg--white] .banner[class*=banner--gradient-dark]:not([class*=bg-]):not([class*=banner--stacked]) .banner__text a[data-v-0c6fc990]{color:#fff}.banner[class*=bg--black] .banner__text p[data-v-0c6fc990]{color:#fff}[class*=bg--gold] .banner[class*=banner--gradient-light]:not([class*=bg-]) .banner__text blockquote[data-v-0c6fc990]{border-left-color:var(--brand-primary)}.banner[class*=bg--gray] .banner__text[data-v-0c6fc990],.banner[class*=bg--gray] .banner__text a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner[class*=bg--gray] .banner__text p[data-v-0c6fc990]{color:var(--brand-secondary);font-weight:400;text-shadow:none}.banner[class*=bg--gray] .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner[class*=bg--gold] .banner__text[data-v-0c6fc990],.banner[class*=bg--white] .banner__text[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .banner__text[data-v-0c6fc990]{color:var(--brand-secondary)}.banner[class*=bg--gold] .banner__text p[data-v-0c6fc990],.banner[class*=bg--white] .banner__text p[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .banner__text p[data-v-0c6fc990]{color:var(--brand-secondary);font-weight:400;text-shadow:none}.banner[class*=bg--gold] .banner__text p a[data-v-0c6fc990],.banner[class*=bg--white] .banner__text p a[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner[class*=bg--gold] .banner__text a[data-v-0c6fc990],.banner[class*=bg--white] .banner__text a[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .banner__text a[data-v-0c6fc990]{color:var(--brand-secondary)}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text[data-v-0c6fc990]{color:var(--brand-secondary)}}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text a[data-v-0c6fc990]{color:var(--brand-secondary)}}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text p[data-v-0c6fc990]{color:var(--brand-secondary)}}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}}.banner--stacked .banner__text[data-v-0c6fc990]{color:var(--brand-secondary)}@media (min-width: 768px){.banner--stacked .banner__text[data-v-0c6fc990]{color:#fff}}.banner--stacked .banner__text a[data-v-0c6fc990]{color:var(--brand-secondary)}@media (min-width: 768px){.banner--stacked .banner__text a[data-v-0c6fc990]{color:#fff}}.banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p[data-v-0c6fc990]{color:var(--brand-secondary);text-shadow:none}[class*=bg--black] .banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){.banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}}.banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}@media (min-width: 768px){.banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p a[data-v-0c6fc990]{color:#fff}}[class*=bg--black] .banner--stacked[class*=banner--gradient-dark]:not([class*=bg--]) .banner__text p a[data-v-0c6fc990]{color:#fff}[class*=bg--gold] .banner--stacked[class*=banner--gradient-light]:not([class*=bg--]) .banner__text blockquote[data-v-0c6fc990]{border-left-color:#fff}@media (min-width: 768px){[class*=bg--gold] .banner--stacked[class*=banner--gradient-light]:not([class*=bg--]) .banner__text blockquote[data-v-0c6fc990]{border-left-color:var(--brand-primary)}}[class*=bg--gold] .banner--stacked[class*=banner--gradient-light]:not([class*=bg--black]) .banner__text p[data-v-0c6fc990]{color:var(--brand-secondary)}[class*=bg--gold] .banner--stacked[class*=banner--gradient-light]:not([class*=bg--black]) .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner--stacked[class*=bg--black][data-v-0c6fc990]{display:flex}.banner--stacked[class*=bg--black] .banner__text[data-v-0c6fc990],.banner--stacked[class*=bg--black] .banner__text a[data-v-0c6fc990],.banner--stacked[class*=bg--black] .banner__text p[data-v-0c6fc990],.banner--stacked[class*=bg--black] .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner--stacked .banner__text[data-v-0c6fc990],[class*=bg--black] .banner--stacked .banner__text a[data-v-0c6fc990]{color:#fff}[class*=bg--black] .banner--stacked[class*=bg--white] .banner__text[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gray] .banner__text[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gold] .banner__text[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--white] .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gray] .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gold] .banner__text a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--white] .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gray] .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gold] .banner__text p[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--white] .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gray] .banner__text p a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=bg--gold] .banner__text p a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner__image[data-v-0c6fc990]{overflow:visible}.banner__image img[data-v-0c6fc990]{display:block;width:100%;-o-object-fit:cover;object-fit:cover;position:absolute;height:100%;top:0}.banner--stacked .banner__image img[data-v-0c6fc990]{position:relative}@media (min-width: 768px){.banner--stacked .banner__image img[data-v-0c6fc990]{position:absolute}}.banner .media--video .video-controls[data-v-0c6fc990]{z-index:2}.banner .media--video[data-v-0c6fc990]{height:100%;width:100%;top:0;position:absolute}.banner .media--video video[data-v-0c6fc990]{overflow:visible;display:block;width:100%;-o-object-fit:cover;object-fit:cover;height:100%;top:0}@media (min-width: 768px){.banner .media--video video[data-v-0c6fc990]{position:absolute}}.banner .media--video .video-controls[data-v-0c6fc990]{position:absolute;left:1.25rem;bottom:1.25rem}@media (min-width: 84.375em){.banner .media--video .video-controls[data-v-0c6fc990]{left:3rem;bottom:3rem}}@media (min-width: 84.375em){.banner--horizontal-left.banner--vertical-bottom .banner .media--video .video-controls[data-v-0c6fc990]{bottom:1.5rem;left:1.5rem}}.banner .media--video .video-btn[data-v-0c6fc990]{display:none;width:40px;height:40px;cursor:pointer;color:var(--brand-secondary);border:1px solid white;border-radius:50%;background:white;font-size:1rem;padding:0}@media (min-width: 768px){.banner .media--video .video-btn[data-v-0c6fc990]{display:block}}.banner .media--video .video-btn[data-v-0c6fc990]:after{content:"";-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:inline-block;font-style:normal;font-variant:normal;text-rendering:auto;line-height:1;font-family:"Font Awesome 5 Free";font-weight:900;font-size:1rem}.banner .media--video .video-btn.video-btn__play[data-v-0c6fc990]:after{margin-left:3px}.banner .media--video .video-btn.video-btn__pause[data-v-0c6fc990]:after{content:""}@media (hover: none),(hover: on-demand){.banner .media--video .video-btn[data-v-0c6fc990]{display:none}}.banner[class*=banner--gradient-light] .media--video .video-btn[data-v-0c6fc990]{border:1px solid var(--brand-secondary)}.banner--stacked .media--video[data-v-0c6fc990]{position:relative}@media (min-width: 768px){.banner--stacked .media--video[data-v-0c6fc990]{position:absolute}}.banner--stacked .media--video .video-btn[data-v-0c6fc990]{display:block}@media (min-width: 768px){.banner.banner--horizontal-left.banner--vertical-bottom .media--video+.banner__container .banner__content[data-v-0c6fc990]{padding-bottom:4.25rem}}.banner--stacked[data-v-0c6fc990]{display:block}@media (min-width: 768px){.banner--stacked[data-v-0c6fc990]{display:flex}}.banner[data-v-0c6fc990]:after{position:absolute;top:0;left:0;display:block;width:100%;height:100%;content:"";-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;will-change:opacity}@media (min-width: 768px){.banner.banner--gradient-dark[data-v-0c6fc990]:not([class*=bg-]){background:var(--brand-secondary)}}.banner.banner--gradient-dark[data-v-0c6fc990]:not([class*=bg-]):not([class*=banner--stacked]){background:var(--brand-secondary)}.banner--gradient-left[class*=banner--stacked][data-v-0c6fc990]:after{background:none;width:auto;height:auto}@media (min-width: 768px){.banner--gradient-left[class*=banner--stacked][data-v-0c6fc990]:after{width:100%;height:100%;background:linear-gradient(90deg,rgba(0,0,0,.86) 0,rgba(0,0,0,.23) 65%,transparent)}}.banner--gradient-left[data-v-0c6fc990]:after{background:rgba(0,0,0,.5)}@media (min-width: 768px){.banner--gradient-left[data-v-0c6fc990]:after{background:linear-gradient(90deg,rgba(0,0,0,.86) 0,rgba(0,0,0,.23) 65%,transparent)}}.banner--gradient-left.banner--gradient-light[class*=banner--stacked][data-v-0c6fc990]:after{background:none;width:auto;height:auto}@media (min-width: 768px){.banner--gradient-left.banner--gradient-light[class*=banner--stacked][data-v-0c6fc990]:after{width:100%;height:100%;background:linear-gradient(90deg,#fff 1%,hsla(0,0%,100%,.92) 32%,hsla(0,0%,100%,0))}}.banner--gradient-left.banner--gradient-light[data-v-0c6fc990]:after{background:rgba(255,255,255,.7)}@media (min-width: 768px){.banner--gradient-left.banner--gradient-light[data-v-0c6fc990]:after{background:linear-gradient(90deg,#fff 1%,hsla(0,0%,100%,.92) 32%,hsla(0,0%,100%,0))}}.banner--gradient-left.banner--gradient-light[class*=bg-][data-v-0c6fc990]:after{background:none}.banner--gradient-left[class*=bg-][data-v-0c6fc990]:after{background:none}.banner--gradient-bottom[class*=banner--stacked][data-v-0c6fc990]:after{background:none;width:auto;height:auto}@media (min-width: 768px){.banner--gradient-bottom[class*=banner--stacked][data-v-0c6fc990]:after{width:100%;height:100%;background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,.65) 70%)}}.banner--gradient-bottom[data-v-0c6fc990]:after{background:rgba(0,0,0,.5)}@media (min-width: 768px){.banner--gradient-bottom[data-v-0c6fc990]:after{background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgba(0,0,0,.65) 70%)}}.banner--gradient-bottom.banner--gradient-light[class*=banner--stacked][data-v-0c6fc990]:after{background:none;width:auto;height:auto}@media (min-width: 768px){.banner--gradient-bottom.banner--gradient-light[class*=banner--stacked][data-v-0c6fc990]:after{width:100%;height:100%;background:linear-gradient(180deg,transparent 0,hsla(0,0%,100%,.9) 55%)}}.banner--gradient-bottom.banner--gradient-light[data-v-0c6fc990]:after{background:rgba(255,255,255,.7)}@media (min-width: 768px){.banner--gradient-bottom.banner--gradient-light[data-v-0c6fc990]:after{background:linear-gradient(180deg,transparent 0,hsla(0,0%,100%,.9) 55%)}}.banner--gradient-bottom.banner--gradient-light[class*=bg-][data-v-0c6fc990]:after{background:none}.banner--transparent[data-v-0c6fc990]:after{background:none}.banner[class*=bg-][data-v-0c6fc990]:after{background:inherit}.banner .headline[data-v-0c6fc990]{z-index:1;margin-top:0;margin-bottom:1rem}.banner .headline a[data-v-0c6fc990]:hover{text-decoration:none}.banner .headline a[data-v-0c6fc990]:focus{text-decoration:underline}.banner .headline--negative[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}@media (min-width: 768px){.banner .headline--negative[data-v-0c6fc990]{color:#fff}}@media (min-width: 768px){.banner .headline--negative a[data-v-0c6fc990]{color:#fff}}.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--large,.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--large.headline--serif{font-size:4.7rem;font-size:clamp(2.5rem,4.9577vw + .6408rem,4.7rem)}.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--medium,.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--medium.headline--serif{font-size:3.7rem;font-size:clamp(2.2rem,3.3803vw + .9324rem,3.7rem)}.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--small,.banner :where(h2[data-v-0c6fc990],h3,h4,h5,h6).headline--small.headline--serif{font-size:2.7rem;font-size:clamp(2rem,1.5775vw + 1.4085rem,2.7rem)}.banner--stacked[class*=banner--gradient-dark][class*=bg--black] .headline--negative[data-v-0c6fc990]{color:#fff}[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--gray] .headline--negative[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--gray] .headline--negative.headline--uppercase[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--white] .headline--negative[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--white] .headline--negative.headline--uppercase[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--gray] .headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--gray] .headline--negative.headline--uppercase a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--white] .headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner--stacked[class*=banner--gradient-dark][class*=bg--white] .headline--negative.headline--uppercase a[data-v-0c6fc990],.banner--stacked[class*=banner--gradient-dark] .headline--negative[data-v-0c6fc990]{color:var(--brand-secondary);text-shadow:none}@media (min-width: 768px){.banner--stacked[class*=banner--gradient-dark] .headline--negative[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}}.banner--stacked[class*=banner--gradient-dark] .headline--negative a[data-v-0c6fc990]{color:var(--brand-secondary)}@media (min-width: 768px){.banner--stacked[class*=banner--gradient-dark] .headline--negative a[data-v-0c6fc990]{color:#fff}}[class*=bg--black] .banner--stacked[class*=banner--gradient-dark] .headline--negative[data-v-0c6fc990]{color:#fff;text-shadow:0 1px 1px #000}@media (min-width: 768px){[class*=bg--black] .banner--stacked[class*=banner--gradient-dark] .headline--negative[data-v-0c6fc990]{color:#fff}}[class*=bg--black] .banner--stacked[class*=banner--gradient-dark] .headline--negative a[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner--stacked[class*=banner--gradient-dark] .headline--negative a[data-v-0c6fc990]{color:#fff}}.banner[class*=bg--gray] .headline--negative[data-v-0c6fc990]{color:var(--brand-secondary);text-shadow:none}.banner[class*=bg--gray] .headline--negative a[data-v-0c6fc990]{color:var(--brand-secondary)}.banner[class*=bg--black] .headline--negative a[data-v-0c6fc990]{color:#fff}.banner[class*=bg--gold] .headline.headline--negative[data-v-0c6fc990],.banner[class*=bg--white] .headline.headline--negative[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990]{color:var(--brand-secondary);text-shadow:none}.banner[class*=bg--gold] .headline.headline--negative a[data-v-0c6fc990],.banner[class*=bg--white] .headline.headline--negative a[data-v-0c6fc990],.banner[class*=banner--gradient-light]:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990]{color:var(--brand-secondary)}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .headline.headline--negative[data-v-0c6fc990]{color:var(--brand-secondary)}}[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990]{color:#fff}@media (min-width: 768px){[class*=bg--black] .banner[class*=bg--gold].banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner[class*=bg--white].banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990],[class*=bg--black] .banner[class*=banner--gradient-light]:not([class*=bg-]).banner--stacked:not([class*=bg-]) .headline.headline--negative a[data-v-0c6fc990]{color:var(--brand-secondary)}}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.banner[data-v-0c6fc990]{display:flex;justify-content:center;align-items:center;height:100%}.banner__container[data-v-0c6fc990]{align-items:center;display:flex;justify-content:center;height:100%}.banner .media--video[data-v-0c6fc990],.banner__image img[data-v-0c6fc990]{left:0}.banner .banner__container[data-v-0c6fc990]{min-height:18rem}}@media (-ms-high-contrast: none) and (min-width: 768px),(-ms-high-contrast: active) and (min-width: 768px){.banner.banner--large .banner__container[data-v-0c6fc990]{min-height:33rem}}@media (-ms-high-contrast: none) and (min-width: 980px),(-ms-high-contrast: active) and (min-width: 980px){.banner.banner--large .banner__container[data-v-0c6fc990]{min-height:48rem}}@media (-ms-high-contrast: none) and (min-width: 768px),(-ms-high-contrast: active) and (min-width: 768px){.banner.banner--medium .banner__container[data-v-0c6fc990]{min-height:33rem}}[class*=bg--gray] [class*=banner--gradient-dark] :where(p[data-v-0c6fc990],ul,ol,dl,cite,tbody,figcaption) a:not(.bttn),[class*=bg--white] [class*=banner--gradient-dark] :where(p[data-v-0c6fc990],ul,ol,dl,cite,tbody,figcaption) a:not(.bttn){color:inherit}
`, Do = {
  key: 0,
  class: "banner__image"
}, Qo = ["src"], qo = { class: "banner__container" }, $o = { class: "banner__content" }, el = /* @__PURE__ */ he({
  __name: "Banner",
  props: {
    title: { type: String },
    image: { type: String },
    url: { type: String },
    text: { type: String },
    button_text: {
      type: String
    },
    // @todo Determine how best to handle these fields going forward.
    overlay_color: {
      type: String,
      default: "gradient-dark"
    },
    overlay_to: {
      type: String,
      default: "gradient-bottom"
    },
    ...Ke.props
    // size?: string
    // classes?: string
    // vertical_alignment?: string
    // horizontal_alignment?: string
    // title_classes?: string
    // button_link?: string
    // button_text?: string
  },
  setup(e) {
    const t = e, a = X(() => {
      let i = ["banner"];
      return ["overlay_color", "overlay_to", "size", "vertical_alignment", "horizontal_alignment"].forEach((r) => {
        t[r] === !0 && i.push(`banner--${ce(r)}`);
      }), Ke.addBackgroundClass(i, t), t.url && i.push("click-container"), i;
    }), n = X(() => {
      if (t.title) {
        let i = {
          level: "h2",
          classes: "headline"
        };
        return t.headline_settings && Array.prototype.forEach.call(["level", "class"], (r) => {
          t.headline_settings[r] && (i[r] = t.headline_settings[r]);
        }), i;
      }
      return {};
    });
    return (i, r) => (j(), C("div", {
      class: H(a.value)
    }, [
      e.image ? (j(), C("div", Do, [
        N("img", {
          src: e.image,
          alt: "",
          loading: "lazy"
        }, null, 8, Qo)
      ])) : ee("", !0),
      N("div", qo, [
        N("div", $o, [
          U(i.$slots, "headline", {}, () => [
            e.title ? (j(), et(la, {
              key: 0,
              level: n.value.level,
              class: H(n.value.classes),
              href: e.url
            }, {
              default: Ce(() => [
                be(bt(e.title), 1)
              ]),
              _: 1
            }, 8, ["level", "class", "href"])) : ee("", !0)
          ], !0),
          U(i.$slots, "default", {}, void 0, !0),
          e.url && e.button_text ? (j(), et(ca, {
            key: 0,
            href: e.url,
            class: "bttn--secondary bttn--caps",
            arrow: !0
          }, {
            default: Ce(() => [
              be(bt(e.button_text), 1)
            ]),
            _: 1
          }, 8, ["href"])) : ee("", !0)
        ])
      ])
    ], 2));
  }
}), tl = /* @__PURE__ */ pe(el, [["styles", [Po]], ["__scopeId", "data-v-0c6fc990"]]);
const al = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABe0AAAH5CAYAAAAcKhX0AAAACXBIWXMAAC4jAAAuIwF4pT92AAAFGmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjAtMDUtMjJUMTU6MTQ6MTUtMDU6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIwLTA1LTIyVDE2OjExOjQ1LTA1OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTA1LTIyVDE2OjExOjQ1LTA1OjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ4MGM5M2NiLTc1NGMt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", nl = `.logo[data-v-2aefc810]{display:block}.logo--tab[data-v-2aefc810]{height:70px;width:109px;padding:25px 1.25rem;background:var(--brand-secondary)}.logo--tab a:focus svg[data-v-2aefc810]{opacity:.5}.search-is-open .logo--tab[data-v-2aefc810]{visibility:none;opacity:0}@media (min-width: 980px){.search-is-open .logo--tab[data-v-2aefc810]{display:block;opacity:1;visibility:visible}}@media (min-width: 980px){.logo--tab[data-v-2aefc810]{width:154px;height:80px;padding:25px}}@media (min-width: 84.375em){.logo--tab[data-v-2aefc810]{width:188px;height:90px;padding:23px 20px}}.logo-icon[data-v-2aefc810]{fill:var(--brand-primary);height:20px}@media (min-width: 980px){.logo-icon[data-v-2aefc810]{height:30px}}@media (min-width: 84.375em){.logo-icon[data-v-2aefc810]{height:43px}}.logo-icon[data-v-2aefc810]:hover,.logo-icon[data-v-2aefc810]:focus{opacity:.7}.header--tertiary .logo-icon[data-v-2aefc810]{margin-left:0}@media (min-width: 84.375em){.header--tertiary .logo-icon[data-v-2aefc810]{margin-top:0}}
`, jt = (e) => (an("data-v-2aefc810"), e = e(), nn(), e), il = { class: "logo logo--tab" }, rl = ["href"], sl = /* @__PURE__ */ jt(() => /* @__PURE__ */ N("div", { class: "element-invisible" }, "The University of Iowa", -1)), ol = ["aria-labelledby"], ll = /* @__PURE__ */ jt(() => /* @__PURE__ */ N("path", {
  class: "st0",
  d: "M40 18.8h-7.3v52.4H40v19H0v-19h7.3V18.8H0V0h40V18.8z"
}, null, -1)), cl = /* @__PURE__ */ jt(() => /* @__PURE__ */ N("path", {
  class: "st0",
  d: "M93.8 90.2h-29c-10.5 0-17.4-6.9-17.4-18.2V18.2C47.4 7 54.4 0 64.8 0h29c10.5 0 17.4 7 17.4 18.2V72C111.2 83.2 104.2 90.2 93.8 90.2zM85.6 71.2V18.8H73v52.4H85.6z"
}, null, -1)), dl = /* @__PURE__ */ jt(() => /* @__PURE__ */ N("path", {
  class: "st0",
  d: "M122.6 18.8h-6.4V0h38v18.9H147l6.5 43.4L167 0h19.2l14.4 62.3 5.2-43.4h-6.6V0h37.5v18.9h-6.2l-11.3 71.4h-30.6l-11.8-53.2 -12.1 53.1h-29.4L122.6 18.8z"
}, null, -1)), bl = /* @__PURE__ */ jt(() => /* @__PURE__ */ N("path", {
  class: "st0",
  d: "M230.1 71.2h6.9L250.7 0h41l13.5 71.2h6.4v19H281l-2.9-22h-15.2l-2.7 22h-30L230.1 71.2 230.1 71.2zM276.5 51.7l-5.8-36.4 -6 36.4H276.5z"
}, null, -1)), fl = ["src"], ul = ["id"], gl = /* @__PURE__ */ he({
  __name: "Logo",
  props: {
    id: {
      type: String,
      default: "logo"
    },
    link: {
      type: String,
      default: "https://uiowa.edu"
    }
  },
  setup(e) {
    return (t, a) => (j(), C("div", il, [
      N("a", { href: e.link }, [
        sl,
        (j(), C("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          class: "logo-icon",
          "aria-labelledby": e.id,
          role: "img",
          viewBox: "0 0 311.6 90.2"
        }, [
          ll,
          cl,
          dl,
          bl,
          N("image", { src: mi(al) }, [
            N("title", { id: e.id }, "University of Iowa", 8, ul)
          ], 8, fl)
        ], 8, ol))
      ], 8, rl)
    ]));
  }
}), Di = /* @__PURE__ */ pe(gl, [["styles", [nl]], ["__scopeId", "data-v-2aefc810"]]), hl = `.site-name[data-v-ddcd4d24]{display:flex;align-items:center;margin:0 auto 0 0;text-align:left;font-size:1.8rem;font-weight:300;line-height:1;font-family:Roboto,sans-serif}.site-name a[data-v-ddcd4d24]{color:var(--brand-secondary);text-decoration:none}@media (min-width: 980px){.site-name[data-v-ddcd4d24]{flex-basis:content;margin:1px 0 0;font-size:2rem}}@media (min-width: 84.375em){.site-name[data-v-ddcd4d24]{margin:5px 0 0;text-align:left;font-size:2.2rem}}@media (min-width: 980px){.search-is-open .header--secondary .site-name[data-v-ddcd4d24]{display:none}}.parent-site-name[data-v-ddcd4d24]{font-weight:300;flex-basis:content;margin:0 0 -10px;padding:1.05rem 0 0 1.25rem;width:100%;background:var(--brand-primary)}@media (min-width: 980px){.o-canvas--lock .parent-site-name[data-v-ddcd4d24]{background:transparent}}.parent-site-name a[data-v-ddcd4d24]{color:var(--brand-secondary);text-decoration:none}@media (min-width: 980px){.parent-site-name[data-v-ddcd4d24]{background:transparent;display:flex;align-items:center;margin:0;padding:1px 0 0;width:auto}}.iowa-bar[data-v-ddcd4d24]{position:relative;z-index:2;display:block;min-height:auto;background:var(--brand-secondary)}@media (min-width: 980px){.iowa-bar[data-v-ddcd4d24]{min-height:80px;background:var(--brand-primary)}}@media (min-width: 980px){.iowa-bar[data-v-ddcd4d24]:not(.iowa-bar--narrow){height:80px}}.iowa-bar .logo--tab[data-v-ddcd4d24]{margin-right:20px}@media (min-width: 84.375em){.iowa-bar .logo--tab[data-v-ddcd4d24]{margin-left:-12px;padding:27px 20px 20px}}.iowa-bar .site-name[data-v-ddcd4d24]{width:100%;padding:1.25rem;background:var(--brand-primary)}@media (min-width: 980px){.iowa-bar .site-name[data-v-ddcd4d24]{width:auto;background:transparent;padding:0}}@media (min-width: 84.375em){.iowa-bar .site-name[data-v-ddcd4d24]{margin:5px 0 0}}.iowa-bar__container[data-v-ddcd4d24]{max-width:81.875em;flex-wrap:wrap;justify-content:space-between;margin:0 auto}@media (min-width: 980px){.iowa-bar__container[data-v-ddcd4d24]{justify-content:flex-start;display:flex}}@media (min-width: 980px){.iowa-bar__container[data-v-ddcd4d24]{margin-right:auto;margin-left:auto}}@media (min-width: 84.375em){.iowa-bar--narrow.horizontal .iowa-bar__container[data-v-ddcd4d24],.iowa-bar--narrow.mega .iowa-bar__container[data-v-ddcd4d24]{position:relative}}@media (min-width: 980px){.iowa-bar--narrow[data-v-ddcd4d24]{min-height:50px;position:relative}}.iowa-bar--narrow .logo--tab[data-v-ddcd4d24]{margin-right:10px}@media (min-width: 980px){.iowa-bar--narrow .logo--tab[data-v-ddcd4d24]{height:56px;width:119px;padding:15px}}@media (min-width: 84.375em){.iowa-bar--narrow .logo--tab[data-v-ddcd4d24]{margin-bottom:-6px}}.search-is-open .iowa-bar--narrow .logo--tab[data-v-ddcd4d24]{visibility:none;opacity:0}@media (min-width: 980px){.search-is-open .iowa-bar--narrow .logo--tab[data-v-ddcd4d24]{display:flex;opacity:1;visibility:visible}}.iowa-bar--narrow .logo-icon[data-v-ddcd4d24]{height:20px}@media (min-width: 980px){.iowa-bar--narrow .logo-icon[data-v-ddcd4d24]{height:26px}}@media (min-width: 84.375em){.iowa-bar--narrow .parent-site-name[data-v-ddcd4d24]{padding:6px 0 0}}.iowa-bar--narrow .site-name[data-v-ddcd4d24]{font-size:1rem;margin:0;padding:1.25rem;background:var(--brand-primary)}@media (min-width: 980px){.iowa-bar--narrow .site-name[data-v-ddcd4d24]{background:transparent;font-size:1rem;padding:0}}@media (min-width: 84.375em){.iowa-bar--narrow .site-name[data-v-ddcd4d24]{padding:6px 0 0}}.iowa-bar__below[data-v-ddcd4d24]{z-index:2;border-bottom:1px solid #e6e5e5;background:#fff}.iowa-bar__below .iowa-bar__container[data-v-ddcd4d24]{flex-wrap:wrap;justify-content:space-between;margin-right:0;margin-left:0}@media (min-width: 980px){.iowa-bar__below .iowa-bar__container[data-v-ddcd4d24]{display:flex;position:unset;min-height:90px;justify-content:unset;margin-right:auto;padding-left:1.25rem}}@media (min-width: 84.375em){.iowa-bar__below .iowa-bar__container[data-v-ddcd4d24]{margin-left:auto;padding-left:0}}.iowa-bar__below .site-name[data-v-ddcd4d24]{margin:0;text-align:left;font-size:1.8rem}@media (min-width: 980px){.iowa-bar__below .site-name[data-v-ddcd4d24]{width:75%;padding:25px 20px 25px 0;background:transparent;font-size:2rem}}@media (min-width: 84.375em){.iowa-bar__below .site-name[data-v-ddcd4d24]{font-size:2.2rem}}@media (min-width: 980px){.search-is-open .iowa-bar__below .site-name[data-v-ddcd4d24]{display:none}}@media (min-width: 980px){.header-sticky .iowa-bar[data-v-ddcd4d24]{position:fixed;z-index:3;top:0;left:0;width:100%;transition:transform .4s}}@media (min-width: 980px){.header-sticky.scroll-down .iowa-bar[data-v-ddcd4d24]{transform:translate3d(0,-100%,0);overflow:hidden}}@media (min-width: 980px){.header-sticky.scroll-down .iowa-bar .logo--tab[data-v-ddcd4d24]{margin-top:-17px}}@media (min-width: 84.375em){.header-sticky.scroll-down .iowa-bar.iowa-bar--narrow .toggle-nav__bttn[data-v-ddcd4d24]{top:35px}}@media (min-width: 980px){.header-sticky.scroll-up .iowa-bar[data-v-ddcd4d24]{transform:none}}@media (min-width: 980px){.header-sticky.scroll-up:not(.menu-open) .iowa-bar[data-v-ddcd4d24]{box-shadow:0 0 10px #00000059}}
`, pl = {
  name: "uids-iowa-bar",
  components: { UidsLogo: Di },
  props: {
    /**
     * Determines whether to use the narrow version of the IOWA bar.
     */
    narrow: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, t) {
    const a = X(() => {
      let i = ["iowa-bar"];
      return (e.narrow || t.slots.second_row_content) && i.push("iowa-bar--narrow"), i;
    }), n = X(() => t.slots.parent_title && t.slots.parent_title().length || t.slots.bottom_content && t.slots.bottom_content().length);
    return {
      getClasses: a,
      showBottomBar: n
    };
  }
}, ml = { class: "iowa-bar__container" }, vl = {
  key: 0,
  class: "iowa-bar__below"
}, xl = { class: "iowa-bar__container" };
function El(e, t, a, n, i, r) {
  const s = ls("uids-logo");
  return j(), C("header", {
    class: H(n.getClasses),
    "data-uids-header": ""
  }, [
    N("div", ml, [
      le(s),
      U(e.$slots, "default", {}, void 0, !0)
    ]),
    e.$slots.second_row_content ? (j(), C("div", vl, [
      N("div", xl, [
        U(e.$slots, "second_row_content", {}, void 0, !0)
      ])
    ])) : ee("", !0)
  ], 2);
}
const yl = /* @__PURE__ */ pe(pl, [["render", El], ["styles", [hl]], ["__scopeId", "data-v-ddcd4d24"]]);
const za = [
  "small",
  "medium",
  "large"
], Oa = [
  "widescreen",
  "square",
  "circle"
], Il = {
  /**
   * Set size on the media element.
   */
  media_size: {
    type: String,
    default: "large",
    validator: function(e) {
      return za.indexOf(e) !== -1;
    }
  },
  /**
   * Set shape on the media element.
   */
  media_shape: {
    type: String,
    default: "widescreen",
    validator: function(e) {
      return Oa.indexOf(e) !== -1;
    }
  },
  /**
   * Set a border on the media element.
   */
  media_border: {
    type: Boolean,
    default: !1
  }
}, wl = {
  media_border: {
    name: "Border",
    table: {
      defaultValue: { summary: !1 },
      category: "Media"
    },
    control: "boolean"
  },
  media_shape: {
    name: "Shape",
    options: Oa,
    table: {
      defaultValue: { summary: Oa[0] },
      category: "Media"
    },
    control: "select",
    description: "The shape of the media element"
  },
  media_size: {
    name: "Size",
    options: za,
    table: {
      defaultValue: { summary: za[2] },
      category: "Media"
    },
    control: "select",
    description: "Set the size of the media element."
  }
}, Rl = (e, t) => {
  t.media_size !== "" && e.push(`media--${ce(t.media_size)}`), t.media_shape !== "" && e.push(`media--${ce(t.media_shape)}`), t.media_border && e.push("media--border");
}, Aa = {
  props: Il,
  argTypes: wl,
  addMediaClasses: Rl
}, Ga = [
  "",
  "small",
  "medium",
  "large"
], Na = [
  "",
  "left",
  "right",
  "center"
], kl = {
  /**
   * Set the alignment of an inline element.
   */
  inline_alignment: {
    type: String,
    default: "left",
    validator: function(e) {
      return Na.indexOf(e) !== -1;
    }
  },
  /**
   * Set the size of an inline element.
   */
  inline_size: {
    type: String,
    default: "",
    validator: function(e) {
      return Ga.indexOf(e) !== -1;
    }
  }
}, _l = {
  inline_alignment: {
    name: "Alignment",
    table: {
      defaultValue: { summary: Na[0] },
      category: "Display options"
    },
    options: Na,
    control: {
      type: "select",
      labels: {
        "": "full width"
      }
    }
  },
  inline_size: {
    name: "Size",
    table: {
      defaultValue: { summary: Ga[0] },
      category: "Display options"
    },
    options: Ga,
    control: {
      type: "select",
      labels: {
        "": "full width"
      }
    }
  }
}, Sl = (e, t) => {
  t.inline_size && e.push(`inline--size-${ce(t.inline_size)}`), t.inline_alignment && e.push(`inline--align-${ce(t.inline_alignment)}`);
}, Pt = {
  props: kl,
  argTypes: _l,
  addClass: Sl
}, Jl = `.border[data-v-c2c53d14]{border:1px solid;border-color:#00000020}[class*=bg--black] .border[data-v-c2c53d14]{border-color:#ffffff53}.borderless[data-v-c2c53d14]{border:none!important}.callout[data-v-c2c53d14]{--callout-spacing-lg: var(--space-lg-width-gutter);--callout-spacing-md: var(--space-md-width-gutter);--callout-spacing-sm: var(--space-sm-width-gutter);padding:var(--callout-spacing-md)}@media (min-width: 768px){.callout[data-v-c2c53d14]{padding:var(--callout-spacing-md)}.callout[class*=bg-][data-v-c2c53d14]{padding:var(--callout-spacing-lg)}}
`, Ml = /* @__PURE__ */ he({
  __name: "Callout",
  props: {
    ...Pt.props,
    ...Ke.props,
    ...Aa.props
  },
  setup(e) {
    const t = e, a = X(() => {
      let n = ["callout"];
      return Ke.addBackgroundClass(n, t), Pt.addClass(n, t), n;
    });
    return (n, i) => (j(), C("div", {
      class: H(a.value)
    }, [
      U(n.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), jl = /* @__PURE__ */ pe(Ml, [["styles", [Jl]], ["__scopeId", "data-v-c2c53d14"]]), Fl = `.border[data-v-a9b65710]{border:1px solid;border-color:#00000020}[class*=bg--black] .border[data-v-a9b65710]{border-color:#ffffff53}.borderless[data-v-a9b65710]{border:none!important}.bttn[data-v-a9b65710]{border:none;display:inline-block;align-items:center;justify-content:center;position:relative;cursor:pointer;text-align:center;text-decoration:none;text-transform:uppercase;line-height:1.4;font-family:Antonio,Antonio-fallback,sans-serif;font-size:1.25rem;padding:1rem 2rem;-webkit-font-smoothing:auto;-moz-osx-font-smoothing:auto;border:1px solid;border-color:#00000020}.bttn i[data-v-a9b65710],.bttn svg[data-v-a9b65710]{margin-left:.625rem}[class*=bg--black] .bttn[data-v-a9b65710]{border-color:#ffffff53}[class*=bg--] .bttn[data-v-a9b65710],[class*=bg--] [class*=bg--] .bttn[data-v-a9b65710]{border-color:#0000006c;color:var(--brand-secondary)}[class*=bg--black] .bttn[data-v-a9b65710]{border-color:#ffffff6c}.bttn--primary[data-v-a9b65710]{background:var(--brand-primary);border-color:var(--brand-primary);color:var(--brand-secondary)}.bttn--primary i[data-v-a9b65710],.bttn--primary svg[data-v-a9b65710],.bttn--primary span[data-v-a9b65710]{color:#fff}.bttn--primary[data-v-a9b65710]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--primary[data-v-a9b65710]:focus{text-decoration:underline}.bttn--primary[data-v-a9b65710]:hover:after,.bttn--primary[data-v-a9b65710]:focus:after{transform:translate(-50%) scaleX(1)}[class*=bg--] [class*=bg--gray] .bttn--primary[data-v-a9b65710],[class*=bg--gray] .bttn--primary[data-v-a9b65710],[class*=bg--] [class*=bg--white] .bttn--primary[data-v-a9b65710],[class*=bg--white] .bttn--primary[data-v-a9b65710]{border-color:var(--brand-primary)}.bttn--primary[data-v-a9b65710]:after{background-color:var(--brand-secondary)}.bttn--secondary[data-v-a9b65710]{color:#fff;background:var(--brand-secondary)}.bttn--secondary i[data-v-a9b65710],.bttn--secondary svg[data-v-a9b65710],.bttn--secondary span[data-v-a9b65710]{color:var(--brand-primary)}.bttn--secondary[data-v-a9b65710]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--secondary[data-v-a9b65710]:focus{text-decoration:underline}.bttn--secondary[data-v-a9b65710]:hover:after,.bttn--secondary[data-v-a9b65710]:focus:after{transform:translate(-50%) scaleX(1)}.bttn--secondary__light[data-v-a9b65710]{color:#fff}[class*=bg--] .bttn--secondary[data-v-a9b65710],[class*=bg--] [class*=bg--] .bttn--secondary[data-v-a9b65710]{border-color:#ffffff6c;color:#fff}.bttn--tertiary[data-v-a9b65710]{color:var(--brand-secondary);background:#fff}.bttn--tertiary i[data-v-a9b65710],.bttn--tertiary svg[data-v-a9b65710],.bttn--tertiary span[data-v-a9b65710]{color:var(--brand-primary)}.bttn--tertiary[data-v-a9b65710]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--tertiary[data-v-a9b65710]:focus{text-decoration:underline}.bttn--tertiary[data-v-a9b65710]:hover:after,.bttn--tertiary[data-v-a9b65710]:focus:after{transform:translate(-50%) scaleX(1)}.bttn--transparent[data-v-a9b65710]{background:transparent;color:var(--brand-secondary)}.bttn--transparent i[data-v-a9b65710],.bttn--transparent svg[data-v-a9b65710],.bttn--transparent span[data-v-a9b65710]{color:var(--brand-primary)}.bttn--transparent[data-v-a9b65710]:after{content:"";position:absolute;left:50%;bottom:0;width:100%;height:4px;background-color:var(--brand-primary);transform-origin:center;transform:translate(-50%) scaleX(0);transition:transform .3s ease-in-out}.bttn--transparent[data-v-a9b65710]:focus{text-decoration:underline}.bttn--transparent[data-v-a9b65710]:hover:after,.bttn--transparent[data-v-a9b65710]:focus:after{transform:translate(-50%) scaleX(1)}[class*=bg--black] .bttn--transparent[data-v-a9b65710],[class*=bg--] [class*=bg--black] .bttn--transparent[data-v-a9b65710]{color:#fff;border-color:#ffffff6c}[class*=bg--gold] .bttn--transparent i[data-v-a9b65710],[class*=bg--white] [class*=bg--gold] .bttn--transparent i[data-v-a9b65710],[class*=bg--gold] .bttn--transparent span[data-v-a9b65710],[class*=bg--white] [class*=bg--gold] .bttn--transparent span[data-v-a9b65710],[class*=bg--gold] .bttn--transparent svg[data-v-a9b65710],[class*=bg--white] [class*=bg--gold] .bttn--transparent svg[data-v-a9b65710]{color:#fff}[class*=bg--white] .bttn--transparent i[data-v-a9b65710],[class*=bg--gold] [class*=bg--white] .bttn--transparent i[data-v-a9b65710],[class*=bg--gold] [class*=bg--gray] .bttn--transparent i[data-v-a9b65710],[class*=bg--white] .bttn--transparent span[data-v-a9b65710],[class*=bg--gold] [class*=bg--white] .bttn--transparent span[data-v-a9b65710],[class*=bg--gold] [class*=bg--gray] .bttn--transparent span[data-v-a9b65710],[class*=bg--white] .bttn--transparent svg[data-v-a9b65710],[class*=bg--gold] [class*=bg--white] .bttn--transparent svg[data-v-a9b65710],[class*=bg--gold] [class*=bg--gray] .bttn--transparent svg[data-v-a9b65710]{color:var(--brand-primary)}[class*=bg--black] [class*=bg--white] .bttn--transparent[data-v-a9b65710],[class*=bg--black] [class*=bg--gray] .bttn--transparent[data-v-a9b65710],[class*=bg--black] [class*=bg--gold] .bttn--transparent[data-v-a9b65710]{color:var(--brand-secondary)}.bttn.borderless.bttn--transparent[data-v-a9b65710]:focus,.bttn.borderless.bttn--transparent[data-v-a9b65710]:hover{text-decoration:underline}.bttn.borderless.bttn--transparent[data-v-a9b65710]:after{display:none}.bttn--no-text i[data-v-a9b65710],.bttn--no-text span[data-v-a9b65710],.bttn--no-text svg[data-v-a9b65710]{margin-left:0}.bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],.bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],.bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710]{color:var(--brand-secondary)}[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--] [class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710],[class*=bg--black] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710]{color:#fff}[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) i[data-v-a9b65710],[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) span[data-v-a9b65710],[class*=bg--] [class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710],[class*=bg--white] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710],[class*=bg--] [class*=bg--gray] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710],[class*=bg--] [class*=bg--gold] .bttn--no-text:not([class*=bttn--secondary]) svg[data-v-a9b65710]{color:var(--brand-secondary)}.bttn--no-text.bttn--transparent.bttn--secondary i[data-v-a9b65710],.bttn--no-text.bttn--transparent.bttn--secondary span[data-v-a9b65710],.bttn--no-text.bttn--transparent.bttn--secondary svg[data-v-a9b65710]{color:var(--brand-secondary)}.bttn--circle[data-v-a9b65710]{padding:.55rem .7em;border-radius:50%;transform:none;line-height:1}.bttn--circle[data-v-a9b65710]:after{left:0;top:0;height:100%;width:100%;border-radius:50%;background-color:transparent;transition:border-color .3s ease-in-out;transform:none;position:absolute}.bttn--circle[data-v-a9b65710]:hover:after,.bttn--circle[data-v-a9b65710]:focus:after{transform:none;transition:none;border:3px solid;border-color:inherit;background-color:transparent}.bttn--large[data-v-a9b65710]{padding:1.5rem 2.5rem;font-size:1.45rem}.bttn--small[data-v-a9b65710]{padding:.6rem 1rem;font-size:1.05rem}.bttn--full[data-v-a9b65710]{display:flex}.bttn--caps[data-v-a9b65710]{text-transform:uppercase;font-family:Antonio,Antonio-fallback,sans-serif}.bttn--lowercase[data-v-a9b65710]{text-transform:none;letter-spacing:0;font-size:1rem}.bttn--light-font[data-v-a9b65710]{font-family:Roboto,sans-serif;font-weight:400;font-size:.9rem;letter-spacing:.04rem;display:inline-block}.bttn--light-font[data-v-a9b65710]:focus{text-decoration:underline}.bttn--light-font i[data-v-a9b65710],.bttn--light-font span[data-v-a9b65710]{font-size:.9rem}.bttn--light-font.bttn--full[data-v-a9b65710]{display:flex;height:100%}
`, Bl = {
  key: 0,
  class: "fas fa-arrow-right"
}, Yl = /* @__PURE__ */ he({
  __name: "PseudoButton",
  props: {
    color: {
      type: String,
      default: "primary",
      validator: function(e) {
        return ["primary", "secondary", "tertiary", "link"].indexOf(e) !== -1;
      }
    },
    size: {
      type: String,
      default: "medium",
      validator: function(e) {
        return ["small", "medium", "large"].indexOf(e) !== -1;
      }
    },
    arrow: {
      type: Boolean,
      default: !0
    },
    outline: {
      type: Boolean,
      default: !1
    },
    font: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, a = X(() => ({
      bttn: !0,
      "bttn--primary": t.color === "primary",
      "bttn--secondary": t.color === "secondary",
      "bttn--tertiary": t.color === "tertiary",
      "bttn--link": t.color === "link",
      "bttn--outline": t.outline,
      "bttn--font-serif": t.font === "serif",
      "bttn--font-sans-serif": t.font === "sans-serif",
      "bttn--small": t.size === "small",
      "bttn--medium": t.size === "medium",
      "bttn--large": t.size === "large"
    }));
    return (n, i) => (j(), C("div", {
      class: H(a.value)
    }, [
      U(n.$slots, "default", {}, void 0, !0),
      e.arrow ? (j(), C("i", Bl)) : ee("", !0)
    ], 2));
  }
}), Tl = /* @__PURE__ */ pe(Yl, [["styles", [Fl]], ["__scopeId", "data-v-a9b65710"]]);
const Cl = 2;
class zl {
  constructor(t, a) {
    let n, i, r, s;
    for (s = 0; s < a.length && (r = t.querySelector(a[s]), !r); s++)
      ;
    r && (t.style.cursor = "pointer", t.onmousedown = (l) => {
      this.ignoreClick(l) || (i = +/* @__PURE__ */ new Date());
    }, t.onmouseup = (l) => {
      this.ignoreClick(l) || (n = +/* @__PURE__ */ new Date(), n - i < 200 && r.click());
    });
  }
  ignoreClick(t) {
    return t.button === Cl || ["A", "BUTTON"].indexOf(t.target.nodeName) !== -1;
  }
}
function Ol(e, t = [".click-target"]) {
  const a = document.querySelectorAll(e);
  Array.prototype.forEach.call(a, (n) => {
    new zl(n, t);
  });
}
const Al = `.border[data-v-02b6a701]{border:1px solid;border-color:#00000020}[class*=bg--black] .border[data-v-02b6a701]{border-color:#ffffff53}.borderless[data-v-02b6a701]{border:none!important}.card[data-v-02b6a701]{position:relative;flex-direction:row;flex-grow:1;padding:2rem;text-decoration:none;border:1px solid;border-color:#00000020;display:flex;flex:1 1 0%;flex-direction:column}[class*=bg--black] .card[data-v-02b6a701]{border-color:#ffffff53}.card h2[data-v-02b6a701]:not(:first-child),.card h3[data-v-02b6a701]:not(:first-child),.card h4[data-v-02b6a701]:not(:first-child),.card h5[data-v-02b6a701]:not(:first-child),.card h6[data-v-02b6a701]:not(:first-child){margin-top:0}.card ul[data-v-02b6a701],.card ol[data-v-02b6a701],.card dl[data-v-02b6a701],.card table[data-v-02b6a701]{font-size:1rem;line-height:1.7}.card p[data-v-02b6a701]{margin-bottom:0;margin-top:0;font-size:1rem;line-height:1.7}.card p a[data-v-02b6a701]{position:relative;z-index:1}.card header[data-v-02b6a701]{margin:0 0 .525rem;padding:0;font-size:1.5rem;font-weight:500;line-height:1.2}.card header a[data-v-02b6a701]{text-decoration:none}.card header a[data-v-02b6a701]:hover,.card header a[data-v-02b6a701]:focus{text-decoration:underline}.card header .headline[data-v-02b6a701]{font-size:1.5rem}.card header:focus-within~.bttn[data-v-02b6a701]{background-position:0;background-size:200% 100%}.card header:focus-within~.bttn i[data-v-02b6a701],.card header:focus-within~.bttn svg[data-v-02b6a701]{color:var(--brand-secondary)}.card:focus-within header a[data-v-02b6a701]:focus{text-decoration:underline}.card footer .bttn[data-v-02b6a701]{margin-top:1.25rem}.card>.media[data-v-02b6a701]{margin-top:0;text-align:center;min-width:9.375rem}.card>.media img[data-v-02b6a701]{width:100%;object-fit:cover}.card>.media iframe[data-v-02b6a701]{border:none}.card>.media.media--small.media--circle[data-v-02b6a701],.card>.media.media--medium.media--circle[data-v-02b6a701]{margin-left:auto;margin-right:auto}.card .media__inner[data-v-02b6a701]{margin:-2rem -2rem 2rem}.card .media--circle[data-v-02b6a701]{display:block}.card .media--circle .media__inner[data-v-02b6a701]{margin-left:0;margin-top:0;margin-right:0}.card .media--circle.media--small[data-v-02b6a701]{max-width:9.375rem}.card .media--circle.media--medium[data-v-02b6a701]{max-width:15.625rem}@media (min-width: 768px){.card .media--circle.media--medium[data-v-02b6a701]{max-width:60%}}.card .media--square img[data-v-02b6a701],.card .media--square iframe[data-v-02b6a701]{aspect-ratio:1/1}.card .media--widescreen img[data-v-02b6a701],.card .media--widescreen iframe[data-v-02b6a701]{aspect-ratio:16/9}.card__subtitle[data-v-02b6a701]{opacity:.7;font-family:Zilla Slab,Zilla-fallback,serif;font-size:1.3rem;font-weight:500;line-height:1.4}.card__details[data-v-02b6a701]{margin:-.4rem 0 .625rem}.card__meta[data-v-02b6a701]{font-family:Roboto,sans-serif;font-size:1.1rem;line-height:1.4;font-weight:400}.card__meta .fas[data-v-02b6a701]{margin-right:.3rem}.card__body[data-v-02b6a701]{line-height:1.7;word-wrap:anywhere;overflow-wrap:anywhere}.card.borderless[data-v-02b6a701]:not([class*=bg--]){padding:0}.card.borderless:not([class*=bg--]) .media__inner[data-v-02b6a701]{margin-left:0;margin-right:0;margin-top:0}@media (min-width: 768px){.card.borderless:not([class*=bg--]).card--layout-left .media__inner[data-v-02b6a701]{margin-right:2rem}}@media (min-width: 768px){.card.borderless:not([class*=bg--]).card--layout-right .media__inner[data-v-02b6a701]{margin-left:2rem}}.card--centered[data-v-02b6a701]{text-align:center}@media (min-width: 768px){.card--button-align-bottom:not([class*=card--layout]) .card__body[data-v-02b6a701]{flex:1}}@media (min-width: 768px){.card--button-align-bottom .card__body[data-v-02b6a701]{display:flex;flex-direction:column}}@media (min-width: 768px){.card--button-align-bottom footer[data-v-02b6a701]{margin-top:auto}}.card--media-padded .media__inner[data-v-02b6a701]{margin-left:0;margin-top:0;margin-right:0}@media (min-width: 768px){.card--layout-left[data-v-02b6a701],.card--layout-right[data-v-02b6a701]{display:flex;flex-direction:row;width:100%}.card--layout-left .media__inner[data-v-02b6a701],.card--layout-right .media__inner[data-v-02b6a701]{margin:0}}.card--layout-left>*[data-v-02b6a701],.card--layout-right>*[data-v-02b6a701]{flex-basis:100%}.card--layout-left .media--small.media--circle[data-v-02b6a701],.card--layout-right .media--small.media--circle[data-v-02b6a701]{max-width:11.375rem}@media (min-width: 768px){.card--layout-left .media--small.media--square[data-v-02b6a701],.card--layout-right .media--small.media--square[data-v-02b6a701]{max-width:11.375rem}}@media (min-width: 768px){.card--layout-left .media--small.media--widescreen[data-v-02b6a701],.card--layout-right .media--small.media--widescreen[data-v-02b6a701]{max-width:15.625rem}}@media (min-width: 768px){.card--layout-left .media--medium.media--circle[data-v-02b6a701],.card--layout-right .media--medium.media--circle[data-v-02b6a701]{max-width:none}}@media (min-width: 768px){.card--layout-left .media--medium[data-v-02b6a701],.card--layout-right .media--medium[data-v-02b6a701]{flex:0 0 35%}}@media (min-width: 768px){.card--layout-left .media--large[data-v-02b6a701],.card--layout-right .media--large[data-v-02b6a701]{flex:0 0 52.5%}}@media (min-width: 768px){.card--layout-left[data-v-02b6a701]{flex-direction:row}.card--layout-left .media__inner[data-v-02b6a701],.card--layout-left .media--circle .media__inner[data-v-02b6a701]{margin-right:2rem}}@media (min-width: 768px){.card--layout-right[data-v-02b6a701]{flex-direction:row-reverse}.card--layout-right .media__inner[data-v-02b6a701],.card--layout-right .media--circle .media__inner[data-v-02b6a701]{margin-left:2rem}}.bg--white .card.bg--white[class*=borderless][data-v-02b6a701]{padding:0}.bg--white .card.bg--white[class*=borderless]:not([class*=card--layout]) .media__inner[data-v-02b6a701]{margin-left:0;margin-right:0;margin-top:0}.bg--gray .card.bg--gray[class*=borderless][data-v-02b6a701]{padding:0}.bg--gray .card.bg--gray[class*=borderless]:not([class*=card--layout]) .media__inner[data-v-02b6a701]{margin-left:0;margin-right:0;margin-top:0}.bg--black .card.bg--black[class*=borderless][data-v-02b6a701]{padding:0}.bg--black .card.bg--black[class*=borderless]:not([class*=card--layout]) .media__inner[data-v-02b6a701]{margin-left:0;margin-right:0;margin-top:0}.bg--gold .card.bg--gold[class*=borderless][data-v-02b6a701]{padding:0}.bg--gold .card.bg--gold[class*=borderless]:not([class*=card--layout]) .media__inner[data-v-02b6a701]{margin-left:0;margin-right:0;margin-top:0}
`, Gl = { class: "media__inner" }, Nl = ["href"], Ll = { class: "card__body" }, Zl = { key: 0 }, Ul = ["href"], Kl = {
  key: 1,
  class: "card__details"
}, Xl = {
  key: 0,
  class: "card__subtitle"
}, Wl = {
  key: 1,
  class: "card__meta"
}, Vl = { key: 2 }, Hl = /* @__PURE__ */ he({
  __name: "Card",
  props: {
    /**
     * Title style for the headline.
     */
    headline_style: {
      type: String,
      default: ""
    },
    /**
     * A URL to the resource that the card represents.
     */
    url: {
      type: String
    },
    /**
     * Text to display in a button.
     */
    link_text: {
      type: String
    },
    /**
     * Display a circle button when there is no button text.
     */
    link_indicator: {
      type: Boolean,
      default: !0
    },
    button_align_bottom: {
      type: Boolean,
      default: !1
    },
    /**
     * Alignment of text content.
     */
    centered: {
      type: Boolean
    },
    /**
     * Include an outline around the card.
     */
    ...Ht.props,
    ...Ke.props,
    /**
     * How to lay out the content of the card. Default is stacked.
     */
    orientation: {
      type: String,
      default: "",
      validator: (e) => ["", "left", "right"].indexOf(e) !== -1
    },
    ...Aa.props,
    /**
     * Add padding around the entirety of the contents of the card.
     * **Note** this has no effect when paired with the borderless option.
     */
    media_padded: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, a = Ti(), n = X(() => {
      let b = ["card"];
      return ["centered", "media_padded", "button_align_bottom"].forEach((h) => {
        t[h] === !0 && b.push(`card--${ce(h)}`);
      }), t.orientation && b.push(`card--layout-${ce(t.orientation)}`), Ke.addBackgroundClass(b, t), Ht.addBorderlessClass(b, t), t.url && b.push("click-container"), b;
    }), i = X(() => {
      let b = ["media"];
      return Aa.addMediaClasses(b, t), b;
    }), r = X(() => {
      let b = ["bttn--transparent", "bttn--light-font"];
      return t.link_indicator && t.url && !t.link_text && (b.push("bttn--circle"), b.push("bttn--no-text")), s.value === "button" && b.push("click-target"), b;
    }), s = X(() => t.url ? a.title ? "title" : !t.link_text && a.media ? "image" : "button" : null), l = X(() => s.value === "title" ? t.url : !1), d = X(() => !!(a.subtitle || a.meta));
    return Fi(() => {
      t.url && Ol(".click-container:not([data-uids-no-link])");
    }), (b, h) => (j(), C("div", {
      class: H(n.value)
    }, [
      b.$slots.media ? (j(), C("div", {
        key: 0,
        class: H(i.value)
      }, [
        N("div", Gl, [
          s.value === "image" ? (j(), C("a", {
            key: 0,
            href: e.url,
            class: "click-target"
          }, [
            U(b.$slots, "media", {}, void 0, !0)
          ], 8, Nl)) : U(b.$slots, "media", { key: 1 }, void 0, !0)
        ])
      ], 2)) : ee("", !0),
      N("div", Ll, [
        b.$slots.title ? (j(), C("header", Zl, [
          le(la, { text_style: e.headline_style }, {
            default: Ce(() => [
              l.value ? (j(), C("a", {
                key: 0,
                href: l.value,
                class: "click-target"
              }, [
                U(b.$slots, "title", {}, () => [
                  be("Title")
                ], !0)
              ], 8, Ul)) : U(b.$slots, "title", { key: 1 }, () => [
                be("Title")
              ], !0)
            ]),
            _: 3
          }, 8, ["text_style"])
        ])) : ee("", !0),
        d.value === !0 ? (j(), C("div", Kl, [
          b.$slots.subtitle ? (j(), C("div", Xl, [
            U(b.$slots, "subtitle", {}, () => [
              be("Subtitle")
            ], !0)
          ])) : ee("", !0),
          b.$slots.meta ? (j(), C("div", Wl, [
            U(b.$slots, "meta", {}, () => [
              be("Meta")
            ], !0)
          ])) : ee("", !0)
        ])) : ee("", !0),
        U(b.$slots, "default", {}, () => [
          be("Body")
        ], !0),
        e.url && (e.link_indicator || e.link_text) ? (j(), C("footer", Vl, [
          s.value === "button" ? (j(), et(ca, {
            key: 0,
            class: H(r.value),
            url: e.url,
            size: "medium"
          }, {
            default: Ce(() => [
              be(bt(e.link_text), 1)
            ]),
            _: 1
          }, 8, ["class", "url"])) : (j(), et(Tl, {
            key: 1,
            class: H(r.value)
          }, {
            default: Ce(() => [
              be(bt(e.link_text), 1)
            ]),
            _: 1
          }, 8, ["class"]))
        ])) : ee("", !0)
      ])
    ], 2));
  }
}), Pl = /* @__PURE__ */ pe(Hl, [["styles", [Al]], ["__scopeId", "data-v-02b6a701"]]);
const Dl = `.cta[data-v-0ca97300]{padding:2.5rem 1.25rem;display:flex;flex-wrap:wrap;text-align:center;justify-content:center}.cta>div[data-v-0ca97300]{flex-basis:100%;display:grid;gap:1rem}.cta .cta__container[data-v-0ca97300]{margin-block-end:1rem}.cta p[data-v-0ca97300]{margin-bottom:0}.cta--button-align-right[data-v-0ca97300]{justify-content:left;text-align:left}@media (min-width: 980px){.cta--button-align-right[data-v-0ca97300]{flex-wrap:nowrap}}.cta--button-align-right .cta__title[data-v-0ca97300]{flex-basis:100%}@media (min-width: 980px){.cta--button-align-right .cta__content[data-v-0ca97300],.cta--button-align-right .cta__link[data-v-0ca97300]{flex:0 1 48%}}.cta--button-align-right .cta__link[data-v-0ca97300]{justify-content:end;align-self:baseline;display:flex}@media (min-width: 980px){.cta--button-align-right:not([class*=cta--left]) .cta__container[data-v-0ca97300]{text-align:center}}.cta--left[data-v-0ca97300]{justify-content:unset;text-align:left}@media (min-width: 980px){.cta--inline[data-v-0ca97300]{flex-wrap:nowrap;gap:0}.cta--inline .cta__link[data-v-0ca97300]{flex-basis:30%;align-self:center;display:flex;justify-content:end}.cta--inline .cta__container[data-v-0ca97300]{display:flex;margin-block-end:unset}.cta--inline .cta__container .cta__title[data-v-0ca97300]{flex-basis:30%;align-self:center}.cta--inline .cta__container .cta__content[data-v-0ca97300]{flex:1;align-self:center}}
`, Ql = { class: "cta__container" }, ql = {
  key: 0,
  class: "cta__title"
}, $l = {
  key: 1,
  class: "cta__content"
}, ec = {
  key: 0,
  class: "cta__link"
}, tc = /* @__PURE__ */ he({
  __name: "Cta",
  props: {
    /**
     * Title style for the headline.
     */
    headline_style: {
      type: String,
      default: ""
    },
    url: {
      type: String
    },
    details: {
      type: String
    },
    orientation: {
      type: String,
      default: ""
    },
    button_align_right: {
      type: Boolean,
      default: !1
    },
    button_label: {
      type: String
    },
    button_icon: {
      type: String,
      default: ""
    },
    ...Ke.props
  },
  setup(e) {
    const t = e, a = X(() => {
      let i = ["cta"];
      return Ke.addBackgroundClass(i, t), ["button_align_right"].forEach((r) => {
        t[r] === !0 && i.push(`cta--${ce(r)}`);
      }), t.orientation && i.push(`cta--${ce(t.orientation)}`), i;
    }), n = X(() => [""]);
    return (i, r) => (j(), C("div", {
      class: H(a.value)
    }, [
      N("div", Ql, [
        i.$slots.title ? (j(), C("div", ql, [
          le(la, { text_style: e.headline_style }, {
            default: Ce(() => [
              U(i.$slots, "title", {}, () => [
                be("Title")
              ], !0)
            ]),
            _: 3
          }, 8, ["text_style"])
        ])) : ee("", !0),
        e.details ? (j(), C("div", $l, [
          U(i.$slots, "details", {}, () => [
            be(bt(e.details), 1)
          ], !0)
        ])) : ee("", !0)
      ]),
      e.button_label ? (j(), C("footer", ec, [
        le(ca, {
          class: H(n.value),
          url: e.url,
          size: "medium"
        }, {
          default: Ce(() => [
            U(i.$slots, "button_label", {}, () => [
              be(bt(e.button_label), 1)
            ], !0),
            U(i.$slots, "button_icon", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["class", "url"])
      ])) : ee("", !0)
    ], 2));
  }
}), ac = /* @__PURE__ */ pe(tc, [["styles", [Dl]], ["__scopeId", "data-v-0ca97300"]]);
const nc = `.grid--threecol--33-34-33 .list-container__inner[data-v-e34cc80a]{gap:2rem}@media (min-width: 768px){.grid--threecol--33-34-33 .list-container__inner[data-v-e34cc80a]{display:grid;grid-template-rows:auto;grid-gap:3rem;grid-template-columns:1fr}}@media (min-width: 768px){.grid--threecol--33-34-33 .list-container__inner[data-v-e34cc80a]{gap:3rem;grid-template-columns:repeat(auto-fill,minmax(29.74%,1fr))}}.grid--twocol--50-50 .list-container__inner[data-v-e34cc80a]{gap:2rem}@media (min-width: 768px){.grid--twocol--50-50 .list-container__inner[data-v-e34cc80a]{display:grid;grid-template-rows:auto;grid-gap:3rem;grid-template-columns:1fr}}@media (min-width: 768px){.grid--twocol--50-50 .list-container__inner[data-v-e34cc80a]{column-gap:3rem;row-gap:1.25rem;grid-template-columns:repeat(auto-fill,minmax(46.7%,1fr))}}.grid--twocol--67-33 .list-container__inner[data-v-e34cc80a]{gap:2rem}@media (min-width: 768px){.grid--twocol--67-33 .list-container__inner[data-v-e34cc80a]{display:grid;grid-template-rows:auto;grid-gap:3rem;grid-template-columns:1fr}}@media (min-width: 768px){.grid--twocol--67-33 .list-container__inner[data-v-e34cc80a]{grid-template-columns:repeat(3,1fr)}.grid--twocol--67-33 .list-container__inner .grid__column[data-v-e34cc80a]:first-child{grid-area:1/1/2/3;min-width:0}}@media (min-width: 768px){.grid--twocol--67-33 .list-container__inner .grid__column[data-v-e34cc80a]:last-child{grid-area:1/3/2/4;min-width:0}}.grid--onecol .list-container__inner[data-v-e34cc80a]{max-width:81.875em;margin:0 auto}.grid--onecol__narrow .list-container__inner[data-v-e34cc80a]{max-width:63.75em;margin:0 auto}@supports (contain: inline-size){.grid__column[data-v-e34cc80a]{container-type:inline-size;container-name:column}}
`, ic = { class: "list-container__inner" }, rc = /* @__PURE__ */ he({
  __name: "Grid",
  props: {
    /**
     * The type of grid to display.
     */
    type: {
      type: String,
      default: "threecol--33-34-33"
    }
  },
  setup(e) {
    const t = e, a = X(() => {
      let n = [];
      return n.push(`list-container grid--${t.type}`), n;
    });
    return (n, i) => (j(), C("div", {
      class: H(a.value)
    }, [
      N("div", ic, [
        U(n.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
}), sc = /* @__PURE__ */ pe(rc, [["styles", [nc]], ["__scopeId", "data-v-e34cc80a"]]), oc = `.media--border img[data-v-af9eaf22]{padding:.5rem;border:1px solid rgba(0,0,0,.125)}.media--circle[data-v-af9eaf22]{border-radius:50%;margin-top:0;height:auto}.media--circle img[data-v-af9eaf22]{aspect-ratio:1/1;border-radius:50%;margin-top:0;height:auto}.media--cover img[data-v-af9eaf22]{object-fit:cover;height:100%;width:100%}.media--1-1 iframe[data-v-af9eaf22]{aspect-ratio:1/1}.media--4-3 iframe[data-v-af9eaf22]{aspect-ratio:4/3}.media--16-9 iframe[data-v-af9eaf22]{aspect-ratio:16/9}.media--21-9 iframe[data-v-af9eaf22]{aspect-ratio:21/9}
`, fn = (e) => (an("data-v-af9eaf22"), e = e(), nn(), e), lc = {
  key: 0,
  width: "768",
  height: "432",
  alt: "A",
  class: "lazyloaded",
  "data-src": "https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=Ks2HvkO-",
  "data-srcset": "https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=VVS7ioB7 2592w",
  "data-sizes": "(min-width: 768px) calc(50vw - 3.75em), 100vw",
  sizes: "(min-width: 768px) calc(50vw - 3.75em), 100vw",
  srcset: "https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__384_x_216/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=vaWWV7aq 384w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=Ks2HvkO- 768w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1024_x_576/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=CeFE5dp5 1024w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1312_x_738/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=6GKIgefv 1312w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__1920_x_1080/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=SbNEbWvi 1920w, https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__2592_x_1458/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=VVS7ioB7 2592w",
  src: "https://sandbox.prod.drupal.uiowa.edu/sites/sandbox.uiowa.edu/files/styles/widescreen__768_x_432/public/2021-12/mnra_0.jpeg?h=ddc58dd3&itok=Ks2HvkO-"
}, cc = {
  key: 1,
  src: "https://www.youtube.com/embed/XTeeVT_qbYg",
  frameborder: "0",
  allowtransparency: "",
  width: "854",
  height: "480",
  class: "media-oembed-content",
  title: "This is Iowa"
}, dc = {
  key: 2,
  id: "video-container--1646",
  class: "player",
  preload: "metadata",
  poster: "https://uiowa.edu/sites/uiowa.edu/files/2022-03/Collaboration%20Vertical%20D.jpg",
  controls: ""
}, bc = /* @__PURE__ */ fn(() => /* @__PURE__ */ N("source", {
  src: "https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201_TheatreCollaboration_264.mp4",
  type: "video/mp4"
}, null, -1)), fc = /* @__PURE__ */ fn(() => /* @__PURE__ */ N("track", {
  label: "English",
  kind: "subtitles",
  srclang: "en",
  src: "https://uiowa.edu/sites/uiowa.edu/files/2022-03/20220201%20TheatreCollaboration.vtt",
  default: "default"
}, null, -1)), uc = /* @__PURE__ */ fn(() => /* @__PURE__ */ N("p", null, "Video is not Supporting", -1)), gc = [
  bc,
  fc,
  uc
], hc = /* @__PURE__ */ he({
  __name: "Media",
  props: {
    ...Pt.props,
    type: {
      type: String,
      default: "image"
    },
    aspect_ratio: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e;
    function a(i) {
      switch (i) {
        case "default":
          return "";
        case "ar_16_9":
          return "media--16-9";
        case "ar_21_9":
          return "media--21-9";
      }
    }
    const n = X(() => {
      let i = ["media"], r = a(t.aspect_ratio);
      return t.type === "video" && !r && (r = "media--16-9"), r && i.push(r), Pt.addClass(i, t), i;
    });
    return (i, r) => (j(), C("div", {
      class: H(n.value)
    }, [
      e.type === "image" ? (j(), C("img", lc)) : e.type === "video" ? (j(), C("iframe", cc)) : e.type === "vertical_video" ? (j(), C("video", dc, gc)) : ee("", !0)
    ], 2));
  }
}), pc = /* @__PURE__ */ pe(hc, [["styles", [oc]], ["__scopeId", "data-v-af9eaf22"]]), Qi = /* @__PURE__ */ ke(Oo), qi = /* @__PURE__ */ ke(tl), $i = /* @__PURE__ */ ke(yl), er = /* @__PURE__ */ ke(ca), tr = /* @__PURE__ */ ke(jl), ar = /* @__PURE__ */ ke(Pl), nr = /* @__PURE__ */ ke(ac), ir = /* @__PURE__ */ ke(sc), rr = /* @__PURE__ */ ke(la), sr = /* @__PURE__ */ ke(Di), or = /* @__PURE__ */ ke(pc);
customElements.define("uids-alert", Qi);
customElements.define("uids-banner", qi);
customElements.define("uids-brandbar", $i);
customElements.define("uids-button", er);
customElements.define("uids-callout", tr);
customElements.define("uids-card", ar);
customElements.define("uids-cta", nr);
customElements.define("uids-grid", ir);
customElements.define("uids-headline", rr);
customElements.define("uids-logo", sr);
customElements.define("uids-media", or);
function mc() {
  const e = window.customElements;
  e !== null && (typeof e.get("uids-alert") > "u" && e.define("uids-alert", Qi), typeof e.get("uids-banner") > "u" && e.define("uids-banner", qi), typeof e.get("uids-brandbar") > "u" && e.define("uids-brandbar", $i), typeof e.get("uids-button") > "u" && e.define("uids-button", er), typeof e.get("uids-callout") > "u" && e.define("uids-callout", tr), typeof e.get("uids-card") > "u" && e.define("uids-card", ar), typeof e.get("uids-cta") > "u" && e.define("uids-cta", nr), typeof e.get("uids-grid") > "u" && e.define("uids-grid", ir), typeof e.get("uids-headline") > "u" && e.define("uids-headline", rr), typeof e.get("uids-logo") > "u" && e.define("uids-logo", sr), typeof e.get("uids-media") > "u" && e.define("uids-media", or)), console.log("window ceRegistry is now:", e);
}
console.log("running loader");
mc();
export {
  Oo as Alert,
  Qi as AlertElement,
  tl as Banner,
  qi as BannerElement,
  yl as BrandBar,
  $i as BrandBarElement,
  ca as Button,
  er as ButtonElement,
  jl as Callout,
  tr as CalloutElement,
  Pl as Card,
  ar as CardElement,
  ac as Cta,
  nr as CtaElement,
  sc as Grid,
  ir as GridElement,
  la as Headline,
  rr as HeadlineElement,
  Di as Logo,
  sr as LogoElement,
  pc as Media,
  or as MediaElement,
  mc as loader
};
