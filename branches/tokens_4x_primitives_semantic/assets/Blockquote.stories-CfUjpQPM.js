import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t,t as n}from"./background-D9TKct7-.js";import{n as r,t as i}from"./Blockquote-Cqub8YLF.js";var a,o=e((()=>{a=`/branches/tokens_4x_primitives_semantic/assets/herky-square-loMo5jDD.jpg`})),s,c,l,u,d,f;e((()=>{r(),t(),o(),s={title:`Components/Blockquote`,parameters:{docs:{source:{code:null}}},component:i,tags:[`autodocs`],argTypes:{orientation:{name:`Orientation`,options:[``,`center`,`right`],control:{type:`select`,labels:{"":`Left (default)`,center:`Center`,right:`Right`}},table:{category:`Display options`}},url:{control:{type:`text`}},media_position_bottom:{control:{type:`boolean`}},footer:{control:{type:`text`}},cite_text:{control:{type:`text`}},content:{control:{type:`text`}},media:{name:`Media`,control:`text`,table:{category:`Media`}},...n.argTypes}},c=e=>({components:{UidsBlockquote:i},setup(){return{args:e}},template:`
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
  `}),l=c.bind({}),l.args={url:`https://uiowa.edu/`,cite_text:`Be a Hawkeye`,content:`<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>`,footer:`<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>`,media_position_bottom:!1,background:``,orientation:``,media:`<img src="`+a+`" alt="Alt">`},u=c.bind({}),u.args={...l.args,orientation:`center`},d=c.bind({}),d.args={...l.args,orientation:`right`},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`args => ({
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
})`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`args => ({
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
})`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`args => ({
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
})`,...d.parameters?.docs?.source}}},f=[`Left`,`Centered`,`Right`]}))();export{u as Centered,l as Left,d as Right,f as __namedExportsOrder,s as default};