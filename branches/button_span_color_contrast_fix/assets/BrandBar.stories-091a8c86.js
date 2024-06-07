import{j as d,o as p,b as u,g as m,e as W,l as h,p as $,n as k,v as V}from"./vue.esm-bundler-f09df2bf.js";import{_ as O}from"./Logo-6f5977d9.js";import P from"./BrandBarDocs-498cf85e.js";import"./jsx-runtime-6eef64cc.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./index-93618df0.js";import"./iframe-e14a32ba.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-38ad35d1.js";import"./index-356e4a49.js";import"./package-68a66de7.js";import"./index-dc1d5b46.js";const N={name:"uids-iowa-bar",components:{UidsLogo:O},props:{narrow:{type:Boolean,default:!1},healthcare:{type:Boolean,default:!1}},setup(e,a){const t=d(()=>{let o=["iowa-bar"];return(e.narrow||a.slots.second_row_content)&&o.push("iowa-bar--narrow"),e.healthcare&&o.push("iowa-bar--healthcare"),o}),n=d(()=>a.slots.parent_title&&a.slots.parent_title().length||a.slots.bottom_content&&a.slots.bottom_content().length);return{getClasses:t,showBottomBar:n}}},A=(e,a)=>{const t=e.__vccOpts||e;for(const[n,o]of a)t[n]=o;return t},E={class:"iowa-bar__container"},j={key:0,class:"iowa-bar__below"},x={class:"iowa-bar__container"};function z(e,a,t,n,o,M){const D=V("uids-logo");return p(),u("header",{class:k(n.getClasses),"data-uids-header":""},[m("div",E,[W(D,{healthcare:t.healthcare},null,8,["healthcare"]),h(e.$slots,"default")]),e.$slots.second_row_content?(p(),u("div",j,[m("div",x,[h(e.$slots,"second_row_content")])])):$("",!0)],2)}const i=A(N,[["render",z]]);N.__docgenInfo={displayName:"uids-iowa-bar",description:`The UIDS IOWA Bar is the visual starting point for all
branded websites and applications.`,tags:{},exportName:"default",props:[{name:"narrow",description:"Determines whether to use the narrow version of the IOWA bar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"healthcare",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Default slot shows content next to the logo."},{name:"second_row_content"}],sourceFiles:["/home/runner/work/uids/uids/src/components/brand-bar/BrandBar.vue"]};const oe={title:"Components/Branding/Brand Bar",component:i,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:P}}},F=e=>({components:{UidsIowaBar:i},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=F.bind({});r.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const U=e=>({components:{UidsIowaBar:i},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),s=U.bind({});s.args={...r.args,default:"Brand"};const c=U.bind({});c.args={...s.args,narrow:!0};const L=e=>({components:{UidsIowaBar:i},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),l=L.bind({});l.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var w,g,_;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(_=(g=r.parameters)==null?void 0:g.docs)==null?void 0:_.source}}};var f,b,B;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(B=(b=s.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var v,y,S;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(S=(y=c.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,I,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
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
})`,...(C=(I=l.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};const se=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{r as Default,c as Narrow,l as WithParentSiteTitle,s as WithSiteTitle,se as __namedExportsOrder,oe as default};
