import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./form-CpPX0At7.js";import{n,t as r}from"./FormContainer-CLy8rJkD.js";import{n as i,t as a}from"./FormCheckboxOrRadioGroup-B0k5vuVG.js";var o,s,c,l,u,d,f,p;e((()=>{t(),i(),n(),o={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,control:{type:`boolean`},table:{category:`Modifiers`}},inline:{name:`Inline`,control:{type:`boolean`},table:{category:`Modifiers`}},large:{name:`Large`,control:{type:`boolean`},table:{category:`Modifiers`}},checked:{name:`Checked`,control:{type:`boolean`},table:{category:`States`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},error:{name:`Error`,control:{type:`boolean`},table:{category:`States`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}},label:{table:{disable:!0}},type:{table:{disable:!0}}},render:e=>({setup(){return{args:e,checkboxOptions:s,radioOptions:c}},components:{UidsFormCheckboxOrRadioGroup:a,UidsFormContainer:r},computed:{optionItems(){return e.type===`radio`?c:s}},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <uids-form-checkbox-or-radio-group
              :label="args.label"
              :type="args.type"
              :class="{ 'form--inline': args.inline }"
              :required="args.required"
            >
              <div :class="'form-item form-item--' + args.type" v-for="item in optionItems" :key="item.id">
                <input
                  :type="args.type"
                  :id="item.id"
                  :name="item.name"
                  :value="item.value"
                  :disabled="args.disabled"
                  :checked="args.checked"
                  :class="args.error ? 'form--error' : false"
                  :required="args.required"
                >
                <label :for="item.id">{{ item.label }}</label>
              </div>
            </uids-form-checkbox-or-radio-group>
          </uids-form-container>
        </form>
      </div>
    `})},s=[{id:`financial-aid`,name:`interests`,value:`FINANCIAL_AID`,label:`Costs & Financial Aid`},{id:`marching-band`,name:`interests`,value:`MARCHING_BAND`,label:`Hawkeye Marching Band`},{id:`rotc-air-force`,name:`interests`,value:`ROTC_AIR_FORCE`,label:`ROTC - Air Force (Aerospace Studies)`},{id:`rotc-army`,name:`interests`,value:`ROTC_ARMY`,label:`ROTC - Army (Military Science)`},{id:`study-abroad`,name:`interests`,value:`STUDY_ABROAD`,label:`Study Abroad`},{id:`band`,name:`interests`,value:`BAND`,label:`University Concert Bands and Jazz Bands`},{id:`honors`,name:`interests`,value:`HONORS`,label:`University Honors Program`},{id:`veteran-services`,name:`interests`,value:`VETERAN_SERVICES`,label:`Veteran & Military Connected Student Services`}],c=[{id:`text-permission-yes`,name:`permission`,value:!0,label:`Yes`},{id:`text-permission-no`,name:`permission`,value:!1,label:`No`}],l={render:e=>({setup(){return{args:e}},components:{UidsFormContainer:r},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div :class="'form-item form-item--' + args.type">
              <input type="checkbox" :disabled="args.disabled" :checked="args.checked" :required="args.required" value="subscribe" id="subscribe" :class="{ 'form--error': args.error }">
              <label for="subscribe" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
            </div>
          </uids-form-container>
        </form>
      </div>
    `}),args:{checked:!1,disabled:!1,error:!1,required:!1,compact:!1,inline:!1,large:!1,label:`Subscribe to email updates`,type:`checkbox`}},u={...l,args:{...l.args,label:`Enable notifications`,type:`toggle`}},d={args:{...l.args,label:`Select your interests`,type:`checkbox`}},f={args:{...l.args,label:`Do you give permission to receive text messages?`,type:`radio`}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    setup() {
      return {
        args
      };
    },
    components: {
      UidsFormContainer
    },
    template: \`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div :class="'form-item form-item--' + args.type">
              <input type="checkbox" :disabled="args.disabled" :checked="args.checked" :required="args.required" value="subscribe" id="subscribe" :class="{ 'form--error': args.error }">
              <label for="subscribe" :class="args.required ? 'form--required' : false" v-html="args.label"></label>
            </div>
          </uids-form-container>
        </form>
      </div>
    \`
  }),
  args: {
    checked: false,
    disabled: false,
    error: false,
    required: false,
    compact: false,
    inline: false,
    large: false,
    label: 'Subscribe to email updates',
    type: 'checkbox'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Checkbox,
  args: {
    ...Checkbox.args,
    label: 'Enable notifications',
    type: 'toggle'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Select your interests',
    type: 'checkbox'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Do you give permission to receive text messages?',
    type: 'radio'
  }
}`,...f.parameters?.docs?.source}}},p=[`Checkbox`,`Toggle`,`Checkboxes`,`Radios`]}))();export{l as Checkbox,d as Checkboxes,f as Radios,u as Toggle,p as __namedExportsOrder,o as default};