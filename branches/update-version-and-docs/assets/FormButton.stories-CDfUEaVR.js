/* empty css             *//* empty css               */import{_ as p}from"./FormContainer.vue_vue_type_script_setup_true_lang-CD08otGv.js";import"./iframe-CFF2vqm_.js";import"./preload-helper-DyDXPhph.js";const _={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",table:{category:"Modifiers"}},large:{name:"Large",table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}}},render:u=>({setup(){return{args:u}},components:{UidsFormContainer:p},template:`
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
    `})},e={args:{disabled:!1,compact:!1,large:!1,type:"button",id:"continue",label:"Continue"}},a={args:{...e.args,type:"reset",id:"reset",label:"Reset"}},t={args:{...e.args,type:"submit",id:"submit",label:"Submit"}};var r,s,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    disabled: false,
    compact: false,
    large: false,
    type: 'button',
    id: 'continue',
    label: 'Continue'
  }
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var n,i,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'reset',
    id: 'reset',
    label: 'Reset'
  }
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,c,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Button.args,
    type: 'submit',
    id: 'submit',
    label: 'Submit'
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const v=["Button","Reset","Submit"];export{e as Button,a as Reset,t as Submit,v as __namedExportsOrder,_ as default};
