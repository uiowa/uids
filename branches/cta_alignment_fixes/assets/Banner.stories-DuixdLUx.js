import{d as S,k as c,c as d,e as o,q as l,p as u,l as m,b as p,n as h,o as s,f,t as g}from"./vue.esm-bundler-B7frGVmg.js";import{c as k}from"./utlity-CAV5GFHh.js";import{_ as x}from"./Headline.vue_vue_type_script_setup_true_lang-CRPi1jow.js";import{_ as C}from"./Button.vue_vue_type_script_setup_true_lang-BtFSlIHd.js";import{B as _}from"./_background-DssJo4kH.js";import{_ as $}from"./Stub.vue_vue_type_script_setup_true_lang-BvvC-f-6.js";const N={key:0,class:"banner__image"},w=["src"],z={class:"banner__container"},E={class:"banner__content"},T=S({__name:"Banner",props:{title:{type:String},image:{type:String},url:{type:String},text:{type:String},button_text:{type:String},overlay_color:{type:String,default:"gradient-dark"},overlay_to:{type:String,default:"gradient-bottom"},..._.props},setup(e){const n=e,B=c(()=>{let t=["banner"];return["overlay_color","overlay_to","size","vertical_alignment","horizontal_alignment"].forEach(a=>{n[a]===!0&&t.push(`banner--${k(a)}`)}),_.addBackgroundClass(t,n),n.url&&t.push("click-container"),t}),i=c(()=>{if(n.title){let t={level:"h2",classes:"headline"};return n.headline_settings&&Array.prototype.forEach.call(["level","class"],a=>{n.headline_settings[a]&&(t[a]=n.headline_settings[a])}),t}return{}});return(t,a)=>(s(),d("div",{class:h(B.value)},[e.image?(s(),d("div",N,[o("img",{src:e.image,alt:"",loading:"lazy"},null,8,w)])):l("",!0),o("div",z,[o("div",E,[u(t.$slots,"headline",{},()=>[e.title?(s(),m(x,{key:0,level:i.value.level,class:h(i.value.classes),href:e.url},{default:p(()=>[f(g(e.title),1)]),_:1},8,["level","class","href"])):l("",!0)]),u(t.$slots,"default"),e.url&&e.button_text?(s(),m(C,{key:0,href:e.url,class:"bttn--secondary bttn--caps",arrow:!0},{default:p(()=>[f(g(e.button_text),1)]),_:1},8,["href"])):l("",!0)])])],2))}}),O={title:"Not implemented/Banner",component:T,tags:["!autodocs"],argTypes:{media:{control:"text"}},parameters:{docs:{source:{code:null}},options:{showPanel:!1}}},V=e=>({components:{UidsStub:$},setup(){return{args:e}},template:`
    <uids-stub
      path="banner--default.html"
      title="Banner"
    >
    </uids-stub>
  `}),r=V.bind({});var b,y,v;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsStub
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-stub
      path="banner--default.html"
      title="Banner"
    >
    </uids-stub>
  \`
})`,...(v=(y=r.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const P=["Banner"];export{r as Banner,P as __namedExportsOrder,O as default};
