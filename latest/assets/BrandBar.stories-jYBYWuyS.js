import{k as d,c as p,e as u,a as k,p as m,q as N,n as W,v as D,o as h}from"./vue.esm-bundler-B7frGVmg.js";import{_ as P}from"./Logo.vue_vue_type_script_setup_true_lang-CWg5bpZ9.js";import V from"./BrandBarDocs-Bnxnehxd.js";import"./index-C48T-nAJ.js";import"./iframe-CwTiQvrq.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-D-_eK3HG.js";import"./package-C7Jar9vF.js";const E={name:"uids-iowa-bar",components:{UidsLogo:P},props:{narrow:{type:Boolean,default:!1},healthcare:{type:Boolean,default:!1}},setup(a,e){const t=d(()=>{let s=["iowa-bar"];return(a.narrow||e.slots.second_row_content)&&s.push("iowa-bar--narrow"),a.healthcare&&s.push("iowa-bar--healthcare"),s}),n=d(()=>e.slots.parent_title&&e.slots.parent_title().length||e.slots.bottom_content&&e.slots.bottom_content().length);return{getClasses:t,showBottomBar:n}}},O=(a,e)=>{const t=a.__vccOpts||a;for(const[n,s]of e)t[n]=s;return t},q={class:"iowa-bar__container"},z={key:0,class:"iowa-bar__below"},L={class:"iowa-bar__container"};function M(a,e,t,n,s,A){const $=D("uids-logo");return h(),p("header",{class:W(n.getClasses),"data-uids-header":""},[u("div",q,[k($,{healthcare:t.healthcare},null,8,["healthcare"]),m(a.$slots,"default")]),a.$slots.second_row_content?(h(),p("div",z,[u("div",L,[m(a.$slots,"second_row_content")])])):N("",!0)],2)}const i=O(E,[["render",M]]),ea={title:"Components/Branding/Brand Bar",component:i,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:V}}},X=a=>({components:{UidsIowaBar:i},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=X.bind({});r.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const U=a=>({components:{UidsIowaBar:i},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),o=U.bind({});o.args={...r.args,default:"Brand"};const c=U.bind({});c.args={...o.args,narrow:!0};const j=a=>({components:{UidsIowaBar:i},setup(){return{args:a}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),l=j.bind({});l.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var w,g,_;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(_=(g=r.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};var f,b,B;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(B=(b=o.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var v,S,T;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(T=(S=c.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var y,C,I;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(I=(C=l.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};const ra=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{r as Default,c as Narrow,l as WithParentSiteTitle,o as WithSiteTitle,ra as __namedExportsOrder,ea as default};
