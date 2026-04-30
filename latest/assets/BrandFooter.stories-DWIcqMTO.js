import{c as C,V as I,e as p,g as o,i as M,b as d,l as F,t as $,n as B,o as u,h as y,j as t,M as P,T as U,J as D,K as L,S as N}from"./iframe-BTbdoJxi.js";import{_ as A}from"./Logo.vue_vue_type_script_setup_true_lang-Citc1yBN.js";import{_ as E}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{v as h}from"./package-CidrV1oG.js";import"./preload-helper-CmP-MQqO.js";const O={name:"uids-iowa-footer",components:{UidsLogo:A},props:{parent_site_title:{type:String,default:""},contact_info:{type:String,default:""},healthcare:{type:Boolean,default:!1}},setup(s,e){const r=new Date().getFullYear();return{getClasses:C(()=>["footer"]),getYear:r}}},V={class:"footer__container footer__container--flex"},W={class:"footer__links footer__links--contact"},Y={key:0},H={class:"socket"},X={class:"socket__menu"};function q(s,e,r,l,S,et){const T=I("uids-logo");return u(),p("footer",{class:B(l.getClasses)},[o("div",V,[o("div",W,[M(T,{healthcare:r.healthcare,context:"footer"},null,8,["healthcare"]),d(s.$slots,"default"),r.parent_site_title?(u(),p("div",Y,[d(s.$slots,"parent_site_title")])):F("",!0),d(s.$slots,"contact_info"),o("div",H,[o("ul",X,[o("li",null,"© "+$(l.getYear)+" The University of Iowa",1),e[0]||(e[0]=o("li",null,[o("a",{href:"https://uiowa.edu/privacy"},"Privacy Notice")],-1)),e[1]||(e[1]=o("li",null,[o("a",{href:"https://policy.uiowa.edu/community-policies/nondiscrimination-statement"},"UI Nondiscrimination Statement")],-1)),e[2]||(e[2]=o("li",null,[o("a",{href:"https://accessibility.uiowa.edu/"},"Accessibility")],-1))])])])])],2)}const c=E(O,[["render",q]]);function f(s){const e={a:"a",h2:"h2",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...y(),...s.components};return t.jsxs(t.Fragment,{children:[t.jsx(P,{isTemplate:!0}),`
`,t.jsx(U,{}),`
`,t.jsx(e.h2,{id:"usage",children:"Usage"}),`
`,t.jsxs(e.p,{children:["Make sure you are familiar with the ",t.jsx(e.a,{href:"../?path=/docs/introduction#getting-started",children:t.jsx(e.strong,{children:"Getting Started"})})," guide first."]}),`
`,t.jsx(e.p,{children:"Add the following files to your project:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:[`
`,t.jsx("strong",{children:t.jsx("a",{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${h}/dist/css/components/logo.css`,children:"logo.css"})}),`
`]}),`
`,t.jsxs(e.li,{children:[`
`,t.jsx("strong",{children:t.jsx("a",{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${h}/dist/css/components/brand-footer.css`,children:"brand-footer.css"})}),`
`]}),`
`]}),`
`,t.jsx(e.p,{children:"Refer to the HTML tab for example HTML."}),`
`,t.jsx(D,{withSource:"none"}),`
`,t.jsx(e.h2,{id:"inputs",children:"Inputs"}),`
`,t.jsx(e.p,{children:"The component accepts the following inputs (props):"}),`
`,t.jsx(L,{}),`
`,t.jsx(e.hr,{}),`
`,t.jsx(e.h2,{id:"additional-variations",children:"Additional variations"}),`
`,t.jsx(e.p,{children:"Listed below are additional variations of the component."}),`
`,t.jsx(N,{})]})}function z(s={}){const{wrapper:e}={...y(),...s.components};return e?t.jsx(e,{...s,children:t.jsx(f,{...s})}):f(s)}const R=[{icon:"facebook-square",text:"Facebook"},{icon:"twitter-square",text:"Twitter"},{icon:"instagram",text:"Instagram"},{icon:"snapchat",text:"Snapchat"},{icon:"youtube",text:"Youtube"},{icon:"linkedin",text:"LinkedIn"},{icon:"pinterest",text:"Pinterest"}],G=`
  <p>
    300 Plaza Centre One<br>
    Iowa City, Iowa 52242<br>
    <a href="tel:319-384-0019">
      <span class="fa-phone fas" role="presentation"></span> 319-384-0019
    </a><br>
    <a href="mailto:osc-brand@uiowa.edu?subject=OSC Contact Email:">
      <span class="fa-envelope fas" role="presentation"></span> osc-brand@uiowa.edu
    </a>
  </p>
`,J=`
  <nav role="navigation">
    <ul class="menu">
      ${R.map(s=>`
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${s.icon}"></i>
            <span class="link-text">${s.text}</span>
          </a>
        </li>
      `).join("")}
    </ul>
  </nav>
`,K={default:"Brand Manual",healthcare:!1,parent_site_title:"Office of Strategic Communication",contact_info:G+J},rt={title:"Components/Branding/Brand Footer",component:c,args:K,argTypes:{default:{control:{type:"text"},name:"Site name"},healthcare:{control:{type:"boolean"},name:"Healthcare"},parent_site_title:{control:{type:"text"},name:"Parent site name"},contact_info:{control:{type:"text"},name:"Contact information"}},parameters:{docs:{source:{code:null},page:z}}},Q=s=>({components:{UidsIowaFooter:c},setup(){return{args:s}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),n=Q.bind({});n.args={};const Z=s=>({components:{UidsIowaFooter:c},setup(){return{args:s}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),a=Z.bind({});a.args={...n.args};const tt=s=>({components:{UidsIowaFooter:c},setup(){return{args:s}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),i=tt.bind({});i.args={...n.args};var m,_,g;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaFooter
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  \`
})`,...(g=(_=n.parameters)==null?void 0:_.docs)==null?void 0:g.source}}};var v,x,w;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaFooter
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  \`
})`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var j,k,b;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaFooter
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  \`
})`,...(b=(k=i.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};const ct=["Default","WithSiteTitle","WithParentSiteTitle"];export{n as Default,i as WithParentSiteTitle,a as WithSiteTitle,ct as __namedExportsOrder,rt as default};
