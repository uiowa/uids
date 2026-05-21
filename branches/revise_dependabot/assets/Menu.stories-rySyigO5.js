import{_ as i}from"./Menu.vue_vue_type_script_setup_true_lang-xqx6axU7.js";import"./iframe-B48QgI1M.js";import"./preload-helper-BIUVmD7m.js";import"./utlity-BIMoNfdw.js";const v={title:"Components/Menu",parameters:{docs:{source:{code:null}}},component:i,tags:["autodocs"],argTypes:{variant:{control:{type:"select"},options:["horizontal","vertical"]}}},u={render:m=>({components:{UidsMenu:i},setup(){return{args:m}},template:`
      <div class="column-container">
        <uids-menu v-bind="args" :top="true" />
      </div>
    `})},c=[{label:"Dashboard",url:"#dashboard",icon:"fa-tachometer-alt",active:!0},{label:"Academic Programs",url:"#programs",icon:"fa-graduation-cap",expanded:!0,children:[{label:"Undergraduate",url:"#undergraduate",children:[{label:"Computer Science",url:"#cs",icon:"fa-graduation-cap"},{label:"Engineering",url:"#engineering"},{label:"Business",url:"#business"}]},{label:"Graduate",url:"#graduate"},{label:"Continuing Education",url:"#continuing"}]},{label:"Admissions",url:"#admissions",icon:"fa-door-open",children:[{label:"Apply Now",url:"#apply",icon:"fa-paper-plane"},{label:"Requirements",url:"#requirements"},{label:"Scholarships",url:"#scholarships"}]},{label:"Student Services",url:"#services",icon:"fa-users"},{label:"Campus Life",url:"#campus",icon:"fa-university"}],e={name:"Horizontal Menu",...u,args:{variant:"horizontal",items:c,label:"Main"}},a={name:"Vertical Menu",...u,args:{variant:"vertical",items:c,label:"Section"}};var r,n,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  name: 'Horizontal Menu',
  ...Template,
  args: {
    variant: 'horizontal',
    items: menuItems,
    label: "Main"
  }
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var s,o,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  name: 'Vertical Menu',
  ...Template,
  args: {
    variant: 'vertical',
    items: menuItems,
    label: "Section"
  }
}`,...(l=(o=a.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const h=["HorizontalMenu","VerticalMenu"];export{e as HorizontalMenu,a as VerticalMenu,h as __namedExportsOrder,v as default};
