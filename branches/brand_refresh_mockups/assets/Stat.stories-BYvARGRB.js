import{_ as r}from"./Stat.vue_vue_type_script_setup_true_lang-CpXcakiZ.js";import{B as l}from"./background-Dp_AVxiY.js";import{_ as f,a as y}from"./GridItem.vue_vue_type_script_setup_true_lang-BuSFYZU-.js";import"./vue.esm-bundler-Dl4EI7SU.js";/* empty css                    */import"./utlity-BIMoNfdw.js";/* empty css              */const T={title:"Components/Stat",component:r,tags:["autodocs"],argTypes:{display:{control:"select",name:"Display",options:["default","horizontal"]},stat_title:{control:"text",name:"Title"},stat_summary:{control:"text",name:"Summary"},stat_content:{control:"text",name:"Content"},stat_prefix:{control:"text",name:"Prefix"},stat_suffix:{control:"text",name:"Suffix"},stat_hover:{name:"Hover"},...l.argTypes}},g=a=>({components:{UidsStat:r},setup(){return{args:a}},template:'<uids-stat v-bind="args" />'}),t=g.bind({});t.args={display:"default",stat_title:"15:1",stat_summary:"student-to-faculty ratio",stat_content:"Among the top 2% of universities worldwide.",stat_prefix:"",stat_suffix:"+",stat_hover:!0};const s=g.bind({});s.args={display:"horizontal",stat_title:"15:1",stat_summary:"student-to-faculty<br /> ratio",stat_content:"Among the top 2% of universities worldwide.",stat_hover:!0};const h=a=>({components:{UidsGrid:f,UidsGridItem:y,UidsStat:r},setup(){return{args:a}},template:`
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
  `}),e=h.bind({});e.args={display:"default",grid_type:"threecol--33-34-33",record_count:6,stat_title:"15:1",stat_summary:"student-to-faculty ratio",stat_content:"Among the top 2% of universities worldwide.",stat_prefix:"",stat_suffix:"+",stat_hover:!0};var n,o,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(i=(o=t.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var d,m,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(p=(m=s.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,c,_;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(_=(c=e.parameters)==null?void 0:c.docs)==null?void 0:_.source}}};const z=["Default","Horizontal","Grid"];export{t as Default,e as Grid,s as Horizontal,z as __namedExportsOrder,T as default};
