import{d as f,j as h,o as _,b as y,m as b,n as v}from"./vue.esm-bundler-c04f16a9.js";import{B as s}from"./background-59221237.js";import{M as C}from"./media-96bb985f.js";import{c as i}from"./utlity-a0fec18e.js";import k from"./preview-548e8345.js";const o=["","small","medium","large"],l=["","left","right","center"],w={inline_alignment:{type:String,default:"left",validator:function(e){return l.indexOf(e)!==-1}},inline_size:{type:String,default:"",validator:function(e){return o.indexOf(e)!==-1}}},z={inline_alignment:{name:"Alignment",table:{defaultValue:{summary:l[0]},category:"Display options"},options:l,control:{type:"select",labels:{"":"full width"}}},inline_size:{name:"Size",table:{defaultValue:{summary:o[0]},category:"Display options"},options:o,control:{type:"select",labels:{"":"full width"}}}},S=(e,t)=>{t.inline_size&&e.push(`inline--size-${i(t.inline_size)}`),t.inline_alignment&&e.push(`inline--align-${i(t.inline_alignment)}`)},r={props:w,argTypes:z,addClass:S},p=f({__name:"Callout",props:{...r.props,...s.props,...C.props},setup(e){const t=e,g=h(()=>{let a=["callout"];return s.addBackgroundClass(a,t),r.addClass(a,t),a});return(a,O)=>(_(),y("div",{class:v(g.value)},[b(a.$slots,"default")],2))}}),m=p;p.__docgenInfo={exportName:"default",displayName:"Callout",description:"",tags:{},slots:[{name:"default"}],sourceFiles:["/home/runner/work/uids/uids/src/components/callout/Callout.vue"]};const T={title:"Components/Callout",component:m,tags:["autodocs"],argTypes:{...s.argTypes,default:{name:"Content",control:{type:"text"}}},parameters:{docs:{source:{code:null}},viewport:{viewports:k.parameters.viewport.viewports,defaultViewport:"tablet"}}},x=e=>({components:{UidsCallout:m},setup(){return{args:e}},template:`
    <uids-callout
      :background="args.background"
    >
    <template v-if="args.default"><div v-html="args.default" ></div></template>
    </uids-callout>
  `}),n=x.bind({});n.args={default:'<h4 class="headline block__headline headline headline--serif headline--underline block__headline headline--center"> <span class="headline__heading"> Title </span> </h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce feugiat ante non efficitur laoreet. Suspendisse laoreet cursus dui, eget vehicula massa.</p>',background:"gray"};var u,d,c;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
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
})`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};const B=["Callout"],U=Object.freeze(Object.defineProperty({__proto__:null,Callout:n,__namedExportsOrder:B,default:T},Symbol.toStringTag,{value:"Module"}));export{U as C,r as I,m as U};
