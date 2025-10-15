import{_ as l}from"./Menu.vue_vue_type_script_setup_true_lang-Cd1eNvl-.js";import"./vue.esm-bundler-BvXj7D1s.js";import"./utlity-CAV5GFHh.js";const b={title:"Components/Menu",parameters:{docs:{source:{code:null}}},component:l,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["horizontal","vertical"]}}},u={render:m=>({components:{UidsMenu:l},setup(){return{args:m}},template:`
      <div class="column-container">
        <uids-menu v-bind="args" :top="true" />
      </div>
    `})},c=[{label:"Dashboard",url:"#dashboard",icon:"fa-tachometer-alt",active:!0},{label:"Academic Programs",url:"#programs",icon:"fa-graduation-cap",expanded:!0,children:[{label:"Undergraduate",url:"#undergraduate",children:[{label:"Computer Science",url:"#cs",icon:"fa-graduation-cap"},{label:"Engineering",url:"#engineering"},{label:"Business",url:"#business"}]},{label:"Graduate",url:"#graduate"},{label:"Continuing Education",url:"#continuing"}]},{label:"Admissions",url:"#admissions",icon:"fa-door-open",children:[{label:"Apply Now",url:"#apply",icon:"fa-paper-plane"},{label:"Requirements",url:"#requirements"},{label:"Scholarships",url:"#scholarships"}]},{label:"Student Services",url:"#services",icon:"fa-users"},{label:"Campus Life",url:"#campus",icon:"fa-university"}],e={name:"Horizontal Menu",...u,args:{variant:"horizontal",items:c,label:"Site menu navigation"}},a={name:"Vertical Menu",...u,args:{variant:"vertical",items:c,label:"Section navigation"}};var n,r,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  name: 'Horizontal Menu',
  ...Template,
  args: {
    variant: 'horizontal',
    items: menuItems,
    label: "Site menu navigation"
  }
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var i,o,s;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Vertical Menu',
  ...Template,
  args: {
    variant: 'vertical',
    items: menuItems,
    label: "Section navigation"
  }
}`,...(s=(o=a.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const v=["HorizontalMenu","VerticalMenu"];export{e as HorizontalMenu,a as VerticalMenu,v as __namedExportsOrder,b as default};
