if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let o={};const c=e=>s(e,r),d={module:{uri:r},exports:o,require:c};a[r]=Promise.all(i.map((e=>d[e]||c(e)))).then((e=>(n(...e),o)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/_fNssEtPdWs-tRBf79DjW/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/_fNssEtPdWs-tRBf79DjW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/37-b87418398255340c.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/385cb88d-166214cc76497551.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/454-0e2d3d65ec240623.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/468-d41a0f1ea246c9fd.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/479ba886-6cfbf9c64f8cd67b.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/52ab8b6c-ac482fa8893831e7.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/541-76e66d9db0ac0054.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/628-dbf819ec537f341b.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/647-25b5a00ec56af732.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/94730671-3a9db860491bf58c.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/_not-found-09683efe4dffb5e6.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/callback/page-5109c8face0c2544.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/day/%5BdayNumber%5D/page-059cb4ef3d383c52.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/layout-b241c6db68a6163f.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/memo/page-4338e896884a4fe9.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/app/page-9887f9775c294781.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/fd9d1056-239949bcc199f616.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/main-app-b24c2cbdd4beb394.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/main-f794e7969828aa74.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-4b0bf3a0f41cd11d.js",revision:"_fNssEtPdWs-tRBf79DjW"},{url:"/_next/static/css/306fb3f7449616ff.css",revision:"306fb3f7449616ff"},{url:"/_next/static/css/f8e2462da64f1619.css",revision:"f8e2462da64f1619"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/android/android-launchericon-144-144.png",revision:"457e286f1d46dfc4eabbd76c997ccd32"},{url:"/android/android-launchericon-192-192.png",revision:"5a60421ba96410cbc3c8c7206b911e8e"},{url:"/android/android-launchericon-48-48.png",revision:"5d0228a949ddcba56fcddad7656fee4e"},{url:"/android/android-launchericon-512-512.png",revision:"e0f097b94e9d8e387aa9abfce81106ec"},{url:"/android/android-launchericon-72-72.png",revision:"3f9882a2b83c3786ce99d24c79961b70"},{url:"/android/android-launchericon-96-96.png",revision:"aad5c868974bf2f11d5765895fe38e05"},{url:"/chandler-removebg.png",revision:"65fc184f8922c4201e6ae00aca4664ec"},{url:"/ios/100.png",revision:"da905a8419f8ff7cbed24edb87024f11"},{url:"/ios/1024.png",revision:"8e4243430a1cb40ae4098bef3ae26f1b"},{url:"/ios/114.png",revision:"1f9cd47e5f5545b73b23db50fca7cb5e"},{url:"/ios/120.png",revision:"4ecb57cadf9cc700dff9d1c2bc1b75ce"},{url:"/ios/128.png",revision:"50f3be31e46648acc79610e18ecf888f"},{url:"/ios/144.png",revision:"457e286f1d46dfc4eabbd76c997ccd32"},{url:"/ios/152.png",revision:"a242aa38802d1b44dc3d3282a7f6e169"},{url:"/ios/16.png",revision:"2a5750bc3caec0b26f921055f26dd1ba"},{url:"/ios/167.png",revision:"7991ee5e173cf505864c487f2301701e"},{url:"/ios/180.png",revision:"d4f0cef87dc718c4f3eeeaf74ee20190"},{url:"/ios/192.png",revision:"5a60421ba96410cbc3c8c7206b911e8e"},{url:"/ios/20.png",revision:"2560d07d802c25d088924f49b4a8f79e"},{url:"/ios/256.png",revision:"6b856853c5158f0df27510e8ee05bdf2"},{url:"/ios/29.png",revision:"c99af3e6ab76322771c7fed0172c6e22"},{url:"/ios/32.png",revision:"2c39fdd88d8fb3d1837446413af9889a"},{url:"/ios/40.png",revision:"3e1f0bdfd74454a09080869992725533"},{url:"/ios/50.png",revision:"b6f2d90364bd65425898a8a4199e186b"},{url:"/ios/512.png",revision:"e0f097b94e9d8e387aa9abfce81106ec"},{url:"/ios/57.png",revision:"c38e3ace69da3c25f159f6e5eb0d7603"},{url:"/ios/58.png",revision:"ebd34119a58574ad03b37ef531676ad5"},{url:"/ios/60.png",revision:"a7fbcd0133851345ef09fd55d52a50f5"},{url:"/ios/64.png",revision:"dc47f79d491a60a01c37e4a62d85f69c"},{url:"/ios/72.png",revision:"3f9882a2b83c3786ce99d24c79961b70"},{url:"/ios/76.png",revision:"81908d814d7b88e85e636fd04cea68fa"},{url:"/ios/80.png",revision:"daa934f540ffaec1818699fa8a7388d3"},{url:"/ios/87.png",revision:"a0495a482c166bd6f128b1fdc410560c"},{url:"/manifest.json",revision:"3ca246912b4b5ba3d272d8a5fc3f32a6"},{url:"/windows11/LargeTile.scale-100.png",revision:"d06e05f00f2f7f81aaec95bddd2b2574"},{url:"/windows11/LargeTile.scale-125.png",revision:"61ca96906db4f8dd00808bf55a9ba1e0"},{url:"/windows11/LargeTile.scale-150.png",revision:"ce0e2b9583cfc93c6bdfa4f7ff23f616"},{url:"/windows11/LargeTile.scale-200.png",revision:"95cd2bfbb9fb5d31b41609384e55de5e"},{url:"/windows11/LargeTile.scale-400.png",revision:"821e238fa576dcbfa3e0652665af1010"},{url:"/windows11/SmallTile.scale-100.png",revision:"948b0836ad2df286de27be651fc2cc2d"},{url:"/windows11/SmallTile.scale-125.png",revision:"4fdbf57c3f0d3e52c74def4a807551e6"},{url:"/windows11/SmallTile.scale-150.png",revision:"be75c9e7af726f971ec821ecc63a8faa"},{url:"/windows11/SmallTile.scale-200.png",revision:"2b286066f740dc93f2a56db75ec8845b"},{url:"/windows11/SmallTile.scale-400.png",revision:"5151a5502bf4bec6f771a9f15a67b5f2"},{url:"/windows11/SplashScreen.scale-100.png",revision:"497e922f0b5a00e43ac4a8a324cc5863"},{url:"/windows11/SplashScreen.scale-125.png",revision:"97676bb58e59a2c1a6068ca3822b37e1"},{url:"/windows11/SplashScreen.scale-150.png",revision:"025d17126f514fad377ce13e5ea2d7ad"},{url:"/windows11/SplashScreen.scale-200.png",revision:"dbf7914ffc319e88818b5e59e734325b"},{url:"/windows11/SplashScreen.scale-400.png",revision:"5ba5d77dd1f1082305e3ed29f7f0baec"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"40f60c2d2b16ec82fb179633028cb1f2"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"bc8823158aad8b1d5beebe1552e8aaba"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"bf29dfe1e19e9b33ad11e208b237e115"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"95581bfc9971770dc2ad6d49ce3d1c8c"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"898d55444a4336664cf58972be5eb868"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"2a5750bc3caec0b26f921055f26dd1ba"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"2560d07d802c25d088924f49b4a8f79e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"e10046154b06189c079faa3ada6e823f"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"6b856853c5158f0df27510e8ee05bdf2"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"5c437878046e8234e897ee9d5046ba50"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"2c39fdd88d8fb3d1837446413af9889a"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"a99c552201df39f972ade90cfb85bd84"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"3e1f0bdfd74454a09080869992725533"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"0395bdf0fb400f6c651369f4220f51c6"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"5d0228a949ddcba56fcddad7656fee4e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"a7fbcd0133851345ef09fd55d52a50f5"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"dc47f79d491a60a01c37e4a62d85f69c"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"3f9882a2b83c3786ce99d24c79961b70"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"daa934f540ffaec1818699fa8a7388d3"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"aad5c868974bf2f11d5765895fe38e05"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"2a5750bc3caec0b26f921055f26dd1ba"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"2560d07d802c25d088924f49b4a8f79e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"e10046154b06189c079faa3ada6e823f"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"6b856853c5158f0df27510e8ee05bdf2"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"5c437878046e8234e897ee9d5046ba50"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"2c39fdd88d8fb3d1837446413af9889a"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"a99c552201df39f972ade90cfb85bd84"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"3e1f0bdfd74454a09080869992725533"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"0395bdf0fb400f6c651369f4220f51c6"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"5d0228a949ddcba56fcddad7656fee4e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"a7fbcd0133851345ef09fd55d52a50f5"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"dc47f79d491a60a01c37e4a62d85f69c"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"3f9882a2b83c3786ce99d24c79961b70"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"daa934f540ffaec1818699fa8a7388d3"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"aad5c868974bf2f11d5765895fe38e05"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"0395bdf0fb400f6c651369f4220f51c6"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"580ab8875859af6f5828a78dff2d0c00"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"806e645650ce5cc0b77cb44f23461fee"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"16b4a7bfeaf53e20e39813cfdbff23f7"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"e780b991daff16195f4d3ac3e6fca172"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"2a5750bc3caec0b26f921055f26dd1ba"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"2560d07d802c25d088924f49b4a8f79e"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"e10046154b06189c079faa3ada6e823f"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"6b856853c5158f0df27510e8ee05bdf2"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"5c437878046e8234e897ee9d5046ba50"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"2c39fdd88d8fb3d1837446413af9889a"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"a99c552201df39f972ade90cfb85bd84"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"3e1f0bdfd74454a09080869992725533"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"0395bdf0fb400f6c651369f4220f51c6"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"5d0228a949ddcba56fcddad7656fee4e"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"a7fbcd0133851345ef09fd55d52a50f5"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"dc47f79d491a60a01c37e4a62d85f69c"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"3f9882a2b83c3786ce99d24c79961b70"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"daa934f540ffaec1818699fa8a7388d3"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"aad5c868974bf2f11d5765895fe38e05"},{url:"/windows11/StoreLogo.scale-100.png",revision:"7164860743d4d23760b745f936ec9e04"},{url:"/windows11/StoreLogo.scale-125.png",revision:"0ffeabf61f2bc302a07c13587a891e19"},{url:"/windows11/StoreLogo.scale-150.png",revision:"cd1c829b9a6925c17bfe85320136b26f"},{url:"/windows11/StoreLogo.scale-200.png",revision:"370c8c32f3967fa679c8adeda02e461b"},{url:"/windows11/StoreLogo.scale-400.png",revision:"1b0f4c4ffd47193b5ba6c9faa048ab8a"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"be6c1bc49353cda1e1aa1e3bbe5efeda"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"48a8d613dbfb3a90552e49bb4981a70a"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"ca81ef37611e9f6f1ab2444b4502cbad"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"497e922f0b5a00e43ac4a8a324cc5863"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"dbf7914ffc319e88818b5e59e734325b"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
