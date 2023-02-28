/**
* Jeeliz Face Filter - https://github.com/jeeliz/jeelizFaceFilter
*
* Copyright 2020 WebAR.rocks ( https://webar.rocks )
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var JEELIZFACEFILTER = (function () {
    window.JEELIZFACEFILTERGEN = function () {
        function Jb(a) {
            var c = null, d = null, g = null, k = 0, p = this, q = null, n = { ab: [], Ib: "none", Ac: !1, Hb: null, grid: null, Xa: [1, 1] }; this.A = function () { this.De(q.ab); g.fg({ Ib: q.Ib, Ac: q.Ac, Hb: q.Hb }) }; this.lf = function (m) { return c[m] }; this.Tb = function (m) { ["s31", "s33", "s26"].forEach(function (r) { G.T(r, [{ type: "2f", name: "u20", value: m }]) }); c && c.forEach(function (r) { r.Tb(m) }) }; this.De = function (m) {
                var r = null; k = m.length; var y = null !== q.grid && a.grid.length && !(1 === a.grid[0] && 1 === a.grid[1]), C = y ? q.grid :
                    [1, 1]; y && this.Tb(C); c = m.map(function (x, B) { x = Object.assign({}, x, { index: B, parent: p, Kb: r, Af: B === k - 1, Fa: y, Y: C, Xa: 1 === B ? q.Xa : [1, 1] }); return r = B = 0 === B ? Kb.instance(x) : Lb.instance(x) }); d = c[0]; g = c[k - 1]; c.forEach(function (x, B) { 0 !== B && x.Pf() })
            }; this.U = function (m) { m.h(0); var r = m; c.forEach(function (y) { r = y.U(r, !1) }); return r }; this.kf = function () { return d.jf() }; this.Wa = function () { return g.pf() }; this.vd = function () { return g.vd() }; this.m = function () { c && (c.forEach(function (m) { m.m() }), g = d = c = null, k = 0) }; "undefined" !== typeof a &&
                (q = Object.assign({}, n, a), this.A())
        } function fb(a, c) { var d = c % 8; return a[(c - d) / 8] >> 7 - d & 1 } function tb(a, c, d) { var g = 1, k = 0; for (d = c + d - 1; d >= c; --d)k += g * fb(a, d), g *= 2; return k } function ub(a) { a = a.data; a = "undefined" === typeof btoa ? Buffer.from(a, "base64").toString("latin1") : atob(a); for (var c = a.length, d = new Uint8Array(c), g = 0; g < c; ++g)d[g] = a.charCodeAt(g); return d } function gb(a) { return "string" === typeof a ? JSON.parse(a) : a } function Mb(a) {
            if ("undefined" === typeof gb(a).nb) {
                var c = gb(a); a = c.ne; var d = c.nf, g = c.n; c = ub(c); for (var k =
                    new Float32Array(g), p = new Float32Array(d), q = a + d + 1, n = 0; n < g; ++n) { var m = q * n, r = 0 === fb(c, m) ? 1 : -1, y = tb(c, m + 1, a); m = m + 1 + a; for (var C = p.length, x = 0, B = m; B < m + C; ++B)p[x] = fb(c, B, !0), ++x; for (C = m = 0; C < d; ++C)m += p[C] * Math.pow(2, -C - 1); k[n] = 0 === m && 0 === y ? 0 : r * (1 + m) * Math.pow(2, 1 + y - Math.pow(2, a - 1)) } a = k
            } else if (g = gb(a), a = g.nb, 0 === a) a = new Uint8Array(g.nb); else { d = g.n; g = ub(g); c = new Uint32Array(d); for (k = 0; k < d; ++k)c[k] = tb(g, k * a, a); a = c } return a
        } function Za() { return -1 !== [ja.ready, ja.play, ja.pause].indexOf(na) } function hb() {
            if (na ===
                ja.play) return !1; na = ja.play; Na.stop(); vb(0)
        } function wb() { if (na !== ja.play) return !1; qa.stop(); Na.stop(); na = ja.pause; return !0 } function Fa(a, c, d, g, k) { a = 4 * (3 * c + a) + d; return g + (V.buffer[a] / 255 + V.buffer[a + 12] / 65025) * (k - g) } function ib() { b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1); Ha.sf() } function Nb() { var a = da.sa(); va.O(); b.viewport(0, 0, 3, 2 * a); G.set("s61"); V.za.h(0); P.l(!1, !1); return ba.enableAsyncReadPixels ? Y.Mb(0, 0, 3, 2 * a, V.buffer, xb, 1) : Y.$d(0, 0, 3, 2 * a, V.buffer) } function vb() {
            na !== ja.pause && (ba.isCleanGLStateAtEachIteration &&
                (G.kd(), P.reset(), P.Ba(), b.disable(b.DEPTH_TEST), b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1), G.Ja()), qa.Fc(Ob, Nb, Pb, xb, Qb, ba.animateProcessOrder))
        } function Ob() {
            va.fa(); if (!K.Ab) if (K.zb) K.element.needsUpdate && (K.K.ge(K.element.videoWidth, K.element.videoHeight), K.K.Sb(K.element.arrayBuffer), K.element.needsUpdate = !1); else { var a = K.element.currentTime, c = a - K.Lb; 0 > c && (K.Lb = a, c = 0); 1E3 * c < ea.pg || (K.Lb += c, K.K.refresh()) } a = qa.mf(); da.update(a, Ba); for (c = 0; c < a; ++c) {
                da.Qb(c); G.set("s63"); var d = Ba[da.wd()]; G.G("u45",
                    1 + Oa.Gc * (Math.cos(d.ry) - 1)); S.Ca && G.G("u44", d.rz); da.pe("u43"); Z.Ya.S(); K.K.h(0); V.za.h(1); P.l(!1, !1); Pa.U(Z.Ya)
            } qa.Qb()
        } function xb() { va.mg(); ba.isCleanGLStateAtEachIteration && (va.reset(), aa.reset(), b.enable(b.DEPTH_TEST)); S.Wb && S.Wb(da.Md() ? Ba : Ba[0]); ba.isCleanGLStateAtEachIteration && (b.disable(b.BLEND), P.reset(), P.Ba()) } function Pb() {
            for (var a = 0; a < da.sa(); ++a)if (da.Ff(a)) {
                var c = a, d = Sa[c], g = [c], k = Ba[c], p = jb[c], q = 2 * c; d.lb = Fa(1, q, 3, 0, 1); k.detected = wa.aa(k.detected, d.lb, ea.ve); d.x = Fa(0, q, 1, -1, 1); d.y =
                    Fa(0, q, 2, -1, 1); d.ca = Fa(0, q, 3, 0, 1); if (d.lb < ba.multiDetectionThresholdFactors[0] * ba.threshold) d.va = Math.floor(d.va / 2), S.Ca && (k.rz = 0, k.ry = 0); else {
                        var n = V.bb; d.rx = Fa(1, q, 0, -n[0], n[0]); d.ry = Fa(1, q, 1, -n[1], n[1]); d.ya = Fa(1, q, 2, -n[2], n[2]); for (n = 0; n < V.ba; ++n)d.rd[n] = V.Va[n](Fa(2, q, n, 0, 1)); q = d.ca * V.ce; g.dx = d.x - k.xRaw; g.dy = d.y - k.yRaw; g.ec = q - k.sRaw; g.bc = d.rx - k.rx; g.cc = d.ry - k.ry; g.dc = S.Ca ? d.ya : d.ya - k.rz; n = qa.cf(); g = (1 - $a.Fb(sa.translationFactorRange[0], sa.translationFactorRange[1], Math.sqrt(g.dx * g.dx + g.dy * g.dy +
                            g.ec * g.ec) / n)) * (1 - $a.Fb(sa.rotationFactorRange[0], sa.rotationFactorRange[1], Math.sqrt(g.bc * g.bc + g.cc * g.cc + g.dc * g.dc) / n)) * $a.Fb(sa.qualityFactorRange[0], sa.qualityFactorRange[1], d.lb); c = p[++kb[c] % p.length] = g; for (n = 0; n < p.length; ++n)c = Math.min(c, p[n]); c = Math.max(.5, c); g = Math.min(c, g); p = wa.aa(sa.alphaRange[1], sa.alphaRange[0], Math.pow(g, ea.xe)); k.xRaw = wa.aa(k.xRaw, d.x, p); k.yRaw = wa.aa(k.yRaw, d.y, p); k.sRaw = wa.aa(k.sRaw, q, p); k.rx = wa.aa(k.rx, d.rx, p); k.ry = wa.aa(k.ry, d.ry, p); k.rz = S.Ca ? k.rz + sa.followZRotAlphaFactor *
                                p * d.ya : wa.aa(k.rz, d.ya, p); c = k.sRaw * Oa.ac * Math.sin(k.ry); q = Math.sin(k.rz) * c / Qa; k.x = k.xRaw + Math.cos(k.rz) * c; k.y = k.yRaw + q; k.s = k.sRaw; p = Math.max(p, ea.we); for (c = 0; c < V.ba; ++c)k.expressions[c] = wa.aa(k.expressions[c], d.rd[c], p); ++d.va
                    }
            }
        } function Qb() { na === ja.play && Na.Fc(vb) } function yb() { Z.Ya = aa.instance({ isPot: !0, isFloat: !1, width: Pa.kf() }); var a = { width: ea.le, height: da.sa(), isFloat: !0, isPot: !1, array: da.Se(new Float32Array([0, .5, .5, 0, 0, 0, 0, 0, 0, 0, 0, 0])) }; V.za = Rb.instance(a) } function lb() {
            G.T("s63", [{
                type: "1i",
                name: "u1", value: 0
            }, { type: "1i", name: "u41", value: 1 }, { type: "2f", name: "u42", value: Z.F }, { type: "1f", name: "u43", value: .5 }, { type: "1f", name: "u44", value: 0 }]); G.T("s64", [{ type: "1i", name: "u46", value: 0 }, { type: "1i", name: "u41", value: 1 }, { type: "1f", name: "u49", value: ea.kg }, { type: "1f", name: "u50", value: ba.threshold }, { type: "3f", name: "u48", value: [V.N[0] * Z.F[0], V.N[1] * Z.F[1], V.N[2]] }, { type: "1f", name: "u43", value: .5 }, { type: "1f", name: "u51", value: 1 }, { type: "1f", name: "u44", value: 0 }]); var a = [{ type: "1i", name: "u46", value: 0 }]; G.T("s65",
                a); G.T("s66", a); G.T("s61", [{ type: "1i", name: "u41", value: 0 }, { type: "1f", name: "u54", value: Z.F[0] }, { type: "2f", name: "u53", value: [0, .5 / da.sa()] }])
        } function mb() { Z.F[0] = 1; Z.F[1] = Z.u / Z.L; Ta.A({ Jb: ba.overlapFactors, Td: ba.nScaleLevels, u: Z.u, L: Z.L, be: ba.scale0Factor, N: V.N, Hc: ba.scanCenterFirst }) } function Sb(a) { if (S.Ma) zb("string" === typeof S.Ma ? JSON.parse(S.Ma) : S.Ma, a); else { var c = S.Xc; "JSON" !== c.toUpperCase().split(".").pop() && (c += ea.neuralNetworkPath); ab.get(c, function (d) { d = JSON.parse(d); zb(d, a) }) } } function zb(a,
            c) {
                if (a.exportData) { var d = a.exportData; d.rotationEulerAnglesFactors && (V.bb = d.rotationEulerAnglesFactors); if (d.translationScalingFactors) { var g = d.translationScalingFactors, k = ba.translationScalingFactors; V.N[0] = g[0] * k[0]; V.N[1] = g[1] * k[1]; V.N[2] = g[2] * k[2] } "undefined" !== typeof d.nExpressions && (V.ba = d.nExpressions); V.ce = d.dsMean ? 1 + d.dsMean : 1; Oa.Gc = .4; Oa.ac = .7; "undefined" !== typeof d.fgScaleXFactor && (Oa.Gc = d.fgScaleXFactor); "undefined" !== typeof d.fgDisplaceXFactor && (Oa.ac = d.fgDisplaceXFactor) } V.ba || (V.ba =
                    ea.Sd); if (!V.Va) for (V.Va = [], d = 0; d < V.ba; ++d)V.Va.push(ea.Xe); c(a)
        } function Tb() { if (Ha.A({ kb: S.ha, width: Z.u, height: Z.L, debug: !1, zc: function () { Ia("GLCONTEXT_LOST") }, antialias: S.antialias, premultipliedAlpha: !0 })) return !0; Ia("GL_INCOMPATIBLE"); return !1 } function Ub() {
            var a = da.wd(), c = Ba[a]; V.za.Xf(1); b.viewport(0, a, 1, 1); G.set("s64"); S.Ca && G.G("u44", c.rz); da.pe("u43"); var d = 1, g = da.gg(Sa, Ba, Z.u / Z.L); da.Md() && (g && (d = 0, Sa[a].va = 0, c.isDetected = !1, c.detected = 0), G.G("u51", d)); G.bg("u47", Ta.get(a)); P.l(!1, !1); if (da.Ld() ||
                g) b.viewport(1, a, 1, 1), G.set("s65"), G.G("u51", d), P.l(!1, !1); da.Ld() && (b.viewport(2, a, 1, 1), G.set("s66"), P.l(!1, !1)); V.za.sync()
        } function Ab() { K.K && K.K.remove(); K.zb = K.element.isFakeVideo ? !0 : !1; if (K.zb) { var a = Bb(); a = { isFlipY: !1, array: K.element.arrayBuffer, width: a.w, height: a.Ea, isKeepArray: !0 } } else a = { H: K.element }; K.Mc = aa.instance(Object.assign({ isPot: !1, isLinear: !0, isFloat: !1 }, a)); K.K = K.Mc } function Ja() {
            var a = [{ type: "mat2", name: "u40", value: K.B }]; G.T("s62", [{ type: "1i", name: "u1", value: 0 }].concat(a)); G.T("s63",
                a)
        } function Ka() { var a = [.5, .5], c = K.F[1] / K.F[0]; Qa = Ha.W() / Ha.J(); 90 === Math.abs(pa.rotate) && (c = 1 / c); c > Qa ? a[1] *= Qa / c : a[0] *= c / Qa; G.T("s64", [{ name: "u52", type: "1f", value: Qa }]); K.B[0] = 0; K.B[1] = 0; K.B[2] = 0; K.B[3] = 0; switch (pa.rotate) { case 0: K.B[0] = a[0]; K.B[3] = a[1]; break; case 180: K.B[0] = -a[0]; K.B[3] = -a[1]; break; case 90: K.B[1] = a[0]; K.B[2] = -a[1]; break; case -90: K.B[1] = -a[0], K.B[2] = a[1] }pa.flipX && (K.B[0] *= -1, K.B[2] *= -1); K.Ab || (K.B[1] *= -1, K.B[3] *= -1) } function Bb() {
            var a = {
                w: K.element.videoWidth || K.element.width, Ea: K.element.videoHeight ||
                    K.element.height
            }; if (!a.w || !a.Ea || 4 > a.w || 4 > a.Ea) throw Error("INVALID VIDEO DIMENSIONS - width = " + a.w + " height = " + a.Ea); return a
        } function nb() { var a = Bb(), c = K.F[0] !== a.w || K.F[1] !== a.Ea; c && (K.F[0] = a.w, K.F[1] = a.Ea); return c } function bb(a, c) { if (na === ja.error) return !1; K.element = a; nb(); c && c(); return !0 } function Cb(a, c, d) {
            a && a(); K.Ra = { video: { facingMode: { exact: pa.facingMode }, width: { min: pa.minWidth, max: pa.maxWidth, ideal: pa.idealWidth }, height: { min: pa.minHeight, max: pa.maxHeight, ideal: pa.idealHeight } }, audio: !1 };
            X.Zc(K.Ra, pa.deviceId); X.get(K.element ? K.element : X.Ad(), function (g) { c && c(g); d(g) }, function () { Ia("WEBCAM_UNAVAILABLE") }, K.Ra)
        } function Ia(a) { na !== ja.error && (na = ja.error, S.Qa && S.Qa(a)) } var wa = {
            sh: function (a) { return Math.ceil(Math.log2(a)) }, Oh: function (a) { return Math.log2(a) }, Kh: function (a) { return 0 === Math.log2(a) % 1 }, Bg: function (a) { var c = [0, 0, 0, 0]; a.forEach(function (d) { c[0] += d[0]; c[1] += d[1]; c[2] += d[2]; c[3] += d[3] }); return c }, Cg: function (a, c, d) { return Math.min(Math.max(a, c), d) }, Fg: function (a) {
                return a *
                    Math.PI / 180
            }, Vh: function (a, c) { c = Math.pow(10, c); return Math.round(a * c) / c }, Wh: function (a) { return Math.round(1E6 * a) / 1E6 }, th: function (a, c) { return (100 * a / c).toFixed(3) }, aa: function (a, c, d) { return a * (1 - d) + c * d }, Ph: function (a, c) { return a[0] * (1 - c) + a[1] * c }, Re: function (a, c) { return wa.Je(a - c) }, Je: function (a) { for (; a > Math.PI;)a -= 2 * Math.PI; for (; a <= -Math.PI;)a += 2 * Math.PI; return a }, Kg: function (a, c) { return Math.abs(wa.Re(a, c)) }, qg: function (a, c) { return Math.atan2(Math.sin(a) + Math.sin(c), Math.cos(a) + Math.cos(c)) }
        }, ab =
            {
                get: function (a, c, d) { var g = new XMLHttpRequest; g.open("GET", a, !0); g.withCredentials = !1; g.onreadystatechange = function () { 4 === g.readyState && (200 === g.status || 0 === g.status ? c(g.responseText) : "undefined" !== typeof d && d(g.status)) }; g.send() }, qf: function (a) { return new Promise(function (c, d) { ab.get(a, c, d) }) }, ph: function (a, c, d) { a += d ? "?" + ab.Ve(d) : ""; ab.get(a, function (g) { c(JSON.parse(g)) }) }, Rh: function (a, c, d) {
                    var g = new XMLHttpRequest; g.open("POST", a, !0); g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    g.onreadystatechange = function () { 4 !== g.readyState || 200 !== g.status && 0 !== g.status || d(g.responseText) }; g.send(c)
                }, Ve: function (a) { return "string" === typeof a ? a : Object.keys(a).map(function (c) { return encodeURIComponent(c) + "=" + encodeURIComponent(a[c]) }).join("&") }, dh: function (a, c) { var d = new XMLHttpRequest; d.open("POST", a, !0); d.responseType = "arraybuffer"; d.onload = function () { c(d.response) }; d.send() }
            }, Vb = {
                create: function (a, c) { for (var d = Array(c), g = 0; g < c; ++g)d[g] = a; return d }, Gg: function (a, c) {
                    for (var d = 0; d < a.length; ++d)c[d] =
                        a[d]
                }, clone: function (a) { for (var c = Array(a.length), d = 0; d < a.length; ++d)c[d] = a[d]; return c }, Zh: function (a, c, d) { a.forEach(function (g, k) { c[k] = g * d }) }, hi: function (a) { for (var c = a.length - 1; 0 < c; --c) { var d = Math.floor(Math.random() * (c + 1)), g = a[c]; a[c] = a[d]; a[d] = g } }, ji: function (a) { return a.sort(function (c, d) { return c - d }) }, jg: function (a) { return Array.isArray(a) || a.constructor === Float32Array || a.constructor === Uint8Array }
            }, ob = {
                Zb: function (a, c) {
                    if (0 === c || "object" !== typeof a) return a; a = Object.assign({}, a); c = void 0 ===
                        c || -1 === c ? -1 : c - 1; for (var d in a) a[d] = ob.Zb(a[d], c); return a
                }, Jg: function (a) { return JSON.parse(JSON.stringify(a)) }
            }, $a = {
                ii: function (a, c, d) { a = Math.min(Math.max((d - a) / (c - a), 0), 1); return a * a * (3 - 2 * a) }, Fb: function (a, c, d) { return Math.min(Math.max((d - a) / (c - a), 0), 1) }, Vg: function (a, c, d, g) { return Math.pow(Math.min(Math.max((g - a) / (c - a), 0), 1), d) }, oi: function () { return 0 }, Qh: function () { return 1 }, Nh: function (a) { return a }, Sg: function (a) { return a * a }, Xg: function (a) { return a * (2 - a) }, Pg: function (a) {
                    return .5 > a ? 2 * a * a : -1 +
                        (4 - 2 * a) * a
                }, Ng: function (a) { return a * a * a }, Wg: function (a) { return --a * a * a + 1 }, Og: function (a) { return .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1 }, Tg: function (a) { return a * a * a * a }, Yg: function (a) { return 1 - --a * a * a * a }, Qg: function (a) { return .5 > a ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a }, Ug: function (a) { return a * a * a * a * a }, Zg: function (a) { return 1 + --a * a * a * a * a }, Rg: function (a) { return .5 > a ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a }
            }, Wb = {
                $e: function (a, c, d) {
                    switch (a) {
                        case "relu": return d + "=max(vec4(0.,0.,0.,0.)," + c + ");"; case "elu": return d + "=mix(exp(-abs(" +
                            c + "))-vec4(1.,1.,1.,1.)," + c + ",step(0.," + c + "));"; case "elu01": return d + "=mix(0.1*exp(-abs(" + c + "))-vec4(0.1,0.1,0.1,0.1)," + c + ",step(0.," + c + "));"; case "arctan": return d + "=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;"; case "copy": return ""; default: return !1
                    }
                }
            }, G = function () {
                function a(f, l, H) { l = f.createShader(l); f.shaderSource(l, H); f.compileShader(l); return f.getShaderParameter(l, f.COMPILE_STATUS) ? l : null } function c(f, l, H) {
                    l = a(f, f.VERTEX_SHADER, l); H = a(f, f.FRAGMENT_SHADER, H); f === b && n.push(l, H); var M =
                        f.createProgram(); f.attachShader(M, l); f.attachShader(M, H); f.linkProgram(M); return M
                } function d(f) { return ["float", "sampler2D", "int"].map(function (l) { return "precision " + f + " " + l + ";\n" }).join("") } function g(f, l) {
                    l.v = l.v ? !0 : !1; if (!l.v) {
                        l.Aa = l.Aa || "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5);}"; l.ib = l.ib || ["a0"]; l.Oa = l.Oa || [2]; l.precision = l.precision || x; l.id = y++; void 0 !== l.ee && (l.ee.forEach(function (Q, fa) { l.g = l.g.replace(Q, l.Nb[fa]) }),
                            l.ee.splice(0)); l.Tc = 0; l.Oa.forEach(function (Q) { l.Tc += 4 * Q }); var H = d(l.precision); l.xa = c(f, H + l.Aa, H + l.g); l.C = {}; l.i.forEach(function (Q) { l.C[Q] = f.getUniformLocation(l.xa, Q) }); l.attributes = {}; l.Pa = []; l.ib.forEach(function (Q) { var fa = f.getAttribLocation(l.xa, Q); l.attributes[Q] = fa; l.Pa.push(fa) }); if (l.j) { f.useProgram(l.xa); r = l; m = l.id; for (var M in l.j) f.uniform1i(l.C[M], l.j[M]) } l.ua = !0
                    }
                } function k(f) { xa.ag(N); m !== f.id && (N.P(), m = f.id, r = f, b.useProgram(f.xa), f.Pa.forEach(function (l) { 0 !== l && b.enableVertexAttribArray(l) })) }
                function p(f, l, H) { g(f, l, H); f.useProgram(l.xa); f.enableVertexAttribArray(l.attributes.a0); m = -1; return r = l } function q() { return { g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", i: ["u1"], j: { u1: 0 } } } var n = [], m = -1, r = null, y = 0, C = !1, x = "highp", B = ["u1"], w = ["u0"], D = { u1: 0 }, e = { u0: 0 }, z = { u1: 0, u2: 1 }, A = { u1: 0, u3: 1 }, h = ["u1", "u3", "u4"], F = { u5: 0 }, t = ["u6", "u7", "u8", "u9"], u = { u6: 0, u7: 1 }, I = {
                    s0: q(), s1: {
                        g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                        i: B, j: D, precision: "lowp"
                    }, s2: { g: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}", i: ["u1", "u2"], j: z }, s3: { g: "uniform sampler2D u1;uniform vec2 u10,u11;varying vec2 vv0;void main(){vec2 a=vv0*u10+u11;gl_FragColor=texture2D(u1,a);}", i: ["u1", "u10", "u11"], j: D, v: !0 }, s4: { g: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}", i: B, j: D }, s5: {
                        g: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
                        i: ["u1", "u2"], j: z
                    }, s6: { g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}", i: B, j: D }, s7: { g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}", i: B, j: D }, s8: { g: "uniform sampler2D u0;uniform float u10;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u10;}", i: ["u0", "u10"], j: e }, s9: {
                        g: "uniform sampler2D u0;uniform float u10;varying vec2 vv0;const vec4 f=vec4(.25),g=vec4(1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u10,f);gl_FragColor=b*g;}",
                        i: ["u0", "u10"], j: e
                    }, s10: { g: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}", i: B, j: D }, s11: { g: "uniform sampler2D u1,u12;uniform float u13;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u12,vv0);gl_FragColor=mix(b,a,u13*f);}", i: ["u1", "u12", "u13"], j: { u1: 0, u12: 1 } }, s12: {
                        g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u14)+texture2D(u1,vv0+u14*vec2(1.,-1.))+texture2D(u1,vv0+u14*vec2(-1.,-1.))+texture2D(u1,vv0+u14*vec2(-1.,1.)));}",
                        i: ["u1", "u14"], j: D
                    }, s13: { g: "uniform sampler2D u1;varying vec2 vv0;vec4 f(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),g=exp2(c);vec3 h=clamp(b/g,0.,1.);return vec4(h,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=f(a);}", i: B, j: D, v: !0 }, s14: { g: "uniform sampler2D u1;varying vec2 vv0;vec3 f(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=vec4(f(a),1.);}", i: B, j: D, v: !0 },
                    s15: {
                        g: "uniform sampler2D u1;uniform vec4 u15;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u15);gl_FragColor=j(a);}",
                        i: ["u1", "u15"], j: D
                    }, s16: { g: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}", i: w, j: e, v: !0 }, s17: { g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}", i: w, j: e }, s18: { g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}", i: w, j: e },
                    s19: { g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(-abs(a))-f;gl_FragColor=mix(.1*b,a,step(0.,a));}", i: w, j: e }, s20: { g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}", i: w, j: e }, s21: { g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=2.*atan(e*texture2D(u0,vv0))/e;}", i: w, j: e, v: !0 }, s22: {
                        g: "uniform sampler2D u0,u16;uniform float u17;const vec2 e=vec2(.5,.5);const float f=1e-5;const vec4 g=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u16,e);float b=u17*u17;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
                        i: ["u0", "u16", "u17"], j: { u0: 0, u16: 1 }, v: !0
                    }, s23: { g: "uniform sampler2D u1;uniform vec2 u18;varying vec2 vv0;void main(){float a=u18.x*u18.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u18.y),f=floor(u18.x*fract(b*u18.y)),g=(f*u18.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}", i: ["u1", "u18"], j: D }, s24: {
                        g: "uniform sampler2D u7,u6,u19;varying vec2 vv0;void main(){vec4 a=texture2D(u19,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u7,b),f=texture2D(u6,c);gl_FragColor=d*f;}", i: ["u7", "u6", "u19"], j: Object.assign({ u19: 2 },
                            u), v: !0
                    }, s25: { g: "uniform float u8,u9;uniform sampler2D u7,u6;varying vec2 vv0;void main(){vec2 b=fract(vv0*u8);float a=u8*u9;vec2 c=(vec2(.5)+floor(a*vv0))/a;vec4 d=texture2D(u7,c),f=texture2D(u6,b);gl_FragColor=d*f;}", i: t, j: u }, s26: {
                        g: "uniform float u8,u9;uniform vec2 u20,u21;uniform sampler2D u7,u6;varying vec2 vv0;void main(){float a=u8*u9;vec2 b=mod(vv0*u20,vec2(1.)),c=floor(vv0*u20)/u20,d=u20*u21,f=c+.5*(vec2(1.)-u21)/u20,g=f+fract(b*u8)/d,h=(vec2(.5)+floor(a*b))/a;vec4 i=texture2D(u7,h),j=texture2D(u6,g);gl_FragColor=i*j;}",
                        i: ["u20", "u21"].concat(t), j: u, v: !0
                    }, s27: {
                        g: "uniform float u8,u9;uniform sampler2D u7,u6,u22,u23,u24,u25;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 c=fract(vv0*u8),d=vv0;float h=u8*u9;d=(.5+floor(h*vv0))/h;vec4 l=texture2D(u7,d),m=texture2D(u6,c),a=texture2D(u25,d);a=floor(.5+a*255.);vec4 n=texture2D(u22,c),o=texture2D(u23,c),p=texture2D(u24,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b,r=i*m+j*n+k*o+q*p;gl_FragColor=l*r;}",
                        i: ["u25", "u22", "u23", "u24"].concat(t), j: Object.assign({ u25: 3, u22: 4, u23: 5, u24: 6 }, u), v: !0
                    }, s28: {
                        g: "uniform sampler2D u7,u6,u3;uniform float u8,u26,u27,u9;uniform vec2 u28;varying vec2 vv0;const vec2 f=vec2(1.),l=vec2(0.);void main(){vec2 c=floor(u26*vv0),d=u26*vv0-c;float g=u8/u26;vec2 h=floor(d*g),i=d*g-h,j=(c+i)/u26;float m=u26*u9/u8;vec2 b=m*h;b=floor(u28*b+.5*(u9-1.)*(f-u28));vec2 a=(b+i*u27)/u9;a+=.25/u9;vec2 k=step(a,f)*step(l,a);vec4 n=texture2D(u7,j),o=texture2D(u6,a),p=n*o,q=texture2D(u3,j);gl_FragColor=(p*u27*u27+q)*k.x*k.y;}",
                        i: ["u26", "u27", "u3", "u28"].concat(t), j: Object.assign({ u3: 2 }, u)
                    }, s29: { g: "uniform sampler2D u7,u6;varying vec2 vv0;void main(){vec4 a=texture2D(u7,vv0),b=texture2D(u6,vv0);gl_FragColor=a*b;}", i: ["u7", "u6"], j: u, v: !0 }, s30: { g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0)+u4*texture2D(u1,vv0);}", i: h, j: A }, s31: {
                        g: "uniform sampler2D u1,u3;uniform vec2 u20;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0*u20)+u4*texture2D(u1,vv0);}",
                        i: ["u20"].concat(h), j: A, v: !0
                    }, s32: { g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}", i: h, j: A, v: !0 }, s33: {
                        g: "uniform sampler2D u1,u3;uniform vec2 u20;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0*u20)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
                        i: ["u20"].concat(h), j: A, v: !0
                    }, s34: { g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 h=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 b=floor(gl_FragCoord.xy);vec3 d=b.x*vec3(1.)+vec3(0.,1.,2.);float c=mod(b.y,2.);vec4 f=vec4(c,(1.-c)*step(mod(d,vec3(3.)),vec3(.5)));mat4 g=mat4(a.rgba,a.gbar,a.barg,a.argb);gl_FragColor=g*f;}", i: h, j: A, v: !0 }, s35: {
                        g: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
                        i: B, j: D, precision: "lowp"
                    }, s36: { g: "varying vec2 vv0;uniform sampler2D u1;uniform float u29;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u29)).rgb,c=texture2D(u1,vv0+vec2(u29,u29)).rgb,d=texture2D(u1,vv0+vec2(u29,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}", i: ["u1", "u29"], j: D, precision: "lowp" }, s37: {
                        g: "varying vec2 vv0;uniform sampler2D u1;uniform float u29;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u29)).rgb,c=texture2D(u1,vv0+vec2(u29,u29)).rgb,d=texture2D(u1,vv0+vec2(u29,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                        i: ["u1", "u29"], j: D, precision: "lowp"
                    }, s38: {
                        g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u30;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u30,vv0.y-u30))*1.,a-=texture2D(u1,vec2(vv0.x-u30,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u30,vv0.y+u30))*1.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y-u30))*1.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u30,vv0.y+u30))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u30,vv0.y-u30))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u30))*2.,b-=texture2D(u1,vec2(vv0.x+u30,vv0.y-u30))*1.,b+=texture2D(u1,vec2(vv0.x-u30,vv0.y+u30))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u30))*2.,b+=texture2D(u1,vec2(vv0.x+u30,vv0.y+u30))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
                        i: ["u1", "u2", "u30"], j: z, v: !0
                    }, s39: { g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u30;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u30,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}", i: ["u1", "u2", "u30"], j: z, v: !0 }, s40: {
                        g: "uniform sampler2D u5;uniform vec2 u14;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 g=vec2(.5,.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=vv0-u14*g;vec4 b=texture2D(u5,a),c=texture2D(u5,a+u14*h),d=texture2D(u5,a+u14*i),j=texture2D(u5,a+u14),k=e(b,c),l=e(d,j);gl_FragColor=e(k,l);}",
                        i: ["u5", "u14"], j: F
                    }, s41: {
                        g: "uniform sampler2D u5;uniform vec2 u14;varying vec2 vv0;const vec2 k=vec2(1.,0.),l=vec2(0.,1.),m=vec2(2.,0.),n=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u5,a),c=texture2D(u5,a+u14*k),d=texture2D(u5,a+u14*l),g=texture2D(u5,a+u14),h=e(b,c),i=e(d,g);return e(h,i);}void main(){vec2 a=vv0+u14*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u14*m),d=f(a+u14*2.),g=f(a+u14*n),h=e(b,c),i=e(d,g);gl_FragColor=e(h,i);}", i: ["u5", "u14"],
                        j: F, v: !0
                    }, s42: { g: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}", i: ["u1"], j: D, precision: "lowp", v: !0 }, s43: {
                        g: "uniform sampler2D u1;uniform vec2 u14;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u14)+2002./e*texture2D(u1,vv0-2.*u14)+3003./e*texture2D(u1,vv0-u14)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u14)+2002./e*texture2D(u1,vv0+2.*u14)+1001./e*texture2D(u1,vv0+3.*u14);gl_FragColor=a;}", i: ["u14", "u1"],
                        j: D, precision: "lowp", v: !0
                    }, s44: { g: "uniform sampler2D u1,u16,u31;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u16,vv0),b=texture2D(u31,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}", i: ["u1", "u16", "u31"], j: { u1: 0, u16: 1, u31: 2 }, v: !0 }
                }, L = {
                    s45: {
                        g: "uniform float u8,u32;uniform sampler2D u7,u6,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-5,1e-5);void main(){vec4 sum=texture2D(u3,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u8,xyTo=floor(vv0*u8+eps2);float weightSize=toSparsity*u8;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u32*(xyPatch-halfFromSparsity))/u8,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u7,uvWeight)*texture2D(u6,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        i: ["u8", "u7", "u6", "u3", "u32"], Nb: ["1.1111", "gl_FragColor\\*=2.2222;"]
                    }, s46: {
                        g: "uniform float u8,u32,u9;uniform sampler2D u7,u6,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.,0.),ONE2=vec2(1.,1.),HALF2=vec2(.5,.5),EPS2=vec2(1e-4,1e-4);void main(){vec4 sum=texture2D(u3,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u9,xyTo=floor(vv0*u8+eps2);float weightSize=fromSparsity*u9;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u8;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u32*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u9,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u7,uvWeight)*texture2D(u6,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                        i: "u8 u9 u7 u6 u3 u32".split(" "), Nb: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
                    }
                }, v = null, O = null, N = {
                    Cb: function () { return C }, A: function () { if (!C) { v = ob.Zb(I, 2); O = ob.Zb(L, 2); x = "highp"; b.getShaderPrecisionFormat && (b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.MEDIUM_FLOAT), b.getShaderPrecisionFormat(b.FRAGMENT_SHADER, b.LOW_FLOAT)); for (var f in v) g(b, v[f], f); G.set("s0"); b.enableVertexAttribArray(0); C = !0 } }, fb: function (f) { f.forEach(function (l) { N.$c(l) }) }, $c: function (f) { v[f.id] = f; g(b, f, f.id) }, uf: function (f,
                        l, H) { l || (l = f); v[l] = Object.create(O[f]); v[l].zf = !0; O[f].Nb && O[f].Nb.forEach(function (M, Q) { v[l].g = v[l].g.replace(new RegExp(M, "g"), H[Q]) }); g(b, v[l], l) }, set: function (f) { var l = v[f]; l.v && (l.v = !1, g(b, l, f)); k(l) }, cb: function (f) { return p(f, q(), "s47") }, Kc: function (f) { return p(f, { g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}", i: [], precision: x }, "s48") }, We: function (f) { return "undefined" === typeof v[f] ? !1 : v[f].ua }, P: function () { -1 !== m && (m = -1, r.Pa.forEach(function (f) { 0 !== f && b.disableVertexAttribArray(f) })) }, Lc: function () {
                            var f =
                                0; r.Pa.forEach(function (l, H) { H = r.Oa[H]; b.vertexAttribPointer(l, H, b.FLOAT, !1, r.Tc, f); f += 4 * H })
                        }, kd: function () { b.enableVertexAttribArray(0) }, Ja: function () { N.Ob(b) }, Ob: function (f) { f.vertexAttribPointer(r.Pa[0], 2, f.FLOAT, !1, 8, 0) }, ci: function (f, l) { b.uniform1i(r.C[f], l) }, G: function (f, l) { b.uniform1f(r.C[f], l) }, V: function (f, l, H) { b.uniform2f(r.C[f], l, H) }, ie: function (f, l) { b.uniform2fv(r.C[f], l) }, bg: function (f, l) { b.uniform3fv(r.C[f], l) }, di: function (f, l, H, M) { b.uniform3f(r.C[f], l, H, M) }, cg: function (f, l, H, M, Q) {
                            b.uniform4f(r.C[f],
                                l, H, M, Q)
                        }, je: function (f, l) { b.uniform4fv(r.C[f], l) }, ei: function (f, l) { b.uniformMatrix2fv(r.C[f], !1, l) }, fi: function (f, l) { b.uniformMatrix3fv(r.C[f], !1, l) }, gi: function (f, l) { b.uniformMatrix4fv(r.C[f], !1, l) }, T: function (f, l) {
                            N.set(f); l.forEach(function (H) {
                                switch (H.type) {
                                    case "4f": b.uniform4fv(r.C[H.name], H.value); break; case "3f": b.uniform3fv(r.C[H.name], H.value); break; case "2f": b.uniform2fv(r.C[H.name], H.value); break; case "1f": b.uniform1f(r.C[H.name], H.value); break; case "1i": b.uniform1i(r.C[H.name], H.value);
                                        break; case "mat2": b.uniformMatrix2fv(r.C[H.name], !1, H.value); break; case "mat3": b.uniformMatrix3fv(r.C[H.name], !1, H.value); break; case "mat4": b.uniformMatrix4fv(r.C[H.name], !1, H.value)
                                }
                            })
                        }, rh: function () { return "lowp" }, m: function () { N.P(); b.disableVertexAttribArray(0); for (var f in v) { var l = v[f]; l.ua && (l.ua = !1, b.deleteProgram(l.xa)); l.zf && delete v[f] } n.forEach(function (H) { b.deleteShader(H) }); n.splice(0); y = 0; C = !1; r = null; m = -1 }
                }; return N
            }(), b = null, Ha = function () {
                function a(w) {
                    console.log("ERROR in ContextFF: ",
                        w); return !1
                } function c() { return navigator.userAgent && -1 !== navigator.userAgent.indexOf("forceWebGL1") } function d(w, D, e) { w.setAttribute("width", D); w.setAttribute("height", e) } function g(w) { function D() { Ca.m(); Y.reset(); z.getExtension("WEBGL_lose_context").loseContext() } if (c()) return !1; var e = document.createElement("canvas"); d(e, 5, 5); var z = null; try { z = e.getContext("webgl2", w) } catch (A) { return !1 } if (!z) return !1; k(z); Y.ld(z); w = Y.$b(z); if (!w.ka && !w.ma) return D(), !1; w = Ca.ad(z, w); D(); return w ? !0 : !1 } function k(w) {
                    w.clearColor(0,
                        0, 0, 0); w.disable(w.DEPTH_TEST); w.disable(w.BLEND); w.disable(w.DITHER); w.disable(w.STENCIL_TEST); w.disable(w.CULL_FACE); w.GENERATE_MIPMAP_HINT && w.FASTEST && w.hint(w.GENERATE_MIPMAP_HINT, w.FASTEST); w.disable(w.SAMPLE_ALPHA_TO_COVERAGE); w.disable(w.SAMPLE_COVERAGE); w.depthFunc(w.LEQUAL); w.clearDepth(1)
                } var p = null, q = null, n = null, m = null, r = !0, y = null, C = null, x = [], B = {
                    J: function () { return p.width }, W: function () { return p.height }, ih: function () { return p }, gh: function () { return b }, na: function () { return r }, flush: function () { b.flush() },
                    sf: function () { va.fa(); B.Vf() }, Vf: function () { aa.reset(); P.reset(); G.P(); G.kd(); b.disable(b.DEPTH_TEST); b.disable(b.BLEND); P.Ba(); G.Ja() }, bf: function () { y || (y = new Uint8Array(p.width * p.height * 4)); b.readPixels(0, 0, p.width, p.height, b.RGBA, b.UNSIGNED_BYTE, y); return y }, kh: function () { return p.toDataURL("image/jpeg") }, lh: function () {
                        va.O(); q || (q = document.createElement("canvas"), n = q.getContext("2d")); d(q, p.width, p.height); for (var w = B.bf(), D = n.createImageData(q.width, q.height), e = q.width, z = q.height, A = D.data, h =
                            0; h < z; ++h)for (var F = z - h - 1, t = 0; t < e; ++t) { var u = 4 * (h * e + t), I = 4 * (F * e + t); A[u] = w[I]; A[u + 1] = w[I + 1]; A[u + 2] = w[I + 2]; A[u + 3] = w[I + 3] } n.putImageData(D, 0, 0); return q.toDataURL("image/png")
                    }, jh: function (w) { !q && w && (q = document.createElement("canvas"), n = q.getContext("2d")); var D = w ? q : document.createElement("canvas"); d(D, p.width, p.height); (w ? n : D.getContext("2d")).drawImage(p, 0, 0); return D }, A: function (w) {
                        w = Object.assign({
                            la: null, zc: null, kb: null, fd: null, width: 512, height: 512, premultipliedAlpha: !1, xf: !0, antialias: !1, debug: !1,
                            Ig: !1
                        }, w); w.la ? (b = w.la, p = w.la.canvas) : w.fd && !w.kb ? p = document.getElementById(w.fd) : w.kb && (p = w.kb); p || (p = document.createElement("canvas")); p.width = w.width; p.height = w.height; if (b) r = b instanceof WebGL2RenderingContext; else {
                            r = !0; var D = { antialias: w.antialias, alpha: !0, preserveDrawingBuffer: !0, premultipliedAlpha: w.premultipliedAlpha, stencil: !1, depth: w.xf, failIfMajorPerformanceCaveat: !0, powerPreference: "high-performance" }; navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("noAntialiasing") &&
                                (D.antialias = !1); var e = g(D); e || !D.antialias || c() || (D.antialias = !1, e = g(D)); e && (b = p.getContext("webgl2", D)); b ? r = !0 : ((b = p.getContext("webgl", D)) || (b = p.getContext("experimental-webgl", D)), r = !1)
                        } if (!b) return a("WebGL1 and 2 are not enabled"); w.zc && p.addEventListener && (m = b.getExtension("WEBGL_lose_context")) && (C = w.zc, p.addEventListener("webglcontextlost", C, !1)); if (!Y.A()) return a("Not enough GL capabilities"); k(b); G.A(); P.A(); Ca.ad(b, Y.af()); x.forEach(function (z) { z(b) }); x.splice(0); return !0
                    }, wg: function () {
                        return new Promise(function (w) {
                            b ?
                                w(b) : x.push(w)
                        })
                    }, m: function () { b && (Y.m(), G.m(), Ca.m()); m && C && (p.removeEventListener("webglcontextlost", C, !1), m = C = null); b = y = n = q = p = null; x.splice(0) }
                }; return B
            }(), xa = function () {
                function a() { null === c && ("undefined" !== typeof G ? c = G : "undefined" !== typeof JEShaders && (c = JEShaders)) } var c = null; return {
                    reset: function () { c = null }, ag: function (d) { c !== d && (c && c.P(), c = d) }, Cb: function () { return c.Cb() }, Ja: function () { return c.Ja() }, Ob: function (d) { return c.Ob(d) }, Lc: function () { return c.Lc() }, P: function () { return c.P() }, set: function (d) {
                        a();
                        return c.set(d)
                    }, cb: function (d) { a(); return c.cb(d) }, Kc: function (d) { a(); return c.Kc(d) }
                }
            }(), Aa = function () {
                function a(f) { b.bindTexture(b.TEXTURE_2D, f) } function c(f) { L[0] = f; f = v[0]; var l = f >> 16 & 32768, H = f >> 12 & 2047, M = f >> 23 & 255; return 103 > M ? l : 142 < M ? l | 31744 | ((255 == M ? 0 : 1) && f & 8388607) : 113 > M ? (H |= 2048, l | (H >> 114 - M) + (H >> 113 - M & 1)) : l = (l | M - 112 << 10 | H >> 1) + (H & 1) } function d(f) { var l = new Uint16Array(f.length); f.forEach(function (H, M) { l[M] = c(H) }); return l } function g() {
                    if (null !== O.nc) return O.nc; var f = p(d([.5, .5, .5, .5]), !0);
                    return null === f ? !0 : O.nc = f
                } function k() { if (null !== O.oc) return O.oc; var f = p(new Uint8Array([127, 127, 127, 127]), !1); return null === f ? !0 : O.oc = f } function p(f, l) {
                    if (!xa.Cb() || !D) return null; var H = null, M = Math.sqrt(f.length / 4); try { var Q = b.getError(); if ("FUCKING_BIG_ERROR" === Q) return !1; H = N.instance({ isFloat: !1, R: l, array: f, width: M }); Q = b.getError(); if (Q !== b.NO_ERROR) return !1 } catch (fa) { return !1 } oa.O(); b.viewport(0, 0, M, M); b.clearColor(0, 0, 0, 0); b.clear(b.COLOR_BUFFER_BIT); xa.set("s0"); H.jb(0); ma.l(!0, !0); f = 4 * M * M;
                    l = new Uint8Array(f); b.readPixels(0, 0, M, M, b.RGBA, b.UNSIGNED_BYTE, l); M = !0; for (Q = 0; Q < f; ++Q)M = M && 3 > Math.abs(l[Q] - 127); H.remove(); oa.fa(); return M
                } var q = 0, n = null, m = 0, r = null, y = null, C = null, x = null, B = null, w = null, D = !1, e = [], z = { isFloat: !1, isPot: !0, isLinear: !1, isMipmap: !1, isAnisotropicFiltering: !1, isMirrorX: !1, isMirrorY: !1, isSrgb: !1, isKeepArray: !1, isFlipY: null, width: 0, height: 0, url: null, array: null, data: null, H: null, mc: null, yf: !1, R: !1, D: null, Gb: 4, uc: 0 }, A = !1, h = null, F = null, t = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
                    u = !1, I = !1, L = new Float32Array(1), v = new Int32Array(L.buffer), O = { nc: null, oc: null }, N = {
                        A: function () { D || (B = [b.RGBA, null, b.RGBA, b.RGBA], w = [b.RGBA, null, b.RGBA, b.RGBA], n = [b.TEXTURE0, b.TEXTURE1, b.TEXTURE2, b.TEXTURE3, b.TEXTURE4, b.TEXTURE5, b.TEXTURE6, b.TEXTURE7], u = "undefined" !== typeof JEContext, I = "undefined" !== typeof Y, u && JEContext.Lh() && n.push(b.TEXTURE8, b.TEXTURE9), r = [-1, -1, -1, -1, -1, -1, -1, -1], x = [b.UNSIGNED_BYTE, b.FLOAT, b.FLOAT], D = !0) }, tf: function () {
                            if (!y) {
                                for (var f = new Float32Array(16384), l = 0; 16384 > l; ++l)f[l] =
                                    2 * Math.random() - 1; y = { random: N.instance({ isFloat: !0, isPot: !0, array: f, width: 64 }), se: N.instance({ isFloat: !1, isPot: !0, width: 1, array: new Uint8Array([0, 0, 0, 0]) }) }
                            } N.og()
                        }, he: function (f) { b.framebufferTexture2D(oa.kc(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, f, 0) }, Ah: function () { return y.se }, og: function () { x[1] = Y.jc(b) }, Zf: function () { w = B = [b.RGBA, b.RGBA, b.RGBA, b.RGBA] }, ae: function (f) { G.set("s1"); oa.O(); var l = f.J(), H = f.W(); b.viewport(0, 0, l, H); f.h(0); ma.l(!1, !1) }, Th: function (f, l) {
                            N.ae(f); b.readPixels(0, 0, f.J(), f.W(),
                                b.RGBA, b.UNSIGNED_BYTE, l)
                        }, Uh: function (f, l) { N.ae(f); return Y.Mb(0, 0, f.J(), f.W(), l) }, td: function (f, l, H, M, Q, fa, ta) {
                            f.activeTexture(f.TEXTURE0); var Da = f.createTexture(); f.bindTexture(f.TEXTURE_2D, Da); Q = Q instanceof Float32Array ? Q : new Float32Array(Q); f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_S, f.CLAMP_TO_EDGE); f.texParameteri(f.TEXTURE_2D, f.TEXTURE_WRAP_T, f.CLAMP_TO_EDGE); f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MAG_FILTER, f.NEAREST); f.texParameteri(f.TEXTURE_2D, f.TEXTURE_MIN_FILTER, f.NEAREST); f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL,
                                fa); f.texImage2D(f.TEXTURE_2D, 0, f.RGBA, H, M, 0, f.RGBA, f.FLOAT, Q); f.bindTexture(f.TEXTURE_2D, null); f.pixelStorei(f.UNPACK_FLIP_Y_WEBGL, !1); ta && (oa.fa(), G.cb(f)); f.viewport(0, 0, H, M); f.framebufferTexture2D(f.FRAMEBUFFER, f.COLOR_ATTACHMENT0, f.TEXTURE_2D, l, 0); f.bindTexture(f.TEXTURE_2D, Da); ta ? ma.l(!0, !0) : P.rb(f); f.deleteTexture(Da); D && (r[0] = -1, C = null, q = 0)
                        }, Vb: function (f) { f !== q && (b.activeTexture(n[f]), q = f) }, instance: function (f) {
                            var l; function H() {
                                T = void 0 !== E.H.videoWidth ? E.H.videoWidth : E.H.width; U = void 0 !==
                                    E.H.videoHeight ? E.H.videoHeight : E.H.height
                            } function M(J) { var R = b.getError(); if ("FUCKING_BIG_ERROR" === R) return !1; b.texImage2D(b.TEXTURE_2D, 0, ka, ha, ia, J); R = b.getError(); R !== b.NO_ERROR && ha !== b.RGBA && (ha = b.RGBA, b.texImage2D(b.TEXTURE_2D, 0, ka, ha, ia, J)); return !0 } function Q() {
                                if (!Db) {
                                    a(ra); za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, za); E.isPot ? (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, E.isMirrorX ? b.MIRRORED_REPEAT : b.REPEAT), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, E.isMirrorY ? b.MIRRORED_REPEAT : b.REPEAT)) :
                                        (b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE)); E.isAnisotropicFiltering && "undefined" !== typeof JESETTINGS && b.texParameterf(b.TEXTURE_2D, JEContext.mh().TEXTURE_MAX_ANISOTROPY_EXT, JESETTINGS.sg); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, E.isLinear ? b.LINEAR : b.NEAREST); E.isLinear ? b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, E.isMipmap && !La ? b.NEAREST_MIPMAP_LINEAR : b.LINEAR) : b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER,
                                            E.isMipmap && !La ? b.NEAREST_MIPMAP_NEAREST : b.NEAREST); ha = B[E.Gb - 1]; ka = w[E.Gb - 1]; ia = x[pb]; if (Y.na()) { var J = Y.df(); ha === b.RGBA && ia === b.FLOAT ? E.isMipmap || E.isLinear ? ka = Ca.ff(b) : Y.bd() ? J && (ka = J) : ka = b.RGBA16F || b.RGBA : ha === b.RGB && ia === b.FLOAT && J && (ka = J, ha = b.RGBA) } if (E.R && !E.isFloat || E.isFloat && E.isMipmap && Ca.Df()) ka = Y.ef(), ia = Y.jc(b); E.uc && (cb = E.uc); E.isSrgb && 4 === E.Gb && (ha = JEContext.yh()); if (E.H) M(E.H); else if (E.url) M(Ga); else if (ua) {
                                                J = ua; try {
                                                    "FUCKING_BIG_ERROR" !== b.getError() && (b.texImage2D(b.TEXTURE_2D,
                                                        0, ka, T, U, 0, ha, ia, J), b.getError() !== b.NO_ERROR && (b.texImage2D(b.TEXTURE_2D, 0, ka, T, U, 0, ha, ia, null), b.getError() !== b.NO_ERROR && b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, T, U, 0, b.RGBA, b.UNSIGNED_BYTE, null)))
                                                } catch (jc) { b.texImage2D(b.TEXTURE_2D, 0, ka, T, U, 0, ha, ia, null) } E.isKeepArray || (ua = null)
                                            } else J = b.getError(), "FUCKING_BIG_ERROR" !== J && (b.texImage2D(b.TEXTURE_2D, 0, ka, T, U, 0, ha, ia, null), J = b.getError(), J !== b.NO_ERROR && (ha = b.RGBA, E.R && ia !== b.FLOAT && (ia = b.FLOAT, b.texImage2D(b.TEXTURE_2D, 0, ka, T, U, 0, ha, ia, null)))); if (E.isMipmap) if (!La &&
                                                ca) ca.ic(), db = !0; else if (La) { J = Math.log2(Math.min(T, U)); Ra = Array(1 + J); Ra[0] = ra; for (var R = 1; R <= J; ++R) { var la = Math.pow(2, R), W = T / la; la = U / la; var Ma = b.createTexture(); a(Ma); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST); b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST); b.texImage2D(b.TEXTURE_2D, 0, ka, W, la, 0, ha, ia, null); a(null); Ra[R] = Ma } db = !0 } a(null); r[q] = -1; za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1); Ua = !0; E.D && ca && (E.D(ca), E.D = null)
                                }
                            } function fa() {
                                for (var J = T * U, R = 2 * J, la = 3 * J, W =
                                    0; W < J; ++W)ya[0][W] = Va[W], ya[1][W] = Va[W + J], ya[2][W] = Va[W + R], ya[3][W] = Va[W + la]
                            } function ta() { var J = T * U * 4; Ea = [new Uint8Array(J), new Uint8Array(J), new Uint8Array(J), new Uint8Array(J)]; ya = [new Float32Array(Ea[0].buffer), new Float32Array(Ea[1].buffer), new Float32Array(Ea[2].buffer), new Float32Array(Ea[3].buffer)]; eb = new Uint8Array(4 * J); Va = new Float32Array(eb.buffer); Wa = !0 } function Da() { l = new Uint8Array(T * U * 4); Eb = new Float32Array(l.buffer); qb = !0 } var E = Object.assign({}, z, f), Xa = m++; null === E.isFlipY && (E.isFlipY =
                                E.url ? !0 : !1); E.data && (E.array = "string" === typeof E.data ? Mb(E.data) : E.isFloat ? new Float32Array(E.data) : new Uint8Array(E.data), E.isFlipY = !1); var pb = 0, Fb = E.H ? !0 : !1, Ya = null, rb = null, Gb = !1; E.R = E.R || E.isFloat; E.R && (pb = 1); !E.yf && E.isFloat && I && !Y.bd() && (E.isFloat = !1); E.isFloat && (pb = 2); E.isAnisotropicFiltering && u && !JEContext.Eh() && (E.isAnisotropicFiltering = !1); var ra = E.mc || b.createTexture(), Ga = null, ua = !1, T = 0, U = 0, Ua = !1, Db = !1, Wa = !1, ya = null, Ea = null, eb = null, Va = null, ka = null, ha = null, ia = null, za = E.isFlipY, Xb = (f = E.R &&
                                    E.isMipmap) && Ca.Ee(), La = f && !Xb ? !0 : !1, Ra = null, cb = -1, Hb = -1, db = !1; var qb = !1; var Eb = l = null; E.width && (T = E.width, U = E.height ? E.height : T); var ca = {
                                        get: function () { return ra }, J: function () { return T }, W: function () { return U }, Bh: function () { return E.url }, Fh: function () { return E.isFloat }, Hh: function () { return E.R }, ai: function (J) { ra = J }, Ih: function () { return E.isLinear }, ic: function () { b.generateMipmap(b.TEXTURE_2D) }, Be: function (J, R) { La ? (J || (J = ca.xd()), N.Vb(R), a(Ra[J]), r[R] = -1) : ca.h(R) }, xd: function () {
                                            -1 === cb && (cb = Math.log(T) /
                                                Math.log(2)); return cb
                                        }, Ze: function (J) { J || (J = ca.xd()); if (La) { G.set("s12"); N.Vb(0); for (var R = T, la = U, W = 1; W <= J; ++W)R /= 2, la /= 2, G.V("u14", .25 / R, .25 / la), b.viewport(0, 0, R, la), a(Ra[W - 1]), b.framebufferTexture2D(oa.kc(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, Ra[W], 0), ma.l(!1, 1 === W); r[0] = -1 } else J !== Hb && (Hb = J, b.TEXTURE_MAX_LEVEL && b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAX_LEVEL, J)), ca.ic() }, bi: function (J) { (Fb = !Vb.jg(J)) ? (ua = null, E.H = J, H()) : ua = J }, h: function (J) {
                                            if (!Ua) return !1; N.Vb(J); if (r[J] === Xa) return !1; a(ra); r[J] =
                                                Xa; return !0
                                        }, jb: function (J) { b.activeTexture(n[J]); q = J; a(ra); r[J] = Xa }, o: function () { C = ca; N.he(ra) }, S: function () { b.viewport(0, 0, T, U); C = ca; N.he(ra) }, Rc: N.Rc, ge: function (J, R) { T = J; U = R }, resize: function (J, R) { ca.ge(J, R); Q() }, clone: function (J) { J = N.instance({ width: T, height: U, R: E.R, isFloat: E.isFloat, isLinear: E.isLinear, isMirrorY: E.isMirrorY, isFlipY: J ? !za : za, isPot: E.isPot }); xa.set("s0"); oa.fa(); J.S(); ca.h(0); ma.l(!0, !0); return J }, dg: function () { b.viewport(0, 0, T, U) }, remove: function () {
                                            b.deleteTexture(ra); Db = !0; e.splice(e.indexOf(ca),
                                                1); ca = null
                                        }, refresh: function () { ca.jb(0); za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0); Fb ? b.texImage2D(b.TEXTURE_2D, 0, ka, ha, ia, E.H) : b.texImage2D(b.TEXTURE_2D, 0, ka, T, U, 0, ha, ia, ua); za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1) }, Zd: function () { Wa || ta(); b.readPixels(0, 0, T, 4 * U, b.RGBA, b.UNSIGNED_BYTE, eb); fa(); return ya }, Sf: function () { Wa || ta(); return Y.Mb(0, 0, T, 4 * U, eb).then(function () { fa(); return ya }) }, Uf: function () { qb || Da(); b.readPixels(0, 0, T, U, b.RGBA, b.UNSIGNED_BYTE, l); return Eb }, Tf: function () {
                                            qb || Da(); return Y.Mb(0,
                                                0, T, U, l)
                                        }, gd: function (J) { oa.O(); G.set("s15"); ca.h(0); if (J) b.viewport(0, 0, T, U), G.cg("u15", .25, .25, .25, .25), ma.l(!1, !0); else for (J = 0; 4 > J; ++J)b.viewport(0, U * J, T, U), G.je("u15", t[J]), ma.l(!1, 0 === J) }, Sb: function (J) {
                                            var R = ia === x[0] && !k(); a(ra); za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0); R ? (Gb || (Ya = document.createElement("canvas"), Ya.width = T, Ya.height = U, rb = Ya.getContext("2d"), rb.createImageData(T, U), Gb = !0), null.data.set(J), rb.putImageData(null, 0, 0), b.texImage2D(b.TEXTURE_2D, 0, ka, ha, ia, Ya)) : b.texImage2D(b.TEXTURE_2D,
                                                0, ka, T, U, 0, ha, ia, J); r[q] = Xa; za && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1)
                                        }, ni: function (J, R) { a(ra); R && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !0); b.texImage2D(b.TEXTURE_2D, 0, ka, ha, ia, J); r[q] = Xa; R && b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !1) }, $h: function (J, R) {
                                            var la = T * U, W = 4 * la; J = E.R ? J ? "RGBE" : "JSON" : "RGBA"; R && (J = R); R = Y.na() && !1; var Ma = null; switch (J) { case "RGBE": Ma = "s13"; break; case "JSON": Ma = R ? "s0" : "s15"; break; case "RGBA": case "RGBAARRAY": Ma = "s7" }Wa || ("RGBA" === J || "RGBE" === J || "RGBAARRAY" === J ? (Ea = new Uint8Array(W),
                                                Wa = !0) : "JSON" !== J || R || ta()); oa.O(); G.set(Ma); ca.h(0); W = null; if ("RGBA" === J || "RGBE" === J || "RGBAARRAY" === J) { b.viewport(0, 0, T, U); ma.l(!0, !0); b.readPixels(0, 0, T, U, b.RGBA, b.UNSIGNED_BYTE, Ea); if ("RGBAARRAY" === J) return { data: Ea }; A || (h = document.createElement("canvas"), F = h.getContext("2d"), A = !0); h.width = T; h.height = U; la = F.createImageData(T, U); la.data.set(Ea); F.putImageData(la, 0, 0); W = h.toDataURL("image/png") } else if ("JSON" === J) if (R) W = new Float32Array(la), b.viewport(0, 0, T, U), ma.l(!0, !0), b.readPixels(0, 0, T, U, b.RGBA,
                                                    b.FLOAT, W); else { for (W = 0; 4 > W; ++W)b.viewport(0, U * W, T, U), G.je("u15", t[W]), ma.l(!W, !W); ca.Zd(); W = Array(la); for (R = 0; R < la; ++R)W[4 * R] = ya[0][R], W[4 * R + 1] = ya[1][R], W[4 * R + 2] = ya[2][R], W[4 * R + 3] = ya[3][R] } return { format: J, data: W, width: T, height: U, isMirrorY: E.isMirrorY, isFlipY: "RGBA" === J ? E.isFlipY : !E.isFlipY }
                                        }
                                    }; E.isMipmap && !La && Ua && !db && (ca.ic(), db = !0); if (E.url) a(ra), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null), Ga = new Image, Ga.Hg = "Anonymous", Ga.crossOrigin = "Anonymous", Ga.src = E.url, Ga.onload =
                                        function () { T = Ga.width; U = Ga.height; Q() }; else if (E.H) { var Ib = function () { H(); T ? Q() : setTimeout(Ib, 1) }; Ib() } else E.array ? (E.R && !E.isFloat ? E.array instanceof Uint16Array ? (ua = E.array, Q()) : g() ? (ua = d(E.array), Q()) : (Q(), N.td(b, ra, ca.J(), ca.W(), E.array, za, !0)) : (ua = E.isFloat ? E.array instanceof Float32Array ? E.array : new Float32Array(E.array) : E.array instanceof Uint8Array ? E.array : new Uint8Array(E.array), Q()), E.isKeepArray || (ua && ua !== E.array && (ua = null), delete E.array)) : E.mc ? Ua = !0 : Q(); ca.wh = ca.J; E.D && Ua && (E.D(ca),
                                            E.D = null); e.push(ca); return ca
                        }, O: function (f) { f !== q && (b.activeTexture(n[f]), q = f); r[f] = -1; a(null) }, vg: function (f) { y.random.h(f) }, Rc: function () { C = null; b.framebufferTexture2D(oa.kc(), b.COLOR_ATTACHMENT0, b.TEXTURE_2D, null, 0) }, reset: function () { 0 !== q && b.activeTexture(n[0]); for (var f = 0; f < n.length; ++f)r[f] = -1; q = -1 }, Xh: function () { q = -1 }, lg: function () { for (var f = 0; f < n.length; ++f)N.O(f) }, ud: function () { y && (y.random.remove(), y.se.remove()) }, mi: function (f, l) {
                            if ("RGBA" === f.format || "RGBE" === f.format) {
                                var H = new Image;
                                H.src = f.data; H.onload = function () { N.instance({ isMirrorY: f.isMirrorY, isFlipY: f.isFlipY, isFloat: !1, H: H, D: function (M) { if ("RGBA" === f.format) l(M); else { var Q = f.width, fa = f.height, ta = N.instance({ isMirrorY: f.isMirrorY, isFloat: !0, width: Q, height: fa, isFlipY: f.isFlipY }); oa.fa(); b.viewport(0, 0, Q, fa); G.set("s14"); ta.o(); M.h(0); ma.l(!0, !0); N.O(0); l(ta); Y.flush(); M.remove() } } }) }
                            } else "JSON" === f.format ? l(N.instance({ isFloat: !0, isFlipY: f.isFlipY, width: f.width, height: f.height, array: new Float32Array(f.data) })) : l(!1)
                        }, Le: d,
                        m: function () { C && (va.fa(), N.Rc(), va.O()); N.lg(); e.slice(0).forEach(function (f) { f.remove() }); e.splice(0); D = !1; m = 0; "undefined" !== typeof Ca && Ca.m(); y = null }
                    }; return N
            }(), Rb = function () {
                return {
                    instance: function (a) {
                        var c = [Aa.instance(a), Aa.instance(a)], d = [c[1], c[0]], g = d, k = {
                            Xf: function (p) { g[1].o(); g[0].h(p); k.me() }, Yf: function (p) { g[1].S(); g[0].h(p); k.me() }, me: function () { g = g === c ? d : c }, refresh: function () { g[0].refresh(); g[1].refresh() }, h: function (p) { g[0].h(p) }, jb: function (p) { g[0].jb(p) }, ug: function (p) { g[1].h(p) },
                            qh: function () { return g[0] }, uh: function () { return g[1] }, Sb: function (p) { g[0].Sb(p); g[1].Sb(p) }, remove: function () { g[0].remove(); g[1].remove(); g = null }, sync: function () { k.Yf(0); G.set("s0"); P.l(!1, !1) }
                        }; return k
                    }
                }
            }(), ma = function () {
                function a(m) {
                    var r = { da: null, indices: null }; r.da = m.createBuffer(); m.bindBuffer(m.ARRAY_BUFFER, r.da); m.bufferData(m.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), m.STATIC_DRAW); r.indices = m.createBuffer(); m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, r.indices); m.bufferData(m.ELEMENT_ARRAY_BUFFER,
                        new Uint16Array([0, 1, 2]), m.STATIC_DRAW); return r
                } var c = null, d = 0, g = !1, k = [], p = -2, q = -2, n = {
                    reset: function () { q = p = -2 }, A: function () { g || (c = a(b), n.Ba(), g = !0) }, instance: function (m) {
                        var r = d++, y = m.indices ? m.indices.length : 0, C = "undefined" === typeof m.mode ? b.STATIC_DRAW : m.mode, x = b.createBuffer(); b.bindBuffer(b.ARRAY_BUFFER, x); b.bufferData(b.ARRAY_BUFFER, m.da instanceof Float32Array ? m.da : new Float32Array(m.da), C); p = r; var B = null, w = null, D = null; if (m.indices) {
                            B = b.createBuffer(); b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, B);
                            var e = null; 65536 > m.indices.length ? (e = Uint16Array, w = b.UNSIGNED_SHORT, D = 2) : (e = Uint32Array, w = b.UNSIGNED_INT, D = 4); e = m.indices instanceof e ? m.indices : new e(m.indices); b.bufferData(b.ELEMENT_ARRAY_BUFFER, e, C); q = r
                        } var z = {
                            Ce: function (A) { p !== r && (b.bindBuffer(b.ARRAY_BUFFER, x), p = r); A && xa.Lc() }, ze: function () { q !== r && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, B), q = r) }, bind: function (A) { z.Ce(A); z.ze() }, Lg: function () { b.drawElements(b.TRIANGLES, y, w, 0) }, Mg: function (A, h) { b.drawElements(b.TRIANGLES, A, w, h * D) }, remove: function () {
                                b.deleteBuffer(x);
                                m.indices && b.deleteBuffer(B); z = null
                            }
                        }; k.push(z); return z
                    }, Ba: function () { -1 !== p && (b.bindBuffer(b.ARRAY_BUFFER, c.da), p = -1); -1 !== q && (b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, c.indices), q = -1) }, l: function (m, r) { m && ma.Ba(); r && xa.Ja(); b.drawElements(b.TRIANGLES, 3, b.UNSIGNED_SHORT, 0) }, rb: function (m) {
                        m = m || b; var r = a(m); m.bindBuffer(m.ARRAY_BUFFER, r.da); m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, r.indices); xa.Ob(m); m.clear(m.COLOR_BUFFER_BIT); m.drawElements(m.TRIANGLES, 3, m.UNSIGNED_SHORT, 0); m.flush(); m.bindBuffer(m.ARRAY_BUFFER,
                            null); m.bindBuffer(m.ELEMENT_ARRAY_BUFFER, null); m.deleteBuffer(r.da); m.deleteBuffer(r.indices); n.reset(); g && (n.Ba(), xa.Ja())
                    }, ud: function () { var m = b, r = c; m.deleteBuffer(r.da); m.deleteBuffer(r.indices) }, m: function () { n.ud(); k.forEach(function (m) { m.remove() }); b.bindBuffer(b.ARRAY_BUFFER, null); b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, null); n.reset(); g = !1; k.splice(0); d = 0 }
                }; return n
            }(), oa = function () {
                var a = null, c = null, d = null, g = !1, k = [], p = { I: -2, sd: 1 }, q = {
                    Cb: function () { return g }, A: function () {
                        if (!g) {
                            a = b.createFramebuffer();
                            var n = Y.na(); c = n && b.DRAW_FRAMEBUFFER ? b.DRAW_FRAMEBUFFER : b.FRAMEBUFFER; d = n && b.READ_FRAMEBUFFER ? b.READ_FRAMEBUFFER : b.FRAMEBUFFER; g = !0
                        }
                    }, nh: function () { return c }, gf: function () { return d }, kc: function () { return b.FRAMEBUFFER }, vh: function () { return p }, fh: function () { return a }, instance: function (n) {
                        void 0 === n.Ed && (n.Ed = !1); var m = n.K ? n.K : null, r = n.width, y = void 0 !== n.height ? n.height : n.width, C = a, x = null, B = !1, w = !1, D = 0; m && (r = r ? r : m.J(), y = y ? y : m.W()); var e = {
                            fe: function () { B || (C = b.createFramebuffer(), B = !0, D = p.sd++) }, ue: function () {
                                e.fe();
                                e.o(); x = b.createRenderbuffer(); b.bindRenderbuffer(b.RENDERBUFFER, x); b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, r, y); b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, x); b.clearDepth(1)
                            }, bind: function (z, A) { D !== p.I && (b.bindFramebuffer(c, C), p.I = D); m && m.o(); A && b.viewport(0, 0, r, y); z && b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT) }, tg: function () { D !== p.I && (b.bindFramebuffer(c, C), p.I = D) }, clear: function () { b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT) }, Dg: function () { b.clear(b.COLOR_BUFFER_BIT) },
                            Eg: function () { b.clear(b.DEPTH_BUFFER_BIT) }, dg: function () { b.viewport(0, 0, r, y) }, o: function () { D !== p.I && (b.bindFramebuffer(c, C), p.I = D) }, rtt: function (z) { m = z; p.I !== D && (b.bindFramebuffer(b.FRAMEBUFFER, C), p.I = D); z.o() }, O: function () { b.bindFramebuffer(c, null); p.I = -1 }, resize: function (z, A) { r = z; y = A; x && (b.bindRenderbuffer(b.RENDERBUFFER, x), b.renderbufferStorage(b.RENDERBUFFER, b.DEPTH_COMPONENT16, r, y)) }, remove: function () {
                                C === a || w || (b.bindFramebuffer(c, C), b.framebufferTexture2D(c, b.COLOR_ATTACHMENT0, b.TEXTURE_2D,
                                    null, 0), x && b.framebufferRenderbuffer(c, b.DEPTH_ATTACHMENT, b.RENDERBUFFER, null), b.bindFramebuffer(c, null), b.deleteFramebuffer(C), x && b.deleteRenderbuffer(x)); w = !0
                            }
                        }; n.Ed && e.ue(); k.push(e); return e
                    }, O: function () { b.bindFramebuffer(c, null); p.I = -1 }, mg: function () { b.bindFramebuffer(c, null); b.clear(b.COLOR_BUFFER_BIT | b.DEPTH_BUFFER_BIT); Y.ke(); p.I = -1 }, reset: function () { p.I = -2 }, fa: function () { 0 !== p.I && (b.bindFramebuffer(c, a), p.I = 0) }, clear: function () { Y.ke(); b.clear(b.COLOR_BUFFER_BIT) }, m: function () {
                        q.O(); k.forEach(function (n) { n.remove() });
                        null !== a && (b.deleteFramebuffer(a), a = null); q.reset(); g = !1; k.splice(0); p.sd = 1
                    }
                }; return q
            }(), Y = function () {
                function a() { n = "undefined" === typeof Ha ? JEContext : Ha; m = !0 } function c(h, F) { for (var t = 0; t < h.length; ++t) { var u = F.getExtension(h[t]); if (u) return u } return null } function d() { null !== e.Rb && (clearTimeout(e.Rb), e.Rb = null); e.Ga = !1 } function g(h) {
                    if (0 === e.ta.length) { e.X = b.PIXEL_PACK_BUFFER; e.ta.splice(0); e.ub.splice(0); for (var F = 0; F < e.Sa; ++F)e.ta.push(b.createBuffer()), e.ub.push(-1); e.ja = 0; e.xc = 0 } b.bindBuffer(e.X,
                        e.ta[e.ja]); h.byteLength !== e.ub[e.ja] && (b.bufferData(e.X, h.byteLength, b.STREAM_READ), e.ub[e.ja] = h.byteLength); e.Ch = !0
                } function k() { b.bindBuffer(e.X, null) } function p() { e.Da.forEach(function (h) { b.deleteSync(h) }); e.Da.splice(0) } function q() { e.ja = (e.ja + 1) % e.Sa; ++e.xc } var n = null, m = !1, r = { Gd: !1, Nc: null, Oc: null, Jd: !1, Cf: !1, Pc: null, Kd: !1, Qc: null, Hd: !1, Xb: null, vf: !1, Yb: null, wf: !1 }, y = null, C = { ka: !0, ma: !0, hc: !0, Yd: !1 }, x = null, B = !0, w = null, D = null, e = { Me: 1, Sa: -1, ja: 0, xc: 0, Ga: !1, ta: [], Da: [], ub: [], X: null, Rb: null }, z =
                    "undefined" === typeof window ? {} : window, A = {
                        A: function () {
                            if (m) return !0; A.reset(); m || a(); var h = b; if (!y.Gd) { y.Nc = A.od(h); z.GL_EXT_FLOAT = y.Nc; y.Jd = y.Nc ? !0 : !1; if (y.Jd || A.na()) y.Oc = A.pd(h), y.Cf = y.Oc ? !0 : !1, z.GL_EXT_FLOATLINEAR = y.Oc; y.Gd = !0 } if (!y.Hd) { y.Pc = A.pb(h); y.Pc && (y.Kd = !0, z.GL_EXT_HALFFLOAT = y.Pc); if (y.Kd || A.na()) y.Qc = A.qd(h), z.GL_EXT_HALFFLOATLINEAR = y.Qc; y.Dh = y.Qc ? !0 : !1; y.Hd = !0 } y.Xb = A.md(h); y.vf = y.Xb ? !0 : !1; z.GL_EXT_COLORBUFFERFLOAT = y.Xb; y.Yb = A.nd(h); y.wf = y.Yb ? !0 : !1; z.GL_EXT_COLORBUFFERHALFFLOAT = y.Yb;
                            oa.A(); Aa.A(); if (!A.Oe()) return !1; ma.A(); Aa.tf(); return !0
                        }, reset: function () { y = Object.assign({}, r); x = Object.assign({}, C) }, J: function () { m || a(); return n.J() }, W: function () { m || a(); return n.W() }, na: function () { m || a(); return n.na() }, ld: function (h) { A.md(h); A.nd(h); A.od(h); A.pd(h); A.pb(h); A.qd(h) }, md: c.bind(null, ["EXT_color_buffer_float", "WEBGL_color_buffer_float", "OES_color_buffer_float"]), nd: c.bind(null, ["EXT_color_buffer_half_float", "WEBGL_color_buffer_half_float", "OES_color_buffer_half_float"]), od: c.bind(null,
                            ["OES_texture_float", "MOZ_OES_texture_float", "WEBKIT_OES_texture_float"]), pd: c.bind(null, ["OES_texture_float_linear", "MOZ_OES_texture_float_linear", "WEBKIT_OES_texture_float_linear"]), pb: c.bind(null, ["OES_texture_half_float", "MOZ_OES_texture_half_float", "WEBKIT_OES_texture_half_float"]), qd: c.bind(null, ["OES_texture_half_float_linear", "MOZ_OES_texture_half_float_linear", "WEBKIT_OES_texture_half_float_linear"]), jc: function (h) { var F = A.pb(h); return F && F.HALF_FLOAT_OES ? F.HALF_FLOAT_OES : h.HALF_FLOAT || h.FLOAT },
                        df: function () { return D || b.RGBA32F || b.RGBA }, ef: function () { return w || b.RGBA16F || b.RGBA }, af: function () { return x }, bd: function () { return x.ka }, yg: function () { return x.ma }, xg: function () { return x.hc }, Fe: function () { return x.Yd && B }, qe: function (h) { B = h; !h && e.Ga && (p(), b.bindBuffer(e.X, null), e.Ga = !1) }, Jh: function () { return e.Ga }, Pb: function (h, F, t) {
                            function u() { h.bindTexture(h.TEXTURE_2D, null); h.bindFramebuffer(I, null); h.deleteTexture(O); h.deleteFramebuffer(v) } var I = h.FRAMEBUFFER, L = h.NEAREST, v = h.createFramebuffer();
                            h.bindFramebuffer(I, v); var O = h.createTexture(); h.activeTexture(h.TEXTURE0); h.bindTexture(h.TEXTURE_2D, O); h.pixelStorei(h.UNPACK_FLIP_Y_WEBGL, !1); h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_S, h.CLAMP_TO_EDGE); h.texParameteri(h.TEXTURE_2D, h.TEXTURE_WRAP_T, h.CLAMP_TO_EDGE); h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, L); h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, L); h.texImage2D(h.TEXTURE_2D, 0, F, 3, 3, 0, h.RGBA, t, null); h.framebufferTexture2D(h.FRAMEBUFFER, h.COLOR_ATTACHMENT0, h.TEXTURE_2D, O, 0);
                            if (h.checkFramebufferStatus(h.READ_FRAMEBUFFER || h.FRAMEBUFFER) !== h.FRAMEBUFFER_COMPLETE) return u(), !1; xa.Kc(h); h.clearColor(0, 0, 0, 0); h.viewport(0, 0, 3, 3); h.disable(h.DEPTH_TEST); h.clear(h.COLOR_BUFFER_BIT); ma.rb(h); h.bindFramebuffer(I, null); xa.cb(h); h.activeTexture(h.TEXTURE0); h.bindTexture(h.TEXTURE_2D, O); ma.rb(h); F = new Uint8Array(36); h.readPixels(0, 0, 3, 3, h.RGBA, h.UNSIGNED_BYTE, F); u(); for (t = 0; 36 > t; ++t)if (3 !== t % 4 && 3 < Math.abs(F[t] - 127)) return !1; return !0
                        }, $b: function (h) {
                            var F = { ka: !1, ma: !1 }; h.disable(h.BLEND);
                            h.clearColor(0, 0, 0, 0); h.clear(h.COLOR_BUFFER_BIT); h.RGBA32F && A.Pb(h, h.RGBA32F, h.FLOAT) && (F.ka = !0, D = h.RGBA32F); !F.ka && A.Pb(h, h.RGBA, h.FLOAT) && (F.ka = !0, D = h.RGBA); var t = A.jc(h); w = null; h.RGBA16F && A.Pb(h, h.RGBA16F, t) && (F.ma = !0, w = h.RGBA16F); !F.ma && A.Pb(h, h.RGBA, t) && (F.ma = !0, w = h.RGBA); return F
                        }, Pe: function () {
                            var h = oa.instance({ width: 2 }); h.fe(); var F = Aa.instance({ width: 2, isFloat: !0, Gb: 3 }); h.o(); F.o(); A.flush(); b.checkFramebufferStatus(oa.gf()) !== b.FRAMEBUFFER_COMPLETE ? (Aa.Zf(), x.hc = !1) : x.hc = !0; h.remove();
                            F.remove()
                        }, Qe: function () { var h = !1; A.na() && (h = "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer".split(" ").every(function (F) { return "undefined" !== typeof b[F] })); x.Yd = h }, Oe: function () { var h = A.$b(b); Object.assign(x, h); if (!x.ka && !x.ma) return !1; A.Pe(); A.Qe(); return !0 }, $d: function (h, F, t, u, I) { b.readPixels(h, F, t, u, b.RGBA, b.UNSIGNED_BYTE, I); return Promise.resolve(I, !1) }, Mb: function (h, F, t, u, I, L, v) {
                            if (!A.Fe()) return A.$d(h, F, t, u, I); e.Sa = v || e.Me; g(I); b.readPixels(h,
                                F, t, u, b.RGBA, b.UNSIGNED_BYTE, 0); e.Da[e.ja] = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0); A.flush(); var O = !1; return new Promise(function (N, f) {
                                    function l() { if (!e.Ga) return d(), k(), q(), f(), !1; var H = (e.ja + 1) % e.Sa; switch (b.clientWaitSync(e.Da[H], 0, 0)) { case b.TIMEOUT_EXPIRED: case b.WAIT_FAILED: break; default: return d(), b.deleteSync(e.Da[H]), e.Da[H] = null, b.bindBuffer(e.X, e.ta[H]), b.getBufferSubData(e.X, 0, I), k(), q(), N(I, O), !0 }e.Rb = setTimeout(l, 0); return !1 } d(); e.xc + 1 < e.Sa ? (k(), q(), N(I, !1)) : (e.Ga = !0, l() || !L ||
                                        O || (O = !0, L()))
                                })
                        }, ke: function () { b.viewport(0, 0, A.J(), A.W()) }, flush: function () { b.flush() }, m: function () { d(); p(); Aa.m(); oa.m(); ma.m(); e.ta.forEach(function (h) { b.deleteBuffer(h) }); e.ta.splice(0); xa.reset(); m = !1 }
                    }; return A
            }(), P = ma, va = oa, aa = Aa, Ca = function () {
                function a(t, u, I, L) {
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, L ? e.NEAREST_MIPMAP_NEAREST : e.LINEAR); var v = null; if (null !== I) try {
                        v = e.getError(); if ("FUCKING_BIG_ERROR" === v) return !1; e.texImage2D(e.TEXTURE_2D, 0, t, 4, 4, 0, e.RGBA, u, I); v = e.getError(); if (v !==
                            e.NO_ERROR) return !1
                    } catch (O) { return !1 } L && e.generateMipmap(e.TEXTURE_2D); e.clear(e.COLOR_BUFFER_BIT); P.rb(e); v = e.getError(); if ("FUCKING_BIG_ERROR" === v) return !1; e.readPixels(0, 0, 2, 2, e.RGBA, e.UNSIGNED_BYTE, y); v = e.getError(); v === e.INVALID_OPERATION && "undefined" !== typeof e.PIXEL_PACK_BUFFER && (e.bindBuffer(e.PIXEL_PACK_BUFFER, null), e.readPixels(0, 0, 2, 2, e.RGBA, e.UNSIGNED_BYTE, y), v = e.getError()); if (v !== e.NO_ERROR) return !1; I = !0; for (L = 0; 16 > L; ++L)I = I && 4 > Math.abs(y[L] - 127); I && (m.Vd = u, m.Dd = t); return I
                } function c(t,
                    u) { return z.ka && a(t, e.FLOAT, new Float32Array(C), u) ? (n = q.Yc, !0) : !1 } function d(t, u, I) {
                        if (!z.ma) return !1; var L = Aa.Le(C), v = Y.pb(e); if (v && v.HALF_FLOAT_OES && a(t, v.HALF_FLOAT_OES, L, u) || e.HALF_FLOAT && a(t, e.HALF_FLOAT, L, u)) return n = q.Na, !0; L = new Float32Array(C); if (a(t, e.FLOAT, L, u)) return n = q.Na, !0; e.bindTexture(e.TEXTURE_2D, I); e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 2, 2, 0, e.RGBA, e.UNSIGNED_BYTE, null); e.bindFramebuffer(m.mb, F); Aa.td(e, I, 2, 2, L, !1, !1); e.bindFramebuffer(m.mb, null); e.bindTexture(e.TEXTURE_2D, I); return a(t,
                            null, null, u) ? (n = q.Na, !0) : !1
                    } function g(t, u, I) { r = !0; if (d(t, !0, I) || c(u, !0)) return !0; r = !1; return d(t, !1, I) || c(u, !1) ? !0 : !1 } function k(t) {
                        if (n === q.P) {
                            e = t || b; n = q.RGBA8; r = !0; Y.ld(e); z || (z = Y.$b(e)); va.reset(); F = e.createFramebuffer(); m.mb = e.DRAW_FRAMEBUFFER || e.FRAMEBUFFER; e.bindFramebuffer(m.mb, null); e.clearColor(0, 0, 0, 0); e.viewport(0, 0, 2, 2); G.P(); A = G.cb(e); t = e.createTexture(); e.activeTexture(e.TEXTURE0); e.bindTexture(e.TEXTURE_2D, t); e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT); e.texParameteri(e.TEXTURE_2D,
                                e.TEXTURE_WRAP_T, e.REPEAT); e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST); h = t; var u = t = e.RGBA, I = e.RGBA16F, L = e.RGBA32F; L && (t = L); I && (u = I); if ((I || L) && g(u, t, h)) return p(), !0; t = u = e.RGBA; if (g(u, t, h)) return p(), !0; n = q.RGBA8; p(); return !1
                        }
                    } function p() { e.deleteProgram(A.xa); e.deleteTexture(h); h = A = null } for (var q = { P: -1, Yc: 3, Na: 2, RGBA8: 0 }, n = q.P, m = { Vd: null, Dd: null, mb: null }, r = !0, y = new Uint8Array(16), C = Array(64), x = 0; 4 > x; ++x)for (var B = 0; 4 > B; ++B) {
                        var w = 0 === (B + x) % 2 ? 1 : 0, D = 4 * x + B; C[4 * D] = w; C[4 * D + 1] = w; C[4 *
                            D + 2] = w; C[4 * D + 3] = w
                    } var e = null, z = null, A = null, h = null, F = null; return { Ee: function (t) { k(t); return r }, ad: function (t, u) { n === q.P && (typeof ("undefined" !== u) && (z = u), k(t)); return n !== q.RGBA8 }, Gh: function (t) { k(t); return n === q.Yc }, Df: function (t) { k(t); return n === q.Na }, oh: function (t) { k(t); return m.Vd }, ff: function (t) { k(t); return m.Dd }, m: function () { e = null; r = !0; n = q.P; z = null } }
            }(), Kb = function () {
                return {
                    instance: function (a) {
                        function c() { x && x.remove(); x = aa.instance({ isFloat: !1, isPot: !1, width: a.size * a.Y[0], height: a.size * a.Y[1] }) }
                        var d = null, g = !1, k = !1, p = null, q = !1, n = !1, m = null, r = "undefined" === typeof a.preprocessing ? !1 : a.preprocessing, y = "undefined" === typeof a.preprocessingSize ? a.size : a.preprocessingSize; a.mask && (g = !0, ea && void 0 !== ea.ye && (a.mask = ea.ye + a.mask), d = aa.instance({ isFloat: !1, url: a.mask })); var C = !1; a.customInputShader && (C = "s49", G.$c({ name: "_", id: C, g: a.customInputShader, li: ["uSource"], precision: "lowp" }), G.T(C, [{ type: "1i", name: "_", value: 0 }])); switch (r) {
                            case "sobel": m = "s38"; q = !0; break; case "meanNormalization": m = "s39"; q = !0;
                                break; case "grayScale": m = "s35"; q = !1; break; case "grayScaleTilt": m = "s36"; n = !0; q = !1; break; case "rgbGrayTilt": m = "s37"; n = !0; q = !1; break; case "copy": m = C ? C : "s0"; break; case "inputLightRegulation": m = C ? C : "s35"; p = Yb.instance({ Cd: y, Ud: a.size, Rd: a.nBlurPass, Z: !1 }); k = !0; break; case "inputMix0": m = "none"; p = Zb.instance({ u: y, pa: a.varianceMin, ga: a.blurKernelSizePx, gain: a.gain || 1, Z: !1 }); k = !0; break; case "inputMix1": m = "none"; p = $b.instance({ u: y, pa: a.varianceMin, ga: a.blurKernelSizePx, gain: a.gain || 1, Z: !1 }); k = !0; break; case "inputCut4": m =
                                    "none"; p = ac.instance({ u: y, pa: a.varianceMin, ga: a.blurKernelSizePx, gain: a.gain || 1, Za: a.isNormalized || !1, Ec: a.overlap || 0, Z: !1 }); y *= p.hf(); k = !0; break; case "direct": case "none": case "abort": m = "abort"; break; default: m = "s4"
                        }y = Math.ceil(y); n && G.T(m, [{ name: "u29", type: "1f", value: a.tilt }]); g && (m += "Mask"); var x = null; c(); var B = {
                            J: function () { return a.size }, jf: function () { return y }, lc: function () { return B.J() }, pf: function () { return k ? p.Wa() : x }, Tb: function (w) { a.Y = w; c() }, U: function (w) {
                                va.fa(); if ("abort" === m) return w.h(0),
                                    w; "none" !== m && (G.set(m), q && G.G("u30", 1 / a.size), x.S(), g && d.h(1), P.l(!1, !1), x.h(0), w = x); k && p.process(w)
                            }, m: function () { x.remove(); g && d.remove() }
                        }; return B
                    }
                }
            }(), Lb = function () {
                return {
                    instance: function (a) {
                        function c() { if (F.Ka) { k.input && (k.input.remove(), k.xb.remove()); var u = a.size * a.sparsity; h = Math.log(u / a.size) / Math.log(2); k.input = aa.instance({ isMipmap: !0, isFloat: !0, isPot: !0, width: u * a.Y[0], height: u * a.Y[1], uc: h }); k.xb = aa.instance({ isFloat: !0, isPot: !0, width: a.size * a.Y[0], height: a.size * a.Y[1] }) } } function d() {
                            k.wa &&
                            k.wa.remove(); k.wa = aa.instance({ isFloat: !0, isPot: !q, isLinear: !q && n.isLinear, width: a.size * a.Y[0], height: a.size * a.Y[1] })
                        } function g(u) { n.buffer.forEach(function (I, L) { n.results[L][0] = u[0][I]; n.results[L][1] = u[1][I]; n.results[L][2] = u[2][I]; n.results[L][3] = u[3][I] }); return n.results } a.normalize = a.normalize || !1; var k = { input: null, bias: null, xb: null, wa: null, Dc: null, Bc: null, Cc: null }, p = null, q = !0, n = { type: "undef", D: null, isLinear: !1, buffer: [], results: [], yb: !1 }, m = -1, r = a.isReorganize ? a.isReorganize : !1, y = a.kernelsCount ?
                            !0 : !1, C = [a.Fa ? "s31" : "s30", a.Fa ? "s33" : "s32", "s34"][a.shiftRGBAMode || 0], x = { isEnabled: !1 }, B = 1 / a.size; a.Af ? (a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.Kb.lc(), q = !1) : "full" === a.connectivityUp && (a.sparsity = a.Kb.lc()); var w = { elu: "s18", elu01: "s19", relu: "s17", arctan: "s20", arctan2: "s21", sigmoid: "s16", copy: "s0" }[a.activation], D = a.sparsity * a.sparsity, e = !1, z = a.size, A = ""; if (a.maxPooling) {
                                switch (a.maxPooling.size) { case 2: A = "s40"; break; case 4: A = "s41" }e = !0; z /= a.maxPooling.size; k.Bc = aa.instance({
                                    isFloat: !0,
                                    isPot: !1, width: z
                                })
                            } var h = -1, F = null; q && d(); k.bias = aa.instance(a.bias); var t = {
                                J: function () { return a.size }, lc: function () { return z }, vd: function () { return a.classesCount }, Ae: function (u) { p.h(u) }, Pf: function () { a.remap && a.remap.isEnabled && (x = { isEnabled: !0, Hf: aa.instance(a.remap.maskTexture), ab: a.remap.layers.map(function (u) { return a.parent.lf(u) }), depth: a.remap.depth }) }, $f: function () {
                                    switch (a.connectivityUp) {
                                        case "direct": F = bc.instance(a.connectivity); break; case "square": F = cc.instance(a.connectivity); break;
                                        case "squareFast": F = dc.instance(a.connectivity, a.activation); break; case "full": F = ec.instance(Object.assign({ Fa: a.Fa, Xa: a.Xa || [1, 1] }, a.connectivity)); break; case "conv": m = a.kernelsCount, F = fc.instance(a.connectivity), r && (k.Dc = aa.instance({ width: z, isFloat: !0, isFlipY: !1, isPot: !1 }))
                                    }c()
                                }, U: function (u, I) {
                                    p = u; F.Ka ? (k.input.S(), y && k.bias.h(2), F.U(x), k.input.h(0), k.input.Ze(h), k.xb.S(), y ? G.set("s0") : (G.set(C), G.G("u4", D), k.bias.h(1)), k.input.Be(h, 0), P.l(!1, !1), G.set(w), k.wa.o(), k.xb.h(0), P.l(!1, !1)) : (k.wa.S(),
                                        k.bias.h(1), F.U()); if (q) return I = k.wa, e && (k.Bc.S(), I.h(0), G.set(A), G.V("u14", B, B), P.l(!1, !1), I = k.Bc), r && (k.Dc.o(), G.set("s23"), G.V("u18", m, z / m), I.h(0), P.l(!1, !1), I = k.Dc), I.h(0), I; var L = k.wa; if (a.normalize || n.yb) u = a.normalize, G.set(n.yb ? "s9" : "s8"), G.G("u10", u ? B : 1), k.Cc.S(), L.h(0), P.l(!1, !1), L = k.Cc; u = null; switch (n.type) {
                                            case "cpuRGBA2Float": L.gd(!1); I ? u = t.Qf(L).then(n.D) : (L = t.Rf(L), n.D(L)); break; case "cpuMeanFloat": L.gd(!0); if (I) u = L.Tf().then(n.D); else { L = L.Uf(); for (var v = 0; v < L.length; ++v); n.D(L) } break;
                                            case "gpuRawAvg": case "gpuRaw": L.h(0); case "none": null !== n.D && n.D(L)
                                        }I && null === u && (u = Promise.resolve()); return u
                                }, Tb: function (u) { a.Y = u; c(); d() }, fg: function (u) {
                                    u && (n.type = u.Ib || "none", n.D = u.Hb || null, n.isLinear = u.Ac ? !0 : !1); d(); u = "undefined" !== typeof a.classesCount && a.classesCount ? a.classesCount : a.size * a.size; for (var I = 0, L = 0, v = 0; I < u; ++I)n.buffer.push(L + (a.size - 1 - v) * a.size), n.results.push([-1, -1, -1, -1]), ++L, L === a.size && (L = 0, ++v); n.yb = "gpuRawAvg" === n.type || "cpuMeanFloat" === n.type; if (a.normalize || n.yb) k.Cc =
                                        aa.instance({ isFloat: !0, isPot: !0, width: a.size })
                                }, Qf: function (u) { return u.Sf().then(g) }, Rf: function (u) { u = u.Zd(); g(u); return n.results }, m: function () { for (var u in k) { var I = k[u]; I && I.remove() } F && (F.m(), F = null) }
                            }; a.Kb && t.$f(a.Kb); return t
                    }
                }
            }(), bc = function () { return { instance: function (a) { var c = aa.instance(a.weights); return { Ka: !0, tb: function () { return 1 }, m: function () { c.remove() }, rf: function () { return c }, U: function () { G.set("s29"); c.h(1); P.l(!1, !1) } } } } }(), ec = function () {
                return {
                    instance: function (a) {
                        var c = a.fromLayerSize,
                        d = aa.instance(a.weights), g = a.Fa ? "s26" : "s25"; return { Ka: !0, tb: function () { return c }, m: function () { d.remove() }, U: function (k) { if (k.isEnabled) { G.set("s27"); k.Hf.h(3); for (var p = Math.min(k.ab.length, k.depth), q = 0; q < p; ++q)k.ab[q].Ae(4 + q) } else G.set(g); a.Fa && G.ie("u21", a.Xa); G.G("u8", a.toLayerSize); G.G("u9", a.fromLayerSize); d.h(1); P.l(!1, !1) } }
                    }
                }
            }(), cc = function () {
                return {
                    instance: function (a) {
                        for (var c = a.fromLayerSize, d = a.toLayerSize, g = a.toSparsity, k = g * d, p = k / c, q = c / d, n = 0, m = 0, r = 0, y = Array(g * d * g * d * 4), C = Array(g * d * g *
                            d * 4), x = Array(c * c), B = 0; B < x.length; ++B)x[B] = 0; B = Math.floor(g / 2); for (var w = .5 / d, D = .5 / c, e = .5 / k, z = 0; z < d; ++z)for (var A = Math.round(z * q), h = 0; h < d; ++h) {
                                var F = Math.round(h * q), t = z / d, u = h / d; t += w; u += w; for (var I = 0; I < g; ++I) {
                                    var L = A + I - B; 0 > L && (L += c); L >= c && (L -= c); for (var v = 0; v < g; ++v) {
                                        var O = n / k, N = m / k, f = F + v - B; 0 > f && (f += c); f >= c && (f -= c); var l = L / c, H = f / c; N = 1 - N - 1 / k; l += D; H += D; O += e; N += e; var M = z * g + I, Q = h * g + v; Q = d * g - Q - 1; M = Q * d * g + M; y[4 * M] = O; y[4 * M + 1] = N; y[4 * M + 2] = l; y[4 * M + 3] = H; H = x[f * c + L]++; M = H % p; l = L * p + M; f = f * p + (H - M) / p; f = c * p - 1 - f; f = f * c * p +
                                            l; C[4 * f] = O; C[4 * f + 1] = N; C[4 * f + 2] = t; C[4 * f + 3] = u; ++n >= k && (n = 0, ++m); ++r
                                    }
                                }
                            } x = null; var fa = aa.instance(a.weights); delete a.weights.data; var ta = aa.instance({ width: k, isFloat: !0, array: new Float32Array(C), isPot: !0 }); C = null; var Da = aa.instance({ width: k, isFloat: !0, array: new Float32Array(y), isPot: !0 }); y = null; return { Ka: !0, tb: function () { return p }, m: function () { ta.remove(); Da.remove(); fa.remove() }, U: function () { G.set("s24"); fa.h(1); Da.h(2); P.l(!1, !1) } }
                    }
                }
            }(), fc = function () {
                return {
                    instance: function (a) {
                        var c = a.kernelsCount,
                        d = a.toSparsity, g = d * a.toLayerSize / a.fromLayerSize, k = a.inputScale || [1, 1], p = aa.instance(a.weights); return { Ka: !0, tb: function () { return g }, zh: function () { return d }, rf: function () { return p }, m: function () { p.remove() }, U: function () { G.set("s28"); G.ie("u28", k); G.G("u26", c); G.G("u27", d); G.G("u8", a.toLayerSize); G.G("u9", a.fromLayerSize); p.h(1); P.l(!1, !1) } }
                    }
                }
            }(), dc = function () {
                return {
                    instance: function (a, c) {
                        var d = a.fromLayerSize, g = a.toLayerSize, k = a.toSparsity, p = a.stride ? a.stride : 1, q = k * g / d, n = g < d, m = d / g, r = aa.instance(a.weights),
                        y = "s50" + [d.toString(), g.toString(), k.toString(), p.toString(), c].join("_"); G.We(y) || (a = Wb.$e(c, "gl_FragColor", "gl_FragColor"), g = [{ type: "1f", name: "u8", value: g }, { type: "1f", name: "u32", value: p }], n && g.push({ type: "1f", name: "u9", value: d }), d = [(n ? q : k).toFixed(1), a], n && d.push(m.toFixed(1)), G.uf(n ? "s46" : "s45", y, d), G.T(y, g.concat([{ type: "1i", name: "u6", value: 0 }, { type: "1i", name: "u3", value: 1 }, { type: "1i", name: "u7", value: 3 }]))); return {
                            Ka: !1, tb: function () { return q }, m: function () { r.remove() }, U: function () {
                                G.set(y); r.h(3);
                                P.l(!1, !1)
                            }
                        }
                    }
                }
            }(), Yb = function () {
                return {
                    instance: function (a) {
                        var c = a.Rd ? a.Rd : 3, d = a.Cd ? a.Cd : 64, g = a.Ud ? a.Ud : 64, k = a.Z ? !0 : !1; a = { isFloat: !1, width: d, isPot: !1, isFlipY: !1 }; var p = aa.instance(a), q = aa.instance(a), n = aa.instance(a), m = aa.instance(a), r = aa.instance({ isFloat: !0, width: g, isPot: !1, isFlipY: !1 }), y = 1 / d; return {
                            process: function (C) {
                                G.set("s42"); m.o(); P.l(k, !1); G.set("s43"); for (var x = 0; x < c; ++x)p.o(), G.V("u14", y, 0), P.l(k, !1), n.o(), m.h(0), P.l(k, !1), q.o(), p.h(0), G.V("u14", 0, y), P.l(k, !1), m.o(), n.h(0), P.l(k, !1),
                                    x !== c - 1 && q.h(0); G.set("s44"); r.o(); C.h(0); q.h(1); m.h(2); P.l(k, !1); r.h(0)
                            }, Wa: function () { return r }
                        }
                    }
                }
            }(), Zb = function () {
                return {
                    instance: function (a) {
                        function c(y) { return aa.instance({ isFloat: y, width: d.u, isPot: !1, isFlipY: !1 }) } var d = Object.assign({ pa: .1, ga: 9, u: 128, gain: 1, Z: !1 }, a), g = c(!1), k = [c(!1), c(!1), c(!1)], p = [c(!1), c(!1), c(!1)], q = c(!0), n = [g, p[0], p[1]]; a = "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}".replace("1.1111",
                            Math.round((d.ga - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.u).toFixed(6)); var m = "uniform sampler2D u34,u35,u36,u37;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec3 a=texture2D(u34,vv0).rgb;float c=texture2D(u35,vv0).r,d=texture2D(u36,vv0).r,i=texture2D(u37,vv0).r,j=a.r*a.r;vec3 b=vec3(c,d,i),k=max(g*f,abs(vec3(j)-b*b)),l=sqrt(k);gl_FragColor=vec4(a.r,h*(a-b)/l);}".replace("1.1111", d.pa.toFixed(4)).replace("2.2222", d.gain.toFixed(4)), r = { u1: 0 }; G.fb([{
                                id: "s52",
                                name: "_", g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 b=texture2D(u1,vv0).rgb;float a=dot(b,f);gl_FragColor=vec4(a,a,a,a);}", j: r, i: ["u1"], precision: "lowp"
                            }, { id: "s53", name: "_", g: a, j: r, i: ["u1", "u33"], precision: "lowp" }, { id: "s54", name: "_", g: m, j: { u34: 0, u35: 1, u36: 2, u37: 3 }, i: ["u34", "u35", "u36", "u37"], precision: "highp" }]); return {
                                process: function () {
                                    G.set("s52"); g.S(); P.l(d.Z, !1); G.set("s53"); for (var y = 0; 3 > y; ++y)G.V("u33", 1, 0), k[y].o(), n[y].h(0),
                                        P.l(!1, !1), G.V("u33", 0, 1), p[y].o(), k[y].h(0), P.l(!1, !1); G.set("s54"); q.o(); g.h(0); p[0].h(1); p[1].h(2); p[2].h(3); P.l(!1, !1); q.h(0)
                                }, Wa: function () { return q }
                            }
                    }
                }
            }(), $b = function () {
                return {
                    instance: function (a) {
                        function c(r) { return aa.instance({ isFloat: r, width: d.u, isPot: !1, isFlipY: !1 }) } var d = Object.assign({ pa: .1, ga: 9, u: 128, gain: 1, Z: !1 }, a), g = c(!1), k = c(!1), p = c(!1), q = c(!0); a = "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){vec3 b=vec3(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).rgb,c+=f;}b/=c,gl_FragColor=vec4(b,1.);}".replace("1.1111",
                            Math.round((d.ga - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.u).toFixed(6)); var n = "uniform sampler2D u0,u38;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);vec3 c=texture2D(u38,vv0).rgb;float d=a.a*a.a;vec3 b=c.rgb,i=max(g*f,abs(vec3(d)-b*b)),j=sqrt(i);gl_FragColor=vec4(a.a,h*(a.rgb-b)/j);}".replace("1.1111", d.pa.toFixed(4)).replace("2.2222", d.gain.toFixed(4)), m = { u1: 0 }; G.fb([{
                                id: "s55", name: "_", g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(a.rgb,b);}",
                                j: m, i: ["u1"], precision: "lowp"
                            }, { id: "s56", name: "_", g: a, j: m, i: ["u1", "u33"], precision: "lowp" }, { id: "s57", name: "_", g: n, j: { u0: 0, u38: 1 }, i: ["u0", "u38"], precision: "highp" }]); return { process: function () { G.set("s55"); g.S(); P.l(d.Z, !1); G.set("s56"); G.V("u33", 1, 0); k.o(); g.h(0); P.l(!1, !1); G.V("u33", 0, 1); p.o(); k.h(0); P.l(!1, !1); G.set("s57"); q.o(); g.h(0); p.h(1); P.l(!1, !1); q.h(0) }, Wa: function () { return q } }
                    }
                }
            }(), ac = function () {
                return {
                    instance: function (a) {
                        function c(y) { return aa.instance({ isFloat: y, width: d.u, isPot: !1, isFlipY: !1 }) }
                        var d = Object.assign({ pa: .1, ga: 9, u: 128, gain: 1, Ec: 0, Za: !1, Z: !1 }, a), g = c(!1), k = null, p = null, q = null; d.Za && (k = c(!1), p = c(!1), q = c(!0)); a = { u1: 0 }; var n = [{
                            id: "s58", name: "_", g: "uniform sampler2D u1;const float f=1.1111;varying vec2 vv0;const vec3 e=vec3(.2126,.7152,.0722);void main(){vec2 a=vv0*.5*(f+1.);float b=.5*(1.-f),c=dot(texture2D(u1,a).rgb,e),d=dot(texture2D(u1,a+vec2(0.,b)).rgb,e),h=dot(texture2D(u1,a+vec2(b,0.)).rgb,e),i=dot(texture2D(u1,a+vec2(b,b)).rgb,e);gl_FragColor=vec4(c,d,h,i);}".replace("1.1111",
                                d.Ec.toFixed(4)), j: a, i: ["u1"], precision: "lowp"
                        }]; if (d.Za) {
                            var m = "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u33;varying vec2 vv0;void main(){vec4 b=vec4(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u33*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j),c+=f;}gl_FragColor=b/c;}".replace("1.1111", Math.round((d.ga - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.u).toFixed(6)), r = "uniform sampler2D u0,u38;const float f=1.1111;const vec4 g=vec4(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u38,vv0),d=a*a,b=c,i=max(g*f,abs(d-b*b)),j=sqrt(i);gl_FragColor=h*(a-b)/j;}".replace("1.1111",
                                d.pa.toFixed(4)).replace("2.2222", d.gain.toFixed(4)); n.push({ id: "s59", name: "_", g: m, j: a, i: ["u1", "u33"], precision: "lowp" }, { id: "s60", name: "_", g: r, j: { u0: 0, u38: 1 }, i: ["u0", "u38"], precision: "highp" })
                        } G.fb(n); return { process: function () { G.set("s58"); g.S(); P.l(d.Z, !1); d.Za ? (G.set("s59"), G.V("u33", 1, 0), k.o(), g.h(0), P.l(!1, !1), G.V("u33", 0, 1), p.o(), k.h(0), P.l(!1, !1), G.set("s60"), q.o(), g.h(0), p.h(1), P.l(!1, !1), q.h(0)) : g.h(0) }, hf: function () { return 2 - d.Ec }, Wa: function () { return d.Za ? q : g } }
                    }
                }
            }(), X = {
                Ad: function () {
                    return X.ed() ?
                        document.createElement("video") : !1
                }, Ua: function (a, c) { a[c] = !0; a.setAttribute(c, "true") }, Ie: function () {
                    var a = !1, c = navigator.userAgent || navigator.vendor || window.opera; if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
                        4))) a = !0; return a
                }, He: function () { return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream }, Ef: function () { try { return window.matchMedia("(orientation: portrait)").matches ? !0 : !1 } catch (a) { return window.innerHeight > window.innerWidth } }, Ag: function () { return X.cd() || X.He() }, cd: function () { var a = navigator.userAgent.toLowerCase(); return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1 }, ah: function () { return X.Ie() ? X.Ef() ? window.innerHeight / window.innerWidth * 45 : 45 : 45 }, ed: function () {
                    return navigator.mediaDevices &&
                        navigator.mediaDevices.getUserMedia ? !0 : !1
                }, pause: function (a) { a.pause() }, Yh: function (a) { a.play() }, release: function (a) { a.pause(); a.videoStream && a.videoStream.stop(); a.videoStream = null }, dd: function (a) {
                    if (!a) return a; var c = null; if (a.video) { var d = function (g) { return g && "object" === typeof g ? Object.assign({}, g) : g }; c = {}; "undefined" !== typeof a.video.width && (c.width = d(a.video.width)); "undefined" !== typeof a.video.height && (c.height = d(a.video.height)); "undefined" !== typeof a.video.facingMode && (c.facingMode = d(a.video.facingMode)) } c =
                        { audio: a.audio, video: c }; "undefined" !== typeof a.deviceId && X.Zc(c, a.deviceId); return c
                }, Zc: function (a, c) { c && (a.video = a.video || {}, a.video.deviceId = { exact: c }, a.video.facingMode && delete a.video.facingMode) }, oe: function (a) { var c = a.video.width; a.video.width = a.video.height; a.video.height = c; return a }, Ne: function (a) {
                    function c(x) { return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function (B, w) { return Math.abs(B - x) - Math.abs(w - x) }) } function d(x) { var B = X.dd(a); x = x(B); k.push(x); g(x) } function g(x) {
                        if (x.video &&
                            x.video.facingMode && x.video.facingMode.exact) { var B = x.video.facingMode.exact; x = X.dd(x); delete x.video.facingMode.exact; x.video.facingMode.ideal = B; k.push(x) }
                    } var k = []; if (!a || !a.video) return k; g(a); if (a.video.width && a.video.height) {
                        if (a.video.width.ideal && a.video.height.ideal) {
                            var p = c(a.video.width.ideal).slice(0, 3), q = c(a.video.height.ideal).slice(0, 3), n = {}, m = 0; for (n.ra = void 0; m < p.length; n = { ra: n.ra }, ++m) {
                                n.ra = p[m]; var r = {}, y = 0; for (r.qa = void 0; y < q.length; r = { qa: r.qa }, ++y)if (r.qa = q[y], n.ra !== a.video.width.ideal ||
                                    r.qa !== a.video.height.ideal) { var C = Math.max(n.ra, r.qa) / Math.min(n.ra, r.qa); C < 4 / 3 - .1 || C > 16 / 9 + .1 || d(function (x, B) { return function (w) { w.video.width.ideal = x.ra; w.video.height.ideal = B.qa; return w } }(n, r)) }
                            }
                        } d(function (x) { return X.oe(x) })
                    } a.video.width && a.video.height && (a.video.width.ideal && a.video.height.ideal && d(function (x) { delete x.video.width.ideal; delete x.video.height.ideal; return x }), d(function (x) { delete x.video.width; delete x.video.height; return x })); a.video.facingMode && (d(function (x) {
                        delete x.video.facingMode;
                        return x
                    }), a.video.width && a.video.height && d(function (x) { X.oe(x); delete x.video.facingMode; return x })); k.push({ audio: a.audio, video: !0 }); return k
                }, Qd: function (a) { a.volume = 0; X.Ua(a, "muted"); if (X.cd()) { if (1 === a.volume) { var c = function () { a.volume = 0; window.removeEventListener("mousemove", c, !1); window.removeEventListener("touchstart", c, !1) }; window.addEventListener("mousemove", c, !1); window.addEventListener("touchstart", c, !1) } setTimeout(function () { a.volume = 0; X.Ua(a, "muted") }, 5) } }, re: function (a, c, d) {
                    return null ===
                        a ? Promise.resolve() : new Promise(function (g, k) { if (a.srcObject && a.srcObject.getVideoTracks) { var p = a.srcObject.getVideoTracks(); 1 !== p.length ? k("INVALID_TRACKNUMBER") : (p = p[0], c ? X.get(a, g, k, d) : (p.stop(), g())) } else k("BAD_IMPLEMENTATION") })
                }, yd: function (a, c, d, g) {
                    function k(q) { p || (p = !0, d(q)) } var p = !1; return navigator.mediaDevices.getUserMedia(g).then(function (q) {
                        function n() {
                            setTimeout(function () {
                                if (a.currentTime) {
                                    var r = a.videoHeight; if (0 === a.videoWidth || 0 === r) k("VIDEO_NULLSIZE"); else {
                                        r = {
                                            Ge: null, eg: null,
                                            If: null
                                        }; try { var y = q.getVideoTracks()[0]; y && (r.If = y, r.Ge = y.getCapabilities(), r.eg = y.getSettings()) } catch (C) { } p || c(a, q, r)
                                    }
                                } else k("VIDEO_NOTSTARTED")
                            }, 700)
                        } function m() { a.removeEventListener("loadeddata", m, !1); var r = a.play(); X.Qd(a); "undefined" === typeof r ? n() : r.then(function () { n() }).catch(function () { k("VIDEO_PLAYPROMISEREJECTED") }) } "undefined" !== typeof a.srcObject ? a.srcObject = q : (a.src = window.URL.createObjectURL(q), a.videoStream = q); X.Qd(a); a.addEventListener("loadeddata", m, !1)
                    }).catch(function (q) { k(q) })
                },
                qf: function (a, c) { var d = c || X.Ad(); return new Promise(function (g, k) { X.get(d, g, k, a) }) }, get: function (a, c, d, g) { if (!a) return d && d("VIDEO_NOTPROVIDED"), !1; if (!X.ed()) return d && d("MEDIASTREAMAPI_NOTFOUND"), !1; X.Ua(a, "autoplay"); X.Ua(a, "playsinline"); g && g.audio ? a.volume = 0 : X.Ua(a, "muted"); X.Ke(g).then(function () { X.yd(a, c, function () { function k(q) { if (0 === q.length) d("INVALID_FALLBACKCONSTRAINTS"); else { var n = q.shift(); X.yd(a, c, function () { k(q) }, n) } } var p = X.Ne(g); k(p) }, g) }) }, Ke: function (a) {
                    if (!a || !a.video || !a.video.facingMode) return Promise.resolve("NO_VIDEO_CONSTRAINTS");
                    if (a.video.deviceId) return Promise.resolve("DEVICEID_ALREADY_SET"); var c = a.video.facingMode; c = c.exact || c.ideal; if (!c) return Promise.resolve("NO_FACINGMODE"); var d = { user: [], environment: ["camera2 0"] }[c]; return d && 0 !== d.length ? new Promise(function (g) { X.zd(function (k) { k ? (k = k.find(function (p) { var q = p.label; return q ? d.some(function (n) { return q.includes(n) }) : !1 })) ? (a.video.deviceId = { exact: k.deviceId }, g("SUCCESS")) : g("NO_PREFERRED_DEVICE_FOUND") : g("NO_DEVICES_FOUND") }) }) : Promise.resolve("NO_PREFERRED_CAMERAS")
                },
                zd: function (a) { if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return a(!1, "NOTSUPPORTED"), !1; navigator.mediaDevices.enumerateDevices().then(function (c) { (c = c.filter(function (d) { return d.kind && -1 !== d.kind.toLowerCase().indexOf("video") && d.label && d.deviceId })) && c.length && 0 < c.length ? a(c, !1) : a(!1, "NODEVICESFOUND") }).catch(function () { a(!1, "PROMISEREJECTED") }) }, zg: function (a, c, d) { var g = {}; g[c] = d; c = []; c.push(g); a.applyConstraints({ advanced: c }).catch(function () { }) }
            }, qa = function () {
                function a(D,
                    e, z, A, h, F, t) { if (!B) if (t === F.length) h(); else { switch (F[t]) { case "A": z(); break; case "D": D(); break; case "S": e().then(function (u, I) { w.Qb(); a(D, e, z, I ? null : A, h, F, ++t) }).catch(function (u) { console.log("An error occurred in the WebAR loop: ", u); h() }); return; case "R": A && A() }a(D, e, z, A, h, F, ++t) } } var c = { n: 5, wc: 1, Od: 0, sb: [35, 49], ob: [2, 200], k: .7, ng: 200, Of: .05 }, d = -1, g = null, k = -1, p = -1, q = 0, n = -1, m = -1, r = 0, y = 0, C = c.ob[1], x = Math.log(2), B = !0, w = {
                        mf: function () { switch (d) { case -1: return -1; case 0: return m + g.Od; case 1: return r } },
                        hh: function (D) { return Math.pow(Math.min(Math.max(n, 0), g.n - 1) / (g.n - 1), D || 1) }, A: function (D) { g = Object.assign({}, c, D); n = m = g.wc; d = 0; w.reset() }, Qb: function (D) { D = ("undefined" === typeof D ? Date.now() : D) || 0; var e = Math.min(Math.max(D - y, g.ob[0]), g.ob[1]); C = e; y = D; var z = -1 === k ? 0 : g.k; k = Math.min(Math.max(1E3 / e, 5), 120) * (1 - z) + k * z; D - p > g.ng && 5 < ++q && (e = g.k, n = n * (1 - e) + (k < g.sb[0] ? m - 1 : k > g.sb[1] ? m + 1 : m) * e, Math.abs(n - m) > 1 - g.Of && (e = Math.min(Math.max(Math.round(n), 0), g.n - 1), e !== m && (n = m = e, k = (g.sb[1] - g.sb[0]) / 2)), p = D) }, Fc: function (D,
                            e, z, A, h, F) { B = !1; a(D, e, z, A, h, F, 0) }, stop: function () { B = !0 }, Ic: function (D) { r = D; d = 1 }, Sc: function () { d = 0; w.reset() }, reset: function () { C = c.ob[1]; p = k = -1; q = 0 }, ki: function (D, e, z) { z = Math.exp(-x * C / z); return (1 - z) * D + z * e }, cf: function () { return C }
                    }; return w
            }(), Na = function () {
                function a() { d(D + B.vc); e.port.postMessage("DONE") } function c() { F.hb = 0 === B.gb ? A(d) : A(g) } function d(v) { h.Ha && null !== w && (v -= D, v = Math.min(Math.max(v, B.hd[0]), B.hd[1]), D += v, p(), t.isEnabled && t.$a && h.$ && D - t.sc > B.Wc && (r(), t.sc = D), w(D)) } function g(v) {
                    h.Ha &&
                    (F.timeout = setTimeout(d.bind(null, v), B.gb))
                } function k() { w = null; h.Ha = !1; p() } function p() { F.hb && (window.cancelAnimationFrame(F.hb), F.hb = null); F.timeout && (window.clearTimeout(F.timeout), F.timeout = null) } function q(v) { v && !h.$ ? (h.$ = !0, z && qa.Sc(), e.port.postMessage("STOP"), Y.qe(!0), c()) : !v && h.$ && (h.$ = !1, z && qa.Ic(1), Y.qe(!1), e.port.postMessage("START")) } function n(v) { v.target.hidden ? I() : u() } function m(v, O, N) { O = v.createShader(O); v.shaderSource(O, N); v.compileShader(O); return O } function r() {
                    t.$a = !1; var v = t.la,
                        O = t.vb, N = t.wb, f = t.X; v.uniform1f(t.Bd, Math.random()); t.Ia ? O.beginQueryEXT(f, N) : v.beginQuery(f, N); v.drawElements(v.POINTS, 1, v.UNSIGNED_SHORT, 0); t.Ia ? O.endQueryEXT(f) : v.endQuery(f); Y.flush(); C().then(function (l) {
                            0 === l || isNaN(l) ? (t.isEnabled = !1, console.log("WARNING in benchmark_GPUClock: WebGL timer queries is not working properly. timeElapsedNs =", l)) : (l = B.te * B.Vc * 1E3 / l, t.Ub = (t.Ub + 1) % B.La, t.tc[t.Ub] = l, ++t.Nd > B.La && (t.Db.set(t.tc), t.Db.sort(function (H, M) { return H - M }), l = t.Db[Math.floor(B.La / 2)], t.qb = Math.max(t.qb,
                                l), B.Uc(l / t.qb)), t.$a = !0)
                        }).catch(function () { t.$a = !0 })
                } function y(v) { var O = t.la, N = t.vb, f = t.wb; f = t.Ia ? N.eh(f, N.QUERY_RESULT_AVAILABLE_EXT) : O.getQueryParameter(f, O.QUERY_RESULT_AVAILABLE); O = O.getParameter(N.GPU_DISJOINT_EXT); f ? v(!O) : setTimeout(y.bind(null, v), .1) } function C() { return new Promise(function (v, O) { y(function (N) { if (N) { N = t.la; var f = t.vb, l = t.wb; N = t.Ia ? f.getQueryObjectEXT(l, f.QUERY_RESULT_EXT) : N.getQueryParameter(l, N.QUERY_RESULT); v(N) } else O() }) }) } var x = {
                    Id: !0, hd: [1, 200], vc: 20, gb: 0, Vc: 50, te: 240,
                    Wc: 3E3, La: 3, Uc: null
                }, B = null, w = null, D = 0, e = null, z = !1, A = null, h = { ua: !1, $: !0, rc: !1, qc: !1, pc: !1, Ha: !1 }, F = { hb: null, timeout: null }, t = { isEnabled: !1, $a: !1, la: null, vb: null, wb: null, X: null, Bd: null, Ia: !0, sc: 0, Nd: 0, tc: null, Db: null, Ub: 0, qb: 0 }, u = q.bind(null, !0), I = q.bind(null, !1), L = {
                    A: function (v) {
                        B = Object.assign(x, v); Object.assign(h, { $: !0, ua: !0, Ha: !1 }); A = window.requestPostAnimationFrame || window.requestAnimationFrame; if (null !== B.Uc) {
                            v = document.createElement("canvas"); v.setAttribute("width", "1"); v.setAttribute("height",
                                "1"); var O = { antialias: !1 }; v = v.getContext("webgl2", O) || v.getContext("webgl", O); if (O = v.getExtension("EXT_disjoint_timer_query") || v.getExtension("EXT_disjoint_timer_query_webgl2")) {
                                    t.la = v; t.vb = O; t.isEnabled = !0; t.Ia = O.beginQueryEXT ? !0 : !1; var N = m(v, v.VERTEX_SHADER, "attribute vec4 a0;void main(){gl_Position=a0;}"), f = m(v, v.FRAGMENT_SHADER, "precision lowp float;uniform float u39;void main(){vec4 a=u39*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace("666", B.Vc.toString())), l = v.createProgram();
                                    v.attachShader(l, N); v.attachShader(l, f); v.linkProgram(l); N = v.getAttribLocation(l, "a0"); t.Bd = v.getUniformLocation(l, "u39"); v.useProgram(l); v.enableVertexAttribArray(N); l = v.createBuffer(); v.bindBuffer(v.ARRAY_BUFFER, l); v.bufferData(v.ARRAY_BUFFER, new Float32Array([.5, .5, 0, 1]), v.STATIC_DRAW); v.vertexAttribPointer(N, 4, v.FLOAT, !1, 16, 0); l = v.createBuffer(); v.bindBuffer(v.ELEMENT_ARRAY_BUFFER, l); v.bufferData(v.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), v.STATIC_DRAW); v.disable(v.DEPTH_TEST); v.disable(v.DITHER);
                                    v.disable(v.STENCIL_TEST); v.viewport(0, 0, 1, 1); l = t.Ia ? O.createQueryEXT() : v.createQuery(); t.wb = l; t.X = O.TIME_ELAPSED_EXT || v.TIME_ELAPSED; t.sc = -B.Wc; t.tc = new Float32Array(B.La); t.Db = new Float32Array(B.La); t.qb = 0; t.Ub = 0; t.Nd = 0; t.$a = !0
                                }
                        } if (B.Id) {
                            v = !1; try {
                                if ("undefined" === typeof SharedWorker) {
                                    var H = URL.createObjectURL(new Blob(["let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " +
                                        B.vc.toString() + ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);"], { type: "text/javascript" })), M = new Worker(H); M.addEventListener("message", a); e = { Xd: M, port: M }; h.rc = !0
                                } else {
                                    var Q = URL.createObjectURL(new Blob(["let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " +
                                        B.vc.toString() + ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()"], { type: "text/javascript" })), fa = new SharedWorker(Q); fa.port.start(); fa.port.addEventListener("message", a); e = { Xd: fa, port: fa.port }; h.qc = !0
                                } v = !0
                            } catch (ta) { } v && ("onvisibilitychange" in document ? document.addEventListener("visibilitychange", n) : (window.addEventListener("blur", I), window.addEventListener("focus", u)), window.addEventListener("pagehide",
                                I), window.addEventListener("pageshow", u), h.pc = !0)
                        } z = "undefined" !== typeof qa
                    }, m: function () { k(); h.pc && ("onvisibilitychange" in document ? document.removeEventListener("visibilitychange", n) : (window.removeEventListener("blur", I), window.removeEventListener("focus", u)), window.removeEventListener("pagehide", I), window.removeEventListener("pageshow", u), h.pc = !1); h.qc ? (e.port.close(), h.qc = !1) : h.rc && (e.Xd.terminate(), h.rc = !1); Object.assign(h, { $: !0, ua: !1, Ha: !1 }); w = null }, Mh: function () { return h.$ }, update: function (v) {
                        Object.assign(B,
                            v)
                    }, Fc: function (v) { h.ua || L.A({}); p(); h.Ha = !0; w = v; h.$ && c() }, stop: k
                }; return L
            }(), Ta = function () {
                function a(C, x) { var B = C[0] - .5; C = C[1] - .5; var w = x[0] - .5; x = x[1] - .5; return B * B + C * C - (w * w + x * x) } var c = { Td: 4, Jb: [1.5, 1.5, 2], N: [.1, .1, .1], be: 1, u: -1, L: -1, ig: 2, Nf: 1, Hc: !0, Te: .8 }, d = null, g = [], k = [], p = [], q = [0], n = [.5, .5, 1], m = null, r = 0, y = [0, 0, 0]; return {
                    A: function (C) {
                        d = Object.assign({}, c, C); g.splice(0); k.splice(0); p.splice(0); r = 0; C = d.Jb[0] * d.N[0]; var x = d.Jb[1] * d.N[1], B = 1 / (1 + d.Jb[2] * d.N[2]), w = d.be * Math.min(d.u, d.L), D = w / d.u; w /=
                            d.L; var e = .5 * d.Te; e *= e; for (var z = 0; z < d.Td; ++z) { var A = []; k.push(A); var h = Math.pow(B, z), F = D * h, t = w * h; h = F * d.Nf; p.push(h); var u = F * C, I = t * x; F /= 2; t /= 2; for (var L = 1 + (1 - F - F) / u, v = 1 + (1 - t - t) / I, O = 0; O < v; ++O)for (var N = t + O * I, f = N - .5, l = 0; l < L; ++l) { var H = F + l * u, M = H - .5; M * M + f * f > e || (H = [H, N, h], g.push(H), A.push(H)) } d.Hc && A.sort(a); m = g } d.Hc && g.sort(a)
                    }, get: function (C) {
                        var x = m.length; if (0 === x) return n; for (; C >= q.length;)q.push(0); q[C] >= x && (q[C] = 0); var B = m[Math.floor(q[C]) % x]; q[C] = (q[C] + 1 / d.ig) % x; if (0 === r) return B; y[0] = B[0]; y[1] =
                            B[1]; y[2] = r; return y
                    }, Sh: function (C) { C >= q.length || (q[C] = Math.floor(Math.random() * m.length)) }, Jc: function (C) { r = C; if (0 === r) m = g; else { for (var x = p.length, B = x - 1, w = 0; w < x; ++w)if (p[w] <= C) { B = w; break } m = k[B] } }, reset: function () { for (var C = g.length / q.length, x = 0; x < q.length; ++x)q[x] = Math.floor(x * C); r = 0; m = g }
                }
            }(), da = function () {
                function a(e, z, A, h) { return Math.max(0, A > e ? e + z / 2 - (A - h / 2) : A + h / 2 - (e - z / 2)) } function c(e) { return !n.Fd(e) } function d(e, z, A) {
                    for (var h = e.length; w.length < h;)w.push({
                        oa: [0, 0], Eb: [0, 0], ia: [0, 0], ya: 0, scale: 0,
                        Ta: 0, eb: 0
                    }); h = e.length; for (var F = 0; F < h; ++F) { var t = e[F], u = w[F], I = z[F].rz, L = Math.cos(I), v = Math.sin(I); u.ya = I; u.Ta = L; u.eb = v; u.ia[0] = t.x; u.ia[1] = t.y / A; u.scale = t.ca; u.oa[0] = t.ca * n.jd[0]; u.oa[1] = t.ca * n.jd[1]; u.Eb[0] = u.oa[0] * u.oa[0]; u.Eb[1] = u.oa[1] * u.oa[1] }
                } function g(e, z, A) { var h = Math.abs(-e.eb * (A - e.ia[1]) - e.Ta * (z - e.ia[0])); z = Math.abs(e.Ta * (A - e.ia[1]) - e.eb * (z - e.ia[0])); return 1 >= h * h / e.Eb[0] + z * z / e.Eb[1] } function k(e, z, A, h) {
                    var F = e[A]; d(e, z, h); var t = w[A]; return e.some(function (u, I) {
                        if (!(u = I === A || F.va > u.va ||
                            3 > u.va || !(0 < a(F.x, F.ca * B, u.x, u.ca * B)) || !(0 < a(F.y, F.ca * h * B, u.y, u.ca * h * B)))) { u = w[I]; t.scale > u.scale ? I = t : (I = u, u = t); for (var L = 0, v = 0, O = n.Ue, N = 0; N < O; ++N)for (var f = ((N + .5) / O * 2 - 1) * u.oa[1], l = 0; l < O; ++l) { var H = ((l + .5) / O * 2 - 1) * u.oa[0], M = u.ia[0] + (-f * u.eb + H * u.Ta); H = u.ia[1] + (f * u.Ta + H * u.eb); g(u, M, H) && (++L, g(I, M, H) && ++v) } u = v / L < n.Pd } return u ? !1 : !0
                    })
                } function p(e) { return e.isDetected } var q = { M: 1, Pd: .3, jd: [1, 1], Ue: 6, de: .3, Fd: null, Bf: !0 }, n = null, m = 0, r = null, y = !1, C = 0, x = 0, B = Math.sqrt(2), w = [], D = {
                    A: function (e) {
                        n = Object.assign({},
                            q, e); r = [0]
                    }, Md: function () { return 1 !== n.M }, wd: function () { return m }, Ld: function () { return y }, sa: function () { return n.M }, xh: function () { return r }, Ff: function (e) { return r.includes(e) }, update: function (e, z) { var A = r; if (A.length > e) A.splice(0, A.length - e); else for (; A.length < e;)A.push(0); if (1 !== n.M) if (z.every(c)) { z = C; for (var h = 0; h < e; ++h)A[h] = z, z = (z + 1) % n.M; C = z } else { h = Math.round(n.de * e); h = Math.max(1, h); for (var F = C, t = 0, u = 0; t < e; ++t) { if (c(z[F]) && ++u > h) { do ++F === n.M && (F = 0); while (c(z[F])) } A[t] = F; F = (F + 1) % n.M } C = F } }, Qb: function (e) {
                        m =
                        r[e]; x = (.5 + m) / n.M; y = r.lastIndexOf(m) === e; return m
                    }, gg: function (e, z, A) { return 1 === n.M ? !1 : k(e, z, m, A) }, pe: function (e) { n.Bf && 1 === n.M || G.G(e, x) }, Ye: function (e) { return e.find(p) }, bh: function (e) { return e.findIndex(p) }, $g: function (e) { var z = D.Ye(e); if (!z || e.every(p)) return Ta.Jc(0), !1; Ta.Jc(z.s); return !0 }, Se: function (e) { for (var z = new Float32Array(e.length * n.M), A = 0, h; A < n.M; ++A)for (h = 0; h < e.length; ++h)z[A * e.length + h] = e[h]; return z }, fc: function (e) {
                        for (var z = [], A = 0; A < n.M; ++A) {
                            var h = z, F = h.push, t = void 0, u = e, I = {};
                            for (t in u) { var L = t; var v = u[t]; var O = typeof v; v = ["string", "boolean", "number"].includes(O) ? v : "object" !== O ? null : ArrayBuffer.isView(v) ? v.slice() : JSON.parse(JSON.stringify(v)); I[L] = v } F.call(h, I)
                        } return z
                    }
                }; return D
            }(), ea = {
                neuralNetworkPath: "NN_DEFAULT.json", ea: 0, Wf: {
                    threshold: 1.2, nScaleLevels: 2, scale0Factor: .8, nDetectsPerLoopRange: [2, 6], overlapFactors: [2, 2, 3], scanCenterFirst: !0, nDetectsPerLoop: -1, multiDetectionThresholdFactors: [.5, .6], translationScalingFactors: [.3,
                        .3, 1], isCleanGLStateAtEachIteration: !0, enableAsyncReadPixels: !1, animateProcessOrder: "DSAR"
                }, kg: 50, Kf: .4, Jf: 8, Lf: .3, hg: { translationFactorRange: [.002, .01], rotationFactorRange: [.015, .1], qualityFactorRange: [.8, .98], alphaRange: [.04, 1], followZRotAlphaFactor: .8 }, bb: [.65, 1, .262], ve: .2, xe: 2, we: .1, Mf: 8, Sd: 1, Xe: $a.Fb.bind(null, .3, .7), pg: 20, le: 3
            }, pa = { facingMode: "user", idealWidth: 800, idealHeight: 600, minWidth: 480, maxWidth: 1920, minHeight: 480, maxHeight: 1920, rotate: 0, flipX: !1 }, ja = {
                yc: -3, Gf: -1, error: -2, ready: 1, play: 2,
                pause: 3
            }, na = ja.yc, K = null, gc = { Ab: !1, Mc: null, element: null, K: null, F: [0, 0], B: [.5, 0, 0, .5], Lb: 0, Ra: null, zb: !1 }, S = null, hc = { Qa: null, Wb: null, antialias: !0, Xc: "./", Ma: null, ha: null, ea: ea.ea, Wd: ea.ea, Bb: !1, Ca: !0 }, Pa = null, ba = null, sa = null, Qa = 1, Oa = { Gc: -1, ac: -1 }, Z = null, ic = { u: 0, L: 0, F: [0, 0], Ya: null }, V = { za: null, buffer: null, N: null, bb: null, ba: ea.Sd, ce: 1, Va: null }, Sa = null, Ba = null, jb = [], kb = [], sb = {
                VERSION: "3.2.4", init: function (a) {
                    function c() {
                        na !== ja.error && 2 === ++g && (Ka(), Ab(), Ja(), S.Qa && (na = ja.ready, S.Qa(!1, {
                            GL: b, canvasElement: S.ha,
                            videoTexture: K.K.get(), videoTransformMat2: K.B, maxFacesDetected: da.sa(), videoElement: K.element
                        }), ib()), hb())
                    } if (na !== ja.yc) return a.callbackReady && a.callbackReady("ALREADY_INITIALIZED"), !1; na = ja.Gf; K = Object.assign({}, gc); S = Object.assign({}, hc); Z = Object.assign({}, ic); V.bb = ea.bb.slice(0); "undefined" !== typeof a.antialias && (S.antialias = a.antialias); a.callbackReady && (S.Qa = a.callbackReady); a.callbackTrack && (S.Wb = a.callbackTrack); a.nExpressions && (V.ba = a.nExpressions); a.expressionsEasings && (V.Va = a.expressionsEasings);
                    "undefined" !== typeof a.animateDelay && (S.ea = a.animateDelay); "undefined" !== typeof a.NNCPath && (S.Xc = a.NNCPath); "undefined" !== typeof a.NNC && (S.Ma = a.NNC); "undefined" !== typeof a.followZRot && (S.Ca = a.followZRot ? !0 : !1); if (!a.canvasId && !a.canvas) return Ia("NO_CANVASID"), !1; S.ha = a.canvas ? a.canvas : document.getElementById(a.canvasId); if (!S.ha) return Ia("INVALID_CANVASID"), !1; Z.u = S.ha.width; Z.L = S.ha.height; if (!Z.u || !Z.L) return Ia("INVALID_CANVASDIMENSIONS"), !1; ba = Object.create(ea.Wf); a.scanSettings && Object.assign(ba,
                        a.scanSettings); var d = 1; "undefined" !== typeof a.maxFacesDetected && (d = Math.max(1, a.maxFacesDetected)); if (d > ea.Jf) return Ia("MAXFACES_TOOHIGH"), !1; da.A({ M: d, Pd: ea.Kf, de: ea.Lf, Fd: function (k) { return k.detected > ba.multiDetectionThresholdFactors[1] * ba.threshold } }); for (d = 0; d < da.sa(); ++d)jb.push(new Float32Array(ea.Mf)), kb.push(0); Na.A({ Id: a.isKeepRunningOnWinFocusLost || !1, gb: S.ea }); qa.A({ wc: 0, n: ba.nDetectsPerLoopRange[1] - ba.nDetectsPerLoopRange[0] + 1, Od: ba.nDetectsPerLoopRange[0] }); -1 !== ba.nDetectsPerLoop ?
                            qa.Ic(ba.nDetectsPerLoop) : qa.Sc(); V.N = ba.translationScalingFactors.slice(0); sa = Object.create(ea.hg); a.stabilizationSettings && Object.assign(sa, a.stabilizationSettings); var g = 0; a.videoSettings && a.videoSettings.videoElement ? bb(a.videoSettings.videoElement, c) : (a.videoSettings && Object.assign(pa, a.videoSettings), Cb(a.onWebcamAsk, a.onWebcamGet, function (k) { bb(k, c) })); Sb(function (k) {
                                if (!Tb()) return !1; Pa = new Jb({ ab: k.layers, Ib: "gpuRawAvg", Hb: Ub }); G.fb([{
                                    id: "s62", name: "_", Aa: "attribute vec2 a0;uniform mat2 u40;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5)+u40*a0;}",
                                    ib: ["a0"], Oa: [2], g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", i: ["u1", "u40"], precision: "lowp"
                                }, {
                                    id: "s63", name: "_", g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}", Aa: "attribute vec2 a0;uniform sampler2D u41;uniform mat2 u40;uniform vec2 u42;uniform float u43,u44,u45;varying vec2 vv0;void main(){vec4 a=texture2D(u41,vec2(.17,u43));vec2 f=a.gb,g=a.a*u42,b=a0;b.x*=u45;float c=cos(u44),d=sin(u44);vec2 h=mat2(c,d,-d,c)*b,i=f+h*.5*g,j=i-.5;vv0=vec2(.5)+2.*u40*j,gl_Position=vec4(a0,0.,1.);}",
                                    ib: ["a0"], Oa: [2], i: "u1 u41 u42 u43 u44 u45 u40".split(" "), precision: "lowp"
                                }, {
                                    id: "s64", name: "_", g: "uniform sampler2D u46,u41;uniform vec3 u47,u48;uniform float u49,u50,u43,u51,u44,u52;const vec4 e=vec4(.25);void main(){vec4 d=texture2D(u46,vec2(.625,.625)),f=texture2D(u46,vec2(.875,.625)),a=texture2D(u41,vec2(.17,u43));float g=dot(d-f,e);bool h=g>u50;a.r<-.5?a.r+=1.:h?a.r=2.:a.r>u49?a.r=0.:a.r>1.9?a.r+=1.:0.,a.r=mix(-2.,a.r,u51);if(a.r<.9)a=vec4(1.,u47);else{a.r*=step(1.9,a.r);float i=dot(e,texture2D(u46,vec2(.875,.875))),j=dot(e,texture2D(u46,vec2(.125,.625))),k=dot(e,texture2D(u46,vec2(.375,.625))),b=cos(u44),c=sin(u44);vec2 l=mat2(b,c*u52,-c/u52,b)*vec2(i,j);a.gba+=vec3(l,k)*u48*a.a;}gl_FragColor=a;}",
                                    Aa: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", i: "u46 u41 u47 u49 u48 u51 u44 u52 u50 u43".split(" ")
                                }, {
                                    id: "s65", name: "_", Aa: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", g: "uniform sampler2D u46;uniform float u51;const vec4 e=vec4(.25);const vec3 f=vec3(.5);void main(){float a=dot(e,texture2D(u46,vec2(.125,.875))),b=dot(e,texture2D(u46,vec2(.375,.875))),c=dot(e,texture2D(u46,vec2(.625,.875))),d=dot(e,texture2D(u46,vec2(.625,.625)));vec3 g=vec3(a,b,c)*.5+f;gl_FragColor=vec4(g,d*u51);}",
                                    i: ["u46", "u51"]
                                }, { id: "s66", name: "_", Aa: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}", g: "uniform sampler2D u46;const vec4 e=vec4(.25);void main(){float a=dot(e,texture2D(u46,vec2(.375,.375))),b=dot(e,texture2D(u46,vec2(.625,.375))),c=dot(e,texture2D(u46,vec2(.875,.375))),d=dot(e,texture2D(u46,vec2(.125,.125)));gl_FragColor=vec4(a,b,c,d);}", i: ["u46"] }, {
                                    id: "s61", name: "_", g: "uniform sampler2D u41;uniform vec2 u53;uniform float u54;varying vec2 vv0;void main(){float f=step(.5,mod(gl_FragCoord.y+1.5,2.)),c=step(.33,vv0.x);vec4 a=texture2D(u41,vv0+u53);a.a=mix(a.a*u54,a.a,c);vec4 d=floor(255.*a),g=255.*(255.*a-d),b=mix(d,g,f)/255.;b.x=mix(step(a.x,1.5),b.x,c),gl_FragColor=b;}",
                                    i: ["u41", "u54", "u53"]
                                }]); yb(); V.buffer = new Uint8Array(8 * ea.le * da.sa()); Sa = da.fc({ lb: 0, x: 0, y: 0, ca: 1, rx: 0, ry: 0, ya: 0, rd: new Float32Array(V.ba), va: 0 }); Ba = da.fc({ detected: 0, x: 0, y: 0, s: 1, xRaw: 0, yRaw: 0, sRaw: 1, rx: 0, ry: 0, rz: 0, expressions: new Float32Array(V.ba) }); da.fc({ dx: 0, dy: 0, ec: 0, bc: 0, cc: 0, dc: 0 }); mb(); lb(); c()
                            }); return !0
                }, destroy: function () {
                    Na.m(); return new Promise(function (a) {
                        sb.toggle_pause(!0, !0).finally(function () {
                            Pa && Pa.m(); Ha.m(); Pa = Ba = Sa = null; jb.splice(0); kb.splice(0); Z.Ya = null; V.za = null; K.K = null;
                            na = ja.yc; a()
                        }).catch(function () { })
                    })
                }, toggle_videoStream: function (a) { return K.zb || !K.element ? Promise.resolve() : X.re(K.element, a, K.Ra) }, toggle_pause: function (a, c) { if (!Za()) return Promise.reject("NOT_READY"); c = c ? sb.toggle_videoStream(!a) : Promise.resolve(); a ? wb() : c.then(function () { hb() }); return c }, update_videoSettings: function (a) { wb(); return new Promise(function (c, d) { X.re(K.element, !1, K.Ra).then(function () { Object.assign(pa, a); Cb(null, null, function (g) { bb(g, function () { Ka(); Ja(); hb(); c() }) }) }).catch(d) }) },
                toggle_slow: function (a) { Za() && na === ja.play && (a && !S.Bb ? (S.Wd = S.ea, ba.nDetectsPerLoop = 1, this.set_animateDelay(ea.rg), S.Bb = !0) : !a && S.Bb && (ba.nDetectsPerLoop = -1, this.set_animateDelay(S.Wd), S.Bb = !1)) }, set_animateDelay: function (a) { S.ea = a; Na.update({ gb: S.ea }) }, resize: function () { if (!Za()) return !1; var a = S.ha.width, c = S.ha.height; if (!nb() && a === Z.u && c === Z.L) return !1; Z.u = a; Z.L = c; G.P(); mb(); lb(); Ka(); Ja(); return !0 }, set_inputTexture: function (a, c, d) {
                    K.F[0] = c; K.F[1] = d; K.K = aa.instance({ width: c, height: d, mc: a }); K.Ab =
                        !0; Ka(); ib(); Ja()
                }, reset_GLState: function () { ib(); Z.Ya.remove(); V.za.remove(); yb() }, render_video: function () { va.O(); G.set("s62"); b.viewport(0, 0, Z.u, Z.L); K.K.h(0); P.l(!0, !0) }, reset_inputTexture: function () { K.Ab = !1; K.K = K.Mc; nb(); Ka(); Ja() }, get_videoDevices: function (a) { return X.zd(a) }, set_scanSettings: function (a) { Object.assign(ba, a); -1 !== ba.nDetectsPerLoop ? qa.Ic(ba.nDetectsPerLoop) : qa.Sc(); mb(); lb() }, set_stabilizationSettings: function (a) { Object.assign(sa, a) }, set_videoOrientation: function (a, c) {
                    Za() && (pa.flipX =
                        c, pa.rotate = a, Ka(), Ja())
                }, update_videoElement: function (a, c) { bb(a ? a : K.element, function () { Ab(); Ka(); Ja(); c && c() }) }, create_new: function () { return window.JEELIZFACEFILTERGEN() }
            }; return sb
    }; window.JEELIZFACEFILTER = window.JEELIZFACEFILTERGEN();
    ; return JEELIZFACEFILTER || window.JEELIZFACEFILTER;
})();