import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t,t as n}from"./background-D9TKct7-.js";import{i as r,n as i,r as a,t as o}from"./GridItem-aFPeTW4G.js";import{n as s,t as c}from"./Stat-C2dWnktL.js";var l,u,d,f,p,m,h;e((()=>{s(),t(),r(),i(),l={title:`Components/Stat`,component:c,tags:[`autodocs`],argTypes:{display:{control:`select`,name:`Display`,options:[`default`,`horizontal`]},stat_title:{control:`text`,name:`Title`},stat_summary:{control:`text`,name:`Summary`},stat_content:{control:`text`,name:`Content`},stat_prefix:{control:`text`,name:`Prefix`},stat_suffix:{control:`text`,name:`Suffix`},stat_hover:{name:`Hover`},...n.argTypes}},u=e=>({components:{UidsStat:c},setup(){return{args:e}},template:`<uids-stat v-bind="args" />`}),d=u.bind({}),d.args={display:`default`,stat_title:`15:1`,stat_summary:`student-to-faculty ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_prefix:``,stat_suffix:`+`,stat_hover:!0},f=u.bind({}),f.args={display:`horizontal`,stat_title:`15:1`,stat_summary:`student-to-faculty<br /> ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_hover:!0},p=e=>({components:{UidsGrid:a,UidsGridItem:o,UidsStat:c},setup(){return{args:e}},template:`
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-stat
            :display="args.display || 'default'"
            :stat_title="args.stat_title"
            :stat_summary="args.stat_summary"
            :stat_content="args.stat_content"
            :stat_prefix="args.stat_prefix"
            :stat_suffix="args.stat_suffix"
            :stat_hover="args.stat_hover"
          />
        </uids-grid-item>
      </uids-grid>
    </div>
  `}),m=p.bind({}),m.args={display:`default`,grid_type:`threecol--33-34-33`,record_count:6,stat_title:`15:1`,stat_summary:`student-to-faculty ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_prefix:``,stat_suffix:`+`,stat_hover:!0},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...f.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsGrid,
    UidsGridItem,
    UidsStat
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <div style="padding-top: 2rem; padding-bottom: 2rem;">
      <uids-grid :type="args.grid_type">
        <uids-grid-item v-for="item in args.record_count" :key="item">
          <uids-stat
            :display="args.display || 'default'"
            :stat_title="args.stat_title"
            :stat_summary="args.stat_summary"
            :stat_content="args.stat_content"
            :stat_prefix="args.stat_prefix"
            :stat_suffix="args.stat_suffix"
            :stat_hover="args.stat_hover"
          />
        </uids-grid-item>
      </uids-grid>
    </div>
  \`
})`,...m.parameters?.docs?.source}}},h=[`Default`,`Horizontal`,`Grid`]}))();export{d as Default,m as Grid,f as Horizontal,h as __namedExportsOrder,l as default};