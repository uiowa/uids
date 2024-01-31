import{d as N,j as u,o as d,b as p,g as l,n as g,p as y,l as T,f as U}from"./vue.esm-bundler-f09df2bf.js";import{c as b}from"./utlity-a0fec18e.js";const E={key:0,class:"alert__icon"},W={class:"fa-stack fa-1x"},$=l("span",{role:"presentation",class:"fas fa-circle fa-stack-2x"},null,-1),O={key:1,"data-dismiss":"alert"},j=l("i",{class:"fas fa-times"},null,-1),z=[j],m=N({__name:"Alert",props:{type:{type:String,default:"info",validator:t=>["info","success","warning","danger"].indexOf(t)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(t){const e=t,w=u(()=>{switch(e.type){case"success":return"check";case"warning":return"exclamation-triangle";case"danger":return"exclamation";default:return"info"}}),I=u(()=>{let n=["alert"];return e.type&&n.push(`alert--${b(e.type)}`),e.verticallyCentered&&n.push("alert--vertically-centered"),e.iconVisible&&n.push("alert--icon"),["centered","dismissible"].forEach(c=>{e[c]===!0&&n.push(`alert--${b(c)}`)}),n});return(n,c)=>(d(),p("div",{class:g(I.value)},[e.iconVisible?(d(),p("div",E,[l("span",W,[$,l("span",{role:"presentation",class:g("fas fa-stack-1x fa-inverse fa-"+w.value)},null,2)])])):y("",!0),T(n.$slots,"default",{class:"alert__content"},()=>[U("Body")]),e.dismissible?(d(),p("button",O,z)):y("",!0)],2))}});m.__docgenInfo={exportName:"default",displayName:"Alert",description:"",tags:{},props:[{name:"type",description:"Type of alert.",type:{name:"string"},defaultValue:{func:!1,value:"'info'"}},{name:"centered",description:"Content alignment.",type:{name:"boolean"}},{name:"iconVisible",description:"Icon visible.",type:{name:"boolean"}},{name:"dismissible",description:"Alert is removable.",type:{name:"boolean"}},{name:"verticallyCentered",description:"Vertically center alert.",type:{name:"boolean"}}],slots:[{name:"default",scoped:!0,bindings:[{name:"class",title:"binding"}]}],sourceFiles:["/home/runner/work/uids/uids/src/components/alert/Alert.vue"]};const P={title:"Components/Alert",parameters:{docs:{source:{code:null}}},component:m,tags:["autodocs"],argTypes:{type:{name:"Type",options:["info","success","warning","danger"],control:{type:"select",labels:{info:"Info",success:"Success",warning:"Warning",danger:"Danger"}},table:{category:"Display options"}},centered:{name:"Centered",table:{category:"Display options"}},iconVisible:{name:"Display Icon",table:{category:"Display options"}},dismissible:{name:"Dismissible",table:{category:"Properties"}},verticallyCentered:{name:"Center Alert Vertically",table:{category:"Display options"}},default:{name:"Content",control:{type:"text"},table:{category:"Content"}}}},o=t=>({components:{UidsAlert:m},setup(){return{args:t}},template:`
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
`};const a=o.bind({});a.args={...s.args,type:"success"};const r=o.bind({});r.args={...s.args,type:"warning"};const i=o.bind({});i.args={...s.args,type:"danger"};var f,v,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(_=(v=s.parameters)==null?void 0:v.docs)==null?void 0:_.source}}};var h,C,V;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`args => ({
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
})`,...(V=(C=a.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var A,x,k;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
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
})`,...(k=(x=r.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var D,S,B;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
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
})`,...(B=(S=i.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};const q=["Info","Success","Warning","Danger"];export{i as Danger,s as Info,a as Success,r as Warning,q as __namedExportsOrder,P as default};
