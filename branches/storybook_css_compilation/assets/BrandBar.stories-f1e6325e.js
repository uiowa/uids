import{l,x as D,o as p,b as u,g as m,e as W,n as w,s as k,p as O}from"./vue.esm-bundler-dbb741ea.js";import{_ as V}from"./Logo-d17e5935.js";import P from"./BrandBarDocs-b4913285.js";import"./jsx-runtime-6847e7a4.js";import"./index-0ad56a94.js";import"./iframe-743136a8.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";import"./package-3c8c6b5c.js";import"./index-8c3ce2e1.js";const N={name:"uids-iowa-bar",components:{UidsLogo:V},props:{narrow:{type:Boolean,default:!1}},setup(e,a){const t=l(()=>{let n=["iowa-bar"];return(e.narrow||a.slots.second_row_content)&&n.push("iowa-bar--narrow"),n}),s=l(()=>a.slots.parent_title&&a.slots.parent_title().length||a.slots.bottom_content&&a.slots.bottom_content().length);return{getClasses:t,showBottomBar:s}}},x=(e,a)=>{const t=e.__vccOpts||e;for(const[s,n]of a)t[s]=n;return t},A={class:"iowa-bar__container"},E={key:0,class:"iowa-bar__below"},z={class:"iowa-bar__container"};function F(e,a,t,s,n,X){const $=D("uids-logo");return p(),u("header",{class:O(s.getClasses),"data-uids-header":""},[m("div",A,[W($),w(e.$slots,"default")]),e.$slots.second_row_content?(p(),u("div",E,[m("div",z,[w(e.$slots,"second_row_content")])])):k("",!0)],2)}const d=x(N,[["render",F]]);N.__docgenInfo={displayName:"uids-iowa-bar",description:`The UIDS IOWA Bar is the visual starting point for all
branded websites and applications.`,tags:{},exportName:"default",props:[{name:"narrow",description:"Determines whether to use the narrow version of the IOWA bar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Default slot shows content next to the logo."},{name:"second_row_content"}],sourceFiles:["/home/runner/work/uids/uids/src/components/brand-bar/BrandBar.vue"]};const re={title:"Components/Branding/Brand Bar",component:d,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}}},parameters:{docs:{source:{code:null},page:P}}},L=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=L.bind({});r.args={narrow:!1,default:"",second_row_content:""};const U=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),o=U.bind({});o.args={...r.args,default:"Brand"};const i=U.bind({});i.args={...o.args,narrow:!0};const M=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),c=M.bind({});c.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var _,g,f;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
