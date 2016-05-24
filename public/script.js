!function e(n,t,r){function o(a,u){if(!t[a]){if(!n[a]){var c="function"==typeof require&&require
if(!u&&c)return c(a,!0)
if(i)return i(a,!0)
var s=new Error("Cannot find module '"+a+"'")
throw s.code="MODULE_NOT_FOUND",s}var f=t[a]={exports:{}}
n[a][0].call(f.exports,function(e){var t=n[a][1][e]
return o(t?t:e)},f,f.exports,e,n,t,r)}return t[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a])
return o}({1:[function(e,n,t){n.exports=[{name:"EPFL",points:[{lat:46.51779040533085,lng:6.561133861541748},{lat:46.516358118096804,lng:6.561123132705688},{lat:46.516358118096804,lng:6.561520099639893},{lat:46.51776087401648,lng:6.56158447265625},{lat:46.51776087401648,lng:6.561927795410156},{lat:46.516402416205885,lng:6.561949253082275},{lat:46.51637288413717,lng:6.5623462200164795},{lat:46.51770181133958,lng:6.5623462200164795},{lat:46.51776087401648,lng:6.562775373458862},{lat:46.516461480295135,lng:6.562861204147339}]},{name:"Riponne",points:[{lat:46.52391780588215,lng:6.63300633430481},{lat:46.5232349671439,lng:6.63248598575592},{lat:46.52320174774311,lng:6.632593274116516},{lat:46.523884586898895,lng:6.633118987083434},{lat:46.52385136789534,lng:6.633269190788269},{lat:46.52316114622568,lng:6.63274347782135},{lat:46.523102089418884,lng:6.632931232452392},{lat:46.52379600284426,lng:6.633414030075073}]}]},{}],2:[function(e,n,t){n.exports=function(e,n){function t(){e.startDraw(),u.style.display="none",d.style.display="",v.style.display="",d.onclick=function(){r()},v.onclick=function(){o()}}function r(){e.endDraw(),u.style.display="",d.style.display="none",v.style.display="none",c.style.display="none"}function o(){var e=a()
c.style.display="",d.style.display="none",v.style.display="none",h.onclick=function(){r()},p.onclick=function(){i(e)}}function i(t){t&&y.value&&n.add(y.value,e.points,function(){y.value="",c.style.display="none",u.style.display=""})}function a(){var n=!0
return e.points.length<2?(n=!1,g.style.display=""):g.style.display="none",n}var u=document.getElementById("plans"),c=document.getElementById("save-drawing"),s=document.getElementById("hide-side"),f=document.getElementById("show-side"),l=document.getElementById("draw"),d=document.getElementById("draw-cancel"),v=document.getElementById("draw-save"),y=document.getElementById("plan-name-input"),p=document.getElementById("plan-name-btn"),h=document.getElementById("plan-name-cancel"),g=document.getElementById("save-drawing-warning")
s.onclick=function(){u.style.display="none",f.style.display=""},f.onclick=function(){u.style.display="",f.style.display="none"},l.onclick=function(){t()}}},{}],3:[function(e,n,t){n.exports=function(e){var n=this,t=L.map(e).setView([46.517,6.563],17)
n.map=t,L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(t),n.planLayer=(new L.FeatureGroup).addTo(t),n.drawing=!1,n.points=[],n.map.on("click",function(e){if(n.drawing)if(n.points.push(e.latlng),n.planLayer.clearLayers(),1===n.points.length){var t=L.marker(n.points[0])
n.planLayer.addLayer(t)}else{var r=L.polyline(n.points)
n.planLayer.addLayer(r)}}),n.startDraw=function(){n.planLayer.clearLayers(),n.drawing=!0},n.endDraw=function(){n.drawing=!1,n.planLayer.clearLayers(),n.points=[]},n.show=function(e){n.planLayer.clearLayers()
var r=L.polyline(e)
n.planLayer.addLayer(r),t.fitBounds(r.getBounds())}}},{}],4:[function(e,n,t){n.exports=function(e,n,t){var r=this
r.points=n,r.name=e,r.html=function(e){var n=document.createElement("div")
n.setAttribute("class","plan")
var o=document.createElement("h4")
o.innerHTML=r.name
var i=document.createElement("button")
i.innerHTML="View",i.onclick=function(){t.show(e)}
var a=document.createElement("button")
a.innerHTML="Delete",a.onclick=function(){t.remove(e)}
var u=document.createElement("hr")
return n.appendChild(o),n.appendChild(i),n.appendChild(a),n.appendChild(u),n}}},{}],5:[function(e,n,t){var r=e("./Plan")
n.exports=function(e,n,t){var o=this
o.listId=e,o.data=[],o.init=function(){n.init(function(e,n){n.forEach(function(e){var n=new r(e.name,e.points,o)
o.data.push(n)}),o.renderList()})},o.renderList=function(){var e=document.getElementById(o.listId)
e.innerHTML="",o.data.forEach(function(n,t){var r=n.html(t)
e.appendChild(r)})},o.add=function(e,n,t){var i=new r(e,n,o)
o.data.push(i),o.renderList(),o.updateStore(),t()},o.remove=function(e){o.data.splice(e,1),o.renderList(),o.updateStore(),t.endDraw()},o.show=function(e){t.show(o.data[e].points)},o.updateStore=function(){var e=[]
o.data.forEach(function(n){e.push({name:n.name,points:n.points})}),n.update(e,function(e,n){e||console.log("Store updated",n)})}}},{"./Plan":4}],6:[function(e,n,t){var r=e("localforage"),o=e("../../init-data.json")
n.exports=function(){var e=this
e.init=function(e){r.getItem("plans",function(n,t){n?(console.log("Error retrieving from store",n),e(n)):null===t?r.setItem("plans",o,function(n){n&&console.log("Error saving to store",n),e(null,o)}):e(null,t)})},e.update=function(e,n){r.setItem("plans",e,function(t){t?(console.log("Error saving to store",t),n(t)):n(null,e)})},e.reset=function(e){r.removeItem("plans",function(e){e?console.log("Error resetting store",e):console.log("Store has been reset")})}}},{"../../init-data.json":1,localforage:8}],7:[function(e,n,t){var r=e("./lib/ctrl"),o=e("./lib/objects/Map"),i=e("./lib/objects/Plans"),a=e("./lib/objects/Store")
window.onload=function(){var e=new o("map"),n=new a,t=new i("plan-list",n,e)
r(e,t),t.init()}},{"./lib/ctrl":2,"./lib/objects/Map":3,"./lib/objects/Plans":5,"./lib/objects/Store":6}],8:[function(e,n,t){(function(r){!function(e){if("object"==typeof t&&"undefined"!=typeof n)n.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{var o
o="undefined"!=typeof window?window:"undefined"!=typeof r?r:"undefined"!=typeof self?self:this,o.localforage=e()}}(function(){return function n(t,r,o){function i(u,c){if(!r[u]){if(!t[u]){var s="function"==typeof e&&e
if(!c&&s)return s(u,!0)
if(a)return a(u,!0)
var f=new Error("Cannot find module '"+u+"'")
throw f.code="MODULE_NOT_FOUND",f}var l=r[u]={exports:{}}
t[u][0].call(l.exports,function(e){var n=t[u][1][e]
return i(n?n:e)},l,l.exports,n,t,r,o)}return r[u].exports}for(var a="function"==typeof e&&e,u=0;u<o.length;u++)i(o[u])
return i}({1:[function(e,n,t){"use strict"
function r(){}function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function")
this.state=m,this.queue=[],this.outcome=void 0,e!==r&&c(this,e)}function i(e,n,t){this.promise=e,"function"==typeof n&&(this.onFulfilled=n,this.callFulfilled=this.otherCallFulfilled),"function"==typeof t&&(this.onRejected=t,this.callRejected=this.otherCallRejected)}function a(e,n,t){y(function(){var r
try{r=n(t)}catch(o){return p.reject(e,o)}r===e?p.reject(e,new TypeError("Cannot resolve promise with itself")):p.resolve(e,r)})}function u(e){var n=e&&e.then
return e&&"object"==typeof e&&"function"==typeof n?function(){n.apply(e,arguments)}:void 0}function c(e,n){function t(n){i||(i=!0,p.reject(e,n))}function r(n){i||(i=!0,p.resolve(e,n))}function o(){n(r,t)}var i=!1,a=s(o)
"error"===a.status&&t(a.value)}function s(e,n){var t={}
try{t.value=e(n),t.status="success"}catch(r){t.status="error",t.value=r}return t}function f(e){return e instanceof this?e:p.resolve(new this(r),e)}function l(e){var n=new this(r)
return p.reject(n,e)}function d(e){function n(e,n){function r(e){a[n]=e,++u!==o||i||(i=!0,p.resolve(s,a))}t.resolve(e).then(r,function(e){i||(i=!0,p.reject(s,e))})}var t=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,i=!1
if(!o)return this.resolve([])
for(var a=new Array(o),u=0,c=-1,s=new this(r);++c<o;)n(e[c],c)
return s}function v(e){function n(e){t.resolve(e).then(function(e){i||(i=!0,p.resolve(u,e))},function(e){i||(i=!0,p.reject(u,e))})}var t=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var o=e.length,i=!1
if(!o)return this.resolve([])
for(var a=-1,u=new this(r);++a<o;)n(e[a])
return u}var y=e(2),p={},h=["REJECTED"],g=["FULFILLED"],m=["PENDING"]
n.exports=t=o,o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,n){if("function"!=typeof e&&this.state===g||"function"!=typeof n&&this.state===h)return this
var t=new this.constructor(r)
if(this.state!==m){var o=this.state===g?e:n
a(t,o,this.outcome)}else this.queue.push(new i(t,e,n))
return t},i.prototype.callFulfilled=function(e){p.resolve(this.promise,e)},i.prototype.otherCallFulfilled=function(e){a(this.promise,this.onFulfilled,e)},i.prototype.callRejected=function(e){p.reject(this.promise,e)},i.prototype.otherCallRejected=function(e){a(this.promise,this.onRejected,e)},p.resolve=function(e,n){var t=s(u,n)
if("error"===t.status)return p.reject(e,t.value)
var r=t.value
if(r)c(e,r)
else{e.state=g,e.outcome=n
for(var o=-1,i=e.queue.length;++o<i;)e.queue[o].callFulfilled(n)}return e},p.reject=function(e,n){e.state=h,e.outcome=n
for(var t=-1,r=e.queue.length;++t<r;)e.queue[t].callRejected(n)
return e},t.resolve=f,t.reject=l,t.all=d,t.race=v},{2:2}],2:[function(e,n,t){(function(e){"use strict"
function t(){f=!0
for(var e,n,t=l.length;t;){for(n=l,l=[],e=-1;++e<t;)n[e]()
t=l.length}f=!1}function r(e){1!==l.push(e)||f||o()}var o,i=e.MutationObserver||e.WebKitMutationObserver
if(i){var a=0,u=new i(t),c=e.document.createTextNode("")
u.observe(c,{characterData:!0}),o=function(){c.data=a=++a%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)o="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var n=e.document.createElement("script")
n.onreadystatechange=function(){t(),n.onreadystatechange=null,n.parentNode.removeChild(n),n=null},e.document.documentElement.appendChild(n)}:function(){setTimeout(t,0)}
else{var s=new e.MessageChannel
s.port1.onmessage=t,o=function(){s.port2.postMessage(0)}}var f,l=[]
n.exports=r}).call(this,"undefined"!=typeof r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],3:[function(e,n,t){(function(n){"use strict"
"function"!=typeof n.Promise&&(n.Promise=e(1))}).call(this,"undefined"!=typeof r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{1:1}],4:[function(e,n,t){"use strict"
function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(){return"undefined"!=typeof indexedDB?indexedDB:"undefined"!=typeof webkitIndexedDB?webkitIndexedDB:"undefined"!=typeof mozIndexedDB?mozIndexedDB:"undefined"!=typeof OIndexedDB?OIndexedDB:"undefined"!=typeof msIndexedDB?msIndexedDB:void 0}function i(){try{return ie?"undefined"!=typeof openDatabase&&"undefined"!=typeof navigator&&navigator.userAgent&&/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)?!1:ie&&"function"==typeof ie.open&&"undefined"!=typeof IDBKeyRange:!1}catch(e){return!1}}function a(){return"function"==typeof openDatabase}function u(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(e){return!1}}function c(e,n){e=e||[],n=n||{}
try{return new Blob(e,n)}catch(t){if("TypeError"!==t.name)throw t
for(var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,o=new r,i=0;i<e.length;i+=1)o.append(e[i])
return o.getBlob(n.type)}}function s(e,n){n&&e.then(function(e){n(null,e)},function(e){n(e)})}function f(e){for(var n=e.length,t=new ArrayBuffer(n),r=new Uint8Array(t),o=0;n>o;o++)r[o]=e.charCodeAt(o)
return t}function l(e){return new ce(function(n){var t=c([""])
e.objectStore(se).put(t,"key"),e.onabort=function(e){e.preventDefault(),e.stopPropagation(),n(!1)},e.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),t=navigator.userAgent.match(/Edge\//)
n(t||!e||parseInt(e[1],10)>=43)}})["catch"](function(){return!1})}function d(e){return"boolean"==typeof ae?ce.resolve(ae):l(e).then(function(e){return ae=e})}function v(e){var n=ue[e.name],t={}
t.promise=new ce(function(e){t.resolve=e}),n.deferredOperations.push(t),n.dbReady?n.dbReady=n.dbReady.then(function(){return t.promise}):n.dbReady=t.promise}function y(e){var n=ue[e.name],t=n.deferredOperations.pop()
t&&t.resolve()}function p(e,n){return new ce(function(t,r){if(e.db){if(!n)return t(e.db)
v(e),e.db.close()}var o=[e.name]
n&&o.push(e.version)
var i=ie.open.apply(ie,o)
n&&(i.onupgradeneeded=function(n){var t=i.result
try{t.createObjectStore(e.storeName),n.oldVersion<=1&&t.createObjectStore(se)}catch(r){if("ConstraintError"!==r.name)throw r
console.warn('The database "'+e.name+'" has been upgraded from version '+n.oldVersion+" to version "+n.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),i.onerror=function(){r(i.error)},i.onsuccess=function(){t(i.result),y(e)}})}function h(e){return p(e,!1)}function g(e){return p(e,!0)}function m(e,n){if(!e.db)return!0
var t=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,o=e.version>e.db.version
if(r&&(e.version!==n&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),o||t){if(t){var i=e.db.version+1
i>e.version&&(e.version=i)}return!0}return!1}function b(e){return new ce(function(n,t){var r=new FileReader
r.onerror=t,r.onloadend=function(t){var r=btoa(t.target.result||"")
n({__local_forage_encoded_blob:!0,data:r,type:e.type})},r.readAsBinaryString(e)})}function w(e){var n=f(atob(e.data))
return c([n],{type:e.type})}function _(e){return e&&e.__local_forage_encoded_blob}function S(e){var n=this,t=n._initReady().then(function(){var e=ue[n._dbInfo.name]
return e&&e.dbReady?e.dbReady:void 0})
return t.then(e,e),t}function E(e){function n(){return ce.resolve()}var t=this,r={db:null}
if(e)for(var o in e)r[o]=e[o]
ue||(ue={})
var i=ue[r.name]
i||(i={forages:[],db:null,dbReady:null,deferredOperations:[]},ue[r.name]=i),i.forages.push(t),t._initReady||(t._initReady=t.ready,t.ready=S)
for(var a=[],u=0;u<i.forages.length;u++){var c=i.forages[u]
c!==t&&a.push(c._initReady()["catch"](n))}var s=i.forages.slice(0)
return ce.all(a).then(function(){return r.db=i.db,h(r)}).then(function(e){return r.db=e,m(r,t._defaultConfig.version)?g(r):e}).then(function(e){r.db=i.db=e,t._dbInfo=r
for(var n=0;n<s.length;n++){var o=s[n]
o!==t&&(o._dbInfo.db=r.db,o._dbInfo.version=r.version)}})}function I(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo,i=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),a=i.get(e)
a.onsuccess=function(){var e=a.result
void 0===e&&(e=null),_(e)&&(e=w(e)),n(e)},a.onerror=function(){r(a.error)}})["catch"](r)})
return s(r,n),r}function L(e,n){var t=this,r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo,i=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),a=i.openCursor(),u=1
a.onsuccess=function(){var t=a.result
if(t){var r=t.value
_(r)&&(r=w(r))
var o=e(r,t.key,u++)
void 0!==o?n(o):t["continue"]()}else n()},a.onerror=function(){r(a.error)}})["catch"](r)})
return s(r,n),r}function B(e,n,t){var r=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var o=new ce(function(t,o){var i
r.ready().then(function(){return i=r._dbInfo,n instanceof Blob?d(i.db).then(function(e){return e?n:b(n)}):n}).then(function(n){var r=i.db.transaction(i.storeName,"readwrite"),a=r.objectStore(i.storeName)
null===n&&(n=void 0),r.oncomplete=function(){void 0===n&&(n=null),t(n)},r.onabort=r.onerror=function(){var e=u.error?u.error:u.transaction.error
o(e)}
var u=a.put(n,e)})["catch"](o)})
return s(o,t),o}function D(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo,i=o.db.transaction(o.storeName,"readwrite"),a=i.objectStore(o.storeName),u=a["delete"](e)
i.oncomplete=function(){n()},i.onerror=function(){r(u.error)},i.onabort=function(){var e=u.error?u.error:u.transaction.error
r(e)}})["catch"](r)})
return s(r,n),r}function k(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo,o=r.db.transaction(r.storeName,"readwrite"),i=o.objectStore(r.storeName),a=i.clear()
o.oncomplete=function(){e()},o.onabort=o.onerror=function(){var e=a.error?a.error:a.transaction.error
t(e)}})["catch"](t)})
return s(t,e),t}function A(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo,o=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),i=o.count()
i.onsuccess=function(){e(i.result)},i.onerror=function(){t(i.error)}})["catch"](t)})
return s(t,e),t}function j(e,n){var t=this,r=new ce(function(n,r){return 0>e?void n(null):void t.ready().then(function(){var o=t._dbInfo,i=o.db.transaction(o.storeName,"readonly").objectStore(o.storeName),a=!1,u=i.openCursor()
u.onsuccess=function(){var t=u.result
return t?void(0===e?n(t.key):a?n(t.key):(a=!0,t.advance(e))):void n(null)},u.onerror=function(){r(u.error)}})["catch"](r)})
return s(r,n),r}function x(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo,o=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),i=o.openCursor(),a=[]
i.onsuccess=function(){var n=i.result
return n?(a.push(n.key),void n["continue"]()):void e(a)},i.onerror=function(){t(i.error)}})["catch"](t)})
return s(t,e),t}function N(e){var n,t,r,o,i,a=.75*e.length,u=e.length,c=0
"="===e[e.length-1]&&(a--,"="===e[e.length-2]&&a--)
var s=new ArrayBuffer(a),f=new Uint8Array(s)
for(n=0;u>n;n+=4)t=le.indexOf(e[n]),r=le.indexOf(e[n+1]),o=le.indexOf(e[n+2]),i=le.indexOf(e[n+3]),f[c++]=t<<2|r>>4,f[c++]=(15&r)<<4|o>>2,f[c++]=(3&o)<<6|63&i
return s}function O(e){var n,t=new Uint8Array(e),r=""
for(n=0;n<t.length;n+=3)r+=le[t[n]>>2],r+=le[(3&t[n])<<4|t[n+1]>>4],r+=le[(15&t[n+1])<<2|t[n+2]>>6],r+=le[63&t[n+2]]
return t.length%3===2?r=r.substring(0,r.length-1)+"=":t.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function R(e,n){var t=""
if(e&&(t=e.toString()),e&&("[object ArrayBuffer]"===e.toString()||e.buffer&&"[object ArrayBuffer]"===e.buffer.toString())){var r,o=ye
e instanceof ArrayBuffer?(r=e,o+=he):(r=e.buffer,"[object Int8Array]"===t?o+=me:"[object Uint8Array]"===t?o+=be:"[object Uint8ClampedArray]"===t?o+=we:"[object Int16Array]"===t?o+=_e:"[object Uint16Array]"===t?o+=Ee:"[object Int32Array]"===t?o+=Se:"[object Uint32Array]"===t?o+=Ie:"[object Float32Array]"===t?o+=Le:"[object Float64Array]"===t?o+=Be:n(new Error("Failed to get type for BinaryArray"))),n(o+O(r))}else if("[object Blob]"===t){var i=new FileReader
i.onload=function(){var t=de+e.type+"~"+O(this.result)
n(ye+ge+t)},i.readAsArrayBuffer(e)}else try{n(JSON.stringify(e))}catch(a){console.error("Couldn't convert value into a JSON string: ",e),n(null,a)}}function C(e){if(e.substring(0,pe)!==ye)return JSON.parse(e)
var n,t=e.substring(De),r=e.substring(pe,De)
if(r===ge&&ve.test(t)){var o=t.match(ve)
n=o[1],t=t.substring(o[0].length)}var i=N(t)
switch(r){case he:return i
case ge:return c([i],{type:n})
case me:return new Int8Array(i)
case be:return new Uint8Array(i)
case we:return new Uint8ClampedArray(i)
case _e:return new Int16Array(i)
case Ee:return new Uint16Array(i)
case Se:return new Int32Array(i)
case Ie:return new Uint32Array(i)
case Le:return new Float32Array(i)
case Be:return new Float64Array(i)
default:throw new Error("Unkown type: "+r)}}function T(e){var n=this,t={db:null}
if(e)for(var r in e)t[r]="string"!=typeof e[r]?e[r].toString():e[r]
var o=new ce(function(e,r){try{t.db=openDatabase(t.name,String(t.version),t.description,t.size)}catch(o){return r(o)}t.db.transaction(function(o){o.executeSql("CREATE TABLE IF NOT EXISTS "+t.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){n._dbInfo=t,e()},function(e,n){r(n)})})})
return t.serializer=ke,o}function M(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo
o.db.transaction(function(t){t.executeSql("SELECT * FROM "+o.storeName+" WHERE key = ? LIMIT 1",[e],function(e,t){var r=t.rows.length?t.rows.item(0).value:null
r&&(r=o.serializer.deserialize(r)),n(r)},function(e,n){r(n)})})})["catch"](r)})
return s(r,n),r}function F(e,n){var t=this,r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo
o.db.transaction(function(t){t.executeSql("SELECT * FROM "+o.storeName,[],function(t,r){for(var i=r.rows,a=i.length,u=0;a>u;u++){var c=i.item(u),s=c.value
if(s&&(s=o.serializer.deserialize(s)),s=e(s,c.key,u+1),void 0!==s)return void n(s)}n()},function(e,n){r(n)})})})["catch"](r)})
return s(r,n),r}function z(e,n,t){var r=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var o=new ce(function(t,o){r.ready().then(function(){void 0===n&&(n=null)
var i=n,a=r._dbInfo
a.serializer.serialize(n,function(n,r){r?o(r):a.db.transaction(function(r){r.executeSql("INSERT OR REPLACE INTO "+a.storeName+" (key, value) VALUES (?, ?)",[e,n],function(){t(i)},function(e,n){o(n)})},function(e){e.code===e.QUOTA_ERR&&o(e)})})})["catch"](o)})
return s(o,t),o}function P(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo
o.db.transaction(function(t){t.executeSql("DELETE FROM "+o.storeName+" WHERE key = ?",[e],function(){n()},function(e,n){r(n)})})})["catch"](r)})
return s(r,n),r}function U(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo
r.db.transaction(function(n){n.executeSql("DELETE FROM "+r.storeName,[],function(){e()},function(e,n){t(n)})})})["catch"](t)})
return s(t,e),t}function q(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo
r.db.transaction(function(n){n.executeSql("SELECT COUNT(key) as c FROM "+r.storeName,[],function(n,t){var r=t.rows.item(0).c
e(r)},function(e,n){t(n)})})})["catch"](t)})
return s(t,e),t}function W(e,n){var t=this,r=new ce(function(n,r){t.ready().then(function(){var o=t._dbInfo
o.db.transaction(function(t){t.executeSql("SELECT key FROM "+o.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,t){var r=t.rows.length?t.rows.item(0).key:null
n(r)},function(e,n){r(n)})})})["catch"](r)})
return s(r,n),r}function Q(e){var n=this,t=new ce(function(e,t){n.ready().then(function(){var r=n._dbInfo
r.db.transaction(function(n){n.executeSql("SELECT key FROM "+r.storeName,[],function(n,t){for(var r=[],o=0;o<t.rows.length;o++)r.push(t.rows.item(o).key)
e(r)},function(e,n){t(n)})})})["catch"](t)})
return s(t,e),t}function G(e){var n=this,t={}
if(e)for(var r in e)t[r]=e[r]
return t.keyPrefix=t.name+"/",t.storeName!==n._defaultConfig.storeName&&(t.keyPrefix+=t.storeName+"/"),n._dbInfo=t,t.serializer=ke,ce.resolve()}function H(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo.keyPrefix,t=localStorage.length-1;t>=0;t--){var r=localStorage.key(t)
0===r.indexOf(e)&&localStorage.removeItem(r)}})
return s(t,e),t}function X(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=t.ready().then(function(){var n=t._dbInfo,r=localStorage.getItem(n.keyPrefix+e)
return r&&(r=n.serializer.deserialize(r)),r})
return s(r,n),r}function V(e,n){var t=this,r=t.ready().then(function(){for(var n=t._dbInfo,r=n.keyPrefix,o=r.length,i=localStorage.length,a=1,u=0;i>u;u++){var c=localStorage.key(u)
if(0===c.indexOf(r)){var s=localStorage.getItem(c)
if(s&&(s=n.serializer.deserialize(s)),s=e(s,c.substring(o),a++),void 0!==s)return s}}})
return s(r,n),r}function J(e,n){var t=this,r=t.ready().then(function(){var n,r=t._dbInfo
try{n=localStorage.key(e)}catch(o){n=null}return n&&(n=n.substring(r.keyPrefix.length)),n})
return s(r,n),r}function K(e){var n=this,t=n.ready().then(function(){for(var e=n._dbInfo,t=localStorage.length,r=[],o=0;t>o;o++)0===localStorage.key(o).indexOf(e.keyPrefix)&&r.push(localStorage.key(o).substring(e.keyPrefix.length))
return r})
return s(t,e),t}function Y(e){var n=this,t=n.keys().then(function(e){return e.length})
return s(t,e),t}function Z(e,n){var t=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=t.ready().then(function(){var n=t._dbInfo
localStorage.removeItem(n.keyPrefix+e)})
return s(r,n),r}function $(e,n,t){var r=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var o=r.ready().then(function(){void 0===n&&(n=null)
var t=n
return new ce(function(o,i){var a=r._dbInfo
a.serializer.serialize(n,function(n,r){if(r)i(r)
else try{localStorage.setItem(a.keyPrefix+e,n),o(t)}catch(u){("QuotaExceededError"===u.name||"NS_ERROR_DOM_QUOTA_REACHED"===u.name)&&i(u),i(u)}})})})
return s(o,t),o}function ee(e,n,t){"function"==typeof n&&e.then(n),"function"==typeof t&&e["catch"](t)}function ne(e,n){e[n]=function(){var t=arguments
return e.ready().then(function(){return e[n].apply(e,t)})}}function te(){for(var e=1;e<arguments.length;e++){var n=arguments[e]
if(n)for(var t in n)n.hasOwnProperty(t)&&(Me(n[t])?arguments[0][t]=n[t].slice():arguments[0][t]=n[t])}return arguments[0]}function re(e){for(var n in Ne)if(Ne.hasOwnProperty(n)&&Ne[n]===e)return!0
return!1}var oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},ie=o()
"undefined"==typeof Promise&&"undefined"!=typeof e&&e(3)
var ae,ue,ce=Promise,se="local-forage-detect-blob-support",fe={_driver:"asyncStorage",_initStorage:E,iterate:L,getItem:I,setItem:B,removeItem:D,clear:k,length:A,key:j,keys:x},le="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",de="~~local_forage_type~",ve=/^~~local_forage_type~([^~]+)~/,ye="__lfsc__:",pe=ye.length,he="arbf",ge="blob",me="si08",be="ui08",we="uic8",_e="si16",Se="si32",Ee="ur16",Ie="ui32",Le="fl32",Be="fl64",De=pe+he.length,ke={serialize:R,deserialize:C,stringToBuffer:N,bufferToString:O},Ae={_driver:"webSQLStorage",_initStorage:T,iterate:F,getItem:M,setItem:z,removeItem:P,clear:U,length:q,key:W,keys:Q},je={_driver:"localStorageWrapper",_initStorage:G,iterate:V,getItem:X,setItem:$,removeItem:Z,clear:H,length:Y,key:J,keys:K},xe={},Ne={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Oe=[Ne.INDEXEDDB,Ne.WEBSQL,Ne.LOCALSTORAGE],Re=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],Ce={description:"",driver:Oe.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Te={}
Te[Ne.INDEXEDDB]=i(),Te[Ne.WEBSQL]=a(),Te[Ne.LOCALSTORAGE]=u()
var Me=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},Fe=function(){function e(n){r(this,e),this.INDEXEDDB=Ne.INDEXEDDB,this.LOCALSTORAGE=Ne.LOCALSTORAGE,this.WEBSQL=Ne.WEBSQL,this._defaultConfig=te({},Ce),this._config=te({},this._defaultConfig,n),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver)}return e.prototype.config=function(e){if("object"===("undefined"==typeof e?"undefined":oe(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.")
for(var n in e)"storeName"===n&&(e[n]=e[n].replace(/\W/g,"_")),this._config[n]=e[n]
return"driver"in e&&e.driver&&this.setDriver(this._config.driver),!0}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,n,t){var r=new ce(function(n,t){try{var r=e._driver,o=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),i=new Error("Custom driver name already in use: "+e._driver)
if(!e._driver)return void t(o)
if(re(e._driver))return void t(i)
for(var a=Re.concat("_initStorage"),u=0;u<a.length;u++){var c=a[u]
if(!c||!e[c]||"function"!=typeof e[c])return void t(o)}var s=ce.resolve(!0)
"_support"in e&&(s=e._support&&"function"==typeof e._support?e._support():ce.resolve(!!e._support)),s.then(function(t){Te[r]=t,xe[r]=e,n()},t)}catch(f){t(f)}})
return ee(r,n,t),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,n,t){var r=this,o=ce.resolve().then(function(){if(!re(e)){if(xe[e])return xe[e]
throw new Error("Driver not found.")}switch(e){case r.INDEXEDDB:return fe
case r.LOCALSTORAGE:return je
case r.WEBSQL:return Ae}})
return ee(o,n,t),o},e.prototype.getSerializer=function(e){var n=ce.resolve(ke)
return ee(n,e),n},e.prototype.ready=function(e){var n=this,t=n._driverSet.then(function(){return null===n._ready&&(n._ready=n._initDriver()),n._ready})
return ee(t,e,e),t},e.prototype.setDriver=function(e,n,t){function r(){i._config.driver=i.driver()}function o(e){return function(){function n(){for(;t<e.length;){var o=e[t]
return t++,i._dbInfo=null,i._ready=null,i.getDriver(o).then(function(e){return i._extend(e),r(),i._ready=i._initStorage(i._config),i._ready})["catch"](n)}r()
var a=new Error("No available storage method found.")
return i._driverSet=ce.reject(a),i._driverSet}var t=0
return n()}}var i=this
Me(e)||(e=[e])
var a=this._getSupportedDrivers(e),u=null!==this._driverSet?this._driverSet["catch"](function(){return ce.resolve()}):ce.resolve()
return this._driverSet=u.then(function(){var e=a[0]
return i._dbInfo=null,i._ready=null,i.getDriver(e).then(function(e){i._driver=e._driver,r(),i._wrapLibraryMethodsWithReady(),i._initDriver=o(a)})})["catch"](function(){r()
var e=new Error("No available storage method found.")
return i._driverSet=ce.reject(e),i._driverSet}),ee(this._driverSet,n,t),this._driverSet},e.prototype.supports=function(e){return!!Te[e]},e.prototype._extend=function(e){te(this,e)},e.prototype._getSupportedDrivers=function(e){for(var n=[],t=0,r=e.length;r>t;t++){var o=e[t]
this.supports(o)&&n.push(o)}return n},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0;e<Re.length;e++)ne(this,Re[e])},e.prototype.createInstance=function(n){return new e(n)},e}(),ze=new Fe
n.exports=ze},{3:3}]},{},[4])(4)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[7])
