import{i as e}from"./preload-helper-BL0Fm5OC.js";import{n as t,t as n}from"./iframe-D8ba8qyD.js";import{n as r,t as i}from"./background-BPzom0cM.js";import{n as a,t as o}from"./Callout-D_Kv5Msu.js";var s,c,l,u,d=e((()=>{a(),r(),n(),s={title:`Components/Callout`,component:o,tags:[`autodocs`],argTypes:{...i.argTypes,default:{name:`Content`,control:{type:`text`}}},parameters:{docs:{source:{code:null}},viewport:{viewports:t.parameters.viewport.viewports,defaultViewport:`tablet`}}},c=e=>({components:{UidsCallout:o},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),l=c.bind({}),l.args={default:`<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>`,background:`gray`},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
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
})`,...l.parameters?.docs?.source}}},u=[`Callout`]}));d();export{l as Callout,u as __namedExportsOrder,s as default,d as t};