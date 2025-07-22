<script setup lang="ts">
import { computed } from 'vue';
import '../../scss/components/form.scss'
import UidsButton from '../button/Button.vue'
// import '../../scss/components/logo.scss'

const props = defineProps({

});

</script>
<template>
  <form class="uids-form" method="POST" action="">
    <div class="form">
      <h2>Student Information</h2>

      <div class="form-item">
        <label>First Name</label>
        <input maxlength="50" type="text">
      </div>

      <div class="form-item">
        <label>Last Name</label>
        <input maxlength="50" type="text">
      </div>

      <div class="form-item">
        <label>Email Address</label>
        <input maxlength="255" type="email">
      </div>

      <div class="form-item">
        <label>Home Phone</label>
        <input maxlength="12" type="tel">
      </div>

      <div class="form-item">
        <label>Cell Phone</label>
        <input maxlength="12" type="tel">
      </div>

      <div class="form-item">
        <label>Do you authorize The University of Iowa to send you text messages about important information and deadlines?</label>
        <div class="form-type-radio form-item">
        <input type="radio" name="permissionToText" value="true">
        <label class="radio">Yes</label>
      </div>
      <div class="form-type-radio form-item">
       <input type="radio" name="permissionToText" value="false">
       <label class="radio">No</label>
      </div>
      </div>

      <div class="form-item">
        <label>Do you authorize The University of Iowa to send you text messages about important information and deadlines?</label>
        <div class="form-type-radio form-type-radio--side form-item">
          <input type="radio" name="permissionToText" value="true">
          <label class="radio">Yes</label>
        </div>
        <div class="form-type-radio form-type-radio--side form-item">
          <input type="radio" name="permissionToText" value="false">
          <label class="radio">No</label>
        </div>
      </div>

      <div class="form-item">
        <label>Address</label>
        <input maxlength="64" type="text">
      </div>

      <div class="form-item">
        <label>Address 2</label>
        <input maxlength="30" type="text">
      </div>

      <div class="form-item">
        <label>City</label>
        <input maxlength="30" type="text">
      </div>

      <div class="form-item">
        <label>State</label>
        <select>
          <option value="">- None - </option>
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
        <label>ZIP Code</label>
        <input maxlength="10" type="text">
      </div>

      <div class="form-item">
        <label>Country</label>
        <select>
          <option value="">- None - </option>
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
        <label>Country of Citizenship</label>
        <select>
          <option value="">- None - </option>
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
        <label>Birth Date</label>
        <input type="date">
      </div>

      <div class="form-item">
        <label>High School Graduation Year</label>
        <input maxlength="4" placeholder="yyyy" type="text">
      </div>

      <div class="form-item">
        <label>Planned Enrollment Term</label>
        <select>
          <option value="">- None - </option>
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
        <label>What type of student will you be?</label>
        <select>
          <option value="">- None - </option>
          <option value="FIRST_YEAR">First-Year</option>
          <option value="TRANSFER">Transfer</option>
        </select>
      </div>

      <h2>Academic Interests</h2>
      <span class="help-block">
                Select up to three areas of study to receive additional information about that subject.
            </span>

      <div class="form-item">
        <label>Primary Academic Interest</label>
        <select>
          <option value="">- None - </option>
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
        <label>Secondary Academic Interest</label>
        <select>
          <option value="">- None - </option>
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
        <label>Additional Academic Interest</label>
        <select>
          <option value="">- None - </option>
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

      <h2>Additional Information</h2>

      <fieldset>
      <legend>
        <span class="fieldset-legend">Select any additional subjects that you would like to receive information about.</span>
      </legend>
      <div class="form-item">
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="FINANCIAL_AID">
          <label class="checkbox">Costs & Financial Aid</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="MARCHING_BAND">
          <label class="checkbox">Hawkeye Marching Band</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="ROTC_AIR_FORCE">
          <label class="checkbox">ROTC - Air Force (Aerospace Studies)</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="ROTC_ARMY">
          <label class="checkbox">ROTC - Army (Military Science)</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="STUDY_ABROAD">
          <label class="checkbox">Study Abroad</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="BAND">
          <label class="checkbox">University Concert Bands and Jazz Bands</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="HONORS">
          <label class="checkbox">University Honors Program</label>
        </div>
        <div class="form-type-checkbox form-item">
          <input type="checkbox" value="VETERAN_SERVICES">
          <label class="checkbox">Veteran & Military Connected Student Services</label>
        </div>
      </div>
      </fieldset>

      <div class="form-item">
        <label>Disabled</label>
        <input type="text" name="disabled" value="" size="60" maxlength="255" placeholder="This field is disabled" disabled="disabled">
      </div>

      <div class="form-item">
        <label>Readonly</label>
        <input type="text" name="readonly" value="" size="60" maxlength="255" placeholder="Readonly" readonly="readonly">
      </div>

      <fieldset>
        <legend>
          <span class="fieldset-legend">Select any additional subjects that you would like to receive information about.</span>
        </legend>
        <div class="form-item">
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="FINANCIAL_AID">
            <label class="checkbox">Costs & Financial Aid</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="MARCHING_BAND">
            <label class="checkbox">Hawkeye Marching Band</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="ROTC_AIR_FORCE">
            <label class="checkbox">ROTC - Air Force (Aerospace Studies)</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="ROTC_ARMY">
            <label class="checkbox">ROTC - Army (Military Science)</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="STUDY_ABROAD">
            <label class="checkbox">Study Abroad</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="BAND">
            <label class="checkbox">University Concert Bands and Jazz Bands</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="HONORS">
            <label class="checkbox">University Honors Program</label>
          </div>
          <div class="form-type-checkbox form-type-checkbox--side form-item">
            <input type="checkbox" value="VETERAN_SERVICES">
            <label class="checkbox">Veteran & Military Connected Student Services</label>
          </div>
        </div>
      </fieldset>


      <div class="form-item form-item-multiselect">
        <label>Multi select</label>
        <select multiple="multiple" name="multiselect[]" id="edit-multiselect" class="form-select"><option value="High School">High School</option><option value="Associate Degree">Associate Degree</option><option value="Graduate or Professional Degree">Graduate or Professional Degree</option><option value="Some College">Some College</option></select>
      </div>


      <fieldset>
        <legend>
          <span class="fieldset-legend">Academic Interests</span>
        </legend>
        <div class="fieldset-wrapper">
          <div class="form-type-checkbox--switch">
            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[251]" value="251">
              <label class="checkbox">Business, Economics, and Management</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[261]" value="261">
              <label class="checkbox">Education</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[256]" value="256">
              <label class="checkbox">Engineering and Computing</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[286]" value="286">
              <label class="checkbox">Health Sciences</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[271]" value="271">
              <label class="checkbox">Languages, Culture, and Society</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[276]" value="276">
              <label class="checkbox">Life and Natural Sciences</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[266]" value="266">
              <label class="checkbox">Math and Quantitative Sciences</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[301]" value="301">
              <label class="checkbox">Preprofessional Programs</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[291]" value="291">
              <label class="checkbox">Social Sciences and Policy</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[296]" value="296">
              <label class="checkbox">Visual and Performing Arts</label>
            </div>

            <div class="form-type-checkbox form-item">
              <input type="checkbox" name="academic_group[281]" value="281">
              <label class="checkbox">Writing, Communications, Literature, and Media</label>
            </div>
          </div>
        </div>
      </fieldset>


    </div>

    <uids-button
      url='/'
      color='primary'
      size='small'
      :borderless="false"
      :full="false"
      :transparent="false"
      :light_font="false"
      :icon="''"
    >
      Hello world
      <i class="fas fa-arrow-right"></i>
    </uids-button>
  </form>
</template>
