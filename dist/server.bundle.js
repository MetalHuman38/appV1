(()=>{"use strict";var e,r,o,t,s,i={9469:(e,r,o)=>{o.d(r,{_:()=>s});var t=o(2613);const s=(0,o(7546).load)({PORT:Number,NODE_ENV:["production","development"],MORGAN:["combined","dev","tiny"],APP_NAME:String,BASE_URL:String,BASE64_ENCODED:Buffer,TRACING:Boolean,EXTRA:String,RARE_LIMIT_TIME:Number,RARE_LIMIT_WINDOW_MS:Number,MAX:Number,RARE_LIMIT_MESSAGE:String,RARE_LIMIT_CODE:Number,TRUST_PROXY:Boolean,NUMBER_OF_PROXIES:Number,IDLE_TIMEOUT:Number,COMPRESSION_LEVEL:Number,COMPRESSION_THRESHOLD:Number,ERROR_TIMEOUT:Number,RESPONSE_STATUS:String,RESPONSE_MESSAGE:String,RESPONSE_CODE:Number,RESPONSE_ERROR_CODE:Number,RESPONSE_ERROR_MESSAGE:String,RESPONSE_SERVER_ERROR:String,RESPONSE_ERROR_STATUS:String,RESPONSE_ERROR_DATA:String,RESPONSE_ERROR_STACK:String,RESPONSE_ERROR_NAME:String}),{APP_NAME:i,TRACING:n,PORT:u,MORGAN:E,NODE_ENV:l,BASE_URL:a,BASE64_ENCODED:c,EXTRA:R,RARE_LIMIT_TIME:S,RARE_LIMIT_WINDOW_MS:_,RESPONSE_ERROR_CODE:p,MAX:d,RARE_LIMIT_MESSAGE:O,RARE_LIMIT_CODE:m,TRUST_PROXY:b,NUMBER_OF_PROXIES:f,IDLE_TIMEOUT:N,COMPRESSION_LEVEL:T,COMPRESSION_THRESHOLD:h,ERROR_TIMEOUT:x}=s;if(500===p)throw new Error("Internal Server Error! No env file found!");if(t.strict.ok(n,"Tracing should be true"),t.strict.ok(8081===u,"Port should be 8081"),t.strict.ok("production"===l,"Node environment should be production"),t.strict.ok("http://localhost:8081"===a,"Base URL should be correct"),t.strict.ok(c.equals(Buffer.from("🚀")),"Base64 encoded value should match"),t.strict.ok("true"===R,"Extra should be true"),t.strict.ok(9e5===S,"Rate limit time should be 15m"),t.strict.ok(9e5===_,"Rate limit window should be 15m"),t.strict.ok(100===d,"Max should be 100"),t.strict.ok(O,"Too many requests, please try again later"),t.strict.ok(429===m,"Rate limit code should be 429"),t.strict.ok(b,"Trust proxy should be true initially"),t.strict.ok(1===f,"Number of proxies should be 1"),t.strict.ok(48e4===N,"Idle timeout should be 8m"),t.strict.ok(9===T,"Compression level should be 9"),t.strict.ok(1024===h,"Compression threshold should be 1024"),t.strict.ok(5e3===x,"Error timeout should be 5s"),!/^[a-zA-Z0-9-.]+$/.test(i))throw new Error(`Invalid APP_NAME: ${i}`)},423:e=>{e.exports=require("@sequelize/core")},5520:e=>{e.exports=require("@sequelize/mariadb")},5486:e=>{e.exports=require("bcrypt")},3268:e=>{e.exports=require("body-parser")},6898:e=>{e.exports=require("cookie-parser")},8577:e=>{e.exports=require("cors")},818:e=>{e.exports=require("dotenv")},4469:e=>{e.exports=require("dotenv/config")},7252:e=>{e.exports=require("express")},1763:e=>{e.exports=require("express-rate-limit")},2525:e=>{e.exports=require("helmet")},829:e=>{e.exports=require("jsonwebtoken")},2096:e=>{e.exports=require("morgan")},8461:e=>{e.exports=require("multer")},9031:e=>{e.exports=require("sequelize")},7546:e=>{e.exports=require("ts-dotenv")},7189:e=>{e.exports=require("validate-image-type")},2613:e=>{e.exports=require("assert")},6982:e=>{e.exports=require("crypto")},9896:e=>{e.exports=require("fs")},3024:e=>{e.exports=require("node:fs")},6760:e=>{e.exports=require("node:path")},643:e=>{e.exports=require("node:perf_hooks")},1708:e=>{e.exports=require("node:process")},3136:e=>{e.exports=require("node:url")},6928:e=>{e.exports=require("path")}},n={};function u(e){var r=n[e];if(void 0!==r)return r.exports;var o=n[e]={exports:{}};return i[e](o,o.exports,u),o.exports}u.m=i,e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",r="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",o="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",t=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},u.a=(s,i,n)=>{var u;n&&((u=[]).d=-1);var E,l,a,c=new Set,R=s.exports,S=new Promise(((e,r)=>{a=r,l=e}));S[r]=R,S[e]=e=>(u&&e(u),c.forEach(e),S.catch((e=>{}))),s.exports=S,i((s=>{var i;E=(s=>s.map((s=>{if(null!==s&&"object"==typeof s){if(s[e])return s;if(s.then){var i=[];i.d=0,s.then((e=>{n[r]=e,t(i)}),(e=>{n[o]=e,t(i)}));var n={};return n[e]=e=>e(i),n}}var u={};return u[e]=e=>{},u[r]=s,u})))(s);var n=()=>E.map((e=>{if(e[o])throw e[o];return e[r]})),l=new Promise((r=>{(i=()=>r(n)).r=0;var o=e=>e!==u&&!c.has(e)&&(c.add(e),e&&!e.d&&(i.r++,e.push(i)));E.map((r=>r[e](o)))}));return i.r?l:n()}),(e=>(e?a(S[o]=e):l(R),t(u)))),u&&u.d<0&&(u.d=0)},u.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return u.d(r,{a:r}),r},u.d=(e,r)=>{for(var o in r)u.o(r,o)&&!u.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:r[o]})},u.f={},u.e=e=>Promise.all(Object.keys(u.f).reduce(((r,o)=>(u.f[o](e,r),r)),[])),u.u=e=>e+".bundle.js",u.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s={750:1},u.f.require=(e,r)=>{s[e]||(e=>{var r=e.modules,o=e.ids,t=e.runtime;for(var i in r)u.o(r,i)&&(u.m[i]=r[i]);t&&t(u);for(var n=0;n<o.length;n++)s[o[n]]=1})(require("./"+u.u(e)))};var E=u(7252),l=u.n(E);const a=require("node:http");var c=u.n(a);const R=require("node:async_hooks");var S=u(9469);const _=require("compression");var p=u.n(_),d=u(1708),O=u.n(d),m=u(8577),b=u.n(m);u(818).config(),async function(){const e=l()();e.use(b()({origin:"http://localhost:8080",credentials:!0})),(await u.e(545).then(u.bind(u,1545))).default({app:e});const r=c().createServer(e),o=new R.AsyncLocalStorage;function t(e){const r=o.getStore();console.log(`${void 0!==r?r:"-"} ${e}`)}let s=0;r.on("connection",(e=>{const r=s++;o.run(r,(()=>{t("Client connected to server!"),e.on("close",(()=>{t("Client disconnected from server!")}))}))})),r.listen(S._.PORT,"127.0.0.1",(()=>{console.log(`Server listening on port ${S._.PORT}`)})),e.use(p()({filter:(e,r)=>!e.headers["x-no-compression"]&&p().filter(e,r),level:S._.COMPRESSION_LEVEL||9,threshold:S._.COMPRESSION_THRESHOLD||1024}));const i=S._.IDLE_TIMEOUT||48e4;let n=setTimeout((()=>{r.close((()=>{console.log("Server closed due to idle time out! Restarting...."),O().exit(0)}))}),i);e.use(((e,o,t)=>{clearTimeout(n),n=setTimeout((()=>{r.close((()=>{console.log("Cleared Time out! Restarting..."),O().exit(0)}))}),i),t()})),O().on("uncaughtExceptionMonitor",((e,r)=>{console.log("Uncaught Exception:",e,"Origin:",r),O().exit(1)})),r.on("error",(e=>{console.error(e),O().exit(1)}))}()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGNBQWNDLElBQ3BCLE1BQU1OLEVBQUtJLElBQ1hSLEVBQWtCVyxJQUFJUCxHQUFJLEtBQ3RCRixFQUFVLCtCQUNWUSxFQUFPRCxHQUFHLFNBQVMsS0FDZlAsRUFBVSxtQ0FBbUMsR0FDL0MsR0FDSixJQUVOSCxFQUFPYSxPQUFPLElBQUlySSxLQUFNLGFBQWEsS0FDakMrSCxRQUFRQyxJQUFJLDRCQUE0QixJQUFJaEksT0FBTyxJQUV2RG1ILEVBQUlDLElBQUksSUFBWSxDQUNoQmtCLE9BQVEsQ0FBQ0MsRUFBS0MsS0FDTkQsRUFBSUUsUUFBUSxxQkFHVCxXQUFtQkYsRUFBS0MsR0FFbkNFLE1BQU8sSUFBSXRILG1CQUFxQixFQUNoQ3VILFVBQVcsSUFBSXRILHVCQUF5QixRQUU1QyxNQUFNdUgsRUFBYyxJQUFJekgsY0FBZ0IsS0FDeEMsSUFBSTBILEVBQVlDLFlBQVcsS0FDdkJ0QixFQUFPdUIsT0FBTSxLQUNUaEIsUUFBUUMsSUFBSSxzREFDWixTQUFhLEVBQUUsR0FDakIsR0FDSFksR0FDSHpCLEVBQUlDLEtBQUksQ0FBQzRCLEVBQU1DLEVBQU1DLEtBQ2pCQyxhQUFhTixHQUNiQSxFQUFZQyxZQUFXLEtBQ25CdEIsRUFBT3VCLE9BQU0sS0FDVGhCLFFBQVFDLElBQUksbUNBQ1osU0FBYSxFQUFFLEdBQ2pCLEdBQ0hZLEdBQ0hNLEdBQU0sSUFFVixPQUFXLDRCQUE0QixDQUFDakUsRUFBS29DLEtBQ3pDVSxRQUFRQyxJQUFJLHNCQUF1Qi9DLEVBQUssVUFBV29DLEdBQ25ELFNBQWEsRUFBRSxJQUVuQkcsRUFBT1UsR0FBRyxTQUFTa0IsSUFDZnJCLFFBQVFxQixNQUFNQSxHQUNkLFNBQWEsRUFBRSxHQUV2QixDQUNBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwdi0xL3dlYnBhY2svcnVudGltZS9hc3luYyBtb2R1bGUiLCJ3ZWJwYWNrOi8vYXBwdi0xL3dlYnBhY2svcnVudGltZS9yZXF1aXJlIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYXBwdi0xLy4vc3JjL3NlcnZlci9jb25maWcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiQHNlcXVlbGl6ZS9jb3JlXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiQHNlcXVlbGl6ZS9tYXJpYWRiXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiYmNyeXB0XCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiYm9keS1wYXJzZXJcIiIsIndlYnBhY2s6Ly9hcHB2LTEvZXh0ZXJuYWwgY29tbW9uanMgXCJjb29raWUtcGFyc2VyXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiY29yc1wiIiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudlwiIiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBjb21tb25qcyBcImRvdGVudi9jb25maWdcIiIsIndlYnBhY2s6Ly9hcHB2LTEvZXh0ZXJuYWwgY29tbW9uanMgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzcy1yYXRlLWxpbWl0XCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiaGVsbWV0XCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwibW9yZ2FuXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwibXVsdGVyXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwic2VxdWVsaXplXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwidHMtZG90ZW52XCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwidmFsaWRhdGUtaW1hZ2UtdHlwZVwiIiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiYXNzZXJ0XCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9hcHB2LTEvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImZzXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmZzXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnBhdGhcIiIsIndlYnBhY2s6Ly9hcHB2LTEvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5vZGU6cGVyZl9ob29rc1wiIiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpwcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOnVybFwiIiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwicGF0aFwiIiwid2VicGFjazovL2FwcHYtMS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hcHB2LTEvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYXBwdi0xL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hcHB2LTEvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9hcHB2LTEvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL2FwcHYtMS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2FwcHYtMS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FwcHYtMS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibm9kZTpodHRwXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJub2RlOmFzeW5jX2hvb2tzXCIiLCJ3ZWJwYWNrOi8vYXBwdi0xL2V4dGVybmFsIGNvbW1vbmpzIFwiY29tcHJlc3Npb25cIiIsIndlYnBhY2s6Ly9hcHB2LTEvLi9zcmMvc2VydmVyL3NlcnZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3Ncbi8vIFwiMVwiIG1lYW5zIFwibG9hZGVkXCIsIG90aGVyd2lzZSBub3QgbG9hZGVkIHlldFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0NzUwOiAxXG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbnZhciBpbnN0YWxsQ2h1bmsgPSAoY2h1bmspID0+IHtcblx0dmFyIG1vcmVNb2R1bGVzID0gY2h1bmsubW9kdWxlcywgY2h1bmtJZHMgPSBjaHVuay5pZHMsIHJ1bnRpbWUgPSBjaHVuay5ydW50aW1lO1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBjaHVua0lkcy5sZW5ndGg7IGkrKylcblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMTtcblxufTtcblxuLy8gcmVxdWlyZSgpIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcbl9fd2VicGFja19yZXF1aXJlX18uZi5yZXF1aXJlID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGluc3RhbGxDaHVuayhyZXF1aXJlKFwiLi9cIiArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKSkpO1xuXHRcdH0gZWxzZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAxO1xuXHR9XG59O1xuXG4vLyBubyBleHRlcm5hbCBpbnN0YWxsIGNodW5rXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3QiLCJpbXBvcnQgeyBzdHJpY3QgYXMgYXNzZXJ0IH0gZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB7IGxvYWQgfSBmcm9tICd0cy1kb3RlbnYnO1xuY29uc3QgZW52ID0gbG9hZCh7XG4gICAgUE9SVDogTnVtYmVyLFxuICAgIE5PREVfRU5WOiBbJ3Byb2R1Y3Rpb24nLCAnZGV2ZWxvcG1lbnQnXSxcbiAgICBNT1JHQU46IFsnY29tYmluZWQnLCAnZGV2JywgJ3RpbnknXSxcbiAgICBBUFBfTkFNRTogU3RyaW5nLFxuICAgIEJBU0VfVVJMOiBTdHJpbmcsXG4gICAgQkFTRTY0X0VOQ09ERUQ6IEJ1ZmZlcixcbiAgICBUUkFDSU5HOiBCb29sZWFuLFxuICAgIEVYVFJBOiBTdHJpbmcsXG4gICAgUkFSRV9MSU1JVF9USU1FOiBOdW1iZXIsXG4gICAgUkFSRV9MSU1JVF9XSU5ET1dfTVM6IE51bWJlcixcbiAgICBNQVg6IE51bWJlcixcbiAgICBSQVJFX0xJTUlUX01FU1NBR0U6IFN0cmluZyxcbiAgICBSQVJFX0xJTUlUX0NPREU6IE51bWJlcixcbiAgICBUUlVTVF9QUk9YWTogQm9vbGVhbixcbiAgICBOVU1CRVJfT0ZfUFJPWElFUzogTnVtYmVyLFxuICAgIElETEVfVElNRU9VVDogTnVtYmVyLFxuICAgIENPTVBSRVNTSU9OX0xFVkVMOiBOdW1iZXIsXG4gICAgQ09NUFJFU1NJT05fVEhSRVNIT0xEOiBOdW1iZXIsXG4gICAgRVJST1JfVElNRU9VVDogTnVtYmVyLFxuICAgIC8qIFJvdXRlciBSZXNwb25zZSAqL1xuICAgIFJFU1BPTlNFX1NUQVRVUzogU3RyaW5nLFxuICAgIFJFU1BPTlNFX01FU1NBR0U6IFN0cmluZyxcbiAgICBSRVNQT05TRV9DT0RFOiBOdW1iZXIsXG4gICAgUkVTUE9OU0VfRVJST1JfQ09ERTogTnVtYmVyLFxuICAgIFJFU1BPTlNFX0VSUk9SX01FU1NBR0U6IFN0cmluZyxcbiAgICBSRVNQT05TRV9TRVJWRVJfRVJST1I6IFN0cmluZyxcbiAgICBSRVNQT05TRV9FUlJPUl9TVEFUVVM6IFN0cmluZyxcbiAgICBSRVNQT05TRV9FUlJPUl9EQVRBOiBTdHJpbmcsXG4gICAgUkVTUE9OU0VfRVJST1JfU1RBQ0s6IFN0cmluZyxcbiAgICBSRVNQT05TRV9FUlJPUl9OQU1FOiBTdHJpbmcsXG59KTtcbmNvbnN0IHsgQVBQX05BTUUsIFRSQUNJTkcsIFBPUlQsIE1PUkdBTiwgTk9ERV9FTlYsIEJBU0VfVVJMLCBCQVNFNjRfRU5DT0RFRCwgRVhUUkEsIFJBUkVfTElNSVRfVElNRSwgUkFSRV9MSU1JVF9XSU5ET1dfTVMsIFJFU1BPTlNFX0VSUk9SX0NPREUsIE1BWCwgUkFSRV9MSU1JVF9NRVNTQUdFLCBSQVJFX0xJTUlUX0NPREUsIFRSVVNUX1BST1hZLCBOVU1CRVJfT0ZfUFJPWElFUywgSURMRV9USU1FT1VULCBDT01QUkVTU0lPTl9MRVZFTCwgQ09NUFJFU1NJT05fVEhSRVNIT0xELCBFUlJPUl9USU1FT1VULCB9ID0gZW52O1xuaWYgKFJFU1BPTlNFX0VSUk9SX0NPREUgPT09IDUwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW50ZXJuYWwgU2VydmVyIEVycm9yISBObyBlbnYgZmlsZSBmb3VuZCEnKTtcbn1cbmFzc2VydC5vayhUUkFDSU5HLCAnVHJhY2luZyBzaG91bGQgYmUgdHJ1ZScpO1xuYXNzZXJ0Lm9rKFBPUlQgPT09IDgwODEsICdQb3J0IHNob3VsZCBiZSA4MDgxJyk7XG5hc3NlcnQub2soTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJywgJ05vZGUgZW52aXJvbm1lbnQgc2hvdWxkIGJlIHByb2R1Y3Rpb24nKTtcbmFzc2VydC5vayhCQVNFX1VSTCA9PT0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MScsICdCYXNlIFVSTCBzaG91bGQgYmUgY29ycmVjdCcpO1xuYXNzZXJ0Lm9rKEJBU0U2NF9FTkNPREVELmVxdWFscyhCdWZmZXIuZnJvbSgn8J+agCcpKSwgJ0Jhc2U2NCBlbmNvZGVkIHZhbHVlIHNob3VsZCBtYXRjaCcpO1xuYXNzZXJ0Lm9rKEVYVFJBID09PSAndHJ1ZScsICdFeHRyYSBzaG91bGQgYmUgdHJ1ZScpO1xuYXNzZXJ0Lm9rKFJBUkVfTElNSVRfVElNRSA9PT0gOTAwMDAwLCAnUmF0ZSBsaW1pdCB0aW1lIHNob3VsZCBiZSAxNW0nKTtcbmFzc2VydC5vayhSQVJFX0xJTUlUX1dJTkRPV19NUyA9PT0gOTAwMDAwLCAnUmF0ZSBsaW1pdCB3aW5kb3cgc2hvdWxkIGJlIDE1bScpO1xuYXNzZXJ0Lm9rKE1BWCA9PT0gMTAwLCAnTWF4IHNob3VsZCBiZSAxMDAnKTtcbmFzc2VydC5vayhSQVJFX0xJTUlUX01FU1NBR0UsICdUb28gbWFueSByZXF1ZXN0cywgcGxlYXNlIHRyeSBhZ2FpbiBsYXRlcicpO1xuYXNzZXJ0Lm9rKFJBUkVfTElNSVRfQ09ERSA9PT0gNDI5LCAnUmF0ZSBsaW1pdCBjb2RlIHNob3VsZCBiZSA0MjknKTtcbmFzc2VydC5vayhUUlVTVF9QUk9YWSwgJ1RydXN0IHByb3h5IHNob3VsZCBiZSB0cnVlIGluaXRpYWxseScpO1xuYXNzZXJ0Lm9rKE5VTUJFUl9PRl9QUk9YSUVTID09PSAxLCAnTnVtYmVyIG9mIHByb3hpZXMgc2hvdWxkIGJlIDEnKTtcbmFzc2VydC5vayhJRExFX1RJTUVPVVQgPT09IDQ4MDAwMCwgJ0lkbGUgdGltZW91dCBzaG91bGQgYmUgOG0nKTtcbmFzc2VydC5vayhDT01QUkVTU0lPTl9MRVZFTCA9PT0gOSwgJ0NvbXByZXNzaW9uIGxldmVsIHNob3VsZCBiZSA5Jyk7XG5hc3NlcnQub2soQ09NUFJFU1NJT05fVEhSRVNIT0xEID09PSAxMDI0LCAnQ29tcHJlc3Npb24gdGhyZXNob2xkIHNob3VsZCBiZSAxMDI0Jyk7XG5hc3NlcnQub2soRVJST1JfVElNRU9VVCA9PT0gNTAwMCwgJ0Vycm9yIHRpbWVvdXQgc2hvdWxkIGJlIDVzJyk7XG5pZiAoIS9eW2EtekEtWjAtOS0uXSskLy50ZXN0KEFQUF9OQU1FKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBBUFBfTkFNRTogJHtBUFBfTkFNRX1gKTtcbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBwb3J0OiBQT1JULFxuICAgIGFwcE5hbWU6IEFQUF9OQU1FLFxuICAgIGJhc2VVcmw6IEJBU0VfVVJMLFxuICAgIGJhc2U2NEVuY29kZWQ6IEJBU0U2NF9FTkNPREVELFxuICAgIHRyYWNpbmc6IFRSQUNJTkcsXG4gICAgZXh0cmE6IEVYVFJBLFxuICAgIHJhdGVMaW1pdFRpbWU6IFJBUkVfTElNSVRfVElNRSxcbiAgICByYXRlTGltaXRXaW5kb3dNczogUkFSRV9MSU1JVF9XSU5ET1dfTVMsXG4gICAgbWF4OiBNQVgsXG4gICAgbWVzc2FnZTogUkFSRV9MSU1JVF9NRVNTQUdFLFxuICAgIHJhdGVMaW1pdENvZGU6IFJBUkVfTElNSVRfQ09ERSxcbiAgICB0cnVzdFByb3h5OiBUUlVTVF9QUk9YWSxcbiAgICBudW1iZXJPZlByb3hpZXM6IE5VTUJFUl9PRl9QUk9YSUVTLFxuICAgIGlkbGVUaW1lb3V0OiBJRExFX1RJTUVPVVQsXG4gICAgY29tcHJlc3Npb25MZXZlbDogQ09NUFJFU1NJT05fTEVWRUwsXG4gICAgZXJyb3JUaW1lb3V0OiBFUlJPUl9USU1FT1VULFxuICAgIGxvZ3M6IHtcbiAgICAgICAgbW9yZ2FuOiBNT1JHQU4sXG4gICAgfSxcbn07XG5leHBvcnQgeyBlbnYgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBzZXF1ZWxpemUvY29yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAc2VxdWVsaXplL21hcmlhZGJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY29yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnZcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZG90ZW52L2NvbmZpZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3MtcmF0ZS1saW1pdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoZWxtZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vcmdhblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtdWx0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRzLWRvdGVudlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ2YWxpZGF0ZS1pbWFnZS10eXBlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImFzc2VydFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZTpwZXJmX2hvb2tzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGU6cHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlOnVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuYnVuZGxlLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcIm5vZGU6aHR0cFwiKTsiLCJjb25zdCBfX1dFQlBBQ0tfTkFNRVNQQUNFX09CSkVDVF9fID0gcmVxdWlyZShcIm5vZGU6YXN5bmNfaG9va3NcIik7IiwiY29uc3QgX19XRUJQQUNLX05BTUVTUEFDRV9PQkpFQ1RfXyA9IHJlcXVpcmUoXCJjb21wcmVzc2lvblwiKTsiLCJyZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IGh0dHAgZnJvbSAnbm9kZTpodHRwJzsgLy8gQ29ycmVjdGx5IGltcG9ydCB0aGUgJ2h0dHAnIG1vZHVsZVxuaW1wb3J0IHsgQXN5bmNMb2NhbFN0b3JhZ2UgfSBmcm9tICdub2RlOmFzeW5jX2hvb2tzJztcbmltcG9ydCB7IGVudiB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbic7XG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycyc7XG5hc3luYyBmdW5jdGlvbiBTdGFydFNlcnZlcigpIHtcbiAgICBjb25zdCBhcHAgPSBleHByZXNzKCk7XG4gICAgYXBwLnVzZShjb3JzKHtcbiAgICAgICAgb3JpZ2luOiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyxcbiAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgfSkpO1xuICAgIChhd2FpdCBpbXBvcnQoJy4vbG9hZGVycy9pbmRleC5qcycpKS5kZWZhdWx0KHsgYXBwIH0pO1xuICAgIGNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG4gICAgY29uc3QgYXN5bmNMb2NhbFN0b3JhZ2UgPSBuZXcgQXN5bmNMb2NhbFN0b3JhZ2UoKTtcbiAgICBmdW5jdGlvbiBsb2dXaXRoSWQobXNnKSB7XG4gICAgICAgIGNvbnN0IGlkID0gYXN5bmNMb2NhbFN0b3JhZ2UuZ2V0U3RvcmUoKTtcbiAgICAgICAgY29uc29sZS5sb2coYCR7aWQgIT09IHVuZGVmaW5lZCA/IGlkIDogJy0nfSAke21zZ31gKTtcbiAgICB9XG4gICAgbGV0IGlkU2VxID0gMDtcbiAgICBzZXJ2ZXIub24oJ2Nvbm5lY3Rpb24nLCBzb2NrZXQgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IGlkU2VxKys7XG4gICAgICAgIGFzeW5jTG9jYWxTdG9yYWdlLnJ1bihpZCwgKCkgPT4ge1xuICAgICAgICAgICAgbG9nV2l0aElkKCdDbGllbnQgY29ubmVjdGVkIHRvIHNlcnZlciEnKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nV2l0aElkKCdDbGllbnQgZGlzY29ubmVjdGVkIGZyb20gc2VydmVyIScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNlcnZlci5saXN0ZW4oZW52LlBPUlQsICcxMjcuMC4wLjEnLCAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBTZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgJHtlbnYuUE9SVH1gKTtcbiAgICB9KTtcbiAgICBhcHAudXNlKGNvbXByZXNzaW9uKHtcbiAgICAgICAgZmlsdGVyOiAocmVxLCByZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXEuaGVhZGVyc1sneC1uby1jb21wcmVzc2lvbiddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzaW9uLmZpbHRlcihyZXEsIHJlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsOiBlbnYuQ09NUFJFU1NJT05fTEVWRUwgfHwgOSxcbiAgICAgICAgdGhyZXNob2xkOiBlbnYuQ09NUFJFU1NJT05fVEhSRVNIT0xEIHx8IDEwMjQsXG4gICAgfSkpO1xuICAgIGNvbnN0IGlkbGVUaW1lb3V0ID0gZW52LklETEVfVElNRU9VVCB8fCA0ODAwMDA7XG4gICAgbGV0IGlkbGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1NlcnZlciBjbG9zZWQgZHVlIHRvIGlkbGUgdGltZSBvdXQhIFJlc3RhcnRpbmcuLi4uJyk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgIH0pO1xuICAgIH0sIGlkbGVUaW1lb3V0KTtcbiAgICBhcHAudXNlKChfcmVxLCBfcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZGxlVGltZXIpO1xuICAgICAgICBpZGxlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNlcnZlci5jbG9zZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NsZWFyZWQgVGltZSBvdXQhIFJlc3RhcnRpbmcuLi4nKTtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmV4aXQoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgaWRsZVRpbWVvdXQpO1xuICAgICAgICBuZXh0KCk7XG4gICAgfSk7XG4gICAgcHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb25Nb25pdG9yJywgKGVyciwgb3JpZ2luKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdVbmNhdWdodCBFeGNlcHRpb246JywgZXJyLCAnT3JpZ2luOicsIG9yaWdpbik7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICB9KTtcbiAgICBzZXJ2ZXIub24oJ2Vycm9yJywgZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH0pO1xufVxuU3RhcnRTZXJ2ZXIoKTtcbiJdLCJuYW1lcyI6WyJ3ZWJwYWNrUXVldWVzIiwid2VicGFja0V4cG9ydHMiLCJ3ZWJwYWNrRXJyb3IiLCJyZXNvbHZlUXVldWUiLCJpbnN0YWxsZWRDaHVua3MiLCJlbnYiLCJsb2FkIiwiUE9SVCIsIk51bWJlciIsIk5PREVfRU5WIiwiTU9SR0FOIiwiQVBQX05BTUUiLCJTdHJpbmciLCJCQVNFX1VSTCIsIkJBU0U2NF9FTkNPREVEIiwiQnVmZmVyIiwiVFJBQ0lORyIsIkJvb2xlYW4iLCJFWFRSQSIsIlJBUkVfTElNSVRfVElNRSIsIlJBUkVfTElNSVRfV0lORE9XX01TIiwiTUFYIiwiUkFSRV9MSU1JVF9NRVNTQUdFIiwiUkFSRV9MSU1JVF9DT0RFIiwiVFJVU1RfUFJPWFkiLCJOVU1CRVJfT0ZfUFJPWElFUyIsIklETEVfVElNRU9VVCIsIkNPTVBSRVNTSU9OX0xFVkVMIiwiQ09NUFJFU1NJT05fVEhSRVNIT0xEIiwiRVJST1JfVElNRU9VVCIsIlJFU1BPTlNFX1NUQVRVUyIsIlJFU1BPTlNFX01FU1NBR0UiLCJSRVNQT05TRV9DT0RFIiwiUkVTUE9OU0VfRVJST1JfQ09ERSIsIlJFU1BPTlNFX0VSUk9SX01FU1NBR0UiLCJSRVNQT05TRV9TRVJWRVJfRVJST1IiLCJSRVNQT05TRV9FUlJPUl9TVEFUVVMiLCJSRVNQT05TRV9FUlJPUl9EQVRBIiwiUkVTUE9OU0VfRVJST1JfU1RBQ0siLCJSRVNQT05TRV9FUlJPUl9OQU1FIiwiRXJyb3IiLCJvayIsImVxdWFscyIsImZyb20iLCJ0ZXN0IiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjYWNoZWRNb2R1bGUiLCJ1bmRlZmluZWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwibSIsIlN5bWJvbCIsInF1ZXVlIiwiZCIsImZvckVhY2giLCJmbiIsInIiLCJhIiwiYm9keSIsImhhc0F3YWl0IiwiY3VycmVudERlcHMiLCJvdXRlclJlc29sdmUiLCJyZWplY3QiLCJkZXBRdWV1ZXMiLCJTZXQiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWoiLCJ4IiwiZGVwcyIsIm1hcCIsImRlcCIsInRoZW4iLCJvYmoiLCJlIiwicmV0Iiwid3JhcERlcHMiLCJnZXRSZXN1bHQiLCJmblF1ZXVlIiwicSIsImhhcyIsImFkZCIsInB1c2giLCJlcnIiLCJuIiwiZ2V0dGVyIiwiX19lc01vZHVsZSIsImRlZmluaXRpb24iLCJrZXkiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiZiIsImNodW5rSWQiLCJhbGwiLCJrZXlzIiwicmVkdWNlIiwicHJvbWlzZXMiLCJ1IiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJjaHVuayIsIm1vcmVNb2R1bGVzIiwibW9kdWxlcyIsImNodW5rSWRzIiwiaWRzIiwicnVudGltZSIsImkiLCJsZW5ndGgiLCJpbnN0YWxsQ2h1bmsiLCJhc3luYyIsImFwcCIsInVzZSIsIm9yaWdpbiIsImNyZWRlbnRpYWxzIiwiZGVmYXVsdCIsInNlcnZlciIsImFzeW5jTG9jYWxTdG9yYWdlIiwiQXN5bmNMb2NhbFN0b3JhZ2UiLCJsb2dXaXRoSWQiLCJtc2ciLCJpZCIsImdldFN0b3JlIiwiY29uc29sZSIsImxvZyIsImlkU2VxIiwib24iLCJzb2NrZXQiLCJydW4iLCJsaXN0ZW4iLCJmaWx0ZXIiLCJyZXEiLCJyZXMiLCJoZWFkZXJzIiwibGV2ZWwiLCJ0aHJlc2hvbGQiLCJpZGxlVGltZW91dCIsImlkbGVUaW1lciIsInNldFRpbWVvdXQiLCJjbG9zZSIsIl9yZXEiLCJfcmVzIiwibmV4dCIsImNsZWFyVGltZW91dCIsImVycm9yIiwiU3RhcnRTZXJ2ZXIiXSwic291cmNlUm9vdCI6IiJ9