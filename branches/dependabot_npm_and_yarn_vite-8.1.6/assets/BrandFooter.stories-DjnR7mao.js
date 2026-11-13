import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{c as t,l as n,o as r,r as i,s as a,u as o}from"./blocks-D5J4d3ef.js";import{s}from"./chunk-LITCR56V-By6wHbBA.js";import{i as c}from"./react-BNRollqU.js";import{r as l}from"./iframe-Bh0nqqze.js";import{n as u,t as d}from"./package-CK3pg0vj.js";import{n as f}from"./BrandBarDocs-Drp_U9OL.js";import{n as p,t as m}from"./BrandFooter-Cl7PQmFU.js";function h(e){let o={a:`a`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...c(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(r,{isTemplate:!0}),`
`,(0,_.jsx)(n,{}),`
`,(0,_.jsx)(o.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsxs)(o.p,{children:[`Make sure you are familiar with the `,(0,_.jsx)(o.a,{href:`../?path=/docs/introduction#getting-started`,children:(0,_.jsx)(o.strong,{children:`Getting Started`})}),` guide first.`]}),`
`,(0,_.jsx)(o.p,{children:`Add the following files to your project:`}),`
`,(0,_.jsxs)(o.ul,{children:[`
`,(0,_.jsxs)(o.li,{children:[`
`,(0,_.jsx)(`strong`,{children:(0,_.jsx)(`a`,{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${u}/dist/css/components/logo.css`,children:`logo.css`})}),`
`]}),`
`,(0,_.jsxs)(o.li,{children:[`
`,(0,_.jsx)(`strong`,{children:(0,_.jsx)(`a`,{href:`https://github.com/uiowa/uids/tree/gh-pages/docs/v${u}/dist/css/components/brand-footer.css`,children:`brand-footer.css`})}),`
`]}),`
`]}),`
`,(0,_.jsx)(o.p,{children:`Refer to the HTML tab for example HTML.`}),`
`,(0,_.jsx)(a,{withSource:`none`}),`
`,(0,_.jsx)(o.h2,{id:`inputs`,children:`Inputs`}),`
`,(0,_.jsx)(o.p,{children:`The component accepts the following inputs (props):`}),`
`,(0,_.jsx)(i,{}),`
`,(0,_.jsx)(o.hr,{}),`
`,(0,_.jsx)(o.h2,{id:`additional-variations`,children:`Additional variations`}),`
`,(0,_.jsx)(o.p,{children:`Listed below are additional variations of the component.`}),`
`,(0,_.jsx)(t,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _,v=e((()=>{_=s(),l(),o(),d()})),y,b,x,S,C,w,T,E,D;e((()=>{p(),v(),f(),y={default:`Brand Manual`,healthcare:!1,parent_site_title:`Office of Strategic Communication`,contact_info:`
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
`},b={title:`Components/Branding/Brand Footer`,component:m,args:y,argTypes:{default:{control:{type:`text`},name:`Site name`},healthcare:{control:{type:`boolean`},name:`Healthcare`},parent_site_title:{control:{type:`text`},name:`Parent site name`},contact_info:{control:{type:`text`},name:`Contact information`}},parameters:{docs:{source:{code:null},page:g}}},x=e=>({components:{UidsIowaFooter:m},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div v-html="args.default"></div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info"></div>
    </uids-iowa-footer>
  `}),S=x.bind({}),S.args={},C=e=>({components:{UidsIowaFooter:m},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),w=C.bind({}),w.args={...S.args},T=e=>({components:{UidsIowaFooter:m},setup(){return{args:e}},template:`
    <uids-iowa-footer :healthcare="args.healthcare">
      <div class="site-name">{{ args.default }}</div>
      <div class="parent-site-name">{{ args.parent_site_title  }}</div>
      <div class="footer__links footer__links--icon" v-html="args.contact_info" ></div>
    </uids-iowa-footer>
  `}),E=T.bind({}),E.args={...S.args},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`args => ({
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
})`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`args => ({
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
})`,...w.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`args => ({
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
})`,...E.parameters?.docs?.source}}},D=[`Default`,`WithSiteTitle`,`WithParentSiteTitle`]}))();export{S as Default,E as WithParentSiteTitle,w as WithSiteTitle,D as __namedExportsOrder,b as default};