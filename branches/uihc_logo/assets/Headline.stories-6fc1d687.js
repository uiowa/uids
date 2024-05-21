import{_ as U}from"./Headline-e6cd25c2.js";import"./vue.esm-bundler-f09df2bf.js";const A={title:"Components/Headline",parameters:{docs:{source:{code:null}}},component:U,tags:["autodocs"],argTypes:{default:{control:{type:"text"}},level:{control:{type:"select"},options:["h1","h2","h3","h4","h5","h6"]},highlight:{control:{type:"boolean"}},text_style:{type:Boolean,default:!1,options:["","uppercase","serif"],control:{type:"select",labels:{"":"default",uppercase:"Uppercase",serif:"Serif"}}},underline:{control:{type:"boolean"}},url:{control:{type:"text"}},aria_describedby:{control:{type:"text"}},class:{control:{type:"text"}}}},t=T=>({components:{UidsHeadline:U},setup(){return{args:T}},template:`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  `}),e=t.bind({});e.args={text_style:"",underline:!1,highlight:!1,level:"h2",default:"Start your story here",url:"",aria_describedby:"",class:""};const n=t.bind({});n.args={...e.args,text_style:"uppercase"};const s=t.bind({});s.args={...e.args,text_style:"serif"};const o=t.bind({});o.args={...e.args,text_style:"serif",underline:!0};const a=t.bind({});a.args={...e.args,text_style:"serif",highlight:!0,default:"<span>Start your story here</span>"};const r=t.bind({});r.args={...e.args,text_style:"uppercase",default:'Start your <span class="highlight">story</span> here'};var d,i,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(p=(i=e.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var l,h,u;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(u=(h=n.parameters)==null?void 0:h.docs)==null?void 0:u.source}}};var c,m,g;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(g=(m=s.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var b,y,f;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var _,v,x;a.parameters={...a.parameters,docs:{...(_=a.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(x=(v=a.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var S,H,w;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsHeadline
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  // @todo Figure out how to not bind the \`default\` slot to the component.
  template: \`
    <uids-headline v-bind="args">
      <span class="headline__text" v-html="args.default"></span>
    </uids-headline>
  \`
})`,...(w=(H=r.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};const F=["Default","Uppercase","Serif","Underline","Highlight","HighlightedSingleWord"];export{e as Default,a as Highlight,r as HighlightedSingleWord,s as Serif,o as Underline,n as Uppercase,F as __namedExportsOrder,A as default};
