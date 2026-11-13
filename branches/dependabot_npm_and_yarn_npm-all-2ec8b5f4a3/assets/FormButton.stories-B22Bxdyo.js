import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import"./button-Bz1K9GXg.js";import"./form-CtkRn8UH.js";import{n as t,t as n}from"./FormContainer-BC6DPtn6.js";var r,i,a,o,s,c,l;function u(){return(u=e((()=>{t(),r={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{small:{name:`Small`,control:`boolean`,table:{category:`Modifiers`}},full_width:{name:`Full width`,control:`boolean`,table:{category:`Modifiers`}},compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:n},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <div class="form-item">
              <input
                :type="args.type"
                :name="args.id"
                :id="args.id"
                :value="args.label"
                :disabled="args.disabled"
                class="bttn"
                :class="{
                  error: args.error,
                  'button--small': args.small,
                  'button--full-width': args.full_width,
                  'bttn--primary': args.type === 'submit',
                }"
              >
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},i={args:{small:!1,full_width:!1,disabled:!1,compact:!1,large:!1,type:`button`,id:`continue`,label:`Continue`}},a={args:{...i.args,type:`reset`,id:`reset`,label:`Reset`}},o={args:{...i.args,type:`submit`,id:`submit`,label:`Submit`}},s={args:{...o.args,small:!0}},c={args:{...o.args,full_width:!0}},l=[`Button`,`Reset`,`Submit`,`Small`,`FullWidth`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    small: false,
    full_width: false,
    disabled: false,
    compact: false,
    large: false,
    type: 'button',
    id: 'continue',
    label: 'Continue'
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'reset',
    id: 'reset',
    label: 'Reset'
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'submit',
    id: 'submit',
    label: 'Submit'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Submit.args,
    small: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Submit.args,
    full_width: true
  }
}`,...c.parameters?.docs?.source}}}})))()}u();export{i as Button,c as FullWidth,a as Reset,s as Small,o as Submit,l as __namedExportsOrder,r as default};