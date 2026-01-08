import{d as E,c as L,A as x,f as m,F as T,g as C,n as F,o as p,h as u,v as M,t as D}from"./vue.esm-bundler-CLcX4pNH.js";class h{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",n=>{this.toggleAccordionItem(o,n.newState==="open")}),this.getAccordionItemSummary(o).addEventListener("click",n=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const r="#"+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&r!=="#"&&history.replaceState("","",r)}else history.replaceState("","",null)}getAccordionItemSummary(e){return e.querySelector("summary")}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);t!==null&&t.click()}}}function H(s){const e=document.querySelectorAll(s);Array.prototype.forEach.call(e,t=>{new h(t)}),window.addEventListener("popstate",t=>{h.focusAccordionItemByHash()}),h.focusAccordionItemByHash()}const O=["aria-multiselectable","aria-owns"],q=["name","open"],N=["id"],U=["innerHTML"],S=E({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(s){const e=s,t=()=>{const n=[];return e.items.forEach((r,c)=>{n.push(r.id)}),n.join(" ")},o=L(()=>({accordion:!0,"accordion--multi":e.multiselectable}));return x(()=>{H(".accordion")}),(n,r)=>(p(),m("div",{class:F(o.value),role:"tablist","aria-multiselectable":e.multiselectable?"true":"false","aria-owns":t()},[(p(!0),m(T,null,C(e.items,(c,B)=>(p(),m("details",{key:B,class:"accordion__item",name:e.multiselectable?null:"accordion-collection",open:c.open,role:"none"},[u("summary",{id:c.id,class:"accordion__heading",role:"tab"},[u("h2",null,[M(D(c.title)+" ",1),r[0]||(r[0]=u("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))])],8,N),u("div",{class:"accordion__content",innerHTML:c.content},null,8,U)],8,q))),128))],10,O))}}),j={title:"Components/Accordion",component:S,argTypes:{multiselectable:{control:"boolean",name:"Multi select"}}},g=s=>({components:{Accordion:S},setup(){return{args:s}},template:`
    <Accordion v-bind="args" />
  `});let i=[{title:"Brand Bar",id:"brand-bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",id:"brand-footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",id:"logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",id:"favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const a=g.bind({});a.args={multiselectable:!1,items:i};const l=g.bind({});l.args={...a.args,multiselectable:!0};const d=g.bind({});d.args={...a.args,items:[{open:!0,...i[0]},{...i[1]},{...i[2]},{...i[3]}]};var y,f,b;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var A,v,w;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
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
})`,...(w=(v=l.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var _,k,I;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
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
})`,...(I=(k=d.parameters)==null?void 0:k.docs)==null?void 0:I.source}}};const z=["Default","MultiSelect","OpenByDefault"];export{a as Default,l as MultiSelect,d as OpenByDefault,z as __namedExportsOrder,j as default};
