import{d as S,v as q,k as C,c as u,F as x,x as B,n as E,o as m,f as l,e as w,t as L,y as k,z as T}from"./vue.esm-bundler-CTz9PpS2.js";(function(){function n(e){let o=this;this.accordions=e.getElementsByClassName("accordion__heading"),this.multiSelectible=e.getAttribute("aria-multiselectable")==="true"||!1;for(let t=0;t<this.accordions.length;t++){let i=this.accordionItemComponents(this.accordions[t]),s=this.isAccordionOpen(i.btn);i.panel.hidden=!s,i.btn.onclick=()=>{this.toggleAccordion(this.accordions[t])}}window.addEventListener("popstate",function(t){o.activateAccordionByHash()}),this.activateAccordionByHash()}n.prototype.accordionItemComponents=function(e){let o=e.querySelector("button"),t=e.nextElementSibling;return{btn:o,panel:t}},n.prototype.accordionOpen=function(e,o){let t=this.accordionItemComponents(e);t.btn.setAttribute("aria-expanded",o),t.btn.setAttribute("aria-selected",o),t.panel.hidden=!o},n.prototype.activateAccordion=function(e){this.multiSelectible||this.collapseAllAccordions(),this.accordionOpen(e,!0)},n.prototype.activateAccordionByHash=function(){let e=window.location.hash.substr(1);if(e!==""){let o=document.getElementById(e);if(o!==null){let t=o.parentElement,i=this.accordions[0].parentElement;t===i&&this.activateAccordion(o)}}},n.prototype.collapseAllAccordions=function(){for(let e=0;e<this.accordions.length;e++)this.accordionOpen(this.accordions[e],!1)},n.prototype.isAccordionOpen=function(e){return e.getAttribute("aria-expanded")==="true"||!1},n.prototype.toggleAccordion=function(e){let o=e.querySelector("button"),t=this.isAccordionOpen(o);if(!this.multiSelectible&&!t&&this.collapseAllAccordions(),this.accordionOpen(e,!t),t)history.replaceState("",""," ");else{let i="#"+o.parentElement.id;window.history&&history.pushState&&i!=="#"&&history.replaceState("","",i)}};const c=document.getElementsByClassName("accordion");for(let e=0;e<c.length;e++)new n(c[e])})();const O=["aria-multiselectable"],H=["id"],I=["aria-expanded","aria-controls","onClick"],M=["id","aria-labelledby"],D=["innerHTML"],y=S({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},items:{type:Array,required:!0}},setup(n){const c=n,e=q([]),o=i=>{c.multiselectable?e.value.includes(i)?e.value=e.value.filter(s=>s!==i):e.value.push(i):e.value.includes(i)?e.value=[]:e.value=[i]},t=C(()=>({accordion:!0,"accordion--multi":c.multiselectable}));return(i,s)=>(m(),u("div",{class:E(t.value),role:"tablist","aria-multiselectable":c.multiselectable},[(m(!0),u(x,null,B(c.items,(p,a)=>(m(),u("div",{key:a,class:"accordion__item"},[l("h2",{id:"accordion-heading-"+a,class:"accordion__heading"},[l("button",{class:"accordion__button","aria-expanded":e.value.includes(a),"aria-controls":"accordion-content-"+a,onClick:F=>o(a)},[w(L(p.title)+" ",1),s[0]||(s[0]=l("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1))],8,I)],8,H),k(l("div",{id:"accordion-content-"+a,class:"accordion__content","aria-labelledby":"accordion-heading-"+a},[l("div",{innerHTML:p.content},null,8,D)],8,M),[[T,e.value.includes(a)]])]))),128))],10,O))}}),U={title:"Components/Accordion",component:y,argTypes:{multiselectable:{control:"boolean",name:"Multi select"},items:{control:!1,table:{disable:!0}}}},_=n=>({components:{Accordion:y},setup(){return{args:n}},template:`
    <Accordion v-bind="args" />
  `}),r=_.bind({});r.args={multiselectable:!1,items:[{title:"Section 1 title",expanded:!0,content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>"},{title:"Section 2 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},{title:"Section 3 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},{title:"Section 4 title",content:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}]};const d=_.bind({});d.args={...r.args,multiselectable:!0};var h,b,g;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`args => ({
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
})`,...(g=(b=r.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var f,v,A;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
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
})`,...(A=(v=d.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};const z=["Default","MultiSelect"];export{r as Default,d as MultiSelect,z as __namedExportsOrder,U as default};
