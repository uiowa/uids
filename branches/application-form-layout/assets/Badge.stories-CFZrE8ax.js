import{d as D,g as k,c as E,t as q,n as z,o as P}from"./vue.esm-bundler-CS6s2Jsr.js";const T=D({__name:"Badge",props:{type:{type:String,default:"primary",validator:e=>["primary","secondary","cool-gray","blue","green","orange"].includes(e)},text:{type:String,required:!0}},setup(e){const h=e,O=k(()=>["badge",`badge--${h.type}`]);return(V,$)=>(P(),E("span",{class:z(O.value)},q(e.text),3))}}),w={title:"Components/Badge",component:T,tags:["autodocs"],argTypes:{type:{control:"select",name:"Type",options:["primary","secondary","cool-gray","blue","green","orange"],description:"The color type of the badge",table:{defaultValue:{summary:"primary"}}},text:{control:"text",name:"Text",description:"The text to display in the badge"}}},r=e=>({components:{UidsBadge:T},setup(){return{args:e}},template:'<uids-badge v-bind="args" />'}),a=r.bind({});a.args={type:"primary",text:"Primary"};const n=r.bind({});n.args={type:"secondary",text:"Secondary"};const s=r.bind({});s.args={type:"cool-gray",text:"Cool Gray"};const t=r.bind({});t.args={type:"blue",text:"Blue"};const o=r.bind({});o.args={type:"green",text:"Green"};const d=r.bind({});d.args={type:"orange",text:"Orange"};var c,p,g;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(g=(p=a.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var i,u,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(m=(u=n.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var l,y,b;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(b=(y=s.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var x,B,S;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(S=(B=t.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};var f,v,U;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(U=(v=o.parameters)==null?void 0:v.docs)==null?void 0:U.source}}};var _,C,G;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...(G=(C=d.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};const A=["Default","Secondary","CoolGray","Blue","Green","Orange"];export{t as Blue,s as CoolGray,a as Default,o as Green,d as Orange,n as Secondary,A as __namedExportsOrder,w as default};
