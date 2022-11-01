import{r as R,Y as Vt,Z as Pe,a9 as ue,aa as pe,X as It,a0 as $e,j as $,a2 as vt,a4 as Yt,ab as _,R as Xt,ac as zt,ad as ht,ae as Te,af as gt,ag as M,ah as D,ai as W,aj as U,ak as Me,al as ce,am as _e,an as We,ao as qt,ap as mt,aq as Gt}from"./iframe.edffd48e.js";import{r as Zt}from"./index.14b66297.js";var et,tt;function Jt(t,e){return er(t)||_t(t,e)||Qt(t,e)||Kt()}function Kt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Qt(t,e){if(!!t){if(typeof t=="string")return rt(t,e);var o=Object.prototype.toString.call(t).slice(8,-1);if(o==="Object"&&t.constructor&&(o=t.constructor.name),o==="Map"||o==="Set")return Array.from(t);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return rt(t,e)}}function rt(t,e){(e==null||e>t.length)&&(e=t.length);for(var o=0,r=new Array(e);o<e;o++)r[o]=t[o];return r}function _t(t,e){var o=t==null?null:typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"];if(o!=null){var r=[],n=!0,i=!1,s,a;try{for(o=o.call(t);!(n=(s=o.next()).done)&&(r.push(s.value),!(e&&r.length===e));n=!0);}catch(l){i=!0,a=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw a}}return r}}function er(t){if(Array.isArray(t))return t}function yt(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function Re(t){return Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Re(t)}function I(t){return t?(t.nodeName||"").toLowerCase():null}function F(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function oe(t){var e=F(t).Element;return t instanceof e||t instanceof Element}function L(t){var e=F(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function wt(t){if(typeof ShadowRoot=="undefined")return!1;var e=F(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function tr(t){var e=t.state;Object.keys(e.elements).forEach(function(o){var r=e.styles[o]||{},n=e.attributes[o]||{},i=e.elements[o];!L(i)||!I(i)||(Object.assign(i.style,r),Object.keys(n).forEach(function(s){var a=n[s];a===!1?i.removeAttribute(s):i.setAttribute(s,a===!0?"":a)}))})}function rr(t){var e=t.state,o={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,o.popper),e.styles=o,e.elements.arrow&&Object.assign(e.elements.arrow.style,o.arrow),function(){Object.keys(e.elements).forEach(function(r){var n=e.elements[r],i=e.attributes[r]||{},s=Object.keys(e.styles.hasOwnProperty(r)?e.styles[r]:o[r]),a=s.reduce(function(l,u){return l[u]="",l},{});!L(n)||!I(n)||(Object.assign(n.style,a),Object.keys(i).forEach(function(l){n.removeAttribute(l)}))})}}var or={name:"applyStyles",enabled:!0,phase:"write",fn:tr,effect:rr,requires:["computeStyles"]};function V(t){return t.split("-")[0]}var ee=Math.max,Ce=Math.min,ne=Math.round;function ie(t,e){e===void 0&&(e=!1);var o=t.getBoundingClientRect(),r=1,n=1;if(L(t)&&e){var i=t.offsetHeight,s=t.offsetWidth;s>0&&(r=ne(o.width)/s||1),i>0&&(n=ne(o.height)/i||1)}return{width:o.width/r,height:o.height/n,top:o.top/n,right:o.right/r,bottom:o.bottom/n,left:o.left/r,x:o.left/r,y:o.top/n}}function Ue(t){var e=ie(t),o=t.offsetWidth,r=t.offsetHeight;return Math.abs(e.width-o)<=1&&(o=e.width),Math.abs(e.height-r)<=1&&(r=e.height),{x:t.offsetLeft,y:t.offsetTop,width:o,height:r}}function bt(t,e){var o=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(o&&wt(o)){var r=e;do{if(r&&t.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function Y(t){return F(t).getComputedStyle(t)}function nr(t){return["table","td","th"].indexOf(I(t))>=0}function Z(t){return((oe(t)?t.ownerDocument:t.document)||window.document).documentElement}function Se(t){return I(t)==="html"?t:t.assignedSlot||t.parentNode||(wt(t)?t.host:null)||Z(t)}function ot(t){return!L(t)||Y(t).position==="fixed"?null:t.offsetParent}function ir(t){var e=navigator.userAgent.toLowerCase().indexOf("firefox")!==-1,o=navigator.userAgent.indexOf("Trident")!==-1;if(o&&L(t)){var r=Y(t);if(r.position==="fixed")return null}for(var n=Se(t);L(n)&&["html","body"].indexOf(I(n))<0;){var i=Y(n);if(i.transform!=="none"||i.perspective!=="none"||i.contain==="paint"||["transform","perspective"].indexOf(i.willChange)!==-1||e&&i.willChange==="filter"||e&&i.filter&&i.filter!=="none")return n;n=n.parentNode}return null}function he(t){for(var e=F(t),o=ot(t);o&&nr(o)&&Y(o).position==="static";)o=ot(o);return o&&(I(o)==="html"||I(o)==="body"&&Y(o).position==="static")?e:o||ir(t)||e}function Fe(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function fe(t,e,o){return ee(t,Ce(e,o))}function ar(t,e,o){var r=fe(t,e,o);return r>o?o:r}function Ot(){return{top:0,right:0,bottom:0,left:0}}function xt(t){return Object.assign({},Ot(),t)}function Tt(t,e){return e.reduce(function(o,r){return o[r]=t,o},{})}var sr=function(e,o){return e=typeof e=="function"?e(Object.assign({},o.rects,{placement:o.placement})):e,xt(typeof e!="number"?e:Tt(e,We))};function lr(t){var e,o=t.state,r=t.name,n=t.options,i=o.elements.arrow,s=o.modifiersData.popperOffsets,a=V(o.placement),l=Fe(a),u=[D,U].indexOf(a)>=0,c=u?"height":"width";if(!(!i||!s)){var d=sr(n.padding,o),m=Ue(i),p=l==="y"?M:D,v=l==="y"?W:U,h=o.rects.reference[c]+o.rects.reference[l]-s[l]-o.rects.popper[c],g=s[l]-o.rects.reference[l],O=he(i),T=O?l==="y"?O.clientHeight||0:O.clientWidth||0:0,y=h/2-g/2,f=d[p],w=T-m[c]-d[v],b=T/2-m[c]/2+y,x=fe(f,b,w),C=l;o.modifiersData[r]=(e={},e[C]=x,e.centerOffset=x-b,e)}}function cr(t){var e=t.state,o=t.options,r=o.element,n=r===void 0?"[data-popper-arrow]":r;n!=null&&(typeof n=="string"&&(n=e.elements.popper.querySelector(n),!n)||!bt(e.elements.popper,n)||(e.elements.arrow=n))}var ur={name:"arrow",enabled:!0,phase:"main",fn:lr,effect:cr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ae(t){return t.split("-")[1]}var pr={top:"auto",right:"auto",bottom:"auto",left:"auto"};function fr(t){var e=t.x,o=t.y,r=window,n=r.devicePixelRatio||1;return{x:ne(e*n)/n||0,y:ne(o*n)/n||0}}function nt(t){var e,o=t.popper,r=t.popperRect,n=t.placement,i=t.variation,s=t.offsets,a=t.position,l=t.gpuAcceleration,u=t.adaptive,c=t.roundOffsets,d=t.isFixed,m=s.x,p=m===void 0?0:m,v=s.y,h=v===void 0?0:v,g=typeof c=="function"?c({x:p,y:h}):{x:p,y:h};p=g.x,h=g.y;var O=s.hasOwnProperty("x"),T=s.hasOwnProperty("y"),y=D,f=M,w=window;if(u){var b=he(o),x="clientHeight",C="clientWidth";if(b===F(o)&&(b=Z(o),Y(b).position!=="static"&&a==="absolute"&&(x="scrollHeight",C="scrollWidth")),b=b,n===M||(n===D||n===U)&&i===Me){f=W;var E=d&&w.visualViewport?w.visualViewport.height:b[x];h-=E-r.height,h*=l?1:-1}if(n===D||(n===M||n===W)&&i===Me){y=U;var S=d&&w.visualViewport?w.visualViewport.width:b[C];p-=S-r.width,p*=l?1:-1}}var P=Object.assign({position:a},u&&pr),B=c===!0?fr({x:p,y:h}):{x:p,y:h};if(p=B.x,h=B.y,l){var A;return Object.assign({},P,(A={},A[f]=T?"0":"",A[y]=O?"0":"",A.transform=(w.devicePixelRatio||1)<=1?"translate("+p+"px, "+h+"px)":"translate3d("+p+"px, "+h+"px, 0)",A))}return Object.assign({},P,(e={},e[f]=T?h+"px":"",e[y]=O?p+"px":"",e.transform="",e))}function dr(t){var e=t.state,o=t.options,r=o.gpuAcceleration,n=r===void 0?!0:r,i=o.adaptive,s=i===void 0?!0:i,a=o.roundOffsets,l=a===void 0?!0:a,u={placement:V(e.placement),variation:ae(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:n,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,nt(Object.assign({},u,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:l})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,nt(Object.assign({},u,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}var vr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:dr,data:{}},be={passive:!0};function hr(t){var e=t.state,o=t.instance,r=t.options,n=r.scroll,i=n===void 0?!0:n,s=r.resize,a=s===void 0?!0:s,l=F(e.elements.popper),u=[].concat(e.scrollParents.reference,e.scrollParents.popper);return i&&u.forEach(function(c){c.addEventListener("scroll",o.update,be)}),a&&l.addEventListener("resize",o.update,be),function(){i&&u.forEach(function(c){c.removeEventListener("scroll",o.update,be)}),a&&l.removeEventListener("resize",o.update,be)}}var gr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:hr,data:{}},mr={left:"right",right:"left",bottom:"top",top:"bottom"};function Oe(t){return t.replace(/left|right|bottom|top/g,function(e){return mr[e]})}var yr={start:"end",end:"start"};function it(t){return t.replace(/start|end/g,function(e){return yr[e]})}function Ne(t){var e=F(t),o=e.pageXOffset,r=e.pageYOffset;return{scrollLeft:o,scrollTop:r}}function Ve(t){return ie(Z(t)).left+Ne(t).scrollLeft}function wr(t){var e=F(t),o=Z(t),r=e.visualViewport,n=o.clientWidth,i=o.clientHeight,s=0,a=0;return r&&(n=r.width,i=r.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=r.offsetLeft,a=r.offsetTop)),{width:n,height:i,x:s+Ve(t),y:a}}function br(t){var e,o=Z(t),r=Ne(t),n=(e=t.ownerDocument)==null?void 0:e.body,i=ee(o.scrollWidth,o.clientWidth,n?n.scrollWidth:0,n?n.clientWidth:0),s=ee(o.scrollHeight,o.clientHeight,n?n.scrollHeight:0,n?n.clientHeight:0),a=-r.scrollLeft+Ve(t),l=-r.scrollTop;return Y(n||o).direction==="rtl"&&(a+=ee(o.clientWidth,n?n.clientWidth:0)-i),{width:i,height:s,x:a,y:l}}function Ie(t){var e=Y(t),o=e.overflow,r=e.overflowX,n=e.overflowY;return/auto|scroll|overlay|hidden/.test(o+n+r)}function Rt(t){return["html","body","#document"].indexOf(I(t))>=0?t.ownerDocument.body:L(t)&&Ie(t)?t:Rt(Se(t))}function de(t,e){var o;e===void 0&&(e=[]);var r=Rt(t),n=r===((o=t.ownerDocument)==null?void 0:o.body),i=F(r),s=n?[i].concat(i.visualViewport||[],Ie(r)?r:[]):r,a=e.concat(s);return n?a:a.concat(de(Se(s)))}function De(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Or(t){var e=ie(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}function at(t,e){return e===mt?De(wr(t)):oe(e)?Or(e):De(br(Z(t)))}function xr(t){var e=de(Se(t)),o=["absolute","fixed"].indexOf(Y(t).position)>=0,r=o&&L(t)?he(t):t;return oe(r)?e.filter(function(n){return oe(n)&&bt(n,r)&&I(n)!=="body"}):[]}function Tr(t,e,o){var r=e==="clippingParents"?xr(t):[].concat(e),n=[].concat(r,[o]),i=n[0],s=n.reduce(function(a,l){var u=at(t,l);return a.top=ee(u.top,a.top),a.right=Ce(u.right,a.right),a.bottom=Ce(u.bottom,a.bottom),a.left=ee(u.left,a.left),a},at(t,i));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Ct(t){var e=t.reference,o=t.element,r=t.placement,n=r?V(r):null,i=r?ae(r):null,s=e.x+e.width/2-o.width/2,a=e.y+e.height/2-o.height/2,l;switch(n){case M:l={x:s,y:e.y-o.height};break;case W:l={x:s,y:e.y+e.height};break;case U:l={x:e.x+e.width,y:a};break;case D:l={x:e.x-o.width,y:a};break;default:l={x:e.x,y:e.y}}var u=n?Fe(n):null;if(u!=null){var c=u==="y"?"height":"width";switch(i){case Te:l[u]=l[u]-(e[c]/2-o[c]/2);break;case Me:l[u]=l[u]+(e[c]/2-o[c]/2);break}}return l}function ve(t,e){e===void 0&&(e={});var o=e,r=o.placement,n=r===void 0?t.placement:r,i=o.boundary,s=i===void 0?Gt:i,a=o.rootBoundary,l=a===void 0?mt:a,u=o.elementContext,c=u===void 0?ce:u,d=o.altBoundary,m=d===void 0?!1:d,p=o.padding,v=p===void 0?0:p,h=xt(typeof v!="number"?v:Tt(v,We)),g=c===ce?qt:ce,O=t.rects.popper,T=t.elements[m?g:c],y=Tr(oe(T)?T:T.contextElement||Z(t.elements.popper),s,l),f=ie(t.elements.reference),w=Ct({reference:f,element:O,strategy:"absolute",placement:n}),b=De(Object.assign({},O,w)),x=c===ce?b:f,C={top:y.top-x.top+h.top,bottom:x.bottom-y.bottom+h.bottom,left:y.left-x.left+h.left,right:x.right-y.right+h.right},E=t.modifiersData.offset;if(c===ce&&E){var S=E[n];Object.keys(C).forEach(function(P){var B=[U,W].indexOf(P)>=0?1:-1,A=[M,W].indexOf(P)>=0?"y":"x";C[P]+=S[A]*B})}return C}function Rr(t,e){e===void 0&&(e={});var o=e,r=o.placement,n=o.boundary,i=o.rootBoundary,s=o.padding,a=o.flipVariations,l=o.allowedAutoPlacements,u=l===void 0?gt:l,c=ae(r),d=c?a?_e:_e.filter(function(v){return ae(v)===c}):We,m=d.filter(function(v){return u.indexOf(v)>=0});m.length===0&&(m=d);var p=m.reduce(function(v,h){return v[h]=ve(t,{placement:h,boundary:n,rootBoundary:i,padding:s})[V(h)],v},{});return Object.keys(p).sort(function(v,h){return p[v]-p[h]})}function Cr(t){if(V(t)===ht)return[];var e=Oe(t);return[it(t),e,it(e)]}function Pr(t){var e=t.state,o=t.options,r=t.name;if(!e.modifiersData[r]._skip){for(var n=o.mainAxis,i=n===void 0?!0:n,s=o.altAxis,a=s===void 0?!0:s,l=o.fallbackPlacements,u=o.padding,c=o.boundary,d=o.rootBoundary,m=o.altBoundary,p=o.flipVariations,v=p===void 0?!0:p,h=o.allowedAutoPlacements,g=e.options.placement,O=V(g),T=O===g,y=l||(T||!v?[Oe(g)]:Cr(g)),f=[g].concat(y).reduce(function(re,q){return re.concat(V(q)===ht?Rr(e,{placement:q,boundary:c,rootBoundary:d,padding:u,flipVariations:v,allowedAutoPlacements:h}):q)},[]),w=e.rects.reference,b=e.rects.popper,x=new Map,C=!0,E=f[0],S=0;S<f.length;S++){var P=f[S],B=V(P),A=ae(P)===Te,X=[M,W].indexOf(B)>=0,z=X?"width":"height",k=ve(e,{placement:P,boundary:c,rootBoundary:d,altBoundary:m,padding:u}),j=X?A?U:D:A?W:M;w[z]>b[z]&&(j=Oe(j));var te=Oe(j),J=[];if(i&&J.push(k[B]<=0),a&&J.push(k[j]<=0,k[te]<=0),J.every(function(re){return re})){E=P,C=!1;break}x.set(P,J)}if(C)for(var ge=v?3:1,Ee=function(q){var le=f.find(function(ye){var K=x.get(ye);if(K)return K.slice(0,q).every(function(Ae){return Ae})});if(le)return E=le,"break"},se=ge;se>0;se--){var me=Ee(se);if(me==="break")break}e.placement!==E&&(e.modifiersData[r]._skip=!0,e.placement=E,e.reset=!0)}}var Sr={name:"flip",enabled:!0,phase:"main",fn:Pr,requiresIfExists:["offset"],data:{_skip:!1}};function st(t,e,o){return o===void 0&&(o={x:0,y:0}),{top:t.top-e.height-o.y,right:t.right-e.width+o.x,bottom:t.bottom-e.height+o.y,left:t.left-e.width-o.x}}function lt(t){return[M,U,W,D].some(function(e){return t[e]>=0})}function Er(t){var e=t.state,o=t.name,r=e.rects.reference,n=e.rects.popper,i=e.modifiersData.preventOverflow,s=ve(e,{elementContext:"reference"}),a=ve(e,{altBoundary:!0}),l=st(s,r),u=st(a,n,i),c=lt(l),d=lt(u);e.modifiersData[o]={referenceClippingOffsets:l,popperEscapeOffsets:u,isReferenceHidden:c,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":c,"data-popper-escaped":d})}var Ar={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Er};function kr(t,e,o){var r=V(t),n=[D,M].indexOf(r)>=0?-1:1,i=typeof o=="function"?o(Object.assign({},e,{placement:t})):o,s=i[0],a=i[1];return s=s||0,a=(a||0)*n,[D,U].indexOf(r)>=0?{x:a,y:s}:{x:s,y:a}}function Br(t){var e=t.state,o=t.options,r=t.name,n=o.offset,i=n===void 0?[0,0]:n,s=gt.reduce(function(c,d){return c[d]=kr(d,e.rects,i),c},{}),a=s[e.placement],l=a.x,u=a.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=u),e.modifiersData[r]=s}var jr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Br};function Mr(t){var e=t.state,o=t.name;e.modifiersData[o]=Ct({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}var Dr={name:"popperOffsets",enabled:!0,phase:"read",fn:Mr,data:{}};function Hr(t){return t==="x"?"y":"x"}function Lr(t){var e=t.state,o=t.options,r=t.name,n=o.mainAxis,i=n===void 0?!0:n,s=o.altAxis,a=s===void 0?!1:s,l=o.boundary,u=o.rootBoundary,c=o.altBoundary,d=o.padding,m=o.tether,p=m===void 0?!0:m,v=o.tetherOffset,h=v===void 0?0:v,g=ve(e,{boundary:l,rootBoundary:u,padding:d,altBoundary:c}),O=V(e.placement),T=ae(e.placement),y=!T,f=Fe(O),w=Hr(f),b=e.modifiersData.popperOffsets,x=e.rects.reference,C=e.rects.popper,E=typeof h=="function"?h(Object.assign({},e.rects,{placement:e.placement})):h,S=typeof E=="number"?{mainAxis:E,altAxis:E}:Object.assign({mainAxis:0,altAxis:0},E),P=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,B={x:0,y:0};if(!!b){if(i){var A,X=f==="y"?M:D,z=f==="y"?W:U,k=f==="y"?"height":"width",j=b[f],te=j+g[X],J=j-g[z],ge=p?-C[k]/2:0,Ee=T===Te?x[k]:C[k],se=T===Te?-C[k]:-x[k],me=e.elements.arrow,re=p&&me?Ue(me):{width:0,height:0},q=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:Ot(),le=q[X],ye=q[z],K=fe(0,x[k],re[k]),Ae=y?x[k]/2-ge-K-le-S.mainAxis:Ee-K-le-S.mainAxis,Lt=y?-x[k]/2+ge+K+ye+S.mainAxis:se+K+ye+S.mainAxis,ke=e.elements.arrow&&he(e.elements.arrow),$t=ke?f==="y"?ke.clientTop||0:ke.clientLeft||0:0,Ye=(A=P==null?void 0:P[f])!=null?A:0,Wt=j+Ae-Ye-$t,Ut=j+Lt-Ye,Xe=fe(p?Ce(te,Wt):te,j,p?ee(J,Ut):J);b[f]=Xe,B[f]=Xe-j}if(a){var ze,Ft=f==="x"?M:D,Nt=f==="x"?W:U,Q=b[w],we=w==="y"?"height":"width",qe=Q+g[Ft],Ge=Q-g[Nt],Be=[M,D].indexOf(O)!==-1,Ze=(ze=P==null?void 0:P[w])!=null?ze:0,Je=Be?qe:Q-x[we]-C[we]-Ze+S.altAxis,Ke=Be?Q+x[we]+C[we]-Ze-S.altAxis:Ge,Qe=p&&Be?ar(Je,Q,Ke):fe(p?Je:qe,Q,p?Ke:Ge);b[w]=Qe,B[w]=Qe-Q}e.modifiersData[r]=B}}var $r={name:"preventOverflow",enabled:!0,phase:"main",fn:Lr,requiresIfExists:["offset"]};function Wr(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function Ur(t){return t===F(t)||!L(t)?Ne(t):Wr(t)}function Fr(t){var e=t.getBoundingClientRect(),o=ne(e.width)/t.offsetWidth||1,r=ne(e.height)/t.offsetHeight||1;return o!==1||r!==1}function Nr(t,e,o){o===void 0&&(o=!1);var r=L(e),n=L(e)&&Fr(e),i=Z(e),s=ie(t,n),a={scrollLeft:0,scrollTop:0},l={x:0,y:0};return(r||!r&&!o)&&((I(e)!=="body"||Ie(i))&&(a=Ur(e)),L(e)?(l=ie(e,!0),l.x+=e.clientLeft,l.y+=e.clientTop):i&&(l.x=Ve(i))),{x:s.left+a.scrollLeft-l.x,y:s.top+a.scrollTop-l.y,width:s.width,height:s.height}}function Vr(t){var e=new Map,o=new Set,r=[];t.forEach(function(i){e.set(i.name,i)});function n(i){o.add(i.name);var s=[].concat(i.requires||[],i.requiresIfExists||[]);s.forEach(function(a){if(!o.has(a)){var l=e.get(a);l&&n(l)}}),r.push(i)}return t.forEach(function(i){o.has(i.name)||n(i)}),r}function Ir(t){var e=Vr(t);return zt.reduce(function(o,r){return o.concat(e.filter(function(n){return n.phase===r}))},[])}function Yr(t){var e;return function(){return e||(e=new Promise(function(o){Promise.resolve().then(function(){e=void 0,o(t())})})),e}}function Xr(t){var e=t.reduce(function(o,r){var n=o[r.name];return o[r.name]=n?Object.assign({},n,r,{options:Object.assign({},n.options,r.options),data:Object.assign({},n.data,r.data)}):r,o},{});return Object.keys(e).map(function(o){return e[o]})}var ct={placement:"bottom",modifiers:[],strategy:"absolute"};function ut(){for(var t=arguments.length,e=new Array(t),o=0;o<t;o++)e[o]=arguments[o];return!e.some(function(r){return!(r&&typeof r.getBoundingClientRect=="function")})}function zr(t){t===void 0&&(t={});var e=t,o=e.defaultModifiers,r=o===void 0?[]:o,n=e.defaultOptions,i=n===void 0?ct:n;return function(a,l,u){u===void 0&&(u=i);var c={placement:"bottom",orderedModifiers:[],options:Object.assign({},ct,i),modifiersData:{},elements:{reference:a,popper:l},attributes:{},styles:{}},d=[],m=!1,p={state:c,setOptions:function(O){var T=typeof O=="function"?O(c.options):O;h(),c.options=Object.assign({},i,c.options,T),c.scrollParents={reference:oe(a)?de(a):a.contextElement?de(a.contextElement):[],popper:de(l)};var y=Ir(Xr([].concat(r,c.options.modifiers)));return c.orderedModifiers=y.filter(function(f){return f.enabled}),v(),p.update()},forceUpdate:function(){if(!m){var O=c.elements,T=O.reference,y=O.popper;if(!!ut(T,y)){c.rects={reference:Nr(T,he(y),c.options.strategy==="fixed"),popper:Ue(y)},c.reset=!1,c.placement=c.options.placement,c.orderedModifiers.forEach(function(S){return c.modifiersData[S.name]=Object.assign({},S.data)});for(var f=0;f<c.orderedModifiers.length;f++){if(c.reset===!0){c.reset=!1,f=-1;continue}var w=c.orderedModifiers[f],b=w.fn,x=w.options,C=x===void 0?{}:x,E=w.name;typeof b=="function"&&(c=b({state:c,options:C,name:E,instance:p})||c)}}}},update:Yr(function(){return new Promise(function(g){p.forceUpdate(),g(c)})}),destroy:function(){h(),m=!0}};if(!ut(a,l))return p;p.setOptions(u).then(function(g){!m&&u.onFirstUpdate&&u.onFirstUpdate(g)});function v(){c.orderedModifiers.forEach(function(g){var O=g.name,T=g.options,y=T===void 0?{}:T,f=g.effect;if(typeof f=="function"){var w=f({state:c,name:O,instance:p,options:y}),b=function(){};d.push(w||b)}})}function h(){d.forEach(function(g){return g()}),d=[]}return p}}var qr=[gr,Dr,vr,or,jr,Sr,$r,ur,Ar],Gr=zr({defaultModifiers:qr});function He(t,e){return He=Object.setPrototypeOf||function(r,n){return r.__proto__=n,r},He(t,e)}function Pt(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,He(t,e)}var St=R.exports.createContext(),Et=R.exports.createContext();function Zr(t){var e=t.children,o=R.exports.useState(null),r=o[0],n=o[1],i=R.exports.useRef(!1);R.exports.useEffect(function(){return function(){i.current=!0}},[]);var s=R.exports.useCallback(function(a){i.current||n(a)},[]);return $(St.Provider,{value:r,children:$(Et.Provider,{value:s,children:e})})}var At=function(e){return Array.isArray(e)?e[0]:e},kt=function(e){if(typeof e=="function"){for(var o=arguments.length,r=new Array(o>1?o-1:0),n=1;n<o;n++)r[n-1]=arguments[n];return e.apply(void 0,r)}},Le=function(e,o){if(typeof e=="function")return kt(e,o);e!=null&&(e.current=o)},pt=function(e){return e.reduce(function(o,r){var n=r[0],i=r[1];return o[n]=i,o},{})},ft=typeof window!="undefined"&&window.document&&window.document.createElement?R.exports.useLayoutEffect:R.exports.useEffect,Jr=typeof Element!="undefined",Kr=typeof Map=="function",Qr=typeof Set=="function",_r=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function xe(t,e){if(t===e)return!0;if(t&&e&&Re(t)=="object"&&Re(e)=="object"){if(t.constructor!==e.constructor)return!1;var o,r,n;if(Array.isArray(t)){if(o=t.length,o!=e.length)return!1;for(r=o;r--!==0;)if(!xe(t[r],e[r]))return!1;return!0}var i;if(Kr&&t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(i=t.entries();!(r=i.next()).done;)if(!e.has(r.value[0]))return!1;for(i=t.entries();!(r=i.next()).done;)if(!xe(r.value[1],e.get(r.value[0])))return!1;return!0}if(Qr&&t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(i=t.entries();!(r=i.next()).done;)if(!e.has(r.value[0]))return!1;return!0}if(_r&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(o=t.length,o!=e.length)return!1;for(r=o;r--!==0;)if(t[r]!==e[r])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();if(n=Object.keys(t),o=n.length,o!==Object.keys(e).length)return!1;for(r=o;r--!==0;)if(!Object.prototype.hasOwnProperty.call(e,n[r]))return!1;if(Jr&&t instanceof Element)return!1;for(r=o;r--!==0;)if(!((n[r]==="_owner"||n[r]==="__v"||n[r]==="__o")&&t.$$typeof)&&!xe(t[n[r]],e[n[r]]))return!1;return!0}return t!==t&&e!==e}var eo=function(e,o){try{return xe(e,o)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}},to=[],ro=function(e,o,r){r===void 0&&(r={});var n=R.exports.useRef(null),i={onFirstUpdate:r.onFirstUpdate,placement:r.placement||"bottom",strategy:r.strategy||"absolute",modifiers:r.modifiers||to},s=R.exports.useState({styles:{popper:{position:i.strategy,left:"0",top:"0"},arrow:{position:"absolute"}},attributes:{}}),a=s[0],l=s[1],u=R.exports.useMemo(function(){return{name:"updateState",enabled:!0,phase:"write",fn:function(p){var v=p.state,h=Object.keys(v.elements);l({styles:pt(h.map(function(g){return[g,v.styles[g]||{}]})),attributes:pt(h.map(function(g){return[g,v.attributes[g]]}))})},requires:["computeStyles"]}},[]),c=R.exports.useMemo(function(){var m={onFirstUpdate:i.onFirstUpdate,placement:i.placement,strategy:i.strategy,modifiers:[].concat(i.modifiers,[u,{name:"applyStyles",enabled:!1}])};return eo(n.current,m)?n.current||m:(n.current=m,m)},[i.onFirstUpdate,i.placement,i.strategy,i.modifiers,u]),d=R.exports.useRef();return ft(function(){d.current&&d.current.setOptions(c)},[c]),ft(function(){if(!(e==null||o==null)){var m=r.createPopper||Gr,p=m(e,o,c);return d.current=p,function(){p.destroy(),d.current=null}}},[e,o,r.createPopper]),{state:d.current?d.current.state:null,styles:a.styles,attributes:a.attributes,update:d.current?d.current.update:null,forceUpdate:d.current?d.current.forceUpdate:null}},oo=function(){},no=function(){return Promise.resolve(null)},io=[];function ao(t){var e=t.placement,o=e===void 0?"bottom":e,r=t.strategy,n=r===void 0?"absolute":r,i=t.modifiers,s=i===void 0?io:i,a=t.referenceElement,l=t.onFirstUpdate,u=t.innerRef,c=t.children,d=R.exports.useContext(St),m=R.exports.useState(null),p=m[0],v=m[1],h=R.exports.useState(null),g=h[0],O=h[1];R.exports.useEffect(function(){Le(u,p)},[u,p]);var T=R.exports.useMemo(function(){return{placement:o,strategy:n,onFirstUpdate:l,modifiers:[].concat(s,[{name:"arrow",enabled:g!=null,options:{element:g}}])}},[o,n,l,s,g]),y=ro(a||d,p,T),f=y.state,w=y.styles,b=y.forceUpdate,x=y.update,C=R.exports.useMemo(function(){return{ref:v,style:w.popper,placement:f?f.placement:o,hasPopperEscaped:f&&f.modifiersData.hide?f.modifiersData.hide.hasPopperEscaped:null,isReferenceHidden:f&&f.modifiersData.hide?f.modifiersData.hide.isReferenceHidden:null,arrowProps:{style:w.arrow,ref:O},forceUpdate:b||oo,update:x||no}},[v,O,o,f,w,x,b]);return At(c)(C)}function so(t){var e=t.children,o=t.innerRef,r=R.exports.useContext(Et),n=R.exports.useCallback(function(i){Le(o,i),kt(r,i)},[o,r]);return R.exports.useEffect(function(){return function(){return Le(o,null)}}),R.exports.useEffect(function(){},[r]),At(e)({ref:n})}var Bt=Xt.createContext({}),N=function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];return function(){for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return o.forEach(function(a){return a&&a.apply(void 0,i)})}},lo=function(){},dt=function(){return!!(typeof window!="undefined"&&window.document&&window.document.createElement)},co=function(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)},jt=function(t){Pt(e,t);function e(){for(var r,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r=t.call.apply(t,[this].concat(i))||this,r.observer=void 0,r.tooltipRef=void 0,r.handleOutsideClick=function(a){if(r.tooltipRef&&!r.tooltipRef.contains(a.target)){var l=r.context.parentOutsideClickHandler,u=r.props,c=u.hideTooltip,d=u.clearScheduled;d(),c(),l&&l(a)}},r.handleOutsideRightClick=function(a){if(r.tooltipRef&&!r.tooltipRef.contains(a.target)){var l=r.context.parentOutsideRightClickHandler,u=r.props,c=u.hideTooltip,d=u.clearScheduled;d(),c(),l&&l(a)}},r.addOutsideClickHandler=function(){document.body.addEventListener("touchend",r.handleOutsideClick),document.body.addEventListener("click",r.handleOutsideClick)},r.removeOutsideClickHandler=function(){document.body.removeEventListener("touchend",r.handleOutsideClick),document.body.removeEventListener("click",r.handleOutsideClick)},r.addOutsideRightClickHandler=function(){return document.body.addEventListener("contextmenu",r.handleOutsideRightClick)},r.removeOutsideRightClickHandler=function(){return document.body.removeEventListener("contextmenu",r.handleOutsideRightClick)},r.getTooltipRef=function(a){r.tooltipRef=a,co(r.props.innerRef,a)},r.getArrowProps=function(a){return a===void 0&&(a={}),_({},a,{style:_({},a.style,r.props.arrowProps.style)})},r.getTooltipProps=function(a){return a===void 0&&(a={}),_({},a,r.isTriggeredBy("hover")&&{onMouseEnter:N(r.props.clearScheduled,a.onMouseEnter),onMouseLeave:N(r.props.hideTooltip,a.onMouseLeave)},{style:_({},a.style,r.props.style)})},r.contextValue={isParentNoneTriggered:r.props.trigger==="none",addParentOutsideClickHandler:r.addOutsideClickHandler,addParentOutsideRightClickHandler:r.addOutsideRightClickHandler,parentOutsideClickHandler:r.handleOutsideClick,parentOutsideRightClickHandler:r.handleOutsideRightClick,removeParentOutsideClickHandler:r.removeOutsideClickHandler,removeParentOutsideRightClickHandler:r.removeOutsideRightClickHandler},r}var o=e.prototype;return o.componentDidMount=function(){var n=this,i=this.observer=new MutationObserver(function(){n.props.update()});if(i.observe(this.tooltipRef,this.props.mutationObserverOptions),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var s=this.context,a=s.removeParentOutsideClickHandler,l=s.removeParentOutsideRightClickHandler;this.addOutsideClickHandler(),this.addOutsideRightClickHandler(),a&&a(),l&&l()}},o.componentDidUpdate=function(){this.props.closeOnReferenceHidden&&this.props.isReferenceHidden&&this.props.hideTooltip()},o.componentWillUnmount=function(){if(this.observer&&this.observer.disconnect(),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var n=this.context,i=n.isParentNoneTriggered,s=n.addParentOutsideClickHandler,a=n.addParentOutsideRightClickHandler;this.removeOutsideClickHandler(),this.removeOutsideRightClickHandler(),this.handleOutsideClick=void 0,this.handleOutsideRightClick=void 0,!i&&s&&s(),!i&&a&&a()}},o.render=function(){var n=this.props,i=n.arrowProps,s=n.placement,a=n.tooltip;return $(Bt.Provider,{value:this.contextValue,children:a({arrowRef:i.ref,getArrowProps:this.getArrowProps,getTooltipProps:this.getTooltipProps,placement:s,tooltipRef:this.getTooltipRef})})},o.isTriggeredBy=function(n){var i=this.props.trigger;return i===n||Array.isArray(i)&&i.includes(n)},e}(R.exports.Component);jt.contextType=Bt;var uo={childList:!0,subtree:!0},Mt=function(t){Pt(e,t);function e(){for(var r,n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s];return r=t.call.apply(t,[this].concat(i))||this,r.state={tooltipShown:r.props.defaultTooltipShown},r.hideTimeout=void 0,r.showTimeout=void 0,r.popperOffset=void 0,r.setTooltipState=function(a){var l=function(){return r.props.onVisibilityChange(a.tooltipShown)};r.isControlled()?l():r.setState(a,l)},r.clearScheduled=function(){clearTimeout(r.hideTimeout),clearTimeout(r.showTimeout)},r.showTooltip=function(a){var l=a.pageX,u=a.pageY;r.clearScheduled();var c={tooltipShown:!0};r.props.followCursor&&(c=_({},c,{pageX:l,pageY:u})),r.showTimeout=window.setTimeout(function(){return r.setTooltipState(c)},r.props.delayShow)},r.hideTooltip=function(){r.clearScheduled(),r.hideTimeout=window.setTimeout(function(){return r.setTooltipState({tooltipShown:!1})},r.props.delayHide)},r.toggleTooltip=function(a){var l=a.pageX,u=a.pageY,c=r.getState()?"hideTooltip":"showTooltip";r[c]({pageX:l,pageY:u})},r.clickToggle=function(a){a.preventDefault();var l=a.pageX,u=a.pageY,c=r.props.followCursor?"showTooltip":"toggleTooltip";r[c]({pageX:l,pageY:u})},r.contextMenuToggle=function(a){a.preventDefault();var l=a.pageX,u=a.pageY,c=r.props.followCursor?"showTooltip":"toggleTooltip";r[c]({pageX:l,pageY:u})},r.getTriggerProps=function(a){return a===void 0&&(a={}),_({},a,r.isTriggeredBy("click")&&{onClick:N(r.clickToggle,a.onClick),onTouchEnd:N(r.clickToggle,a.onTouchEnd)},r.isTriggeredBy("right-click")&&{onContextMenu:N(r.contextMenuToggle,a.onContextMenu)},r.isTriggeredBy("hover")&&_({onMouseEnter:N(r.showTooltip,a.onMouseEnter),onMouseLeave:N(r.hideTooltip,a.onMouseLeave)},r.props.followCursor&&{onMouseMove:N(r.showTooltip,a.onMouseMove)}),r.isTriggeredBy("focus")&&{onFocus:N(r.showTooltip,a.onFocus),onBlur:N(r.hideTooltip,a.onBlur)})},r}var o=e.prototype;return o.componentWillUnmount=function(){this.clearScheduled()},o.render=function(){var n=this,i=this.props,s=i.children,a=i.tooltip,l=i.placement,u=i.trigger,c=i.getTriggerRef,d=i.modifiers,m=i.closeOnReferenceHidden,p=i.usePortal,v=i.portalContainer,h=i.followCursor,g=i.getTooltipRef,O=i.mutationObserverOptions,T=Yt(i,["children","tooltip","placement","trigger","getTriggerRef","modifiers","closeOnReferenceHidden","usePortal","portalContainer","followCursor","getTooltipRef","mutationObserverOptions"]),y=$(ao,{innerRef:g,placement:l,modifiers:[{name:"followCursor",enabled:h,phase:"main",fn:function(w){n.popperOffset=w.state.rects.popper}}].concat(d),...T,children:function(f){var w=f.ref,b=f.style,x=f.placement,C=f.arrowProps,E=f.isReferenceHidden,S=f.update;if(h&&n.popperOffset){var P=n.state,B=P.pageX,A=P.pageY,X=n.popperOffset,z=X.width,k=X.height,j=B+z>window.pageXOffset+document.body.offsetWidth?B-z:B,te=A+k>window.pageYOffset+document.body.offsetHeight?A-k:A;b.transform="translate3d("+j+"px, "+te+"px, 0"}return $(jt,{arrowProps:C,closeOnReferenceHidden:m,isReferenceHidden:E,placement:x,update:S,style:b,tooltip:a,trigger:u,mutationObserverOptions:O,clearScheduled:n.clearScheduled,hideTooltip:n.hideTooltip,innerRef:w})}});return vt(Zr,{children:[$(so,{innerRef:c,children:function(f){var w=f.ref;return s({getTriggerProps:n.getTriggerProps,triggerRef:w})}}),this.getState()&&(p?Zt.exports.createPortal(y,v):y)]})},o.isControlled=function(){return this.props.tooltipShown!==void 0},o.getState=function(){return this.isControlled()?this.props.tooltipShown:this.state.tooltipShown},o.isTriggeredBy=function(n){var i=this.props.trigger;return i===n||Array.isArray(i)&&i.includes(n)},e}(R.exports.Component);Mt.defaultProps={closeOnReferenceHidden:!0,defaultTooltipShown:!1,delayHide:0,delayShow:0,followCursor:!1,onVisibilityChange:lo,placement:"right",portalContainer:dt()?document.body:null,trigger:"hover",usePortal:dt(),mutationObserverOptions:uo,modifiers:[]};var po=Mt,H=Vt(1e3)(function(t,e,o){var r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return e.split("-")[0]===t?o:r}),G=8,fo=Pe.div({position:"absolute",borderStyle:"solid"},function(t){var e=t.placement,o=0,r=0;switch(!0){case(e.startsWith("left")||e.startsWith("right")):{r=8;break}case(e.startsWith("top")||e.startsWith("bottom")):{o=8;break}}var n="translate3d(".concat(o,"px, ").concat(r,"px, 0px)");return{transform:n}},function(t){var e=t.theme,o=t.color,r=t.placement;return{bottom:"".concat(H("top",r,G*-1,"auto"),"px"),top:"".concat(H("bottom",r,G*-1,"auto"),"px"),right:"".concat(H("left",r,G*-1,"auto"),"px"),left:"".concat(H("right",r,G*-1,"auto"),"px"),borderBottomWidth:"".concat(H("top",r,"0",G),"px"),borderTopWidth:"".concat(H("bottom",r,"0",G),"px"),borderRightWidth:"".concat(H("left",r,"0",G),"px"),borderLeftWidth:"".concat(H("right",r,"0",G),"px"),borderTopColor:H("top",r,e.color[o]||o||e.base==="light"?ue(e.background.app):pe(e.background.app),"transparent"),borderBottomColor:H("bottom",r,e.color[o]||o||e.base==="light"?ue(e.background.app):pe(e.background.app),"transparent"),borderLeftColor:H("left",r,e.color[o]||o||e.base==="light"?ue(e.background.app):pe(e.background.app),"transparent"),borderRightColor:H("right",r,e.color[o]||o||e.base==="light"?ue(e.background.app):pe(e.background.app),"transparent")}}),vo=Pe.div(function(t){var e=t.hidden;return{display:e?"none":"inline-block",zIndex:2147483647}},function(t){var e=t.theme,o=t.color,r=t.hasChrome;return r?{background:e.color[o]||o||e.base==="light"?ue(e.background.app):pe(e.background.app),filter:`
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,borderRadius:e.appBorderRadius*2,fontSize:e.typography.size.s1}:{}}),Dt=function(e){var o=e.placement,r=e.hasChrome,n=e.children,i=e.arrowProps,s=e.tooltipRef,a=e.arrowRef,l=e.color,u=$e(e,["placement","hasChrome","children","arrowProps","tooltipRef","arrowRef","color"]);return vt(vo,{...Object.assign({hasChrome:r,placement:o,ref:s},u,{color:l}),children:[r&&$(fo,{...Object.assign({placement:o,ref:a},i,{color:l})}),n]})};Dt.defaultProps={color:void 0,arrowRef:void 0,tooltipRef:void 0,hasChrome:!0,placement:"top",arrowProps:{}};var je=It.document,ho=Pe.div(et||(et=yt([`
  display: inline-block;
  cursor: `,`;
`])),function(t){return t.mode==="hover"?"default":"pointer"}),go=Pe.g(tt||(tt=yt([`
  cursor: `,`;
`])),function(t){return t.mode==="hover"?"default":"pointer"}),Ht=function(e){var o=e.svg,r=e.trigger;e.closeOnClick;var n=e.placement,i=e.modifiers,s=e.hasChrome,a=e.tooltip,l=e.children,u=e.tooltipShown,c=e.onVisibilityChange,d=$e(e,["svg","trigger","closeOnClick","placement","modifiers","hasChrome","tooltip","children","tooltipShown","onVisibilityChange"]),m=o?go:ho;return $(po,{placement:n,trigger:r,modifiers:i,tooltipShown:u,onVisibilityChange:c,tooltip:function(v){var h=v.getTooltipProps,g=v.getArrowProps,O=v.tooltipRef,T=v.arrowRef,y=v.placement;return $(Dt,{...Object.assign({hasChrome:s,placement:y,tooltipRef:O,arrowRef:T,arrowProps:g()},h()),children:typeof a=="function"?a({onHide:function(){return c(!1)}}):a})},children:function(p){var v=p.getTriggerProps,h=p.triggerRef;return $(m,{...Object.assign({ref:h},v(),d),children:l})}})};Ht.defaultProps={svg:!1,trigger:"hover",closeOnClick:!1,placement:"top",modifiers:[{name:"preventOverflow",options:{padding:8}},{name:"offset",options:{offset:[8,8]}},{name:"arrow",options:{padding:8}}],hasChrome:!0,tooltipShown:!1};var wo=function(e){var o=e.startOpen,r=e.onVisibilityChange,n=$e(e,["startOpen","onVisibilityChange"]),i=R.exports.useState(o||!1),s=Jt(i,2),a=s[0],l=s[1],u=R.exports.useCallback(function(c){r&&r(c)===!1||l(c)},[r]);return R.exports.useEffect(function(){var c=function(){return u(!1)};je.addEventListener("keydown",c,!1);var d=Array.from(je.getElementsByTagName("iframe")),m=[];return d.forEach(function(p){var v=function(){try{p.contentWindow.document&&(p.contentWindow.document.addEventListener("click",c),m.push(function(){try{p.contentWindow.document.removeEventListener("click",c)}catch{}}))}catch{}};v(),p.addEventListener("load",v),m.push(function(){p.removeEventListener("load",v)})}),function(){je.removeEventListener("keydown",c),m.forEach(function(p){p()})}}),$(Ht,{...Object.assign({},n,{tooltipShown:a,onVisibilityChange:u})})};export{wo as WithToolTipState,wo as WithTooltip,Ht as WithTooltipPure};
//# sourceMappingURL=WithTooltip-167e9982.a77ceed7.js.map
