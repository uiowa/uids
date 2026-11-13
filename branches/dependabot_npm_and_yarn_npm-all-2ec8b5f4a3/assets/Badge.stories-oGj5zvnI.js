import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,c as n,f as r,g as i,i as a,k as o,n as s}from"./iframe-BMXo6Z5W.js";var c;function l(){return(l=e((()=>{s(),c=r({__name:`Badge`,props:{type:{type:String,default:`primary`,validator:e=>[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`].includes(e)},text:{type:String,required:!0}},setup(e){let r=e,s=a(()=>[`badge`,`badge--${r.type}`]);return(r,a)=>(i(),n(`span`,{class:t(s.value)},o(e.text),3))}})})))()}var u;function d(){return(d=e((()=>{l(),u=c,c.__docgenInfo=Object.assign({displayName:c.name??c.__name},{exportName:`default`,displayName:`Badge`,description:``,tags:{},props:[{name:`type`,type:{name:`string`},defaultValue:{func:!1,value:`'primary'`},values:[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`]},{name:`text`,type:{name:`string`},required:!0}],sourceFiles:[`/home/runner/work/uids/uids/src/components/badge/Badge.vue`]})})))()}var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{d(),f={title:`Components/Badge`,component:u,tags:[`autodocs`],argTypes:{type:{control:`select`,name:`Type`,options:[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`],description:`The color type of the badge`,table:{defaultValue:{summary:`primary`}}},text:{control:`text`,name:`Text`,description:`The text to display in the badge`}}},p=e=>({components:{UidsBadge:u},setup(){return{args:e}},template:`<uids-badge v-bind="args" />`}),m=p.bind({}),m.args={type:`primary`,text:`Primary`},h=p.bind({}),h.args={type:`secondary`,text:`Secondary`},g=p.bind({}),g.args={type:`cool-gray`,text:`Cool Gray`},_=p.bind({}),_.args={type:`blue`,text:`Blue`},v=p.bind({}),v.args={type:`green`,text:`Green`},y=p.bind({}),y.args={type:`orange`,text:`Orange`},b=[`Default`,`Secondary`,`CoolGray`,`Blue`,`Green`,`Orange`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`args => ({
  components: {
    UidsBadge
  },
  setup() {
    return {
      args
    };
  },
  template: '<uids-badge v-bind="args" />'
})`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => ({
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
})`,...y.parameters?.docs?.source}}}})))()}x();export{_ as Blue,g as CoolGray,m as Default,v as Green,y as Orange,h as Secondary,b as __namedExportsOrder,f as default};