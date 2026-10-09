import{i as e}from"./preload-helper-DylEL7Is.js";import{t}from"./button-BpfVW2Fx.js";import{t as n}from"./form-xooEq-MG.js";import{n as r,t as i}from"./FormContainer-DKFVb1FJ.js";var a,o,s,c,l,u,d;e((()=>{n(),t(),r(),a={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{small:{name:`Small`,control:`boolean`,table:{category:`Modifiers`}},full_width:{name:`Full width`,control:`boolean`,table:{category:`Modifiers`}},compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:i},template:`
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
    `})},o={args:{small:!1,full_width:!1,disabled:!1,compact:!1,large:!1,type:`button`,id:`continue`,label:`Continue`}},s={args:{...o.args,type:`reset`,id:`reset`,label:`Reset`}},c={args:{...o.args,type:`submit`,id:`submit`,label:`Submit`}},l={args:{...c.args,small:!0}},u={args:{...c.args,full_width:!0}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'reset',
    id: 'reset',
    label: 'Reset'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'submit',
    id: 'submit',
    label: 'Submit'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...Submit.args,
    small: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...Submit.args,
    full_width: true
  }
}`,...u.parameters?.docs?.source}}},d=[`Button`,`Reset`,`Submit`,`Small`,`FullWidth`]}))();export{o as Button,u as FullWidth,s as Reset,l as Small,c as Submit,d as __namedExportsOrder,a as default};