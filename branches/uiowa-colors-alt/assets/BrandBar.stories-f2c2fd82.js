import{j as l,o as p,b as u,g as m,e as D,l as w,p as W,n as k,v as O}from"./vue.esm-bundler-f09df2bf.js";import{_ as V}from"./Logo-9bb39cfe.js";import P from"./BrandBarDocs-d97d1ce2.js";import"./jsx-runtime-6b99b67f.js";import"./index-83984ae4.js";import"./iframe-a853f639.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";import"./package-3c8c6b5c.js";import"./index-bfbe9146.js";const N={name:"uids-iowa-bar",components:{UidsLogo:V},props:{narrow:{type:Boolean,default:!1}},setup(e,a){const t=l(()=>{let n=["iowa-bar"];return(e.narrow||a.slots.second_row_content)&&n.push("iowa-bar--narrow"),n}),s=l(()=>a.slots.parent_title&&a.slots.parent_title().length||a.slots.bottom_content&&a.slots.bottom_content().length);return{getClasses:t,showBottomBar:s}}},A=(e,a)=>{const t=e.__vccOpts||e;for(const[s,n]of a)t[s]=n;return t},E={class:"iowa-bar__container"},j={key:0,class:"iowa-bar__below"},x={class:"iowa-bar__container"};function z(e,a,t,s,n,M){const $=O("uids-logo");return p(),u("header",{class:k(s.getClasses),"data-uids-header":""},[m("div",E,[D($),w(e.$slots,"default")]),e.$slots.second_row_content?(p(),u("div",j,[m("div",x,[w(e.$slots,"second_row_content")])])):W("",!0)],2)}const d=A(N,[["render",z]]);N.__docgenInfo={displayName:"uids-iowa-bar",description:`The UIDS IOWA Bar is the visual starting point for all
branded websites and applications.`,tags:{},exportName:"default",props:[{name:"narrow",description:"Determines whether to use the narrow version of the IOWA bar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Default slot shows content next to the logo."},{name:"second_row_content"}],sourceFiles:["/home/runner/work/uids/uids/src/components/brand-bar/BrandBar.vue"]};const re={title:"Components/Branding/Brand Bar",component:d,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}}},parameters:{docs:{source:{code:null},page:P}}},F=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=F.bind({});r.args={narrow:!1,default:"",second_row_content:""};const U=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),o=U.bind({});o.args={...r.args,default:"Brand"};const i=U.bind({});i.args={...o.args,narrow:!0};const L=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),c=L.bind({});c.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var _,g,f;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  \`
})`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,h,B;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(B=(h=o.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var v,S,T;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
\`
})`,...(T=(S=i.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var I,y,C;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
\`
})`,...(C=(y=c.parameters)==null?void 0:y.docs)==null?void 0:C.source}}};const oe=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{r as Default,i as Narrow,c as WithParentSiteTitle,o as WithSiteTitle,oe as __namedExportsOrder,re as default};
