import{_ as h}from"./iframe-e8c1eae7.js";import{R as o,r as a}from"./index-c013ead5.js";import{r as d,g as E,A as R,H as x,D as y}from"./index-77dfac16.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-725317a4.js";import"./index-11d98b33.js";import"./index-38ad35d1.js";import"./index-356e4a49.js";var c={},m=d;c.createRoot=m.createRoot,c.hydrateRoot=m.hydrateRoot;var n=new Map,D=({callback:e,children:t})=>{let r=a.useRef();return a.useLayoutEffect(()=>{r.current!==e&&(r.current=e,e())},[e]),t},_=async(e,t)=>{let r=await g(t);return new Promise(s=>{r.render(o.createElement(D,{callback:()=>s(null)},e))})},f=(e,t)=>{let r=n.get(e);r&&(r.unmount(),n.delete(e))},g=async e=>{let t=n.get(e);return t||(t=c.createRoot(e),n.set(e,t)),t},v={code:E,a:R,...x},w=class extends a.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(e){let{showException:t}=this.props;t(e)}render(){let{hasError:e}=this.state,{children:t}=this.props;return e?null:o.createElement(o.Fragment,null,t)}},T=class{constructor(){this.render=async(e,t,r)=>{let s={...v,...t==null?void 0:t.components},i=y;return new Promise((u,p)=>{h(()=>import("./index-3685aeb7.js"),["assets/index-3685aeb7.js","assets/index-dc1d5b46.js","assets/index-c013ead5.js","assets/_commonjsHelpers-725317a4.js"]).then(({MDXProvider:l})=>_(o.createElement(w,{showException:p,key:Math.random()},o.createElement(l,{components:s},o.createElement(i,{context:e,docsParameter:t}))),r)).then(()=>u())})},this.unmount=e=>{f(e)}}};export{T as DocsRenderer,v as defaultComponents};
