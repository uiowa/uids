import{d as g,j as f,o as h,b as _,l as y,n as b}from"./vue.esm-bundler-f09df2bf.js";import{B as s}from"./_background-9e63ab93.js";import{M as v}from"./media-96bb985f.js";import{c as r}from"./utlity-a0fec18e.js";import C from"./preview-d74db500.js";const o=["","small","medium","large"],l=["","left","right","center"],k={inline_alignment:{type:String,default:"left",validator:function(e){return l.indexOf(e)!==-1}},inline_size:{type:String,default:"",validator:function(e){return o.indexOf(e)!==-1}}},w={inline_alignment:{name:"Alignment",table:{defaultValue:{summary:l[0]},category:"Display options"},options:l,control:{type:"select",labels:{"":"full width"}}},inline_size:{name:"Size",table:{defaultValue:{summary:o[0]},category:"Display options"},options:o,control:{type:"select",labels:{"":"full width"}}}},z=(e,t)=>{t.inline_size&&e.push(`inline--size-${r(t.inline_size)}`),t.inline_alignment&&e.push(`inline--align-${r(t.inline_alignment)}`)},u={props:k,argTypes:w,addClass:z},i=g({__name:"Callout",props:{...u.props,...s.props,...v.props},setup(e){const t=e,m=f(()=>{let a=["callout"];return s.addBackgroundClass(a,t),u.addClass(a,t),a});return(a,B)=>(h(),_("div",{class:b(m.value)},[y(a.$slots,"default")],2))}});i.__docgenInfo={exportName:"default",displayName:"Callout",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/uids/uids/src/components/callout/Callout.vue"]};const S={title:"Components/Callout",component:i,tags:["autodocs"],argTypes:{...s.argTypes,default:{name:"Content",control:{type:"text"}}},parameters:{docs:{source:{code:null}},viewport:{viewports:C.parameters.viewport.viewports,defaultViewport:"tablet"}}},T=e=>({components:{UidsCallout:i},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),n=T.bind({});n.args={default:'<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',background:"gray"};var d,c,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
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
})`,...(p=(c=n.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};const x=["Callout"],N=Object.freeze(Object.defineProperty({__proto__:null,Callout:n,__namedExportsOrder:x,default:S},Symbol.toStringTag,{value:"Module"}));export{N as C,u as I,i as _};
