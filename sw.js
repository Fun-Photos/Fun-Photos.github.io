if (!self.define) {
    let e, s = {};
    const l = (l, n) => (l = new URL(l + ".js", n).href, s[l] || new Promise((s => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = l, e.onload = s, document.head.appendChild(e)
        } else e = l, importScripts(l), s()
    })).then((() => { let e = s[l]; if (!e) throw new Error(`Module ${l} didn’t register its module`); return e })));
    self.define = (n, i) => {
        const u = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (s[u]) return;
        let t = {};
        const r = e => l(e, u),
            a = { module: { uri: u }, exports: t, require: r };
        s[u] = Promise.all(n.map((e => a[e] || r(e)))).then((e => (i(...e), t)))
    }
}
define(["./workbox-7369c0e1"], (function(e) {
    "use strict";
    self.addEventListener("message", (e => { e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting() })), e.precacheAndRoute([{ url: "app/immutable/assets/_layout-1f1af934.css", revision: null }, { url: "app/immutable/assets/_page-242694ee.css", revision: null }, { url: "app/immutable/chunks/0-7f991fcd.js", revision: null }, { url: "app/immutable/chunks/1-76bb2881.js", revision: null }, { url: "app/immutable/chunks/2-15c853a4.js", revision: null }, { url: "app/immutable/chunks/3-532f11ce.js", revision: null }, { url: "app/immutable/chunks/index-d4ff72c6.js", revision: null }, { url: "app/immutable/chunks/singletons-4b23d8b5.js", revision: null }, { url: "app/immutable/components/error.svelte-e6cfd883.js", revision: null }, { url: "app/immutable/components/pages/_layout.svelte-2b0efb65.js", revision: null }, { url: "app/immutable/components/pages/_page.svelte-63ca46e9.js", revision: null }, { url: "app/immutable/components/pages/about/_page.svelte-0a4fbb08.js", revision: null }, { url: "app/immutable/start-c40afddc.js", revision: null }, { url: "registerSW.js", revision: "402b66900e731ca748771b6fc5e7a068" }, { url: "manifest.webmanifest", revision: "41c27ad1cd571158630db8ad014d4a1c" }], {}), e.cleanupOutdatedCaches(), e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))
}));