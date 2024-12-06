import{d as g,k as f,c as h,p as _,n as y,o as b}from"./vue.esm-bundler-B_OG6i5n.js";import{B as s}from"./_background-BrvWZjet.js";import{M as v}from"./media-PjSUOf2n.js";import{c as i}from"./utlity-CAV5GFHh.js";import C from"./preview-xY0of2cC.js";const o=["","small","medium","large"],l=["","left","right","center"],k={inline_alignment:{type:String,default:"left",validator:function(e){return l.indexOf(e)!==-1}},inline_size:{type:String,default:"",validator:function(e){return o.indexOf(e)!==-1}}},w={inline_alignment:{name:"Alignment",table:{defaultValue:{summary:l[0]},category:"Display options"},options:l,control:{type:"select",labels:{"":"full width"}}},inline_size:{name:"Size",table:{defaultValue:{summary:o[0]},category:"Display options"},options:o,control:{type:"select",labels:{"":"full width"}}}},z=(e,t)=>{t.inline_size&&e.push(`inline--size-${i(t.inline_size)}`),t.inline_alignment&&e.push(`inline--align-${i(t.inline_alignment)}`)},r={props:k,argTypes:w,addClass:z},p=g({__name:"Callout",props:{...r.props,...s.props,...v.props},setup(e){const t=e,m=f(()=>{let a=["callout"];return s.addBackgroundClass(a,t),r.addClass(a,t),a});return(a,B)=>(b(),h("div",{class:y(m.value)},[_(a.$slots,"default")],2))}}),S={title:"Components/Callout",component:p,tags:["autodocs"],argTypes:{...s.argTypes,default:{name:"Content",control:{type:"text"}}},parameters:{docs:{source:{code:null}},viewport:{viewports:C.parameters.viewport.viewports,defaultViewport:"tablet"}}},T=e=>({components:{UidsCallout:p},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),n=T.bind({});n.args={default:'<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',background:"gray"};var u,d,c;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  // Components used in your story \`template\` are defined in the \`components\` object
  components: {
    UidsCallout
  },
  // The story's \`args\` need to be mapped into the template through the \`setup()\` method
  setup() {
    return {
      args
    };
  },
  // And then the \`args\` are bound to your component with \`v-bind="args"\`
  template: \`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  \`
})`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const x=["Callout"],A=Object.freeze(Object.defineProperty({__proto__:null,Callout:n,__namedExportsOrder:x,default:S},Symbol.toStringTag,{value:"Module"}));export{A as C,r as I,p as _};
