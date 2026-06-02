import{i as e}from"./preload-helper-CY32wZhQ.js";import{C as t,D as n,E as r,F as i,G as a,L as o,S as s,j as c,k as l,q as u,w as d,x as f}from"./iframe-r0DNppKC.js";import{t as p}from"./_background-CzVy5Tt-.js";import{n as m,t as h}from"./utlity-WcIw-Mp3.js";import{n as g,t as _}from"./background-CRdfXkyi.js";import{t as v}from"./_media-BIktqqnn.js";var y=e((()=>{})),b,x,S,C,w,T,E=e((()=>{f(),y(),p(),v(),g(),m(),b={key:0,class:`blockquote__media media--circle`},x={class:`blockquote__content`},S={key:0,class:`blockquote__paragraph`},C={key:0,class:`blockquote__media media--circle`},w={key:0,href:`{{ url }}`},T=c({__name:`Blockquote`,props:{media_position_bottom:{type:Boolean,default:!0},content:{type:String},footer:{type:String},url:{type:String},cite_text:{type:String},orientation:{type:String,default:``},..._.props},setup(e){let c=e,f=t(()=>{let e=[`blockquote`];return _.addBackgroundClass(e,c),c.orientation&&e.push(`blockquote--${h(c.orientation)}`),e});return(t,c)=>(i(),n(`blockquote`,{class:a([...f.value,{[`blockquote--img-${e.media_position_bottom?`below`:`above`}`]:t.$slots.media}])},[e.media_position_bottom?r(``,!0):(i(),n(s,{key:0},[t.$slots.media?(i(),n(`div`,b,[o(t.$slots,`media`)])):r(``,!0)],64)),d(`div`,x,[e.content?(i(),n(`div`,S,[o(t.$slots,`content`,{},()=>[l(u(e.content),1)])])):r(``,!0),d(`footer`,null,[e.media_position_bottom?(i(),n(s,{key:0},[t.$slots.media?(i(),n(`div`,C,[o(t.$slots,`media`)])):r(``,!0)],64)):r(``,!0),d(`div`,null,[o(t.$slots,`footer`,{},()=>[l(u(e.footer),1)]),d(`cite`,null,[e.url?(i(),n(`a`,w,u(e.cite_text),1)):(i(),n(s,{key:1},[l(u(e.cite_text),1)],64))])])])])],2))}})})),D,O=e((()=>{E(),E(),D=T})),k,A=e((()=>{k=`/branches/dependabot_npm_and_yarn_npm-all-e15eee19a3/assets/herky-square-loMo5jDD.jpg`})),j,M,N,P,F,I;e((()=>{O(),g(),A(),j={title:`Components/Blockquote`,parameters:{docs:{source:{code:null}}},component:D,tags:[`autodocs`],argTypes:{orientation:{name:`Orientation`,options:[``,`center`,`right`],control:{type:`select`,labels:{"":`Left (default)`,center:`Center`,right:`Right`}},table:{category:`Display options`}},url:{control:{type:`text`}},media_position_bottom:{control:{type:`boolean`}},footer:{control:{type:`text`}},cite_text:{control:{type:`text`}},content:{control:{type:`text`}},media:{name:`Media`,control:`text`,table:{category:`Media`}},..._.argTypes}},M=e=>({components:{UidsBlockquote:D},setup(){return{args:e}},template:`
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