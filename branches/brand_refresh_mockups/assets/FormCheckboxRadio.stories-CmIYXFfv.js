/* empty css             */import{_ as k}from"./FormCheckboxOrRadioGroup.vue_vue_type_script_setup_true_lang-DX3EBoYB.js";import{_ as v}from"./FormContainer.vue_vue_type_script_setup_true_lang-CP4eSw7C.js";import"./vue.esm-bundler-Dl4EI7SU.js";import"./FormFieldset.vue_vue_type_script_setup_true_lang-CCBrtGTY.js";const A={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",control:{type:"boolean"},table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},large:{name:"Large",control:{type:"boolean"},table:{category:"Modifiers"}},checked:{name:"Checked",control:{type:"boolean"},table:{category:"States"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},label:{table:{disable:!0}},type:{table:{disable:!0}},toggle:{table:{disable:!0}}},render:r=>({setup(){return{args:r,checkboxOptions:t,radioOptions:n}},components:{UidsFormCheckboxOrRadioGroup:k,UidsFormContainer:v},computed:{optionItems(){return r.type==="radio"?n:t}},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
          >
            <uids-form-checkbox-or-radio-group
              :label="args.label"
              :type="args.type"
              :inline="args.inline"
              :required="args.required"
            >
              <div class="form-item form-item--checkbox form-type-checkbox" v-for="item in optionItems" :key="item.id">
                <input
                  :type="args.type"
                  :id="item.id"
                  :name="item.name"
                  :value="item.value"
                  :disabled="args.disabled"
                  :checked="args.checked"
                  :class="args.error ? 'error' : false"
                  :required="args.required"
                >
                <label :for="item.id">{{ item.label }}</label>
              </div>
            </uids-form-checkbox-or-radio-group>
          </uids-form-container>
        </form>
      </div>
    `})},t=[{id:"financial-aid",name:"interests",value:"FINANCIAL_AID",label:"Costs & Financial Aid"},{id:"marching-band",name:"interests",value:"MARCHING_BAND",label:"Hawkeye Marching Band"},{id:"rotc-air-force",name:"interests",value:"ROTC_AIR_FORCE",label:"ROTC - Air Force (Aerospace Studies)"},{id:"rotc-army",name:"interests",value:"ROTC_ARMY",label:"ROTC - Army (Military Science)"},{id:"study-abroad",name:"interests",value:"STUDY_ABROAD",label:"Study Abroad"},{id:"band",name:"interests",value:"BAND",label:"University Concert Bands and Jazz Bands"},{id:"honors",name:"interests",value:"HONORS",label:"University Honors Program"},{id:"veteran-services",name:"interests",value:"VETERAN_SERVICES",label:"Veteran & Military Connected Student Services"}],n=[{id:"text-permission-yes",name:"permission",value:!0,label:"Yes"},{id:"text-permission-no",name:"permission",value:!1,label:"No"}],e={render:r=>({setup(){return{args:r}},components:{UidsFormContainer:v},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item form-item--checkbox form-type-checkbox" :class="{ 'form__checkbox--switch': args.toggle }">
              <input type="checkbox" :disabled="args.disabled" :checked="args.checked" value="subscribe" id="subscribe" :class="{ 'error': args.error }">
              <label for="subscribe" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
            </div>
          </uids-form-container>
        </form>
      </div>
    `}),args:{checked:!1,disabled:!1,error:!1,required:!1,compact:!1,inline:!1,large:!1,label:"Subscribe to email updates"}},a={...e,args:{...e.args,label:"Enable notifications",toggle:!0}},s={args:{...e.args,label:"Select your interests",type:"checkbox"}},o={args:{...e.args,label:"Do you give permission to receive text messages?",type:"radio"}};var i,l,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
            <div class="form-item form-item--checkbox form-type-checkbox" :class="{ 'form__checkbox--switch': args.toggle }">
              <input type="checkbox" :disabled="args.disabled" :checked="args.checked" value="subscribe" id="subscribe" :class="{ 'error': args.error }">
              <label for="subscribe" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
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
    label: 'Subscribe to email updates'
  }
}`,...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,m,b;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  ...Checkbox,
  args: {
    ...Checkbox.args,
    label: 'Enable notifications',
    toggle: true
  }
}`,...(b=(m=a.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var u,g,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Select your interests',
    type: 'checkbox'
  }
}`,...(p=(g=s.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var f,y,h;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    ...Checkbox.args,
    label: 'Do you give permission to receive text messages?',
    type: 'radio'
  }
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const q=["Checkbox","Toggle","Checkboxes","Radios"];export{e as Checkbox,s as Checkboxes,o as Radios,a as Toggle,q as __namedExportsOrder,A as default};
