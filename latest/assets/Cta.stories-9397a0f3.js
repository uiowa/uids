import{d as A,j as m,o as i,b as l,f as j,e as b,w as _,s as d,m as r,g as c,t as h,n as f}from"./vue.esm-bundler-c04f16a9.js";import{B as g}from"./background-37ffd5ec.js";import{U as D}from"./Headline-5921ba25.js";import{U as L}from"./Button-9e8077fc.js";import{c as y}from"./utlity-a0fec18e.js";/* empty css                 */const E={class:"cta__container"},H={key:0,class:"cta__title"},z={key:1,class:"cta__content"},F={key:0,class:"cta__link"},V=A({__name:"Cta",props:{headline_style:{type:String,default:""},url:{type:String},details:{type:String},orientation:{type:String,default:""},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:""},...g.props},setup(e){const o=e,N=m(()=>{let t=["cta"];return g.addBackgroundClass(t,o),["button_align_right"].forEach(u=>{o[u]===!0&&t.push(`cta--${y(u)}`)}),o.orientation&&t.push(`cta--${y(o.orientation)}`),t}),$=m(()=>[""]);return(t,u)=>(i(),l("div",{class:f(N.value)},[j("div",E,[t.$slots.title?(i(),l("div",H,[b(D,{text_style:e.headline_style},{default:_(()=>[r(t.$slots,"title",{},()=>[c("Title")])]),_:3},8,["text_style"])])):d("",!0),e.details?(i(),l("div",z,[r(t.$slots,"details",{},()=>[c(h(e.details),1)])])):d("",!0)]),e.button_label?(i(),l("footer",F,[b(L,{class:f($.value),url:e.url,size:"medium"},{default:_(()=>[r(t.$slots,"button_label",{},()=>[c(h(e.button_label),1)]),r(t.$slots,"button_icon")]),_:3},8,["class","url"])])):d("",!0)],2))}}),I=V;V.__docgenInfo={exportName:"default",displayName:"Cta",description:"",tags:{},props:[{name:"headline_style",description:"Title style for the headline.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"url",type:{name:"string"}},{name:"details",type:{name:"string"}},{name:"orientation",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"button_align_right",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"button_label",type:{name:"string"}},{name:"button_icon",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"title",description:"The title of the card. HTML is allowed."},{name:"details"},{name:"button_label"},{name:"button_icon"}],sourceFiles:["/home/runner/work/uids/uids/src/components/cta/Cta.vue"]};const J={title:"Components/CTA",parameters:{docs:{source:{code:null}}},component:I,tags:["autodocs"],argTypes:{headline_style:{name:"Title style",options:["uppercase","serif",""],control:{type:"select",labels:{uppercase:"Antonio (default)",serif:"Zilla Slab","":"Roboto"}},table:{category:"Display options"}},orientation:{name:"Orientation",options:["","left","inline"],control:{type:"select",labels:{"":"Centered (default)",left:"Left",inline:"Inline"}},table:{category:"Display options"}},url:{control:{type:"text"}},title:{control:{type:"text"}},details:{control:{type:"text"}},button_label:{control:{type:"text"}},button_icon:{control:{type:"text"}},button_align_right:{name:"Align button to right",table:{category:"Display options"}},...g.argTypes}},p=e=>({components:{UidsCta:I},setup(){return{args:e}},template:`
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  `}),n=p.bind({});n.args={url:"https://uiowa.edu/",title:"Be a Hawkeye",details:"<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>",button_label:"Request Information",button_icon:'<i class="fas fa-arrow-right"></i>',button_align_right:!1,headline_style:"uppercase",background:"gray",orientation:""};const a=p.bind({});a.args={...n.args,orientation:"inline"};const s=p.bind({});s.args={...n.args,orientation:"left"};var v,C,k;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...(k=(C=n.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var w,T,S;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...(S=(T=a.parameters)==null?void 0:T.docs)==null?void 0:S.source}}};var B,x,U;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCta
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-cta
      :url="args.url"
      :background="args.background"
      :title="args.title"
      :button_label="args.button_label"
      :button_icon="args.button_icon"
      :button_align_right="args.button_align_right"
      :details="args.details"
      :headline_style="args.headline_style"
      :orientation="args.orientation"
    >
    <template #details v-if="args.details"><div v-html="args.details" ></div></template>
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...(U=(x=s.parameters)==null?void 0:x.docs)==null?void 0:U.source}}};const K=["Centered","Inline","Left"];export{n as Centered,a as Inline,s as Left,K as __namedExportsOrder,J as default};
