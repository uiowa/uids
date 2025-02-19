import{d as L,k as x,v as T,c as p,F as C,x as F,n as M,o as h,f as m,e as D,t as H}from"./vue.esm-bundler--ETYdinE.js";class g{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",a=>{this.toggleAccordionItem(o,a.newState==="open")}),this.getAccordionItemSummary(o).addEventListener("click",a=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const d="#"+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&d!=="#"&&history.replaceState("","",d)}else history.replaceState("","",null)}getAccordionItemSummary(e){return e.querySelector("summary")}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);t!==null&&t.click()}}}function O(r){const e=document.querySelectorAll(r);Array.prototype.forEach.call(e,t=>{new g(t)}),window.addEventListener("popstate",t=>{g.focusAccordionItemByHash()}),g.focusAccordionItemByHash()}const q=["aria-multiselectable","aria-owns"],N=["name","open"],U=["id"],V=["innerHTML"],B=L({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(r){const e=r,t=[],o=()=>{if(e.items.length<1)return null;for(let s=0;s<e.items.length;s++)t.push("accordion-heading-"+s);return t.join(" ")},a=x(()=>({accordion:!0,"accordion--multi":e.multiselectable}));return T(()=>{O(".accordion")}),(d,s)=>(h(),p("div",{class:M(a.value),role:"tablist","aria-multiselectable":e.multiselectable?"true":"false","aria-owns":o()},[(h(!0),p(C,null,F(e.items,(u,E)=>(h(),p("details",{key:E,class:"accordion__item",name:e.multiselectable?null:"accordion-collection",open:u.open,role:"none"},[m("summary",{id:u.id,class:"accordion__heading",role:"tab"},[m("h2",null,[D(H(u.title)+" ",1),s[0]||(s[0]=m("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))])],8,U),m("div",{class:"accordion__content",innerHTML:u.content},null,8,V)],8,N))),128))],10,q))}}),z={title:"Components/Accordion",component:B,argTypes:{multiselectable:{control:"boolean",name:"Multi select"}}},f=r=>({components:{Accordion:B},setup(){return{args:r}},template:`
    <Accordion v-bind="args" />
  `});let c=[{title:"Brand Bar",id:"brand-bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",id:"brand-footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",id:"logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",id:"favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const n=f.bind({});n.args={multiselectable:!1,items:c};const i=f.bind({});i.args={...n.args,multiselectable:!0};const l=f.bind({});l.args={...n.args,items:[{open:!0,...c[0]},{...c[1]},{...c[2]},{...c[3]}]};var y,b,A;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
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
})`,...(A=(b=n.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};var v,w,_;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
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
})`,...(_=(w=i.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};var k,I,S;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`args => ({
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
})`,...(S=(I=l.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};const W=["Default","MultiSelect","OpenByDefault"];export{n as Default,i as MultiSelect,l as OpenByDefault,W as __namedExportsOrder,z as default};
