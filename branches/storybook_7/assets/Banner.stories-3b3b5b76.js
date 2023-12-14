import{d as j,j as c,o as r,b as u,f as i,s as l,m as d,k as p,w as g,n as f,g as h,t as y}from"./vue.esm-bundler-c04f16a9.js";import{c as C}from"./utlity-a0fec18e.js";import{U as w}from"./Headline-5921ba25.js";import{U as N}from"./Button-7b8fb4f2.js";import{B as _}from"./background-34093459.js";import{_ as U}from"./Stub-25fb95ef.js";import{j as s}from"./jsx-runtime-300b1ae1.js";import{M,P as E}from"./index-901269d7.js";import{u as T}from"./index-0aad97ec.js";/* empty css                 */import"./iframe-3061e53e.js";import"../sb-preview/runtime.js";import"./index-f4dda215.js";import"./index-11d98b33.js";import"./index-356e4a49.js";const V={key:0,class:"banner__image"},z=["src"],D={class:"banner__container"},$={class:"banner__content"},k=j({__name:"Banner",props:{title:{type:String},image:{type:String},url:{type:String},text:{type:String},button_text:{type:String},overlay_color:{type:String,default:"gradient-dark"},overlay_to:{type:String,default:"gradient-bottom"},..._.props},setup(e){const t=e,S=c(()=>{let n=["banner"];return["overlay_color","overlay_to","size","vertical_alignment","horizontal_alignment"].forEach(a=>{t[a]===!0&&n.push(`banner--${C(a)}`)}),_.addBackgroundClass(n,t),t.url&&n.push("click-container"),n}),m=c(()=>{if(t.title){let n={level:"h2",classes:"headline"};return t.headline_settings&&Array.prototype.forEach.call(["level","class"],a=>{t.headline_settings[a]&&(n[a]=t.headline_settings[a])}),n}return{}});return(n,a)=>(r(),u("div",{class:f(S.value)},[e.image?(r(),u("div",V,[i("img",{src:e.image,alt:"",loading:"lazy"},null,8,z)])):l("",!0),i("div",D,[i("div",$,[d(n.$slots,"headline",{},()=>[e.title?(r(),p(w,{key:0,level:m.value.level,class:f(m.value.classes),href:e.url},{default:g(()=>[h(y(e.title),1)]),_:1},8,["level","class","href"])):l("",!0)]),d(n.$slots,"default"),e.url&&e.button_text?(r(),p(N,{key:0,href:e.url,class:"bttn--secondary bttn--caps",arrow:!0},{default:g(()=>[h(y(e.button_text),1)]),_:1},8,["href"])):l("",!0)])])],2))}}),O=k;k.__docgenInfo={exportName:"default",displayName:"Banner",description:"",tags:{},props:[{name:"title",type:{name:"string"}},{name:"image",type:{name:"string"}},{name:"url",type:{name:"string"}},{name:"text",type:{name:"string"}},{name:"button_text",type:{name:"string"}},{name:"overlay_color",type:{name:"string"},defaultValue:{func:!1,value:"'gradient-dark'"}},{name:"overlay_to",type:{name:"string"},defaultValue:{func:!1,value:"'gradient-bottom'"}}],slots:[{name:"headline"},{name:"default"}],sourceFiles:["/home/runner/work/uids/uids/src/components/banner/Banner.vue"]};function b(e){return s.jsxs(s.Fragment,{children:[s.jsx(M,{isTemplate:!0}),`
`,s.jsx(E,{})]})}function P(e={}){const{wrapper:t}=Object.assign({},T(),e.components);return t?s.jsx(t,Object.assign({},e,{children:s.jsx(b,e)})):b()}const te={title:"Not implemented/Banner",component:O,argTypes:{media:{control:"text"}},parameters:{docs:{source:{code:null},page:P},options:{showPanel:!1}}},X=e=>({components:{UidsStub:U},setup(){return{args:e}},template:`
    <uids-stub
      path="banner--default.html"
      title="Banner"
    >
    </uids-stub>
  `}),o=X.bind({});var v,x,B;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(B=(x=o.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};const ne=["Banner"];export{o as Banner,ne as __namedExportsOrder,te as default};
