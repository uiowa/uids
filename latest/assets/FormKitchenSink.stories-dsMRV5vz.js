import{d as u,u as v,f as e,e as t,s as m,j as c,o as a}from"./vue.esm-bundler-CLcX4pNH.js";/* empty css             *//* empty css               */import{_ as d}from"./FormFieldset.vue_vue_type_script_setup_true_lang-YWifhb3x.js";import{_ as f}from"./FormCheckboxOrRadioGroup.vue_vue_type_script_setup_true_lang-3gjwQEk8.js";import{_ as g}from"./FormContainer.vue_vue_type_script_setup_true_lang-0iBI_Rmo.js";const h={class:"form-item"},b={key:0,class:"form-item__description"},A=u({__name:"FormItem",setup(n){const s=v();return(i,x)=>(a(),e("div",h,[t(i.$slots,"default"),m(s).description?(a(),e("div",b,[t(i.$slots,"description")])):c("",!0)]))}}),O={title:"Elements/Form",parameters:{docs:{source:{code:null}}},tags:["!autodocs"],argTypes:{compact:{name:"Compact",table:{category:"Modifiers"}},large:{name:"Large",table:{category:"Modifiers"}},inline:{name:"Inline",table:{category:"Modifiers"}},flex:{name:"Flex",table:{category:"Modifiers"}}}},N=[{id:"text-permission-yes",name:"permission",value:!0,label:"Yes"},{id:"text-permission-no",name:"permission",value:!1,label:"No"}],M=[{id:"financial-aid",name:"interests",value:"FINANCIAL_AID",label:"Costs & Financial Aid"},{id:"marching-band",name:"interests",value:"MARCHING_BAND",label:"Hawkeye Marching Band"},{id:"rotc-air-force",name:"interests",value:"ROTC_AIR_FORCE",label:"ROTC - Air Force (Aerospace Studies)"},{id:"rotc-army",name:"interests",value:"ROTC_ARMY",label:"ROTC - Army (Military Science)"},{id:"study-abroad",name:"interests",value:"STUDY_ABROAD",label:"Study Abroad"},{id:"band",name:"interests",value:"BAND",label:"University Concert Bands and Jazz Bands"},{id:"honors",name:"interests",value:"HONORS",label:"University Honors Program"},{id:"veteran-services",name:"interests",value:"VETERAN_SERVICES",label:"Veteran & Military Connected Student Services"}],o={render:n=>({components:{UidsFormFieldset:d,UidsFormItem:A,UidsFormCheckboxOrRadioGroup:f,UidsFormContainer:g},setup(){return{args:n,radioOptions:N,checkboxOptions:M}},template:`
      <div class="layout-container">
        <form class="form" method="POST" action="">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
            :flex="args.flex"
          >
            <uids-form-item>
              <label class="form-required" for="last-name">Text</label>
              <input id="last-name" maxlength="50" type="text">
              <template #description>Description</template>
            </uids-form-item>

            <div class="form-item">
              <label class="form-required" for="email">Email</label>
              <input id="email" maxlength="255" type="email">
            </div>

            <div class="form-item">
              <label for="home-phone">Phone</label>
              <input id="home-phone" maxlength="12" type="tel">
            </div>

            <uids-form-item>
              <label for="search">Search</label>
              <input type="search" id="search" name="search">
            </uids-form-item>

            <uids-form-item>
              <label class="form-required" for="state">Select</label>
              <select id="state">
                <option value="">- None -</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </uids-form-item>

          </uids-form-container>
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :flex="args.flex"
          >
            <uids-form-checkbox-or-radio-group
              label="Radios"
              type="radio"
              :items="radioOptions"
              :inline="args.inline"
            />
          </uids-form-container>

          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
            :flex="args.flex"
          >
            <div class="form-item">
              <label class="form-required" for="states">Select</label>
              <select id="states">
                <option value="">- None -</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div class="form-item">
              <label class="form-required" for="birth-date">Date</label>
              <input id="birth-date" type="date">
            </div>

            <div class="form-item form-item-multiselect">
              <label for="multiselect">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]" class="form-select">
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
                <option value="Some College">Some College</option>
              </select>
            </div>
          </uids-form-container>

          <div class="form-item">
            <label for="edit-textarea">Textarea</label>
            <textarea id="edit-textarea" name="textarea" rows="5" cols="60"
                      aria-describedby="edit-textarea--description"></textarea>
            <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
          </div>

          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :flex="args.flex"
          >
            <uids-form-checkbox-or-radio-group
              label="Checkboxes"
              type="checkbox"
              :items="checkboxOptions"
              :inline="args.inline"
            />
          </uids-form-container>

          <hr />

          <div class="form-item form-type-checkbox">
            <input
              id="agree-terms"
              type="checkbox"
              name="terms"
              value="true"
            >
            <label for="agree-terms">
              I agree to the terms and conditions
            </label>
          </div>
        </form>
      </div>
    `}),args:{large:!1,compact:!1,inline:!1,flex:!1}};var l,p,r;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: args => ({
    components: {
      UidsFormFieldset,
      UidsFormItem,
      UidsFormCheckboxOrRadioGroup,
      UidsFormContainer
    },
    setup() {
      return {
        args,
        radioOptions,
        checkboxOptions
      };
    },
    template: \`
      <div class="layout-container">
        <form class="form" method="POST" action="">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
            :flex="args.flex"
          >
            <uids-form-item>
              <label class="form-required" for="last-name">Text</label>
              <input id="last-name" maxlength="50" type="text">
              <template #description>Description</template>
            </uids-form-item>

            <div class="form-item">
              <label class="form-required" for="email">Email</label>
              <input id="email" maxlength="255" type="email">
            </div>

            <div class="form-item">
              <label for="home-phone">Phone</label>
              <input id="home-phone" maxlength="12" type="tel">
            </div>

            <uids-form-item>
              <label for="search">Search</label>
              <input type="search" id="search" name="search">
            </uids-form-item>

            <uids-form-item>
              <label class="form-required" for="state">Select</label>
              <select id="state">
                <option value="">- None -</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </uids-form-item>

          </uids-form-container>
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :flex="args.flex"
          >
            <uids-form-checkbox-or-radio-group
              label="Radios"
              type="radio"
              :items="radioOptions"
              :inline="args.inline"
            />
          </uids-form-container>

          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
            :flex="args.flex"
          >
            <div class="form-item">
              <label class="form-required" for="states">Select</label>
              <select id="states">
                <option value="">- None -</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AS">American Samoa</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>

            <div class="form-item">
              <label class="form-required" for="birth-date">Date</label>
              <input id="birth-date" type="date">
            </div>

            <div class="form-item form-item-multiselect">
              <label for="multiselect">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]" class="form-select">
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Graduate or Professional Degree">Graduate or Professional Degree</option>
                <option value="Some College">Some College</option>
              </select>
            </div>
          </uids-form-container>

          <div class="form-item">
            <label for="edit-textarea">Textarea</label>
            <textarea id="edit-textarea" name="textarea" rows="5" cols="60"
                      aria-describedby="edit-textarea--description"></textarea>
            <div id="edit-textarea--description" class="description">Textarea description goes here.</div>
          </div>

          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :flex="args.flex"
          >
            <uids-form-checkbox-or-radio-group
              label="Checkboxes"
              type="checkbox"
              :items="checkboxOptions"
              :inline="args.inline"
            />
          </uids-form-container>

          <hr />

          <div class="form-item form-type-checkbox">
            <input
              id="agree-terms"
              type="checkbox"
              name="terms"
              value="true"
            >
            <label for="agree-terms">
              I agree to the terms and conditions
            </label>
          </div>
        </form>
      </div>
    \`
  }),
  args: {
    large: false,
    compact: false,
    inline: false,
    flex: false
  }
}`,...(r=(p=o.parameters)==null?void 0:p.docs)==null?void 0:r.source}}};const T=["KitchenSink"];export{o as KitchenSink,T as __namedExportsOrder,O as default};
