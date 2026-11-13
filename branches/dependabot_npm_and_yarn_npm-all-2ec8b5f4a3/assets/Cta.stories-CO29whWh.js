import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,S as n,a as r,c as i,d as a,f as o,g as s,i as c,k as l,n as u,s as d,u as f,v as p}from"./iframe-BMXo6Z5W.js";import"./_background-5iX1z5X0.js";import{n as m,t as h}from"./utlity-62E8ZhRl.js";import{n as g,t as _}from"./background-Cr6Xy-3k.js";import{n as v,t as y}from"./Button-CcoubRH8.js";import{n as b,t as x}from"./Headline-C5DCqSWd.js";var S,C,w,T,E,D;function O(){return(O=e((()=>{u(),b(),v(),g(),m(),S={class:`cta__container`},C={key:0,class:`cta__title`},w={class:`headline__heading`},T={key:1,class:`cta__content`},E={key:0,class:`cta__link`},D=o({__name:`Cta`,props:{headline_style:{type:String,default:``},url:{type:String},details:{type:String},orientation:{type:String,default:``},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:``},..._.props},setup(e){let o=e,u=c(()=>{let e=[`cta`];return _.addBackgroundClass(e,o),[`button_align_right`].forEach(t=>{o[t]===!0&&e.push(`cta--${h(t)}`)}),o.orientation&&e.push(`cta--${h(o.orientation)}`),e}),m=c(()=>[``]);return(o,c)=>(s(),i(`div`,{class:t(u.value)},[r(`div`,S,[o.$slots.title?(s(),i(`div`,C,[a(x,{text_style:e.headline_style},{default:n(()=>[r(`span`,w,[p(o.$slots,`title`,{},()=>[c[0]||=f(`Title`,-1)])])]),_:3},8,[`text_style`])])):d(``,!0),e.details?(s(),i(`div`,T,[p(o.$slots,`details`,{},()=>[f(l(e.details),1)])])):d(``,!0)]),e.button_label?(s(),i(`footer`,E,[a(y,{class:t(m.value),url:e.url,size:`medium`},{default:n(()=>[p(o.$slots,`button_label`,{},()=>[f(l(e.button_label),1)]),p(o.$slots,`button_icon`)]),_:3},8,[`class`,`url`])])):d(``,!0)],2))}})})))()}var k;function A(){return(A=e((()=>{O(),k=D,D.__docgenInfo=Object.assign({displayName:D.name??D.__name},{exportName:`default`,displayName:`Cta`,description:``,tags:{},props:[{name:`headline_style`,description:`Title style for the headline.`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`url`,type:{name:`string`}},{name:`details`,type:{name:`string`}},{name:`orientation`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`button_align_right`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`button_label`,type:{name:`string`}},{name:`button_icon`,type:{name:`string`},defaultValue:{func:!1,value:`''`}}],slots:[{name:`title`},{name:`details`},{name:`button_label`},{name:`button_icon`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/cta/Cta.vue`]})})))()}var j,M,N,P,F,I;function L(){return(L=e((()=>{A(),g(),j={title:`Components/CTA`,parameters:{docs:{source:{code:null}}},component:k,tags:[`autodocs`],argTypes:{headline_style:{name:`Title style`,options:[`uppercase`,`serif`,``],control:{type:`select`,labels:{uppercase:`Antonio (default)`,serif:`Zilla Slab`,"":`Roboto`}},table:{category:`Display options`}},orientation:{name:`Orientation`,options:[``,`left`,`inline`],control:{type:`select`,labels:{"":`Centered (default)`,left:`Left`,inline:`Inline`}},table:{category:`Display options`}},url:{control:{type:`text`}},title:{control:{type:`text`}},details:{control:{type:`text`}},button_label:{control:{type:`text`}},button_icon:{control:{type:`text`}},button_align_right:{name:`Align button to right`,table:{category:`Display options`}},..._.argTypes}},M=e=>({components:{UidsCta:k},setup(){return{args:e}},template:`
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
    <template #title v-if="args.title">{{ args.title }}</template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  `}),N=M.bind({}),N.args={url:`https://uiowa.edu/`,title:`Be a Hawkeye`,details:`<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>`,button_label:`Request Information`,button_icon:`<i class="fas fa-arrow-right"></i>`,button_align_right:!1,headline_style:`uppercase`,background:`gray`,orientation:``},P=M.bind({}),P.args={...N.args,orientation:`inline`},F=M.bind({}),F.args={...N.args,orientation:`left`},I=[`Centered`,`Inline`,`Left`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`args => ({
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
    <template #title v-if="args.title">{{ args.title }}</template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`args => ({
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
    <template #title v-if="args.title">{{ args.title }}</template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`args => ({
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
    <template #title v-if="args.title">{{ args.title }}</template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...F.parameters?.docs?.source}}}})))()}L();export{N as Centered,P as Inline,F as Left,I as __namedExportsOrder,j as default};