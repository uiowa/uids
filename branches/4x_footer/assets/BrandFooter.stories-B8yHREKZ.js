import{k as x,c as d,e,a as S,p as c,q as C,t as I,n as T,v as B,o as p}from"./vue.esm-bundler-B7frGVmg.js";import{_ as F}from"./Logo.vue_vue_type_script_setup_true_lang-BMN2rfBf.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-D3zV3h34.js";import $ from"./BrandBarDocs-DLsMrY9p.js";import"./iframe-hhRoXBGX.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";import"./index-WRzX0MZV.js";import"./package-C7Jar9vF.js";const N={name:"uids-iowa-footer",components:{UidsLogo:F},props:{parent_site_title:{type:String,default:""},contact_info:{type:String,default:""},healthcare:{type:Boolean,default:!1}},setup(t,o){const i=new Date().getFullYear();return{getClasses:x(()=>["footer"]),getYear:i}}},P={class:"footer__container footer__container--flex"},D={class:"footer__links footer__links--contact"},A={key:0},L={class:"socket"},O={class:"socket__menu"};function W(t,o,i,l,y,X){const b=B("uids-logo");return p(),d("footer",{class:T(l.getClasses)},[e("div",P,[e("div",D,[S(b,{healthcare:i.healthcare,context:"footer"},null,8,["healthcare"]),c(t.$slots,"default"),i.parent_site_title?(p(),d("div",A,[c(t.$slots,"parent_site_title")])):C("",!0),c(t.$slots,"contact_info"),e("div",L,[e("ul",O,[e("li",null,"© "+I(l.getYear)+" The University of Iowa",1),o[0]||(o[0]=e("li",null,[e("a",{href:"https://uiowa.edu/privacy"},"Privacy Notice")],-1)),o[1]||(o[1]=e("li",null,[e("a",{href:"https://opsmanual.uiowa.edu/community-policies/nondiscrimination-statement"},"UI Nondiscrimination Statement")],-1)),o[2]||(o[2]=e("li",null,[e("a",{href:"https://uiowa.edu/accessibility"},"Accessibility")],-1)),o[3]||(o[3]=e("li",null,[e("a",{href:"https://nativeamericancouncil.org.uiowa.edu"},"UI Indigenous Land Acknowledgement")],-1))])])])])],2)}const r=U(N,[["render",W]]),Y=[{icon:"facebook-square",text:"Facebook"},{icon:"twitter-square",text:"Twitter"},{icon:"instagram",text:"Instagram"},{icon:"snapchat",text:"Snapchat"},{icon:"youtube",text:"Youtube"},{icon:"linkedin",text:"LinkedIn"},{icon:"pinterest",text:"Pinterest"}],q=`
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
`,E=`
  <nav role="navigation">
    <ul class="menu">
      ${Y.map(t=>`
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${t.icon}"></i>
            <span class="link-text">${t.text}</span>
          </a>
        </li>
      `).join("")}
    </ul>
  </nav>
`,V={default:"Brand Manual",healthcare:!1,parent_site_title:"Office of Strategic Communication",contact_info:q+E},nt={title:"Components/Branding/Brand Footer",component:r,args:V,argTypes:{default:{control:{type:"text"}},healthcare:{control:{type:"boolean"}},parent_site_title:{control:{type:"text"}},contact_info:{control:{type:"text"}}},parameters:{docs:{source:{code:null},page:$}}},j=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),a=j.bind({});a.args={};const z=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),s=z.bind({});s.args={};const M=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),n=M.bind({});n.args={};var u,m,f;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(f=(m=a.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var _,h,g;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(g=(h=s.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var v,w,k;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const it=["Default","WithSiteTitle","WithParentSiteTitle"];export{a as Default,n as WithParentSiteTitle,s as WithSiteTitle,it as __namedExportsOrder,nt as default};
