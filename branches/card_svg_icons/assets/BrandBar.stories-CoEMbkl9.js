import{k as d,c as p,f as m,a as N,p as u,q as k,n as W,A as D,o as h}from"./vue.esm-bundler-B_OG6i5n.js";import{_ as P}from"./Logo.vue_vue_type_script_setup_true_lang-D7XMbokq.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";import E from"./BrandBarDocs-rfZqh1Pa.js";import"./index-DPUCkIZz.js";import"./iframe-B_tcwc7M.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-BlR2LH0U.js";import"./package-CvP6qD27.js";const q={name:"uids-iowa-bar",components:{UidsLogo:P},props:{narrow:{type:Boolean,default:!1},healthcare:{type:Boolean,default:!1}},setup(a,r){const l=d(()=>{let n=["iowa-bar"];return(a.narrow||r.slots.second_row_content)&&n.push("iowa-bar--narrow"),a.healthcare&&n.push("iowa-bar--healthcare"),n}),i=d(()=>r.slots.parent_title&&r.slots.parent_title().length||r.slots.bottom_content&&r.slots.bottom_content().length);return{getClasses:l,showBottomBar:i}}},z={class:"iowa-bar__container"},A={key:0,class:"iowa-bar__below"},L={class:"iowa-bar__container"};function M(a,r,l,i,n,j){const $=D("uids-logo");return h(),p("header",{class:W(i.getClasses),"data-uids-header":""},[m("div",z,[N($,{healthcare:l.healthcare,context:"header"},null,8,["healthcare"]),u(a.$slots,"default")]),a.$slots.second_row_content?(h(),p("div",A,[m("div",L,[u(a.$slots,"second_row_content")])])):k("",!0)],2)}const c=V(q,[["render",M]]),ra={title:"Components/Branding/Brand Bar",component:c,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:E}}},O=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),e=O.bind({});e.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const U=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),t=U.bind({});t.args={...e.args,default:"Brand"};const s=U.bind({});s.args={...t.args,narrow:!0};const X=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),o=X.bind({});o.args={...e.args,default:"Brand",second_row_content:"Icon Browser"};var w,g,_;e.parameters={...e.parameters,docs:{...(w=e.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(_=(g=e.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};var f,b,B;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var S,T,v;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
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
})`,...(v=(T=s.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var y,C,I;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(I=(C=o.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const ta=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{e as Default,s as Narrow,o as WithParentSiteTitle,t as WithSiteTitle,ta as __namedExportsOrder,ra as default};
