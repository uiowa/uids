import{i as e}from"./preload-helper-DylEL7Is.js";import{Ct as t,Q as n,X as r,ft as i,n as a,nt as o,ot as s,t as c,ut as l}from"./iframe-DCoWvCo2.js";import{t as u}from"./_background-DBZ3BiBv.js";import{n as d,t as f}from"./background-CF50TMRF.js";import{n as p,t as m}from"./media-CvxFuJJO.js";import{n as h,t as g}from"./inline-D8KlPcx3.js";var _=e((()=>{})),v=e((()=>{})),y,b=e((()=>{r(),_(),u(),d(),v(),m(),g(),y=s({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let r=e,a=n(()=>{let e=[`callout`];return f.addBackgroundClass(e,r),h.addClass(e,r),e});return(e,n)=>(l(),o(`div`,{class:t(a.value)},[i(e.$slots,`default`)],2))}})})),x,S=e((()=>{b(),b(),x=y})),C,w,T,E,D=e((()=>{S(),d(),c(),C={title:`Components/Callout`,component:x,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:a.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:x},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),T=w.bind({}),T.args={default:`<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>`,background:`gray`},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`args => ({
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
})`,...T.parameters?.docs?.source}}},E=[`Callout`]}));D();export{T as Callout,E as __namedExportsOrder,C as default,v as i,x as n,S as r,D as t};