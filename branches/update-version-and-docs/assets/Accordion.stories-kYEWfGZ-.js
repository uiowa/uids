import{d as B,c as E,X as L,e as m,F as x,f as D,n as C,o as p,g as l,U as F,t as M}from"./iframe-CFF2vqm_.js";/* empty css                    */import"./preload-helper-DyDXPhph.js";class h{constructor(e){const t=e.querySelectorAll("details");Array.prototype.forEach.call(t,o=>{o.addEventListener("toggle",a=>{this.toggleAccordionItem(o,a.newState==="open")}),this.getAccordionItemSummary(o).addEventListener("click",a=>{this.accordionItemClick(o)})})}accordionItemClick(e){e.setAttribute("data-accordion-clicked",!0)}toggleAccordionItem(e,t){if(e.getAttribute("data-accordion-clicked"))if(e.removeAttribute("data-accordion-clicked"),t){const r="#"+this.getAccordionItemSummary(e).id;window.history&&history.pushState&&r!=="#"&&history.replaceState("","",r)}else history.replaceState("","",null)}getAccordionItemSummary(e){return e.querySelector("summary")}static focusAccordionItemByHash(){const e=window.location.hash.substr(1);if(e!==""){const t=document.getElementById(e);t!==null&&t.click()}}}function T(s){const e=document.querySelectorAll(s);Array.prototype.forEach.call(e,t=>{new h(t)}),window.addEventListener("popstate",t=>{h.focusAccordionItemByHash()}),h.focusAccordionItemByHash()}const q=["aria-multiselectable","aria-owns"],H=["name","open"],O=["id"],U=["innerHTML"],f=B({__name:"Accordion",props:{multiselectable:{type:Boolean,default:!1},label_color:{type:String,default:"",required:!1},items:{type:Array,required:!0}},setup(s){const e=s,t=()=>{const a=[];return e.items.forEach((r,c)=>{a.push(r.id)}),a.join(" ")},o=E(()=>({accordion:!0,"accordion--multi":e.multiselectable,"accordion--white":e.label_color}));return L(()=>{T(".accordion")}),(a,r)=>(p(),m("div",{class:C(o.value),role:"tablist","aria-multiselectable":e.multiselectable?"true":"false","aria-owns":t()},[(p(!0),m(x,null,D(e.items,(c,I)=>(p(),m("details",{key:I,class:"accordion__item",name:e.multiselectable?null:"accordion-collection",open:c.open,role:"none"},[l("summary",{id:c.id,class:"accordion__heading",role:"tab"},[l("h2",null,[r[0]||(r[0]=l("i",{"aria-hidden":"true",class:"fas fa-chevron-up",role:"presentation"},null,-1)),F(" "+M(c.title),1)])],8,O),l("div",{class:"accordion__content",innerHTML:c.content},null,8,U)],8,H))),128))],10,q))}}),j={title:"Components/Accordion",component:f,argTypes:{label_color:{name:"Label color",options:["","white"],control:{type:"select",labels:{"":"Gray",white:"White"}}},multiselectable:{control:"boolean",name:"Multi select"}},render:s=>({setup(){return{args:s}},components:{UidsAccordion:f},template:`
    <uids-accordion v-bind="args" />
  `})};let i=[{title:"Brand Bar",id:"brand-bar",content:"<p>The brand bar must appear at the top of all core websites to create immediate association with the university.</p>"},{title:"Brand Footer",id:"brand-footer",content:"<p>A consistent footer across all web experiences reinforces the connection with Iowa and helps users find important details such as contact information and essential hyperlinks. Footers must appear across all pages of a website.</p>"},{title:"Logo",id:"logo",content:'<p>Block IOWA logo tab in black, hyperlinked to uiowa.edu. Use the ALT text "University of Iowa homepage."</p>'},{title:"Favicon",id:"favicon",content:"<p>Although small, favicons play an important role in visually unifying web pages. Favicons are the symbols used for browser tabs, bookmarks, or shortcuts pinned to the home screen or desktop of a phone, tablet, or computer.</p>"}];const n={args:{multiselectable:!1,label_color:"",items:i}},d={args:{...n.args,multiselectable:!0}},u={args:{...n.args,items:[{open:!0,...i[0]},{...i[1]},{...i[2]},{...i[3]}]}};var y,b,g;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    multiselectable: false,
    label_color: '',
    items: items
  }
}`,...(g=(b=n.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var A,_,w;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    multiselectable: true
  }
}`,...(w=(_=d.parameters)==null?void 0:_.docs)==null?void 0:w.source}}};var k,S,v;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(v=(S=u.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};const z=["Default","MultiSelect","OpenByDefault"];export{n as Default,d as MultiSelect,u as OpenByDefault,z as __namedExportsOrder,j as default};
