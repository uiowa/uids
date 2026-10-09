import{i as e}from"./preload-helper-mYgoU-5D.js";import{Q as t,St as n,X as r,dt as i,n as a,nt as o,ot as s,pt as c,t as l}from"./iframe-DAI4KQG-.js";import{t as u}from"./_background-Csu3wPk_.js";import{n as d,t as f}from"./background-CXIJdB2O.js";import{n as p,t as m}from"./media-C616YcaK.js";import{n as h,t as g}from"./inline-Ccs-4smL.js";var _=e((()=>{})),v=e((()=>{})),y,b=e((()=>{r(),_(),u(),d(),v(),m(),g(),y=s({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let r=e,a=t(()=>{let e=[`callout`];return f.addBackgroundClass(e,r),h.addClass(e,r),e});return(e,t)=>(i(),o(`div`,{class:n(a.value)},[c(e.$slots,`default`)],2))}})})),x,S=e((()=>{b(),b(),x=y})),C,w,T,E,D=e((()=>{S(),d(),l(),C={title:`Components/Callout`,component:x,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:a.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:x},setup(){return{args:e}},template:`
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