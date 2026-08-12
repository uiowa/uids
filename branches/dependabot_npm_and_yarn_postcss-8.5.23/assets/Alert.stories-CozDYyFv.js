import{i as e}from"./preload-helper-BI1g7SyD.js";import{$ as t,Q as n,X as r,bt as i,ft as a,it as o,nt as s,ot as c,tt as l,ut as u}from"./iframe-xIvUfqa2.js";import{n as d,t as f}from"./utlity-ugQEGZU5.js";var p=e((()=>{})),m,h,g,_,v=e((()=>{r(),p(),d(),m={key:0,class:`alert__icon`},h={class:`fa-stack fa-1x`},g={key:1,"data-dismiss":`alert`},_=c({__name:`Alert`,props:{type:{type:String,default:`info`,validator:e=>[`info`,`success`,`warning`,`danger`].indexOf(e)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(e){let r=e,c=n(()=>{switch(r.type){case`success`:return`check`;case`warning`:return`exclamation-triangle`;case`danger`:return`exclamation`;default:return`info`}}),d=n(()=>{let e=[`alert`];return r.type&&e.push(`alert--${f(r.type)}`),r.verticallyCentered&&e.push(`alert--vertically-centered`),r.iconVisible&&e.push(`alert--icon`),[`centered`,`dismissible`].forEach(t=>{r[t]===!0&&e.push(`alert--${f(t)}`)}),e});return(e,n)=>(u(),s(`div`,{class:i(d.value)},[r.iconVisible?(u(),s(`div`,m,[t(`span`,h,[n[0]||=t(`span`,{role:`presentation`,class:`fas fa-circle fa-stack-2x`},null,-1),t(`span`,{role:`presentation`,class:i(`fas fa-stack-1x fa-inverse fa-`+c.value)},null,2)])])):l(``,!0),a(e.$slots,`default`,{class:`alert__content`},()=>[n[1]||=o(`Body`,-1)]),r.dismissible?(u(),s(`button`,g,[...n[2]||=[t(`i`,{class:`fas fa-times`},null,-1)]])):l(``,!0)],2))}})})),y,b=e((()=>{v(),v(),y=_})),x,S,C,w,T,E,D;e((()=>{b(),x={title:`Components/Alert`,parameters:{docs:{source:{code:null}}},component:y,tags:[`autodocs`],argTypes:{type:{name:`Type`,options:[`info`,`success`,`warning`,`danger`],control:{type:`select`,labels:{info:`Info`,success:`Success`,warning:`Warning`,danger:`Danger`}},table:{category:`Display options`}},centered:{name:`Centered`,table:{category:`Display options`}},iconVisible:{name:`Display Icon`,table:{category:`Display options`}},dismissible:{name:`Dismissible`,table:{category:`Properties`}},verticallyCentered:{name:`Center Alert Vertically`,table:{category:`Display options`}},default:{name:`Content`,control:{type:`text`},table:{category:`Content`}}}},S=e=>({components:{UidsAlert:y},setup(){return{args:e}},template:`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>`}),C=S.bind({}),C.args={type:`info`,centered:!1,iconVisible:!0,dismissible:!1,verticallyCentered:!1,default:`
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`},w=S.bind({}),w.args={...C.args,type:`success`},T=S.bind({}),T.args={...C.args,type:`warning`},E=S.bind({}),E.args={...C.args,type:`danger`},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>\`
})`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>\`
})`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>\`
})`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>\`
})`,...E.parameters?.docs?.source}}},D=[`Info`,`Success`,`Warning`,`Danger`]}))();export{E as Danger,C as Info,w as Success,T as Warning,D as __namedExportsOrder,x as default};