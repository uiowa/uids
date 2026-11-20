import{i as e}from"./preload-helper-CN-IQmCb.js";import{n as t,t as n}from"./Logo-BC8rJzzB.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Components/Branding/Logo`,parameters:{docs:{source:{code:null}}},component:n,tags:[`autodocs`],argTypes:{healthcare:{control:{type:`boolean`},name:`Healthcare`},url:{control:{type:`text`},name:`URL`}}},i=e=>({components:{UidsLogo:n},setup(){return{args:e}},template:`
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  `}),a=i.bind({}),a.args={healthcare:!1,url:`https://uiowa.edu`},o=i.bind({}),o.args={healthcare:!0,url:`https://uihealthcare.org`},s=i.bind({}),s.args={...a.args,url:``},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsLogo
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  \`
})`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsLogo
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  \`
})`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsLogo
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  \`
})`,...s.parameters?.docs?.source}}},c=[`Iowa`,`IowaHealthCare`,`Unlinked`]}))();export{a as Iowa,o as IowaHealthCare,s as Unlinked,c as __namedExportsOrder,r as default};