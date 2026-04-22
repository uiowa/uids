import{_ as v}from"./Headline.vue_vue_type_script_setup_true_lang-CzQbgTsC.js";import"./iframe-CFF2vqm_.js";import"./preload-helper-DyDXPhph.js";/* empty css                  */const C={title:"Components/Headline",parameters:{docs:{source:{code:null}}},component:v,argTypes:{default:{control:{type:"text"}},level:{control:{type:"select"},options:["h1","h2","h3","h4","h5","h6"]},highlight:{control:{type:"boolean"}},text_style:{type:Boolean,default:!1,options:["","uppercase","serif"],control:{type:"select",labels:{"":"default",uppercase:"Uppercase",serif:"Serif"}}},underline:{control:{type:"boolean"}},url:{control:{type:"text"}},aria_describedby:{control:{type:"text"}},class:{control:{type:"text"}}}},r={render:l=>({components:{UidsHeadline:v},setup(){return{args:l}},template:`
    <uids-headline v-bind="args">
      <span class="headline__text">${l.text}</span>
    </uids-headline>
  `})},e={...r,args:{text:"Your story starts here",level:"h2",text_style:"serif",size:"large",highlight:!1,underline:!1,url:""}},t={...r,args:{...e.args,text_style:"uppercase"}},s={...r,args:{...e.args,text_style:"serif"}},a={...r,args:{...e.args,text_style:"serif",underline:!0}},n={...r,args:{...e.args,text_style:"serif",highlight:!0,text:"<span>Start your story here</span>"}},o={...r,args:{...e.args,text_style:"uppercase",text:'Start your <span class="highlight">story</span> here'}};var p,i,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var u,g,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase'
  }
}`,...(d=(g=t.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var h,m,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif'
  }
}`,...(y=(m=s.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var f,x,_;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    underline: true
  }
}`,...(_=(x=a.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};var S,T,D;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'serif',
    highlight: true,
    text: \`<span>Start your story here</span>\`
  }
}`,...(D=(T=n.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var H,b,U;o.parameters={...o.parameters,docs:{...(H=o.parameters)==null?void 0:H.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    text_style: 'uppercase',
    text: \`Start your <span class="highlight">story</span> here\`
  }
}`,...(U=(b=o.parameters)==null?void 0:b.docs)==null?void 0:U.source}}};const E=["Default","Uppercase","Serif","Underline","Highlight","HighlightedSingleWord"];export{e as Default,n as Highlight,o as HighlightedSingleWord,s as Serif,a as Underline,t as Uppercase,E as __namedExportsOrder,C as default};
