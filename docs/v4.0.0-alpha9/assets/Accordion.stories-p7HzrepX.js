import{d as L,k as T,v as C,c as h,F,x as M,n as q,o as g,f as m,e as D,t as H}from"./vue.esm-bundler--ETYdinE.js";class f{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",d=>{this.toggleAccordionItem(o,d.newState==="open")}),o.querySelector("summary").addEventListener("click",d=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const a="#"+e.id;window.history&&history.pushState&&a!=="#"&&history.replaceState("","",a)}else history.replaceState("","",null)}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);if(t!==null){const o=t.querySelector("summary");o&&o.click()}}}}function O(s){const e=document.querySelectorAll(s);Array.prototype.forEach.call(e,t=>{new f(t)}),window.addEventListener("popstate",t=>{f.focusAccordionItemByHash()}),f.focusAccordionItemByHash()}const x=["aria-multiselectable","aria-owns"],N=["name","open","id"],U=["id"],V=["id","innerHTML"],E=L({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(s){const e=s,t=[],o=()=>{if(e.items.length<1)return null;for(let r=0;r<e.items.length;r++)t.push("accordion-heading-"+r);return t.join(" ")},a=T(()=>({accordion:!0,"accordion--multi":e.multiselectable}));return C(()=>{O(".accordion")}),(d,r)=>(g(),h("div",{class:q(a.value),role:"tablist","aria-multiselectable":e.multiselectable?"true":"false","aria-owns":o()},[(g(!0),h(F,null,M(e.items,(p,u)=>(g(),h("details",{key:u,class:"accordion__item",name:e.multiselectable?null:"accordion-collection",open:p.open,id:"accordion-item-"+u,role:"none"},[m("summary",{id:"accordion-heading-"+u,class:"accordion__heading",role:"tab"},[m("h2",null,[D(H(p.title)+" ",1),r[0]||(r[0]=m("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))])],8,U),m("div",{id:"accordion-content-"+u,class:"accordion__content",innerHTML:p.content},null,8,V)],8,N))),128))],10,x))}}),z={title:"Components/Accordion",component:E,argTypes:{multiselectable:{control:"boolean",name:"Multi select"}}},y=s=>({components:{Accordion:E},setup(){return{args:s}},template:`
    <Accordion v-bind="args" />
  `});let c=[{title:"Brand Bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const n=y.bind({});n.args={multiselectable:!1,items:c};const i=y.bind({});i.args={...n.args,multiselectable:!0};const l=y.bind({});l.args={...n.args,items:[{open:!0,...c[0]},{...c[1]},{...c[2]},{...c[3]}]};var b,A,v;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
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
})`,...(v=(A=n.parameters)==null?void 0:A.docs)==null?void 0:v.source}}};var w,_,k;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`args => ({
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
})`,...(k=(_=i.parameters)==null?void 0:_.docs)==null?void 0:k.source}}};var S,B,I;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
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
})`,...(I=(B=l.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};const W=["Default","MultiSelect","OpenByDefault"];export{n as Default,i as MultiSelect,l as OpenByDefault,W as __namedExportsOrder,z as default};
