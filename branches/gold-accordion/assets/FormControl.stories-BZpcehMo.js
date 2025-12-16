/* empty css             */const m={title:"Components/Form",parameters:{docs:{source:{code:null}}},tags:["autodocs"],argTypes:{compact:{name:"Compact"},large:{name:"Large"},inline:{name:"Inline"},flex:{name:"Flex"},required:{name:"Required"},error:{name:"Error"},disabled:{name:"Disabled"}}},o={render:e=>({setup(){return{args:e}},computed:{formClasses(){let a=[];return e.large&&a.push("form--large"),e.compact&&a.push("form--compact"),e.inline&&a.push("form--inline"),e.flex&&a.push("form--flex"),a}},template:`
      <div class="layout-container">
        <form class="form" :class="formClasses">
          <div class="form-item">
            <label for="full_name" :class="args.required ? 'form-required' : false">Full name</label>
            <input type="text" name="full_name" id="full_name" :class="args.error ? 'error' : false" :disabled="args.disabled">
          </div>
        </form>
      </div>
    `})},r={...o,args:{large:!1,compact:!1,inline:!1,flex:!1,required:!1,error:!1,disabled:!1}};var s,l,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  ...InputTemplate,
  args: {
    large: false,
    compact: false,
    inline: false,
    flex: false,
    required: false,
    error: false,
    disabled: false
  }
}`,...(n=(l=r.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};const f=["Input"];export{r as Input,f as __namedExportsOrder,m as default};
