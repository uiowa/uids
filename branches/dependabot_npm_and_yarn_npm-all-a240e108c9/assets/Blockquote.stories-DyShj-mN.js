import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{D as t,T as n,_ as r,d as i,h as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f}from"./iframe-C2ufwrXp.js";import{t as p}from"./_background-C-bRz1Ob.js";import{n as m,t as h}from"./utlity-BUdJjjei.js";import{n as g,t as _}from"./background-CpAjS5xG.js";import{t as v}from"./_media-BiJSlxmc.js";var y=e((()=>{})),b,x,S,C,w,T,E=e((()=>{f(),y(),p(),v(),g(),m(),b={key:0,class:`blockquote__media media--circle`},x={class:`blockquote__content`},S={key:0,class:`blockquote__paragraph`},C={key:0,class:`blockquote__media media--circle`},w={key:0,href:`{{ url }}`},T=i({__name:`Blockquote`,props:{media_position_bottom:{type:Boolean,default:!0},content:{type:String},footer:{type:String},url:{type:String},cite_text:{type:String},orientation:{type:String,default:``},..._.props},setup(e){let i=e,f=u(()=>{let e=[`blockquote`];return _.addBackgroundClass(e,i),i.orientation&&e.push(`blockquote--${h(i.orientation)}`),e});return(i,u)=>(a(),d(`blockquote`,{class:n([...f.value,{[`blockquote--img-${e.media_position_bottom?`below`:`above`}`]:i.$slots.media}])},[e.media_position_bottom?l(``,!0):(a(),d(c,{key:0},[i.$slots.media?(a(),d(`div`,b,[r(i.$slots,`media`)])):l(``,!0)],64)),o(`div`,x,[e.content?(a(),d(`div`,S,[r(i.$slots,`content`,{},()=>[s(t(e.content),1)])])):l(``,!0),o(`footer`,null,[e.media_position_bottom?(a(),d(c,{key:0},[i.$slots.media?(a(),d(`div`,C,[r(i.$slots,`media`)])):l(``,!0)],64)):l(``,!0),o(`div`,null,[r(i.$slots,`footer`,{},()=>[s(t(e.footer),1)]),o(`cite`,null,[e.url?(a(),d(`a`,w,t(e.cite_text),1)):(a(),d(c,{key:1},[s(t(e.cite_text),1)],64))])])])])],2))}})})),D,O=e((()=>{E(),E(),D=T,T.__docgenInfo=Object.assign({displayName:T.name??T.__name},{exportName:`default`,displayName:`Blockquote`,description:``,tags:{},props:[{name:`media_position_bottom`,type:{name:`boolean`},defaultValue:{func:!1,value:`true`}},{name:`content`,type:{name:`string`}},{name:`footer`,type:{name:`string`}},{name:`url`,type:{name:`string`}},{name:`cite_text`,type:{name:`string`}},{name:`orientation`,type:{name:`string`},defaultValue:{func:!1,value:`''`}}],slots:[{name:`media`},{name:`content`},{name:`footer`}],sourceFiles:[`/home/runner/work/uids/uids/src/components/blockquote/Blockquote.vue`]})})),k,A=e((()=>{k=`/branches/dependabot_npm_and_yarn_npm-all-a240e108c9/assets/herky-square-loMo5jDD.jpg`})),j,M,N,P,F,I;e((()=>{O(),g(),A(),j={title:`Components/Blockquote`,parameters:{docs:{source:{code:null}}},component:D,tags:[`autodocs`],argTypes:{orientation:{name:`Orientation`,options:[``,`center`,`right`],control:{type:`select`,labels:{"":`Left (default)`,center:`Center`,right:`Right`}},table:{category:`Display options`}},url:{control:{type:`text`}},media_position_bottom:{control:{type:`boolean`}},footer:{control:{type:`text`}},cite_text:{control:{type:`text`}},content:{control:{type:`text`}},media:{name:`Media`,control:`text`,table:{category:`Media`}},..._.argTypes}},M=e=>({components:{UidsBlockquote:D},setup(){return{args:e}},template:`
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