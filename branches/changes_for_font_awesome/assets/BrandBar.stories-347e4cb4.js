import{j as l,x as $,b as u,f as p,e as k,m,s as D,n as O,o as w}from"./vue.esm-bundler-c04f16a9.js";import{U as V}from"./Logo-34a104c0.js";const P=(e,a)=>{const n=e.__vccOpts||e;for(const[o,t]of a)n[o]=t;return n},N={name:"uids-iowa-bar",components:{UidsLogo:V},props:{narrow:{type:Boolean,default:!1}},setup(e,a){const n=l(()=>{let t=["iowa-bar"];return(e.narrow||a.slots.second_row_content)&&t.push("iowa-bar--narrow"),t}),o=l(()=>a.slots.parent_title&&a.slots.parent_title().length||a.slots.bottom_content&&a.slots.bottom_content().length);return{getClasses:n,showBottomBar:o}}},x={class:"iowa-bar__container"},A={key:0,class:"iowa-bar__below"},E={class:"iowa-bar__container"};function j(e,a,n,o,t,L){const W=$("uids-logo");return w(),u("header",{class:O(o.getClasses),"data-uids-header":""},[p("div",x,[k(W),m(e.$slots,"default")]),e.$slots.second_row_content?(w(),u("div",A,[p("div",E,[m(e.$slots,"second_row_content")])])):D("",!0)],2)}const d=P(N,[["render",j]]);N.__docgenInfo={displayName:"uids-iowa-bar",description:`The UIDS IOWA Bar is the visual starting point for all
branded websites and applications.`,tags:{},exportName:"default",props:[{name:"narrow",description:"Determines whether to use the narrow version of the IOWA bar.",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],slots:[{name:"default",description:"Default slot shows content next to the logo."},{name:"second_row_content"}],sourceFiles:["/home/runner/work/uids/uids/src/components/brand-bar/BrandBar.vue"]};const H={title:"Components/Branding/Brand Bar",component:d,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}}},parameters:{docs:{source:{code:null}}}},z=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),r=z.bind({});r.args={narrow:!1,default:"",second_row_content:""};const C=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),s=C.bind({});s.args={...r.args,default:"Brand"};const i=C.bind({});i.args={...s.args,narrow:!0};const F=e=>({components:{UidsIowaBar:d},setup(){return{args:e}},template:`
    <uids-iowa-bar :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),c=F.bind({});c.args={...r.args,default:"Brand",second_row_content:"Icon Browser"};var _,g,b;r.parameters={...r.parameters,docs:{...(_=r.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(b=(g=r.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var f,h,B;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(B=(h=s.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var v,S,T;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(T=(S=i.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var I,y,U;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`args => ({
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
})`,...(U=(y=c.parameters)==null?void 0:y.docs)==null?void 0:U.source}}};const J=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{r as Default,i as Narrow,c as WithParentSiteTitle,s as WithSiteTitle,J as __namedExportsOrder,H as default};
