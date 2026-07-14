import{n as e}from"./rolldown-runtime-DaJ6WEGw.js";import{t}from"./form-dE_Y6xpv.js";import{n,t as r}from"./FormContainer-CtGI6_eC.js";var i,a,o,s,c,l,u,d;e((()=>{t(),n(),i={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:r},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ 'form--error': args.error }" :disabled="args.disabled" :required="args.required">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},a={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`text`,id:`fullname`,label:`Full name`,description:`As it appears on your official documents.`}},o={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`email`,id:`email`,label:`Email`,description:`Your uiowa.edu email address.`}},s={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`password`,id:`password`,label:`Password`}},c={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`date`,id:`dob`,label:`Date of birth`}},l={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`time`,id:`time`,label:`Time of departure`}},u={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`tel`,id:`phone`,label:`Phone number`,description:`Include area code.`}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'text',
    id: 'fullname',
    label: 'Full name',
    description: 'As it appears on your official documents.'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'email',
    id: 'email',
    label: 'Email',
    description: 'Your uiowa.edu email address.'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'password',
    id: 'password',
    label: 'Password'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'date',
    id: 'dob',
    label: 'Date of birth'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'time',
    id: 'time',
    label: 'Time of departure'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false,
    type: 'tel',
    id: 'phone',
    label: 'Phone number',
    description: 'Include area code.'
  }
}`,...u.parameters?.docs?.source}}},d=[`Text`,`Email`,`Password`,`Date`,`Time`,`Phone`]}))();export{c as Date,o as Email,s as Password,u as Phone,a as Text,l as Time,d as __namedExportsOrder,i as default};