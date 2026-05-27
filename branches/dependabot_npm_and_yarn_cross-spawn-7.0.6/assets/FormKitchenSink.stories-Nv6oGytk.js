import{i as e}from"./preload-helper-DpVrO9fz.js";import{n as t,t as n}from"./FormContainer-BTcRcWMk.js";import{n as r,t as i}from"./FormFieldset-CvOWQVz3.js";import{n as a,t as o}from"./FormCheckboxOrRadioGroup-BFkkKiGE.js";import{i as s,n as c,t as l}from"./FormItem-qXitIyvU.js";var u,d,f,p,m;e((()=>{s(),r(),c(),a(),t(),u={title:`Elements/Form`,parameters:{docs:{source:{code:null}}},tags:[`!autodocs`],argTypes:{compact:{name:`Compact`,table:{category:`Modifiers`}},large:{name:`Large`,table:{category:`Modifiers`}},inline:{name:`Inline`,table:{category:`Modifiers`}},flex:{name:`Flex`,table:{category:`Modifiers`}},required:{name:`Required`,control:{type:`boolean`},table:{category:`States`}}}},d=[{id:`text-permission-yes`,name:`permission`,value:!0,label:`Yes`},{id:`text-permission-no`,name:`permission`,value:!1,label:`No`}],f=[{id:`financial-aid`,name:`interests`,value:`FINANCIAL_AID`,label:`Costs & Financial Aid`},{id:`marching-band`,name:`interests`,value:`MARCHING_BAND`,label:`Hawkeye Marching Band`},{id:`rotc-air-force`,name:`interests`,value:`ROTC_AIR_FORCE`,label:`ROTC - Air Force (Aerospace Studies)`},{id:`rotc-army`,name:`interests`,value:`ROTC_ARMY`,label:`ROTC - Army (Military Science)`},{id:`study-abroad`,name:`interests`,value:`STUDY_ABROAD`,label:`Study Abroad`},{id:`band`,name:`interests`,value:`BAND`,label:`University Concert Bands and Jazz Bands`},{id:`honors`,name:`interests`,value:`HONORS`,label:`University Honors Program`},{id:`veteran-services`,name:`interests`,value:`VETERAN_SERVICES`,label:`Veteran & Military Connected Student Services`}],p={render:e=>({components:{UidsFormFieldset:i,UidsFormItem:l,UidsFormCheckboxOrRadioGroup:o,UidsFormContainer:n},setup(){return{args:e,radioOptions:d,checkboxOptions:f}},template:`
      <div class="layout-container">
        <form class="form" method="POST" action="">
          <uids-form-container
            :compact="args.compact"
            :large="args.large"
            :inline="args.inline"
            :flex="args.flex"
          >
            <uids-form-item>
              <label :class="args.required ? 'form--required' : false" for="last-name">Text</label>
              <input id="last-name" maxlength="50" type="text" :required="args.required">
              <template #description>Description</template>
            </uids-form-item>

            <div class="form-item">
              <label :class="args.required ? 'form--required' : false" for="email">Email</label>
              <input id="email" maxlength="255" type="email" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="state">Select</label>
              <select id="state" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="states">Select</label>
              <select id="states" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="birth-date">Date</label>
              <input id="birth-date" type="date" :required="args.required">
            </div>

            <div class="form-item form-item--multiselect">
              <label for="multiselect">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]">
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
            <div id="edit-textarea--description" class="form-item__description">Textarea description goes here.</div>
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

          <div class="form-item form-item--checkbox">
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
    `}),args:{large:!1,compact:!1,inline:!1,flex:!1,required:!0}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
              <label :class="args.required ? 'form--required' : false" for="last-name">Text</label>
              <input id="last-name" maxlength="50" type="text" :required="args.required">
              <template #description>Description</template>
            </uids-form-item>

            <div class="form-item">
              <label :class="args.required ? 'form--required' : false" for="email">Email</label>
              <input id="email" maxlength="255" type="email" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="state">Select</label>
              <select id="state" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="states">Select</label>
              <select id="states" :required="args.required">
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
              <label :class="args.required ? 'form--required' : false" for="birth-date">Date</label>
              <input id="birth-date" type="date" :required="args.required">
            </div>

            <div class="form-item form-item--multiselect">
              <label for="multiselect">Multi select</label>
              <select id="multiselect" multiple="multiple" name="multiselect[]">
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
            <div id="edit-textarea--description" class="form-item__description">Textarea description goes here.</div>
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

          <div class="form-item form-item--checkbox">
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
    flex: false,
    required: true
  }
}`,...p.parameters?.docs?.source}}},m=[`KitchenSink`]}))();export{p as KitchenSink,m as __namedExportsOrder,u as default};