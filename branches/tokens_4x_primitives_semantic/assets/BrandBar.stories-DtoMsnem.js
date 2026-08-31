import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t,t as n}from"./BrandBar-20BNW4VH.js";import{n as r,t as i}from"./BrandBarDocs-DApIT9Qt.js";var a,o,s,c,l,u,d,f,p;e((()=>{t(),r(),a={title:`Components/Branding/Brand Bar`,component:n,tags:[`autodocs`],argTypes:{narrow:{control:{type:`boolean`}},default:{control:{type:`text`}},second_row_content:{control:{type:`text`}},healthcare:{control:{type:`boolean`}}},parameters:{docs:{source:{code:null},page:i}}},o=e=>({components:{UidsIowaBar:n},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      {{ args.default }}
    </uids-iowa-bar>
  `}),s=o.bind({}),s.args={narrow:!1,default:``,second_row_content:``,healthcare:!1},c=e=>({components:{UidsIowaBar:n},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <h1 class="site-name">{{ args.default }}</h1>
    </uids-iowa-bar>
`}),l=c.bind({}),l.args={...s.args,default:`Brand`},u=c.bind({}),u.args={...l.args,narrow:!0},d=e=>({components:{UidsIowaBar:n},setup(){return{args:e}},template:`
    <uids-iowa-bar :healthcare="args.healthcare" :narrow="args.narrow">
      <div class="parent-site-name">{{ args.default }}</div>
      <template #second_row_content>
        <h1 class="site-name">{{ args.second_row_content }}</h1>
      </template>
    </uids-iowa-bar>
`}),f=d.bind({}),f.args={...s.args,default:`Brand`,second_row_content:`Icon Browser`},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
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
})`,...s.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
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
})`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => ({
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
})`,...u.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => ({
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
})`,...f.parameters?.docs?.source}}},p=[`Default`,`WithSiteTitle`,`Narrow`,`WithParentSiteTitle`]}))();export{s as Default,u as Narrow,f as WithParentSiteTitle,l as WithSiteTitle,p as __namedExportsOrder,a as default};