import{i as e}from"./preload-helper-DpVrO9fz.js";import{Q as t,St as n,X as r,bt as i,nt as a,ot as o,ut as s}from"./iframe-XKpLfLXx.js";var c=e((()=>{})),l,u=e((()=>{r(),c(),l=o({__name:`Badge`,props:{type:{type:String,default:`primary`,validator:e=>[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`].includes(e)},text:{type:String,required:!0}},setup(e){let r=e,o=t(()=>[`badge`,`badge--${r.type}`]);return(t,r)=>(s(),a(`span`,{class:i(o.value)},n(e.text),3))}})})),d,f=e((()=>{u(),u(),d=l})),p,m,h,g,_,v,y,b,x;e((()=>{f(),p={title:`Components/Badge`,component:d,tags:[`autodocs`],argTypes:{type:{control:`select`,name:`Type`,options:[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`],description:`The color type of the badge`,table:{defaultValue:{summary:`primary`}}},text:{control:`text`,name:`Text`,description:`The text to display in the badge`}}},m=e=>({components:{UidsBadge:d},setup(){return{args:e}},template:`<uids-badge v-bind="args" />`}),h=m.bind({}),h.args={type:`primary`,text:`Primary`},g=m.bind({}),g.args={type:`secondary`,text:`Secondary`},_=m.bind({}),_.args={type:`cool-gray`,text:`Cool Gray`},v=m.bind({}),v.args={type:`blue`,text:`Blue`},y=m.bind({}),y.args={type:`green`,text:`Green`},b=m.bind({}),b.args={type:`orange`,text:`Orange`},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...b.parameters?.docs?.source}}},x=[`Default`,`Secondary`,`CoolGray`,`Blue`,`Green`,`Orange`]}))();export{v as Blue,_ as CoolGray,h as Default,y as Green,b as Orange,g as Secondary,x as __namedExportsOrder,p as default};