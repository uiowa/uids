import{i as e}from"./preload-helper-qtoXYYBn.js";import{J as t,K as n,Q as r,_t as i,nt as a,ot as o,yt as s}from"./iframe-CMdPidBi.js";var c=e((()=>{})),l,u=e((()=>{n(),c(),l=a({__name:`Badge`,props:{type:{type:String,default:`primary`,validator:e=>[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`].includes(e)},text:{type:String,required:!0}},setup(e){let n=e,a=t(()=>[`badge`,`badge--${n.type}`]);return(t,n)=>(o(),r(`span`,{class:i(a.value)},s(e.text),3))}})})),d,f=e((()=>{u(),u(),d=l,l.__docgenInfo=Object.assign({displayName:l.name??l.__name},{exportName:`default`,displayName:`Badge`,description:``,tags:{},props:[{name:`type`,type:{name:`string`},defaultValue:{func:!1,value:`'primary'`},values:[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`]},{name:`text`,type:{name:`string`},required:!0}],sourceFiles:[`/home/runner/work/uids/uids/src/components/badge/Badge.vue`]})})),p,m,h,g,_,v,y,b,x;e((()=>{f(),p={title:`Components/Badge`,component:d,tags:[`autodocs`],argTypes:{type:{control:`select`,name:`Type`,options:[`primary`,`secondary`,`cool-gray`,`blue`,`green`,`orange`],description:`The color type of the badge`,table:{defaultValue:{summary:`primary`}}},text:{control:`text`,name:`Text`,description:`The text to display in the badge`}}},m=e=>({components:{UidsBadge:d},setup(){return{args:e}},template:`<uids-badge v-bind="args" />`}),h=m.bind({}),h.args={type:`primary`,text:`Primary`},g=m.bind({}),g.args={type:`secondary`,text:`Secondary`},_=m.bind({}),_.args={type:`cool-gray`,text:`Cool Gray`},v=m.bind({}),v.args={type:`blue`,text:`Blue`},y=m.bind({}),y.args={type:`green`,text:`Green`},b=m.bind({}),b.args={type:`orange`,text:`Orange`},x=[`Default`,`Secondary`,`CoolGray`,`Blue`,`Green`,`Orange`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`args => ({
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
})`,...b.parameters?.docs?.source}}}}))();export{v as Blue,_ as CoolGray,h as Default,y as Green,b as Orange,g as Secondary,x as __namedExportsOrder,p as default};