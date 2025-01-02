import{d as w,k as $,c as o,F as p,l as c,m as s,f as l,t as m,e as g,n as T,o as n}from"./vue.esm-bundler--ETYdinE.js";import{B as u}from"./_background-RctfgKj_.js";/* empty css               */import{c as U}from"./utlity-CAV5GFHh.js";const j={key:0,class:"blockquote__media media--circle"},H={class:"blockquote__content"},A={key:0,class:"blockquote__paragraph"},D={key:0,class:"blockquote__media media--circle"},M={key:0,href:"{{ url }}"},B=w({__name:"Blockquote",props:{media_position_bottom:{type:Boolean,default:!0},content:{type:String},footer:{type:String},url:{type:String},cite_text:{type:String},orientation:{type:String,default:""},...u.props},setup(t){const d=t,S=$(()=>{let e=["blockquote"];return u.addBackgroundClass(e,d),d.orientation&&e.push(`blockquote--${U(d.orientation)}`),e});return(e,z)=>(n(),o("blockquote",{class:T([...S.value,{[`blockquote--img-${t.media_position_bottom?"below":"above"}`]:e.$slots.media}])},[t.media_position_bottom?s("",!0):(n(),o(p,{key:0},[e.$slots.media?(n(),o("div",j,[c(e.$slots,"media")])):s("",!0)],64)),l("div",H,[t.content?(n(),o("div",A,[c(e.$slots,"content",{},()=>[g(m(t.content),1)])])):s("",!0),l("footer",null,[t.media_position_bottom?(n(),o(p,{key:0},[e.$slots.media?(n(),o("div",D,[c(e.$slots,"media")])):s("",!0)],64)):s("",!0),l("div",null,[c(e.$slots,"footer",{},()=>[g(m(t.footer),1)]),l("cite",null,[t.url?(n(),o("a",M,m(t.cite_text),1)):(n(),o(p,{key:1},[g(m(t.cite_text),1)],64))])])])])],2))}}),N="/branches/banner-component/assets/herky-square-loMo5jDD.jpg",V={title:"Components/Blockquote",parameters:{docs:{source:{code:null}}},component:B,tags:["autodocs"],argTypes:{orientation:{name:"Orientation",options:["","center","right"],control:{type:"select",labels:{"":"Left (default)",center:"Center",right:"Right"}},table:{category:"Display options"}},url:{control:{type:"text"}},media_position_bottom:{control:{type:"boolean"}},footer:{control:{type:"text"}},cite_text:{control:{type:"text"}},content:{control:{type:"text"}},media:{name:"Media",control:"text",table:{category:"Media"}},...u.argTypes}},h=t=>({components:{UidsBlockquote:B},setup(){return{args:t}},template:`
    <uids-blockquote
      :url="args.url"
      :background="args.background"
      :content="args.content"
      :footer="args.footer"
      :cite_text="args.cite_text"
      :media_position_bottom="args.media_position_bottom"
      :orientation="args.orientation"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #content v-if="args.content"><div v-html="args.content" ></div></template>
      <template #footer v-if="args.footer"><div :class="getClasses" v-html="args.footer" ></div></template>
    </uids-blockquote>
  `}),a=h.bind({});a.args={url:"https://uiowa.edu/",cite_text:"Be a Hawkeye",content:"<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>",footer:"<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>",media_position_bottom:!1,background:"",orientation:"",media:'<img src="'+N+'" alt="Alt">'};const r=h.bind({});r.args={...a.args,orientation:"center"};const i=h.bind({});i.args={...a.args,orientation:"right"};var b,f,v;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsBlockquote
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-blockquote
      :url="args.url"
      :background="args.background"
      :content="args.content"
      :footer="args.footer"
      :cite_text="args.cite_text"
      :media_position_bottom="args.media_position_bottom"
      :orientation="args.orientation"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #content v-if="args.content"><div v-html="args.content" ></div></template>
      <template #footer v-if="args.footer"><div :class="getClasses" v-html="args.footer" ></div></template>
    </uids-blockquote>
  \`
})`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var k,y,_;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsBlockquote
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-blockquote
      :url="args.url"
      :background="args.background"
      :content="args.content"
      :footer="args.footer"
      :cite_text="args.cite_text"
      :media_position_bottom="args.media_position_bottom"
      :orientation="args.orientation"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #content v-if="args.content"><div v-html="args.content" ></div></template>
      <template #footer v-if="args.footer"><div :class="getClasses" v-html="args.footer" ></div></template>
    </uids-blockquote>
  \`
})`,...(_=(y=r.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var q,C,x;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsBlockquote
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-blockquote
      :url="args.url"
      :background="args.background"
      :content="args.content"
      :footer="args.footer"
      :cite_text="args.cite_text"
      :media_position_bottom="args.media_position_bottom"
      :orientation="args.orientation"
    >
      <template #media v-if="args.media"><span v-html="args.media" ></span></template>
      <template #content v-if="args.content"><div v-html="args.content" ></div></template>
      <template #footer v-if="args.footer"><div :class="getClasses" v-html="args.footer" ></div></template>
    </uids-blockquote>
  \`
})`,...(x=(C=i.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};const E=["Left","Centered","Right"];export{r as Centered,a as Left,i as Right,E as __namedExportsOrder,V as default};
