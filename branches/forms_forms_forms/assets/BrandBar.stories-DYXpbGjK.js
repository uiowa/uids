import{B as s}from"./BrandBar-CUNiUE72.js";import B from"./BrandBarDocs-CyIP3St5.js";import"./vue.esm-bundler-CLcX4pNH.js";import"./Logo.vue_vue_type_script_setup_true_lang-CHskBAx2.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-Cj7j3nnZ.js";import"./iframe-yPzfmLV6.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-cKxcyj9n.js";import"./package-CvWI4E4G.js";const O={title:"Components/Branding/Brand Bar",component:s,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:B}}},_=e=>({components:{UidsIowaBar:s},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),a=_.bind({});a.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const f=e=>({components:{UidsIowaBar:s},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),r=f.bind({});r.args={...a.args,default:"Brand"};const t=f.bind({});t.args={...r.args,narrow:!0};const S=e=>({components:{UidsIowaBar:s},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),n=S.bind({});n.args={...a.args,default:"Brand",second_row_content:"Icon Browser"};var o,i,c;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  \`
})`,...(c=(i=a.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var l,d,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,u,w;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(w=(u=t.parameters)==null?void 0:u.docs)==null?void 0:w.source}}};var g,h,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
\`
})`,...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const X=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{a as Default,t as Narrow,n as WithParentSiteTitle,r as WithSiteTitle,X as __namedExportsOrder,O as default};
