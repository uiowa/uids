import{i as e}from"./preload-helper-DNxerHx3.js";import{n as t,t as n}from"./Menu-CLXfg2Dw.js";var r,i,a,o,s,c;e((()=>{t(),r={title:`Components/Menu`,parameters:{docs:{source:{code:null}}},component:n,tags:[`autodocs`],argTypes:{variant:{control:{type:`select`},options:[`horizontal`,`vertical`]}}},i={render:e=>({components:{UidsMenu:n},setup(){return{args:e}},template:`
      <div class="column-container">
        <uids-menu v-bind="args" :top="true" />
      </div>
    `})},a=[{label:`Dashboard`,url:`#dashboard`,icon:`fa-tachometer-alt`,active:!0},{label:`Academic Programs`,url:`#programs`,icon:`fa-graduation-cap`,expanded:!0,children:[{label:`Undergraduate`,url:`#undergraduate`,children:[{label:`Computer Science`,url:`#cs`,icon:`fa-graduation-cap`},{label:`Engineering`,url:`#engineering`},{label:`Business`,url:`#business`}]},{label:`Graduate`,url:`#graduate`},{label:`Continuing Education`,url:`#continuing`}]},{label:`Admissions`,url:`#admissions`,icon:`fa-door-open`,children:[{label:`Apply Now`,url:`#apply`,icon:`fa-paper-plane`},{label:`Requirements`,url:`#requirements`},{label:`Scholarships`,url:`#scholarships`}]},{label:`Student Services`,url:`#services`,icon:`fa-users`},{label:`Campus Life`,url:`#campus`,icon:`fa-university`}],o={name:`Horizontal Menu`,...i,args:{variant:`horizontal`,items:a,label:`Main`}},s={name:`Vertical Menu`,...i,args:{variant:`vertical`,items:a,label:`Section`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Horizontal Menu',
  ...Template,
  args: {
    variant: 'horizontal',
    items: menuItems,
    label: "Main"
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Vertical Menu',
  ...Template,
  args: {
    variant: 'vertical',
    items: menuItems,
    label: "Section"
  }
}`,...s.parameters?.docs?.source}}},c=[`HorizontalMenu`,`VerticalMenu`]}))();export{o as HorizontalMenu,s as VerticalMenu,c as __namedExportsOrder,r as default};