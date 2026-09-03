import{i as e}from"./preload-helper-fGSbh7xu.js";import{n as t,t as n}from"./Button-BsXlW6Hf.js";import{t as r}from"./_headline-BJlwSH4Y.js";import{t as i}from"./form-snQAyGxd.js";var a=e((()=>{})),o,s,c,l;e((()=>{t(),i(),r(),a(),o={title:`Showcase/Forms`,tags:[`!autodocs`],parameters:{docs:{source:{code:null}}}},s={render:e=>({components:{UidsButton:n},setup(){return{args:e}},template:`<div class="layout-container">
      <h1>Information Request</h1>
      <p class="element--light-intro">Thank you for your interest in the University of Iowa!</p>
      <p>
        For more information about the University of Iowa, simply fill out and submit the form below.
        Let us know which programs you're interested in, and we'll send you more information.
        If you have any additional questions about the University of Iowa or the admission process, you
        are welcome to <a href="http://admissions.uiowa.edu/contact-us" target="_blank">contact us</a>.
      </p>
      <hr class="" />
      <form class="uids-form element--margin__top--extra" method="POST" action="">
        <div class="form">
          <h2 class="headline headline--serif headline--underline">Student Information</h2>
          <p><small>Required fields are marked with an asterisk (<abbr class="req" title="required">*</abbr>).</small></p>

          <div class="form-item">
            <label class="form--required" for="first-name">First Name</label>
            <input required id="first-name" maxlength="50" type="text">
          </div>

          <div class="form-item">
            <label class="form--required" for="last-name">Last Name</label>
            <input required id="last-name" maxlength="50" type="text">
          </div>

          <div class="form-item">
            <label class="form--required" for="email">Email Address</label>
            <input required id="email" maxlength="255" type="email">
          </div>

          <div class="form-item">
            <label for="home-phone">Home Phone</label>
            <input id="home-phone" maxlength="12" type="tel">
          </div>

          <div class="form-item">
            <label for="cell-phone">Cell Phone</label>
            <input id="cell-phone" maxlength="12" type="tel">
          </div>

          <div class="form-item">
            <label>Do you authorize The University of Iowa to send you text messages about important information and
              deadlines?</label>
            <div class="form-item--radio form-item">
              <input id="text-permission-yes" type="radio" name="permissionToText" value="true">
              <label for="text-permission-yes" class="radio">Yes</label>
            </div>
            <div class="form-item--radio form-item">
              <input id="text-permission-no" type="radio" name="permissionToText" value="false">
              <label for="text-permission-no" class="radio">No</label>
            </div>
          </div>

          <div class="form-item">
            <label class="form--required" for="address">Address</label>
            <input required id="address" maxlength="64" type="text">
          </div>

          <div class="form-item">
            <label for="address-2">Address 2</label>
            <input id="address-2" maxlength="30" type="text">
          </div>

          <div class="flex flex--wrap flex--gap__sm">
            <div class="form-item flex--1">
              <label class="form--required" for="city">City</label>
              <input required id="city" maxlength="30" type="text">
            </div>

            <div class="form-item flex--1">
              <label class="form--required" for="state">State</label>
              <select required id="state">
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

            <div class="form-item flex--1">
              <label class="form--required" for="zip-code">ZIP Code</label>
              <input required id="zip-code" maxlength="10" type="text">
            </div>
          </div>


          <div class="form-item">
            <label for="country">Country</label>
            <select id="country">
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="MX">Mexico</option>
              <option value="GB">United Kingdom</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="AU">Australia</option>
              <option value="JP">Japan</option>
              <option value="CH">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
            </select>
          </div>

          <div class="form-item">
            <label class="form--required" for="citizenship">Country of Citizenship</label>
            <select required id="citizenship">
              <option value="">- None -</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="MX">Mexico</option>
              <option value="GB">United Kingdom</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="IT">Italy</option>
              <option value="ES">Spain</option>
              <option value="AU">Australia</option>
              <option value="JP">Japan</option>
              <option value="CH">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
            </select>
          </div>

          <div class="form-item">
            <label class="form--required" for="birth-date">Birth Date</label>
            <input required id="birth-date" type="date">
          </div>

          <div class="form-item">
            <label class="form--required" for="graduation-year">High School Graduation Year</label>
            <input required id="graduation-year" maxlength="4" placeholder="yyyy" type="text">
          </div>

          <div class="form-item">
            <label class="form--required" for="enrollment-term">Planned Enrollment Term</label>
            <select required id="enrollment-term">
              <option value="">- None -</option>
              <option value="1146">Spring 2026</option>
              <option value="1147">Summer 2026</option>
              <option value="1134">Fall 2026</option>
              <option value="1149">Spring 2027</option>
              <option value="1150">Summer 2027</option>
              <option value="1135">Fall 2027</option>
              <option value="1152">Spring 2028</option>
              <option value="1153">Summer 2028</option>
              <option value="1136">Fall 2028</option>
            </select>
          </div>


          <div class="form-item">
            <label class="form--required" for="student-type">What type of student will you be?</label>
            <select required id="student-type">
              <option value="">- None -</option>
              <option value="FIRST_YEAR">First-Year</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>

          <h2 class="headline headline--serif headline--underline">Academic Interests</h2>
          <p>Select up to three areas of study to receive additional information about that subject.
            You can find additional information in our full <a
              href="http://admissions.uiowa.edu/academics/undergraduate-areas-of-study" target="_blank">areas of study
              list</a>.

          </p>

          <div class="form-item">
            <label class="form--required" for="primary-interest">Primary Academic Interest</label>
            <select required id="primary-interest">
              <option value="">- None -</option>
              <option value="330">Accounting</option>
              <option value="6">Actuarial Science</option>
              <option value="8">African American Studies</option>
              <option value="18">Anthropology</option>
              <option value="24">Art</option>
              <option value="41">Biology</option>
              <option value="329">Business (pre)</option>
              <option value="77">Computer Science</option>
              <option value="85">Dance</option>
              <option value="880">Education</option>
              <option value="107">English</option>
              <option value="296">Engineering</option>
              <option value="139">History</option>
              <option value="151">Journalism and Mass Communication</option>
              <option value="224">Law (pre)</option>
              <option value="379">Mathematics</option>
              <option value="225">Medicine (pre)</option>
              <option value="178">Music</option>
              <option value="188">Nursing</option>
              <option value="210">Philosophy</option>
              <option value="219">Physics</option>
              <option value="222">Political Science</option>
              <option value="235">Psychology</option>
              <option value="287">Theatre Arts</option>
            </select>
          </div>

          <div class="form-item">
            <label for="secondary-interest">Secondary Academic Interest</label>
            <select id="secondary-interest">
              <option value="">- None -</option>
              <option value="330">Accounting</option>
              <option value="6">Actuarial Science</option>
              <option value="8">African American Studies</option>
              <option value="18">Anthropology</option>
              <option value="24">Art</option>
              <option value="41">Biology</option>
              <option value="329">Business (pre)</option>
              <option value="77">Computer Science</option>
              <option value="85">Dance</option>
              <option value="880">Education</option>
              <option value="107">English</option>
              <option value="296">Engineering</option>
              <option value="139">History</option>
              <option value="151">Journalism and Mass Communication</option>
              <option value="224">Law (pre)</option>
              <option value="379">Mathematics</option>
              <option value="225">Medicine (pre)</option>
              <option value="178">Music</option>
              <option value="188">Nursing</option>
              <option value="210">Philosophy</option>
              <option value="219">Physics</option>
              <option value="222">Political Science</option>
              <option value="235">Psychology</option>
              <option value="287">Theatre Arts</option>
            </select>
          </div>

          <div class="form-item">
            <label for="additional-interest">Additional Academic Interest</label>
            <select id="additional-interest">
              <option value="">- None -</option>
              <option value="330">Accounting</option>
              <option value="6">Actuarial Science</option>
              <option value="8">African American Studies</option>
              <option value="18">Anthropology</option>
              <option value="24">Art</option>
              <option value="41">Biology</option>
              <option value="329">Business (pre)</option>
              <option value="77">Computer Science</option>
              <option value="85">Dance</option>
              <option value="880">Education</option>
              <option value="107">English</option>
              <option value="296">Engineering</option>
              <option value="139">History</option>
              <option value="151">Journalism and Mass Communication</option>
              <option value="224">Law (pre)</option>
              <option value="379">Mathematics</option>
              <option value="225">Medicine (pre)</option>
              <option value="178">Music</option>
              <option value="188">Nursing</option>
              <option value="210">Philosophy</option>
              <option value="219">Physics</option>
              <option value="222">Political Science</option>
              <option value="235">Psychology</option>
              <option value="287">Theatre Arts</option>
            </select>
          </div>

          <h2 class="headline headline--serif headline--underline">Additional Information</h2>
          <p>Select any additional subjects that you would like to receive information about.</p>

          <fieldset>
            <legend>
              <span class="fieldset-legend">Additional subjects</span>
            </legend>
            <div>
              <div class="form-item--checkbox form-item">
                <input id="financial-aid" type="checkbox" value="FINANCIAL_AID">
                <label for="financial-aid" class="checkbox">Costs & Financial Aid</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="marching-band" type="checkbox" value="MARCHING_BAND">
                <label for="marching-band" class="checkbox">Hawkeye Marching Band</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="rotc-air-force" type="checkbox" value="ROTC_AIR_FORCE">
                <label for="rotc-air-force" class="checkbox">ROTC - Air Force (Aerospace Studies)</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="rotc-army" type="checkbox" value="ROTC_ARMY">
                <label for="rotc-army" class="checkbox">ROTC - Army (Military Science)</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="study-abroad" type="checkbox" value="STUDY_ABROAD">
                <label for="study-abroad" class="checkbox">Study Abroad</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="band" type="checkbox" value="BAND">
                <label for="band" class="checkbox">University Concert Bands and Jazz Bands</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="honors" type="checkbox" value="HONORS">
                <label for="honors" class="checkbox">University Honors Program</label>
              </div>
              <div class="form-item--checkbox form-item">
                <input id="veteran-services" type="checkbox" value="VETERAN_SERVICES">
                <label for="veteran-services" class="checkbox">Veteran & Military Connected Student Services</label>
              </div>
            </div>
          </fieldset>

        </div>

        <uids-button
          url='/'
          color='primary'
          size='medium'
          :borderless="false"
          :full="false"
          :transparent="false"
          :light_font="false"
          :icon="''"
        >
          Request information
          <i class="fas fa-arrow-right"></i>
        </uids-button>

      </form>
    </div>`})},c={...s},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Template
}`,...c.parameters?.docs?.source}}},l=[`InformationRequestForm`]}))();export{c as InformationRequestForm,l as __namedExportsOrder,o as default};