import{i as e}from"./preload-helper-fGSbh7xu.js";import{t}from"./button-CsJv9U16.js";import{t as n}from"./form-snQAyGxd.js";import{n as r,t as i}from"./FormContainer-DB453E3v.js";var a,o,s,c,l;e((()=>{n(),t(),r(),a={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}},disabled:{name:`Disabled`,control:{type:`boolean`},table:{category:`States`}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}}},render:e=>({setup(){return{args:e}},components:{UidsFormContainer:i},template:`
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
                  'bttn--primary': args.type === 'submit',
                }"
              >
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},o={args:{disabled:!1,compact:!1,large:!1,type:`button`,id:`continue`,label:`Continue`}},s={args:{...o.args,type:`reset`,id:`reset`,label:`Reset`}},c={args:{...o.args,type:`submit`,id:`submit`,label:`Submit`}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...c.parameters?.docs?.source}}},l=[`Button`,`Reset`,`Submit`]}))();export{o as Button,s as Reset,c as Submit,l as __namedExportsOrder,a as default};