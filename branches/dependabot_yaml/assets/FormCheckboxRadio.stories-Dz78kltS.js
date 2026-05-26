/* empty css             */import{_ as k}from"./FormCheckboxOrRadioGroup.vue_vue_type_script_setup_true_lang-wry-CMyk.js";import{_ as h}from"./FormContainer.vue_vue_type_script_setup_true_lang-DgLXsoaf.js";import"./iframe-CEK89M90.js";import"./preload-helper-C6G9HS8-.js";import"./FormFieldset.vue_vue_type_script_setup_true_lang-DKovtP_a.js";const _={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",control:{type:"boolean"},table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},large:{name:"Large",control:{type:"boolean"},table:{category:"Modifiers"}},checked:{name:"Checked",control:{type:"boolean"},table:{category:"States"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},label:{table:{disable:!0}},type:{table:{disable:!0}}},render:r=>({setup(){return{args:r,checkboxOptions:t,radioOptions:i}},components:{UidsFormCheckboxOrRadioGroup:k,UidsFormContainer:h},computed:{optionItems(){return r.type==="radio"?i:t}},template:`
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
    `})},t=[{id:"financial-aid",name:"interests",value:"FINANCIAL_AID",label:"Costs & Financial Aid"},{id:"marching-band",name:"interests",value:"MARCHING_BAND",label:"Hawkeye Marching Band"},{id:"rotc-air-force",name:"interests",value:"ROTC_AIR_FORCE",label:"ROTC - Air Force (Aerospace Studies)"},{id:"rotc-army",name:"interests",value:"ROTC_ARMY",label:"ROTC - Army (Military Science)"},{id:"study-abroad",name:"interests",value:"STUDY_ABROAD",label:"Study Abroad"},{id:"band",name:"interests",value:"BAND",label:"University Concert Bands and Jazz Bands"},{id:"honors",name:"interests",value:"HONORS",label:"University Honors Program"},{id:"veteran-services",name:"interests",value:"VETERAN_SERVICES",label:"Veteran & Military Connected Student Services"}],i=[{id:"text-permission-yes",name:"permission",value:!0,label:"Yes"},{id:"text-permission-no",name:"permission",value:!1,label:"No"}],e={render:r=>({setup(){return{args:r}},components:{UidsFormContainer:h},template:`
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
    `}),args:{checked:!1,disabled:!1,error:!1,required:!1,compact:!1,inline:!1,large:!1,label:"Subscribe to email updates",type:"checkbox"}},a={...e,args:{...e.args,label:"Enable notifications",type:"toggle"}},s={args:{...e.args,label:"Select your interests",type:"checkbox"}},o={args:{...e.args,label:"Do you give permission to receive text messages?",type:"radio"}};var n,l,c;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,m,b;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...Checkbox,
  args: {
    ...Checkbox.args,
    label: 'Enable notifications',
    type: 'toggle'
  }
}`,...(b=(m=a.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var u,p,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Select your interests',
    type: 'checkbox'
  }
}`,...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var f,y,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Do you give permission to receive text messages?',
    type: 'radio'
  }
}`,...(v=(y=o.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const O=["Checkbox","Toggle","Checkboxes","Radios"];export{e as Checkbox,s as Checkboxes,o as Radios,a as Toggle,O as __namedExportsOrder,_ as default};
