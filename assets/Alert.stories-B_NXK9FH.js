import{d as I,c as m,e as d,g as o,n as u,l as g,b as N,o as p,U as T}from"./iframe-DYyvmaXb.js";import{c as y}from"./utlity-BIMoNfdw.js";import"./preload-helper-CE-n5q09.js";const E={key:0,class:"alert__icon"},W={class:"fa-stack fa-1x"},$={key:1,"data-dismiss":"alert"},B=I({__name:"Alert",props:{type:{type:String,default:"info",validator:r=>["info","success","warning","danger"].indexOf(r)!==-1},centered:{type:Boolean},iconVisible:{type:Boolean},dismissible:{type:Boolean},verticallyCentered:{type:Boolean}},setup(r){const s=r,w=m(()=>{switch(s.type){case"success":return"check";case"warning":return"exclamation-triangle";case"danger":return"exclamation";default:return"info"}}),U=m(()=>{let n=["alert"];return s.type&&n.push(`alert--${y(s.type)}`),s.verticallyCentered&&n.push("alert--vertically-centered"),s.iconVisible&&n.push("alert--icon"),["centered","dismissible"].forEach(e=>{s[e]===!0&&n.push(`alert--${y(e)}`)}),n});return(n,e)=>(p(),d("div",{class:u(U.value)},[s.iconVisible?(p(),d("div",E,[o("span",W,[e[0]||(e[0]=o("span",{role:"presentation",class:"fas fa-circle fa-stack-2x"},null,-1)),o("span",{role:"presentation",class:u("fas fa-stack-1x fa-inverse fa-"+w.value)},null,2)])])):g("",!0),N(n.$slots,"default",{class:"alert__content"},()=>[e[1]||(e[1]=T("Body"))]),s.dismissible?(p(),d("button",$,e[2]||(e[2]=[o("i",{class:"fas fa-times"},null,-1)]))):g("",!0)],2))}}),P={title:"Components/Alert",parameters:{docs:{source:{code:null}}},component:B,tags:["autodocs"],argTypes:{type:{name:"Type",options:["info","success","warning","danger"],control:{type:"select",labels:{info:"Info",success:"Success",warning:"Warning",danger:"Danger"}},table:{category:"Display options"}},centered:{name:"Centered",table:{category:"Display options"}},iconVisible:{name:"Display Icon",table:{category:"Display options"}},dismissible:{name:"Dismissible",table:{category:"Properties"}},verticallyCentered:{name:"Center Alert Vertically",table:{category:"Display options"}},default:{name:"Content",control:{type:"text"},table:{category:"Content"}}}},c=r=>({components:{UidsAlert:B},setup(){return{args:r}},template:`
    <uids-alert
      :type="args.type"
      :centered="args.centered"
      :iconVisible="args.iconVisible"
      :dismissible="args.dismissible"
      :verticallyCentered="args.verticallyCentered"
    >
      <div v-html="args.default"></div>
    </uids-alert>`}),t=c.bind({});t.args={type:"info",centered:!1,iconVisible:!0,dismissible:!1,verticallyCentered:!1,default:`
    <h2 class="headline headline--serif">
      Alert title
    </h2>
    <p>Lorem ipsum sit dolor amet.</p>
`};const a=c.bind({});a.args={...t.args,type:"success"};const i=c.bind({});i.args={...t.args,type:"warning"};const l=c.bind({});l.args={...t.args,type:"danger"};var f,b,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var C,V,h;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
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
})`,...(h=(V=a.parameters)==null?void 0:V.docs)==null?void 0:h.source}}};var _,x,A;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(A=(x=i.parameters)==null?void 0:x.docs)==null?void 0:A.source}}};var D,S,k;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
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
})`,...(k=(S=l.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};const j=["Info","Success","Warning","Danger"];export{l as Danger,t as Info,a as Success,i as Warning,j as __namedExportsOrder,P as default};
