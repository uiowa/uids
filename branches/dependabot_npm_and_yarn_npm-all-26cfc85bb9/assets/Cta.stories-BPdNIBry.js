import{i as e}from"./preload-helper-FXFgdrXs.js";import{A as t,C as n,D as r,E as i,F as a,G as o,L as s,V as c,j as l,k as u,q as d,w as f,x as p}from"./iframe-CC5t_kX3.js";import{t as m}from"./_background-Z6_7z_5y.js";import{n as h,t as g}from"./utlity-X4vYTsZ5.js";import{n as _,t as v}from"./background-B42rUdKZ.js";import{n as y,t as b}from"./Button-DHLRiJnH.js";import{n as x,t as S}from"./Headline-Bkgu7azn.js";var C=e((()=>{})),w,T,E,D,O,k=e((()=>{p(),C(),m(),x(),y(),_(),h(),w={class:`cta__container`},T={key:0,class:`cta__title`},E={key:1,class:`cta__content`},D={key:0,class:`cta__link`},O=l({__name:`Cta`,props:{headline_style:{type:String,default:``},url:{type:String},details:{type:String},orientation:{type:String,default:``},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:``},...v.props},setup(e){let l=e,p=n(()=>{let e=[`cta`];return v.addBackgroundClass(e,l),[`button_align_right`].forEach(t=>{l[t]===!0&&e.push(`cta--${g(t)}`)}),l.orientation&&e.push(`cta--${g(l.orientation)}`),e}),m=n(()=>[``]);return(n,l)=>(a(),r(`div`,{class:o(p.value)},[f(`div`,w,[n.$slots.title?(a(),r(`div`,T,[t(S,{text_style:e.headline_style},{default:c(()=>[s(n.$slots,`title`,{},()=>[l[0]||=u(`Title`,-1)])]),_:3},8,[`text_style`])])):i(``,!0),e.details?(a(),r(`div`,E,[s(n.$slots,`details`,{},()=>[u(d(e.details),1)])])):i(``,!0)]),e.button_label?(a(),r(`footer`,D,[t(b,{class:o(m.value),url:e.url,size:`medium`},{default:c(()=>[s(n.$slots,`button_label`,{},()=>[u(d(e.button_label),1)]),s(n.$slots,`button_icon`)]),_:3},8,[`class`,`url`])])):i(``,!0)],2))}})})),A,j=e((()=>{k(),k(),A=O})),M,N,P,F,I,L;e((()=>{j(),_(),M={title:`Components/CTA`,parameters:{docs:{source:{code:null}}},component:A,tags:[`autodocs`],argTypes:{headline_style:{name:`Title style`,options:[`uppercase`,`serif`,``],control:{type:`select`,labels:{uppercase:`Antonio (default)`,serif:`Zilla Slab`,"":`Roboto`}},table:{category:`Display options`}},orientation:{name:`Orientation`,options:[``,`left`,`inline`],control:{type:`select`,labels:{"":`Centered (default)`,left:`Left`,inline:`Inline`}},table:{category:`Display options`}},url:{control:{type:`text`}},title:{control:{type:`text`}},details:{control:{type:`text`}},button_label:{control:{type:`text`}},button_icon:{control:{type:`text`}},button_align_right:{name:`Align button to right`,table:{category:`Display options`}},...v.argTypes}},N=e=>({components:{UidsCta:A},setup(){return{args:e}},template:`
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
  `}),P=N.bind({}),P.args={url:`https://uiowa.edu/`,title:`Be a Hawkeye`,details:`<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>`,button_label:`Request Information`,button_icon:`<i class="fas fa-arrow-right"></i>`,button_align_right:!1,headline_style:`uppercase`,background:`gray`,orientation:``},F=N.bind({}),F.args={...P.args,orientation:`inline`},I=N.bind({}),I.args={...P.args,orientation:`left`},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`args => ({
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
    <template #title v-if="args.title"><div :class="getClasses" v-html="args.title" ></div></template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`args => ({
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
})`,...I.parameters?.docs?.source}}},L=[`Centered`,`Inline`,`Left`]}))();export{P as Centered,F as Inline,I as Left,L as __namedExportsOrder,M as default};