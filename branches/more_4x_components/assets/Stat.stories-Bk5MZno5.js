import{d as h,k as S,c as e,f as k,t as i,q as n,e as v,n as T,o as s}from"./vue.esm-bundler-B_OG6i5n.js";import{B as l}from"./_background-DPOQsOlt.js";import"./utlity-CAV5GFHh.js";const z={key:0},b={class:"stat__title"},B={key:0,class:"headline__prefix"},C={key:1,class:"headline__suffix"},H=["innerHTML"],w=["innerHTML"],y=h({__name:"Stat",props:{stat_title:{type:String,default:""},stat_summary:{type:String,default:""},stat_content:{type:String,default:""},stat_prefix:{type:String,default:""},stat_suffix:{type:String,default:""},display:{type:String,default:"default",validator:t=>["default","horizontal"].includes(t)},...l.props},setup(t){const c=t,x=S(()=>{let a=[];return l.addBackgroundClass(a,c),c.display==="horizontal"?a.push("stat--horizontal","stat--transform","stat__grid"):a.push("element--flex-center","stat--transform"),a});return(a,D)=>(s(),e("div",{class:T(x.value)},[t.stat_title?(s(),e("div",z,[k("h2",b,[t.stat_prefix?(s(),e("span",B,i(t.stat_prefix),1)):n("",!0),v(" "+i(t.stat_title)+" ",1),t.stat_suffix?(s(),e("span",C,i(t.stat_suffix),1)):n("",!0)])])):n("",!0),t.stat_summary?(s(),e("p",{key:1,class:"stat__description",innerHTML:t.stat_summary},null,8,H)):n("",!0),t.stat_content?(s(),e("p",{key:2,class:"stat__content",innerHTML:t.stat_content},null,8,w)):n("",!0)],2))}}),U={title:"Components/Stat",component:y,tags:["autodocs"],argTypes:{display:{control:"select",name:"Display",options:["default","horizontal"]},stat_title:{control:"text",name:"Title"},stat_summary:{control:"text",name:"Summary"},stat_content:{control:"text",name:"Content"},stat_prefix:{control:"text",name:"Prefix"},stat_suffix:{control:"text",name:"Suffix"},...l.argTypes}},g=t=>({components:{UidsStat:y},setup(){return{args:t}},template:'<uids-stat v-bind="args" />'}),r=g.bind({});r.args={display:"default",stat_title:"15:1",stat_summary:"student-to-faculty ratio",stat_content:"Among the top 2% of universities worldwide.",stat_prefix:"",stat_suffix:"+"};const o=g.bind({});o.args={display:"horizontal",stat_title:"15:1",stat_summary:"student-to-faculty<br /> ratio",stat_content:"Among the top 2% of universities worldwide."};var u,d,m;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var f,p,_;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    UidsStat
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-stat v-bind="args" />'
})`,...(_=(p=o.parameters)==null?void 0:p.docs)==null?void 0:_.source}}};const V=["Default","Horizontal"];export{r as Default,o as Horizontal,V as __namedExportsOrder,U as default};
