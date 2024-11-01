import{d as D,k as m,c as r,e as U,a as b,b as _,q as d,p as l,n as h,o as u,f as g,t as y}from"./vue.esm-bundler-B7frGVmg.js";import{B as c}from"./_background-DF8fQncj.js";import{_ as V}from"./Headline.vue_vue_type_script_setup_true_lang-Ccvxo8_6.js";import{_ as j}from"./Button.vue_vue_type_script_setup_true_lang-D3AdEkgM.js";import{c as f}from"./utlity-CAV5GFHh.js";const E={class:"cta__container"},L={key:0,class:"cta__title"},q={key:1,class:"cta__content"},z={key:0,class:"cta__link"},A=D({__name:"Cta",props:{headline_style:{type:String,default:""},url:{type:String},details:{type:String},orientation:{type:String,default:""},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:""},...c.props},setup(e){const i=e,I=m(()=>{let t=["cta"];return c.addBackgroundClass(t,i),["button_align_right"].forEach(a=>{i[a]===!0&&t.push(`cta--${f(a)}`)}),i.orientation&&t.push(`cta--${f(i.orientation)}`),t}),N=m(()=>[""]);return(t,a)=>(u(),r("div",{class:h(I.value)},[U("div",E,[t.$slots.title?(u(),r("div",L,[b(V,{text_style:e.headline_style},{default:_(()=>[l(t.$slots,"title",{},()=>[a[0]||(a[0]=g("Title"))])]),_:3},8,["text_style"])])):d("",!0),e.details?(u(),r("div",q,[l(t.$slots,"details",{},()=>[g(y(e.details),1)])])):d("",!0)]),e.button_label?(u(),r("footer",z,[b(j,{class:h(N.value),url:e.url,size:"medium"},{default:_(()=>[l(t.$slots,"button_label",{},()=>[g(y(e.button_label),1)]),l(t.$slots,"button_icon")]),_:3},8,["class","url"])])):d("",!0)],2))}}),G={title:"Components/CTA",parameters:{docs:{source:{code:null}}},component:A,tags:["autodocs"],argTypes:{headline_style:{name:"Title style",options:["uppercase","serif",""],control:{type:"select",labels:{uppercase:"Antonio (default)",serif:"Zilla Slab","":"Roboto"}},table:{category:"Display options"}},orientation:{name:"Orientation",options:["","left","inline"],control:{type:"select",labels:{"":"Centered (default)",left:"Left",inline:"Inline"}},table:{category:"Display options"}},url:{control:{type:"text"}},title:{control:{type:"text"}},details:{control:{type:"text"}},button_label:{control:{type:"text"}},button_icon:{control:{type:"text"}},button_align_right:{name:"Align button to right",table:{category:"Display options"}},...c.argTypes}},p=e=>({components:{UidsCta:A},setup(){return{args:e}},template:`
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
  `}),n=p.bind({});n.args={url:"https://uiowa.edu/",title:"Be a Hawkeye",details:"<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>",button_label:"Request Information",button_icon:'<i class="fas fa-arrow-right"></i>',button_align_right:!1,headline_style:"uppercase",background:"gray",orientation:""};const s=p.bind({});s.args={...n.args,orientation:"inline"};const o=p.bind({});o.args={...n.args,orientation:"left"};var v,C,k;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(k=(C=n.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var S,w,T;s.parameters={...s.parameters,docs:{...(S=s.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
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
})`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};var $,B,x;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`args => ({
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
})`,...(x=(B=o.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};const J=["Centered","Inline","Left"];export{n as Centered,s as Inline,o as Left,J as __namedExportsOrder,G as default};
