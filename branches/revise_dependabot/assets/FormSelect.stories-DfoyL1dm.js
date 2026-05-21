/* empty css             */import{_ as c}from"./FormContainer.vue_vue_type_script_setup_true_lang-DoPgKcI9.js";import"./iframe-B48QgI1M.js";import"./preload-helper-BIUVmD7m.js";const g={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",control:{type:"boolean"},table:{category:"Modifiers"}},large:{name:"Large",control:{type:"boolean"},table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}}}},e={render:o=>({setup(){return{args:o}},components:{UidsFormContainer:c},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label for="country" :class="args.required ? 'form--required' : false">Country</label>
              <select name="country" id="country" :class="args.error ? 'form--error' : false" :disabled="args.disabled" :required="args.required">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
          </uids-form-container>
        </form>
      </div>
    `}),args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1}},r={render:o=>({setup(){return{args:o}},components:{UidsFormContainer:c},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item form-item--multiselect">
              <label for="multiselect" :class="args.required ? 'form--required' : false">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]" :disabled="args.disabled" :required="args.required" :class="{
                'form--error': args.error,
              }">
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
                <option value="Some College">Some College</option>
              </select>
              <div class="form-item__description">Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `}),args:{...e.args},name:"Select multiple"};var a,n,t;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
            <div class="form-item">
              <label for="country" :class="args.required ? 'form--required' : false">Country</label>
              <select name="country" id="country" :class="args.error ? 'form--error' : false" :disabled="args.disabled" :required="args.required">
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>
          </uids-form-container>
        </form>
      </div>
    \`
  }),
  args: {
    disabled: false,
    error: false,
    required: false,
    compact: false,
    large: false,
    inline: false
  }
}`,...(t=(n=e.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var l,s,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
            <div class="form-item form-item--multiselect">
              <label for="multiselect" :class="args.required ? 'form--required' : false">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]" :disabled="args.disabled" :required="args.required" :class="{
                'form--error': args.error,
              }">
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
                <option value="Some College">Some College</option>
              </select>
              <div class="form-item__description">Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.</div>
            </div>
          </uids-form-container>
        </form>
      </div>
    \`
  }),
  args: {
    ...Select.args
  },
  name: 'Select multiple'
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const f=["Select","SelectMultiple"];export{e as Select,r as SelectMultiple,f as __namedExportsOrder,g as default};
