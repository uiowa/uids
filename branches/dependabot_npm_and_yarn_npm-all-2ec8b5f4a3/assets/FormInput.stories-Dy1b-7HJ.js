import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./form-CtkRn8UH.js";import{n as t,t as n}from"./FormContainer-BC6DPtn6.js";var r,i,a,o,s,c,l,u;function d(){return(d=e((()=>{t(),r={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:n},template:`
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
    `})},i={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`text`,id:`fullname`,label:`Full name`,description:`As it appears on your official documents.`}},a={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`email`,id:`email`,label:`Email`,description:`Your uiowa.edu email address.`}},o={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`password`,id:`password`,label:`Password`}},s={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`date`,id:`dob`,label:`Date of birth`}},c={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`time`,id:`time`,label:`Time of departure`}},l={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:`tel`,id:`phone`,label:`Phone number`,description:`Include area code.`}},u=[`Text`,`Email`,`Password`,`Date`,`Time`,`Phone`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}}})))()}d();export{s as Date,a as Email,o as Password,l as Phone,i as Text,c as Time,u as __namedExportsOrder,r as default};