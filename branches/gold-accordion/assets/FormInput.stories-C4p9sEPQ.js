/* empty css             */import{_ as E}from"./FormContainer.vue_vue_type_script_setup_true_lang-0iBI_Rmo.js";import"./vue.esm-bundler-CLcX4pNH.js";const F={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",control:{type:"boolean"},table:{category:"Modifiers"}},large:{name:"Large",control:{type:"boolean"},table:{category:"Modifiers"}},inline:{name:"Inline",control:{type:"boolean"},table:{category:"Modifiers"}},disabled:{name:"Disabled",control:{type:"boolean"},table:{category:"States"}},error:{name:"Error",control:{type:"boolean"},table:{category:"States"}},required:{name:"Required",control:{type:"boolean"},table:{category:"States"}},type:{table:{disable:!0}},name:{table:{disable:!0}},id:{table:{disable:!0}},label:{table:{disable:!0}},description:{table:{disable:!0}}},render:_=>({setup(){return{args:_}},components:{UidsFormContainer:E},template:`
      <div class="layout-container">
        <form class="form">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
          >
            <div class="form-item">
              <label :for="args.id" :class="args.required ? 'form-required' : false" v-html="args.label"></label>
              <input :type="args.type" :name="args.id" :id="args.id" :class="{ error: args.error }" :disabled="args.disabled">
              <div class="form-item__description" v-if="args.description" v-html="args.description"></div>
            </div>
          </uids-form-container>
        </form>
      </div>
    `})},e={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"text",id:"fullname",label:"Full name",description:"As it appears on your official documents."}},a={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"email",id:"email",label:"Email",description:"Your uiowa.edu email address."}},r={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"password",id:"password",label:"Password"}},s={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"date",id:"dob",label:"Date of birth"}},l={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"time",id:"time",label:"Time of departure"}},o={args:{disabled:!1,error:!1,required:!1,compact:!1,large:!1,inline:!1,type:"tel",id:"phone",label:"Phone number",description:"Include area code."}};var n,i,t;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(t=(i=e.parameters)==null?void 0:i.docs)==null?void 0:t.source}}};var d,c,f;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(f=(c=a.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var m,p,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var b,g,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(y=(g=s.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var q,h,w;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
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
}`,...(w=(h=l.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var v,S,P;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(P=(S=o.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};const I=["Text","Email","Password","Date","Time","Phone"];export{s as Date,a as Email,r as Password,o as Phone,e as Text,l as Time,I as __namedExportsOrder,F as default};
