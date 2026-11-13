import{i as e}from"./preload-helper-BL0Fm5OC.js";import{n as t,t as n}from"./Accordion-z4CjXxRA.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Components/Accordion`,component:n,argTypes:{label_color:{name:`Label color`,options:[``,`white`],control:{type:`select`,labels:{"":`Gray`,white:`White`}}},multiselectable:{control:`boolean`,name:`Multi select`}},render:e=>({setup(){return{args:e}},components:{UidsAccordion:n},template:`
    <uids-accordion v-bind="args" />
  `})},i=[{title:`Brand Bar`,id:`brand-bar`,content:`<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>`},{title:`Brand Footer`,id:`brand-footer`,content:`<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>`},{title:`Logo`,id:`logo`,content:`<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>`},{title:`Favicon`,id:`favicon`,content:`<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>`}],a={args:{multiselectable:!1,label_color:``,items:i}},o={args:{...a.args,multiselectable:!0}},s={args:{...a.args,items:[{open:!0,...i[0]},{...i[1]},{...i[2]},{...i[3]}]}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    multiselectable: false,
    label_color: '',
    items: items
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiselectable: true
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    items: [{
      open: true,
      ...items[0]
    }, {
      ...items[1]
    }, {
      ...items[2]
    }, {
      ...items[3]
    }]
  }
}`,...s.parameters?.docs?.source}}},c=[`Default`,`MultiSelect`,`OpenByDefault`]}))();export{a as Default,o as MultiSelect,s as OpenByDefault,c as __namedExportsOrder,r as default};