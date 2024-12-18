import{k as b,c as d,f as e,a as x,p as c,q as C,t as I,n as T,y as B,o as p}from"./vue.esm-bundler-BcQIfK0R.js";import{_ as F}from"./Logo.vue_vue_type_script_setup_true_lang-1Jsi0mLw.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import P from"./BrandFooterDocs-28QLh6gn.js";import"./index-NsRIBgo-.js";import"./index-BhIPGmrP.js";import"./package-CvP6qD27.js";import"./iframe-BKp6AYYJ.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";const $={name:"uids-iowa-footer",components:{UidsLogo:F},props:{parent_site_title:{type:String,default:""},contact_info:{type:String,default:""},healthcare:{type:Boolean,default:!1}},setup(t,a){const i=new Date().getFullYear();return{getClasses:b(()=>["footer"]),getYear:i}}},N={class:"footer__container footer__container--flex"},D={class:"footer__links footer__links--contact"},A={key:0},L={class:"socket"},O={class:"socket__menu"};function W(t,a,i,l,y,H){const S=B("uids-logo");return p(),d("footer",{class:T(l.getClasses)},[e("div",N,[e("div",D,[x(S,{healthcare:i.healthcare,context:"footer"},null,8,["healthcare"]),c(t.$slots,"default"),i.parent_site_title?(p(),d("div",A,[c(t.$slots,"parent_site_title")])):C("",!0),c(t.$slots,"contact_info"),e("div",L,[e("ul",O,[e("li",null,"© "+I(l.getYear)+" The University of Iowa",1),a[0]||(a[0]=e("li",null,[e("a",{href:"https://uiowa.edu/privacy"},"Privacy Notice")],-1)),a[1]||(a[1]=e("li",null,[e("a",{href:"https://opsmanual.uiowa.edu/community-policies/nondiscrimination-statement"},"UI Nondiscrimination Statement")],-1)),a[2]||(a[2]=e("li",null,[e("a",{href:"https://uiowa.edu/accessibility"},"Accessibility")],-1)),a[3]||(a[3]=e("li",null,[e("a",{href:"https://nativeamericancouncil.org.uiowa.edu"},"UI Indigenous Land Acknowledgement")],-1))])])])])],2)}const r=U($,[["render",W]]),Y=[{icon:"facebook-square",text:"Facebook"},{icon:"twitter-square",text:"Twitter"},{icon:"instagram",text:"Instagram"},{icon:"snapchat",text:"Snapchat"},{icon:"youtube",text:"Youtube"},{icon:"linkedin",text:"LinkedIn"},{icon:"pinterest",text:"Pinterest"}],q=`
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
`,V={default:"Brand Manual",healthcare:!1,parent_site_title:"Office of Strategic Communication",contact_info:q+E},nt={title:"Components/Branding/Brand Footer",component:r,args:V,argTypes:{default:{control:{type:"text"},name:"Site name"},healthcare:{control:{type:"boolean"},name:"Healthcare"},parent_site_title:{control:{type:"text"},name:"Parent site name"},contact_info:{control:{type:"text"},name:"Contact information"}},parameters:{docs:{source:{code:null},page:P}}},j=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),o=j.bind({});o.args={};const z=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),s=z.bind({});s.args={...o.args};const M=t=>({components:{UidsIowaFooter:r},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),n=M.bind({});n.args={...o.args};var u,m,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(f=(m=o.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var _,h,g;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const it=["Default","WithSiteTitle","WithParentSiteTitle"];export{o as Default,n as WithParentSiteTitle,s as WithSiteTitle,it as __namedExportsOrder,nt as default};
