import{d as k,k as T,c as s,f as U,t as u,m as r,e as z,n as w,o as a}from"./vue.esm-bundler--ETYdinE.js";import{B as l}from"./_background-CvB3IPsa.js";import{_ as B,a as C}from"./GridItem.vue_vue_type_script_setup_true_lang-BjVCyihe.js";import"./utlity-CAV5GFHh.js";const G={key:0},H={class:"stat__title"},A={key:0,class:"headline__prefix"},D={key:1,class:"headline__suffix"},L=["innerHTML"],M=["innerHTML"],m=k({__name:"Stat",props:{stat_title:{type:String,default:""},stat_summary:{type:String,default:""},stat_content:{type:String,default:""},stat_prefix:{type:String,default:""},stat_suffix:{type:String,default:""},stat_hover:{type:Boolean,default:!0},display:{type:String,default:"default",validator:t=>["default","horizontal"].includes(t)},...l.props},setup(t){const d=t,b=T(()=>{let e=[];return l.addBackgroundClass(e,d),d.display==="horizontal"?e.push("stat--horizontal","stat__grid"):e.push("element--flex-center"),d.stat_hover||e.push("stat--static"),e});return(e,V)=>(a(),s("div",{class:w(["stat","stat__grid","stat--transform",...b.value])},[t.stat_title?(a(),s("div",G,[U("h2",H,[t.stat_prefix?(a(),s("span",A,u(t.stat_prefix),1)):r("",!0),z(" "+u(t.stat_title)+" ",1),t.stat_suffix?(a(),s("span",D,u(t.stat_suffix),1)):r("",!0)])])):r("",!0),t.stat_summary?(a(),s("p",{key:1,class:"stat__description",innerHTML:t.stat_summary},null,8,L)):r("",!0),t.stat_content?(a(),s("p",{key:2,class:"stat__content",innerHTML:t.stat_content},null,8,M)):r("",!0)],2))}}),O={title:"Components/Stat",component:m,tags:["autodocs"],argTypes:{display:{control:"select",name:"Display",options:["default","horizontal"]},stat_title:{control:"text",name:"Title"},stat_summary:{control:"text",name:"Summary"},stat_content:{control:"text",name:"Content"},stat_prefix:{control:"text",name:"Prefix"},stat_suffix:{control:"text",name:"Suffix"},stat_hover:{name:"Hover"},...l.argTypes}},S=t=>({components:{UidsStat:m},setup(){return{args:t}},template:'<uids-stat v-bind="args" />'}),n=S.bind({});n.args={display:"default",stat_title:"15:1",stat_summary:"student-to-faculty ratio",stat_content:"Among the top 2% of universities worldwide.",stat_prefix:"",stat_suffix:"+",stat_hover:!0};const i=S.bind({});i.args={display:"horizontal",stat_title:"15:1",stat_summary:"student-to-faculty<br /> ratio",stat_content:"Among the top 2% of universities worldwide.",stat_hover:!0};const N=t=>({components:{UidsGrid:B,UidsGridItem:C,UidsStat:m},setup(){return{args:t}},template:`
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
  `}),o=N.bind({});o.args={display:"default",grid_type:"threecol--33-34-33",record_count:6,stat_title:"15:1",stat_summary:"student-to-faculty ratio",stat_content:"Among the top 2% of universities worldwide.",stat_prefix:"",stat_suffix:"+",stat_hover:!0};var c,p,_;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(_=(p=n.parameters)==null?void 0:p.docs)==null?void 0:_.source}}};var f,g,y;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(y=(g=i.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var h,x,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`args => ({
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
})`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const P=["Default","Horizontal","Grid"];export{n as Default,o as Grid,i as Horizontal,P as __namedExportsOrder,O as default};
