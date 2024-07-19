import{d as w,j as $,o,b as n,F as u,l as c,p as s,g as m,t as l,f as p,n as T}from"./vue.esm-bundler-f09df2bf.js";import{B as g}from"./_background-8658db0c.js";/* empty css               */import{c as U}from"./utlity-a0fec18e.js";const N={key:0,class:"blockquote__media media--circle"},j={class:"blockquote__content"},H={key:0,class:"blockquote__paragraph"},V={key:0,class:"blockquote__media media--circle"},A={key:0,href:"{{ url }}"},b=w({__name:"Blockquote",props:{media_position_bottom:{type:Boolean,default:!0},content:{type:String},footer:{type:String},url:{type:String},cite_text:{type:String},orientation:{type:String,default:""},...g.props},setup(t){const d=t,S=$(()=>{let e=["blockquote"];return g.addBackgroundClass(e,d),d.orientation&&e.push(`blockquote--${U(d.orientation)}`),e});return(e,I)=>(o(),n("blockquote",{class:T([...S.value,{[`blockquote--img-${t.media_position_bottom?"below":"above"}`]:e.$slots.media}])},[t.media_position_bottom?s("",!0):(o(),n(u,{key:0},[e.$slots.media?(o(),n("div",N,[c(e.$slots,"media")])):s("",!0)],64)),m("div",j,[t.content?(o(),n("div",H,[c(e.$slots,"content",{},()=>[p(l(t.content),1)])])):s("",!0),m("footer",null,[t.media_position_bottom?(o(),n(u,{key:0},[e.$slots.media?(o(),n("div",V,[c(e.$slots,"media")])):s("",!0)],64)):s("",!0),m("div",null,[c(e.$slots,"footer",{},()=>[p(l(t.footer),1)]),m("cite",null,[t.url?(o(),n("a",A,l(t.cite_text),1)):(o(),n(u,{key:1},[p(l(t.cite_text),1)],64))])])])])],2))}});b.__docgenInfo={exportName:"default",displayName:"Blockquote",description:"",tags:{},props:[{name:"media_position_bottom",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"content",type:{name:"string"}},{name:"footer",type:{name:"string"}},{name:"url",type:{name:"string"}},{name:"cite_text",type:{name:"string"}},{name:"orientation",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"media"},{name:"content"},{name:"footer"}],sourceFiles:["/home/runner/work/uids/uids/src/components/blockquote/Blockquote.vue"]};const F="/branches/4x_blockquote/assets/herky-square-578104a0.jpg",D={title:"Components/Blockquote",parameters:{docs:{source:{code:null}}},component:b,tags:["autodocs"],argTypes:{orientation:{name:"Orientation",options:["","center","right"],control:{type:"select",labels:{"":"Left (default)",center:"Center",right:"Right"}},table:{category:"Display options"}},url:{control:{type:"text"}},media_position_bottom:{control:{type:"boolean"}},footer:{control:{type:"text"}},cite_text:{control:{type:"text"}},content:{control:{type:"text"}},media:{name:"Media",control:"text",table:{category:"Media"}},...g.argTypes}},h=t=>({components:{UidsBlockquote:b},setup(){return{args:t}},template:`
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
  `}),a=h.bind({});a.args={url:"https://uiowa.edu/",cite_text:"Be a Hawkeye",content:"<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>",footer:"<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>",media_position_bottom:!1,background:"",orientation:"",media:'<img src="'+F+'" alt="Alt">'};const r=h.bind({});r.args={...a.args,orientation:"center"};const i=h.bind({});i.args={...a.args,orientation:"right"};var f,v,k;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(k=(v=a.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};var y,_,q;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(q=(_=r.parameters)==null?void 0:_.docs)==null?void 0:q.source}}};var x,B,C;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
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
})`,...(C=(B=i.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};const E=["Left","Centered","Right"];export{r as Centered,a as Left,i as Right,E as __namedExportsOrder,D as default};
