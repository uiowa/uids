import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t}from"./FormContainer-Co1y9Kqd.js";import{n}from"./FormFieldset-BLlKACji.js";import{n as r}from"./FormCheckboxOrRadioGroup-xyEFVAS8.js";import{i,n as a,r as o}from"./FormItem-D5ddslYF.js";var s,c,l;e((()=>{i(),n(),a(),r(),t(),s={title:`Components`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}}}},c={render:e=>({components:{ExampleSearch:o},setup(){return{args:e}},template:`
      <div class="layout-container">
        <example-search :class="{
          'form--compact': args.compact,
          'form--large': args.large,
        }"></example-search>
      </div>
    `}),args:{compact:!1,large:!1}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l=[`SearchBar`]}))();export{c as SearchBar,l as __namedExportsOrder,s as default};