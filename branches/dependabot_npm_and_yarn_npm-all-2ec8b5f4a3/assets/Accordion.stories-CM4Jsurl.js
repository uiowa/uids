import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{D as t,_ as n,a as r,c as i,f as a,g as o,h as s,i as c,k as l,n as u,r as d,u as f}from"./iframe-BMXo6Z5W.js";import"./_background-5iX1z5X0.js";function p(e){let t=document.querySelectorAll(e);Array.prototype.forEach.call(t,e=>{new m(e)}),window.addEventListener(`popstate`,e=>{m.focusAccordionItemByHash()}),m.focusAccordionItemByHash()}var m;function h(){return(h=e((()=>{m=class{constructor(e){let t=e.querySelectorAll(`details`);Array.prototype.forEach.call(t,e=>{e.addEventListener(`toggle`,t=>{this.toggleAccordionItem(e,t.newState===`open`)}),this.getAccordionItemSummary(e).addEventListener(`click`,t=>{this.accordionItemClick(e)})})}accordionItemClick(e){e.setAttribute(`data-accordion-clicked`,!0)}toggleAccordionItem(e,t){if(e.getAttribute(`data-accordion-clicked`)){if(e.removeAttribute(`data-accordion-clicked`),t){let t=`#`+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&t!==`#`&&history.replaceState(``,``,t)}else history.replaceState(``,``,null)}}getAccordionItemSummary(e){return e.querySelector(`summary`)}static focusAccordionItemByHash(){let e=window.location.hash.substr(1);if(e!==``){let t=document.getElementById(e);t!==null&&t.click()}}}})))()}var g,_,v,y,b;function x(){return(x=e((()=>{u(),h(),g=[`aria-multiselectable`,`aria-owns`],_=[`name`,`open`],v=[`id`],y=[`innerHTML`],b=a({__name:`Accordion`,props:{multiselectable:{type:Boolean,default:!1},label_color:{type:String,default:``,required:!1},items:{type:Array,required:!0}},setup(e){let a=e,u=()=>{let e=[];return a.items.forEach((t,n)=>{e.push(t.id)}),e.join(` `)},m=c(()=>({accordion:!0,"accordion--multi":a.multiselectable,"accordion--white":a.label_color}));return s(()=>{p(`.accordion`)}),(e,s)=>(o(),i(`div`,{class:t(m.value),role:`tablist`,"aria-multiselectable":a.multiselectable?`true`:`false`,"aria-owns":u()},[(o(!0),i(d,null,n(a.items,(e,t)=>(o(),i(`details`,{key:t,class:`accordion__item`,name:a.multiselectable?null:`accordion-collection`,open:e.open,role:`none`},[r(`summary`,{id:e.id,class:`accordion__heading`,role:`tab`},[r(`h2`,null,[s[0]||=r(`i`,{"aria-hidden":`true`,class:`fas fa-chevron-up`,role:`presentation`},null,-1),f(` `+l(e.title),1)])],8,v),r(`div`,{class:`accordion__content`,innerHTML:e.content},null,8,y)],8,_))),128))],10,g))}})})))()}var S;function C(){return(C=e((()=>{x(),S=b,b.__docgenInfo=Object.assign({displayName:b.name??b.__name},{exportName:`default`,displayName:`Accordion`,description:``,tags:{},props:[{name:`multiselectable`,type:{name:`boolean`},defaultValue:{func:!1,value:`false`}},{name:`label_color`,type:{name:`string`},required:!1,defaultValue:{func:!1,value:`''`}},{name:`items`,type:{name:`array`},required:!0}],sourceFiles:[`/home/runner/work/uids/uids/src/components/accordion/Accordion.vue`]})})))()}var w,T,E,D,O,k;function A(){return(A=e((()=>{C(),w={title:`Components/Accordion`,component:S,argTypes:{label_color:{name:`Label color`,options:[``,`white`],control:{type:`select`,labels:{"":`Gray`,white:`White`}}},multiselectable:{control:`boolean`,name:`Multi select`}},render:e=>({setup(){return{args:e}},components:{UidsAccordion:S},template:`
    <uids-accordion v-bind="args" />
  `})},T=[{title:`Brand Bar`,id:`brand-bar`,content:`<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>`},{title:`Brand Footer`,id:`brand-footer`,content:`<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>`},{title:`Logo`,id:`logo`,content:`<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>`},{title:`Favicon`,id:`favicon`,content:`<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>`}],E={args:{multiselectable:!1,label_color:``,items:T}},D={args:{...E.args,multiselectable:!0}},O={args:{...E.args,items:[{open:!0,...T[0]},{...T[1]},{...T[2]},{...T[3]}]}},k=[`Default`,`MultiSelect`,`OpenByDefault`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    multiselectable: false,
    label_color: '',
    items: items
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiselectable: true
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}}})))()}A();export{E as Default,D as MultiSelect,O as OpenByDefault,k as __namedExportsOrder,w as default};