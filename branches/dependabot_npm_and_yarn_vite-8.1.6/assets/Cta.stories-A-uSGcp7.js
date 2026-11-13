import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{b as t,f as n,i as r,j as i,k as a,l as o,m as s,o as c,p as l,s as u,u as d,v as f,w as p}from"./iframe-Bh0nqqze.js";import{t as m}from"./_background-D5tIyOI9.js";import{n as h,t as g}from"./utlity-BUdJjjei.js";import{n as _,t as v}from"./background-CpAjS5xG.js";import{n as y,t as b}from"./Button-CimFcqmv.js";import{n as x,t as S}from"./Headline-BA_g_hTp.js";var C=e((()=>{})),w,T,E,D,O,k,A=e((()=>{r(),C(),m(),x(),y(),_(),h(),w={class:`cta__container`},T={key:0,class:`cta__title`},E={class:`headline__heading`},D={key:1,class:`cta__content`},O={key:0,class:`cta__link`},k=s({__name:`Cta`,props:{headline_style:{type:String,default:``},url:{type:String},details:{type:String},orientation:{type:String,default:``},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:``},...v.props},setup(e){let r=e,s=c(()=>{let e=[`cta`];return v.addBackgroundClass(e,r),[`button_align_right`].forEach(t=>{r[t]===!0&&e.push(`cta--${g(t)}`)}),r.orientation&&e.push(`cta--${g(r.orientation)}`),e}),m=c(()=>[``]);return(r,c)=>(f(),d(`div`,{class:a(s.value)},[u(`div`,w,[r.$slots.title?(f(),d(`div`,T,[l(S,{text_style:e.headline_style},{default:p(()=>[u(`span`,E,[t(r.$slots,`title`,{},()=>[c[0]||=n(`Title`,-1)])])]),_:3},8,[`text_style`])])):o(``,!0),e.details?(f(),d(`div`,D,[t(r.$slots,`details`,{},()=>[n(i(e.details),1)])])):o(``,!0)]),e.button_label?(f(),d(`footer`,O,[l(b,{class:a(m.value),url:e.url,size:`medium`},{default:p(()=>[t(r.$slots,`button_label`,{},()=>[n(i(e.button_label),1)]),t(r.$slots,`button_icon`)]),_:3},8,[`class`,`url`])])):o(``,!0)],2))}})})),j,M=e((()=>{A(),A(),j=k})),N,P,F,I,L,R;e((()=>{M(),_(),N={title:`Components/CTA`,parameters:{docs:{source:{code:null}}},component:j,tags:[`autodocs`],argTypes:{headline_style:{name:`Title style`,options:[`uppercase`,`serif`,``],control:{type:`select`,labels:{uppercase:`Antonio (default)`,serif:`Zilla Slab`,"":`Roboto`}},table:{category:`Display options`}},orientation:{name:`Orientation`,options:[``,`left`,`inline`],control:{type:`select`,labels:{"":`Centered (default)`,left:`Left`,inline:`Inline`}},table:{category:`Display options`}},url:{control:{type:`text`}},title:{control:{type:`text`}},details:{control:{type:`text`}},button_label:{control:{type:`text`}},button_icon:{control:{type:`text`}},button_align_right:{name:`Align button to right`,table:{category:`Display options`}},...v.argTypes}},P=e=>({components:{UidsCta:j},setup(){return{args:e}},template:`
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