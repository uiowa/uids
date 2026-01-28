import{d as n,c as m,a as e,o as l}from"./vue.esm-bundler-Dl4EI7SU.js";/* empty css             *//* empty css               */const p={class:"form form--flex",method:"POST",action:""},i=n({__name:"ExampleSearch",props:{},setup(r){return(d,s)=>(l(),m("form",p,s[0]||(s[0]=[e("div",{class:"form-item"},[e("label",{class:"element-invisible",for:"search"},"Search"),e("input",{type:"text",id:"search",name:"search",value:"",size:"30",maxlength:"128",placeholder:"Search"})],-1),e("button",{type:"submit",name:"submit",value:"Search",class:"bttn bttn--primary"},"Search",-1)])))}}),h={title:"Components",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",table:{category:"Modifiers"}},large:{name:"Large",table:{category:"Modifiers"}}}},a={render:r=>({components:{ExampleSearch:i},setup(){return{args:r}},template:`
      <div class="layout-container">
        <example-search :class="{
          'form--compact': args.compact,
          'form--large': args.large,
        }"></example-search>
      </div>
    `}),args:{compact:!1,large:!1}};var t,o,c;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const x=["SearchBar"];export{a as SearchBar,x as __namedExportsOrder,h as default};
