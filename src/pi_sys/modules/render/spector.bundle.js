! function (e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("SPECTOR", [], t) : "object" == typeof exports ? exports.SPECTOR = t() : e.SPECTOR = t()
}(window, (function () {
	return function (e) {
		var t = {};

		function n(i) {
			if (t[i]) return t[i].exports;
			var r = t[i] = {
				i: i,
				l: !1,
				exports: {}
			};
			return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
		}
		return n.m = e, n.c = t, n.d = function (e, t, i) {
			n.o(e, t) || Object.defineProperty(e, t, {
				enumerable: !0,
				get: i
			})
		}, n.r = function (e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, n.t = function (e, t) {
			if (1 & t && (e = n(e)), 8 & t) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var i = Object.create(null);
			if (n.r(i), Object.defineProperty(i, "default", {
					enumerable: !0,
					value: e
				}), 2 & t && "string" != typeof e)
				for (var r in e) n.d(i, r, function (t) {
					return e[t]
				}.bind(null, r));
			return i
		}, n.n = function (e) {
			var t = e && e.__esModule ? function () {
				return e.default
			} : function () {
				return e
			};
			return n.d(t, "a", t), t
		}, n.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "/", n(n.s = 4)
	}([function (e, t) {
		e.exports = function (e) {
			return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
				enumerable: !0,
				get: function () {
					return e.l
				}
			}), Object.defineProperty(e, "id", {
				enumerable: !0,
				get: function () {
					return e.i
				}
			}), e.webpackPolyfill = 1), e
		}
	}, function (e, t, n) {
		"use strict";
		e.exports = function (e) {
			var t = [];
			return t.toString = function () {
				return this.map((function (t) {
					var n = function (e, t) {
						var n = e[1] || "",
							i = e[3];
						if (!i) return n;
						if (t && "function" == typeof btoa) {
							var r = (s = i, a = btoa(unescape(encodeURIComponent(JSON.stringify(s)))), c = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), "/*# ".concat(c, " */")),
								o = i.sources.map((function (e) {
									return "/*# sourceURL=".concat(i.sourceRoot).concat(e, " */")
								}));
							return [n].concat(o).concat([r]).join("\n")
						}
						var s, a, c;
						return [n].join("\n")
					}(t, e);
					return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
				})).join("")
			}, t.i = function (e, n) {
				"string" == typeof e && (e = [
					[null, e, ""]
				]);
				for (var i = {}, r = 0; r < this.length; r++) {
					var o = this[r][0];
					null != o && (i[o] = !0)
				}
				for (var s = 0; s < e.length; s++) {
					var a = e[s];
					null != a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(".concat(a[2], ") and (").concat(n, ")")), t.push(a))
				}
			}, t
		}
	}, function (e, t, n) {
		var i, r, o = {},
			s = (i = function () {
				return window && document && document.all && !window.atob
			}, function () {
				return void 0 === r && (r = i.apply(this, arguments)), r
			}),
			a = function (e, t) {
				return t ? t.querySelector(e) : document.querySelector(e)
			},
			c = function (e) {
				var t = {};
				return function (e, n) {
					if ("function" == typeof e) return e();
					if (void 0 === t[e]) {
						var i = a.call(this, e, n);
						if (window.HTMLIFrameElement && i instanceof window.HTMLIFrameElement) try {
							i = i.contentDocument.head
						} catch (e) {
							i = null
						}
						t[e] = i
					}
					return t[e]
				}
			}(),
			l = null,
			u = 0,
			h = [],
			d = n(10);

		function p(e, t) {
			for (var n = 0; n < e.length; n++) {
				var i = e[n],
					r = o[i.id];
				if (r) {
					r.refs++;
					for (var s = 0; s < r.parts.length; s++) r.parts[s](i.parts[s]);
					for (; s < i.parts.length; s++) r.parts.push(E(i.parts[s], t))
				} else {
					var a = [];
					for (s = 0; s < i.parts.length; s++) a.push(E(i.parts[s], t));
					o[i.id] = {
						id: i.id,
						refs: 1,
						parts: a
					}
				}
			}
		}

		function m(e, t) {
			for (var n = [], i = {}, r = 0; r < e.length; r++) {
				var o = e[r],
					s = t.base ? o[0] + t.base : o[0],
					a = {
						css: o[1],
						media: o[2],
						sourceMap: o[3]
					};
				i[s] ? i[s].parts.push(a) : n.push(i[s] = {
					id: s,
					parts: [a]
				})
			}
			return n
		}

		function f(e, t) {
			var n = c(e.insertInto);
			if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
			var i = h[h.length - 1];
			if ("top" === e.insertAt) i ? i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), h.push(t);
			else if ("bottom" === e.insertAt) n.appendChild(t);
			else {
				if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
				var r = c(e.insertAt.before, n);
				n.insertBefore(t, r)
			}
		}

		function g(e) {
			if (null === e.parentNode) return !1;
			e.parentNode.removeChild(e);
			var t = h.indexOf(e);
			t >= 0 && h.splice(t, 1)
		}

		function v(e) {
			var t = document.createElement("style");
			if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
				var i = function () {
					0;
					return n.nc
				}();
				i && (e.attrs.nonce = i)
			}
			return _(t, e.attrs), f(e, t), t
		}

		function _(e, t) {
			Object.keys(t).forEach((function (n) {
				e.setAttribute(n, t[n])
			}))
		}

		function E(e, t) {
			var n, i, r, o;
			if (t.transform && e.css) {
				if (!(o = "function" == typeof t.transform ? t.transform(e.css) : t.transform.default(e.css))) return function () {};
				e.css = o
			}
			if (t.singleton) {
				var s = u++;
				n = l || (l = v(t)), i = R.bind(null, n, s, !1), r = R.bind(null, n, s, !0)
			} else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
				var t = document.createElement("link");
				return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", _(t, e.attrs), f(e, t), t
			}(t), i = y.bind(null, n, t), r = function () {
				g(n), n.href && URL.revokeObjectURL(n.href)
			}) : (n = v(t), i = S.bind(null, n), r = function () {
				g(n)
			});
			return i(e),
				function (t) {
					if (t) {
						if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
						i(e = t)
					} else r()
				}
		}
		e.exports = function (e, t) {
			if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
			(t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = s()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
			var n = m(e, t);
			return p(n, t),
				function (e) {
					for (var i = [], r = 0; r < n.length; r++) {
						var s = n[r];
						(a = o[s.id]).refs--, i.push(a)
					}
					e && p(m(e, t), t);
					for (r = 0; r < i.length; r++) {
						var a;
						if (0 === (a = i[r]).refs) {
							for (var c = 0; c < a.parts.length; c++) a.parts[c]();
							delete o[a.id]
						}
					}
				}
		};
		var C, A = (C = [], function (e, t) {
			return C[e] = t, C.filter(Boolean).join("\n")
		});

		function R(e, t, n, i) {
			var r = n ? "" : i.css;
			if (e.styleSheet) e.styleSheet.cssText = A(t, r);
			else {
				var o = document.createTextNode(r),
					s = e.childNodes;
				s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(o, s[t]) : e.appendChild(o)
			}
		}

		function S(e, t) {
			var n = t.css,
				i = t.media;
			if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = n;
			else {
				for (; e.firstChild;) e.removeChild(e.firstChild);
				e.appendChild(document.createTextNode(n))
			}
		}

		function y(e, t, n) {
			var i = n.css,
				r = n.sourceMap,
				o = void 0 === t.convertToAbsoluteUrls && r;
			(t.convertToAbsoluteUrls || o) && (i = d(i)), r && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */");
			var s = new Blob([i], {
					type: "text/css"
				}),
				a = e.href;
			e.href = URL.createObjectURL(s), a && URL.revokeObjectURL(a)
		}
	}, function (e, t) {
		e.exports = function () {
			throw new Error("define cannot be used indirect")
		}
	}, function (e, t, n) {
		n(5), n(6), n(7), n(8), n(11), e.exports = n(16)
	}, function (e, t, n) {
		(function (e) {
			! function () {
				var e = function () {
					return this
				}();
				e || "undefined" == typeof window || (e = window);
				var t = function (e, n, i) {
					"string" == typeof e ? (2 == arguments.length && (i = n), t.modules[e] || (t.payloads[e] = i, t.modules[e] = null)) : t.original ? t.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())
				};
				t.modules = {}, t.payloads = {};
				var n, i, r = function (e, t, n) {
						if ("string" == typeof t) {
							var i = a(e, t);
							if (null != i) return n && n(), i
						} else if ("[object Array]" === Object.prototype.toString.call(t)) {
							for (var r = [], s = 0, c = t.length; s < c; ++s) {
								var l = a(e, t[s]);
								if (null == l && o.original) return;
								r.push(l)
							}
							return n && n.apply(null, r) || !0
						}
					},
					o = function (e, t) {
						var n = r("", e, t);
						return null == n && o.original ? o.original.apply(this, arguments) : n
					},
					s = function (e, t) {
						if (-1 !== t.indexOf("!")) {
							var n = t.split("!");
							return s(e, n[0]) + "!" + s(e, n[1])
						}
						if ("." == t.charAt(0))
							for (t = e.split("/").slice(0, -1).join("/") + "/" + t; - 1 !== t.indexOf(".") && i != t;) {
								var i = t;
								t = t.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
							}
						return t
					},
					a = function (e, n) {
						n = s(e, n);
						var i = t.modules[n];
						if (!i) {
							if ("function" == typeof (i = t.payloads[n])) {
								var o = {},
									a = {
										id: n,
										uri: "",
										exports: o,
										packaged: !0
									};
								o = i((function (e, t) {
									return r(n, e, t)
								}), o, a) || a.exports, t.modules[n] = o, delete t.payloads[n]
							}
							i = t.modules[n] = o || i
						}
						return i
					};
				i = e, (n = "ace") && (e[n] || (e[n] = {}), i = e[n]), i.define && i.define.packaged || (t.original = i.define, i.define = t, i.define.packaged = !0), i.require && i.require.packaged || (o.original = i.require, i.require = o, i.require.packaged = !0)
			}(), ace.define("ace/lib/regexp", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i, r = {
						exec: RegExp.prototype.exec,
						test: RegExp.prototype.test,
						match: String.prototype.match,
						replace: String.prototype.replace,
						split: String.prototype.split
					},
					o = void 0 === r.exec.call(/()??/, "")[1],
					s = (i = /^/g, r.test.call(i, ""), !i.lastIndex);

				function a(e) {
					return (e.global ? "g" : "") + (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.extended ? "x" : "") + (e.sticky ? "y" : "")
				}

				function c(e, t, n) {
					if (Array.prototype.indexOf) return e.indexOf(t, n);
					for (var i = n || 0; i < e.length; i++)
						if (e[i] === t) return i;
					return -1
				}
				s && o || (RegExp.prototype.exec = function (e) {
					var t, n, i = r.exec.apply(this, arguments);
					if ("string" == typeof e && i) {
						if (!o && i.length > 1 && c(i, "") > -1 && (n = RegExp(this.source, r.replace.call(a(this), "g", "")), r.replace.call(e.slice(i.index), n, (function () {
								for (var e = 1; e < arguments.length - 2; e++) void 0 === arguments[e] && (i[e] = void 0)
							}))), this._xregexp && this._xregexp.captureNames)
							for (var l = 1; l < i.length; l++)(t = this._xregexp.captureNames[l - 1]) && (i[t] = i[l]);
						!s && this.global && !i[0].length && this.lastIndex > i.index && this.lastIndex--
					}
					return i
				}, s || (RegExp.prototype.test = function (e) {
					var t = r.exec.call(this, e);
					return t && this.global && !t[0].length && this.lastIndex > t.index && this.lastIndex--, !!t
				}))
			})), ace.define("ace/lib/es5-shim", ["require", "exports", "module"], (function (e, t, n) {
				function i() {}
				Function.prototype.bind || (Function.prototype.bind = function (e) {
					var t = this;
					if ("function" != typeof t) throw new TypeError("Function.prototype.bind called on incompatible " + t);
					var n = d.call(arguments, 1),
						r = function () {
							if (this instanceof r) {
								var i = t.apply(this, n.concat(d.call(arguments)));
								return Object(i) === i ? i : this
							}
							return t.apply(e, n.concat(d.call(arguments)))
						};
					return t.prototype && (i.prototype = t.prototype, r.prototype = new i, i.prototype = null), r
				});
				var r, o, s, a, c, l = Function.prototype.call,
					u = Array.prototype,
					h = Object.prototype,
					d = u.slice,
					p = l.bind(h.toString),
					m = l.bind(h.hasOwnProperty);
				if ((c = m(h, "__defineGetter__")) && (r = l.bind(h.__defineGetter__), o = l.bind(h.__defineSetter__), s = l.bind(h.__lookupGetter__), a = l.bind(h.__lookupSetter__)), 2 != [1, 2].splice(0).length)
					if (function () {
							function e(e) {
								var t = new Array(e + 2);
								return t[0] = t[1] = 0, t
							}
							var t, n = [];
							if (n.splice.apply(n, e(20)), n.splice.apply(n, e(26)), t = n.length, n.splice(5, 0, "XXX"), n.length, t + 1 == n.length) return !0
						}()) {
						var f = Array.prototype.splice;
						Array.prototype.splice = function (e, t) {
							return arguments.length ? f.apply(this, [void 0 === e ? 0 : e, void 0 === t ? this.length - e : t].concat(d.call(arguments, 2))) : []
						}
					} else Array.prototype.splice = function (e, t) {
						var n = this.length;
						e > 0 ? e > n && (e = n) : null == e ? e = 0 : e < 0 && (e = Math.max(n + e, 0)), e + t < n || (t = n - e);
						var i = this.slice(e, e + t),
							r = d.call(arguments, 2),
							o = r.length;
						if (e === n) o && this.push.apply(this, r);
						else {
							var s = Math.min(t, n - e),
								a = e + s,
								c = a + o - s,
								l = n - a,
								u = n - s;
							if (c < a)
								for (var h = 0; h < l; ++h) this[c + h] = this[a + h];
							else if (c > a)
								for (h = l; h--;) this[c + h] = this[a + h];
							if (o && e === u) this.length = u, this.push.apply(this, r);
							else
								for (this.length = u + o, h = 0; h < o; ++h) this[e + h] = r[h]
						}
						return i
					};
				Array.isArray || (Array.isArray = function (e) {
					return "[object Array]" == p(e)
				});
				var g, v, _ = Object("a"),
					E = "a" != _[0] || !(0 in _);
				if (Array.prototype.forEach || (Array.prototype.forEach = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = arguments[1],
							r = -1,
							o = n.length >>> 0;
						if ("[object Function]" != p(e)) throw new TypeError;
						for (; ++r < o;) r in n && e.call(i, n[r], r, t)
					}), Array.prototype.map || (Array.prototype.map = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = n.length >>> 0,
							r = Array(i),
							o = arguments[1];
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						for (var s = 0; s < i; s++) s in n && (r[s] = e.call(o, n[s], s, t));
						return r
					}), Array.prototype.filter || (Array.prototype.filter = function (e) {
						var t, n = F(this),
							i = E && "[object String]" == p(this) ? this.split("") : n,
							r = i.length >>> 0,
							o = [],
							s = arguments[1];
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						for (var a = 0; a < r; a++) a in i && (t = i[a], e.call(s, t, a, n) && o.push(t));
						return o
					}), Array.prototype.every || (Array.prototype.every = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = n.length >>> 0,
							r = arguments[1];
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						for (var o = 0; o < i; o++)
							if (o in n && !e.call(r, n[o], o, t)) return !1;
						return !0
					}), Array.prototype.some || (Array.prototype.some = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = n.length >>> 0,
							r = arguments[1];
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						for (var o = 0; o < i; o++)
							if (o in n && e.call(r, n[o], o, t)) return !0;
						return !1
					}), Array.prototype.reduce || (Array.prototype.reduce = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = n.length >>> 0;
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						if (!i && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
						var r, o = 0;
						if (arguments.length >= 2) r = arguments[1];
						else
							for (;;) {
								if (o in n) {
									r = n[o++];
									break
								}
								if (++o >= i) throw new TypeError("reduce of empty array with no initial value")
							}
						for (; o < i; o++) o in n && (r = e.call(void 0, r, n[o], o, t));
						return r
					}), Array.prototype.reduceRight || (Array.prototype.reduceRight = function (e) {
						var t = F(this),
							n = E && "[object String]" == p(this) ? this.split("") : t,
							i = n.length >>> 0;
						if ("[object Function]" != p(e)) throw new TypeError(e + " is not a function");
						if (!i && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
						var r, o = i - 1;
						if (arguments.length >= 2) r = arguments[1];
						else
							for (;;) {
								if (o in n) {
									r = n[o--];
									break
								}
								if (--o < 0) throw new TypeError("reduceRight of empty array with no initial value")
							}
						do {
							o in this && (r = e.call(void 0, r, n[o], o, t))
						} while (o--);
						return r
					}), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function (e) {
						var t = E && "[object String]" == p(this) ? this.split("") : F(this),
							n = t.length >>> 0;
						if (!n) return -1;
						var i = 0;
						for (arguments.length > 1 && (i = O(arguments[1])), i = i >= 0 ? i : Math.max(0, n + i); i < n; i++)
							if (i in t && t[i] === e) return i;
						return -1
					}), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function (e) {
						var t = E && "[object String]" == p(this) ? this.split("") : F(this),
							n = t.length >>> 0;
						if (!n) return -1;
						var i = n - 1;
						for (arguments.length > 1 && (i = Math.min(i, O(arguments[1]))), i = i >= 0 ? i : n - Math.abs(i); i >= 0; i--)
							if (i in t && e === t[i]) return i;
						return -1
					}), Object.getPrototypeOf || (Object.getPrototypeOf = function (e) {
						return e.__proto__ || (e.constructor ? e.constructor.prototype : h)
					}), !Object.getOwnPropertyDescriptor) {
					Object.getOwnPropertyDescriptor = function (e, t) {
						if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: " + e);
						if (m(e, t)) {
							var n;
							if (n = {
									enumerable: !0,
									configurable: !0
								}, c) {
								var i = e.__proto__;
								e.__proto__ = h;
								var r = s(e, t),
									o = a(e, t);
								if (e.__proto__ = i, r || o) return r && (n.get = r), o && (n.set = o), n
							}
							return n.value = e[t], n
						}
					}
				}(Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function (e) {
					return Object.keys(e)
				}), Object.create) || (g = null === Object.prototype.__proto__ ? function () {
					return {
						__proto__: null
					}
				} : function () {
					var e = {};
					for (var t in e) e[t] = null;
					return e.constructor = e.hasOwnProperty = e.propertyIsEnumerable = e.isPrototypeOf = e.toLocaleString = e.toString = e.valueOf = e.__proto__ = null, e
				}, Object.create = function (e, t) {
					var n;
					if (null === e) n = g();
					else {
						if ("object" != typeof e) throw new TypeError("typeof prototype[" + typeof e + "] != 'object'");
						var i = function () {};
						i.prototype = e, (n = new i).__proto__ = e
					}
					return void 0 !== t && Object.defineProperties(n, t), n
				});

				function C(e) {
					try {
						return Object.defineProperty(e, "sentinel", {}), "sentinel" in e
					} catch (e) {}
				}
				if (Object.defineProperty) {
					var A = C({}),
						R = "undefined" == typeof document || C(document.createElement("div"));
					if (!A || !R) var S = Object.defineProperty
				}
				if (!Object.defineProperty || S) {
					Object.defineProperty = function (e, t, n) {
						if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.defineProperty called on non-object: " + e);
						if ("object" != typeof n && "function" != typeof n || null === n) throw new TypeError("Property description must be an object: " + n);
						if (S) try {
							return S.call(Object, e, t, n)
						} catch (e) {}
						if (m(n, "value"))
							if (c && (s(e, t) || a(e, t))) {
								var i = e.__proto__;
								e.__proto__ = h, delete e[t], e[t] = n.value, e.__proto__ = i
							} else e[t] = n.value;
						else {
							if (!c) throw new TypeError("getters & setters can not be defined on this javascript engine");
							m(n, "get") && r(e, t, n.get), m(n, "set") && o(e, t, n.set)
						}
						return e
					}
				}
				Object.defineProperties || (Object.defineProperties = function (e, t) {
					for (var n in t) m(t, n) && Object.defineProperty(e, n, t[n]);
					return e
				}), Object.seal || (Object.seal = function (e) {
					return e
				}), Object.freeze || (Object.freeze = function (e) {
					return e
				});
				try {
					Object.freeze((function () {}))
				} catch (e) {
					Object.freeze = (v = Object.freeze, function (e) {
						return "function" == typeof e ? e : v(e)
					})
				}
				if (Object.preventExtensions || (Object.preventExtensions = function (e) {
						return e
					}), Object.isSealed || (Object.isSealed = function (e) {
						return !1
					}), Object.isFrozen || (Object.isFrozen = function (e) {
						return !1
					}), Object.isExtensible || (Object.isExtensible = function (e) {
						if (Object(e) === e) throw new TypeError;
						for (var t = ""; m(e, t);) t += "?";
						e[t] = !0;
						var n = m(e, t);
						return delete e[t], n
					}), !Object.keys) {
					var y = !0,
						T = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
						b = T.length;
					for (var w in {
							toString: null
						}) y = !1;
					Object.keys = function (e) {
						if ("object" != typeof e && "function" != typeof e || null === e) throw new TypeError("Object.keys called on a non-object");
						var t = [];
						for (var n in e) m(e, n) && t.push(n);
						if (y)
							for (var i = 0, r = b; i < r; i++) {
								var o = T[i];
								m(e, o) && t.push(o)
							}
						return t
					}
				}
				Date.now || (Date.now = function () {
					return (new Date).getTime()
				});
				var x = "\t\n\v\f\r                　\u2028\u2029\ufeff";
				if (!String.prototype.trim) {
					x = "[" + x + "]";
					var L = new RegExp("^" + x + x + "*"),
						I = new RegExp(x + x + "*$");
					String.prototype.trim = function () {
						return String(this).replace(L, "").replace(I, "")
					}
				}

				function O(e) {
					return (e = +e) != e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (e > 0 || -1) * Math.floor(Math.abs(e))), e
				}
				var F = function (e) {
					if (null == e) throw new TypeError("can't convert " + e + " to object");
					return Object(e)
				}
			})), ace.define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], (function (e, t, n) {
				"use strict";
				e("./regexp"), e("./es5-shim"), "undefined" == typeof Element || Element.prototype.remove || Object.defineProperty(Element.prototype, "remove", {
					enumerable: !1,
					writable: !0,
					configurable: !0,
					value: function () {
						this.parentNode && this.parentNode.removeChild(this)
					}
				})
			})), ace.define("ace/lib/useragent", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				t.OS = {
					LINUX: "LINUX",
					MAC: "MAC",
					WINDOWS: "WINDOWS"
				}, t.getOS = function () {
					return t.isMac ? t.OS.MAC : t.isLinux ? t.OS.LINUX : t.OS.WINDOWS
				};
				var i = "object" == typeof navigator ? navigator : {},
					r = (/mac|win|linux/i.exec(i.platform) || ["other"])[0].toLowerCase(),
					o = i.userAgent || "",
					s = i.appName || "";
				t.isWin = "win" == r, t.isMac = "mac" == r, t.isLinux = "linux" == r, t.isIE = "Microsoft Internet Explorer" == s || s.indexOf("MSAppHost") >= 0 ? parseFloat((o.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((o.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), t.isOldIE = t.isIE && t.isIE < 9, t.isGecko = t.isMozilla = o.match(/ Gecko\/\d+/), t.isOpera = "object" == typeof opera && "[object Opera]" == Object.prototype.toString.call(window.opera), t.isWebKit = parseFloat(o.split("WebKit/")[1]) || void 0, t.isChrome = parseFloat(o.split(" Chrome/")[1]) || void 0, t.isEdge = parseFloat(o.split(" Edge/")[1]) || void 0, t.isAIR = o.indexOf("AdobeAIR") >= 0, t.isAndroid = o.indexOf("Android") >= 0, t.isChromeOS = o.indexOf(" CrOS ") >= 0, t.isIOS = /iPad|iPhone|iPod/.test(o) && !window.MSStream, t.isIOS && (t.isMac = !0), t.isMobile = t.isIOS || t.isAndroid
			})), ace.define("ace/lib/dom", ["require", "exports", "module", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("./useragent");
				if (t.buildDom = function e(t, n, i) {
						if ("string" == typeof t && t) {
							var r = document.createTextNode(t);
							return n && n.appendChild(r), r
						}
						if (!Array.isArray(t)) return t;
						if ("string" != typeof t[0] || !t[0]) {
							for (var o = [], s = 0; s < t.length; s++) {
								var a = e(t[s], n, i);
								a && o.push(a)
							}
							return o
						}
						var c = document.createElement(t[0]),
							l = t[1],
							u = 1;
						l && "object" == typeof l && !Array.isArray(l) && (u = 2);
						for (s = u; s < t.length; s++) e(t[s], c, i);
						return 2 == u && Object.keys(l).forEach((function (e) {
							var t = l[e];
							"class" === e ? c.className = Array.isArray(t) ? t.join(" ") : t : "function" == typeof t || "value" == e ? c[e] = t : "ref" === e ? i && (i[t] = c) : null != t && c.setAttribute(e, t)
						})), n && n.appendChild(c), c
					}, t.getDocumentHead = function (e) {
						return e || (e = document), e.head || e.getElementsByTagName("head")[0] || e.documentElement
					}, t.createElement = function (e, t) {
						return document.createElementNS ? document.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : document.createElement(e)
					}, t.removeChildren = function (e) {
						e.innerHTML = ""
					}, t.createTextNode = function (e, t) {
						return (t ? t.ownerDocument : document).createTextNode(e)
					}, t.createFragment = function (e) {
						return (e ? e.ownerDocument : document).createDocumentFragment()
					}, t.hasCssClass = function (e, t) {
						return -1 !== (e.className + "").split(/\s+/g).indexOf(t)
					}, t.addCssClass = function (e, n) {
						t.hasCssClass(e, n) || (e.className += " " + n)
					}, t.removeCssClass = function (e, t) {
						for (var n = e.className.split(/\s+/g);;) {
							var i = n.indexOf(t);
							if (-1 == i) break;
							n.splice(i, 1)
						}
						e.className = n.join(" ")
					}, t.toggleCssClass = function (e, t) {
						for (var n = e.className.split(/\s+/g), i = !0;;) {
							var r = n.indexOf(t);
							if (-1 == r) break;
							i = !1, n.splice(r, 1)
						}
						return i && n.push(t), e.className = n.join(" "), i
					}, t.setCssClass = function (e, n, i) {
						i ? t.addCssClass(e, n) : t.removeCssClass(e, n)
					}, t.hasCssString = function (e, t) {
						var n, i = 0;
						if (n = (t = t || document).querySelectorAll("style"))
							for (; i < n.length;)
								if (n[i++].id === e) return !0
					}, t.importCssString = function (e, n, i) {
						var r = i;
						i && i.getRootNode && (r = i.getRootNode()) && r != i || (r = document);
						var o = r.ownerDocument || r;
						if (n && t.hasCssString(n, r)) return null;
						n && (e += "\n/*# sourceURL=ace/css/" + n + " */");
						var s = t.createElement("style");
						s.appendChild(o.createTextNode(e)), n && (s.id = n), r == o && (r = t.getDocumentHead(o)), r.insertBefore(s, r.firstChild)
					}, t.importCssStylsheet = function (e, n) {
						t.buildDom(["link", {
							rel: "stylesheet",
							href: e
						}], t.getDocumentHead(n))
					}, t.scrollbarWidth = function (e) {
						var n = t.createElement("ace_inner");
						n.style.width = "100%", n.style.minWidth = "0px", n.style.height = "200px", n.style.display = "block";
						var i = t.createElement("ace_outer"),
							r = i.style;
						r.position = "absolute", r.left = "-10000px", r.overflow = "hidden", r.width = "200px", r.minWidth = "0px", r.height = "150px", r.display = "block", i.appendChild(n);
						var o = e.documentElement;
						o.appendChild(i);
						var s = n.offsetWidth;
						r.overflow = "scroll";
						var a = n.offsetWidth;
						return s == a && (a = i.clientWidth), o.removeChild(i), s - a
					}, "undefined" == typeof document && (t.importCssString = function () {}), t.computedStyle = function (e, t) {
						return window.getComputedStyle(e, "") || {}
					}, t.setStyle = function (e, t, n) {
						e[t] !== n && (e[t] = n)
					}, t.HAS_CSS_ANIMATION = !1, t.HAS_CSS_TRANSFORMS = !1, t.HI_DPI = !i.isWin || "undefined" != typeof window && window.devicePixelRatio >= 1.5, "undefined" != typeof document) {
					var r = document.createElement("div");
					t.HI_DPI && void 0 !== r.style.transform && (t.HAS_CSS_TRANSFORMS = !0), i.isEdge || void 0 === r.style.animationName || (t.HAS_CSS_ANIMATION = !0), r = null
				}
				t.HAS_CSS_TRANSFORMS ? t.translate = function (e, t, n) {
					e.style.transform = "translate(" + Math.round(t) + "px, " + Math.round(n) + "px)"
				} : t.translate = function (e, t, n) {
					e.style.top = Math.round(n) + "px", e.style.left = Math.round(t) + "px"
				}
			})), ace.define("ace/lib/oop", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				t.inherits = function (e, t) {
					e.super_ = t, e.prototype = Object.create(t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					})
				}, t.mixin = function (e, t) {
					for (var n in t) e[n] = t[n];
					return e
				}, t.implement = function (e, n) {
					t.mixin(e, n)
				}
			})), ace.define("ace/lib/keys", ["require", "exports", "module", "ace/lib/oop"], (function (e, t, n) {
				"use strict";
				var i = e("./oop"),
					r = function () {
						var e, t, n = {
							MODIFIER_KEYS: {
								16: "Shift",
								17: "Ctrl",
								18: "Alt",
								224: "Meta",
								91: "MetaLeft",
								92: "MetaRight",
								93: "ContextMenu"
							},
							KEY_MODS: {
								ctrl: 1,
								alt: 2,
								option: 2,
								shift: 4,
								super: 8,
								meta: 8,
								command: 8,
								cmd: 8
							},
							FUNCTION_KEYS: {
								8: "Backspace",
								9: "Tab",
								13: "Return",
								19: "Pause",
								27: "Esc",
								32: "Space",
								33: "PageUp",
								34: "PageDown",
								35: "End",
								36: "Home",
								37: "Left",
								38: "Up",
								39: "Right",
								40: "Down",
								44: "Print",
								45: "Insert",
								46: "Delete",
								96: "Numpad0",
								97: "Numpad1",
								98: "Numpad2",
								99: "Numpad3",
								100: "Numpad4",
								101: "Numpad5",
								102: "Numpad6",
								103: "Numpad7",
								104: "Numpad8",
								105: "Numpad9",
								"-13": "NumpadEnter",
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
								144: "Numlock",
								145: "Scrolllock"
							},
							PRINTABLE_KEYS: {
								32: " ",
								48: "0",
								49: "1",
								50: "2",
								51: "3",
								52: "4",
								53: "5",
								54: "6",
								55: "7",
								56: "8",
								57: "9",
								59: ";",
								61: "=",
								65: "a",
								66: "b",
								67: "c",
								68: "d",
								69: "e",
								70: "f",
								71: "g",
								72: "h",
								73: "i",
								74: "j",
								75: "k",
								76: "l",
								77: "m",
								78: "n",
								79: "o",
								80: "p",
								81: "q",
								82: "r",
								83: "s",
								84: "t",
								85: "u",
								86: "v",
								87: "w",
								88: "x",
								89: "y",
								90: "z",
								107: "+",
								109: "-",
								110: ".",
								186: ";",
								187: "=",
								188: ",",
								189: "-",
								190: ".",
								191: "/",
								192: "`",
								219: "[",
								220: "\\",
								221: "]",
								222: "'",
								111: "/",
								106: "*"
							}
						};
						for (t in n.FUNCTION_KEYS) e = n.FUNCTION_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
						for (t in n.PRINTABLE_KEYS) e = n.PRINTABLE_KEYS[t].toLowerCase(), n[e] = parseInt(t, 10);
						return i.mixin(n, n.MODIFIER_KEYS), i.mixin(n, n.PRINTABLE_KEYS), i.mixin(n, n.FUNCTION_KEYS), n.enter = n.return, n.escape = n.esc, n.del = n.delete, n[173] = "-",
							function () {
								for (var e = ["cmd", "ctrl", "alt", "shift"], t = Math.pow(2, e.length); t--;) n.KEY_MODS[t] = e.filter((function (e) {
									return t & n.KEY_MODS[e]
								})).join("-") + "-"
							}(), n.KEY_MODS[0] = "", n.KEY_MODS[-1] = "input-", n
					}();
				i.mixin(t, r), t.keyCodeToString = function (e) {
					var t = r[e];
					return "string" != typeof t && (t = String.fromCharCode(e)), t.toLowerCase()
				}
			})), ace.define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("./keys"),
					r = e("./useragent"),
					o = null,
					s = 0;
				t.addListener = function (e, t, n) {
					if (e.addEventListener) return e.addEventListener(t, n, !1);
					if (e.attachEvent) {
						var i = function () {
							n.call(e, window.event)
						};
						n._wrapper = i, e.attachEvent("on" + t, i)
					}
				}, t.removeListener = function (e, t, n) {
					if (e.removeEventListener) return e.removeEventListener(t, n, !1);
					e.detachEvent && e.detachEvent("on" + t, n._wrapper || n)
				}, t.stopEvent = function (e) {
					return t.stopPropagation(e), t.preventDefault(e), !1
				}, t.stopPropagation = function (e) {
					e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
				}, t.preventDefault = function (e) {
					e.preventDefault ? e.preventDefault() : e.returnValue = !1
				}, t.getButton = function (e) {
					return "dblclick" == e.type ? 0 : "contextmenu" == e.type || r.isMac && e.ctrlKey && !e.altKey && !e.shiftKey ? 2 : e.preventDefault ? e.button : {
						1: 0,
						2: 2,
						4: 1
					} [e.button]
				}, t.capture = function (e, n, i) {
					function r(e) {
						n && n(e), i && i(e), t.removeListener(document, "mousemove", n, !0), t.removeListener(document, "mouseup", r, !0), t.removeListener(document, "dragstart", r, !0)
					}
					return t.addListener(document, "mousemove", n, !0), t.addListener(document, "mouseup", r, !0), t.addListener(document, "dragstart", r, !0), r
				}, t.addMouseWheelListener = function (e, n) {
					"onmousewheel" in e ? t.addListener(e, "mousewheel", (function (e) {
						void 0 !== e.wheelDeltaX ? (e.wheelX = -e.wheelDeltaX / 8, e.wheelY = -e.wheelDeltaY / 8) : (e.wheelX = 0, e.wheelY = -e.wheelDelta / 8), n(e)
					})) : "onwheel" in e ? t.addListener(e, "wheel", (function (e) {
						switch (e.deltaMode) {
							case e.DOM_DELTA_PIXEL:
								e.wheelX = .35 * e.deltaX || 0, e.wheelY = .35 * e.deltaY || 0;
								break;
							case e.DOM_DELTA_LINE:
							case e.DOM_DELTA_PAGE:
								e.wheelX = 5 * (e.deltaX || 0), e.wheelY = 5 * (e.deltaY || 0)
						}
						n(e)
					})) : t.addListener(e, "DOMMouseScroll", (function (e) {
						e.axis && e.axis == e.HORIZONTAL_AXIS ? (e.wheelX = 5 * (e.detail || 0), e.wheelY = 0) : (e.wheelX = 0, e.wheelY = 5 * (e.detail || 0)), n(e)
					}))
				}, t.addMultiMouseDownListener = function (e, n, i, o) {
					var s, a, c, l = 0,
						u = {
							2: "dblclick",
							3: "tripleclick",
							4: "quadclick"
						};

					function h(e) {
						if (0 !== t.getButton(e) ? l = 0 : e.detail > 1 ? ++l > 4 && (l = 1) : l = 1, r.isIE) {
							var h = Math.abs(e.clientX - s) > 5 || Math.abs(e.clientY - a) > 5;
							c && !h || (l = 1), c && clearTimeout(c), c = setTimeout((function () {
								c = null
							}), n[l - 1] || 600), 1 == l && (s = e.clientX, a = e.clientY)
						}
						if (e._clicks = l, i[o]("mousedown", e), l > 4) l = 0;
						else if (l > 1) return i[o](u[l], e)
					}

					function d(e) {
						l = 2, c && clearTimeout(c), c = setTimeout((function () {
							c = null
						}), n[l - 1] || 600), i[o]("mousedown", e), i[o](u[l], e)
					}
					Array.isArray(e) || (e = [e]), e.forEach((function (e) {
						t.addListener(e, "mousedown", h), r.isOldIE && t.addListener(e, "dblclick", d)
					}))
				};
				var a = !r.isMac || !r.isOpera || "KeyboardEvent" in window ? function (e) {
					return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0)
				} : function (e) {
					return 0 | (e.metaKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.ctrlKey ? 8 : 0)
				};

				function c(e, t, n) {
					var c = a(t);
					if (!r.isMac && o) {
						if (t.getModifierState && (t.getModifierState("OS") || t.getModifierState("Win")) && (c |= 8), o.altGr) {
							if (3 == (3 & c)) return;
							o.altGr = 0
						}
						if (18 === n || 17 === n) {
							var l = "location" in t ? t.location : t.keyLocation;
							if (17 === n && 1 === l) 1 == o[n] && (s = t.timeStamp);
							else if (18 === n && 3 === c && 2 === l) {
								t.timeStamp - s < 50 && (o.altGr = !0)
							}
						}
					}
					if ((n in i.MODIFIER_KEYS && (n = -1), !c && 13 === n) && (3 === (l = "location" in t ? t.location : t.keyLocation) && (e(t, c, -n), t.defaultPrevented))) return;
					if (r.isChromeOS && 8 & c) {
						if (e(t, c, n), t.defaultPrevented) return;
						c &= -9
					}
					return !!(c || n in i.FUNCTION_KEYS || n in i.PRINTABLE_KEYS) && e(t, c, n)
				}

				function l() {
					o = Object.create(null)
				}
				if (t.getModifierString = function (e) {
						return i.KEY_MODS[a(e)]
					}, t.addCommandKeyListener = function (e, n) {
						var i = t.addListener;
						if (r.isOldGecko || r.isOpera && !("KeyboardEvent" in window)) {
							var s = null;
							i(e, "keydown", (function (e) {
								s = e.keyCode
							})), i(e, "keypress", (function (e) {
								return c(n, e, s)
							}))
						} else {
							var a = null;
							i(e, "keydown", (function (e) {
								o[e.keyCode] = (o[e.keyCode] || 0) + 1;
								var t = c(n, e, e.keyCode);
								return a = e.defaultPrevented, t
							})), i(e, "keypress", (function (e) {
								a && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && (t.stopEvent(e), a = null)
							})), i(e, "keyup", (function (e) {
								o[e.keyCode] = null
							})), o || (l(), i(window, "focus", l))
						}
					}, "object" == typeof window && window.postMessage && !r.isOldIE) {
					var u = 1;
					t.nextTick = function (e, n) {
						n = n || window;
						var i = "zero-timeout-message-" + u++,
							r = function (o) {
								o.data == i && (t.stopPropagation(o), t.removeListener(n, "message", r), e())
							};
						t.addListener(n, "message", r), n.postMessage(i, "*")
					}
				}
				t.$idleBlocked = !1, t.onIdle = function (e, n) {
					return setTimeout((function n() {
						t.$idleBlocked ? setTimeout(n, 100) : e()
					}), n)
				}, t.$idleBlockId = null, t.blockIdle = function (e) {
					t.$idleBlockId && clearTimeout(t.$idleBlockId), t.$idleBlocked = !0, t.$idleBlockId = setTimeout((function () {
						t.$idleBlocked = !1
					}), e || 100)
				}, t.nextFrame = "object" == typeof window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), t.nextFrame ? t.nextFrame = t.nextFrame.bind(window) : t.nextFrame = function (e) {
					setTimeout(e, 17)
				}
			})), ace.define("ace/range", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i = function (e, t, n, i) {
					this.start = {
						row: e,
						column: t
					}, this.end = {
						row: n,
						column: i
					}
				};
				(function () {
					this.isEqual = function (e) {
						return this.start.row === e.start.row && this.end.row === e.end.row && this.start.column === e.start.column && this.end.column === e.end.column
					}, this.toString = function () {
						return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
					}, this.contains = function (e, t) {
						return 0 == this.compare(e, t)
					}, this.compareRange = function (e) {
						var t, n = e.end,
							i = e.start;
						return 1 == (t = this.compare(n.row, n.column)) ? 1 == (t = this.compare(i.row, i.column)) ? 2 : 0 == t ? 1 : 0 : -1 == t ? -2 : -1 == (t = this.compare(i.row, i.column)) ? -1 : 1 == t ? 42 : 0
					}, this.comparePoint = function (e) {
						return this.compare(e.row, e.column)
					}, this.containsRange = function (e) {
						return 0 == this.comparePoint(e.start) && 0 == this.comparePoint(e.end)
					}, this.intersects = function (e) {
						var t = this.compareRange(e);
						return -1 == t || 0 == t || 1 == t
					}, this.isEnd = function (e, t) {
						return this.end.row == e && this.end.column == t
					}, this.isStart = function (e, t) {
						return this.start.row == e && this.start.column == t
					}, this.setStart = function (e, t) {
						"object" == typeof e ? (this.start.column = e.column, this.start.row = e.row) : (this.start.row = e, this.start.column = t)
					}, this.setEnd = function (e, t) {
						"object" == typeof e ? (this.end.column = e.column, this.end.row = e.row) : (this.end.row = e, this.end.column = t)
					}, this.inside = function (e, t) {
						return 0 == this.compare(e, t) && (!this.isEnd(e, t) && !this.isStart(e, t))
					}, this.insideStart = function (e, t) {
						return 0 == this.compare(e, t) && !this.isEnd(e, t)
					}, this.insideEnd = function (e, t) {
						return 0 == this.compare(e, t) && !this.isStart(e, t)
					}, this.compare = function (e, t) {
						return this.isMultiLine() || e !== this.start.row ? e < this.start.row ? -1 : e > this.end.row ? 1 : this.start.row === e ? t >= this.start.column ? 0 : -1 : this.end.row === e ? t <= this.end.column ? 0 : 1 : 0 : t < this.start.column ? -1 : t > this.end.column ? 1 : 0
					}, this.compareStart = function (e, t) {
						return this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
					}, this.compareEnd = function (e, t) {
						return this.end.row == e && this.end.column == t ? 1 : this.compare(e, t)
					}, this.compareInside = function (e, t) {
						return this.end.row == e && this.end.column == t ? 1 : this.start.row == e && this.start.column == t ? -1 : this.compare(e, t)
					}, this.clipRows = function (e, t) {
						if (this.end.row > t) var n = {
							row: t + 1,
							column: 0
						};
						else if (this.end.row < e) n = {
							row: e,
							column: 0
						};
						if (this.start.row > t) var r = {
							row: t + 1,
							column: 0
						};
						else if (this.start.row < e) r = {
							row: e,
							column: 0
						};
						return i.fromPoints(r || this.start, n || this.end)
					}, this.extend = function (e, t) {
						var n = this.compare(e, t);
						if (0 == n) return this;
						if (-1 == n) var r = {
							row: e,
							column: t
						};
						else var o = {
							row: e,
							column: t
						};
						return i.fromPoints(r || this.start, o || this.end)
					}, this.isEmpty = function () {
						return this.start.row === this.end.row && this.start.column === this.end.column
					}, this.isMultiLine = function () {
						return this.start.row !== this.end.row
					}, this.clone = function () {
						return i.fromPoints(this.start, this.end)
					}, this.collapseRows = function () {
						return 0 == this.end.column ? new i(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new i(this.start.row, 0, this.end.row, 0)
					}, this.toScreenRange = function (e) {
						var t = e.documentToScreenPosition(this.start),
							n = e.documentToScreenPosition(this.end);
						return new i(t.row, t.column, n.row, n.column)
					}, this.moveBy = function (e, t) {
						this.start.row += e, this.start.column += t, this.end.row += e, this.end.column += t
					}
				}).call(i.prototype), i.fromPoints = function (e, t) {
					return new i(e.row, e.column, t.row, t.column)
				}, i.comparePoints = function (e, t) {
					return e.row - t.row || e.column - t.column
				}, i.comparePoints = function (e, t) {
					return e.row - t.row || e.column - t.column
				}, t.Range = i
			})), ace.define("ace/lib/lang", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				t.last = function (e) {
					return e[e.length - 1]
				}, t.stringReverse = function (e) {
					return e.split("").reverse().join("")
				}, t.stringRepeat = function (e, t) {
					for (var n = ""; t > 0;) 1 & t && (n += e), (t >>= 1) && (e += e);
					return n
				};
				var i = /^\s\s*/,
					r = /\s\s*$/;
				t.stringTrimLeft = function (e) {
					return e.replace(i, "")
				}, t.stringTrimRight = function (e) {
					return e.replace(r, "")
				}, t.copyObject = function (e) {
					var t = {};
					for (var n in e) t[n] = e[n];
					return t
				}, t.copyArray = function (e) {
					for (var t = [], n = 0, i = e.length; n < i; n++) e[n] && "object" == typeof e[n] ? t[n] = this.copyObject(e[n]) : t[n] = e[n];
					return t
				}, t.deepCopy = function e(t) {
					if ("object" != typeof t || !t) return t;
					var n;
					if (Array.isArray(t)) {
						n = [];
						for (var i = 0; i < t.length; i++) n[i] = e(t[i]);
						return n
					}
					if ("[object Object]" !== Object.prototype.toString.call(t)) return t;
					for (var i in n = {}, t) n[i] = e(t[i]);
					return n
				}, t.arrayToMap = function (e) {
					for (var t = {}, n = 0; n < e.length; n++) t[e[n]] = 1;
					return t
				}, t.createMap = function (e) {
					var t = Object.create(null);
					for (var n in e) t[n] = e[n];
					return t
				}, t.arrayRemove = function (e, t) {
					for (var n = 0; n <= e.length; n++) t === e[n] && e.splice(n, 1)
				}, t.escapeRegExp = function (e) {
					return e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
				}, t.escapeHTML = function (e) {
					return ("" + e).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
				}, t.getMatchOffsets = function (e, t) {
					var n = [];
					return e.replace(t, (function (e) {
						n.push({
							offset: arguments[arguments.length - 2],
							length: e.length
						})
					})), n
				}, t.deferredCall = function (e) {
					var t = null,
						n = function () {
							t = null, e()
						},
						i = function (e) {
							return i.cancel(), t = setTimeout(n, e || 0), i
						};
					return i.schedule = i, i.call = function () {
						return this.cancel(), e(), i
					}, i.cancel = function () {
						return clearTimeout(t), t = null, i
					}, i.isPending = function () {
						return t
					}, i
				}, t.delayedCall = function (e, t) {
					var n = null,
						i = function () {
							n = null, e()
						},
						r = function (e) {
							null == n && (n = setTimeout(i, e || t))
						};
					return r.delay = function (e) {
						n && clearTimeout(n), n = setTimeout(i, e || t)
					}, r.schedule = r, r.call = function () {
						this.cancel(), e()
					}, r.cancel = function () {
						n && clearTimeout(n), n = null
					}, r.isPending = function () {
						return n
					}, r
				}
			})), ace.define("ace/clipboard", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i;
				n.exports = {
					lineMode: !1,
					pasteCancelled: function () {
						return !!(i && i > Date.now() - 50) || (i = !1)
					},
					cancel: function () {
						i = Date.now()
					}
				}
			})), ace.define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang", "ace/clipboard", "ace/lib/keys"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/event"),
					r = e("../lib/useragent"),
					o = e("../lib/dom"),
					s = e("../lib/lang"),
					a = e("../clipboard"),
					c = r.isChrome < 18,
					l = r.isIE,
					u = r.isChrome > 63,
					h = e("../lib/keys"),
					d = h.KEY_MODS,
					p = r.isIOS,
					m = p ? /\s/ : /\n/;
				t.TextInput = function (e, t) {
					var n = o.createElement("textarea");
					n.className = "ace_text-input", n.setAttribute("wrap", "off"), n.setAttribute("autocorrect", "off"), n.setAttribute("autocapitalize", "off"), n.setAttribute("spellcheck", !1), n.style.opacity = "0", e.insertBefore(n, e.firstChild);
					var f = !1,
						g = !1,
						v = !1,
						_ = !1,
						E = "";
					r.isMobile || (n.style.fontSize = "1px");
					var C = !1,
						A = !1,
						R = "",
						S = 0,
						y = 0,
						T = 0;
					try {
						var b = document.activeElement === n
					} catch (e) {}
					i.addListener(n, "blur", (function (e) {
						A || (t.onBlur(e), b = !1)
					})), i.addListener(n, "focus", (function (e) {
						if (!A) {
							if (b = !0, r.isEdge) try {
								if (!document.hasFocus()) return
							} catch (e) {}
							t.onFocus(e), r.isEdge ? setTimeout(w) : w()
						}
					})), this.$focusScroll = !1, this.focus = function () {
						if (E || u || "browser" == this.$focusScroll) return n.focus({
							preventScroll: !0
						});
						var e = n.style.top;
						n.style.position = "fixed", n.style.top = "0px";
						try {
							var t = 0 != n.getBoundingClientRect().top
						} catch (e) {
							return
						}
						var i = [];
						if (t)
							for (var r = n.parentElement; r && 1 == r.nodeType;) i.push(r), r.setAttribute("ace_nocontext", !0), r = !r.parentElement && r.getRootNode ? r.getRootNode().host : r.parentElement;
						n.focus({
							preventScroll: !0
						}), t && i.forEach((function (e) {
							e.removeAttribute("ace_nocontext")
						})), setTimeout((function () {
							n.style.position = "", "0px" == n.style.top && (n.style.top = e)
						}), 0)
					}, this.blur = function () {
						n.blur()
					}, this.isFocused = function () {
						return b
					}, t.on("beforeEndOperation", (function () {
						t.curOp && "insertstring" == t.curOp.command.name || (v && (R = n.value = "", k()), w())
					}));
					var w = p ? function (e) {
						if (b && (!f || e) && !_) {
							e || (e = "");
							var i = "\n ab" + e + "cde fg\n";
							i != n.value && (n.value = R = i);
							var r = 4 + (e.length || (t.selection.isEmpty() ? 0 : 1));
							4 == S && y == r || n.setSelectionRange(4, r), S = 4, y = r
						}
					} : function () {
						if (!v && !_ && (b || L)) {
							v = !0;
							var e = t.selection,
								i = e.getRange(),
								r = e.cursor.row,
								o = i.start.column,
								s = i.end.column,
								a = t.session.getLine(r);
							if (i.start.row != r) {
								var c = t.session.getLine(r - 1);
								o = i.start.row < r - 1 ? 0 : o, s += c.length + 1, a = c + "\n" + a
							} else if (i.end.row != r) {
								var l = t.session.getLine(r + 1);
								s = i.end.row > r + 1 ? l.length : s, s += a.length + 1, a = a + "\n" + l
							}
							a.length > 400 && (o < 400 && s < 400 ? a = a.slice(0, 400) : (a = "\n", o = 0, s = 1));
							var u = a + "\n\n";
							if (u != R && (n.value = R = u, S = y = u.length), L && (S = n.selectionStart, y = n.selectionEnd), y != s || S != o || n.selectionEnd != y) try {
								n.setSelectionRange(o, s), S = o, y = s
							} catch (e) {}
							v = !1
						}
					};
					b && t.onFocus();
					var x = null;
					this.setInputHandler = function (e) {
						x = e
					}, this.getInputHandler = function () {
						return x
					};
					var L = !1,
						I = function (e, i) {
							if (L && (L = !1), g) return w(), e && t.onPaste(e), g = !1, "";
							for (var r = n.selectionStart, o = n.selectionEnd, s = S, a = R.length - y, c = e, l = e.length - r, u = e.length - o, h = 0; s > 0 && R[h] == e[h];) h++, s--;
							for (c = c.slice(h), h = 1; a > 0 && R.length - h > S - 1 && R[R.length - h] == e[e.length - h];) h++, a--;
							l -= h - 1, u -= h - 1;
							var d = c.length - h + 1;
							return d < 0 && (s = -d, d = 0), c = c.slice(0, d), i || c || l || s || a || u ? (_ = !0, c && !s && !a && !l && !u || C ? t.onTextInput(c) : t.onTextInput(c, {
								extendLeft: s,
								extendRight: a,
								restoreStart: l,
								restoreEnd: u
							}), _ = !1, R = e, S = r, y = o, T = u, c) : ""
						},
						O = function (e) {
							if (v) return $();
							if (e && e.inputType) {
								if ("historyUndo" == e.inputType) return t.execCommand("undo");
								if ("historyRedo" == e.inputType) return t.execCommand("redo")
							}
							var i = n.value,
								r = I(i, !0);
							(i.length > 500 || m.test(r)) && w()
						},
						F = function (e, t, n) {
							var i = e.clipboardData || window.clipboardData;
							if (i && !c) {
								var r = l || n ? "Text" : "text/plain";
								try {
									return t ? !1 !== i.setData(r, t) : i.getData(r)
								} catch (e) {
									if (!n) return F(e, t, !0)
								}
							}
						},
						M = function (e, r) {
							var o = t.getCopyText();
							if (!o) return i.preventDefault(e);
							F(e, o) ? (p && (w(o), f = o, setTimeout((function () {
								f = !1
							}), 10)), r ? t.onCut() : t.onCopy(), i.preventDefault(e)) : (f = !0, n.value = o, n.select(), setTimeout((function () {
								f = !1, w(), r ? t.onCut() : t.onCopy()
							})))
						},
						N = function (e) {
							M(e, !0)
						},
						P = function (e) {
							M(e, !1)
						},
						B = function (e) {
							var o = F(e);
							a.pasteCancelled() || ("string" == typeof o ? (o && t.onPaste(o, e), r.isIE && setTimeout(w), i.preventDefault(e)) : (n.value = "", g = !0))
						};
					i.addCommandKeyListener(n, t.onCommandKey.bind(t)), i.addListener(n, "select", (function (e) {
						v || (f ? f = !1 : function (e) {
							return 0 === e.selectionStart && e.selectionEnd >= R.length && e.value === R && R && e.selectionEnd !== y
						}(n) && (t.selectAll(), w()))
					})), i.addListener(n, "input", O), i.addListener(n, "cut", N), i.addListener(n, "copy", P), i.addListener(n, "paste", B), "oncut" in n && "oncopy" in n && "onpaste" in n || i.addListener(e, "keydown", (function (e) {
						if ((!r.isMac || e.metaKey) && e.ctrlKey) switch (e.keyCode) {
							case 67:
								P(e);
								break;
							case 86:
								B(e);
								break;
							case 88:
								N(e)
						}
					}));
					var $ = function () {
							if (v && t.onCompositionUpdate && !t.$readOnly) {
								if (C) return D();
								if (v.useTextareaForIME) t.onCompositionUpdate(n.value);
								else {
									var e = n.value;
									I(e), v.markerRange && (v.context && (v.markerRange.start.column = v.selectionStart = v.context.compositionStartOffset), v.markerRange.end.column = v.markerRange.start.column + y - v.selectionStart + T)
								}
							}
						},
						k = function (e) {
							t.onCompositionEnd && !t.$readOnly && (v = !1, t.onCompositionEnd(), t.off("mousedown", D), e && O())
						};

					function D() {
						A = !0, n.blur(), n.focus(), A = !1
					}
					var U, G = s.delayedCall($, 50).schedule.bind(null, null);

					function W() {
						clearTimeout(U), U = setTimeout((function () {
							E && (n.style.cssText = E, E = ""), t.renderer.$isMousePressed = !1, t.renderer.$keepTextAreaAtCursor && t.renderer.$moveTextAreaToCursor()
						}), 0)
					}
					i.addListener(n, "compositionstart", (function (e) {
						if (!v && t.onCompositionStart && !t.$readOnly && (v = {}, !C)) {
							setTimeout($, 0), t.on("mousedown", D);
							var i = t.getSelectionRange();
							i.end.row = i.start.row, i.end.column = i.start.column, v.markerRange = i, v.selectionStart = S, t.onCompositionStart(v), v.useTextareaForIME ? (n.value = "", R = "", S = 0, y = 0) : (n.msGetInputContext && (v.context = n.msGetInputContext()), n.getInputContext && (v.context = n.getInputContext()))
						}
					})), i.addListener(n, "compositionupdate", $), i.addListener(n, "keyup", (function (e) {
						27 == e.keyCode && n.value.length < n.selectionStart && (v || (R = n.value), S = y = -1, w()), G()
					})), i.addListener(n, "keydown", G), i.addListener(n, "compositionend", k), this.getElement = function () {
						return n
					}, this.setCommandMode = function (e) {
						C = e, n.readOnly = !1
					}, this.setReadOnly = function (e) {
						C || (n.readOnly = e)
					}, this.setCopyWithEmptySelection = function (e) {}, this.onContextMenu = function (e) {
						L = !0, w(), t._emit("nativecontextmenu", {
							target: t,
							domEvent: e
						}), this.moveToMouse(e, !0)
					}, this.moveToMouse = function (e, s) {
						E || (E = n.style.cssText), n.style.cssText = (s ? "z-index:100000;" : "") + (r.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (S + y) * t.renderer.characterWidth * .5 + "px;";
						var a = t.container.getBoundingClientRect(),
							c = o.computedStyle(t.container),
							l = a.top + (parseInt(c.borderTopWidth) || 0),
							u = a.left + (parseInt(a.borderLeftWidth) || 0),
							h = a.bottom - l - n.clientHeight - 2,
							d = function (e) {
								o.translate(n, e.clientX - u - 2, Math.min(e.clientY - l - 2, h))
							};
						d(e), "mousedown" == e.type && (t.renderer.$isMousePressed = !0, clearTimeout(U), r.isWin && i.capture(t.container, d, W))
					}, this.onContextMenuClose = W;
					var V = function (e) {
						t.textInput.onContextMenu(e), W()
					};
					i.addListener(n, "mouseup", V), i.addListener(n, "mousedown", (function (e) {
						e.preventDefault(), W()
					})), i.addListener(t.renderer.scroller, "contextmenu", V), i.addListener(n, "contextmenu", V), p && function (e, t, n) {
						var i = null,
							r = !1;
						n.addEventListener("keydown", (function (e) {
							i && clearTimeout(i), r = !0
						}), !0), n.addEventListener("keyup", (function (e) {
							i = setTimeout((function () {
								r = !1
							}), 100)
						}), !0);
						var o = function (e) {
							if (document.activeElement === n && !(r || v || t.$mouseHandler.isMousePressed || f)) {
								var i = n.selectionStart,
									o = n.selectionEnd,
									s = null,
									a = 0;
								if (0 == i ? s = h.up : 1 == i ? s = h.home : o > y && "\n" == R[o] ? s = h.end : i < S && " " == R[i - 1] ? (s = h.left, a = d.option) : i < S || i == S && y != S && i == o ? s = h.left : o > y && R.slice(0, o).split("\n").length > 2 ? s = h.down : o > y && " " == R[o - 1] ? (s = h.right, a = d.option) : (o > y || o == y && y != S && i == o) && (s = h.right), i !== o && (a |= d.shift), s) {
									if (!t.onCommandKey({}, a, s) && t.commands) {
										s = h.keyCodeToString(s);
										var c = t.commands.findKeyCommand(a, s);
										c && t.execCommand(c)
									}
									S = i, y = o, w("")
								}
							}
						};
						document.addEventListener("selectionchange", o), t.on("destroy", (function () {
							document.removeEventListener("selectionchange", o)
						}))
					}(0, t, n)
				}
			})), ace.define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/useragent");

				function r(e) {
					e.$clickSelection = null;
					var t = e.editor;
					t.setDefaultHandler("mousedown", this.onMouseDown.bind(e)), t.setDefaultHandler("dblclick", this.onDoubleClick.bind(e)), t.setDefaultHandler("tripleclick", this.onTripleClick.bind(e)), t.setDefaultHandler("quadclick", this.onQuadClick.bind(e)), t.setDefaultHandler("mousewheel", this.onMouseWheel.bind(e));
					["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"].forEach((function (t) {
						e[t] = this[t]
					}), this), e.selectByLines = this.extendSelectionBy.bind(e, "getLineRange"), e.selectByWords = this.extendSelectionBy.bind(e, "getWordRange")
				}

				function o(e, t) {
					if (e.start.row == e.end.row) var n = 2 * t.column - e.start.column - e.end.column;
					else if (e.start.row != e.end.row - 1 || e.start.column || e.end.column) n = 2 * t.row - e.start.row - e.end.row;
					else var n = t.column - 4;
					return n < 0 ? {
						cursor: e.start,
						anchor: e.end
					} : {
						cursor: e.end,
						anchor: e.start
					}
				}(function () {
					this.onMouseDown = function (e) {
						var t = e.inSelection(),
							n = e.getDocumentPosition();
						this.mousedownEvent = e;
						var r = this.editor,
							o = e.getButton();
						return 0 !== o ? ((r.getSelectionRange().isEmpty() || 1 == o) && r.selection.moveToPosition(n), void(2 == o && (r.textInput.onContextMenu(e.domEvent), i.isMozilla || e.preventDefault()))) : (this.mousedownEvent.time = Date.now(), !t || r.isFocused() || (r.focus(), !this.$focusTimeout || this.$clickSelection || r.inMultiSelectMode) ? (this.captureMouse(e), this.startSelect(n, e.domEvent._clicks > 1), e.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(e)))
					}, this.startSelect = function (e, t) {
						e = e || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
						var n = this.editor;
						this.mousedownEvent && (this.mousedownEvent.getShiftKey() ? n.selection.selectToPosition(e) : t || n.selection.moveToPosition(e), t || this.select(), n.renderer.scroller.setCapture && n.renderer.scroller.setCapture(), n.setStyle("ace_selecting"), this.setState("select"))
					}, this.select = function () {
						var e, t = this.editor,
							n = t.renderer.screenToTextCoordinates(this.x, this.y);
						if (this.$clickSelection) {
							var i = this.$clickSelection.comparePoint(n);
							if (-1 == i) e = this.$clickSelection.end;
							else if (1 == i) e = this.$clickSelection.start;
							else {
								var r = o(this.$clickSelection, n);
								n = r.cursor, e = r.anchor
							}
							t.selection.setSelectionAnchor(e.row, e.column)
						}
						t.selection.selectToPosition(n), t.renderer.scrollCursorIntoView()
					}, this.extendSelectionBy = function (e) {
						var t, n = this.editor,
							i = n.renderer.screenToTextCoordinates(this.x, this.y),
							r = n.selection[e](i.row, i.column);
						if (this.$clickSelection) {
							var s = this.$clickSelection.comparePoint(r.start),
								a = this.$clickSelection.comparePoint(r.end);
							if (-1 == s && a <= 0) t = this.$clickSelection.end, r.end.row == i.row && r.end.column == i.column || (i = r.start);
							else if (1 == a && s >= 0) t = this.$clickSelection.start, r.start.row == i.row && r.start.column == i.column || (i = r.end);
							else if (-1 == s && 1 == a) i = r.end, t = r.start;
							else {
								var c = o(this.$clickSelection, i);
								i = c.cursor, t = c.anchor
							}
							n.selection.setSelectionAnchor(t.row, t.column)
						}
						n.selection.selectToPosition(i), n.renderer.scrollCursorIntoView()
					}, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function () {
						this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture()
					}, this.focusWait = function () {
						var e, t, n, i, r = (e = this.mousedownEvent.x, t = this.mousedownEvent.y, n = this.x, i = this.y, Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))),
							o = Date.now();
						(r > 0 || o - this.mousedownEvent.time > this.$focusTimeout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
					}, this.onDoubleClick = function (e) {
						var t = e.getDocumentPosition(),
							n = this.editor,
							i = n.session.getBracketRange(t);
						i ? (i.isEmpty() && (i.start.column--, i.end.column++), this.setState("select")) : (i = n.selection.getWordRange(t.row, t.column), this.setState("selectByWords")), this.$clickSelection = i, this.select()
					}, this.onTripleClick = function (e) {
						var t = e.getDocumentPosition(),
							n = this.editor;
						this.setState("selectByLines");
						var i = n.getSelectionRange();
						i.isMultiLine() && i.contains(t.row, t.column) ? (this.$clickSelection = n.selection.getLineRange(i.start.row), this.$clickSelection.end = n.selection.getLineRange(i.end.row).end) : this.$clickSelection = n.selection.getLineRange(t.row), this.select()
					}, this.onQuadClick = function (e) {
						var t = this.editor;
						t.selectAll(), this.$clickSelection = t.getSelectionRange(), this.setState("selectAll")
					}, this.onMouseWheel = function (e) {
						if (!e.getAccelKey()) {
							e.getShiftKey() && e.wheelY && !e.wheelX && (e.wheelX = e.wheelY, e.wheelY = 0);
							var t = this.editor;
							this.$lastScroll || (this.$lastScroll = {
								t: 0,
								vx: 0,
								vy: 0,
								allowed: 0
							});
							var n = this.$lastScroll,
								i = e.domEvent.timeStamp,
								r = i - n.t,
								o = r ? e.wheelX / r : n.vx,
								s = r ? e.wheelY / r : n.vy;
							r < 550 && (o = (o + n.vx) / 2, s = (s + n.vy) / 2);
							var a = Math.abs(o / s),
								c = !1;
							if (a >= 1 && t.renderer.isScrollableBy(e.wheelX * e.speed, 0) && (c = !0), a <= 1 && t.renderer.isScrollableBy(0, e.wheelY * e.speed) && (c = !0), c) n.allowed = i;
							else if (i - n.allowed < 550) {
								Math.abs(o) <= 1.5 * Math.abs(n.vx) && Math.abs(s) <= 1.5 * Math.abs(n.vy) ? (c = !0, n.allowed = i) : n.allowed = 0
							}
							return n.t = i, n.vx = o, n.vy = s, c ? (t.renderer.scrollBy(e.wheelX * e.speed, e.wheelY * e.speed), e.stop()) : void 0
						}
					}
				}).call(r.prototype), t.DefaultHandlers = r
			})), ace.define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				e("./lib/oop");
				var i = e("./lib/dom");

				function r(e) {
					this.isOpen = !1, this.$element = null, this.$parentNode = e
				}(function () {
					this.$init = function () {
						return this.$element = i.createElement("div"), this.$element.className = "ace_tooltip", this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element
					}, this.getElement = function () {
						return this.$element || this.$init()
					}, this.setText = function (e) {
						this.getElement().textContent = e
					}, this.setHtml = function (e) {
						this.getElement().innerHTML = e
					}, this.setPosition = function (e, t) {
						this.getElement().style.left = e + "px", this.getElement().style.top = t + "px"
					}, this.setClassName = function (e) {
						i.addCssClass(this.getElement(), e)
					}, this.show = function (e, t, n) {
						null != e && this.setText(e), null != t && null != n && this.setPosition(t, n), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0)
					}, this.hide = function () {
						this.isOpen && (this.getElement().style.display = "none", this.isOpen = !1)
					}, this.getHeight = function () {
						return this.getElement().offsetHeight
					}, this.getWidth = function () {
						return this.getElement().offsetWidth
					}, this.destroy = function () {
						this.isOpen = !1, this.$element && this.$element.parentNode && this.$element.parentNode.removeChild(this.$element)
					}
				}).call(r.prototype), t.Tooltip = r
			})), ace.define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = e("../lib/oop"),
					o = e("../lib/event"),
					s = e("../tooltip").Tooltip;

				function a(e) {
					s.call(this, e)
				}
				r.inherits(a, s),
					function () {
						this.setPosition = function (e, t) {
							var n = window.innerWidth || document.documentElement.clientWidth,
								i = window.innerHeight || document.documentElement.clientHeight,
								r = this.getWidth(),
								o = this.getHeight();
							(e += 15) + r > n && (e -= e + r - n), (t += 15) + o > i && (t -= 20 + o), s.prototype.setPosition.call(this, e, t)
						}
					}.call(a.prototype), t.GutterHandler = function (e) {
						var t, n, r, s = e.editor,
							c = s.renderer.$gutterLayer,
							l = new a(s.container);

						function u() {
							t && (t = clearTimeout(t)), r && (l.hide(), r = null, s._signal("hideGutterTooltip", l), s.removeEventListener("mousewheel", u))
						}

						function h(e) {
							l.setPosition(e.x, e.y)
						}
						e.editor.setDefaultHandler("guttermousedown", (function (t) {
							if (s.isFocused() && 0 == t.getButton() && "foldWidgets" != c.getRegion(t)) {
								var n = t.getDocumentPosition().row,
									i = s.session.selection;
								if (t.getShiftKey()) i.selectTo(n, 0);
								else {
									if (2 == t.domEvent.detail) return s.selectAll(), t.preventDefault();
									e.$clickSelection = s.selection.getLineRange(n)
								}
								return e.setState("selectByLines"), e.captureMouse(t), t.preventDefault()
							}
						})), e.editor.setDefaultHandler("guttermousemove", (function (o) {
							var a = o.domEvent.target || o.domEvent.srcElement;
							if (i.hasCssClass(a, "ace_fold-widget")) return u();
							r && e.$tooltipFollowsMouse && h(o), n = o, t || (t = setTimeout((function () {
								t = null, n && !e.isMousePressed ? function () {
									var t = n.getDocumentPosition().row,
										i = c.$annotations[t];
									if (!i) return u();
									if (t == s.session.getLength()) {
										var o = s.renderer.pixelToScreenCoordinates(0, n.y).row,
											a = n.$pos;
										if (o > s.session.documentToScreenRow(a.row, a.column)) return u()
									}
									if (r != i)
										if (r = i.text.join("<br/>"), l.setHtml(r), l.show(), s._signal("showGutterTooltip", l), s.on("mousewheel", u), e.$tooltipFollowsMouse) h(n);
										else {
											var d = n.domEvent.target.getBoundingClientRect(),
												p = l.getElement().style;
											p.left = d.right + "px", p.top = d.bottom + "px"
										}
								}() : u()
							}), 50))
						})), o.addListener(s.renderer.$gutter, "mouseout", (function (e) {
							n = null, r && !t && (t = setTimeout((function () {
								t = null, u()
							}), 50))
						})), s.on("changeSession", u)
					}
			})), ace.define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/event"),
					r = e("../lib/useragent"),
					o = t.MouseEvent = function (e, t) {
						this.domEvent = e, this.editor = t, this.x = this.clientX = e.clientX, this.y = this.clientY = e.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
					};
				(function () {
					this.stopPropagation = function () {
						i.stopPropagation(this.domEvent), this.propagationStopped = !0
					}, this.preventDefault = function () {
						i.preventDefault(this.domEvent), this.defaultPrevented = !0
					}, this.stop = function () {
						this.stopPropagation(), this.preventDefault()
					}, this.getDocumentPosition = function () {
						return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
					}, this.inSelection = function () {
						if (null !== this.$inSelection) return this.$inSelection;
						var e = this.editor.getSelectionRange();
						if (e.isEmpty()) this.$inSelection = !1;
						else {
							var t = this.getDocumentPosition();
							this.$inSelection = e.contains(t.row, t.column)
						}
						return this.$inSelection
					}, this.getButton = function () {
						return i.getButton(this.domEvent)
					}, this.getShiftKey = function () {
						return this.domEvent.shiftKey
					}, this.getAccelKey = r.isMac ? function () {
						return this.domEvent.metaKey
					} : function () {
						return this.domEvent.ctrlKey
					}
				}).call(o.prototype)
			})), ace.define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = e("../lib/event"),
					o = e("../lib/useragent"),
					s = 200,
					a = 200,
					c = 5;

				function l(e) {
					var t = e.editor,
						n = i.createElement("img");
					n.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", o.isOpera && (n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
					["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"].forEach((function (t) {
						e[t] = this[t]
					}), this), t.addEventListener("mousedown", this.onMouseDown.bind(e));
					var l, h, d, p, m, f, g, v, _, E, C, A = t.container,
						R = 0;

					function S() {
						var e = f;
						(function (e, n) {
							var i = Date.now(),
								r = !n || e.row != n.row,
								o = !n || e.column != n.column;
							!E || r || o ? (t.moveCursorToPosition(e), E = i, C = {
								x: h,
								y: d
							}) : u(C.x, C.y, h, d) > c ? E = null : i - E >= a && (t.renderer.scrollCursorIntoView(), E = null)
						})(f = t.renderer.screenToTextCoordinates(h, d), e),
						function (e, n) {
							var i = Date.now(),
								r = t.renderer.layerConfig.lineHeight,
								o = t.renderer.layerConfig.characterWidth,
								a = t.renderer.scroller.getBoundingClientRect(),
								c = {
									x: {
										left: h - a.left,
										right: a.right - h
									},
									y: {
										top: d - a.top,
										bottom: a.bottom - d
									}
								},
								l = Math.min(c.x.left, c.x.right),
								u = Math.min(c.y.top, c.y.bottom),
								p = {
									row: e.row,
									column: e.column
								};
							l / o <= 2 && (p.column += c.x.left < c.x.right ? -3 : 2), u / r <= 1 && (p.row += c.y.top < c.y.bottom ? -1 : 1);
							var m = e.row != p.row,
								f = e.column != p.column,
								g = !n || e.row != n.row;
							m || f && !g ? _ ? i - _ >= s && t.renderer.scrollCursorIntoView(p) : _ = i : _ = null
						}(f, e)
					}

					function y() {
						m = t.selection.toOrientedRange(), l = t.session.addMarker(m, "ace_selection", t.getSelectionStyle()), t.clearSelection(), t.isFocused() && t.renderer.$cursorLayer.setBlinking(!1), clearInterval(p), S(), p = setInterval(S, 20), R = 0, r.addListener(document, "mousemove", w)
					}

					function T() {
						clearInterval(p), t.session.removeMarker(l), l = null, t.selection.fromOrientedRange(m), t.isFocused() && !v && t.$resetCursorStyle(), m = null, f = null, R = 0, _ = null, E = null, r.removeListener(document, "mousemove", w)
					}
					this.onDragStart = function (e) {
						if (this.cancelDrag || !A.draggable) {
							var i = this;
							return setTimeout((function () {
								i.startSelect(), i.captureMouse(e)
							}), 0), e.preventDefault()
						}
						m = t.getSelectionRange();
						var r = e.dataTransfer;
						r.effectAllowed = t.getReadOnly() ? "copy" : "copyMove", o.isOpera && (t.container.appendChild(n), n.scrollTop = 0), r.setDragImage && r.setDragImage(n, 0, 0), o.isOpera && t.container.removeChild(n), r.clearData(), r.setData("Text", t.session.getTextRange()), v = !0, this.setState("drag")
					}, this.onDragEnd = function (e) {
						if (A.draggable = !1, v = !1, this.setState(null), !t.getReadOnly()) {
							var n = e.dataTransfer.dropEffect;
							g || "move" != n || t.session.remove(t.getSelectionRange()), t.$resetCursorStyle()
						}
						this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("")
					}, this.onDragEnter = function (e) {
						if (!t.getReadOnly() && x(e.dataTransfer)) return h = e.clientX, d = e.clientY, l || y(), R++, e.dataTransfer.dropEffect = g = L(e), r.preventDefault(e)
					}, this.onDragOver = function (e) {
						if (!t.getReadOnly() && x(e.dataTransfer)) return h = e.clientX, d = e.clientY, l || (y(), R++), null !== b && (b = null), e.dataTransfer.dropEffect = g = L(e), r.preventDefault(e)
					}, this.onDragLeave = function (e) {
						if (--R <= 0 && l) return T(), g = null, r.preventDefault(e)
					}, this.onDrop = function (e) {
						if (f) {
							var n = e.dataTransfer;
							if (v) switch (g) {
								case "move":
									m = m.contains(f.row, f.column) ? {
										start: f,
										end: f
									} : t.moveText(m, f);
									break;
								case "copy":
									m = t.moveText(m, f, !0)
							} else {
								var i = n.getData("Text");
								m = {
									start: f,
									end: t.session.insert(f, i)
								}, t.focus(), g = null
							}
							return T(), r.preventDefault(e)
						}
					}, r.addListener(A, "dragstart", this.onDragStart.bind(e)), r.addListener(A, "dragend", this.onDragEnd.bind(e)), r.addListener(A, "dragenter", this.onDragEnter.bind(e)), r.addListener(A, "dragover", this.onDragOver.bind(e)), r.addListener(A, "dragleave", this.onDragLeave.bind(e)), r.addListener(A, "drop", this.onDrop.bind(e));
					var b = null;

					function w() {
						null == b && (b = setTimeout((function () {
							null != b && l && T()
						}), 20))
					}

					function x(e) {
						var t = e.types;
						return !t || Array.prototype.some.call(t, (function (e) {
							return "text/plain" == e || "Text" == e
						}))
					}

					function L(e) {
						var t = ["copy", "copymove", "all", "uninitialized"],
							n = o.isMac ? e.altKey : e.ctrlKey,
							i = "uninitialized";
						try {
							i = e.dataTransfer.effectAllowed.toLowerCase()
						} catch (e) {}
						var r = "none";
						return n && t.indexOf(i) >= 0 ? r = "copy" : ["move", "copymove", "linkmove", "all", "uninitialized"].indexOf(i) >= 0 ? r = "move" : t.indexOf(i) >= 0 && (r = "copy"), r
					}
				}

				function u(e, t, n, i) {
					return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2))
				}(function () {
					this.dragWait = function () {
						Date.now() - this.mousedownEvent.time > this.editor.getDragDelay() && this.startDrag()
					}, this.dragWaitEnd = function () {
						this.editor.container.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd()
					}, this.dragReadyEnd = function (e) {
						this.editor.$resetCursorStyle(), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd()
					}, this.startDrag = function () {
						this.cancelDrag = !1;
						var e = this.editor;
						e.container.draggable = !0, e.renderer.$cursorLayer.setBlinking(!1), e.setStyle("ace_dragging");
						var t = o.isWin ? "default" : "move";
						e.renderer.setCursorStyle(t), this.setState("dragReady")
					}, this.onMouseDrag = function (e) {
						var t = this.editor.container;
						o.isIE && "dragReady" == this.state && (u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 3 && t.dragDrop());
						"dragWait" === this.state && (u(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > 0 && (t.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition())))
					}, this.onMouseDown = function (e) {
						if (this.$dragEnabled) {
							this.mousedownEvent = e;
							var t = this.editor,
								n = e.inSelection(),
								i = e.getButton();
							if (1 === (e.domEvent.detail || 1) && 0 === i && n) {
								if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey())) return;
								this.mousedownEvent.time = Date.now();
								var r = e.domEvent.target || e.domEvent.srcElement;
								if ("unselectable" in r && (r.unselectable = "on"), t.getDragDelay()) {
									if (o.isWebKit) this.cancelDrag = !0, t.container.draggable = !0;
									this.setState("dragWait")
								} else this.startDrag();
								this.captureMouse(e, this.onMouseDrag.bind(this)), e.defaultPrevented = !0
							}
						}
					}
				}).call(l.prototype), t.DragdropHandler = l
			})), ace.define("ace/mouse/touch_handler", ["require", "exports", "module", "ace/mouse/mouse_event", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("./mouse_event").MouseEvent,
					r = e("../lib/dom");
				t.addTouchListeners = function (e, t) {
					var n, o, s, a, c, l, u, h, d, p = "scroll",
						m = 0,
						f = 0,
						g = 0,
						v = 0;

					function _() {
						var e = window.navigator && window.navigator.clipboard,
							n = !1,
							i = function (i) {
								var o, s, a = i.target.getAttribute("action");
								if ("more" == a || !n) return n = !n, o = t.getCopyText(), s = t.session.getUndoManager().hasUndo(), void d.replaceChild(r.buildDom(n ? ["span", !o && ["span", {
										class: "ace_mobile-button",
										action: "selectall"
									}, "Select All"], o && ["span", {
										class: "ace_mobile-button",
										action: "copy"
									}, "Copy"], o && ["span", {
										class: "ace_mobile-button",
										action: "cut"
									}, "Cut"], e && ["span", {
										class: "ace_mobile-button",
										action: "paste"
									}, "Paste"], s && ["span", {
										class: "ace_mobile-button",
										action: "undo"
									}, "Undo"],
									["span", {
										class: "ace_mobile-button",
										action: "find"
									}, "Find"],
									["span", {
										class: "ace_mobile-button",
										action: "openCommandPallete"
									}, "Pallete"]
								] : ["span"]), d.firstChild);
								"paste" == a ? e.readText().then((function (e) {
									t.execCommand(a, e)
								})) : a && ("cut" != a && "copy" != a || (e ? e.writeText(t.getCopyText()) : document.execCommand("copy")), t.execCommand(a)), d.firstChild.style.display = "none", n = !1, "openCommandPallete" != a && t.focus()
							};
						d = r.buildDom(["div", {
								class: "ace_mobile-menu",
								ontouchstart: function (e) {
									p = "menu", e.stopPropagation(), e.preventDefault(), t.textInput.focus()
								},
								ontouchend: function (e) {
									e.stopPropagation(), e.preventDefault(), i(e)
								},
								onclick: i
							},
							["span"],
							["span", {
								class: "ace_mobile-button",
								action: "more"
							}, "..."]
						], t.container)
					}

					function E() {
						d || _();
						var e = t.selection.cursor,
							n = t.renderer.textToScreenCoordinates(e.row, e.column),
							i = t.container.getBoundingClientRect();
						d.style.top = n.pageY - i.top - 3 + "px", d.style.right = "10px", d.style.display = "", d.firstChild.style.display = "none", t.on("input", C)
					}

					function C(e) {
						d && (d.style.display = "none"), t.off("input", C)
					}

					function A() {
						c = null, clearTimeout(c);
						var e = t.selection.getRange(),
							n = e.contains(u.row, u.column);
						!e.isEmpty() && n || (t.selection.moveToPosition(u), t.selection.selectWord()), p = "wait", E()
					}
					e.addEventListener("contextmenu", (function (e) {
						h && t.textInput.getElement().focus()
					})), e.addEventListener("touchstart", (function (e) {
						var r = e.touches;
						if (c || r.length > 1) return clearTimeout(c), c = null, s = -1, void(p = "zoom");
						h = t.$mouseHandler.isMousePressed = !0;
						var l = t.renderer.layerConfig.lineHeight,
							d = t.renderer.layerConfig.lineHeight,
							_ = e.timeStamp;
						a = _;
						var E = r[0],
							C = E.clientX,
							R = E.clientY;
						Math.abs(n - C) + Math.abs(o - R) > l && (s = -1), n = e.clientX = C, o = e.clientY = R, g = v = 0;
						var S = new i(e, t);
						if (u = S.getDocumentPosition(), _ - s < 500 && 1 == r.length && !m) f++, e.preventDefault(), e.button = 0,
							function () {
								c = null, clearTimeout(c), t.selection.moveToPosition(u);
								var e = f >= 2 ? t.selection.getLineRange(u.row) : t.session.getBracketRange(u);
								e && !e.isEmpty() ? t.selection.setRange(e) : t.selection.selectWord(), p = "wait"
							}();
						else {
							f = 0;
							var y = t.selection.cursor,
								T = t.selection.isEmpty() ? y : t.selection.anchor,
								b = t.renderer.$cursorLayer.getPixelPosition(y, !0),
								w = t.renderer.$cursorLayer.getPixelPosition(T, !0),
								x = t.renderer.scroller.getBoundingClientRect(),
								L = function (e, t) {
									return (e /= d) * e + (t = t / l - .75) * t
								};
							if (e.clientX < x.left) return void(p = "zoom");
							var I = L(e.clientX - x.left - b.left, e.clientY - x.top - b.top),
								O = L(e.clientX - x.left - w.left, e.clientY - x.top - w.top);
							I < 3.5 && O < 3.5 && (p = I > O ? "cursor" : "anchor"), p = O < 3.5 ? "anchor" : I < 3.5 ? "cursor" : "scroll", c = setTimeout(A, 450)
						}
						s = _
					})), e.addEventListener("touchend", (function (e) {
						h = t.$mouseHandler.isMousePressed = !1, l && clearInterval(l), "zoom" == p ? (p = "", m = 0) : c ? (t.selection.moveToPosition(u), m = 0, E()) : "scroll" == p ? (m += 60, l = setInterval((function () {
							m-- <= 0 && (clearInterval(l), l = null), Math.abs(g) < .01 && (g = 0), Math.abs(v) < .01 && (v = 0), m < 20 && (g *= .9), m < 20 && (v *= .9);
							var e = t.session.getScrollTop();
							t.renderer.scrollBy(10 * g, 10 * v), e == t.session.getScrollTop() && (m = 0)
						}), 10), e.preventDefault(), C()) : E(), clearTimeout(c), c = null
					})), e.addEventListener("touchmove", (function (e) {
						c && (clearTimeout(c), c = null);
						var r = e.touches;
						if (!(r.length > 1 || "zoom" == p)) {
							var s = r[0],
								l = n - s.clientX,
								u = o - s.clientY;
							if ("wait" == p) {
								if (!(l * l + u * u > 4)) return e.preventDefault();
								p = "cursor"
							}
							n = s.clientX, o = s.clientY, e.clientX = s.clientX, e.clientY = s.clientY;
							var h = e.timeStamp,
								d = h - a;
							if (a = h, "scroll" == p) {
								var m = new i(e, t);
								m.speed = 1, m.wheelX = l, m.wheelY = u, 10 * Math.abs(l) < Math.abs(u) && (l = 0), 10 * Math.abs(u) < Math.abs(l) && (u = 0), 0 != d && (g = l / d, v = u / d), t._emit("mousewheel", m), m.propagationStopped || (g = v = 0)
							} else {
								var f = new i(e, t).getDocumentPosition();
								"cursor" == p ? t.selection.moveCursorToPosition(f) : "anchor" == p && t.selection.setSelectionAnchor(f.row, f.column), t.renderer.scrollCursorIntoView(f), e.preventDefault()
							}
						}
					}))
				}
			})), ace.define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("./dom");
				t.get = function (e, t) {
					var n = new XMLHttpRequest;
					n.open("GET", e, !0), n.onreadystatechange = function () {
						4 === n.readyState && t(n.responseText)
					}, n.send(null)
				}, t.loadScript = function (e, t) {
					var n = i.getDocumentHead(),
						r = document.createElement("script");
					r.src = e, n.appendChild(r), r.onload = r.onreadystatechange = function (e, n) {
						!n && r.readyState && "loaded" != r.readyState && "complete" != r.readyState || (r = r.onload = r.onreadystatechange = null, n || t())
					}
				}, t.qualifyURL = function (e) {
					var t = document.createElement("a");
					return t.href = e, t.href
				}
			})), ace.define("ace/lib/event_emitter", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i = {},
					r = function () {
						this.propagationStopped = !0
					},
					o = function () {
						this.defaultPrevented = !0
					};
				i._emit = i._dispatchEvent = function (e, t) {
					this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
					var n = this._eventRegistry[e] || [],
						i = this._defaultHandlers[e];
					if (n.length || i) {
						"object" == typeof t && t || (t = {}), t.type || (t.type = e), t.stopPropagation || (t.stopPropagation = r), t.preventDefault || (t.preventDefault = o), n = n.slice();
						for (var s = 0; s < n.length && (n[s](t, this), !t.propagationStopped); s++);
						return i && !t.defaultPrevented ? i(t, this) : void 0
					}
				}, i._signal = function (e, t) {
					var n = (this._eventRegistry || {})[e];
					if (n) {
						n = n.slice();
						for (var i = 0; i < n.length; i++) n[i](t, this)
					}
				}, i.once = function (e, t) {
					var n = this;
					if (this.addEventListener(e, (function i() {
							n.removeEventListener(e, i), t.apply(null, arguments)
						})), !t) return new Promise((function (e) {
						t = e
					}))
				}, i.setDefaultHandler = function (e, t) {
					var n = this._defaultHandlers;
					if (n || (n = this._defaultHandlers = {
							_disabled_: {}
						}), n[e]) {
						var i = n[e],
							r = n._disabled_[e];
						r || (n._disabled_[e] = r = []), r.push(i);
						var o = r.indexOf(t); - 1 != o && r.splice(o, 1)
					}
					n[e] = t
				}, i.removeDefaultHandler = function (e, t) {
					var n = this._defaultHandlers;
					if (n) {
						var i = n._disabled_[e];
						if (n[e] == t) i && this.setDefaultHandler(e, i.pop());
						else if (i) {
							var r = i.indexOf(t); - 1 != r && i.splice(r, 1)
						}
					}
				}, i.on = i.addEventListener = function (e, t, n) {
					this._eventRegistry = this._eventRegistry || {};
					var i = this._eventRegistry[e];
					return i || (i = this._eventRegistry[e] = []), -1 == i.indexOf(t) && i[n ? "unshift" : "push"](t), t
				}, i.off = i.removeListener = i.removeEventListener = function (e, t) {
					this._eventRegistry = this._eventRegistry || {};
					var n = this._eventRegistry[e];
					if (n) {
						var i = n.indexOf(t); - 1 !== i && n.splice(i, 1)
					}
				}, i.removeAllListeners = function (e) {
					this._eventRegistry && (this._eventRegistry[e] = [])
				}, t.EventEmitter = i
			})), ace.define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], (function (e, t, n) {
				var i = e("./oop"),
					r = e("./event_emitter").EventEmitter,
					o = {
						setOptions: function (e) {
							Object.keys(e).forEach((function (t) {
								this.setOption(t, e[t])
							}), this)
						},
						getOptions: function (e) {
							var t = {};
							if (e) Array.isArray(e) || (t = e, e = Object.keys(t));
							else {
								var n = this.$options;
								e = Object.keys(n).filter((function (e) {
									return !n[e].hidden
								}))
							}
							return e.forEach((function (e) {
								t[e] = this.getOption(e)
							}), this), t
						},
						setOption: function (e, t) {
							if (this["$" + e] !== t) {
								var n = this.$options[e];
								if (!n) return s('misspelled option "' + e + '"');
								if (n.forwardTo) return this[n.forwardTo] && this[n.forwardTo].setOption(e, t);
								n.handlesSet || (this["$" + e] = t), n && n.set && n.set.call(this, t)
							}
						},
						getOption: function (e) {
							var t = this.$options[e];
							return t ? t.forwardTo ? this[t.forwardTo] && this[t.forwardTo].getOption(e) : t && t.get ? t.get.call(this) : this["$" + e] : s('misspelled option "' + e + '"')
						}
					};

				function s(e) {
					"undefined" != typeof console && console.warn && console.warn.apply(console, arguments)
				}

				function a(e, t) {
					var n = new Error(e);
					n.data = t, "object" == typeof console && console.error && console.error(n), setTimeout((function () {
						throw n
					}))
				}
				var c = function () {
					this.$defaultOptions = {}
				};
				(function () {
					i.implement(this, r), this.defineOptions = function (e, t, n) {
						return e.$options || (this.$defaultOptions[t] = e.$options = {}), Object.keys(n).forEach((function (t) {
							var i = n[t];
							"string" == typeof i && (i = {
								forwardTo: i
							}), i.name || (i.name = t), e.$options[i.name] = i, "initialValue" in i && (e["$" + i.name] = i.initialValue)
						})), i.implement(e, o), this
					}, this.resetOptions = function (e) {
						Object.keys(e.$options).forEach((function (t) {
							var n = e.$options[t];
							"value" in n && e.setOption(t, n.value)
						}))
					}, this.setDefaultValue = function (e, t, n) {
						if (!e) {
							for (e in this.$defaultOptions)
								if (this.$defaultOptions[e][t]) break;
							if (!this.$defaultOptions[e][t]) return !1
						}
						var i = this.$defaultOptions[e] || (this.$defaultOptions[e] = {});
						i[t] && (i.forwardTo ? this.setDefaultValue(i.forwardTo, t, n) : i[t].value = n)
					}, this.setDefaultValues = function (e, t) {
						Object.keys(t).forEach((function (n) {
							this.setDefaultValue(e, n, t[n])
						}), this)
					}, this.warn = s, this.reportError = a
				}).call(c.prototype), t.AppConfig = c
			})), ace.define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/app_config"], (function (e, t, i) {
				var r = e("./lib/lang"),
					o = (e("./lib/oop"), e("./lib/net")),
					s = e("./lib/app_config").AppConfig;
				i.exports = t = new s;
				var a = function () {
						return this || "undefined" != typeof window && window
					}(),
					c = {
						packaged: !1,
						workerPath: null,
						modePath: null,
						themePath: null,
						basePath: "",
						suffix: ".js",
						$moduleUrls: {},
						loadWorkerFromBlob: !0,
						sharedPopups: !1
					};
				t.get = function (e) {
					if (!c.hasOwnProperty(e)) throw new Error("Unknown config key: " + e);
					return c[e]
				}, t.set = function (e, t) {
					if (c.hasOwnProperty(e)) c[e] = t;
					else if (0 == this.setDefaultValue("", e, t)) throw new Error("Unknown config key: " + e)
				}, t.all = function () {
					return r.copyObject(c)
				}, t.$modes = {}, t.moduleUrl = function (e, t) {
					if (c.$moduleUrls[e]) return c.$moduleUrls[e];
					var n = e.split("/"),
						i = "snippets" == (t = t || n[n.length - 2] || "") ? "/" : "-",
						r = n[n.length - 1];
					if ("worker" == t && "-" == i) {
						var o = new RegExp("^" + t + "[\\-_]|[\\-_]" + t + "$", "g");
						r = r.replace(o, "")
					}(!r || r == t) && n.length > 1 && (r = n[n.length - 2]);
					var s = c[t + "Path"];
					return null == s ? s = c.basePath : "/" == i && (t = i = ""), s && "/" != s.slice(-1) && (s += "/"), s + t + i + r + this.get("suffix")
				}, t.setModuleUrl = function (e, t) {
					return c.$moduleUrls[e] = t
				}, t.$loading = {}, t.loadModule = function (n, i) {
					var r, s;
					Array.isArray(n) && (s = n[0], n = n[1]);
					try {
						r = e(n)
					} catch (e) {}
					if (r && !t.$loading[n]) return i && i(r);
					if (t.$loading[n] || (t.$loading[n] = []), t.$loading[n].push(i), !(t.$loading[n].length > 1)) {
						var a = function () {
							e([n], (function (e) {
								t._emit("load.module", {
									name: n,
									module: e
								});
								var i = t.$loading[n];
								t.$loading[n] = null, i.forEach((function (t) {
									t && t(e)
								}))
							}))
						};
						if (!t.get("packaged")) return a();
						o.loadScript(t.moduleUrl(n, s), a), l()
					}
				};
				var l = function () {
					c.basePath || c.workerPath || c.modePath || c.themePath || Object.keys(c.$moduleUrls).length || (console.error("Unable to infer path to ace from script src,", "use ace.config.set('basePath', 'path') to enable dynamic loading of modes and themes", "or with webpack use ace/webpack-resolver"), l = function () {})
				};

				function u(r) {
					if (a && a.document) {
						c.packaged = r || e.packaged || i.packaged || a.define && n(3).packaged;
						for (var o, s = {}, l = "", u = document.currentScript || document._currentScript, h = (u && u.ownerDocument || document).getElementsByTagName("script"), d = 0; d < h.length; d++) {
							var p = h[d],
								m = p.src || p.getAttribute("src");
							if (m) {
								for (var f = p.attributes, g = 0, v = f.length; g < v; g++) {
									var _ = f[g];
									0 === _.name.indexOf("data-ace-") && (s[(o = _.name.replace(/^data-ace-/, ""), o.replace(/-(.)/g, (function (e, t) {
										return t.toUpperCase()
									})))] = _.value)
								}
								var E = m.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
								E && (l = E[1])
							}
						}
						for (var C in l && (s.base = s.base || l, s.packaged = !0), s.basePath = s.base, s.workerPath = s.workerPath || s.base, s.modePath = s.modePath || s.base, s.themePath = s.themePath || s.base, delete s.base, s) void 0 !== s[C] && t.set(C, s[C])
					}
				}
				u(!0), t.init = u, t.version = "1.4.7"
			})), ace.define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/mouse/touch_handler", "ace/config"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/event"),
					r = e("../lib/useragent"),
					o = e("./default_handlers").DefaultHandlers,
					s = e("./default_gutter_handler").GutterHandler,
					a = e("./mouse_event").MouseEvent,
					c = e("./dragdrop_handler").DragdropHandler,
					l = e("./touch_handler").addTouchListeners,
					u = e("../config"),
					h = function (e) {
						var t = this;
						this.editor = e, new o(this), new s(this), new c(this);
						var n = function (t) {
								(!document.hasFocus || !document.hasFocus() || !e.isFocused() && document.activeElement == (e.textInput && e.textInput.getElement())) && window.focus(), e.focus()
							},
							a = e.renderer.getMouseEventTarget();
						i.addListener(a, "click", this.onMouseEvent.bind(this, "click")), i.addListener(a, "mousemove", this.onMouseMove.bind(this, "mousemove")), i.addMultiMouseDownListener([a, e.renderer.scrollBarV && e.renderer.scrollBarV.inner, e.renderer.scrollBarH && e.renderer.scrollBarH.inner, e.textInput && e.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent"), i.addMouseWheelListener(e.container, this.onMouseWheel.bind(this, "mousewheel")), l(e.container, e);
						var u = e.renderer.$gutter;
						i.addListener(u, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), i.addListener(u, "click", this.onMouseEvent.bind(this, "gutterclick")), i.addListener(u, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), i.addListener(u, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), i.addListener(a, "mousedown", n), i.addListener(u, "mousedown", n), r.isIE && e.renderer.scrollBarV && (i.addListener(e.renderer.scrollBarV.element, "mousedown", n), i.addListener(e.renderer.scrollBarH.element, "mousedown", n)), e.on("mousemove", (function (n) {
							if (!t.state && !t.$dragDelay && t.$dragEnabled) {
								var i = e.renderer.screenToTextCoordinates(n.x, n.y),
									r = e.session.selection.getRange(),
									o = e.renderer;
								!r.isEmpty() && r.insideStart(i.row, i.column) ? o.setCursorStyle("default") : o.setCursorStyle("")
							}
						}))
					};
				(function () {
					this.onMouseEvent = function (e, t) {
						this.editor._emit(e, new a(t, this.editor))
					}, this.onMouseMove = function (e, t) {
						var n = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
						n && n.length && this.editor._emit(e, new a(t, this.editor))
					}, this.onMouseWheel = function (e, t) {
						var n = new a(t, this.editor);
						n.speed = 2 * this.$scrollSpeed, n.wheelX = t.wheelX, n.wheelY = t.wheelY, this.editor._emit(e, n)
					}, this.setState = function (e) {
						this.state = e
					}, this.captureMouse = function (e, t) {
						this.x = e.x, this.y = e.y, this.isMousePressed = !0;
						var n = this.editor,
							o = this.editor.renderer;
						o.$isMousePressed = !0;
						var s = this,
							c = function (e) {
								if (e) {
									if (r.isWebKit && !e.which && s.releaseMouse) return s.releaseMouse();
									s.x = e.clientX, s.y = e.clientY, t && t(e), s.mouseEvent = new a(e, s.editor), s.$mouseMoved = !0
								}
							},
							l = function (e) {
								n.off("beforeEndOperation", h), clearInterval(d), u(), s[s.state + "End"] && s[s.state + "End"](e), s.state = "", s.isMousePressed = o.$isMousePressed = !1, o.$keepTextAreaAtCursor && o.$moveTextAreaToCursor(), s.$onCaptureMouseMove = s.releaseMouse = null, e && s.onMouseEvent("mouseup", e), n.endOperation()
							},
							u = function () {
								s[s.state] && s[s.state](), s.$mouseMoved = !1
							};
						if (r.isOldIE && "dblclick" == e.domEvent.type) return setTimeout((function () {
							l(e)
						}));
						var h = function (e) {
							s.releaseMouse && n.curOp.command.name && n.curOp.selectionChanged && (s[s.state + "End"] && s[s.state + "End"](), s.state = "", s.releaseMouse())
						};
						n.on("beforeEndOperation", h), n.startOperation({
							command: {
								name: "mouse"
							}
						}), s.$onCaptureMouseMove = c, s.releaseMouse = i.capture(this.editor.container, c, l);
						var d = setInterval(u, 20)
					}, this.releaseMouse = null, this.cancelContextMenu = function () {
						var e = function (t) {
							t && t.domEvent && "contextmenu" != t.domEvent.type || (this.editor.off("nativecontextmenu", e), t && t.domEvent && i.stopEvent(t.domEvent))
						}.bind(this);
						setTimeout(e, 10), this.editor.on("nativecontextmenu", e)
					}
				}).call(h.prototype), u.defineOptions(h.prototype, "mouseHandler", {
					scrollSpeed: {
						initialValue: 2
					},
					dragDelay: {
						initialValue: r.isMac ? 150 : 0
					},
					dragEnabled: {
						initialValue: !0
					},
					focusTimeout: {
						initialValue: 0
					},
					tooltipFollowsMouse: {
						initialValue: !0
					}
				}), t.MouseHandler = h
			})), ace.define("ace/mouse/fold_handler", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom");
				t.FoldHandler = function (e) {
					e.on("click", (function (t) {
						var n = t.getDocumentPosition(),
							r = e.session,
							o = r.getFoldAt(n.row, n.column, 1);
						o && (t.getAccelKey() ? r.removeFold(o) : r.expandFold(o), t.stop());
						var s = t.domEvent && t.domEvent.target;
						s && i.hasCssClass(s, "ace_inline_button") && i.hasCssClass(s, "ace_toggle_wrap") && (r.setOption("wrap", !r.getUseWrapMode()), e.renderer.scrollCursorIntoView())
					})), e.on("gutterclick", (function (t) {
						if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
							var n = t.getDocumentPosition().row,
								i = e.session;
							i.foldWidgets && i.foldWidgets[n] && e.session.onFoldWidgetClick(n, t), e.isFocused() || e.focus(), t.stop()
						}
					})), e.on("gutterdblclick", (function (t) {
						if ("foldWidgets" == e.renderer.$gutterLayer.getRegion(t)) {
							var n = t.getDocumentPosition().row,
								i = e.session,
								r = i.getParentFoldRangeData(n, !0),
								o = r.range || r.firstRange;
							if (o) {
								n = o.start.row;
								var s = i.getFoldAt(n, i.getLine(n).length, 1);
								s ? i.removeFold(s) : (i.addFold("...", o), e.renderer.scrollCursorIntoView({
									row: o.start.row,
									column: 0
								}))
							}
							t.stop()
						}
					}))
				}
			})), ace.define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/keys"),
					r = e("../lib/event"),
					o = function (e) {
						this.$editor = e, this.$data = {
							editor: e
						}, this.$handlers = [], this.setDefaultHandler(e.commands)
					};
				(function () {
					this.setDefaultHandler = function (e) {
						this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = e, this.addKeyboardHandler(e, 0)
					}, this.setKeyboardHandler = function (e) {
						var t = this.$handlers;
						if (t[t.length - 1] != e) {
							for (; t[t.length - 1] && t[t.length - 1] != this.$defaultHandler;) this.removeKeyboardHandler(t[t.length - 1]);
							this.addKeyboardHandler(e, 1)
						}
					}, this.addKeyboardHandler = function (e, t) {
						if (e) {
							"function" != typeof e || e.handleKeyboard || (e.handleKeyboard = e);
							var n = this.$handlers.indexOf(e); - 1 != n && this.$handlers.splice(n, 1), null == t ? this.$handlers.push(e) : this.$handlers.splice(t, 0, e), -1 == n && e.attach && e.attach(this.$editor)
						}
					}, this.removeKeyboardHandler = function (e) {
						var t = this.$handlers.indexOf(e);
						return -1 != t && (this.$handlers.splice(t, 1), e.detach && e.detach(this.$editor), !0)
					}, this.getKeyboardHandler = function () {
						return this.$handlers[this.$handlers.length - 1]
					}, this.getStatusText = function () {
						var e = this.$data,
							t = e.editor;
						return this.$handlers.map((function (n) {
							return n.getStatusText && n.getStatusText(t, e) || ""
						})).filter(Boolean).join(" ")
					}, this.$callKeyboardHandlers = function (e, t, n, i) {
						for (var o, s = !1, a = this.$editor.commands, c = this.$handlers.length; c-- && !((o = this.$handlers[c].handleKeyboard(this.$data, e, t, n, i)) && o.command && ((s = "null" == o.command || a.exec(o.command, this.$editor, o.args, i)) && i && -1 != e && 1 != o.passEvent && 1 != o.command.passEvent && r.stopEvent(i), s)););
						return s || -1 != e || (o = {
							command: "insertstring"
						}, s = a.exec("insertstring", this.$editor, t)), s && this.$editor._signal && this.$editor._signal("keyboardActivity", o), s
					}, this.onCommandKey = function (e, t, n) {
						var r = i.keyCodeToString(n);
						return this.$callKeyboardHandlers(t, r, n, e)
					}, this.onTextInput = function (e) {
						return this.$callKeyboardHandlers(-1, e)
					}
				}).call(o.prototype), t.KeyBinding = o
			})), ace.define("ace/lib/bidiutil", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i = 0,
					r = 0,
					o = !1,
					s = !1,
					a = !1,
					c = [
						[0, 3, 0, 1, 0, 0, 0],
						[0, 3, 0, 1, 2, 2, 0],
						[0, 3, 0, 17, 2, 0, 1],
						[0, 3, 5, 5, 4, 1, 0],
						[0, 3, 21, 21, 4, 0, 1],
						[0, 3, 5, 5, 4, 2, 0]
					],
					l = [
						[2, 0, 1, 1, 0, 1, 0],
						[2, 0, 1, 1, 0, 2, 0],
						[2, 0, 2, 1, 3, 2, 0],
						[2, 0, 2, 33, 3, 1, 1]
					],
					u = 1,
					h = 0,
					d = 1,
					p = 2,
					m = 3,
					f = 4,
					g = 5,
					v = 6,
					_ = 7,
					E = 8,
					C = 9,
					A = 10,
					R = 11,
					S = 12,
					y = 13,
					T = 14,
					b = 15,
					w = 16,
					x = 17,
					L = 18,
					I = [L, L, L, L, L, L, L, L, L, v, g, v, E, g, L, L, L, L, L, L, L, L, L, L, L, L, L, L, g, g, g, v, E, f, f, R, R, R, f, f, f, f, f, A, C, A, C, C, p, p, p, p, p, p, p, p, p, p, C, f, f, f, f, f, f, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, f, f, f, f, f, f, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, h, f, f, f, f, L, L, L, L, L, L, g, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, L, C, f, R, R, R, R, f, f, f, f, h, f, f, L, f, f, R, R, p, p, f, h, f, f, f, p, h, f, f, f, f, f],
					O = [E, E, E, E, E, E, E, E, E, E, E, L, L, L, h, d, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, E, g, y, T, b, w, x, C, R, R, R, R, R, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, C, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, E];

				function F(e, t, n) {
					if (!(r < e))
						if (1 != e || i != u || s)
							for (var o, a, c, l, h = n.length, d = 0; d < h;) {
								if (t[d] >= e) {
									for (o = d + 1; o < h && t[o] >= e;) o++;
									for (a = d, c = o - 1; a < c; a++, c--) l = n[a], n[a] = n[c], n[c] = l;
									d = o
								}
								d++
							} else n.reverse()
				}

				function M(e, t, n, r) {
					var c, l, u, I, O = t[r];
					switch (O) {
						case h:
						case d:
							o = !1;
						case f:
						case m:
							return O;
						case p:
							return o ? m : p;
						case _:
							return o = !0, !0, d;
						case E:
							return f;
						case C:
							return r < 1 || r + 1 >= t.length || (c = n[r - 1]) != p && c != m || (l = t[r + 1]) != p && l != m ? f : (o && (l = m), l == c ? l : f);
						case A:
							return (c = r > 0 ? n[r - 1] : g) == p && r + 1 < t.length && t[r + 1] == p ? p : f;
						case R:
							if (r > 0 && n[r - 1] == p) return p;
							if (o) return f;
							for (I = r + 1, u = t.length; I < u && t[I] == R;) I++;
							return I < u && t[I] == p ? p : f;
						case S:
							for (u = t.length, I = r + 1; I < u && t[I] == S;) I++;
							if (I < u) {
								var F = e[r],
									M = F >= 1425 && F <= 2303 || 64286 == F;
								if (c = t[I], M && (c == d || c == _)) return d
							}
							return r < 1 || (c = t[r - 1]) == g ? f : n[r - 1];
						case g:
							return o = !1, s = !0, i;
						case v:
							return a = !0, f;
						case y:
						case T:
						case w:
						case x:
						case b:
							o = !1;
						case L:
							return f
					}
				}

				function N(e) {
					var t = e.charCodeAt(0),
						n = t >> 8;
					return 0 == n ? t > 191 ? h : I[t] : 5 == n ? /[\u0591-\u05f4]/.test(e) ? d : h : 6 == n ? /[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(e) ? S : /[\u0660-\u0669\u066b-\u066c]/.test(e) ? m : 1642 == t ? R : /[\u06f0-\u06f9]/.test(e) ? p : _ : 32 == n && t <= 8287 ? O[255 & t] : 254 == n && t >= 65136 ? _ : f
				}
				t.L = h, t.R = d, t.EN = p, t.ON_R = 3, t.AN = 4, t.R_H = 5, t.B = 6, t.RLE = 7, t.DOT = "·", t.doBidiReorder = function (e, n, h) {
					if (e.length < 2) return {};
					var p = e.split(""),
						C = new Array(p.length),
						A = new Array(p.length),
						R = [];
					i = h ? u : 0,
						function (e, t, n, u) {
							var h = i ? l : c,
								d = null,
								p = null,
								m = null,
								f = 0,
								_ = null,
								C = -1,
								A = null,
								R = null,
								S = [];
							if (!u)
								for (A = 0, u = []; A < n; A++) u[A] = N(e[A]);
							for (r = i, o = !1, !1, s = !1, a = !1, R = 0; R < n; R++) {
								if (d = f, S[R] = p = M(e, u, S, R), _ = 240 & (f = h[d][p]), f &= 15, t[R] = m = h[f][5], _ > 0)
									if (16 == _) {
										for (A = C; A < R; A++) t[A] = 1;
										C = -1
									} else C = -1;
								if (h[f][6]) - 1 == C && (C = R);
								else if (C > -1) {
									for (A = C; A < R; A++) t[A] = m;
									C = -1
								}
								u[R] == g && (t[R] = 0), r |= m
							}
							if (a)
								for (A = 0; A < n; A++)
									if (u[A] == v) {
										t[A] = i;
										for (var y = A - 1; y >= 0 && u[y] == E; y--) t[y] = i
									}
						}(p, R, p.length, n);
					for (var S = 0; S < C.length; C[S] = S, S++);
					F(2, R, C), F(1, R, C);
					for (S = 0; S < C.length - 1; S++) n[S] === m ? R[S] = t.AN : R[S] === d && (n[S] > _ && n[S] < y || n[S] === f || n[S] === L) ? R[S] = t.ON_R : S > 0 && "ل" === p[S - 1] && /\u0622|\u0623|\u0625|\u0627/.test(p[S]) && (R[S - 1] = R[S] = t.R_H, S++);
					p[p.length - 1] === t.DOT && (R[p.length - 1] = t.B), "‫" === p[0] && (R[0] = t.RLE);
					for (S = 0; S < C.length; S++) A[S] = R[C[S]];
					return {
						logicalFromVisual: C,
						bidiLevels: A
					}
				}, t.hasBidiCharacters = function (e, t) {
					for (var n = !1, i = 0; i < e.length; i++) t[i] = N(e.charAt(i)), n || t[i] != d && t[i] != _ && t[i] != m || (n = !0);
					return n
				}, t.getVisualFromLogicalIdx = function (e, t) {
					for (var n = 0; n < t.logicalFromVisual.length; n++)
						if (t.logicalFromVisual[n] == e) return n;
					return 0
				}
			})), ace.define("ace/bidihandler", ["require", "exports", "module", "ace/lib/bidiutil", "ace/lib/lang"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/bidiutil"),
					r = e("./lib/lang"),
					o = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/,
					s = function (e) {
						this.session = e, this.bidiMap = {}, this.currentRow = null, this.bidiUtil = i, this.charWidths = [], this.EOL = "¬", this.showInvisibles = !0, this.isRtlDir = !1, this.$isRtl = !1, this.line = "", this.wrapIndent = 0, this.EOF = "¶", this.RLE = "‫", this.contentWidth = 0, this.fontMetrics = null, this.rtlLineOffset = 0, this.wrapOffset = 0, this.isMoveLeftOperation = !1, this.seenBidi = o.test(e.getValue())
					};
				(function () {
					this.isBidiRow = function (e, t, n) {
						return !!this.seenBidi && (e !== this.currentRow && (this.currentRow = e, this.updateRowLine(t, n), this.updateBidiMap()), this.bidiMap.bidiLevels)
					}, this.onChange = function (e) {
						this.seenBidi ? this.currentRow = null : "insert" == e.action && o.test(e.lines.join("\n")) && (this.seenBidi = !0, this.currentRow = null)
					}, this.getDocumentRow = function () {
						var e = 0,
							t = this.session.$screenRowCache;
						if (t.length) {
							var n = this.session.$getRowCacheIndex(t, this.currentRow);
							n >= 0 && (e = this.session.$docRowCache[n])
						}
						return e
					}, this.getSplitIndex = function () {
						var e = 0,
							t = this.session.$screenRowCache;
						if (t.length)
							for (var n, i = this.session.$getRowCacheIndex(t, this.currentRow); this.currentRow - e > 0 && (n = this.session.$getRowCacheIndex(t, this.currentRow - e - 1)) === i;) i = n, e++;
						else e = this.currentRow;
						return e
					}, this.updateRowLine = function (e, t) {
						void 0 === e && (e = this.getDocumentRow());
						var n = e === this.session.getLength() - 1 ? this.EOF : this.EOL;
						if (this.wrapIndent = 0, this.line = this.session.getLine(e), this.isRtlDir = this.$isRtl || this.line.charAt(0) === this.RLE, this.session.$useWrapMode) {
							var o = this.session.$wrapData[e];
							o && (void 0 === t && (t = this.getSplitIndex()), t > 0 && o.length ? (this.wrapIndent = o.indent, this.wrapOffset = this.wrapIndent * this.charWidths[i.L], this.line = t < o.length ? this.line.substring(o[t - 1], o[t]) : this.line.substring(o[o.length - 1])) : this.line = this.line.substring(0, o[t])), t == o.length && (this.line += this.showInvisibles ? n : i.DOT)
						} else this.line += this.showInvisibles ? n : i.DOT;
						var s, a = this.session,
							c = 0;
						this.line = this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g, (function (e, t) {
							return "\t" === e || a.isFullWidth(e.charCodeAt(0)) ? (s = "\t" === e ? a.getScreenTabSize(t + c) : 2, c += s - 1, r.stringRepeat(i.DOT, s)) : e
						})), this.isRtlDir && (this.fontMetrics.$main.textContent = this.line.charAt(this.line.length - 1) == i.DOT ? this.line.substr(0, this.line.length - 1) : this.line, this.rtlLineOffset = this.contentWidth - this.fontMetrics.$main.getBoundingClientRect().width)
					}, this.updateBidiMap = function () {
						var e = [];
						i.hasBidiCharacters(this.line, e) || this.isRtlDir ? this.bidiMap = i.doBidiReorder(this.line, e, this.isRtlDir) : this.bidiMap = {}
					}, this.markAsDirty = function () {
						this.currentRow = null
					}, this.updateCharacterWidths = function (e) {
						if (this.characterWidth !== e.$characterSize.width) {
							this.fontMetrics = e;
							var t = this.characterWidth = e.$characterSize.width,
								n = e.$measureCharWidth("ה");
							this.charWidths[i.L] = this.charWidths[i.EN] = this.charWidths[i.ON_R] = t, this.charWidths[i.R] = this.charWidths[i.AN] = n, this.charWidths[i.R_H] = .45 * n, this.charWidths[i.B] = this.charWidths[i.RLE] = 0, this.currentRow = null
						}
					}, this.setShowInvisibles = function (e) {
						this.showInvisibles = e, this.currentRow = null
					}, this.setEolChar = function (e) {
						this.EOL = e
					}, this.setContentWidth = function (e) {
						this.contentWidth = e
					}, this.isRtlLine = function (e) {
						return !!this.$isRtl || (null != e ? this.session.getLine(e).charAt(0) == this.RLE : this.isRtlDir)
					}, this.setRtlDirection = function (e, t) {
						for (var n = e.getCursorPosition(), i = e.selection.getSelectionAnchor().row; i <= n.row; i++) t || e.session.getLine(i).charAt(0) !== e.session.$bidiHandler.RLE ? t && e.session.getLine(i).charAt(0) !== e.session.$bidiHandler.RLE && e.session.doc.insert({
							column: 0,
							row: i
						}, e.session.$bidiHandler.RLE) : e.session.doc.removeInLine(i, 0, 1)
					}, this.getPosLeft = function (e) {
						e -= this.wrapIndent;
						var t = this.line.charAt(0) === this.RLE ? 1 : 0,
							n = e > t ? this.session.getOverwrite() ? e : e - 1 : t,
							r = i.getVisualFromLogicalIdx(n, this.bidiMap),
							o = this.bidiMap.bidiLevels,
							s = 0;
						!this.session.getOverwrite() && e <= t && o[r] % 2 != 0 && r++;
						for (var a = 0; a < r; a++) s += this.charWidths[o[a]];
						return !this.session.getOverwrite() && e > t && o[r] % 2 == 0 && (s += this.charWidths[o[r]]), this.wrapIndent && (s += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset), this.isRtlDir && (s += this.rtlLineOffset), s
					}, this.getSelections = function (e, t) {
						var n, i = this.bidiMap,
							r = i.bidiLevels,
							o = [],
							s = 0,
							a = Math.min(e, t) - this.wrapIndent,
							c = Math.max(e, t) - this.wrapIndent,
							l = !1,
							u = !1,
							h = 0;
						this.wrapIndent && (s += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset);
						for (var d, p = 0; p < r.length; p++) d = i.logicalFromVisual[p], n = r[p], (l = d >= a && d < c) && !u ? h = s : !l && u && o.push({
							left: h,
							width: s - h
						}), s += this.charWidths[n], u = l;
						if (l && p === r.length && o.push({
								left: h,
								width: s - h
							}), this.isRtlDir)
							for (var m = 0; m < o.length; m++) o[m].left += this.rtlLineOffset;
						return o
					}, this.offsetToCol = function (e) {
						this.isRtlDir && (e -= this.rtlLineOffset);
						var t = 0,
							n = (e = Math.max(e, 0), 0),
							i = 0,
							r = this.bidiMap.bidiLevels,
							o = this.charWidths[r[i]];
						for (this.wrapIndent && (e -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset); e > n + o / 2;) {
							if (n += o, i === r.length - 1) {
								o = 0;
								break
							}
							o = this.charWidths[r[++i]]
						}
						return i > 0 && r[i - 1] % 2 != 0 && r[i] % 2 == 0 ? (e < n && i--, t = this.bidiMap.logicalFromVisual[i]) : i > 0 && r[i - 1] % 2 == 0 && r[i] % 2 != 0 ? t = 1 + (e > n ? this.bidiMap.logicalFromVisual[i] : this.bidiMap.logicalFromVisual[i - 1]) : this.isRtlDir && i === r.length - 1 && 0 === o && r[i - 1] % 2 == 0 || !this.isRtlDir && 0 === i && r[i] % 2 != 0 ? t = 1 + this.bidiMap.logicalFromVisual[i] : (i > 0 && r[i - 1] % 2 != 0 && 0 !== o && i--, t = this.bidiMap.logicalFromVisual[i]), 0 === t && this.isRtlDir && t++, t + this.wrapIndent
					}
				}).call(s.prototype), t.BidiHandler = s
			})), ace.define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/lang"),
					o = e("./lib/event_emitter").EventEmitter,
					s = e("./range").Range,
					a = function (e) {
						this.session = e, this.doc = e.getDocument(), this.clearSelection(), this.cursor = this.lead = this.doc.createAnchor(0, 0), this.anchor = this.doc.createAnchor(0, 0), this.$silent = !1;
						var t = this;
						this.cursor.on("change", (function (e) {
							t.$cursorChanged = !0, t.$silent || t._emit("changeCursor"), t.$isEmpty || t.$silent || t._emit("changeSelection"), t.$keepDesiredColumnOnChange || e.old.column == e.value.column || (t.$desiredColumn = null)
						})), this.anchor.on("change", (function () {
							t.$anchorChanged = !0, t.$isEmpty || t.$silent || t._emit("changeSelection")
						}))
					};
				(function () {
					i.implement(this, o), this.isEmpty = function () {
						return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
					}, this.isMultiLine = function () {
						return !this.$isEmpty && this.anchor.row != this.cursor.row
					}, this.getCursor = function () {
						return this.lead.getPosition()
					}, this.setSelectionAnchor = function (e, t) {
						this.$isEmpty = !1, this.anchor.setPosition(e, t)
					}, this.getAnchor = this.getSelectionAnchor = function () {
						return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
					}, this.getSelectionLead = function () {
						return this.lead.getPosition()
					}, this.isBackwards = function () {
						var e = this.anchor,
							t = this.lead;
						return e.row > t.row || e.row == t.row && e.column > t.column
					}, this.getRange = function () {
						var e = this.anchor,
							t = this.lead;
						return this.$isEmpty ? s.fromPoints(t, t) : this.isBackwards() ? s.fromPoints(t, e) : s.fromPoints(e, t)
					}, this.clearSelection = function () {
						this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
					}, this.selectAll = function () {
						this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
					}, this.setRange = this.setSelectionRange = function (e, t) {
						var n = t ? e.end : e.start,
							i = t ? e.start : e.end;
						this.$setSelection(n.row, n.column, i.row, i.column)
					}, this.$setSelection = function (e, t, n, i) {
						var r = this.$isEmpty,
							o = this.inMultiSelectMode;
						this.$silent = !0, this.$cursorChanged = this.$anchorChanged = !1, this.anchor.setPosition(e, t), this.cursor.setPosition(n, i), this.$isEmpty = !s.comparePoints(this.anchor, this.cursor), this.$silent = !1, this.$cursorChanged && this._emit("changeCursor"), (this.$cursorChanged || this.$anchorChanged || r != this.$isEmpty || o) && this._emit("changeSelection")
					}, this.$moveSelection = function (e) {
						var t = this.lead;
						this.$isEmpty && this.setSelectionAnchor(t.row, t.column), e.call(this)
					}, this.selectTo = function (e, t) {
						this.$moveSelection((function () {
							this.moveCursorTo(e, t)
						}))
					}, this.selectToPosition = function (e) {
						this.$moveSelection((function () {
							this.moveCursorToPosition(e)
						}))
					}, this.moveTo = function (e, t) {
						this.clearSelection(), this.moveCursorTo(e, t)
					}, this.moveToPosition = function (e) {
						this.clearSelection(), this.moveCursorToPosition(e)
					}, this.selectUp = function () {
						this.$moveSelection(this.moveCursorUp)
					}, this.selectDown = function () {
						this.$moveSelection(this.moveCursorDown)
					}, this.selectRight = function () {
						this.$moveSelection(this.moveCursorRight)
					}, this.selectLeft = function () {
						this.$moveSelection(this.moveCursorLeft)
					}, this.selectLineStart = function () {
						this.$moveSelection(this.moveCursorLineStart)
					}, this.selectLineEnd = function () {
						this.$moveSelection(this.moveCursorLineEnd)
					}, this.selectFileEnd = function () {
						this.$moveSelection(this.moveCursorFileEnd)
					}, this.selectFileStart = function () {
						this.$moveSelection(this.moveCursorFileStart)
					}, this.selectWordRight = function () {
						this.$moveSelection(this.moveCursorWordRight)
					}, this.selectWordLeft = function () {
						this.$moveSelection(this.moveCursorWordLeft)
					}, this.getWordRange = function (e, t) {
						if (void 0 === t) {
							var n = e || this.lead;
							e = n.row, t = n.column
						}
						return this.session.getWordRange(e, t)
					}, this.selectWord = function () {
						this.setSelectionRange(this.getWordRange())
					}, this.selectAWord = function () {
						var e = this.getCursor(),
							t = this.session.getAWordRange(e.row, e.column);
						this.setSelectionRange(t)
					}, this.getLineRange = function (e, t) {
						var n, i = "number" == typeof e ? e : this.lead.row,
							r = this.session.getFoldLine(i);
						return r ? (i = r.start.row, n = r.end.row) : n = i, !0 === t ? new s(i, 0, n, this.session.getLine(n).length) : new s(i, 0, n + 1, 0)
					}, this.selectLine = function () {
						this.setSelectionRange(this.getLineRange())
					}, this.moveCursorUp = function () {
						this.moveCursorBy(-1, 0)
					}, this.moveCursorDown = function () {
						this.moveCursorBy(1, 0)
					}, this.wouldMoveIntoSoftTab = function (e, t, n) {
						var i = e.column,
							r = e.column + t;
						return n < 0 && (i = e.column - t, r = e.column), this.session.isTabStop(e) && this.doc.getLine(e.row).slice(i, r).split(" ").length - 1 == t
					}, this.moveCursorLeft = function () {
						var e, t = this.lead.getPosition();
						if (e = this.session.getFoldAt(t.row, t.column, -1)) this.moveCursorTo(e.start.row, e.start.column);
						else if (0 === t.column) t.row > 0 && this.moveCursorTo(t.row - 1, this.doc.getLine(t.row - 1).length);
						else {
							var n = this.session.getTabSize();
							this.wouldMoveIntoSoftTab(t, n, -1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, -n) : this.moveCursorBy(0, -1)
						}
					}, this.moveCursorRight = function () {
						var e, t = this.lead.getPosition();
						if (e = this.session.getFoldAt(t.row, t.column, 1)) this.moveCursorTo(e.end.row, e.end.column);
						else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
						else {
							var n = this.session.getTabSize();
							t = this.lead;
							this.wouldMoveIntoSoftTab(t, n, 1) && !this.session.getNavigateWithinSoftTabs() ? this.moveCursorBy(0, n) : this.moveCursorBy(0, 1)
						}
					}, this.moveCursorLineStart = function () {
						var e = this.lead.row,
							t = this.lead.column,
							n = this.session.documentToScreenRow(e, t),
							i = this.session.screenToDocumentPosition(n, 0),
							r = this.session.getDisplayLine(e, null, i.row, i.column).match(/^\s*/);
						r[0].length == t || this.session.$useEmacsStyleLineStart || (i.column += r[0].length), this.moveCursorToPosition(i)
					}, this.moveCursorLineEnd = function () {
						var e = this.lead,
							t = this.session.getDocumentLastRowColumnPosition(e.row, e.column);
						if (this.lead.column == t.column) {
							var n = this.session.getLine(t.row);
							if (t.column == n.length) {
								var i = n.search(/\s+$/);
								i > 0 && (t.column = i)
							}
						}
						this.moveCursorTo(t.row, t.column)
					}, this.moveCursorFileEnd = function () {
						var e = this.doc.getLength() - 1,
							t = this.doc.getLine(e).length;
						this.moveCursorTo(e, t)
					}, this.moveCursorFileStart = function () {
						this.moveCursorTo(0, 0)
					}, this.moveCursorLongWordRight = function () {
						var e = this.lead.row,
							t = this.lead.column,
							n = this.doc.getLine(e),
							i = n.substring(t);
						this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
						var r = this.session.getFoldAt(e, t, 1);
						if (r) this.moveCursorTo(r.end.row, r.end.column);
						else {
							if (this.session.nonTokenRe.exec(i) && (t += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, i = n.substring(t)), t >= n.length) return this.moveCursorTo(e, n.length), this.moveCursorRight(), void(e < this.doc.getLength() - 1 && this.moveCursorWordRight());
							this.session.tokenRe.exec(i) && (t += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(e, t)
						}
					}, this.moveCursorLongWordLeft = function () {
						var e, t = this.lead.row,
							n = this.lead.column;
						if (e = this.session.getFoldAt(t, n, -1)) this.moveCursorTo(e.start.row, e.start.column);
						else {
							var i = this.session.getFoldStringAt(t, n, -1);
							null == i && (i = this.doc.getLine(t).substring(0, n));
							var o = r.stringReverse(i);
							if (this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, this.session.nonTokenRe.exec(o) && (n -= this.session.nonTokenRe.lastIndex, o = o.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), n <= 0) return this.moveCursorTo(t, 0), this.moveCursorLeft(), void(t > 0 && this.moveCursorWordLeft());
							this.session.tokenRe.exec(o) && (n -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), this.moveCursorTo(t, n)
						}
					}, this.$shortWordEndIndex = function (e) {
						var t, n = 0,
							i = /\s/,
							r = this.session.tokenRe;
						if (r.lastIndex = 0, this.session.tokenRe.exec(e)) n = this.session.tokenRe.lastIndex;
						else {
							for (;
								(t = e[n]) && i.test(t);) n++;
							if (n < 1)
								for (r.lastIndex = 0;
									(t = e[n]) && !r.test(t);)
									if (r.lastIndex = 0, n++, i.test(t)) {
										if (n > 2) {
											n--;
											break
										}
										for (;
											(t = e[n]) && i.test(t);) n++;
										if (n > 2) break
									}
						}
						return r.lastIndex = 0, n
					}, this.moveCursorShortWordRight = function () {
						var e = this.lead.row,
							t = this.lead.column,
							n = this.doc.getLine(e),
							i = n.substring(t),
							r = this.session.getFoldAt(e, t, 1);
						if (r) return this.moveCursorTo(r.end.row, r.end.column);
						if (t == n.length) {
							var o = this.doc.getLength();
							do {
								e++, i = this.doc.getLine(e)
							} while (e < o && /^\s*$/.test(i));
							/^\s+/.test(i) || (i = ""), t = 0
						}
						var s = this.$shortWordEndIndex(i);
						this.moveCursorTo(e, t + s)
					}, this.moveCursorShortWordLeft = function () {
						var e, t = this.lead.row,
							n = this.lead.column;
						if (e = this.session.getFoldAt(t, n, -1)) return this.moveCursorTo(e.start.row, e.start.column);
						var i = this.session.getLine(t).substring(0, n);
						if (0 === n) {
							do {
								t--, i = this.doc.getLine(t)
							} while (t > 0 && /^\s*$/.test(i));
							n = i.length, /\s+$/.test(i) || (i = "")
						}
						var o = r.stringReverse(i),
							s = this.$shortWordEndIndex(o);
						return this.moveCursorTo(t, n - s)
					}, this.moveCursorWordRight = function () {
						this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
					}, this.moveCursorWordLeft = function () {
						this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
					}, this.moveCursorBy = function (e, t) {
						var n, i = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
						0 === t && (0 !== e && (this.session.$bidiHandler.isBidiRow(i.row, this.lead.row) ? (n = this.session.$bidiHandler.getPosLeft(i.column), i.column = Math.round(n / this.session.$bidiHandler.charWidths[0])) : n = i.column * this.session.$bidiHandler.charWidths[0]), this.$desiredColumn ? i.column = this.$desiredColumn : this.$desiredColumn = i.column);
						var r = this.session.screenToDocumentPosition(i.row + e, i.column, n);
						0 !== e && 0 === t && r.row === this.lead.row && r.column === this.lead.column && this.session.lineWidgets && this.session.lineWidgets[r.row] && (r.row > 0 || e > 0) && r.row++, this.moveCursorTo(r.row, r.column + t, 0 === t)
					}, this.moveCursorToPosition = function (e) {
						this.moveCursorTo(e.row, e.column)
					}, this.moveCursorTo = function (e, t, n) {
						var i = this.session.getFoldAt(e, t, 1);
						i && (e = i.start.row, t = i.start.column), this.$keepDesiredColumnOnChange = !0;
						var r = this.session.getLine(e);
						/[\uDC00-\uDFFF]/.test(r.charAt(t)) && r.charAt(t - 1) && (this.lead.row == e && this.lead.column == t + 1 ? t -= 1 : t += 1), this.lead.setPosition(e, t), this.$keepDesiredColumnOnChange = !1, n || (this.$desiredColumn = null)
					}, this.moveCursorToScreen = function (e, t, n) {
						var i = this.session.screenToDocumentPosition(e, t);
						this.moveCursorTo(i.row, i.column, n)
					}, this.detach = function () {
						this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
					}, this.fromOrientedRange = function (e) {
						this.setSelectionRange(e, e.cursor == e.start), this.$desiredColumn = e.desiredColumn || this.$desiredColumn
					}, this.toOrientedRange = function (e) {
						var t = this.getRange();
						return e ? (e.start.column = t.start.column, e.start.row = t.start.row, e.end.column = t.end.column, e.end.row = t.end.row) : e = t, e.cursor = this.isBackwards() ? e.start : e.end, e.desiredColumn = this.$desiredColumn, e
					}, this.getRangeOfMovements = function (e) {
						var t = this.getCursor();
						try {
							e(this);
							var n = this.getCursor();
							return s.fromPoints(t, n)
						} catch (e) {
							return s.fromPoints(t, t)
						} finally {
							this.moveCursorToPosition(t)
						}
					}, this.toJSON = function () {
						if (this.rangeCount) var e = this.ranges.map((function (e) {
							var t = e.clone();
							return t.isBackwards = e.cursor == e.start, t
						}));
						else(e = this.getRange()).isBackwards = this.isBackwards();
						return e
					}, this.fromJSON = function (e) {
						if (null == e.start) {
							if (this.rangeList && e.length > 1) {
								this.toSingleRange(e[0]);
								for (var t = e.length; t--;) {
									var n = s.fromPoints(e[t].start, e[t].end);
									e[t].isBackwards && (n.cursor = n.start), this.addRange(n, !0)
								}
								return
							}
							e = e[0]
						}
						this.rangeList && this.toSingleRange(e), this.setSelectionRange(e, e.isBackwards)
					}, this.isEqual = function (e) {
						if ((e.length || this.rangeCount) && e.length != this.rangeCount) return !1;
						if (!e.length || !this.ranges) return this.getRange().isEqual(e);
						for (var t = this.ranges.length; t--;)
							if (!this.ranges[t].isEqual(e[t])) return !1;
						return !0
					}
				}).call(a.prototype), t.Selection = a
			})), ace.define("ace/tokenizer", ["require", "exports", "module", "ace/config"], (function (e, t, n) {
				"use strict";
				var i = e("./config"),
					r = 2e3,
					o = function (e) {
						for (var t in this.states = e, this.regExps = {}, this.matchMappings = {}, this.states) {
							for (var n = this.states[t], i = [], r = 0, o = this.matchMappings[t] = {
									defaultToken: "text"
								}, s = "g", a = [], c = 0; c < n.length; c++) {
								var l = n[c];
								if (l.defaultToken && (o.defaultToken = l.defaultToken), l.caseInsensitive && (s = "gi"), null != l.regex) {
									l.regex instanceof RegExp && (l.regex = l.regex.toString().slice(1, -1));
									var u = l.regex,
										h = new RegExp("(?:(" + u + ")|(.))").exec("a").length - 2;
									Array.isArray(l.token) ? 1 == l.token.length || 1 == h ? l.token = l.token[0] : h - 1 != l.token.length ? (this.reportError("number of classes and regexp groups doesn't match", {
										rule: l,
										groupCount: h - 1
									}), l.token = l.token[0]) : (l.tokenArray = l.token, l.token = null, l.onMatch = this.$arrayTokens) : "function" != typeof l.token || l.onMatch || (l.onMatch = h > 1 ? this.$applyToken : l.token), h > 1 && (/\\\d/.test(l.regex) ? u = l.regex.replace(/\\([0-9]+)/g, (function (e, t) {
										return "\\" + (parseInt(t, 10) + r + 1)
									})) : (h = 1, u = this.removeCapturingGroups(l.regex)), l.splitRegex || "string" == typeof l.token || a.push(l)), o[r] = c, r += h, i.push(u), l.onMatch || (l.onMatch = null)
								}
							}
							i.length || (o[0] = 0, i.push("$")), a.forEach((function (e) {
								e.splitRegex = this.createSplitterRegexp(e.regex, s)
							}), this), this.regExps[t] = new RegExp("(" + i.join(")|(") + ")|($)", s)
						}
					};
				(function () {
					this.$setMaxTokenCount = function (e) {
						r = 0 | e
					}, this.$applyToken = function (e) {
						var t = this.splitRegex.exec(e).slice(1),
							n = this.token.apply(this, t);
						if ("string" == typeof n) return [{
							type: n,
							value: e
						}];
						for (var i = [], r = 0, o = n.length; r < o; r++) t[r] && (i[i.length] = {
							type: n[r],
							value: t[r]
						});
						return i
					}, this.$arrayTokens = function (e) {
						if (!e) return [];
						var t = this.splitRegex.exec(e);
						if (!t) return "text";
						for (var n = [], i = this.tokenArray, r = 0, o = i.length; r < o; r++) t[r + 1] && (n[n.length] = {
							type: i[r],
							value: t[r + 1]
						});
						return n
					}, this.removeCapturingGroups = function (e) {
						return e.replace(/\\.|\[(?:\\.|[^\\\]])*|\(\?[:=!]|(\()/g, (function (e, t) {
							return t ? "(?:" : e
						}))
					}, this.createSplitterRegexp = function (e, t) {
						if (-1 != e.indexOf("(?=")) {
							var n = 0,
								i = !1,
								r = {};
							e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, (function (e, t, o, s, a, c) {
								return i ? i = "]" != a : a ? i = !0 : s ? (n == r.stack && (r.end = c + 1, r.stack = -1), n--) : o && (n++, 1 != o.length && (r.stack = n, r.start = c)), e
							})), null != r.end && /^\)*$/.test(e.substr(r.end)) && (e = e.substring(0, r.start) + e.substr(r.end))
						}
						return "^" != e.charAt(0) && (e = "^" + e), "$" != e.charAt(e.length - 1) && (e += "$"), new RegExp(e, (t || "").replace("g", ""))
					}, this.getLineTokens = function (e, t) {
						if (t && "string" != typeof t) {
							var n = t.slice(0);
							"#tmp" === (t = n[0]) && (n.shift(), t = n.shift())
						} else n = [];
						var i = t || "start",
							o = this.states[i];
						o || (i = "start", o = this.states[i]);
						var s = this.matchMappings[i],
							a = this.regExps[i];
						a.lastIndex = 0;
						for (var c, l = [], u = 0, h = 0, d = {
								type: null,
								value: ""
							}; c = a.exec(e);) {
							var p = s.defaultToken,
								m = null,
								f = c[0],
								g = a.lastIndex;
							if (g - f.length > u) {
								var v = e.substring(u, g - f.length);
								d.type == p ? d.value += v : (d.type && l.push(d), d = {
									type: p,
									value: v
								})
							}
							for (var _ = 0; _ < c.length - 2; _++)
								if (void 0 !== c[_ + 1]) {
									p = (m = o[s[_]]).onMatch ? m.onMatch(f, i, n, e) : m.token, m.next && (i = "string" == typeof m.next ? m.next : m.next(i, n), (o = this.states[i]) || (this.reportError("state doesn't exist", i), i = "start", o = this.states[i]), s = this.matchMappings[i], u = g, (a = this.regExps[i]).lastIndex = g), m.consumeLineEnd && (u = g);
									break
								} if (f)
								if ("string" == typeof p) m && !1 === m.merge || d.type !== p ? (d.type && l.push(d), d = {
									type: p,
									value: f
								}) : d.value += f;
								else if (p) {
								d.type && l.push(d), d = {
									type: null,
									value: ""
								};
								for (_ = 0; _ < p.length; _++) l.push(p[_])
							}
							if (u == e.length) break;
							if (u = g, h++ > r) {
								for (h > 2 * e.length && this.reportError("infinite loop with in ace tokenizer", {
										startState: t,
										line: e
									}); u < e.length;) d.type && l.push(d), d = {
									value: e.substring(u, u += 500),
									type: "overflow"
								};
								i = "start", n = [];
								break
							}
						}
						return d.type && l.push(d), n.length > 1 && n[0] !== i && n.unshift("#tmp", i), {
							tokens: l,
							state: n.length ? n : i
						}
					}, this.reportError = i.reportError
				}).call(o.prototype), t.Tokenizer = o
			})), ace.define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/lang"),
					r = function () {
						this.$rules = {
							start: [{
								token: "empty_line",
								regex: "^$"
							}, {
								defaultToken: "text"
							}]
						}
					};
				(function () {
					this.addRules = function (e, t) {
						if (t)
							for (var n in e) {
								for (var i = e[n], r = 0; r < i.length; r++) {
									var o = i[r];
									(o.next || o.onMatch) && ("string" == typeof o.next && 0 !== o.next.indexOf(t) && (o.next = t + o.next), o.nextState && 0 !== o.nextState.indexOf(t) && (o.nextState = t + o.nextState))
								}
								this.$rules[t + n] = i
							} else
								for (var n in e) this.$rules[n] = e[n]
					}, this.getRules = function () {
						return this.$rules
					}, this.embedRules = function (e, t, n, r, o) {
						var s = "function" == typeof e ? (new e).getRules() : e;
						if (r)
							for (var a = 0; a < r.length; a++) r[a] = t + r[a];
						else
							for (var c in r = [], s) r.push(t + c);
						if (this.addRules(s, t), n) {
							var l = Array.prototype[o ? "push" : "unshift"];
							for (a = 0; a < r.length; a++) l.apply(this.$rules[r[a]], i.deepCopy(n))
						}
						this.$embeds || (this.$embeds = []), this.$embeds.push(t)
					}, this.getEmbeds = function () {
						return this.$embeds
					};
					var e = function (e, t) {
							return ("start" != e || t.length) && t.unshift(this.nextState, e), this.nextState
						},
						t = function (e, t) {
							return t.shift(), t.shift() || "start"
						};
					this.normalizeRules = function () {
						var n = 0,
							i = this.$rules;
						Object.keys(i).forEach((function r(o) {
							var s = i[o];
							s.processed = !0;
							for (var a = 0; a < s.length; a++) {
								var c = s[a],
									l = null;
								Array.isArray(c) && (l = c, c = {}), !c.regex && c.start && (c.regex = c.start, c.next || (c.next = []), c.next.push({
									defaultToken: c.token
								}, {
									token: c.token + ".end",
									regex: c.end || c.start,
									next: "pop"
								}), c.token = c.token + ".start", c.push = !0);
								var u = c.next || c.push;
								if (u && Array.isArray(u)) {
									var h = c.stateName;
									h || ("string" != typeof (h = c.token) && (h = h[0] || ""), i[h] && (h += n++)), i[h] = u, c.next = h, r(h)
								} else "pop" == u && (c.next = t);
								if (c.push && (c.nextState = c.next || c.push, c.next = e, delete c.push), c.rules)
									for (var d in c.rules) i[d] ? i[d].push && i[d].push.apply(i[d], c.rules[d]) : i[d] = c.rules[d];
								var p = "string" == typeof c ? c : c.include;
								if (p && (l = Array.isArray(p) ? p.map((function (e) {
										return i[e]
									})) : i[p]), l) {
									var m = [a, 1].concat(l);
									c.noEscape && (m = m.filter((function (e) {
										return !e.next
									}))), s.splice.apply(s, m), a--
								}
								c.keywordMap && (c.token = this.createKeywordMapper(c.keywordMap, c.defaultToken || "text", c.caseInsensitive), delete c.defaultToken)
							}
						}), this)
					}, this.createKeywordMapper = function (e, t, n, i) {
						var r = Object.create(null);
						return Object.keys(e).forEach((function (t) {
							var o = e[t];
							n && (o = o.toLowerCase());
							for (var s = o.split(i || "|"), a = s.length; a--;) r[s[a]] = t
						})), Object.getPrototypeOf(r) && (r.__proto__ = null), this.$keywordList = Object.keys(r), e = null, n ? function (e) {
							return r[e.toLowerCase()] || t
						} : function (e) {
							return r[e] || t
						}
					}, this.getKeywords = function () {
						return this.$keywords
					}
				}).call(r.prototype), t.TextHighlightRules = r
			})), ace.define("ace/mode/behaviour", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				var i = function () {
					this.$behaviours = {}
				};
				(function () {
					this.add = function (e, t, n) {
						switch (void 0) {
							case this.$behaviours:
								this.$behaviours = {};
							case this.$behaviours[e]:
								this.$behaviours[e] = {}
						}
						this.$behaviours[e][t] = n
					}, this.addBehaviours = function (e) {
						for (var t in e)
							for (var n in e[t]) this.add(t, n, e[t][n])
					}, this.remove = function (e) {
						this.$behaviours && this.$behaviours[e] && delete this.$behaviours[e]
					}, this.inherit = function (e, t) {
						if ("function" == typeof e) var n = (new e).getBehaviours(t);
						else n = e.getBehaviours(t);
						this.addBehaviours(n)
					}, this.getBehaviours = function (e) {
						if (e) {
							for (var t = {}, n = 0; n < e.length; n++) this.$behaviours[e[n]] && (t[e[n]] = this.$behaviours[e[n]]);
							return t
						}
						return this.$behaviours
					}
				}).call(i.prototype), t.Behaviour = i
			})), ace.define("ace/token_iterator", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("./range").Range,
					r = function (e, t, n) {
						this.$session = e, this.$row = t, this.$rowTokens = e.getTokens(t);
						var i = e.getTokenAt(t, n);
						this.$tokenIndex = i ? i.index : -1
					};
				(function () {
					this.stepBackward = function () {
						for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
							if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
							this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
						}
						return this.$rowTokens[this.$tokenIndex]
					}, this.stepForward = function () {
						var e;
						for (this.$tokenIndex += 1; this.$tokenIndex >= this.$rowTokens.length;) {
							if (this.$row += 1, e || (e = this.$session.getLength()), this.$row >= e) return this.$row = e - 1, null;
							this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
						}
						return this.$rowTokens[this.$tokenIndex]
					}, this.getCurrentToken = function () {
						return this.$rowTokens[this.$tokenIndex]
					}, this.getCurrentTokenRow = function () {
						return this.$row
					}, this.getCurrentTokenColumn = function () {
						var e = this.$rowTokens,
							t = this.$tokenIndex,
							n = e[t].start;
						if (void 0 !== n) return n;
						for (n = 0; t > 0;) n += e[t -= 1].value.length;
						return n
					}, this.getCurrentTokenPosition = function () {
						return {
							row: this.$row,
							column: this.getCurrentTokenColumn()
						}
					}, this.getCurrentTokenRange = function () {
						var e = this.$rowTokens[this.$tokenIndex],
							t = this.getCurrentTokenColumn();
						return new i(this.$row, t, this.$row, t + e.value.length)
					}
				}).call(r.prototype), t.TokenIterator = r
			})), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], (function (e, t, n) {
				"use strict";
				var i, r = e("../../lib/oop"),
					o = e("../behaviour").Behaviour,
					s = e("../../token_iterator").TokenIterator,
					a = e("../../lib/lang"),
					c = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator"],
					l = ["text", "paren.rparen", "rparen", "paren", "punctuation.operator", "comment"],
					u = {},
					h = {
						'"': '"',
						"'": "'"
					},
					d = function (e) {
						var t = -1;
						if (e.multiSelect && (t = e.selection.index, u.rangeCount != e.multiSelect.rangeCount && (u = {
								rangeCount: e.multiSelect.rangeCount
							})), u[t]) return i = u[t];
						i = u[t] = {
							autoInsertedBrackets: 0,
							autoInsertedRow: -1,
							autoInsertedLineEnd: "",
							maybeInsertedBrackets: 0,
							maybeInsertedRow: -1,
							maybeInsertedLineStart: "",
							maybeInsertedLineEnd: ""
						}
					},
					p = function (e, t, n, i) {
						var r = e.end.row - e.start.row;
						return {
							text: n + t + i,
							selection: [0, e.start.column + 1, r, e.end.column + (r ? 0 : 1)]
						}
					},
					m = function (e) {
						this.add("braces", "insertion", (function (t, n, r, o, s) {
							var c = r.getCursorPosition(),
								l = o.doc.getLine(c.row);
							if ("{" == s) {
								d(r);
								var u = r.getSelectionRange(),
									h = o.doc.getTextRange(u);
								if ("" !== h && "{" !== h && r.getWrapBehavioursEnabled()) return p(u, h, "{", "}");
								if (m.isSaneInsertion(r, o)) return /[\]\}\)]/.test(l[c.column]) || r.inMultiSelectMode || e && e.braces ? (m.recordAutoInsert(r, o, "}"), {
									text: "{}",
									selection: [1, 1]
								}) : (m.recordMaybeInsert(r, o, "{"), {
									text: "{",
									selection: [1, 1]
								})
							} else if ("}" == s) {
								if (d(r), "}" == l.substring(c.column, c.column + 1))
									if (null !== o.$findOpeningBracket("}", {
											column: c.column + 1,
											row: c.row
										}) && m.isAutoInsertedClosing(c, l, s)) return m.popAutoInsertedClosing(), {
										text: "",
										selection: [1, 1]
									}
							} else {
								if ("\n" == s || "\r\n" == s) {
									d(r);
									var f = "";
									if (m.isMaybeInsertedClosing(c, l) && (f = a.stringRepeat("}", i.maybeInsertedBrackets), m.clearMaybeInsertedClosing()), "}" === l.substring(c.column, c.column + 1)) {
										var g = o.findMatchingBracket({
											row: c.row,
											column: c.column + 1
										}, "}");
										if (!g) return null;
										var v = this.$getIndent(o.getLine(g.row))
									} else {
										if (!f) return void m.clearMaybeInsertedClosing();
										v = this.$getIndent(l)
									}
									var _ = v + o.getTabString();
									return {
										text: "\n" + _ + "\n" + v + f,
										selection: [1, _.length, 1, _.length]
									}
								}
								m.clearMaybeInsertedClosing()
							}
						})), this.add("braces", "deletion", (function (e, t, n, r, o) {
							var s = r.doc.getTextRange(o);
							if (!o.isMultiLine() && "{" == s) {
								if (d(n), "}" == r.doc.getLine(o.start.row).substring(o.end.column, o.end.column + 1)) return o.end.column++, o;
								i.maybeInsertedBrackets--
							}
						})), this.add("parens", "insertion", (function (e, t, n, i, r) {
							if ("(" == r) {
								d(n);
								var o = n.getSelectionRange(),
									s = i.doc.getTextRange(o);
								if ("" !== s && n.getWrapBehavioursEnabled()) return p(o, s, "(", ")");
								if (m.isSaneInsertion(n, i)) return m.recordAutoInsert(n, i, ")"), {
									text: "()",
									selection: [1, 1]
								}
							} else if (")" == r) {
								d(n);
								var a = n.getCursorPosition(),
									c = i.doc.getLine(a.row);
								if (")" == c.substring(a.column, a.column + 1))
									if (null !== i.$findOpeningBracket(")", {
											column: a.column + 1,
											row: a.row
										}) && m.isAutoInsertedClosing(a, c, r)) return m.popAutoInsertedClosing(), {
										text: "",
										selection: [1, 1]
									}
							}
						})), this.add("parens", "deletion", (function (e, t, n, i, r) {
							var o = i.doc.getTextRange(r);
							if (!r.isMultiLine() && "(" == o && (d(n), ")" == i.doc.getLine(r.start.row).substring(r.start.column + 1, r.start.column + 2))) return r.end.column++, r
						})), this.add("brackets", "insertion", (function (e, t, n, i, r) {
							if ("[" == r) {
								d(n);
								var o = n.getSelectionRange(),
									s = i.doc.getTextRange(o);
								if ("" !== s && n.getWrapBehavioursEnabled()) return p(o, s, "[", "]");
								if (m.isSaneInsertion(n, i)) return m.recordAutoInsert(n, i, "]"), {
									text: "[]",
									selection: [1, 1]
								}
							} else if ("]" == r) {
								d(n);
								var a = n.getCursorPosition(),
									c = i.doc.getLine(a.row);
								if ("]" == c.substring(a.column, a.column + 1))
									if (null !== i.$findOpeningBracket("]", {
											column: a.column + 1,
											row: a.row
										}) && m.isAutoInsertedClosing(a, c, r)) return m.popAutoInsertedClosing(), {
										text: "",
										selection: [1, 1]
									}
							}
						})), this.add("brackets", "deletion", (function (e, t, n, i, r) {
							var o = i.doc.getTextRange(r);
							if (!r.isMultiLine() && "[" == o && (d(n), "]" == i.doc.getLine(r.start.row).substring(r.start.column + 1, r.start.column + 2))) return r.end.column++, r
						})), this.add("string_dquotes", "insertion", (function (e, t, n, i, r) {
							var o = i.$mode.$quotes || h;
							if (1 == r.length && o[r]) {
								if (this.lineCommentStart && -1 != this.lineCommentStart.indexOf(r)) return;
								d(n);
								var s = r,
									a = n.getSelectionRange(),
									c = i.doc.getTextRange(a);
								if (!("" === c || 1 == c.length && o[c]) && n.getWrapBehavioursEnabled()) return p(a, c, s, s);
								if (!c) {
									var l = n.getCursorPosition(),
										u = i.doc.getLine(l.row),
										m = u.substring(l.column - 1, l.column),
										f = u.substring(l.column, l.column + 1),
										g = i.getTokenAt(l.row, l.column),
										v = i.getTokenAt(l.row, l.column + 1);
									if ("\\" == m && g && /escape/.test(g.type)) return null;
									var _, E = g && /string|escape/.test(g.type),
										C = !v || /string|escape/.test(v.type);
									if (f == s)(_ = E !== C) && /string\.end/.test(v.type) && (_ = !1);
									else {
										if (E && !C) return null;
										if (E && C) return null;
										var A = i.$mode.tokenRe;
										A.lastIndex = 0;
										var R = A.test(m);
										A.lastIndex = 0;
										var S = A.test(m);
										if (R || S) return null;
										if (f && !/[\s;,.})\]\\]/.test(f)) return null;
										var y = u[l.column - 2];
										if (m == s && (y == s || A.test(y))) return null;
										_ = !0
									}
									return {
										text: _ ? s + s : "",
										selection: [1, 1]
									}
								}
							}
						})), this.add("string_dquotes", "deletion", (function (e, t, n, i, r) {
							var o = i.$mode.$quotes || h,
								s = i.doc.getTextRange(r);
							if (!r.isMultiLine() && o.hasOwnProperty(s) && (d(n), i.doc.getLine(r.start.row).substring(r.start.column + 1, r.start.column + 2) == s)) return r.end.column++, r
						}))
					};
				m.isSaneInsertion = function (e, t) {
					var n = e.getCursorPosition(),
						i = new s(t, n.row, n.column);
					if (!this.$matchTokenType(i.getCurrentToken() || "text", c)) {
						if (/[)}\]]/.test(e.session.getLine(n.row)[n.column])) return !0;
						var r = new s(t, n.row, n.column + 1);
						if (!this.$matchTokenType(r.getCurrentToken() || "text", c)) return !1
					}
					return i.stepForward(), i.getCurrentTokenRow() !== n.row || this.$matchTokenType(i.getCurrentToken() || "text", l)
				}, m.$matchTokenType = function (e, t) {
					return t.indexOf(e.type || e) > -1
				}, m.recordAutoInsert = function (e, t, n) {
					var r = e.getCursorPosition(),
						o = t.doc.getLine(r.row);
					this.isAutoInsertedClosing(r, o, i.autoInsertedLineEnd[0]) || (i.autoInsertedBrackets = 0), i.autoInsertedRow = r.row, i.autoInsertedLineEnd = n + o.substr(r.column), i.autoInsertedBrackets++
				}, m.recordMaybeInsert = function (e, t, n) {
					var r = e.getCursorPosition(),
						o = t.doc.getLine(r.row);
					this.isMaybeInsertedClosing(r, o) || (i.maybeInsertedBrackets = 0), i.maybeInsertedRow = r.row, i.maybeInsertedLineStart = o.substr(0, r.column) + n, i.maybeInsertedLineEnd = o.substr(r.column), i.maybeInsertedBrackets++
				}, m.isAutoInsertedClosing = function (e, t, n) {
					return i.autoInsertedBrackets > 0 && e.row === i.autoInsertedRow && n === i.autoInsertedLineEnd[0] && t.substr(e.column) === i.autoInsertedLineEnd
				}, m.isMaybeInsertedClosing = function (e, t) {
					return i.maybeInsertedBrackets > 0 && e.row === i.maybeInsertedRow && t.substr(e.column) === i.maybeInsertedLineEnd && t.substr(0, e.column) == i.maybeInsertedLineStart
				}, m.popAutoInsertedClosing = function () {
					i.autoInsertedLineEnd = i.autoInsertedLineEnd.substr(1), i.autoInsertedBrackets--
				}, m.clearMaybeInsertedClosing = function () {
					i && (i.maybeInsertedBrackets = 0, i.maybeInsertedRow = -1)
				}, r.inherits(m, o), t.CstyleBehaviour = m
			})), ace.define("ace/unicode", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				for (var i = [48, 9, 8, 25, 5, 0, 2, 25, 48, 0, 11, 0, 5, 0, 6, 22, 2, 30, 2, 457, 5, 11, 15, 4, 8, 0, 2, 0, 18, 116, 2, 1, 3, 3, 9, 0, 2, 2, 2, 0, 2, 19, 2, 82, 2, 138, 2, 4, 3, 155, 12, 37, 3, 0, 8, 38, 10, 44, 2, 0, 2, 1, 2, 1, 2, 0, 9, 26, 6, 2, 30, 10, 7, 61, 2, 9, 5, 101, 2, 7, 3, 9, 2, 18, 3, 0, 17, 58, 3, 100, 15, 53, 5, 0, 6, 45, 211, 57, 3, 18, 2, 5, 3, 11, 3, 9, 2, 1, 7, 6, 2, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 0, 4, 3, 3, 8, 3, 1, 3, 3, 9, 0, 5, 1, 2, 4, 3, 11, 16, 2, 2, 5, 5, 1, 3, 21, 2, 6, 2, 1, 2, 1, 2, 1, 3, 0, 2, 4, 5, 1, 3, 2, 4, 0, 8, 3, 2, 0, 8, 15, 12, 2, 2, 8, 2, 2, 2, 21, 2, 6, 2, 1, 2, 4, 3, 9, 2, 2, 2, 2, 3, 0, 16, 3, 3, 9, 18, 2, 2, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 3, 8, 3, 1, 3, 2, 9, 1, 5, 1, 2, 4, 3, 9, 2, 0, 17, 1, 2, 5, 4, 2, 2, 3, 4, 1, 2, 0, 2, 1, 4, 1, 4, 2, 4, 11, 5, 4, 4, 2, 2, 3, 3, 0, 7, 0, 15, 9, 18, 2, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 4, 7, 2, 2, 2, 3, 8, 1, 2, 1, 7, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 9, 2, 4, 3, 8, 2, 2, 2, 3, 8, 1, 8, 0, 2, 3, 3, 9, 19, 1, 2, 7, 2, 2, 2, 22, 2, 15, 4, 7, 2, 2, 2, 3, 10, 0, 9, 3, 3, 9, 11, 5, 3, 1, 2, 17, 4, 23, 2, 8, 2, 0, 3, 6, 4, 0, 5, 5, 2, 0, 2, 7, 19, 1, 14, 57, 6, 14, 2, 9, 40, 1, 2, 0, 3, 1, 2, 0, 3, 0, 7, 3, 2, 6, 2, 2, 2, 0, 2, 0, 3, 1, 2, 12, 2, 2, 3, 4, 2, 0, 2, 5, 3, 9, 3, 1, 35, 0, 24, 1, 7, 9, 12, 0, 2, 0, 2, 0, 5, 9, 2, 35, 5, 19, 2, 5, 5, 7, 2, 35, 10, 0, 58, 73, 7, 77, 3, 37, 11, 42, 2, 0, 4, 328, 2, 3, 3, 6, 2, 0, 2, 3, 3, 40, 2, 3, 3, 32, 2, 3, 3, 6, 2, 0, 2, 3, 3, 14, 2, 56, 2, 3, 3, 66, 5, 0, 33, 15, 17, 84, 13, 619, 3, 16, 2, 25, 6, 74, 22, 12, 2, 6, 12, 20, 12, 19, 13, 12, 2, 2, 2, 1, 13, 51, 3, 29, 4, 0, 5, 1, 3, 9, 34, 2, 3, 9, 7, 87, 9, 42, 6, 69, 11, 28, 4, 11, 5, 11, 11, 39, 3, 4, 12, 43, 5, 25, 7, 10, 38, 27, 5, 62, 2, 28, 3, 10, 7, 9, 14, 0, 89, 75, 5, 9, 18, 8, 13, 42, 4, 11, 71, 55, 9, 9, 4, 48, 83, 2, 2, 30, 14, 230, 23, 280, 3, 5, 3, 37, 3, 5, 3, 7, 2, 0, 2, 0, 2, 0, 2, 30, 3, 52, 2, 6, 2, 0, 4, 2, 2, 6, 4, 3, 3, 5, 5, 12, 6, 2, 2, 6, 67, 1, 20, 0, 29, 0, 14, 0, 17, 4, 60, 12, 5, 0, 4, 11, 18, 0, 5, 0, 3, 9, 2, 0, 4, 4, 7, 0, 2, 0, 2, 0, 2, 3, 2, 10, 3, 3, 6, 4, 5, 0, 53, 1, 2684, 46, 2, 46, 2, 132, 7, 6, 15, 37, 11, 53, 10, 0, 17, 22, 10, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 6, 2, 31, 48, 0, 470, 1, 36, 5, 2, 4, 6, 1, 5, 85, 3, 1, 3, 2, 2, 89, 2, 3, 6, 40, 4, 93, 18, 23, 57, 15, 513, 6581, 75, 20939, 53, 1164, 68, 45, 3, 268, 4, 27, 21, 31, 3, 13, 13, 1, 2, 24, 9, 69, 11, 1, 38, 8, 3, 102, 3, 1, 111, 44, 25, 51, 13, 68, 12, 9, 7, 23, 4, 0, 5, 45, 3, 35, 13, 28, 4, 64, 15, 10, 39, 54, 10, 13, 3, 9, 7, 22, 4, 1, 5, 66, 25, 2, 227, 42, 2, 1, 3, 9, 7, 11171, 13, 22, 5, 48, 8453, 301, 3, 61, 3, 105, 39, 6, 13, 4, 6, 11, 2, 12, 2, 4, 2, 0, 2, 1, 2, 1, 2, 107, 34, 362, 19, 63, 3, 53, 41, 11, 5, 15, 17, 6, 13, 1, 25, 2, 33, 4, 2, 134, 20, 9, 8, 25, 5, 0, 2, 25, 12, 88, 4, 5, 3, 5, 3, 5, 3, 2], r = 0, o = [], s = 0; s < i.length; s += 2) o.push(r += i[s]), i[s + 1] && o.push(45, r += i[s + 1]);
				t.wordChars = String.fromCharCode.apply(null, o)
			})), ace.define("ace/mode/text", ["require", "exports", "module", "ace/config", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour/cstyle", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../config"),
					r = e("../tokenizer").Tokenizer,
					o = e("./text_highlight_rules").TextHighlightRules,
					s = e("./behaviour/cstyle").CstyleBehaviour,
					a = e("../unicode"),
					c = e("../lib/lang"),
					l = e("../token_iterator").TokenIterator,
					u = e("../range").Range,
					h = function () {
						this.HighlightRules = o
					};
				(function () {
					this.$defaultBehaviour = new s, this.tokenRe = new RegExp("^[" + a.wordChars + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + a.wordChars + "\\$_]|\\s])+", "g"), this.getTokenizer = function () {
						return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules(this.$highlightRuleConfig), this.$tokenizer = new r(this.$highlightRules.getRules())), this.$tokenizer
					}, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function (e, t, n, i) {
						var r = t.doc,
							o = !0,
							s = !0,
							a = 1 / 0,
							l = t.getTabSize(),
							u = !1;
						if (this.lineCommentStart) {
							if (Array.isArray(this.lineCommentStart)) f = this.lineCommentStart.map(c.escapeRegExp).join("|"), p = this.lineCommentStart[0];
							else f = c.escapeRegExp(this.lineCommentStart), p = this.lineCommentStart;
							f = new RegExp("^(\\s*)(?:" + f + ") ?"), u = t.getUseSoftTabs();
							_ = function (e, t) {
								var n = e.match(f);
								if (n) {
									var i = n[1].length,
										o = n[0].length;
									d(e, i, o) || " " != n[0][o - 1] || o--, r.removeInLine(t, i, o)
								}
							};
							var h = p + " ",
								d = (v = function (e, t) {
									o && !/\S/.test(e) || (d(e, a, a) ? r.insertInLine({
										row: t,
										column: a
									}, h) : r.insertInLine({
										row: t,
										column: a
									}, p))
								}, E = function (e, t) {
									return f.test(e)
								}, function (e, t, n) {
									for (var i = 0; t-- && " " == e.charAt(t);) i++;
									if (i % l != 0) return !1;
									for (i = 0;
										" " == e.charAt(n++);) i++;
									return l > 2 ? i % l != l - 1 : i % l == 0
								})
						} else {
							if (!this.blockComment) return !1;
							var p = this.blockComment.start,
								m = this.blockComment.end,
								f = new RegExp("^(\\s*)(?:" + c.escapeRegExp(p) + ")"),
								g = new RegExp("(?:" + c.escapeRegExp(m) + ")\\s*$"),
								v = function (e, t) {
									E(e, t) || o && !/\S/.test(e) || (r.insertInLine({
										row: t,
										column: e.length
									}, m), r.insertInLine({
										row: t,
										column: a
									}, p))
								},
								_ = function (e, t) {
									var n;
									(n = e.match(g)) && r.removeInLine(t, e.length - n[0].length, e.length), (n = e.match(f)) && r.removeInLine(t, n[1].length, n[0].length)
								},
								E = function (e, n) {
									if (f.test(e)) return !0;
									for (var i = t.getTokens(n), r = 0; r < i.length; r++)
										if ("comment" === i[r].type) return !0
								}
						}

						function C(e) {
							for (var t = n; t <= i; t++) e(r.getLine(t), t)
						}
						var A = 1 / 0;
						C((function (e, t) {
							var n = e.search(/\S/); - 1 !== n ? (n < a && (a = n), s && !E(e, t) && (s = !1)) : A > e.length && (A = e.length)
						})), a == 1 / 0 && (a = A, o = !1, s = !1), u && a % l != 0 && (a = Math.floor(a / l) * l), C(s ? _ : v)
					}, this.toggleBlockComment = function (e, t, n, i) {
						var r = this.blockComment;
						if (r) {
							!r.start && r[0] && (r = r[0]);
							var o, s, a = (f = new l(t, i.row, i.column)).getCurrentToken(),
								c = (t.selection, t.selection.toOrientedRange());
							if (a && /comment/.test(a.type)) {
								for (var h, d; a && /comment/.test(a.type);) {
									if (-1 != (g = a.value.indexOf(r.start))) {
										var p = f.getCurrentTokenRow(),
											m = f.getCurrentTokenColumn() + g;
										h = new u(p, m, p, m + r.start.length);
										break
									}
									a = f.stepBackward()
								}
								var f;
								for (a = (f = new l(t, i.row, i.column)).getCurrentToken(); a && /comment/.test(a.type);) {
									var g;
									if (-1 != (g = a.value.indexOf(r.end))) {
										p = f.getCurrentTokenRow(), m = f.getCurrentTokenColumn() + g;
										d = new u(p, m, p, m + r.end.length);
										break
									}
									a = f.stepForward()
								}
								d && t.remove(d), h && (t.remove(h), o = h.start.row, s = -r.start.length)
							} else s = r.start.length, o = n.start.row, t.insert(n.end, r.end), t.insert(n.start, r.start);
							c.start.row == o && (c.start.column += s), c.end.row == o && (c.end.column += s), t.selection.fromOrientedRange(c)
						}
					}, this.getNextLineIndent = function (e, t, n) {
						return this.$getIndent(t)
					}, this.checkOutdent = function (e, t, n) {
						return !1
					}, this.autoOutdent = function (e, t, n) {}, this.$getIndent = function (e) {
						return e.match(/^\s*/)[0]
					}, this.createWorker = function (e) {
						return null
					}, this.createModeDelegates = function (e) {
						for (var t in this.$embeds = [], this.$modes = {}, e)
							if (e[t]) {
								var n = e[t],
									r = n.prototype.$id,
									o = i.$modes[r];
								o || (i.$modes[r] = o = new n), i.$modes[t] || (i.$modes[t] = o), this.$embeds.push(t), this.$modes[t] = o
							} var s = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"];
						for (t = 0; t < s.length; t++) ! function (e) {
							var n = s[t],
								i = e[n];
							e[s[t]] = function () {
								return this.$delegator(n, arguments, i)
							}
						}(this)
					}, this.$delegator = function (e, t, n) {
						var i = t[0] || "start";
						if ("string" != typeof i) {
							if (Array.isArray(i[2])) {
								var r = i[2][i[2].length - 1];
								if (s = this.$modes[r]) return s[e].apply(s, [i[1]].concat([].slice.call(t, 1)))
							}
							i = i[0] || "start"
						}
						for (var o = 0; o < this.$embeds.length; o++)
							if (this.$modes[this.$embeds[o]]) {
								var s, a = i.split(this.$embeds[o]);
								if (!a[0] && a[1]) return t[0] = a[1], (s = this.$modes[this.$embeds[o]])[e].apply(s, t)
							} var c = n.apply(this, t);
						return n ? c : void 0
					}, this.transformAction = function (e, t, n, i, r) {
						if (this.$behaviour) {
							var o = this.$behaviour.getBehaviours();
							for (var s in o)
								if (o[s][t]) {
									var a = o[s][t].apply(this, arguments);
									if (a) return a
								}
						}
					}, this.getKeywords = function (e) {
						if (!this.completionKeywords) {
							var t = this.$tokenizer.rules,
								n = [];
							for (var i in t)
								for (var r = t[i], o = 0, s = r.length; o < s; o++)
									if ("string" == typeof r[o].token) /keyword|support|storage/.test(r[o].token) && n.push(r[o].regex);
									else if ("object" == typeof r[o].token)
								for (var a = 0, c = r[o].token.length; a < c; a++)
									if (/keyword|support|storage/.test(r[o].token[a])) {
										i = r[o].regex.match(/\(.+?\)/g)[a];
										n.push(i.substr(1, i.length - 2))
									} this.completionKeywords = n
						}
						return e ? n.concat(this.$keywordList || []) : this.$keywordList
					}, this.$createKeywordList = function () {
						return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || []
					}, this.getCompletions = function (e, t, n, i) {
						return (this.$keywordList || this.$createKeywordList()).map((function (e) {
							return {
								name: e,
								value: e,
								score: 0,
								meta: "keyword"
							}
						}))
					}, this.$id = "ace/mode/text"
				}).call(h.prototype), t.Mode = h
			})), ace.define("ace/apply_delta", ["require", "exports", "module"], (function (e, t, n) {
				"use strict";
				t.applyDelta = function (e, t, n) {
					var i = t.start.row,
						r = t.start.column,
						o = e[i] || "";
					switch (t.action) {
						case "insert":
							if (1 === t.lines.length) e[i] = o.substring(0, r) + t.lines[0] + o.substring(r);
							else {
								var s = [i, 1].concat(t.lines);
								e.splice.apply(e, s), e[i] = o.substring(0, r) + e[i], e[i + t.lines.length - 1] += o.substring(r)
							}
							break;
						case "remove":
							var a = t.end.column,
								c = t.end.row;
							i === c ? e[i] = o.substring(0, r) + o.substring(a) : e.splice(i, c - i + 1, o.substring(0, r) + e[c].substring(a))
					}
				}
			})), ace.define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/event_emitter").EventEmitter,
					o = t.Anchor = function (e, t, n) {
						this.$onChange = this.onChange.bind(this), this.attach(e), void 0 === n ? this.setPosition(t.row, t.column) : this.setPosition(t, n)
					};
				(function () {
					function e(e, t, n) {
						var i = n ? e.column <= t.column : e.column < t.column;
						return e.row < t.row || e.row == t.row && i
					}
					i.implement(this, r), this.getPosition = function () {
						return this.$clipPositionToDocument(this.row, this.column)
					}, this.getDocument = function () {
						return this.document
					}, this.$insertRight = !1, this.onChange = function (t) {
						if (!(t.start.row == t.end.row && t.start.row != this.row || t.start.row > this.row)) {
							var n = function (t, n, i) {
								var r = "insert" == t.action,
									o = (r ? 1 : -1) * (t.end.row - t.start.row),
									s = (r ? 1 : -1) * (t.end.column - t.start.column),
									a = t.start,
									c = r ? a : t.end;
								if (e(n, a, i)) return {
									row: n.row,
									column: n.column
								};
								if (e(c, n, !i)) return {
									row: n.row + o,
									column: n.column + (n.row == c.row ? s : 0)
								};
								return {
									row: a.row,
									column: a.column
								}
							}(t, {
								row: this.row,
								column: this.column
							}, this.$insertRight);
							this.setPosition(n.row, n.column, !0)
						}
					}, this.setPosition = function (e, t, n) {
						var i;
						if (i = n ? {
								row: e,
								column: t
							} : this.$clipPositionToDocument(e, t), this.row != i.row || this.column != i.column) {
							var r = {
								row: this.row,
								column: this.column
							};
							this.row = i.row, this.column = i.column, this._signal("change", {
								old: r,
								value: i
							})
						}
					}, this.detach = function () {
						this.document.removeEventListener("change", this.$onChange)
					}, this.attach = function (e) {
						this.document = e || this.document, this.document.on("change", this.$onChange)
					}, this.$clipPositionToDocument = function (e, t) {
						var n = {};
						return e >= this.document.getLength() ? (n.row = Math.max(0, this.document.getLength() - 1), n.column = this.document.getLine(n.row).length) : e < 0 ? (n.row = 0, n.column = 0) : (n.row = e, n.column = Math.min(this.document.getLine(n.row).length, Math.max(0, t))), t < 0 && (n.column = 0), n
					}
				}).call(o.prototype)
			})), ace.define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./apply_delta").applyDelta,
					o = e("./lib/event_emitter").EventEmitter,
					s = e("./range").Range,
					a = e("./anchor").Anchor,
					c = function (e) {
						this.$lines = [""], 0 === e.length ? this.$lines = [""] : Array.isArray(e) ? this.insertMergedLines({
							row: 0,
							column: 0
						}, e) : this.insert({
							row: 0,
							column: 0
						}, e)
					};
				(function () {
					i.implement(this, o), this.setValue = function (e) {
						var t = this.getLength() - 1;
						this.remove(new s(0, 0, t, this.getLine(t).length)), this.insert({
							row: 0,
							column: 0
						}, e)
					}, this.getValue = function () {
						return this.getAllLines().join(this.getNewLineCharacter())
					}, this.createAnchor = function (e, t) {
						return new a(this, e, t)
					}, 0 === "aaa".split(/a/).length ? this.$split = function (e) {
						return e.replace(/\r\n|\r/g, "\n").split("\n")
					} : this.$split = function (e) {
						return e.split(/\r\n|\r|\n/)
					}, this.$detectNewLine = function (e) {
						var t = e.match(/^.*?(\r\n|\r|\n)/m);
						this.$autoNewLine = t ? t[1] : "\n", this._signal("changeNewLineMode")
					}, this.getNewLineCharacter = function () {
						switch (this.$newLineMode) {
							case "windows":
								return "\r\n";
							case "unix":
								return "\n";
							default:
								return this.$autoNewLine || "\n"
						}
					}, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function (e) {
						this.$newLineMode !== e && (this.$newLineMode = e, this._signal("changeNewLineMode"))
					}, this.getNewLineMode = function () {
						return this.$newLineMode
					}, this.isNewLine = function (e) {
						return "\r\n" == e || "\r" == e || "\n" == e
					}, this.getLine = function (e) {
						return this.$lines[e] || ""
					}, this.getLines = function (e, t) {
						return this.$lines.slice(e, t + 1)
					}, this.getAllLines = function () {
						return this.getLines(0, this.getLength())
					}, this.getLength = function () {
						return this.$lines.length
					}, this.getTextRange = function (e) {
						return this.getLinesForRange(e).join(this.getNewLineCharacter())
					}, this.getLinesForRange = function (e) {
						var t;
						if (e.start.row === e.end.row) t = [this.getLine(e.start.row).substring(e.start.column, e.end.column)];
						else {
							(t = this.getLines(e.start.row, e.end.row))[0] = (t[0] || "").substring(e.start.column);
							var n = t.length - 1;
							e.end.row - e.start.row == n && (t[n] = t[n].substring(0, e.end.column))
						}
						return t
					}, this.insertLines = function (e, t) {
						return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(e, t)
					}, this.removeLines = function (e, t) {
						return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(e, t)
					}, this.insertNewLine = function (e) {
						return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(e, ["", ""])
					}, this.insert = function (e, t) {
						return this.getLength() <= 1 && this.$detectNewLine(t), this.insertMergedLines(e, this.$split(t))
					}, this.insertInLine = function (e, t) {
						var n = this.clippedPos(e.row, e.column),
							i = this.pos(e.row, e.column + t.length);
						return this.applyDelta({
							start: n,
							end: i,
							action: "insert",
							lines: [t]
						}, !0), this.clonePos(i)
					}, this.clippedPos = function (e, t) {
						var n = this.getLength();
						void 0 === e ? e = n : e < 0 ? e = 0 : e >= n && (e = n - 1, t = void 0);
						var i = this.getLine(e);
						return null == t && (t = i.length), {
							row: e,
							column: t = Math.min(Math.max(t, 0), i.length)
						}
					}, this.clonePos = function (e) {
						return {
							row: e.row,
							column: e.column
						}
					}, this.pos = function (e, t) {
						return {
							row: e,
							column: t
						}
					}, this.$clipPosition = function (e) {
						var t = this.getLength();
						return e.row >= t ? (e.row = Math.max(0, t - 1), e.column = this.getLine(t - 1).length) : (e.row = Math.max(0, e.row), e.column = Math.min(Math.max(e.column, 0), this.getLine(e.row).length)), e
					}, this.insertFullLines = function (e, t) {
						var n = 0;
						(e = Math.min(Math.max(e, 0), this.getLength())) < this.getLength() ? (t = t.concat([""]), n = 0) : (t = [""].concat(t), e--, n = this.$lines[e].length), this.insertMergedLines({
							row: e,
							column: n
						}, t)
					}, this.insertMergedLines = function (e, t) {
						var n = this.clippedPos(e.row, e.column),
							i = {
								row: n.row + t.length - 1,
								column: (1 == t.length ? n.column : 0) + t[t.length - 1].length
							};
						return this.applyDelta({
							start: n,
							end: i,
							action: "insert",
							lines: t
						}), this.clonePos(i)
					}, this.remove = function (e) {
						var t = this.clippedPos(e.start.row, e.start.column),
							n = this.clippedPos(e.end.row, e.end.column);
						return this.applyDelta({
							start: t,
							end: n,
							action: "remove",
							lines: this.getLinesForRange({
								start: t,
								end: n
							})
						}), this.clonePos(t)
					}, this.removeInLine = function (e, t, n) {
						var i = this.clippedPos(e, t),
							r = this.clippedPos(e, n);
						return this.applyDelta({
							start: i,
							end: r,
							action: "remove",
							lines: this.getLinesForRange({
								start: i,
								end: r
							})
						}, !0), this.clonePos(i)
					}, this.removeFullLines = function (e, t) {
						e = Math.min(Math.max(0, e), this.getLength() - 1);
						var n = (t = Math.min(Math.max(0, t), this.getLength() - 1)) == this.getLength() - 1 && e > 0,
							i = t < this.getLength() - 1,
							r = n ? e - 1 : e,
							o = n ? this.getLine(r).length : 0,
							a = i ? t + 1 : t,
							c = i ? 0 : this.getLine(a).length,
							l = new s(r, o, a, c),
							u = this.$lines.slice(e, t + 1);
						return this.applyDelta({
							start: l.start,
							end: l.end,
							action: "remove",
							lines: this.getLinesForRange(l)
						}), u
					}, this.removeNewLine = function (e) {
						e < this.getLength() - 1 && e >= 0 && this.applyDelta({
							start: this.pos(e, this.getLine(e).length),
							end: this.pos(e + 1, 0),
							action: "remove",
							lines: ["", ""]
						})
					}, this.replace = function (e, t) {
						return e instanceof s || (e = s.fromPoints(e.start, e.end)), 0 === t.length && e.isEmpty() ? e.start : t == this.getTextRange(e) ? e.end : (this.remove(e), t ? this.insert(e.start, t) : e.start)
					}, this.applyDeltas = function (e) {
						for (var t = 0; t < e.length; t++) this.applyDelta(e[t])
					}, this.revertDeltas = function (e) {
						for (var t = e.length - 1; t >= 0; t--) this.revertDelta(e[t])
					}, this.applyDelta = function (e, t) {
						var n = "insert" == e.action;
						(n ? e.lines.length <= 1 && !e.lines[0] : !s.comparePoints(e.start, e.end)) || (n && e.lines.length > 2e4 ? this.$splitAndapplyLargeDelta(e, 2e4) : (r(this.$lines, e, t), this._signal("change", e)))
					}, this.$splitAndapplyLargeDelta = function (e, t) {
						for (var n = e.lines, i = n.length - t + 1, r = e.start.row, o = e.start.column, s = 0, a = 0; s < i; s = a) {
							a += t - 1;
							var c = n.slice(s, a);
							c.push(""), this.applyDelta({
								start: this.pos(r + s, o),
								end: this.pos(r + a, o = 0),
								action: e.action,
								lines: c
							}, !0)
						}
						e.lines = n.slice(s), e.start.row = r + s, e.start.column = o, this.applyDelta(e, !0)
					}, this.revertDelta = function (e) {
						this.applyDelta({
							start: this.clonePos(e.start),
							end: this.clonePos(e.end),
							action: "insert" == e.action ? "remove" : "insert",
							lines: e.lines.slice()
						})
					}, this.indexToPosition = function (e, t) {
						for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, r = t || 0, o = n.length; r < o; r++)
							if ((e -= n[r].length + i) < 0) return {
								row: r,
								column: e + n[r].length + i
							};
						return {
							row: o - 1,
							column: e + n[o - 1].length + i
						}
					}, this.positionToIndex = function (e, t) {
						for (var n = this.$lines || this.getAllLines(), i = this.getNewLineCharacter().length, r = 0, o = Math.min(e.row, n.length), s = t || 0; s < o; ++s) r += n[s].length + i;
						return r + e.column
					}
				}).call(c.prototype), t.Document = c
			})), ace.define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/event_emitter").EventEmitter,
					o = function (e, t) {
						this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = e;
						var n = this;
						this.$worker = function () {
							if (n.running) {
								for (var e = new Date, t = n.currentLine, i = -1, r = n.doc, o = t; n.lines[t];) t++;
								var s = r.getLength(),
									a = 0;
								for (n.running = !1; t < s;) {
									n.$tokenizeRow(t), i = t;
									do {
										t++
									} while (n.lines[t]);
									if (++a % 5 == 0 && new Date - e > 20) {
										n.running = setTimeout(n.$worker, 20);
										break
									}
								}
								n.currentLine = t, -1 == i && (i = t), o <= i && n.fireUpdateEvent(o, i)
							}
						}
					};
				(function () {
					i.implement(this, r), this.setTokenizer = function (e) {
						this.tokenizer = e, this.lines = [], this.states = [], this.start(0)
					}, this.setDocument = function (e) {
						this.doc = e, this.lines = [], this.states = [], this.stop()
					}, this.fireUpdateEvent = function (e, t) {
						var n = {
							first: e,
							last: t
						};
						this._signal("update", {
							data: n
						})
					}, this.start = function (e) {
						this.currentLine = Math.min(e || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
					}, this.scheduleStart = function () {
						this.running || (this.running = setTimeout(this.$worker, 700))
					}, this.$updateOnChange = function (e) {
						var t = e.start.row,
							n = e.end.row - t;
						if (0 === n) this.lines[t] = null;
						else if ("remove" == e.action) this.lines.splice(t, n + 1, null), this.states.splice(t, n + 1, null);
						else {
							var i = Array(n + 1);
							i.unshift(t, 1), this.lines.splice.apply(this.lines, i), this.states.splice.apply(this.states, i)
						}
						this.currentLine = Math.min(t, this.currentLine, this.doc.getLength()), this.stop()
					}, this.stop = function () {
						this.running && clearTimeout(this.running), this.running = !1
					}, this.getTokens = function (e) {
						return this.lines[e] || this.$tokenizeRow(e)
					}, this.getState = function (e) {
						return this.currentLine == e && this.$tokenizeRow(e), this.states[e] || "start"
					}, this.$tokenizeRow = function (e) {
						var t = this.doc.getLine(e),
							n = this.states[e - 1],
							i = this.tokenizer.getLineTokens(t, n, e);
						return this.states[e] + "" != i.state + "" ? (this.states[e] = i.state, this.lines[e + 1] = null, this.currentLine > e + 1 && (this.currentLine = e + 1)) : this.currentLine == e && (this.currentLine = e + 1), this.lines[e] = i.tokens
					}
				}).call(o.prototype), t.BackgroundTokenizer = o
			})), ace.define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/lang"),
					r = (e("./lib/oop"), e("./range").Range),
					o = function (e, t, n) {
						this.setRegexp(e), this.clazz = t, this.type = n || "text"
					};
				(function () {
					this.MAX_RANGES = 500, this.setRegexp = function (e) {
						this.regExp + "" != e + "" && (this.regExp = e, this.cache = [])
					}, this.update = function (e, t, n, o) {
						if (this.regExp)
							for (var s = o.firstRow, a = o.lastRow, c = s; c <= a; c++) {
								var l = this.cache[c];
								null == l && ((l = i.getMatchOffsets(n.getLine(c), this.regExp)).length > this.MAX_RANGES && (l = l.slice(0, this.MAX_RANGES)), l = l.map((function (e) {
									return new r(c, e.offset, c, e.offset + e.length)
								})), this.cache[c] = l.length ? l : "");
								for (var u = l.length; u--;) t.drawSingleLineMarker(e, l[u].toScreenRange(n), this.clazz, o)
							}
					}
				}).call(o.prototype), t.SearchHighlight = o
			})), ace.define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../range").Range;

				function r(e, t) {
					this.foldData = e, Array.isArray(t) ? this.folds = t : t = this.folds = [t];
					var n = t[t.length - 1];
					this.range = new i(t[0].start.row, t[0].start.column, n.end.row, n.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach((function (e) {
						e.setFoldLine(this)
					}), this)
				}(function () {
					this.shiftRow = function (e) {
						this.start.row += e, this.end.row += e, this.folds.forEach((function (t) {
							t.start.row += e, t.end.row += e
						}))
					}, this.addFold = function (e) {
						if (e.sameRow) {
							if (e.start.row < this.startRow || e.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
							this.folds.push(e), this.folds.sort((function (e, t) {
								return -e.range.compareEnd(t.start.row, t.start.column)
							})), this.range.compareEnd(e.start.row, e.start.column) > 0 ? (this.end.row = e.end.row, this.end.column = e.end.column) : this.range.compareStart(e.end.row, e.end.column) < 0 && (this.start.row = e.start.row, this.start.column = e.start.column)
						} else if (e.start.row == this.end.row) this.folds.push(e), this.end.row = e.end.row, this.end.column = e.end.column;
						else {
							if (e.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
							this.folds.unshift(e), this.start.row = e.start.row, this.start.column = e.start.column
						}
						e.foldLine = this
					}, this.containsRow = function (e) {
						return e >= this.start.row && e <= this.end.row
					}, this.walk = function (e, t, n) {
						var i, r, o = 0,
							s = this.folds,
							a = !0;
						null == t && (t = this.end.row, n = this.end.column);
						for (var c = 0; c < s.length; c++) {
							if (-1 == (r = (i = s[c]).range.compareStart(t, n))) return void e(null, t, n, o, a);
							if (!e(null, i.start.row, i.start.column, o, a) && e(i.placeholder, i.start.row, i.start.column, o) || 0 === r) return;
							a = !i.sameRow, o = i.end.column
						}
						e(null, t, n, o, a)
					}, this.getNextFoldTo = function (e, t) {
						for (var n, i, r = 0; r < this.folds.length; r++) {
							if (-1 == (i = (n = this.folds[r]).range.compareEnd(e, t))) return {
								fold: n,
								kind: "after"
							};
							if (0 === i) return {
								fold: n,
								kind: "inside"
							}
						}
						return null
					}, this.addRemoveChars = function (e, t, n) {
						var i, r, o = this.getNextFoldTo(e, t);
						if (o)
							if (i = o.fold, "inside" == o.kind && i.start.column != t && i.start.row != e) window.console && window.console.log(e, t, i);
							else if (i.start.row == e) {
							var s = (r = this.folds).indexOf(i);
							for (0 === s && (this.start.column += n); s < r.length; s++) {
								if ((i = r[s]).start.column += n, !i.sameRow) return;
								i.end.column += n
							}
							this.end.column += n
						}
					}, this.split = function (e, t) {
						var n = this.getNextFoldTo(e, t);
						if (!n || "inside" == n.kind) return null;
						var i = n.fold,
							o = this.folds,
							s = this.foldData,
							a = o.indexOf(i),
							c = o[a - 1];
						this.end.row = c.end.row, this.end.column = c.end.column;
						var l = new r(s, o = o.splice(a, o.length - a));
						return s.splice(s.indexOf(this) + 1, 0, l), l
					}, this.merge = function (e) {
						for (var t = e.folds, n = 0; n < t.length; n++) this.addFold(t[n]);
						var i = this.foldData;
						i.splice(i.indexOf(e), 1)
					}, this.toString = function () {
						var e = [this.range.toString() + ": ["];
						return this.folds.forEach((function (t) {
							e.push("  " + t.toString())
						})), e.push("]"), e.join("\n")
					}, this.idxToPosition = function (e) {
						for (var t = 0, n = 0; n < this.folds.length; n++) {
							var i = this.folds[n];
							if ((e -= i.start.column - t) < 0) return {
								row: i.start.row,
								column: i.start.column + e
							};
							if ((e -= i.placeholder.length) < 0) return i.start;
							t = i.end.column
						}
						return {
							row: this.end.row,
							column: this.end.column + e
						}
					}
				}).call(r.prototype), t.FoldLine = r
			})), ace.define("ace/range_list", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("./range").Range.comparePoints,
					r = function () {
						this.ranges = [], this.$bias = 1
					};
				(function () {
					this.comparePoints = i, this.pointIndex = function (e, t, n) {
						for (var r = this.ranges, o = n || 0; o < r.length; o++) {
							var s = r[o],
								a = i(e, s.end);
							if (!(a > 0)) {
								var c = i(e, s.start);
								return 0 === a ? t && 0 !== c ? -o - 2 : o : c > 0 || 0 === c && !t ? o : -o - 1
							}
						}
						return -o - 1
					}, this.add = function (e) {
						var t = !e.isEmpty(),
							n = this.pointIndex(e.start, t);
						n < 0 && (n = -n - 1);
						var i = this.pointIndex(e.end, t, n);
						return i < 0 ? i = -i - 1 : i++, this.ranges.splice(n, i - n, e)
					}, this.addList = function (e) {
						for (var t = [], n = e.length; n--;) t.push.apply(t, this.add(e[n]));
						return t
					}, this.substractPoint = function (e) {
						var t = this.pointIndex(e);
						if (t >= 0) return this.ranges.splice(t, 1)
					}, this.merge = function () {
						for (var e, t = [], n = this.ranges, r = (n = n.sort((function (e, t) {
								return i(e.start, t.start)
							})))[0], o = 1; o < n.length; o++) {
							e = r, r = n[o];
							var s = i(e.end, r.start);
							s < 0 || (0 != s || e.isEmpty() || r.isEmpty()) && (i(e.end, r.end) < 0 && (e.end.row = r.end.row, e.end.column = r.end.column), n.splice(o, 1), t.push(r), r = e, o--)
						}
						return this.ranges = n, t
					}, this.contains = function (e, t) {
						return this.pointIndex({
							row: e,
							column: t
						}) >= 0
					}, this.containsPoint = function (e) {
						return this.pointIndex(e) >= 0
					}, this.rangeAtPoint = function (e) {
						var t = this.pointIndex(e);
						if (t >= 0) return this.ranges[t]
					}, this.clipRows = function (e, t) {
						var n = this.ranges;
						if (n[0].start.row > t || n[n.length - 1].start.row < e) return [];
						var i = this.pointIndex({
							row: e,
							column: 0
						});
						i < 0 && (i = -i - 1);
						var r = this.pointIndex({
							row: t,
							column: 0
						}, i);
						r < 0 && (r = -r - 1);
						for (var o = [], s = i; s < r; s++) o.push(n[s]);
						return o
					}, this.removeAll = function () {
						return this.ranges.splice(0, this.ranges.length)
					}, this.attach = function (e) {
						this.session && this.detach(), this.session = e, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
					}, this.detach = function () {
						this.session && (this.session.removeListener("change", this.onChange), this.session = null)
					}, this.$onChange = function (e) {
						for (var t = e.start, n = e.end, i = t.row, r = n.row, o = this.ranges, s = 0, a = o.length; s < a; s++) {
							if ((u = o[s]).end.row >= i) break
						}
						if ("insert" == e.action)
							for (var c = r - i, l = -t.column + n.column; s < a; s++) {
								if ((u = o[s]).start.row > i) break;
								if (u.start.row == i && u.start.column >= t.column && (u.start.column == t.column && this.$bias <= 0 || (u.start.column += l, u.start.row += c)), u.end.row == i && u.end.column >= t.column) {
									if (u.end.column == t.column && this.$bias < 0) continue;
									u.end.column == t.column && l > 0 && s < a - 1 && u.end.column > u.start.column && u.end.column == o[s + 1].start.column && (u.end.column -= l), u.end.column += l, u.end.row += c
								}
							} else
								for (c = i - r, l = t.column - n.column; s < a; s++) {
									if ((u = o[s]).start.row > r) break;
									u.end.row < r && (i < u.end.row || i == u.end.row && t.column < u.end.column) ? (u.end.row = i, u.end.column = t.column) : u.end.row == r ? u.end.column <= n.column ? (c || u.end.column > t.column) && (u.end.column = t.column, u.end.row = t.row) : (u.end.column += l, u.end.row += c) : u.end.row > r && (u.end.row += c), u.start.row < r && (i < u.start.row || i == u.start.row && t.column < u.start.column) ? (u.start.row = i, u.start.column = t.column) : u.start.row == r ? u.start.column <= n.column ? (c || u.start.column > t.column) && (u.start.column = t.column, u.start.row = t.row) : (u.start.column += l, u.start.row += c) : u.start.row > r && (u.start.row += c)
								}
						if (0 != c && s < a)
							for (; s < a; s++) {
								var u;
								(u = o[s]).start.row += c, u.end.row += c
							}
					}
				}).call(r.prototype), t.RangeList = r
			})), ace.define("ace/edit_session/fold", ["require", "exports", "module", "ace/range_list", "ace/lib/oop"], (function (e, t, n) {
				"use strict";
				var i = e("../range_list").RangeList,
					r = e("../lib/oop"),
					o = t.Fold = function (e, t) {
						this.foldLine = null, this.placeholder = t, this.range = e, this.start = e.start, this.end = e.end, this.sameRow = e.start.row == e.end.row, this.subFolds = this.ranges = []
					};

				function s(e, t) {
					e.row -= t.row, 0 == e.row && (e.column -= t.column)
				}

				function a(e, t) {
					0 == e.row && (e.column += t.column), e.row += t.row
				}
				r.inherits(o, i),
					function () {
						this.toString = function () {
							return '"' + this.placeholder + '" ' + this.range.toString()
						}, this.setFoldLine = function (e) {
							this.foldLine = e, this.subFolds.forEach((function (t) {
								t.setFoldLine(e)
							}))
						}, this.clone = function () {
							var e = this.range.clone(),
								t = new o(e, this.placeholder);
							return this.subFolds.forEach((function (e) {
								t.subFolds.push(e.clone())
							})), t.collapseChildren = this.collapseChildren, t
						}, this.addSubFold = function (e) {
							if (!this.range.isEqual(e)) {
								var t, n;
								t = e, n = this.start, s(t.start, n), s(t.end, n);
								for (var i = e.start.row, r = e.start.column, o = 0, a = -1; o < this.subFolds.length && 1 == (a = this.subFolds[o].range.compare(i, r)); o++);
								var c = this.subFolds[o],
									l = 0;
								if (0 == a) {
									if (c.range.containsRange(e)) return c.addSubFold(e);
									l = 1
								}
								i = e.range.end.row, r = e.range.end.column;
								var u = o;
								for (a = -1; u < this.subFolds.length && 1 == (a = this.subFolds[u].range.compare(i, r)); u++);
								0 == a && u++;
								for (var h = this.subFolds.splice(o, u - o, e), d = 0 == a ? h.length - 1 : h.length, p = l; p < d; p++) e.addSubFold(h[p]);
								return e.setFoldLine(this.foldLine), e
							}
						}, this.restoreRange = function (e) {
							return function (e, t) {
								a(e.start, t), a(e.end, t)
							}(e, this.start)
						}
					}.call(o.prototype)
			})), ace.define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], (function (e, t, n) {
				"use strict";
				var i = e("../range").Range,
					r = e("./fold_line").FoldLine,
					o = e("./fold").Fold,
					s = e("../token_iterator").TokenIterator;
				t.Folding = function () {
					this.getFoldAt = function (e, t, n) {
						var i = this.getFoldLine(e);
						if (!i) return null;
						for (var r = i.folds, o = 0; o < r.length; o++) {
							var s = r[o].range;
							if (s.contains(e, t)) {
								if (1 == n && s.isEnd(e, t) && !s.isEmpty()) continue;
								if (-1 == n && s.isStart(e, t) && !s.isEmpty()) continue;
								return r[o]
							}
						}
					}, this.getFoldsInRange = function (e) {
						var t = e.start,
							n = e.end,
							i = this.$foldData,
							r = [];
						t.column += 1, n.column -= 1;
						for (var o = 0; o < i.length; o++) {
							var s = i[o].range.compareRange(e);
							if (2 != s) {
								if (-2 == s) break;
								for (var a = i[o].folds, c = 0; c < a.length; c++) {
									var l = a[c];
									if (-2 == (s = l.range.compareRange(e))) break;
									if (2 != s) {
										if (42 == s) break;
										r.push(l)
									}
								}
							}
						}
						return t.column -= 1, n.column += 1, r
					}, this.getFoldsInRangeList = function (e) {
						if (Array.isArray(e)) {
							var t = [];
							e.forEach((function (e) {
								t = t.concat(this.getFoldsInRange(e))
							}), this)
						} else t = this.getFoldsInRange(e);
						return t
					}, this.getAllFolds = function () {
						for (var e = [], t = this.$foldData, n = 0; n < t.length; n++)
							for (var i = 0; i < t[n].folds.length; i++) e.push(t[n].folds[i]);
						return e
					}, this.getFoldStringAt = function (e, t, n, i) {
						if (!(i = i || this.getFoldLine(e))) return null;
						for (var r, o, s = {
								end: {
									column: 0
								}
							}, a = 0; a < i.folds.length; a++) {
							var c = (o = i.folds[a]).range.compareEnd(e, t);
							if (-1 == c) {
								r = this.getLine(o.start.row).substring(s.end.column, o.start.column);
								break
							}
							if (0 === c) return null;
							s = o
						}
						return r || (r = this.getLine(o.start.row).substring(s.end.column)), -1 == n ? r.substring(0, t - s.end.column) : 1 == n ? r.substring(t - s.end.column) : r
					}, this.getFoldLine = function (e, t) {
						var n = this.$foldData,
							i = 0;
						for (t && (i = n.indexOf(t)), -1 == i && (i = 0); i < n.length; i++) {
							var r = n[i];
							if (r.start.row <= e && r.end.row >= e) return r;
							if (r.end.row > e) return null
						}
						return null
					}, this.getNextFoldLine = function (e, t) {
						var n = this.$foldData,
							i = 0;
						for (t && (i = n.indexOf(t)), -1 == i && (i = 0); i < n.length; i++) {
							var r = n[i];
							if (r.end.row >= e) return r
						}
						return null
					}, this.getFoldedRowCount = function (e, t) {
						for (var n = this.$foldData, i = t - e + 1, r = 0; r < n.length; r++) {
							var o = n[r],
								s = o.end.row,
								a = o.start.row;
							if (s >= t) {
								a < t && (a >= e ? i -= t - a : i = 0);
								break
							}
							s >= e && (i -= a >= e ? s - a : s - e + 1)
						}
						return i
					}, this.$addFoldLine = function (e) {
						return this.$foldData.push(e), this.$foldData.sort((function (e, t) {
							return e.start.row - t.start.row
						})), e
					}, this.addFold = function (e, t) {
						var n, i = this.$foldData,
							s = !1;
						e instanceof o ? n = e : (n = new o(t, e)).collapseChildren = t.collapseChildren, this.$clipRangeToDocument(n.range);
						var a = n.start.row,
							c = n.start.column,
							l = n.end.row,
							u = n.end.column,
							h = this.getFoldAt(a, c, 1),
							d = this.getFoldAt(l, u, -1);
						if (h && d == h) return h.addSubFold(n);
						h && !h.range.isStart(a, c) && this.removeFold(h), d && !d.range.isEnd(l, u) && this.removeFold(d);
						var p = this.getFoldsInRange(n.range);
						p.length > 0 && (this.removeFolds(p), p.forEach((function (e) {
							n.addSubFold(e)
						})));
						for (var m = 0; m < i.length; m++) {
							var f = i[m];
							if (l == f.start.row) {
								f.addFold(n), s = !0;
								break
							}
							if (a == f.end.row) {
								if (f.addFold(n), s = !0, !n.sameRow) {
									var g = i[m + 1];
									if (g && g.start.row == l) {
										f.merge(g);
										break
									}
								}
								break
							}
							if (l <= f.start.row) break
						}
						return s || (f = this.$addFoldLine(new r(this.$foldData, n))), this.$useWrapMode ? this.$updateWrapData(f.start.row, f.start.row) : this.$updateRowLengthCache(f.start.row, f.start.row), this.$modified = !0, this._signal("changeFold", {
							data: n,
							action: "add"
						}), n
					}, this.addFolds = function (e) {
						e.forEach((function (e) {
							this.addFold(e)
						}), this)
					}, this.removeFold = function (e) {
						var t = e.foldLine,
							n = t.start.row,
							i = t.end.row,
							r = this.$foldData,
							o = t.folds;
						if (1 == o.length) r.splice(r.indexOf(t), 1);
						else if (t.range.isEnd(e.end.row, e.end.column)) o.pop(), t.end.row = o[o.length - 1].end.row, t.end.column = o[o.length - 1].end.column;
						else if (t.range.isStart(e.start.row, e.start.column)) o.shift(), t.start.row = o[0].start.row, t.start.column = o[0].start.column;
						else if (e.sameRow) o.splice(o.indexOf(e), 1);
						else {
							var s = t.split(e.start.row, e.start.column);
							(o = s.folds).shift(), s.start.row = o[0].start.row, s.start.column = o[0].start.column
						}
						this.$updating || (this.$useWrapMode ? this.$updateWrapData(n, i) : this.$updateRowLengthCache(n, i)), this.$modified = !0, this._signal("changeFold", {
							data: e,
							action: "remove"
						})
					}, this.removeFolds = function (e) {
						for (var t = [], n = 0; n < e.length; n++) t.push(e[n]);
						t.forEach((function (e) {
							this.removeFold(e)
						}), this), this.$modified = !0
					}, this.expandFold = function (e) {
						this.removeFold(e), e.subFolds.forEach((function (t) {
							e.restoreRange(t), this.addFold(t)
						}), this), e.collapseChildren > 0 && this.foldAll(e.start.row + 1, e.end.row, e.collapseChildren - 1), e.subFolds = []
					}, this.expandFolds = function (e) {
						e.forEach((function (e) {
							this.expandFold(e)
						}), this)
					}, this.unfold = function (e, t) {
						var n, r;
						if (null == e ? (n = new i(0, 0, this.getLength(), 0), t = !0) : n = "number" == typeof e ? new i(e, 0, e, this.getLine(e).length) : "row" in e ? i.fromPoints(e, e) : e, r = this.getFoldsInRangeList(n), t) this.removeFolds(r);
						else
							for (var o = r; o.length;) this.expandFolds(o), o = this.getFoldsInRangeList(n);
						if (r.length) return r
					}, this.isRowFolded = function (e, t) {
						return !!this.getFoldLine(e, t)
					}, this.getRowFoldEnd = function (e, t) {
						var n = this.getFoldLine(e, t);
						return n ? n.end.row : e
					}, this.getRowFoldStart = function (e, t) {
						var n = this.getFoldLine(e, t);
						return n ? n.start.row : e
					}, this.getFoldDisplayLine = function (e, t, n, i, r) {
						null == i && (i = e.start.row), null == r && (r = 0), null == t && (t = e.end.row), null == n && (n = this.getLine(t).length);
						var o = this.doc,
							s = "";
						return e.walk((function (e, t, n, a) {
							if (!(t < i)) {
								if (t == i) {
									if (n < r) return;
									a = Math.max(r, a)
								}
								s += null != e ? e : o.getLine(t).substring(a, n)
							}
						}), t, n), s
					}, this.getDisplayLine = function (e, t, n, i) {
						var r, o = this.getFoldLine(e);
						return o ? this.getFoldDisplayLine(o, e, t, n, i) : (r = this.doc.getLine(e)).substring(i || 0, t || r.length)
					}, this.$cloneFoldData = function () {
						var e = [];
						return e = this.$foldData.map((function (t) {
							var n = t.folds.map((function (e) {
								return e.clone()
							}));
							return new r(e, n)
						}))
					}, this.toggleFold = function (e) {
						var t, n, i = this.selection.getRange();
						if (i.isEmpty()) {
							var r = i.start;
							if (t = this.getFoldAt(r.row, r.column)) return void this.expandFold(t);
							(n = this.findMatchingBracket(r)) ? 1 == i.comparePoint(n) ? i.end = n : (i.start = n, i.start.column++, i.end.column--): (n = this.findMatchingBracket({
								row: r.row,
								column: r.column + 1
							})) ? (1 == i.comparePoint(n) ? i.end = n : i.start = n, i.start.column++) : i = this.getCommentFoldRange(r.row, r.column) || i
						} else {
							var o = this.getFoldsInRange(i);
							if (e && o.length) return void this.expandFolds(o);
							1 == o.length && (t = o[0])
						}
						if (t || (t = this.getFoldAt(i.start.row, i.start.column)), t && t.range.toString() == i.toString()) this.expandFold(t);
						else {
							var s = "...";
							if (!i.isMultiLine()) {
								if ((s = this.getTextRange(i)).length < 4) return;
								s = s.trim().substring(0, 2) + ".."
							}
							this.addFold(s, i)
						}
					}, this.getCommentFoldRange = function (e, t, n) {
						var r = new s(this, e, t),
							o = r.getCurrentToken(),
							a = o.type;
						if (o && /^comment|string/.test(a)) {
							"comment" == (a = a.match(/comment|string/)[0]) && (a += "|doc-start");
							var c = new RegExp(a),
								l = new i;
							if (1 != n) {
								do {
									o = r.stepBackward()
								} while (o && c.test(o.type));
								r.stepForward()
							}
							if (l.start.row = r.getCurrentTokenRow(), l.start.column = r.getCurrentTokenColumn() + 2, r = new s(this, e, t), -1 != n) {
								var u = -1;
								do {
									if (o = r.stepForward(), -1 == u) {
										var h = this.getState(r.$row);
										c.test(h) || (u = r.$row)
									} else if (r.$row > u) break
								} while (o && c.test(o.type));
								o = r.stepBackward()
							} else o = r.getCurrentToken();
							return l.end.row = r.getCurrentTokenRow(), l.end.column = r.getCurrentTokenColumn() + o.value.length - 2, l
						}
					}, this.foldAll = function (e, t, n) {
						null == n && (n = 1e5);
						var i = this.foldWidgets;
						if (i) {
							t = t || this.getLength();
							for (var r = e = e || 0; r < t; r++)
								if (null == i[r] && (i[r] = this.getFoldWidget(r)), "start" == i[r]) {
									var o = this.getFoldWidgetRange(r);
									if (o && o.isMultiLine() && o.end.row <= t && o.start.row >= e) {
										r = o.end.row;
										try {
											var s = this.addFold("...", o);
											s && (s.collapseChildren = n)
										} catch (e) {}
									}
								}
						}
					}, this.$foldStyles = {
						manual: 1,
						markbegin: 1,
						markbeginend: 1
					}, this.$foldStyle = "markbegin", this.setFoldStyle = function (e) {
						if (!this.$foldStyles[e]) throw new Error("invalid fold style: " + e + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
						if (this.$foldStyle != e) {
							this.$foldStyle = e, "manual" == e && this.unfold();
							var t = this.$foldMode;
							this.$setFolding(null), this.$setFolding(t)
						}
					}, this.$setFolding = function (e) {
						this.$foldMode != e && (this.$foldMode = e, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), e && "manual" != this.$foldStyle ? (this.foldWidgets = [], this.getFoldWidget = e.getFoldWidget.bind(e, this, this.$foldStyle), this.getFoldWidgetRange = e.getFoldWidgetRange.bind(e, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)) : this.foldWidgets = null)
					}, this.getParentFoldRangeData = function (e, t) {
						var n = this.foldWidgets;
						if (!n || t && n[e]) return {};
						for (var i, r = e - 1; r >= 0;) {
							var o = n[r];
							if (null == o && (o = n[r] = this.getFoldWidget(r)), "start" == o) {
								var s = this.getFoldWidgetRange(r);
								if (i || (i = s), s && s.end.row >= e) break
							}
							r--
						}
						return {
							range: -1 !== r && s,
							firstRange: i
						}
					}, this.onFoldWidgetClick = function (e, t) {
						var n = {
							children: (t = t.domEvent).shiftKey,
							all: t.ctrlKey || t.metaKey,
							siblings: t.altKey
						};
						if (!this.$toggleFoldWidget(e, n)) {
							var i = t.target || t.srcElement;
							i && /ace_fold-widget/.test(i.className) && (i.className += " ace_invalid")
						}
					}, this.$toggleFoldWidget = function (e, t) {
						if (this.getFoldWidget) {
							var n = this.getFoldWidget(e),
								i = this.getLine(e),
								r = "end" === n ? -1 : 1,
								o = this.getFoldAt(e, -1 === r ? 0 : i.length, r);
							if (o) return t.children || t.all ? this.removeFold(o) : this.expandFold(o), o;
							var s = this.getFoldWidgetRange(e, !0);
							if (s && !s.isMultiLine() && (o = this.getFoldAt(s.start.row, s.start.column, 1)) && s.isEqual(o.range)) return this.removeFold(o), o;
							if (t.siblings) {
								var a = this.getParentFoldRangeData(e);
								if (a.range) var c = a.range.start.row + 1,
									l = a.range.end.row;
								this.foldAll(c, l, t.all ? 1e4 : 0)
							} else t.children ? (l = s ? s.end.row : this.getLength(), this.foldAll(e + 1, l, t.all ? 1e4 : 0)) : s && (t.all && (s.collapseChildren = 1e4), this.addFold("...", s));
							return s
						}
					}, this.toggleFoldWidget = function (e) {
						var t = this.selection.getCursor().row;
						t = this.getRowFoldStart(t);
						var n = this.$toggleFoldWidget(t, {});
						if (!n) {
							var i = this.getParentFoldRangeData(t, !0);
							if (n = i.range || i.firstRange) {
								t = n.start.row;
								var r = this.getFoldAt(t, this.getLine(t).length, 1);
								r ? this.removeFold(r) : this.addFold("...", n)
							}
						}
					}, this.updateFoldWidgets = function (e) {
						var t = e.start.row,
							n = e.end.row - t;
						if (0 === n) this.foldWidgets[t] = null;
						else if ("remove" == e.action) this.foldWidgets.splice(t, n + 1, null);
						else {
							var i = Array(n + 1);
							i.unshift(t, 1), this.foldWidgets.splice.apply(this.foldWidgets, i)
						}
					}, this.tokenizerUpdateFoldWidgets = function (e) {
						var t = e.data;
						t.first != t.last && this.foldWidgets.length > t.first && this.foldWidgets.splice(t.first, this.foldWidgets.length)
					}
				}
			})), ace.define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../token_iterator").TokenIterator,
					r = e("../range").Range;
				t.BracketMatch = function () {
					this.findMatchingBracket = function (e, t) {
						if (0 == e.column) return null;
						var n = t || this.getLine(e.row).charAt(e.column - 1);
						if ("" == n) return null;
						var i = n.match(/([\(\[\{])|([\)\]\}])/);
						return i ? i[1] ? this.$findClosingBracket(i[1], e) : this.$findOpeningBracket(i[2], e) : null
					}, this.getBracketRange = function (e) {
						var t, n = this.getLine(e.row),
							i = !0,
							o = n.charAt(e.column - 1),
							s = o && o.match(/([\(\[\{])|([\)\]\}])/);
						if (s || (o = n.charAt(e.column), e = {
								row: e.row,
								column: e.column + 1
							}, s = o && o.match(/([\(\[\{])|([\)\]\}])/), i = !1), !s) return null;
						if (s[1]) {
							if (!(a = this.$findClosingBracket(s[1], e))) return null;
							t = r.fromPoints(e, a), i || (t.end.column++, t.start.column--), t.cursor = t.end
						} else {
							var a;
							if (!(a = this.$findOpeningBracket(s[2], e))) return null;
							t = r.fromPoints(a, e), i || (t.start.column++, t.end.column--), t.cursor = t.start
						}
						return t
					}, this.$brackets = {
						")": "(",
						"(": ")",
						"]": "[",
						"[": "]",
						"{": "}",
						"}": "{",
						"<": ">",
						">": "<"
					}, this.$findOpeningBracket = function (e, t, n) {
						var r = this.$brackets[e],
							o = 1,
							s = new i(this, t.row, t.column),
							a = s.getCurrentToken();
						if (a || (a = s.stepForward()), a) {
							n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
							for (var c = t.column - s.getCurrentTokenColumn() - 2, l = a.value;;) {
								for (; c >= 0;) {
									var u = l.charAt(c);
									if (u == r) {
										if (0 == (o -= 1)) return {
											row: s.getCurrentTokenRow(),
											column: c + s.getCurrentTokenColumn()
										}
									} else u == e && (o += 1);
									c -= 1
								}
								do {
									a = s.stepBackward()
								} while (a && !n.test(a.type));
								if (null == a) break;
								c = (l = a.value).length - 1
							}
							return null
						}
					}, this.$findClosingBracket = function (e, t, n) {
						var r = this.$brackets[e],
							o = 1,
							s = new i(this, t.row, t.column),
							a = s.getCurrentToken();
						if (a || (a = s.stepForward()), a) {
							n || (n = new RegExp("(\\.?" + a.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
							for (var c = t.column - s.getCurrentTokenColumn();;) {
								for (var l = a.value, u = l.length; c < u;) {
									var h = l.charAt(c);
									if (h == r) {
										if (0 == (o -= 1)) return {
											row: s.getCurrentTokenRow(),
											column: c + s.getCurrentTokenColumn()
										}
									} else h == e && (o += 1);
									c += 1
								}
								do {
									a = s.stepForward()
								} while (a && !n.test(a.type));
								if (null == a) break;
								c = 0
							}
							return null
						}
					}
				}
			})), ace.define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/bidihandler", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/lang"),
					o = e("./bidihandler").BidiHandler,
					s = e("./config"),
					a = e("./lib/event_emitter").EventEmitter,
					c = e("./selection").Selection,
					l = e("./mode/text").Mode,
					u = e("./range").Range,
					h = e("./document").Document,
					d = e("./background_tokenizer").BackgroundTokenizer,
					p = e("./search_highlight").SearchHighlight,
					m = function (e, t) {
						this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.id = "session" + ++m.$uid, this.$foldData.toString = function () {
							return this.join("\n")
						}, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof e && e.getLine || (e = new h(e)), this.setDocument(e), this.selection = new c(this), this.$bidiHandler = new o(this), s.resetOptions(this), this.setMode(t), s._signal("session", this)
					};
				m.$uid = 0,
					function () {
						i.implement(this, a), this.setDocument = function (e) {
							this.doc && this.doc.removeListener("change", this.$onChange), this.doc = e, e.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
						}, this.getDocument = function () {
							return this.doc
						}, this.$resetRowCache = function (e) {
							if (!e) return this.$docRowCache = [], void(this.$screenRowCache = []);
							var t = this.$docRowCache.length,
								n = this.$getRowCacheIndex(this.$docRowCache, e) + 1;
							t > n && (this.$docRowCache.splice(n, t), this.$screenRowCache.splice(n, t))
						}, this.$getRowCacheIndex = function (e, t) {
							for (var n = 0, i = e.length - 1; n <= i;) {
								var r = n + i >> 1,
									o = e[r];
								if (t > o) n = r + 1;
								else {
									if (!(t < o)) return r;
									i = r - 1
								}
							}
							return n - 1
						}, this.resetCaches = function () {
							this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
						}, this.onChangeFold = function (e) {
							var t = e.data;
							this.$resetRowCache(t.start.row)
						}, this.onChange = function (e) {
							this.$modified = !0, this.$bidiHandler.onChange(e), this.$resetRowCache(e.start.row);
							var t = this.$updateInternalDataOnChange(e);
							!this.$fromUndo && this.$undoManager && (t && t.length && (this.$undoManager.add({
								action: "removeFolds",
								folds: t
							}, this.mergeUndoDeltas), this.mergeUndoDeltas = !0), this.$undoManager.add(e, this.mergeUndoDeltas), this.mergeUndoDeltas = !0, this.$informUndoManager.schedule()), this.bgTokenizer && this.bgTokenizer.$updateOnChange(e), this._signal("change", e)
						}, this.setValue = function (e) {
							this.doc.setValue(e), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.setUndoManager(this.$undoManager), this.getUndoManager().reset()
						}, this.getValue = this.toString = function () {
							return this.doc.getValue()
						}, this.getSelection = function () {
							return this.selection
						}, this.getState = function (e) {
							return this.bgTokenizer.getState(e)
						}, this.getTokens = function (e) {
							return this.bgTokenizer.getTokens(e)
						}, this.getTokenAt = function (e, t) {
							var n, i = this.bgTokenizer.getTokens(e),
								r = 0;
							if (null == t) {
								var o = i.length - 1;
								r = this.getLine(e).length
							} else
								for (o = 0; o < i.length && !((r += i[o].value.length) >= t); o++);
							return (n = i[o]) ? (n.index = o, n.start = r - n.value.length, n) : null
						}, this.setUndoManager = function (e) {
							if (this.$undoManager = e, this.$informUndoManager && this.$informUndoManager.cancel(), e) {
								var t = this;
								e.addSession(this), this.$syncInformUndoManager = function () {
									t.$informUndoManager.cancel(), t.mergeUndoDeltas = !1
								}, this.$informUndoManager = r.delayedCall(this.$syncInformUndoManager)
							} else this.$syncInformUndoManager = function () {}
						}, this.markUndoGroup = function () {
							this.$syncInformUndoManager && this.$syncInformUndoManager()
						}, this.$defaultUndoManager = {
							undo: function () {},
							redo: function () {},
							hasUndo: function () {},
							hasRedo: function () {},
							reset: function () {},
							add: function () {},
							addSelection: function () {},
							startNewGroup: function () {},
							addSession: function () {}
						}, this.getUndoManager = function () {
							return this.$undoManager || this.$defaultUndoManager
						}, this.getTabString = function () {
							return this.getUseSoftTabs() ? r.stringRepeat(" ", this.getTabSize()) : "\t"
						}, this.setUseSoftTabs = function (e) {
							this.setOption("useSoftTabs", e)
						}, this.getUseSoftTabs = function () {
							return this.$useSoftTabs && !this.$mode.$indentWithTabs
						}, this.setTabSize = function (e) {
							this.setOption("tabSize", e)
						}, this.getTabSize = function () {
							return this.$tabSize
						}, this.isTabStop = function (e) {
							return this.$useSoftTabs && e.column % this.$tabSize == 0
						}, this.setNavigateWithinSoftTabs = function (e) {
							this.setOption("navigateWithinSoftTabs", e)
						}, this.getNavigateWithinSoftTabs = function () {
							return this.$navigateWithinSoftTabs
						}, this.$overwrite = !1, this.setOverwrite = function (e) {
							this.setOption("overwrite", e)
						}, this.getOverwrite = function () {
							return this.$overwrite
						}, this.toggleOverwrite = function () {
							this.setOverwrite(!this.$overwrite)
						}, this.addGutterDecoration = function (e, t) {
							this.$decorations[e] || (this.$decorations[e] = ""), this.$decorations[e] += " " + t, this._signal("changeBreakpoint", {})
						}, this.removeGutterDecoration = function (e, t) {
							this.$decorations[e] = (this.$decorations[e] || "").replace(" " + t, ""), this._signal("changeBreakpoint", {})
						}, this.getBreakpoints = function () {
							return this.$breakpoints
						}, this.setBreakpoints = function (e) {
							this.$breakpoints = [];
							for (var t = 0; t < e.length; t++) this.$breakpoints[e[t]] = "ace_breakpoint";
							this._signal("changeBreakpoint", {})
						}, this.clearBreakpoints = function () {
							this.$breakpoints = [], this._signal("changeBreakpoint", {})
						}, this.setBreakpoint = function (e, t) {
							void 0 === t && (t = "ace_breakpoint"), t ? this.$breakpoints[e] = t : delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
						}, this.clearBreakpoint = function (e) {
							delete this.$breakpoints[e], this._signal("changeBreakpoint", {})
						}, this.addMarker = function (e, t, n, i) {
							var r = this.$markerId++,
								o = {
									range: e,
									type: n || "line",
									renderer: "function" == typeof n ? n : null,
									clazz: t,
									inFront: !!i,
									id: r
								};
							return i ? (this.$frontMarkers[r] = o, this._signal("changeFrontMarker")) : (this.$backMarkers[r] = o, this._signal("changeBackMarker")), r
						}, this.addDynamicMarker = function (e, t) {
							if (e.update) {
								var n = this.$markerId++;
								return e.id = n, e.inFront = !!t, t ? (this.$frontMarkers[n] = e, this._signal("changeFrontMarker")) : (this.$backMarkers[n] = e, this._signal("changeBackMarker")), e
							}
						}, this.removeMarker = function (e) {
							var t = this.$frontMarkers[e] || this.$backMarkers[e];
							t && (delete(t.inFront ? this.$frontMarkers : this.$backMarkers)[e], this._signal(t.inFront ? "changeFrontMarker" : "changeBackMarker"))
						}, this.getMarkers = function (e) {
							return e ? this.$frontMarkers : this.$backMarkers
						}, this.highlight = function (e) {
							if (!this.$searchHighlight) {
								var t = new p(null, "ace_selected-word", "text");
								this.$searchHighlight = this.addDynamicMarker(t)
							}
							this.$searchHighlight.setRegexp(e)
						}, this.highlightLines = function (e, t, n, i) {
							"number" != typeof t && (n = t, t = e), n || (n = "ace_step");
							var r = new u(e, 0, t, 1 / 0);
							return r.id = this.addMarker(r, n, "fullLine", i), r
						}, this.setAnnotations = function (e) {
							this.$annotations = e, this._signal("changeAnnotation", {})
						}, this.getAnnotations = function () {
							return this.$annotations || []
						}, this.clearAnnotations = function () {
							this.setAnnotations([])
						}, this.$detectNewLine = function (e) {
							var t = e.match(/^.*?(\r?\n)/m);
							this.$autoNewLine = t ? t[1] : "\n"
						}, this.getWordRange = function (e, t) {
							var n = this.getLine(e),
								i = !1;
							if (t > 0 && (i = !!n.charAt(t - 1).match(this.tokenRe)), i || (i = !!n.charAt(t).match(this.tokenRe)), i) var r = this.tokenRe;
							else if (/^\s+$/.test(n.slice(t - 1, t + 1))) r = /\s/;
							else r = this.nonTokenRe;
							var o = t;
							if (o > 0) {
								do {
									o--
								} while (o >= 0 && n.charAt(o).match(r));
								o++
							}
							for (var s = t; s < n.length && n.charAt(s).match(r);) s++;
							return new u(e, o, e, s)
						}, this.getAWordRange = function (e, t) {
							for (var n = this.getWordRange(e, t), i = this.getLine(n.end.row); i.charAt(n.end.column).match(/[ \t]/);) n.end.column += 1;
							return n
						}, this.setNewLineMode = function (e) {
							this.doc.setNewLineMode(e)
						}, this.getNewLineMode = function () {
							return this.doc.getNewLineMode()
						}, this.setUseWorker = function (e) {
							this.setOption("useWorker", e)
						}, this.getUseWorker = function () {
							return this.$useWorker
						}, this.onReloadTokenizer = function (e) {
							var t = e.data;
							this.bgTokenizer.start(t.first), this._signal("tokenizerUpdate", e)
						}, this.$modes = s.$modes, this.$mode = null, this.$modeId = null, this.setMode = function (e, t) {
							if (e && "object" == typeof e) {
								if (e.getTokenizer) return this.$onChangeMode(e);
								var n = e,
									i = n.path
							} else i = e || "ace/mode/text";
							if (this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new l), this.$modes[i] && !n) return this.$onChangeMode(this.$modes[i]), void(t && t());
							this.$modeId = i, s.loadModule(["mode", i], function (e) {
								if (this.$modeId !== i) return t && t();
								this.$modes[i] && !n ? this.$onChangeMode(this.$modes[i]) : e && e.Mode && (e = new e.Mode(n), n || (this.$modes[i] = e, e.$id = i), this.$onChangeMode(e)), t && t()
							}.bind(this)), this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)
						}, this.$onChangeMode = function (e, t) {
							if (t || (this.$modeId = e.$id), this.$mode !== e) {
								this.$mode = e, this.$stopWorker(), this.$useWorker && this.$startWorker();
								var n = e.getTokenizer();
								if (void 0 !== n.addEventListener) {
									var i = this.onReloadTokenizer.bind(this);
									n.addEventListener("update", i)
								}
								if (this.bgTokenizer) this.bgTokenizer.setTokenizer(n);
								else {
									this.bgTokenizer = new d(n);
									var r = this;
									this.bgTokenizer.addEventListener("update", (function (e) {
										r._signal("tokenizerUpdate", e)
									}))
								}
								this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = e.tokenRe, this.nonTokenRe = e.nonTokenRe, t || (e.attachToSession && e.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(e.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode"))
							}
						}, this.$stopWorker = function () {
							this.$worker && (this.$worker.terminate(), this.$worker = null)
						}, this.$startWorker = function () {
							try {
								this.$worker = this.$mode.createWorker(this)
							} catch (e) {
								s.warn("Could not load worker", e), this.$worker = null
							}
						}, this.getMode = function () {
							return this.$mode
						}, this.$scrollTop = 0, this.setScrollTop = function (e) {
							this.$scrollTop === e || isNaN(e) || (this.$scrollTop = e, this._signal("changeScrollTop", e))
						}, this.getScrollTop = function () {
							return this.$scrollTop
						}, this.$scrollLeft = 0, this.setScrollLeft = function (e) {
							this.$scrollLeft === e || isNaN(e) || (this.$scrollLeft = e, this._signal("changeScrollLeft", e))
						}, this.getScrollLeft = function () {
							return this.$scrollLeft
						}, this.getScreenWidth = function () {
							return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth
						}, this.getLineWidgetMaxWidth = function () {
							if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth;
							var e = 0;
							return this.lineWidgets.forEach((function (t) {
								t && t.screenWidth > e && (e = t.screenWidth)
							})), this.lineWidgetWidth = e
						}, this.$computeWidth = function (e) {
							if (this.$modified || e) {
								if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
								for (var t = this.doc.getAllLines(), n = this.$rowLengthCache, i = 0, r = 0, o = this.$foldData[r], s = o ? o.start.row : 1 / 0, a = t.length, c = 0; c < a; c++) {
									if (c > s) {
										if ((c = o.end.row + 1) >= a) break;
										s = (o = this.$foldData[r++]) ? o.start.row : 1 / 0
									}
									null == n[c] && (n[c] = this.$getStringScreenWidth(t[c])[0]), n[c] > i && (i = n[c])
								}
								this.screenWidth = i
							}
						}, this.getLine = function (e) {
							return this.doc.getLine(e)
						}, this.getLines = function (e, t) {
							return this.doc.getLines(e, t)
						}, this.getLength = function () {
							return this.doc.getLength()
						}, this.getTextRange = function (e) {
							return this.doc.getTextRange(e || this.selection.getRange())
						}, this.insert = function (e, t) {
							return this.doc.insert(e, t)
						}, this.remove = function (e) {
							return this.doc.remove(e)
						}, this.removeFullLines = function (e, t) {
							return this.doc.removeFullLines(e, t)
						}, this.undoChanges = function (e, t) {
							if (e.length) {
								this.$fromUndo = !0;
								for (var n = e.length - 1; - 1 != n; n--) {
									var i = e[n];
									"insert" == i.action || "remove" == i.action ? this.doc.revertDelta(i) : i.folds && this.addFolds(i.folds)
								}!t && this.$undoSelect && (e.selectionBefore ? this.selection.fromJSON(e.selectionBefore) : this.selection.setRange(this.$getUndoSelection(e, !0))), this.$fromUndo = !1
							}
						}, this.redoChanges = function (e, t) {
							if (e.length) {
								this.$fromUndo = !0;
								for (var n = 0; n < e.length; n++) {
									var i = e[n];
									"insert" != i.action && "remove" != i.action || this.doc.applyDelta(i)
								}!t && this.$undoSelect && (e.selectionAfter ? this.selection.fromJSON(e.selectionAfter) : this.selection.setRange(this.$getUndoSelection(e, !1))), this.$fromUndo = !1
							}
						}, this.setUndoSelect = function (e) {
							this.$undoSelect = e
						}, this.$getUndoSelection = function (e, t) {
							function n(e) {
								return t ? "insert" !== e.action : "insert" === e.action
							}
							for (var i, r, o = 0; o < e.length; o++) {
								var s = e[o];
								s.start && (i ? n(s) ? (r = s.start, -1 == i.compare(r.row, r.column) && i.setStart(r), r = s.end, 1 == i.compare(r.row, r.column) && i.setEnd(r), !0) : (r = s.start, -1 == i.compare(r.row, r.column) && (i = u.fromPoints(s.start, s.start)), !1) : n(s) ? (i = u.fromPoints(s.start, s.end), !0) : (i = u.fromPoints(s.start, s.start), !1))
							}
							return i
						}, this.replace = function (e, t) {
							return this.doc.replace(e, t)
						}, this.moveText = function (e, t, n) {
							var i = this.getTextRange(e),
								r = this.getFoldsInRange(e),
								o = u.fromPoints(t, t);
							if (!n) {
								this.remove(e);
								var s = e.start.row - e.end.row;
								(l = s ? -e.end.column : e.start.column - e.end.column) && (o.start.row == e.end.row && o.start.column > e.end.column && (o.start.column += l), o.end.row == e.end.row && o.end.column > e.end.column && (o.end.column += l)), s && o.start.row >= e.end.row && (o.start.row += s, o.end.row += s)
							}
							if (o.end = this.insert(o.start, i), r.length) {
								var a = e.start,
									c = o.start,
									l = (s = c.row - a.row, c.column - a.column);
								this.addFolds(r.map((function (e) {
									return (e = e.clone()).start.row == a.row && (e.start.column += l), e.end.row == a.row && (e.end.column += l), e.start.row += s, e.end.row += s, e
								})))
							}
							return o
						}, this.indentRows = function (e, t, n) {
							n = n.replace(/\t/g, this.getTabString());
							for (var i = e; i <= t; i++) this.doc.insertInLine({
								row: i,
								column: 0
							}, n)
						}, this.outdentRows = function (e) {
							for (var t = e.collapseRows(), n = new u(0, 0, 0, 0), i = this.getTabSize(), r = t.start.row; r <= t.end.row; ++r) {
								var o = this.getLine(r);
								n.start.row = r, n.end.row = r;
								for (var s = 0; s < i && " " == o.charAt(s); ++s);
								s < i && "\t" == o.charAt(s) ? (n.start.column = s, n.end.column = s + 1) : (n.start.column = 0, n.end.column = s), this.remove(n)
							}
						}, this.$moveLines = function (e, t, n) {
							if (e = this.getRowFoldStart(e), t = this.getRowFoldEnd(t), n < 0) {
								if ((r = this.getRowFoldStart(e + n)) < 0) return 0;
								var i = r - e
							} else if (n > 0) {
								var r;
								if ((r = this.getRowFoldEnd(t + n)) > this.doc.getLength() - 1) return 0;
								i = r - t
							} else {
								e = this.$clipRowToDocument(e);
								i = (t = this.$clipRowToDocument(t)) - e + 1
							}
							var o = new u(e, 0, t, Number.MAX_VALUE),
								s = this.getFoldsInRange(o).map((function (e) {
									return (e = e.clone()).start.row += i, e.end.row += i, e
								})),
								a = 0 == n ? this.doc.getLines(e, t) : this.doc.removeFullLines(e, t);
							return this.doc.insertFullLines(e + i, a), s.length && this.addFolds(s), i
						}, this.moveLinesUp = function (e, t) {
							return this.$moveLines(e, t, -1)
						}, this.moveLinesDown = function (e, t) {
							return this.$moveLines(e, t, 1)
						}, this.duplicateLines = function (e, t) {
							return this.$moveLines(e, t, 0)
						}, this.$clipRowToDocument = function (e) {
							return Math.max(0, Math.min(e, this.doc.getLength() - 1))
						}, this.$clipColumnToRow = function (e, t) {
							return t < 0 ? 0 : Math.min(this.doc.getLine(e).length, t)
						}, this.$clipPositionToDocument = function (e, t) {
							if (t = Math.max(0, t), e < 0) e = 0, t = 0;
							else {
								var n = this.doc.getLength();
								e >= n ? (e = n - 1, t = this.doc.getLine(n - 1).length) : t = Math.min(this.doc.getLine(e).length, t)
							}
							return {
								row: e,
								column: t
							}
						}, this.$clipRangeToDocument = function (e) {
							e.start.row < 0 ? (e.start.row = 0, e.start.column = 0) : e.start.column = this.$clipColumnToRow(e.start.row, e.start.column);
							var t = this.doc.getLength() - 1;
							return e.end.row > t ? (e.end.row = t, e.end.column = this.doc.getLine(t).length) : e.end.column = this.$clipColumnToRow(e.end.row, e.end.column), e
						}, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
							min: null,
							max: null
						}, this.setUseWrapMode = function (e) {
							if (e != this.$useWrapMode) {
								if (this.$useWrapMode = e, this.$modified = !0, this.$resetRowCache(0), e) {
									var t = this.getLength();
									this.$wrapData = Array(t), this.$updateWrapData(0, t - 1)
								}
								this._signal("changeWrapMode")
							}
						}, this.getUseWrapMode = function () {
							return this.$useWrapMode
						}, this.setWrapLimitRange = function (e, t) {
							this.$wrapLimitRange.min === e && this.$wrapLimitRange.max === t || (this.$wrapLimitRange = {
								min: e,
								max: t
							}, this.$modified = !0, this.$bidiHandler.markAsDirty(), this.$useWrapMode && this._signal("changeWrapMode"))
						}, this.adjustWrapLimit = function (e, t) {
							var n = this.$wrapLimitRange;
							n.max < 0 && (n = {
								min: t,
								max: t
							});
							var i = this.$constrainWrapLimit(e, n.min, n.max);
							return i != this.$wrapLimit && i > 1 && (this.$wrapLimit = i, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0)
						}, this.$constrainWrapLimit = function (e, t, n) {
							return t && (e = Math.max(t, e)), n && (e = Math.min(n, e)), e
						}, this.getWrapLimit = function () {
							return this.$wrapLimit
						}, this.setWrapLimit = function (e) {
							this.setWrapLimitRange(e, e)
						}, this.getWrapLimitRange = function () {
							return {
								min: this.$wrapLimitRange.min,
								max: this.$wrapLimitRange.max
							}
						}, this.$updateInternalDataOnChange = function (e) {
							var t = this.$useWrapMode,
								n = e.action,
								i = e.start,
								r = e.end,
								o = i.row,
								s = r.row,
								a = s - o,
								c = null;
							if (this.$updating = !0, 0 != a)
								if ("remove" === n) {
									this[t ? "$wrapData" : "$rowLengthCache"].splice(o, a);
									var l = this.$foldData;
									c = this.getFoldsInRange(e), this.removeFolds(c);
									var u = 0;
									if (f = this.getFoldLine(r.row)) {
										f.addRemoveChars(r.row, r.column, i.column - r.column), f.shiftRow(-a);
										var h = this.getFoldLine(o);
										h && h !== f && (h.merge(f), f = h), u = l.indexOf(f) + 1
									}
									for (; u < l.length; u++) {
										(f = l[u]).start.row >= r.row && f.shiftRow(-a)
									}
									s = o
								} else {
									var d = Array(a);
									d.unshift(o, 0);
									var p = t ? this.$wrapData : this.$rowLengthCache;
									p.splice.apply(p, d);
									l = this.$foldData, u = 0;
									if (f = this.getFoldLine(o)) {
										var m = f.range.compareInside(i.row, i.column);
										0 == m ? (f = f.split(i.row, i.column)) && (f.shiftRow(a), f.addRemoveChars(s, 0, r.column - i.column)) : -1 == m && (f.addRemoveChars(o, 0, r.column - i.column), f.shiftRow(a)), u = l.indexOf(f) + 1
									}
									for (; u < l.length; u++) {
										var f;
										(f = l[u]).start.row >= o && f.shiftRow(a)
									}
								}
							else a = Math.abs(e.start.column - e.end.column), "remove" === n && (c = this.getFoldsInRange(e), this.removeFolds(c), a = -a), (f = this.getFoldLine(o)) && f.addRemoveChars(o, i.column, a);
							return t && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, t ? this.$updateWrapData(o, s) : this.$updateRowLengthCache(o, s), c
						}, this.$updateRowLengthCache = function (e, t, n) {
							this.$rowLengthCache[e] = null, this.$rowLengthCache[t] = null
						}, this.$updateWrapData = function (n, i) {
							var r, o, s = this.doc.getAllLines(),
								a = this.getTabSize(),
								c = this.$wrapData,
								l = this.$wrapLimit,
								u = n;
							for (i = Math.min(i, s.length - 1); u <= i;)(o = this.getFoldLine(u, o)) ? (r = [], o.walk(function (n, i, o, a) {
								var c;
								if (null != n) {
									(c = this.$getDisplayTokens(n, r.length))[0] = e;
									for (var l = 1; l < c.length; l++) c[l] = t
								} else c = this.$getDisplayTokens(s[i].substring(a, o), r.length);
								r = r.concat(c)
							}.bind(this), o.end.row, s[o.end.row].length + 1), c[o.start.row] = this.$computeWrapSplits(r, l, a), u = o.end.row + 1) : (r = this.$getDisplayTokens(s[u]), c[u] = this.$computeWrapSplits(r, l, a), u++)
						};
						var e = 3,
							t = 4,
							n = 10,
							o = 11,
							c = 12;

						function h(e) {
							return !(e < 4352) && (e >= 4352 && e <= 4447 || e >= 4515 && e <= 4519 || e >= 4602 && e <= 4607 || e >= 9001 && e <= 9002 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12283 || e >= 12288 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12589 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12730 || e >= 12736 && e <= 12771 || e >= 12784 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 13054 || e >= 13056 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 55216 && e <= 55238 || e >= 55243 && e <= 55291 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510)
						}
						this.$computeWrapSplits = function (i, r, s) {
							if (0 == i.length) return [];
							var a = [],
								l = i.length,
								u = 0,
								h = 0,
								d = this.$wrapAsCode,
								p = this.$indentedSoftWrap,
								m = r <= Math.max(2 * s, 8) || !1 === p ? 0 : Math.floor(r / 2);

							function f(e) {
								for (var t = e - u, r = u; r < e; r++) {
									var l = i[r];
									12 !== l && 2 !== l || (t -= 1)
								}
								a.length || (g = function () {
									var e = 0;
									if (0 === m) return e;
									if (p)
										for (var t = 0; t < i.length; t++) {
											var r = i[t];
											if (r == n) e += 1;
											else {
												if (r != o) {
													if (r == c) continue;
													break
												}
												e += s
											}
										}
									return d && !1 !== p && (e += s), Math.min(e, m)
								}(), a.indent = g), h += t, a.push(h), u = e
							}
							for (var g = 0; l - u > r - g;) {
								var v = u + r - g;
								if (i[v - 1] >= n && i[v] >= n) f(v);
								else if (i[v] != e && i[v] != t) {
									for (var _ = Math.max(v - (r - (r >> 2)), u - 1); v > _ && i[v] < e;) v--;
									if (d) {
										for (; v > _ && i[v] < e;) v--;
										for (; v > _ && 9 == i[v];) v--
									} else
										for (; v > _ && i[v] < n;) v--;
									v > _ ? f(++v) : (2 == i[v = u + r] && v--, f(v - g))
								} else {
									for (; v != u - 1 && i[v] != e; v--);
									if (v > u) {
										f(v);
										continue
									}
									for (v = u + r; v < i.length && i[v] == t; v++);
									if (v == i.length) break;
									f(v)
								}
							}
							return a
						}, this.$getDisplayTokens = function (e, t) {
							var i, r = [];
							t = t || 0;
							for (var s = 0; s < e.length; s++) {
								var a = e.charCodeAt(s);
								if (9 == a) {
									i = this.getScreenTabSize(r.length + t), r.push(o);
									for (var l = 1; l < i; l++) r.push(c)
								} else 32 == a ? r.push(n) : a > 39 && a < 48 || a > 57 && a < 64 ? r.push(9) : a >= 4352 && h(a) ? r.push(1, 2) : r.push(1)
							}
							return r
						}, this.$getStringScreenWidth = function (e, t, n) {
							if (0 == t) return [0, 0];
							var i, r;
							for (null == t && (t = 1 / 0), n = n || 0, r = 0; r < e.length && (9 == (i = e.charCodeAt(r)) ? n += this.getScreenTabSize(n) : i >= 4352 && h(i) ? n += 2 : n += 1, !(n > t)); r++);
							return [n, r]
						}, this.lineWidgets = null, this.getRowLength = function (e) {
							if (this.lineWidgets) var t = this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0;
							else t = 0;
							return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
						}, this.getRowLineCount = function (e) {
							return this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 : 1
						}, this.getRowWrapIndent = function (e) {
							if (this.$useWrapMode) {
								var t = this.screenToDocumentPosition(e, Number.MAX_VALUE),
									n = this.$wrapData[t.row];
								return n.length && n[0] < t.column ? n.indent : 0
							}
							return 0
						}, this.getScreenLastRowColumn = function (e) {
							var t = this.screenToDocumentPosition(e, Number.MAX_VALUE);
							return this.documentToScreenColumn(t.row, t.column)
						}, this.getDocumentLastRowColumn = function (e, t) {
							var n = this.documentToScreenRow(e, t);
							return this.getScreenLastRowColumn(n)
						}, this.getDocumentLastRowColumnPosition = function (e, t) {
							var n = this.documentToScreenRow(e, t);
							return this.screenToDocumentPosition(n, Number.MAX_VALUE / 10)
						}, this.getRowSplitData = function (e) {
							return this.$useWrapMode ? this.$wrapData[e] : void 0
						}, this.getScreenTabSize = function (e) {
							return this.$tabSize - (e % this.$tabSize | 0)
						}, this.screenToDocumentRow = function (e, t) {
							return this.screenToDocumentPosition(e, t).row
						}, this.screenToDocumentColumn = function (e, t) {
							return this.screenToDocumentPosition(e, t).column
						}, this.screenToDocumentPosition = function (e, t, n) {
							if (e < 0) return {
								row: 0,
								column: 0
							};
							var i, r, o = 0,
								s = 0,
								a = 0,
								c = 0,
								l = this.$screenRowCache,
								u = this.$getRowCacheIndex(l, e),
								h = l.length;
							if (h && u >= 0) {
								a = l[u], o = this.$docRowCache[u];
								var d = e > l[h - 1]
							} else d = !h;
							for (var p = this.getLength() - 1, m = this.getNextFoldLine(o), f = m ? m.start.row : 1 / 0; a <= e && !(a + (c = this.getRowLength(o)) > e || o >= p);) a += c, ++o > f && (o = m.end.row + 1, f = (m = this.getNextFoldLine(o, m)) ? m.start.row : 1 / 0), d && (this.$docRowCache.push(o), this.$screenRowCache.push(a));
							if (m && m.start.row <= o) i = this.getFoldDisplayLine(m), o = m.start.row;
							else {
								if (a + c <= e || o > p) return {
									row: p,
									column: this.getLine(p).length
								};
								i = this.getLine(o), m = null
							}
							var g = 0,
								v = Math.floor(e - a);
							if (this.$useWrapMode) {
								var _ = this.$wrapData[o];
								_ && (r = _[v], v > 0 && _.length && (g = _.indent, s = _[v - 1] || _[_.length - 1], i = i.substring(s)))
							}
							return void 0 !== n && this.$bidiHandler.isBidiRow(a + v, o, v) && (t = this.$bidiHandler.offsetToCol(n)), s += this.$getStringScreenWidth(i, t - g)[1], this.$useWrapMode && s >= r && (s = r - 1), m ? m.idxToPosition(s) : {
								row: o,
								column: s
							}
						}, this.documentToScreenPosition = function (e, t) {
							if (void 0 === t) var n = this.$clipPositionToDocument(e.row, e.column);
							else n = this.$clipPositionToDocument(e, t);
							e = n.row, t = n.column;
							var i, r = 0,
								o = null;
							(i = this.getFoldAt(e, t, 1)) && (e = i.start.row, t = i.start.column);
							var s, a = 0,
								c = this.$docRowCache,
								l = this.$getRowCacheIndex(c, e),
								u = c.length;
							if (u && l >= 0) {
								a = c[l], r = this.$screenRowCache[l];
								var h = e > c[u - 1]
							} else h = !u;
							for (var d = this.getNextFoldLine(a), p = d ? d.start.row : 1 / 0; a < e;) {
								if (a >= p) {
									if ((s = d.end.row + 1) > e) break;
									p = (d = this.getNextFoldLine(s, d)) ? d.start.row : 1 / 0
								} else s = a + 1;
								r += this.getRowLength(a), a = s, h && (this.$docRowCache.push(a), this.$screenRowCache.push(r))
							}
							var m = "";
							d && a >= p ? (m = this.getFoldDisplayLine(d, e, t), o = d.start.row) : (m = this.getLine(e).substring(0, t), o = e);
							var f = 0;
							if (this.$useWrapMode) {
								var g = this.$wrapData[o];
								if (g) {
									for (var v = 0; m.length >= g[v];) r++, v++;
									m = m.substring(g[v - 1] || 0, m.length), f = v > 0 ? g.indent : 0
								}
							}
							return {
								row: r,
								column: f + this.$getStringScreenWidth(m)[0]
							}
						}, this.documentToScreenColumn = function (e, t) {
							return this.documentToScreenPosition(e, t).column
						}, this.documentToScreenRow = function (e, t) {
							return this.documentToScreenPosition(e, t).row
						}, this.getScreenLength = function () {
							var e = 0,
								t = null;
							if (this.$useWrapMode)
								for (var n = this.$wrapData.length, i = 0, r = (a = 0, (t = this.$foldData[a++]) ? t.start.row : 1 / 0); i < n;) {
									var o = this.$wrapData[i];
									e += o ? o.length + 1 : 1, ++i > r && (i = t.end.row + 1, r = (t = this.$foldData[a++]) ? t.start.row : 1 / 0)
								} else {
									e = this.getLength();
									for (var s = this.$foldData, a = 0; a < s.length; a++) e -= (t = s[a]).end.row - t.start.row
								}
							return this.lineWidgets && (e += this.$getWidgetScreenLength()), e
						}, this.$setFontMetrics = function (e) {
							this.$enableVarChar && (this.$getStringScreenWidth = function (t, n, i) {
								if (0 === n) return [0, 0];
								var r, o;
								for (n || (n = 1 / 0), i = i || 0, o = 0; o < t.length && !((i += "\t" === (r = t.charAt(o)) ? this.getScreenTabSize(i) : e.getCharacterWidth(r)) > n); o++);
								return [i, o]
							})
						}, this.destroy = function () {
							this.bgTokenizer && (this.bgTokenizer.setDocument(null), this.bgTokenizer = null), this.$stopWorker()
						}, this.isFullWidth = h
					}.call(m.prototype), e("./edit_session/folding").Folding.call(m.prototype), e("./edit_session/bracket_match").BracketMatch.call(m.prototype), s.defineOptions(m.prototype, "session", {
						wrap: {
							set: function (e) {
								if (e && "off" != e ? "free" == e ? e = !0 : "printMargin" == e ? e = -1 : "string" == typeof e && (e = parseInt(e, 10) || !1) : e = !1, this.$wrap != e)
									if (this.$wrap = e, e) {
										var t = "number" == typeof e ? e : null;
										this.setWrapLimitRange(t, t), this.setUseWrapMode(!0)
									} else this.setUseWrapMode(!1)
							},
							get: function () {
								return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off"
							},
							handlesSet: !0
						},
						wrapMethod: {
							set: function (e) {
								(e = "auto" == e ? "text" != this.$mode.type : "text" != e) != this.$wrapAsCode && (this.$wrapAsCode = e, this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0)))
							},
							initialValue: "auto"
						},
						indentedSoftWrap: {
							set: function () {
								this.$useWrapMode && (this.$useWrapMode = !1, this.setUseWrapMode(!0))
							},
							initialValue: !0
						},
						firstLineNumber: {
							set: function () {
								this._signal("changeBreakpoint")
							},
							initialValue: 1
						},
						useWorker: {
							set: function (e) {
								this.$useWorker = e, this.$stopWorker(), e && this.$startWorker()
							},
							initialValue: !0
						},
						useSoftTabs: {
							initialValue: !0
						},
						tabSize: {
							set: function (e) {
								(e = parseInt(e)) > 0 && this.$tabSize !== e && (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = e, this._signal("changeTabSize"))
							},
							initialValue: 4,
							handlesSet: !0
						},
						navigateWithinSoftTabs: {
							initialValue: !1
						},
						foldStyle: {
							set: function (e) {
								this.setFoldStyle(e)
							},
							handlesSet: !0
						},
						overwrite: {
							set: function (e) {
								this._signal("changeOverwrite")
							},
							initialValue: !1
						},
						newLineMode: {
							set: function (e) {
								this.doc.setNewLineMode(e)
							},
							get: function () {
								return this.doc.getNewLineMode()
							},
							handlesSet: !0
						},
						mode: {
							set: function (e) {
								this.setMode(e)
							},
							get: function () {
								return this.$modeId
							},
							handlesSet: !0
						}
					}), t.EditSession = m
			})), ace.define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/lang"),
					r = e("./lib/oop"),
					o = e("./range").Range,
					s = function () {
						this.$options = {}
					};
				(function () {
					this.set = function (e) {
						return r.mixin(this.$options, e), this
					}, this.getOptions = function () {
						return i.copyObject(this.$options)
					}, this.setOptions = function (e) {
						this.$options = e
					}, this.find = function (e) {
						var t = this.$options,
							n = this.$matchIterator(e, t);
						if (!n) return !1;
						var i = null;
						return n.forEach((function (e, n, r, s) {
							return i = new o(e, n, r, s), !(n == s && t.start && t.start.start && 0 != t.skipCurrent && i.isEqual(t.start)) || (i = null, !1)
						})), i
					}, this.findAll = function (e) {
						var t = this.$options;
						if (!t.needle) return [];
						this.$assembleRegExp(t);
						var n = t.range,
							r = n ? e.getLines(n.start.row, n.end.row) : e.doc.getAllLines(),
							s = [],
							a = t.re;
						if (t.$isMultiLine) {
							var c, l = a.length,
								u = r.length - l;
							e: for (var h = a.offset || 0; h <= u; h++) {
								for (var d = 0; d < l; d++)
									if (-1 == r[h + d].search(a[d])) continue e;
								var p = r[h],
									m = r[h + l - 1],
									f = p.length - p.match(a[0])[0].length,
									g = m.match(a[l - 1])[0].length;
								c && c.end.row === h && c.end.column > f || (s.push(c = new o(h, f, h + l - 1, g)), l > 2 && (h = h + l - 2))
							}
						} else
							for (var v = 0; v < r.length; v++) {
								var _ = i.getMatchOffsets(r[v], a);
								for (d = 0; d < _.length; d++) {
									var E = _[d];
									s.push(new o(v, E.offset, v, E.offset + E.length))
								}
							}
						if (n) {
							var C = n.start.column,
								A = n.start.column;
							for (v = 0, d = s.length - 1; v < d && s[v].start.column < C && s[v].start.row == n.start.row;) v++;
							for (; v < d && s[d].end.column > A && s[d].end.row == n.end.row;) d--;
							for (s = s.slice(v, d + 1), v = 0, d = s.length; v < d; v++) s[v].start.row += n.start.row, s[v].end.row += n.start.row
						}
						return s
					}, this.replace = function (e, t) {
						var n = this.$options,
							i = this.$assembleRegExp(n);
						if (n.$isMultiLine) return t;
						if (i) {
							var r = i.exec(e);
							if (!r || r[0].length != e.length) return null;
							if (t = e.replace(i, t), n.preserveCase) {
								t = t.split("");
								for (var o = Math.min(e.length, e.length); o--;) {
									var s = e[o];
									s && s.toLowerCase() != s ? t[o] = t[o].toUpperCase() : t[o] = t[o].toLowerCase()
								}
								t = t.join("")
							}
							return t
						}
					}, this.$assembleRegExp = function (e, t) {
						if (e.needle instanceof RegExp) return e.re = e.needle;
						var n = e.needle;
						if (!e.needle) return e.re = !1;
						e.regExp || (n = i.escapeRegExp(n)), e.wholeWord && (n = function (e, t) {
							function n(e) {
								return /\w/.test(e) || t.regExp ? "\\b" : ""
							}
							return n(e[0]) + e + n(e[e.length - 1])
						}(n, e));
						var r = e.caseSensitive ? "gm" : "gmi";
						if (e.$isMultiLine = !t && /[\n\r]/.test(n), e.$isMultiLine) return e.re = this.$assembleMultilineRegExp(n, r);
						try {
							var o = new RegExp(n, r)
						} catch (e) {
							o = !1
						}
						return e.re = o
					}, this.$assembleMultilineRegExp = function (e, t) {
						for (var n = e.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), i = [], r = 0; r < n.length; r++) try {
							i.push(new RegExp(n[r], t))
						} catch (e) {
							return !1
						}
						return i
					}, this.$matchIterator = function (e, t) {
						var n = this.$assembleRegExp(t);
						if (!n) return !1;
						var i = 1 == t.backwards,
							r = 0 != t.skipCurrent,
							o = t.range,
							s = t.start;
						s || (s = o ? o[i ? "end" : "start"] : e.selection.getRange()), s.start && (s = s[r != i ? "end" : "start"]);
						var a = o ? o.start.row : 0,
							c = o ? o.end.row : e.getLength() - 1;
						if (i) var l = function (e) {
							var n = s.row;
							if (!h(n, s.column, e)) {
								for (n--; n >= a; n--)
									if (h(n, Number.MAX_VALUE, e)) return;
								if (0 != t.wrap)
									for (n = c, a = s.row; n >= a; n--)
										if (h(n, Number.MAX_VALUE, e)) return
							}
						};
						else l = function (e) {
							var n = s.row;
							if (!h(n, s.column, e)) {
								for (n += 1; n <= c; n++)
									if (h(n, 0, e)) return;
								if (0 != t.wrap)
									for (n = a, c = s.row; n <= c; n++)
										if (h(n, 0, e)) return
							}
						};
						if (t.$isMultiLine) var u = n.length,
							h = function (t, r, o) {
								var s = i ? t - u + 1 : t;
								if (!(s < 0)) {
									var a = e.getLine(s),
										c = a.search(n[0]);
									if (!(!i && c < r || -1 === c)) {
										for (var l = 1; l < u; l++)
											if (-1 == (a = e.getLine(s + l)).search(n[l])) return;
										var h = a.match(n[u - 1])[0].length;
										if (!(i && h > r)) return !!o(s, c, s + u - 1, h) || void 0
									}
								}
							};
						else if (i) h = function (t, i, r) {
							var o, s = e.getLine(t),
								a = [],
								c = 0;
							for (n.lastIndex = 0; o = n.exec(s);) {
								var l = o[0].length;
								if (c = o.index, !l) {
									if (c >= s.length) break;
									n.lastIndex = c += 1
								}
								if (o.index + l > i) break;
								a.push(o.index, l)
							}
							for (var u = a.length - 1; u >= 0; u -= 2) {
								var h = a[u - 1];
								if (r(t, h, t, h + (l = a[u]))) return !0
							}
						};
						else h = function (t, i, r) {
							var o, s, a = e.getLine(t);
							for (n.lastIndex = i; s = n.exec(a);) {
								var c = s[0].length;
								if (r(t, o = s.index, t, o + c)) return !0;
								if (!c && (n.lastIndex = o += 1, o >= a.length)) return !1
							}
						};
						return {
							forEach: l
						}
					}
				}).call(s.prototype), t.Search = s
			})), ace.define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/keys"),
					r = e("../lib/useragent"),
					o = i.KEY_MODS;

				function s(e, t) {
					this.platform = t || (r.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(e), this.$singleCommand = !0
				}

				function a(e, t) {
					s.call(this, e, t), this.$singleCommand = !1
				}
				a.prototype = s.prototype,
					function () {
						function e(e) {
							return "object" == typeof e && e.bindKey && e.bindKey.position || (e.isDefault ? -100 : 0)
						}
						this.addCommand = function (e) {
							this.commands[e.name] && this.removeCommand(e), this.commands[e.name] = e, e.bindKey && this._buildKeyHash(e)
						}, this.removeCommand = function (e, t) {
							var n = e && ("string" == typeof e ? e : e.name);
							e = this.commands[n], t || delete this.commands[n];
							var i = this.commandKeyBinding;
							for (var r in i) {
								var o = i[r];
								if (o == e) delete i[r];
								else if (Array.isArray(o)) {
									var s = o.indexOf(e); - 1 != s && (o.splice(s, 1), 1 == o.length && (i[r] = o[0]))
								}
							}
						}, this.bindKey = function (e, t, n) {
							if ("object" == typeof e && e && (null == n && (n = e.position), e = e[this.platform]), e) return "function" == typeof t ? this.addCommand({
								exec: t,
								bindKey: e,
								name: t.name || e
							}) : void e.split("|").forEach((function (e) {
								var i = "";
								if (-1 != e.indexOf(" ")) {
									var r = e.split(/\s+/);
									e = r.pop(), r.forEach((function (e) {
										var t = this.parseKeys(e),
											n = o[t.hashId] + t.key;
										i += (i ? " " : "") + n, this._addCommandToBinding(i, "chainKeys")
									}), this), i += " "
								}
								var s = this.parseKeys(e),
									a = o[s.hashId] + s.key;
								this._addCommandToBinding(i + a, t, n)
							}), this)
						}, this._addCommandToBinding = function (t, n, i) {
							var r, o = this.commandKeyBinding;
							if (n)
								if (!o[t] || this.$singleCommand) o[t] = n;
								else {
									Array.isArray(o[t]) ? -1 != (r = o[t].indexOf(n)) && o[t].splice(r, 1) : o[t] = [o[t]], "number" != typeof i && (i = e(n));
									var s = o[t];
									for (r = 0; r < s.length; r++) {
										if (e(s[r]) > i) break
									}
									s.splice(r, 0, n)
								}
							else delete o[t]
						}, this.addCommands = function (e) {
							e && Object.keys(e).forEach((function (t) {
								var n = e[t];
								if (n) {
									if ("string" == typeof n) return this.bindKey(n, t);
									"function" == typeof n && (n = {
										exec: n
									}), "object" == typeof n && (n.name || (n.name = t), this.addCommand(n))
								}
							}), this)
						}, this.removeCommands = function (e) {
							Object.keys(e).forEach((function (t) {
								this.removeCommand(e[t])
							}), this)
						}, this.bindKeys = function (e) {
							Object.keys(e).forEach((function (t) {
								this.bindKey(t, e[t])
							}), this)
						}, this._buildKeyHash = function (e) {
							this.bindKey(e.bindKey, e)
						}, this.parseKeys = function (e) {
							var t = e.toLowerCase().split(/[\-\+]([\-\+])?/).filter((function (e) {
									return e
								})),
								n = t.pop(),
								r = i[n];
							if (i.FUNCTION_KEYS[r]) n = i.FUNCTION_KEYS[r].toLowerCase();
							else {
								if (!t.length) return {
									key: n,
									hashId: -1
								};
								if (1 == t.length && "shift" == t[0]) return {
									key: n.toUpperCase(),
									hashId: -1
								}
							}
							for (var o = 0, s = t.length; s--;) {
								var a = i.KEY_MODS[t[s]];
								if (null == a) return "undefined" != typeof console && console.error("invalid modifier " + t[s] + " in " + e), !1;
								o |= a
							}
							return {
								key: n,
								hashId: o
							}
						}, this.findKeyCommand = function (e, t) {
							var n = o[e] + t;
							return this.commandKeyBinding[n]
						}, this.handleKeyboard = function (e, t, n, i) {
							if (!(i < 0)) {
								var r = o[t] + n,
									s = this.commandKeyBinding[r];
								return e.$keyChain && (e.$keyChain += " " + r, s = this.commandKeyBinding[e.$keyChain] || s), !s || "chainKeys" != s && "chainKeys" != s[s.length - 1] ? (e.$keyChain && (t && 4 != t || 1 != n.length ? (-1 == t || i > 0) && (e.$keyChain = "") : e.$keyChain = e.$keyChain.slice(0, -r.length - 1)), {
									command: s
								}) : (e.$keyChain = e.$keyChain || r, {
									command: "null"
								})
							}
						}, this.getStatusText = function (e, t) {
							return t.$keyChain || ""
						}
					}.call(s.prototype), t.HashHandler = s, t.MultiHashHandler = a
			})), ace.define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("../keyboard/hash_handler").MultiHashHandler,
					o = e("../lib/event_emitter").EventEmitter,
					s = function (e, t) {
						r.call(this, t, e), this.byName = this.commands, this.setDefaultHandler("exec", (function (e) {
							return e.command.exec(e.editor, e.args || {})
						}))
					};
				i.inherits(s, r),
					function () {
						i.implement(this, o), this.exec = function (e, t, n) {
							if (Array.isArray(e)) {
								for (var i = e.length; i--;)
									if (this.exec(e[i], t, n)) return !0;
								return !1
							}
							if ("string" == typeof e && (e = this.commands[e]), !e) return !1;
							if (t && t.$readOnly && !e.readOnly) return !1;
							if (0 != this.$checkCommandState && e.isAvailable && !e.isAvailable(t)) return !1;
							var r = {
								editor: t,
								command: e,
								args: n
							};
							return r.returnValue = this._emit("exec", r), this._signal("afterExec", r), !1 !== r.returnValue
						}, this.toggleRecording = function (e) {
							if (!this.$inReplay) return e && e._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function (e) {
								this.macro.push([e.command, e.args])
							}.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0)
						}, this.replay = function (e) {
							if (!this.$inReplay && this.macro) {
								if (this.recording) return this.toggleRecording(e);
								try {
									this.$inReplay = !0, this.macro.forEach((function (t) {
										"string" == typeof t ? this.exec(t, e) : this.exec(t[0], e, t[1])
									}), this)
								} finally {
									this.$inReplay = !1
								}
							}
						}, this.trimMacro = function (e) {
							return e.map((function (e) {
								return "string" != typeof e[0] && (e[0] = e[0].name), e[1] || (e = e[0]), e
							}))
						}
					}.call(s.prototype), t.CommandManager = s
			})), ace.define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/lang"),
					r = e("../config"),
					o = e("../range").Range;

				function s(e, t) {
					return {
						win: e,
						mac: t
					}
				}
				t.commands = [{
					name: "showSettingsMenu",
					bindKey: s("Ctrl-,", "Command-,"),
					exec: function (e) {
						r.loadModule("ace/ext/settings_menu", (function (t) {
							t.init(e), e.showSettingsMenu()
						}))
					},
					readOnly: !0
				}, {
					name: "goToNextError",
					bindKey: s("Alt-E", "F4"),
					exec: function (e) {
						r.loadModule("./ext/error_marker", (function (t) {
							t.showErrorMarker(e, 1)
						}))
					},
					scrollIntoView: "animate",
					readOnly: !0
				}, {
					name: "goToPreviousError",
					bindKey: s("Alt-Shift-E", "Shift-F4"),
					exec: function (e) {
						r.loadModule("./ext/error_marker", (function (t) {
							t.showErrorMarker(e, -1)
						}))
					},
					scrollIntoView: "animate",
					readOnly: !0
				}, {
					name: "selectall",
					description: "Select all",
					bindKey: s("Ctrl-A", "Command-A"),
					exec: function (e) {
						e.selectAll()
					},
					readOnly: !0
				}, {
					name: "centerselection",
					description: "Center selection",
					bindKey: s(null, "Ctrl-L"),
					exec: function (e) {
						e.centerSelection()
					},
					readOnly: !0
				}, {
					name: "gotoline",
					description: "Go to line...",
					bindKey: s("Ctrl-L", "Command-L"),
					exec: function (e, t) {
						"number" != typeof t || isNaN(t) || e.gotoLine(t), e.prompt({
							$type: "gotoLine"
						})
					},
					readOnly: !0
				}, {
					name: "fold",
					bindKey: s("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
					exec: function (e) {
						e.session.toggleFold(!1)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "unfold",
					bindKey: s("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
					exec: function (e) {
						e.session.toggleFold(!0)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "toggleFoldWidget",
					bindKey: s("F2", "F2"),
					exec: function (e) {
						e.session.toggleFoldWidget()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "toggleParentFoldWidget",
					bindKey: s("Alt-F2", "Alt-F2"),
					exec: function (e) {
						e.session.toggleFoldWidget(!0)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "foldall",
					description: "Fold all",
					bindKey: s(null, "Ctrl-Command-Option-0"),
					exec: function (e) {
						e.session.foldAll()
					},
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "foldOther",
					description: "Fold other",
					bindKey: s("Alt-0", "Command-Option-0"),
					exec: function (e) {
						e.session.foldAll(), e.session.unfold(e.selection.getAllRanges())
					},
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "unfoldall",
					description: "Unfold all",
					bindKey: s("Alt-Shift-0", "Command-Option-Shift-0"),
					exec: function (e) {
						e.session.unfold()
					},
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "findnext",
					description: "Find next",
					bindKey: s("Ctrl-K", "Command-G"),
					exec: function (e) {
						e.findNext()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "findprevious",
					description: "Find previous",
					bindKey: s("Ctrl-Shift-K", "Command-Shift-G"),
					exec: function (e) {
						e.findPrevious()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "center",
					readOnly: !0
				}, {
					name: "selectOrFindNext",
					description: "Select or find next",
					bindKey: s("Alt-K", "Ctrl-G"),
					exec: function (e) {
						e.selection.isEmpty() ? e.selection.selectWord() : e.findNext()
					},
					readOnly: !0
				}, {
					name: "selectOrFindPrevious",
					description: "Select or find previous",
					bindKey: s("Alt-Shift-K", "Ctrl-Shift-G"),
					exec: function (e) {
						e.selection.isEmpty() ? e.selection.selectWord() : e.findPrevious()
					},
					readOnly: !0
				}, {
					name: "find",
					description: "Find",
					bindKey: s("Ctrl-F", "Command-F"),
					exec: function (e) {
						r.loadModule("ace/ext/searchbox", (function (t) {
							t.Search(e)
						}))
					},
					readOnly: !0
				}, {
					name: "overwrite",
					description: "Overwrite",
					bindKey: "Insert",
					exec: function (e) {
						e.toggleOverwrite()
					},
					readOnly: !0
				}, {
					name: "selecttostart",
					description: "Select to start",
					bindKey: s("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"),
					exec: function (e) {
						e.getSelection().selectFileStart()
					},
					multiSelectAction: "forEach",
					readOnly: !0,
					scrollIntoView: "animate",
					aceCommandGroup: "fileJump"
				}, {
					name: "gotostart",
					description: "Go to start",
					bindKey: s("Ctrl-Home", "Command-Home|Command-Up"),
					exec: function (e) {
						e.navigateFileStart()
					},
					multiSelectAction: "forEach",
					readOnly: !0,
					scrollIntoView: "animate",
					aceCommandGroup: "fileJump"
				}, {
					name: "selectup",
					description: "Select up",
					bindKey: s("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
					exec: function (e) {
						e.getSelection().selectUp()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "golineup",
					description: "Go line up",
					bindKey: s("Up", "Up|Ctrl-P"),
					exec: function (e, t) {
						e.navigateUp(t.times)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selecttoend",
					description: "Select to end",
					bindKey: s("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"),
					exec: function (e) {
						e.getSelection().selectFileEnd()
					},
					multiSelectAction: "forEach",
					readOnly: !0,
					scrollIntoView: "animate",
					aceCommandGroup: "fileJump"
				}, {
					name: "gotoend",
					description: "Go to end",
					bindKey: s("Ctrl-End", "Command-End|Command-Down"),
					exec: function (e) {
						e.navigateFileEnd()
					},
					multiSelectAction: "forEach",
					readOnly: !0,
					scrollIntoView: "animate",
					aceCommandGroup: "fileJump"
				}, {
					name: "selectdown",
					description: "Select down",
					bindKey: s("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
					exec: function (e) {
						e.getSelection().selectDown()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "golinedown",
					description: "Go line down",
					bindKey: s("Down", "Down|Ctrl-N"),
					exec: function (e, t) {
						e.navigateDown(t.times)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectwordleft",
					description: "Select word left",
					bindKey: s("Ctrl-Shift-Left", "Option-Shift-Left"),
					exec: function (e) {
						e.getSelection().selectWordLeft()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotowordleft",
					description: "Go to word left",
					bindKey: s("Ctrl-Left", "Option-Left"),
					exec: function (e) {
						e.navigateWordLeft()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selecttolinestart",
					description: "Select to line start",
					bindKey: s("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
					exec: function (e) {
						e.getSelection().selectLineStart()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotolinestart",
					description: "Go to line start",
					bindKey: s("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
					exec: function (e) {
						e.navigateLineStart()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectleft",
					description: "Select left",
					bindKey: s("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
					exec: function (e) {
						e.getSelection().selectLeft()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotoleft",
					description: "Go to left",
					bindKey: s("Left", "Left|Ctrl-B"),
					exec: function (e, t) {
						e.navigateLeft(t.times)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectwordright",
					description: "Select word right",
					bindKey: s("Ctrl-Shift-Right", "Option-Shift-Right"),
					exec: function (e) {
						e.getSelection().selectWordRight()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotowordright",
					description: "Go to word right",
					bindKey: s("Ctrl-Right", "Option-Right"),
					exec: function (e) {
						e.navigateWordRight()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selecttolineend",
					description: "Select to line end",
					bindKey: s("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"),
					exec: function (e) {
						e.getSelection().selectLineEnd()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotolineend",
					description: "Go to line end",
					bindKey: s("Alt-Right|End", "Command-Right|End|Ctrl-E"),
					exec: function (e) {
						e.navigateLineEnd()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectright",
					description: "Select right",
					bindKey: s("Shift-Right", "Shift-Right"),
					exec: function (e) {
						e.getSelection().selectRight()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "gotoright",
					description: "Go to right",
					bindKey: s("Right", "Right|Ctrl-F"),
					exec: function (e, t) {
						e.navigateRight(t.times)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectpagedown",
					description: "Select page down",
					bindKey: "Shift-PageDown",
					exec: function (e) {
						e.selectPageDown()
					},
					readOnly: !0
				}, {
					name: "pagedown",
					description: "Page down",
					bindKey: s(null, "Option-PageDown"),
					exec: function (e) {
						e.scrollPageDown()
					},
					readOnly: !0
				}, {
					name: "gotopagedown",
					description: "Go to page down",
					bindKey: s("PageDown", "PageDown|Ctrl-V"),
					exec: function (e) {
						e.gotoPageDown()
					},
					readOnly: !0
				}, {
					name: "selectpageup",
					description: "Select page up",
					bindKey: "Shift-PageUp",
					exec: function (e) {
						e.selectPageUp()
					},
					readOnly: !0
				}, {
					name: "pageup",
					description: "Page up",
					bindKey: s(null, "Option-PageUp"),
					exec: function (e) {
						e.scrollPageUp()
					},
					readOnly: !0
				}, {
					name: "gotopageup",
					description: "Go to page up",
					bindKey: "PageUp",
					exec: function (e) {
						e.gotoPageUp()
					},
					readOnly: !0
				}, {
					name: "scrollup",
					description: "Scroll up",
					bindKey: s("Ctrl-Up", null),
					exec: function (e) {
						e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight)
					},
					readOnly: !0
				}, {
					name: "scrolldown",
					description: "Scroll down",
					bindKey: s("Ctrl-Down", null),
					exec: function (e) {
						e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight)
					},
					readOnly: !0
				}, {
					name: "selectlinestart",
					description: "Select line start",
					bindKey: "Shift-Home",
					exec: function (e) {
						e.getSelection().selectLineStart()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectlineend",
					description: "Select line end",
					bindKey: "Shift-End",
					exec: function (e) {
						e.getSelection().selectLineEnd()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "togglerecording",
					description: "Toggle recording",
					bindKey: s("Ctrl-Alt-E", "Command-Option-E"),
					exec: function (e) {
						e.commands.toggleRecording(e)
					},
					readOnly: !0
				}, {
					name: "replaymacro",
					description: "Replay macro",
					bindKey: s("Ctrl-Shift-E", "Command-Shift-E"),
					exec: function (e) {
						e.commands.replay(e)
					},
					readOnly: !0
				}, {
					name: "jumptomatching",
					description: "Jump to matching",
					bindKey: s("Ctrl-\\|Ctrl-P", "Command-\\"),
					exec: function (e) {
						e.jumpToMatching()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "animate",
					readOnly: !0
				}, {
					name: "selecttomatching",
					description: "Select to matching",
					bindKey: s("Ctrl-Shift-\\|Ctrl-Shift-P", "Command-Shift-\\"),
					exec: function (e) {
						e.jumpToMatching(!0)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "animate",
					readOnly: !0
				}, {
					name: "expandToMatching",
					description: "Expand to matching",
					bindKey: s("Ctrl-Shift-M", "Ctrl-Shift-M"),
					exec: function (e) {
						e.jumpToMatching(!0, !0)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "animate",
					readOnly: !0
				}, {
					name: "passKeysToBrowser",
					description: "Pass keys to browser",
					bindKey: s(null, null),
					exec: function () {},
					passEvent: !0,
					readOnly: !0
				}, {
					name: "copy",
					description: "Copy",
					exec: function (e) {},
					readOnly: !0
				}, {
					name: "cut",
					description: "Cut",
					exec: function (e) {
						var t = e.$copyWithEmptySelection && e.selection.isEmpty() ? e.selection.getLineRange() : e.selection.getRange();
						e._emit("cut", t), t.isEmpty() || e.session.remove(t), e.clearSelection()
					},
					scrollIntoView: "cursor",
					multiSelectAction: "forEach"
				}, {
					name: "paste",
					description: "Paste",
					exec: function (e, t) {
						e.$handlePaste(t)
					},
					scrollIntoView: "cursor"
				}, {
					name: "removeline",
					description: "Remove line",
					bindKey: s("Ctrl-D", "Command-D"),
					exec: function (e) {
						e.removeLines()
					},
					scrollIntoView: "cursor",
					multiSelectAction: "forEachLine"
				}, {
					name: "duplicateSelection",
					description: "Duplicate selection",
					bindKey: s("Ctrl-Shift-D", "Command-Shift-D"),
					exec: function (e) {
						e.duplicateSelection()
					},
					scrollIntoView: "cursor",
					multiSelectAction: "forEach"
				}, {
					name: "sortlines",
					description: "Sort lines",
					bindKey: s("Ctrl-Alt-S", "Command-Alt-S"),
					exec: function (e) {
						e.sortLines()
					},
					scrollIntoView: "selection",
					multiSelectAction: "forEachLine"
				}, {
					name: "togglecomment",
					description: "Toggle comment",
					bindKey: s("Ctrl-/", "Command-/"),
					exec: function (e) {
						e.toggleCommentLines()
					},
					multiSelectAction: "forEachLine",
					scrollIntoView: "selectionPart"
				}, {
					name: "toggleBlockComment",
					description: "Toggle block comment",
					bindKey: s("Ctrl-Shift-/", "Command-Shift-/"),
					exec: function (e) {
						e.toggleBlockComment()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "selectionPart"
				}, {
					name: "modifyNumberUp",
					description: "Modify number up",
					bindKey: s("Ctrl-Shift-Up", "Alt-Shift-Up"),
					exec: function (e) {
						e.modifyNumber(1)
					},
					scrollIntoView: "cursor",
					multiSelectAction: "forEach"
				}, {
					name: "modifyNumberDown",
					description: "Modify number down",
					bindKey: s("Ctrl-Shift-Down", "Alt-Shift-Down"),
					exec: function (e) {
						e.modifyNumber(-1)
					},
					scrollIntoView: "cursor",
					multiSelectAction: "forEach"
				}, {
					name: "replace",
					description: "Replace",
					bindKey: s("Ctrl-H", "Command-Option-F"),
					exec: function (e) {
						r.loadModule("ace/ext/searchbox", (function (t) {
							t.Search(e, !0)
						}))
					}
				}, {
					name: "undo",
					description: "Undo",
					bindKey: s("Ctrl-Z", "Command-Z"),
					exec: function (e) {
						e.undo()
					}
				}, {
					name: "redo",
					description: "Redo",
					bindKey: s("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
					exec: function (e) {
						e.redo()
					}
				}, {
					name: "copylinesup",
					description: "Copy lines up",
					bindKey: s("Alt-Shift-Up", "Command-Option-Up"),
					exec: function (e) {
						e.copyLinesUp()
					},
					scrollIntoView: "cursor"
				}, {
					name: "movelinesup",
					description: "Move lines up",
					bindKey: s("Alt-Up", "Option-Up"),
					exec: function (e) {
						e.moveLinesUp()
					},
					scrollIntoView: "cursor"
				}, {
					name: "copylinesdown",
					description: "Copy lines down",
					bindKey: s("Alt-Shift-Down", "Command-Option-Down"),
					exec: function (e) {
						e.copyLinesDown()
					},
					scrollIntoView: "cursor"
				}, {
					name: "movelinesdown",
					description: "Move lines down",
					bindKey: s("Alt-Down", "Option-Down"),
					exec: function (e) {
						e.moveLinesDown()
					},
					scrollIntoView: "cursor"
				}, {
					name: "del",
					description: "Delete",
					bindKey: s("Delete", "Delete|Ctrl-D|Shift-Delete"),
					exec: function (e) {
						e.remove("right")
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "backspace",
					description: "Backspace",
					bindKey: s("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
					exec: function (e) {
						e.remove("left")
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "cut_or_delete",
					description: "Cut or delete",
					bindKey: s("Shift-Delete", null),
					exec: function (e) {
						if (!e.selection.isEmpty()) return !1;
						e.remove("left")
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removetolinestart",
					description: "Remove to line start",
					bindKey: s("Alt-Backspace", "Command-Backspace"),
					exec: function (e) {
						e.removeToLineStart()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removetolineend",
					description: "Remove to line end",
					bindKey: s("Alt-Delete", "Ctrl-K|Command-Delete"),
					exec: function (e) {
						e.removeToLineEnd()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removetolinestarthard",
					description: "Remove to line start hard",
					bindKey: s("Ctrl-Shift-Backspace", null),
					exec: function (e) {
						var t = e.selection.getRange();
						t.start.column = 0, e.session.remove(t)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removetolineendhard",
					description: "Remove to line end hard",
					bindKey: s("Ctrl-Shift-Delete", null),
					exec: function (e) {
						var t = e.selection.getRange();
						t.end.column = Number.MAX_VALUE, e.session.remove(t)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removewordleft",
					description: "Remove word left",
					bindKey: s("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
					exec: function (e) {
						e.removeWordLeft()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "removewordright",
					description: "Remove word right",
					bindKey: s("Ctrl-Delete", "Alt-Delete"),
					exec: function (e) {
						e.removeWordRight()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "outdent",
					description: "Outdent",
					bindKey: s("Shift-Tab", "Shift-Tab"),
					exec: function (e) {
						e.blockOutdent()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "selectionPart"
				}, {
					name: "indent",
					description: "Indent",
					bindKey: s("Tab", "Tab"),
					exec: function (e) {
						e.indent()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "selectionPart"
				}, {
					name: "blockoutdent",
					description: "Block outdent",
					bindKey: s("Ctrl-[", "Ctrl-["),
					exec: function (e) {
						e.blockOutdent()
					},
					multiSelectAction: "forEachLine",
					scrollIntoView: "selectionPart"
				}, {
					name: "blockindent",
					description: "Block indent",
					bindKey: s("Ctrl-]", "Ctrl-]"),
					exec: function (e) {
						e.blockIndent()
					},
					multiSelectAction: "forEachLine",
					scrollIntoView: "selectionPart"
				}, {
					name: "insertstring",
					description: "Insert string",
					exec: function (e, t) {
						e.insert(t)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "inserttext",
					description: "Insert text",
					exec: function (e, t) {
						e.insert(i.stringRepeat(t.text || "", t.times || 1))
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "splitline",
					description: "Split line",
					bindKey: s(null, "Ctrl-O"),
					exec: function (e) {
						e.splitLine()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "transposeletters",
					description: "Transpose letters",
					bindKey: s("Alt-Shift-X", "Ctrl-T"),
					exec: function (e) {
						e.transposeLetters()
					},
					multiSelectAction: function (e) {
						e.transposeSelections(1)
					},
					scrollIntoView: "cursor"
				}, {
					name: "touppercase",
					description: "To uppercase",
					bindKey: s("Ctrl-U", "Ctrl-U"),
					exec: function (e) {
						e.toUpperCase()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "tolowercase",
					description: "To lowercase",
					bindKey: s("Ctrl-Shift-U", "Ctrl-Shift-U"),
					exec: function (e) {
						e.toLowerCase()
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor"
				}, {
					name: "expandtoline",
					description: "Expand to line",
					bindKey: s("Ctrl-Shift-L", "Command-Shift-L"),
					exec: function (e) {
						var t = e.selection.getRange();
						t.start.column = t.end.column = 0, t.end.row++, e.selection.setRange(t, !1)
					},
					multiSelectAction: "forEach",
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "joinlines",
					description: "Join lines",
					bindKey: s(null, null),
					exec: function (e) {
						for (var t = e.selection.isBackwards(), n = t ? e.selection.getSelectionLead() : e.selection.getSelectionAnchor(), r = t ? e.selection.getSelectionAnchor() : e.selection.getSelectionLead(), s = e.session.doc.getLine(n.row).length, a = e.session.doc.getTextRange(e.selection.getRange()).replace(/\n\s*/, " ").length, c = e.session.doc.getLine(n.row), l = n.row + 1; l <= r.row + 1; l++) {
							var u = i.stringTrimLeft(i.stringTrimRight(e.session.doc.getLine(l)));
							0 !== u.length && (u = " " + u), c += u
						}
						r.row + 1 < e.session.doc.getLength() - 1 && (c += e.session.doc.getNewLineCharacter()), e.clearSelection(), e.session.doc.replace(new o(n.row, 0, r.row + 2, 0), c), a > 0 ? (e.selection.moveCursorTo(n.row, n.column), e.selection.selectTo(n.row, n.column + a)) : (s = e.session.doc.getLine(n.row).length > s ? s + 1 : s, e.selection.moveCursorTo(n.row, s))
					},
					multiSelectAction: "forEach",
					readOnly: !0
				}, {
					name: "invertSelection",
					description: "Invert selection",
					bindKey: s(null, null),
					exec: function (e) {
						var t = e.session.doc.getLength() - 1,
							n = e.session.doc.getLine(t).length,
							i = e.selection.rangeList.ranges,
							r = [];
						i.length < 1 && (i = [e.selection.getRange()]);
						for (var s = 0; s < i.length; s++) s == i.length - 1 && (i[s].end.row === t && i[s].end.column === n || r.push(new o(i[s].end.row, i[s].end.column, t, n))), 0 === s ? 0 === i[s].start.row && 0 === i[s].start.column || r.push(new o(0, 0, i[s].start.row, i[s].start.column)) : r.push(new o(i[s - 1].end.row, i[s - 1].end.column, i[s].start.row, i[s].start.column));
						e.exitMultiSelectMode(), e.clearSelection();
						for (s = 0; s < r.length; s++) e.selection.addRange(r[s], !1)
					},
					readOnly: !0,
					scrollIntoView: "none"
				}, {
					name: "openCommandPallete",
					description: "Open command pallete",
					bindKey: s("F1", "F1"),
					exec: function (e) {
						e.prompt({
							$type: "commands"
						})
					},
					readOnly: !0
				}, {
					name: "modeSelect",
					description: "Change language mode...",
					bindKey: s(null, null),
					exec: function (e) {
						e.prompt({
							$type: "modes"
						})
					},
					readOnly: !0
				}]
			})), ace.define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator", "ace/clipboard"], (function (e, t, n) {
				"use strict";
				e("./lib/fixoldbrowsers");
				var i = e("./lib/oop"),
					r = e("./lib/dom"),
					o = e("./lib/lang"),
					s = e("./lib/useragent"),
					a = e("./keyboard/textinput").TextInput,
					c = e("./mouse/mouse_handler").MouseHandler,
					l = e("./mouse/fold_handler").FoldHandler,
					u = e("./keyboard/keybinding").KeyBinding,
					h = e("./edit_session").EditSession,
					d = e("./search").Search,
					p = e("./range").Range,
					m = e("./lib/event_emitter").EventEmitter,
					f = e("./commands/command_manager").CommandManager,
					g = e("./commands/default_commands").commands,
					v = e("./config"),
					_ = e("./token_iterator").TokenIterator,
					E = e("./clipboard"),
					C = function (e, t, n) {
						var i = e.getContainerElement();
						this.container = i, this.renderer = e, this.id = "editor" + ++C.$uid, this.commands = new f(s.isMac ? "mac" : "win", g), "object" == typeof document && (this.textInput = new a(e.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.$mouseHandler = new c(this), new l(this)), this.keyBinding = new u(this), this.$search = (new d).set({
							wrap: !0
						}), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = o.delayedCall(function () {
							this._signal("input", {}), this.session && this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart()
						}.bind(this)), this.on("change", (function (e, t) {
							t._$emitInputEvent.schedule(31)
						})), this.setSession(t || n && n.session || new h("")), v.resetOptions(this), n && this.setOptions(n), v._signal("editor", this)
					};
				C.$uid = 0,
					function () {
						i.implement(this, m), this.$initOperationListeners = function () {
							this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = o.delayedCall(this.endOperation.bind(this, !0)), this.on("change", function () {
								this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.docChanged = !0
							}.bind(this), !0), this.on("changeSelection", function () {
								this.curOp || (this.startOperation(), this.curOp.selectionBefore = this.$lastSel), this.curOp.selectionChanged = !0
							}.bind(this), !0)
						}, this.curOp = null, this.prevOp = {}, this.startOperation = function (e) {
							if (this.curOp) {
								if (!e || this.curOp.command) return;
								this.prevOp = this.curOp
							}
							e || (this.previousCommand = null, e = {}), this.$opResetTimer.schedule(), this.curOp = this.session.curOp = {
								command: e.command || {},
								args: e.args,
								scrollTop: this.renderer.scrollTop
							}, this.curOp.selectionBefore = this.selection.toJSON()
						}, this.endOperation = function (e) {
							if (this.curOp) {
								if (e && !1 === e.returnValue) return this.curOp = null;
								if (1 == e && this.curOp.command && "mouse" == this.curOp.command.name) return;
								if (this._signal("beforeEndOperation"), !this.curOp) return;
								var t = this.curOp.command,
									n = t && t.scrollIntoView;
								if (n) {
									switch (n) {
										case "center-animate":
											n = "animate";
										case "center":
											this.renderer.scrollCursorIntoView(null, .5);
											break;
										case "animate":
										case "cursor":
											this.renderer.scrollCursorIntoView();
											break;
										case "selectionPart":
											var i = this.selection.getRange(),
												r = this.renderer.layerConfig;
											(i.start.row >= r.lastRow || i.end.row <= r.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
									}
									"animate" == n && this.renderer.animateScrolling(this.curOp.scrollTop)
								}
								var o = this.selection.toJSON();
								this.curOp.selectionAfter = o, this.$lastSel = this.selection.toJSON(), this.session.getUndoManager().addSelection(o), this.prevOp = this.curOp, this.curOp = null
							}
						}, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function (e) {
							if (this.$mergeUndoDeltas) {
								var t = this.prevOp,
									n = this.$mergeableCommands,
									i = t.command && e.command.name == t.command.name;
								if ("insertstring" == e.command.name) {
									var r = e.args;
									void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), i = i && this.mergeNextCommand && (!/\s/.test(r) || /\s/.test(t.args)), this.mergeNextCommand = !0
								} else i = i && -1 !== n.indexOf(e.command.name);
								"always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (i = !1), i ? this.session.mergeUndoDeltas = !0 : -1 !== n.indexOf(e.command.name) && (this.sequenceStartTime = Date.now())
							}
						}, this.setKeyboardHandler = function (e, t) {
							if (e && "string" == typeof e && "ace" != e) {
								this.$keybindingId = e;
								var n = this;
								v.loadModule(["keybinding", e], (function (i) {
									n.$keybindingId == e && n.keyBinding.setKeyboardHandler(i && i.handler), t && t()
								}))
							} else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(e), t && t()
						}, this.getKeyboardHandler = function () {
							return this.keyBinding.getKeyboardHandler()
						}, this.setSession = function (e) {
							if (this.session != e) {
								this.curOp && this.endOperation(), this.curOp = {};
								var t = this.session;
								if (t) {
									this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
									var n = this.session.getSelection();
									n.off("changeCursor", this.$onCursorChange), n.off("changeSelection", this.$onSelectionChange)
								}
								this.session = e, e ? (this.$onDocumentChange = this.onDocumentChange.bind(this), e.on("change", this.$onDocumentChange), this.renderer.setSession(e), this.$onChangeMode = this.onChangeMode.bind(this), e.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), e.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), e.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), e.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), e.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), e.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = e.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.onCursorChange(), this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(e)), this._signal("changeSession", {
									session: e,
									oldSession: t
								}), this.curOp = null, t && t._signal("changeEditor", {
									oldEditor: this
								}), e && e._signal("changeEditor", {
									editor: this
								}), e && e.bgTokenizer && e.bgTokenizer.scheduleStart()
							}
						}, this.getSession = function () {
							return this.session
						}, this.setValue = function (e, t) {
							return this.session.doc.setValue(e), t ? 1 == t ? this.navigateFileEnd() : -1 == t && this.navigateFileStart() : this.selectAll(), e
						}, this.getValue = function () {
							return this.session.getValue()
						}, this.getSelection = function () {
							return this.selection
						}, this.resize = function (e) {
							this.renderer.onResize(e)
						}, this.setTheme = function (e, t) {
							this.renderer.setTheme(e, t)
						}, this.getTheme = function () {
							return this.renderer.getTheme()
						}, this.setStyle = function (e) {
							this.renderer.setStyle(e)
						}, this.unsetStyle = function (e) {
							this.renderer.unsetStyle(e)
						}, this.getFontSize = function () {
							return this.getOption("fontSize") || r.computedStyle(this.container).fontSize
						}, this.setFontSize = function (e) {
							this.setOption("fontSize", e)
						}, this.$highlightBrackets = function () {
							if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
								var e = this;
								this.$highlightPending = !0, setTimeout((function () {
									e.$highlightPending = !1;
									var t = e.session;
									if (t && t.bgTokenizer) {
										var n = t.findMatchingBracket(e.getCursorPosition());
										if (n) var i = new p(n.row, n.column, n.row, n.column + 1);
										else if (t.$mode.getMatching) i = t.$mode.getMatching(e.session);
										i && (t.$bracketHighlight = t.addMarker(i, "ace_bracket", "text"))
									}
								}), 50)
							}
						}, this.$highlightTags = function () {
							if (!this.$highlightTagPending) {
								var e = this;
								this.$highlightTagPending = !0, setTimeout((function () {
									e.$highlightTagPending = !1;
									var t = e.session;
									if (t && t.bgTokenizer) {
										var n = e.getCursorPosition(),
											i = new _(e.session, n.row, n.column),
											r = i.getCurrentToken();
										if (!r || !/\b(?:tag-open|tag-name)/.test(r.type)) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
										if (-1 == r.type.indexOf("tag-open") || (r = i.stepForward())) {
											var o = r.value,
												s = 0,
												a = i.stepBackward();
											if ("<" == a.value)
												do {
													a = r, (r = i.stepForward()) && r.value === o && -1 !== r.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--)
												} while (r && s >= 0);
											else {
												do {
													r = a, a = i.stepBackward(), r && r.value === o && -1 !== r.type.indexOf("tag-name") && ("<" === a.value ? s++ : "</" === a.value && s--)
												} while (a && s <= 0);
												i.stepForward()
											}
											if (!r) return t.removeMarker(t.$tagHighlight), void(t.$tagHighlight = null);
											var c = i.getCurrentTokenRow(),
												l = i.getCurrentTokenColumn(),
												u = new p(c, l, c, l + r.value.length),
												h = t.$backMarkers[t.$tagHighlight];
											t.$tagHighlight && null != h && 0 !== u.compareRange(h.range) && (t.removeMarker(t.$tagHighlight), t.$tagHighlight = null), t.$tagHighlight || (t.$tagHighlight = t.addMarker(u, "ace_bracket", "text"))
										}
									}
								}), 50)
							}
						}, this.focus = function () {
							var e = this;
							setTimeout((function () {
								e.isFocused() || e.textInput.focus()
							})), this.textInput.focus()
						}, this.isFocused = function () {
							return this.textInput.isFocused()
						}, this.blur = function () {
							this.textInput.blur()
						}, this.onFocus = function (e) {
							this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", e))
						}, this.onBlur = function (e) {
							this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", e))
						}, this.$cursorChange = function () {
							this.renderer.updateCursor()
						}, this.onDocumentChange = function (e) {
							var t = this.session.$useWrapMode,
								n = e.start.row == e.end.row ? e.end.row : 1 / 0;
							this.renderer.updateLines(e.start.row, n, t), this._signal("change", e), this.$cursorChange(), this.$updateHighlightActiveLine()
						}, this.onTokenizerUpdate = function (e) {
							var t = e.data;
							this.renderer.updateLines(t.first, t.last)
						}, this.onScrollTopChange = function () {
							this.renderer.scrollToY(this.session.getScrollTop())
						}, this.onScrollLeftChange = function () {
							this.renderer.scrollToX(this.session.getScrollLeft())
						}, this.onCursorChange = function () {
							this.$cursorChange(), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine(), this._signal("changeSelection")
						}, this.$updateHighlightActiveLine = function () {
							var e, t = this.getSession();
							if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (e = this.getCursorPosition()), this.renderer.theme && this.renderer.theme.$selectionColorConflict && !this.selection.isEmpty() && (e = !1), !this.renderer.$maxLines || 1 !== this.session.getLength() || this.renderer.$minLines > 1 || (e = !1)), t.$highlightLineMarker && !e) t.removeMarker(t.$highlightLineMarker.id), t.$highlightLineMarker = null;
							else if (!t.$highlightLineMarker && e) {
								var n = new p(e.row, e.column, e.row, 1 / 0);
								n.id = t.addMarker(n, "ace_active-line", "screenLine"), t.$highlightLineMarker = n
							} else e && (t.$highlightLineMarker.start.row = e.row, t.$highlightLineMarker.end.row = e.row, t.$highlightLineMarker.start.column = e.column, t._signal("changeBackMarker"))
						}, this.onSelectionChange = function (e) {
							var t = this.session;
							if (t.$selectionMarker && t.removeMarker(t.$selectionMarker), t.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();
							else {
								var n = this.selection.getRange(),
									i = this.getSelectionStyle();
								t.$selectionMarker = t.addMarker(n, "ace_selection", i)
							}
							var r = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
							this.session.highlight(r), this._signal("changeSelection")
						}, this.$getSelectionHighLightRegexp = function () {
							var e = this.session,
								t = this.getSelectionRange();
							if (!t.isEmpty() && !t.isMultiLine()) {
								var n = t.start.column,
									i = t.end.column,
									r = e.getLine(t.start.row),
									o = r.substring(n, i);
								if (!(o.length > 5e3) && /[\w\d]/.test(o)) {
									var s = this.$search.$assembleRegExp({
											wholeWord: !0,
											caseSensitive: !0,
											needle: o
										}),
										a = r.substring(n - 1, i + 1);
									if (s.test(a)) return s
								}
							}
						}, this.onChangeFrontMarker = function () {
							this.renderer.updateFrontMarkers()
						}, this.onChangeBackMarker = function () {
							this.renderer.updateBackMarkers()
						}, this.onChangeBreakpoint = function () {
							this.renderer.updateBreakpoints()
						}, this.onChangeAnnotation = function () {
							this.renderer.setAnnotations(this.session.getAnnotations())
						}, this.onChangeMode = function (e) {
							this.renderer.updateText(), this._emit("changeMode", e)
						}, this.onChangeWrapLimit = function () {
							this.renderer.updateFull()
						}, this.onChangeWrapMode = function () {
							this.renderer.onResize(!0)
						}, this.onChangeFold = function () {
							this.$updateHighlightActiveLine(), this.renderer.updateFull()
						}, this.getSelectedText = function () {
							return this.session.getTextRange(this.getSelectionRange())
						}, this.getCopyText = function () {
							var e = this.getSelectedText(),
								t = this.session.doc.getNewLineCharacter(),
								n = !1;
							if (!e && this.$copyWithEmptySelection) {
								n = !0;
								for (var i = this.selection.getAllRanges(), r = 0; r < i.length; r++) {
									var o = i[r];
									r && i[r - 1].start.row == o.start.row || (e += this.session.getLine(o.start.row) + t)
								}
							}
							var s = {
								text: e
							};
							return this._signal("copy", s), E.lineMode = n ? s.text : "", s.text
						}, this.onCopy = function () {
							this.commands.exec("copy", this)
						}, this.onCut = function () {
							this.commands.exec("cut", this)
						}, this.onPaste = function (e, t) {
							var n = {
								text: e,
								event: t
							};
							this.commands.exec("paste", this, n)
						}, this.$handlePaste = function (e) {
							"string" == typeof e && (e = {
								text: e
							}), this._signal("paste", e);
							var t = e.text,
								n = t == E.lineMode,
								i = this.session;
							if (!this.inMultiSelectMode || this.inVirtualSelectionMode) n ? i.insert({
								row: this.selection.lead.row,
								column: 0
							}, t) : this.insert(t);
							else if (n) this.selection.rangeList.ranges.forEach((function (e) {
								i.insert({
									row: e.start.row,
									column: 0
								}, t)
							}));
							else {
								var r = t.split(/\r\n|\r|\n/),
									o = this.selection.rangeList.ranges,
									s = !(2 != r.length || r[0] && r[1]);
								if (r.length != o.length || s) return this.commands.exec("insertstring", this, t);
								for (var a = o.length; a--;) {
									var c = o[a];
									c.isEmpty() || i.remove(c), i.insert(c.start, r[a])
								}
							}
						}, this.execCommand = function (e, t) {
							return this.commands.exec(e, this, t)
						}, this.insert = function (e, t) {
							var n = this.session,
								i = n.getMode(),
								r = this.getCursorPosition();
							if (this.getBehavioursEnabled() && !t) {
								var o = i.transformAction(n.getState(r.row), "insertion", this, n, e);
								o && (e !== o.text && (this.inVirtualSelectionMode || (this.session.mergeUndoDeltas = !1, this.mergeNextCommand = !1)), e = o.text)
							}
							if ("\t" == e && (e = this.session.getTabString()), this.selection.isEmpty()) {
								if (this.session.getOverwrite() && -1 == e.indexOf("\n")) {
									(s = new p.fromPoints(r, r)).end.column += e.length, this.session.remove(s)
								}
							} else {
								var s = this.getSelectionRange();
								r = this.session.remove(s), this.clearSelection()
							}
							if ("\n" == e || "\r\n" == e) {
								var a = n.getLine(r.row);
								if (r.column > a.search(/\S|$/)) {
									var c = a.substr(r.column).search(/\S|$/);
									n.doc.removeInLine(r.row, r.column, r.column + c)
								}
							}
							this.clearSelection();
							var l = r.column,
								u = n.getState(r.row),
								h = (a = n.getLine(r.row), i.checkOutdent(u, a, e));
							if (n.insert(r, e), o && o.selection && (2 == o.selection.length ? this.selection.setSelectionRange(new p(r.row, l + o.selection[0], r.row, l + o.selection[1])) : this.selection.setSelectionRange(new p(r.row + o.selection[0], o.selection[1], r.row + o.selection[2], o.selection[3]))), n.getDocument().isNewLine(e)) {
								var d = i.getNextLineIndent(u, a.slice(0, r.column), n.getTabString());
								n.insert({
									row: r.row + 1,
									column: 0
								}, d)
							}
							h && i.autoOutdent(u, n, r.row)
						}, this.onTextInput = function (e, t) {
							if (!t) return this.keyBinding.onTextInput(e);
							this.startOperation({
								command: {
									name: "insertstring"
								}
							});
							var n = this.applyComposition.bind(this, e, t);
							this.selection.rangeCount ? this.forEachSelection(n) : n(), this.endOperation()
						}, this.applyComposition = function (e, t) {
							var n;
							(t.extendLeft || t.extendRight) && ((n = this.selection.getRange()).start.column -= t.extendLeft, n.end.column += t.extendRight, this.selection.setRange(n), e || n.isEmpty() || this.remove());
							(!e && this.selection.isEmpty() || this.insert(e, !0), t.restoreStart || t.restoreEnd) && ((n = this.selection.getRange()).start.column -= t.restoreStart, n.end.column -= t.restoreEnd, this.selection.setRange(n))
						}, this.onCommandKey = function (e, t, n) {
							return this.keyBinding.onCommandKey(e, t, n)
						}, this.setOverwrite = function (e) {
							this.session.setOverwrite(e)
						}, this.getOverwrite = function () {
							return this.session.getOverwrite()
						}, this.toggleOverwrite = function () {
							this.session.toggleOverwrite()
						}, this.setScrollSpeed = function (e) {
							this.setOption("scrollSpeed", e)
						}, this.getScrollSpeed = function () {
							return this.getOption("scrollSpeed")
						}, this.setDragDelay = function (e) {
							this.setOption("dragDelay", e)
						}, this.getDragDelay = function () {
							return this.getOption("dragDelay")
						}, this.setSelectionStyle = function (e) {
							this.setOption("selectionStyle", e)
						}, this.getSelectionStyle = function () {
							return this.getOption("selectionStyle")
						}, this.setHighlightActiveLine = function (e) {
							this.setOption("highlightActiveLine", e)
						}, this.getHighlightActiveLine = function () {
							return this.getOption("highlightActiveLine")
						}, this.setHighlightGutterLine = function (e) {
							this.setOption("highlightGutterLine", e)
						}, this.getHighlightGutterLine = function () {
							return this.getOption("highlightGutterLine")
						}, this.setHighlightSelectedWord = function (e) {
							this.setOption("highlightSelectedWord", e)
						}, this.getHighlightSelectedWord = function () {
							return this.$highlightSelectedWord
						}, this.setAnimatedScroll = function (e) {
							this.renderer.setAnimatedScroll(e)
						}, this.getAnimatedScroll = function () {
							return this.renderer.getAnimatedScroll()
						}, this.setShowInvisibles = function (e) {
							this.renderer.setShowInvisibles(e)
						}, this.getShowInvisibles = function () {
							return this.renderer.getShowInvisibles()
						}, this.setDisplayIndentGuides = function (e) {
							this.renderer.setDisplayIndentGuides(e)
						}, this.getDisplayIndentGuides = function () {
							return this.renderer.getDisplayIndentGuides()
						}, this.setShowPrintMargin = function (e) {
							this.renderer.setShowPrintMargin(e)
						}, this.getShowPrintMargin = function () {
							return this.renderer.getShowPrintMargin()
						}, this.setPrintMarginColumn = function (e) {
							this.renderer.setPrintMarginColumn(e)
						}, this.getPrintMarginColumn = function () {
							return this.renderer.getPrintMarginColumn()
						}, this.setReadOnly = function (e) {
							this.setOption("readOnly", e)
						}, this.getReadOnly = function () {
							return this.getOption("readOnly")
						}, this.setBehavioursEnabled = function (e) {
							this.setOption("behavioursEnabled", e)
						}, this.getBehavioursEnabled = function () {
							return this.getOption("behavioursEnabled")
						}, this.setWrapBehavioursEnabled = function (e) {
							this.setOption("wrapBehavioursEnabled", e)
						}, this.getWrapBehavioursEnabled = function () {
							return this.getOption("wrapBehavioursEnabled")
						}, this.setShowFoldWidgets = function (e) {
							this.setOption("showFoldWidgets", e)
						}, this.getShowFoldWidgets = function () {
							return this.getOption("showFoldWidgets")
						}, this.setFadeFoldWidgets = function (e) {
							this.setOption("fadeFoldWidgets", e)
						}, this.getFadeFoldWidgets = function () {
							return this.getOption("fadeFoldWidgets")
						}, this.remove = function (e) {
							this.selection.isEmpty() && ("left" == e ? this.selection.selectLeft() : this.selection.selectRight());
							var t = this.getSelectionRange();
							if (this.getBehavioursEnabled()) {
								var n = this.session,
									i = n.getState(t.start.row),
									r = n.getMode().transformAction(i, "deletion", this, n, t);
								if (0 === t.end.column) {
									var o = n.getTextRange(t);
									if ("\n" == o[o.length - 1]) {
										var s = n.getLine(t.end.row);
										/^\s+$/.test(s) && (t.end.column = s.length)
									}
								}
								r && (t = r)
							}
							this.session.remove(t), this.clearSelection()
						}, this.removeWordRight = function () {
							this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
						}, this.removeWordLeft = function () {
							this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
						}, this.removeToLineStart = function () {
							this.selection.isEmpty() && this.selection.selectLineStart(), this.selection.isEmpty() && this.selection.selectLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
						}, this.removeToLineEnd = function () {
							this.selection.isEmpty() && this.selection.selectLineEnd();
							var e = this.getSelectionRange();
							e.start.column == e.end.column && e.start.row == e.end.row && (e.end.column = 0, e.end.row++), this.session.remove(e), this.clearSelection()
						}, this.splitLine = function () {
							this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
							var e = this.getCursorPosition();
							this.insert("\n"), this.moveCursorToPosition(e)
						}, this.transposeLetters = function () {
							if (this.selection.isEmpty()) {
								var e = this.getCursorPosition(),
									t = e.column;
								if (0 !== t) {
									var n, i, r = this.session.getLine(e.row);
									t < r.length ? (n = r.charAt(t) + r.charAt(t - 1), i = new p(e.row, t - 1, e.row, t + 1)) : (n = r.charAt(t - 1) + r.charAt(t - 2), i = new p(e.row, t - 2, e.row, t)), this.session.replace(i, n), this.session.selection.moveToPosition(i.end)
								}
							}
						}, this.toLowerCase = function () {
							var e = this.getSelectionRange();
							this.selection.isEmpty() && this.selection.selectWord();
							var t = this.getSelectionRange(),
								n = this.session.getTextRange(t);
							this.session.replace(t, n.toLowerCase()), this.selection.setSelectionRange(e)
						}, this.toUpperCase = function () {
							var e = this.getSelectionRange();
							this.selection.isEmpty() && this.selection.selectWord();
							var t = this.getSelectionRange(),
								n = this.session.getTextRange(t);
							this.session.replace(t, n.toUpperCase()), this.selection.setSelectionRange(e)
						}, this.indent = function () {
							var e = this.session,
								t = this.getSelectionRange();
							if (!(t.start.row < t.end.row)) {
								if (t.start.column < t.end.column) {
									var n = e.getTextRange(t);
									if (!/^\s+$/.test(n)) {
										u = this.$getSelectedRows();
										return void e.indentRows(u.first, u.last, "\t")
									}
								}
								var i = e.getLine(t.start.row),
									r = t.start,
									s = e.getTabSize(),
									a = e.documentToScreenColumn(r.row, r.column);
								if (this.session.getUseSoftTabs()) var c = s - a % s,
									l = o.stringRepeat(" ", c);
								else {
									for (c = a % s;
										" " == i[t.start.column - 1] && c;) t.start.column--, c--;
									this.selection.setSelectionRange(t), l = "\t"
								}
								return this.insert(l)
							}
							var u = this.$getSelectedRows();
							e.indentRows(u.first, u.last, "\t")
						}, this.blockIndent = function () {
							var e = this.$getSelectedRows();
							this.session.indentRows(e.first, e.last, "\t")
						}, this.blockOutdent = function () {
							var e = this.session.getSelection();
							this.session.outdentRows(e.getRange())
						}, this.sortLines = function () {
							for (var e = this.$getSelectedRows(), t = this.session, n = [], i = e.first; i <= e.last; i++) n.push(t.getLine(i));
							n.sort((function (e, t) {
								return e.toLowerCase() < t.toLowerCase() ? -1 : e.toLowerCase() > t.toLowerCase() ? 1 : 0
							}));
							var r = new p(0, 0, 0, 0);
							for (i = e.first; i <= e.last; i++) {
								var o = t.getLine(i);
								r.start.row = i, r.end.row = i, r.end.column = o.length, t.replace(r, n[i - e.first])
							}
						}, this.toggleCommentLines = function () {
							var e = this.session.getState(this.getCursorPosition().row),
								t = this.$getSelectedRows();
							this.session.getMode().toggleCommentLines(e, this.session, t.first, t.last)
						}, this.toggleBlockComment = function () {
							var e = this.getCursorPosition(),
								t = this.session.getState(e.row),
								n = this.getSelectionRange();
							this.session.getMode().toggleBlockComment(t, this.session, n, e)
						}, this.getNumberAt = function (e, t) {
							var n = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
							n.lastIndex = 0;
							for (var i = this.session.getLine(e); n.lastIndex < t;) {
								var r = n.exec(i);
								if (r.index <= t && r.index + r[0].length >= t) return {
									value: r[0],
									start: r.index,
									end: r.index + r[0].length
								}
							}
							return null
						}, this.modifyNumber = function (e) {
							var t = this.selection.getCursor().row,
								n = this.selection.getCursor().column,
								i = new p(t, n - 1, t, n),
								r = this.session.getTextRange(i);
							if (!isNaN(parseFloat(r)) && isFinite(r)) {
								var o = this.getNumberAt(t, n);
								if (o) {
									var s = o.value.indexOf(".") >= 0 ? o.start + o.value.indexOf(".") + 1 : o.end,
										a = o.start + o.value.length - s,
										c = parseFloat(o.value);
									c *= Math.pow(10, a), s !== o.end && n < s ? e *= Math.pow(10, o.end - n - 1) : e *= Math.pow(10, o.end - n), c += e;
									var l = (c /= Math.pow(10, a)).toFixed(a),
										u = new p(t, o.start, t, o.end);
									this.session.replace(u, l), this.moveCursorTo(t, Math.max(o.start + 1, n + l.length - o.value.length))
								}
							} else this.toggleWord()
						}, this.$toggleWordPairs = [
							["first", "last"],
							["true", "false"],
							["yes", "no"],
							["width", "height"],
							["top", "bottom"],
							["right", "left"],
							["on", "off"],
							["x", "y"],
							["get", "set"],
							["max", "min"],
							["horizontal", "vertical"],
							["show", "hide"],
							["add", "remove"],
							["up", "down"],
							["before", "after"],
							["even", "odd"],
							["in", "out"],
							["inside", "outside"],
							["next", "previous"],
							["increase", "decrease"],
							["attach", "detach"],
							["&&", "||"],
							["==", "!="]
						], this.toggleWord = function () {
							var e = this.selection.getCursor().row,
								t = this.selection.getCursor().column;
							this.selection.selectWord();
							var n = this.getSelectedText(),
								i = this.selection.getWordRange().start.column,
								r = n.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ").split(/\s/),
								s = t - i - 1;
							s < 0 && (s = 0);
							var a = 0,
								c = 0,
								l = this;
							n.match(/[A-Za-z0-9_]+/) && r.forEach((function (t, r) {
								c = a + t.length, s >= a && s <= c && (n = t, l.selection.clearSelection(), l.moveCursorTo(e, a + i), l.selection.selectTo(e, c + i)), a = c
							}));
							for (var u, h = this.$toggleWordPairs, d = 0; d < h.length; d++)
								for (var p = h[d], m = 0; m <= 1; m++) {
									var f = +!m,
										g = n.match(new RegExp("^\\s?_?(" + o.escapeRegExp(p[m]) + ")\\s?$", "i"));
									if (g) n.match(new RegExp("([_]|^|\\s)(" + o.escapeRegExp(g[1]) + ")($|\\s)", "g")) && (u = n.replace(new RegExp(o.escapeRegExp(p[m]), "i"), (function (e) {
										var t = p[f];
										return e.toUpperCase() == e ? t = t.toUpperCase() : e.charAt(0).toUpperCase() == e.charAt(0) && (t = t.substr(0, 0) + p[f].charAt(0).toUpperCase() + t.substr(1)), t
									})), this.insert(u), u = "")
								}
						}, this.removeLines = function () {
							var e = this.$getSelectedRows();
							this.session.removeFullLines(e.first, e.last), this.clearSelection()
						}, this.duplicateSelection = function () {
							var e = this.selection,
								t = this.session,
								n = e.getRange(),
								i = e.isBackwards();
							if (n.isEmpty()) {
								var r = n.start.row;
								t.duplicateLines(r, r)
							} else {
								var o = i ? n.start : n.end,
									s = t.insert(o, t.getTextRange(n), !1);
								n.start = o, n.end = s, e.setSelectionRange(n, i)
							}
						}, this.moveLinesDown = function () {
							this.$moveLines(1, !1)
						}, this.moveLinesUp = function () {
							this.$moveLines(-1, !1)
						}, this.moveText = function (e, t, n) {
							return this.session.moveText(e, t, n)
						}, this.copyLinesUp = function () {
							this.$moveLines(-1, !0)
						}, this.copyLinesDown = function () {
							this.$moveLines(1, !0)
						}, this.$moveLines = function (e, t) {
							var n, i, r = this.selection;
							if (!r.inMultiSelectMode || this.inVirtualSelectionMode) {
								var o = r.toOrientedRange();
								n = this.$getSelectedRows(o), i = this.session.$moveLines(n.first, n.last, t ? 0 : e), t && -1 == e && (i = 0), o.moveBy(i, 0), r.fromOrientedRange(o)
							} else {
								var s = r.rangeList.ranges;
								r.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
								for (var a = 0, c = 0, l = s.length, u = 0; u < l; u++) {
									var h = u;
									s[u].moveBy(a, 0);
									for (var d = (n = this.$getSelectedRows(s[u])).first, p = n.last; ++u < l;) {
										c && s[u].moveBy(c, 0);
										var m = this.$getSelectedRows(s[u]);
										if (t && m.first != p) break;
										if (!t && m.first > p + 1) break;
										p = m.last
									}
									for (u--, a = this.session.$moveLines(d, p, t ? 0 : e), t && -1 == e && (h = u + 1); h <= u;) s[h].moveBy(a, 0), h++;
									t || (a = 0), c += a
								}
								r.fromOrientedRange(r.ranges[0]), r.rangeList.attach(this.session), this.inVirtualSelectionMode = !1
							}
						}, this.$getSelectedRows = function (e) {
							return e = (e || this.getSelectionRange()).collapseRows(), {
								first: this.session.getRowFoldStart(e.start.row),
								last: this.session.getRowFoldEnd(e.end.row)
							}
						}, this.onCompositionStart = function (e) {
							this.renderer.showComposition(e)
						}, this.onCompositionUpdate = function (e) {
							this.renderer.setCompositionText(e)
						}, this.onCompositionEnd = function () {
							this.renderer.hideComposition()
						}, this.getFirstVisibleRow = function () {
							return this.renderer.getFirstVisibleRow()
						}, this.getLastVisibleRow = function () {
							return this.renderer.getLastVisibleRow()
						}, this.isRowVisible = function (e) {
							return e >= this.getFirstVisibleRow() && e <= this.getLastVisibleRow()
						}, this.isRowFullyVisible = function (e) {
							return e >= this.renderer.getFirstFullyVisibleRow() && e <= this.renderer.getLastFullyVisibleRow()
						}, this.$getVisibleRowCount = function () {
							return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
						}, this.$moveByPage = function (e, t) {
							var n = this.renderer,
								i = this.renderer.layerConfig,
								r = e * Math.floor(i.height / i.lineHeight);
							!0 === t ? this.selection.$moveSelection((function () {
								this.moveCursorBy(r, 0)
							})) : !1 === t && (this.selection.moveCursorBy(r, 0), this.selection.clearSelection());
							var o = n.scrollTop;
							n.scrollBy(0, r * i.lineHeight), null != t && n.scrollCursorIntoView(null, .5), n.animateScrolling(o)
						}, this.selectPageDown = function () {
							this.$moveByPage(1, !0)
						}, this.selectPageUp = function () {
							this.$moveByPage(-1, !0)
						}, this.gotoPageDown = function () {
							this.$moveByPage(1, !1)
						}, this.gotoPageUp = function () {
							this.$moveByPage(-1, !1)
						}, this.scrollPageDown = function () {
							this.$moveByPage(1)
						}, this.scrollPageUp = function () {
							this.$moveByPage(-1)
						}, this.scrollToRow = function (e) {
							this.renderer.scrollToRow(e)
						}, this.scrollToLine = function (e, t, n, i) {
							this.renderer.scrollToLine(e, t, n, i)
						}, this.centerSelection = function () {
							var e = this.getSelectionRange(),
								t = {
									row: Math.floor(e.start.row + (e.end.row - e.start.row) / 2),
									column: Math.floor(e.start.column + (e.end.column - e.start.column) / 2)
								};
							this.renderer.alignCursor(t, .5)
						}, this.getCursorPosition = function () {
							return this.selection.getCursor()
						}, this.getCursorPositionScreen = function () {
							return this.session.documentToScreenPosition(this.getCursorPosition())
						}, this.getSelectionRange = function () {
							return this.selection.getRange()
						}, this.selectAll = function () {
							this.selection.selectAll()
						}, this.clearSelection = function () {
							this.selection.clearSelection()
						}, this.moveCursorTo = function (e, t) {
							this.selection.moveCursorTo(e, t)
						}, this.moveCursorToPosition = function (e) {
							this.selection.moveCursorToPosition(e)
						}, this.jumpToMatching = function (e, t) {
							var n = this.getCursorPosition(),
								i = new _(this.session, n.row, n.column),
								r = i.getCurrentToken(),
								o = r || i.stepForward();
							if (o) {
								var s, a, c = !1,
									l = {},
									u = n.column - o.start,
									h = {
										")": "(",
										"(": "(",
										"]": "[",
										"[": "[",
										"{": "{",
										"}": "{"
									};
								do {
									if (o.value.match(/[{}()\[\]]/g)) {
										for (; u < o.value.length && !c; u++)
											if (h[o.value[u]]) switch (a = h[o.value[u]] + "." + o.type.replace("rparen", "lparen"), isNaN(l[a]) && (l[a] = 0), o.value[u]) {
												case "(":
												case "[":
												case "{":
													l[a]++;
													break;
												case ")":
												case "]":
												case "}":
													l[a]--, -1 === l[a] && (s = "bracket", c = !0)
											}
									} else -1 !== o.type.indexOf("tag-name") && (isNaN(l[o.value]) && (l[o.value] = 0), "<" === r.value ? l[o.value]++ : "</" === r.value && l[o.value]--, -1 === l[o.value] && (s = "tag", c = !0));
									c || (r = o, o = i.stepForward(), u = 0)
								} while (o && !c);
								if (s) {
									var d, m;
									if ("bracket" === s)(d = this.session.getBracketRange(n)) || (m = (d = new p(i.getCurrentTokenRow(), i.getCurrentTokenColumn() + u - 1, i.getCurrentTokenRow(), i.getCurrentTokenColumn() + u - 1)).start, (t || m.row === n.row && Math.abs(m.column - n.column) < 2) && (d = this.session.getBracketRange(m)));
									else if ("tag" === s) {
										if (!o || -1 === o.type.indexOf("tag-name")) return;
										var f = o.value;
										if (0 === (d = new p(i.getCurrentTokenRow(), i.getCurrentTokenColumn() - 2, i.getCurrentTokenRow(), i.getCurrentTokenColumn() - 2)).compare(n.row, n.column)) {
											c = !1;
											do {
												o = r, (r = i.stepBackward()) && (-1 !== r.type.indexOf("tag-close") && d.setEnd(i.getCurrentTokenRow(), i.getCurrentTokenColumn() + 1), o.value === f && -1 !== o.type.indexOf("tag-name") && ("<" === r.value ? l[f]++ : "</" === r.value && l[f]--, 0 === l[f] && (c = !0)))
											} while (r && !c)
										}
										o && o.type.indexOf("tag-name") && (m = d.start).row == n.row && Math.abs(m.column - n.column) < 2 && (m = d.end)
									}(m = d && d.cursor || m) && (e ? d && t ? this.selection.setRange(d) : d && d.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(m.row, m.column) : this.selection.moveTo(m.row, m.column))
								}
							}
						}, this.gotoLine = function (e, t, n) {
							this.selection.clearSelection(), this.session.unfold({
								row: e - 1,
								column: t || 0
							}), this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(e - 1, t || 0), this.isRowFullyVisible(e - 1) || this.scrollToLine(e - 1, !0, n)
						}, this.navigateTo = function (e, t) {
							this.selection.moveTo(e, t)
						}, this.navigateUp = function (e) {
							if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
								var t = this.selection.anchor.getPosition();
								return this.moveCursorToPosition(t)
							}
							this.selection.clearSelection(), this.selection.moveCursorBy(-e || -1, 0)
						}, this.navigateDown = function (e) {
							if (this.selection.isMultiLine() && this.selection.isBackwards()) {
								var t = this.selection.anchor.getPosition();
								return this.moveCursorToPosition(t)
							}
							this.selection.clearSelection(), this.selection.moveCursorBy(e || 1, 0)
						}, this.navigateLeft = function (e) {
							if (this.selection.isEmpty())
								for (e = e || 1; e--;) this.selection.moveCursorLeft();
							else {
								var t = this.getSelectionRange().start;
								this.moveCursorToPosition(t)
							}
							this.clearSelection()
						}, this.navigateRight = function (e) {
							if (this.selection.isEmpty())
								for (e = e || 1; e--;) this.selection.moveCursorRight();
							else {
								var t = this.getSelectionRange().end;
								this.moveCursorToPosition(t)
							}
							this.clearSelection()
						}, this.navigateLineStart = function () {
							this.selection.moveCursorLineStart(), this.clearSelection()
						}, this.navigateLineEnd = function () {
							this.selection.moveCursorLineEnd(), this.clearSelection()
						}, this.navigateFileEnd = function () {
							this.selection.moveCursorFileEnd(), this.clearSelection()
						}, this.navigateFileStart = function () {
							this.selection.moveCursorFileStart(), this.clearSelection()
						}, this.navigateWordRight = function () {
							this.selection.moveCursorWordRight(), this.clearSelection()
						}, this.navigateWordLeft = function () {
							this.selection.moveCursorWordLeft(), this.clearSelection()
						}, this.replace = function (e, t) {
							t && this.$search.set(t);
							var n = this.$search.find(this.session),
								i = 0;
							return n ? (this.$tryReplace(n, e) && (i = 1), this.selection.setSelectionRange(n), this.renderer.scrollSelectionIntoView(n.start, n.end), i) : i
						}, this.replaceAll = function (e, t) {
							t && this.$search.set(t);
							var n = this.$search.findAll(this.session),
								i = 0;
							if (!n.length) return i;
							var r = this.getSelectionRange();
							this.selection.moveTo(0, 0);
							for (var o = n.length - 1; o >= 0; --o) this.$tryReplace(n[o], e) && i++;
							return this.selection.setSelectionRange(r), i
						}, this.$tryReplace = function (e, t) {
							var n = this.session.getTextRange(e);
							return null !== (t = this.$search.replace(n, t)) ? (e.end = this.session.replace(e, t), e) : null
						}, this.getLastSearchOptions = function () {
							return this.$search.getOptions()
						}, this.find = function (e, t, n) {
							t || (t = {}), "string" == typeof e || e instanceof RegExp ? t.needle = e : "object" == typeof e && i.mixin(t, e);
							var r = this.selection.getRange();
							null == t.needle && ((e = this.session.getTextRange(r) || this.$search.$options.needle) || (r = this.session.getWordRange(r.start.row, r.start.column), e = this.session.getTextRange(r)), this.$search.set({
								needle: e
							})), this.$search.set(t), t.start || this.$search.set({
								start: r
							});
							var o = this.$search.find(this.session);
							return t.preventScroll ? o : o ? (this.revealRange(o, n), o) : (t.backwards ? r.start = r.end : r.end = r.start, void this.selection.setRange(r))
						}, this.findNext = function (e, t) {
							this.find({
								skipCurrent: !0,
								backwards: !1
							}, e, t)
						}, this.findPrevious = function (e, t) {
							this.find(e, {
								skipCurrent: !0,
								backwards: !0
							}, t)
						}, this.revealRange = function (e, t) {
							this.session.unfold(e), this.selection.setSelectionRange(e);
							var n = this.renderer.scrollTop;
							this.renderer.scrollSelectionIntoView(e.start, e.end, .5), !1 !== t && this.renderer.animateScrolling(n)
						}, this.undo = function () {
							this.session.getUndoManager().undo(this.session), this.renderer.scrollCursorIntoView(null, .5)
						}, this.redo = function () {
							this.session.getUndoManager().redo(this.session), this.renderer.scrollCursorIntoView(null, .5)
						}, this.destroy = function () {
							this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy()
						}, this.setAutoScrollEditorIntoView = function (e) {
							if (e) {
								var t, n = this,
									i = !1;
								this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
								var r = this.$scrollAnchor;
								r.style.cssText = "position:absolute", this.container.insertBefore(r, this.container.firstChild);
								var o = this.on("changeSelection", (function () {
										i = !0
									})),
									s = this.renderer.on("beforeRender", (function () {
										i && (t = n.renderer.container.getBoundingClientRect())
									})),
									a = this.renderer.on("afterRender", (function () {
										if (i && t && (n.isFocused() || n.searchBox && n.searchBox.isFocused())) {
											var e = n.renderer,
												o = e.$cursorLayer.$pixelPos,
												s = e.layerConfig,
												a = o.top - s.offset;
											null != (i = o.top >= 0 && a + t.top < 0 || !(o.top < s.height && o.top + t.top + s.lineHeight > window.innerHeight) && null) && (r.style.top = a + "px", r.style.left = o.left + "px", r.style.height = s.lineHeight + "px", r.scrollIntoView(i)), i = t = null
										}
									}));
								this.setAutoScrollEditorIntoView = function (e) {
									e || (delete this.setAutoScrollEditorIntoView, this.off("changeSelection", o), this.renderer.off("afterRender", a), this.renderer.off("beforeRender", s))
								}
							}
						}, this.$resetCursorStyle = function () {
							var e = this.$cursorStyle || "ace",
								t = this.renderer.$cursorLayer;
							t && (t.setSmoothBlinking(/smooth/.test(e)), t.isBlinking = !this.$readOnly && "wide" != e, r.setCssClass(t.element, "ace_slim-cursors", /slim/.test(e)))
						}, this.prompt = function (e, t, n) {
							var i = this;
							v.loadModule("./ext/prompt", (function (r) {
								r.prompt(i, e, t, n)
							}))
						}
					}.call(C.prototype), v.defineOptions(C.prototype, "editor", {
						selectionStyle: {
							set: function (e) {
								this.onSelectionChange(), this._signal("changeSelectionStyle", {
									data: e
								})
							},
							initialValue: "line"
						},
						highlightActiveLine: {
							set: function () {
								this.$updateHighlightActiveLine()
							},
							initialValue: !0
						},
						highlightSelectedWord: {
							set: function (e) {
								this.$onSelectionChange()
							},
							initialValue: !0
						},
						readOnly: {
							set: function (e) {
								this.textInput.setReadOnly(e), this.$resetCursorStyle()
							},
							initialValue: !1
						},
						copyWithEmptySelection: {
							set: function (e) {
								this.textInput.setCopyWithEmptySelection(e)
							},
							initialValue: !1
						},
						cursorStyle: {
							set: function (e) {
								this.$resetCursorStyle()
							},
							values: ["ace", "slim", "smooth", "wide"],
							initialValue: "ace"
						},
						mergeUndoDeltas: {
							values: [!1, !0, "always"],
							initialValue: !0
						},
						behavioursEnabled: {
							initialValue: !0
						},
						wrapBehavioursEnabled: {
							initialValue: !0
						},
						autoScrollEditorIntoView: {
							set: function (e) {
								this.setAutoScrollEditorIntoView(e)
							}
						},
						keyboardHandler: {
							set: function (e) {
								this.setKeyboardHandler(e)
							},
							get: function () {
								return this.$keybindingId
							},
							handlesSet: !0
						},
						value: {
							set: function (e) {
								this.session.setValue(e)
							},
							get: function () {
								return this.getValue()
							},
							handlesSet: !0,
							hidden: !0
						},
						session: {
							set: function (e) {
								this.setSession(e)
							},
							get: function () {
								return this.session
							},
							handlesSet: !0,
							hidden: !0
						},
						showLineNumbers: {
							set: function (e) {
								this.renderer.$gutterLayer.setShowLineNumbers(e), this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER), e && this.$relativeLineNumbers ? A.attach(this) : A.detach(this)
							},
							initialValue: !0
						},
						relativeLineNumbers: {
							set: function (e) {
								this.$showLineNumbers && e ? A.attach(this) : A.detach(this)
							}
						},
						placeholder: {
							set: function (e) {
								this.$updatePlaceholder || (this.$updatePlaceholder = function () {
									var e = this.renderer.$composition || this.getValue();
									if (e && this.renderer.placeholderNode) this.renderer.off("afterRender", this.$updatePlaceholder), r.removeCssClass(this.container, "ace_hasPlaceholder"), this.renderer.placeholderNode.remove(), this.renderer.placeholderNode = null;
									else if (!e && !this.renderer.placeholderNode) {
										this.renderer.on("afterRender", this.$updatePlaceholder), r.addCssClass(this.container, "ace_hasPlaceholder");
										var t = r.createElement("div");
										t.className = "ace_placeholder", t.textContent = this.$placeholder || "", this.renderer.placeholderNode = t, this.renderer.content.appendChild(this.renderer.placeholderNode)
									}
								}.bind(this), this.on("input", this.$updatePlaceholder)), this.$updatePlaceholder()
							}
						},
						hScrollBarAlwaysVisible: "renderer",
						vScrollBarAlwaysVisible: "renderer",
						highlightGutterLine: "renderer",
						animatedScroll: "renderer",
						showInvisibles: "renderer",
						showPrintMargin: "renderer",
						printMarginColumn: "renderer",
						printMargin: "renderer",
						fadeFoldWidgets: "renderer",
						showFoldWidgets: "renderer",
						displayIndentGuides: "renderer",
						showGutter: "renderer",
						fontSize: "renderer",
						fontFamily: "renderer",
						maxLines: "renderer",
						minLines: "renderer",
						scrollPastEnd: "renderer",
						fixedWidthGutter: "renderer",
						theme: "renderer",
						hasCssTransforms: "renderer",
						maxPixelHeight: "renderer",
						useTextareaForIME: "renderer",
						scrollSpeed: "$mouseHandler",
						dragDelay: "$mouseHandler",
						dragEnabled: "$mouseHandler",
						focusTimeout: "$mouseHandler",
						tooltipFollowsMouse: "$mouseHandler",
						firstLineNumber: "session",
						overwrite: "session",
						newLineMode: "session",
						useWorker: "session",
						useSoftTabs: "session",
						navigateWithinSoftTabs: "session",
						tabSize: "session",
						wrap: "session",
						indentedSoftWrap: "session",
						foldStyle: "session",
						mode: "session"
					});
				var A = {
					getText: function (e, t) {
						return (Math.abs(e.selection.lead.row - t) || t + 1 + (t < 9 ? "·" : "")) + ""
					},
					getWidth: function (e, t, n) {
						return Math.max(t.toString().length, (n.lastRow + 1).toString().length, 2) * n.characterWidth
					},
					update: function (e, t) {
						t.renderer.$loop.schedule(t.renderer.CHANGE_GUTTER)
					},
					attach: function (e) {
						e.renderer.$gutterLayer.$renderer = this, e.on("changeSelection", this.update), this.update(null, e)
					},
					detach: function (e) {
						e.renderer.$gutterLayer.$renderer == this && (e.renderer.$gutterLayer.$renderer = null), e.off("changeSelection", this.update), this.update(null, e)
					}
				};
				t.Editor = C
			})), ace.define("ace/undomanager", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = function () {
					this.$maxRev = 0, this.$fromUndo = !1, this.reset()
				};
				(function () {
					this.addSession = function (e) {
						this.$session = e
					}, this.add = function (e, t, n) {
						this.$fromUndo || e != this.$lastDelta && (!1 !== t && this.lastDeltas || (this.lastDeltas = [], this.$undoStack.push(this.lastDeltas), e.id = this.$rev = ++this.$maxRev), "remove" != e.action && "insert" != e.action || (this.$lastDelta = e), this.lastDeltas.push(e))
					}, this.addSelection = function (e, t) {
						this.selections.push({
							value: e,
							rev: t || this.$rev
						})
					}, this.startNewGroup = function () {
						return this.lastDeltas = null, this.$rev
					}, this.markIgnored = function (e, t) {
						null == t && (t = this.$rev + 1);
						for (var n = this.$undoStack, i = n.length; i--;) {
							var r = n[i][0];
							if (r.id <= e) break;
							r.id < t && (r.ignore = !0)
						}
						this.lastDeltas = null
					}, this.getSelection = function (e, t) {
						for (var n = this.selections, i = n.length; i--;) {
							var r = n[i];
							if (r.rev < e) return t && (r = n[i + 1]), r
						}
					}, this.getRevision = function () {
						return this.$rev
					}, this.getDeltas = function (e, t) {
						null == t && (t = this.$rev + 1);
						for (var n = this.$undoStack, i = null, r = 0, o = n.length; o--;) {
							var s = n[o][0];
							if (s.id < t && !i && (i = o + 1), s.id <= e) {
								r = o + 1;
								break
							}
						}
						return n.slice(r, i)
					}, this.getChangedRanges = function (e, t) {
						null == t && (t = this.$rev + 1)
					}, this.getChangedLines = function (e, t) {
						null == t && (t = this.$rev + 1)
					}, this.undo = function (e, t) {
						this.lastDeltas = null;
						var n = this.$undoStack;
						if (function (e, t) {
								for (var n = t; n--;) {
									var i = e[n];
									if (i && !i[0].ignore) {
										for (; n < t - 1;) {
											var r = u(e[n], e[n + 1]);
											e[n] = r[0], e[n + 1] = r[1], n++
										}
										return !0
									}
								}
							}(n, n.length)) {
							e || (e = this.$session), this.$redoStackBaseRev !== this.$rev && this.$redoStack.length && (this.$redoStack = []), this.$fromUndo = !0;
							var i = n.pop(),
								r = null;
							return i && i.length && (r = e.undoChanges(i, t), this.$redoStack.push(i), this.$syncRev()), this.$fromUndo = !1, r
						}
					}, this.redo = function (e, t) {
						if (this.lastDeltas = null, e || (e = this.$session), this.$fromUndo = !0, this.$redoStackBaseRev != this.$rev) {
							var n = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
							! function (e, t) {
								for (var n = 0; n < t.length; n++)
									for (var i = t[n], r = 0; r < i.length; r++) f(e, i[r])
							}(this.$redoStack, n), this.$redoStackBaseRev = this.$rev, this.$redoStack.forEach((function (e) {
								e[0].id = ++this.$maxRev
							}), this)
						}
						var i = this.$redoStack.pop(),
							r = null;
						return i && (r = e.redoChanges(i, t), this.$undoStack.push(i), this.$syncRev()), this.$fromUndo = !1, r
					}, this.$syncRev = function () {
						var e = this.$undoStack,
							t = e[e.length - 1],
							n = t && t[0].id || 0;
						this.$redoStackBaseRev = n, this.$rev = n
					}, this.reset = function () {
						this.lastDeltas = null, this.$lastDelta = null, this.$undoStack = [], this.$redoStack = [], this.$rev = 0, this.mark = 0, this.$redoStackBaseRev = this.$rev, this.selections = []
					}, this.canUndo = function () {
						return this.$undoStack.length > 0
					}, this.canRedo = function () {
						return this.$redoStack.length > 0
					}, this.bookmark = function (e) {
						null == e && (e = this.$rev), this.mark = e
					}, this.isAtBookmark = function () {
						return this.$rev === this.mark
					}, this.toJSON = function () {}, this.fromJSON = function () {}, this.hasUndo = this.canUndo, this.hasRedo = this.canRedo, this.isClean = this.isAtBookmark, this.markClean = this.bookmark, this.$prettyPrint = function (e) {
						return e ? a(e) : a(this.$undoStack) + "\n---\n" + a(this.$redoStack)
					}
				}).call(i.prototype);
				var r = e("./range").Range,
					o = r.comparePoints;
				r.comparePoints;

				function s(e) {
					return {
						row: e.row,
						column: e.column
					}
				}

				function a(e) {
					if (e = e || this, Array.isArray(e)) return e.map(a).join("\n");
					var t = "";
					return e.action ? (t = "insert" == e.action ? "+" : "-", t += "[" + e.lines + "]") : e.value && (t = Array.isArray(e.value) ? e.value.map(c).join("\n") : c(e.value)), e.start && (t += c(e)), (e.id || e.rev) && (t += "\t(" + (e.id || e.rev) + ")"), t
				}

				function c(e) {
					return e.start.row + ":" + e.start.column + "=>" + e.end.row + ":" + e.end.column
				}

				function l(e, t) {
					var n = "insert" == e.action,
						i = "insert" == t.action;
					if (n && i)
						if (o(t.start, e.end) >= 0) d(t, e, -1);
						else {
							if (!(o(t.start, e.start) <= 0)) return null;
							d(e, t, 1)
						}
					else if (n && !i)
						if (o(t.start, e.end) >= 0) d(t, e, -1);
						else {
							if (!(o(t.end, e.start) <= 0)) return null;
							d(e, t, -1)
						}
					else if (!n && i)
						if (o(t.start, e.start) >= 0) d(t, e, 1);
						else {
							if (!(o(t.start, e.start) <= 0)) return null;
							d(e, t, 1)
						}
					else if (!n && !i)
						if (o(t.start, e.start) >= 0) d(t, e, 1);
						else {
							if (!(o(t.end, e.start) <= 0)) return null;
							d(e, t, -1)
						} return [t, e]
				}

				function u(e, t) {
					for (var n = e.length; n--;)
						for (var i = 0; i < t.length; i++)
							if (!l(e[n], t[i])) {
								for (; n < e.length;) {
									for (; i--;) l(t[i], e[n]);
									i = t.length, n++
								}
								return [e, t]
							} return e.selectionBefore = t.selectionBefore = e.selectionAfter = t.selectionAfter = null, [t, e]
				}

				function h(e, t) {
					var n = "insert" == e.action,
						i = "insert" == t.action;
					if (n && i) o(e.start, t.start) < 0 ? d(t, e, 1) : d(e, t, 1);
					else if (n && !i) o(e.start, t.end) >= 0 ? d(e, t, -1) : o(e.start, t.start) <= 0 ? d(t, e, 1) : (d(e, r.fromPoints(t.start, e.start), -1), d(t, e, 1));
					else if (!n && i) o(t.start, e.end) >= 0 ? d(t, e, -1) : o(t.start, e.start) <= 0 ? d(e, t, 1) : (d(t, r.fromPoints(e.start, t.start), -1), d(e, t, 1));
					else if (!n && !i)
						if (o(t.start, e.end) >= 0) d(t, e, -1);
						else {
							var s, a;
							if (!(o(t.end, e.start) <= 0)) return o(e.start, t.start) < 0 && (s = e, e = m(e, t.start)), o(e.end, t.end) > 0 && (a = m(e, t.end)), p(t.end, e.start, e.end, -1), a && !s && (e.lines = a.lines, e.start = a.start, e.end = a.end, a = e), [t, s, a].filter(Boolean);
							d(e, t, -1)
						} return [t, e]
				}

				function d(e, t, n) {
					p(e.start, t.start, t.end, n), p(e.end, t.start, t.end, n)
				}

				function p(e, t, n, i) {
					e.row == (1 == i ? t : n).row && (e.column += i * (n.column - t.column)), e.row += i * (n.row - t.row)
				}

				function m(e, t) {
					var n = e.lines,
						i = e.end;
					e.end = s(t);
					var r = e.end.row - e.start.row,
						o = n.splice(r, n.length),
						a = r ? t.column : t.column - e.start.column;
					return n.push(o[0].substring(0, a)), o[0] = o[0].substr(a), {
						start: s(t),
						end: i,
						lines: o,
						action: e.action
					}
				}

				function f(e, t) {
					t = function (e) {
						return {
							start: s(e.start),
							end: s(e.end),
							action: e.action,
							lines: e.lines.slice()
						}
					}(t);
					for (var n = e.length; n--;) {
						for (var i = e[n], r = 0; r < i.length; r++) {
							var o = h(i[r], t);
							t = o[0], 2 != o.length && (o[2] ? (i.splice(r + 1, 1, o[1], o[2]), r++) : o[1] || (i.splice(r, 1), r--))
						}
						i.length || e.splice(n, 1)
					}
					return e
				}
				t.UndoManager = i
			})), ace.define("ace/layer/lines", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = function (e, t) {
						this.element = e, this.canvasHeight = t || 5e5, this.element.style.height = 2 * this.canvasHeight + "px", this.cells = [], this.cellCache = [], this.$offsetCoefficient = 0
					};
				(function () {
					this.moveContainer = function (e) {
						i.translate(this.element, 0, -e.firstRowScreen * e.lineHeight % this.canvasHeight - e.offset * this.$offsetCoefficient)
					}, this.pageChanged = function (e, t) {
						return Math.floor(e.firstRowScreen * e.lineHeight / this.canvasHeight) !== Math.floor(t.firstRowScreen * t.lineHeight / this.canvasHeight)
					}, this.computeLineTop = function (e, t, n) {
						var i = t.firstRowScreen * t.lineHeight,
							r = Math.floor(i / this.canvasHeight);
						return n.documentToScreenRow(e, 0) * t.lineHeight - r * this.canvasHeight
					}, this.computeLineHeight = function (e, t, n) {
						return t.lineHeight * n.getRowLength(e)
					}, this.getLength = function () {
						return this.cells.length
					}, this.get = function (e) {
						return this.cells[e]
					}, this.shift = function () {
						this.$cacheCell(this.cells.shift())
					}, this.pop = function () {
						this.$cacheCell(this.cells.pop())
					}, this.push = function (e) {
						if (Array.isArray(e)) {
							this.cells.push.apply(this.cells, e);
							for (var t = i.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
							this.element.appendChild(t)
						} else this.cells.push(e), this.element.appendChild(e.element)
					}, this.unshift = function (e) {
						if (Array.isArray(e)) {
							this.cells.unshift.apply(this.cells, e);
							for (var t = i.createFragment(this.element), n = 0; n < e.length; n++) t.appendChild(e[n].element);
							this.element.firstChild ? this.element.insertBefore(t, this.element.firstChild) : this.element.appendChild(t)
						} else this.cells.unshift(e), this.element.insertAdjacentElement("afterbegin", e.element)
					}, this.last = function () {
						return this.cells.length ? this.cells[this.cells.length - 1] : null
					}, this.$cacheCell = function (e) {
						e && (e.element.remove(), this.cellCache.push(e))
					}, this.createCell = function (e, t, n, r) {
						var o = this.cellCache.pop();
						if (!o) {
							var s = i.createElement("div");
							r && r(s), this.element.appendChild(s), o = {
								element: s,
								text: "",
								row: e
							}
						}
						return o.row = e, o
					}
				}).call(r.prototype), t.Lines = r
			})), ace.define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/layer/lines"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = e("../lib/oop"),
					o = e("../lib/lang"),
					s = e("../lib/event_emitter").EventEmitter,
					a = e("./lines").Lines,
					c = function (e) {
						this.element = i.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", e.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$lines = new a(this.element), this.$lines.$offsetCoefficient = 1
					};

				function l(e) {
					var t = document.createTextNode("");
					e.appendChild(t);
					var n = i.createElement("span");
					return e.appendChild(n), e
				}(function () {
					r.implement(this, s), this.setSession = function (e) {
						this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = e, e && e.on("change", this.$updateAnnotations)
					}, this.addGutterDecoration = function (e, t) {
						window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(e, t)
					}, this.removeGutterDecoration = function (e, t) {
						window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(e, t)
					}, this.setAnnotations = function (e) {
						this.$annotations = [];
						for (var t = 0; t < e.length; t++) {
							var n = e[t],
								i = n.row,
								r = this.$annotations[i];
							r || (r = this.$annotations[i] = {
								text: []
							});
							var s = n.text;
							s = s ? o.escapeHTML(s) : n.html || "", -1 === r.text.indexOf(s) && r.text.push(s);
							var a = n.type;
							"error" == a ? r.className = " ace_error" : "warning" == a && " ace_error" != r.className ? r.className = " ace_warning" : "info" != a || r.className || (r.className = " ace_info")
						}
					}, this.$updateAnnotations = function (e) {
						if (this.$annotations.length) {
							var t = e.start.row,
								n = e.end.row - t;
							if (0 === n);
							else if ("remove" == e.action) this.$annotations.splice(t, n + 1, null);
							else {
								var i = new Array(n + 1);
								i.unshift(t, 1), this.$annotations.splice.apply(this.$annotations, i)
							}
						}
					}, this.update = function (e) {
						this.config = e;
						var t = this.session,
							n = e.firstRow,
							i = Math.min(e.lastRow + e.gutterOffset, t.getLength() - 1);
						this.oldLastRow = i, this.config = e, this.$lines.moveContainer(e), this.$updateCursorRow();
						for (var r = t.getNextFoldLine(n), o = r ? r.start.row : 1 / 0, s = null, a = -1, c = n;;) {
							if (c > o && (c = r.end.row + 1, o = (r = t.getNextFoldLine(c, r)) ? r.start.row : 1 / 0), c > i) {
								for (; this.$lines.getLength() > a + 1;) this.$lines.pop();
								break
							}(s = this.$lines.get(++a)) ? s.row = c: (s = this.$lines.createCell(c, e, this.session, l), this.$lines.push(s)), this.$renderCell(s, e, r, c), c++
						}
						this._signal("afterRender"), this.$updateGutterWidth(e)
					}, this.$updateGutterWidth = function (e) {
						var t = this.session,
							n = t.gutterRenderer || this.$renderer,
							i = t.$firstLineNumber,
							r = this.$lines.last() ? this.$lines.last().text : "";
						(this.$fixedWidth || t.$useWrapMode) && (r = t.getLength() + i - 1);
						var o = n ? n.getWidth(t, r, e) : r.toString().length * e.characterWidth,
							s = this.$padding || this.$computePadding();
						(o += s.left + s.right) === this.gutterWidth || isNaN(o) || (this.gutterWidth = o, this.element.parentNode.style.width = this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._signal("changeGutterWidth", o))
					}, this.$updateCursorRow = function () {
						if (this.$highlightGutterLine) {
							var e = this.session.selection.getCursor();
							this.$cursorRow !== e.row && (this.$cursorRow = e.row)
						}
					}, this.updateLineHighlight = function () {
						if (this.$highlightGutterLine) {
							var e = this.session.selection.cursor.row;
							if (this.$cursorRow = e, !this.$cursorCell || this.$cursorCell.row != e) {
								this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", ""));
								var t = this.$lines.cells;
								this.$cursorCell = null;
								for (var n = 0; n < t.length; n++) {
									var i = t[n];
									if (i.row >= this.$cursorRow) {
										if (i.row > this.$cursorRow) {
											var r = this.session.getFoldLine(this.$cursorRow);
											if (!(n > 0 && r && r.start.row == t[n - 1].row)) break;
											i = t[n - 1]
										}
										i.element.className = "ace_gutter-active-line " + i.element.className, this.$cursorCell = i;
										break
									}
								}
							}
						}
					}, this.scrollLines = function (e) {
						var t = this.config;
						if (this.config = e, this.$updateCursorRow(), this.$lines.pageChanged(t, e)) return this.update(e);
						this.$lines.moveContainer(e);
						var n = Math.min(e.lastRow + e.gutterOffset, this.session.getLength() - 1),
							i = this.oldLastRow;
						if (this.oldLastRow = n, !t || i < e.firstRow) return this.update(e);
						if (n < t.firstRow) return this.update(e);
						if (t.firstRow < e.firstRow)
							for (var r = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); r > 0; r--) this.$lines.shift();
						if (i > n)
							for (r = this.session.getFoldedRowCount(n + 1, i); r > 0; r--) this.$lines.pop();
						e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLines(e, e.firstRow, t.firstRow - 1)), n > i && this.$lines.push(this.$renderLines(e, i + 1, n)), this.updateLineHighlight(), this._signal("afterRender"), this.$updateGutterWidth(e)
					}, this.$renderLines = function (e, t, n) {
						for (var i = [], r = t, o = this.session.getNextFoldLine(r), s = o ? o.start.row : 1 / 0; r > s && (r = o.end.row + 1, s = (o = this.session.getNextFoldLine(r, o)) ? o.start.row : 1 / 0), !(r > n);) {
							var a = this.$lines.createCell(r, e, this.session, l);
							this.$renderCell(a, e, o, r), i.push(a), r++
						}
						return i
					}, this.$renderCell = function (e, t, n, r) {
						var o = e.element,
							s = this.session,
							a = o.childNodes[0],
							c = o.childNodes[1],
							l = s.$firstLineNumber,
							u = s.$breakpoints,
							h = s.$decorations,
							d = s.gutterRenderer || this.$renderer,
							p = this.$showFoldWidgets && s.foldWidgets,
							m = n ? n.start.row : Number.MAX_VALUE,
							f = "ace_gutter-cell ";
						if (this.$highlightGutterLine && (r == this.$cursorRow || n && r < this.$cursorRow && r >= m && this.$cursorRow <= n.end.row) && (f += "ace_gutter-active-line ", this.$cursorCell != e && (this.$cursorCell && (this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "")), this.$cursorCell = e)), u[r] && (f += u[r]), h[r] && (f += h[r]), this.$annotations[r] && (f += this.$annotations[r].className), o.className != f && (o.className = f), p) {
							var g = p[r];
							null == g && (g = p[r] = s.getFoldWidget(r))
						}
						if (g) {
							f = "ace_fold-widget ace_" + g;
							"start" == g && r == m && r < n.end.row ? f += " ace_closed" : f += " ace_open", c.className != f && (c.className = f);
							var v = t.lineHeight + "px";
							i.setStyle(c.style, "height", v), i.setStyle(c.style, "display", "inline-block")
						} else c && i.setStyle(c.style, "display", "none");
						var _ = (d ? d.getText(s, r) : r + l).toString();
						return _ !== a.data && (a.data = _), i.setStyle(e.element.style, "height", this.$lines.computeLineHeight(r, t, s) + "px"), i.setStyle(e.element.style, "top", this.$lines.computeLineTop(r, t, s) + "px"), e.text = _, e
					}, this.$fixedWidth = !1, this.$highlightGutterLine = !0, this.$renderer = "", this.setHighlightGutterLine = function (e) {
						this.$highlightGutterLine = e
					}, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function (e) {
						this.$renderer = !e && {
							getWidth: function () {
								return 0
							},
							getText: function () {
								return ""
							}
						}
					}, this.getShowLineNumbers = function () {
						return this.$showLineNumbers
					}, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function (e) {
						e ? i.addCssClass(this.element, "ace_folding-enabled") : i.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = e, this.$padding = null
					}, this.getShowFoldWidgets = function () {
						return this.$showFoldWidgets
					}, this.$computePadding = function () {
						if (!this.element.firstChild) return {
							left: 0,
							right: 0
						};
						var e = i.computedStyle(this.element.firstChild);
						return this.$padding = {}, this.$padding.left = (parseInt(e.borderLeftWidth) || 0) + (parseInt(e.paddingLeft) || 0) + 1, this.$padding.right = (parseInt(e.borderRightWidth) || 0) + (parseInt(e.paddingRight) || 0), this.$padding
					}, this.getRegion = function (e) {
						var t = this.$padding || this.$computePadding(),
							n = this.element.getBoundingClientRect();
						return e.x < t.left + n.left ? "markers" : this.$showFoldWidgets && e.x > n.right - t.right ? "foldWidgets" : void 0
					}
				}).call(c.prototype), t.Gutter = c
			})), ace.define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("../range").Range,
					r = e("../lib/dom"),
					o = function (e) {
						this.element = r.createElement("div"), this.element.className = "ace_layer ace_marker-layer", e.appendChild(this.element)
					};
				(function () {
					this.$padding = 0, this.setPadding = function (e) {
						this.$padding = e
					}, this.setSession = function (e) {
						this.session = e
					}, this.setMarkers = function (e) {
						this.markers = e
					}, this.elt = function (e, t) {
						var n = -1 != this.i && this.element.childNodes[this.i];
						n ? this.i++ : (n = document.createElement("div"), this.element.appendChild(n), this.i = -1), n.style.cssText = t, n.className = e
					}, this.update = function (e) {
						if (e) {
							var t;
							for (var n in this.config = e, this.i = 0, this.markers) {
								var i = this.markers[n];
								if (i.range) {
									var r = i.range.clipRows(e.firstRow, e.lastRow);
									if (!r.isEmpty())
										if (r = r.toScreenRange(this.session), i.renderer) {
											var o = this.$getTop(r.start.row, e),
												s = this.$padding + r.start.column * e.characterWidth;
											i.renderer(t, r, s, o, e)
										} else "fullLine" == i.type ? this.drawFullLineMarker(t, r, i.clazz, e) : "screenLine" == i.type ? this.drawScreenLineMarker(t, r, i.clazz, e) : r.isMultiLine() ? "text" == i.type ? this.drawTextMarker(t, r, i.clazz, e) : this.drawMultiLineMarker(t, r, i.clazz, e) : this.drawSingleLineMarker(t, r, i.clazz + " ace_start ace_br15", e)
								} else i.update(t, this, this.session, e)
							}
							if (-1 != this.i)
								for (; this.i < this.element.childElementCount;) this.element.removeChild(this.element.lastChild)
						}
					}, this.$getTop = function (e, t) {
						return (e - t.firstRowScreen) * t.lineHeight
					}, this.drawTextMarker = function (e, t, n, r, o) {
						for (var s = this.session, a = t.start.row, c = t.end.row, l = a, u = 0, h = 0, d = s.getScreenLastRowColumn(l), p = new i(l, t.start.column, l, h); l <= c; l++) p.start.row = p.end.row = l, p.start.column = l == a ? t.start.column : s.getRowWrapIndent(l), p.end.column = d, u = h, h = d, d = l + 1 < c ? s.getScreenLastRowColumn(l + 1) : l == c ? 0 : t.end.column, this.drawSingleLineMarker(e, p, n + (l == a ? " ace_start" : "") + " ace_br" + ((l == a || l == a + 1 && t.start.column ? 1 : 0) | (u < h ? 2 : 0) | (h > d ? 4 : 0) | (l == c ? 8 : 0)), r, l == c ? 0 : 1, o)
					}, this.drawMultiLineMarker = function (e, t, n, i, r) {
						var o = this.$padding,
							s = i.lineHeight,
							a = this.$getTop(t.start.row, i),
							c = o + t.start.column * i.characterWidth;
						(r = r || "", this.session.$bidiHandler.isBidiRow(t.start.row)) ? ((l = t.clone()).end.row = l.start.row, l.end.column = this.session.getLine(l.start.row).length, this.drawBidiSingleLineMarker(e, l, n + " ace_br1 ace_start", i, null, r)) : this.elt(n + " ace_br1 ace_start", "height:" + s + "px;right:0;top:" + a + "px;left:" + c + "px;" + (r || ""));
						if (this.session.$bidiHandler.isBidiRow(t.end.row)) {
							var l;
							(l = t.clone()).start.row = l.end.row, l.start.column = 0, this.drawBidiSingleLineMarker(e, l, n + " ace_br12", i, null, r)
						} else {
							a = this.$getTop(t.end.row, i);
							var u = t.end.column * i.characterWidth;
							this.elt(n + " ace_br12", "height:" + s + "px;width:" + u + "px;top:" + a + "px;left:" + o + "px;" + (r || ""))
						}
						if (!((s = (t.end.row - t.start.row - 1) * i.lineHeight) <= 0)) {
							a = this.$getTop(t.start.row + 1, i);
							var h = (t.start.column ? 1 : 0) | (t.end.column ? 0 : 8);
							this.elt(n + (h ? " ace_br" + h : ""), "height:" + s + "px;right:0;top:" + a + "px;left:" + o + "px;" + (r || ""))
						}
					}, this.drawSingleLineMarker = function (e, t, n, i, r, o) {
						if (this.session.$bidiHandler.isBidiRow(t.start.row)) return this.drawBidiSingleLineMarker(e, t, n, i, r, o);
						var s = i.lineHeight,
							a = (t.end.column + (r || 0) - t.start.column) * i.characterWidth,
							c = this.$getTop(t.start.row, i),
							l = this.$padding + t.start.column * i.characterWidth;
						this.elt(n, "height:" + s + "px;width:" + a + "px;top:" + c + "px;left:" + l + "px;" + (o || ""))
					}, this.drawBidiSingleLineMarker = function (e, t, n, i, r, o) {
						var s = i.lineHeight,
							a = this.$getTop(t.start.row, i),
							c = this.$padding;
						this.session.$bidiHandler.getSelections(t.start.column, t.end.column).forEach((function (e) {
							this.elt(n, "height:" + s + "px;width:" + e.width + (r || 0) + "px;top:" + a + "px;left:" + (c + e.left) + "px;" + (o || ""))
						}), this)
					}, this.drawFullLineMarker = function (e, t, n, i, r) {
						var o = this.$getTop(t.start.row, i),
							s = i.lineHeight;
						t.start.row != t.end.row && (s += this.$getTop(t.end.row, i) - o), this.elt(n, "height:" + s + "px;top:" + o + "px;left:0;right:0;" + (r || ""))
					}, this.drawScreenLineMarker = function (e, t, n, i, r) {
						var o = this.$getTop(t.start.row, i),
							s = i.lineHeight;
						this.elt(n, "height:" + s + "px;top:" + o + "px;left:0;right:0;" + (r || ""))
					}
				}).call(o.prototype), t.Marker = o
			})), ace.define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/layer/lines", "ace/lib/event_emitter"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("../lib/dom"),
					o = e("../lib/lang"),
					s = e("./lines").Lines,
					a = e("../lib/event_emitter").EventEmitter,
					c = function (e) {
						this.dom = r, this.element = this.dom.createElement("div"), this.element.className = "ace_layer ace_text-layer", e.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this), this.$lines = new s(this.element)
					};
				(function () {
					i.implement(this, a), this.EOF_CHAR = "¶", this.EOL_CHAR_LF = "¬", this.EOL_CHAR_CRLF = "¤", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "—", this.SPACE_CHAR = "·", this.$padding = 0, this.MAX_LINE_LENGTH = 1e4, this.$updateEolChar = function () {
						var e = this.session.doc,
							t = "\n" == e.getNewLineCharacter() && "windows" != e.getNewLineMode() ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
						if (this.EOL_CHAR != t) return this.EOL_CHAR = t, !0
					}, this.setPadding = function (e) {
						this.$padding = e, this.element.style.margin = "0 " + e + "px"
					}, this.getLineHeight = function () {
						return this.$fontMetrics.$characterSize.height || 0
					}, this.getCharacterWidth = function () {
						return this.$fontMetrics.$characterSize.width || 0
					}, this.$setFontMetrics = function (e) {
						this.$fontMetrics = e, this.$fontMetrics.on("changeCharacterSize", function (e) {
							this._signal("changeCharacterSize", e)
						}.bind(this)), this.$pollSizeChanges()
					}, this.checkForSizeChanges = function () {
						this.$fontMetrics.checkForSizeChanges()
					}, this.$pollSizeChanges = function () {
						return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges()
					}, this.setSession = function (e) {
						this.session = e, e && this.$computeTabString()
					}, this.showInvisibles = !1, this.setShowInvisibles = function (e) {
						return this.showInvisibles != e && (this.showInvisibles = e, this.$computeTabString(), !0)
					}, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function (e) {
						return this.displayIndentGuides != e && (this.displayIndentGuides = e, this.$computeTabString(), !0)
					}, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function () {
						var e = this.session.getTabSize();
						this.tabSize = e;
						for (var t = this.$tabStrings = [0], n = 1; n < e + 1; n++) {
							if (this.showInvisibles)(i = this.dom.createElement("span")).className = "ace_invisible ace_invisible_tab", i.textContent = o.stringRepeat(this.TAB_CHAR, n), t.push(i);
							else t.push(this.dom.createTextNode(o.stringRepeat(" ", n), this.element))
						}
						if (this.displayIndentGuides) {
							this.$indentGuideRe = /\s\S| \t|\t |\s$/;
							var i, r = "ace_indent-guide",
								s = "",
								a = "";
							if (this.showInvisibles) {
								r += " ace_invisible", s = " ace_invisible_space", a = " ace_invisible_tab";
								var c = o.stringRepeat(this.SPACE_CHAR, this.tabSize),
									l = o.stringRepeat(this.TAB_CHAR, this.tabSize)
							} else l = c = o.stringRepeat(" ", this.tabSize);
							(i = this.dom.createElement("span")).className = r + s, i.textContent = c, this.$tabStrings[" "] = i, (i = this.dom.createElement("span")).className = r + a, i.textContent = l, this.$tabStrings["\t"] = i
						}
					}, this.updateLines = function (e, t, n) {
						if (this.config.lastRow != e.lastRow || this.config.firstRow != e.firstRow) return this.update(e);
						this.config = e;
						for (var i = Math.max(t, e.firstRow), r = Math.min(n, e.lastRow), o = this.element.childNodes, s = 0, a = e.firstRow; a < i; a++) {
							if (c = this.session.getFoldLine(a)) {
								if (c.containsRow(i)) {
									i = c.start.row;
									break
								}
								a = c.end.row
							}
							s++
						}
						for (var c, l = !1, u = (a = i, (c = this.session.getNextFoldLine(a)) ? c.start.row : 1 / 0); a > u && (a = c.end.row + 1, u = (c = this.session.getNextFoldLine(a, c)) ? c.start.row : 1 / 0), !(a > r);) {
							var h = o[s++];
							if (h) {
								this.dom.removeChildren(h), this.$renderLine(h, a, a == u && c), l && (h.style.top = this.$lines.computeLineTop(a, e, this.session) + "px");
								var d = e.lineHeight * this.session.getRowLength(a) + "px";
								h.style.height != d && (l = !0, h.style.height = d)
							}
							a++
						}
						if (l)
							for (; s < this.$lines.cells.length;) {
								var p = this.$lines.cells[s++];
								p.element.style.top = this.$lines.computeLineTop(p.row, e, this.session) + "px"
							}
					}, this.scrollLines = function (e) {
						var t = this.config;
						if (this.config = e, this.$lines.pageChanged(t, e)) return this.update(e);
						this.$lines.moveContainer(e);
						var n = e.lastRow,
							i = t ? t.lastRow : -1;
						if (!t || i < e.firstRow) return this.update(e);
						if (n < t.firstRow) return this.update(e);
						if (!t || t.lastRow < e.firstRow) return this.update(e);
						if (e.lastRow < t.firstRow) return this.update(e);
						if (t.firstRow < e.firstRow)
							for (var r = this.session.getFoldedRowCount(t.firstRow, e.firstRow - 1); r > 0; r--) this.$lines.shift();
						if (t.lastRow > e.lastRow)
							for (r = this.session.getFoldedRowCount(e.lastRow + 1, t.lastRow); r > 0; r--) this.$lines.pop();
						e.firstRow < t.firstRow && this.$lines.unshift(this.$renderLinesFragment(e, e.firstRow, t.firstRow - 1)), e.lastRow > t.lastRow && this.$lines.push(this.$renderLinesFragment(e, t.lastRow + 1, e.lastRow))
					}, this.$renderLinesFragment = function (e, t, n) {
						for (var i = [], o = t, s = this.session.getNextFoldLine(o), a = s ? s.start.row : 1 / 0; o > a && (o = s.end.row + 1, a = (s = this.session.getNextFoldLine(o, s)) ? s.start.row : 1 / 0), !(o > n);) {
							var c = this.$lines.createCell(o, e, this.session),
								l = c.element;
							this.dom.removeChildren(l), r.setStyle(l.style, "height", this.$lines.computeLineHeight(o, e, this.session) + "px"), r.setStyle(l.style, "top", this.$lines.computeLineTop(o, e, this.session) + "px"), this.$renderLine(l, o, o == a && s), this.$useLineGroups() ? l.className = "ace_line_group" : l.className = "ace_line", i.push(c), o++
						}
						return i
					}, this.update = function (e) {
						this.$lines.moveContainer(e), this.config = e;
						for (var t = e.firstRow, n = e.lastRow, i = this.$lines; i.getLength();) i.pop();
						i.push(this.$renderLinesFragment(e, t, n))
					}, this.$textToken = {
						text: !0,
						rparen: !0,
						lparen: !0
					}, this.$renderToken = function (e, t, n, i) {
						for (var r, s = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g, a = this.dom.createFragment(this.element), c = 0; r = s.exec(i);) {
							var l = r[1],
								u = r[2],
								h = r[3],
								d = r[4],
								p = r[5];
							if (this.showInvisibles || !u) {
								var m = c != r.index ? i.slice(c, r.index) : "";
								if (c = r.index + r[0].length, m && a.appendChild(this.dom.createTextNode(m, this.element)), l) {
									var f = this.session.getScreenTabSize(t + r.index);
									a.appendChild(this.$tabStrings[f].cloneNode(!0)), t += f - 1
								} else if (u) {
									if (this.showInvisibles)(v = this.dom.createElement("span")).className = "ace_invisible ace_invisible_space", v.textContent = o.stringRepeat(this.SPACE_CHAR, u.length), a.appendChild(v);
									else a.appendChild(this.com.createTextNode(u, this.element))
								} else if (h) {
									(v = this.dom.createElement("span")).className = "ace_invisible ace_invisible_space ace_invalid", v.textContent = o.stringRepeat(this.SPACE_CHAR, h.length), a.appendChild(v)
								} else if (d) {
									t += 1, (v = this.dom.createElement("span")).style.width = 2 * this.config.characterWidth + "px", v.className = this.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk", v.textContent = this.showInvisibles ? this.SPACE_CHAR : d, a.appendChild(v)
								} else if (p) {
									t += 1, (v = this.dom.createElement("span")).style.width = 2 * this.config.characterWidth + "px", v.className = "ace_cjk", v.textContent = p, a.appendChild(v)
								}
							}
						}
						if (a.appendChild(this.dom.createTextNode(c ? i.slice(c) : i, this.element)), this.$textToken[n.type]) e.appendChild(a);
						else {
							var g = "ace_" + n.type.replace(/\./g, " ace_"),
								v = this.dom.createElement("span");
							"fold" == n.type && (v.style.width = n.value.length * this.config.characterWidth + "px"), v.className = g, v.appendChild(a), e.appendChild(v)
						}
						return t + i.length
					}, this.renderIndentGuide = function (e, t, n) {
						var i = t.search(this.$indentGuideRe);
						if (i <= 0 || i >= n) return t;
						if (" " == t[0]) {
							for (var r = (i -= i % this.tabSize) / this.tabSize, o = 0; o < r; o++) e.appendChild(this.$tabStrings[" "].cloneNode(!0));
							return t.substr(i)
						}
						if ("\t" == t[0]) {
							for (o = 0; o < i; o++) e.appendChild(this.$tabStrings["\t"].cloneNode(!0));
							return t.substr(i)
						}
						return t
					}, this.$createLineElement = function (e) {
						var t = this.dom.createElement("div");
						return t.className = "ace_line", t.style.height = this.config.lineHeight + "px", t
					}, this.$renderWrappedLine = function (e, t, n) {
						var i = 0,
							r = 0,
							s = n[0],
							a = 0,
							c = this.$createLineElement();
						e.appendChild(c);
						for (var l = 0; l < t.length; l++) {
							var u = t[l],
								h = u.value;
							if (0 == l && this.displayIndentGuides) {
								if (i = h.length, !(h = this.renderIndentGuide(c, h, s))) continue;
								i -= h.length
							}
							if (i + h.length < s) a = this.$renderToken(c, a, u, h), i += h.length;
							else {
								for (; i + h.length >= s;) a = this.$renderToken(c, a, u, h.substring(0, s - i)), h = h.substring(s - i), i = s, c = this.$createLineElement(), e.appendChild(c), c.appendChild(this.dom.createTextNode(o.stringRepeat(" ", n.indent), this.element)), a = 0, s = n[++r] || Number.MAX_VALUE;
								0 != h.length && (i += h.length, a = this.$renderToken(c, a, u, h))
							}
						}
						n[n.length - 1] > this.MAX_LINE_LENGTH && this.$renderOverflowMessage(c, a, null, "", !0)
					}, this.$renderSimpleLine = function (e, t) {
						var n = 0,
							i = t[0],
							r = i.value;
						this.displayIndentGuides && (r = this.renderIndentGuide(e, r)), r && (n = this.$renderToken(e, n, i, r));
						for (var o = 1; o < t.length; o++) {
							if (n + (r = (i = t[o]).value).length > this.MAX_LINE_LENGTH) return this.$renderOverflowMessage(e, n, i, r);
							n = this.$renderToken(e, n, i, r)
						}
					}, this.$renderOverflowMessage = function (e, t, n, i, r) {
						n && this.$renderToken(e, t, n, i.slice(0, this.MAX_LINE_LENGTH - t));
						var o = this.dom.createElement("span");
						o.className = "ace_inline_button ace_keyword ace_toggle_wrap", o.textContent = r ? "<hide>" : "<click to see more...>", e.appendChild(o)
					}, this.$renderLine = function (e, t, n) {
						if (n || 0 == n || (n = this.session.getFoldLine(t)), n) var i = this.$getFoldLineTokens(t, n);
						else i = this.session.getTokens(t);
						var r = e;
						if (i.length) {
							var o = this.session.getRowSplitData(t);
							if (o && o.length) {
								this.$renderWrappedLine(e, i, o);
								r = e.lastChild
							} else {
								r = e;
								this.$useLineGroups() && (r = this.$createLineElement(), e.appendChild(r)), this.$renderSimpleLine(r, i)
							}
						} else this.$useLineGroups() && (r = this.$createLineElement(), e.appendChild(r));
						if (this.showInvisibles && r) {
							n && (t = n.end.row);
							var s = this.dom.createElement("span");
							s.className = "ace_invisible ace_invisible_eol", s.textContent = t == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, r.appendChild(s)
						}
					}, this.$getFoldLineTokens = function (e, t) {
						var n = this.session,
							i = [];
						var r = n.getTokens(e);
						return t.walk((function (e, t, o, s, a) {
							null != e ? i.push({
								type: "fold",
								value: e
							}) : (a && (r = n.getTokens(t)), r.length && function (e, t, n) {
								for (var r = 0, o = 0; o + e[r].value.length < t;)
									if (o += e[r].value.length, ++r == e.length) return;
								for (o != t && ((s = e[r].value.substring(t - o)).length > n - t && (s = s.substring(0, n - t)), i.push({
										type: e[r].type,
										value: s
									}), o = t + s.length, r += 1); o < n && r < e.length;) {
									var s;
									(s = e[r].value).length + o > n ? i.push({
										type: e[r].type,
										value: s.substring(0, n - o)
									}) : i.push(e[r]), o += s.length, r += 1
								}
							}(r, s, o))
						}), t.end.row, this.session.getLine(t.end.row).length), i
					}, this.$useLineGroups = function () {
						return this.session.getUseWrapMode()
					}, this.destroy = function () {}
				}).call(c.prototype), t.Text = c
			})), ace.define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = function (e) {
						this.element = i.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", e.appendChild(this.element), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), i.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = this.$updateOpacity.bind(this)
					};
				(function () {
					this.$updateOpacity = function (e) {
						for (var t = this.cursors, n = t.length; n--;) i.setStyle(t[n].style, "opacity", e ? "" : "0")
					}, this.$startCssAnimation = function () {
						for (var e = this.cursors, t = e.length; t--;) e[t].style.animationDuration = this.blinkInterval + "ms";
						setTimeout(function () {
							i.addCssClass(this.element, "ace_animate-blinking")
						}.bind(this))
					}, this.$stopCssAnimation = function () {
						i.removeCssClass(this.element, "ace_animate-blinking")
					}, this.$padding = 0, this.setPadding = function (e) {
						this.$padding = e
					}, this.setSession = function (e) {
						this.session = e
					}, this.setBlinking = function (e) {
						e != this.isBlinking && (this.isBlinking = e, this.restartTimer())
					}, this.setBlinkInterval = function (e) {
						e != this.blinkInterval && (this.blinkInterval = e, this.restartTimer())
					}, this.setSmoothBlinking = function (e) {
						e != this.smoothBlinking && (this.smoothBlinking = e, i.setCssClass(this.element, "ace_smooth-blinking", e), this.$updateCursors(!0), this.restartTimer())
					}, this.addCursor = function () {
						var e = i.createElement("div");
						return e.className = "ace_cursor", this.element.appendChild(e), this.cursors.push(e), e
					}, this.removeCursor = function () {
						if (this.cursors.length > 1) {
							var e = this.cursors.pop();
							return e.parentNode.removeChild(e), e
						}
					}, this.hideCursor = function () {
						this.isVisible = !1, i.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
					}, this.showCursor = function () {
						this.isVisible = !0, i.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
					}, this.restartTimer = function () {
						var e = this.$updateCursors;
						if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.$stopCssAnimation(), this.smoothBlinking && i.removeCssClass(this.element, "ace_smooth-blinking"), e(!0), this.isBlinking && this.blinkInterval && this.isVisible)
							if (this.smoothBlinking && setTimeout(function () {
									i.addCssClass(this.element, "ace_smooth-blinking")
								}.bind(this)), i.HAS_CSS_ANIMATION) this.$startCssAnimation();
							else {
								var t = function () {
									this.timeoutId = setTimeout((function () {
										e(!1)
									}), .6 * this.blinkInterval)
								}.bind(this);
								this.intervalId = setInterval((function () {
									e(!0), t()
								}), this.blinkInterval), t()
							}
						else this.$stopCssAnimation()
					}, this.getPixelPosition = function (e, t) {
						if (!this.config || !this.session) return {
							left: 0,
							top: 0
						};
						e || (e = this.session.selection.getCursor());
						var n = this.session.documentToScreenPosition(e);
						return {
							left: this.$padding + (this.session.$bidiHandler.isBidiRow(n.row, e.row) ? this.session.$bidiHandler.getPosLeft(n.column) : n.column * this.config.characterWidth),
							top: (n.row - (t ? this.config.firstRowScreen : 0)) * this.config.lineHeight
						}
					}, this.isCursorInView = function (e, t) {
						return e.top >= 0 && e.top < t.maxHeight
					}, this.update = function (e) {
						this.config = e;
						var t = this.session.$selectionMarkers,
							n = 0,
							r = 0;
						void 0 !== t && 0 !== t.length || (t = [{
							cursor: null
						}]);
						n = 0;
						for (var o = t.length; n < o; n++) {
							var s = this.getPixelPosition(t[n].cursor, !0);
							if (!((s.top > e.height + e.offset || s.top < 0) && n > 1)) {
								var a = this.cursors[r++] || this.addCursor(),
									c = a.style;
								this.drawCursor ? this.drawCursor(a, s, e, t[n], this.session) : this.isCursorInView(s, e) ? (i.setStyle(c, "display", "block"), i.translate(a, s.left, s.top), i.setStyle(c, "width", Math.round(e.characterWidth) + "px"), i.setStyle(c, "height", e.lineHeight + "px")) : i.setStyle(c, "display", "none")
							}
						}
						for (; this.cursors.length > r;) this.removeCursor();
						var l = this.session.getOverwrite();
						this.$setOverwrite(l), this.$pixelPos = s, this.restartTimer()
					}, this.drawCursor = null, this.$setOverwrite = function (e) {
						e != this.overwrite && (this.overwrite = e, e ? i.addCssClass(this.element, "ace_overwrite-cursors") : i.removeCssClass(this.element, "ace_overwrite-cursors"))
					}, this.destroy = function () {
						clearInterval(this.intervalId), clearTimeout(this.timeoutId)
					}
				}).call(r.prototype), t.Cursor = r
			})), ace.define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/dom"),
					o = e("./lib/event"),
					s = e("./lib/event_emitter").EventEmitter,
					a = function (e) {
						this.element = r.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = r.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.inner.textContent = " ", this.element.appendChild(this.inner), e.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, o.addListener(this.element, "scroll", this.onScroll.bind(this)), o.addListener(this.element, "mousedown", o.preventDefault)
					};
				(function () {
					i.implement(this, s), this.setVisible = function (e) {
						this.element.style.display = e ? "" : "none", this.isVisible = e, this.coeff = 1
					}
				}).call(a.prototype);
				var c = function (e, t) {
					a.call(this, e), this.scrollTop = 0, this.scrollHeight = 0, t.$scrollbarWidth = this.width = r.scrollbarWidth(e.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px", this.$minWidth = 0
				};
				i.inherits(c, a),
					function () {
						this.classSuffix = "-v", this.onScroll = function () {
							if (!this.skipEvent) {
								if (this.scrollTop = this.element.scrollTop, 1 != this.coeff) {
									var e = this.element.clientHeight / this.scrollHeight;
									this.scrollTop = this.scrollTop * (1 - e) / (this.coeff - e)
								}
								this._emit("scroll", {
									data: this.scrollTop
								})
							}
							this.skipEvent = !1
						}, this.getWidth = function () {
							return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0)
						}, this.setHeight = function (e) {
							this.element.style.height = e + "px"
						}, this.setInnerHeight = this.setScrollHeight = function (e) {
							this.scrollHeight = e, e > 32768 ? (this.coeff = 32768 / e, e = 32768) : 1 != this.coeff && (this.coeff = 1), this.inner.style.height = e + "px"
						}, this.setScrollTop = function (e) {
							this.scrollTop != e && (this.skipEvent = !0, this.scrollTop = e, this.element.scrollTop = e * this.coeff)
						}
					}.call(c.prototype);
				var l = function (e, t) {
					a.call(this, e), this.scrollLeft = 0, this.height = t.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px"
				};
				i.inherits(l, a),
					function () {
						this.classSuffix = "-h", this.onScroll = function () {
							this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
								data: this.scrollLeft
							})), this.skipEvent = !1
						}, this.getHeight = function () {
							return this.isVisible ? this.height : 0
						}, this.setWidth = function (e) {
							this.element.style.width = e + "px"
						}, this.setInnerWidth = function (e) {
							this.inner.style.width = e + "px"
						}, this.setScrollWidth = function (e) {
							this.inner.style.width = e + "px"
						}, this.setScrollLeft = function (e) {
							this.scrollLeft != e && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = e)
						}
					}.call(l.prototype), t.ScrollBar = c, t.ScrollBarV = c, t.ScrollBarH = l, t.VScrollBar = c, t.HScrollBar = l
			})), ace.define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/event"),
					r = function (e, t) {
						this.onRender = e, this.pending = !1, this.changes = 0, this.$recursionLimit = 2, this.window = t || window;
						var n = this;
						this._flush = function (e) {
							n.pending = !1;
							var t = n.changes;
							if (t && (i.blockIdle(100), n.changes = 0, n.onRender(t)), n.changes) {
								if (n.$recursionLimit-- < 0) return;
								n.schedule()
							} else n.$recursionLimit = 2
						}
					};
				(function () {
					this.schedule = function (e) {
						this.changes = this.changes | e, this.changes && !this.pending && (i.nextFrame(this._flush), this.pending = !0)
					}, this.clear = function (e) {
						var t = this.changes;
						return this.changes = 0, t
					}
				}).call(r.prototype), t.RenderLoop = r
			})), ace.define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/event", "ace/lib/useragent", "ace/lib/event_emitter"], (function (e, t, n) {
				var i = e("../lib/oop"),
					r = e("../lib/dom"),
					o = e("../lib/lang"),
					s = e("../lib/event"),
					a = e("../lib/useragent"),
					c = e("../lib/event_emitter").EventEmitter,
					l = "function" == typeof ResizeObserver,
					u = 200,
					h = t.FontMetrics = function (e) {
						this.el = r.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = r.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = r.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), e.appendChild(this.el), this.$measureNode.innerHTML = o.stringRepeat("X", 256), this.$characterSize = {
							width: 0,
							height: 0
						}, l ? this.$addObserver() : this.checkForSizeChanges()
					};
				(function () {
					i.implement(this, c), this.$characterSize = {
						width: 0,
						height: 0
					}, this.$setMeasureNodeStyles = function (e, t) {
						e.width = e.height = "auto", e.left = e.top = "0px", e.visibility = "hidden", e.position = "absolute", e.whiteSpace = "pre", a.isIE < 8 ? e["font-family"] = "inherit" : e.font = "inherit", e.overflow = t ? "hidden" : "visible"
					}, this.checkForSizeChanges = function (e) {
						if (void 0 === e && (e = this.$measureSizes()), e && (this.$characterSize.width !== e.width || this.$characterSize.height !== e.height)) {
							this.$measureNode.style.fontWeight = "bold";
							var t = this.$measureSizes();
							this.$measureNode.style.fontWeight = "", this.$characterSize = e, this.charSizes = Object.create(null), this.allowBoldFonts = t && t.width === e.width && t.height === e.height, this._emit("changeCharacterSize", {
								data: e
							})
						}
					}, this.$addObserver = function () {
						var e = this;
						this.$observer = new window.ResizeObserver((function (t) {
							var n = t[0].contentRect;
							e.checkForSizeChanges({
								height: n.height,
								width: n.width / 256
							})
						})), this.$observer.observe(this.$measureNode)
					}, this.$pollSizeChanges = function () {
						if (this.$pollSizeChangesTimer || this.$observer) return this.$pollSizeChangesTimer;
						var e = this;
						return this.$pollSizeChangesTimer = s.onIdle((function t() {
							e.checkForSizeChanges(), s.onIdle(t, 500)
						}), 500)
					}, this.setPolling = function (e) {
						e ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0)
					}, this.$measureSizes = function (e) {
						var t = {
							height: (e || this.$measureNode).clientHeight,
							width: (e || this.$measureNode).clientWidth / 256
						};
						return 0 === t.width || 0 === t.height ? null : t
					}, this.$measureCharWidth = function (e) {
						return this.$main.innerHTML = o.stringRepeat(e, 256), this.$main.getBoundingClientRect().width / 256
					}, this.getCharacterWidth = function (e) {
						var t = this.charSizes[e];
						return void 0 === t && (t = this.charSizes[e] = this.$measureCharWidth(e) / this.$characterSize.width), t
					}, this.destroy = function () {
						clearInterval(this.$pollSizeChangesTimer), this.$observer && this.$observer.disconnect(), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
					}, this.$getZoom = function e(t) {
						return t ? (window.getComputedStyle(t).zoom || 1) * e(t.parentElement) : 1
					}, this.$initTransformMeasureNodes = function () {
						var e = function (e, t) {
							return ["div", {
								style: "position: absolute;top:" + e + "px;left:" + t + "px;"
							}]
						};
						this.els = r.buildDom([e(0, 0), e(u, 0), e(0, u), e(u, u)], this.el)
					}, this.transformCoordinates = function (e, t) {
						e && (e = o(1 / this.$getZoom(this.el), e));

						function n(e, t, n) {
							var i = e[1] * t[0] - e[0] * t[1];
							return [(-t[1] * n[0] + t[0] * n[1]) / i, (+e[1] * n[0] - e[0] * n[1]) / i]
						}

						function i(e, t) {
							return [e[0] - t[0], e[1] - t[1]]
						}

						function r(e, t) {
							return [e[0] + t[0], e[1] + t[1]]
						}

						function o(e, t) {
							return [e * t[0], e * t[1]]
						}

						function s(e) {
							var t = e.getBoundingClientRect();
							return [t.left, t.top]
						}
						this.els || this.$initTransformMeasureNodes();
						var a = s(this.els[0]),
							c = s(this.els[1]),
							l = s(this.els[2]),
							h = s(this.els[3]),
							d = n(i(h, c), i(h, l), i(r(c, l), r(h, a))),
							p = o(1 + d[0], i(c, a)),
							m = o(1 + d[1], i(l, a));
						if (t) {
							var f = t,
								g = d[0] * f[0] / u + d[1] * f[1] / u + 1,
								v = r(o(f[0], p), o(f[1], m));
							return r(o(1 / g / u, v), a)
						}
						var _ = i(e, a),
							E = n(i(p, o(d[0], _)), i(m, o(d[1], _)), _);
						return o(u, E)
					}
				}).call(h.prototype)
			})), ace.define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter", "ace/lib/useragent"], (function (e, t, n) {
				"use strict";
				var i = e("./lib/oop"),
					r = e("./lib/dom"),
					o = e("./config"),
					s = e("./layer/gutter").Gutter,
					a = e("./layer/marker").Marker,
					c = e("./layer/text").Text,
					l = e("./layer/cursor").Cursor,
					u = e("./scrollbar").HScrollBar,
					h = e("./scrollbar").VScrollBar,
					d = e("./renderloop").RenderLoop,
					p = e("./layer/font_metrics").FontMetrics,
					m = e("./lib/event_emitter").EventEmitter,
					f = '.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;perspective: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {opacity: 0;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_mobile-menu {position: absolute;line-height: 1.5;border-radius: 4px;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;background: white;box-shadow: 1px 3px 2px grey;border: 1px solid #dcdcdc;color: black;}.ace_dark > .ace_mobile-menu {background: #333;color: #ccc;box-shadow: 1px 3px 2px grey;border: 1px solid #444;}.ace_mobile-button {padding: 2px;cursor: pointer;overflow: hidden;}.ace_mobile-button:hover {background-color: #eee;opacity:1;}.ace_mobile-button:active {background-color: #ddd;}.ace_placeholder {font-family: arial;transform: scale(0.9);opacity: 0.7;transform-origin: left;text-indent: 10px;}',
					g = e("./lib/useragent"),
					v = g.isIE;
				r.importCssString(f, "ace_editor.css");
				var _ = function (e, t) {
					var n = this;
					this.container = e || r.createElement("div"), r.addCssClass(this.container, "ace_editor"), r.HI_DPI && r.addCssClass(this.container, "ace_hidpi"), this.setTheme(t), this.$gutter = r.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.$gutter.setAttribute("aria-hidden", !0), this.scroller = r.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = r.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new s(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new a(this.content);
					var i = this.$textLayer = new c(this.content);
					this.canvas = i.element, this.$markerFront = new a(this.content), this.$cursorLayer = new l(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new h(this.container, this), this.scrollBarH = new u(this.container, this), this.scrollBarV.addEventListener("scroll", (function (e) {
						n.$scrollAnimation || n.session.setScrollTop(e.data - n.scrollMargin.top)
					})), this.scrollBarH.addEventListener("scroll", (function (e) {
						n.$scrollAnimation || n.session.setScrollLeft(e.data - n.scrollMargin.left)
					})), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
						row: 0,
						column: 0
					}, this.$fontMetrics = new p(this.container), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.addEventListener("changeCharacterSize", (function (e) {
						n.updateCharacterSize(), n.onResize(!0, n.gutterWidth, n.$size.width, n.$size.height), n._signal("changeCharacterSize", e)
					})), this.$size = {
						width: 0,
						height: 0,
						scrollerHeight: 0,
						scrollerWidth: 0,
						$dirty: !0
					}, this.layerConfig = {
						width: 1,
						padding: 0,
						firstRow: 0,
						firstRowScreen: 0,
						lastRow: 0,
						lineHeight: 0,
						characterWidth: 0,
						minHeight: 1,
						maxHeight: 1,
						offset: 0,
						height: 1,
						gutterOffset: 1
					}, this.scrollMargin = {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						v: 0,
						h: 0
					}, this.margin = {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						v: 0,
						h: 0
					}, this.$keepTextAreaAtCursor = !g.isIOS, this.$loop = new d(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), o.resetOptions(this), o._signal("renderer", this)
				};
				(function () {
					this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, i.implement(this, m), this.updateCharacterSize = function () {
						this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin(), r.setStyle(this.scroller.style, "line-height", this.lineHeight + "px")
					}, this.setSession = function (e) {
						this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = e, e && this.scrollMargin.top && e.getScrollTop() <= 0 && e.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(e), this.$markerBack.setSession(e), this.$markerFront.setSession(e), this.$gutterLayer.setSession(e), this.$textLayer.setSession(e), e && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null, this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode))
					}, this.updateLines = function (e, t, n) {
						if (void 0 === t && (t = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > e && (this.$changedLines.firstRow = e), this.$changedLines.lastRow < t && (this.$changedLines.lastRow = t)) : this.$changedLines = {
								firstRow: e,
								lastRow: t
							}, this.$changedLines.lastRow < this.layerConfig.firstRow) {
							if (!n) return;
							this.$changedLines.lastRow = this.layerConfig.lastRow
						}
						this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES)
					}, this.onChangeNewLineMode = function () {
						this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar(), this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR)
					}, this.onChangeTabSize = function () {
						this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
					}, this.updateText = function () {
						this.$loop.schedule(this.CHANGE_TEXT)
					}, this.updateFull = function (e) {
						e ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
					}, this.updateFontSize = function () {
						this.$textLayer.checkForSizeChanges()
					}, this.$changes = 0, this.$updateSizeAsync = function () {
						this.$loop.pending ? this.$size.$dirty = !0 : this.onResize()
					}, this.onResize = function (e, t, n, i) {
						if (!(this.resizing > 2)) {
							this.resizing > 0 ? this.resizing++ : this.resizing = e ? 1 : 0;
							var r = this.container;
							i || (i = r.clientHeight || r.scrollHeight), n || (n = r.clientWidth || r.scrollWidth);
							var o = this.$updateCachedSize(e, t, n, i);
							if (!this.$size.scrollerHeight || !n && !i) return this.resizing = 0;
							e && (this.$gutterLayer.$padding = null), e ? this.$renderChanges(o | this.$changes, !0) : this.$loop.schedule(o | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
						}
					}, this.$updateCachedSize = function (e, t, n, i) {
						i -= this.$extraHeight || 0;
						var o = 0,
							s = this.$size,
							a = {
								width: s.width,
								height: s.height,
								scrollerHeight: s.scrollerHeight,
								scrollerWidth: s.scrollerWidth
							};
						if (i && (e || s.height != i) && (s.height = i, o |= this.CHANGE_SIZE, s.scrollerHeight = s.height, this.$horizScroll && (s.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", o |= this.CHANGE_SCROLL), n && (e || s.width != n)) {
							o |= this.CHANGE_SIZE, s.width = n, null == t && (t = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = t, r.setStyle(this.scrollBarH.element.style, "left", t + "px"), r.setStyle(this.scroller.style, "left", t + this.margin.left + "px"), s.scrollerWidth = Math.max(0, n - t - this.scrollBarV.getWidth() - this.margin.h), r.setStyle(this.$gutter.style, "left", this.margin.left + "px");
							var c = this.scrollBarV.getWidth() + "px";
							r.setStyle(this.scrollBarH.element.style, "right", c), r.setStyle(this.scroller.style, "right", c), r.setStyle(this.scroller.style, "bottom", this.scrollBarH.getHeight()), (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || e) && (o |= this.CHANGE_FULL)
						}
						return s.$dirty = !n || !i, o && this._signal("resize", a), o
					}, this.onGutterResize = function (e) {
						var t = this.$showGutter ? e : 0;
						t != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, t, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : this.$computeLayerConfig()
					}, this.adjustWrapLimit = function () {
						var e = this.$size.scrollerWidth - 2 * this.$padding,
							t = Math.floor(e / this.characterWidth);
						return this.session.adjustWrapLimit(t, this.$showPrintMargin && this.$printMarginColumn)
					}, this.setAnimatedScroll = function (e) {
						this.setOption("animatedScroll", e)
					}, this.getAnimatedScroll = function () {
						return this.$animatedScroll
					}, this.setShowInvisibles = function (e) {
						this.setOption("showInvisibles", e), this.session.$bidiHandler.setShowInvisibles(e)
					}, this.getShowInvisibles = function () {
						return this.getOption("showInvisibles")
					}, this.getDisplayIndentGuides = function () {
						return this.getOption("displayIndentGuides")
					}, this.setDisplayIndentGuides = function (e) {
						this.setOption("displayIndentGuides", e)
					}, this.setShowPrintMargin = function (e) {
						this.setOption("showPrintMargin", e)
					}, this.getShowPrintMargin = function () {
						return this.getOption("showPrintMargin")
					}, this.setPrintMarginColumn = function (e) {
						this.setOption("printMarginColumn", e)
					}, this.getPrintMarginColumn = function () {
						return this.getOption("printMarginColumn")
					}, this.getShowGutter = function () {
						return this.getOption("showGutter")
					}, this.setShowGutter = function (e) {
						return this.setOption("showGutter", e)
					}, this.getFadeFoldWidgets = function () {
						return this.getOption("fadeFoldWidgets")
					}, this.setFadeFoldWidgets = function (e) {
						this.setOption("fadeFoldWidgets", e)
					}, this.setHighlightGutterLine = function (e) {
						this.setOption("highlightGutterLine", e)
					}, this.getHighlightGutterLine = function () {
						return this.getOption("highlightGutterLine")
					}, this.$updatePrintMargin = function () {
						if (this.$showPrintMargin || this.$printMarginEl) {
							if (!this.$printMarginEl) {
								var e = r.createElement("div");
								e.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = r.createElement("div"), this.$printMarginEl.className = "ace_print-margin", e.appendChild(this.$printMarginEl), this.content.insertBefore(e, this.content.firstChild)
							}
							var t = this.$printMarginEl.style;
							t.left = Math.round(this.characterWidth * this.$printMarginColumn + this.$padding) + "px", t.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
						}
					}, this.getContainerElement = function () {
						return this.container
					}, this.getMouseEventTarget = function () {
						return this.scroller
					}, this.getTextAreaContainer = function () {
						return this.container
					}, this.$moveTextAreaToCursor = function () {
						if (!this.$isMousePressed) {
							var e = this.textarea.style,
								t = this.$composition;
							if (this.$keepTextAreaAtCursor || t) {
								var n = this.$cursorLayer.$pixelPos;
								if (n) {
									t && t.markerRange && (n = this.$cursorLayer.getPixelPosition(t.markerRange.start, !0));
									var i = this.layerConfig,
										o = n.top,
										s = n.left;
									o -= i.offset;
									var a = t && t.useTextareaForIME ? this.lineHeight : v ? 0 : 1;
									if (o < 0 || o > i.height - a) r.translate(this.textarea, 0, 0);
									else {
										var c = 1,
											l = this.$size.height - a;
										if (t)
											if (t.useTextareaForIME) {
												var u = this.textarea.value;
												c = this.characterWidth * this.session.$getStringScreenWidth(u)[0]
											} else o += this.lineHeight + 2;
										else o += this.lineHeight;
										(s -= this.scrollLeft) > this.$size.scrollerWidth - c && (s = this.$size.scrollerWidth - c), s += this.gutterWidth + this.margin.left, r.setStyle(e, "height", a + "px"), r.setStyle(e, "width", c + "px"), r.translate(this.textarea, Math.min(s, this.$size.scrollerWidth - c), Math.min(o, l))
									}
								}
							} else r.translate(this.textarea, -100, 0)
						}
					}, this.getFirstVisibleRow = function () {
						return this.layerConfig.firstRow
					}, this.getFirstFullyVisibleRow = function () {
						return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
					}, this.getLastFullyVisibleRow = function () {
						var e = this.layerConfig,
							t = e.lastRow;
						return this.session.documentToScreenRow(t, 0) * e.lineHeight - this.session.getScrollTop() > e.height - e.lineHeight ? t - 1 : t
					}, this.getLastVisibleRow = function () {
						return this.layerConfig.lastRow
					}, this.$padding = null, this.setPadding = function (e) {
						this.$padding = e, this.$textLayer.setPadding(e), this.$cursorLayer.setPadding(e), this.$markerFront.setPadding(e), this.$markerBack.setPadding(e), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
					}, this.setScrollMargin = function (e, t, n, i) {
						var r = this.scrollMargin;
						r.top = 0 | e, r.bottom = 0 | t, r.right = 0 | i, r.left = 0 | n, r.v = r.top + r.bottom, r.h = r.left + r.right, r.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-r.top), this.updateFull()
					}, this.setMargin = function (e, t, n, i) {
						var r = this.margin;
						r.top = 0 | e, r.bottom = 0 | t, r.right = 0 | i, r.left = 0 | n, r.v = r.top + r.bottom, r.h = r.left + r.right, this.$updateCachedSize(!0, this.gutterWidth, this.$size.width, this.$size.height), this.updateFull()
					}, this.getHScrollBarAlwaysVisible = function () {
						return this.$hScrollBarAlwaysVisible
					}, this.setHScrollBarAlwaysVisible = function (e) {
						this.setOption("hScrollBarAlwaysVisible", e)
					}, this.getVScrollBarAlwaysVisible = function () {
						return this.$vScrollBarAlwaysVisible
					}, this.setVScrollBarAlwaysVisible = function (e) {
						this.setOption("vScrollBarAlwaysVisible", e)
					}, this.$updateScrollBarV = function () {
						var e = this.layerConfig.maxHeight,
							t = this.$size.scrollerHeight;
						!this.$maxLines && this.$scrollPastEnd && (e -= (t - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > e - t && (e = this.scrollTop + t, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(e + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
					}, this.$updateScrollBarH = function () {
						this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
					}, this.$frozen = !1, this.freeze = function () {
						this.$frozen = !0
					}, this.unfreeze = function () {
						this.$frozen = !1
					}, this.$renderChanges = function (e, t) {
						if (this.$changes && (e |= this.$changes, this.$changes = 0), this.session && this.container.offsetWidth && !this.$frozen && (e || t)) {
							if (this.$size.$dirty) return this.$changes |= e, this.onResize(!0);
							this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender"), this.session && this.session.$bidiHandler && this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
							var n = this.layerConfig;
							if (e & this.CHANGE_FULL || e & this.CHANGE_SIZE || e & this.CHANGE_TEXT || e & this.CHANGE_LINES || e & this.CHANGE_SCROLL || e & this.CHANGE_H_SCROLL) {
								if (e |= this.$computeLayerConfig() | this.$loop.clear(), n.firstRow != this.layerConfig.firstRow && n.firstRowScreen == this.layerConfig.firstRowScreen) {
									var i = this.scrollTop + (n.firstRow - this.layerConfig.firstRow) * this.lineHeight;
									i > 0 && (this.scrollTop = i, e |= this.CHANGE_SCROLL, e |= this.$computeLayerConfig() | this.$loop.clear())
								}
								n = this.layerConfig, this.$updateScrollBarV(), e & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), r.translate(this.content, -this.scrollLeft, -n.offset);
								var o = n.width + 2 * this.$padding + "px",
									s = n.minHeight + "px";
								r.setStyle(this.content.style, "width", o), r.setStyle(this.content.style, "height", s)
							}
							if (e & this.CHANGE_H_SCROLL && (r.translate(this.content, -this.scrollLeft, -n.offset), this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), e & this.CHANGE_FULL) return this.$changedLines = null, this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender");
							if (e & this.CHANGE_SCROLL) return this.$changedLines = null, e & this.CHANGE_TEXT || e & this.CHANGE_LINES ? this.$textLayer.update(n) : this.$textLayer.scrollLines(n), this.$showGutter && (e & this.CHANGE_GUTTER || e & this.CHANGE_LINES ? this.$gutterLayer.update(n) : this.$gutterLayer.scrollLines(n)), this.$markerBack.update(n), this.$markerFront.update(n), this.$cursorLayer.update(n), this.$moveTextAreaToCursor(), void this._signal("afterRender");
							e & this.CHANGE_TEXT ? (this.$changedLines = null, this.$textLayer.update(n), this.$showGutter && this.$gutterLayer.update(n)) : e & this.CHANGE_LINES ? (this.$updateLines() || e & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(n) : e & this.CHANGE_TEXT || e & this.CHANGE_GUTTER ? this.$showGutter && this.$gutterLayer.update(n) : e & this.CHANGE_CURSOR && this.$highlightGutterLine && this.$gutterLayer.updateLineHighlight(n), e & this.CHANGE_CURSOR && (this.$cursorLayer.update(n), this.$moveTextAreaToCursor()), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(n), e & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(n), this._signal("afterRender")
						} else this.$changes |= e
					}, this.$autosize = function () {
						var e = this.session.getScreenLength() * this.lineHeight,
							t = this.$maxLines * this.lineHeight,
							n = Math.min(t, Math.max((this.$minLines || 1) * this.lineHeight, e)) + this.scrollMargin.v + (this.$extraHeight || 0);
						this.$horizScroll && (n += this.scrollBarH.getHeight()), this.$maxPixelHeight && n > this.$maxPixelHeight && (n = this.$maxPixelHeight);
						var i = !(n <= 2 * this.lineHeight) && e > t;
						if (n != this.desiredHeight || this.$size.height != this.desiredHeight || i != this.$vScroll) {
							i != this.$vScroll && (this.$vScroll = i, this.scrollBarV.setVisible(i));
							var r = this.container.clientWidth;
							this.container.style.height = n + "px", this.$updateCachedSize(!0, this.$gutterWidth, r, n), this.desiredHeight = n, this._signal("autosize")
						}
					}, this.$computeLayerConfig = function () {
						var e = this.session,
							t = this.$size,
							n = t.height <= 2 * this.lineHeight,
							i = this.session.getScreenLength() * this.lineHeight,
							r = this.$getLongestLine(),
							o = !n && (this.$hScrollBarAlwaysVisible || t.scrollerWidth - r - 2 * this.$padding < 0),
							s = this.$horizScroll !== o;
						s && (this.$horizScroll = o, this.scrollBarH.setVisible(o));
						var a = this.$vScroll;
						this.$maxLines && this.lineHeight > 1 && this.$autosize();
						var c = t.scrollerHeight + this.lineHeight,
							l = !this.$maxLines && this.$scrollPastEnd ? (t.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
						i += l;
						var u = this.scrollMargin;
						this.session.setScrollTop(Math.max(-u.top, Math.min(this.scrollTop, i - t.scrollerHeight + u.bottom))), this.session.setScrollLeft(Math.max(-u.left, Math.min(this.scrollLeft, r + 2 * this.$padding - t.scrollerWidth + u.right)));
						var h = !n && (this.$vScrollBarAlwaysVisible || t.scrollerHeight - i + l < 0 || this.scrollTop > u.top),
							d = a !== h;
						d && (this.$vScroll = h, this.scrollBarV.setVisible(h));
						var p, m, f = this.scrollTop % this.lineHeight,
							g = Math.ceil(c / this.lineHeight) - 1,
							v = Math.max(0, Math.round((this.scrollTop - f) / this.lineHeight)),
							_ = v + g,
							E = this.lineHeight;
						v = e.screenToDocumentRow(v, 0);
						var C = e.getFoldLine(v);
						C && (v = C.start.row), p = e.documentToScreenRow(v, 0), m = e.getRowLength(v) * E, _ = Math.min(e.screenToDocumentRow(_, 0), e.getLength() - 1), c = t.scrollerHeight + e.getRowLength(_) * E + m, f = this.scrollTop - p * E;
						var A = 0;
						return (this.layerConfig.width != r || s) && (A = this.CHANGE_H_SCROLL), (s || d) && (A |= this.$updateCachedSize(!0, this.gutterWidth, t.width, t.height), this._signal("scrollbarVisibilityChanged"), d && (r = this.$getLongestLine())), this.layerConfig = {
							width: r,
							padding: this.$padding,
							firstRow: v,
							firstRowScreen: p,
							lastRow: _,
							lineHeight: E,
							characterWidth: this.characterWidth,
							minHeight: c,
							maxHeight: i,
							offset: f,
							gutterOffset: E ? Math.max(0, Math.ceil((f + t.height - t.scrollerHeight) / E)) : 0,
							height: this.$size.scrollerHeight
						}, this.session.$bidiHandler && this.session.$bidiHandler.setContentWidth(r - this.$padding), A
					}, this.$updateLines = function () {
						if (this.$changedLines) {
							var e = this.$changedLines.firstRow,
								t = this.$changedLines.lastRow;
							this.$changedLines = null;
							var n = this.layerConfig;
							if (!(e > n.lastRow + 1 || t < n.firstRow)) return t === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(n), void this.$textLayer.update(n)) : (this.$textLayer.updateLines(n, e, t), !0)
						}
					}, this.$getLongestLine = function () {
						var e = this.session.getScreenWidth();
						return this.showInvisibles && !this.session.$useWrapMode && (e += 1), this.$textLayer && e > this.$textLayer.MAX_LINE_LENGTH && (e = this.$textLayer.MAX_LINE_LENGTH + 30), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(e * this.characterWidth))
					}, this.updateFrontMarkers = function () {
						this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
					}, this.updateBackMarkers = function () {
						this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
					}, this.addGutterDecoration = function (e, t) {
						this.$gutterLayer.addGutterDecoration(e, t)
					}, this.removeGutterDecoration = function (e, t) {
						this.$gutterLayer.removeGutterDecoration(e, t)
					}, this.updateBreakpoints = function (e) {
						this.$loop.schedule(this.CHANGE_GUTTER)
					}, this.setAnnotations = function (e) {
						this.$gutterLayer.setAnnotations(e), this.$loop.schedule(this.CHANGE_GUTTER)
					}, this.updateCursor = function () {
						this.$loop.schedule(this.CHANGE_CURSOR)
					}, this.hideCursor = function () {
						this.$cursorLayer.hideCursor()
					}, this.showCursor = function () {
						this.$cursorLayer.showCursor()
					}, this.scrollSelectionIntoView = function (e, t, n) {
						this.scrollCursorIntoView(e, n), this.scrollCursorIntoView(t, n)
					}, this.scrollCursorIntoView = function (e, t, n) {
						if (0 !== this.$size.scrollerHeight) {
							var i = this.$cursorLayer.getPixelPosition(e),
								r = i.left,
								o = i.top,
								s = n && n.top || 0,
								a = n && n.bottom || 0,
								c = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
							c + s > o ? (t && c + s > o + this.lineHeight && (o -= t * this.$size.scrollerHeight), 0 === o && (o = -this.scrollMargin.top), this.session.setScrollTop(o)) : c + this.$size.scrollerHeight - a < o + this.lineHeight && (t && c + this.$size.scrollerHeight - a < o - this.lineHeight && (o += t * this.$size.scrollerHeight), this.session.setScrollTop(o + this.lineHeight + a - this.$size.scrollerHeight));
							var l = this.scrollLeft;
							l > r ? (r < this.$padding + 2 * this.layerConfig.characterWidth && (r = -this.scrollMargin.left), this.session.setScrollLeft(r)) : l + this.$size.scrollerWidth < r + this.characterWidth ? this.session.setScrollLeft(Math.round(r + this.characterWidth - this.$size.scrollerWidth)) : l <= this.$padding && r - l < this.characterWidth && this.session.setScrollLeft(0)
						}
					}, this.getScrollTop = function () {
						return this.session.getScrollTop()
					}, this.getScrollLeft = function () {
						return this.session.getScrollLeft()
					}, this.getScrollTopRow = function () {
						return this.scrollTop / this.lineHeight
					}, this.getScrollBottomRow = function () {
						return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
					}, this.scrollToRow = function (e) {
						this.session.setScrollTop(e * this.lineHeight)
					}, this.alignCursor = function (e, t) {
						"number" == typeof e && (e = {
							row: e,
							column: 0
						});
						var n = this.$cursorLayer.getPixelPosition(e),
							i = this.$size.scrollerHeight - this.lineHeight,
							r = n.top - i * (t || 0);
						return this.session.setScrollTop(r), r
					}, this.STEPS = 8, this.$calcSteps = function (e, t) {
						var n, i, r = 0,
							o = this.STEPS,
							s = [];
						for (r = 0; r < o; ++r) s.push((n = r / this.STEPS, i = e, (t - e) * (Math.pow(n - 1, 3) + 1) + i));
						return s
					}, this.scrollToLine = function (e, t, n, i) {
						var r = this.$cursorLayer.getPixelPosition({
							row: e,
							column: 0
						}).top;
						t && (r -= this.$size.scrollerHeight / 2);
						var o = this.scrollTop;
						this.session.setScrollTop(r), !1 !== n && this.animateScrolling(o, i)
					}, this.animateScrolling = function (e, t) {
						var n = this.scrollTop;
						if (this.$animatedScroll) {
							var i = this;
							if (e != n) {
								if (this.$scrollAnimation) {
									var r = this.$scrollAnimation.steps;
									if (r.length && (e = r[0]) == n) return
								}
								var o = i.$calcSteps(e, n);
								this.$scrollAnimation = {
									from: e,
									to: n,
									steps: o
								}, clearInterval(this.$timer), i.session.setScrollTop(o.shift()), i.session.$scrollTop = n, this.$timer = setInterval((function () {
									o.length ? (i.session.setScrollTop(o.shift()), i.session.$scrollTop = n) : null != n ? (i.session.$scrollTop = -1, i.session.setScrollTop(n), n = null) : (i.$timer = clearInterval(i.$timer), i.$scrollAnimation = null, t && t())
								}), 10)
							}
						}
					}, this.scrollToY = function (e) {
						this.scrollTop !== e && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = e)
					}, this.scrollToX = function (e) {
						this.scrollLeft !== e && (this.scrollLeft = e), this.$loop.schedule(this.CHANGE_H_SCROLL)
					}, this.scrollTo = function (e, t) {
						this.session.setScrollTop(t), this.session.setScrollLeft(t)
					}, this.scrollBy = function (e, t) {
						t && this.session.setScrollTop(this.session.getScrollTop() + t), e && this.session.setScrollLeft(this.session.getScrollLeft() + e)
					}, this.isScrollableBy = function (e, t) {
						return t < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top || (t > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom || (e < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left || (e > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right || void 0)))
					}, this.pixelToScreenCoordinates = function (e, t) {
						var n;
						if (this.$hasCssTransforms) {
							n = {
								top: 0,
								left: 0
							};
							var i = this.$fontMetrics.transformCoordinates([e, t]);
							e = i[1] - this.gutterWidth - this.margin.left, t = i[0]
						} else n = this.scroller.getBoundingClientRect();
						var r = e + this.scrollLeft - n.left - this.$padding,
							o = r / this.characterWidth,
							s = Math.floor((t + this.scrollTop - n.top) / this.lineHeight),
							a = this.$blockCursor ? Math.floor(o) : Math.round(o);
						return {
							row: s,
							column: a,
							side: o - a > 0 ? 1 : -1,
							offsetX: r
						}
					}, this.screenToTextCoordinates = function (e, t) {
						var n;
						if (this.$hasCssTransforms) {
							n = {
								top: 0,
								left: 0
							};
							var i = this.$fontMetrics.transformCoordinates([e, t]);
							e = i[1] - this.gutterWidth - this.margin.left, t = i[0]
						} else n = this.scroller.getBoundingClientRect();
						var r = e + this.scrollLeft - n.left - this.$padding,
							o = r / this.characterWidth,
							s = this.$blockCursor ? Math.floor(o) : Math.round(o),
							a = Math.floor((t + this.scrollTop - n.top) / this.lineHeight);
						return this.session.screenToDocumentPosition(a, Math.max(s, 0), r)
					}, this.textToScreenCoordinates = function (e, t) {
						var n = this.scroller.getBoundingClientRect(),
							i = this.session.documentToScreenPosition(e, t),
							r = this.$padding + (this.session.$bidiHandler.isBidiRow(i.row, e) ? this.session.$bidiHandler.getPosLeft(i.column) : Math.round(i.column * this.characterWidth)),
							o = i.row * this.lineHeight;
						return {
							pageX: n.left + r - this.scrollLeft,
							pageY: n.top + o - this.scrollTop
						}
					}, this.visualizeFocus = function () {
						r.addCssClass(this.container, "ace_focus")
					}, this.visualizeBlur = function () {
						r.removeCssClass(this.container, "ace_focus")
					}, this.showComposition = function (e) {
						this.$composition = e, e.cssText || (e.cssText = this.textarea.style.cssText), e.useTextareaForIME = this.$useTextareaForIME, this.$useTextareaForIME ? (r.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor(), this.$cursorLayer.element.style.display = "none") : e.markerId = this.session.addMarker(e.markerRange, "ace_composition_marker", "text")
					}, this.setCompositionText = function (e) {
						var t = this.session.selection.cursor;
						this.addToken(e, "composition_placeholder", t.row, t.column), this.$moveTextAreaToCursor()
					}, this.hideComposition = function () {
						this.$composition && (this.$composition.markerId && this.session.removeMarker(this.$composition.markerId), r.removeCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = this.$composition.cssText, this.$composition = null, this.$cursorLayer.element.style.display = "")
					}, this.addToken = function (e, t, n, i) {
						var r = this.session;
						r.bgTokenizer.lines[n] = null;
						var o = {
								type: t,
								value: e
							},
							s = r.getTokens(n);
						if (null == i) s.push(o);
						else
							for (var a = 0, c = 0; c < s.length; c++) {
								var l = s[c];
								if (i <= (a += l.value.length)) {
									var u = l.value.length - (a - i),
										h = l.value.slice(0, u),
										d = l.value.slice(u);
									s.splice(c, 1, {
										type: l.type,
										value: h
									}, o, {
										type: l.type,
										value: d
									});
									break
								}
							}
						this.updateLines(n, n)
					}, this.setTheme = function (e, t) {
						var n = this;
						if (this.$themeId = e, n._dispatchEvent("themeChange", {
								theme: e
							}), e && "string" != typeof e) s(e);
						else {
							var i = e || this.$options.theme.initialValue;
							o.loadModule(["theme", i], s)
						}

						function s(i) {
							if (n.$themeId != e) return t && t();
							if (!i || !i.cssClass) throw new Error("couldn't load module " + e + " or it didn't call define");
							i.$id && (n.$themeId = i.$id), r.importCssString(i.cssText, i.cssClass, n.container), n.theme && r.removeCssClass(n.container, n.theme.cssClass);
							var o = "padding" in i ? i.padding : "padding" in (n.theme || {}) ? 4 : n.$padding;
							n.$padding && o != n.$padding && n.setPadding(o), n.$theme = i.cssClass, n.theme = i, r.addCssClass(n.container, i.cssClass), r.setCssClass(n.container, "ace_dark", i.isDark), n.$size && (n.$size.width = 0, n.$updateSizeAsync()), n._dispatchEvent("themeLoaded", {
								theme: i
							}), t && t()
						}
					}, this.getTheme = function () {
						return this.$themeId
					}, this.setStyle = function (e, t) {
						r.setCssClass(this.container, e, !1 !== t)
					}, this.unsetStyle = function (e) {
						r.removeCssClass(this.container, e)
					}, this.setCursorStyle = function (e) {
						r.setStyle(this.scroller.style, "cursor", e)
					}, this.setMouseCursor = function (e) {
						r.setStyle(this.scroller.style, "cursor", e)
					}, this.attachToShadowRoot = function () {
						r.importCssString(f, "ace_editor.css", this.container)
					}, this.destroy = function () {
						this.freeze(), this.$fontMetrics.destroy(), this.$cursorLayer.destroy()
					}
				}).call(_.prototype), o.defineOptions(_.prototype, "renderer", {
					animatedScroll: {
						initialValue: !1
					},
					showInvisibles: {
						set: function (e) {
							this.$textLayer.setShowInvisibles(e) && this.$loop.schedule(this.CHANGE_TEXT)
						},
						initialValue: !1
					},
					showPrintMargin: {
						set: function () {
							this.$updatePrintMargin()
						},
						initialValue: !0
					},
					printMarginColumn: {
						set: function () {
							this.$updatePrintMargin()
						},
						initialValue: 80
					},
					printMargin: {
						set: function (e) {
							"number" == typeof e && (this.$printMarginColumn = e), this.$showPrintMargin = !!e, this.$updatePrintMargin()
						},
						get: function () {
							return this.$showPrintMargin && this.$printMarginColumn
						}
					},
					showGutter: {
						set: function (e) {
							this.$gutter.style.display = e ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize()
						},
						initialValue: !0
					},
					fadeFoldWidgets: {
						set: function (e) {
							r.setCssClass(this.$gutter, "ace_fade-fold-widgets", e)
						},
						initialValue: !1
					},
					showFoldWidgets: {
						set: function (e) {
							this.$gutterLayer.setShowFoldWidgets(e), this.$loop.schedule(this.CHANGE_GUTTER)
						},
						initialValue: !0
					},
					displayIndentGuides: {
						set: function (e) {
							this.$textLayer.setDisplayIndentGuides(e) && this.$loop.schedule(this.CHANGE_TEXT)
						},
						initialValue: !0
					},
					highlightGutterLine: {
						set: function (e) {
							this.$gutterLayer.setHighlightGutterLine(e), this.$loop.schedule(this.CHANGE_GUTTER)
						},
						initialValue: !0
					},
					hScrollBarAlwaysVisible: {
						set: function (e) {
							this.$hScrollBarAlwaysVisible && this.$horizScroll || this.$loop.schedule(this.CHANGE_SCROLL)
						},
						initialValue: !1
					},
					vScrollBarAlwaysVisible: {
						set: function (e) {
							this.$vScrollBarAlwaysVisible && this.$vScroll || this.$loop.schedule(this.CHANGE_SCROLL)
						},
						initialValue: !1
					},
					fontSize: {
						set: function (e) {
							"number" == typeof e && (e += "px"), this.container.style.fontSize = e, this.updateFontSize()
						},
						initialValue: 12
					},
					fontFamily: {
						set: function (e) {
							this.container.style.fontFamily = e, this.updateFontSize()
						}
					},
					maxLines: {
						set: function (e) {
							this.updateFull()
						}
					},
					minLines: {
						set: function (e) {
							this.$minLines < 562949953421311 || (this.$minLines = 0), this.updateFull()
						}
					},
					maxPixelHeight: {
						set: function (e) {
							this.updateFull()
						},
						initialValue: 0
					},
					scrollPastEnd: {
						set: function (e) {
							e = +e || 0, this.$scrollPastEnd != e && (this.$scrollPastEnd = e, this.$loop.schedule(this.CHANGE_SCROLL))
						},
						initialValue: 0,
						handlesSet: !0
					},
					fixedWidthGutter: {
						set: function (e) {
							this.$gutterLayer.$fixedWidth = !!e, this.$loop.schedule(this.CHANGE_GUTTER)
						}
					},
					theme: {
						set: function (e) {
							this.setTheme(e)
						},
						get: function () {
							return this.$themeId || this.theme
						},
						initialValue: "./theme/textmate",
						handlesSet: !0
					},
					hasCssTransforms: {},
					useTextareaForIME: {
						initialValue: !g.isMobile && !g.isIE
					}
				}), t.VirtualRenderer = _
			})), ace.define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("../lib/net"),
					o = e("../lib/event_emitter").EventEmitter,
					s = e("../config");

				function a(e) {
					if ("undefined" == typeof Worker) return {
						postMessage: function () {},
						terminate: function () {}
					};
					if (s.get("loadWorkerFromBlob")) {
						var t = function (e) {
								var t = "importScripts('" + r.qualifyURL(e) + "');";
								try {
									return new Blob([t], {
										type: "application/javascript"
									})
								} catch (e) {
									var n = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder);
									return n.append(t), n.getBlob("application/javascript")
								}
							}(e),
							n = (window.URL || window.webkitURL).createObjectURL(t);
						return new Worker(n)
					}
					return new Worker(e)
				}
				var c = function (e) {
					e.postMessage || (e = this.$createWorkerFromOldConfig.apply(this, arguments)), this.$worker = e, this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage
				};
				(function () {
					i.implement(this, o), this.$createWorkerFromOldConfig = function (t, n, i, r, o) {
						if (e.nameToUrl && !e.toUrl && (e.toUrl = e.nameToUrl), s.get("packaged") || !e.toUrl) r = r || s.moduleUrl(n, "worker");
						else {
							var c = this.$normalizePath;
							r = r || c(e.toUrl("ace/worker/worker.js", null, "_"));
							var l = {};
							t.forEach((function (t) {
								l[t] = c(e.toUrl(t, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
							}))
						}
						return this.$worker = a(r), o && this.send("importScripts", o), this.$worker.postMessage({
							init: !0,
							tlns: l,
							module: n,
							classname: i
						}), this.$worker
					}, this.onMessage = function (e) {
						var t = e.data;
						switch (t.type) {
							case "event":
								this._signal(t.name, {
									data: t.data
								});
								break;
							case "call":
								var n = this.callbacks[t.id];
								n && (n(t.data), delete this.callbacks[t.id]);
								break;
							case "error":
								this.reportError(t.data);
								break;
							case "log":
								window.console && console.log && console.log.apply(console, t.data)
						}
					}, this.reportError = function (e) {
						window.console && console.error && console.error(e)
					}, this.$normalizePath = function (e) {
						return r.qualifyURL(e)
					}, this.terminate = function () {
						this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null
					}, this.send = function (e, t) {
						this.$worker.postMessage({
							command: e,
							args: t
						})
					}, this.call = function (e, t, n) {
						if (n) {
							var i = this.callbackId++;
							this.callbacks[i] = n, t.push(i)
						}
						this.send(e, t)
					}, this.emit = function (e, t) {
						try {
							t.data && t.data.err && (t.data.err = {
								message: t.data.err.message,
								stack: t.data.err.stack,
								code: t.data.err.code
							}), this.$worker.postMessage({
								event: e,
								data: {
									data: t.data
								}
							})
						} catch (e) {
							console.error(e.stack)
						}
					}, this.attachToDocument = function (e) {
						this.$doc && this.terminate(), this.$doc = e, this.call("setValue", [e.getValue()]), e.on("change", this.changeListener)
					}, this.changeListener = function (e) {
						this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == e.action ? this.deltaQueue.push(e.start, e.lines) : this.deltaQueue.push(e.start, e.end)
					}, this.$sendDeltaQueue = function () {
						var e = this.deltaQueue;
						e && (this.deltaQueue = null, e.length > 50 && e.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {
							data: e
						}))
					}
				}).call(c.prototype);
				t.UIWorkerClient = function (e, t, n) {
					var i = null,
						r = !1,
						a = Object.create(o),
						l = [],
						u = new c({
							messageBuffer: l,
							terminate: function () {},
							postMessage: function (e) {
								l.push(e), i && (r ? setTimeout(h) : h())
							}
						});
					u.setEmitSync = function (e) {
						r = e
					};
					var h = function () {
						var e = l.shift();
						e.command ? i[e.command].apply(i, e.args) : e.event && a._signal(e.event, e.data)
					};
					return a.postMessage = function (e) {
						u.onMessage({
							data: e
						})
					}, a.callback = function (e, t) {
						this.postMessage({
							type: "call",
							id: t,
							data: e
						})
					}, a.emit = function (e, t) {
						this.postMessage({
							type: "event",
							name: e,
							data: t
						})
					}, s.loadModule(["worker", t], (function (e) {
						for (i = new e[n](a); l.length;) h()
					})), u
				}, t.WorkerClient = c, t.createWorker = a
			})), ace.define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], (function (e, t, n) {
				"use strict";
				var i = e("./range").Range,
					r = e("./lib/event_emitter").EventEmitter,
					o = e("./lib/oop"),
					s = function (e, t, n, i, r, o) {
						var s = this;
						this.length = t, this.session = e, this.doc = e.getDocument(), this.mainClass = r, this.othersClass = o, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = i, this.$onCursorChange = function () {
							setTimeout((function () {
								s.onCursorChange()
							}))
						}, this.$pos = n;
						var a = e.getUndoManager().$undoStack || e.getUndoManager().$undostack || {
							length: -1
						};
						this.$undoStackDepth = a.length, this.setup(), e.selection.on("changeCursor", this.$onCursorChange)
					};
				(function () {
					o.implement(this, r), this.setup = function () {
						var e = this,
							t = this.doc,
							n = this.session;
						this.selectionBefore = n.selection.toJSON(), n.selection.inMultiSelectMode && n.selection.toSingleRange(), this.pos = t.createAnchor(this.$pos.row, this.$pos.column);
						var r = this.pos;
						r.$insertRight = !0, r.detach(), r.markerId = n.addMarker(new i(r.row, r.column, r.row, r.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach((function (n) {
							var i = t.createAnchor(n.row, n.column);
							i.$insertRight = !0, i.detach(), e.others.push(i)
						})), n.setUndoSelect(!1)
					}, this.showOtherMarkers = function () {
						if (!this.othersActive) {
							var e = this.session,
								t = this;
							this.othersActive = !0, this.others.forEach((function (n) {
								n.markerId = e.addMarker(new i(n.row, n.column, n.row, n.column + t.length), t.othersClass, null, !1)
							}))
						}
					}, this.hideOtherMarkers = function () {
						if (this.othersActive) {
							this.othersActive = !1;
							for (var e = 0; e < this.others.length; e++) this.session.removeMarker(this.others[e].markerId)
						}
					}, this.onUpdate = function (e) {
						if (this.$updating) return this.updateAnchors(e);
						var t = e;
						if (t.start.row === t.end.row && t.start.row === this.pos.row) {
							this.$updating = !0;
							var n = "insert" === e.action ? t.end.column - t.start.column : t.start.column - t.end.column,
								r = t.start.column >= this.pos.column && t.start.column <= this.pos.column + this.length + 1,
								o = t.start.column - this.pos.column;
							if (this.updateAnchors(e), r && (this.length += n), r && !this.session.$fromUndo)
								if ("insert" === e.action)
									for (var s = this.others.length - 1; s >= 0; s--) {
										var a = {
											row: (c = this.others[s]).row,
											column: c.column + o
										};
										this.doc.insertMergedLines(a, e.lines)
									} else if ("remove" === e.action)
										for (s = this.others.length - 1; s >= 0; s--) {
											var c;
											a = {
												row: (c = this.others[s]).row,
												column: c.column + o
											};
											this.doc.remove(new i(a.row, a.column, a.row, a.column - n))
										}
							this.$updating = !1, this.updateMarkers()
						}
					}, this.updateAnchors = function (e) {
						this.pos.onChange(e);
						for (var t = this.others.length; t--;) this.others[t].onChange(e);
						this.updateMarkers()
					}, this.updateMarkers = function () {
						if (!this.$updating) {
							var e = this,
								t = this.session,
								n = function (n, r) {
									t.removeMarker(n.markerId), n.markerId = t.addMarker(new i(n.row, n.column, n.row, n.column + e.length), r, null, !1)
								};
							n(this.pos, this.mainClass);
							for (var r = this.others.length; r--;) n(this.others[r], this.othersClass)
						}
					}, this.onCursorChange = function (e) {
						if (!this.$updating && this.session) {
							var t = this.session.selection.getCursor();
							t.row === this.pos.row && t.column >= this.pos.column && t.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", e)) : (this.hideOtherMarkers(), this._emit("cursorLeave", e))
						}
					}, this.detach = function () {
						this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null
					}, this.cancel = function () {
						if (-1 !== this.$undoStackDepth) {
							for (var e = this.session.getUndoManager(), t = (e.$undoStack || e.$undostack).length - this.$undoStackDepth, n = 0; n < t; n++) e.undo(this.session, !0);
							this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore)
						}
					}
				}).call(s.prototype), t.PlaceHolder = s
			})), ace.define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], (function (e, t, n) {
				var i = e("../lib/event"),
					r = e("../lib/useragent");

				function o(e, t) {
					return e.row == t.row && e.column == t.column
				}
				t.onMouseDown = function (e) {
					var t = e.domEvent,
						n = t.altKey,
						s = t.shiftKey,
						a = t.ctrlKey,
						c = e.getAccelKey(),
						l = e.getButton();
					if (a && r.isMac && (l = t.button), e.editor.inMultiSelectMode && 2 == l) e.editor.textInput.onContextMenu(e.domEvent);
					else if (a || n || c) {
						if (0 === l) {
							var u, h = e.editor,
								d = h.selection,
								p = h.inMultiSelectMode,
								m = e.getDocumentPosition(),
								f = d.getCursor(),
								g = e.inSelection() || d.isEmpty() && o(m, f),
								v = e.x,
								_ = e.y,
								E = h.session,
								C = h.renderer.pixelToScreenCoordinates(v, _),
								A = C;
							if (h.$mouseHandler.$enableJumpToDef) a && n || c && n ? u = s ? "block" : "add" : n && h.$blockSelectEnabled && (u = "block");
							else if (c && !n) {
								if (u = "add", !p && s) return
							} else n && h.$blockSelectEnabled && (u = "block");
							if (u && r.isMac && t.ctrlKey && h.$mouseHandler.cancelContextMenu(), "add" == u) {
								if (!p && g) return;
								if (!p) {
									var R = d.toOrientedRange();
									h.addSelectionMarker(R)
								}
								var S = d.rangeList.rangeAtPoint(m);
								h.inVirtualSelectionMode = !0, s && (S = null, R = d.ranges[0] || R, h.removeSelectionMarker(R)), h.once("mouseup", (function () {
									var e = d.toOrientedRange();
									S && e.isEmpty() && o(S.cursor, e.cursor) ? d.substractPoint(e.cursor) : (s ? d.substractPoint(R.cursor) : R && (h.removeSelectionMarker(R), d.addRange(R)), d.addRange(e)), h.inVirtualSelectionMode = !1
								}))
							} else if ("block" == u) {
								var y;
								e.stop(), h.inVirtualSelectionMode = !0;
								var T = [],
									b = function () {
										var e = h.renderer.pixelToScreenCoordinates(v, _),
											t = E.screenToDocumentPosition(e.row, e.column, e.offsetX);
										o(A, e) && o(t, d.lead) || (A = e, h.selection.moveToPosition(t), h.renderer.scrollCursorIntoView(), h.removeSelectionMarkers(T), T = d.rectangularRangeBlock(A, C), h.$mouseHandler.$clickSelection && 1 == T.length && T[0].isEmpty() && (T[0] = h.$mouseHandler.$clickSelection.clone()), T.forEach(h.addSelectionMarker, h), h.updateSelectionMarkers())
									};
								p && !c ? d.toSingleRange() : !p && c && (y = d.toOrientedRange(), h.addSelectionMarker(y)), s ? C = E.documentToScreenPosition(d.lead) : d.moveToPosition(m), A = {
									row: -1,
									column: -1
								};
								var w = b;
								i.capture(h.container, (function (e) {
									v = e.clientX, _ = e.clientY
								}), (function (e) {
									b(), clearInterval(x), h.removeSelectionMarkers(T), T.length || (T = [d.toOrientedRange()]), y && (h.removeSelectionMarker(y), d.toSingleRange(y));
									for (var t = 0; t < T.length; t++) d.addRange(T[t]);
									h.inVirtualSelectionMode = !1, h.$mouseHandler.$clickSelection = null
								}));
								var x = setInterval((function () {
									w()
								}), 20);
								return e.preventDefault()
							}
						}
					} else 0 === l && e.editor.inMultiSelectMode && e.editor.exitMultiSelectMode()
				}
			})), ace.define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"], (function (e, t, n) {
				t.defaultCommands = [{
					name: "addCursorAbove",
					description: "Add cursor above",
					exec: function (e) {
						e.selectMoreLines(-1)
					},
					bindKey: {
						win: "Ctrl-Alt-Up",
						mac: "Ctrl-Alt-Up"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "addCursorBelow",
					description: "Add cursor below",
					exec: function (e) {
						e.selectMoreLines(1)
					},
					bindKey: {
						win: "Ctrl-Alt-Down",
						mac: "Ctrl-Alt-Down"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "addCursorAboveSkipCurrent",
					description: "Add cursor above (skip current)",
					exec: function (e) {
						e.selectMoreLines(-1, !0)
					},
					bindKey: {
						win: "Ctrl-Alt-Shift-Up",
						mac: "Ctrl-Alt-Shift-Up"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "addCursorBelowSkipCurrent",
					description: "Add cursor below (skip current)",
					exec: function (e) {
						e.selectMoreLines(1, !0)
					},
					bindKey: {
						win: "Ctrl-Alt-Shift-Down",
						mac: "Ctrl-Alt-Shift-Down"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectMoreBefore",
					description: "Select more before",
					exec: function (e) {
						e.selectMore(-1)
					},
					bindKey: {
						win: "Ctrl-Alt-Left",
						mac: "Ctrl-Alt-Left"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectMoreAfter",
					description: "Select more after",
					exec: function (e) {
						e.selectMore(1)
					},
					bindKey: {
						win: "Ctrl-Alt-Right",
						mac: "Ctrl-Alt-Right"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectNextBefore",
					description: "Select next before",
					exec: function (e) {
						e.selectMore(-1, !0)
					},
					bindKey: {
						win: "Ctrl-Alt-Shift-Left",
						mac: "Ctrl-Alt-Shift-Left"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "selectNextAfter",
					description: "Select next after",
					exec: function (e) {
						e.selectMore(1, !0)
					},
					bindKey: {
						win: "Ctrl-Alt-Shift-Right",
						mac: "Ctrl-Alt-Shift-Right"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}, {
					name: "splitIntoLines",
					description: "Split into lines",
					exec: function (e) {
						e.multiSelect.splitIntoLines()
					},
					bindKey: {
						win: "Ctrl-Alt-L",
						mac: "Ctrl-Alt-L"
					},
					readOnly: !0
				}, {
					name: "alignCursors",
					description: "Align cursors",
					exec: function (e) {
						e.alignCursors()
					},
					bindKey: {
						win: "Ctrl-Alt-A",
						mac: "Ctrl-Alt-A"
					},
					scrollIntoView: "cursor"
				}, {
					name: "findAll",
					description: "Find all",
					exec: function (e) {
						e.findAll()
					},
					bindKey: {
						win: "Ctrl-Alt-K",
						mac: "Ctrl-Alt-G"
					},
					scrollIntoView: "cursor",
					readOnly: !0
				}], t.multiSelectCommands = [{
					name: "singleSelection",
					description: "Single selection",
					bindKey: "esc",
					exec: function (e) {
						e.exitMultiSelectMode()
					},
					scrollIntoView: "cursor",
					readOnly: !0,
					isAvailable: function (e) {
						return e && e.inMultiSelectMode
					}
				}];
				var i = e("../keyboard/hash_handler").HashHandler;
				t.keyboardHandler = new i(t.multiSelectCommands)
			})), ace.define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"], (function (e, t, n) {
				var i = e("./range_list").RangeList,
					r = e("./range").Range,
					o = e("./selection").Selection,
					s = e("./mouse/multi_select_handler").onMouseDown,
					a = e("./lib/event"),
					c = e("./lib/lang"),
					l = e("./commands/multi_select_commands");
				t.commands = l.defaultCommands.concat(l.multiSelectCommands);
				var u = new(0, e("./search").Search);
				var h = e("./edit_session").EditSession;
				(function () {
					this.getSelectionMarkers = function () {
						return this.$selectionMarkers
					}
				}).call(h.prototype),
					function () {
						this.ranges = null, this.rangeList = null, this.addRange = function (e, t) {
							if (e) {
								if (!this.inMultiSelectMode && 0 === this.rangeCount) {
									var n = this.toOrientedRange();
									if (this.rangeList.add(n), this.rangeList.add(e), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), t || this.fromOrientedRange(e);
									this.rangeList.removeAll(), this.rangeList.add(n), this.$onAddRange(n)
								}
								e.cursor || (e.cursor = e.end);
								var i = this.rangeList.add(e);
								return this.$onAddRange(e), i.length && this.$onRemoveRange(i), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), t || this.fromOrientedRange(e)
							}
						}, this.toSingleRange = function (e) {
							e = e || this.ranges[0];
							var t = this.rangeList.removeAll();
							t.length && this.$onRemoveRange(t), e && this.fromOrientedRange(e)
						}, this.substractPoint = function (e) {
							var t = this.rangeList.substractPoint(e);
							if (t) return this.$onRemoveRange(t), t[0]
						}, this.mergeOverlappingRanges = function () {
							var e = this.rangeList.merge();
							e.length && this.$onRemoveRange(e)
						}, this.$onAddRange = function (e) {
							this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(e), this._signal("addRange", {
								range: e
							})
						}, this.$onRemoveRange = function (e) {
							if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
								var t = this.rangeList.ranges.pop();
								e.push(t), this.rangeCount = 0
							}
							for (var n = e.length; n--;) {
								var i = this.ranges.indexOf(e[n]);
								this.ranges.splice(i, 1)
							}
							this._signal("removeRange", {
								ranges: e
							}), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), (t = t || this.ranges[0]) && !t.isEqual(this.getRange()) && this.fromOrientedRange(t)
						}, this.$initRangeList = function () {
							this.rangeList || (this.rangeList = new i, this.ranges = [], this.rangeCount = 0)
						}, this.getAllRanges = function () {
							return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
						}, this.splitIntoLines = function () {
							if (this.rangeCount > 1) {
								var e = this.rangeList.ranges,
									t = e[e.length - 1],
									n = r.fromPoints(e[0].start, t.end);
								this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
							} else {
								n = this.getRange();
								var i = this.isBackwards(),
									o = n.start.row,
									s = n.end.row;
								if (o == s) {
									if (i) var a = n.end,
										c = n.start;
									else a = n.start, c = n.end;
									return this.addRange(r.fromPoints(c, c)), void this.addRange(r.fromPoints(a, a))
								}
								var l = [],
									u = this.getLineRange(o, !0);
								u.start.column = n.start.column, l.push(u);
								for (var h = o + 1; h < s; h++) l.push(this.getLineRange(h, !0));
								(u = this.getLineRange(s, !0)).end.column = n.end.column, l.push(u), l.forEach(this.addRange, this)
							}
						}, this.toggleBlockSelection = function () {
							if (this.rangeCount > 1) {
								var e = this.rangeList.ranges,
									t = e[e.length - 1],
									n = r.fromPoints(e[0].start, t.end);
								this.toSingleRange(), this.setSelectionRange(n, t.cursor == t.start)
							} else {
								var i = this.session.documentToScreenPosition(this.cursor),
									o = this.session.documentToScreenPosition(this.anchor);
								this.rectangularRangeBlock(i, o).forEach(this.addRange, this)
							}
						}, this.rectangularRangeBlock = function (e, t, n) {
							var i = [],
								o = e.column < t.column;
							if (o) var s = e.column,
								a = t.column,
								c = e.offsetX,
								l = t.offsetX;
							else s = t.column, a = e.column, c = t.offsetX, l = e.offsetX;
							var u, h, d, p = e.row < t.row;
							if (p) var m = e.row,
								f = t.row;
							else m = t.row, f = e.row;
							s < 0 && (s = 0), m < 0 && (m = 0), m == f && (n = !0);
							for (var g = m; g <= f; g++) {
								var v = r.fromPoints(this.session.screenToDocumentPosition(g, s, c), this.session.screenToDocumentPosition(g, a, l));
								if (v.isEmpty()) {
									if (u && (h = v.end, d = u, h.row == d.row && h.column == d.column)) break;
									u = v.end
								}
								v.cursor = o ? v.start : v.end, i.push(v)
							}
							if (p && i.reverse(), !n) {
								for (var _ = i.length - 1; i[_].isEmpty() && _ > 0;) _--;
								if (_ > 0)
									for (var E = 0; i[E].isEmpty();) E++;
								for (var C = _; C >= E; C--) i[C].isEmpty() && i.splice(C, 1)
							}
							return i
						}
					}.call(o.prototype);
				var d = e("./editor").Editor;

				function p(e) {
					e.$multiselectOnSessionChange || (e.$onAddRange = e.$onAddRange.bind(e), e.$onRemoveRange = e.$onRemoveRange.bind(e), e.$onMultiSelect = e.$onMultiSelect.bind(e), e.$onSingleSelect = e.$onSingleSelect.bind(e), e.$multiselectOnSessionChange = t.onSessionChange.bind(e), e.$checkMultiselectChange = e.$checkMultiselectChange.bind(e), e.$multiselectOnSessionChange(e), e.on("changeSession", e.$multiselectOnSessionChange), e.on("mousedown", s), e.commands.addCommands(l.defaultCommands), function (e) {
						if (!e.textInput) return;
						var t = e.textInput.getElement(),
							n = !1;

						function i(t) {
							n && (e.renderer.setMouseCursor(""), n = !1)
						}
						a.addListener(t, "keydown", (function (t) {
							var r = 18 == t.keyCode && !(t.ctrlKey || t.shiftKey || t.metaKey);
							e.$blockSelectEnabled && r ? n || (e.renderer.setMouseCursor("crosshair"), n = !0) : n && i()
						})), a.addListener(t, "keyup", i), a.addListener(t, "blur", i)
					}(e))
				}(function () {
					this.updateSelectionMarkers = function () {
						this.renderer.updateCursor(), this.renderer.updateBackMarkers()
					}, this.addSelectionMarker = function (e) {
						e.cursor || (e.cursor = e.end);
						var t = this.getSelectionStyle();
						return e.marker = this.session.addMarker(e, "ace_selection", t), this.session.$selectionMarkers.push(e), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, e
					}, this.removeSelectionMarker = function (e) {
						if (e.marker) {
							this.session.removeMarker(e.marker);
							var t = this.session.$selectionMarkers.indexOf(e); - 1 != t && this.session.$selectionMarkers.splice(t, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
						}
					}, this.removeSelectionMarkers = function (e) {
						for (var t = this.session.$selectionMarkers, n = e.length; n--;) {
							var i = e[n];
							if (i.marker) {
								this.session.removeMarker(i.marker);
								var r = t.indexOf(i); - 1 != r && t.splice(r, 1)
							}
						}
						this.session.selectionMarkerCount = t.length
					}, this.$onAddRange = function (e) {
						this.addSelectionMarker(e.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
					}, this.$onRemoveRange = function (e) {
						this.removeSelectionMarkers(e.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
					}, this.$onMultiSelect = function (e) {
						this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(l.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
					}, this.$onSingleSelect = function (e) {
						this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(l.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection"))
					}, this.$onMultiSelectExec = function (e) {
						var t = e.command,
							n = e.editor;
						if (n.multiSelect) {
							if (t.multiSelectAction) "forEach" == t.multiSelectAction ? i = n.forEachSelection(t, e.args) : "forEachLine" == t.multiSelectAction ? i = n.forEachSelection(t, e.args, !0) : "single" == t.multiSelectAction ? (n.exitMultiSelectMode(), i = t.exec(n, e.args || {})) : i = t.multiSelectAction(n, e.args || {});
							else {
								var i = t.exec(n, e.args || {});
								n.multiSelect.addRange(n.multiSelect.toOrientedRange()), n.multiSelect.mergeOverlappingRanges()
							}
							return i
						}
					}, this.forEachSelection = function (e, t, n) {
						if (!this.inVirtualSelectionMode) {
							var i, r = n && n.keepOrder,
								s = 1 == n || n && n.$byLines,
								a = this.session,
								c = this.selection,
								l = c.rangeList,
								u = (r ? c : l).ranges;
							if (!u.length) return e.exec ? e.exec(this, t || {}) : e(this, t || {});
							var h = c._eventRegistry;
							c._eventRegistry = {};
							var d = new o(a);
							this.inVirtualSelectionMode = !0;
							for (var p = u.length; p--;) {
								if (s)
									for (; p > 0 && u[p].start.row == u[p - 1].end.row;) p--;
								d.fromOrientedRange(u[p]), d.index = p, this.selection = a.selection = d;
								var m = e.exec ? e.exec(this, t || {}) : e(this, t || {});
								i || void 0 === m || (i = m), d.toOrientedRange(u[p])
							}
							d.detach(), this.selection = a.selection = c, this.inVirtualSelectionMode = !1, c._eventRegistry = h, c.mergeOverlappingRanges(), c.ranges[0] && c.fromOrientedRange(c.ranges[0]);
							var f = this.renderer.$scrollAnimation;
							return this.onCursorChange(), this.onSelectionChange(), f && f.from == f.to && this.renderer.animateScrolling(f.from), i
						}
					}, this.exitMultiSelectMode = function () {
						this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange()
					}, this.getSelectedText = function () {
						var e = "";
						if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
							for (var t = this.multiSelect.rangeList.ranges, n = [], i = 0; i < t.length; i++) n.push(this.session.getTextRange(t[i]));
							var r = this.session.getDocument().getNewLineCharacter();
							(e = n.join(r)).length == (n.length - 1) * r.length && (e = "")
						} else this.selection.isEmpty() || (e = this.session.getTextRange(this.getSelectionRange()));
						return e
					}, this.$checkMultiselectChange = function (e, t) {
						if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
							var n = this.multiSelect.ranges[0];
							if (this.multiSelect.isEmpty() && t == this.multiSelect.anchor) return;
							var i = t == this.multiSelect.anchor ? n.cursor == n.start ? n.end : n.start : n.cursor;
							i.row != t.row || this.session.$clipPositionToDocument(i.row, i.column).column != t.column ? this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange()) : this.multiSelect.mergeOverlappingRanges()
						}
					}, this.findAll = function (e, t, n) {
						if ((t = t || {}).needle = e || t.needle, null == t.needle) {
							var i = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
							t.needle = this.session.getTextRange(i)
						}
						this.$search.set(t);
						var r = this.$search.findAll(this.session);
						if (!r.length) return 0;
						var o = this.multiSelect;
						n || o.toSingleRange(r[0]);
						for (var s = r.length; s--;) o.addRange(r[s], !0);
						return i && o.rangeList.rangeAtPoint(i.start) && o.addRange(i, !0), r.length
					}, this.selectMoreLines = function (e, t) {
						var n = this.selection.toOrientedRange(),
							i = n.cursor == n.end,
							o = this.session.documentToScreenPosition(n.cursor);
						this.selection.$desiredColumn && (o.column = this.selection.$desiredColumn);
						var s, a = this.session.screenToDocumentPosition(o.row + e, o.column);
						if (n.isEmpty()) l = a;
						else var c = this.session.documentToScreenPosition(i ? n.end : n.start),
							l = this.session.screenToDocumentPosition(c.row + e, c.column);
						i ? (s = r.fromPoints(a, l)).cursor = s.start : (s = r.fromPoints(l, a)).cursor = s.end;
						if (s.desiredColumn = o.column, this.selection.inMultiSelectMode) {
							if (t) var u = n.cursor
						} else this.selection.addRange(n);
						this.selection.addRange(s), u && this.selection.substractPoint(u)
					}, this.transposeSelections = function (e) {
						for (var t = this.session, n = t.multiSelect, i = n.ranges, r = i.length; r--;) {
							if ((a = i[r]).isEmpty()) {
								var o = t.getWordRange(a.start.row, a.start.column);
								a.start.row = o.start.row, a.start.column = o.start.column, a.end.row = o.end.row, a.end.column = o.end.column
							}
						}
						n.mergeOverlappingRanges();
						var s = [];
						for (r = i.length; r--;) {
							var a = i[r];
							s.unshift(t.getTextRange(a))
						}
						e < 0 ? s.unshift(s.pop()) : s.push(s.shift());
						for (r = i.length; r--;) {
							o = (a = i[r]).clone();
							t.replace(a, s[r]), a.start.row = o.start.row, a.start.column = o.start.column
						}
						n.fromOrientedRange(n.ranges[0])
					}, this.selectMore = function (e, t, n) {
						var i = this.session,
							r = i.multiSelect.toOrientedRange();
						if (!r.isEmpty() || ((r = i.getWordRange(r.start.row, r.start.column)).cursor = -1 == e ? r.start : r.end, this.multiSelect.addRange(r), !n)) {
							var o = i.getTextRange(r),
								s = function (e, t, n) {
									return u.$options.wrap = !0, u.$options.needle = t, u.$options.backwards = -1 == n, u.find(e)
								}(i, o, e);
							s && (s.cursor = -1 == e ? s.start : s.end, this.session.unfold(s), this.multiSelect.addRange(s), this.renderer.scrollCursorIntoView(null, .5)), t && this.multiSelect.substractPoint(r.cursor)
						}
					}, this.alignCursors = function () {
						var e = this.session,
							t = e.multiSelect,
							n = t.ranges,
							i = -1,
							o = n.filter((function (e) {
								if (e.cursor.row == i) return !0;
								i = e.cursor.row
							}));
						if (n.length && o.length != n.length - 1) {
							o.forEach((function (e) {
								t.substractPoint(e.cursor)
							}));
							var s = 0,
								a = 1 / 0,
								l = n.map((function (t) {
									var n = t.cursor,
										i = e.getLine(n.row).substr(n.column).search(/\S/g);
									return -1 == i && (i = 0), n.column > s && (s = n.column), i < a && (a = i), i
								}));
							n.forEach((function (t, n) {
								var i = t.cursor,
									o = s - i.column,
									u = l[n] - a;
								o > u ? e.insert(i, c.stringRepeat(" ", o - u)) : e.remove(new r(i.row, i.column, i.row, i.column - o + u)), t.start.column = t.end.column = s, t.start.row = t.end.row = i.row, t.cursor = t.end
							})), t.fromOrientedRange(n[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
						} else {
							var u = this.selection.getRange(),
								h = u.start.row,
								d = u.end.row,
								p = h == d;
							if (p) {
								var m, f = this.session.getLength();
								do {
									m = this.session.getLine(d)
								} while (/[=:]/.test(m) && ++d < f);
								do {
									m = this.session.getLine(h)
								} while (/[=:]/.test(m) && --h > 0);
								h < 0 && (h = 0), d >= f && (d = f - 1)
							}
							var g = this.session.removeFullLines(h, d);
							g = this.$reAlignText(g, p), this.session.insert({
								row: h,
								column: 0
							}, g.join("\n") + "\n"), p || (u.start.column = 0, u.end.column = g[g.length - 1].length), this.selection.setRange(u)
						}
					}, this.$reAlignText = function (e, t) {
						var n, i, r, o = !0,
							s = !0;
						return e.map((function (e) {
							var t = e.match(/(\s*)(.*?)(\s*)([=:].*)/);
							return t ? null == n ? (n = t[1].length, i = t[2].length, r = t[3].length, t) : (n + i + r != t[1].length + t[2].length + t[3].length && (s = !1), n != t[1].length && (o = !1), n > t[1].length && (n = t[1].length), i < t[2].length && (i = t[2].length), r > t[3].length && (r = t[3].length), t) : [e]
						})).map(t ? l : o ? s ? function (e) {
							return e[2] ? a(n + i - e[2].length) + e[2] + a(r) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
						} : l : function (e) {
							return e[2] ? a(n) + e[2] + a(r) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
						});

						function a(e) {
							return c.stringRepeat(" ", e)
						}

						function l(e) {
							return e[2] ? a(n) + e[2] + a(i - e[2].length + r) + e[4].replace(/^([=:])\s+/, "$1 ") : e[0]
						}
					}
				}).call(d.prototype), t.onSessionChange = function (e) {
					var t = e.session;
					t && !t.multiSelect && (t.$selectionMarkers = [], t.selection.$initRangeList(), t.multiSelect = t.selection), this.multiSelect = t && t.multiSelect;
					var n = e.oldSession;
					n && (n.multiSelect.off("addRange", this.$onAddRange), n.multiSelect.off("removeRange", this.$onRemoveRange), n.multiSelect.off("multiSelect", this.$onMultiSelect), n.multiSelect.off("singleSelect", this.$onSingleSelect), n.multiSelect.lead.off("change", this.$checkMultiselectChange), n.multiSelect.anchor.off("change", this.$checkMultiselectChange)), t && (t.multiSelect.on("addRange", this.$onAddRange), t.multiSelect.on("removeRange", this.$onRemoveRange), t.multiSelect.on("multiSelect", this.$onMultiSelect), t.multiSelect.on("singleSelect", this.$onSingleSelect), t.multiSelect.lead.on("change", this.$checkMultiselectChange), t.multiSelect.anchor.on("change", this.$checkMultiselectChange)), t && this.inMultiSelectMode != t.selection.inMultiSelectMode && (t.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
				}, t.MultiSelect = p, e("./config").defineOptions(d.prototype, "editor", {
					enableMultiselect: {
						set: function (e) {
							p(this), e ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", s)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", s))
						},
						value: !0
					},
					enableBlockSelect: {
						set: function (e) {
							this.$blockSelectEnabled = e
						},
						value: !0
					}
				})
			})), ace.define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../../range").Range,
					r = t.FoldMode = function () {};
				(function () {
					this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function (e, t, n) {
						var i = e.getLine(n);
						return this.foldingStartMarker.test(i) ? "start" : "markbeginend" == t && this.foldingStopMarker && this.foldingStopMarker.test(i) ? "end" : ""
					}, this.getFoldWidgetRange = function (e, t, n) {
						return null
					}, this.indentationBlock = function (e, t, n) {
						var r = /\S/,
							o = e.getLine(t),
							s = o.search(r);
						if (-1 != s) {
							for (var a = n || o.length, c = e.getLength(), l = t, u = t; ++t < c;) {
								var h = e.getLine(t).search(r);
								if (-1 != h) {
									if (h <= s) {
										var d = e.getTokenAt(t, 0);
										if (!d || "string" !== d.type) break
									}
									u = t
								}
							}
							if (u > l) {
								var p = e.getLine(u).length;
								return new i(l, a, u, p)
							}
						}
					}, this.openingBracketBlock = function (e, t, n, r, o) {
						var s = {
								row: n,
								column: r + 1
							},
							a = e.$findClosingBracket(t, s, o);
						if (a) {
							var c = e.foldWidgets[a.row];
							return null == c && (c = e.getFoldWidget(a.row)), "start" == c && a.row > s.row && (a.row--, a.column = e.getLine(a.row).length), i.fromPoints(s, a)
						}
					}, this.closingBracketBlock = function (e, t, n, r, o) {
						var s = {
								row: n,
								column: r
							},
							a = e.$findOpeningBracket(t, s);
						if (a) return a.column++, s.column--, i.fromPoints(a, s)
					}
				}).call(r.prototype)
			})), ace.define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				"use strict";
				t.isDark = !1, t.cssClass = "ace-tm", t.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}', t.$id = "ace/theme/textmate", e("../lib/dom").importCssString(t.cssText, t.cssClass)
			})), ace.define("ace/line_widgets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"], (function (e, t, n) {
				"use strict";
				e("./lib/oop");
				var i = e("./lib/dom");
				e("./range").Range;

				function r(e) {
					this.session = e, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor)
				}(function () {
					this.getRowLength = function (e) {
						var t;
						return t = this.lineWidgets && this.lineWidgets[e] && this.lineWidgets[e].rowCount || 0, this.$useWrapMode && this.$wrapData[e] ? this.$wrapData[e].length + 1 + t : 1 + t
					}, this.$getWidgetScreenLength = function () {
						var e = 0;
						return this.lineWidgets.forEach((function (t) {
							t && t.rowCount && !t.hidden && (e += t.rowCount)
						})), e
					}, this.$onChangeEditor = function (e) {
						this.attach(e.editor)
					}, this.attach = function (e) {
						e && e.widgetManager && e.widgetManager != this && e.widgetManager.detach(), this.editor != e && (this.detach(), this.editor = e, e && (e.widgetManager = this, e.renderer.on("beforeRender", this.measureWidgets), e.renderer.on("afterRender", this.renderWidgets)))
					}, this.detach = function (e) {
						var t = this.editor;
						if (t) {
							this.editor = null, t.widgetManager = null, t.renderer.off("beforeRender", this.measureWidgets), t.renderer.off("afterRender", this.renderWidgets);
							var n = this.session.lineWidgets;
							n && n.forEach((function (e) {
								e && e.el && e.el.parentNode && (e._inDocument = !1, e.el.parentNode.removeChild(e.el))
							}))
						}
					}, this.updateOnFold = function (e, t) {
						var n = t.lineWidgets;
						if (n && e.action) {
							for (var i = e.data, r = i.start.row, o = i.end.row, s = "add" == e.action, a = r + 1; a < o; a++) n[a] && (n[a].hidden = s);
							n[o] && (s ? n[r] ? n[o].hidden = s : n[r] = n[o] : (n[r] == n[o] && (n[r] = void 0), n[o].hidden = s))
						}
					}, this.updateOnChange = function (e) {
						var t = this.session.lineWidgets;
						if (t) {
							var n = e.start.row,
								i = e.end.row - n;
							if (0 === i);
							else if ("remove" == e.action) {
								t.splice(n + 1, i).forEach((function (e) {
									e && this.removeLineWidget(e)
								}), this), this.$updateRows()
							} else {
								var r = new Array(i);
								r.unshift(n, 0), t.splice.apply(t, r), this.$updateRows()
							}
						}
					}, this.$updateRows = function () {
						var e = this.session.lineWidgets;
						if (e) {
							var t = !0;
							e.forEach((function (e, n) {
								if (e)
									for (t = !1, e.row = n; e.$oldWidget;) e.$oldWidget.row = n, e = e.$oldWidget
							})), t && (this.session.lineWidgets = null)
						}
					}, this.addLineWidget = function (e) {
						this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
						var t = this.session.lineWidgets[e.row];
						t && (e.$oldWidget = t, t.el && t.el.parentNode && (t.el.parentNode.removeChild(t.el), t._inDocument = !1)), this.session.lineWidgets[e.row] = e, e.session = this.session;
						var n = this.editor.renderer;
						e.html && !e.el && (e.el = i.createElement("div"), e.el.innerHTML = e.html), e.el && (i.addCssClass(e.el, "ace_lineWidgetContainer"), e.el.style.position = "absolute", e.el.style.zIndex = 5, n.container.appendChild(e.el), e._inDocument = !0), e.coverGutter || (e.el.style.zIndex = 3), null == e.pixelHeight && (e.pixelHeight = e.el.offsetHeight), null == e.rowCount && (e.rowCount = e.pixelHeight / n.layerConfig.lineHeight);
						var r = this.session.getFoldAt(e.row, 0);
						if (e.$fold = r, r) {
							var o = this.session.lineWidgets;
							e.row != r.end.row || o[r.start.row] ? e.hidden = !0 : o[r.start.row] = e
						}
						return this.session._emit("changeFold", {
							data: {
								start: {
									row: e.row
								}
							}
						}), this.$updateRows(), this.renderWidgets(null, n), this.onWidgetChanged(e), e
					}, this.removeLineWidget = function (e) {
						if (e._inDocument = !1, e.session = null, e.el && e.el.parentNode && e.el.parentNode.removeChild(e.el), e.editor && e.editor.destroy) try {
							e.editor.destroy()
						} catch (e) {}
						if (this.session.lineWidgets) {
							var t = this.session.lineWidgets[e.row];
							if (t == e) this.session.lineWidgets[e.row] = e.$oldWidget, e.$oldWidget && this.onWidgetChanged(e.$oldWidget);
							else
								for (; t;) {
									if (t.$oldWidget == e) {
										t.$oldWidget = e.$oldWidget;
										break
									}
									t = t.$oldWidget
								}
						}
						this.session._emit("changeFold", {
							data: {
								start: {
									row: e.row
								}
							}
						}), this.$updateRows()
					}, this.getWidgetsAtRow = function (e) {
						for (var t = this.session.lineWidgets, n = t && t[e], i = []; n;) i.push(n), n = n.$oldWidget;
						return i
					}, this.onWidgetChanged = function (e) {
						this.session._changedWidgets.push(e), this.editor && this.editor.renderer.updateFull()
					}, this.measureWidgets = function (e, t) {
						var n = this.session._changedWidgets,
							i = t.layerConfig;
						if (n && n.length) {
							for (var r = 1 / 0, o = 0; o < n.length; o++) {
								var s = n[o];
								if (s && s.el && s.session == this.session) {
									if (!s._inDocument) {
										if (this.session.lineWidgets[s.row] != s) continue;
										s._inDocument = !0, t.container.appendChild(s.el)
									}
									s.h = s.el.offsetHeight, s.fixedWidth || (s.w = s.el.offsetWidth, s.screenWidth = Math.ceil(s.w / i.characterWidth));
									var a = s.h / i.lineHeight;
									s.coverLine && (a -= this.session.getRowLineCount(s.row)) < 0 && (a = 0), s.rowCount != a && (s.rowCount = a, s.row < r && (r = s.row))
								}
							}
							r != 1 / 0 && (this.session._emit("changeFold", {
								data: {
									start: {
										row: r
									}
								}
							}), this.session.lineWidgetWidth = null), this.session._changedWidgets = []
						}
					}, this.renderWidgets = function (e, t) {
						var n = t.layerConfig,
							i = this.session.lineWidgets;
						if (i) {
							for (var r = Math.min(this.firstRow, n.firstRow), o = Math.max(this.lastRow, n.lastRow, i.length); r > 0 && !i[r];) r--;
							this.firstRow = n.firstRow, this.lastRow = n.lastRow, t.$cursorLayer.config = n;
							for (var s = r; s <= o; s++) {
								var a = i[s];
								if (a && a.el)
									if (a.hidden) a.el.style.top = -100 - (a.pixelHeight || 0) + "px";
									else {
										a._inDocument || (a._inDocument = !0, t.container.appendChild(a.el));
										var c = t.$cursorLayer.getPixelPosition({
											row: s,
											column: 0
										}, !0).top;
										a.coverLine || (c += n.lineHeight * this.session.getRowLineCount(a.row)), a.el.style.top = c - n.offset + "px";
										var l = a.coverGutter ? 0 : t.gutterWidth;
										a.fixedWidth || (l -= t.scrollLeft), a.el.style.left = l + "px", a.fullWidth && a.screenWidth && (a.el.style.minWidth = n.width + 2 * n.padding + "px"), a.fixedWidth ? a.el.style.right = t.scrollBar.getWidth() + "px" : a.el.style.right = ""
									}
							}
						}
					}
				}).call(r.prototype), t.LineWidgets = r
			})), ace.define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../line_widgets").LineWidgets,
					r = e("../lib/dom"),
					o = e("../range").Range;
				t.showErrorMarker = function (e, t) {
					var n = e.session;
					n.widgetManager || (n.widgetManager = new i(n), n.widgetManager.attach(e));
					var s = e.getCursorPosition(),
						a = s.row,
						c = n.widgetManager.getWidgetsAtRow(a).filter((function (e) {
							return "errorMarker" == e.type
						}))[0];
					c ? c.destroy() : a -= t;
					var l, u = function (e, t, n) {
						var i = e.getAnnotations().sort(o.comparePoints);
						if (i.length) {
							var r = function (e, t, n) {
								for (var i = 0, r = e.length - 1; i <= r;) {
									var o = i + r >> 1,
										s = n(t, e[o]);
									if (s > 0) i = o + 1;
									else {
										if (!(s < 0)) return o;
										r = o - 1
									}
								}
								return -(i + 1)
							}(i, {
								row: t,
								column: -1
							}, o.comparePoints);
							r < 0 && (r = -r - 1), r >= i.length ? r = n > 0 ? 0 : i.length - 1 : 0 === r && n < 0 && (r = i.length - 1);
							var s = i[r];
							if (s && n) {
								if (s.row === t) {
									do {
										s = i[r += n]
									} while (s && s.row === t);
									if (!s) return i.slice()
								}
								var a = [];
								t = s.row;
								do {
									a[n < 0 ? "unshift" : "push"](s), s = i[r += n]
								} while (s && s.row == t);
								return a.length && a
							}
						}
					}(n, a, t);
					if (u) {
						var h = u[0];
						s.column = (h.pos && "number" != typeof h.column ? h.pos.sc : h.column) || 0, s.row = h.row, l = e.renderer.$gutterLayer.$annotations[s.row]
					} else {
						if (c) return;
						l = {
							text: ["Looks good!"],
							className: "ace_ok"
						}
					}
					e.session.unfold(s.row), e.selection.moveToPosition(s);
					var d = {
							row: s.row,
							fixedWidth: !0,
							coverGutter: !0,
							el: r.createElement("div"),
							type: "errorMarker"
						},
						p = d.el.appendChild(r.createElement("div")),
						m = d.el.appendChild(r.createElement("div"));
					m.className = "error_widget_arrow " + l.className;
					var f = e.renderer.$cursorLayer.getPixelPosition(s).left;
					m.style.left = f + e.renderer.gutterWidth - 5 + "px", d.el.className = "error_widget_wrapper", p.className = "error_widget " + l.className, p.innerHTML = l.text.join("<br>"), p.appendChild(r.createElement("div"));
					var g = function (e, t, n) {
						if (0 === t && ("esc" === n || "return" === n)) return d.destroy(), {
							command: "null"
						}
					};
					d.destroy = function () {
						e.$mouseHandler.isMousePressed || (e.keyBinding.removeKeyboardHandler(g), n.widgetManager.removeLineWidget(d), e.off("changeSelection", d.destroy), e.off("changeSession", d.destroy), e.off("mouseup", d.destroy), e.off("change", d.destroy))
					}, e.keyBinding.addKeyboardHandler(g), e.on("changeSelection", d.destroy), e.on("changeSession", d.destroy), e.on("mouseup", d.destroy), e.on("change", d.destroy), e.session.widgetManager.addLineWidget(d), d.el.onmousedown = e.focus.bind(e), e.renderer.scrollCursorIntoView(null, .5, {
						bottom: d.el.offsetHeight
					})
				}, r.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "")
			})), ace.define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/range", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config"], (function (e, t, i) {
				"use strict";
				e("./lib/fixoldbrowsers");
				var r = e("./lib/dom"),
					o = e("./lib/event"),
					s = e("./range").Range,
					a = e("./editor").Editor,
					c = e("./edit_session").EditSession,
					l = e("./undomanager").UndoManager,
					u = e("./virtual_renderer").VirtualRenderer;
				e("./worker/worker_client"), e("./keyboard/hash_handler"), e("./placeholder"), e("./multi_select"), e("./mode/folding/fold_mode"), e("./theme/textmate"), e("./ext/error_marker"), t.config = e("./config"), t.require = e, t.define = n(3), t.edit = function (e, n) {
					if ("string" == typeof e) {
						var i = e;
						if (!(e = document.getElementById(i))) throw new Error("ace.edit can't find div #" + i)
					}
					if (e && e.env && e.env.editor instanceof a) return e.env.editor;
					var s = "";
					if (e && /input|textarea/i.test(e.tagName)) {
						var c = e;
						s = c.value, e = r.createElement("pre"), c.parentNode.replaceChild(e, c)
					} else e && (s = e.textContent, e.innerHTML = "");
					var l = t.createEditSession(s),
						h = new a(new u(e), l, n),
						d = {
							document: l,
							editor: h,
							onResize: h.resize.bind(h, null)
						};
					return c && (d.textarea = c), o.addListener(window, "resize", d.onResize), h.on("destroy", (function () {
						o.removeListener(window, "resize", d.onResize), d.editor.container.env = null
					})), h.container.env = h.env = d, h
				}, t.createEditSession = function (e, t) {
					var n = new c(e, t);
					return n.setUndoManager(new l), n
				}, t.Range = s, t.Editor = a, t.EditSession = c, t.UndoManager = l, t.VirtualRenderer = u, t.version = t.config.version
			})), ace.require(["ace/ace"], (function (t) {
				for (var n in t && (t.config.init(!0), t.define = ace.define), window.ace || (window.ace = t), t) t.hasOwnProperty(n) && (window.ace[n] = t[n]);
				window.ace.default = window.ace, e && (e.exports = window.ace)
			})), e.exports = ace
		}).call(this, n(0)(e))
	}, function (e, t, n) {
		(function (e) {
			ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("./text_highlight_rules").TextHighlightRules,
					o = function () {
						this.$rules = {
							start: [{
								token: "comment.doc.tag",
								regex: "@[\\w\\d_]+"
							}, o.getTagRule(), {
								defaultToken: "comment.doc",
								caseInsensitive: !0
							}]
						}
					};
				i.inherits(o, r), o.getTagRule = function (e) {
					return {
						token: "comment.doc.tag.storage.type",
						regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
					}
				}, o.getStartRule = function (e) {
					return {
						token: "comment.doc",
						regex: "\\/\\*(?=\\*)",
						next: e
					}
				}, o.getEndRule = function (e) {
					return {
						token: "comment.doc",
						regex: "\\*\\/",
						next: e
					}
				}, t.DocCommentHighlightRules = o
			})), ace.define("ace/mode/c_cpp_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("./doc_comment_highlight_rules").DocCommentHighlightRules,
					o = e("./text_highlight_rules").TextHighlightRules,
					s = t.cFunctions = "\\b(?:hypot(?:f|l)?|s(?:scanf|ystem|nprintf|ca(?:nf|lb(?:n(?:f|l)?|ln(?:f|l)?))|i(?:n(?:h(?:f|l)?|f|l)?|gn(?:al|bit))|tr(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?)|error|pbrk|ftime|len|rchr|xfrm)|printf|et(?:jmp|vbuf|locale|buf)|qrt(?:f|l)?|w(?:scanf|printf)|rand)|n(?:e(?:arbyint(?:f|l)?|xt(?:toward(?:f|l)?|after(?:f|l)?))|an(?:f|l)?)|c(?:s(?:in(?:h(?:f|l)?|f|l)?|qrt(?:f|l)?)|cos(?:h(?:f)?|f|l)?|imag(?:f|l)?|t(?:ime|an(?:h(?:f|l)?|f|l)?)|o(?:s(?:h(?:f|l)?|f|l)?|nj(?:f|l)?|pysign(?:f|l)?)|p(?:ow(?:f|l)?|roj(?:f|l)?)|e(?:il(?:f|l)?|xp(?:f|l)?)|l(?:o(?:ck|g(?:f|l)?)|earerr)|a(?:sin(?:h(?:f|l)?|f|l)?|cos(?:h(?:f|l)?|f|l)?|tan(?:h(?:f|l)?|f|l)?|lloc|rg(?:f|l)?|bs(?:f|l)?)|real(?:f|l)?|brt(?:f|l)?)|t(?:ime|o(?:upper|lower)|an(?:h(?:f|l)?|f|l)?|runc(?:f|l)?|gamma(?:f|l)?|mp(?:nam|file))|i(?:s(?:space|n(?:ormal|an)|cntrl|inf|digit|u(?:nordered|pper)|p(?:unct|rint)|finite|w(?:space|c(?:ntrl|type)|digit|upper|p(?:unct|rint)|lower|al(?:num|pha)|graph|xdigit|blank)|l(?:ower|ess(?:equal|greater)?)|al(?:num|pha)|gr(?:eater(?:equal)?|aph)|xdigit|blank)|logb(?:f|l)?|max(?:div|abs))|di(?:v|fftime)|_Exit|unget(?:c|wc)|p(?:ow(?:f|l)?|ut(?:s|c(?:har)?|wc(?:har)?)|error|rintf)|e(?:rf(?:c(?:f|l)?|f|l)?|x(?:it|p(?:2(?:f|l)?|f|l|m1(?:f|l)?)?))|v(?:s(?:scanf|nprintf|canf|printf|w(?:scanf|printf))|printf|f(?:scanf|printf|w(?:scanf|printf))|w(?:scanf|printf)|a_(?:start|copy|end|arg))|qsort|f(?:s(?:canf|e(?:tpos|ek))|close|tell|open|dim(?:f|l)?|p(?:classify|ut(?:s|c|w(?:s|c))|rintf)|e(?:holdexcept|set(?:e(?:nv|xceptflag)|round)|clearexcept|testexcept|of|updateenv|r(?:aiseexcept|ror)|get(?:e(?:nv|xceptflag)|round))|flush|w(?:scanf|ide|printf|rite)|loor(?:f|l)?|abs(?:f|l)?|get(?:s|c|pos|w(?:s|c))|re(?:open|e|ad|xp(?:f|l)?)|m(?:in(?:f|l)?|od(?:f|l)?|a(?:f|l|x(?:f|l)?)?))|l(?:d(?:iv|exp(?:f|l)?)|o(?:ngjmp|cal(?:time|econv)|g(?:1(?:p(?:f|l)?|0(?:f|l)?)|2(?:f|l)?|f|l|b(?:f|l)?)?)|abs|l(?:div|abs|r(?:int(?:f|l)?|ound(?:f|l)?))|r(?:int(?:f|l)?|ound(?:f|l)?)|gamma(?:f|l)?)|w(?:scanf|c(?:s(?:s(?:tr|pn)|nc(?:py|at|mp)|c(?:spn|hr|oll|py|at|mp)|to(?:imax|d|u(?:l(?:l)?|max)|k|f|l(?:d|l)?|mbs)|pbrk|ftime|len|r(?:chr|tombs)|xfrm)|to(?:b|mb)|rtomb)|printf|mem(?:set|c(?:hr|py|mp)|move))|a(?:s(?:sert|ctime|in(?:h(?:f|l)?|f|l)?)|cos(?:h(?:f|l)?|f|l)?|t(?:o(?:i|f|l(?:l)?)|exit|an(?:h(?:f|l)?|2(?:f|l)?|f|l)?)|b(?:s|ort))|g(?:et(?:s|c(?:har)?|env|wc(?:har)?)|mtime)|r(?:int(?:f|l)?|ound(?:f|l)?|e(?:name|alloc|wind|m(?:ove|quo(?:f|l)?|ainder(?:f|l)?))|a(?:nd|ise))|b(?:search|towc)|m(?:odf(?:f|l)?|em(?:set|c(?:hr|py|mp)|move)|ktime|alloc|b(?:s(?:init|towcs|rtowcs)|towc|len|r(?:towc|len))))\\b",
					a = function () {
						var e = this.$keywords = this.createKeywordMapper({
								"keyword.control": "break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",
								"storage.type": "asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|long|short|signed|struct|typedef|union|unsigned|void|class|wchar_t|template|char16_t|char32_t",
								"storage.modifier": "const|extern|register|restrict|static|volatile|inline|private|protected|public|friend|explicit|virtual|export|mutable|typename|constexpr|new|delete|alignas|alignof|decltype|noexcept|thread_local",
								"keyword.operator": "and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",
								"variable.language": "this",
								"constant.language": "NULL|true|false|TRUE|FALSE|nullptr"
							}, "identifier"),
							t = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source,
							n = "%" + /(\d+\$)?/.source + /[#0\- +']*/.source + /[,;:_]?/.source + /((-?\d+)|\*(-?\d+\$)?)?/.source + /(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source + /(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source + /(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;
						this.$rules = {
							start: [{
								token: "comment",
								regex: "//$",
								next: "start"
							}, {
								token: "comment",
								regex: "//",
								next: "singleLineComment"
							}, r.getStartRule("doc-start"), {
								token: "comment",
								regex: "\\/\\*",
								next: "comment"
							}, {
								token: "string",
								regex: "'(?:" + t + "|.)?'"
							}, {
								token: "string.start",
								regex: '"',
								stateName: "qqstring",
								next: [{
									token: "string",
									regex: /\\\s*$/,
									next: "qqstring"
								}, {
									token: "constant.language.escape",
									regex: t
								}, {
									token: "constant.language.escape",
									regex: n
								}, {
									token: "string.end",
									regex: '"|$',
									next: "start"
								}, {
									defaultToken: "string"
								}]
							}, {
								token: "string.start",
								regex: 'R"\\(',
								stateName: "rawString",
								next: [{
									token: "string.end",
									regex: '\\)"',
									next: "start"
								}, {
									defaultToken: "string"
								}]
							}, {
								token: "constant.numeric",
								regex: "0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
							}, {
								token: "constant.numeric",
								regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
							}, {
								token: "keyword",
								regex: "#\\s*(?:include|import|pragma|line|define|undef|version)\\b",
								next: "directive"
							}, {
								token: "keyword",
								regex: "#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"
							}, {
								token: "support.function.C99.c",
								regex: s
							}, {
								token: e,
								regex: "[a-zA-Z_$][a-zA-Z0-9_$]*"
							}, {
								token: "keyword.operator",
								regex: /--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/
							}, {
								token: "punctuation.operator",
								regex: "\\?|\\:|\\,|\\;|\\."
							}, {
								token: "paren.lparen",
								regex: "[[({]"
							}, {
								token: "paren.rparen",
								regex: "[\\])}]"
							}, {
								token: "text",
								regex: "\\s+"
							}],
							comment: [{
								token: "comment",
								regex: "\\*\\/",
								next: "start"
							}, {
								defaultToken: "comment"
							}],
							singleLineComment: [{
								token: "comment",
								regex: /\\$/,
								next: "singleLineComment"
							}, {
								token: "comment",
								regex: /$/,
								next: "start"
							}, {
								defaultToken: "comment"
							}],
							directive: [{
								token: "constant.other.multiline",
								regex: /\\/
							}, {
								token: "constant.other.multiline",
								regex: /.*\\/
							}, {
								token: "constant.other",
								regex: "\\s*<.+?>",
								next: "start"
							}, {
								token: "constant.other",
								regex: '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',
								next: "start"
							}, {
								token: "constant.other",
								regex: "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
								next: "start"
							}, {
								token: "constant.other",
								regex: /[^\\\/]+/,
								next: "start"
							}]
						}, this.embedRules(r, "doc-", [r.getEndRule("start")]), this.normalizeRules()
					};
				i.inherits(a, o), t.c_cppHighlightRules = a
			})), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], (function (e, t, n) {
				"use strict";
				var i = e("../range").Range,
					r = function () {};
				(function () {
					this.checkOutdent = function (e, t) {
						return !!/^\s+$/.test(e) && /^\s*\}/.test(t)
					}, this.autoOutdent = function (e, t) {
						var n = e.getLine(t).match(/^(\s*\})/);
						if (!n) return 0;
						var r = n[1].length,
							o = e.findMatchingBracket({
								row: t,
								column: r
							});
						if (!o || o.row == t) return 0;
						var s = this.$getIndent(e.getLine(o.row));
						e.replace(new i(t, 0, t, r - 1), s)
					}, this.$getIndent = function (e) {
						return e.match(/^\s*/)[0]
					}
				}).call(r.prototype), t.MatchingBraceOutdent = r
			})), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], (function (e, t, n) {
				"use strict";
				var i = e("../../lib/oop"),
					r = e("../../range").Range,
					o = e("./fold_mode").FoldMode,
					s = t.FoldMode = function (e) {
						e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
					};
				i.inherits(s, o),
					function () {
						this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function (e, t, n) {
							var i = e.getLine(n);
							if (this.singleLineBlockCommentRe.test(i) && !this.startRegionRe.test(i) && !this.tripleStarBlockCommentRe.test(i)) return "";
							var r = this._getFoldWidgetBase(e, t, n);
							return !r && this.startRegionRe.test(i) ? "start" : r
						}, this.getFoldWidgetRange = function (e, t, n, i) {
							var r, o = e.getLine(n);
							if (this.startRegionRe.test(o)) return this.getCommentRegionBlock(e, o, n);
							if (r = o.match(this.foldingStartMarker)) {
								var s = r.index;
								if (r[1]) return this.openingBracketBlock(e, r[1], n, s);
								var a = e.getCommentFoldRange(n, s + r[0].length, 1);
								return a && !a.isMultiLine() && (i ? a = this.getSectionRange(e, n) : "all" != t && (a = null)), a
							}
							if ("markbegin" !== t && (r = o.match(this.foldingStopMarker))) {
								s = r.index + r[0].length;
								return r[1] ? this.closingBracketBlock(e, r[1], n, s) : e.getCommentFoldRange(n, s, -1)
							}
						}, this.getSectionRange = function (e, t) {
							for (var n = e.getLine(t), i = n.search(/\S/), o = t, s = n.length, a = t += 1, c = e.getLength(); ++t < c;) {
								var l = (n = e.getLine(t)).search(/\S/);
								if (-1 !== l) {
									if (i > l) break;
									var u = this.getFoldWidgetRange(e, "all", t);
									if (u) {
										if (u.start.row <= o) break;
										if (u.isMultiLine()) t = u.end.row;
										else if (i == l) break
									}
									a = t
								}
							}
							return new r(o, s, a, e.getLine(a).length)
						}, this.getCommentRegionBlock = function (e, t, n) {
							for (var i = t.search(/\s*$/), o = e.getLength(), s = n, a = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/, c = 1; ++n < o;) {
								t = e.getLine(n);
								var l = a.exec(t);
								if (l && (l[1] ? c-- : c++, !c)) break
							}
							if (n > s) return new r(s, i, n, t.length)
						}
					}.call(s.prototype)
			})), ace.define("ace/mode/c_cpp", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/c_cpp_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("./text").Mode,
					o = e("./c_cpp_highlight_rules").c_cppHighlightRules,
					s = e("./matching_brace_outdent").MatchingBraceOutdent,
					a = (e("../range").Range, e("./behaviour/cstyle").CstyleBehaviour),
					c = e("./folding/cstyle").FoldMode,
					l = function () {
						this.HighlightRules = o, this.$outdent = new s, this.$behaviour = new a, this.foldingRules = new c
					};
				i.inherits(l, r),
					function () {
						this.lineCommentStart = "//", this.blockComment = {
							start: "/*",
							end: "*/"
						}, this.getNextLineIndent = function (e, t, n) {
							var i = this.$getIndent(t),
								r = this.getTokenizer().getLineTokens(t, e),
								o = r.tokens,
								s = r.state;
							if (o.length && "comment" == o[o.length - 1].type) return i;
							if ("start" == e)(a = t.match(/^.*[\{\(\[]\s*$/)) && (i += n);
							else if ("doc-start" == e) {
								if ("start" == s) return "";
								var a;
								(a = t.match(/^\s*(\/?)\*/)) && (a[1] && (i += " "), i += "* ")
							}
							return i
						}, this.checkOutdent = function (e, t, n) {
							return this.$outdent.checkOutdent(t, n)
						}, this.autoOutdent = function (e, t, n) {
							this.$outdent.autoOutdent(t, n)
						}, this.$id = "ace/mode/c_cpp"
					}.call(l.prototype), t.Mode = l
			})), ace.define("ace/mode/glsl_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/c_cpp_highlight_rules"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("./c_cpp_highlight_rules").c_cppHighlightRules,
					o = function () {
						var e = this.createKeywordMapper({
							"variable.language": "this",
							keyword: "layout|attribute|const|uniform|varying|break|continue|do|for|while|if|else|in|out|inout|float|int|void|bool|true|false|lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|samplerCube|struct",
							"constant.language": "radians|degrees|sin|cos|tan|asin|acos|atan|pow|exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|normalize|faceforward|reflect|refract|matrixCompMult|lessThan|lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|texture2DProjLod|textureCube|textureCubeLod|gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|gl_DepthRangeParameters|gl_DepthRange|gl_Position|gl_PointSize|gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData"
						}, "identifier");
						this.$rules = (new r).$rules, this.$rules.start.forEach((function (t) {
							"function" == typeof t.token && (t.token = e)
						}))
					};
				i.inherits(o, r), t.glslHighlightRules = o
			})), ace.define("ace/mode/glsl", ["require", "exports", "module", "ace/lib/oop", "ace/mode/c_cpp", "ace/mode/glsl_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/oop"),
					r = e("./c_cpp").Mode,
					o = e("./glsl_highlight_rules").glslHighlightRules,
					s = e("./matching_brace_outdent").MatchingBraceOutdent,
					a = (e("../range").Range, e("./behaviour/cstyle").CstyleBehaviour),
					c = e("./folding/cstyle").FoldMode,
					l = function () {
						this.HighlightRules = o, this.$outdent = new s, this.$behaviour = new a, this.foldingRules = new c
					};
				i.inherits(l, r),
					function () {
						this.$id = "ace/mode/glsl"
					}.call(l.prototype), t.Mode = l
			})), ace.require(["ace/mode/glsl"], (function (t) {
				e && (e.exports = t)
			}))
		}).call(this, n(0)(e))
	}, function (e, t, n) {
		(function (e) {
			ace.define("ace/theme/monokai", ["require", "exports", "module", "ace/lib/dom"], (function (e, t, n) {
				t.isDark = !0, t.cssClass = "ace-monokai", t.cssText = ".ace-monokai .ace_gutter {background: #2F3129;color: #8F908A}.ace-monokai .ace_print-margin {width: 1px;background: #555651}.ace-monokai {background-color: #272822;color: #F8F8F2}.ace-monokai .ace_cursor {color: #F8F8F0}.ace-monokai .ace_marker-layer .ace_selection {background: #49483E}.ace-monokai.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px #272822;}.ace-monokai .ace_marker-layer .ace_step {background: rgb(102, 82, 0)}.ace-monokai .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid #49483E}.ace-monokai .ace_marker-layer .ace_active-line {background: #202020}.ace-monokai .ace_gutter-active-line {background-color: #272727}.ace-monokai .ace_marker-layer .ace_selected-word {border: 1px solid #49483E}.ace-monokai .ace_invisible {color: #52524d}.ace-monokai .ace_entity.ace_name.ace_tag,.ace-monokai .ace_keyword,.ace-monokai .ace_meta.ace_tag,.ace-monokai .ace_storage {color: #F92672}.ace-monokai .ace_punctuation,.ace-monokai .ace_punctuation.ace_tag {color: #fff}.ace-monokai .ace_constant.ace_character,.ace-monokai .ace_constant.ace_language,.ace-monokai .ace_constant.ace_numeric,.ace-monokai .ace_constant.ace_other {color: #AE81FF}.ace-monokai .ace_invalid {color: #F8F8F0;background-color: #F92672}.ace-monokai .ace_invalid.ace_deprecated {color: #F8F8F0;background-color: #AE81FF}.ace-monokai .ace_support.ace_constant,.ace-monokai .ace_support.ace_function {color: #66D9EF}.ace-monokai .ace_fold {background-color: #A6E22E;border-color: #F8F8F2}.ace-monokai .ace_storage.ace_type,.ace-monokai .ace_support.ace_class,.ace-monokai .ace_support.ace_type {font-style: italic;color: #66D9EF}.ace-monokai .ace_entity.ace_name.ace_function,.ace-monokai .ace_entity.ace_other,.ace-monokai .ace_entity.ace_other.ace_attribute-name,.ace-monokai .ace_variable {color: #A6E22E}.ace-monokai .ace_variable.ace_parameter {font-style: italic;color: #FD971F}.ace-monokai .ace_string {color: #E6DB74}.ace-monokai .ace_comment {color: #75715E}.ace-monokai .ace_indent-guide {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y}", e("../lib/dom").importCssString(t.cssText, t.cssClass)
			})), ace.require(["ace/theme/monokai"], (function (t) {
				e && (e.exports = t)
			}))
		}).call(this, n(0)(e))
	}, function (e, t, n) {
		var i = n(9);
		"string" == typeof i && (i = [
			[e.i, i, ""]
		]);
		var r = {
			insertInto: ("html", "html"),
			hmr: !0,
			transform: void 0
		};
		n(2)(i, r);
		i.locals && (e.exports = i.locals)
	}, function (e, t, n) {
		(e.exports = n(1)(!1)).push([e.i, ".ace-monokai {\r\n    color: #f9f9f9;\r\n    font-size: 14px;\r\n}\r\n\r\n.ace-monokai .ace_entity.ace_name.ace_tag,\r\n.ace-monokai .ace_keyword,\r\n.ace-monokai .ace_meta.ace_tag,\r\n.ace-monokai .ace_storage {\r\n    color: #F0640D\r\n}\r\n\r\n.ace-monokai .ace_constant.ace_character,\r\n.ace-monokai .ace_constant.ace_other {\r\n    color: #5db0d7;\r\n}\r\n\r\n.ace-monokai .ace_marker-layer .ace_selection {\r\n    background: #a6e22e\r\n}\r\n\r\n.ace-monokai .ace_marker-layer .ace_bracket {\r\n    margin: -1px 0 0 -1px;\r\n    border: 1px solid #a6e22e;\r\n}\r\n\r\n.ace-monokai .ace_marker-layer .ace_active-line {\r\n    background: #2c2c2c\r\n}\r\n.ace-monokai .ace_gutter-active-line {\r\n    background-color: #2c2c2c\r\n}\r\n.ace-monokai .ace_marker-layer .ace_selected-word {\r\n    border: 1px solid #a6e22e\r\n}\r\n\r\n.ace-monokai .ace_constant.ace_language {\r\n    color: #e6db74\r\n}\r\n.ace-monokai .ace_constant.ace_numeric {\r\n    color: #ae81ff\r\n}\r\n\r\n.ace-monokai .ace_gutter {\r\n    background: #222;\r\n    color: #8F908A;\r\n}", ""])
	}, function (e, t) {
		e.exports = function (e) {
			var t = "undefined" != typeof window && window.location;
			if (!t) throw new Error("fixUrls requires window.location");
			if (!e || "string" != typeof e) return e;
			var n = t.protocol + "//" + t.host,
				i = n + t.pathname.replace(/\/[^\/]*$/, "/");
			return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, (function (e, t) {
				var r, o = t.trim().replace(/^"(.*)"$/, (function (e, t) {
					return t
				})).replace(/^'(.*)'$/, (function (e, t) {
					return t
				}));
				return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o) ? e : (r = 0 === o.indexOf("//") ? o : 0 === o.indexOf("/") ? n + o : i + o.replace(/^\.\//, ""), "url(" + JSON.stringify(r) + ")")
			}))
		}
	}, function (e, t, n) {
		(function (e) {
			ace.define("ace/ext/searchbox", ["require", "exports", "module", "ace/lib/dom", "ace/lib/lang", "ace/lib/event", "ace/keyboard/hash_handler", "ace/lib/keys"], (function (e, t, n) {
				"use strict";
				var i = e("../lib/dom"),
					r = e("../lib/lang"),
					o = e("../lib/event"),
					s = '.ace_search {background-color: #ddd;color: #666;border: 1px solid #cbcbcb;border-top: 0 none;overflow: hidden;margin: 0;padding: 4px 6px 0 4px;position: absolute;top: 0;z-index: 99;white-space: normal;}.ace_search.left {border-left: 0 none;border-radius: 0px 0px 5px 0px;left: 0;}.ace_search.right {border-radius: 0px 0px 0px 5px;border-right: 0 none;right: 0;}.ace_search_form, .ace_replace_form {margin: 0 20px 4px 0;overflow: hidden;line-height: 1.9;}.ace_replace_form {margin-right: 0;}.ace_search_form.ace_nomatch {outline: 1px solid red;}.ace_search_field {border-radius: 3px 0 0 3px;background-color: white;color: black;border: 1px solid #cbcbcb;border-right: 0 none;outline: 0;padding: 0;font-size: inherit;margin: 0;line-height: inherit;padding: 0 6px;min-width: 17em;vertical-align: top;min-height: 1.8em;box-sizing: content-box;}.ace_searchbtn {border: 1px solid #cbcbcb;line-height: inherit;display: inline-block;padding: 0 6px;background: #fff;border-right: 0 none;border-left: 1px solid #dcdcdc;cursor: pointer;margin: 0;position: relative;color: #666;}.ace_searchbtn:last-child {border-radius: 0 3px 3px 0;border-right: 1px solid #cbcbcb;}.ace_searchbtn:disabled {background: none;cursor: default;}.ace_searchbtn:hover {background-color: #eef1f6;}.ace_searchbtn.prev, .ace_searchbtn.next {padding: 0px 0.7em}.ace_searchbtn.prev:after, .ace_searchbtn.next:after {content: "";border: solid 2px #888;width: 0.5em;height: 0.5em;border-width:  2px 0 0 2px;display:inline-block;transform: rotate(-45deg);}.ace_searchbtn.next:after {border-width: 0 2px 2px 0 ;}.ace_searchbtn_close {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;border-radius: 50%;border: 0 none;color: #656565;cursor: pointer;font: 16px/16px Arial;padding: 0;height: 14px;width: 14px;top: 9px;right: 7px;position: absolute;}.ace_searchbtn_close:hover {background-color: #656565;background-position: 50% 100%;color: white;}.ace_button {margin-left: 2px;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;overflow: hidden;opacity: 0.7;border: 1px solid rgba(100,100,100,0.23);padding: 1px;box-sizing:    border-box!important;color: black;}.ace_button:hover {background-color: #eee;opacity:1;}.ace_button:active {background-color: #ddd;}.ace_button.checked {border-color: #3399ff;opacity:1;}.ace_search_options{margin-bottom: 3px;text-align: right;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;clear: both;}.ace_search_counter {float: left;font-family: arial;padding: 0 8px;}',
					a = e("../keyboard/hash_handler").HashHandler,
					c = e("../lib/keys");
				i.importCssString(s, "ace_searchbox");
				var l = function (e, t, n) {
					var r = i.createElement("div");
					i.buildDom(["div", {
							class: "ace_search right"
						},
						["span", {
							action: "hide",
							class: "ace_searchbtn_close"
						}],
						["div", {
								class: "ace_search_form"
							},
							["input", {
								class: "ace_search_field",
								placeholder: "Search for",
								spellcheck: "false"
							}],
							["span", {
								action: "findPrev",
								class: "ace_searchbtn prev"
							}, "​"],
							["span", {
								action: "findNext",
								class: "ace_searchbtn next"
							}, "​"],
							["span", {
								action: "findAll",
								class: "ace_searchbtn",
								title: "Alt-Enter"
							}, "All"]
						],
						["div", {
								class: "ace_replace_form"
							},
							["input", {
								class: "ace_search_field",
								placeholder: "Replace with",
								spellcheck: "false"
							}],
							["span", {
								action: "replaceAndFindNext",
								class: "ace_searchbtn"
							}, "Replace"],
							["span", {
								action: "replaceAll",
								class: "ace_searchbtn"
							}, "All"]
						],
						["div", {
								class: "ace_search_options"
							},
							["span", {
								action: "toggleReplace",
								class: "ace_button",
								title: "Toggle Replace mode",
								style: "float:left;margin-top:-2px;padding:0 5px;"
							}, "+"],
							["span", {
								class: "ace_search_counter"
							}],
							["span", {
								action: "toggleRegexpMode",
								class: "ace_button",
								title: "RegExp Search"
							}, ".*"],
							["span", {
								action: "toggleCaseSensitive",
								class: "ace_button",
								title: "CaseSensitive Search"
							}, "Aa"],
							["span", {
								action: "toggleWholeWords",
								class: "ace_button",
								title: "Whole Word Search"
							}, "\\b"],
							["span", {
								action: "searchInSelection",
								class: "ace_button",
								title: "Search In Selection"
							}, "S"]
						]
					], r), this.element = r.firstChild, this.setSession = this.setSession.bind(this), this.$init(), this.setEditor(e), i.importCssString(s, "ace_searchbox", e.container)
				};
				(function () {
					this.setEditor = function (e) {
						e.searchBox = this, e.renderer.scroller.appendChild(this.element), this.editor = e
					}, this.setSession = function (e) {
						this.searchRange = null, this.$syncOptions(!0)
					}, this.$initElements = function (e) {
						this.searchBox = e.querySelector(".ace_search_form"), this.replaceBox = e.querySelector(".ace_replace_form"), this.searchOption = e.querySelector("[action=searchInSelection]"), this.replaceOption = e.querySelector("[action=toggleReplace]"), this.regExpOption = e.querySelector("[action=toggleRegexpMode]"), this.caseSensitiveOption = e.querySelector("[action=toggleCaseSensitive]"), this.wholeWordOption = e.querySelector("[action=toggleWholeWords]"), this.searchInput = this.searchBox.querySelector(".ace_search_field"), this.replaceInput = this.replaceBox.querySelector(".ace_search_field"), this.searchCounter = e.querySelector(".ace_search_counter")
					}, this.$init = function () {
						var e = this.element;
						this.$initElements(e);
						var t = this;
						o.addListener(e, "mousedown", (function (e) {
							setTimeout((function () {
								t.activeInput.focus()
							}), 0), o.stopPropagation(e)
						})), o.addListener(e, "click", (function (e) {
							var n = (e.target || e.srcElement).getAttribute("action");
							n && t[n] ? t[n]() : t.$searchBarKb.commands[n] && t.$searchBarKb.commands[n].exec(t), o.stopPropagation(e)
						})), o.addCommandKeyListener(e, (function (e, n, i) {
							var r = c.keyCodeToString(i),
								s = t.$searchBarKb.findKeyCommand(n, r);
							s && s.exec && (s.exec(t), o.stopEvent(e))
						})), this.$onChange = r.delayedCall((function () {
							t.find(!1, !1)
						})), o.addListener(this.searchInput, "input", (function () {
							t.$onChange.schedule(20)
						})), o.addListener(this.searchInput, "focus", (function () {
							t.activeInput = t.searchInput, t.searchInput.value && t.highlight()
						})), o.addListener(this.replaceInput, "focus", (function () {
							t.activeInput = t.replaceInput, t.searchInput.value && t.highlight()
						}))
					}, this.$closeSearchBarKb = new a([{
						bindKey: "Esc",
						name: "closeSearchBar",
						exec: function (e) {
							e.searchBox.hide()
						}
					}]), this.$searchBarKb = new a, this.$searchBarKb.bindKeys({
						"Ctrl-f|Command-f": function (e) {
							var t = e.isReplace = !e.isReplace;
							e.replaceBox.style.display = t ? "" : "none", e.replaceOption.checked = !1, e.$syncOptions(), e.searchInput.focus()
						},
						"Ctrl-H|Command-Option-F": function (e) {
							e.editor.getReadOnly() || (e.replaceOption.checked = !0, e.$syncOptions(), e.replaceInput.focus())
						},
						"Ctrl-G|Command-G": function (e) {
							e.findNext()
						},
						"Ctrl-Shift-G|Command-Shift-G": function (e) {
							e.findPrev()
						},
						esc: function (e) {
							setTimeout((function () {
								e.hide()
							}))
						},
						Return: function (e) {
							e.activeInput == e.replaceInput && e.replace(), e.findNext()
						},
						"Shift-Return": function (e) {
							e.activeInput == e.replaceInput && e.replace(), e.findPrev()
						},
						"Alt-Return": function (e) {
							e.activeInput == e.replaceInput && e.replaceAll(), e.findAll()
						},
						Tab: function (e) {
							(e.activeInput == e.replaceInput ? e.searchInput : e.replaceInput).focus()
						}
					}), this.$searchBarKb.addCommands([{
						name: "toggleRegexpMode",
						bindKey: {
							win: "Alt-R|Alt-/",
							mac: "Ctrl-Alt-R|Ctrl-Alt-/"
						},
						exec: function (e) {
							e.regExpOption.checked = !e.regExpOption.checked, e.$syncOptions()
						}
					}, {
						name: "toggleCaseSensitive",
						bindKey: {
							win: "Alt-C|Alt-I",
							mac: "Ctrl-Alt-R|Ctrl-Alt-I"
						},
						exec: function (e) {
							e.caseSensitiveOption.checked = !e.caseSensitiveOption.checked, e.$syncOptions()
						}
					}, {
						name: "toggleWholeWords",
						bindKey: {
							win: "Alt-B|Alt-W",
							mac: "Ctrl-Alt-B|Ctrl-Alt-W"
						},
						exec: function (e) {
							e.wholeWordOption.checked = !e.wholeWordOption.checked, e.$syncOptions()
						}
					}, {
						name: "toggleReplace",
						exec: function (e) {
							e.replaceOption.checked = !e.replaceOption.checked, e.$syncOptions()
						}
					}, {
						name: "searchInSelection",
						exec: function (e) {
							e.searchOption.checked = !e.searchRange, e.setSearchRange(e.searchOption.checked && e.editor.getSelectionRange()), e.$syncOptions()
						}
					}]), this.setSearchRange = function (e) {
						this.searchRange = e, e ? this.searchRangeMarker = this.editor.session.addMarker(e, "ace_active-line") : this.searchRangeMarker && (this.editor.session.removeMarker(this.searchRangeMarker), this.searchRangeMarker = null)
					}, this.$syncOptions = function (e) {
						i.setCssClass(this.replaceOption, "checked", this.searchRange), i.setCssClass(this.searchOption, "checked", this.searchOption.checked), this.replaceOption.textContent = this.replaceOption.checked ? "-" : "+", i.setCssClass(this.regExpOption, "checked", this.regExpOption.checked), i.setCssClass(this.wholeWordOption, "checked", this.wholeWordOption.checked), i.setCssClass(this.caseSensitiveOption, "checked", this.caseSensitiveOption.checked);
						var t = this.editor.getReadOnly();
						this.replaceOption.style.display = t ? "none" : "", this.replaceBox.style.display = this.replaceOption.checked && !t ? "" : "none", this.find(!1, !1, e)
					}, this.highlight = function (e) {
						this.editor.session.highlight(e || this.editor.$search.$options.re), this.editor.renderer.updateBackMarkers()
					}, this.find = function (e, t, n) {
						var r = !this.editor.find(this.searchInput.value, {
							skipCurrent: e,
							backwards: t,
							wrap: !0,
							regExp: this.regExpOption.checked,
							caseSensitive: this.caseSensitiveOption.checked,
							wholeWord: this.wholeWordOption.checked,
							preventScroll: n,
							range: this.searchRange
						}) && this.searchInput.value;
						i.setCssClass(this.searchBox, "ace_nomatch", r), this.editor._emit("findSearchBox", {
							match: !r
						}), this.highlight(), this.updateCounter()
					}, this.updateCounter = function () {
						var e = this.editor,
							t = e.$search.$options.re,
							n = 0,
							i = 0;
						if (t) {
							var r = this.searchRange ? e.session.getTextRange(this.searchRange) : e.getValue(),
								o = e.session.doc.positionToIndex(e.selection.anchor);
							this.searchRange && (o -= e.session.doc.positionToIndex(this.searchRange.start));
							for (var s, a = t.lastIndex = 0;
								(s = t.exec(r)) && (n++, (a = s.index) <= o && i++, !(n > 999)) && (s[0] || (t.lastIndex = a += 1, !(a >= r.length))););
						}
						this.searchCounter.textContent = i + " of " + (n > 999 ? "999+" : n)
					}, this.findNext = function () {
						this.find(!0, !1)
					}, this.findPrev = function () {
						this.find(!0, !0)
					}, this.findAll = function () {
						var e = !this.editor.findAll(this.searchInput.value, {
							regExp: this.regExpOption.checked,
							caseSensitive: this.caseSensitiveOption.checked,
							wholeWord: this.wholeWordOption.checked
						}) && this.searchInput.value;
						i.setCssClass(this.searchBox, "ace_nomatch", e), this.editor._emit("findSearchBox", {
							match: !e
						}), this.highlight(), this.hide()
					}, this.replace = function () {
						this.editor.getReadOnly() || this.editor.replace(this.replaceInput.value)
					}, this.replaceAndFindNext = function () {
						this.editor.getReadOnly() || (this.editor.replace(this.replaceInput.value), this.findNext())
					}, this.replaceAll = function () {
						this.editor.getReadOnly() || this.editor.replaceAll(this.replaceInput.value)
					}, this.hide = function () {
						this.active = !1, this.setSearchRange(null), this.editor.off("changeSession", this.setSession), this.element.style.display = "none", this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb), this.editor.focus()
					}, this.show = function (e, t) {
						this.active = !0, this.editor.on("changeSession", this.setSession), this.element.style.display = "", this.replaceOption.checked = t, e && (this.searchInput.value = e), this.searchInput.focus(), this.searchInput.select(), this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb), this.$syncOptions(!0)
					}, this.isFocused = function () {
						var e = document.activeElement;
						return e == this.searchInput || e == this.replaceInput
					}
				}).call(l.prototype), t.SearchBox = l, t.Search = function (e, t) {
					(e.searchBox || new l(e)).show(e.session.getTextRange(), t)
				}
			})), ace.require(["ace/ext/searchbox"], (function (t) {
				e && (e.exports = t)
			}))
		}).call(this, n(0)(e))
	}, function (e, t, n) {
		var i = n(13);
		"string" == typeof i && (i = [
			[e.i, i, ""]
		]);
		var r = {
			insertInto: ("html", "html"),
			hmr: !0,
			transform: void 0
		};
		n(2)(i, r);
		i.locals && (e.exports = i.locals)
	}, function (e, t, n) {
		(t = e.exports = n(1)(!1)).push([e.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400);", ""]), t.push([e.i, ".captureMenuComponent {\n  position: absolute;\n  padding: 7px;\n  z-index: 99999;\n  top: 10px;\n  left: 50%;\n  margin-left: -209px;\n  height: 40px;\n  width: 400px;\n  border: 2px solid #222;\n  background-color: #2c2c2c;\n  visibility: hidden;\n  display: none;\n  color: #f9f9f9;\n  font-family: Consolas, monaco, monospace;\n  font-size: 14px;\n  font-weight: 500; }\n  .captureMenuComponent.active {\n    visibility: visible;\n    display: block; }\n  .captureMenuComponent, .captureMenuComponent:after, .captureMenuComponent:before {\n    box-sizing: content-box; }\n\n.captureMenuLogComponent {\n  position: absolute;\n  padding: 7px;\n  z-index: 80000;\n  top: 66px;\n  left: 50%;\n  margin-left: -209px;\n  height: 40px;\n  width: 400px;\n  border: 2px solid #222;\n  background-color: #2c2c2c;\n  visibility: hidden;\n  display: none;\n  color: #f9f9f9;\n  font-family: Consolas, monaco, monospace;\n  font-size: 14px;\n  font-weight: 500; }\n  .captureMenuLogComponent.active {\n    visibility: visible;\n    display: block; }\n  .captureMenuLogComponent, .captureMenuLogComponent:after, .captureMenuLogComponent:before {\n    box-sizing: content-box; }\n  .captureMenuLogComponent span.error {\n    color: red; }\n\n.canvasListComponent {\n  float: left;\n  width: 50%;\n  height: 100%; }\n  .canvasListComponent [commandName=onCanvasSelection] {\n    vertical-align: center;\n    line-height: 40px;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    width: 190px;\n    display: inline-block;\n    overflow: hidden;\n    margin: 0px 5px; }\n    .canvasListComponent [commandName=onCanvasSelection]:hover {\n      color: #c9c9c9;\n      cursor: pointer;\n      transition: color 0.3s;\n      -webkit-transition: color 0.3s;\n      -moz-transition: color 0.3s; }\n  .canvasListComponent ul {\n    margin: 0px;\n    padding: 7px;\n    list-style: none;\n    position: absolute;\n    top: 54px;\n    left: -2px;\n    width: 400px;\n    border: 2px solid #222;\n    background-color: #2c2c2c; }\n    .canvasListComponent ul li {\n      margin: 5px; }\n      .canvasListComponent ul li:hover {\n        color: #c9c9c9;\n        cursor: pointer;\n        transition: color 0.3s;\n        -webkit-transition: color 0.3s;\n        -moz-transition: color 0.3s; }\n\n.captureMenuActionsComponent {\n  float: left;\n  width: 30%;\n  height: 100%;\n  margin-top: 7.5px; }\n  .captureMenuActionsComponent div {\n    float: left; }\n  .captureMenuActionsComponent [commandName=onCaptureRequested] {\n    border-radius: 50%;\n    background: #2c2c2c;\n    border: 2px solid red;\n    width: 21px;\n    height: 21px; }\n    .captureMenuActionsComponent [commandName=onCaptureRequested]:hover {\n      background: red;\n      cursor: pointer;\n      transition: background 0.3s;\n      -webkit-transition: background 0.3s;\n      -moz-transition: background 0.3s; }\n  .captureMenuActionsComponent [commandName=onPlayRequested], .captureMenuActionsComponent [commandName=onPlayNextFrameRequested] {\n    width: 21px;\n    height: 21px;\n    border: 2px solid #f9f9f9;\n    border-radius: 50%;\n    margin-left: 9px; }\n    .captureMenuActionsComponent [commandName=onPlayRequested]:before, .captureMenuActionsComponent [commandName=onPlayNextFrameRequested]:before {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      margin-top: 6px;\n      margin-left: 4px;\n      width: 7px;\n      height: 7px;\n      border-top: 2px solid #f9f9f9;\n      border-right: 2px solid #f9f9f9;\n      background-color: #f9f9f9;\n      -moz-transform: rotate(45deg);\n      -webkit-transform: rotate(45deg);\n      transform: rotate(45deg);\n      z-index: -20; }\n    .captureMenuActionsComponent [commandName=onPlayRequested]:after, .captureMenuActionsComponent [commandName=onPlayNextFrameRequested]:after {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      width: 8px;\n      height: 20px;\n      background-color: #2c2c2c;\n      z-index: -10; }\n    .captureMenuActionsComponent [commandName=onPlayRequested]:hover, .captureMenuActionsComponent :hover[commandName=onPlayNextFrameRequested] {\n      cursor: pointer;\n      border: 2px solid #c9c9c9;\n      transition: border 0.3s;\n      -webkit-transition: border 0.3s;\n      -moz-transition: border 0.3s; }\n  .captureMenuActionsComponent [commandName=onPauseRequested] {\n    width: 21px;\n    height: 21px;\n    border: 2px solid #f9f9f9;\n    border-radius: 50%;\n    margin-left: 9px; }\n    .captureMenuActionsComponent [commandName=onPauseRequested]:before {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      width: 2px;\n      height: 13px;\n      margin-left: 12px;\n      margin-top: 4px;\n      background-color: #f9f9f9; }\n    .captureMenuActionsComponent [commandName=onPauseRequested]:after {\n      content: '';\n      position: absolute;\n      display: inline-block;\n      width: 2px;\n      height: 13px;\n      margin-left: 7px;\n      margin-top: 4px;\n      background-color: #f9f9f9; }\n    .captureMenuActionsComponent [commandName=onPauseRequested]:hover {\n      cursor: pointer;\n      border: 2px solid #c9c9c9;\n      transition: border 0.3s;\n      -webkit-transition: border 0.3s;\n      -moz-transition: border 0.3s; }\n  .captureMenuActionsComponent [commandName=onPlayNextFrameRequested]:before {\n    background-color: #2c2c2c; }\n\n.fpsCounterComponent {\n  float: left;\n  width: 20%;\n  vertical-align: center;\n  line-height: 40px;\n  white-space: nowrap; }\n", ""])
	}, function (e, t, n) {
		var i = n(15);
		"string" == typeof i && (i = [
			[e.i, i, ""]
		]);
		var r = {
			insertInto: ("html", "html"),
			hmr: !0,
			transform: void 0
		};
		n(2)(i, r);
		i.locals && (e.exports = i.locals)
	}, function (e, t, n) {
		(t = e.exports = n(1)(!1)).push([e.i, "@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400);", ""]), t.push([e.i, "/* The main window */\n.resultViewComponent {\n  position: absolute;\n  z-index: 99999;\n  border: 1px solid black;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: #222;\n  opacity: 1;\n  visibility: hidden;\n  display: none;\n  color: #f9f9f9;\n  font-family: Consolas, monaco, monospace;\n  font-size: 14px;\n  font-weight: 500; }\n  .resultViewComponent.active {\n    visibility: visible;\n    display: block; }\n  .resultViewComponent, .resultViewComponent:after, .resultViewComponent:before {\n    box-sizing: content-box; }\n\n.resultViewMenuComponent {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 13px;\n  font-weight: 300;\n  line-height: 40px;\n  flex: 1 100%;\n  display: flex;\n  flex-flow: row wrap;\n  height: 42px;\n  outline: 0 none;\n  border-bottom: 2px solid #222;\n  box-sizing: border-box;\n  list-style: none;\n  margin: 0;\n  background: #2c2c2c;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-flow: row wrap;\n  flex-flow: row wrap;\n  justify-content: flex-end; }\n  .resultViewMenuComponent .resultViewMenuOpen {\n    display: none;\n    visibility: hidden; }\n  .resultViewMenuComponent a {\n    outline: 0 none;\n    text-decoration: none;\n    display: block;\n    padding: 0 20px 0 20px;\n    color: #cccccc;\n    background: #2c2c2c;\n    box-sizing: border-box;\n    height: 100%; }\n    .resultViewMenuComponent a.active {\n      background: #222;\n      color: white;\n      font-weight: 400;\n      border-bottom: 2px solid #F0640D; }\n    .resultViewMenuComponent a:hover {\n      background: #222;\n      color: #c9c9c9;\n      cursor: pointer;\n      transition: color 0.3s;\n      -webkit-transition: color 0.3s;\n      -moz-transition: color 0.3s; }\n      .resultViewMenuComponent a:hover.active {\n        color: #F0640D;\n        transition: color 0;\n        -webkit-transition: color 0;\n        -moz-transition: color 0; }\n    .resultViewMenuComponent a.clearSearch {\n      padding: 0px;\n      margin-left: -30px;\n      margin-right: 20px;\n      z-index: 9000;\n      color: #f9f9f9; }\n      .resultViewMenuComponent a.clearSearch:hover {\n        background: #2c2c2c;\n        color: #F0640D; }\n  @media all and (max-width: 1024px) {\n    .resultViewMenuComponent {\n      padding: 0px;\n      position: absolute;\n      overflow-y: visible;\n      top: 0px;\n      left: 0px;\n      right: 0px;\n      bottom: 0px;\n      z-index: 999999;\n      display: block; }\n      .resultViewMenuComponent .resultViewMenuOpen {\n        display: block;\n        visibility: visible; }\n      .resultViewMenuComponent li:not(.resultViewMenuSmall) {\n        display: none;\n        visibility: hidden; }\n      .resultViewMenuComponent li {\n        background: #2c2c2c; }\n      .resultViewMenuComponent li.searchContainer {\n        background: #464646; }\n      .resultViewMenuComponent a.active {\n        background: #2c2c2c; } }\n  .resultViewMenuComponent input {\n    border: 0;\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 300;\n    padding: 0 20px 0 20px;\n    background: #464646;\n    color: #f9f9f9;\n    height: 40px;\n    position: relative;\n    top: -1px;\n    box-sizing: border-box; }\n    .resultViewMenuComponent input:focus {\n      border: 0;\n      outline: 0 none; }\n  .resultViewMenuComponent .clearSearch {\n    position: relative;\n    background: transparent;\n    display: inline;\n    padding: 0px;\n    margin-left: -30px;\n    z-index: 9000;\n    color: #F0640D; }\n    .resultViewMenuComponent .clearSearch:hover {\n      background: transparent !important; }\n  .resultViewMenuComponent ::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: #cccccc; }\n  .resultViewMenuComponent :-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    color: #cccccc; }\n  .resultViewMenuComponent ::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    color: #cccccc; }\n  .resultViewMenuComponent :-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: #cccccc; }\n\n.resultViewContentComponent {\n  position: absolute;\n  top: 40px;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n\n.informationColumnLeftComponent {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 50%;\n  overflow: auto;\n  overflow-x: hidden;\n  overflow-y: visible; }\n\n.informationColumnRightComponent {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  bottom: 0;\n  right: 0;\n  overflow: auto;\n  overflow-x: hidden;\n  overflow-y: visible; }\n\n.captureListComponent {\n  position: absolute;\n  top: 40px;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background: #222;\n  z-index: 9000;\n  display: none;\n  visibility: hidden;\n  overflow-y: visible;\n  overflow-x: hidden; }\n  .captureListComponent.active {\n    display: block;\n    visibility: visible; }\n  .captureListComponent .openCaptureFile {\n    border: 1px dashed #f9f9f9;\n    display: block;\n    margin: 5px;\n    padding: 5px;\n    text-align: center;\n    font-style: italic; }\n    .captureListComponent .openCaptureFile span {\n      line-height: 100%;\n      vertical-align: middle; }\n  .captureListComponent ul {\n    margin: 0px;\n    padding: 0px;\n    list-style: none;\n    display: -webkit-box;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-flex-flow: row wrap;\n    flex-flow: row wrap;\n    justify-content: flex-start; }\n    .captureListComponent ul li {\n      margin: 5px;\n      border: 1px solid #606060; }\n      .captureListComponent ul li img {\n        width: 295px;\n        background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9));\n        background-image: -moz-linear-gradient(45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(-45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(45deg, transparent 75%, #d9d9d9 75%), -moz-linear-gradient(-45deg, transparent 75%, #d9d9d9 75%);\n        -webkit-background-size: 50px 51px;\n        -moz-background-size: 50px 50px;\n        background-size: 50px 50px;\n        background-position: 0 0, 25px 0, 25px -25px, 0px 25px;\n        display: block; }\n      .captureListComponent ul li span {\n        display: block;\n        text-align: center;\n        border: 5px solid #222; }\n        .captureListComponent ul li span .captureListItemSave {\n          color: #f9f9f9;\n          font-size: 16px;\n          margin-left: 10px;\n          position: relative;\n          padding: 3px 8px 3px 32px; }\n          .captureListComponent ul li span .captureListItemSave:before, .captureListComponent ul li span .captureListItemSave:after {\n            box-sizing: border-box;\n            content: \"\";\n            position: absolute; }\n          .captureListComponent ul li span .captureListItemSave:before {\n            background: #d9d9d9;\n            border-color: #f9f9f9;\n            border-style: solid;\n            border-width: 7px 2px 1px;\n            border-radius: 1px;\n            height: 16px;\n            left: 8px;\n            top: 5px;\n            width: 16px; }\n          .captureListComponent ul li span .captureListItemSave:after {\n            background: #f9f9f9;\n            border-color: #d9d9d9;\n            border-style: solid;\n            border-width: 1px 1px 1px 4px;\n            height: 5px;\n            left: 13px;\n            top: 5px;\n            width: 7px; }\n      .captureListComponent ul li:hover {\n        cursor: pointer; }\n      .captureListComponent ul li.active span {\n        background: #F0640D;\n        border: 5px solid #F0640D; }\n        .captureListComponent ul li.active span .captureListItemSave:before {\n          background: #F0640D; }\n        .captureListComponent ul li.active span .captureListItemSave:after {\n          border-color: #F0640D; }\n\n.visualStateListComponent {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  padding: 5px;\n  right: 80%;\n  overflow-y: visible;\n  overflow-x: hidden; }\n  .visualStateListComponent ul {\n    margin: 0px;\n    padding: 0px;\n    list-style: none; }\n    .visualStateListComponent ul li {\n      margin: 20px 15px 0px 15px;\n      border: 1px solid #606060; }\n      .visualStateListComponent ul li img {\n        display: block;\n        padding: 0px;\n        box-sizing: border-box;\n        max-height: 600px;\n        width: 100%;\n        margin: 0 auto;\n        background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9));\n        background-image: -moz-linear-gradient(45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(-45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(45deg, transparent 75%, #d9d9d9 75%), -moz-linear-gradient(-45deg, transparent 75%, #d9d9d9 75%);\n        -webkit-background-size: 50px 51px;\n        -moz-background-size: 50px 50px;\n        background-size: 50px 50px;\n        background-position: 0 0, 25px 0, 25px -25px, 0px 25px; }\n      .visualStateListComponent ul li:hover {\n        cursor: pointer; }\n      .visualStateListComponent ul li span {\n        border: 5px solid #222;\n        background: #222;\n        box-sizing: border-box;\n        display: inline-block;\n        width: 100%;\n        margin: 0px;\n        padding: 5px;\n        word-wrap: break-word; }\n      .visualStateListComponent ul li.active {\n        border: 2px solid #F0640D; }\n\n.commandListComponent {\n  position: absolute;\n  top: 0;\n  left: 20%;\n  right: 40%;\n  bottom: 0;\n  color: lightgray; }\n  .commandListComponent ul {\n    margin: 0px;\n    padding: 0px;\n    list-style: none;\n    overflow-y: visible;\n    overflow-x: hidden;\n    height: 100%; }\n    .commandListComponent ul li {\n      padding: 8px; }\n      .commandListComponent ul li span {\n        word-wrap: break-word;\n        line-height: 22px; }\n      .commandListComponent ul li:hover {\n        color: #f9f9f9;\n        cursor: pointer;\n        transition: color 0.3s;\n        -webkit-transition: color 0.3s;\n        -moz-transition: color 0.3s; }\n      .commandListComponent ul li:nth-child(even) {\n        background: #2c2c2c; }\n      .commandListComponent ul li:nth-child(odd) {\n        background: #222; }\n      .commandListComponent ul li .important {\n        font-weight: 800; }\n        .commandListComponent ul li .important.deprecated {\n          color: red; }\n        .commandListComponent ul li .important.unused {\n          color: yellow; }\n        .commandListComponent ul li .important.disabled {\n          color: gray; }\n        .commandListComponent ul li .important.redundant {\n          color: orange; }\n        .commandListComponent ul li .important.valid {\n          color: greenyellow; }\n      .commandListComponent ul li .marker {\n        font-size: 16px;\n        font-weight: 900;\n        color: greenyellow; }\n      .commandListComponent ul li.active {\n        background: #f37628;\n        color: #222; }\n      .commandListComponent ul li.drawCall {\n        background: #5db0d7;\n        color: #222; }\n      .commandListComponent ul li a {\n        margin-left: 5px;\n        margin-right: 5px;\n        color: #5db0d7;\n        background: #222;\n        padding: 5px;\n        font-weight: 900;\n        display: inline-block; }\n\n.commandDetailComponent {\n  position: absolute;\n  top: 0;\n  left: 60%;\n  right: 0;\n  bottom: 0;\n  overflow-y: visible;\n  overflow-x: hidden; }\n\n.jsonGroupComponent {\n  display: block;\n  margin: 10px;\n  padding: 10px;\n  padding-bottom: 5px; }\n  .jsonGroupComponent .jsonGroupComponentTitle {\n    display: block;\n    font-size: 16px;\n    color: #5db0d7;\n    border-bottom: 1px solid #5db0d7;\n    padding-bottom: 5px;\n    margin-bottom: 5px;\n    text-transform: capitalize; }\n  .jsonGroupComponent ul {\n    margin: 0px;\n    padding: 0px;\n    list-style: none; }\n    .jsonGroupComponent ul li:nth-child(even) {\n      background: #222; }\n    .jsonGroupComponent ul li:nth-child(odd) {\n      background: #222; }\n\n.jsonItemComponentKey {\n  color: #F0640D; }\n\n.jsonItemComponentValue {\n  white-space: pre-wrap; }\n\n.jsonItemImageHolder {\n  width: 50%;\n  margin: auto; }\n  .jsonItemImageHolder .jsonItemImage {\n    margin: 5px;\n    display: block;\n    border: 1px solid #606060;\n    width: 100%; }\n    .jsonItemImageHolder .jsonItemImage img {\n      width: 100%;\n      display: block;\n      margin: auto;\n      max-width: 256px;\n      background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9));\n      background-image: -moz-linear-gradient(45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(-45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(45deg, transparent 75%, #d9d9d9 75%), -moz-linear-gradient(-45deg, transparent 75%, #d9d9d9 75%);\n      -webkit-background-size: 50px 51px;\n      -moz-background-size: 50px 50px;\n      background-size: 50px 50px;\n      background-position: 0 0, 25px 0, 25px -25px, 0px 25px; }\n    .jsonItemImageHolder .jsonItemImage span {\n      margin: 0px;\n      padding: 5px;\n      word-wrap: break-word;\n      display: inline-block;\n      width: 100%;\n      box-sizing: border-box; }\n\n[commandName=onOpenSourceClicked]:hover {\n  color: #f9f9f9;\n  cursor: pointer;\n  transition: color 0.3s;\n  -webkit-transition: color 0.3s;\n  -moz-transition: color 0.3s; }\n\n.jsonVisualStateItemComponent {\n  text-align: center;\n  padding: 10px; }\n  .jsonVisualStateItemComponent img {\n    background-image: -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.25, #c9c9c9), color-stop(0.25, transparent)), -webkit-gradient(linear, 0 100%, 100% 0, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9)), -webkit-gradient(linear, 0 0, 100% 100%, color-stop(0.75, transparent), color-stop(0.75, #c9c9c9));\n    background-image: -moz-linear-gradient(45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(-45deg, #d9d9d9 25%, transparent 25%), -moz-linear-gradient(45deg, transparent 75%, #d9d9d9 75%), -moz-linear-gradient(-45deg, transparent 75%, #d9d9d9 75%);\n    -webkit-background-size: 50px 51px;\n    -moz-background-size: 50px 50px;\n    background-size: 50px 50px;\n    background-position: 0 0, 25px 0, 25px -25px, 0px 25px;\n    border: 1px solid #606060;\n    margin: 5px;\n    width: 100%;\n    max-width: 512px;\n    max-height: 800px; }\n  .jsonVisualStateItemComponent span {\n    display: block; }\n\n.jsonContentComponent {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 10px;\n  overflow-y: visible;\n  overflow-x: hidden; }\n\n.jsonItemComponentValue {\n  word-break: break-all;\n  white-space: normal; }\n\n.jsonSourceItemComponentOpen {\n  font-weight: bold;\n  color: #5db0d7;\n  text-decoration: underline; }\n\n.sourceCodeMenuComponentContainer {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 40%; }\n\n.sourceCodeMenuComponent {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 13px;\n  font-weight: 300;\n  line-height: 40px;\n  flex: 1 100%;\n  display: flex;\n  flex-flow: row wrap;\n  height: 42px;\n  outline: 0 none;\n  border-bottom: 2px solid #222;\n  box-sizing: border-box;\n  list-style: none;\n  margin: 0;\n  background: #2c2c2c;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-flow: row wrap;\n  flex-flow: row wrap;\n  justify-content: flex-end; }\n  .sourceCodeMenuComponent .resultViewMenuOpen {\n    display: none;\n    visibility: hidden; }\n  .sourceCodeMenuComponent a {\n    outline: 0 none;\n    text-decoration: none;\n    display: block;\n    padding: 0 20px 0 20px;\n    color: #cccccc;\n    background: #2c2c2c;\n    box-sizing: border-box;\n    height: 100%; }\n    .sourceCodeMenuComponent a.active {\n      background: #222;\n      color: white;\n      font-weight: 400;\n      border-bottom: 2px solid #F0640D; }\n    .sourceCodeMenuComponent a:hover {\n      background: #222;\n      color: #c9c9c9;\n      cursor: pointer;\n      transition: color 0.3s;\n      -webkit-transition: color 0.3s;\n      -moz-transition: color 0.3s; }\n      .sourceCodeMenuComponent a:hover.active {\n        color: #F0640D;\n        transition: color 0;\n        -webkit-transition: color 0;\n        -moz-transition: color 0; }\n    .sourceCodeMenuComponent a.clearSearch {\n      display: inline-block;\n      padding: 0px;\n      margin-left: -30px;\n      margin-right: 20px;\n      z-index: 9000;\n      color: #f9f9f9; }\n      .sourceCodeMenuComponent a.clearSearch:hover {\n        background: #2c2c2c;\n        color: #F0640D; }\n  .sourceCodeMenuComponent input {\n    border: 0;\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 300;\n    padding: 0 20px 0 20px;\n    background: #464646;\n    color: #f9f9f9;\n    height: 100%;\n    position: relative;\n    top: -1px;\n    box-sizing: border-box; }\n    .sourceCodeMenuComponent input:focus {\n      border: 0;\n      outline: 0 none; }\n  .sourceCodeMenuComponent .clearSearch {\n    position: relative;\n    background: transparent;\n    display: inline;\n    padding: 0px;\n    margin-left: -30px;\n    z-index: 9000;\n    color: #F0640D; }\n    .sourceCodeMenuComponent .clearSearch:hover {\n      background: transparent !important; }\n  .sourceCodeMenuComponent ::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: #cccccc; }\n  .sourceCodeMenuComponent :-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    color: #cccccc; }\n  .sourceCodeMenuComponent ::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    color: #cccccc; }\n  .sourceCodeMenuComponent :-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: #cccccc; }\n\n.sourceCodeComponent {\n  position: absolute;\n  top: 42px;\n  left: 0;\n  bottom: 0;\n  right: 40%;\n  background: #222;\n  z-index: 9000;\n  overflow-x: visible;\n  overflow: auto; }\n  .sourceCodeComponent .sourceCodeComponentTitle {\n    font-size: 16px;\n    font-weight: 800;\n    line-height: 50px;\n    color: #F0640D;\n    padding: 1em;\n    margin: .5em 0; }\n", ""])
	}, function (e, t, n) {
		"use strict";
		n.r(t);
		var i, r = function () {
			function e() {}
			return e.isBuildableProgram = function (e) {
				return !!e && !!e[this.rebuildProgramFunctionName]
			}, e.rebuildProgram = function (e, t, n, i, r) {
				this.isBuildableProgram(e) && e[this.rebuildProgramFunctionName](t, n, i, r)
			}, e.rebuildProgramFunctionName = "__SPECTOR_rebuildProgram", e
		}();
		! function (e) {
			e[e.noLog = 0] = "noLog", e[e.error = 1] = "error", e[e.warning = 2] = "warning", e[e.info = 3] = "info"
		}(i || (i = {}));
		var o = function () {
				function e() {}
				return e.error = function (e) {
					for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
					this.level > 0 && console.error(e, t)
				}, e.warn = function (e) {
					for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
					this.level > 1 && console.warn(e, t)
				}, e.info = function (e) {
					for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
					this.level > 2 && console.log(e, t)
				}, e.level = i.warning, e
			}(),
			s = function () {
				function e() {
					this.callbacks = [], this.counter = -1
				}
				return e.prototype.add = function (e, t) {
					return this.counter++, t && (e = e.bind(t)), this.callbacks[this.counter] = e, this.counter
				}, e.prototype.remove = function (e) {
					delete this.callbacks[e]
				}, e.prototype.clear = function () {
					this.callbacks = {}
				}, e.prototype.trigger = function (e) {
					for (var t in this.callbacks) this.callbacks.hasOwnProperty(t) && this.callbacks[t](e)
				}, e
			}(),
			a = function () {
				function e() {
					if (window.performance && window.performance.now) this.nowFunction = this.dateBasedPerformanceNow.bind(this);
					else {
						var e = new Date;
						this.nowFunction = e.getTime.bind(e)
					}
				}
				return e.prototype.dateBasedPerformanceNow = function () {
					return performance.timing.navigationStart + performance.now()
				}, Object.defineProperty(e, "now", {
					get: function () {
						return e.instance.nowFunction()
					},
					enumerable: !0,
					configurable: !0
				}), e.instance = new e, e
			}();
		var c, l = function () {
				function e(e) {
					this.options = e
				}
				return e.prototype.appendAnalysis = function (e) {
					e.analyses = e.analyses || [];
					var t = this.getAnalysis(e);
					e.analyses.push(t)
				}, e.prototype.getAnalysis = function (e) {
					var t = {
						analyserName: this.analyserName
					};
					return this.appendToAnalysis(e, t), t
				}, e
			}(),
			u = (c = function (e, t) {
				return (c = Object.setPrototypeOf || {
						__proto__: []
					}
					instanceof Array && function (e, t) {
						e.__proto__ = t
					} || function (e, t) {
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
					})(e, t)
			}, function (e, t) {
				function n() {
					this.constructor = e
				}
				c(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
			}),
			h = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return u(t, e), Object.defineProperty(t.prototype, "analyserName", {
					get: function () {
						return t.analyserName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.appendToAnalysis = function (e, t) {
					if (e.commands) {
						for (var n = {}, i = 0, r = e.commands; i < r.length; i++) {
							var o = r[i];
							n[o.name] = n[o.name] || 0, n[o.name]++
						}
						var s = Object.keys(n).map((function (e) {
							return [e, n[e]]
						}));
						s.sort((function (e, t) {
							var n = t[1] - e[1];
							return 0 === n ? e[0].localeCompare(t[0]) : n
						}));
						for (var a = 0, c = s; a < c.length; a++) {
							var l = c[a];
							t[l[0]] = l[1]
						}
					}
				}, t.analyserName = "Commands", t
			}(l),
			d = ["drawArrays", "drawElements", "drawArraysInstanced", "drawArraysInstancedANGLE", "drawElementsInstanced", "drawElementsInstancedANGLE", "drawRangeElements"],
			p = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			m = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return p(t, e), Object.defineProperty(t.prototype, "analyserName", {
					get: function () {
						return t.analyserName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.appendToAnalysis = function (e, t) {
					if (e.commands) {
						t.total = e.commands.length, t.draw = 0, t.clear = 0;
						for (var n = 0, i = e.commands; n < i.length; n++) {
							var r = i[n];
							"clear" === r.name ? t.clear++ : d.indexOf(r.name) > -1 && t.draw++
						}
					}
				}, t.analyserName = "CommandsSummary", t
			}(l),
			f = function () {
				function e() {}
				return e.isWebGlConstant = function (e) {
					return null !== v[e] && void 0 !== v[e]
				}, e.stringifyWebGlConstant = function (e, t) {
					if (0 === e) return this.zeroMeaningByCommand[t] || "0";
					if (1 === e) return this.oneMeaningByCommand[t] || "1";
					var n = v[e];
					return n ? n.name : e + ""
				}, e.DEPTH_BUFFER_BIT = {
					name: "DEPTH_BUFFER_BIT",
					value: 256,
					description: "Passed to clear to clear the current depth buffer."
				}, e.STENCIL_BUFFER_BIT = {
					name: "STENCIL_BUFFER_BIT",
					value: 1024,
					description: "Passed to clear to clear the current stencil buffer."
				}, e.COLOR_BUFFER_BIT = {
					name: "COLOR_BUFFER_BIT",
					value: 16384,
					description: "Passed to clear to clear the current color buffer."
				}, e.POINTS = {
					name: "POINTS",
					value: 0,
					description: "Passed to drawElements or drawArrays to draw single points."
				}, e.LINES = {
					name: "LINES",
					value: 1,
					description: "Passed to drawElements or drawArrays to draw lines. Each vertex connects to the one after it."
				}, e.LINE_LOOP = {
					name: "LINE_LOOP",
					value: 2,
					description: "Passed to drawElements or drawArrays to draw lines. Each set of two vertices is treated as a separate line segment."
				}, e.LINE_STRIP = {
					name: "LINE_STRIP",
					value: 3,
					description: "Passed to drawElements or drawArrays to draw a connected group of line segments from the first vertex to the last."
				}, e.TRIANGLES = {
					name: "TRIANGLES",
					value: 4,
					description: "Passed to drawElements or drawArrays to draw triangles. Each set of three vertices creates a separate triangle."
				}, e.TRIANGLE_STRIP = {
					name: "TRIANGLE_STRIP",
					value: 5,
					description: "Passed to drawElements or drawArrays to draw a connected group of triangles."
				}, e.TRIANGLE_FAN = {
					name: "TRIANGLE_FAN",
					value: 6,
					description: "Passed to drawElements or drawArrays to draw a connected group of triangles. Each vertex connects to the previous and the first vertex in the fan."
				}, e.ZERO = {
					name: "ZERO",
					value: 0,
					description: "Passed to blendFunc or blendFuncSeparate to turn off a component."
				}, e.ONE = {
					name: "ONE",
					value: 1,
					description: "Passed to blendFunc or blendFuncSeparate to turn on a component."
				}, e.SRC_COLOR = {
					name: "SRC_COLOR",
					value: 768,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by the source elements color."
				}, e.ONE_MINUS_SRC_COLOR = {
					name: "ONE_MINUS_SRC_COLOR",
					value: 769,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source elements color."
				}, e.SRC_ALPHA = {
					name: "SRC_ALPHA",
					value: 770,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by the source's alpha."
				}, e.ONE_MINUS_SRC_ALPHA = {
					name: "ONE_MINUS_SRC_ALPHA",
					value: 771,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the source's alpha."
				}, e.DST_ALPHA = {
					name: "DST_ALPHA",
					value: 772,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's alpha."
				}, e.ONE_MINUS_DST_ALPHA = {
					name: "ONE_MINUS_DST_ALPHA",
					value: 773,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's alpha."
				}, e.DST_COLOR = {
					name: "DST_COLOR",
					value: 774,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by the destination's color."
				}, e.ONE_MINUS_DST_COLOR = {
					name: "ONE_MINUS_DST_COLOR",
					value: 775,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by one minus the destination's color."
				}, e.SRC_ALPHA_SATURATE = {
					name: "SRC_ALPHA_SATURATE",
					value: 776,
					description: "Passed to blendFunc or blendFuncSeparate to multiply a component by the minimum of source's alpha or one minus the destination's alpha."
				}, e.CONSTANT_COLOR = {
					name: "CONSTANT_COLOR",
					value: 32769,
					description: "Passed to blendFunc or blendFuncSeparate to specify a constant color blend function."
				}, e.ONE_MINUS_CONSTANT_COLOR = {
					name: "ONE_MINUS_CONSTANT_COLOR",
					value: 32770,
					description: "Passed to blendFunc or blendFuncSeparate to specify one minus a constant color blend function."
				}, e.CONSTANT_ALPHA = {
					name: "CONSTANT_ALPHA",
					value: 32771,
					description: "Passed to blendFunc or blendFuncSeparate to specify a constant alpha blend function."
				}, e.ONE_MINUS_CONSTANT_ALPHA = {
					name: "ONE_MINUS_CONSTANT_ALPHA",
					value: 32772,
					description: "Passed to blendFunc or blendFuncSeparate to specify one minus a constant alpha blend function."
				}, e.FUNC_ADD = {
					name: "FUNC_ADD",
					value: 32774,
					description: "Passed to blendEquation or blendEquationSeparate to set an addition blend function."
				}, e.FUNC_SUBSTRACT = {
					name: "FUNC_SUBSTRACT",
					value: 32778,
					description: "Passed to blendEquation or blendEquationSeparate to specify a subtraction blend function (source - destination)."
				}, e.FUNC_REVERSE_SUBTRACT = {
					name: "FUNC_REVERSE_SUBTRACT",
					value: 32779,
					description: "Passed to blendEquation or blendEquationSeparate to specify a reverse subtraction blend function (destination - source)."
				}, e.BLEND_EQUATION = {
					name: "BLEND_EQUATION",
					value: 32777,
					description: "Passed to getParameter to get the current RGB blend function."
				}, e.BLEND_EQUATION_RGB = {
					name: "BLEND_EQUATION_RGB",
					value: 32777,
					description: "Passed to getParameter to get the current RGB blend function. Same as BLEND_EQUATION"
				}, e.BLEND_EQUATION_ALPHA = {
					name: "BLEND_EQUATION_ALPHA",
					value: 34877,
					description: "Passed to getParameter to get the current alpha blend function. Same as BLEND_EQUATION"
				}, e.BLEND_DST_RGB = {
					name: "BLEND_DST_RGB",
					value: 32968,
					description: "Passed to getParameter to get the current destination RGB blend function."
				}, e.BLEND_SRC_RGB = {
					name: "BLEND_SRC_RGB",
					value: 32969,
					description: "Passed to getParameter to get the current destination RGB blend function."
				}, e.BLEND_DST_ALPHA = {
					name: "BLEND_DST_ALPHA",
					value: 32970,
					description: "Passed to getParameter to get the current destination alpha blend function."
				}, e.BLEND_SRC_ALPHA = {
					name: "BLEND_SRC_ALPHA",
					value: 32971,
					description: "Passed to getParameter to get the current source alpha blend function."
				}, e.BLEND_COLOR = {
					name: "BLEND_COLOR",
					value: 32773,
					description: "Passed to getParameter to return a the current blend color."
				}, e.ARRAY_BUFFER_BINDING = {
					name: "ARRAY_BUFFER_BINDING",
					value: 34964,
					description: "Passed to getParameter to get the array buffer binding."
				}, e.ELEMENT_ARRAY_BUFFER_BINDING = {
					name: "ELEMENT_ARRAY_BUFFER_BINDING",
					value: 34965,
					description: "Passed to getParameter to get the current element array buffer."
				}, e.LINE_WIDTH = {
					name: "LINE_WIDTH",
					value: 2849,
					description: "Passed to getParameter to get the current lineWidth (set by the lineWidth method)."
				}, e.ALIASED_POINT_SIZE_RANGE = {
					name: "ALIASED_POINT_SIZE_RANGE",
					value: 33901,
					description: "Passed to getParameter to get the current size of a point drawn with gl.POINTS"
				}, e.ALIASED_LINE_WIDTH_RANGE = {
					name: "ALIASED_LINE_WIDTH_RANGE",
					value: 33902,
					description: "Passed to getParameter to get the range of available widths for a line. Returns a length-2 array with the lo value at 0, and hight at 1."
				}, e.CULL_FACE_MODE = {
					name: "CULL_FACE_MODE",
					value: 2885,
					description: "Passed to getParameter to get the current value of cullFace. Should return FRONT, BACK, or FRONT_AND_BACK"
				}, e.FRONT_FACE = {
					name: "FRONT_FACE",
					value: 2886,
					description: "Passed to getParameter to determine the current value of frontFace. Should return CW or CCW."
				}, e.DEPTH_RANGE = {
					name: "DEPTH_RANGE",
					value: 2928,
					description: "Passed to getParameter to return a length-2 array of floats giving the current depth range."
				}, e.DEPTH_WRITEMASK = {
					name: "DEPTH_WRITEMASK",
					value: 2930,
					description: "Passed to getParameter to determine if the depth write mask is enabled."
				}, e.DEPTH_CLEAR_VALUE = {
					name: "DEPTH_CLEAR_VALUE",
					value: 2931,
					description: "Passed to getParameter to determine the current depth clear value."
				}, e.DEPTH_FUNC = {
					name: "DEPTH_FUNC",
					value: 2932,
					description: "Passed to getParameter to get the current depth function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL."
				}, e.STENCIL_CLEAR_VALUE = {
					name: "STENCIL_CLEAR_VALUE",
					value: 2961,
					description: "Passed to getParameter to get the value the stencil will be cleared to."
				}, e.STENCIL_FUNC = {
					name: "STENCIL_FUNC",
					value: 2962,
					description: "Passed to getParameter to get the current stencil function. Returns NEVER, ALWAYS, LESS, EQUAL, LEQUAL, GREATER, GEQUAL, or NOTEQUAL."
				}, e.STENCIL_FAIL = {
					name: "STENCIL_FAIL",
					value: 2964,
					description: "Passed to getParameter to get the current stencil fail function. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP."
				}, e.STENCIL_PASS_DEPTH_FAIL = {
					name: "STENCIL_PASS_DEPTH_FAIL",
					value: 2965,
					description: "Passed to getParameter to get the current stencil fail function should the depth buffer test fail. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP."
				}, e.STENCIL_PASS_DEPTH_PASS = {
					name: "STENCIL_PASS_DEPTH_PASS",
					value: 2966,
					description: "Passed to getParameter to get the current stencil fail function should the depth buffer test pass. Should return KEEP, REPLACE, INCR, DECR, INVERT, INCR_WRAP, or DECR_WRAP."
				}, e.STENCIL_REF = {
					name: "STENCIL_REF",
					value: 2967,
					description: "Passed to getParameter to get the reference value used for stencil tests."
				}, e.STENCIL_VALUE_MASK = {
					name: "STENCIL_VALUE_MASK",
					value: 2963,
					description: " "
				}, e.STENCIL_WRITEMASK = {
					name: "STENCIL_WRITEMASK",
					value: 2968,
					description: " "
				}, e.STENCIL_BACK_FUNC = {
					name: "STENCIL_BACK_FUNC",
					value: 34816,
					description: " "
				}, e.STENCIL_BACK_FAIL = {
					name: "STENCIL_BACK_FAIL",
					value: 34817,
					description: " "
				}, e.STENCIL_BACK_PASS_DEPTH_FAIL = {
					name: "STENCIL_BACK_PASS_DEPTH_FAIL",
					value: 34818,
					description: " "
				}, e.STENCIL_BACK_PASS_DEPTH_PASS = {
					name: "STENCIL_BACK_PASS_DEPTH_PASS",
					value: 34819,
					description: " "
				}, e.STENCIL_BACK_REF = {
					name: "STENCIL_BACK_REF",
					value: 36003,
					description: " "
				}, e.STENCIL_BACK_VALUE_MASK = {
					name: "STENCIL_BACK_VALUE_MASK",
					value: 36004,
					description: " "
				}, e.STENCIL_BACK_WRITEMASK = {
					name: "STENCIL_BACK_WRITEMASK",
					value: 36005,
					description: " "
				}, e.VIEWPORT = {
					name: "VIEWPORT",
					value: 2978,
					description: "Returns an Int32Array with four elements for the current viewport dimensions."
				}, e.SCISSOR_BOX = {
					name: "SCISSOR_BOX",
					value: 3088,
					description: "Returns an Int32Array with four elements for the current scissor box dimensions."
				}, e.COLOR_CLEAR_VALUE = {
					name: "COLOR_CLEAR_VALUE",
					value: 3106,
					description: " "
				}, e.COLOR_WRITEMASK = {
					name: "COLOR_WRITEMASK",
					value: 3107,
					description: " "
				}, e.UNPACK_ALIGNMENT = {
					name: "UNPACK_ALIGNMENT",
					value: 3317,
					description: " "
				}, e.PACK_ALIGNMENT = {
					name: "PACK_ALIGNMENT",
					value: 3333,
					description: " "
				}, e.MAX_TEXTURE_SIZE = {
					name: "MAX_TEXTURE_SIZE",
					value: 3379,
					description: " "
				}, e.MAX_VIEWPORT_DIMS = {
					name: "MAX_VIEWPORT_DIMS",
					value: 3386,
					description: " "
				}, e.SUBPIXEL_BITS = {
					name: "SUBPIXEL_BITS",
					value: 3408,
					description: " "
				}, e.RED_BITS = {
					name: "RED_BITS",
					value: 3410,
					description: " "
				}, e.GREEN_BITS = {
					name: "GREEN_BITS",
					value: 3411,
					description: " "
				}, e.BLUE_BITS = {
					name: "BLUE_BITS",
					value: 3412,
					description: " "
				}, e.ALPHA_BITS = {
					name: "ALPHA_BITS",
					value: 3413,
					description: " "
				}, e.DEPTH_BITS = {
					name: "DEPTH_BITS",
					value: 3414,
					description: " "
				}, e.STENCIL_BITS = {
					name: "STENCIL_BITS",
					value: 3415,
					description: " "
				}, e.POLYGON_OFFSET_UNITS = {
					name: "POLYGON_OFFSET_UNITS",
					value: 10752,
					description: " "
				}, e.POLYGON_OFFSET_FACTOR = {
					name: "POLYGON_OFFSET_FACTOR",
					value: 32824,
					description: " "
				}, e.TEXTURE_BINDING_2D = {
					name: "TEXTURE_BINDING_2D",
					value: 32873,
					description: " "
				}, e.SAMPLE_BUFFERS = {
					name: "SAMPLE_BUFFERS",
					value: 32936,
					description: " "
				}, e.SAMPLES = {
					name: "SAMPLES",
					value: 32937,
					description: " "
				}, e.SAMPLE_COVERAGE_VALUE = {
					name: "SAMPLE_COVERAGE_VALUE",
					value: 32938,
					description: " "
				}, e.SAMPLE_COVERAGE_INVERT = {
					name: "SAMPLE_COVERAGE_INVERT",
					value: 32939,
					description: " "
				}, e.COMPRESSED_TEXTURE_FORMATS = {
					name: "COMPRESSED_TEXTURE_FORMATS",
					value: 34467,
					description: " "
				}, e.VENDOR = {
					name: "VENDOR",
					value: 7936,
					description: " "
				}, e.RENDERER = {
					name: "RENDERER",
					value: 7937,
					description: " "
				}, e.VERSION = {
					name: "VERSION",
					value: 7938,
					description: " "
				}, e.IMPLEMENTATION_COLOR_READ_TYPE = {
					name: "IMPLEMENTATION_COLOR_READ_TYPE",
					value: 35738,
					description: " "
				}, e.IMPLEMENTATION_COLOR_READ_FORMAT = {
					name: "IMPLEMENTATION_COLOR_READ_FORMAT",
					value: 35739,
					description: " "
				}, e.BROWSER_DEFAULT_WEBGL = {
					name: "BROWSER_DEFAULT_WEBGL",
					value: 37444,
					description: " "
				}, e.STATIC_DRAW = {
					name: "STATIC_DRAW",
					value: 35044,
					description: "Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and not change often."
				}, e.STREAM_DRAW = {
					name: "STREAM_DRAW",
					value: 35040,
					description: "Passed to bufferData as a hint about whether the contents of the buffer are likely to not be used often."
				}, e.DYNAMIC_DRAW = {
					name: "DYNAMIC_DRAW",
					value: 35048,
					description: "Passed to bufferData as a hint about whether the contents of the buffer are likely to be used often and change often."
				}, e.ARRAY_BUFFER = {
					name: "ARRAY_BUFFER",
					value: 34962,
					description: "Passed to bindBuffer or bufferData to specify the type of buffer being used."
				}, e.ELEMENT_ARRAY_BUFFER = {
					name: "ELEMENT_ARRAY_BUFFER",
					value: 34963,
					description: "Passed to bindBuffer or bufferData to specify the type of buffer being used."
				}, e.BUFFER_SIZE = {
					name: "BUFFER_SIZE",
					value: 34660,
					description: "Passed to getBufferParameter to get a buffer's size."
				}, e.BUFFER_USAGE = {
					name: "BUFFER_USAGE",
					value: 34661,
					description: "Passed to getBufferParameter to get the hint for the buffer passed in when it was created."
				}, e.CURRENT_VERTEX_ATTRIB = {
					name: "CURRENT_VERTEX_ATTRIB",
					value: 34342,
					description: "Passed to getVertexAttrib to read back the current vertex attribute."
				}, e.VERTEX_ATTRIB_ARRAY_ENABLED = {
					name: "VERTEX_ATTRIB_ARRAY_ENABLED",
					value: 34338,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_SIZE = {
					name: "VERTEX_ATTRIB_ARRAY_SIZE",
					value: 34339,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_STRIDE = {
					name: "VERTEX_ATTRIB_ARRAY_STRIDE",
					value: 34340,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_TYPE = {
					name: "VERTEX_ATTRIB_ARRAY_TYPE",
					value: 34341,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_NORMALIZED = {
					name: "VERTEX_ATTRIB_ARRAY_NORMALIZED",
					value: 34922,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_POINTER = {
					name: "VERTEX_ATTRIB_ARRAY_POINTER",
					value: 34373,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = {
					name: "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
					value: 34975,
					description: " "
				}, e.CULL_FACE = {
					name: "CULL_FACE",
					value: 2884,
					description: "Passed to enable/disable to turn on/off culling. Can also be used with getParameter to find the current culling method."
				}, e.FRONT = {
					name: "FRONT",
					value: 1028,
					description: "Passed to cullFace to specify that only front faces should be drawn."
				}, e.BACK = {
					name: "BACK",
					value: 1029,
					description: "Passed to cullFace to specify that only back faces should be drawn."
				}, e.FRONT_AND_BACK = {
					name: "FRONT_AND_BACK",
					value: 1032,
					description: "Passed to cullFace to specify that front and back faces should be drawn."
				}, e.BLEND = {
					name: "BLEND",
					value: 3042,
					description: "Passed to enable/disable to turn on/off blending. Can also be used with getParameter to find the current blending method."
				}, e.DEPTH_TEST = {
					name: "DEPTH_TEST",
					value: 2929,
					description: "Passed to enable/disable to turn on/off the depth test. Can also be used with getParameter to query the depth test."
				}, e.DITHER = {
					name: "DITHER",
					value: 3024,
					description: "Passed to enable/disable to turn on/off dithering. Can also be used with getParameter to find the current dithering method."
				}, e.POLYGON_OFFSET_FILL = {
					name: "POLYGON_OFFSET_FILL",
					value: 32823,
					description: "Passed to enable/disable to turn on/off the polygon offset. Useful for rendering hidden-line images, decals, and or solids with highlighted edges. Can also be used with getParameter to query the scissor test."
				}, e.SAMPLE_ALPHA_TO_COVERAGE = {
					name: "SAMPLE_ALPHA_TO_COVERAGE",
					value: 32926,
					description: "Passed to enable/disable to turn on/off the alpha to coverage. Used in multi-sampling alpha channels."
				}, e.SAMPLE_COVERAGE = {
					name: "SAMPLE_COVERAGE",
					value: 32928,
					description: "Passed to enable/disable to turn on/off the sample coverage. Used in multi-sampling."
				}, e.SCISSOR_TEST = {
					name: "SCISSOR_TEST",
					value: 3089,
					description: "Passed to enable/disable to turn on/off the scissor test. Can also be used with getParameter to query the scissor test."
				}, e.STENCIL_TEST = {
					name: "STENCIL_TEST",
					value: 2960,
					description: "Passed to enable/disable to turn on/off the stencil test. Can also be used with getParameter to query the stencil test."
				}, e.NO_ERROR = {
					name: "NO_ERROR",
					value: 0,
					description: "Returned from getError."
				}, e.INVALID_ENUM = {
					name: "INVALID_ENUM",
					value: 1280,
					description: "Returned from getError."
				}, e.INVALID_VALUE = {
					name: "INVALID_VALUE",
					value: 1281,
					description: "Returned from getError."
				}, e.INVALID_OPERATION = {
					name: "INVALID_OPERATION",
					value: 1282,
					description: "Returned from getError."
				}, e.OUT_OF_MEMORY = {
					name: "OUT_OF_MEMORY",
					value: 1285,
					description: "Returned from getError."
				}, e.CONTEXT_LOST_WEBGL = {
					name: "CONTEXT_LOST_WEBGL",
					value: 37442,
					description: "Returned from getError."
				}, e.CW = {
					name: "CW",
					value: 2304,
					description: "Passed to frontFace to specify the front face of a polygon is drawn in the clockwise direction"
				}, e.CCW = {
					name: "CCW",
					value: 2305,
					description: "Passed to frontFace to specify the front face of a polygon is drawn in the counter clockwise direction"
				}, e.DONT_CARE = {
					name: "DONT_CARE",
					value: 4352,
					description: "There is no preference for this behavior."
				}, e.FASTEST = {
					name: "FASTEST",
					value: 4353,
					description: "The most efficient behavior should be used."
				}, e.NICEST = {
					name: "NICEST",
					value: 4354,
					description: "The most correct or the highest quality option should be used."
				}, e.GENERATE_MIPMAP_HINT = {
					name: "GENERATE_MIPMAP_HINT",
					value: 33170,
					description: "Hint for the quality of filtering when generating mipmap images with WebGLRenderingContext.generateMipmap()."
				}, e.BYTE = {
					name: "BYTE",
					value: 5120,
					description: " "
				}, e.UNSIGNED_BYTE = {
					name: "UNSIGNED_BYTE",
					value: 5121,
					description: " "
				}, e.SHORT = {
					name: "SHORT",
					value: 5122,
					description: " "
				}, e.UNSIGNED_SHORT = {
					name: "UNSIGNED_SHORT",
					value: 5123,
					description: " "
				}, e.INT = {
					name: "INT",
					value: 5124,
					description: " "
				}, e.UNSIGNED_INT = {
					name: "UNSIGNED_INT",
					value: 5125,
					description: " "
				}, e.FLOAT = {
					name: "FLOAT",
					value: 5126,
					description: " "
				}, e.DEPTH_COMPONENT = {
					name: "DEPTH_COMPONENT",
					value: 6402,
					description: " "
				}, e.ALPHA = {
					name: "ALPHA",
					value: 6406,
					description: " "
				}, e.RGB = {
					name: "RGB",
					value: 6407,
					description: " "
				}, e.RGBA = {
					name: "RGBA",
					value: 6408,
					description: " "
				}, e.LUMINANCE = {
					name: "LUMINANCE",
					value: 6409,
					description: " "
				}, e.LUMINANCE_ALPHA = {
					name: "LUMINANCE_ALPHA",
					value: 6410,
					description: " "
				}, e.UNSIGNED_SHORT_4_4_4_4 = {
					name: "UNSIGNED_SHORT_4_4_4_4",
					value: 32819,
					description: " "
				}, e.UNSIGNED_SHORT_5_5_5_1 = {
					name: "UNSIGNED_SHORT_5_5_5_1",
					value: 32820,
					description: " "
				}, e.UNSIGNED_SHORT_5_6_5 = {
					name: "UNSIGNED_SHORT_5_6_5",
					value: 33635,
					description: " "
				}, e.FRAGMENT_SHADER = {
					name: "FRAGMENT_SHADER",
					value: 35632,
					description: "Passed to createShader to define a fragment shader."
				}, e.VERTEX_SHADER = {
					name: "VERTEX_SHADER",
					value: 35633,
					description: "Passed to createShader to define a vertex shader"
				}, e.COMPILE_STATUS = {
					name: "COMPILE_STATUS",
					value: 35713,
					description: "Passed to getShaderParamter to get the status of the compilation. Returns false if the shader was not compiled. You can then query getShaderInfoLog to find the exact error"
				}, e.DELETE_STATUS = {
					name: "DELETE_STATUS",
					value: 35712,
					description: "Passed to getShaderParamter to determine if a shader was deleted via deleteShader. Returns true if it was, false otherwise."
				}, e.LINK_STATUS = {
					name: "LINK_STATUS",
					value: 35714,
					description: "Passed to getProgramParameter after calling linkProgram to determine if a program was linked correctly. Returns false if there were errors. Use getProgramInfoLog to find the exact error."
				}, e.VALIDATE_STATUS = {
					name: "VALIDATE_STATUS",
					value: 35715,
					description: "Passed to getProgramParameter after calling validateProgram to determine if it is valid. Returns false if errors were found."
				}, e.ATTACHED_SHADERS = {
					name: "ATTACHED_SHADERS",
					value: 35717,
					description: "Passed to getProgramParameter after calling attachShader to determine if the shader was attached correctly. Returns false if errors occurred."
				}, e.ACTIVE_ATTRIBUTES = {
					name: "ACTIVE_ATTRIBUTES",
					value: 35721,
					description: "Passed to getProgramParameter to get the number of attributes active in a program."
				}, e.ACTIVE_UNIFORMS = {
					name: "ACTIVE_UNIFORMS",
					value: 35718,
					description: "Passed to getProgramParamter to get the number of uniforms active in a program."
				}, e.MAX_VERTEX_ATTRIBS = {
					name: "MAX_VERTEX_ATTRIBS",
					value: 34921,
					description: " "
				}, e.MAX_VERTEX_UNIFORM_VECTORS = {
					name: "MAX_VERTEX_UNIFORM_VECTORS",
					value: 36347,
					description: " "
				}, e.MAX_VARYING_VECTORS = {
					name: "MAX_VARYING_VECTORS",
					value: 36348,
					description: " "
				}, e.MAX_COMBINED_TEXTURE_IMAGE_UNITS = {
					name: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
					value: 35661,
					description: " "
				}, e.MAX_VERTEX_TEXTURE_IMAGE_UNITS = {
					name: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
					value: 35660,
					description: " "
				}, e.MAX_TEXTURE_IMAGE_UNITS = {
					name: "MAX_TEXTURE_IMAGE_UNITS",
					value: 34930,
					description: "Implementation dependent number of maximum texture units. At least 8."
				}, e.MAX_FRAGMENT_UNIFORM_VECTORS = {
					name: "MAX_FRAGMENT_UNIFORM_VECTORS",
					value: 36349,
					description: " "
				}, e.SHADER_TYPE = {
					name: "SHADER_TYPE",
					value: 35663,
					description: " "
				}, e.SHADING_LANGUAGE_VERSION = {
					name: "SHADING_LANGUAGE_VERSION",
					value: 35724,
					description: " "
				}, e.CURRENT_PROGRAM = {
					name: "CURRENT_PROGRAM",
					value: 35725,
					description: " "
				}, e.NEVER = {
					name: "NEVER",
					value: 512,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn."
				}, e.ALWAYS = {
					name: "ALWAYS",
					value: 519,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn."
				}, e.LESS = {
					name: "LESS",
					value: 513,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value."
				}, e.EQUAL = {
					name: "EQUAL",
					value: 514,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value."
				}, e.LEQUAL = {
					name: "LEQUAL",
					value: 515,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value."
				}, e.GREATER = {
					name: "GREATER",
					value: 516,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value."
				}, e.GEQUAL = {
					name: "GEQUAL",
					value: 518,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value."
				}, e.NOTEQUAL = {
					name: "NOTEQUAL",
					value: 517,
					description: "Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value."
				}, e.KEEP = {
					name: "KEEP",
					value: 7680,
					description: " "
				}, e.REPLACE = {
					name: "REPLACE",
					value: 7681,
					description: " "
				}, e.INCR = {
					name: "INCR",
					value: 7682,
					description: " "
				}, e.DECR = {
					name: "DECR",
					value: 7683,
					description: " "
				}, e.INVERT = {
					name: "INVERT",
					value: 5386,
					description: " "
				}, e.INCR_WRAP = {
					name: "INCR_WRAP",
					value: 34055,
					description: " "
				}, e.DECR_WRAP = {
					name: "DECR_WRAP",
					value: 34056,
					description: " "
				}, e.NEAREST = {
					name: "NEAREST",
					value: 9728,
					description: " "
				}, e.LINEAR = {
					name: "LINEAR",
					value: 9729,
					description: " "
				}, e.NEAREST_MIPMAP_NEAREST = {
					name: "NEAREST_MIPMAP_NEAREST",
					value: 9984,
					description: " "
				}, e.LINEAR_MIPMAP_NEAREST = {
					name: "LINEAR_MIPMAP_NEAREST",
					value: 9985,
					description: " "
				}, e.NEAREST_MIPMAP_LINEAR = {
					name: "NEAREST_MIPMAP_LINEAR",
					value: 9986,
					description: " "
				}, e.LINEAR_MIPMAP_LINEAR = {
					name: "LINEAR_MIPMAP_LINEAR",
					value: 9987,
					description: " "
				}, e.TEXTURE_MAG_FILTER = {
					name: "TEXTURE_MAG_FILTER",
					value: 10240,
					description: " "
				}, e.TEXTURE_MIN_FILTER = {
					name: "TEXTURE_MIN_FILTER",
					value: 10241,
					description: " "
				}, e.TEXTURE_WRAP_S = {
					name: "TEXTURE_WRAP_S",
					value: 10242,
					description: " "
				}, e.TEXTURE_WRAP_T = {
					name: "TEXTURE_WRAP_T",
					value: 10243,
					description: " "
				}, e.TEXTURE_2D = {
					name: "TEXTURE_2D",
					value: 3553,
					description: " "
				}, e.TEXTURE = {
					name: "TEXTURE",
					value: 5890,
					description: " "
				}, e.TEXTURE_CUBE_MAP = {
					name: "TEXTURE_CUBE_MAP",
					value: 34067,
					description: " "
				}, e.TEXTURE_BINDING_CUBE_MAP = {
					name: "TEXTURE_BINDING_CUBE_MAP",
					value: 34068,
					description: " "
				}, e.TEXTURE_CUBE_MAP_POSITIVE_X = {
					name: "TEXTURE_CUBE_MAP_POSITIVE_X",
					value: 34069,
					description: " "
				}, e.TEXTURE_CUBE_MAP_NEGATIVE_X = {
					name: "TEXTURE_CUBE_MAP_NEGATIVE_X",
					value: 34070,
					description: " "
				}, e.TEXTURE_CUBE_MAP_POSITIVE_Y = {
					name: "TEXTURE_CUBE_MAP_POSITIVE_Y",
					value: 34071,
					description: " "
				}, e.TEXTURE_CUBE_MAP_NEGATIVE_Y = {
					name: "TEXTURE_CUBE_MAP_NEGATIVE_Y",
					value: 34072,
					description: " "
				}, e.TEXTURE_CUBE_MAP_POSITIVE_Z = {
					name: "TEXTURE_CUBE_MAP_POSITIVE_Z",
					value: 34073,
					description: " "
				}, e.TEXTURE_CUBE_MAP_NEGATIVE_Z = {
					name: "TEXTURE_CUBE_MAP_NEGATIVE_Z",
					value: 34074,
					description: " "
				}, e.MAX_CUBE_MAP_TEXTURE_SIZE = {
					name: "MAX_CUBE_MAP_TEXTURE_SIZE",
					value: 34076,
					description: " "
				}, e.TEXTURE0 = {
					name: "TEXTURE0",
					value: 33984,
					description: "A texture unit."
				}, e.TEXTURE1 = {
					name: "TEXTURE1",
					value: 33985,
					description: "A texture unit."
				}, e.TEXTURE2 = {
					name: "TEXTURE2",
					value: 33986,
					description: "A texture unit."
				}, e.TEXTURE3 = {
					name: "TEXTURE3",
					value: 33987,
					description: "A texture unit."
				}, e.TEXTURE4 = {
					name: "TEXTURE4",
					value: 33988,
					description: "A texture unit."
				}, e.TEXTURE5 = {
					name: "TEXTURE5",
					value: 33989,
					description: "A texture unit."
				}, e.TEXTURE6 = {
					name: "TEXTURE6",
					value: 33990,
					description: "A texture unit."
				}, e.TEXTURE7 = {
					name: "TEXTURE7",
					value: 33991,
					description: "A texture unit."
				}, e.TEXTURE8 = {
					name: "TEXTURE8",
					value: 33992,
					description: "A texture unit."
				}, e.TEXTURE9 = {
					name: "TEXTURE9",
					value: 33993,
					description: "A texture unit."
				}, e.TEXTURE10 = {
					name: "TEXTURE10",
					value: 33994,
					description: "A texture unit."
				}, e.TEXTURE11 = {
					name: "TEXTURE11",
					value: 33995,
					description: "A texture unit."
				}, e.TEXTURE12 = {
					name: "TEXTURE12",
					value: 33996,
					description: "A texture unit."
				}, e.TEXTURE13 = {
					name: "TEXTURE13",
					value: 33997,
					description: "A texture unit."
				}, e.TEXTURE14 = {
					name: "TEXTURE14",
					value: 33998,
					description: "A texture unit."
				}, e.TEXTURE15 = {
					name: "TEXTURE15",
					value: 33999,
					description: "A texture unit."
				}, e.TEXTURE16 = {
					name: "TEXTURE16",
					value: 34e3,
					description: "A texture unit."
				}, e.TEXTURE17 = {
					name: "TEXTURE17",
					value: 34001,
					description: "A texture unit."
				}, e.TEXTURE18 = {
					name: "TEXTURE18",
					value: 34002,
					description: "A texture unit."
				}, e.TEXTURE19 = {
					name: "TEXTURE19",
					value: 34003,
					description: "A texture unit."
				}, e.TEXTURE20 = {
					name: "TEXTURE20",
					value: 34004,
					description: "A texture unit."
				}, e.TEXTURE21 = {
					name: "TEXTURE21",
					value: 34005,
					description: "A texture unit."
				}, e.TEXTURE22 = {
					name: "TEXTURE22",
					value: 34006,
					description: "A texture unit."
				}, e.TEXTURE23 = {
					name: "TEXTURE23",
					value: 34007,
					description: "A texture unit."
				}, e.TEXTURE24 = {
					name: "TEXTURE24",
					value: 34008,
					description: "A texture unit."
				}, e.TEXTURE25 = {
					name: "TEXTURE25",
					value: 34009,
					description: "A texture unit."
				}, e.TEXTURE26 = {
					name: "TEXTURE26",
					value: 34010,
					description: "A texture unit."
				}, e.TEXTURE27 = {
					name: "TEXTURE27",
					value: 34011,
					description: "A texture unit."
				}, e.TEXTURE28 = {
					name: "TEXTURE28",
					value: 34012,
					description: "A texture unit."
				}, e.TEXTURE29 = {
					name: "TEXTURE29",
					value: 34013,
					description: "A texture unit."
				}, e.TEXTURE30 = {
					name: "TEXTURE30",
					value: 34014,
					description: "A texture unit."
				}, e.TEXTURE31 = {
					name: "TEXTURE31",
					value: 34015,
					description: "A texture unit."
				}, e.ACTIVE_TEXTURE = {
					name: "ACTIVE_TEXTURE",
					value: 34016,
					description: "The current active texture unit."
				}, e.REPEAT = {
					name: "REPEAT",
					value: 10497,
					description: " "
				}, e.CLAMP_TO_EDGE = {
					name: "CLAMP_TO_EDGE",
					value: 33071,
					description: " "
				}, e.MIRRORED_REPEAT = {
					name: "MIRRORED_REPEAT",
					value: 33648,
					description: " "
				}, e.FLOAT_VEC2 = {
					name: "FLOAT_VEC2",
					value: 35664,
					description: " "
				}, e.FLOAT_VEC3 = {
					name: "FLOAT_VEC3",
					value: 35665,
					description: " "
				}, e.FLOAT_VEC4 = {
					name: "FLOAT_VEC4",
					value: 35666,
					description: " "
				}, e.INT_VEC2 = {
					name: "INT_VEC2",
					value: 35667,
					description: " "
				}, e.INT_VEC3 = {
					name: "INT_VEC3",
					value: 35668,
					description: " "
				}, e.INT_VEC4 = {
					name: "INT_VEC4",
					value: 35669,
					description: " "
				}, e.BOOL = {
					name: "BOOL",
					value: 35670,
					description: " "
				}, e.BOOL_VEC2 = {
					name: "BOOL_VEC2",
					value: 35671,
					description: " "
				}, e.BOOL_VEC3 = {
					name: "BOOL_VEC3",
					value: 35672,
					description: " "
				}, e.BOOL_VEC4 = {
					name: "BOOL_VEC4",
					value: 35673,
					description: " "
				}, e.FLOAT_MAT2 = {
					name: "FLOAT_MAT2",
					value: 35674,
					description: " "
				}, e.FLOAT_MAT3 = {
					name: "FLOAT_MAT3",
					value: 35675,
					description: " "
				}, e.FLOAT_MAT4 = {
					name: "FLOAT_MAT4",
					value: 35676,
					description: " "
				}, e.SAMPLER_2D = {
					name: "SAMPLER_2D",
					value: 35678,
					description: " "
				}, e.SAMPLER_CUBE = {
					name: "SAMPLER_CUBE",
					value: 35680,
					description: " "
				}, e.LOW_FLOAT = {
					name: "LOW_FLOAT",
					value: 36336,
					description: " "
				}, e.MEDIUM_FLOAT = {
					name: "MEDIUM_FLOAT",
					value: 36337,
					description: " "
				}, e.HIGH_FLOAT = {
					name: "HIGH_FLOAT",
					value: 36338,
					description: " "
				}, e.LOW_INT = {
					name: "LOW_INT",
					value: 36339,
					description: " "
				}, e.MEDIUM_INT = {
					name: "MEDIUM_INT",
					value: 36340,
					description: " "
				}, e.HIGH_INT = {
					name: "HIGH_INT",
					value: 36341,
					description: " "
				}, e.FRAMEBUFFER = {
					name: "FRAMEBUFFER",
					value: 36160,
					description: " "
				}, e.RENDERBUFFER = {
					name: "RENDERBUFFER",
					value: 36161,
					description: " "
				}, e.RGBA4 = {
					name: "RGBA4",
					value: 32854,
					description: " "
				}, e.RGB5_A1 = {
					name: "RGB5_A1",
					value: 32855,
					description: " "
				}, e.RGB565 = {
					name: "RGB565",
					value: 36194,
					description: " "
				}, e.DEPTH_COMPONENT16 = {
					name: "DEPTH_COMPONENT16",
					value: 33189,
					description: " "
				}, e.STENCIL_INDEX = {
					name: "STENCIL_INDEX",
					value: 6401,
					description: " "
				}, e.STENCIL_INDEX8 = {
					name: "STENCIL_INDEX8",
					value: 36168,
					description: " "
				}, e.DEPTH_STENCIL = {
					name: "DEPTH_STENCIL",
					value: 34041,
					description: " "
				}, e.RENDERBUFFER_WIDTH = {
					name: "RENDERBUFFER_WIDTH",
					value: 36162,
					description: " "
				}, e.RENDERBUFFER_HEIGHT = {
					name: "RENDERBUFFER_HEIGHT",
					value: 36163,
					description: " "
				}, e.RENDERBUFFER_INTERNAL_FORMAT = {
					name: "RENDERBUFFER_INTERNAL_FORMAT",
					value: 36164,
					description: " "
				}, e.RENDERBUFFER_RED_SIZE = {
					name: "RENDERBUFFER_RED_SIZE",
					value: 36176,
					description: " "
				}, e.RENDERBUFFER_GREEN_SIZE = {
					name: "RENDERBUFFER_GREEN_SIZE",
					value: 36177,
					description: " "
				}, e.RENDERBUFFER_BLUE_SIZE = {
					name: "RENDERBUFFER_BLUE_SIZE",
					value: 36178,
					description: " "
				}, e.RENDERBUFFER_ALPHA_SIZE = {
					name: "RENDERBUFFER_ALPHA_SIZE",
					value: 36179,
					description: " "
				}, e.RENDERBUFFER_DEPTH_SIZE = {
					name: "RENDERBUFFER_DEPTH_SIZE",
					value: 36180,
					description: " "
				}, e.RENDERBUFFER_STENCIL_SIZE = {
					name: "RENDERBUFFER_STENCIL_SIZE",
					value: 36181,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = {
					name: "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
					value: 36048,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = {
					name: "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
					value: 36049,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = {
					name: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
					value: 36050,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = {
					name: "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
					value: 36051,
					description: " "
				}, e.COLOR_ATTACHMENT0 = {
					name: "COLOR_ATTACHMENT0",
					value: 36064,
					description: " "
				}, e.DEPTH_ATTACHMENT = {
					name: "DEPTH_ATTACHMENT",
					value: 36096,
					description: " "
				}, e.STENCIL_ATTACHMENT = {
					name: "STENCIL_ATTACHMENT",
					value: 36128,
					description: " "
				}, e.DEPTH_STENCIL_ATTACHMENT = {
					name: "DEPTH_STENCIL_ATTACHMENT",
					value: 33306,
					description: " "
				}, e.NONE = {
					name: "NONE",
					value: 0,
					description: " "
				}, e.FRAMEBUFFER_COMPLETE = {
					name: "FRAMEBUFFER_COMPLETE",
					value: 36053,
					description: " "
				}, e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = {
					name: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
					value: 36054,
					description: " "
				}, e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = {
					name: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
					value: 36055,
					description: " "
				}, e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = {
					name: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
					value: 36057,
					description: " "
				}, e.FRAMEBUFFER_UNSUPPORTED = {
					name: "FRAMEBUFFER_UNSUPPORTED",
					value: 36061,
					description: " "
				}, e.FRAMEBUFFER_BINDING = {
					name: "FRAMEBUFFER_BINDING",
					value: 36006,
					description: " "
				}, e.RENDERBUFFER_BINDING = {
					name: "RENDERBUFFER_BINDING",
					value: 36007,
					description: " "
				}, e.MAX_RENDERBUFFER_SIZE = {
					name: "MAX_RENDERBUFFER_SIZE",
					value: 34024,
					description: " "
				}, e.INVALID_FRAMEBUFFER_OPERATION = {
					name: "INVALID_FRAMEBUFFER_OPERATION",
					value: 1286,
					description: " "
				}, e.UNPACK_FLIP_Y_WEBGL = {
					name: "UNPACK_FLIP_Y_WEBGL",
					value: 37440,
					description: " "
				}, e.UNPACK_PREMULTIPLY_ALPHA_WEBGL = {
					name: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
					value: 37441,
					description: " "
				}, e.UNPACK_COLORSPACE_CONVERSION_WEBGL = {
					name: "UNPACK_COLORSPACE_CONVERSION_WEBGL",
					value: 37443,
					description: " "
				}, e.READ_BUFFER = {
					name: "READ_BUFFER",
					value: 3074,
					description: " "
				}, e.UNPACK_ROW_LENGTH = {
					name: "UNPACK_ROW_LENGTH",
					value: 3314,
					description: " "
				}, e.UNPACK_SKIP_ROWS = {
					name: "UNPACK_SKIP_ROWS",
					value: 3315,
					description: " "
				}, e.UNPACK_SKIP_PIXELS = {
					name: "UNPACK_SKIP_PIXELS",
					value: 3316,
					description: " "
				}, e.PACK_ROW_LENGTH = {
					name: "PACK_ROW_LENGTH",
					value: 3330,
					description: " "
				}, e.PACK_SKIP_ROWS = {
					name: "PACK_SKIP_ROWS",
					value: 3331,
					description: " "
				}, e.PACK_SKIP_PIXELS = {
					name: "PACK_SKIP_PIXELS",
					value: 3332,
					description: " "
				}, e.TEXTURE_BINDING_3D = {
					name: "TEXTURE_BINDING_3D",
					value: 32874,
					description: " "
				}, e.UNPACK_SKIP_IMAGES = {
					name: "UNPACK_SKIP_IMAGES",
					value: 32877,
					description: " "
				}, e.UNPACK_IMAGE_HEIGHT = {
					name: "UNPACK_IMAGE_HEIGHT",
					value: 32878,
					description: " "
				}, e.MAX_3D_TEXTURE_SIZE = {
					name: "MAX_3D_TEXTURE_SIZE",
					value: 32883,
					description: " "
				}, e.MAX_ELEMENTS_VERTICES = {
					name: "MAX_ELEMENTS_VERTICES",
					value: 33e3,
					description: " "
				}, e.MAX_ELEMENTS_INDICES = {
					name: "MAX_ELEMENTS_INDICES",
					value: 33001,
					description: " "
				}, e.MAX_TEXTURE_LOD_BIAS = {
					name: "MAX_TEXTURE_LOD_BIAS",
					value: 34045,
					description: " "
				}, e.MAX_FRAGMENT_UNIFORM_COMPONENTS = {
					name: "MAX_FRAGMENT_UNIFORM_COMPONENTS",
					value: 35657,
					description: " "
				}, e.MAX_VERTEX_UNIFORM_COMPONENTS = {
					name: "MAX_VERTEX_UNIFORM_COMPONENTS",
					value: 35658,
					description: " "
				}, e.MAX_ARRAY_TEXTURE_LAYERS = {
					name: "MAX_ARRAY_TEXTURE_LAYERS",
					value: 35071,
					description: " "
				}, e.MIN_PROGRAM_TEXEL_OFFSET = {
					name: "MIN_PROGRAM_TEXEL_OFFSET",
					value: 35076,
					description: " "
				}, e.MAX_PROGRAM_TEXEL_OFFSET = {
					name: "MAX_PROGRAM_TEXEL_OFFSET",
					value: 35077,
					description: " "
				}, e.MAX_VARYING_COMPONENTS = {
					name: "MAX_VARYING_COMPONENTS",
					value: 35659,
					description: " "
				}, e.FRAGMENT_SHADER_DERIVATIVE_HINT = {
					name: "FRAGMENT_SHADER_DERIVATIVE_HINT",
					value: 35723,
					description: " "
				}, e.RASTERIZER_DISCARD = {
					name: "RASTERIZER_DISCARD",
					value: 35977,
					description: " "
				}, e.VERTEX_ARRAY_BINDING = {
					name: "VERTEX_ARRAY_BINDING",
					value: 34229,
					description: " "
				}, e.MAX_VERTEX_OUTPUT_COMPONENTS = {
					name: "MAX_VERTEX_OUTPUT_COMPONENTS",
					value: 37154,
					description: " "
				}, e.MAX_FRAGMENT_INPUT_COMPONENTS = {
					name: "MAX_FRAGMENT_INPUT_COMPONENTS",
					value: 37157,
					description: " "
				}, e.MAX_SERVER_WAIT_TIMEOUT = {
					name: "MAX_SERVER_WAIT_TIMEOUT",
					value: 37137,
					description: " "
				}, e.MAX_ELEMENT_INDEX = {
					name: "MAX_ELEMENT_INDEX",
					value: 36203,
					description: " "
				}, e.RED = {
					name: "RED",
					value: 6403,
					description: " "
				}, e.RGB8 = {
					name: "RGB8",
					value: 32849,
					description: " "
				}, e.RGBA8 = {
					name: "RGBA8",
					value: 32856,
					description: " "
				}, e.RGB10_A2 = {
					name: "RGB10_A2",
					value: 32857,
					description: " "
				}, e.TEXTURE_3D = {
					name: "TEXTURE_3D",
					value: 32879,
					description: " "
				}, e.TEXTURE_WRAP_R = {
					name: "TEXTURE_WRAP_R",
					value: 32882,
					description: " "
				}, e.TEXTURE_MIN_LOD = {
					name: "TEXTURE_MIN_LOD",
					value: 33082,
					description: " "
				}, e.TEXTURE_MAX_LOD = {
					name: "TEXTURE_MAX_LOD",
					value: 33083,
					description: " "
				}, e.TEXTURE_BASE_LEVEL = {
					name: "TEXTURE_BASE_LEVEL",
					value: 33084,
					description: " "
				}, e.TEXTURE_MAX_LEVEL = {
					name: "TEXTURE_MAX_LEVEL",
					value: 33085,
					description: " "
				}, e.TEXTURE_COMPARE_MODE = {
					name: "TEXTURE_COMPARE_MODE",
					value: 34892,
					description: " "
				}, e.TEXTURE_COMPARE_FUNC = {
					name: "TEXTURE_COMPARE_FUNC",
					value: 34893,
					description: " "
				}, e.SRGB = {
					name: "SRGB",
					value: 35904,
					description: " "
				}, e.SRGB8 = {
					name: "SRGB8",
					value: 35905,
					description: " "
				}, e.SRGB8_ALPHA8 = {
					name: "SRGB8_ALPHA8",
					value: 35907,
					description: " "
				}, e.COMPARE_REF_TO_TEXTURE = {
					name: "COMPARE_REF_TO_TEXTURE",
					value: 34894,
					description: " "
				}, e.RGBA32F = {
					name: "RGBA32F",
					value: 34836,
					description: " "
				}, e.RGB32F = {
					name: "RGB32F",
					value: 34837,
					description: " "
				}, e.RGBA16F = {
					name: "RGBA16F",
					value: 34842,
					description: " "
				}, e.RGB16F = {
					name: "RGB16F",
					value: 34843,
					description: " "
				}, e.TEXTURE_2D_ARRAY = {
					name: "TEXTURE_2D_ARRAY",
					value: 35866,
					description: " "
				}, e.TEXTURE_BINDING_2D_ARRAY = {
					name: "TEXTURE_BINDING_2D_ARRAY",
					value: 35869,
					description: " "
				}, e.R11F_G11F_B10F = {
					name: "R11F_G11F_B10F",
					value: 35898,
					description: " "
				}, e.RGB9_E5 = {
					name: "RGB9_E5",
					value: 35901,
					description: " "
				}, e.RGBA32UI = {
					name: "RGBA32UI",
					value: 36208,
					description: " "
				}, e.RGB32UI = {
					name: "RGB32UI",
					value: 36209,
					description: " "
				}, e.RGBA16UI = {
					name: "RGBA16UI",
					value: 36214,
					description: " "
				}, e.RGB16UI = {
					name: "RGB16UI",
					value: 36215,
					description: " "
				}, e.RGBA8UI = {
					name: "RGBA8UI",
					value: 36220,
					description: " "
				}, e.RGB8UI = {
					name: "RGB8UI",
					value: 36221,
					description: " "
				}, e.RGBA32I = {
					name: "RGBA32I",
					value: 36226,
					description: " "
				}, e.RGB32I = {
					name: "RGB32I",
					value: 36227,
					description: " "
				}, e.RGBA16I = {
					name: "RGBA16I",
					value: 36232,
					description: " "
				}, e.RGB16I = {
					name: "RGB16I",
					value: 36233,
					description: " "
				}, e.RGBA8I = {
					name: "RGBA8I",
					value: 36238,
					description: " "
				}, e.RGB8I = {
					name: "RGB8I",
					value: 36239,
					description: " "
				}, e.RED_INTEGER = {
					name: "RED_INTEGER",
					value: 36244,
					description: " "
				}, e.RGB_INTEGER = {
					name: "RGB_INTEGER",
					value: 36248,
					description: " "
				}, e.RGBA_INTEGER = {
					name: "RGBA_INTEGER",
					value: 36249,
					description: " "
				}, e.R8 = {
					name: "R8",
					value: 33321,
					description: " "
				}, e.RG8 = {
					name: "RG8",
					value: 33323,
					description: " "
				}, e.R16F = {
					name: "R16F",
					value: 33325,
					description: " "
				}, e.R32F = {
					name: "R32F",
					value: 33326,
					description: " "
				}, e.RG16F = {
					name: "RG16F",
					value: 33327,
					description: " "
				}, e.RG32F = {
					name: "RG32F",
					value: 33328,
					description: " "
				}, e.R8I = {
					name: "R8I",
					value: 33329,
					description: " "
				}, e.R8UI = {
					name: "R8UI",
					value: 33330,
					description: " "
				}, e.R16I = {
					name: "R16I",
					value: 33331,
					description: " "
				}, e.R16UI = {
					name: "R16UI",
					value: 33332,
					description: " "
				}, e.R32I = {
					name: "R32I",
					value: 33333,
					description: " "
				}, e.R32UI = {
					name: "R32UI",
					value: 33334,
					description: " "
				}, e.RG8I = {
					name: "RG8I",
					value: 33335,
					description: " "
				}, e.RG8UI = {
					name: "RG8UI",
					value: 33336,
					description: " "
				}, e.RG16I = {
					name: "RG16I",
					value: 33337,
					description: " "
				}, e.RG16UI = {
					name: "RG16UI",
					value: 33338,
					description: " "
				}, e.RG32I = {
					name: "RG32I",
					value: 33339,
					description: " "
				}, e.RG32UI = {
					name: "RG32UI",
					value: 33340,
					description: " "
				}, e.R8_SNORM = {
					name: "R8_SNORM",
					value: 36756,
					description: " "
				}, e.RG8_SNORM = {
					name: "RG8_SNORM",
					value: 36757,
					description: " "
				}, e.RGB8_SNORM = {
					name: "RGB8_SNORM",
					value: 36758,
					description: " "
				}, e.RGBA8_SNORM = {
					name: "RGBA8_SNORM",
					value: 36759,
					description: " "
				}, e.RGB10_A2UI = {
					name: "RGB10_A2UI",
					value: 36975,
					description: " "
				}, e.TEXTURE_IMMUTABLE_FORMAT = {
					name: "TEXTURE_IMMUTABLE_FORMAT",
					value: 37167,
					description: " "
				}, e.TEXTURE_IMMUTABLE_LEVELS = {
					name: "TEXTURE_IMMUTABLE_LEVELS",
					value: 33503,
					description: " "
				}, e.UNSIGNED_INT_2_10_10_10_REV = {
					name: "UNSIGNED_INT_2_10_10_10_REV",
					value: 33640,
					description: " "
				}, e.UNSIGNED_INT_10F_11F_11F_REV = {
					name: "UNSIGNED_INT_10F_11F_11F_REV",
					value: 35899,
					description: " "
				}, e.UNSIGNED_INT_5_9_9_9_REV = {
					name: "UNSIGNED_INT_5_9_9_9_REV",
					value: 35902,
					description: " "
				}, e.FLOAT_32_UNSIGNED_INT_24_8_REV = {
					name: "FLOAT_32_UNSIGNED_INT_24_8_REV",
					value: 36269,
					description: " "
				}, e.UNSIGNED_INT_24_8 = {
					name: "UNSIGNED_INT_24_8",
					value: 34042,
					description: " "
				}, e.HALF_FLOAT = {
					name: "HALF_FLOAT",
					value: 5131,
					description: " "
				}, e.RG = {
					name: "RG",
					value: 33319,
					description: " "
				}, e.RG_INTEGER = {
					name: "RG_INTEGER",
					value: 33320,
					description: " "
				}, e.INT_2_10_10_10_REV = {
					name: "INT_2_10_10_10_REV",
					value: 36255,
					description: " "
				}, e.CURRENT_QUERY = {
					name: "CURRENT_QUERY",
					value: 34917,
					description: " "
				}, e.QUERY_RESULT = {
					name: "QUERY_RESULT",
					value: 34918,
					description: " "
				}, e.QUERY_RESULT_AVAILABLE = {
					name: "QUERY_RESULT_AVAILABLE",
					value: 34919,
					description: " "
				}, e.ANY_SAMPLES_PASSED = {
					name: "ANY_SAMPLES_PASSED",
					value: 35887,
					description: " "
				}, e.ANY_SAMPLES_PASSED_CONSERVATIVE = {
					name: "ANY_SAMPLES_PASSED_CONSERVATIVE",
					value: 36202,
					description: " "
				}, e.MAX_DRAW_BUFFERS = {
					name: "MAX_DRAW_BUFFERS",
					value: 34852,
					description: " "
				}, e.DRAW_BUFFER0 = {
					name: "DRAW_BUFFER0",
					value: 34853,
					description: " "
				}, e.DRAW_BUFFER1 = {
					name: "DRAW_BUFFER1",
					value: 34854,
					description: " "
				}, e.DRAW_BUFFER2 = {
					name: "DRAW_BUFFER2",
					value: 34855,
					description: " "
				}, e.DRAW_BUFFER3 = {
					name: "DRAW_BUFFER3",
					value: 34856,
					description: " "
				}, e.DRAW_BUFFER4 = {
					name: "DRAW_BUFFER4",
					value: 34857,
					description: " "
				}, e.DRAW_BUFFER5 = {
					name: "DRAW_BUFFER5",
					value: 34858,
					description: " "
				}, e.DRAW_BUFFER6 = {
					name: "DRAW_BUFFER6",
					value: 34859,
					description: " "
				}, e.DRAW_BUFFER7 = {
					name: "DRAW_BUFFER7",
					value: 34860,
					description: " "
				}, e.DRAW_BUFFER8 = {
					name: "DRAW_BUFFER8",
					value: 34861,
					description: " "
				}, e.DRAW_BUFFER9 = {
					name: "DRAW_BUFFER9",
					value: 34862,
					description: " "
				}, e.DRAW_BUFFER10 = {
					name: "DRAW_BUFFER10",
					value: 34863,
					description: " "
				}, e.DRAW_BUFFER11 = {
					name: "DRAW_BUFFER11",
					value: 34864,
					description: " "
				}, e.DRAW_BUFFER12 = {
					name: "DRAW_BUFFER12",
					value: 34865,
					description: " "
				}, e.DRAW_BUFFER13 = {
					name: "DRAW_BUFFER13",
					value: 34866,
					description: " "
				}, e.DRAW_BUFFER14 = {
					name: "DRAW_BUFFER14",
					value: 34867,
					description: " "
				}, e.DRAW_BUFFER15 = {
					name: "DRAW_BUFFER15",
					value: 34868,
					description: " "
				}, e.MAX_COLOR_ATTACHMENTS = {
					name: "MAX_COLOR_ATTACHMENTS",
					value: 36063,
					description: " "
				}, e.COLOR_ATTACHMENT1 = {
					name: "COLOR_ATTACHMENT1",
					value: 36065,
					description: " "
				}, e.COLOR_ATTACHMENT2 = {
					name: "COLOR_ATTACHMENT2",
					value: 36066,
					description: " "
				}, e.COLOR_ATTACHMENT3 = {
					name: "COLOR_ATTACHMENT3",
					value: 36067,
					description: " "
				}, e.COLOR_ATTACHMENT4 = {
					name: "COLOR_ATTACHMENT4",
					value: 36068,
					description: " "
				}, e.COLOR_ATTACHMENT5 = {
					name: "COLOR_ATTACHMENT5",
					value: 36069,
					description: " "
				}, e.COLOR_ATTACHMENT6 = {
					name: "COLOR_ATTACHMENT6",
					value: 36070,
					description: " "
				}, e.COLOR_ATTACHMENT7 = {
					name: "COLOR_ATTACHMENT7",
					value: 36071,
					description: " "
				}, e.COLOR_ATTACHMENT8 = {
					name: "COLOR_ATTACHMENT8",
					value: 36072,
					description: " "
				}, e.COLOR_ATTACHMENT9 = {
					name: "COLOR_ATTACHMENT9",
					value: 36073,
					description: " "
				}, e.COLOR_ATTACHMENT10 = {
					name: "COLOR_ATTACHMENT10",
					value: 36074,
					description: " "
				}, e.COLOR_ATTACHMENT11 = {
					name: "COLOR_ATTACHMENT11",
					value: 36075,
					description: " "
				}, e.COLOR_ATTACHMENT12 = {
					name: "COLOR_ATTACHMENT12",
					value: 36076,
					description: " "
				}, e.COLOR_ATTACHMENT13 = {
					name: "COLOR_ATTACHMENT13",
					value: 36077,
					description: " "
				}, e.COLOR_ATTACHMENT14 = {
					name: "COLOR_ATTACHMENT14",
					value: 36078,
					description: " "
				}, e.COLOR_ATTACHMENT15 = {
					name: "COLOR_ATTACHMENT15",
					value: 36079,
					description: " "
				}, e.SAMPLER_3D = {
					name: "SAMPLER_3D",
					value: 35679,
					description: " "
				}, e.SAMPLER_2D_SHADOW = {
					name: "SAMPLER_2D_SHADOW",
					value: 35682,
					description: " "
				}, e.SAMPLER_2D_ARRAY = {
					name: "SAMPLER_2D_ARRAY",
					value: 36289,
					description: " "
				}, e.SAMPLER_2D_ARRAY_SHADOW = {
					name: "SAMPLER_2D_ARRAY_SHADOW",
					value: 36292,
					description: " "
				}, e.SAMPLER_CUBE_SHADOW = {
					name: "SAMPLER_CUBE_SHADOW",
					value: 36293,
					description: " "
				}, e.INT_SAMPLER_2D = {
					name: "INT_SAMPLER_2D",
					value: 36298,
					description: " "
				}, e.INT_SAMPLER_3D = {
					name: "INT_SAMPLER_3D",
					value: 36299,
					description: " "
				}, e.INT_SAMPLER_CUBE = {
					name: "INT_SAMPLER_CUBE",
					value: 36300,
					description: " "
				}, e.INT_SAMPLER_2D_ARRAY = {
					name: "INT_SAMPLER_2D_ARRAY",
					value: 36303,
					description: " "
				}, e.UNSIGNED_INT_SAMPLER_2D = {
					name: "UNSIGNED_INT_SAMPLER_2D",
					value: 36306,
					description: " "
				}, e.UNSIGNED_INT_SAMPLER_3D = {
					name: "UNSIGNED_INT_SAMPLER_3D",
					value: 36307,
					description: " "
				}, e.UNSIGNED_INT_SAMPLER_CUBE = {
					name: "UNSIGNED_INT_SAMPLER_CUBE",
					value: 36308,
					description: " "
				}, e.UNSIGNED_INT_SAMPLER_2D_ARRAY = {
					name: "UNSIGNED_INT_SAMPLER_2D_ARRAY",
					value: 36311,
					description: " "
				}, e.MAX_SAMPLES = {
					name: "MAX_SAMPLES",
					value: 36183,
					description: " "
				}, e.SAMPLER_BINDING = {
					name: "SAMPLER_BINDING",
					value: 35097,
					description: " "
				}, e.PIXEL_PACK_BUFFER = {
					name: "PIXEL_PACK_BUFFER",
					value: 35051,
					description: " "
				}, e.PIXEL_UNPACK_BUFFER = {
					name: "PIXEL_UNPACK_BUFFER",
					value: 35052,
					description: " "
				}, e.PIXEL_PACK_BUFFER_BINDING = {
					name: "PIXEL_PACK_BUFFER_BINDING",
					value: 35053,
					description: " "
				}, e.PIXEL_UNPACK_BUFFER_BINDING = {
					name: "PIXEL_UNPACK_BUFFER_BINDING",
					value: 35055,
					description: " "
				}, e.COPY_READ_BUFFER = {
					name: "COPY_READ_BUFFER",
					value: 36662,
					description: " "
				}, e.COPY_WRITE_BUFFER = {
					name: "COPY_WRITE_BUFFER",
					value: 36663,
					description: " "
				}, e.COPY_READ_BUFFER_BINDING = {
					name: "COPY_READ_BUFFER_BINDING",
					value: 36662,
					description: " "
				}, e.COPY_WRITE_BUFFER_BINDING = {
					name: "COPY_WRITE_BUFFER_BINDING",
					value: 36663,
					description: " "
				}, e.FLOAT_MAT2x3 = {
					name: "FLOAT_MAT2x3",
					value: 35685,
					description: " "
				}, e.FLOAT_MAT2x4 = {
					name: "FLOAT_MAT2x4",
					value: 35686,
					description: " "
				}, e.FLOAT_MAT3x2 = {
					name: "FLOAT_MAT3x2",
					value: 35687,
					description: " "
				}, e.FLOAT_MAT3x4 = {
					name: "FLOAT_MAT3x4",
					value: 35688,
					description: " "
				}, e.FLOAT_MAT4x2 = {
					name: "FLOAT_MAT4x2",
					value: 35689,
					description: " "
				}, e.FLOAT_MAT4x3 = {
					name: "FLOAT_MAT4x3",
					value: 35690,
					description: " "
				}, e.UNSIGNED_INT_VEC2 = {
					name: "UNSIGNED_INT_VEC2",
					value: 36294,
					description: " "
				}, e.UNSIGNED_INT_VEC3 = {
					name: "UNSIGNED_INT_VEC3",
					value: 36295,
					description: " "
				}, e.UNSIGNED_INT_VEC4 = {
					name: "UNSIGNED_INT_VEC4",
					value: 36296,
					description: " "
				}, e.UNSIGNED_NORMALIZED = {
					name: "UNSIGNED_NORMALIZED",
					value: 35863,
					description: " "
				}, e.SIGNED_NORMALIZED = {
					name: "SIGNED_NORMALIZED",
					value: 36764,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_INTEGER = {
					name: "VERTEX_ATTRIB_ARRAY_INTEGER",
					value: 35069,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_DIVISOR = {
					name: "VERTEX_ATTRIB_ARRAY_DIVISOR",
					value: 35070,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BUFFER_MODE = {
					name: "TRANSFORM_FEEDBACK_BUFFER_MODE",
					value: 35967,
					description: " "
				}, e.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = {
					name: "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS",
					value: 35968,
					description: " "
				}, e.TRANSFORM_FEEDBACK_VARYINGS = {
					name: "TRANSFORM_FEEDBACK_VARYINGS",
					value: 35971,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BUFFER_START = {
					name: "TRANSFORM_FEEDBACK_BUFFER_START",
					value: 35972,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BUFFER_SIZE = {
					name: "TRANSFORM_FEEDBACK_BUFFER_SIZE",
					value: 35973,
					description: " "
				}, e.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = {
					name: "TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN",
					value: 35976,
					description: " "
				}, e.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = {
					name: "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS",
					value: 35978,
					description: " "
				}, e.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = {
					name: "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS",
					value: 35979,
					description: " "
				}, e.INTERLEAVED_ATTRIBS = {
					name: "INTERLEAVED_ATTRIBS",
					value: 35980,
					description: " "
				}, e.SEPARATE_ATTRIBS = {
					name: "SEPARATE_ATTRIBS",
					value: 35981,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BUFFER = {
					name: "TRANSFORM_FEEDBACK_BUFFER",
					value: 35982,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BUFFER_BINDING = {
					name: "TRANSFORM_FEEDBACK_BUFFER_BINDING",
					value: 35983,
					description: " "
				}, e.TRANSFORM_FEEDBACK = {
					name: "TRANSFORM_FEEDBACK",
					value: 36386,
					description: " "
				}, e.TRANSFORM_FEEDBACK_PAUSED = {
					name: "TRANSFORM_FEEDBACK_PAUSED",
					value: 36387,
					description: " "
				}, e.TRANSFORM_FEEDBACK_ACTIVE = {
					name: "TRANSFORM_FEEDBACK_ACTIVE",
					value: 36388,
					description: " "
				}, e.TRANSFORM_FEEDBACK_BINDING = {
					name: "TRANSFORM_FEEDBACK_BINDING",
					value: 36389,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = {
					name: "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING",
					value: 33296,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = {
					name: "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE",
					value: 33297,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_RED_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_RED_SIZE",
					value: 33298,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_GREEN_SIZE",
					value: 33299,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_BLUE_SIZE",
					value: 33300,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE",
					value: 33301,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE",
					value: 33302,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = {
					name: "FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE",
					value: 33303,
					description: " "
				}, e.FRAMEBUFFER_DEFAULT = {
					name: "FRAMEBUFFER_DEFAULT",
					value: 33304,
					description: " "
				}, e.DEPTH24_STENCIL8 = {
					name: "DEPTH24_STENCIL8",
					value: 35056,
					description: " "
				}, e.DRAW_FRAMEBUFFER_BINDING = {
					name: "DRAW_FRAMEBUFFER_BINDING",
					value: 36006,
					description: " "
				}, e.READ_FRAMEBUFFER = {
					name: "READ_FRAMEBUFFER",
					value: 36008,
					description: " "
				}, e.DRAW_FRAMEBUFFER = {
					name: "DRAW_FRAMEBUFFER",
					value: 36009,
					description: " "
				}, e.READ_FRAMEBUFFER_BINDING = {
					name: "READ_FRAMEBUFFER_BINDING",
					value: 36010,
					description: " "
				}, e.RENDERBUFFER_SAMPLES = {
					name: "RENDERBUFFER_SAMPLES",
					value: 36011,
					description: " "
				}, e.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = {
					name: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER",
					value: 36052,
					description: " "
				}, e.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = {
					name: "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE",
					value: 36182,
					description: " "
				}, e.UNIFORM_BUFFER = {
					name: "UNIFORM_BUFFER",
					value: 35345,
					description: " "
				}, e.UNIFORM_BUFFER_BINDING = {
					name: "UNIFORM_BUFFER_BINDING",
					value: 35368,
					description: " "
				}, e.UNIFORM_BUFFER_START = {
					name: "UNIFORM_BUFFER_START",
					value: 35369,
					description: " "
				}, e.UNIFORM_BUFFER_SIZE = {
					name: "UNIFORM_BUFFER_SIZE",
					value: 35370,
					description: " "
				}, e.MAX_VERTEX_UNIFORM_BLOCKS = {
					name: "MAX_VERTEX_UNIFORM_BLOCKS",
					value: 35371,
					description: " "
				}, e.MAX_FRAGMENT_UNIFORM_BLOCKS = {
					name: "MAX_FRAGMENT_UNIFORM_BLOCKS",
					value: 35373,
					description: " "
				}, e.MAX_COMBINED_UNIFORM_BLOCKS = {
					name: "MAX_COMBINED_UNIFORM_BLOCKS",
					value: 35374,
					description: " "
				}, e.MAX_UNIFORM_BUFFER_BINDINGS = {
					name: "MAX_UNIFORM_BUFFER_BINDINGS",
					value: 35375,
					description: " "
				}, e.MAX_UNIFORM_BLOCK_SIZE = {
					name: "MAX_UNIFORM_BLOCK_SIZE",
					value: 35376,
					description: " "
				}, e.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = {
					name: "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS",
					value: 35377,
					description: " "
				}, e.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = {
					name: "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS",
					value: 35379,
					description: " "
				}, e.UNIFORM_BUFFER_OFFSET_ALIGNMENT = {
					name: "UNIFORM_BUFFER_OFFSET_ALIGNMENT",
					value: 35380,
					description: " "
				}, e.ACTIVE_UNIFORM_BLOCKS = {
					name: "ACTIVE_UNIFORM_BLOCKS",
					value: 35382,
					description: " "
				}, e.UNIFORM_TYPE = {
					name: "UNIFORM_TYPE",
					value: 35383,
					description: " "
				}, e.UNIFORM_SIZE = {
					name: "UNIFORM_SIZE",
					value: 35384,
					description: " "
				}, e.UNIFORM_BLOCK_INDEX = {
					name: "UNIFORM_BLOCK_INDEX",
					value: 35386,
					description: " "
				}, e.UNIFORM_OFFSET = {
					name: "UNIFORM_OFFSET",
					value: 35387,
					description: " "
				}, e.UNIFORM_ARRAY_STRIDE = {
					name: "UNIFORM_ARRAY_STRIDE",
					value: 35388,
					description: " "
				}, e.UNIFORM_MATRIX_STRIDE = {
					name: "UNIFORM_MATRIX_STRIDE",
					value: 35389,
					description: " "
				}, e.UNIFORM_IS_ROW_MAJOR = {
					name: "UNIFORM_IS_ROW_MAJOR",
					value: 35390,
					description: " "
				}, e.UNIFORM_BLOCK_BINDING = {
					name: "UNIFORM_BLOCK_BINDING",
					value: 35391,
					description: " "
				}, e.UNIFORM_BLOCK_DATA_SIZE = {
					name: "UNIFORM_BLOCK_DATA_SIZE",
					value: 35392,
					description: " "
				}, e.UNIFORM_BLOCK_ACTIVE_UNIFORMS = {
					name: "UNIFORM_BLOCK_ACTIVE_UNIFORMS",
					value: 35394,
					description: " "
				}, e.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = {
					name: "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES",
					value: 35395,
					description: " "
				}, e.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = {
					name: "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER",
					value: 35396,
					description: " "
				}, e.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = {
					name: "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER",
					value: 35398,
					description: " "
				}, e.OBJECT_TYPE = {
					name: "OBJECT_TYPE",
					value: 37138,
					description: " "
				}, e.SYNC_CONDITION = {
					name: "SYNC_CONDITION",
					value: 37139,
					description: " "
				}, e.SYNC_STATUS = {
					name: "SYNC_STATUS",
					value: 37140,
					description: " "
				}, e.SYNC_FLAGS = {
					name: "SYNC_FLAGS",
					value: 37141,
					description: " "
				}, e.SYNC_FENCE = {
					name: "SYNC_FENCE",
					value: 37142,
					description: " "
				}, e.SYNC_GPU_COMMANDS_COMPLETE = {
					name: "SYNC_GPU_COMMANDS_COMPLETE",
					value: 37143,
					description: " "
				}, e.UNSIGNALED = {
					name: "UNSIGNALED",
					value: 37144,
					description: " "
				}, e.SIGNALED = {
					name: "SIGNALED",
					value: 37145,
					description: " "
				}, e.ALREADY_SIGNALED = {
					name: "ALREADY_SIGNALED",
					value: 37146,
					description: " "
				}, e.TIMEOUT_EXPIRED = {
					name: "TIMEOUT_EXPIRED",
					value: 37147,
					description: " "
				}, e.CONDITION_SATISFIED = {
					name: "CONDITION_SATISFIED",
					value: 37148,
					description: " "
				}, e.WAIT_FAILED = {
					name: "WAIT_FAILED",
					value: 37149,
					description: " "
				}, e.SYNC_FLUSH_COMMANDS_BIT = {
					name: "SYNC_FLUSH_COMMANDS_BIT",
					value: 1,
					description: " "
				}, e.COLOR = {
					name: "COLOR",
					value: 6144,
					description: " "
				}, e.DEPTH = {
					name: "DEPTH",
					value: 6145,
					description: " "
				}, e.STENCIL = {
					name: "STENCIL",
					value: 6146,
					description: " "
				}, e.MIN = {
					name: "MIN",
					value: 32775,
					description: " "
				}, e.MAX = {
					name: "MAX",
					value: 32776,
					description: " "
				}, e.DEPTH_COMPONENT24 = {
					name: "DEPTH_COMPONENT24",
					value: 33190,
					description: " "
				}, e.STREAM_READ = {
					name: "STREAM_READ",
					value: 35041,
					description: " "
				}, e.STREAM_COPY = {
					name: "STREAM_COPY",
					value: 35042,
					description: " "
				}, e.STATIC_READ = {
					name: "STATIC_READ",
					value: 35045,
					description: " "
				}, e.STATIC_COPY = {
					name: "STATIC_COPY",
					value: 35046,
					description: " "
				}, e.DYNAMIC_READ = {
					name: "DYNAMIC_READ",
					value: 35049,
					description: " "
				}, e.DYNAMIC_COPY = {
					name: "DYNAMIC_COPY",
					value: 35050,
					description: " "
				}, e.DEPTH_COMPONENT32F = {
					name: "DEPTH_COMPONENT32F",
					value: 36012,
					description: " "
				}, e.DEPTH32F_STENCIL8 = {
					name: "DEPTH32F_STENCIL8",
					value: 36013,
					description: " "
				}, e.INVALID_INDEX = {
					name: "INVALID_INDEX",
					value: 4294967295,
					description: " "
				}, e.TIMEOUT_IGNORED = {
					name: "TIMEOUT_IGNORED",
					value: -1,
					description: " "
				}, e.MAX_CLIENT_WAIT_TIMEOUT_WEBGL = {
					name: "MAX_CLIENT_WAIT_TIMEOUT_WEBGL",
					value: 37447,
					description: " "
				}, e.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE = {
					name: "VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE",
					value: 35070,
					description: "Describes the frequency divisor used for instanced rendering.",
					extensionName: "ANGLE_instanced_arrays"
				}, e.UNMASKED_VENDOR_WEBGL = {
					name: "UNMASKED_VENDOR_WEBGL",
					value: 37445,
					description: "Passed to getParameter to get the vendor string of the graphics driver.",
					extensionName: "ANGLE_instanced_arrays"
				}, e.UNMASKED_RENDERER_WEBGL = {
					name: "UNMASKED_RENDERER_WEBGL",
					value: 37446,
					description: "Passed to getParameter to get the renderer string of the graphics driver.",
					extensionName: "WEBGL_debug_renderer_info"
				}, e.MAX_TEXTURE_MAX_ANISOTROPY_EXT = {
					name: "MAX_TEXTURE_MAX_ANISOTROPY_EXT",
					value: 34047,
					description: "Returns the maximum available anisotropy.",
					extensionName: "EXT_texture_filter_anisotropic"
				}, e.TEXTURE_MAX_ANISOTROPY_EXT = {
					name: "TEXTURE_MAX_ANISOTROPY_EXT",
					value: 34046,
					description: "Passed to texParameter to set the desired maximum anisotropy for a texture.",
					extensionName: "EXT_texture_filter_anisotropic"
				}, e.COMPRESSED_RGB_S3TC_DXT1_EXT = {
					name: "COMPRESSED_RGB_S3TC_DXT1_EXT",
					value: 33776,
					description: "A DXT1-compressed image in an RGB image format.",
					extensionName: "WEBGL_compressed_texture_s3tc"
				}, e.COMPRESSED_RGBA_S3TC_DXT1_EXT = {
					name: "COMPRESSED_RGBA_S3TC_DXT1_EXT",
					value: 33777,
					description: "A DXT1-compressed image in an RGB image format with a simple on/off alpha value.",
					extensionName: "WEBGL_compressed_texture_s3tc"
				}, e.COMPRESSED_RGBA_S3TC_DXT3_EXT = {
					name: "COMPRESSED_RGBA_S3TC_DXT3_EXT",
					value: 33778,
					description: "A DXT3-compressed image in an RGBA image format. Compared to a 32-bit RGBA texture, it offers 4:1 compression.",
					extensionName: "WEBGL_compressed_texture_s3tc"
				}, e.COMPRESSED_RGBA_S3TC_DXT5_EXT = {
					name: "COMPRESSED_RGBA_S3TC_DXT5_EXT",
					value: 33779,
					description: "A DXT5-compressed image in an RGBA image format. It also provides a 4:1 compression, but differs to the DXT3 compression in how the alpha compression is done.",
					extensionName: "WEBGL_compressed_texture_s3tc"
				}, e.COMPRESSED_R11_EAC = {
					name: "COMPRESSED_R11_EAC",
					value: 37488,
					description: "One-channel (red) unsigned format compression.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_SIGNED_R11_EAC = {
					name: "COMPRESSED_SIGNED_R11_EAC",
					value: 37489,
					description: "One-channel (red) signed format compression.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_RG11_EAC = {
					name: "COMPRESSED_RG11_EAC",
					value: 37490,
					description: "Two-channel (red and green) unsigned format compression.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_SIGNED_RG11_EAC = {
					name: "COMPRESSED_SIGNED_RG11_EAC",
					value: 37491,
					description: "Two-channel (red and green) signed format compression.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_RGB8_ETC2 = {
					name: "COMPRESSED_RGB8_ETC2",
					value: 37492,
					description: "Compresses RBG8 data with no alpha channel.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_RGBA8_ETC2_EAC = {
					name: "COMPRESSED_RGBA8_ETC2_EAC",
					value: 37493,
					description: "Compresses RGBA8 data. The RGB part is encoded the same as RGB_ETC2, but the alpha part is encoded separately.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_SRGB8_ETC2 = {
					name: "COMPRESSED_SRGB8_ETC2",
					value: 37494,
					description: "Compresses sRBG8 data with no alpha channel.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = {
					name: "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC",
					value: 37495,
					description: "Compresses sRGBA8 data. The sRGB part is encoded the same as SRGB_ETC2, but the alpha part is encoded separately.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = {
					name: "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2",
					value: 37496,
					description: "Similar to RGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = {
					name: "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2",
					value: 37497,
					description: "Similar to SRGB8_ETC, but with ability to punch through the alpha channel, which means to make it completely opaque or transparent.",
					extensionName: "WEBGL_compressed_texture_etc"
				}, e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = {
					name: "COMPRESSED_RGB_PVRTC_4BPPV1_IMG",
					value: 35840,
					description: "RGB compression in 4-bit mode. One block for each 4×4 pixels.",
					extensionName: "WEBGL_compressed_texture_pvrtc"
				}, e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = {
					name: "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",
					value: 35842,
					description: "RGBA compression in 4-bit mode. One block for each 4×4 pixels.",
					extensionName: "WEBGL_compressed_texture_pvrtc"
				}, e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = {
					name: "COMPRESSED_RGB_PVRTC_2BPPV1_IMG",
					value: 35841,
					description: "RGB compression in 2-bit mode. One block for each 8×4 pixels.",
					extensionName: "WEBGL_compressed_texture_pvrtc"
				}, e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = {
					name: "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG",
					value: 35843,
					description: "RGBA compression in 2-bit mode. One block for each 8×4 pixe",
					extensionName: "WEBGL_compressed_texture_pvrtc"
				}, e.COMPRESSED_RGB_ETC1_WEBGL = {
					name: "COMPRESSED_RGB_ETC1_WEBGL",
					value: 36196,
					description: "Compresses 24-bit RGB data with no alpha channel.",
					extensionName: "WEBGL_compressed_texture_etc1"
				}, e.COMPRESSED_RGB_ATC_WEBGL = {
					name: "COMPRESSED_RGB_ATC_WEBGL",
					value: 35986,
					description: "Compresses RGB textures with no alpha channel.",
					extensionName: "WEBGL_compressed_texture_atc"
				}, e.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = {
					name: "COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL",
					value: 35986,
					description: "Compresses RGBA textures using explicit alpha encoding (useful when alpha transitions are sharp).",
					extensionName: "WEBGL_compressed_texture_atc"
				}, e.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = {
					name: "COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL",
					value: 34798,
					description: "Compresses RGBA textures using interpolated alpha encoding (useful when alpha transitions are gradient).",
					extensionName: "WEBGL_compressed_texture_atc"
				}, e.UNSIGNED_INT_24_8_WEBGL = {
					name: "UNSIGNED_INT_24_8_WEBGL",
					value: 34042,
					description: "Unsigned integer type for 24-bit depth texture data.",
					extensionName: "WEBGL_depth_texture"
				}, e.HALF_FLOAT_OES = {
					name: "HALF_FLOAT_OES",
					value: 36193,
					description: "Half floating-point type (16-bit).",
					extensionName: "OES_texture_half_float"
				}, e.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT = {
					name: "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT",
					value: 33297,
					description: " ",
					extensionName: "WEBGL_color_buffer_float"
				}, e.UNSIGNED_NORMALIZED_EXT = {
					name: "UNSIGNED_NORMALIZED_EXT",
					value: 35863,
					description: " ",
					extensionName: "WEBGL_color_buffer_float"
				}, e.MIN_EXT = {
					name: "MIN_EXT",
					value: 32775,
					description: "Produces the minimum color components of the source and destination colors.",
					extensionName: "EXT_blend_minmax"
				}, e.MAX_EXT = {
					name: "MAX_EXT",
					value: 32776,
					description: "Produces the maximum color components of the source and destination colors.",
					extensionName: "EXT_blend_minmax"
				}, e.SRGB_EXT = {
					name: "SRGB_EXT",
					value: 35904,
					description: "Unsized sRGB format that leaves the precision up to the driver.",
					extensionName: "EXT_sRGB"
				}, e.SRGB_ALPHA_EXT = {
					name: "SRGB_ALPHA_EXT",
					value: 35906,
					description: "Unsized sRGB format with unsized alpha component.",
					extensionName: "EXT_sRGB"
				}, e.SRGB8_ALPHA8_EXT = {
					name: "SRGB8_ALPHA8_EXT",
					value: 35907,
					description: "Sized (8-bit) sRGB and alpha formats.",
					extensionName: "EXT_sRGB"
				}, e.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT = {
					name: "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT",
					value: 33296,
					description: "Returns the framebuffer color encoding.",
					extensionName: "EXT_sRGB"
				}, e.FRAGMENT_SHADER_DERIVATIVE_HINT_OES = {
					name: "FRAGMENT_SHADER_DERIVATIVE_HINT_OES",
					value: 35723,
					description: "Indicates the accuracy of the derivative calculation for the GLSL built-in functions: dFdx, dFdy, and fwidth.",
					extensionName: "OES_standard_derivatives"
				}, e.COLOR_ATTACHMENT0_WEBGL = {
					name: "COLOR_ATTACHMENT0_WEBGL",
					value: 36064,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT1_WEBGL = {
					name: "COLOR_ATTACHMENT1_WEBGL",
					value: 36065,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT2_WEBGL = {
					name: "COLOR_ATTACHMENT2_WEBGL",
					value: 36066,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT3_WEBGL = {
					name: "COLOR_ATTACHMENT3_WEBGL",
					value: 36067,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT4_WEBGL = {
					name: "COLOR_ATTACHMENT4_WEBGL",
					value: 36068,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT5_WEBGL = {
					name: "COLOR_ATTACHMENT5_WEBGL",
					value: 36069,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT6_WEBGL = {
					name: "COLOR_ATTACHMENT6_WEBGL",
					value: 36070,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT7_WEBGL = {
					name: "COLOR_ATTACHMENT7_WEBGL",
					value: 36071,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT8_WEBGL = {
					name: "COLOR_ATTACHMENT8_WEBGL",
					value: 36072,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT9_WEBGL = {
					name: "COLOR_ATTACHMENT9_WEBGL",
					value: 36073,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT10_WEBGL = {
					name: "COLOR_ATTACHMENT10_WEBGL",
					value: 36074,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT11_WEBGL = {
					name: "COLOR_ATTACHMENT11_WEBGL",
					value: 36075,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT12_WEBGL = {
					name: "COLOR_ATTACHMENT12_WEBGL",
					value: 36076,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT13_WEBGL = {
					name: "COLOR_ATTACHMENT13_WEBGL",
					value: 36077,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT14_WEBGL = {
					name: "COLOR_ATTACHMENT14_WEBGL",
					value: 36078,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.COLOR_ATTACHMENT15_WEBGL = {
					name: "COLOR_ATTACHMENT15_WEBGL",
					value: 36079,
					description: "Framebuffer color attachment point",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER0_WEBGL = {
					name: "DRAW_BUFFER0_WEBGL",
					value: 34853,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER1_WEBGL = {
					name: "DRAW_BUFFER1_WEBGL",
					value: 34854,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER2_WEBGL = {
					name: "DRAW_BUFFER2_WEBGL",
					value: 34855,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER3_WEBGL = {
					name: "DRAW_BUFFER3_WEBGL",
					value: 34856,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER4_WEBGL = {
					name: "DRAW_BUFFER4_WEBGL",
					value: 34857,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER5_WEBGL = {
					name: "DRAW_BUFFER5_WEBGL",
					value: 34858,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER6_WEBGL = {
					name: "DRAW_BUFFER6_WEBGL",
					value: 34859,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER7_WEBGL = {
					name: "DRAW_BUFFER7_WEBGL",
					value: 34860,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER8_WEBGL = {
					name: "DRAW_BUFFER8_WEBGL",
					value: 34861,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER9_WEBGL = {
					name: "DRAW_BUFFER9_WEBGL",
					value: 34862,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER10_WEBGL = {
					name: "DRAW_BUFFER10_WEBGL",
					value: 34863,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER11_WEBGL = {
					name: "DRAW_BUFFER11_WEBGL",
					value: 34864,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER12_WEBGL = {
					name: "DRAW_BUFFER12_WEBGL",
					value: 34865,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER13_WEBGL = {
					name: "DRAW_BUFFER13_WEBGL",
					value: 34866,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER14_WEBGL = {
					name: "DRAW_BUFFER14_WEBGL",
					value: 34867,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.DRAW_BUFFER15_WEBGL = {
					name: "DRAW_BUFFER15_WEBGL",
					value: 34868,
					description: "Draw buffer",
					extensionName: "WEBGL_draw_buffers"
				}, e.MAX_COLOR_ATTACHMENTS_WEBGL = {
					name: "MAX_COLOR_ATTACHMENTS_WEBGL",
					value: 36063,
					description: "Maximum number of framebuffer color attachment points",
					extensionName: "WEBGL_draw_buffers"
				}, e.MAX_DRAW_BUFFERS_WEBGL = {
					name: "MAX_DRAW_BUFFERS_WEBGL",
					value: 34852,
					description: "Maximum number of draw buffers",
					extensionName: "WEBGL_draw_buffers"
				}, e.VERTEX_ARRAY_BINDING_OES = {
					name: "VERTEX_ARRAY_BINDING_OES",
					value: 34229,
					description: "The bound vertex array object (VAO).",
					extensionName: "VERTEX_ARRAY_BINDING_OES"
				}, e.QUERY_COUNTER_BITS_EXT = {
					name: "QUERY_COUNTER_BITS_EXT",
					value: 34916,
					description: "The number of bits used to hold the query result for the given target.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.CURRENT_QUERY_EXT = {
					name: "CURRENT_QUERY_EXT",
					value: 34917,
					description: "The currently active query.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.QUERY_RESULT_EXT = {
					name: "QUERY_RESULT_EXT",
					value: 34918,
					description: "The query result.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.QUERY_RESULT_AVAILABLE_EXT = {
					name: "QUERY_RESULT_AVAILABLE_EXT",
					value: 34919,
					description: "A Boolean indicating whether or not a query result is available.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.TIME_ELAPSED_EXT = {
					name: "TIME_ELAPSED_EXT",
					value: 35007,
					description: "Elapsed time (in nanoseconds).",
					extensionName: "EXT_disjoint_timer_query"
				}, e.TIMESTAMP_EXT = {
					name: "TIMESTAMP_EXT",
					value: 36392,
					description: "The current time.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.GPU_DISJOINT_EXT = {
					name: "GPU_DISJOINT_EXT",
					value: 36795,
					description: "A Boolean indicating whether or not the GPU performed any disjoint operation.",
					extensionName: "EXT_disjoint_timer_query"
				}, e.zeroMeaningByCommand = {
					getError: "NO_ERROR",
					blendFunc: "ZERO",
					blendFuncSeparate: "ZERO",
					readBuffer: "NONE",
					getFramebufferAttachmentParameter: "NONE",
					texParameterf: "NONE",
					texParameteri: "NONE",
					drawArrays: "POINTS",
					drawElements: "POINTS",
					drawArraysInstanced: "POINTS",
					drawArraysInstancedAngle: "POINTS",
					drawBuffers: "POINTS",
					drawElementsInstanced: "POINTS",
					drawRangeElements: "POINTS"
				}, e.oneMeaningByCommand = {
					blendFunc: "ONE",
					blendFuncSeparate: "ONE",
					drawArrays: "LINES",
					drawElements: "LINES",
					drawArraysInstanced: "LINES",
					drawArraysInstancedAngle: "LINES",
					drawBuffers: "LINES",
					drawElementsInstanced: "LINES",
					drawRangeElements: "LINES"
				}, e
			}(),
			g = {},
			v = {};
		! function () {
			for (var e in f)
				if (f.hasOwnProperty(e)) {
					var t = f[e];
					g[t.name] = t, v[t.value] = t
				}
		}();
		var _, E, C, A, R, S, y, T, b, w, x, L, I, O, F, M, N, P, B, $, k = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			D = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return k(t, e), Object.defineProperty(t.prototype, "analyserName", {
					get: function () {
						return t.analyserName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.appendToAnalysis = function (e, t) {
					if (e.commands) {
						for (var n = {
								total: 0,
								totalTriangles: 0,
								totalTriangleStrip: 0,
								totalTriangleFan: 0,
								totalLines: 0,
								totalLineStrip: 0,
								totalLineLoop: 0,
								totalPoints: 0
							}, i = 0, r = e.commands; i < r.length; i++) {
							var o = r[i];
							"drawArrays" === o.name && o.commandArguments.length >= 3 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[2]) : "drawArraysInstanced" === o.name && o.commandArguments.length >= 3 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[2]) : "drawArraysInstancedANGLE" === o.name && o.commandArguments.length >= 3 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[2]) : "drawElements" === o.name && o.commandArguments.length >= 2 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[1]) : "drawElementsInstanced" === o.name && o.commandArguments.length >= 2 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[1]) : "drawElementsInstancedANGLE" === o.name && o.commandArguments.length >= 2 ? this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[1]) : "drawRangeElements" === o.name && o.commandArguments.length >= 4 && this.appendToPrimitives(n, o.commandArguments[0], o.commandArguments[3])
						}
						t.total = n.total, t.triangles = n.totalTriangles, t.triangleStrip = n.totalTriangleStrip, t.triangleFan = n.totalTriangleFan, t.lines = n.totalLines, t.lineStrip = n.totalLineStrip, t.lineLoop = n.totalLineLoop, t.points = n.totalPoints
					}
				}, t.prototype.appendToPrimitives = function (e, t, n) {
					t === f.POINTS.value ? e.totalPoints += n : t === f.LINES.value ? e.totalLines += n : t === f.LINE_STRIP.value ? e.totalLineStrip += n : t === f.LINE_LOOP.value ? e.totalLineLoop += n : t === f.TRIANGLES.value ? e.totalTriangles += n : t === f.TRIANGLE_STRIP.value ? e.totalTriangleStrip += n : t === f.TRIANGLE_FAN.value && (e.totalTriangleFan += n), e.total += n
				}, t.analyserName = "Primitives", t
			}(l),
			U = function () {
				function e(e) {
					this.contextInformation = e, this.analysers = [], this.initAnalysers()
				}
				return e.prototype.appendAnalyses = function (e) {
					for (var t in this.analysers) {
						if (this.analysers.hasOwnProperty(t)) this.analysers[t].appendAnalysis(e)
					}
				}, e.prototype.initAnalysers = function () {
					this.analysers.push(new h(this.contextInformation), new m(this.contextInformation), new D(this.contextInformation))
				}, e
			}(),
			G = function () {
				function e() {}
				return e.storeOriginFunction = function (e, t) {
					if (e && e[t]) {
						var n = this.getOriginFunctionName(t);
						e[n] || (e[n] = e[t])
					}
				}, e.storePrototypeOriginFunction = function (e, t) {
					if (e && e.prototype[t]) {
						var n = this.getOriginFunctionName(t);
						e.prototype[n] || (e.prototype[n] = e.prototype[t])
					}
				}, e.executePrototypeOriginFunction = function (e, t, n, i) {
					if (e) {
						var r = this.getOriginFunctionName(n);
						if (t.prototype[r]) return e[r] || (e[r] = t.prototype[r]), this.executeFunction(e, r, i)
					}
				}, e.executeOriginFunction = function (e, t, n) {
					if (e) {
						var i = this.getOriginFunctionName(t);
						if (e[i]) return this.executeFunction(e, i, n)
					}
				}, e.executeFunction = function (e, t, n) {
					var i = n;
					if (void 0 === i || 0 === i.length) return e[t]();
					switch (i.length) {
						case 1:
							return e[t](i[0]);
						case 2:
							return e[t](i[0], i[1]);
						case 3:
							return e[t](i[0], i[1], i[2]);
						case 4:
							return e[t](i[0], i[1], i[2], i[3]);
						case 5:
							return e[t](i[0], i[1], i[2], i[3], i[4]);
						case 6:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5]);
						case 7:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
						case 8:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7]);
						case 9:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8]);
						case 10:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9]);
						case 11:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10]);
						case 12:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11]);
						case 13:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12]);
						case 14:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13]);
						case 15:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14]);
						case 16:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15]);
						case 17:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15], i[16]);
						case 18:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15], i[16], i[17]);
						case 19:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15], i[16], i[17], i[18]);
						case 20:
							return e[t](i[0], i[1], i[2], i[3], i[4], i[5], i[6], i[7], i[8], i[9], i[10], i[11], i[12], i[13], i[14], i[15], i[16], i[17], i[18], i[19]);
						default:
							return e[t].apply(e, i)
					}
				}, e.getOriginFunctionName = function (e) {
					return this.originFunctionPrefix + e
				}, e.originFunctionPrefix = "__SPECTOR_Origin_", e
			}(),
			W = function () {
				function e() {}
				return e.getStackTrace = function (e, t) {
					void 0 === e && (e = 0), void 0 === t && (t = 0);
					var n = [];
					try {
						throw new Error("Errorator.")
					} catch (e) {
						if (e.stack)
							for (var i = 0, r = (o = e.stack.split("\n")).length; i < r; i++) o[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/) ? n.push(o[i]) : 0 === o[i].indexOf("    at ") ? (o[i] = o[i].replace("    at ", ""), n.push(o[i])) : -1 !== o[i].indexOf("/<@http") ? (o[i] = o[i].substring(o[i].indexOf("/<@http") + 3), n.push(o[i])) : -1 !== o[i].indexOf("@http") && (o[i] = o[i].replace("@http", " (http"), o[i] = o[i] + ")", n.push(o[i]));
						else if (e.message) {
							var o;
							for (i = 0, r = (o = e.message.split("\n")).length; i < r; i++)
								if (o[i].match(/^\s*[A-Za-z0-9\-_\$]+\(/)) {
									var s = o[i];
									o[i + 1] && (s += " at " + o[i + 1], i++), n.push(s)
								}
						}
					}
					if (!n)
						for (var a = arguments.callee.caller; a;) {
							var c = a.toString(),
								l = c.substring(c.indexOf("function") + 8, c.indexOf("")) || "anonymous";
							n.push(l), a = a.caller
						}
					if (n) {
						n.shift();
						for (i = 0; i < e && n.length > 0; i++) n.shift();
						for (i = 0; i < t && n.length > 0; i++) n.pop()
					}
					return n
				}, e
			}(),
			V = function () {
				function e() {}
				return e.getWebGlObjectTag = function (t) {
					return t[e.SPECTOROBJECTTAGKEY]
				}, e.attachWebGlObjectTag = function (t, n) {
					n.displayText = e.stringifyWebGlObjectTag(n), t[e.SPECTOROBJECTTAGKEY] = n
				}, e.stringifyWebGlObjectTag = function (e) {
					return e ? e.typeName + " - ID: " + e.id : "No tag available."
				}, e.SPECTOROBJECTTAGKEY = "__SPECTOR_Object_TAG", e
			}(),
			H = function () {
				function e() {
					this.id = 0
				}
				return Object.defineProperty(e.prototype, "type", {
					get: function () {
						return window[this.typeName] || null
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.tagWebGlObject = function (e) {
					if (this.type) {
						var t;
						if (!e) return t;
						if (t = V.getWebGlObjectTag(e)) return t;
						if (e instanceof this.type) {
							var n = this.getNextId();
							return t = {
								typeName: this.typeName,
								id: n
							}, V.attachWebGlObjectTag(e, t), t
						}
						return t
					}
				}, e.prototype.getNextId = function () {
					return this.id++
				}, e
			}(),
			X = function () {
				function e(e) {
					this.options = e
				}
				return e.prototype.createCapture = function (e, t, n) {
					var i = W.getStackTrace(4, 1),
						r = 0 === e.name.indexOf("uniform") ? this.stringifyUniform(e.arguments) : this.stringify(e.arguments, e.result),
						o = {
							id: t,
							startTime: e.startTime,
							commandEndTime: e.endTime,
							endTime: 0,
							name: e.name,
							commandArguments: e.arguments,
							result: e.result,
							stackTrace: i,
							status: 0,
							marker: n,
							text: r
						};
					this.transformCapture(o);
					for (var s = 0; s < o.commandArguments.length; s++) {
						var a = o.commandArguments[s];
						a && a.length && a.length > 50 && (o.commandArguments[s] = "Array Length: " + a.length)
					}
					if (o.commandArguments) {
						var c = [];
						for (s = 0; s < o.commandArguments.length; s++) {
							var l = o.commandArguments[s];
							void 0 === l ? c.push(void 0) : null === l ? c.push(null) : c.push(JSON.parse(this.stringifyJSON(l)))
						}
						o.commandArguments = c
					}
					return o.result && (o.result = JSON.parse(this.stringifyJSON(o.result))), o
				}, e.prototype.stringifyJSON = function (e) {
					try {
						return JSON.stringify(e)
					} catch (e) {
						return null
					}
				}, e.prototype.transformCapture = function (e) {}, e.prototype.stringify = function (e, t) {
					var n = this.spiedCommandName;
					return e && e.length > 0 && (n += ": " + this.stringifyArgs(e).join(", ")), t && (n += " -> " + this.stringifyResult(t)), n
				}, e.prototype.stringifyUniform = function (e) {
					var t = this.spiedCommandName;
					if (e && e.length > 0) {
						var n = [];
						n.push(this.stringifyValue(e[0]));
						for (var i = 1; i < e.length; i++)
							if ("number" == typeof e[i]) {
								var r = e[i] + "";
								n.push(r)
							} else {
								r = this.stringifyValue(e[i]);
								n.push(r)
							} t += ": " + n.join(", ")
					}
					return t
				}, e.prototype.stringifyArgs = function (e) {
					for (var t = [], n = 0; n < e.length; n++) {
						var i = e[n],
							r = this.stringifyValue(i);
						t.push(r)
					}
					return t
				}, e.prototype.stringifyResult = function (e) {
					if (e) return this.stringifyValue(e)
				}, e.prototype.stringifyValue = function (e) {
					if (null === e) return "null";
					if (void 0 === e) return "undefined";
					var t = V.getWebGlObjectTag(e);
					return t ? t.displayText : "number" == typeof e && f.isWebGlConstant(e) ? f.stringifyWebGlConstant(e, this.spiedCommandName) : "string" == typeof e ? e : e instanceof HTMLImageElement ? e.src : e instanceof ArrayBuffer ? "[--(" + e.byteLength + ")--]" : e.length ? "[..(" + e.length + ")..]" : e
				}, e
			}(),
			j = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			K = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return j(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [],
						n = this.options.context.getParameter(f.READ_FRAMEBUFFER_BINDING.value),
						i = this.options.tagWebGlObject(n);
					t.push("READ FROM: " + this.stringifyValue(i));
					var r = this.options.context.getParameter(f.DRAW_FRAMEBUFFER_BINDING.value),
						o = this.options.tagWebGlObject(r);
					t.push("WRITE TO: " + this.stringifyValue(o));
					for (var s = 0; s < 8; s++) t.push(e[s]);
					return (e[8] & f.DEPTH_BUFFER_BIT.value) === f.DEPTH_BUFFER_BIT.value && t.push(f.DEPTH_BUFFER_BIT.name), (e[8] & f.STENCIL_BUFFER_BIT.value) === f.STENCIL_BUFFER_BIT.value && t.push(f.STENCIL_BUFFER_BIT.name), (e[8] & f.COLOR_BUFFER_BIT.value) === f.COLOR_BUFFER_BIT.value && t.push(f.COLOR_BUFFER_BIT.name), t.push(f.stringifyWebGlConstant(e[9], "blitFrameBuffer")), t
				}, t.commandName = "blitFrameBuffer", t
			}(X),
			z = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Y = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return z(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return (e[0] & f.DEPTH_BUFFER_BIT.value) === f.DEPTH_BUFFER_BIT.value && t.push(f.DEPTH_BUFFER_BIT.name), (e[0] & f.STENCIL_BUFFER_BIT.value) === f.STENCIL_BUFFER_BIT.value && t.push(f.STENCIL_BUFFER_BIT.name), (e[0] & f.COLOR_BUFFER_BIT.value) === f.COLOR_BUFFER_BIT.value && t.push(f.COLOR_BUFFER_BIT.name), t
				}, t.commandName = "clear", t
			}(X),
			q = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Z = ["lineWidth"],
			Q = function (e) {
				function t(t, n) {
					var i = e.call(this, t) || this;
					return i.internalSpiedCommandName = n, i.isDeprecated = Z.indexOf(i.spiedCommandName) > -1, i
				}
				return q(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return this.internalSpiedCommandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.transformCapture = function (e) {
					this.isDeprecated && (e.status = 50)
				}, t
			}(X),
			J = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ee = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return J(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(e[0]), t
				}, t.commandName = "disableVertexAttribArray", t
			}(X),
			te = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ne = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return te(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawArrays")), t.push(e[1]), t.push(e[2]), t
				}, t.commandName = "drawArrays", t
			}(X),
			ie = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			re = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ie(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawArraysInstanced")), t.push(e[1]), t.push(e[2]), t.push(e[3]), t
				}, t.commandName = "drawArraysInstanced", t
			}(X),
			oe = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			se = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return oe(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawArraysInstancedANGLE")), t.push(e[1]), t.push(e[2]), t.push(e[3]), t
				}, t.commandName = "drawArraysInstancedANGLE", t
			}(X),
			ae = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ce = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ae(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawElements")), t.push(e[1]), t.push(f.stringifyWebGlConstant(e[2], "drawElements")), t.push(e[3]), t
				}, t.commandName = "drawElements", t
			}(X),
			le = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ue = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return le(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawElementsInstancedANGLE")), t.push(e[1]), t.push(f.stringifyWebGlConstant(e[2], "drawElementsInstancedANGLE")), t.push(e[3]), t.push(e[4]), t
				}, t.commandName = "drawElementsInstancedANGLE", t
			}(X),
			he = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			de = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return he(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawElementsInstanced")), t.push(e[1]), t.push(f.stringifyWebGlConstant(e[2], "drawElementsInstanced")), t.push(e[3]), t.push(e[4]), t
				}, t.commandName = "drawElementsInstanced", t
			}(X),
			pe = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			me = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return pe(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(f.stringifyWebGlConstant(e[0], "drawRangeElements")), t.push(e[1]), t.push(e[2]), t.push(e[3]), t.push(f.stringifyWebGlConstant(e[4], "drawRangeElements")), t.push(e[5]), t
				}, t.commandName = "drawRangeElements", t
			}(X),
			fe = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ge = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return fe(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					if (e) return "name: " + e.name + ", size: " + e.size + ", type: " + e.type
				}, t.commandName = "getActiveAttrib", t
			}(X),
			ve = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			_e = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ve(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					if (e) return "name: " + e.name + ", size: " + e.size + ", type: " + e.type
				}, t.commandName = "getActiveUniform", t
			}(X),
			Ee = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Ce = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ee(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					return e ? "true" : "false"
				}, t.commandName = "getExtension", t
			}(X),
			Ae = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Re = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ae(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					if (!e) return "null";
					var t = V.getWebGlObjectTag(e);
					return t ? t.displayText : e
				}, t.commandName = "getParameter", t
			}(X),
			Se = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ye = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Se(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					if (e) return "min: " + e.rangeMin + ", max: " + e.rangeMax + ", precision: " + e.precision
				}, t.commandName = "getShaderPrecisionFormat", t
			}(X),
			Te = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			be = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Te(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyResult = function (e) {
					if (e) return "name: " + e.name + ", size: " + e.size + ", type: " + e.type
				}, t.commandName = "getTransformFeedbackVarying", t
			}(X),
			we = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			xe = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return we(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					for (var t = [], n = 0; n < 4; n++) t.push(e[n].toFixed(0));
					return t
				}, t.commandName = "scissor", t
			}(X),
			Le = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Ie = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Le(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(e[0]), t.push(e[1]), t.push(f.stringifyWebGlConstant(e[2], "vertexAttribPointer")), t.push(e[3]), t.push(e[4]), t.push(e[5]), t
				}, t.commandName = "vertexAttribPointer", t
			}(X),
			Oe = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Fe = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Oe(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					for (var t = [], n = 0; n < 4; n++) t.push(e[n].toFixed(0));
					return t
				}, t.commandName = "viewport", t
			}(X),
			Me = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Ne = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Me(t, e), Object.defineProperty(t.prototype, "spiedCommandName", {
					get: function () {
						return t.commandName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.stringifyArgs = function (e) {
					var t = [];
					return t.push(e[0]), t
				}, t.commandName = "enableVertexAttribArray", t
			}(X),
			Pe = function () {
				function e(e) {
					this.spiedCommandName = e.spiedCommandName, this.spiedCommandRunningContext = e.spiedCommandRunningContext, this.spiedCommand = this.spiedCommandRunningContext[this.spiedCommandName], G.storeOriginFunction(this.spiedCommandRunningContext, this.spiedCommandName), this.callback = e.callback, this.commandOptions = {
						context: e.context,
						contextVersion: e.contextVersion,
						extensions: e.extensions,
						toggleCapture: e.toggleCapture
					}, this.initCustomCommands(), this.initCommand()
				}
				return e.prototype.spy = function () {
					this.spiedCommandRunningContext[this.spiedCommandName] = this.overloadedCommand
				}, e.prototype.unSpy = function () {
					this.spiedCommandRunningContext[this.spiedCommandName] = this.spiedCommand
				}, e.prototype.createCapture = function (e, t, n) {
					return this.command.createCapture(e, t, n)
				}, e.prototype.initCommand = function () {
					e.customCommandsConstructors[this.spiedCommandName] ? this.command = e.customCommandsConstructors[this.spiedCommandName](this.commandOptions) : this.command = new Q(this.commandOptions, this.spiedCommandName), this.overloadedCommand = this.getSpy()
				}, e.prototype.getSpy = function () {
					var e = this;
					return function () {
						var t = a.now,
							n = G.executeOriginFunction(e.spiedCommandRunningContext, e.spiedCommandName, arguments),
							i = a.now,
							r = {
								name: e.spiedCommandName,
								arguments: arguments,
								result: n,
								startTime: t,
								endTime: i
							};
						return e.callback(e, r), n
					}
				}, e.prototype.initCustomCommands = function () {
					var t;
					e.customCommandsConstructors || (e.customCommandsConstructors = ((t = {})[K.commandName] = function (e) {
						return new K(e)
					}, t[Y.commandName] = function (e) {
						return new Y(e)
					}, t[ee.commandName] = function (e) {
						return new ee(e)
					}, t[ne.commandName] = function (e) {
						return new ne(e)
					}, t[re.commandName] = function (e) {
						return new re(e)
					}, t[se.commandName] = function (e) {
						return new se(e)
					}, t[ce.commandName] = function (e) {
						return new ce(e)
					}, t[de.commandName] = function (e) {
						return new de(e)
					}, t[ue.commandName] = function (e) {
						return new ue(e)
					}, t[me.commandName] = function (e) {
						return new me(e)
					}, t[ge.commandName] = function (e) {
						return new ge(e)
					}, t[_e.commandName] = function (e) {
						return new _e(e)
					}, t[Ce.commandName] = function (e) {
						return new Ce(e)
					}, t[Re.commandName] = function (e) {
						return new Re(e)
					}, t[ye.commandName] = function (e) {
						return new ye(e)
					}, t[be.commandName] = function (e) {
						return new be(e)
					}, t[xe.commandName] = function (e) {
						return new xe(e)
					}, t[Ie.commandName] = function (e) {
						return new Ie(e)
					}, t[Fe.commandName] = function (e) {
						return new Fe(e)
					}, t[Ne.commandName] = function (e) {
						return new Ne(e)
					}, t))
				}, e
			}(),
			Be = function () {
				function e(e) {
					this.options = e, this.context = e.context, this.contextVersion = e.contextVersion, this.extensions = e.extensions, this.toggleCapture = e.toggleCapture, this.consumeCommands = this.getConsumeCommands(), this.changeCommandsByState = this.getChangeCommandsByState(), this.commandNameToStates = this.getCommandNameToStates()
				}
				return Object.defineProperty(e.prototype, "requireStartAndStopStates", {
					get: function () {
						return !0
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.startCapture = function (e, t) {
					return this.quickCapture = t, this.capturedCommandsByState = {}, e && this.requireStartAndStopStates && (this.currentState = {}, this.readFromContextNoSideEffects()), this.copyCurrentStateToPrevious(), this.currentState = {}, this.previousState
				}, e.prototype.stopCapture = function () {
					return this.requireStartAndStopStates && this.readFromContextNoSideEffects(), this.analyse(void 0), this.currentState
				}, e.prototype.registerCallbacks = function (e) {
					for (var t in this.changeCommandsByState)
						if (this.changeCommandsByState.hasOwnProperty(t))
							for (var n = 0, i = this.changeCommandsByState[t]; n < i.length; n++) {
								var r = i[n];
								e[r] = e[r] || [], e[r].push(this.onChangeCommand.bind(this))
							}
					for (var o = 0, s = this.consumeCommands; o < s.length; o++) {
						var a = s[o];
						e[a] = e[a] || [], e[a].push(this.onConsumeCommand.bind(this))
					}
				}, e.prototype.getStateData = function () {
					return this.currentState
				}, e.prototype.getConsumeCommands = function () {
					return []
				}, e.prototype.getChangeCommandsByState = function () {
					return {}
				}, e.prototype.copyCurrentStateToPrevious = function () {
					this.currentState && (this.previousState = this.currentState)
				}, e.prototype.onChangeCommand = function (e) {
					for (var t = 0, n = this.commandNameToStates[e.name]; t < n.length; t++) {
						var i = n[t];
						if (!this.isValidChangeCommand(e, i)) return;
						this.capturedCommandsByState[i] = this.capturedCommandsByState[i] || [], this.capturedCommandsByState[i].push(e)
					}
				}, e.prototype.isValidChangeCommand = function (e, t) {
					return !0
				}, e.prototype.onConsumeCommand = function (e) {
					this.isValidConsumeCommand(e) && (this.readFromContextNoSideEffects(), this.analyse(e), this.storeCommandIds(), e[this.stateName] = this.currentState, this.startCapture(!1, this.quickCapture))
				}, e.prototype.isValidConsumeCommand = function (e) {
					return !0
				}, e.prototype.analyse = function (e) {
					for (var t in this.capturedCommandsByState)
						if (this.capturedCommandsByState.hasOwnProperty(t)) {
							var n = this.capturedCommandsByState[t],
								i = n.length - 1;
							if (i >= 0)
								if (e) {
									for (var r = 0; r < i; r++) {
										var o = n[r];
										o.consumeCommandId = e.id, this.changeCommandCaptureStatus(o, 30)
									}
									var s = this.isStateEnableNoSideEffects(t, e.commandArguments);
									(a = n[i]).consumeCommandId = e.id, this.areStatesEquals(this.currentState[t], this.previousState[t]) ? this.changeCommandCaptureStatus(a, 30) : s ? this.changeCommandCaptureStatus(a, 40) : this.changeCommandCaptureStatus(a, 20)
								} else
									for (r = 0; r < n.length; r++) {
										var a = n[r];
										this.changeCommandCaptureStatus(a, 10)
									}
						}
				}, e.prototype.storeCommandIds = function () {
					for (var e = ["unusedCommandIds", "disabledCommandIds", "redundantCommandIds", "validCommandIds"], t = 0, n = e; t < n.length; t++) {
						var i = n[t];
						this.currentState[i] = []
					}
					for (var r in this.capturedCommandsByState)
						if (this.capturedCommandsByState.hasOwnProperty(r))
							for (var o = 0, s = this.capturedCommandsByState[r]; o < s.length; o++) {
								var a = s[o];
								switch (a.status) {
									case 10:
										this.currentState.unusedCommandIds.push(a.id);
										break;
									case 20:
										this.currentState.disabledCommandIds.push(a.id);
										break;
									case 30:
										this.currentState.redundantCommandIds.push(a.id);
										break;
									case 40:
										this.currentState.validCommandIds.push(a.id)
								}
							}
					for (var c = 0, l = e; c < l.length; c++) {
						i = l[c];
						this.currentState[i].length || delete this.currentState[i]
					}
				}, e.prototype.changeCommandCaptureStatus = function (e, t) {
					return e.status < t && (e.status = t, !0)
				}, e.prototype.areStatesEquals = function (e, t) {
					if (typeof e != typeof t) return !1;
					if (e && !t) return !1;
					if (t && !e) return !1;
					if (null == e) return !0;
					if (e.length && t.length && "string" != typeof e) {
						if (e.length !== t.length) return !1;
						for (var n = 0; n < e.length; n++)
							if (e[n] !== t[n]) return !1;
						return !0
					}
					return e === t
				}, e.prototype.isStateEnable = function (e, t) {
					return !0
				}, e.prototype.getSpectorData = function (e) {
					if (e) return {
						__SPECTOR_Object_TAG: V.getWebGlObjectTag(e) || this.options.tagWebGlObject(e),
						__SPECTOR_Object_CustomData: e.__SPECTOR_Object_CustomData,
						__SPECTOR_Metadata: e.__SPECTOR_Metadata
					}
				}, e.prototype.readFromContextNoSideEffects = function () {
					this.toggleCapture(!1), this.readFromContext(), this.toggleCapture(!0)
				}, e.prototype.isStateEnableNoSideEffects = function (e, t) {
					this.toggleCapture(!1);
					var n = this.isStateEnable(e, t);
					return this.toggleCapture(!0), n
				}, e.prototype.getCommandNameToStates = function () {
					var e = {};
					for (var t in this.changeCommandsByState)
						if (this.changeCommandsByState.hasOwnProperty(t))
							for (var n = 0, i = this.changeCommandsByState[t]; n < i.length; n++) {
								var r = i[n];
								e[r] = e[r] || [], e[r].push(t)
							}
					return e
				}, e
			}(),
			$e = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ke = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return $e(t, e), t.prototype.getWebgl1Parameters = function () {
					return []
				}, t.prototype.getWebgl2Parameters = function () {
					return []
				}, t.prototype.getChangeCommandsByState = function () {
					this.parameters = [], this.parameters.push(this.getWebgl1Parameters()), this.contextVersion > 1 && this.parameters.push(this.getWebgl2Parameters());
					for (var e = {}, t = 1; t <= this.contextVersion && !(t > this.parameters.length); t++)
						if (this.parameters[t - 1])
							for (var n = 0, i = this.parameters[t - 1]; n < i.length; n++) {
								var r = i[n];
								if (r.changeCommands)
									for (var o = 0, s = r.changeCommands; o < s.length; o++) {
										var a = s[o];
										e[r.constant.name] = e[r.constant.name] || [], e[r.constant.name].push(a)
									}
							}
					return e
				}, t.prototype.readFromContext = function () {
					for (var e = 1; e <= this.contextVersion && !(e > this.parameters.length); e++)
						for (var t = 0, n = this.parameters[e - 1]; t < n.length; t++) {
							var i = n[t],
								r = this.readParameterFromContext(i),
								o = V.getWebGlObjectTag(r);
							if (o) this.currentState[i.constant.name] = o;
							else {
								var s = this.stringifyParameterValue(r, i);
								this.currentState[i.constant.name] = s
							}
						}
				}, t.prototype.readParameterFromContext = function (e) {
					return e.constant.extensionName && !this.extensions[e.constant.extensionName] ? "Extension " + e.constant.extensionName + " is unavailble." : this.context.getParameter(e.constant.value)
				}, t.prototype.stringifyParameterValue = function (e, t) {
					if (null === e) return "null";
					if (void 0 === e) return "undefined";
					if (30 === t.returnType) return e = e.toString(2), e = "00000000000000000000000000000000".substr(e.length) + e;
					if ("number" == typeof e && f.isWebGlConstant(e)) {
						if (20 === t.returnType) {
							var n = t.changeCommands && t.changeCommands[0] || "";
							return e = f.stringifyWebGlConstant(e, n)
						}
						return e
					}
					if (e.length && "string" != typeof e) {
						for (var i = [], r = 0; r < e.length; r++) i.push(e[r]);
						return i
					}
					return e
				}, t
			}(Be),
			De = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Ue = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return De(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.PACK_ALIGNMENT,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_ALIGNMENT,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_COLORSPACE_CONVERSION_WEBGL,
						returnType: 20,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_FLIP_Y_WEBGL,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
						changeCommands: ["pixelStorei"]
					}]
				}, t.prototype.getWebgl2Parameters = function () {
					return [{
						constant: f.PACK_ROW_LENGTH,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.PACK_SKIP_PIXELS,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.PACK_SKIP_ROWS,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_IMAGE_HEIGHT,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_SKIP_PIXELS,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_SKIP_ROWS,
						changeCommands: ["pixelStorei"]
					}, {
						constant: f.UNPACK_SKIP_IMAGES,
						changeCommands: ["pixelStorei"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return ["readPixels", "texImage2D", "texSubImage2D"]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return g[t].value === e.commandArguments[0]
				}, t.stateName = "AlignmentState", t
			}(ke),
			Ge = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			We = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ge(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.BLEND,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.BLEND_COLOR,
						changeCommands: ["blendColor"]
					}, {
						constant: f.BLEND_DST_ALPHA,
						returnType: 20,
						changeCommands: ["blendFunc", "blendFuncSeparate"]
					}, {
						constant: f.BLEND_DST_RGB,
						returnType: 20,
						changeCommands: ["blendFunc", "blendFuncSeparate"]
					}, {
						constant: f.BLEND_EQUATION_ALPHA,
						returnType: 20,
						changeCommands: ["blendEquation", "blendEquationSeparate"]
					}, {
						constant: f.BLEND_EQUATION_RGB,
						returnType: 20,
						changeCommands: ["blendEquation", "blendEquationSeparate"]
					}, {
						constant: f.BLEND_SRC_ALPHA,
						returnType: 20,
						changeCommands: ["blendFunc", "blendFuncSeparate"]
					}, {
						constant: f.BLEND_SRC_RGB,
						returnType: 20,
						changeCommands: ["blendFunc", "blendFuncSeparate"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || e.commandArguments[0] === f.BLEND.value
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.BLEND.value)
				}, t.stateName = "BlendState", t
			}(ke),
			Ve = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			He = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ve(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.COLOR_CLEAR_VALUE,
						changeCommands: ["clearColor"]
					}, {
						constant: f.DEPTH_CLEAR_VALUE,
						changeCommands: ["clearDepth"]
					}, {
						constant: f.STENCIL_CLEAR_VALUE,
						changeCommands: ["clearStencil"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return ["clear"]
				}, t.prototype.isStateEnable = function (e, t) {
					switch (e) {
						case f.COLOR_CLEAR_VALUE.name:
							return f.COLOR_BUFFER_BIT.value === (t[0] & f.COLOR_BUFFER_BIT.value);
						case f.DEPTH_CLEAR_VALUE.name:
							return f.DEPTH_BUFFER_BIT.value === (t[0] & f.DEPTH_BUFFER_BIT.value);
						case f.STENCIL_CLEAR_VALUE.name:
							return f.STENCIL_BUFFER_BIT.value === (t[0] & f.STENCIL_BUFFER_BIT.value)
					}
					return !1
				}, t.stateName = "ClearState", t
			}(ke),
			Xe = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			je = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Xe(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.COLOR_WRITEMASK,
						changeCommands: ["colorMask"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.stateName = "ColorState", t
			}(ke),
			Ke = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ze = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ke(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.SAMPLE_COVERAGE_VALUE,
						changeCommands: ["sampleCoverage"]
					}, {
						constant: f.SAMPLE_COVERAGE_INVERT,
						changeCommands: ["sampleCoverage"]
					}]
				}, t.prototype.getWebgl2Parameters = function () {
					return [{
						constant: f.SAMPLE_COVERAGE,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.SAMPLE_ALPHA_TO_COVERAGE,
						changeCommands: ["enable", "disable"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || (e.commandArguments[0] === f.SAMPLE_COVERAGE.value ? t === f.SAMPLE_COVERAGE.name : e.commandArguments[0] === f.SAMPLE_ALPHA_TO_COVERAGE.value && t === f.SAMPLE_ALPHA_TO_COVERAGE.name)
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					return 2 === this.contextVersion && this.context.isEnabled(f.SAMPLE_COVERAGE.value)
				}, t.stateName = "CoverageState", t
			}(ke),
			Ye = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			qe = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ye(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.CULL_FACE,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.CULL_FACE_MODE,
						returnType: 20,
						changeCommands: ["cullFace"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || e.commandArguments[0] === f.CULL_FACE.value
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.CULL_FACE.value)
				}, t.stateName = "CullState", t
			}(ke),
			Ze = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Qe = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ze(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.DEPTH_TEST,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.DEPTH_FUNC,
						returnType: 20,
						changeCommands: ["depthFunc"]
					}, {
						constant: f.DEPTH_RANGE,
						changeCommands: ["depthRange"]
					}, {
						constant: f.DEPTH_WRITEMASK,
						changeCommands: ["depthMask"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || e.commandArguments[0] === f.DEPTH_TEST.value
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.DEPTH_TEST.value)
				}, t.stateName = "DepthState", t
			}(ke),
			Je = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			et = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Je(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.DITHER,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.VIEWPORT,
						changeCommands: ["viewPort"]
					}, {
						constant: f.FRONT_FACE,
						returnType: 20,
						changeCommands: ["frontFace"]
					}, {
						constant: f.FRAGMENT_SHADER_DERIVATIVE_HINT_OES,
						changeCommands: ["hint"]
					}]
				}, t.prototype.getWebgl2Parameters = function () {
					return [{
						constant: f.RASTERIZER_DISCARD,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.FRAGMENT_SHADER_DERIVATIVE_HINT,
						changeCommands: ["hint"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" === e.name || "disable" === e.name ? e.commandArguments[0] === f.DITHER.value ? t === f.DITHER.name : e.commandArguments[0] === f.RASTERIZER_DISCARD.value && t === f.RASTERIZER_DISCARD.name : "hint" !== e.name || (e.commandArguments[0] === f.FRAGMENT_SHADER_DERIVATIVE_HINT_OES.value ? t === f.FRAGMENT_SHADER_DERIVATIVE_HINT_OES.name : e.commandArguments[0] === f.FRAGMENT_SHADER_DERIVATIVE_HINT.value && t === f.FRAGMENT_SHADER_DERIVATIVE_HINT.name)
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					switch (e) {
						case f.DITHER.name:
							return this.context.isEnabled(f.DITHER.value);
						case f.RASTERIZER_DISCARD.name:
							return this.context.isEnabled(f.RASTERIZER_DISCARD.value)
					}
					return !0
				}, t.stateName = "DrawState", t
			}(ke),
			tt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			nt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return tt(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.GENERATE_MIPMAP_HINT,
						changeCommands: ["hint"]
					}]
				}, t.prototype.getConsumeCommands = function () {
					return ["generateMipmap"]
				}, t.stateName = "MipmapHintState", t
			}(ke),
			it = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			rt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return it(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.POLYGON_OFFSET_FILL,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.POLYGON_OFFSET_FACTOR,
						changeCommands: ["polygonOffset"]
					}, {
						constant: f.POLYGON_OFFSET_UNITS,
						changeCommands: ["polygonOffset"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || e.commandArguments[0] === f.POLYGON_OFFSET_FILL.value
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.POLYGON_OFFSET_FILL.value)
				}, t.stateName = "PolygonOffsetState", t
			}(ke),
			ot = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			st = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ot(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.SCISSOR_TEST,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.SCISSOR_BOX,
						changeCommands: ["scissor"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, t) {
					return "enable" !== e.name && "disable" !== e.name || e.commandArguments[0] === f.SCISSOR_TEST.value
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.SCISSOR_TEST.value)
				}, t.stateName = "ScissorState", t
			}(ke),
			at = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ct = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return at(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.STENCIL_TEST,
						changeCommands: ["enable", "disable"]
					}, {
						constant: f.STENCIL_BACK_FAIL,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_BACK_FUNC,
						returnType: 20,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_BACK_PASS_DEPTH_FAIL,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_BACK_PASS_DEPTH_PASS,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_BACK_REF,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_BACK_VALUE_MASK,
						returnType: 30,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_BACK_WRITEMASK,
						returnType: 30,
						changeCommands: ["stencilMask", "stencilMaskSeparate"]
					}, {
						constant: f.STENCIL_FAIL,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_FUNC,
						returnType: 20,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_PASS_DEPTH_FAIL,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_PASS_DEPTH_PASS,
						returnType: 20,
						changeCommands: ["stencilOp", "stencilOpSeparate"]
					}, {
						constant: f.STENCIL_REF,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_VALUE_MASK,
						returnType: 30,
						changeCommands: ["stencilFunc", "stencilFuncSeparate"]
					}, {
						constant: f.STENCIL_WRITEMASK,
						returnType: 30,
						changeCommands: ["stencilMask", "stencilMaskSeparate"]
					}]
				}, t.prototype.isValidChangeCommand = function (e, n) {
					return "enable" === e.name || "disable" === e.name ? e.commandArguments[0] === f.STENCIL_TEST.value : "stencilOp" === e.name || "stencilOpSeparate" === e.name ? t.stencilOpStates.indexOf(e.commandArguments[0]) > 0 : "stencilFunc" === e.name || "stencilFuncSeparate" === e.name ? t.stencilFuncStates.indexOf(e.commandArguments[0]) > 0 : "stencilMask" !== e.name && "stencilMaskSeparate" !== e.name || t.stencilMaskStates.indexOf(e.commandArguments[0]) > 0
				}, t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.isStateEnable = function (e, t) {
					return this.context.isEnabled(f.STENCIL_TEST.value)
				}, t.stateName = "StencilState", t.stencilOpStates = [f.STENCIL_BACK_FAIL.value, f.STENCIL_BACK_PASS_DEPTH_FAIL.value, f.STENCIL_BACK_PASS_DEPTH_PASS.value, f.STENCIL_FAIL.value, f.STENCIL_PASS_DEPTH_FAIL.value, f.STENCIL_PASS_DEPTH_PASS.value], t.stencilFuncStates = [f.STENCIL_BACK_FUNC.value, f.STENCIL_BACK_REF.value, f.STENCIL_BACK_VALUE_MASK.value, f.STENCIL_FUNC.value, f.STENCIL_REF.value, f.STENCIL_VALUE_MASK.value], t.stencilMaskStates = [f.STENCIL_BACK_WRITEMASK.value, f.STENCIL_WRITEMASK.value], t
			}(ke),
			lt = function () {
				function e() {}
				return e.isSupportedCombination = function (e, t, n) {
					return e = e || f.UNSIGNED_BYTE.value, ((t = t || f.RGBA.value) === f.RGB.value || t === f.RGBA.value) && ((n === f.RGB.value || n === f.RGBA.value || n === f.RGBA8.value || n === f.RGBA16F.value || n === f.RGBA32F.value || n === f.RGB16F.value || n === f.RGB32F.value || n === f.R11F_G11F_B10F.value) && this.isSupportedComponentType(e))
				}, e.readPixels = function (e, t, n, i, r, o) {
					e.getError();
					var s, a = i * r * 4;
					if (o === f.UNSIGNED_BYTE.value ? s = new Uint8Array(a) : (o = f.FLOAT.value, s = new Float32Array(a)), e.readPixels(t, n, i, r, e.RGBA, o, s), !e.getError()) {
						if (o === f.UNSIGNED_BYTE.value) return s;
						for (var c = new Uint8Array(i * r * 4), l = 0; l < r; l++)
							for (var u = 0; u < i; u++) c[l * i * 4 + 4 * u + 0] = 255 * Math.min(Math.max(s[l * i * 4 + 4 * u + 0], 0), 1), c[l * i * 4 + 4 * u + 1] = 255 * Math.min(Math.max(s[l * i * 4 + 4 * u + 1], 0), 1), c[l * i * 4 + 4 * u + 2] = 255 * Math.min(Math.max(s[l * i * 4 + 4 * u + 2], 0), 1), c[l * i * 4 + 4 * u + 3] = 255 * Math.min(Math.max(s[l * i * 4 + 4 * u + 3], 0), 1);
						return c
					}
				}, e.isSupportedComponentType = function (e) {
					return e === f.UNSIGNED_BYTE.value || e === f.UNSIGNED_SHORT_4_4_4_4.value || e === f.UNSIGNED_SHORT_5_5_5_1.value || e === f.UNSIGNED_SHORT_5_6_5.value || e === f.HALF_FLOAT.value || e === f.HALF_FLOAT_OES.value || e === f.FLOAT.value
				}, e
			}(),
			ut = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ht = function () {
				for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
				var i = Array(e),
					r = 0;
				for (t = 0; t < n; t++)
					for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) i[r] = o[s];
				return i
			},
			dt = function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return n.captureFrameBuffer = t.context.createFramebuffer(), n.workingCanvas = document.createElement("canvas"), n.workingContext2D = n.workingCanvas.getContext("2d"), n.captureCanvas = document.createElement("canvas"), n.captureContext2D = n.captureCanvas.getContext("2d"), n.captureContext2D.imageSmoothingEnabled = !0, n.captureContext2D.mozImageSmoothingEnabled = !0, n.captureContext2D.oImageSmoothingEnabled = !0, n.captureContext2D.webkitImageSmoothingEnabled = !0, n.captureContext2D.msImageSmoothingEnabled = !0, n
				}
				return ut(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getConsumeCommands = function () {
					return ht(["clear", "clearBufferfv", "clearBufferiv", "clearBufferuiv", "clearBufferfi"], d)
				}, t.prototype.readFromContext = function () {
					var e = this.context;
					this.currentState.Attachments = [];
					var t = this.context.getParameter(f.FRAMEBUFFER_BINDING.value);
					if (!t) return this.currentState.FrameBuffer = null, void this.getCapture(e, "Canvas COLOR_ATTACHMENT", 0, 0, e.drawingBufferWidth, e.drawingBufferHeight, 0, 0, f.UNSIGNED_BYTE.value);
					var n = e.getParameter(e.VIEWPORT),
						i = n[0],
						r = n[1],
						o = n[2],
						s = n[3];
					this.currentState.FrameBuffer = this.getSpectorData(t);
					var a = this.context.checkFramebufferStatus(f.FRAMEBUFFER.value);
					if (this.currentState.FrameBufferStatus = v[a].name, a === f.FRAMEBUFFER_COMPLETE.value)
						if (this.extensions[f.MAX_DRAW_BUFFERS_WEBGL.extensionName])
							for (var c = this.context.getParameter(f.MAX_DRAW_BUFFERS_WEBGL.value), l = 0; l < c; l++) this.readFrameBufferAttachmentFromContext(this.context, t, g["COLOR_ATTACHMENT" + l + "_WEBGL"], i, r, o, s);
						else if (this.contextVersion > 1)
						for (c = this.context.getParameter(f.MAX_DRAW_BUFFERS.value), l = 0; l < c; l++) this.readFrameBufferAttachmentFromContext(this.context, t, g["COLOR_ATTACHMENT" + l], i, r, o, s);
					else this.readFrameBufferAttachmentFromContext(this.context, t, g.COLOR_ATTACHMENT0, i, r, o, s)
				}, t.prototype.readFrameBufferAttachmentFromContext = function (e, t, n, i, r, o, s) {
					var a = f.FRAMEBUFFER.value,
						c = this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE.value);
					if (c !== f.NONE.value) {
						var l = this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME.value);
						if (l) {
							var u = this.contextVersion > 1 ? this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE.value) : f.UNSIGNED_BYTE.value;
							c === f.RENDERBUFFER.value ? this.readFrameBufferAttachmentFromRenderBuffer(e, t, n, i, r, o, s, a, u, l) : c === f.TEXTURE.value && this.readFrameBufferAttachmentFromTexture(e, t, n, i, r, o, s, a, u, l)
						}
					}
				}, t.prototype.readFrameBufferAttachmentFromRenderBuffer = function (e, t, n, i, r, o, s, a, c, l) {
					var u = 0,
						h = 0;
					if (l.__SPECTOR_Object_CustomData) {
						var d = l.__SPECTOR_Object_CustomData;
						if (o = d.width, s = d.height, u = d.samples, h = d.internalFormat, !u && !lt.isSupportedCombination(c, f.RGBA.value, h)) return
					} else o += i, s += r;
					if (i = r = 0, u) {
						var p = e,
							m = e.createRenderbuffer(),
							g = e.getParameter(e.RENDERBUFFER_BINDING);
						e.bindRenderbuffer(e.RENDERBUFFER, m), e.renderbufferStorage(e.RENDERBUFFER, h, o, s), e.bindRenderbuffer(e.RENDERBUFFER, g), e.bindFramebuffer(f.FRAMEBUFFER.value, this.captureFrameBuffer), e.framebufferRenderbuffer(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, f.RENDERBUFFER.value, m);
						var v = p.getParameter(p.READ_FRAMEBUFFER_BINDING),
							_ = p.getParameter(p.DRAW_FRAMEBUFFER_BINDING);
						p.bindFramebuffer(p.READ_FRAMEBUFFER, t), p.bindFramebuffer(p.DRAW_FRAMEBUFFER, this.captureFrameBuffer), p.blitFramebuffer(0, 0, o, s, 0, 0, o, s, e.COLOR_BUFFER_BIT, e.NEAREST), p.bindFramebuffer(f.FRAMEBUFFER.value, this.captureFrameBuffer), p.bindFramebuffer(p.READ_FRAMEBUFFER, v), p.bindFramebuffer(p.DRAW_FRAMEBUFFER, _), this.context.checkFramebufferStatus(f.FRAMEBUFFER.value) === f.FRAMEBUFFER_COMPLETE.value && this.getCapture(e, n.name, i, r, o, s, 0, 0, f.UNSIGNED_BYTE.value), e.bindFramebuffer(f.FRAMEBUFFER.value, t), e.deleteRenderbuffer(m)
					} else {
						e.bindFramebuffer(f.FRAMEBUFFER.value, this.captureFrameBuffer), e.framebufferRenderbuffer(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, f.RENDERBUFFER.value, l), this.context.checkFramebufferStatus(f.FRAMEBUFFER.value) === f.FRAMEBUFFER_COMPLETE.value && this.getCapture(e, n.name, i, r, o, s, 0, 0, c), e.bindFramebuffer(f.FRAMEBUFFER.value, t)
					}
				}, t.prototype.readFrameBufferAttachmentFromTexture = function (e, t, n, i, r, o, s, a, c, l) {
					var u = 0;
					this.contextVersion > 1 && (u = this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER.value));
					var h = this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL.value),
						d = this.context.getFramebufferAttachmentParameter(a, n.value, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE.value),
						p = (d > 0 ? v[d].name : f.TEXTURE_2D.name, !1),
						m = c;
					if (l.__SPECTOR_Object_CustomData) {
						var g = l.__SPECTOR_Object_CustomData;
						if (o = g.width, s = g.height, m = g.type, p = g.target === f.TEXTURE_2D_ARRAY.name, !lt.isSupportedCombination(g.type, g.format, g.internalFormat)) return
					} else o += i, s += r;
					i = r = 0, e.bindFramebuffer(f.FRAMEBUFFER.value, this.captureFrameBuffer), u > 0 || p ? e.framebufferTextureLayer(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, l, h, u) : e.framebufferTexture2D(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, d || f.TEXTURE_2D.value, l, h), this.context.checkFramebufferStatus(f.FRAMEBUFFER.value) === f.FRAMEBUFFER_COMPLETE.value && this.getCapture(e, n.name, i, r, o, s, d, u, m), e.bindFramebuffer(f.FRAMEBUFFER.value, t)
				}, t.prototype.getCapture = function (e, n, i, r, s, a, c, l, u) {
					var h = {
						attachmentName: n,
						src: null,
						textureCubeMapFace: c ? v[c].name : null,
						textureLayer: l
					};
					if (!this.quickCapture) try {
						var d = lt.readPixels(e, i, r, s, a, u);
						if (d) {
							this.workingCanvas.width = s, this.workingCanvas.height = a;
							var p = this.workingContext2D.createImageData(Math.ceil(s), Math.ceil(a));
							p.data.set(d), this.workingContext2D.putImageData(p, 0, 0);
							var m = s / a;
							m < 1 ? (this.captureCanvas.width = t.captureBaseSize * m, this.captureCanvas.height = t.captureBaseSize) : m > 1 ? (this.captureCanvas.width = t.captureBaseSize, this.captureCanvas.height = t.captureBaseSize / m) : (this.captureCanvas.width = t.captureBaseSize, this.captureCanvas.height = t.captureBaseSize), this.captureCanvas.width = Math.max(this.captureCanvas.width, 1), this.captureCanvas.height = Math.max(this.captureCanvas.height, 1), this.captureContext2D.globalCompositeOperation = "copy", this.captureContext2D.scale(1, -1), this.captureContext2D.translate(0, -this.captureCanvas.height), this.captureContext2D.drawImage(this.workingCanvas, 0, 0, s, a, 0, 0, this.captureCanvas.width, this.captureCanvas.height), this.captureContext2D.setTransform(1, 0, 0, 1, 0, 0), this.captureContext2D.globalCompositeOperation = "source-over", h.src = this.captureCanvas.toDataURL()
						}
					} catch (e) {
						o.warn("Spector can not capture the visual state: " + e)
					}
					this.currentState.Attachments.push(h)
				}, t.prototype.analyse = function (e) {}, t.stateName = "VisualState", t.captureBaseSize = 256, t
			}(Be),
			pt = function () {
				function e(e) {
					this.context = e.context, this.captureFrameBuffer = e.context.createFramebuffer(), this.workingCanvas = document.createElement("canvas"), this.workingContext2D = this.workingCanvas.getContext("2d"), this.captureCanvas = document.createElement("canvas"), this.captureContext2D = this.captureCanvas.getContext("2d"), this.captureContext2D.imageSmoothingEnabled = !0, this.captureContext2D.mozImageSmoothingEnabled = !0, this.captureContext2D.oImageSmoothingEnabled = !0, this.captureContext2D.webkitImageSmoothingEnabled = !0, this.captureContext2D.msImageSmoothingEnabled = !0
				}
				return e.prototype.appendTextureState = function (e, t, n) {
					if (void 0 === n && (n = null), t) {
						var i = t.__SPECTOR_Object_CustomData;
						i && (i.type && (e.textureType = this.getWebGlConstant(i.type)), i.format && (e.format = this.getWebGlConstant(i.format)), i.internalFormat && (e.internalFormat = this.getWebGlConstant(i.internalFormat)), e.width = i.width, e.height = i.height, i.depth && (e.depth = i.depth), n && (e.visual = this.getTextureVisualState(n, t, i)))
					}
				}, e.prototype.getTextureVisualState = function (t, n, i) {
					try {
						var r = this.context,
							o = {};
						if (!lt.isSupportedCombination(i.type, i.format, i.internalFormat)) return o;
						var s = this.context.getParameter(f.FRAMEBUFFER_BINDING.value);
						r.bindFramebuffer(f.FRAMEBUFFER.value, this.captureFrameBuffer);
						try {
							var a = i.width,
								c = i.height;
							if (t === f.TEXTURE_3D && i.depth)
								for (var l = r, u = 0; u < i.depth; u++) u > 2 && u < i.depth - 3 || (l.framebufferTextureLayer(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, n, 0, u), o["3D Layer " + u] = this.getCapture(r, 0, 0, a, c, i.type));
							else if (t === f.TEXTURE_2D_ARRAY && i.depth)
								for (l = r, u = 0; u < i.depth; u++) u > 2 && u < i.depth - 3 || (l.framebufferTextureLayer(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, n, 0, u), o["Layer " + u] = this.getCapture(r, 0, 0, a, c, i.type));
							else if (t === f.TEXTURE_CUBE_MAP)
								for (var h = 0, d = e.cubeMapFaces; h < d.length; h++) {
									var p = d[h];
									r.framebufferTexture2D(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, p.value, n, 0), o[p.name] = this.getCapture(r, 0, 0, a, c, i.type)
								} else r.framebufferTexture2D(f.FRAMEBUFFER.value, f.COLOR_ATTACHMENT0.value, f.TEXTURE_2D.value, n, 0), o[f.TEXTURE_2D.name] = this.getCapture(r, 0, 0, a, c, i.type)
						} catch (e) {}
						return r.bindFramebuffer(f.FRAMEBUFFER.value, s), o
					} catch (e) {}
				}, e.prototype.getCapture = function (e, t, n, i, r, o) {
					try {
						if (this.context.checkFramebufferStatus(f.FRAMEBUFFER.value) !== f.FRAMEBUFFER_COMPLETE.value) return;
						o = o || f.UNSIGNED_BYTE.value;
						var s = lt.readPixels(e, t, n, i, r, o);
						if (!s) return;
						this.workingCanvas.width = i, this.workingCanvas.height = r;
						var a = this.workingContext2D.createImageData(i, r);
						a.data.set(s), this.workingContext2D.putImageData(a, 0, 0);
						var c = i / r;
						return c < 1 ? (this.captureCanvas.width = dt.captureBaseSize * c, this.captureCanvas.height = dt.captureBaseSize) : c > 1 ? (this.captureCanvas.width = dt.captureBaseSize, this.captureCanvas.height = dt.captureBaseSize / c) : (this.captureCanvas.width = dt.captureBaseSize, this.captureCanvas.height = dt.captureBaseSize), this.captureCanvas.width = Math.max(this.captureCanvas.width, 1), this.captureCanvas.height = Math.max(this.captureCanvas.height, 1), this.captureContext2D.globalCompositeOperation = "copy", this.captureContext2D.scale(1, -1), this.captureContext2D.translate(0, -this.captureCanvas.height), this.captureContext2D.drawImage(this.workingCanvas, 0, 0, i, r, 0, 0, this.captureCanvas.width, this.captureCanvas.height), this.captureContext2D.setTransform(1, 0, 0, 1, 0, 0), this.captureContext2D.globalCompositeOperation = "source-over", this.captureCanvas.toDataURL()
					} catch (e) {}
				}, e.prototype.getWebGlConstant = function (e) {
					var t = v[e];
					return t ? t.name : e + ""
				}, e.captureBaseSize = 64, e.cubeMapFaces = [f.TEXTURE_CUBE_MAP_POSITIVE_X, f.TEXTURE_CUBE_MAP_POSITIVE_Y, f.TEXTURE_CUBE_MAP_POSITIVE_Z, f.TEXTURE_CUBE_MAP_NEGATIVE_X, f.TEXTURE_CUBE_MAP_NEGATIVE_Y, f.TEXTURE_CUBE_MAP_NEGATIVE_Z], e
			}(),
			mt = function () {
				function e(e) {
					this.context = e.context
				}
				return e.prototype.getUboValue = function (t, n, i, r) {
					var o = e.uboTypes[r];
					if (o) {
						var s = new o.arrayBufferView(i * o.lengthMultiplier),
							a = this.context,
							c = a.getIndexedParameter(f.UNIFORM_BUFFER_BINDING.value, t);
						if (c) {
							var l = a.getParameter(f.UNIFORM_BUFFER_BINDING.value);
							try {
								a.bindBuffer(f.UNIFORM_BUFFER.value, c), a.getBufferSubData(f.UNIFORM_BUFFER.value, n, s)
							} catch (e) {
								return
							}
							l && a.bindBuffer(f.UNIFORM_BUFFER.value, l)
						}
						return Array.prototype.slice.call(s)
					}
				}, e.uboTypes = ((_ = {})[f.BOOL.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 1
				}, _[f.BOOL_VEC2.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 2
				}, _[f.BOOL_VEC3.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 3
				}, _[f.BOOL_VEC4.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 4
				}, _[f.INT.value] = {
					arrayBufferView: Int32Array,
					lengthMultiplier: 1
				}, _[f.INT_VEC2.value] = {
					arrayBufferView: Int32Array,
					lengthMultiplier: 2
				}, _[f.INT_VEC3.value] = {
					arrayBufferView: Int32Array,
					lengthMultiplier: 3
				}, _[f.INT_VEC4.value] = {
					arrayBufferView: Int32Array,
					lengthMultiplier: 4
				}, _[f.UNSIGNED_INT.value] = {
					arrayBufferView: Uint32Array,
					lengthMultiplier: 1
				}, _[f.UNSIGNED_INT_VEC2.value] = {
					arrayBufferView: Uint32Array,
					lengthMultiplier: 2
				}, _[f.UNSIGNED_INT_VEC3.value] = {
					arrayBufferView: Uint32Array,
					lengthMultiplier: 3
				}, _[f.UNSIGNED_INT_VEC4.value] = {
					arrayBufferView: Uint32Array,
					lengthMultiplier: 4
				}, _[f.FLOAT.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 1
				}, _[f.FLOAT_VEC2.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 2
				}, _[f.FLOAT_VEC3.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 3
				}, _[f.FLOAT_VEC4.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 4
				}, _[f.FLOAT_MAT2.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 4
				}, _[f.FLOAT_MAT2x3.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 6
				}, _[f.FLOAT_MAT2x4.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 8
				}, _[f.FLOAT_MAT3.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 9
				}, _[f.FLOAT_MAT3x2.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 6
				}, _[f.FLOAT_MAT3x4.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 12
				}, _[f.FLOAT_MAT4.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 16
				}, _[f.FLOAT_MAT4x2.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 8
				}, _[f.FLOAT_MAT4x3.value] = {
					arrayBufferView: Float32Array,
					lengthMultiplier: 12
				}, _[f.SAMPLER_2D.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 1
				}, _[f.SAMPLER_CUBE.value] = {
					arrayBufferView: Uint8Array,
					lengthMultiplier: 1
				}, _), e
			}(),
			ft = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			gt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLBuffer"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			vt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLFramebuffer"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			_t = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLProgram"
					},
					enumerable: !0,
					configurable: !0
				}), t.saveInGlobalStore = function (e) {
					var t = V.getWebGlObjectTag(e);
					t && (this.store[t.id] = e)
				}, t.getFromGlobalStore = function (e) {
					return this.store[e]
				}, t.updateInGlobalStore = function (e, t) {
					if (t) {
						var n = this.getFromGlobalStore(e);
						if (n) {
							var i = V.getWebGlObjectTag(n);
							i && (V.attachWebGlObjectTag(t, i), this.store[i.id] = t)
						}
					}
				}, t.store = {}, t
			}(H),
			Et = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLQuery"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			Ct = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLRenderbuffer"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			At = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLSampler"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			Rt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLShader"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			St = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLSync"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			yt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLTexture"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			Tt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLTransformFeedback"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			bt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLUniformLocation"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			wt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ft(t, e), Object.defineProperty(t.prototype, "typeName", {
					get: function () {
						return "WebGLVertexArrayObject"
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(H),
			xt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Lt = function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return n.drawCallTextureInputState = new pt(t), n.drawCallUboInputState = new mt(t), n
				}
				return xt(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return t.stateName
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "requireStartAndStopStates", {
					get: function () {
						return !1
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getConsumeCommands = function () {
					return d
				}, t.prototype.getChangeCommandsByState = function () {
					return {}
				}, t.prototype.readFromContext = function () {
					var e = this.context.getParameter(f.CURRENT_PROGRAM.value);
					if (e) {
						this.currentState.frameBuffer = this.readFrameBufferFromContext(), this.currentState.programStatus = {
							program: this.getSpectorData(e),
							DELETE_STATUS: this.context.getProgramParameter(e, f.DELETE_STATUS.value),
							LINK_STATUS: this.context.getProgramParameter(e, f.LINK_STATUS.value),
							VALIDATE_STATUS: this.context.getProgramParameter(e, f.VALIDATE_STATUS.value),
							RECOMPILABLE: r.isBuildableProgram(e)
						}, this.currentState.programStatus.RECOMPILABLE && _t.saveInGlobalStore(e);
						var n = this.context.getAttachedShaders(e);
						this.currentState.shaders = [];
						for (var i = 0, o = n; i < o.length; i++) {
							var s = o[i],
								a = this.readShaderFromContext(s);
							this.currentState.shaders.push(a)
						}
						var c = this.context.getProgramParameter(e, f.ACTIVE_ATTRIBUTES.value);
						this.currentState.attributes = [];
						for (var l = 0; l < c; l++) {
							var u = this.readAttributeFromContext(e, l);
							this.currentState.attributes.push(u)
						}
						var h = this.context.getProgramParameter(e, f.ACTIVE_UNIFORMS.value);
						this.currentState.uniforms = [];
						var d = [];
						for (l = 0; l < h; l++) {
							d.push(l);
							var p = this.readUniformFromContext(e, l);
							this.currentState.uniforms.push(p)
						}
						if (this.contextVersion > 1) {
							var m = this.context.getProgramParameter(e, f.ACTIVE_UNIFORM_BLOCKS.value);
							this.currentState.uniformBlocks = [];
							for (l = 0; l < m; l++) {
								var g = this.readUniformBlockFromContext(e, l);
								this.currentState.uniformBlocks.push(g)
							}
							if (this.readUniformsFromContextIntoState(e, d, this.currentState.uniforms, this.currentState.uniformBlocks), this.context.getParameter(f.TRANSFORM_FEEDBACK_ACTIVE.value)) {
								var v = this.context.getProgramParameter(e, f.TRANSFORM_FEEDBACK_BUFFER_MODE.value);
								this.currentState.transformFeedbackMode = this.getWebGlConstant(v), this.currentState.transformFeedbacks = [];
								var _ = this.context.getProgramParameter(e, f.TRANSFORM_FEEDBACK_VARYINGS.value);
								for (l = 0; l < _; l++) {
									var E = this.readTransformFeedbackFromContext(e, l);
									this.currentState.transformFeedbacks.push(E)
								}
							}
						}
						for (l = 0; l < d.length; l++) {
							if (null !== (p = this.currentState.uniforms[l]).value && void 0 !== p.value) {
								var C = t.samplerTypes[p.typeValue];
								if (C)
									if (p.value.length) {
										p.textures = [];
										for (var A = 0; A < p.value.length; A++) p.textures.push(this.readTextureFromContext(p.value[A], C))
									} else p.texture = this.readTextureFromContext(p.value, C)
							}
							delete p.typeValue
						}
					}
				}, t.prototype.readFrameBufferFromContext = function () {
					var e = this.context.getParameter(f.FRAMEBUFFER_BINDING.value);
					if (!e) return null;
					var t = {};
					if (t.frameBuffer = this.getSpectorData(e), this.readFrameBufferAttachmentFromContext(f.DEPTH_ATTACHMENT.value) && (t.depthAttachment = this.readFrameBufferAttachmentFromContext(f.DEPTH_ATTACHMENT.value)), this.readFrameBufferAttachmentFromContext(f.STENCIL_ATTACHMENT.value) && (t.stencilAttachment = this.readFrameBufferAttachmentFromContext(f.STENCIL_ATTACHMENT.value)), this.extensions[f.MAX_DRAW_BUFFERS_WEBGL.extensionName]) {
						t.colorAttachments = [];
						for (var n = this.context.getParameter(f.MAX_DRAW_BUFFERS_WEBGL.value), i = 0; i < n; i++) {
							(o = this.readFrameBufferAttachmentFromContext(g["COLOR_ATTACHMENT" + i + "_WEBGL"].value)) && t.colorAttachments.push(o)
						}
					} else if (this.contextVersion > 1) {
						var r = this.context;
						t.colorAttachments = [];
						for (n = r.getParameter(f.MAX_DRAW_BUFFERS.value), i = 0; i < n; i++) {
							(o = this.readFrameBufferAttachmentFromContext(g["COLOR_ATTACHMENT" + i].value)) && t.colorAttachments.push(o)
						}
					} else {
						var o;
						(o = this.readFrameBufferAttachmentFromContext(g.COLOR_ATTACHMENT0.value)) && (t.colorAttachments = [o])
					}
					return t
				}, t.prototype.readFrameBufferAttachmentFromContext = function (e) {
					var t = f.FRAMEBUFFER.value,
						n = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE.value);
					if (n !== f.NONE.value) {
						var i = {},
							r = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME.value);
						if (n === f.RENDERBUFFER.value) {
							if (i.type = "RENDERBUFFER", i.buffer = this.getSpectorData(r), r) {
								var o = r.__SPECTOR_Object_CustomData;
								o && (o.internalFormat && (i.internalFormat = this.getWebGlConstant(o.internalFormat)), i.width = o.width, i.height = o.height, i.msaaSamples = o.samples)
							}
						} else if (n === f.TEXTURE.value) {
							i.type = "TEXTURE", i.texture = this.getSpectorData(r), i.textureLevel = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL.value);
							var s = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE.value);
							i.textureCubeMapFace = this.getWebGlConstant(s), this.drawCallTextureInputState.appendTextureState(i, r)
						}
						return this.extensions.EXT_sRGB && (i.encoding = this.getWebGlConstant(this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT.value))), this.contextVersion > 1 && (i.alphaSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE.value), i.blueSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE.value), i.encoding = this.getWebGlConstant(this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING.value)), i.componentType = this.getWebGlConstant(this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE.value)), i.depthSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE.value), i.greenSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE.value), i.redSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_RED_SIZE.value), i.stencilSize = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE.value), n === f.TEXTURE.value && (i.textureLayer = this.context.getFramebufferAttachmentParameter(t, e, f.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER.value))), i
					}
				}, t.prototype.readShaderFromContext = function (e) {
					var t = this.context.getShaderSource(e),
						n = this.getSpectorData(e),
						i = e && e.__SPECTOR_Metadata && e.__SPECTOR_Metadata.name ? e.__SPECTOR_Metadata.name : this.readNameFromShaderSource(t);
					return i || (i = this.context.getShaderParameter(e, f.SHADER_TYPE.value) === f.FRAGMENT_SHADER.value ? "Fragment" : "Vertex"), {
						shader: n,
						COMPILE_STATUS: this.context.getShaderParameter(e, f.COMPILE_STATUS.value),
						DELETE_STATUS: this.context.getShaderParameter(e, f.DELETE_STATUS.value),
						SHADER_TYPE: this.getWebGlConstant(this.context.getShaderParameter(e, f.SHADER_TYPE.value)),
						source: t,
						name: i
					}
				}, t.prototype.readAttributeFromContext = function (e, t) {
					var n = this.context.getActiveAttrib(e, t),
						i = this.context.getAttribLocation(e, n.name);
					if (-1 === i) return {
						name: n.name,
						size: n.size,
						type: this.getWebGlConstant(n.type),
						location: -1
					};
					var r = this.context.getVertexAttrib(i, f.CURRENT_VERTEX_ATTRIB.value),
						o = this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING.value),
						s = {
							name: n.name,
							size: n.size,
							type: this.getWebGlConstant(n.type),
							location: i,
							offsetPointer: this.context.getVertexAttribOffset(i, f.VERTEX_ATTRIB_ARRAY_POINTER.value),
							bufferBinding: this.getSpectorData(o),
							enabled: this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_ENABLED.value),
							arraySize: this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_SIZE.value),
							stride: this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_STRIDE.value),
							arrayType: this.getWebGlConstant(this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_TYPE.value)),
							normalized: this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_NORMALIZED.value),
							vertexAttrib: Array.prototype.slice.call(r)
						};
					return this.extensions[f.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE.extensionName] ? s.divisor = this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE.value) : this.contextVersion > 1 && (s.integer = this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_INTEGER.value), s.divisor = this.context.getVertexAttrib(i, f.VERTEX_ATTRIB_ARRAY_DIVISOR.value)), this.appendBufferCustomData(s, o), s
				}, t.prototype.readUniformFromContext = function (e, t) {
					var n = this.context.getActiveUniform(e, t),
						i = this.context.getUniformLocation(e, n.name);
					if (i) {
						if (n.size > 1 && n.name && n.name.indexOf("[0]") === n.name.length - 3) {
							for (var r = [], o = 0; o < n.size; o++) {
								var s = this.context.getUniformLocation(e, n.name.replace("[0]", "[" + o + "]"));
								if (s)(a = this.context.getUniform(e, s)).length && (a = Array.prototype.slice.call(a)), r.push({
									value: a
								})
							}
							return {
								name: n.name.replace("[0]", ""),
								size: n.size,
								type: this.getWebGlConstant(n.type),
								typeValue: n.type,
								location: this.getSpectorData(i),
								values: r
							}
						}
						var a;
						return (a = this.context.getUniform(e, i)).length && (a = Array.prototype.slice.call(a)), {
							name: n.name,
							size: n.size,
							type: this.getWebGlConstant(n.type),
							typeValue: n.type,
							location: this.getSpectorData(i),
							value: a
						}
					}
					return {
						name: n.name,
						size: n.size,
						type: this.getWebGlConstant(n.type),
						typeValue: n.type
					}
				}, t.prototype.readTextureFromContext = function (e, t) {
					var n = this.context.getParameter(f.ACTIVE_TEXTURE.value);
					this.context.activeTexture(f.TEXTURE0.value + e);
					var i = {
						magFilter: this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_MAG_FILTER.value)),
						minFilter: this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_MIN_FILTER.value)),
						wrapS: this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_WRAP_S.value)),
						wrapT: this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_WRAP_T.value))
					};
					if (this.extensions[f.TEXTURE_MAX_ANISOTROPY_EXT.extensionName] && (i.anisotropy = this.context.getTexParameter(t.value, f.TEXTURE_MAX_ANISOTROPY_EXT.value)), this.contextVersion > 1) {
						i.baseLevel = this.context.getTexParameter(t.value, f.TEXTURE_BASE_LEVEL.value), i.immutable = this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_FORMAT.value), i.immutableLevels = this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_LEVELS.value), i.maxLevel = this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_LEVELS.value);
						var r = this.context.getParameter(f.SAMPLER_BINDING.value);
						if (r) {
							i.sampler = this.getSpectorData(r);
							var o = this.context;
							i.samplerMaxLod = o.getSamplerParameter(r, f.TEXTURE_IMMUTABLE_LEVELS.value), i.samplerMinLod = o.getSamplerParameter(r, f.TEXTURE_IMMUTABLE_LEVELS.value), i.samplerCompareFunc = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_COMPARE_FUNC.value)), i.samplerCompareMode = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_COMPARE_MODE.value)), i.samplerWrapS = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_WRAP_S.value)), i.samplerWrapT = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_WRAP_T.value)), i.samplerWrapR = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_IMMUTABLE_LEVELS.value)), i.samplerMagFilter = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_MAG_FILTER.value)), i.samplerMinFilter = this.getWebGlConstant(o.getSamplerParameter(r, f.TEXTURE_MIN_FILTER.value))
						} else i.maxLod = this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_LEVELS.value), i.minLod = this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_LEVELS.value), i.compareFunc = this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_COMPARE_FUNC.value)), i.compareMode = this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_COMPARE_MODE.value)), i.wrapR = this.getWebGlConstant(this.context.getTexParameter(t.value, f.TEXTURE_IMMUTABLE_LEVELS.value))
					}
					var s = this.getTextureStorage(t);
					if (s) {
						var a = this.quickCapture ? null : t;
						this.drawCallTextureInputState.appendTextureState(i, s, a)
					}
					return this.context.activeTexture(n), i
				}, t.prototype.getTextureStorage = function (e) {
					return e === f.TEXTURE_2D ? this.context.getParameter(f.TEXTURE_BINDING_2D.value) : e === f.TEXTURE_CUBE_MAP ? this.context.getParameter(f.TEXTURE_BINDING_CUBE_MAP.value) : e === f.TEXTURE_3D ? this.context.getParameter(f.TEXTURE_BINDING_3D.value) : e === f.TEXTURE_2D_ARRAY ? this.context.getParameter(f.TEXTURE_BINDING_2D_ARRAY.value) : void 0
				}, t.prototype.readUniformsFromContextIntoState = function (e, t, n, i) {
					for (var r = this.context, o = r.getActiveUniforms(e, t, f.UNIFORM_TYPE.value), s = r.getActiveUniforms(e, t, f.UNIFORM_SIZE.value), a = r.getActiveUniforms(e, t, f.UNIFORM_BLOCK_INDEX.value), c = r.getActiveUniforms(e, t, f.UNIFORM_OFFSET.value), l = r.getActiveUniforms(e, t, f.UNIFORM_ARRAY_STRIDE.value), u = r.getActiveUniforms(e, t, f.UNIFORM_MATRIX_STRIDE.value), h = r.getActiveUniforms(e, t, f.UNIFORM_IS_ROW_MAJOR.value), d = 0; d < t.length; d++) {
						var p = n[d];
						if (p.type = this.getWebGlConstant(o[d]), p.size = s[d], p.blockIndice = a[d], p.blockIndice > -1 && (p.blockName = r.getActiveUniformBlockName(e, p.blockIndice)), p.offset = c[d], p.arrayStride = l[d], p.matrixStride = u[d], p.rowMajor = h[d], p.blockIndice > -1) {
							var m = i[a[d]].bindingPoint;
							p.value = this.drawCallUboInputState.getUboValue(m, p.offset, p.size, o[d])
						}
					}
				}, t.prototype.readTransformFeedbackFromContext = function (e, t) {
					var n = this.context,
						i = n.getTransformFeedbackVarying(e, t),
						r = n.getIndexedParameter(f.TRANSFORM_FEEDBACK_BUFFER_BINDING.value, t),
						o = {
							name: i.name,
							size: i.size,
							type: this.getWebGlConstant(i.type),
							buffer: this.getSpectorData(r),
							bufferSize: n.getIndexedParameter(f.TRANSFORM_FEEDBACK_BUFFER_SIZE.value, t),
							bufferStart: n.getIndexedParameter(f.TRANSFORM_FEEDBACK_BUFFER_START.value, t)
						};
					return this.appendBufferCustomData(o, r), o
				}, t.prototype.readUniformBlockFromContext = function (e, t) {
					var n = this.context,
						i = n.getActiveUniformBlockParameter(e, t, f.UNIFORM_BLOCK_BINDING.value),
						r = n.getIndexedParameter(f.UNIFORM_BUFFER_BINDING.value, i),
						o = {
							name: n.getActiveUniformBlockName(e, t),
							bindingPoint: i,
							size: n.getActiveUniformBlockParameter(e, t, f.UNIFORM_BLOCK_DATA_SIZE.value),
							activeUniformCount: n.getActiveUniformBlockParameter(e, t, f.UNIFORM_BLOCK_ACTIVE_UNIFORMS.value),
							vertex: n.getActiveUniformBlockParameter(e, t, f.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER.value),
							fragment: n.getActiveUniformBlockParameter(e, t, f.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER.value),
							buffer: this.getSpectorData(r)
						};
					return this.appendBufferCustomData(o, r), o
				}, t.prototype.appendBufferCustomData = function (e, t) {
					if (t) {
						var n = t.__SPECTOR_Object_CustomData;
						n && (n.usage && (e.bufferUsage = this.getWebGlConstant(n.usage)), e.bufferLength = n.length, n.offset && (e.bufferOffset = n.offset), n.sourceLength && (e.bufferSourceLength = n.sourceLength))
					}
				}, t.prototype.getWebGlConstant = function (e) {
					var t = v[e];
					return t ? t.name : e
				}, t.prototype.readNameFromShaderSource = function (e) {
					try {
						var t = "",
							n = void 0,
							i = /#define[\s]+SHADER_NAME[\s]+([\S]+)(\n|$)/gi;
						if (null !== (n = i.exec(e)) && (n.index === i.lastIndex && i.lastIndex++, t = n[1]), "" === t) {
							var r = /#define[\s]+SHADER_NAME_B64[\s]+([\S]+)(\n|$)/gi;
							null !== (n = r.exec(e)) && (n.index === r.lastIndex && r.lastIndex++, t = n[1]), t && (t = decodeURIComponent(atob(t)))
						}
						return t
					} catch (e) {
						return null
					}
				}, t.stateName = "DrawCall", t.samplerTypes = ((E = {})[f.SAMPLER_2D.value] = f.TEXTURE_2D, E[f.SAMPLER_CUBE.value] = f.TEXTURE_CUBE_MAP, E[f.SAMPLER_3D.value] = f.TEXTURE_3D, E[f.SAMPLER_2D_SHADOW.value] = f.TEXTURE_2D, E[f.SAMPLER_2D_ARRAY.value] = f.TEXTURE_2D_ARRAY, E[f.SAMPLER_2D_ARRAY_SHADOW.value] = f.TEXTURE_2D_ARRAY, E[f.SAMPLER_CUBE_SHADOW.value] = f.TEXTURE_CUBE_MAP, E[f.INT_SAMPLER_2D.value] = f.TEXTURE_2D, E[f.INT_SAMPLER_3D.value] = f.TEXTURE_3D, E[f.INT_SAMPLER_CUBE.value] = f.TEXTURE_CUBE_MAP, E[f.INT_SAMPLER_2D_ARRAY.value] = f.TEXTURE_2D_ARRAY, E[f.UNSIGNED_INT_SAMPLER_2D.value] = f.TEXTURE_2D, E[f.UNSIGNED_INT_SAMPLER_3D.value] = f.TEXTURE_3D, E[f.UNSIGNED_INT_SAMPLER_CUBE.value] = f.TEXTURE_CUBE_MAP, E[f.UNSIGNED_INT_SAMPLER_2D_ARRAY.value] = f.TEXTURE_2D_ARRAY, E), t
			}(Be),
			It = function () {
				function e(e) {
					this.contextInformation = e, this.stateTrackers = [], this.onCommandCapturedCallbacks = {}, this.initStateTrackers()
				}
				return e.prototype.startCapture = function (e, t) {
					for (var n = 0, i = this.stateTrackers; n < i.length; n++) {
						var r = i[n],
							o = r.startCapture(!0, t);
						r.requireStartAndStopStates && (e.initState[r.stateName] = o)
					}
				}, e.prototype.stopCapture = function (e) {
					for (var t = 0, n = this.stateTrackers; t < n.length; t++) {
						var i = n[t],
							r = i.stopCapture();
						i.requireStartAndStopStates && (e.endState[i.stateName] = r)
					}
				}, e.prototype.captureState = function (e) {
					var t = this.onCommandCapturedCallbacks[e.name];
					if (t)
						for (var n = 0, i = t; n < i.length; n++) {
							(0, i[n])(e)
						}
				}, e.prototype.initStateTrackers = function () {
					this.stateTrackers.push(new Ue(this.contextInformation), new We(this.contextInformation), new He(this.contextInformation), new je(this.contextInformation), new ze(this.contextInformation), new qe(this.contextInformation), new Qe(this.contextInformation), new et(this.contextInformation), new nt(this.contextInformation), new rt(this.contextInformation), new st(this.contextInformation), new ct(this.contextInformation), new dt(this.contextInformation), new Lt(this.contextInformation));
					for (var e = 0, t = this.stateTrackers; e < t.length; e++) {
						t[e].registerCallbacks(this.onCommandCapturedCallbacks)
					}
				}, e
			}(),
			Ot = function () {
				function e(t) {
					this.options = t, this.createCommandNames = this.getCreateCommandNames(), this.updateCommandNames = this.getUpdateCommandNames(), this.deleteCommandNames = this.getDeleteCommandNames(), this.startTime = a.now, this.memoryPerSecond = {}, this.totalMemory = 0, this.frameMemory = 0, this.capturing = !1, e.initializeByteSizeFormat()
				}
				return e.initializeByteSizeFormat = function () {
					var e;
					this.byteSizePerInternalFormat || (this.byteSizePerInternalFormat = ((e = {})[f.R8.value] = 1, e[f.R16F.value] = 2, e[f.R32F.value] = 4, e[f.R8UI.value] = 1, e[f.RG8.value] = 2, e[f.RG16F.value] = 4, e[f.RG32F.value] = 8, e[f.ALPHA.value] = 1, e[f.RGB.value] = 3, e[f.RGBA.value] = 4, e[f.LUMINANCE.value] = 1, e[f.LUMINANCE_ALPHA.value] = 2, e[f.DEPTH_COMPONENT.value] = 1, e[f.DEPTH_STENCIL.value] = 2, e[f.SRGB_EXT.value] = 3, e[f.SRGB_ALPHA_EXT.value] = 4, e[f.RGB8.value] = 3, e[f.SRGB8.value] = 3, e[f.RGB565.value] = 2, e[f.R11F_G11F_B10F.value] = 4, e[f.RGB9_E5.value] = 2, e[f.RGB16F.value] = 6, e[f.RGB32F.value] = 12, e[f.RGB8UI.value] = 3, e[f.RGBA8.value] = 4, e[f.RGB5_A1.value] = 2, e[f.RGBA16F.value] = 8, e[f.RGBA32F.value] = 16, e[f.RGBA8UI.value] = 4, e[f.COMPRESSED_R11_EAC.value] = 4, e[f.COMPRESSED_SIGNED_R11_EAC.value] = 4, e[f.COMPRESSED_RG11_EAC.value] = 4, e[f.COMPRESSED_SIGNED_RG11_EAC.value] = 4, e[f.COMPRESSED_RGB8_ETC2.value] = 4, e[f.COMPRESSED_RGBA8_ETC2_EAC.value] = 4, e[f.COMPRESSED_SRGB8_ETC2.value] = 4, e[f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC.value] = 4, e[f.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2.value] = 4, e[f.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2.value] = 4, e[f.COMPRESSED_RGB_S3TC_DXT1_EXT.value] = .5, e[f.COMPRESSED_RGBA_S3TC_DXT3_EXT.value] = 1, e[f.COMPRESSED_RGBA_S3TC_DXT5_EXT.value] = 1, e[f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG.value] = .5, e[f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG.value] = .5, e[f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG.value] = .25, e[f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG.value] = .25, e[f.COMPRESSED_RGB_ETC1_WEBGL.value] = .5, e[f.COMPRESSED_RGB_ATC_WEBGL.value] = .5, e[f.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL.value] = 1, e[f.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL.value] = 1, e))
				}, e.prototype.registerCallbacks = function (e) {
					for (var t = 0, n = this.createCommandNames; t < n.length; t++) {
						e[a = n[t]] = e[a] || [], e[a].push(this.createWithoutSideEffects.bind(this))
					}
					for (var i = 0, r = this.updateCommandNames; i < r.length; i++) {
						e[a = r[i]] = e[a] || [], e[a].push(this.updateWithoutSideEffects.bind(this))
					}
					for (var o = 0, s = this.deleteCommandNames; o < s.length; o++) {
						var a;
						e[a = s[o]] = e[a] || [], e[a].push(this.deleteWithoutSideEffects.bind(this))
					}
				}, e.prototype.startCapture = function () {
					this.frameMemory = 0, this.capturing = !0
				}, e.prototype.stopCapture = function () {
					this.frameMemory = 0, this.capturing = !1
				}, e.prototype.appendRecordedInformation = function (e) {
					e.frameMemory[this.objectName] = this.frameMemory, e.memory[this.objectName] = this.memoryPerSecond
				}, e.prototype.create = function (e) {}, e.prototype.createWithoutSideEffects = function (e) {
					this.options.toggleCapture(!1), this.create(e), this.options.toggleCapture(!0)
				}, e.prototype.updateWithoutSideEffects = function (e) {
					if (e && 0 !== e.arguments.length) {
						this.options.toggleCapture(!1);
						var t = e.arguments[0],
							n = this.getBoundInstance(t);
						if (n)
							if (V.getWebGlObjectTag(n)) {
								var i = this.getWebGlConstant(t),
									r = this.update(e, i, n);
								this.changeMemorySize(r), this.options.toggleCapture(!0)
							} else this.options.toggleCapture(!0);
						else this.options.toggleCapture(!0)
					}
				}, e.prototype.deleteWithoutSideEffects = function (e) {
					if (e && e.arguments && !(e.arguments.length < 1)) {
						var t = e.arguments[0];
						if (t) {
							this.options.toggleCapture(!1);
							var n = this.delete(t);
							this.changeMemorySize(-n), this.options.toggleCapture(!0)
						}
					}
				}, e.prototype.changeMemorySize = function (e) {
					this.totalMemory += e, this.capturing && (this.frameMemory += e);
					var t = a.now - this.startTime,
						n = Math.round(t / 1e3);
					this.memoryPerSecond[n] = this.totalMemory
				}, e.prototype.getWebGlConstant = function (e) {
					var t = v[e];
					return t ? t.name : e + ""
				}, e.prototype.getByteSizeForInternalFormat = function (t) {
					return e.byteSizePerInternalFormat[t] || 4
				}, e
			}(),
			Ft = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Mt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ft(t, e), Object.defineProperty(t.prototype, "objectName", {
					get: function () {
						return "Buffer"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getCreateCommandNames = function () {
					return ["createBuffer"]
				}, t.prototype.getUpdateCommandNames = function () {
					return ["bufferData"]
				}, t.prototype.getDeleteCommandNames = function () {
					return ["deleteBuffer"]
				}, t.prototype.getBoundInstance = function (e) {
					var t = this.options.context;
					return e === f.ARRAY_BUFFER.value ? t.getParameter(f.ARRAY_BUFFER_BINDING.value) : e === f.ELEMENT_ARRAY_BUFFER.value ? t.getParameter(f.ELEMENT_ARRAY_BUFFER_BINDING.value) : e === f.COPY_READ_BUFFER.value ? t.getParameter(f.COPY_READ_BUFFER_BINDING.value) : e === f.COPY_WRITE_BUFFER.value ? t.getParameter(f.COPY_WRITE_BUFFER_BINDING.value) : e === f.TRANSFORM_FEEDBACK_BUFFER.value ? t.getParameter(f.TRANSFORM_FEEDBACK_BUFFER_BINDING.value) : e === f.UNIFORM_BUFFER.value ? t.getParameter(f.UNIFORM_BUFFER_BINDING.value) : e === f.PIXEL_PACK_BUFFER.value ? t.getParameter(f.PIXEL_PACK_BUFFER_BINDING.value) : e === f.PIXEL_UNPACK_BUFFER.value ? t.getParameter(f.PIXEL_UNPACK_BUFFER_BINDING.value) : void 0
				}, t.prototype.delete = function (e) {
					var t = e.__SPECTOR_Object_CustomData;
					return t ? t.length : 0
				}, t.prototype.update = function (e, t, n) {
					var i = this.getCustomData(t, e);
					if (!i) return 0;
					var r = n.__SPECTOR_Object_CustomData ? n.__SPECTOR_Object_CustomData.length : 0;
					return n.__SPECTOR_Object_CustomData = i, i.length - r
				}, t.prototype.getCustomData = function (e, t) {
					var n = this.getLength(t);
					return t.arguments.length >= 4 ? {
						target: e,
						length: n,
						usage: t.arguments[2],
						offset: t.arguments[3],
						sourceLength: t.arguments[1] ? t.arguments[1].length : -1
					} : 3 === t.arguments.length ? {
						target: e,
						length: n,
						usage: t.arguments[2]
					} : void 0
				}, t.prototype.getLength = function (e) {
					var t = -1,
						n = 0;
					return 5 === e.arguments.length && (t = e.arguments[4], n = e.arguments[3]), t <= 0 && (t = "number" == typeof e.arguments[1] ? e.arguments[1] : e.arguments[1] && (e.arguments[1].byteLength || e.arguments[1].length) || 0), t - n
				}, t
			}(Ot),
			Nt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Pt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Nt(t, e), Object.defineProperty(t.prototype, "objectName", {
					get: function () {
						return "Renderbuffer"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getCreateCommandNames = function () {
					return ["createRenderbuffer"]
				}, t.prototype.getUpdateCommandNames = function () {
					return ["renderbufferStorage", "renderbufferStorageMultisample"]
				}, t.prototype.getDeleteCommandNames = function () {
					return ["deleteRenderbuffer"]
				}, t.prototype.getBoundInstance = function (e) {
					var t = this.options.context;
					if (e === f.RENDERBUFFER.value) return t.getParameter(f.RENDERBUFFER_BINDING.value)
				}, t.prototype.delete = function (e) {
					var t = e.__SPECTOR_Object_CustomData;
					return t ? t.length : 0
				}, t.prototype.update = function (e, t, n) {
					var i = this.getCustomData(e, t);
					if (!i) return 0;
					var r = n.__SPECTOR_Object_CustomData ? n.__SPECTOR_Object_CustomData.length : 0;
					return i.length = i.width * i.height * this.getByteSizeForInternalFormat(i.internalFormat), n.__SPECTOR_Object_CustomData = i, i.length - r
				}, t.prototype.getCustomData = function (e, t) {
					return 4 === e.arguments.length ? {
						target: t,
						internalFormat: e.arguments[1],
						width: e.arguments[2],
						height: e.arguments[3],
						length: 0,
						samples: 0
					} : {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						length: 0,
						samples: e.arguments[1]
					}
				}, t
			}(Ot),
			Bt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			$t = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Bt(t, e), Object.defineProperty(t.prototype, "objectName", {
					get: function () {
						return "Texture2d"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getCreateCommandNames = function () {
					return ["createTexture"]
				}, t.prototype.getUpdateCommandNames = function () {
					return ["texImage2D", "compressedTexImage2D", "texStorage2D"]
				}, t.prototype.getDeleteCommandNames = function () {
					return ["deleteTexture"]
				}, t.prototype.getBoundInstance = function (e) {
					var t = this.options.context;
					return e === f.TEXTURE_2D.value ? t.getParameter(f.TEXTURE_BINDING_2D.value) : e === f.TEXTURE_CUBE_MAP_POSITIVE_X.value || e === f.TEXTURE_CUBE_MAP_POSITIVE_Y.value || e === f.TEXTURE_CUBE_MAP_POSITIVE_Z.value || e === f.TEXTURE_CUBE_MAP_NEGATIVE_X.value || e === f.TEXTURE_CUBE_MAP_NEGATIVE_Y.value || e === f.TEXTURE_CUBE_MAP_NEGATIVE_Z.value ? t.getParameter(f.TEXTURE_BINDING_CUBE_MAP.value) : void 0
				}, t.prototype.delete = function (e) {
					var t = e.__SPECTOR_Object_CustomData;
					return t ? t.target === f.TEXTURE_2D_ARRAY.name || t.target === f.TEXTURE_3D.name ? 0 : t.length : 0
				}, t.prototype.update = function (e, t, n) {
					if (e.arguments.length >= 2 && 0 !== e.arguments[1]) return 0;
					var i = this.getCustomData(e, t, n);
					if (!i) return 0;
					var r = n.__SPECTOR_Object_CustomData ? n.__SPECTOR_Object_CustomData.length : 0,
						o = "TEXTURE_2D" === t ? 1 : 6,
						s = i.internalFormat;
					return s === f.RGBA.value && (i.type === f.FLOAT.value && (s = f.RGBA32F.value), i.type === f.HALF_FLOAT_OES.value && (s = f.RGBA16F.value)), i.length = i.width * i.height * o * this.getByteSizeForInternalFormat(s) | 0, n.__SPECTOR_Object_CustomData = i, i.length - r
				}, t.prototype.getCustomData = function (e, t, n) {
					return "texImage2D" === e.name ? this.getTexImage2DCustomData(e, t, n) : "compressedTexImage2D" === e.name ? this.getCompressedTexImage2DCustomData(e, t, n) : "texStorage2D" === e.name ? this.getTexStorage2DCustomData(e, t, n) : void 0
				}, t.prototype.getTexStorage2DCustomData = function (e, t, n) {
					var i;
					return 5 === e.arguments.length && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						length: 0
					}), i
				}, t.prototype.getCompressedTexImage2DCustomData = function (e, t, n) {
					var i;
					if (0 === e.arguments[1]) return e.arguments.length >= 7 && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						length: 0
					}), i
				}, t.prototype.getTexImage2DCustomData = function (e, t, n) {
					var i;
					if (0 === e.arguments[1]) return e.arguments.length >= 8 ? i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						format: e.arguments[6],
						type: e.arguments[7],
						length: 0
					} : 6 === e.arguments.length && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[5].width,
						height: e.arguments[5].height,
						format: e.arguments[3],
						type: e.arguments[4],
						length: 0
					}), i
				}, t
			}(Ot),
			kt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Dt = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return kt(t, e), Object.defineProperty(t.prototype, "objectName", {
					get: function () {
						return "Texture3d"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getCreateCommandNames = function () {
					return ["createTexture"]
				}, t.prototype.getUpdateCommandNames = function () {
					return ["texImage3D", "compressedTexImage3D", "texStorage3D"]
				}, t.prototype.getDeleteCommandNames = function () {
					return ["deleteTexture"]
				}, t.prototype.getBoundInstance = function (e) {
					var t = this.options.context;
					return e === f.TEXTURE_2D_ARRAY.value ? t.getParameter(f.TEXTURE_BINDING_2D_ARRAY.value) : e === f.TEXTURE_3D.value ? t.getParameter(f.TEXTURE_BINDING_3D.value) : void 0
				}, t.prototype.delete = function (e) {
					var t = e.__SPECTOR_Object_CustomData;
					return t ? t.target !== f.TEXTURE_2D_ARRAY.name && t.target !== f.TEXTURE_3D.name ? 0 : t.length : 0
				}, t.prototype.update = function (e, t, n) {
					if (e.arguments.length >= 2 && 0 !== e.arguments[1]) return 0;
					var i = this.getCustomData(e, t, n);
					if (!i) return 0;
					var r = n.__SPECTOR_Object_CustomData ? n.__SPECTOR_Object_CustomData.length : 0;
					return i.length = i.width * i.height * i.depth * this.getByteSizeForInternalFormat(i.internalFormat), i && (n.__SPECTOR_Object_CustomData = i), i.length - r
				}, t.prototype.getCustomData = function (e, t, n) {
					return "texImage3D" === e.name ? this.getTexImage3DCustomData(e, t, n) : "compressedTexImage3D" === e.name ? this.getCompressedTexImage3DCustomData(e, t, n) : "texStorage3D" === e.name ? this.getTexStorage3DCustomData(e, t, n) : void 0
				}, t.prototype.getTexStorage3DCustomData = function (e, t, n) {
					var i;
					return 6 === e.arguments.length && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						depth: e.arguments[5],
						length: 0
					}), i
				}, t.prototype.getCompressedTexImage3DCustomData = function (e, t, n) {
					var i;
					if (0 === e.arguments[1]) return e.arguments.length >= 8 && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						depth: e.arguments[5],
						length: 0
					}), i
				}, t.prototype.getTexImage3DCustomData = function (e, t, n) {
					var i;
					if (0 === e.arguments[1]) return e.arguments.length >= 9 && (i = {
						target: t,
						internalFormat: e.arguments[2],
						width: e.arguments[3],
						height: e.arguments[4],
						depth: e.arguments[5],
						format: e.arguments[7],
						type: e.arguments[8],
						length: 0
					}), i
				}, t
			}(Ot),
			Ut = function () {
				function e(e) {
					this.contextInformation = e, this.onCommandCallbacks = {}, this.recorders = [], this.initRecorders()
				}
				return e.prototype.recordCommand = function (e) {
					var t = this.onCommandCallbacks[e.name];
					if (t)
						for (var n = 0, i = t; n < i.length; n++) {
							(0, i[n])(e)
						}
				}, e.prototype.startCapture = function () {
					for (var e = 0, t = this.recorders; e < t.length; e++) {
						t[e].startCapture()
					}
				}, e.prototype.stopCapture = function () {
					for (var e = 0, t = this.recorders; e < t.length; e++) {
						t[e].stopCapture()
					}
				}, e.prototype.appendRecordedInformation = function (e) {
					for (var t = 0, n = this.recorders; t < n.length; t++) {
						n[t].appendRecordedInformation(e)
					}
				}, e.prototype.initRecorders = function () {
					this.recorders.push(new Mt(this.contextInformation), new Pt(this.contextInformation), new $t(this.contextInformation), new Dt(this.contextInformation));
					for (var e = 0, t = this.recorders; e < t.length; e++) {
						t[e].registerCallbacks(this.onCommandCallbacks)
					}
				}, e
			}(),
			Gt = function () {
				function e(e) {
					this.contextInformation = e, this.webGlObjects = [], this.initWebglObjects()
				}
				return e.prototype.tagWebGlObjects = function (e) {
					for (var t = 0, n = this.webGlObjects; t < n.length; t++) {
						for (var i = n[t], r = 0; r < e.arguments.length; r++) {
							var o = e.arguments[r];
							if (i.tagWebGlObject(o)) break
						}
						if (i.tagWebGlObject(e.result)) break
					}
				}, e.prototype.tagWebGlObject = function (e) {
					for (var t = 0, n = this.webGlObjects; t < n.length; t++) {
						var i = n[t].tagWebGlObject(e);
						if (i) return i
					}
				}, e.prototype.initWebglObjects = function () {
					this.webGlObjects.push(new gt, new vt, new _t, new Et, new Ct, new At, new St, new yt, new Tt, new bt, new wt, new Rt)
				}, e
			}(),
			Wt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Vt = function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return n.extensionDefinition = [
						[{
							name: "ANGLE_instanced_arrays",
							description: ""
						}, {
							name: "EXT_blend_minmax",
							description: ""
						}, {
							name: "EXT_color_buffer_float",
							description: ""
						}, {
							name: "EXT_color_buffer_half_float",
							description: ""
						}, {
							name: "EXT_disjoint_timer_query",
							description: ""
						}, {
							name: "EXT_frag_depth",
							description: ""
						}, {
							name: "EXT_sRGB",
							description: ""
						}, {
							name: "EXT_shader_texture_lod",
							description: ""
						}, {
							name: "EXT_texture_filter_anisotropic",
							description: ""
						}, {
							name: "OES_element_index_uint",
							description: ""
						}, {
							name: "OES_standard_derivatives",
							description: ""
						}, {
							name: "OES_texture_float",
							description: ""
						}, {
							name: "OES_texture_float_linear",
							description: ""
						}, {
							name: "OES_texture_half_float",
							description: ""
						}, {
							name: "OES_texture_half_float_linear",
							description: ""
						}, {
							name: "OES_vertex_array_object",
							description: ""
						}, {
							name: "WEBGL_color_buffer_float",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_astc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_atc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_etc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_etc1",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_pvrtc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_s3tc",
							description: ""
						}, {
							name: "WEBGL_depth_texture",
							description: ""
						}, {
							name: "WEBGL_draw_buffers",
							description: ""
						}],
						[{
							name: "EXT_color_buffer_float",
							description: ""
						}, {
							name: "EXT_disjoint_timer_query",
							description: ""
						}, {
							name: "EXT_disjoint_timer_query_webgl2",
							description: ""
						}, {
							name: "EXT_texture_filter_anisotropic",
							description: ""
						}, {
							name: "OES_texture_float_linear",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_astc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_atc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_etc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_etc1",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_pvrtc",
							description: ""
						}, {
							name: "WEBGL_compressed_texture_s3tc",
							description: ""
						}]
					], n.currentState = n.startCapture(!0, n.quickCapture), n
				}
				return Wt(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return "Extensions"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getExtensions = function () {
					return this.extensions
				}, t.prototype.readFromContext = function () {
					for (var e = 0, t = 1 === this.contextVersion ? this.extensionDefinition[0] : this.extensionDefinition[1]; e < t.length; e++) {
						var n = t[e],
							i = this.context.getExtension(n.name);
						i ? (this.currentState[n.name] = !0, this.extensions[n.name] = i) : this.currentState[n.name] = !1
					}
				}, t
			}(Be),
			Ht = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Xt = function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return n.currentState = n.startCapture(!0, n.quickCapture), n
				}
				return Ht(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return "CompressedTextures"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.COMPRESSED_TEXTURE_FORMATS
					}]
				}, t.prototype.stringifyParameterValue = function (e, t) {
					for (var n = [], i = 0, r = e; i < r.length; i++) {
						var o = r[i];
						n.push(f.stringifyWebGlConstant(o, "getParameter"))
					}
					return n
				}, t
			}(ke),
			jt = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Kt = function (e) {
				function t(t) {
					var n = e.call(this, t) || this;
					return n.currentState = n.startCapture(!0, n.quickCapture), n
				}
				return jt(t, e), Object.defineProperty(t.prototype, "stateName", {
					get: function () {
						return "Capabilities"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getWebgl1Parameters = function () {
					return [{
						constant: f.RENDERER
					}, {
						constant: f.VENDOR
					}, {
						constant: f.VERSION
					}, {
						constant: f.SHADING_LANGUAGE_VERSION
					}, {
						constant: f.SAMPLES
					}, {
						constant: f.SAMPLE_BUFFERS
					}, {
						constant: f.RED_BITS
					}, {
						constant: f.GREEN_BITS
					}, {
						constant: f.BLUE_BITS
					}, {
						constant: f.ALPHA_BITS
					}, {
						constant: f.DEPTH_BITS
					}, {
						constant: f.STENCIL_BITS
					}, {
						constant: f.SUBPIXEL_BITS
					}, {
						constant: f.LINE_WIDTH
					}, {
						constant: f.ALIASED_LINE_WIDTH_RANGE
					}, {
						constant: f.ALIASED_POINT_SIZE_RANGE
					}, {
						constant: f.IMPLEMENTATION_COLOR_READ_FORMAT,
						returnType: 20
					}, {
						constant: f.IMPLEMENTATION_COLOR_READ_TYPE,
						returnType: 20
					}, {
						constant: f.MAX_COMBINED_TEXTURE_IMAGE_UNITS
					}, {
						constant: f.MAX_CUBE_MAP_TEXTURE_SIZE
					}, {
						constant: f.MAX_FRAGMENT_UNIFORM_VECTORS
					}, {
						constant: f.MAX_RENDERBUFFER_SIZE
					}, {
						constant: f.MAX_TEXTURE_IMAGE_UNITS
					}, {
						constant: f.MAX_TEXTURE_SIZE
					}, {
						constant: f.MAX_VARYING_VECTORS
					}, {
						constant: f.MAX_VERTEX_ATTRIBS
					}, {
						constant: f.MAX_VERTEX_TEXTURE_IMAGE_UNITS
					}, {
						constant: f.MAX_VERTEX_UNIFORM_VECTORS
					}, {
						constant: f.MAX_VIEWPORT_DIMS
					}, {
						constant: f.MAX_TEXTURE_MAX_ANISOTROPY_EXT
					}, {
						constant: f.MAX_COLOR_ATTACHMENTS_WEBGL
					}, {
						constant: f.MAX_DRAW_BUFFERS_WEBGL
					}]
				}, t.prototype.getWebgl2Parameters = function () {
					return [{
						constant: f.MAX_3D_TEXTURE_SIZE
					}, {
						constant: f.MAX_ARRAY_TEXTURE_LAYERS
					}, {
						constant: f.MAX_CLIENT_WAIT_TIMEOUT_WEBGL
					}, {
						constant: f.MAX_COLOR_ATTACHMENTS
					}, {
						constant: f.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
					}, {
						constant: f.MAX_COMBINED_UNIFORM_BLOCKS
					}, {
						constant: f.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
					}, {
						constant: f.MAX_DRAW_BUFFERS
					}, {
						constant: f.MAX_ELEMENT_INDEX
					}, {
						constant: f.MAX_ELEMENTS_INDICES
					}, {
						constant: f.MAX_ELEMENTS_VERTICES
					}, {
						constant: f.MAX_FRAGMENT_INPUT_COMPONENTS
					}, {
						constant: f.MAX_FRAGMENT_UNIFORM_BLOCKS
					}, {
						constant: f.MAX_FRAGMENT_UNIFORM_COMPONENTS
					}, {
						constant: f.MAX_PROGRAM_TEXEL_OFFSET
					}, {
						constant: f.MAX_SAMPLES
					}, {
						constant: f.MAX_SERVER_WAIT_TIMEOUT
					}, {
						constant: f.MAX_TEXTURE_LOD_BIAS
					}, {
						constant: f.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
					}, {
						constant: f.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
					}, {
						constant: f.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
					}, {
						constant: f.MAX_UNIFORM_BLOCK_SIZE
					}, {
						constant: f.MAX_UNIFORM_BUFFER_BINDINGS
					}, {
						constant: f.MAX_VARYING_COMPONENTS
					}, {
						constant: f.MAX_VERTEX_OUTPUT_COMPONENTS
					}, {
						constant: f.MAX_VERTEX_UNIFORM_BLOCKS
					}, {
						constant: f.MAX_VERTEX_UNIFORM_COMPONENTS
					}, {
						constant: f.MIN_PROGRAM_TEXEL_OFFSET
					}]
				}, t
			}(ke),
			zt = function () {
				function e(e) {
					this.options = e, this.commandId = 0, this.context = e.context, this.version = e.version, this.onMaxCommand = new s, this.capturing = !1, this.globalCapturing = !0, this.contextInformation = {
						context: this.context,
						contextVersion: this.version,
						toggleCapture: this.toggleGlobalCapturing.bind(this),
						tagWebGlObject: this.tagWebGlObject.bind(this),
						extensions: {}
					}, this.commandSpies = {}, this.stateSpy = new It(this.contextInformation), this.recorderSpy = new Ut(this.contextInformation), this.webGlObjectSpy = new Gt(this.contextInformation), this.analyser = new U(this.contextInformation), this.initStaticCapture(), e.recordAlways && this.spy()
				}
				return e.prototype.spy = function () {
					this.spyContext(this.context);
					var e = this.contextInformation.extensions;
					for (var t in e) e.hasOwnProperty(t) && this.spyContext(e[t])
				}, e.prototype.unSpy = function () {
					for (var e in this.commandSpies) this.commandSpies.hasOwnProperty(e) && this.commandSpies[e].unSpy()
				}, e.prototype.startCapture = function (e, t) {
					void 0 === e && (e = 0), void 0 === t && (t = !1);
					var n = a.now;
					this.maxCommands = e, this.options.recordAlways || this.spy(), this.capturing = !0, this.commandId = 0, this.currentCapture = {
						canvas: this.canvasCapture,
						context: this.contextCapture,
						commands: [],
						initState: {},
						endState: {},
						startTime: n,
						listenCommandsStartTime: 0,
						listenCommandsEndTime: 0,
						endTime: 0,
						analyses: [],
						frameMemory: {},
						memory: {}
					}, this.currentCapture.canvas.width = this.context.canvas.width, this.currentCapture.canvas.height = this.context.canvas.height, this.currentCapture.canvas.clientWidth = this.context.canvas.clientWidth || this.context.canvas.width, this.currentCapture.canvas.clientHeight = this.context.canvas.clientHeight || this.context.canvas.height, this.stateSpy.startCapture(this.currentCapture, t), this.recorderSpy.startCapture(), this.currentCapture.listenCommandsStartTime = a.now
				}, e.prototype.stopCapture = function () {
					var e = a.now;
					return this.options.recordAlways || this.unSpy(), this.capturing = !1, this.stateSpy.stopCapture(this.currentCapture), this.recorderSpy.stopCapture(), this.currentCapture.listenCommandsEndTime = e, this.currentCapture.endTime = a.now, this.recorderSpy.appendRecordedInformation(this.currentCapture), this.analyser.appendAnalyses(this.currentCapture), this.currentCapture
				}, e.prototype.isCapturing = function () {
					return this.globalCapturing && this.capturing
				}, e.prototype.setMarker = function (e) {
					this.marker = e
				}, e.prototype.clearMarker = function () {
					this.marker = null
				}, e.prototype.getNextCommandCaptureId = function () {
					return this.commandId++
				}, e.prototype.onCommand = function (e, t) {
					if (this.globalCapturing && (this.webGlObjectSpy.tagWebGlObjects(t), this.recorderSpy.recordCommand(t), this.isCapturing())) {
						var n = e.createCapture(t, this.getNextCommandCaptureId(), this.marker);
						this.stateSpy.captureState(n), this.currentCapture.commands.push(n), n.endTime = a.now, this.maxCommands > 0 && this.currentCapture.commands.length === this.maxCommands && this.onMaxCommand.trigger(this)
					}
				}, e.prototype.spyContext = function (t) {
					var n = [];
					for (var i in t) i && n.push(i);
					for (var r = 0; r < n.length; r++) {
						i = n[r];
						if (!~e.unSpyableMembers.indexOf(i)) try {
							"number" != typeof t[i] && this.spyFunction(i, t)
						} catch (e) {
							o.error("Cant Spy member: " + i), o.error(e)
						}
					}
				}, e.prototype.initStaticCapture = function () {
					var e = new Vt(this.contextInformation),
						t = e.getExtensions();
					for (var n in t) t.hasOwnProperty(n) && (this.contextInformation.extensions[n] = t[n]);
					var i = new Kt(this.contextInformation),
						r = new Xt(this.contextInformation);
					this.contextCapture = {
						version: this.version,
						contextAttributes: this.context.getContextAttributes(),
						capabilities: i.getStateData(),
						extensions: e.getStateData(),
						compressedTextures: r.getStateData()
					}, this.canvasCapture = {
						width: this.context.canvas.width,
						height: this.context.canvas.height,
						clientWidth: this.context.canvas.clientWidth || this.context.canvas.width,
						clientHeight: this.context.canvas.clientHeight || this.context.canvas.height,
						browserAgent: navigator ? navigator.userAgent : ""
					}
				}, e.prototype.spyFunction = function (e, t) {
					if (0 !== e.indexOf("__SPECTOR_Origin_")) {
						if (!this.commandSpies[e]) {
							var n = function (e, t) {
								var n = {};
								for (var i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
								for (var i in t) n.hasOwnProperty(i) || (n[i] = t[i]);
								return n
							}(this.contextInformation, {
								spiedCommandName: e,
								spiedCommandRunningContext: t,
								callback: this.onCommand.bind(this)
							});
							this.commandSpies[e] = new Pe(n)
						}
						this.commandSpies[e].spy()
					}
				}, e.prototype.toggleGlobalCapturing = function (e) {
					this.globalCapturing = e
				}, e.prototype.tagWebGlObject = function (e) {
					return this.webGlObjectSpy.tagWebGlObject(e)
				}, e.unSpyableMembers = ["canvas", "drawingBufferWidth", "drawingBufferHeight", "glp"], e
			}(),
			Yt = function () {
				function e(t) {
					this.spiedWindow = t || window, this.lastFrame = 0, this.speedRatio = 1, this.willPlayNextFrame = !1, this.onFrameStart = new s, this.onFrameEnd = new s, this.onError = new s, this.lastSixtyFramesDuration = [], this.lastSixtyFramesCurrentIndex = 0, this.lastSixtyFramesPreviousStart = 0;
					for (var n = 0; n < e.fpsWindowSize; n++) this.lastSixtyFramesDuration[n] = 0;
					this.init()
				}
				return e.prototype.playNextFrame = function () {
					this.willPlayNextFrame = !0
				}, e.prototype.changeSpeedRatio = function (e) {
					this.speedRatio = e
				}, e.prototype.getFps = function () {
					for (var t = 0, n = 0; n < e.fpsWindowSize; n++) t += this.lastSixtyFramesDuration[n];
					return 0 === t ? 0 : 6e4 / t
				}, e.prototype.init = function () {
					for (var t = this, n = 0, i = e.requestAnimationFrameFunctions; n < i.length; n++) {
						var r = i[n];
						this.spyRequestAnimationFrame(r, this.spiedWindow)
					}
					for (var o = 0, s = e.setTimerFunctions; o < s.length; o++) {
						r = s[o];
						this.spySetTimer(r)
					}
					this.spiedWindow.VRDisplay && this.spiedWindow.addEventListener("vrdisplaypresentchange", (function (e) {
						t.spyRequestAnimationFrame("requestAnimationFrame", e.display)
					}))
				}, e.prototype.spyRequestAnimationFrame = function (e, t) {
					var n = this;
					G.storeOriginFunction(t, e), t[e] = function () {
						var i = arguments[0],
							r = n.getCallback(n, i, (function () {
								n.spiedWindow[e](i)
							})),
							o = G.executeOriginFunction(t, e, [r]);
						return o
					}
				}, e.prototype.spySetTimer = function (t) {
					var n = this,
						i = this.spiedWindow,
						r = "setTimeout" === t;
					G.storeOriginFunction(i, t), i[t] = function () {
						var o = arguments[0],
							s = arguments[1],
							a = Array.prototype.slice.call(arguments);
						e.setTimerCommonValues.indexOf(s) > -1 && (a[0] = n.getCallback(n, o, r ? function () {
							i[t](o)
						} : null));
						var c = G.executeOriginFunction(i, t, a);
						return c
					}
				}, e.prototype.getCallback = function (t, n, i) {
					return void 0 === i && (i = null),
						function () {
							var r = a.now;
							if (t.lastFrame = ++t.lastFrame % t.speedRatio, t.willPlayNextFrame || t.speedRatio && !t.lastFrame) {
								t.onFrameStart.trigger(t);
								try {
									n.apply(t.spiedWindow, arguments)
								} catch (e) {
									t.onError.trigger(e)
								}
								t.lastSixtyFramesCurrentIndex = (t.lastSixtyFramesCurrentIndex + 1) % e.fpsWindowSize, t.lastSixtyFramesDuration[t.lastSixtyFramesCurrentIndex] = r - t.lastSixtyFramesPreviousStart, t.onFrameEnd.trigger(t), t.willPlayNextFrame = !1
							} else i && i();
							t.lastSixtyFramesPreviousStart = r
						}
				}, e.requestAnimationFrameFunctions = ["requestAnimationFrame", "msRequestAnimationFrame", "webkitRequestAnimationFrame", "mozRequestAnimationFrame", "oRequestAnimationFrame"], e.setTimerFunctions = ["setTimeout", "setInterval"], e.setTimerCommonValues = [0, 15, 16, 33, 32, 40], e.fpsWindowSize = 60, e
			}(),
			qt = function () {
				function e(e) {
					this.canvas = e, this.onContextRequested = new s, this.init()
				}
				return e.prototype.init = function () {
					var e = this,
						t = function () {
							var t = this instanceof HTMLCanvasElement ? HTMLCanvasElement : OffscreenCanvas,
								n = e.canvas ? G.executeOriginFunction(this, "getContext", arguments) : G.executePrototypeOriginFunction(this, t, "getContext", arguments);
							if (arguments.length > 0 && "2d" === arguments[0]) return n;
							if (n) {
								var i = Array.prototype.slice.call(arguments),
									r = "webgl2" === i[0] || "experimental-webgl2" === i[0],
									o = r ? 2 : 1;
								e.onContextRequested.trigger({
									context: n,
									contextVersion: o
								})
							}
							return n
						};
					this.canvas ? (G.storeOriginFunction(this.canvas, "getContext"), this.canvas.getContext = t) : (G.storePrototypeOriginFunction(HTMLCanvasElement, "getContext"), HTMLCanvasElement.prototype.getContext = t, "undefined" != typeof OffscreenCanvas && (G.storePrototypeOriginFunction(OffscreenCanvas, "getContext"), OffscreenCanvas.prototype.getContext = t))
				}, e
			}(),
			Zt = (n(12), function () {
				function e(e, t) {
					this.placeHolder = e, this.stateStore = t
				}
				return e.prototype.compose = function (e) {
					var t = this.stateStore.getStatesToProcess(),
						n = !1;
					for (var i in t)
						if (t.hasOwnProperty(i)) {
							var r = t[i],
								o = this.stateStore.getLastOperation(r),
								s = this.stateStore.getComponentInstance(r),
								a = this.stateStore.getData(r);
							s.render(a, r, o), n = !0
						} if (n) {
						var c = this.stateStore.getLastOperation(e);
						this.composeInContainer(this.placeHolder, Number.MAX_VALUE, e, c)
					}
				}, e.prototype.composeChildren = function (e, t) {
					if (t)
						for (var n = this.stateStore.getChildrenIds(e), i = 0, r = 0; r < n.length; r++) {
							var o = n[r],
								s = this.stateStore.getLastOperation(o);
							this.composeInContainer(t, i, o, s), 50 !== s && i++
						}
				}, e.prototype.composeInContainer = function (e, t, n, i) {
					var r = this.stateStore.getComponentInstance(n).composeInContainer(e, t, i);
					this.composeChildren(n, r)
				}, e
			}()),
			Qt = function () {
				function e() {
					this.store = {}, this.idGenerator = 0, this.pendingOperation = {}
				}
				return e.prototype.getLastOperation = function (e) {
					return this.store[e].lastOperation
				}, e.prototype.getData = function (e) {
					return this.store[e].data
				}, e.prototype.getComponentInstance = function (e) {
					return this.store[e].componentInstance
				}, e.prototype.getParentId = function (e) {
					return this.store[e].parent ? this.store[e].parent.id : -1
				}, e.prototype.getChildrenIds = function (e) {
					for (var t = [], n = 0, i = this.store[e].children; n < i.length; n++) {
						var r = i[n];
						t.push(r.id)
					}
					return t
				}, e.prototype.hasChildren = function (e) {
					return this.store[e].children.length > 0
				}, e.prototype.add = function (e, t) {
					var n = this.getNewId();
					return this.pendingOperation[n] = n, this.store[n] = {
						data: e,
						id: n,
						parent: null,
						children: [],
						componentInstance: t,
						lastOperation: 20
					}, n
				}, e.prototype.update = function (e, t) {
					this.store[e];
					this.pendingOperation[e] = e, this.store[e].data = t, this.store[e].lastOperation = 40
				}, e.prototype.addChild = function (e, t, n) {
					var i = this.store[e],
						r = this.add(t, n);
					this.pendingOperation[r] = r;
					var o = this.store[r];
					return o.parent = i, i.children.push(o), r
				}, e.prototype.insertChildAt = function (e, t, n, i) {
					var r = this.store[e],
						o = this.add(n, i);
					this.pendingOperation[o] = o;
					var s = this.store[o];
					return s.parent = r, t >= r.children.length ? r.children.push(s) : t >= 0 ? r.children.splice(t, 0, s) : r.children.unshift(s), o
				}, e.prototype.removeChildById = function (e, t) {
					for (var n = this.store[e], i = n.children.length - 1; i >= 0; i--) {
						if (n.children[i].id === t) {
							this.removeChildAt(e, i);
							break
						}
					}
				}, e.prototype.removeChildAt = function (e, t) {
					var n, i = this.store[e];
					t > i.children.length - 1 ? (n = i.children[i.children.length - 1], i.children[i.children.length - 1].parent = null, i.children.splice(i.children.length - 1, 1)) : t >= 0 ? (n = i.children[t], i.children[t].parent = null, i.children.splice(t, 1)) : (n = i.children[0], i.children[0].parent = null, i.children.splice(0, 1)), n.parent = null, this.remove(n.id)
				}, e.prototype.remove = function (e) {
					var t = this.store[e];
					if (t.parent) {
						this.store[t.parent.id];
						this.removeChildById(t.parent.id, e)
					} else this.removeChildren(e), this.store[e].lastOperation = 50, this.pendingOperation[e] = e
				}, e.prototype.removeChildren = function (e) {
					for (var t = this.store[e]; t.children.length;) this.remove(t.children[0].id)
				}, e.prototype.getStatesToProcess = function () {
					return this.pendingOperation
				}, e.prototype.flushPendingOperations = function () {
					for (var e in this.pendingOperation) this.pendingOperation[e] && (50 === this.store[e].lastOperation ? delete this.store[e] : this.store[e].lastOperation = 0);
					this.pendingOperation = {}
				}, e.prototype.getNewId = function () {
					return ++this.idGenerator
				}, e
			}(),
			Jt = function () {
				function e(e) {
					this.component = e
				}
				return e.prototype.render = function (e, t, n) {
					0 !== n && (50 !== n ? this.domNode = this.component.render(e, t) : this.removeNode())
				}, e.prototype.composeInContainer = function (e, t, n) {
					if (50 === n) return this.removeNode(), null;
					var i = this.cachedCurrentChildrenContainer;
					if (0 === n) return i;
					var r = this.domNode,
						o = r.getAttribute("childrencontainer") ? r : r.querySelector("[childrenContainer]");
					if (o && i)
						for (var s = i.children; s.length > 0;) o.appendChild(s[0]);
					if (this.cachedCurrentChildrenContainer = o, t >= e.children.length) e.appendChild(r), this.cachedCurrentDomNode && 40 === n && (this.cachedCurrentDomNode.remove ? this.cachedCurrentDomNode.remove() : this.cachedCurrentDomNode.parentNode && this.cachedCurrentDomNode.parentNode.removeChild(this.cachedCurrentDomNode));
					else {
						var a = e.children[t];
						e.insertBefore(r, a), 40 === n && e.removeChild(a)
					}
					return this.cachedCurrentDomNode = this.domNode, o
				}, e.prototype.removeNode = function () {
					this.domNode && this.domNode.parentElement && (this.domNode.remove ? this.domNode.remove() : this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode)), this.cachedCurrentDomNode && this.cachedCurrentDomNode.parentElement && (this.cachedCurrentDomNode.remove ? this.cachedCurrentDomNode.remove() : this.cachedCurrentDomNode.parentNode && this.cachedCurrentDomNode.parentNode.removeChild(this.cachedCurrentDomNode))
				}, e.idGenerator = 0, e
			}(),
			en = function () {
				function e(e) {
					this.stateStore = new Qt, this.compositor = new Zt(e, this.stateStore), this.willRender = !1, this.rootStateId = -1
				}
				return e.prototype.addRootState = function (e, t, n) {
					void 0 === n && (n = !1);
					var i = new Jt(t),
						r = this.stateStore.add(e, i);
					return this.rootStateId = r, this.setForRender(n), r
				}, e.prototype.addChildState = function (e, t, n, i) {
					void 0 === i && (i = !1);
					var r = this.insertChildState(e, t, Number.MAX_VALUE, n);
					return this.setForRender(i), r
				}, e.prototype.insertChildState = function (e, t, n, i, r) {
					void 0 === r && (r = !1);
					var o = new Jt(i),
						s = this.stateStore.insertChildAt(e, n, t, o);
					return this.setForRender(r), s
				}, e.prototype.updateState = function (e, t, n) {
					void 0 === n && (n = !1), this.stateStore.update(e, t), this.setForRender(n)
				}, e.prototype.removeState = function (e, t) {
					void 0 === t && (t = !1), this.stateStore.remove(e), this.setForRender(t)
				}, e.prototype.removeChildrenStates = function (e, t) {
					void 0 === t && (t = !1), this.stateStore.removeChildren(e), this.setForRender(t)
				}, e.prototype.getState = function (e) {
					return this.stateStore.getData(e)
				}, e.prototype.getGenericState = function (e) {
					return this.getState(e)
				}, e.prototype.getChildrenState = function (e) {
					var t = this;
					return this.stateStore.getChildrenIds(e).map((function (n) {
						return t.stateStore.getData(e)
					}))
				}, e.prototype.getChildrenGenericState = function (e) {
					return this.getChildrenState(e)
				}, e.prototype.hasChildren = function (e) {
					return this.stateStore.hasChildren(e)
				}, e.prototype.updateAllChildrenState = function (e, t) {
					for (var n = 0, i = this.stateStore.getChildrenIds(e); n < i.length; n++) {
						var r = i[n],
							o = this.getGenericState(r);
						t(o), this.updateState(r, o)
					}
				}, e.prototype.updateAllChildrenGenericState = function (e, t) {
					this.updateAllChildrenState(e, t)
				}, e.prototype.setForRender = function (t) {
					this.willRender || (this.willRender = !0, t ? this.compose() : setTimeout(this.compose.bind(this), e.REFRESHRATEINMILLISECONDS))
				}, e.prototype.compose = function () {
					this.willRender = !1, this.compositor.compose(this.rootStateId), this.stateStore.flushPendingOperations()
				}, e.REFRESHRATEINMILLISECONDS = 100, e
			}(),
			tn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			nn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.events = {}, t
				}
				return tn(t, e), t.prototype.addEventListener = function (e, t, n) {
					return void 0 === n && (n = null), this.events[e] ? this.events[e].add(t, n) : -1
				}, t.prototype.removeEventListener = function (e, t) {
					this.events[e] && this.events[e].remove(t)
				}, t.prototype.renderElementFromTemplate = function (e, t, n) {
					var i = this.createFromHtml(e);
					return this.bindCommands(i, t, n), i
				}, t.prototype.bindCommands = function (e, t, n) {
					e.getAttribute("commandname") && this.bindCommand(e, t, n);
					for (var i = e.querySelectorAll("[commandName]"), r = 0; r < i.length; r++) {
						var o = i[r];
						this.bindCommand(o, t, n)
					}
				}, t.prototype.bindCommand = function (e, t, n) {
					var i = e.getAttribute("commandname"),
						r = e.getAttribute("commandeventbinding") || "";
					0 === r.length && (r = "click");
					var o = "true" === e.getAttribute("usecapture"),
						s = "true" === e.getAttribute("stoppropagation");
					this.createEvent(i), this.mapEventListener(e, r, i, t, n, o, s)
				}, t.prototype.mapEventListener = function (e, t, n, i, r, o, s) {
					void 0 === o && (o = !1), void 0 === s && (s = !1);
					var a = this;
					s ? e.addEventListener(t, (function (e) {
						return e.stopPropagation(), e.preventDefault(), a.triggerEvent(n, this, i, r), !1
					}), o) : e.addEventListener(t, (function () {
						a.triggerEvent(n, this, i, r)
					}), o)
				}, t.prototype.createEvent = function (e) {
					if (!this.events[e]) {
						var t = new s;
						this.events[e] = t
					}
					return this.events[e]
				}, t.prototype.triggerEvent = function (e, t, n, i) {
					this.events[e].trigger({
						sender: t,
						stateId: i,
						state: n
					})
				}, t
			}(function () {
				function e() {
					this.dummyTextGeneratorElement = document.createElement("div")
				}
				return e.prototype.createFromHtml = function (e) {
					var t = document.createElement("div");
					return t.innerHTML = e, t.firstElementChild
				}, e.prototype.htmlTemplate = function (e) {
					for (var t = this, n = [], i = 1; i < arguments.length; i++) n[i - 1] = arguments[i];
					var r = e.raw,
						o = "";
					return n.forEach((function (e, n) {
						var i = r[n];
						Array.isArray(e) && (e = e.join("")), i && i.length > 0 && "$" === i[i.length - 1] ? i = i.slice(0, -1) : e = t.htmlEscape(e), o += i, o += e
					})), o += r[r.length - 1]
				}, e.prototype.htmlEscape = function (e) {
					return null == e || 0 === e.length ? e : (this.dummyTextGeneratorElement.innerText = e, this.dummyTextGeneratorElement.innerHTML)
				}, e
			}()),
			rn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			on = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			sn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return rn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(C || (C = on(['<div>\n            <div childrenContainer="true" class="captureMenuComponent ', '">\n            </div>\n            <div class="captureMenuLogComponent ', '">\n                <span class="', '">', "<span>\n            </div>\n        </div>"], ['<div>\n            <div childrenContainer="true" class="captureMenuComponent ', '">\n            </div>\n            <div class="captureMenuLogComponent ', '">\n                <span class="', '">', "<span>\n            </div>\n        </div>"])), e ? "active" : "", e.logVisible ? "active" : "", e.logLevel === i.error ? "error" : "", e.logText);
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			an = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			cn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCanvasSelected = t.createEvent("onCanvasSelected"), t
				}
				return an(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("li"),
						i = document.createElement("span");
					return i.innerText = "Id: " + e.id + " - Size: " + e.width + "*" + e.height, n.appendChild(i), this.mapEventListener(n, "click", "onCanvasSelected", e, t), n
				}, t
			}(nn),
			ln = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			un = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			hn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCaptureRequested = t.createEvent("onCaptureRequested"), t.onPlayRequested = t.createEvent("onPlayRequested"), t.onPauseRequested = t.createEvent("onPauseRequested"), t.onPlayNextFrameRequested = t.createEvent("onPlayNextFrameRequested"), t
				}
				return ln(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(A || (A = un(['\n        <div class="captureMenuActionsComponent">\n            <div commandName="onCaptureRequested">\n            </div>\n            $', "\n        </div>"], ['\n        <div class="captureMenuActionsComponent">\n            <div commandName="onCaptureRequested">\n            </div>\n            $', "\n        </div>"])), e ? '<div commandName="onPauseRequested">\n                </div>' : '<div commandName="onPlayRequested">\n                </div>\n                <div commandName="onPlayNextFrameRequested">\n                </div>');
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			dn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			pn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			mn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCanvasSelection = t.createEvent("onCanvasSelection"), t
				}
				return dn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(R || (R = pn(['\n        <div class="canvasListComponent">\n            <span commandName="onCanvasSelection">\n                ', '\n            </span>\n            <ul childrenContainer="true" style="', '"></ul>\n        </div>'], ['\n        <div class="canvasListComponent">\n            <span commandName="onCanvasSelection">\n                ', '\n            </span>\n            <ul childrenContainer="true" style="', '"></ul>\n        </div>'])), e.currentCanvasInformation ? e.currentCanvasInformation.id + " (" + e.currentCanvasInformation.width + "*" + e.currentCanvasInformation.height + ")" : "Choose Canvas...", e.showList ? "display:block;visibility:visible" : "display:none;visibility:hidden");
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			fn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			gn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return fn(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("span");
					return n.className = "fpsCounterComponent", n.innerText = e.toFixed(2) + " Fps", n
				}, t
			}(nn),
			vn = function () {
				function e(t) {
					var n = this;
					void 0 === t && (t = {}), this.options = t, this.rootPlaceHolder = t.rootPlaceHolder || document.body, this.mvx = new en(this.rootPlaceHolder), this.isTrackingCanvas = !1, this.onCanvasSelected = new s, this.onCaptureRequested = new s, this.onPauseRequested = new s, this.onPlayRequested = new s, this.onPlayNextFrameRequested = new s, this.captureMenuComponent = new sn, this.canvasListComponent = new mn, this.canvasListItemComponent = new cn, this.actionsComponent = new hn, this.fpsCounterComponent = new gn, this.rootStateId = this.mvx.addRootState({
						visible: !0,
						logLevel: i.info,
						logText: e.SelectCanvasHelpText,
						logVisible: !this.options.hideLog
					}, this.captureMenuComponent), this.canvasListStateId = this.mvx.addChildState(this.rootStateId, {
						currentCanvasInformation: null,
						showList: !1
					}, this.canvasListComponent), this.actionsStateId = this.mvx.addChildState(this.rootStateId, !0, this.actionsComponent), this.fpsStateId = this.mvx.addChildState(this.rootStateId, 0, this.fpsCounterComponent), this.actionsComponent.onCaptureRequested.add((function () {
						var t = n.getSelectedCanvasInformation();
						t && n.updateMenuStateLog(i.info, e.PleaseWaitHelpText, !0), setTimeout((function () {
							n.onCaptureRequested.trigger(t)
						}), 200)
					})), this.actionsComponent.onPauseRequested.add((function () {
						n.onPauseRequested.trigger(n.getSelectedCanvasInformation()), n.mvx.updateState(n.actionsStateId, !1)
					})), this.actionsComponent.onPlayRequested.add((function () {
						n.onPlayRequested.trigger(n.getSelectedCanvasInformation()), n.mvx.updateState(n.actionsStateId, !0)
					})), this.actionsComponent.onPlayNextFrameRequested.add((function () {
						n.onPlayNextFrameRequested.trigger(n.getSelectedCanvasInformation())
					})), this.canvasListComponent.onCanvasSelection.add((function (t) {
						n.mvx.updateState(n.canvasListStateId, {
							currentCanvasInformation: null,
							showList: !t.state.showList
						}), n.updateMenuStateLog(i.info, e.SelectCanvasHelpText), n.onCanvasSelected.trigger(null), n.isTrackingCanvas && n.trackPageCanvases(), t.state.showList ? n.showMenuStateLog() : n.hideMenuStateLog()
					})), this.canvasListItemComponent.onCanvasSelected.add((function (t) {
						n.mvx.updateState(n.canvasListStateId, {
							currentCanvasInformation: t.state,
							showList: !1
						}), n.onCanvasSelected.trigger(t.state), n.updateMenuStateLog(i.info, e.ActionsHelpText), n.showMenuStateLog()
					}))
				}
				return e.prototype.getSelectedCanvasInformation = function () {
					return this.mvx.getGenericState(this.canvasListStateId).currentCanvasInformation
				}, e.prototype.trackPageCanvases = function () {
					if (this.isTrackingCanvas = !0, document.body) {
						var e = document.body.querySelectorAll("canvas");
						this.updateCanvasesList(e)
					}
				}, e.prototype.updateCanvasesList = function (e) {
					this.updateCanvasesListInformationInternal(e, (function (e) {
						return {
							id: e.id,
							width: e.width,
							height: e.height,
							ref: e
						}
					}))
				}, e.prototype.updateCanvasesListInformation = function (e) {
					this.updateCanvasesListInformationInternal(e, (function (e) {
						return {
							id: e.id,
							width: e.width,
							height: e.height,
							ref: e.ref
						}
					}))
				}, e.prototype.display = function () {
					this.updateMenuStateVisibility(!0)
				}, e.prototype.hide = function () {
					this.updateMenuStateVisibility(!1)
				}, e.prototype.captureComplete = function (t) {
					t ? this.updateMenuStateLog(i.error, t) : this.updateMenuStateLog(i.info, e.ActionsHelpText)
				}, e.prototype.setFPS = function (e) {
					this.mvx.updateState(this.fpsStateId, e)
				}, e.prototype.updateCanvasesListInformationInternal = function (t, n) {
					this.mvx.removeChildrenStates(this.canvasListStateId);
					for (var r = [], o = 0; o < t.length; o++) {
						var s = n(t[o]);
						r.push(s), this.mvx.addChildState(this.canvasListStateId, s, this.canvasListItemComponent)
					}
					var a = r.length,
						c = this.mvx.getGenericState(this.canvasListStateId).showList;
					if (!c)
						if (1 === a) {
							var l = r[0];
							this.mvx.updateState(this.canvasListStateId, {
								currentCanvasInformation: l,
								showList: c
							}), this.updateMenuStateLog(i.info, e.ActionsHelpText), this.onCanvasSelected.trigger(l)
						} else this.updateMenuStateLog(i.info, e.SelectCanvasHelpText), this.onCanvasSelected.trigger(null)
				}, e.prototype.hideMenuStateLog = function () {
					var e = this.mvx.getGenericState(this.rootStateId);
					this.mvx.updateState(this.rootStateId, {
						visible: e.visible,
						logLevel: e.logLevel,
						logText: e.logText,
						logVisible: !1
					})
				}, e.prototype.showMenuStateLog = function () {
					var e = this.mvx.getGenericState(this.rootStateId);
					this.mvx.updateState(this.rootStateId, {
						visible: e.visible,
						logLevel: e.logLevel,
						logText: e.logText,
						logVisible: !this.options.hideLog
					})
				}, e.prototype.updateMenuStateLog = function (e, t, n) {
					void 0 === n && (n = !1);
					var i = this.mvx.getGenericState(this.rootStateId);
					this.mvx.updateState(this.rootStateId, {
						visible: i.visible,
						logLevel: e,
						logText: t,
						logVisible: !this.options.hideLog
					}, n)
				}, e.prototype.updateMenuStateVisibility = function (e) {
					var t = this.mvx.getGenericState(this.rootStateId);
					this.mvx.updateState(this.rootStateId, {
						visible: e,
						logLevel: t.logLevel,
						logText: t.logText,
						logVisible: t.logVisible
					})
				}, e.SelectCanvasHelpText = "Please, select a canvas in the list above.", e.ActionsHelpText = "Record with the red button, you can also pause or continue playing the current scene.", e.PleaseWaitHelpText = "Capturing, be patient (this can take up to 3 minutes)...", e
			}(),
			_n = (n(14), function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}()),
			En = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Cn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCaptureLoaded = new s, t
				}
				return _n(t, e), t.prototype.render = function (e, t) {
					var n = this,
						i = this.htmlTemplate(S || (S = En(['\n        <div class="captureListComponent ', '">\n            <div class="openCaptureFile">\n                <Span>Drag files here to open a previously saved capture.</span>\n            </div>\n            <ul childrenContainer="true"></ul>\n        </div>'], ['\n        <div class="captureListComponent ', '">\n            <div class="openCaptureFile">\n                <Span>Drag files here to open a previously saved capture.</span>\n            </div>\n            <ul childrenContainer="true"></ul>\n        </div>'])), e ? "active" : ""),
						r = this.renderElementFromTemplate(i, e, t),
						o = r.querySelector(".openCaptureFile");
					return o.addEventListener("dragenter", (function (e) {
						return n.drag(e), !1
					}), !1), o.addEventListener("dragover", (function (e) {
						return n.drag(e), !1
					}), !1), o.addEventListener("drop", (function (e) {
						n.drop(e)
					}), !1), r
				}, t.prototype.drag = function (e) {
					e.stopPropagation(), e.preventDefault()
				}, t.prototype.drop = function (e) {
					e.stopPropagation(), e.preventDefault(), this.loadFiles(e)
				}, t.prototype.loadFiles = function (e) {
					var t = this,
						n = null;
					if (e && e.dataTransfer && e.dataTransfer.files && (n = e.dataTransfer.files), e && e.target && e.target.files && (n = e.target.files), n && n.length > 0)
						for (var i = function (e) {
								var i = n[e].name.toLowerCase().split(".").pop();
								n[e].type;
								if ("json" === i) {
									var r = n[e],
										s = new FileReader;
									s.onerror = function (e) {
										o.error("Error while reading file: " + r.name + e)
									}, s.onload = function (e) {
										try {
											var n = JSON.parse(e.target.result);
											t.onCaptureLoaded.trigger(n)
										} catch (e) {
											o.error("Error while reading file: " + r.name + e)
										}
									}, s.readAsText(r)
								}
							}, r = 0; r < n.length; r++) i(r)
				}, t
			}(nn),
			An = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Rn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCaptureSelected = t.createEvent("onCaptureSelected"), t.onSaveRequested = t.createEvent("onSaveRequested"), t
				}
				return An(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("li");
					if (e.active && (n.className = "active"), e.capture.endState.VisualState.Attachments)
						for (var i = 0, r = e.capture.endState.VisualState.Attachments; i < r.length; i++) {
							var o = r[i],
								s = document.createElement("img");
							s.src = encodeURI(o.src), n.appendChild(s)
						} else {
							var a = document.createElement("span");
							a.innerText = e.capture.endState.VisualState.FrameBufferStatus, n.appendChild(a)
						}
					var c = document.createElement("span");
					c.innerText = new Date(e.capture.startTime).toTimeString().split(" ")[0], n.appendChild(c);
					var l = document.createElement("a");
					return l.href = "#", l.className = "captureListItemSave", this.mapEventListener(l, "click", "onSaveRequested", e, t, !1, !0), c.appendChild(l), this.mapEventListener(n, "click", "onCaptureSelected", e, t), n
				}, t
			}(nn),
			Sn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			yn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Tn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Sn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(y || (y = yn(['\n        <div class="visualStateListComponent">\n            <ul childrenContainer="true"></ul>\n        </div>'], ['\n        <div class="visualStateListComponent">\n            <ul childrenContainer="true"></ul>\n        </div>'])));
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			bn = function () {
				function e() {}
				return e.scrollIntoView = function (e) {
					for (var t = e.getBoundingClientRect(), n = e.parentElement; n && n.clientHeight === n.offsetHeight;) n = n.parentElement;
					if (n) {
						var i = n.getBoundingClientRect();
						t.top < i.top ? e.scrollIntoView(!0) : t.bottom > i.bottom && e.scrollIntoView(!1)
					}
				}, e
			}(),
			wn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			xn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onVisualStateSelected = t.createEvent("onVisualStateSelected"), t
				}
				return wn(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("li");
					if (e.active && (n.className = "active", setTimeout((function () {
							bn.scrollIntoView(n)
						}), 1)), e.VisualState.Attachments)
						for (var i = 0, r = e.VisualState.Attachments; i < r.length; i++) {
							var o = r[i];
							if (o.src) {
								var s = document.createElement("img");
								if (s.src = encodeURI(o.src), n.appendChild(s), e.VisualState.Attachments.length > 1) {
									var a = document.createElement("span");
									a.innerText = o.attachmentName, n.appendChild(a)
								}
								if (o.textureLayer) {
									var c = document.createElement("span");
									c.innerText = "Layer: " + o.textureLayer, n.appendChild(c)
								}
								if (o.textureCubeMapFace) {
									var l = document.createElement("span");
									l.innerText = o.textureCubeMapFace, n.appendChild(l)
								}
							}
						} else {
							var u = document.createElement("span");
							u.innerText = e.VisualState.FrameBufferStatus, n.appendChild(u)
						}
					var h = document.createElement("span");
					return h.innerText = e.VisualState.FrameBuffer ? "Frame buffer: " + e.VisualState.FrameBuffer.__SPECTOR_Object_TAG.id : "Canvas frame buffer", n.appendChild(h), this.mapEventListener(n, "click", "onVisualStateSelected", e, t), n
				}, t
			}(nn),
			Ln = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			In = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			On = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Ln(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(T || (T = In(['\n        <div class="commandListComponent">\n            <ul childrenContainer="true"></ul>\n        </div>'], ['\n        <div class="commandListComponent">\n            <ul childrenContainer="true"></ul>\n        </div>'])));
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			Fn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Mn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCommandSelected = t.createEvent("onCommandSelected"), t.onVertexSelected = t.createEvent("onVertexSelected"), t.onFragmentSelected = t.createEvent("onFragmentSelected"), t
				}
				return Fn(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("li"),
						i = "unknown";
					switch (e.capture.status) {
						case 50:
							i = "deprecated";
							break;
						case 10:
							i = "unused";
							break;
						case 20:
							i = "disabled";
							break;
						case 30:
							i = "redundant";
							break;
						case 40:
							i = "valid"
					}
					if (e.capture.VisualState && (n.className = " drawCall"), e.active && (n.className = " active", setTimeout((function () {
							bn.scrollIntoView(n)
						}), 1)), e.capture.marker) {
						var r = document.createElement("span");
						r.className = i + " marker important", r.innerText = e.capture.marker + " ", r.style.fontWeight = "1000", n.appendChild(r)
					}
					var o = document.createElement("span"),
						s = e.capture.text;
					if (s = s.replace(e.capture.name, '<span class=" ' + i + ' important">' + e.capture.name + "</span>"), o.innerHTML = s, n.appendChild(o), e.capture.VisualState && "clear" !== e.capture.name) try {
						var a = e.capture.DrawCall.shaders[0],
							c = e.capture.DrawCall.shaders[1],
							l = document.createElement("a");
						l.innerText = a.name, l.href = "#", n.appendChild(l), this.mapEventListener(l, "click", "onVertexSelected", e, t);
						var u = document.createElement("a");
						u.innerText = c.name, u.href = "#", n.appendChild(u), this.mapEventListener(u, "click", "onFragmentSelected", e, t)
					} catch (e) {}
					return this.mapEventListener(n, "click", "onCommandSelected", e, t), n
				}, t
			}(nn),
			Nn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Pn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Bn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Nn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(b || (b = Pn(['\n        <div class="commandDetailComponent" childrenContainer="true">\n        </div>'], ['\n        <div class="commandDetailComponent" childrenContainer="true">\n        </div>'])));
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			$n = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			kn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Dn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return $n(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(w || (w = kn(['\n        <div class="jsonContentComponent" childrenContainer="true">\n        </div>'], ['\n        <div class="jsonContentComponent" childrenContainer="true">\n        </div>'])));
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			Un = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Gn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Wn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Un(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(x || (x = Gn(['\n        <div class="jsonGroupComponent">\n            <div class="jsonGroupComponentTitle">', '</div>\n            <ul childrenContainer="true"></ul>\n        </div>'], ['\n        <div class="jsonGroupComponent">\n            <div class="jsonGroupComponentTitle">', '</div>\n            <ul childrenContainer="true"></ul>\n        </div>'])), e ? e.replace(/([A-Z])/g, " $1").trim() : "");
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			Vn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Hn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Xn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Vn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(L || (L = Hn(['\n            <li><span class="jsonItemComponentKey">', ': </span><span class="jsonItemComponentValue">', "</span><li>"], ['\n            <li><span class="jsonItemComponentKey">', ': </span><span class="jsonItemComponentValue">', "</span><li>"])), e.key, e.value);
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			jn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Kn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			zn = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return jn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(I || (I = Kn(['\n        <li class="jsonItemImageHolder"><div class="jsonItemImage"><img src="', '"/><span>', "</span></div></li>"], ['\n        <li class="jsonItemImageHolder"><div class="jsonItemImage"><img src="', '"/><span>', "</span></div></li>"])), e.value, e.key);
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			Yn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			qn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			Zn = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onOpenSourceClicked = t.createEvent("onOpenSourceClicked"), t
				}
				return Yn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(O || (O = qn(['\n        <li commandName="onOpenSourceClicked"><span class="jsonItemComponentKey">', ': </span><span class="jsonSourceItemComponentOpen">Click to Open.</span><li>'], ['\n        <li commandName="onOpenSourceClicked"><span class="jsonItemComponentKey">', ': </span><span class="jsonSourceItemComponentOpen">Click to Open.</span><li>'])), e.key);
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			Qn = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			Jn = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			ei = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return Qn(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(F || (F = Jn(['\n            <li><span class="jsonItemComponentKey">', ': </span>\n                <span class="jsonItemComponentValue">', ' (<a href="', '" target="_blank" class="jsonSourceItemComponentOpen">Open help page</a>)\n                </span>\n            <li>'], ['\n            <li><span class="jsonItemComponentKey">', ': </span>\n                <span class="jsonItemComponentValue">', ' (<a href="', '" target="_blank" class="jsonSourceItemComponentOpen">Open help page</a>)\n                </span>\n            <li>'])), e.key, e.value, e.help);
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			ti = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ni = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ti(t, e), t.prototype.render = function (e, t) {
					var n = document.createElement("div");
					if (n.className = "jsonVisualStateItemComponent", e.Attachments)
						for (var i = 0, r = e.Attachments; i < r.length; i++) {
							var o = r[i];
							if (o.src) {
								var s = document.createElement("img");
								if (s.src = encodeURI(o.src), n.appendChild(s), e.Attachments.length > 1) {
									var a = document.createElement("span");
									a.innerText = o.attachmentName, n.appendChild(a)
								}
							}
						} else {
							var c = document.createElement("span");
							c.innerText = e.FrameBufferStatus, n.appendChild(c)
						}
					var l = document.createElement("span");
					return l.innerText = e.FrameBuffer ? e.FrameBuffer.__SPECTOR_Object_TAG.displayText : "Canvas frame buffer", n.appendChild(l), n
				}, t
			}(nn),
			ii = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ri = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			oi = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onCapturesClicked = t.createEvent("onCapturesClicked"), t.onCommandsClicked = t.createEvent("onCommandsClicked"), t.onInformationClicked = t.createEvent("onInformationClicked"), t.onInitStateClicked = t.createEvent("onInitStateClicked"), t.onEndStateClicked = t.createEvent("onEndStateClicked"), t.onCloseClicked = t.createEvent("onCloseClicked"), t.onSearchTextChanged = t.createEvent("onSearchTextChanged"), t.onSearchTextCleared = t.createEvent("onSearchTextCleared"), t
				}
				return ii(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(M || (M = ri(['<ul class="resultViewMenuComponent">\n                <li class="resultViewMenuOpen resultViewMenuSmall"><a href="#" role="button">Menu</a></li>\n\n                <li class="searchContainer">\n                    <input type="text" placeHolder="Search..." value="', '" commandName="onSearchTextChanged" commandEventBinding="change">\n                    <a class="clearSearch" stoppropagation="true" CommandName="onSearchTextCleared">X</a>\n                </li>\n                <li><a class="', ' href="#" role="button" commandName="onCapturesClicked">Captures</a></li>\n                <li><a class="', ' href="#" role="button" commandName="onInformationClicked">Information</a></li>\n                <li><a class="', ' href="#" role="button" commandName="onInitStateClicked">Init State</a></li>\n                <li>\n                    <a class="', ' href="#" role="button" commandName="onCommandsClicked">\n                        Commands', '\n                    </a>\n                </li>\n                <li><a class="', ' href="#" role="button" commandName="onEndStateClicked">End State</a></li>\n                <li><a role="button" commandName="onCloseClicked" stoppropagation="true">Close</a></li>\n            </ul>'], ['<ul class="resultViewMenuComponent">\n                <li class="resultViewMenuOpen resultViewMenuSmall"><a href="#" role="button">Menu</a></li>\n\n                <li class="searchContainer">\n                    <input type="text" placeHolder="Search..." value="', '" commandName="onSearchTextChanged" commandEventBinding="change">\n                    <a class="clearSearch" stoppropagation="true" CommandName="onSearchTextCleared">X</a>\n                </li>\n                <li><a class="', ' href="#" role="button" commandName="onCapturesClicked">Captures</a></li>\n                <li><a class="', ' href="#" role="button" commandName="onInformationClicked">Information</a></li>\n                <li><a class="', ' href="#" role="button" commandName="onInitStateClicked">Init State</a></li>\n                <li>\n                    <a class="', ' href="#" role="button" commandName="onCommandsClicked">\n                        Commands', '\n                    </a>\n                </li>\n                <li><a class="', ' href="#" role="button" commandName="onEndStateClicked">End State</a></li>\n                <li><a role="button" commandName="onCloseClicked" stoppropagation="true">Close</a></li>\n            </ul>'])), e.searchText, 0 === e.status ? "active" : "", 10 === e.status ? "active" : "", 20 === e.status ? "active" : "", 40 === e.status ? "active" : "", e.commandCount > 0 ? " (" + e.commandCount + ")" : "", 30 === e.status ? "active" : ""),
						i = this.renderElementFromTemplate(n, e, t),
						r = i.querySelector(".resultViewMenuOpen"),
						o = i.querySelectorAll("li:not(.resultViewMenuSmall)");
					return r.addEventListener("click", (function (e) {
						if ("true" === r.getAttribute("open")) {
							r.setAttribute("open", "false");
							for (var t = 0; t < o.length; t++) o[t].style.display = "none", o[t].style.visibility = "hidden"
						} else {
							r.setAttribute("open", "true");
							for (t = 0; t < o.length; t++) o[t].style.display = "block", o[t].style.visibility = "visible"
						}
					})), i
				}, t
			}(nn),
			si = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			ai = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return si(t, e), t.prototype.render = function (e, t) {
					return this.renderElementFromTemplate('<div childrenContainer="true" class="resultViewContentComponent"></div>', e, t)
				}, t
			}(nn),
			ci = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			li = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			ui = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ci(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate(N || (N = li(['\n            <div childrenContainer="true" class="resultViewComponent ', '">\n            </div>'], ['\n            <div childrenContainer="true" class="resultViewComponent ', '">\n            </div>'])), e ? "active" : "");
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			hi = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			di = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			pi = function (e) {
				function t() {
					var t = e.call(this) || this;
					return t.onVertexSourceClicked = t.createEvent("onVertexSourceClicked"), t.onFragmentSourceClicked = t.createEvent("onFragmentSourceClicked"), t.onSourceCodeCloseClicked = t.createEvent("onSourceCodeCloseClicked"), t.onSourceCodeChanged = t.createEvent("onSourceCodeChanged"), t
				}
				return hi(t, e), t.prototype.showError = function (e) {
					if (this.editor) {
						var t = [];
						if (e = e || "")
							for (var n = /^.*ERROR:\W([0-9]+):([0-9]+):(.*)$/gm, i = n.exec(e); null != i;) t.push({
								row: +i[2] - 1,
								column: i[1],
								text: i[3] || "Error",
								type: "error"
							}), i = n.exec(e);
						this.editor.getSession().setAnnotations(t)
					}
				}, t.prototype.render = function (e, t) {
					var n = this,
						i = e.fragment ? e.sourceFragment : e.sourceVertex,
						r = i ? this._indentIfdef(this._beautify(i)) : "",
						o = this.htmlTemplate(B || (B = di(['\n        <div class="sourceCodeComponentContainer">\n            <div class="sourceCodeMenuComponentContainer">\n                <ul class="sourceCodeMenuComponent">\n                    <li><a class="', '" href="#" role="button" commandName="onVertexSourceClicked">Vertex</a></li>\n                    <li><a class="', '" href="#" role="button" commandName="onFragmentSourceClicked">Fragment</a></li>\n                    <li><a href="#" role="button" commandName="onSourceCodeCloseClicked">Close</a></li>\n                </ul>\n            </div>\n            $', "\n        </div>"], ['\n        <div class="sourceCodeComponentContainer">\n            <div class="sourceCodeMenuComponentContainer">\n                <ul class="sourceCodeMenuComponent">\n                    <li><a class="', '" href="#" role="button" commandName="onVertexSourceClicked">Vertex</a></li>\n                    <li><a class="', '" href="#" role="button" commandName="onFragmentSourceClicked">Fragment</a></li>\n                    <li><a href="#" role="button" commandName="onSourceCodeCloseClicked">Close</a></li>\n                </ul>\n            </div>\n            $', "\n        </div>"])), e.fragment ? "" : "active", e.fragment ? "active" : "", this.htmlTemplate(P || (P = di(['<div class="sourceCodeComponent">', "</div>"], ['<div class="sourceCodeComponent">', "</div>"])), r)),
						s = this.renderElementFromTemplate(o.replace(/<br>/g, "\n"), e, t);
					this.editor = ace.edit(s.querySelector(".sourceCodeComponent")), this.editor.setTheme("ace/theme/monokai"), this.editor.getSession().setMode("ace/mode/glsl"), this.editor.setShowPrintMargin(!1);
					var a = -1;
					return this.editor.setReadOnly(!e.editable), this.editor.getSession().on("change", (function (i) {
						-1 !== a && clearTimeout(a), a = setTimeout((function () {
							n._triggerCompilation(n.editor, e, s, t)
						}), 1500)
					})), s
				}, t.prototype._triggerCompilation = function (e, t, n, i) {
					t.fragment ? t.sourceFragment = e.getValue() : t.sourceVertex = e.getValue(), this.triggerEvent("onSourceCodeChanged", n, t, i)
				}, t.prototype._beautify = function (e, n) {
					void 0 === n && (n = 0), e = e.trim(), e = this._adaptComments(e);
					for (var i, r = this._getBracket(e), o = r.firstIteration, s = r.lastIteration, a = "", c = 0; c < n; c++) a += "    ";
					if (-1 === o) i = e = (e = (e = (e = (e = (e = (e = (e = a + e).replace(/;(?![^\(]*\))\s*(\/\/.*)?/g, (function (e) {
						return e.trim() + "\n"
					}))).replace(/\s*([*+-/=><\s]*=)\s*/g, (function (e) {
						return " " + e.trim() + " "
					}))).replace(/\s*(,)\s*/g, (function (e) {
						return e.trim() + " "
					}))).replace(/\n[ \t]+/g, "\n")).replace(/\n/g, "\n" + a)).replace(/\s+$/g, "")).replace(/\n+$/g, "");
					else {
						var l = e.substr(0, o),
							u = e.substr(s + 1, e.length),
							h = e.substr(o + 1, s - o - 1).trim(),
							d = this._beautify(h, n + 1);
						i = (i = (i = this._beautify(l, n) + " {\n" + d + "\n" + a + "}\n" + this._beautify(u, n)).replace(/\s*\n+\s*;/g, ";")).replace(/#endif[\t \f\v]*{/g, "\n {")
					}
					return i = (i = (i = i.replace(t.semicolonReplacementKeyRegex, ";")).replace(t.openCurlyReplacementKeyRegex, "{")).replace(t.closeCurlyReplacementKeyRegex, "}")
				}, t.prototype._adaptComments = function (e) {
					for (var n = !1, i = !1, r = 0; r < e.length; r++) {
						var o = e[r];
						"/" === o ? "*" === e[r - 1] ? i = !1 : "*" === e[r + 1] ? n || (i = !0, r++) : "/" === e[r + 1] && (i || (n = !0, r++)) : "\n" === o ? n = !1 : ";" === o ? (n || i) && (e = e.substr(0, r) + t.semicolonReplacementKey + e.substr(r + 1)) : "{" === o ? (n || i) && (e = e.substr(0, r) + t.openCurlyReplacementKey + e.substr(r + 1)) : "}" === o && (n || i) && (e = e.substr(0, r) + t.closeCurlyReplacementKey + e.substr(r + 1))
					}
					return e
				}, t.prototype._getBracket = function (e, t) {
					void 0 === t && (t = -1);
					for (var n = e.indexOf("{", t), i = 1, r = n, o = 0, s = 0, a = e.substr(n + 1).split(""); s < a.length; s++) {
						var c = a[s];
						if (r++, "{" === c && i++, "}" === c && i--, 0 === i) {
							o = r;
							break
						}
					}
					return n > -1 && 0 === o ? this._getBracket(e, n + 1) : {
						firstIteration: n,
						lastIteration: o
					}
				}, t.prototype._indentIfdef = function (e) {
					for (var t = 0, n = e.split("\n"), i = 0; i < n.length; i++) {
						var r = n[i]; - 1 !== r.indexOf("#endif") && t--, -1 !== r.indexOf("#else") && t--;
						for (var o = "", s = 0; s < t; s++) o += "    ";
						n[i] = o + r, -1 === r.indexOf("#if") && -1 === r.indexOf("#else") || t++
					}
					return n.join("\n")
				}, t.semicolonReplacementKey = "[[[semicolonReplacementKey]]]", t.semicolonReplacementKeyRegex = new RegExp("\\[\\[\\[semicolonReplacementKey\\]\\]\\]", "g"), t.openCurlyReplacementKey = "[[[openCurlyReplacementKey]]]", t.openCurlyReplacementKeyRegex = new RegExp("\\[\\[\\[openCurlyReplacementKey\\]\\]\\]", "g"), t.closeCurlyReplacementKey = "[[[closeCurlyReplacementKey]]]", t.closeCurlyReplacementKeyRegex = new RegExp("\\[\\[\\[closeCurlyReplacementKey\\]\\]\\]", "g"), t
			}(nn),
			mi = function () {
				var e = function (t, n) {
					return (e = Object.setPrototypeOf || {
							__proto__: []
						}
						instanceof Array && function (e, t) {
							e.__proto__ = t
						} || function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(t, n)
				};
				return function (t, n) {
					function i() {
						this.constructor = t
					}
					e(t, n), t.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype, new i)
				}
			}(),
			fi = function (e, t) {
				return Object.defineProperty ? Object.defineProperty(e, "raw", {
					value: t
				}) : e.raw = t, e
			},
			gi = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return mi(t, e), t.prototype.render = function (e, t) {
					var n = this.htmlTemplate($ || ($ = fi(['\n                <div childrenContainer="true" class="', '"></div>'], ['\n                <div childrenContainer="true" class="', '"></div>'])), e ? "informationColumnLeftComponent" : "informationColumnRightComponent");
					return this.renderElementFromTemplate(n, e, t)
				}, t
			}(nn),
			vi = function () {
				function e() {}
				return e.getMDNLink = function (t) {
					var n = e.WebGL2Functions[t];
					if (n) return e.WebGL2RootUrl + n;
					var i = e.WebGLFunctions[t];
					return i ? e.WebGLRootUrl + i : e.WebGLRootUrl + t
				}, e.WebGL2RootUrl = "https://developer.mozilla.org/en-US/docs/Web/API/WebGL2RenderingContext/", e.WebGLRootUrl = "https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/", e.WebGL2Functions = {
					beginQuery: "beginQuery",
					beginTransformFeedback: "beginTransformFeedback",
					bindBufferBase: "bindBufferBase",
					bindBufferRange: "bindBufferRange",
					bindSampler: "bindSampler",
					bindTransformFeedback: "bindTransformFeedback",
					bindVertexArray: "bindVertexArray",
					blitFramebuffer: "blitFramebuffer",
					clearBufferfv: "clearBuffer",
					clearBufferiv: "clearBuffer",
					clearBufferuiv: "clearBuffer",
					clearBufferfi: "clearBuffer",
					clientWaitSync: "clientWaitSync",
					compressedTexImage3D: "compressedTexImage3D",
					compressedTexSubImage3D: "compressedTexSubImage3D",
					copyBufferSubData: "copyBufferSubData",
					copyTexSubImage3D: "copyTexSubImage3D",
					createQuery: "createQuery",
					createSampler: "createSampler",
					createTransformFeedback: "createTransformFeedback",
					createVertexArray: "createVertexArray",
					deleteQuery: "deleteQuery",
					deleteSampler: "deleteSampler",
					deleteSync: "deleteSync",
					deleteTransformFeedback: "deleteTransformFeedback",
					deleteVertexArray: "deleteVertexArray",
					drawArraysInstanced: "drawArraysInstanced",
					drawBuffers: "drawBuffers",
					drawElementsInstanced: "drawElementsInstanced",
					drawRangeElements: "drawRangeElements",
					endQuery: "endQuery",
					endTransformFeedback: "endTransformFeedback",
					fenceSync: "fenceSync",
					framebufferTextureLayer: "framebufferTextureLayer",
					getActiveUniformBlockName: "getActiveUniformBlockName",
					getActiveUniformBlockParameter: "getActiveUniformBlockParameter",
					getActiveUniforms: "getActiveUniforms",
					getBufferSubData: "getBufferSubData",
					getFragDataLocation: "getFragDataLocation",
					getIndexedParameter: "getIndexedParameter",
					getInternalformatParameter: "getInternalformatParameter",
					getQuery: "getQuery",
					getQueryParameter: "getQueryParameter",
					getSamplerParameter: "getSamplerParameter",
					getSyncParameter: "getSyncParameter",
					getTransformFeedbackVarying: "getTransformFeedbackVarying",
					getUniformBlockIndex: "getUniformBlockIndex",
					getUniformIndices: "getUniformIndices",
					invalidateFramebuffer: "invalidateFramebuffer",
					invalidateSubFramebuffer: "invalidateSubFramebuffer",
					isQuery: "isQuery",
					isSampler: "isSampler",
					isSync: "isSync",
					isTransformFeedback: "isTransformFeedback",
					isVertexArray: "isVertexArray",
					pauseTransformFeedback: "pauseTransformFeedback",
					readBuffer: "readBuffer",
					renderbufferStorageMultisample: "renderbufferStorageMultisample",
					resumeTransformFeedback: "resumeTransformFeedback",
					samplerParameteri: "samplerParameter",
					samplerParameterf: "samplerParameter",
					texImage3D: "texImage3D",
					texStorage2D: "texStorage2D",
					texStorage3D: "texStorage3D",
					texSubImage3D: "texSubImage3D",
					transformFeedbackVaryings: "transformFeedbackVaryings",
					uniform1ui: "uniform",
					uniform2ui: "uniform",
					uniform3ui: "uniform",
					uniform4ui: "uniform",
					uniform1fv: "uniform",
					uniform2fv: "uniform",
					uniform3fv: "uniform",
					uniform4fv: "uniform",
					uniform1iv: "uniform",
					uniform2iv: "uniform",
					uniform3iv: "uniform",
					uniform4iv: "uniform",
					uniform1uiv: "uniform",
					uniform2uiv: "uniform",
					uniform3uiv: "uniform",
					uniform4uiv: "uniform",
					uniformBlockBinding: "uniformBlockBinding",
					uniformMatrix2fv: "uniformMatrix",
					uniformMatrix3x2fv: "uniformMatrix",
					uniformMatrix4x2fv: "uniformMatrix",
					uniformMatrix2x3fv: "uniformMatrix",
					uniformMatrix3fv: "uniformMatrix",
					uniformMatrix4x3fv: "uniformMatrix",
					uniformMatrix2x4fv: "uniformMatrix",
					uniformMatrix3x4fv: "uniformMatrix",
					uniformMatrix4fv: "uniformMatrix",
					vertexAttribDivisor: "vertexAttribDivisor",
					vertexAttribI4i: "vertexAttribI",
					vertexAttribI4ui: "vertexAttribI",
					vertexAttribI4iv: "vertexAttribI",
					vertexAttribI4uiv: "vertexAttribI",
					vertexAttribIPointer: "vertexAttribIPointer",
					waitSync: "waitSync"
				}, e.WebGLFunctions = {
					uniform1f: "uniform",
					uniform1fv: "uniform",
					uniform1i: "uniform",
					uniform1iv: "uniform",
					uniform2f: "uniform",
					uniform2fv: "uniform",
					uniform2i: "uniform",
					uniform2iv: "uniform",
					uniform3f: "uniform",
					uniform3i: "uniform",
					uniform3iv: "uniform",
					uniform4f: "uniform",
					uniform4fv: "uniform",
					uniform4i: "uniform",
					uniform4iv: "uniform",
					uniformMatrix2fv: "uniformMatrix",
					uniformMatrix3fv: "uniformMatrix",
					uniformMatrix4fv: "uniformMatrix",
					vertexAttrib1f: "vertexAttrib",
					vertexAttrib2f: "vertexAttrib",
					vertexAttrib3f: "vertexAttrib",
					vertexAttrib4f: "vertexAttrib",
					vertexAttrib1fv: "vertexAttrib",
					vertexAttrib2fv: "vertexAttrib",
					vertexAttrib3fv: "vertexAttrib",
					vertexAttrib4fv: "vertexAttrib"
				}, e
			}(),
			_i = function () {
				function e(e) {
					var t = this;
					void 0 === e && (e = null), this.rootPlaceHolder = e, this.onSourceCodeChanged = new s, this.rootPlaceHolder = this.rootPlaceHolder || document.body, this.mvx = new en(this.rootPlaceHolder), this.searchText = "", this.currentCommandId = -1, this.visible = !1, this.commandCount = 0, this.commandListStateId = -1, this.commandDetailStateId = -1, this.currentCaptureStateId = -1, this.currentCommandStateId = -1, this.currentVisualStateId = -1, this.visualStateListStateId = -1, this.initVisualStateId = -1, this.sourceCodeComponentStateId = -1, this.captureListComponent = new Cn, this.captureListItemComponent = new Rn, this.visualStateListComponent = new Tn, this.visualStateListItemComponent = new xn, this.commandListComponent = new On, this.commandListItemComponent = new Mn, this.commandDetailComponent = new Bn, this.jsonContentComponent = new Dn, this.jsonGroupComponent = new Wn, this.jsonItemComponent = new Xn, this.jsonImageItemComponent = new zn, this.jsonSourceItemComponent = new Zn, this.jsonHelpItemComponent = new ei, this.jsonVisualStateItemComponent = new ni, this.resultViewMenuComponent = new oi, this.resultViewContentComponent = new ai, this.resultViewComponent = new ui, this.sourceCodeComponent = new pi, this.informationColumnComponent = new gi, this.rootStateId = this.mvx.addRootState(null, this.resultViewComponent), this.menuStateId = this.mvx.addChildState(this.rootStateId, null, this.resultViewMenuComponent), this.contentStateId = this.mvx.addChildState(this.rootStateId, null, this.resultViewContentComponent), this.captureListStateId = this.mvx.addChildState(this.rootStateId, !1, this.captureListComponent), this.initKeyboardEvents(), this.initMenuComponent(), this.captureListComponent.onCaptureLoaded.add((function (e) {
						t.addCapture(e)
					})), this.captureListItemComponent.onCaptureSelected.add((function (e) {
						t.selectCapture(e.stateId)
					})), this.captureListItemComponent.onSaveRequested.add((function (e) {
						t.saveCapture(e.state.capture)
					})), this.visualStateListItemComponent.onVisualStateSelected.add((function (e) {
						t.selectVisualState(e.stateId)
					})), this.commandListItemComponent.onCommandSelected.add((function (e) {
						t.selectCommand(e.stateId)
					})), this.commandListItemComponent.onVertexSelected.add((function (e) {
						t.selectCommand(e.stateId), t.openShader(!1)
					})), this.commandListItemComponent.onFragmentSelected.add((function (e) {
						t.selectCommand(e.stateId), t.openShader(!0)
					})), this.sourceCodeComponent.onSourceCodeCloseClicked.add((function () {
						t.displayCurrentCapture()
					})), this.sourceCodeComponent.onVertexSourceClicked.add((function (e) {
						var n = t.mvx.getGenericState(t.sourceCodeComponentStateId);
						n.fragment = !1, t.mvx.updateState(t.sourceCodeComponentStateId, n)
					})), this.sourceCodeComponent.onFragmentSourceClicked.add((function (e) {
						var n = t.mvx.getGenericState(t.sourceCodeComponentStateId);
						n.fragment = !0, t.mvx.updateState(t.sourceCodeComponentStateId, n)
					})), this.sourceCodeComponent.onSourceCodeChanged.add((function (e) {
						t.onSourceCodeChanged.trigger({
							programId: e.state.programId,
							sourceFragment: e.state.sourceFragment,
							sourceVertex: e.state.sourceVertex
						})
					})), this.jsonSourceItemComponent.onOpenSourceClicked.add((function (e) {
						t.openShader("FRAGMENT_SHADER" === e.state.value)
					})), this.updateViewState()
				}
				return e.prototype.saveCapture = function (e) {
					var t = JSON.stringify(e, null, 4),
						n = new Blob([t], {
							type: "octet/stream"
						}),
						i = "capture " + new Date(e.startTime).toTimeString().split(" ")[0] + ".json";
					if (navigator.msSaveBlob) navigator.msSaveBlob(n, i);
					else {
						var r = document.createElement("a"),
							o = window.URL.createObjectURL(n);
						r.setAttribute("href", o), r.setAttribute("download", i), r.click()
					}
				}, e.prototype.selectCapture = function (e) {
					this.currentCommandId = -1, this.currentCaptureStateId = e, this.displayCurrentCapture()
				}, e.prototype.selectCommand = function (e) {
					this.currentCommandStateId = e, this.currentVisualStateId = this.displayCurrentCommand(), this.displayCurrentVisualState()
				}, e.prototype.selectVisualState = function (e) {
					this.currentVisualStateId = e, this.currentCommandStateId = this.displayCurrentVisualState(), this.displayCurrentCommand()
				}, e.prototype.display = function () {
					this.visible = !0, this.updateViewState()
				}, e.prototype.hide = function () {
					this.visible = !1, this.updateViewState()
				}, e.prototype.addCapture = function (e) {
					var t = this.mvx.insertChildState(this.captureListStateId, {
						capture: e,
						active: !1
					}, 0, this.captureListItemComponent);
					return this.selectCapture(t), t
				}, e.prototype.showSourceCodeError = function (e) {
					this.sourceCodeComponent.showError(e)
				}, e.prototype.initKeyboardEvents = function () {
					var e = this;
					this.rootPlaceHolder.addEventListener("keydown", (function (t) {
						40 === e.mvx.getGenericState(e.menuStateId).status && (38 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.selectPreviousCommand()) : 40 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.selectNextCommand()) : 33 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.selectPreviousVisualState()) : 34 === t.keyCode && (t.preventDefault(), t.stopPropagation(), e.selectNextVisualState()))
					}))
				}, e.prototype.openShader = function (e) {
					this.mvx.removeChildrenStates(this.contentStateId);
					var t = this.mvx.getGenericState(this.currentCommandStateId);
					this.sourceCodeComponentStateId = this.mvx.addChildState(this.contentStateId, {
						programId: t.capture.DrawCall.programStatus.program.__SPECTOR_Object_TAG.id,
						nameVertex: t.capture.DrawCall.shaders[0].name,
						nameFragment: t.capture.DrawCall.shaders[1].name,
						sourceVertex: t.capture.DrawCall.shaders[0].source,
						sourceFragment: t.capture.DrawCall.shaders[1].source,
						fragment: e,
						editable: t.capture.DrawCall.programStatus.RECOMPILABLE
					}, this.sourceCodeComponent), this.commandDetailStateId = this.mvx.addChildState(this.contentStateId, null, this.commandDetailComponent), this.displayCurrentCommandDetail(t)
				}, e.prototype.selectPreviousCommand = function () {
					var e = this.mvx.getGenericState(this.currentCommandStateId);
					e.previousCommandStateId < 0 || this.selectCommand(e.previousCommandStateId)
				}, e.prototype.selectNextCommand = function () {
					var e = this.mvx.getGenericState(this.currentCommandStateId);
					e.nextCommandStateId < 0 || this.selectCommand(e.nextCommandStateId)
				}, e.prototype.selectPreviousVisualState = function () {
					var e = this.mvx.getGenericState(this.currentVisualStateId);
					e.previousVisualStateId < 0 || this.selectVisualState(e.previousVisualStateId)
				}, e.prototype.selectNextVisualState = function () {
					var e = this.mvx.getGenericState(this.currentVisualStateId);
					e.nextVisualStateId < 0 || this.selectVisualState(e.nextVisualStateId)
				}, e.prototype.initMenuComponent = function () {
					var e = this;
					this.mvx.updateState(this.menuStateId, {
						status: 0,
						searchText: this.searchText,
						commandCount: 0
					}), this.resultViewMenuComponent.onCloseClicked.add((function (t) {
						e.hide()
					})), this.resultViewMenuComponent.onCapturesClicked.add((function (t) {
						e.displayCaptures()
					})), this.resultViewMenuComponent.onCommandsClicked.add((function (t) {
						e.displayCurrentCapture()
					})), this.resultViewMenuComponent.onInformationClicked.add((function (t) {
						e.displayInformation()
					})), this.resultViewMenuComponent.onInitStateClicked.add((function (t) {
						e.displayInitState()
					})), this.resultViewMenuComponent.onEndStateClicked.add((function (t) {
						e.displayEndState()
					})), this.resultViewMenuComponent.onSearchTextChanged.add((function (t) {
						e.search(t.sender.value)
					})), this.resultViewMenuComponent.onSearchTextCleared.add((function (t) {
						e.mvx.updateState(e.menuStateId, {
							status: t.state.status,
							searchText: "",
							commandCount: t.state.commandCount
						}), e.search("")
					}))
				}, e.prototype.onCaptureRelatedAction = function (e) {
					var t = this.mvx.getGenericState(this.currentCaptureStateId);
					return this.commandCount = t.capture.commands.length, this.mvx.removeChildrenStates(this.contentStateId), this.mvx.updateState(this.menuStateId, {
						status: e,
						searchText: this.searchText,
						commandCount: this.commandCount
					}), this.mvx.getGenericState(this.captureListStateId) && this.mvx.updateState(this.captureListStateId, !1), t.capture
				}, e.prototype.displayCaptures = function () {
					this.mvx.updateState(this.menuStateId, {
						status: 0,
						searchText: this.searchText,
						commandCount: this.commandCount
					}), this.mvx.updateState(this.captureListStateId, !0)
				}, e.prototype.displayInformation = function () {
					var e = this.onCaptureRelatedAction(10),
						t = this.mvx.addChildState(this.contentStateId, !0, this.informationColumnComponent),
						n = this.mvx.addChildState(this.contentStateId, !1, this.informationColumnComponent),
						i = this.mvx.addChildState(t, null, this.jsonContentComponent);
					this.displayJSONGroup(i, "Canvas", e.canvas), this.displayJSONGroup(i, "Context", e.context);
					for (var r = this.mvx.addChildState(n, null, this.jsonContentComponent), o = 0, s = e.analyses; o < s.length; o++) {
						var a = s[o];
						this.displayJSONGroup(r, a.analyserName, a)
					}
					this.displayJSONGroup(r, "Frame Memory Changes", e.frameMemory), this.displayJSONGroup(r, "Total Memory (seconds since application start: bytes)", e.memory)
				}, e.prototype.displayJSON = function (e, t) {
					for (var n in t.VisualState && this.mvx.addChildState(e, t.VisualState, this.jsonVisualStateItemComponent), t)
						if ("VisualState" !== n && "analyserName" !== n) {
							var i = t[n];
							if ("source" === n) this.mvx.addChildState(e, {
								key: n,
								value: t.SHADER_TYPE
							}, this.jsonSourceItemComponent);
							else if ("visual" === n)
								for (var r in i) i.hasOwnProperty(r) && i[r] && this.mvx.addChildState(e, {
									key: r,
									value: i[r]
								}, this.jsonImageItemComponent);
							else {
								var o = this.getJSONAsString(e, n, i);
								if (null == o) continue;
								if (this.toFilter(n) && this.toFilter(i)) continue;
								this.mvx.addChildState(e, {
									key: n,
									value: o
								}, this.jsonItemComponent)
							}
							i && i.__SPECTOR_Metadata && this.displayJSONGroup(e, "Metadata", i.__SPECTOR_Metadata)
						}
				}, e.prototype.getJSONAsString = function (e, t, n) {
					if (null === n) return "null";
					if (void 0 === n) return "undefined";
					if ("number" == typeof n) return Math.floor(n) === n ? n.toFixed(0) : n.toFixed(4);
					if ("string" == typeof n) return n;
					if ("boolean" == typeof n) return n ? "true" : "false";
					if (0 === n.length) return "Empty Array";
					if (n.length) {
						for (var i = [], r = 0; r < n.length; r++) {
							var o = this.getJSONAsString(e, t + "(" + r.toFixed(0) + ")", n[r]);
							null !== o && i.push(o)
						}
						return 0 === i.length ? null : i.join(", ")
					}
					return n.help ? (this.mvx.addChildState(e, {
						key: t,
						value: n.name,
						help: n.help
					}, this.jsonHelpItemComponent), null) : n.__SPECTOR_Object_TAG ? n.__SPECTOR_Object_TAG.displayText : n.displayText ? n.displayText : ("object" == typeof n && this.displayJSONGroup(e, t, n), null)
				}, e.prototype.displayJSONGroup = function (e, t, n) {
					if (n) {
						var i = this.mvx.addChildState(e, t, this.jsonGroupComponent);
						this.displayJSON(i, n), this.mvx.hasChildren(i) || this.mvx.removeState(i)
					}
				}, e.prototype.displayInitState = function () {
					var e = this.onCaptureRelatedAction(20),
						t = this.mvx.addChildState(this.contentStateId, null, this.jsonContentComponent);
					this.displayJSON(t, e.initState)
				}, e.prototype.displayEndState = function () {
					var e = this.onCaptureRelatedAction(30),
						t = this.mvx.addChildState(this.contentStateId, null, this.jsonContentComponent);
					this.displayJSON(t, e.endState)
				}, e.prototype.displayCurrentCapture = function () {
					var e = this.onCaptureRelatedAction(40);
					this.mvx.updateAllChildrenGenericState(this.captureListStateId, (function (e) {
						return e.active = !1, e
					})), this.mvx.updateState(this.currentCaptureStateId, {
						capture: e,
						active: !0
					}), this.createVisualStates(e), this.commandListStateId = this.mvx.addChildState(this.contentStateId, null, this.commandListComponent), this.commandDetailStateId = this.mvx.addChildState(this.contentStateId, null, this.commandDetailComponent), this.createCommands(e)
				}, e.prototype.displayCurrentCommand = function () {
					if (40 !== this.mvx.getGenericState(this.menuStateId).status) return -1;
					var e = this.mvx.getGenericState(this.currentCommandStateId),
						t = e.capture;
					return this.currentCommandId = t.id, this.mvx.updateAllChildrenGenericState(this.commandListStateId, (function (e) {
						return e.active = !1, e
					})), this.mvx.updateState(this.currentCommandStateId, {
						capture: t,
						visualStateId: e.visualStateId,
						previousCommandStateId: e.previousCommandStateId,
						nextCommandStateId: e.nextCommandStateId,
						active: !0
					}), this.displayCurrentCommandDetail(e)
				}, e.prototype.displayCurrentCommandDetail = function (e) {
					var t = e.capture;
					this.mvx.removeChildrenStates(this.commandDetailStateId);
					var n = this.mvx.getGenericState(e.visualStateId);
					this.mvx.addChildState(this.commandDetailStateId, n.VisualState, this.jsonVisualStateItemComponent);
					var i = "Unknown";
					switch (t.status) {
						case 50:
							i = "Deprecated";
							break;
						case 10:
							i = "Unused";
							break;
						case 20:
							i = "Disabled";
							break;
						case 30:
							i = "Redundant";
							break;
						case 40:
							i = "Valid"
					}
					var r = vi.getMDNLink(t.name);
					for (var o in t.result ? this.displayJSONGroup(this.commandDetailStateId, "Global", {
							name: {
								help: r,
								name: t.name
							},
							duration: t.commandEndTime - t.startTime,
							result: t.result,
							status: i
						}) : this.displayJSONGroup(this.commandDetailStateId, "Global", {
							name: {
								help: r,
								name: t.name
							},
							duration: t.commandEndTime - t.startTime,
							status: i
						}), t) "VisualState" !== o && "result" !== o && "object" == typeof t[o] && this.displayJSONGroup(this.commandDetailStateId, o, t[o]);
					return e.visualStateId
				}, e.prototype.displayCurrentVisualState = function () {
					if (40 !== this.mvx.getGenericState(this.menuStateId).status) return null;
					var e = this.mvx.getGenericState(this.currentVisualStateId);
					return e.commandStateId === Number.MIN_VALUE ? this.displayInitState() : e.commandStateId === Number.MAX_VALUE && this.displayEndState(), this.mvx.updateAllChildrenGenericState(this.visualStateListStateId, (function (e) {
						return e.active = !1, e
					})), e.active = !0, this.mvx.updateState(this.currentVisualStateId, e), e.commandStateId
				}, e.prototype.createVisualStates = function (e) {
					this.visualStateListStateId = this.mvx.addChildState(this.contentStateId, null, this.visualStateListComponent), this.mvx.removeChildrenStates(this.visualStateListStateId), this.initVisualStateId = this.mvx.addChildState(this.visualStateListStateId, {
						VisualState: e.initState.VisualState,
						time: e.startTime,
						commandStateId: Number.MIN_VALUE,
						active: !1
					}, this.visualStateListItemComponent)
				}, e.prototype.createCommands = function (e) {
					this.mvx.removeChildrenStates(this.commandListStateId);
					for (var t = this.initVisualStateId, n = !1, i = null, r = -1, o = null, s = -1, a = 0; a < e.commands.length; a++) {
						var c = e.commands[a];
						if (!this.toFilter(c.marker) || !this.toFilter(c.name) || c.id === this.currentCommandId) {
							var l = {
									capture: c,
									previousCommandStateId: r,
									nextCommandStateId: -1,
									visualStateId: void 0,
									active: !1
								},
								u = this.mvx.addChildState(this.commandListStateId, l, this.commandListItemComponent);
							if (i && ((i = this.mvx.getGenericState(r)).nextCommandStateId = u, this.mvx.updateState(r, i)), r = u, i = l, c.VisualState) {
								var h = {
									VisualState: c.VisualState,
									time: c.endTime,
									commandStateId: u,
									active: !1,
									previousVisualStateId: s,
									nextVisualStateId: -1
								};
								t = this.mvx.addChildState(this.visualStateListStateId, h, this.visualStateListItemComponent), o && ((o = this.mvx.getGenericState(s)).nextVisualStateId = t, this.mvx.updateState(s, o)), o = h, s = t, n = !0
							} else if (!n) {
								var d = this.mvx.getGenericState(this.initVisualStateId);
								d.commandStateId = u, d.previousVisualStateId = -1, d.nextVisualStateId = -1, this.mvx.updateState(this.initVisualStateId, d), o = d, s = t, n = !0
							}
							l.visualStateId = t, this.mvx.updateState(u, l), (-1 === this.currentCommandId && 0 === a || this.currentCommandId === c.id) && (this.currentCommandStateId = u, this.displayCurrentCommand(), this.currentVisualStateId = t, this.displayCurrentVisualState())
						}
					}
				}, e.prototype.updateViewState = function () {
					this.mvx.updateState(this.rootStateId, this.visible)
				}, e.prototype.toFilter = function (e) {
					return e = (e += "").toLowerCase(), !!(this.searchText && this.searchText.length > 2 && -1 === e.indexOf(this.searchText.toLowerCase()))
				}, e.prototype.search = function (e) {
					switch (this.searchText = e, this.mvx.getGenericState(this.menuStateId).status) {
						case 0:
						case 40:
							this.displayCurrentCapture();
							break;
						case 30:
							this.displayEndState();
							break;
						case 10:
							this.displayInformation();
							break;
						case 20:
							this.displayInitState()
					}
					this.searchText = ""
				}, e
			}();
		n.d(t, "EmbeddedFrontend", (function () {
			return Ei
		})), n.d(t, "Spector", (function () {
			return Ci
		}));
		var Ei = {
				CaptureMenu: vn,
				ResultView: _i
			},
			Ci = function () {
				function e() {
					this.noFrameTimeout = -1, this.captureNextFrames = 0, this.captureNextCommands = 0, this.quickCapture = !1, this.retry = 0, this.contexts = [], this.timeSpy = new Yt, this.onCaptureStarted = new s, this.onCapture = new s, this.onError = new s, this.timeSpy.onFrameStart.add(this.onFrameStart, this), this.timeSpy.onFrameEnd.add(this.onFrameEnd, this), this.timeSpy.onError.add(this.onErrorInternal, this)
				}
				return e.getFirstAvailable3dContext = function (e) {
					return this.tryGetContextFromHelperField(e) || this.tryGetContextFromCanvas(e, "webgl") || this.tryGetContextFromCanvas(e, "experimental-webgl") || this.tryGetContextFromCanvas(e, "webgl2") || this.tryGetContextFromCanvas(e, "experimental-webgl2")
				}, e.tryGetContextFromHelperField = function (e) {
					var t = e instanceof HTMLCanvasElement ? e.getAttribute("__spector_context_type") : e.__spector_context_type;
					if (t) return this.tryGetContextFromCanvas(e, t)
				}, e.tryGetContextFromCanvas = function (e, t) {
					var n;
					try {
						n = e.getContext(t)
					} catch (e) {}
					return n
				}, e.prototype.displayUI = function (e) {
					var t = this;
					void 0 === e && (e = !1), this.captureMenu || (this.getCaptureUI(), this.captureMenu.onPauseRequested.add(this.pause, this), this.captureMenu.onPlayRequested.add(this.play, this), this.captureMenu.onPlayNextFrameRequested.add(this.playNextFrame, this), this.captureMenu.onCaptureRequested.add((function (e) {
						e && t.captureCanvas(e.ref)
					}), this), setInterval((function () {
						t.captureMenu.setFPS(t.getFps())
					}), 1e3), e || this.captureMenu.trackPageCanvases(), this.captureMenu.display()), this.resultView || (this.getResultUI(), this.onCapture.add((function (e) {
						t.resultView.display(), t.resultView.addCapture(e)
					})))
				}, e.prototype.getResultUI = function () {
					var e = this;
					return this.resultView || (this.resultView = new _i, this.resultView.onSourceCodeChanged.add((function (t) {
						e.rebuildProgramFromProgramId(t.programId, t.sourceVertex, t.sourceFragment, (function (n) {
							e.referenceNewProgram(t.programId, n), e.resultView.showSourceCodeError(null)
						}), (function (t) {
							e.resultView.showSourceCodeError(t)
						}))
					}))), this.resultView
				}, e.prototype.getCaptureUI = function () {
					return this.captureMenu || (this.captureMenu = new vn), this.captureMenu
				}, e.prototype.rebuildProgramFromProgramId = function (e, t, n, i, r) {
					var o = _t.getFromGlobalStore(e);
					this.rebuildProgram(o, t, n, i, r)
				}, e.prototype.rebuildProgram = function (e, t, n, i, o) {
					r.rebuildProgram(e, t, n, i, o)
				}, e.prototype.referenceNewProgram = function (e, t) {
					_t.updateInGlobalStore(e, t)
				}, e.prototype.pause = function () {
					this.timeSpy.changeSpeedRatio(0)
				}, e.prototype.play = function () {
					this.timeSpy.changeSpeedRatio(1)
				}, e.prototype.playNextFrame = function () {
					this.timeSpy.playNextFrame()
				}, e.prototype.drawOnlyEveryXFrame = function (e) {
					this.timeSpy.changeSpeedRatio(e)
				}, e.prototype.getFps = function () {
					return this.timeSpy.getFps()
				}, e.prototype.spyCanvases = function () {
					this.canvasSpy ? this.onErrorInternal("Already spying canvas.") : (this.canvasSpy = new qt, this.canvasSpy.onContextRequested.add(this.spyContext, this))
				}, e.prototype.spyCanvas = function (e) {
					this.canvasSpy ? this.onErrorInternal("Already spying canvas.") : (this.canvasSpy = new qt(e), this.canvasSpy.onContextRequested.add(this.spyContext, this))
				}, e.prototype.getAvailableContexts = function () {
					return this.getAvailableContexts()
				}, e.prototype.captureCanvas = function (t, n, i) {
					void 0 === n && (n = 0), void 0 === i && (i = !1);
					var r = this.getAvailableContextSpyByCanvas(t);
					if (r) this.captureContextSpy(r, n, i);
					else {
						var s = e.getFirstAvailable3dContext(t);
						s ? this.captureContext(s, n, i) : o.error("No webgl context available on the chosen canvas.")
					}
				}, e.prototype.captureContext = function (e, t, n) {
					void 0 === t && (t = 0), void 0 === n && (n = !1);
					var i = this.getAvailableContextSpyByCanvas(e.canvas);
					i || ((i = e.getIndexedParameter ? new zt({
						context: e,
						version: 2,
						recordAlways: !1
					}) : new zt({
						context: e,
						version: 1,
						recordAlways: !1
					})).onMaxCommand.add(this.stopCapture, this), this.contexts.push({
						canvas: i.context.canvas,
						contextSpy: i
					})), i && this.captureContextSpy(i, t, n)
				}, e.prototype.captureContextSpy = function (e, t, n) {
					var i = this;
					void 0 === t && (t = 0), void 0 === n && (n = !1), this.quickCapture = n, this.capturingContext ? this.onErrorInternal("Already capturing a context.") : (this.retry = 0, this.capturingContext = e, this.capturingContext.setMarker(this.marker), (t = Math.min(t, 5e3)) > 0 ? this.captureCommands(t) : this.captureFrames(1), this.noFrameTimeout = setTimeout((function () {
						t > 0 ? i.stopCapture() : i.capturingContext && i.retry > 1 ? i.onErrorInternal("No frames with gl commands detected. Try moving the camera.") : i.onErrorInternal("No frames detected. Try moving the camera or implementing requestAnimationFrame.")
					}), 1e4))
				}, e.prototype.captureNextFrame = function (e, t) {
					void 0 === t && (t = !1), e instanceof HTMLCanvasElement || self.OffscreenCanvas && e instanceof OffscreenCanvas ? this.captureCanvas(e, 0, t) : this.captureContext(e, 0, t)
				}, e.prototype.startCapture = function (e, t, n) {
					void 0 === n && (n = !1), e instanceof HTMLCanvasElement || self.OffscreenCanvas && e instanceof OffscreenCanvas ? this.captureCanvas(e, t, n) : this.captureContext(e, t, n)
				}, e.prototype.stopCapture = function () {
					if (this.capturingContext) {
						var e = this.capturingContext.stopCapture();
						if (e.commands.length > 0) return this.noFrameTimeout > -1 && clearTimeout(this.noFrameTimeout), this.triggerCapture(e), this.capturingContext = void 0, this.captureNextFrames = 0, this.captureNextCommands = 0, e;
						0 === this.captureNextCommands && (this.retry++, this.captureFrames(1))
					}
				}, e.prototype.setMarker = function (e) {
					this.marker = e, this.capturingContext && this.capturingContext.setMarker(e)
				}, e.prototype.clearMarker = function () {
					this.marker = null, this.capturingContext && this.capturingContext.clearMarker()
				}, e.prototype.captureFrames = function (e) {
					this.captureNextFrames = e, this.captureNextCommands = 0, this.playNextFrame()
				}, e.prototype.captureCommands = function (e) {
					this.captureNextFrames = 0, this.captureNextCommands = e, this.play(), this.capturingContext ? (this.onCaptureStarted.trigger(void 0), this.capturingContext.startCapture(e, this.quickCapture)) : (this.onErrorInternal("No context to capture from."), this.captureNextCommands = 0)
				}, e.prototype.spyContext = function (e) {
					var t = this.getAvailableContextSpyByCanvas(e.context.canvas);
					t || ((t = new zt({
						context: e.context,
						version: e.contextVersion,
						recordAlways: !0
					})).onMaxCommand.add(this.stopCapture, this), this.contexts.push({
						canvas: t.context.canvas,
						contextSpy: t
					})), t.spy()
				}, e.prototype.getAvailableContextSpyByCanvas = function (e) {
					for (var t = 0, n = this.contexts; t < n.length; t++) {
						var i = n[t];
						if (i.canvas === e) return i.contextSpy
					}
				}, e.prototype.onFrameStart = function () {
					this.captureNextCommands > 0 || (this.captureNextFrames > 0 ? (this.capturingContext && (this.onCaptureStarted.trigger(void 0), this.capturingContext.startCapture(0, this.quickCapture)), this.captureNextFrames--) : this.capturingContext = void 0)
				}, e.prototype.onFrameEnd = function () {
					this.captureNextCommands > 0 || 0 === this.captureNextFrames && this.stopCapture()
				}, e.prototype.triggerCapture = function (e) {
					this.captureMenu && this.captureMenu.captureComplete(null), this.onCapture.trigger(e)
				}, e.prototype.onErrorInternal = function (e) {
					if (o.error(e), this.noFrameTimeout > -1 && clearTimeout(this.noFrameTimeout), !this.capturingContext) throw e;
					this.capturingContext = void 0, this.captureNextFrames = 0, this.captureNextCommands = 0, this.retry = 0, this.captureMenu && this.captureMenu.captureComplete(e), this.onError.trigger(e)
				}, e
			}()
	}])
}));