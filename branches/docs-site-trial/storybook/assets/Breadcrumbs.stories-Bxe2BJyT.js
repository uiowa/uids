import{i as e}from"./preload-helper-BL0Fm5OC.js";import{n as t,t as n}from"./Breadcrumbs-Cqr4as4y.js";var r,i,a,o,s;e((()=>{t(),r={title:`Components/Breadcrumbs`,component:n,tags:[`autodocs`],render:e=>({setup(){return{args:e}},components:{UidsBreadcrumbs:n},template:`
    <uids-breadcrumbs v-bind="args" />
  `})},i={args:{items:[{text:`Home`,url:`#`},{text:`Parent page with menu link`},{text:`Current page`}]}},a={args:{items:[{text:`Home`,url:`#`},{text:`Academics`,url:`#`},{text:`Programs`,url:`#`},{text:`Current page`}]}},o={render:e=>({setup(){return{args:e}},components:{UidsBreadcrumbs:n},template:`
    <div class="bg--black" style="padding: 1rem">
      <uids-breadcrumbs v-bind="args" heading_id="breadcrumb-on-black" />
    </div>
  `}),args:{...i.args}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      text: 'Home',
      url: '#'
    }, {
      text: 'Parent page with menu link'
    }, {
      text: 'Current page'
    }]
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      text: 'Home',
      url: '#'
    }, {
      text: 'Academics',
      url: '#'
    }, {
      text: 'Programs',
      url: '#'
    }, {
      text: 'Current page'
    }]
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      return {
        args
      };
    },
    components: {
      UidsBreadcrumbs
    },
    template: \`
    <div class="bg--black" style="padding: 1rem">
      <uids-breadcrumbs v-bind="args" heading_id="breadcrumb-on-black" />
    </div>
  \`
  }),
  args: {
    ...Default.args
  }
}`,...o.parameters?.docs?.source}}},s=[`Default`,`AllLinked`,`OnBlack`]}))();export{a as AllLinked,i as Default,o as OnBlack,s as __namedExportsOrder,r as default};