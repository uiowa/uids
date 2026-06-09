import{i as e}from"./preload-helper-FXFgdrXs.js";import{C as t,D as n,F as r,G as i,L as a,j as o,n as s,t as c,x as l}from"./iframe-CC5t_kX3.js";import{t as u}from"./_background-Z6_7z_5y.js";import{n as d,t as f}from"./background-B42rUdKZ.js";import{n as p,t as m}from"./media-CSH4eYQV.js";import{n as h,t as g}from"./inline-jhOceBis.js";var _=e((()=>{})),v=e((()=>{})),y,b=e((()=>{l(),_(),u(),d(),v(),m(),g(),y=o({__name:`Callout`,props:{...h.props,...f.props,...p.props},setup(e){let o=e,s=t(()=>{let e=[`callout`];return f.addBackgroundClass(e,o),h.addClass(e,o),e});return(e,t)=>(r(),n(`div`,{class:i(s.value)},[a(e.$slots,`default`)],2))}})})),x,S=e((()=>{b(),b(),x=y})),C,w,T,E,D=e((()=>{S(),d(),c(),C={title:`Components/Callout`,component:x,tags:[`autodocs`],argTypes:{...f.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:s.parameters.viewport.viewports,defaultViewport:`tablet`}}},w=e=>({components:{UidsCallout:x},setup(){return{args:e}},template:`
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