import{i as e}from"./preload-helper-BOCEDryK.js";import{$ as t,Q as n,St as r,X as i,bt as a,it as o,nt as s,ot as c,tt as l,ut as u}from"./iframe-Bk8_-s1l.js";import{t as d}from"./_background-l5UPgkKv.js";import{n as f,t as p}from"./background-CrU4PsjU.js";import{i as m,n as h,r as g,t as _}from"./GridItem-WVyaqKFo.js";var v=e((()=>{})),y,b,x,S,C,w,T,E=e((()=>{i(),v(),d(),f(),y={key:0},b={class:`stat__title`},x={key:0,class:`headline__prefix`},S={key:1,class:`headline__suffix`},C=[`innerHTML`],w=[`innerHTML`],T=c({__name:`Stat`,props:{stat_title:{type:String,default:``},stat_summary:{type:String,default:``},stat_content:{type:String,default:``},stat_prefix:{type:String,default:``},stat_suffix:{type:String,default:``},stat_hover:{type:Boolean,default:!0},display:{type:String,default:`default`,validator:e=>[`default`,`horizontal`].includes(e)},...p.props},setup(e){let i=e,c=n(()=>{let e=[];return p.addBackgroundClass(e,i),i.display===`horizontal`?e.push(`stat--horizontal`,`stat__grid`):e.push(`element--flex-center`),i.stat_hover||e.push(`stat--static`),e});return(n,i)=>(u(),s(`div`,{class:a([`stat`,`stat__grid`,`stat--transform`,...c.value])},[e.stat_title?(u(),s(`div`,y,[t(`h2`,b,[e.stat_prefix?(u(),s(`span`,x,r(e.stat_prefix),1)):l(``,!0),o(` `+r(e.stat_title)+` `,1),e.stat_suffix?(u(),s(`span`,S,r(e.stat_suffix),1)):l(``,!0)])])):l(``,!0),e.stat_summary?(u(),s(`span`,{key:1,class:`stat__description`,innerHTML:e.stat_summary},null,8,C)):l(``,!0),e.stat_content?(u(),s(`p`,{key:2,class:`stat__content`,innerHTML:e.stat_content},null,8,w)):l(``,!0)],2))}})})),D,O=e((()=>{E(),E(),D=T})),k,A,j,M,N,P,F;e((()=>{O(),f(),m(),h(),k={title:`Components/Stat`,component:D,tags:[`autodocs`],argTypes:{display:{control:`select`,name:`Display`,options:[`default`,`horizontal`]},stat_title:{control:`text`,name:`Title`},stat_summary:{control:`text`,name:`Summary`},stat_content:{control:`text`,name:`Content`},stat_prefix:{control:`text`,name:`Prefix`},stat_suffix:{control:`text`,name:`Suffix`},stat_hover:{name:`Hover`},...p.argTypes}},A=e=>({components:{UidsStat:D},setup(){return{args:e}},template:`<uids-stat v-bind="args" />`}),j=A.bind({}),j.args={display:`default`,stat_title:`15:1`,stat_summary:`student-to-faculty ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_prefix:``,stat_suffix:`+`,stat_hover:!0},M=A.bind({}),M.args={display:`horizontal`,stat_title:`15:1`,stat_summary:`student-to-faculty<br /> ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_hover:!0},N=e=>({components:{UidsGrid:g,UidsGridItem:_,UidsStat:D},setup(){return{args:e}},template:`
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
  `}),P=N.bind({}),P.args={display:`default`,grid_type:`threecol--33-34-33`,record_count:6,stat_title:`15:1`,stat_summary:`student-to-faculty ratio`,stat_content:`Among the top 2% of universities worldwide.`,stat_prefix:``,stat_suffix:`+`,stat_hover:!0},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...M.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`args => ({
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
})`,...P.parameters?.docs?.source}}},F=[`Default`,`Horizontal`,`Grid`]}))();export{j as Default,P as Grid,M as Horizontal,F as __namedExportsOrder,k as default};