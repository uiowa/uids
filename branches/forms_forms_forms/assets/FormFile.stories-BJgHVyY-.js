/* empty css             */import{_ as t}from"./FormContainer.vue_vue_type_script_setup_true_lang-gr6ChY2W.js";import"./vue.esm-bundler-CLcX4pNH.js";const c={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",table:{category:"Modifiers"}},large:{name:"Large",table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:o=>({setup(){return{args:o}},components:{UidsFormContainer:t},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
              <input type="file" :name="args.id" :id="args.id" :class="{ error: args.error }" :disabled="args.disabled">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},e={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,id:"file",label:"Upload your official document",description:"Accepted formats: PDF, DOCX, JPG"}};var a,r,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    id: 'file',
    label: 'Upload your official document',
    description: 'Accepted formats: PDF, DOCX, JPG'
  }
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const n=["File"];export{e as File,n as __namedExportsOrder,c as default};
