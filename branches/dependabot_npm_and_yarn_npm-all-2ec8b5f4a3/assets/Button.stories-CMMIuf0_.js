import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{i as n,n as r,r as i,t as a}from"./Button-CcoubRH8.js";var o=t({LightFont:()=>p,NoText:()=>f,Primary:()=>l,Secondary:()=>u,Tertiary:()=>d,__namedExportsOrder:()=>m,default:()=>s}),s,c,l,u,d,f,p,m;function h(){return(h=e((()=>{r(),n(),s={title:`Components/Button`,parameters:{docs:{source:{code:null}}},component:a,tags:[`autodocs`],argTypes:{url:{control:{type:`text`}},color:{control:{type:`select`},options:[`primary`,`secondary`,`tertiary`]},size:{control:{type:`select`},options:[`small`,`medium`,`large`]},...i.argTypes,full:{name:`full width`,control:{type:`boolean`}},transparent:{name:`transparent`,control:{type:`boolean`}},light_font:{control:{type:`boolean`}},icon:{control:{type:`text`}}}},c=e=>({components:{UidsButton:a},setup(){return{args:e}},template:`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  `}),l=c.bind({}),l.args={url:`https://uiowa.edu`,label:`Read more`,color:`primary`,size:`medium`,borderless:!1,full:!1,transparent:!1,light_font:!1,icon:`<i class="fas fa-arrow-right"></i>`},u=c.bind({}),u.args={...l.args,color:`secondary`},d=c.bind({}),d.args={...l.args,color:`tertiary`},f=c.bind({}),f.args={...l.args,label:``},p=c.bind({}),p.args={...l.args,light_font:!0},m=[`Primary`,`Secondary`,`Tertiary`,`NoText`,`LightFont`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsButton
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  \`
})`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsButton
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  \`
})`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsButton
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  \`
})`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsButton
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  \`
})`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsButton
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-button
      :url="args.url"
      :color="args.color"
      :size="args.size"
      :borderless="args.borderless"
      :full="args.full"
      :transparent="args.transparent"
      :light_font="args.light_font"
      :icon="args.icon"
    >
      <template #default v-if="args.label">{{ args.label }}</template>
      <template #icon v-if="args.icon"><span v-html="args.icon" ></span></template>
    </uids-button>
  \`
})`,...p.parameters?.docs?.source}}}})))()}export{l as n,h as r,o as t};