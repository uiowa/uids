import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,a as n,c as r,f as i,g as a,i as o,n as s,s as c,u as l,v as u}from"./iframe-BMXo6Z5W.js";import{n as d,t as f}from"./utlity-62E8ZhRl.js";var p,m,h,g;function _(){return(_=e((()=>{s(),d(),p={key:0,class:`alert__icon`},m={class:`fa-stack fa-1x`},h={key:1,"data-dismiss":`alert`},g=i({__name:`Alert`,props:{type:{type:String,default:`info`,validator:e=>[`info`,`success`,`warning`,`danger`].indexOf(e)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(e){let i=e,s=o(()=>{switch(i.type){case`success`:return`check`;case`warning`:return`exclamation-triangle`;case`danger`:return`exclamation`;default:return`info`}}),d=o(()=>{let e=[`alert`];return i.type&&e.push(`alert--${f(i.type)}`),i.verticallyCentered&&e.push(`alert--vertically-centered`),i.iconVisible&&e.push(`alert--icon`),[`centered`,`dismissible`].forEach(t=>{i[t]===!0&&e.push(`alert--${f(t)}`)}),e});return(e,o)=>(a(),r(`div`,{class:t(d.value)},[i.iconVisible?(a(),r(`div`,p,[n(`span`,m,[o[0]||=n(`span`,{role:`presentation`,class:`fas fa-circle fa-stack-2x`},null,-1),n(`span`,{role:`presentation`,class:t(`fas fa-stack-1x fa-inverse fa-`+s.value)},null,2)])])):c(``,!0),u(e.$slots,`default`,{class:`alert__content`},()=>[o[1]||=l(`Body`,-1)]),i.dismissible?(a(),r(`button`,h,[...o[2]||=[n(`i`,{class:`fas fa-times`},null,-1)]])):c(``,!0)],2))}})})))()}var v;function y(){return(y=e((()=>{_(),v=g,g.__docgenInfo=Object.assign({displayName:g.name??g.__name},{exportName:`default`,displayName:`Alert`,description:``,tags:{},props:[{name:`type`,description:`Type of alert.`,type:{name:`string`},defaultValue:{func:!1,value:`'info'`}},{name:`centered`,description:`Content alignment.`,type:{name:`boolean`}},{name:`iconVisible`,description:`Icon visible.`,type:{name:`boolean`}},{name:`dismissible`,description:`Alert is removable.`,type:{name:`boolean`}},{name:`verticallyCentered`,description:`Vertically center alert.`,type:{name:`boolean`}}],slots:[{name:`default`,scoped:!0,bindings:[{name:`class`,title:`binding`}]}],sourceFiles:[`/home/runner/work/uids/uids/src/components/alert/Alert.vue`]})})))()}var b,x,S,C,w,T,E;function D(){return(D=e((()=>{y(),b={title:`Components/Alert`,parameters:{docs:{source:{code:null}}},component:v,tags:[`autodocs`],argTypes:{type:{name:`Type`,options:[`info`,`success`,`warning`,`danger`],control:{type:`select`,labels:{info:`Info`,success:`Success`,warning:`Warning`,danger:`Danger`}},table:{category:`Display options`}},centered:{name:`Centered`,table:{category:`Display options`}},iconVisible:{name:`Display Icon`,table:{category:`Display options`}},dismissible:{name:`Dismissible`,table:{category:`Properties`}},verticallyCentered:{name:`Center Alert Vertically`,table:{category:`Display options`}},default:{name:`Content`,control:{type:`text`},table:{category:`Content`}}}},x=e=>({components:{UidsAlert:v},setup(){return{args:e}},template:`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>`}),S=x.bind({}),S.args={type:`info`,centered:!1,iconVisible:!0,dismissible:!1,verticallyCentered:!1,default:`
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`},C=x.bind({}),C.args={...S.args,type:`success`},w=x.bind({}),w.args={...S.args,type:`warning`},T=x.bind({}),T.args={...S.args,type:`danger`},E=[`Info`,`Success`,`Warning`,`Danger`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`args => ({
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
})`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`args => ({
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
})`,...T.parameters?.docs?.source}}}})))()}D();export{T as Danger,S as Info,C as Success,w as Warning,E as __namedExportsOrder,b as default};