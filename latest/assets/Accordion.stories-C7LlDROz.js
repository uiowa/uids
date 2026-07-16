import{i as e}from"./preload-helper-a3j3z2Z5.js";import{$ as t,Q as n,St as r,X as i,Z as a,bt as o,dt as s,it as c,lt as l,nt as u,ot as d,ut as f}from"./iframe-D7fRvpW4.js";import{t as p}from"./_background-qpSuANlz.js";var m=e((()=>{}));function h(e){let t=document.querySelectorAll(e);Array.prototype.forEach.call(t,e=>{new g(e)}),window.addEventListener(`popstate`,e=>{g.focusAccordionItemByHash()}),g.focusAccordionItemByHash()}var g,_=e((()=>{g=class{constructor(e){let t=e.querySelectorAll(`details`);Array.prototype.forEach.call(t,e=>{e.addEventListener(`toggle`,t=>{this.toggleAccordionItem(e,t.newState===`open`)}),this.getAccordionItemSummary(e).addEventListener(`click`,t=>{this.accordionItemClick(e)})})}accordionItemClick(e){e.setAttribute(`data-accordion-clicked`,!0)}toggleAccordionItem(e,t){if(e.getAttribute(`data-accordion-clicked`))if(e.removeAttribute(`data-accordion-clicked`),t){let t=`#`+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&t!==`#`&&history.replaceState(``,``,t)}else history.replaceState(``,``,null)}getAccordionItemSummary(e){return e.querySelector(`summary`)}static focusAccordionItemByHash(){let e=window.location.hash.substr(1);if(e!==``){let t=document.getElementById(e);t!==null&&t.click()}}}})),v,y,b,x,S,C=e((()=>{i(),m(),_(),p(),v=[`aria-multiselectable`,`aria-owns`],y=[`name`,`open`],b=[`id`],x=[`innerHTML`],S=d({__name:`Accordion`,props:{multiselectable:{type:Boolean,default:!1},label_color:{type:String,default:``,required:!1},items:{type:Array,required:!0}},setup(e){let i=e,d=()=>{let e=[];return i.items.forEach((t,n)=>{e.push(t.id)}),e.join(` `)},p=n(()=>({accordion:!0,"accordion--multi":i.multiselectable,"accordion--white":i.label_color}));return l(()=>{h(`.accordion`)}),(e,n)=>(f(),u(`div`,{class:o(p.value),role:`tablist`,"aria-multiselectable":i.multiselectable?`true`:`false`,"aria-owns":d()},[(f(!0),u(a,null,s(i.items,(e,a)=>(f(),u(`details`,{key:a,class:`accordion__item`,name:i.multiselectable?null:`accordion-collection`,open:e.open,role:`none`},[t(`summary`,{id:e.id,class:`accordion__heading`,role:`tab`},[t(`h2`,null,[n[0]||=t(`i`,{"aria-hidden":`true`,class:`fas fa-chevron-up`,role:`presentation`},null,-1),c(` `+r(e.title),1)])],8,b),t(`div`,{class:`accordion__content`,innerHTML:e.content},null,8,x)],8,y))),128))],10,v))}})})),w,T=e((()=>{C(),C(),w=S})),E,D,O,k,A,j;e((()=>{T(),E={title:`Components/Accordion`,component:w,argTypes:{label_color:{name:`Label color`,options:[``,`white`],control:{type:`select`,labels:{"":`Gray`,white:`White`}}},multiselectable:{control:`boolean`,name:`Multi select`}},render:e=>({setup(){return{args:e}},components:{UidsAccordion:w},template:`
    <uids-accordion v-bind="args" />
  `})},D=[{title:`Brand Bar`,id:`brand-bar`,content:`<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>`},{title:`Brand Footer`,id:`brand-footer`,content:`<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>`},{title:`Logo`,id:`logo`,content:`<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>`},{title:`Favicon`,id:`favicon`,content:`<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>`}],O={args:{multiselectable:!1,label_color:``,items:D}},k={args:{...O.args,multiselectable:!0}},A={args:{...O.args,items:[{open:!0,...D[0]},{...D[1]},{...D[2]},{...D[3]}]}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    multiselectable: false,
    label_color: '',
    items: items
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiselectable: true
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j=[`Default`,`MultiSelect`,`OpenByDefault`]}))();export{O as Default,k as MultiSelect,A as OpenByDefault,j as __namedExportsOrder,E as default};