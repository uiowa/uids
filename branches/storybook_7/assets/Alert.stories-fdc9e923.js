import{d as T,j as m,o as d,b as p,f as l,n as u,s as g,m as U,g as E}from"./vue.esm-bundler-c04f16a9.js";import{c as y}from"./utlity-a0fec18e.js";const W={key:0,class:"alert__icon"},$={class:"fa-stack fa-1x"},O=l("span",{role:"presentation",class:"fas fa-circle fa-stack-2x"},null,-1),j={key:1,"data-dismiss":"alert"},z=l("i",{class:"fas fa-times"},null,-1),F=[z],B=T({__name:"Alert",props:{type:{type:String,default:"info",validator:t=>["info","success","warning","danger"].indexOf(t)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(t){const e=t,I=m(()=>{switch(e.type){case"success":return"check";case"warning":return"exclamation-triangle";case"danger":return"exclamation";default:return"info"}}),N=m(()=>{let n=["alert"];return e.type&&n.push(`alert--${y(e.type)}`),e.verticallyCentered&&n.push("alert--vertically-centered"),e.iconVisible&&n.push("alert--icon"),["centered","dismissible"].forEach(c=>{e[c]===!0&&n.push(`alert--${y(c)}`)}),n});return(n,c)=>(d(),p("div",{class:u(N.value)},[e.iconVisible?(d(),p("div",W,[l("span",$,[O,l("span",{role:"presentation",class:u("fas fa-stack-1x fa-inverse fa-"+I.value)},null,2)])])):g("",!0),U(n.$slots,"default",{class:"alert__content"},()=>[E("Body")]),e.dismissible?(d(),p("button",j,F)):g("",!0)],2))}}),w=B;B.__docgenInfo={exportName:"default",displayName:"Alert",description:"",tags:{},props:[{name:"type",description:"Type of alert.",type:{name:"string"},defaultValue:{func:!1,value:"'info'"}},{name:"centered",description:"Content alignment.",type:{name:"boolean"}},{name:"iconVisible",description:"Icon visible.",type:{name:"boolean"}},{name:"dismissible",description:"Alert is removable.",type:{name:"boolean"}},{name:"verticallyCentered",description:"Vertically center alert.",type:{name:"boolean"}}],slots:[{name:"default",scoped:!0,bindings:[{name:"class",title:"binding"}]}],sourceFiles:["/home/runner/work/uids/uids/src/components/alert/Alert.vue"]};const q={title:"Components/Alert",parameters:{docs:{source:{code:null}}},component:w,tags:["autodocs"],argTypes:{type:{name:"Type",options:["info","success","warning","danger"],control:{type:"select",labels:{info:"Info",success:"Success",warning:"Warning",danger:"Danger"}},table:{category:"Display options"}},centered:{name:"Centered",table:{category:"Display options"}},iconVisible:{name:"Display Icon",table:{category:"Display options"}},dismissible:{name:"Dismissible",table:{category:"Properties"}},verticallyCentered:{name:"Center Alert Vertically",table:{category:"Display options"}},default:{name:"Content",control:{type:"text"},table:{category:"Content"}}}},o=t=>({components:{UidsAlert:w},setup(){return{args:t}},template:`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>`}),s=o.bind({});s.args={type:"info",centered:!1,iconVisible:!0,dismissible:!1,verticallyCentered:!1,default:`
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`};const a=o.bind({});a.args={...s.args,type:"success"};const r=o.bind({});r.args={...s.args,type:"warning"};const i=o.bind({});i.args={...s.args,type:"danger"};var b,f,v;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
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
})`,...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var _,h,C;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(C=(h=a.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var V,A,x;r.parameters={...r.parameters,docs:{...(V=r.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
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
})`,...(x=(A=r.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var k,D,S;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`args => ({
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
})`,...(S=(D=i.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};const G=["Info","Success","Warning","Danger"];export{i as Danger,s as Info,a as Success,r as Warning,G as __namedExportsOrder,q as default};
