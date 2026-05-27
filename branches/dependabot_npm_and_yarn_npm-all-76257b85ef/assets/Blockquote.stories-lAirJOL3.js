import{i as e}from"./preload-helper-D0XlrO8e.js";import{$ as t,Q as n,St as r,X as i,Z as a,bt as o,ft as s,it as c,nt as l,ot as u,tt as d,ut as f}from"./iframe-W-a_eXlx.js";import{t as p}from"./_background-Cam4h2qd.js";import{n as m,t as h}from"./utlity-DZOpQIXn.js";import{n as g,t as _}from"./background-C-HUK23X.js";import{t as v}from"./_media-COCaUICn.js";var y=e((()=>{})),b,x,S,C,w,T,E=e((()=>{i(),y(),p(),v(),g(),m(),b={key:0,class:`blockquote__media media--circle`},x={class:`blockquote__content`},S={key:0,class:`blockquote__paragraph`},C={key:0,class:`blockquote__media media--circle`},w={key:0,href:`{{ url }}`},T=u({__name:`Blockquote`,props:{media_position_bottom:{type:Boolean,default:!0},content:{type:String},footer:{type:String},url:{type:String},cite_text:{type:String},orientation:{type:String,default:``},..._.props},setup(e){let i=e,u=n(()=>{let e=[`blockquote`];return _.addBackgroundClass(e,i),i.orientation&&e.push(`blockquote--${h(i.orientation)}`),e});return(n,i)=>(f(),l(`blockquote`,{class:o([...u.value,{[`blockquote--img-${e.media_position_bottom?`below`:`above`}`]:n.$slots.media}])},[e.media_position_bottom?d(``,!0):(f(),l(a,{key:0},[n.$slots.media?(f(),l(`div`,b,[s(n.$slots,`media`)])):d(``,!0)],64)),t(`div`,x,[e.content?(f(),l(`div`,S,[s(n.$slots,`content`,{},()=>[c(r(e.content),1)])])):d(``,!0),t(`footer`,null,[e.media_position_bottom?(f(),l(a,{key:0},[n.$slots.media?(f(),l(`div`,C,[s(n.$slots,`media`)])):d(``,!0)],64)):d(``,!0),t(`div`,null,[s(n.$slots,`footer`,{},()=>[c(r(e.footer),1)]),t(`cite`,null,[e.url?(f(),l(`a`,w,r(e.cite_text),1)):(f(),l(a,{key:1},[c(r(e.cite_text),1)],64))])])])])],2))}})})),D,O=e((()=>{E(),E(),D=T})),k,A=e((()=>{k=`/branches/dependabot_npm_and_yarn_npm-all-76257b85ef/assets/herky-square-loMo5jDD.jpg`})),j,M,N,P,F,I;e((()=>{O(),g(),A(),j={title:`Components/Blockquote`,parameters:{docs:{source:{code:null}}},component:D,tags:[`autodocs`],argTypes:{orientation:{name:`Orientation`,options:[``,`center`,`right`],control:{type:`select`,labels:{"":`Left (default)`,center:`Center`,right:`Right`}},table:{category:`Display options`}},url:{control:{type:`text`}},media_position_bottom:{control:{type:`boolean`}},footer:{control:{type:`text`}},cite_text:{control:{type:`text`}},content:{control:{type:`text`}},media:{name:`Media`,control:`text`,table:{category:`Media`}},..._.argTypes}},M=e=>({components:{UidsBlockquote:D},setup(){return{args:e}},template:`
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
  `}),N=M.bind({}),N.args={url:`https://uiowa.edu/`,cite_text:`Be a Hawkeye`,content:`<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>`,footer:`<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>`,media_position_bottom:!1,background:``,orientation:``,media:`<img src="`+k+`" alt="Alt">`},P=M.bind({}),P.args={...N.args,orientation:`center`},F=M.bind({}),F.args={...N.args,orientation:`right`},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`args => ({
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
})`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`args => ({
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
})`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`args => ({
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
})`,...F.parameters?.docs?.source}}},I=[`Left`,`Centered`,`Right`]}))();export{P as Centered,N as Left,F as Right,I as __namedExportsOrder,j as default};