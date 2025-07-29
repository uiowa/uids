import{k as d,c as p,f as m,a as N,l as u,m as k,n as W,y as D,o as h}from"./vue.esm-bundler--ETYdinE.js";import{_ as P}from"./Logo.vue_vue_type_script_setup_true_lang-BeIHPccp.js";import{_ as V}from"./_plugin-vue_export-helper-DlAUqK2U.js";import E from"./BrandBarDocs-D1dczgsX.js";import"./index-C6PaD7T1.js";import"./iframe-p2dDSxJr.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-KT9vkdHC.js";import"./package-CvWI4E4G.js";const z={name:"uids-iowa-bar",components:{UidsLogo:P},props:{narrow:{type:Boolean,default:!1},healthcare:{type:Boolean,default:!1}},setup(a,r){const l=d(()=>{let n=["iowa-bar"];return(a.narrow||r.slots.second_row_content)&&n.push("iowa-bar--narrow"),a.healthcare&&n.push("iowa-bar--healthcare"),n}),i=d(()=>r.slots.parent_title&&r.slots.parent_title().length||r.slots.bottom_content&&r.slots.bottom_content().length);return{getClasses:l,showBottomBar:i}}},L={class:"iowa-bar__container"},M={key:0,class:"iowa-bar__below"},O={class:"iowa-bar__container"};function X(a,r,l,i,n,x){const $=D("uids-logo");return h(),p("header",{class:W(i.getClasses),"data-uids-header":""},[m("div",L,[N($,{healthcare:l.healthcare,context:"header"},null,8,["healthcare"]),u(a.$slots,"default")]),a.$slots.second_row_content?(h(),p("div",M,[m("div",O,[u(a.$slots,"second_row_content")])])):k("",!0)],2)}const c=V(z,[["render",X]]),ra={title:"Components/Branding/Brand Bar",component:c,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:E}}},j=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),e=j.bind({});e.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const U=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),t=U.bind({});t.args={...e.args,default:"Brand"};const s=U.bind({});s.args={...t.args,narrow:!0};const q=a=>({components:{UidsIowaBar:c},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),o=q.bind({});o.args={...e.args,default:"Brand",second_row_content:"Icon Browser"};var w,g,_;e.parameters={...e.parameters,docs:{...(w=e.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var S,T,y;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
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
})`,...(y=(T=s.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var v,C,I;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
