import{U as z,B}from"./Button-7b8fb4f2.js";import"./vue.esm-bundler-c04f16a9.js";import"./utlity-a0fec18e.js";const U={title:"Components/Button",parameters:{docs:{source:{code:null}}},component:z,tags:["autodocs"],argTypes:{url:{control:{type:"text"}},color:{control:{type:"select"},options:["primary","secondary","tertiary"]},size:{control:{type:"select"},options:["small","medium","large"]},...B.argTypes,full:{name:"full width",control:{type:"boolean"}},transparent:{name:"transparent",control:{type:"boolean"}},light_font:{control:{type:"boolean"}},icon:{control:{type:"text"}}}},a=T=>({components:{UidsButton:z},setup(){return{args:T}},template:`
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
  `}),e=a.bind({});e.args={url:"https://example.com",label:"Read more",color:"primary",size:"medium",borderless:!1,full:!1,transparent:!1,light_font:!1,icon:'<i class="fas fa-arrow-right"></i>'};const t=a.bind({});t.args={...e.args,color:"secondary"};const n=a.bind({});n.args={...e.args,color:"tertiary"};const r=a.bind({});r.args={...e.args,label:""};const s=a.bind({});s.args={...e.args,light_font:!0};var o,l,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
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
})`,...(i=(l=e.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var p,g,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => ({
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
})`,...(u=(g=t.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var c,m,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
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
})`,...(d=(m=n.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var h,b,f;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`args => ({
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
})`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var y,v,_;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(_=(v=s.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};const C=["Primary","Secondary","Tertiary","NoText","LightFont"];export{s as LightFont,r as NoText,e as Primary,t as Secondary,n as Tertiary,C as __namedExportsOrder,U as default};
