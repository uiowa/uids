import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{n,t as r}from"./preview-DkR3xSi4.js";import{D as i,c as a,f as o,g as s,i as c,n as l,v as u}from"./iframe-BMXo6Z5W.js";import"./_background-5iX1z5X0.js";import{n as d,t as f}from"./background-Cr6Xy-3k.js";import{n as p,t as m}from"./media-COLWqgAZ.js";import{n as h,t as g}from"./inline-eDjeiRKD.js";function _(){return(_=e((()=>{})))()}var v;function y(){return(y=e((()=>{l(),d(),m(),g(),v=o({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let t=e,n=c(()=>{let e=[`callout`];return f.addBackgroundClass(e,t),h.addClass(e,t),e});return(e,t)=>(s(),a(`div`,{class:i(n.value)},[u(e.$slots,`default`)],2))}})})))()}var b;function x(){return(x=e((()=>{y(),b=v,v.__docgenInfo=Object.assign({displayName:v.name??v.__name},{exportName:`default`,displayName:`Callout`,description:``,tags:{},slots:[{name:`default`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/callout/Callout.vue`]})})))()}var S=t({Callout:()=>T,__namedExportsOrder:()=>E,default:()=>C}),C,w,T,E;function D(){return(D=e((()=>{x(),d(),r(),C={title:`Components/Callout`,component:b,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:n.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:b},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),T=w.bind({}),T.args={default:`<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>`,background:`gray`},E=[`Callout`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCallout
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  \`
})`,...T.parameters?.docs?.source}}}})))()}export{_ as a,x as i,D as n,b as r,S as t};