import{B as i}from"./BrandBar-C7w9vJks.js";import{h as B,j as e,M as S,T as v,J as y,K as I,S as M}from"./iframe-B7zao0CB.js";import{v as c}from"./package-CvWI4E4G.js";import"./Logo.vue_vue_type_script_setup_true_lang-BKC9w3PP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./preload-helper-CmP-MQqO.js";function d(r){const a={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...B(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(S,{isTemplate:!0}),`
`,e.jsx(v,{}),`
`,e.jsx(a.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(a.p,{children:["Make sure you are familiar with the ",e.jsx(a.a,{href:"../?path=/docs/introduction#getting-started",children:e.jsx(a.strong,{children:"Getting Started"})})," guide first."]}),`
`,e.jsx(a.p,{children:"Add the following files to your project:"}),`
`,e.jsxs(a.ul,{children:[`
`,e.jsxs(a.li,{children:[`
`,e.jsx("strong",{children:e.jsx("a",{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${c}/dist/css/components/logo.css`,children:"logo.css"})}),`
`]}),`
`,e.jsxs(a.li,{children:[`
`,e.jsx("strong",{children:e.jsx("a",{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${c}/dist/css/components/brand-bar.css`,children:"brand-bar.css"})}),`
`]}),`
`]}),`
`,e.jsx(a.p,{children:"Refer to the HTML tab for example HTML."}),`
`,e.jsx(y,{withSource:"none"}),`
`,e.jsx(a.h2,{id:"inputs",children:"Inputs"}),`
`,e.jsx(a.p,{children:"The component accepts the following inputs (props):"}),`
`,e.jsx(I,{}),`
`,e.jsx(a.hr,{}),`
`,e.jsx(a.h2,{id:"additional-variations",children:"Additional variations"}),`
`,e.jsx(a.p,{children:"Listed below are additional variations of the component."}),`
`,e.jsx(M,{})]})}function U(r={}){const{wrapper:a}={...B(),...r.components};return a?e.jsx(a,{...r,children:e.jsx(d,{...r})}):d(r)}const H={title:"Components/Branding/Brand Bar",component:i,tags:["autodocs"],argTypes:{narrow:{control:{type:"boolean"}},default:{control:{type:"text"}},second_row_content:{control:{type:"text"}},healthcare:{control:{type:"boolean"}}},parameters:{docs:{source:{code:null},page:U}}},C=r=>({components:{UidsIowaBar:i},setup(){return{args:r}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),n=C.bind({});n.args={narrow:!1,default:"",second_row_content:"",healthcare:!1};const T=r=>({components:{UidsIowaBar:i},setup(){return{args:r}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),s=T.bind({});s.args={...n.args,default:"Brand"};const t=T.bind({});t.args={...s.args,narrow:!0};const D=r=>({components:{UidsIowaBar:i},setup(){return{args:r}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),o=D.bind({});o.args={...n.args,default:"Brand",second_row_content:"Icon Browser"};var l,h,p;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
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
})`,...(p=(h=n.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var u,m,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var w,x,f;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var j,b,_;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`args => ({
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
})`,...(_=(b=o.parameters)==null?void 0:b.docs)==null?void 0:_.source}}};const N=["Default","WithSiteTitle","Narrow","WithParentSiteTitle"];export{n as Default,t as Narrow,o as WithParentSiteTitle,s as WithSiteTitle,N as __namedExportsOrder,H as default};
