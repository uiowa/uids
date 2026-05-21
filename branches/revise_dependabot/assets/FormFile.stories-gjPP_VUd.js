/* empty css             */import{_ as l}from"./FormContainer.vue_vue_type_script_setup_true_lang-DoPgKcI9.js";import"./iframe-B48QgI1M.js";import"./preload-helper-BIUVmD7m.js";const c={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",table:{category:"Modifiers"}},large:{name:"Large",table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:s=>({setup(){return{args:s}},components:{UidsFormContainer:l},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
              <input type="file" :name="args.id" :id="args.id" :class="{ 'form--error': args.error }" :disabled="args.disabled" :required="args.required">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},e={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,id:"file",label:"Upload your official document",description:"Accepted formats: PDF, DOCX, JPG"}};var r,a,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    id: 'file',
    label: 'Upload your official document',
    description: 'Accepted formats: PDF, DOCX, JPG'
  }
}`,...(o=(a=e.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const m=["File"];export{e as File,m as __namedExportsOrder,c as default};
