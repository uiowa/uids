import{i as e}from"./preload-helper-CN-IQmCb.js";import{n as t,t as n}from"./Logo-DcI40w6G.js";import{n as r,t as i}from"./componentTokens-YIIBn1DS.js";var a,o,s=e((()=>{a={text:{color:{$type:`color`,$value:`{color.brand.gold}`,$description:`Block Iowa text color.`}},subtext:{color:{$type:`color`,$value:`{color.text.inverse}`,$description:`Subtext color under the Block Iowa text.`}},background:{$type:`color`,$value:`{color.background.black}`,$description:`Background for the logo tab.`}},o={logo:a}})),c,l,u,d,f,p,m;e((()=>{t(),s(),r(),c={title:`Components/Branding/Logo`,parameters:{docs:{source:{code:null}}},component:n,tags:[`autodocs`],argTypes:{healthcare:{control:{type:`boolean`},name:`Healthcare`},url:{control:{type:`text`},name:`URL`}}},l={...i(o),tags:[`!autodocs`,`noAddonsDrawer`]},u=e=>({components:{UidsLogo:n},setup(){return{args:e}},template:`
    <uids-logo :healthcare="args.healthcare" :url="args.url"></uids-logo>
  `}),d=u.bind({}),d.args={healthcare:!1,url:`https://uiowa.edu`},f=u.bind({}),f.args={healthcare:!0,url:`https://uihealthcare.org`},p=u.bind({}),p.args={...d.args,url:``},m=[`Tokens`,`Iowa`,`IowaHealthCare`,`Unlinked`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...componentTokensStory(logoTokens),
  tags: ['!autodocs', 'noAddonsDrawer']
}`,...l.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
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
})`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => ({
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
})`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => ({
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
})`,...p.parameters?.docs?.source}}}}))();export{d as Iowa,f as IowaHealthCare,l as Tokens,p as Unlinked,m as __namedExportsOrder,c as default};