import{i as e}from"./preload-helper-DylEL7Is.js";import{$ as t,Ct as n,Q as r,Tt as i,X as a,_t as o,at as s,ft as c,it as l,nt as u,ot as d,tt as f,ut as p}from"./iframe-DCoWvCo2.js";import{t as m}from"./_background-DBZ3BiBv.js";import{n as h,t as g}from"./utlity-DQtQZAds.js";import{n as _,t as v}from"./background-CF50TMRF.js";import{n as y,t as b}from"./Button-BHRjtnoM.js";import{n as x,t as S}from"./Headline-BTXifq3m.js";var C=e((()=>{})),w,T,E,D,O,k,A=e((()=>{a(),C(),m(),x(),y(),_(),h(),w={class:`cta__container`},T={key:0,class:`cta__title`},E={class:`headline__heading`},D={key:1,class:`cta__content`},O={key:0,class:`cta__link`},k=d({__name:`Cta`,props:{headline_style:{type:String,default:``},url:{type:String},details:{type:String},orientation:{type:String,default:``},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:``},...v.props},setup(e){let a=e,d=r(()=>{let e=[`cta`];return v.addBackgroundClass(e,a),[`button_align_right`].forEach(t=>{a[t]===!0&&e.push(`cta--${g(t)}`)}),a.orientation&&e.push(`cta--${g(a.orientation)}`),e}),m=r(()=>[``]);return(r,a)=>(p(),u(`div`,{class:n(d.value)},[t(`div`,w,[r.$slots.title?(p(),u(`div`,T,[s(S,{text_style:e.headline_style},{default:o(()=>[t(`span`,E,[c(r.$slots,`title`,{},()=>[a[0]||=l(`Title`,-1)])])]),_:3},8,[`text_style`])])):f(``,!0),e.details?(p(),u(`div`,D,[c(r.$slots,`details`,{},()=>[l(i(e.details),1)])])):f(``,!0)]),e.button_label?(p(),u(`footer`,O,[s(b,{class:n(m.value),url:e.url,size:`medium`},{default:o(()=>[c(r.$slots,`button_label`,{},()=>[l(i(e.button_label),1)]),c(r.$slots,`button_icon`)]),_:3},8,[`class`,`url`])])):f(``,!0)],2))}})})),j,M=e((()=>{A(),A(),j=k})),N,P,F,I,L,R;e((()=>{M(),_(),N={title:`Components/CTA`,parameters:{docs:{source:{code:null}}},component:j,tags:[`autodocs`],argTypes:{headline_style:{name:`Title style`,options:[`uppercase`,`serif`,``],control:{type:`select`,labels:{uppercase:`Antonio (default)`,serif:`Zilla Slab`,"":`Roboto`}},table:{category:`Display options`}},orientation:{name:`Orientation`,options:[``,`left`,`inline`],control:{type:`select`,labels:{"":`Centered (default)`,left:`Left`,inline:`Inline`}},table:{category:`Display options`}},url:{control:{type:`text`}},title:{control:{type:`text`}},details:{control:{type:`text`}},button_label:{control:{type:`text`}},button_icon:{control:{type:`text`}},button_align_right:{name:`Align button to right`,table:{category:`Display options`}},...v.argTypes}},P=e=>({components:{UidsCta:j},setup(){return{args:e}},template:`
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
  `}),F=P.bind({}),F.args={url:`https://uiowa.edu/`,title:`Be a Hawkeye`,details:`<p>Iowa is where great stories begin. It's time to start yours. Find out how.</p>`,button_label:`Request Information`,button_icon:`<i class="fas fa-arrow-right"></i>`,button_align_right:!1,headline_style:`uppercase`,background:`gray`,orientation:``},I=P.bind({}),I.args={...F.args,orientation:`inline`},L=P.bind({}),L.args={...F.args,orientation:`left`},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`args => ({
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
    <template #title v-if="args.title">{{ args.title }}</template>
    <template #button_icon v-if="args.button_icon"><span v-html="args.button_icon" ></span></template>
    </uids-cta>
  \`
})`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`args => ({
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
})`,...L.parameters?.docs?.source}}},R=[`Centered`,`Inline`,`Left`]}))();export{F as Centered,I as Inline,L as Left,R as __namedExportsOrder,N as default};