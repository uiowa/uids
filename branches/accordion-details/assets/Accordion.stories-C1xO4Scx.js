import{d as L,k as T,v as C,c as h,F,x as M,n as q,o as y,f as m,e as x,t as D}from"./vue.esm-bundler-BcQIfK0R.js";class b{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",p=>{this.toggleAccordionItem(o,p.newState==="open")}),o.querySelector("summary").addEventListener("click",p=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.setAttribute("aria-expanded",t),e.setAttribute("aria-selected",t),e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const c="#"+e.id;window.history&&history.pushState&&c!=="#"&&history.replaceState("","",c)}else history.replaceState("","",null)}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);if(t!==null){const o=t.querySelector("summary");o&&o.click()}}}}function H(n){const e=document.querySelectorAll(n);Array.prototype.forEach.call(e,t=>{new b(t)}),window.addEventListener("popstate",t=>{b.focusAccordionItemByHash()}),b.focusAccordionItemByHash()}const O=["aria-labelledby","name","open","aria-owns","id"],N=["id","aria-expanded","aria-selected"],U=["id","aria-labelledby","innerHTML"],E=L({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(n){const e=n,t=[],o=()=>{if(e.items.length<1)return null;for(let r=0;r<e.items.length;r++)t.push("accordion-heading-"+r);return t.join(" ")},c=T(()=>({accordion:!0,"accordion--multi":e.multiselectable}));return C(()=>{H(".accordion")}),(p,r)=>(y(),h("div",{class:q(c.value),role:"tablist"},[(y(!0),h(F,null,M(e.items,(i,s)=>(y(),h("details",{key:s,class:"accordion__item","aria-labelledby":"accordion-heading-"+s,name:e.multiselectable?null:"accordion-collection",open:i.open,"aria-owns":o(),id:"accordion-item-"+s},[m("summary",{id:"accordion-heading-"+s,class:"accordion__heading","aria-expanded":i.open?"true":"false","aria-selected":i.open?"true":"false",role:"tab"},[m("h2",null,[x(D(i.title)+" ",1),r[0]||(r[0]=m("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))])],8,N),m("div",{id:"accordion-content-"+s,class:"accordion__content","aria-labelledby":"accordion-heading-"+s,innerHTML:i.content},null,8,U)],8,O))),128))],2))}}),j={title:"Components/Accordion",component:E,argTypes:{multiselectable:{control:"boolean",name:"Multi select"}}},g=n=>({components:{Accordion:E},setup(){return{args:n}},template:`
    <Accordion v-bind="args" />
  `});let l=[{title:"Brand Bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const a=g.bind({});a.args={multiselectable:!1,items:l};const d=g.bind({});d.args={...a.args,multiselectable:!0};const u=g.bind({});u.args={...a.args,items:[{open:!0,...l[0]},{...l[1]},{...l[2]},{...l[3]}]};var f,A,v;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    Accordion
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Accordion v-bind="args" />
  \`
})`,...(v=(A=a.parameters)==null?void 0:A.docs)==null?void 0:v.source}}};var w,k,_;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
  components: {
    Accordion
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Accordion v-bind="args" />
  \`
})`,...(_=(k=d.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};var S,B,I;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
  components: {
    Accordion
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <Accordion v-bind="args" />
  \`
})`,...(I=(B=u.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};const z=["Default","MultiSelect","OpenByDefault"];export{a as Default,d as MultiSelect,u as OpenByDefault,z as __namedExportsOrder,j as default};
