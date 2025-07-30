import{g as i,c as m,f as _,a as $,j as p,q as j,n as k,y as I,o as u}from"./vue.esm-bundler-CS6s2Jsr.js";import{_ as O}from"./Logo.vue_vue_type_script_setup_true_lang-B-WVss6K.js";import{_ as P}from"./_plugin-vue_export-helper-DlAUqK2U.js";import V from"./BrandBarDocs-BbBJFIE8.js";const z={name:"uids-iowa-bar",components:{UidsLogo:O},props:{narrow:{type:Boolean,default:!1},healthcare:{type:Boolean,default:!1}},setup(e,t){const l=i(()=>{let n=["iowa-bar"];return(e.narrow||t.slots.second_row_content)&&n.push("iowa-bar--narrow"),e.healthcare&&n.push("iowa-bar--healthcare"),n}),d=i(()=>t.slots.parent_title&&t.slots.parent_title().length||t.slots.bottom_content&&t.slots.bottom_content().length);return{getClasses:l,showBottomBar:d}}},E={class:"iowa-bar__container"},M={key:0,class:"iowa-bar__below"},U={class:"iowa-bar__container"};function q(e,t,l,d,n,x){const N=I("uids-logo");return u(),m("header",{class:k(d.getClasses),"data-uids-header":""},[_("div",E,[$(N,{healthcare:l.healthcare,context:"header"},null,8,["healthcare"]),p(e.$slots,"default")]),e.$slots.second_row_content?(u(),m("div",M,[_("div",U,[p(e.$slots,"second_row_content")])])):j("",!0)],2)}const C=P(z,[["render",q]]),L={title:"Components/Branding/Brand Bar",component:C,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:V}}},c={render:e=>({components:{UidsIowaBar:C},setup(){return{args:e}},template:`
      <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.second_row_content || args.narrow">
        <div v-if="args.second_row_content" class="parent-site-name">{{ args.default }}</div>
        <template v-if="args.second_row_content" #second_row_content>
          <h1 class="site-name">{{ args.second_row_content }}</h1>
        </template>
        <h1 v-else-if="args.default" class="site-name">{{ args.default }}</h1>
      </uids-iowa-bar>
    `})},a={name:"Default",...c,args:{narrow:!1,default:"",second_row_content:"",healthcare:!1}},r={name:"With site title",...c,args:{...a.args,default:"Brand"}},o={name:"Narrow",...c,args:{...a.args,narrow:!0}},s={name:"With parent site title",...c,args:{...a.args,default:"Brand",second_row_content:"Icon Browser"}};var h,f,g;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Default',
  ...Template,
  args: {
    narrow: false,
    default: '',
    second_row_content: '',
    healthcare: false
  }
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var w,B,b;r.parameters={...r.parameters,docs:{...(w=r.parameters)==null?void 0:w.docs,source:{originalSource:`{
  name: 'With site title',
  ...Template,
  args: {
    ...Default.args,
    default: \`Brand\`
  }
}`,...(b=(B=r.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var y,S,T;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: 'Narrow',
  ...Template,
  args: {
    ...Default.args,
    narrow: true
  }
}`,...(T=(S=o.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};var v,D,W;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  name: 'With parent site title',
  ...Template,
  args: {
    ...Default.args,
    default: 'Brand',
    second_row_content: 'Icon Browser'
  }
}`,...(W=(D=s.parameters)==null?void 0:D.docs)==null?void 0:W.source}}};const X=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"],J=Object.freeze(Object.defineProperty({__proto__:null,Default:a,Narrow:o,WithParentSiteTitle:s,WithSiteTitle:r,__namedExportsOrder:X,default:L},Symbol.toStringTag,{value:"Module"}));export{C as B,J as a};
