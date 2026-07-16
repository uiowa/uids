import{i as e}from"./preload-helper-B3w-AgZf.js";import{i as t,n,r,t as i}from"./Button-CJC5Mvj8.js";var a,o,s,c,l,u,d,f,p=e((()=>{n(),t(),a={title:`Components/Button`,parameters:{docs:{source:{code:null}}},component:i,tags:[`autodocs`],argTypes:{url:{control:{type:`text`}},color:{control:{type:`select`},options:[`primary`,`secondary`,`tertiary`]},size:{control:{type:`select`},options:[`small`,`medium`,`large`]},...r.argTypes,full:{name:`full width`,control:{type:`boolean`}},transparent:{name:`transparent`,control:{type:`boolean`}},light_font:{control:{type:`boolean`}},icon:{control:{type:`text`}}}},o=e=>({components:{UidsButton:i},setup(){return{args:e}},template:`
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
  `}),s=o.bind({}),s.args={url:`https://uiowa.edu`,label:`Read more`,color:`primary`,size:`medium`,borderless:!1,full:!1,transparent:!1,light_font:!1,icon:`<i class="fas fa-arrow-right"></i>`},c=o.bind({}),c.args={...s.args,color:`secondary`},l=o.bind({}),l.args={...s.args,color:`tertiary`},u=o.bind({}),u.args={...s.args,label:``},d=o.bind({}),d.args={...s.args,light_font:!0},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
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
})`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`args => ({
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
})`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
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
})`,...d.parameters?.docs?.source}}},f=[`Primary`,`Secondary`,`Tertiary`,`NoText`,`LightFont`]}));p();export{d as LightFont,u as NoText,s as Primary,c as Secondary,l as Tertiary,f as __namedExportsOrder,a as default,p as t};