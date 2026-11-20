import{i as e}from"./preload-helper-CN-IQmCb.js";import{n as t,t as n}from"./Badge-BxuFj-ql.js";import{n as r,t as i}from"./Button-Cq6nNAfJ.js";import{n as a,t as o}from"./BrandBar-CXNzRI5b.js";import{n as s,t as c}from"./BrandBarDocs-CAxn62r_.js";var l=e((()=>{})),u,d,f,p,m,h,g,_,v,y;e((()=>{a(),t(),r(),s(),l(),u={none:``,badge:`<uids-badge type="secondary" text="Beta" />`,button:`<uids-button url="#" color="secondary" size="small" transparent>Apply now</uids-button>`},d={title:`Components/Branding/Brand Bar`,component:o,tags:[`autodocs`],decorators:[()=>({template:`<div class="sb-brand-bar-stories"><story /></div>`})],argTypes:{site_name:{control:{type:`text`},name:`Site name`},site_url:{control:{type:`text`},name:`Site URL`},site_name_element:{control:{type:`select`},options:[`h1`,`span`],name:`Site name element`},default:{name:`Content`,options:Object.keys(u),mapping:u,control:{type:`select`,labels:{none:`None`,badge:`Badge`,button:`Button`}}},narrow:{control:{type:`boolean`},name:`Narrow`},healthcare:{control:{type:`boolean`},name:`Healthcare`}},parameters:{html:{root:`.sb-brand-bar-stories`},docs:{source:{code:null},page:c}}},f=e=>({components:{UidsIowaBar:o},setup(){return{args:e,UidsBadge:n,UidsButton:i}},template:`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  `}),p=f.bind({}),p.args={site_name:``,site_url:``,site_name_element:`h1`,default:`none`,narrow:!1,healthcare:!1},m=f.bind({}),m.args={...p.args,site_name:`Brand`},h=f.bind({}),h.args={...m.args,narrow:!0},g=e=>({components:{UidsIowaBar:o},setup(){return{args:e,UidsBadge:n,UidsButton:i}},template:`
    <uids-iowa-bar
      :healthcare="args.healthcare"
      :narrow="args.narrow"
      :site_name="args.site_name"
      :site_url="args.site_url"
      :site_name_element="args.site_name_element"
    >
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
    <div class="sb-brand-bar-stories__row">
      <div class="sb-brand-bar-stories__row-container">
        <div class="site-name">Icon Browser</div>
      </div>
    </div>
  `}),_=g.bind({}),_.args={...p.args,narrow:!0,site_name:`Brand`,site_url:`#`},v=f.bind({}),v.args={...m.args,default:`badge`},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args,
      UidsBadge,
      UidsButton
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
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  \`
})`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args,
      UidsBadge,
      UidsButton
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
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  \`
})`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args,
      UidsBadge,
      UidsButton
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
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  \`
})`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args,
      UidsBadge,
      UidsButton
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
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
    <div class="sb-brand-bar-stories__row">
      <div class="sb-brand-bar-stories__row-container">
        <div class="site-name">Icon Browser</div>
      </div>
    </div>
  \`
})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsIowaBar
  },
  setup() {
    return {
      args,
      UidsBadge,
      UidsButton
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
      <component v-if="args.default" :is="{ components: { UidsBadge, UidsButton }, template: args.default }" />
    </uids-iowa-bar>
  \`
})`,...v.parameters?.docs?.source}}},y=[`Default`,`WithSiteTitle`,`Narrow`,`WithParentSiteTitle`,`ContentExamples`]}))();export{v as ContentExamples,p as Default,h as Narrow,_ as WithParentSiteTitle,m as WithSiteTitle,y as __namedExportsOrder,d as default};