// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"2LoNz":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "115aafd9a7b20bd9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"kTSxR":[function(require,module,exports) {
const Ayoayo = require("d44e7f0492b7405f");
/**
 * @typedef {import ("../package")} Ayoayo
 *
 */ /**
 * @type {Ayoayo}
 */ let game;
let currentEvent;
let eventQueue = [];
const pits = document.querySelectorAll(".pit");
const board = document.querySelector(".board");
const players = document.querySelectorAll(".player");
const helpModalBg = document.querySelector(".modal-bg");
const helpModal = document.querySelector(".help-modal");
const sowingHand = document.querySelector(".hand.sowing");
const turnBadges = document.querySelectorAll(".turn-badge");
const capturingHand = document.querySelector(".hand.capturing");
const winnerBadges = document.querySelectorAll(".winner-badge");
const noGamePadding = document.querySelector(".no-game-padding");
const closeHelpModal = document.querySelector(".help-modal-close");
const helpButton = document.querySelector(".controls button.help");
const newAiGameButton = document.querySelector(".controls button.ai");
const newPvPGameButton = document.querySelector(".controls button.pvp");
function getPitAtPosition(row, column) {
    return document.querySelector(`.side-${row + 1} .pit-${column + 1}`);
}
function getPitPosition(row, column) {
    const pit = getPitAtPosition(row, column);
    const pitRect = pit.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    return [
        pitRect.x - boardRect.x,
        pitRect.y - boardRect.y
    ];
}
function getPitSummary(pit) {
    return pit.parentElement.querySelector(".pit-summary");
}
function setSummaryTextContent(elem, count) {
    elem.textContent = count === 0 ? "" : String(count);
}
function captureStoreByPlayer(player) {
    return document.querySelector(`.player-${player + 1} .captured`);
}
function getCaptureStorePosition(player) {
    const captureStore = captureStoreByPlayer(player);
    const captureStoreRect = captureStore.getBoundingClientRect();
    const boardRect = board.getBoundingClientRect();
    return [
        captureStoreRect.x - boardRect.x,
        captureStoreRect.y - boardRect.y
    ];
}
function getCaptureStoreSummary(captureStore) {
    return captureStore.querySelector(".pit-summary");
}
function finishLastCapture() {
    // get seeds in capturing hand
    const seedsInCapturingHand = capturingHand.querySelectorAll(".seed");
    // get player that's capturing
    const playerThatCaptured = capturingHand.style.top[0] === "-" ? 0 : 1;
    const captureStore = captureStoreByPlayer(playerThatCaptured);
    seedsInCapturingHand.forEach((seed)=>{
        // remove seed from capturing hand
        capturingHand.removeChild(seed);
        // add it to the capture store of the player capturing
        captureStore.appendChild(seed);
    });
    // get the pit for player capture store
    const pitSummary = getCaptureStoreSummary(captureStore);
    // update the count of seeds captured
    setSummaryTextContent(pitSummary, Number(pitSummary.textContent) + seedsInCapturingHand.length);
}
function updateTurnBadges(nextPlayer) {
    // get the other player
    const otherPlayer = Ayoayo.togglePlayer(nextPlayer);
    // show player turn text
    turnBadges.item(nextPlayer).style.display = "inline-block";
    // hode other player turn text
    turnBadges.item(otherPlayer).style.display = "none";
}
function handlePickupSeedsEvent(event, fractionDone) {
    if (fractionDone === 0) {
        // event emitted row and column
        const [row, column] = event.args;
        // get position relative to the board
        const [handX, handY] = getPitPosition(row, column);
        sowingHand.style.left = `${handX}px`;
        sowingHand.style.top = `${handY}px`;
        // get pit
        const pit = getPitAtPosition(row, column);
        // get all seeds in a pit
        const seeds = pit.querySelectorAll(".seed");
        // remove seeds from pit and put in sowing hand
        seeds.forEach((seed)=>{
            pit.removeChild(seed);
            sowingHand.appendChild(seed);
        });
        // set the text summary of pit to zero
        setSummaryTextContent(getPitSummary(pit), 0);
    }
}
function handleMoveToEvent(event, fractionDone) {
    const [[initialRow, initialColumn], [nextRow, nextColumn]] = event.args;
    // get pit position for initial pit before move
    const [initialPitX, initialPitY] = getPitPosition(initialRow, initialColumn);
    // get next pit position
    const [nextPitX, nextPitY] = getPitPosition(nextRow, nextColumn);
    // get current hand position
    const currentHandX = initialPitX + fractionDone * (nextPitX - initialPitX);
    const currentHandY = initialPitY + fractionDone * (nextPitY - initialPitY);
    // move hand to next position
    sowingHand.style.left = `${currentHandX}px`;
    sowingHand.style.top = `${currentHandY}px`;
    // show capturing of seeds
    finishLastCapture();
}
function handleDropSeedEvent(event, fractionDone) {
    if (fractionDone === 0) {
        const seedInHand = sowingHand.querySelector(".seed");
        // remove seed from current pit
        sowingHand.removeChild(seedInHand);
        const [row, column] = event.args;
        const pit = getPitAtPosition(row, column);
        // add seed to next pit
        pit.appendChild(seedInHand);
        // get the number of seeds and increase by one
        const pitSummary = getPitSummary(pit);
        setSummaryTextContent(pitSummary, Number(pitSummary.textContent) + 1);
    }
}
function handleSwitchTurnEvent(event, fractionDone) {
    if (fractionDone === 0) {
        const [nextPlayer] = event.args;
        // switch the turn badge
        updateTurnBadges(nextPlayer);
    }
}
function handleCaptureEvent(event, fractionDone) {
    /**
   * in the final turn, multiple captures happen consecutively
   * and need to be cleaned up before the next one.
   */ if (fractionDone === 0) finishLastCapture();
    const [row, column, capturingPlayer] = event.args;
    // get pit position
    const pit = getPitAtPosition(row, column);
    // get seeds inside pit
    const seedsInPit = pit.querySelectorAll(".seed");
    seedsInPit.forEach((seed)=>{
        // remove seed from pit
        pit.removeChild(seed);
        // add seed to capturing hand
        capturingHand.appendChild(seed);
    });
    // get the pit position so that the hand can show there
    const [pitX, pitY] = getPitPosition(row, column);
    // get the capture stor position
    const [captureStoreX, captureStoreY] = getCaptureStorePosition(capturingPlayer);
    const currentHandX = pitX + fractionDone * (captureStoreX - pitX);
    const currentHandY = pitY + fractionDone * (captureStoreY - pitY);
    capturingHand.style.left = `${currentHandX}px`;
    capturingHand.style.top = `${currentHandY}px`;
    setSummaryTextContent(getPitSummary(pit), 0);
}
function handleGameOverEvent(event, fractionDone) {
    if (fractionDone === 0) {
        finishLastCapture();
        const [winner] = event.args;
        // remove turn text
        turnBadges.forEach((badge)=>{
            badge.style.display = "none";
        });
        // handle draw
        if (winner === -1) {
            winnerBadges.forEach((badge)=>{
                badge.textContent = "Draw!";
                badge.style.display = "inline-block";
            });
            return;
        }
        const badge = winnerBadges.item(winner);
        badge.textContent = "Winner!";
        badge.style.display = "inline-block";
    }
}
const eventTypeToHandler = {
    [Ayoayo.events.PICKUP_SEEDS]: handlePickupSeedsEvent,
    [Ayoayo.events.MOVE_TO]: handleMoveToEvent,
    [Ayoayo.events.DROP_SEED]: handleDropSeedEvent,
    [Ayoayo.events.SWITCH_TURN]: handleSwitchTurnEvent,
    [Ayoayo.events.CAPTURE]: handleCaptureEvent,
    [Ayoayo.events.GAME_OVER]: handleGameOverEvent
};
const DEFAULT_EVENT_DURATION = 200;
function styleSeed(seed) {
    const parentWidth = seed.parentElement.clientWidth;
    // by how much will the random position extend
    const range = 40 * parentWidth / 90;
    // from what point
    const offset = -20 * parentWidth / 90;
    const r = Math.round(Math.random() * 360);
    const x = Math.round(Math.random() * range) + offset;
    const y = Math.round(Math.random() * range) + offset;
    seed.style.transform = `rotate(${r}deg) translate(${x}px, ${y}px)`;
}
function initSeedStore(store, count) {
    // empty out pits
    store.querySelectorAll(".seed").forEach((seed)=>{
        store.removeChild(seed);
    });
    for(let i = 0; i < count; i++){
        // create the seeds
        const seed = document.createElement("div");
        seed.classList.add("seed");
        // add seed to pit
        store.appendChild(seed);
        styleSeed(seed);
    }
}
function enableOnlyPermissiblePits() {
    const nextPlayer = game.nextPlayer;
    const otherPlayer = Ayoayo.togglePlayer(game.nextPlayer);
    // disable pits for other player
    game.board[otherPlayer].forEach((_cell, cellIndex)=>{
        const pit = getPitAtPosition(otherPlayer, cellIndex);
        pit.classList.add("disabled");
    });
    // disable pits that are not part of permissible moves
    game.board[nextPlayer].forEach((_cell, cellIndex)=>{
        const pit = getPitAtPosition(nextPlayer, cellIndex);
        if (game.permissibleMoves.includes(cellIndex)) pit.classList.remove("disabled");
        else pit.classList.add("disabled");
    });
}
/**
 *
 * @param {Ayoayo} game
 */ function initDisplay(game) {
    // set in-game seeds
    game.board.forEach((row, rowIndex)=>{
        row.forEach((cell, cellIndex)=>{
            const pit = getPitAtPosition(rowIndex, cellIndex);
            initSeedStore(pit, cell);
            setSummaryTextContent(getPitSummary(pit), cell);
        });
    });
    // set captured seeds
    game.captured.forEach((capturedCount, index)=>{
        const capturedStore = captureStoreByPlayer(index);
        initSeedStore(capturedStore, capturedCount);
        setSummaryTextContent(getCaptureStoreSummary(capturedStore), capturedCount);
    });
    // clear seeds in hands
    [
        sowingHand,
        capturingHand
    ].forEach((hand)=>{
        const seedInHand = hand.querySelectorAll(".seed");
        seedInHand.forEach((seed)=>{
            hand.removeChild(seed);
        });
    });
    // hide winner badges
    winnerBadges.forEach((badge)=>{
        badge.style.display = "none";
    });
    // update turn badge
    updateTurnBadges(game.nextPlayer);
    // allow only permissible pits
    enableOnlyPermissiblePits();
}
function onGameEvent(type) {
    return function(...args) {
        eventQueue.push({
            type,
            args
        });
    };
}
const onPickupSeeds = onGameEvent(Ayoayo.events.PICKUP_SEEDS);
const onMoveTo = onGameEvent(Ayoayo.events.MOVE_TO);
const onDropSeed = onGameEvent(Ayoayo.events.DROP_SEED);
const onSwitchTurn = onGameEvent(Ayoayo.events.SWITCH_TURN);
const onCapture = onGameEvent(Ayoayo.events.CAPTURE);
const onGameOver = onGameEvent(Ayoayo.events.GAME_OVER);
function onNewGame(playerTwoName) {
    game.on(Ayoayo.events.PICKUP_SEEDS, onPickupSeeds);
    game.on(Ayoayo.events.MOVE_TO, onMoveTo);
    game.on(Ayoayo.events.DROP_SEED, onDropSeed);
    game.on(Ayoayo.events.SWITCH_TURN, onSwitchTurn);
    game.on(Ayoayo.events.CAPTURE, onCapture);
    game.on(Ayoayo.events.GAME_OVER, onGameOver);
    players.forEach((player, index)=>{
        player.style.display = "block";
        if (index === 1) {
            const playerName = player.querySelector(".player-name");
            // show player name (either player 2 or AI)
            playerName.textContent = playerTwoName;
        }
    });
    noGamePadding.style.display = "none";
    initDisplay(game);
    // reset the event and event queue
    currentEvent = null;
    eventQueue = [];
}
function onClickNewPvPGame() {
    game = new Ayoayo();
    onNewGame("Player 2");
}
function onClickNewAiGame() {
    game = Ayoayo.vsMinimax();
    onNewGame("AI");
}
newAiGameButton.addEventListener("click", onClickNewAiGame);
newPvPGameButton.addEventListener("click", onClickNewPvPGame);
helpButton.addEventListener("click", ()=>{
    helpModalBg.style.display = "block";
    helpModalBg.style.opacity = 1;
    helpModal.style.display = "flex";
    helpModal.style.opacity = 1;
});
closeHelpModal.addEventListener("click", ()=>{
    helpModalBg.style.display = "none";
    helpModalBg.style.opacity = 0;
    helpModal.style.display = "none";
    helpModal.style.opacity = 0;
});
helpModalBg.addEventListener("click", ()=>{
    helpModal.style.opacity = 0;
    helpModal.style.display = "none";
    helpModalBg.style.opacity = 0;
    helpModalBg.style.display = "none";
});
function onClickPit(evt) {
    // only fire if pit isn't disabled
    if (game && !evt.currentTarget.classList.contains("disabled")) {
        // e.g. "3" is in index 4 in "pit-3"
        const startIndexOfCellIndex = 4;
        const cellIndex = evt.currentTarget.classList.toString().split(" ").find((className)=>className.includes("pit-"))[startIndexOfCellIndex];
        game.play(cellIndex - 1);
    }
}
document.querySelectorAll(".side .pit").forEach((pit)=>{
    pit.addEventListener("click", onClickPit);
});
function init() {
    const seeds = document.querySelectorAll(".seed");
    seeds.forEach((seed)=>{
        styleSeed(seed);
    });
}
init();
function handleEventQueue(time) {
    if (!currentEvent) {
        if (eventQueue.length === 0) {
            window.requestAnimationFrame(handleEventQueue);
            return;
        }
        currentEvent = eventQueue.shift();
        currentEvent.start = time;
    }
    const fractionDone = (time - currentEvent.start) / DEFAULT_EVENT_DURATION;
    if (fractionDone > 1) {
        // end of animation. enable permissible pits
        if (eventQueue.length === 0) enableOnlyPermissiblePits();
        // reset current event
        currentEvent = null;
        // update animation before next repaint
        window.requestAnimationFrame(handleEventQueue);
        return;
    }
    // disable all pits during animations
    pits.forEach((pit)=>{
        pit.classList.add("disabled");
    });
    const handler = eventTypeToHandler[currentEvent.type];
    handler(currentEvent, fractionDone);
    // update animation
    window.requestAnimationFrame(handleEventQueue);
}
window.requestAnimationFrame(handleEventQueue);

},{"d44e7f0492b7405f":"42d1T"}],"42d1T":[function(require,module,exports) {
const events = require("ec2aeab1cd09cac4");
const minimax = require("f4ccea25c89c60b7");
class Ayoayo extends events.EventEmitter {
    // game events
    static events = {
        GAME_OVER: "game_over",
        DROP_SEED: "drop_seed",
        SWITCH_TURN: "switch_turn",
        MOVE_TO: "move_to",
        PICKUP_SEEDS: "pickup_seeds",
        CAPTURE: "capture"
    };
    constructor(){
        super();
        /*
    * The board
    * sideways i.e. => is the row (nextPositionRow)
    * downward or each individual item in the row is the cell (nextPositionCell)
    */ this.board = [
            [
                4,
                4,
                4,
                4,
                4,
                4
            ],
            [
                4,
                4,
                4,
                4,
                4,
                4
            ]
        ];
        // number of captured seeds
        this.captured = [
            0,
            0
        ];
        // next player
        this.nextPlayer = 0;
        // game over flag
        this.isGameOver = false;
        // winner
        this.winner = null;
        // permissible moves that can be made
        this.permissibleMoves = [
            0,
            1,
            2,
            3,
            4,
            5
        ];
        // total number of seed in the game i.e. 12 * 4
        this.TOTAL_NUM_SEEDS = 48;
        // number of cells in a row
        this.NUM_CELLS_PER_ROW = 6;
    }
    /**
   * cell in the board
   * @param {number} cell
   */ play(cell) {
        if (!this.permissibleMoves.includes(cell)) throw new Error("Not permitted to play this cell");
        // relay-sow. update board and increment captures
        let captured;
        [this.board, captured] = this.#relaySow(this.board, this.nextPlayer, cell, (eventType, ...args)=>this.emit(eventType, ...args));
        this.captured[0] += captured[0];
        this.captured[1] += captured[1];
        // Toggle to next player
        this.nextPlayer = Ayoayo.togglePlayer(this.nextPlayer);
        this.emit(Ayoayo.events.SWITCH_TURN, this.nextPlayer);
        // get the next player permissible moves
        this.permissibleMoves = this.#getPermissibleMoves(this.board, this.nextPlayer);
        /**
     * no point in proceeding if next player has no more moves
     * or if someone has more than half of the seeds
     */ const shouldEndGame = this.permissibleMoves.length === 0 || this.captured.some((count)=>count > this.TOTAL_NUM_SEEDS / 2);
        // capture the remaining seeds if the opponent is out of moves
        const shouldCaptureRemainingSeeds = this.permissibleMoves.length === 0;
        if (shouldCaptureRemainingSeeds) {
            let numberOfRemainingSeeds = 0;
            this.board[this.nextPlayer] = this.board[this.nextPlayer].map((cell, index)=>{
                numberOfRemainingSeeds += cell;
                this.emit(Ayoayo.events.CAPTURE, this.nextPlayer, index, this.nextPlayer);
                return 0;
            });
            this.captured[this.nextPlayer] += numberOfRemainingSeeds;
        }
        if (shouldEndGame) {
            this.permissibleMoves = [];
            this.isGameOver = true;
            this.winner = this.#getWinner(this.captured);
            this.emit(Ayoayo.events.GAME_OVER, this.winner);
        }
    }
    /**
   * Sow the seeds starting from cell
   * Returns the updated board and number of captured seeds
   * Reports events by calling emit
   *
   * @param {*} board game board
   * @param {*} player current player
   * @param {*} cell current cell picking from
   * @param {*} emit  emit events while sowing
   */ #relaySow(board, player, cell, emit = ()=>{}) {
        const captured = [
            0,
            0
        ];
        // pick up seeds
        let numberOfSeedsInHand = board[player][cell];
        emit(Ayoayo.events.PICKUP_SEEDS, player, cell);
        board[player][cell] = 0;
        // move to next cell position
        let nextPosition = this.#next(player, cell);
        emit(Ayoayo.events.MOVE_TO, [
            player,
            cell
        ], nextPosition);
        let [nextPositionRow, nextPositionCell] = nextPosition;
        /*
      * continue to move. Terminate when all seeds have been dropped
      * and can't pickup again.
      */ while(numberOfSeedsInHand > 0){
            // drop one seed in next cell
            board[nextPositionRow][nextPositionCell]++;
            numberOfSeedsInHand--;
            emit(Ayoayo.events.DROP_SEED, nextPositionRow, nextPositionCell);
            /**
       * If the cell has four seeds then capture. If this is the last seed in hand,
       * give the current player. If not, give to the owner of the row.
       */ if (board[nextPositionRow][nextPositionCell] === 4) {
                const capturer = numberOfSeedsInHand === 0 ? player : nextPositionRow;
                captured[capturer] += 4;
                // make the seeds in the captured cell zero
                board[nextPositionRow][nextPositionCell] = 0;
                emit(Ayoayo.events.CAPTURE, nextPositionRow, nextPositionCell, capturer);
            }
            /**
       * relay if this is the last seed in hand and the cell was not originally empty
       * pickup the seeds in the cell so before dropping the last seed the cell had one or
       * more seeds
       */ if (numberOfSeedsInHand === 0 && board[nextPositionRow][nextPositionCell] > 1) {
                // pickup all seeds in the cell
                numberOfSeedsInHand = board[nextPositionRow][nextPositionCell];
                // set the seeds in the cell to zero
                board[nextPositionRow][nextPositionCell] = 0;
                emit(Ayoayo.events.PICKUP_SEEDS, nextPositionRow, nextPositionCell);
            }
            // move to next position
            nextPosition = this.#next(nextPositionRow, nextPositionCell);
            emit(Ayoayo.events.MOVE_TO, [
                nextPositionRow,
                nextPositionCell
            ], nextPosition);
            [nextPositionRow, nextPositionCell] = nextPosition;
        }
        return [
            board,
            captured
        ];
    }
    /**
   * Toggles players
   *
   * @param {number} player current player
   * @returns {number} other player
   */ static togglePlayer(player) {
        return (player + 1) % 2;
    }
    /**
   * Returns a list of all possible cells that the next player can play
   * A player must only play cells with at least one seed.
   * If the other player has no seeds, the current player must "feed" them if possible
   *
   * @param {Array[]} board game board
   * @param {number} player current player
   * @returns {number[]}
   */ #getPermissibleMoves(board1, player1) {
        const otherPlayer = Ayoayo.togglePlayer(player1);
        // get the non empty cells the player has
        const nonEmptyCellIndexes = board1[player1].map((_, index)=>index).filter((seeds)=>board1[player1][seeds] > 0);
        // if the other player has seeds, permit all non-empty cells
        const otherPlayerHasSeeds = board1[otherPlayer].some((cell)=>cell > 0);
        if (otherPlayerHasSeeds) return nonEmptyCellIndexes;
        // if other player has no seeds, permit only non-empty cells that feed them
        return nonEmptyCellIndexes.filter((cellIndex)=>{
            // clone board
            const boardCopy = board1.map((row)=>row.slice());
            // simulate the play
            const [boardIfCellPlayed] = this.#relaySow(boardCopy, player1, cellIndex);
            // return if the play would lead to non empty cells
            return boardIfCellPlayed[otherPlayer].some((cell)=>cell > 0);
        });
    }
    /**
   * returns the winning player, or -1, if draw
   * @param {Number[]} captured
   * @returns
   */ #getWinner(captured) {
        if (captured[0] === captured[1]) return -1;
        if (captured[0] > captured[1]) return 0;
        return 1;
    }
    /**
   *  Returns the next position moving counter-clockwise from the given row and cell
   * @param {number} row row number on board
   * @param {number} cell cell number on board
   * @returns {number[]}
   */ #next(row, cell1) {
        if (row === 0) return cell1 === 0 ? [
            1,
            0
        ] : [
            0,
            cell1 - 1
        ];
        return cell1 === this.NUM_CELLS_PER_ROW - 1 ? [
            0,
            this.NUM_CELLS_PER_ROW - 1
        ] : [
            1,
            cell1 + 1
        ];
    }
    /**
   * Returns a copy of the game state. event listeners are not copied
   */ clone() {
        const clone = new Ayoayo();
        clone.winner = this.winner;
        clone.captured = this.captured.slice();
        clone.board = this.board.map((row)=>row.slice());
        clone.permissibleMoves = this.permissibleMoves.slice();
        clone.nextPlayer = this.nextPlayer;
        return clone;
    }
    static vsMinimax(depth = 5) {
        const game = new Ayoayo();
        const oldPlayFunc = game.play.bind(game);
        game.play = function minimaxPlay(...args) {
            oldPlayFunc(...args);
            if (game.winner == null) {
                const [, moves] = minimax(game, depth, "", game.nextPlayer === 0);
                const move = Number(moves[0]);
                oldPlayFunc(move);
            }
        };
        return game;
    }
}
module.exports = Ayoayo;

},{"ec2aeab1cd09cac4":"1VQLm","f4ccea25c89c60b7":"70vbZ"}],"1VQLm":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
};
else ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
};
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === "error";
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
        // At least give some kind of context to the user
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === "function") ReflectApply(handler, this, args);
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit("newListener", type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === "function") // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [
            listener,
            existing
        ] : [
            existing,
            listener
        ];
        else if (prepend) existing.unshift(listener);
        else existing.push(listener);
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
            w.name = "MaxListenersExceededWarning";
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
        }
    } else if (typeof list !== "function") {
        position = -1;
        for(i = list.length - 1; i >= 0; i--)if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else spliceOne(list, position);
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === "removeListener") continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === "function") this.removeListener(type, listeners);
    else if (listeners !== undefined) // LIFO order
    for(i = listeners.length - 1; i >= 0; i--)this.removeListener(type, listeners[i]);
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === "function") return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
    else return listenerCount.call(emitter, type);
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === "function") return 1;
        else if (evlistener !== undefined) return evlistener.length;
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i)ret[i] = arr[i].listener || arr[i];
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
            resolve([].slice.call(arguments));
        }
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, {
            once: true
        });
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
        if (flags.once) emitter.once(name, listener);
        else emitter.on(name, listener);
    } else if (typeof emitter.addEventListener === "function") // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
        // IE does not have builtin `{ once: true }` support so we
        // have to do it manually.
        if (flags.once) emitter.removeEventListener(name, wrapListener);
        listener(arg);
    });
    else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
}

},{}],"70vbZ":[function(require,module,exports) {
// Implements minimax. Returns the min/max-ed score and list of moves.
// Score is specified as P1's score minus P2's score.
/**
 * @typedef {import ("./index")} Ayoayo
 *
 */ /**
 *
 * @param {Ayoayo} game Ayoayo game
 * @param {Number} depth minimax depth
 * @param {Number} moves
 * @param {Boolean} maximizing maximiazing flag
 * @returns {Number[]}
 */ function minimax(game, depth, moves, maximizing) {
    if (depth === 0 || game.winner != null) return [
        game.captured[0] - game.captured[1],
        moves
    ];
    if (maximizing) {
        let maxScore = -Infinity;
        let maxMoves;
        game.permissibleMoves.forEach((move)=>{
            const gameCopy = game.clone();
            gameCopy.play(move);
            const [score, childMoves] = minimax(gameCopy, depth - 1, moves + move, false);
            if (score > maxScore) {
                maxScore = score;
                maxMoves = childMoves;
            }
        });
        return [
            maxScore,
            maxMoves
        ];
    } else {
        let minScore = Infinity;
        let minMoves;
        game.permissibleMoves.forEach((move)=>{
            const gameCopy = game.clone();
            gameCopy.play(move);
            const [score, childMoves] = minimax(gameCopy, depth - 1, moves + move, true);
            if (score < minScore) {
                minScore = score;
                minMoves = childMoves;
            }
        });
        return [
            minScore,
            minMoves
        ];
    }
}
module.exports = minimax;

},{}]},["2LoNz","kTSxR"], "kTSxR", "parcelRequire1ff0")

//# sourceMappingURL=index.a7b20bd9.js.map
