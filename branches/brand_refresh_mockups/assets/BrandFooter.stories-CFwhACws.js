import{U as n}from"./BrandFooter-B9u7AJLE.js";import f from"./BrandFooterDocs-BXJRimeQ.js";import"./index-B0Mo5xF1.js";import"./vue.esm-bundler-Dl4EI7SU.js";import"./Logo.vue_vue_type_script_setup_true_lang-HxhJmcm0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-CfEheFc8.js";import"./package-CvWI4E4G.js";import"./iframe-BvI73NTP.js";import"../sb-preview/runtime.js";import"./index-i39XpuQg.js";import"./index-D-8MO0q_.js";import"./index-DrFu-skq.js";const h=[{icon:"facebook-square",text:"Facebook"},{icon:"twitter-square",text:"Twitter"},{icon:"instagram",text:"Instagram"},{icon:"snapchat",text:"Snapchat"},{icon:"youtube",text:"Youtube"},{icon:"linkedin",text:"LinkedIn"},{icon:"pinterest",text:"Pinterest"}],g=`
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
`,_=`
  <nav role="navigation">
    <ul class="menu">
      ${h.map(t=>`
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${t.icon}"></i>
            <span class="link-text">${t.text}</span>
          </a>
        </li>
      `).join("")}
    </ul>
  </nav>
`,v={default:"Brand Manual",healthcare:!1,parent_site_title:"Office of Strategic Communication",contact_info:g+_},$={title:"Components/Branding/Brand Footer",component:n,args:v,argTypes:{default:{control:{type:"text"},name:"Site name"},healthcare:{control:{type:"boolean"},name:"Healthcare"},parent_site_title:{control:{type:"text"},name:"Parent site name"},contact_info:{control:{type:"text"},name:"Contact information"}},parameters:{docs:{source:{code:null},page:f}}},w=t=>({components:{UidsIowaFooter:n},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),e=w.bind({});e.args={};const k=t=>({components:{UidsIowaFooter:n},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),a=k.bind({});a.args={...e.args};const b=t=>({components:{UidsIowaFooter:n},setup(){return{args:t}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),o=b.bind({});o.args={...e.args};var r,s,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
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
})`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var c,l,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
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
})`,...(d=(l=a.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,m,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`args => ({
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
})`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const j=["Default","WithSiteTitle","WithParentSiteTitle"];export{e as Default,o as WithParentSiteTitle,a as WithSiteTitle,j as __namedExportsOrder,$ as default};
