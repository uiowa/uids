/* empty css             */import{_ as d}from"./FormContainer.vue_vue_type_script_setup_true_lang-DoPgKcI9.js";import"./iframe-B48QgI1M.js";import"./preload-helper-BIUVmD7m.js";const b={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",control:{type:"boolean"},table:{category:"Modifiers"}},large:{name:"Large",control:{type:"boolean"},table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}},min:{table:{disable:!0}},max:{table:{disable:!0}}},render:i=>({setup(){return{args:i}},components:{UidsFormContainer:d},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ 'form--error': args.error }" :disabled="args.disabled" :required="args.required" :min="args.min" step="1" :max="args.max">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},e={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"number",id:"hours",label:"Credit hours completed",description:"Enter the number of credit hours you have completed.",min:0,max:1e4}},r={tags:["!dev"],args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"range",id:"volume",label:"Volume",min:0,max:100}};var a,s,o;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'number',
    id: 'hours',
    label: 'Credit hours completed',
    description: 'Enter the number of credit hours you have completed.',
    min: 0,
    max: 10000
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var l,t,n;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  tags: ['!dev'],
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'range',
    id: 'volume',
    label: 'Volume',
    min: 0,
    max: 100
  }
}`,...(n=(t=r.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};const f=["Number","Range"];export{e as Number,r as Range,f as __namedExportsOrder,b as default};
