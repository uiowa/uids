import{i as e}from"./preload-helper-4HKJDzVh.js";import{J as t,K as n,Q as r,ct as i,n as a,nt as o,t as s,ut as c,xt as l}from"./iframe-Co0h-42G.js";import{t as u}from"./_background-aeT1VdSs.js";import{n as d,t as f}from"./background-DBuNQ4Zh.js";import{n as p,t as m}from"./media-aAzWk-yc.js";import{n as h,t as g}from"./inline-DrI5sS0f.js";var _=e((()=>{})),v=e((()=>{})),y,b=e((()=>{n(),_(),u(),d(),v(),m(),g(),y=o({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let n=e,a=t(()=>{let e=[`callout`];return f.addBackgroundClass(e,n),h.addClass(e,n),e});return(e,t)=>(i(),r(`div`,{class:l(a.value)},[c(e.$slots,`default`)],2))}})})),x,S=e((()=>{b(),b(),x=y,y.__docgenInfo=Object.assign({displayName:y.name??y.__name},{exportName:`default`,displayName:`Callout`,description:``,tags:{},slots:[{name:`default`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/callout/Callout.vue`]})})),C,w,T,E,D=e((()=>{S(),d(),s(),C={title:`Components/Callout`,component:x,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:a.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:x},setup(){return{args:e}},template:`
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
})`,...T.parameters?.docs?.source}}}}));D();export{T as Callout,E as __namedExportsOrder,C as default,v as i,x as n,S as r,D as t};