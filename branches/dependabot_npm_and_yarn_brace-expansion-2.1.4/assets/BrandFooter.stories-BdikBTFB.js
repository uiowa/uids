import{i as e}from"./preload-helper-CNh7eu1x.js";import{$ as t,B as n,H as r,I as i,Q as a,St as o,X as s,a as c,at as l,bt as u,c as d,d as f,f as p,ft as m,l as h,nt as g,pt as _,tt as v,u as y,ut as b}from"./iframe-BMuxhLAH.js";import{n as x,t as S}from"./package-CgnA0-ja.js";import{n as C,t as w}from"./Logo-DTNZYsXX.js";import{n as T,t as E}from"./_plugin-vue_export-helper-DXFL-_UU.js";import{n as D}from"./BrandBarDocs-B-cnGulx.js";var O=e((()=>{})),k,A=e((()=>{s(),O(),C(),k={name:`uids-iowa-footer`,components:{UidsLogo:w},props:{parent_site_title:{type:String,default:``},contact_info:{type:String,default:``},healthcare:{type:Boolean,default:!1}},setup(e,t){let n=new Date().getFullYear();return{getClasses:a(()=>[`footer`]),getYear:n}}}}));function j(e,n,r,i,a,s){let c=_(`uids-logo`);return b(),g(`footer`,{class:u(i.getClasses)},[t(`div`,M,[t(`div`,N,[l(c,{healthcare:r.healthcare,context:`footer`},null,8,[`healthcare`]),m(e.$slots,`default`),r.parent_site_title?(b(),g(`div`,P,[m(e.$slots,`parent_site_title`)])):v(``,!0),m(e.$slots,`contact_info`),t(`div`,F,[t(`ul`,I,[t(`li`,null,`© `+o(i.getYear)+` The University of Iowa`,1),n[0]||=t(`li`,null,[t(`a`,{href:`https://uiowa.edu/privacy`},`Privacy Notice`)],-1),n[1]||=t(`li`,null,[t(`a`,{href:`https://policy.uiowa.edu/community-policies/nondiscrimination-statement`},`UI Nondiscrimination Statement`)],-1),n[2]||=t(`li`,null,[t(`a`,{href:`https://accessibility.uiowa.edu/`},`Accessibility`)],-1)])])])])],2)}var M,N,P,F,I,L,R=e((()=>{A(),A(),s(),T(),M={class:`footer__container footer__container--flex`},N={class:`footer__links footer__links--contact`},P={key:0},F={class:`socket`},I={class:`socket__menu`},L=E(k,[[`render`,j]])}));function z(e){let t={a:`a`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(d,{isTemplate:!0}),`
`,(0,V.jsx)(f,{}),`
`,(0,V.jsx)(t.h2,{id:`usage`,children:`Usage`}),`
`,(0,V.jsxs)(t.p,{children:[`Make sure you are familiar with the `,(0,V.jsx)(t.a,{href:`../?path=/docs/introduction#getting-started`,children:(0,V.jsx)(t.strong,{children:`Getting Started`})}),` guide first.`]}),`
`,(0,V.jsx)(t.p,{children:`Add the following files to your project:`}),`
`,(0,V.jsxs)(t.ul,{children:[`
`,(0,V.jsxs)(t.li,{children:[`
`,(0,V.jsx)(`strong`,{children:(0,V.jsx)(`a`,{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${x}/dist/css/components/logo.css`,children:`logo.css`})}),`
`]}),`
`,(0,V.jsxs)(t.li,{children:[`
`,(0,V.jsx)(`strong`,{children:(0,V.jsx)(`a`,{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${x}/dist/css/components/brand-footer.css`,children:`brand-footer.css`})}),`
`]}),`
`]}),`
`,(0,V.jsx)(t.p,{children:`Refer to the HTML tab for example HTML.`}),`
`,(0,V.jsx)(h,{withSource:`none`}),`
`,(0,V.jsx)(t.h2,{id:`inputs`,children:`Inputs`}),`
`,(0,V.jsx)(t.p,{children:`The component accepts the following inputs (props):`}),`
`,(0,V.jsx)(c,{}),`
`,(0,V.jsx)(t.hr,{}),`
`,(0,V.jsx)(t.h2,{id:`additional-variations`,children:`Additional variations`}),`
`,(0,V.jsx)(t.p,{children:`Listed below are additional variations of the component.`}),`
`,(0,V.jsx)(y,{})]})}function B(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,V.jsx)(t,{...e,children:(0,V.jsx)(z,{...e})}):z(e)}var V,H=e((()=>{V=r(),i(),p(),S()})),U,W,G,K,q,J,Y,X,Z;e((()=>{R(),H(),D(),U={default:`Brand Manual`,healthcare:!1,parent_site_title:`Office of Strategic Communication`,contact_info:`
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

  <nav role="navigation">
    <ul class="menu">
      ${[{icon:`facebook-square`,text:`Facebook`},{icon:`twitter-square`,text:`Twitter`},{icon:`instagram`,text:`Instagram`},{icon:`snapchat`,text:`Snapchat`},{icon:`youtube`,text:`Youtube`},{icon:`linkedin`,text:`LinkedIn`},{icon:`pinterest`,text:`Pinterest`}].map(e=>`
        <li>
          <a href="https://uiowa.edu/">
            <i class="fab fa-${e.icon}"></i>
            <span class="link-text">${e.text}</span>
          </a>
        </li>
      `).join(``)}
    </ul>
  </nav>
`},W={title:`Components/Branding/Brand Footer`,component:L,args:U,argTypes:{default:{control:{type:`text`},name:`Site name`},healthcare:{control:{type:`boolean`},name:`Healthcare`},parent_site_title:{control:{type:`text`},name:`Parent site name`},contact_info:{control:{type:`text`},name:`Contact information`}},parameters:{docs:{source:{code:null},page:B}}},G=e=>({components:{UidsIowaFooter:L},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),K=G.bind({}),K.args={},q=e=>({components:{UidsIowaFooter:L},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),J=q.bind({}),J.args={...K.args},Y=e=>({components:{UidsIowaFooter:L},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),X=Y.bind({}),X.args={...K.args},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`args => ({
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
})`,...K.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`args => ({
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
})`,...J.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`args => ({
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
})`,...X.parameters?.docs?.source}}},Z=[`Default`,`WithSiteTitle`,`WithParentSiteTitle`]}))();export{K as Default,X as WithParentSiteTitle,J as WithSiteTitle,Z as __namedExportsOrder,W as default};