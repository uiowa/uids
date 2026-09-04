import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t,t as n}from"./Headline-DxtWNPTU.js";var r,i,a,o,s,c,l,u,d,f=e((()=>{t(),r={title:`Components/Headline`,parameters:{docs:{source:{code:null}}},component:n,argTypes:{default:{control:{type:`text`}},level:{control:{type:`select`},options:[`h1`,`h2`,`h3`,`h4`,`h5`,`h6`]},highlight:{control:{type:`boolean`}},text_style:{type:Boolean,default:!1,options:[``,`uppercase`,`serif`],control:{type:`select`,labels:{"":`default`,uppercase:`Uppercase`,serif:`Serif`}}},underline:{control:{type:`boolean`}},url:{control:{type:`text`}},aria_describedby:{control:{type:`text`}},class:{control:{type:`text`}}}},i={render:e=>({components:{UidsHeadline:n},setup(){return{args:e}},template:`
    <uids-headline v-bind="args">
      <span class="headline__text">${e.text}</span>
    </uids-headline>
  `})},a={...i,args:{text:`Your story starts here`,level:`h2`,text_style:`serif`,size:`large`,highlight:!1,underline:!1,url:``}},o={...i,args:{...a.args,text_style:`uppercase`}},s={...i,args:{...a.args,text_style:`serif`}},c={...i,args:{...a.args,text_style:`serif`,underline:!0}},l={...i,args:{...a.args,text_style:`serif`,highlight:!0,text:`<span>Start your story here</span>`}},u={...i,args:{...a.args,text_style:`uppercase`,text:`Start your <span class="highlight">story</span> here`}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    underline: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    highlight: true,
    text: \`<span>Start your story here</span>\`
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase',
    text: \`Start your <span class="highlight">story</span> here\`
  }
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Uppercase`,`Serif`,`Underline`,`Highlight`,`HighlightedSingleWord`]}));f();export{a as Default,l as Highlight,u as HighlightedSingleWord,s as Serif,c as Underline,o as Uppercase,d as __namedExportsOrder,r as default,f as t};