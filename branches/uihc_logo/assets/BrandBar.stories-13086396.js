import{j as u,o as d,b as p,g as m,e as W,l as w,p as $,n as k,v as V}from"./vue.esm-bundler-f09df2bf.js";import{_ as O}from"./Logo-51108b06.js";import P from"./BrandBarDocs-5716ae02.js";import"./jsx-runtime-6eef64cc.js";import"./index-c013ead5.js";import"./_commonjsHelpers-725317a4.js";import"./index-ed5adb68.js";import"./iframe-9efcd291.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-38ad35d1.js";import"./index-356e4a49.js";import"./package-3c8c6b5c.js";import"./index-dc1d5b46.js";const N={name:"uids-iowa-bar",components:{UidsLogo:O},props:{narrow:{type:Boolean,default:!1},uihc:{type:Boolean,default:!1}},setup(e,a){const o=u(()=>{let s=["iowa-bar"];return(e.narrow||a.slots.second_row_content)&&s.push("iowa-bar--narrow"),e.uihc&&s.push("iowa-bar--uihc"),s}),n=u(()=>a.slots.parent_title&&a.slots.parent_title().length||a.slots.bottom_content&&a.slots.bottom_content().length);return{getClasses:o,showBottomBar:n}}},A=(e,a)=>{const o=e.__vccOpts||e;for(const[n,s]of a)o[n]=s;return o},E={class:"iowa-bar__container"},j={key:0,class:"iowa-bar__below"},x={class:"iowa-bar__container"};function z(e,a,o,n,s,M){const D=V("uids-logo");return d(),p("header",{class:k(n.getClasses),"data-uids-header":""},[m("div",E,[W(D,{uihc:o.uihc},null,8,["uihc"]),w(e.$slots,"default")]),e.$slots.second_row_content?(d(),p("div",j,[m("div",x,[w(e.$slots,"second_row_content")])])):$("",!0)],2)}const l=A(N,[["render",z]]);N.__docgenInfo={displayName:"uids-iowa-bar",description:`The UIDS IOWA Bar is the visual starting point for all
branded websites and applications.`,tags:{},exportName:"default",props:[{name:"narrow",description:"Determines whether to use the narrow version of the IOWA bar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"uihc",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Default slot shows content next to the logo."},{name:"second_row_content"}],sourceFiles:["/home/runner/work/uids/uids/src/components/brand-bar/BrandBar.vue"]};const se={title:"Components/Branding/Brand Bar",component:l,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},uihc:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:P}}},F=e=>({components:{UidsIowaBar:l},setup(){return{args:e}},template:`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=F.bind({});r.args={narrow:!1,default:"",second_row_content:"",uihc:!1};const U=e=>({components:{UidsIowaBar:l},setup(){return{args:e}},template:`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),t=U.bind({});t.args={...r.args,default:"Brand"};const i=U.bind({});i.args={...t.args,narrow:!0};const L=e=>({components:{UidsIowaBar:l},setup(){return{args:e}},template:`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),c=L.bind({});c.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var g,h,_;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  \`
})`,...(_=(h=r.parameters)==null?void 0:h.docs)==null?void 0:_.source}}};var f,b,B;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(B=(b=t.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var v,y,S;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var T,I,C;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :uihc="args.uihc" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
\`
})`,...(C=(I=c.parameters)==null?void 0:I.docs)==null?void 0:C.source}}};const te=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{r as Default,i as Narrow,c as WithParentSiteTitle,t as WithSiteTitle,te as __namedExportsOrder,se as default};
