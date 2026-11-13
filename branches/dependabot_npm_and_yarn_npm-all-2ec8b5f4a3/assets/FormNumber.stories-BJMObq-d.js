import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./form-CtkRn8UH.js";import{n as t,t as n}from"./FormContainer-BC6DPtn6.js";var r,i,a,o;function s(){return(s=e((()=>{t(),r={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}},min:{table:{disable:!0}},max:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:n},template:`
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
    `})},i={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`number`,id:`hours`,label:`Credit hours completed`,description:`Enter the number of credit hours you have completed.`,min:0,max:1e4}},a={tags:[`!dev`],args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`range`,id:`volume`,label:`Volume`,min:0,max:100}},o=[`Number`,`Range`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}}})))()}s();export{i as Number,a as Range,o as __namedExportsOrder,r as default};