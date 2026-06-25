import{i as e}from"./preload-helper-DCtgd561.js";import{n as t}from"./FormContainer-BgcEYjYB.js";import{n}from"./FormFieldset-C7IgyteQ.js";import{n as r}from"./FormCheckboxOrRadioGroup-BQd1eh0U.js";import{i,n as a,r as o}from"./FormItem-ztqVSEcH.js";var s,c,l;e((()=>{i(),n(),a(),r(),t(),s={title:`Components`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}}}},c={render:e=>({components:{ExampleSearch:o},setup(){return{args:e}},template:`
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