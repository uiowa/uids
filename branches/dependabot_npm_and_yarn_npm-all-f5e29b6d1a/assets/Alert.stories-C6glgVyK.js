import{i as e}from"./preload-helper-CZQN2Plb.js";import{C as t,D as n,E as r,F as i,G as a,L as o,j as s,k as c,w as l,x as u}from"./iframe-DitGaBVU.js";import{n as d,t as f}from"./utlity-CiLXTLYt.js";var p=e((()=>{})),m,h,g,_,v=e((()=>{u(),p(),d(),m={key:0,class:`alert__icon`},h={class:`fa-stack fa-1x`},g={key:1,"data-dismiss":`alert`},_=s({__name:`Alert`,props:{type:{type:String,default:`info`,validator:e=>[`info`,`success`,`warning`,`danger`].indexOf(e)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(e){let s=e,u=t(()=>{switch(s.type){case`success`:return`check`;case`warning`:return`exclamation-triangle`;case`danger`:return`exclamation`;default:return`info`}}),d=t(()=>{let e=[`alert`];return s.type&&e.push(`alert--${f(s.type)}`),s.verticallyCentered&&e.push(`alert--vertically-centered`),s.iconVisible&&e.push(`alert--icon`),[`centered`,`dismissible`].forEach(t=>{s[t]===!0&&e.push(`alert--${f(t)}`)}),e});return(e,t)=>(i(),n(`div`,{class:a(d.value)},[s.iconVisible?(i(),n(`div`,m,[l(`span`,h,[t[0]||=l(`span`,{role:`presentation`,class:`fas fa-circle fa-stack-2x`},null,-1),l(`span`,{role:`presentation`,class:a(`fas fa-stack-1x fa-inverse fa-`+u.value)},null,2)])])):r(``,!0),o(e.$slots,`default`,{class:`alert__content`},()=>[t[1]||=c(`Body`,-1)]),s.dismissible?(i(),n(`button`,g,[...t[2]||=[l(`i`,{class:`fas fa-times`},null,-1)]])):r(``,!0)],2))}})})),y,b=e((()=>{v(),v(),y=_})),x,S,C,w,T,E,D;e((()=>{b(),x={title:`Components/Alert`,parameters:{docs:{source:{code:null}}},component:y,tags:[`autodocs`],argTypes:{type:{name:`Type`,options:[`info`,`success`,`warning`,`danger`],control:{type:`select`,labels:{info:`Info`,success:`Success`,warning:`Warning`,danger:`Danger`}},table:{category:`Display options`}},centered:{name:`Centered`,table:{category:`Display options`}},iconVisible:{name:`Display Icon`,table:{category:`Display options`}},dismissible:{name:`Dismissible`,table:{category:`Properties`}},verticallyCentered:{name:`Center Alert Vertically`,table:{category:`Display options`}},default:{name:`Content`,control:{type:`text`},table:{category:`Content`}}}},S=e=>({components:{UidsAlert:y},setup(){return{args:e}},template:`
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