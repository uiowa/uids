import{k as b,c as d,f as e,a as x,l as c,m as C,t as T,n as I,y as B,o as p}from"./vue.esm-bundler--ETYdinE.js";import{_ as F}from"./Logo.vue_vue_type_script_setup_true_lang-BeIHPccp.js";import{_ as P}from"./_plugin-vue_export-helper-DlAUqK2U.js";import U from"./BrandFooterDocs-C_PxczZS.js";import"./index-DrYbSpXH.js";import"./index-DWqnpuYs.js";import"./package-CvWI4E4G.js";import"./iframe-D8xj7oB1.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";const $={name:"uids-iowa-footer",components:{UidsLogo:F},props:{parent_site_title:{type:String,default:""},contact_info:{type:String,default:""},healthcare:{type:Boolean,default:!1}},setup(t,a){const r=new Date().getFullYear();return{getClasses:b(()=>["footer"]),getYear:r}}},N={class:"footer__container footer__container--flex"},D={class:"footer__links footer__links--contact"},O={key:0},W={class:"socket"},Y={class:"socket__menu"};function A(t,a,r,l,y,H){const S=B("uids-logo");return p(),d("footer",{class:I(l.getClasses)},[e("div",N,[e("div",D,[x(S,{healthcare:r.healthcare,context:"footer"},null,8,["healthcare"]),c(t.$slots,"default"),r.parent_site_title?(p(),d("div",O,[c(t.$slots,"parent_site_title")])):C("",!0),c(t.$slots,"contact_info"),e("div",W,[e("ul",Y,[e("li",null,"© "+T(l.getYear)+" The University of Iowa",1),a[0]||(a[0]=e("li",null,[e("a",{href:"https://uiowa.edu/privacy"},"Privacy Notice")],-1)),a[1]||(a[1]=e("li",null,[e("a",{href:"https://opsmanual.uiowa.edu/community-policies/nondiscrimination-statement"},"UI Nondiscrimination Statement")],-1)),a[2]||(a[2]=e("li",null,[e("a",{href:"https://accessibility.uiowa.edu/"},"Accessibility")],-1))])])])])],2)}const i=P($,[["render",A]]),E=[{icon:"facebook-square",text:"Facebook"},{icon:"twitter-square",text:"Twitter"},{icon:"instagram",text:"Instagram"},{icon:"snapchat",text:"Snapchat"},{icon:"youtube",text:"Youtube"},{icon:"linkedin",text:"LinkedIn"},{icon:"pinterest",text:"Pinterest"}],L=`
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
`,V=`
  <nav role="navigation">
    <ul class="menu">
      ${E.map(t=>`
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${t.icon}"></i>
            <span class="link-text">${t.text}</span>
          </a>
        </li>
      `).join("")}
    </ul>
  </nav>
`,j={default:"Brand Manual",healthcare:!1,parent_site_title:"Office of Strategic Communication",contact_info:L+V},nt={title:"Components/Branding/Brand Footer",component:i,args:j,argTypes:{default:{control:{type:"text"},name:"Site name"},healthcare:{control:{type:"boolean"},name:"Healthcare"},parent_site_title:{control:{type:"text"},name:"Parent site name"},contact_info:{control:{type:"text"},name:"Contact information"}},parameters:{docs:{source:{code:null},page:U}}},q=t=>({components:{UidsIowaFooter:i},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),o=q.bind({});o.args={};const z=t=>({components:{UidsIowaFooter:i},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),s=z.bind({});s.args={...o.args};const M=t=>({components:{UidsIowaFooter:i},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),n=M.bind({});n.args={...o.args};var m,u,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
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
})`,...(f=(u=o.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var _,h,g;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const rt=["Default","WithSiteTitle","WithParentSiteTitle"];export{o as Default,n as WithParentSiteTitle,s as WithSiteTitle,rt as __namedExportsOrder,nt as default};
