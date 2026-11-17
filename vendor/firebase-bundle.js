/* Firebase JS SDK 11.10.0 (app, auth, firestore, database), bundled locally so nothing loads from gstatic.com.
   Apache License 2.0, https://github.com/firebase/firebase-js-sdk */
(()=>{var vm=()=>{};var au={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};var D=function(n,e){if(!n)throw Nn(e)},Nn=function(n){return new Error("Firebase Database ("+au.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};var Em=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},sE=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],c=n[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},po={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,c=o?n[i+1]:0,u=i+2<n.length,l=u?n[i+2]:0,f=s>>2,p=(s&3)<<4|c>>4,m=(c&15)<<2|l>>6,I=l&63;u||(I=64,o||(m=64)),r.push(t[f],t[p],t[m],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Em(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):sE(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let l=i<n.length?t[n.charAt(i)]:64;++i;let p=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||l==null||p==null)throw new cu;let m=s<<2|c>>4;if(r.push(m),l!==64){let I=c<<4&240|l>>2;if(r.push(I),p!==64){let C=l<<6&192|p;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},cu=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},lu=function(n){let e=Em(n);return po.encodeByteArray(e,!0)},Di=function(n){return lu(n).replace(/\./g,"")},gr=function(n){try{return po.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Tm(n){return bm(void 0,n)}function bm(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(let t in e)!e.hasOwnProperty(t)||!oE(t)||(n[t]=bm(n[t],e[t]));return n}function oE(n){return n!=="__proto__"}function Am(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var aE=()=>Am().__FIREBASE_DEFAULTS__,cE=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},uE=()=>{if(typeof document=="undefined")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&gr(n[1]);return e&&JSON.parse(e)},mo=()=>{try{return vm()||aE()||cE()||uE()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},hu=n=>{var e,t;return(t=(e=mo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},du=n=>{let e=hu(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},fu=()=>{var n;return(n=mo())===null||n===void 0?void 0:n.config},pu=n=>{var e;return(e=mo())===null||e===void 0?void 0:e[`_${n}`]};var Ge=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function ut(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function yr(n){return(await fetch(n,{credentials:"include"})).ok}function mu(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Di(JSON.stringify(t)),Di(JSON.stringify(o)),""].join(".")}var ki={};function lE(){let n={prod:[],emulator:[]};for(let e of Object.keys(ki))ki[e]?n.emulator.push(e):n.prod.push(e);return n}function hE(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}var wm=!1;function Oi(n,e){if(typeof window=="undefined"||typeof document=="undefined"||!ut(window.location.host)||ki[n]===e||ki[n]||wm)return;ki[n]=e;function t(m){return`__firebase__banner__${m}`}let r="__firebase__banner",s=lE().prod.length>0;function o(){let m=document.getElementById(r);m&&m.remove()}function c(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function u(m,I){m.setAttribute("width","24"),m.setAttribute("id",I),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function l(){let m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{wm=!0,o()},m}function f(m,I){m.setAttribute("id",I),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function p(){let m=hE(r),I=t("text"),C=document.getElementById(I)||document.createElement("span"),k=t("learnmore"),P=document.getElementById(k)||document.createElement("a"),B=t("preprendIcon"),U=document.getElementById(B)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){let W=m.element;c(W),f(P,k);let re=l();u(U,B),W.append(U,C,P,re),document.body.appendChild(W)}s?(C.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,C.innerText="Preview backend running in this workspace."),C.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}function Te(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xi(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Te())}function dE(){var n;let e=(n=mo())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sm(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function Cm(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function go(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Rm(){let n=Te();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function _t(){return au.NODE_CLIENT===!0||au.NODE_ADMIN===!0}function Pm(){return!dE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function gu(){try{return typeof indexedDB=="object"}catch{return!1}}function Nm(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var fE="FirebaseError",Je=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=fE,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ot.prototype.create)}},Ot=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?pE(s,r):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new Je(i,c,r)}};function pE(n,e){return n.replace(mE,(t,r)=>{let i=e[r];return i!=null?String(i):`<${r}?>`})}var mE=/\{\$([^}]+)}/g;function _r(n){return JSON.parse(n)}function Ee(n){return JSON.stringify(n)}var km=function(n){let e={},t={},r={},i="";try{let s=n.split(".");e=_r(gr(s[0])||""),t=_r(gr(s[1])||""),i=s[2],r=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:r,signature:i}};var Dm=function(n){let e=km(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},Om=function(n){let e=km(n).claims;return typeof e=="object"&&e.admin===!0};function lt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function kn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function vr(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Vi(n,e,t){let r={};for(let i in n)Object.prototype.hasOwnProperty.call(n,i)&&(r[i]=e.call(t,n[i],i,n));return r}function nt(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(Im(s)&&Im(o)){if(!nt(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function Im(n){return n!==null&&typeof n=="object"}function tn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function wr(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Ir(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}var fo=class{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);let r=this.W_;if(typeof e=="string")for(let p=0;p<16;p++)r[p]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let p=0;p<16;p++)r[p]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let p=16;p<80;p++){let m=r[p-3]^r[p-8]^r[p-14]^r[p-16];r[p]=(m<<1|m>>>31)&4294967295}let i=this.chain_[0],s=this.chain_[1],o=this.chain_[2],c=this.chain_[3],u=this.chain_[4],l,f;for(let p=0;p<80;p++){p<40?p<20?(l=c^s&(o^c),f=1518500249):(l=s^o^c,f=1859775393):p<60?(l=s&o|c&(s|o),f=2400959708):(l=s^o^c,f=3395469782);let m=(i<<5|i>>>27)+l+u+f+r[p]&4294967295;u=c,c=o,o=(s<<30|s>>>2)&4294967295,s=i,i=m}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+s&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+c&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);let r=t-this.blockSize,i=0,s=this.buf_,o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=r;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(s[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}else for(;i<t;)if(s[o]=e[i],++o,++i,o===this.blockSize){this.compress_(s),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){let e=[],t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let r=0;for(let i=0;i<5;i++)for(let s=24;s>=0;s-=8)e[r]=this.chain_[i]>>s&255,++r;return e}};function xm(n,e){let t=new uu(n,e);return t.subscribe.bind(t)}var uu=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");gE(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ou),i.error===void 0&&(i.error=ou),i.complete===void 0&&(i.complete=ou);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console!="undefined"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function gE(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ou(){}function Dn(n,e){return`${n} failed: ${e} argument `}var Vm=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);if(i>=55296&&i<=56319){let s=i-55296;r++,D(r<n.length,"Surrogate pair missing trail surrogate.");let o=n.charCodeAt(r)-56320;i=65536+(s<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Li=function(n){let e=0;for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,t++):e+=3}return e};var tP=4*60*60*1e3;function ee(n){return n&&n._delegate?n._delegate:n}var $e=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var On="[DEFAULT]";var _o=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Ge;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(yE(e))try{this.getOrInitializeService({instanceIdentifier:On})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=On){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=On){return this.instances.has(e)}getOptions(e=On){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&o.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:_E(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=On){return this.component?this.component.multipleInstances?e:On:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function _E(n){return n===On?void 0:n}function yE(n){return n.instantiationMode==="EAGER"}var Mi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new _o(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var vE=[],G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));var wE={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},IE=G.INFO,EE={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},TE=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=EE[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},yt=class{constructor(e){this.name=e,this._logLevel=IE,this._logHandler=TE,this._userLogHandler=null,vE.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?wE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}};var bE=(n,e)=>e.some(t=>n instanceof t),Lm,Mm;function AE(){return Lm||(Lm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function SE(){return Mm||(Mm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Fm=new WeakMap,yu=new WeakMap,Um=new WeakMap,_u=new WeakMap,wu=new WeakMap;function CE(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(vt(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Fm.set(t,n)}).catch(()=>{}),wu.set(e,n),e}function RE(n){if(yu.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});yu.set(n,e)}var vu={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return yu.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Um.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return vt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Bm(n){vu=n(vu)}function PE(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(yo(this),e,...t);return Um.set(r,e.sort?e.sort():[e]),vt(r)}:SE().includes(n)?function(...e){return n.apply(yo(this),e),vt(Fm.get(this))}:function(...e){return vt(n.apply(yo(this),e))}}function NE(n){return typeof n=="function"?PE(n):(n instanceof IDBTransaction&&RE(n),bE(n,AE())?new Proxy(n,vu):n)}function vt(n){if(n instanceof IDBRequest)return CE(n);if(_u.has(n))return _u.get(n);let e=NE(n);return e!==n&&(_u.set(n,e),wu.set(e,n)),e}var yo=n=>wu.get(n);function jm(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),c=vt(o);return r&&o.addEventListener("upgradeneeded",u=>{r(vt(o.result),u.oldVersion,u.newVersion,vt(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",l=>i(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}var kE=["get","getKey","getAll","getAllKeys","count"],DE=["put","add","delete","clear"],Iu=new Map;function qm(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Iu.get(e))return Iu.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=DE.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||kE.includes(t)))return;let s=async function(o,...c){let u=this.transaction(o,i?"readwrite":"readonly"),l=u.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[t](...c),i&&u.done]))[0]};return Iu.set(e,s),s}Bm(n=>({...n,get:(e,t,r)=>qm(e,t)||n.get(e,t,r),has:(e,t)=>!!qm(e,t)||n.has(e,t)}));var Tu=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(OE(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function OE(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var bu="@firebase/app",Wm="0.13.2";var xt=new yt("@firebase/app"),xE="@firebase/app-compat",VE="@firebase/analytics-compat",LE="@firebase/analytics",ME="@firebase/app-check-compat",FE="@firebase/app-check",UE="@firebase/auth",BE="@firebase/auth-compat",qE="@firebase/database",jE="@firebase/data-connect",WE="@firebase/database-compat",zE="@firebase/functions",GE="@firebase/functions-compat",$E="@firebase/installations",HE="@firebase/installations-compat",KE="@firebase/messaging",QE="@firebase/messaging-compat",YE="@firebase/performance",JE="@firebase/performance-compat",XE="@firebase/remote-config",ZE="@firebase/remote-config-compat",eT="@firebase/storage",tT="@firebase/storage-compat",nT="@firebase/firestore",rT="@firebase/ai",iT="@firebase/firestore-compat",sT="firebase",oT="11.10.0";var Au="[DEFAULT]",aT={[bu]:"fire-core",[xE]:"fire-core-compat",[LE]:"fire-analytics",[VE]:"fire-analytics-compat",[FE]:"fire-app-check",[ME]:"fire-app-check-compat",[UE]:"fire-auth",[BE]:"fire-auth-compat",[qE]:"fire-rtdb",[jE]:"fire-data-connect",[WE]:"fire-rtdb-compat",[zE]:"fire-fn",[GE]:"fire-fn-compat",[$E]:"fire-iid",[HE]:"fire-iid-compat",[KE]:"fire-fcm",[QE]:"fire-fcm-compat",[YE]:"fire-perf",[JE]:"fire-perf-compat",[XE]:"fire-rc",[ZE]:"fire-rc-compat",[eT]:"fire-gcs",[tT]:"fire-gcs-compat",[nT]:"fire-fst",[iT]:"fire-fst-compat",[rT]:"fire-vertex","fire-js":"fire-js",[sT]:"fire-js-all"};var vo=new Map,cT=new Map,Su=new Map;function zm(n,e){try{n.container.addComponent(e)}catch(t){xt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function wt(n){let e=n.name;if(Su.has(e))return xt.debug(`There were multiple attempts to register component ${e}.`),!1;Su.set(e,n);for(let t of vo.values())zm(t,n);for(let t of cT.values())zm(t,n);return!0}function xn(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Pe(n){return n==null?!1:n.settings!==void 0}var uT={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},nn=new Ot("app","Firebase",uT);var Cu=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new $e("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw nn.create("app-deleted",{appName:this._name})}};var It=oT;function Nu(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Au,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw nn.create("bad-app-name",{appName:String(i)});if(t||(t=fu()),!t)throw nn.create("no-options");let s=vo.get(i);if(s){if(nt(t,s.options)&&nt(r,s.config))return s;throw nn.create("duplicate-app",{appName:i})}let o=new Mi(i);for(let u of Su.values())o.addComponent(u);let c=new Cu(t,r,o);return vo.set(i,c),c}function Ui(n=Au){let e=vo.get(n);if(!e&&n===Au&&fu())return Nu();if(!e)throw nn.create("no-app",{appName:n});return e}function He(n,e,t){var r;let i=(r=aT[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xt.warn(c.join(" "));return}wt(new $e(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var lT="firebase-heartbeat-database",hT=1,Fi="firebase-heartbeat-store",Eu=null;function Km(){return Eu||(Eu=jm(lT,hT,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Fi)}catch(t){console.warn(t)}}}}).catch(n=>{throw nn.create("idb-open",{originalErrorMessage:n.message})})),Eu}async function dT(n){try{let t=(await Km()).transaction(Fi),r=await t.objectStore(Fi).get(Qm(n));return await t.done,r}catch(e){if(e instanceof Je)xt.warn(e.message);else{let t=nn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});xt.warn(t.message)}}}async function Gm(n,e){try{let r=(await Km()).transaction(Fi,"readwrite");await r.objectStore(Fi).put(e,Qm(n)),await r.done}catch(t){if(t instanceof Je)xt.warn(t.message);else{let r=nn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});xt.warn(r.message)}}}function Qm(n){return`${n.name}!${n.options.appId}`}var fT=1024,pT=30,Ru=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Pu(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=$m();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>pT){let o=gT(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){xt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=$m(),{heartbeatsToSend:r,unsentEntries:i}=mT(this._heartbeatsCache.heartbeats),s=Di(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return xt.warn(t),""}}};function $m(){return new Date().toISOString().substring(0,10)}function mT(n,e=fT){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Hm(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Hm(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Pu=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return gu()?Nm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await dT(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Gm(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Gm(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function Hm(n){return Di(JSON.stringify({version:2,heartbeats:n})).length}function gT(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function _T(n){wt(new $e("platform-logger",e=>new Tu(e),"PRIVATE")),wt(new $e("heartbeat",e=>new Ru(e),"PRIVATE")),He(bu,Wm,n),He(bu,Wm,"esm2017"),He("fire-js","")}_T("");var yT="firebase",vT="11.10.0";He(yT,vT,"app");function wo(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function pg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var mg=pg,gg=new Ot("auth","Firebase",pg());var Co=new yt("@firebase/auth");function wT(n,...e){Co.logLevel<=G.WARN&&Co.warn(`Auth (${It}): ${n}`,...e)}function Eo(n,...e){Co.logLevel<=G.ERROR&&Co.error(`Auth (${It}): ${n}`,...e)}function ht(n,...e){throw tl(n,...e)}function Tt(n,...e){return tl(n,...e)}function _g(n,e,t){let r=Object.assign(Object.assign({},mg()),{[e]:t});return new Ot("auth","Firebase",r).create(e,{appName:n.name})}function bt(n){return _g(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function tl(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return gg.create(n,...e)}function L(n,e,...t){if(!n)throw tl(e,...t)}function Et(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Eo(e),new Error(e)}function Lt(n,e){n||Et(e)}function Lu(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function IT(){return Ym()==="http:"||Ym()==="https:"}function Ym(){var n;return typeof self!="undefined"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function ET(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(IT()||Cm()||"connection"in navigator)?navigator.onLine:!0}function TT(){if(typeof navigator=="undefined")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ln=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,Lt(t>e,"Short delay should be less than long delay!"),this.isMobile=xi()||go()}get(){return ET()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function nl(n,e){Lt(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Ro=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Et("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Et("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Et("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var bT={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var AT=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ST=new Ln(3e4,6e4);function ge(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Ne(n,e,t,r,i={}){return yg(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let c=tn(Object.assign({key:n.config.apiKey},o)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);let l=Object.assign({method:e,headers:u},s);return Sm()||(l.referrerPolicy="no-referrer"),n.emulatorConfig&&ut(n.emulatorConfig.host)&&(l.credentials="include"),Ro.fetch()(await vg(n,n.config.apiHost,t,c),l)})}async function yg(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},bT),e);try{let i=new Mu(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw qi(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let c=s.ok?o.errorMessage:o.error.message,[u,l]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw qi(n,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw qi(n,"email-already-in-use",o);if(u==="USER_DISABLED")throw qi(n,"user-disabled",o);let f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(l)throw _g(n,f,l);ht(n,f)}}catch(i){if(i instanceof Je)throw i;ht(n,"network-request-failed",{message:String(i)})}}async function an(n,e,t,r,i={}){let s=await Ne(n,e,t,r,i);return"mfaPendingCredential"in s&&ht(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function vg(n,e,t,r){let i=`${e}${t}?${r}`,s=n,o=s.config.emulator?nl(n.config,i):`${n.config.apiScheme}://${i}`;return AT.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function CT(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Mu=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Tt(this.auth,"network-request-failed")),ST.get())})}};function qi(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=Tt(n,e,r);return i.customData._tokenResponse=t,i}function Jm(n){return n!==void 0&&n.enterprise!==void 0}var Po=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return CT(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function wg(n,e){return Ne(n,"GET","/v2/recaptchaConfig",ge(n,e))}async function RT(n,e){return Ne(n,"POST","/v1/accounts:delete",e)}async function No(n,e){return Ne(n,"POST","/v1/accounts:lookup",e)}function ji(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ig(n,e=!1){let t=ee(n),r=await t.getIdToken(e),i=rl(r);L(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ji(ku(i.auth_time)),issuedAtTime:ji(ku(i.iat)),expirationTime:ji(ku(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ku(n){return Number(n)*1e3}function rl(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Eo("JWT malformed, contained fewer than 3 sections"),null;try{let i=gr(t);return i?JSON.parse(i):(Eo("Failed to decode base64 JWT payload"),null)}catch(i){return Eo("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Xm(n){let e=rl(n);return L(e,"internal-error"),L(typeof e.exp!="undefined","internal-error"),L(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function Gi(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Je&&PT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function PT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var Fu=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var $i=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ji(this.lastLoginAt),this.creationTime=ji(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function ko(n){var e;let t=n.auth,r=await n.getIdToken(),i=await Gi(n,No(t,{idToken:r}));L(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Tg(s.providerUserInfo):[],c=NT(n.providerData,o),u=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?l:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new $i(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,p)}async function Eg(n){let e=ee(n);await ko(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function NT(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function Tg(n){return n.map(e=>{var{providerId:t}=e,r=wo(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function kT(n,e){let t=await yg(n,{},async()=>{let r=tn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await vg(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";let u={method:"POST",headers:c,body:r};return n.emulatorConfig&&ut(n.emulatorConfig.host)&&(u.credentials="include"),Ro.fetch()(o,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function DT(n,e){return Ne(n,"POST","/v2/accounts:revokeToken",ge(n,e))}var Wi=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){L(e.idToken,"internal-error"),L(typeof e.idToken!="undefined","internal-error"),L(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Xm(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){L(e.length!==0,"internal-error");let t=Xm(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(L(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await kT(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(L(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(L(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(L(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Et("not implemented")}};function rn(n,e){L(typeof n=="string"||typeof n=="undefined","internal-error",{appName:e})}var sn=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=wo(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Fu(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new $i(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await Gi(this,this.stsTokenManager.getToken(this.auth,e));return L(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ig(this,e)}reload(){return Eg(this)}_assign(e){this!==e&&(L(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){L(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ko(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pe(this.auth.app))return Promise.reject(bt(this.auth));let e=await this.getIdToken();return await Gi(this,RT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,o,c,u,l,f;let p=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,I=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,C=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,P=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,B=(l=t.createdAt)!==null&&l!==void 0?l:void 0,U=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:W,emailVerified:re,isAnonymous:Fe,providerData:ie,stsTokenManager:E}=t;L(W&&E,e,"internal-error");let _=Wi.fromJSON(this.name,E);L(typeof W=="string",e,"internal-error"),rn(p,e.name),rn(m,e.name),L(typeof re=="boolean",e,"internal-error"),L(typeof Fe=="boolean",e,"internal-error"),rn(I,e.name),rn(C,e.name),rn(k,e.name),rn(P,e.name),rn(B,e.name),rn(U,e.name);let v=new n({uid:W,auth:e,email:m,emailVerified:re,displayName:p,isAnonymous:Fe,photoURL:C,phoneNumber:I,tenantId:k,stsTokenManager:_,createdAt:B,lastLoginAt:U});return ie&&Array.isArray(ie)&&(v.providerData=ie.map(w=>Object.assign({},w))),P&&(v._redirectEventId=P),v}static async _fromIdTokenResponse(e,t,r=!1){let i=new Wi;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ko(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];L(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Tg(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Wi;c.updateFromIdToken(r);let u=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new $i(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,l),u}};var Zm=new Map;function Vt(n){Lt(n instanceof Function,"Expected a class definition");let e=Zm.get(n);return e?(Lt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Zm.set(n,e),e)}var Do=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Do.type="NONE";var Uu=Do;function To(n,e,t){return`firebase:${n}:${e}:${t}`}var Oo=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=To(this.userKey,i.apiKey,s),this.fullPersistenceKey=To("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await No(this.auth,{idToken:e}).catch(()=>{});return t?sn._fromGetAccountInfoResponse(this.auth,t,e):null}return sn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(Vt(Uu),e,r);let i=(await Promise.all(t.map(async l=>{if(await l._isAvailable())return l}))).filter(l=>l),s=i[0]||Vt(Uu),o=To(r,e.config.apiKey,e.name),c=null;for(let l of t)try{let f=await l._get(o);if(f){let p;if(typeof f=="string"){let m=await No(e,{idToken:f}).catch(()=>{});if(!m)break;p=await sn._fromGetAccountInfoResponse(e,m,f)}else p=sn._fromJSON(e,f);l!==s&&(c=p),s=l;break}}catch{}let u=i.filter(l=>l._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new n(s,e,r):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async l=>{if(l!==s)try{await l._remove(o)}catch{}})),new n(s,e,r))}};function eg(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Cg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(bg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Pg(e))return"Blackberry";if(Ng(e))return"Webos";if(Ag(e))return"Safari";if((e.includes("chrome/")||Sg(e))&&!e.includes("edge/"))return"Chrome";if(Rg(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function bg(n=Te()){return/firefox\//i.test(n)}function Ag(n=Te()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Sg(n=Te()){return/crios\//i.test(n)}function Cg(n=Te()){return/iemobile/i.test(n)}function Rg(n=Te()){return/android/i.test(n)}function Pg(n=Te()){return/blackberry/i.test(n)}function Ng(n=Te()){return/webos/i.test(n)}function il(n=Te()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function OT(n=Te()){var e;return il(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function xT(){return Rm()&&document.documentMode===10}function kg(n=Te()){return il(n)||Rg(n)||Ng(n)||Pg(n)||/windows phone/i.test(n)||Cg(n)}function Dg(n,e=[]){let t;switch(n){case"Browser":t=eg(Te());break;case"Worker":t=`${eg(Te())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${It}/${r}`}var Bu=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,c)=>{try{let u=e(s);o(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function VT(n,e={}){return Ne(n,"GET","/v2/passwordPolicy",ge(n,e))}var LT=6,qu=class{constructor(e){var t,r,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:LT,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,o,c;let u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var ju=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new xo(this),this.idTokenSubscription=new xo(this),this.beforeStateQueue=new Bu(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=gg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Vt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Oo.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await No(this,{idToken:e}),r=await sn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Pe(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return L(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ko(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=TT()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pe(this.app))return Promise.reject(bt(this));let t=e?ee(e):null;return t&&L(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&L(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pe(this.app)?Promise.reject(bt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pe(this.app)?Promise.reject(bt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Vt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await VT(this),t=new qu(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ot("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await DT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&Vt(e)||this._popupRedirectResolver;L(t,this,"argument-error"),this.redirectPersistenceManager=await Oo.create(this,[Vt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(L(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let u=e.addObserver(t,r,i);return()=>{o=!0,u()}}else{let u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return L(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Dg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Pe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&wT(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function dt(n){return ee(n)}var xo=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=xm(t=>this.observer=t)}get next(){return L(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function MT(n){Xo=n}function Og(n){return Xo.loadJS(n)}function FT(){return Xo.recaptchaEnterpriseScript}function UT(){return Xo.gapiScript}function xg(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Wu=class{constructor(){this.enterprise=new zu}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},zu=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var BT="recaptcha-enterprise",zi="NO_RECAPTCHA",Vo=class{constructor(e){this.type=BT,this.auth=dt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{wg(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let l=new Po(u);return s.tenantId==null?s._agentRecaptchaConfig=l:s._tenantRecaptchaConfigs[s.tenantId]=l,o(l.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){let u=window.grecaptcha;Jm(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(l=>{o(l)}).catch(()=>{o(zi)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Wu().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(c=>{if(!t&&Jm(window.grecaptcha))i(c,s,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=FT();u.length!==0&&(u+=c),Og(u).then(()=>{i(c,s,o)}).catch(l=>{o(l)})}}).catch(c=>{o(c)})})}};async function Bi(n,e,t,r=!1,i=!1){let s=new Vo(n),o;if(i)o=zi;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}let c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let u=c.phoneEnrollmentInfo.phoneNumber,l=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let u=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Vn(n,e,t,r,i){var s,o;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let c=await Bi(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let u=await Bi(n,e,t,t==="getOobCode");return r(n,u)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((o=n._getRecaptchaConfig())===null||o===void 0)&&o.isProviderEnabled("PHONE_PROVIDER")){let c=await Bi(n,e,t);return r(n,c).catch(async u=>{var l;if(((l=n._getRecaptchaConfig())===null||l===void 0?void 0:l.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(u.code==="auth/missing-recaptcha-token"||u.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let f=await Bi(n,e,t,!1,!0);return r(n,f)}return Promise.reject(u)})}else{let c=await Bi(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function qT(n){let e=dt(n),t=await wg(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Po(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Vo(e).verify()}function Vg(n,e){let t=xn(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(nt(s,e!=null?e:{}))return i;ht(i,"already-initialized")}return t.initialize({options:e})}function jT(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Vt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Lg(n,e,t){let r=dt(n);L(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=Mg(e),{host:o,port:c}=WT(e),u=c===null?"":`:${c}`,l={url:`${s}//${o}${u}/`},f=Object.freeze({host:o,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){L(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),L(nt(l,r.config.emulator)&&nt(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=l,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,ut(o)?(yr(`${s}//${o}${u}`),Oi("Auth",!0)):i||zT()}function Mg(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function WT(n){let e=Mg(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:tg(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:tg(o)}}}function tg(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function zT(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console!="undefined"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window!="undefined"&&typeof document!="undefined"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Mn=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Et("not implemented")}_getIdTokenResponse(e){return Et("not implemented")}_linkToIdToken(e,t){return Et("not implemented")}_getReauthenticationResolver(e){return Et("not implemented")}};async function GT(n,e){return Ne(n,"POST","/v1/accounts:signUp",e)}async function $T(n,e){return an(n,"POST","/v1/accounts:signInWithPassword",ge(n,e))}async function HT(n,e){return Ne(n,"POST","/v1/accounts:sendOobCode",ge(n,e))}async function KT(n,e){return HT(n,e)}async function QT(n,e){return an(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}async function YT(n,e){return an(n,"POST","/v1/accounts:signInWithEmailLink",ge(n,e))}var Hi=class n extends Mn{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vn(e,t,"signInWithPassword",$T,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return QT(e,{email:this._email,oobCode:this._password});default:ht(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vn(e,r,"signUpPassword",GT,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return YT(e,{idToken:t,email:this._email,oobCode:this._password});default:ht(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Er(n,e){return an(n,"POST","/v1/accounts:signInWithIdp",ge(n,e))}var JT="http://localhost",Fn=class n extends Mn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ht("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=wo(t,["providerId","signInMethod"]);if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return Er(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Er(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Er(e,t)}buildRequest(){let e={requestUri:JT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=tn(t)}return e}};async function ng(n,e){return Ne(n,"POST","/v1/accounts:sendVerificationCode",ge(n,e))}async function XT(n,e){return an(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e))}async function ZT(n,e){let t=await an(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,e));if(t.temporaryProof)throw qi(n,"account-exists-with-different-credential",t);return t}var eb={USER_NOT_FOUND:"user-not-found"};async function tb(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return an(n,"POST","/v1/accounts:signInWithPhoneNumber",ge(n,t),eb)}var Ki=class n extends Mn{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return XT(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return ZT(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return tb(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function nb(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function rb(n){let e=wr(Ir(n)).link,t=e?wr(Ir(e)).deep_link_id:null,r=wr(Ir(n)).deep_link_id;return(r?wr(Ir(r)).link:null)||r||t||e||n}var Lo=class n{constructor(e){var t,r,i,s,o,c;let u=wr(Ir(e)),l=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,p=nb((i=u.mode)!==null&&i!==void 0?i:null);L(l&&f&&p,"argument-error"),this.apiKey=l,this.operation=p,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.lang)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=rb(e);try{return new n(t)}catch{return null}}};var Un=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return Hi._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Lo.parseLink(t);return L(r,"argument-error"),Hi._fromEmailAndCode(e,r.code,r.tenantId)}};Un.PROVIDER_ID="password";Un.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Un.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Mo=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Bn=class extends Mo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Qi=class n extends Bn{constructor(){super("facebook.com")}static credential(e){return Fn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Qi.FACEBOOK_SIGN_IN_METHOD="facebook.com";Qi.PROVIDER_ID="facebook.com";var Yi=class n extends Bn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Fn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};Yi.GOOGLE_SIGN_IN_METHOD="google.com";Yi.PROVIDER_ID="google.com";var Ji=class n extends Bn{constructor(){super("github.com")}static credential(e){return Fn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Ji.GITHUB_SIGN_IN_METHOD="github.com";Ji.PROVIDER_ID="github.com";var Xi=class n extends Bn{constructor(){super("twitter.com")}static credential(e,t){return Fn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Xi.TWITTER_SIGN_IN_METHOD="twitter.com";Xi.PROVIDER_ID="twitter.com";async function Fg(n,e){return an(n,"POST","/v1/accounts:signUp",ge(n,e))}var on=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await sn._fromIdTokenResponse(e,r,i),o=rg(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=rg(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function rg(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}async function sl(n){var e;if(Pe(n.app))return Promise.reject(bt(n));let t=dt(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new on({user:t.currentUser,providerId:null,operationType:"signIn"});let r=await Fg(t,{returnSecureToken:!0}),i=await on._fromIdTokenResponse(t,"signIn",r,!0);return await t._updateCurrentUser(i.user),i}var Gu=class n extends Je{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function Ug(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Gu._fromErrorAndOperation(n,s,e,r):s})}async function ib(n,e,t=!1){let r=await Gi(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return on._forOperation(n,"link",r)}async function sb(n,e,t=!1){let{auth:r}=n;if(Pe(r.app))return Promise.reject(bt(r));let i="reauthenticate";try{let s=await Gi(n,Ug(r,i,e,n),t);L(s.idToken,r,"internal-error");let o=rl(s.idToken);L(o,r,"internal-error");let{sub:c}=o;return L(n.uid===c,r,"user-mismatch"),on._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ht(r,"user-mismatch"),s}}async function Bg(n,e,t=!1){if(Pe(n.app))return Promise.reject(bt(n));let r="signIn",i=await Ug(n,r,e),s=await on._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function qg(n,e){return Bg(dt(n),e)}function ob(n,e,t){var r;L(((r=t.url)===null||r===void 0?void 0:r.length)>0,n,"invalid-continue-uri"),L(typeof t.dynamicLinkDomain=="undefined"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),L(typeof t.linkDomain=="undefined"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(L(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(L(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function jg(n){let e=dt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function ol(n,e,t){let r=dt(n),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&ob(r,i,t),await Vn(r,i,"getOobCode",KT,"EMAIL_PASSWORD_PROVIDER")}async function al(n,e,t){if(Pe(n.app))return Promise.reject(bt(n));let r=dt(n),o=await Vn(r,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Fg,"EMAIL_PASSWORD_PROVIDER").catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&jg(n),u}),c=await on._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(c.user),c}function cl(n,e,t){return Pe(n.app)?Promise.reject(bt(n)):qg(ee(n),Un.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&jg(n),r})}function Wg(n,e,t,r){return ee(n).onIdTokenChanged(e,t,r)}function zg(n,e,t){return ee(n).beforeAuthStateChanged(e,t)}function ul(n,e,t,r){return ee(n).onAuthStateChanged(e,t,r)}function ll(n){return ee(n).signOut()}function ig(n,e){return Ne(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function ab(n,e){return Ne(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}function cb(n,e){return Ne(n,"POST","/v2/accounts/mfaEnrollment:start",ge(n,e))}function ub(n,e){return Ne(n,"POST","/v2/accounts/mfaEnrollment:finalize",ge(n,e))}var Fo="__sak";var Uo=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fo,"1"),this.storage.removeItem(Fo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var lb=1e3,hb=10,Bo=class extends Uo{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=kg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);xT()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,hb):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},lb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Bo.type="LOCAL";var Gg=Bo;var db=1e3;function Du(n){var e,t;let r=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp(`${r}=([^;]+)`);return(t=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}function Ou(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var $u=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator=="undefined"||typeof document=="undefined"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Ou(e);if(window.cookieStore){let r=await window.cookieStore.get(t);return r==null?void 0:r.value}return Du(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=Ou(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=Ou(e);if(window.cookieStore){let c=l=>{let f=l.changed.find(m=>m.name===r);f&&t(f.value),l.deleted.find(m=>m.name===r)&&t(null)},u=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,u),window.cookieStore.addEventListener("change",c)}let i=Du(r),s=setInterval(()=>{let c=Du(r);c!==i&&(t(c),i=c)},db),o=()=>clearInterval(s);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};$u.type="COOKIE";var qo=class extends Uo{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};qo.type="SESSION";var hl=qo;function fb(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var jo=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(o).map(async l=>l(t.origin,s)),u=await fb(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};jo.receivers=[];function dl(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Hu=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{let l=dl("",20);i.port1.start();let f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){let m=p;if(m.data.eventId===l)switch(m.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(m.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:l,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function At(){return window}function pb(n){At().location.href=n}function $g(){return typeof At().WorkerGlobalScope!="undefined"&&typeof At().importScripts=="function"}async function mb(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function gb(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function _b(){return $g()?self:null}var Hg="firebaseLocalStorageDb",yb=1,Wo="firebaseLocalStorage",Kg="fbase_key",qn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Zo(n,e){return n.transaction([Wo],e?"readwrite":"readonly").objectStore(Wo)}function vb(){let n=indexedDB.deleteDatabase(Hg);return new qn(n).toPromise()}function Ku(){let n=indexedDB.open(Hg,yb);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Wo,{keyPath:Kg})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Wo)?e(r):(r.close(),await vb(),e(await Ku()))})})}async function sg(n,e,t){let r=Zo(n,!0).put({[Kg]:e,value:t});return new qn(r).toPromise()}async function wb(n,e){let t=Zo(n,!1).get(e),r=await new qn(t).toPromise();return r===void 0?null:r.value}function og(n,e){let t=Zo(n,!0).delete(e);return new qn(t).toPromise()}var Ib=800,Eb=3,zo=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ku(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>Eb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return $g()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=jo._getInstance(_b()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await mb(),!this.activeServiceWorker)return;this.sender=new Hu(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||gb()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Ku();return await sg(e,Fo,"1"),await og(e,Fo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sg(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>wb(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>og(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Zo(i,!1).getAll();return new qn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ib)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};zo.type="LOCAL";var Qg=zo;function ag(n,e){return Ne(n,"POST","/v2/accounts/mfaSignIn:start",ge(n,e))}function Tb(n,e){return Ne(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}function bb(n,e){return Ne(n,"POST","/v2/accounts/mfaSignIn:finalize",ge(n,e))}var PP=xg("rcb"),NP=new Ln(3e4,6e4);var bo="recaptcha";async function Ab(n,e,t){var r;if(!n._getRecaptchaConfig())try{await qT(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){L(s.type==="enroll",n,"internal-error");let o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Vn(n,o,"mfaSmsEnrollment",async(f,p)=>{if(p.phoneEnrollmentInfo.captchaResponse===zi){L((t==null?void 0:t.type)===bo,f,"argument-error");let m=await xu(f,p,t);return ig(f,m)}return ig(f,p)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneSessionInfo.sessionInfo}else{L(s.type==="signin",n,"internal-error");let o=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;L(o,n,"missing-multi-factor-info");let c={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Vn(n,c,"mfaSmsSignIn",async(p,m)=>{if(m.phoneSignInInfo.captchaResponse===zi){L((t==null?void 0:t.type)===bo,p,"argument-error");let I=await xu(p,m,t);return ag(p,I)}return ag(p,m)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Vn(n,s,"sendVerificationCode",async(l,f)=>{if(f.captchaResponse===zi){L((t==null?void 0:t.type)===bo,l,"argument-error");let p=await xu(l,f,t);return ng(l,p)}return ng(l,f)},"PHONE_PROVIDER").catch(l=>Promise.reject(l))).sessionInfo}}finally{t==null||t._reset()}}async function xu(n,e,t){L(t.type===bo,n,"argument-error");let r=await t.verify();L(typeof r=="string",n,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,u=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:c,recaptchaVersion:u}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Zi=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=dt(e)}verifyPhoneNumber(e,t){return Ab(this.auth,e,ee(t))}static credential(e,t){return Ki._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Ki._fromTokenResponse(t,r):null}};Zi.PROVIDER_ID="phone";Zi.PHONE_SIGN_IN_METHOD="phone";function Sb(n,e){return e?Vt(e):(L(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var es=class extends Mn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Er(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Er(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Er(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Cb(n){return Bg(n.auth,new es(n),n.bypassAuthState)}function Rb(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),sb(t,new es(n),n.bypassAuthState)}async function Pb(n){let{auth:e,user:t}=n;return L(t,e,"internal-error"),ib(t,new es(n),n.bypassAuthState)}var Go=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}let u={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(l){this.reject(l)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Cb;case"linkViaPopup":case"linkViaRedirect":return Pb;case"reauthViaPopup":case"reauthViaRedirect":return Rb;default:ht(this.auth,"internal-error")}}resolve(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Lt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Nb=new Ln(2e3,1e4);var Qu=class n extends Go{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return L(e,this.auth,"internal-error"),e}async onExecution(){Lt(this.filter.length===1,"Popup operations only handle one event");let e=dl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Tt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Tt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Tt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Nb.get())};e()}};Qu.currentPopupAction=null;var kb="pendingRedirect",Ao=new Map,Yu=class extends Go{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Ao.get(this.auth._key());if(!e){try{let r=await Db(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Ao.set(this.auth._key(),e)}return this.bypassAuthState||Ao.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Db(n,e){let t=Vb(e),r=xb(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function Ob(n,e){Ao.set(n._key(),e)}function xb(n){return Vt(n._redirectPersistence)}function Vb(n){return To(kb,n.config.apiKey,n.name)}async function Lb(n,e,t=!1){if(Pe(n.app))return Promise.reject(bt(n));let r=dt(n),i=Sb(r,e),o=await new Yu(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var Mb=10*60*1e3,Ju=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Fb(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Yg(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Tt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Mb&&this.cachedEventUids.clear(),this.cachedEventUids.has(cg(e))}saveEventToCache(e){this.cachedEventUids.add(cg(e)),this.lastProcessedEventTime=Date.now()}};function cg(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Yg({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Fb(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Yg(n);default:return!1}}async function Ub(n,e={}){return Ne(n,"GET","/v1/projects",e)}var Bb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,qb=/^https?/;async function jb(n){if(n.config.emulator)return;let{authorizedDomains:e}=await Ub(n);for(let t of e)try{if(Wb(t))return}catch{}ht(n,"unauthorized-domain")}function Wb(n){let e=Lu(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!qb.test(t))return!1;if(Bb.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var zb=new Ln(3e4,6e4);function ug(){let n=At().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Gb(n){return new Promise((e,t)=>{var r,i,s;function o(){ug(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ug(),t(Tt(n,"network-request-failed"))},timeout:zb.get()})}if(!((i=(r=At().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=At().gapi)===null||s===void 0)&&s.load)o();else{let c=xg("iframefcb");return At()[c]=()=>{gapi.load?o():t(Tt(n,"network-request-failed"))},Og(`${UT()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw So=null,e})}var So=null;function $b(n){return So=So||Gb(n),So}var Hb=new Ln(5e3,15e3),Kb="__/auth/iframe",Qb="emulator/auth/iframe",Yb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Jb=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Xb(n){let e=n.config;L(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?nl(e,Qb):`https://${n.config.authDomain}/${Kb}`,r={apiKey:e.apiKey,appName:n.name,v:It},i=Jb.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${tn(r).slice(1)}`}async function Zb(n){let e=await $b(n),t=At().gapi;return L(t,n,"internal-error"),e.open({where:document.body,url:Xb(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Yb,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=Tt(n,"network-request-failed"),c=At().setTimeout(()=>{s(o)},Hb.get());function u(){At().clearTimeout(c),i(r)}r.ping(u).then(u,()=>{s(o)})}))}var eA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},tA=500,nA=600,rA="_blank",iA="http://localhost",$o=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function sA(n,e,t,r=tA,i=nA){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",u=Object.assign(Object.assign({},eA),{width:r.toString(),height:i.toString(),top:s,left:o}),l=Te().toLowerCase();t&&(c=Sg(l)?rA:t),bg(l)&&(e=e||iA,u.scrollbars="yes");let f=Object.entries(u).reduce((m,[I,C])=>`${m}${I}=${C},`,"");if(OT(l)&&c!=="_self")return oA(e||"",c),new $o(null);let p=window.open(e||"",c,f);L(p,n,"popup-blocked");try{p.focus()}catch{}return new $o(p)}function oA(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var aA="__/auth/handler",cA="emulator/auth/handler",uA=encodeURIComponent("fac");async function lg(n,e,t,r,i,s){L(n.config.authDomain,n,"auth-domain-config-required"),L(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:It,eventId:i};if(e instanceof Mo){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",vr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[f,p]of Object.entries(s||{}))o[f]=p}if(e instanceof Bn){let f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);let c=o;for(let f of Object.keys(c))c[f]===void 0&&delete c[f];let u=await n._getAppCheckToken(),l=u?`#${uA}=${encodeURIComponent(u)}`:"";return`${lA(n)}?${tn(c).slice(1)}${l}`}function lA({config:n}){return n.emulator?nl(n,cA):`https://${n.authDomain}/${aA}`}var Vu="webStorageSupport",Xu=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=hl,this._completeRedirectFn=Lb,this._overrideRedirectResult=Ob}async _openPopup(e,t,r,i){var s;Lt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await lg(e,t,r,Lu(),i);return sA(e,o,dl())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await lg(e,t,r,Lu(),i);return pb(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Lt(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Zb(e),r=new Ju(e);return t.register("authEvent",i=>(L(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Vu,{type:Vu},i=>{var s;let o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[Vu];o!==void 0&&t(!!o),ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=jb(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return kg()||Ag()||il()}},Jg=Xu,Ho=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Et("unexpected MultiFactorSessionType")}}},Zu=class n extends Ho{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return ab(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Tb(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Ko=class{constructor(){}static assertion(e){return Zu._fromCredential(e)}};Ko.FACTOR_ID="phone";var Qo=class{static assertionForEnrollment(e,t){return Yo._fromSecret(e,t)}static assertionForSignIn(e,t){return Yo._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;L(typeof((t=r.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await cb(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Jo._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};Qo.FACTOR_ID="totp";var Yo=class n extends Ho{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return L(typeof this.secret!="undefined",e,"argument-error"),ub(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){L(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return bb(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Jo=class n{constructor(e,t,r,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(Io(e)||Io(t))&&(i=!0),i&&(Io(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),Io(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Io(n){return typeof n=="undefined"||(n==null?void 0:n.length)===0}var hg="@firebase/auth",dg="1.10.8";var el=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){L(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function hA(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function dA(n){wt(new $e("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;L(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let u={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Dg(n)},l=new ju(r,i,s,u);return jT(l,t),l},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),wt(new $e("auth-internal",e=>{let t=dt(e.getProvider("auth").getImmediate());return(r=>new el(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),He(hg,dg,hA(n)),He(hg,dg,"esm2017")}var fA=5*60,pA=pu("authIdTokenMaxAge")||fA,fg=null,mA=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>pA)return;let i=t==null?void 0:t.token;fg!==i&&(fg=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function fl(n=Ui()){let e=xn(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Vg(n,{popupRedirectResolver:Jg,persistence:[Qg,Gg,hl]}),r=pu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=mA(s.toString());zg(t,o,()=>o(t.currentUser)),Wg(t,c=>o(c))}}let i=hu("auth");return i&&Lg(t,`http://${i}`),t}function gA(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}MT({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=Tt("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",gA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});dA("Browser");var Xg=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Zg={};var Mt,pl;(function(){var n;function e(E,_){function v(){}v.prototype=_.prototype,E.D=_.prototype,E.prototype=new v,E.prototype.constructor=E,E.C=function(w,T,A){for(var y=Array(arguments.length-2),Nt=2;Nt<arguments.length;Nt++)y[Nt-2]=arguments[Nt];return _.prototype[T].apply(w,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,v){v||(v=0);var w=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)w[T]=_.charCodeAt(v++)|_.charCodeAt(v++)<<8|_.charCodeAt(v++)<<16|_.charCodeAt(v++)<<24;else for(T=0;16>T;++T)w[T]=_[v++]|_[v++]<<8|_[v++]<<16|_[v++]<<24;_=E.g[0],v=E.g[1],T=E.g[2];var A=E.g[3],y=_+(A^v&(T^A))+w[0]+3614090360&4294967295;_=v+(y<<7&4294967295|y>>>25),y=A+(T^_&(v^T))+w[1]+3905402710&4294967295,A=_+(y<<12&4294967295|y>>>20),y=T+(v^A&(_^v))+w[2]+606105819&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(_^T&(A^_))+w[3]+3250441966&4294967295,v=T+(y<<22&4294967295|y>>>10),y=_+(A^v&(T^A))+w[4]+4118548399&4294967295,_=v+(y<<7&4294967295|y>>>25),y=A+(T^_&(v^T))+w[5]+1200080426&4294967295,A=_+(y<<12&4294967295|y>>>20),y=T+(v^A&(_^v))+w[6]+2821735955&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(_^T&(A^_))+w[7]+4249261313&4294967295,v=T+(y<<22&4294967295|y>>>10),y=_+(A^v&(T^A))+w[8]+1770035416&4294967295,_=v+(y<<7&4294967295|y>>>25),y=A+(T^_&(v^T))+w[9]+2336552879&4294967295,A=_+(y<<12&4294967295|y>>>20),y=T+(v^A&(_^v))+w[10]+4294925233&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(_^T&(A^_))+w[11]+2304563134&4294967295,v=T+(y<<22&4294967295|y>>>10),y=_+(A^v&(T^A))+w[12]+1804603682&4294967295,_=v+(y<<7&4294967295|y>>>25),y=A+(T^_&(v^T))+w[13]+4254626195&4294967295,A=_+(y<<12&4294967295|y>>>20),y=T+(v^A&(_^v))+w[14]+2792965006&4294967295,T=A+(y<<17&4294967295|y>>>15),y=v+(_^T&(A^_))+w[15]+1236535329&4294967295,v=T+(y<<22&4294967295|y>>>10),y=_+(T^A&(v^T))+w[1]+4129170786&4294967295,_=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(_^v))+w[6]+3225465664&4294967295,A=_+(y<<9&4294967295|y>>>23),y=T+(_^v&(A^_))+w[11]+643717713&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^_&(T^A))+w[0]+3921069994&4294967295,v=T+(y<<20&4294967295|y>>>12),y=_+(T^A&(v^T))+w[5]+3593408605&4294967295,_=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(_^v))+w[10]+38016083&4294967295,A=_+(y<<9&4294967295|y>>>23),y=T+(_^v&(A^_))+w[15]+3634488961&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^_&(T^A))+w[4]+3889429448&4294967295,v=T+(y<<20&4294967295|y>>>12),y=_+(T^A&(v^T))+w[9]+568446438&4294967295,_=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(_^v))+w[14]+3275163606&4294967295,A=_+(y<<9&4294967295|y>>>23),y=T+(_^v&(A^_))+w[3]+4107603335&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^_&(T^A))+w[8]+1163531501&4294967295,v=T+(y<<20&4294967295|y>>>12),y=_+(T^A&(v^T))+w[13]+2850285829&4294967295,_=v+(y<<5&4294967295|y>>>27),y=A+(v^T&(_^v))+w[2]+4243563512&4294967295,A=_+(y<<9&4294967295|y>>>23),y=T+(_^v&(A^_))+w[7]+1735328473&4294967295,T=A+(y<<14&4294967295|y>>>18),y=v+(A^_&(T^A))+w[12]+2368359562&4294967295,v=T+(y<<20&4294967295|y>>>12),y=_+(v^T^A)+w[5]+4294588738&4294967295,_=v+(y<<4&4294967295|y>>>28),y=A+(_^v^T)+w[8]+2272392833&4294967295,A=_+(y<<11&4294967295|y>>>21),y=T+(A^_^v)+w[11]+1839030562&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^_)+w[14]+4259657740&4294967295,v=T+(y<<23&4294967295|y>>>9),y=_+(v^T^A)+w[1]+2763975236&4294967295,_=v+(y<<4&4294967295|y>>>28),y=A+(_^v^T)+w[4]+1272893353&4294967295,A=_+(y<<11&4294967295|y>>>21),y=T+(A^_^v)+w[7]+4139469664&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^_)+w[10]+3200236656&4294967295,v=T+(y<<23&4294967295|y>>>9),y=_+(v^T^A)+w[13]+681279174&4294967295,_=v+(y<<4&4294967295|y>>>28),y=A+(_^v^T)+w[0]+3936430074&4294967295,A=_+(y<<11&4294967295|y>>>21),y=T+(A^_^v)+w[3]+3572445317&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^_)+w[6]+76029189&4294967295,v=T+(y<<23&4294967295|y>>>9),y=_+(v^T^A)+w[9]+3654602809&4294967295,_=v+(y<<4&4294967295|y>>>28),y=A+(_^v^T)+w[12]+3873151461&4294967295,A=_+(y<<11&4294967295|y>>>21),y=T+(A^_^v)+w[15]+530742520&4294967295,T=A+(y<<16&4294967295|y>>>16),y=v+(T^A^_)+w[2]+3299628645&4294967295,v=T+(y<<23&4294967295|y>>>9),y=_+(T^(v|~A))+w[0]+4096336452&4294967295,_=v+(y<<6&4294967295|y>>>26),y=A+(v^(_|~T))+w[7]+1126891415&4294967295,A=_+(y<<10&4294967295|y>>>22),y=T+(_^(A|~v))+w[14]+2878612391&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~_))+w[5]+4237533241&4294967295,v=T+(y<<21&4294967295|y>>>11),y=_+(T^(v|~A))+w[12]+1700485571&4294967295,_=v+(y<<6&4294967295|y>>>26),y=A+(v^(_|~T))+w[3]+2399980690&4294967295,A=_+(y<<10&4294967295|y>>>22),y=T+(_^(A|~v))+w[10]+4293915773&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~_))+w[1]+2240044497&4294967295,v=T+(y<<21&4294967295|y>>>11),y=_+(T^(v|~A))+w[8]+1873313359&4294967295,_=v+(y<<6&4294967295|y>>>26),y=A+(v^(_|~T))+w[15]+4264355552&4294967295,A=_+(y<<10&4294967295|y>>>22),y=T+(_^(A|~v))+w[6]+2734768916&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~_))+w[13]+1309151649&4294967295,v=T+(y<<21&4294967295|y>>>11),y=_+(T^(v|~A))+w[4]+4149444226&4294967295,_=v+(y<<6&4294967295|y>>>26),y=A+(v^(_|~T))+w[11]+3174756917&4294967295,A=_+(y<<10&4294967295|y>>>22),y=T+(_^(A|~v))+w[2]+718787259&4294967295,T=A+(y<<15&4294967295|y>>>17),y=v+(A^(T|~_))+w[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(T+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+T&4294967295,E.g[3]=E.g[3]+A&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var v=_-this.blockSize,w=this.B,T=this.h,A=0;A<_;){if(T==0)for(;A<=v;)i(this,E,A),A+=this.blockSize;if(typeof E=="string"){for(;A<_;)if(w[T++]=E.charCodeAt(A++),T==this.blockSize){i(this,w),T=0;break}}else for(;A<_;)if(w[T++]=E[A++],T==this.blockSize){i(this,w),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var v=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=v&255,v/=256;for(this.u(E),E=Array(16),_=v=0;4>_;++_)for(var w=0;32>w;w+=8)E[v++]=this.g[_]>>>w&255;return E};function s(E,_){var v=c;return Object.prototype.hasOwnProperty.call(v,E)?v[E]:v[E]=_(E)}function o(E,_){this.h=_;for(var v=[],w=!0,T=E.length-1;0<=T;T--){var A=E[T]|0;w&&A==_||(v[T]=A,w=!1)}this.g=v}var c={};function u(E){return-128<=E&&128>E?s(E,function(_){return new o([_|0],0>_?-1:0)}):new o([E|0],0>E?-1:0)}function l(E){if(isNaN(E)||!isFinite(E))return p;if(0>E)return P(l(-E));for(var _=[],v=1,w=0;E>=v;w++)_[w]=E/v|0,v*=4294967296;return new o(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return P(f(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=l(Math.pow(_,8)),w=p,T=0;T<E.length;T+=8){var A=Math.min(8,E.length-T),y=parseInt(E.substring(T,T+A),_);8>A?(A=l(Math.pow(_,A)),w=w.j(A).add(l(y))):(w=w.j(v),w=w.add(l(y)))}return w}var p=u(0),m=u(1),I=u(16777216);n=o.prototype,n.m=function(){if(k(this))return-P(this).m();for(var E=0,_=1,v=0;v<this.g.length;v++){var w=this.i(v);E+=(0<=w?w:4294967296+w)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(C(this))return"0";if(k(this))return"-"+P(this).toString(E);for(var _=l(Math.pow(E,6)),v=this,w="";;){var T=re(v,_).g;v=B(v,T.j(_));var A=((0<v.g.length?v.g[0]:v.h)>>>0).toString(E);if(v=T,C(v))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function C(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function k(E){return E.h==-1}n.l=function(E){return E=B(this,E),k(E)?-1:C(E)?0:1};function P(E){for(var _=E.g.length,v=[],w=0;w<_;w++)v[w]=~E.g[w];return new o(v,~E.h).add(m)}n.abs=function(){return k(this)?P(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],w=0,T=0;T<=_;T++){var A=w+(this.i(T)&65535)+(E.i(T)&65535),y=(A>>>16)+(this.i(T)>>>16)+(E.i(T)>>>16);w=y>>>16,A&=65535,y&=65535,v[T]=y<<16|A}return new o(v,v[v.length-1]&-2147483648?-1:0)};function B(E,_){return E.add(P(_))}n.j=function(E){if(C(this)||C(E))return p;if(k(this))return k(E)?P(this).j(P(E)):P(P(this).j(E));if(k(E))return P(this.j(P(E)));if(0>this.l(I)&&0>E.l(I))return l(this.m()*E.m());for(var _=this.g.length+E.g.length,v=[],w=0;w<2*_;w++)v[w]=0;for(w=0;w<this.g.length;w++)for(var T=0;T<E.g.length;T++){var A=this.i(w)>>>16,y=this.i(w)&65535,Nt=E.i(T)>>>16,di=E.i(T)&65535;v[2*w+2*T]+=y*di,U(v,2*w+2*T),v[2*w+2*T+1]+=A*di,U(v,2*w+2*T+1),v[2*w+2*T+1]+=y*Nt,U(v,2*w+2*T+1),v[2*w+2*T+2]+=A*Nt,U(v,2*w+2*T+2)}for(w=0;w<_;w++)v[w]=v[2*w+1]<<16|v[2*w];for(w=_;w<2*_;w++)v[w]=0;return new o(v,0)};function U(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function W(E,_){this.g=E,this.h=_}function re(E,_){if(C(_))throw Error("division by zero");if(C(E))return new W(p,p);if(k(E))return _=re(P(E),_),new W(P(_.g),P(_.h));if(k(_))return _=re(E,P(_)),new W(P(_.g),_.h);if(30<E.g.length){if(k(E)||k(_))throw Error("slowDivide_ only works with positive integers.");for(var v=m,w=_;0>=w.l(E);)v=Fe(v),w=Fe(w);var T=ie(v,1),A=ie(w,1);for(w=ie(w,2),v=ie(v,2);!C(w);){var y=A.add(w);0>=y.l(E)&&(T=T.add(v),A=y),w=ie(w,1),v=ie(v,1)}return _=B(E,T.j(_)),new W(T,_)}for(T=p;0<=E.l(_);){for(v=Math.max(1,Math.floor(E.m()/_.m())),w=Math.ceil(Math.log(v)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=l(v),y=A.j(_);k(y)||0<y.l(E);)v-=w,A=l(v),y=A.j(_);C(A)&&(A=m),T=T.add(A),E=B(E,y)}return new W(T,E)}n.A=function(E){return re(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],w=0;w<_;w++)v[w]=this.i(w)&E.i(w);return new o(v,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],w=0;w<_;w++)v[w]=this.i(w)|E.i(w);return new o(v,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),v=[],w=0;w<_;w++)v[w]=this.i(w)^E.i(w);return new o(v,this.h^E.h)};function Fe(E){for(var _=E.g.length+1,v=[],w=0;w<_;w++)v[w]=E.i(w)<<1|E.i(w-1)>>>31;return new o(v,E.h)}function ie(E,_){var v=_>>5;_%=32;for(var w=E.g.length-v,T=[],A=0;A<w;A++)T[A]=0<_?E.i(A+v)>>>_|E.i(A+v+1)<<32-_:E.i(A+v);return new o(T,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,pl=Zg.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=l,o.fromString=f,Mt=Zg.Integer=o}).apply(typeof Xg!="undefined"?Xg:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var ea=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Ft={};var ml,_A,Tr,gl,ts,ta,_l,yl,vl;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,d){return a==Array.prototype||a==Object.prototype||(a[h]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ea=="object"&&ea];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(a,h){if(h)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var b=a[g];if(!(b in d))break e;d=d[b]}a=a[a.length-1],g=d[a],h=h(g),h!=g&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}function s(a,h){a instanceof String&&(a+="");var d=0,g=!1,b={next:function(){if(!g&&d<a.length){var S=d++;return{value:h(S,a[S]),done:!1}}return g=!0,{done:!0,value:void 0}}};return b[Symbol.iterator]=function(){return b},b}i("Array.prototype.values",function(a){return a||function(){return s(this,function(h,d){return d})}});var o=o||{},c=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,d){return a.call.apply(a.bind,arguments)}function p(a,h,d){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var b=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(b,g),a.apply(h,b)}}return function(){return a.apply(h,arguments)}}function m(a,h,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function I(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function C(a,h){function d(){}d.prototype=h.prototype,a.aa=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(g,b,S){for(var x=Array(arguments.length-2),se=2;se<arguments.length;se++)x[se-2]=arguments[se];return h.prototype[b].apply(g,x)}}function k(a){let h=a.length;if(0<h){let d=Array(h);for(let g=0;g<h;g++)d[g]=a[g];return d}return[]}function P(a,h){for(let d=1;d<arguments.length;d++){let g=arguments[d];if(u(g)){let b=a.length||0,S=g.length||0;a.length=b+S;for(let x=0;x<S;x++)a[b+x]=g[x]}else a.push(g)}}class B{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function U(a){return/^[\s\xa0]*$/.test(a)}function W(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function re(a){return re[" "](a),a}re[" "]=function(){};var Fe=W().indexOf("Gecko")!=-1&&!(W().toLowerCase().indexOf("webkit")!=-1&&W().indexOf("Edge")==-1)&&!(W().indexOf("Trident")!=-1||W().indexOf("MSIE")!=-1)&&W().indexOf("Edge")==-1;function ie(a,h,d){for(let g in a)h.call(d,a[g],g,a)}function E(a,h){for(let d in a)h.call(void 0,a[d],d,a)}function _(a){let h={};for(let d in a)h[d]=a[d];return h}let v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(a,h){let d,g;for(let b=1;b<arguments.length;b++){g=arguments[b];for(d in g)a[d]=g[d];for(let S=0;S<v.length;S++)d=v[S],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function T(a){var h=1;a=a.split(":");let d=[];for(;0<h&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function A(a){c.setTimeout(()=>{throw a},0)}function y(){var a=Vc;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Nt{constructor(){this.h=this.g=null}add(h,d){let g=di.get();g.set(h,d),this.h?this.h.next=g:this.g=g,this.h=g}}var di=new B(()=>new AI,a=>a.reset());class AI{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let fi,pi=!1,Vc=new Nt,yp=()=>{let a=c.Promise.resolve(void 0);fi=()=>{a.then(SI)}};var SI=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){A(d)}var h=di;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}pi=!1};function Jt(){this.s=this.s,this.C=this.C}Jt.prototype.s=!1,Jt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Jt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ke(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}ke.prototype.h=function(){this.defaultPrevented=!0};var CI=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let d=()=>{};c.addEventListener("test",d,h),c.removeEventListener("test",d,h)}catch{}return a}();function mi(a,h){if(ke.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(Fe){e:{try{re(h.nodeName);var b=!0;break e}catch{}b=!1}b||(h=null)}}else d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement);this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:RI[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&mi.aa.h.call(this)}}C(mi,ke);var RI={2:"touch",3:"pen",4:"mouse"};mi.prototype.h=function(){mi.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var gi="closure_listenable_"+(1e6*Math.random()|0),PI=0;function NI(a,h,d,g,b){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!g,this.ha=b,this.key=++PI,this.da=this.fa=!1}function Qs(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ys(a){this.src=a,this.g={},this.h=0}Ys.prototype.add=function(a,h,d,g,b){var S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);var x=Mc(a,h,g,b);return-1<x?(h=a[x],d||(h.fa=!1)):(h=new NI(h,this.src,S,!!g,b),h.fa=d,a.push(h)),h};function Lc(a,h){var d=h.type;if(d in a.g){var g=a.g[d],b=Array.prototype.indexOf.call(g,h,void 0),S;(S=0<=b)&&Array.prototype.splice.call(g,b,1),S&&(Qs(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Mc(a,h,d,g){for(var b=0;b<a.length;++b){var S=a[b];if(!S.da&&S.listener==h&&S.capture==!!d&&S.ha==g)return b}return-1}var Fc="closure_lm_"+(1e6*Math.random()|0),Uc={};function vp(a,h,d,g,b){if(g&&g.once)return Ip(a,h,d,g,b);if(Array.isArray(h)){for(var S=0;S<h.length;S++)vp(a,h[S],d,g,b);return null}return d=Wc(d),a&&a[gi]?a.K(h,d,l(g)?!!g.capture:!!g,b):wp(a,h,d,!1,g,b)}function wp(a,h,d,g,b,S){if(!h)throw Error("Invalid event type");var x=l(b)?!!b.capture:!!b,se=qc(a);if(se||(a[Fc]=se=new Ys(a)),d=se.add(h,d,g,x,S),d.proxy)return d;if(g=kI(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)CI||(b=x),b===void 0&&(b=!1),a.addEventListener(h.toString(),g,b);else if(a.attachEvent)a.attachEvent(Tp(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function kI(){function a(d){return h.call(a.src,a.listener,d)}let h=DI;return a}function Ip(a,h,d,g,b){if(Array.isArray(h)){for(var S=0;S<h.length;S++)Ip(a,h[S],d,g,b);return null}return d=Wc(d),a&&a[gi]?a.L(h,d,l(g)?!!g.capture:!!g,b):wp(a,h,d,!0,g,b)}function Ep(a,h,d,g,b){if(Array.isArray(h))for(var S=0;S<h.length;S++)Ep(a,h[S],d,g,b);else g=l(g)?!!g.capture:!!g,d=Wc(d),a&&a[gi]?(a=a.i,h=String(h).toString(),h in a.g&&(S=a.g[h],d=Mc(S,d,g,b),-1<d&&(Qs(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete a.g[h],a.h--)))):a&&(a=qc(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Mc(h,d,g,b)),(d=-1<a?h[a]:null)&&Bc(d))}function Bc(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[gi])Lc(h.i,a);else{var d=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(d,g,a.capture):h.detachEvent?h.detachEvent(Tp(d),g):h.addListener&&h.removeListener&&h.removeListener(g),(d=qc(h))?(Lc(d,a),d.h==0&&(d.src=null,h[Fc]=null)):Qs(a)}}}function Tp(a){return a in Uc?Uc[a]:Uc[a]="on"+a}function DI(a,h){if(a.da)a=!0;else{h=new mi(h,this);var d=a.listener,g=a.ha||a.src;a.fa&&Bc(a),a=d.call(g,h)}return a}function qc(a){return a=a[Fc],a instanceof Ys?a:null}var jc="__closure_events_fn_"+(1e9*Math.random()>>>0);function Wc(a){return typeof a=="function"?a:(a[jc]||(a[jc]=function(h){return a.handleEvent(h)}),a[jc])}function De(){Jt.call(this),this.i=new Ys(this),this.M=this,this.F=null}C(De,Jt),De.prototype[gi]=!0,De.prototype.removeEventListener=function(a,h,d,g){Ep(this,a,h,d,g)};function Ue(a,h){var d,g=a.F;if(g)for(d=[];g;g=g.F)d.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new ke(h,a);else if(h instanceof ke)h.target=h.target||a;else{var b=h;h=new ke(g,a),w(h,b)}if(b=!0,d)for(var S=d.length-1;0<=S;S--){var x=h.g=d[S];b=Js(x,g,!0,h)&&b}if(x=h.g=a,b=Js(x,g,!0,h)&&b,b=Js(x,g,!1,h)&&b,d)for(S=0;S<d.length;S++)x=h.g=d[S],b=Js(x,g,!1,h)&&b}De.prototype.N=function(){if(De.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var d=a.g[h],g=0;g<d.length;g++)Qs(d[g]);delete a.g[h],a.h--}}this.F=null},De.prototype.K=function(a,h,d,g){return this.i.add(String(a),h,!1,d,g)},De.prototype.L=function(a,h,d,g){return this.i.add(String(a),h,!0,d,g)};function Js(a,h,d,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var b=!0,S=0;S<h.length;++S){var x=h[S];if(x&&!x.da&&x.capture==d){var se=x.listener,Re=x.ha||x.src;x.fa&&Lc(a.i,x),b=se.call(Re,g)!==!1&&b}}return b&&!g.defaultPrevented}function bp(a,h,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:c.setTimeout(a,h||0)}function Ap(a){a.g=bp(()=>{a.g=null,a.i&&(a.i=!1,Ap(a))},a.l);let h=a.h;a.h=null,a.m.apply(null,h)}class OI extends Jt{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Ap(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function _i(a){Jt.call(this),this.h=a,this.g={}}C(_i,Jt);var Sp=[];function Cp(a){ie(a.g,function(h,d){this.g.hasOwnProperty(d)&&Bc(h)},a),a.g={}}_i.prototype.N=function(){_i.aa.N.call(this),Cp(this)},_i.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var zc=c.JSON.stringify,xI=c.JSON.parse,VI=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function Gc(){}Gc.prototype.h=null;function Rp(a){return a.h||(a.h=a.i())}function Pp(){}var yi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function $c(){ke.call(this,"d")}C($c,ke);function Hc(){ke.call(this,"c")}C(Hc,ke);var Sn={},Np=null;function Xs(){return Np=Np||new De}Sn.La="serverreachability";function kp(a){ke.call(this,Sn.La,a)}C(kp,ke);function vi(a){let h=Xs();Ue(h,new kp(h))}Sn.STAT_EVENT="statevent";function Dp(a,h){ke.call(this,Sn.STAT_EVENT,a),this.stat=h}C(Dp,ke);function Be(a){let h=Xs();Ue(h,new Dp(h,a))}Sn.Ma="timingevent";function Op(a,h){ke.call(this,Sn.Ma,a),this.size=h}C(Op,ke);function wi(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},h)}function Ii(){this.g=!0}Ii.prototype.xa=function(){this.g=!1};function LI(a,h,d,g,b,S){a.info(function(){if(a.g)if(S)for(var x="",se=S.split("&"),Re=0;Re<se.length;Re++){var Z=se[Re].split("=");if(1<Z.length){var Oe=Z[0];Z=Z[1];var xe=Oe.split("_");x=2<=xe.length&&xe[1]=="type"?x+(Oe+"="+Z+"&"):x+(Oe+"=redacted&")}}else x=null;else x=S;return"XMLHTTP REQ ("+g+") [attempt "+b+"]: "+h+`
`+d+`
`+x})}function MI(a,h,d,g,b,S,x){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+b+"]: "+h+`
`+d+`
`+S+" "+x})}function dr(a,h,d,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+UI(a,d)+(g?" "+g:"")})}function FI(a,h){a.info(function(){return"TIMEOUT: "+h})}Ii.prototype.info=function(){};function UI(a,h){if(!a.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var g=d[a];if(!(2>g.length)){var b=g[1];if(Array.isArray(b)&&!(1>b.length)){var S=b[0];if(S!="noop"&&S!="stop"&&S!="close")for(var x=1;x<b.length;x++)b[x]=""}}}}return zc(d)}catch{return h}}var Zs={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},xp={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Kc;function eo(){}C(eo,Gc),eo.prototype.g=function(){return new XMLHttpRequest},eo.prototype.i=function(){return{}},Kc=new eo;function Xt(a,h,d,g){this.j=a,this.i=h,this.l=d,this.R=g||1,this.U=new _i(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vp}function Vp(){this.i=null,this.g="",this.h=!1}var Lp={},Qc={};function Yc(a,h,d){a.L=1,a.v=io(kt(h)),a.m=d,a.P=!0,Mp(a,null)}function Mp(a,h){a.F=Date.now(),to(a),a.A=kt(a.v);var d=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),Jp(d.i,"t",g),a.C=0,d=a.j.J,a.h=new Vp,a.g=mm(a.j,d?h:null,!a.m),0<a.O&&(a.M=new OI(m(a.Y,a,a.g),a.O)),h=a.U,d=a.g,g=a.ca;var b="readystatechange";Array.isArray(b)||(b&&(Sp[0]=b.toString()),b=Sp);for(var S=0;S<b.length;S++){var x=vp(d,b[S],g||h.handleEvent,!1,h.h||h);if(!x)break;h.g[x.key]=x}h=a.H?_(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),vi(),LI(a.i,a.u,a.A,a.l,a.R,a.m)}Xt.prototype.ca=function(a){a=a.target;let h=this.M;h&&Dt(a)==3?h.j():this.Y(a)},Xt.prototype.Y=function(a){try{if(a==this.g)e:{let xe=Dt(this.g);var h=this.g.Ba();let mr=this.g.Z();if(!(3>xe)&&(xe!=3||this.g&&(this.h.h||this.g.oa()||im(this.g)))){this.J||xe!=4||h==7||(h==8||0>=mr?vi(3):vi(2)),Jc(this);var d=this.g.Z();this.X=d;t:if(Fp(this)){var g=im(this.g);a="";var b=g.length,S=Dt(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Cn(this),Ei(this);var x="";break t}this.h.i=new c.TextDecoder}for(h=0;h<b;h++)this.h.h=!0,a+=this.h.i.decode(g[h],{stream:!(S&&h==b-1)});g.length=0,this.h.g+=a,this.C=0,x=this.h.g}else x=this.g.oa();if(this.o=d==200,MI(this.i,this.u,this.A,this.l,this.R,xe,d),this.o){if(this.T&&!this.K){t:{if(this.g){var se,Re=this.g;if((se=Re.g?Re.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(se)){var Z=se;break t}}Z=null}if(d=Z)dr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Xc(this,d);else{this.o=!1,this.s=3,Be(12),Cn(this),Ei(this);break e}}if(this.P){d=!0;let ct;for(;!this.J&&this.C<x.length;)if(ct=BI(this,x),ct==Qc){xe==4&&(this.s=4,Be(14),d=!1),dr(this.i,this.l,null,"[Incomplete Response]");break}else if(ct==Lp){this.s=4,Be(15),dr(this.i,this.l,x,"[Invalid Chunk]"),d=!1;break}else dr(this.i,this.l,ct,null),Xc(this,ct);if(Fp(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),xe!=4||x.length!=0||this.h.h||(this.s=1,Be(16),d=!1),this.o=this.o&&d,!d)dr(this.i,this.l,x,"[Invalid Chunked Response]"),Cn(this),Ei(this);else if(0<x.length&&!this.W){this.W=!0;var Oe=this.j;Oe.g==this&&Oe.ba&&!Oe.M&&(Oe.j.info("Great, no buffering proxy detected. Bytes received: "+x.length),iu(Oe),Oe.M=!0,Be(11))}}else dr(this.i,this.l,x,null),Xc(this,x);xe==4&&Cn(this),this.o&&!this.J&&(xe==4?hm(this.j,this):(this.o=!1,to(this)))}else rE(this.g),d==400&&0<x.indexOf("Unknown SID")?(this.s=3,Be(12)):(this.s=0,Be(13)),Cn(this),Ei(this)}}}catch{}finally{}};function Fp(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function BI(a,h){var d=a.C,g=h.indexOf(`
`,d);return g==-1?Qc:(d=Number(h.substring(d,g)),isNaN(d)?Lp:(g+=1,g+d>h.length?Qc:(h=h.slice(g,g+d),a.C=g+d,h)))}Xt.prototype.cancel=function(){this.J=!0,Cn(this)};function to(a){a.S=Date.now()+a.I,Up(a,a.I)}function Up(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=wi(m(a.ba,a),h)}function Jc(a){a.B&&(c.clearTimeout(a.B),a.B=null)}Xt.prototype.ba=function(){this.B=null;let a=Date.now();0<=a-this.S?(FI(this.i,this.A),this.L!=2&&(vi(),Be(17)),Cn(this),this.s=2,Ei(this)):Up(this,this.S-a)};function Ei(a){a.j.G==0||a.J||hm(a.j,a)}function Cn(a){Jc(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Cp(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Xc(a,h){try{var d=a.j;if(d.G!=0&&(d.g==a||Zc(d.h,a))){if(!a.K&&Zc(d.h,a)&&d.G==3){try{var g=d.Da.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var b=g;if(b[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)uo(d),ao(d);else break e;ru(d),Be(18)}}else d.za=b[1],0<d.za-d.T&&37500>b[2]&&d.F&&d.v==0&&!d.C&&(d.C=wi(m(d.Za,d),6e3));if(1>=jp(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Pn(d,11)}else if((a.K||d.g==a)&&uo(d),!U(h))for(b=d.Da.g.parse(h),h=0;h<b.length;h++){let Z=b[h];if(d.T=Z[0],Z=Z[1],d.G==2)if(Z[0]=="c"){d.K=Z[1],d.ia=Z[2];let Oe=Z[3];Oe!=null&&(d.la=Oe,d.j.info("VER="+d.la));let xe=Z[4];xe!=null&&(d.Aa=xe,d.j.info("SVER="+d.Aa));let mr=Z[5];mr!=null&&typeof mr=="number"&&0<mr&&(g=1.5*mr,d.L=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;let ct=a.g;if(ct){let ho=ct.g?ct.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ho){var S=g.h;S.g||ho.indexOf("spdy")==-1&&ho.indexOf("quic")==-1&&ho.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(eu(S,S.h),S.h=null))}if(g.D){let su=ct.g?ct.g.getResponseHeader("X-HTTP-Session-Id"):null;su&&(g.ya=su,ce(g.I,g.D,su))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),g=d;var x=a;if(g.qa=pm(g,g.J?g.ia:null,g.W),x.K){Wp(g.h,x);var se=x,Re=g.L;Re&&(se.I=Re),se.B&&(Jc(se),to(se)),g.g=x}else um(g);0<d.i.length&&co(d)}else Z[0]!="stop"&&Z[0]!="close"||Pn(d,7);else d.G==3&&(Z[0]=="stop"||Z[0]=="close"?Z[0]=="stop"?Pn(d,7):nu(d):Z[0]!="noop"&&d.l&&d.l.ta(Z),d.v=0)}}vi(4)}catch{}}var qI=class{constructor(a,h){this.g=a,this.map=h}};function Bp(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function qp(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function jp(a){return a.h?1:a.g?a.g.size:0}function Zc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function eu(a,h){a.g?a.g.add(h):a.h=h}function Wp(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Bp.prototype.cancel=function(){if(this.i=zp(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function zp(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(let d of a.g.values())h=h.concat(d.D);return h}return k(a.i)}function jI(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map!="undefined"&&a instanceof Map||typeof Set!="undefined"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],d=a.length,g=0;g<d;g++)h.push(a[g]);return h}h=[],d=0;for(g in a)h[d++]=a[g];return h}function WI(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map!="undefined"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set!="undefined"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var d=0;d<a;d++)h.push(d);return h}h=[],d=0;for(let g in a)h[d++]=g;return h}}}function Gp(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var d=WI(a),g=jI(a),b=g.length,S=0;S<b;S++)h.call(void 0,g[S],d&&d[S],a)}var $p=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function zI(a,h){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var g=a[d].indexOf("="),b=null;if(0<=g){var S=a[d].substring(0,g);b=a[d].substring(g+1)}else S=a[d];h(S,b?decodeURIComponent(b.replace(/\+/g," ")):"")}}}function Rn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof Rn){this.h=a.h,no(this,a.j),this.o=a.o,this.g=a.g,ro(this,a.s),this.l=a.l;var h=a.i,d=new Ai;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),Hp(this,d),this.m=a.m}else a&&(h=String(a).match($p))?(this.h=!1,no(this,h[1]||"",!0),this.o=Ti(h[2]||""),this.g=Ti(h[3]||"",!0),ro(this,h[4]),this.l=Ti(h[5]||"",!0),Hp(this,h[6]||"",!0),this.m=Ti(h[7]||"")):(this.h=!1,this.i=new Ai(null,this.h))}Rn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(bi(h,Kp,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(bi(h,Kp,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(bi(d,d.charAt(0)=="/"?HI:$I,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",bi(d,QI)),a.join("")};function kt(a){return new Rn(a)}function no(a,h,d){a.j=d?Ti(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function ro(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Hp(a,h,d){h instanceof Ai?(a.i=h,YI(a.i,a.h)):(d||(h=bi(h,KI)),a.i=new Ai(h,a.h))}function ce(a,h,d){a.i.set(h,d)}function io(a){return ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ti(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function bi(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,GI),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function GI(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Kp=/[#\/\?@]/g,$I=/[#\?:]/g,HI=/[#\?]/g,KI=/[#\?@]/g,QI=/#/g;function Ai(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Zt(a){a.g||(a.g=new Map,a.h=0,a.i&&zI(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}n=Ai.prototype,n.add=function(a,h){Zt(this),this.i=null,a=fr(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function Qp(a,h){Zt(a),h=fr(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Yp(a,h){return Zt(a),h=fr(a,h),a.g.has(h)}n.forEach=function(a,h){Zt(this),this.g.forEach(function(d,g){d.forEach(function(b){a.call(h,b,g,this)},this)},this)},n.na=function(){Zt(this);let a=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let g=0;g<h.length;g++){let b=a[g];for(let S=0;S<b.length;S++)d.push(h[g])}return d},n.V=function(a){Zt(this);let h=[];if(typeof a=="string")Yp(this,a)&&(h=h.concat(this.g.get(fr(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)h=h.concat(a[d])}return h},n.set=function(a,h){return Zt(this),this.i=null,a=fr(this,a),Yp(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},n.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Jp(a,h,d){Qp(a,h),0<d.length&&(a.i=null,a.g.set(fr(a,h),k(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var g=h[d];let S=encodeURIComponent(String(g)),x=this.V(g);for(g=0;g<x.length;g++){var b=S;x[g]!==""&&(b+="="+encodeURIComponent(String(x[g]))),a.push(b)}}return this.i=a.join("&")};function fr(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function YI(a,h){h&&!a.j&&(Zt(a),a.i=null,a.g.forEach(function(d,g){var b=g.toLowerCase();g!=b&&(Qp(this,g),Jp(this,b,d))},a)),a.j=h}function JI(a,h){let d=new Ii;if(c.Image){let g=new Image;g.onload=I(en,d,"TestLoadImage: loaded",!0,h,g),g.onerror=I(en,d,"TestLoadImage: error",!1,h,g),g.onabort=I(en,d,"TestLoadImage: abort",!1,h,g),g.ontimeout=I(en,d,"TestLoadImage: timeout",!1,h,g),c.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function XI(a,h){let d=new Ii,g=new AbortController,b=setTimeout(()=>{g.abort(),en(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(S=>{clearTimeout(b),S.ok?en(d,"TestPingServer: ok",!0,h):en(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(b),en(d,"TestPingServer: error",!1,h)})}function en(a,h,d,g,b){try{b&&(b.onload=null,b.onerror=null,b.onabort=null,b.ontimeout=null),g(d)}catch{}}function ZI(){this.g=new VI}function eE(a,h,d){let g=d||"";try{Gp(a,function(b,S){let x=b;l(b)&&(x=zc(b)),h.push(g+S+"="+encodeURIComponent(x))})}catch(b){throw h.push(g+"type="+encodeURIComponent("_badmap")),b}}function Si(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Si,Gc),Si.prototype.g=function(){return new so(this.l,this.j)},Si.prototype.i=function(a){return function(){return a}}({});function so(a,h){De.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(so,De),n=so.prototype,n.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Ri(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||c).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ci(this)),this.readyState=0},n.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Ri(this)),this.g&&(this.readyState=3,Ri(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Xp(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Xp(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}n.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ci(this):Ri(this),this.readyState==3&&Xp(this)}},n.Ra=function(a){this.g&&(this.response=this.responseText=a,Ci(this))},n.Qa=function(a){this.g&&(this.response=a,Ci(this))},n.ga=function(){this.g&&Ci(this)};function Ci(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Ri(a)}n.setRequestHeader=function(a,h){this.u.append(a,h)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Ri(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(so.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Zp(a){let h="";return ie(a,function(d,g){h+=g,h+=":",h+=d,h+=`\r
`}),h}function tu(a,h,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Zp(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ce(a,h,d))}function de(a){De.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(de,De);var tE=/^https?$/i,nE=["POST","PUT"];n=de.prototype,n.Ha=function(a){this.J=a},n.ea=function(a,h,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Kc.g(),this.v=this.o?Rp(this.o):Rp(Kc),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(S){em(this,S);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var b in g)d.set(b,g[b]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(let S of g.keys())d.set(S,g.get(S));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),b=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(nE,h,void 0))||g||b||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[S,x]of d)this.g.setRequestHeader(S,x);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{rm(this),this.u=!0,this.g.send(a),this.u=!1}catch(S){em(this,S)}};function em(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,tm(a),oo(a)}function tm(a){a.A||(a.A=!0,Ue(a,"complete"),Ue(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Ue(this,"complete"),Ue(this,"abort"),oo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),oo(this,!0)),de.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?nm(this):this.bb())},n.bb=function(){nm(this)};function nm(a){if(a.h&&typeof o!="undefined"&&(!a.v[1]||Dt(a)!=4||a.Z()!=2)){if(a.u&&Dt(a)==4)bp(a.Ea,0,a);else if(Ue(a,"readystatechange"),Dt(a)==4){a.h=!1;try{let x=a.Z();e:switch(x){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var g;if(g=x===0){var b=String(a.D).match($p)[1]||null;!b&&c.self&&c.self.location&&(b=c.self.location.protocol.slice(0,-1)),g=!tE.test(b?b.toLowerCase():"")}d=g}if(d)Ue(a,"complete"),Ue(a,"success");else{a.m=6;try{var S=2<Dt(a)?a.g.statusText:""}catch{S=""}a.l=S+" ["+a.Z()+"]",tm(a)}}finally{oo(a)}}}}function oo(a,h){if(a.g){rm(a);let d=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||Ue(a,"ready");try{d.onreadystatechange=g}catch{}}}function rm(a){a.I&&(c.clearTimeout(a.I),a.I=null)}n.isActive=function(){return!!this.g};function Dt(a){return a.g?a.g.readyState:0}n.Z=function(){try{return 2<Dt(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),xI(h)}};function im(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function rE(a){let h={};a=(a.g&&2<=Dt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(U(a[g]))continue;var d=T(a[g]);let b=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();let S=h[b]||[];h[b]=S,S.push(d)}E(h,function(g){return g.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Pi(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function sm(a){this.Aa=0,this.i=[],this.j=new Ii,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Pi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Pi("baseRetryDelayMs",5e3,a),this.cb=Pi("retryDelaySeedMs",1e4,a),this.Wa=Pi("forwardChannelMaxRetries",2,a),this.wa=Pi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Bp(a&&a.concurrentRequestLimit),this.Da=new ZI,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=sm.prototype,n.la=8,n.G=1,n.connect=function(a,h,d,g){Be(0),this.W=a,this.H=h||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.I=pm(this,null,this.W),co(this)};function nu(a){if(om(a),a.G==3){var h=a.U++,d=kt(a.I);if(ce(d,"SID",a.K),ce(d,"RID",h),ce(d,"TYPE","terminate"),Ni(a,d),h=new Xt(a,a.j,h),h.L=2,h.v=io(kt(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=h.v,d=!0),d||(h.g=mm(h.j,null),h.g.ea(h.v)),h.F=Date.now(),to(h)}fm(a)}function ao(a){a.g&&(iu(a),a.g.cancel(),a.g=null)}function om(a){ao(a),a.u&&(c.clearTimeout(a.u),a.u=null),uo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function co(a){if(!qp(a.h)&&!a.s){a.s=!0;var h=a.Ga;fi||yp(),pi||(fi(),pi=!0),Vc.add(h,a),a.B=0}}function iE(a,h){return jp(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=wi(m(a.Ga,a,h),dm(a,a.B)),a.B++,!0)}n.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;let b=new Xt(this,this.j,a),S=this.o;if(this.S&&(S?(S=_(S),w(S,this.S)):S=this.S),this.m!==null||this.O||(b.H=S,S=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=cm(this,b,h),d=kt(this.I),ce(d,"RID",a),ce(d,"CVER",22),this.D&&ce(d,"X-HTTP-Session-Id",this.D),Ni(this,d),S&&(this.O?h="headers="+encodeURIComponent(String(Zp(S)))+"&"+h:this.m&&tu(d,this.m,S)),eu(this.h,b),this.Ua&&ce(d,"TYPE","init"),this.P?(ce(d,"$req",h),ce(d,"SID","null"),b.T=!0,Yc(b,d,null)):Yc(b,d,h),this.G=2}}else this.G==3&&(a?am(this,a):this.i.length==0||qp(this.h)||am(this))};function am(a,h){var d;h?d=h.l:d=a.U++;let g=kt(a.I);ce(g,"SID",a.K),ce(g,"RID",d),ce(g,"AID",a.T),Ni(a,g),a.m&&a.o&&tu(g,a.m,a.o),d=new Xt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),h&&(a.i=h.D.concat(a.i)),h=cm(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),eu(a.h,d),Yc(d,g,h)}function Ni(a,h){a.H&&ie(a.H,function(d,g){ce(h,g,d)}),a.l&&Gp({},function(d,g){ce(h,g,d)})}function cm(a,h,d){d=Math.min(a.i.length,d);var g=a.l?m(a.l.Na,a.l,a):null;e:{var b=a.i;let S=-1;for(;;){let x=["count="+d];S==-1?0<d?(S=b[0].g,x.push("ofs="+S)):S=0:x.push("ofs="+S);let se=!0;for(let Re=0;Re<d;Re++){let Z=b[Re].g,Oe=b[Re].map;if(Z-=S,0>Z)S=Math.max(0,b[Re].g-100),se=!1;else try{eE(Oe,x,"req"+Z+"_")}catch{g&&g(Oe)}}if(se){g=x.join("&");break e}}}return a=a.i.splice(0,d),h.D=a,g}function um(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;fi||yp(),pi||(fi(),pi=!0),Vc.add(h,a),a.v=0}}function ru(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=wi(m(a.Fa,a),dm(a,a.v)),a.v++,!0)}n.Fa=function(){if(this.u=null,lm(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=wi(m(this.ab,this),a)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Be(10),ao(this),lm(this))};function iu(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function lm(a){a.g=new Xt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=kt(a.qa);ce(h,"RID","rpc"),ce(h,"SID",a.K),ce(h,"AID",a.T),ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ce(h,"TO",a.ja),ce(h,"TYPE","xmlhttp"),Ni(a,h),a.m&&a.o&&tu(h,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=io(kt(h)),d.m=null,d.P=!0,Mp(d,a)}n.Za=function(){this.C!=null&&(this.C=null,ao(this),ru(this),Be(19))};function uo(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function hm(a,h){var d=null;if(a.g==h){uo(a),iu(a),a.g=null;var g=2}else if(Zc(a.h,h))d=h.D,Wp(a.h,h),g=1;else return;if(a.G!=0){if(h.o)if(g==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var b=a.B;g=Xs(),Ue(g,new Op(g,d)),co(a)}else um(a);else if(b=h.s,b==3||b==0&&0<h.X||!(g==1&&iE(a,h)||g==2&&ru(a)))switch(d&&0<d.length&&(h=a.h,h.i=h.i.concat(d)),b){case 1:Pn(a,5);break;case 4:Pn(a,10);break;case 3:Pn(a,6);break;default:Pn(a,2)}}}function dm(a,h){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*h}function Pn(a,h){if(a.j.info("Error code "+h),h==2){var d=m(a.fb,a),g=a.Xa;let b=!g;g=new Rn(g||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||no(g,"https"),io(g),b?JI(g.toString(),d):XI(g.toString(),d)}else Be(2);a.G=0,a.l&&a.l.sa(h),fm(a),om(a)}n.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Be(2)):(this.j.info("Failed to ping google.com"),Be(1))};function fm(a){if(a.G=0,a.ka=[],a.l){let h=zp(a.h);(h.length!=0||a.i.length!=0)&&(P(a.ka,h),P(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function pm(a,h,d){var g=d instanceof Rn?kt(d):new Rn(d);if(g.g!="")h&&(g.g=h+"."+g.g),ro(g,g.s);else{var b=c.location;g=b.protocol,h=h?h+"."+b.hostname:b.hostname,b=+b.port;var S=new Rn(null);g&&no(S,g),h&&(S.g=h),b&&ro(S,b),d&&(S.l=d),g=S}return d=a.D,h=a.ya,d&&h&&ce(g,d,h),ce(g,"VER",a.la),Ni(a,g),g}function mm(a,h,d){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new de(new Si({eb:d})):new de(a.pa),h.Ha(a.J),h}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function gm(){}n=gm.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function lo(){}lo.prototype.g=function(a,h){return new Ye(a,h)};function Ye(a,h){De.call(this),this.g=new sm(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!U(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!U(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new pr(this)}C(Ye,De),Ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){nu(this.g)},Ye.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=zc(a),a=d);h.i.push(new qI(h.Ya++,a)),h.G==3&&co(h)},Ye.prototype.N=function(){this.g.l=null,delete this.j,nu(this.g),delete this.g,Ye.aa.N.call(this)};function _m(a){$c.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(let d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}C(_m,$c);function ym(){Hc.call(this),this.status=1}C(ym,Hc);function pr(a){this.g=a}C(pr,gm),pr.prototype.ua=function(){Ue(this.g,"a")},pr.prototype.ta=function(a){Ue(this.g,new _m(a))},pr.prototype.sa=function(a){Ue(this.g,new ym)},pr.prototype.ra=function(){Ue(this.g,"b")},lo.prototype.createWebChannel=lo.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,vl=Ft.createWebChannelTransport=function(){return new lo},yl=Ft.getStatEventTarget=function(){return Xs()},_l=Ft.Event=Sn,ta=Ft.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Zs.NO_ERROR=0,Zs.TIMEOUT=8,Zs.HTTP_ERROR=6,ts=Ft.ErrorCode=Zs,xp.COMPLETE="complete",gl=Ft.EventType=xp,Pp.EventType=yi,yi.OPEN="a",yi.CLOSE="b",yi.ERROR="c",yi.MESSAGE="d",De.prototype.listen=De.prototype.K,Tr=Ft.WebChannel=Pp,_A=Ft.FetchXmlHttpFactory=Si,de.prototype.listenOnce=de.prototype.L,de.prototype.getLastError=de.prototype.Ka,de.prototype.getLastErrorCode=de.prototype.Ba,de.prototype.getStatus=de.prototype.Z,de.prototype.getResponseJson=de.prototype.Oa,de.prototype.getResponseText=de.prototype.oa,de.prototype.send=de.prototype.ea,de.prototype.setWithCredentials=de.prototype.Ha,ml=Ft.XhrIo=de}).apply(typeof ea!="undefined"?ea:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var e_="@firebase/firestore",t_="4.8.0";var Le=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};Le.UNAUTHENTICATED=new Le(null),Le.GOOGLE_CREDENTIALS=new Le("google-credentials-uid"),Le.FIRST_PARTY=new Le("first-party-uid"),Le.MOCK_USER=new Le("mock-user");var Wr="11.10.0";var Gn=new yt("@firebase/firestore");function br(){return Gn.logLevel}function V(n,...e){if(Gn.logLevel<=G.DEBUG){let t=e.map(hd);Gn.debug(`Firestore (${Wr}): ${n}`,...t)}}function Bt(n,...e){if(Gn.logLevel<=G.ERROR){let t=e.map(hd);Gn.error(`Firestore (${Wr}): ${n}`,...t)}}function $n(n,...e){if(Gn.logLevel<=G.WARN){let t=e.map(hd);Gn.warn(`Firestore (${Wr}): ${n}`,...t)}}function hd(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function M(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,H_(n,r,t)}function H_(n,e,t){let r=`FIRESTORE (${Wr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Bt(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||H_(e,i,r)}function j(n,e){return n}var R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Je{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var st=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Tl=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},bl=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Le.UNAUTHENTICATED))}shutdown(){}};var Al=class{constructor(e){this.t=e,this.currentUser=Le.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i,i=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve(),s=new st;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new st,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new st)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new Tl(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new Le(e)}},Sl=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=Le.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Cl=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new Sl(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Le.FIRST_PARTY))}shutdown(){}invalidateToken(){}},ca=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Rl=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Pe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);let r=s=>{s.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.m;return this.m=s.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.V.getImmediate({optional:!0});s?i(s):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new ca(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new ca(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function yA(n){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}function K_(){return new TextEncoder}var cs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=yA(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}};function $(n,e){return n<e?-1:n>e?1:0}function Pl(n,e){let t=0;for(;t<n.length&&t<e.length;){let r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return $(r,i);{let s=K_(),o=vA(s.encode(n_(n,t)),s.encode(n_(e,t)));return o!==0?o:$(r,i)}}t+=r>65535?2:1}return $(n.length,e.length)}function n_(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function vA(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return $(n[t],e[t]);return $(n.length,e.length)}function kr(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var r_="__name__",ua=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&M(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&M(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=n.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return $(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):Pl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Mt.fromString(e.substring(4,e.length-2))}},ae=class n extends ua{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new O(R.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},wA=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Xe=class n extends ua{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return wA.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===r_}static keyField(){return new n([r_])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new O(R.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new O(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new O(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(r+=c,i++):(s(),i++)}if(s(),o)throw new O(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(ae.fromString(e))}static fromName(e){return new n(ae.fromString(e).popFirst(5))}static empty(){return new n(ae.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ae.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ae.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new ae(e.slice()))}};function Q_(n,e,t){if(!t)throw new O(R.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function IA(n,e,t,r){if(e===!0&&r===!0)throw new O(R.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function i_(n){if(!F.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function s_(n){if(F.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Y_(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Wa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":M(12329,{type:typeof n})}function qe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Wa(n);throw new O(R.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function EA(n,e){if(e<=0)throw new O(R.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}function we(n,e){let t={typeString:n};return e&&(t.value=e),t}function bs(n,e){if(!Y_(n))throw new O(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}let o=n[r];if(i&&typeof o!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new O(R.INVALID_ARGUMENT,t);return!0}var o_=-62135596800,a_=1e6,fe=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*a_);return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<o_)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/a_}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(bs(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-o_;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};fe._jsonSchemaVersion="firestore/timestamp/1.0",fe._jsonSchema={type:we("string",fe._jsonSchemaVersion),seconds:we("number"),nanoseconds:we("number")};var q=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new fe(0,0))}static max(){return new n(new fe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var us=-1,Nl=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};Nl.UNKNOWN_ID=-1;function TA(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=q.fromTimestamp(r===1e9?new fe(t+1,0):new fe(t,r));return new Hn(i,F.empty(),e)}function bA(n){return new Hn(n.readTime,n.key,us)}var Hn=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(q.min(),F.empty(),us)}static max(){return new n(q.max(),F.empty(),us)}};function AA(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}var SA="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",kl=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function zr(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==SA)throw n;V("LocalStore","Unexpectedly lost primary lease")}var N=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>r(u))}),o=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,o=new Array(s),c=0;for(let u=0;u<s;u++){let l=u;t(e[l]).next(f=>{o[l]=f,++c,c===s&&r(o)},f=>i(f))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function CA(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Gr(n){return n.name==="IndexedDbTransactionError"}var Dr=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};Dr.ue=-1;var dd=-1;function As(n){return n==null}function ls(n){return n===0&&1/n==-1/0}function RA(n){return typeof n=="number"&&Number.isInteger(n)&&!ls(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var J_="";function PA(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=c_(e)),e=NA(n.get(t),e);return c_(e)}function NA(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case J_:t+="";break;default:t+=s}}return t}function c_(n){return n+J_+""}var kA="remoteDocuments",X_="owner";var Z_="mutationQueues";var ey="mutations";var ty="documentMutations",DA="remoteDocumentsV14";var ny="remoteDocumentGlobal";var ry="targets";var iy="targetDocuments";var sy="targetGlobal",oy="collectionParents";var ay="clientMetadata";var cy="bundles";var uy="namedQueries";var OA="indexConfiguration";var xA="indexState";var VA="indexEntries";var ly="documentOverlays";var LA="globals";var MA=[Z_,ey,ty,kA,ry,X_,sy,iy,ay,ny,oy,cy,uy],QN=[...MA,ly],FA=[Z_,ey,ty,DA,ry,X_,sy,iy,ay,ny,oy,cy,uy,ly],UA=FA,BA=[...UA,OA,xA,VA];var YN=[...BA,LA];function u_(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function vn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function hy(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var pe=class n{constructor(e,t){this.comparator=e,this.root=t||St.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,St.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,St.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Rr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Rr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Rr(this.root,e,this.comparator,!0)}},Rr=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},St=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw M(27949);return e+(this.isRed()?0:1)}};St.EMPTY=null,St.RED=!0,St.BLACK=!1;St.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new St(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var Ae=class n{constructor(e){this.comparator=e,this.data=new pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new la(this.data.getIterator())}getIteratorFrom(e){return new la(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},la=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var it=class n{constructor(e){this.fields=e,e.sort(Xe.comparator)}static empty(){return new n([])}unionWith(e){let t=new Ae(Xe.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return kr(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var ha=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Me=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new ha("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Me.EMPTY_BYTE_STRING=new Me("");var qA=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function qt(n){if(X(!!n,39018),typeof n=="string"){let e=0,t=qA.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ue(n.seconds),nanos:ue(n.nanos)}}function ue(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function jt(n){return typeof n=="string"?Me.fromBase64String(n):Me.fromUint8Array(n)}var dy="server_timestamp",fy="__type__",py="__previous_value__",my="__local_write_time__";function fd(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[fy])===null||t===void 0?void 0:t.stringValue)===dy}function za(n){let e=n.mapValue.fields[py];return fd(e)?za(e):e}function hs(n){let e=qt(n.mapValue.fields[my].timestampValue);return new fe(e.seconds,e.nanos)}var Dl=class{constructor(e,t,r,i,s,o,c,u,l,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=l,this.isUsingEmulator=f}},da="(default)",fa=class n{constructor(e,t){this.projectId=e,this.database=t||da}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===da}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var pd="__type__",gy="__max__",na={mapValue:{fields:{__type__:{stringValue:gy}}}},md="__vector__",Or="value";function pn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fd(n)?4:yy(n)?9007199254740991:_y(n)?10:11:M(28295,{value:n})}function Rt(n,e){if(n===e)return!0;let t=pn(n);if(t!==pn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return hs(n).isEqual(hs(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=qt(i.timestampValue),c=qt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return jt(i.bytesValue).isEqual(jt(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return ue(i.geoPointValue.latitude)===ue(s.geoPointValue.latitude)&&ue(i.geoPointValue.longitude)===ue(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return ue(i.integerValue)===ue(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=ue(i.doubleValue),c=ue(s.doubleValue);return o===c?ls(o)===ls(c):isNaN(o)&&isNaN(c)}return!1}(n,e);case 9:return kr(n.arrayValue.values||[],e.arrayValue.values||[],Rt);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(u_(o)!==u_(c))return!1;for(let u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!Rt(o[u],c[u])))return!1;return!0}(n,e);default:return M(52216,{left:n})}}function ds(n,e){return(n.values||[]).find(t=>Rt(t,e))!==void 0}function xr(n,e){if(n===e)return 0;let t=pn(n),r=pn(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return function(s,o){let c=ue(s.integerValue||s.doubleValue),u=ue(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return l_(n.timestampValue,e.timestampValue);case 4:return l_(hs(n),hs(e));case 5:return Pl(n.stringValue,e.stringValue);case 6:return function(s,o){let c=jt(s),u=jt(o);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),u=o.split("/");for(let l=0;l<c.length&&l<u.length;l++){let f=$(c[l],u[l]);if(f!==0)return f}return $(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,o){let c=$(ue(s.latitude),ue(o.latitude));return c!==0?c:$(ue(s.longitude),ue(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return h_(n.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,l,f;let p=s.fields||{},m=o.fields||{},I=(c=p[Or])===null||c===void 0?void 0:c.arrayValue,C=(u=m[Or])===null||u===void 0?void 0:u.arrayValue,k=$(((l=I==null?void 0:I.values)===null||l===void 0?void 0:l.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return k!==0?k:h_(I,C)}(n.mapValue,e.mapValue);case 11:return function(s,o){if(s===na.mapValue&&o===na.mapValue)return 0;if(s===na.mapValue)return 1;if(o===na.mapValue)return-1;let c=s.fields||{},u=Object.keys(c),l=o.fields||{},f=Object.keys(l);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){let m=Pl(u[p],f[p]);if(m!==0)return m;let I=xr(c[u[p]],l[f[p]]);if(I!==0)return I}return $(u.length,f.length)}(n.mapValue,e.mapValue);default:throw M(23264,{le:t})}}function l_(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);let t=qt(n),r=qt(e),i=$(t.seconds,r.seconds);return i!==0?i:$(t.nanos,r.nanos)}function h_(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=xr(t[i],r[i]);if(s)return s}return $(t.length,r.length)}function Vr(n){return Ol(n)}function Ol(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=qt(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return jt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Ol(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of r)s?s=!1:i+=",",i+=`${o}:${Ol(t.fields[o])}`;return i+"}"}(n.mapValue):M(61005,{value:n})}function sa(n){switch(pn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=za(n);return e?16+sa(e):16;case 5:return 2*n.stringValue.length;case 6:return jt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+sa(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return vn(r.fields,(s,o)=>{i+=s.length+sa(o)}),i}(n.mapValue);default:throw M(13486,{value:n})}}function d_(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function xl(n){return!!n&&"integerValue"in n}function gd(n){return!!n&&"arrayValue"in n}function f_(n){return!!n&&"nullValue"in n}function p_(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function oa(n){return!!n&&"mapValue"in n}function _y(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[pd])===null||t===void 0?void 0:t.stringValue)===md}function rs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return vn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=rs(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=rs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function yy(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===gy}var XN={mapValue:{fields:{[pd]:{stringValue:md},[Or]:{arrayValue:{}}}}};var Ke=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!oa(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=rs(t)}setAll(e){let t=Xe.emptyPath(),r={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,r,i),r={},i=[],t=c.popLast()}o?r[c.lastSegment()]=rs(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());oa(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Rt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];oa(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){vn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(rs(this.value))}};function vy(n){let e=[];return vn(n.fields,(t,r)=>{let i=new Xe([t]);if(oa(r)){let s=vy(r.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new it(e)}var et=class n{constructor(e,t,r,i,s,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new n(e,0,q.min(),q.min(),q.min(),Ke.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,q.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,q.min(),q.min(),Ke.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,q.min(),q.min(),Ke.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ke.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ke.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Lr=class{constructor(e,t){this.position=e,this.inclusive=t}};function m_(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],o=n.position[i];if(s.field.isKeyField()?r=F.comparator(F.fromName(o.referenceValue),t.key):r=xr(o,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function g_(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Rt(n.position[t],e.position[t]))return!1;return!0}var Kn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function jA(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var pa=class{},ve=class n extends pa{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Ll(e,t,r):t==="array-contains"?new Ul(e,r):t==="in"?new Bl(e,r):t==="not-in"?new ql(e,r):t==="array-contains-any"?new jl(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new Ml(e,r):new Fl(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(xr(t,this.value)):t!==null&&pn(this.value)===pn(t)&&this.matchesComparison(xr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},ft=class n extends pa{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new n(e,t)}matches(e){return wy(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function wy(n){return n.op==="and"}function Iy(n){return WA(n)&&wy(n)}function WA(n){for(let e of n.filters)if(e instanceof ft)return!1;return!0}function Vl(n){if(n instanceof ve)return n.field.canonicalString()+n.op.toString()+Vr(n.value);if(Iy(n))return n.filters.map(e=>Vl(e)).join(",");{let e=n.filters.map(t=>Vl(t)).join(",");return`${n.op}(${e})`}}function Ey(n,e){return n instanceof ve?function(r,i){return i instanceof ve&&r.op===i.op&&r.field.isEqual(i.field)&&Rt(r.value,i.value)}(n,e):n instanceof ft?function(r,i){return i instanceof ft&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,c)=>s&&Ey(o,i.filters[c]),!0):!1}(n,e):void M(19439)}function Ty(n){return n instanceof ve?function(t){return`${t.field.canonicalString()} ${t.op} ${Vr(t.value)}`}(n):n instanceof ft?function(t){return t.op.toString()+" {"+t.getFilters().map(Ty).join(" ,")+"}"}(n):"Filter"}var Ll=class extends ve{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},Ml=class extends ve{constructor(e,t){super(e,"in",t),this.keys=by("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Fl=class extends ve{constructor(e,t){super(e,"not-in",t),this.keys=by("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function by(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var Ul=class extends ve{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return gd(t)&&ds(t.arrayValue,this.value)}},Bl=class extends ve{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&ds(this.value.arrayValue,t)}},ql=class extends ve{constructor(e,t){super(e,"not-in",t)}matches(e){if(ds(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ds(this.value.arrayValue,t)}},jl=class extends ve{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!gd(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ds(this.value.arrayValue,r))}};var Wl=class{constructor(e,t=null,r=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.Pe=null}};function __(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Wl(n,e,t,r,i,s,o)}function _d(n){let e=j(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Vl(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),As(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Vr(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Vr(r)).join(",")),e.Pe=t}return e.Pe}function yd(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!jA(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ey(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!g_(n.startAt,e.startAt)&&g_(n.endAt,e.endAt)}function zl(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var mn=class{constructor(e,t=null,r=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function zA(n,e,t,r,i,s,o,c){return new mn(n,e,t,r,i,s,o,c)}function Ga(n){return new mn(n)}function y_(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ay(n){return n.collectionGroup!==null}function is(n){let e=j(n);if(e.Te===null){e.Te=[];let t=new Set;for(let s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new Ae(Xe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(c=c.add(l.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Kn(s,r))}),t.has(Xe.keyField().canonicalString())||e.Te.push(new Kn(Xe.keyField(),r))}return e.Te}function Ct(n){let e=j(n);return e.Ie||(e.Ie=GA(e,is(n))),e.Ie}function GA(n,e){if(n.limitType==="F")return __(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new Kn(i.field,s)});let t=n.endAt?new Lr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Lr(n.startAt.position,n.startAt.inclusive):null;return __(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Gl(n,e){let t=n.filters.concat([e]);return new mn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function ma(n,e,t){return new mn(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function $a(n,e){return yd(Ct(n),Ct(e))&&n.limitType===e.limitType}function Sy(n){return`${_d(Ct(n))}|lt:${n.limitType}`}function Ar(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>Ty(i)).join(", ")}]`),As(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Vr(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Vr(i)).join(",")),`Target(${r})`}(Ct(n))}; limitType=${n.limitType})`}function Ha(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):F.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of is(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(o,c,u){let l=m_(o,c,u);return o.inclusive?l<=0:l<0}(r.startAt,is(r),i)||r.endAt&&!function(o,c,u){let l=m_(o,c,u);return o.inclusive?l>=0:l>0}(r.endAt,is(r),i))}(n,e)}function $A(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Cy(n){return(e,t)=>{let r=!1;for(let i of is(n)){let s=HA(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function HA(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(s,o,c){let u=o.data.field(s),l=c.data.field(s);return u!==null&&l!==null?xr(u,l):M(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return M(19790,{direction:n.dir})}}var Wt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){vn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return hy(this.inner)}size(){return this.innerSize}};var KA=new pe(F.comparator);function zt(){return KA}var Ry=new pe(F.comparator);function ns(...n){let e=Ry;for(let t of n)e=e.insert(t.key,t);return e}function Py(n){let e=Ry;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function jn(){return ss()}function Ny(){return ss()}function ss(){return new Wt(n=>n.toString(),(n,e)=>n.isEqual(e))}var QA=new pe(F.comparator),YA=new Ae(F.comparator);function Y(...n){let e=YA;for(let t of n)e=e.add(t);return e}var JA=new Ae($);function XA(){return JA}function vd(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ls(e)?"-0":e}}function ky(n){return{integerValue:""+n}}function Dy(n,e){return RA(e)?ky(e):vd(n,e)}var Mr=class{constructor(){this._=void 0}};function ZA(n,e,t){return n instanceof Qn?function(i,s){let o={fields:{[fy]:{stringValue:dy},[my]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&fd(s)&&(s=za(s)),s&&(o.fields[py]=s),{mapValue:o}}(t,e):n instanceof Yn?xy(n,e):n instanceof Jn?Vy(n,e):function(i,s){let o=Oy(i,s),c=v_(o)+v_(i.Ee);return xl(o)&&xl(i.Ee)?ky(c):vd(i.serializer,c)}(n,e)}function eS(n,e,t){return n instanceof Yn?xy(n,e):n instanceof Jn?Vy(n,e):t}function Oy(n,e){return n instanceof Xn?function(r){return xl(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var Qn=class extends Mr{},Yn=class extends Mr{constructor(e){super(),this.elements=e}};function xy(n,e){let t=Ly(e);for(let r of n.elements)t.some(i=>Rt(i,r))||t.push(r);return{arrayValue:{values:t}}}var Jn=class extends Mr{constructor(e){super(),this.elements=e}};function Vy(n,e){let t=Ly(e);for(let r of n.elements)t=t.filter(i=>!Rt(i,r));return{arrayValue:{values:t}}}var Xn=class extends Mr{constructor(e,t){super(),this.serializer=e,this.Ee=t}};function v_(n){return ue(n.integerValue||n.doubleValue)}function Ly(n){return gd(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var ga=class{constructor(e,t){this.field=e,this.transform=t}};function tS(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof Yn&&i instanceof Yn||r instanceof Jn&&i instanceof Jn?kr(r.elements,i.elements,Rt):r instanceof Xn&&i instanceof Xn?Rt(r.Ee,i.Ee):r instanceof Qn&&i instanceof Qn}(n.transform,e.transform)}var $l=class{constructor(e,t){this.version=e,this.transformResults=t}},be=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function aa(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Fr=class{};function My(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new er(n.key,be.none()):new Zn(n.key,n.data,be.none());{let t=n.data,r=Ke.empty(),i=new Ae(Xe.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Pt(n.key,r,new it(i.toArray()),be.none())}}function nS(n,e,t){n instanceof Zn?function(i,s,o){let c=i.value.clone(),u=I_(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Pt?function(i,s,o){if(!aa(i.precondition,s))return void s.convertToUnknownDocument(o.version);let c=I_(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(Fy(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function os(n,e,t,r){return n instanceof Zn?function(s,o,c,u){if(!aa(s.precondition,o))return c;let l=s.value.clone(),f=E_(s.fieldTransforms,u,o);return l.setAll(f),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,e,t,r):n instanceof Pt?function(s,o,c,u){if(!aa(s.precondition,o))return c;let l=E_(s.fieldTransforms,u,o),f=o.data;return f.setAll(Fy(s)),f.setAll(l),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(n,e,t,r):function(s,o,c){return aa(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(n,e,t)}function rS(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=Oy(r.transform,i||null);s!=null&&(t===null&&(t=Ke.empty()),t.set(r.field,s))}return t||null}function w_(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&kr(r,i,(s,o)=>tS(s,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var Zn=class extends Fr{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Pt=class extends Fr{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function Fy(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function I_(n,e,t){let r=new Map;X(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){let s=n[i],o=s.transform,c=e.data.field(s.field);r.set(s.field,eS(o,c,t[i]))}return r}function E_(n,e,t){let r=new Map;for(let i of n){let s=i.transform,o=t.data.field(i.field);r.set(i.field,ZA(s,o,e))}return r}var er=class extends Fr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},_a=class extends Fr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Hl=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&nS(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=os(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=os(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=Ny();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;let u=My(o,c);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Y())}isEqual(e){return this.batchId===e.batchId&&kr(this.mutations,e.mutations,(t,r)=>w_(t,r))&&kr(this.baseMutations,e.baseMutations,(t,r)=>w_(t,r))}},Kl=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return QA}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new n(e,t,r,i)}};var Ql=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var Yl=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var _e,J;function Uy(n){switch(n){case R.OK:return M(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return M(15467,{code:n})}}function By(n){if(n===void 0)return Bt("GRPC error has no .code"),R.UNKNOWN;switch(n){case _e.OK:return R.OK;case _e.CANCELLED:return R.CANCELLED;case _e.UNKNOWN:return R.UNKNOWN;case _e.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case _e.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case _e.INTERNAL:return R.INTERNAL;case _e.UNAVAILABLE:return R.UNAVAILABLE;case _e.UNAUTHENTICATED:return R.UNAUTHENTICATED;case _e.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case _e.NOT_FOUND:return R.NOT_FOUND;case _e.ALREADY_EXISTS:return R.ALREADY_EXISTS;case _e.PERMISSION_DENIED:return R.PERMISSION_DENIED;case _e.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case _e.ABORTED:return R.ABORTED;case _e.OUT_OF_RANGE:return R.OUT_OF_RANGE;case _e.UNIMPLEMENTED:return R.UNIMPLEMENTED;case _e.DATA_LOSS:return R.DATA_LOSS;default:return M(39323,{code:n})}}(J=_e||(_e={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";var T_=null;var iS=new Mt([4294967295,4294967295],0);function b_(n){let e=K_().encode(n),t=new pl;return t.update(e),new Uint8Array(t.digest())}function A_(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Mt([t,r],0),new Mt([i,s],0)]}var Jl=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Wn(`Invalid padding: ${t}`);if(r<0)throw new Wn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Wn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Wn(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Mt.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(Mt.fromNumber(r)));return i.compare(iS)===1&&(i=new Mt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let t=b_(e),[r,i]=A_(t);for(let s=0;s<this.hashCount;s++){let o=this.pe(r,i,s);if(!this.ye(o))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new n(s,i,t);return r.forEach(c=>o.insert(c)),o}insert(e){if(this.fe===0)return;let t=b_(e),[r,i]=A_(t);for(let s=0;s<this.hashCount;s++){let o=this.pe(r,i,s);this.we(o)}}we(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},Wn=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var ya=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,fs.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(q.min(),i,new pe($),zt(),Y())}},fs=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,Y(),Y(),Y())}};var Pr=class{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}},va=class{constructor(e,t){this.targetId=e,this.De=t}},wa=class{constructor(e,t,r=Me.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},Ia=class{constructor(){this.ve=0,this.Ce=S_(),this.Fe=Me.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=Y(),t=Y(),r=Y();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:M(38017,{changeType:s})}}),new fs(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=S_()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},Xl=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=zt(),this.je=ra(),this.Je=ra(),this.He=new pe($)}Ye(e){for(let t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(let t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{let r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:M(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){let t=e.targetId,r=e.De.count,i=this.st(t);if(i){let s=i.target;if(zl(s))if(r===0){let o=new F(s.path);this.Xe(t,o,et.newNoDocument(o,q.min()))}else X(r===1,20013,{expectedCount:r});else{let o=this.ot(t);if(o!==r){let c=this._t(e),u=c?this.ut(c,e,o):1;if(u!==0){this.rt(t);let l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,l)}T_==null||T_.ct(function(f,p,m,I,C){var k,P,B,U,W,re;let Fe={localCacheCount:f,existenceFilterCount:p.count,databaseId:m.database,projectId:m.projectId},ie=p.unchangedNames;return ie&&(Fe.bloomFilter={applied:C===0,hashCount:(k=ie==null?void 0:ie.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(U=(B=(P=ie==null?void 0:ie.bits)===null||P===void 0?void 0:P.bitmap)===null||B===void 0?void 0:B.length)!==null&&U!==void 0?U:0,padding:(re=(W=ie==null?void 0:ie.bits)===null||W===void 0?void 0:W.padding)!==null&&re!==void 0?re:0,mightContain:E=>{var _;return(_=I==null?void 0:I.mightContain(E))!==null&&_!==void 0&&_}}),Fe}(o,e.De,this.We.lt(),c,u))}}}}_t(e){let t=e.De.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,o,c;try{o=jt(r).toUint8Array()}catch(u){if(u instanceof ha)return $n("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Jl(o,i,s)}catch(u){return $n(u instanceof Wn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){let r=this.We.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let o=this.We.lt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Xe(t,s,null),i++)}),i}Pt(e){let t=new Map;this.Ge.forEach((s,o)=>{let c=this.st(o);if(c){if(s.current&&zl(c.target)){let u=new F(c.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,et.newNoDocument(u,e))}s.Ne&&(t.set(o,s.Le()),s.ke())}});let r=Y();this.Je.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{let l=this.st(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ze.forEach((s,o)=>o.setReadTime(e));let i=new ya(e,t,this.He,this.ze,r);return this.ze=zt(),this.je=ra(),this.Je=ra(),this.He=new pe($),i}Ze(e,t){if(!this.nt(e))return;let r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;let i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){let t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Ia,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new Ae($),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new Ae($),this.je=this.je.insert(e,t)),t}nt(e){let t=this.st(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}st(e){let t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Ia),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}};function ra(){return new pe(F.comparator)}function S_(){return new pe(F.comparator)}var sS={asc:"ASCENDING",desc:"DESCENDING"},oS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},aS={and:"AND",or:"OR"},Zl=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function eh(n,e){return n.useProto3Json||As(e)?e:{value:e}}function Ea(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function qy(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function cS(n,e){return Ea(n,e.toTimestamp())}function Ze(n){return X(!!n,49232),q.fromTimestamp(function(t){let r=qt(t);return new fe(r.seconds,r.nanos)}(n))}function wd(n,e){return th(n,e).canonicalString()}function th(n,e){let t=function(i){return new ae(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function jy(n){let e=ae.fromString(n);return X(Ky(e),10190,{key:e.toString()}),e}function Ta(n,e){return wd(n.databaseId,e.path)}function as(n,e){let t=jy(e);if(t.get(1)!==n.databaseId.projectId)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(zy(t))}function Wy(n,e){return wd(n.databaseId,e)}function uS(n){let e=jy(n);return e.length===4?ae.emptyPath():zy(e)}function nh(n){return new ae(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function zy(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function C_(n,e,t){return{name:Ta(n,e),fields:t.value.mapValue.fields}}function lS(n,e){return"found"in e?function(r,i){X(!!i.found,43571),i.found.name,i.found.updateTime;let s=as(r,i.found.name),o=Ze(i.found.updateTime),c=i.found.createTime?Ze(i.found.createTime):q.min(),u=new Ke({mapValue:{fields:i.found.fields}});return et.newFoundDocument(s,o,c,u)}(n,e):"missing"in e?function(r,i){X(!!i.missing,3894),X(!!i.readTime,22933);let s=as(r,i.missing),o=Ze(i.readTime);return et.newNoDocument(s,o)}(n,e):M(7234,{result:e})}function hS(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:M(39313,{state:l})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(l,f){return l.useProto3Json?(X(f===void 0||typeof f=="string",58123),Me.fromBase64String(f||"")):(X(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Me.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(l){let f=l.code===void 0?R.UNKNOWN:By(l.code);return new O(f,l.message||"")}(o);t=new wa(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=as(n,r.document.name),s=Ze(r.document.updateTime),o=r.document.createTime?Ze(r.document.createTime):q.min(),c=new Ke({mapValue:{fields:r.document.fields}}),u=et.newFoundDocument(i,s,o,c),l=r.targetIds||[],f=r.removedTargetIds||[];t=new Pr(l,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=as(n,r.document),s=r.readTime?Ze(r.readTime):q.min(),o=et.newNoDocument(i,s),c=r.removedTargetIds||[];t=new Pr([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=as(n,r.document),s=r.removedTargetIds||[];t=new Pr([],s,i,null)}else{if(!("filter"in e))return M(11601,{At:e});{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,o=new Yl(i,s),c=r.targetId;t=new va(c,o)}}return t}function Gy(n,e){let t;if(e instanceof Zn)t={update:C_(n,e.key,e.value)};else if(e instanceof er)t={delete:Ta(n,e.key)};else if(e instanceof Pt)t={update:C_(n,e.key,e.data),updateMask:wS(e.fieldMask)};else{if(!(e instanceof _a))return M(16599,{Rt:e.type});t={verify:Ta(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let c=o.transform;if(c instanceof Qn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Yn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Jn)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Xn)return{fieldPath:o.field.canonicalString(),increment:c.Ee};throw M(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:cS(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M(27497)}(n,e.precondition)),t}function dS(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map(t=>function(i,s){let o=i.updateTime?Ze(i.updateTime):Ze(s);return o.isEqual(q.min())&&(o=Ze(s)),new $l(o,i.transformResults||[])}(t,e))):[]}function fS(n,e){return{documents:[Wy(n,e.path)]}}function pS(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Wy(n,i);let s=function(l){if(l.length!==0)return Hy(ft.create(l,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(l){if(l.length!==0)return l.map(f=>function(m){return{field:Sr(m.field),direction:_S(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=eh(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),{Vt:t,parent:i}}function mS(n){let e=uS(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){X(r===1,65062);let f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(p){let m=$y(p);return m instanceof ft&&Iy(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(C){return new Kn(Cr(C.field),function(P){switch(P){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(t.orderBy));let c=null;t.limit&&(c=function(p){let m;return m=typeof p=="object"?p.value:p,As(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(p){let m=!!p.before,I=p.values||[];return new Lr(I,m)}(t.startAt));let l=null;return t.endAt&&(l=function(p){let m=!p.before,I=p.values||[];return new Lr(I,m)}(t.endAt)),zA(e,i,o,s,c,"F",u,l)}function gS(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function $y(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Cr(t.unaryFilter.field);return ve.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Cr(t.unaryFilter.field);return ve.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Cr(t.unaryFilter.field);return ve.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=Cr(t.unaryFilter.field);return ve.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(n):n.fieldFilter!==void 0?function(t){return ve.create(Cr(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return ft.create(t.compositeFilter.filters.map(r=>$y(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(t.compositeFilter.op))}(n):M(30097,{filter:n})}function _S(n){return sS[n]}function yS(n){return oS[n]}function vS(n){return aS[n]}function Sr(n){return{fieldPath:n.canonicalString()}}function Cr(n){return Xe.fromServerFormat(n.fieldPath)}function Hy(n){return n instanceof ve?function(t){if(t.op==="=="){if(p_(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NAN"}};if(f_(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(p_(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NAN"}};if(f_(t.value))return{unaryFilter:{field:Sr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Sr(t.field),op:yS(t.op),value:t.value}}}(n):n instanceof ft?function(t){let r=t.getFilters().map(i=>Hy(i));return r.length===1?r[0]:{compositeFilter:{op:vS(t.op),filters:r}}}(n):M(54877,{filter:n})}function wS(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Ky(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var ps=class n{constructor(e,t,r,i,s=q.min(),o=q.min(),c=Me.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var rh=class{constructor(e){this.gt=e}};function IS(n){let e=mS({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?ma(e,e.limit,"L"):e}var ba=class{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(ue(e.integerValue));else if("doubleValue"in e){let r=ue(e.doubleValue);isNaN(r)?this.Ct(t,13):(this.Ct(t,15),ls(r)?t.Ft(0):t.Ft(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ct(t,20),typeof r=="string"&&(r=qt(r)),t.Mt(`${r.seconds||""}`),t.Ft(r.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(jt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ct(t,45),t.Ft(r.latitude||0),t.Ft(r.longitude||0)}else"mapValue"in e?yy(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):_y(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):M(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){let r=e.fields||{};this.Ct(t,55);for(let i of Object.keys(r))this.xt(i,t),this.Dt(r[i],t)}Lt(e,t){var r,i;let s=e.fields||{};this.Ct(t,53);let o=Or,c=((i=(r=s[o].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(ue(c)),this.xt(o,t),this.Dt(s[o],t)}qt(e,t){let r=e.values||[];this.Ct(t,50);for(let i of r)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),F.fromName(e).path.forEach(r=>{this.Ct(t,60),this.$t(r,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}};ba.Ut=new ba;var ih=class{constructor(){this.Dn=new sh}addToCollectionParentIndex(e,t){return this.Dn.add(t),N.resolve()}getCollectionParents(e,t){return N.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return N.resolve()}deleteFieldIndex(e,t){return N.resolve()}deleteAllFieldIndexes(e){return N.resolve()}createTargetIndexes(e,t){return N.resolve()}getDocumentsMatchingTarget(e,t){return N.resolve(null)}getIndexType(e,t){return N.resolve(0)}getFieldIndexes(e,t){return N.resolve([])}getNextCollectionGroupToUpdate(e){return N.resolve(null)}getMinOffset(e,t){return N.resolve(Hn.min())}getMinOffsetFromCollectionGroup(e,t){return N.resolve(Hn.min())}updateCollectionGroup(e,t,r){return N.resolve()}updateIndexEntries(e,t){return N.resolve()}},sh=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new Ae(ae.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ae(ae.comparator)).toArray()}};var ZN=new Uint8Array(0);var R_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Qy=41943040,rt=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};rt.DEFAULT_COLLECTION_PERCENTILE=10,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,rt.DEFAULT=new rt(Qy,rt.DEFAULT_COLLECTION_PERCENTILE,rt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),rt.DISABLED=new rt(-1,0,0);var ms=class n{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var P_="LruGarbageCollector",Yy=1048576;function N_([n,e],[t,r]){let i=$(n,t);return i===0?$(e,r):i}var oh=class{constructor(e){this.Tr=e,this.buffer=new Ae(N_),this.Ir=0}dr(){return++this.Ir}Er(e){let t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();N_(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},ah=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){V(P_,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Gr(t)?V(P_,"Ignoring IndexedDB error during garbage collection: ",t):await zr(t)}await this.Rr(3e5)})}},ch=class{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return N.resolve(Dr.ue);let r=new oh(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),N.resolve(R_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),R_):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,o,c,u,l,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,c=Date.now(),this.removeTargets(e,r,t))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(l=Date.now(),br()<=G.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(l-u)+`ms
Total Duration: ${l-f}ms`),N.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}};function ES(n,e){return new ch(n,e)}var uh=class{constructor(){this.changes=new Wt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,et.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?N.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var lh=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var hh=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&os(r.mutation,i,it.empty(),fe.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,Y()).next(()=>r))}getLocalViewOfDocuments(e,t,r=Y()){let i=jn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let o=ns();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let r=jn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,Y()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,r,i){let s=zt(),o=ss(),c=function(){return ss()}();return t.forEach((u,l)=>{let f=r.get(l.key);i.has(l.key)&&(f===void 0||f.mutation instanceof Pt)?s=s.insert(l.key,l):f!==void 0?(o.set(l.key,f.mutation.getFieldMask()),os(f.mutation,l,f.mutation.getFieldMask(),fe.now())):o.set(l.key,it.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((l,f)=>o.set(l,f)),t.forEach((l,f)=>{var p;return c.set(l,new lh(f,(p=o.get(l))!==null&&p!==void 0?p:null))}),c))}recalculateAndSaveOverlays(e,t){let r=ss(),i=new pe((o,c)=>o-c),s=Y();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(u=>{let l=t.get(u);if(l===null)return;let f=r.get(u)||it.empty();f=c.applyToLocalView(l,f),r.set(u,f);let p=(i.get(c.batchId)||Y()).add(u);i=i.insert(c.batchId,p)})}).next(()=>{let o=[],c=i.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),l=u.key,f=u.value,p=Ny();f.forEach(m=>{if(!s.has(m)){let I=My(t.get(m),r.get(m));I!==null&&p.set(m,I),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,l,p))}return N.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(o){return F.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Ay(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):N.resolve(jn()),c=us,u=s;return o.next(l=>N.forEach(l,(f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(f)?N.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,l,s)).next(()=>this.computeViews(e,u,l,Y())).next(f=>({batchId:c,changes:Py(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let i=ns();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,o=ns();return this.indexManager.getCollectionParents(e,s).next(c=>N.forEach(c,u=>{let l=function(p,m){return new mn(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,l,r,i).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(o=>{s.forEach((u,l)=>{let f=l.getKey();o.get(f)===null&&(o=o.insert(f,et.newInvalidDocument(f)))});let c=ns();return o.forEach((u,l)=>{let f=s.get(u);f!==void 0&&os(f.mutation,l,it.empty(),fe.now()),Ha(t,l)&&(c=c.insert(u,l))}),c})}};var dh=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return N.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ze(i.createTime)}}(t)),N.resolve()}getNamedQuery(e,t){return N.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:IS(i.bundledQuery),readTime:Ze(i.readTime)}}(t)),N.resolve()}};var fh=class{constructor(){this.overlays=new pe(F.comparator),this.kr=new Map}getOverlay(e,t){return N.resolve(this.overlays.get(t))}getOverlays(e,t){let r=jn();return N.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),N.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),N.resolve()}getOverlaysForCollection(e,t,r){let i=jn(),s=t.length+1,o=new F(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let u=c.getNext().value,l=u.getKey();if(!t.isPrefixOf(l.path))break;l.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return N.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new pe((l,f)=>l-f),o=this.overlays.getIterator();for(;o.hasNext();){let l=o.getNext().value;if(l.getKey().getCollectionGroup()===t&&l.largestBatchId>r){let f=s.get(l.largestBatchId);f===null&&(f=jn(),s=s.insert(l.largestBatchId,f)),f.set(l.getKey(),l)}}let c=jn(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,f)=>c.set(l,f)),!(c.size()>=i)););return N.resolve(c)}wt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let o=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new Ql(t,r));let s=this.kr.get(t);s===void 0&&(s=Y(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}};var ph=class{constructor(){this.sessionToken=Me.EMPTY_BYTE_STRING}getSessionToken(e){return N.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,N.resolve()}};var gs=class{constructor(){this.qr=new Ae(ye.Qr),this.$r=new Ae(ye.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){let r=new ye(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ye(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){let t=new F(new ae([])),r=new ye(t,e),i=new ye(t,e+1),s=[];return this.$r.forEachInRange([r,i],o=>{this.Wr(o),s.push(o.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let t=new F(new ae([])),r=new ye(t,e),i=new ye(t,e+1),s=Y();return this.$r.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new ye(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ye=class{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return F.comparator(e.key,t.key)||$(e.Hr,t.Hr)}static Ur(e,t){return $(e.Hr,t.Hr)||F.comparator(e.key,t.key)}};var mh=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new Ae(ye.Qr)}checkEmpty(e){return N.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new Hl(s,t,r,i);this.mutationQueue.push(o);for(let c of i)this.Yr=this.Yr.add(new ye(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return N.resolve(o)}lookupMutationBatch(e,t){return N.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Xr(r),s=i<0?0:i;return N.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return N.resolve(this.mutationQueue.length===0?dd:this.er-1)}getAllMutationBatches(e){return N.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ye(t,0),i=new ye(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],o=>{let c=this.Zr(o.Hr);s.push(c)}),N.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new Ae($);return t.forEach(i=>{let s=new ye(i,0),o=new ye(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,o],c=>{r=r.add(c.Hr)})}),N.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;F.isDocumentKey(s)||(s=s.child(""));let o=new ye(new F(s),0),c=new Ae($);return this.Yr.forEachWhile(u=>{let l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===i&&(c=c.add(u.Hr)),!0)},o),N.resolve(this.ei(c))}ei(e){let t=[];return e.forEach(r=>{let i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){X(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return N.forEach(t.mutations,i=>{let s=new ye(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){let r=new ye(t,0),i=this.Yr.firstAfterOrEqual(r);return N.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,N.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var gh=class{constructor(e){this.ni=e,this.docs=function(){return new pe(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,o=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return N.resolve(r?r.document.mutableCopy():et.newInvalidDocument(t))}getEntries(e,t){let r=zt();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():et.newInvalidDocument(i))}),N.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=zt(),o=t.path,c=new F(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){let{key:l,value:{document:f}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||AA(bA(f),r)<=0||(i.has(f.key)||Ha(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return N.resolve(s)}getAllFromCollectionGroup(e,t,r,i){M(9500)}ri(e,t){return N.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new _h(this)}getSize(e){return N.resolve(this.size)}},_h=class extends uh{constructor(e){super(),this.Or=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),N.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}};var yh=class{constructor(e){this.persistence=e,this.ii=new Wt(t=>_d(t),yd),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new gs,this.targetCount=0,this._i=ms.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),N.resolve()}getLastRemoteSnapshotVersion(e){return N.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return N.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),N.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),N.resolve()}hr(e){this.ii.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this._i=new ms(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,N.resolve()}updateTargetData(e,t){return this.hr(t),N.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,N.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.ii.forEach((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),N.waitFor(s).next(()=>i)}getTargetCount(e){return N.resolve(this.targetCount)}getTargetData(e,t){let r=this.ii.get(t)||null;return N.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),N.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),N.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),N.resolve()}getMatchingKeysForTargetId(e,t){let r=this.oi.Jr(t);return N.resolve(r)}containsKey(e,t){return N.resolve(this.oi.containsKey(t))}};var Aa=class{constructor(e,t){this.ai={},this.overlays={},this.ui=new Dr(0),this.ci=!1,this.ci=!0,this.li=new ph,this.referenceDelegate=e(this),this.hi=new yh(this),this.indexManager=new ih,this.remoteDocumentCache=function(i){return new gh(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new rh(t),this.Ti=new dh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new fh,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new mh(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){V("MemoryPersistence","Starting transaction:",e);let i=new vh(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return N.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}},vh=class extends kl{constructor(e){super(),this.currentSequenceNumber=e}},wh=class n{constructor(e){this.persistence=e,this.Ai=new gs,this.Ri=null}static Vi(e){return new n(e)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),N.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),N.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),N.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return N.forEach(this.mi,r=>{let i=F.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return N.or([()=>N.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}},Sa=class n{constructor(e,t){this.persistence=e,this.gi=new Wt(r=>PA(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=ES(this,t)}static Vi(e,t){return new n(e,t)}Ii(){}di(e){return N.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){let t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return N.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?N.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,t).next(c=>{c||(r++,s.removeEntry(o,q.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),N.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),N.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),N.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),N.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=sa(e.data.value)),t}Sr(e,t,r){return N.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.gi.get(t);return N.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Ih=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=Y(),i=Y();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var Eh=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var Th=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Pm()?8:CA(Te())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ps(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new Eh;return this.ws(e,t,o).next(c=>{if(s.result=c,this.Rs)return this.Ss(e,t,o,c.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(br()<=G.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Ar(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),N.resolve()):(br()<=G.DEBUG&&V("QueryEngine","Query:",Ar(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(br()<=G.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Ar(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ct(t))):N.resolve())}ps(e,t){if(y_(t))return N.resolve(null);let r=Ct(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ma(t,null,"F"),r=Ct(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let o=Y(...s);return this.gs.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{let l=this.bs(t,c);return this.Ds(t,l,o,u.readTime)?this.ps(e,ma(t,null,"F")):this.vs(e,l,t,u)}))})))}ys(e,t,r,i){return y_(t)||i.isEqual(q.min())?N.resolve(null):this.gs.getDocuments(e,r).next(s=>{let o=this.bs(t,s);return this.Ds(t,o,r,i)?N.resolve(null):(br()<=G.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ar(t)),this.vs(e,o,t,TA(i,us)).next(c=>c))})}bs(e,t){let r=new Ae(Cy(e));return t.forEach((i,s)=>{Ha(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return br()<=G.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Ar(t)),this.gs.getDocumentsMatchingQuery(e,t,Hn.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var Id="LocalStore",TS=3e8,bh=class{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new pe($),this.Ms=new Wt(s=>_d(s),yd),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hh(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}};function bS(n,e,t,r){return new bh(n,e,t,r)}async function Jy(n,e){let t=j(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let o=[],c=[],u=Y();for(let l of i){o.push(l.batchId);for(let f of l.mutations)u=u.add(f.key)}for(let l of s){c.push(l.batchId);for(let f of l.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(l=>({Bs:l,removedBatchIds:o,addedBatchIds:c}))})})}function AS(n,e){let t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,u,l,f){let p=l.batch,m=p.keys(),I=N.resolve();return m.forEach(C=>{I=I.next(()=>f.getEntry(u,C)).next(k=>{let P=l.docVersions.get(C);X(P!==null,48541),k.version.compareTo(P)<0&&(p.applyToRemoteDocument(k,l),k.isValidDocument()&&(k.setReadTime(l.commitVersion),f.addEntry(k)))})}),I.next(()=>c.mutationQueue.removeMutationBatch(u,p))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=Y();for(let l=0;l<c.mutationResults.length;++l)c.mutationResults[l].transformResults.length>0&&(u=u.add(c.batch.mutations[l].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function Xy(n){let e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function SS(n,e){let t=j(n),r=e.snapshotVersion,i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;let c=[];e.targetChanges.forEach((f,p)=>{let m=i.get(p);if(!m)return;c.push(t.hi.removeMatchingKeys(s,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,p)));let I=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(Me.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(p,I),function(k,P,B){return k.resumeToken.approximateByteSize()===0||P.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=TS?!0:B.addedDocuments.size+B.modifiedDocuments.size+B.removedDocuments.size>0}(m,I,f)&&c.push(t.hi.updateTargetData(s,I))});let u=zt(),l=Y();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(CS(s,o,e.documentUpdates).next(f=>{u=f.Ls,l=f.ks})),!r.isEqual(q.min())){let f=t.hi.getLastRemoteSnapshotVersion(s).next(p=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(f)}return N.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,l)).next(()=>u)}).then(s=>(t.Fs=i,s))}function CS(n,e,t){let r=Y(),i=Y();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let o=zt();return t.forEach((c,u)=>{let l=s.get(c);u.isFoundDocument()!==l.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):V(Id,"Ignoring outdated watch update for ",c,". Current version:",l.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function RS(n,e){let t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=dd),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function PS(n,e){let t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,N.resolve(i)):t.hi.allocateTargetId(r).next(o=>(i=new ps(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Ah(n,e,t){let r=j(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Gr(o))throw o;V(Id,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function k_(n,e,t){let r=j(n),i=q.min(),s=Y();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,f){let p=j(u),m=p.Ms.get(f);return m!==void 0?N.resolve(p.Fs.get(m)):p.hi.getTargetData(l,f)}(r,o,Ct(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>r.Cs.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?s:Y())).next(c=>(NS(r,$A(e),c),{documents:c,qs:s})))}function NS(n,e,t){let r=n.xs.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}var Ca=class{constructor(){this.activeTargetIds=XA()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Sh=class{constructor(){this.Fo=new Ca,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Ca,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Ch=class{xo(e){}shutdown(){}};var D_="ConnectivityMonitor",Ra=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){V(D_,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){V(D_,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var ia=null;function Rh(){return ia===null?ia=function(){return 268435456+Math.round(2147483648*Math.random())}():ia++,"0x"+ia.toString(16)}var wl="RestConnection",kS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Ph=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===da?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){let o=Rh(),c=this.Go(e,t.toUriEncodedString());V(wl,`Sending RPC '${e}' ${o}:`,c,r);let u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,s);let{host:l}=new URL(c),f=ut(l);return this.jo(e,c,u,r,f).then(p=>(V(wl,`Received RPC '${e}' ${o}: `,p),p),p=>{throw $n(wl,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p})}Jo(e,t,r,i,s,o){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Wr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){let r=kS[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}};var Nh=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var Ve="WebChannelConnection",kh=class extends Ph{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){let o=Rh();return new Promise((c,u)=>{let l=new ml;l.setWithCredentials(!0),l.listenOnce(gl.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ts.NO_ERROR:let p=l.getResponseJson();V(Ve,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case ts.TIMEOUT:V(Ve,`RPC '${e}' ${o} timed out`),u(new O(R.DEADLINE_EXCEEDED,"Request time out"));break;case ts.HTTP_ERROR:let m=l.getStatus();if(V(Ve,`RPC '${e}' ${o} failed with status:`,m,"response text:",l.getResponseText()),m>0){let I=l.getResponseJson();Array.isArray(I)&&(I=I[0]);let C=I==null?void 0:I.error;if(C&&C.status&&C.message){let k=function(B){let U=B.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(U)>=0?U:R.UNKNOWN}(C.status);u(new O(k,C.message))}else u(new O(R.UNKNOWN,"Server responded with status "+l.getStatus()))}else u(new O(R.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:e,streamId:o,l_:l.getLastErrorCode(),h_:l.getLastError()})}}finally{V(Ve,`RPC '${e}' ${o} completed.`)}});let f=JSON.stringify(i);V(Ve,`RPC '${e}' ${o} sending request:`,i),l.send(t,"POST",f,r,15)})}P_(e,t,r){let i=Rh(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=vl(),c=yl(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;let f=s.join("");V(Ve,`Creating RPC '${e}' stream ${i}: ${f}`,u);let p=o.createWebChannel(f,u);this.T_(p);let m=!1,I=!1,C=new Nh({Ho:P=>{I?V(Ve,`Not sending because RPC '${e}' stream ${i} is closed:`,P):(m||(V(Ve,`Opening RPC '${e}' stream ${i} transport.`),p.open(),m=!0),V(Ve,`RPC '${e}' stream ${i} sending:`,P),p.send(P))},Yo:()=>p.close()}),k=(P,B,U)=>{P.listen(B,W=>{try{U(W)}catch(re){setTimeout(()=>{throw re},0)}})};return k(p,Tr.EventType.OPEN,()=>{I||(V(Ve,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),k(p,Tr.EventType.CLOSE,()=>{I||(I=!0,V(Ve,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(p))}),k(p,Tr.EventType.ERROR,P=>{I||(I=!0,$n(Ve,`RPC '${e}' stream ${i} transport errored. Name:`,P.name,"Message:",P.message),C.__(new O(R.UNAVAILABLE,"The operation could not be completed")))}),k(p,Tr.EventType.MESSAGE,P=>{var B;if(!I){let U=P.data[0];X(!!U,16349);let W=U,re=(W==null?void 0:W.error)||((B=W[0])===null||B===void 0?void 0:B.error);if(re){V(Ve,`RPC '${e}' stream ${i} received error:`,re);let Fe=re.status,ie=function(v){let w=_e[v];if(w!==void 0)return By(w)}(Fe),E=re.message;ie===void 0&&(ie=R.INTERNAL,E="Unknown error status: "+Fe+" with message "+re.message),I=!0,C.__(new O(ie,E)),p.close()}else V(Ve,`RPC '${e}' stream ${i} received:`,U),C.a_(U)}}),k(c,_l.STAT_EVENT,P=>{P.stat===ta.PROXY?V(Ve,`RPC '${e}' stream ${i} detected buffering proxy`):P.stat===ta.NOPROXY&&V(Ve,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}};function Il(){return typeof document!="undefined"?document:null}function Ka(n){return new Zl(n,!0)}var _s=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var O_="PersistentStream",Pa=class{constructor(e,t,r,i,s,o,c,u){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new _s(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(Bt(t.toString()),Bt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{let i=new O(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){let r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return V(O_,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(V(O_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Dh=class extends Pa{constructor(e,t,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let t=hS(this.serializer,e),r=function(s){if(!("targetChange"in s))return q.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?Ze(o.readTime):q.min()}(e);return this.listener.J_(t,r)}H_(e){let t={};t.database=nh(this.serializer),t.addTarget=function(s,o){let c,u=o.target;if(c=zl(u)?{documents:fS(s,u)}:{query:pS(s,u).Vt},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=qy(s,o.resumeToken);let l=eh(s,o.expectedCount);l!==null&&(c.expectedCount=l)}else if(o.snapshotVersion.compareTo(q.min())>0){c.readTime=Ea(s,o.snapshotVersion.toTimestamp());let l=eh(s,o.expectedCount);l!==null&&(c.expectedCount=l)}return c}(this.serializer,e);let r=gS(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){let t={};t.database=nh(this.serializer),t.removeTarget=e,this.k_(t)}},Oh=class extends Pa{constructor(e,t,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,o),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let t=dS(e.writeResults,e.commitTime),r=Ze(e.commitTime);return this.listener.ta(r,t)}na(){let e={};e.database=nh(this.serializer),this.k_(e)}X_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Gy(this.serializer,r))};this.k_(t)}};var xh=class{},Vh=class extends xh{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Wo(e,th(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new O(R.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Jo(e,th(t,r),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(R.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},Lh=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Bt(t),this._a=!1):V("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var tr="RemoteStore",Mh=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(o=>{r.enqueueAndForget(async()=>{rr(this)&&(V(tr,"Restarting streams for network reachability change."),await async function(u){let l=j(u);l.Ia.add(4),await Ss(l),l.Aa.set("Unknown"),l.Ia.delete(4),await Qa(l)}(this))})}),this.Aa=new Lh(r,i)}};async function Qa(n){if(rr(n))for(let e of n.da)await e(!0)}async function Ss(n){for(let e of n.da)await e(!1)}function Zy(n,e){let t=j(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Ad(t)?bd(t):$r(t).x_()&&Td(t,e))}function Ed(n,e){let t=j(n),r=$r(t);t.Ta.delete(e),r.x_()&&ev(t,e),t.Ta.size===0&&(r.x_()?r.B_():rr(t)&&t.Aa.set("Unknown"))}function Td(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$r(n).H_(e)}function ev(n,e){n.Ra.$e(e),$r(n).Y_(e)}function bd(n){n.Ra=new Xl({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),$r(n).start(),n.Aa.aa()}function Ad(n){return rr(n)&&!$r(n).M_()&&n.Ta.size>0}function rr(n){return j(n).Ia.size===0}function tv(n){n.Ra=void 0}async function DS(n){n.Aa.set("Online")}async function OS(n){n.Ta.forEach((e,t)=>{Td(n,e)})}async function xS(n,e){tv(n),Ad(n)?(n.Aa.la(e),bd(n)):n.Aa.set("Unknown")}async function VS(n,e,t){if(n.Aa.set("Online"),e instanceof wa&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let c of s.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,e)}catch(r){V(tr,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Na(n,r)}else if(e instanceof Pr?n.Ra.Ye(e):e instanceof va?n.Ra.it(e):n.Ra.et(e),!t.isEqual(q.min()))try{let r=await Xy(n.localStore);t.compareTo(r)>=0&&await function(s,o){let c=s.Ra.Pt(o);return c.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){let f=s.Ta.get(l);f&&s.Ta.set(l,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,l)=>{let f=s.Ta.get(u);if(!f)return;s.Ta.set(u,f.withResumeToken(Me.EMPTY_BYTE_STRING,f.snapshotVersion)),ev(s,u);let p=new ps(f.target,u,l,f.sequenceNumber);Td(s,p)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){V(tr,"Failed to raise snapshot:",r),await Na(n,r)}}async function Na(n,e,t){if(!Gr(e))throw e;n.Ia.add(1),await Ss(n),n.Aa.set("Offline"),t||(t=()=>Xy(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{V(tr,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await Qa(n)})}function nv(n,e){return e().catch(t=>Na(n,t,e))}async function Ya(n){let e=j(n),t=gn(e),r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:dd;for(;LS(e);)try{let i=await RS(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,MS(e,i)}catch(i){await Na(e,i)}rv(e)&&iv(e)}function LS(n){return rr(n)&&n.Pa.length<10}function MS(n,e){n.Pa.push(e);let t=gn(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function rv(n){return rr(n)&&!gn(n).M_()&&n.Pa.length>0}function iv(n){gn(n).start()}async function FS(n){gn(n).na()}async function US(n){let e=gn(n);for(let t of n.Pa)e.X_(t.mutations)}async function BS(n,e,t){let r=n.Pa.shift(),i=Kl.from(r,e,t);await nv(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Ya(n)}async function qS(n,e){e&&gn(n).Z_&&await async function(r,i){if(function(o){return Uy(o)&&o!==R.ABORTED}(i.code)){let s=r.Pa.shift();gn(r).N_(),await nv(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Ya(r)}}(n,e),rv(n)&&iv(n)}async function x_(n,e){let t=j(n);t.asyncQueue.verifyOperationInProgress(),V(tr,"RemoteStore received new credentials");let r=rr(t);t.Ia.add(3),await Ss(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Qa(t)}async function jS(n,e){let t=j(n);e?(t.Ia.delete(2),await Qa(t)):e||(t.Ia.add(2),await Ss(t),t.Aa.set("Unknown"))}function $r(n){return n.Va||(n.Va=function(t,r,i){let s=j(t);return s.ia(),new Dh(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:DS.bind(null,n),e_:OS.bind(null,n),n_:xS.bind(null,n),J_:VS.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Ad(n)?bd(n):n.Aa.set("Unknown")):(await n.Va.stop(),tv(n))})),n.Va}function gn(n){return n.ma||(n.ma=function(t,r,i){let s=j(t);return s.ia(),new Oh(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:FS.bind(null,n),n_:qS.bind(null,n),ea:US.bind(null,n),ta:BS.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Ya(n)):(await n.ma.stop(),n.Pa.length>0&&(V(tr,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}var Fh=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new st,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,c=new n(e,t,o,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Sd(n,e){if(Bt("AsyncQueue",`${e}: ${n}`),Gr(n))return new O(R.UNAVAILABLE,`${e}: ${n}`);throw n}var ka=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=ns(),this.sortedSet=new pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var Da=class{constructor(){this.fa=new pe(F.comparator)}track(e){let t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):M(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){let e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}},Ur=class n{constructor(e,t,r,i,s,o,c,u,l){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(e,t,r,i,s){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new n(e,t,ka.emptySet(t),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$a(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Uh=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},Bh=class{constructor(){this.queries=V_(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){let i=j(t),s=i.queries;i.queries=V_(),s.forEach((o,c)=>{for(let u of c.wa)u.onError(r)})})(this,new O(R.ABORTED,"Firestore shutting down"))}};function V_(){return new Wt(n=>Sy(n),$a)}async function Cd(n,e){let t=j(n),r=3,i=e.query,s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new Uh,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){let c=Sd(o,`Initialization of query '${Ar(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Pd(t)}async function Rd(n,e){let t=j(n),r=e.query,i=3,s=t.queries.get(r);if(s){let o=s.wa.indexOf(e);o>=0&&(s.wa.splice(o,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function WS(n,e){let t=j(n),r=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let c of o.wa)c.Ca(i)&&(r=!0);o.ya=i}}r&&Pd(t)}function zS(n,e,t){let r=j(n),i=r.queries.get(e);if(i)for(let s of i.wa)s.onError(t);r.queries.delete(e)}function Pd(n){n.Da.forEach(e=>{e.next()})}var qh,L_;(L_=qh||(qh={})).Fa="default",L_.Cache="cache";var ys=class{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Ur(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;let r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Ur.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==qh.Cache}};var Oa=class{constructor(e){this.key=e}},xa=class{constructor(e){this.key=e}},jh=class{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=Y(),this.mutatedKeys=Y(),this.Xa=Cy(e),this.eu=new ka(this.Xa)}get tu(){return this.Ha}nu(e,t){let r=t?t.ru:new Da,i=t?t.eu:this.eu,s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1,u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,l=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{let m=i.get(f),I=Ha(this.query,p)?p:null,C=!!m&&this.mutatedKeys.has(m.key),k=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations),P=!1;m&&I?m.data.isEqual(I.data)?C!==k&&(r.track({type:3,doc:I}),P=!0):this.iu(m,I)||(r.track({type:2,doc:I}),P=!0,(u&&this.Xa(I,u)>0||l&&this.Xa(I,l)<0)&&(c=!0)):!m&&I?(r.track({type:0,doc:I}),P=!0):m&&!I&&(r.track({type:1,doc:m}),P=!0,(u||l)&&(c=!0)),P&&(I?(o=o.add(I),s=k?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:o,ru:r,Ds:c,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let o=e.ru.pa();o.sort((f,p)=>function(I,C){let k=P=>{switch(P){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:P})}};return k(I)-k(C)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(r),i=i!=null&&i;let c=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,l=u!==this.Ya;return this.Ya=u,o.length!==0||l?{snapshot:new Ur(this.query,e.eu,s,o,e.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Da,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=Y(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new xa(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new Oa(r))}),t}uu(e){this.Ha=e.qs,this.Za=Y();let t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Ur.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},Nd="SyncEngine",Wh=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},zh=class{constructor(e){this.key=e,this.lu=!1}},Gh=class{constructor(e,t,r,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new Wt(c=>Sy(c),$a),this.Tu=new Map,this.Iu=new Set,this.du=new pe(F.comparator),this.Eu=new Map,this.Au=new gs,this.Ru={},this.Vu=new Map,this.mu=ms.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function GS(n,e,t=!0){let r=lv(n),i,s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await sv(r,e,t,!0),i}async function $S(n,e){let t=lv(n);await sv(t,e,!0,!1)}async function sv(n,e,t,r){let i=await PS(n.localStore,Ct(e)),s=i.targetId,o=n.sharedClientState.addLocalQueryTarget(s,t),c;return r&&(c=await HS(n,e,s,o==="current",i.resumeToken)),n.isPrimaryClient&&t&&Zy(n.remoteStore,i),c}async function HS(n,e,t,r,i){n.gu=(p,m,I)=>async function(k,P,B,U){let W=P.view.nu(B);W.Ds&&(W=await k_(k.localStore,P.query,!1).then(({documents:E})=>P.view.nu(E,W)));let re=U&&U.targetChanges.get(P.targetId),Fe=U&&U.targetMismatches.get(P.targetId)!=null,ie=P.view.applyChanges(W,k.isPrimaryClient,re,Fe);return F_(k,P.targetId,ie._u),ie.snapshot}(n,p,m,I);let s=await k_(n.localStore,e,!0),o=new jh(e,s.qs),c=o.nu(s.documents),u=fs.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),l=o.applyChanges(c,n.isPrimaryClient,u);F_(n,t,l._u);let f=new Wh(e,t,o);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),l.snapshot}async function KS(n,e,t){let r=j(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(o=>!$a(o,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Ah(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Ed(r.remoteStore,i.targetId),$h(r,i.targetId)}).catch(zr)):($h(r,i.targetId),await Ah(r.localStore,i.targetId,!0))}async function QS(n,e){let t=j(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Ed(t.remoteStore,r.targetId))}async function YS(n,e,t){let r=r0(n);try{let i=await function(o,c){let u=j(o),l=fe.now(),f=c.reduce((I,C)=>I.add(C.key),Y()),p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let C=zt(),k=Y();return u.Os.getEntries(I,f).next(P=>{C=P,C.forEach((B,U)=>{U.isValidDocument()||(k=k.add(B))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,C)).next(P=>{p=P;let B=[];for(let U of c){let W=rS(U,p.get(U.key).overlayedDocument);W!=null&&B.push(new Pt(U.key,W,vy(W.value.mapValue),be.exists(!0)))}return u.mutationQueue.addMutationBatch(I,l,B,c)}).next(P=>{m=P;let B=P.applyToLocalDocumentSet(p,k);return u.documentOverlayCache.saveOverlays(I,P.batchId,B)})}).then(()=>({batchId:m.batchId,changes:Py(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let l=o.Ru[o.currentUser.toKey()];l||(l=new pe($)),l=l.insert(c,u),o.Ru[o.currentUser.toKey()]=l}(r,i.batchId,t),await Cs(r,i.changes),await Ya(r.remoteStore)}catch(i){let s=Sd(i,"Failed to persist write");t.reject(s)}}async function ov(n,e){let t=j(n);try{let r=await SS(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Eu.get(s);o&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?X(o.lu,14607):i.removedDocuments.size>0&&(X(o.lu,42227),o.lu=!1))}),await Cs(t,r,e)}catch(r){await zr(r)}}function M_(n,e,t){let r=j(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Pu.forEach((s,o)=>{let c=o.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){let u=j(o);u.onlineState=c;let l=!1;u.queries.forEach((f,p)=>{for(let m of p.wa)m.va(c)&&(l=!0)}),l&&Pd(u)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function JS(n,e,t){let r=j(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Eu.get(e),s=i&&i.key;if(s){let o=new pe(F.comparator);o=o.insert(s,et.newNoDocument(s,q.min()));let c=Y().add(s),u=new ya(q.min(),new Map,new pe($),o,c);await ov(r,u),r.du=r.du.remove(s),r.Eu.delete(e),kd(r)}else await Ah(r.localStore,e,!1).then(()=>$h(r,e,t)).catch(zr)}async function XS(n,e){let t=j(n),r=e.batch.batchId;try{let i=await AS(t.localStore,e);cv(t,r,null),av(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Cs(t,i)}catch(i){await zr(i)}}async function ZS(n,e,t){let r=j(n);try{let i=await function(o,c){let u=j(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let f;return u.mutationQueue.lookupMutationBatch(l,c).next(p=>(X(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(l,p))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,f)).next(()=>u.localDocuments.getDocuments(l,f))})}(r.localStore,e);cv(r,e,t),av(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Cs(r,i)}catch(i){await zr(i)}}function av(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function cv(n,e,t){let r=j(n),i=r.Ru[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function $h(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||uv(n,r)})}function uv(n,e){n.Iu.delete(e.path.canonicalString());let t=n.du.get(e);t!==null&&(Ed(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),kd(n))}function F_(n,e,t){for(let r of t)r instanceof Oa?(n.Au.addReference(r.key,e),e0(n,r)):r instanceof xa?(V(Nd,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||uv(n,r.key)):M(19791,{yu:r})}function e0(n,e){let t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(V(Nd,"New document in limbo: "+t),n.Iu.add(r),kd(n))}function kd(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let e=n.Iu.values().next().value;n.Iu.delete(e);let t=new F(ae.fromString(e)),r=n.mu.next();n.Eu.set(r,new zh(t)),n.du=n.du.insert(t,r),Zy(n.remoteStore,new ps(Ct(Ga(t.path)),r,"TargetPurposeLimboResolution",Dr.ue))}}async function Cs(n,e,t){let r=j(n),i=[],s=[],o=[];r.Pu.isEmpty()||(r.Pu.forEach((c,u)=>{o.push(r.gu(u,e,t).then(l=>{var f;if((l||t)&&r.isPrimaryClient){let p=l?!l.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(l){i.push(l);let p=Ih.Es(u.targetId,l);s.push(p)}}))}),await Promise.all(o),r.hu.J_(i),await async function(u,l){let f=j(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>N.forEach(l,m=>N.forEach(m.Is,I=>f.persistence.referenceDelegate.addReference(p,m.targetId,I)).next(()=>N.forEach(m.ds,I=>f.persistence.referenceDelegate.removeReference(p,m.targetId,I)))))}catch(p){if(!Gr(p))throw p;V(Id,"Failed to update sequence numbers: "+p)}for(let p of l){let m=p.targetId;if(!p.fromCache){let I=f.Fs.get(m),C=I.snapshotVersion,k=I.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(m,k)}}}(r.localStore,s))}async function t0(n,e){let t=j(n);if(!t.currentUser.isEqual(e)){V(Nd,"User change. New user:",e.toKey());let r=await Jy(t.localStore,e);t.currentUser=e,function(s,o){s.Vu.forEach(c=>{c.forEach(u=>{u.reject(new O(R.CANCELLED,o))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Cs(t,r.Bs)}}function n0(n,e){let t=j(n),r=t.Eu.get(e);if(r&&r.lu)return Y().add(r.key);{let i=Y(),s=t.Tu.get(e);if(!s)return i;for(let o of s){let c=t.Pu.get(o);i=i.unionWith(c.view.tu)}return i}}function lv(n){let e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=ov.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=n0.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=JS.bind(null,e),e.hu.J_=WS.bind(null,e.eventManager),e.hu.pu=zS.bind(null,e.eventManager),e}function r0(n){let e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=XS.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ZS.bind(null,e),e}var Br=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ka(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return bS(this.persistence,new Th,e.initialUser,this.serializer)}Du(e){return new Aa(wh.Vi,this.serializer)}bu(e){return new Sh}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};Br.provider={build:()=>new Br};var Hh=class extends Br{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){X(this.persistence.referenceDelegate instanceof Sa,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new ah(r,e.asyncQueue,t)}Du(e){let t=this.cacheSizeBytes!==void 0?rt.withCacheSize(this.cacheSizeBytes):rt.DEFAULT;return new Aa(r=>Sa.Vi(r,t),this.serializer)}};var vs=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>M_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=t0.bind(null,this.syncEngine),await jS(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Bh}()}createDatastore(e){let t=Ka(e.databaseInfo.databaseId),r=function(s){return new kh(s)}(e.databaseInfo);return function(s,o,c,u){return new Vh(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,o,c){return new Mh(r,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>M_(this.syncEngine,t,0),function(){return Ra.C()?new Ra:new Ch}())}createSyncEngine(e,t){return function(i,s,o,c,u,l,f){let p=new Gh(i,s,o,c,u,l);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=j(i);V(tr,"RemoteStore shutting down."),s.Ia.add(5),await Ss(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};vs.provider={build:()=>new vs};var ws=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Bt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var Kh=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new O(R.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await async function(i,s){let o=j(i),c={documents:s.map(p=>Ta(o.serializer,p))},u=await o.Jo("BatchGetDocuments",o.serializer.databaseId,ae.emptyPath(),c,s.length),l=new Map;u.forEach(p=>{let m=lS(o.serializer,p);l.set(m.key.toString(),m)});let f=[];return s.forEach(p=>{let m=l.get(p.toString());X(!!m,55234,{key:p}),f.push(m)}),f}(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new er(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=F.fromPath(r);this.mutations.push(new _a(i,this.precondition(i)))}),await async function(r,i){let s=j(r),o={writes:i.map(c=>Gy(s.serializer,c))};await s.Wo("Commit",s.serializer.databaseId,ae.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw M(50498,{Wu:e.constructor.name});t=q.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new O(R.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(q.min())?be.exists(!1):be.updateTime(t):be.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(q.min()))throw new O(R.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return be.updateTime(t)}return be.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var Qh=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.Gu=r.maxAttempts,this.F_=new _s(this.asyncQueue,"transaction_retry")}zu(){this.Gu-=1,this.ju()}ju(){this.F_.g_(async()=>{let e=new Kh(this.datastore),t=this.Ju(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.Hu(i)}))}).catch(r=>{this.Hu(r)})})}Ju(e){try{let t=this.updateFunction(e);return!As(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}Hu(e){this.Gu>0&&this.Yu(e)?(this.Gu-=1,this.asyncQueue.enqueueAndForget(()=>(this.ju(),Promise.resolve()))):this.deferred.reject(e)}Yu(e){if(e.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!Uy(t)}return!1}};var _n="FirestoreClient",Yh=class{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=Le.UNAUTHENTICATED,this.clientId=cs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{V(_n,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(V(_n,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new st;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Sd(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function El(n,e){n.asyncQueue.verifyOperationInProgress(),V(_n,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Jy(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{$n("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{V("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{$n("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function U_(n,e){n.asyncQueue.verifyOperationInProgress();let t=await i0(n);V(_n,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>x_(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>x_(e.remoteStore,i)),n._onlineComponents=e}async function i0(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){V(_n,"Using user provided OfflineComponentProvider");try{await El(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;$n("Error using user provided cache. Falling back to memory cache: "+t),await El(n,new Br)}}else V(_n,"Using default OfflineComponentProvider"),await El(n,new Hh(void 0));return n._offlineComponents}async function Dd(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(V(_n,"Using user provided OnlineComponentProvider"),await U_(n,n._uninitializedComponentsProvider._online)):(V(_n,"Using default OnlineComponentProvider"),await U_(n,new vs))),n._onlineComponents}function s0(n){return Dd(n).then(e=>e.syncEngine)}function o0(n){return Dd(n).then(e=>e.datastore)}async function Va(n){let e=await Dd(n),t=e.eventManager;return t.onListen=GS.bind(null,e.syncEngine),t.onUnlisten=KS.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=$S.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=QS.bind(null,e.syncEngine),t}function a0(n,e,t={}){let r=new st;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){let f=new ws({next:m=>{f.Ou(),o.enqueueAndForget(()=>Rd(s,p));let I=m.docs.has(c);!I&&m.fromCache?l.reject(new O(R.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&m.fromCache&&u&&u.source==="server"?l.reject(new O(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new ys(Ga(c.path),f,{includeMetadataChanges:!0,ka:!0});return Cd(s,p)}(await Va(n),n.asyncQueue,e,t,r)),r.promise}function c0(n,e,t={}){let r=new st;return n.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,l){let f=new ws({next:m=>{f.Ou(),o.enqueueAndForget(()=>Rd(s,p)),m.fromCache&&u.source==="server"?l.reject(new O(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):l.resolve(m)},error:m=>l.reject(m)}),p=new ys(c,f,{includeMetadataChanges:!0,ka:!0});return Cd(s,p)}(await Va(n),n.asyncQueue,e,t,r)),r.promise}function hv(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var B_=new Map;var u0="firestore.googleapis.com",q_=!0,La=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=u0,this.ssl=q_}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:q_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Qy;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Yy)throw new O(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}IA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=hv((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new O(R.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Is=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new La({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new La(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bl;switch(r.type){case"firstParty":return new Cl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=B_.get(t);r&&(V("ComponentProvider","Removing Datastore"),B_.delete(t),r.terminate())}(this),Promise.resolve()}};var Gt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},Ie=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ln(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(bs(t,n._jsonSchema))return new n(e,r||null,new F(ae.fromString(t.referencePath)))}};Ie._jsonSchemaVersion="firestore/documentReference/1.0",Ie._jsonSchema={type:we("string",Ie._jsonSchemaVersion),referencePath:we("string")};var ln=class n extends Gt{constructor(e,t,r){super(e,t,Ga(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new Ie(this.firestore,null,new F(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function dv(n,e,...t){if(n=ee(n),Q_("collection","path",e),n instanceof Is){let r=ae.fromString(e,...t);return s_(r),new ln(n,null,r)}{if(!(n instanceof Ie||n instanceof ln))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ae.fromString(e,...t));return s_(r),new ln(n.firestore,null,r)}}function Od(n,e,...t){if(n=ee(n),arguments.length===1&&(e=cs.newId()),Q_("doc","path",e),n instanceof Is){let r=ae.fromString(e,...t);return i_(r),new Ie(n,null,new F(r))}{if(!(n instanceof Ie||n instanceof ln))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ae.fromString(e,...t));return i_(r),new Ie(n.firestore,n instanceof ln?n.converter:null,new F(r))}}var j_="AsyncQueue",Ma=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new _s(this,"async_queue_retry"),this.oc=()=>{let r=Il();r&&V(j_,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;let t=Il();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let t=Il();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let t=new st;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Gr(e))throw e;V(j_,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Bt("INTERNAL UNHANDLED ERROR: ",W_(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);let i=Fh.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&M(47125,{hc:W_(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let t=this.ec.indexOf(e);this.ec.splice(t,1)}};function W_(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}function z_(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var tt=class extends Is{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new Ma,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Ma(e),this._firestoreClient=void 0,await e}}};function fv(n,e,t){t||(t=da);let r=xn(n,"firestore");if(r.isInitialized(t)){let i=r.getImmediate({identifier:t}),s=r.getOptions(t);if(nt(s,e))return i;throw new O(R.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new O(R.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Yy)throw new O(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&ut(e.host)&&yr(e.host),r.initialize({options:e,instanceIdentifier:t})}function Hr(n){if(n._terminated)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||l0(n),n._firestoreClient}function l0(n){var e,t,r;let i=n._freezeSettings(),s=function(c,u,l,f){return new Dl(c,u,l,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,hv(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Yh(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){let u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}var Ut=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Me.fromBase64String(e))}catch(t){throw new O(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Me.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(bs(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};Ut._jsonSchemaVersion="firestore/bytes/1.0",Ut._jsonSchema={type:we("string",Ut._jsonSchemaVersion),bytes:we("string")};var yn=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Xe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var nr=class{constructor(e){this._methodName=e}};var hn=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(bs(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};hn._jsonSchemaVersion="firestore/geoPoint/1.0",hn._jsonSchema={type:we("string",hn._jsonSchemaVersion),latitude:we("number"),longitude:we("number")};var dn=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(bs(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new O(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};dn._jsonSchemaVersion="firestore/vectorValue/1.0",dn._jsonSchema={type:we("string",dn._jsonSchemaVersion),vectorValues:we("object")};var h0=/^__.*__$/,Jh=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Zn(e,this.data,t,this.fieldTransforms)}},Fa=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function pv(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:n})}}var Xh=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Ba(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(pv(this.Ec)&&h0.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},Zh=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ka(e)}Dc(e,t,r,i=!1){return new Xh({Ec:e,methodName:t,bc:r,path:Xe.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Kr(n){let e=n._freezeSettings(),t=Ka(n._databaseId);return new Zh(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Ja(n,e,t,r,i,s={}){let o=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);Ld("Data must be an object, but it was:",o,r);let c=mv(r,o),u,l;if(s.merge)u=new it(o.fieldMask),l=o.fieldTransforms;else if(s.mergeFields){let f=[];for(let p of s.mergeFields){let m=nd(e,p,t);if(!o.contains(m))throw new O(R.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);_v(f,m)||f.push(m)}u=new it(f),l=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,l=o.fieldTransforms;return new Jh(new Ke(c),u,l)}var Ua=class n extends nr{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};var ed=class n extends nr{_toFieldTransform(e){return new ga(e.path,new Qn)}isEqual(e){return e instanceof n}};var td=class n extends nr{constructor(e,t){super(e),this.Cc=t}_toFieldTransform(e){let t=new Xn(e.serializer,Dy(e.serializer,this.Cc));return new ga(e.path,t)}isEqual(e){return e instanceof n&&this.Cc===e.Cc}};function xd(n,e,t,r){let i=n.Dc(1,e,t);Ld("Data must be an object, but it was:",i,r);let s=[],o=Ke.empty();vn(r,(u,l)=>{let f=Md(e,u,t);l=ee(l);let p=i.gc(f);if(l instanceof Ua)s.push(f);else{let m=Rs(l,p);m!=null&&(s.push(f),o.set(f,m))}});let c=new it(s);return new Fa(o,c,i.fieldTransforms)}function Vd(n,e,t,r,i,s){let o=n.Dc(1,e,t),c=[nd(e,r,t)],u=[i];if(s.length%2!=0)throw new O(R.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)c.push(nd(e,s[m])),u.push(s[m+1]);let l=[],f=Ke.empty();for(let m=c.length-1;m>=0;--m)if(!_v(l,c[m])){let I=c[m],C=u[m];C=ee(C);let k=o.gc(I);if(C instanceof Ua)l.push(I);else{let P=Rs(C,k);P!=null&&(l.push(I),f.set(I,P))}}let p=new it(l);return new Fa(f,p,o.fieldTransforms)}function d0(n,e,t,r=!1){return Rs(t,n.Dc(r?4:3,e))}function Rs(n,e){if(gv(n=ee(n)))return Ld("Unsupported field value:",e,n),mv(n,e);if(n instanceof nr)return function(r,i){if(!pv(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){let s=[],o=0;for(let c of r){let u=Rs(c,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Dy(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=fe.fromDate(r);return{timestampValue:Ea(i.serializer,s)}}if(r instanceof fe){let s=new fe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ea(i.serializer,s)}}if(r instanceof hn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Ut)return{bytesValue:qy(i.serializer,r._byteString)};if(r instanceof Ie){let s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:wd(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof dn)return function(o,c){return{mapValue:{fields:{[pd]:{stringValue:md},[Or]:{arrayValue:{values:o.toArray().map(l=>{if(typeof l!="number")throw c.wc("VectorValues must only contain numeric values.");return vd(c.serializer,l)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${Wa(r)}`)}(n,e)}function mv(n,e){let t={};return hy(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vn(n,(r,i)=>{let s=Rs(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function gv(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof fe||n instanceof hn||n instanceof Ut||n instanceof Ie||n instanceof nr||n instanceof dn)}function Ld(n,e,t){if(!gv(t)||!Y_(t)){let r=Wa(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function nd(n,e,t){if((e=ee(e))instanceof yn)return e._internalPath;if(typeof e=="string")return Md(n,e);throw Ba("Field path arguments must be of type string or ",n,!1,void 0,t)}var f0=new RegExp("[~\\*/\\[\\]]");function Md(n,e,t){if(e.search(f0)>=0)throw Ba(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new yn(...e.split("."))._internalPath}catch{throw Ba(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ba(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new O(R.INVALID_ARGUMENT,c+n+u)}function _v(n,e){return n.some(t=>t.isEqual(e))}var qr=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ie(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new rd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Xa("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},rd=class extends qr{data(){return super.data()}};function Xa(n,e){return typeof e=="string"?Md(n,e):e instanceof yn?e._internalPath:e._delegate._internalPath}function yv(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var Es=class{},Ts=class extends Es{};function vv(n,e,...t){let r=[];e instanceof Es&&r.push(e),r=r.concat(t),function(s){let o=s.filter(u=>u instanceof id).length,c=s.filter(u=>u instanceof qa).length;if(o>1||o>0&&c>0)throw new O(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var qa=class n extends Ts{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Tv(e._query,t),new Gt(e.firestore,e.converter,Gl(e._query,t))}_parse(e){let t=Kr(e.firestore);return function(s,o,c,u,l,f,p){let m;if(l.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new O(R.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){$_(p,f);let C=[];for(let k of p)C.push(G_(u,s,k));m={arrayValue:{values:C}}}else m=G_(u,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||$_(p,f),m=d0(c,o,p,f==="in"||f==="not-in");return ve.create(l,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function wv(n,e,t){let r=e,i=Xa("where",n);return qa._create(i,r,t)}var id=class n extends Es{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:ft.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,c=s.getFlattenedFilters();for(let u of c)Tv(o,u),o=Gl(o,u)}(e._query,t),new Gt(e.firestore,e.converter,Gl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var sd=class n extends Ts{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,o){if(i.startAt!==null)throw new O(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new O(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Kn(s,o)}(e._query,this._field,this._direction);return new Gt(e.firestore,e.converter,function(i,s){let o=i.explicitOrderBy.concat([s]);return new mn(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function Iv(n,e="asc"){let t=e,r=Xa("orderBy",n);return sd._create(r,t)}var od=class n extends Ts{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new Gt(e.firestore,e.converter,ma(e._query,this._limit,this._limitType))}};function Ev(n){return EA("limit",n),od._create("limit",n,"F")}function G_(n,e,t){if(typeof(t=ee(t))=="string"){if(t==="")throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ay(e)&&t.indexOf("/")!==-1)throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(ae.fromString(t));if(!F.isDocumentKey(r))throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return d_(n,new F(r))}if(t instanceof Ie)return d_(n,t._key);throw new O(R.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wa(t)}.`)}function $_(n,e){if(!Array.isArray(n)||n.length===0)throw new O(R.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Tv(n,e){let t=function(i,s){for(let o of i)for(let c of o.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new O(R.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new O(R.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var ja=class{convertValue(e,t="none"){switch(pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ue(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(jt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return vn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;let s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Or].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(o=>ue(o.doubleValue));return new dn(s)}convertGeoPoint(e){return new hn(ue(e.latitude),ue(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=za(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(hs(e));default:return null}}convertTimestamp(e){let t=qt(e);return new fe(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=ae.fromString(e);X(Ky(r),9688,{name:e});let i=new fa(r.get(1),r.get(3)),s=new F(r.popFirst(5));return i.isEqual(t)||Bt(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Za(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var ad=class extends ja{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ie(this.firestore,null,t)}};var cn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},fn=class n extends qr{constructor(e,t,r,i,s,o){super(e,t,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Nr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Xa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};fn._jsonSchemaVersion="firestore/documentSnapshot/1.0",fn._jsonSchema={type:we("string",fn._jsonSchemaVersion),bundleSource:we("string","DocumentSnapshot"),bundleName:we("string"),bundle:we("string")};var Nr=class extends fn{data(e={}){return super.data(e)}},zn=class n{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new cn(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Nr(this._firestore,this._userDataWriter,r.key,r,new cn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{let u=new Nr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new cn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let u=new Nr(i._firestore,i._userDataWriter,c.doc.key,c.doc,new cn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),l=-1,f=-1;return c.type!==0&&(l=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:p0(c.type),doc:u,oldIndex:l,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=cs.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function p0(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:n})}}function bv(n){n=qe(n,Ie);let e=qe(n.firestore,tt);return a0(Hr(e),n._key).then(t=>kv(e,n,t))}zn._jsonSchemaVersion="firestore/querySnapshot/1.0",zn._jsonSchema={type:we("string",zn._jsonSchemaVersion),bundleSource:we("string","QuerySnapshot"),bundleName:we("string"),bundle:we("string")};var jr=class extends ja{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ut(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ie(this.firestore,null,t)}};function Av(n){n=qe(n,Gt);let e=qe(n.firestore,tt),t=Hr(e),r=new jr(e);return yv(n._query),c0(t,n._query).then(i=>new zn(e,r,n,i))}function Sv(n,e,t){n=qe(n,Ie);let r=qe(n.firestore,tt),i=Za(n.converter,e,t);return Ps(r,[Ja(Kr(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,be.none())])}function Cv(n,e,t,...r){n=qe(n,Ie);let i=qe(n.firestore,tt),s=Kr(i),o;return o=typeof(e=ee(e))=="string"||e instanceof yn?Vd(s,"updateDoc",n._key,e,t,r):xd(s,"updateDoc",n._key,e),Ps(i,[o.toMutation(n._key,be.exists(!0))])}function Rv(n){return Ps(qe(n.firestore,tt),[new er(n._key,be.none())])}function Pv(n,e){let t=qe(n.firestore,tt),r=Od(n),i=Za(n.converter,e);return Ps(t,[Ja(Kr(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,be.exists(!1))]).then(()=>r)}function Nv(n,...e){var t,r,i;n=ee(n);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||z_(e[o])||(s=e[o++]);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(z_(e[o])){let p=e[o];e[o]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let u,l,f;if(n instanceof Ie)l=qe(n.firestore,tt),f=Ga(n._key.path),u={next:p=>{e[o]&&e[o](kv(l,n,p))},error:e[o+1],complete:e[o+2]};else{let p=qe(n,Gt);l=qe(p.firestore,tt),f=p._query;let m=new jr(l);u={next:I=>{e[o]&&e[o](new zn(l,m,p,I))},error:e[o+1],complete:e[o+2]},yv(n._query)}return function(m,I,C,k){let P=new ws(k),B=new ys(I,P,C);return m.asyncQueue.enqueueAndForget(async()=>Cd(await Va(m),B)),()=>{P.Ou(),m.asyncQueue.enqueueAndForget(async()=>Rd(await Va(m),B))}}(Hr(l),f,c,u)}function Ps(n,e){return function(r,i){let s=new st;return r.asyncQueue.enqueueAndForget(async()=>YS(await s0(r),i,s)),s.promise}(Hr(n),e)}function kv(n,e,t){let r=t.docs.get(e._key),i=new jr(n);return new fn(n,i,e._key,r,new cn(t.hasPendingWrites,t.fromCache),e.converter)}var m0={maxAttempts:5};var cd=class{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=Kr(e)}set(e,t,r){this._verifyNotCommitted();let i=un(e,this._firestore),s=Za(i.converter,t,r),o=Ja(this._dataReader,"WriteBatch.set",i._key,s,i.converter!==null,r);return this._mutations.push(o.toMutation(i._key,be.none())),this}update(e,t,r,...i){this._verifyNotCommitted();let s=un(e,this._firestore),o;return o=typeof(t=ee(t))=="string"||t instanceof yn?Vd(this._dataReader,"WriteBatch.update",s._key,t,r,i):xd(this._dataReader,"WriteBatch.update",s._key,t),this._mutations.push(o.toMutation(s._key,be.exists(!0))),this}delete(e){this._verifyNotCommitted();let t=un(e,this._firestore);return this._mutations=this._mutations.concat(new er(t._key,be.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new O(R.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}};function un(n,e){if((n=ee(n)).firestore!==e)throw new O(R.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var ud=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Kr(e)}get(e){let t=un(e,this._firestore),r=new ad(this._firestore);return this._transaction.lookup([t._key]).then(i=>{if(!i||i.length!==1)return M(24041);let s=i[0];if(s.isFoundDocument())return new qr(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new qr(this._firestore,r,t._key,null,t.converter);throw M(18433,{doc:s})})}set(e,t,r){let i=un(e,this._firestore),s=Za(i.converter,t,r),o=Ja(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,t,r,...i){let s=un(e,this._firestore),o;return o=typeof(t=ee(t))=="string"||t instanceof yn?Vd(this._dataReader,"Transaction.update",s._key,t,r,i):xd(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,o),this}delete(e){let t=un(e,this._firestore);return this._transaction.delete(t._key),this}};var ld=class extends ud{constructor(e,t){super(e,t),this._firestore=e}get(e){let t=un(e,this._firestore),r=new jr(this._firestore);return super.get(e).then(i=>new fn(this._firestore,r,t._key,i._document,new cn(!1,!1),t.converter))}};function Dv(n,e,t){n=qe(n,tt);let r=Object.assign(Object.assign({},m0),t);return function(s){if(s.maxAttempts<1)throw new O(R.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(s,o,c){let u=new st;return s.asyncQueue.enqueueAndForget(async()=>{let l=await o0(s);new Qh(s.asyncQueue,l,c,o,u).zu()}),u.promise}(Hr(n),i=>e(new ld(n,i)),r)}function Ov(){return new ed("serverTimestamp")}function xv(n){return new td("increment",n)}function Vv(n){return Hr(n=qe(n,tt)),new cd(n,e=>Ps(n,e))}(function(e,t=!0){(function(i){Wr=i})(It),wt(new $e("firestore",(r,{instanceIdentifier:i,options:s})=>{let o=r.getProvider("app").getImmediate(),c=new tt(new Al(r.getProvider("auth-internal")),new Rl(o,r.getProvider("app-check-internal")),function(l,f){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new O(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new fa(l.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),He(e_,t_,e),He(e_,t_,"esm2017")})();var Lv="@firebase/database",Mv="1.0.20";var Hf="";function g0(n){Hf=n}var Gd=class{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Ee(t))}get(e){let t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:_r(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}};var $d=class{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return lt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}};var gw=function(n){try{if(typeof window!="undefined"&&typeof window[n]!="undefined"){let e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Gd(e)}}catch{}return new $d},sr=gw("localStorage"),Hd=gw("sessionStorage");var Xr=new yt("@firebase/database"),_0=function(){let n=1;return function(){return n++}}(),_w=function(n){let e=Vm(n),t=new fo;t.update(e);let r=t.digest();return po.encodeByteArray(r)},Gs=function(...n){let e="";for(let t=0;t<n.length;t++){let r=n[t];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=Gs.apply(null,r):typeof r=="object"?e+=Ee(r):e+=r,e+=" "}return e},or=null,Fv=!0,y0=function(n,e){D(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(Xr.logLevel=G.VERBOSE,or=Xr.log.bind(Xr),e&&Hd.set("logging_enabled",!0)):typeof n=="function"?or=n:(or=null,Hd.remove("logging_enabled"))},Se=function(...n){if(Fv===!0&&(Fv=!1,or===null&&Hd.get("logging_enabled")===!0&&y0(!0)),or){let e=Gs.apply(null,n);or(e)}},$s=function(n){return function(...e){Se(n,...e)}},Kd=function(...n){let e="FIREBASE INTERNAL ERROR: "+Gs(...n);Xr.error(e)},Ht=function(...n){let e=`FIREBASE FATAL ERROR: ${Gs(...n)}`;throw Xr.error(e),new Error(e)},We=function(...n){let e="FIREBASE WARNING: "+Gs(...n);Xr.warn(e)},v0=function(){typeof window!="undefined"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&We("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},bc=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},w0=function(n){if(_t()||document.readyState==="complete")n();else{let e=!1,t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ti="[MIN_NAME]",ar="[MAX_NAME]",lr=function(n,e){if(n===e)return 0;if(n===ti||e===ar)return-1;if(e===ti||n===ar)return 1;{let t=Uv(n),r=Uv(e);return t!==null?r!==null?t-r===0?n.length-e.length:t-r:-1:r!==null?1:n<e?-1:1}},I0=function(n,e){return n===e?0:n<e?-1:1},Ns=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Ee(e))},Kf=function(n){if(typeof n!="object"||n===null)return Ee(n);let e=[];for(let r in n)e.push(r);e.sort();let t="{";for(let r=0;r<e.length;r++)r!==0&&(t+=","),t+=Ee(e[r]),t+=":",t+=Kf(n[e[r]]);return t+="}",t},yw=function(n,e){let t=n.length;if(t<=e)return[n];let r=[];for(let i=0;i<t;i+=e)i+e>t?r.push(n.substring(i,t)):r.push(n.substring(i,i+e));return r};function Ce(n,e){for(let t in n)n.hasOwnProperty(t)&&e(t,n[t])}var vw=function(n){D(!bc(n),"Invalid JSON number");let e=11,t=52,r=(1<<e-1)-1,i,s,o,c,u;n===0?(s=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-r)?(c=Math.min(Math.floor(Math.log(n)/Math.LN2),r),s=c+r,o=Math.round(n*Math.pow(2,t-c)-Math.pow(2,t))):(s=0,o=Math.round(n/Math.pow(2,1-r-t))));let l=[];for(u=t;u;u-=1)l.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)l.push(s%2?1:0),s=Math.floor(s/2);l.push(i?1:0),l.reverse();let f=l.join(""),p="";for(u=0;u<64;u+=8){let m=parseInt(f.substr(u,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},E0=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},T0=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function b0(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");let r=new Error(n+" at "+e._path.toString()+": "+t);return r.code=n.toUpperCase(),r}var A0=new RegExp("^-?(0*)\\d{1,10}$"),S0=-2147483648,C0=2147483647,Uv=function(n){if(A0.test(n)){let e=Number(n);if(e>=S0&&e<=C0)return e}return null},ci=function(n){try{n()}catch(e){setTimeout(()=>{let t=e.stack||"";throw We("Exception was thrown by user callback.",t),e},Math.floor(0))}},R0=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},xs=function(n,e){let t=setTimeout(n,e);return typeof t=="number"&&typeof Deno!="undefined"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};var Qd=class{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Pe(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(r=>this.appCheck=r)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){We(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}};var Yd=class{constructor(e,t,r){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Se("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,r):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',We(e)}},In=class{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}};In.OWNER="owner";var tc="5",ww="v",Iw="s",Ew="r",Tw="f",bw=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Aw="ls",Sw="p",Jd="ac",Cw="websocket",Rw="long_polling";var nc=class{constructor(e,t,r,i,s=!1,o="",c=!1,u=!1,l=null){this.secure=t,this.namespace=r,this.webSocketOnly=i,this.nodeAdmin=s,this.persistenceKey=o,this.includeNamespaceInQueryParams=c,this.isUsingEmulator=u,this.emulatorOptions=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=sr.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&sr.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){let e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}};function P0(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Pw(n,e,t){D(typeof e=="string","typeof type must == string"),D(typeof t=="object","typeof params must == object");let r;if(e===Cw)r=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Rw)r=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);P0(n)&&(t.ns=n.namespace);let i=[];return Ce(t,(s,o)=>{i.push(s+"="+o)}),r+i.join("&")}var Xd=class{constructor(){this.counters_={}}incrementCounter(e,t=1){lt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Tm(this.counters_)}};var Fd={},Ud={};function Qf(n){let e=n.toString();return Fd[e]||(Fd[e]=new Xd),Fd[e]}function N0(n,e){let t=n.toString();return Ud[t]||(Ud[t]=e()),Ud[t]}var Zd=class{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){let r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<r.length;++i)r[i]&&ci(()=>{this.onMessage_(r[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}};var Bv="start",k0="close",D0="pLPCommand",O0="pRTLPCB",Nw="id",kw="pw",Dw="ser",x0="cb",V0="seg",L0="ts",M0="d",F0="dframe",Ow=1870,xw=30,U0=Ow-xw,B0=25e3,q0=3e4,ef=class n{constructor(e,t,r,i,s,o,c){this.connId=e,this.repoInfo=t,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.transportSessionId=o,this.lastSessionId=c,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=$s(e),this.stats_=Qf(t),this.urlFn=u=>(this.appCheckToken&&(u[Jd]=this.appCheckToken),Pw(t,Rw,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Zd(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(q0)),w0(()=>{if(this.isClosed_)return;this.scriptTagHolder=new tf((...s)=>{let[o,c,u,l,f]=s;if(this.incrementIncomingBytes_(s),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Bv)this.id=c,this.password=u;else if(o===k0)c?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(c,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...s)=>{let[o,c]=s;this.incrementIncomingBytes_(s),this.myPacketOrderer.handleResponse(o,c)},()=>{this.onClosed_()},this.urlFn);let r={};r[Bv]="t",r[Dw]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[x0]=this.scriptTagHolder.uniqueCallbackIdentifier),r[ww]=tc,this.transportSessionId&&(r[Iw]=this.transportSessionId),this.lastSessionId&&(r[Aw]=this.lastSessionId),this.applicationId&&(r[Sw]=this.applicationId),this.appCheckToken&&(r[Jd]=this.appCheckToken),typeof location!="undefined"&&location.hostname&&bw.test(location.hostname)&&(r[Ew]=Tw);let i=this.urlFn(r);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){n.forceAllow_=!0}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){return _t()?!1:n.forceAllow_?!0:!n.forceDisallow_&&typeof document!="undefined"&&document.createElement!=null&&!E0()&&!T0()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){let t=Ee(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let r=lu(t),i=yw(r,U0);for(let s=0;s<i.length;s++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[s]),this.curSegmentNum++}addDisconnectPingFrame(e,t){if(_t())return;this.myDisconnFrame=document.createElement("iframe");let r={};r[F0]="t",r[Nw]=e,r[kw]=t,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){let t=Ee(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}},tf=class n{constructor(e,t,r,i){if(this.onDisconnect=r,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0,_t())this.commandCB=e,this.onMessageCB=t;else{this.uniqueCallbackIdentifier=_0(),window[D0+this.uniqueCallbackIdentifier]=e,window[O0+this.uniqueCallbackIdentifier]=t,this.myIFrame=n.createIFrame_();let s="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(s='<script>document.domain="'+document.domain+'";<\/script>');let o="<html><body>"+s+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(c){Se("frame writing exception"),c.stack&&Se(c.stack),Se(c)}}}static createIFrame_(){let e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Se("No IE domain setting required")}catch{let r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));let e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;let e={};e[Nw]=this.myID,e[kw]=this.myPW,e[Dw]=this.currentSerial;let t=this.urlFn(e),r="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+xw+r.length<=Ow;){let o=this.pendingSegs.shift();r=r+"&"+V0+i+"="+o.seg+"&"+L0+i+"="+o.ts+"&"+M0+i+"="+o.d,i++}return t=t+r,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,r){this.pendingSegs.push({seg:e,ts:t,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);let r=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(r,Math.floor(B0)),s=()=>{clearTimeout(i),r()};this.addTag(e,s)}addTag(e,t){_t()?this.doNodeLongPoll(e,t):setTimeout(()=>{try{if(!this.sendNewPolls)return;let r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){let i=r.readyState;(!i||i==="loaded"||i==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),t())},r.onerror=()=>{Se("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}};var j0=16384,W0=45e3,rc=null;typeof MozWebSocket!="undefined"?rc=MozWebSocket:typeof WebSocket!="undefined"&&(rc=WebSocket);var $t=class n{constructor(e,t,r,i,s,o,c){this.connId=e,this.applicationId=r,this.appCheckToken=i,this.authToken=s,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=$s(this.connId),this.stats_=Qf(t),this.connURL=n.connectionURL_(t,o,c,i,r),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,r,i,s){let o={};return o[ww]=tc,!_t()&&typeof location!="undefined"&&location.hostname&&bw.test(location.hostname)&&(o[Ew]=Tw),t&&(o[Iw]=t),r&&(o[Aw]=r),i&&(o[Jd]=i),s&&(o[Sw]=s),Pw(e,Cw,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,sr.set("previous_websocket_failure",!0);try{let r;if(_t()){let i=this.nodeAdmin?"AdminNode":"Node";r={headers:{"User-Agent":`Firebase/${tc}/${Hf}/${process.platform}/${i}`,"X-Firebase-GMPID":this.applicationId||""}},this.authToken&&(r.headers.Authorization=`Bearer ${this.authToken}`),this.appCheckToken&&(r.headers["X-Firebase-AppCheck"]=this.appCheckToken);let s=process.env,o=this.connURL.indexOf("wss://")===0?s.HTTPS_PROXY||s.https_proxy:s.HTTP_PROXY||s.http_proxy;o&&(r.proxy={origin:o})}this.mySock=new rc(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");let i=r.message||r.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");let i=r.message||r.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){n.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator!="undefined"&&navigator.userAgent){let t=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(t);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&rc!==null&&!n.forceDisallow_}static previouslyFailed(){return sr.isInMemoryStorage||sr.get("previous_websocket_failure")===!0}markConnectionHealthy(){sr.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){let t=this.frames.join("");this.frames=null;let r=_r(t);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){let t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;let t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{let r=this.extractFrameCount_(t);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();let t=Ee(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);let r=yw(t,j0);r.length>1&&this.sendString_(String(r.length));for(let i=0;i<r.length;i++)this.sendString_(r[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(W0))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}};$t.responsesRequiredToBeHealthy=2;$t.healthyTimeout=3e4;var ic=class n{static get ALL_TRANSPORTS(){return[ef,$t]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){let t=$t&&$t.isAvailable(),r=t&&!$t.previouslyFailed();if(e.webSocketOnly&&(t||We("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[$t];else{let i=this.transports_=[];for(let s of n.ALL_TRANSPORTS)s&&s.isAvailable()&&i.push(s);n.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}};ic.globalTransportInitialized_=!1;var z0=6e4,G0=5e3,$0=10*1024,H0=100*1024,Bd="t",qv="d",K0="s",jv="r",Q0="e",Wv="o",zv="a",Gv="n",$v="p",Y0="h",nf=class{constructor(e,t,r,i,s,o,c,u,l,f){this.id=e,this.repoInfo_=t,this.applicationId_=r,this.appCheckToken_=i,this.authToken_=s,this.onMessage_=o,this.onReady_=c,this.onDisconnect_=u,this.onKill_=l,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=$s("c:"+this.id+":"),this.transportManager_=new ic(t),this.log_("Connection created"),this.start_()}start_(){let e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,r)},Math.floor(0));let i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=xs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>H0?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>$0?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){let t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Bd in e){let t=e[Bd];t===zv?this.upgradeIfSecondaryHealthy_():t===jv?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Wv&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){let t=Ns("t",e),r=Ns("d",e);if(t==="c")this.onSecondaryControl_(r);else if(t==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:$v,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:zv,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Gv,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){let t=Ns("t",e),r=Ns("d",e);t==="c"?this.onControl_(r):t==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){let t=Ns(Bd,e);if(qv in e){let r=e[qv];if(t===Y0){let i=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Gv){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===K0?this.onConnectionShutdown_(r):t===jv?this.onReset_(r):t===Q0?Kd("Server Error: "+r):t===Wv?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Kd("Unknown control packet command: "+t)}}onHandshake_(e){let t=e.ts,r=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),tc!==r&&We("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){let e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;let t=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,r),xs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(z0))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):xs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(G0))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:$v,d:{}}}))}onSecondaryConnectionLost_(){let e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(sr.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}};var sc=class{put(e,t,r,i){}merge(e,t,r,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,r){}onDisconnectMerge(e,t,r){}onDisconnectCancel(e,t){}reportStats(e){}};var oc=class{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){let r=[...this.listeners_[e]];for(let i=0;i<r.length;i++)r[i].callback.apply(r[i].context,t)}}on(e,t,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:r});let i=this.getInitialEvent(e);i&&t.apply(r,i)}off(e,t,r){this.validateEventType_(e);let i=this.listeners_[e]||[];for(let s=0;s<i.length;s++)if(i[s].callback===t&&(!r||r===i[s].context)){i.splice(s,1);return}}validateEventType_(e){D(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}};var ac=class n extends oc{static getInstance(){return new n}constructor(){super(["online"]),this.online_=!0,typeof window!="undefined"&&typeof window.addEventListener!="undefined"&&!xi()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}};var Hv=32,Kv=768,ne=class{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let r=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[r]=this.pieces_[i],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}};function te(){return new ne("")}function H(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function Tn(n){return n.pieces_.length-n.pieceNum_}function oe(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new ne(n.pieces_,e)}function Yf(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function J0(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Fs(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Vw(n){if(n.pieceNum_>=n.pieces_.length)return null;let e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new ne(e,0)}function le(n,e){let t=[];for(let r=n.pieceNum_;r<n.pieces_.length;r++)t.push(n.pieces_[r]);if(e instanceof ne)for(let r=e.pieceNum_;r<e.pieces_.length;r++)t.push(e.pieces_[r]);else{let r=e.split("/");for(let i=0;i<r.length;i++)r[i].length>0&&t.push(r[i])}return new ne(t,0)}function K(n){return n.pieceNum_>=n.pieces_.length}function Qe(n,e){let t=H(n),r=H(e);if(t===null)return e;if(t===r)return Qe(oe(n),oe(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function X0(n,e){let t=Fs(n,0),r=Fs(e,0);for(let i=0;i<t.length&&i<r.length;i++){let s=lr(t[i],r[i]);if(s!==0)return s}return t.length===r.length?0:t.length<r.length?-1:1}function Jf(n,e){if(Tn(n)!==Tn(e))return!1;for(let t=n.pieceNum_,r=e.pieceNum_;t<=n.pieces_.length;t++,r++)if(n.pieces_[t]!==e.pieces_[r])return!1;return!0}function ot(n,e){let t=n.pieceNum_,r=e.pieceNum_;if(Tn(n)>Tn(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[r])return!1;++t,++r}return!0}var rf=class{constructor(e,t){this.errorPrefix_=t,this.parts_=Fs(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=Li(this.parts_[r]);Lw(this)}};function Z0(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Li(e),Lw(n)}function eC(n){let e=n.parts_.pop();n.byteLength_-=Li(e),n.parts_.length>0&&(n.byteLength_-=1)}function Lw(n){if(n.byteLength_>Kv)throw new Error(n.errorPrefix_+"has a key path longer than "+Kv+" bytes ("+n.byteLength_+").");if(n.parts_.length>Hv)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Hv+") or object contains a cycle "+ir(n))}function ir(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}var sf=class n extends oc{static getInstance(){return new n}constructor(){super(["visible"]);let e,t;typeof document!="undefined"&&typeof document.addEventListener!="undefined"&&(typeof document.hidden!="undefined"?(t="visibilitychange",e="hidden"):typeof document.mozHidden!="undefined"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden!="undefined"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden!="undefined"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{let r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}};var ks=1e3,tC=60*5*1e3,Qv=30*1e3,nC=1.3,rC=3e4,iC="server_kill",Yv=3,cr=class n extends sc{constructor(e,t,r,i,s,o,c,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=r,this.onConnectStatus_=i,this.onServerInfoUpdate_=s,this.authTokenProvider_=o,this.appCheckTokenProvider_=c,this.authOverride_=u,this.id=n.nextPersistentConnectionId_++,this.log_=$s("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ks,this.maxReconnectDelay_=tC,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u&&!_t())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");sf.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ac.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,r){let i=++this.requestNumber_,s={r:i,a:e,b:t};this.log_(Ee(s)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(s),r&&(this.requestCBHash_[i]=r)}get(e){this.initConnection_();let t=new Ge,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{let c=o.d;o.s==="ok"?t.resolve(c):t.reject(c)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;let s=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(s),t.promise}listen(e,t,r,i){this.initConnection_();let s=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+s),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(s),"listen() called twice for same path/queryId.");let c={onComplete:i,hashFn:t,query:e,tag:r};this.listens.get(o).set(s,c),this.connected_&&this.sendListen_(c)}sendGet_(e){let t=this.outstandingGets_[e];this.sendRequest("g",t.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(r)})}sendListen_(e){let t=e.query,r=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+r+" for "+i);let s={p:r},o="q";e.tag&&(s.q=t._queryObject,s.t=e.tag),s.h=e.hashFn(),this.sendRequest(o,s,c=>{let u=c.d,l=c.s;n.warnOnListenWarnings_(u,t),(this.listens.get(r)&&this.listens.get(r).get(i))===e&&(this.log_("listen response",c),l!=="ok"&&this.removeListen_(r,i),e.onComplete&&e.onComplete(l,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&lt(e,"w")){let r=kn(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){let i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',s=t._path.toString();We(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${s} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Om(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Qv)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){let e=this.authToken_,t=Dm(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(t,r,i=>{let s=i.s,o=i.d||"error";this.authToken_===e&&(s==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(s,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{let t=e.s,r=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,r)})}unlisten(e,t){let r=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+i),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,i)&&this.connected_&&this.sendUnlisten_(r,i,e._queryObject,t)}sendUnlisten_(e,t,r,i){this.log_("Unlisten on "+e+" for "+t);let s={p:e},o="n";i&&(s.q=r,s.t=i),this.sendRequest(o,s)}onDisconnectPut(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:r})}onDisconnectMerge(e,t,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:r})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,r,i){let s={p:t,d:r};this.log_("onDisconnect "+e,s),this.sendRequest(e,s,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,r,i){this.putInternal("p",e,t,r,i)}merge(e,t,r,i){this.putInternal("m",e,t,r,i)}putInternal(e,t,r,i,s){this.initConnection_();let o={p:t,d:r};s!==void 0&&(o.h=s),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;let c=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(c):this.log_("Buffering put: "+t)}sendPut_(e){let t=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,r,s=>{this.log_(t+" response",s),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(s.s,s.d)})}reportStats(e){if(this.connected_){let t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,r=>{if(r.s!=="ok"){let s=r.d;this.log_("reportStats","Error sending stats: "+s)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Ee(e));let t=e.r,r=this.requestCBHash_[t];r&&(delete this.requestCBHash_[t],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Kd("Unrecognized action received from server: "+Ee(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>rC&&(this.reconnectDelay_=ks),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());let e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_),t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*nC)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;let e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+n.nextConnectionId_++,s=this.lastSessionId,o=!1,c=null,u=function(){c?c.close():(o=!0,r())},l=function(p){D(c,"sendRequest call when we're not connected not allowed."),c.sendRequest(p)};this.realtime_={close:u,sendRequest:l};let f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{let[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Se("getToken() completed but was canceled"):(Se("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,c=new nf(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,r,I=>{We(I+" ("+this.repoInfo_.toString()+")"),this.interrupt(iC)},s))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&We(p),u())}}}interrupt(e){Se("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Se("Resuming connection for reason: "+e),delete this.interruptReasons_[e],vr(this.interruptReasons_)&&(this.reconnectDelay_=ks,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){let t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){let t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let r;t?r=t.map(s=>Kf(s)).join("$"):r="default";let i=this.removeListen_(e,r);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){let r=new ne(e).toString(),i;if(this.listens.has(r)){let s=this.listens.get(r);i=s.get(t),s.delete(t),s.size===0&&this.listens.delete(r)}else i=void 0;return i}onAuthRevoked_(e,t){Se("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Yv&&(this.reconnectDelay_=Qv,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Se("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Yv&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(let e of this.listens.values())for(let t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){let e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){let e={},t="js";_t()&&(this.repoInfo_.nodeAdmin?t="admin_node":t="node"),e["sdk."+t+"."+Hf.replace(/\./g,"-")]=1,xi()?e["framework.cordova"]=1:go()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){let e=ac.getInstance().currentlyOnline();return vr(this.interruptReasons_)&&e}};cr.nextPersistentConnectionId_=0;cr.nextConnectionId_=0;var Q=class n{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new n(e,t)}};var ni=class{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){let r=new Q(ti,e),i=new Q(ti,t);return this.compare(r,i)!==0}minPost(){return Q.MIN}};var ec,cc=class extends ni{static get __EMPTY_NODE(){return ec}static set __EMPTY_NODE(e){ec=e}compare(e,t){return lr(e.name,t.name)}isDefinedOn(e){throw Nn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return Q.MIN}maxPost(){return new Q(ar,ec)}makePost(e,t){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new Q(e,ec)}toString(){return".key"}},Zr=new cc;var Yr=class{constructor(e,t,r,i,s=null){this.isReverse_=i,this.resultGenerator_=s,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?r(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}},je=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:at.EMPTY_NODE,this.right=s!=null?s:at.EMPTY_NODE}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return s<0?i=i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return at.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let r,i;if(r=this,t(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),t(e,r.key)===0){if(r.right.isEmpty())return at.EMPTY_NODE;i=r.right.min_(),r=r.copy(i.key,i.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){let e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");let e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}};je.RED=!0;je.BLACK=!1;var of=class{copy(e,t,r,i,s){return this}insert(e,t,r){return new je(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}},at=class n{constructor(e,t=n.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new n(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,je.BLACK,null,null))}remove(e){return new n(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,je.BLACK,null,null))}get(e){let t,r=this.root_;for(;!r.isEmpty();){if(t=this.comparator_(e,r.key),t===0)return r.value;t<0?r=r.left:t>0&&(r=r.right)}return null}getPredecessorKey(e){let t,r=this.root_,i=null;for(;!r.isEmpty();)if(t=this.comparator_(e,r.key),t===0){if(r.left.isEmpty())return i?i.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else t<0?r=r.left:t>0&&(i=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Yr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Yr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Yr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Yr(this.root_,null,this.comparator_,!0,e)}};at.EMPTY_NODE=new of;function sC(n,e){return lr(n.name,e.name)}function Xf(n,e){return lr(n,e)}var af;function oC(n){af=n}var Mw=function(n){return typeof n=="number"?"number:"+vw(n):"string:"+n},Fw=function(n){if(n.isLeafNode()){let e=n.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&lt(e,".sv"),"Priority must be a string or number.")}else D(n===af||n.isEmpty(),"priority of unexpected type.");D(n===af||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};var Jv,Kt=class n{static set __childrenNodeConstructor(e){Jv=e}static get __childrenNodeConstructor(){return Jv}constructor(e,t=n.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Fw(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new n(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return K(e)?this:H(e)===".priority"?this.priorityNode_:n.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:n.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){let r=H(e);return r===null?t:t.isEmpty()&&r!==".priority"?this:(D(r!==".priority"||Tn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,n.__childrenNodeConstructor.EMPTY_NODE.updateChild(oe(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Mw(this.priorityNode_.val())+":");let t=typeof this.value_;e+=t+":",t==="number"?e+=vw(this.value_):e+=this.value_,this.lazyHash_=_w(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===n.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof n.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){let t=typeof e.value_,r=typeof this.value_,i=n.VALUE_TYPE_ORDER.indexOf(t),s=n.VALUE_TYPE_ORDER.indexOf(r);return D(i>=0,"Unknown leaf type: "+t),D(s>=0,"Unknown leaf type: "+r),i===s?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:s-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){let t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}};Kt.VALUE_TYPE_ORDER=["object","boolean","number","string"];var Uw,Bw;function aC(n){Uw=n}function cC(n){Bw=n}var cf=class extends ni{compare(e,t){let r=e.node.getPriority(),i=t.node.getPriority(),s=r.compareTo(i);return s===0?lr(e.name,t.name):s}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return Q.MIN}maxPost(){return new Q(ar,new Kt("[PRIORITY-POST]",Bw))}makePost(e,t){let r=Uw(e);return new Q(t,new Kt("[PRIORITY-POST]",r))}toString(){return".priority"}},he=new cf;var uC=Math.log(2),uf=class{constructor(e){let t=s=>parseInt(Math.log(s)/uC,10),r=s=>parseInt(Array(s+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;let i=r(this.count);this.bits_=e+1&i}nextBitIsOne(){let e=!(this.bits_&1<<this.current_);return this.current_--,e}},uc=function(n,e,t,r){n.sort(e);let i=function(u,l){let f=l-u,p,m;if(f===0)return null;if(f===1)return p=n[u],m=t?t(p):p,new je(m,p.node,je.BLACK,null,null);{let I=parseInt(f/2,10)+u,C=i(u,I),k=i(I+1,l);return p=n[I],m=t?t(p):p,new je(m,p.node,je.BLACK,C,k)}},s=function(u){let l=null,f=null,p=n.length,m=function(C,k){let P=p-C,B=p;p-=C;let U=i(P+1,B),W=n[P],re=t?t(W):W;I(new je(re,W.node,k,null,U))},I=function(C){l?(l.left=C,l=C):(f=C,l=C)};for(let C=0;C<u.count;++C){let k=u.nextBitIsOne(),P=Math.pow(2,u.count-(C+1));k?m(P,je.BLACK):(m(P,je.BLACK),m(P,je.RED))}return f},o=new uf(n.length),c=s(o);return new at(r||e,c)};var qd,Qr={},ri=class n{static get Default(){return D(Qr&&he,"ChildrenNode.ts has not been loaded"),qd=qd||new n({".priority":Qr},{".priority":he}),qd}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){let t=kn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof at?t:null}hasIndex(e){return lt(this.indexSet_,e.toString())}addIndex(e,t){D(e!==Zr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");let r=[],i=!1,s=t.getIterator(Q.Wrap),o=s.getNext();for(;o;)i=i||e.isDefinedOn(o.node),r.push(o),o=s.getNext();let c;i?c=uc(r,e.getCompare()):c=Qr;let u=e.toString(),l=Object.assign({},this.indexSet_);l[u]=e;let f=Object.assign({},this.indexes_);return f[u]=c,new n(f,l)}addToIndexes(e,t){let r=Vi(this.indexes_,(i,s)=>{let o=kn(this.indexSet_,s);if(D(o,"Missing index implementation for "+s),i===Qr)if(o.isDefinedOn(e.node)){let c=[],u=t.getIterator(Q.Wrap),l=u.getNext();for(;l;)l.name!==e.name&&c.push(l),l=u.getNext();return c.push(e),uc(c,o.getCompare())}else return Qr;else{let c=t.get(e.name),u=i;return c&&(u=u.remove(new Q(e.name,c))),u.insert(e,e.node)}});return new n(r,this.indexSet_)}removeFromIndexes(e,t){let r=Vi(this.indexes_,i=>{if(i===Qr)return i;{let s=t.get(e.name);return s?i.remove(new Q(e.name,s)):i}});return new n(r,this.indexSet_)}};var Ds,z=class n{static get EMPTY_NODE(){return Ds||(Ds=new n(new at(Xf),null,ri.Default))}constructor(e,t,r){this.children_=e,this.priorityNode_=t,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&Fw(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Ds}updatePriority(e){return this.children_.isEmpty()?this:new n(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{let t=this.children_.get(e);return t===null?Ds:t}}getChild(e){let t=H(e);return t===null?this:this.getImmediateChild(t).getChild(oe(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(D(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{let r=new Q(e,t),i,s;t.isEmpty()?(i=this.children_.remove(e),s=this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(e,t),s=this.indexMap_.addToIndexes(r,this.children_));let o=i.isEmpty()?Ds:this.priorityNode_;return new n(i,o,s)}}updateChild(e,t){let r=H(e);if(r===null)return t;{D(H(e)!==".priority"||Tn(e)===1,".priority must be the last token in a path");let i=this.getImmediateChild(r).updateChild(oe(e),t);return this.updateImmediateChild(r,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;let t={},r=0,i=0,s=!0;if(this.forEachChild(he,(o,c)=>{t[o]=c.val(e),r++,s&&n.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):s=!1}),!e&&s&&i<2*r){let o=[];for(let c in t)o[c]=t[c];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Mw(this.getPriority().val())+":"),this.forEachChild(he,(t,r)=>{let i=r.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":_w(e)}return this.lazyHash_}getPredecessorChildName(e,t,r){let i=this.resolveIndex_(r);if(i){let s=i.getPredecessorKey(new Q(e,t));return s?s.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){let t=this.resolveIndex_(e);if(t){let r=t.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){let t=this.getFirstChildName(e);return t?new Q(t,this.children_.get(t)):null}getLastChildName(e){let t=this.resolveIndex_(e);if(t){let r=t.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){let t=this.getLastChildName(e);return t?new Q(t,this.children_.get(t)):null}forEachChild(e,t){let r=this.resolveIndex_(e);return r?r.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){let r=this.resolveIndex_(t);if(r)return r.getIteratorFrom(e,i=>i);{let i=this.children_.getIteratorFrom(e.name,Q.Wrap),s=i.peek();for(;s!=null&&t.compare(s,e)<0;)i.getNext(),s=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){let r=this.resolveIndex_(t);if(r)return r.getReverseIteratorFrom(e,i=>i);{let i=this.children_.getReverseIteratorFrom(e.name,Q.Wrap),s=i.peek();for(;s!=null&&t.compare(s,e)>0;)i.getNext(),s=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Hs?-1:0}withIndex(e){if(e===Zr||this.indexMap_.hasIndex(e))return this;{let t=this.indexMap_.addIndex(e,this.children_);return new n(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Zr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{let t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){let r=this.getIterator(he),i=t.getIterator(he),s=r.getNext(),o=i.getNext();for(;s&&o;){if(s.name!==o.name||!s.node.equals(o.node))return!1;s=r.getNext(),o=i.getNext()}return s===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Zr?null:this.indexMap_.get(e.toString())}};z.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;var lf=class extends z{constructor(){super(new at(Xf),z.EMPTY_NODE,ri.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return z.EMPTY_NODE}isEmpty(){return!1}},Hs=new lf;Object.defineProperties(Q,{MIN:{value:new Q(ti,z.EMPTY_NODE)},MAX:{value:new Q(ar,Hs)}});cc.__EMPTY_NODE=z.EMPTY_NODE;Kt.__childrenNodeConstructor=z;oC(Hs);cC(Hs);var lC=!0;function me(n,e=null){if(n===null)return z.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){let t=n;return new Kt(t,me(e))}if(!(n instanceof Array)&&lC){let t=[],r=!1;if(Ce(n,(o,c)=>{if(o.substring(0,1)!=="."){let u=me(c);u.isEmpty()||(r=r||!u.getPriority().isEmpty(),t.push(new Q(o,u)))}}),t.length===0)return z.EMPTY_NODE;let s=uc(t,sC,o=>o.name,Xf);if(r){let o=uc(t,he.getCompare());return new z(s,me(e),new ri({".priority":o},{".priority":he}))}else return new z(s,me(e),ri.Default)}else{let t=z.EMPTY_NODE;return Ce(n,(r,i)=>{if(lt(n,r)&&r.substring(0,1)!=="."){let s=me(i);(s.isLeafNode()||!s.isEmpty())&&(t=t.updateImmediateChild(r,s))}}),t.updatePriority(me(e))}}aC(me);var hf=class extends ni{constructor(e){super(),this.indexPath_=e,D(!K(e)&&H(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){let r=this.extractChild(e.node),i=this.extractChild(t.node),s=r.compareTo(i);return s===0?lr(e.name,t.name):s}makePost(e,t){let r=me(e),i=z.EMPTY_NODE.updateChild(this.indexPath_,r);return new Q(t,i)}maxPost(){let e=z.EMPTY_NODE.updateChild(this.indexPath_,Hs);return new Q(ar,e)}toString(){return Fs(this.indexPath_,0).join("/")}};var df=class extends ni{compare(e,t){let r=e.node.compareTo(t.node);return r===0?lr(e.name,t.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return Q.MIN}maxPost(){return Q.MAX}makePost(e,t){let r=me(e);return new Q(t,r)}toString(){return".value"}},hC=new df;function qw(n){return{type:"value",snapshotNode:n}}function ii(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Us(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Bs(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function dC(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}var qs=class{constructor(e){this.index_=e}updateChild(e,t,r,i,s,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");let c=e.getImmediateChild(t);return c.getChild(i).equals(r.getChild(i))&&c.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(t)?o.trackChildChange(Us(t,c)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):c.isEmpty()?o.trackChildChange(ii(t,r)):o.trackChildChange(Bs(t,r,c))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(t,r).withIndex(this.index_)}updateFullNode(e,t,r){return r!=null&&(e.isLeafNode()||e.forEachChild(he,(i,s)=>{t.hasChild(i)||r.trackChildChange(Us(i,s))}),t.isLeafNode()||t.forEachChild(he,(i,s)=>{if(e.hasChild(i)){let o=e.getImmediateChild(i);o.equals(s)||r.trackChildChange(Bs(i,s,o))}else r.trackChildChange(ii(i,s))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?z.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}};var lc=class n{constructor(e){this.indexedFilter_=new qs(e.getIndex()),this.index_=e.getIndex(),this.startPost_=n.getStartPost_(e),this.endPost_=n.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){let t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&r}updateChild(e,t,r,i,s,o){return this.matches(new Q(t,r))||(r=z.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,r,i,s,o)}updateFullNode(e,t,r){t.isLeafNode()&&(t=z.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(z.EMPTY_NODE);let s=this;return t.forEachChild(he,(o,c)=>{s.matches(new Q(o,c))||(i=i.updateImmediateChild(o,z.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){let t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){let t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}};var ff=class{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{let r=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=t=>{let r=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new lc(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,r,i,s,o){return this.rangedFilter_.matches(new Q(t,r))||(r=z.EMPTY_NODE),e.getImmediateChild(t).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,r,i,s,o):this.fullLimitUpdateChild_(e,t,r,s,o)}updateFullNode(e,t,r){let i;if(t.isLeafNode()||t.isEmpty())i=z.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=z.EMPTY_NODE.withIndex(this.index_);let s;this.reverse_?s=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):s=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;s.hasNext()&&o<this.limit_;){let c=s.getNext();if(this.withinDirectionalStart(c))if(this.withinDirectionalEnd(c))i=i.updateImmediateChild(c.name,c.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(z.EMPTY_NODE);let s;this.reverse_?s=i.getReverseIterator(this.index_):s=i.getIterator(this.index_);let o=0;for(;s.hasNext();){let c=s.getNext();o<this.limit_&&this.withinDirectionalStart(c)&&this.withinDirectionalEnd(c)?o++:i=i.updateImmediateChild(c.name,z.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,r)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,r,i,s){let o;if(this.reverse_){let p=this.index_.getCompare();o=(m,I)=>p(I,m)}else o=this.index_.getCompare();let c=e;D(c.numChildren()===this.limit_,"");let u=new Q(t,r),l=this.reverse_?c.getFirstChild(this.index_):c.getLastChild(this.index_),f=this.rangedFilter_.matches(u);if(c.hasChild(t)){let p=c.getImmediateChild(t),m=i.getChildAfterChild(this.index_,l,this.reverse_);for(;m!=null&&(m.name===t||c.hasChild(m.name));)m=i.getChildAfterChild(this.index_,m,this.reverse_);let I=m==null?1:o(m,u);if(f&&!r.isEmpty()&&I>=0)return s!=null&&s.trackChildChange(Bs(t,r,p)),c.updateImmediateChild(t,r);{s!=null&&s.trackChildChange(Us(t,p));let k=c.updateImmediateChild(t,z.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(s!=null&&s.trackChildChange(ii(m.name,m.node)),k.updateImmediateChild(m.name,m.node)):k}}else return r.isEmpty()?e:f&&o(l,u)>=0?(s!=null&&(s.trackChildChange(Us(l.name,l.node)),s.trackChildChange(ii(t,r))),c.updateImmediateChild(t,r).updateImmediateChild(l.name,z.EMPTY_NODE)):e}};var pf=class n{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=he}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ti}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ar}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===he}copy(){let e=new n;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}};function fC(n){return n.loadsAllData()?new qs(n.getIndex()):n.hasLimit()?new ff(n):new lc(n)}function Xv(n){let e={};if(n.isDefault())return e;let t;if(n.index_===he?t="$priority":n.index_===hC?t="$value":n.index_===Zr?t="$key":(D(n.index_ instanceof hf,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Ee(t),n.startSet_){let r=n.startAfterSet_?"startAfter":"startAt";e[r]=Ee(n.indexStartValue_),n.startNameSet_&&(e[r]+=","+Ee(n.indexStartName_))}if(n.endSet_){let r=n.endBeforeSet_?"endBefore":"endAt";e[r]=Ee(n.indexEndValue_),n.endNameSet_&&(e[r]+=","+Ee(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Zv(n){let e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==he&&(e.i=n.index_.toString()),e}var mf=class n extends sc{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,r,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=r,this.appCheckTokenProvider_=i,this.log_=$s("p:rest:"),this.listens_={}}listen(e,t,r,i){let s=e._path.toString();this.log_("Listen called for "+s+" "+e._queryIdentifier);let o=n.getListenId_(e,r),c={};this.listens_[o]=c;let u=Xv(e._queryParams);this.restRequest_(s+".json",u,(l,f)=>{let p=f;if(l===404&&(p=null,l=null),l===null&&this.onDataUpdate_(s,p,!1,r),kn(this.listens_,o)===c){let m;l?l===401?m="permission_denied":m="rest_error:"+l:m="ok",i(m,null)}})}unlisten(e,t){let r=n.getListenId_(e,t);delete this.listens_[r]}get(e){let t=Xv(e._queryParams),r=e._path.toString(),i=new Ge;return this.restRequest_(r+".json",t,(s,o)=>{let c=o;s===404&&(c=null,s=null),s===null?(this.onDataUpdate_(r,c,!1,null),i.resolve(c)):i.reject(new Error(c))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},r){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,s])=>{i&&i.accessToken&&(t.auth=i.accessToken),s&&s.token&&(t.ac=s.token);let o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+tn(t);this.log_("Sending REST request for "+o);let c=new XMLHttpRequest;c.onreadystatechange=()=>{if(r&&c.readyState===4){this.log_("REST Response for "+o+" received. status:",c.status,"response:",c.responseText);let u=null;if(c.status>=200&&c.status<300){try{u=_r(c.responseText)}catch{We("Failed to parse JSON response for "+o+": "+c.responseText)}r(null,u)}else c.status!==401&&c.status!==404&&We("Got unsuccessful REST response for "+o+" Status: "+c.status),r(c.status);r=null}},c.open("GET",o,!0),c.send()})}};var gf=class{constructor(){this.rootNode_=z.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}};function hc(){return{value:null,children:new Map}}function ui(n,e,t){if(K(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{let r=H(e);n.children.has(r)||n.children.set(r,hc());let i=n.children.get(r);e=oe(e),ui(i,e,t)}}function _f(n,e){if(K(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{let t=n.value;return n.value=null,t.forEachChild(he,(r,i)=>{ui(n,new ne(r),i)}),_f(n,e)}}else if(n.children.size>0){let t=H(e);return e=oe(e),n.children.has(t)&&_f(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function yf(n,e,t){n.value!==null?t(e,n.value):pC(n,(r,i)=>{let s=new ne(e.toString()+"/"+r);yf(i,s,t)})}function pC(n,e){n.children.forEach((t,r)=>{e(r,t)})}var vf=class{constructor(e){this.collection_=e,this.last_=null}get(){let e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Ce(this.last_,(r,i)=>{t[r]=t[r]-i}),this.last_=e,t}};var ew=10*1e3,mC=30*1e3,gC=5*60*1e3,wf=class{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new vf(e);let r=ew+(mC-ew)*Math.random();xs(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){let e=this.statsListener_.get(),t={},r=!1;Ce(e,(i,s)=>{s>0&&lt(this.statsToReport_,i)&&(t[i]=s,r=!0)}),r&&this.server_.reportStats(t),xs(this.reportStats_.bind(this),Math.floor(Math.random()*2*gC))}};var pt;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(pt||(pt={}));function Zf(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ep(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function tp(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}var If=class n{constructor(e,t,r){this.path=e,this.affectedTree=t,this.revert=r,this.type=pt.ACK_USER_WRITE,this.source=Zf()}operationForChild(e){if(K(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{let t=this.affectedTree.subtree(new ne(e));return new n(te(),t,this.revert)}}else return D(H(this.path)===e,"operationForChild called for unrelated child."),new n(oe(this.path),this.affectedTree,this.revert)}};var dc=class n{constructor(e,t){this.source=e,this.path=t,this.type=pt.LISTEN_COMPLETE}operationForChild(e){return K(this.path)?new n(this.source,te()):new n(this.source,oe(this.path))}};var si=class n{constructor(e,t,r){this.source=e,this.path=t,this.snap=r,this.type=pt.OVERWRITE}operationForChild(e){return K(this.path)?new n(this.source,te(),this.snap.getImmediateChild(e)):new n(this.source,oe(this.path),this.snap)}};var js=class n{constructor(e,t,r){this.source=e,this.path=t,this.children=r,this.type=pt.MERGE}operationForChild(e){if(K(this.path)){let t=this.children.subtree(new ne(e));return t.isEmpty()?null:t.value?new si(this.source,te(),t.value):new n(this.source,te(),t)}else return D(H(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new n(this.source,oe(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}};var Qt=class{constructor(e,t,r){this.node_=e,this.fullyInitialized_=t,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(K(e))return this.isFullyInitialized()&&!this.filtered_;let t=H(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}};var Ef=class{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}};function _C(n,e,t,r){let i=[],s=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&s.push(dC(o.childName,o.snapshotNode))}),Os(n,i,"child_removed",e,r,t),Os(n,i,"child_added",e,r,t),Os(n,i,"child_moved",s,r,t),Os(n,i,"child_changed",e,r,t),Os(n,i,"value",e,r,t),i}function Os(n,e,t,r,i,s){let o=r.filter(c=>c.type===t);o.sort((c,u)=>vC(n,c,u)),o.forEach(c=>{let u=yC(n,c,s);i.forEach(l=>{l.respondsTo(c.type)&&e.push(l.createEvent(u,n.query_))})})}function yC(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function vC(n,e,t){if(e.childName==null||t.childName==null)throw Nn("Should only compare child_ events.");let r=new Q(e.childName,e.snapshotNode),i=new Q(t.childName,t.snapshotNode);return n.index_.compare(r,i)}function Ac(n,e){return{eventCache:n,serverCache:e}}function Vs(n,e,t,r){return Ac(new Qt(e,t,r),n.serverCache)}function jw(n,e,t,r){return Ac(n.eventCache,new Qt(e,t,r))}function Tf(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function ur(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}var jd,wC=()=>(jd||(jd=new at(I0)),jd),ze=class n{static fromObject(e){let t=new n(null);return Ce(e,(r,i)=>{t=t.set(new ne(r),i)}),t}constructor(e,t=wC()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:te(),value:this.value};if(K(e))return null;{let r=H(e),i=this.children.get(r);if(i!==null){let s=i.findRootMostMatchingPathAndValue(oe(e),t);return s!=null?{path:le(new ne(r),s.path),value:s.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(K(e))return this;{let t=H(e),r=this.children.get(t);return r!==null?r.subtree(oe(e)):new n(null)}}set(e,t){if(K(e))return new n(t,this.children);{let r=H(e),s=(this.children.get(r)||new n(null)).set(oe(e),t),o=this.children.insert(r,s);return new n(this.value,o)}}remove(e){if(K(e))return this.children.isEmpty()?new n(null):new n(null,this.children);{let t=H(e),r=this.children.get(t);if(r){let i=r.remove(oe(e)),s;return i.isEmpty()?s=this.children.remove(t):s=this.children.insert(t,i),this.value===null&&s.isEmpty()?new n(null):new n(this.value,s)}else return this}}get(e){if(K(e))return this.value;{let t=H(e),r=this.children.get(t);return r?r.get(oe(e)):null}}setTree(e,t){if(K(e))return t;{let r=H(e),s=(this.children.get(r)||new n(null)).setTree(oe(e),t),o;return s.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,s),new n(this.value,o)}}fold(e){return this.fold_(te(),e)}fold_(e,t){let r={};return this.children.inorderTraversal((i,s)=>{r[i]=s.fold_(le(e,i),t)}),t(e,this.value,r)}findOnPath(e,t){return this.findOnPath_(e,te(),t)}findOnPath_(e,t,r){let i=this.value?r(t,this.value):!1;if(i)return i;if(K(e))return null;{let s=H(e),o=this.children.get(s);return o?o.findOnPath_(oe(e),le(t,s),r):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,te(),t)}foreachOnPath_(e,t,r){if(K(e))return this;{this.value&&r(t,this.value);let i=H(e),s=this.children.get(i);return s?s.foreachOnPath_(oe(e),le(t,i),r):new n(null)}}foreach(e){this.foreach_(te(),e)}foreach_(e,t){this.children.inorderTraversal((r,i)=>{i.foreach_(le(e,r),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,r)=>{r.value&&e(t,r.value)})}};var mt=class n{constructor(e){this.writeTree_=e}static empty(){return new n(new ze(null))}};function Ls(n,e,t){if(K(e))return new mt(new ze(t));{let r=n.writeTree_.findRootMostValueAndPath(e);if(r!=null){let i=r.path,s=r.value,o=Qe(i,e);return s=s.updateChild(o,t),new mt(n.writeTree_.set(i,s))}else{let i=new ze(t),s=n.writeTree_.setTree(e,i);return new mt(s)}}}function bf(n,e,t){let r=n;return Ce(t,(i,s)=>{r=Ls(r,le(e,i),s)}),r}function tw(n,e){if(K(e))return mt.empty();{let t=n.writeTree_.setTree(e,new ze(null));return new mt(t)}}function Af(n,e){return hr(n,e)!=null}function hr(n,e){let t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Qe(t.path,e)):null}function nw(n){let e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(he,(r,i)=>{e.push(new Q(r,i))}):n.writeTree_.children.inorderTraversal((r,i)=>{i.value!=null&&e.push(new Q(r,i.value))}),e}function En(n,e){if(K(e))return n;{let t=hr(n,e);return t!=null?new mt(new ze(t)):new mt(n.writeTree_.subtree(e))}}function Sf(n){return n.writeTree_.isEmpty()}function oi(n,e){return Ww(te(),n.writeTree_,e)}function Ww(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let r=null;return e.children.inorderTraversal((i,s)=>{i===".priority"?(D(s.value!==null,"Priority writes must always be leaf nodes"),r=s.value):t=Ww(le(n,i),s,t)}),!t.getChild(n).isEmpty()&&r!==null&&(t=t.updateChild(le(n,".priority"),r)),t}}function np(n,e){return Hw(e,n)}function IC(n,e,t,r,i){D(r>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:r,visible:i}),i&&(n.visibleWrites=Ls(n.visibleWrites,e,t)),n.lastWriteId=r}function EC(n,e,t,r){D(r>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:r,visible:!0}),n.visibleWrites=bf(n.visibleWrites,e,t),n.lastWriteId=r}function TC(n,e){for(let t=0;t<n.allWrites.length;t++){let r=n.allWrites[t];if(r.writeId===e)return r}return null}function bC(n,e){let t=n.allWrites.findIndex(c=>c.writeId===e);D(t>=0,"removeWrite called with nonexistent writeId.");let r=n.allWrites[t];n.allWrites.splice(t,1);let i=r.visible,s=!1,o=n.allWrites.length-1;for(;i&&o>=0;){let c=n.allWrites[o];c.visible&&(o>=t&&AC(c,r.path)?i=!1:ot(r.path,c.path)&&(s=!0)),o--}if(i){if(s)return SC(n),!0;if(r.snap)n.visibleWrites=tw(n.visibleWrites,r.path);else{let c=r.children;Ce(c,u=>{n.visibleWrites=tw(n.visibleWrites,le(r.path,u))})}return!0}else return!1}function AC(n,e){if(n.snap)return ot(n.path,e);for(let t in n.children)if(n.children.hasOwnProperty(t)&&ot(le(n.path,t),e))return!0;return!1}function SC(n){n.visibleWrites=zw(n.allWrites,CC,te()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function CC(n){return n.visible}function zw(n,e,t){let r=mt.empty();for(let i=0;i<n.length;++i){let s=n[i];if(e(s)){let o=s.path,c;if(s.snap)ot(t,o)?(c=Qe(t,o),r=Ls(r,c,s.snap)):ot(o,t)&&(c=Qe(o,t),r=Ls(r,te(),s.snap.getChild(c)));else if(s.children){if(ot(t,o))c=Qe(t,o),r=bf(r,c,s.children);else if(ot(o,t))if(c=Qe(o,t),K(c))r=bf(r,te(),s.children);else{let u=kn(s.children,H(c));if(u){let l=u.getChild(oe(c));r=Ls(r,te(),l)}}}else throw Nn("WriteRecord should have .snap or .children")}}return r}function Gw(n,e,t,r,i){if(!r&&!i){let s=hr(n.visibleWrites,e);if(s!=null)return s;{let o=En(n.visibleWrites,e);if(Sf(o))return t;if(t==null&&!Af(o,te()))return null;{let c=t||z.EMPTY_NODE;return oi(o,c)}}}else{let s=En(n.visibleWrites,e);if(!i&&Sf(s))return t;if(!i&&t==null&&!Af(s,te()))return null;{let o=function(l){return(l.visible||i)&&(!r||!~r.indexOf(l.writeId))&&(ot(l.path,e)||ot(e,l.path))},c=zw(n.allWrites,o,e),u=t||z.EMPTY_NODE;return oi(c,u)}}}function RC(n,e,t){let r=z.EMPTY_NODE,i=hr(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(he,(s,o)=>{r=r.updateImmediateChild(s,o)}),r;if(t){let s=En(n.visibleWrites,e);return t.forEachChild(he,(o,c)=>{let u=oi(En(s,new ne(o)),c);r=r.updateImmediateChild(o,u)}),nw(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{let s=En(n.visibleWrites,e);return nw(s).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function PC(n,e,t,r,i){D(r||i,"Either existingEventSnap or existingServerSnap must exist");let s=le(e,t);if(Af(n.visibleWrites,s))return null;{let o=En(n.visibleWrites,s);return Sf(o)?i.getChild(t):oi(o,i.getChild(t))}}function NC(n,e,t,r){let i=le(e,t),s=hr(n.visibleWrites,i);if(s!=null)return s;if(r.isCompleteForChild(t)){let o=En(n.visibleWrites,i);return oi(o,r.getNode().getImmediateChild(t))}else return null}function kC(n,e){return hr(n.visibleWrites,e)}function DC(n,e,t,r,i,s,o){let c,u=En(n.visibleWrites,e),l=hr(u,te());if(l!=null)c=l;else if(t!=null)c=oi(u,t);else return[];if(c=c.withIndex(o),!c.isEmpty()&&!c.isLeafNode()){let f=[],p=o.getCompare(),m=s?c.getReverseIteratorFrom(r,o):c.getIteratorFrom(r,o),I=m.getNext();for(;I&&f.length<i;)p(I,r)!==0&&f.push(I),I=m.getNext();return f}else return[]}function OC(){return{visibleWrites:mt.empty(),allWrites:[],lastWriteId:-1}}function fc(n,e,t,r){return Gw(n.writeTree,n.treePath,e,t,r)}function rp(n,e){return RC(n.writeTree,n.treePath,e)}function rw(n,e,t,r){return PC(n.writeTree,n.treePath,e,t,r)}function pc(n,e){return kC(n.writeTree,le(n.treePath,e))}function xC(n,e,t,r,i,s){return DC(n.writeTree,n.treePath,e,t,r,i,s)}function ip(n,e,t){return NC(n.writeTree,n.treePath,e,t)}function $w(n,e){return Hw(le(n.treePath,e),n.writeTree)}function Hw(n,e){return{treePath:n,writeTree:e}}var Cf=class{constructor(){this.changeMap=new Map}trackChildChange(e){let t=e.type,r=e.childName;D(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),D(r!==".priority","Only non-priority child changes can be tracked.");let i=this.changeMap.get(r);if(i){let s=i.type;if(t==="child_added"&&s==="child_removed")this.changeMap.set(r,Bs(r,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&s==="child_added")this.changeMap.delete(r);else if(t==="child_removed"&&s==="child_changed")this.changeMap.set(r,Us(r,i.oldSnap));else if(t==="child_changed"&&s==="child_added")this.changeMap.set(r,ii(r,e.snapshotNode));else if(t==="child_changed"&&s==="child_changed")this.changeMap.set(r,Bs(r,e.snapshotNode,i.oldSnap));else throw Nn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}};var Rf=class{getCompleteChild(e){return null}getChildAfterChild(e,t,r){return null}},Kw=new Rf,Ws=class{constructor(e,t,r=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=r}getCompleteChild(e){let t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{let r=this.optCompleteServerCache_!=null?new Qt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return ip(this.writes_,e,r)}}getChildAfterChild(e,t,r){let i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:ur(this.viewCache_),s=xC(this.writes_,i,t,1,r,e);return s.length===0?null:s[0]}};function VC(n){return{filter:n}}function LC(n,e){D(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function MC(n,e,t,r,i){let s=new Cf,o,c;if(t.type===pt.OVERWRITE){let l=t;l.source.fromUser?o=Pf(n,e,l.path,l.snap,r,i,s):(D(l.source.fromServer,"Unknown source."),c=l.source.tagged||e.serverCache.isFiltered()&&!K(l.path),o=mc(n,e,l.path,l.snap,r,i,c,s))}else if(t.type===pt.MERGE){let l=t;l.source.fromUser?o=UC(n,e,l.path,l.children,r,i,s):(D(l.source.fromServer,"Unknown source."),c=l.source.tagged||e.serverCache.isFiltered(),o=Nf(n,e,l.path,l.children,r,i,c,s))}else if(t.type===pt.ACK_USER_WRITE){let l=t;l.revert?o=jC(n,e,l.path,r,i,s):o=BC(n,e,l.path,l.affectedTree,r,i,s)}else if(t.type===pt.LISTEN_COMPLETE)o=qC(n,e,t.path,r,s);else throw Nn("Unknown operation type: "+t.type);let u=s.getChanges();return FC(e,o,u),{viewCache:o,changes:u}}function FC(n,e,t){let r=e.eventCache;if(r.isFullyInitialized()){let i=r.getNode().isLeafNode()||r.getNode().isEmpty(),s=Tf(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!r.getNode().equals(s)||!r.getNode().getPriority().equals(s.getPriority()))&&t.push(qw(Tf(e)))}}function Qw(n,e,t,r,i,s){let o=e.eventCache;if(pc(r,t)!=null)return e;{let c,u;if(K(t))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){let l=ur(e),f=l instanceof z?l:z.EMPTY_NODE,p=rp(r,f);c=n.filter.updateFullNode(e.eventCache.getNode(),p,s)}else{let l=fc(r,ur(e));c=n.filter.updateFullNode(e.eventCache.getNode(),l,s)}else{let l=H(t);if(l===".priority"){D(Tn(t)===1,"Can't have a priority with additional path components");let f=o.getNode();u=e.serverCache.getNode();let p=rw(r,t,f,u);p!=null?c=n.filter.updatePriority(f,p):c=o.getNode()}else{let f=oe(t),p;if(o.isCompleteForChild(l)){u=e.serverCache.getNode();let m=rw(r,t,o.getNode(),u);m!=null?p=o.getNode().getImmediateChild(l).updateChild(f,m):p=o.getNode().getImmediateChild(l)}else p=ip(r,l,e.serverCache);p!=null?c=n.filter.updateChild(o.getNode(),l,p,f,i,s):c=o.getNode()}}return Vs(e,c,o.isFullyInitialized()||K(t),n.filter.filtersNodes())}}function mc(n,e,t,r,i,s,o,c){let u=e.serverCache,l,f=o?n.filter:n.filter.getIndexedFilter();if(K(t))l=f.updateFullNode(u.getNode(),r,null);else if(f.filtersNodes()&&!u.isFiltered()){let I=u.getNode().updateChild(t,r);l=f.updateFullNode(u.getNode(),I,null)}else{let I=H(t);if(!u.isCompleteForPath(t)&&Tn(t)>1)return e;let C=oe(t),P=u.getNode().getImmediateChild(I).updateChild(C,r);I===".priority"?l=f.updatePriority(u.getNode(),P):l=f.updateChild(u.getNode(),I,P,C,Kw,null)}let p=jw(e,l,u.isFullyInitialized()||K(t),f.filtersNodes()),m=new Ws(i,p,s);return Qw(n,p,t,i,m,c)}function Pf(n,e,t,r,i,s,o){let c=e.eventCache,u,l,f=new Ws(i,e,s);if(K(t))l=n.filter.updateFullNode(e.eventCache.getNode(),r,o),u=Vs(e,l,!0,n.filter.filtersNodes());else{let p=H(t);if(p===".priority")l=n.filter.updatePriority(e.eventCache.getNode(),r),u=Vs(e,l,c.isFullyInitialized(),c.isFiltered());else{let m=oe(t),I=c.getNode().getImmediateChild(p),C;if(K(m))C=r;else{let k=f.getCompleteChild(p);k!=null?Yf(m)===".priority"&&k.getChild(Vw(m)).isEmpty()?C=k:C=k.updateChild(m,r):C=z.EMPTY_NODE}if(I.equals(C))u=e;else{let k=n.filter.updateChild(c.getNode(),p,C,m,f,o);u=Vs(e,k,c.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function iw(n,e){return n.eventCache.isCompleteForChild(e)}function UC(n,e,t,r,i,s,o){let c=e;return r.foreach((u,l)=>{let f=le(t,u);iw(e,H(f))&&(c=Pf(n,c,f,l,i,s,o))}),r.foreach((u,l)=>{let f=le(t,u);iw(e,H(f))||(c=Pf(n,c,f,l,i,s,o))}),c}function sw(n,e,t){return t.foreach((r,i)=>{e=e.updateChild(r,i)}),e}function Nf(n,e,t,r,i,s,o,c){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,l;K(t)?l=r:l=new ze(null).setTree(t,r);let f=e.serverCache.getNode();return l.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){let I=e.serverCache.getNode().getImmediateChild(p),C=sw(n,I,m);u=mc(n,u,new ne(p),C,i,s,o,c)}}),l.children.inorderTraversal((p,m)=>{let I=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!I){let C=e.serverCache.getNode().getImmediateChild(p),k=sw(n,C,m);u=mc(n,u,new ne(p),k,i,s,o,c)}}),u}function BC(n,e,t,r,i,s,o){if(pc(i,t)!=null)return e;let c=e.serverCache.isFiltered(),u=e.serverCache;if(r.value!=null){if(K(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return mc(n,e,t,u.getNode().getChild(t),i,s,c,o);if(K(t)){let l=new ze(null);return u.getNode().forEachChild(Zr,(f,p)=>{l=l.set(new ne(f),p)}),Nf(n,e,t,l,i,s,c,o)}else return e}else{let l=new ze(null);return r.foreach((f,p)=>{let m=le(t,f);u.isCompleteForPath(m)&&(l=l.set(f,u.getNode().getChild(m)))}),Nf(n,e,t,l,i,s,c,o)}}function qC(n,e,t,r,i){let s=e.serverCache,o=jw(e,s.getNode(),s.isFullyInitialized()||K(t),s.isFiltered());return Qw(n,o,t,r,Kw,i)}function jC(n,e,t,r,i,s){let o;if(pc(r,t)!=null)return e;{let c=new Ws(r,e,i),u=e.eventCache.getNode(),l;if(K(t)||H(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=fc(r,ur(e));else{let p=e.serverCache.getNode();D(p instanceof z,"serverChildren would be complete if leaf node"),f=rp(r,p)}f=f,l=n.filter.updateFullNode(u,f,s)}else{let f=H(t),p=ip(r,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=u.getImmediateChild(f)),p!=null?l=n.filter.updateChild(u,f,p,oe(t),c,s):e.eventCache.getNode().hasChild(f)?l=n.filter.updateChild(u,f,z.EMPTY_NODE,oe(t),c,s):l=u,l.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=fc(r,ur(e)),o.isLeafNode()&&(l=n.filter.updateFullNode(l,o,s)))}return o=e.serverCache.isFullyInitialized()||pc(r,te())!=null,Vs(e,l,o,n.filter.filtersNodes())}}var kf=class{constructor(e,t){this.query_=e,this.eventRegistrations_=[];let r=this.query_._queryParams,i=new qs(r.getIndex()),s=fC(r);this.processor_=VC(s);let o=t.serverCache,c=t.eventCache,u=i.updateFullNode(z.EMPTY_NODE,o.getNode(),null),l=s.updateFullNode(z.EMPTY_NODE,c.getNode(),null),f=new Qt(u,o.isFullyInitialized(),i.filtersNodes()),p=new Qt(l,c.isFullyInitialized(),s.filtersNodes());this.viewCache_=Ac(p,f),this.eventGenerator_=new Ef(this.query_)}get query(){return this.query_}};function WC(n){return n.viewCache_.serverCache.getNode()}function zC(n,e){let t=ur(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!K(e)&&!t.getImmediateChild(H(e)).isEmpty())?t.getChild(e):null}function ow(n){return n.eventRegistrations_.length===0}function GC(n,e){n.eventRegistrations_.push(e)}function aw(n,e,t){let r=[];if(t){D(e==null,"A cancel should cancel all event registrations.");let i=n.query._path;n.eventRegistrations_.forEach(s=>{let o=s.createCancelEvent(t,i);o&&r.push(o)})}if(e){let i=[];for(let s=0;s<n.eventRegistrations_.length;++s){let o=n.eventRegistrations_[s];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(s+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return r}function cw(n,e,t,r){e.type===pt.MERGE&&e.source.queryId!==null&&(D(ur(n.viewCache_),"We should always have a full cache before handling merges"),D(Tf(n.viewCache_),"Missing event cache, even though we have a server cache"));let i=n.viewCache_,s=MC(n.processor_,i,e,t,r);return LC(n.processor_,s.viewCache),D(s.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=s.viewCache,Yw(n,s.changes,s.viewCache.eventCache.getNode(),null)}function $C(n,e){let t=n.viewCache_.eventCache,r=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(he,(s,o)=>{r.push(ii(s,o))}),t.isFullyInitialized()&&r.push(qw(t.getNode())),Yw(n,r,t.getNode(),e)}function Yw(n,e,t,r){let i=r?[r]:n.eventRegistrations_;return _C(n.eventGenerator_,e,t,i)}var gc,Df=class{constructor(){this.views=new Map}};function HC(n){D(!gc,"__referenceConstructor has already been defined"),gc=n}function KC(){return D(gc,"Reference.ts has not been loaded"),gc}function QC(n){return n.views.size===0}function sp(n,e,t,r){let i=e.source.queryId;if(i!==null){let s=n.views.get(i);return D(s!=null,"SyncTree gave us an op for an invalid query."),cw(s,e,t,r)}else{let s=[];for(let o of n.views.values())s=s.concat(cw(o,e,t,r));return s}}function YC(n,e,t,r,i){let s=e._queryIdentifier,o=n.views.get(s);if(!o){let c=fc(t,i?r:null),u=!1;c?u=!0:r instanceof z?(c=rp(t,r),u=!1):(c=z.EMPTY_NODE,u=!1);let l=Ac(new Qt(c,u,!1),new Qt(r,i,!1));return new kf(e,l)}return o}function JC(n,e,t,r,i,s){let o=YC(n,e,r,i,s);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),GC(o,t),$C(o,t)}function XC(n,e,t,r){let i=e._queryIdentifier,s=[],o=[],c=bn(n);if(i==="default")for(let[u,l]of n.views.entries())o=o.concat(aw(l,t,r)),ow(l)&&(n.views.delete(u),l.query._queryParams.loadsAllData()||s.push(l.query));else{let u=n.views.get(i);u&&(o=o.concat(aw(u,t,r)),ow(u)&&(n.views.delete(i),u.query._queryParams.loadsAllData()||s.push(u.query)))}return c&&!bn(n)&&s.push(new(KC())(e._repo,e._path)),{removed:s,events:o}}function Jw(n){let e=[];for(let t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ei(n,e){let t=null;for(let r of n.views.values())t=t||zC(r,e);return t}function Xw(n,e){if(e._queryParams.loadsAllData())return Sc(n);{let r=e._queryIdentifier;return n.views.get(r)}}function Zw(n,e){return Xw(n,e)!=null}function bn(n){return Sc(n)!=null}function Sc(n){for(let e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}var _c;function ZC(n){D(!_c,"__referenceConstructor has already been defined"),_c=n}function eR(){return D(_c,"Reference.ts has not been loaded"),_c}var tR=1,yc=class{constructor(e){this.listenProvider_=e,this.syncPointTree_=new ze(null),this.pendingWriteTree_=OC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}};function eI(n,e,t,r,i){return IC(n.pendingWriteTree_,e,t,r,i),i?li(n,new si(Zf(),e,t)):[]}function nR(n,e,t,r){EC(n.pendingWriteTree_,e,t,r);let i=ze.fromObject(t);return li(n,new js(Zf(),e,i))}function wn(n,e,t=!1){let r=TC(n.pendingWriteTree_,e);if(bC(n.pendingWriteTree_,e)){let s=new ze(null);return r.snap!=null?s=s.set(te(),!0):Ce(r.children,o=>{s=s.set(new ne(o),!0)}),li(n,new If(r.path,s,t))}else return[]}function Cc(n,e,t){return li(n,new si(ep(),e,t))}function rR(n,e,t){let r=ze.fromObject(t);return li(n,new js(ep(),e,r))}function iR(n,e){return li(n,new dc(ep(),e))}function sR(n,e,t){let r=ap(n,t);if(r){let i=cp(r),s=i.path,o=i.queryId,c=Qe(s,e),u=new dc(tp(o),c);return up(n,s,u)}else return[]}function Of(n,e,t,r,i=!1){let s=e._path,o=n.syncPointTree_.get(s),c=[];if(o&&(e._queryIdentifier==="default"||Zw(o,e))){let u=XC(o,e,t,r);QC(o)&&(n.syncPointTree_=n.syncPointTree_.remove(s));let l=u.removed;if(c=u.events,!i){let f=l.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=n.syncPointTree_.findOnPath(s,(m,I)=>bn(I));if(f&&!p){let m=n.syncPointTree_.subtree(s);if(!m.isEmpty()){let I=cR(m);for(let C=0;C<I.length;++C){let k=I[C],P=k.query,B=rI(n,k);n.listenProvider_.startListening(Ms(P),vc(n,P),B.hashFn,B.onComplete)}}}!p&&l.length>0&&!r&&(f?n.listenProvider_.stopListening(Ms(e),null):l.forEach(m=>{let I=n.queryToTagMap.get(Rc(m));n.listenProvider_.stopListening(Ms(m),I)}))}uR(n,l)}return c}function oR(n,e,t,r){let i=ap(n,r);if(i!=null){let s=cp(i),o=s.path,c=s.queryId,u=Qe(o,e),l=new si(tp(c),u,t);return up(n,o,l)}else return[]}function aR(n,e,t,r){let i=ap(n,r);if(i){let s=cp(i),o=s.path,c=s.queryId,u=Qe(o,e),l=ze.fromObject(t),f=new js(tp(c),u,l);return up(n,o,f)}else return[]}function uw(n,e,t,r=!1){let i=e._path,s=null,o=!1;n.syncPointTree_.foreachOnPath(i,(m,I)=>{let C=Qe(m,i);s=s||ei(I,C),o=o||bn(I)});let c=n.syncPointTree_.get(i);c?(o=o||bn(c),s=s||ei(c,te())):(c=new Df,n.syncPointTree_=n.syncPointTree_.set(i,c));let u;s!=null?u=!0:(u=!1,s=z.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((I,C)=>{let k=ei(C,te());k&&(s=s.updateImmediateChild(I,k))}));let l=Zw(c,e);if(!l&&!e._queryParams.loadsAllData()){let m=Rc(e);D(!n.queryToTagMap.has(m),"View does not exist, but we have a tag");let I=lR();n.queryToTagMap.set(m,I),n.tagToQueryMap.set(I,m)}let f=np(n.pendingWriteTree_,i),p=JC(c,e,t,f,s,u);if(!l&&!o&&!r){let m=Xw(c,e);p=p.concat(hR(n,e,m))}return p}function op(n,e,t){let i=n.pendingWriteTree_,s=n.syncPointTree_.findOnPath(e,(o,c)=>{let u=Qe(o,e),l=ei(c,u);if(l)return l});return Gw(i,e,s,t,!0)}function li(n,e){return tI(e,n.syncPointTree_,null,np(n.pendingWriteTree_,te()))}function tI(n,e,t,r){if(K(n.path))return nI(n,e,t,r);{let i=e.get(te());t==null&&i!=null&&(t=ei(i,te()));let s=[],o=H(n.path),c=n.operationForChild(o),u=e.children.get(o);if(u&&c){let l=t?t.getImmediateChild(o):null,f=$w(r,o);s=s.concat(tI(c,u,l,f))}return i&&(s=s.concat(sp(i,n,r,t))),s}}function nI(n,e,t,r){let i=e.get(te());t==null&&i!=null&&(t=ei(i,te()));let s=[];return e.children.inorderTraversal((o,c)=>{let u=t?t.getImmediateChild(o):null,l=$w(r,o),f=n.operationForChild(o);f&&(s=s.concat(nI(f,c,u,l)))}),i&&(s=s.concat(sp(i,n,r,t))),s}function rI(n,e){let t=e.query,r=vc(n,t);return{hashFn:()=>(WC(e)||z.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return r?sR(n,t._path,r):iR(n,t._path);{let s=b0(i,t);return Of(n,t,null,s)}}}}function vc(n,e){let t=Rc(e);return n.queryToTagMap.get(t)}function Rc(n){return n._path.toString()+"$"+n._queryIdentifier}function ap(n,e){return n.tagToQueryMap.get(e)}function cp(n){let e=n.indexOf("$");return D(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new ne(n.substr(0,e))}}function up(n,e,t){let r=n.syncPointTree_.get(e);D(r,"Missing sync point for query tag that we're tracking");let i=np(n.pendingWriteTree_,e);return sp(r,t,i,null)}function cR(n){return n.fold((e,t,r)=>{if(t&&bn(t))return[Sc(t)];{let i=[];return t&&(i=Jw(t)),Ce(r,(s,o)=>{i=i.concat(o)}),i}})}function Ms(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(eR())(n._repo,n._path):n}function uR(n,e){for(let t=0;t<e.length;++t){let r=e[t];if(!r._queryParams.loadsAllData()){let i=Rc(r),s=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(s)}}}function lR(){return tR++}function hR(n,e,t){let r=e._path,i=vc(n,e),s=rI(n,t),o=n.listenProvider_.startListening(Ms(e),i,s.hashFn,s.onComplete),c=n.syncPointTree_.subtree(r);if(i)D(!bn(c.value),"If we're adding a query, it shouldn't be shadowed");else{let u=c.fold((l,f,p)=>{if(!K(l)&&f&&bn(f))return[Sc(f).query];{let m=[];return f&&(m=m.concat(Jw(f).map(I=>I.query))),Ce(p,(I,C)=>{m=m.concat(C)}),m}});for(let l=0;l<u.length;++l){let f=u[l];n.listenProvider_.stopListening(Ms(f),vc(n,f))}}return o}var xf=class n{constructor(e){this.node_=e}getImmediateChild(e){let t=this.node_.getImmediateChild(e);return new n(t)}node(){return this.node_}},Vf=class n{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){let t=le(this.path_,e);return new n(this.syncTree_,t)}node(){return op(this.syncTree_,this.path_)}},dR=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},lw=function(n,e,t){if(!n||typeof n!="object")return n;if(D(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return fR(n[".sv"],e,t);if(typeof n[".sv"]=="object")return pR(n[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},fR=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:D(!1,"Unexpected server value: "+n)}},pR=function(n,e,t){n.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(n,null,2));let r=n.increment;typeof r!="number"&&D(!1,"Unexpected increment value: "+r);let i=e.node();if(D(i!==null&&typeof i!="undefined","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return r;let o=i.getValue();return typeof o!="number"?r:o+r},iI=function(n,e,t,r){return lp(e,new Vf(t,n),r)},sI=function(n,e,t){return lp(n,new xf(e),t)};function lp(n,e,t){let r=n.getPriority().val(),i=lw(r,e.getImmediateChild(".priority"),t),s;if(n.isLeafNode()){let o=n,c=lw(o.getValue(),e,t);return c!==o.getValue()||i!==o.getPriority().val()?new Kt(c,me(i)):n}else{let o=n;return s=o,i!==o.getPriority().val()&&(s=s.updatePriority(new Kt(i))),o.forEachChild(he,(c,u)=>{let l=lp(u,e.getImmediateChild(c),t);l!==u&&(s=s.updateImmediateChild(c,l))}),s}}var zs=class{constructor(e="",t=null,r={children:{},childCount:0}){this.name=e,this.parent=t,this.node=r}};function hp(n,e){let t=e instanceof ne?e:new ne(e),r=n,i=H(t);for(;i!==null;){let s=kn(r.node.children,i)||{children:{},childCount:0};r=new zs(i,r,s),t=oe(t),i=H(t)}return r}function hi(n){return n.node.value}function oI(n,e){n.node.value=e,Lf(n)}function aI(n){return n.node.childCount>0}function mR(n){return hi(n)===void 0&&!aI(n)}function Pc(n,e){Ce(n.node.children,(t,r)=>{e(new zs(t,n,r))})}function cI(n,e,t,r){t&&!r&&e(n),Pc(n,i=>{cI(i,e,!0,r)}),t&&r&&e(n)}function gR(n,e,t){let r=t?n:n.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Ks(n){return new ne(n.parent===null?n.name:Ks(n.parent)+"/"+n.name)}function Lf(n){n.parent!==null&&_R(n.parent,n.name,n)}function _R(n,e,t){let r=mR(t),i=lt(n.node.children,e);r&&i?(delete n.node.children[e],n.node.childCount--,Lf(n)):!r&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Lf(n))}var yR=/[\[\].#$\/\u0000-\u001F\u007F]/,vR=/[\[\].#$\u0000-\u001F\u007F]/,Wd=10*1024*1024,dp=function(n){return typeof n=="string"&&n.length!==0&&!yR.test(n)},uI=function(n){return typeof n=="string"&&n.length!==0&&!vR.test(n)},wR=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),uI(n)},lI=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!bc(n)||n&&typeof n=="object"&&lt(n,".sv")},Mf=function(n,e,t,r){r&&e===void 0||Nc(Dn(n,"value"),e,t)},Nc=function(n,e,t){let r=t instanceof ne?new rf(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ir(r));if(typeof e=="function")throw new Error(n+"contains a function "+ir(r)+" with contents = "+e.toString());if(bc(e))throw new Error(n+"contains "+e.toString()+" "+ir(r));if(typeof e=="string"&&e.length>Wd/3&&Li(e)>Wd)throw new Error(n+"contains a string greater than "+Wd+" utf8 bytes "+ir(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,s=!1;if(Ce(e,(o,c)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(s=!0,!dp(o)))throw new Error(n+" contains an invalid key ("+o+") "+ir(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Z0(r,o),Nc(n,c,r),eC(r)}),i&&s)throw new Error(n+' contains ".value" child '+ir(r)+" in addition to actual children.")}},IR=function(n,e){let t,r;for(t=0;t<e.length;t++){r=e[t];let s=Fs(r);for(let o=0;o<s.length;o++)if(!(s[o]===".priority"&&o===s.length-1)){if(!dp(s[o]))throw new Error(n+"contains an invalid key ("+s[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(X0);let i=null;for(t=0;t<e.length;t++){if(r=e[t],i!==null&&ot(i,r))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+r.toString());i=r}},hI=function(n,e,t,r){if(r&&e===void 0)return;let i=Dn(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");let s=[];Ce(e,(o,c)=>{let u=new ne(o);if(Nc(i,c,le(t,u)),Yf(u)===".priority"&&!lI(c))throw new Error(i+"contains an invalid value for '"+u.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(u)}),IR(i,s)},ER=function(n,e,t){if(!(t&&e===void 0)){if(bc(e))throw new Error(Dn(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!lI(e))throw new Error(Dn(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")}};var dI=function(n,e,t,r){if(!(r&&t===void 0)&&!uI(t))throw new Error(Dn(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},TR=function(n,e,t,r){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),dI(n,e,t,r)},Jr=function(n,e){if(H(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},bR=function(n,e){let t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!dp(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!wR(t))throw new Error(Dn(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};var Ff=class{constructor(){this.eventLists_=[],this.recursionDepth_=0}};function kc(n,e){let t=null;for(let r=0;r<e.length;r++){let i=e[r],s=i.getPath();t!==null&&!Jf(s,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:s}),t.events.push(i)}t&&n.eventLists_.push(t)}function fI(n,e,t){kc(n,t),pI(n,r=>Jf(r,e))}function gt(n,e,t){kc(n,t),pI(n,r=>ot(r,e)||ot(e,r))}function pI(n,e){n.recursionDepth_++;let t=!0;for(let r=0;r<n.eventLists_.length;r++){let i=n.eventLists_[r];if(i){let s=i.path;e(s)?(AR(n.eventLists_[r]),n.eventLists_[r]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function AR(n){for(let e=0;e<n.events.length;e++){let t=n.events[e];if(t!==null){n.events[e]=null;let r=t.getEventRunner();or&&Se("event: "+t.toString()),ci(r)}}}var SR="repo_interrupt",CR=25,Uf=class{constructor(e,t,r,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=r,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Ff,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=hc(),this.transactionQueueTree_=new zs,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}};function RR(n,e,t){if(n.stats_=Qf(n.repoInfo_),n.forceRestClient_||R0())n.server_=new mf(n.repoInfo_,(r,i,s,o)=>{hw(n,r,i,s,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>dw(n,!0),0);else{if(typeof t!="undefined"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Ee(t)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}n.persistentConnection_=new cr(n.repoInfo_,e,(r,i,s,o)=>{hw(n,r,i,s,o)},r=>{dw(n,r)},r=>{NR(n,r)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(r=>{n.server_.refreshAuthToken(r)}),n.appCheckProvider_.addTokenChangeListener(r=>{n.server_.refreshAppCheckToken(r.token)}),n.statsReporter_=N0(n.repoInfo_,()=>new wf(n.stats_,n.server_)),n.infoData_=new gf,n.infoSyncTree_=new yc({startListening:(r,i,s,o)=>{let c=[],u=n.infoData_.getNode(r._path);return u.isEmpty()||(c=Cc(n.infoSyncTree_,r._path,u),setTimeout(()=>{o("ok")},0)),c},stopListening:()=>{}}),fp(n,"connected",!1),n.serverSyncTree_=new yc({startListening:(r,i,s,o)=>(n.server_.listen(r,s,i,(c,u)=>{let l=o(c,u);gt(n.eventQueue_,r._path,l)}),[]),stopListening:(r,i)=>{n.server_.unlisten(r,i)}})}function PR(n){let t=n.infoData_.getNode(new ne(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Dc(n){return dR({timestamp:PR(n)})}function hw(n,e,t,r,i){n.dataUpdateCount++;let s=new ne(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(r){let u=Vi(t,l=>me(l));o=aR(n.serverSyncTree_,s,u,i)}else{let u=me(t);o=oR(n.serverSyncTree_,s,u,i)}else if(r){let u=Vi(t,l=>me(l));o=rR(n.serverSyncTree_,s,u)}else{let u=me(t);o=Cc(n.serverSyncTree_,s,u)}let c=s;o.length>0&&(c=ai(n,s)),gt(n.eventQueue_,c,o)}function dw(n,e){fp(n,"connected",e),e===!1&&OR(n)}function NR(n,e){Ce(e,(t,r)=>{fp(n,t,r)})}function fp(n,e,t){let r=new ne("/.info/"+e),i=me(t);n.infoData_.updateSnapshot(r,i);let s=Cc(n.infoSyncTree_,r,i);gt(n.eventQueue_,r,s)}function pp(n){return n.nextWriteId_++}function kR(n,e,t,r,i){Oc(n,"set",{path:e.toString(),value:t,priority:r});let s=Dc(n),o=me(t,r),c=op(n.serverSyncTree_,e),u=sI(o,c,s),l=pp(n),f=eI(n.serverSyncTree_,e,u,l,!0);kc(n.eventQueue_,f),n.server_.put(e.toString(),o.val(!0),(m,I)=>{let C=m==="ok";C||We("set at "+e+" failed: "+m);let k=wn(n.serverSyncTree_,l,!C);gt(n.eventQueue_,e,k),An(n,i,m,I)});let p=gp(n,e);ai(n,p),gt(n.eventQueue_,p,[])}function DR(n,e,t,r){Oc(n,"update",{path:e.toString(),value:t});let i=!0,s=Dc(n),o={};if(Ce(t,(c,u)=>{i=!1,o[c]=iI(le(e,c),me(u),n.serverSyncTree_,s)}),i)Se("update() called with empty data.  Don't do anything."),An(n,r,"ok",void 0);else{let c=pp(n),u=nR(n.serverSyncTree_,e,o,c);kc(n.eventQueue_,u),n.server_.merge(e.toString(),t,(l,f)=>{let p=l==="ok";p||We("update at "+e+" failed: "+l);let m=wn(n.serverSyncTree_,c,!p),I=m.length>0?ai(n,e):e;gt(n.eventQueue_,I,m),An(n,r,l,f)}),Ce(t,l=>{let f=gp(n,le(e,l));ai(n,f)}),gt(n.eventQueue_,e,[])}}function OR(n){Oc(n,"onDisconnectEvents");let e=Dc(n),t=hc();yf(n.onDisconnect_,te(),(i,s)=>{let o=iI(i,s,n.serverSyncTree_,e);ui(t,i,o)});let r=[];yf(t,te(),(i,s)=>{r=r.concat(Cc(n.serverSyncTree_,i,s));let o=gp(n,i);ai(n,o)}),n.onDisconnect_=hc(),gt(n.eventQueue_,te(),r)}function xR(n,e,t){n.server_.onDisconnectCancel(e.toString(),(r,i)=>{r==="ok"&&_f(n.onDisconnect_,e),An(n,t,r,i)})}function fw(n,e,t,r){let i=me(t);n.server_.onDisconnectPut(e.toString(),i.val(!0),(s,o)=>{s==="ok"&&ui(n.onDisconnect_,e,i),An(n,r,s,o)})}function VR(n,e,t,r,i){let s=me(t,r);n.server_.onDisconnectPut(e.toString(),s.val(!0),(o,c)=>{o==="ok"&&ui(n.onDisconnect_,e,s),An(n,i,o,c)})}function LR(n,e,t,r){if(vr(t)){Se("onDisconnect().update() called with empty data.  Don't do anything."),An(n,r,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(i,s)=>{i==="ok"&&Ce(t,(o,c)=>{let u=me(c);ui(n.onDisconnect_,le(e,o),u)}),An(n,r,i,s)})}function MR(n,e,t){let r;H(e._path)===".info"?r=uw(n.infoSyncTree_,e,t):r=uw(n.serverSyncTree_,e,t),fI(n.eventQueue_,e._path,r)}function pw(n,e,t){let r;H(e._path)===".info"?r=Of(n.infoSyncTree_,e,t):r=Of(n.serverSyncTree_,e,t),fI(n.eventQueue_,e._path,r)}function FR(n){n.persistentConnection_&&n.persistentConnection_.interrupt(SR)}function Oc(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),Se(t,...e)}function An(n,e,t,r){e&&ci(()=>{if(t==="ok")e(null);else{let i=(t||"error").toUpperCase(),s=i;r&&(s+=": "+r);let o=new Error(s);o.code=i,e(o)}})}function mI(n,e,t){return op(n.serverSyncTree_,e,t)||z.EMPTY_NODE}function mp(n,e=n.transactionQueueTree_){if(e||xc(n,e),hi(e)){let t=_I(n,e);D(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&UR(n,Ks(e),t)}else aI(e)&&Pc(e,t=>{mp(n,t)})}function UR(n,e,t){let r=t.map(l=>l.currentWriteId),i=mI(n,e,r),s=i,o=i.hash();for(let l=0;l<t.length;l++){let f=t[l];D(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;let p=Qe(e,f.path);s=s.updateChild(p,f.currentOutputSnapshotRaw)}let c=s.val(!0),u=e;n.server_.put(u.toString(),c,l=>{Oc(n,"transaction put response",{path:u.toString(),status:l});let f=[];if(l==="ok"){let p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(wn(n.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();xc(n,hp(n.transactionQueueTree_,e)),mp(n,n.transactionQueueTree_),gt(n.eventQueue_,e,f);for(let m=0;m<p.length;m++)ci(p[m])}else{if(l==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{We("transaction at "+u.toString()+" failed: "+l);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=l}ai(n,e)}},o)}function ai(n,e){let t=gI(n,e),r=Ks(t),i=_I(n,t);return BR(n,i,r),r}function BR(n,e,t){if(e.length===0)return;let r=[],i=[],o=e.filter(c=>c.status===0).map(c=>c.currentWriteId);for(let c=0;c<e.length;c++){let u=e[c],l=Qe(t,u.path),f=!1,p;if(D(l!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)f=!0,p=u.abortReason,i=i.concat(wn(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=CR)f=!0,p="maxretry",i=i.concat(wn(n.serverSyncTree_,u.currentWriteId,!0));else{let m=mI(n,u.path,o);u.currentInputSnapshot=m;let I=e[c].update(m.val());if(I!==void 0){Nc("transaction failed: Data returned ",I,u.path);let C=me(I);typeof I=="object"&&I!=null&&lt(I,".priority")||(C=C.updatePriority(m.getPriority()));let P=u.currentWriteId,B=Dc(n),U=sI(C,m,B);u.currentOutputSnapshotRaw=C,u.currentOutputSnapshotResolved=U,u.currentWriteId=pp(n),o.splice(o.indexOf(P),1),i=i.concat(eI(n.serverSyncTree_,u.path,U,u.currentWriteId,u.applyLocally)),i=i.concat(wn(n.serverSyncTree_,P,!0))}else f=!0,p="nodata",i=i.concat(wn(n.serverSyncTree_,u.currentWriteId,!0))}gt(n.eventQueue_,t,i),i=[],f&&(e[c].status=2,function(m){setTimeout(m,Math.floor(0))}(e[c].unwatcher),e[c].onComplete&&(p==="nodata"?r.push(()=>e[c].onComplete(null,!1,e[c].currentInputSnapshot)):r.push(()=>e[c].onComplete(new Error(p),!1,null))))}xc(n,n.transactionQueueTree_);for(let c=0;c<r.length;c++)ci(r[c]);mp(n,n.transactionQueueTree_)}function gI(n,e){let t,r=n.transactionQueueTree_;for(t=H(e);t!==null&&hi(r)===void 0;)r=hp(r,t),e=oe(e),t=H(e);return r}function _I(n,e){let t=[];return yI(n,e,t),t.sort((r,i)=>r.order-i.order),t}function yI(n,e,t){let r=hi(e);if(r)for(let i=0;i<r.length;i++)t.push(r[i]);Pc(e,i=>{yI(n,i,t)})}function xc(n,e){let t=hi(e);if(t){let r=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[r]=t[i],r++);t.length=r,oI(e,t.length>0?t:void 0)}Pc(e,r=>{xc(n,r)})}function gp(n,e){let t=Ks(gI(n,e)),r=hp(n.transactionQueueTree_,e);return gR(r,i=>{zd(n,i)}),zd(n,r),cI(r,i=>{zd(n,i)}),t}function zd(n,e){let t=hi(e);if(t){let r=[],i=[],s=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(D(s===o-1,"All SENT items should be at beginning of queue."),s=o,t[o].status=3,t[o].abortReason="set"):(D(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(wn(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&r.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));s===-1?oI(e,void 0):t.length=s+1,gt(n.eventQueue_,Ks(e),i);for(let o=0;o<r.length;o++)ci(r[o])}}function qR(n){let e="",t=n.split("/");for(let r=0;r<t.length;r++)if(t[r].length>0){let i=t[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function jR(n){let e={};n.charAt(0)==="?"&&(n=n.substring(1));for(let t of n.split("&")){if(t.length===0)continue;let r=t.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):We(`Invalid query segment '${t}' in query '${n}'`)}return e}var mw=function(n,e){let t=WR(n),r=t.namespace;t.domain==="firebase.com"&&Ht(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&t.domain!=="localhost"&&Ht("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||v0();let i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new nc(t.host,t.secure,r,i,e,"",r!==t.subdomain),path:new ne(t.pathString)}},WR=function(n){let e="",t="",r="",i="",s="",o=!0,c="https",u=443;if(typeof n=="string"){let l=n.indexOf("//");l>=0&&(c=n.substring(0,l-1),n=n.substring(l+2));let f=n.indexOf("/");f===-1&&(f=n.length);let p=n.indexOf("?");p===-1&&(p=n.length),e=n.substring(0,Math.min(f,p)),f<p&&(i=qR(n.substring(f,p)));let m=jR(n.substring(Math.min(n.length,p)));l=e.indexOf(":"),l>=0?(o=c==="https"||c==="wss",u=parseInt(e.substring(l+1),10)):l=e.length;let I=e.slice(0,l);if(I.toLowerCase()==="localhost")t="localhost";else if(I.split(".").length<=2)t=I;else{let C=e.indexOf(".");r=e.substring(0,C).toLowerCase(),t=e.substring(C+1),s=r}"ns"in m&&(s=m.ns)}return{host:e,port:u,domain:t,subdomain:r,secure:o,scheme:c,pathString:i,namespace:s}};var wc=class{constructor(e,t,r,i){this.eventType=e,this.eventRegistration=t,this.snapshot=r,this.prevName=i}getPath(){let e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Ee(this.snapshot.exportVal())}},Ic=class{constructor(e,t,r){this.eventRegistration=e,this.error=t,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}};var Bf=class{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}};var qf=class{constructor(e,t){this._repo=e,this._path=t}cancel(){let e=new Ge;return xR(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){Jr("OnDisconnect.remove",this._path);let e=new Ge;return fw(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){Jr("OnDisconnect.set",this._path),Mf("OnDisconnect.set",e,this._path,!1);let t=new Ge;return fw(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){Jr("OnDisconnect.setWithPriority",this._path),Mf("OnDisconnect.setWithPriority",e,this._path,!1),ER("OnDisconnect.setWithPriority",t,!1);let r=new Ge;return VR(this._repo,this._path,e,t,r.wrapCallback(()=>{})),r.promise}update(e){Jr("OnDisconnect.update",this._path),hI("OnDisconnect.update",e,this._path,!1);let t=new Ge;return LR(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}};var jf=class n{constructor(e,t,r,i){this._repo=e,this._path=t,this._queryParams=r,this._orderByCalled=i}get key(){return K(this._path)?null:Yf(this._path)}get ref(){return new Yt(this._repo,this._path)}get _queryIdentifier(){let e=Zv(this._queryParams),t=Kf(e);return t==="{}"?"default":t}get _queryObject(){return Zv(this._queryParams)}isEqual(e){if(e=ee(e),!(e instanceof n))return!1;let t=this._repo===e._repo,r=Jf(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&r&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+J0(this._path)}};var Yt=class n extends jf{constructor(e,t){super(e,t,new pf,!1)}get parent(){let e=Vw(this._path);return e===null?null:new n(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}},Ec=class n{constructor(e,t,r){this._node=e,this.ref=t,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){let t=new ne(e),r=Tc(this.ref,e);return new n(this._node.getChild(t),r,he)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,i)=>e(new n(i,Tc(this.ref,r),he)))}hasChild(e){let t=new ne(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}};function vI(n,e){return n=ee(n),n._checkNotDeleted("ref"),e!==void 0?Tc(n._root,e):n._root}function Tc(n,e){return n=ee(n),H(n._path)===null?TR("child","path",e,!1):dI("child","path",e,!1),new Yt(n._repo,le(n._path,e))}function wI(n){return n=ee(n),new qf(n._repo,n._path)}function II(n){return Jr("remove",n._path),_p(n,null)}function _p(n,e){n=ee(n),Jr("set",n._path),Mf("set",e,n._path,!1);let t=new Ge;return kR(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function EI(n,e){hI("update",e,n._path,!1);let t=new Ge;return DR(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}var Wf=class n{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){let r=t._queryParams.getIndex();return new wc("value",this,new Ec(e.snapshotNode,new Yt(t._repo,t._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ic(this,e,t):null}matches(e){return e instanceof n?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}},zf=class n{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Ic(this,e,t):null}createEvent(e,t){D(e.childName!=null,"Child events should have a childName.");let r=Tc(new Yt(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new wc(e.type,this,new Ec(e.snapshotNode,r,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof n?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}};function zR(n,e,t,r,i){let s;if(typeof r=="object"&&(s=void 0,i=r),typeof r=="function"&&(s=r),i&&i.onlyOnce){let u=t,l=(f,p)=>{pw(n._repo,n,c),u(f,p)};l.userCallback=t.userCallback,l.context=t.context,t=l}let o=new Bf(t,s||void 0),c=e==="value"?new Wf(o):new zf(e,o);return MR(n._repo,n,c),()=>pw(n._repo,n,c)}function TI(n,e,t,r){return zR(n,"value",e,t,r)}HC(Yt);ZC(Yt);var GR="FIREBASE_DATABASE_EMULATOR_HOST",Gf={},$R=!1;function HR(n,e,t,r){let i=e.lastIndexOf(":"),s=e.substring(0,i),o=ut(s);n.repoInfo_=new nc(e,o,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),r&&(n.authTokenProvider_=r)}function KR(n,e,t,r,i){let s=r||n.options.databaseURL;s===void 0&&(n.options.projectId||Ht("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Se("Using default host for project ",n.options.projectId),s=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=mw(s,i),c=o.repoInfo,u,l;typeof process!="undefined"&&process.env&&(l=process.env[GR]),l?(u=!0,s=`http://${l}?ns=${c.namespace}`,o=mw(s,i),c=o.repoInfo):u=!o.repoInfo.secure;let f=i&&u?new In(In.OWNER):new Yd(n.name,n.options,e);bR("Invalid Firebase Database URL",o),K(o.path)||Ht("Database URL must point to the root of a Firebase Database (not including a child path).");let p=YR(c,n,f,new Qd(n,t));return new $f(p,n)}function QR(n,e){let t=Gf[e];(!t||t[n.key]!==n)&&Ht(`Database ${e}(${n.repoInfo_}) has already been deleted.`),FR(n),delete t[n.key]}function YR(n,e,t,r){let i=Gf[e.name];i||(i={},Gf[e.name]=i);let s=i[n.toURLString()];return s&&Ht("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),s=new Uf(n,$R,t,r),i[n.toURLString()]=s,s}var $f=class{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(RR(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Yt(this._repo,te())),this._rootInternal}_delete(){return this._rootInternal!==null&&(QR(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ht("Cannot call "+e+" on a deleted database.")}};function bI(n=Ui(),e){let t=xn(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){let r=du("database");r&&JR(t,...r)}return t}function JR(n,e,t,r={}){n=ee(n),n._checkNotDeleted("useEmulator");let i=`${e}:${t}`,s=n._repoInternal;if(n._instanceStarted){if(i===n._repoInternal.repoInfo_.host&&nt(r,s.repoInfo_.emulatorOptions))return;Ht("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Ht('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new In(In.OWNER);else if(r.mockUserToken){let c=typeof r.mockUserToken=="string"?r.mockUserToken:mu(r.mockUserToken,n.app.options.projectId);o=new In(c)}ut(e)&&(yr(e),Oi("Database",!0)),HR(s,i,r,o)}function XR(n){g0(It),wt(new $e("database",(e,{instanceIdentifier:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),s=e.getProvider("app-check-internal");return KR(r,i,s,t)},"PUBLIC").setMultipleInstances(!0)),He(Lv,Mv,n),He(Lv,Mv,"esm2017")}cr.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};cr.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};XR();window.FBSDK={initializeApp:Nu,getAuth:fl,signInAnonymously:sl,signInWithEmailAndPassword:cl,createUserWithEmailAndPassword:al,onAuthStateChanged:ul,signOut:ll,sendPasswordResetEmail:ol,initializeFirestore:fv,doc:Od,getDoc:bv,setDoc:Sv,updateDoc:Cv,deleteDoc:Rv,addDoc:Pv,collection:dv,query:vv,where:wv,orderBy:Iv,limit:Ev,onSnapshot:Nv,serverTimestamp:Ov,getDocs:Av,runTransaction:Dv,increment:xv,writeBatch:Vv,Timestamp:fe};Object.assign(window.FBSDK,{getDatabase:bI,dbRef:vI,dbSet:_p,dbUpdate:EI,onValue:TI,onDisconnect:wI,dbRemove:II});window.dispatchEvent(new Event("fbsdk-ready"));})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
