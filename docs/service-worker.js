/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

importScripts(
  "./precache-manifest.aab488d6dfbc2284ece5b22f9fc7f630.js"
);

workbox.core.setCacheNameDetails({prefix: "easy-wallet"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "22470341abafb80d403c2135ce588fd3"
  },
  {
    "url": "precache-manifest.1d08110321d2584a45ddb64d5df67ffc.js",
    "revision": "1d08110321d2584a45ddb64d5df67ffc"
  },
  {
    "url": "precache-manifest.341932d9b0c450ca53e18843b71153c9.js",
    "revision": "341932d9b0c450ca53e18843b71153c9"
  },
  {
    "url": "precache-manifest.52c2a7c98768e028fef8cfe2c31590fa.js",
    "revision": "52c2a7c98768e028fef8cfe2c31590fa"
  },
  {
    "url": "precache-manifest.7270771877e1a176af0745d4ea731805.js",
    "revision": "7270771877e1a176af0745d4ea731805"
  },
  {
    "url": "precache-manifest.7add9c452573b0ffa1b41d2e65c0e9b1.js",
    "revision": "7add9c452573b0ffa1b41d2e65c0e9b1"
  },
  {
    "url": "precache-manifest.ac5168d96d0b96a68176ad06aa7420cf.js",
    "revision": "ac5168d96d0b96a68176ad06aa7420cf"
  },
  {
    "url": "precache-manifest.be4b47352934e0d5881e455f5f01d805.js",
    "revision": "be4b47352934e0d5881e455f5f01d805"
  },
  {
    "url": "service-worker.js",
    "revision": "c3bffb8ac0475194148386fa51109b91"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
