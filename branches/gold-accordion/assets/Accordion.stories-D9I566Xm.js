import{d as E,c as L,A as x,f as m,F as T,g as C,n as F,o as p,h as u,v as M,t as q}from"./vue.esm-bundler-CLcX4pNH.js";/* empty css                    */class h{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",n=>{this.toggleAccordionItem(o,n.newState==="open")}),this.getAccordionItemSummary(o).addEventListener("click",n=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const r="#"+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&r!=="#"&&history.replaceState("","",r)}else history.replaceState("","",null)}getAccordionItemSummary(e){return e.querySelector("summary")}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);t!==null&&t.click()}}}function D(s){const e=document.querySelectorAll(s);Array.prototype.forEach.call(e,t=>{new h(t)}),window.addEventListener("popstate",t=>{h.focusAccordionItemByHash()}),h.focusAccordionItemByHash()}const H=["aria-multiselectable","aria-owns"],O=["name","open"],N=["id"],U=["innerHTML"],I=E({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},background:{type:String,default:"",required:!1},items:{type:Array,required:!0}},setup(s){const e=s,t=()=>{const n=[];return e.items.forEach((r,c)=>{n.push(r.id)}),n.join(" ")},o=L(()=>({accordion:!0,"accordion--multi":e.multiselectable,"accordion--white":e.background}));return x(()=>{D(".accordion")}),(n,r)=>(p(),m("div",{class:F(o.value),role:"tablist","aria-multiselectable":e.multiselectable?"true":"false","aria-owns":t()},[(p(!0),m(T,null,C(e.items,(c,B)=>(p(),m("details",{key:B,class:"accordion__item",name:e.multiselectable?null:"accordion-collection",open:c.open,role:"none"},[u("summary",{id:c.id,class:"accordion__heading",role:"tab"},[u("h2",null,[r[0]||(r[0]=u("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1)),M(" "+q(c.title),1)])],8,N),u("div",{class:"bg--white accordion__content",innerHTML:c.content},null,8,U)],8,O))),128))],10,H))}}),j={title:"Components/Accordion",component:I,argTypes:{background:{name:"Background",options:["","white"],control:{type:"select",labels:{"":"Gray",white:"White"}}},multiselectable:{control:"boolean",name:"Multi select"}}},g=s=>({components:{Accordion:I},setup(){return{args:s}},template:`
    <Accordion v-bind="args" />
  `});let i=[{title:"Brand Bar",id:"brand-bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",id:"brand-footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",id:"logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",id:"favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const a=g.bind({});a.args={multiselectable:!1,background:"",items:i};const l=g.bind({});l.args={...a.args,multiselectable:!0};const d=g.bind({});d.args={...a.args,items:[{open:!0,...i[0]},{...i[1]},{...i[2]},{...i[3]}]};var b,y,f;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
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
})`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var A,w,k;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`args => ({
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
})`,...(k=(w=l.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var v,_,S;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(S=(_=d.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};const z=["Default","MultiSelect","OpenByDefault"];export{a as Default,l as MultiSelect,d as OpenByDefault,z as __namedExportsOrder,j as default};
