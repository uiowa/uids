import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t}from"./FormContainer-BC6DPtn6.js";import{n}from"./FormFieldset-DeSB84_P.js";import{n as r}from"./FormCheckboxOrRadioGroup-Cg-BEmQw.js";import{i,n as a,r as o}from"./FormItem-CpQKV4Zt.js";var s,c,l;function u(){return(u=e((()=>{i(),n(),a(),r(),t(),s={title:`Components`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}}}},c={render:e=>({components:{ExampleSearch:o},setup(){return{args:e}},template:`
      <div class="layout-container">
        <example-search :class="{
          'form--compact': args.compact,
          'form--large': args.large,
        }"></example-search>
      </div>
    `}),args:{compact:!1,large:!1}},l=[`SearchBar`],c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ExampleSearch
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="layout-container">
        <example-search :class="{
          'form--compact': args.compact,
          'form--large': args.large,
        }"></example-search>
      </div>
    \`
  }),
  args: {
    compact: false,
    large: false
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{c as SearchBar,l as __namedExportsOrder,s as default};