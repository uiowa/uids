import{d as A,l as b,o as l,b as i,g as D,e as _,w as h,s as d,n as r,p as f,f as c,t as y}from"./vue.esm-bundler-dbb741ea.js";import{B as g}from"./_background-585d1d6c.js";import{_ as L}from"./Headline-3fb0bafb.js";import{_ as U}from"./Button-9b74101e.js";import{c as v}from"./utlity-a0fec18e.js";const j={class:"cta__container"},E={key:0,class:"cta__title"},z={key:1,class:"cta__content"},F={key:0,class:"cta__link"},p=A({__name:"Cta",props:{headline_style:{type:String,default:""},url:{type:String},details:{type:String},orientation:{type:String,default:""},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:""},...g.props},setup(e){const o=e,I=b(()=>{let t=["cta"];return g.addBackgroundClass(t,o),["button_align_right"].forEach(u=>{o[u]===!0&&t.push(`cta--${v(u)}`)}),o.orientation&&t.push(`cta--${v(o.orientation)}`),t}),N=b(()=>[""]);return(t,u)=>(l(),i("div",{class:f(I.value)},[D("div",j,[t.$slots.title?(l(),i("div",E,[_(L,{text_style:e.headline_style},{default:h(()=>[r(t.$slots,"title",{},()=>[c("Title")])]),_:3},8,["text_style"])])):d("",!0),e.details?(l(),i("div",z,[r(t.$slots,"details",{},()=>[c(y(e.details),1)])])):d("",!0)]),e.button_label?(l(),i("footer",F,[_(U,{class:f(N.value),url:e.url,size:"medium"},{default:h(()=>[r(t.$slots,"button_label",{},()=>[c(y(e.button_label),1)]),r(t.$slots,"button_icon")]),_:3},8,["class","url"])])):d("",!0)],2))}});p.__docgenInfo={exportName:"default",displayName:"Cta",description:"",tags:{},props:[{name:"headline_style",description:"Title style for the headline.",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"url",type:{name:"string"}},{name:"details",type:{name:"string"}},{name:"orientation",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"button_align_right",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"button_label",type:{name:"string"}},{name:"button_icon",type:{name:"string"},defaultValue:{func:!1,value:"''"}}],slots:[{name:"title",description:"The title of the card. HTML is allowed."},{name:"details"},{name:"button_label"},{name:"button_icon"}],sourceFiles:["/home/runner/work/uids/uids/src/components/cta/Cta.vue"]};const Z={title:"Components/CTA",parameters:{docs:{source:{code:null}}},component:p,tags:["autodocs"],argTypes:{headline_style:{name:"Title style",options:["uppercase","serif",""],control:{type:"select",labels:{uppercase:"Antonio (default)",serif:"Zilla Slab","":"Roboto"}},table:{category:"Display options"}},orientation:{name:"Orientation",options:["","left","inline"],control:{type:"select",labels:{"":"Centered (default)",left:"Left",inline:"Inline"}},table:{category:"Display options"}},url:{control:{type:"text"}},title:{control:{type:"text"}},details:{control:{type:"text"}},button_label:{control:{type:"text"}},button_icon:{control:{type:"text"}},button_align_right:{name:"Align button to right",table:{category:"Display options"}},...g.argTypes}},m=e=>({components:{UidsCta:p},setup(){return{args:e}},template:`
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
  `}),n=m.bind({});n.args={url:"https://uiowa.edu/",title:"Be a Hawkeye",details:"<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>",button_label:"Request Information",button_icon:'<i class="fas fa-arrow-right"></i>',button_align_right:!1,headline_style:"uppercase",background:"gray",orientation:""};const a=m.bind({});a.args={...n.args,orientation:"inline"};const s=m.bind({});s.args={...n.args,orientation:"left"};var C,k,w;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
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
})`,...(w=(k=n.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var T,S,$;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
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
})`,...($=(S=a.parameters)==null?void 0:S.docs)==null?void 0:$.source}}};var x,B,V;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => ({
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
})`,...(V=(B=s.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};const G=["Centered","Inline","Left"];export{n as Centered,a as Inline,s as Left,G as __namedExportsOrder,Z as default};
