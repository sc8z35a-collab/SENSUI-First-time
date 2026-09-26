(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,O=1029,k=1030,A=1031,j=1033,M=33776,N=33777,P=33778,ee=33779,F=35840,te=35841,I=35842,ne=35843,re=36196,ie=37492,ae=37496,oe=37488,L=37489,se=37490,ce=37491,le=37808,ue=37809,de=37810,fe=37811,pe=37812,me=37813,he=37814,ge=37815,_e=37816,ve=37817,ye=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,ke=36286,Ae=2300,R=2301,je=2302,Me=2303,Ne=2400,z=2401,Pe=2402,Fe=3200,Ie=`srgb`,Le=`srgb-linear`,Re=`linear`,ze=`srgb`,Be=7680,Ve=35044,He=2e3;function Ue(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function We(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ge(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ke(){let e=Ge(`canvas`);return e.style.display=`block`,e}var qe={};function Je(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ye(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function B(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function V(...e){e=Ye(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Xe(...e){let t=e.join(` `);t in qe||(qe[t]=!0,B(...e))}function Ze(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Qe={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},$e=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},et=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),tt=1234567,nt=Math.PI/180,rt=180/Math.PI;function it(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(et[e&255]+et[e>>8&255]+et[e>>16&255]+et[e>>24&255]+`-`+et[t&255]+et[t>>8&255]+`-`+et[t>>16&15|64]+et[t>>24&255]+`-`+et[n&63|128]+et[n>>8&255]+`-`+et[n>>16&255]+et[n>>24&255]+et[r&255]+et[r>>8&255]+et[r>>16&255]+et[r>>24&255]).toLowerCase()}function at(e,t,n){return Math.max(t,Math.min(n,e))}function ot(e,t){return(e%t+t)%t}function st(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ct(e,t,n){return e===t?0:(n-e)/(t-e)}function lt(e,t,n){return(1-n)*e+n*t}function ut(e,t,n,r){return lt(e,t,1-Math.exp(-n*r))}function dt(e,t=1){return t-Math.abs(ot(e,t*2)-t)}function ft(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function pt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function mt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ht(e,t){return e+Math.random()*(t-e)}function gt(e){return e*(.5-Math.random())}function _t(e){e!==void 0&&(tt=e);let t=tt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vt(e){return e*nt}function yt(e){return e*rt}function bt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function xt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function St(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ct(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:B(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function wt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Tt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Et={DEG2RAD:nt,RAD2DEG:rt,generateUUID:it,clamp:at,euclideanModulo:ot,mapLinear:st,inverseLerp:ct,lerp:lt,damp:ut,pingpong:dt,smoothstep:ft,smootherstep:pt,randInt:mt,randFloat:ht,randFloatSpread:gt,seededRandom:_t,degToRad:vt,radToDeg:yt,isPowerOfTwo:bt,ceilPowerOfTwo:xt,floorPowerOfTwo:St,setQuaternionFromProperEuler:Ct,normalize:Tt,denormalize:wt},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Dt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:B(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(at(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ot.copy(this).projectOnVector(e),this.sub(Ot)}reflect(e){return this.sub(Ot.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(at(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ot=new U,kt=new Dt,At=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Xe(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(jt.makeScale(e,t)),this}rotate(e){return Xe(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(jt.makeRotation(-e)),this}translate(e,t){return Xe(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(jt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},jt=new At,Mt=new At().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nt=new At().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Pt(){let e={enabled:!0,workingColorSpace:Le,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=It(e.r),e.g=It(e.g),e.b=It(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Lt(e.r),e.g=Lt(e.g),e.b=Lt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Re:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Xe(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Le]:{primaries:t,whitePoint:r,transfer:Re,toXYZ:Mt,fromXYZ:Nt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:r,transfer:ze,toXYZ:Mt,fromXYZ:Nt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),e}var Ft=Pt();function It(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Lt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Rt,zt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Rt===void 0&&(Rt=Ge(`canvas`)),Rt.width=e.width,Rt.height=e.height;let t=Rt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Rt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ge(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=It(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(It(t[e]/255)*255):t[e]=It(t[e]);return{data:t,width:e.width,height:e.height}}return B(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Bt=0,Vt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Bt++}),this.uuid=it(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ht(r[t].image)):e.push(Ht(r[t]))}else e=Ht(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ht(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?zt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(B(`Texture: Unable to serialize Texture.`),{})}var Ut=0,Wt=new U,Gt=class r extends $e{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ut++}),this.uuid=it(),this.name=``,this.source=new Vt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Wt).x}get height(){return this.source.getSize(Wt).y}get depth(){return this.source.getSize(Wt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){B(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null,Gt.DEFAULT_MAPPING=300,Gt.DEFAULT_ANISOTROPY=1;var Kt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=at(this.x,e.x,t.x),this.y=at(this.y,e.y,t.y),this.z=at(this.z,e.z,t.z),this.w=at(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=at(this.x,e,t),this.y=at(this.y,e,t),this.z=at(this.z,e,t),this.w=at(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(at(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qt=class extends $e{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Kt(0,0,e,t),this.scissorTest=!1,this.viewport=new Kt(0,0,e,t),this.textures=[];let r=new Gt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Vt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Jt=class extends qt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Yt=class extends Gt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Xt=class extends Gt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Zt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Qt.setFromMatrixColumn(e,0).length(),i=1/Qt.setFromMatrixColumn(e,1).length(),a=1/Qt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(en,e,tn)}lookAt(e,t,n){let r=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),nn.crossVectors(n,an),nn.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),nn.crossVectors(n,an)),nn.normalize(),rn.crossVectors(an,nn),r[0]=nn.x,r[4]=rn.x,r[8]=an.x,r[1]=nn.y,r[5]=rn.y,r[9]=an.y,r[2]=nn.z,r[6]=rn.z,r[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],ee=r[11],F=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*ee,i[12]=a*w+o*O+s*M+c*F,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*ee,i[13]=l*w+u*O+d*M+f*F,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*ee,i[14]=p*w+m*O+h*M+g*F,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*ee,i[15]=_*w+v*O+y*M+b*F,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Qt.set(r[0],r[1],r[2]).length(),o=Qt.set(r[4],r[5],r[6]).length(),s=Qt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),$t.copy(this);let c=1/a,l=1/o,u=1/s;return $t.elements[0]*=c,$t.elements[1]*=c,$t.elements[2]*=c,$t.elements[4]*=l,$t.elements[5]*=l,$t.elements[6]*=l,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=He,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Qt=new U,$t=new Zt,en=new U(0,0,0),tn=new U(1,1,1),nn=new U,rn=new U,an=new U,on=new Zt,sn=new Dt,cn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(at(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-at(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(at(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-at(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(at(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-at(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:B(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return on.makeRotationFromQuaternion(e),this.setFromRotationMatrix(on,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sn.setFromEuler(this),this.setFromQuaternion(sn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};cn.DEFAULT_ORDER=`XYZ`;var ln=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},un=0,dn=new U,fn=new Dt,pn=new Zt,mn=new U,hn=new U,gn=new U,_n=new Dt,vn=new U(1,0,0),yn=new U(0,1,0),bn=new U(0,0,1),xn={type:`added`},Sn={type:`removed`},Cn={type:`childadded`,child:null},wn={type:`childremoved`,child:null},Tn=class e extends $e{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:un++}),this.uuid=it(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new cn,r=new Dt,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Zt},normalMatrix:{value:new At}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ln,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fn.setFromAxisAngle(e,t),this.quaternion.multiply(fn),this}rotateOnWorldAxis(e,t){return fn.setFromAxisAngle(e,t),this.quaternion.premultiply(fn),this}rotateX(e){return this.rotateOnAxis(vn,e)}rotateY(e){return this.rotateOnAxis(yn,e)}rotateZ(e){return this.rotateOnAxis(bn,e)}translateOnAxis(e,t){return dn.copy(e).applyQuaternion(this.quaternion),this.position.add(dn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vn,e)}translateY(e){return this.translateOnAxis(yn,e)}translateZ(e){return this.translateOnAxis(bn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?mn.copy(e):mn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),hn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(hn,mn,this.up):pn.lookAt(mn,hn,this.up),this.quaternion.setFromRotationMatrix(pn),r&&(pn.extractRotation(r.matrixWorld),fn.setFromRotationMatrix(pn),this.quaternion.premultiply(fn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(V(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xn),Cn.child=e,this.dispatchEvent(Cn),Cn.child=null):V(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sn),wn.child=e,this.dispatchEvent(wn),wn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xn),Cn.child=e,this.dispatchEvent(Cn),Cn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hn,e,gn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(hn,_n,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Tn.DEFAULT_UP=new U(0,1,0),Tn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var W=class extends Tn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},En={type:`move`},Dn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new W,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new W,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new W,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(En)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new W;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},On={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},An={h:0,s:0,l:0};function jn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var G=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ie){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ft.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Ft.workingColorSpace){if(e=ot(e,1),t=at(t,0,1),n=at(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=jn(i,r,e+1/3),this.g=jn(i,r,e),this.b=jn(i,r,e-1/3)}return Ft.colorSpaceToWorking(this,r),this}setStyle(e,t=Ie){function n(t){t!==void 0&&parseFloat(t)<1&&B(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:B(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);B(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ie){let n=On[e.toLowerCase()];return n===void 0?B(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=It(e.r),this.g=It(e.g),this.b=It(e.b),this}copyLinearToSRGB(e){return this.r=Lt(e.r),this.g=Lt(e.g),this.b=Lt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ie){return Ft.workingToColorSpace(Mn.copy(this),e),Math.round(at(Mn.r*255,0,255))*65536+Math.round(at(Mn.g*255,0,255))*256+Math.round(at(Mn.b*255,0,255))}getHexString(e=Ie){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ft.workingColorSpace){Ft.workingToColorSpace(Mn.copy(this),t);let n=Mn.r,r=Mn.g,i=Mn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Ft.workingColorSpace){return Ft.workingToColorSpace(Mn.copy(this),t),e.r=Mn.r,e.g=Mn.g,e.b=Mn.b,e}getStyle(e=Ie){Ft.workingToColorSpace(Mn.copy(this),e);let t=Mn.r,n=Mn.g,r=Mn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(An);let n=lt(kn.h,An.h,t),r=lt(kn.s,An.s,t),i=lt(kn.l,An.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Mn=new G;G.NAMES=On;var Nn=class extends Tn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pn=new U,Fn=new U,In=new U,Ln=new U,Rn=new U,zn=new U,Bn=new U,Vn=new U,Hn=new U,Un=new U,Wn=new Kt,Gn=new Kt,Kn=new Kt,qn=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pn.subVectors(e,t),r.cross(Pn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Pn.subVectors(r,t),Fn.subVectors(n,t),In.subVectors(e,t);let a=Pn.dot(Pn),o=Pn.dot(Fn),s=Pn.dot(In),c=Fn.dot(Fn),l=Fn.dot(In),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ln)!==null&&Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ln)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ln.x),s.addScaledVector(a,Ln.y),s.addScaledVector(o,Ln.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Wn.setScalar(0),Gn.setScalar(0),Kn.setScalar(0),Wn.fromBufferAttribute(e,t),Gn.fromBufferAttribute(e,n),Kn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Wn,i.x),a.addScaledVector(Gn,i.y),a.addScaledVector(Kn,i.z),a}static isFrontFacing(e,t,n,r){return Pn.subVectors(n,t),Fn.subVectors(e,t),Pn.cross(Fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),Pn.cross(Fn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Rn.subVectors(r,n),zn.subVectors(i,n),Vn.subVectors(e,n);let s=Rn.dot(Vn),c=zn.dot(Vn);if(s<=0&&c<=0)return t.copy(n);Hn.subVectors(e,r);let l=Rn.dot(Hn),u=zn.dot(Hn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Rn,a);Un.subVectors(e,i);let f=Rn.dot(Un),p=zn.dot(Un);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(zn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Bn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Bn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Rn,a).addScaledVector(zn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jn=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Xn):Xn.fromBufferAttribute(r,t),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Zn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Zn.copy(e.boundingBox)),Zn.applyMatrix4(e.matrixWorld),this.union(Zn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),ar.subVectors(this.max,ir),Qn.subVectors(e.a,ir),$n.subVectors(e.b,ir),er.subVectors(e.c,ir),tr.subVectors($n,Qn),nr.subVectors(er,$n),rr.subVectors(Qn,er);let t=[0,-tr.z,tr.y,0,-nr.z,nr.y,0,-rr.z,rr.y,tr.z,0,-tr.x,nr.z,0,-nr.x,rr.z,0,-rr.x,-tr.y,tr.x,0,-nr.y,nr.x,0,-rr.y,rr.x,0];return!cr(t,Qn,$n,er,ar)||(t=[1,0,0,0,1,0,0,0,1],!cr(t,Qn,$n,er,ar))?!1:(or.crossVectors(tr,nr),t=[or.x,or.y,or.z],cr(t,Qn,$n,er,ar))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Yn=[new U,new U,new U,new U,new U,new U,new U,new U],Xn=new U,Zn=new Jn,Qn=new U,$n=new U,er=new U,tr=new U,nr=new U,rr=new U,ir=new U,ar=new U,or=new U,sr=new U;function cr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){sr.fromArray(e,a);let o=i.x*Math.abs(sr.x)+i.y*Math.abs(sr.y)+i.z*Math.abs(sr.z),s=t.dot(sr),c=n.dot(sr),l=r.dot(sr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var lr=ur();function ur(){let e=new ArrayBuffer(4),t=new Float32Array(e),n=new Uint32Array(e),r=new Uint32Array(512),i=new Uint32Array(512);for(let e=0;e<256;++e){let t=e-127;t<-27?(r[e]=0,r[e|256]=32768,i[e]=24,i[e|256]=24):t<-14?(r[e]=1024>>-t-14,r[e|256]=1024>>-t-14|32768,i[e]=-t-1,i[e|256]=-t-1):t<=15?(r[e]=t+15<<10,r[e|256]=t+15<<10|32768,i[e]=13,i[e|256]=13):t<128?(r[e]=31744,r[e|256]=64512,i[e]=24,i[e|256]=24):(r[e]=31744,r[e|256]=64512,i[e]=13,i[e|256]=13)}let a=new Uint32Array(2048),o=new Uint32Array(64),s=new Uint32Array(64);for(let e=1;e<1024;++e){let t=e<<13,n=0;for(;!(t&8388608);)t<<=1,n-=8388608;t&=-8388609,n+=947912704,a[e]=t|n}for(let e=1024;e<2048;++e)a[e]=939524096+(e-1024<<13);for(let e=1;e<31;++e)o[e]=e<<23;o[31]=1199570944,o[32]=2147483648;for(let e=33;e<63;++e)o[e]=2147483648+(e-32<<23);o[63]=3347054592;for(let e=1;e<64;++e)e!==32&&(s[e]=1024);return{floatView:t,uint32View:n,baseTable:r,shiftTable:i,mantissaTable:a,exponentTable:o,offsetTable:s}}function dr(e){Math.abs(e)>65504&&B(`DataUtils.toHalfFloat(): Value out of range.`),e=at(e,-65504,65504),lr.floatView[0]=e;let t=lr.uint32View[0],n=t>>23&511;return lr.baseTable[n]+((t&8388607)>>lr.shiftTable[n])}function fr(e){let t=e>>10;return lr.uint32View[0]=lr.mantissaTable[lr.offsetTable[t]+(e&1023)]+lr.exponentTable[t],lr.floatView[0]}var pr=class{static toHalfFloat(e){return dr(e)}static fromHalfFloat(e){return fr(e)}},mr=new U,hr=new H,gr=0,_r=class extends $e{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:gr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ve,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXY(t,hr.x,hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix3(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyMatrix4(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.applyNormalMatrix(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mr.fromBufferAttribute(this,t),mr.transformDirection(e),this.setXYZ(t,mr.x,mr.y,mr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),r=Tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),n=Tt(n,this.array),r=Tt(r,this.array),i=Tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},vr=class extends _r{constructor(e,t,n){super(new Uint16Array(e),t,n)}},yr=class extends _r{constructor(e,t,n){super(new Uint32Array(e),t,n)}},br=class extends _r{constructor(e,t,n){super(new Float32Array(e),t,n)}},xr=new Jn,Sr=new U,Cr=new U,wr=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?xr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Sr.subVectors(e,this.center);let t=Sr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Sr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Sr.copy(e.center).add(Cr)),this.expandByPoint(Sr.copy(e.center).sub(Cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Tr=0,Er=new Zt,Dr=new Tn,Or=new U,kr=new Jn,Ar=new Jn,jr=new U,Mr=class e extends $e{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tr++}),this.uuid=it(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ue(e)?yr:vr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new At().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Er.makeRotationFromQuaternion(e),this.applyMatrix4(Er),this}rotateX(e){return Er.makeRotationX(e),this.applyMatrix4(Er),this}rotateY(e){return Er.makeRotationY(e),this.applyMatrix4(Er),this}rotateZ(e){return Er.makeRotationZ(e),this.applyMatrix4(Er),this}translate(e,t,n){return Er.makeTranslation(e,t,n),this.applyMatrix4(Er),this}scale(e,t,n){return Er.makeScale(e,t,n),this.applyMatrix4(Er),this}lookAt(e){return Dr.lookAt(e),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new br(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&B(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];kr.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(this.boundingBox.min,kr.min),this.boundingBox.expandByPoint(jr),jr.addVectors(this.boundingBox.max,kr.max),this.boundingBox.expandByPoint(jr)):(this.boundingBox.expandByPoint(kr.min),this.boundingBox.expandByPoint(kr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&V(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){V(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(kr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ar.setFromBufferAttribute(n),this.morphTargetsRelative?(jr.addVectors(kr.min,Ar.min),kr.expandByPoint(jr),jr.addVectors(kr.max,Ar.max),kr.expandByPoint(jr)):(kr.expandByPoint(Ar.min),kr.expandByPoint(Ar.max))}kr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)jr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(jr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)jr.fromBufferAttribute(a,t),o&&(Or.fromBufferAttribute(e,t),jr.add(Or)),r=Math.max(r,n.distanceToSquared(jr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&V(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){V(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new _r(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new _r(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jr.fromBufferAttribute(e,t),jr.normalize(),e.setXYZ(t,jr.x,jr.y,jr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new _r(a,r,i)}if(this.index===null)return B(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Nr=new U,Pr=new U,Fr=new At,Ir=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Nr.subVectors(n,t).cross(Pr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Nr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fr.getNormalMatrix(e),r=this.coplanarPoint(Nr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lr=0,Rr=class extends $e{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=it(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new G(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Be,this.stencilZFail=Be,this.stencilZPass=Be,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){B(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){B(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new G().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ir().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},zr=new U,Br=new U,Vr=new U,Hr=new U,Ur=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=zr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zr.copy(this.origin).addScaledVector(this.direction,t),zr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Br.copy(e).add(t).multiplyScalar(.5),Vr.copy(t).sub(e).normalize(),Hr.copy(this.origin).sub(Br);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Vr),o=Hr.dot(this.direction),s=-Hr.dot(Vr),c=Hr.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Br).addScaledVector(Vr,d),f}intersectSphere(e,t){if(e.radius<0)return null;zr.subVectors(e.center,this.origin);let n=zr.dot(this.direction),r=zr.dot(zr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,zr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,ee=C/w,F=1/w,te=T-P*D,I=E-ee*D,ne=O-P*A,re=k-ee*A,ie=j-P*N,ae=M-ee*N,oe=ie*re-ae*ne,L=te*ae-I*ie,se=ne*I-re*te;if(r){if(oe<0||L<0||se<0)return null}else if((oe<0||L<0||se<0)&&(oe>0||L>0||se>0))return null;let ce=oe+L+se;if(ce===0)return null;let le=F*(oe*D+L*A+se*N);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Wr=class extends Rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Gr=new Zt,Kr=new Ur,qr=new wr,Jr=new U,Yr=new U,Xr=new U,Zr=new U,Qr=new U,$r=new U,ei=new U,ti=new U,K=class extends Tn{constructor(e=new Mr,t=new Wr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){$r.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Qr.fromBufferAttribute(s,e),a?$r.addScaledVector(Qr,r):$r.addScaledVector(Qr.sub(t),r))}t.add($r)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(i),Kr.copy(e.ray).recast(e.near),!(qr.containsPoint(Kr.origin)===!1&&(Kr.intersectSphere(qr,Jr)===null||Kr.origin.distanceToSquared(Jr)>(e.far-e.near)**2))&&(Gr.copy(i).invert(),Kr.copy(e.ray).applyMatrix4(Gr),(n.boundingBox===null||Kr.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Kr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ri(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ri(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ri(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ri(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function ni(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ti.copy(s),ti.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ti);return l<n.near||l>n.far?null:{distance:l,point:ti.clone(),object:e}}function ri(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Yr),e.getVertexPosition(c,Xr),e.getVertexPosition(l,Zr);let u=ni(e,t,n,r,Yr,Xr,Zr,ei);if(u){let e=new U;qn.getBarycoord(ei,Yr,Xr,Zr,e),i&&(u.uv=qn.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=qn.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=qn.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};qn.getNormal(Yr,Xr,Zr,t.normal),u.face=t,u.barycoord=e}return u}var ii=class extends Gt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ai=class extends _r{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},oi=new Zt,si=new Zt,ci=[],li=new Jn,ui=new Zt,di=new K,fi=new wr,pi=class extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ui)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oi),li.copy(e.boundingBox).applyMatrix4(oi),this.boundingBox.union(li)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new wr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oi),fi.copy(e.boundingSphere).applyMatrix4(oi),this.boundingSphere.union(fi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(di.geometry=this.geometry,di.material=this.material,di.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fi.copy(this.boundingSphere),fi.applyMatrix4(n),e.ray.intersectsSphere(fi)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,oi),si.multiplyMatrices(n,oi),di.matrixWorld=si,di.raycast(e,ci);for(let e=0,n=ci.length;e<n;e++){let n=ci[e];n.instanceId=i,n.object=this,t.push(n)}ci.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ii(new Float32Array(r*this.count),r,this.count,D,h));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},mi=new wr,hi=new H(.5,.5),gi=new U,_i=class{constructor(e=new Ir,t=new Ir,n=new Ir,r=new Ir,i=new Ir,a=new Ir){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=He,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){return mi.center.set(0,0,0),mi.radius=.7071067811865476+hi.distanceTo(e.center),mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(gi.x=r.normal.x>0?e.max.x:e.min.x,gi.y=r.normal.y>0?e.max.y:e.min.y,gi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},vi=class extends Rr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new G(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},yi=new U,bi=new U,xi=new Zt,Si=new Ur,Ci=new wr,wi=new U,Ti=new U,Ei=class extends Tn{constructor(e=new Mr,t=new vi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)yi.fromBufferAttribute(t,e-1),bi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=yi.distanceTo(bi);e.setAttribute(`lineDistance`,new br(n,1))}else B(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ci.copy(n.boundingSphere),Ci.applyMatrix4(r),Ci.radius+=i,e.ray.intersectsSphere(Ci)===!1)return;xi.copy(r).invert(),Si.copy(e.ray).applyMatrix4(xi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Di(this,e,Si,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Di(this,e,Si,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Di(this,e,Si,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Di(this,e,Si,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Di(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(yi.fromBufferAttribute(s,i),bi.fromBufferAttribute(s,a),n.distanceSqToSegment(yi,bi,wi,Ti)>r)return;wi.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(wi);if(!(c<t.near||c>t.far))return{distance:c,point:Ti.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Oi=new U,ki=new U,Ai=class extends Ei{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Oi.fromBufferAttribute(t,e),ki.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Oi.distanceTo(ki);e.setAttribute(`lineDistance`,new br(n,1))}else B(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},ji=class extends Rr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new G(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mi=new Zt,Ni=new Ur,Pi=new wr,Fi=new U,Ii=class extends Tn{constructor(e=new Mr,t=new ji){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pi.copy(n.boundingSphere),Pi.applyMatrix4(r),Pi.radius+=i,e.ray.intersectsSphere(Pi)===!1)return;Mi.copy(r).invert(),Ni.copy(e.ray).applyMatrix4(Mi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Fi.fromBufferAttribute(l,n),Li(Fi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Fi.fromBufferAttribute(l,a),Li(Fi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Li(e,t,n,r,i,a,o){let s=Ni.distanceSqToPoint(e);if(s<n){let n=new U;Ni.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ri=class extends Gt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zi=class extends Gt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bi=class extends Gt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Vt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vi=class extends Bi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hi=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ui=class e extends Mr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new br(c,3)),this.setAttribute(`normal`,new br(l,3)),this.setAttribute(`uv`,new br(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Wi=class e extends Mr{constructor(e=1,t=1,n=4,r=8,i=1){super(),this.type=`CapsuleGeometry`,this.parameters={radius:e,height:t,capSegments:n,radialSegments:r,heightSegments:i},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),r=Math.max(3,Math.floor(r)),i=Math.max(1,Math.floor(i));let a=[],o=[],s=[],c=[],l=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+i,m=r+1,h=new U,g=new U;for(let _=0;_<=p;_++){let v=0,y=0,b=0,x=0;if(_<=n){let t=_/n,r=t*Math.PI/2;y=-l-e*Math.cos(r),b=e*Math.sin(r),x=-e*Math.cos(r),v=t*u}else if(_<=n+i){let r=(_-n)/i;y=-l+r*t,b=e,x=0,v=u+r*d}else{let t=(_-n-i)/n,r=t*Math.PI/2;y=l+e*Math.sin(r),b=e*Math.cos(r),x=e*Math.sin(r),v=u+d+t*u}let S=Math.max(0,Math.min(1,v/f)),C=0;_===0?C=.5/r:_===p&&(C=-.5/r);for(let e=0;e<=r;e++){let t=e/r,n=t*Math.PI*2,i=Math.sin(n),a=Math.cos(n);g.x=-b*a,g.y=y,g.z=b*i,o.push(g.x,g.y,g.z),h.set(-b*a,x,b*i),h.normalize(),s.push(h.x,h.y,h.z),c.push(t+C,S)}if(_>0){let e=(_-1)*m;for(let t=0;t<r;t++){let n=e+t,r=e+t+1,i=_*m+t,o=_*m+t+1;a.push(n,r,i),a.push(r,o,i)}}}this.setIndex(a),this.setAttribute(`position`,new br(o,3)),this.setAttribute(`normal`,new br(s,3)),this.setAttribute(`uv`,new br(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Gi=class e extends Mr{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new br(a,3)),this.setAttribute(`normal`,new br(o,3)),this.setAttribute(`uv`,new br(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},q=class e extends Mr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new br(u,3)),this.setAttribute(`normal`,new br(d,3)),this.setAttribute(`uv`,new br(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ki=class e extends q{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qi=class e extends Mr{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new br(i,3)),this.setAttribute(`normal`,new br(i.slice(),3)),this.setAttribute(`uv`,new br(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new U,r=new U,i=new U;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new U;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new U;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new U,t=new U,n=new U,r=new U,o=new H,s=new H,c=new H;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ji=new U,Yi=new U,Xi=new U,Zi=new qn,Qi=class extends Mr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=1e4,r=Math.cos(nt*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=Zi;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),Zi.getNormal(Xi),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,l[0]!==l[1]&&l[1]!==l[2]&&l[2]!==l[0])for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=Zi[c[e]],o=Zi[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(Xi.dot(u[p].normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:Xi.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];Ji.fromBufferAttribute(a,t),Yi.fromBufferAttribute(a,n),d.push(Ji.x,Ji.y,Ji.z),d.push(Yi.x,Yi.y,Yi.z)}this.setAttribute(`position`,new br(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},$i=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){B(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new H:new U);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new U,r=[],i=[],a=[],o=new U,s=new Zt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new U)}i[0]=new U,a[0]=new U;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(at(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(at(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},ea=class extends $i{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new H){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ta=class extends ea{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function na(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var ra=new U,ia=new U,aa=new na,oa=new na,sa=new na,ca=class extends $i{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new U){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(ia.subVectors(r[0],r[1]).add(r[0]),c=ia);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(ra.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=ra),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),aa.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),oa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),sa.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(aa.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),oa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),sa.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(aa.calc(s),oa.calc(s),sa.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function la(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function ua(e,t){let n=1-e;return n*n*t}function da(e,t){return 2*(1-e)*e*t}function fa(e,t){return e*e*t}function pa(e,t,n,r){return ua(e,t)+da(e,n)+fa(e,r)}function ma(e,t){let n=1-e;return n*n*n*t}function ha(e,t){let n=1-e;return 3*n*n*e*t}function ga(e,t){return 3*(1-e)*e*e*t}function _a(e,t){return e*e*e*t}function va(e,t,n,r,i){return ma(e,t)+ha(e,n)+ga(e,r)+_a(e,i)}var ya=class extends $i{constructor(e=new H,t=new H,n=new H,r=new H){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(va(e,r.x,i.x,a.x,o.x),va(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ba=class extends $i{constructor(e=new U,t=new U,n=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(va(e,r.x,i.x,a.x,o.x),va(e,r.y,i.y,a.y,o.y),va(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},xa=class extends $i{constructor(e=new H,t=new H){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new H){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new H){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sa=class extends $i{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new U){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ca=class extends $i{constructor(e=new H,t=new H,n=new H){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new H){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(pa(e,r.x,i.x,a.x),pa(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends $i{constructor(e=new U,t=new U,n=new U){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new U){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(pa(e,r.x,i.x,a.x),pa(e,r.y,i.y,a.y),pa(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=Object.freeze({__proto__:null,ArcCurve:ta,CatmullRomCurve3:ca,CubicBezierCurve:ya,CubicBezierCurve3:ba,EllipseCurve:ea,LineCurve:xa,LineCurve3:Sa,QuadraticBezierCurve:Ca,QuadraticBezierCurve3:wa,SplineCurve:class extends $i{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new H){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(la(o,s.x,c.x,l.x,u.x),la(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new H().fromArray(n))}return this}}}),Ea=class e extends qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Da=class e extends Mr{constructor(e=[new H(0,-.5),new H(.5,0),new H(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=at(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new U,d=new H,f=new U,p=new U,m=new U,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new br(a,3)),this.setAttribute(`uv`,new br(o,2)),this.setAttribute(`normal`,new br(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Oa=class e extends Mr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new br(p,3)),this.setAttribute(`normal`,new br(m,3)),this.setAttribute(`uv`,new br(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ka=class e extends Mr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new br(p,3)),this.setAttribute(`normal`,new br(m,3)),this.setAttribute(`uv`,new br(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Aa=class e extends Mr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new br(c,3)),this.setAttribute(`normal`,new br(l,3)),this.setAttribute(`uv`,new br(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},ja=class e extends Mr{constructor(e=new wa(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new U,s=new U,c=new H,l=new U,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new br(u,3)),this.setAttribute(`normal`,new br(d,3)),this.setAttribute(`uv`,new br(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Ta[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Ma(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Pa(i))i.isRenderTargetTexture?(B(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Pa(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Na(e){let t={};for(let n=0;n<e.length;n++){let r=Ma(e[n]);for(let e in r)t[e]=r[e]}return t}function Pa(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Fa(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ia(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ft.workingColorSpace}var La={clone:Ma,merge:Na},Ra=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,za=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ba=class extends Rr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ra,this.fragmentShader=za,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ma(e.uniforms),this.uniformsGroups=Fa(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new G().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Kt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new At().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Zt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Va=class extends Ba{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},J=class extends Rr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new G(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ha=class extends J{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return at(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new G(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new G(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new G(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ua=class extends Rr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new G(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new G(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Wa=class extends Rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Fe,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ga=class extends Rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ka(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function qa(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Ja=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Ya=class extends Ja{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ne,endingEnd:Ne}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case z:i=e,o=2*t-n;break;case Pe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case z:a=e,s=2*n-t;break;case Pe:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Xa=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Za=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Qa=class extends Ja{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=to(n,t,g,y,r);i[p]=$a(x,o,_,b,m)}return i}};function $a(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function eo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function to(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=$a(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=eo(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var no=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ka(t,this.TimeBufferType),this.values=Ka(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ka(e.times,Array),values:Ka(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),qa(e.settings)&&(n.settings={inTangents:Ka(e.settings.inTangents,Array),outTangents:Ka(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Za(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ya(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Qa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ae:t=this.InterpolantFactoryMethodDiscrete;break;case R:t=this.InterpolantFactoryMethodLinear;break;case je:t=this.InterpolantFactoryMethodSmooth;break;case Me:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return B(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ae;case this.InterpolantFactoryMethodLinear:return R;case this.InterpolantFactoryMethodSmooth:return je;case this.InterpolantFactoryMethodBezier:return Me}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;qa(this.settings)&&(ro(this.settings.inTangents,e),ro(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(V(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(V(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){V(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){V(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&We(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){V(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===je,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,qa(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function ro(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}no.prototype.ValueTypeName=``,no.prototype.TimeBufferType=Float32Array,no.prototype.ValueBufferType=Float32Array,no.prototype.DefaultInterpolation=R;var io=class extends no{constructor(e,t,n){super(e,t,n)}};io.prototype.ValueTypeName=`bool`,io.prototype.ValueBufferType=Array,io.prototype.DefaultInterpolation=Ae,io.prototype.InterpolantFactoryMethodLinear=void 0,io.prototype.InterpolantFactoryMethodSmooth=void 0;var ao=class extends no{constructor(e,t,n,r){super(e,t,n,r)}};ao.prototype.ValueTypeName=`color`;var oo=class extends no{constructor(e,t,n,r){super(e,t,n,r)}};oo.prototype.ValueTypeName=`number`;var so=class extends Ja{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Dt.slerpFlat(i,0,a,c-o,a,c,s);return i}},co=class extends no{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new so(this.times,this.values,this.getValueSize(),e)}};co.prototype.ValueTypeName=`quaternion`,co.prototype.InterpolantFactoryMethodSmooth=void 0;var lo=class extends no{constructor(e,t,n){super(e,t,n)}};lo.prototype.ValueTypeName=`string`,lo.prototype.ValueBufferType=Array,lo.prototype.DefaultInterpolation=Ae,lo.prototype.InterpolantFactoryMethodLinear=void 0,lo.prototype.InterpolantFactoryMethodSmooth=void 0;var uo=class extends no{constructor(e,t,n,r){super(e,t,n,r)}};uo.prototype.ValueTypeName=`vector`;var fo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(po(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!po(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function po(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var mo=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},ho=class{constructor(e){this.manager=e===void 0?mo:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ho.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var go=new WeakMap,_o=class extends ho{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=fo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=go.get(a);e===void 0&&(e=[],go.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Ge(`img`);function s(){l(),t&&t(this);let n=go.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}go.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),fo.remove(`image:${e}`);let n=go.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}go.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),fo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},vo=class extends ho{constructor(e){super(e)}load(e,t,n,r){let i=new Gt,a=new _o(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},yo=class extends Tn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new G(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},bo=class extends yo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new G(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},xo=new Zt,So=new U,Co=new U,wo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _i,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;So.setFromMatrixPosition(e.matrixWorld),t.position.copy(So),Co.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Co),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){xo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(xo,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},To=new U,Eo=new Dt,Do=new U,Oo=class extends Tn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=He,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(To,Eo,Do),Do.x===1&&Do.y===1&&Do.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Eo,Do.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(To,Eo,Do),Do.x===1&&Do.y===1&&Do.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(To,Eo,Do.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ko=new U,Ao=new H,jo=new H,Mo=class extends Oo{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=rt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(nt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rt*2*Math.atan(Math.tan(nt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ko.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ko.x,ko.y).multiplyScalar(-e/ko.z),ko.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ko.x,ko.y).multiplyScalar(-e/ko.z)}getViewSize(e,t){return this.getViewBounds(e,Ao,jo),t.subVectors(jo,Ao)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(nt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},No=class extends wo{constructor(){super(new Mo(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=rt*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Po=class extends yo{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.target=new Tn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new No}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Fo=class extends wo{constructor(){super(new Mo(90,1,.5,500)),this.isPointLightShadow=!0}},Io=class extends yo{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Fo}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Lo=class extends Oo{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ro=class extends wo{constructor(){super(new Lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},zo=class extends yo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Tn.DEFAULT_UP),this.updateMatrix(),this.target=new Tn,this.shadow=new Ro}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Bo=-90,Vo=1,Ho=class extends Tn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Mo(Bo,Vo,e,t);r.layers=this.layers,this.add(r);let i=new Mo(Bo,Vo,e,t);i.layers=this.layers,this.add(i);let a=new Mo(Bo,Vo,e,t);a.layers=this.layers,this.add(a);let o=new Mo(Bo,Vo,e,t);o.layers=this.layers,this.add(o);let s=new Mo(Bo,Vo,e,t);s.layers=this.layers,this.add(s);let c=new Mo(Bo,Vo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Uo=class extends Mo{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Wo=`\\[\\]\\.:\\/`,Go=RegExp(`[\\[\\]\\.:\\/]`,`g`),Ko=`[^\\[\\]\\.:\\/]`,qo=`[^`+Wo.replace(`\\.`,``)+`]`,Jo=`((?:WC+[\\/:])*)`.replace(`WC`,Ko),Yo=`(WCOD+)?`.replace(`WCOD`,qo),Xo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Ko),Zo=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Ko),Qo=RegExp(`^`+Jo+Yo+Xo+Zo+`$`),$o=[`material`,`materials`,`bones`,`map`],es=class{constructor(e,t,n){let r=n||ts.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ts=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Go,``)}static parseTrackName(e){let t=Qo.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);$o.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){B(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){V(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){V(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){V(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){V(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){V(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){V(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;V(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){V(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ts.Composite=es,ts.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ts.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ts.prototype.GetterByBindingType=[ts.prototype._getValue_direct,ts.prototype._getValue_array,ts.prototype._getValue_arrayElement,ts.prototype._getValue_toArray],ts.prototype.SetterByBindingTypeAndVersioning=[[ts.prototype._setValue_direct,ts.prototype._setValue_direct_setNeedsUpdate,ts.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_array,ts.prototype._setValue_array_setNeedsUpdate,ts.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_arrayElement,ts.prototype._setValue_arrayElement_setNeedsUpdate,ts.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ts.prototype._setValue_fromArray,ts.prototype._setValue_fromArray_setNeedsUpdate,ts.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ns=new Zt,rs=class{constructor(e,t,n=0,r=1/0){this.ray=new Ur(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ln,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):V(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return ns.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ns),this}intersectObject(e,t=!0,n=[]){return as(e,this,n,t),n.sort(is),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)as(e[r],this,n,t);return n.sort(is),n}};function is(e,t){return e.distance-t.distance}function as(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)as(r[e],t,n,!0)}}var os=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,B(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function ss(e,t,n,r){let i=cs(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case O:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case j:return e*t*4/i.components*i.byteLength;case M:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case P:case ee:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case te:case ne:return Math.max(e,16)*Math.max(t,8)/4;case F:case I:return Math.max(e,8)*Math.max(t,8)/2;case re:case ie:case oe:case L:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ae:case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function cs(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?B(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ls(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function us(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ds={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Y={common:{diffuse:{value:new G(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new At}},envmap:{envMap:{value:null},envMapRotation:{value:new At},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new At}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new At}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new At},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new At},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new At},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new At}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new At}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new At}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new G(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new G(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0},uvTransform:{value:new At}},sprite:{diffuse:{value:new G(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new At},alphaMap:{value:null},alphaMapTransform:{value:new At},alphaTest:{value:0}}},fs={basic:{uniforms:Na([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.fog]),vertexShader:ds.meshbasic_vert,fragmentShader:ds.meshbasic_frag},lambert:{uniforms:Na([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new G(0)},envMapIntensity:{value:1}}]),vertexShader:ds.meshlambert_vert,fragmentShader:ds.meshlambert_frag},phong:{uniforms:Na([Y.common,Y.specularmap,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,Y.lights,{emissive:{value:new G(0)},specular:{value:new G(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ds.meshphong_vert,fragmentShader:ds.meshphong_frag},standard:{uniforms:Na([Y.common,Y.envmap,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.roughnessmap,Y.metalnessmap,Y.fog,Y.lights,{emissive:{value:new G(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ds.meshphysical_vert,fragmentShader:ds.meshphysical_frag},toon:{uniforms:Na([Y.common,Y.aomap,Y.lightmap,Y.emissivemap,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.gradientmap,Y.fog,Y.lights,{emissive:{value:new G(0)}}]),vertexShader:ds.meshtoon_vert,fragmentShader:ds.meshtoon_frag},matcap:{uniforms:Na([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,Y.fog,{matcap:{value:null}}]),vertexShader:ds.meshmatcap_vert,fragmentShader:ds.meshmatcap_frag},points:{uniforms:Na([Y.points,Y.fog]),vertexShader:ds.points_vert,fragmentShader:ds.points_frag},dashed:{uniforms:Na([Y.common,Y.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ds.linedashed_vert,fragmentShader:ds.linedashed_frag},depth:{uniforms:Na([Y.common,Y.displacementmap]),vertexShader:ds.depth_vert,fragmentShader:ds.depth_frag},normal:{uniforms:Na([Y.common,Y.bumpmap,Y.normalmap,Y.displacementmap,{opacity:{value:1}}]),vertexShader:ds.meshnormal_vert,fragmentShader:ds.meshnormal_frag},sprite:{uniforms:Na([Y.sprite,Y.fog]),vertexShader:ds.sprite_vert,fragmentShader:ds.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ds.background_vert,fragmentShader:ds.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new At}},vertexShader:ds.backgroundCube_vert,fragmentShader:ds.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ds.cube_vert,fragmentShader:ds.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ds.equirect_vert,fragmentShader:ds.equirect_frag},distance:{uniforms:Na([Y.common,Y.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ds.distance_vert,fragmentShader:ds.distance_frag},shadow:{uniforms:Na([Y.lights,Y.fog,{color:{value:new G(0)},opacity:{value:1}}]),vertexShader:ds.shadow_vert,fragmentShader:ds.shadow_frag}};fs.physical={uniforms:Na([fs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new At},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new At},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new At},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new At},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new At},sheen:{value:0},sheenColor:{value:new G(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new At},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new At},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new At},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new At},attenuationDistance:{value:0},attenuationColor:{value:new G(0)},specularColor:{value:new G(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new At},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new At},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new At}}]),vertexShader:ds.meshphysical_vert,fragmentShader:ds.meshphysical_frag};var ps={r:0,b:0,g:0},ms=new Zt,hs=new At;hs.set(-1,0,0,0,1,0,0,0,1);function gs(e,t,n,r,i,a){let o=new G(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new K(new Ui(1,1,1),new Ba({name:`BackgroundCubeMaterial`,uniforms:Ma(fs.backgroundCube.uniforms),vertexShader:fs.backgroundCube.vertexShader,fragmentShader:fs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(ms.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hs),l.material.toneMapped=Ft.getTransfer(i.colorSpace)!==ze,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new K(new Oa(2,2),new Ba({name:`BackgroundMaterial`,uniforms:Ma(fs.background.uniforms),vertexShader:fs.background.vertexShader,fragmentShader:fs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Ft.getTransfer(i.colorSpace)!==ze,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(ps,Ia(e)),n.buffers.color.setClear(ps.r,ps.g,ps.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function _s(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function vs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function ys(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(B(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&B(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function bs(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ir,s=new At,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var xs=4,Ss=6,Cs=20,ws=256,Ts=new Lo,Es=new G,Ds=null,Os=0,ks=0,As=!1,js=new U,Ms=new U,Ns=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=js}=i;Ds=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),As=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zs(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ds,Os,ks),this._renderer.xr.enabled=As,e.scissorTest=!1,Is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ds=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),As=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Le,depthBuffer:!1},r=Fs(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fs(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ps(r)),this._blurMaterial=Rs(r,e,t),this._ggxMaterial=Ls(r,e,t)}return r}_compileMaterial(e){let t=new K(new Mr,e);this._renderer.compile(t,Ts)}_sceneToCubeUV(e,t,n,r,i){let a=new Mo(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Es),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new K(new Ui,new Wr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Es),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Is(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zs());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Is(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Ts)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-xs?n-d+xs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Is(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Ts),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Is(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Ts)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Is(t,3*l*(r>this._lodMax-xs?r-this._lodMax+xs:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Ts)}};function Ps(e){let t=[],n=[],r=e,i=e-xs+1+Ss;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ms.set(1,r,n):e===1?Ms.set(-n,1,-r):e===2?Ms.set(-n,r,1):e===3?Ms.set(-1,r,-n):e===4?Ms.set(-n,-1,r):Ms.set(n,r,-1),Ms.toArray(l,(e*6+t)*3)}}let u=new Mr;u.setAttribute(`position`,new _r(c,3)),u.setAttribute(`outputDirection`,new _r(l,3)),n.push(new K(u,null)),r>xs&&r--}return{lodMeshes:n,sizeLods:t}}function Fs(e,t,n){let r=new Jt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Is(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ls(e,t,n){return new Ba({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Rs(e,t,n){return new Ba({name:`SphericalGaussianBlur`,defines:{SAMPLES:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Vs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function zs(){return new Ba({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Bs(){return new Ba({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Vs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Hs=class extends Jt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ui(5,5,5),i=new Ba({name:`CubemapFromEquirect`,uniforms:Ma(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new K(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Ho(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Us(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Hs(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ns(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ns(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Ws(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Xe(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Gs(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?yr:vr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Ks(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function qs(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Js(e,t,n){let r=new WeakMap,i=new Kt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Yt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new H(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Ys(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Xs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Zs(e,t,n,r,i,a){let o=new Jt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Mr;l.setAttribute(`position`,new br([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new br([0,2,0,0,2,0],2));let u=new Va({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new K(l,u),f=new Lo(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Jt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Jt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Ft.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Xs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Qs=new Gt,$s=new Bi(1,1),ec=new Yt,tc=new Xt,nc=new Ri,rc=[],ic=[],ac=new Float32Array(16),oc=new Float32Array(9),sc=new Float32Array(4);function cc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=rc[i];if(a===void 0&&(a=new Float32Array(i),rc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function lc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function uc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function dc(e,t){let n=ic[t];n===void 0&&(n=new Int32Array(t),ic[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function fc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function pc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2fv(this.addr,t),uc(n,t)}}function mc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(lc(n,t))return;e.uniform3fv(this.addr,t),uc(n,t)}}function hc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4fv(this.addr,t),uc(n,t)}}function gc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;sc.set(r),e.uniformMatrix2fv(this.addr,!1,sc),uc(n,r)}}function _c(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;oc.set(r),e.uniformMatrix3fv(this.addr,!1,oc),uc(n,r)}}function vc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(lc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),uc(n,t)}else{if(lc(n,r))return;ac.set(r),e.uniformMatrix4fv(this.addr,!1,ac),uc(n,r)}}function yc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2iv(this.addr,t),uc(n,t)}}function xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(lc(n,t))return;e.uniform3iv(this.addr,t),uc(n,t)}}function Sc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4iv(this.addr,t),uc(n,t)}}function Cc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(lc(n,t))return;e.uniform2uiv(this.addr,t),uc(n,t)}}function Tc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(lc(n,t))return;e.uniform3uiv(this.addr,t),uc(n,t)}}function Ec(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(lc(n,t))return;e.uniform4uiv(this.addr,t),uc(n,t)}}function Dc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?($s.compareFunction=n.isReversedDepthBuffer()?518:515,a=$s):a=Qs,n.setTexture2D(t||a,i)}function Oc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||tc,i)}function kc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||nc,i)}function Ac(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ec,i)}function jc(e){switch(e){case 5126:return fc;case 35664:return pc;case 35665:return mc;case 35666:return hc;case 35674:return gc;case 35675:return _c;case 35676:return vc;case 5124:case 35670:return yc;case 35667:case 35671:return bc;case 35668:case 35672:return xc;case 35669:case 35673:return Sc;case 5125:return Cc;case 36294:return wc;case 36295:return Tc;case 36296:return Ec;case 35678:case 36198:case 36298:case 36306:case 35682:return Dc;case 35679:case 36299:case 36307:return Oc;case 35680:case 36300:case 36308:case 36293:return kc;case 36289:case 36303:case 36311:case 36292:return Ac}}function Mc(e,t){e.uniform1fv(this.addr,t)}function Nc(e,t){let n=cc(t,this.size,2);e.uniform2fv(this.addr,n)}function Pc(e,t){let n=cc(t,this.size,3);e.uniform3fv(this.addr,n)}function Fc(e,t){let n=cc(t,this.size,4);e.uniform4fv(this.addr,n)}function Ic(e,t){let n=cc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Lc(e,t){let n=cc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Rc(e,t){let n=cc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function zc(e,t){e.uniform1iv(this.addr,t)}function Bc(e,t){e.uniform2iv(this.addr,t)}function Vc(e,t){e.uniform3iv(this.addr,t)}function Hc(e,t){e.uniform4iv(this.addr,t)}function Uc(e,t){e.uniform1uiv(this.addr,t)}function Wc(e,t){e.uniform2uiv(this.addr,t)}function Gc(e,t){e.uniform3uiv(this.addr,t)}function Kc(e,t){e.uniform4uiv(this.addr,t)}function qc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?$s:Qs;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Jc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||tc,a[e])}function Yc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||nc,a[e])}function Xc(e,t,n){let r=this.cache,i=t.length,a=dc(n,i);lc(r,a)||(e.uniform1iv(this.addr,a),uc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ec,a[e])}function Zc(e){switch(e){case 5126:return Mc;case 35664:return Nc;case 35665:return Pc;case 35666:return Fc;case 35674:return Ic;case 35675:return Lc;case 35676:return Rc;case 5124:case 35670:return zc;case 35667:case 35671:return Bc;case 35668:case 35672:return Vc;case 35669:case 35673:return Hc;case 5125:return Uc;case 36294:return Wc;case 36295:return Gc;case 36296:return Kc;case 35678:case 36198:case 36298:case 36306:case 35682:return qc;case 35679:case 36299:case 36307:return Jc;case 35680:case 36300:case 36308:case 36293:return Yc;case 36289:case 36303:case 36311:case 36292:return Xc}}var Qc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jc(t.type)}},$c=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zc(t.type)}},el=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},tl=/(\w+)(\])?(\[|\.)?/g;function nl(e,t){e.seq.push(t),e.map[t.id]=t}function rl(e,t,n){let r=e.name,i=r.length;for(tl.lastIndex=0;;){let a=tl.exec(r),o=tl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){nl(n,l===void 0?new Qc(s,e,t):new $c(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new el(s),nl(n,e)),n=e}}}var il=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);rl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function al(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ol=37297,sl=0;function cl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var ll=new At;function ul(e){Ft._getMatrix(ll,Ft.workingColorSpace,e);let t=`mat3( ${ll.elements.map(e=>e.toFixed(4))} )`;switch(Ft.getTransfer(e)){case Re:return[t,`LinearTransferOETF`];case ze:return[t,`sRGBTransferOETF`];default:return B(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function dl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+cl(e.getShaderSource(t),r)}return i}function fl(e,t){let n=ul(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var pl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function ml(e,t){let n=pl[t];return n===void 0?(B(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var hl=new U;function gl(){return Ft.getLuminanceCoefficients(hl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${hl.x.toFixed(4)}, ${hl.y.toFixed(4)}, ${hl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function _l(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(bl).join(`
`)}function vl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function yl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function bl(e){return e!==``}function xl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cl=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(e){return e.replace(Cl,El)}var Tl=new Map;function El(e,t){let n=ds[t];if(n===void 0){let e=Tl.get(t);if(e!==void 0)n=ds[e],B(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return wl(n)}var Dl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ol(e){return e.replace(Dl,kl)}function kl(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Al(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var jl={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ml(e){return jl[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Nl={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Pl(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Nl[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Fl={302:`ENVMAP_MODE_REFRACTION`};function Il(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Fl[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Ll={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Rl(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Ll[e.combine]||`ENVMAP_BLENDING_NONE`}function zl(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Bl(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ml(n),l=Pl(n),u=Il(n),d=Rl(n),f=zl(n),p=_l(n),m=vl(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(bl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(bl).join(`
`),_.length>0&&(_+=`
`)):(g=[Al(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(bl).join(`
`),_=[Al(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ds.tonemapping_pars_fragment,n.toneMapping===0?``:ml(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ds.colorspace_pars_fragment,fl(`linearToOutputTexel`,n.outputColorSpace),gl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(bl).join(`
`)),o=wl(o),o=xl(o,n),o=Sl(o,n),s=wl(s),s=xl(s,n),s=Sl(s,n),o=Ol(o),s=Ol(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=al(i,i.VERTEX_SHADER,y),S=al(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=dl(i,x,`vertex`),n=dl(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):B(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new il(i,h),T=yl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ol)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=sl++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Vl=0,Hl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Ul(e),t.set(e,n)),n}},Ul=class{constructor(e){this.id=Vl++,this.code=e,this.usedTimes=0}};function Wl(e){return e===1030||e===37490||e===36285}function Gl(e,t,n,r,i,a){let o=new ln,s=new Hl,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&B(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=fs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,ee=!!i.map,F=!!i.matcap,te=!!x,I=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,L=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.retroreflectivity>0,fe=i.iridescence>0,pe=i.sheen>0,me=i.transmission>0,he=ce&&!!i.anisotropyMap,ge=le&&!!i.clearcoatMap,_e=le&&!!i.clearcoatNormalMap,ve=le&&!!i.clearcoatRoughnessMap,ye=fe&&!!i.iridescenceMap,be=fe&&!!i.iridescenceThicknessMap,xe=pe&&!!i.sheenColorMap,Se=pe&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,we=!!i.specularColorMap,Te=!!i.specularIntensityMap,Ee=me&&!!i.transmissionMap,De=me&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,Ae=i.alphaTest>0,R=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ft.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ee,matcap:F,envMap:te,envMapMode:te&&x.mapping,envMapCubeUVHeight:S,aoMap:I,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&Wl(i.normalMap.format),metalnessMap:L,roughnessMap:se,anisotropy:ce,anisotropyMap:he,clearcoat:le,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:ue,retroreflection:de,iridescence:fe,iridescenceMap:ye,iridescenceThicknessMap:be,sheen:pe,sheenColorMap:xe,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:we,specularIntensityMap:Te,transmission:me,transmissionMap:Ee,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:Ae,alphaHash:R,combine:i.combine,mapUv:ee&&m(i.map.channel),aoMapUv:I&&m(i.aoMap.channel),lightMapUv:ne&&m(i.lightMap.channel),bumpMapUv:re&&m(i.bumpMap.channel),normalMapUv:ie&&m(i.normalMap.channel),displacementMapUv:ae&&m(i.displacementMap.channel),emissiveMapUv:oe&&m(i.emissiveMap.channel),metalnessMapUv:L&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:ge&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Se&&m(i.sheenRoughnessMap.channel),specularMapUv:Ce&&m(i.specularMap.channel),specularColorMapUv:we&&m(i.specularColorMap.channel),specularIntensityMapUv:Te&&m(i.specularIntensityMap.channel),transmissionMapUv:Ee&&m(i.transmissionMap.channel),thicknessMapUv:De&&m(i.thicknessMap.channel),alphaMapUv:ke&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ie||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ee||ke),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:ee&&i.map.isVideoTexture===!0&&Ft.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Ft.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=fs[t];n=La.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Bl(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Kl(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ql(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Jl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Yl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ql),r.length>1&&r.sort(t||Jl),i.length>1&&i.sort(t||Jl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Xl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Yl,e.set(t,[i])):n>=r.length?(i=new Yl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Zl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new U,color:new G};break;case`SpotLight`:n={position:new U,direction:new U,color:new G,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new G,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new G,groundColor:new G};break;case`RectAreaLight`:n={color:new G,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Ql(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var $l=0;function eu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function tu(e){let t=new Zl,n=Ql(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new Zt,o=new Zt;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(eu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Y.LTC_FLOAT_1,r.rectAreaLTC2=Y.LTC_FLOAT_2):(r.rectAreaLTC1=Y.LTC_HALF_1,r.rectAreaLTC2=Y.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=$l++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function nu(e){let t=new tu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ru(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new nu(e),t.set(n,[a])):r>=i.length?(a=new nu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var iu=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,au=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ou=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],su=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],cu=new Zt,lu=new U,uu=new U;function du(e,t,n){let i=new _i,a=new H,s=new H,c=new Kt,l=new Wa,u=new Ga,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new Ba({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:iu,fragmentShader:au}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Mr;y.setAttribute(`position`,new _r(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new K(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(B(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){B(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){B(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Jt(a.x,a.y,{format:k,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Bi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Hs(a.x),p.map.depthTexture=new Vi(a.x,m)):(p.map=new Jt(a.x,a.y),p.map.depthTexture=new Bi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),lu.setFromMatrixPosition(d.matrixWorld),e.position.copy(lu),uu.copy(e.position),uu.add(ou[t]),e.up.copy(su[t]),e.lookAt(uu),e.updateMatrixWorld(),n.makeTranslation(-lu.x,-lu.y,-lu.z),cu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(cu,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Jt(a.x,a.y,{format:k,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function fu(e,t){function n(){let t=!1,n=new Kt,r=null,i=new Kt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?L(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Qe[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?L(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,ee=e.getParameter(e.VERSION);ee.indexOf(`WebGL`)===-1?ee.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(ee)[1]),N=P>=1);let F=null,te={},I=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Kt().fromArray(I),ie=new Kt().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),L(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),L(e.CULL_FACE),pe(0);function L(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(se(e.BLEND),g=!1);return}if(g===!1&&(L(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?se(e.CULL_FACE):L(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?L(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?se(e.CULL_FACE):(L(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(L(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ye(t){t?L(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+M-1),F!==t&&(e.activeTexture(t),F=t)}function xe(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+M-1:F);let i=te[r];i===void 0&&(i={type:void 0,texture:void 0},te[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function Se(){let t=te[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function R(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Me(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function z(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function Pe(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,te={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new G(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:L,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:R,texImage3D:je,pixelStorei:Ne,getParameter:Me,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:Oe,scissor:z,viewport:Pe,reset:Le}}function pu(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new H,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ge(`canvas`)}function T(e,t,n){let r=1,i=Me(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),B(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&B(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function O(e){l.generateMipmap(e)}function k(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function A(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];B(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||B(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?Re:Ft.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function j(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,B(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function M(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function N(e){let t=e.target;t.removeEventListener(`dispose`,N),ee(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),te(t)}function ee(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&F(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function F(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function te(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let I=0;function ne(){I=0}function re(){return I}function ie(e){I=e}function ae(){let e=I;return e>=p.maxTextures&&B(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),I+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function L(e,t){let n=f.get(e);if(e.isVideoTexture&&R(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)B(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)B(`WebGLRenderer: Texture marked for update but image is incomplete`);else{_e(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function se(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){_e(n,e,t);return}e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function ce(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){_e(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function le(e,t){let n=f.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){ve(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let ue={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},de={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},fe={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function pe(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&B(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,ue[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,ue[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,ue[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,de[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,de[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,fe[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function me(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,N));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=oe(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&F(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=he(r.start,t.width,4),c=he(n.start,t.width,4);r.start<=o+1&&s===c&&he(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function _e(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=me(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Ft.getPrimaries(Ft.workingColorSpace),n=t.colorSpace===``?null:Ft.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=je(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=A(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);pe(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=M(t,e);if(t.isDepthTexture)u=j(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&ge(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=ss(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=ss(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Me(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Me(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&O(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ve(e,t,n){if(t.image.length!==6)return;let r=me(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=Ft.getPrimaries(Ft.workingColorSpace),o=t.colorSpace===``?null:Ft.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=je(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=A(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=M(t,h);pe(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?B(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Me(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&O(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ye(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=A(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,ke(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function be(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=j(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Ae(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,ke(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,ke(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=A(i.internalFormat,a,o,i.normalized,i.colorSpace);Ae(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,ke(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,ke(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function xe(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,N)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),pe(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else L(t.depthTexture,0);let a=i.__webglTexture,o=ke(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Ae(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Se(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)xe(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?xe(t.__webglFramebuffer[0],e,0):xe(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),be(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),be(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function Ce(e,t,n){let r=f.get(e);t!==void 0&&ye(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Se(e)}function we(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,P);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Ae(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=A(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=ke(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),be(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),pe(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)ye(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else ye(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&O(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),pe(o,r),ye(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&O(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),pe(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)ye(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else ye(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&O(i),d.unbindTexture()}e.depthBuffer&&Se(e)}function Te(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=k(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let Ee=[],De=[];function Oe(e){if(e.samples>0){if(Ae(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Ee.length=0,De.length=0,Ee.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ee.push(a),De.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,De)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Ee))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function ke(e){return Math.min(p.maxSamples,e.samples)}function Ae(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function R(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function je(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Ft.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&B(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function Me(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=ae,this.resetTextureUnits=ne,this.getTextureUnits=re,this.setTextureUnits=ie,this.setTexture2D=L,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Ce,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function mu(e,t){function n(n,r=``){let i,a=Ft.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var hu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,_u=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ba({vertexShader:hu,fragmentShader:gu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new Oa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vu=class extends $e{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new _u,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],O=new H,k=null,A=null,j=new Mo;j.viewport=new Kt;let M=new Mo;M.viewport=new Kt;let N=[j,M],P=new Uo,ee=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Dn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Dn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Dn,C[e]=t),t.getHandSpace()};function te(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function I(){r.removeEventListener(`select`,te),r.removeEventListener(`selectstart`,te),r.removeEventListener(`selectend`,te),r.removeEventListener(`squeeze`,te),r.removeEventListener(`squeezestart`,te),r.removeEventListener(`squeezeend`,te),r.removeEventListener(`end`,I),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}ee=null,F=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(k),e.setSize(O.width,O.height,!1),A!==null){let e=A.camera;e.fov=A.fov,e.zoom=A.zoom,e.updateProjectionMatrix(),A=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&B(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,te),r.addEventListener(`selectstart`,te),r.addEventListener(`selectend`,te),r.addEventListener(`squeeze`,te),r.addEventListener(`squeezestart`,te),r.addEventListener(`squeezeend`,te),r.addEventListener(`end`,I),r.addEventListener(`inputsourceschange`,ne),b.xrCompatible!==!0&&await t.makeXRCompatible(),k=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Jt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Bi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Jt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let re=new U,ie=new U;function ae(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),P.near=M.near=j.near=t,P.far=M.far=j.far=n,(ee!==P.near||F!==P.far)&&(r.updateRenderState({depthNear:P.near,depthFar:P.far}),ee=P.near,F=P.far),P.layers.mask=e.layers.mask|6,j.layers.mask=P.layers.mask&-5,M.layers.mask=P.layers.mask&-3;let i=e.parent,a=P.cameras;oe(P,i);for(let e=0;e<a.length;e++)oe(a[e],i);a.length===2?ae(P,j,M):P.projectionMatrix.copy(j.projectionMatrix),A===null&&e.isPerspectiveCamera&&(A={camera:e,fov:e.fov,zoom:e.zoom}),L(e,P,i)};function L(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=rt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(P)},this.getCameraTexture=function(e){return v[e]};let se=null;function ce(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==P.cameras.length&&(P.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=N[n];o===void 0&&(o=new Mo,o.layers.enable(n),o.viewport=new Kt,N[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(P.matrix.copy(o.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),i===!0&&P.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Hi,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let le=new ls;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},yu=new Zt,bu=new At;bu.set(-1,0,0,0,1,0,0,0,1);function xu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ia(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(yu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(bu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Su(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?B(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):B(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Cu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),wu=null;function Tu(){return wu===null&&(wu=new ii(Cu,16,16,k,g),wu.name=`DFG_LUT`,wu.minFilter=o,wu.magFilter=o,wu.wrapS=t,wu.wrapT=t,wu.generateMipmaps=!1,wu.needsUpdate=!0),wu}var Eu=class{constructor(e={}){let{canvas:t=Ke(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([j,A,O]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new U,k=null,M=null,N=[],P=[],ee=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let F=this,te=!1,I=null,ne=null,re=null,ie=null;this._outputColorSpace=Ie;let ae=0,oe=0,L=null,se=-1,ce=null,le=new Kt,ue=new Kt,de=null,fe=new G(0),pe=0,me=t.width,he=t.height,ge=1,_e=null,ve=null,ye=new Kt(0,0,me,he),be=new Kt(0,0,me,he),xe=!1,Se=new _i,Ce=!1,we=!1,Te=new Zt,Ee=new U,De=new Kt,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return L===null?ge:1}let R=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,z,Pe,Fe,Le,Re,ze,Be,Ve,Ue,We,Ge,qe,Ye,Xe,Qe,$e,et,tt,nt,rt,it;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,st,!1),t.addEventListener(`webglcontextrestored`,ct,!1),t.addEventListener(`webglcontextcreationerror`,lt,!1),R===null){let t=`webgl2`;if(R=je(t,e),R===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}at()}catch(e){throw t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),V(`WebGLRenderer: `+e.message),e}function at(){Me=new Ws(R),Me.init(),nt=new mu(R,Me),Ne=new ys(R,Me,e,nt),z=new fu(R,Me),Ne.reversedDepthBuffer&&h&&z.buffers.depth.setReversed(!0),ne=R.createFramebuffer(),re=R.createFramebuffer(),ie=R.createFramebuffer(),Pe=new qs(R),Fe=new Kl,Le=new pu(R,Me,z,Fe,Ne,nt,Pe),Re=new Us(F),ze=new us(R),rt=new _s(R,ze),Be=new Gs(R,ze,Pe,rt),Ve=new Ys(R,Be,ze,rt,Pe),$e=new Js(R,Ne,Le),Ye=new bs(Fe),Ue=new Gl(F,Re,Me,Ne,rt,Ye),We=new xu(F,Fe),Ge=new Xl,qe=new ru(Me),Qe=new gs(F,Re,z,Ve,x,s),Xe=new du(F,Ve,Ne),it=new Su(R,Pe,Ne,z),et=new vs(R,Me,Pe),tt=new Ks(R,Me,Pe),Pe.programs=Ue.programs,F.capabilities=Ne,F.extensions=Me,F.properties=Fe,F.renderLists=Ge,F.shadowMap=Xe,F.state=z,F.info=Pe}S!==1009&&(ee=new Zs(S,t.width,t.height,o,r,i));let ot=new vu(F,R);this.xr=ot,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(e){e!==void 0&&(ge=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){if(ot.isPresenting){B(`WebGLRenderer: Can't change size while VR device is presenting.`);return}me=e,he=n,t.width=Math.floor(e*ge),t.height=Math.floor(n*ge),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ee!==null&&ee.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(me*ge,he*ge).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,ge=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){B(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ee.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(le)},this.getViewport=function(e){return e.copy(ye)},this.setViewport=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),z.viewport(le.copy(ye).multiplyScalar(ge).round())},this.getScissor=function(e){return e.copy(be)},this.setScissor=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),z.scissor(ue.copy(be).multiplyScalar(ge).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(e){z.setScissorTest(xe=e)},this.setOpaqueSort=function(e){_e=e},this.setTransparentSort=function(e){ve=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(L!==null){let t=L.texture.format;e=C.has(t)}if(e){let e=L.texture.type,t=w.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,R.clearBufferuiv(R.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,R.clearBufferiv(R.COLOR,0,E))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),I=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,st,!1),t.removeEventListener(`webglcontextrestored`,ct,!1),t.removeEventListener(`webglcontextcreationerror`,lt,!1),Qe.dispose(),Ge.dispose(),qe.dispose(),Fe.dispose(),Re.dispose(),Ve.dispose(),rt.dispose(),it.dispose(),Ue.dispose(),ot.dispose(),ot.removeEventListener(`sessionstart`,gt),ot.removeEventListener(`sessionend`,_t),vt.stop()};function st(e){e.preventDefault(),Je(`WebGLRenderer: Context Lost.`),te=!0}function ct(){Je(`WebGLRenderer: Context Restored.`),te=!1;let e=Pe.autoReset,t=Xe.enabled,n=Xe.autoUpdate,r=Xe.needsUpdate,i=Xe.type;at(),Pe.autoReset=e,Xe.enabled=t,Xe.autoUpdate=n,Xe.needsUpdate=r,Xe.type=i}function lt(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ut(e){let t=e.target;t.removeEventListener(`dispose`,ut),dt(t)}function dt(e){ft(e),Fe.remove(e)}function ft(e){let t=Fe.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Dt(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=et;if(c!==null&&(h=ze.get(c),g=tt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*Ae()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*Ae()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=Fe.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n,r){I!==null&&e.isNodeMaterial&&I.setObject(r,e),Ce===!0&&Ye.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,r),e.side=0,e.needsUpdate=!0,wt(e,t,r),e.side=2):wt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),I!==null&&I.renderStart(e,t,n),M=qe.get(n),M.init(t),P.push(M),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(M.pushLight(e),e.castShadow&&M.pushShadow(e))}),M.setupLights(),I!==null&&I.updateLights(M.state.lightsArray),we=this.localClippingEnabled,Ce=Ye.init(this.clippingPlanes,we),Ce===!0&&Ye.setGlobalState(this.clippingPlanes,t),I!==null&&Xe.render(M.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];pt(o,n,t,e),r.add(o)}else pt(i,n,t,e),r.add(i)}}),M=P.pop(),I!==null&&I.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=Fe.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function ht(e){mt&&mt(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new ls;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){mt=e,ot.setAnimationLoop(e),e===null?vt.stop():vt.start()},ot.addEventListener(`sessionstart`,gt),ot.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(te===!0)return;I!==null&&I.renderStart(e,t);let n=ot.enabled===!0&&ot.isPresenting===!0,r=ee!==null&&(L===null||n)&&ee.begin(F,L);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ee===null||ee.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(t),t=ot.getCamera()),e.isScene===!0&&e.onBeforeRender(F,e,t,L),M=qe.get(e,P.length),M.init(t),M.state.textureUnits=Le.getTextureUnits(),P.push(M),Te.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Se.setFromProjectionMatrix(Te,He,t.reversedDepth),we=this.localClippingEnabled,Ce=Ye.init(this.clippingPlanes,we),k=Ge.get(e,N.length),k.init(),N.push(k),ot.enabled===!0&&ot.isPresenting===!0){let e=F.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,F.sortObjects)}yt(e,t,0,F.sortObjects),k.finish(),I!==null&&I.updateLights(M.state.lightsArray),F.sortObjects===!0&&k.sort(_e,ve),ke=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,ke&&Qe.addToRenderList(k,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ce===!0&&Ye.beginShadows();let i=M.state.shadowsArray;if(Xe.render(i,e,t),Ce===!0&&Ye.endShadows(),(r&&ee.hasRenderPass())===!1){let n=k.opaque,r=k.transmissive;if(M.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}ke&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(k,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),ke&&Qe.render(e),bt(k,e,t)}L!==null&&oe===0&&(Le.updateMultisampleRenderTarget(L),Le.updateRenderTargetMipmap(L)),r&&ee.end(F),e.isScene===!0&&e.onAfterRender(F,e,t),rt.resetDefaultState(),se=-1,ce=null,P.pop(),P.length>0?(M=P[P.length-1],Le.setTextureUnits(M.state.textureUnits),Ce===!0&&Ye.setGlobalState(F.clippingPlanes,M.state.camera)):M=null,N.pop(),k=N.length>0?N[N.length-1]:null,I!==null&&I.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)M.pushLightProbeGrid(e);else if(e.isLight)M.pushLight(e),e.castShadow&&M.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Se)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);let i=Ve.update(e),a=e.material;a.visible&&k.push(e,i,a,n,De.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Se))){let i=Ve.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&k.push(e,i,c,n,De.z,s,t)}}else a.visible&&k.push(e,i,a,n,De.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;M.setupLightsView(n),Ce===!0&&Ye.setGlobalState(F.clippingPlanes,n),r&&z.viewport(le.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);M.state.transmissionRenderTarget[r.id]=new Jt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ft.workingColorSpace})}let a=M.state.transmissionRenderTarget[r.id],o=r.viewport||le;a.setSize(o.z*F.transmissionResolutionScale,o.w*F.transmissionResolutionScale);let s=F.getRenderTarget(),u=F.getActiveCubeFace(),d=F.getActiveMipmapLevel();F.setRenderTarget(a),F.getClearColor(fe),pe=F.getClearAlpha(),pe<1&&F.setClearColor(16777215,.5),F.clear(),ke&&Qe.render(n);let f=F.toneMapping;F.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),M.setupLightsView(r),Ce===!0&&Ye.setGlobalState(F.clippingPlanes,r),St(e,n,r),Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a))}F.setRenderTarget(s,u,d),F.setClearColor(fe,pe),p!==void 0&&(r.viewport=p),F.toneMapping=f}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){I!==null&&i.isNodeMaterial&&I.setObject(e,i),e.onBeforeRender(F,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(F,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,F.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,F.renderBufferDirect(n,t,r,i,e,a),i.side=2):F.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(F,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=Oe);let r=Fe.get(e),i=M.state.lights,a=M.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,M.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ut),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=Ue.getUniforms(e),I!==null&&e.isNodeMaterial&&I.build(e,n,s),e.onBeforeCompile(s,F),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ye.uniform),Et(e,s),r.needsLights=kt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=M.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=il.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=Fe.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function H(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Dt(e,t,n,r,i){t.isScene!==!0&&(t=Oe),Le.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=L===null?F.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Ft.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(h=F.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=Fe.get(r),y=M.state.lights;if(Ce===!0&&(we===!0||e!==ce)){let t=e===ce&&r.id===se;Ye.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ye.numPlanes||v.numIntersection!==Ye.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=M.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),I&&r.isNodeMaterial&&I.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(z.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==se&&(se=r.id,C=!0),v.needsLights){let e=H(M.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ce!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(R,`projectionMatrix`,e.projectionMatrix),T.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(R,Ee.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&T.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(R,`sunShadowMap`,y.state.sunShadowMap,Le),y.state.directionalShadowMap.length>0&&T.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,Le),y.state.spotShadowMap.length>0&&T.setValue(R,`spotShadowMap`,y.state.spotShadowMap,Le),y.state.pointShadowMap.length>0&&T.setValue(R,`pointShadowMap`,y.state.pointShadowMap,Le)),i.isSkinnedMesh){T.setOptional(R,i,`bindMatrix`),T.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(R,`boneTexture`,e.boneTexture,Le))}i.isBatchedMesh&&(T.setOptional(R,i,`batchingTexture`),T.setValue(R,`batchingTexture`,i._matricesTexture,Le),T.setOptional(R,i,`batchingIdTexture`),T.setValue(R,`batchingIdTexture`,i._indirectTexture,Le),T.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(R,`batchingColorTexture`,i._colorsTexture,Le));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&$e.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Tu()),C){if(T.setValue(R,`toneMappingExposure`,F.toneMappingExposure),v.needsLights&&Ot(E,w),a&&r.fog===!0&&We.refreshFogUniforms(E,a),We.refreshMaterialUniforms(E,r,ge,he,M.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}il.upload(R,Tt(v),E,Le)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(il.upload(R,Tt(v),E,Le),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(R,`center`,i.center),T.setValue(R,`modelViewMatrix`,i.modelViewMatrix),T.setValue(R,`normalMatrix`,i.normalMatrix),T.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];it.update(n,x),it.bind(n,x)}}return x}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function kt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(e,t,n){let r=Fe.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),Fe.get(e.texture).__webglTexture=t,Fe.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=Fe.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){L=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=Fe.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest,z.viewport(le),z.scissor(ue),z.setScissorTest(de),se=-1;return}if(o.__webglFramebuffer===void 0)Le.setupRenderTarget(e);else if(o.__hasExternalTextures)Le.rebindTextures(e,Fe.get(e.texture).__webglTexture,Fe.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&Fe.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Le.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=Fe.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Le.useMultisampledRTT(e)===!1?Fe.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest}else le.copy(ye).multiplyScalar(ge).floor(),ue.copy(be).multiplyScalar(ge).floor(),de=xe;if(n!==0&&(r=ne),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(le),z.scissor(ue),z.setScissorTest(de),i){let r=Fe.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=Fe.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=Fe.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}se=-1};function At(e){let t=Fe.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=Fe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=At(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=L===null?null:Fe.get(L).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=Fe.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=At(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=L===null?null:Fe.get(L).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Ze(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Le.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Le.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Le.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(Le.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=Fe.get(e),r=Fe.get(t),h=Fe.get(n.__renderTarget),g=Fe.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Fe.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Fe.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||Fe.has(e)){let n=Fe.get(e),r=Fe.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,re),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){Fe.get(e).__webglFramebuffer===void 0&&Le.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Le.setTextureCube(e,0):e.isData3DTexture?Le.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Le.setTexture2DArray(e,0):Le.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){ae=0,oe=0,L=null,z.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ft._getUnpackColorSpace()}},Du={sigma:new U(.15,.048,.034),kd:new U(.33,.042,.021),surfaceLight:new G(1,.97,.9).multiplyScalar(3.2),scatterTint:new G(.12,.62,.95),turbidity:1},Ou={uSigma:{value:Du.sigma.clone()},uKd:{value:Du.kd},uSurfLight:{value:Du.surfaceLight},uScatTint:{value:Du.scatterTint},uTime:{value:0},uCausticStrength:{value:1},uSunDir:{value:new U(.3,1,.2).normalize()},uUnderwater:{value:1}},ku=new G;function Au(e,t=ku){let n=Math.max(0,-e);return t.setRGB(Du.surfaceLight.r*Math.exp(-Du.kd.x*n),Du.surfaceLight.g*Math.exp(-Du.kd.y*n),Du.surfaceLight.b*Math.exp(-Du.kd.z*n)),t}function ju(e,t=1){Ou.uTime.value=e,Du.turbidity=t,Ou.uSigma.value.copy(Du.sigma).multiplyScalar(t)}var Mu=`
uniform vec3 uSigma;
uniform vec3 uKd;
uniform vec3 uSurfLight;
uniform vec3 uScatTint;
uniform float uTime;
uniform float uCausticStrength;
uniform vec3 uSunDir;
uniform float uUnderwater;
varying vec3 vWaterWorld;

vec3 waterAmbient(float y){
  float d = max(0.0, -y);
  return uSurfLight * exp(-uKd * d);
}
// animated caustic network: thin bright lines where warped sine fields cross zero
float causticLayer(vec2 p, float t){
  vec2 q = p;
  float s = 0.0;
  for (int i = 0; i < 3; i++) {
    q = mat2(1.6, 1.2, -1.2, 1.6) * q;
    float fi = float(i);
    s += sin(q.x + t * (1.0 + 0.3 * fi) + sin(q.y * 0.7 - t * 0.8 + fi));
  }
  float v = 1.0 - clamp(abs(s) / 2.2, 0.0, 1.0);
  return v * v * v * v * v * v * v * v;
}
float caustics(vec3 wp){
  vec2 p = wp.xz * 0.22 + wp.y * uSunDir.xz * 0.22;
  float a = causticLayer(p, uTime * 0.7);
  float b = causticLayer(p * 0.73 + vec2(3.1, 1.7), uTime * 0.53 + 2.0);
  return (a + b) * 1.4;
}
`;function Nu(e){return e=e.replace(`#include <common>`,`#include <common>
varying vec3 vWaterWorld;`),e=e.replace(`#include <fog_vertex>`,`#include <fog_vertex>
    vWaterWorld = (inverse(viewMatrix) * mvPosition).xyz;`),e}function Pu(e,t){e=e.replace(`#include <common>`,`#include <common>
`+Mu);let n=``;return t.caustics&&(n=`
    {
      float cy = -vWaterWorld.y;
      float cAmt = uCausticStrength * exp(-cy * 0.045) * smoothstep(-0.2, 0.6, normalize(vNormalW_).y);
      vec3 cc = waterAmbient(vWaterWorld.y) * caustics(vWaterWorld) * cAmt * 0.9;
      outgoingLight += diffuseColor.rgb * cc;
    }`),e=e.replace(`#include <opaque_fragment>`,`${n}
    #include <opaque_fragment>
    if (uUnderwater > 0.5) {
      vec3 toFrag = vWaterWorld - cameraPosition;
      float dist = length(toFrag);
      vec3 T = exp(-uSigma * dist);
      // in-scatter: ambient at the average depth along the ray
      float ym = 0.5 * (vWaterWorld.y + cameraPosition.y);
      vec3 amb = waterAmbient(ym);
      vec3 vdir = toFrag / max(dist, 1e-4);
      float mu = dot(vdir, uSunDir);
      float phase = 0.55 + 0.9 * pow(max(mu, 0.0), 6.0) + 0.25 * max(-vdir.y, 0.0) * 0.0 + 0.35 * max(vdir.y, 0.0);
      vec3 inscatter = amb * uScatTint * phase * 0.22;
      gl_FragColor.rgb = gl_FragColor.rgb * T + inscatter * (1.0 - T);
    }`),t.caustics&&(e=e.replace(`#include <common>`,`#include <common>
varying vec3 vNormalW_;`)),e}function Fu(e,t={}){let n=e.onBeforeCompile;e.onBeforeCompile=(e,r)=>{n&&n(e,r),Object.assign(e.uniforms,Ou),e.vertexShader=Nu(e.vertexShader),t.caustics&&(e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vNormalW_;`).replace(`#include <fog_vertex>`,`#include <fog_vertex>
 vNormalW_ = normalize(mat3(inverse(viewMatrix)) * transformedNormal);`)),e.fragmentShader=Pu(e.fragmentShader,t)};let r=e.customProgramCacheKey?e.customProgramCacheKey.bind(e):()=>``;return e.customProgramCacheKey=()=>r()+`|water`+(t.caustics?`C`:``),e}var Iu=`
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;function Lu(e,t,n={}){return new Ba({vertexShader:Iu,fragmentShader:e,uniforms:t,defines:n,depthTest:!1,depthWrite:!1,toneMapped:!1})}var Ru=4,zu=`
#include <packing>
${Mu.replace(`varying vec3 vWaterWorld;`,``)}
varying vec2 vUv;
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform mat4 uInvProj;
uniform mat4 uInvView;
uniform vec3 uCamPos;
uniform float uNear, uFar;
uniform vec2 uRes;
uniform float uFrame;
uniform int uSpotCount;
uniform vec3 uSpotPos[${Ru}];
uniform vec3 uSpotDir[${Ru}];
uniform vec3 uSpotColor[${Ru}];
uniform float uSpotCos[${Ru}];
uniform float uSpotPen[${Ru}];
uniform float uScatterBoost;
uniform float uSilt;
uniform float uRayStart;
uniform float uScatB;

float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float hgPhase(float mu, float g){ float g2 = g*g; return (1.0 - g2) / (4.0*3.14159*pow(1.0 + g2 - 2.0*g*mu, 1.5)); }

vec3 viewRay(vec2 uv){
  vec4 c = uInvProj * vec4(uv * 2.0 - 1.0, 1.0, 1.0);
  vec3 v = normalize(c.xyz / c.w);
  return normalize((uInvView * vec4(v, 0.0)).xyz);
}
float linDepth(float d){
  // perspective depth -> view z distance
  float z = d * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / (uFar + uNear - z * (uFar - uNear));
}
// cheap 2D noise for shafts
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash12(i), b=hash12(i+vec2(1,0)), c=hash12(i+vec2(0,1)), d=hash12(i+vec2(1,1));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }

void main(){
  vec3 col = texture2D(tColor, vUv).rgb;
  float d = texture2D(tDepth, vUv).x;
  vec3 rd = viewRay(vUv);
  bool bg = d >= 0.99999;
  // distance along the ray to the hit
  vec4 cv = uInvProj * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
  vec3 vpos = cv.xyz / cv.w;
  float dist = bg ? 600.0 : length(vpos);

  vec3 amb = waterAmbient(uCamPos.y);
  vec3 sigma = uSigma * (1.0 + uSilt * 6.0);

  if (bg) {
    // infinite water column. Looking up we see brighter water, down it goes dark.
    float up = rd.y;
    // radiance gradient: light coming from above
    float yl = uCamPos.y + up * 60.0;
    vec3 a2 = waterAmbient(min(yl, 0.0));
    float mu = dot(rd, uSunDir);
    float phase = 0.55 + 0.9 * pow(max(mu, 0.0), 6.0) + 0.35 * max(up, 0.0);
    col = a2 * uScatTint * phase * 0.22;
    // Snell's window: the surface seen from below
    if (up > 0.0 && uCamPos.y > -250.0) {
      float t = -uCamPos.y / up;
      vec3 sp = uCamPos + rd * t;
      vec3 T = exp(-uSigma * t);
      // wavy surface normal
      vec2 q = sp.xz * 0.08;
      float w1 = sin(q.x * 3.1 + uTime * 0.9) + sin(q.y * 2.3 - uTime * 0.7) + n2(q * 4.0 + uTime * 0.2) * 1.5;
      float sinI = sqrt(1.0 - up * up);
      float window = smoothstep(0.78, 0.72, sinI + w1 * 0.015); // critical angle ~48.6deg => sin=0.75
      vec3 sky = vec3(0.55, 0.8, 1.0) * 3.0 + vec3(1.0, 0.95, 0.8) * 40.0 * pow(max(dot(rd, uSunDir), 0.0), 800.0);
      vec3 tir = uScatTint * waterAmbient(-30.0) * 0.25; // total internal reflection of the deep
      vec3 surf = mix(tir, sky * (0.8 + 0.2 * w1), window);
      surf += vec3(1.0) * smoothstep(0.95, 1.0, n2(q * 12.0 + uTime * 0.5)) * 0.8 * window;
      col = surf * T + col * (1.0 - T);
    }
  }

  // --- sun shafts: modulated in-scatter by moving pattern, strong in first ~120 m
  float jitter = hash12(gl_FragCoord.xy + fract(uFrame * 0.618) * 100.0);
  if (uCamPos.y > -220.0) {
    const int SS = SHAFT_STEPS;
    float maxD = min(dist, 90.0);
    float stepL = maxD / float(SS);
    vec3 acc = vec3(0.0);
    for (int i = 0; i < SS; i++) {
      float t = (float(i) + jitter) * stepL;
      vec3 p = uCamPos + rd * t;
      if (p.y > 0.0) break;
      // project onto surface along sun dir
      vec2 sp = p.xz - uSunDir.xz * (p.y / uSunDir.y);
      float sh = n2(sp * 0.09 + uTime * 0.05) * n2(sp * 0.23 - uTime * 0.08);
      sh = smoothstep(0.18, 0.7, sh);
      acc += waterAmbient(p.y) * sh * exp(-sigma * t) * stepL;
    }
    float mu = dot(rd, uSunDir);
    col += acc * uScatTint * (0.02 + 0.5 * hgPhase(mu, 0.7)) * 0.35 * smoothstep(-220.0, -60.0, uCamPos.y);
  }

  // --- headlight volumetrics (single scattering, physically based)
  // L_in = ∫ b · p(θ) · I/l² · e^{-c(l + t)} dt, θ = angle between light propagation (lamp → sample)
  // and the direction to the eye (-rd). Two-term HG phase fitted to Petzold's ocean data (strong
  // forward peak, ~2.5 % backscatter): looking down the beam gives weak haze, looking across it or
  // towards a lamp gives the bright forward-scatter cone. The ray starts at the viewport glass.
  if (uSpotCount > 0) {
    const int STEPS = VOL_STEPS;
    float t0 = uRayStart;
    float maxD = max(min(dist, 80.0) - t0, 0.0);
    float stepL = maxD / float(STEPS);
    vec3 acc = vec3(0.0);
    for (int i = 0; i < STEPS; i++) {
      float t = t0 + (float(i) + jitter) * stepL;
      vec3 p = uCamPos + rd * t;
      vec3 Tc = exp(-sigma * t);
      for (int s = 0; s < ${Ru}; s++) {
        if (s >= uSpotCount) break;
        vec3 L = p - uSpotPos[s];
        float l2 = dot(L, L);
        float l = sqrt(l2);
        vec3 Ld = L / max(l, 1e-4);
        float c = dot(Ld, uSpotDir[s]);
        float cone = smoothstep(uSpotCos[s], uSpotCos[s] + uSpotPen[s], c);
        if (cone <= 0.0) continue;
        float mu = dot(Ld, -rd);
        float ph = 0.975 * hgPhase(mu, 0.9) + 0.025 * hgPhase(mu, -0.35);
        acc += uSpotColor[s] * cone * ph * Tc * exp(-sigma * l) / (l2 + 0.04) * stepL;
      }
    }
    // b = scattering coefficient (1/m): clear ocean ~0.03, rises with silt / turbidity
    col += acc * uScatB * (1.0 + uSilt * 12.0) * uScatterBoost * vec3(0.92, 0.97, 1.0);
  }
  gl_FragColor = vec4(col, 1.0);
}`,Bu=`
varying vec2 vUv; uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uThreshold; uniform float uFirst;
vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
void main(){
  vec3 a = s(vec2(-2,-2)), b = s(vec2(0,-2)), c = s(vec2(2,-2));
  vec3 d = s(vec2(-1,-1)), e = s(vec2(1,-1));
  vec3 f = s(vec2(-2,0)), g = s(vec2(0,0)), h = s(vec2(2,0));
  vec3 i = s(vec2(-1,1)), j = s(vec2(1,1));
  vec3 k = s(vec2(-2,2)), l = s(vec2(0,2)), m = s(vec2(2,2));
  vec3 o = (d+e+i+j)*0.125 + (a+b+g+f)*0.03125 + (b+c+h+g)*0.03125 + (f+g+l+k)*0.03125 + (g+h+m+l)*0.03125;
  if (uFirst > 0.5) {
    float br = max(o.r, max(o.g, o.b));
    float soft = clamp(br - uThreshold + 0.5, 0.0, 1.0); soft = soft*soft*0.5;
    float w = max(soft, br - uThreshold) / max(br, 1e-4);
    o *= w;
    o = min(o, vec3(60.0));
  }
  gl_FragColor = vec4(o, 1.0);
}`,Vu=`
varying vec2 vUv; uniform sampler2D tSrc; uniform sampler2D tPrev; uniform vec2 uTexel; uniform float uRadius;
vec3 s(vec2 o){ return texture2D(tSrc, vUv + o * uTexel * uRadius).rgb; }
void main(){
  vec3 o = s(vec2(-1,-1)) + s(vec2(0,-1))*2.0 + s(vec2(1,-1)) + s(vec2(-1,0))*2.0 + s(vec2(0,0))*4.0 + s(vec2(1,0))*2.0 + s(vec2(-1,1)) + s(vec2(0,1))*2.0 + s(vec2(1,1));
  gl_FragColor = vec4(o / 16.0 + texture2D(tPrev, vUv).rgb, 1.0);
}`,Hu=`
varying vec2 vUv; uniform sampler2D tSrc;
void main(){
  vec3 c = texture2D(tSrc, vUv).rgb;
  float L = dot(c, vec3(0.2126, 0.7152, 0.0722));
  vec2 d = (vUv - vec2(0.5, 0.56)) * vec2(1.6, 1.0);
  float w = exp(-dot(d, d) * 6.0);
  gl_FragColor = vec4(log(max(L, 1e-4)) * w, w, 0.0, 1.0);
}`,Uu=`
varying vec2 vUv;
uniform sampler2D tColor; uniform sampler2D tBloom;
uniform float uExposure; uniform float uBloom; uniform float uTime; uniform vec2 uRes;
uniform float uVignette; uniform float uCA; uniform float uGrain; uniform float uFlash; uniform vec3 uFlashColor;
uniform float uBlackout; uniform float uShake; uniform float uRedAlert; uniform float uFog; uniform float uSmoke;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 RRTAndODTFit(vec3 v){ vec3 a = v*(v+0.0245786)-0.000090537; vec3 b = v*(0.983729*v+0.4329510)+0.238081; return a/b; }
vec3 aces(vec3 c){
  const mat3 i = mat3(0.59719,0.07600,0.02840, 0.35458,0.90834,0.13383, 0.04823,0.01566,0.83777);
  const mat3 o = mat3(1.60475,-0.10208,-0.00327, -0.53108,1.10813,-0.07276, -0.07367,-0.00605,1.07602);
  c = i * c; c = RRTAndODTFit(c); c = o * c; return clamp(c, 0.0, 1.0);
}
void main(){
  vec2 uv = vUv;
  vec2 cc = uv - 0.5;
  float r2 = dot(cc, cc);
  // chromatic aberration grows toward edges
  vec2 off = cc * r2 * uCA;
  vec3 col;
  col.r = texture2D(tColor, uv - off).r;
  col.g = texture2D(tColor, uv).g;
  col.b = texture2D(tColor, uv + off).b;
  col += texture2D(tBloom, uv).rgb * uBloom;
  // smoke in cabin
  col = mix(col, vec3(0.08,0.075,0.07) * (0.6 + 0.4*sin(uv.y*3.0 + uTime*0.3)), uSmoke * 0.85);
  col *= uExposure;
  col = aces(col);
  // grade: cool shadows, slightly lifted blacks
  col = pow(col, vec3(1.0/2.2));
  col = mix(col, col * vec3(0.94, 1.0, 1.05) + vec3(0.0, 0.004, 0.01), 0.6);
  col = (col - 0.5) * 1.06 + 0.5;
  // red emergency lighting
  col = mix(col, col * vec3(1.35, 0.55, 0.5), uRedAlert * 0.45);
  // condensation fog on lens
  col = mix(col, vec3(dot(col, vec3(0.33))) + 0.03, uFog * smoothstep(0.05, 0.35, r2));
  // vignette
  col *= mix(1.0, smoothstep(0.85, 0.2, r2 * 2.0), uVignette);
  // grain (luminance-dependent)
  float g = hash12(gl_FragCoord.xy + fract(uTime * 13.7) * 1000.0) - 0.5;
  col += g * uGrain * (0.35 + 0.65 * (1.0 - dot(col, vec3(0.33))));
  col = mix(col, uFlashColor, uFlash);
  col *= 1.0 - uBlackout;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`,Wu=class{constructor(e){this.renderer=e,this.quad=new K(new Oa(2,2)),this.quad.frustumCulled=!1,this.fsScene=new Nn,this.fsScene.add(this.quad),this.fsCam=new Lo(-1,1,1,-1,0,1),this.frame=0,this.params={autoExposure:!0,exposure:1,bloom:.9,vignette:.55,ca:.012,grain:.035,flash:0,flashColor:new G(1,1,1),blackout:0,redAlert:0,fog:0,smoke:0,scatterBoost:1,silt:0};let t={type:g,format:w,colorSpace:Le,depthBuffer:!0};this.rtScene=new Jt(4,4,{...t,samples:4}),this.rtScene.depthTexture=new Bi(4,4),this.rtScene.depthTexture.type=h,this.rtVol=new Jt(4,4,{...t,samples:4}),this.bloomDown=[],this.bloomUp=[];for(let e=0;e<6;e++)this.bloomDown.push(new Jt(4,4,{type:g,depthBuffer:!1})),this.bloomUp.push(new Jt(4,4,{type:g,depthBuffer:!1}));this.rtLum=new Jt(64,32,{type:h,depthBuffer:!1,minFilter:r,magFilter:r}),this.lumBuf=new Float32Array(8192),this.avgLum=.18,this._lumFrame=0,this.black=new ii(new Uint8Array([0,0,0,255]),1,1),this.black.needsUpdate=!0,this.volMat=Lu(zu,{...Ou,tColor:{value:null},tDepth:{value:null},uInvProj:{value:new Zt},uInvView:{value:new Zt},uCamPos:{value:new U},uNear:{value:.1},uFar:{value:1e3},uRes:{value:new H},uFrame:{value:0},uSpotCount:{value:0},uSpotPos:{value:Array.from({length:Ru},()=>new U)},uSpotDir:{value:Array.from({length:Ru},()=>new U(0,0,-1))},uSpotColor:{value:Array.from({length:Ru},()=>new U)},uSpotCos:{value:Array(Ru).fill(.9)},uSpotPen:{value:Array(Ru).fill(.05)},uScatterBoost:{value:1},uSilt:{value:0},uRayStart:{value:1},uScatB:{value:.035}},{VOL_STEPS:48,SHAFT_STEPS:16}),this.bloomLevels=6,this.downMat=Lu(Bu,{tSrc:{value:null},uTexel:{value:new H},uThreshold:{value:1.2},uFirst:{value:0}}),this.upMat=Lu(Vu,{tSrc:{value:null},tPrev:{value:null},uTexel:{value:new H},uRadius:{value:1}}),this.lumMat=Lu(Hu,{tSrc:{value:null}}),this.finalMat=Lu(Uu,{tColor:{value:null},tBloom:{value:null},uExposure:{value:1},uBloom:{value:.8},uTime:{value:0},uRes:{value:new H},uVignette:{value:.5},uCA:{value:.01},uGrain:{value:.03},uFlash:{value:0},uFlashColor:{value:new G},uBlackout:{value:0},uShake:{value:0},uRedAlert:{value:0},uFog:{value:0},uSmoke:{value:0}}),this.spots=[]}setQuality(e){let t=this.volMat.defines;if((t.VOL_STEPS!==e.volSteps||t.SHAFT_STEPS!==e.shafts)&&(t.VOL_STEPS=e.volSteps,t.SHAFT_STEPS=e.shafts,this.volMat.needsUpdate=!0),this.bloomLevels=e.bloom,this.rtScene.samples!==e.msaa)for(let t of[this.rtScene,this.rtVol])t.samples=e.msaa,t.dispose()}setSize(e,t,n){let r=Math.max(1,Math.floor(e*n)),i=Math.max(1,Math.floor(t*n));if(r===this.W&&i===this.H)return;this.W=r,this.H=i,this.rtScene.setSize(r,i),this.rtScene.depthTexture.image.width=r,this.rtScene.depthTexture.image.height=i,this.rtVol.setSize(r,i);let a=r>>1,o=i>>1;for(let e=0;e<this.bloomDown.length;e++)this.bloomDown[e].setSize(Math.max(1,a),Math.max(1,o)),this.bloomUp[e].setSize(Math.max(1,a),Math.max(1,o)),a>>=1,o>>=1;this.volMat.uniforms.uRes.value.set(r,i),this.finalMat.uniforms.uRes.value.set(r,i)}probe(e=`vol`,t=.5,n=.5,r=8){let i=e===`scene`?this.rtScene:this.rtVol,a=r,o=r,s=new Uint16Array(a*o*4),c=Math.floor(i.width*t-a/2),l=Math.floor(i.height*n-o/2);try{this.renderer.readRenderTargetPixels(i,c,l,a,o,s)}catch(e){return`err `+e.message}let u=e=>pr.fromHalfFloat(e),d=0,f=0,p=0;for(let e=0;e<a*o;e++)d+=u(s[e*4]),f+=u(s[e*4+1]),p+=u(s[e*4+2]);let m=a*o;return[d/m,f/m,p/m].map(e=>+e.toFixed(3))}_fs(e,t){this.quad.material=e,this.renderer.setRenderTarget(t),this.renderer.render(this.fsScene,this.fsCam)}render(e,t,n,r){let i=this.renderer;this.frame++;let a=this.params;i.setRenderTarget(this.rtScene),i.setClearColor(0,1),i.clear(!0,!0,!0),i.render(e,n);let o=this.volMat.uniforms;o.tColor.value=this.rtScene.texture,o.tDepth.value=this.rtScene.depthTexture,o.uInvProj.value.copy(n.projectionMatrixInverse),o.uInvView.value.copy(n.matrixWorld),n.getWorldPosition(o.uCamPos.value),o.uNear.value=n.near,o.uFar.value=n.far,o.uFrame.value=this.frame,o.uScatterBoost.value=a.scatterBoost,o.uSilt.value=a.silt,o.uRayStart.value=a.rayStart??1,o.uScatB.value=a.scatB??.035;let s=0;for(let e of this.spots){if(s>=Ru)break;if(!e.visible||e.intensity<=0)continue;e.getWorldPosition(o.uSpotPos.value[s]);let t=this._tp||=new U;e.target.getWorldPosition(t),o.uSpotDir.value[s].copy(t).sub(o.uSpotPos.value[s]).normalize(),o.uSpotColor.value[s].set(e.color.r,e.color.g,e.color.b).multiplyScalar(e.intensity),o.uSpotCos.value[s]=Math.cos(e.angle),o.uSpotPen.value[s]=(1-Math.cos(e.angle))*e.penumbra+.001,s++}o.uSpotCount.value=s,this._fs(this.volMat,this.rtVol),t&&(i.setRenderTarget(this.rtVol),i.autoClear=!1,i.clearDepth(),i.render(t,n),i.autoClear=!0);let c=this.rtVol.texture,l=this.W,u=this.H,d=Math.min(this.bloomLevels,this.bloomDown.length);for(let e=0;e<d;e++)this.downMat.uniforms.tSrc.value=c,this.downMat.uniforms.uTexel.value.set(1/l,1/u),this.downMat.uniforms.uFirst.value=+(e===0),this._fs(this.downMat,this.bloomDown[e]),c=this.bloomDown[e].texture,l=this.bloomDown[e].width,u=this.bloomDown[e].height;let f=this.black;for(let e=d-1;e>=0;e--){let t=e===d-1?this.bloomDown[e]:this.bloomUp[e+1];this.upMat.uniforms.tSrc.value=t.texture,this.upMat.uniforms.tPrev.value=e===d-1?this.black:this.bloomDown[e].texture,this.upMat.uniforms.uTexel.value.set(1/t.width,1/t.height),this._fs(this.upMat,this.bloomUp[e]),f=this.bloomUp[e].texture}if(a.autoExposure&&!(this._lumFrame++&3)){this.lumMat.uniforms.tSrc.value=this.rtVol.texture,this._fs(this.lumMat,this.rtLum);try{this.renderer.readRenderTargetPixels(this.rtLum,0,0,64,32,this.lumBuf);let e=0,t=0;for(let n=0;n<2048;n++)e+=this.lumBuf[n*4],t+=this.lumBuf[n*4+1];t>0&&Number.isFinite(e)&&(this.avgLum=Math.exp(e/t))}catch{}}let p=this.finalMat.uniforms;p.tColor.value=this.rtVol.texture,p.tBloom.value=f,p.uExposure.value=a.exposure,p.uBloom.value=a.bloom*.12,p.uTime.value=r,p.uVignette.value=a.vignette,p.uCA.value=a.ca,p.uGrain.value=a.grain,p.uFlash.value=a.flash,p.uFlashColor.value.copy(a.flashColor),p.uBlackout.value=a.blackout,p.uRedAlert.value=a.redAlert,p.uFog.value=a.fog,p.uSmoke.value=a.smoke,this._fs(this.finalMat,null)}},Gu=.5*(Math.sqrt(3)-1),Ku=(3-Math.sqrt(3))/6,qu=1/3,Ju=1/6,Yu=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function Xu(e){return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Zu(e=1337){let t=Xu(e),n=new Uint8Array(256);for(let e=0;e<256;e++)n[e]=e;for(let e=255;e>0;e--){let r=t()*(e+1)|0,i=n[e];n[e]=n[r],n[r]=i}let r=new Uint8Array(512),i=new Uint8Array(512);for(let e=0;e<512;e++)r[e]=n[e&255],i[e]=r[e]%12;function a(e,t){let n=0,a=0,o=0,s=(e+t)*Gu,c=Math.floor(e+s),l=Math.floor(t+s),u=(c+l)*Ku,d=e-(c-u),f=t-(l-u),p,m;d>f?(p=1,m=0):(p=0,m=1);let h=d-p+Ku,g=f-m+Ku,_=d-1+2*Ku,v=f-1+2*Ku,y=c&255,b=l&255,x=.5-d*d-f*f;if(x>=0){let e=i[y+r[b]]*3;x*=x,n=x*x*(Yu[e]*d+Yu[e+1]*f)}let S=.5-h*h-g*g;if(S>=0){let e=i[y+p+r[b+m]]*3;S*=S,a=S*S*(Yu[e]*h+Yu[e+1]*g)}let C=.5-_*_-v*v;if(C>=0){let e=i[y+1+r[b+1]]*3;C*=C,o=C*C*(Yu[e]*_+Yu[e+1]*v)}return 70*(n+a+o)}function o(e,t,n){let a,o,s,c,l=(e+t+n)*qu,u=Math.floor(e+l),d=Math.floor(t+l),f=Math.floor(n+l),p=(u+d+f)*Ju,m=e-(u-p),h=t-(d-p),g=n-(f-p),_,v,y,b,x,S;m>=h?h>=g?(_=1,v=0,y=0,b=1,x=1,S=0):m>=g?(_=1,v=0,y=0,b=1,x=0,S=1):(_=0,v=0,y=1,b=1,x=0,S=1):h<g?(_=0,v=0,y=1,b=0,x=1,S=1):m<g?(_=0,v=1,y=0,b=0,x=1,S=1):(_=0,v=1,y=0,b=1,x=1,S=0);let C=m-_+Ju,w=h-v+Ju,T=g-y+Ju,E=m-b+2*Ju,D=h-x+2*Ju,O=g-S+2*Ju,k=m-1+3*Ju,A=h-1+3*Ju,j=g-1+3*Ju,M=u&255,N=d&255,P=f&255,ee=.6-m*m-h*h-g*g;if(ee<0)a=0;else{let e=i[M+r[N+r[P]]]*3;ee*=ee,a=ee*ee*(Yu[e]*m+Yu[e+1]*h+Yu[e+2]*g)}let F=.6-C*C-w*w-T*T;if(F<0)o=0;else{let e=i[M+_+r[N+v+r[P+y]]]*3;F*=F,o=F*F*(Yu[e]*C+Yu[e+1]*w+Yu[e+2]*T)}let te=.6-E*E-D*D-O*O;if(te<0)s=0;else{let e=i[M+b+r[N+x+r[P+S]]]*3;te*=te,s=te*te*(Yu[e]*E+Yu[e+1]*D+Yu[e+2]*O)}let I=.6-k*k-A*A-j*j;if(I<0)c=0;else{let e=i[M+1+r[N+1+r[P+1]]]*3;I*=I,c=I*I*(Yu[e]*k+Yu[e+1]*A+Yu[e+2]*j)}return 32*(a+o+s+c)}function s(e,t,n,r=4,i=2.03,a=.5){let s=1,c=1,l=0,u=0;for(let d=0;d<r;d++)l+=s*o(e*c,t*c,n*c),u+=s,s*=a,c*=i,e+=19.1,t+=7.3,n+=3.7;return l/u}function c(e,t,n=4,r=2.03,i=.5){let o=1,s=1,c=0,l=0;for(let u=0;u<n;u++)c+=o*a(e*s,t*s),l+=o,o*=i,s*=r,e+=17.7,t+=5.3;return c/l}function l(e,t,n,r=3){let i=.5,a=1,s=0;for(let c=0;c<r;c++){let r=1-Math.abs(o(e*a,t*a,n*a));r*=r,s+=r*i,i*=.5,a*=2.1}return s}return{noise2:a,noise3:o,fbm2:c,fbm3:s,ridge3:l,rnd:Xu(e^2654435769)}}var Qu=Zu(20260924),$u=-10935,ed=[[1600,-75],[1510,-170],[1450,-600],[1370,-625],[1320,-1300],[1210,-1335],[1160,-2400],[1040,-2445],[990,-4e3],[850,-4055],[800,-6e3],[700,-6060],[650,-8e3],[560,-8070],[470,-10500],[300,-10905],[0,-10935]];function td(e){return 1850+300*Math.sin(e/2400)+120*Math.sin(e/830)}function nd(e){return e*e*e*(e*(e*6-15)+10)}function rd(e){return 30*e*e*(e*(e-2)+1)}var id=[0,0];function ad(e){if(e>=ed[0][0]){let t=-75+(e-1600)*.05,n=.05;return t>-30&&(t=-30,n=0),id[0]=t,id[1]=n,id}for(let t=0;t<ed.length-1;t++){let n=ed[t][0],r=ed[t+1][0];if(e<=n&&e>=r){let i=ed[t][1],a=ed[t+1][1],o=n-r,s=(n-e)/o;return id[0]=i+(a-i)*nd(s),id[1]=-(a-i)*rd(s)/o,id}}return id[0]=$u,id[1]=0,id}function od(e,t,n){return e<t?t:e>n?n:e}function sd(e,t,n){let r=od((n-e)/(t-e),0,1);return r*r*(3-2*r)}function cd(e,t,n,r=-1){return{x:td(t)+r*e,z:t,y:n}}var ld=[{id:`wreck`,name:`沈没貨物船「第三黎明丸」`,nameEn:`Wreck of the Reimei Maru No.3`,...cd(1820,90,-64),r:55,desc:`1944年に沈没した貨物船。船体は二つに折れ、珊瑚と魚群の住処になっている。`},{id:`coral`,name:`冷水性サンゴの庭`,nameEn:`Cold-water coral garden`,...cd(1405,-70,-612),r:45,desc:`ロフェリア等の冷水性サンゴが群生する中深層の岩棚。`},{id:`whale`,name:`鯨骨生物群集`,nameEn:`Whale fall`,...cd(1262,40,-1322),r:40,desc:`マッコウクジラの遺骸。骨を分解するバクテリアマットと特殊な生物群集。`},{id:`vents`,name:`熱水噴出孔「ブラックスモーカー」`,nameEn:`Hydrothermal vent field`,...cd(1095,-40,-2430),r:60,desc:`350℃を超える熱水が噴き出すチムニー群。近づき過ぎると船体が損傷する。`},{id:`nodules`,name:`マンガン団塊原`,nameEn:`Manganese nodule field`,...cd(918,60,-4040),r:60,desc:`数百万年かけて成長した金属団塊が海底一面に転がる深海平原。`},{id:`destroyer`,name:`駆逐艦の残骸`,nameEn:`Destroyer wreck`,...cd(748,-30,-6045),r:70,desc:`海戦で沈んだ駆逐艦。世界最深クラスの沈没船。`},{id:`lander`,name:`無人観測ランダー`,nameEn:`Baited lander`,...cd(610,20,-8060),r:40,desc:`研究船が投入した餌付き観測機。深海魚シンカイクサウオが集まる。`},{id:`deep`,name:`チャレンジャー海淵 最深部`,nameEn:`Challenger Deep`,...cd(120,0,-10925),r:60,desc:`地球上で最も深い場所。水圧は1100気圧を超える。`}];function ud(e,t,n){let r=e-td(n),i=+(r>0),a=Math.abs(r),o=Qu.fbm3(e*.0042,t*.0021,n*.0042,3)*75,s=Qu.fbm2(n*.0016+i*13.1,t*3e-4,2)*90;a+=o+s;let c=ad(a),l=c[0],u=c[1],d=Math.sqrt(1+u*u),f=od(Math.abs(u)/1.6,0,1),p=1-f;p>.01&&(l+=p*(Qu.fbm2(e*.012,n*.012,4)*5.5+Math.sin(e*.55+Qu.noise2(e*.03,n*.03)*3)*.18));let m=(l-t)/d;if(Math.abs(m)<60){let r=Qu.fbm3(e*.021,t*.021,n*.021,4),i=Qu.ridge3(e*.045,t*.06,n*.045,3),a=(r*16+i*9-3)*f,o=Qu.fbm3(e*.03,t*.05,n*.03,3),s=Math.max(0,o-.18)*30*p,c=Qu.noise3(e*.22,t*.22,n*.22)*.55;m+=a+s+c}for(let r=0;r<ld.length;r++){let i=ld[r],a=e-i.x,o=n-i.z,s=a*a+o*o,c=i.r;if(s<c*c*4){let r=t-i.y;if(r>-140&&r<140){let a=Math.sqrt(s),o=sd(c*1.9,c*.9,a)*sd(140,70,Math.abs(r)),l=i.y+Qu.fbm2(e*.05,n*.05,3)*.8-t;m+=(l-m)*o}}}return m}function dd(e,t,n,r=.35,i=[0,0,0]){i[0]=ud(e+r,t,n)-ud(e-r,t,n),i[1]=ud(e,t+r,n)-ud(e,t-r,n),i[2]=ud(e,t,n+r)-ud(e,t,n-r);let a=Math.hypot(i[0],i[1],i[2])||1;return i[0]/=a,i[1]/=a,i[2]/=a,i}function fd(e,t,n,r,i,a,o,s=.4){let c=0,l=ud(e,t,n);if(l>0)return 0;for(;c<o;){let u=Math.max(s,-l*.7),d=Math.min(o,c+u),f=ud(e+r*d,t+i*d,n+a*d);if(f>0){let o=c,s=d;for(let c=0;c<6;c++){let c=(o+s)*.5;ud(e+r*c,t+i*c,n+a*c)>0?s=c:o=c}return(o+s)*.5}if(l=f,c=d,d>=o)break}return-1}function pd(e,t,n=0,r=-10985){let i=n,a=ud(e,i,t);if(a>0)return i;for(;i>r;){let n=i-Math.max(4,-a*.8),r=ud(e,n,t);if(r>0){let r=n,a=i;for(let n=0;n<12;n++){let n=(r+a)*.5;ud(e,n,t)>0?r=n:a=n}return(r+a)*.5}a=r,i=n}return r}function md(e,t,n,r){let i=1/0,a=-1/0;for(let t=0;t<=4;t++)for(let o=0;o<=4;o++){let s=e+r*t/4,c=td(n+r*o/4),l=Math.abs(s-c);for(let e=-170;e<=170;e+=34){let t=ad(Math.max(0,l+e))[0];t<i&&(i=t),t>a&&(a=t)}}return t>a+45?-1:+(t+r<i-45)}var hd=32,gd=128,_d=520,vd=[0,96,230],yd=class{constructor(e){this.workers=[],this.idle=[],this.queue=[],this.pending=new Map,this.nextId=1;for(let t=0;t<e;t++){let e=new Worker(new URL(new URL(`terrainWorker-Pk1BIAiD.js`,import.meta.url).href,``+import.meta.url),{type:`module`});e.onmessage=t=>this._done(e,t.data),this.workers.push(e),this.idle.push(e)}}request(e,t){return e.id=this.nextId++,this.queue.push({job:e,cb:t}),e.id}pump(e){if(this.idle.length&&this.queue.length)for(this.queue.sort((t,n)=>e(t.job)-e(n.job));this.idle.length&&this.queue.length;){let e=this.queue.shift();if(e.job.cancelled)continue;let t=this.idle.pop();this.pending.set(e.job.id,e),t.postMessage({id:e.job.id,ox:e.job.ox,oy:e.job.oy,oz:e.job.oz,n:hd,v:e.job.v})}}_done(e,t){this.idle.push(e);let n=this.pending.get(t.id);this.pending.delete(t.id),n&&!n.job.cancelled&&n.cb(t)}get busy(){return this.pending.size+this.queue.length}},bd=class{constructor(e,t,n,r){this.level=e,this.ix=t,this.iy=n,this.iz=r,this.size=hd<<e,this.v=1<<e,this.x=t*this.size,this.y=n*this.size,this.z=r*this.size,this.state=0,this.cls=md(this.x,this.y,this.z,this.size),this.cls!==0&&(this.state=2),this.mesh=null,this.children=null,this.job=null,this.lastUsed=0}key(){return`${this.level},${this.ix},${this.iy},${this.iz}`}distTo(e){let t=Math.max(this.x-e.x,0,e.x-(this.x+this.size)),n=Math.max(this.y-e.y,0,e.y-(this.y+this.size)),r=Math.max(this.z-e.z,0,e.z-(this.z+this.size));return Math.sqrt(t*t+n*n+r*r)}},xd=class{constructor(e,t){this.scene=e,this.material=t,this.group=new W,this.group.name=`terrain`,e.add(this.group);let n=typeof navigator<`u`&&navigator.hardwareConcurrency||4;this.pool=new yd(Math.max(2,Math.min(8,n-1))),this.roots=new Map,this.frame=0,this.focus=new U,this.meshCount=0,this.triCount=0,this.maxMeshes=900,this.allMeshed=new Set}_request(e){e.state=1;let t={ox:e.x,oy:e.y,oz:e.z,v:e.v,node:e};e.job=t,this.pool.request(t,t=>this._onMesh(e,t))}_onMesh(e,t){if(e.job=null,e.state=2,t.empty)return;let n=new Mr;n.setAttribute(`position`,new _r(t.P,3)),n.setAttribute(`normal`,new _r(t.N,3)),n.setAttribute(`ao`,new _r(t.AO,1)),n.setIndex(new _r(t.I,1)),n.computeBoundingSphere(),n.computeBoundingBox();let r=new K(n,this.material);r.castShadow=!0,r.receiveShadow=!0,r.matrixAutoUpdate=!1,r.updateMatrix(),r.visible=!1,r.userData.node=e,e.mesh=r,this.group.add(r),this.allMeshed.add(e),this.meshCount++,this.triCount+=t.I.length/3}_dispose(e){if(e.job&&(e.job.cancelled=!0,e.job=null,e.state===1&&(e.state=0)),e.mesh&&(this.group.remove(e.mesh),this.triCount-=e.mesh.geometry.index.count/3,e.mesh.geometry.dispose(),e.mesh=null,this.meshCount--,this.allMeshed.delete(e),e.cls===0&&(e.state=0)),e.children){for(let t of e.children)this._dispose(t);e.children=null}}_update(e,t){if(e.lastUsed=this.frame,e.cls!==0)return!0;let n=e.distTo(t);if(e.level>0&&n<vd[e.level]){if(!e.children){e.children=[];let t=e.level-1;for(let n=0;n<2;n++)for(let r=0;r<2;r++)for(let i=0;i<2;i++)e.children.push(new bd(t,e.ix*2+i,e.iy*2+r,e.iz*2+n))}let n=!0;for(let r of e.children)this._update(r,t)||(n=!1);if(n)return e.mesh&&(e.mesh.visible=!1),!0;for(let t of e.children)this._hideSubtree(t);return e.state===0&&this._request(e),e.mesh&&(e.mesh.visible=!0),e.state===2}if(e.children){if(e.state===2){for(let t of e.children)this._dispose(t);e.children=null}else{e.state===0&&this._request(e);let n=!0;for(let r of e.children)this._update(r,t)||(n=!1);return n}}return e.state===0&&this._request(e),e.mesh&&(e.mesh.visible=!0),e.state===2}_hideSubtree(e){if(e.mesh&&(e.mesh.visible=!1),e.children)for(let t of e.children)this._hideSubtree(t)}update(e){this.frame++,this.focus.copy(e);let t=e,n=_d,r=Math.floor((t.x-n)/gd),i=Math.floor((t.x+n)/gd),a=Math.floor((t.y-n)/gd),o=Math.floor((t.y+n)/gd),s=Math.floor((t.z-n)/gd),c=Math.floor((t.z+n)/gd);for(let e=s;e<=c;e++)for(let s=a;s<=o;s++)for(let a=r;a<=i;a++){if(s*gd>10)continue;let r=`2,${a},${s},${e}`,i=this.roots.get(r);i||(i=new bd(2,a,s,e),this.roots.set(r,i)),!(i.distTo(t)>n)&&this._update(i,t)}if(this.frame%30==0)for(let[e,t]of this.roots)this.frame-t.lastUsed>60&&(this._dispose(t),this.roots.delete(e));this.pool.pump(e=>{let t=e.node;return t.distTo(this.focus)-(2-t.level)*6+(t.level===2?-40:0)})}get loading(){return this.pool.busy}},Sd=new vo,Cd=new Map,wd=8;function Td(e){wd=e}function Ed(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`failed `+e)),r.src=e})}function Dd(t,{srgb:n=!1,repeat:r=1}={}){let i=t+n;if(Cd.has(i))return Cd.get(i);let a=Sd.load(`./tex/${t}.jpg`);return a.wrapS=a.wrapT=e,a.anisotropy=wd,a.colorSpace=n?Ie:``,r!==1&&a.repeat.set(r,r),Cd.set(i,a),a}async function Od(t,{ao:n=!0,metal:r=!1,defaultAO:i=255,defaultMetal:a=0}={}){let o=`orm:`+t;if(Cd.has(o))return Cd.get(o);let[s,l,u]=await Promise.all([Ed(`./tex/${t}_roughness.jpg`),n?Ed(`./tex/${t}_ao.jpg`).catch(()=>null):Promise.resolve(null),r?Ed(`./tex/${t}_metalness.jpg`).catch(()=>null):Promise.resolve(null)]),d=s.width,f=s.height,p=document.createElement(`canvas`);p.width=d,p.height=f;let m=p.getContext(`2d`,{willReadFrequently:!0}),h=e=>(m.clearRect(0,0,d,f),m.drawImage(e,0,0,d,f),m.getImageData(0,0,d,f).data),g=h(s),_=l?h(l):null,v=u?h(u):null,y=m.createImageData(d,f),b=y.data;for(let e=0;e<b.length;e+=4)b[e]=_?_[e]:i,b[e+1]=g[e],b[e+2]=v?v[e]:a,b[e+3]=255;m.putImageData(y,0,0);let x=new zi(p);return x.wrapS=x.wrapT=e,x.anisotropy=wd,x.colorSpace=``,x.generateMipmaps=!0,x.minFilter=c,x.needsUpdate=!0,Cd.set(o,x),x}async function kd(e,t={}){let{repeat:n=1,metal:r=!1,ao:i=!1,color:a=16777215,roughness:o=1,metalness:s=+!!r,normalScale:c=1,envMapIntensity:l=1}=t,u=await Od(e,{ao:i,metal:r}),d=Dd(e+`_color`,{srgb:!0}),f=Dd(e+`_normal`),p=new J({map:d,normalMap:f,roughnessMap:u,metalnessMap:r?u:null,aoMap:i?u:null,color:a,roughness:o,metalness:s,envMapIntensity:l});p.normalScale.set(c,c);let m=e=>{e&&e.repeat.set(n,n)};return n!==1&&(p.map=d.clone(),p.normalMap=f.clone(),p.roughnessMap=u.clone(),r&&(p.metalnessMap=p.roughnessMap),i&&(p.aoMap=p.roughnessMap),[p.map,p.normalMap,p.roughnessMap].forEach(e=>{m(e),e.needsUpdate=!0})),p}async function Ad({color:t=15329249,repeat:n=4,rough:r=[.32,.5],normalScale:i=.35,metalness:a=0}={}){let o=`painted-rough:${r[0]}:${r[1]}`,s=Cd.get(o);if(!s){let t=await Ed(`./tex/whitepaint_roughness.jpg`),n=document.createElement(`canvas`);n.width=t.width,n.height=t.height;let i=n.getContext(`2d`,{willReadFrequently:!0});i.drawImage(t,0,0);let a=i.getImageData(0,0,n.width,n.height),c=a.data,l=255,u=0;for(let e=0;e<c.length;e+=4)c[e]<l&&(l=c[e]),c[e]>u&&(u=c[e]);let d=Math.max(1,u-l);for(let e=0;e<c.length;e+=4){let t=(r[0]+(r[1]-r[0])*((c[e]-l)/d))*255;c[e]=c[e+1]=c[e+2]=t,c[e+3]=255}i.putImageData(a,0,0),s=new zi(n),s.wrapS=s.wrapT=e,s.colorSpace=``,s.anisotropy=wd,Cd.set(o,s)}let c=s.clone();c.repeat.set(n,n),c.needsUpdate=!0;let l=Dd(`whitepaint_normal`).clone();l.repeat.set(n,n),l.needsUpdate=!0;let u=new J({color:t,roughness:1,metalness:a,normalMap:l,roughnessMap:c});return u.normalScale.set(i,i),u}function jd(e,{scale:t=3.5,wear:n=.6,normal:r=.8,key:i=`w`}={}){let a={c:Dd(`wallpanel_color`,{srgb:!1}),o:Dd(`wallpanel_orm`),n:Dd(`wallpanel_normal`)},o=e.onBeforeCompile;e.onBeforeCompile=(e,i)=>{o?.(e,i),e.uniforms.tWC={value:a.c},e.uniforms.tWO={value:a.o},e.uniforms.tWN={value:a.n},e.uniforms.uWS={value:t},e.uniforms.uWW={value:n},e.uniforms.uWN={value:r},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vWP; varying vec3 vWN;`).replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vWN = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform sampler2D tWC, tWO, tWN; uniform float uWS, uWW, uWN; varying vec3 vWP; varying vec3 vWN;
        vec3 triW(){ vec3 w = pow(abs(normalize(vWN)), vec3(4.0)); return w / (w.x + w.y + w.z); }
        vec4 tri(sampler2D t){ vec3 w = triW(); vec3 p = vWP * uWS; return texture2D(t, p.zy) * w.x + texture2D(t, p.xz) * w.y + texture2D(t, p.xy) * w.z; }`).replace(`#include <map_fragment>`,`#include <map_fragment>
        vec3 wc = tri(tWC).rgb; // linear-ish grime/stain luminance around ~0.85
        diffuseColor.rgb *= mix(vec3(1.0), wc / 0.85, uWW);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
        vec4 wo = tri(tWO);
        roughnessFactor = clamp(mix(roughnessFactor, roughnessFactor * (0.6 + wo.g * 1.1), uWW), 0.05, 1.0);`).replace(`#include <normal_fragment_maps>`,`#include <normal_fragment_maps>
        {
          vec3 tn = tri(tWN).xyz * 2.0 - 1.0;
          // perturb the view-space normal with the tangent-less triplanar detail (small-angle approx)
          vec3 dn = (viewMatrix * vec4(tn.x, tn.y, 0.0, 0.0)).xyz;
          normal = normalize(normal + dn * uWN * 0.6);
        }`)};let s=e.customProgramCacheKey?.bind(e);return e.customProgramCacheKey=()=>(s?s():``)+`|weathered-`+i,e}async function Md(){let[e,t,n,r]=await Promise.all([Od(`rock1`,{ao:!0}),Od(`sand`,{ao:!0}),Od(`sediment`,{ao:!0}),Od(`rock2`,{ao:!0})]),i={tRockC:{value:Dd(`rock1_color`,{srgb:!0})},tRockN:{value:Dd(`rock1_normal`)},tRockO:{value:e},tRock2C:{value:Dd(`rock2_color`,{srgb:!0})},tRock2N:{value:Dd(`rock2_normal`)},tRock2O:{value:r},tSandC:{value:Dd(`sand_color`,{srgb:!0})},tSandN:{value:Dd(`sand_normal`)},tSandO:{value:t},tSedC:{value:Dd(`sediment_color`,{srgb:!0})},tSedN:{value:Dd(`sediment_normal`)},tSedO:{value:n}},a=new J({color:16777215,roughness:1,metalness:0,envMapIntensity:0});return a.onBeforeCompile=e=>{Object.assign(e.uniforms,i),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
        attribute float ao;
        varying float vAO;
        varying vec3 vTpPos;
        varying vec3 vTpNrm;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        vAO = ao;
        vTpPos = (modelMatrix * vec4(position, 1.0)).xyz;
        vTpNrm = normalize(mat3(modelMatrix) * normal);`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
        uniform sampler2D tRockC, tRockN, tRockO, tRock2C, tRock2N, tRock2O, tSandC, tSandN, tSandO, tSedC, tSedN, tSedO;
        varying float vAO;
        varying vec3 vTpPos;
        varying vec3 vTpNrm;
        vec3 gTpW; vec3 gTpNrm; float gTpAO; float gTpRough;

        float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
          return mix(mix(h21(i),h21(i+vec2(1,0)),f.x), mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x), f.y); }
        float vnoise3(vec3 p){ return (vnoise(p.xz) + vnoise(p.xy + 17.0) + vnoise(p.zy + 31.0)) / 3.0; }

        // triplanar sampling
        vec4 tpC(sampler2D t, vec3 p, vec3 w, float s){
          return texture2D(t, p.zy * s) * w.x + texture2D(t, p.xz * s) * w.y + texture2D(t, p.xy * s) * w.z;
        }
        // whiteout blended triplanar normal (world space)
        vec3 tpN(sampler2D t, vec3 p, vec3 n, vec3 w, float s, float strength){
          vec3 tx = texture2D(t, p.zy * s).xyz * 2.0 - 1.0;
          vec3 ty = texture2D(t, p.xz * s).xyz * 2.0 - 1.0;
          vec3 tz = texture2D(t, p.xy * s).xyz * 2.0 - 1.0;
          tx.xy *= strength; ty.xy *= strength; tz.xy *= strength;
          // swizzle to world
          vec3 nx = vec3(tx.xy + n.zy, abs(tx.z) * n.x);
          vec3 ny = vec3(ty.xy + n.xz, abs(ty.z) * n.y);
          vec3 nz = vec3(tz.xy + n.xy, abs(tz.z) * n.z);
          return normalize(nx.zyx * w.x + ny.xzy * w.y + nz.xyz * w.z);
        }
      `).replace(`#include <map_fragment>`,`
        vec3 Nw = normalize(vTpNrm);
        vec3 bw = pow(abs(Nw), vec3(6.0));
        bw /= (bw.x + bw.y + bw.z);
        vec3 P = vTpPos;
        float depth = max(0.0, -P.y);
        float macro = vnoise3(P * 0.025) * 0.6 + vnoise3(P * 0.11) * 0.4;
        float upness = Nw.y;
        // layer weights
        float wRock = 1.0 - smoothstep(0.62, 0.86, upness + (macro - 0.5) * 0.35);
        float deepK = smoothstep(180.0, 900.0, depth);
        float wFlat = 1.0 - wRock;
        float wSand = wFlat * (1.0 - deepK);
        float wSed = wFlat * deepK;
        float r2 = smoothstep(0.35, 0.65, vnoise3(P * 0.012 + 3.0));

        // rock at two scales to kill tiling
        vec3 rockC = mix(tpC(tRockC, P, bw, 0.11).rgb, tpC(tRock2C, P, bw, 0.08).rgb, r2);
        rockC *= mix(0.75, 1.15, tpC(tRockC, P, bw, 0.013).g * 1.5);
        vec3 rockO = mix(tpC(tRockO, P, bw, 0.11).rgb, tpC(tRock2O, P, bw, 0.08).rgb, r2);
        vec3 rockN = normalize(mix(tpN(tRockN, P, Nw, bw, 0.11, 1.4), tpN(tRock2N, P, Nw, bw, 0.08, 1.4), r2));

        vec3 sandC = tpC(tSandC, P, bw, 0.22).rgb * mix(0.85, 1.1, macro);
        vec3 sandO = tpC(tSandO, P, bw, 0.22).rgb;
        vec3 sandN = tpN(tSandN, P, Nw, bw, 0.22, 1.0);

        vec3 sedC = tpC(tSedC, P, bw, 0.09).rgb;
        // abyssal ooze: paler, greyer with depth, darker patches
        sedC = mix(sedC, vec3(dot(sedC, vec3(0.33))) * vec3(0.95, 0.9, 0.82), 0.45) * mix(0.8, 1.1, macro);
        vec3 sedO = tpC(tSedO, P, bw, 0.09).rgb;
        vec3 sedN = tpN(tSedN, P, Nw, bw, 0.09, 0.8);

        // deep rock is darker basalt
        rockC *= mix(vec3(1.0), vec3(0.55, 0.55, 0.6), smoothstep(800.0, 3000.0, depth));

        vec3 albedo = rockC * wRock + sandC * wSand + sedC * wSed;
        vec3 orm = rockO * wRock + sandO * wSand + sedO * wSed;
        gTpNrm = normalize(rockN * wRock + sandN * wSand + sedN * wSed);
        gTpAO = orm.r * vAO;
        gTpRough = orm.g;
        diffuseColor.rgb *= albedo;
      `).replace(`#include <roughnessmap_fragment>`,`float roughnessFactor = roughness * mix(0.75, 1.0, gTpRough);`).replace(`#include <normal_fragment_maps>`,`normal = normalize((viewMatrix * vec4(gTpNrm, 0.0)).xyz);`).replace(`#include <aomap_fragment>`,`
        float ambientOcclusion = gTpAO;
        reflectedLight.indirectDiffuse *= ambientOcclusion;
        reflectedLight.directDiffuse *= mix(1.0, ambientOcclusion, 0.6);
      `)},a.customProgramCacheKey=()=>`terrain-tp-v1`,Fu(a,{caustics:!0}),a}var Nd=Zu(771),Pd=9.80665,Fd=101325;function Id(e){return e=Math.max(0,e),1023+4.3*(1-Math.exp(-e/600))+.00435*e}function Ld(e){return e=Math.max(0,e),Fd+.5*(1023+Id(e))*Pd*e}var Rd=e=>e/1e5;function zd(e){return e=Math.max(0,e),e<50?27.2-e*.01:1.55+25.2*Math.exp(-(e-50)/380)+(e>4e3?(e-4e3)*12e-5:0)}function Bd(e){return e=Math.max(0,e),34.6+.4*Math.exp(-e/200)-.3*Math.exp(-((e-800)**2)/12e4)}function Vd(e){let t=zd(e),n=Bd(e),r=Math.max(0,e);return 1448.96+4.591*t-.05304*t*t+2374e-7*t**3+1.34*(n-35)+.0163*r+1.675e-7*r*r-.01025*t*(n-35)-7139e-16*t*r**3}function Hd(e){return 4.8-3.6*Math.exp(-((e-750)**2)/16e4)+(e>2e3?.3:0)}var Ud=[0,0,0];function Wd(e,t,n,r,i=0){let a=Math.max(0,-t),o=.35*Math.exp(-a/40),s=.12*Math.exp(-a/900),c=.04,l=Nd.noise3(e*.002,a*.004,r*.004)*Math.PI,u=Nd.noise3(n*.002+9,a*.003,r*.003)*Math.PI;return Ud[0]=o*.8+Math.cos(l)*s+c*.3+i*Math.cos(u),Ud[2]=o*.4+Math.sin(l)*s+c*.95+i*Math.sin(u),Ud[1]=Nd.noise3(e*.01,t*.01,r*.02)*.02*(1+i*3),Ud}function Gd(e){return e<200?[`表層 (有光層)`,`EPIPELAGIC`]:e<1e3?[`中深層 (薄明層)`,`MESOPELAGIC`]:e<4e3?[`漸深層 (漸深海帯)`,`BATHYPELAGIC`]:e<6e3?[`深海層 (深海平原)`,`ABYSSOPELAGIC`]:[`超深海層 (海溝)`,`HADOPELAGIC`]}var Kd=new U,qd=new U;new Dt;var Jd=new cn(0,0,0,`YXZ`),Yd=[0,0,0],Xd={name:`DSV-11 わだつみ`,length:8.4,beam:3,height:3.6,dryMass:11800,V0:11.681+.315,hullCompress:384e-8,thermalExp:6e-5,vbtCap:400,vbtFloodRate:6,vbtPumpMaxQ:2,vbtPumpPower:6e3,dropWeightMass:120,BG:.26,trimMaxOffset:.075,crushDepth:14200,designDepth:11e3,amSurge:.12,amSway:.75,amHeave:.9,Iyaw:72e3,Ipitch:66e3,Iroll:21e3,cdaSurge:1.55,cdaSway:10.5,cdaHeave:6.4,thrMain:3600,thrVert:2600,thrLat:1500,pwrMain:16e3,pwrVert:11e3,pwrLat:6e3},Zd=[{id:`T1`,name:`左舷主推進`,en:`PORT MAIN`,pos:[-1.35,-.2,3.3],axis:[0,0,-1],max:Xd.thrMain,pwr:Xd.pwrMain},{id:`T2`,name:`右舷主推進`,en:`STBD MAIN`,pos:[1.35,-.2,3.3],axis:[0,0,-1],max:Xd.thrMain,pwr:Xd.pwrMain},{id:`T3`,name:`前部垂直`,en:`FWD VERT`,pos:[0,.2,-1.6],axis:[0,1,0],max:Xd.thrVert,pwr:Xd.pwrVert},{id:`T4`,name:`後部垂直`,en:`AFT VERT`,pos:[0,.2,2.4],axis:[0,1,0],max:Xd.thrVert,pwr:Xd.pwrVert},{id:`T5`,name:`艦首横`,en:`BOW LAT`,pos:[0,-.3,-3.2],axis:[1,0,0],max:Xd.thrLat,pwr:Xd.pwrLat},{id:`T6`,name:`艦尾横`,en:`STERN LAT`,pos:[0,-.3,3.6],axis:[1,0,0],max:Xd.thrLat,pwr:Xd.pwrLat}],Qd=[[0,0,-4.1,.9],[0,0,4.1,.7],[-1.45,0,0,.6],[1.45,0,0,.6],[0,1.75,.5,.5],[-1,-1.75,-2.4,.25],[1,-1.75,-2.4,.25],[-1,-1.75,2.4,.25],[1,-1.75,2.4,.25],[0,-1.2,-3.5,.5],[-1.1,.6,-2.8,.55],[1.1,.6,-2.8,.55],[-1.35,-.2,3.6,.5],[1.35,-.2,3.6,.5]],$d=class{constructor(){this.pos=new U(12,-1.5,150),this.vel=new U,this.yaw=-.35,this.pitch=0,this.roll=0,this.w=new U,this.quat=new Dt,this.vbt=0,this.vbtCmd=0,this.vbtValveOK=!0,this.vbtPumpOK=!0,this.vbtIsolated=!1,this.trim=0,this.trimCmd=0,this.trimPumpOK=!0,this.weights={descent:2,ascent:2},this.floodL=0,this.thr=Zd.map(e=>({...e,cmd:0,rpm:0,thrust:0,power:0,temp:12,health:1,fault:null,enabled:!0,jam:0})),this.input={surge:0,yaw:0,heave:0,sway:0,pitch:0},this.powerAvail=1,this.thrustLimit=1,this.contacts=[],this.grounded=!1,this.depth=-this.pos.y,this.altitude=999,this.speed=0,this.extraMass=0,this.extForce=new U,this.extTorque=new U,this.currentExtra=0,this.propColliders=[],this.siltStir=0,this.time=0,this.maxDepth=0,this.distance=0,this._updateQuat()}_updateQuat(){Jd.set(this.pitch,this.yaw,this.roll,`YXZ`),this.quat.setFromEuler(Jd)}forward(e=new U){return e.set(0,0,-1).applyQuaternion(this.quat)}toWorld(e,t=new U){return t.set(e[0],e[1],e[2]).applyQuaternion(this.quat).add(this.pos)}get totalMass(){return Xd.dryMass+this.vbt*1.025+(this.weights.descent+this.weights.ascent)*Xd.dropWeightMass+this.floodL*1.025+this.extraMass}displacedVolume(e,t){return Xd.V0*(1-Xd.hullCompress*e)*(1+Xd.thermalExp*(t-20))}netBuoyancy(e=this.depth){let t=Id(e),n=this.displacedVolume(e,zd(e));if(this.pos.y>-1.6){let e=Et.clamp((-this.pos.y+1.8)/3.4,.15,1);return t*n*e*Pd-this.totalMass*Pd}return t*n*Pd-this.totalMass*Pd}get trimState(){return-this.netBuoyancy()/Pd}dropWeight(e){return this.weights[e]>0&&(this.weights[e]--,!0)}step(e,t){this.time+=e;let n=Math.max(0,-this.pos.y);this.depth=n;let r=Id(n),i=Ld(n)-101325;if(this.vbtIsolated)this.vbtFlow=0;else if(this.vbtCmd>0&&this.vbtValveOK){let t=Xd.vbtFloodRate*this.vbtCmd*Math.min(1,.25+Math.sqrt(i/2e5));this.vbt=Math.min(Xd.vbtCap,this.vbt+t*e),this.vbtFlow=t}else if(this.vbtCmd<0&&this.vbtPumpOK&&t?.powered(`HYD`)!==!1){let t=Xd.vbtPumpPower*.62/Math.max(i,1e5)*1e3,n=Math.min(Xd.vbtPumpMaxQ,t)*-this.vbtCmd;this.vbt=Math.max(0,this.vbt-n*e),this.vbtFlow=-n,this.vbtPumpW=800+Xd.vbtPumpPower*-this.vbtCmd*Math.min(1,i/3e6+.15)}else this.vbtFlow=0;(!(this.vbtCmd<0&&this.vbtPumpOK)||this.vbtFlow===0)&&(this.vbtPumpW=0),this.trimPumpOK&&t?.powered(`HYD`)!==!1&&(this.trim=Et.clamp(this.trim+this.trimCmd*e*.05,-1,1)),this._mix(t);let a=0,o=Kd.set(0,0,0),s=qd.set(0,0,0),c=zd(n);for(let t of this.thr){let n=t.enabled&&!t.fault?t.cmd*this.powerAvail*this.thrustLimit:0;t.fault===`degraded`&&(n=t.cmd*.45*this.powerAvail),t.jam>0&&(n*=Math.max(0,1-t.jam)),t.rpm+=(n-t.rpm)*Math.min(1,e/.45);let i=t.rpm,l=i>=0?1:.72;t.thrust=t.max*Math.sign(i)*i*i*l*(r/1025),t.power=t.pwr*Math.abs(i)**3*(1+t.jam*2.5)+(Math.abs(i)>.01?60:0),a+=t.power,t.temp+=(t.power*8e-5-(t.temp-c)*.02)*e;let u=t.axis,d=t.pos;o.x+=u[0]*t.thrust,o.y+=u[1]*t.thrust,o.z+=u[2]*t.thrust,s.x+=d[1]*u[2]*t.thrust-d[2]*u[1]*t.thrust,s.y+=d[2]*u[0]*t.thrust-d[0]*u[2]*t.thrust,s.z+=d[0]*u[1]*t.thrust-d[1]*u[0]*t.thrust}this.thrPower=a;let l=Wd(this.pos.x,this.pos.y,this.pos.z,this.time,this.currentExtra),u=new U(this.vel.x-l[0],this.vel.y-l[1],this.vel.z-l[2]),d=this.quat.clone().invert(),f=u.clone().applyQuaternion(d),p=new U(-.5*r*Xd.cdaSway*f.x*Math.abs(f.x)-120*f.x,-.5*r*Xd.cdaHeave*f.y*Math.abs(f.y)-150*f.y,-.5*r*Xd.cdaSurge*f.z*Math.abs(f.z)-60*f.z);o.add(p);let m=this.totalMass,h=o.clone().applyQuaternion(this.quat),g=this.netBuoyancy(n);h.y+=g,h.add(this.extForce),this.pos.y>-4&&(h.y+=Math.sin(this.time*.9)*2500*(1+this.pos.y/4));let _=new U(Xd.amSway,Xd.amHeave,Xd.amSurge),v=h.clone().applyQuaternion(d);v.x/=m*(1+_.x),v.y/=m*(1+_.y),v.z/=m*(1+_.z);let y=v.applyQuaternion(this.quat);this.acc=y.clone(),this.vel.addScaledVector(y,e);let b=m*Pd,x=this.trim*Xd.trimMaxOffset+this.floodL*2e-5+(this.cgOffset||0),S=-b*Xd.BG*Math.sin(this.pitch)-b*x*Math.cos(this.pitch),C=-b*Xd.BG*Math.sin(this.roll)+(this.rollBias||0)*b,w=this.w,T=new U(s.x+S,s.y,s.z+C).add(this.extTorque),E=Math.abs(f.z);T.x+=-w.x*Math.abs(w.x)*42e4-w.x*32e3,T.y+=-w.y*Math.abs(w.y)*31e4-w.y*(16e3+E*2e4),T.z+=-w.z*Math.abs(w.z)*2e5-w.z*16e3,T.z+=-w.y*E*3500,w.x+=T.x/(Xd.Ipitch*1.4)*e,w.y+=T.y/(Xd.Iyaw*1.5)*e,w.z+=T.z/(Xd.Iroll*1.3)*e,this.pitch+=w.x*e,this.yaw+=w.y*e,this.yaw>Math.PI?this.yaw-=2*Math.PI:this.yaw<-Math.PI&&(this.yaw+=2*Math.PI),this.roll+=w.z*e,this.pitch=Et.clamp(this.pitch,-1.2,1.2),this.roll=Et.clamp(this.roll,-1,1),this._updateQuat(),Number.isFinite(this.vel.x+this.vel.y+this.vel.z)||this.vel.set(0,0,0),Number.isFinite(w.x+w.y+w.z)||w.set(0,0,0);let D=this.pos.clone();this.pos.addScaledVector(this.vel,e),this.pos.y>.4&&(this.pos.y=.4,this.vel.y>0&&(this.vel.y*=.3)),this._collide(e),this.distance+=D.distanceTo(this.pos),this.speed=f.z*-1,this.vbody=f,this.depth=Math.max(0,-this.pos.y),this.depth>this.maxDepth&&(this.maxDepth=this.depth),this.extForce.set(0,0,0),this.extTorque.set(0,0,0)}_mix(){let e=this.input,t=e=>Et.clamp(e,-1,1),[n,r,i,a,o,s]=this.thr;n.cmd=t(e.surge+e.yaw*.55),r.cmd=t(e.surge-e.yaw*.55),i.cmd=t(e.heave-e.pitch*.6),a.cmd=t(e.heave+e.pitch*.6),o.cmd=t(e.sway+e.yaw*.6),s.cmd=t(e.sway-e.yaw*.6)}_collide(e){this.contacts.length=0,this.grounded=!1;let t=ud(this.pos.x,this.pos.y,this.pos.z),n=!1;for(let e of this.propColliders)if(e.center.distanceToSquared(this.pos)<(e.radius+7)**2){n=!0;break}if(t<-9&&!n){this.nearTerrain=!1;return}this.nearTerrain=!0;let r=new U;for(let t of Qd){this.toWorld(t,r);let i=ud(r.x,r.y,r.z)+t[3],a=null;if(i>0&&(dd(r.x,r.y,r.z,.3,Yd),a=new U(-Yd[0],-Yd[1],-Yd[2])),n)for(let e of this.propColliders){let n=e.test(r,t[3]);n&&n.depth>(i>0?i:0)&&(i=n.depth,a=n.normal)}if(i>0&&a){let n=this.vel.dot(a);if(this.pos.addScaledVector(a,i*.8),n<0){let i=-n;this.vel.addScaledVector(a,-n*1.08);let o=this.vel.clone().addScaledVector(a,-this.vel.dot(a));this.vel.addScaledVector(o,-Math.min(1,e*3.5)),this.contacts.push({point:r.clone(),normal:a.clone(),impact:i,probe:t});let s=new U(t[0],t[1],t[2]),c=a.clone().applyQuaternion(this.quat.clone().invert()),l=s.cross(c).multiplyScalar(i*2.2);this.w.x+=l.x*.05,this.w.y+=l.y*.03,this.w.z+=l.z*.05}t[1]<-1.5&&a.y>.5&&(this.grounded=!0),this.siltStir=Math.min(1,this.siltStir+(.05+this.vel.length()*.4)*e*6)}}}serialize(){return{pos:this.pos.toArray(),vel:this.vel.toArray(),yaw:this.yaw,pitch:this.pitch,roll:this.roll,vbt:this.vbt,trim:this.trim,weights:{...this.weights},floodL:this.floodL,time:this.time,maxDepth:this.maxDepth,distance:this.distance,manipulatorLost:!!this.manipulatorLost,vbtIsolated:this.vbtIsolated,thrustLimit:this.thrustLimit,vbtValveOK:this.vbtValveOK,vbtPumpOK:this.vbtPumpOK,trimPumpOK:this.trimPumpOK,_vbtStuckOpen:!!this._vbtStuckOpen,thr:this.thr.map(e=>({health:e.health,fault:e.fault,enabled:e.enabled,jam:e.jam,temp:e.temp}))}}restore(e){let t=(e,t=0)=>Number.isFinite(e)?e:t;this.pos.fromArray(e.pos),this.vel.fromArray(e.vel||[0,0,0]),this.yaw=t(e.yaw),this.pitch=t(e.pitch),this.roll=t(e.roll),this.vbt=t(e.vbt),this.trim=t(e.trim),this.weights={descent:2,ascent:2,...e.weights},this.floodL=t(e.floodL),this.time=t(e.time),this.maxDepth=t(e.maxDepth),this.distance=t(e.distance),this.manipulatorLost=!!e.manipulatorLost,this.vbtIsolated=!!e.vbtIsolated,this.thrustLimit=t(e.thrustLimit,1),this.vbtValveOK=e.vbtValveOK!==!1,this.vbtPumpOK=e.vbtPumpOK!==!1,this.trimPumpOK=e.trimPumpOK!==!1,this._vbtStuckOpen=!!e._vbtStuckOpen,Number.isFinite(this.pos.x+this.pos.y+this.pos.z)||this.pos.set(12,-1.5,150),e.thr?.forEach((e,t)=>Object.assign(this.thr[t],e)),this._updateQuat()}},ef=(e,t,n)=>e<t?t:e>n?n:e,tf=[{id:`PROP`,name:`推進系`,en:`PROPULSION`,bus:`A`,nominal:0},{id:`LIGHT`,name:`外部照明`,en:`EXT LIGHTS`,bus:`A`,nominal:0},{id:`HYD`,name:`油圧/VBTポンプ`,en:`HYDRAULICS`,bus:`A`,nominal:0},{id:`SONAR`,name:`ソナー/DVL`,en:`SONAR/DVL`,bus:`B`,nominal:140},{id:`NAV`,name:`航法/自動操縦`,en:`NAV/AP`,bus:`B`,nominal:180},{id:`LSS`,name:`生命維持`,en:`LIFE SUPPORT`,bus:`E`,nominal:160},{id:`CABIN`,name:`艦内照明/空調`,en:`CABIN`,bus:`B`,nominal:220},{id:`COMMS`,name:`水中通話`,en:`UQC COMMS`,bus:`B`,nominal:90},{id:`HEAT`,name:`暖房`,en:`HEATER`,bus:`B`,nominal:0},{id:`CAM`,name:`外部カメラ`,en:`CAMERAS`,bus:`B`,nominal:110}],nf=[{id:`P1`,name:`電力ペネトレータ A`,en:`PWR PENETRATOR A`,feeds:[`PROP`,`LIGHT`]},{id:`P2`,name:`電力ペネトレータ B`,en:`PWR PENETRATOR B`,feeds:[`HYD`,`HEAT`]},{id:`P3`,name:`信号ペネトレータ`,en:`SIGNAL PENETRATOR`,feeds:[`SONAR`,`CAM`,`COMMS`]},{id:`P4`,name:`油圧ライン貫通部`,en:`HYDRAULIC FEEDTHRU`,feeds:[`HYD`]},{id:`VP`,name:`主観測窓シール`,en:`MAIN VIEWPORT SEAL`,feeds:[]},{id:`HATCH`,name:`ハッチシール`,en:`HATCH SEAL`,feeds:[]}],rf=class e{constructor(e){this.sub=e,this.bat={A:{soc:1,cap:48,v:302,temp:18,online:!0,fault:null,iso:12},B:{soc:1,cap:48,v:302,temp:18,online:!0,fault:null,iso:12},E:{soc:1,cap:6,v:28.4,temp:18,online:!0,fault:null,iso:12}},this.cross=!1,this.breakers=Object.fromEntries(tf.map(e=>[e.id,{...e,closed:!0,tripped:!1,load:0}])),this.breakers.HEAT.closed=!1,this.lights={main:.85,flood:.6,cabin:.35,extFault:0},this.loads={},this.totalPower=0,this.cabinVol=5.6,this.o2=20.9,this.co2=.05,this.cabinP=1.013,this.cabinT=24,this.rh=48,this.o2Bottles=3960,this.o2Flow=.4,this.o2RegOK=!0,this.scrubber={fan:!0,canister:1,spare:2,fanOK:!0},this.emergencyO2=0,this.emergencyMask=!1,this.pilotStress=0,this.pilotHealth=1,this.hypoxia=0,this.hypercapnia=0,this.hypothermia=0,this.hull={integrity:1,fatigue:0,viewportCreep:0,creak:0,crack:0},this.pen=Object.fromEntries(nf.map(e=>[e.id,{...e,leakArea:0,isolated:!1,clamped:0,leakRate:0}])),this.fire={active:!1,intensity:0,loc:null,smoke:0,suppressant:2},this.sensors={depth:!0,dvl:!0,sonar:!0,gyro:!0,comms:!0,cams:!0,depthDrift:0,gyroDrift:0},this.comms={signal:1,lastContact:0},this.messages=[],this.alarmsAck=new Set,this.dead=null,this.flash=0}get busOK(){let e=this;return{A:e.bat.A.online||e.cross&&e.bat.B.online,B:e.bat.B.online||e.cross&&e.bat.A.online,E:e.bat.E.online}}powered(e){let t=this.breakers[e];if(!t||!t.closed||t.tripped)return!1;let n=this.busOK;return t.bus===`E`?n.E||n.A||n.B:n[t.bus]}static orifice(e,t){return .62*e*1e-6*Math.sqrt(Math.max(0,2*t/1025))*1e3}step(t,n){let r=this.sub,i=r.depth,a=Ld(i)-this.cabinP*1e5,o=zd(i),s=this.loads,c=e=>this.powered(e),l=this.bat.A.online?this.bat.A.soc:this.cross&&this.bat.B.online?this.bat.B.soc:0;r.powerAvail=c(`PROP`)?ef(.25+.75*l/.25,0,1)*+(l>0):0,s.PROP=c(`PROP`)?r.thrPower:0,s.LIGHT=c(`LIGHT`)?this.lights.main*2*450+this.lights.flood*4*180:0,s.HYD=c(`HYD`)?250+(r.vbtPumpW||0)+(Math.abs(r.trimCmd)>.01?900:0):0,s.SONAR=c(`SONAR`)?140:0,s.NAV=c(`NAV`)?180:0,s.LSS=c(`LSS`)?60+(this.scrubber.fan&&this.scrubber.fanOK?110:0):0,s.CABIN=c(`CABIN`)?90+this.lights.cabin*130:0,s.COMMS=c(`COMMS`)?90:0,s.HEAT=c(`HEAT`)?1800:0,s.CAM=c(`CAM`)?110:0,r.vbtPumpOK_power=!!c(`HYD`);let u=0,d=0,f=0;for(let e of tf){let t=s[e.id]||0;this.breakers[e.id].load=t,e.bus===`A`?u+=t:e.bus===`B`?d+=t:f+=t}let p=this.busOK,m=p.B?0:f;p.B&&(d+=f/.92),!this.bat.A.online&&this.cross&&(d+=u,u=0),!this.bat.B.online&&this.cross&&(u+=d,d=0),!this.bat.B.online&&!this.cross&&(d=0),!this.bat.A.online&&!this.cross&&(u=0),this.totalPower=u+d+m,this._drain(this.bat.A,u,t,o),this._drain(this.bat.B,d,t,o),this._drain(this.bat.E,m,t,o),this.busA=u,this.busB=d,this.busE=m;let h=this.hull,g=i/Xd.designDepth;h.stress=g,h.fatigue+=Math.max(0,g-.6)**2*t*2e-6+(n.impact||0)*.0015,h.viewportCreep+=g*g*t*12e-7,h.creak=Math.max(0,h.creak-t*2);let _=Math.abs(r.vel.y);Math.random()<t*(.02+g*.06+_*.05*g)&&(h.creak=.4+Math.random()*.6*(.3+g)),i>Xd.crushDepth*(1-h.fatigue*3-(1-h.integrity)*.5-h.crack*.3)&&!this.dead&&(this.dead=`implosion`),i>Xd.designDepth*1.02&&(h.integrity=Math.max(0,h.integrity-t*.002*(i/Xd.designDepth-1)*40));let v=0;for(let n in this.pen){let r=this.pen[n];if(r.leakArea<=0){r.leakRate=0;continue}let i=r.leakArea;r.isolated&&n!==`VP`&&n!==`HATCH`&&(i*=.03),r.clamped>0&&(i*=1-r.clamped),r.leakArea+=r.leakArea*t*.004*g*(r.isolated?.1:1),r.leakRate=e.orifice(i,Math.max(0,a)),v+=r.leakRate}this.inflow=v,r.floodL+=v*t;let y=Math.max(.2,this.cabinVol-r.floodL/1e3);this.cabinP=1.013*(this.cabinVol/y)*(this._airMul??1),r.floodL>120&&this._wet(t,(r.floodL-120)/400),r.floodL>2600&&!this.dead&&(this.dead=`flooded`);let b=this.fire;b.active?(b.intensity=Math.min(1,b.intensity+t*.02*(this.o2/21)),b.smoke=Math.min(1,b.smoke+b.intensity*t*.02),this.o2-=b.intensity*t*.004,this.co2+=b.intensity*t*.002,this.cabinT+=b.intensity*t*.08,b.loc&&this.breakers[b.loc]?.closed&&Math.random()<t*.05&&(this.breakers[b.loc].tripped=!0),this.o2<13&&(b.intensity-=t*.1,b.intensity<=0&&(b.active=!1,this.msg(`火災は酸素欠乏により鎮火`,`info`)))):b.smoke=Math.max(0,b.smoke-t*(this.scrubber.fan&&this.scrubber.fanOK&&c(`LSS`)?.004:5e-4)),this.cabinVol*1e3/22.4;let x=+!this.emergencyMask,S=(.35+this.pilotStress*.4)/60,C=c(`LSS`)&&this.o2RegOK&&this.o2Bottles>0?this.o2Flow/60:0;this.o2Bottles=Math.max(0,this.o2Bottles-C*t);let w=y*1e3;this.o2+=(C-S*x)/w*100*t;let T=S*.85*x,E=c(`LSS`)&&this.scrubber.fan&&this.scrubber.fanOK&&this.scrubber.canister>0,D=(E?.98*Math.min(1,this.scrubber.canister*4):0)*(this.co2/100)*w*.0075;this.co2+=(T-D)/w*100*t,this.scrubber.canister=Math.max(0,this.scrubber.canister-D*t/(1983.6/60*12)),this.o2=ef(this.o2,0,60),this.co2=ef(this.co2,0,20);let O=(c(`HEAT`)?1800:0)+this.totalPower*.02+110+b.intensity*8e3,k=(this.cabinT-o)*42;this.cabinT+=(O-k)/18e3*t,this.rh=ef(this.rh+t*(.004+(this.cabinT-o)*8e-5)-(E?t*.003:0),20,100),this.condensation=ef((this.rh-70)/25,0,1)*ef((this.cabinT-o-5)/15,0,1),this.o2*this.cabinP*10;let A=this.emergencyMask?30:this.o2*this.cabinP;this.hypoxia=ef(this.hypoxia+t*(A<16?(16-A)*.004:-.01),0,1);let j=this.emergencyMask?.2:this.co2*this.cabinP;this.hypercapnia=ef(this.hypercapnia+t*(j>2?(j-2)*.0025:-.01),0,1),this.hypothermia=ef(this.hypothermia+t*(this.cabinT<12?(12-this.cabinT)*15e-5:-.002),0,1);let M=this.emergencyMask?0:b.smoke;this.pilotHealth=ef(this.pilotHealth-t*(this.hypoxia*.004+this.hypercapnia*.003+this.hypothermia*.002+M*.003+(this.cabinP>3?(this.cabinP-3)*.002:0))+t*2e-4,0,1),this.emergencyMask&&(this.emergencyO2=Math.max(0,this.emergencyO2-t/3600),this.emergencyO2<=0&&(this.emergencyMask=!1,this.msg(`緊急呼吸器の酸素が尽きた`,`warn`))),this.pilotStress=ef(this.pilotStress+t*(this.activeCautions>0?.01:-.004),0,1),this.pilotHealth<=0&&!this.dead&&(this.dead=this.hypoxia>this.hypercapnia?`hypoxia`:`co2`),this.bat.A.soc<=0&&this.bat.B.soc<=0&&this.bat.E.soc<=0&&!this.dead&&(this.dead=`power`);let N=Math.hypot(r.pos.x-0,r.pos.y,r.pos.z-150);this.comms.signal=c(`COMMS`)&&this.sensors.comms?ef(1.25-N/14e3,0,1)*(.85+.15*Math.sin(r.time*.3)):0,this.sensors.depth||(this.sensors.depthDrift+=t*.35),this.sensors.gyro||(this.sensors.gyroDrift+=t*.0035),this.flash=Math.max(0,this.flash-t*3)}_drain(e,t,n,r){if(!e.online){e.i=0;return}let i=t*n/36e5;e.soc=Math.max(0,e.soc-i/e.cap);let a=e.cap>10?302:28.4,o=e.cap>10?.12:.03,s=a*(.86+.18*e.soc-.04*Math.exp(-e.soc*20));e.i=t/Math.max(s,1),e.v=s-e.i*o*(1+Math.max(0,10-e.temp)*.04),e.temp+=(e.i*e.i*o*5e-5-(e.temp-4-r*.5)*.004+(e.fault===`thermal`?.6:0))*n,e.temp>75&&e.fault!==`thermal`&&(e.fault=`thermal`,this.msg(`バッテリー${e===this.bat.A?`A`:e===this.bat.B?`B`:`E`} 熱暴走の兆候`,`alarm`)),e.soc<=0&&(e.online=!1,this.msg(`バッテリー枯渇: 系統オフライン`,`alarm`))}_wet(e,t){for(let n of[`A`,`B`])this.bat[n].iso=Math.max(.05,this.bat[n].iso-e*t*.3);if(Math.random()<e*t*.05){let e=tf.filter(e=>this.breakers[e.id].closed&&!this.breakers[e.id].tripped);if(e.length){let t=e[Math.random()*e.length|0];this.breakers[t.id].tripped=!0,this.msg(`地絡: ${t.name} ブレーカー トリップ`,`warn`)}}}msg(e,t=`info`){this.messages.push({text:e,level:t,t:this.sub.time}),this.messages.length>80&&this.messages.shift(),this.onMessage?.(e,t)}toggleBreaker(e){let t=this.breakers[e];if(t){if(t.tripped){t.tripped=!1,t.closed=!0,this.msg(`${t.name} ブレーカー リセット`);return}t.closed=!t.closed,this.msg(`${t.name} ブレーカー ${t.closed?`投入`:`開放`}`)}}isolate(e){let t=this.pen[e];if(!t||e===`VP`||e===`HATCH`)return!1;t.isolated=!t.isolated;for(let e of t.feeds)t.isolated&&(this.breakers[e].closed=!1);return this.msg(`${t.name} ${t.isolated?`遮断弁 閉`:`遮断弁 開`}`,t.isolated?`warn`:`info`),!0}clampLeak(e,t){let n=this.pen[e];n.clamped=ef(n.clamped+t,0,e===`VP`?.8:.97)}extinguish(){if(this.fire.suppressant<=0){this.msg(`消火剤が残っていない`,`warn`);return}this.fire.suppressant--,this.fire.active&&(this.fire.intensity-=.8,this.fire.intensity<=.05&&(this.fire.active=!1,this.fire.intensity=0,this.msg(`消火完了`,`info`))),this.fire.smoke=Math.min(1,this.fire.smoke+.15),this.co2+=.6}swapCanister(){if(this.scrubber.spare<=0){this.msg(`予備の水酸化リチウムキャニスターが無い`,`warn`);return}this.scrubber.spare--,this.scrubber.canister=1,this.msg(`CO2吸収キャニスター交換完了`)}toggleMask(){if(!this.emergencyMask&&this.emergencyO2<=0&&!this._maskUsed&&(this.emergencyO2=1.5),!this.emergencyMask&&this.emergencyO2<=0){this.msg(`緊急呼吸器は使い切った`,`warn`);return}this._maskUsed=!0,this.emergencyMask=!this.emergencyMask,this.msg(this.emergencyMask?`緊急呼吸器 装着`:`緊急呼吸器 外した`)}serialize(){let e={};for(let t of[`o2`,`co2`,`cabinT`,`rh`,`o2Bottles`,`o2Flow`,`cross`,`emergencyO2`,`_maskUsed`,`pilotHealth`,`o2RegOK`])e[t]=this[t];return e.bat=JSON.parse(JSON.stringify(this.bat)),e.hull={...this.hull},e.scrubber={...this.scrubber},e.lights={...this.lights},e.breakers=Object.fromEntries(Object.entries(this.breakers).map(([e,t])=>[e,{closed:t.closed,tripped:t.tripped}])),e.pen=Object.fromEntries(Object.entries(this.pen).map(([e,t])=>[e,{leakArea:t.leakArea,isolated:t.isolated,clamped:t.clamped}])),e.fire={...this.fire},e.sensors={...this.sensors},e}restore(e){for(let t of[`o2`,`co2`,`cabinT`,`rh`,`o2Bottles`,`o2Flow`,`cross`,`emergencyO2`,`_maskUsed`,`pilotHealth`])e[t]!==void 0&&(this[t]=e[t]);if(e.bat)for(let t of[`A`,`B`,`E`])e.bat[t]&&Object.assign(this.bat[t],e.bat[t]);Object.assign(this.hull,e.hull||{}),Object.assign(this.scrubber,e.scrubber||{}),Object.assign(this.lights,e.lights||{});for(let t in e.breakers||{})this.breakers[t]&&Object.assign(this.breakers[t],e.breakers[t]);for(let t in e.pen||{})this.pen[t]&&Object.assign(this.pen[t],e.pen[t]);Object.assign(this.fire,e.fire||{}),Object.assign(this.sensors,e.sensors||{}),e.o2RegOK!==void 0&&(this.o2RegOK=e.o2RegOK)}},af=Math.random,of=e=>e[af()*e.length|0],sf=[{id:`leak_pen`,w:1.3,minDepth:150,apply(e){let t=of([`P1`,`P2`,`P3`,`P4`]),n=e.sys.pen[t];return n.leakArea>0?null:(n.leakArea=.4+af()*1.6,{kind:`leak`,target:t,sev:2,title:`浸水: ${n.name}`,en:`LEAK ${n.en}`,sfx:`leak`,loc:t})}},{id:`leak_vp`,w:.35,minDepth:1500,apply(e){let t=e.sys.pen.VP;return t.leakArea>0?null:(t.leakArea=.15+af()*.35,{kind:`leak`,target:`VP`,sev:3,title:`浸水: 主観測窓シールから滲出`,en:`VIEWPORT SEAL WEEP`,sfx:`leak`,loc:`VP`})}},{id:`thr_overheat`,w:1,minDepth:0,apply(e){let t=of(e.sub.thr.filter(e=>!e.fault));return t?(t.temp+=45,{kind:`thruster`,target:t.id,sev:1,title:`${t.name}スラスター 過熱`,en:`${t.en} OVERTEMP`,note:`モーター巻線温度上昇。出力を下げるか停止して冷却せよ。`}):null}},{id:`thr_bearing`,w:.6,minDepth:300,apply(e){let t=of(e.sub.thr.filter(e=>!e.fault));return t?(t.fault=`degraded`,{kind:`thruster`,target:t.id,sev:2,title:`${t.name}スラスター 軸受劣化`,en:`${t.en} BEARING`,sfx:`grind`}):null}},{id:`thr_fail`,w:.45,minDepth:500,apply(e){let t=of(e.sub.thr.filter(e=>e.fault!==`failed`));return t?(t.fault=`failed`,{kind:`thruster`,target:t.id,sev:2,title:`${t.name}スラスター 故障 (モーターコントローラ)`,en:`${t.en} MCU FAULT`,sfx:`clunk`}):null}},{id:`ground_fault`,w:.8,minDepth:0,apply(e){let t=of([`PROP`,`LIGHT`,`HYD`,`SONAR`,`NAV`,`CAM`,`COMMS`]),n=e.sys.breakers[t];return!n.closed||n.tripped?null:(n.tripped=!0,{kind:`elec`,target:t,sev:1,title:`地絡: ${n.name} ブレーカー トリップ`,en:`GND FAULT ${n.en}`,sfx:`breaker`,auto:!0})}},{id:`battery_cell`,w:.35,minDepth:800,apply(e){let t=of([`A`,`B`]),n=e.sys.bat[t];return n.fault||!n.online?null:(n.fault=`cell`,n.temp+=12,{kind:`battery`,target:t,sev:2,title:`バッテリー${t} セル電圧不均衡・温度上昇`,en:`BATT ${t} CELL IMBAL`,note:`放置すると熱暴走の恐れ。負荷を下げるか系統を切り離せ。`})}},{id:`fire`,w:.22,minDepth:400,apply(e){if(e.sys.fire.active)return null;let t=of([`CABIN`,`NAV`,`SONAR`,`HEAT`]);return e.sys.fire.active=!0,e.sys.fire.intensity=.08,e.sys.fire.loc=t,{kind:`fire`,target:t,sev:3,title:`電気火災: ${e.sys.breakers[t].name} 配電盤から発煙`,en:`ELECTRICAL FIRE`,sfx:`fire`}}},{id:`scrubber_fan`,w:.5,minDepth:0,apply(e){return e.sys.scrubber.fanOK?(e.sys.scrubber.fanOK=!1,{kind:`lss`,target:`fan`,sev:2,title:`CO2スクラバー ファン停止`,en:`SCRUBBER FAN FAIL`,note:`CO2が蓄積する。ファン修理か緊急呼吸器を使用せよ。`}):null}},{id:`o2_reg`,w:.35,minDepth:0,apply(e){return e.sys.o2RegOK?(e.sys.o2RegOK=!1,{kind:`lss`,target:`o2`,sev:2,title:`O2レギュレーター 固着`,en:`O2 REGULATOR STUCK`}):null}},{id:`vbt_valve`,w:.4,minDepth:200,apply(e){return e.sub.vbtValveOK?(e.sub.vbtValveOK=!1,e.sub._vbtStuckOpen=!0,{kind:`ballast`,target:`vbt`,sev:3,title:`VBT注水弁 開固着 — 重くなり続けている！`,en:`VBT FLOOD VALVE STUCK OPEN`,sfx:`clunk`,note:`VBT系統を隔離するか、ウェイト投棄で浮力を確保せよ。`}):null}},{id:`vbt_pump`,w:.35,minDepth:500,apply(e){return e.sub.vbtPumpOK?(e.sub.vbtPumpOK=!1,{kind:`ballast`,target:`pump`,sev:2,title:`VBT排水ポンプ 故障`,en:`VBT PUMP FAIL`}):null}},{id:`trim_pump`,w:.3,minDepth:0,apply(e){return e.sub.trimPumpOK?(e.sub.trimPumpOK=!1,{kind:`ballast`,target:`trim`,sev:1,title:`トリムポンプ 故障`,en:`TRIM PUMP FAIL`}):null}},{id:`depth_sensor`,w:.3,minDepth:300,apply(e){return e.sys.sensors.depth?(e.sys.sensors.depth=!1,{kind:`sensor`,target:`depth`,sev:1,title:`深度計 (水晶式圧力計) ドリフト`,en:`DEPTH SENSOR DRIFT`,silent:!0,note:`深度表示が徐々にずれる。バックアップ深度計と比較せよ。`}):null}},{id:`gyro`,w:.3,minDepth:0,apply(e){return e.sys.sensors.gyro?(e.sys.sensors.gyro=!1,{kind:`sensor`,target:`gyro`,sev:1,title:`ジャイロコンパス (FOG) 異常`,en:`GYRO FAULT`,note:`方位保持が不安定になる。`}):null}},{id:`dvl`,w:.35,minDepth:0,apply(e){return e.sys.sensors.dvl?(e.sys.sensors.dvl=!1,{kind:`sensor`,target:`dvl`,sev:1,title:`DVL (ドップラー速度計) 信号喪失`,en:`DVL LOST`,note:`対地速度・高度保持が不能。`}):null}},{id:`sonar`,w:.3,minDepth:0,apply(e){return e.sys.sensors.sonar?(e.sys.sensors.sonar=!1,{kind:`sensor`,target:`sonar`,sev:1,title:`前方障害物ソナー 故障`,en:`OAS SONAR FAIL`}):null}},{id:`comms`,w:.35,minDepth:0,apply(e){return e.sys.sensors.comms?(e.sys.sensors.comms=!1,{kind:`sensor`,target:`comms`,sev:1,title:`水中通話機 (UQC) 故障 — 母船との交信途絶`,en:`UQC FAIL`}):null}},{id:`light_implode`,w:.4,minDepth:2e3,apply(e){return e.sys.lights.extFault>=2?null:(e.sys.lights.extFault++,{kind:`light`,target:`ext`,sev:1,title:`外部LEDライト 圧壊`,en:`EXT LAMP IMPLOSION`,sfx:`bang`,shake:.5,note:`ランプハウジングが圧壊。衝撃波で船体に振動。`})}},{id:`crack`,w:.12,minDepth:5e3,apply(e){return e.sys.hull.crack+=.25,{kind:`hull`,target:`hull`,sev:3,title:`船殻 ひずみゲージ異常値 — 微小亀裂の可能性`,en:`HULL STRAIN ANOMALY`,sfx:`crack`,shake:.9,note:`圧壊深度が低下した。直ちに浮上を検討せよ。`}}},{id:`turbidity`,w:.3,minDepth:1e3,apply(e){return e.env.turbidity=1,e.env.turbidityT=90+af()*120,{kind:`env`,target:`current`,sev:1,title:`混濁流 (海底乱泥流) 発生 — 強い海流と視界不良`,en:`TURBIDITY CURRENT`,sfx:`rumble`,shake:.3,auto:!0}}},{id:`quake`,w:.12,minDepth:3e3,apply(e){return e.env.quake=6+af()*5,{kind:`env`,target:`quake`,sev:2,title:`海底地震を検知 — 落石に注意`,en:`SEISMIC EVENT`,sfx:`rumble`,shake:1,auto:!0}}},{id:`entangle`,w:.25,minDepth:0,near:[`wreck`,`destroyer`,`lander`],apply(e){let t=of(e.sub.thr.filter(e=>(e.id===`T1`||e.id===`T2`||e.id===`T4`)&&!(e.jam>0)));return!t||e.sub.tether?null:(t.jam=.7,e.sub.extraMass+=0,e.sub.tether={anchor:e.sub.pos.clone(),len:6+af()*4,strength:.6},{kind:`entangle`,target:t.id,sev:3,title:`${t.name}スラスターに 漁網/ケーブルが絡まった！`,en:`ENTANGLEMENT`,sfx:`grind`,note:`後進・左右に揺すって脱出するか、マニピュレーター投棄で離脱せよ。`})}}];function cf(e,t,n){let r=[];switch(e.kind){case`leak`:{let n=t.pen[e.target];e.target!==`VP`&&e.target!==`HATCH`&&r.push({id:`isolate`,label:n.isolated?`遮断弁を開く`:`遮断弁を閉じる (系統喪失)`,time:4}),r.push({id:`clamp`,label:`シーリングクランプ増し締め`,time:18}),r.push({id:`sealant`,label:`水中硬化エポキシ注入`,time:35,needs:`sealant`});break}case`thruster`:r.push({id:`reset`,label:`モーターコントローラ再起動`,time:8}),r.push({id:`disable`,label:`スラスターを切り離す`,time:2});break;case`entangle`:r.push({id:`shake`,label:`逆転パルスで振りほどく`,time:12}),r.push({id:`jettison`,label:`マニピュレーター投棄 (緊急)`,time:3});break;case`elec`:r.push({id:`resetBreaker`,label:`ブレーカー復帰`,time:3});break;case`battery`:r.push({id:`shed`,label:`負荷制限 (推進50%)`,time:2}),r.push({id:`isolateBat`,label:`バッテリー${e.target} を切り離し → クロスタイ`,time:6}),r.push({id:`balance`,label:`BMS セルバランス実行`,time:40});break;case`fire`:r.push({id:`extinguish`,label:`消火器使用 (残${t.fire.suppressant})`,time:3}),r.push({id:`deenergize`,label:`該当配電盤を遮断`,time:2}),r.push({id:`mask`,label:t.emergencyMask?`緊急呼吸器を外す`:`緊急呼吸器を装着`,time:3});break;case`lss`:e.target===`fan`&&r.push({id:`fixFan`,label:`ファンモーター交換`,time:45}),e.target===`o2`&&r.push({id:`bypassO2`,label:`O2バイパス弁で手動供給`,time:10},{id:`fixReg`,label:`レギュレーター分解整備`,time:60}),r.push({id:`mask`,label:t.emergencyMask?`緊急呼吸器を外す`:`緊急呼吸器を装着`,time:3});break;case`ballast`:e.target===`vbt`&&r.push({id:`isolateVBT`,label:`VBT系統を手動隔離弁で閉鎖`,time:14},{id:`drop`,label:`降下用ウェイト投棄`,time:1}),e.target===`pump`&&r.push({id:`fixPump`,label:`ポンプ電源系リセット`,time:25}),e.target===`trim`&&r.push({id:`fixTrim`,label:`トリムポンプ リセット`,time:20});break;case`sensor`:e.target===`depth`?r.push({id:`recal`,label:`バックアップ深度計で再校正`,time:15}):r.push({id:`reboot`,label:`機器を再起動`,time:20});break;case`light`:r.push({id:`ack`,label:`了解 (修理不能)`,time:1});break;case`hull`:r.push({id:`ack`,label:`了解 — 浮上を開始`,time:1});break;case`env`:r.push({id:`ack`,label:`了解`,time:1});break;case`collision`:r.push({id:`ack`,label:`損傷確認`,time:6});break;case`heat`:r.push({id:`ack`,label:`了解`,time:1})}return r}var lf=class{constructor(e,t,n){this.sub=e,this.sys=t,this.env=n,this.active=[],this.history=[],this.nextId=1,this.rateMul=1,this.clock=0,this.firstScripted=150,this.repair=null,this.shake=0,this.sealant=2,this.cooldown=40}get cautionCount(){return this.active.filter(e=>!e.resolved).length}raise(e){return e.id=this.nextId++,e.t=this.sub.time,e.resolved=!1,this.active.push(e),this.history.push(e),e.shake&&(this.shake=Math.max(this.shake,e.shake)),this.onIncident?.(e),e}trigger(e){let t=sf.find(t=>t.id===e);if(!t)return null;let n=t.apply(this);return n?this.raise(n):null}step(e){let t=this.sub,n=this.sys,r=this.env;this.clock+=e,this.cooldown-=e,this.shake=Math.max(0,this.shake-e*.8);let i=t.depth,a=ld.find(e=>Math.hypot(e.x-t.pos.x,e.y-t.pos.y,e.z-t.pos.z)<e.r*1.3),o=.6+Math.min(2.2,i/4e3),s=1+(1-n.hull.integrity)*3+n.hull.fatigue*50,c=.0038461538461538464*o*s*this.rateMul,l=this.cooldown<=0&&af()<c*e;if(this.clock>this.firstScripted&&this.history.length===0&&i>30&&(l=!0),l&&t.time>20){let e=sf.filter(e=>i>=e.minDepth&&(!e.near||a&&e.near.includes(a.id))),t=0;for(let n of e)t+=n.w*(n.near?4:1);let n=af()*t;for(let t of e)if(n-=t.w*(t.near?4:1),n<=0){let e=t.apply(this);e&&(this.raise(e),this.cooldown=35+af()*60);break}}for(let e of t.contacts)if(e.impact>.35){let a=e.impact;if(r.impact=(r.impact||0)+a,n.hull.integrity=Math.max(0,n.hull.integrity-Math.max(0,a-.3)*.06),this.shake=Math.max(this.shake,Math.min(1,a*.8)),this.onImpact?.(a,e),a>.8&&this.cooldown<30){let e={kind:`collision`,target:`hull`,sev:a>1.6?3:2,title:`衝突！ 衝撃 ${(a*1.5).toFixed(1)} G 相当`,en:`COLLISION`,auto:!1};if(this.raise(e),af()<a*.35){let e=of(t.thr);e.fault=e.fault||`degraded`}af()<a*.25&&(n.lights.extFault=Math.min(2,n.lights.extFault+1)),a>1.2&&af()<.5&&i>100&&this.trigger(`leak_pen`),a>1&&af()<.3&&(n.sensors.sonar=!1),this.cooldown=30}}r.impact=0;for(let e of t.thr)e.temp>95&&e.fault!==`failed`&&e.fault!==`thermal`&&(e.fault=`thermal`,this.raise({kind:`thruster`,target:e.id,sev:2,title:`${e.name}スラスター 熱保護停止`,en:`${e.en} THERMAL TRIP`,auto:!0})),e.fault===`thermal`&&e.temp<55&&(e.fault=null,this.resolveWhere(t=>t.target===e.id&&t.en.includes(`THERMAL`)),n.msg(`${e.name}スラスター 冷却完了・復帰`));let u=this._vents||=ld.find(e=>e.id===`vents`),d=u?Math.hypot(t.pos.x-u.x,t.pos.z-u.z):1e9;if(d<60&&t.pos.y<u.y+60?(r.ventHeat=Math.max(0,1-d/60),r.ventHeat>.75&&af()<e*.3&&(n.hull.integrity=Math.max(0,n.hull.integrity-.01),this.active.find(e=>e.kind===`heat`&&!e.resolved)||this.raise({kind:`heat`,target:`hull`,sev:2,title:`外殻温度 異常上昇 — 熱水噴出孔に近すぎる`,en:`HULL OVERTEMP`,sfx:`alarm`}))):r.ventHeat=0,i>1e4&&!this._deepWarn&&(this._deepWarn=!0,n.msg(`設計深度 11,000 m に接近`,`warn`)),t._vbtStuckOpen&&!t.vbtIsolated&&(t.vbt=Math.min(400,t.vbt+2.2*e)),t.tether){let r=t.tether,i=t.pos.clone().sub(r.anchor),a=i.length();a>r.len&&t.extForce.addScaledVector(i.normalize(),-(a-r.len)*9e3*r.strength);let o=Math.abs(t.w.y)+Math.abs(t.speed)*.2+(t.thr.some(e=>e.rpm<-.4)?.15:0);r.strength-=o*e*.02,r.strength<=0&&(this._freeTether(),n.msg(`絡まりから脱出した！`,`good`))}r.turbidityT>0&&(r.turbidityT-=e,t.currentExtra=.45*Math.min(1,r.turbidityT/20),r.turbidityT<=0&&(r.turbidity=0,t.currentExtra=0,this.resolveWhere(e=>e.target===`current`))),r.quake>0&&(r.quake-=e,this.shake=Math.max(this.shake,.35+.3*Math.sin(t.time*23)),r.quake<=0&&this.resolveWhere(e=>e.target===`quake`));for(let e of this.active)e.resolved||(e.kind===`leak`&&n.pen[e.target].leakArea<=0&&(e.resolved=!0),e.kind===`fire`&&!n.fire.active&&(e.resolved=!0),e.kind===`elec`&&!n.breakers[e.target].tripped&&(e.resolved=!0),e.kind===`heat`&&r.ventHeat<.5&&(e.resolved=!0));if(this.active=this.active.filter(e=>!e.resolved||t.time-e.t<.1),this.repair){let t=this.repair;if(t.fault.resolved&&t.proc.id!==`mask`){this.repair=null;return}t.t+=e,t.t>=t.proc.time&&(this._apply(t.fault,t.proc.id),this.repair=null)}}_freeTether(){this.sub.tether=null;for(let e of this.sub.thr)e.jam>0&&(e.jam=0);this.resolveWhere(e=>e.kind===`entangle`)}resolveWhere(e){for(let t of this.active)e(t)&&(t.resolved=!0)}startRepair(e,t){return this.repair?!1:t.needs===`sealant`&&this.sealant<=0?(this.sys.msg(`エポキシシーラントが残っていない`,`warn`),!1):(this.repair={fault:e,proc:t,t:0},this.onRepairStart?.(e,t),!0)}cancelRepair(){this.repair=null}_apply(e,t){let n=this.sub,r=this.sys,i=e=>{r.msg(e,`good`)};switch(t){case`isolate`:r.isolate(e.target);break;case`clamp`:r.clampLeak(e.target,.35+af()*.25),i(`クランプ増し締め完了 — 浸水量低下`),r.pen[e.target].clamped>.95&&e.target!==`VP`&&(r.pen[e.target].leakArea=0,e.resolved=!0);break;case`sealant`:this.sealant--,af()<.8||e.target!==`VP`?(r.pen[e.target].leakArea=0,r.pen[e.target].clamped=0,e.resolved=!0,i(`シーラント硬化 — 浸水停止`)):(r.clampLeak(e.target,.4),r.msg(`シーラント部分的に効果 — 浸水は減少`,`warn`));break;case`reset`:{let t=n.thr.find(t=>t.id===e.target);if(t.fault===`failed`&&af()<.45){r.msg(`${t.name} 再起動失敗 — コントローラ応答なし`,`warn`);break}if(t.fault===`degraded`&&af()<.7){r.msg(`${t.name} 軸受の異音は消えない (出力制限継続)`,`warn`);break}t.fault=null,t.temp=Math.min(t.temp,60),e.resolved=!0,i(`${t.name} スラスター 復帰`);break}case`disable`:{let t=n.thr.find(t=>t.id===e.target);if(!t)break;t.enabled=!t.enabled,t.enabled||(e.resolved=!0),i(`${t.name} ${t.enabled?`再接続`:`切り離し`}`);break}case`shake`:n.tether?(n.tether.strength-=.35+af()*.3,n.w.y+=(af()-.5)*.25,n.tether.strength<=0?(this._freeTether(),i(`網を振りほどいた！`)):r.msg(`まだ絡まっている — 繰り返せ`,`warn`)):e.resolved=!0;break;case`jettison`:this._freeTether(),n.manipulatorLost=!0,e.resolved=!0,i(`マニピュレーター投棄 — 離脱成功`);break;case`resetBreaker`:{let t=r.breakers[e.target];if(n.floodL>200&&af()<.6){r.msg(`${t.name}: 地絡継続中 — 再トリップ`,`warn`);break}t.tripped=!1,t.closed=!0,e.resolved=!0,i(`${t.name} 復電`);break}case`shed`:n.thrustLimit=.5,r.bat[e.target]&&(r.bat[e.target].temp-=4),i(`推進出力を50%に制限`);break;case`isolateBat`:{let t=r.bat[e.target];t.online=!1,r.cross=!0,e.resolved=!0,i(`バッテリー${e.target} 切り離し、クロスタイ投入`);break}case`balance`:{let t=r.bat[e.target];if(t.fault===`thermal`&&af()<.5){r.msg(`熱暴走は止まらない — 切り離せ！`,`alarm`);break}t.fault=null,t.soc*=.94,e.resolved=!0,i(`セルバランス完了`);break}case`extinguish`:r.extinguish();break;case`deenergize`:{let t=r.breakers[e.target];t&&(t.closed=!1),r.fire.intensity*=.5,i(`${t?.name} 配電盤 遮断`);break}case`mask`:r.toggleMask();break;case`fixFan`:r.scrubber.fanOK=!0,e.resolved=!0,i(`スクラバーファン 交換完了`);break;case`bypassO2`:r.o2RegOK=!0,r.o2Flow=.5,r._bypass=!0,i(`O2 手動バイパス供給中`),e.resolved=!0;break;case`fixReg`:r.o2RegOK=!0,e.resolved=!0,i(`レギュレーター 整備完了`);break;case`isolateVBT`:n.vbtIsolated=!0,n._vbtStuckOpen=!1,e.resolved=!0,i(`VBT系統を隔離 — 注水停止 (VBT操作不能)`);break;case`drop`:(n.dropWeight(`descent`)||n.dropWeight(`ascent`))&&i(`ウェイト投棄`);break;case`fixPump`:af()<.7?(n.vbtPumpOK=!0,e.resolved=!0,i(`VBTポンプ 復帰`)):r.msg(`ポンプ再起動失敗`,`warn`);break;case`fixTrim`:n.trimPumpOK=!0,e.resolved=!0,i(`トリムポンプ 復帰`);break;case`recal`:r.sensors.depth=!0,r.sensors.depthDrift=0,e.resolved=!0,i(`深度計 再校正完了`);break;case`reboot`:af()<.75?(r.sensors[e.target]=!0,r.sensors.gyroDrift=e.target===`gyro`?0:r.sensors.gyroDrift,e.resolved=!0,i(`機器 再起動成功`)):r.msg(`再起動失敗 — 再試行せよ`,`warn`);break;case`ack`:e.resolved=!0}this.onRepairDone?.(e,t)}serialize(){return{sealant:this.sealant,clock:this.clock,n:this.history.length}}};sf.map(e=>e.id);var uf=class{constructor(e,t,n,r=1,i=.5){Object.assign(this,{kp:e,ki:t,kd:n,lim:r,ilim:i}),this.i=0,this.prev=null}reset(){this.i=0,this.prev=null}step(e,t,n=null){this.i=Et.clamp(this.i+e*t*this.ki,-this.ilim,this.ilim);let r=n===null?this.prev===null||t<=0?0:(e-this.prev)/t:n;return this.prev=e,Et.clamp(this.kp*e+this.i+this.kd*r,-this.lim,this.lim)}},df=e=>{for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e},ff=e=>(-e*180/Math.PI%360+360)%360,pf=e=>-e*Math.PI/180,mf=class{constructor(e,t){this.sub=e,this.sys=t,this.engaged=!1,this.hdg={on:!1,target:0},this.depth={on:!1,target:50},this.alt={on:!1,target:8},this.speed={on:!1,target:1},this.station={on:!1,point:new U},this.nav={on:!1,wp:[],idx:0,poi:null},this.descent={on:!1,rate:.6},this.ascent={on:!1},this.oas={on:!0,range:60,threat:0,bearing:0,dist:999,beams:[]},this.ballastAuto=!0,this.pid={yaw:new uf(1.8,.05,2.6),depth:new uf(.22,.012,.9,1,.35),vz:new uf(1.6,.25,.1),speed:new uf(.9,.12,.2),sway:new uf(.5,.02,.9),pitch:new uf(2.2,.1,1.5)},this.status=`STBY`,this.warn=``,this.log=[],this._scan=0}engage(e=!this.engaged){if(this.engaged=e,e||(this._navVert=!1,this.sub.vbtCmd=0),e){let e=this.sub;!this.hdg.on&&!this.nav.on&&!this.station.on&&(this.hdg.on=!0,this.hdg.target=ff(e.yaw)),!this.depth.on&&!this.alt.on&&!this.descent.on&&!this.ascent.on&&(this.depth.on=!0,this.depth.target=Math.round(e.depth)),Object.values(this.pid).forEach(e=>e.reset())}}setMode(e,t,n){let r=this[e];if(r){if(r.on=t,n!==void 0&&(`target`in r?r.target=n:`rate`in r&&(r.rate=n)),t&&[`depth`,`alt`,`descent`,`ascent`].includes(e))for(let t of[`depth`,`alt`,`descent`,`ascent`])t!==e&&(this[t].on=!1);if(t&&[`hdg`,`nav`,`station`].includes(e))for(let t of[`hdg`,`nav`,`station`])t!==e&&(this[t].on=!1);e===`station`&&t&&(this.station.point.copy(this.sub.pos),this.hdg.on||(this.hdg.target=Math.round(ff(this.sub.yaw)))),t&&(this.engaged=!0),t&&e!==`nav`&&[`depth`,`alt`,`descent`,`ascent`].includes(e)&&(this._navVert=!1),e===`nav`&&!t&&(this._navVert=!1),this.pid.depth.reset(),this.pid.vz.reset()}}navTo(e){this.nav.poi=e,this.sub.pos;let t=new U(e.x,e.y+12,e.z);this.nav.wp=[t],this.nav.idx=0,this.setMode(`nav`,!0),this.depth.on=!1,this.alt.on=!1,this.descent.on=!1,this.navVertical=!0,this.log.push(`NAV → ${e.name}`)}measure(){let e=this.sub,t=this.sys.sensors,n={};n.depth=e.depth+t.depthDrift,n.hdg=((ff(e.yaw)+(t.gyro?0:Math.sin(e.time*.05)*25+t.gyroDrift*57))%360+360)%360,n.yaw=e.yaw-(t.gyro?0:Math.sin(e.time*.05)*25*Math.PI/180+t.gyroDrift),n.dvl=t.dvl&&this.sys.powered(`SONAR`)&&e.altitude<200,n.alt=n.dvl?e.altitude:NaN,n.vz=-e.vel.y;let r=e.vbody||new U;return n.u=n.dvl?-r.z:-r.z*.9,n.v=n.dvl?r.x:0,n}_sonar(e){let t=this.sub;if(!(this.sys.sensors.sonar&&this.sys.powered(`SONAR`))){this.oas.threat=0,this.oas.beams=[];return}if(this._sonT=(this._sonT||0)+e,this._sonT<1/30&&this.oas.beams.length)return;this._sonT=0;let n=this.oas.beams;if(n.length!==15){n.length=0;for(let e=0;e<15;e++)n.push({a:0,e:0,d:999})}let r=new U;for(let e=0;e<3;e++){let e=this._scan++%15,i=e%5,a=e/5|0,o=(i-2)*.22,s=(a-1)*.2-.05;r.set(Math.sin(o),Math.sin(s),-Math.cos(o)).normalize().applyQuaternion(t.quat);let c=fd(t.pos.x,t.pos.y,t.pos.z,r.x,r.y,r.z,this.oas.range,.8);n[e].a=o,n[e].e=s,n[e].d=c<0?999:c}let i=999,a=0;for(let e of n)e.d<i&&(i=e.d,a=e.a);this.oas.dist=i,this.oas.bearing=a;let o=Math.max(.3,t.speed),s=i/o;this.oas.threat=Et.clamp(1-(s-6)/20,0,1)*+(i<this.oas.range)}_chart(e){if(this._chartT=(this._chartT||0)-e,this._chartT>0)return this.chartFloor;this._chartT=.5;let t=this.sub,n=new U(t.vel.x,0,t.vel.z),r=n.lengthSq()>.04?n.normalize():t.forward(new U).setY(0).normalize(),i=120;if(this.nav.on&&this.nav.wp.length){let e=this.nav.wp[this.nav.idx],n=new U(e.x-t.pos.x,0,e.z-t.pos.z);i=Math.min(120,n.length()+10),n.lengthSq()>1&&(r=n.normalize())}let a=-1e9;for(let e of[0,.12,.3,.5,.75,1]){let n=e*i,o=pd(t.pos.x+r.x*n,t.pos.z+r.z*n,Math.min(0,t.pos.y+150));o>a&&(a=o)}return this.chartFloor=a,a}_altimeter(){let e=this.sub,t=fd(e.pos.x,e.pos.y-1.7,e.pos.z,0,-1,0,220,.8);e.altitude=t<0?999:t}update(e,t){let n=this.sub,r=this.sys;this._altTimer=(this._altTimer||0)-e,this._altTimer<=0&&(this._altimeter(),this._altTimer=.1),this._sonar(e);let i=this.measure();this.engaged&&this._chart(e),this.m=i;let a={surge:t.surge,yaw:t.yaw,heave:t.heave,sway:t.sway,pitch:0};if(this.warn=``,!r.powered(`NAV`)&&this.engaged&&(this.engaged=!1,this.nav.on=!1,this._navVert=!1,r.msg(`航法コンピュータ電源喪失 — 自動操縦 解除`,`alarm`)),!this.engaged){this.status=`STBY`,a.pitch=this.pid.pitch.step(-n.pitch,e,-n.w.x)*.5,n.input=a;return}let o=e=>Math.abs(e)>.08,s=[],c=null,l=null,u=null;if(this.nav.on&&this.nav.wp.length){let e=this.nav.wp[this.nav.idx],t=e.x-n.pos.x,a=e.z-n.pos.z,o=Math.hypot(t,a);c=Math.atan2(-t,-a);let u=n.depth>50?1.6:1.3;this.speed.target=Et.clamp(o/40,.15,u);{let e=Math.abs(df(c-i.yaw));e>.6&&(this.speed.target*=Math.max(.1,1-(e-.6)))}if(l=`speed`,this.navVertical){let t=-e.y;this.depth.target=t,this._navVert=!0}o<8&&(Math.abs(-e.y-n.depth)<12||this.chartFloor!==void 0&&n.depth>-this.chartFloor-30)&&(this.nav.idx<this.nav.wp.length-1?this.nav.idx++:(r.msg(`目的地到着: ${this.nav.poi?.name||`WP`} — 定点保持に移行`,`good`),this.setMode(`station`,!0),this.depth.on=!0,this.depth.target=n.depth,this._navVert=!1,this.nav.on=!1)),s.push(`NAV`),this.navDist=Math.hypot(t,a,-e.y-n.depth)}else if(this.station.on&&n.vbody){let e=this.station.point,t=new U(e.x-n.pos.x,0,e.z-n.pos.z).applyQuaternion(n.quat.clone().invert());i.dvl||n.depth<30?(l=Et.clamp(-t.z*.25- -n.vbody.z*.9,-.6,.6),u=Et.clamp(t.x*.25-n.vbody.x*.9,-.6,.6)):this.warn=`STN: DVL無 — 位置保持精度低下`,this.hdg.on||(this.hdg.target=this.hdg.target??ff(n.yaw)),c=pf(this.hdg.target),s.push(`STN`)}else this.hdg.on&&(c=pf(this.hdg.target),s.push(`HDG`));if(this.speed.on&&l===null&&(l=`speed`),c!==null&&!o(t.yaw)){let t=df(c-i.yaw);a.yaw=-this.pid.yaw.step(t,e,n.w.y)*1}if(l===`speed`&&!o(t.surge)){let t=this.speed.target;a.surge=Et.clamp(.3*Math.sign(t)*Math.sqrt(Math.abs(t)/1.9)*2.2+this.pid.speed.step(t-i.u,e),-1,1),this.nav.on||s.push(`SPD`)}else typeof l==`number`&&!o(t.surge)&&(a.surge=l);u!==null&&!o(t.sway)&&(a.sway=u);let d=null;if(this.ascent.on)d=-1,s.push(`ASC`);else if(this.descent.on)d=this.descent.rate,i.dvl&&i.alt<60&&(d=Math.min(d,Math.max(.1,(i.alt-12)/60))),i.dvl&&i.alt<14&&(this.setMode(`alt`,!0,10),r.msg(`海底接近 — 高度保持 10 m に移行`,`info`)),s.push(`DSC`);else if(this.alt.on){if(!i.dvl)this.warn=`ALT: DVLボトムロック無 — 深度保持へ`,this.alt.on=!1,this.depth.on=!0,this.depth.target=Math.round(i.depth);else{let e=i.alt-this.alt.target;d=Et.clamp(e*.12,-.7,.7),s.push(`ALT`)}}else if(this.depth.on||this._navVert){let e=this.depth.target;if(i.dvl&&(e=Math.min(e,i.depth+i.alt-10)),this.chartFloor!==void 0&&r.powered(`NAV`)){let t=this._navVert?18:10;e=Math.min(e,-this.chartFloor-t),-this.chartFloor-t<this.depth.target-1&&this._navVert&&s.push(`TF`)}let t=e-i.depth,n=this._navVert?1:.8;d=Et.clamp(t*.08,-n,n),s.push(this._navVert?`VNAV`:`DPT`)}if(d!==null&&!o(t.heave)&&(a.heave=-this.pid.vz.step(d-i.vz,e),this.ballastAuto&&r.powered(`HYD`))){let e=-this.pid.vz.i,t=this.ascent.on?-150:this.descent.on?Et.clamp(d*110,0,110):Et.clamp(-e*220,-60,60);(n.grounded||i.dvl&&i.alt<4)&&(t=Math.min(t,-20));let r=t-n.trimState;n.vbtCmd=Math.abs(r)<10?0:Et.clamp(r/40,-1,1)}if(this.ascent.on&&n.trimState>0&&r.powered(`HYD`)&&(n.vbtCmd=-1),a.pitch=this.pid.pitch.step(-n.pitch,e,-n.w.x)*.6,this.oas.on&&this.oas.threat>0){let e=this.oas.threat;a.surge=Math.min(a.surge,1-e*1.4),a.yaw+=(this.oas.bearing<=0?1:-1)*e*.7,a.heave+=e*.6,s.push(`OAS`),e>.6&&(this.warn=`障害物回避中`)}this.status=s.join(` `),n.input=a}serialize(){return{hdg:{...this.hdg},depth:{...this.depth},alt:{...this.alt},speed:{...this.speed},engaged:this.engaged}}},hf=new U;function gf(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;hf.copy(t),hf[r]=0,hf.normalize();let l=.5*o/(o+s),u=1-hf.angleTo(e)/c;return Math.sign(hf[n])===1?u*l:s/(o+s)+l+l*(1-u)}var _f=class e extends Ui{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new U,c=new U,l=new U(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new U,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=gf(m,c,`z`,`y`,i,n),f[a+1]=1-gf(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-gf(m,c,`z`,`y`,i,n),f[a+1]=1-gf(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-gf(m,c,`x`,`z`,i,e),f[a+1]=gf(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-gf(m,c,`x`,`z`,i,e),f[a+1]=1-gf(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-gf(m,c,`x`,`y`,i,e),f[a+1]=1-gf(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=gf(m,c,`x`,`y`,i,e),f[a+1]=1-gf(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},vf=class extends Nn{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new Ui;e.deleteAttribute(`uv`);let t=new J({side:1}),n=new J,r=new Io(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new K(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new pi(e,n,6),o=new Tn;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new K(e,yf(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new K(e,yf(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new K(e,yf(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new K(e,yf(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new K(e,yf(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new K(e,yf(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function yf(e){return new Ua({color:0,emissive:16777215,emissiveIntensity:e})}function bf(e,t,n,{srgb:r=!0}={}){let i=document.createElement(`canvas`);i.width=e,i.height=t;let a=i.getContext(`2d`);n&&n(a,e,t);let o=new zi(i);return o.colorSpace=r?Ie:``,o.anisotropy=8,o.generateMipmaps=!0,o.minFilter=c,o.userData.ctx=a,o.userData.canvas=i,o}function xf(e,{w:t=256,h:n=64,bg:r=`#d8d2c0`,fg:i=`#111`,font:a=`bold 34px "Noto Sans JP", sans-serif`,border:o=!0,sub:s=``}={}){return bf(t,n,c=>{c.fillStyle=r,c.fillRect(0,0,t,n),o&&(c.strokeStyle=i,c.lineWidth=4,c.strokeRect(5,5,t-10,n-10)),c.fillStyle=i,c.font=a,c.textAlign=`center`,c.textBaseline=`middle`,c.fillText(e,t/2,s?n*.4:n/2),s&&(c.font=`bold ${Math.floor(n*.22)}px monospace`,c.fillText(s,t/2,n*.76))})}var Sf=`"Rajdhani","Segoe UI","Noto Sans JP",system-ui,sans-serif`,Cf=`"Share Tech Mono","DejaVu Sans Mono",Consolas,monospace`;function wf(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Mr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Tf(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Tf(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Tf(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new _r(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Ef=new U(0,1,0),Df=(e,t)=>new U(Math.cos(e)*Math.sin(t),Math.sin(e),-Math.cos(e)*Math.cos(t));function Of(e,t){let n=1/0;for(let r of t)n=Math.min(n,Math.acos(Et.clamp(e.dot(r.dir),-1,1))-r.half);return n}function kf(e,t,n,r,i,{gap:a=.004,bevel:o=.012,pillow:s=.006,seg:c=12,ports:l,portMargin:u=0,rnd:d=Math.random}){let f=a/i;e+=f,t-=f,n+=f/Math.max(.2,Math.cos((e+t)/2)),r-=f/Math.max(.2,Math.cos((e+t)/2));let p=c,m=c,h=[],g=[],_=[],v=[],y=[],b=d()*8,x=d()*8,S=d()<.5,C=[.94+d()*.08,d(),d()],w=[];for(let a=0;a<=m;a++)for(let c=0;c<=p;c++){let d=c/p,f=a/m,_=e+(t-e)*f,T=Df(_,n+(r-n)*d);w.push(Of(T,l)>=u);let E=Math.min(d,1-d,f,1-f),D=Math.min(1,E*p/1.2),O=i-(s*Math.sin(Math.PI*d)*Math.sin(Math.PI*f)+o*(1-Math.sqrt(D))*-.35)-.004*D;h.push(T.x*O,T.y*O,T.z*O);let k=d*(r-n)*Math.cos((e+t)/2)*i*3.3,A=f*(t-e)*i*3.3;g.push(b+(S?A:k),x+(S?k:A)),v.push(Math.min(d*(r-n)*Math.cos(_)*i,(1-d)*(r-n)*Math.cos(_)*i,f*(t-e)*i,(1-f)*(t-e)*i)),y.push(C[0],C[1],C[2])}for(let e=0;e<m;e++)for(let t=0;t<p;t++){let n=e*(p+1)+t,r=n+1,i=n+p+1,a=i+1;(w[n]||w[r]||w[i])&&_.push(n,r,i),(w[r]||w[a]||w[i])&&_.push(r,a,i)}if(!_.length)return null;let T=new Mr;return T.setAttribute(`position`,new br(h,3)),T.setAttribute(`uv`,new br(g,2)),T.setAttribute(`edge`,new br(v,1)),T.setAttribute(`ptint`,new br(y,3)),T.setIndex(_),T.computeVertexNormals(),T}function Af(e,{R:t,ports:n,mats:r,dark:i,floorY:a}){let o={handles:[],placards:[]},s=t-.045,c=[[-.62,-.34,10],[-.34,-.06,12],[-.06,.22,12],[.22,.5,10],[.5,.78,8],[.78,1.12,5]],l=[],u=[],d=[],f=If(4242);for(let[e,t,r]of c)for(let i=0;i<r;i++){let a=c.findIndex(t=>t[0]===e)%2*.5,o=(i+a)/r*Math.PI*2-Math.PI,p=(i+1+a)/r*Math.PI*2-Math.PI,m=kf(e,t,o,p,s,{ports:n,rnd:f});m&&((f()<.12?u:l).push(m),Nf(d,e,t,o,p,s-.004,n))}r={...r,panel:jf(r.panelTex,14209992,n,`a`),panelDark:jf(r.panelTex,6975091,n,`b`)};let p=new K(wf(l),r.panel);if(p.receiveShadow=!0,p.castShadow=!1,p.name=`lining`,e.add(p),u.length){let t=new K(wf(u),r.panelDark);t.receiveShadow=!0,e.add(t)}let m=new K(new ka(t-.03,96,48,0,Math.PI*2,Math.PI/2-1.12,1.74),i);m.material=i.clone(),m.material.side=1,m.material.onBeforeCompile=Pf(n,0),m.material.customProgramCacheKey=()=>`backing-vp`,e.add(m);let h=new pi(new q(.0045,.005,.003,10),r.steel,d.length),g=new Zt,_=new Dt;d.forEach((e,t)=>{_.setFromUnitVectors(Ef,e.clone().normalize().negate()),g.compose(e,_,new U(1,1,1)),h.setMatrixAt(t,g)}),e.add(h);for(let t of n){let n=t.half+.03,i=new K(new Aa(Math.sin(n)*s,t.main?.02:.014,12,96),r.anodised);i.scale.z=.6,i.position.copy(t.dir).multiplyScalar(Math.cos(n)*(s-.004)),i.quaternion.setFromUnitVectors(new U(0,0,1),t.dir),e.add(i)}let v=1.12,y=new K(new ka(t-.02,64,8,0,Math.PI*2,0,Math.PI/2-v+.01),r.titanium);y.material=r.titanium.clone(),y.material.side=1,e.add(y);let b=new K(new Aa(Math.cos(v)*s,.014,10,96),r.anodised);b.rotation.x=Math.PI/2,b.position.y=Math.sin(v)*s,e.add(b);let x=[],S=[];for(let e of[.3,-.18]){let t=[];for(let n=.95;n<=2*Math.PI-.95;n+=.08)t.push(Df(e,n).multiplyScalar(s-.018));let n=new ja(new ca(t),120,.012,4,!1);n.scale(1,1.6,1),x.push(n);for(let e=0;e<4;e++){let n=(e-1.5)*.009,r=t.map(e=>e.clone().multiplyScalar(.985).add(new U(0,n,0)));S.push({geo:new ja(new ca(r),120,e===1?.006:.0045,6),orange:e===1})}}e.add(new K(wf(x),r.anodised));let C=S.filter(e=>!e.orange).map(e=>e.geo),w=S.filter(e=>e.orange).map(e=>e.geo),T=new K(wf(C),r.cable);T.castShadow=!0,e.add(T);let E=new K(wf(w),r.cableOr);E.castShadow=!0,e.add(E);let D=new Aa(.02,.003,4,12),O=[];for(let e of[.3,-.18])for(let t=1.1;t<2*Math.PI-1.1;t+=.35)O.push(Df(e,t).multiplyScalar(s-.024));let k=new pi(D,r.strap,O.length);O.forEach((e,t)=>{_.setFromUnitVectors(new U(0,0,1),new U(-e.z,0,e.x).normalize()),g.compose(e,_,new U(1,1,1)),k.setMatrixAt(t,g)}),e.add(k);let A=new ja(new ca([new U(-.09,0,0),new U(-.08,.035,0),new U(0,.045,0),new U(.08,.035,0),new U(.09,0,0)]),24,.009,10);for(let[t,n]of[[.95,.6],[.95,-.6],[.62,1.6],[.62,-1.6],[.5,2.5],[.5,-2.5]]){let i=Df(t,n),a=new K(A,r.handle);a.position.copy(i).multiplyScalar(s-.005),a.quaternion.setFromUnitVectors(Ef,i.clone().negate()),a.rotateY(Math.PI/2+n),a.castShadow=!0,e.add(a)}let j=(t,n,r,i,a=.12,c=.035,l={})=>{let u=xf(t,{w:512,h:Math.round(512*c/a),sub:n,bg:l.bg??`#1a1d20`,fg:l.fg??`#d8dde2`,font:l.font??`bold 52px "Rajdhani","Segoe UI","Noto Sans JP",system-ui,sans-serif`,border:l.border??!1}),d=new K(new Oa(a,c),new J({map:u,roughness:.55,metalness:.1})),f=Df(r,i);return d.position.copy(f).multiplyScalar(s-.012),d.lookAt(0,d.position.y*.9,0),e.add(d),o.placards.push(d),d};j(`ハッチ開放禁止 — 船内圧確認`,`DO NOT OPEN HATCH UNTIL CABIN P = 1 ATM`,.72,0,.2,.045,{bg:`#b3120f`,fg:`#fff`}),j(`非常用呼吸器`,`EMERGENCY BREATHING APPARATUS`,.05,2,.14,.035,{bg:`#f2b400`,fg:`#111`}),j(`消火器`,`FIRE EXTINGUISHER CO2`,-.12,2.3,.1,.03,{bg:`#b3120f`,fg:`#fff`}),j(`O2 供給系統`,`OXYGEN — NO OIL / GREASE`,.08,-2,.13,.035,{bg:`#1f6a3a`,fg:`#fff`}),j(`DSV-11 わだつみ`,`JAMSTEC-TYPE HOV · HULL No. 011`,.44,.9,.14,.04),j(`耐圧殻 Ti-6Al-4V ELI`,`PRESSURE HULL Ø2.10 m · t=102 mm · TEST 12,650 m`,.44,-.9,.15,.04);let M=new W;e.add(M);let N=new K(new _f(.16,.1,.07,3,.01),r.firstAid),P=new K(new Oa(.16,.1),new J({map:bf(256,160,(e,t,n)=>{e.fillStyle=`#e8e6e0`,e.fillRect(0,0,t,n),e.fillStyle=`#1f8a3a`,e.fillRect(t/2-22,30,44,100),e.fillRect(t/2-50,58,100,44),e.fillStyle=`#111`,e.font=`bold 20px ${Sf}`,e.textAlign=`center`,e.fillText(`FIRST AID 救急`,t/2,152)}),roughness:.6}));P.position.z=.0351,N.add(P),Mf(N,Df(-.05,2.75),s-.04),M.add(N);let ee=new W,F=new K(new Wi(.03,.16,6,16),r.bottle);F.position.set(-.06,0,-.03),ee.add(F);let te=new K(new Ui(.16,.22,.006),r.clipboard);te.position.set(.06,.01,-.035),ee.add(te);let I=new K(new Oa(.14,.19),new J({map:Ff(),roughness:.9}));I.position.set(.06,0,-.031),ee.add(I);let ne=[];for(let e=0;e<=6;e++)ne.push(new Ui(.3,.004,.004).translate(0,-.12+e*.04,0));for(let e=0;e<=7;e++)ne.push(new Ui(.004,.25,.004).translate(-.15+e*.043,0,0));ee.add(new K(wf(ne),r.cable)),Mf(ee,Df(0,-2.75),s-.05),M.add(ee);let re=new K(new q(Math.sqrt(t*t-a*a)-.03,Math.sqrt(t*t-a*a)-.03,.06,64,1,!0),r.panelDark);re.material=new J({color:2764081,map:r.panelTex.map,normalMap:r.panelTex.normal,roughnessMap:r.panelTex.orm,roughness:1,metalness:.2,side:1}),re.position.y=a+.03,e.add(re);let ie=new K(new Aa(Math.sqrt(t*t-a*a)-.05,.004,4,96),new Wr({color:666170,toneMapped:!1}));return ie.rotation.x=Math.PI/2,ie.position.y=a+.005,e.add(ie),o.floorGlow=ie,o}function jf(e,t,n,r){let i=new J({color:t,map:e.map,normalMap:e.normal,roughnessMap:e.orm,aoMap:e.orm,roughness:1,metalness:0,aoMapIntensity:1});i.normalScale.set(1.6,1.6);let a=Pf(n,.03);return i.onBeforeCompile=e=>{a(e),e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float edge; attribute vec3 ptint; varying float vEdge; varying vec3 vPt;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vEdge = edge; vPt = ptint;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vEdge; varying vec3 vPt;`).replace(`#include <map_fragment>`,`#include <map_fragment>
        float edgeBand = 1.0 - smoothstep(0.004, 0.035, vEdge);     // ~3 cm band along the edges
        float seam = 1.0 - smoothstep(0.0, 0.008, vEdge);           // dirt packed right at the seam
        diffuseColor.rgb *= vPt.x;                                   // paint batch / fading
        diffuseColor.rgb *= 1.0 - 0.10 * edgeBand * (0.4 + vPt.y) - 0.45 * seam;
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.93, 0.9, 0.84), vPt.z * 0.5);`).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor - 0.12 * edgeBand * vPt.y + 0.08 * vPt.z, 0.12, 0.95);`)},i.customProgramCacheKey=()=>`lining-photo-`+r,i}function Mf(e,t,n){e.position.copy(t).multiplyScalar(n),e.lookAt(0,e.position.y,0)}function Nf(e,t,n,r,i,a,o){let s=(n-t)*.12,c=(i-r)*.1;for(let l of[t+s,n-s])for(let t of[r+c,i-c]){let n=Df(l,t);Of(n,o)>.06&&e.push(n.multiplyScalar(a))}}function Pf(e,t){return n=>{n.uniforms.uVp={value:e.map(e=>e.dir)},n.uniforms.uVpCos={value:e.map(e=>Math.cos(e.half+t))},n.vertexShader=n.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLocalP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLocalP = position;`),n.fragmentShader=n.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vLocalP; uniform vec3 uVp[4]; uniform float uVpCos[4];`).replace(`void main() {`,`void main() {
  vec3 ld = normalize(vLocalP);
  for (int i = 0; i < 4; i++) if (dot(ld, uVp[i]) > uVpCos[i]) discard;`)}}function Ff(){return bf(280,380,(e,t,n)=>{e.fillStyle=`#f4f1e8`,e.fillRect(0,0,t,n),e.fillStyle=`#222`,e.font=`bold 20px ${Sf}`,e.fillText(`潜航記録 DIVE LOG`,14,30),e.font=`13px ${Cf}`,[`DIVE No. 1437`,`PILOT  ______`,`LAUNCH 09:12`,`VBT    150 L`,`WT D2 A2`,`O2  2x2200 L`,`LiOH  1+2`,`BATT A 100% B 100%`,``,`CHECKLIST`,`[x] HATCH SEAL`,`[x] O2 FLOW 0.4`,`[x] SCRUBBER FAN`,`[x] UQC CHECK`,`[x] LAMPS`,`[ ] ______`].forEach((t,n)=>e.fillText(t,14,58+n*19)),e.strokeStyle=`#8aa`,e.lineWidth=1;for(let r=64;r<n;r+=19)e.beginPath(),e.moveTo(10,r+4),e.lineTo(t-10,r+4),e.stroke()})}function If(e){return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}var Lf=1.05,Rf=new U(0,.05,-2.3),zf=new U(0,.06,.2),Bf=-.19,Vf=[{dir:new U(0,-.24,-1).normalize(),half:.52,main:!0},{dir:new U(-.82,-.28,-.5).normalize(),half:.2},{dir:new U(.82,-.28,-.5).normalize(),half:.2},{dir:new U(0,-.93,-.36).normalize(),half:.17}];function Hf(e){return e.onBeforeCompile=e=>{e.uniforms.uVp={value:Vf.map(e=>e.dir)},e.uniforms.uVpCos={value:Vf.map(e=>Math.cos(e.half))},e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vLocalP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vLocalP = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
      varying vec3 vLocalP; uniform vec3 uVp[4]; uniform float uVpCos[4];`).replace(`void main() {`,`void main() {
      vec3 ld = normalize(vLocalP);
      for (int i = 0; i < 4; i++) if (dot(ld, uVp[i]) > uVpCos[i]) discard;`)},e.customProgramCacheKey=()=>`shell-vp`,e}function Uf(e){return new Dt().setFromUnitVectors(new U(0,1,0),e)}function Wf(e,t=Lf){return e.clone().normalize().multiplyScalar(t)}var Gf=class{constructor(e){this.scene=new Nn,this.root=new W,this.sphere=new W,this.sphere.position.copy(Rf),this.root.add(this.sphere),this.scene.add(this.root);let t=new Ns(e);this.env=t.fromScene(new vf,.04).texture,this.scene.environment=this.env,this.scene.environmentIntensity=.35,this.animated=[],this.leds={},this.gauges={},this.breakerMeshes={},this.mfd={},this.stick=null,this.leakPoints={}}async build(){let e=this.sphere,[t,n,r,i,a,o,s]=await Promise.all([Ad({color:13618113,repeat:5,rough:[.45,.62]}),kd(`brushed`,{repeat:2,metal:!0,roughness:1,color:12567752}),kd(`leather`,{repeat:3,roughness:1,color:2763824}),kd(`grate`,{repeat:4,metal:!0,color:9080208}),kd(`floor`,{repeat:3,metal:!0,color:7106676}),kd(`rust`,{repeat:1,metal:!0}),kd(`hull`,{repeat:2,metal:!0,color:10133670})]);this.mats={paint:t,brushed:n,leather:r,grate:i,floor:a,rust:o,hullM:s};let c=jd(new J({color:1842979,metalness:.7,roughness:.42}),{scale:5,wear:.5,key:`dm`}),l=jd(new J({color:723982,metalness:.2,roughness:.55}),{scale:6,wear:.4,key:`bk`}),u=new J({color:526602,roughness:.9}),d=n.clone();d.color.set(10986394),d.roughness=.9;let f=jd(new J({color:14723072,roughness:.45,metalness:.1}),{scale:6,wear:.9,key:`ye`}),p=jd(new J({color:10686734,roughness:.35,metalness:.2}),{scale:5,wear:.9,key:`re`}),m=jd(new J({color:1924918,roughness:.4,metalness:.3}),{scale:4,wear:1,key:`gr`}),h=jd(new J({color:1381653,roughness:.6}),{scale:12,wear:.5,key:`cb`}),g=jd(new J({color:11553814,roughness:.55}),{scale:12,wear:.8,key:`co`}),_=new J({color:12088115,metalness:1,roughness:.3});this.darkMetal=c;let v=new K(new ka(Lf,96,64),Hf(t.clone()));v.material.side=1,v.receiveShadow=!0,e.add(v);let y=new K(new ka(1.0150000000000001,64,32,0,Math.PI*2,Math.PI*.58,Math.PI*.42),Hf(r.clone()));y.material.side=1,y.receiveShadow=!0,e.add(y);let b={map:Dd(`wallpanel_color`,{srgb:!0}),orm:Dd(`wallpanel_orm`),normal:Dd(`wallpanel_normal`)};this.outfit=Af(e,{R:Lf,ports:Vf,floorY:-.62,dark:new J({color:3817027,roughness:.8,metalness:.3}),mats:{panelTex:b,steel:new J({color:12106944,metalness:1,roughness:.32}),anodised:new J({color:1776929,metalness:.6,roughness:.38}),cable:h,cableOr:g,titanium:d,strap:new J({color:2105894,roughness:.95}),handle:new J({color:15905792,roughness:.4,metalness:.1}),firstAid:new J({color:15263456,roughness:.6}),bottle:new Ha({color:10471656,roughness:.15,transparent:!0,opacity:.7,clearcoat:1}),clipboard:new J({color:3811866,roughness:.7})}}),this.glass=[];for(let t of Vf){let r=Uf(t.dir.clone().negate()),i=Math.sin(t.half)*Lf,a=t.main?.22:.16,o=new W;o.position.copy(Wf(t.dir,Lf*Math.cos(t.half)+0)),o.quaternion.copy(r),e.add(o);let s=new K(new q(i*1,i*.82,a,64,1,!0),d);s.material=d.clone(),s.material.side=2,s.position.y=-a/2,o.add(s);let l=new K(new Aa(i*1.02,t.main?.03:.022,12,96),c);l.rotation.x=Math.PI/2,l.position.y=.005,o.add(l);let u=t.main?24:12,f=new pi(new q(.009,.009,.016,6),n,u),p=new Zt;for(let e=0;e<u;e++){let t=e/u*Math.PI*2;p.makeTranslation(Math.cos(t)*i*1.02,.03,Math.sin(t)*i*1.02),f.setMatrixAt(e,p)}o.add(f);let m=new Ha({color:16777215,metalness:0,roughness:.05,transparent:!0,opacity:.06,envMapIntensity:.6,clearcoat:1,clearcoatRoughness:.05,depthWrite:!1,side:2});m.userData.cond={value:0},m.userData.wet={value:0},m.onBeforeCompile=e=>{e.uniforms.uCond=m.userData.cond,e.uniforms.uWet=m.userData.wet,e.uniforms.uT={value:0},m.userData.shader=e,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec2 vUv2;`).replace(`#include <uv_vertex>`,`#include <uv_vertex>
vUv2 = uv;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
          varying vec2 vUv2; uniform float uCond; uniform float uWet; uniform float uT;
          float gh(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
          float drops(vec2 uv, float sc){ vec2 g = uv * sc; vec2 i = floor(g); vec2 f = fract(g) - 0.5;
            vec2 o = vec2(gh(i), gh(i + 7.1)) - 0.5; float r = 0.12 + 0.2 * gh(i + 3.3);
            return smoothstep(r, r * 0.6, length(f - o * 0.6)) * step(0.45, gh(i + 1.7)); }`).replace(`#include <opaque_fragment>`,`
            float fogEdge = smoothstep(0.1, 0.5, length(vUv2 - 0.5));
            float cond = uCond * (0.5 + 0.5 * fogEdge);
            float d = drops(vUv2, 26.0) + drops(vUv2 + 0.37, 47.0) * 0.8;
            vec2 ruv = vUv2 * vec2(18.0, 3.0) + vec2(0.0, uT * 0.12);
            float rivulet = uWet * smoothstep(0.93, 1.0, sin(ruv.x + sin(ruv.y * 4.0 + vUv2.x * 9.0) * 0.8)) ;
            diffuseColor.a = clamp(diffuseColor.a + cond * 0.42 + d * cond * 0.4 + rivulet * 0.25, 0.0, 0.9);
            outgoingLight = mix(outgoingLight, vec3(0.62, 0.66, 0.7) * 0.25, cond * 0.6);
            outgoingLight += (d * cond + rivulet) * 0.12;
            #include <opaque_fragment>`)},m.customProgramCacheKey=()=>`vpglass`;let h=new K(new Gi(i*.83,64),m);h.rotation.x=Math.PI/2,h.position.y=-a+.002,h.renderOrder=10,o.add(h),this.glass.push(m);let g=new Ba({transparent:!0,depthWrite:!1,side:1,uniforms:{uL:this._acrylicL||={value:1}},vertexShader:`varying vec3 vN; varying vec3 vV; varying float vY;
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - w.xyz);
            vY = uv.y; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`varying vec3 vN; varying vec3 vV; varying float vY; uniform float uL;
          void main(){ float g = 1.0 - abs(dot(normalize(vN), vV)); float tir = pow(g, 3.0);
            float band = smoothstep(0.0, 0.15, vY) * smoothstep(1.0, 0.8, vY);
            vec3 c = mix(vec3(0.05, 0.12, 0.11), vec3(0.55, 0.75, 0.72), tir) * uL;
            gl_FragColor = vec4(c, (0.28 + tir * 0.45) * band); }`}),_=new K(new q(i*.975,i*.81,a*.96,64,1,!0),g);_.position.y=-a/2,_.renderOrder=9,o.add(_);let v=new Ba({transparent:!0,depthWrite:!1,side:2,uniforms:{uL:this._acrylicL,uSeed:{value:Math.random()*10}},vertexShader:`varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix) * normal); vV = normalize(cameraPosition - w.xyz);
            gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`varying vec2 vUv; varying vec3 vN; varying vec3 vV; uniform float uL; uniform float uSeed;
          float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
          float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
            return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
          float fbm(vec2 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++){ s += a * n(p); p *= 2.03; a *= 0.5; } return s; }
          void main(){
            vec2 p = vUv - 0.5; float r = length(p) * 2.0;
            // smudge patches concentrated near the lower rim (where hands brace)
            float sm = smoothstep(0.55, 0.8, fbm(p * 5.0 + uSeed)) * (0.35 + 0.65 * smoothstep(0.2, 0.9, r)) * (0.6 + 0.4 * smoothstep(0.2, -0.4, p.y));
            // fingerprint ridges inside a few prints
            vec2 fp = (p - vec2(0.28, -0.25)) * 60.0; float ridge = 0.5 + 0.5 * sin(length(fp * vec2(1.0, 0.8)) * 6.0);
            float print = smoothstep(0.9, 0.3, length(p - vec2(0.28, -0.25)) * 14.0) * ridge;
            // circular wipe marks + hairline scratches
            float wipe = smoothstep(0.62, 0.7, fbm(vec2(atan(p.y, p.x) * 3.0, r * 40.0) + uSeed)) * 0.5;
            float scr = smoothstep(0.985, 1.0, n(vec2(dot(p, vec2(0.8, 0.6)) * 900.0, p.y * 4.0 + uSeed))) * 0.7;
            float fres = 0.04 + 0.96 * pow(1.0 - abs(dot(normalize(vN), vV)), 5.0);
            float grime = sm * 0.55 + print * 0.5 + wipe * 0.3 + scr;
            vec3 refl = vec3(0.95, 0.9, 0.82) * (fres * 0.35 + grime * 0.22) * uL;
            float a = clamp(fres * 0.25 + grime * 0.16, 0.0, 0.5) * smoothstep(1.0, 0.94, r);
            gl_FragColor = vec4(refl + vec3(0.02, 0.05, 0.05) * 0.4, a + 0.035); }`}),y=new K(new Gi(i*.975,64),v);y.rotation.x=Math.PI/2,y.position.y=-.012,y.renderOrder=11,o.add(y),t.main&&(this.mainVP=o)}let x=new W;x.position.set(0,-.42,-.52),x.rotation.x=-.55,e.add(x);let S=new K(new _f(1.25,.05,.42,4,.02),c);S.castShadow=S.receiveShadow=!0,x.add(S),this.console=x;let C=(e,t,n,r,i,a,o=512,s=320)=>{let u=bf(o,s,e=>{e.fillStyle=`#000`,e.fillRect(0,0,o,s)}),d=new K(new _f(t+.05,n+.05,.03,3,.01),l);d.position.copy(r),d.rotation.y=i,a.add(d);let f=new K(new Oa(t,n),new Wr({map:u,toneMapped:!1}));f.position.z=.0165,d.add(f);let p=new Ui(.018,.012,.008);for(let e=0;e<5;e++){let r=new K(p,c);r.position.set(-t/2+(e+.5)*(t/5),-n/2-.018,.018),d.add(r)}return this.mfd[e]={tex:u,ctx:u.userData.ctx,w:o,h:s,mesh:f,bez:d},f.userData.action={type:`mfd`,id:e},d},w=new W;w.position.set(0,.03,-.12),w.rotation.x=-1.05,x.add(w),C(`left`,.33,.21,new U(-.39,.12,.03),.28,w),C(`center`,.36,.225,new U(0,.12,0),0,w),C(`right`,.33,.21,new U(.39,.12,.03),-.28,w);let T=new W;T.position.copy(Wf(new U(-.92,-.05,-.2),.89)),T.lookAt(0,-.05,.1),e.add(T),C(`lss`,.28,.2,new U(0,0,0),0,T,448,320);let E=new W;E.position.copy(Wf(new U(.92,-.05,-.2),.89)),E.lookAt(0,-.05,.1),e.add(E),C(`cam`,.3,.19,new U(0,0,0),0,E,480,304);let D=new q(.011,.011,.012,16),O=new ka(.0045,8,6);[`AP`,`HDG`,`DPT`,`ALT`,`SPD`,`STN`,`NAV`,`OAS`,`LT1`,`LT2`,`VBT`,`TRM`,`ALM`,`CAM`].forEach((e,t)=>{let n=-.55+t*.085,r=new K(D,c);r.position.set(n,.032,.14),x.add(r),r.userData.action={type:`button`,id:e},(this.buttons||={})[e]=r;let i=new K(O,new Wr({color:1118481,toneMapped:!1}));i.position.set(n,.035,.11),x.add(i),this.leds[e]=i;let a=new K(new Oa(.05,.014),new Wr({map:xf(e,{w:128,h:36,bg:`#15181b`,fg:`#cfd6dc`,border:!1,font:`bold 26px ${Cf}`}),toneMapped:!1,transparent:!0}));a.rotation.x=-Math.PI/2,a.position.set(n,.0265,.17),x.add(a),a.material.color.setScalar(.35)});let k=new _f(.07,.035,.02,2,.004),A=(e,t,n)=>{let r=xf(e,{w:160,h:80,bg:`#1a0000`,fg:t,border:!1,font:`bold 30px ${Sf}`}),i=new K(k,[c,c,c,c,new Wr({map:r,toneMapped:!1}),c]);return i.position.set(n,.31,.02),i.rotation.x=.35,w.parent.add(i),i};this.annWarn=A(`WARNING`,`#ff3b30`,-.07),this.annCaut=A(`CAUTION`,`#ffb000`,.07),this.annWarn.position.set(-.07,.07,-.25),this.annCaut.position.set(.07,.07,-.25),this.annWarn.rotation.x=-.4,this.annCaut.rotation.x=-.4;let j=(t,r,i,a,o,s,c)=>{let l=new W;l.position.copy(o),e.add(l),l.lookAt(s);let u=bf(256,256,e=>{e.fillStyle=`#0d0f11`,e.beginPath(),e.arc(128,128,126,0,7),e.fill(),e.strokeStyle=`#e8e2d0`,e.fillStyle=`#e8e2d0`,e.lineWidth=3,e.beginPath(),e.arc(128,128,110,Math.PI*.75,Math.PI*2.25),e.stroke();for(let t=0;t<=a*5;t++){let n=Math.PI*.75+t/(a*5)*Math.PI*1.5,r=t%5==0?18:9;e.lineWidth=t%5==0?3:1.5,e.beginPath(),e.moveTo(128+Math.cos(n)*110,128+Math.sin(n)*110),e.lineTo(128+Math.cos(n)*(110-r),128+Math.sin(n)*(110-r)),e.stroke(),t%5==0&&(e.font=`bold 20px ${Cf}`,e.textAlign=`center`,e.textBaseline=`middle`,e.fillText(String(Math.round(t/(a*5)*i)),128+Math.cos(n)*72,128+Math.sin(n)*72))}e.font=`bold 20px ${Sf}`,e.fillStyle=`#f2b400`,e.fillText(r,128,170),e.fillStyle=`#9aa`,e.font=`14px ${Cf}`,e.fillText(c,128,192)}),d=new K(new Gi(.055,48),new J({map:u,roughness:.4,emissive:16777215,emissiveMap:u,emissiveIntensity:.08}));l.add(d);let f=new K(new Aa(.057,.006,8,48),n);l.add(f);let p=new K(new Ui(.004,.045,.002),new Wr({color:16734751,toneMapped:!1}));p.geometry.translate(0,.02,0);let m=new W;m.position.z=.004,m.add(p),l.add(m);let h=new K(new Gi(.056,48),new Ha({transparent:!0,opacity:.08,roughness:.02,clearcoat:1,depthWrite:!1}));h.position.z=.008,l.add(h),this.gauges[t]={pivot:m,max:i}},M=new U(0,.1,.3);j(`depth`,`深度`,12e3,12,Wf(new U(-.5,.05,-.86),.98),M,`METRES`),j(`o2`,`O2 流量`,2,4,Wf(new U(.5,.05,-.86),.98),M,`L/min`),j(`cabinP`,`艦内気圧`,3,6,Wf(new U(.62,.3,-.72),.98),M,`bar`),j(`volt`,`主母線`,400,8,Wf(new U(-.62,.3,-.72),.98),M,`VDC`);let N=new W;N.position.copy(Wf(new U(0,1,-.2),.9400000000000001)),N.lookAt(0,0,.35),e.add(N);let P=new K(new _f(.62,.3,.05,3,.012),c);N.add(P);let ee=new _f(.03,.05,.03,2,.004),F=new Ui(.012,.026,.012);tf.forEach((e,t)=>{let n=t%5,r=t/5|0,i=-.24+n*.12,a=.06-r*.13,o=new K(ee,l);o.position.set(i,a,.035),N.add(o);let s=new K(F,new J({color:15263976,roughness:.4}));s.position.set(0,.008,.02),o.add(s);let c=new K(O,new Wr({color:65382,toneMapped:!1}));c.position.set(.024,.018,.012),o.add(c);let u=new K(new Oa(.1,.022),new Wr({map:xf(e.en,{w:256,h:56,bg:`#1b1e21`,fg:`#d9dde0`,border:!1,font:`bold 30px ${Cf}`}),toneMapped:!1}));u.position.set(i,a-.045,.028),u.material.color.setScalar(.5),N.add(u),this.breakerMeshes[e.id]={lever:s,led:c},o.userData.action={type:`breaker`,id:e.id}}),this.overhead=N;let te=new Wr({color:16773597,toneMapped:!1});this.stripMat=te;for(let t of[-1,1]){let n=new K(new Wi(.012,.42,4,12),te);n.position.copy(Wf(new U(t*.42,.88,.1),1.02)),n.lookAt(0,0,0),n.rotateX(Math.PI/2),e.add(n)}this.cabinLights=[];for(let t of[-1,1]){let n=new Io(16772829,.9,3.2,1.6);n.position.copy(Wf(new U(t*.42,.88,.1),.93)),e.add(n),this.cabinLights.push(n)}this.washers=[];for(let[t,n]of[[1.9,.34],[-1.9,.34],[2.7,.34],[-2.7,.34]]){let r=new U(Math.cos(n)*Math.sin(t),Math.sin(n),-Math.cos(n)*Math.cos(t)),i=new Po(16770760,.6,1.8,.9,.9,2);i.position.copy(r).multiplyScalar(.9600000000000001);let a=new U(Math.cos(n-.9)*Math.sin(t),Math.sin(n-.9),-Math.cos(n-.9)*Math.cos(t)).multiplyScalar(.99);i.target.position.copy(a),e.add(i),e.add(i.target),this.washers.push(i);let o=new K(new q(.018,.018,.01,16),new Wr({color:16773341,toneMapped:!1}));o.position.copy(i.position),o.lookAt(a),o.rotateX(Math.PI/2),e.add(o),i.userData.puck=o}let I=new Po(16773344,3.5,4,1,.8,1.5);I.position.set(0,.85,.3),I.target.position.set(0,-.4,-.5),I.castShadow=!0,I.shadow.mapSize.set(1024,1024),I.shadow.bias=-5e-4,I.shadow.radius=4,e.add(I),e.add(I.target),this.keyLight=I,this.screenGlow=new Io(6277375,.35,1.5,2),this.screenGlow.position.set(0,-.2,-.55),e.add(this.screenGlow),this.alarmLights=[];for(let t of[-1,1]){let n=new Io(16718346,0,3.5,1.6);n.position.copy(Wf(new U(t*.75,.55,.3),.9500000000000001)),e.add(n),this.alarmLights.push(n);let r=new K(new ka(.025,16,12,0,Math.PI*2,0,Math.PI/2),new Wr({color:2228224,toneMapped:!1}));r.position.copy(Wf(new U(t*.75,.55,.3),1.03)),r.lookAt(0,0,0),r.rotateX(-Math.PI/2),e.add(r),this.alarmLights.push(r)}this.seaLight=new zo(5220568,0),this.seaLight.position.copy(Vf[0].dir).multiplyScalar(-3).negate(),this.seaLight.target.position.set(0,0,.5),e.add(this.seaLight),e.add(this.seaLight.target);let ne=new bo(10465988,1711136,.12);e.add(ne),this.hemi=ne;let re=-.62,ie=new K(new Gi(Math.sqrt(Lf**2-re**2)-.02,48),i);ie.rotation.x=-Math.PI/2,ie.position.y=re,ie.receiveShadow=!0,e.add(ie);let ae=new W;ae.position.set(0,-.5,.52),e.add(ae);let oe=new K(new _f(.52,.1,.5,4,.04),r);oe.castShadow=!0,ae.add(oe);let L=new K(new _f(.5,.62,.12,4,.05),r);L.position.set(0,.34,.28),L.rotation.x=-.18,ae.add(L);for(let e of[-1,1]){let t=new K(new _f(.1,.07,.42,3,.025),r);t.position.set(e*.31,.16,-.02),ae.add(t)}let se=new K(new q(.035,.045,.03,24),c);se.position.set(.31,.21,-.14),ae.add(se);let ce=new K(new Ki(.03,.04,16,1,!0),u);ce.position.y=.035,se.add(ce);let le=new W;le.position.y=.02,se.add(le);let ue=new K(new Wi(.018,.08,4,12),u);ue.position.y=.07,le.add(ue);let de=new K(new Ui(.01,.018,.01),p);de.position.set(0,.1,-.02),le.add(de),this.stick=le;let fe=new K(new _f(.08,.04,.12,2,.01),c);fe.position.set(-.31,.215,-.12),ae.add(fe);let pe=new K(new q(.018,.018,.012,20),u);pe.rotation.z=Math.PI/2,pe.position.set(0,.025,0),fe.add(pe),this.heaveWheel=pe;let me=new W;me.position.set(-.62,-.38,.38),e.add(me);for(let e=0;e<2;e++){let t=new K(new Wi(.075,.42,8,24),m);t.position.set(-.04,.2,-.12+e*.17),t.rotation.z=-.15,t.castShadow=!0,me.add(t);let r=new K(new q(.025,.025,.06,12),n);r.position.set(-.075,.49,-.12+e*.17),me.add(r);let i=new K(new Oa(.08,.14),new J({map:xf(`酸素`,{w:128,h:224,bg:`#f4f4f0`,fg:`#1f6a3a`,font:`bold 44px "Noto Sans JP"`,sub:`O2 MED`}),roughness:.6}));i.position.set(.04,.2,-.12+e*.17),i.rotation.y=Math.PI/2,i.rotation.z=.15,me.add(i)}let he=new K(new _f(.22,.28,.26,3,.02),t);he.position.set(.05,-.02,.2),he.castShadow=!0,me.add(he);let ge=new W;ge.position.set(.165,.02,.2),ge.rotation.z=Math.PI/2,me.add(ge);let _e=new K(new Aa(.07,.006,6,32),c);_e.rotation.x=Math.PI/2,ge.add(_e);let ve=new W;ge.add(ve);for(let e=0;e<5;e++){let t=new K(new Ui(.06,.004,.022),l);t.position.x=.03;let n=new W;n.rotation.y=e/5*Math.PI*2,t.rotation.x=.4,n.add(t),ve.add(n)}this.fanBlades=ve;let ye=new K(new Oa(.16,.05),new J({map:xf(`CO2 スクラバー`,{w:320,h:100,bg:`#e8e0c8`,fg:`#222`,font:`bold 34px "Noto Sans JP"`,sub:`LiOH`})}));ye.position.set(.05,.08,.331),me.add(ye);let be=new W;be.position.set(.72,-.3,.42),e.add(be);let xe=new K(new Wi(.05,.25,8,20),p);xe.castShadow=!0,be.add(xe);let Se=new K(new Aa(.03,.008,8,16,Math.PI),l);Se.position.y=.2,be.add(Se);let Ce=new K(new Aa(.055,.008,6,24),l);Ce.rotation.x=Math.PI/2,be.add(Ce),this.extinguisher=be;let we=new K(new _f(.18,.12,.1,3,.02),f);we.position.set(.7,-.05,.55),we.lookAt(0,-.05,.3),e.add(we);let Te=new K(new Oa(.15,.05),new Wr({map:xf(`緊急呼吸器`,{w:320,h:100,bg:`#f2b400`,fg:`#111`,font:`bold 40px "Noto Sans JP"`,sub:`EMERGENCY BREATHING`})}));Te.position.z=.051,we.add(Te);let Ee={P1:new U(-.55,-.55,.62),P2:new U(.55,-.55,.62),P3:new U(-.35,.3,.88),P4:new U(.45,-.75,.45),VP:Vf[0].dir.clone().multiplyScalar(1).add(new U(.32,.25,0)),HATCH:new U(0,.98,.1)};for(let t in Ee){let r=Ee[t].normalize(),i=Wf(r,1.03);if(this.leakPoints[t]={pos:i.clone().multiplyScalar(.99/Lf),dir:r.clone().negate()},t===`VP`||t===`HATCH`)continue;let a=new W;a.position.copy(i),a.quaternion.copy(Uf(r.clone().negate())),e.add(a);let o=new K(new q(.05,.06,.04,20),d);o.position.y=.02,a.add(o);let s=new K(new q(.035,.035,.03,6),n);s.position.y=.055,a.add(s);let c=new K(new Oa(.06,.02),new Wr({map:xf(t,{w:96,h:32,bg:`#f2b400`,fg:`#000`,font:`bold 24px ${Cf}`,border:!1})}));c.position.set(0,.041,.062),a.add(c);let l=[];for(let e=0;e<=8;e++){let t=e/8,n=r.clone().lerp(new U(Math.sign(r.x||1)*.3,-.6,-.7).normalize(),t).normalize();l.push(Wf(n,1-.04*Math.sin(t*Math.PI)).add(new U(0,.02*Math.sin(t*9),0)))}new ca(l);for(let t=0;t<3;t++){let n=new U((t-1)*.012,0,0),r=new K(new ja(new ca(l.map(e=>e.clone().add(n))),48,t===1?.01:.007,8),t===1?g:h);r.castShadow=!0,e.add(r)}}let De=new W;De.position.copy(Wf(new U(0,1,.1),1.04)),De.quaternion.copy(Uf(new U(0,-1,-.1).normalize())),e.add(De);let Oe=new K(new Aa(.24,.03,12,64),d);Oe.rotation.x=Math.PI/2,De.add(Oe);let ke=new K(new Aa(.12,.012,8,32),n);ke.rotation.x=Math.PI/2,ke.position.y=.06,De.add(ke);for(let e=0;e<3;e++){let t=new K(new q(.006,.006,.24,6),n);t.rotation.z=Math.PI/2,t.rotation.y=e/3*Math.PI,t.position.y=.06,De.add(t)}for(let t of[-2.2,-1.4,1.4,2.2]){let n=new U(Math.sin(t)*.8,.55,Math.cos(t)*.8).normalize(),r=new K(new Aa(.06,.009,8,20,Math.PI),f);r.position.copy(Wf(n,1.02)),r.lookAt(0,0,0),e.add(r)}let Ae=new W;Ae.position.set(.45,-.55,.05),e.add(Ae);for(let e=0;e<3;e++){let t=new K(new Ui(.2,.01,.02),_);t.position.set(0,e*.03,0),Ae.add(t)}this.busBarPos=new U(.45,-.52,.05);let R=new K(new Oa(.22,.07),new J({map:xf(`最大運用深度 11,000 m`,{w:512,h:160,bg:`#f2b400`,fg:`#111`,font:`bold 46px "Noto Sans JP"`,sub:`MAX OPERATING DEPTH — DSV-11 WADATSUMI`}),roughness:.6}));R.position.copy(Wf(new U(0,.55,-.83),1.02)),R.lookAt(0,.1,.3),e.add(R);let je=new Ha({color:735812,roughness:.08,metalness:0,transparent:!0,opacity:.8,envMapIntensity:1.2,clearcoat:1});return je.onBeforeCompile=e=>{e.uniforms.uT={value:0},je.userData.shader=e,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uT;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        transformed.z += sin(position.x * 22.0 + uT * 3.1) * 0.004 + sin(position.y * 17.0 - uT * 2.3) * 0.004;`)},this.water=new K(new Gi(1,64,0,Math.PI*2),je),this.water.rotation.x=-Math.PI/2,this.water.visible=!1,this.water.renderOrder=5,e.add(this.water),this._initParticles(),this.root.traverse(e=>{e.isMesh&&(e.frustumCulled=!0)}),this}_initParticles(){let e=1400,t=new Mr;this.pPos=new Float32Array(e*3),this.pVel=new Float32Array(e*3),this.pLife=new Float32Array(e),this.pKind=new Float32Array(e),this.pSize=new Float32Array(e),t.setAttribute(`position`,new _r(this.pPos,3)),t.setAttribute(`life`,new _r(this.pLife,1)),t.setAttribute(`kind`,new _r(this.pKind,1)),t.setAttribute(`size`,new _r(this.pSize,1));let n=new Ba({transparent:!0,depthWrite:!1,blending:2,uniforms:{uPR:{value:1}},vertexShader:`attribute float life; attribute float kind; attribute float size; varying float vL; varying float vK; uniform float uPR;
        void main(){ vL = life; vK = kind; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = life > 0.0 ? size * uPR * (1.0 / -mv.z) : 0.0; }`,fragmentShader:`varying float vL; varying float vK; void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5 || vL <= 0.0) discard;
        vec3 col; float a;
        if (vK < 0.5) { col = vec3(0.55, 0.7, 0.78) * 0.9; a = smoothstep(0.5, 0.1, r) * 0.55 * min(1.0, vL * 3.0); }
        else if (vK < 1.5) { col = mix(vec3(1.0, 0.5, 0.1), vec3(1.0, 0.95, 0.7), vL) * 18.0; a = smoothstep(0.5, 0.0, r) * vL; }
        else { col = vec3(0.07, 0.065, 0.06); a = smoothstep(0.5, 0.0, r) * 0.35 * min(1.0, vL); }
        gl_FragColor = vec4(col * a, a); }`});this.pMat=n,this.smokeMat=n.clone(),this.smokeMat.blending=1,this.particles=new Ii(t,n),this.particles.frustumCulled=!1,this.particles.renderOrder=20,this.sphere.add(this.particles),this.pN=e,this.pNext=0}setShadows(e){this.keyLight&&(this.keyLight.castShadow=!!e)}emit(e,t,n,r,i){let a=this.pNext;this.pNext=(this.pNext+1)%this.pN,this.pPos[a*3]=t.x,this.pPos[a*3+1]=t.y,this.pPos[a*3+2]=t.z,this.pVel[a*3]=n.x,this.pVel[a*3+1]=n.y,this.pVel[a*3+2]=n.z,this.pLife[a]=r,this.pKind[a]=e,this.pSize[a]=i}sparks(e,t=30){let n=new U;for(let r=0;r<t;r++)n.set((Math.random()-.5)*2.5,Math.random()*2,(Math.random()-.5)*2.5),this.emit(1,e,n,.4+Math.random()*.5,6+Math.random()*6)}update(e,t,n){let{sub:r,sys:i,ap:a,inc:o}=n;this.root.position.copy(r.pos),this.root.quaternion.copy(r.quat);let s=r.floodL/1e3;if(s>.002){let e=Lf,n=-1.05,i=e;for(let t=0;t<20;t++){let t=(n+i)/2,r=t+e;Math.PI*r*r*(3*e-r)/3>s?i=t:n=t}let a=(n+i)/2;this.water.visible=!0,this.water.position.y=a;let o=Math.sqrt(Math.max(1e-4,e*e-a*a))-.01;this.water.scale.set(o,o,1),this.water.rotation.set(-Math.PI/2-r.pitch,0,r.roll),this.water.material.userData.shader&&(this.water.material.userData.shader.uniforms.uT.value=t)}else this.water.visible=!1;let c=new U;for(let t in i.pen){let n=i.pen[t];if(n.leakRate<=5e-4)continue;let r=this.leakPoints[t];if(!r)continue;let a=Math.min(60,4+n.leakRate*300),o=Math.floor(a*e+Math.random()),s=Math.min(12,1+Math.sqrt(n.leakRate)*8);for(let e=0;e<o;e++)c.copy(r.dir).multiplyScalar(s*(.6+Math.random()*.6)),c.x+=(Math.random()-.5)*s*.25,c.y+=(Math.random()-.5)*s*.25,c.z+=(Math.random()-.5)*s*.25,this.emit(0,r.pos,c,.6+Math.random()*.4,10+Math.random()*18)}i.fire.active&&(Math.random()<e*(4+i.fire.intensity*20)&&this.sparks(this.busBarPos,6+Math.random()*12|0),Math.random()<e*20*i.fire.intensity&&this.emit(2,this.busBarPos,new U((Math.random()-.5)*.2,.25,(Math.random()-.5)*.2),3,180)),n.sparkBurst&&=(this.sparks(n.sparkBurst,40),null);for(let t=0;t<this.pN;t++){if(this.pLife[t]<=0)continue;let n=this.pKind[t];this.pLife[t]-=e*(n===2?.25:1);let r=t*3;n===0?this.pVel[r+1]-=9.8*e:n===1?this.pVel[r+1]-=6*e:this.pSize[t]+=e*30,this.pPos[r]+=this.pVel[r]*e,this.pPos[r+1]+=this.pVel[r+1]*e,this.pPos[r+2]+=this.pVel[r+2]*e,this.pPos[r]**2+this.pPos[r+1]**2+this.pPos[r+2]**2>1.01**2&&n!==2&&(this.pLife[t]=n===0?Math.min(this.pLife[t],.05):0,this.pVel[r]*=-.2,this.pVel[r+1]*=-.2,this.pVel[r+2]*=-.2)}let l=this.particles.geometry;l.attributes.position.needsUpdate=!0;for(let e of this.glass)e.userData.cond.value=i.condensation,e.userData.wet.value=+(i.pen.VP?.leakRate>0),e.userData.shader&&(e.userData.shader.uniforms.uT.value=t);let u=i.powered(`CABIN`),d=!u,f=u?i.lights.cabin:0,p=(i.fire.active||r.floodL>150)&&Math.random()<.05?.2:1;for(let e of this.cabinLights)e.intensity=1.2*f*p;this._acrylicL&&(this._acrylicL.value=.08+f*2.2*p);for(let e of this.washers)e.intensity=1.6*f*p,e.userData.puck.material.color.setRGB(1,.94,.86).multiplyScalar(.05+f*6*p);this.keyLight.intensity=3.5*f*p,this.stripMat.color.setRGB(1,.94,.86).multiplyScalar((.1+f*2.4)*p);let m=n.alarmLevel||0,h=m>0?Math.sin(t*(m>1?9:4.5))*.5+.5:0,g=Math.max(d?.55:0,h*(m>1?1:.55));for(let e=0;e<this.alarmLights.length;e++){let t=this.alarmLights[e];t.isLight?t.intensity=g*1.6:t.material.color.setRGB(.1+g*12,g*.6,0)}this.hemi.intensity=.06+f*.1;let _=n.ambient,v=Math.min(1.5,(_.r+_.g+_.b)*.5);this.seaLight.color.setRGB(_.r*.4+.02,_.g*.8+.03,_.b+.05).multiplyScalar(1),this.seaLight.intensity=v*.8+(n.extLight||0)*.08,this.screenGlow.intensity=i.powered(`NAV`)?.45:.05;let y=(e,t,n=65382)=>{let r=this.leds[e];r&&(r.material.color.set(t?n:789516),t&&r.material.color.multiplyScalar(4))};y(`AP`,a.engaged,3407718),y(`HDG`,a.hdg.on&&a.engaged),y(`DPT`,a.depth.on&&a.engaged),y(`ALT`,a.alt.on&&a.engaged),y(`SPD`,a.speed.on&&a.engaged),y(`STN`,a.station.on&&a.engaged),y(`NAV`,a.nav.on&&a.engaged),y(`OAS`,a.oas.on,a.oas.threat>.3?16724736:65382),y(`LT1`,i.lights.main>0&&i.powered(`LIGHT`),16777215),y(`LT2`,i.lights.flood>0&&i.powered(`LIGHT`),16777215),y(`VBT`,r.vbtCmd!==0,r.vbtCmd>0?3386111:16755200),y(`TRM`,r.trimCmd!==0,16755200),y(`ALM`,m>0&&Math.sin(t*8)>0,16720384),y(`CAM`,i.powered(`CAM`),3407718);let b=m>1&&Math.sin(t*7)>-.2,x=m>0;this.annWarn.material[4].color.setScalar(b?6:.15),this.annCaut.material[4].color.setScalar(x?4:.15);for(let e in this.breakerMeshes){let n=i.breakers[e],r=this.breakerMeshes[e];r.lever.position.y=n.closed&&!n.tripped?.008:n.tripped?0:-.008,r.led.material.color.set(n.tripped?16737792:n.closed&&i.powered(e)?65382:2228224).multiplyScalar(n.tripped&&Math.sin(t*6)<0?.2:3)}let S=(t,n)=>{let r=this.gauges[t],i=Et.clamp(n/r.max,0,1.02),a=-(Math.PI*.75+i*Math.PI*1.5)+Math.PI/2+Math.PI;r.pivot.rotation.z+=(a-r.pivot.rotation.z)*Math.min(1,e*6)};if(S(`depth`,r.depth+i.sensors.depthDrift*.2),S(`o2`,i.o2RegOK&&i.o2Bottles>0&&i.powered(`LSS`)?i.o2Flow+Math.sin(t*3)*.01:0),S(`cabinP`,i.cabinP),S(`volt`,i.bat.A.online?i.bat.A.v:i.bat.B.online?i.bat.B.v:0),this.stick){let t=n.pilot;this.stick.rotation.x+=(t.surge*.35-this.stick.rotation.x)*Math.min(1,e*10),this.stick.rotation.z+=(-t.yaw*.35-this.stick.rotation.z)*Math.min(1,e*10),this.heaveWheel.rotation.x+=t.heave*e*6}this.fanBlades&&i.scrubber.fan&&i.scrubber.fanOK&&i.powered(`LSS`)&&(this.fanBlades.rotation.y+=e*40)}},X={bg:`#02070b`,grid:`#0c2330`,line:`#1d4c63`,txt:`#9fe6ff`,dim:`#4d8aa3`,ok:`#3dff8a`,warn:`#ffb000`,alarm:`#ff3b30`,white:`#e9f7ff`,cyan:`#35d7ff`,mag:`#ff5ce1`};function Kf(e,t,n,r,i=``){e.fillStyle=X.bg,e.fillRect(0,0,t,n),e.fillStyle=`rgba(80,180,220,0.035)`;for(let r=0;r<n;r+=3)e.fillRect(0,r,t,1);e.fillStyle=`#062030`,e.fillRect(0,0,t,26),e.fillStyle=X.cyan,e.font=`bold 18px ${Cf}`,e.textBaseline=`middle`,e.textAlign=`left`,e.fillText(r,10,13),e.textAlign=`right`,e.fillStyle=X.dim,e.fillText(i,t-10,13),e.textAlign=`left`}function Z(e,t,n,r,i=X.txt,a=16,o=`left`,s=Cf){e.fillStyle=i,e.font=`bold ${a}px ${s}`,e.textAlign=o,e.textBaseline=`middle`,e.fillText(t,n,r)}function qf(e,t,n,r,i,a,o,s=`#0a1a22`){e.fillStyle=s,e.fillRect(t,n,r,i),e.fillStyle=o,e.fillRect(t,n,r*Math.max(0,Math.min(1,a)),i),e.strokeStyle=X.line,e.lineWidth=1,e.strokeRect(t+.5,n+.5,r-1,i-1)}var Jf=(e,t=0)=>Number.isFinite(e)?e.toFixed(t):`---`,Yf=(e,t,n,r=!1)=>r?e<n?X.alarm:e<t?X.warn:X.ok:e>n?X.alarm:e>t?X.warn:X.ok,Xf=class{constructor(e){this.cp=e,this.t=0,this.k=0,this.sonarImg=null,this.sonarSweep=0,this.pages={left:`NAV`,center:`PFD`,right:`SYS`}}update(e,t){this.t+=e,this.sonarSweep+=e*1.6,this.k++;let n=[`center`,`left`,`right`,`lss`,`cam`];for(let e=0;e<2;e++){let r=n[(this.k*2+e)%n.length],i=this.cp.mfd[r];if(!i)continue;let a=r===`lss`?t.sys.powered(`LSS`):r===`cam`?t.sys.powered(`CAM`):t.sys.powered(`NAV`),o=i.ctx;if(!a){o.fillStyle=`#000`,o.fillRect(0,0,i.w,i.h),i.tex.needsUpdate=!0,i.mesh.material.color.setScalar(1);continue}let s=r===`lss`?`LSS`:r===`cam`?`CAM`:this.pages[r];this[`draw`+s](o,i.w,i.h,t),i.mesh.material.color.setScalar(t.sys.flash>0||t.sub.floodL>200&&Math.random()<.08?.4:1.25),i.tex.needsUpdate=!0}}drawPFD(e,t,n,r){let{sub:i,ap:a,sys:o}=r,s=a.m||{};Kf(e,t,n,`PFD  主飛行表示`,a.engaged?`AP `+a.status:`MANUAL`);let c=t/2;e.save(),e.beginPath(),e.arc(c,150,95,0,Math.PI*2),e.clip(),e.translate(c,150),e.rotate(-i.roll);let l=i.pitch*180/Math.PI*3.2;e.fillStyle=`#0c3a55`,e.fillRect(-200,-300+l,400,300),e.fillStyle=`#2b1a0c`,e.fillRect(-200,l,400,300),e.strokeStyle=X.white,e.lineWidth=2,e.beginPath(),e.moveTo(-200,l),e.lineTo(200,l),e.stroke(),e.lineWidth=1.2,e.font=`12px ${Cf}`,e.fillStyle=X.white,e.textAlign=`center`;for(let t=-30;t<=30;t+=5){if(!t)continue;let n=l-t*3.2,r=t%10==0?30:15;e.beginPath(),e.moveTo(-r,n),e.lineTo(r,n),e.stroke(),t%10==0&&e.fillText(String(Math.abs(t)),r+14,n)}e.restore(),e.strokeStyle=X.warn,e.lineWidth=3,e.beginPath(),e.moveTo(c-50,150),e.lineTo(c-15,150),e.lineTo(c-8,158),e.moveTo(c+50,150),e.lineTo(c+15,150),e.lineTo(c+8,158),e.stroke(),e.strokeStyle=X.line,e.lineWidth=2,e.beginPath(),e.arc(c,150,95,0,Math.PI*2),e.stroke();let u=s.hdg??ff(i.yaw);e.save(),e.beginPath(),e.rect(c-150,32,300,26),e.clip();for(let t=-60;t<=60;t+=5){let n=Math.round(u/5)*5+t,r=c+(n-u)*2.5,i=(n%360+360)%360;e.strokeStyle=X.txt,e.beginPath(),e.moveTo(r,58),e.lineTo(r,i%10==0?48:53),e.stroke(),i%30==0&&Z(e,i===0?`N`:i===90?`E`:i===180?`S`:i===270?`W`:String(i/10).padStart(2,`0`),r,40,X.txt,13,`center`)}if(e.restore(),Z(e,Jf(u).padStart(3,`0`)+`°`,c,70,X.white,18,`center`),a.engaged&&(a.hdg.on||a.nav.on)){let t=c+((a.hdg.target-u+540)%360-180)*2.5;e.fillStyle=X.mag,e.fillRect(t-4,54,8,5)}Z(e,`DEPTH`,t-58,44,X.dim,12,`center`),e.fillStyle=`#041620`,e.fillRect(t-110,55,100,190);let d=s.depth??i.depth;for(let n=-4;n<=4;n++){let r=Math.round(d/10)*10+n*10,i=150+(r-d)*2.2;i<58||i>242||(e.strokeStyle=X.dim,e.beginPath(),e.moveTo(t-110,i),e.lineTo(t-96,i),e.stroke(),Z(e,String(r),t-20,i,X.dim,13,`right`))}e.fillStyle=`#000`,e.fillRect(t-112,136,104,28),e.strokeStyle=X.white,e.strokeRect(t-112,136,104,28),Z(e,Jf(d,1),t-14,150,o.sensors.depth?X.white:X.warn,18,`right`),a.engaged&&a.depth.on&&Z(e,`▶`+Jf(a.depth.target),t-60,256,X.mag,13,`center`);let f=s.vz??0;Z(e,(f>=0?`▼`:`▲`)+Jf(Math.abs(f),2)+` m/s`,t-60,272,Math.abs(f)>1.2?X.warn:X.txt,13,`center`),Z(e,`SPEED`,58,44,X.dim,12,`center`),e.fillStyle=`#041620`,e.fillRect(10,55,96,190);let p=s.u??0;Z(e,Jf(p,2),58,138,X.white,22,`center`),Z(e,`m/s`,58,160,X.dim,12,`center`),Z(e,Jf(p*1.944,1)+` kt`,58,182,X.txt,14,`center`),Z(e,`ALT`,58,206,X.dim,12,`center`),Z(e,s.dvl?Jf(s.alt,1)+` m`:`NO LOCK`,58,226,s.dvl?s.alt<5?X.alarm:s.alt<12?X.warn:X.ok:X.warn,15,`center`);let m=i.trimState;Z(e,`BUOY ${m>0?`+`:``}${Jf(-m,0)} kg`,12,n-44,Math.abs(m)>150?X.warn:X.txt,14),Z(e,`VBT ${Jf(i.vbt)} L ${i.vbtFlow>0?`注水`:i.vbtFlow<0?`排水`:``}`,12,n-24,X.txt,14),Z(e,`TRIM ${Jf(i.trim*100)}%`,c,n-44,X.txt,14,`center`),Z(e,`WT D${i.weights.descent} A${i.weights.ascent}`,c,n-24,X.txt,14,`center`);let h=a.warn||(a.oas.threat>.3?`障害物 ${Jf(a.oas.dist)} m`:``);h?(e.fillStyle=Math.sin(this.t*8)>0?`#3a0a00`:`#1a0400`,e.fillRect(t-250,n-56,240,44),Z(e,h,t-130,n-34,X.warn,15,`center`,Sf)):Z(e,`P ${Jf(Rd(Ld(i.depth)),1)} bar`,t-14,n-34,X.txt,15,`right`)}drawNAV(e,t,n,r){let{sub:i,ap:a,sys:o}=r;Kf(e,t,n,`NAV  航法`,`RNG ${this.navRange||400} m`);let s=this.navRange||400,c=t/2,l=n/2+18,u=(n/2-30)/s;e.strokeStyle=X.grid,e.lineWidth=1;for(let t=1;t<=4;t++)e.beginPath(),e.arc(c,l,t/4*s*u,0,Math.PI*2),e.stroke();let d=i.yaw,f=(e,t)=>{let n=e-i.pos.x,r=t-i.pos.z,a=Math.cos(-d),o=Math.sin(-d),s=n*a-r*o,f=n*o+r*a;return[c+s*u,l+f*u]};for(let t of ld){let[r,o]=f(t.x,t.z);if(Math.hypot(t.x-i.pos.x,t.z-i.pos.z)>s*1.5){let i=Math.atan2(o-l,r-c),s=c+Math.cos(i)*(n/2-34),u=l+Math.sin(i)*(n/2-34);e.fillStyle=a.nav.poi===t?X.mag:X.dim,e.beginPath(),e.arc(s,u,3,0,7),e.fill();continue}e.strokeStyle=a.nav.poi===t?X.mag:X.warn,e.lineWidth=2,e.beginPath(),e.moveTo(r,o-6),e.lineTo(r+6,o),e.lineTo(r,o+6),e.lineTo(r-6,o),e.closePath(),e.stroke(),Z(e,t.nameEn.split(` `).slice(0,2).join(` `),r+9,o-8,X.warn,11),Z(e,`${Jf(-t.y)}m`,r+9,o+6,X.dim,11)}if(a.nav.on&&a.nav.wp.length){let t=a.nav.wp[a.nav.idx],[n,r]=f(t.x,t.z);e.strokeStyle=X.mag,e.setLineDash([6,5]),e.beginPath(),e.moveTo(c,l),e.lineTo(n,r),e.stroke(),e.setLineDash([])}if(r.trail){e.fillStyle=X.cyan;for(let t=0;t<r.trail.length;t+=2){let[n,i]=f(r.trail[t],r.trail[t+1]);e.fillRect(n-1,i-1,2,2)}}{let[t,n]=f(0,150);e.strokeStyle=X.ok,e.strokeRect(t-5,n-5,10,10),Z(e,`MOTHERSHIP`,t+8,n,X.ok,10)}e.fillStyle=X.white,e.beginPath(),e.moveTo(c,l-12),e.lineTo(c+7,l+8),e.lineTo(c,l+4),e.lineTo(c-7,l+8),e.closePath(),e.fill();let p=i.vel,[m,h]=f(i.pos.x+p.x*60,i.pos.z+p.z*60);e.strokeStyle=X.ok,e.beginPath(),e.moveTo(c,l),e.lineTo(m,h),e.stroke(),Z(e,`X ${Jf(i.pos.x)}  Z ${Jf(i.pos.z)}`,10,n-16,X.dim,12),a.nav.on&&Z(e,`→ ${a.nav.poi?.nameEn||`WP`}  ${Jf(a.navDist)} m`,t-10,n-16,X.mag,12,`right`),Z(e,`COMMS ${o.comms.signal>0?(o.comms.signal*100).toFixed(0)+`%`:`LOST`}`,t-10,40,o.comms.signal>.2?X.ok:X.alarm,12,`right`),Z(e,`HDG UP`,10,40,X.dim,12)}drawSONAR(e,t,n,r){let{ap:i,sys:a}=r;Kf(e,t,n,`OAS  前方障害物ソナー`,`${i.oas.range} m`);let o=t/2,s=n-16,c=n-50;e.strokeStyle=X.grid;for(let t=1;t<=4;t++)e.beginPath(),e.arc(o,s,t/4*c,Math.PI*1.2,Math.PI*1.8),e.stroke();if(!a.sensors.sonar||!a.powered(`SONAR`)){Z(e,`SONAR FAIL`,o,n/2,X.alarm,26,`center`);return}for(let t of i.oas.beams){if(t.d>i.oas.range)continue;let n=-Math.PI/2+t.a*1.3,r=t.d/i.oas.range*c;e.fillStyle=t.d<15?X.alarm:t.d<30?X.warn:X.ok,e.globalAlpha=.5+(1-t.e)*.3,e.beginPath(),e.arc(o+Math.cos(n)*r,s+Math.sin(n)*r,5+(1-t.d/i.oas.range)*6,0,7),e.fill()}e.globalAlpha=1;let l=Math.sin(this.sonarSweep)*.3;e.strokeStyle=`rgba(61,255,138,0.5)`,e.beginPath(),e.moveTo(o,s),e.lineTo(o+Math.cos(-Math.PI/2+l)*c,s+Math.sin(-Math.PI/2+l)*c),e.stroke(),Z(e,`MIN ${Jf(i.oas.dist<900?i.oas.dist:NaN,1)} m`,10,40,i.oas.threat>.3?X.alarm:X.txt,14)}drawSYS(e,t,n,r){let{sub:i,sys:a}=r;Kf(e,t,n,`SYS  電力/推進`,`${Jf(a.totalPower/1e3,1)} kW`),[[`A`,a.bat.A],[`B`,a.bat.B],[`E`,a.bat.E]].forEach(([t,n],r)=>{let i=12+r*100;Z(e,`BATT ${t}`,i,42,n.online?X.txt:X.alarm,13),qf(e,i,52,88,14,n.soc,n.soc<.15?X.alarm:n.soc<.3?X.warn:X.ok),Z(e,`${Jf(n.soc*100)}%`,i+44,59,`#001`,11,`center`),Z(e,`${Jf(n.v,0)}V ${Jf(n.temp,0)}°C`,i,78,n.temp>55?X.alarm:n.fault?X.warn:X.dim,12)}),Z(e,a.cross?`X-TIE ON`:`X-TIE OFF`,t-12,42,a.cross?X.warn:X.dim,12,`right`),e.strokeStyle=X.line,e.lineWidth=2,e.beginPath(),e.ellipse(150,185,38,70,0,0,Math.PI*2),e.stroke();let o={T1:[100,245],T2:[200,245],T3:[150,150],T4:[150,225],T5:[150,120],T6:[150,260]};for(let t of i.thr){let[n,r]=o[t.id],i=t.enabled?t.fault===`failed`?X.alarm:t.fault?X.warn:t.jam>0?X.alarm:X.ok:`#444`;e.fillStyle=i,e.beginPath(),e.arc(n,r,9,0,7),e.fill(),Z(e,t.id,n,r,`#000`,10,`center`);let a=t.rpm;e.fillStyle=i,e.fillRect(n+12,r-2,a*22,4)}let s=130;for(let t of i.thr){let n=t.enabled?t.fault===`failed`?`FAIL`:t.fault===`thermal`?`TEMP`:t.fault===`degraded`?`DEGR`:t.jam>0?`JAM`:`OK`:`OFF`;Z(e,`${t.id} ${n.padEnd(4)} ${Jf(Math.abs(t.rpm)*1800).padStart(4)}rpm ${Jf(t.temp).padStart(3)}°`,255,s,n===`OK`?X.txt:n===`OFF`?X.dim:X.warn,13),s+=20}Z(e,`THR LIM ${Jf(i.thrustLimit*100)}%`,255,s+6,i.thrustLimit<1?X.warn:X.dim,13),Z(e,`HULL ${Jf(a.hull.integrity*100)}%  STRESS ${Jf(a.hull.stress*100)}%`,12,n-40,Yf(a.hull.integrity,.8,.5,!0),14),Z(e,`FLOOD ${Jf(i.floodL,1)} L  (${Jf(a.inflow*60,2)} L/min)`,12,n-18,i.floodL>5?X.alarm:X.ok,14)}drawLSS(e,t,n,r){let{sys:i,sub:a}=r;Kf(e,t,n,`LSS  生命維持`,`${Math.floor(a.time/3600)}:${String(Math.floor(a.time/60)%60).padStart(2,`0`)}`),[[`O2`,`${Jf(i.o2,1)} %`,i.o2/30,Yf(i.o2,19,17,!0)],[`CO2`,`${Jf(i.co2,2)} %`,i.co2/3,Yf(i.co2,.5,1.5)],[`気圧`,`${Jf(i.cabinP,3)} bar`,i.cabinP/2,Yf(i.cabinP,1.1,1.4)],[`温度`,`${Jf(i.cabinT,1)} °C`,i.cabinT/40,i.cabinT<12||i.cabinT>35?X.warn:X.ok],[`湿度`,`${Jf(i.rh)} %`,i.rh/100,i.rh>85?X.warn:X.ok]].forEach(([n,r,i,a],o)=>{let s=44+o*38;Z(e,n,12,s,X.txt,17,`left`,Sf),Z(e,r,t-12,s,a,18,`right`),qf(e,12,s+12,t-24,7,i,a)}),Z(e,`O2 BOTTLE ${Jf(i.o2Bottles)} L  ~${Jf(i.o2Bottles/Math.max(.1,i.o2Flow)/60,0)} h`,12,234,X.txt,13),Z(e,`LiOH ${Jf(i.scrubber.canister*100)}%  SPARE ${i.scrubber.spare}  FAN ${i.scrubber.fanOK?`OK`:`FAIL`}`,12,252,i.scrubber.fanOK?X.txt:X.alarm,13),Z(e,`PILOT ${Jf(i.pilotHealth*100)}%${i.emergencyMask?`  [EBA]`:``}`,12,270,Yf(i.pilotHealth,.7,.4,!0),13)}drawCAM(e,t,n,r){let{sub:i}=r,a=i.depth;Kf(e,t,n,`ENV  外部環境`,Gd(a)[1]),[[`水圧`,`${Jf(Rd(Ld(a)),1)} bar`],[`水温`,`${Jf(zd(a),2)} °C`],[`塩分`,`${Jf(Bd(a),2)} PSU`],[`音速`,`${Jf(Vd(a),1)} m/s`],[`溶存O2`,`${Jf(Hd(a),2)} ml/L`]].forEach(([n,r],i)=>{Z(e,n,14,48+i*30,X.dim,16,`left`,Sf),Z(e,r,t-14,48+i*30,X.white,18,`right`)}),Z(e,Gd(a)[0],t/2,n-50,X.cyan,18,`center`,Sf),Z(e,`最大到達深度 ${Jf(i.maxDepth)} m`,t/2,n-24,X.txt,14,`center`,Sf)}},Zf=(e,t=!1)=>Fu(e,{caustics:t}),Qf=class{constructor(e){this.scene=e,this.root=new W,this.root.name=`sub-exterior`,e.add(this.root),this.lamps=[],this.spots=[],this.arm=null,this.armT=0,this.armPose=0,this.armTarget=0}async build(){let e=this.root,[t,n,r]=await Promise.all([Ad({color:15790056,repeat:3,rough:[.45,.7]}),kd(`hull`,{repeat:2,metal:!0,color:8226188}),kd(`brushed`,{repeat:2,metal:!0,color:11120306})]),i=Zf(t.clone(),!0);i.color.set(15987178);let a=Zf(t.clone(),!0);a.color.set(16738834);let o=Zf(n.clone(),!0);o.color.set(3883078),o.metalness=.8;let s=Zf(r.clone(),!0);s.color.set(11052186);let c=Zf(new J({color:789775,roughness:.55,metalness:.3})),l=Zf(new J({color:15905792,roughness:.5,metalness:.1}),!0),u=Zf(new J({color:1780282,roughness:.35,metalness:.9}));this.mats={foam:i,frame:o,ti:s,black:c};let d=(t,n,r,i=o)=>{let a=new U().subVectors(n,t),s=new K(new q(r,r,a.length(),16),i);return s.position.copy(t).addScaledVector(a,.5),s.quaternion.setFromUnitVectors(new U(0,1,0),a.normalize()),e.add(s),s},f=(e,t,n)=>new U(e,t,n);for(let t of[-1,1]){let n=new K(new ja(new ca([f(t*1.05,-1.78,3.6),f(t*1.05,-1.8,0),f(t*1.05,-1.78,-2.6),f(t*1,-1.6,-3.5),f(t*.95,-1.25,-3.9)]),40,.07,12),o);e.add(n);for(let e of[-2.6,-.6,1.6])d(f(t*1.05,-1.78,e),f(t*1.15,-.6,e),.05)}d(f(-.95,-1.25,-3.9),f(.95,-1.25,-3.9),.06),d(f(-1,-1.6,-3.5),f(1,-1.6,-3.5),.05),d(f(-1.15,-.6,-2.6),f(1.15,-.6,-2.6),.05);for(let e of[-1,1])d(f(e*1,-1.6,-3.5),f(e*1.15,-.6,-2.6),.04),d(f(e*.95,-1.25,-3.9),f(e*.6,-1.25,-3.2),.04);let p=new K(new _f(3,1.6,5.2,6,.35),i);p.position.set(0,1.25,.9),e.add(p);for(let t of[-1,1]){let n=new K(new _f(.7,1.9,2.4,5,.25),i);n.position.set(t*1.55,-.1,-.2),e.add(n);let r=new K(new _f(.72,.18,2.42,3,.06),a);r.position.set(t*1.55,.55,-.2),e.add(r)}let m=new K(new ka(1.4,48,24,0,Math.PI*2,0,Math.PI*.42),i);m.scale.set(1.05,.55,1.1),m.position.set(0,.95,-2.3),e.add(m);let h=new K(new ka(1.14,64,48),s);h.position.set(0,.05,-2.3),e.add(h),this.sphereSkin=h,h.material=h.material.clone(),h.material.onBeforeCompile=(e=>(t,n)=>{e?.(t,n),t.vertexShader=t.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vSkinP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vSkinP = position;`),t.fragmentShader=t.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vSkinP;`).replace(`void main() {`,`void main() {
        vec3 ld = normalize(vSkinP);
        if (dot(ld, normalize(vec3(0.0, -0.24, -1.0))) > cos(0.47)) discard;
        if (dot(ld, normalize(vec3(-0.82, -0.28, -0.5))) > cos(0.17)) discard;
        if (dot(ld, normalize(vec3(0.82, -0.28, -0.5))) > cos(0.17)) discard;
        if (dot(ld, normalize(vec3(0.0, -0.93, -0.36))) > cos(0.14)) discard;`)})(h.material.onBeforeCompile),h.material.customProgramCacheKey=()=>`skin-vp`,h.material.side=1,h.visible=!1;let g=new W;g.position.set(0,-1.2,-3.55),e.add(g);let _=new K(new q(.16,.16,.5,24),u);_.rotation.z=Math.PI/2,g.add(_);let v=new K(new ka(.17,24,16,0,Math.PI*2,0,Math.PI/2),l);v.rotation.x=-Math.PI/2,v.position.set(0,.2,0),g.add(v),this.sonarHead=v;for(let e of[-1,1]){let t=new K(new q(.06,.06,.22,20),u);t.rotation.x=Math.PI/2,t.position.set(e*.38,.05,-.05),g.add(t);let n=new K(new Gi(.045,20),new J({color:132104,roughness:.02,metalness:1}));n.position.set(e*.38,.05,-.161),n.rotation.y=Math.PI,g.add(n)}this.lasers=[];for(let t of[-1,1]){let n=new Po(2293572,0,25,.004,0,1);n.position.set(t*.05+0,-1.05,-3.7),n.target.position.set(t*.05,-3,-25),e.add(n),e.add(n.target),this.lasers.push(n)}let y=new W;y.position.set(0,-1.45,-3.1),e.add(y);let b=new K(new Ui(1.3,.3,.6),Zf(new J({color:2764081,roughness:.6,metalness:.7,wireframe:!1})));b.geometry=new Qi(b.geometry);let x=new Ai(b.geometry,new vi({color:3356476}));y.add(x);let S=new K(new Ui(1.3,.02,.6),o);S.position.y=-.15,y.add(S);for(let e=0;e<6;e++){let t=new K(new q(.035,.035,.42,14),Zf(new Ha({color:14217471,roughness:.1,transmission:0,transparent:!0,opacity:.55})));t.position.set(-.52+e*.07,.02,.18),y.add(t);let n=new K(new q(.02,.02,.08,8),e%2?l:a);n.position.set(-.52+e*.07,.27,.18),y.add(n)}for(let e of[.2,.46]){let t=new K(new _f(.22,.2,.3,2,.02),Zf(new J({color:1723018,roughness:.5})));t.position.set(e,-.04,.05),y.add(t)}this.basket=y,this.samples=[];let C=new W;C.position.set(.7,-1.05,-3.2),e.add(C);let w=(e,t,n=s)=>{let r=new W,i=new K(new Wi(t,e,6,16),n);return i.rotation.x=Math.PI/2,i.position.z=-e/2,r.add(i),r},T=new W;C.add(T);let E=new K(new q(.1,.12,.16,20),c);T.add(E);let D=w(.7,.065);T.add(D);let O=new W;O.position.z=-.7,D.add(O);let k=new K(new q(.07,.07,.14,16),c);k.rotation.z=Math.PI/2,O.add(k);let A=w(.6,.055);O.add(A);let j=new W;j.position.z=-.6,A.add(j);let M=new K(new q(.055,.055,.1,16),u);M.rotation.x=Math.PI/2,j.add(M);let N=[];for(let e of[-1,1]){let t=new K(new Ui(.03,.03,.16),s);t.position.set(e*.04,0,-.1),j.add(t),N.push(t)}let P=new K(new ja(new ca([f(.02,.07,0),f(.04,.1,-.3),f(.03,.09,-.65)]),20,.012,6),c);D.add(P),this.arm={root:C,shoulder:T,elbow:O,wrist:j,jaws:N,upper:D,fore:A},this._armPoses={stowed:{sy:.25,sx:.55,e:1.9,w:-.3,grip:0},deployed:{sy:-.25,sx:-.35,e:.9,w:.5,grip:1}};let ee=new q(.09,.1,.18,24),F=new Gi(.085,24),te=(t,n,r,i)=>{let a=new W;a.position.copy(t),e.add(a);let o=new K(ee,c);o.rotation.x=Math.PI/2,a.add(o);let s=new Wr({color:1118481,toneMapped:!1}),l=new K(F,s);l.position.z=-.091,l.rotation.y=Math.PI,a.add(l),a.lookAt(new U().copy(n).applyMatrix4(e.matrixWorld)),a.userData.target=n;let u=r===`main`,d=new Po(u?16773860:15922943,0,u?160:90,u?.34:.72,u?.45:.75,2);d.position.copy(t),d.target.position.copy(n),u&&(d.castShadow=!0,d.shadow.mapSize.set(2048,2048),d.shadow.bias=-4e-4,d.shadow.normalBias=.05,d.shadow.camera.near=.5,d.shadow.camera.far=160,d.shadow.radius=3),e.add(d),e.add(d.target);let f={g:a,L:d,lensM:s,kind:r,idx:i,max:u?5200:2600,flicker:0,dead:!1};return this.lamps.push(f),f};for(let e of[-1,1])d(f(e*.6,-.95,-3.3),f(e*1.35,-.95,-3.1),.045);te(f(-1.35,-.85,-3.15),f(-.35,-3.5,-30),`main`,0),te(f(1.35,-.85,-3.15),f(.35,-3.5,-30),`main`,1),te(f(-1,-1.45,-3.6),f(-3.5,-6,-16),`flood`,2),te(f(1,-1.45,-3.6),f(3.5,-6,-16),`flood`,3);for(let e of this.lamps){let t=new Zt().lookAt(e.g.position,e.g.userData.target,new U(0,1,0));e.g.quaternion.setFromRotationMatrix(t)}this.spots=this.lamps.map(e=>e.L);let I=new Wr({color:1118481,toneMapped:!1}),ne=new K(new ka(.06,12,8),I);ne.position.set(0,2.15,1.8),e.add(ne),this.strobeM=I,this.strobeL=new Io(15266047,0,40,2),this.strobeL.position.copy(ne.position),e.add(this.strobeL);for(let t of[-1,1]){let n=new K(new Aa(.28,.06,12,32),c);n.position.set(t*1.35,-.2,3.3),e.add(n);let r=new K(new q(.08,.08,.35,16),s);r.rotation.x=Math.PI/2,r.position.copy(n.position),e.add(r)}this.weightMeshes=[];let re=new _f(.34,.2,.5,3,.03),ie=Zf(new J({color:4867392,roughness:.6,metalness:.8}));return[[-.45,-1.62,-2.2,`descent`],[.45,-1.62,-2.2,`descent`],[-.45,-1.62,-1.4,`ascent`],[.45,-1.62,-1.4,`ascent`]].forEach(([t,n,r,i])=>{let a=new K(re,ie);a.position.set(t,n,r),a.userData.kind=i,e.add(a),this.weightMeshes.push(a)}),this.dropping=[],e.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),this}syncWeights(e){let t=e.weights.descent,n=e.weights.ascent;for(let e of this.weightMeshes)if(e.parent&&!e.userData.gone&&!(e.userData.kind===`descent`?t-->0:n-->0)){e.userData.gone=!0;let t=new U;e.getWorldPosition(t);let n=new Dt;e.getWorldQuaternion(n),this.root.remove(e),this.scene.add(e),e.position.copy(t),e.quaternion.copy(n),this.dropping.push({m:e,v:new U(0,-.3,0),w:new U(Math.random()-.5,Math.random()-.5,Math.random()-.5),t:0})}}setArm(e){this.armTarget=+!!e}update(e,t,n){let{sub:r,sys:i}=n;this.root.position.copy(r.pos),this.root.quaternion.copy(r.quat),this.root.updateMatrixWorld(!0);let a=i.powered(`LIGHT`),o=i.lights.extFault,s=i.bat.A.online?Math.min(1,.5+i.bat.A.soc*4):.6,c=0;for(let t of this.lamps){let n=t.kind===`main`?i.lights.main:i.lights.flood;t.dead=o>=1&&t.idx===2||o>=2&&t.idx===1,t.flicker=Math.max(0,t.flicker-e),r.floodL>180&&Math.random()<e*.4&&(t.flicker=.12);let l=a&&!t.dead&&n>.01&&t.flicker<=0?t.max*n*s:0;t.L.intensity+=(l-t.L.intensity)*Math.min(1,e*25),t.L.visible=t.L.intensity>1;let u=t.L.intensity/t.max;t.lensM.color.setRGB(1,.97,.92).multiplyScalar(.05+u*60),c+=u}this.extLight=c;let l=n.lasers&&a;for(let e of this.lasers)e.intensity=l?900:0;let u=(r.depth<40||n.ap?.ascent?.on)&&t%2<.06;if(this.strobeM.color.setScalar(u?80:.1),this.strobeL.intensity=u?300:0,this.sonarHead&&i.powered(`SONAR`)&&i.sensors.sonar&&(this.sonarHead.rotation.z=Math.sin(t*1.6)*.3),this.arm){if(r.manipulatorLost&&this.arm.root.parent===this.root){let e=new U;this.arm.root.getWorldPosition(e),this.root.remove(this.arm.root),this.scene.add(this.arm.root),this.arm.root.position.copy(e),this.arm.root.quaternion.copy(r.quat),this.dropping.push({m:this.arm.root,v:new U(0,-.2,0),w:new U(.2,.1,.3),t:0})}this.armPose+=(this.armTarget-this.armPose)*Math.min(1,e*.8);let n=this._armPoses.stowed,i=this._armPoses.deployed,a=this.armPose,o=(e,t)=>e+(t-e)*a;this.arm.shoulder.rotation.set(o(n.sx,i.sx),o(n.sy,i.sy),0),this.arm.elbow.rotation.x=o(n.e,i.e)+Math.sin(t*.7)*.01*a,this.arm.wrist.rotation.set(o(n.w,i.w),0,Math.sin(t*.4)*.2*a);let s=.02+.03*Math.max(0,Math.sin(t*.8))*a;this.arm.jaws[0].position.x=-.02-s,this.arm.jaws[1].position.x=.02+s}this.syncWeights(r);for(let t=this.dropping.length-1;t>=0;t--){let n=this.dropping[t];n.t+=e,n.v.y=Math.max(-2.2,n.v.y-e*1.5),n.m.position.addScaledVector(n.v,e),n.m.rotation.x+=n.w.x*e,n.m.rotation.y+=n.w.y*e,n.m.rotation.z+=n.w.z*e,(n.t>40||!Number.isFinite(n.m.position.y))&&(this.scene.remove(n.m),this.dropping.splice(t,1))}return c}},$f=Math.random,ep=class{constructor(e,t=9e3,n=26){this.box=n;let r=new Mr,i=new Float32Array(t*3),a=new Float32Array(t);for(let e=0;e<t;e++)i[e*3]=$f()*n,i[e*3+1]=$f()*n,i[e*3+2]=$f()*n,a[e]=$f();r.setAttribute(`position`,new _r(i,3)),r.setAttribute(`seed`,new _r(a,1)),this.mat=new Ba({transparent:!0,depthWrite:!1,blending:2,uniforms:{uCam:{value:new U},uBox:{value:n},uT:{value:0},uVel:{value:new U},uSpotPos:{value:[new U,new U]},uSpotDir:{value:[new U,new U]},uSpotI:{value:[0,0]},uSpotCos:{value:.8},uAmb:{value:new U},uPR:{value:1},uDensity:{value:1},uSilt:{value:0}},vertexShader:`
        attribute float seed; uniform vec3 uCam; uniform float uBox; uniform float uT; uniform vec3 uVel; uniform float uPR; uniform float uDensity;
        uniform vec3 uSpotPos[2]; uniform vec3 uSpotDir[2]; uniform float uSpotI[2]; uniform float uSpotCos; uniform vec3 uAmb; uniform float uSilt;
        varying float vA; varying vec3 vCol;
        void main(){
          vec3 p = position;
          // slow sinking + drift + gentle turbulence
          p.y -= uT * (0.02 + seed * 0.04);
          p.x += sin(uT * 0.3 + seed * 40.0) * 0.3; p.z += cos(uT * 0.25 + seed * 31.0) * 0.3;
          vec3 wp = uCam + mod(p - uCam + uBox * 0.5, uBox) - uBox * 0.5;
          float keep = step(seed, uDensity);
          vec4 mv = viewMatrix * vec4(wp, 1.0);
          float d = -mv.z;
          // lighting from headlights (cone) and ambient
          vec3 L = vec3(0.0);
          for (int i = 0; i < 2; i++) {
            vec3 v = wp - uSpotPos[i]; float l = length(v);
            float c = dot(v / l, uSpotDir[i]);
            L += vec3(1.0, 0.96, 0.9) * uSpotI[i] * smoothstep(uSpotCos, uSpotCos + 0.12, c) / (1.0 + l * l * 0.02) * exp(-l * 0.03);
          }
          L += uAmb * 0.5;
          // forward scatter bias: particles near the view axis glint more
          vCol = L * (0.5 + seed) * vec3(0.85, 0.93, 1.0);
          vA = keep * smoothstep(uBox * 0.5, uBox * 0.3, length(wp - uCam)) * smoothstep(1.5, 3.0, length(wp - uCam)) * (1.0 + uSilt * 3.0);
          // physical flake size (0.5-5 mm) with a defocus floor; never inside the hull (r~1.1m)
          float sz = (0.35 + seed * seed * seed * 2.2 + uSilt * 1.2) * uPR * 26.0 / max(d, 0.1);
          float px = clamp(sz, 1.0, 18.0 * uPR);
          vA *= min(1.0, sz / px) * (px > 6.0 * uPR ? 6.0 * uPR / px + 0.25 : 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = px;
        }`,fragmentShader:`varying float vA; varying vec3 vCol;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = dot(c, c); if (r > 0.25) discard; float a = smoothstep(0.25, 0.02, r); gl_FragColor = vec4(vCol * a * vA * 0.6, 1.0); }`}),this.points=new Ii(r,this.mat),this.points.frustumCulled=!1,e.add(this.points)}setDensityScale(e){this.densityScale=e}update(e,t,n,r,i,a){let o=this.mat.uniforms;o.uCam.value.copy(t),o.uT.value=e;for(let e=0;e<2;e++){let t=n[e];if(!t||!t.visible){o.uSpotI.value[e]=0;continue}t.getWorldPosition(o.uSpotPos.value[e]);let r=this._tp||=new U;t.target.getWorldPosition(r),o.uSpotDir.value[e].copy(r).sub(o.uSpotPos.value[e]).normalize(),o.uSpotI.value[e]=t.intensity*.0012,o.uSpotCos.value=Math.cos(t.angle)}o.uAmb.value.set(r.r,r.g,r.b),o.uDensity.value=Et.clamp(.25+Math.min(1,i/250)*.75,0,1)*(this.densityScale??1),o.uSilt.value=a}},tp=class{constructor(e,t=1200){this.n=t,this.i=0;let n=new Mr;this.pos=new Float32Array(t*3),this.life=new Float32Array(t),this.size=new Float32Array(t),this.vel=new Float32Array(t*3),n.setAttribute(`position`,new _r(this.pos,3)),n.setAttribute(`life`,new _r(this.life,1)),n.setAttribute(`size`,new _r(this.size,1)),this.mat=new Ba({transparent:!0,depthWrite:!1,uniforms:{uPR:{value:1},uAmb:{value:new U(1,1,1)},uLit:{value:1}},vertexShader:`attribute float life; attribute float size; uniform float uPR; varying float vL;
        void main(){ vL = life; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = life > 0.0 ? size * uPR * 90.0 / -mv.z : 0.0; }`,fragmentShader:`varying float vL; uniform vec3 uAmb; uniform float uLit;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5) discard;
          float rim = smoothstep(0.32, 0.48, r) * smoothstep(0.5, 0.46, r);
          float hl = smoothstep(0.12, 0.0, length(c - vec2(-0.15, -0.15)));
          vec3 col = (uAmb * 0.6 + uLit) * (rim * 0.8 + hl * 2.0);
          gl_FragColor = vec4(col, (rim * 0.7 + hl) * min(1.0, vL)); }`}),this.points=new Ii(n,this.mat),this.points.frustumCulled=!1,e.add(this.points)}emit(e,t,n=.05,r=6){let i=this.i;this.i=(this.i+1)%this.n,this.pos[i*3]=e.x,this.pos[i*3+1]=e.y,this.pos[i*3+2]=e.z,this.vel[i*3]=t.x,this.vel[i*3+1]=t.y,this.vel[i*3+2]=t.z,this.life[i]=r,this.size[i]=n}update(e,t,n){for(let t=0;t<this.n;t++){if(this.life[t]<=0)continue;this.life[t]-=e;let n=t*3;this.vel[n+1]+=(.25+this.size[t]*3-this.vel[n+1])*e*2,this.vel[n]*=1-e*1.5,this.vel[n+2]*=1-e*1.5,this.pos[n]+=(this.vel[n]+Math.sin(this.life[t]*9+t)*.08)*e,this.pos[n+1]+=this.vel[n+1]*e,this.pos[n+2]+=(this.vel[n+2]+Math.cos(this.life[t]*8+t)*.08)*e,this.pos[n+1]>0&&(this.life[t]=0)}let r=this.points.geometry;r.attributes.position.needsUpdate=!0,r.attributes.life.needsUpdate=!0,r.attributes.size.needsUpdate=!0,this.mat.uniforms.uAmb.value.set(t.r,t.g,t.b),this.mat.uniforms.uLit.value=n}};function np(e=1,t=.25,n=.1,r=.35){let i=new ka(.5,14,8);i.scale(n*2,t*2,e);let a=i.attributes.position;for(let t=0;t<a.count;t++){let n=a.getZ(t)/e,r=n>0?1-n*1.6:1+n*.6;a.setX(t,a.getX(t)*Math.max(.08,r)),a.setY(t,a.getY(t)*Math.max(.1,r))}let o=new Mr,s=new Float32Array([0,0,.42*e,0,t*.9,.5*e+r*e*.6,0,-t*.9,.5*e+r*e*.6]);o.setAttribute(`position`,new _r(s,3)),o.setAttribute(`normal`,new _r(new Float32Array([1,0,0,1,0,0,1,0,0]),3)),o.setAttribute(`uv`,new _r(new Float32Array([0,0,1,1,1,0]),2));let c=i.toNonIndexed(),l=new Mr,u=new Float32Array(c.attributes.position.array.length+9);u.set(c.attributes.position.array),u.set(s,c.attributes.position.array.length);let d=new Float32Array(u.length);return d.set(c.attributes.normal.array),d.set([1,0,0,1,0,0,1,0,0],c.attributes.normal.array.length),l.setAttribute(`position`,new _r(u,3)),l.setAttribute(`normal`,new _r(d,3)),l.userData.len=e,l}function rp(e,{metal:t=.6,rough:n=.35,photophores:r=0,eyeGlow:i=0,lure:a=0}={}){let o=new J({color:e,metalness:t,roughness:n,side:2});return o.userData.uT={value:0},o.onBeforeCompile=e=>{e.uniforms.uT=o.userData.uT,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
      uniform float uT; varying float vZ; varying vec3 vLP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        float ph = 0.0;
        #ifdef USE_INSTANCING
          ph = instanceMatrix[3].x * 0.37 + instanceMatrix[3].z * 0.23;
        #endif
        float zz = position.z;
        float sw = sin(uT * 9.0 + ph - zz * 5.0) * 0.12 * smoothstep(-0.3, 0.6, zz);
        transformed.x += sw * (0.5 + zz);
        vZ = zz; vLP = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
      varying float vZ; varying vec3 vLP; uniform float uT;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        ${r?`float ph = step(0.85, fract(vZ * 9.0 + 0.5)) * step(vLP.y, -0.02) * smoothstep(0.02, -0.05, abs(vLP.y + 0.04));
          totalEmissiveRadiance += vec3(0.3, 0.7, 1.0) * ph * ${r.toFixed(2)};`:``}
        ${i?`totalEmissiveRadiance += vec3(0.5, 0.9, 1.0) * smoothstep(0.06, 0.0, length(vec2(abs(vLP.x) - 0.03, vLP.y - 0.02))) * step(vLP.z, -0.35) * ${i.toFixed(2)};`:``}`)},o.customProgramCacheKey=()=>`fish${r}${i}${a}`,Fu(o)}var ip=class{constructor(e,t){Object.assign(this,t),this.geo=np(t.len,t.len*t.hK,t.len*t.wK),this.mat=rp(t.color,t.mat),this.mesh=new pi(this.geo,this.mat,t.n),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,e.add(this.mesh),this.center=new U,this.vel=new U(1,0,0),this.fish=[];for(let e=0;e<t.n;e++)this.fish.push({o:new U($f()-.5,($f()-.5)*.4,$f()-.5).multiplyScalar(t.spread),p:new U,v:new U,ph:$f()*10,s:.7+$f()*.6});this.active=!1,this.flee=0,this.mesh.visible=!1,this.m4=new Zt,this.q=new Dt}spawn(e){let t=$f()*Math.PI*2,n=25+$f()*30;if(this.center.set(e.x+Math.cos(t)*n,e.y+($f()-.5)*12,e.z+Math.sin(t)*n),this.bottom){let t=pd(this.center.x,this.center.z,this.center.y+30,this.center.y-200);this.center.y=Math.max(this.center.y,t+2),this.center.y>e.y+20&&(this.center.y=e.y)}this.center.y=Math.min(this.center.y,-3),this.vel.set(Math.cos(t+1.6),0,Math.sin(t+1.6)).multiplyScalar(this.speed);for(let e of this.fish)e.p.copy(this.center).add(e.o),e.v.copy(this.vel);this.active=!0,this.mesh.visible=!0,this.age=0}update(e,t,n,r,i){if(!this.active)return;this.age+=e;let a=this.center.clone().sub(n),o=a.length(),s=new U(Math.sin(t*.13+this.seed),Math.sin(t*.07+this.seed*2)*.2,Math.cos(t*.11+this.seed));this.vel.addScaledVector(s,e*.3),o<18*(this.shy*(i?1.6:.6))?(this.vel.addScaledVector(a.normalize(),e*2.2),this.flee=1):this.flee=Math.max(0,this.flee-e),this.curious&&o>12&&o<50&&this.vel.addScaledVector(a.clone().normalize(),-e*.4),o>70&&this.vel.addScaledVector(a.normalize(),-e*.6);let c=this.speed*(1+this.flee*1.8);if(this.vel.y*=.96,this.vel.length()>c&&this.vel.setLength(c),this.center.addScaledVector(this.vel,e),this.bottom&&(t*10|0)%10==0){let t=pd(this.center.x,this.center.z,this.center.y+20,this.center.y-60);this.center.y<t+1.5&&(this.center.y=t+1.5),this.center.y>t+6&&(this.center.y-=e)}this.center.y>-2&&(this.center.y=-2);let l=new U(0,1,0);for(let n=0;n<this.fish.length;n++){let r=this.fish[n],i=this.center.clone().add(r.o).add(new U(Math.sin(t*.8+r.ph)*.4,Math.sin(t*.6+r.ph*1.3)*.2,Math.cos(t*.7+r.ph)).multiplyScalar(this.spread*.12)).sub(r.p).multiplyScalar(1.2).add(this.vel);r.v.lerp(i,Math.min(1,e*2.5)),r.p.addScaledVector(r.v,e);let a=r.v.lengthSq()>1e-4?r.v.clone().normalize():new U(0,0,-1),o=new Zt().lookAt(new U,a.clone().negate(),l);this.q.setFromRotationMatrix(o),this.m4.compose(r.p,this.q,new U(r.s,r.s,r.s)),this.mesh.setMatrixAt(n,this.m4)}this.mesh.instanceMatrix.needsUpdate=!0,this.mat.userData.uT.value=t*(1+this.flee),o>160&&(this.active=!1,this.mesh.visible=!1)}};function ap(e,t){let n=new Ha({color:e,transparent:!0,opacity:.55,roughness:.15,transmission:0,side:2,depthWrite:!1,emissive:new G(t),emissiveIntensity:0});return n.userData.uT={value:0},n.userData.uFlash={value:0},n.onBeforeCompile=e=>{e.uniforms.uT=n.userData.uT,e.uniforms.uFlash=n.userData.uFlash,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
uniform float uT; varying vec3 vLP;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
        float ph = 0.0;
        #ifdef USE_INSTANCING
          ph = instanceMatrix[3].x * 0.5 + instanceMatrix[3].z * 0.3;
        #endif
        float pulse = sin(uT * 1.7 + ph);
        float bell = smoothstep(-0.1, 0.5, position.y);
        transformed.xz *= 1.0 + pulse * 0.16 * bell - pulse * 0.08 * (1.0 - bell);
        transformed.y += pulse * 0.05 * bell;
        // tentacles sway
        float tt = smoothstep(0.0, -2.0, position.y);
        transformed.x += sin(uT * 1.1 + position.y * 2.5 + ph) * 0.18 * tt;
        transformed.z += cos(uT * 0.9 + position.y * 2.1 + ph) * 0.18 * tt;
        vLP = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
uniform float uT; uniform float uFlash; varying vec3 vLP;`).replace(`#include <emissivemap_fragment>`,`#include <emissivemap_fragment>
        float ring = smoothstep(0.08, 0.0, abs(length(vLP.xz) - 0.42)) * step(0.0, vLP.y);
        float wave = 0.5 + 0.5 * sin(atan(vLP.z, vLP.x) * 8.0 - uT * 6.0);
        totalEmissiveRadiance += emissive * (ring * (0.25 + uFlash * 6.0 * wave) + smoothstep(0.1, 0.5, vLP.y) * 0.08);`)},n.customProgramCacheKey=()=>`jelly`,Fu(n)}function op(){let e=[];for(let t=0;t<=16;t++){let n=t/16;e.push(new H(Math.sin(n*Math.PI*.55)*.5,Math.cos(n*Math.PI*.55)*.42))}let t=[new Da(e,28).toNonIndexed()];for(let e=0;e<10;e++){let n=e/10*Math.PI*2,r=new q(.008,.004,2.2,3,10,!0);r.translate(Math.cos(n)*.4,-1.05,Math.sin(n)*.4),t.push(r.toNonIndexed())}let n=new q(.06,.02,.9,6,6,!0);n.translate(0,-.4,0),t.push(n.toNonIndexed());let r=[],i=[];for(let e of t)r.push(...e.attributes.position.array),i.push(...e.attributes.normal.array);let a=new Mr;return a.setAttribute(`position`,new br(r,3)),a.setAttribute(`normal`,new br(i,3)),a}var sp=class{constructor(e){this.scene=e,this.schools=[new ip(e,{name:`sardine`,n:160,len:.22,hK:.22,wK:.1,spread:7,speed:1.4,shy:1,color:12110040,mat:{metal:.9,rough:.25},dmin:0,dmax:150,seed:1}),new ip(e,{name:`jack`,n:40,len:.6,hK:.3,wK:.12,spread:9,speed:1.8,shy:.7,color:9412776,mat:{metal:.8,rough:.3},dmin:10,dmax:250,seed:2}),new ip(e,{name:`lanternfish`,n:120,len:.1,hK:.25,wK:.1,spread:10,speed:.6,shy:1.4,color:2764854,mat:{metal:.5,rough:.4,photophores:5},dmin:250,dmax:1400,seed:3}),new ip(e,{name:`hatchetfish`,n:40,len:.08,hK:.8,wK:.08,spread:6,speed:.4,shy:1.2,color:13160664,mat:{metal:1,rough:.15,photophores:4},dmin:300,dmax:1500,seed:4}),new ip(e,{name:`grenadier`,n:6,len:.9,hK:.18,wK:.1,spread:12,speed:.35,shy:.3,bottom:!0,curious:!0,color:6974064,mat:{metal:.2,rough:.6,eyeGlow:.5},dmin:1200,dmax:6500,seed:5}),new ip(e,{name:`snailfish`,n:14,len:.25,hK:.3,wK:.16,spread:5,speed:.25,shy:.1,bottom:!0,curious:!0,color:15784152,mat:{metal:0,rough:.35},dmin:6500,dmax:8300,seed:6}),new ip(e,{name:`amphipod`,n:120,len:.04,hK:.5,wK:.3,spread:4,speed:.3,shy:.1,bottom:!0,color:15259840,mat:{metal:0,rough:.5},dmin:7e3,dmax:11e3,seed:7}),new ip(e,{name:`squid`,n:18,len:.5,hK:.18,wK:.18,spread:8,speed:1.2,shy:1.2,color:10111552,mat:{metal:.1,rough:.4,photophores:1.5},dmin:200,dmax:900,seed:8})],this.jellyGeo=op(),this.jellies=[{name:`atolla`,mat:ap(9048096,16722490),dmin:500,dmax:4e3,n:10,scale:.35},{name:`periphylla`,mat:ap(6953008,6332671),dmin:700,dmax:6e3,n:10,scale:.6},{name:`moon`,mat:ap(14215408,8965375),dmin:0,dmax:300,n:14,scale:.8}];for(let t of this.jellies)t.mesh=new pi(this.jellyGeo,t.mat,t.n),t.mesh.frustumCulled=!1,t.mesh.visible=!1,t.mesh.renderOrder=3,t.items=Array.from({length:t.n},()=>({p:new U,v:new U,rot:$f()*6,s:t.scale*(.6+$f()*.8)})),t.flash=0,e.add(t.mesh);let t=new ka(.06,8,6);this.siph=new pi(t,Fu(new J({color:16763040,transparent:!0,opacity:.6,emissive:16746564,emissiveIntensity:.5})),90),this.siph.frustumCulled=!1,this.siph.visible=!1,e.add(this.siph),this.siphState={active:!1,p:new U,dir:new U(1,0,0)},this.angler=this._makeAngler(),e.add(this.angler.g),this.giant=this._makeGiantSquid(),e.add(this.giant.g),this.timer=0,this.sightings=new Set,this.onSighting=null}_makeAngler(){let e=new W,t=new K(new ka(.35,20,14),Fu(new J({color:1380880,roughness:.6})));t.scale.set(.9,.85,1.2),e.add(t);let n=new K(new ka(.3,16,8,0,Math.PI*2,Math.PI*.5,Math.PI*.5),Fu(new J({color:854794,roughness:.5})));n.position.set(0,-.08,-.25),n.scale.set(1,.7,1),e.add(n);let r=Fu(new J({color:15261904,roughness:.3}));for(let t=0;t<14;t++){let n=new K(new Ki(.012,.09,4),r),i=-1.2+t/13*2.4;n.position.set(Math.sin(i)*.26,-.03,-.3-Math.cos(i)*.12),n.rotation.x=Math.PI,e.add(n)}let i=new K(new ja(new ca([new U(0,.28,-.1),new U(0,.6,-.35),new U(0,.55,-.7)]),12,.012,5),t.material);e.add(i);let a=new Wr({color:10479871,toneMapped:!1}),o=new K(new ka(.04,12,8),a);o.position.set(0,.52,-.72),e.add(o);let s=new Io(8380671,.6,3,2);s.position.copy(o.position),e.add(s);let c=new K(new Ki(.18,.4,4),t.material);return c.rotation.x=-Math.PI/2,c.position.z=.5,c.scale.x=.2,e.add(c),e.visible=!1,{g:e,lureM:a,light:s,active:!1,p:new U,yaw:0}}_makeGiantSquid(){let e=new W,t=Fu(new J({color:9054752,roughness:.45,metalness:.1})),n=new K(new Wi(.7,4,8,20),t);n.rotation.x=Math.PI/2,n.position.z=2.5,e.add(n);let r=new K(new Ki(1.4,1.4,4),t);r.scale.y=.08,r.position.z=4.8,r.rotation.x=Math.PI/2,e.add(r);let i=new J({color:328965,roughness:.05,metalness:.5});for(let t of[-1,1]){let n=new K(new ka(.16,16,12),i);n.position.set(t*.52,.1,.1),e.add(n)}let a=[];for(let n=0;n<10;n++){let r=n/10*Math.PI*2,i=n<2?9:4,o=[];for(let e=0;e<=8;e++)o.push(new U(Math.cos(r)*.3,Math.sin(r)*.3,-e/8*i));let s=new ca(o),c=new K(new ja(s,24,.09,6),t);c.userData={a:r,L:i,curve:s,pts:o},e.add(c),a.push(c)}return e.visible=!1,{g:e,arms:a,active:!1,p:new U,t:0}}update(e,t,n,r,i,a,o){if(this.timer-=e,this.timer<=0){this.timer=6+$f()*6;let e=this.schools.filter(e=>!e.active&&a>=e.dmin&&a<=e.dmax);if(e.length&&this.schools.filter(e=>e.active).length<4){let t=e[$f()*e.length|0];t.spawn(n),this._sight(t.name)}for(let e of this.jellies)if(!e.mesh.visible&&a>=e.dmin&&a<=e.dmax&&$f()<.4){e.mesh.visible=!0;for(let t of e.items)t.p.set(n.x+($f()-.5)*60,n.y+($f()-.5)*30,n.z+($f()-.5)*60),t.p.y=Math.min(t.p.y,-3);this._sight(e.name)}if(!this.siphState.active&&a>600&&a<3e3&&$f()<.15&&(this.siphState.active=!0,this.siphState.p.set(n.x+25*($f()-.5),n.y-5+$f()*10,n.z+25*($f()-.5)),this.siph.visible=!0,this._sight(`siphonophore`)),!this.angler.active&&a>1e3&&a<4e3&&$f()<.2){this.angler.active=!0,this.angler.g.visible=!0;let e=new U(0,0,-1).applyQuaternion(o.subQuat);this.angler.p.copy(n).addScaledVector(e,14).add(new U(($f()-.5)*6,-1.5+$f()*3,($f()-.5)*6)),this._sight(`anglerfish`)}if(!this.giant.active&&a>400&&a<1200&&$f()<.05){this.giant.active=!0,this.giant.g.visible=!0,this.giant.t=0;let e=new U(0,0,-1).applyQuaternion(o.subQuat);this.giant.p.copy(n).addScaledVector(e,30).add(new U(-20,-3,0)),this.giant.dir=new U(1,.05,.2).normalize(),this._sight(`giantsquid`)}}for(let a of this.schools)a.update(e,t,n,r,i);let s=new Zt,c=new Dt,l=new U;for(let r of this.jellies){if(!r.mesh.visible)continue;r.mat.userData.uT.value=t;let i=0;r.items.forEach((a,o)=>{let u=a.p.distanceTo(n);u<6&&r.flash<.1&&(r.flash=1),a.p.y+=Math.max(0,Math.sin(t*1.7+o))*e*.12-e*.02,a.p.x+=Math.sin(t*.1+o)*e*.05,u>90&&i++,c.setFromEuler(new cn(Math.sin(t*.2+o)*.2,a.rot,Math.cos(t*.17+o)*.2)),l.setScalar(a.s),s.compose(a.p,c,l),r.mesh.setMatrixAt(o,s)}),r.mesh.instanceMatrix.needsUpdate=!0,r.flash=Math.max(0,r.flash-e*.35),r.mat.userData.uFlash.value=r.flash*(.6+.4*Math.sin(t*20)),r.mat.emissiveIntensity=1,(i===r.items.length||a<r.dmin-50||a>r.dmax+50)&&(r.mesh.visible=!1)}if(this.siphState.active){let r=this.siphState;r.p.addScaledVector(r.dir,e*.05);for(let e=0;e<this.siph.count;e++){let n=r.p.clone().add(new U(e*.12,Math.sin(e*.15+t*.4)*.6,Math.cos(e*.1+t*.3)*.8)),i=e<5?1.8:.6+Math.sin(e*1.7)*.3;s.compose(n,c.identity(),l.setScalar(i)),this.siph.setMatrixAt(e,s)}this.siph.instanceMatrix.needsUpdate=!0,this.siph.material.emissiveIntensity=.3+(n.distanceTo(r.p)<8?2*(.5+.5*Math.sin(t*12)):0),n.distanceTo(r.p)>120&&(r.active=!1,this.siph.visible=!1)}if(this.angler.active){let r=this.angler,i=n.clone().sub(r.p);r.yaw+=(Math.atan2(-i.x,-i.z)-r.yaw)*e*.3,r.g.position.copy(r.p).add(new U(0,Math.sin(t*.8)*.1,0)),r.g.rotation.set(Math.sin(t*.5)*.05,r.yaw,0);let a=.6+.4*Math.sin(t*2.3)*Math.sin(t*5.1);r.lureM.color.setRGB(.6,.9,1).multiplyScalar(4+a*6),r.light.intensity=.4+a*.5,i.length()<4&&r.p.addScaledVector(i.normalize(),-e*2),i.length()>60&&(r.active=!1,r.g.visible=!1)}if(this.giant.active){let r=this.giant;r.t+=e,r.p.addScaledVector(r.dir,e*1.1),r.g.position.copy(r.p),r.g.lookAt(r.p.clone().sub(r.dir)),r.arms.forEach((e,n)=>{e.rotation.z=Math.sin(t*.9+n)*.08,e.rotation.x=Math.sin(t*.7+n*1.3)*.12}),(r.t>60||r.p.distanceTo(n)>150)&&(r.active=!1,r.g.visible=!1)}}_sight(e){this.sightings.has(e)||(this.sightings.add(e),this.onSighting?.(e))}},cp={sardine:[`マイワシの群れ`,`Sardinops melanostictus`],jack:[`カンパチ`,`Seriola dumerili`],lanternfish:[`ハダカイワシ`,`Myctophidae — 発光器で腹側を照らしカウンターイルミネーション`],hatchetfish:[`ムネエソ`,`Argyropelecus — 銀色の鏡のような体`],grenadier:[`ソコダラ`,`Coryphaenoides — 深海底の掃除屋`],snailfish:[`マリアナスネイルフィッシュ`,`Pseudoliparis swirei — 最深部の魚類 (8,178 m記録)`],amphipod:[`カイコウオオソコエビ`,`Hirondellea gigas — 超深海の端脚類`],squid:[`ホタルイカモドキ類`,`Enoploteuthidae`],atolla:[`ムラサキカムリクラゲ`,`Atolla wyvillei — 「警報」の発光`],periphylla:[`クロカムリクラゲ`,`Periphylla periphylla`],moon:[`ミズクラゲ`,`Aurelia aurita`],siphonophore:[`管クラゲ (群体)`,`Siphonophorae — 群体生物`],anglerfish:[`チョウチンアンコウ`,`Melanocetus johnsonii — 誘引突起の発光`],giantsquid:[`ダイオウイカ`,`Architeuthis dux — 伝説の巨大生物`]},lp=new U,up=new U,dp=class{constructor(e,t){this.center=e.clone(),this.radius=t}test(e,t){let n=e.distanceTo(this.center),r=this.radius+t-n;return r<=0?null:{depth:r,normal:e.clone().sub(this.center).divideScalar(n||1)}}},fp=class{constructor(e,t,n=new Dt){this.center=e.clone(),this.half=t.clone(),this.quat=n.clone(),this.inv=n.clone().invert(),this.radius=t.length()}test(e,t){if(lp.copy(e).sub(this.center).applyQuaternion(this.inv),up.set(Et.clamp(lp.x,-this.half.x,this.half.x),Et.clamp(lp.y,-this.half.y,this.half.y),Et.clamp(lp.z,-this.half.z,this.half.z)),up.equals(lp)){let e=this.half.x-Math.abs(lp.x),n=this.half.y-Math.abs(lp.y),r=this.half.z-Math.abs(lp.z),i=new U,a;return e<n&&e<r?(i.set(Math.sign(lp.x),0,0),a=e+t):n<r?(i.set(0,Math.sign(lp.y),0),a=n+t):(i.set(0,0,Math.sign(lp.z)),a=r+t),{depth:a,normal:i.applyQuaternion(this.quat)}}let n=lp.distanceTo(up);return n>=t?null:{depth:t-n,normal:lp.clone().sub(up).divideScalar(n||1).applyQuaternion(this.quat)}}},pp=(e,t=!1)=>Fu(e,{caustics:t});function mp(e,t,n,{bowRake:r=.25,segs:i=48,ring:a=20,sternCut:o=.1}={}){let s=[],c=[],l=[];for(let l=0;l<=i;l++){let u=l/i,d=(u-.5)*e,f=u>.7?Math.max(0,Math.cos((u-.7)/.3*Math.PI/2))**.8:u<o?.75+u/o*.25:1;f=Math.max(f,.02);let p=u>.85?(u-.85)/.15*n*r:0;for(let r=0;r<=a;r++){let i=r/a*Math.PI,o=Math.max(0,Math.sin(i)),l=-Math.cos(i)*(t/2)*f*(.35+.65*o**.15),m=-(o**1.6)*(n-p)+(u>.9?(u-.9)*n*.8:0);s.push(l,m,d),c.push(r/a*3,u*e/6)}}for(let e=0;e<i;e++)for(let t=0;t<a;t++){let n=e*(a+1)+t,r=n+a+1;l.push(n,r,n+1,r,r+1,n+1)}let u=new Mr;return u.setAttribute(`position`,new br(s,3)),u.setAttribute(`uv`,new br(c,2)),u.setIndex(l),u.computeVertexNormals(),u}function hp(e,t,n,r,i=1){let a=e.attributes.position;for(let e=0;e<a.count;e++){let o=a.getZ(e);(o-t)*i>-1.5&&(a.setZ(e,o+(r()-.5)*n),a.setY(e,a.getY(e)+(r()-.5)*n*.4))}e.computeVertexNormals()}function gp(e,t,n,r){let i=e.attributes.position,a=r()*100;for(let e=0;e<i.count;e++){let r=i.getX(e),o=i.getY(e),s=i.getZ(e),c=Math.sin(r*n+a)*Math.sin(o*n*1.3+a*.7)*Math.sin(s*n*.8+a*1.3);i.setXYZ(e,r+c*t,o+c*t*.6,s+c*t)}return e.computeVertexNormals(),e}function _p(e,t,n,r=1){let i=new Ea(e,t),a=i.attributes.position,o=n()*50;for(let t=0;t<a.count;t++){let n=new U().fromBufferAttribute(a,t),i=1+.25*Math.sin(n.x*3/e+o)*Math.sin(n.y*2.7/e+o)*Math.sin(n.z*3.3/e)+.1*Math.sin(n.x*9/e+n.z*7/e);n.multiplyScalar(i),n.y*=r,a.setXYZ(t,n.x,n.y,n.z)}return i.computeVertexNormals(),i}function vp(e,t,n){return pd(e,t,n+40,n-120)}var yp=null;async function bp(){if(yp)return yp;let[e,t,n,r]=await Promise.all([kd(`rust`,{repeat:1,metal:!0}),kd(`hull`,{repeat:1,metal:!0}),kd(`paint`,{repeat:1,metal:!0,ao:!0}),kd(`rock1`,{repeat:1,ao:!0})]),i=pp(e.clone(),!0);i.color.set(9071192),i.envMapIntensity=0,i.side=2;let a=pp(e.clone());a.color.set(6050380),a.side=2;let o=pp(t.clone());o.color.set(5858155),o.side=2;let s=pp(n.clone(),!0);s.color.set(7023136),s.side=2;let c=pp(new J({color:14208176,roughness:.85})),l=pp(new J({color:15262920,roughness:1,emissive:657926})),u=pp(r.clone());return u.color.set(4865590),yp={rustW:i,rustDeep:a,hullGrey:o,antifoul:s,bone:c,mat:l,chimney:u,sulfide:pp(new J({color:10123834,roughness:.7,metalness:.4})),nodule:pp(new J({color:2367259,roughness:.75,metalness:.2})),orange:pp(new J({color:16738832,roughness:.45})),yellow:pp(new J({color:15909376,roughness:.4})),steel:pp(new J({color:11581116,metalness:1,roughness:.35})),coralW:pp(new J({color:15920352,roughness:.7})),coralO:pp(new J({color:16747088,roughness:.7})),sponge:pp(new J({color:14472112,roughness:.9,side:2,transparent:!0,opacity:.85})),worm:pp(new J({color:16777215,roughness:.6})),plume:pp(new J({color:16718362,roughness:.5,emissive:2228224})),black:pp(new J({color:1184274,roughness:.5})),wood:pp(new J({color:3877920,roughness:.95})),glass:pp(new J({color:2239022,roughness:.1,metalness:.5}))},yp}var xp={async wreck(e,t,n,r){let i=await bp(),a=vp(e.x,e.z,e.y),o=new W,s=mp(41.76,11,7,{segs:40});hp(s,20.88,2.2,r,1);let c=new K(s,i.rustW);o.add(c);let l=new K(new Ui(11*.92,.25,36),i.rustW);l.position.set(0,-.3,-2),o.add(l);let u=new K(gp(new Ui(8,6,9,6,6,6),.25,.9,r),i.rustW);u.position.set(0,2.8,-12),o.add(u);let d=new K(gp(new Ui(9.5,2.6,5,6,3,4),.2,1.1,r),i.rustW);d.position.set(0,7,-10.5),o.add(d);for(let e=0;e<6;e++){let t=new K(new Ui(1,.9,.2),i.black);t.position.set(-3.6+e*1.45,7.2,-8),o.add(t)}let f=new K(new q(1.5,1.8,5.5,20,4,!0),i.rustW);f.position.set(0,7.5,-16),f.rotation.x=.12,o.add(f);for(let e=0;e<2;e++){let t=new K(new Ui(6,.9,7),i.rustW);t.position.set(0,.2,5+e*9),o.add(t)}let p=new K(new q(.25,.35,14,10),i.rustW);p.position.set(0,6.5,9.5),p.rotation.z=.35,o.add(p);let m=new K(new q(.15,.18,9,8),i.rustW);m.position.set(2.2,2.2,12),m.rotation.x=1.1,o.add(m);let h=new K(new Ui(.4,5,3),i.rustW);h.position.set(0,-4.6,-20.88-1.4),o.add(h);let g=new W;g.position.set(0,-4.4,-20.68);for(let e=0;e<4;e++){let t=new K(new Ui(.2,2.2,.9),i.rustW);t.position.y=1.1;let n=new W;n.rotation.z=e/4*Math.PI*2,t.rotation.y=.5,n.add(t),g.add(n)}o.add(g),o.rotation.set(.03,.4,-.22),o.position.set(e.x-14,a+4.6,e.z+10),t.add(o);let _=new W,v=mp(30.24,11,7,{segs:30});v.translate(0,0,0),hp(v,-15.12,2.2,r,-1),_.add(new K(v,i.rustW));let y=new K(gp(new Ui(11*.7,2,6,4,2,4),.2,1,r),i.rustW);y.position.set(0,.8,11.52),_.add(y);let b=new K(new Aa(.6,.14,6,12,Math.PI),i.rustW);b.position.set(11*.35,-1.5,12.24),b.rotation.y=Math.PI/2,_.add(b),_.rotation.set(-.14,.62,.3),_.position.set(e.x+22,a+3.3,e.z-26),t.add(_);for(let n=0;n<40;n++){let a=r()*Math.PI*2,o=8+r()*40,s=e.x+Math.cos(a)*o,c=e.z+Math.sin(a)*o,l=vp(s,c,e.y),u;u=n%3==0?new K(new q(.3,.3,.9,12),i.rustW):n%3==1?new K(gp(new Ui(2+r()*3,.1,1+r()*2,4,1,4),.2,1.3,r),i.rustW):new K(gp(new Ui(2.4,2.4,6,3,3,6),.12,1,r),i.rustW),u.position.set(s,l+.2,c),u.rotation.set(r()*.6,r()*6,r()*.6),t.add(u)}let x=new Dt().setFromEuler(o.rotation);n.push(new fp(new U(e.x-14,a+1.2,e.z+10),new U(11/2,4,20.88),x)),n.push(new fp(new U().copy(o.position).add(new U(0,5,-11.5).applyQuaternion(x)),new U(4.8,3.5,4.5),x));let S=new Dt().setFromEuler(_.rotation);n.push(new fp(new U(e.x+22,a+.5,e.z-26),new U(11/2,7/2,15.12),S));let C=new pi(wp(r,.6),i.coralO,120),w=new Zt;for(let e=0;e<120;e++){let t=e%2?o:_,n=new U((r()-.5)*11*.9,.2+r()*1.5,(r()-.5)*72*.35).applyQuaternion(t.quaternion).add(t.position),i=.5+r()*1.4;w.compose(n,new Dt().setFromEuler(new cn(r()*.4,r()*6,r()*.4)),new U(i,i,i)),C.setMatrixAt(e,w),C.setColorAt(e,new G().setHSL(.02+r()*.1,.6,.45+r()*.3))}t.add(C)},async coral(e,t,n,r){let i=await bp(),a=[wp(r,1),wp(r,1.3),wp(r,.8)].map((e,t)=>new pi(e,t===1?i.coralO:i.coralW,260)),o=new Zt,s=[0,0,0];for(let t=0;t<780;t++){let n=r()*Math.PI*2,i=Math.sqrt(r())*e.r*1.3,c=e.x+Math.cos(n)*i,l=e.z+Math.sin(n)*i,u=vp(c,l,e.y),d=t%3;if(s[d]>=260)continue;let f=.8+r()*2.2;o.compose(new U(c,u-.1,l),new Dt().setFromEuler(new cn((r()-.5)*.3,r()*6,(r()-.5)*.3)),new U(f,f*(.8+r()*.5),f)),a[d].setMatrixAt(s[d],o),a[d].setColorAt(s[d],new G().setHSL(d===1?.04+r()*.05:.1,d===1?.7:.15,.6+r()*.25)),s[d]++}a.forEach((e,n)=>{e.count=s[n],t.add(e)});let c=[];for(let e=0;e<=12;e++){let t=e/12;c.push(new H(.15+Math.sin(t*Math.PI*.9)*.55+t*.2,t*2.2))}let l=new pi(new Da(c,24),i.sponge,40);for(let t=0;t<40;t++){let n=r()*Math.PI*2,i=r()*e.r*1.6,a=e.x+Math.cos(n)*i,s=e.z+Math.sin(n)*i,c=vp(a,s,e.y),u=.6+r()*1.2;o.compose(new U(a,c-.1,s),new Dt,new U(u,u,u)),l.setMatrixAt(t,o)}t.add(l);let u=pp(new J({map:Tp(),alphaTest:.4,side:2,roughness:.8,color:16764040}));for(let n=0;n<28;n++){let n=r()*Math.PI*2,i=r()*e.r*1.4,a=e.x+Math.cos(n)*i,o=e.z+Math.sin(n)*i,s=vp(a,o,e.y),c=1.5+r()*2.5,l=new K(new Oa(c,c),u);l.position.set(a,s+c/2-.1,o),l.rotation.y=r()*Math.PI,t.add(l)}n.push(new dp(new U(e.x,vp(e.x,e.z,e.y)-2,e.z),3))},async whale(e,t,n,r){let i=await bp(),a=vp(e.x,e.z,e.y),o=new W,s=new q(.22,.22,.28,12),c=new ca([new U(0,.6,-15/2),new U(.6,.9,-2),new U(-.3,.7,3),new U(.4,.3,15/2)]);for(let e=0;e<44;e++){let t=e/43,n=c.getPoint(t),a=1.2-t*.8,l=new K(s,i.bone);l.position.copy(n),l.scale.set(a,a,a),l.rotation.x=Math.PI/2,o.add(l);let u=new K(new Ui(.08,.5*a,.12),i.bone);if(u.position.copy(n).add(new U(0,.35*a,0)),o.add(u),t>.18&&t<.52&&e%2==0)for(let e of[-1,1]){let t=new K(new Aa(1.4*a,.07,6,18,Math.PI*.62),i.bone);t.position.copy(n),t.rotation.set(0,Math.PI/2,e>0?-.2:Math.PI+.2),t.rotation.x=.15*e+(r()-.5)*.3,o.add(t)}}let l=new K(gp(new Ui(2.4,1.6,4.5,6,4,8),.2,1.5,r),i.bone);l.position.set(0,.8,-15/2-2.4),o.add(l);let u=new K(new Ui(.35,.3,4.6),i.bone);u.position.set(.9,.1,-15/2-3.2),u.rotation.y=.35,o.add(u),o.position.set(e.x,a,e.z),o.rotation.y=r()*Math.PI,t.add(o);let d=pp(new J({map:Ep(),transparent:!0,depthWrite:!1,roughness:1,polygonOffset:!0,polygonOffsetFactor:-2})),f=new K(new Oa(28,28,24,24),d),p=f.geometry.attributes.position;for(let t=0;t<p.count;t++){let n=p.getX(t),r=p.getY(t),i=e.x+n,o=e.z-r;p.setZ(t,vp(i,o,e.y)-a+.08)}f.rotation.x=-Math.PI/2,f.position.set(e.x,a,e.z),t.add(f),n.push(new fp(new U(e.x,a+.8,e.z),new U(1.6,1.2,10.5),new Dt().setFromEuler(o.rotation)))},async vents(e,t,n,r,i){let a=await bp(),o=[];for(let i=0;i<9;i++){let s=r()*Math.PI*2,c=i===0?0:8+r()*e.r*.8,l=e.x+Math.cos(s)*c,u=e.z+Math.sin(s)*c,d=vp(l,u,e.y),f=i===0?22:5+r()*12,p=new W,m=0,h=f*.16+1.2;for(;m<f;){let e=1+r()*2,t=new K(gp(new q(h*.8,h,e,14,3),h*.18,2.5,r),r()<.3?a.sulfide:a.chimney);if(t.position.y=m+e/2,t.position.x=(r()-.5)*.3,p.add(t),r()<.3){let t=new K(gp(new q(h*1.6,h*1.1,.35,12),.2,3,r),a.chimney);t.position.y=m+e,p.add(t)}m+=e,h*=.86}p.position.set(l,d-.5,u),t.add(p),o.push({p:new U(l,d+m-.6,u),r:Math.max(.3,h*.5),s:i===0?1.6:.6+r()*.6}),n.push(new fp(new U(l,d+m/2,u),new U(f*.16+1.2,m/2,f*.16+1.2)));let g=new q(.03,.04,1,5);g.translate(0,.5,0);let _=new ka(.07,6,4),v=new pi(g,a.worm,60),y=new pi(_,a.plume,60),b=new Zt;for(let e=0;e<60;e++){let t=r()*Math.PI*2,n=f*.18+1+r()*2.2,i=l+Math.cos(t)*n,a=u+Math.sin(t)*n,o=d-.2,s=.6+r()*1.4,c=new Dt().setFromEuler(new cn((r()-.5)*.5,0,(r()-.5)*.5));b.compose(new U(i,o,a),c,new U(1,s,1)),v.setMatrixAt(e,b);let p=new U(0,s,0).applyQuaternion(c).add(new U(i,o,a));b.compose(p,c,new U(1,1.6,1)),y.setMatrixAt(e,b)}t.add(v),t.add(y)}let s=new Mr,c=new Float32Array(3600),l=new Float32Array(3600);for(let e=0;e<900;e++){let t=o[e%o.length];l[e*4]=t.p.x,l[e*4+1]=t.p.y,l[e*4+2]=t.p.z,l[e*4+3]=t.s,c[e*4]=r(),c[e*4+1]=r(),c[e*4+2]=r(),c[e*4+3]=r()}s.setAttribute(`position`,new _r(new Float32Array(2700),3)),s.setAttribute(`src`,new _r(l,4)),s.setAttribute(`seed`,new _r(c,4));let u=new Ba({transparent:!0,depthWrite:!1,uniforms:{uT:{value:0},uLight:{value:new U},uCam:{value:new U},uSpot:{value:new U},uSpotI:{value:0}},vertexShader:`attribute vec4 src; attribute vec4 seed; uniform float uT; varying float vA; varying float vH; varying vec3 vW; uniform vec3 uCam;
        void main(){ float life = fract(seed.x + uT * (0.06 + seed.y * 0.04) * src.w);
          float h = life * 55.0 * src.w;
          vec3 p = src.xyz + vec3(0.0, h, 0.0);
          float spread = 0.4 + life * life * 14.0 * src.w;
          p.x += sin(seed.z * 6.28 + uT * 0.3 + h * 0.08) * spread; p.z += cos(seed.w * 6.28 + uT * 0.25 + h * 0.07) * spread;
          p.x += h * 0.25; // drift with current
          vW = p; vH = life;
          vA = smoothstep(0.0, 0.05, life) * (1.0 - life);
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.5 + life * 9.0 * src.w) * 260.0 / -mv.z; }`,fragmentShader:`varying float vA; varying float vH; varying vec3 vW; uniform vec3 uCam; uniform vec3 uSpot; uniform float uSpotI;
        void main(){ vec2 c = gl_PointCoord - 0.5; float r = length(c); if (r > 0.5) discard;
          float a = smoothstep(0.5, 0.0, r) * vA * 0.35;
          // lit only by sub lights: distance to spot
          float d = distance(vW, uSpot); float lit = uSpotI / (1.0 + d * d * 0.02);
          vec3 col = vec3(0.05, 0.045, 0.04) * (0.2 + lit) + vec3(1.0, 0.35, 0.05) * smoothstep(0.08, 0.0, vH) * 3.0;
          float fog = exp(-distance(vW, uCam) * 0.03);
          gl_FragColor = vec4(col * fog, a * fog); }`}),d=new Ii(s,u);d.frustumCulled=!1,t.add(d),i.tick.push((e,t)=>{u.uniforms.uT.value=e,u.uniforms.uCam.value.copy(t.camPos),u.uniforms.uSpot.value.copy(t.camPos),u.uniforms.uSpotI.value=t.extLight*.6});for(let e of o.slice(0,3)){let n=new Io(16734736,2.5*e.s,8,2);n.position.copy(e.p),t.add(n)}},async nodules(e,t,n,r){let i=await bp(),a=2400,o=[_p(.12,1,r,.7),_p(.08,1,r,.8),_p(.18,1,r,.6)].map(e=>new pi(e,i.nodule,a/3)),s=new Zt,c=[0,0,0];for(let t=0;t<a;t++){let n=r()*Math.PI*2,i=Math.sqrt(r())*e.r*1.8,a=e.x+Math.cos(n)*i,l=e.z+Math.sin(n)*i,u=t%8==0?vp(a,l,e.y):null,d=t%3,f=u??Cp(a,l,e),p=.6+r()*1.4;s.compose(new U(a,f-.02,l),new Dt().setFromEuler(new cn(r(),r()*6,r())),new U(p,p,p)),o[d].setMatrixAt(c[d]++,s)}o.forEach(e=>{e.receiveShadow=!0,t.add(e)});let l=new Wi(.12,.3,4,10);l.rotateX(Math.PI/2);let u=new pi(l,pp(new J({color:15245472,roughness:.5,transparent:!0,opacity:.9})),30);for(let t=0;t<30;t++){let n=e.x+(r()-.5)*100,i=e.z+(r()-.5)*100;s.compose(new U(n,vp(n,i,e.y)+.08,i),new Dt().setFromEuler(new cn(0,r()*6,0)),new U(1,.8,1)),u.setMatrixAt(t,s)}t.add(u);let d=new W,f=new K(new q(.08,.08,2.5,12),i.steel);f.position.y=1.2,d.add(f);let p=new K(new q(.3,.3,.6,12),i.orange);p.position.y=2.5,d.add(p);let m=e.x+12,h=e.z-8;d.position.set(m,vp(m,h,e.y)-.4,h),d.rotation.z=.3,t.add(d)},async destroyer(e,t,n,r){let i=await bp(),a=vp(e.x,e.z,e.y),o=10.5,s=6.5,c=new W,l=mp(110,o,s,{segs:70,bowRake:.4});hp(l,55,3,r,1),c.add(new K(l,i.hullGrey));let u=new K(new Ui(o*.9,.2,99),i.hullGrey);u.position.y=-.2,c.add(u);let d=new K(gp(new Ui(6,5,10,4,4,6),.2,1,r),i.hullGrey);d.position.set(0,2.5,22),c.add(d);let f=new K(new Ui(4.5,2.5,5),i.hullGrey);f.position.set(0,6,21),c.add(f);for(let e of[5,-8]){let t=new K(new q(1.4,1.7,7,16,2,!0),i.hullGrey);t.position.set(0,3.5,e),t.rotation.x=-.15,t.scale.z=1.5,c.add(t)}for(let e of[38,30,-30,-40]){let t=new W;t.position.set(0,1,e);let n=new K(new q(2.2,2.4,1.2,18),i.hullGrey);t.add(n);let a=new K(gp(new Ui(3.6,2.2,4.4,3,2,3),.1,1,r),i.hullGrey);a.position.y=1.5,t.add(a);for(let n of[-.6,.6]){let a=new K(new q(.16,.2,6,10),i.hullGrey);a.rotation.x=Math.PI/2-r()*.3,a.position.set(n,1.6,e>0?4.4:-4.4),t.add(a)}t.rotation.y=(e>0?0:Math.PI)+(r()-.5)*.8,c.add(t)}for(let e of[-2,-18]){let t=new K(new q(.5,.5,7,12),i.hullGrey);t.rotation.z=Math.PI/2,t.rotation.y=.5,t.position.set(0,1.2,e),c.add(t)}let p=new K(new q(.2,.3,12,8),i.hullGrey);p.position.set(0,10,18),p.rotation.x=.6,c.add(p),c.rotation.set(.02,r()*6,.12),c.position.set(e.x,a+3.2,e.z),t.add(c);let m=new K(mp(18,o,s,{segs:16}),i.hullGrey);m.rotation.set(Math.PI-.3,1.5,.2);let h=e.x+50,g=e.z+30;m.position.set(h,vp(h,g,e.y)+2,g),t.add(m),n.push(new fp(new U(e.x,a+.2,e.z),new U(o/2,4.25,55),new Dt().setFromEuler(c.rotation))),n.push(new fp(new U().copy(c.position).add(new U(0,5,22).applyEuler(c.rotation)),new U(3.2,4,5.5),new Dt().setFromEuler(c.rotation))),n.push(new dp(m.position,7))},async lander(e,t,n,r,i){let a=await bp(),o=vp(e.x,e.z,e.y),s=new W;for(let e=0;e<3;e++){let t=e/3*Math.PI*2,n=new K(new q(.05,.05,3.2,8),a.steel);n.position.set(Math.cos(t)*.9,1.5,Math.sin(t)*.9),n.rotation.set(Math.sin(t)*.3,0,-Math.cos(t)*.3),s.add(n);let r=new K(new q(.3,.3,.06,12),a.steel);r.position.set(Math.cos(t)*1.4,.03,Math.sin(t)*1.4),s.add(r)}for(let e=0;e<6;e++){let t=new K(new ka(.28,20,14),e%2?a.orange:a.yellow);t.position.set((e%3-1)*.6,3.3+(e>2?.55:0),0),s.add(t)}let c=new K(new Ui(.6,.6,.6,3,3,3),pp(new J({color:10066329,wireframe:!0})));c.position.set(0,.5,0),s.add(c);let l=new K(new ka(.2,8,6),pp(new J({color:9075312})));l.position.set(0,.5,0),s.add(l);let u=new K(new q(.1,.1,.5,12),a.black);u.position.set(.3,2.2,0),u.rotation.z=1,s.add(u);let d=new Wr({color:16777215,toneMapped:!1}),f=new K(new ka(.06,8,6),d);f.position.set(0,4.2,0),s.add(f);let p=new Io(14675967,0,25,1.5);p.position.copy(f.position),s.add(p),s.position.set(e.x,o,e.z),t.add(s),i.tick.push(e=>{let t=e%2.5<.08;d.color.setScalar(t?60:.2),p.intensity=t?40:0}),n.push(new fp(new U(e.x,o+1.8,e.z),new U(1.4,2,1.4)))},async deep(e,t,n,r){let i=await bp(),a=vp(e.x,e.z,e.y),o=new W,s=new K(new q(.06,.06,1.4,10),i.steel);s.position.y=.5,o.add(s);let c=new K(new Ui(.9,.55,.05),pp(new J({map:Dp(),metalness:.8,roughness:.35})));c.position.y=1.3,o.add(c),o.position.set(e.x,a-.1,e.z),o.rotation.set(.1,.7,.05),t.add(o);let l=new pi(_p(.2,2,r,.6),pp(new J({color:12563610,roughness:1})),120),u=new Zt;for(let t=0;t<120;t++){let n=e.x+(r()-.5)*120,i=e.z+(r()-.5)*120,a=.5+r()*1.5;u.compose(new U(n,Cp(n,i,e),i),new Dt().setFromEuler(new cn(0,r()*6,0)),new U(a,a,a)),l.setMatrixAt(t,u)}t.add(l)}},Sp=new Map;function Cp(e,t,n){let r=Sp.get(n.id),i=Math.ceil(n.r*2.2/4);if(!r){r=new Float32Array((2*i+1)**2);for(let e=-i;e<=i;e++)for(let t=-i;t<=i;t++)r[(e+i)*(2*i+1)+t+i]=vp(n.x+t*4,n.z+e*4,n.y);Sp.set(n.id,r)}let a=(e-n.x)/4+i,o=(t-n.z)/4+i,s=Math.max(0,Math.min(2*i-1,Math.floor(a))),c=Math.max(0,Math.min(2*i-1,Math.floor(o))),l=Et.clamp(a-s,0,1),u=Et.clamp(o-c,0,1),d=2*i+1,f=r[c*d+s],p=r[c*d+s+1],m=r[(c+1)*d+s],h=r[(c+1)*d+s+1];return(f*(1-l)+p*l)*(1-u)+(m*(1-l)+h*l)*u}function wp(e,t=1){let n=[],r=(t,i,a,o,s)=>{let c=t.clone().addScaledVector(i,a),l=new q(o*.75,o,a,6,1);if(l.translate(0,a/2,0),l.applyQuaternion(new Dt().setFromUnitVectors(new U(0,1,0),i)),l.translate(t.x,t.y,t.z),n.push(l),s<=0){let e=new ka(o*1.1,6,4);e.translate(c.x,c.y,c.z),n.push(e);return}let u=2+ +(e()<.4);for(let t=0;t<u;t++){let t=i.clone().add(new U((e()-.5)*1.3,e()*.5,(e()-.5)*1.3)).normalize();r(c,t,a*(.7+e()*.2),o*.72,s-1)}};r(new U,new U(0,1,0),.35*t,.06*t,4);let i=wf(n.map(e=>(e.deleteAttribute(`uv`),e.index?e.toNonIndexed():e)));return i.computeVertexNormals(),i}function Tp(){let e=document.createElement(`canvas`);e.width=e.height=256;let t=e.getContext(`2d`);t.strokeStyle=`#fff`,t.lineCap=`round`;let n=Xu(5),r=(e,i,a,o,s,c)=>{let l=e+Math.cos(a)*o,u=i+Math.sin(a)*o;t.lineWidth=s,t.beginPath(),t.moveTo(e,i),t.lineTo(l,u),t.stroke(),c>0&&(r(l,u,a-.3-n()*.3,o*.78,s*.7,c-1),r(l,u,a+.3+n()*.3,o*.78,s*.7,c-1))};r(128,256,-Math.PI/2,60,7,7);let i=new zi(e);return i.colorSpace=Ie,i}function Ep(){let e=document.createElement(`canvas`);e.width=e.height=512;let t=e.getContext(`2d`),n=Xu(9);for(let e=0;e<900;e++){let e=n()*Math.PI*2,r=n()**.7*240,i=256+Math.cos(e)*r,a=256+Math.sin(e)*r,o=t.createRadialGradient(i,a,0,i,a,6+n()*22),s=n()<.3?`230,200,90`:`245,245,235`;o.addColorStop(0,`rgba(${s},${.5*(1-r/260)})`),o.addColorStop(1,`rgba(${s},0)`),t.fillStyle=o,t.fillRect(i-30,a-30,60,60)}let r=new zi(e);return r.colorSpace=Ie,r}function Dp(){let e=document.createElement(`canvas`);e.width=512,e.height=320;let t=e.getContext(`2d`);t.fillStyle=`#b89a52`,t.fillRect(0,0,512,320),t.strokeStyle=`#5a4520`,t.lineWidth=8,t.strokeRect(12,12,488,296),t.fillStyle=`#3a2a10`,t.textAlign=`center`,t.font=`bold 40px "Noto Sans JP", serif`,t.fillText(`チャレンジャー海淵`,256,80),t.font=`bold 30px serif`,t.fillText(`CHALLENGER DEEP`,256,125),t.font=`26px serif`,t.fillText(`10,925 m`,256,175),t.font=`20px serif`,t.fillText(`"The deepest point of Earth's oceans"`,256,225),t.fillText(`11°22′N 142°35′E`,256,262);let n=new zi(e);return n.colorSpace=Ie,n}var Op=class{constructor(e){this.scene=e,this.built=new Map,this.loading=new Set,this.colliders=[],this.tick=[],this.buildRadius=420}update(e,t){let n=t.subPos;for(let e of ld){let t=Math.hypot(e.x-n.x,e.y-n.y,e.z-n.z);t<this.buildRadius&&!this.built.has(e.id)&&!this.loading.has(e.id)&&this._build(e);let r=this.built.get(e.id);r&&(r.visible=t<this.buildRadius*1.4)}for(let n of this.tick)n(e,t)}async _build(e){this.loading.add(e.id);let t=new W;t.name=e.id;let n=[],r=Xu(e.id.length*7919+Math.floor(e.x));try{await xp[e.id](e,t,n,r,this)}catch(t){console.error(`prop build`,e.id,t)}t.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),this.scene.add(t),this.built.set(e.id,t),this.colliders.push(...n),this.loading.delete(e.id)}async preload(e){let t=ld.find(t=>t.id===e);t&&!this.built.has(e)&&await this._build(t)}};async function kp(e){let t=await bp(),n=new W,r=new K(mp(92,16,7,{segs:50}),t.antifoul);r.material=t.antifoul,r.rotation.x=Math.PI,r.rotation.x=0,n.add(r);let i=new K(mp(92,16.2,2.2,{segs:50}),t.hullGrey);i.position.y=.6,i.scale.y=-1,n.add(i);let a=new K(new q(.03,.03,30,6),t.black);a.position.set(0,-15,-40),n.add(a);let o=new K(new Ui(.5,3,8),t.antifoul);return o.position.set(0,-7.5,-40),n.add(o),n.position.set(-10,.6,150),n.rotation.y=.5,e.add(n),n}var Ap=Math.random,jp=class{constructor(){this.ctx=null,this.enabled=!0,this.voice=!0,this.klaxonMuted=!1,this._klaxonT=0,this._pingT=2,this._crackleT=0,this._heartT=0,this._breathT=0,this._lastCreak=0}async start(){if(this.ctx){if(this.ctx.state!==`running`)try{await this.ctx.resume()}catch{}return}let e=window.AudioContext||window.webkitAudioContext;if(!e)return;let t;try{t=this.ctx=new e({latencyHint:`interactive`})}catch{return}t.state!==`running`&&t.resume().catch(()=>{}),this.master=t.createGain(),this.master.gain.value=.9;let n=t.createDynamicsCompressor();n.threshold.value=-16,n.knee.value=12,n.ratio.value=4,n.attack.value=.004,n.release.value=.25,n.connect(this.master),this.master.connect(t.destination),this.dry=t.createGain(),this.dry.connect(n),this.verb=t.createConvolver(),this.verb.buffer=this._sphereIR(),this.verbIn=t.createGain(),this.verbIn.gain.value=.35,this.verbIn.connect(this.verb),this.verb.connect(n),this.hull=t.createBiquadFilter(),this.hull.type=`lowpass`,this.hull.frequency.value=900,this.hull.Q.value=.9;let r=t.createBiquadFilter();r.type=`peaking`,r.frequency.value=180,r.Q.value=3,r.gain.value=6,this.hull.connect(r),r.connect(this.dry),r.connect(this.verbIn),this.cabin=t.createGain(),this.cabin.connect(this.dry),this.cabin.connect(this.verbIn),this.white=this._noise(`white`,3),this.pink=this._noise(`pink`,4),this.brown=this._noise(`brown`,5);let i=this.v={};i.hum=this._osc(`sawtooth`,400,0,this.cabin,{lp:1400}),i.hum2=this._osc(`sine`,120,0,this.cabin),i.fan=this._noiseVoice(this.pink,0,this.cabin,{bp:1100,q:.6}),i.fanTone=this._osc(`triangle`,145,0,this.cabin),i.thr=[`main`,`vert`,`lat`].map((e,t)=>({whine:this._osc(`sawtooth`,100,0,this.hull,{lp:2400}),gear:this._osc(`square`,60,0,this.hull,{lp:700}),wash:this._noiseVoice(this.brown,0,this.hull,{lp:500+t*120})})),i.flow=this._noiseVoice(this.brown,0,this.hull,{lp:300}),i.ocean=this._noiseVoice(this.brown,0,this.hull,{lp:180}),i.slosh=this._noiseVoice(this.pink,0,this.hull,{bp:420,q:.5}),i.leak=this._noiseVoice(this.white,0,this.cabin,{hp:2600}),i.spray=this._noiseVoice(this.pink,0,this.cabin,{bp:1800,q:.8}),i.pump=this._osc(`square`,48,0,this.cabin,{lp:420}),i.pumpN=this._noiseVoice(this.brown,0,this.cabin,{bp:260,q:1.4}),i.valve=this._noiseVoice(this.pink,0,this.hull,{bp:700,q:2.5}),i.water=this._noiseVoice(this.brown,0,this.cabin,{bp:380,q:.9}),i.fire=this._noiseVoice(this.brown,0,this.cabin,{lp:900}),i.ring=this._osc(`sine`,6200,0,this.dry),this._ringLvl=0}_noise(e,t){let n=this.ctx,r=Math.floor(n.sampleRate*t),i=n.createBuffer(1,r,n.sampleRate),a=i.getChannelData(0),o=0,s=0,c=0,l=0,u=0,d=0,f=0,p=0;for(let t=0;t<r;t++){let n=Ap()*2-1;e===`white`?a[t]=n:e===`pink`?(o=.99886*o+n*.0555179,s=.99332*s+n*.0750759,c=.969*c+n*.153852,l=.8665*l+n*.3104856,u=.55*u+n*.5329522,d=-.7616*d-n*.016898,a[t]=(o+s+c+l+u+d+f+n*.5362)*.11,f=n*.115926):(p=(p+.02*n)/1.02,a[t]=p*3.5)}return i}_sphereIR(){let e=this.ctx,t=e.sampleRate,n=Math.floor(t*1.4),r=e.createBuffer(2,n,t),i=[311,523,787,1130,1660,2340];for(let e=0;e<2;e++){let a=r.getChannelData(e);for(let r=0;r<n;r++){let n=r/t,o=(Ap()*2-1)*Math.exp(-n*9)*.6;for(let t=0;t<i.length;t++)o+=Math.sin(2*Math.PI*i[t]*(1+e*.003)*n+t)*Math.exp(-n*(3.5+t*1.6))*.05;r%Math.floor(t*.0061)<3&&(o+=Math.exp(-n*7)*.5*(Ap()-.5)),a[r]=o}}return r}_filterChain(e,t,n={}){let r=e,i=this.ctx,a=(e,t,n)=>{let a=i.createBiquadFilter();return a.type=e,a.frequency.value=t,n&&(a.Q.value=n),r.connect(a),r=a,a},o={};n.hp&&(o.hp=a(`highpass`,n.hp,n.q)),n.lp&&(o.lp=a(`lowpass`,n.lp,n.q)),n.bp&&(o.bp=a(`bandpass`,n.bp,n.q));let s=i.createGain();return s.gain.value=0,r.connect(s),s.connect(t),{g:s,filt:o}}_osc(e,t,n,r,i={}){let a=this.ctx.createOscillator();a.type=e,a.frequency.value=t;let{g:o,filt:s}=this._filterChain(a,r,i);return o.gain.value=n,a.start(),{osc:a,g:o,filt:s}}_noiseVoice(e,t,n,r={}){let i=this.ctx.createBufferSource();i.buffer=e,i.loop=!0,i.loopStart=Ap()*.5;let{g:a,filt:o}=this._filterChain(i,n,r);return a.gain.value=t,i.start(0,Ap()*e.duration),{src:i,g:a,filt:o}}_set(e,t,n=.08){e&&Number.isFinite(t)&&e.setTargetAtTime(t,this.ctx.currentTime,n)}_env(e,t,n,r,i=this.ctx.currentTime){n=Math.max(2e-4,n||0),e.gain.cancelScheduledValues(i),e.gain.setValueAtTime(1e-4,i),e.gain.exponentialRampToValueAtTime(n,i+t),e.gain.exponentialRampToValueAtTime(1e-4,i+t+r)}_shot(e,t,{gain:n=1,a:r=.005,d:i=.3,rate:a=1,hp:o,lp:s,bp:c,q:l,delay:u=0}={}){let d=this.ctx,f=d.createBufferSource();f.buffer=e,f.playbackRate.value=a;let{g:p,filt:m}=this._filterChain(f,t,{hp:o,lp:s,bp:c,q:l}),h=d.currentTime+u;return this._env(p,r,n,i,h),f.start(h,Math.max(0,Ap()*Math.max(0,e.duration-r-i-.1))),f.stop(h+r+i+.05),{s:f,g:p,filt:m,t0:h}}_tone(e,t,{type:n=`sine`,gain:r=.3,a:i=.005,d:a=.4,delay:o=0,slide:s=0}={}){let c=this.ctx,l=c.createOscillator();l.type=n,l.frequency.value=e;let u=c.createGain();l.connect(u),u.connect(t);let d=c.currentTime+o;return s&&l.frequency.exponentialRampToValueAtTime(Math.max(20,e*s),d+i+a),this._env(u,i,r,a,d),l.start(d),l.stop(d+i+a+.05),l}play(e,t=1){if(this.ctx&&this.enabled)switch(e){case`creak`:return this.creak(t);case`ping`:return this.ping(t);case`chime`:this._tone(988,this.cabin,{type:`triangle`,gain:.18,d:.35}),this._tone(740,this.cabin,{type:`triangle`,gain:.18,d:.6,delay:.22});return;case`warn`:for(let e=0;e<3;e++)this._tone(1320,this.cabin,{type:`square`,gain:.07,d:.09,delay:e*.16});return;case`good`:this._tone(660,this.cabin,{type:`sine`,gain:.12,d:.2}),this._tone(990,this.cabin,{type:`sine`,gain:.12,d:.35,delay:.12});return;case`button`:this._tone(2400,this.cabin,{type:`square`,gain:.03,a:.001,d:.025}),this._shot(this.white,this.cabin,{gain:.08,a:.001,d:.02,hp:3e3});return;case`breaker`:this._shot(this.white,this.cabin,{gain:.6,a:.001,d:.04,hp:1800}),this._tone(210,this.cabin,{type:`triangle`,gain:.2,d:.08});return;case`clunk`:this._shot(this.brown,this.hull,{gain:1.2,a:.003,d:.5,lp:260}),this._tone(72,this.hull,{gain:.5,d:.5,slide:.7}),this._metal(.35,.8);return;case`drop`:this.play(`clunk`),this._shot(this.brown,this.hull,{gain:.6,a:.05,d:2.5,lp:160,delay:.1});return;case`bang`:this.bang(t);return;case`thud`:this.thud(t);return;case`rumble`:this._shot(this.brown,this.hull,{gain:1.4,a:1.2,d:7,lp:90}),this._tone(34,this.hull,{gain:.5,a:1,d:6});return;case`grind`:for(let e=0;e<6;e++)this._tone(90+Ap()*40,this.hull,{type:`sawtooth`,gain:.12,a:.02,d:.25,delay:e*.2,slide:.6});return;case`crack`:this._shot(this.white,this.hull,{gain:1.3,a:.001,d:.12,hp:600}),this._metal(1,2.5),this.creak(1),this._ringLvl=Math.max(this._ringLvl,.4);return;case`leak`:this._shot(this.white,this.cabin,{gain:.5,a:.01,d:.4,hp:2e3});return;case`fire`:this._shot(this.white,this.cabin,{gain:.5,a:.001,d:.06,hp:1500}),this._shot(this.brown,this.cabin,{gain:.5,a:.3,d:1.2,lp:700});return;case`alarm`:this.play(`warn`);return;case`vent`:this._shot(this.pink,this.hull,{gain:.8,a:.2,d:3.5,bp:500,q:.6});for(let e=0;e<20;e++)this._bubble(e*.12+Ap()*.1);return;case`extinguish`:this._shot(this.white,this.cabin,{gain:1.1,a:.02,d:2.2,hp:900});return;case`tool`:for(let e=0;e<4;e++)this._tone(1800+Ap()*900,this.cabin,{type:`triangle`,gain:.05,a:.001,d:.06,delay:e*.18}),this._shot(this.white,this.cabin,{gain:.15,a:.001,d:.03,hp:4e3,delay:e*.18});return;case`radio`:this._shot(this.white,this.cabin,{gain:.25,a:.005,d:.18,bp:2200,q:.7});return;case`surface`:this._shot(this.pink,this.hull,{gain:1,a:.4,d:3,bp:350,q:.5});return;case`implode`:this.bang(3);return}}_bubble(e=0){let t=500+Ap()*1400;this._tone(t,this.hull,{gain:.06,a:.002,d:.05+Ap()*.05,delay:e,slide:1.6})}_metal(e=.4,t=1.5){let n=180+Ap()*60;[1,1.593,2.136,2.296,2.653,3.43].forEach((r,i)=>this._tone(n*r,this.hull,{gain:e*.12/(1+i*.4),a:.002,d:t*(1-i*.12)}))}creak(e=1){let t=this.ctx.currentTime;if(t-this._lastCreak<.35)return;this._lastCreak=t;let n=2+(Ap()*3|0);for(let r=0;r<n;r++){let n=70+Ap()*160,i=.8+Ap()*2.2*e,{filt:a}=this._shot(this.pink,this.hull,{gain:.9*e,a:.15+Ap()*.3,d:i,bp:n,q:18+Ap()*20,delay:r*.15*Ap()});a.bp.frequency.setValueAtTime(n,t),a.bp.frequency.linearRampToValueAtTime(n*(.6+Ap()*.6),t+i)}let r=Ap()*4*e|0;for(let t=0;t<r;t++)this._shot(this.white,this.hull,{gain:.5*e,a:.001,d:.03,hp:900,delay:.3+Ap()*1.5})}ping(e=1){this._tone(1450,this.hull,{gain:.05,a:.003,d:.25}),this._tone(1450,this.verbIn,{gain:.02,a:.003,d:.5,delay:.05}),e<1&&this._tone(1450,this.hull,{gain:.02*(1-e),a:.01,d:.3,delay:.2+e*.8})}thud(e=1){let t=Math.min(2,.4+e);this._shot(this.brown,this.hull,{gain:t,a:.002,d:.8+e*.5,lp:220}),this._tone(55,this.hull,{gain:.6*Math.min(1,e),d:.9,slide:.6}),this._metal(Math.min(1,.3+e*.4),1+e),e>1&&this._shot(this.white,this.cabin,{gain:.3,a:.001,d:.3,hp:2500,delay:.05})}bang(e=1){this._shot(this.white,this.hull,{gain:1.6,a:.001,d:.25,lp:3e3}),this._shot(this.brown,this.hull,{gain:2,a:.002,d:2.5*e,lp:150}),this._tone(40,this.hull,{gain:.9,d:2*e,slide:.5}),this._metal(1.2,3),this._ringLvl=Math.max(this._ringLvl,.6*Math.min(1,e))}speak(e){if(this.voice&&`speechSynthesis`in window)try{(speechSynthesis.speaking||speechSynthesis.pending)&&speechSynthesis.cancel();let t=new SpeechSynthesisUtterance(e);t.lang=`ja-JP`,t.rate=1.05,t.pitch=.9,t.volume=.8;let n=speechSynthesis.getVoices().filter(e=>e.lang?.startsWith(`ja`));n.length&&(t.voice=n[0]),this.play(`radio`),t.onend=()=>this.play(`radio`),speechSynthesis.speak(t)}catch{}}update(e,t){if(!this.ctx||this.ctx.state!==`running`)return;let{sub:n,sys:r,inc:i,ap:a}=t,o=this.v,s=(e,t,n)=>this._set(e,t,n),c=this.enabled&&!t.dead?1:0;!this.enabled&&this.master.gain.value>.001&&(this.master.gain.value=0),s(this.master.gain,(t.masterGain??.9)*c,.3);let l=Math.min(1,r.totalPower/4e4),u=r.powered(`CABIN`);s(o.hum.g.gain,u?.006+l*.01:.002),s(o.hum.osc.frequency,400+l*6),s(o.hum2.g.gain,u?.012:.003);let d=r.scrubber.fan&&r.scrubber.fanOK&&r.powered(`LSS`);s(o.fan.g.gain,d?.05:0,.4),s(o.fanTone.g.gain,d?.008:0,.4),[[n.thr[0],n.thr[1]],[n.thr[2],n.thr[3]],[n.thr[4],n.thr[5]]].forEach((e,t)=>{let r=Math.max(Math.abs(e[0].rpm),Math.abs(e[1].rpm)),i=Math.max(e[0].jam,e[1].jam),a=+!!e.some(e=>e.fault===`degraded`),c=o.thr[t];s(c.whine.osc.frequency,70+r*(t===0?520:430)+i*30*Math.sin(n.time*30)),s(c.whine.g.gain,r**1.5*(t===0?.05:.035)*(1-i*.5)),s(c.gear.osc.frequency,30+r*140),s(c.gear.g.gain,r*.02+a*r*.06+i*.05),s(c.wash.g.gain,r**2*.25)});let f=Math.abs(n.speed||0)+Math.abs(n.vel.y)*.8;s(o.flow.g.gain,Math.min(.6,f*f*.25)),s(o.flow.filt.lp.frequency,180+f*380);let p=Math.exp(-n.depth/60);s(o.ocean.g.gain,.08+p*.35+(t.env?.turbidity?.3:0),.5),s(o.slosh.g.gain,n.depth<8?.1*(.6+.4*Math.sin(n.time*.9)):0,.3);let m=0;for(let e in r.pen)m+=r.pen[e].leakRate;s(o.leak.g.gain,Math.min(.5,m*6)),s(o.spray.g.gain,Math.min(.35,m*3));let h=n.vbtFlow<0,g=n.vbtFlow>0;s(o.pump.g.gain,h?.03:0,.15),s(o.pumpN.g.gain,h?.08:0,.15),s(o.valve.g.gain,g?.12:0,.2),s(o.water.g.gain,n.floodL>20?Math.min(.4,n.floodL/1500)*(.6+.4*Math.sin(n.time*1.3)):0,.3),s(o.fire.g.gain,r.fire.active?.1+r.fire.intensity*.4:0,.5),this._ringLvl=Math.max(this._ringLvl-e*.08,r.hypoxia*.3),s(o.ring.g.gain,this._ringLvl*.012,.3),r.hull.creak>.3&&r.hull.creak>(this._prevCreak||0)+.2&&this.creak(Math.min(1.4,r.hull.creak)),this._prevCreak=r.hull.creak,this._pingT-=e,this._pingT<=0&&a.oas.on&&r.powered(`SONAR`)&&r.sensors.sonar&&(this._pingT=a.oas.threat>.3?.9:3.2,this.ping(Math.min(1,a.oas.dist/a.oas.range))),r.fire.active&&(this._crackleT-=e,this._crackleT<=0&&(this._crackleT=.05+Ap()*.25,this._shot(this.white,this.cabin,{gain:.2+r.fire.intensity*.6,a:.001,d:.02+Ap()*.03,hp:1200+Ap()*2e3})));let _=t.alarmLevel||0;_>=2&&!this.klaxonMuted&&(this._klaxonT-=e,this._klaxonT<=0&&(this._klaxonT=1.1,this._tone(620,this.cabin,{type:`sawtooth`,gain:.06,a:.02,d:.42}),this._tone(470,this.cabin,{type:`sawtooth`,gain:.06,a:.02,d:.42,delay:.5}))),_<2&&(this.klaxonMuted=!1);let v=Math.max(r.pilotStress*.6,1-r.pilotHealth,r.hypercapnia,r.hypoxia);v>.35&&(this._heartT-=e,this._heartT<=0&&(this._heartT=60/(70+v*70),this._tone(52,this.dry,{gain:.25*v,a:.01,d:.12}),this._tone(48,this.dry,{gain:.18*v,a:.01,d:.12,delay:.16}))),(r.emergencyMask||r.hypercapnia>.3)&&(this._breathT-=e,this._breathT<=0&&(this._breathT=3.2-r.hypercapnia*1.5,this._shot(this.pink,this.dry,{gain:.12,a:.6,d:.9,bp:900,q:.5}),this._shot(this.pink,this.dry,{gain:.08,a:.4,d:1.1,bp:600,q:.5,delay:1.5})))}suspend(){this.ctx?.suspend().catch(()=>{});try{speechSynthesis.cancel()}catch{}}resume(){this.ctx?.resume().catch(()=>{})}},Mp=(e,t,n)=>e<t?t:e>n?n:e,Np=class{constructor(e,t){this.side=t,this.el=document.createElement(`div`),this.el.className=`stick stick-${t}`,this.el.innerHTML=`<div class="stick-ring"></div><div class="stick-knob"></div><div class="stick-lbl"></div>`,e.appendChild(this.el),this.knob=this.el.querySelector(`.stick-knob`),this.lbl=this.el.querySelector(`.stick-lbl`),this.id=null,this.x=0,this.y=0,this.ox=0,this.oy=0,this.R=64,this.home()}home(){let e=innerHeight,t=innerWidth;this.R=Math.round(Math.max(44,Math.min(70,e*.15)));let n=62+this.R+14;this.hx=this.side===`l`?n:t-n,this.hy=e-this.R-26,this.id===null&&this._place(this.hx,this.hy),this.el.style.setProperty(`--R`,this.R+`px`)}_place(e,t){this.ox=e,this.oy=t,this.el.style.transform=`translate(${e}px, ${t}px)`}down(e){this.id=e.pointerId,this.moved=!1,this._place(e.clientX,e.clientY),this.x=this.y=0,this._knob(),this.el.classList.add(`active`)}move(e){let t=e.clientX-this.ox,n=e.clientY-this.oy,r=Math.hypot(t,n);if(r>this.R*1.35){let e=(r-this.R*1.35)/r;this._place(this.ox+t*e,this.oy+n*e),t*=1-e,n*=1-e}let i=Math.min(1,Math.hypot(t,n)/this.R),a=Math.atan2(n,t),o=i<.08?0:((i-.08)/.92)**1.6;this.x=Math.cos(a)*o,this.y=-Math.sin(a)*o,this._knob(t,n)}up(){this.id=null,this.x=this.y=0,this._knob(),this.el.classList.remove(`active`),this._place(this.hx,this.hy)}_knob(e=0,t=0){let n=Math.hypot(e,t),r=n>this.R?this.R/n:1;this.knob.style.transform=`translate(${e*r}px, ${t*r}px)`}},Pp=class{constructor(e,{onTap:t,onLook:n}={}){this.root=e,this.layer=document.createElement(`div`),this.layer.id=`touch`,e.appendChild(this.layer),this.left=new Np(this.layer,`l`),this.right=new Np(this.layer,`r`),this.left.lbl.textContent=`前後 / 旋回`,this.right.lbl.textContent=`横移動 / 上下`,this.rocker=document.createElement(`div`),this.rocker.className=`rocker`,this.rocker.innerHTML=`<button data-h="1" aria-label="上昇">▲<small>UP</small></button><button data-h="-1" aria-label="下降">▼<small>DN</small></button>`,this.layer.appendChild(this.rocker),this._placeRocker(),this.heaveBtn=0;for(let e of this.rocker.querySelectorAll(`button`)){let t=+e.dataset.h;e.addEventListener(`pointerdown`,n=>{n.stopPropagation(),n.preventDefault();try{e.setPointerCapture(n.pointerId)}catch{}this.heaveBtn=t,e.classList.add(`on`),navigator.vibrate?.(8)}),e.addEventListener(`contextmenu`,e=>e.preventDefault());let n=()=>{this.heaveBtn===t&&(this.heaveBtn=0),e.classList.remove(`on`)};e.addEventListener(`pointerup`,n),e.addEventListener(`pointercancel`,n),e.addEventListener(`lostpointercapture`,n)}this.look={yaw:0,pitch:0,vy:0,vp:0,id:null,lx:0,ly:0,t0:0,moved:0,sx:0,sy:0},this.onTap=t,this.onLook=n,this.precision=!1,this.lookSens=(()=>{try{let e=+localStorage.getItem(`ad-look`);return e>0?e:.0042}catch{return .0042}})(),this.enabled=!0;let r=this.layer;r.addEventListener(`pointerdown`,e=>this._down(e),{passive:!1}),r.addEventListener(`pointermove`,e=>this._move(e),{passive:!1}),r.addEventListener(`pointerup`,e=>this._up(e)),r.addEventListener(`pointercancel`,e=>this._up(e,!0)),r.addEventListener(`lostpointercapture`,e=>this._up(e,!0)),r.addEventListener(`contextmenu`,e=>e.preventDefault());let i=()=>{this.left.home(),this.right.home(),this._placeRocker()};addEventListener(`resize`,i),addEventListener(`orientationchange`,()=>setTimeout(i,250)),document.addEventListener(`fullscreenchange`,()=>setTimeout(i,100)),this.keys=new Set,addEventListener(`keydown`,e=>this.keys.add(e.code)),addEventListener(`keyup`,e=>this.keys.delete(e.code)),addEventListener(`blur`,()=>this.reset()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.reset()})}reset(){this.keys.clear(),this.left.up(),this.right.up(),this.look.id=null,this.heaveBtn=0;for(let e of this.rocker.querySelectorAll(`button`))e.classList.remove(`on`)}_placeRocker(){let e=this.right,t=Math.max(innerWidth*.55,e.hx-e.R-50-18),n=Math.max(innerHeight*.36,e.hy-50-3);this.rocker.style.transform=`translate(${Math.round(t)}px, ${Math.round(n-50)}px)`}_zone(e){let t=innerWidth;return e<t*.32?`l`:e>t*.68?`r`:`c`}_cap(e){try{this.layer.setPointerCapture(e.pointerId)}catch{}}_down(e){if(!this.enabled)return;e.preventDefault();let t=this._zone(e.clientX),n=e.clientY>innerHeight*.4;if(t===`l`&&n&&this.left.id===null){this.left.down(e),this._cap(e);return}if(t===`r`&&n&&this.right.id===null){this.right.down(e),this._cap(e);return}if(this.look.id===null){let t=this.look;t.id=e.pointerId,t.lx=t.sx=e.clientX,t.ly=t.sy=e.clientY,t.t0=performance.now(),t.moved=0,this._cap(e)}}_move(e){if(e.pointerId===this.left.id)return this.left.move(e);if(e.pointerId===this.right.id)return this.right.move(e);let t=this.look;if(e.pointerId===t.id){let n=e.clientX-t.lx,r=e.clientY-t.ly;t.lx=e.clientX,t.ly=e.clientY,t.moved+=Math.abs(n)+Math.abs(r),t.yaw=Mp(t.yaw-n*this.lookSens,-2,2),t.pitch=Mp(t.pitch-r*this.lookSens,-1.1,1.2),this.onLook?.()}}_up(e,t=!1){if(e.pointerId===this.left.id)return this.left.up();if(e.pointerId===this.right.id)return this.right.up();let n=this.look;e.pointerId===n.id&&(n.id=null,!t&&n.moved<14&&performance.now()-n.t0<400&&this.onTap?.(e.clientX,e.clientY))}recenter(){this.look.yaw=0,this.look.pitch=0}read(){let e=this.keys,t=(t,n)=>+!!e.has(t)-!!e.has(n),n=this.precision?.4:1;return{surge:Mp(this.left.y+t(`KeyW`,`KeyS`),-1,1)*n,yaw:Mp(this.left.x+t(`KeyD`,`KeyA`),-1,1)*n,sway:Mp(this.right.x+t(`KeyE`,`KeyQ`),-1,1)*n,heave:Mp(this.right.y+this.heaveBtn+t(`KeyR`,`KeyF`),-1,1)*(this.heaveBtn&&!this.right.y?1:n)}}get active(){return this.left.id!==null||this.right.id!==null||this.heaveBtn!==0||this.keys.size>0}},Fp=[{name:`LOW`,ja:`低`,pr:1,shadow:0,shadowMap:512,bloom:3,volSteps:16,shafts:8,msaa:0,snow:.35,cockpitShadow:!1,aniso:2},{name:`HIGH`,ja:`高`,pr:1.5,shadow:1,shadowMap:1024,bloom:5,volSteps:32,shafts:12,msaa:4,snow:.7,cockpitShadow:!0,aniso:8},{name:`VERY HIGH`,ja:`超高`,pr:2,shadow:1,shadowMap:2048,bloom:6,volSteps:48,shafts:16,msaa:4,snow:1,cockpitShadow:!0,aniso:16},{name:`ULTRA`,ja:`最高`,pr:3,shadow:1,shadowMap:4096,bloom:6,volSteps:64,shafts:16,msaa:4,snow:1,cockpitShadow:!0,aniso:16}],Q=(e,t=0)=>Number.isFinite(e)?e.toFixed(t):`---`,$=(e,t,n)=>{let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.innerHTML=n),r},Ip=[`info`,`caut`,`warn`,`alarm`],Lp=class{constructor(e,t){this.g=t,this.root=e,this.panel=null,this._t=0,this._holds=new Set,this._build()}_btn(e,t,n,r=``){let i=$(`button`,`hb `+r,t);return i.addEventListener(`pointerdown`,e=>{e.stopPropagation()}),i.addEventListener(`click`,e=>{e.stopPropagation(),this.g.audio.play(`button`),navigator.vibrate?.(6),n(e,i)}),e.appendChild(i),i}_build(){let e=this.root,t=this.layer=$(`div`,`hud-layer`);e.appendChild(t);let n=this.top=$(`div`,`hud-top`);n.innerHTML=`
      <div class="ht-block ht-depth"><div class="dcol"><span class="k">深度 DEPTH</span><span class="v" id="hDepth">0</span></div><span class="sub" id="hVz"></span><span class="u">m</span></div>
      <div class="ht-block ht-small"><span class="k">方位 HDG</span><span class="v s" id="hHdg">000</span><span class="u">°</span></div>
      <div class="ht-block ht-small"><span class="k">速力 SPD</span><span class="v s" id="hSpd">0.0</span><span class="u">kt</span></div>
      <div class="ht-block ht-small"><span class="k">高度 ALT</span><span class="v s" id="hAlt">---</span><span class="u">m</span></div>
      <div class="ht-block ht-small ht-hide-s"><span class="k">浮力 BUOY</span><span class="v s" id="hBuoy">0</span><span class="u">kg</span></div>
      <div class="ht-block ht-ap" id="hAp"><span class="k">AUTOPILOT</span><span class="v s" id="hApS">MANUAL</span></div>
      <div class="ht-block ht-zone"><span class="k" id="hZone"></span><span class="sub" id="hEnv"></span></div>`,t.appendChild(n),this.el={};for(let e of[`hDepth`,`hVz`,`hHdg`,`hSpd`,`hAlt`,`hBuoy`,`hAp`,`hApS`,`hZone`,`hEnv`])this.el[e]=n.querySelector(`#`+e);let r=this.tabs=$(`div`,`hud-tabs`);this.tabBtns={};for(let[e,t]of[[`ap`,`AP<small>自動操縦</small>`],[`dc`,`DC<small>ダメコン</small>`],[`sys`,`SYS<small>システム</small>`],[`nav`,`NAV<small>航法</small>`],[`log`,`LOG<small>記録</small>`]])this.tabBtns[e]=this._btn(r,t,()=>this.toggle(e),`tab`);t.appendChild(r);let i=this.quick=$(`div`,`hud-quick`);this.qLight=this._btn(i,`💡<small>照明</small>`,()=>this.g.toggleLights()),this.qFlood=this._hold(i,`注水<small>VBT+</small>`,e=>this.g.vbtManual(+!!e),`blue`),this.qPump=this._hold(i,`排水<small>VBT−</small>`,e=>this.g.vbtManual(e?-1:0),`amber`),this.qFine=this._btn(i,`微速<small>FINE</small>`,(e,t)=>{this.g.controls.precision=!this.g.controls.precision}),this.qView=this._btn(i,`◎<small>視点</small>`,()=>this.g.controls.recenter()),this.qFs=this._btn(i,`⛶<small>全画面</small>`,()=>this.g.requestFullscreen(),`fs`),t.appendChild(i),this.banner=$(`div`,`hud-banner`),this.banner.addEventListener(`pointerdown`,e=>e.stopPropagation()),this.banner.addEventListener(`click`,e=>{e.stopPropagation(),this.g.audio.klaxonMuted=!0,this.open(`dc`)}),t.appendChild(this.banner),this.ticker=$(`div`,`hud-ticker`),t.appendChild(this.ticker),this.repairBar=$(`div`,`hud-repair`,`<div class="rb-l"></div><div class="rb-bar"><i></i></div><button class="hb sm">中止</button>`),this.repairBar.addEventListener(`pointerdown`,e=>e.stopPropagation()),this.repairBar.querySelector(`button`).addEventListener(`click`,e=>{e.stopPropagation(),this.g.inc.cancelRepair()}),this.rbL=this.repairBar.querySelector(`.rb-l`),this.rbI=this.repairBar.querySelector(`i`),t.appendChild(this.repairBar),this.tc=$(`div`,`hud-tc`),t.appendChild(this.tc),this.reticle=$(`div`,`hud-reticle`),t.appendChild(this.reticle),this.vision=$(`div`,`hud-vision`),t.appendChild(this.vision),this.pan=$(`div`,`hud-panel`),this.pan.addEventListener(`pointerdown`,e=>e.stopPropagation()),this.pan.addEventListener(`pointermove`,e=>e.stopPropagation()),t.appendChild(this.pan)}_hold(e,t,n,r=``){let i=$(`button`,`hb `+r,t),a=e=>{e.stopPropagation(),e.preventDefault();try{i.setPointerCapture?.(e.pointerId)}catch{}i.classList.add(`on`),n(!0),this._holds.add(o),navigator.vibrate?.(8)},o=()=>{this._holds.delete(o),i.classList.contains(`on`)&&(i.classList.remove(`on`),n(!1))};return i.addEventListener(`pointerdown`,a),i.addEventListener(`pointerup`,o),i.addEventListener(`pointercancel`,o),i.addEventListener(`lostpointercapture`,o),i.addEventListener(`contextmenu`,e=>e.preventDefault()),e.appendChild(i),i}releaseHolds(){for(let e of[...this._holds])e()}toggle(e){this.panel===e?this.close():this.open(e)}open(e){this.panel!==e&&this.releaseHolds(),this.g.controls?.reset(),this.panel=e,this.pan.className=`hud-panel open p-`+e;for(let t in this.tabBtns)this.tabBtns[t].classList.toggle(`on`,t===e);this._render(!0)}close(){this.releaseHolds(),this.panel=null,this._key=null,this.pan.className=`hud-panel`,this.pan.innerHTML=``,this._lives?.clear();for(let e in this.tabBtns)this.tabBtns[e].classList.remove(`on`)}update(e){let t=this.g,{sub:n,sys:r,ap:i,inc:a}=t;this._t+=e;let o=i.m||{},s=this.el,c=Math.max(0,o.depth??n.depth);s.hDepth.textContent=c<100?Q(c,1):Q(c).replace(/\B(?=(\d{3})+(?!\d))/g,`,`);let l=-n.vel.y;s.hVz.textContent=`${l>=0?`▼`:`▲`} ${Q(Math.abs(l),2)} m/s`,s.hVz.className=`sub`+(Math.abs(l)>1.2?` warn`:``),s.hHdg.textContent=Q(o.hdg??ff(n.yaw)).padStart(3,`0`),s.hSpd.textContent=Q((o.u??n.speed)*1.944,1),s.hAlt.textContent=o.dvl?Q(o.alt,1):`---`,s.hAlt.className=`v s`+(o.dvl&&o.alt<5?` alarm`:o.dvl&&o.alt<12?` warn`:``);let u=-n.trimState;s.hBuoy.textContent=(u>0?`+`:``)+Q(u),s.hBuoy.className=`v s`+(Math.abs(u)>200?` warn`:``),s.hApS.textContent=i.engaged?i.status||`ENG`:`MANUAL`,s.hAp.classList.toggle(`on`,i.engaged);let d=Gd(n.depth);s.hZone.textContent=d[0],s.hEnv.textContent=`${Q(Rd(Ld(n.depth)),0)} bar · ${Q(zd(n.depth),1)}°C`,this.qLight.classList.toggle(`on`,r.powered(`LIGHT`)&&r.lights.main>0),this.qFine.classList.toggle(`on`,t.controls.precision),this.qFlood.classList.toggle(`run`,n.vbtFlow>0),this.qPump.classList.toggle(`run`,n.vbtFlow<0),this.tabBtns.dc.classList.toggle(`alert`,a.active.some(e=>!e.resolved)&&this.panel!==`dc`);let f=a.active.filter(e=>!e.resolved).sort((e,t)=>t.sev-e.sev);if(f.length&&this.panel!==`dc`){let e=f[0];this.banner.className=`hud-banner show `+Ip[e.sev]+(Math.sin(this._t*8)>0&&e.sev>=3?` blink`:``);let t=`<b>${e.sev>=3?`WARNING`:`CAUTION`}</b> ${e.title}${f.length>1?` <i>+${f.length-1}</i>`:``}<span>タップで対処 ▶</span>`;this._bannerTxt!==t&&(this.banner.innerHTML=t,this._bannerTxt=t)}else this.banner.className=`hud-banner`;if(a.repair){let e=a.repair;this.repairBar.classList.add(`show`);let t=`作業中: ${e.proc.label}`;this._rbl!==t&&(this.rbL.textContent=t,this._rbl=t),this.rbI.style.width=`${Math.min(100,e.t/e.proc.time*100).toFixed(1)}%`}else this.repairBar.classList.remove(`show`);this.tc.textContent=t.timeScale>1?`▶▶ ×${t.timeScale}`:``,this.tc.classList.toggle(`show`,t.timeScale>1);let p=Math.max(r.hypoxia,r.hypercapnia*.8,1-r.pilotHealth);this.vision.style.opacity=Math.min(1,p*1.2).toFixed(3),this.vision.style.setProperty(`--pulse`,(.9+.1*Math.sin(this._t*(4+p*6))).toFixed(3)),this._pt=(this._pt||0)-e,this.panel&&this._pt<=0&&(this._pt=.16,this._render(!1))}msg(e,t=`info`){let n=performance.now();if(this._lastMsg===e&&n-this._lastMsgT<2500)return;this._lastMsg=e,this._lastMsgT=n;let r=$(`div`,`tk `+t,e);for(this.ticker.prepend(r);this.ticker.children.length>3;)this.ticker.lastChild.remove();setTimeout(()=>r.classList.add(`fade`),6e3),setTimeout(()=>r.remove(),7e3)}_render(e){let t=this.panel,n=this[`_p_`+t];if(!n)return;let r=n.call(this,null);if(e||r!==this._key){this._key=r,this.releaseHolds();let i=this.pan.querySelector(`.pn-body`)?.scrollTop||0;this._lives?.clear(),this.pan.innerHTML=``;let a=$(`div`,`pn-hdr`);a.innerHTML=`<b>${{ap:`AUTOPILOT 自動操縦`,dc:`DAMAGE CONTROL ダメージコントロール`,sys:`SYSTEMS 電力・生命維持・バラスト`,nav:`NAVIGATION 航法・目的地`,log:`LOG 航海記録・生物図鑑`}[t]}</b>`,this._btn(a,`✕`,()=>this.close(),`x`),this.pan.appendChild(a);let o=$(`div`,`pn-body`);this.pan.appendChild(o),n.call(this,o),this._patch(),e||(o.scrollTop=i)}else n.call(this,void 0)}_row(e,t,n=``){let r=$(`div`,`pr `+n);r.appendChild($(`span`,`pl`,t));let i=$(`span`,`pv`);return r.appendChild(i),e.appendChild(r),i}_grp(e,t){let n=$(`div`,`pg`);return t&&n.appendChild($(`div`,`pgt`,t)),e.appendChild(n),n}_live(e,t){(this._lives||=new Map).set(e,t)}_patch(){if(this._lives)for(let[e,t]of this._lives){if(!e.isConnected){this._lives.delete(e);continue}t(e)}}_p_ap(e){let{ap:t,sub:n}=this.g;if(e===null)return`ap`+ +!!t.nav.on;if(e===void 0)return this._patch();let r=this._grp(e),i=this._btn(r,``,()=>{t.engage(!t.engaged),this.g.sys.msg(t.engaged?`自動操縦 接続`:`自動操縦 解除`,`info`)},`big`);this._live(i,e=>{e.innerHTML=t.engaged?`AP 接続中 <small>ENGAGED — タップで解除</small>`:`AP 待機 <small>STBY — タップで接続</small>`,e.classList.toggle(`on`,t.engaged)});let a=$(`div`,`ap-status`);r.appendChild(a),this._live(a,e=>{e.innerHTML=`<b>${t.engaged?t.status:`MANUAL`}</b> ${t.warn?`<em>${t.warn}</em>`:``}`});let o=$(`div`,`ap-grid`);e.appendChild(o);let s=(e,r,i,a,s,c,l,u,d=0)=>{let f=$(`div`,`ap-ax`);o.appendChild(f);let p=this._btn(f,r,()=>{let e=t[a],r=!e.on;r&&a===`hdg`&&(e.target=Math.round(ff(n.yaw))),r&&a===`depth`&&(e.target=Math.round(n.depth)),r&&a===`alt`&&(e.target=Math.max(3,Math.round(t.m?.dvl?t.m.alt:10))),t.setMode(a,r)},`axb`);this._live(p,e=>e.classList.toggle(`on`,t[a].on&&t.engaged));let m=$(`div`,`ap-v`);f.appendChild(m),this._live(m,e=>{let n=t[a];e.textContent=`${Q(`target`in n?n.target:n.rate,d)} ${i}`});let h=$(`div`,`ap-adj`);f.appendChild(h);let g=e=>{let n=t[a],r=`target`in n?`target`:`rate`,i=n[r]+e;i=a===`hdg`?(i+360)%360:Math.min(u,Math.max(l,i)),n[r]=+i.toFixed(2)};this._btn(h,`−`+c,()=>g(-c),`sm`),this._btn(h,`−`+s,()=>g(-s),`sm`),this._btn(h,`+`+s,()=>g(s),`sm`),this._btn(h,`+`+c,()=>g(c),`sm`)};s(`hdg`,`HDG 方位保持`,`°`,`hdg`,5,45,0,360),s(`depth`,`DEPTH 深度保持`,`m`,`depth`,10,500,0,11500),s(`alt`,`ALT 高度保持`,`m`,`alt`,1,10,2,150),s(`speed`,`SPD 速力保持`,`m/s`,`speed`,.1,.5,-.8,1.9,1),s(`descent`,`DESCENT 自動潜航`,`m/s`,`descent`,.1,.3,.1,1.2,1);let c=this._grp(e,`MODES`),l=$(`div`,`btnrow`);c.appendChild(l);let u=(e,t,n,r)=>{let i=this._btn(l,e,t,r);this._live(i,e=>e.classList.toggle(`on`,n()))};u(`STATION 定点保持`,()=>t.setMode(`station`,!t.station.on),()=>t.station.on&&t.engaged),u(`ASCENT 自動浮上`,()=>t.setMode(`ascent`,!t.ascent.on),()=>t.ascent.on&&t.engaged,`amber`),u(`OAS 障害物回避`,()=>{t.oas.on=!t.oas.on},()=>t.oas.on),u(`AUTO BALLAST 自動浮力`,()=>{t.ballastAuto=!t.ballastAuto},()=>t.ballastAuto);let d=this._grp(e,`TIME COMPRESSION 時間加速 (自動操縦中のみ)`),f=$(`div`,`btnrow`);d.appendChild(f);for(let e of[1,2,4,8,16]){let t=this._btn(f,`×`+e,()=>this.g.setTimeScale(e),`sm`);this._live(t,t=>t.classList.toggle(`on`,this.g.timeScale===e))}}_p_dc(e){let{inc:t,sys:n,sub:r}=this.g,i=t.active.filter(e=>!e.resolved);if(e===null)return`dc`+i.map(e=>e.id+`:`+cf(e,n,r).map(e=>e.label).join(`/`)).join(`,`)+`:`+t.sealant+`:`+n.fire.suppressant;if(e===void 0)return this._patch();let a=this._grp(e),o=$(`div`,`dc-sum`);a.appendChild(o),this._live(o,e=>{e.innerHTML=`浸水 <b class="${r.floodL>5?`alarm`:``}">${Q(r.floodL,1)} L</b> (${Q(n.inflow*60,2)} L/min) · 船殻 <b class="${n.hull.integrity<.8?`warn`:``}">${Q(n.hull.integrity*100)}%</b> · 圧壊余裕 <b>${Q(this.g.crushMargin)} m</b> · シーラント ${t.sealant} · 消火器 ${n.fire.suppressant}`}),i.length||e.appendChild($(`div`,`empty`,`異常なし — ALL SYSTEMS NOMINAL`));for(let a of i){let i=$(`div`,`dc-card `+Ip[a.sev]);e.appendChild(i),i.appendChild($(`div`,`dc-t`,`<b>${a.sev>=3?`WARNING`:`CAUTION`}</b> ${a.title}<small>${a.en} · T+${Q(r.time-a.t)}s</small>`)),a.note&&i.appendChild($(`div`,`dc-n`,a.note));let o=$(`div`,`btnrow`);i.appendChild(o);for(let e of cf(a,n,r)){let n=this._btn(o,`${e.label}<small>${e.time}s${e.needs?` · 要シーラント`:``}</small>`,()=>{t.startRepair(a,e)&&this.g.audio.play(`tool`)},`proc`);this._live(n,e=>{e.disabled=!!t.repair})}}let s=this._grp(e,`EMERGENCY 緊急操作`),c=$(`div`,`btnrow`);s.appendChild(c),this._guard(c,`降下ウェイト投棄`,()=>this.g.dropWeight(`descent`),()=>`残 ${r.weights.descent}`),this._guard(c,`浮上ウェイト投棄`,()=>this.g.dropWeight(`ascent`),()=>`残 ${r.weights.ascent}`),this._guard(c,`緊急浮上 (全投棄)`,()=>this.g.emergencyBlow(),()=>`EMERG`);let l=this._btn(c,``,()=>n.toggleMask(),`amber`);this._live(l,e=>{e.innerHTML=`${n.emergencyMask?`呼吸器を外す`:`緊急呼吸器`}<small>${Q(n.emergencyO2*60)} min</small>`,e.classList.toggle(`on`,n.emergencyMask)}),this._btn(c,`アラーム消音<small>SILENCE</small>`,()=>{this.g.audio.klaxonMuted=!0})}_guard(e,t,n,r){let i=this._btn(e,``,()=>{i.dataset.armed===`1`?(i.dataset.armed=`0`,n()):(i.dataset.armed=`1`,setTimeout(()=>{i.dataset.armed=`0`},3e3))},`guard`);return this._live(i,e=>{e.innerHTML=`${e.dataset.armed===`1`?`⚠ もう一度押して実行`:t}<small>${r()}</small>`,e.classList.toggle(`armed`,e.dataset.armed===`1`)}),i}_p_sys(e){let{sys:t,sub:n}=this.g;if(e===null)return`sys`;if(e===void 0)return this._patch();let r=this._grp(e,`POWER 電源 (Li-ion 300V ×2 / 非常用 28V)`),i=$(`div`,`bats`);r.appendChild(i);for(let e of[`A`,`B`,`E`]){let n=$(`div`,`bat`);i.appendChild(n),this._live(n,n=>{let r=t.bat[e];n.className=`bat`+(r.online?r.fault?` warn`:``:` off`),n.innerHTML=`<b>BATT ${e}</b><div class="bar"><i style="width:${r.soc*100}%"></i></div><span>${Q(r.soc*100,1)}% · ${Q(r.v)}V · ${Q(r.temp)}°C</span><span>${Q((e===`A`?t.busA:e===`B`?t.busB:t.busE)/1e3,2)} kW ${r.fault?`· `+r.fault.toUpperCase():``}</span>`})}let a=$(`div`,`btnrow`);r.appendChild(a);let o=this._btn(a,``,()=>{t.cross=!t.cross,t.msg(`クロスタイ ${t.cross?`投入`:`開放`}`)},`amber`);this._live(o,e=>{e.innerHTML=`X-TIE<small>${t.cross?`ON 連系`:`OFF`}</small>`,e.classList.toggle(`on`,t.cross)});for(let e of[`A`,`B`]){let n=this._btn(a,``,()=>{t.bat[e].online=!t.bat[e].online,t.msg(`バッテリー${e} ${t.bat[e].online?`接続`:`切離`}`,`warn`)});this._live(n,n=>{n.innerHTML=`BATT ${e}<small>${t.bat[e].online?`ONLINE`:`OFFLINE`}</small>`,n.classList.toggle(`on`,t.bat[e].online)})}let s=this._btn(a,``,()=>{n.thrustLimit=n.thrustLimit>=1?.5:n.thrustLimit>=.5?.25:1});this._live(s,e=>{e.innerHTML=`推進制限<small>${Q(n.thrustLimit*100)}%</small>`});let c=$(`div`,`pr`);r.appendChild(c),this._live(c,e=>{let n=t.bat.A.soc*t.bat.A.cap+t.bat.B.soc*t.bat.B.cap;e.innerHTML=`総負荷 <b>${Q(t.totalPower/1e3,2)} kW</b> · 残エネルギー ${Q(n,1)} kWh · 推定残時間 <b>${Q(n/Math.max(.3,t.totalPower/1e3),1)} h</b>`});let l=this._grp(e,`BREAKERS 配電盤`),u=$(`div`,`brk`);l.appendChild(u);for(let e of tf){let n=this._btn(u,``,()=>{t.toggleBreaker(e.id),this.g.audio.play(`breaker`)});this._live(n,n=>{let r=t.breakers[e.id];n.className=`hb brkb`+(r.tripped?` trip`:r.closed?` on`:``),n.innerHTML=`${e.name}<small>${e.en} · ${r.tripped?`TRIP`:r.closed?Q(r.load)+` W`:`OPEN`}</small>`})}let d=this._grp(e,`LIGHTS 照明`),f=$(`div`,`btnrow`);d.appendChild(f);for(let[e,n]of[[`main`,`主照明 SPOT`],[`flood`,`投光 FLOOD`],[`cabin`,`艦内 CABIN`]]){let r=this._btn(f,``,()=>{let n=t.lights[e];t.lights[e]=n>=1?0:n>=.6?1:n>=.3?.6:.3});this._live(r,r=>{r.innerHTML=`${n}<small>${Q(t.lights[e]*100)}%</small>`,r.classList.toggle(`on`,t.lights[e]>0)})}let p=this._btn(f,``,()=>{this.g.lasers=!this.g.lasers});this._live(p,e=>{e.innerHTML=`レーザースケール<small>${this.g.lasers?`ON`:`OFF`}</small>`,e.classList.toggle(`on`,this.g.lasers)});let m=this._grp(e,`BALLAST / TRIM バラスト・トリム`),h=$(`div`,`pr`);m.appendChild(h),this._live(h,e=>{e.innerHTML=`VBT <b>${Q(n.vbt)} / 400 L</b> ${n.vbtIsolated?`<em>ISOLATED</em>`:``} · 流量 ${Q(n.vbtFlow,2)} L/s · 余剰浮力 <b>${Q(-n.trimState)} kg</b> · トリム ${Q(n.trim*100)}% · ピッチ ${Q(n.pitch*57.3,1)}°`});let g=$(`div`,`btnrow`);m.appendChild(g),this._hold(g,`注水 FLOOD`,e=>this.g.vbtManual(+!!e),`blue`),this._hold(g,`排水 PUMP`,e=>this.g.vbtManual(e?-1:0),`amber`),this._hold(g,`トリム 艦首↓`,e=>{n.trimCmd=+!!e}),this._hold(g,`トリム 艦首↑`,e=>{n.trimCmd=e?-1:0});let _=this._btn(g,``,()=>{this.g.ap.ballastAuto=!this.g.ap.ballastAuto});this._live(_,e=>{e.innerHTML=`自動浮力<small>${this.g.ap.ballastAuto?`AUTO`:`MAN`}</small>`,e.classList.toggle(`on`,this.g.ap.ballastAuto)});let v=this._btn(g,``,()=>this.g.toggleArm());this._live(v,e=>{e.innerHTML=`マニピュレーター<small>${n.manipulatorLost?`LOST`:this.g.ext.armTarget?`DEPLOYED`:`STOWED`}</small>`,e.classList.toggle(`on`,!!this.g.ext.armTarget)});let y=this._grp(e,`LIFE SUPPORT 生命維持`),b=$(`div`,`pr`);y.appendChild(b),this._live(b,e=>{e.innerHTML=`O2 <b class="${t.o2<19?`warn`:``}">${Q(t.o2,2)}%</b> · CO2 <b class="${t.co2>.5?`warn`:``}">${Q(t.co2,2)}%</b> · 気圧 ${Q(t.cabinP,3)} bar · ${Q(t.cabinT,1)}°C · 湿度 ${Q(t.rh)}% · O2残 ${Q(t.o2Bottles)} L · LiOH ${Q(t.scrubber.canister*100)}% (予備${t.scrubber.spare}) · 体調 <b class="${t.pilotHealth<.7?`warn`:``}">${Q(t.pilotHealth*100)}%</b>`});let x=$(`div`,`btnrow`);y.appendChild(x),this._btn(x,`O2流量 −`,()=>{t.o2Flow=Math.max(0,+(t.o2Flow-.05).toFixed(2))},`sm`);let S=$(`span`,`pv`);x.appendChild(S),this._live(S,e=>{e.textContent=`${Q(t.o2Flow,2)} L/min`}),this._btn(x,`O2流量 +`,()=>{t.o2Flow=Math.min(2,+(t.o2Flow+.05).toFixed(2))},`sm`),this._btn(x,`キャニスター交換`,()=>{t.swapCanister(),this.g.audio.play(`tool`)});let C=this._btn(x,``,()=>{t.scrubber.fan=!t.scrubber.fan});this._live(C,e=>{e.innerHTML=`スクラバーファン<small>${t.scrubber.fanOK?t.scrubber.fan?`ON`:`OFF`:`FAIL`}</small>`,e.classList.toggle(`on`,t.scrubber.fan&&t.scrubber.fanOK)});let w=this._btn(x,``,()=>t.toggleBreaker(`HEAT`));this._live(w,e=>{e.innerHTML=`暖房<small>${t.powered(`HEAT`)?`ON 1.8kW`:`OFF`}</small>`,e.classList.toggle(`on`,t.powered(`HEAT`))})}_p_nav(e){let{ap:t,sub:n}=this.g;if(e===null)return`nav`+(t.nav.on?t.nav.poi?.id||``:`-`)+`:`+this.g.discovered.size;if(e===void 0)return this._patch();let r=this._grp(e),i=$(`div`,`pr`);r.appendChild(i),this._live(i,e=>{e.innerHTML=t.nav.on?`目的地 <b>${t.nav.poi?.name}</b> · 残距離 <b>${Q(t.navDist)} m</b> · 到着予想 ${Q((t.navDist||0)/Math.max(.2,Math.abs(n.speed))/60,1)} 分`:`現在位置 X ${Q(n.pos.x)} / Z ${Q(n.pos.z)} · 母船まで ${Q(Math.hypot(n.pos.x+10,n.pos.z-150))} m · 最大深度 ${Q(n.maxDepth)} m`});let a=$(`div`,`poi-list`);e.appendChild(a);for(let e of ld){let r=$(`div`,`poi`+(t.nav.poi===e&&t.nav.on?` on`:``)+(this.g.discovered.has(e.id)?` found`:``));a.appendChild(r);let i=$(`div`,`poi-d`);r.appendChild(i),this._live(i,t=>{let r=Math.hypot(e.x-n.pos.x,e.y-n.pos.y,e.z-n.pos.z);t.innerHTML=`<b>${e.name}</b><small>${e.nameEn}</small><span>深度 ${Q(-e.y)} m · 距離 ${Q(r)} m${this.g.discovered.has(e.id)?` · ✔ 調査済`:``}</span><p>${e.desc}</p>`}),this._btn(r,t.nav.poi===e&&t.nav.on?`航行中`:`自動航行`,()=>{this.g.navTo(e),this._key=null},`go`)}let o=$(`div`,`poi`);a.appendChild(o),o.appendChild($(`div`,`poi-d`,`<b>母船「かいれい」直下へ浮上</b><small>Return to mothership</small><p>母船の直下まで移動し、自動浮上する。</p>`)),this._btn(o,`帰還`,()=>{this.g.returnHome(),this._key=null},`go amber`)}_p_log(e){let t=this.g;if(e===null){let e=t.sys.messages;return`log`+e.length+`:`+(e[e.length-1]?.t??0)+`:`+t.life.sightings.size}if(e===void 0)return this._patch();let n=this._grp(e,`STATS 潜航記録`),r=$(`div`,`pr`);n.appendChild(r),this._live(r,e=>{let n=t.sub.time;e.innerHTML=`潜航時間 <b>${Math.floor(n/3600)}:${String(Math.floor(n/60)%60).padStart(2,`0`)}:${String(Math.floor(n)%60).padStart(2,`0`)}</b> · 最大深度 <b>${Q(t.sub.maxDepth)} m</b> · 航走距離 ${Q(t.sub.distance)} m · 発見 ${t.life.sightings.size}/${Object.keys(cp).length} 種 · 調査地点 ${t.discovered.size}/${ld.length} · 採取試料 ${t.samples}`});let i=this._grp(e,`SPECIES 生物図鑑`),a=$(`div`,`species`);i.appendChild(a);for(let e in cp){let n=t.life.sightings.has(e);a.appendChild($(`div`,`spc`+(n?` seen`:``),n?`<b>${cp[e][0]}</b><small>${cp[e][1]}</small>`:`<b>？？？</b><small>未発見</small>`))}let o=this._grp(e,`MESSAGES 通信・イベント`),s=$(`div`,`msgs`);o.appendChild(s);for(let e of t.sys.messages.slice(-40).reverse())s.appendChild($(`div`,`m `+e.level,`<i>T+${Q(e.t)}s</i> ${e.text}`));let c=this._grp(e,`SETTINGS 設定`),l=$(`div`,`btnrow`);c.appendChild(l),l.appendChild($(`span`,`pv`,`画質`)),Fp.forEach((e,n)=>{let r=this._btn(l,`${e.ja}<small>${e.name}</small>`,()=>t.setQuality(n),`sm`);this._live(r,e=>e.classList.toggle(`on`,t.quality===n))});let u=$(`div`,`set-grid`);c.appendChild(u);let d=this._btn(u,``,()=>{t.audio.enabled=!t.audio.enabled});this._live(d,e=>{e.innerHTML=`サウンド<small>${t.audio.enabled?`ON`:`OFF`}</small>`});let f=this._btn(u,``,()=>{if(t.audio.voice=!t.audio.voice,!t.audio.voice)try{speechSynthesis.cancel()}catch{}});this._live(f,e=>{e.innerHTML=`母船音声<small>${t.audio.voice?`ON`:`OFF`}</small>`});let p=this._btn(u,``,()=>{let e=[.5,1,2];t.inc.rateMul=e[(e.indexOf(t.inc.rateMul)+1)%e.length]});this._live(p,e=>{e.innerHTML=`トラブル頻度<small>${{.5:`低`,1:`標準`,2:`高`}[t.inc.rateMul]||t.inc.rateMul}</small>`}),this._btn(u,`全画面<small>FULLSCREEN</small>`,()=>t.requestFullscreen());let m=[.003,.0042,.006],h=this._btn(u,``,()=>{let e=m.findIndex(e=>Math.abs(e-t.controls.lookSens)<1e-6);t.controls.lookSens=m[(e+1)%m.length];try{localStorage.setItem(`ad-look`,t.controls.lookSens)}catch{}});this._live(h,e=>{e.innerHTML=`視点感度<small>${[`低`,`中`,`高`][m.findIndex(e=>Math.abs(e-t.controls.lookSens)<1e-6)]??`中`}</small>`}),this._btn(u,`セーブ<small>SAVE</small>`,()=>{t.save(),t.sys.msg(`航海記録を保存しました`,`good`)}),this._guard(u,`潜航を中止してタイトルへ`,()=>t.abort(),()=>`ABORT`)}},Rp=`abyssal-descent-save-v1`,zp=`ad-quality-v2`;function Bp(){try{let e=localStorage.getItem(zp);if(e!==null&&Fp[+e])return+e}catch{}return 2}var Vp=1/60,Hp=new U(-10,0,150),Up={implosion:[`船殻圧壊`,`HULL IMPLOSION`,`外殻が水圧に耐えきれず、一瞬で圧壊した。`],flooded:[`浸水による水没`,`FLOODED`,`耐圧殻内が海水で満たされた。`],hypoxia:[`低酸素症`,`HYPOXIA`,`艦内の酸素濃度が生存限界を下回った。`],co2:[`二酸化炭素中毒`,`CO2 POISONING`,`CO2濃度が致死量に達した。`],power:[`全電源喪失`,`TOTAL POWER LOSS`,`全バッテリーが枯渇し、生命維持が停止した。`]},Wp=new U,Gp=new U,Kp=new U,qp=new Dt,Jp=new Dt,Yp=new cn,Xp=class e{constructor(e,t,n){this.canvas=e,this.ui=t,this.params=n,this.manual=n.has(`manual`),this.timeScale=1,this.quality=n.has(`q`)&&Fp[+n.get(`q`)]?+n.get(`q`):Bp(),this.state=`boot`,this.discovered=new Set,this.sampled=new Set,this.samples=0,this.lasers=!1,this.trail=[],this.flash=0,this.shake=0,this.radioQueue=[],this._milestones=new Set,this._acc=0,this._clock=new os(!1),this._t=0,this._saveT=20,this._headOff=new U}async boot(e=()=>{}){let t=this.renderer=new Eu({canvas:this.canvas,antialias:!1,powerPreference:`high-performance`,preserveDrawingBuffer:this.manual,stencil:!1});this.canvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this._ctxLost=!0,this.state===`play`&&this.save()},!1),this.canvas.addEventListener(`webglcontextrestored`,()=>{this._ctxLost=!1,this.applyQuality()},!1),t.outputColorSpace=Le,t.toneMapping=0,t.shadowMap.enabled=!0,t.shadowMap.type=1,Td(t.capabilities.getMaxAnisotropy()),this.pipe=new Wu(t),this.scene=new Nn,this.camera=new Mo(74,innerWidth/Math.max(1,innerHeight),.03,900),this.scene.add(this.camera),this.hemi=new bo(16777215,2241348,.8),this.scene.add(this.hemi),this.sun=new zo(16777215,2.5),this.sun.position.set(30,100,20),this.scene.add(this.sun),this.scene.add(this.sun.target),e(.05,`シミュレーション初期化`),this.sub=new $d,this.sys=new rf(this.sub),this.env={},this.inc=new lf(this.sub,this.sys,this.env),this.ap=new mf(this.sub,this.sys),this.audio=new jp,e(.12,`地形マテリアル読込`);let n=await Md();this.terrain=new xd(this.scene,n),e(.3,`耐圧殻内装 構築`),this.cockpit=await new Gf(t).build(),this.mfd=new Xf(this.cockpit),e(.5,`船体外装 構築`),this.ext=await new Qf(this.scene).build(),this.pipe.spots=this.ext.spots,e(.6,`海洋生物`),this.snow=new ep(this.scene,16e3,28),this.bubbles=new tp(this.scene,2e3),this.life=new sp(this.scene),this.props=new Op(this.scene),this.sub.propColliders=this.props.colliders;try{this.mothership=await kp(this.scene)}catch(e){console.warn(e)}this.controls=new Pp(this.ui,{onTap:(e,t)=>this._tap(e,t)}),this.hud=new Lp(this.ui,this),this._wire();let r=()=>{clearTimeout(this._rzT),this.resize(),this._rzT=setTimeout(()=>this.resize(),300)};addEventListener(`resize`,r),addEventListener(`orientationchange`,r),document.addEventListener(`fullscreenchange`,r),document.addEventListener(`webkitfullscreenchange`,r),window.visualViewport?.addEventListener(`resize`,r),this.applyQuality(!0),this._applyDevStart(),e(.7,`海底地形 生成`),await this._warmTerrain(t=>e(.7+t*.28,`海底地形 生成`)),e(1,`準備完了`),this.state=`title`,this._clock.start(),this._clock.getDelta(),this._loop=this._loop.bind(this),this.manual?this._manualLoop():requestAnimationFrame(this._loop),window.__game=this,window.__shot=()=>(this._render(this._t),this.canvas.toDataURL(`image/jpeg`,.9))}async _warmTerrain(e){let t=performance.now();for(let n=0;n<400;n++){this.terrain.update(this.sub.pos),this.props.update(0,{subPos:this.sub.pos,camPos:this.sub.pos,extLight:0}),await new Promise(e=>setTimeout(e,30));let r=this.terrain.loading;if(e(Math.min(1,n/60)),n>12&&!r&&this.terrain.meshCount>10||performance.now()-t>25e3)break}}_applyDevStart(){let e=this.params,t=e.get(`poi`)&&ld.find(t=>t.id===e.get(`poi`));if(t){let n=+(e.get(`a`)??.6),r=+(e.get(`dist`)??28);this.sub.pos.set(t.x+Math.sin(n)*r,t.y+ +(e.get(`up`)??8),t.z+Math.cos(n)*r),this.sub.yaw=n,this.sub.vbt=150}else if(e.has(`depth`)){let t=+e.get(`depth`),n=+(e.get(`alt`)??40),r=+(e.get(`z`)??this.sub.pos.z),i=e.has(`x`)?+e.get(`x`):this.sub.pos.x;if(!e.has(`x`)){let e=td(r);for(let a=0;a<400&&pd(i,r,0)>-t-n;a++)i+=e-i>0?10:-10}this.sub.pos.set(i,-t,r),this.sub.vbt=150;let a=pd(i,r,0);this.sub.pos.y<a+4&&(this.sub.pos.y=a+6),this.sub.yaw=e.has(`yaw`)?+e.get(`yaw`):-Math.PI/2}e.has(`yaw`)&&(this.sub.yaw=+e.get(`yaw`)),this.sub._updateQuat(),(t||e.has(`depth`))&&(this._neutralise(),this._devStart=!0)}_neutralise(){let e=this.sub;e.depth=-e.pos.y;for(let t=0;t<40;t++){let t=e.trimState;e.vbt=Et.clamp(e.vbt-t/1.025,0,400)}}_wire(){let{inc:e,sys:t,audio:n,hud:r}=this;t.onMessage=(e,t)=>r.msg(e,t),e.onIncident=e=>{n.play(e.sev>=3?`warn`:`chime`),e.sfx&&n.play(e.sfx),r.msg(`${e.sev>=3?`⚠ WARNING`:`CAUTION`}: ${e.title}`,e.sev>=3?`alarm`:`warn`),t.messages.push({text:e.title,level:e.sev>=3?`alarm`:`warn`,t:this.sub.time}),this.timeScale>1&&(this.setTimeScale(1),r.msg(`異常発生 — 時間加速を解除`,`warn`)),e.shake&&(this.shake=Math.max(this.shake,e.shake)),(e.sfx===`bang`||e.sfx===`crack`)&&(this.flash=Math.max(this.flash,.15)),(e.kind===`elec`||e.kind===`fire`)&&this.cockpit&&(this._spark=this.cockpit.busBarPos),e.kind===`leak`&&navigator.vibrate?.([30,40,30]),e.sev>=2&&setTimeout(()=>this.radio(this._radioReply(e)),5e3+Math.random()*4e3)},e.onImpact=e=>{n.thud(e),this.shake=Math.max(this.shake,Math.min(1.2,e*.9)),navigator.vibrate?.(Math.min(200,40+e*80)),e>1&&(this.flash=Math.max(this.flash,.06))},e.onRepairStart=()=>n.play(`tool`),e.onRepairDone=()=>n.play(`good`),this.life.onSighting=e=>{let i=cp[e];i&&this.state===`play`&&(r.msg(`🐟 生物発見: ${i[0]} — ${i[1]}`,`good`),t.messages.push({text:`生物発見: ${i[0]}`,level:`good`,t:this.sub.time}),n.play(`good`))},document.addEventListener(`visibilitychange`,()=>{document.hidden?(this.state===`play`&&this.save(),this.audio.suspend()):this.state===`play`&&this.audio.resume()})}_radioReply(e){let t=e=>e[Math.random()*e.length|0];switch(e.kind){case`leak`:return t([`わだつみ、浸水の報告を受けた。浸水量を監視し、必要なら直ちに浮上せよ。`,`母船了解。浸水箇所を隔離し、状況を報告せよ。`]);case`fire`:return`火災了解！ 呼吸器を装着し、配電盤を遮断して消火せよ。`;case`hull`:return`ひずみ異常を確認した。これ以上の潜航は許可できない。浮上を開始せよ。`;case`ballast`:return`バラスト異常了解。ウェイト投棄の準備をせよ。`;case`entangle`:return`絡まりか。落ち着いて後進をかけ、振りほどけ。`;case`collision`:return`衝撃を検知した。船体の損傷を確認せよ。`;case`lss`:return`生命維持系の異常を了解。CO2濃度に注意せよ。`;case`battery`:return`バッテリー異常了解。負荷を下げ、温度を監視せよ。`;default:return`わだつみ、こちらかいれい。異常の報告を了解した。`}}radio(e){this.sys.comms.signal<.15||this.state!==`play`||(this.hud.msg(`📻 かいれい: ${e}`,`radio`),this.sys.messages.push({text:`かいれい: ${e}`,level:`radio`,t:this.sub.time}),this.audio.speak(e))}setTimeScale(e){if(e>1&&!this.ap.engaged){this.hud.msg(`時間加速は自動操縦中のみ使用可能`,`warn`);return}if(e>1&&this.inc.active.some(e=>!e.resolved&&e.sev>=2)){this.hud.msg(`異常対処中は時間加速できない`,`warn`);return}this.timeScale=e}toggleLights(){let e=this.sys.lights;if(!this.sys.powered(`LIGHT`)){this.hud.msg(`外部照明ブレーカーが開放/トリップしている`,`warn`);return}let t=e.main>0||e.flood>0;e.main=t?0:.85,e.flood=t?0:.6,this.audio.play(`breaker`)}vbtManual(e){e!==0&&this.ap.ballastAuto&&(this.ap.ballastAuto=!1,this.hud.msg(`手動バラスト操作 — 自動浮力制御を解除`,`info`)),e<0&&!this.sys.powered(`HYD`)&&this.hud.msg(`油圧系統に電源がない — 排水不能`,`warn`),this.sub.vbtCmd=e}dropWeight(e){this.sub.dropWeight(e)?(this.audio.play(`drop`),this.sys.msg(`${e===`descent`?`降下`:`浮上`}用ウェイト ${Xd.dropWeightMass} kg 投棄`,`warn`),this._burst(40,-1.7),this.shake=Math.max(this.shake,.3)):this.hud.msg(`投棄できるウェイトがない`,`warn`)}emergencyBlow(){let e=0;for(;this.sub.dropWeight(`descent`);)e++;for(;this.sub.dropWeight(`ascent`);)e++;e&&(this.audio.play(`drop`),this._burst(80,-1.7)),this.sub.vbtIsolated=!1,this.sub._vbtStuckOpen=!1,this.ap.engage(!0),this.ap.setMode(`ascent`,!0),this.ap.ballastAuto=!0,this.sys.msg(`緊急浮上！ ウェイト ${e} 個投棄、VBT全排水`,`alarm`),this.radio(`緊急浮上を確認した。浮上地点に向かう。`)}toggleArm(){if(this.sub.manipulatorLost){this.hud.msg(`マニピュレーターは投棄済み`,`warn`);return}if(!this.sys.powered(`HYD`)){this.hud.msg(`油圧系統に電源がない`,`warn`);return}this.ext.setArm(!this.ext.armTarget),this.audio.play(`grind`)}navTo(e){this._homeBound=!1,this.ap.engage(!0),this.ap.navTo(e),this.sys.msg(`自動航行開始 → ${e.name}`,`info`),this.radio(`了解。${e.name}への航行を許可する。`)}returnHome(){this._homeBound=!0,this.ap.engage(!0),this.ap.navTo({id:`home`,name:`母船直下`,nameEn:`Mothership`,x:Hp.x,y:-Math.min(40,Math.max(12,this.sub.depth))-12,z:Hp.z,r:30}),this.sys.msg(`母船直下へ帰還航行開始`,`info`),this.radio(`了解。母船直下で浮上せよ。回収準備に入る。`)}_tap(e,t){if(this.state!==`play`)return;let n=this.canvas.getBoundingClientRect(),r=new H((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),i=this._rc||=new rs;i.setFromCamera(r,this.camera);let a=i.intersectObjects(this.cockpit.scene.children,!0);for(let e of a){let t=e.object;for(;t&&!t.userData.action;)t=t.parent;if(t){this._cockpitAction(t.userData.action);return}if(e.distance>.2)break}}_cockpitAction(e){let{ap:t,sys:n,audio:r}=this;if(r.play(`button`),navigator.vibrate?.(10),e.type===`breaker`){n.toggleBreaker(e.id),r.play(`breaker`);return}if(e.type===`mfd`){let t=[`PFD`,`NAV`,`SONAR`,`SYS`],n=this.mfd.pages[e.id];n?this.mfd.pages[e.id]=t[(t.indexOf(n)+1)%t.length]:e.id===`lss`?this.hud.open(`sys`):this.hud.open(`log`);return}switch(e.id){case`AP`:t.engage(!t.engaged),n.msg(t.engaged?`自動操縦 接続`:`自動操縦 解除`);break;case`HDG`:t.setMode(`hdg`,!t.hdg.on,Math.round(ff(this.sub.yaw)));break;case`DPT`:t.setMode(`depth`,!t.depth.on,Math.round(this.sub.depth));break;case`ALT`:t.setMode(`alt`,!t.alt.on,8);break;case`SPD`:t.setMode(`speed`,!t.speed.on,.8);break;case`STN`:t.setMode(`station`,!t.station.on);break;case`NAV`:this.hud.open(`nav`);break;case`OAS`:t.oas.on=!t.oas.on,n.msg(`障害物回避 ${t.oas.on?`ON`:`OFF`}`);break;case`LT1`:n.lights.main=n.lights.main>0?0:.85;break;case`LT2`:n.lights.flood=n.lights.flood>0?0:.6;break;case`VBT`:case`TRM`:this.hud.open(`sys`);break;case`ALM`:r.klaxonMuted=!0,n.msg(`アラーム消音`);break;case`CAM`:this.lasers=!this.lasers}}_burst(e,t=0){let n=new U;for(let r=0;r<e;r++)n.set((Math.random()-.5)*2,t+Math.random()*.5,-2+(Math.random()-.5)*3).applyQuaternion(this.sub.quat).add(this.sub.pos),this.bubbles.emit(n,new U((Math.random()-.5)*.6,.3+Math.random(),(Math.random()-.5)*.6),.02+Math.random()*.08,8+Math.random()*6)}start(e){this.state!==`play`&&(this.requestFullscreen(),this.audio.start().catch?.(()=>{}),this.controls.reset(),e?this.load():(this.sys.msg(`DSV-11 わだつみ 潜航開始。全系統正常。`,`good`),setTimeout(()=>this.radio(`わだつみ、こちら母船かいれい。潜航を許可する。良い航海を。`),2500)),this.state=`play`,this._devStart=!1,this.inc.clock=0,this._clock.getDelta(),this._acc=0,this.ui.classList.add(`play`))}static isFullscreen(){return!!(document.fullscreenElement||document.webkitFullscreenElement)}requestFullscreen(){let t=document.documentElement,n=t.requestFullscreen||t.webkitRequestFullscreen,r=()=>{try{screen.orientation?.lock?.(`landscape`)?.catch?.(()=>{})}catch{}};if(e.isFullscreen()){r();return}if(n)try{let e=n.call(t,{navigationUI:`hide`});e&&e.then?e.then(r,()=>{}):setTimeout(r,200)}catch{}}abort(){this.save(),location.reload()}save(){try{if(this.state!==`play`||this.sys.dead)return;let e={v:1,sub:this.sub.serialize(),sys:this.sys.serialize(),inc:this.inc.serialize(),ap:this.ap.serialize(),disc:[...this.discovered],sampled:[...this.sampled],samples:this.samples,sight:[...this.life.sightings],at:Date.now()};localStorage.setItem(Rp,JSON.stringify(e))}catch(e){console.warn(`save failed`,e)}}static hasSave(){try{let e=JSON.parse(localStorage.getItem(Rp));return e&&e.v===1?e:null}catch{return null}}static clearSave(){try{localStorage.removeItem(Rp)}catch{}}load(){let t=e.hasSave();if(t){try{this.sub.restore(t.sub),this.sys.restore(t.sys)}catch(t){console.warn(`corrupt save`,t),e.clearSave();return}if(this.inc.sealant=t.inc?.sealant??2,this.inc.clock=t.inc?.clock??0,t.ap)for(let e of[`hdg`,`depth`,`alt`,`speed`])t.ap[e]&&Object.assign(this.ap[e],t.ap[e]);for(let e of[100,200,500,1e3,2e3,3e3,4e3,5e3,6e3,7e3,8e3,9e3,1e4,10900])this.sub.maxDepth>e&&this._milestones.add(e);t.disc?.forEach(e=>this.discovered.add(e)),t.sampled?.forEach(e=>this.sampled.add(e)),this.samples=t.samples||0,t.sight?.forEach(e=>this.life.sightings.add(e)),this.sys.msg(`航海記録を読み込みました`,`good`)}}resize(){let e=innerWidth,t=innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.fov=Et.clamp(64*(1.9/Math.max(1.3,e/t))+10,66,82),this.camera.updateProjectionMatrix();let n=devicePixelRatio||1,r=Fp[this.quality]||Fp[2],i=this.params.has(`pr`)?+this.params.get(`pr`):Math.min(n,r.pr);this.pipe.setSize(e,t,i),this._pr=i;let a=i*t/400;this.cockpit.pMat.uniforms.uPR.value=a,this.snow.mat.uniforms.uPR.value=a,this.bubbles.mat.uniforms.uPR.value=a}setQuality(e){if(Fp[e]){this.quality=e;try{localStorage.setItem(zp,String(e))}catch{}this.applyQuality()}}applyQuality(e=!1){let t=Fp[this.quality]||Fp[2],n=this.renderer;n.shadowMap.enabled=!!t.shadow,n.shadowMap.needsUpdate=!0;for(let e of this.ext.lamps)e.kind===`main`&&(e.L.castShadow=!!t.shadow,e.L.shadow.mapSize.set(t.shadowMap,t.shadowMap),e.L.shadow.map?.dispose(),e.L.shadow.map=null);this.cockpit.setShadows?.(t.cockpitShadow),this.pipe.setQuality?.(t),this.snow.setDensityScale?.(t.snow),Td(Math.min(t.aniso,n.capabilities.getMaxAnisotropy())),e||(this.scene.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>{e.needsUpdate=!0})}),this.cockpit.scene.traverse(e=>{e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(e=>{e.needsUpdate=!0})})),this.resize()}_manualLoop(){let e=()=>{this._frame(1/20),setTimeout(e,50)};e()}_loop(){requestAnimationFrame(this._loop);let e=Math.min(.1,this._clock.getDelta());if(!(this._ctxLost||document.hidden))try{this._frame(e)}catch(e){let t=String(e&&e.message);(this._errs||=new Set).has(t)||(this._errs.add(t),console.error(e))}}_frame(e){this._t+=e;let t=this._t;if(this.state===`play`){this._acc+=e*this.timeScale;let t=0;for(;this._acc>=Vp&&t<960&&(this._step(Vp),this._acc-=Vp,t++,this.state===`play`););t>=960&&(this._acc=0)}else this.state===`title`&&!this._devStart&&(this.sub.pos.y=-1.5+Math.sin(t*.6)*.1,this.sub.roll=Math.sin(t*.5)*.02,this.sub.pitch=Math.sin(t*.37)*.015,this.sub.yaw+=e*.004,this.sub._updateQuat());this._visual(e,t),this._render(t)}_step(e){let{sub:t,sys:n,inc:r,ap:i}=this,a=this.controls.read();this.pilot=a,this.timeScale>1&&Math.abs(a.surge)+Math.abs(a.yaw)+Math.abs(a.heave)+Math.abs(a.sway)>.1&&this.setTimeScale(1);let o=Et.clamp(n.pilotHealth*1.4-.2,0,1);i.update(e,{surge:a.surge*o,yaw:a.yaw*o,heave:a.heave*o,sway:a.sway*o}),this.env.quake>0&&t.extForce.add(Wp.set((Math.random()-.5)*6e3,(Math.random()-.5)*4e3,(Math.random()-.5)*6e3)),t.step(e,n),n.activeCautions=r.cautionCount,n.step(e,this.env),r.step(e),this.crushMargin=Xd.crushDepth*(1-n.hull.fatigue*3-(1-n.hull.integrity)*.5-n.hull.crack*.3)-t.depth,t.siltStir=Math.max(0,t.siltStir-e*.05);for(let e of ld){let r=Math.hypot(e.x-t.pos.x,e.y-t.pos.y,e.z-t.pos.z);r<e.r*.9&&!this.discovered.has(e.id)&&(this.discovered.add(e.id),n.msg(`★ 調査地点到達: ${e.name}`,`good`),this.audio.play(`good`),setTimeout(()=>this.radio(`${e.name}への到達を確認。素晴らしい。映像を記録せよ。`),3e3)),r<e.r*.6&&this.ext.armPose>.9&&!this.sampled.has(e.id)&&t.altitude<6&&(this.sampled.add(e.id),this.samples++,n.msg(`マニピュレーターで試料採取: ${e.name}`,`good`),this.audio.play(`grind`))}for(let e of[100,200,500,1e3,2e3,3e3,4e3,5e3,6e3,7e3,8e3,9e3,1e4,10900])t.depth>e&&!this._milestones.has(e)&&(this._milestones.add(e),n.msg(`深度 ${e.toLocaleString()} m 通過`,`info`),e>=1e3&&e%1e3==0&&setTimeout(()=>this.radio(`深度${e}メートル通過を確認。全系統の状態を報告せよ。`),1500),e===200&&n.msg(`太陽光がほぼ届かない薄明層へ。外部照明を点灯せよ。`,`info`),e===1e3&&n.msg(`漸深層 — 完全な暗黒の世界`,`info`),e===10900&&this.radio(`信じられない…わだつみ、君は地球の最深部にいる。`));this._homeBound&&!i.nav.on&&Math.hypot(t.pos.x-Hp.x,t.pos.z-Hp.z)<40&&(this._homeBound=!1,i.setMode(`ascent`,!0),n.msg(`母船直下 — 自動浮上`,`good`)),t.depth<1.5&&t.maxDepth>30&&(t.vel.y>-.05||i.ascent.on&&i.engaged)&&this._surface(),t.vbtFlow<0&&Math.random()<e*25&&this._burst(1,-.5),t.vbtFlow>0&&Math.random()<e*10&&this._burst(1,.9),this._trailT=(this._trailT||0)-e,this._trailT<=0&&(this._trailT=2,this.trail.push(t.pos.x,t.pos.z),this.trail.length>800&&this.trail.splice(0,2)),this._saveT-=e,this._saveT<=0&&(this._saveT=30,this.save()),n.dead&&this.state===`play`&&this._die(n.dead)}_endCommon(){this.controls.reset(),this.hud.releaseHolds(),this.hud.close(),this.timeScale=1,this.ui.classList.remove(`play`);try{speechSynthesis?.cancel()}catch{}}_surface(){this.state===`play`&&(this.state=`end`,this._endCommon(),this.audio.play(`surface`),this.onEnd?.(`surface`,this._stats()),e.clearSave())}_die(t){this.state===`play`&&(this.state=`end`,this._endCommon(),t===`implosion`&&(this.audio.play(`implode`),this.flash=1,this.pipe.params.flashColor.set(1,1,1)),this.onEnd?.(t,this._stats(),Up[t]),e.clearSave())}_stats(){let e=this.sub;return{time:e.time,maxDepth:e.maxDepth,dist:e.distance,species:this.life.sightings.size,speciesTotal:Object.keys(cp).length,pois:this.discovered.size,poisTotal:ld.length,samples:this.samples,incidents:this.inc.history.length}}_visual(e,t){let{sub:n,sys:r,ap:i,inc:a}=this,o=this.camera,s=this.controls.look;s.id===null&&(s.yaw*=1-Math.min(1,e*.25),s.pitch*=1-Math.min(1,e*.25));let c=s.yaw+ +(this.params.get(`lx`)??0),l=Bf+s.pitch+ +(this.params.get(`ly`)??0),u=Wp.copy(Rf).add(zf),d=l-Bf;u.x+=Math.sin(c)*.12,u.z-=(1-Math.cos(c))*.05+Math.max(0,-d)*.16,u.y-=Math.max(0,-d)*.1-Math.max(0,d)*.03;let f=Gp.copy(n.acc||Kp).applyQuaternion(Jp.copy(n.quat).invert());this._headOff.lerp(f.multiplyScalar(-.04).clampLength(0,.06),Math.min(1,e*3)),u.add(this._headOff),u.y+=Math.sin(t*(1.4+r.pilotStress*1.5))*.004*(1+r.hypercapnia*3),o.position.copy(u).applyQuaternion(n.quat).add(n.pos),this.shake=Math.max(0,Math.max(this.shake,a.shake)-e*.9);let p=0;for(let e of n.thr)p=Math.max(p,Math.abs(e.rpm));let m=p*.004+(n.thr.some(e=>e.fault===`degraded`||e.jam>0)?.01:0),h=this.shake*.03+m;Yp.set(l+(Math.random()-.5)*h,c+(Math.random()-.5)*h,(Math.random()-.5)*h*.6,`YXZ`),qp.setFromEuler(Yp),o.quaternion.copy(n.quat).multiply(qp),o.updateMatrixWorld(),ju(t,1+n.siltStir*2+(this.env.turbidity?1.8:0)+(this.env.ventHeat||0)*1.5);let g=Au(o.position.y);this.hemi.color.setRGB(g.r,g.g,g.b),this.hemi.groundColor.setRGB(g.r*.1,g.g*.15,g.b*.2),this.sun.color.setRGB(g.r,g.g,g.b),this.sun.position.set(o.position.x+30,o.position.y+100,o.position.z+20),this.sun.target.position.copy(o.position),this.pipe.params.scatB=.012+.028*Math.exp(-n.depth/350)+(this.env.ventHeat||0)*.01,this.pipe.params.silt=Et.clamp(n.siltStir*.6+(this.env.turbidity?.4:0),0,1),this.ext.update(e,t,{sub:n,sys:r,ap:i,lasers:this.lasers});let _=this.ext.extLight;this.terrain.update(n.pos);let v={subPos:n.pos,camPos:o.position,extLight:_,subQuat:n.quat};this.props.update(t,v),this.life.update(e,t,n.pos,n.vel,_>.2,n.depth,v);let y=this._snowSpots||=[];y.length=0;for(let e of this.ext.spots)e.visible&&e.intensity>1&&y.push(e);this.snow.update(t,o.position,y,g,n.depth,this.pipe.params.silt),this.bubbles.update(e,g,_*.5);let b=a.active.filter(e=>!e.resolved),x=b.some(e=>e.sev>=3)||n.floodL>60||r.fire.active?2:+!!b.length;this.alarmLevel=x;let S={sub:n,sys:r,ap:i,inc:a,ambient:g,extLight:_,pilot:this.pilot||{surge:0,yaw:0,heave:0},alarmLevel:x,sparkBurst:this._spark||null,trail:this.trail};this._spark=null,this.cockpit.update(e,t,S),this.mfd.update(e,S),this.state===`play`&&(this.hud.update(e),this.audio.update(e,{sub:n,sys:r,inc:a,ap:i,env:this.env,alarmLevel:x,dead:r.dead}));let C=this.pipe.params;this.flash=Math.max(0,this.flash-e*1.5),C.flash=this.flash,C.redAlert=r.powered(`CABIN`)?x>1?.25+.25*Math.sin(t*6):0:.8,C.smoke=r.fire.smoke*.8,C.fog=(r.condensation||0)*.35,this.state===`end`&&r.dead&&(this._endT=(this._endT||0)+e),C.blackout=Math.min(1,Et.clamp((1-r.pilotHealth)*1.1-.35,0,1)+(this._endT?this._endT*.5:0)),C.ca=.012+r.hypoxia*.05+this.shake*.02;let w=Et.clamp(.16/Math.max(.001,this.pipe.avgLum),.45,2.6),T=w<C.exposure?1.2:.14;C.exposure+=(w-C.exposure)*(1-Math.exp(-e*T)),Number.isFinite(C.exposure)||(C.exposure=1),C.vignette=.55+r.hypoxia*.4,C.grain=.035+(n.depth>1e3?.02:0),this.cockpit.scene.environmentIntensity=.025+(r.powered(`CABIN`)?r.lights.cabin*.12:0)}_render(e){this.pipe.render(this.scene,this.cockpit.scene,this.camera,e)}};if(new URLSearchParams(location.search).has(`dbgnan`)){let e=Mr.prototype.computeBoundingSphere;Mr.prototype.computeBoundingSphere=function(){e.call(this),Number.isNaN(this.boundingSphere?.radius)&&console.warn(`NaN-GEO`,this.type,JSON.stringify(this.parameters||{}).slice(0,160),(Error().stack||``).split(`
`).slice(2,7).join(` <- `))}}var Zp=new URLSearchParams(location.search),Qp=document.getElementById(`gl`),$p=document.getElementById(`ui`),em=document.createElement(`div`);em.id=`rotate`,em.innerHTML=`<div class="ph"></div>スマートフォンを横向きにしてください<br><small>LANDSCAPE ONLY</small>`,document.body.appendChild(em);var tm=document.createElement(`div`);tm.className=`screen`,tm.innerHTML=`
  <div class="title">
    <h1>ABYSSAL DESCENT</h1><h2>深 海 潜 航</h2>
    <p class="lead">有人潜水調査船 <b>DSV-11「わだつみ」</b> で、大陸棚から水深 10,925 m のチャレンジャー海淵へ。<br>
    浸水・火災・電源喪失・絡まり… あらゆるトラブルに対処しながら、地球最後のフロンティアを探査せよ。</p>
    <div class="row" id="menu" style="display:none"></div>
    <div class="qsel" id="qsel" style="display:none"></div>
    <div class="spec">TITANIUM Ø2.1 m PRESSURE SPHERE · DESIGN DEPTH 11,000 m · 96 kWh Li-ion · 6 THRUSTERS · VBT 400 L</div>
  </div>
  <div class="load"><span id="ldTxt">起動中…</span><div class="bar"><i id="ldBar"></i></div></div>`,$p.appendChild(tm);var nm=tm.querySelector(`#ldTxt`),rm=tm.querySelector(`#ldBar`),im=tm.querySelector(`#menu`),am=tm.querySelector(`#qsel`),om=()=>$p.classList.toggle(`fsok`,Xp.isFullscreen()||!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen));document.addEventListener(`fullscreenchange`,om),document.addEventListener(`webkitfullscreenchange`,om),om();var sm=new Xp(Qp,$p,Zp);window.__game=sm,tm.addEventListener(`pointerup`,()=>{sm.state!==`play`&&sm.requestFullscreen()});function cm(e,t,n){let r=document.createElement(`button`);return r.className=`hb `+t,r.innerHTML=e,r.addEventListener(`click`,e=>{e.stopPropagation(),n()}),im.appendChild(r),r}function lm(){am.innerHTML=`<span>画質 GRAPHICS</span>`,Fp.forEach((e,t)=>{let n=document.createElement(`button`);n.className=`hb sm`+(sm.quality===t?` on`:``),n.innerHTML=`${e.ja}<small>${e.name}</small>`,n.addEventListener(`click`,e=>{e.stopPropagation(),sm.setQuality(t),lm()}),am.appendChild(n)}),am.style.display=`flex`}function um(){im.innerHTML=``;let e=Xp.hasSave();cm(`潜航開始<small>NEW DIVE</small>`,`primary`,()=>pm(!1)),e&&cm(`続きから<small>CONTINUE · ${Math.round(-e.sub.pos[1])} m</small>`,``,()=>pm(!0)),cm(`操作説明<small>HOW TO PLAY</small>`,``,dm),im.style.display=`flex`,tm.querySelector(`.load`).style.display=`none`,tm.querySelector(`.lead`)&&(tm.querySelector(`.lead`).style.display=``),lm()}function dm(){im.innerHTML=``,am.style.display=`none`;let e=document.createElement(`p`);e.className=`help`,e.innerHTML=`<b>左スティック</b>: 前進/後進・旋回　<b>右スティック</b>: 横移動・上昇/下降　<b>▲▼</b>: 垂直スラスター<br>
    <b>画面中央ドラッグ</b>: 見回す（主観測窓・左右側窓・下部窓）　<b>コックピットをタップ</b>: ボタン・ブレーカー・MFD を直接操作　<b>◎</b>: 視点を正面に戻す<br>
    <b>注水/排水</b>: 可変バラスト(VBT)で浮力調整。潜るには注水、浮上するには排水かウェイト投棄。<br>
    <b>AP</b>: 自動操縦（方位/深度/高度/速力保持・自動潜航・定点保持・目的地へ自動航行・自動浮上・時間加速）<br>
    <b>DC</b>: 異常発生時の対処。浸水の遮断・クランプ・シーラント、ブレーカー復帰、消火、スラスター再起動など。<br>
    深く潜るほど水圧は増し、トラブルは増える。船殻の限界を超えれば一瞬で圧壊する。生きて帰還せよ。`,im.appendChild(e),cm(`戻る`,``,um)}var fm=!1;function pm(e){fm||(fm=!0,tm.classList.add(`hide`),sm.start(e),setTimeout(()=>{tm.classList.contains(`hide`)&&(tm.style.display=`none`)},700))}sm.onEnd=(e,t,n)=>{let r=t.time,i=`${Math.floor(r/3600)}:${String(Math.floor(r/60)%60).padStart(2,`0`)}:${String(Math.floor(r)%60).padStart(2,`0`)}`,a=e===`surface`;setTimeout(()=>{tm.style.display=``,tm.className=`screen`+(a?``:` over`),tm.innerHTML=`<div class="title">
      <h1>${a?`浮上・回収成功`:`LOST AT SEA`}</h1><h2>${a?`RECOVERED`:n?.[1]||``}</h2>
      ${a?`<p>わだつみは無事に浮上し、母船に回収された。</p>`:`<p><b>${n?.[0]||``}</b> — ${n?.[2]||``}</p>`}
      <div class="stats">潜航時間 ${i}　最大深度 ${Math.round(t.maxDepth).toLocaleString()} m　航走距離 ${Math.round(t.dist).toLocaleString()} m<br>
      発見生物 ${t.species}/${t.speciesTotal}　調査地点 ${t.pois}/${t.poisTotal}　試料 ${t.samples}　発生トラブル ${t.incidents}</div>
      <div class="row"><button class="hb primary" id="again">もう一度潜る<small>DIVE AGAIN</small></button></div></div>`,tm.querySelector(`#again`).addEventListener(`pointerdown`,e=>e.stopPropagation()),tm.querySelector(`#again`).addEventListener(`click`,()=>location.reload())},a?800:2600)},sm.boot((e,t)=>{rm.style.width=`${Math.round(e*100)}%`,nm.textContent=t}).then(()=>{Zp.has(`autostart`)?pm(Zp.get(`autostart`)===`save`):um()}).catch(e=>{console.error(e),nm.textContent=`起動エラー: `+(e?.message||e)+` — 画質を下げて再読込します`;try{sm.quality>0&&(localStorage.setItem(`ad-quality-v2`,`0`),setTimeout(()=>location.reload(),2500))}catch{}}),addEventListener(`unhandledrejection`,e=>console.warn(`unhandled`,e.reason));