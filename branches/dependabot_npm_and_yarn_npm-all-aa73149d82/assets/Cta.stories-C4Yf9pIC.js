import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{D as t,T as n,_ as r,d as i,h as a,i as o,l as s,o as c,r as l,s as u,t as d,u as f,x as p}from"./iframe-BlOR0TaQ.js";import{t as m}from"./_background-VQJYTdZe.js";import{n as h,t as g}from"./utlity-BUdJjjei.js";import{n as _,t as v}from"./background-CpAjS5xG.js";import{n as y,t as b}from"./Button-BQx6GcII.js";import{n as x,t as S}from"./Headline-DuCkANEi.js";var C=e((()=>{})),w,T,E,D,O,k,A=e((()=>{d(),C(),m(),x(),y(),_(),h(),w={class:`cta__container`},T={key:0,class:`cta__title`},E={class:`headline__heading`},D={key:1,class:`cta__content`},O={key:0,class:`cta__link`},k=i({__name:`Cta`,props:{headline_style:{type:String,default:``},url:{type:String},details:{type:String},orientation:{type:String,default:``},button_align_right:{type:Boolean,default:!1},button_label:{type:String},button_icon:{type:String,default:``},...v.props},setup(e){let i=e,d=l(()=>{let e=[`cta`];return v.addBackgroundClass(e,i),[`button_align_right`].forEach(t=>{i[t]===!0&&e.push(`cta--${g(t)}`)}),i.orientation&&e.push(`cta--${g(i.orientation)}`),e}),m=l(()=>[``]);return(i,l)=>(a(),u(`div`,{class:n(d.value)},[o(`div`,w,[i.$slots.title?(a(),u(`div`,T,[f(S,{text_style:e.headline_style},{default:p(()=>[o(`span`,E,[r(i.$slots,`title`,{},()=>[l[0]||=s(`Title`,-1)])])]),_:3},8,[`text_style`])])):c(``,!0),e.details?(a(),u(`div`,D,[r(i.$slots,`details`,{},()=>[s(t(e.details),1)])])):c(``,!0)]),e.button_label?(a(),u(`footer`,O,[f(b,{class:n(m.value),url:e.url,size:`medium`},{default:p(()=>[r(i.$slots,`button_label`,{},()=>[s(t(e.button_label),1)]),r(i.$slots,`button_icon`)]),_:3},8,[`class`,`url`])])):c(``,!0)],2))}})})),j,M=e((()=>{A(),A(),j=k,k.__docgenInfo=Object.assign({displayName:k.name??k.__name},{exportName:`default`,displayName:`Cta`,description:``,tags:{},props:[{name:`headline_style`,description:`Title style for the headline.`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`url`,type:{name:`string`}},{name:`details`,type:{name:`string`}},{name:`orientation`,type:{name:`string`},defaultValue:{func:!1,value:`''`}},{name:`button_align_right`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`button_label`,type:{name:`string`}},{name:`button_icon`,type:{name:`string`},defaultValue:{func:!1,value:`''`}}],slots:[{name:`title`},{name:`details`},{name:`button_label`},{name:`button_icon`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/cta/Cta.vue`]})})),N,P,F,I,L,R;e((()=>{M(),_(),N={title:`Components/CTA`,parameters:{docs:{source:{code:null}}},component:j,tags:[`autodocs`],argTypes:{headline_style:{name:`Title style`,options:[`uppercase`,`serif`,``],control:{type:`select`,labels:{uppercase:`Antonio (default)`,serif:`Zilla Slab`,"":`Roboto`}},table:{category:`Display options`}},orientation:{name:`Orientation`,options:[``,`left`,`inline`],control:{type:`select`,labels:{"":`Centered (default)`,left:`Left`,inline:`Inline`}},table:{category:`Display options`}},url:{control:{type:`text`}},title:{control:{type:`text`}},details:{control:{type:`text`}},button_label:{control:{type:`text`}},button_icon:{control:{type:`text`}},button_align_right:{name:`Align button to right`,table:{category:`Display options`}},...v.argTypes}},P=e=>({components:{UidsCta:j},setup(){return{args:e}},template:`
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