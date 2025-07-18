/* ScrollMagic v1.2.3 | (c) 2014 Jan Paepke (@janpaepke) | license & info: http://janpaepke.github.io/ScrollMagic */
!(function (e) {
  "use strict";
  var t,
    n,
    r = e.define;
  (n = t = function () {}),
    ("function" == typeof r && r.amd) ||
      (r = function (t, n, r) {
        for (var i, o = 0; o < n.length; o++)
          (i = n[o]), "jquery" === i && (i = "jQuery"), (n[o] = e[i]);
        e[t] = r.apply(e, n);
      }),
    r("ScrollMagic", ["jquery", "TweenMax", "TimelineMax"], function (e) {
      return (
        (t = function (t) {
          var r,
            s,
            c = "ScrollMagic",
            u = {
              container: window,
              vertical: !0,
              globalSceneOptions: {},
              loglevel: 2,
              refreshInterval: 100,
            },
            f = this,
            g = e.extend({}, u, t),
            h = [],
            d = !1,
            p = 0,
            v = "PAUSED",
            w = !0,
            m = 0,
            y = !0,
            E = function () {
              if (
                ((f.version = f.constructor.version),
                e.each(g, function (e) {
                  u.hasOwnProperty(e) || delete g[e];
                }),
                (g.container = e(g.container).first()),
                0 === g.container.length)
              )
                throw c + " init failed.";
              (w = !e.contains(document, g.container.get(0))),
                w ||
                  g.container.on("resize", function (e) {
                    e.stopPropagation();
                  }),
                (m = g.vertical ? g.container.height() : g.container.width()),
                g.container.on("scroll resize", b),
                (g.refreshInterval = parseInt(g.refreshInterval)),
                g.refreshInterval > 0 &&
                  (s = window.setInterval(R, g.refreshInterval)),
                (r = a(T));
            },
            S = function () {
              return g.vertical
                ? g.container.scrollTop()
                : g.container.scrollLeft();
            },
            F = function (e) {
              g.vertical ? g.container.scrollTop(e) : g.container.scrollLeft(e);
            },
            T = function () {
              if (((r = a(T)), y && d)) {
                var t = e.isArray(d) ? d : h.slice(0),
                  n = p;
                p = f.scrollPos();
                var i = p - n;
                (v = 0 === i ? "PAUSED" : i > 0 ? "FORWARD" : "REVERSE"),
                  0 > i && t.reverse(),
                  e.each(t, function (e, t) {
                    t.update(!0);
                  }),
                  0 === t.length && g.loglevel >= 3,
                  (d = !1);
              }
            },
            b = function (e) {
              "resize" == e.type &&
                (m = g.vertical ? g.container.height() : g.container.width()),
                (d = !0);
            },
            R = function () {
              w ||
                (m !=
                  (g.vertical ? g.container.height() : g.container.width()) &&
                  g.container.trigger("resize")),
                e.each(h, function (e, t) {
                  t.refresh();
                });
            },
            z = function (e) {
              if (e.length <= 1) return e;
              var t = e.slice(0);
              return (
                t.sort(function (e, t) {
                  return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
                }),
                t
              );
            };
          return (
            (this.addScene = function (t) {
              return (
                e.isArray(t)
                  ? e.each(t, function (e, t) {
                      f.addScene(t);
                    })
                  : t instanceof n &&
                    (t.parent() != f
                      ? t.addTo(f)
                      : e.inArray(t, h) < 0 &&
                        (h.push(t),
                        (h = z(h)),
                        t.on("shift." + c + "_sort", function () {
                          h = z(h);
                        }),
                        e.each(g.globalSceneOptions, function (e, n) {
                          t[e] && t[e].call(t, n);
                        }))),
                f
              );
            }),
            (this.removeScene = function (t) {
              if (e.isArray(t))
                e.each(t, function (e, t) {
                  f.removeScene(t);
                });
              else {
                var n = e.inArray(t, h);
                n > -1 &&
                  (t.off("shift." + c + "_sort"), h.splice(n, 1), t.remove());
              }
              return f;
            }),
            (this.updateScene = function (t, n) {
              return (
                e.isArray(t)
                  ? e.each(t, function (e, t) {
                      f.updateScene(t, n);
                    })
                  : n
                  ? t.update(!0)
                  : (e.isArray(d) || (d = []),
                    -1 == e.inArray(t, d) && d.push(t),
                    (d = z(d))),
                f
              );
            }),
            (this.update = function (e) {
              return b({ type: "resize" }), e && T(), f;
            }),
            (this.scrollTo = function (t) {
              if (t instanceof n)
                t.parent() === f
                  ? f.scrollTo(t.scrollOffset())
                  : log(
                      2,
                      "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",
                      t
                    );
              else if ("string" === e.type(t) || o(t) || t instanceof e) {
                var r = e(t).first();
                if (r[0]) {
                  var s = g.vertical ? "top" : "left",
                    a = i(g.container),
                    l = i(r);
                  w || (a[s] -= f.scrollPos()), f.scrollTo(l[s] - a[s]);
                } else
                  log(
                    2,
                    "scrollTo(): The supplied element could not be found. Scroll cancelled.",
                    t
                  );
              } else e.isFunction(t) ? (F = t) : F.call(g.container[0], t);
              return f;
            }),
            (this.scrollPos = function (t) {
              return arguments.length
                ? (e.isFunction(t) && (S = t), f)
                : S.call(f);
            }),
            (this.info = function (e) {
              var t = {
                size: m,
                vertical: g.vertical,
                scrollPos: p,
                scrollDirection: v,
                container: g.container,
                isDocument: w,
              };
              return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
            }),
            (this.loglevel = function (e) {
              return arguments.length
                ? (g.loglevel != e && (g.loglevel = e), f)
                : g.loglevel;
            }),
            (this.enabled = function (e) {
              return arguments.length
                ? (y != e && ((y = !!e), f.updateScene(h, !0)), f)
                : y;
            }),
            (this.destroy = function (e) {
              window.clearTimeout(s);
              for (var t = h.length; t--; ) h[t].destroy(e);
              return g.container.off("scroll resize", b), l(r), null;
            }),
            E(),
            f
          );
        }),
        (t.version = "1.2.3"),
        t
      );
    }),
    r("ScrollScene", ["jquery", "TweenMax", "TimelineMax"], function (e, r, o) {
      return (n = function (n) {
        var r,
          a,
          l,
          c,
          u,
          f,
          g,
          h = { onCenter: 0.5, onEnter: 1, onLeave: 0 },
          d = "ScrollScene",
          p = {
            duration: 0,
            offset: 0,
            triggerElement: null,
            triggerHook: "onCenter",
            reverse: !0,
            tweenChanges: !1,
            loglevel: 2,
          },
          v = this,
          w = e.extend({}, p, n),
          m = "BEFORE",
          y = 0,
          E = { start: 0, end: 0 },
          S = 0,
          F = !0,
          T = {
            unknownOptionSupplied: function () {
              e.each(w, function (e) {
                p.hasOwnProperty(e) || delete w[e];
              });
            },
            duration: function () {
              if (e.isFunction(w.duration)) {
                r = w.duration;
                try {
                  w.duration = parseFloat(r());
                } catch (t) {
                  (r = void 0), (w.duration = p.duration);
                }
              } else
                (w.duration = parseFloat(w.duration)),
                  (!e.isNumeric(w.duration) || w.duration < 0) &&
                    (w.duration = p.duration);
            },
            offset: function () {
              (w.offset = parseFloat(w.offset)),
                e.isNumeric(w.offset) || (w.offset = p.offset);
            },
            triggerElement: function () {
              null !== w.triggerElement &&
                0 === e(w.triggerElement).length &&
                (w.triggerElement = p.triggerElement);
            },
            triggerHook: function () {
              w.triggerHook in h ||
                (w.triggerHook = e.isNumeric(w.triggerHook)
                  ? Math.max(0, Math.min(parseFloat(w.triggerHook), 1))
                  : p.triggerHook);
            },
            reverse: function () {
              w.reverse = !!w.reverse;
            },
            tweenChanges: function () {
              w.tweenChanges = !!w.tweenChanges;
            },
          },
          b = function () {
            R(),
              v
                .on("change.internal", function (e) {
                  "loglevel" !== e.what &&
                    "tweenChanges" !== e.what &&
                    ("triggerElement" === e.what
                      ? x()
                      : "reverse" === e.what && v.update());
                })
                .on("shift.internal", function (e) {
                  C(),
                    v.update(),
                    (("AFTER" === m && "duration" === e.reason) ||
                      ("DURING" === m && 0 === w.duration)) &&
                      O();
                })
                .on("progress.internal", function () {
                  P(), O();
                })
                .on("destroy", function (e) {
                  e.preventDefault();
                });
          },
          R = function (t) {
            if (arguments.length) e.isArray(t) || (t = [t]);
            else {
              t = [];
              for (var n in T) t.push(n);
            }
            e.each(t, function (e, t) {
              T[t] && T[t]();
            });
          },
          z = function (e, t) {
            var n = !1,
              r = w[e];
            return w[e] != t && ((w[e] = t), R(e), (n = r != w[e])), n;
          },
          C = function () {
            (E = { start: S + w.offset }),
              a &&
                w.triggerElement &&
                (E.start -= a.info("size") * v.triggerHook()),
              (E.end = E.start + w.duration);
          },
          D = function (e) {
            if (r) {
              var t = "duration";
              z(t, r.call(v)) &&
                !e &&
                (v.trigger("change", { what: t, newval: w[t] }),
                v.trigger("shift", { reason: t }));
            }
          },
          x = function (t) {
            var n = 0;
            if (a && w.triggerElement) {
              for (
                var r = e(w.triggerElement).first(),
                  o = a.info(),
                  s = i(o.container),
                  l = o.vertical ? "top" : "left";
                r.parent().data("ScrollMagicPinSpacer");

              )
                r = r.parent();
              var c = i(r);
              o.isDocument || (s[l] -= a.scrollPos()), (n = c[l] - s[l]);
            }
            var u = n != S;
            (S = n),
              u &&
                !t &&
                v.trigger("shift", { reason: "triggerElementPosition" });
          },
          P = function (e) {
            if (l) {
              var t = e >= 0 && 1 >= e ? e : y;
              if (-1 === l.repeat())
                if ("DURING" === m && l.paused()) l.play();
                else {
                  if ("DURING" === m || l.paused()) return !1;
                  l.pause();
                }
              else {
                if (t == l.progress()) return !1;
                0 === w.duration
                  ? "DURING" === m
                    ? l.play()
                    : l.reverse()
                  : w.tweenChanges
                  ? l.tweenTo(t * l.duration())
                  : l.progress(t).pause();
              }
              return !0;
            }
            return !1;
          },
          O = function (e) {
            if (c && a) {
              var t = a.info();
              if (e || "DURING" !== m) {
                var n = {
                    position: u.inFlow ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                  },
                  r = c.css("position") != n.position;
                u.pushFollowers
                  ? w.duration > 0 &&
                    ("AFTER" === m &&
                    0 === parseFloat(u.spacer.css("padding-top"))
                      ? (r = !0)
                      : "BEFORE" === m &&
                        0 === parseFloat(u.spacer.css("padding-bottom")) &&
                        (r = !0))
                  : (n[t.vertical ? "top" : "left"] = w.duration * y),
                  c.css(n),
                  r && (c.removeClass(u.pinnedClass), A());
              } else {
                "fixed" != c.css("position") &&
                  (c.css("position", "fixed"), A(), c.addClass(u.pinnedClass));
                var o = i(u.spacer, !0),
                  s =
                    w.reverse || 0 === w.duration
                      ? t.scrollPos - E.start
                      : Math.round(y * w.duration * 10) / 10;
                (o.top -= parseFloat(u.spacer.css("margin-top"))),
                  (o[t.vertical ? "top" : "left"] += s),
                  c.css({ top: o.top, left: o.left });
              }
            }
          },
          A = function () {
            if (c && a && u.inFlow) {
              var t = "AFTER" === m,
                n = "BEFORE" === m,
                r = "DURING" === m,
                i = "fixed" == c.css("position"),
                o = a.info("vertical"),
                l = u.spacer.children().first(),
                f = s(u.spacer.css("display")),
                g = {};
              f
                ? ((g["margin-top"] =
                    n || (r && i) ? c.css("margin-top") : "auto"),
                  (g["margin-bottom"] =
                    t || (r && i) ? c.css("margin-bottom") : "auto"))
                : (g["margin-top"] = g["margin-bottom"] = "auto"),
                u.relSize.width || u.relSize.autoFullWidth
                  ? i
                    ? e(window).width() == u.spacer.parent().width()
                      ? c.css(
                          "width",
                          u.relSize.autoFullWidth ? "100%" : "inherit"
                        )
                      : c.css("width", u.spacer.width())
                    : c.css("width", "100%")
                  : ((g["min-width"] = l.outerWidth(!l.is(c))),
                    (g.width = i ? g["min-width"] : "auto")),
                u.relSize.height
                  ? i
                    ? e(window).height() == u.spacer.parent().height()
                      ? c.css("height", "inherit")
                      : c.css("height", u.spacer.height())
                    : c.css("height", "100%")
                  : ((g["min-height"] = l.outerHeight(!f)),
                    (g.height = i ? g["min-height"] : "auto")),
                u.pushFollowers &&
                  ((g["padding" + (o ? "Top" : "Left")] = w.duration * y),
                  (g["padding" + (o ? "Bottom" : "Right")] =
                    w.duration * (1 - y))),
                u.spacer.css(g);
            }
          },
          I = function () {
            a && c && "DURING" === m && !a.info("isDocument") && O();
          },
          N = function () {
            a &&
              c &&
              "DURING" === m &&
              (((u.relSize.width || u.relSize.autoFullWidth) &&
                e(window).width() != u.spacer.parent().width()) ||
                (u.relSize.height &&
                  e(window).height() != u.spacer.parent().height())) &&
              A();
          },
          k = function (e) {
            a &&
              c &&
              "DURING" === m &&
              !a.info("isDocument") &&
              (e.preventDefault(),
              a.scrollTo(
                a.info("scrollPos") -
                  (e.originalEvent.wheelDelta / 3 ||
                    30 * -e.originalEvent.detail)
              ));
          };
        return (
          (this.parent = function () {
            return a;
          }),
          (this.duration = function (t) {
            var n = "duration";
            return arguments.length
              ? (e.isFunction(t) || (r = void 0),
                z(n, t) &&
                  (v.trigger("change", { what: n, newval: w[n] }),
                  v.trigger("shift", { reason: n })),
                v)
              : w[n];
          }),
          (this.offset = function (e) {
            var t = "offset";
            return arguments.length
              ? (z(t, e) &&
                  (v.trigger("change", { what: t, newval: w[t] }),
                  v.trigger("shift", { reason: t })),
                v)
              : w[t];
          }),
          (this.triggerElement = function (e) {
            var t = "triggerElement";
            return arguments.length
              ? (z(t, e) && v.trigger("change", { what: t, newval: w[t] }), v)
              : w[t];
          }),
          (this.triggerHook = function (t) {
            var n = "triggerHook";
            return arguments.length
              ? (z(n, t) &&
                  (v.trigger("change", { what: n, newval: w[n] }),
                  v.trigger("shift", { reason: n })),
                v)
              : e.isNumeric(w[n])
              ? w[n]
              : h[w[n]];
          }),
          (this.reverse = function (e) {
            var t = "reverse";
            return arguments.length
              ? (z(t, e) && v.trigger("change", { what: t, newval: w[t] }), v)
              : w[t];
          }),
          (this.tweenChanges = function (e) {
            var t = "tweenChanges";
            return arguments.length
              ? (z(t, e) && v.trigger("change", { what: t, newval: w[t] }), v)
              : w[t];
          }),
          (this.loglevel = function (e) {
            var t = "loglevel";
            return arguments.length
              ? (z(t, e) && v.trigger("change", { what: t, newval: w[t] }), v)
              : w[t];
          }),
          (this.state = function () {
            return m;
          }),
          (this.triggerPosition = function () {
            var e = w.offset;
            return (
              a &&
                (e += w.triggerElement ? S : a.info("size") * v.triggerHook()),
              e
            );
          }),
          (this.triggerOffset = function () {
            return v.triggerPosition();
          }),
          (this.scrollOffset = function () {
            return E.start;
          }),
          (this.update = function (e) {
            if (a)
              if (e)
                if (a.enabled() && F) {
                  var t,
                    n = a.info("scrollPos");
                  (t =
                    w.duration > 0
                      ? (n - E.start) / (E.end - E.start)
                      : n >= E.start
                      ? 1
                      : 0),
                    v.trigger("update", {
                      startPos: E.start,
                      endPos: E.end,
                      scrollPos: n,
                    }),
                    v.progress(t);
                } else c && "DURING" === m && O(!0);
              else a.updateScene(v, !1);
            return v;
          }),
          (this.refresh = function () {
            return D(), x(), v;
          }),
          (this.progress = function (e) {
            if (arguments.length) {
              var t = !1,
                n = m,
                r = a ? a.info("scrollDirection") : "PAUSED",
                i = w.reverse || e >= y;
              if (
                (0 === w.duration
                  ? ((t = y != e),
                    (y = 1 > e && i ? 0 : 1),
                    (m = 0 === y ? "BEFORE" : "DURING"))
                  : 0 >= e && "BEFORE" !== m && i
                  ? ((y = 0), (m = "BEFORE"), (t = !0))
                  : e > 0 && 1 > e && i
                  ? ((y = e), (m = "DURING"), (t = !0))
                  : e >= 1 && "AFTER" !== m
                  ? ((y = 1), (m = "AFTER"), (t = !0))
                  : "DURING" !== m || i || O(),
                t)
              ) {
                var o = { progress: y, state: m, scrollDirection: r },
                  s = m != n,
                  l = function (e) {
                    v.trigger(e, o);
                  };
                s &&
                  "DURING" !== n &&
                  (l("enter"), l("BEFORE" === n ? "start" : "end")),
                  l("progress"),
                  s &&
                    "DURING" !== m &&
                    (l("BEFORE" === m ? "start" : "end"), l("leave"));
              }
              return v;
            }
            return y;
          }),
          (this.setTween = function (e) {
            if (!o) return v;
            l && v.removeTween();
            try {
              l = new o({ smoothChildTiming: !0 }).add(e).pause();
            } catch (t) {
            } finally {
              e.repeat && -1 === e.repeat() && (l.repeat(-1), l.yoyo(e.yoyo()));
            }
            return P(), v;
          }),
          (this.removeTween = function (e) {
            return l && (e && P(0), l.kill(), (l = void 0)), v;
          }),
          (this.setPin = function (t, n) {
            var r = {
              pushFollowers: !0,
              spacerClass: "scrollmagic-pin-spacer",
              pinnedClass: "",
            };
            if (((n = e.extend({}, r, n)), (t = e(t).first()), 0 === t.length))
              return v;
            if ("fixed" == t.css("position")) return v;
            if (c) {
              if (c === t) return v;
              v.removePin();
            }
            (c = t), c.parent().hide();
            var i = "absolute" != c.css("position"),
              o = c.css(["display", "top", "left", "bottom", "right"]),
              a = c.css(["width", "height"]);
            c.parent().show(),
              "0px" === a.width && i && s(o.display),
              !i && n.pushFollowers && (n.pushFollowers = !1);
            var l = e("<div></div>")
                .addClass(n.spacerClass)
                .css(o)
                .data("ScrollMagicPinSpacer", !0)
                .css({
                  position: i ? "relative" : "absolute",
                  "margin-left": "auto",
                  "margin-right": "auto",
                  "box-sizing": "content-box",
                }),
              f = c[0].style;
            return (
              (u = {
                spacer: l,
                relSize: {
                  width: "%" === a.width.slice(-1),
                  height: "%" === a.height.slice(-1),
                  autoFullWidth: "0px" === a.width && i && s(o.display),
                },
                pushFollowers: n.pushFollowers,
                inFlow: i,
                origStyle: {
                  width: f.width || "",
                  position: f.position || "",
                  top: f.top || "",
                  left: f.left || "",
                  bottom: f.bottom || "",
                  right: f.right || "",
                  "box-sizing": f["box-sizing"] || "",
                  "-moz-box-sizing": f["-moz-box-sizing"] || "",
                  "-webkit-box-sizing": f["-webkit-box-sizing"] || "",
                },
                pinnedClass: n.pinnedClass,
              }),
              u.relSize.width && l.css("width", a.width),
              u.relSize.height && l.css("height", a.height),
              c
                .before(l)
                .appendTo(l)
                .css({
                  position: i ? "relative" : "absolute",
                  top: "auto",
                  left: "auto",
                  bottom: "auto",
                  right: "auto",
                }),
              (u.relSize.width || u.relSize.autoFullWidth) &&
                c.css("box-sizing", "border-box"),
              e(window).on("scroll." + d + "_pin resize." + d + "_pin", I),
              c.on("mousewheel DOMMouseScroll", k),
              O(),
              v
            );
          }),
          (this.removePin = function (t) {
            return (
              c &&
                (t || !a
                  ? (c.insertBefore(u.spacer).css(u.origStyle),
                    u.spacer.remove())
                  : "DURING" === m && O(!0),
                e(window).off("scroll." + d + "_pin resize." + d + "_pin"),
                c.off("mousewheel DOMMouseScroll", k),
                (c = void 0)),
              v
            );
          }),
          (this.setClassToggle = function (t, n) {
            var r = e(t);
            return 0 === r.length || "string" !== e.type(n)
              ? v
              : ((f = n),
                (g = r),
                v.on("enter.internal_class leave.internal_class", function (e) {
                  g.toggleClass(f, "enter" === e.type);
                }),
                v);
          }),
          (this.removeClassToggle = function (e) {
            return (
              g && e && g.removeClass(f),
              v.off("start.internal_class end.internal_class"),
              (f = void 0),
              (g = void 0),
              v
            );
          }),
          (this.addTo = function (e) {
            return (
              e instanceof t &&
                a != e &&
                (a && a.removeScene(v),
                (a = e),
                R(),
                D(!0),
                x(!0),
                C(),
                A(),
                a.info("container").on("resize." + d, function () {
                  N(),
                    v.triggerHook() > 0 &&
                      v.trigger("shift", { reason: "containerSize" });
                }),
                e.addScene(v),
                v.update()),
              v
            );
          }),
          (this.enabled = function (e) {
            return arguments.length
              ? (F != e && ((F = !!e), v.update(!0)), v)
              : F;
          }),
          (this.remove = function () {
            if (a) {
              a.info("container").off("resize." + d);
              var e = a;
              (a = void 0), e.removeScene(v);
            }
            return v;
          }),
          (this.destroy = function (e) {
            return (
              v.removeTween(e),
              v.removePin(e),
              v.removeClassToggle(e),
              v.trigger("destroy", { reset: e }),
              v.remove(),
              v.off(
                "start end enter leave progress change update shift destroy shift.internal change.internal progress.internal"
              ),
              null
            );
          }),
          (this.on = function (t, n) {
            if (e.isFunction(n)) {
              var r = e
                .trim(t)
                .toLowerCase()
                .replace(/(\w+)\.(\w+)/g, "$1." + d + "_$2")
                .replace(/( |^)(\w+)(?= |$)/g, "$1$2." + d);
              e(v).on(r, n);
            }
            return v;
          }),
          (this.off = function (t, n) {
            var r = e
              .trim(t)
              .toLowerCase()
              .replace(/(\w+)\.(\w+)/g, "$1." + d + "_$2")
              .replace(/( |^)(\w+)(?= |$)/g, "$1$2." + d + "$3");
            return e(v).off(r, n), v;
          }),
          (this.trigger = function (t, n) {
            var r = e.Event(e.trim(t).toLowerCase(), n);
            return e(v).trigger(r), v;
          }),
          b(),
          v
        );
      });
    });
  var i = function (e, t) {
      var n = { top: 0, left: 0 };
      if (((e = e[0]), e && e.getBoundingClientRect)) {
        var r = e.getBoundingClientRect();
        (n.top = r.top),
          (n.left = r.left),
          t ||
            ((n.top +=
              (window.pageYOffset || document.scrollTop || 0) -
              (document.clientTop || 0)),
            (n.left +=
              (window.pageXOffset || document.scrollLeft || 0) -
              (document.clientLeft || 0)));
      }
      return n;
    },
    o = function (e) {
      return "object" == typeof HTMLElement
        ? e instanceof HTMLElement
        : e &&
            "object" == typeof e &&
            null !== e &&
            1 === e.nodeType &&
            "string" == typeof e.nodeName;
    },
    s = function (e) {
      return (
        ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
      );
    },
    a = window.requestAnimationFrame,
    l = window.cancelAnimationFrame;
  !(function (e) {
    var t,
      n = 0,
      r = ["ms", "moz", "webkit", "o"];
    for (t = 0; !a && t < r.length; ++t)
      (a = e[r[t] + "RequestAnimationFrame"]),
        (l =
          e[r[t] + "CancelAnimationFrame"] ||
          e[r[t] + "CancelRequestAnimationFrame"]);
    a ||
      (a = function (t) {
        var r = new Date().getTime(),
          i = Math.max(0, 16 - (r - n)),
          o = e.setTimeout(function () {
            t(r + i);
          }, i);
        return (n = r + i), o;
      }),
      l ||
        (l = function (t) {
          e.clearTimeout(t);
        });
  })(window);
})(this || window);
