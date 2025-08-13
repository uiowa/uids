import{B as _}from"./BrandBar-Cm3xyW7s.js";import B from"./BrandBarDocs-AcxUBYjS.js";import"./vue.esm-bundler-5gA9mrtU.js";import"./Logo.vue_vue_type_script_setup_true_lang-C5A6dmQv.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-BeFs0Dr_.js";import"./iframe-QNdA8pqp.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-DW5ahErt.js";import"./package-CvWI4E4G.js";const M={title:"Components/Branding/Brand Bar",component:_,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:B}}},o={render:h=>({components:{UidsIowaBar:_},setup(){return{args:h}},template:`
      <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.second_row_content || args.narrow">
        <h1 v-if="args.default && !args.second_row_content" class="site-name">{{ args.default }}</h1>
        <div v-else-if="args.default && args.second_row_content" class="parent-site-name">{{ args.default }}</div>
        <template v-if="args.second_row_content" #second_row_content>
          <h1 class="site-name">{{ args.second_row_content }}</h1>
        </template>
      </uids-iowa-bar>
    `})},e={...o,args:{narrow:!1,default:"",second_row_content:"",healthcare:!1}},r={name:"With site title",...o,args:{...e.args,default:"Brand"}},a={name:"Narrow",...o,args:{...e.args,narrow:!0,default:"Brand"}},t={name:"With parent site title",...o,args:{...e.args,default:"Brand",second_row_content:"Icon Browser"}};var n,s,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  ...Template,
  args: {
    narrow: false,
    default: '',
    second_row_content: '',
    healthcare: false
  }
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var i,l,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'With site title',
  ...Template,
  args: {
    ...Default.args,
    default: \`Brand\`
  }
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,p,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: 'Narrow',
  ...Template,
  args: {
    ...Default.args,
    narrow: true,
    default: 'Brand'
  }
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,f,w;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'With parent site title',
  ...Template,
  args: {
    ...Default.args,
    default: 'Brand',
    second_row_content: 'Icon Browser'
  }
}`,...(w=(f=t.parameters)==null?void 0:f.docs)==null?void 0:w.source}}};const O=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{e as Default,a as Narrow,t as WithParentSiteTitle,r as WithSiteTitle,O as __namedExportsOrder,M as default};
