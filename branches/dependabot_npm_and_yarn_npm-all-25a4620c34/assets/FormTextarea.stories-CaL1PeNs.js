import{i as e}from"./preload-helper-DCtgd561.js";import{t}from"./form-B7OPdb5A.js";import{n,t as r}from"./FormContainer-BgcEYjYB.js";var i,a,o;e((()=>{t(),n(),i={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:r},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
              <textarea :name="args.id" :id="args.id" :class="{ 'form--error': args.error }" :disabled="args.disabled" :required="args.required"></textarea>
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},a={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,id:`experience`,label:`Describe your experience:`,description:`Provide a detailed description of your relevant experience.`}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    id: 'experience',
    label: 'Describe your experience:',
    description: 'Provide a detailed description of your relevant experience.'
  }
}`,...a.parameters?.docs?.source}}},o=[`Textarea`]}))();export{a as Textarea,o as __namedExportsOrder,i as default};