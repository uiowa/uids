import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{n,t as r}from"./Headline-C5DCqSWd.js";var i=t({Default:()=>s,Highlight:()=>d,HighlightedSingleWord:()=>f,Serif:()=>l,Underline:()=>u,Uppercase:()=>c,__namedExportsOrder:()=>p,default:()=>a}),a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{n(),a={title:`Components/Headline`,parameters:{docs:{source:{code:null}}},component:r,argTypes:{default:{control:{type:`text`}},level:{control:{type:`select`},options:[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`]},highlight:{control:{type:`boolean`}},text_style:{type:Boolean,default:!1,options:[``,`uppercase`,`serif`],control:{type:`select`,labels:{"":`default`,uppercase:`Uppercase`,serif:`Serif`}}},underline:{control:{type:`boolean`}},url:{control:{type:`text`}},aria_describedby:{control:{type:`text`}},class:{control:{type:`text`}}}},o={render:e=>({components:{UidsHeadline:r},setup(){return{args:e}},template:`
    <uids-headline v-bind="args">
      <span class="headline__text">${e.text}</span>
    </uids-headline>
  `})},s={...o,args:{text:`Your story starts here`,level:`h2`,text_style:`serif`,size:`large`,highlight:!1,underline:!1,url:``}},c={...o,args:{...s.args,text_style:`uppercase`}},l={...o,args:{...s.args,text_style:`serif`}},u={...o,args:{...s.args,text_style:`serif`,underline:!0}},d={...o,args:{...s.args,text_style:`serif`,highlight:!0,text:`<span>Start your story here</span>`}},f={...o,args:{...s.args,text_style:`uppercase`,text:`Start your <span class="highlight">story</span> here`}},p=[`Default`,`Uppercase`,`Serif`,`Underline`,`Highlight`,`HighlightedSingleWord`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    text: 'Your story starts here',
    level: 'h2',
    text_style: 'serif',
    size: 'large',
    highlight: false,
    underline: false,
    url: ''
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    underline: true
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    highlight: true,
    text: \`<span>Start your story here</span>\`
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase',
    text: \`Start your <span class="highlight">story</span> here\`
  }
}`,...f.parameters?.docs?.source}}}})))()}export{i as n,m as r,s as t};