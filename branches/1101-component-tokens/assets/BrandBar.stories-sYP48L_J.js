import{i as e}from"./preload-helper-CN-IQmCb.js";import{n as t,r as n}from"./_border-fvDHmP26.js";import{n as r,t as i}from"./UserMenuExample-C4WCrXw9.js";import{n as a,t as o}from"./BrandBarDocs-Cdsq7Hm3.js";import{n as s,t as c}from"./componentTokens-YIIBn1DS.js";var l,u=e((()=>{l={"brand-bar":{$extensions:{"edu.uiowa.variants":{narrow:`.iowa-bar--narrow`}},$description:`IOWA brand bar.`,background:{$type:`color`,$value:`{color.background.gold}`,$description:`Bar fill.`},"site-name":{color:{$type:`color`,$value:`{color.link.gold}`},"font-family":{$type:`fontFamily`,$value:`{typography.font-family.roboto}`},"font-weight":{$type:`fontWeight`,$value:`{typography.font-weight.light}`},"line-height":{$type:`number`,$value:`{typography.line-height.100}`},"font-size":{$type:`dimension`,$value:`{typography.font-size.165}`,$extensions:{"edu.uiowa.responsive":{md:`{typography.font-size.195}`,standard:`{typography.font-size.220}`},"edu.uiowa.variant":{narrow:`{typography.font-size.120}`}}}}}}})),d=e((()=>{})),f,p,m,h,g,_,v,y,b,x;e((()=>{n(),r(),a(),u(),s(),d(),f={title:`Components/Branding/Brand Bar`,component:t,tags:[`autodocs`],decorators:[()=>({template:`<div class="sb-brand-bar-stories"><story /></div>`})],argTypes:{site_name:{control:{type:`text`},name:`Site name`},site_url:{control:{type:`text`},name:`Site URL`},site_name_element:{control:{type:`select`},options:[`h1`,`span`],name:`Site name element`},default:{name:`Content`,options:[`UserMenuExample`],control:{type:`select`,labels:{UserMenuExample:`User menu`}}},narrow:{control:{type:`boolean`},name:`Narrow`},healthcare:{control:{type:`boolean`},name:`Healthcare`}},parameters:{html:{root:`.sb-brand-bar-stories`},docs:{source:{code:null},page:o}}},p={...c(l),tags:[`!autodocs`,`noAddonsDrawer`]},m=e=>({components:{UidsIowaBar:t,UserMenuExample:i},setup(){return{args:e}},template:`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  `}),h=m.bind({}),h.args={site_name:``,site_url:`#`,site_name_element:`h1`,narrow:!1,healthcare:!1},g=m.bind({}),g.args={...h.args,site_name:`Brand`},_=m.bind({}),_.args={...g.args,narrow:!0},v=e=>({components:{UidsIowaBar:t,UserMenuExample:i},setup(){return{args:e}},template:`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
    <div class="sb-brand-bar-stories__row">
      <div class="sb-brand-bar-stories__row-container">
        <div class="site-name">Icon Browser</div>
      </div>
    </div>
  `}),y=v.bind({}),y.args={..._.args},b=m.bind({}),b.args={...g.args,default:`UserMenuExample`,narrow:!0},x=[`Tokens`,`Default`,`WithSiteTitle`,`Narrow`,`WithParentSiteTitle`,`ContentExamples`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...componentTokensStory(brandBarTokens),
  tags: ['!autodocs', 'noAddonsDrawer']
}`,...p.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar,
    UserMenuExample
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  \`
})`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar,
    UserMenuExample
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  \`
})`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar,
    UserMenuExample
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  \`
})`,..._.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar,
    UserMenuExample
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
    <div class="sb-brand-bar-stories__row">
      <div class="sb-brand-bar-stories__row-container">
        <div class="site-name">Icon Browser</div>
      </div>
    </div>
  \`
})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar,
    UserMenuExample
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="args.default" />
    </uids-iowa-bar>
  \`
})`,...b.parameters?.docs?.source}}}}))();export{b as ContentExamples,h as Default,_ as Narrow,p as Tokens,y as WithParentSiteTitle,g as WithSiteTitle,x as __namedExportsOrder,f as default};