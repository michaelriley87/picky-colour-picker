import{Z as m,_ as F,$ as K,a0 as I,a1 as k,k as o,a2 as c,a3 as P,a4 as D,B as z,a5 as H,a6 as V,G as J,b as Q,h as q,O as W,E as X,a7 as p,a8 as ee,N as ae,M as Y,a9 as U,a as j,aa as C,c as re,ab as te,ac as ne,i as B,D as ie,ad as fe,ae as se,m as G,af as ue,ag as le,ah as de,ai as ve,aj as _e,p as ce,ak as be,al as ge,am as he,an as ye}from"./CMW4z_Ar.js";function w(a,l=null,b){if(typeof a!="object"||a===null||m in a)return a;const v=V(a);if(v!==F&&v!==K)return a;var n=new Map,s=J(a),g=I(0);s&&n.set("length",I(a.length));var y;return new Proxy(a,{defineProperty(f,e,r){(!("value"in r)||r.configurable===!1||r.enumerable===!1||r.writable===!1)&&H();var i=n.get(e);return i===void 0?(i=I(r.value),n.set(e,i)):P(i,w(r.value,y)),!0},deleteProperty(f,e){var r=n.get(e);if(r===void 0)e in f&&n.set(e,I(c));else{if(s&&typeof e=="string"){var i=n.get("length"),t=Number(e);Number.isInteger(t)&&t<i.v&&P(i,t)}P(r,c),Z(g)}return!0},get(f,e,r){var _;if(e===m)return a;var i=n.get(e),t=e in f;if(i===void 0&&(!t||(_=D(f,e))!=null&&_.writable)&&(i=I(w(t?f[e]:c,y)),n.set(e,i)),i!==void 0){var u=o(i);return u===c?void 0:u}return Reflect.get(f,e,r)},getOwnPropertyDescriptor(f,e){var r=Reflect.getOwnPropertyDescriptor(f,e);if(r&&"value"in r){var i=n.get(e);i&&(r.value=o(i))}else if(r===void 0){var t=n.get(e),u=t==null?void 0:t.v;if(t!==void 0&&u!==c)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return r},has(f,e){var u;if(e===m)return!0;var r=n.get(e),i=r!==void 0&&r.v!==c||Reflect.has(f,e);if(r!==void 0||z!==null&&(!i||(u=D(f,e))!=null&&u.writable)){r===void 0&&(r=I(i?w(f[e],y):c),n.set(e,r));var t=o(r);if(t===c)return!1}return i},set(f,e,r,i){var S;var t=n.get(e),u=e in f;if(s&&e==="length")for(var _=r;_<t.v;_+=1){var R=n.get(_+"");R!==void 0?P(R,c):_ in f&&(R=I(c),n.set(_+"",R))}t===void 0?(!u||(S=D(f,e))!=null&&S.writable)&&(t=I(void 0),P(t,w(r,y)),n.set(e,t)):(u=t.v!==c,P(t,w(r,y)));var h=Reflect.getOwnPropertyDescriptor(f,e);if(h!=null&&h.set&&h.set.call(i,r),!u){if(s&&typeof e=="string"){var O=n.get("length"),A=Number(e);Number.isInteger(A)&&A>=O.v&&P(O,A+1)}Z(g)}return!0},ownKeys(f){o(g);var e=Reflect.ownKeys(f).filter(t=>{var u=n.get(t);return u===void 0||u.v!==c});for(var[r,i]of n)i.v!==c&&!(r in f)&&e.push(r);return e},setPrototypeOf(){k()}})}function Z(a,l=1){P(a,a.v+l)}function Ie(a,l,b=!1){q&&W();var v=a,n=null,s=null,g=c,y=b?X:0,f=!1;const e=(i,t=!0)=>{f=!0,r(t,i)},r=(i,t)=>{if(g===(g=i))return;let u=!1;if(q){const _=v.data===p;!!g===_&&(v=ee(),ae(v),Y(!1),u=!0)}g?(n?U(n):t&&(n=j(()=>t(v))),s&&C(s,()=>{s=null})):(s?U(s):t&&(s=j(()=>t(v))),n&&C(n,()=>{n=null})),u&&Y(!0)};Q(()=>{f=!1,l(e),f||r(null,null)},y),q&&(v=re)}function $(a,l){return a===l||(a==null?void 0:a[m])===l}function Re(a={},l,b,v){return te(()=>{var n,s;return ne(()=>{n=s,s=[],B(()=>{a!==b(...s)&&(l(a,...s),n&&$(b(...n),a)&&l(null,...n))})}),()=>{ie(()=>{s&&$(b(...s),a)&&l(null,...s)})}}),a}let T=!1;function Pe(a){var l=T;try{return T=!1,[a(),T]}finally{T=l}}function Se(a,l,b,v){var M;var n=(b&ge)!==0,s=!ce||(b&be)!==0,g=(b&ve)!==0,y=(b&ye)!==0,f=!1,e;g?[e,f]=Pe(()=>a[l]):e=a[l];var r=m in a||_e in a,i=g&&(((M=D(a,l))==null?void 0:M.set)??(r&&l in a&&(d=>a[l]=d)))||void 0,t=v,u=!0,_=!1,R=()=>(_=!0,u&&(u=!1,y?t=B(v):t=v),t);e===void 0&&v!==void 0&&(i&&s&&fe(),e=R(),i&&i(e));var h;if(s)h=()=>{var d=a[l];return d===void 0?R():(u=!0,_=!1,d)};else{var O=(n?G:ue)(()=>a[l]);O.f|=se,h=()=>{var d=o(O);return d!==void 0&&(t=void 0),d===void 0?t:d}}if(!(b&le))return h;if(i){var A=a.$$legacy;return function(d,E){return arguments.length>0?((!s||!E||A||f)&&i(E?h():d),d):h()}}var S=!1,L=he(e),N=G(()=>{var d=h(),E=o(L);return S?(S=!1,E):L.v=d});return n||(N.equals=de),function(d,E){if(arguments.length>0){const x=E?o(N):s&&g?w(d):d;return N.equals(x)||(S=!0,P(L,x),_&&t!==void 0&&(t=x),B(()=>o(N))),d}return o(N)}}export{w as a,Re as b,Ie as i,Se as p};
