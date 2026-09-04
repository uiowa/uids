import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./form-snQAyGxd.js";import{n,t as r}from"./FormContainer-XYqDNAlj.js";var i,a,o,s;e((()=>{t(),n(),i={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}},min:{table:{disable:!0}},max:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:r},template:`
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
    `})},a={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`number`,id:`hours`,label:`Credit hours completed`,description:`Enter the number of credit hours you have completed.`,min:0,max:1e4}},o={tags:[`!dev`],args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`range`,id:`volume`,label:`Volume`,min:0,max:100}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s=[`Number`,`Range`]}))();export{a as Number,o as Range,s as __namedExportsOrder,i as default};