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
  "./precache-manifest.393bbc6cda578e8823c0384e7441b2ba.js"
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
    "revision": "115d07fda0b5760b2d3b3a574c58bba7"
  },
  {
    "url": "precache-manifest.00c6af7627755d160187593be44c89ee.js",
    "revision": "00c6af7627755d160187593be44c89ee"
  },
  {
    "url": "precache-manifest.04e20a486a529b39918a181fcab0a5e7.js",
    "revision": "04e20a486a529b39918a181fcab0a5e7"
  },
  {
    "url": "precache-manifest.1985d1df3a690202d1221efd06e60aa8.js",
    "revision": "1985d1df3a690202d1221efd06e60aa8"
  },
  {
    "url": "precache-manifest.1d08110321d2584a45ddb64d5df67ffc.js",
    "revision": "1d08110321d2584a45ddb64d5df67ffc"
  },
  {
    "url": "precache-manifest.1fc235b6f9146c2dba8085836862e68b.js",
    "revision": "1fc235b6f9146c2dba8085836862e68b"
  },
  {
    "url": "precache-manifest.242e3ba8cf4bd53efb1cd7de694b3656.js",
    "revision": "242e3ba8cf4bd53efb1cd7de694b3656"
  },
  {
    "url": "precache-manifest.341932d9b0c450ca53e18843b71153c9.js",
    "revision": "341932d9b0c450ca53e18843b71153c9"
  },
  {
    "url": "precache-manifest.52c129459984f20d8386319ba3ee8d6c.js",
    "revision": "52c129459984f20d8386319ba3ee8d6c"
  },
  {
    "url": "precache-manifest.52c2a7c98768e028fef8cfe2c31590fa.js",
    "revision": "52c2a7c98768e028fef8cfe2c31590fa"
  },
  {
    "url": "precache-manifest.61796e59cbdb4136a09a896102900b4b.js",
    "revision": "61796e59cbdb4136a09a896102900b4b"
  },
  {
    "url": "precache-manifest.63ad070e9888a49568fd78150229f65c.js",
    "revision": "63ad070e9888a49568fd78150229f65c"
  },
  {
    "url": "precache-manifest.6b8f581799982e6e946d917077992623.js",
    "revision": "6b8f581799982e6e946d917077992623"
  },
  {
    "url": "precache-manifest.6ccd241b0a89c974327f80bb2b4e62f6.js",
    "revision": "6ccd241b0a89c974327f80bb2b4e62f6"
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
    "url": "precache-manifest.8005fc57b1b3dc6c8b271669d8f2dffb.js",
    "revision": "8005fc57b1b3dc6c8b271669d8f2dffb"
  },
  {
    "url": "precache-manifest.8c07c828467bb8e72ea5d6f3ab28f925.js",
    "revision": "8c07c828467bb8e72ea5d6f3ab28f925"
  },
  {
    "url": "precache-manifest.99a3415b45873f4894d19e83c5c56585.js",
    "revision": "99a3415b45873f4894d19e83c5c56585"
  },
  {
    "url": "precache-manifest.a8273d5f696cc2b37bffad9c0299932b.js",
    "revision": "a8273d5f696cc2b37bffad9c0299932b"
  },
  {
    "url": "precache-manifest.aab488d6dfbc2284ece5b22f9fc7f630.js",
    "revision": "aab488d6dfbc2284ece5b22f9fc7f630"
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
    "url": "precache-manifest.be95cb111830f79c400ea3c3de9fafcb.js",
    "revision": "be95cb111830f79c400ea3c3de9fafcb"
  },
  {
    "url": "precache-manifest.c6131668249aa3faa3e9f45294d006f3.js",
    "revision": "c6131668249aa3faa3e9f45294d006f3"
  },
  {
    "url": "precache-manifest.ff60f709ba0603d6931d022bc21cd315.js",
    "revision": "ff60f709ba0603d6931d022bc21cd315"
  },
  {
    "url": "service-worker.js",
    "revision": "2547961345a5c0c70eefaccbc4920ed9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
