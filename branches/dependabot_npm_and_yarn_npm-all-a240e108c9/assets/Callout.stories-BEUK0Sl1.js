import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{n as t,t as n}from"./preview-pTDSlndJ.js";import{T as r,_ as i,d as a,h as o,r as s,s as c,t as l}from"./iframe-C2ufwrXp.js";import{t as u}from"./_background-C-bRz1Ob.js";import{n as d,t as f}from"./background-CpAjS5xG.js";import{n as p,t as m}from"./media-DwvlDouT.js";import{n as h,t as g}from"./inline-DKfEJNgS.js";var _=e((()=>{})),v=e((()=>{})),y,b=e((()=>{l(),_(),u(),d(),v(),m(),g(),y=a({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let t=e,n=s(()=>{let e=[`callout`];return f.addBackgroundClass(e,t),h.addClass(e,t),e});return(e,t)=>(o(),c(`div`,{class:r(n.value)},[i(e.$slots,`default`)],2))}})})),x,S=e((()=>{b(),b(),x=y,y.__docgenInfo=Object.assign({displayName:y.name??y.__name},{exportName:`default`,displayName:`Callout`,description:``,tags:{},slots:[{name:`default`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/callout/Callout.vue`]})})),C,w,T,E,D=e((()=>{S(),d(),n(),C={title:`Components/Callout`,component:x,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:t.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:x},setup(){return{args:e}},template:`
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