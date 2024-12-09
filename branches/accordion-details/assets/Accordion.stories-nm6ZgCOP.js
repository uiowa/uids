import{d as _,v as q,k as v,c as d,F as S,x,n as C,o as u,f as r,e as B,t as E}from"./vue.esm-bundler-OeH-Ad4z.js";(function(){function i(e){let o=this;this.accordions=e.getElementsByClassName("accordion__heading"),this.multiSelectible=e.getAttribute("aria-multiselectable")==="true"||!1;for(let t=0;t<this.accordions.length;t++){let n=this.accordionItemComponents(this.accordions[t]),c=this.isAccordionOpen(n.btn);n.panel.hidden=!c,n.btn.onclick=()=>{this.toggleAccordion(this.accordions[t])}}window.addEventListener("popstate",function(t){o.activateAccordionByHash()}),this.activateAccordionByHash()}i.prototype.accordionItemComponents=function(e){let o=e.querySelector("button"),t=e.nextElementSibling;return{btn:o,panel:t}},i.prototype.accordionOpen=function(e,o){let t=this.accordionItemComponents(e);t.btn.setAttribute("aria-expanded",o),t.btn.setAttribute("aria-selected",o),t.panel.hidden=!o},i.prototype.activateAccordion=function(e){this.multiSelectible||this.collapseAllAccordions(),this.accordionOpen(e,!0)},i.prototype.activateAccordionByHash=function(){let e=window.location.hash.substr(1);if(e!==""){let o=document.getElementById(e);if(o!==null){let t=o.parentElement,n=this.accordions[0].parentElement;t===n&&this.activateAccordion(o)}}},i.prototype.collapseAllAccordions=function(){for(let e=0;e<this.accordions.length;e++)this.accordionOpen(this.accordions[e],!1)},i.prototype.isAccordionOpen=function(e){return e.getAttribute("aria-expanded")==="true"||!1},i.prototype.toggleAccordion=function(e){let o=e.querySelector("button"),t=this.isAccordionOpen(o);if(!this.multiSelectible&&!t&&this.collapseAllAccordions(),this.accordionOpen(e,!t),t)history.replaceState("",""," ");else{let n="#"+o.parentElement.id;window.history&&history.pushState&&n!=="#"&&history.replaceState("","",n)}};const a=document.getElementsByClassName("accordion");for(let e=0;e<a.length;e++)new i(a[e])})();const L=["aria-multiselectable"],w=["name"],T=["id"],O=["id","aria-labelledby","innerHTML"],A=_({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(i){const a=i;q([]);const e=v(()=>({accordion:!0,"accordion--multi":a.multiselectable}));return(o,t)=>(u(),d("div",{class:C(e.value),role:"tablist","aria-multiselectable":a.multiselectable},[(u(!0),d(S,null,x(a.items,(n,c)=>(u(),d("div",{key:c,class:"accordion__item"},[r("details",{class:"accordion","aria-labelledby":"system-requirements-heading",name:a.multiselectable?"accordion-collection":null},[r("summary",{id:"accordion-heading-"+c,class:"accordion__heading"},[r("h2",null,[B(E(n.title)+" ",1),t[0]||(t[0]=r("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))])],8,T),r("div",{id:"accordion-content-"+c,class:"accordion__content","aria-labelledby":"accordion-heading-"+c,innerHTML:n.content},null,8,O)],8,w)]))),128))],10,L))}}),H={title:"Components/Accordion",component:A,argTypes:{multiselectable:{control:"boolean",name:"Multi select"}}},y=i=>({components:{Accordion:A},setup(){return{args:i}},template:`
    <Accordion v-bind="args" />
  `}),s=y.bind({});s.args={multiselectable:!1,items:[{title:"Section 1 title",expanded:!0,content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>"},{title:"Section 2 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},{title:"Section 3 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},{title:"Section 4 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}]};const l=y.bind({});l.args={...s.args,multiselectable:!0};var m,p,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
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
})`,...(h=(p=s.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var b,g,f;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
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
})`,...(f=(g=l.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const M=["Default","MultiSelect"];export{s as Default,l as MultiSelect,M as __namedExportsOrder,H as default};
