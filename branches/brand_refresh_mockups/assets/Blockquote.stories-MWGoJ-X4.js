import{_ as l}from"./Blockquote.vue_vue_type_script_setup_true_lang-DDRi7iw5.js";import{B as h}from"./background-Dp_AVxiY.js";import"./vue.esm-bundler-Dl4EI7SU.js";/* empty css                    *//* empty css               */import"./utlity-BIMoNfdw.js";const b="/branches/brand_refresh_mockups/assets/herky-square-loMo5jDD.jpg",x={title:"Components/Blockquote",parameters:{docs:{source:{code:null}}},component:l,tags:["autodocs"],argTypes:{orientation:{name:"Orientation",options:["","center","right"],control:{type:"select",labels:{"":"Left (default)",center:"Center",right:"Right"}},table:{category:"Display options"}},url:{control:{type:"text"}},media_position_bottom:{control:{type:"boolean"}},footer:{control:{type:"text"}},cite_text:{control:{type:"text"}},content:{control:{type:"text"}},media:{name:"Media",control:"text",table:{category:"Media"}},...h.argTypes}},n=u=>({components:{UidsBlockquote:l},setup(){return{args:u}},template:`
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
  `}),t=n.bind({});t.args={url:"https://uiowa.edu/",cite_text:"Be a Hawkeye",content:"<p>Since his birth 60 years ago, Herky has symbolized intercollegiate athletics at the UI and epitomized University life in Iowa City. He even donned a military uniform during the Korean War and became the insignia of the 124th Fighting Squadron.</p>",footer:"<p>Herky the Hawk,<br/><strong>University of Iowa Mascot</strong></p>",media_position_bottom:!1,background:"",orientation:"",media:'<img src="'+b+'" alt="Alt">'};const e=n.bind({});e.args={...t.args,orientation:"center"};const o=n.bind({});o.args={...t.args,orientation:"right"};var a,r,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`args => ({
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
})`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var i,m,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`args => ({
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
})`,...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var d,p,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
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
})`,...(g=(p=o.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const C=["Left","Centered","Right"];export{e as Centered,t as Left,o as Right,C as __namedExportsOrder,x as default};
